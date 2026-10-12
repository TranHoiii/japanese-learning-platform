import pymysql
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

conn = pymysql.connect(host='localhost', user='root', password='123456', database='japanese_learning')
try:
    with conn.cursor() as cur:
        # Check current flyway history
        cur.execute("SELECT version, description, success FROM flyway_schema_history ORDER BY installed_rank ASC")
        rows = cur.fetchall()
        print("Current Flyway history:")
        for r in rows:
            print(f"  Version {r[0]}: {r[1]} (success={r[2]})")

        # Clean up any partial N4 reading contents before applying V9
        cur.execute('''
            DELETE ro FROM reading_options ro
            JOIN reading_questions rq ON ro.question_id = rq.id
            JOIN reading_contents rc ON rq.reading_id = rc.id
            JOIN lessons l ON rc.lesson_id = l.id
            JOIN levels lvl ON l.level_id = lvl.id
            WHERE lvl.code = 'N4'
        ''')
        cur.execute('''
            DELETE rq FROM reading_questions rq
            JOIN reading_contents rc ON rq.reading_id = rc.id
            JOIN lessons l ON rc.lesson_id = l.id
            JOIN levels lvl ON l.level_id = lvl.id
            WHERE lvl.code = 'N4'
        ''')
        cur.execute('''
            DELETE rc FROM reading_contents rc
            JOIN lessons l ON rc.lesson_id = l.id
            JOIN levels lvl ON l.level_id = lvl.id
            WHERE lvl.code = 'N4'
        ''')
        cur.execute("DELETE FROM flyway_schema_history WHERE version = '9'")
        conn.commit()
        print("Cleaned up previous N4 reading and flyway V9 record")

    # Read V9 sql
    v9_path = 'backend/src/main/resources/db/migration/V9__add_n4_reading.sql'
    with open(v9_path, encoding='utf-8') as f:
        sql_script = f.read()

    # Split by semicolon and execute
    statements = sql_script.split(';')
    executed = 0
    with conn.cursor() as cur:
        for stmt in statements:
            s = stmt.strip()
            if s:
                cur.execute(s)
                executed += 1

        cur.execute('''
            INSERT INTO flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success)
            VALUES (9, '9', 'add n4 reading', 'SQL', 'V9__add_n4_reading.sql', 2142542066, 'root', NOW(), 150, 1)
        ''')
        conn.commit()
        print(f"Executed {executed} statements from V9 SQL and registered in flyway_schema_history")

    # Verify counts in DB
    with conn.cursor() as cur:
        cur.execute('''
            SELECT COUNT(rc.id)
            FROM reading_contents rc
            JOIN lessons l ON rc.lesson_id = l.id
            JOIN levels lvl ON l.level_id = lvl.id
            WHERE lvl.code = 'N4'
        ''')
        rc_count = cur.fetchone()[0]

        cur.execute('''
            SELECT COUNT(rq.id)
            FROM reading_questions rq
            JOIN reading_contents rc ON rq.reading_id = rc.id
            JOIN lessons l ON rc.lesson_id = l.id
            JOIN levels lvl ON l.level_id = lvl.id
            WHERE lvl.code = 'N4'
        ''')
        rq_count = cur.fetchone()[0]

        cur.execute('''
            SELECT COUNT(ro.id)
            FROM reading_options ro
            JOIN reading_questions rq ON ro.question_id = rq.id
            JOIN reading_contents rc ON rq.reading_id = rc.id
            JOIN lessons l ON rc.lesson_id = l.id
            JOIN levels lvl ON l.level_id = lvl.id
            WHERE lvl.code = 'N4'
        ''')
        ro_count = cur.fetchone()[0]

        print(f"Database Verification:")
        print(f"  N4 Reading Contents: {rc_count} (Expected: 44)")
        print(f"  N4 Reading Questions: {rq_count} (Expected: 112)")
        print(f"  N4 Reading Options: {ro_count} (Expected: 328)")

finally:
    conn.close()
