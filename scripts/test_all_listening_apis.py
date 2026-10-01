import requests
import sys

sys.stdout.reconfigure(encoding='utf-8')

base_url = "http://localhost:8080/api/v1/lessons"
track_to_lessons = {}
errors = []

print("="*80)
print("TESTING API GET /api/v1/lessons/{lessonId}/listenings FOR LESSONS 01 -> 25")
print("="*80)

for lesson_id in range(1, 26):
    url = f"{base_url}/{lesson_id}/listenings"
    resp = requests.get(url)
    if resp.status_code != 200:
        errors.append(f"Lesson {lesson_id:02d}: HTTP status {resp.status_code}")
        print(f"FAIL Lesson {lesson_id:02d}: HTTP {resp.status_code}")
        continue

    items = resp.json()
    if isinstance(items, dict) and 'data' in items:
        items = items['data']

    print(f"Lesson {lesson_id:02d}: {len(items)} listening contents")

    for idx, item in enumerate(items, 1):
        title = item.get('title', '')
        audio = item.get('audioUrl', '')
        questions = item.get('questions', [])

        parts = title.split(' - Track ')
        t_code = parts[1].split(':')[0] if len(parts) > 1 else title

        # Record track to lesson mapping for duplicate check
        if t_code in track_to_lessons:
            track_to_lessons[t_code].append(lesson_id)
        else:
            track_to_lessons[t_code] = [lesson_id]

        print(f"   [{idx}] Track {t_code:5s} | Title: '{title}' | Audio: {audio} | Questions: {len(questions)}")

# Specific checks
print("\n" + "="*80)
print("RUNNING SPECIFIC VALIDATION CHECKS...")
print("="*80)

# Check 1: Lesson 19 track count and track codes
resp_19 = requests.get(f"{base_url}/19/listenings").json()
if isinstance(resp_19, dict) and 'data' in resp_19: resp_19 = resp_19['data']
l19_tracks = [it.get('title', '').split(' - Track ')[1].split(':')[0] for it in resp_19]
print(f"Lesson 19 tracks: {l19_tracks}")
if l19_tracks == ['B-21', 'B-22', 'B-23']:
    print("PASS: Lesson 19 has exactly tracks B-21, B-22, B-23!")
else:
    errors.append(f"FAIL: Lesson 19 tracks are {l19_tracks}, expected ['B-21', 'B-22', 'B-23']")

# Check 2: Lesson 20 starts with Track B-24
resp_20 = requests.get(f"{base_url}/20/listenings").json()
if isinstance(resp_20, dict) and 'data' in resp_20: resp_20 = resp_20['data']
l20_tracks = [it.get('title', '').split(' - Track ')[1].split(':')[0] for it in resp_20]
print(f"Lesson 20 tracks: {l20_tracks}")
if l20_tracks and l20_tracks[0] == 'B-24':
    print("PASS: Lesson 20 starts with track B-24!")
else:
    errors.append(f"FAIL: Lesson 20 tracks are {l20_tracks}, expected starting with B-24")

# Check 3: Lesson 25 tracks
resp_25 = requests.get(f"{base_url}/25/listenings").json()
if isinstance(resp_25, dict) and 'data' in resp_25: resp_25 = resp_25['data']
l25_tracks = [it.get('title', '').split(' - Track ')[1].split(':')[0] for it in resp_25]
print(f"Lesson 25 tracks: {l25_tracks}")
if l25_tracks == ['B-44', 'B-45', 'B-46']:
    print("PASS: Lesson 25 has exactly tracks B-44, B-45, B-46!")
else:
    errors.append(f"FAIL: Lesson 25 tracks are {l25_tracks}, expected ['B-44', 'B-45', 'B-46']")

# Check 4: Duplicate tracks check across all lessons
duplicates = {t: l for t, l in track_to_lessons.items() if len(l) > 1}
if not duplicates:
    print("PASS: Zero duplicate tracks found across all lessons!")
else:
    errors.append(f"FAIL: Duplicate tracks found: {duplicates}")

if not errors:
    print("\nALL API VALIDATION CHECKS PASSED PERFECTLY! (100% SUCCESS)")
else:
    print("\nERRORS DETECTED:")
    for err in errors:
        print("  -", err)
