package com.japanese.learning.listening.config;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.exercise.enums.QuestionType;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import com.japanese.learning.listening.entity.ListeningContent;
import com.japanese.learning.listening.entity.ListeningOption;
import com.japanese.learning.listening.entity.ListeningQuestion;
import com.japanese.learning.listening.repository.ListeningContentRepository;
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
public class N4ListeningDataSeeder implements CommandLineRunner {

    private final LevelRepository levelRepository;
    private final LessonRepository lessonRepository;
    private final ListeningContentRepository listeningContentRepository;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n4-listening.json");
        if (!resource.exists()) {
            log.warn("File seed data/n4-listening.json không tồn tại. Bỏ qua seed data Listening N4.");
            return;
        }

        log.info("Bắt đầu kiểm tra và seed dữ liệu Listening N4...");

        List<LessonListeningGroup> groups;
        try (InputStream inputStream = resource.getInputStream()) {
            groups = objectMapper.readValue(inputStream, new TypeReference<List<LessonListeningGroup>>() {});
        }

        if (groups == null || groups.isEmpty()) {
            log.warn("Dữ liệu N4 Listening rỗng hoặc không đúng định dạng.");
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

        for (LessonListeningGroup group : groups) {
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

            for (ListeningItemPayload payload : group.items()) {
                boolean exists = listeningContentRepository.existsByLessonIdAndAudioUrl(lesson.getId(), payload.audioUrl());
                if (exists) {
                    contentsSkipped++;
                    continue;
                }

                ListeningContent content = new ListeningContent();
                content.setLesson(lesson);
                content.setTitle(payload.title() != null ? payload.title() : "Bài nghe");
                content.setAudioUrl(payload.audioUrl());
                content.setTranscript(payload.transcript());
                content.setDescription(payload.description());
                content.setSortOrder(payload.sortOrder() != null ? payload.sortOrder() : 0);

                if (payload.questions() != null) {
                    for (QuestionPayload qPayload : payload.questions()) {
                        ListeningQuestion question = new ListeningQuestion();
                        question.setListening(content);
                        question.setQuestion(qPayload.question());
                        try {
                            question.setQuestionType(QuestionType.valueOf(qPayload.questionType()));
                        } catch (Exception ex) {
                            question.setQuestionType(QuestionType.MULTIPLE_CHOICE);
                        }
                        question.setExplanation(qPayload.explanation());
                        question.setSortOrder(qPayload.sortOrder() != null ? qPayload.sortOrder() : 0);

                        if (qPayload.options() != null) {
                            for (OptionPayload optPayload : qPayload.options()) {
                                ListeningOption option = new ListeningOption();
                                option.setQuestion(question);
                                option.setContent(optPayload.content());
                                option.setCorrect(optPayload.correct() != null ? optPayload.correct() : false);
                                option.setSortOrder(optPayload.sortOrder() != null ? optPayload.sortOrder() : 0);
                                question.getOptions().add(option);
                            }
                        }
                        content.getQuestions().add(question);
                    }
                }

                listeningContentRepository.save(content);
                contentsInserted++;
            }
        }

        log.info("Hoàn tất seed dữ liệu Listening N4: đã thêm {} bài nghe mới, bỏ qua {} bài nghe đã tồn tại.", contentsInserted, contentsSkipped);
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record LessonListeningGroup(
            Integer lessonNumber,
            List<ListeningItemPayload> items
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record ListeningItemPayload(
            String title,
            String audioUrl,
            String transcript,
            String description,
            Integer sortOrder,
            List<QuestionPayload> questions
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record QuestionPayload(
            String question,
            String questionType,
            String explanation,
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
