package com.japanese.learning.progress.service;

import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.entity.Exercise;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.grammar.entity.Grammar;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.entity.LessonKanji;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.kanji.repository.LessonKanjiRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import com.japanese.learning.listening.entity.ListeningContent;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.progress.dto.ContentProgressResponse;
import com.japanese.learning.progress.dto.LessonProgressResponse;
import com.japanese.learning.progress.dto.ProgressSummaryResponse;
import com.japanese.learning.progress.dto.UpdateContentProgressRequest;
import com.japanese.learning.progress.dto.UpdateLessonProgressRequest;
import com.japanese.learning.progress.entity.UserContentProgress;
import com.japanese.learning.progress.entity.UserLessonProgress;
import com.japanese.learning.progress.enums.LearningStatus;
import com.japanese.learning.progress.repository.UserContentProgressRepository;
import com.japanese.learning.progress.repository.UserLessonProgressRepository;
import com.japanese.learning.reading.entity.ReadingContent;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.user.entity.User;
import com.japanese.learning.vocabulary.entity.Vocabulary;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProgressServiceImpl implements ProgressService {

    private static final Set<ContentType> SUPPORTED_CONTENT_TYPES = Set.of(
            ContentType.VOCABULARY,
            ContentType.GRAMMAR,
            ContentType.KANJI,
            ContentType.LISTENING,
            ContentType.READING,
            ContentType.EXERCISE
    );

    private final AuthService authService;
    private final LessonRepository lessonRepository;
    private final LevelRepository levelRepository;
    private final UserLessonProgressRepository userLessonProgressRepository;
    private final UserContentProgressRepository userContentProgressRepository;
    private final VocabularyRepository vocabularyRepository;
    private final GrammarRepository grammarRepository;
    private final KanjiRepository kanjiRepository;
    private final LessonKanjiRepository lessonKanjiRepository;
    private final ListeningContentRepository listeningContentRepository;
    private final ReadingContentRepository readingContentRepository;
    private final ExerciseRepository exerciseRepository;

    @Override
    @Transactional
    public ProgressSummaryResponse getProgressSummary(Jwt jwt) {
        User user = authService.getAuthenticatedUser(jwt);
        List<Lesson> allLessons = lessonRepository.findAllByOrderBySortOrderAsc();

        if (allLessons.isEmpty()) {
            return new ProgressSummaryResponse(0, 0, 0, 0, 0, 0, 0, 0, 0);
        }

        // 1. Calculate lesson progresses for all lessons
        List<LessonProgressResponse> lessonResponses = allLessons.stream()
                .map(lesson -> calculateAndSyncLessonProgress(user, lesson))
                .toList();

        long totalLessons = allLessons.size();
        long completedLessons = lessonResponses.stream().filter(l -> l.progressPercent() >= 100).count();
        long inProgressLessons = lessonResponses.stream().filter(l -> l.progressPercent() > 0 && l.progressPercent() < 100).count();

        int overallProgress = 0;
        if (totalLessons > 0) {
            double sum = lessonResponses.stream().mapToInt(LessonProgressResponse::progressPercent).sum();
            overallProgress = (int) Math.round(sum / totalLessons);
            overallProgress = Math.max(0, Math.min(100, overallProgress));
        }

        // 2. Calculate N5 Mastery across ALL N5 Content (independent of current lesson)
        Optional<Level> n5Opt = levelRepository.findByCode("N5");
        List<Lesson> n5Lessons = n5Opt
                .map(lvl -> lessonRepository.findByLevelIdOrderBySortOrderAsc(lvl.getId()))
                .filter(list -> !list.isEmpty())
                .orElse(allLessons);

        // A. Vocabulary Mastery across all N5
        int vocabMastery = calculateCategoryMasteryForVocab(user.getId(), n5Lessons);

        // B. Kanji Mastery across all N5
        int kanjiMastery = calculateCategoryMasteryForKanji(user.getId(), n5Lessons);

        // C. Grammar Mastery across all N5
        int grammarMastery = calculateCategoryMasteryForGrammar(user.getId(), n5Lessons);

        // D. Listening Mastery across all N5
        int listeningMastery = calculateCategoryMasteryForListening(user.getId(), n5Lessons);

        // E. Reading Mastery across all N5
        int readingMastery = calculateCategoryMasteryForReading(user.getId(), n5Lessons);

        return new ProgressSummaryResponse(
                overallProgress,
                completedLessons,
                totalLessons,
                inProgressLessons,
                vocabMastery,
                kanjiMastery,
                grammarMastery,
                listeningMastery,
                readingMastery
        );
    }

    @Override
    @Transactional
    public List<LessonProgressResponse> getLessonProgresses(Jwt jwt) {
        User user = authService.getAuthenticatedUser(jwt);
        List<Lesson> lessons = lessonRepository.findAllByOrderBySortOrderAsc();

        return lessons.stream()
                .map(lesson -> calculateAndSyncLessonProgress(user, lesson))
                .toList();
    }

    @Override
    @Transactional
    public LessonProgressResponse getLessonProgress(Jwt jwt, Long lessonId) {
        User user = authService.getAuthenticatedUser(jwt);
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + lessonId));

        return calculateAndSyncLessonProgress(user, lesson);
    }

    @Override
    @Transactional
    public LessonProgressResponse updateLessonProgress(Jwt jwt, Long lessonId, UpdateLessonProgressRequest request) {
        User user = authService.getAuthenticatedUser(jwt);
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + lessonId));

        UserLessonProgress progress = userLessonProgressRepository.findByUserIdAndLessonId(user.getId(), lessonId)
                .orElseGet(() -> {
                    UserLessonProgress newProgress = new UserLessonProgress();
                    newProgress.setUser(user);
                    newProgress.setLesson(lesson);
                    return newProgress;
                });

        progress.setProgressPercent(request.progressPercent());
        progress.setStatus(LearningStatus.fromProgressPercent(request.progressPercent()));
        LocalDateTime now = LocalDateTime.now();
        progress.setLastAccessedAt(now);
        if (request.progressPercent() == 100) {
            progress.setCompletedAt(now);
        } else {
            progress.setCompletedAt(null);
        }

        UserLessonProgress saved = userLessonProgressRepository.save(progress);
        return mapToLessonProgressResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContentProgressResponse> getContentProgresses(Jwt jwt, ContentType contentType) {
        User user = authService.getAuthenticatedUser(jwt);
        List<UserContentProgress> list;
        if (contentType != null) {
            validateSupportedContentType(contentType);
            list = userContentProgressRepository.findByUserIdAndContentTypeOrderByLastAccessedAtDesc(user.getId(), contentType);
        } else {
            list = userContentProgressRepository.findByUserIdAndContentTypeInOrderByLastAccessedAtDesc(user.getId(), SUPPORTED_CONTENT_TYPES);
        }

        return list.stream()
                .map(this::mapToContentProgressResponse)
                .toList();
    }

    @Override
    @Transactional
    public ContentProgressResponse updateContentProgress(Jwt jwt, UpdateContentProgressRequest request) {
        User user = authService.getAuthenticatedUser(jwt);
        validateSupportedContentType(request.contentType());
        validateContentExists(request.contentType(), request.contentId());

        UserContentProgress progress = userContentProgressRepository
                .findByUserIdAndContentTypeAndContentId(user.getId(), request.contentType(), request.contentId())
                .orElseGet(() -> {
                    UserContentProgress newProgress = new UserContentProgress();
                    newProgress.setUser(user);
                    newProgress.setContentType(request.contentType());
                    newProgress.setContentId(request.contentId());
                    return newProgress;
                });

        LocalDateTime now = LocalDateTime.now();
        progress.setLastAccessedAt(now);

        if (request.contentType() == ContentType.GRAMMAR) {
            // Apply grammar 3-stage completion semantics:
            // A grammar pattern is COMPLETED only when patternOpened && contentViewed && examplesViewed
            if (request.patternOpened() != null) {
                progress.setPatternOpened(Boolean.TRUE.equals(progress.getPatternOpened()) || request.patternOpened());
            }
            if (request.contentViewed() != null) {
                progress.setContentViewed(Boolean.TRUE.equals(progress.getContentViewed()) || request.contentViewed());
            }
            if (request.examplesViewed() != null) {
                progress.setExamplesViewed(Boolean.TRUE.equals(progress.getExamplesViewed()) || request.examplesViewed());
            }

            boolean isCompleted = Boolean.TRUE.equals(progress.getPatternOpened())
                    && Boolean.TRUE.equals(progress.getContentViewed())
                    && Boolean.TRUE.equals(progress.getExamplesViewed());

            if (isCompleted) {
                progress.setProgressPercent(100);
                progress.setStatus(LearningStatus.COMPLETED);
                progress.setCompletedAt(now);
            } else {
                int flagsCount = (Boolean.TRUE.equals(progress.getPatternOpened()) ? 1 : 0)
                        + (Boolean.TRUE.equals(progress.getContentViewed()) ? 1 : 0)
                        + (Boolean.TRUE.equals(progress.getExamplesViewed()) ? 1 : 0);

                if (flagsCount == 0) {
                    progress.setProgressPercent(0);
                    progress.setStatus(LearningStatus.NOT_STARTED);
                } else {
                    progress.setProgressPercent(flagsCount == 1 ? 33 : 67);
                    progress.setStatus(LearningStatus.IN_PROGRESS);
                }
                progress.setCompletedAt(null);
            }
        } else {
            // Vocabulary, Kanji, Listening, Reading, Exercise
            int percent = request.progressPercent() != null ? request.progressPercent() : 100;
            progress.setProgressPercent(percent);
            progress.setStatus(LearningStatus.fromProgressPercent(percent));
            if (percent == 100) {
                progress.setCompletedAt(now);
            } else {
                progress.setCompletedAt(null);
            }
        }

        UserContentProgress saved = userContentProgressRepository.save(progress);

        // Sync corresponding Lesson Progress if content belongs to a lesson
        syncLessonProgressForContent(user, request.contentType(), request.contentId());

        return mapToContentProgressResponse(saved);
    }

    /**
     * Calculates the aggregated lesson progress from its content modules.
     * Formula:
     * lessonProgress = (sum of available module progress) / (number of available modules)
     * Modules with no content are excluded from the denominator.
     */
    public LessonProgressResponse calculateAndSyncLessonProgress(User user, Lesson lesson) {
        Long lessonId = lesson.getId();

        // 1. Vocabulary %
        List<Vocabulary> vocabs = vocabularyRepository.findByLessonIdOrderByIdAsc(lessonId);
        Integer vocabProgress = null;
        if (!vocabs.isEmpty()) {
            List<Long> ids = vocabs.stream().map(Vocabulary::getId).toList();
            List<UserContentProgress> userProgs = userContentProgressRepository
                    .findByUserIdAndContentTypeAndContentIdIn(user.getId(), ContentType.VOCABULARY, ids);
            int sum = userProgs.stream().mapToInt(UserContentProgress::getProgressPercent).sum();
            vocabProgress = Math.max(0, Math.min(100, (int) Math.round((double) sum / vocabs.size())));
        }

        // 2. Grammar %
        List<Grammar> grammars = grammarRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        Integer grammarProgress = null;
        if (!grammars.isEmpty()) {
            List<Long> ids = grammars.stream().map(Grammar::getId).toList();
            List<UserContentProgress> userProgs = userContentProgressRepository
                    .findByUserIdAndContentTypeAndContentIdIn(user.getId(), ContentType.GRAMMAR, ids);
            int sum = userProgs.stream().mapToInt(UserContentProgress::getProgressPercent).sum();
            grammarProgress = Math.max(0, Math.min(100, (int) Math.round((double) sum / grammars.size())));
        }

        // 3. Kanji %
        List<LessonKanji> lessonKanjis = lessonKanjiRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        Integer kanjiProgress = null;
        if (!lessonKanjis.isEmpty()) {
            List<Long> ids = lessonKanjis.stream().map(lk -> lk.getKanji().getId()).toList();
            List<UserContentProgress> userProgs = userContentProgressRepository
                    .findByUserIdAndContentTypeAndContentIdIn(user.getId(), ContentType.KANJI, ids);
            int sum = userProgs.stream().mapToInt(UserContentProgress::getProgressPercent).sum();
            kanjiProgress = Math.max(0, Math.min(100, (int) Math.round((double) sum / lessonKanjis.size())));
        }

        // 4. Listening %
        List<ListeningContent> listenings = listeningContentRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        Integer listeningProgress = null;
        if (!listenings.isEmpty()) {
            List<Long> ids = listenings.stream().map(ListeningContent::getId).toList();
            List<UserContentProgress> userProgs = userContentProgressRepository
                    .findByUserIdAndContentTypeAndContentIdIn(user.getId(), ContentType.LISTENING, ids);
            int sum = userProgs.stream().mapToInt(UserContentProgress::getProgressPercent).sum();
            listeningProgress = Math.max(0, Math.min(100, (int) Math.round((double) sum / listenings.size())));
        }

        // 5. Reading %
        List<ReadingContent> readings = readingContentRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        Integer readingProgress = null;
        if (!readings.isEmpty()) {
            List<Long> ids = readings.stream().map(ReadingContent::getId).toList();
            List<UserContentProgress> userProgs = userContentProgressRepository
                    .findByUserIdAndContentTypeAndContentIdIn(user.getId(), ContentType.READING, ids);
            int sum = userProgs.stream().mapToInt(UserContentProgress::getProgressPercent).sum();
            readingProgress = Math.max(0, Math.min(100, (int) Math.round((double) sum / readings.size())));
        }

        // 6. Exercise %
        List<Exercise> exercises = exerciseRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        Integer exerciseProgress = null;
        if (!exercises.isEmpty()) {
            List<Long> ids = exercises.stream().map(Exercise::getId).toList();
            List<UserContentProgress> userProgs = userContentProgressRepository
                    .findByUserIdAndContentTypeAndContentIdIn(user.getId(), ContentType.EXERCISE, ids);
            int sum = userProgs.stream().mapToInt(UserContentProgress::getProgressPercent).sum();
            exerciseProgress = Math.max(0, Math.min(100, (int) Math.round((double) sum / exercises.size())));
        }

        // Aggregate across available modules
        List<Integer> availableModules = new ArrayList<>();
        if (vocabProgress != null) availableModules.add(vocabProgress);
        if (grammarProgress != null) availableModules.add(grammarProgress);
        if (kanjiProgress != null) availableModules.add(kanjiProgress);
        if (listeningProgress != null) availableModules.add(listeningProgress);
        if (readingProgress != null) availableModules.add(readingProgress);
        if (exerciseProgress != null) availableModules.add(exerciseProgress);

        int lessonProgressPercent = 0;
        if (!availableModules.isEmpty()) {
            double avg = availableModules.stream().mapToInt(Integer::intValue).sum() / (double) availableModules.size();
            lessonProgressPercent = Math.max(0, Math.min(100, (int) Math.round(avg)));
        }

        LearningStatus status = LearningStatus.fromProgressPercent(lessonProgressPercent);

        // Sync UserLessonProgress in database
        UserLessonProgress lessonProg = userLessonProgressRepository
                .findByUserIdAndLessonId(user.getId(), lessonId)
                .orElseGet(() -> {
                    UserLessonProgress np = new UserLessonProgress();
                    np.setUser(user);
                    np.setLesson(lesson);
                    return np;
                });

        lessonProg.setProgressPercent(lessonProgressPercent);
        lessonProg.setStatus(status);
        LocalDateTime now = LocalDateTime.now();
        lessonProg.setLastAccessedAt(now);
        if (lessonProgressPercent == 100) {
            lessonProg.setCompletedAt(now);
        } else {
            lessonProg.setCompletedAt(null);
        }
        userLessonProgressRepository.save(lessonProg);

        return new LessonProgressResponse(
                lesson.getId(),
                lesson.getLessonNumber(),
                lesson.getTitle(),
                lessonProgressPercent,
                status,
                lessonProg.getLastAccessedAt(),
                lessonProg.getCompletedAt(),
                vocabProgress,
                grammarProgress,
                kanjiProgress,
                listeningProgress,
                readingProgress,
                exerciseProgress
        );
    }

    private void syncLessonProgressForContent(User user, ContentType contentType, Long contentId) {
        try {
            Long lessonId = switch (contentType) {
                case VOCABULARY -> vocabularyRepository.findById(contentId).map(v -> v.getLesson().getId()).orElse(null);
                case GRAMMAR -> grammarRepository.findById(contentId).map(g -> g.getLesson().getId()).orElse(null);
                case KANJI -> lessonKanjiRepository.findAll().stream()
                        .filter(lk -> lk.getKanji().getId().equals(contentId))
                        .map(lk -> lk.getLesson().getId())
                        .findFirst()
                        .orElse(null);
                case LISTENING -> listeningContentRepository.findById(contentId).map(l -> l.getLesson().getId()).orElse(null);
                case READING -> readingContentRepository.findById(contentId).map(r -> r.getLesson().getId()).orElse(null);
                case EXERCISE -> exerciseRepository.findById(contentId).map(e -> e.getLesson().getId()).orElse(null);
                default -> null;
            };

            if (lessonId != null) {
                lessonRepository.findById(lessonId).ifPresent(lesson -> calculateAndSyncLessonProgress(user, lesson));
            }
        } catch (Exception e) {
            // Ignore optional sync errors
        }
    }

    private int calculateCategoryMasteryForVocab(Long userId, List<Lesson> n5Lessons) {
        List<Long> allVocabIds = new ArrayList<>();
        for (Lesson lesson : n5Lessons) {
            List<Vocabulary> list = vocabularyRepository.findByLessonIdOrderByIdAsc(lesson.getId());
            list.forEach(v -> allVocabIds.add(v.getId()));
        }
        if (allVocabIds.isEmpty()) return 0;

        List<UserContentProgress> userProgs = userContentProgressRepository
                .findByUserIdAndContentTypeAndContentIdIn(userId, ContentType.VOCABULARY, allVocabIds);
        int sum = userProgs.stream().mapToInt(UserContentProgress::getProgressPercent).sum();
        return Math.max(0, Math.min(100, (int) Math.round((double) sum / allVocabIds.size())));
    }

    private int calculateCategoryMasteryForKanji(Long userId, List<Lesson> n5Lessons) {
        List<Long> allKanjiIds = new ArrayList<>();
        for (Lesson lesson : n5Lessons) {
            List<LessonKanji> list = lessonKanjiRepository.findByLessonIdOrderBySortOrderAsc(lesson.getId());
            list.forEach(lk -> allKanjiIds.add(lk.getKanji().getId()));
        }
        if (allKanjiIds.isEmpty()) return 0;

        List<UserContentProgress> userProgs = userContentProgressRepository
                .findByUserIdAndContentTypeAndContentIdIn(userId, ContentType.KANJI, allKanjiIds);
        int sum = userProgs.stream().mapToInt(UserContentProgress::getProgressPercent).sum();
        return Math.max(0, Math.min(100, (int) Math.round((double) sum / allKanjiIds.size())));
    }

    private int calculateCategoryMasteryForGrammar(Long userId, List<Lesson> n5Lessons) {
        List<Long> allGrammarIds = new ArrayList<>();
        for (Lesson lesson : n5Lessons) {
            List<Grammar> list = grammarRepository.findByLessonIdOrderBySortOrderAsc(lesson.getId());
            list.forEach(g -> allGrammarIds.add(g.getId()));
        }
        if (allGrammarIds.isEmpty()) return 0;

        List<UserContentProgress> userProgs = userContentProgressRepository
                .findByUserIdAndContentTypeAndContentIdIn(userId, ContentType.GRAMMAR, allGrammarIds);
        int sum = userProgs.stream().mapToInt(UserContentProgress::getProgressPercent).sum();
        return Math.max(0, Math.min(100, (int) Math.round((double) sum / allGrammarIds.size())));
    }

    private int calculateCategoryMasteryForListening(Long userId, List<Lesson> n5Lessons) {
        List<Long> allListeningIds = new ArrayList<>();
        for (Lesson lesson : n5Lessons) {
            List<ListeningContent> list = listeningContentRepository.findByLessonIdOrderBySortOrderAsc(lesson.getId());
            list.forEach(lc -> allListeningIds.add(lc.getId()));
        }
        if (allListeningIds.isEmpty()) return 0;

        List<UserContentProgress> userProgs = userContentProgressRepository
                .findByUserIdAndContentTypeAndContentIdIn(userId, ContentType.LISTENING, allListeningIds);
        int sum = userProgs.stream().mapToInt(UserContentProgress::getProgressPercent).sum();
        return Math.max(0, Math.min(100, (int) Math.round((double) sum / allListeningIds.size())));
    }

    private int calculateCategoryMasteryForReading(Long userId, List<Lesson> n5Lessons) {
        List<Long> allReadingIds = new ArrayList<>();
        for (Lesson lesson : n5Lessons) {
            List<ReadingContent> list = readingContentRepository.findByLessonIdOrderBySortOrderAsc(lesson.getId());
            list.forEach(rc -> allReadingIds.add(rc.getId()));
        }
        if (allReadingIds.isEmpty()) return 0;

        List<UserContentProgress> userProgs = userContentProgressRepository
                .findByUserIdAndContentTypeAndContentIdIn(userId, ContentType.READING, allReadingIds);
        int sum = userProgs.stream().mapToInt(UserContentProgress::getProgressPercent).sum();
        return Math.max(0, Math.min(100, (int) Math.round((double) sum / allReadingIds.size())));
    }

    private void validateSupportedContentType(ContentType contentType) {
        if (contentType == null || !SUPPORTED_CONTENT_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Loại nội dung không được hỗ trợ trong Progress V1: " + contentType);
        }
    }

    private void validateContentExists(ContentType contentType, Long contentId) {
        boolean exists = switch (contentType) {
            case VOCABULARY -> vocabularyRepository.existsById(contentId);
            case GRAMMAR -> grammarRepository.existsById(contentId);
            case KANJI -> kanjiRepository.existsById(contentId);
            case LISTENING -> listeningContentRepository.existsById(contentId);
            case READING -> readingContentRepository.existsById(contentId);
            case EXERCISE -> exerciseRepository.existsById(contentId);
            default -> false;
        };

        if (!exists) {
            throw new ResourceNotFoundException("Không tìm thấy " + getContentTypeDisplayName(contentType) + " với ID: " + contentId);
        }
    }

    private String getContentTypeDisplayName(ContentType contentType) {
        return switch (contentType) {
            case VOCABULARY -> "từ vựng";
            case GRAMMAR -> "ngữ pháp";
            case KANJI -> "Kanji";
            case LISTENING -> "bài nghe";
            case READING -> "bài đọc";
            case EXERCISE -> "bài tập";
            default -> "nội dung";
        };
    }

    private LessonProgressResponse mapToLessonProgressResponse(UserLessonProgress p) {
        return new LessonProgressResponse(
                p.getLesson().getId(),
                p.getLesson().getLessonNumber(),
                p.getLesson().getTitle(),
                p.getProgressPercent(),
                p.getStatus(),
                p.getLastAccessedAt(),
                p.getCompletedAt()
        );
    }

    private ContentProgressResponse mapToContentProgressResponse(UserContentProgress p) {
        return new ContentProgressResponse(
                p.getContentType(),
                p.getContentId(),
                p.getProgressPercent(),
                p.getStatus(),
                p.getLastAccessedAt(),
                p.getCompletedAt(),
                p.getPatternOpened(),
                p.getContentViewed(),
                p.getExamplesViewed()
        );
    }
}
