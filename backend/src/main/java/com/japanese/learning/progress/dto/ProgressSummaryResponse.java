package com.japanese.learning.progress.dto;

public record ProgressSummaryResponse(
        int overallProgress,
        long completedLessons,
        long totalLessons,
        long inProgressLessons,
        Integer vocabularyMastery,
        Integer kanjiMastery,
        Integer grammarMastery,
        Integer listeningMastery,
        Integer readingMastery
) {
    public ProgressSummaryResponse(
            int overallProgress,
            long completedLessons,
            long totalLessons,
            long inProgressLessons
    ) {
        this(overallProgress, completedLessons, totalLessons, inProgressLessons, 0, 0, 0, 0, 0);
    }
}
