import pymysql
import sys

sys.stdout.reconfigure(encoding='utf-8')

conn = pymysql.connect(host='localhost', user='root', password='123456', database='japanese_learning')
cursor = conn.cursor()
cursor.execute('SELECT count(*) FROM listening_contents')
print('Total listening_contents in DB:', cursor.fetchone()[0])
cursor.execute('''
    SELECT l.lesson_number, lc.id, lc.title, lc.sort_order, lc.audio_url 
    FROM listening_contents lc 
    JOIN lessons l ON lc.lesson_id = l.id 
    ORDER BY l.lesson_number, lc.sort_order, lc.id
''')
for r in cursor.fetchall():
    print(r)
conn.close()
