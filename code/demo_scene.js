
// ================= DEMO SCENE — 10s sample (repo ke liye; asal reel se alag footage) =================
function camToD(t, cx, cy, s, dur, ease) { TL.to(camF.o, { cx: cx, cy: cy, s: s, duration: dur, ease: ease || 'sine.inOut', onUpdate: camF.apply }, t); }
TL.set(camF.o, { cx: 540, cy: 1005, s: 0.98 }, 0);
TL.call(function () { camF.apply(); }, null, 0);

const demoSet = E('g', {}, camG);
// aasmaan (full-height) + taare + chaand
E('rect', { x: -500, y: -300, width: 2080, height: 2220, fill: 'url(#bNightSky)' }, demoSet);
[[120, 180], [300, 120], [760, 150], [980, 220], [180, 420], [1020, 430], [620, 110], [450, 260]].forEach(function (p, i) {
  E('circle', { cx: p[0], cy: p[1], r: (i % 3) + 2, fill: '#ffffff', opacity: 0.75 }, demoSet);
});
E('circle', { cx: 862, cy: 292, r: 120, fill: 'url(#bMoonGlow)', opacity: 0.55 }, demoSet);
E('circle', { cx: 862, cy: 292, r: 52, fill: '#fef9c3', stroke: '#fde68a', 'stroke-width': 2 }, demoSet);
// pahadiyan + zameen
E('polygon', { points: '-500,1560 -160,1080 180,1560', fill: '#241a30' }, demoSet);
E('polygon', { points: '700,1560 1010,1030 1420,1560', fill: '#241a30' }, demoSet);
E('rect', { x: -500, y: 1560, width: 2080, height: 360, fill: 'url(#bGroundNight)' }, demoSet);
// pathar ki deewarein (gate ke dono taraf) + stambh + upar ki patti
drawStoneWall(demoSet, -460, 760, 800, 800, 7, true);
drawStoneWall(demoSet, 740, 760, 800, 800, 21, true);
E('rect', { x: 322, y: 700, width: 52, height: 860, fill: 'url(#bStoneDark)', stroke: '#1c1410', 'stroke-width': 3 }, demoSet);
E('rect', { x: 706, y: 700, width: 52, height: 860, fill: 'url(#bStoneDark)', stroke: '#1c1410', 'stroke-width': 3 }, demoSet);
E('rect', { x: 300, y: 648, width: 480, height: 62, fill: 'url(#bStoneWall)', stroke: '#1c1410', 'stroke-width': 3 }, demoSet);
// lohe ka gate — dono panne aadhe khule
const gateL = E('g', { transform: 'translate(374 1560) rotate(-17)' }, demoSet);
E('rect', { x: 0, y: -620, width: 148, height: 620, fill: '#111827', opacity: 0.94, stroke: '#000000', 'stroke-width': 3 }, gateL);
for (let bx = 22; bx < 148; bx += 30) E('line', { x1: bx, y1: -606, x2: bx, y2: -14, stroke: '#374151', 'stroke-width': 6 }, gateL);
E('line', { x1: 4, y1: -470, x2: 144, y2: -470, stroke: '#374151', 'stroke-width': 7 }, gateL);
E('line', { x1: 4, y1: -170, x2: 144, y2: -170, stroke: '#374151', 'stroke-width': 7 }, gateL);
const gateR = E('g', { transform: 'translate(706 1560) rotate(17)' }, demoSet);
E('rect', { x: -148, y: -620, width: 148, height: 620, fill: '#111827', opacity: 0.94, stroke: '#000000', 'stroke-width': 3 }, gateR);
for (let bx = -126; bx < 0; bx += 30) E('line', { x1: bx, y1: -606, x2: bx, y2: -14, stroke: '#374151', 'stroke-width': 6 }, gateR);
E('line', { x1: -144, y1: -470, x2: -4, y2: -470, stroke: '#374151', 'stroke-width': 7 }, gateR);
E('line', { x1: -144, y1: -170, x2: -4, y2: -170, stroke: '#374151', 'stroke-width': 7 }, gateR);
// latka hua lamp + chhote pathar + halka kohra
drawHangingLamp(demoSet, 540, 716, 1.0);
drawRealBoulder(demoSet, 118, 1630, 0.5, 3);
drawRealBoulder(demoSet, 982, 1670, 0.38, 9);
E('ellipse', { cx: 540, cy: 1505, rx: 720, ry: 24, fill: '#cbd5e1', opacity: 0.10 }, demoSet);
// actor: sandesh-wahak andar aata hai, jhuk kar salaam
const demoHero = buildBhangarhActor(demoSet, { x: 1180, y: 1560, scale: 1.0, role: 'messenger' });
walkHuman(demoHero, 1.2, 1180, 806, 3.6);
setFaceMood(demoHero, 5.2, 'happy');
poseArms(demoHero, 5.4, 24, -52, -30, 58, 0.4);
// screen text (HUD par)
bigText(uiLayer, 540, 180, '★ DEMO ★', 62, '#facc15', 800, 'middle');
bigText(uiLayer, 540, 1752, 'MASTER SKILL — SAMPLE SCENE', 36, '#ffffff', 700, 'middle');
// camera: dheera push-in pure 10s
camToD(0, 540, 988, 1.16, 9.8);
TL.to({}, { duration: 0.1 }, 9.9);
seekWrap(TL);
