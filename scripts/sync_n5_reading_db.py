import pymysql
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

conn = pymysql.connect(host='localhost', user='root', password='123456', database='japanese_learning', autocommit=False)
cur = conn.cursor()

try:
    with open('backend/src/main/resources/data/n5-reading.json', 'r', encoding='utf-8') as f:
        lessons_data = json.load(f)

    # Find N5 level ID
    cur.execute("SELECT id FROM levels WHERE code = 'N5'")
    row = cur.fetchone()
    if not row:
        raise Exception("N5 level not found")
    n5_level_id = row[0]
    print(f"N5 level ID: {n5_level_id}")

    # Map lessonNumber -> lessonId
    cur.execute("SELECT lesson_number, id FROM lessons WHERE level_id = %s", (n5_level_id,))
    lesson_map = {r[0]: r[1] for r in cur.fetchall()}
    print(f"Found {len(lesson_map)} lessons for N5")

    # Get existing reading IDs for N5 lessons to clean them up properly
    cur.execute("""
        SELECT rc.id FROM reading_contents rc
        JOIN lessons l ON rc.lesson_id = l.id
        WHERE l.level_id = %s
    """, (n5_level_id,))
    existing_reading_ids = [r[0] for r in cur.fetchall()]

    if existing_reading_ids:
        format_strings = ','.join(['%s'] * len(existing_reading_ids))
        
        # 1. Delete user_reading_progress if table exists
        cur.execute("SHOW TABLES LIKE 'user_reading_progress'")
        if cur.fetchone():
            cur.execute(f"DELETE FROM user_reading_progress WHERE reading_id IN ({format_strings})", existing_reading_ids)

        # 2. Delete favorites if any
        cur.execute("SHOW TABLES LIKE 'favorites'")
        if cur.fetchone():
            cur.execute(f"DELETE FROM favorites WHERE content_type = 'READING' AND content_id IN ({format_strings})", existing_reading_ids)

        # 3. Find question IDs
        cur.execute(f"SELECT id FROM reading_questions WHERE reading_id IN ({format_strings})", existing_reading_ids)
        q_ids = [r[0] for r in cur.fetchall()]
        if q_ids:
            q_format = ','.join(['%s'] * len(q_ids))
            cur.execute(f"DELETE FROM reading_options WHERE question_id IN ({q_format})", q_ids)
            cur.execute(f"DELETE FROM reading_questions WHERE id IN ({q_format})", q_ids)

        cur.execute(f"DELETE FROM reading_contents WHERE id IN ({format_strings})", existing_reading_ids)
        print(f"Cleaned up {len(existing_reading_ids)} old reading items.")

    # Insert new data from n5-reading.json
    total_contents = 0
    total_questions = 0
    total_options = 0

    for l_data in lessons_data:
        l_num = l_data['lessonNumber']
        lesson_id = lesson_map.get(l_num)
        if not lesson_id:
            print(f"Warning: Lesson {l_num} not found in DB!")
            continue

        for it in l_data['items']:
            cur.execute("""
                INSERT INTO reading_contents (lesson_id, title, content, translation, image_url, sort_order)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (
                lesson_id,
                it.get('title'),
                it.get('content'),
                it.get('translation'),
                it.get('imageUrl'),
                it.get('sortOrder', 1)
            ))
            reading_id = cur.lastrowid
            total_contents += 1

            for q in it.get('questions', []):
                cur.execute("""
                    INSERT INTO reading_questions (reading_id, question, question_type, explanation, image_url, sort_order)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (
                    reading_id,
                    q.get('question'),
                    q.get('questionType', 'MULTIPLE_CHOICE'),
                    q.get('explanation'),
                    q.get('imageUrl'),
                    q.get('sortOrder', 1)
                ))
                question_id = cur.lastrowid
                total_questions += 1

                for opt in q.get('options', []):
                    cur.execute("""
                        INSERT INTO reading_options (question_id, content, is_correct, sort_order)
                        VALUES (%s, %s, %s, %s)
                    """, (
                        question_id,
                        opt.get('content'),
                        opt.get('correct', False),
                        opt.get('sortOrder', 1)
                    ))
                    total_options += 1

    conn.commit()
    print("Database sync completed successfully!")
    print(f"Inserted: {total_contents} reading contents, {total_questions} questions, {total_options} options.")

except Exception as e:
    conn.rollback()
    print(f"Error during DB sync: {e}")
    raise
finally:
    cur.close()
    conn.close()
