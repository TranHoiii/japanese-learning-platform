import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

def escape_sql(s):
    if s is None:
        return "NULL"
    return "'" + str(s).replace("'", "''") + "'"

def main():
    json_path = os.path.join("backend", "src", "main", "resources", "data", "n4-listening.json")
    with open(json_path, "r", encoding="utf-8") as f:
        lessons = json.load(f)

    sql_lines = []
    sql_lines.append("-- V8__add_n4_listening.sql")
    sql_lines.append("-- Thêm Listening N4 cho 25 bài học (Bài 26 đến Bài 50) từ nguồn Nghe N4.pdf và Choukai N4 CD A, B, C")
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
    sql_lines.append("-- 3. Chèn dữ liệu Listening Contents, Questions, và Options")

    for l_data in lessons:
        l_num = l_data["lessonNumber"]
        sql_lines.append(f"-- =========================================================")
        sql_lines.append(f"-- BÀI {l_num} ({len(l_data['items'])} bài nghe)")
        sql_lines.append(f"-- =========================================================")

        for item in l_data["items"]:
            title_esc = escape_sql(item["title"])
            audio_esc = escape_sql(item["audioUrl"])
            transcript_esc = escape_sql(item.get("transcript"))
            desc_esc = escape_sql(item.get("description"))
            sort_order = item["sortOrder"]

            sql_lines.append(f"-- Listening Content: {item['title']}")
            sql_lines.append(
                f"INSERT INTO listening_contents (lesson_id, title, audio_url, transcript, description, sort_order) "
                f"SELECT ls.id, {title_esc}, {audio_esc}, {transcript_esc}, {desc_esc}, {sort_order} "
                f"FROM lessons ls JOIN levels lv ON ls.level_id = lv.id "
                f"WHERE lv.code = 'N4' AND ls.lesson_number = {l_num} "
                f"AND NOT EXISTS (SELECT 1 FROM listening_contents WHERE audio_url = {audio_esc});"
            )

            for q in item["questions"]:
                q_text_esc = escape_sql(q["question"])
                q_type_esc = escape_sql(q["questionType"])
                q_exp_esc = escape_sql(q.get("explanation"))
                q_sort = q["sortOrder"]

                sql_lines.append(
                    f"INSERT INTO listening_questions (listening_id, question, question_type, explanation, sort_order) "
                    f"SELECT lc.id, {q_text_esc}, {q_type_esc}, {q_exp_esc}, {q_sort} "
                    f"FROM listening_contents lc "
                    f"WHERE lc.audio_url = {audio_esc} "
                    f"AND NOT EXISTS (SELECT 1 FROM listening_questions lq WHERE lq.listening_id = lc.id AND lq.sort_order = {q_sort});"
                )

                for opt in q["options"]:
                    opt_content_esc = escape_sql(opt["content"])
                    opt_correct = "TRUE" if opt["correct"] else "FALSE"
                    opt_sort = opt["sortOrder"]

                    sql_lines.append(
                        f"INSERT INTO listening_options (question_id, content, is_correct, sort_order) "
                        f"SELECT lq.id, {opt_content_esc}, {opt_correct}, {opt_sort} "
                        f"FROM listening_questions lq "
                        f"JOIN listening_contents lc ON lq.listening_id = lc.id "
                        f"WHERE lc.audio_url = {audio_esc} AND lq.sort_order = {q_sort} "
                        f"AND NOT EXISTS (SELECT 1 FROM listening_options lo WHERE lo.question_id = lq.id AND lo.sort_order = {opt_sort});"
                    )

    sql_out_path = os.path.join("backend", "src", "main", "resources", "db", "migration", "V8__add_n4_listening.sql")
    with open(sql_out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines) + "\n")

    print(f"Generated {len(sql_lines)} lines in {sql_out_path}")

if __name__ == "__main__":
    main()
