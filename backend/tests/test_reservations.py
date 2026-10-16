"""Backend tests for Bozzmail @bozzmail.com address reservations."""
import time
import pytest
import requests

BASE_URL = open("/app/frontend/.env").read().split("REACT_APP_BACKEND_URL=")[1].split("\n")[0].strip().rstrip("/")
API = f"{BASE_URL}/api/reservations"


@pytest.fixture(scope="module")
def handle():
    return f"qa-{int(time.time() * 1000)}"


@pytest.mark.parametrize("bad,fragment", [
    ("ab", "at least 3"),
    ("a" * 31, "at most 30"),
    ("John_Doe", "lowercase"),
    (".john", "start and end"),
    ("john..doe", "next to each other"),
    ("admin", "reserved by Bozzmail"),
    ("postmaster", "reserved by Bozzmail"),
])
def test_check_rejects_invalid_handles(bad, fragment):
    r = requests.get(f"{API}/check", params={"handle": bad})
    assert r.status_code == 200
    body = r.json()
    assert body["available"] is False
    assert body["reason"] == "invalid"
    assert fragment in body["message"]


def test_check_is_case_insensitive_and_available(handle):
    r = requests.get(f"{API}/check", params={"handle": handle.upper()})
    assert r.status_code == 200
    assert r.json() == {
        "handle": handle, "address": f"{handle}@bozzmail.com", "available": True, "reason": None,
        "message": "This address is available.",
    }


def test_create_reservation(handle):
    r = requests.post(API, json={"handle": handle.upper(), "email": f"{handle}@Example.com"})
    assert r.status_code == 201, r.text
    body = r.json()
    assert body["handle"] == handle
    assert body["address"] == f"{handle}@bozzmail.com"
    assert body["email"] == f"{handle}@example.com"
    assert body["position"] >= 1
    assert "created_at" in body


def test_handle_now_taken(handle):
    r = requests.get(f"{API}/check", params={"handle": handle})
    assert r.json()["available"] is False
    assert r.json()["reason"] == "taken"


def test_duplicate_handle_rejected(handle):
    r = requests.post(API, json={"handle": handle, "email": f"other-{handle}@example.com"})
    assert r.status_code == 409
    assert "already reserved" in r.json()["detail"]


def test_one_reservation_per_contact_email(handle):
    r = requests.post(API, json={"handle": f"{handle}-two", "email": f"{handle}@example.com"})
    assert r.status_code == 409
    assert "already holds a reservation" in r.json()["detail"]


def test_invalid_handle_and_email_on_create(handle):
    assert requests.post(API, json={"handle": "ab", "email": "x@example.com"}).status_code == 422
    assert requests.post(API, json={"handle": f"{handle}-three", "email": "not-an-email"}).status_code == 422


def test_count():
    r = requests.get(f"{API}/count")
    assert r.status_code == 200 and r.json()["count"] >= 1


def test_confirmation_email_is_sent_in_background():
    h = f"mailqa-{int(time.time() * 1000)}"
    r = requests.post(API, json={"handle": h, "email": "delivered@resend.dev"})
    assert r.status_code in (201, 409)  # 409 only if delivered@resend.dev already holds a reservation
    if r.status_code == 409:
        pytest.skip("test inbox already holds a reservation")
    rid = r.json()["id"]
    status = None
    for _ in range(15):
        time.sleep(1)
        status = requests.get(f"{API}/{rid}/status").json()["confirmation_email"]
        if status != "pending":
            break
    assert status in ("sent", "paused"), status


def test_status_404_for_unknown_id():
    assert requests.get(f"{API}/does-not-exist/status").status_code == 404
