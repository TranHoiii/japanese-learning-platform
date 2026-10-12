import os
import json
import pymysql

print("=== N5 & N4 EXERCISE AUDIT REPORT ===")

# 1. Audit Images
print("\n1. Verifying 14 N5 Exercise Illustrations:")
backend_media = r"d:\japanese-learning-platform\backend\src\main\resources\static\media\exercise"
frontend_media = r"d:\japanese-learning-platform\frontend\public\media\exercise"

images = [
    "exercise_n5_l01_q01.png",
    "exercise_n5_l01_q03.png",
    "exercise_n5_l03_q01.png",
    "exercise_n5_l04_q02.png",
    "exercise_n5_l04_q04.png",
    "exercise_n5_l06_q04.png",
    "exercise_n5_l10_q03.png",
    "exercise_n5_l13_q02.png",
    "exercise_n5_l13_q03.png",
    "exercise_n5_l14_q04.png",
    "exercise_n5_l22_q01.png",
    "exercise_n5_l22_q04.png",
    "exercise_n5_l23_q05.png",
    "exercise_n5_l24_q02.png",
    "exercise_n4_l30_q02.png"
]

all_images_ok = True
for img in images:
    b_ok = os.path.isfile(os.path.join(backend_media, img))
    f_ok = os.path.isfile(os.path.join(frontend_media, img))
    if not (b_ok and f_ok):
        all_images_ok = False
        print(f"  [FAIL] {img}: backend={b_ok}, frontend={f_ok}")
    else:
        size_kb = os.path.getsize(os.path.join(frontend_media, img)) / 1024
        print(f"  [PASS] {img} ({size_kb:.1f} KB)")

if all_images_ok:
    print("=> All 14 N5 + 1 N4 illustrations exist in both folders!")

# 2. Audit JSON Files
print("\n2. Verifying JSON Data Files:")
with open('backend/src/main/resources/data/n5-exercise.json', 'r', encoding='utf-8') as f:
    n5_json = json.load(f)
with open('backend/src/main/resources/data/n4-exercise.json', 'r', encoding='utf-8') as f:
    n4_json = json.load(f)

print(f"  N5 JSON count: {len(n5_json)} (expected 28)")
print(f"  N5 sortOrder range: {n5_json[0]['sortOrder']} -> {n5_json[-1]['sortOrder']}")
print(f"  N4 JSON count: {len(n4_json)} (expected 29)")
print(f"  N4 sortOrder range: {n4_json[0]['sortOrder']} -> {n4_json[-1]['sortOrder']}")

# Check IMAGE_REQUIRED in JSON
n5_img_tags = sum(1 for ex in n5_json for q in ex.get('questions', []) if 'IMAGE_REQUIRED' in q['questionText'])
print(f"  IMAGE_REQUIRED tags in n5-exercise.json: {n5_img_tags} (expected 0)")

# 3. Audit Database
print("\n3. Verifying MySQL Database:")
conn = pymysql.connect(
    host='localhost',
    user='root',
    password='123456',
    database='japanese_learning',
    charset='utf8mb4'
)
cursor = conn.cursor()

cursor.execute("SELECT COUNT(*), MIN(sort_order), MAX(sort_order) FROM exercises WHERE lesson_id <= 25")
n5_db_cnt, n5_min_so, n5_max_so = cursor.fetchone()
print(f"  N5 in DB: count={n5_db_cnt} (exp 28), sortOrder={n5_min_so}..{n5_max_so}")

cursor.execute("SELECT COUNT(*), MIN(sort_order), MAX(sort_order) FROM exercises WHERE lesson_id >= 26")
n4_db_cnt, n4_min_so, n4_max_so = cursor.fetchone()
print(f"  N4 in DB: count={n4_db_cnt} (exp 29), sortOrder={n4_min_so}..{n4_max_so}")

cursor.execute("""
    SELECT COUNT(*) FROM questions q
    JOIN exercises e ON q.exercise_id = e.id
    WHERE e.lesson_id <= 25 AND q.question_text LIKE '%IMAGE_REQUIRED%'
""")
db_img_tags = cursor.fetchone()[0]
print(f"  IMAGE_REQUIRED tags in N5 DB questions: {db_img_tags} (expected 0)")

# Check Exercise 28 details
cursor.execute("SELECT id, title, exercise_type, content_type FROM exercises WHERE sort_order = 28 AND lesson_id <= 25")
ex28_row = cursor.fetchone()
if ex28_row:
    cursor.execute("SELECT COUNT(*) FROM questions WHERE exercise_id = %s", (ex28_row[0],))
    q_cnt = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM question_options qo JOIN questions q ON qo.question_id = q.id WHERE q.exercise_id = %s", (ex28_row[0],))
    opt_cnt = cursor.fetchone()[0]
    print(f"  Exercise 28 (ID={ex28_row[0]}): type={ex28_row[2]}, questions={q_cnt} (exp 7), options={opt_cnt}")

cursor.close()
conn.close()

print("\n=== AUDIT COMPLETED SUCCESSFULLY ===")
