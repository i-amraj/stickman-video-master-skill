/* ============================================================================
   BHANGARH — BUNTY BUILD (khud likha, Gemini ke system se seekh kar)
   Base: Perfected (Papa video) ka actor engine + apne sets/materials.
   1080x1920, 30fps, 49.0s, Script_v1 (L1-L13)
   ============================================================================ */

E('rect', { x: 0, y: 0, width: 1080, height: 1920, fill: '#060911' }, stage);
const TL = gsap.timeline({ paused: true });
const FLOOR = 1560;

// ============================================================================
// 1. MATERIALS — har surface gradient/texture, flat rang kabhi nahi
// ============================================================================
(function initBuntyShaders() {
  iGrad('bNightSky', [['0%', '#04070f', 1], ['45%', '#0d1b31', 1], ['80%', '#1d3554', 1], ['100%', '#2c4769', 1]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bGoldenSky', [['0%', '#1e4e8c', 1], ['42%', '#63b3ed', 1], ['78%', '#f6ad55', 1], ['100%', '#fefcbf', 1]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bStormSky', [['0%', '#12030a', 1], ['45%', '#38091d', 1], ['80%', '#6d1739', 1], ['100%', '#8f1d4e', 1]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bDuskSky', [['0%', '#0e1626', 1], ['50%', '#31435f', 1], ['82%', '#7d6a72', 1], ['100%', '#c98a5e', 1]], { x1: '0', y1: '0', x2: '0', y2: '1' });

  iGrad('bStoneWall', [['0%', '#5b6b82', 1], ['55%', '#3d4c63', 1], ['100%', '#232f45', 1]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bStoneDark', [['0%', '#39465c', 1], ['100%', '#1a2436', 1]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bSandstone', [['0%', '#f2b25c', 1], ['55%', '#d98a35', 1], ['100%', '#9c5a1e', 1]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bSandDeep', [['0%', '#c47b2d', 1], ['100%', '#7c4416', 1]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bRockFace', [['0%', '#8d99ae', 1], ['45%', '#5d6b82', 1], ['100%', '#2e394d', 1]], { x1: '0.15', y1: '0.1', x2: '0.85', y2: '0.95' });
  iGrad('bRockDark', [['0%', '#4a576e', 1], ['100%', '#1f2939', 1]], { x1: '0', y1: '0', x2: '1', y2: '1' });
  iGrad('bGroundNight', [['0%', '#2b3a52', 1], ['100%', '#141e30', 1]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bGroundDay', [['0%', '#c99a5b', 1], ['100%', '#8a5f2c', 1]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bWoodCounter', [['0%', '#a06a34', 1], ['50%', '#7c4c1e', 1], ['100%', '#4c2c0e', 1]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bAsiBlue', [['0%', '#2456c8', 1], ['55%', '#1e3a8a', 1], ['100%', '#0e2150', 1]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bBrass', [['0%', '#fef08a', 1], ['50%', '#d97706', 1], ['100%', '#78350f', 1]], { x1: '0', y1: '0', x2: '1', y2: '1' });
  iGrad('bMoonGlow', [['0%', '#ffffff', 0.5], ['55%', '#cbd5e1', 0.16], ['100%', '#cbd5e1', 0]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bLampGlow', [['0%', '#fde68a', 0.5], ['60%', '#f59e0b', 0.14], ['100%', '#f59e0b', 0]], { x1: '0', y1: '0', x2: '0', y2: '1' });
  iGrad('bVignette', [['0%', '#000000', 0], ['72%', '#000000', 0], ['100%', '#000000', 0.42]], { x1: '0.5', y1: '0.5', x2: '0.5', y2: '0.5' });

  if (!document.getElementById('drop3D')) {
    const f = E('filter', { id: 'drop3D', x: '-20%', y: '-15%', width: '140%', height: '140%' }, D);
    E('feDropShadow', { dx: '0', dy: '10', stdDeviation: '7', 'flood-color': '#000000', 'flood-opacity': '0.44' }, f);
  }
  if (!document.getElementById('magicGlow')) {
    const g = E('filter', { id: 'magicGlow', x: '-40%', y: '-40%', width: '180%', height: '180%' }, D);
    E('feGaussianBlur', { stdDeviation: '9', result: 'b' }, g);
    const m = E('feMerge', {}, g);
    E('feMergeNode', { in: 'b' }, m);
    E('feMergeNode', { in: 'SourceGraphic' }, m);
  }
})();

const world = E('g', {}, stage);
const camG = E('g', {}, world);
const camF = makeCam(camG);
const uiLayer = E('g', {}, stage);

// Vignette — screen-fixed, camera se bahar
(function addVignette() {
  const rg = E('radialGradient', { id: 'bVigR', cx: '50%', cy: '46%', r: '75%' }, D);
  E('stop', { offset: '0%', 'stop-color': '#000000', 'stop-opacity': '0' }, rg);
  E('stop', { offset: '74%', 'stop-color': '#000000', 'stop-opacity': '0' }, rg);
  E('stop', { offset: '100%', 'stop-color': '#000000', 'stop-opacity': '0.40' }, rg);
  E('rect', { x: 0, y: 0, width: 1080, height: 1920, fill: 'url(#bVigR)' }, uiLayer);
})();

// ============================================================================
// 2. HUD — banner + subtitle (apna setCaption)
// ============================================================================
const hudG = E('g', {}, uiLayer);
E('rect', { x: 108, y: 118, width: 864, height: 104, rx: 14, fill: 'rgba(5,8,14,0.88)', stroke: '#f5c542', 'stroke-width': 3 }, hudG);
const bannerTxt = bigText(hudG, 540, 186, '', 43, '#fef08a', 900, 'middle', 1);
E('rect', { x: 48, y: 1652, width: 984, height: 140, rx: 14, fill: 'rgba(4,10,10,0.88)', stroke: '#f59e0b', 'stroke-width': 3 }, hudG);
const subL1 = bigText(hudG, 540, 1712, '', 33, '#ffffff', 800, 'middle', 1);
const subL2 = bigText(hudG, 540, 1764, '', 33, '#fef08a', 800, 'middle', 1);
function setCaption(t, banner, l1, l2) {
  TL.call(function () {
    bannerTxt.textContent = banner;
    subL1.textContent = l1;
    subL2.textContent = l2;
  }, null, t);
}

// ============================================================================
// 3. MATERIAL HELPERS — pathar ki deewar, asal chattan, sheeshi, board
// ============================================================================
// Pathar ki deewar: courses + har pathar alag shade + daag + daraar
function drawStoneWall(parent, x, y, w, h, seed, dark) {
  const g = E('g', { transform: 'translate(' + x + ' ' + y + ')' }, parent);
  E('rect', { x: 0, y: 0, width: w, height: h, fill: dark ? 'url(#bStoneDark)' : 'url(#bStoneWall)', stroke: '#0b1120', 'stroke-width': 3 }, g);
  let rnd = seed || 7;
  function srnd() { rnd = (rnd * 16807) % 2147483647; return rnd / 2147483647; }
  const rowH = 64;
  for (let ry = 0; ry < h - 10; ry += rowH) {
    const off = (Math.floor(ry / rowH) % 2) * 70;
    for (let rx = -off; rx < w - 20; rx += 138) {
      const bx = Math.max(0, rx), bw = Math.min(132, w - bx);
      if (bw < 26) continue;
      const tone = 0.82 + srnd() * 0.36;
      const base = dark ? [43, 54, 74] : [84, 99, 124];
      const col = 'rgb(' + Math.round(base[0] * tone) + ',' + Math.round(base[1] * tone) + ',' + Math.round(base[2] * tone) + ')';
      E('rect', { x: bx + 3, y: ry + 3, width: bw - 6, height: rowH - 6, rx: 7, fill: col, stroke: 'rgba(6,10,18,0.55)', 'stroke-width': 2 }, g);
      E('line', { x1: bx + 8, y1: ry + 9, x2: bx + bw - 14, y2: ry + 9, stroke: 'rgba(255,255,255,0.13)', 'stroke-width': 3 }, g);
    }
  }
  // mausam ke daag (neeche ki taraf behte hue)
  for (let s = 0; s < Math.floor(w / 190); s++) {
    const sx = 30 + srnd() * (w - 60);
    E('path', { d: 'M ' + sx + ' 0 C ' + (sx - 7) + ' ' + (h * 0.3) + ' ' + (sx + 6) + ' ' + (h * 0.55) + ' ' + (sx - 3) + ' ' + (h * (0.5 + srnd() * 0.4)) + ' L ' + (sx + 13) + ' ' + (h * (0.5 + srnd() * 0.4)) + ' C ' + (sx + 16) + ' ' + (h * 0.4) + ' ' + (sx + 9) + ' ' + (h * 0.2) + ' ' + (sx + 15) + ' 0 Z', fill: 'rgba(10,14,22,0.20)' }, g);
  }
  return g;
}

// ASAL CHATTAN (boulder): asaman bahu-bhuj, 3 facet shades, daraar lakeerein, ret-mitti
function drawRealBoulder(parent, x, y, sc, seed) {
  const g = E('g', { transform: 'translate(' + x + ' ' + y + ') scale(' + sc + ')' }, parent);
  E('ellipse', { cx: 6, cy: 128, rx: 148, ry: 24, fill: 'rgba(0,0,0,0.42)' }, g);
  const pts = [[-138, 62], [-142, -6], [-112, -66], [-58, -104], [8, -118], [74, -100], [122, -52], [140, 8], [118, 66], [58, 104], [-12, 116], [-84, 100]];
  const poly = pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' ');
  E('polygon', { points: poly, fill: 'url(#bRockFace)', stroke: '#0d1320', 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
  // facet shades — roshni upar-bayein se
  E('polygon', { points: '-138,62 -142,-6 -112,-66 -40,-20 -52,58', fill: 'rgba(255,255,255,0.10)' }, g);
  E('polygon', { points: '118,66 140,8 122,-52 60,-8 58,104', fill: 'rgba(4,8,16,0.28)' }, g);
  E('polygon', { points: '-52,58 -40,-20 60,-8 58,104 -12,116 -84,100', fill: 'rgba(4,8,16,0.13)' }, g);
  // daraarein (cracks) — asal pathar ki pehchan
  E('path', { d: 'M -96 -58 L -58 -22 L -66 18 L -38 52', stroke: '#141c2c', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }, g);
  E('path', { d: 'M -58 -22 L -14 -30', stroke: '#141c2c', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }, g);
  E('path', { d: 'M 66 -78 L 44 -30 L 66 12 L 48 58', stroke: '#141c2c', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }, g);
  E('path', { d: 'M 44 -30 L 92 -18', stroke: '#141c2c', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }, g);
  E('path', { d: 'M -110 34 L -62 44 M 96 40 L 52 52', stroke: 'rgba(10,16,26,0.6)', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }, g);
  // ret-mitti ke daag
  E('ellipse', { cx: -70, cy: 84, rx: 34, ry: 10, fill: 'rgba(146,110,64,0.35)' }, g);
  E('ellipse', { cx: 78, cy: 88, rx: 28, ry: 9, fill: 'rgba(146,110,64,0.28)' }, g);
  return g;
}

// Itar ki sheeshi — kaanch gradient + chamak + sunehra dhakkan
function drawPerfumeBottle(parent, x, y, sc, glassCol, glassDark) {
  const g = E('g', { transform: 'translate(' + x + ' ' + y + ') scale(' + sc + ')' }, parent);
  E('ellipse', { cx: 0, cy: 4, rx: 30, ry: 7, fill: 'rgba(0,0,0,0.35)' }, g);
  const bg = E('radialGradient', { id: 'glass_' + x + '_' + y, cx: '35%', cy: '30%', r: '80%' }, D);
  E('stop', { offset: '0%', 'stop-color': '#ffffff', 'stop-opacity': '0.85' }, bg);
  E('stop', { offset: '28%', 'stop-color': glassCol, 'stop-opacity': '0.95' }, bg);
  E('stop', { offset: '100%', 'stop-color': glassDark, 'stop-opacity': '1' }, bg);
  E('path', { d: 'M -10 -52 L 10 -52 L 10 -34 C 26 -24 30 -8 30 8 C 30 30 16 40 0 40 C -16 40 -30 30 -30 8 C -30 -8 -26 -24 -10 -34 Z', fill: 'url(#glass_' + x + '_' + y + ')', stroke: 'rgba(20,16,8,0.65)', 'stroke-width': 2.5 }, g);
  E('ellipse', { cx: -13, cy: -2, rx: 6, ry: 16, fill: 'rgba(255,255,255,0.5)', transform: 'rotate(-14 -13 -2)' }, g);
  E('rect', { x: -11, y: -66, width: 22, height: 15, rx: 3, fill: 'url(#bBrass)', stroke: '#5f3707', 'stroke-width': 2 }, g);
  E('circle', { cx: 0, cy: -72, r: 6, fill: 'url(#bBrass)', stroke: '#5f3707', 'stroke-width': 1.6 }, g);
  return g;
}

// ASI board — poora, bina kata (asal board ka text)
function drawAsiBoard(parent, x, y, sc) {
  const g = E('g', { transform: 'translate(' + x + ' ' + y + ') scale(' + sc + ')', filter: 'url(#drop3D)' }, parent);
  E('rect', { x: -95, y: 118, width: 26, height: 330, fill: '#2c3a52', stroke: '#0b1120', 'stroke-width': 3 }, g);
  E('rect', { x: 69, y: 118, width: 26, height: 330, fill: '#2c3a52', stroke: '#0b1120', 'stroke-width': 3 }, g);
  E('rect', { x: -212, y: -138, width: 424, height: 268, rx: 12, fill: 'url(#bAsiBlue)', stroke: '#dbe7ff', 'stroke-width': 7 }, g);
  E('rect', { x: -196, y: -122, width: 392, height: 236, rx: 8, fill: 'none', stroke: 'rgba(219,231,255,0.5)', 'stroke-width': 2 }, g);
  bigText(g, 0, -88, 'भारतीय पुरातत्व सर्वेक्षण', 25, '#fcd34d', 800, 'middle', 1);
  bigText(g, 0, -56, 'ARCHAEOLOGICAL SURVEY OF INDIA', 21.5, '#ffffff', 800, 'middle', 1);
  bigText(g, 0, -18, 'WARNING / सावधान', 27, '#fbbf24', 900, 'middle', 1);
  bigText(g, 0, 20, 'सूर्यास्त के बाद और सूर्योदय से पहले', 20.5, '#ffffff', 700, 'middle', 1);
  bigText(g, 0, 48, 'भानगढ़ किले में प्रवेश सख्त वर्जित है।', 20.5, '#ffffff', 700, 'middle', 1);
  bigText(g, 0, 82, 'ENTERING BEFORE SUNRISE AND', 19, '#ffffff', 800, 'middle', 1);
  bigText(g, 0, 108, 'AFTER SUNSET IS STRICTLY PROHIBITED', 19, '#f87171', 800, 'middle', 1);
  return g;
}

// Latakta hua tel-lamp (diya) — bazaar/mehel ki zindagi
function drawHangingLamp(parent, x, y, sc) {
  const g = E('g', { transform: 'translate(' + x + ' ' + y + ') scale(' + sc + ')' }, parent);
  E('line', { x1: 0, y1: -130, x2: 0, y2: -26, stroke: '#2a1c0c', 'stroke-width': 4 }, g);
  E('circle', { cx: 0, cy: 6, r: 52, fill: 'url(#bLampGlow)' }, g);
  E('path', { d: 'M -24 -24 L 24 -24 L 15 8 C 8 20 -8 20 -15 8 Z', fill: '#3a2a16', stroke: '#120b04', 'stroke-width': 2.5 }, g);
  E('ellipse', { cx: 0, cy: -26, rx: 7, ry: 12, fill: '#fcd34d' }, g);
  E('ellipse', { cx: 0, cy: -22, rx: 3.4, ry: 7, fill: '#fff7cc' }, g);
  TL.to(g, { rotation: 2.6, svgOrigin: '0 -130', duration: 2.3, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0.2 + (x % 5) * 0.3);
  return g;
}
