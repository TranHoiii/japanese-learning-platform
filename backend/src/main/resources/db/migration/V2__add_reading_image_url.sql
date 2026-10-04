ALTER TABLE reading_contents ADD COLUMN image_url VARCHAR(500) NULL AFTER translation;
ALTER TABLE reading_questions ADD COLUMN image_url VARCHAR(500) NULL AFTER explanation;
