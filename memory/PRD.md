# PRD — Enclave Landing Page (Tuta-quality design study)

## Original problem statement
"can you design exact quality as this landing page https://tuta.com/?"

## Discovery answers (verbatim)
- Page for: own business with same design quality as tuta.com; faithful design study/replica of tuta.com
- Audience: privacy-conscious individuals
- Showcase: skipped → defaults (encrypted email, calendar, pricing plans)
- Differentiator: "ok" → no concrete claim given (no fabricated stats/reviews used)
- Main CTA: email capture / waitlist form

## Architecture
- FastAPI backend (/app/backend/server.py): POST /api/waitlist (201/409/422), GET /api/waitlist, GET /api/waitlist/count; MongoDB `waitlist` collection via MONGO_URL/DB_NAME
- React frontend: single landing page at /, shadcn Tabs + sonner toasts, framer-motion reveals
- Design: light Tuta-faithful theme — paper #FDFDFA, ink #1B1526, crimson #850122, pine green #015F47; Cabinet Grotesk (display) + Satoshi (body) via Fontshare
- Product mockups (Mail inbox, Calendar week) hand-built in JSX/CSS for Tuta-level fidelity

## Implemented (2026-10-16)
- Sticky header with scroll state + mobile menu
- Hero "Turn ON Privacy." with interactive animated privacy toggle + working waitlist form
- Tabbed product showcase (Enclave Mail / Enclave Calendar) with CSS-crafted app mockups
- "A better web." values section (Secure / Green / Ad-free) with honest placeholder testimonial slots
- "Turn OFF Surveillance." dark band with CTA
- Download section (platform pills, "Soon" badges — no fake links)
- "Freedom fighters." mission cards
- "Post-quantum security." 6-item feature grid
- Audience cards (Business / Medical / Personal / Journalists) with real curated images
- "Forever free." crimson CTA band with second working waitlist form
- Comprehensive dark footer
- Page title/meta updated

## Tested
- Backend: 201 create, 409 duplicate, 422 invalid, count endpoint (curl)
- Frontend: hero form submit (toast + "You're in" state), CTA form submit, toggle, tab switch both directions, all audience images load, mobile 390px layout
- Console: clean (AnimatePresence warnings fixed)

## Backlog
- P0: Real brand name, logo, real differentiator copy from owner (currently placeholder brand "Enclave")
- P1: Pricing section (Tuta-like plan table)
- P1: SEO setup (OG tags, sitemap — farm-seo-setup skill)
- P2: i18n, blog/press section, admin view of waitlist signups
