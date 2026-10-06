package com.japanese.learning.progress.dto;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.progress.enums.LearningStatus;

import java.time.LocalDateTime;

public record ContentProgressResponse(
        ContentType contentType,
        Long contentId,
        Integer progressPercent,
        LearningStatus status,
        LocalDateTime lastAccessedAt,
        LocalDateTime completedAt,
        Boolean patternOpened,
        Boolean contentViewed,
        Boolean examplesViewed
) {
    public ContentProgressResponse(
            ContentType contentType,
            Long contentId,
            Integer progressPercent,
            LearningStatus status,
            LocalDateTime lastAccessedAt,
            LocalDateTime completedAt
    ) {
        this(contentType, contentId, progressPercent, status, lastAccessedAt, completedAt, false, false, false);
    }
}
