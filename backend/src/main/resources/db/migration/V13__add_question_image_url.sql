-- V13__add_question_image_url.sql
-- Thêm cột image_url cho bảng questions, tách riêng Bài 1 và Bài 2 N5, và cập nhật đường dẫn ảnh minh họa

-- 1. Thêm cột image_url vào bảng questions
ALTER TABLE questions ADD COLUMN image_url VARCHAR(500) NULL AFTER explanation;

-- 2. Tách riêng bài tập cho Bài 2 (N5)
-- Tạo bài tập riêng cho Bài 2 nếu chưa có
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order)
SELECT l.id,
       'Bài 02',
       'Bài tập Minna no Nihongo N5 - Bài 2: Đồ vật, đại từ chỉ định これ, それ, あれ, この, その, あの, sở hữu の',
       'LESSON',
       'EXERCISE',
       2
FROM lessons l
JOIN levels lv ON l.level_id = lv.id
WHERE lv.code = 'N5' AND l.lesson_number = 2
  AND NOT EXISTS (
      SELECT 1 FROM exercises e
      JOIN lessons ls ON e.lesson_id = ls.id
      JOIN levels lev ON ls.level_id = lev.id
      WHERE lev.code = 'N5' AND ls.lesson_number = 2
  );

-- Đổi tên bài tập Bài 1 thành 'Bài 01'
UPDATE exercises e
JOIN lessons ls ON e.lesson_id = ls.id
JOIN levels lv ON ls.level_id = lv.id
SET e.title = 'Bài 01',
    e.description = 'Bài tập Minna no Nihongo N5 - Bài 1: Danh từ 1 は Danh từ 2 です/じゃありません/ですか, trợ từ も, の, hỏi tuổi và giới thiệu bản thân'
WHERE lv.code = 'N5' AND ls.lesson_number = 1 AND e.sort_order = 1;

-- Chuyển các câu hỏi thuộc Bài 2 sang Bài 2:
-- ID 6: Nhìn hình viết từ đồ vật (Bài 2, sortOrder 1)
-- ID 8: Nhìn hình điền từ chỉ định (Bài 2, sortOrder 2)
-- ID 10: Nối câu hỏi với câu trả lời (Bài 2, sortOrder 3)
-- ID 11: Chọn từ trong ngoặc (Bài 2, sortOrder 4)
UPDATE questions q
SET q.exercise_id = (
    SELECT e.id FROM exercises e
    JOIN lessons ls ON e.lesson_id = ls.id
    JOIN levels lv ON ls.level_id = lv.id
    WHERE lv.code = 'N5' AND ls.lesson_number = 2
    LIMIT 1
),
q.sort_order = CASE q.id
    WHEN 6 THEN 1
    WHEN 8 THEN 2
    WHEN 10 THEN 3
    WHEN 11 THEN 4
END,
q.image_url = CASE q.id
    WHEN 6 THEN '/media/exercise/exercise_n5_l01_q01.png'
    WHEN 8 THEN '/media/exercise/exercise_n5_l01_q03.png'
    ELSE NULL
END
WHERE q.id IN (6, 8, 10, 11);

-- Chuẩn hóa thứ tự sort_order các câu hỏi thuộc Bài 1 (ID 7, 9, 12, 13)
UPDATE questions q
SET q.sort_order = CASE q.id
    WHEN 7 THEN 1
    WHEN 9 THEN 2
    WHEN 12 THEN 3
    WHEN 13 THEN 4
END
WHERE q.id IN (7, 9, 12, 13);

-- Cập nhật image_url cho các câu hỏi có hình minh họa trong N5
-- Lesson 3 Q1 (ID 14)
UPDATE questions SET image_url = '/media/exercise/exercise_n5_l03_q01.png' WHERE id = 14;
-- Lesson 4 Q2 (ID 21)
UPDATE questions SET image_url = '/media/exercise/exercise_n5_l04_q02.png' WHERE id = 21;
-- Lesson 4 Q4 (ID 23)
UPDATE questions SET image_url = '/media/exercise/exercise_n5_l04_q04.png' WHERE id = 23;
-- Lesson 6 Q4 (ID 37)
UPDATE questions SET image_url = '/media/exercise/exercise_n5_l06_q04.png' WHERE id = 37;
-- Lesson 10 Q3 (ID 70)
UPDATE questions SET image_url = '/media/exercise/exercise_n5_l10_q03.png' WHERE id = 70;
-- Lesson 13 Q2 (ID 88)
UPDATE questions SET image_url = '/media/exercise/exercise_n5_l13_q02.png' WHERE id = 88;
-- Lesson 13 Q3 (ID 89)
UPDATE questions SET image_url = '/media/exercise/exercise_n5_l13_q03.png' WHERE id = 89;
-- Lesson 14 Q4 (ID 98)
UPDATE questions SET image_url = '/media/exercise/exercise_n5_l14_q04.png' WHERE id = 98;
-- Lesson 22 Q1 (ID 155)
UPDATE questions SET image_url = '/media/exercise/exercise_n5_l22_q01.png' WHERE id = 155;
-- Lesson 22 Q4 (ID 158)
UPDATE questions SET image_url = '/media/exercise/exercise_n5_l22_q04.png' WHERE id = 158;
-- Lesson 23 Q5 (ID 165)
UPDATE questions SET image_url = '/media/exercise/exercise_n5_l23_q05.png' WHERE id = 165;
-- Lesson 24 Q2 (ID 169)
UPDATE questions SET image_url = '/media/exercise/exercise_n5_l24_q02.png' WHERE id = 169;

-- Cập nhật image_url và xóa nhãn [IMAGE_REQUIRED] cho câu hỏi N4 Lesson 30 Q2 (ID 933)
UPDATE questions
SET image_url = '/media/exercise/exercise_n4_l30_q02.png',
    question_text = REPLACE(question_text, '[IMAGE_REQUIRED] ', '')
WHERE id = 933;
