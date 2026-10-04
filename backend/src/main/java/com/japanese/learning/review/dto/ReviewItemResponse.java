package com.japanese.learning.review.dto;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.review.enums.ReviewStatus;

import java.time.LocalDateTime;

public record ReviewItemResponse(
        Long id,
        ContentType contentType,
        Long contentId,
        Integer wrongCount,
        Integer correctCount,
        Integer priority,
        LocalDateTime lastReviewedAt,
        LocalDateTime nextReviewAt,
        ReviewStatus status,
        String title,
        Long lessonId,
        Integer lessonNumber
) {
}
