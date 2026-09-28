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
print('GRAMMAR DATABASE & API TEST REPORT')
print('==================================================')

# 1. Test GET /api/v1/lessons/1/grammars
l1_g = fetch_json(base_url + '/lessons/1/grammars')
print(f'Lesson 01 Grammars count: {len(l1_g["data"])}')
for g in l1_g['data']:
    print(f'  - Pattern: {g["pattern"]} | Meaning: {g["meaning"]} | Examples: {len(g["examples"])}')

print('\n-- Per Lesson Grammar Count --')
total_g = 0
total_ex = 0
for lnum in range(1, 26):
    res = fetch_json(f'{base_url}/lessons/{lnum}/grammars')
    g_list = res.get('data', [])
    g_count = len(g_list)
    ex_count = sum(len(g.get('examples', [])) for g in g_list)
    total_g += g_count
    total_ex += ex_count
    print(f'Lesson {lnum:02d}: {g_count} grammars, {ex_count} examples')

print(f'\nTOTAL GRAMMAR PATTERNS IN DB: {total_g}')
print(f'TOTAL GRAMMAR EXAMPLES IN DB: {total_ex}')

print('\n==================================================')
print('GRAMMAR API ENDPOINT & EXCEPTION TESTS')
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
            print(f'PASS [{description}]: Status {e.code} (As expected) | Success: {body.get("success")} | Message: "{body.get("message")}"')
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
