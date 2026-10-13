package com.japanese.learning.gamification.dto;

public record LeaderboardUserResponse(
        int rank,
        Long userId,
        String fullName,
        String avatarUrl,
        int totalXp,
        int level,
        String levelTitle,
        int streak,
        boolean isCurrentUser
) {}
