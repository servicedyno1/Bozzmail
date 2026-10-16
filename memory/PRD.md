# PRD — Bozzmail Landing Page (Tuta-fidelity design)

## Original problem statement
"can you design exact quality as this landing page https://tuta.com/?" — later: "bozzmail.com will be used and branding needs to be created and logo", and "the quality is still poor when compared to tuta.com — clear from the logo and all other graphics quality and styles".

## User decisions (verbatim)
- Audience: privacy-conscious individuals; CTA: email capture / waitlist (stored in MongoDB)
- Palette: **Use Tuta's exact red/burgundy/peach palette**
- Logo: option **c — Lettermark "b" with envelope bowl**
- "where does waitlist go? we should have a mongodb" → confirmed: MongoDB `waitlist` collection

## Architecture
- Backend: FastAPI `/app/backend/server.py` — POST /api/waitlist (201/409/422), GET /api/waitlist, GET /api/waitlist/count; MongoDB via MONGO_URL/DB_NAME, collection `waitlist` {email, created_at}
- Backend tests: `/app/backend/tests/test_waitlist.py` (8 pytest tests, passing)
- Frontend: React CRA + Tailwind + framer-motion + shadcn (sonner toasts) + react-icons; single page `/`
- Mobile smoke script: `/app/frontend/tests/mobile_check.py` (run with /opt/plugins-venv/bin/python)

## Design system (Tuta tokens, in /app/frontend/src/index.css + tailwind.config.js)
- Colors: red-nota #D93951, red-tutao #850122, red-dunkel #410002, red-fighter #FF0A0A, candy #FFCCCC, candy-light #FFEDEA, peach #FFF2EA, dark-peach #E4C8B7, yellow-action #FEF9C3, sonne #FEE06A, green-tutao #015F47, green-nota #009074, green-candy #C3ECE0, lavender #EEEDF9, navy, teal
- Type: Noto Sans (body/headings), IBM Plex Mono 600 (hero display, stand-in for Tuta's MDIO)
- Radius 6px, shadows `0 4px 8px #0003` / `#41000240`, content width 1254px, header pill 1286px
- Section titles: one bold word pattern (`<strong>Secure</strong> at a touch`)

## Brand assets
- `/public/brand/mark-lettermark.png` (chosen), `mark-isometric.png`, `mark-shield.png`, `logo-concepts.png` (alternates kept)
- Wordmark: bold italic "bozzmail" in burgundy; product variants "bozzmail mail / calendar"
- favicon.png + apple-touch-icon.png
- Illustrations `/public/illustrations/`: switch-on.webp, switch-off-finger.webp (alpha-keyed), usp_secure/green/adfree.webp, story_servers/founders/team.webp, aud_business/medical/personal/activists/journalists.webp, free_phone.webp (alpha), biz_photo.webp

## Page sections (2026-10-16 rebuild — DONE, tested)
1. Green announcement bar + floating white header pill (6 links, "Why Bozzmail" outline, "Join waitlist" filled, mobile hamburger)
2. Scroll-driven sticky hero: red → dark burgundy, "Turn ON Privacy" → scramble → "Turn OFF Surveillance", light switch + finger illustration, waitlist form (yellow → bright-red button)
3. "Secure at a touch" — product tabs (mail/calendar) with product logos, timeline USP list (active red + dashed ring), CSS desktop + phone mockups, floating "quantum-safe" card
4. "A better web" — Secure/Green/Ad-free peach cards with illustrations + speech-bubble "Bozzmail promise" statements (dots)
5. "Turn OFF Surveillance" red band + waitlist form
6. "Download Bozzmail" — 6 platform icons with Soon badges
7. "Freedom fighters" — two photo stories with overlapping peach boxes + round/shield badges; team mosaic + CTA
8. "Welcome to post-quantum security" — 6-card bento (nota/tutao/candy/sonne) with ribbon badge
9. "Privacy for your organization" — lavender section, photo + copy + burgundy CTA
10. "For all your email needs" — 5 audience cards with illustrations
11. "Forever free" red band + waitlist form + phone illustration
12. Footer — logo, socials, 6 columns, language select, badges

## Testing (iteration_1, 2026-10-16)
- Backend 100% (8/8), frontend ~95% → one mobile overflow bug fixed (responsive logo in tabs); scrollWidth = 390 verified

## Mobile optimization (2026-10-16) — DONE
- Section padding 64px on mobile (96px ≥768px), single-line announcement bar, larger hero switch, 100svh hero, longer mobile hero scroll range
- USP timeline compacted (56px icon column), desktop-mockup sidebar hidden <sm, orphan 5th audience card centered, min-height on audience copy
- Verified via `/app/frontend/tests/mobile_audit.py` (screens + overflow offenders) and `mobile_flow.py` (menu, hero toggle, waitlist submit, tabs, no JS errors, scrollWidth 390)

## Address reservation (2026-10-16) — DONE, tested (iteration_2: frontend 100%, backend 22/22 pytest)
- Replaced the plain waitlist with "Reserve your @bozzmail.com address" in all 3 forms (hero, Turn OFF Surveillance band, Forever free band)
- Backend `/app/backend/reservations.py`: GET /api/reservations/check?handle= (available / invalid / taken), POST /api/reservations {handle,email} (201 / 409 taken / 409 email already holds reservation / 422 invalid), GET /api/reservations/count; unique indexes on handle + email; blocklist of system/brand handles; rules 3–30 chars, [a-z0-9.-], no leading/trailing or adjacent dots/hyphens; case-insensitive
- Collection `reservations`: {id, handle, address, email, position, created_at}. Legacy `waitlist` collection kept untouched
- Frontend `ReserveForm.jsx`: live debounced availability, submit disabled until available + email, success card "yourname@bozzmail.com is reserved · #N in line" with Copy + Share (Web Share API / clipboard fallback)
- Tests: `/app/backend/tests/test_reservations.py` (14 tests)

## Pricing + confirmation email (2026-10-16) — DONE, tested (iteration_3: backend 16/16, frontend 100%)
- `Pricing.jsx` "Planned pricing": Free €0 / Revolutionary €3 (yearly, €3,60 monthly, Most popular) / Legend €8 (yearly, €9,60 monthly); monthly/yearly toggle; CTAs → #reserve; nav + footer "Pricing" links; placed after security grid
- `emailer.py`: Emergent-managed Resend proxy (EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME=Bozzmail, APP_PUBLIC_URL in backend/.env; EMAIL_BASE_URL constant), playbook guardrail gate on every send, branded table-based template (address, position, invite link to APP_PUBLIC_URL)
- `reservations.py`: BackgroundTasks → deliver_confirmation records `confirmation_email {status: sent|paused|failed, id, sent_at}` on the reservation; GET /api/reservations/{id}/status
- NOTE: APP_PUBLIC_URL currently points to the preview URL — set to https://bozzmail.com at production deploy. Sender address is the platform's managed sender with display name "Bozzmail".

## SEO + conversion audit fixes (2026-10-16) — DONE, tested (iteration_4: frontend 100%)
- SEO (farm-seo-setup skill): title/description/canonical (https://bozzmail.com — user-confirmed production domain), OG + Twitter cards, og-image.png 1200×630 (PIL-generated from brand assets), JSON-LD @graph (Organization, WebSite, SoftwareApplication, FAQPage mirroring on-page FAQ), noscript h1+paragraph, robots.txt (explicit AI-crawler group, Disallow /api/), sitemap.xml, llms.txt. Verified served with correct content-types. Deploy handoff: redeploy + enable "Search Engine Crawling" toggle; re-verify on live domain; submit sitemap in Google Search Console.
- Conversion fixes: ProblemBeat section after hero; FAQ accordion (6 Qs) before Forever free; hero subheadline split + proof line (live counter via /api/reservations/count, shown as count when ≥50 else "Be among the first"); hero CTA always enabled-looking with click-time validation toasts; Download moved below Pricing; plan CTAs "Reserve my address"; "Why Bozzmail" demoted to text link; nav FAQ link; value bubbles → "How it works" facts; 65ch measure caps; switch frames cropped to remove headroom
- Omitted from structured data (unconfirmed): social sameAs URLs, hello@bozzmail.com email, address/phone, prices

## Backlog
- P1: Admin view / CSV export of waitlist
- P2: Rate limiting on POST /api/waitlist; store created_at as BSON datetime
- P2: i18n, blog/press, real testimonials once available
