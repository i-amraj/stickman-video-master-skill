# Stickman Video Master Skill — Script se Final Reel tak

Ek complete, battle-tested pipeline: Indian horror/mystery Hindi Shorts (1080×1920, 30fps)
jo code se banti hain — research, script, character design, scene build, voiceover, mix, QC.
Reference production: **Bhangarh reel** (demo video is repo me hai — `demo/Bhangarh_VO_Final.mp4`,
uska saara code `code/` aur `vo/` folders me hai).

## STEP 0 — Research (script se pehle)
- Asal jagah/kahani par **deep research**: Wikipedia + official sources (ASI board jaise primary saboot).
- Har daave ko tag karo: **[DOCUMENTED]** (saboot hai) · **[LEGEND]** (lok-katha) · **[NAHI MILA]** (script me mat jodo).
- Jhootha viral daawa kabhi mat jodo — pehle verify. (Bhangarh seekh: "ekmatra kila jahan raat ban hai" GALAT nikla, script se hata diya.)
- Demand check: usi topic ke sabse bade YouTube videos dekho — kaunsa angle chala (night-visit, board close-up, shuddh kahani)?

## STEP 1 — Script Writing
- **Pehla vaakya = poori ghatna** (hook). Jawab ka clue pehli line/frame me chhupa ho.
- Har vaakya **6–12 shabd**; kul ~150 shabd ≈ 49 sec @ ~190 wpm.
- Characters ke **NAAM** rakho. Reveal pehle, "kyunki" baad me.
- Beech me "tum" ko chunauti + aakhir me **ek-shabd comment bait** (HAAN ya NAHI?).
- Takiya-kalaam: "asal mein / matlab / dhyan se dekho / socho zara". **PABANDI:** AI-shabd (rahasya, tathya, romanch, sansani) NAHI.
- **Character dialogue rule:** sirf 2–4 chune hue dialogues characters ki apni awaaz me; baaki sab narration. Invented dialogue NAHI.
- Pacing parakh: VO 2.3–2.7 shabd/sec band · dead air >12% = katoti · title jawab spoil na kare.

## STEP 2 — Storyboard + Geometry Lock
- Line → scene table (har line ka t0–t1 pehle tay). Phir ASCII coordinate lock: har set ki zameen (FLOOR), character positions, camera har beat par.
- Sketch pehle, look baad me — bina sketch ke seedha final code NAHI.

## STEP 3 — Character Design (code `code/my_builder.js`)
- Character = **engineered SVG actor** (~640 units): 2-segment FK ang (hip→knee, shoulder→elbow), gole joints, jaw-shaped face path per role.
- Har role ka **DNA palette**: skin, iris, outfit, khaas nishan (maang-tikka, tilak, pagdi).
- **Forehead details (tilak) hair layer ke BAAD banao** — warna baal ke neeche chhup jayega.
- Acting API: `setFaceMood` · `lookEyes` · `poseArms` · `speakHuman` (lip shapes) · `walkHuman` (asal walk cycle — slide = hard FAIL).
- Haath: hatheli + angootha + ungli lakeerein. Blink loop + saans (breathing) har actor par.
- Quality benchmark: character primitive shapes (gola sir, cylinder shareer) se NAHI banega — sculpted paths hi chalenge.

## STEP 4 — Set Design (code `code/my_head.js`, `my_scenes_a/b.js`)
- **Materials pehle:** har surface multi-stop gradient (iGrad) + asal drop-shadow; flat rang = FAIL.
- Kamra = 3D shell: back wall + perspective side walls + floor polygon + skirting.
- Pathar ki deewar: har pathar alag tone + highlight line + mausam-daag (procedural stone texture) — bathroom-tile repeat = FAIL.
- **Boulder/chattan:** asaman 12-point polygon + 3 facet shades + daraar + ret-daag + contact shadow. Octagon/slab = hard FAIL.
- Zinda props: jhoolta lamp, hawan ki laptein + dhuaan, kauye, kohra (halka!) — par fx light ON karke chhodna NAHI, har fx ka OFF beat lazmi.
- **Camera law:** har `camTo` se pehle view-bottom hisaab — `cy + 960/s ≤ 1920`, warna frame ke neeche sky/kaala kinara dikhega.
- Sky rect hamesha full-height.

## STEP 5 — Assembly + Render
- Engine core = kisi assembled html ka prefix (shell svg#stage + defs + rig + helpers E/iGrad/makeCam/seekWrap) + scene file + closing tags. `gsap.min.js` saath rakho — file-copy ko `&&` chain me mat rakho (ek fail = baaki sab ruk jayega).
- Timeline GSAP par; render deterministic seek se: Playwright 1080×1920 → `window.seekToTime(t)` har frame → JPEG q88 → ffmpeg libx264 crf18. ~20s chunks me render karo (VM restart se bacho), resume-wala pattern (frame >10KB ho to skip).
- **GSAP sabak:** jo group pehle se transform (translate+scale) rakhta hai, uspar x/y tween use NAHI — **attr transform absolute tweens** use karo.
- Lambi caption lines: render script me `getComputedTextLength() > 1030` par `textLength=1030` fixer chalao.
- poseArms sign: armR ko frame-bayein ghumana = POSITIVE rotation. Gira character: wrap −84° par sir ~530 units bayein jata hai — head ki final position pehle gin kar wrap rakho.

## STEP 6 — Self-Audit Loop (har scene)
- Test stills nikalo (har scene ke beech + problem frames) → khud dekho (zoom crops bhi) → fixes → dobara stills.
- 3 audits: **Artistic** (composition, rang) · **Physical** (anatomy, saaye, zameen se judav) · **Story** (narration match, expression ulta to nahi).
- Score /100; **95+ hi FINAL PASS**. Hard fail (toota haath, floating object, ulti saaye, badla prop) score ko override karta hai.
- Banner/subtitle screen-space me rakho: sir ki screen-y = (wy − cy)·s + 960; banner 118–222, subtitle 1652+ ke bahar.

## STEP 7 — Voiceover (code `vo/fit_lines.py`)
- Model SIRF **gemini-3.8-flash-tts** (primary) / **gemini-3.1-flash-tts-preview** (fallback sirf 429 par). 2.5 TTS BAND. Quota 10 calls/day/model — budget pehle gin lo.
- Narration = **EK single call**, poori script ek saath. Text **RAW** bhejo — lambi style-direction pace 2.5× dheema kar deti hai aur kabhi-kabhi direction hi bol deti hai.
- Awaazein: narration **Puck** (Raj ki pasand, @i.raj1801 reels ki default) · villain/dusri awaaz **Algenib**.
- TTS WAV = 48000 Hz aata hai — pitch math asal rate par: **pitch ×1.12 = asetrate 53760** (rubberband KABHI NAHI — echo deta hai). Villain ko bhari karna ho to ×0.96.
- Line fit: Whisper (small, language `hi`) se take ke segments lo → har line kaato → pause-compression (silenceremove) → pitch → per-line atempo se caption window me exact fit.
- Whisper ko WAV stdlib wave+numpy se decode karke do (PyAV `metadata_errors` TypeError deta hai).

## STEP 8 — Mix (code `vo/mix.py`)
- **BGM har reel FRESH** — kabhi reuse NAHI; license-safe (Kevin MacLeod library). Volume ~0.10, VO ke neeche.
- SFX beat-map par: whoosh (phenk), impact (takkar/girna), thunder (bijli/shraap), riser (curse se pehle).
- Loudnorm **2-pass** (measure → linear apply) = **−14.0 LUFS**, TP ≤ −1.5. Single-pass aksar −15.8 par ruk jata hai.
- Mux: video stream copy + AAC 192k.

## STEP 9 — Final QC + Delivery
- **Delivered file** ko Whisper se suno — har scripted line sahi order/time par hai? Source take ki parakh kaafi NAHI.
- Duration, size, LUFS teeno verify karke batao.
- **Delivery sabak:** video file ka naam dobara use NAHI karo — app cached purani copy dikha deta hai. Har nayi delivery = naya naam (v2, _Final, date).
- Perfect (Raj-approved) videos `Perfect_Videos/<date>/` folder me jama hote hain — sirf perfect wale.

## Files guide
- `script/Script_v1.md` — Bhangarh script + sach/kahani tags + pacing check (template ki tarah use karo)
- `code/my_head.js` — shaders, HUD, drawStoneWall / drawRealBoulder / drawPerfumeBottle / drawAsiBoard / drawHangingLamp
- `code/my_builder.js` — buildBhangarhActor (5 roles, full rig)
- `code/my_scenes_a.js` / `my_scenes_b.js` — 8 sets + timeline + captions
- `code/props_snippet.js` / `api_snippet.js` — ped/ghaas + acting API
- `code/render_test.py` / `render_full.py` — stills + full render (resume-wala)
- `vo/fit_lines.py` / `vo/mix.py` — VO fit + final mix
- `docs/` — visual system digest + lessons
- `demo/Bhangarh_VO_Final.mp4` — is pipeline se bani perfect reel
