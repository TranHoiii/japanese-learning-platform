package com.japanese.learning.exercise.config;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.exercise.entity.Exercise;
import com.japanese.learning.exercise.entity.Question;
import com.japanese.learning.exercise.entity.QuestionOption;
import com.japanese.learning.exercise.enums.ContentType;
import com.japanese.learning.exercise.enums.ExerciseType;
import com.japanese.learning.exercise.enums.QuestionType;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@Order(7)
@RequiredArgsConstructor
public class N4ExerciseDataSeeder implements CommandLineRunner {

    private final LevelRepository levelRepository;
    private final LessonRepository lessonRepository;
    private final ExerciseRepository exerciseRepository;
    private final ObjectMapper objectMapper;

    @JsonIgnoreProperties(ignoreUnknown = true)
    record ExerciseSeedPayload(
            Integer sortOrder,
            String title,
            ExerciseType exerciseType,
            ContentType contentType,
            Integer lessonNumber,
            String description,
            List<QuestionSeedPayload> questions
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    record QuestionSeedPayload(
            String questionText,
            QuestionType questionType,
            String explanation,
            Integer sortOrder,
            List<OptionSeedPayload> options
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    record OptionSeedPayload(
            String optionText,
            Boolean isCorrect,
            Integer sortOrder
    ) {}

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n4-exercise.json");
        if (!resource.exists()) {
            log.warn("File seed data/n4-exercise.json không tồn tại. Bỏ qua seed data Exercise N4.");
            return;
        }

        log.info("Bắt đầu kiểm tra và seed dữ liệu Exercise N4...");

        List<ExerciseSeedPayload> payloadList;
        try (InputStream inputStream = resource.getInputStream()) {
            payloadList = objectMapper.readValue(inputStream, new TypeReference<List<ExerciseSeedPayload>>() {});
        }

        if (payloadList == null || payloadList.isEmpty()) {
            log.warn("Dữ liệu N4 Exercise rỗng hoặc không đúng định dạng.");
            return;
        }

        Level level = levelRepository.findByCode("N4")
                .orElseGet(() -> {
                    Level newLevel = new Level();
                    newLevel.setCode("N4");
                    newLevel.setName("N4");
                    newLevel.setDescription("Trình độ N4 - Sơ trung cấp");
                    newLevel.setSortOrder(2);
                    newLevel.setActive(true);
                    return levelRepository.save(newLevel);
                });

        int exercisesInserted = 0;
        int exercisesSkipped = 0;

        for (ExerciseSeedPayload exDto : payloadList) {
            if (exerciseRepository.findBySortOrder(exDto.sortOrder()).isPresent()) {
                exercisesSkipped++;
                continue;
            }

            Lesson lesson = lessonRepository.findByLevelIdAndLessonNumber(level.getId(), exDto.lessonNumber())
                    .orElseGet(() -> {
                        Lesson newLesson = new Lesson();
                        newLesson.setLevel(level);
                        newLesson.setLessonNumber(exDto.lessonNumber());
                        newLesson.setTitle("Bài " + exDto.lessonNumber());
                        newLesson.setSortOrder(exDto.lessonNumber());
                        newLesson.setActive(true);
                        return lessonRepository.save(newLesson);
                    });

            Exercise exercise = new Exercise();
            exercise.setLesson(lesson);
            exercise.setTitle(exDto.title());
            exercise.setDescription(exDto.description());
            exercise.setExerciseType(exDto.exerciseType() != null ? exDto.exerciseType() : ExerciseType.LESSON);
            exercise.setContentType(exDto.contentType() != null ? exDto.contentType() : ContentType.EXERCISE);
            exercise.setSortOrder(exDto.sortOrder());

            List<Question> questions = new ArrayList<>();
            if (exDto.questions() != null) {
                for (QuestionSeedPayload qDto : exDto.questions()) {
                    Question question = new Question();
                    question.setExercise(exercise);
                    question.setQuestionText(qDto.questionText());
                    question.setQuestionType(qDto.questionType() != null ? qDto.questionType() : QuestionType.FILL_BLANK);
                    question.setExplanation(qDto.explanation());
                    question.setSortOrder(qDto.sortOrder());

                    List<QuestionOption> options = new ArrayList<>();
                    if (qDto.options() != null) {
                        for (OptionSeedPayload oDto : qDto.options()) {
                            QuestionOption option = new QuestionOption();
                            option.setQuestion(question);
                            option.setOptionText(oDto.optionText());
                            option.setCorrect(oDto.isCorrect() != null ? oDto.isCorrect() : false);
                            option.setSortOrder(oDto.sortOrder());
                            options.add(option);
                        }
                    }
                    question.setOptions(options);
                    questions.add(question);
                }
            }
            exercise.setQuestions(questions);

            exerciseRepository.save(exercise);
            exercisesInserted++;
        }

        log.info("Hoàn tất seed dữ liệu Exercise N4: {} bài tập được thêm mới, {} bài tập đã tồn tại (bỏ qua).",
                exercisesInserted, exercisesSkipped);
    }
}
