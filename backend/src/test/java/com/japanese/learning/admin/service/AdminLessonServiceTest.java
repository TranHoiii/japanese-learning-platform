package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminLessonRequest;
import com.japanese.learning.admin.dto.AdminLessonResponse;
import com.japanese.learning.common.exception.DeleteConflictException;
import com.japanese.learning.common.exception.DuplicateResourceException;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.repository.LessonKanjiRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
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
class AdminLessonServiceTest {

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private LevelRepository levelRepository;

    @Mock
    private VocabularyRepository vocabularyRepository;

    @Mock
    private GrammarRepository grammarRepository;

    @Mock
    private LessonKanjiRepository lessonKanjiRepository;

    @Mock
    private ListeningContentRepository listeningContentRepository;

    @Mock
    private ReadingContentRepository readingContentRepository;

    @Mock
    private ExerciseRepository exerciseRepository;

    @InjectMocks
    private AdminLessonService adminLessonService;

    private Level level;
    private Lesson lesson;

    @BeforeEach
    void setUp() {
        level = new Level();
        level.setId(1L);
        level.setCode("N5");
        level.setName("N5 Sơ cấp");
        level.setSortOrder(1);
        level.setActive(true);

        lesson = new Lesson();
        lesson.setId(10L);
        lesson.setLevel(level);
        lesson.setLessonNumber(1);
        lesson.setTitle("Bài 01");
        lesson.setDescription("Giới thiệu");
        lesson.setSortOrder(1);
        lesson.setActive(true);
        // init empty collections so deleteLesson checks don't NPE
        lesson.setVocabularies(new ArrayList<>());
        lesson.setGrammars(new ArrayList<>());
        lesson.setLessonKanjis(new ArrayList<>());
        lesson.setListenings(new ArrayList<>());
        lesson.setReadings(new ArrayList<>());
        lesson.setExercises(new ArrayList<>());
    }

    // ==============================================================
    // getLessons
    // ==============================================================

    @Test
    @DisplayName("getLessons: Lấy tất cả bài học khi levelId là null")
    void testGetLessons_NoFilter_ReturnsAll() {
        when(lessonRepository.findAllByOrderBySortOrderAsc()).thenReturn(List.of(lesson));

        List<AdminLessonResponse> results = adminLessonService.getLessons(null);

        assertNotNull(results);
        assertEquals(1, results.size());
        assertEquals(10L, results.get(0).id());
        assertEquals(1L, results.get(0).levelId());
        assertEquals("N5", results.get(0).levelCode());
        assertEquals(1, results.get(0).lessonNumber());
        assertEquals("Bài 01", results.get(0).title());
        verify(lessonRepository).findAllByOrderBySortOrderAsc();
    }

    @Test
    @DisplayName("getLessons: Lọc theo levelId thành công")
    void testGetLessons_ByLevelId_Success() {
        when(levelRepository.existsById(1L)).thenReturn(true);
        when(lessonRepository.findByLevelIdOrderBySortOrderAsc(1L)).thenReturn(List.of(lesson));

        List<AdminLessonResponse> results = adminLessonService.getLessons(1L);

        assertNotNull(results);
        assertEquals(1, results.size());
        assertEquals(10L, results.get(0).id());
        verify(levelRepository).existsById(1L);
        verify(lessonRepository).findByLevelIdOrderBySortOrderAsc(1L);
    }

    @Test
    @DisplayName("getLessons: Ném ResourceNotFoundException khi levelId không tồn tại")
    void testGetLessons_LevelNotFound() {
        when(levelRepository.existsById(999L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> adminLessonService.getLessons(999L));

        verify(levelRepository).existsById(999L);
        verify(lessonRepository, never()).findByLevelIdOrderBySortOrderAsc(anyLong());
    }

    @Test
    @DisplayName("getLessons: Trả về danh sách rỗng khi không có bài học nào")
    void testGetLessons_EmptyList() {
        when(lessonRepository.findAllByOrderBySortOrderAsc()).thenReturn(Collections.emptyList());

        List<AdminLessonResponse> results = adminLessonService.getLessons(null);

        assertNotNull(results);
        assertTrue(results.isEmpty());
    }

    // ==============================================================
    // getLessonById
    // ==============================================================

    @Test
    @DisplayName("getLessonById: Lấy bài học theo ID thành công")
    void testGetLessonById_Success() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));

        AdminLessonResponse result = adminLessonService.getLessonById(10L);

        assertNotNull(result);
        assertEquals(10L, result.id());
        assertEquals(1L, result.levelId());
        assertEquals("N5", result.levelCode());
        assertEquals(1, result.lessonNumber());
        assertEquals("Bài 01", result.title());
        assertEquals("Giới thiệu", result.description());
        assertEquals(1, result.sortOrder());
        assertTrue(result.isActive());
        verify(lessonRepository).findById(10L);
    }

    @Test
    @DisplayName("getLessonById: Ném ResourceNotFoundException khi ID không tồn tại")
    void testGetLessonById_NotFound() {
        when(lessonRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminLessonService.getLessonById(999L)
        );

        assertTrue(ex.getMessage().contains("999"));
        verify(lessonRepository).findById(999L);
    }

    // ==============================================================
    // createLesson
    // ==============================================================

    @Test
    @DisplayName("createLesson: Tạo bài học thành công")
    void testCreateLesson_Success() {
        AdminLessonRequest request = new AdminLessonRequest(1L, 3, "Bài 03", "Mô tả bài 03", 3, true);
        when(levelRepository.findById(1L)).thenReturn(Optional.of(level));
        when(lessonRepository.existsByLevelIdAndLessonNumber(1L, 3)).thenReturn(false);

        Lesson savedLesson = new Lesson();
        savedLesson.setId(20L);
        savedLesson.setLevel(level);
        savedLesson.setLessonNumber(3);
        savedLesson.setTitle("Bài 03");
        savedLesson.setDescription("Mô tả bài 03");
        savedLesson.setSortOrder(3);
        savedLesson.setActive(true);
        when(lessonRepository.save(any(Lesson.class))).thenReturn(savedLesson);

        AdminLessonResponse result = adminLessonService.createLesson(request);

        assertNotNull(result);
        assertEquals(20L, result.id());
        assertEquals(1L, result.levelId());
        assertEquals("N5", result.levelCode());
        assertEquals(3, result.lessonNumber());
        assertEquals("Bài 03", result.title());
        assertEquals("Mô tả bài 03", result.description());
        assertEquals(3, result.sortOrder());
        assertTrue(result.isActive());

        ArgumentCaptor<Lesson> captor = ArgumentCaptor.forClass(Lesson.class);
        verify(lessonRepository).save(captor.capture());
        Lesson captured = captor.getValue();
        assertEquals(3, captured.getLessonNumber());
        assertEquals("Bài 03", captured.getTitle());
    }

    @Test
    @DisplayName("createLesson: Ném ResourceNotFoundException khi level không tồn tại")
    void testCreateLesson_LevelNotFound() {
        AdminLessonRequest request = new AdminLessonRequest(999L, 1, "Bài 01", null, 1, true);
        when(levelRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> adminLessonService.createLesson(request));

        verify(lessonRepository, never()).save(any());
    }

    @Test
    @DisplayName("createLesson: Ném DuplicateResourceException khi bài học đã tồn tại trong level")
    void testCreateLesson_DuplicateLessonNumber() {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01", null, 1, true);
        when(levelRepository.findById(1L)).thenReturn(Optional.of(level));
        when(lessonRepository.existsByLevelIdAndLessonNumber(1L, 1)).thenReturn(true);

        DuplicateResourceException ex = assertThrows(
                DuplicateResourceException.class,
                () -> adminLessonService.createLesson(request)
        );

        assertTrue(ex.getMessage().contains("1"));
        verify(lessonRepository, never()).save(any());
    }

    @Test
    @DisplayName("createLesson: Title được trim khi lưu")
    void testCreateLesson_TitleTrimmed() {
        AdminLessonRequest request = new AdminLessonRequest(1L, 5, "  Bài 05  ", null, 5, true);
        when(levelRepository.findById(1L)).thenReturn(Optional.of(level));
        when(lessonRepository.existsByLevelIdAndLessonNumber(1L, 5)).thenReturn(false);

        Lesson savedLesson = new Lesson();
        savedLesson.setId(25L);
        savedLesson.setLevel(level);
        savedLesson.setLessonNumber(5);
        savedLesson.setTitle("Bài 05");
        savedLesson.setSortOrder(5);
        savedLesson.setActive(true);
        when(lessonRepository.save(any(Lesson.class))).thenReturn(savedLesson);

        adminLessonService.createLesson(request);

        ArgumentCaptor<Lesson> captor = ArgumentCaptor.forClass(Lesson.class);
        verify(lessonRepository).save(captor.capture());
        assertEquals("Bài 05", captor.getValue().getTitle());
    }

    @Test
    @DisplayName("createLesson: isActive mặc định true khi request null")
    void testCreateLesson_IsActive_DefaultTrue() {
        AdminLessonRequest request = new AdminLessonRequest(1L, 4, "Bài 04", null, 4, null);
        when(levelRepository.findById(1L)).thenReturn(Optional.of(level));
        when(lessonRepository.existsByLevelIdAndLessonNumber(1L, 4)).thenReturn(false);

        Lesson savedLesson = new Lesson();
        savedLesson.setId(24L);
        savedLesson.setLevel(level);
        savedLesson.setLessonNumber(4);
        savedLesson.setTitle("Bài 04");
        savedLesson.setSortOrder(4);
        savedLesson.setActive(true);
        when(lessonRepository.save(any(Lesson.class))).thenReturn(savedLesson);

        adminLessonService.createLesson(request);

        ArgumentCaptor<Lesson> captor = ArgumentCaptor.forClass(Lesson.class);
        verify(lessonRepository).save(captor.capture());
        assertTrue(captor.getValue().getActive());
    }

    @Test
    @DisplayName("createLesson: description null được lưu là null")
    void testCreateLesson_NullDescription() {
        AdminLessonRequest request = new AdminLessonRequest(1L, 6, "Bài 06", null, 6, true);
        when(levelRepository.findById(1L)).thenReturn(Optional.of(level));
        when(lessonRepository.existsByLevelIdAndLessonNumber(1L, 6)).thenReturn(false);

        Lesson savedLesson = new Lesson();
        savedLesson.setId(26L);
        savedLesson.setLevel(level);
        savedLesson.setLessonNumber(6);
        savedLesson.setTitle("Bài 06");
        savedLesson.setDescription(null);
        savedLesson.setSortOrder(6);
        savedLesson.setActive(true);
        when(lessonRepository.save(any(Lesson.class))).thenReturn(savedLesson);

        adminLessonService.createLesson(request);

        ArgumentCaptor<Lesson> captor = ArgumentCaptor.forClass(Lesson.class);
        verify(lessonRepository).save(captor.capture());
        assertNull(captor.getValue().getDescription());
    }

    // ==============================================================
    // updateLesson
    // ==============================================================

    @Test
    @DisplayName("updateLesson: Cập nhật bài học thành công")
    void testUpdateLesson_Success() {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01 Updated", "Mô tả mới", 1, false);
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(levelRepository.findById(1L)).thenReturn(Optional.of(level));
        when(lessonRepository.existsByLevelIdAndLessonNumberAndIdNot(1L, 1, 10L)).thenReturn(false);

        Lesson updatedLesson = new Lesson();
        updatedLesson.setId(10L);
        updatedLesson.setLevel(level);
        updatedLesson.setLessonNumber(1);
        updatedLesson.setTitle("Bài 01 Updated");
        updatedLesson.setDescription("Mô tả mới");
        updatedLesson.setSortOrder(1);
        updatedLesson.setActive(false);
        when(lessonRepository.save(any(Lesson.class))).thenReturn(updatedLesson);

        AdminLessonResponse result = adminLessonService.updateLesson(10L, request);

        assertNotNull(result);
        assertEquals(10L, result.id());
        assertEquals("Bài 01 Updated", result.title());
        assertEquals("Mô tả mới", result.description());
        verify(lessonRepository).save(any(Lesson.class));
    }

    @Test
    @DisplayName("updateLesson: Ném ResourceNotFoundException khi lesson không tồn tại")
    void testUpdateLesson_LessonNotFound() {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01", null, 1, true);
        when(lessonRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> adminLessonService.updateLesson(999L, request));
        verify(lessonRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateLesson: Ném ResourceNotFoundException khi level mới không tồn tại")
    void testUpdateLesson_LevelNotFound() {
        AdminLessonRequest request = new AdminLessonRequest(999L, 1, "Bài 01", null, 1, true);
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(levelRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> adminLessonService.updateLesson(10L, request));
        verify(lessonRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateLesson: Ném DuplicateResourceException khi lessonNumber trùng với bài khác trong level")
    void testUpdateLesson_DuplicateLessonNumber() {
        AdminLessonRequest request = new AdminLessonRequest(1L, 2, "Bài 02", null, 2, true);
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(levelRepository.findById(1L)).thenReturn(Optional.of(level));
        when(lessonRepository.existsByLevelIdAndLessonNumberAndIdNot(1L, 2, 10L)).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> adminLessonService.updateLesson(10L, request));
        verify(lessonRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateLesson: isActive không cập nhật khi request.isActive() là null")
    void testUpdateLesson_IsActiveNull_NotChanged() {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01", null, 1, null);
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(levelRepository.findById(1L)).thenReturn(Optional.of(level));
        when(lessonRepository.existsByLevelIdAndLessonNumberAndIdNot(1L, 1, 10L)).thenReturn(false);

        Lesson savedLesson = new Lesson();
        savedLesson.setId(10L);
        savedLesson.setLevel(level);
        savedLesson.setLessonNumber(1);
        savedLesson.setTitle("Bài 01");
        savedLesson.setSortOrder(1);
        savedLesson.setActive(true); // unchanged
        when(lessonRepository.save(any(Lesson.class))).thenReturn(savedLesson);

        adminLessonService.updateLesson(10L, request);

        ArgumentCaptor<Lesson> captor = ArgumentCaptor.forClass(Lesson.class);
        verify(lessonRepository).save(captor.capture());
        // active should remain true (not overwritten with null)
        assertTrue(captor.getValue().getActive());
    }

    // ==============================================================
    // deleteLesson
    // ==============================================================

    @Test
    @DisplayName("deleteLesson: Xóa bài học thành công khi không có nội dung liên kết")
    void testDeleteLesson_Success() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(vocabularyRepository.existsByLessonId(10L)).thenReturn(false);
        when(grammarRepository.existsByLessonId(10L)).thenReturn(false);
        when(lessonKanjiRepository.existsByLessonId(10L)).thenReturn(false);
        when(listeningContentRepository.existsByLessonId(10L)).thenReturn(false);
        when(readingContentRepository.existsByLessonId(10L)).thenReturn(false);
        when(exerciseRepository.existsByLessonId(10L)).thenReturn(false);

        adminLessonService.deleteLesson(10L);

        verify(lessonRepository).delete(lesson);
    }

    @Test
    @DisplayName("deleteLesson: Ném ResourceNotFoundException khi bài học không tồn tại")
    void testDeleteLesson_NotFound() {
        when(lessonRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> adminLessonService.deleteLesson(999L));
        verify(lessonRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteLesson: Ném DeleteConflictException khi có từ vựng liên kết")
    void testDeleteLesson_HasVocabulary() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(vocabularyRepository.existsByLessonId(10L)).thenReturn(true);

        DeleteConflictException ex = assertThrows(
                DeleteConflictException.class,
                () -> adminLessonService.deleteLesson(10L)
        );

        assertTrue(ex.getMessage().contains("từ vựng") || ex.getMessage().contains("nội dung"));
        verify(lessonRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteLesson: Ném DeleteConflictException khi có ngữ pháp liên kết")
    void testDeleteLesson_HasGrammar() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(vocabularyRepository.existsByLessonId(10L)).thenReturn(false);
        when(grammarRepository.existsByLessonId(10L)).thenReturn(true);

        assertThrows(DeleteConflictException.class, () -> adminLessonService.deleteLesson(10L));
        verify(lessonRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteLesson: Ném DeleteConflictException khi có kanji liên kết")
    void testDeleteLesson_HasKanji() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(vocabularyRepository.existsByLessonId(10L)).thenReturn(false);
        when(grammarRepository.existsByLessonId(10L)).thenReturn(false);
        when(lessonKanjiRepository.existsByLessonId(10L)).thenReturn(true);

        assertThrows(DeleteConflictException.class, () -> adminLessonService.deleteLesson(10L));
        verify(lessonRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteLesson: Ném DeleteConflictException khi có listening liên kết")
    void testDeleteLesson_HasListening() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(vocabularyRepository.existsByLessonId(10L)).thenReturn(false);
        when(grammarRepository.existsByLessonId(10L)).thenReturn(false);
        when(lessonKanjiRepository.existsByLessonId(10L)).thenReturn(false);
        when(listeningContentRepository.existsByLessonId(10L)).thenReturn(true);

        assertThrows(DeleteConflictException.class, () -> adminLessonService.deleteLesson(10L));
        verify(lessonRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteLesson: Ném DeleteConflictException khi có reading liên kết")
    void testDeleteLesson_HasReading() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(vocabularyRepository.existsByLessonId(10L)).thenReturn(false);
        when(grammarRepository.existsByLessonId(10L)).thenReturn(false);
        when(lessonKanjiRepository.existsByLessonId(10L)).thenReturn(false);
        when(listeningContentRepository.existsByLessonId(10L)).thenReturn(false);
        when(readingContentRepository.existsByLessonId(10L)).thenReturn(true);

        assertThrows(DeleteConflictException.class, () -> adminLessonService.deleteLesson(10L));
        verify(lessonRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteLesson: Ném DeleteConflictException khi có exercise liên kết")
    void testDeleteLesson_HasExercise() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(vocabularyRepository.existsByLessonId(10L)).thenReturn(false);
        when(grammarRepository.existsByLessonId(10L)).thenReturn(false);
        when(lessonKanjiRepository.existsByLessonId(10L)).thenReturn(false);
        when(listeningContentRepository.existsByLessonId(10L)).thenReturn(false);
        when(readingContentRepository.existsByLessonId(10L)).thenReturn(false);
        when(exerciseRepository.existsByLessonId(10L)).thenReturn(true);

        assertThrows(DeleteConflictException.class, () -> adminLessonService.deleteLesson(10L));
        verify(lessonRepository, never()).delete(any());
    }
}
