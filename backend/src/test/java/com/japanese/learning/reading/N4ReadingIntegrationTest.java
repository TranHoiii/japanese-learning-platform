package com.japanese.learning.reading;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.enums.QuestionType;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.favorite.dto.CreateFavoriteRequest;
import com.japanese.learning.favorite.dto.FavoriteResponse;
import com.japanese.learning.favorite.entity.Favorite;
import com.japanese.learning.favorite.repository.FavoriteRepository;
import com.japanese.learning.favorite.service.FavoriteServiceImpl;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.kanji.repository.LessonKanjiRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.progress.dto.ContentProgressResponse;
import com.japanese.learning.progress.dto.UpdateContentProgressRequest;
import com.japanese.learning.progress.entity.UserContentProgress;
import com.japanese.learning.progress.enums.LearningStatus;
import com.japanese.learning.progress.repository.UserContentProgressRepository;
import com.japanese.learning.progress.repository.UserLessonProgressRepository;
import com.japanese.learning.progress.service.ProgressServiceImpl;
import com.japanese.learning.reading.config.N4ReadingDataSeeder;
import com.japanese.learning.reading.dto.*;
import com.japanese.learning.reading.entity.ReadingContent;
import com.japanese.learning.reading.entity.ReadingOption;
import com.japanese.learning.reading.entity.ReadingQuestion;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.reading.service.ReadingServiceImpl;
import com.japanese.learning.search.dto.SearchResponse;
import com.japanese.learning.search.service.SearchServiceImpl;
import com.japanese.learning.user.entity.User;
import com.japanese.learning.user.enums.Role;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.oauth2.jwt.Jwt;

import java.io.InputStream;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class N4ReadingIntegrationTest {

    @Mock
    private ReadingContentRepository readingContentRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private LevelRepository levelRepository;

    @Mock
    private FavoriteRepository favoriteRepository;

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
    private ExerciseRepository exerciseRepository;

    @Mock
    private UserContentProgressRepository userContentProgressRepository;

    @Mock
    private UserLessonProgressRepository userLessonProgressRepository;

    @Mock
    private AuthService authService;

    @Mock
    private ReadingContentMapper readingContentMapper;

    private ReadingServiceImpl readingService;
    private SearchServiceImpl searchService;
    private FavoriteServiceImpl favoriteService;
    private ProgressServiceImpl progressService;
    private ObjectMapper objectMapper;

    private Level n4Level;
    private Lesson n4Lesson26;
    private ReadingContent n4Content1;
    private User testUser;
    private Jwt jwt;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        readingService = new ReadingServiceImpl(readingContentRepository, lessonRepository, readingContentMapper);
        searchService = new SearchServiceImpl(
                vocabularyRepository,
                grammarRepository,
                kanjiRepository,
                listeningContentRepository,
                readingContentRepository,
                exerciseRepository
        );
        favoriteService = new FavoriteServiceImpl(
                authService,
                favoriteRepository,
                vocabularyRepository,
                grammarRepository,
                kanjiRepository,
                listeningContentRepository,
                readingContentRepository,
                exerciseRepository
        );
        progressService = new ProgressServiceImpl(
                authService,
                lessonRepository,
                levelRepository,
                userLessonProgressRepository,
                userContentProgressRepository,
                vocabularyRepository,
                grammarRepository,
                kanjiRepository,
                lessonKanjiRepository,
                listeningContentRepository,
                readingContentRepository,
                exerciseRepository
        );

        n4Level = new Level();
        n4Level.setId(2L);
        n4Level.setCode("N4");
        n4Level.setName("N4");

        n4Lesson26 = new Lesson();
        n4Lesson26.setId(26L);
        n4Lesson26.setLessonNumber(26);
        n4Lesson26.setLevel(n4Level);
        n4Lesson26.setTitle("Bài 26");

        n4Content1 = new ReadingContent();
        n4Content1.setId(101L);
        n4Content1.setLesson(n4Lesson26);
        n4Content1.setTitle("宇宙ステーションの生活はどうですか");
        n4Content1.setContent("地球から400キロ上を飛んでいます。");
        n4Content1.setSortOrder(1);

        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setRole(Role.USER);

        Map<String, Object> headers = Map.of("alg", "none");
        Map<String, Object> claims = Map.of("sub", "test@example.com");
        jwt = new Jwt("mock-token", Instant.now(), Instant.now().plusSeconds(3600), headers, claims);
    }

    // =========================================================================
    // 1. DATA INTEGRITY TESTS FOR N4 READING JSON
    // =========================================================================

    @Test
    @DisplayName("Verify N4 reading JSON data integrity (25 lessons, 44 reading items, 112 questions, options)")
    void testN4ReadingJsonDataIntegrity() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n4-reading.json");
        assertTrue(resource.exists(), "n4-reading.json must exist in classpath");

        List<N4ReadingDataSeeder.LessonReadingGroup> groups;
        try (InputStream inputStream = resource.getInputStream()) {
            groups = objectMapper.readValue(inputStream, new TypeReference<List<N4ReadingDataSeeder.LessonReadingGroup>>() {});
        }

        assertNotNull(groups);
        assertEquals(25, groups.size(), "N4 Reading must have exactly 25 lessons (Lessons 26 to 50)");

        int totalItems = 0;
        int totalQuestions = 0;
        int totalOptions = 0;

        for (int i = 0; i < groups.size(); i++) {
            N4ReadingDataSeeder.LessonReadingGroup group = groups.get(i);
            int expectedLessonNum = 26 + i;
            assertEquals(expectedLessonNum, group.lessonNumber(), "Lesson number must match sequence 26..50");
            assertTrue(group.items() != null && !group.items().isEmpty(), "Lesson " + expectedLessonNum + " must have items");

            for (N4ReadingDataSeeder.ReadingItemPayload item : group.items()) {
                totalItems++;
                assertNotNull(item.title(), "Title cannot be null");
                assertFalse(item.title().isBlank(), "Title cannot be blank");
                assertNotNull(item.content(), "Content cannot be null");
                assertFalse(item.content().isBlank(), "Content cannot be blank");
                assertNotNull(item.sortOrder(), "Sort order must not be null");

                if (item.questions() != null) {
                    for (N4ReadingDataSeeder.QuestionPayload q : item.questions()) {
                        totalQuestions++;
                        assertNotNull(q.question(), "Question prompt cannot be null");
                        assertFalse(q.question().isBlank(), "Question prompt cannot be blank");
                        assertNotNull(q.options(), "Options cannot be null");
                        assertTrue(q.options().size() >= 2, "Question must have at least 2 options");

                        long correctCount = q.options().stream().filter(o -> Boolean.TRUE.equals(o.correct())).count();
                        assertEquals(1, correctCount, "Question must have exactly 1 correct option: " + q.question());

                        totalOptions += q.options().size();
                    }
                }
            }
        }

        assertEquals(44, totalItems, "Total N4 reading items across 25 lessons must be 44");
        assertEquals(112, totalQuestions, "Total N4 reading questions must be 112");
        assertEquals(328, totalOptions, "Total N4 reading options must be 328");
    }

    // =========================================================================
    // 2. SEEDER IDEMPOTENCY & RESTORATION TESTS
    // =========================================================================

    @Test
    @DisplayName("N4ReadingDataSeeder seeds data when not existing")
    void testSeederRunsAndInsertsData() throws Exception {
        when(levelRepository.findByCode("N4")).thenReturn(Optional.of(n4Level));

        for (int l = 26; l <= 50; l++) {
            Lesson lesson = new Lesson();
            lesson.setId((long) l);
            lesson.setLessonNumber(l);
            lesson.setLevel(n4Level);
            lesson.setTitle("Bài " + l);
            when(lessonRepository.findByLevelIdAndLessonNumber(eq(2L), eq(l))).thenReturn(Optional.of(lesson));
        }

        when(readingContentRepository.existsByLessonIdAndTitle(anyLong(), anyString())).thenReturn(false);

        N4ReadingDataSeeder seeder = new N4ReadingDataSeeder(
                levelRepository,
                lessonRepository,
                readingContentRepository,
                objectMapper
        );

        seeder.run();

        verify(readingContentRepository, times(44)).save(any(ReadingContent.class));
    }

    @Test
    @DisplayName("N4ReadingDataSeeder skips data when already existing (Idempotent)")
    void testSeederSkipsExistingData() throws Exception {
        when(levelRepository.findByCode("N4")).thenReturn(Optional.of(n4Level));

        for (int l = 26; l <= 50; l++) {
            Lesson lesson = new Lesson();
            lesson.setId((long) l);
            lesson.setLessonNumber(l);
            lesson.setLevel(n4Level);
            lesson.setTitle("Bài " + l);
            when(lessonRepository.findByLevelIdAndLessonNumber(eq(2L), eq(l))).thenReturn(Optional.of(lesson));
        }

        when(readingContentRepository.existsByLessonIdAndTitle(anyLong(), anyString())).thenReturn(true);

        N4ReadingDataSeeder seeder = new N4ReadingDataSeeder(
                levelRepository,
                lessonRepository,
                readingContentRepository,
                objectMapper
        );

        seeder.run();

        verify(readingContentRepository, never()).save(any(ReadingContent.class));
    }

    // =========================================================================
    // 3. READING SERVICE TESTS
    // =========================================================================

    @Test
    @DisplayName("getReadingsByLessonId returns reading items for N4 lesson")
    void testGetReadingsByLessonId() {
        Long lessonId = 26L;
        when(lessonRepository.existsById(lessonId)).thenReturn(true);

        ReadingContent item1 = new ReadingContent();
        item1.setId(101L);
        item1.setTitle("宇宙ステーションの生活はどうですか");

        ReadingContent item2 = new ReadingContent();
        item2.setId(102L);
        item2.setTitle("クイズ 宇宙");

        when(readingContentRepository.findByLessonIdOrderBySortOrderAsc(lessonId))
                .thenReturn(List.of(item1, item2));

        ReadingContentResponse resp1 = ReadingContentResponse.builder().id(101L).title("宇宙ステーションの生活はどうですか").build();
        ReadingContentResponse resp2 = ReadingContentResponse.builder().id(102L).title("クイズ 宇宙").build();

        when(readingContentMapper.toResponse(item1)).thenReturn(resp1);
        when(readingContentMapper.toResponse(item2)).thenReturn(resp2);

        List<ReadingContentResponse> responses = readingService.getReadingsByLessonId(lessonId);

        assertNotNull(responses);
        assertEquals(2, responses.size());
        assertEquals("宇宙ステーションの生活はどうですか", responses.get(0).getTitle());
        assertEquals("クイズ 宇宙", responses.get(1).getTitle());
    }

    @Test
    @DisplayName("submitReading calculates correct score and results")
    void testSubmitReadingScoring() {
        Long readingId = 101L;

        ReadingOption opt1 = new ReadingOption();
        opt1.setId(1L);
        opt1.setContent("〇");
        opt1.setCorrect(false);
        opt1.setSortOrder(1);

        ReadingOption opt2 = new ReadingOption();
        opt2.setId(2L);
        opt2.setContent("✕");
        opt2.setCorrect(true);
        opt2.setSortOrder(2);

        ReadingQuestion q1 = new ReadingQuestion();
        q1.setId(10L);
        q1.setQuestion("Q1");
        q1.setQuestionType(QuestionType.MULTIPLE_CHOICE);
        q1.setExplanation("Giải thích 1");
        q1.setOptions(new ArrayList<>(List.of(opt1, opt2)));

        ReadingOption opt3 = new ReadingOption();
        opt3.setId(3L);
        opt3.setContent("〇");
        opt3.setCorrect(true);
        opt3.setSortOrder(1);

        ReadingOption opt4 = new ReadingOption();
        opt4.setId(4L);
        opt4.setContent("✕");
        opt4.setCorrect(false);
        opt4.setSortOrder(2);

        ReadingQuestion q2 = new ReadingQuestion();
        q2.setId(20L);
        q2.setQuestion("Q2");
        q2.setQuestionType(QuestionType.MULTIPLE_CHOICE);
        q2.setExplanation("Giải thích 2");
        q2.setOptions(new ArrayList<>(List.of(opt3, opt4)));

        ReadingContent content = new ReadingContent();
        content.setId(readingId);
        content.setQuestions(new ArrayList<>(List.of(q1, q2)));

        when(readingContentRepository.findById(readingId)).thenReturn(Optional.of(content));

        ReadingSubmitRequest request = new ReadingSubmitRequest();
        ReadingAnswerRequest a1 = new ReadingAnswerRequest();
        a1.setQuestionId(10L);
        a1.setSelectedOptionId(2L); // Correct (opt2 is correct)

        ReadingAnswerRequest a2 = new ReadingAnswerRequest();
        a2.setQuestionId(20L);
        a2.setSelectedOptionId(4L); // Incorrect (opt3 is correct)

        request.setAnswers(List.of(a1, a2));

        ReadingSubmitResponse submitResponse = readingService.submitReading(readingId, request);

        assertNotNull(submitResponse);
        assertEquals(2, submitResponse.getTotalQuestions());
        assertEquals(1, submitResponse.getCorrectCount());
        assertEquals(1, submitResponse.getWrongCount());
        assertEquals(50, submitResponse.getScore());

        assertEquals(2, submitResponse.getResults().size());
        assertTrue(submitResponse.getResults().get(0).isCorrect());
        assertFalse(submitResponse.getResults().get(1).isCorrect());
    }

    @Test
    @DisplayName("submitReading throws IllegalArgumentException if option does not belong to question")
    void testSubmitReadingInvalidOptionThrows() {
        Long readingId = 101L;

        ReadingOption opt1 = new ReadingOption();
        opt1.setId(1L);
        opt1.setContent("〇");
        opt1.setCorrect(true);

        ReadingQuestion q1 = new ReadingQuestion();
        q1.setId(10L);
        q1.setOptions(new ArrayList<>(List.of(opt1)));

        ReadingContent content = new ReadingContent();
        content.setId(readingId);
        content.setQuestions(new ArrayList<>(List.of(q1)));

        when(readingContentRepository.findById(readingId)).thenReturn(Optional.of(content));

        ReadingSubmitRequest request = new ReadingSubmitRequest();
        ReadingAnswerRequest a1 = new ReadingAnswerRequest();
        a1.setQuestionId(10L);
        a1.setSelectedOptionId(999L); // Invalid option
        request.setAnswers(List.of(a1));

        assertThrows(IllegalArgumentException.class, () -> readingService.submitReading(readingId, request));
    }

    // =========================================================================
    // 4. SEARCH SERVICE N4 READING REUSE TEST
    // =========================================================================

    @Test
    @DisplayName("SearchService returns N4 reading content when searching with level N4")
    void testSearchN4Reading() {
        when(readingContentRepository.searchByKeyword("宇宙", "N4")).thenReturn(List.of(n4Content1));

        SearchResponse response = searchService.search("宇宙", "READING", "N4", 0, 10);

        assertNotNull(response);
        assertEquals(1, response.total());
        assertEquals("宇宙ステーションの生活はどうですか", response.items().get(0).title());
        assertEquals(ContentType.READING, response.items().get(0).contentType());
    }

    // =========================================================================
    // 5. PROGRESS SERVICE READING REUSE TEST
    // =========================================================================

    @Test
    @DisplayName("ProgressService handles READING content progress")
    void testProgressTrackingForReading() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(readingContentRepository.existsById(101L)).thenReturn(true);
        when(readingContentRepository.findById(101L)).thenReturn(Optional.of(n4Content1));

        UserContentProgress progress = new UserContentProgress();
        progress.setId(1L);
        progress.setUser(testUser);
        progress.setContentType(ContentType.READING);
        progress.setContentId(101L);
        progress.setStatus(LearningStatus.NOT_STARTED);
        progress.setProgressPercent(0);

        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(1L, ContentType.READING, 101L))
                .thenReturn(Optional.of(progress));
        when(userContentProgressRepository.save(any(UserContentProgress.class))).thenAnswer(i -> i.getArgument(0));

        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.READING, 101L, 100);
        ContentProgressResponse resp = progressService.updateContentProgress(jwt, request);

        assertNotNull(resp);
        assertEquals(100, resp.progressPercent());
        assertEquals(LearningStatus.COMPLETED, resp.status());
    }

    // =========================================================================
    // 6. FAVORITE SERVICE READING REUSE TEST
    // =========================================================================

    @Test
    @DisplayName("FavoriteService allows bookmarking N4 READING content")
    void testFavoriteReading() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(readingContentRepository.existsById(101L)).thenReturn(true);
        when(favoriteRepository.findByUserIdAndContentTypeAndContentId(1L, ContentType.READING, 101L))
                .thenReturn(Optional.empty());

        Favorite saved = new Favorite();
        saved.setId(10L);
        saved.setUser(testUser);
        saved.setContentType(ContentType.READING);
        saved.setContentId(101L);
        saved.setCreatedAt(LocalDateTime.now());

        when(favoriteRepository.save(any(Favorite.class))).thenReturn(saved);

        CreateFavoriteRequest req = new CreateFavoriteRequest(ContentType.READING, 101L);
        FavoriteResponse resp = favoriteService.addFavorite(jwt, req);

        assertNotNull(resp);
        assertEquals(ContentType.READING, resp.contentType());
        assertEquals(101L, resp.contentId());
    }
}
