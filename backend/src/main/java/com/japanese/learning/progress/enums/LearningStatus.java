package com.japanese.learning.progress.enums;

public enum LearningStatus {
    NOT_STARTED,
    IN_PROGRESS,
    COMPLETED;

    public static LearningStatus fromProgressPercent(int percent) {
        if (percent <= 0) {
            return NOT_STARTED;
        }
        if (percent >= 100) {
            return COMPLETED;
        }
        return IN_PROGRESS;
    }
}

