
// ============================================================================
// 4. APNA ACTOR BUILDER — Perfected ke skeleton par Bhangarh ke kirdaar
//    (FK 2-segment ang, asal haath, jaw chehra, mood-ready)
// ============================================================================
function buildBhangarhActor(parent, opts) {
  const x = opts.x || 540;
  const y = opts.y || FLOOR;
  const sc = opts.scale || 1.0;
  const role = opts.role || 'ratnavati';

  const wrap = E('g', { transform: 'translate(' + x + ' ' + y + ') scale(' + sc + ')' }, parent);
  E('ellipse', { cx: 0, cy: 0, rx: 76, ry: 16, fill: 'rgba(0,0,0,0.40)' }, wrap);
  const flipG = E('g', opts.faceLeft ? { transform: 'scale(-1 1)' } : {}, wrap);
  const bobG = E('g', { filter: 'url(#drop3D)' }, flipG);

  const DNA = {
    ratnavati: { skin: '#fce2c4', skinSh: '#d9a982', hair: '#17110d', hairD: '#0a0705', sleeve: '#b91c1c', pants: '#7f1d1d', shoes: '#7c2d12', iris: '#047857', lip: '#be123c', female: 1 },
    singhia:   { skin: '#b3a08e', skinSh: '#7d6a58', hair: '#3a3a40', hairD: '#232328', sleeve: '#2a1b3d', pants: '#1c1428', shoes: '#3e2723', iris: '#dc2626', lip: '#5f2120', female: 0 },
    messenger: { skin: '#ecc19c', skinSh: '#c2916a', hair: '#1c1917', hairD: '#0f0d0b', sleeve: '#d97706', pants: '#e7e5e4', shoes: '#3e2723', iris: '#4a2c11', lip: '#8c4a3e', female: 0 },
    maid:      { skin: '#f0c6a2', skinSh: '#c79670', hair: '#18181b', hairD: '#0b0b0d', sleeve: '#0f766e', pants: '#134e4a', shoes: '#7c2d12', iris: '#3b2313', lip: '#9f1239', female: 1 },
    merchant:  { skin: '#e5b892', skinSh: '#bd8d66', hair: '#cbd5e1', hairD: '#94a3b8', sleeve: '#78350f', pants: '#44403c', shoes: '#292524', iris: '#3b2313', lip: '#8c4a3e', female: 0 }
  }[role];

  // --- peeche ki parat: singhia ka kala labaada / auraton ke lambe baal ---
  let capeG = null;
  if (role === 'singhia') {
    capeG = E('g', {}, bobG);
    E('path', { d: 'M -56 -468 C -70 -320 -80 -160 -88 -4 L 88 -4 C 80 -160 70 -320 56 -468 Z', fill: '#150e24', stroke: '#05030c', 'stroke-width': 2.5 }, capeG);
  }
  if (DNA.female) {
    E('path', { d: 'M -56 -555 C -74 -470 -70 -380 -50 -352 L 50 -352 C 70 -380 74 -470 56 -555 Z', fill: DNA.hairD, stroke: 'rgba(0,0,0,0.4)', 'stroke-width': 2 }, bobG);
  }

  function makeLeg(lx) {
    const hipPos = E('g', { transform: 'translate(' + lx + ' -220)' }, bobG);
    const hipRot = E('g', {}, hipPos);
    E('circle', { cx: 0, cy: 0, r: 18, fill: DNA.pants }, hipRot);
    E('rect', { x: -19, y: 0, width: 38, height: 112, rx: 15, fill: DNA.pants, stroke: 'rgba(0,0,0,0.32)', 'stroke-width': 2 }, hipRot);
    const kneePos = E('g', { transform: 'translate(0 105)' }, hipRot);
    const kneeRot = E('g', {}, kneePos);
    E('circle', { cx: 0, cy: 0, r: 16, fill: DNA.pants }, kneeRot);
    E('rect', { x: -17, y: 0, width: 34, height: 108, rx: 13, fill: DNA.pants, stroke: 'rgba(0,0,0,0.32)', 'stroke-width': 2 }, kneeRot);
    E('path', { d: 'M -22 106 C -22 92 28 92 34 108 C 36 116 -22 116 -22 106 Z', fill: DNA.shoes, stroke: '#000', 'stroke-width': 2 }, kneeRot);
    return { hipRot: hipRot, kneeRot: kneeRot };
  }
  const legL = makeLeg(-27);
  const legR = makeLeg(27);

  function makeArm(ax, isLeft) {
    const shPos = E('g', { transform: 'translate(' + ax + ' -442)' }, bobG);
    const shRot = E('g', {}, shPos);
    const shCap = E('circle', { cx: 0, cy: 0, r: 18, fill: DNA.sleeve }, shRot);
    const uSleeve = E('rect', { x: -16, y: 0, width: 32, height: 100, rx: 15, fill: DNA.sleeve, stroke: 'rgba(0,0,0,0.32)', 'stroke-width': 2 }, shRot);
    const elPos = E('g', { transform: 'translate(0 92)' }, shRot);
    const elRot = E('g', {}, elPos);
    const elCap = E('circle', { cx: 0, cy: 0, r: 15, fill: DNA.sleeve }, elRot);
    const fSleeve = E('rect', { x: -14, y: 0, width: 28, height: 90, rx: 13, fill: DNA.sleeve, stroke: 'rgba(0,0,0,0.32)', 'stroke-width': 2 }, elRot);
    if (DNA.female) { // sunehri choodiyan kalaai par
      E('rect', { x: -15, y: 66, width: 30, height: 8, rx: 3, fill: '#facc15', stroke: '#92400e', 'stroke-width': 1.4 }, elRot);
      E('rect', { x: -15, y: 77, width: 30, height: 8, rx: 3, fill: '#dc2626', stroke: '#7f1d1d', 'stroke-width': 1.4 }, elRot);
    }
    const handG = E('g', { transform: 'translate(0 90)' }, elRot);
    E('ellipse', { cx: 0, cy: 9, rx: 14, ry: 17, fill: DNA.skin, stroke: DNA.skinSh, 'stroke-width': 2 }, handG);
    E('ellipse', { cx: isLeft ? 11 : -11, cy: 3, rx: 5.5, ry: 9.5, fill: DNA.skin, stroke: DNA.skinSh, 'stroke-width': 1.8, transform: 'rotate(' + (isLeft ? 22 : -22) + ' ' + (isLeft ? 11 : -11) + ' 3)' }, handG);
    E('path', { d: 'M -6 14 L -6 22 M 0 15 L 0 23 M 6 14 L 6 22', stroke: DNA.skinSh, 'stroke-width': 1.6, 'stroke-linecap': 'round' }, handG);
    return { shPos: shPos, shRot: shRot, elPos: elPos, elRot: elRot, handG: handG, shCap: shCap, uSleeve: uSleeve, elCap: elCap, fSleeve: fSleeve };
  }
  const armL = makeArm(-68, true);

  // --- saree ka ghagra (taangon ke upar, dhad ke neeche) ---
  let skirtG = null;
  if (DNA.female) {
    skirtG = E('g', {}, bobG);
    const skirtCol = role === 'ratnavati' ? '#991b1b' : '#115e59';
    const skirtDk = role === 'ratnavati' ? '#7f1d1d' : '#0b3f3b';
    E('path', { d: 'M -50 -238 C -58 -150 -72 -70 -84 -4 L 84 -4 C 72 -70 58 -150 50 -238 Z', fill: skirtCol, stroke: skirtDk, 'stroke-width': 2.5 }, skirtG);
    for (let px = -56; px <= 56; px += 16) {
      E('line', { x1: px * 0.62, y1: -232, x2: px, y2: -16, stroke: 'rgba(0,0,0,0.20)', 'stroke-width': 3 }, skirtG);
    }
    E('path', { d: 'M -84 -4 L 84 -4 L 80 -34 L -80 -34 Z', fill: 'url(#bBrass)', opacity: role === 'ratnavati' ? 0.95 : 0.45 }, skirtG);
    E('rect', { x: -54, y: -244, width: 108, height: 13, fill: 'url(#bBrass)', stroke: '#7c4a03', 'stroke-width': 1.6 }, skirtG);
  }

  const torsoG = E('g', { transform: 'translate(0 -220)' }, bobG);
  const addons = {};
  if (role === 'ratnavati' || role === 'maid') {
    const top = role === 'ratnavati' ? '#b91c1c' : '#0f766e';
    const topDk = role === 'ratnavati' ? '#7f1d1d' : '#0b3f3b';
    E('path', { d: 'M -62 -245 C -68 -160 -54 -55 -50 0 L 50 0 C 54 -55 68 -160 62 -245 Z', fill: top, stroke: topDk, 'stroke-width': 2.5 }, torsoG);
    // saree ka aanchal — kandhe se kamar tak tedi patti, sunehri kinari
    E('path', { d: 'M 34 -245 L 58 -245 C 40 -150 8 -60 -34 -6 L -52 -6 C -6 -66 22 -152 34 -245 Z', fill: role === 'ratnavati' ? '#dc2626' : '#14b8a6', stroke: topDk, 'stroke-width': 2 }, torsoG);
    E('path', { d: 'M 34 -245 C 22 -152 -6 -66 -52 -6', fill: 'none', stroke: '#facc15', 'stroke-width': 4 }, torsoG);
    E('polygon', { points: '-20,-245 20,-245 0,-196', fill: DNA.skin }, torsoG);
    if (role === 'ratnavati') { // haar
      for (let px = -15; px <= 15; px += 7.5) {
        E('circle', { cx: px, cy: -196 + Math.abs(px) * 0.5, r: 3.4, fill: '#fef08a', stroke: '#a16207', 'stroke-width': 1 }, torsoG);
      }
    }
  } else if (role === 'singhia') {
    E('path', { d: 'M -64 -245 C -72 -155 -58 -45 -52 0 L 52 0 C 58 -45 72 -155 64 -245 Z', fill: '#2a1b3d', stroke: '#0d0716', 'stroke-width': 2.5 }, torsoG);
    E('path', { d: 'M -64 -245 C -40 -228 40 -228 64 -245 L 58 -214 C 30 -200 -30 -200 -58 -214 Z', fill: '#1c1130', stroke: '#0d0716', 'stroke-width': 2 }, torsoG);
    // rudraksha mala
    for (let px = -26; px <= 26; px += 8.6) {
      E('circle', { cx: px, cy: -178 + Math.abs(px) * 0.55, r: 5, fill: '#8a5a2b', stroke: '#4a2c0e', 'stroke-width': 1.4 }, torsoG);
    }
  } else if (role === 'messenger') {
    E('path', { d: 'M -64 -245 C -70 -155 -56 -45 -50 0 L 50 0 C 56 -45 70 -155 64 -245 Z', fill: '#d97706', stroke: '#7c4416', 'stroke-width': 2.5 }, torsoG);
    E('path', { d: 'M -50 -245 L -24 -245 L 44 -12 L 18 -12 Z', fill: '#b45309', opacity: 0.75 }, torsoG);
    E('rect', { x: -52, y: -16, width: 104, height: 15, fill: '#7f1d1d' }, torsoG);
    E('rect', { x: -11, y: -18, width: 22, height: 19, rx: 2, fill: 'none', stroke: '#facc15', 'stroke-width': 3.2 }, torsoG);
  } else if (role === 'merchant') {
    E('path', { d: 'M -66 -245 C -74 -155 -58 -45 -52 0 L 52 0 C 58 -45 74 -155 66 -245 Z', fill: '#78350f', stroke: '#451a03', 'stroke-width': 2.5 }, torsoG);
    E('line', { x1: 0, y1: -238, x2: 0, y2: -8, stroke: '#451a03', 'stroke-width': 3.5 }, torsoG);
    [-205, -160, -115, -70].forEach(function (cy) {
      E('circle', { cx: 10, cy: cy, r: 4, fill: '#facc15' }, torsoG);
    });
  }

  const armR = makeArm(68, false);

  if (role === 'messenger') { // haath me farmaan (scroll)
    addons.scroll = E('g', { transform: 'translate(2 16) rotate(24)' }, armR.handG);
    E('rect', { x: -13, y: -46, width: 26, height: 92, rx: 9, fill: '#f5e6c8', stroke: '#a16207', 'stroke-width': 2.2 }, addons.scroll);
    E('ellipse', { cx: 0, cy: -46, rx: 13, ry: 6, fill: '#d9b878', stroke: '#a16207', 'stroke-width': 2 }, addons.scroll);
    E('ellipse', { cx: 0, cy: 46, rx: 13, ry: 6, fill: '#d9b878', stroke: '#a16207', 'stroke-width': 2 }, addons.scroll);
    E('rect', { x: -13, y: -6, width: 26, height: 9, fill: '#b91c1c' }, addons.scroll);
  }

  const neckG = E('g', { transform: 'translate(0 -475)' }, bobG);
  E('rect', { x: -20, y: -10, width: 40, height: 42, rx: 12, fill: DNA.skinSh }, neckG);

  const headG = E('g', { transform: 'translate(0 -545)' }, bobG);
  if (role === 'merchant') {
    E('ellipse', { cx: 0, cy: -34, rx: 58, ry: 48, fill: '#94a3b8' }, headG);
  } else if (role !== 'singhia' && role !== 'messenger') {
    E('ellipse', { cx: 0, cy: -38, rx: 60, ry: 56, fill: DNA.hairD }, headG);
  }
  E('ellipse', { cx: -57, cy: 4, rx: 11, ry: 19, fill: DNA.skin, stroke: DNA.skinSh, 'stroke-width': 2.2 }, headG);
  E('ellipse', { cx: 57, cy: 4, rx: 11, ry: 19, fill: DNA.skin, stroke: DNA.skinSh, 'stroke-width': 2.2 }, headG);
  if (DNA.female) { // jhumke
    E('path', { d: 'M -58 20 L -58 27 M 58 20 L 58 27', stroke: '#a16207', 'stroke-width': 2 }, headG);
    E('circle', { cx: -58, cy: 33, r: 6.5, fill: 'url(#bBrass)', stroke: '#7c4a03', 'stroke-width': 1.4 }, headG);
    E('circle', { cx: 58, cy: 33, r: 6.5, fill: 'url(#bBrass)', stroke: '#7c4a03', 'stroke-width': 1.4 }, headG);
  }

  let facePathD = 'M -54 -42 C -58 18 -44 62 0 70 C 44 62 58 18 54 -42 C 50 -88 -50 -88 -54 -42 Z';
  if (role === 'singhia') {
    facePathD = 'M -55 -44 L -53 18 L -30 64 L 0 72 L 30 64 L 53 18 L 55 -44 C 50 -88 -50 -88 -55 -44 Z';
  } else if (DNA.female) {
    facePathD = 'M -51 -42 C -55 10 -38 56 0 68 C 38 56 55 10 51 -42 C 47 -86 -47 -86 -51 -42 Z';
  }
  E('path', { d: facePathD, fill: DNA.skin, stroke: DNA.skinSh, 'stroke-width': 2.5 }, headG);
  E('path', { d: 'M -52 -15 C -52 25 -38 58 0 67 C -26 55 -40 22 -42 -15 Z', fill: 'rgba(165,98,58,0.16)' }, headG);

  if (DNA.female) {
    E('ellipse', { cx: -29, cy: 12, rx: 12, ry: 6, fill: 'rgba(244,114,182,0.24)' }, headG);
    E('ellipse', { cx: 29, cy: 12, rx: 12, ry: 6, fill: 'rgba(244,114,182,0.24)' }, headG);
  }
  if (role === 'ratnavati') { // maang-tikka + nath
    E('line', { x1: 0, y1: -84, x2: 0, y2: -58, stroke: '#a16207', 'stroke-width': 2.4 }, headG);
    E('circle', { cx: 0, cy: -52, r: 6.5, fill: '#dc2626', stroke: '#facc15', 'stroke-width': 2.2 }, headG);
    E('circle', { cx: -13, cy: 22, r: 5.5, fill: 'none', stroke: '#d97706', 'stroke-width': 2.2 }, headG);
  }
  if (role === 'singhia') { // gaal ki lakeerein (tilak hair ke BAAD banta hai — neeche)
    E('path', { d: 'M -24 16 Q -34 30 -28 46 M 24 16 Q 34 30 28 46', stroke: DNA.skinSh, 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round' }, headG);
  }
  if (role === 'merchant') { // safed moonchh
    E('path', { d: 'M -24 26 Q 0 14 24 26 Q 12 36 0 31 Q -12 36 -24 26 Z', fill: '#e2e8f0', stroke: '#94a3b8', 'stroke-width': 1.6 }, headG);
  }
  if (role === 'messenger') {
    E('path', { d: 'M -18 27 Q 0 19 18 27 Q 9 33 0 30 Q -9 33 -18 27 Z', fill: '#1c1917' }, headG);
  }

  function makeEye(ex) {
    const eg = E('g', { transform: 'translate(' + ex + ' -10)' }, headG);
    E('path', { d: 'M -14 0 Q 0 -11 14 0 Q 0 11 -14 0 Z', fill: '#ffffff', stroke: '#1e1b18', 'stroke-width': 2.2 }, eg);
    if (DNA.female) {
      E('path', { d: 'M -14 -1 L -18 -6 M 14 -1 L 18 -6', stroke: '#1e1b18', 'stroke-width': 2.2, 'stroke-linecap': 'round' }, eg);
    }
    const iris = E('g', {}, eg);
    E('circle', { cx: 0, cy: 0, r: 6.5, fill: DNA.iris }, iris);
    E('circle', { cx: 0, cy: 0, r: 3.4, fill: '#090a0f' }, iris);
    E('circle', { cx: 2.2, cy: -2.2, r: 2.0, fill: '#ffffff' }, iris);
    const lid = E('path', { d: 'M -15 0 Q 0 -12 15 0 Q 0 -12 -15 0 Z', fill: DNA.skin, stroke: '#1e1b18', 'stroke-width': 2 }, eg);
    return { eg: eg, iris: iris, lid: lid };
  }
  const eyeL = makeEye(-22);
  const eyeR = makeEye(22);

  const browCol = role === 'merchant' ? '#94a3b8' : DNA.hair;
  const browL = E('path', { d: 'M -36 -25 Q -22 -34 -8 -25', stroke: browCol, 'stroke-width': DNA.female ? 3.8 : 5.0, fill: 'none', 'stroke-linecap': 'round' }, headG);
  const browR = E('path', { d: 'M 8 -25 Q 22 -34 36 -25', stroke: browCol, 'stroke-width': DNA.female ? 3.8 : 5.0, fill: 'none', 'stroke-linecap': 'round' }, headG);

  E('path', { d: 'M -1 -13 L -4 8 Q 0 14 7 8', stroke: DNA.skinSh, 'stroke-width': 2.8, fill: 'none', 'stroke-linecap': 'round' }, headG);
  E('line', { x1: 1, y1: -11, x2: 1, y2: 5, stroke: 'rgba(255,255,255,0.45)', 'stroke-width': 2, 'stroke-linecap': 'round' }, headG);

  const mouthG = E('g', { transform: 'translate(0 36)' }, headG);
  const mouthBg = E('ellipse', { cx: 0, cy: 0, rx: 13, ry: 3.5, fill: '#4a1219', stroke: DNA.lip, 'stroke-width': 3 }, mouthG);
  const teeth = E('rect', { x: -8, y: -3.5, width: 16, height: 3.5, rx: 1, fill: '#ffffff', opacity: 0 }, mouthG);
  const tear = E('path', { d: 'M -18 2 Q -24 18 -18 25 Q -12 18 -18 2 Z', fill: '#38bdf8', opacity: 0 }, headG);
  const sweat = E('path', { d: 'M 38 -28 Q 32 -12 38 -4 Q 44 -12 38 -28 Z', fill: '#38bdf8', opacity: 0 }, headG);

  const hairG = E('g', {}, headG);
  if (role === 'ratnavati') {
    E('path', { d: 'M -53 -8 C -58 -52 -52 -90 0 -92 C 52 -90 58 -52 53 -8 L 46 -12 L 42 -38 C 18 -46 0 -36 0 -36 C 0 -36 -18 -46 -42 -38 L -46 -12 Z', fill: DNA.hair }, hairG);
  } else if (role === 'maid') {
    E('circle', { cx: 0, cy: -94, r: 21, fill: DNA.hair, stroke: '#000', 'stroke-width': 2 }, hairG);
    E('path', { d: 'M -53 -8 C -58 -52 -52 -90 0 -92 C 52 -90 58 -52 53 -8 L 46 -12 L 42 -38 C 16 -50 -14 -44 -42 -36 L -46 -12 Z', fill: DNA.hair }, hairG);
  } else if (role === 'singhia') { // jata — nukeele kesh-guchhe
    const spikes = [[-52, -30], [-44, -62], [-26, -82], [-6, -92], [14, -88], [32, -74], [46, -52], [54, -26]];
    spikes.forEach(function (s) {
      E('polygon', { points: (s[0] - 13) + ',' + (s[1] + 26) + ' ' + s[0] + ',' + s[1] + ' ' + (s[0] + 13) + ',' + (s[1] + 26), fill: DNA.hair, stroke: '#101014', 'stroke-width': 2, 'stroke-linejoin': 'round' }, hairG);
    });
    E('path', { d: 'M -54 -6 C -58 -44 -50 -66 -30 -74 L 30 -74 C 50 -66 58 -44 54 -6 L 45 -12 C 30 -34 -30 -34 -45 -12 Z', fill: DNA.hair }, hairG);
    // tripund tilak — baalon ke upar, bhaunhon se upar saaf dikhe
    E('path', { d: 'M -19 -44 L 19 -44 M -21 -37 L 21 -37 M -19 -30 L 19 -30', stroke: '#dc2626', 'stroke-width': 3.8, 'stroke-linecap': 'round' }, hairG);
  } else if (role === 'messenger') { // kesariya pagdi
    E('path', { d: 'M -56 -6 C -60 -40 -52 -66 -30 -78 L 30 -78 C 52 -66 60 -40 56 -6 L 47 -12 C 44 -34 30 -44 0 -44 C -30 -44 -44 -34 -47 -12 Z', fill: '#ea580c' }, hairG);
    E('path', { d: 'M -52 -34 C -20 -48 20 -48 52 -34', stroke: '#c2410c', 'stroke-width': 5, fill: 'none' }, hairG);
    E('path', { d: 'M -48 -56 C -16 -68 16 -68 48 -56', stroke: '#f59e0b', 'stroke-width': 4, fill: 'none' }, hairG);
    E('path', { d: 'M 40 -70 C 58 -52 60 -26 50 -4 L 38 -12 C 44 -30 44 -50 40 -70 Z', fill: '#ea580c' }, hairG);
  } else if (role === 'merchant') {
    E('path', { d: 'M -55 -8 C -60 -42 -50 -72 -32 -78 C -36 -54 -44 -30 -48 -6 Z', fill: '#e2e8f0', stroke: '#94a3b8', 'stroke-width': 2 }, hairG);
    E('path', { d: 'M 55 -8 C 60 -42 50 -72 32 -78 C 36 -54 44 -30 48 -6 Z', fill: '#e2e8f0', stroke: '#94a3b8', 'stroke-width': 2 }, hairG);
    E('path', { d: 'M -28 -76 Q 0 -86 28 -76 Q 12 -66 -28 -76 Z', fill: '#f1f5f9' }, hairG);
  }

  for (let bt = 0.5 + (x % 4) * 0.35; bt < 49.0; bt += 3.2) {
    TL.to([eyeL.lid, eyeR.lid], {
      attr: { d: 'M -15 0 Q 0 10 15 0 Q 0 -12 -15 0 Z' },
      duration: 0.07, yoyo: true, repeat: 1
    }, bt);
  }
  TL.to(torsoG, { scaleY: 1.018, scaleX: 1.012, svgOrigin: '0 -220', duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0.1);

  return {
    wrap: wrap, flipG: flipG, bobG: bobG, torsoG: torsoG, skirtG: skirtG, capeG: capeG,
    legL: legL, legR: legR, armL: armL, armR: armR,
    headG: headG, eyeL: eyeL, eyeR: eyeR, browL: browL, browR: browR,
    mouthBg: mouthBg, teeth: teeth, tear: tear, sweat: sweat,
    addons: addons, x: x, y: y, scale: sc
  };
}
