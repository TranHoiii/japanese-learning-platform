package com.japanese.learning.level.dto;

import com.japanese.learning.lesson.entity.Level;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class LevelMapperTest {

    private final LevelMapper levelMapper = Mappers.getMapper(LevelMapper.class);

    private Level buildLevel(Long id, String code, String name, String description, Integer sortOrder, Boolean active) {
        Level level = new Level();
        level.setId(id);
        level.setCode(code);
        level.setName(name);
        level.setDescription(description);
        level.setSortOrder(sortOrder);
        level.setActive(active);
        return level;
    }

    @Test
    @DisplayName("toResponse: Ánh xạ đầy đủ các field từ Level entity sang LevelResponse")
    void testToResponse_FullFields() {
        Level level = buildLevel(1L, "N5", "Cấp độ N5", "Sơ cấp 1 dành cho người mới bắt đầu", 1, true);

        LevelResponse response = levelMapper.toResponse(level);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals("N5", response.code());
        assertEquals("Cấp độ N5", response.name());
        assertEquals("Sơ cấp 1 dành cho người mới bắt đầu", response.description());
        assertEquals(1, response.sortOrder());
        assertTrue(response.isActive());
    }

    @Test
    @DisplayName("toResponse: isActive ánh xạ chính xác từ level.active khi active = true")
    void testToResponse_ActiveTrue() {
        Level level = buildLevel(2L, "N4", "Cấp độ N4", "Sơ cấp 2", 2, true);

        LevelResponse response = levelMapper.toResponse(level);

        assertNotNull(response);
        assertTrue(response.isActive());
    }

    @Test
    @DisplayName("toResponse: isActive ánh xạ chính xác từ level.active khi active = false")
    void testToResponse_ActiveFalse() {
        Level level = buildLevel(3L, "N3", "Cấp độ N3", "Trung cấp", 3, false);

        LevelResponse response = levelMapper.toResponse(level);

        assertNotNull(response);
        assertFalse(response.isActive());
    }

    @Test
    @DisplayName("toResponse: description null được ánh xạ đúng thành null")
    void testToResponse_NullDescription() {
        Level level = buildLevel(4L, "N2", "Cấp độ N2", null, 4, true);

        LevelResponse response = levelMapper.toResponse(level);

        assertNotNull(response);
        assertNull(response.description());
        assertEquals("N2", response.code());
    }

    @Test
    @DisplayName("toResponse: sortOrder = 0 được ánh xạ chính xác")
    void testToResponse_SortOrderZero() {
        Level level = buildLevel(5L, "N1", "Cấp độ N1", "Cao cấp", 0, true);

        LevelResponse response = levelMapper.toResponse(level);

        assertNotNull(response);
        assertEquals(0, response.sortOrder());
    }

    @Test
    @DisplayName("toResponse: Trả về null khi entity là null")
    void testToResponse_NullEntity() {
        LevelResponse response = levelMapper.toResponse(null);

        assertNull(response);
    }
}
