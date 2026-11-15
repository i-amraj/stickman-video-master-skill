function drawRealisticTree(parent, x, y, sc, seed) {
  const g = E('g', { transform: 'translate(' + x + ' ' + y + ') scale(' + sc + ')' }, parent);
  E('ellipse', { cx: 0, cy: 8, rx: 145, ry: 20, fill: 'rgba(0,0,0,0.38)' }, g);
  E('path', { d: 'M -42 6 C -26 -40 -22 -160 -28 -280 C -32 -340 -18 -390 -10 -430 L 18 -430 C 14 -370 24 -250 28 -140 C 32 -50 48 6 42 6 Z', fill: '#422814', stroke: '#1f1107', 'stroke-width': 3 }, g);
  E('path', { d: 'M -14 -10 C -8 -140 -14 -260 -6 -390 M 8 -20 C 12 -150 8 -270 10 -380', stroke: '#29170a', 'stroke-width': 3.5, fill: 'none' }, g);
  E('path', { d: 'M -12 -290 Q -95 -360 -155 -430 M -65 -345 Q -120 -330 -165 -355', stroke: '#422814', 'stroke-width': 18, fill: 'none', 'stroke-linecap': 'round' }, g);
  E('path', { d: 'M 10 -320 Q 95 -385 150 -450 M 65 -365 Q 125 -355 165 -380', stroke: '#422814', 'stroke-width': 16, fill: 'none', 'stroke-linecap': 'round' }, g);
  E('path', { d: 'M 2 -390 Q -25 -465 -55 -520 M 6 -400 Q 35 -475 65 -525', stroke: '#422814', 'stroke-width': 14, fill: 'none', 'stroke-linecap': 'round' }, g);

  const boughs = [
    { cx: -140, cy: -410, rx: 95, ry: 65, c1: '#143316', c2: '#225426', c3: '#488c40' },
    { cx: 135,  cy: -430, rx: 100, ry: 68, c1: '#112b13', c2: '#1d4720', c3: '#3d7a35' },
    { cx: -65,  cy: -485, rx: 110, ry: 74, c1: '#183d1b', c2: '#2b662f', c3: '#59a64f' },
    { cx: 65,   cy: -490, rx: 105, ry: 72, c1: '#163819', c2: '#265c2a', c3: '#4f9946' },
    { cx: 0,    cy: -445, rx: 120, ry: 80, c1: '#1b451e', c2: '#317335', c3: '#68b85d' },
    { cx: -5,   cy: -545, rx: 98,  ry: 66, c1: '#204f24', c2: '#39823e', c3: '#7dd171' }
  ];

  boughs.forEach(function (b, idx) {
    const bg = E('g', { transform: 'translate(' + b.cx + ' ' + b.cy + ')' }, g);
    for (let layer = 0; layer < 3; layer++) {
      const col = layer === 0 ? b.c1 : (layer === 1 ? b.c2 : b.c3);
      const s = 1 - layer * 0.18;
      const ox = layer === 2 ? -12 : (layer === 0 ? 8 : 0);
      const oy = layer === 2 ? -12 : (layer === 0 ? 12 : 0);
      const lg = E('g', { transform: 'translate(' + ox + ' ' + oy + ') scale(' + s + ')' }, bg);
      E('ellipse', { cx: 0, cy: 0, rx: b.rx * 0.78, ry: b.ry * 0.72, fill: col }, lg);
      const leafCount = 14;
      for (let k = 0; k < leafCount; k++) {
        const a = (k / leafCount) * Math.PI * 2;
        const lx = Math.cos(a) * (b.rx * 0.76);
        const ly = Math.sin(a) * (b.ry * 0.70);
        const deg = Math.round((a * 180) / Math.PI);
        E('path', {
          d: 'M -22 0 Q 0 -16 26 0 Q 0 16 -22 0 M -18 0 L 20 0',
          fill: col, stroke: 'rgba(10,30,10,0.28)', 'stroke-width': 1.2,
          transform: 'translate(' + lx + ' ' + ly + ') rotate(' + deg + ')'
        }, lg);
      }
    }
    TL.fromTo(bg,
      { rotation: -3.8, skewX: -2.5, svgOrigin: '0 45' },
      { rotation: 4.2, skewX: 2.8, svgOrigin: '0 45', duration: 1.9 + (idx % 3) * 0.35, ease: 'sine.inOut', yoyo: true, repeat: -1 },
      ((seed || 1) + idx) * 0.18
    );
  });

  [[-60, -380], [50, -420]].forEach(function (lf, li) {
    const leaf = E('path', { d: 'M -10 0 Q 0 -7 12 0 Q 0 7 -10 0 Z', fill: '#68b85d', transform: 'translate(' + lf[0] + ' ' + lf[1] + ')' }, g);
    TL.to(leaf, {
      attr: { transform: 'translate(' + (lf[0] - 180) + ' ' + (lf[1] + 320) + ') rotate(260)' },
      duration: 5.2 + li * 1.4, ease: 'sine.inOut', repeat: -1
    }, ((seed || 1) + li) * 0.9);
  });
  return g;
}

function drawWavingGrass(parent, x1, x2, yBase, count) {
  const gg = E('g', {}, parent);
  const step = (x2 - x1) / count;
  for (let i = 0; i < count; i++) {
    const gx = Math.round(x1 + i * step);
    const gh = 26 + (i % 4) * 9;
    const gy = yBase + (i % 3) * 5;
    const col = (i % 3 === 0) ? '#59a64f' : (i % 2 === 0 ? '#39823e' : '#225426');
    const blade = E('path', {
      d: 'M ' + gx + ' ' + gy + ' Q ' + (gx + 4) + ' ' + (gy - gh * 0.6) + ' ' + (gx + 11) + ' ' + (gy - gh) + ' Q ' + (gx + 1) + ' ' + (gy - gh * 0.5) + ' ' + (gx + 5) + ' ' + gy + ' Z',
      fill: col
    }, gg);
    TL.fromTo(blade,
      { rotation: -8, svgOrigin: gx + ' ' + gy },
      { rotation: 12, svgOrigin: gx + ' ' + gy, duration: 1.2 + (i % 4) * 0.2, ease: 'sine.inOut', yoyo: true, repeat: -1 },
      (i % 5) * 0.12
    );
  }
  return gg;
}
