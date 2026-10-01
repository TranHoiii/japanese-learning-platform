import urllib.request, urllib.error, json, sys
sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = 'http://localhost:8080/api/v1'

def run():
    print('=== TESTING ALL N5 LISTENING LESSONS (1 to 13) ===')
    for lesson_num in range(1, 14):
        res = json.loads(urllib.request.urlopen(f'{BASE_URL}/lessons/{lesson_num}/listenings').read().decode('utf-8'))
        assert res['success'] is True, f"Lesson {lesson_num} failed"
        data = res['data']
        print(f"Lesson {lesson_num:02d}: {len(data)} tracks loaded cleanly.")
        for track in data:
            for q in track['questions']:
                for opt in q['options']:
                    assert 'isCorrect' not in opt and 'correct' not in opt, 'Leaked isCorrect'

    print('\n2. Testing GET & Submit for Lesson 2 (Track A-5)')
    l2_res = json.loads(urllib.request.urlopen(f'{BASE_URL}/lessons/2/listenings').read().decode('utf-8'))
    first_track = l2_res['data'][0]
    payload = {
        'answers': [
            {'questionId': first_track['questions'][0]['id'], 'selectedOptionId': first_track['questions'][0]['options'][2]['id']}, # correct c
            {'questionId': first_track['questions'][1]['id'], 'selectedOptionId': first_track['questions'][1]['options'][0]['id']}, # correct a
            {'questionId': first_track['questions'][2]['id'], 'selectedOptionId': first_track['questions'][2]['options'][1]['id']}  # correct b
        ]
    }
    req = urllib.request.Request(f"{BASE_URL}/listenings/{first_track['id']}/submit", data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
    sub_res = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
    print(f"  Lesson 2 Track A-5 Submit Score: {sub_res['data']['score']}% ({sub_res['data']['correctCount']}/{sub_res['data']['totalQuestions']})")
    assert sub_res['data']['correctCount'] == 3

    print('\n3. Testing GET & Submit for Lesson 13 (Track A-49)')
    l13_res = json.loads(urllib.request.urlopen(f'{BASE_URL}/lessons/13/listenings').read().decode('utf-8'))
    l13_track = l13_res['data'][0]
    payload13 = {
        'answers': [
            {'questionId': l13_track['questions'][0]['id'], 'selectedOptionId': l13_track['questions'][0]['options'][1]['id']} # correct c (index 1)
        ]
    }
    req13 = urllib.request.Request(f"{BASE_URL}/listenings/{l13_track['id']}/submit", data=json.dumps(payload13).encode('utf-8'), headers={'Content-Type': 'application/json'})
    sub_res13 = json.loads(urllib.request.urlopen(req13).read().decode('utf-8'))
    print(f"  Lesson 13 Track A-49 Submit Score: {sub_res13['data']['score']}% ({sub_res13['data']['correctCount']}/{sub_res13['data']['totalQuestions']})")

    print('\nALL BACKEND API TESTS FOR LESSONS 1-13 PASSED SUCCESSFULLY!')

if __name__ == '__main__':
    run()
