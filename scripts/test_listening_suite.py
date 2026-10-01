import urllib.request, urllib.error, json, sys
sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = 'http://localhost:8080/api/v1'

def run():
    print('1. Testing GET /lessons/1/listenings')
    res = json.loads(urllib.request.urlopen(f'{BASE_URL}/lessons/1/listenings').read().decode('utf-8'))
    assert res['success'] is True
    data = res['data']
    print(f'Total tracks: {len(data)}')
    for d in data:
        print(f"  Track {d['title']} has {len(d['questions'])} questions")
        for q in d['questions']:
            for opt in q['options']:
                assert 'isCorrect' not in opt and 'correct' not in opt, 'Leaked isCorrect'
    first_id = data[0]['id']
    third_id = data[2]['id']
    
    print('2. Testing GET /listenings/{id}')
    res1 = json.loads(urllib.request.urlopen(f'{BASE_URL}/listenings/{first_id}').read().decode('utf-8'))
    print(f"  Track: {res1['data']['title']}")
    
    print('3. Testing Submit 1 right, 1 wrong')
    d1 = res1['data']
    payload = {
        'answers': [
            {'questionId': d1['questions'][0]['id'], 'selectedOptionId': d1['questions'][0]['options'][0]['id']},
            {'questionId': d1['questions'][1]['id'], 'selectedOptionId': d1['questions'][1]['options'][0]['id']},
            {'questionId': d1['questions'][2]['id'], 'selectedOptionId': d1['questions'][2]['options'][1]['id']}
        ]
    }
    req = urllib.request.Request(f'{BASE_URL}/listenings/{first_id}/submit', data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
    sub_res = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
    print(f"  Score: {sub_res['data']['score']}% | Correct: {sub_res['data']['correctCount']} | Wrong: {sub_res['data']['wrongCount']}")
    assert sub_res['data']['correctCount'] == 2
    
    print('5. Testing Partial Submit')
    payload_partial = {'answers': [{'questionId': d1['questions'][0]['id'], 'selectedOptionId': d1['questions'][0]['options'][0]['id']}]}
    req_p = urllib.request.Request(f'{BASE_URL}/listenings/{first_id}/submit', data=json.dumps(payload_partial).encode('utf-8'), headers={'Content-Type': 'application/json'})
    sub_p = json.loads(urllib.request.urlopen(req_p).read().decode('utf-8'))
    print(f"  Partial submit correct: {sub_p['data']['correctCount']} / {sub_p['data']['totalQuestions']}")
    assert sub_p['data']['totalQuestions'] == 3

    print('6. Testing Invalid Question ID')
    payload_inv = {'answers': [{'questionId': 999999, 'selectedOptionId': d1['questions'][0]['options'][0]['id']}]}
    req_inv = urllib.request.Request(f'{BASE_URL}/listenings/{first_id}/submit', data=json.dumps(payload_inv).encode('utf-8'), headers={'Content-Type': 'application/json'})
    try:
        urllib.request.urlopen(req_inv)
        assert False, 'Should fail'
    except urllib.error.HTTPError as e:
        err = json.loads(e.read().decode('utf-8'))
        print(f"  Expected HTTP {e.code} received: {err['message']}")
        assert e.code == 404

    print('7. Testing Mismatched Option (Option does not belong to question)')
    track2_id = data[1]['id']
    d2 = json.loads(urllib.request.urlopen(f'{BASE_URL}/listenings/{track2_id}').read().decode('utf-8'))['data']
    foreign_opt_id = d2['questions'][0]['options'][0]['id']
    payload_mismatch = {'answers': [{'questionId': d1['questions'][0]['id'], 'selectedOptionId': foreign_opt_id}]}
    req_mis = urllib.request.Request(f'{BASE_URL}/listenings/{first_id}/submit', data=json.dumps(payload_mismatch).encode('utf-8'), headers={'Content-Type': 'application/json'})
    try:
        urllib.request.urlopen(req_mis)
        assert False, 'Should fail'
    except urllib.error.HTTPError as e:
        err = json.loads(e.read().decode('utf-8'))
        print(f"  Expected HTTP {e.code} received: {err['message']}")
        assert e.code == 400

    print('ALL BACKEND API TESTS (INCLUDING EDGE CASES & VALIDATION) PASSED SUCCESSFULLY!')

if __name__ == '__main__':
    run()
