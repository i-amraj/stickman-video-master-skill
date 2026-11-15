# Hard Lessons (Bhangarh production se)
1. Primitive-geometry characters (gola sir, cylinder shareer) kabhi kaam nahi karte — character quality = sculpted SVG paths.
2. GSAP x/y tween preset-transform wale group ko origin par phenk deta hai — attr transform absolute tweens use karo.
3. poseArms: armR ko frame-bayein ghumana = POSITIVE rotation.
4. Gira character (wrap -84 deg): sir ~530 units bayein jata hai — head ki final world position pehle gin kar wrap rakho.
5. Forehead details (tilak) hair layer ke BAAD banao.
6. Sky rect hamesha full-height — warna polygons ke beech kaala wedge.
7. Camera view-bottom check: cy + 960/s <= 1920 — warna frame ke neeche garam patti/stage-kaala.
8. Fx/point lights ON karke chhodna NAHI — har fx ka OFF beat lazmi.
9. File-copy ko && chain me mat rakho — ek fail = baaki steps chup-chaap ruk jate hain.
10. Video delivery me file ka naam dobara use NAHI — app cached purani copy dikhata hai.
11. TTS: lambi style-direction pace 2.5x dheema kar deti hai — RAW text bhejo. Pitch math asal sample rate (48k) par.
12. Whisper parakh hamesha DELIVERED final file par — source take par nahi.
