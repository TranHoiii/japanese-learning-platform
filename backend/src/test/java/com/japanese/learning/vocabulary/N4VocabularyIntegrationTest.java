package com.japanese.learning.vocabulary;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.dto.AdminVocabularyRequest;
import com.japanese.learning.admin.dto.AdminVocabularyResponse;
import com.japanese.learning.admin.service.AdminVocabularyService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.favorite.dto.CreateFavoriteRequest;
import com.japanese.learning.favorite.dto.FavoriteCheckResponse;
import com.japanese.learning.favorite.dto.FavoriteResponse;
import com.japanese.learning.favorite.entity.Favorite;
import com.japanese.learning.favorite.repository.FavoriteRepository;
import com.japanese.learning.favorite.service.FavoriteServiceImpl;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import com.japanese.learning.search.dto.SearchResponse;
import com.japanese.learning.search.service.SearchServiceImpl;
import com.japanese.learning.user.entity.User;
import com.japanese.learning.vocabulary.config.N4DataSeeder;
import com.japanese.learning.vocabulary.dto.VocabularyMapper;
import com.japanese.learning.vocabulary.dto.VocabularyResponse;
import com.japanese.learning.vocabulary.entity.Vocabulary;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import com.japanese.learning.vocabulary.service.VocabularyServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class N4VocabularyIntegrationTest {

    @Mock
    private VocabularyRepository vocabularyRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private LevelRepository levelRepository;

    @Mock
    private FavoriteRepository favoriteRepository;

    @Spy
    private VocabularyMapper vocabularyMapper = Mappers.getMapper(VocabularyMapper.class);

    private final ObjectMapper objectMapper = new ObjectMapper();

    private VocabularyServiceImpl vocabularyService;
    private AdminVocabularyService adminVocabularyService;

    private Level n4Level;
    private Level n5Level;
    private Lesson n4Lesson26;
    private Lesson n5Lesson01;
    private Vocabulary n4Vocab1;
    private Vocabulary n4Vocab2;
    private Vocabulary n5Vocab1;

    @BeforeEach
    void setUp() {
        vocabularyService = new VocabularyServiceImpl(vocabularyRepository, lessonRepository, vocabularyMapper);
        adminVocabularyService = new AdminVocabularyService(vocabularyRepository, lessonRepository, levelRepository);

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
        n5Level.setDescription("Trình độ N5 - Nhập môn tiếng Nhật");
        n5Level.setSortOrder(1);
        n5Level.setActive(true);

        n4Lesson26 = new Lesson();
        n4Lesson26.setId(26L);
        n4Lesson26.setLevel(n4Level);
        n4Lesson26.setLessonNumber(26);
        n4Lesson26.setTitle("Bài 26");
        n4Lesson26.setSortOrder(26);

        n5Lesson01 = new Lesson();
        n5Lesson01.setId(1L);
        n5Lesson01.setLevel(n5Level);
        n5Lesson01.setLessonNumber(1);
        n5Lesson01.setTitle("Bài 01");
        n5Lesson01.setSortOrder(1);

        n4Vocab1 = new Vocabulary();
        n4Vocab1.setId(1054L);
        n4Vocab1.setLesson(n4Lesson26);
        n4Vocab1.setHiragana("みますII");
        n4Vocab1.setKanji("見ます／診ます");
        n4Vocab1.setHanViet("KIẾN / CHẨN");
        n4Vocab1.setMeaning("Xem, khám bệnh");

        n4Vocab2 = new Vocabulary();
        n4Vocab2.setId(1055L);
        n4Vocab2.setLesson(n4Lesson26);
        n4Vocab2.setHiragana("さがしますI");
        n4Vocab2.setKanji("探します、捜します");
        n4Vocab2.setHanViet("THÁM / SƯU");
        n4Vocab2.setMeaning("Tìm, tìm kiếm");

        n5Vocab1 = new Vocabulary();
        n5Vocab1.setId(1L);
        n5Vocab1.setLesson(n5Lesson01);
        n5Vocab1.setHiragana("わたし");
        n5Vocab1.setKanji("私");
        n5Vocab1.setHanViet("Tư");
        n5Vocab1.setMeaning("Tôi");
    }

    @Test
    @DisplayName("N4 Seed Data JSON: Đảm bảo tồn tại, đủ 25 bài (26-50) và 1138 từ vựng")
    void testN4JsonSeedDataIntegrity() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n4-vocabulary.json");
        assertTrue(resource.exists(), "File data/n4-vocabulary.json phải tồn tại trong resources");

        N4DataSeeder.N4DataPayload payload;
        try (InputStream is = resource.getInputStream()) {
            payload = objectMapper.readValue(is, N4DataSeeder.N4DataPayload.class);
        }

        assertNotNull(payload);
        assertEquals("N4", payload.levelCode());
        assertEquals("N4", payload.levelName());
        assertNotNull(payload.lessons());
        assertEquals(25, payload.lessons().size(), "N4 phải gồm chính xác 25 bài học (Bài 26 đến Bài 50)");

        int totalVocabs = 0;
        for (int i = 0; i < payload.lessons().size(); i++) {
            N4DataSeeder.N4LessonPayload lp = payload.lessons().get(i);
            int expectedLessonNum = 26 + i;
            assertEquals(expectedLessonNum, lp.lessonNumber(), "Số thứ tự bài học phải liên tục từ 26 đến 50");
            assertNotNull(lp.vocabularies());
            assertFalse(lp.vocabularies().isEmpty(), "Mỗi bài học N4 phải có từ vựng");
            totalVocabs += lp.vocabularies().size();
        }

        assertEquals(1138, totalVocabs, "Tổng số từ vựng N4 trích xuất từ PDF phải là 1138");
    }

    @Test
    @DisplayName("VocabularyService: Lấy danh sách từ vựng theo Lesson N4 thành công")
    void testGetVocabulariesByN4LessonId_Success() {
        when(lessonRepository.existsById(26L)).thenReturn(true);
        when(vocabularyRepository.findByLessonIdOrderByIdAsc(26L)).thenReturn(List.of(n4Vocab1, n4Vocab2));

        List<VocabularyResponse> result = vocabularyService.getByLessonId(26L);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(26L, result.get(0).lessonId());
        assertEquals("みますII", result.get(0).hiragana());
        assertEquals("見ます／診ます", result.get(0).kanji());
        assertEquals("KIẾN / CHẨN", result.get(0).hanViet());
        assertEquals("Xem, khám bệnh", result.get(0).meaning());
    }

    @Test
    @DisplayName("VocabularyService: Lấy chi tiết từ vựng N4 theo ID thành công")
    void testGetN4VocabularyById_Success() {
        when(vocabularyRepository.findById(1054L)).thenReturn(Optional.of(n4Vocab1));

        VocabularyResponse res = vocabularyService.getById(1054L);

        assertNotNull(res);
        assertEquals(1054L, res.id());
        assertEquals("みますII", res.hiragana());
        assertEquals("Xem, khám bệnh", res.meaning());
    }

    @Test
    @DisplayName("AdminVocabularyService: Lấy danh sách từ vựng theo N4 Level ID thành công")
    void testAdminGetVocabulariesByLevelId_Success() {
        when(levelRepository.existsById(2L)).thenReturn(true);
        when(vocabularyRepository.findByLevelIdOrderByIdAsc(2L)).thenReturn(List.of(n4Vocab1, n4Vocab2));

        List<AdminVocabularyResponse> list = adminVocabularyService.getVocabularies(null, 2L);

        assertNotNull(list);
        assertEquals(2, list.size());
        assertEquals("N4", list.get(0).levelCode());
        assertEquals(26, list.get(0).lessonNumber());
        assertEquals("みますII", list.get(0).hiragana());
    }

    @Test
    @DisplayName("AdminVocabularyService: Thêm và xóa từ vựng N4 thành công")
    void testAdminCreateAndDeleteN4Vocabulary() {
        AdminVocabularyRequest createReq = new AdminVocabularyRequest(
                26L, "おくれますII", "遅れます", "TRÌ", "Muộn, chậm giờ", "Động từ", null, null
        );

        when(lessonRepository.findById(26L)).thenReturn(Optional.of(n4Lesson26));
        when(vocabularyRepository.save(any(Vocabulary.class))).thenAnswer(inv -> {
            Vocabulary v = inv.getArgument(0);
            v.setId(2000L);
            return v;
        });

        AdminVocabularyResponse created = adminVocabularyService.createVocabulary(createReq);
        assertNotNull(created);
        assertEquals(2000L, created.id());
        assertEquals("おくれますII", created.hiragana());
        assertEquals("N4", created.levelCode());

        when(vocabularyRepository.findById(2000L)).thenReturn(Optional.of(n4Vocab1));
        adminVocabularyService.deleteVocabulary(2000L);
        verify(vocabularyRepository).delete(n4Vocab1);
    }

    @Test
    @DisplayName("N5 Regression: Đảm bảo dữ liệu và API N5 vẫn hoạt động bình thường")
    void testN5RegressionStillWorks() {
        when(lessonRepository.existsById(1L)).thenReturn(true);
        when(vocabularyRepository.findByLessonIdOrderByIdAsc(1L)).thenReturn(List.of(n5Vocab1));

        List<VocabularyResponse> n5Res = vocabularyService.getByLessonId(1L);

        assertNotNull(n5Res);
        assertEquals(1, n5Res.size());
        assertEquals(1L, n5Res.get(0).lessonId());
        assertEquals("わたし", n5Res.get(0).hiragana());
        assertEquals("Tôi", n5Res.get(0).meaning());
    }
}
