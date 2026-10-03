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
@Order(4)
@RequiredArgsConstructor
public class N5ListeningDataSeeder implements CommandLineRunner {

    private final LevelRepository levelRepository;
    private final LessonRepository lessonRepository;
    private final ListeningContentRepository listeningContentRepository;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n5-listening.json");
        if (!resource.exists()) {
            log.warn("File seed data/n5-listening.json không tồn tại. Bỏ qua seed data Listening N5.");
            return;
        }

        log.info("Bắt đầu kiểm tra và seed dữ liệu Listening N5...");

        List<LessonListeningGroup> groups;
        try (InputStream inputStream = resource.getInputStream()) {
            groups = objectMapper.readValue(inputStream, new TypeReference<List<LessonListeningGroup>>() {});
        }

        if (groups == null || groups.isEmpty()) {
            log.warn("Dữ liệu N5 Listening rỗng hoặc không đúng định dạng.");
            return;
        }

        Level level = levelRepository.findByCode("N5")
                .orElseGet(() -> {
                    Level newLevel = new Level();
                    newLevel.setCode("N5");
                    newLevel.setName("N5");
                    newLevel.setDescription("Trình độ N5");
                    newLevel.setSortOrder(1);
                    newLevel.setActive(true);
                    return levelRepository.save(newLevel);
                });

        int contentsInserted = 0;

        for (LessonListeningGroup group : groups) {
            Lesson lesson = lessonRepository.findByLevelIdAndLessonNumber(level.getId(), group.lessonNumber())
                    .orElseGet(() -> {
                        Lesson newL = new Lesson();
                        newL.setLevel(level);
                        newL.setLessonNumber(group.lessonNumber());
                        newL.setTitle("Bài " + (group.lessonNumber() < 10 ? "0" + group.lessonNumber() : group.lessonNumber()));
                        newL.setSortOrder(group.lessonNumber());
                        newL.setActive(true);
                        return lessonRepository.save(newL);
                    });

            List<ListeningContent> existingContents = listeningContentRepository.findByLessonIdOrderBySortOrderAsc(lesson.getId());
            if (!existingContents.isEmpty()) {
                listeningContentRepository.deleteAll(existingContents);
                listeningContentRepository.flush();
            }

            for (ListeningItemPayload payload : group.items()) {
                boolean exists = listeningContentRepository.existsByLessonIdAndAudioUrl(lesson.getId(), payload.audioUrl());
                if (exists) {
                    continue;
                }

                ListeningContent content = new ListeningContent();
                content.setLesson(lesson);
                content.setTitle(payload.title() != null ? payload.title() : "Bài nghe");
                content.setAudioUrl(payload.audioUrl());
                content.setTranscript(payload.transcript());
                content.setDescription(payload.description());
                content.setSortOrder(payload.sortOrder() != null ? payload.sortOrder() : 1);

                if (payload.questions() != null) {
                    for (QuestionPayload qPayload : payload.questions()) {
                        ListeningQuestion question = new ListeningQuestion();
                        question.setListening(content);
                        question.setQuestion(qPayload.question() != null ? qPayload.question() : "");
                        question.setQuestionType(qPayload.questionType() != null ? QuestionType.valueOf(qPayload.questionType()) : QuestionType.MULTIPLE_CHOICE);
                        question.setExplanation(qPayload.explanation());
                        question.setSortOrder(qPayload.sortOrder() != null ? qPayload.sortOrder() : 1);

                        if (qPayload.options() != null) {
                            for (OptionPayload oPayload : qPayload.options()) {
                                ListeningOption option = new ListeningOption();
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

                listeningContentRepository.save(content);
                contentsInserted++;
            }
        }

        log.info("Hoàn tất seed dữ liệu Listening N5: đã thêm {} bài nghe mới.", contentsInserted);
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
