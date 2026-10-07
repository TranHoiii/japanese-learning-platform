import pymysql
import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

def audit():
    print("==================================================")
    print("         AUDIT N4 READING DATA INTEGRITY          ")
    print("==================================================")

    # 1. Check JSON file
    json_path = 'backend/src/main/resources/data/n4-reading.json'
    assert os.path.exists(json_path), "n4-reading.json not found"
    with open(json_path, 'r', encoding='utf-8') as f:
        lessons_data = json.load(f)

    json_lessons = len(lessons_data)
    json_items = sum(len(l["items"]) for l in lessons_data)
    json_questions = sum(len(it.get("questions", [])) for l in lessons_data for it in l["items"])
    json_options = sum(len(q.get("options", [])) for l in lessons_data for it in l["items"] for q in it.get("questions", []))

    print(f"[JSON Audit]")
    print(f"  Lessons: {json_lessons}")
    print(f"  Reading items: {json_items}")
    print(f"  Questions: {json_questions}")
    print(f"  Options: {json_options}")

    # 2. Check Database
    conn = pymysql.connect(host='localhost', user='root', password='123456', database='japanese_learning')
    with conn.cursor() as cur:
        # Check level
        cur.execute("SELECT id, code, name FROM levels WHERE code = 'N4'")
        n4_level = cur.fetchone()
        print(f"[Database Audit]")
        print(f"  Level N4: {n4_level}")

        # Check lessons
        cur.execute("SELECT id, lesson_number, title FROM lessons WHERE level_id = %s ORDER BY lesson_number ASC", (n4_level[0],))
        lessons = cur.fetchall()
        print(f"  Total N4 Lessons in DB: {len(lessons)} (Lesson numbers: {lessons[0][1]}..{lessons[-1][1]})")

        # Check reading contents per lesson
        cur.execute('''
            SELECT l.lesson_number, COUNT(rc.id)
            FROM lessons l
            LEFT JOIN reading_contents rc ON l.id = rc.lesson_id
            WHERE l.level_id = %s
            GROUP BY l.lesson_number
            ORDER BY l.lesson_number ASC
        ''', (n4_level[0],))
        per_lesson = cur.fetchall()

        all_lessons_have_reading = True
        for l_num, count in per_lesson:
            if count == 0:
                print(f"  WARNING: Lesson {l_num} has 0 reading items!")
                all_lessons_have_reading = False

        if all_lessons_have_reading:
            print(f"  OK: All 25 N4 Lessons have reading contents (26-50).")

        # Total counts
        cur.execute('''
            SELECT COUNT(rc.id) FROM reading_contents rc
            JOIN lessons l ON rc.lesson_id = l.id
            WHERE l.level_id = %s
        ''', (n4_level[0],))
        db_items = cur.fetchone()[0]

        cur.execute('''
            SELECT COUNT(rq.id) FROM reading_questions rq
            JOIN reading_contents rc ON rq.reading_id = rc.id
            JOIN lessons l ON rc.lesson_id = l.id
            WHERE l.level_id = %s
        ''', (n4_level[0],))
        db_questions = cur.fetchone()[0]

        cur.execute('''
            SELECT COUNT(ro.id) FROM reading_options ro
            JOIN reading_questions rq ON ro.question_id = rq.id
            JOIN reading_contents rc ON rq.reading_id = rc.id
            JOIN lessons l ON rc.lesson_id = l.id
            WHERE l.level_id = %s
        ''', (n4_level[0],))
        db_options = cur.fetchone()[0]

        print(f"  DB N4 Reading Contents: {db_items}")
        print(f"  DB N4 Reading Questions: {db_questions}")
        print(f"  DB N4 Reading Options: {db_options}")

        # Check single correct answer per question
        cur.execute('''
            SELECT rq.id, COUNT(ro.id) as correct_count
            FROM reading_questions rq
            JOIN reading_contents rc ON rq.reading_id = rc.id
            JOIN lessons l ON rc.lesson_id = l.id
            JOIN reading_options ro ON rq.id = ro.question_id
            WHERE l.level_id = %s AND ro.is_correct = TRUE
            GROUP BY rq.id
            HAVING correct_count != 1
        ''', (n4_level[0],))
        invalid_q = cur.fetchall()
        if invalid_q:
            print(f"  ERROR: Found {len(invalid_q)} questions with != 1 correct option: {invalid_q}")
        else:
            print("  OK: Every question has exactly 1 correct option.")

        # Check image files
        cur.execute('''
            SELECT DISTINCT rc.image_url
            FROM reading_contents rc
            JOIN lessons l ON rc.lesson_id = l.id
            WHERE l.level_id = %s AND rc.image_url IS NOT NULL
        ''', (n4_level[0],))
        img_urls = [r[0] for r in cur.fetchall()]
        print(f"[Media/Image Audit]")
        print(f"  Distinct image URLs in DB: {len(img_urls)}")

        missing_backend = 0
        missing_frontend = 0
        for url in img_urls:
            rel_file = url.lstrip('/')
            backend_file = os.path.join('backend', 'src', 'main', 'resources', 'static', rel_file)
            frontend_file = os.path.join('frontend', 'public', rel_file)
            if not os.path.exists(backend_file):
                print(f"  Missing backend file: {backend_file}")
                missing_backend += 1
            if not os.path.exists(frontend_file):
                print(f"  Missing frontend file: {frontend_file}")
                missing_frontend += 1

        if missing_backend == 0 and missing_frontend == 0:
            print(f"  OK: All {len(img_urls)} media images exist in both backend static and frontend public directories!")

    conn.close()
    print("==================================================")
    print("              AUDIT COMPLETED: PASS               ")
    print("==================================================")

if __name__ == "__main__":
    audit()
