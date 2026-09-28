package com.japanese.learning.grammar.config;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.grammar.entity.Grammar;
import com.japanese.learning.grammar.entity.GrammarExample;
import com.japanese.learning.grammar.repository.GrammarExampleRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Component
@Order(2)
@RequiredArgsConstructor
public class N5GrammarDataSeeder implements CommandLineRunner {

    private final LevelRepository levelRepository;
    private final LessonRepository lessonRepository;
    private final GrammarRepository grammarRepository;
    private final GrammarExampleRepository grammarExampleRepository;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n5-grammar.json");
        if (!resource.exists()) {
            log.warn("File seed data/n5-grammar.json không tồn tại. Bỏ qua seed data Grammar N5.");
            return;
        }

        log.info("Bắt đầu kiểm tra và seed dữ liệu ngữ pháp N5...");

        N5GrammarDataPayload payload;
        try (InputStream inputStream = resource.getInputStream()) {
            payload = objectMapper.readValue(inputStream, N5GrammarDataPayload.class);
        }

        if (payload == null || payload.lessons() == null) {
            log.warn("Dữ liệu N5 Grammar rỗng hoặc không đúng định dạng.");
            return;
        }

        // 1. Level N5
        Level level = levelRepository.findByCode("N5")
                .orElseGet(() -> {
                    Level newLevel = new Level();
                    newLevel.setCode(payload.levelCode() != null ? payload.levelCode() : "N5");
                    newLevel.setName(payload.levelName() != null ? payload.levelName() : "N5");
                    newLevel.setDescription(payload.levelDescription() != null ? payload.levelDescription() : "Trình độ N5");
                    newLevel.setSortOrder(1);
                    newLevel.setActive(true);
                    return levelRepository.save(newLevel);
                });

        int totalGrammarInserted = 0;
        int totalGrammarSkipped = 0;
        int totalExamplesInserted = 0;

        for (N5LessonGrammarPayload lessonPayload : payload.lessons()) {
            // 2. Lesson
            Lesson lesson = lessonRepository.findByLevelIdAndLessonNumber(level.getId(), lessonPayload.lessonNumber())
                    .orElseGet(() -> {
                        Lesson newLesson = new Lesson();
                        newLesson.setLevel(level);
                        newLesson.setLessonNumber(lessonPayload.lessonNumber());
                        newLesson.setTitle(lessonPayload.title() != null ? lessonPayload.title() : "Bài " + lessonPayload.lessonNumber());
                        newLesson.setSortOrder(lessonPayload.lessonNumber());
                        newLesson.setActive(true);
                        return lessonRepository.save(newLesson);
                    });

            if (lessonPayload.grammars() == null || lessonPayload.grammars().isEmpty()) {
                continue;
            }

            // 3. Check existing grammars in this lesson
            List<Grammar> existingGrammars = grammarRepository.findByLessonIdOrderBySortOrderAsc(lesson.getId());
            Set<String> existingPatterns = new HashSet<>();
            for (Grammar g : existingGrammars) {
                existingPatterns.add(g.getPattern().trim());
            }

            for (N5GrammarItemPayload gDto : lessonPayload.grammars()) {
                if (existingPatterns.contains(gDto.pattern().trim())) {
                    totalGrammarSkipped++;
                    continue;
                }

                Grammar grammar = new Grammar();
                grammar.setLesson(lesson);
                grammar.setPattern(gDto.pattern());
                grammar.setMeaning(gDto.meaning());
                grammar.setUsage(gDto.usage());
                grammar.setExplanation(gDto.explanation());
                grammar.setNotes(gDto.notes());
                grammar.setSortOrder(gDto.sortOrder() != null ? gDto.sortOrder() : 0);

                Grammar savedGrammar = grammarRepository.save(grammar);
                totalGrammarInserted++;

                if (gDto.examples() != null && !gDto.examples().isEmpty()) {
                    List<GrammarExample> examplesToInsert = gDto.examples().stream()
                            .map(exDto -> {
                                GrammarExample ex = new GrammarExample();
                                ex.setGrammar(savedGrammar);
                                ex.setJapanese(exDto.japanese());
                                ex.setFurigana(exDto.furigana());
                                ex.setTranslation(exDto.translation());
                                ex.setExplanation(exDto.explanation());
                                ex.setSortOrder(exDto.sortOrder() != null ? exDto.sortOrder() : 0);
                                return ex;
                            })
                            .toList();

                    grammarExampleRepository.saveAll(examplesToInsert);
                    totalExamplesInserted += examplesToInsert.size();
                }
            }
        }

        log.info("Hoàn tất seed dữ liệu Grammar N5: đã thêm {} mẫu ngữ pháp (kèm {} ví dụ), {} đã tồn tại.",
                totalGrammarInserted, totalExamplesInserted, totalGrammarSkipped);
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record N5GrammarDataPayload(
            String levelCode,
            String levelName,
            String levelDescription,
            List<N5LessonGrammarPayload> lessons
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record N5LessonGrammarPayload(
            Integer lessonNumber,
            String title,
            List<N5GrammarItemPayload> grammars
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record N5GrammarItemPayload(
            String pattern,
            String meaning,
            String usage,
            String explanation,
            String notes,
            Integer sortOrder,
            List<N5GrammarExamplePayload> examples
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record N5GrammarExamplePayload(
            String japanese,
            String furigana,
            String translation,
            String explanation,
            Integer sortOrder
    ) {}
}
