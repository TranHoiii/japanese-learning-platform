import sys
import json
import pymysql

sys.stdout.reconfigure(encoding='utf-8')

with open("backend/src/main/resources/data/n5-kanji.json", "r", encoding="utf-8") as f:
    kanji_list = json.load(f)

print(f"Loaded {len(kanji_list)} kanjis from JSON.")

conn = pymysql.connect(
    host='localhost',
    user='root',
    password='123456',
    database='japanese_learning',
    cursorclass=pymysql.cursors.DictCursor,
    autocommit=False
)

try:
    cursor = conn.cursor()

    # 1. Ensure column kanji_number exists
    cursor.execute("SHOW COLUMNS FROM kanjis LIKE 'kanji_number'")
    if not cursor.fetchone():
        print("Adding column kanji_number to table kanjis...")
        cursor.execute("ALTER TABLE kanjis ADD COLUMN kanji_number INT NULL AFTER mnemonic_image_url")
        conn.commit()

    # 2. Get N5 level id and lessons
    cursor.execute("SELECT id FROM levels WHERE code = 'N5'")
    n5_level = cursor.fetchone()
    if not n5_level:
        cursor.execute("INSERT INTO levels (code, name, description, sort_order, is_active) VALUES ('N5', 'N5', 'Trình độ N5', 1, TRUE)")
        conn.commit()
        cursor.execute("SELECT id FROM levels WHERE code = 'N5'")
        n5_level = cursor.fetchone()

    n5_level_id = n5_level['id']

    # Get all lessons for N5 (1 to 25)
    cursor.execute("SELECT id, lesson_number FROM lessons WHERE level_id = %s", (n5_level_id,))
    lessons_map = {row['lesson_number']: row['id'] for row in cursor.fetchall()}

    for l_num in range(1, 26):
        if l_num not in lessons_map:
            title = f"Bài {l_num:02d}"
            cursor.execute("INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) VALUES (%s, %s, %s, %s, TRUE)",
                           (n5_level_id, l_num, title, l_num))
            conn.commit()
            lessons_map[l_num] = cursor.lastrowid

    # 3. Clean up existing N5 lesson_kanjis to rebuild clean mappings
    n5_lesson_ids = list(lessons_map.values())
    format_strings = ','.join(['%s'] * len(n5_lesson_ids))
    cursor.execute(f"DELETE FROM lesson_kanjis WHERE lesson_id IN ({format_strings})", tuple(n5_lesson_ids))
    print("Cleared existing N5 lesson_kanjis relations for fresh synchronization.")

    # 4. Insert or update kanjis
    kanji_db_ids = {}
    for idx, item in enumerate(kanji_list, start=1):
        char = item["kanji"].strip()
        cursor.execute("SELECT id FROM kanjis WHERE kanji = %s", (char,))
        existing = cursor.fetchone()
        
        if existing:
            kid = existing['id']
            cursor.execute("""
                UPDATE kanjis SET 
                    han_viet = %s,
                    onyomi = %s,
                    kunyomi = %s,
                    meaning = %s,
                    stroke_count = %s,
                    stroke_order_url = %s,
                    mnemonic = %s,
                    kanji_number = %s,
                    updated_at = NOW()
                WHERE id = %s
            """, (item["hanViet"], item["onyomi"], item["kunyomi"], item["meaning"],
                  item["strokeCount"], item["strokeOrderUrl"], item["mnemonic"], idx, kid))
            kanji_db_ids[char] = kid
        else:
            cursor.execute("""
                INSERT INTO kanjis (kanji, han_viet, onyomi, kunyomi, meaning, stroke_count, stroke_order_url, mnemonic, kanji_number, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
            """, (char, item["hanViet"], item["onyomi"], item["kunyomi"], item["meaning"],
                  item["strokeCount"], item["strokeOrderUrl"], item["mnemonic"], idx))
            kid = cursor.lastrowid
            kanji_db_ids[char] = kid

        # Insert compounds
        for c in item.get("compounds", []):
            cursor.execute("SELECT id FROM kanji_compounds WHERE kanji_id = %s AND word = %s", (kid, c["word"]))
            if not cursor.fetchone():
                cursor.execute("""
                    INSERT INTO kanji_compounds (kanji_id, word, reading, meaning, example_sentence)
                    VALUES (%s, %s, %s, %s, %s)
                """, (kid, c["word"], c["reading"], c["meaning"], c.get("exampleSentence")))

    # 5. Insert lesson_kanjis with precise sort_order
    # Map Units 1 to 20 to lessons:
    # U1..U15 -> L1..L15
    # U16 -> L16 & L21
    # U17 -> L17 & L22
    # U18 -> L18 & L23
    # U19 -> L19 & L24
    # U20 -> L20 & L25
    lesson_sort_orders = {l: 1 for l in range(1, 26)}

    for idx, item in enumerate(kanji_list, start=1):
        char = item["kanji"].strip()
        kid = kanji_db_ids[char]
        
        target_lessons = list(item["lessons"])
        # If lesson is 16, also attach to 21
        if 16 in target_lessons and 21 not in target_lessons:
            target_lessons.append(21)
        if 17 in target_lessons and 22 not in target_lessons:
            target_lessons.append(22)
        if 18 in target_lessons and 23 not in target_lessons:
            target_lessons.append(23)
        if 19 in target_lessons and 24 not in target_lessons:
            target_lessons.append(24)
        if 20 in target_lessons and 25 not in target_lessons:
            target_lessons.append(25)

        for l_num in target_lessons:
            lid = lessons_map.get(l_num)
            if not lid:
                continue
            s_order = lesson_sort_orders[l_num]
            cursor.execute("""
                INSERT INTO lesson_kanjis (lesson_id, kanji_id, sort_order)
                VALUES (%s, %s, %s)
            """, (lid, kid, s_order))
            lesson_sort_orders[l_num] += 1

    conn.commit()
    print("Database sync completed successfully!")

    # Summary
    cursor.execute("""
        SELECT l.lesson_number, COUNT(lk.kanji_id) as cnt
        FROM lessons l
        JOIN lesson_kanjis lk ON l.id = lk.lesson_id
        WHERE l.level_id = %s
        GROUP BY l.lesson_number
        ORDER BY l.lesson_number
    """, (n5_level_id,))
    print("\nN5 Lesson Kanji distribution:")
    for r in cursor.fetchall():
        print(f"Lesson {r['lesson_number']:02d}: {r['cnt']} kanjis")

    # Sample verify Kanji 21 (百)
    cursor.execute("SELECT k.id, k.kanji, k.han_viet, k.kanji_number, l.lesson_number, lk.sort_order FROM kanjis k JOIN lesson_kanjis lk ON k.id = lk.kanji_id JOIN lessons l ON lk.lesson_id = l.id WHERE k.kanji = '百'")
    print("\nVerify '百':", cursor.fetchall())

    conn.close()

except Exception as e:
    conn.rollback()
    conn.close()
    print("Error syncing DB:", e)
    raise
