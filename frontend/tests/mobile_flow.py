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
        await pg.fill("[data-testid='hero-waitlist-email-input']", "mobileqa+%d@example.com" % __import__('time').time())
        await pg.click("[data-testid='hero-waitlist-submit-button']"); await pg.wait_for_timeout(1500)
        print("submit:", await pg.inner_text("[data-testid='hero-waitlist-submit-button']"))
        await pg.click("[data-testid='product-tab-calendar']"); await pg.wait_for_timeout(500)
        print("calendar tab:", await pg.is_visible("[data-testid='product-panel-calendar']"))
        for s in ["#product","#better-web","#security","#audiences","footer"]:
            await pg.evaluate(f"document.querySelector('{s}').scrollIntoView()"); await pg.wait_for_timeout(400)
        print("scrollWidth:", await pg.evaluate("document.documentElement.scrollWidth"), "| errors:", errs)
        await b.close()
asyncio.run(main())
