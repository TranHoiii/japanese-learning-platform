import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

JSON_PATH = os.path.join(os.path.dirname(__file__), '..', 'backend', 'src', 'main', 'resources', 'data', 'n4-vocabulary.json')
SQL_PATH = os.path.join(os.path.dirname(__file__), '..', 'backend', 'src', 'main', 'resources', 'db', 'migration', 'V5__add_n4_vocabulary.sql')

with open(JSON_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

def sql_str(val):
    if val is None:
        return "NULL"
    escaped = val.replace("'", "''")
    return f"'{escaped}'"

lines = []
lines.append("-- V5__add_n4_vocabulary.sql")
lines.append("-- Thêm Level N4, Lessons 26-50 và 1138 Từ vựng N4 từ nguồn Từ vựng N4.pdf")
lines.append("")
lines.append("-- 1. Tạo Level N4 nếu chưa tồn tại")
lines.append("INSERT INTO levels (code, name, description, sort_order, is_active)")
lines.append("SELECT 'N4', 'N4', 'Trình độ N4 - Sơ trung cấp', 2, TRUE")
lines.append("WHERE NOT EXISTS (SELECT 1 FROM levels WHERE code = 'N4');")
lines.append("")

lines.append("-- 2. Tạo 25 bài học N4 (Bài 26 đến Bài 50)")
for lesson in data['lessons']:
    num = lesson['lessonNumber']
    title = lesson['title']
    lines.append(
        f"INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) "
        f"SELECT l.id, {num}, '{title}', {num}, TRUE FROM levels l WHERE l.code = 'N4' "
        f"AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = {num});"
    )

lines.append("")
lines.append("-- 3. Chèn từ vựng N4 theo từng bài")
for lesson in data['lessons']:
    num = lesson['lessonNumber']
    vocabs = lesson['vocabularies']
    lines.append(f"-- Bài {num}: {len(vocabs)} từ vựng")
    for v in vocabs:
        h = sql_str(v['hiragana'])
        k = sql_str(v['kanji'])
        hv = sql_str(v['hanViet'])
        m = sql_str(v['meaning'])
        lines.append(
            f"INSERT INTO vocabularies (lesson_id, hiragana, kanji, han_viet, meaning) "
            f"SELECT ls.id, {h}, {k}, {hv}, {m} "
            f"FROM lessons ls JOIN levels lv ON ls.level_id = lv.id "
            f"WHERE lv.code = 'N4' AND ls.lesson_number = {num};"
        )
    lines.append("")

with open(SQL_PATH, 'w', encoding='utf-8') as f:
    f.write("\n".join(lines))

print(f"Generated V5 migration with {len(lines)} lines at {SQL_PATH}")
