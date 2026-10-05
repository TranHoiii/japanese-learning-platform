package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminVocabularyRequest;
import com.japanese.learning.admin.dto.AdminVocabularyResponse;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import com.japanese.learning.vocabulary.entity.Vocabulary;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminVocabularyServiceTest {

    @Mock
    private VocabularyRepository vocabularyRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private LevelRepository levelRepository;

    @InjectMocks
    private AdminVocabularyService adminVocabularyService;

    private Level level;
    private Lesson lesson;
    private Vocabulary vocabulary;

    @BeforeEach
    void setUp() {
        level = new Level();
        level.setId(1L);
        level.setCode("N5");
        level.setName("N5 Sơ cấp");

        lesson = new Lesson();
        lesson.setId(10L);
        lesson.setLevel(level);
        lesson.setLessonNumber(1);
        lesson.setTitle("Bài 01");

        vocabulary = new Vocabulary();
        vocabulary.setId(100L);
        vocabulary.setLesson(lesson);
        vocabulary.setHiragana("たべる");
        vocabulary.setKanji("食べる");
        vocabulary.setHanViet("Thực");
        vocabulary.setMeaning("Ăn");
        vocabulary.setPartOfSpeech("Động từ nhóm 2");
        vocabulary.setAudioUrl("/audio/taberu.mp3");
        vocabulary.setNotes("Từ vựng cơ bản");
    }

    @Test
    @DisplayName("getVocabularies: Lấy tất cả khi cả lessonId và levelId đều null")
    void testGetVocabularies_NoFilter_Success() {
        when(vocabularyRepository.findAllByOrderByIdAsc()).thenReturn(List.of(vocabulary));

        List<AdminVocabularyResponse> results = adminVocabularyService.getVocabularies(null, null);

        assertNotNull(results);
        assertEquals(1, results.size());
        assertEquals("たべる", results.get(0).hiragana());
        assertEquals("N5", results.get(0).levelCode());
        assertEquals(1, results.get(0).lessonNumber());
        verify(vocabularyRepository).findAllByOrderByIdAsc();
    }

    @Test
    @DisplayName("getVocabularies: Lọc theo lessonId thành công")
    void testGetVocabularies_ByLessonId_Success() {
        when(lessonRepository.existsById(10L)).thenReturn(true);
        when(vocabularyRepository.findByLessonIdOrderByIdAsc(10L)).thenReturn(List.of(vocabulary));

        List<AdminVocabularyResponse> results = adminVocabularyService.getVocabularies(10L, null);

        assertNotNull(results);
        assertEquals(1, results.size());
        assertEquals("たべる", results.get(0).hiragana());
        verify(lessonRepository).existsById(10L);
        verify(vocabularyRepository).findByLessonIdOrderByIdAsc(10L);
    }

    @Test
    @DisplayName("getVocabularies: Ném ResourceNotFoundException khi lessonId không tồn tại")
    void testGetVocabularies_ByLessonId_NotFound() {
        when(lessonRepository.existsById(999L)).thenReturn(false);

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminVocabularyService.getVocabularies(999L, null)
        );

        assertEquals("Không tìm thấy bài học với ID: 999", ex.getMessage());
        verify(vocabularyRepository, never()).findByLessonIdOrderByIdAsc(anyLong());
    }

    @Test
    @DisplayName("getVocabularies: Lọc theo levelId khi lessonId null thành công")
    void testGetVocabularies_ByLevelId_Success() {
        when(levelRepository.existsById(1L)).thenReturn(true);
        when(vocabularyRepository.findByLevelIdOrderByIdAsc(1L)).thenReturn(List.of(vocabulary));

        List<AdminVocabularyResponse> results = adminVocabularyService.getVocabularies(null, 1L);

        assertNotNull(results);
        assertEquals(1, results.size());
        assertEquals("たべる", results.get(0).hiragana());
        verify(levelRepository).existsById(1L);
        verify(vocabularyRepository).findByLevelIdOrderByIdAsc(1L);
    }

    @Test
    @DisplayName("getVocabularies: Ném ResourceNotFoundException khi levelId không tồn tại")
    void testGetVocabularies_ByLevelId_NotFound() {
        when(levelRepository.existsById(999L)).thenReturn(false);

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminVocabularyService.getVocabularies(null, 999L)
        );

        assertEquals("Không tìm thấy cấp độ với ID: 999", ex.getMessage());
        verify(vocabularyRepository, never()).findByLevelIdOrderByIdAsc(anyLong());
    }

    @Test
    @DisplayName("getVocabularyById: Lấy chi tiết từ vựng thành công")
    void testGetVocabularyById_Success() {
        when(vocabularyRepository.findById(100L)).thenReturn(Optional.of(vocabulary));

        AdminVocabularyResponse response = adminVocabularyService.getVocabularyById(100L);

        assertNotNull(response);
        assertEquals(100L, response.id());
        assertEquals(10L, response.lessonId());
        assertEquals(1, response.lessonNumber());
        assertEquals("N5", response.levelCode());
        assertEquals("たべる", response.hiragana());
        assertEquals("食べる", response.kanji());
        assertEquals("Thực", response.hanViet());
        assertEquals("Ăn", response.meaning());
        assertEquals("Động từ nhóm 2", response.partOfSpeech());
        assertEquals("/audio/taberu.mp3", response.audioUrl());
        assertEquals("Từ vựng cơ bản", response.notes());
    }

    @Test
    @DisplayName("getVocabularyById: Ném ResourceNotFoundException khi ID không tồn tại")
    void testGetVocabularyById_NotFound() {
        when(vocabularyRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminVocabularyService.getVocabularyById(999L)
        );

        assertEquals("Không tìm thấy từ vựng với ID: 999", ex.getMessage());
    }

    @Test
    @DisplayName("getVocabularyById: Xử lý an toàn khi Lesson hoặc Level là null")
    void testGetVocabularyById_NullLessonOrLevel() {
        Vocabulary vNoLevel = new Vocabulary();
        vNoLevel.setId(101L);
        Lesson lessonNoLevel = new Lesson();
        lessonNoLevel.setId(20L);
        vNoLevel.setLesson(lessonNoLevel);
        vNoLevel.setHiragana("みず");
        vNoLevel.setMeaning("Nước");

        when(vocabularyRepository.findById(101L)).thenReturn(Optional.of(vNoLevel));

        AdminVocabularyResponse response = adminVocabularyService.getVocabularyById(101L);

        assertNotNull(response);
        assertEquals(20L, response.lessonId());
        assertNull(response.levelCode());
        assertNull(response.lessonNumber());
    }

    @Test
    @DisplayName("createVocabulary: Tạo từ vựng thành công và trim các trường văn bản")
    void testCreateVocabulary_Success() {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                10L,
                "  のむ  ",
                "  飲む  ",
                "  Ẩm  ",
                "  Uống  ",
                "  Động từ nhóm 1  ",
                "  /audio/nomu.mp3  ",
                "  Ghi chú  "
        );

        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(vocabularyRepository.save(any(Vocabulary.class))).thenAnswer(invocation -> {
            Vocabulary saved = invocation.getArgument(0);
            saved.setId(105L);
            return saved;
        });

        AdminVocabularyResponse response = adminVocabularyService.createVocabulary(request);

        assertNotNull(response);
        assertEquals(105L, response.id());
        assertEquals(10L, response.lessonId());
        assertEquals("のむ", response.hiragana());
        assertEquals("飲む", response.kanji());
        assertEquals("Ẩm", response.hanViet());
        assertEquals("Uống", response.meaning());
        assertEquals("Động từ nhóm 1", response.partOfSpeech());
        assertEquals("/audio/nomu.mp3", response.audioUrl());
        assertEquals("Ghi chú", response.notes());

        ArgumentCaptor<Vocabulary> captor = ArgumentCaptor.forClass(Vocabulary.class);
        verify(vocabularyRepository).save(captor.capture());
        Vocabulary captured = captor.getValue();
        assertEquals("のむ", captured.getHiragana());
        assertEquals("飲む", captured.getKanji());
        assertEquals("Ẩm", captured.getHanViet());
        assertEquals("Uống", captured.getMeaning());
        assertEquals("Động từ nhóm 1", captured.getPartOfSpeech());
        assertEquals("/audio/nomu.mp3", captured.getAudioUrl());
        assertEquals("Ghi chú", captured.getNotes());
    }

    @Test
    @DisplayName("createVocabulary: Ném ResourceNotFoundException khi bài học không tồn tại")
    void testCreateVocabulary_LessonNotFound() {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                999L, "ねこ", null, null, "Mèo", null, null, null
        );

        when(lessonRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminVocabularyService.createVocabulary(request)
        );

        assertEquals("Không tìm thấy bài học với ID: 999", ex.getMessage());
        verify(vocabularyRepository, never()).save(any());
    }

    @Test
    @DisplayName("createVocabulary: Chuyển các trường tùy chọn rỗng/chỉ chứa khoảng trắng thành null")
    void testCreateVocabulary_BlankOptionalFields_ConvertedToNull() {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                10L,
                "いぬ",
                "   ",
                "",
                "Con chó",
                "   ",
                "",
                "   "
        );

        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(vocabularyRepository.save(any(Vocabulary.class))).thenAnswer(invocation -> {
            Vocabulary saved = invocation.getArgument(0);
            saved.setId(106L);
            return saved;
        });

        AdminVocabularyResponse response = adminVocabularyService.createVocabulary(request);

        assertNotNull(response);
        assertNull(response.kanji());
        assertNull(response.hanViet());
        assertNull(response.partOfSpeech());
        assertNull(response.audioUrl());
        assertNull(response.notes());

        ArgumentCaptor<Vocabulary> captor = ArgumentCaptor.forClass(Vocabulary.class);
        verify(vocabularyRepository).save(captor.capture());
        Vocabulary captured = captor.getValue();
        assertNull(captured.getKanji());
        assertNull(captured.getHanViet());
        assertNull(captured.getPartOfSpeech());
        assertNull(captured.getAudioUrl());
        assertNull(captured.getNotes());
    }

    @Test
    @DisplayName("updateVocabulary: Cập nhật từ vựng thành công")
    void testUpdateVocabulary_Success() {
        Lesson newLesson = new Lesson();
        newLesson.setId(11L);
        newLesson.setLevel(level);
        newLesson.setLessonNumber(2);

        AdminVocabularyRequest updateReq = new AdminVocabularyRequest(
                11L,
                "たべる (update)",
                "食",
                "Thực",
                "Ăn cơm",
                "Động từ",
                null,
                "Cập nhật"
        );

        when(vocabularyRepository.findById(100L)).thenReturn(Optional.of(vocabulary));
        when(lessonRepository.findById(11L)).thenReturn(Optional.of(newLesson));
        when(vocabularyRepository.save(any(Vocabulary.class))).thenAnswer(invocation -> invocation.getArgument(0));

        AdminVocabularyResponse response = adminVocabularyService.updateVocabulary(100L, updateReq);

        assertNotNull(response);
        assertEquals(100L, response.id());
        assertEquals(11L, response.lessonId());
        assertEquals("たべる (update)", response.hiragana());
        assertEquals("Ăn cơm", response.meaning());
        assertEquals("Cập nhật", response.notes());
        assertNull(response.audioUrl());

        verify(vocabularyRepository).save(vocabulary);
    }

    @Test
    @DisplayName("updateVocabulary: Ném ResourceNotFoundException khi từ vựng không tồn tại")
    void testUpdateVocabulary_VocabularyNotFound() {
        AdminVocabularyRequest updateReq = new AdminVocabularyRequest(
                10L, "ねこ", null, null, "Mèo", null, null, null
        );

        when(vocabularyRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminVocabularyService.updateVocabulary(999L, updateReq)
        );

        assertEquals("Không tìm thấy từ vựng với ID: 999", ex.getMessage());
        verify(vocabularyRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateVocabulary: Ném ResourceNotFoundException khi bài học mới không tồn tại")
    void testUpdateVocabulary_LessonNotFound() {
        AdminVocabularyRequest updateReq = new AdminVocabularyRequest(
                999L, "ねこ", null, null, "Mèo", null, null, null
        );

        when(vocabularyRepository.findById(100L)).thenReturn(Optional.of(vocabulary));
        when(lessonRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminVocabularyService.updateVocabulary(100L, updateReq)
        );

        assertEquals("Không tìm thấy bài học với ID: 999", ex.getMessage());
        verify(vocabularyRepository, never()).save(any());
    }

    @Test
    @DisplayName("deleteVocabulary: Xóa từ vựng thành công")
    void testDeleteVocabulary_Success() {
        when(vocabularyRepository.findById(100L)).thenReturn(Optional.of(vocabulary));

        adminVocabularyService.deleteVocabulary(100L);

        verify(vocabularyRepository).findById(100L);
        verify(vocabularyRepository).delete(vocabulary);
    }

    @Test
    @DisplayName("deleteVocabulary: Ném ResourceNotFoundException khi từ vựng không tồn tại")
    void testDeleteVocabulary_NotFound() {
        when(vocabularyRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminVocabularyService.deleteVocabulary(999L)
        );

        assertEquals("Không tìm thấy từ vựng với ID: 999", ex.getMessage());
        verify(vocabularyRepository, never()).delete(any());
    }
}
