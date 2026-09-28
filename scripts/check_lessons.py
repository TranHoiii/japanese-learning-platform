import pymysql

try:
    conn = pymysql.connect(
        host='localhost',
        user='root',
        password='123456',
        database='japanese_learning',
        cursorclass=pymysql.cursors.DictCursor
    )
    with conn.cursor() as cursor:
        cursor.execute('SELECT id, lesson_number, title FROM lessons WHERE level_id = 1 ORDER BY lesson_number')
        lessons = cursor.fetchall()
        print(f'Found {len(lessons)} lessons for N5:')
        for l in lessons:
            print(f"ID: {l['id']}, Lesson #{l['lesson_number']}: {l['title']}")
    conn.close()
except Exception as e:
    print('MySQL error:', e)
