package com.japanese.learning.gamification.controller;

import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.gamification.dto.BadgeResponse;
import com.japanese.learning.gamification.dto.GamificationStatsResponse;
import com.japanese.learning.gamification.dto.GamificationSyncRequest;
import com.japanese.learning.gamification.dto.LeaderboardUserResponse;
import com.japanese.learning.gamification.service.GamificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/gamification")
@RequiredArgsConstructor
public class GamificationController {

    private final GamificationService gamificationService;

    @GetMapping("/stats")
    public ApiResponse<GamificationStatsResponse> getStats(@AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.success("Lấy thông tin học tập và XP thành công", gamificationService.getStats(jwt));
    }

    @PostMapping("/sync")
    public ApiResponse<GamificationStatsResponse> syncStats(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody GamificationSyncRequest request
    ) {
        return ApiResponse.success("Đồng bộ dữ liệu học tập thành công", gamificationService.syncStats(jwt, request));
    }

    @GetMapping("/leaderboard")
    public ApiResponse<List<LeaderboardUserResponse>> getLeaderboard(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam(defaultValue = "all_time") String period
    ) {
        return ApiResponse.success("Lấy bảng xếp hạng học viên thành công", gamificationService.getLeaderboard(jwt, period));
    }

    @GetMapping("/badges")
    public ApiResponse<List<BadgeResponse>> getBadges(@AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.success("Lấy danh sách huy hiệu thành công", gamificationService.getBadges(jwt));
    }
}
