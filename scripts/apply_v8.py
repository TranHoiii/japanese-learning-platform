import pymysql

conn = pymysql.connect(host='localhost', user='root', password='123456', database='japanese_learning')
with conn.cursor() as cur:
    # Remove N4 listening contents so V8 cleanly inserts all 104 items
    cur.execute('''
        DELETE lo FROM listening_options lo
        JOIN listening_questions lq ON lo.question_id = lq.id
        JOIN listening_contents lc ON lq.listening_id = lc.id
        JOIN lessons l ON lc.lesson_id = l.id
        JOIN levels lvl ON l.level_id = lvl.id
        WHERE lvl.code = 'N4'
    ''')
    cur.execute('''
        DELETE lq FROM listening_questions lq
        JOIN listening_contents lc ON lq.listening_id = lc.id
        JOIN lessons l ON lc.lesson_id = l.id
        JOIN levels lvl ON l.level_id = lvl.id
        WHERE lvl.code = 'N4'
    ''')
    cur.execute('''
        DELETE lc FROM listening_contents lc
        JOIN lessons l ON lc.lesson_id = l.id
        JOIN levels lvl ON l.level_id = lvl.id
        WHERE lvl.code = 'N4'
    ''')
    # Remove V8 from flyway history
    cur.execute("DELETE FROM flyway_schema_history WHERE version = '8'")
    conn.commit()
    print('Cleaned up previous N4 listening and flyway V8 record')

# Read V8 sql
with open('backend/src/main/resources/db/migration/V8__add_n4_listening.sql', encoding='utf-8') as f:
    sql_script = f.read()

# Execute statements
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
        VALUES (8, '8', 'add n4 listening', 'SQL', 'V8__add_n4_listening.sql', 0, 'root', NOW(), 100, 1)
    ''')
    conn.commit()
    print(f'Executed {executed} statements from V8 SQL and updated flyway history')
conn.close()
