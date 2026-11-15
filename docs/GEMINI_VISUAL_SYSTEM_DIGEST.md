# GEMINI VISUAL SYSTEM — jo seekha (CODE LAB rounds 6–8, Perfected file se)
*Bunty ki apni production ke liye. Raj ka niyam (2026-11-14): Gemini se seekh kar KHUD banao; har round ke baad ye digest update ho.*

## 1. MATERIALS PEHLE (sabse bada farak)
- Har surface = multi-stop GRADIENT, flat rang KABHI NAHI. Library: skyDay/skySunset, tealBack/SideL/SideR, woodFloor3D, oakTableTop, mahoganyDoor, leatherBag, steelChrome, brassGold, warmLampGlow.
- Ek asal DROP SHADOW filter (feDropShadow dy=10, blur=7, black 44%) har actor/object group par. Glow ke liye blur+merge filter.
- Chehre par bhi soft side-shading path (rgba brown .16) — flat skin = fail.

## 2. KAMRA = 3D SHELL (flat deewar NAHI)
- Back wall rect + LEFT/RIGHT deewarein perspective POLYGONS (upar-bahar ki taraf sikudti), ceiling polygon, floor polygon.
- Floor par perspective plank lines: har line do rang (dark + halki highlight), aur 4 horizontal depth lines.
- Wainscot: neeche ka panel hissa (dark overlay + safed kinari line + panel rectangles). Skirting 3 hisso me, har hisse ka alag shade (roshni ka logic).
- Kona lines par dark stroke — room "band" lagta hai, andar baitha mehsoos hota hai.

## 3. CHARACTER = ENGINEERED ACTOR (~700 units, pair zameen par, neeche contact shadow ellipse black 40%)
- **DNA palette per role:** skin, skinSh (shadow rang), hair, hairD, sleeve, pants, shoes.
- **Taang:** hip JOINT group → jaangh (rounded rect 38×112) → knee JOINT group → pindli (34×108) → joota (path). 2-segment FK, joint par gola (circle) taaki detachment dikhe hi na.
- **Baah:** shoulder JOINT → upar ki sleeve (32×100) → elbow JOINT → kalaai (28×90) → HAATH group: hatheli ellipse + angootha ellipse (ghumaya hua) + ungliyon ki 3 lakeerein.
- **Dhad:** aakar wala PATH (kandhe chaude → kamar patli), sirf rect NAHI. Outfit = role ke hisaab se asal details: suit+shirt+tie+lapel lines; phati shirt par DASHED silai wale patches; belt+buckle; haar ke moti; apron ki straps+button+jeb.
- **Sir:** gardan (rect, skinSh) → kaan (2 ellipse) → chehra ek JAW-SHAPED path (har role ki alag aakriti) → baal peeche VOLUME ellipse se (gap kabhi nahi). Role details: budhe par jhurriyan + nasolabial lines + safed daadhi/moonchh path; ladkiyon par blush + kaan ke jhumke.
- **Acting API:** setFaceMood (mood states), lookEyes (putliyan ghumana), poseArms (shoulder+elbow kone), speakHuman (bolte waqt sir/chehra/haath), walkHuman (taang swing + bob). Expression sirf munh badalna NAHI hai.

## 4. PROPS = 3D OBJECTS, apni zindagi ke saath
- Har prop ke kam se kam 2–3 face (bag: side face + front + straps + buckles + handle).
- Zinda props: ghumta ceiling fan, chalti ghadi ki suiyaan, seeded realistic ped (har baar alag), lehrati ghaas.
- Prop ghataana = pehle uski asal aakriti ginna (straps, buckle, seam), phir banana.

## 5. PHONE REEL PAR LAGU (mera agla kaam)
- 5 zones side-view rahenge, par har zone: gradient deewar + perspective floor + wainscot/skirting + asal materials (lakdi ki mez oak gradient, bistar par kapde ki shading).
- Hero = upar wale actor system se (joints + DNA + outfit), baithna = hip/knee kone se, haath phone tak = shoulder+elbow pose se (band wali lakeer NAHI).
- Board/graph bhi material + shadow ke saath. Pehle STILLS, Raj ki parakh, phir render.

## 6. SYSTEM B — THREE.JS REAL-3D (Bhangarh round, 2026-11-14 raat)
*Poora playbook ab SKILL me hai: `~/workspace/custom-skills/gemini-code-craft/SKILL.md` — yahan sirf saransh.*
- Gemini ka method: storyboard table → ASCII coordinate LOCK → per-scene sketch → code 3 chunks (1: stage+textures+cast, 2: sets, 3: HUD table + GSAP timeline + seekToTime), sab ek IIFE me.
- Renderer: ACES tone mapping, PCFSoft shadows, preserveDrawingBuffer, 1080×1920, fov 38, FogExp2.
- Text hamesha DOM HUD overlay me (banner/stamp/subtitle) — WebGL ke andar NAHI; document/board text = canvas 2D texture.
- Textures procedural: sandstone canvas recipe (brick grid + sin-hash shade + grain), map+bumpMap ek hi texture.
- Camera = plain state object, GSAP tween, seek par syncCamera() haath se. Mood lighting time-window table (din/toofaan-bijli sin flicker/shaam/raat). Aakhri camera state = pehla (loop-perfect).
- Character: role palette + primitive anatomy + FK pivots (shoulder/elbow) + role signature (tikka/jata/pagdi/bun). LIMIT: chehra sirf aankh-gole — expression system NAHI; acting camera/posture/roshni se.
- Bhangarh code: `~/workspace/your_files/bhangarh_reel/code_lab/` (chunk1_stage_cast.js + chunk2_sets.js + chunk3_timeline.js + step2_diagram.txt + 8 sketch images).
