import sys
import urllib.request
import urllib.parse
import json
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')
base_url = 'http://localhost:8080/api/v1'

def fetch_json(url):
    with urllib.request.urlopen(url) as resp:
        return json.loads(resp.read().decode('utf-8'))

print('==================================================')
print('1. DATABASE INTEGRITY CHECKS')
print('==================================================')

# Levels
levels_resp = fetch_json(base_url + '/levels')
levels = levels_resp.get('data', [])
n5_level = next((l for l in levels if l['code'] == 'N5'), None)
print(f'Level N5 exists: {n5_level is not None} (ID: {n5_level.get("id") if n5_level else "N/A"})')

# Lessons
lessons_resp = fetch_json(base_url + f'/levels/{n5_level["id"]}/lessons')
lessons = lessons_resp.get('data', [])
print(f'Lessons count for N5: {len(lessons)} (Expected: 25)')

# Vocabularies per lesson & orphan / null / duplicate check
all_vocabs_resp = fetch_json(base_url + '/vocabularies')
all_vocabs = all_vocabs_resp.get('data', [])
print(f'Total vocabularies in DB: {len(all_vocabs)}')

null_hiragana = [v for v in all_vocabs if not v.get('hiragana')]
null_meaning = [v for v in all_vocabs if not v.get('meaning')]
null_lesson_id = [v for v in all_vocabs if not v.get('lessonId')]

print(f'Vocabularies with null/empty hiragana: {len(null_hiragana)}')
print(f'Vocabularies with null/empty meaning: {len(null_meaning)}')
print(f'Vocabularies with null/missing lesson_id: {len(null_lesson_id)}')

# Duplicate check (same lesson_id, hiragana, meaning)
keys = [(v['lessonId'], v['hiragana'], v['meaning']) for v in all_vocabs]
dup_keys = [k for k, count in Counter(keys).items() if count > 1]
print(f'Duplicate vocabularies in same lesson: {len(dup_keys)}')

print('\n==================================================')
print('PER-LESSON VOCABULARY COUNT REPORT')
print('==================================================')
lesson_counts = {}
for l in lessons:
    lid = l['id']
    lnum = l['lessonNumber']
    v_resp = fetch_json(base_url + f'/lessons/{lid}/vocabularies')
    v_list = v_resp.get('data', [])
    lesson_counts[lnum] = len(v_list)
    print(f'Lesson {lnum:02d}: {len(v_list)} vocabulary')

print('\n==================================================')
print('2. BACKEND API ENDPOINT TESTS & EDGE CASES')
print('==================================================')

def test_endpoint(path, description, expected_status=200):
    url = base_url + path
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f'PASS [{description}]: Status {resp.status} | Success: {data.get("success")} | Message: "{data.get("message")}"')
            return True, data
    except urllib.error.HTTPError as e:
        body = json.loads(e.read().decode('utf-8'))
        if e.code == expected_status:
            print(f'PASS [{description}]: Status {e.code} (As expected) | Success: {body.get("success")} | Message: "{body.get("message")}"')
            return True, body
        else:
            print(f'FAIL [{description}]: Expected {expected_status}, got {e.code} | Message: "{body.get("message")}"')
            return False, body

test_endpoint('/levels', 'GET /api/v1/levels')
test_endpoint(f'/levels/{n5_level["id"]}', f'GET /api/v1/levels/{n5_level["id"]}')
test_endpoint(f'/levels/{n5_level["id"]}/lessons', f'GET /api/v1/levels/{n5_level["id"]}/lessons')
test_endpoint('/lessons/1', 'GET /api/v1/lessons/1')
test_endpoint('/lessons/1/vocabularies', 'GET /api/v1/lessons/1/vocabularies')
test_endpoint('/vocabularies/1', 'GET /api/v1/vocabularies/1')
test_endpoint('/vocabularies/search?q=' + urllib.parse.quote('学生'), 'GET /api/v1/vocabularies/search?q=学生')
test_endpoint('/vocabularies/search?q=' + urllib.parse.quote('がくせい'), 'GET /api/v1/vocabularies/search?q=がくせい')
test_endpoint('/vocabularies/search?q=' + urllib.parse.quote('HỌC SINH'), 'GET /api/v1/vocabularies/search?q=HỌC SINH')

print('\n-- Edge cases & Exception handling --')
test_endpoint('/vocabularies/999999', 'GET /api/v1/vocabularies/999999 (Non-existent ID)', expected_status=404)
test_endpoint('/lessons/999999', 'GET /api/v1/lessons/999999 (Non-existent Lesson ID)', expected_status=404)
test_endpoint('/lessons/999999/vocabularies', 'GET /api/v1/lessons/999999/vocabularies (Vocabularies of non-existent Lesson)', expected_status=404)
test_endpoint('/levels/999999', 'GET /api/v1/levels/999999 (Non-existent Level ID)', expected_status=404)
test_endpoint('/vocabularies/search?q=' + urllib.parse.quote('XYZ_NO_MATCH_123'), 'GET /api/v1/vocabularies/search?q=XYZ_NO_MATCH_123 (No result search)')

print('\n==================================================')
print('5. DATA ACCURACY CHECKS FOR SAMPLE VOCABULARIES')
print('==================================================')

sample_words = [
    ('わたし', '私', 'TƯ', 'Tôi'),
    ('あなた', None, None, 'Bạn (ngôi thứ 2 số ít)'),
    ('あの ひと', 'あの人', 'NHÂN', 'Người kia'),
    ('せんせい', '先生', 'TIÊN SINH', 'Thầy/ cô (không dùng khi nói về nghề nghiệp giáo viên)'),
    ('がくせい', '学生', 'HỌC SINH', 'Học sinh, sinh viên'),
    ('かいしゃいん', '会社員', 'HỘI XÃ VIÊN', 'Nhân viên công ty'),
    ('ぎんこういん', '銀行員', 'NGÂN HÀNH VIÊN', 'Nhân viên ngân hàng'),
    ('いしゃ', '医者', 'Y GIẢ', 'Bác sĩ'),
    ('けんきゅうしゃ', '研究者', 'NGHIÊN CỨU GIẢ', 'Nhà nghiên cứu'),
    ('だいがく', '大学', 'ĐẠI HỌC', 'Đại học, trường đại học'),
    ('びょういん', '病院', 'BỆNH VIỆN', 'Bệnh viện'),
]

for hiragana, exp_kanji, exp_hv, exp_meaning in sample_words:
    s_resp = fetch_json(base_url + '/vocabularies/search?q=' + urllib.parse.quote(hiragana))
    results = s_resp.get('data', [])
    match = next((r for r in results if r['hiragana'] == hiragana), None)
    if match:
        k_ok = match.get('kanji') == exp_kanji
        hv_ok = match.get('hanViet') == exp_hv
        m_ok = match.get('meaning') == exp_meaning
        status = "PASS" if (k_ok and hv_ok and m_ok) else "WARN (Differs from expected)"
        print(f'{status} [{hiragana}]: Hiragana="{match["hiragana"]}" | Kanji="{match.get("kanji")}" | HanViet="{match.get("hanViet")}" | Meaning="{match.get("meaning")}"')
    else:
        print(f'FAIL [{hiragana}]: Not found in DB')
