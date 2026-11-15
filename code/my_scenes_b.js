
// ---------------- SET 5A: MAHEL KE ANDAR — SHEESHI TOOTI (23.5-27.2) ----------------
const set5a = E('g', { opacity: 0 }, camG);
// peeche ki deewar — garam balua pathar, mehrabdar khaane
E('rect', { x: -400, y: -200, width: 1880, height: 1420, fill: 'url(#bSandDeep)' }, set5a);
E('rect', { x: -60, y: 40, width: 1200, height: 1120, fill: 'url(#bSandstone)', stroke: '#6e3f12', 'stroke-width': 4 }, set5a);
[-340, 60, 460].forEach(function (nx) {
  E('path', { d: 'M ' + nx + ' 1160 L ' + nx + ' 480 C ' + nx + ' 340 ' + (nx + 300) + ' 340 ' + (nx + 300) + ' 480 L ' + (nx + 300) + ' 1160 Z', fill: '#8a5a24', stroke: '#5f3707', 'stroke-width': 4 }, set5a);
});
// stambh (pillars) — kamra zameen se juda lage
[-140, 1020].forEach(function (px) {
  E('rect', { x: px, y: 120, width: 74, height: 1040, fill: 'url(#bSandDeep)', stroke: '#5f3707', 'stroke-width': 4 }, set5a);
  E('rect', { x: px - 12, y: 92, width: 98, height: 34, fill: '#7c4416', stroke: '#5f3707', 'stroke-width': 3 }, set5a);
  E('rect', { x: px - 12, y: 1130, width: 98, height: 34, fill: '#7c4416', stroke: '#5f3707', 'stroke-width': 3 }, set5a);
});
drawHangingLamp(set5a, 130, 210, 1.15);
drawHangingLamp(set5a, 950, 210, 1.15);
// farsh + laal kaaleen
E('rect', { x: -400, y: 1160, width: 1880, height: 760, fill: '#4a2c14' }, set5a);
E('polygon', { points: '60,1920 330,1230 760,1230 1020,1920', fill: '#7f1d2d', stroke: '#5b1220', 'stroke-width': 4 }, set5a);
E('polygon', { points: '150,1920 390,1290 700,1290 930,1920', fill: '#991b30', opacity: 0.55 }, set5a);
// farsh par pada bada pathar — sheeshi isi par tootegi
drawRealBoulder(set5a, 806, 1180, 0.95);
const crackGlow5a = E('g', { opacity: 0 }, set5a);
E('path', { d: 'M 760 1090 L 800 1140 L 786 1196 M 800 1140 L 856 1170', stroke: '#c084fc', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', filter: 'url(#magicGlow)' }, crackGlow5a);
const ratna5 = buildBhangarhActor(set5a, { x: 400, y: 1306, scale: 1.0, role: 'ratnavati' });
setFaceMood(ratna5, 23.6, 'angry');
const handBottle5 = drawPerfumeBottle(ratna5.armR.handG, 4, 26, 0.62, '#fcd34d', '#92400e');
// phenki hui sheeshi — attr transform arc (preset transform par GSAP x/y kaam nahi karta)
const flyBottle5 = drawPerfumeBottle(set5a, 520, 872, 0.62, '#fcd34d', '#92400e');
flyBottle5.setAttribute('opacity', 0);
const shards5 = E('g', { opacity: 0 }, set5a);
[[0, 0, 26, -14], [10, 4, 34, 10], [-8, 6, -30, 18], [4, -6, 12, -30], [-14, -2, -34, -12]].forEach(function (s) {
  E('line', { x1: s[0], y1: s[1], x2: s[2], y2: s[3], stroke: '#fcd34d', 'stroke-width': 5, 'stroke-linecap': 'round' }, shards5);
});
E('polygon', { points: '0,-34 8,-10 32,-8 13,5 20,28 0,13 -20,28 -13,5 -32,-8 -8,-10', fill: '#c084fc', filter: 'url(#magicGlow)' }, shards5);
shards5.setAttribute('transform', 'translate(806 1084)');
poseArms(ratna5, 24.7, 0, 0, -150, -30, 0.3); // wind-up
poseArms(ratna5, 25.5, 0, 0, 58, 8, 0.18);   // phenk diya
TL.set(handBottle5, { opacity: 0 }, 25.52);
TL.set(flyBottle5, { opacity: 1 }, 25.52);
TL.to(flyBottle5, { attr: { transform: 'translate(690 752) scale(0.62) rotate(130)' }, duration: 0.36, ease: 'power2.out' }, 25.52);
TL.to(flyBottle5, { attr: { transform: 'translate(806 1084) scale(0.62) rotate(300)' }, duration: 0.42, ease: 'power2.in' }, 25.88);
TL.set(flyBottle5, { opacity: 0 }, 26.3);
TL.set(shards5, { opacity: 1 }, 26.3);
TL.to(shards5, { opacity: 0, duration: 0.55 }, 26.75);
// jaadu pathar ki daraaron me sama gaya
TL.to(crackGlow5a, { opacity: 0.95, duration: 0.35 }, 26.45);
TL.to(crackGlow5a, { opacity: 0.45, duration: 0.4, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 26.85);
camTo(23.5, 540, 958, 1.0, 0.1);
camTo(24.4, 452, 952, 1.22, 1.6);
camTo(26.15, 726, 1046, 1.48, 0.9);

// ---------------- SET 5B: TANTRIK KA HAWAN — BIJLI + PATTHAR (27.2-31.5) ----------------
const set5b = E('g', { opacity: 0 }, camG);
E('rect', { x: -400, y: -200, width: 1880, height: 2150, fill: 'url(#bDuskSky)' }, set5b);
// door ki pahadiyan + andheri zameen
E('polygon', { points: '-400,1920 -400,1010 -140,950 180,1040 520,1180 900,1330 1480,1520 1480,1920', fill: '#241a30' }, set5b);
E('polygon', { points: '-400,1920 -400,1180 60,1120 420,1260 760,1420 1480,1660 1480,1920', fill: '#181126' }, set5b);
// upar ki chattan — poori chattani deewar zameen tak (hawa me latki slab nahi)
E('polygon', { points: '700,880 1010,806 1330,852 1480,900 1480,1920 960,1920 840,1560 745,1180 700,980', fill: 'url(#bRockFace)', stroke: '#0a0e18', 'stroke-width': 4, 'stroke-linejoin': 'round' }, set5b);
E('path', { d: 'M 760 1120 L 1200 1180 M 800 1330 L 1290 1400 M 860 1560 L 1330 1640 M 900 1000 L 940 1180 M 1150 960 L 1120 1130', stroke: 'rgba(8,12,20,0.5)', 'stroke-width': 5, fill: 'none' }, set5b);
E('polygon', { points: '745,1180 840,1560 960,1920 700,1920 700,1100', fill: '#000000', opacity: 0.18 }, set5b);
const boulderPos5b = E('g', { transform: 'translate(1012 800)' }, set5b);
const boulderRot5b = E('g', {}, boulderPos5b);
drawRealBoulder(boulderRot5b, 0, 0, 0.95);
const crackGlow5b = E('g', { opacity: 0 }, boulderRot5b);
E('path', { d: 'M -52 -30 L -8 8 L -22 58 M -8 8 L 44 30', stroke: '#c084fc', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', filter: 'url(#magicGlow)' }, crackGlow5b);
// hawan kund — einten, lakdiyan, aag, dhuaan
const kund5b = E('g', { transform: 'translate(352 1472) scale(1.3)' }, set5b);
E('ellipse', { cx: 0, cy: 96, rx: 128, ry: 22, fill: 'rgba(0,0,0,0.4)' }, kund5b);
[[0, '#7c3f21'], [1, '#8a4a26'], [2, '#6d3419']].forEach(function (row) {
  for (let bi = 0; bi < 4 - row[0]; bi++) {
    E('rect', { x: -96 + row[0] * 24 + bi * 50, y: 66 - row[0] * 26, width: 44, height: 24, fill: row[1], stroke: '#2c1608', 'stroke-width': 2.5 }, kund5b);
  }
});
E('rect', { x: -52, y: 52, width: 104, height: 15, rx: 7, fill: '#4a2c14', transform: 'rotate(-8)' }, kund5b);
E('rect', { x: -52, y: 56, width: 104, height: 15, rx: 7, fill: '#5d3a1a', transform: 'rotate(9)' }, kund5b);
E('ellipse', { cx: 0, cy: 44, rx: 96, ry: 40, fill: 'url(#bLampGlow)' }, kund5b);
const flames5b = E('g', {}, kund5b);
[[0, 1.0, '#f97316'], [-30, 0.72, '#ef4444'], [30, 0.78, '#fbbf24'], [8, 0.55, '#fde68a']].forEach(function (fl, i) {
  const fp = E('path', { d: 'M 0 48 C -20 18 -14 -16 0 -44 C 14 -16 20 18 0 48 Z', fill: fl[2], opacity: 0.92, transform: 'translate(' + fl[0] + ' 0) scale(' + fl[1] + ')' }, flames5b);
  TL.to(fp, { scaleY: 1.16, scaleX: 0.94, svgOrigin: fl[0] + ' 48', duration: 0.32 + i * 0.07, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 27.3 + i * 0.05);
});
for (let sm = 0; sm < 4; sm++) {
  const se = E('ellipse', { cx: 350 + (sm % 2) * 36, cy: 1400, rx: 26, ry: 17, fill: '#9aa7bd', opacity: 0 }, set5b);
  TL.fromTo(se, { y: 0 }, { y: -270, duration: 2.6, repeat: -1, ease: 'none' }, 27.4 + sm * 0.7);
  TL.to(se, { keyframes: [{ opacity: 0.32, duration: 0.5 }, { opacity: 0, duration: 2.1 }], repeat: -1, ease: 'none' }, 27.4 + sm * 0.7);
}
// Singhia hawan kar raha hai — dono haath kund ki taraf (aahuti)
const singh5b = buildBhangarhActor(set5b, { x: 548, y: 1562, scale: 0.98, role: 'singhia' });
setFaceMood(singh5b, 27.4, 'neutral');
lookEyes(singh5b, 27.6, 0, 3);
poseArms(singh5b, 27.5, -32, -8, 64, 10, 0.7);
// BIJLI pathar par giri!
const bolt5b = E('g', { opacity: 0 }, set5b);
E('polygon', { points: '1090,40 990,380 1046,380 936,700 1012,404 958,404', fill: '#fef9c3', filter: 'url(#magicGlow)' }, bolt5b);
const flash5b = E('rect', { x: -400, y: -200, width: 1880, height: 2120, fill: '#ffffff', opacity: 0 }, set5b);
TL.to(bolt5b, { opacity: 1, duration: 0.07 }, 28.6);
TL.to(flash5b, { opacity: 0.42, duration: 0.07 }, 28.6);
TL.to(bolt5b, { opacity: 0, duration: 0.12 }, 28.72);
TL.to(flash5b, { opacity: 0, duration: 0.16 }, 28.72);
TL.to(crackGlow5b, { opacity: 1, duration: 0.2 }, 28.75);
TL.fromTo(world, { x: 0 }, { x: 9, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, 28.65);
TL.set(world, { x: 0 }, 28.95);
// pathar tika nahi — ludka aur tantrik par gira
setFaceMood(singh5b, 29.7, 'shocked');
lookEyes(singh5b, 29.7, 0, -4);
TL.to(boulderPos5b, { attr: { transform: 'translate(1058 872)' }, duration: 0.55, ease: 'power1.in' }, 29.2);
TL.to(boulderRot5b, { rotation: 34, svgOrigin: '0 0', duration: 0.55, ease: 'power1.in' }, 29.2);
TL.to(boulderPos5b, { attr: { transform: 'translate(790 1210)' }, duration: 0.62, ease: 'power2.in' }, 29.75);
TL.to(boulderRot5b, { rotation: 118, svgOrigin: '0 0', duration: 0.62, ease: 'power2.in' }, 29.75);
TL.to(boulderPos5b, { attr: { transform: 'translate(652 1446)' }, duration: 0.3, ease: 'power3.in' }, 30.37);
TL.to(boulderRot5b, { rotation: 164, svgOrigin: '0 0', duration: 0.3, ease: 'power3.in' }, 30.37);
TL.to(singh5b.wrap, { attr: { transform: 'translate(620 1574) scale(0.98) rotate(-84 0 0)' }, duration: 0.38, ease: 'power2.in' }, 30.62);
[[652, 1530], [770, 1480]].forEach(function (dp, i) {
  const dust = E('g', { transform: 'translate(' + dp[0] + ' ' + dp[1] + ')', opacity: 0 }, set5b);
  E('circle', { cx: -26, cy: 0, r: 22, fill: '#9aa7bd' }, dust);
  E('circle', { cx: 20, cy: -8, r: 28, fill: '#8794ab' }, dust);
  E('circle', { cx: 0, cy: 8, r: 18, fill: '#aeb9cc' }, dust);
  TL.to(dust, { opacity: 0.5, scale: 1.5, svgOrigin: dp[0] + ' ' + dp[1], duration: 0.35 }, 30.62 + i * 0.1);
  TL.to(dust, { opacity: 0, scale: 2.1, svgOrigin: dp[0] + ' ' + dp[1], duration: 0.6 }, 30.95 + i * 0.1);
});
TL.fromTo(world, { x: 0 }, { x: 12, duration: 0.05, yoyo: true, repeat: 5, ease: 'none' }, 30.66);
TL.set(world, { x: 0 }, 31.05);
camTo(27.2, 540, 958, 1.0, 0.1);
camTo(28.4, 606, 950, 1.12, 1.2);
camTo(29.9, 540, 1108, 1.24, 1.4);
camTo(30.7, 480, 1180, 1.26, 0.7);

// ---------------- SET 6: AAKHRI SHRAAP (31.5-37.5) ----------------
const set6 = E('g', { opacity: 0 }, camG);
E('rect', { x: -400, y: -200, width: 1880, height: 2150, fill: 'url(#bStormSky)' }, set6);
E('polygon', { points: '-400,1920 -400,940 -160,905 60,985 300,1090 520,1215 760,1400 1020,1520 1480,1660 1480,1920', fill: '#171230' }, set6);
E('polygon', { points: '-400,1920 -400,1100 -120,1065 260,1220 480,1335 700,1500 1020,1640 1480,1780 1480,1920', fill: '#100c20' }, set6);
// bijli
const bolt6 = E('g', { opacity: 0 }, set6);
E('polygon', { points: '838,60 742,430 806,430 690,790 770,452 706,452', fill: '#fef9c3', filter: 'url(#magicGlow)' }, bolt6);
const flash6 = E('rect', { x: -400, y: -200, width: 1880, height: 2120, fill: '#ffffff', opacity: 0 }, set6);
// gira hua Singhia + wahi chattan (sir frame ke andar — shraap usi ke munh se hai)
const singh6 = buildBhangarhActor(set6, { x: 760, y: 1570, scale: 0.98, role: 'singhia' });
TL.set(singh6.wrap, { attr: { transform: 'translate(760 1570) scale(0.98) rotate(-84 0 0)' } }, 0);
drawRealBoulder(set6, 848, 1552, 0.8);
setFaceMood(singh6, 31.6, 'angry');
speakHuman(singh6, 31.9, 36.7, 'angry', null);
poseArms(singh6, 33.0, -128, -18, 0, 0, 0.6); // bebas haath aasmaan ki taraf
// baarish
const rain6 = E('g', { opacity: 0.34 }, set6);
for (let rn = 0; rn < 58; rn++) {
  const rx = -360 + (rn * 47) % 1800;
  const rl = E('line', { x1: rx, y1: -170, x2: rx - 34, y2: -16, stroke: '#bcd3f5', 'stroke-width': 3.4 }, rain6);
  TL.fromTo(rl, { y: 0 }, { y: 2150, duration: 0.62 + (rn % 5) * 0.07, ease: 'none', repeat: -1 }, (rn % 9) * 0.09);
}
// shraap ki lehar
const ring6 = E('circle', { cx: 470, cy: 1492, r: 30, fill: 'none', stroke: '#c084fc', 'stroke-width': 7, opacity: 0, filter: 'url(#magicGlow)' }, set6);
TL.to(ring6, { opacity: 0.9, attr: { r: 560 }, duration: 1.1, ease: 'power2.out' }, 36.8);
TL.to(ring6, { opacity: 0, duration: 0.5 }, 37.3);
[32.2, 34.9, 36.9].forEach(function (lt) {
  TL.to(bolt6, { opacity: 1, duration: 0.07 }, lt);
  TL.to(flash6, { opacity: 0.4, duration: 0.07 }, lt);
  TL.to(bolt6, { opacity: 0, duration: 0.12 }, lt + 0.12);
  TL.to(flash6, { opacity: 0, duration: 0.16 }, lt + 0.12);
});
camTo(31.5, 520, 1118, 1.2, 0.1);
camTo(31.8, 498, 1162, 1.34, 5.4);

// ---------------- SET 7: KHAALI SHEHER — ASAL KHANDHAR (37.5-43.8) ----------------
const set7 = E('g', { opacity: 0 }, camG);
const skyGolden7 = E('rect', { x: -400, y: -200, width: 1880, height: 1320, fill: 'url(#bGoldenSky)' }, set7);
E('rect', { x: -400, y: -200, width: 1880, height: 1320, fill: 'url(#bDuskSky)' }, set7);
set7.insertBefore(skyGolden7, set7.children[1] || null);
TL.to(skyGolden7, { opacity: 0, duration: 2.6, ease: 'sine.inOut' }, 37.8);
// Aravalli ki pahadiyan peeche
E('polygon', { points: '-400,1090 -160,884 120,962 420,852 760,952 1080,862 1480,982 1480,1090', fill: '#2c2135', opacity: 0.85 }, set7);
E('rect', { x: -400, y: 1060, width: 1880, height: 860, fill: '#3a2a18' }, set7); // zameen ka aadhaar
E('polygon', { points: '-400,1920 330,1080 750,1080 1480,1920', fill: '#4c3a28' }, set7); // gali
// gali ke pathar ke slab
E('path', { d: 'M 262 1180 L 838 1180 M 176 1330 L 946 1330 M 66 1520 L 1050 1520 M -60 1760 L 1180 1760 M 480 1080 L 380 1920 M 620 1080 L 760 1920', stroke: 'rgba(16,9,2,0.35)', 'stroke-width': 5, fill: 'none' }, set7);
E('rect', { x: -400, y: 1080, width: 1880, height: 60, fill: '#5d4630' }, set7);
// khandhar ghar — har pathar alag, upar ki katarein tooti hui
function ruinHouse(parent, x, y, w, h, seed) {
  const g = E('g', { transform: 'translate(' + x + ' ' + y + ')' }, parent);
  const tones = ['#6d5136', '#75582f', '#654a2e', '#7d5c39', '#5d422a'];
  const rnd = function () { seed = (seed * 37 + 11) % 997; return seed; };
  const courseH = 36;
  const rows = Math.floor(h / courseH);
  for (let r = 0; r < rows; r++) {
    const ry = h - (r + 1) * courseH;
    const topZone = r > rows - 3;
    let cx = (r % 2) * -22;
    while (cx < w) {
      const sw = 52 + (rnd() % 30);
      const missing = topZone && (rnd() % 3 === 0);
      const sunk = topZone && (rnd() % 4 === 0) ? 12 : 0;
      if (!missing && cx + sw > 0 && w - cx >= 14) {
        E('rect', { x: cx + 2, y: ry + 2 + sunk, width: Math.max(8, Math.min(sw, w - cx) - 4), height: courseH - 4 - sunk, rx: 5, fill: tones[rnd() % 5], stroke: 'rgba(20,10,2,0.5)', 'stroke-width': 1.6 }, g);
      }
      cx += sw;
    }
  }
  E('path', { d: 'M 0 ' + h + ' L 0 26 L ' + (w * 0.3) + ' 8 L ' + (w * 0.55) + ' 30 L ' + (w * 0.8) + ' 12 L ' + w + ' 24 L ' + w + ' ' + h, fill: 'none', stroke: '#241407', 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M ' + (w * 0.38) + ' ' + h + ' L ' + (w * 0.38) + ' ' + (h * 0.48) + ' C ' + (w * 0.38) + ' ' + (h * 0.34) + ' ' + (w * 0.62) + ' ' + (h * 0.34) + ' ' + (w * 0.62) + ' ' + (h * 0.48) + ' L ' + (w * 0.62) + ' ' + h + ' Z', fill: '#120a04' }, g);
  E('rect', { x: w * 0.1, y: h * 0.36, width: w * 0.16, height: h * 0.19, fill: '#120a04' }, g);
  E('rect', { x: w * 0.75, y: h * 0.36, width: w * 0.16, height: h * 0.19, fill: '#120a04' }, g);
  return g;
}
ruinHouse(set7, -270, 700, 340, 390, 7);
ruinHouse(set7, 80, 790, 270, 300, 13);
ruinHouse(set7, 770, 780, 280, 310, 21);
ruinHouse(set7, 1100, 690, 350, 400, 31);
// (kauwa hata diya — gol kaala gola lag raha tha, scene waise hi bhara hai)
// mandir — akela, chhat ke saath; har manjil par nakash ki lakeerein
const temple7 = E('g', { transform: 'translate(540 1086)' }, set7);
E('rect', { x: -158, y: -14, width: 316, height: 20, fill: '#7c5a30', stroke: '#4a2f10', 'stroke-width': 3 }, temple7); // chauka (platform)
E('rect', { x: -132, y: -30, width: 264, height: 18, fill: '#8a6535', stroke: '#4a2f10', 'stroke-width': 3 }, temple7);
E('rect', { x: -120, y: -190, width: 240, height: 162, fill: 'url(#bSandstone)', stroke: '#5f3707', 'stroke-width': 4 }, temple7);
[[-96, -268, 192, 80], [-74, -336, 148, 70], [-52, -396, 104, 62], [-32, -446, 64, 52], [-15, -486, 30, 42]].forEach(function (st) {
  E('rect', { x: st[0], y: st[1], width: st[2], height: st[3], fill: 'url(#bSandstone)', stroke: '#5f3707', 'stroke-width': 3.5 }, temple7);
  E('line', { x1: st[0] + 8, y1: st[1] + st[3] * 0.38, x2: st[0] + st[2] - 8, y2: st[1] + st[3] * 0.38, stroke: 'rgba(95,55,7,0.55)', 'stroke-width': 3 }, temple7);
  E('line', { x1: st[0] + 8, y1: st[1] + st[3] * 0.68, x2: st[0] + st[2] - 8, y2: st[1] + st[3] * 0.68, stroke: 'rgba(95,55,7,0.55)', 'stroke-width': 3 }, temple7);
});
E('polygon', { points: '0,-540 -13,-488 13,-488', fill: 'url(#bBrass)', stroke: '#7c4a03', 'stroke-width': 2 }, temple7);
E('circle', { cx: 0, cy: -492, r: 10, fill: 'url(#bBrass)', stroke: '#7c4a03', 'stroke-width': 2 }, temple7);
E('path', { d: 'M 0 -536 L 44 -524 L 0 -512 Z', fill: '#dc2626' }, temple7);
E('path', { d: 'M -34 -28 L -34 -124 C -34 -156 34 -156 34 -124 L 34 -28 Z', fill: '#2a1608' }, temple7);
const diya7 = E('g', { transform: 'translate(0 -52)' }, temple7);
E('circle', { cx: 0, cy: 0, r: 26, fill: 'url(#bLampGlow)' }, diya7);
E('ellipse', { cx: 0, cy: -2, rx: 4.6, ry: 8.6, fill: '#fcd34d' }, diya7);
TL.to(diya7, { opacity: 0.72, duration: 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 37.6);
// malba — toote pathar, gira stambh
drawRealBoulder(set7, 128, 1242, 0.34);
drawRealBoulder(set7, 958, 1312, 0.27);
const pillar7 = E('g', { transform: 'translate(700 1640) rotate(76)' }, set7);
E('rect', { x: -14, y: -84, width: 28, height: 168, rx: 11, fill: '#8a6535', stroke: '#4a2f10', 'stroke-width': 3 }, pillar7);
E('rect', { x: -30, y: -104, width: 60, height: 24, fill: '#7c5a30', stroke: '#4a2f10', 'stroke-width': 3 }, pillar7);
E('rect', { x: 240, y: 1200, width: 74, height: 40, fill: '#6d5136', stroke: '#241407', 'stroke-width': 3, transform: 'rotate(-9 277 1220)' }, set7);
E('rect', { x: 850, y: 1150, width: 58, height: 34, fill: '#75582f', stroke: '#241407', 'stroke-width': 3, transform: 'rotate(11 879 1167)' }, set7);
// sookhi ghaas ke guchhe deewaron ke pairon me
[36, 316, 706, 1016, 420].forEach(function (gx, gi) {
  const gy = 1096 + (gi % 3) * 60;
  E('path', { d: 'M ' + gx + ' ' + gy + ' q -6 -34 -16 -44 M ' + gx + ' ' + gy + ' q 0 -38 4 -50 M ' + gx + ' ' + gy + ' q 8 -32 18 -40', stroke: '#a98f4f', 'stroke-width': 3.4, fill: 'none', 'stroke-linecap': 'round' }, set7);
});
// kuan (well) + tooti gaadi
E('ellipse', { cx: 218, cy: 1330, rx: 86, ry: 26, fill: '#3a2a18', stroke: '#241407', 'stroke-width': 4 }, set7);
E('ellipse', { cx: 218, cy: 1322, rx: 62, ry: 17, fill: '#0d0803' }, set7);
const cart7 = E('g', { transform: 'translate(856 1408) rotate(-7)' }, set7);
E('rect', { x: -92, y: -52, width: 184, height: 40, fill: '#5f3a16', stroke: '#2c1a08', 'stroke-width': 3.5 }, cart7);
E('circle', { cx: -58, cy: 6, r: 30, fill: 'none', stroke: '#3a2410', 'stroke-width': 8 }, cart7);
E('circle', { cx: 62, cy: 14, r: 24, fill: 'none', stroke: '#3a2410', 'stroke-width': 8 }, cart7);
camTo(37.5, 540, 1002, 1.0, 0.1);
camTo(37.8, 540, 1052, 1.16, 2.6);
camTo(40.5, 545, 968, 1.27, 3.1);
// ---------------- VISIBILITY + CAPTIONS ----------------
TL.set(set2, { opacity: 1 }, 8.0); TL.set(set1, { opacity: 0 }, 8.0);
TL.set(set3, { opacity: 1 }, 15.0); TL.set(set2, { opacity: 0 }, 15.0);
TL.set(set4, { opacity: 1 }, 19.0); TL.set(set3, { opacity: 0 }, 19.0);
TL.set(set5a, { opacity: 1 }, 23.5); TL.set(set4, { opacity: 0 }, 23.5);
TL.set(set5b, { opacity: 1 }, 27.2); TL.set(set5a, { opacity: 0 }, 27.2);
TL.set(set6, { opacity: 1 }, 31.5); TL.set(set5b, { opacity: 0 }, 31.5);
TL.set(set7, { opacity: 1 }, 37.5); TL.set(set6, { opacity: 0 }, 37.5);
TL.set(set1, { opacity: 1 }, 43.8); TL.set(set7, { opacity: 0 }, 43.8);

setCaption(0.0, 'BHANGARH, RAJASTHAN', 'RAJASTHAN ME EK POORA SHEHER MARA PADA HAI —', 'SARKAR NE WAHAN RAAT KO JAANA BAN KAR RAKHA HAI!');
setCaption(4.0, 'ASI OFFICIAL WARNING BOARD', 'GATE PAR BOARD LAGA HAI: SOORAJ DOOBNE KE BAAD', 'ANDAR JAANA SAKHT MANA HAI!');
setCaption(8.0, 'BHANGARH — 1573 AD', 'YE HAI BHANGARH. KAHANI SHURU HOTI HAI', 'RAJKUMARI RATNAVATI SE!');
setCaption(11.5, 'RAJKUMARI RATNAVATI', 'ITNI KHOOBSURAT THI WO, KI PURE DESH SE', 'USKE LIYE RISHTE AATE THE!');
setCaption(15.0, 'TANTRIK SINGHIA', 'PAR TANTRIK SINGHIA USE', 'JAADU SE PAANA CHAHTA THA!');
setCaption(19.0, 'JAUHARI BAZAAR', 'EK DIN BAZAAR ME, USNE RATNAVATI KE', 'ITAR ME KAALA JAADU MILA DIYA!');
setCaption(23.5, 'RATNAVATI KA FAISLA', 'RATNAVATI SAMAJH GAYI — SHEESHI UTHA KAR', 'EK BADE PATTHAR PAR PHENK MARI!');
setCaption(27.2, 'JAADU KA PALATWAR', 'JAADU PATTHAR ME SAMA GAYA. PATTHAR LUDKA…', 'AUR TANTRIK KO KUCHAL GAYA!');
setCaption(31.5, 'SINGHIA KA AAKHRI SHRAAP', '"IS SHEHER ME KISI KO CHAIN NAHI MILEGA!', 'SAB MARENGE — AUR DOBARA JANAM BHI NAHI HOGA!"');
setCaption(37.5, '1 SAAL ME BHANGARH KHAALI', 'EK SAAL ME HI BHANGARH KHATM HO GAYA.', 'RATNAVATI MARI GAYI. SHEHER KHAALI!');
setCaption(40.5, 'DOCUMENTED ARCHITECTURE', 'AAJ BHI WAHAN HAR GHAR BINA CHHAT KA HAI.', 'CHHAT HAI, TO SIRF MANDIRON PAR!');
setCaption(43.8, 'NO GHOST ON ASI BOARD!', 'DHYAN SE DEKHO — BOARD PAR BHOOT KA', 'KOI NAAM NAHI. PHIR DARR KIS BAAT KA?');
setCaption(46.6, 'TUM RAAT KO RUKTE? HAAN YA NAHI?', 'TUM RAAT KO RUKTE?', 'COMMENT ME LIKHO: HAAN YA NAHI?');

seekWrap(TL);
