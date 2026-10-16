"""Backend tests for Bozzmail waitlist API."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL") or open("/app/frontend/.env").read().split("REACT_APP_BACKEND_URL=")[1].split("\n")[0].strip()
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def unique_email():
    return f"qa+{int(time.time()*1000)}@example.com"


def test_root():
    r = requests.get(f"{API}/")
    assert r.status_code == 200
    assert r.json().get("message") == "Bozzmail API"


def test_waitlist_count_endpoint():
    r = requests.get(f"{API}/waitlist/count")
    assert r.status_code == 200
    assert "count" in r.json()
    assert isinstance(r.json()["count"], int)


def test_waitlist_list_endpoint():
    r = requests.get(f"{API}/waitlist")
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_waitlist_create_new_email(unique_email):
    r = requests.post(f"{API}/waitlist", json={"email": unique_email})
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["email"] == unique_email.lower()
    assert "id" in data and len(data["id"]) > 0
    assert "created_at" in data


def test_waitlist_duplicate_email(unique_email):
    # same email again -> 409
    r = requests.post(f"{API}/waitlist", json={"email": unique_email})
    assert r.status_code == 409
    assert "already" in r.json().get("detail", "").lower()


def test_waitlist_invalid_email():
    r = requests.post(f"{API}/waitlist", json={"email": "foo"})
    assert r.status_code == 422


def test_persistence_in_list(unique_email):
    r = requests.get(f"{API}/waitlist")
    emails = [e["email"] for e in r.json()]
    assert unique_email.lower() in emails


def test_count_increments():
    before = requests.get(f"{API}/waitlist/count").json()["count"]
    email = f"qa+count{int(time.time()*1000)}@example.com"
    r = requests.post(f"{API}/waitlist", json={"email": email})
    assert r.status_code == 201
    after = requests.get(f"{API}/waitlist/count").json()["count"]
    assert after == before + 1
