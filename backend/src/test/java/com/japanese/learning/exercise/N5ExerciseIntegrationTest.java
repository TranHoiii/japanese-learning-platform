package com.japanese.learning.exercise;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.dto.AdminExerciseResponse;
import com.japanese.learning.admin.service.AdminExerciseService;
import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.exercise.dto.*;
import com.japanese.learning.exercise.entity.Exercise;
import com.japanese.learning.exercise.entity.Question;
import com.japanese.learning.exercise.entity.QuestionOption;
import com.japanese.learning.exercise.enums.ExerciseType;
import com.japanese.learning.exercise.enums.QuestionType;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.exercise.repository.QuestionOptionRepository;
import com.japanese.learning.exercise.repository.QuestionRepository;
import com.japanese.learning.exercise.service.ExerciseServiceImpl;
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
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.search.dto.SearchResponse;
import com.japanese.learning.search.service.SearchServiceImpl;
import com.japanese.learning.user.entity.User;
import com.japanese.learning.user.enums.Role;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.InputStream;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class N5ExerciseIntegrationTest {

    @Mock
    private ExerciseRepository exerciseRepository;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private QuestionOptionRepository questionOptionRepository;

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
    private ReadingContentRepository readingContentRepository;

    @Mock
    private UserContentProgressRepository userContentProgressRepository;

    @Mock
    private UserLessonProgressRepository userLessonProgressRepository;

    @Mock
    private AuthService authService;

    private ExerciseServiceImpl exerciseService;
    private AdminExerciseService adminExerciseService;
    private SearchServiceImpl searchService;
    private FavoriteServiceImpl favoriteService;
    private ProgressServiceImpl progressService;
    private ObjectMapper objectMapper;

    private final ExerciseMapper exerciseMapper = Mappers.getMapper(ExerciseMapper.class);
    private final QuestionMapper questionMapper = Mappers.getMapper(QuestionMapper.class);

    private Level n5Level;
    private Lesson n5Lesson1;
    private Exercise n5Exercise1;
    private Exercise n5Exercise28;
    private User testUser;
    private Jwt jwt;

    @BeforeEach
    void setUp() {
        QuestionOptionMapper questionOptionMapper = Mappers.getMapper(QuestionOptionMapper.class);
        ReflectionTestUtils.setField(questionMapper, "questionOptionMapper", questionOptionMapper);
        ReflectionTestUtils.setField(exerciseMapper, "questionMapper", questionMapper);

        objectMapper = new ObjectMapper();
        exerciseService = new ExerciseServiceImpl(exerciseRepository, questionRepository, exerciseMapper, questionMapper);
        adminExerciseService = new AdminExerciseService(
                exerciseRepository,
                questionRepository,
                lessonRepository
        );
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

        n5Level = new Level();
        n5Level.setId(1L);
        n5Level.setCode("N5");
        n5Level.setName("N5");

        n5Lesson1 = new Lesson();
        n5Lesson1.setId(1L);
        n5Lesson1.setLessonNumber(1);
        n5Lesson1.setLevel(n5Level);
        n5Lesson1.setTitle("Bài 01");

        n5Exercise1 = new Exercise();
        n5Exercise1.setId(1L);
        n5Exercise1.setLesson(n5Lesson1);
        n5Exercise1.setTitle("Bài 01–02");
        n5Exercise1.setDescription("Bài tập Minna no Nihongo N5 - Bài 1 & 2");
        n5Exercise1.setExerciseType(ExerciseType.LESSON);
        n5Exercise1.setContentType(com.japanese.learning.exercise.enums.ContentType.EXERCISE);
        n5Exercise1.setSortOrder(1);

        Question q1 = new Question();
        q1.setId(101L);
        q1.setExercise(n5Exercise1);
        q1.setQuestionText("1. Nhìn tranh và chọn từ tương ứng:\n1) 本 2) 辞書 3) 雑誌");
        q1.setQuestionType(QuestionType.MULTIPLE_CHOICE);
        q1.setExplanation("1) ほん\n2) じしょ");
        q1.setSortOrder(1);

        QuestionOption opt1 = new QuestionOption();
        opt1.setId(201L);
        opt1.setQuestion(q1);
        opt1.setOptionText("1) ほん / 2) じしょ");
        opt1.setCorrect(true);
        opt1.setSortOrder(1);
        q1.setOptions(List.of(opt1));

        n5Exercise1.setQuestions(List.of(q1));

        // Exercise 28 (Comprehensive Review 1-25)
        Lesson n5Lesson25 = new Lesson();
        n5Lesson25.setId(25L);
        n5Lesson25.setLessonNumber(25);
        n5Lesson25.setLevel(n5Level);
        n5Lesson25.setTitle("Bài 25");

        n5Exercise28 = new Exercise();
        n5Exercise28.setId(28L);
        n5Exercise28.setLesson(n5Lesson25);
        n5Exercise28.setTitle("総復習 (1課〜25課)");
        n5Exercise28.setDescription("Bài ôn tập tổng hợp toàn bộ kiến thức 1-25 giáo trình Minna no Nihongo");
        n5Exercise28.setExerciseType(ExerciseType.REVIEW);
        n5Exercise28.setContentType(com.japanese.learning.exercise.enums.ContentType.GRAMMAR);
        n5Exercise28.setSortOrder(28);

        Question q28_1 = new Question();
        q28_1.setId(2801L);
        q28_1.setExercise(n5Exercise28);
        q28_1.setQuestionText("1. Viết cách đọc các số đếm, ngày tháng và thời gian sau bằng hiragana:\n1) 93,648\n2) 10月10日");
        q28_1.setQuestionType(QuestionType.FILL_BLANK);
        q28_1.setExplanation("1) きゅうまんさんぜんろっぴゃくよんじゅうはち\n2) じゅうがつとおか");
        q28_1.setSortOrder(1);
        q28_1.setOptions(new ArrayList<>());

        n5Exercise28.setQuestions(List.of(q28_1));

        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setRole(Role.USER);

        Map<String, Object> headers = Map.of("alg", "none");
        Map<String, Object> claims = Map.of("sub", "test@example.com");
        jwt = new Jwt("mock-token", Instant.now(), Instant.now().plusSeconds(3600), headers, claims);
    }

    // =========================================================================
    // 1. DATA INTEGRITY & SOURCE FIDELITY
    // =========================================================================

    @Test
    @DisplayName("Verify N5 exercise JSON data integrity (exactly 29 exercises, sortOrder 1..29, clean tags)")
    void testN5ExerciseJsonDataIntegrity() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n5-exercise.json");
        assertTrue(resource.exists(), "n5-exercise.json must exist in classpath");

        List<Map<String, Object>> exercises;
        try (InputStream is = resource.getInputStream()) {
            exercises = objectMapper.readValue(is, new TypeReference<List<Map<String, Object>>>() {});
        }

        assertNotNull(exercises);
        assertEquals(29, exercises.size(), "N5 Exercise must have exactly 29 exercises");

        Set<Integer> sortOrders = new HashSet<>();
        int totalQuestions = 0;

        for (Map<String, Object> ex : exercises) {
            Integer sortOrder = (Integer) ex.get("sortOrder");
            Integer lessonNumber = (Integer) ex.get("lessonNumber");
            String title = (String) ex.get("title");
            String exerciseType = (String) ex.get("exerciseType");

            assertNotNull(sortOrder);
            assertTrue(sortOrder >= 1 && sortOrder <= 29, "N5 sort order must be between 1 and 29");
            assertTrue(sortOrders.add(sortOrder), "Sort orders must be globally unique");

            assertNotNull(lessonNumber);
            assertTrue(lessonNumber >= 1 && lessonNumber <= 25, "Lesson number must be between 1 and 25");

            assertNotNull(title);
            assertFalse(title.trim().isEmpty(), "Title must not be empty");

            assertTrue("LESSON".equals(exerciseType) || "REVIEW".equals(exerciseType));

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> questions = (List<Map<String, Object>>) ex.get("questions");
            assertNotNull(questions, "Questions list must not be null");
            assertFalse(questions.isEmpty(), "Questions list must not be empty");

            totalQuestions += questions.size();

            for (Map<String, Object> q : questions) {
                String qText = (String) q.get("questionText");
                String explanation = (String) q.get("explanation");
                Integer qSort = (Integer) q.get("sortOrder");

                assertNotNull(qText, "Question text must not be null");
                assertFalse(qText.contains("[IMAGE_REQUIRED]"), "Question text must NOT contain raw [IMAGE_REQUIRED] tags");

                assertNotNull(explanation, "Explanation/Answer must not be null (from official answer key)");
                assertFalse(explanation.trim().isEmpty(), "Explanation/Answer must not be empty");

                assertNotNull(qSort, "Question sort order must not be null");
            }
        }

        assertEquals(29, sortOrders.size(), "All 29 sort orders (1..29) must be present");

        // Verify Exercise 29 specifically (総復習 1-25)
        Map<String, Object> lastEx = exercises.get(28);
        assertEquals(29, lastEx.get("sortOrder"));
        assertEquals("REVIEW", lastEx.get("exerciseType"));
        assertEquals("総復習 (1課〜25課)", lastEx.get("title"));

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> ex29Questions = (List<Map<String, Object>>) lastEx.get("questions");
        assertEquals(7, ex29Questions.size(), "Comprehensive review must contain exactly 7 major questions");
    }

    // =========================================================================
    // 2. EXERCISE SERVICE: LIST & DETAIL
    // =========================================================================

    @Test
    @DisplayName("Verify getExercisesByLessonId returns correct N5 exercise")
    void testGetExercisesByLesson() {
        when(exerciseRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(List.of(n5Exercise1));

        List<ExerciseResponse> result = exerciseService.getExercisesByLessonId(1L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(1, result.get(0).getSortOrder());
        assertEquals("Bài 01–02", result.get(0).getTitle());
        verify(exerciseRepository).findByLessonIdOrderBySortOrderAsc(1L);
    }

    @Test
    @DisplayName("Verify getExerciseById returns exercise detail and questions")
    void testGetExerciseById() {
        when(exerciseRepository.findWithQuestionsById(28L)).thenReturn(Optional.of(n5Exercise28));

        ExerciseResponse result = exerciseService.getExerciseById(28L);

        assertNotNull(result);
        assertEquals("総復習 (1課〜25課)", result.getTitle());
        assertEquals(28, result.getSortOrder());
        assertEquals(1, result.getQuestions().size());
        verify(exerciseRepository).findWithQuestionsById(28L);
    }

    // =========================================================================
    // 3. NO ANSWER LEAKAGE BEFORE SUBMIT
    // =========================================================================

    @Test
    @DisplayName("Verify QuestionResponse does NOT leak answer/explanation before submission")
    void testNoAnswerLeakageBeforeSubmission() {
        when(exerciseRepository.findWithQuestionsById(28L)).thenReturn(Optional.of(n5Exercise28));

        ExerciseResponse result = exerciseService.getExerciseById(28L);

        assertNotNull(result);
        assertNotNull(result.getQuestions());
        for (QuestionResponse q : result.getQuestions()) {
            assertNull(q.getExplanation(), "Answer/explanation must NOT be leaked to client before submit!");
        }
    }

    // =========================================================================
    // 4. SUBMIT SCORING & EXPLANATION RETURN
    // =========================================================================

    @Test
    @DisplayName("Verify submitExercise returns accurate scoring and reveals explanations")
    void testSubmitExercise_ScoringAndExplanations() {
        when(exerciseRepository.findWithQuestionsById(1L)).thenReturn(Optional.of(n5Exercise1));

        ExerciseSubmitRequest request = new ExerciseSubmitRequest(List.of(
                new ExerciseAnswerRequest(101L, 201L, null)
        ));

        ExerciseSubmitResponse response = exerciseService.submitExercise(1L, request);

        assertNotNull(response);
        assertEquals(1, response.getTotalQuestions());
        assertEquals(1, response.getCorrectCount());
        assertEquals(100, response.getScore());
        assertNotNull(response.getResults());
        assertEquals(1, response.getResults().size());
        assertTrue(response.getResults().get(0).getIsCorrect());

        // Upon submit, explanations are revealed
        for (ExerciseQuestionResultResponse r : response.getResults()) {
            assertNotNull(r.getExplanation(), "Explanation must be provided upon submission for feedback");
        }
    }

    // =========================================================================
    // 5. PROGRESS SERVICE INTEGRATION
    // =========================================================================

    @Test
    @DisplayName("Verify ProgressService marks N5 Exercise as COMPLETED")
    void testProgressService_ExerciseCompleted() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(exerciseRepository.existsById(1L)).thenReturn(true);
        when(exerciseRepository.findById(1L)).thenReturn(Optional.of(n5Exercise1));

        UserContentProgress progress = new UserContentProgress();
        progress.setUser(testUser);
        progress.setContentType(ContentType.EXERCISE);
        progress.setContentId(1L);
        progress.setStatus(LearningStatus.NOT_STARTED);

        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(1L, ContentType.EXERCISE, 1L))
                .thenReturn(Optional.of(progress));
        when(userContentProgressRepository.save(any(UserContentProgress.class))).thenAnswer(i -> i.getArgument(0));

        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.EXERCISE, 1L, 100);
        ContentProgressResponse response = progressService.updateContentProgress(jwt, request);

        assertNotNull(response);
        assertEquals(100, response.progressPercent());
        assertEquals(LearningStatus.COMPLETED, response.status());
    }

    // =========================================================================
    // 6. SEARCH SERVICE INTEGRATION
    // =========================================================================

    @Test
    @DisplayName("Verify SearchService finds N5 Exercise with ContentType.EXERCISE")
    void testSearchService_FindsN5Exercise() {
        when(exerciseRepository.searchByKeyword("総復習", "N5")).thenReturn(List.of(n5Exercise28));

        SearchResponse response = searchService.search("総復習", "EXERCISE", "N5", 0, 10);

        assertNotNull(response);
        assertEquals(1, response.total());
        assertFalse(response.items().isEmpty());
        assertEquals("総復習 (1課〜25課)", response.items().get(0).title());
        assertEquals(ContentType.EXERCISE, response.items().get(0).contentType());
    }

    // =========================================================================
    // 7. FAVORITE SERVICE INTEGRATION
    // =========================================================================

    @Test
    @DisplayName("Verify FavoriteService toggles favorite for N5 Exercise")
    void testFavoriteService_N5ExerciseFavorite() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(exerciseRepository.existsById(28L)).thenReturn(true);
        when(favoriteRepository.findByUserIdAndContentTypeAndContentId(1L, ContentType.EXERCISE, 28L))
                .thenReturn(Optional.empty());

        Favorite savedFav = new Favorite();
        savedFav.setId(502L);
        savedFav.setUser(testUser);
        savedFav.setContentType(ContentType.EXERCISE);
        savedFav.setContentId(28L);
        savedFav.setCreatedAt(LocalDateTime.now());

        when(favoriteRepository.save(any(Favorite.class))).thenReturn(savedFav);

        FavoriteResponse favResponse = favoriteService.addFavorite(jwt, new CreateFavoriteRequest(ContentType.EXERCISE, 28L));

        assertNotNull(favResponse);
        assertEquals(ContentType.EXERCISE, favResponse.contentType());
        assertEquals(28L, favResponse.contentId());
    }

    // =========================================================================
    // 8. ADMIN SERVICE INTEGRATION
    // =========================================================================

    @Test
    @DisplayName("Verify AdminExerciseService can query N5 exercise")
    void testAdminExerciseService_QueryN5Exercise() {
        when(exerciseRepository.findById(28L)).thenReturn(Optional.of(n5Exercise28));

        AdminExerciseResponse adminResponse = adminExerciseService.getExerciseById(28L);

        assertNotNull(adminResponse);
        assertEquals("総復習 (1課〜25課)", adminResponse.title());
        assertEquals(28, adminResponse.sortOrder());
    }
}
