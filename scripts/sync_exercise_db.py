import json
import pymysql

conn = pymysql.connect(
    host='localhost',
    user='root',
    password='123456',
    database='japanese_learning',
    charset='utf8mb4'
)
cursor = conn.cursor()

try:
    print("1. Updating N4 exercises sort_order in database...")
    # Update N4 sort_order if start is 28
    cursor.execute("SELECT MIN(sort_order) FROM exercises WHERE lesson_id >= 26")
    min_n4_so = cursor.fetchone()[0]
    print(f"Current MIN N4 sort_order in DB: {min_n4_so}")
    if min_n4_so == 28:
        # Shift N4 sort_order down from highest to avoid any hypothetical collision
        cursor.execute("UPDATE exercises SET sort_order = sort_order + 1 WHERE lesson_id >= 26 ORDER BY sort_order DESC")
        conn.commit()
        print("Shifted N4 sort_orders to 29..57 in DB")

    print("2. Syncing N5 exercises...")
    with open('backend/src/main/resources/data/n5-exercise.json', 'r', encoding='utf-8') as f:
        n5_data = json.load(f)

    # Fetch lessons mapping for level N5 (level_id = 1)
    cursor.execute("SELECT id, lesson_number FROM lessons WHERE level_id = 1")
    lesson_map = {row[1]: row[0] for row in cursor.fetchall()}

    for ex_dto in n5_data:
        so = ex_dto['sortOrder']
        l_num = ex_dto['lessonNumber']
        lesson_id = lesson_map[l_num]
        title = ex_dto['title']
        desc = ex_dto.get('description', '')
        ex_type = ex_dto['exerciseType']
        c_type = ex_dto.get('contentType', 'GRAMMAR')

        # Check if exercise exists by lesson_id and sort_order
        cursor.execute("SELECT id FROM exercises WHERE sort_order = %s AND lesson_id <= 25", (so,))
        existing_ex = cursor.fetchone()

        if existing_ex:
            ex_id = existing_ex[0]
            cursor.execute("""
                UPDATE exercises 
                SET title = %s, description = %s, exercise_type = %s, content_type = %s, lesson_id = %s
                WHERE id = %s
            """, (title, desc, ex_type, c_type, lesson_id, ex_id))
        else:
            cursor.execute("""
                INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW())
            """, (lesson_id, title, desc, ex_type, c_type, so))
            ex_id = cursor.lastrowid
            print(f"Inserted new Exercise {so} (ID: {ex_id})")

        # Sync questions
        # Remove old questions if inserting new exercise or ensure clean state
        cursor.execute("SELECT id, sort_order FROM questions WHERE exercise_id = %s", (ex_id,))
        existing_qs = {row[1]: row[0] for row in cursor.fetchall()}

        for q_dto in ex_dto.get('questions', []):
            q_so = q_dto['sortOrder']
            q_text = q_dto['questionText']
            q_type = q_dto.get('questionType', 'FILL_BLANK')
            q_exp = q_dto.get('explanation', '')

            if q_so in existing_qs:
                q_id = existing_qs[q_so]
                cursor.execute("""
                    UPDATE questions
                    SET question_text = %s, question_type = %s, explanation = %s
                    WHERE id = %s
                """, (q_text, q_type, q_exp, q_id))
            else:
                cursor.execute("""
                    INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order)
                    VALUES (%s, %s, %s, %s, %s)
                """, (ex_id, q_text, q_type, q_exp, q_so))
                q_id = cursor.lastrowid

            # Sync options
            cursor.execute("DELETE FROM question_options WHERE question_id = %s", (q_id,))
            for o_dto in q_dto.get('options', []):
                cursor.execute("""
                    INSERT INTO question_options (question_id, option_text, is_correct, sort_order)
                    VALUES (%s, %s, %s, %s)
                """, (q_id, o_dto['optionText'], 1 if o_dto['isCorrect'] else 0, o_dto['sortOrder']))

    conn.commit()
    print("Database sync completed successfully!")

    # Verify counts
    cursor.execute("SELECT COUNT(*) FROM exercises WHERE lesson_id <= 25")
    n5_cnt = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM exercises WHERE lesson_id >= 26")
    n4_cnt = cursor.fetchone()[0]
    print(f"Total N5 exercises in DB: {n5_cnt} (expected 28)")
    print(f"Total N4 exercises in DB: {n4_cnt} (expected 29)")
    print(f"Total exercises in DB: {n5_cnt + n4_cnt} (expected 57)")

finally:
    cursor.close()
    conn.close()
