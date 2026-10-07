import json
import os

def sql_escape(val):
    if val is None:
        return "NULL"
    # Double single quotes for SQL string literals
    escaped = val.replace("'", "''")
    return f"'{escaped}'"

def generate_sql():
    json_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "backend",
        "src",
        "main",
        "resources",
        "data",
        "n4-exercise.json"
    )
    with open(json_path, encoding="utf-8") as f:
        exercises = json.load(f)

    sql_lines = []
    sql_lines.append("-- V10__add_n4_exercise.sql")
    sql_lines.append("-- Thêm Bài tập N4 (29 bài tập thực hành tổng cộng 168 câu hỏi từ Bài 26 đến Bài 50 và các bài Ôn tập)")
    sql_lines.append("")
    sql_lines.append("-- 1. Đảm bảo Level N4 tồn tại")
    sql_lines.append("INSERT INTO levels (code, name, description, sort_order, is_active)")
    sql_lines.append("SELECT 'N4', 'N4', 'Trình độ N4 - Sơ trung cấp', 2, TRUE")
    sql_lines.append("WHERE NOT EXISTS (SELECT 1 FROM levels WHERE code = 'N4');")
    sql_lines.append("")
    sql_lines.append("-- 2. Đảm bảo 25 bài học N4 (Bài 26 đến Bài 50) tồn tại")
    for l in range(26, 51):
        sql_lines.append(
            f"INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) "
            f"SELECT l.id, {l}, 'Bài {l}', {l}, TRUE FROM levels l "
            f"WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = {l});"
        )
    sql_lines.append("")
    sql_lines.append("-- 3. Chèn dữ liệu Exercises, Questions, và QuestionOptions")

    for ex in exercises:
        sort_order = ex["sortOrder"]
        title = ex["title"]
        desc = ex.get("description") or f"Bài tập thực hành {title}"
        ex_type = ex.get("exerciseType") or "LESSON"
        content_type = ex.get("contentType") or "EXERCISE"
        lesson_num = ex["lessonNumber"]

        sql_lines.append(f"-- =========================================================")
        sql_lines.append(f"-- Exercise: {title} (SortOrder {sort_order}, Lesson {lesson_num})")
        sql_lines.append(f"-- =========================================================")
        sql_lines.append(
            f"INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) "
            f"SELECT ls.id, {sql_escape(title)}, {sql_escape(desc)}, '{ex_type}', '{content_type}', {sort_order} "
            f"FROM lessons ls JOIN levels lv ON ls.level_id = lv.id "
            f"WHERE lv.code = 'N4' AND ls.lesson_number = {lesson_num} "
            f"AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = {sort_order});"
        )

        for q in ex.get("questions", []):
            q_sort = q["sortOrder"]
            q_text = q["questionText"]
            q_type = q.get("questionType", "FILL_BLANK")
            explanation = q.get("explanation")

            sql_lines.append(
                f"INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) "
                f"SELECT ex.id, {sql_escape(q_text)}, '{q_type}', {sql_escape(explanation)}, {q_sort} "
                f"FROM exercises ex WHERE ex.sort_order = {sort_order} "
                f"AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = {q_sort});"
            )

            for opt in q.get("options", []):
                opt_sort = opt["sortOrder"]
                opt_text = opt["optionText"]
                is_correct = "TRUE" if opt.get("isCorrect") else "FALSE"
                sql_lines.append(
                    f"INSERT INTO question_options (question_id, option_text, is_correct, sort_order) "
                    f"SELECT q.id, {sql_escape(opt_text)}, {is_correct}, {opt_sort} "
                    f"FROM questions q JOIN exercises ex ON q.exercise_id = ex.id "
                    f"WHERE ex.sort_order = {sort_order} AND q.sort_order = {q_sort} "
                    f"AND NOT EXISTS (SELECT 1 FROM question_options qo WHERE qo.question_id = q.id AND qo.sort_order = {opt_sort});"
                )

    out_file = os.path.join(
        os.path.dirname(__file__),
        "..",
        "backend",
        "src",
        "main",
        "resources",
        "db",
        "migration",
        "V10__add_n4_exercise.sql"
    )
    with open(out_file, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines) + "\n")

    print(f"Generated {out_file} with {len(sql_lines)} lines.")

if __name__ == "__main__":
    generate_sql()
