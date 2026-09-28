package com.japanese.learning.lesson.dto;

public record LessonResponse(
        Long id,
        Long levelId,
        Integer lessonNumber,
        String title,
        String description,
        Integer sortOrder,
        Boolean isActive
) {
}