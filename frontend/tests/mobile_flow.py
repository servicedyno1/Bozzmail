import asyncio
from playwright.async_api import async_playwright
URL="https://privacy-mail-site.preview.emergentagent.com"
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={"width":390,"height":844})
        errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(URL, wait_until="networkidle"); await pg.wait_for_timeout(1200)
        await pg.click("[data-testid='nav-menu-toggle']"); await pg.wait_for_timeout(300)
        print("menu open:", await pg.is_visible("[data-testid='nav-mobile-menu']"))
        await pg.click("[data-testid='nav-mobile-cta']"); await pg.wait_for_timeout(800)
        print("menu closed:", not await pg.is_visible("[data-testid='nav-mobile-menu']"))
        await pg.evaluate("window.scrollTo(0,900)"); await pg.wait_for_timeout(900)
        print("hero state:", await pg.get_attribute("[data-testid='hero-section']","data-state"), "| title:", await pg.inner_text("[data-testid='hero-title']"))
        await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(900)
        t=int(__import__('time').time())
        await pg.fill("[data-testid='hero-reserve-handle-input']", f"mobileqa{t}"); await pg.wait_for_timeout(900)
        print("avail:", await pg.get_attribute("[data-testid='hero-reserve-status']","data-status"))
        await pg.fill("[data-testid='hero-reserve-email-input']", f"mobileqa{t}@example.com")
        await pg.click("[data-testid='hero-reserve-submit-button']"); await pg.wait_for_timeout(1500)
        print("success:", await pg.is_visible("[data-testid='hero-reserve-success']"))
        await pg.click("[data-testid='product-tab-calendar']"); await pg.wait_for_timeout(500)
        print("calendar tab:", await pg.is_visible("[data-testid='product-panel-calendar']"))
        for s in ["#problem","#product","#better-web","#security","#pricing","#faq","footer"]:
            await pg.evaluate(f"document.querySelector('{s}').scrollIntoView()"); await pg.wait_for_timeout(400)
        print("scrollWidth:", await pg.evaluate("document.documentElement.scrollWidth"), "| errors:", errs)
        await b.close()
asyncio.run(main())
