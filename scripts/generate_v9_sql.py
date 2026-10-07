import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

def escape_sql(s):
    if s is None:
        return "NULL"
    return "'" + str(s).replace("'", "''") + "'"

def main():
    json_path = os.path.join("backend", "src", "main", "resources", "data", "n4-reading.json")
    with open(json_path, "r", encoding="utf-8") as f:
        lessons = json.load(f)

    sql_lines = []
    sql_lines.append("-- V9__add_n4_reading.sql")
    sql_lines.append("-- Thêm Reading N4 cho 25 bài học (Bài 26 đến Bài 50) từ giáo trình Đọc hiểu N4 (初級で読めるトピック25)")
    sql_lines.append("")
    sql_lines.append("-- 1. Đảm bảo Level N4 tồn tại")
    sql_lines.append("INSERT INTO levels (code, name, description, sort_order, is_active)")
    sql_lines.append("SELECT 'N4', 'N4', 'Trình độ N4 - Sơ trung cấp', 2, TRUE")
    sql_lines.append("WHERE NOT EXISTS (SELECT 1 FROM levels WHERE code = 'N4');")
    sql_lines.append("")
    sql_lines.append("-- 2. Đảm bảo 25 bài học N4 (Bài 26 đến Bài 50) tồn tại")
    for l in range(26, 51):
        sql_lines.append(f"INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, {l}, 'Bài {l}', {l}, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = {l});")
    sql_lines.append("")
    sql_lines.append("-- 3. Chèn dữ liệu Reading Contents, Questions, và Options")

    for l_data in lessons:
        l_num = l_data["lessonNumber"]
        sql_lines.append(f"-- =========================================================")
        sql_lines.append(f"-- BÀI {l_num} ({len(l_data['items'])} bài đọc)")
        sql_lines.append(f"-- =========================================================")

        for item in l_data["items"]:
            title_esc = escape_sql(item["title"])
            content_esc = escape_sql(item["content"])
            trans_esc = escape_sql(item.get("translation"))
            img_esc = escape_sql(item.get("imageUrl"))
            sort_order = item["sortOrder"]

            sql_lines.append(f"-- Reading Content: {item['title']}")
            sql_lines.append(
                f"INSERT INTO reading_contents (lesson_id, title, content, translation, image_url, sort_order) "
                f"SELECT ls.id, {title_esc}, {content_esc}, {trans_esc}, {img_esc}, {sort_order} "
                f"FROM lessons ls JOIN levels lv ON ls.level_id = lv.id "
                f"WHERE lv.code = 'N4' AND ls.lesson_number = {l_num} "
                f"AND NOT EXISTS (SELECT 1 FROM reading_contents WHERE lesson_id = ls.id AND title = {title_esc});"
            )

            for q in item.get("questions", []):
                q_text_esc = escape_sql(q["question"])
                q_type_esc = escape_sql(q.get("questionType", "MULTIPLE_CHOICE"))
                q_exp_esc = escape_sql(q.get("explanation"))
                q_img_esc = escape_sql(q.get("imageUrl"))
                q_sort = q["sortOrder"]

                sql_lines.append(
                    f"INSERT INTO reading_questions (reading_id, question, question_type, explanation, image_url, sort_order) "
                    f"SELECT rc.id, {q_text_esc}, {q_type_esc}, {q_exp_esc}, {q_img_esc}, {q_sort} "
                    f"FROM reading_contents rc "
                    f"JOIN lessons ls ON rc.lesson_id = ls.id "
                    f"JOIN levels lv ON ls.level_id = lv.id "
                    f"WHERE lv.code = 'N4' AND ls.lesson_number = {l_num} AND rc.title = {title_esc} "
                    f"AND NOT EXISTS (SELECT 1 FROM reading_questions rq WHERE rq.reading_id = rc.id AND rq.sort_order = {q_sort});"
                )

                for opt in q.get("options", []):
                    opt_content_esc = escape_sql(opt["content"])
                    opt_correct = "TRUE" if opt["correct"] else "FALSE"
                    opt_sort = opt["sortOrder"]

                    sql_lines.append(
                        f"INSERT INTO reading_options (question_id, content, is_correct, sort_order) "
                        f"SELECT rq.id, {opt_content_esc}, {opt_correct}, {opt_sort} "
                        f"FROM reading_questions rq "
                        f"JOIN reading_contents rc ON rq.reading_id = rc.id "
                        f"JOIN lessons ls ON rc.lesson_id = ls.id "
                        f"JOIN levels lv ON ls.level_id = lv.id "
                        f"WHERE lv.code = 'N4' AND ls.lesson_number = {l_num} AND rc.title = {title_esc} AND rq.sort_order = {q_sort} "
                        f"AND NOT EXISTS (SELECT 1 FROM reading_options ro WHERE ro.question_id = rq.id AND ro.sort_order = {opt_sort});"
                    )

    sql_out_path = os.path.join("backend", "src", "main", "resources", "db", "migration", "V9__add_n4_reading.sql")
    with open(sql_out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines) + "\n")

    print(f"Generated {len(sql_lines)} lines in {sql_out_path}")

if __name__ == "__main__":
    main()
