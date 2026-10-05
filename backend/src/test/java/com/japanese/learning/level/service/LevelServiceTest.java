package com.japanese.learning.level.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.level.dto.LevelMapper;
import com.japanese.learning.level.dto.LevelResponse;
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
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LevelServiceTest {

    @Mock
    private LevelRepository levelRepository;

    @Spy
    private LevelMapper levelMapper = Mappers.getMapper(LevelMapper.class);

    @InjectMocks
    private LevelServiceImpl levelService;

    private Level levelN5;
    private Level levelN4;
    private Level levelInactive;

    @BeforeEach
    void setUp() {
        levelN5 = new Level();
        levelN5.setId(1L);
        levelN5.setCode("N5");
        levelN5.setName("Cấp độ N5");
        levelN5.setDescription("Sơ cấp 1");
        levelN5.setSortOrder(1);
        levelN5.setActive(true);

        levelN4 = new Level();
        levelN4.setId(2L);
        levelN4.setCode("N4");
        levelN4.setName("Cấp độ N4");
        levelN4.setDescription("Sơ cấp 2");
        levelN4.setSortOrder(2);
        levelN4.setActive(true);

        levelInactive = new Level();
        levelInactive.setId(99L);
        levelInactive.setCode("N_OFF");
        levelInactive.setName("Cấp độ tạm ẩn");
        levelInactive.setDescription(null);
        levelInactive.setSortOrder(99);
        levelInactive.setActive(false);
    }

    // ==============================================================
    // getAllActiveLevels
    // ==============================================================

    @Test
    @DisplayName("getAllActiveLevels: Trả về danh sách cấp độ hoạt động thành công sắp xếp theo sortOrder")
    void testGetAllActiveLevels_Success() {
        when(levelRepository.findByActiveTrueOrderBySortOrderAsc())
                .thenReturn(List.of(levelN5, levelN4));

        List<LevelResponse> result = levelService.getAllActiveLevels();

        assertNotNull(result);
        assertEquals(2, result.size());

        LevelResponse first = result.get(0);
        assertEquals(1L, first.id());
        assertEquals("N5", first.code());
        assertEquals("Cấp độ N5", first.name());
        assertEquals("Sơ cấp 1", first.description());
        assertEquals(1, first.sortOrder());
        assertTrue(first.isActive());

        LevelResponse second = result.get(1);
        assertEquals(2L, second.id());
        assertEquals("N4", second.code());
        assertEquals("Cấp độ N4", second.name());
        assertEquals("Sơ cấp 2", second.description());
        assertEquals(2, second.sortOrder());
        assertTrue(second.isActive());

        verify(levelRepository).findByActiveTrueOrderBySortOrderAsc();
    }

    @Test
    @DisplayName("getAllActiveLevels: Trả về danh sách rỗng khi không có level active nào")
    void testGetAllActiveLevels_Empty() {
        when(levelRepository.findByActiveTrueOrderBySortOrderAsc())
                .thenReturn(Collections.emptyList());

        List<LevelResponse> result = levelService.getAllActiveLevels();

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(levelRepository).findByActiveTrueOrderBySortOrderAsc();
    }

    @Test
    @DisplayName("getAllActiveLevels: Chỉ truy vấn các level active từ repository")
    void testGetAllActiveLevels_OnlyActiveQueried() {
        when(levelRepository.findByActiveTrueOrderBySortOrderAsc())
                .thenReturn(List.of(levelN5));

        List<LevelResponse> result = levelService.getAllActiveLevels();

        assertEquals(1, result.size());
        assertEquals("N5", result.get(0).code());
        assertTrue(result.get(0).isActive());
        verify(levelRepository).findByActiveTrueOrderBySortOrderAsc();
    }

    // ==============================================================
    // getById
    // ==============================================================

    @Test
    @DisplayName("getById: Lấy thông tin cấp độ theo ID thành công")
    void testGetById_Success() {
        when(levelRepository.findById(1L)).thenReturn(Optional.of(levelN5));

        LevelResponse response = levelService.getById(1L);

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
    @DisplayName("getById: Lấy thông tin cấp độ có description là null")
    void testGetById_NullDescription() {
        when(levelRepository.findById(99L)).thenReturn(Optional.of(levelInactive));

        LevelResponse response = levelService.getById(99L);

        assertNotNull(response);
        assertEquals(99L, response.id());
        assertEquals("N_OFF", response.code());
        assertNull(response.description());
        assertFalse(response.isActive());

        verify(levelRepository).findById(99L);
    }

    @Test
    @DisplayName("getById: Ném ResourceNotFoundException khi không tìm thấy level")
    void testGetById_NotFound() {
        when(levelRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> levelService.getById(999L)
        );

        assertTrue(ex.getMessage().contains("Không tìm thấy level với id: 999"));
        verify(levelRepository).findById(999L);
    }
}
