package com.japanese.learning.kanji;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.dto.AdminKanjiRequest;
import com.japanese.learning.admin.dto.AdminKanjiResponse;
import com.japanese.learning.admin.service.AdminKanjiService;
import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.DuplicateResourceException;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.favorite.dto.CreateFavoriteRequest;
import com.japanese.learning.favorite.dto.FavoriteCheckResponse;
import com.japanese.learning.favorite.dto.FavoriteResponse;
import com.japanese.learning.favorite.entity.Favorite;
import com.japanese.learning.favorite.repository.FavoriteRepository;
import com.japanese.learning.favorite.service.FavoriteServiceImpl;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.config.N4KanjiDataSeeder;
import com.japanese.learning.kanji.dto.KanjiCompoundMapper;
import com.japanese.learning.kanji.dto.KanjiMapper;
import com.japanese.learning.kanji.dto.KanjiResponse;
import com.japanese.learning.kanji.entity.Kanji;
import com.japanese.learning.kanji.entity.KanjiCompound;
import com.japanese.learning.kanji.entity.LessonKanji;
import com.japanese.learning.kanji.repository.KanjiCompoundRepository;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.kanji.repository.LessonKanjiRepository;
import com.japanese.learning.kanji.service.KanjiServiceImpl;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.progress.dto.ContentProgressResponse;
import com.japanese.learning.progress.dto.LessonProgressResponse;
import com.japanese.learning.progress.dto.UpdateContentProgressRequest;
import com.japanese.learning.progress.entity.UserContentProgress;
import com.japanese.learning.progress.entity.UserLessonProgress;
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
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class N4KanjiIntegrationTest {

    @Mock
    private KanjiRepository kanjiRepository;

    @Mock
    private LessonKanjiRepository lessonKanjiRepository;

    @Mock
    private KanjiCompoundRepository kanjiCompoundRepository;

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
    private KanjiCompoundMapper kanjiCompoundMapper = Mappers.getMapper(KanjiCompoundMapper.class);

    @Spy
    private KanjiMapper kanjiMapper = Mappers.getMapper(KanjiMapper.class);

    private final ObjectMapper objectMapper = new ObjectMapper();

    private KanjiServiceImpl kanjiService;
    private AdminKanjiService adminKanjiService;
    private SearchServiceImpl searchService;
    private FavoriteServiceImpl favoriteService;
    private ProgressServiceImpl progressService;

    private Level n4Level;
    private Level n5Level;
    private Lesson n4Lesson26;
    private Lesson n4Lesson47;
    private Lesson n5Lesson01;
    private Kanji n4Kanji1;
    private Kanji n4Kanji2;
    private KanjiCompound n4Compound1;
    private LessonKanji n4LessonKanji1;
    private LessonKanji n4LessonKanji2;
    private Kanji n5Kanji1;
    private LessonKanji n5LessonKanji1;
    private User testUser;
    private Jwt jwt;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(kanjiMapper, "kanjiCompoundMapper", kanjiCompoundMapper);

        kanjiService = new KanjiServiceImpl(kanjiRepository, lessonKanjiRepository, kanjiCompoundRepository, lessonRepository, kanjiMapper, kanjiCompoundMapper);
        adminKanjiService = new AdminKanjiService(kanjiRepository, lessonKanjiRepository, lessonRepository);
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

        n4Lesson47 = new Lesson();
        n4Lesson47.setId(47L);
        n4Lesson47.setLevel(n4Level);
        n4Lesson47.setLessonNumber(47);
        n4Lesson47.setTitle("Bài 47");
        n4Lesson47.setSortOrder(47);
        n4Lesson47.setActive(true);

        n5Lesson01 = new Lesson();
        n5Lesson01.setId(1L);
        n5Lesson01.setLevel(n5Level);
        n5Lesson01.setLessonNumber(1);
        n5Lesson01.setTitle("Bài 01");
        n5Lesson01.setSortOrder(1);
        n5Lesson01.setActive(true);

        // N4 Kanji 1: 案 (án)
        n4Kanji1 = new Kanji();
        n4Kanji1.setId(301L);
        n4Kanji1.setKanji("案");
        n4Kanji1.setHanViet("ÁN");
        n4Kanji1.setOnyomi("アン");
        n4Kanji1.setKunyomi("");
        n4Kanji1.setMeaning("đề án, phương án, kế hoạch");
        n4Kanji1.setStrokeCount(10);
        n4Kanji1.setMnemonic("Kế hoạch an toàn dựa trên cây gỗ");
        n4Kanji1.setStrokeOrderUrl("https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/06848.svg");

        n4Compound1 = new KanjiCompound();
        n4Compound1.setId(1001L);
        n4Compound1.setKanji(n4Kanji1);
        n4Compound1.setWord("案内");
        n4Compound1.setReading("あんない");
        n4Compound1.setMeaning("hướng dẫn");
        n4Kanji1.setCompounds(new ArrayList<>(List.of(n4Compound1)));

        n4LessonKanji1 = new LessonKanji();
        n4LessonKanji1.setId(2001L);
        n4LessonKanji1.setLesson(n4Lesson26);
        n4LessonKanji1.setKanji(n4Kanji1);
        n4LessonKanji1.setSortOrder(1);

        n4Kanji1.setLessonKanjis(new ArrayList<>(List.of(n4LessonKanji1)));

        // N4 Kanji 2: 内
        n4Kanji2 = new Kanji();
        n4Kanji2.setId(302L);
        n4Kanji2.setKanji("内");
        n4Kanji2.setHanViet("NỘI");
        n4Kanji2.setOnyomi("ナイ, ダイ");
        n4Kanji2.setKunyomi("うち");
        n4Kanji2.setMeaning("bên trong");
        n4Kanji2.setStrokeCount(4);
        n4Kanji2.setCompounds(new ArrayList<>());

        n4LessonKanji2 = new LessonKanji();
        n4LessonKanji2.setId(2002L);
        n4LessonKanji2.setLesson(n4Lesson26);
        n4LessonKanji2.setKanji(n4Kanji2);
        n4LessonKanji2.setSortOrder(2);

        n4Kanji2.setLessonKanjis(new ArrayList<>(List.of(n4LessonKanji2)));

        // N5 Kanji 1: 一
        n5Kanji1 = new Kanji();
        n5Kanji1.setId(1L);
        n5Kanji1.setKanji("一");
        n5Kanji1.setHanViet("NHẤT");
        n5Kanji1.setOnyomi("イチ, イツ");
        n5Kanji1.setKunyomi("ひと, ひとつ");
        n5Kanji1.setMeaning("một");
        n5Kanji1.setStrokeCount(1);
        n5Kanji1.setCompounds(new ArrayList<>());

        n5LessonKanji1 = new LessonKanji();
        n5LessonKanji1.setId(1L);
        n5LessonKanji1.setLesson(n5Lesson01);
        n5LessonKanji1.setKanji(n5Kanji1);
        n5LessonKanji1.setSortOrder(1);
        n5Kanji1.setLessonKanjis(new ArrayList<>(List.of(n5LessonKanji1)));

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
    @DisplayName("N4 Seed Data JSON: Đảm bảo tồn tại, đúng 192 chữ Kanji, 682 từ ghép và lesson mapping 26-46")
    void testN4JsonSeedDataIntegrity() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n4-kanji.json");
        assertTrue(resource.exists(), "File data/n4-kanji.json phải tồn tại trong resources");

        List<N4KanjiDataSeeder.KanjiPayload> list;
        try (InputStream is = resource.getInputStream()) {
            list = objectMapper.readValue(is, new TypeReference<List<N4KanjiDataSeeder.KanjiPayload>>() {});
        }

        assertNotNull(list);
        assertEquals(192, list.size(), "Tổng số Kanji N4 trích xuất từ PDF phải chính xác là 192 chữ");

        Set<String> uniqueKanji = new HashSet<>();
        Map<Integer, Integer> kanjiPerLesson = new TreeMap<>();
        int totalCompounds = 0;

        for (N4KanjiDataSeeder.KanjiPayload kp : list) {
            assertNotNull(kp.kanji(), "Chữ Kanji không được null");
            assertFalse(kp.kanji().isBlank(), "Chữ Kanji không được trống");
            assertTrue(uniqueKanji.add(kp.kanji()), "Không được trùng lặp chữ Kanji trong file JSON: " + kp.kanji());

            assertNotNull(kp.hanViet(), "Âm Hán Việt không được null");
            assertFalse(kp.hanViet().isBlank(), "Âm Hán Việt không được trống");

            assertNotNull(kp.meaning(), "Nghĩa tiếng Việt không được null");
            assertFalse(kp.meaning().isBlank(), "Nghĩa tiếng Việt không được trống");

            assertNotNull(kp.lessons(), "lessons không được null");
            assertFalse(kp.lessons().isEmpty(), "lessons không được rỗng");
            for (Integer lNum : kp.lessons()) {
                assertTrue(lNum >= 26 && lNum <= 46,
                        "lessonNumber phải nằm trong khoảng 26 đến 46 (Unit 1 đến 21)");
                kanjiPerLesson.put(lNum, kanjiPerLesson.getOrDefault(lNum, 0) + 1);
            }

            assertNotNull(kp.sortOrder(), "sortOrder không được null");
            assertTrue(kp.sortOrder() > 0, "sortOrder phải lớn hơn 0");

            assertNotNull(kp.strokeCount(), "strokeCount không được null");
            assertTrue(kp.strokeCount() > 0, "strokeCount phải lớn hơn 0");

            if (kp.compounds() != null) {
                for (N4KanjiDataSeeder.CompoundPayload cp : kp.compounds()) {
                    assertNotNull(cp.word(), "Từ ghép không được null");
                    assertFalse(cp.word().isBlank(), "Từ ghép không được trống");
                    assertNotNull(cp.reading(), "Cách đọc từ ghép không được null");
                    assertFalse(cp.reading().isBlank(), "Cách đọc từ ghép không được trống");
                    // Lưu ý: PDF gốc chỉ cung cấp từ vựng ghép và cách đọc furigana, không có cột nghĩa riêng
                    totalCompounds++;
                }
            }
        }

        assertEquals(192, uniqueKanji.size(), "Tất cả 192 chữ Kanji phải là duy nhất");
        assertEquals(21, kanjiPerLesson.size(), "Dữ liệu trải dài trên 21 bài học (Bài 26 đến 46)");
        assertEquals(682, totalCompounds, "Tổng số từ ghép trích xuất từ PDF phải chính xác là 682");

        // Kiểm tra thứ tự tuần tự trong từng bài
        for (int l = 26; l <= 46; l++) {
            final int curLesson = l;
            List<N4KanjiDataSeeder.KanjiPayload> lessonList = list.stream()
                    .filter(k -> k.lessons() != null && k.lessons().contains(curLesson))
                    .toList();
            assertFalse(lessonList.isEmpty(), "Bài " + curLesson + " phải có ít nhất 1 chữ Kanji");
            for (int i = 0; i < lessonList.size(); i++) {
                assertEquals(i + 1, lessonList.get(i).sortOrder(), "Sort order bài " + curLesson + " phải liên tục từ 1");
            }
        }
    }

    @Test
    @DisplayName("KanjiService: Lấy danh sách Kanji theo Lesson ID N4 thành công")
    void testGetKanjisByN4LessonId_Success() {
        when(lessonRepository.existsById(26L)).thenReturn(true);
        when(lessonKanjiRepository.findByLessonIdOrderBySortOrderAsc(26L))
                .thenReturn(List.of(n4LessonKanji1, n4LessonKanji2));

        List<KanjiResponse> result = kanjiService.getKanjisByLessonId(26L);

        assertNotNull(result);
        assertEquals(2, result.size());

        KanjiResponse first = result.get(0);
        assertEquals("案", first.getKanji());
        assertEquals("ÁN", first.getHanViet());
        assertEquals("アン", first.getOnyomi());
        assertEquals(10, first.getStrokeCount());
        assertEquals("N4", first.getLevelCode());
        assertEquals(26, first.getLessonNumber());
        assertEquals(1, first.getCompounds().size());
        assertEquals("案内", first.getCompounds().get(0).getWord());
        assertEquals("hướng dẫn", first.getCompounds().get(0).getMeaning());

        KanjiResponse second = result.get(1);
        assertEquals("内", second.getKanji());
        assertEquals("NỘI", second.getHanViet());
        assertEquals("N4", second.getLevelCode());
        assertEquals(26, second.getLessonNumber());
    }

    @Test
    @DisplayName("KanjiService: Lấy chi tiết Kanji N4 theo ID thành công kèm từ ghép và levelCode")
    void testGetN4KanjiById_Success() {
        when(kanjiRepository.findByIdWithDetails(301L)).thenReturn(Optional.of(n4Kanji1));

        KanjiResponse response = kanjiService.getKanjiById(301L);

        assertNotNull(response);
        assertEquals(301L, response.getId());
        assertEquals("案", response.getKanji());
        assertEquals("ÁN", response.getHanViet());
        assertEquals("N4", response.getLevelCode());
        assertEquals(26, response.getLessonNumber());
        assertEquals(1, response.getCompounds().size());
        assertEquals("あんない", response.getCompounds().get(0).getReading());
    }

    @Test
    @DisplayName("SearchService: Tìm kiếm Kanji N4 theo chữ Hán, Hán Việt và nghĩa tiếng Việt")
    void testSearchN4Kanji_Success() {
        when(kanjiRepository.searchByKeyword(eq("ÁN"), isNull())).thenReturn(List.of(n4Kanji1));

        SearchResponse response = searchService.search("ÁN", "KANJI", null, 0, 10);

        assertNotNull(response);
        assertNotNull(response.items());
        assertEquals(1, response.total());
        assertEquals("案", response.items().get(0).title());
        assertEquals("ÁN", response.items().get(0).subtitle());
    }

    @Test
    @DisplayName("FavoriteService: Thêm và kiểm tra yêu thích Kanji N4 với ContentType.KANJI")
    void testFavoriteN4Kanji_ToggleAndCheck() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(kanjiRepository.existsById(301L)).thenReturn(true);

        CreateFavoriteRequest req = new CreateFavoriteRequest(ContentType.KANJI, 301L);
        Favorite fav = new Favorite();
        fav.setId(901L);
        fav.setUser(testUser);
        fav.setContentType(ContentType.KANJI);
        fav.setContentId(301L);

        when(favoriteRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.KANJI, 301L))
                .thenReturn(Optional.empty())
                .thenReturn(Optional.of(fav));
        when(favoriteRepository.save(any(Favorite.class))).thenReturn(fav);

        FavoriteResponse favResponse = favoriteService.addFavorite(jwt, req);
        assertNotNull(favResponse);
        assertEquals(ContentType.KANJI, favResponse.contentType());
        assertEquals(301L, favResponse.contentId());

        // Kiểm tra favorite check
        FavoriteCheckResponse checkRes = favoriteService.checkFavorite(jwt, ContentType.KANJI, 301L);
        assertTrue(checkRes.favorited());
    }

    @Test
    @DisplayName("ProgressService: Cập nhật tiến độ Kanji N4 theo item-level semantics và tính toán bài học")
    void testProgressN4Kanji_ItemUpdateAndLessonAggregation() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(kanjiRepository.existsById(301L)).thenReturn(true);

        UserContentProgress contentProgress = new UserContentProgress();
        contentProgress.setId(5001L);
        contentProgress.setUser(testUser);
        contentProgress.setContentType(ContentType.KANJI);
        contentProgress.setContentId(301L);
        contentProgress.setStatus(LearningStatus.COMPLETED);
        contentProgress.setProgressPercent(100);

        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.KANJI, 301L))
                .thenReturn(Optional.of(contentProgress));
        when(userContentProgressRepository.save(any(UserContentProgress.class))).thenReturn(contentProgress);

        UpdateContentProgressRequest request = new UpdateContentProgressRequest(
                ContentType.KANJI,
                301L,
                100
        );

        ContentProgressResponse resp = progressService.updateContentProgress(jwt, request);
        assertNotNull(resp);
        assertEquals(LearningStatus.COMPLETED, resp.status());
        assertEquals(100, resp.progressPercent());

        // Kiểm tra logic dynamic aggregation: Bài 47 không có Kanji thì không tính vào denominator
        when(vocabularyRepository.findByLessonIdOrderByIdAsc(47L)).thenReturn(Collections.emptyList());
        when(grammarRepository.findByLessonIdOrderBySortOrderAsc(47L)).thenReturn(Collections.emptyList());
        when(lessonKanjiRepository.findByLessonIdOrderBySortOrderAsc(47L)).thenReturn(Collections.emptyList()); // 0 kanji
        when(listeningContentRepository.findByLessonIdOrderBySortOrderAsc(47L)).thenReturn(Collections.emptyList());
        when(readingContentRepository.findByLessonIdOrderBySortOrderAsc(47L)).thenReturn(Collections.emptyList());
        when(exerciseRepository.findByLessonIdOrderBySortOrderAsc(47L)).thenReturn(Collections.emptyList());

        UserLessonProgress ulp = new UserLessonProgress();
        ulp.setUser(testUser);
        ulp.setLesson(n4Lesson47);
        when(userLessonProgressRepository.findByUserIdAndLessonId(100L, 47L)).thenReturn(Optional.of(ulp));
        when(userLessonProgressRepository.save(any(UserLessonProgress.class))).thenReturn(ulp);

        LessonProgressResponse recalculated = progressService.calculateAndSyncLessonProgress(testUser, n4Lesson47);
        assertNotNull(recalculated);
        assertEquals(0, recalculated.progressPercent(), "Bài không có nội dung nào thì tiến độ là 0%");
    }

    @Test
    @DisplayName("AdminKanjiService: Quản trị viên quản lý Kanji N4 và ngăn ngừa trùng lặp chữ Hán")
    void testAdminKanji_CreateAndDuplicateConflict() {
        when(kanjiRepository.findAllByOrderByIdAsc()).thenReturn(List.of(n4Kanji1, n4Kanji2));

        List<AdminKanjiResponse> allKanjis = adminKanjiService.getAllKanjis();
        assertEquals(2, allKanjis.size());
        assertEquals("案", allKanjis.get(0).kanji());

        // Test tạo mới khi đã tồn tại ký tự chữ Hán
        when(kanjiRepository.existsByKanji("案")).thenReturn(true);
        AdminKanjiRequest duplicateReq = new AdminKanjiRequest(
                "案", "ÁN", "アン", "", "kế hoạch", 10, "", "Kế hoạch", ""
        );

        assertThrows(DuplicateResourceException.class, () -> adminKanjiService.createKanji(duplicateReq));
    }

    @Test
    @DisplayName("N5 Kanji Regression: Đảm bảo Kanji N5 không bị ảnh hưởng và giữ nguyên levelCode N5")
    void testN5KanjiRegression_Unchanged() {
        when(lessonRepository.existsById(1L)).thenReturn(true);
        when(lessonKanjiRepository.findByLessonIdOrderBySortOrderAsc(1L))
                .thenReturn(List.of(n5LessonKanji1));

        List<KanjiResponse> n5Kanjis = kanjiService.getKanjisByLessonId(1L);

        assertNotNull(n5Kanjis);
        assertEquals(1, n5Kanjis.size());
        assertEquals("一", n5Kanjis.get(0).getKanji());
        assertEquals("NHẤT", n5Kanjis.get(0).getHanViet());
        assertEquals("N5", n5Kanjis.get(0).getLevelCode(), "Kanji N5 phải giữ nguyên levelCode là N5");
        assertEquals(1, n5Kanjis.get(0).getLessonNumber(), "Kanji N5 phải giữ nguyên lessonNumber là 1");
    }
}
