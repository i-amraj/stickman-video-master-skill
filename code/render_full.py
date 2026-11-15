#!/usr/bin/env python3
"""BHANGARH v2 (2.5D anime master) full render: 49s x 30fps JPEG frames -> segments -> preview mp4 (silent).
Resume: frame file exists + >10KB to skip. Harness fix: subtitle text wider than canvas gets textLength squash."""
import asyncio, subprocess, os
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
OUTROOT = os.path.dirname(HERE)
CHROME = os.path.expanduser('~/.cache/ms-playwright/chromium-1194/chrome-linux/chrome')
FPS, DUR = 30, 49.0
SEG = 490
TOTAL = int(DUR * FPS)
FIXER = """() => { document.querySelectorAll('text').forEach(el => { try { const L = el.getComputedTextLength(); if (L > 1030) { el.setAttribute('textLength', '1030'); el.setAttribute('lengthAdjust', 'spacingAndGlyphs'); } } catch(e){} }); }"""

async def main():
    fdir = os.path.join(HERE, 'frames_bunty')
    os.makedirs(fdir, exist_ok=True)
    async with async_playwright() as pw:
        b = await pw.chromium.launch(executable_path=CHROME, args=['--no-sandbox', '--use-gl=swiftshader', '--disable-web-security'])
        pg = await b.new_page(viewport={'width': 1080, 'height': 1920})
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://' + os.path.join(HERE, 'index.html'))
        try:
            await pg.wait_for_function("typeof window.seekToTime === 'function'", timeout=20000)
        except Exception:
            await pg.wait_for_timeout(4000)
        print('ready', flush=True)
        for i in range(TOTAL):
            fp = os.path.join(fdir, 'f%04d.jpg' % i)
            if os.path.exists(fp) and os.path.getsize(fp) > 10000:
                continue
            await pg.evaluate('window.seekToTime(%f)' % (i / FPS))
            await pg.evaluate(FIXER)
            await pg.screenshot(path=fp, type='jpeg', quality=88)
            if i % 150 == 0:
                print('frame', i, '/', TOTAL, flush=True)
        await b.close()
        print('ERRORS:', len(errs), errs[:3], flush=True)
    lst = os.path.join(HERE, 'concat_bunty.txt')
    with open(lst, 'w') as f:
        for s in range(0, TOTAL, SEG):
            seg = os.path.join(HERE, 'seg_bunty_%d.mp4' % (s // SEG))
            subprocess.run(['ffmpeg', '-y', '-v', 'error', '-framerate', str(FPS), '-start_number', str(s),
                            '-i', os.path.join(fdir, 'f%04d.jpg'), '-frames:v', str(min(SEG, TOTAL - s)),
                            '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', seg], check=True)
            f.write("file '%s'\n" % seg)
    final = os.path.join(OUTROOT, 'Bhangarh_BuntyBuild.mp4')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', final], check=True)
    print('FINAL:', final, flush=True)

asyncio.run(main())
print('DONE')
