-- V4__add_grammar_progress_flags.sql
-- Thêm các cờ theo dõi 3 giai đoạn học ngữ pháp vào bảng user_content_progress:
-- 1. pattern_opened (mở cấu trúc mẫu ngữ pháp)
-- 2. content_viewed (đọc giải thích / ý nghĩa)
-- 3. examples_viewed (xem các câu ví dụ)

ALTER TABLE user_content_progress
    ADD COLUMN pattern_opened BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN content_viewed BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN examples_viewed BOOLEAN NOT NULL DEFAULT FALSE;
