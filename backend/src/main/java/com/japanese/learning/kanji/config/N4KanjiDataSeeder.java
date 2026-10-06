package com.japanese.learning.kanji.config;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.kanji.entity.Kanji;
import com.japanese.learning.kanji.entity.KanjiCompound;
import com.japanese.learning.kanji.entity.LessonKanji;
import com.japanese.learning.kanji.repository.KanjiCompoundRepository;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.kanji.repository.LessonKanjiRepository;
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
import java.util.List;

@Slf4j
@Component
@Order(4)
@RequiredArgsConstructor
public class N4KanjiDataSeeder implements CommandLineRunner {

    private final LevelRepository levelRepository;
    private final LessonRepository lessonRepository;
    private final KanjiRepository kanjiRepository;
    private final LessonKanjiRepository lessonKanjiRepository;
    private final KanjiCompoundRepository kanjiCompoundRepository;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n4-kanji.json");
        if (!resource.exists()) {
            log.warn("File seed data/n4-kanji.json không tồn tại. Bỏ qua seed data Kanji N4.");
            return;
        }

        log.info("Bắt đầu kiểm tra và seed dữ liệu Kanji N4...");

        List<KanjiPayload> payloads;
        try (InputStream inputStream = resource.getInputStream()) {
            payloads = objectMapper.readValue(inputStream, new TypeReference<List<KanjiPayload>>() {});
        }

        if (payloads == null || payloads.isEmpty()) {
            log.warn("Dữ liệu N4 Kanji rỗng hoặc không đúng định dạng.");
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

        int kanjiInserted = 0;
        int kanjiSkipped = 0;
        int lessonKanjiInserted = 0;

        for (KanjiPayload payload : payloads) {
            String charVal = payload.kanji().trim();
            boolean existed = kanjiRepository.existsByKanji(charVal);

            Kanji kanji = kanjiRepository.findByKanji(charVal)
                    .orElseGet(() -> {
                        Kanji newK = new Kanji();
                        newK.setKanji(charVal);
                        newK.setHanViet(payload.hanViet());
                        newK.setOnyomi(payload.onyomi());
                        newK.setKunyomi(payload.kunyomi());
                        newK.setMeaning(payload.meaning());
                        newK.setStrokeCount(payload.strokeCount());
                        newK.setStrokeOrderUrl(payload.strokeOrderUrl());
                        newK.setMnemonic(payload.mnemonic());
                        newK.setMnemonicImageUrl(payload.mnemonicImageUrl());
                        return kanjiRepository.save(newK);
                    });

            if (existed) {
                kanjiSkipped++;
            } else {
                kanjiInserted++;
            }

            // Add compounds if not present
            if (payload.compounds() != null && !payload.compounds().isEmpty() && kanji.getCompounds().isEmpty()) {
                for (CompoundPayload cPayload : payload.compounds()) {
                    if (cPayload.word() == null || cPayload.word().trim().isEmpty()) {
                        continue;
                    }
                    KanjiCompound compound = new KanjiCompound();
                    compound.setKanji(kanji);
                    compound.setWord(cPayload.word());
                    compound.setReading(cPayload.reading());
                    compound.setMeaning(cPayload.meaning());
                    compound.setExampleSentence(cPayload.exampleSentence());
                    kanjiCompoundRepository.save(compound);
                }
            }

            // Link to lessons via LessonKanji
            if (payload.lessons() != null) {
                for (Integer lessonNum : payload.lessons()) {
                    Lesson lesson = lessonRepository.findByLevelIdAndLessonNumber(level.getId(), lessonNum)
                            .orElseGet(() -> {
                                Lesson newL = new Lesson();
                                newL.setLevel(level);
                                newL.setLessonNumber(lessonNum);
                                newL.setTitle("Bài " + lessonNum);
                                newL.setSortOrder(lessonNum);
                                newL.setActive(true);
                                return lessonRepository.save(newL);
                            });

                    if (!lessonKanjiRepository.existsByLessonIdAndKanjiId(lesson.getId(), kanji.getId())) {
                        LessonKanji lk = new LessonKanji();
                        lk.setLesson(lesson);
                        lk.setKanji(kanji);
                        lk.setSortOrder(payload.sortOrder() != null ? payload.sortOrder() : 0);
                        lessonKanjiRepository.save(lk);
                        lessonKanjiInserted++;
                    }
                }
            }
        }

        log.info("Hoàn tất seed dữ liệu Kanji N4: đã thêm {} Kanji, đã thêm {} lesson mappings, {} đã tồn tại.",
                kanjiInserted, lessonKanjiInserted, kanjiSkipped);
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record KanjiPayload(
            String kanji,
            String hanViet,
            String onyomi,
            String kunyomi,
            String meaning,
            Integer strokeCount,
            String strokeOrderUrl,
            String mnemonic,
            String mnemonicImageUrl,
            Integer sortOrder,
            List<Integer> lessons,
            List<CompoundPayload> compounds
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record CompoundPayload(
            String word,
            String reading,
            String meaning,
            String exampleSentence
    ) {}
}
