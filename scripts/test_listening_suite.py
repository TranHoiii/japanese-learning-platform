import urllib.request, urllib.error, json, sys
sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = 'http://localhost:8080/api/v1'

def run():
    print('=== TESTING ALL N5 LISTENING LESSONS (1 to 25) ===')
    total_tracks = 0
    total_questions = 0

    for lesson_num in range(1, 26):
        res = json.loads(urllib.request.urlopen(f'{BASE_URL}/lessons/{lesson_num}/listenings').read().decode('utf-8'))
        assert res['success'] is True, f"Lesson {lesson_num} failed"
        data = res['data']
        total_tracks += len(data)
        print(f"Lesson {lesson_num:02d}: {len(data)} tracks loaded cleanly.")
        for track in data:
            total_questions += len(track['questions'])
            for q in track['questions']:
                for opt in q['options']:
                    assert 'isCorrect' not in opt and 'correct' not in opt, 'Leaked isCorrect'

    print(f"\nTotal N5 Listening tracks: {total_tracks} | Total questions: {total_questions}")

    # Test GET & Submit for mandatory test lessons: 14, 18, 21, 25
    test_lessons = [14, 18, 21, 25]
    print(f'\nTesting GET & Submit endpoints for Lessons: {test_lessons}')

    for l_num in test_lessons:
        l_res = json.loads(urllib.request.urlopen(f'{BASE_URL}/lessons/{l_num}/listenings').read().decode('utf-8'))
        first_track = l_res['data'][0]

        # Submit all first options
        answers = []
        for q in first_track['questions']:
            answers.append({'questionId': q['id'], 'selectedOptionId': q['options'][0]['id']})

        payload = {'answers': answers}
        req = urllib.request.Request(f"{BASE_URL}/listenings/{first_track['id']}/submit", data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
        sub_res = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
        assert sub_res['success'] is True
        print(f"  Lesson {l_num:02d} Track {first_track['title']} Submit Result: {sub_res['data']['correctCount']}/{sub_res['data']['totalQuestions']} correct")

    print('\nALL BACKEND API TESTS FOR LESSONS 1-25 PASSED SUCCESSFULLY!')

if __name__ == '__main__':
    run()
