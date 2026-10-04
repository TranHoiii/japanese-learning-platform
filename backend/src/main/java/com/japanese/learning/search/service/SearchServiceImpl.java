package com.japanese.learning.search.service;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.exercise.entity.Exercise;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.grammar.entity.Grammar;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.entity.Kanji;
import com.japanese.learning.kanji.entity.LessonKanji;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.listening.entity.ListeningContent;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.reading.entity.ReadingContent;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.search.dto.SearchResponse;
import com.japanese.learning.search.dto.SearchResultItem;
import com.japanese.learning.vocabulary.entity.Vocabulary;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    public static final Set<ContentType> SUPPORTED_CONTENT_TYPES = Set.of(
            ContentType.VOCABULARY,
            ContentType.GRAMMAR,
            ContentType.KANJI,
            ContentType.LISTENING,
            ContentType.READING,
            ContentType.EXERCISE
    );

    private final VocabularyRepository vocabularyRepository;
    private final GrammarRepository grammarRepository;
    private final KanjiRepository kanjiRepository;
    private final ListeningContentRepository listeningContentRepository;
    private final ReadingContentRepository readingContentRepository;
    private final ExerciseRepository exerciseRepository;

    @Override
    @Transactional(readOnly = true)
    public SearchResponse search(String query, String type, String level, Integer page, Integer size) {
        if (query == null || query.trim().isEmpty()) {
            throw new IllegalArgumentException("Từ khóa tìm kiếm không được để trống");
        }
        String cleanQuery = query.trim();
        if (cleanQuery.length() > 100) {
            throw new IllegalArgumentException("Từ khóa tìm kiếm không được vượt quá 100 ký tự");
        }

        ContentType targetType = null;
        if (type != null && !type.trim().isEmpty()) {
            try {
                targetType = ContentType.valueOf(type.trim().toUpperCase());
            } catch (IllegalArgumentException ex) {
                throw new IllegalArgumentException("Loại nội dung không được hỗ trợ");
            }
            if (!SUPPORTED_CONTENT_TYPES.contains(targetType)) {
                throw new IllegalArgumentException("Loại nội dung không được hỗ trợ");
            }
        }

        String cleanLevel = (level != null && !level.trim().isEmpty()) ? level.trim() : null;
        int cleanPage = (page == null || page < 0) ? 0 : page;
        int cleanSize = (size == null || size <= 0) ? 20 : Math.min(size, 50);

        List<SearchResultItem> allItems = new ArrayList<>();

        if (targetType == null || targetType == ContentType.VOCABULARY) {
            List<Vocabulary> vocabularies = vocabularyRepository.searchByKeyword(cleanQuery, cleanLevel);
            vocabularies.forEach(v -> allItems.add(mapVocabulary(v)));
        }

        if (targetType == null || targetType == ContentType.GRAMMAR) {
            List<Grammar> grammars = grammarRepository.searchByKeyword(cleanQuery, cleanLevel);
            grammars.forEach(g -> allItems.add(mapGrammar(g)));
        }

        if (targetType == null || targetType == ContentType.KANJI) {
            List<Kanji> kanjis = kanjiRepository.searchByKeyword(cleanQuery, cleanLevel);
            kanjis.forEach(k -> allItems.add(mapKanji(k, cleanLevel)));
        }

        if (targetType == null || targetType == ContentType.LISTENING) {
            List<ListeningContent> listenings = listeningContentRepository.searchByKeyword(cleanQuery, cleanLevel);
            listenings.forEach(lc -> allItems.add(mapListening(lc)));
        }

        if (targetType == null || targetType == ContentType.READING) {
            List<ReadingContent> readings = readingContentRepository.searchByKeyword(cleanQuery, cleanLevel);
            readings.forEach(rc -> allItems.add(mapReading(rc)));
        }

        if (targetType == null || targetType == ContentType.EXERCISE) {
            List<Exercise> exercises = exerciseRepository.searchByKeyword(cleanQuery, cleanLevel);
            exercises.forEach(e -> allItems.add(mapExercise(e)));
        }

        // Deterministic sorting
        allItems.sort(createComparator(cleanQuery));

        int total = allItems.size();
        int fromIndex = Math.min(cleanPage * cleanSize, total);
        int toIndex = Math.min(fromIndex + cleanSize, total);
        List<SearchResultItem> pagedItems = allItems.subList(fromIndex, toIndex);

        return new SearchResponse(cleanQuery, total, cleanPage, cleanSize, pagedItems);
    }

    private SearchResultItem mapVocabulary(Vocabulary v) {
        String title = (v.getKanji() != null && !v.getKanji().isBlank()) ? v.getKanji() : v.getHiragana();
        String subtitle;
        if (v.getKanji() != null && !v.getKanji().isBlank()) {
            subtitle = v.getHiragana() + (v.getHanViet() != null && !v.getHanViet().isBlank() ? " (" + v.getHanViet() + ")" : "");
        } else {
            subtitle = v.getHanViet();
        }

        Lesson lesson = v.getLesson();
        String level = (lesson != null && lesson.getLevel() != null) ? lesson.getLevel().getCode() : null;
        Long lessonId = lesson != null ? lesson.getId() : null;
        String lessonTitle = lesson != null ? lesson.getTitle() : null;

        return new SearchResultItem(
                ContentType.VOCABULARY,
                v.getId(),
                title,
                subtitle,
                v.getMeaning(),
                level,
                lessonId,
                lessonTitle
        );
    }

    private SearchResultItem mapGrammar(Grammar g) {
        String description = (g.getExplanation() != null && !g.getExplanation().isBlank()) ? g.getExplanation() : g.getUsage();
        Lesson lesson = g.getLesson();
        String level = (lesson != null && lesson.getLevel() != null) ? lesson.getLevel().getCode() : null;
        Long lessonId = lesson != null ? lesson.getId() : null;
        String lessonTitle = lesson != null ? lesson.getTitle() : null;

        return new SearchResultItem(
                ContentType.GRAMMAR,
                g.getId(),
                g.getPattern(),
                g.getMeaning(),
                description,
                level,
                lessonId,
                lessonTitle
        );
    }

    private SearchResultItem mapKanji(Kanji k, String filterLevel) {
        String subtitle = (k.getHanViet() != null && !k.getHanViet().isBlank())
                ? k.getHanViet()
                : (k.getOnyomi() != null && !k.getOnyomi().isBlank() ? k.getOnyomi() : k.getKunyomi());

        String level = null;
        Long lessonId = null;
        String lessonTitle = null;

        if (k.getLessonKanjis() != null && !k.getLessonKanjis().isEmpty()) {
            LessonKanji matchedLk = null;
            if (filterLevel != null) {
                matchedLk = k.getLessonKanjis().stream()
                        .filter(lk -> lk.getLesson() != null && lk.getLesson().getLevel() != null
                                && filterLevel.equalsIgnoreCase(lk.getLesson().getLevel().getCode()))
                        .findFirst()
                        .orElse(null);
            }
            if (matchedLk == null) {
                matchedLk = k.getLessonKanjis().get(0);
            }

            if (matchedLk != null && matchedLk.getLesson() != null) {
                Lesson lesson = matchedLk.getLesson();
                level = lesson.getLevel() != null ? lesson.getLevel().getCode() : null;
                lessonId = lesson.getId();
                lessonTitle = lesson.getTitle();
            }
        }

        return new SearchResultItem(
                ContentType.KANJI,
                k.getId(),
                k.getKanji(),
                subtitle,
                k.getMeaning(),
                level,
                lessonId,
                lessonTitle
        );
    }

    private SearchResultItem mapListening(ListeningContent lc) {
        String description = (lc.getDescription() != null && !lc.getDescription().isBlank())
                ? lc.getDescription()
                : (lc.getTranscript() != null
                ? (lc.getTranscript().length() > 120 ? lc.getTranscript().substring(0, 120) + "..." : lc.getTranscript())
                : null);

        Lesson lesson = lc.getLesson();
        String level = (lesson != null && lesson.getLevel() != null) ? lesson.getLevel().getCode() : null;
        Long lessonId = lesson != null ? lesson.getId() : null;
        String lessonTitle = lesson != null ? lesson.getTitle() : null;

        return new SearchResultItem(
                ContentType.LISTENING,
                lc.getId(),
                lc.getTitle(),
                lessonTitle,
                description,
                level,
                lessonId,
                lessonTitle
        );
    }

    private SearchResultItem mapReading(ReadingContent rc) {
        String description = (rc.getTranslation() != null && !rc.getTranslation().isBlank())
                ? (rc.getTranslation().length() > 120 ? rc.getTranslation().substring(0, 120) + "..." : rc.getTranslation())
                : (rc.getContent() != null && rc.getContent().length() > 120 ? rc.getContent().substring(0, 120) + "..." : rc.getContent());

        Lesson lesson = rc.getLesson();
        String level = (lesson != null && lesson.getLevel() != null) ? lesson.getLevel().getCode() : null;
        Long lessonId = lesson != null ? lesson.getId() : null;
        String lessonTitle = lesson != null ? lesson.getTitle() : null;

        return new SearchResultItem(
                ContentType.READING,
                rc.getId(),
                rc.getTitle(),
                lessonTitle,
                description,
                level,
                lessonId,
                lessonTitle
        );
    }

    private SearchResultItem mapExercise(Exercise e) {
        String subtitle = e.getExerciseType() != null ? e.getExerciseType().name() : (e.getContentType() != null ? e.getContentType().name() : null);
        Lesson lesson = e.getLesson();
        String level = (lesson != null && lesson.getLevel() != null) ? lesson.getLevel().getCode() : null;
        Long lessonId = lesson != null ? lesson.getId() : null;
        String lessonTitle = lesson != null ? lesson.getTitle() : null;

        return new SearchResultItem(
                ContentType.EXERCISE,
                e.getId(),
                e.getTitle(),
                subtitle,
                e.getDescription(),
                level,
                lessonId,
                lessonTitle
        );
    }

    private Comparator<SearchResultItem> createComparator(String query) {
        return (a, b) -> {
            int rankA = calculateMatchRank(a, query);
            int rankB = calculateMatchRank(b, query);
            if (rankA != rankB) {
                return Integer.compare(rankA, rankB);
            }
            int typeComp = Integer.compare(getContentTypeOrder(a.contentType()), getContentTypeOrder(b.contentType()));
            if (typeComp != 0) {
                return typeComp;
            }
            return Long.compare(a.contentId(), b.contentId());
        };
    }

    private int calculateMatchRank(SearchResultItem item, String query) {
        String title = item.title();
        if (title != null) {
            if (title.equalsIgnoreCase(query)) {
                return 1; // Exact match
            }
            if (title.toLowerCase().startsWith(query.toLowerCase())) {
                return 2; // Prefix match
            }
        }
        return 3; // Substring match
    }

    private int getContentTypeOrder(ContentType contentType) {
        if (contentType == null) return 99;
        return switch (contentType) {
            case VOCABULARY -> 1;
            case GRAMMAR -> 2;
            case KANJI -> 3;
            case LISTENING -> 4;
            case READING -> 5;
            case EXERCISE -> 6;
            default -> 99;
        };
    }
}
