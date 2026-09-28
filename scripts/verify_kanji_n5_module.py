import sys
import urllib.request
import urllib.parse
import json
import pymysql

sys.stdout.reconfigure(encoding='utf-8')
base_url = 'http://localhost:8080/api/v1'

def main():
    print('==================================================')
    print('1. DATABASE INTEGRITY & CONSISTENCY CHECKS')
    print('==================================================')

    conn = pymysql.connect(
        host='localhost',
        user='root',
        password='123456',
        database='japanese_learning',
        cursorclass=pymysql.cursors.DictCursor
    )
    
    with conn.cursor() as cursor:
        cursor.execute("SELECT COUNT(*) AS count FROM kanjis")
        total_kanjis = cursor.fetchone()['count']

        cursor.execute("SELECT COUNT(*) AS count FROM lesson_kanjis")
        total_lesson_kanjis = cursor.fetchone()['count']

        cursor.execute("SELECT COUNT(*) AS count FROM kanji_compounds")
        total_compounds = cursor.fetchone()['count']

        # Duplicate Kanjis
        cursor.execute("SELECT kanji, COUNT(*) as cnt FROM kanjis GROUP BY kanji HAVING cnt > 1")
        dup_kanjis = cursor.fetchall()

        # Duplicate LessonKanjis
        cursor.execute("SELECT lesson_id, kanji_id, COUNT(*) as cnt FROM lesson_kanjis GROUP BY lesson_id, kanji_id HAVING cnt > 1")
        dup_lk = cursor.fetchall()

        # Orphaned LessonKanjis
        cursor.execute("SELECT COUNT(*) as count FROM lesson_kanjis lk LEFT JOIN kanjis k ON lk.kanji_id = k.id WHERE k.id IS NULL")
        orphan_lk_kanji = cursor.fetchone()['count']

        cursor.execute("SELECT COUNT(*) as count FROM lesson_kanjis lk LEFT JOIN lessons l ON lk.lesson_id = l.id WHERE l.id IS NULL")
        orphan_lk_lesson = cursor.fetchone()['count']

        # Orphaned Compounds
        cursor.execute("SELECT COUNT(*) as count FROM kanji_compounds kc LEFT JOIN kanjis k ON kc.kanji_id = k.id WHERE k.id IS NULL")
        orphan_compound = cursor.fetchone()['count']

        # Per Lesson breakdown
        cursor.execute("""
            SELECT l.lesson_number, COUNT(lk.kanji_id) as kanji_count
            FROM lessons l
            LEFT JOIN lesson_kanjis lk ON l.id = lk.lesson_id
            WHERE l.level_id = 1
            GROUP BY l.id, l.lesson_number
            ORDER BY l.lesson_number
        """)
        per_lesson = cursor.fetchall()

    conn.close()

    print(f"Total Kanjis in DB: {total_kanjis}")
    print(f"Total Lesson-Kanji Links in DB: {total_lesson_kanjis}")
    print(f"Total Kanji Compounds in DB: {total_compounds}")
    print(f"Duplicate Kanjis: {len(dup_kanjis)}")
    print(f"Duplicate Lesson-Kanji Relations: {len(dup_lk)}")
    print(f"Orphaned LessonKanjis (missing kanji): {orphan_lk_kanji}")
    print(f"Orphaned LessonKanjis (missing lesson): {orphan_lk_lesson}")
    print(f"Orphaned Compounds: {orphan_compound}")

    print("\n-- Per Lesson Kanji Report --")
    lessons_with_kanji = 0
    for pl in per_lesson:
        lnum = pl['lesson_number']
        cnt = pl['kanji_count']
        if cnt > 0:
            lessons_with_kanji += 1
        print(f"Lesson {lnum:02d}: {cnt} Kanjis")

    print(f"\nLessons with Kanji data: {lessons_with_kanji}/25")

    print('\n==================================================')
    print('2. BACKEND API ENDPOINT TESTS & EXCEPTION HANDLING')
    print('==================================================')

    def test_api(path, description, expected_code=200):
        url = base_url + path
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                print(f"PASS [{description}]: Status {resp.status} | Success: {data.get('success')} | Message: \"{data.get('message')}\"")
                return True, data
        except urllib.error.HTTPError as e:
            body = json.loads(e.read().decode('utf-8'))
            if e.code == expected_code:
                print(f"PASS [{description}]: Status {e.code} (As expected {expected_code}) | Success: {body.get('success')} | Message: \"{body.get('message')}\"")
                return True, body
            else:
                print(f"FAIL [{description}]: Expected {expected_code}, got {e.code} | Message: \"{body.get('message')}\"")
                return False, body

    test_api('/kanjis', 'GET /api/v1/kanjis')
    test_api('/kanjis?page=0&size=5', 'GET /api/v1/kanjis (paginated)')
    test_api('/kanjis/1', 'GET /api/v1/kanjis/1')
    test_api('/kanjis/1/compounds', 'GET /api/v1/kanjis/1/compounds')
    test_api('/lessons/1/kanjis', 'GET /api/v1/lessons/1/kanjis')
    test_api('/kanjis/search?q=' + urllib.parse.quote('一'), 'GET /api/v1/kanjis/search?q=一')
    test_api('/kanjis/999999', 'GET /api/v1/kanjis/999999 (Non-existent ID)', expected_code=404)
    test_api('/lessons/999999/kanjis', 'GET /api/v1/lessons/999999/kanjis (Non-existent Lesson ID)', expected_code=404)

    print('\n==================================================')
    print('3. REGRESSION TESTING FOR OTHER MODULES')
    print('==================================================')
    test_api('/levels', 'GET /api/v1/levels')
    test_api('/levels/1/lessons', 'GET /api/v1/levels/1/lessons')
    test_api('/lessons/1', 'GET /api/v1/lessons/1')
    test_api('/lessons/1/vocabularies', 'GET /api/v1/lessons/1/vocabularies')
    test_api('/lessons/1/grammars', 'GET /api/v1/lessons/1/grammars')

if __name__ == '__main__':
    main()
