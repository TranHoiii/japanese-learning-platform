package com.japanese.learning.gamification.dto;

import java.util.List;

public record GamificationSyncRequest(
        int totalXp,
        int streak,
        int bestStreak,
        int dailyGoal,
        String lastActiveDate,
        List<String> claimedBadges
) {}
