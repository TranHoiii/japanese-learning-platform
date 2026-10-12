-- V11__add_kanji_number.sql
-- Thêm cột kanji_number cho bảng kanjis nếu chưa có
SET @dbname = DATABASE();
SET @tablename = "kanjis";
SET @columnname = "kanji_number";
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (TABLE_SCHEMA = @dbname)
      AND (TABLE_NAME = @tablename)
      AND (COLUMN_NAME = @columnname)
  ) > 0,
  "SELECT 1",
  "ALTER TABLE kanjis ADD COLUMN kanji_number INT NULL AFTER mnemonic_image_url"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;
