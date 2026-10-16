import logging
import re
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, BackgroundTasks, HTTPException, Query
from pydantic import BaseModel

from emailer import send_reservation_confirmation, EmailPaused

logger = logging.getLogger(__name__)

DOMAIN = "bozzmail.com"
HANDLE_RE = re.compile(r"^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

BLOCKLIST = {
    "admin", "administrator", "root", "support", "help", "info", "contact", "postmaster", "hostmaster",
    "webmaster", "abuse", "security", "noreply", "no-reply", "mailer-daemon", "billing", "sales", "team",
    "staff", "legal", "privacy", "press", "jobs", "careers", "hello", "mail", "email", "calendar", "contacts",
    "bozzmail", "bozz", "boss", "official", "system", "test", "null", "undefined", "www", "ftp", "api",
    "status", "news", "newsletter", "marketing", "ceo", "cto", "founder", "owner", "moderator", "mod",
}


class ReservationCreate(BaseModel):
    handle: str
    email: str


class Reservation(BaseModel):
    id: str
    handle: str
    address: str
    email: str
    position: int
    created_at: datetime


def normalize_handle(raw: str) -> str:
    return raw.strip().lower()


def validate_handle(handle: str) -> Optional[str]:
    """Return an error message, or None when the handle is syntactically valid and not blocked."""
    if len(handle) < 3:
        return "Handles need at least 3 characters."
    if len(handle) > 30:
        return "Handles can have at most 30 characters."
    if not HANDLE_RE.match(handle):
        return "Use only lowercase letters, numbers, dots and hyphens — and start and end with a letter or number."
    if ".." in handle or ".-" in handle or "-." in handle:
        return "Dots and hyphens can't sit next to each other."
    if handle in BLOCKLIST:
        return "This address is reserved by Bozzmail."
    return None


async def deliver_confirmation(db, reservation: "Reservation") -> None:
    """Background task: email the reserver and record the outcome on the reservation."""
    try:
        email_id = await send_reservation_confirmation(to=reservation.email, address=reservation.address, position=reservation.position)
        update = {"confirmation_email": {"status": "sent", "id": email_id, "sent_at": datetime.now(timezone.utc)}}
    except EmailPaused as exc:
        update = {"confirmation_email": {"status": "paused", "reason": str(exc)}}
    except Exception as exc:  # network / provider error — reservation itself stays valid
        logger.error("Confirmation email failed for %s: %s", reservation.address, exc)
        update = {"confirmation_email": {"status": "failed", "reason": str(exc)[:200]}}
    await db.reservations.update_one({"id": reservation.id}, {"$set": update})


def build_router(db) -> APIRouter:
    router = APIRouter(prefix="/reservations", tags=["reservations"])

    @router.get("/check")
    async def check_handle(handle: str = Query(..., max_length=64)):
        h = normalize_handle(handle)
        error = validate_handle(h)
        if error:
            return {"handle": h, "address": f"{h}@{DOMAIN}", "available": False, "reason": "invalid", "message": error}
        taken = await db.reservations.find_one({"handle": h}, {"_id": 1})
        if taken:
            return {"handle": h, "address": f"{h}@{DOMAIN}", "available": False, "reason": "taken", "message": "Sorry, this address is already reserved."}
        return {"handle": h, "address": f"{h}@{DOMAIN}", "available": True, "reason": None, "message": "This address is available."}

    @router.post("", response_model=Reservation, status_code=201)
    async def create_reservation(body: ReservationCreate, background: BackgroundTasks):
        h = normalize_handle(body.handle)
        error = validate_handle(h)
        if error:
            raise HTTPException(status_code=422, detail=error)
        email = body.email.strip().lower()
        if not EMAIL_RE.match(email):
            raise HTTPException(status_code=422, detail="Please provide a valid contact email address.")

        if await db.reservations.find_one({"handle": h}, {"_id": 1}):
            raise HTTPException(status_code=409, detail="Sorry, this address is already reserved.")
        if await db.reservations.find_one({"email": email}, {"_id": 1}):
            raise HTTPException(status_code=409, detail="This contact email already holds a reservation.")

        position = await db.reservations.count_documents({}) + 1
        entry = Reservation(
            id=str(uuid.uuid4()),
            handle=h,
            address=f"{h}@{DOMAIN}",
            email=email,
            position=position,
            created_at=datetime.now(timezone.utc),
        )
        try:
            await db.reservations.insert_one(entry.model_dump())
        except Exception as exc:  # unique index race
            if "duplicate key" in str(exc).lower():
                raise HTTPException(status_code=409, detail="Sorry, this address was just reserved by someone else.")
            raise
        background.add_task(deliver_confirmation, db, entry)
        return entry

    @router.get("/{reservation_id}/status")
    async def reservation_status(reservation_id: str):
        doc = await db.reservations.find_one({"id": reservation_id}, {"_id": 0, "address": 1, "position": 1, "confirmation_email": 1})
        if not doc:
            raise HTTPException(status_code=404, detail="Reservation not found.")
        email_state = doc.get("confirmation_email") or {"status": "pending"}
        return {"address": doc["address"], "position": doc["position"], "confirmation_email": email_state.get("status")}

    @router.get("/count")
    async def reservations_count():
        return {"count": await db.reservations.count_documents({})}

    return router


async def ensure_indexes(db):
    await db.reservations.create_index("handle", unique=True)
    await db.reservations.create_index("email", unique=True)
