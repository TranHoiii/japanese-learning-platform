package com.japanese.learning.progress.dto;

import com.japanese.learning.progress.enums.LearningStatus;

import java.time.LocalDateTime;

public record LessonProgressResponse(
        Long lessonId,
        Integer lessonNumber,
        String lessonTitle,
        Integer progressPercent,
        LearningStatus status,
        LocalDateTime lastAccessedAt,
        LocalDateTime completedAt
) {
}
