from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class WaitlistEntryCreate(BaseModel):
    email: str


class WaitlistEntry(BaseModel):
    id: str
    email: str
    created_at: datetime


@api_router.get("/")
async def root():
    return {"message": "Enclave API"}


@api_router.post("/waitlist", response_model=WaitlistEntry, status_code=201)
async def join_waitlist(input: WaitlistEntryCreate):
    email = input.email.strip().lower()
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=422, detail="Please provide a valid email address.")

    existing = await db.waitlist.find_one({"email": email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=409, detail="This email is already on the waitlist.")

    entry = WaitlistEntry(
        id=str(uuid.uuid4()),
        email=email,
        created_at=datetime.now(timezone.utc),
    )
    doc = entry.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.waitlist.insert_one(doc)
    return entry


@api_router.get("/waitlist", response_model=List[WaitlistEntry])
async def list_waitlist():
    entries = await db.waitlist.find({}, {"_id": 0}).to_list(1000)
    for entry in entries:
        if isinstance(entry.get("created_at"), str):
            entry["created_at"] = datetime.fromisoformat(entry["created_at"])
    return entries


@api_router.get("/waitlist/count")
async def waitlist_count():
    count = await db.waitlist.count_documents({})
    return {"count": count}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
