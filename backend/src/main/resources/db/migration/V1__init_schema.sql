CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_users_role CHECK (role IN ('USER', 'ADMIN'))
);

CREATE TABLE levels (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE lessons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    level_id BIGINT NOT NULL,
    lesson_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_lessons_level FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE,
    CONSTRAINT uq_lessons_level_number UNIQUE (level_id, lesson_number)
);

CREATE TABLE vocabularies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lesson_id BIGINT NOT NULL,
    hiragana VARCHAR(100) NOT NULL,
    kanji VARCHAR(100),
    han_viet VARCHAR(255),
    meaning TEXT NOT NULL,
    part_of_speech VARCHAR(100),
    audio_url VARCHAR(500),
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_vocabularies_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE grammars (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lesson_id BIGINT NOT NULL,
    pattern VARCHAR(255) NOT NULL,
    meaning TEXT,
    usage_text TEXT,
    explanation TEXT,
    notes TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_grammars_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE grammar_examples (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    grammar_id BIGINT NOT NULL,
    japanese TEXT NOT NULL,
    furigana TEXT,
    translation TEXT,
    explanation TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_grammar_examples_grammar FOREIGN KEY (grammar_id) REFERENCES grammars(id) ON DELETE CASCADE
);

CREATE TABLE kanjis (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    kanji VARCHAR(20) NOT NULL UNIQUE,
    han_viet VARCHAR(100),
    onyomi VARCHAR(255),
    kunyomi VARCHAR(255),
    meaning TEXT,
    stroke_count INT,
    stroke_order_url VARCHAR(500),
    mnemonic TEXT,
    mnemonic_image_url VARCHAR(500),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE lesson_kanjis (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lesson_id BIGINT NOT NULL,
    kanji_id BIGINT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_lesson_kanjis_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    CONSTRAINT fk_lesson_kanjis_kanji FOREIGN KEY (kanji_id) REFERENCES kanjis(id) ON DELETE CASCADE,
    CONSTRAINT uq_lesson_kanjis UNIQUE (lesson_id, kanji_id)
);

CREATE TABLE kanji_compounds (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    kanji_id BIGINT NOT NULL,
    word VARCHAR(100) NOT NULL,
    reading VARCHAR(255),
    meaning TEXT,
    example_sentence TEXT,
    CONSTRAINT fk_kanji_compounds_kanji FOREIGN KEY (kanji_id) REFERENCES kanjis(id) ON DELETE CASCADE
);

CREATE TABLE listening_contents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lesson_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    audio_url VARCHAR(500),
    transcript LONGTEXT,
    description TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_listening_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE listening_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    listening_id BIGINT NOT NULL,
    question TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    explanation TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_listening_questions_content FOREIGN KEY (listening_id) REFERENCES listening_contents(id) ON DELETE CASCADE
);

CREATE TABLE listening_options (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_listening_options_question FOREIGN KEY (question_id) REFERENCES listening_questions(id) ON DELETE CASCADE
);

CREATE TABLE reading_contents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lesson_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    translation LONGTEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_reading_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE reading_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reading_id BIGINT NOT NULL,
    question TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    explanation TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_reading_questions_content FOREIGN KEY (reading_id) REFERENCES reading_contents(id) ON DELETE CASCADE
);

CREATE TABLE reading_options (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_reading_options_question FOREIGN KEY (question_id) REFERENCES reading_questions(id) ON DELETE CASCADE
);

CREATE TABLE kaiwa_contents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lesson_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    audio_url VARCHAR(500),
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_kaiwa_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE kaiwa_lines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    kaiwa_id BIGINT NOT NULL,
    speaker VARCHAR(100),
    japanese TEXT NOT NULL,
    furigana TEXT,
    translation TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_kaiwa_lines_content FOREIGN KEY (kaiwa_id) REFERENCES kaiwa_contents(id) ON DELETE CASCADE
);

CREATE TABLE exercises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lesson_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    exercise_type VARCHAR(50) NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_exercises_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    exercise_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    explanation TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_questions_exercise FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

CREATE TABLE question_options (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_id BIGINT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_question_options_question FOREIGN KEY (question_id) REFERENCES question_options(id) ON DELETE CASCADE
);

CREATE TABLE tests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    level_id BIGINT NOT NULL,
    lesson_id BIGINT NULL,
    title VARCHAR(255) NOT NULL,
    test_type VARCHAR(50) NOT NULL,
    description TEXT,
    time_limit INT,
    passing_score INT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_tests_level FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE,
    CONSTRAINT fk_tests_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL
);

CREATE TABLE test_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    test_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_test_questions_test FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE,
    CONSTRAINT fk_test_questions_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    CONSTRAINT uq_test_question UNIQUE (test_id, question_id)
);

CREATE TABLE user_lesson_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    lesson_id BIGINT NOT NULL,
    progress_percent INT NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'NOT_STARTED',
    last_accessed_at DATETIME,
    completed_at DATETIME,
    CONSTRAINT fk_user_lesson_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_lesson_progress_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_lesson_progress UNIQUE (user_id, lesson_id),
    CONSTRAINT chk_user_lesson_progress_percent CHECK (progress_percent BETWEEN 0 AND 100)
);

CREATE TABLE user_content_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    content_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'NOT_STARTED',
    progress_percent INT NOT NULL DEFAULT 0,
    last_accessed_at DATETIME,
    completed_at DATETIME,
    CONSTRAINT fk_user_content_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_content_progress UNIQUE (user_id, content_type, content_id),
    CONSTRAINT chk_user_content_progress_percent CHECK (progress_percent BETWEEN 0 AND 100)
);

CREATE TABLE user_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    test_id BIGINT NULL,
    exercise_id BIGINT NULL,
    selected_option_id BIGINT NULL,
    answer_text TEXT,
    is_correct BOOLEAN NOT NULL,
    answered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_answers_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_answers_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_answers_test FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE SET NULL,
    CONSTRAINT fk_user_answers_exercise FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE SET NULL,
    CONSTRAINT fk_user_answers_option FOREIGN KEY (selected_option_id) REFERENCES question_options(id) ON DELETE SET NULL
);

CREATE TABLE review_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    content_id BIGINT NOT NULL,
    wrong_count INT NOT NULL DEFAULT 0,
    correct_count INT NOT NULL DEFAULT 0,
    priority INT NOT NULL DEFAULT 0,
    last_reviewed_at DATETIME,
    next_review_at DATETIME,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    CONSTRAINT fk_review_items_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uq_review_item UNIQUE (user_id, content_type, content_id)
);

CREATE TABLE favorites (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    content_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uq_favorite UNIQUE (user_id, content_type, content_id)
);

CREATE TABLE handbook_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE handbook_articles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_handbook_articles_category FOREIGN KEY (category_id) REFERENCES handbook_categories(id) ON DELETE CASCADE
);

CREATE TABLE media_files (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    mime_type VARCHAR(100),
    file_size BIGINT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_lessons_level_id ON lessons(level_id);
CREATE INDEX idx_vocabularies_lesson_id ON vocabularies(lesson_id);
CREATE INDEX idx_grammars_lesson_id ON grammars(lesson_id);
CREATE INDEX idx_lesson_kanjis_lesson_id ON lesson_kanjis(lesson_id);
CREATE INDEX idx_lesson_kanjis_kanji_id ON lesson_kanjis(kanji_id);
CREATE INDEX idx_listening_contents_lesson_id ON listening_contents(lesson_id);
CREATE INDEX idx_reading_contents_lesson_id ON reading_contents(lesson_id);
CREATE INDEX idx_kaiwa_contents_lesson_id ON kaiwa_contents(lesson_id);
CREATE INDEX idx_exercises_lesson_id ON exercises(lesson_id);
CREATE INDEX idx_questions_exercise_id ON questions(exercise_id);
CREATE INDEX idx_tests_level_id ON tests(level_id);
CREATE INDEX idx_tests_lesson_id ON tests(lesson_id);
CREATE INDEX idx_user_lesson_progress_user_id ON user_lesson_progress(user_id);
CREATE INDEX idx_user_content_progress_user_id ON user_content_progress(user_id);
CREATE INDEX idx_user_answers_user_id ON user_answers(user_id);
CREATE INDEX idx_review_items_user_id ON review_items(user_id);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
