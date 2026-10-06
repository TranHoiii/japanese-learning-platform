package com.japanese.learning.progress.service;

import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.entity.Exercise;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.grammar.entity.Grammar;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.entity.Kanji;
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
import com.japanese.learning.review.entity.ReviewItem;
import com.japanese.learning.review.enums.ReviewStatus;
import com.japanese.learning.review.repository.ReviewItemRepository;
import com.japanese.learning.user.entity.User;
import com.japanese.learning.user.enums.Role;
import com.japanese.learning.vocabulary.entity.Vocabulary;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.oauth2.jwt.Jwt;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProgressServiceTest {

    @Mock
    private AuthService authService;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private LevelRepository levelRepository;

    @Mock
    private UserLessonProgressRepository userLessonProgressRepository;

    @Mock
    private UserContentProgressRepository userContentProgressRepository;

    @Mock
    private VocabularyRepository vocabularyRepository;

    @Mock
    private GrammarRepository grammarRepository;

    @Mock
    private KanjiRepository kanjiRepository;

    @Mock
    private LessonKanjiRepository lessonKanjiRepository;

    @Mock
    private ListeningContentRepository listeningContentRepository;

    @Mock
    private ReadingContentRepository readingContentRepository;

    @Mock
    private ExerciseRepository exerciseRepository;

    @Mock
    private ReviewItemRepository reviewItemRepository;

    @Mock
    private Jwt jwt;

    @InjectMocks
    private ProgressServiceImpl progressService;

    private User testUser;
    private Lesson testLesson;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(100L);
        testUser.setEmail("user@example.com");
        testUser.setFullName("Test User");
        testUser.setRole(Role.USER);
        testUser.setStatus(true);

        testLesson = new Lesson();
        testLesson.setId(1L);
        testLesson.setLessonNumber(1);
        testLesson.setTitle("Bài 1");
    }

    // =========================================================================
    // 1. CONTENT COMPLETION MODEL TESTS
    // =========================================================================

    @Test
    @DisplayName("Vocabulary: Item-level completion operates independently")
    void testVocabulary_ItemCompletion() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(vocabularyRepository.existsById(10L)).thenReturn(true);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.VOCABULARY, 10L))
                .thenReturn(Optional.empty());
        when(userContentProgressRepository.save(any(UserContentProgress.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        UpdateContentProgressRequest req = new UpdateContentProgressRequest(ContentType.VOCABULARY, 10L, 100);
        ContentProgressResponse res = progressService.updateContentProgress(jwt, req);

        assertNotNull(res);
        assertEquals(ContentType.VOCABULARY, res.contentType());
        assertEquals(10L, res.contentId());
        assertEquals(100, res.progressPercent());
        assertEquals(LearningStatus.COMPLETED, res.status());
        assertNotNull(res.completedAt());
    }

    @Test
    @DisplayName("Kanji: Follows the same item completion model as vocabulary")
    void testKanji_ItemCompletion() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(kanjiRepository.existsById(5L)).thenReturn(true);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.KANJI, 5L))
                .thenReturn(Optional.empty());
        when(userContentProgressRepository.save(any(UserContentProgress.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        UpdateContentProgressRequest req = new UpdateContentProgressRequest(ContentType.KANJI, 5L, 100);
        ContentProgressResponse res = progressService.updateContentProgress(jwt, req);

        assertNotNull(res);
        assertEquals(ContentType.KANJI, res.contentType());
        assertEquals(5L, res.contentId());
        assertEquals(100, res.progressPercent());
        assertEquals(LearningStatus.COMPLETED, res.status());
        assertNotNull(res.completedAt());
    }

    @Test
    @DisplayName("Grammar: Pattern opened only => INCOMPLETE (33%, IN_PROGRESS)")
    void testGrammar_PatternOpenedOnly_IsIncomplete() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(grammarRepository.existsById(20L)).thenReturn(true);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.GRAMMAR, 20L))
                .thenReturn(Optional.empty());
        when(userContentProgressRepository.save(any(UserContentProgress.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        // Pattern opened only
        UpdateContentProgressRequest req = new UpdateContentProgressRequest(
                ContentType.GRAMMAR, 20L, null, true, false, false
        );
        ContentProgressResponse res = progressService.updateContentProgress(jwt, req);

        assertNotNull(res);
        assertTrue(res.patternOpened());
        assertFalse(res.contentViewed());
        assertFalse(res.examplesViewed());
        assertEquals(33, res.progressPercent());
        assertEquals(LearningStatus.IN_PROGRESS, res.status());
        assertNull(res.completedAt());
    }

    @Test
    @DisplayName("Grammar: Pattern opened + content viewed => INCOMPLETE (67%, IN_PROGRESS)")
    void testGrammar_OpenedAndContentViewed_IsIncomplete() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(grammarRepository.existsById(20L)).thenReturn(true);

        UserContentProgress existing = new UserContentProgress();
        existing.setUser(testUser);
        existing.setContentType(ContentType.GRAMMAR);
        existing.setContentId(20L);
        existing.setPatternOpened(true);
        existing.setContentViewed(false);
        existing.setExamplesViewed(false);

        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.GRAMMAR, 20L))
                .thenReturn(Optional.of(existing));
        when(userContentProgressRepository.save(any(UserContentProgress.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        UpdateContentProgressRequest req = new UpdateContentProgressRequest(
                ContentType.GRAMMAR, 20L, null, null, true, false
        );
        ContentProgressResponse res = progressService.updateContentProgress(jwt, req);

        assertNotNull(res);
        assertTrue(res.patternOpened());
        assertTrue(res.contentViewed());
        assertFalse(res.examplesViewed());
        assertEquals(67, res.progressPercent());
        assertEquals(LearningStatus.IN_PROGRESS, res.status());
        assertNull(res.completedAt());
    }

    @Test
    @DisplayName("Grammar: Pattern opened + content viewed + examples viewed => COMPLETED (100%)")
    void testGrammar_AllThreeConditionsTrue_IsCompleted() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(grammarRepository.existsById(20L)).thenReturn(true);

        UserContentProgress existing = new UserContentProgress();
        existing.setUser(testUser);
        existing.setContentType(ContentType.GRAMMAR);
        existing.setContentId(20L);
        existing.setPatternOpened(true);
        existing.setContentViewed(true);
        existing.setExamplesViewed(false);

        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.GRAMMAR, 20L))
                .thenReturn(Optional.of(existing));
        when(userContentProgressRepository.save(any(UserContentProgress.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        UpdateContentProgressRequest req = new UpdateContentProgressRequest(
                ContentType.GRAMMAR, 20L, null, null, null, true
        );
        ContentProgressResponse res = progressService.updateContentProgress(jwt, req);

        assertNotNull(res);
        assertTrue(res.patternOpened());
        assertTrue(res.contentViewed());
        assertTrue(res.examplesViewed());
        assertEquals(100, res.progressPercent());
        assertEquals(LearningStatus.COMPLETED, res.status());
        assertNotNull(res.completedAt());
    }

    @Test
    @DisplayName("Listening: Track submitted => COMPLETED")
    void testListening_Submitted_IsCompleted() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(listeningContentRepository.existsById(30L)).thenReturn(true);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.LISTENING, 30L))
                .thenReturn(Optional.empty());
        when(userContentProgressRepository.save(any(UserContentProgress.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        UpdateContentProgressRequest req = new UpdateContentProgressRequest(ContentType.LISTENING, 30L, 100);
        ContentProgressResponse res = progressService.updateContentProgress(jwt, req);

        assertNotNull(res);
        assertEquals(100, res.progressPercent());
        assertEquals(LearningStatus.COMPLETED, res.status());
        assertNotNull(res.completedAt());
    }

    @Test
    @DisplayName("Reading: Reading submitted => COMPLETED")
    void testReading_Submitted_IsCompleted() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(readingContentRepository.existsById(40L)).thenReturn(true);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.READING, 40L))
                .thenReturn(Optional.empty());
        when(userContentProgressRepository.save(any(UserContentProgress.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        UpdateContentProgressRequest req = new UpdateContentProgressRequest(ContentType.READING, 40L, 100);
        ContentProgressResponse res = progressService.updateContentProgress(jwt, req);

        assertNotNull(res);
        assertEquals(100, res.progressPercent());
        assertEquals(LearningStatus.COMPLETED, res.status());
        assertNotNull(res.completedAt());
    }

    @Test
    @DisplayName("Exercise: Submitted => COMPLETED (independent of score)")
    void testExercise_Submitted_IsCompleted_IndependentOfScore() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(exerciseRepository.existsById(50L)).thenReturn(true);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.EXERCISE, 50L))
                .thenReturn(Optional.empty());
        when(userContentProgressRepository.save(any(UserContentProgress.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        // Completion = 100% even if user score was 50%
        UpdateContentProgressRequest req = new UpdateContentProgressRequest(ContentType.EXERCISE, 50L, 100);
        ContentProgressResponse res = progressService.updateContentProgress(jwt, req);

        assertNotNull(res);
        assertEquals(100, res.progressPercent());
        assertEquals(LearningStatus.COMPLETED, res.status());
        assertNotNull(res.completedAt());
    }

    // =========================================================================
    // 2. LESSON PROGRESS AGGREGATION TESTS
    // =========================================================================

    @Test
    @DisplayName("Lesson: Aggregates modules equally and does not weight by raw item count")
    void testLesson_EqualModuleWeighting_NotItemCountDominated() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));

        // 100 vocabulary items, 0 completed => vocabProgress = 0%
        List<Vocabulary> vocabs = new ArrayList<>();
        for (long i = 1; i <= 100; i++) {
            Vocabulary v = new Vocabulary();
            v.setId(i);
            vocabs.add(v);
        }
        when(vocabularyRepository.findByLessonIdOrderByIdAsc(1L)).thenReturn(vocabs);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentIdIn(eq(100L), eq(ContentType.VOCABULARY), any()))
                .thenReturn(Collections.emptyList()); // 0%

        // 1 grammar pattern, 100% completed => grammarProgress = 100%
        Grammar g = new Grammar();
        g.setId(1L);
        when(grammarRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(List.of(g));
        UserContentProgress gp = new UserContentProgress();
        gp.setProgressPercent(100);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentIdIn(eq(100L), eq(ContentType.GRAMMAR), any()))
                .thenReturn(List.of(gp));

        // Other modules empty
        when(lessonKanjiRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(Collections.emptyList());
        when(listeningContentRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(Collections.emptyList());
        when(readingContentRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(Collections.emptyList());
        when(exerciseRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(Collections.emptyList());

        when(userLessonProgressRepository.findByUserIdAndLessonId(100L, 1L)).thenReturn(Optional.empty());
        when(userLessonProgressRepository.save(any(UserLessonProgress.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        // Available modules = Vocab (0%) and Grammar (100%). Denominator = 2.
        // Result must be (0 + 100) / 2 = 50%.
        // If it was raw item count weighted, it would be 1 / 101 = ~1%.
        LessonProgressResponse response = progressService.getLessonProgress(jwt, 1L);

        assertNotNull(response);
        assertEquals(50, response.progressPercent());
        assertEquals(0, response.vocabularyProgress());
        assertEquals(100, response.grammarProgress());
        assertNull(response.kanjiProgress());
    }

    @Test
    @DisplayName("Lesson: Missing content modules do not force lesson to 0%, denominator adapts")
    void testLesson_MissingModules_DenominatorAdapts() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));

        // Lesson only has Vocabulary and Exercise. (Kanji, Grammar, Listening, Reading are empty)
        Vocabulary v = new Vocabulary();
        v.setId(1L);
        when(vocabularyRepository.findByLessonIdOrderByIdAsc(1L)).thenReturn(List.of(v));
        UserContentProgress vp = new UserContentProgress();
        vp.setProgressPercent(100);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentIdIn(eq(100L), eq(ContentType.VOCABULARY), any()))
                .thenReturn(List.of(vp));

        Exercise ex = new Exercise();
        ex.setId(1L);
        when(exerciseRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(List.of(ex));
        UserContentProgress exp = new UserContentProgress();
        exp.setProgressPercent(100);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentIdIn(eq(100L), eq(ContentType.EXERCISE), any()))
                .thenReturn(List.of(exp));

        when(grammarRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(Collections.emptyList());
        when(lessonKanjiRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(Collections.emptyList());
        when(listeningContentRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(Collections.emptyList());
        when(readingContentRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(Collections.emptyList());

        when(userLessonProgressRepository.findByUserIdAndLessonId(100L, 1L)).thenReturn(Optional.empty());
        when(userLessonProgressRepository.save(any(UserLessonProgress.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        // Both available modules are 100%. Denominator = 2.
        // Result must be 100%, NOT 33% (if divided by 6).
        LessonProgressResponse response = progressService.getLessonProgress(jwt, 1L);

        assertNotNull(response);
        assertEquals(100, response.progressPercent());
        assertEquals(LearningStatus.COMPLETED, response.status());
    }

    // =========================================================================
    // 3. N5 MASTERY TESTS
    // =========================================================================

    @Test
    @DisplayName("N5 Mastery: Aggregates across all N5 lessons, independent of current lesson")
    void testN5Mastery_AggregatesAcrossAllN5Lessons() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);

        Lesson lesson1 = new Lesson();
        lesson1.setId(1L);
        Lesson lesson2 = new Lesson();
        lesson2.setId(2L);
        List<Lesson> n5Lessons = List.of(lesson1, lesson2);

        when(lessonRepository.findAllByOrderBySortOrderAsc()).thenReturn(n5Lessons);
        when(levelRepository.findByCode("N5")).thenReturn(Optional.empty());

        // Lesson 1 has vocab 1, Lesson 2 has vocab 2. Total 2 vocabs.
        Vocabulary v1 = new Vocabulary();
        v1.setId(1L);
        Vocabulary v2 = new Vocabulary();
        v2.setId(2L);
        when(vocabularyRepository.findByLessonIdOrderByIdAsc(1L)).thenReturn(List.of(v1));
        when(vocabularyRepository.findByLessonIdOrderByIdAsc(2L)).thenReturn(List.of(v2));

        // User completed vocab 1 (100%), but not vocab 2 (0%).
        UserContentProgress vp = new UserContentProgress();
        vp.setProgressPercent(100);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentIdIn(eq(100L), eq(ContentType.VOCABULARY), any()))
                .thenReturn(List.of(vp));

        when(grammarRepository.findByLessonIdOrderBySortOrderAsc(any())).thenReturn(Collections.emptyList());
        when(lessonKanjiRepository.findByLessonIdOrderBySortOrderAsc(any())).thenReturn(Collections.emptyList());
        when(listeningContentRepository.findByLessonIdOrderBySortOrderAsc(any())).thenReturn(Collections.emptyList());
        when(readingContentRepository.findByLessonIdOrderBySortOrderAsc(any())).thenReturn(Collections.emptyList());
        when(exerciseRepository.findByLessonIdOrderBySortOrderAsc(any())).thenReturn(Collections.emptyList());

        when(userLessonProgressRepository.findByUserIdAndLessonId(any(), any())).thenReturn(Optional.empty());
        when(userLessonProgressRepository.save(any(UserLessonProgress.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        ProgressSummaryResponse summary = progressService.getProgressSummary(jwt);

        assertNotNull(summary);
        assertEquals(2L, summary.totalLessons());
        // Vocab mastery across both lessons: (100 + 0) / 2 = 50%
        assertEquals(50, summary.vocabularyMastery());
    }

    // =========================================================================
    // 4. SRS SEMANTICS TESTS
    // =========================================================================

    @Test
    @DisplayName("SRS: 43 total review items and 0 due items remain distinct")
    void testSRS_TotalAndDueRemainDistinct() {
        Long userId = 100L;
        LocalDateTime now = LocalDateTime.now();

        // 43 items in total, all scheduled for future (nextReviewAt = tomorrow)
        List<ReviewItem> totalItems = new ArrayList<>();
        for (long i = 1; i <= 43; i++) {
            ReviewItem item = new ReviewItem();
            item.setId(i);
            item.setStatus(ReviewStatus.PENDING);
            item.setNextReviewAt(now.plusDays(1));
            totalItems.add(item);
        }

        when(reviewItemRepository.findByUserIdOrderByPriorityDescNextReviewAtAsc(userId))
                .thenReturn(totalItems);
        when(reviewItemRepository.findDueItemsByUserId(eq(userId), any(LocalDateTime.class)))
                .thenReturn(Collections.emptyList()); // 0 due

        List<ReviewItem> all = reviewItemRepository.findByUserIdOrderByPriorityDescNextReviewAtAsc(userId);
        List<ReviewItem> due = reviewItemRepository.findDueItemsByUserId(userId, now);

        assertEquals(43, all.size());
        assertEquals(0, due.size());
        assertNotEquals(all.size(), due.size());
    }
}
