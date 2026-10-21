"""Transactional email via Brevo (owner's Brevo account; API key is IP-restricted to the prod droplet)."""
import os
import re
import ipaddress
import logging
import httpx
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")
logger = logging.getLogger(__name__)

BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email"
BREVO_API_KEY = os.environ["BREVO_API_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]  # this app's own brand (G1)
EMAIL_FROM_ADDRESS = os.environ["EMAIL_FROM_ADDRESS"]  # sender on the Brevo-authenticated bozzmail.com domain
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
APP_PUBLIC_URL = os.environ["APP_PUBLIC_URL"].rstrip("/")

# ---------------------------------------------------------------------------
# Guardrail gate (G2 + G3) — copied from the playbook; call on every send.
# ---------------------------------------------------------------------------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} ≠ real link host {real!r} (G3)")


class EmailPaused(Exception):
    """Account state on the owner's Brevo account (credits / key / IP authorization) — not transient."""


async def send_email(*, to: str, subject: str, html: str) -> str:
    _assert_safe_email(subject, html)
    payload = {
        "sender": {"name": EMAIL_FROM_NAME, "email": EMAIL_FROM_ADDRESS},
        "to": [{"email": to}],
        "subject": subject,
        "htmlContent": html,
        "tags": ["bozzmail-reservation"],
    }
    if EMAIL_REPLY_TO:
        payload["replyTo"] = {"email": EMAIL_REPLY_TO}
    async with httpx.AsyncClient(timeout=httpx.Timeout(15.0, connect=5.0)) as client:
        resp = await client.post(BREVO_SEND_URL, headers={"api-key": BREVO_API_KEY, "accept": "application/json"}, json=payload)
    if resp.status_code >= 400:
        try:
            data = resp.json()
        except ValueError:
            data = {}
        code = data.get("code", "")
        if resp.status_code in (401, 402, 403):
            logger.warning("Email paused: %s (%s): %s", code, resp.status_code, data.get("message", ""))
            raise EmailPaused(code or f"http_{resp.status_code}")
        logger.error("Email send failed: %s %s", resp.status_code, resp.text[:500])
        resp.raise_for_status()
    return resp.json().get("messageId", "")


# ---------------------------------------------------------------------------
# Reservation confirmation template (server-side, fixed; only escaped values interpolated)
# ---------------------------------------------------------------------------
def reservation_confirmation_html(*, address: str, position: int) -> str:
    brand = escape(EMAIL_FROM_NAME)
    addr = escape(address)
    url = escape(APP_PUBLIC_URL)
    return f"""
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff2ea;padding:32px 12px;font-family:'Noto Sans',Helvetica,Arial,sans-serif;color:#410002">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 4px 8px rgba(65,0,2,.25)">
      <tr><td style="background:#d93951;padding:28px 32px;text-align:center">
        <span style="font-size:28px;font-weight:700;font-style:italic;color:#ffffff;letter-spacing:-.5px">bozzmail</span>
      </td></tr>
      <tr><td style="padding:36px 32px 8px;text-align:center">
        <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#850122">Reserved for you</p>
        <p style="margin:12px 0 0;font-size:26px;font-weight:700;color:#850122;word-break:break-all">{addr}</p>
        <p style="margin:16px 0 0;font-size:16px;line-height:1.6">You're <strong>#{position}</strong> in line. Your address is locked in — nobody else can take it.</p>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.6">We'll send your launch invite to this inbox the moment your encrypted mailbox is ready. Until then, there is nothing you need to do.</p>
      </td></tr>
      <tr><td style="padding:24px 32px 8px;text-align:center">
        <a href="{url}" style="display:inline-block;background:#fef9c3;color:#850122;font-weight:700;font-size:16px;text-decoration:none;padding:14px 22px;border-radius:6px">Invite a friend to reserve theirs</a>
      </td></tr>
      <tr><td style="padding:28px 32px 36px;text-align:center">
        <p style="margin:0;font-size:14px;line-height:1.6;color:#850122">Encrypted email, calendar and contacts. No ads. No tracking. Free forever.</p>
      </td></tr>
    </table>
    <p style="max-width:560px;margin:20px auto 0;font-size:12px;line-height:1.6;color:#6b4b4b;text-align:center">
      Sent by {brand} because this address was used to reserve {addr}. {brand} will never ask for your password or payment details by email.
    </p>
  </td></tr>
</table>"""


async def send_reservation_confirmation(*, to: str, address: str, position: int) -> str:
    subject = f"{address} is reserved for you — #{position} in line"
    return await send_email(to=to, subject=subject, html=reservation_confirmation_html(address=address, position=position))
