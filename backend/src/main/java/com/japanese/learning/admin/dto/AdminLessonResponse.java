package com.japanese.learning.admin.dto;

public record AdminLessonResponse(
        Long id,
        Long levelId,
        String levelCode,
        Integer lessonNumber,
        String title,
        String description,
        Integer sortOrder,
        Boolean isActive
) {
}
