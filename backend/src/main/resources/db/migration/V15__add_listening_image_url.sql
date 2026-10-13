-- V15__add_listening_image_url.sql
-- Thêm cột image_url cho bảng listening_questions và listening_options

ALTER TABLE listening_questions ADD COLUMN image_url VARCHAR(500) NULL AFTER explanation;
ALTER TABLE listening_options ADD COLUMN image_url VARCHAR(500) NULL AFTER content;

-- Cập nhật và tách URL ảnh khỏi chuỗi content cho các options đã có
UPDATE listening_options
SET image_url = TRIM(SUBSTRING(content, LOCATE(' - /listening/', content) + 3)),
    content = TRIM(SUBSTRING(content, 1, LOCATE(' - /listening/', content) - 1))
WHERE content LIKE '% - /listening/%';
