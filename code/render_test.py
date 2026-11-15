import sys, time, os
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'test_stills')
os.makedirs(OUT, exist_ok=True)
TIMES = [28.0, 30.9, 39.0]
CHROME = '/home/hatch/.cache/ms-playwright/chromium-1194/chrome-linux/chrome'

errors = []
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=CHROME, args=[
        '--no-sandbox', '--disable-dev-shm-usage',
        '--use-gl=angle', '--use-angle=swiftshader',
        '--enable-unsafe-swiftshader'])
    pg = b.new_page(viewport={'width': 1080, 'height': 1920})
    pg.on('console', lambda m: errors.append('CONSOLE ' + m.type + ': ' + m.text) if m.type in ('error',) else None)
    pg.on('pageerror', lambda e: errors.append('PAGEERROR: ' + str(e)))
    pg.goto('file://' + os.path.join(HERE, 'index.html'))
    pg.wait_for_function('typeof window.seekToTime === "function"', timeout=30000)
    t0 = time.time()
    for t in TIMES:
        s = time.time()
        pg.evaluate('(t) => window.seekToTime(t)', t)
        pg.wait_for_timeout(60)
        pg.screenshot(path=os.path.join(OUT, 't_%05.1f.png' % t))
        print('t=%.1f  %.2fs' % (t, time.time() - s), flush=True)
    print('TOTAL %.1fs for %d frames' % (time.time() - t0, len(TIMES)))
    b.close()
print('ERRORS:', len(errors))
for e in errors[:20]:
    print(e)
