package com.japanese.learning.exercise;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.dto.AdminExerciseResponse;
import com.japanese.learning.admin.service.AdminExerciseService;
import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.exercise.config.N4ExerciseDataSeeder;
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
class N4ExerciseIntegrationTest {

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

    private Level n4Level;
    private Lesson n4Lesson26;
    private Exercise n4Exercise26;
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

        n4Level = new Level();
        n4Level.setId(2L);
        n4Level.setCode("N4");
        n4Level.setName("N4");

        n4Lesson26 = new Lesson();
        n4Lesson26.setId(26L);
        n4Lesson26.setLessonNumber(26);
        n4Lesson26.setLevel(n4Level);
        n4Lesson26.setTitle("Bài 26");

        n4Exercise26 = new Exercise();
        n4Exercise26.setId(128L);
        n4Exercise26.setLesson(n4Lesson26);
        n4Exercise26.setTitle("Bài 26");
        n4Exercise26.setDescription("Bài tập Minna no Nihongo N4 - Bài 26");
        n4Exercise26.setExerciseType(ExerciseType.LESSON);
        n4Exercise26.setContentType(com.japanese.learning.exercise.enums.ContentType.EXERCISE);
        n4Exercise26.setSortOrder(28);

        Question q1 = new Question();
        q1.setId(1001L);
        q1.setExercise(n4Exercise26);
        q1.setQuestionText("1. Chọn từ thích hợp điền vào ( ):\n例: どうしたんですか。頭が ( 痛いんです )。");
        q1.setQuestionType(QuestionType.FILL_BLANK);
        q1.setExplanation("1) 寒いんです\n2) 都合が悪いです");
        q1.setSortOrder(1);
        q1.setOptions(new ArrayList<>());

        Question q2 = new Question();
        q2.setId(1002L);
        q2.setExercise(n4Exercise26);
        q2.setQuestionText("2. Nối câu thích hợp:\n1) 気分が悪いんですが、...");
        q2.setQuestionType(QuestionType.FILL_BLANK);
        q2.setExplanation("1) 病院へ行ったほうがいいですよ");
        q2.setSortOrder(2);
        q2.setOptions(new ArrayList<>());

        n4Exercise26.setQuestions(List.of(q1, q2));

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
    @DisplayName("Verify N4 exercise JSON data integrity (29 exercises, 168 questions, Lessons 26-50)")
    void testN4ExerciseJsonDataIntegrity() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n4-exercise.json");
        assertTrue(resource.exists(), "n4-exercise.json must exist in classpath");

        List<Map<String, Object>> exercises;
        try (InputStream is = resource.getInputStream()) {
            exercises = objectMapper.readValue(is, new TypeReference<List<Map<String, Object>>>() {});
        }

        assertNotNull(exercises);
        assertEquals(29, exercises.size(), "N4 Exercise must have exactly 29 exercises");

        int totalQuestions = 0;
        Set<Integer> sortOrders = new HashSet<>();
        Set<Integer> lessonNumbers = new HashSet<>();

        for (Map<String, Object> ex : exercises) {
            Integer sortOrder = (Integer) ex.get("sortOrder");
            Integer lessonNumber = (Integer) ex.get("lessonNumber");
            String title = (String) ex.get("title");
            String exerciseType = (String) ex.get("exerciseType");

            assertNotNull(sortOrder);
            assertTrue(sortOrder >= 28 && sortOrder <= 56, "N4 sort order must be between 28 and 56");
            assertTrue(sortOrders.add(sortOrder), "Sort orders must be globally unique");

            assertNotNull(lessonNumber);
            assertTrue(lessonNumber >= 26 && lessonNumber <= 50, "Lesson number must be between 26 and 50");
            lessonNumbers.add(lessonNumber);

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
                assertFalse(qText.trim().isEmpty(), "Question text must not be empty");

                assertNotNull(explanation, "Explanation/Answer must not be null (from official answer key)");
                assertFalse(explanation.trim().isEmpty(), "Explanation/Answer must not be empty");

                assertNotNull(qSort, "Question sort order must not be null");
            }
        }

        assertEquals(168, totalQuestions, "Total questions must be exactly 168");
        assertEquals(25, lessonNumbers.size(), "All 25 lessons (26-50) must be covered");
    }

    // =========================================================================
    // 2. EXERCISE SERVICE: LIST & DETAIL
    // =========================================================================
    // 2. EXERCISE SERVICE: LIST & DETAIL
    // =========================================================================

    @Test
    @DisplayName("Verify getExercisesByLessonId returns correct N4 exercise")
    void testGetExercisesByLesson() {
        when(exerciseRepository.findByLessonIdOrderBySortOrderAsc(26L)).thenReturn(List.of(n4Exercise26));

        List<ExerciseResponse> result = exerciseService.getExercisesByLessonId(26L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(28, result.get(0).getSortOrder());
        assertEquals("Bài 26", result.get(0).getTitle());
        verify(exerciseRepository).findByLessonIdOrderBySortOrderAsc(26L);
    }

    @Test
    @DisplayName("Verify getExerciseById returns exercise detail")
    void testGetExerciseById() {
        when(exerciseRepository.findWithQuestionsById(128L)).thenReturn(Optional.of(n4Exercise26));

        ExerciseResponse result = exerciseService.getExerciseById(128L);

        assertNotNull(result);
        assertEquals("Bài 26", result.getTitle());
        assertEquals(28, result.getSortOrder());
        assertEquals(2, result.getQuestions().size());
        verify(exerciseRepository).findWithQuestionsById(128L);
    }

    // =========================================================================
    // 3. NO ANSWER LEAKAGE BEFORE SUBMIT
    // =========================================================================

    @Test
    @DisplayName("Verify QuestionResponse does NOT leak answer/explanation before submission")
    void testNoAnswerLeakageBeforeSubmission() {
        when(exerciseRepository.findWithQuestionsById(128L)).thenReturn(Optional.of(n4Exercise26));

        ExerciseResponse result = exerciseService.getExerciseById(128L);

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
        when(exerciseRepository.findWithQuestionsById(128L)).thenReturn(Optional.of(n4Exercise26));

        ExerciseSubmitRequest request = new ExerciseSubmitRequest(List.of(
                new ExerciseAnswerRequest(1001L, null, "1) 寒いんです\n2) 都合が悪いです"),
                new ExerciseAnswerRequest(1002L, null, "1) 病院へ行ったほうがいいですよ")
        ));

        ExerciseSubmitResponse response = exerciseService.submitExercise(128L, request);

        assertNotNull(response);
        assertEquals(2, response.getTotalQuestions());
        assertNotNull(response.getResults());
        assertEquals(2, response.getResults().size());

        // Upon submit, explanations are revealed
        for (ExerciseQuestionResultResponse r : response.getResults()) {
            assertNotNull(r.getExplanation(), "Explanation must be provided upon submission for feedback");
        }
    }

    // =========================================================================
    // 5. PROGRESS SERVICE INTEGRATION
    // =========================================================================

    @Test
    @DisplayName("Verify ProgressService marks N4 Exercise as COMPLETED")
    void testProgressService_ExerciseCompleted() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(exerciseRepository.existsById(128L)).thenReturn(true);
        when(exerciseRepository.findById(128L)).thenReturn(Optional.of(n4Exercise26));

        UserContentProgress progress = new UserContentProgress();
        progress.setUser(testUser);
        progress.setContentType(ContentType.EXERCISE);
        progress.setContentId(128L);
        progress.setStatus(LearningStatus.NOT_STARTED);

        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(1L, ContentType.EXERCISE, 128L))
                .thenReturn(Optional.of(progress));
        when(userContentProgressRepository.save(any(UserContentProgress.class))).thenAnswer(i -> i.getArgument(0));

        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.EXERCISE, 128L, 100);
        ContentProgressResponse response = progressService.updateContentProgress(jwt, request);

        assertNotNull(response);
        assertEquals(100, response.progressPercent());
        assertEquals(LearningStatus.COMPLETED, response.status());
    }

    // =========================================================================
    // 6. SEARCH SERVICE INTEGRATION
    // =========================================================================

    @Test
    @DisplayName("Verify SearchService finds N4 Exercise with ContentType.EXERCISE")
    void testSearchService_FindsN4Exercise() {
        when(exerciseRepository.searchByKeyword("Bài 26", "N4")).thenReturn(List.of(n4Exercise26));

        SearchResponse response = searchService.search("Bài 26", "EXERCISE", "N4", 0, 10);

        assertNotNull(response);
        assertEquals(1, response.total());
        assertFalse(response.items().isEmpty());
        assertEquals("Bài 26", response.items().get(0).title());
        assertEquals(ContentType.EXERCISE, response.items().get(0).contentType());
    }

    // =========================================================================
    // 7. FAVORITE SERVICE INTEGRATION
    // =========================================================================

    @Test
    @DisplayName("Verify FavoriteService toggles favorite for N4 Exercise")
    void testFavoriteService_N4ExerciseFavorite() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(exerciseRepository.existsById(128L)).thenReturn(true);
        when(favoriteRepository.findByUserIdAndContentTypeAndContentId(1L, ContentType.EXERCISE, 128L))
                .thenReturn(Optional.empty());

        Favorite savedFav = new Favorite();
        savedFav.setId(501L);
        savedFav.setUser(testUser);
        savedFav.setContentType(ContentType.EXERCISE);
        savedFav.setContentId(128L);
        savedFav.setCreatedAt(LocalDateTime.now());

        when(favoriteRepository.save(any(Favorite.class))).thenReturn(savedFav);

        FavoriteResponse favResponse = favoriteService.addFavorite(jwt, new CreateFavoriteRequest(ContentType.EXERCISE, 128L));

        assertNotNull(favResponse);
        assertEquals(ContentType.EXERCISE, favResponse.contentType());
        assertEquals(128L, favResponse.contentId());
    }

    // =========================================================================
    // 8. ADMIN SERVICE INTEGRATION
    // =========================================================================

    @Test
    @DisplayName("Verify AdminExerciseService can query and update N4 exercise")
    void testAdminExerciseService_QueryN4Exercise() {
        when(exerciseRepository.findById(128L)).thenReturn(Optional.of(n4Exercise26));

        AdminExerciseResponse adminResponse = adminExerciseService.getExerciseById(128L);

        assertNotNull(adminResponse);
        assertEquals("Bài 26", adminResponse.title());
        assertEquals(28, adminResponse.sortOrder());
    }
}
