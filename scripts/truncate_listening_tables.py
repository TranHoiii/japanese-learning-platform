import pymysql

conn = pymysql.connect(host='localhost', user='root', password='123456', database='japanese_learning')
cursor = conn.cursor()

cursor.execute("SET FOREIGN_KEY_CHECKS = 0")
cursor.execute("TRUNCATE TABLE listening_options")
cursor.execute("TRUNCATE TABLE listening_questions")
cursor.execute("TRUNCATE TABLE listening_contents")
cursor.execute("SET FOREIGN_KEY_CHECKS = 1")

conn.commit()
print("Successfully truncated listening tables in MySQL database!")
conn.close()
