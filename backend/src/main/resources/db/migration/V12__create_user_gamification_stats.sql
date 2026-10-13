-- V12__create_user_gamification_stats.sql
-- Tạo bảng lưu trữ chỉ số Gamification, XP, chuỗi ngày và huy hiệu

CREATE TABLE IF NOT EXISTS user_gamification_stats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    total_xp INT NOT NULL DEFAULT 0,
    streak INT NOT NULL DEFAULT 0,
    best_streak INT NOT NULL DEFAULT 0,
    daily_goal INT NOT NULL DEFAULT 50,
    last_active_date DATE NULL,
    unlocked_badges TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_gamification_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_gamification_user_id (user_id),
    INDEX idx_gamification_total_xp (total_xp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
