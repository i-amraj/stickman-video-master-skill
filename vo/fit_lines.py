import subprocess, json, os

FF = 'ffmpeg'
def dur(path):
    out = subprocess.run(['ffprobe','-v','error','-show_entries','format=duration',
                          '-of','default=noprint_wrappers=1:nokey=1', path],
                         capture_output=True, text=True).stdout.strip()
    return float(out)

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print('FAIL:', ' '.join(cmd)); print(r.stderr[-800:]); raise SystemExit(1)

os.makedirs('vo/lines', exist_ok=True)

# (name, src, cut_start, cut_end, pitch_rate, place_at, deadline_end)
JOBS = [
    ('L1',  'vo/narr_raw.wav',    0.00,  5.60, 53760,  0.00,  3.95),
    ('L2',  'vo/narr_raw.wav',    5.55, 10.20, 53760,  4.00,  7.95),
    ('L3',  'vo/narr_raw.wav',   10.15, 15.00, 53760,  8.00, 11.45),
    ('L4',  'vo/narr_raw.wav',   14.95, 18.38, 53760, 11.50, 14.95),
    ('L5',  'vo/narr_raw.wav',   18.33, 21.80, 53760, 15.00, 18.95),
    ('L6',  'vo/narr_raw.wav',   21.75, 25.88, 53760, 19.00, 23.45),
    ('L7',  'vo/narr_raw.wav',   25.83, 29.56, 53760, 23.50, 27.15),
    ('L8',  'vo/narr_raw.wav',   29.51, 34.84, 53760, 27.20, 31.45),
    ('L9',  'vo/singhia_raw.wav', 0.00,  7.04, 46080, 31.50, 37.45),
    ('L10', 'vo/narr_raw.wav',   34.80, 39.26, 53760, 37.50, 40.45),
    ('L11', 'vo/narr_raw.wav',   39.22, 44.22, 53760, 40.50, 43.75),
    ('L12', 'vo/narr_raw.wav',   44.70, 49.25, 53760, 43.80, 47.25),
    ('L13', 'vo/narr_raw.wav',   49.70, 52.00, 53760, 47.35, 48.95),
]

report = []
for name, src, cs, ce, rate, place, deadline in JOBS:
    tmp = f'vo/lines/{name}_prep.wav'
    out = f'vo/lines/{name}.wav'
    # pass 1: cut + compress internal pauses + pitch shift
    run([FF, '-y', '-v', 'error', '-i', src,
         '-af', (f'atrim=start={cs}:end={ce},asetpts=PTS-STARTPTS,'
                 f'silenceremove=start_periods=0:stop_periods=-1:stop_duration=0.22:stop_threshold=-45dB:stop_silence=0.12,'
                 f'asetrate={rate},aresample=48000'),
         '-ar', '48000', '-ac', '1', tmp])
    d = dur(tmp)
    target = deadline - place
    atempo = d / target
    if atempo < 1.0:
        atempo = 1.0
    atempo = min(atempo, 1.45)
    # pass 2: tempo fit
    run([FF, '-y', '-v', 'error', '-i', tmp,
         '-af', f'atempo={atempo:.3f}', '-ar', '48000', '-ac', '1', out])
    fd = dur(out)
    report.append({'line': name, 'place': place, 'prep_dur': round(d, 2),
                   'atempo': round(atempo, 3), 'final_dur': round(fd, 2),
                   'ends': round(place + fd, 2), 'deadline': deadline})
    print(report[-1])

json.dump(report, open('vo/fit_report.json', 'w'), indent=1)
print('DONE')
