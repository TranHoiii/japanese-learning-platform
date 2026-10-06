package com.japanese.learning.grammar;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.dto.AdminGrammarExampleRequest;
import com.japanese.learning.admin.dto.AdminGrammarExampleResponse;
import com.japanese.learning.admin.dto.AdminGrammarRequest;
import com.japanese.learning.admin.dto.AdminGrammarResponse;
import com.japanese.learning.admin.service.AdminGrammarService;
import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.favorite.dto.CreateFavoriteRequest;
import com.japanese.learning.favorite.dto.FavoriteCheckResponse;
import com.japanese.learning.favorite.dto.FavoriteResponse;
import com.japanese.learning.favorite.entity.Favorite;
import com.japanese.learning.favorite.repository.FavoriteRepository;
import com.japanese.learning.favorite.service.FavoriteServiceImpl;
import com.japanese.learning.grammar.config.N4GrammarDataSeeder;
import com.japanese.learning.grammar.dto.GrammarExampleMapper;
import com.japanese.learning.grammar.dto.GrammarMapper;
import com.japanese.learning.grammar.dto.GrammarResponse;
import com.japanese.learning.grammar.entity.Grammar;
import com.japanese.learning.grammar.entity.GrammarExample;
import com.japanese.learning.grammar.repository.GrammarExampleRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.grammar.service.GrammarServiceImpl;
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
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.InputStream;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class N4GrammarIntegrationTest {

    @Mock
    private GrammarRepository grammarRepository;

    @Mock
    private GrammarExampleRepository grammarExampleRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private LevelRepository levelRepository;

    @Mock
    private FavoriteRepository favoriteRepository;

    @Mock
    private VocabularyRepository vocabularyRepository;

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
    private UserContentProgressRepository userContentProgressRepository;

    @Mock
    private UserLessonProgressRepository userLessonProgressRepository;

    @Mock
    private AuthService authService;

    @Spy
    private GrammarExampleMapper grammarExampleMapper = Mappers.getMapper(GrammarExampleMapper.class);

    @Spy
    private GrammarMapper grammarMapper = Mappers.getMapper(GrammarMapper.class);

    private final ObjectMapper objectMapper = new ObjectMapper();

    private GrammarServiceImpl grammarService;
    private AdminGrammarService adminGrammarService;
    private SearchServiceImpl searchService;
    private FavoriteServiceImpl favoriteService;
    private ProgressServiceImpl progressService;

    private Level n4Level;
    private Level n5Level;
    private Lesson n4Lesson26;
    private Lesson n5Lesson01;
    private Grammar n4Grammar1;
    private Grammar n4Grammar2;
    private GrammarExample n4Example1;
    private Grammar n5Grammar1;
    private User testUser;
    private Jwt jwt;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(grammarMapper, "grammarExampleMapper", grammarExampleMapper);

        grammarService = new GrammarServiceImpl(grammarRepository, grammarExampleRepository, lessonRepository, grammarMapper, grammarExampleMapper);
        adminGrammarService = new AdminGrammarService(grammarRepository, grammarExampleRepository, lessonRepository, levelRepository);
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
        n4Level.setDescription("Trình độ N4 - Sơ trung cấp");
        n4Level.setSortOrder(2);
        n4Level.setActive(true);

        n5Level = new Level();
        n5Level.setId(1L);
        n5Level.setCode("N5");
        n5Level.setName("N5");
        n5Level.setDescription("Trình độ N5 - Nhập môn");
        n5Level.setSortOrder(1);
        n5Level.setActive(true);

        n4Lesson26 = new Lesson();
        n4Lesson26.setId(26L);
        n4Lesson26.setLevel(n4Level);
        n4Lesson26.setLessonNumber(26);
        n4Lesson26.setTitle("Bài 26");
        n4Lesson26.setSortOrder(26);
        n4Lesson26.setActive(true);

        n5Lesson01 = new Lesson();
        n5Lesson01.setId(1L);
        n5Lesson01.setLevel(n5Level);
        n5Lesson01.setLessonNumber(1);
        n5Lesson01.setTitle("Bài 01");
        n5Lesson01.setSortOrder(1);
        n5Lesson01.setActive(true);

        n4Grammar1 = new Grammar();
        n4Grammar1.setId(501L);
        n4Grammar1.setLesson(n4Lesson26);
        n4Grammar1.setPattern("～んです");
        n4Grammar1.setMeaning("Nhấn mạnh lý do, giải thích, xác nhận thông tin");
        n4Grammar1.setUsage("V / A-i / A-na / N (thể thông thường) + んです (A-na/N thêm な)");
        n4Grammar1.setExplanation("Dùng để nhấn mạnh ý muốn nói, giải thích lý do, nguyên nhân hoặc tìm kiếm sự giải thích.");
        n4Grammar1.setNotes("Chú ý với tính từ đuôi -na và danh từ ở thì hiện tại khẳng định: A-na/N + なんです.");
        n4Grammar1.setSortOrder(1);

        n4Example1 = new GrammarExample();
        n4Example1.setId(101L);
        n4Example1.setGrammar(n4Grammar1);
        n4Example1.setJapanese("あしたからりょこうなんです。");
        n4Example1.setFurigana("あしたから旅行なんです。");
        n4Example1.setTranslation("Từ ngày mai tôi đi du lịch.");
        n4Example1.setExplanation("Cung cấp thêm thông tin, giải thích lý do");
        n4Example1.setSortOrder(1);

        n4Grammar1.setExamples(new ArrayList<>(List.of(n4Example1)));

        n4Grammar2 = new Grammar();
        n4Grammar2.setId(502L);
        n4Grammar2.setLesson(n4Lesson26);
        n4Grammar2.setPattern("～んですが、Vてくださいませんか");
        n4Grammar2.setMeaning("Làm ơn... giúp tôi có được không?");
        n4Grammar2.setUsage("V thể thông thường + んですが、Vてくださいませんか");
        n4Grammar2.setExplanation("Dùng khi mở đầu câu chuyện nhờ vả một cách lịch sự.");
        n4Grammar2.setNotes("Lịch sự hơn Vてください.");
        n4Grammar2.setSortOrder(2);
        n4Grammar2.setExamples(new ArrayList<>());

        n5Grammar1 = new Grammar();
        n5Grammar1.setId(1L);
        n5Grammar1.setLesson(n5Lesson01);
        n5Grammar1.setPattern("～は～です");
        n5Grammar1.setMeaning("N1 là N2");
        n5Grammar1.setUsage("N1 は N2 です");
        n5Grammar1.setExplanation("Mẫu câu khẳng định cơ bản.");
        n5Grammar1.setSortOrder(1);
        n5Grammar1.setExamples(new ArrayList<>());

        testUser = new User();
        testUser.setId(100L);
        testUser.setEmail("testuser@example.com");
        testUser.setFullName("Test User");
        testUser.setRole(Role.USER);

        jwt = new Jwt("mock-token", Instant.now(), Instant.now().plusSeconds(3600),
                Map.of("alg", "none"),
                Map.of("sub", "testuser@example.com"));
    }

    @Test
    @DisplayName("N4 Seed Data JSON: Đảm bảo tồn tại, đúng 25 bài (26-50), 91 mẫu ngữ pháp và 192 ví dụ")
    void testN4JsonSeedDataIntegrity() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n4-grammar.json");
        assertTrue(resource.exists(), "File data/n4-grammar.json phải tồn tại trong resources");

        N4GrammarDataSeeder.N4GrammarDataPayload payload;
        try (InputStream is = resource.getInputStream()) {
            payload = objectMapper.readValue(is, N4GrammarDataSeeder.N4GrammarDataPayload.class);
        }

        assertNotNull(payload);
        assertEquals("N4", payload.levelCode());
        assertEquals("N4", payload.levelName());
        assertNotNull(payload.lessons());
        assertEquals(25, payload.lessons().size(), "N4 Grammar phải gồm chính xác 25 bài học (Bài 26 đến Bài 50)");

        int totalGrammars = 0;
        int totalExamples = 0;
        int grammarsWithoutExamples = 0;

        for (int i = 0; i < payload.lessons().size(); i++) {
            N4GrammarDataSeeder.N4LessonGrammarPayload lp = payload.lessons().get(i);
            int expectedLessonNum = 26 + i;
            assertEquals(expectedLessonNum, lp.lessonNumber(), "Số thứ tự bài học phải liên tục từ 26 đến 50");
            assertNotNull(lp.grammars());
            assertFalse(lp.grammars().isEmpty(), "Mỗi bài học N4 phải có ngữ pháp");

            for (N4GrammarDataSeeder.N4GrammarItemPayload g : lp.grammars()) {
                assertNotNull(g.pattern(), "Mẫu ngữ pháp không được null");
                assertFalse(g.pattern().isBlank(), "Mẫu ngữ pháp không được trống");
                assertNotNull(g.meaning(), "Ý nghĩa không được null");
                assertFalse(g.meaning().isBlank(), "Ý nghĩa không được trống");
                assertNotNull(g.explanation(), "Giải thích không được null");
                assertFalse(g.explanation().isBlank(), "Giải thích không được trống");
                assertNotNull(g.sortOrder(), "sortOrder không được null");
                assertTrue(g.sortOrder() > 0, "sortOrder phải dương");

                totalGrammars++;
                if (g.examples() == null || g.examples().isEmpty()) {
                    grammarsWithoutExamples++;
                } else {
                    for (N4GrammarDataSeeder.N4GrammarExamplePayload ex : g.examples()) {
                        assertNotNull(ex.japanese(), "Câu tiếng Nhật ví dụ không được null");
                        assertFalse(ex.japanese().isBlank(), "Câu tiếng Nhật ví dụ không được trống");
                        assertNotNull(ex.translation(), "Bản dịch ví dụ không được null");
                        assertFalse(ex.translation().isBlank(), "Bản dịch ví dụ không được trống");
                        totalExamples++;
                    }
                }
            }
        }

        assertEquals(91, totalGrammars, "Tổng số mẫu ngữ pháp N4 trích xuất từ PDF phải là 91");
        assertEquals(192, totalExamples, "Tổng số ví dụ ngữ pháp N4 trích xuất từ PDF phải là 192");
        assertEquals(3, grammarsWithoutExamples, "Chính xác 3 mục ngữ pháp là bảng chia động từ không có câu ví dụ riêng");
    }

    @Test
    @DisplayName("GrammarService: Lấy danh sách mẫu ngữ pháp theo Lesson ID N4 thành công")
    void testGetGrammarsByN4LessonId_Success() {
        when(lessonRepository.existsById(26L)).thenReturn(true);
        when(grammarRepository.findByLessonIdOrderBySortOrderAsc(26L)).thenReturn(List.of(n4Grammar1, n4Grammar2));

        List<GrammarResponse> result = grammarService.getByLessonId(26L);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(26L, result.get(0).lessonId());
        assertEquals("～んです", result.get(0).pattern());
        assertEquals("Nhấn mạnh lý do, giải thích, xác nhận thông tin", result.get(0).meaning());
        assertEquals(1, result.get(0).examples().size());
        assertEquals("あしたからりょこうなんです。", result.get(0).examples().get(0).japanese());

        assertEquals("～んですが、Vてくださいませんか", result.get(1).pattern());
    }

    @Test
    @DisplayName("GrammarService: Lấy chi tiết mẫu ngữ pháp N4 theo ID thành công")
    void testGetN4GrammarById_Success() {
        when(grammarRepository.findById(501L)).thenReturn(Optional.of(n4Grammar1));

        GrammarResponse res = grammarService.getById(501L);

        assertNotNull(res);
        assertEquals(501L, res.id());
        assertEquals("～んです", res.pattern());
        assertEquals("V / A-i / A-na / N (thể thông thường) + んです (A-na/N thêm な)", res.usage());
        assertEquals(1, res.examples().size());
        assertEquals("Từ ngày mai tôi đi du lịch.", res.examples().get(0).translation());
    }

    @Test
    @DisplayName("AdminGrammarService: Lấy danh sách ngữ pháp N4 theo Level ID thành công")
    void testAdminGetGrammarsByLevelId_Success() {
        when(levelRepository.existsById(2L)).thenReturn(true);
        when(grammarRepository.findByLevelIdOrderBySortOrderAsc(2L)).thenReturn(List.of(n4Grammar1, n4Grammar2));

        List<AdminGrammarResponse> list = adminGrammarService.getGrammars(null, 2L);

        assertNotNull(list);
        assertEquals(2, list.size());
        assertEquals("N4", list.get(0).levelCode());
        assertEquals(26, list.get(0).lessonNumber());
        assertEquals("～んです", list.get(0).pattern());
    }

    @Test
    @DisplayName("AdminGrammarService: Thêm, sửa, xóa mẫu ngữ pháp N4 thành công")
    void testAdminCreateUpdateAndDeleteN4Grammar() {
        AdminGrammarRequest createReq = new AdminGrammarRequest(
                26L, "～ていただけませんか", "Làm ơn giúp tôi...", "Vて + いただけませんか",
                "Cách nói nhờ vả rất lịch sự", "Dùng với người trên", 3, null
        );

        when(lessonRepository.findById(26L)).thenReturn(Optional.of(n4Lesson26));
        when(grammarRepository.save(any(Grammar.class))).thenAnswer(inv -> {
            Grammar g = inv.getArgument(0);
            g.setId(600L);
            return g;
        });

        AdminGrammarResponse created = adminGrammarService.createGrammar(createReq);
        assertNotNull(created);
        assertEquals(600L, created.id());
        assertEquals("～ていただけませんか", created.pattern());
        assertEquals("N4", created.levelCode());

        // Update
        AdminGrammarRequest updateReq = new AdminGrammarRequest(
                26L, "～ていただけませんか", "Làm ơn giúp tôi được không ạ", "Vて + いただけませんか",
                "Cách nói nhờ vả rất lịch sự", "Dùng với cấp trên", 3, null
        );
        when(grammarRepository.findById(600L)).thenReturn(Optional.of(n4Grammar2));
        AdminGrammarResponse updated = adminGrammarService.updateGrammar(600L, updateReq);
        assertNotNull(updated);

        // Delete
        adminGrammarService.deleteGrammar(600L);
        verify(grammarRepository).delete(n4Grammar2);
    }

    @Test
    @DisplayName("AdminGrammarService: Thêm và xóa ví dụ cho ngữ pháp N4 thành công")
    void testAdminAddAndDeleteExampleN4Grammar() {
        AdminGrammarExampleRequest exReq = new AdminGrammarExampleRequest(
                "いいせんせいをしょうかいしていただけませんか。",
                "いい先生を紹介していただけませんか。",
                "Thầy có thể giới thiệu cho em giáo viên tốt được không ạ?",
                "Nhờ vả cấp trên",
                2
        );

        when(grammarRepository.findById(501L)).thenReturn(Optional.of(n4Grammar1));
        when(grammarExampleRepository.save(any(GrammarExample.class))).thenAnswer(inv -> {
            GrammarExample ge = inv.getArgument(0);
            ge.setId(999L);
            ge.setGrammar(n4Grammar1);
            return ge;
        });

        AdminGrammarExampleResponse res = adminGrammarService.createExample(501L, exReq);
        assertNotNull(res);
        assertEquals(999L, res.id());
        assertEquals("いいせんせいをしょうかいしていただけませんか。", res.japanese());

        // Delete example
        when(grammarExampleRepository.findById(999L)).thenReturn(Optional.of(n4Example1));
        adminGrammarService.deleteExample(501L, 999L);
        verify(grammarExampleRepository).delete(n4Example1);
    }

    @Test
    @DisplayName("SearchService: Tìm kiếm ngữ pháp N4 theo từ khóa và levelCode thành công")
    void testSearchN4GrammarByKeyword() {
        when(grammarRepository.searchByKeyword("んです", "N4")).thenReturn(List.of(n4Grammar1));

        SearchResponse response = searchService.search("んです", "GRAMMAR", "N4", 0, 20);

        assertNotNull(response);
        assertEquals(1, response.total());
        assertEquals(ContentType.GRAMMAR, response.items().get(0).contentType());
        assertEquals(501L, response.items().get(0).contentId());
        assertEquals("～んです", response.items().get(0).title());
        assertEquals("N4", response.items().get(0).level());
    }

    @Test
    @DisplayName("FavoriteService: Thêm yêu thích và kiểm tra trạng thái ngữ pháp N4 thành công")
    void testFavoriteN4Grammar() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(grammarRepository.existsById(501L)).thenReturn(true);

        Favorite savedFav = new Favorite();
        savedFav.setId(10L);
        savedFav.setUser(testUser);
        savedFav.setContentType(ContentType.GRAMMAR);
        savedFav.setContentId(501L);

        when(favoriteRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.GRAMMAR, 501L))
                .thenReturn(Optional.empty())
                .thenReturn(Optional.of(savedFav));
        when(favoriteRepository.save(any(Favorite.class))).thenReturn(savedFav);

        CreateFavoriteRequest req = new CreateFavoriteRequest(ContentType.GRAMMAR, 501L);
        FavoriteResponse favRes = favoriteService.addFavorite(jwt, req);

        assertNotNull(favRes);
        assertEquals(501L, favRes.contentId());
        assertEquals(ContentType.GRAMMAR, favRes.contentType());

        FavoriteCheckResponse checkRes = favoriteService.checkFavorite(jwt, ContentType.GRAMMAR, 501L);
        assertTrue(checkRes.favorited());
    }

    @Test
    @DisplayName("ProgressService: Tiến độ 3 giai đoạn của Ngữ pháp N4 (mở mẫu, xem nội dung, xem ví dụ => COMPLETED)")
    void testN4GrammarProgressFlow() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(grammarRepository.existsById(501L)).thenReturn(true);

        UserContentProgress progressRecord = new UserContentProgress();
        progressRecord.setId(1L);
        progressRecord.setUser(testUser);
        progressRecord.setContentType(ContentType.GRAMMAR);
        progressRecord.setContentId(501L);
        progressRecord.setProgressPercent(0);
        progressRecord.setStatus(LearningStatus.NOT_STARTED);

        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.GRAMMAR, 501L))
                .thenReturn(Optional.of(progressRecord));
        when(userContentProgressRepository.save(any(UserContentProgress.class))).thenAnswer(inv -> inv.getArgument(0));

        // Bước 1: Mở pattern (33%)
        UpdateContentProgressRequest step1 = new UpdateContentProgressRequest(ContentType.GRAMMAR, 501L, null, true, false, false);
        ContentProgressResponse res1 = progressService.updateContentProgress(jwt, step1);
        assertEquals(33, res1.progressPercent());
        assertEquals(LearningStatus.IN_PROGRESS, res1.status());

        // Bước 2: Xem nội dung giải thích (67%)
        UpdateContentProgressRequest step2 = new UpdateContentProgressRequest(ContentType.GRAMMAR, 501L, null, false, true, false);
        ContentProgressResponse res2 = progressService.updateContentProgress(jwt, step2);
        assertEquals(67, res2.progressPercent());
        assertEquals(LearningStatus.IN_PROGRESS, res2.status());

        // Bước 3: Xem ví dụ (100% => COMPLETED)
        UpdateContentProgressRequest step3 = new UpdateContentProgressRequest(ContentType.GRAMMAR, 501L, null, false, false, true);
        ContentProgressResponse res3 = progressService.updateContentProgress(jwt, step3);
        assertEquals(100, res3.progressPercent());
        assertEquals(LearningStatus.COMPLETED, res3.status());
    }

    @Test
    @DisplayName("N5 Regression: Đảm bảo dữ liệu và API ngữ pháp N5 không bị ảnh hưởng")
    void testN5GrammarRegressionStillWorks() {
        when(lessonRepository.existsById(1L)).thenReturn(true);
        when(grammarRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(List.of(n5Grammar1));

        List<GrammarResponse> n5Res = grammarService.getByLessonId(1L);

        assertNotNull(n5Res);
        assertEquals(1, n5Res.size());
        assertEquals(1L, n5Res.get(0).lessonId());
        assertEquals("～は～です", n5Res.get(0).pattern());
        assertEquals("N1 là N2", n5Res.get(0).meaning());
    }
}
