package com.japanese.learning.gamification.service;

import com.japanese.learning.gamification.dto.BadgeResponse;
import com.japanese.learning.gamification.dto.GamificationStatsResponse;
import com.japanese.learning.gamification.dto.GamificationSyncRequest;
import com.japanese.learning.gamification.dto.LeaderboardUserResponse;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public interface GamificationService {
    GamificationStatsResponse getStats(Jwt jwt);
    GamificationStatsResponse syncStats(Jwt jwt, GamificationSyncRequest request);
    List<LeaderboardUserResponse> getLeaderboard(Jwt jwt, String period);
    List<BadgeResponse> getBadges(Jwt jwt);
}
