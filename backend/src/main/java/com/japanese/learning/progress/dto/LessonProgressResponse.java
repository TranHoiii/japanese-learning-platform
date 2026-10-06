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
        LocalDateTime completedAt,
        Integer vocabularyProgress,
        Integer grammarProgress,
        Integer kanjiProgress,
        Integer listeningProgress,
        Integer readingProgress,
        Integer exerciseProgress
) {
    public LessonProgressResponse(
            Long lessonId,
            Integer lessonNumber,
            String lessonTitle,
            Integer progressPercent,
            LearningStatus status,
            LocalDateTime lastAccessedAt,
            LocalDateTime completedAt
    ) {
        this(lessonId, lessonNumber, lessonTitle, progressPercent, status, lastAccessedAt, completedAt, null, null, null, null, null, null);
    }
}
