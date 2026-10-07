package com.japanese.learning.listening;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.dto.AdminListeningOptionRequest;
import com.japanese.learning.admin.dto.AdminListeningQuestionRequest;
import com.japanese.learning.admin.dto.AdminListeningRequest;
import com.japanese.learning.admin.dto.AdminListeningResponse;
import com.japanese.learning.admin.service.AdminListeningService;
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
import com.japanese.learning.listening.config.N4ListeningDataSeeder;
import com.japanese.learning.listening.dto.*;
import com.japanese.learning.listening.entity.ListeningContent;
import com.japanese.learning.listening.entity.ListeningOption;
import com.japanese.learning.listening.entity.ListeningQuestion;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.listening.repository.ListeningQuestionRepository;
import com.japanese.learning.listening.service.ListeningServiceImpl;
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
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.InputStream;
import java.time.Instant;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class N4ListeningIntegrationTest {

    @Mock
    private ListeningContentRepository listeningContentRepository;

    @Mock
    private ListeningQuestionRepository listeningQuestionRepository;

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
    private ReadingContentRepository readingContentRepository;

    @Mock
    private ExerciseRepository exerciseRepository;

    @Mock
    private UserContentProgressRepository userContentProgressRepository;

    @Mock
    private UserLessonProgressRepository userLessonProgressRepository;

    @Mock
    private AuthService authService;

    @Spy
    private ListeningContentMapper listeningContentMapper = Mappers.getMapper(ListeningContentMapper.class);

    @Spy
    private ListeningQuestionMapper listeningQuestionMapper = Mappers.getMapper(ListeningQuestionMapper.class);

    @Spy
    private ListeningOptionMapper listeningOptionMapper = Mappers.getMapper(ListeningOptionMapper.class);

    private final ObjectMapper objectMapper = new ObjectMapper();

    private ListeningServiceImpl listeningService;
    private AdminListeningService adminListeningService;
    private SearchServiceImpl searchService;
    private FavoriteServiceImpl favoriteService;
    private ProgressServiceImpl progressService;

    private Level n4Level;
    private Level n5Level;
    private Lesson n4Lesson26;
    private ListeningContent n4Content1;
    private ListeningQuestion n4Question1;
    private ListeningOption n4Option1;
    private ListeningOption n4Option2;
    private User testUser;
    private Jwt jwt;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(listeningQuestionMapper, "listeningOptionMapper", listeningOptionMapper);
        ReflectionTestUtils.setField(listeningContentMapper, "listeningQuestionMapper", listeningQuestionMapper);

        listeningService = new ListeningServiceImpl(listeningContentRepository, lessonRepository, listeningContentMapper);
        adminListeningService = new AdminListeningService(listeningContentRepository, listeningQuestionRepository, lessonRepository);
        searchService = new SearchServiceImpl(vocabularyRepository, grammarRepository, kanjiRepository, listeningContentRepository, readingContentRepository, exerciseRepository);
        favoriteService = new FavoriteServiceImpl(authService, favoriteRepository, vocabularyRepository, grammarRepository, kanjiRepository, listeningContentRepository, readingContentRepository, exerciseRepository);
        progressService = new ProgressServiceImpl(
                authService, lessonRepository, levelRepository,
                userLessonProgressRepository, userContentProgressRepository,
                vocabularyRepository, grammarRepository, kanjiRepository,
                lessonKanjiRepository, listeningContentRepository, readingContentRepository,
                exerciseRepository
        );

        n4Level = new Level();
        n4Level.setId(2L);
        n4Level.setCode("N4");
        n4Level.setName("N4");

        n5Level = new Level();
        n5Level.setId(1L);
        n5Level.setCode("N5");
        n5Level.setName("N5");

        n4Lesson26 = new Lesson();
        n4Lesson26.setId(26L);
        n4Lesson26.setLevel(n4Level);
        n4Lesson26.setLessonNumber(26);
        n4Lesson26.setTitle("Bài 26");

        n4Option1 = new ListeningOption();
        n4Option1.setId(101L);
        n4Option1.setContent("A. Đúng");
        n4Option1.setCorrect(true);
        n4Option1.setSortOrder(1);

        n4Option2 = new ListeningOption();
        n4Option2.setId(102L);
        n4Option2.setContent("B. Sai");
        n4Option2.setCorrect(false);
        n4Option2.setSortOrder(2);

        n4Question1 = new ListeningQuestion();
        n4Question1.setId(51L);
        n4Question1.setQuestion("1番の質問");
        n4Question1.setSortOrder(1);
        n4Question1.setOptions(new ArrayList<>(List.of(n4Option1, n4Option2)));

        n4Content1 = new ListeningContent();
        n4Content1.setId(201L);
        n4Content1.setLesson(n4Lesson26);
        n4Content1.setTitle("Bài 26 - Luyện nghe 1");
        n4Content1.setAudioUrl("/audio/n4/lesson-26/listening-01.mp3");
        n4Content1.setSortOrder(1);
        n4Content1.setQuestions(new ArrayList<>(List.of(n4Question1)));

        n4Question1.setListening(n4Content1);
        n4Option1.setQuestion(n4Question1);
        n4Option2.setQuestion(n4Question1);

        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("learner@example.com");
        testUser.setRole(Role.USER);

        jwt = Jwt.withTokenValue("mock-token")
                .header("alg", "none")
                .claim("sub", "1")
                .claim("email", "learner@example.com")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(3600))
                .build();
    }

    // =========================================================================
    // 1. DATA SOURCE VERIFICATION (n4-listening.json)
    // =========================================================================

    @Test
    @DisplayName("N4 Listening JSON - Verify all 25 lessons and 104 activities exist")
    void testN4ListeningJsonDataIntegrity() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n4-listening.json");
        assertTrue(resource.exists(), "n4-listening.json must exist in classpath");

        try (InputStream is = resource.getInputStream()) {
            List<Map<String, Object>> lessons = objectMapper.readValue(is, new TypeReference<>() {});
            assertEquals(25, lessons.size(), "Must contain exactly 25 lessons (26-50)");

            int totalActivities = 0;
            int totalQuestions = 0;
            int totalOptions = 0;

            for (Map<String, Object> lessonData : lessons) {
                int lessonNum = (int) lessonData.get("lessonNumber");
                assertTrue(lessonNum >= 26 && lessonNum <= 50, "Lesson number must be between 26 and 50");

                @SuppressWarnings("unchecked")
                List<Map<String, Object>> activities = (List<Map<String, Object>>) lessonData.get("items");
                assertNotNull(activities);
                assertFalse(activities.isEmpty(), "Lesson " + lessonNum + " must have listening activities");

                for (Map<String, Object> act : activities) {
                    totalActivities++;
                    String audioUrl = (String) act.get("audioUrl");
                    assertNotNull(audioUrl);
                    assertTrue(audioUrl.startsWith("/audio/n4/lesson-" + lessonNum + "/listening-"),
                            "Audio URL must match naming convention: " + audioUrl);

                    @SuppressWarnings("unchecked")
                    List<Map<String, Object>> questions = (List<Map<String, Object>>) act.get("questions");
                    assertNotNull(questions);
                    assertFalse(questions.isEmpty(), "Activity must have questions");

                    for (Map<String, Object> q : questions) {
                        totalQuestions++;
                        @SuppressWarnings("unchecked")
                        List<Map<String, Object>> options = (List<Map<String, Object>>) q.get("options");
                        assertNotNull(options);
                        assertTrue(options.size() >= 2, "Question must have at least 2 options");

                        int correctCount = 0;
                        for (Map<String, Object> opt : options) {
                            totalOptions++;
                            if (Boolean.TRUE.equals(opt.get("correct"))) {
                                correctCount++;
                            }
                        }
                        assertEquals(1, correctCount, "Every question must have exactly one correct option");
                    }
                }
            }

            assertEquals(104, totalActivities, "Total audio tracks/activities must be exactly 104");
            assertEquals(293, totalQuestions, "Total questions across Lessons 26-50 must be exactly 293");
            assertEquals(795, totalOptions, "Total options across Lessons 26-50 must be exactly 795");
        }
    }

    // =========================================================================
    // 2. DATA SEEDER IDEMPOTENCY
    // =========================================================================

    @Test
    @DisplayName("N4 Listening Seeder - Skips when content already seeded (idempotency)")
    void testSeederIdempotency() throws Exception {
        N4ListeningDataSeeder seeder = new N4ListeningDataSeeder(
                levelRepository,
                lessonRepository,
                listeningContentRepository,
                objectMapper
        );

        when(levelRepository.findByCode("N4")).thenReturn(Optional.of(n4Level));
        when(lessonRepository.findByLevelIdAndLessonNumber(eq(2L), anyInt())).thenReturn(Optional.of(n4Lesson26));
        // Simulate existing content
        when(listeningContentRepository.existsByLessonIdAndAudioUrl(anyLong(), anyString())).thenReturn(true);

        seeder.run();

        // Should not save any new content because all exist
        verify(listeningContentRepository, never()).save(any(ListeningContent.class));
    }

    // =========================================================================
    // 3. LEARNER ANSWER SECURITY (NO ANSWER LEAKAGE)
    // =========================================================================

    @Test
    @DisplayName("Learner GET API - Does NOT expose correct answers or isCorrect flag")
    void testLearnerApiDoesNotLeakAnswers() {
        when(listeningContentRepository.findById(201L)).thenReturn(Optional.of(n4Content1));

        ListeningContentResponse response = listeningService.getListeningById(201L);
        assertNotNull(response);
        assertEquals(1, response.getQuestions().size());

        ListeningQuestionResponse qResponse = response.getQuestions().get(0);
        assertEquals(2, qResponse.getOptions().size());

        for (ListeningOptionResponse optResponse : qResponse.getOptions()) {
            assertNotNull(optResponse.getId());
            assertNotNull(optResponse.getContent());
            // ListeningOptionResponse does NOT have an isCorrect property!
        }
    }

    // =========================================================================
    // 4. SUBMISSION AND SCORING
    // =========================================================================

    @Test
    @DisplayName("Submit Listening - Valid submission calculates correct score")
    void testSubmitListeningCorrect() {
        when(listeningContentRepository.findById(201L)).thenReturn(Optional.of(n4Content1));

        ListeningSubmitRequest request = ListeningSubmitRequest.builder()
                .answers(List.of(
                        QuestionAnswerRequest.builder()
                                .questionId(51L)
                                .selectedOptionId(101L) // Correct option
                                .build()
                ))
                .build();

        ListeningSubmitResponse result = listeningService.submitListening(201L, request);
        assertNotNull(result);
        assertEquals(1, result.getTotalQuestions());
        assertEquals(1, result.getCorrectCount());
        assertEquals(100, result.getScore());
        assertEquals(1, result.getResults().size());
        assertTrue(result.getResults().get(0).getIsCorrect());
        assertEquals(101L, result.getResults().get(0).getCorrectOptionId());
    }

    @Test
    @DisplayName("Submit Listening - Wrong option calculates 0 score")
    void testSubmitListeningWrong() {
        when(listeningContentRepository.findById(201L)).thenReturn(Optional.of(n4Content1));

        ListeningSubmitRequest request = ListeningSubmitRequest.builder()
                .answers(List.of(
                        QuestionAnswerRequest.builder()
                                .questionId(51L)
                                .selectedOptionId(102L) // Incorrect option
                                .build()
                ))
                .build();

        ListeningSubmitResponse result = listeningService.submitListening(201L, request);
        assertNotNull(result);
        assertEquals(1, result.getTotalQuestions());
        assertEquals(0, result.getCorrectCount());
        assertEquals(0, result.getScore());
        assertFalse(result.getResults().get(0).getIsCorrect());
    }

    @Test
    @DisplayName("Submit Listening - Throws on invalid listening ID")
    void testSubmitListeningNotFound() {
        when(listeningContentRepository.findById(999L)).thenReturn(Optional.empty());

        ListeningSubmitRequest request = ListeningSubmitRequest.builder()
                .answers(Collections.emptyList())
                .build();

        assertThrows(ResourceNotFoundException.class, () -> listeningService.submitListening(999L, request));
    }

    @Test
    @DisplayName("Submit Listening - Throws on foreign question ID")
    void testSubmitListeningForeignQuestion() {
        when(listeningContentRepository.findById(201L)).thenReturn(Optional.of(n4Content1));

        ListeningSubmitRequest request = ListeningSubmitRequest.builder()
                .answers(List.of(
                        QuestionAnswerRequest.builder()
                                .questionId(9999L)
                                .selectedOptionId(101L)
                                .build()
                ))
                .build();

        assertThrows(ResourceNotFoundException.class, () -> listeningService.submitListening(201L, request));
    }

    // =========================================================================
    // 5. PROGRESS INTEGRATION
    // =========================================================================

    @Test
    @DisplayName("Progress - Updating ContentType.LISTENING marks status COMPLETED at 100%")
    void testProgressListeningIntegration() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(listeningContentRepository.existsById(201L)).thenReturn(true);
        when(listeningContentRepository.findById(201L)).thenReturn(Optional.of(n4Content1));

        UserContentProgress existingProgress = new UserContentProgress();
        existingProgress.setId(1L);
        existingProgress.setUser(testUser);
        existingProgress.setContentType(ContentType.LISTENING);
        existingProgress.setContentId(201L);
        existingProgress.setStatus(LearningStatus.NOT_STARTED);
        existingProgress.setProgressPercent(0);

        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(1L, ContentType.LISTENING, 201L))
                .thenReturn(Optional.of(existingProgress));
        when(userContentProgressRepository.save(any(UserContentProgress.class))).thenAnswer(i -> i.getArgument(0));

        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.LISTENING, 201L, 100);
        ContentProgressResponse resp = progressService.updateContentProgress(jwt, request);

        assertNotNull(resp);
        assertEquals(100, resp.progressPercent());
        assertEquals(LearningStatus.COMPLETED, resp.status());
    }

    // =========================================================================
    // 6. SEARCH INTEGRATION
    // =========================================================================

    @Test
    @DisplayName("Search - Finds N4 Listening content when filtering by N4 level")
    void testSearchN4Listening() {
        when(listeningContentRepository.searchByKeyword("Luyện nghe", "N4"))
                .thenReturn(List.of(n4Content1));

        SearchResponse response = searchService.search("Luyện nghe", "LISTENING", "N4", 0, 10);
        assertNotNull(response);
        assertEquals(1, response.total());
        assertEquals("Bài 26 - Luyện nghe 1", response.items().get(0).title());
        assertEquals(ContentType.LISTENING, response.items().get(0).contentType());
    }

    // =========================================================================
    // 7. FAVORITE INTEGRATION
    // =========================================================================

    @Test
    @DisplayName("Favorite - Allows favoriting N4 Listening content")
    void testFavoriteListening() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(listeningContentRepository.existsById(201L)).thenReturn(true);
        when(favoriteRepository.findByUserIdAndContentTypeAndContentId(1L, ContentType.LISTENING, 201L)).thenReturn(Optional.empty());

        Favorite saved = new Favorite();
        saved.setId(10L);
        saved.setUser(testUser);
        saved.setContentType(ContentType.LISTENING);
        saved.setContentId(201L);

        when(favoriteRepository.save(any(Favorite.class))).thenReturn(saved);

        CreateFavoriteRequest req = new CreateFavoriteRequest(ContentType.LISTENING, 201L);
        FavoriteResponse resp = favoriteService.addFavorite(jwt, req);

        assertNotNull(resp);
        assertEquals(ContentType.LISTENING, resp.contentType());
        assertEquals(201L, resp.contentId());
    }

    // =========================================================================
    // 8. ADMIN CRUD OPERATIONS
    // =========================================================================

    @Test
    @DisplayName("Admin - Creates listening content with questions and options successfully")
    void testAdminCreateListening() {
        when(lessonRepository.findById(26L)).thenReturn(Optional.of(n4Lesson26));
        when(listeningContentRepository.save(any(ListeningContent.class))).thenAnswer(i -> {
            ListeningContent c = i.getArgument(0);
            c.setId(301L);
            return c;
        });

        AdminListeningRequest req = new AdminListeningRequest(
                26L,
                "Bài 26 - Admin Test",
                "/audio/n4/lesson-26/listening-01.mp3",
                null,
                "Mô tả",
                1,
                List.of(
                        new AdminListeningQuestionRequest(
                                "Câu hỏi 1",
                                QuestionType.MULTIPLE_CHOICE,
                                "Giải thích",
                                1,
                                List.of(
                                        new AdminListeningOptionRequest("Lựa chọn A", true, 1),
                                        new AdminListeningOptionRequest("Lựa chọn B", false, 2)
                                )
                        )
                )
        );

        AdminListeningResponse resp = adminListeningService.createListening(req);
        assertNotNull(resp);
        assertEquals(301L, resp.id());
        assertEquals("Bài 26 - Admin Test", resp.title());
        assertEquals(26L, resp.lessonId());
    }
}
