ALTER TABLE question_options DROP FOREIGN KEY fk_question_options_question;
ALTER TABLE question_options ADD CONSTRAINT fk_question_options_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;
