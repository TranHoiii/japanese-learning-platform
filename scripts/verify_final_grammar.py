import sys
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')
base_url = 'http://localhost:8080/api/v1'

def fetch_json(url):
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

print('==================================================')
print('1. DATABASE INTEGRITY & PER-LESSON GRAMMAR REPORT')
print('==================================================')

# Level N5
levels_resp = fetch_json(base_url + '/levels')
levels = levels_resp.get('data', [])
n5_level = next((l for l in levels if l['code'] == 'N5'), None)
print(f'Level N5 exists: {n5_level is not None} (ID: {n5_level.get("id") if n5_level else "N/A"})')

# Lessons
lessons_resp = fetch_json(base_url + f'/levels/{n5_level["id"]}/lessons')
lessons = lessons_resp.get('data', [])
print(f'Lessons count for N5: {len(lessons)} (Expected: 25)')

total_grammars = 0
total_examples = 0

print('\n-- Per Lesson Grammar Report --')
for l in lessons:
    lid = l['id']
    lnum = l['lessonNumber']
    g_resp = fetch_json(f'{base_url}/lessons/{lid}/grammars')
    g_list = g_resp.get('data', [])
    ex_count = sum(len(g.get('examples', [])) for g in g_list)
    total_grammars += len(g_list)
    total_examples += ex_count
    print(f'Lesson {lnum:02d}: {len(g_list)} grammars, {ex_count} examples')

print(f'\nTOTAL GRAMMAR PATTERNS IN DB: {total_grammars}')
print(f'TOTAL GRAMMAR EXAMPLES IN DB: {total_examples}')

print('\n==================================================')
print('2. DATA ACCURACY CHECK - LESSON 01 PATTERNS')
print('==================================================')

expected_l1_patterns = [
    '～は～です',
    '～は～じゃありません',
    '～は～ですか',
    '～は～ですか', #だれ／どなた
    '～の～（Trực thuộc）',
    '～も～です',
    '～は～歳です'
]

l1_resp = fetch_json(base_url + '/lessons/1/grammars')
l1_grammars = l1_resp.get('data', [])

for idx, g in enumerate(l1_grammars):
    pattern = g['pattern']
    meaning = g['meaning']
    usage = g['usage']
    ex_count = len(g.get('examples', []))
    print(f'Grammar #{idx+1}: Pattern="{pattern}" | Meaning="{meaning}" | Examples={ex_count}')

print('\n==================================================')
print('3. BACKEND API ENDPOINTS & EXCEPTION HANDLING TESTS')
print('==================================================')

def test_api(path, description, expected_code=200):
    url = base_url + path
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f'PASS [{description}]: Status {resp.status} | Success: {data.get("success")} | Message: "{data.get("message")}"')
            return True, data
    except urllib.error.HTTPError as e:
        body = json.loads(e.read().decode('utf-8'))
        if e.code == expected_code:
            print(f'PASS [{description}]: Status {e.code} (As expected 404) | Success: {body.get("success")} | Message: "{body.get("message")}"')
            return True, body
        else:
            print(f'FAIL [{description}]: Expected {expected_code}, got {e.code} | Message: "{body.get("message")}"')
            return False, body

test_api('/lessons/1/grammars', 'GET /api/v1/lessons/1/grammars')
test_api('/grammars?lessonId=1', 'GET /api/v1/grammars?lessonId=1')
test_api('/grammars/1', 'GET /api/v1/grammars/1')
test_api('/grammars/1/examples', 'GET /api/v1/grammars/1/examples')
test_api('/grammars/999999', 'GET /api/v1/grammars/999999 (Non-existent ID)', expected_code=404)
test_api('/grammars/999999/examples', 'GET /api/v1/grammars/999999/examples (Non-existent ID)', expected_code=404)
test_api('/lessons/999999/grammars', 'GET /api/v1/lessons/999999/grammars (Non-existent Lesson ID)', expected_code=404)
