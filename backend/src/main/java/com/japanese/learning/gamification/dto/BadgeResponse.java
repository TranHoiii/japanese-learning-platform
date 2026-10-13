package com.japanese.learning.gamification.dto;

public record BadgeResponse(
        String id,
        String title,
        String japaneseTitle,
        String description,
        String icon,
        String tier,
        boolean isUnlocked,
        String unlockedAt,
        int progressPercent,
        int target,
        int current
) {}
