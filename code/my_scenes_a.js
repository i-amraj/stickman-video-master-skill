
// ============================================================================
// 5. SETS — har set apni duniya, asal materials ke saath
// ============================================================================
function camTo(t, cx, cy, s, dur, ease) {
  TL.to(camF.o, { cx: cx, cy: cy, s: s, duration: dur, ease: ease || 'sine.inOut', onUpdate: camF.apply }, t);
}
TL.set(camF.o, { cx: 540, cy: 980, s: 1.0 }, 0);
TL.call(function () { camF.apply(); }, null, 0);

// ---------------- SET 1: RAAT — KILE KA DARWAZA + ASI BOARD (0-8, 43.8-49) ----------------
const set1 = E('g', {}, camG);
E('rect', { x: -400, y: -200, width: 1880, height: 1300, fill: 'url(#bNightSky)' }, set1);
E('circle', { cx: 770, cy: 300, r: 165, fill: 'url(#bMoonGlow)' }, set1);
E('circle', { cx: 770, cy: 300, r: 76, fill: '#f4f7fb' }, set1);
E('circle', { cx: 742, cy: 278, r: 13, fill: '#d7dee9' }, set1);
E('circle', { cx: 792, cy: 322, r: 9, fill: '#d7dee9' }, set1);
E('polygon', { points: '-400,760 60,520 420,760 760,540 1120,740 1480,560 1480,1120 -400,1120', fill: '#101c30' }, set1);
E('rect', { x: -400, y: 1060, width: 1880, height: 860, fill: 'url(#bGroundNight)' }, set1);
E('ellipse', { cx: 330, cy: 1470, rx: 330, ry: 42, fill: 'rgba(190,210,240,0.07)' }, set1);
// kila: beech ki deewar + do minaar
drawStoneWall(set1, 300, 600, 560, 560, 11, false);
drawStoneWall(set1, 196, 520, 128, 640, 23, true);
drawStoneWall(set1, 836, 520, 128, 640, true, true);
for (let bx = 196; bx <= 940; bx += 62) {
  E('path', { d: 'M ' + bx + ' 522 L ' + bx + ' 478 Q ' + (bx + 25) + ' 458 ' + (bx + 50) + ' 478 L ' + bx + 50 + ' 522 Z', fill: '#33415a', stroke: '#0b1120', 'stroke-width': 2.5 }, set1);
}
// darwaza — mehrab + lohe ki salakhein + taala
E('path', { d: 'M 480 1160 L 480 830 C 480 730 680 730 680 830 L 680 1160 Z', fill: '#060a12', stroke: '#0b1120', 'stroke-width': 6 }, set1);
for (let gx = 502; gx <= 660; gx += 26) {
  E('line', { x1: gx, y1: 760, x2: gx, y2: 1156, stroke: '#46536b', 'stroke-width': 7 }, set1);
}
E('line', { x1: 478, y1: 980, x2: 682, y2: 980, stroke: '#46536b', 'stroke-width': 10 }, set1);
E('rect', { x: 556, y: 958, width: 48, height: 58, rx: 8, fill: 'url(#bBrass)', stroke: '#5f3707', 'stroke-width': 3 }, set1);
E('circle', { cx: 580, cy: 982, r: 8, fill: '#3a2708' }, set1);
E('ellipse', { cx: 580, cy: 1172, rx: 300, ry: 26, fill: 'rgba(0,0,0,0.35)' }, set1);
drawRealisticTree(set1, 96, 1150, 1.05, 3);
drawRealisticTree(set1, 1052, 1130, 0.9, 7);
// ASI board
drawAsiBoard(set1, 330, 1010, 1.0);
// kohra (fog) — dheere behta hua
const fog1 = E('g', { opacity: 0.14 }, set1);
[[240, 1330], [620, 1390], [430, 1270]].forEach(function (f, i) {
  const fg = E('ellipse', { cx: f[0], cy: f[1], rx: 210, ry: 20, fill: '#aebfd8' }, fog1);
  TL.fromTo(fg, { x: -46 }, { x: 46, duration: 6 + i * 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }, i * 0.8);
});
// magnifier — board ki jaanch (set ke andar, camera ke saath zoom hoga)
const mag1 = E('g', { opacity: 0 }, set1);
E('circle', { cx: 0, cy: 0, r: 88, fill: 'rgba(190,220,255,0.13)', stroke: '#e33429', 'stroke-width': 11 }, mag1);
E('line', { x1: 58, y1: 62, x2: 128, y2: 138, stroke: '#e33429', 'stroke-width': 17, 'stroke-linecap': 'round' }, mag1);
TL.set(mag1, { attr: { transform: 'translate(268 972)' }, opacity: 0 }, 0);
TL.to(mag1, { opacity: 1, duration: 0.3 }, 4.6);
TL.to(mag1, { attr: { transform: 'translate(392 1006)' }, duration: 2.6, ease: 'sine.inOut' }, 4.9);
TL.to(mag1, { opacity: 0, duration: 0.3 }, 7.6);
// NO-GHOST mohar (aakhir me lagegi)
const stamp1 = E('g', { opacity: 0 }, set1);
const stampIn = E('g', { transform: 'translate(330 1005) rotate(-8)' }, stamp1);
E('rect', { x: -215, y: -52, width: 430, height: 104, rx: 12, fill: 'rgba(120,10,10,0.88)', stroke: '#ff4d4d', 'stroke-width': 5 }, stampIn);
bigText(stampIn, 0, -4, 'NO GHOST', 44, '#ff8080', 900, 'middle', 1);
bigText(stampIn, 0, 38, 'MENTIONED!', 44, '#fde68a', 900, 'middle', 1);
TL.set(stamp1, { opacity: 0, scale: 2.3, svgOrigin: '330 1005' }, 0);
TL.to(mag1, { opacity: 1, duration: 0.3 }, 44.0);
TL.set(mag1, { attr: { transform: 'translate(300 985)' } }, 44.0);
TL.to(mag1, { attr: { transform: 'translate(385 1015)' }, duration: 1.4, ease: 'sine.inOut' }, 44.2);
TL.to(stamp1, { opacity: 1, scale: 1, duration: 0.22, ease: 'power4.in' }, 45.6);
TL.to(mag1, { opacity: 0, duration: 0.3 }, 46.2);
camTo(0.0, 528, 992, 1.05, 3.8);
camTo(4.0, 348, 1008, 1.52, 1.4, 'power2.inOut');
camTo(5.6, 362, 998, 1.58, 2.2);
camTo(43.8, 540, 985, 1.03, 0.1);
camTo(44.2, 350, 1002, 1.5, 1.2, 'power2.inOut');
camTo(46.6, 540, 962, 1.0, 2.2);

// ---------------- SET 2: MEHEL 1573 (8-15) ----------------
const set2 = E('g', { opacity: 0 }, camG);
E('rect', { x: -400, y: -200, width: 1880, height: 1420, fill: 'url(#bGoldenSky)' }, set2);
E('rect', { x: 40, y: 430, width: 1000, height: 740, fill: 'url(#bSandstone)', stroke: '#6e3f12', 'stroke-width': 4 }, set2);
for (let wx = 76; wx < 1000; wx += 92) { // jaali-khidkiyon ki kataar
  E('path', { d: 'M ' + wx + ' 560 L ' + wx + ' 500 Q ' + (wx + 26) + ' 472 ' + (wx + 52) + ' 500 L ' + (wx + 52) + ' 560 Z', fill: '#7c4416', stroke: '#5f3707', 'stroke-width': 2.5 }, set2);
}
// bade mehrab (niches) + stambh
[-1, 0, 1].forEach(function (k) {
  const ax = 540 + k * 320;
  E('path', { d: 'M ' + (ax - 118) + ' 1170 L ' + (ax - 118) + ' 800 C ' + (ax - 118) + ' 690 ' + (ax + 118) + ' 690 ' + (ax + 118) + ' 800 L ' + (ax + 118) + ' 1170 Z', fill: 'url(#bSandDeep)', stroke: '#5f3707', 'stroke-width': 4 }, set2);
  E('path', { d: 'M ' + (ax - 92) + ' 1170 L ' + (ax - 92) + ' 822 C ' + (ax - 92) + ' 736 ' + (ax + 92) + ' 736 ' + (ax + 92) + ' 822 L ' + (ax + 92) + ' 1170 Z', fill: '#8a5a20' }, set2);
});
[220, 860].forEach(function (px) {
  E('rect', { x: px - 24, y: 700, width: 48, height: 470, fill: 'url(#bSandDeep)', stroke: '#5f3707', 'stroke-width': 3 }, set2);
  E('rect', { x: px - 34, y: 682, width: 68, height: 26, fill: '#7c4416', stroke: '#5f3707', 'stroke-width': 2.5 }, set2);
  E('rect', { x: px - 34, y: 1150, width: 68, height: 24, fill: '#7c4416', stroke: '#5f3707', 'stroke-width': 2.5 }, set2);
});
// jharokha (beech upar ki baalkoni)
E('rect', { x: 452, y: 520, width: 176, height: 108, fill: 'url(#bSandDeep)', stroke: '#5f3707', 'stroke-width': 3.5 }, set2);
E('path', { d: 'M 440 522 C 470 452 610 452 640 522 Z', fill: '#9c5a1e', stroke: '#5f3707', 'stroke-width': 3.5 }, set2);
E('rect', { x: -400, y: 1150, width: 1880, height: 770, fill: 'url(#bGroundDay)' }, set2);
E('polygon', { points: '330,1920 750,1920 660,1170 420,1170', fill: '#8f1d1d', opacity: 0.85 }, set2);
E('polygon', { points: '352,1920 728,1920 652,1170 428,1170', fill: 'none', stroke: '#facc15', 'stroke-width': 4, opacity: 0.5 }, set2);
drawHangingLamp(set2, 300, 660, 1.0);
drawHangingLamp(set2, 790, 660, 1.0);
const ratna2 = buildBhangarhActor(set2, { x: 618, y: 1508, scale: 1.02, role: 'ratnavati' });
const msg2 = buildBhangarhActor(set2, { x: 1090, y: 1508, scale: 0.98, role: 'messenger' });
walkHuman(msg2, 8.3, 1090, 852, 2.1);
setFaceMood(msg2, 10.5, 'happy');
poseArms(msg2, 10.5, 24, -52, -30, 58, 0.35); // jhuk kar farmaan pesh
setFaceMood(ratna2, 10.8, 'neutral');
lookEyes(ratna2, 11.0, 4, 0);
setFaceMood(ratna2, 12.2, 'happy');
camTo(8.0, 545, 1015, 1.0, 0.1);
camTo(8.3, 585, 1022, 1.06, 3.0);
camTo(11.5, 622, 975, 1.42, 1.6, 'power2.inOut');
camTo(13.4, 615, 962, 1.5, 1.6);

// ---------------- SET 3: TANTRIK KI CHATTAN (15-19) ----------------
const set3 = E('g', { opacity: 0 }, camG);
E('rect', { x: -400, y: -200, width: 1880, height: 1250, fill: 'url(#bDuskSky)' }, set3);
E('polygon', { points: '-400,1920 -400,900 120,760 520,980 900,830 1480,1010 1480,1920', fill: '#241c2b' }, set3);
E('polygon', { points: '-400,1920 -400,1080 240,940 700,1120 1480,1180 1480,1920', fill: '#171221' }, set3);
// chattan ka kinara jahan Singhia khada hai — asaman pathar, chaukor slab nahi
E('polygon', { points: '150,1252 300,1228 470,1244 640,1230 712,1300 690,1346 120,1346 96,1296', fill: 'url(#bRockFace)', stroke: '#0a0e18', 'stroke-width': 4, 'stroke-linejoin': 'round' }, set3);
E('path', { d: 'M 240 1262 L 330 1296 M 470 1258 L 420 1300 M 560 1270 L 610 1306 M 180 1310 L 260 1332', stroke: '#141c2c', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }, set3);
drawRealBoulder(set3, -30, 1752, 0.55);
drawRealBoulder(set3, 1042, 1790, 0.66);
// sookha ped
const deadTree3 = E('path', { d: 'M 880 1240 C 872 1120 884 1010 876 920 M 878 1060 C 830 1010 790 990 748 972 M 880 1000 C 924 950 962 936 1002 928 M 877 920 C 862 862 838 830 806 806', stroke: '#0f0a08', 'stroke-width': 13, fill: 'none', 'stroke-linecap': 'round', transform: 'translate(-84 10)' }, set3);
// kauye (crows) — udte hue
const crow3 = E('g', { opacity: 0.85 }, set3);
[[-160, 430], [-90, 478]].forEach(function (c) {
  E('path', { d: 'M ' + c[0] + ' ' + c[1] + ' Q ' + (c[0] + 16) + ' ' + (c[1] - 15) + ' ' + (c[0] + 32) + ' ' + c[1] + ' Q ' + (c[0] + 48) + ' ' + (c[1] - 15) + ' ' + (c[0] + 64) + ' ' + c[1] + ' Q ' + (c[0] + 32) + ' ' + (c[1] + 9) + ' ' + c[0] + ' ' + c[1] + ' Z', fill: '#0a0a10' }, crow3);
});
TL.fromTo(crow3, { x: -140 }, { x: 1560, duration: 4.6, ease: 'none' }, 15.4);
const singh3 = buildBhangarhActor(set3, { x: 412, y: 1246, scale: 0.92, role: 'singhia' });
setFaceMood(singh3, 15.2, 'angry');
lookEyes(singh3, 15.4, 5, -1);
TL.to(singh3.capeG, { skewX: 2.4, svgOrigin: '0 -468', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 15.1);
const orb3 = E('circle', { cx: 0, cy: 0, r: 17, fill: '#c084fc', filter: 'url(#magicGlow)', opacity: 0 }, singh3.armR.handG);
poseArms(singh3, 17.3, 6, -8, -118, -24, 0.5);
TL.to(orb3, { opacity: 0.95, duration: 0.4 }, 17.6);
TL.to(orb3, { opacity: 0.35, duration: 0.3, yoyo: true, repeat: 3 }, 18.0);
camTo(15.0, 430, 938, 1.04, 0.1);
camTo(15.3, 430, 940, 1.4, 3.4);

// ---------------- SET 4: JAUHARI BAZAAR (19-23.5) ----------------
const set4 = E('g', { opacity: 0 }, camG);
E('rect', { x: -400, y: -200, width: 1880, height: 1400, fill: 'url(#bSandstone)' }, set4);
E('path', { d: 'M 300 1180 L 300 560 C 300 400 780 400 780 560 L 780 1180 Z', fill: 'url(#bSandDeep)', stroke: '#5f3707', 'stroke-width': 5 }, set4);
E('path', { d: 'M 336 1180 L 336 580 C 336 448 744 448 744 580 L 744 1180 Z', fill: '#6d3f14' }, set4);
// mehrab ke andar ki almaari — chhoti sheeshiyan (gehraai)
E('rect', { x: 386, y: 902, width: 308, height: 16, fill: '#4a2c0e', stroke: '#2c1a08', 'stroke-width': 2.5 }, set4);
drawPerfumeBottle(set4, 440, 896, 0.52, '#f9a8d4', '#9d174d');
drawPerfumeBottle(set4, 540, 896, 0.52, '#7dd3fc', '#075985');
drawPerfumeBottle(set4, 640, 896, 0.52, '#34d399', '#065f46');
E('rect', { x: 386, y: 1064, width: 308, height: 16, fill: '#4a2c0e', stroke: '#2c1a08', 'stroke-width': 2.5 }, set4);
drawPerfumeBottle(set4, 490, 1058, 0.52, '#fcd34d', '#92400e');
drawPerfumeBottle(set4, 590, 1058, 0.52, '#f9a8d4', '#9d174d');
// dukaan ki chhatri (striped canopy)
for (let cs = 0; cs < 8; cs++) {
  E('polygon', { points: (140 + cs * 100) + ',238 ' + (240 + cs * 100) + ',238 ' + (268 + cs * 100) + ',330 ' + (112 + cs * 100) + ',330', fill: cs % 2 ? '#f5e6c8' : '#b91c1c', stroke: 'rgba(60,30,5,0.5)', 'stroke-width': 2 }, set4);
}
E('path', { d: 'M 112 330 L 968 330', stroke: '#5f3707', 'stroke-width': 6 }, set4);
E('rect', { x: -400, y: 1180, width: 1880, height: 740, fill: 'url(#bGroundDay)' }, set4);
const merch4 = buildBhangarhActor(set4, { x: 296, y: 1352, scale: 0.94, role: 'merchant' });
// counter — kirdaaron ke AAGE (dukandaar aadha peeche)
const counter4 = E('g', { filter: 'url(#drop3D)' }, set4);
E('polygon', { points: '96,1152 660,1152 706,1246 50,1246', fill: 'url(#bWoodCounter)', stroke: '#2c1a08', 'stroke-width': 4 }, counter4);
E('rect', { x: 50, y: 1246, width: 656, height: 210, fill: '#5f3a16', stroke: '#2c1a08', 'stroke-width': 4 }, counter4);
for (let px = 130; px < 660; px += 130) {
  E('rect', { x: px, y: 1272, width: 96, height: 158, fill: 'none', stroke: 'rgba(30,17,5,0.6)', 'stroke-width': 3 }, counter4);
}
drawPerfumeBottle(counter4, 168, 1146, 0.92, '#34d399', '#065f46');
drawPerfumeBottle(counter4, 262, 1146, 0.92, '#f9a8d4', '#9d174d');
drawPerfumeBottle(counter4, 356, 1146, 0.92, '#7dd3fc', '#075985');
const goldBottle4 = drawPerfumeBottle(counter4, 452, 1146, 0.98, '#fcd34d', '#92400e');
const bottleGlow4 = E('circle', { cx: 452, cy: 1100, r: 62, fill: '#c084fc', filter: 'url(#magicGlow)', opacity: 0 }, counter4);
const maid4 = buildBhangarhActor(set4, { x: 560, y: 1505, scale: 0.99, role: 'maid' });
drawHangingLamp(set4, 210, 470, 0.95);
drawHangingLamp(set4, 880, 470, 0.95);
const singh4 = buildBhangarhActor(set4, { x: 892, y: 1490, scale: 1.02, role: 'singhia' });
setFaceMood(singh4, 19.2, 'angry');
lookEyes(singh4, 19.4, -5, 0);
poseArms(singh4, 20.4, 4, -6, 82, -6, 0.5); // dahina haath sheeshi ki taraf (frame-bayein)
// kaale jaadu ki dhaara — haath se sheeshi tak
const stream4 = E('path', { d: 'M 806 1052 C 700 990 560 1010 470 1078', stroke: '#a855f7', 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '16 13', opacity: 0, filter: 'url(#magicGlow)' }, set4);
TL.to(stream4, { opacity: 0.95, duration: 0.35 }, 20.9);
TL.to(stream4, { attr: { 'stroke-dashoffset': -116 }, duration: 1.1, ease: 'none' }, 20.9);
TL.to(stream4, { attr: { 'stroke-dashoffset': -232 }, duration: 1.1, ease: 'none' }, 22.0);
TL.to(bottleGlow4, { opacity: 0.85, duration: 0.4 }, 21.2);
TL.to(bottleGlow4, { opacity: 0.3, duration: 0.35, yoyo: true, repeat: 3 }, 21.6);
setFaceMood(maid4, 21.8, 'shocked');
camTo(19.0, 545, 1012, 1.0, 0.1);
camTo(19.3, 618, 1042, 1.22, 4.0);
