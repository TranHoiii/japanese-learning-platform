package com.japanese.learning.lesson.dto;

import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class LessonMapperTest {

    private final LessonMapper lessonMapper = Mappers.getMapper(LessonMapper.class);

    private Level buildLevel(Long id, String code) {
        Level level = new Level();
        level.setId(id);
        level.setCode(code);
        level.setName("Level " + code);
        level.setSortOrder(1);
        level.setActive(true);
        return level;
    }

    private Lesson buildLesson(Long id, Level level, Integer lessonNumber,
                               String title, String description, Integer sortOrder, Boolean active) {
        Lesson lesson = new Lesson();
        lesson.setId(id);
        lesson.setLevel(level);
        lesson.setLessonNumber(lessonNumber);
        lesson.setTitle(title);
        lesson.setDescription(description);
        lesson.setSortOrder(sortOrder);
        lesson.setActive(active);
        return lesson;
    }

    @Test
    @DisplayName("toResponse: Ánh xạ đầy đủ các field từ Lesson sang LessonResponse")
    void testToResponse_FullFields() {
        Level level = buildLevel(1L, "N5");
        Lesson lesson = buildLesson(10L, level, 1, "Bài 01", "Giới thiệu", 1, true);

        LessonResponse response = lessonMapper.toResponse(lesson);

        assertNotNull(response);
        assertEquals(10L, response.id());
        assertEquals(1L, response.levelId());
        assertEquals(1, response.lessonNumber());
        assertEquals("Bài 01", response.title());
        assertEquals("Giới thiệu", response.description());
        assertEquals(1, response.sortOrder());
        assertTrue(response.isActive());
    }

    @Test
    @DisplayName("toResponse: levelId được lấy từ level.id")
    void testToResponse_LevelIdMapping() {
        Level level = buildLevel(42L, "N4");
        Lesson lesson = buildLesson(5L, level, 3, "Bài 03", null, 3, true);

        LessonResponse response = lessonMapper.toResponse(lesson);

        assertEquals(42L, response.levelId());
    }

    @Test
    @DisplayName("toResponse: isActive ánh xạ từ lesson.active (true)")
    void testToResponse_IsActive_True() {
        Level level = buildLevel(1L, "N5");
        Lesson lesson = buildLesson(1L, level, 1, "Bài 01", null, 1, true);

        LessonResponse response = lessonMapper.toResponse(lesson);

        assertTrue(response.isActive());
    }

    @Test
    @DisplayName("toResponse: isActive ánh xạ từ lesson.active (false)")
    void testToResponse_IsActive_False() {
        Level level = buildLevel(1L, "N5");
        Lesson lesson = buildLesson(2L, level, 2, "Bài 02", null, 2, false);

        LessonResponse response = lessonMapper.toResponse(lesson);

        assertFalse(response.isActive());
    }

    @Test
    @DisplayName("toResponse: description null được ánh xạ là null")
    void testToResponse_NullDescription() {
        Level level = buildLevel(1L, "N5");
        Lesson lesson = buildLesson(3L, level, 3, "Bài 03", null, 3, true);

        LessonResponse response = lessonMapper.toResponse(lesson);

        assertNull(response.description());
    }

    @Test
    @DisplayName("toResponse: sortOrder được ánh xạ chính xác")
    void testToResponse_SortOrder() {
        Level level = buildLevel(1L, "N5");
        Lesson lesson = buildLesson(4L, level, 4, "Bài 04", "Mô tả", 99, true);

        LessonResponse response = lessonMapper.toResponse(lesson);

        assertEquals(99, response.sortOrder());
    }

    @Test
    @DisplayName("toResponse: lessonNumber 25 được ánh xạ đúng với levelId đúng")
    void testToResponse_LessonNumber() {
        Level level = buildLevel(2L, "N4");
        Lesson lesson = buildLesson(7L, level, 25, "Bài 25", null, 25, true);

        LessonResponse response = lessonMapper.toResponse(lesson);

        assertEquals(25, response.lessonNumber());
        assertEquals(2L, response.levelId());
    }

    @Test
    @DisplayName("toResponse: sortOrder = 0 được ánh xạ đúng")
    void testToResponse_SortOrderZero() {
        Level level = buildLevel(1L, "N5");
        Lesson lesson = buildLesson(6L, level, 6, "Bài 06", null, 0, true);

        LessonResponse response = lessonMapper.toResponse(lesson);

        assertEquals(0, response.sortOrder());
    }
}
