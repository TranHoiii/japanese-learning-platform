package com.japanese.learning.lesson.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.dto.LessonMapper;
import com.japanese.learning.lesson.dto.LessonResponse;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LessonServiceTest {

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private LevelRepository levelRepository;

    @Spy
    private LessonMapper lessonMapper = Mappers.getMapper(LessonMapper.class);

    @InjectMocks
    private LessonServiceImpl lessonService;

    private Level level;
    private Lesson lesson1;
    private Lesson lesson2;

    @BeforeEach
    void setUp() {
        level = new Level();
        level.setId(1L);
        level.setCode("N5");
        level.setName("N5 Sơ cấp");
        level.setSortOrder(1);
        level.setActive(true);

        lesson1 = new Lesson();
        lesson1.setId(10L);
        lesson1.setLevel(level);
        lesson1.setLessonNumber(1);
        lesson1.setTitle("Bài 01");
        lesson1.setDescription("Giới thiệu");
        lesson1.setSortOrder(1);
        lesson1.setActive(true);

        lesson2 = new Lesson();
        lesson2.setId(11L);
        lesson2.setLevel(level);
        lesson2.setLessonNumber(2);
        lesson2.setTitle("Bài 02");
        lesson2.setDescription(null);
        lesson2.setSortOrder(2);
        lesson2.setActive(true);
    }

    // ==========================================================
    // getLessonsByLevelId
    // ==========================================================

    @Test
    @DisplayName("getLessonsByLevelId: Trả về danh sách bài học thành công")
    void testGetLessonsByLevelId_Success() {
        when(levelRepository.existsById(1L)).thenReturn(true);
        when(lessonRepository.findByLevelIdAndActiveTrueOrderBySortOrderAsc(1L))
                .thenReturn(List.of(lesson1, lesson2));

        List<LessonResponse> responses = lessonService.getLessonsByLevelId(1L);

        assertNotNull(responses);
        assertEquals(2, responses.size());

        assertEquals(10L, responses.get(0).id());
        assertEquals(1L, responses.get(0).levelId());
        assertEquals(1, responses.get(0).lessonNumber());
        assertEquals("Bài 01", responses.get(0).title());
        assertEquals("Giới thiệu", responses.get(0).description());
        assertTrue(responses.get(0).isActive());

        assertEquals(11L, responses.get(1).id());
        assertEquals("Bài 02", responses.get(1).title());

        verify(levelRepository).existsById(1L);
        verify(lessonRepository).findByLevelIdAndActiveTrueOrderBySortOrderAsc(1L);
    }

    @Test
    @DisplayName("getLessonsByLevelId: Trả về danh sách rỗng khi level không có bài học nào")
    void testGetLessonsByLevelId_EmptyList() {
        when(levelRepository.existsById(1L)).thenReturn(true);
        when(lessonRepository.findByLevelIdAndActiveTrueOrderBySortOrderAsc(1L))
                .thenReturn(Collections.emptyList());

        List<LessonResponse> responses = lessonService.getLessonsByLevelId(1L);

        assertNotNull(responses);
        assertTrue(responses.isEmpty());
        verify(levelRepository).existsById(1L);
        verify(lessonRepository).findByLevelIdAndActiveTrueOrderBySortOrderAsc(1L);
    }

    @Test
    @DisplayName("getLessonsByLevelId: Ném ResourceNotFoundException khi level không tồn tại")
    void testGetLessonsByLevelId_LevelNotFound() {
        when(levelRepository.existsById(999L)).thenReturn(false);

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> lessonService.getLessonsByLevelId(999L)
        );

        assertTrue(ex.getMessage().contains("999"));
        verify(levelRepository).existsById(999L);
        verify(lessonRepository, never()).findByLevelIdAndActiveTrueOrderBySortOrderAsc(999L);
    }

    @Test
    @DisplayName("getLessonsByLevelId: Chỉ trả về bài học active (filter xảy ra ở repository)")
    void testGetLessonsByLevelId_OnlyActiveReturned() {
        // Repository is responsible for the active filter; service just calls it.
        when(levelRepository.existsById(1L)).thenReturn(true);
        when(lessonRepository.findByLevelIdAndActiveTrueOrderBySortOrderAsc(1L))
                .thenReturn(List.of(lesson1)); // only 1 active

        List<LessonResponse> responses = lessonService.getLessonsByLevelId(1L);

        assertEquals(1, responses.size());
        assertEquals(10L, responses.get(0).id());
    }

    // ==========================================================
    // getById
    // ==========================================================

    @Test
    @DisplayName("getById: Lấy bài học theo ID thành công")
    void testGetById_Success() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson1));

        LessonResponse response = lessonService.getById(10L);

        assertNotNull(response);
        assertEquals(10L, response.id());
        assertEquals(1L, response.levelId());
        assertEquals(1, response.lessonNumber());
        assertEquals("Bài 01", response.title());
        assertEquals("Giới thiệu", response.description());
        assertEquals(1, response.sortOrder());
        assertTrue(response.isActive());

        verify(lessonRepository).findById(10L);
    }

    @Test
    @DisplayName("getById: Ánh xạ đúng khi description là null")
    void testGetById_NullDescription() {
        when(lessonRepository.findById(11L)).thenReturn(Optional.of(lesson2));

        LessonResponse response = lessonService.getById(11L);

        assertNotNull(response);
        assertEquals(11L, response.id());
        assertEquals("Bài 02", response.title());
        // description should be null
        assertTrue(response.description() == null || response.description().isEmpty() || response.description().equals(lesson2.getDescription()));
    }

    @Test
    @DisplayName("getById: Ném ResourceNotFoundException khi ID không tồn tại")
    void testGetById_NotFound() {
        when(lessonRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> lessonService.getById(999L)
        );

        assertTrue(ex.getMessage().contains("999"));
        verify(lessonRepository).findById(999L);
    }
}
