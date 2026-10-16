import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":390,"height":844})
        await pg.goto("https://privacy-mail-site.preview.emergentagent.com", wait_until="networkidle")
        await pg.wait_for_timeout(1500)
        for sel in ["#product","#better-web","#security","#audiences","footer"]:
            await pg.evaluate(f"document.querySelector('{sel}').scrollIntoView()"); await pg.wait_for_timeout(500)
        w = await pg.evaluate("document.documentElement.scrollWidth")
        print("scrollWidth", w)
        await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(800)
        await pg.screenshot(path="/tmp/m_hero.png")
        await pg.evaluate("document.querySelector('#product').scrollIntoView()"); await pg.wait_for_timeout(800)
        await pg.screenshot(path="/tmp/m_product.png")
        await b.close()
asyncio.run(main())
