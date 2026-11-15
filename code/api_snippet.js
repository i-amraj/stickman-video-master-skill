function setFaceMood(actor, t, mood, dur) {
  dur = dur || 0.2;
  const M = {
    neutral:  { bL: 'M -36 -25 Q -22 -34 -8 -25', bR: 'M 8 -25 Q 22 -34 36 -25', rx: 12, ry: 3.5, teeth: 0 },
    happy:    { bL: 'M -36 -30 Q -22 -40 -8 -30', bR: 'M 8 -30 Q 22 -40 36 -30', rx: 16, ry: 8.5, teeth: 1 },
    sad:      { bL: 'M -36 -20 Q -22 -26 -8 -33', bR: 'M 8 -33 Q 22 -26 36 -20', rx: 13, ry: 4.0, teeth: 0 },
    angry:    { bL: 'M -36 -33 Q -22 -26 -8 -18', bR: 'M 8 -18 Q 22 -26 36 -33', rx: 14, ry: 5.5, teeth: 1 },
    shocked:  { bL: 'M -36 -36 Q -22 -46 -8 -36', bR: 'M 8 -36 Q 22 -46 36 -36', rx: 12, ry: 13.0, teeth: 1 },
    thinking: { bL: 'M -36 -23 Q -22 -28 -8 -22', bR: 'M 8 -32 Q 22 -42 36 -31', rx: 10, ry: 3.0, teeth: 0 }
  }[mood || 'neutral'];
  TL.to(actor.browL, { attr: { d: M.bL }, duration: dur }, t);
  TL.to(actor.browR, { attr: { d: M.bR }, duration: dur }, t);
  TL.to(actor.mouthBg, { attr: { rx: M.rx, ry: M.ry }, duration: dur }, t);
  TL.to(actor.teeth, { attr: { opacity: M.teeth }, duration: dur }, t);
}

function lookEyes(actor, t, dx, dy) {
  TL.to([actor.eyeL.iris, actor.eyeR.iris], { attr: { transform: 'translate(' + dx + ' ' + dy + ')' }, duration: 0.22 }, t);
}

function poseArms(actor, t, shLAng, elLAng, shRAng, elRAng, dur) {
  dur = dur || 0.28;
  TL.to(actor.armL.shRot, { rotation: shLAng, svgOrigin: '0 0', duration: dur, ease: 'sine.inOut' }, t);
  TL.to(actor.armL.elRot, { rotation: elLAng, svgOrigin: '0 0', duration: dur, ease: 'sine.inOut' }, t);
  TL.to(actor.armR.shRot, { rotation: shRAng, svgOrigin: '0 0', duration: dur, ease: 'sine.inOut' }, t);
  TL.to(actor.armR.elRot, { rotation: elRAng, svgOrigin: '0 0', duration: dur, ease: 'sine.inOut' }, t);
}

// FIXED SPEAKING CONTROLLER: Zero head wobble! Pure facial expressions (brow micro-lifts + lip-sync)
function speakHuman(actor, t0, t1, mood, gesture) {
  setFaceMood(actor, t0, mood, 0.16);
  const shapes = [
    { rx: 15, ry: 9.0, teeth: 1 },
    { rx: 16, ry: 5.0, teeth: 1 },
    { rx: 10, ry: 10.5, teeth: 0 },
    { rx: 12, ry: 3.0, teeth: 0 }
  ];
  let k = 0;
  for (let t = t0; t < t1 - 0.14; t += 0.16) {
    const s = shapes[k % shapes.length];
    TL.to(actor.mouthBg, { attr: { rx: s.rx, ry: s.ry }, duration: 0.08 }, t);
    TL.to(actor.teeth, { attr: { opacity: s.teeth }, duration: 0.08 }, t);
    // Expressive eyebrow micro-movement instead of robotic neck shaking!
    if (k % 3 === 0) {
      TL.to([actor.browL, actor.browR], { y: -3, duration: 0.14, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
    }
    k++;
  }
  setFaceMood(actor, t1, mood, 0.15);

  if (gesture === 'explain') {
    TL.to(actor.armR.shRot, { rotation: -32, svgOrigin: '0 0', duration: 0.3, ease: 'sine.out' }, t0);
    TL.to(actor.armR.elRot, { rotation: 48, svgOrigin: '0 0', duration: 0.28, ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.45)) }, t0);
    poseArms(actor, t1, 0, 0, 0, 0, 0.3);
  } else if (gesture === 'panic') {
    poseArms(actor, t0, 55, -75, -55, 75, 0.25); // Hands raised inward toward temples in panic!
    poseArms(actor, t1, 0, 0, 0, 0, 0.3);
  } else if (gesture === 'plead') {
    poseArms(actor, t0, 28, -55, -35, 62, 0.3); // Both hands folded inward at chest in a pleading gesture!
    poseArms(actor, t1, 0, 0, 0, 0, 0.3);
  }
}

function walkHuman(actor, t0, fromX, toX, dur) {
  const faceLeft = toX < fromX;
  TL.set(actor.flipG, { attr: { transform: faceLeft ? 'scale(-1 1)' : 'scale(1 1)' } }, t0);
  const steps = Math.max(2, Math.round(dur / 0.24));
  const stepT = dur / steps;
  for (let i = 0; i < steps; i++) {
    const ts = t0 + i * stepT;
    const leadL = (i % 2 === 0);
    const nx = Math.round(fromX + ((toX - fromX) * (i + 1)) / steps);
    TL.to(actor.wrap, { attr: { transform: 'translate(' + nx + ' ' + actor.y + ') scale(' + actor.scale + ')' }, duration: stepT, ease: 'none' }, ts);
    TL.to(actor.legL.hipRot, { rotation: leadL ? -24 : 18, svgOrigin: '0 0', duration: stepT, ease: 'sine.inOut' }, ts);
    TL.to(actor.legL.kneeRot, { rotation: leadL ? 28 : 5, svgOrigin: '0 0', duration: stepT, ease: 'sine.inOut' }, ts);
    TL.to(actor.legR.hipRot, { rotation: leadL ? 18 : -24, svgOrigin: '0 0', duration: stepT, ease: 'sine.inOut' }, ts);
    TL.to(actor.legR.kneeRot, { rotation: leadL ? 5 : 28, svgOrigin: '0 0', duration: stepT, ease: 'sine.inOut' }, ts);
    TL.to(actor.armR.shRot, { rotation: leadL ? -18 : 18, svgOrigin: '0 0', duration: stepT, ease: 'sine.inOut' }, ts);
    TL.to(actor.armL.shRot, { rotation: leadL ? 14 : -14, svgOrigin: '0 0', duration: stepT, ease: 'sine.inOut' }, ts);
    TL.to(actor.bobG, { y: -7, duration: stepT * 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, ts);
  }
  TL.to([actor.legL.hipRot, actor.legL.kneeRot, actor.legR.hipRot, actor.legR.kneeRot, actor.armR.shRot, actor.armL.shRot], { rotation: 0, svgOrigin: '0 0', duration: 0.18 }, t0 + dur);
  actor.x = toX;
}