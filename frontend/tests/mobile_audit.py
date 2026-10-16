import asyncio, sys
from playwright.async_api import async_playwright

URL = "https://privacy-mail-site.preview.emergentagent.com"
W = int(sys.argv[1]) if len(sys.argv) > 1 else 390

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": W, "height": 844}, device_scale_factor=1)
        await pg.goto(URL, wait_until="networkidle")
        await pg.wait_for_timeout(1500)
        h = await pg.evaluate("document.body.scrollHeight")
        print("height", h)
        y = 0; i = 0
        while y < h:
            await pg.evaluate(f"window.scrollTo(0,{y})")
            await pg.wait_for_timeout(600)
            await pg.screenshot(path=f"/app/frontend/tests/shots/m_{i:02d}.png")
            y += 800; i += 1
        print("scrollWidth", await pg.evaluate("document.documentElement.scrollWidth"))
        # offenders wider than viewport
        off = await pg.evaluate("""() => [...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>window.innerWidth+1||r.left<-1}).slice(0,15).map(e=>e.tagName+'.'+[...e.classList].slice(0,4).join('.')+' '+(e.dataset.testid||''))""")
        print("offenders", off)
        await b.close()
asyncio.run(main())
