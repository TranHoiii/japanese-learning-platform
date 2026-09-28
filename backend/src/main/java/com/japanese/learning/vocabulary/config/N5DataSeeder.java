package com.japanese.learning.vocabulary.config;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import com.japanese.learning.vocabulary.entity.Vocabulary;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class N5DataSeeder implements CommandLineRunner {

    private final LevelRepository levelRepository;
    private final LessonRepository lessonRepository;
    private final VocabularyRepository vocabularyRepository;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n5-vocabulary.json");
        if (!resource.exists()) {
            log.warn("File seed data/n5-vocabulary.json không tồn tại. Bỏ qua seed data N5.");
            return;
        }

        log.info("Bắt đầu kiểm tra và seed dữ liệu từ vựng N5...");

        N5DataPayload payload;
        try (InputStream inputStream = resource.getInputStream()) {
            payload = objectMapper.readValue(inputStream, N5DataPayload.class);
        }

        if (payload == null || payload.lessons() == null) {
            log.warn("Dữ liệu N5 rỗng hoặc không đúng định dạng.");
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

        int totalInserted = 0;
        int totalSkipped = 0;

        for (N5LessonPayload lessonPayload : payload.lessons()) {
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

            if (lessonPayload.vocabularies() == null || lessonPayload.vocabularies().isEmpty()) {
                continue;
            }

            // 3. Existing vocabularies in this lesson to avoid duplicates
            List<Vocabulary> existingVocabs = vocabularyRepository.findByLessonIdOrderByIdAsc(lesson.getId());
            Set<String> existingKeys = new HashSet<>();
            for (Vocabulary v : existingVocabs) {
                existingKeys.add(makeKey(v.getHiragana(), v.getMeaning()));
            }

            List<Vocabulary> newVocabsToInsert = lessonPayload.vocabularies().stream()
                    .filter(vDto -> !existingKeys.contains(makeKey(vDto.hiragana(), vDto.meaning())))
                    .map(vDto -> {
                        Vocabulary vocab = new Vocabulary();
                        vocab.setLesson(lesson);
                        vocab.setHiragana(vDto.hiragana());
                        vocab.setKanji(vDto.kanji());
                        vocab.setHanViet(vDto.hanViet());
                        vocab.setMeaning(vDto.meaning());
                        vocab.setPartOfSpeech(null);
                        vocab.setAudioUrl(null);
                        vocab.setNotes(null);
                        return vocab;
                    })
                    .toList();

            if (!newVocabsToInsert.isEmpty()) {
                vocabularyRepository.saveAll(newVocabsToInsert);
                totalInserted += newVocabsToInsert.size();
            }
            totalSkipped += (lessonPayload.vocabularies().size() - newVocabsToInsert.size());
        }

        log.info("Hoàn tất seed dữ liệu N5: đã thêm {} từ vựng mới, {} từ vựng đã tồn tại.", totalInserted, totalSkipped);
    }

    private String makeKey(String hiragana, String meaning) {
        return (hiragana != null ? hiragana.trim() : "") + "|||" + (meaning != null ? meaning.trim() : "");
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record N5DataPayload(
            String levelCode,
            String levelName,
            String levelDescription,
            List<N5LessonPayload> lessons
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record N5LessonPayload(
            Integer lessonNumber,
            String title,
            List<N5VocabularyPayload> vocabularies
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record N5VocabularyPayload(
            String hiragana,
            String kanji,
            String hanViet,
            String meaning
    ) {}
}
