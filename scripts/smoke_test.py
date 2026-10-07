import urllib.request, urllib.parse, urllib.error, json, sys

sys.stdout.reconfigure(encoding='utf-8')

def test_api():
    base = 'http://localhost:8080/api/v1'
    
    # 1. Levels & Lessons N4
    req = urllib.request.Request(f'{base}/levels')
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode('utf-8'))
        levels = data.get('data', [])
        print(f'1. Active levels found: {[l["code"] for l in levels]}')
        n4_level = [l for l in levels if l['code'] == 'N4'][0]
        n4_level_id = n4_level['id']
    
    req = urllib.request.Request(f'{base}/levels/{n4_level_id}/lessons')
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode('utf-8'))
        n4_lessons = data.get('data', [])
        print(f'   N4 Lessons count: {len(n4_lessons)} (Lessons {n4_lessons[0]["lessonNumber"]} to {n4_lessons[-1]["lessonNumber"]})')
        lesson_26 = [l for l in n4_lessons if l.get('lessonNumber') == 26][0]
        l26_id = lesson_26['id']
        print(f'   Lesson 26 ID: {l26_id}')
    
    # 2. Get listenings for lesson 26 via /api/v1/lessons/{lessonId}/listenings
    req = urllib.request.Request(f'{base}/lessons/{l26_id}/listenings')
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode('utf-8'))
        listenings = data.get('data', [])
        print(f'2. Lesson 26 listenings count: {len(listenings)}')
        first_listening = listenings[0]
        listening_id = first_listening['id']
        print(f'   Listening 1 ID: {listening_id}, Title: {first_listening["title"]}')
        print(f'   Audio URL: {first_listening["audioUrl"]}')
    
    # 3. Get listening detail & check NO answer leakage
    req = urllib.request.Request(f'{base}/listenings/{listening_id}')
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode('utf-8'))
        detail = data.get('data', {})
        print(f'3. Listening detail questions: {len(detail.get("questions", []))}')
        q1 = detail['questions'][0]
        options = q1.get('options', [])
        print(f'   Question 1: {q1["question"]}, Options count: {len(options)}')
        has_leak = any('correct' in opt or 'isCorrect' in opt for opt in options)
        print(f'   Answer leakage check: {"LEAK DETECTED!" if has_leak else "PASS (No answer leakage!)"}')
    
    # 4. Submit answers
    submit_body = {
        'answers': [
            {'questionId': q['id'], 'selectedOptionId': q['options'][0]['id']}
            for q in detail.get('questions', [])
        ]
    }
    req = urllib.request.Request(
        f'{base}/listenings/{listening_id}/submit',
        data=json.dumps(submit_body).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode('utf-8'))
        sub_res = data.get('data', {})
        print(f'4. Submit response: Score={sub_res.get("score")}, Correct={sub_res.get("correctCount")}/{sub_res.get("totalQuestions")}')
    
    # 5. Search
    encoded_q = urllib.parse.quote('Track A-1')
    req = urllib.request.Request(f'{base}/search?q={encoded_q}&type=LISTENING&level=N4')
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode('utf-8'))
        search_items = data.get('data', {}).get('items', [])
        print(f'5. Search results count: {len(search_items)}')
        if search_items:
            print(f'   Search top item: {search_items[0].get("title")}')
    
    # 6. Admin 401 check
    try:
        urllib.request.urlopen(f'{base}/admin/listenings')
        print('6. Admin security: FAIL (Unexpected 200)')
    except urllib.error.HTTPError as e:
        print(f'6. Admin security: PASS (Received HTTP {e.code})')

if __name__ == '__main__':
    test_api()
