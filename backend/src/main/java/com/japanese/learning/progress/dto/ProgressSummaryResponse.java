package com.japanese.learning.progress.dto;

public record ProgressSummaryResponse(
        Integer overallProgress,
        long completedLessons,
        long totalLessons,
        long inProgressLessons
) {
}
