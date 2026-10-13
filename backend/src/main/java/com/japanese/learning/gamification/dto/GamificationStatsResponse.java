package com.japanese.learning.gamification.dto;

import java.util.List;

public record GamificationStatsResponse(
        Long userId,
        int totalXp,
        int streak,
        int bestStreak,
        int dailyGoal,
        int level,
        String levelTitle,
        String lastActiveDate,
        List<String> unlockedBadges
) {}
