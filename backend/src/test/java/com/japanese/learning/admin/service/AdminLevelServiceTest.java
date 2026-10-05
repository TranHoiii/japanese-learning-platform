package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminLevelRequest;
import com.japanese.learning.admin.dto.AdminLevelResponse;
import com.japanese.learning.common.exception.DeleteConflictException;
import com.japanese.learning.common.exception.DuplicateResourceException;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
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
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminLevelServiceTest {

    @Mock
    private LevelRepository levelRepository;

    @Mock
    private LessonRepository lessonRepository;

    @InjectMocks
    private AdminLevelService adminLevelService;

    private Level levelN5;
    private Level levelN4;

    @BeforeEach
    void setUp() {
        levelN5 = new Level();
        levelN5.setId(1L);
        levelN5.setCode("N5");
        levelN5.setName("Cấp độ N5");
        levelN5.setDescription("Sơ cấp 1");
        levelN5.setSortOrder(1);
        levelN5.setActive(true);
        levelN5.setLessons(new ArrayList<>());

        levelN4 = new Level();
        levelN4.setId(2L);
        levelN4.setCode("N4");
        levelN4.setName("Cấp độ N4");
        levelN4.setDescription(null);
        levelN4.setSortOrder(2);
        levelN4.setActive(false);
        levelN4.setLessons(new ArrayList<>());
    }

    // ==============================================================
    // getAllLevels
    // ==============================================================

    @Test
    @DisplayName("getAllLevels: Lấy tất cả cấp độ bao gồm active và inactive theo thứ tự sortOrder")
    void testGetAllLevels_Success() {
        when(levelRepository.findAllByOrderBySortOrderAsc())
                .thenReturn(List.of(levelN5, levelN4));

        List<AdminLevelResponse> results = adminLevelService.getAllLevels();

        assertNotNull(results);
        assertEquals(2, results.size());

        AdminLevelResponse r1 = results.get(0);
        assertEquals(1L, r1.id());
        assertEquals("N5", r1.code());
        assertEquals("Cấp độ N5", r1.name());
        assertEquals("Sơ cấp 1", r1.description());
        assertEquals(1, r1.sortOrder());
        assertTrue(r1.isActive());

        AdminLevelResponse r2 = results.get(1);
        assertEquals(2L, r2.id());
        assertEquals("N4", r2.code());
        assertEquals("Cấp độ N4", r2.name());
        assertNull(r2.description());
        assertEquals(2, r2.sortOrder());
        assertFalse(r2.isActive());

        verify(levelRepository).findAllByOrderBySortOrderAsc();
    }

    @Test
    @DisplayName("getAllLevels: Trả về danh sách rỗng khi không có cấp độ nào")
    void testGetAllLevels_Empty() {
        when(levelRepository.findAllByOrderBySortOrderAsc())
                .thenReturn(Collections.emptyList());

        List<AdminLevelResponse> results = adminLevelService.getAllLevels();

        assertNotNull(results);
        assertTrue(results.isEmpty());
        verify(levelRepository).findAllByOrderBySortOrderAsc();
    }

    // ==============================================================
    // getLevelById
    // ==============================================================

    @Test
    @DisplayName("getLevelById: Lấy thông tin cấp độ theo ID thành công")
    void testGetLevelById_Success() {
        when(levelRepository.findById(1L)).thenReturn(Optional.of(levelN5));

        AdminLevelResponse response = adminLevelService.getLevelById(1L);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals("N5", response.code());
        assertEquals("Cấp độ N5", response.name());
        assertEquals("Sơ cấp 1", response.description());
        assertEquals(1, response.sortOrder());
        assertTrue(response.isActive());

        verify(levelRepository).findById(1L);
    }

    @Test
    @DisplayName("getLevelById: Ném ResourceNotFoundException khi không tìm thấy cấp độ")
    void testGetLevelById_NotFound() {
        when(levelRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminLevelService.getLevelById(999L)
        );

        assertTrue(ex.getMessage().contains("999"));
        verify(levelRepository).findById(999L);
    }

    // ==============================================================
    // createLevel
    // ==============================================================

    @Test
    @DisplayName("createLevel: Tạo mới cấp độ thành công với mã được chuẩn hóa in hoa và trim")
    void testCreateLevel_Success() {
        AdminLevelRequest request = new AdminLevelRequest("  n3  ", "  Cấp độ N3  ", "  Trung cấp 1  ", 3, true);
        when(levelRepository.existsByCode("N3")).thenReturn(false);

        Level savedLevel = new Level();
        savedLevel.setId(3L);
        savedLevel.setCode("N3");
        savedLevel.setName("Cấp độ N3");
        savedLevel.setDescription("Trung cấp 1");
        savedLevel.setSortOrder(3);
        savedLevel.setActive(true);
        when(levelRepository.save(any(Level.class))).thenReturn(savedLevel);

        AdminLevelResponse response = adminLevelService.createLevel(request);

        assertNotNull(response);
        assertEquals(3L, response.id());
        assertEquals("N3", response.code());
        assertEquals("Cấp độ N3", response.name());
        assertEquals("Trung cấp 1", response.description());
        assertEquals(3, response.sortOrder());
        assertTrue(response.isActive());

        ArgumentCaptor<Level> captor = ArgumentCaptor.forClass(Level.class);
        verify(levelRepository).save(captor.capture());
        Level captured = captor.getValue();
        assertEquals("N3", captured.getCode());
        assertEquals("Cấp độ N3", captured.getName());
        assertEquals("Trung cấp 1", captured.getDescription());
        assertEquals(3, captured.getSortOrder());
        assertTrue(captured.getActive());
    }

    @Test
    @DisplayName("createLevel: isActive mặc định là true khi request truyền isActive null")
    void testCreateLevel_DefaultActiveTrue() {
        AdminLevelRequest request = new AdminLevelRequest("N2", "Cấp độ N2", null, 4, null);
        when(levelRepository.existsByCode("N2")).thenReturn(false);

        Level savedLevel = new Level();
        savedLevel.setId(4L);
        savedLevel.setCode("N2");
        savedLevel.setName("Cấp độ N2");
        savedLevel.setDescription(null);
        savedLevel.setSortOrder(4);
        savedLevel.setActive(true);
        when(levelRepository.save(any(Level.class))).thenReturn(savedLevel);

        AdminLevelResponse response = adminLevelService.createLevel(request);

        assertNotNull(response);
        assertTrue(response.isActive());

        ArgumentCaptor<Level> captor = ArgumentCaptor.forClass(Level.class);
        verify(levelRepository).save(captor.capture());
        assertTrue(captor.getValue().getActive());
        assertNull(captor.getValue().getDescription());
    }

    @Test
    @DisplayName("createLevel: Cho phép tạo cấp độ ở trạng thái không hoạt động (isActive = false)")
    void testCreateLevel_ActiveFalse() {
        AdminLevelRequest request = new AdminLevelRequest("N1", "Cấp độ N1", "Cao cấp", 5, false);
        when(levelRepository.existsByCode("N1")).thenReturn(false);

        Level savedLevel = new Level();
        savedLevel.setId(5L);
        savedLevel.setCode("N1");
        savedLevel.setName("Cấp độ N1");
        savedLevel.setDescription("Cao cấp");
        savedLevel.setSortOrder(5);
        savedLevel.setActive(false);
        when(levelRepository.save(any(Level.class))).thenReturn(savedLevel);

        AdminLevelResponse response = adminLevelService.createLevel(request);

        assertNotNull(response);
        assertFalse(response.isActive());

        ArgumentCaptor<Level> captor = ArgumentCaptor.forClass(Level.class);
        verify(levelRepository).save(captor.capture());
        assertFalse(captor.getValue().getActive());
    }

    @Test
    @DisplayName("createLevel: Ném DuplicateResourceException khi mã cấp độ đã tồn tại")
    void testCreateLevel_DuplicateCode() {
        AdminLevelRequest request = new AdminLevelRequest("N5", "Cấp độ N5 trùng", null, 1, true);
        when(levelRepository.existsByCode("N5")).thenReturn(true);

        DuplicateResourceException ex = assertThrows(
                DuplicateResourceException.class,
                () -> adminLevelService.createLevel(request)
        );

        assertTrue(ex.getMessage().contains("N5"));
        verify(levelRepository, never()).save(any());
    }

    // ==============================================================
    // updateLevel
    // ==============================================================

    @Test
    @DisplayName("updateLevel: Cập nhật thông tin cấp độ thành công")
    void testUpdateLevel_Success() {
        AdminLevelRequest request = new AdminLevelRequest("N5_NEW", "Cấp độ N5 mới", "Mô tả mới", 10, false);
        when(levelRepository.findById(1L)).thenReturn(Optional.of(levelN5));
        when(levelRepository.existsByCodeAndIdNot("N5_NEW", 1L)).thenReturn(false);

        Level updatedLevel = new Level();
        updatedLevel.setId(1L);
        updatedLevel.setCode("N5_NEW");
        updatedLevel.setName("Cấp độ N5 mới");
        updatedLevel.setDescription("Mô tả mới");
        updatedLevel.setSortOrder(10);
        updatedLevel.setActive(false);
        when(levelRepository.save(any(Level.class))).thenReturn(updatedLevel);

        AdminLevelResponse response = adminLevelService.updateLevel(1L, request);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals("N5_NEW", response.code());
        assertEquals("Cấp độ N5 mới", response.name());
        assertEquals("Mô tả mới", response.description());
        assertEquals(10, response.sortOrder());
        assertFalse(response.isActive());

        ArgumentCaptor<Level> captor = ArgumentCaptor.forClass(Level.class);
        verify(levelRepository).save(captor.capture());
        Level captured = captor.getValue();
        assertEquals("N5_NEW", captured.getCode());
        assertEquals("Cấp độ N5 mới", captured.getName());
        assertEquals("Mô tả mới", captured.getDescription());
        assertEquals(10, captured.getSortOrder());
        assertFalse(captured.getActive());
    }

    @Test
    @DisplayName("updateLevel: Giữ nguyên trạng thái isActive khi request có isActive là null")
    void testUpdateLevel_IsActiveNull_PreservesExisting() {
        AdminLevelRequest request = new AdminLevelRequest("N5", "Cấp độ N5", "Mô tả", 1, null);
        when(levelRepository.findById(1L)).thenReturn(Optional.of(levelN5));
        when(levelRepository.existsByCodeAndIdNot("N5", 1L)).thenReturn(false);

        Level updatedLevel = new Level();
        updatedLevel.setId(1L);
        updatedLevel.setCode("N5");
        updatedLevel.setName("Cấp độ N5");
        updatedLevel.setDescription("Mô tả");
        updatedLevel.setSortOrder(1);
        updatedLevel.setActive(true); // preserved true
        when(levelRepository.save(any(Level.class))).thenReturn(updatedLevel);

        AdminLevelResponse response = adminLevelService.updateLevel(1L, request);

        assertNotNull(response);
        assertTrue(response.isActive());

        ArgumentCaptor<Level> captor = ArgumentCaptor.forClass(Level.class);
        verify(levelRepository).save(captor.capture());
        assertTrue(captor.getValue().getActive());
    }

    @Test
    @DisplayName("updateLevel: Ném ResourceNotFoundException khi ID cấp độ không tồn tại")
    void testUpdateLevel_NotFound() {
        AdminLevelRequest request = new AdminLevelRequest("N5", "Cấp độ N5", null, 1, true);
        when(levelRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminLevelService.updateLevel(999L, request)
        );

        assertTrue(ex.getMessage().contains("999"));
        verify(levelRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateLevel: Ném DuplicateResourceException khi mã mới bị trùng với cấp độ khác")
    void testUpdateLevel_DuplicateCode() {
        AdminLevelRequest request = new AdminLevelRequest("N4", "Cấp độ N5 đổi tên thành N4", null, 1, true);
        when(levelRepository.findById(1L)).thenReturn(Optional.of(levelN5));
        when(levelRepository.existsByCodeAndIdNot("N4", 1L)).thenReturn(true);

        DuplicateResourceException ex = assertThrows(
                DuplicateResourceException.class,
                () -> adminLevelService.updateLevel(1L, request)
        );

        assertTrue(ex.getMessage().contains("N4"));
        verify(levelRepository, never()).save(any());
    }

    // ==============================================================
    // deleteLevel
    // ==============================================================

    @Test
    @DisplayName("deleteLevel: Xóa cấp độ thành công khi không có bài học liên kết")
    void testDeleteLevel_Success() {
        when(levelRepository.findById(1L)).thenReturn(Optional.of(levelN5));
        when(lessonRepository.existsByLevelId(1L)).thenReturn(false);

        adminLevelService.deleteLevel(1L);

        verify(levelRepository).delete(levelN5);
    }

    @Test
    @DisplayName("deleteLevel: Ném ResourceNotFoundException khi cấp độ cần xóa không tồn tại")
    void testDeleteLevel_NotFound() {
        when(levelRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminLevelService.deleteLevel(999L)
        );

        assertTrue(ex.getMessage().contains("999"));
        verify(levelRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteLevel: Ném DeleteConflictException khi lessonRepository báo có bài học liên kết")
    void testDeleteLevel_Conflict_LessonRepository() {
        when(levelRepository.findById(1L)).thenReturn(Optional.of(levelN5));
        when(lessonRepository.existsByLevelId(1L)).thenReturn(true);

        DeleteConflictException ex = assertThrows(
                DeleteConflictException.class,
                () -> adminLevelService.deleteLevel(1L)
        );

        assertTrue(ex.getMessage().contains("Không thể xóa cấp độ này vì vẫn còn bài học liên kết"));
        verify(levelRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteLevel: Ném DeleteConflictException khi level entity có danh sách bài học không rỗng")
    void testDeleteLevel_Conflict_EntityLessonsNotEmpty() {
        Lesson mockLesson = new Lesson();
        mockLesson.setId(101L);
        levelN5.getLessons().add(mockLesson);

        when(levelRepository.findById(1L)).thenReturn(Optional.of(levelN5));
        when(lessonRepository.existsByLevelId(1L)).thenReturn(false);

        DeleteConflictException ex = assertThrows(
                DeleteConflictException.class,
                () -> adminLevelService.deleteLevel(1L)
        );

        assertTrue(ex.getMessage().contains("Không thể xóa cấp độ này vì vẫn còn bài học liên kết"));
        verify(levelRepository, never()).delete(any());
    }
}
