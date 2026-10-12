package com.japanese.learning.reading.config;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.exercise.enums.QuestionType;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import com.japanese.learning.reading.entity.ReadingContent;
import com.japanese.learning.reading.entity.ReadingOption;
import com.japanese.learning.reading.entity.ReadingQuestion;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.List;

@Slf4j
@Component
@Order(5)
@RequiredArgsConstructor
public class N4ReadingDataSeeder implements CommandLineRunner {

    private final LevelRepository levelRepository;
    private final LessonRepository lessonRepository;
    private final ReadingContentRepository readingContentRepository;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n4-reading.json");
        if (!resource.exists()) {
            log.warn("File seed data/n4-reading.json không tồn tại. Bỏ qua seed data Reading N4.");
            return;
        }

        log.info("Bắt đầu kiểm tra và seed dữ liệu Reading N4...");

        List<LessonReadingGroup> groups;
        try (InputStream inputStream = resource.getInputStream()) {
            groups = objectMapper.readValue(inputStream, new TypeReference<List<LessonReadingGroup>>() {});
        }

        if (groups == null || groups.isEmpty()) {
            log.warn("Dữ liệu N4 Reading rỗng hoặc không đúng định dạng.");
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

        int contentsInserted = 0;
        int contentsSkipped = 0;

        for (LessonReadingGroup group : groups) {
            Lesson lesson = lessonRepository.findByLevelIdAndLessonNumber(level.getId(), group.lessonNumber())
                    .orElseGet(() -> {
                        Lesson newL = new Lesson();
                        newL.setLevel(level);
                        newL.setLessonNumber(group.lessonNumber());
                        newL.setTitle("Bài " + group.lessonNumber());
                        newL.setSortOrder(group.lessonNumber());
                        newL.setActive(true);
                        return lessonRepository.save(newL);
                    });

            for (ReadingItemPayload payload : group.items()) {
                boolean exists = readingContentRepository.existsByLessonIdAndTitle(lesson.getId(), payload.title());
                if (exists) {
                    contentsSkipped++;
                    continue;
                }

                ReadingContent content = new ReadingContent();
                content.setLesson(lesson);
                content.setTitle(payload.title() != null ? payload.title() : "Bài đọc");
                content.setContent(payload.content() != null ? payload.content() : "");
                content.setTranslation(payload.translation());
                content.setImageUrl(payload.imageUrl());
                content.setSortOrder(payload.sortOrder() != null ? payload.sortOrder() : 1);

                if (payload.questions() != null) {
                    for (QuestionPayload qPayload : payload.questions()) {
                        ReadingQuestion question = new ReadingQuestion();
                        question.setReading(content);
                        question.setQuestion(qPayload.question() != null ? qPayload.question() : "");
                        QuestionType qType = QuestionType.MULTIPLE_CHOICE;
                        try {
                            if (qPayload.questionType() != null) {
                                qType = QuestionType.valueOf(qPayload.questionType());
                            }
                        } catch (IllegalArgumentException e) {
                            qType = QuestionType.MULTIPLE_CHOICE;
                        }
                        question.setQuestionType(qType);
                        question.setExplanation(qPayload.explanation());
                        question.setImageUrl(qPayload.imageUrl());
                        question.setSortOrder(qPayload.sortOrder() != null ? qPayload.sortOrder() : 1);

                        if (qPayload.options() != null) {
                            for (OptionPayload oPayload : qPayload.options()) {
                                ReadingOption option = new ReadingOption();
                                option.setQuestion(question);
                                option.setContent(oPayload.content() != null ? oPayload.content() : "");
                                option.setCorrect(oPayload.correct() != null ? oPayload.correct() : false);
                                option.setSortOrder(oPayload.sortOrder() != null ? oPayload.sortOrder() : 1);

                                question.getOptions().add(option);
                            }
                        }
                        content.getQuestions().add(question);
                    }
                }

                readingContentRepository.save(content);
                contentsInserted++;
            }
        }

        log.info("Hoàn tất seed dữ liệu Reading N4: đã thêm {} bài đọc mới, bỏ qua {} bài đọc đã tồn tại.", contentsInserted, contentsSkipped);
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record LessonReadingGroup(
            Integer lessonNumber,
            List<ReadingItemPayload> items
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record ReadingItemPayload(
            String title,
            String content,
            String translation,
            String imageUrl,
            Integer sortOrder,
            List<QuestionPayload> questions
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record QuestionPayload(
            String question,
            String questionType,
            String explanation,
            String imageUrl,
            Integer sortOrder,
            List<OptionPayload> options
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record OptionPayload(
            String content,
            Boolean correct,
            Integer sortOrder
    ) {}
}
