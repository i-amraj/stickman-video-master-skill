import subprocess, json

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[-1500:]); raise SystemExit(1)
    return r

report = json.load(open('vo/fit_report.json'))
inputs = []
filters = []
labels = []

# VO lines
for i, r in enumerate(report):
    inputs += ['-i', f"vo/lines/{r['line']}.wav"]
    ms = int(r['place'] * 1000)
    filters.append(f"[{i}:a]adelay={ms}:all=1[vo{i}]")
    labels.append(f"[vo{i}]")

# BGM
bgm_i = len(report)
inputs += ['-i', '/home/hatch/workspace/music-library/Unseen_Horrors.mp3']
filters.append(f"[{bgm_i}:a]atrim=0:49,asetpts=PTS-STARTPTS,volume=0.10,afade=t=in:st=0:d=1,afade=t=out:st=46:d=3[bgm]")
labels.append('[bgm]')

# SFX: (file, at_sec, gain, trim)
SFX = [
    ('/home/hatch/workspace/sfx-library/misc/whoosh-cinematic.mp3', 25.45, 0.50, 1.6),
    ('/home/hatch/workspace/sfx-library/misc/impact-bass-1.mp3',    26.30, 0.45, 1.2),
    ('/home/hatch/workspace/sfx-library/misc/thunder.ogg',          28.55, 0.70, 3.0),
    ('/home/hatch/workspace/sfx-library/misc/impact-bass-1.mp3',    30.55, 0.80, 1.5),
    ('/home/hatch/workspace/sfx-library/misc/riser.mp3',            30.80, 0.35, 2.2),
    ('/home/hatch/workspace/sfx-library/misc/thunder.ogg',          32.10, 0.50, 3.0),
    ('/home/hatch/workspace/sfx-library/misc/thunder.ogg',          34.80, 0.40, 3.0),
]
for j, (f, at, g, tr) in enumerate(SFX):
    idx = bgm_i + 1 + j
    inputs += ['-i', f]
    ms = int(at * 1000)
    filters.append(f"[{idx}:a]atrim=0:{tr},asetpts=PTS-STARTPTS,volume={g},adelay={ms}:all=1[sfx{j}]")
    labels.append(f"[sfx{j}]")

filters.append(''.join(labels) + f"amix=inputs={len(labels)}:normalize=0,"
                 "loudnorm=I=-14:TP=-1.5:LRA=11,atrim=0:49,asetpts=PTS-STARTPTS[out]")

cmd = ['ffmpeg', '-y', '-v', 'error'] + inputs + [
    '-filter_complex', ';'.join(filters), '-map', '[out]',
    '-ar', '48000', '-ac', '2', 'vo/mix.wav']
run(cmd)
print('mix ok')

# loudness check
r = subprocess.run(['ffmpeg', '-i', 'vo/mix.wav', '-af', 'loudnorm=print_format=json',
                    '-f', 'null', '-'], capture_output=True, text=True)
tail = r.stderr[r.stderr.rfind('{'):r.stderr.rfind('}') + 1]
print('LOUDNESS:', json.loads(tail)['input_i'], 'LUFS, TP', json.loads(tail)['input_tp'])

# mux
run(['ffmpeg', '-y', '-v', 'error', '-i', 'Bhangarh_SceneFix_v2.mp4', '-i', 'vo/mix.wav',
     '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
     '-shortest', 'Bhangarh_VO_Final.mp4'])
r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration,size',
                    '-of', 'default=noprint_wrappers=1', 'Bhangarh_VO_Final.mp4'],
                   capture_output=True, text=True)
print(r.stdout)
print('MUX DONE')
