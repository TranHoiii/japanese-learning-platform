package com.japanese.learning.gamification.service;

import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.gamification.dto.BadgeResponse;
import com.japanese.learning.gamification.dto.GamificationStatsResponse;
import com.japanese.learning.gamification.dto.GamificationSyncRequest;
import com.japanese.learning.gamification.dto.LeaderboardUserResponse;
import com.japanese.learning.gamification.entity.UserGamificationStats;
import com.japanese.learning.gamification.repository.UserGamificationStatsRepository;
import com.japanese.learning.user.entity.User;
import com.japanese.learning.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GamificationServiceImpl implements GamificationService {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final UserGamificationStatsRepository statsRepository;

    private static final Map<Integer, String> LEVEL_TITLES = new LinkedHashMap<>();
    static {
        LEVEL_TITLES.put(25, "Sensei · 先生");
        LEVEL_TITLES.put(15, "Cao thủ · 達人");
        LEVEL_TITLES.put(10, "Chăm chỉ · 努力家");
        LEVEL_TITLES.put(6, "Học viên · 学生");
        LEVEL_TITLES.put(3, "Học trò · 見習い");
        LEVEL_TITLES.put(1, "Người mới · 初心者");
    }

    private int calculateLevel(int xp) {
        return Math.max(1, (int) Math.floor((1 + Math.sqrt(1 + (4.0 * xp) / 50)) / 2));
    }

    private String getLevelTitle(int level) {
        for (Map.Entry<Integer, String> entry : LEVEL_TITLES.entrySet()) {
            if (level >= entry.getKey()) {
                return entry.getValue();
            }
        }
        return "Người mới · 初心者";
    }

    @Override
    @Transactional
    public GamificationStatsResponse getStats(Jwt jwt) {
        User user = authService.getAuthenticatedUser(jwt);
        UserGamificationStats stats = statsRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    UserGamificationStats newStats = new UserGamificationStats();
                    newStats.setUserId(user.getId());
                    return statsRepository.save(newStats);
                });

        int level = calculateLevel(stats.getTotalXp());
        List<String> badges = parseBadges(stats.getUnlockedBadges());

        return new GamificationStatsResponse(
                user.getId(),
                stats.getTotalXp(),
                stats.getStreak(),
                stats.getBestStreak(),
                stats.getDailyGoal(),
                level,
                getLevelTitle(level),
                stats.getLastActiveDate() != null ? stats.getLastActiveDate().toString() : null,
                badges
        );
    }

    @Override
    @Transactional
    public GamificationStatsResponse syncStats(Jwt jwt, GamificationSyncRequest request) {
        User user = authService.getAuthenticatedUser(jwt);
        UserGamificationStats stats = statsRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    UserGamificationStats s = new UserGamificationStats();
                    s.setUserId(user.getId());
                    return s;
                });

        // Merge max XP and best streak
        stats.setTotalXp(Math.max(stats.getTotalXp(), request.totalXp()));
        stats.setStreak(request.streak());
        stats.setBestStreak(Math.max(stats.getBestStreak(), request.bestStreak()));
        if (request.dailyGoal() > 0) {
            stats.setDailyGoal(request.dailyGoal());
        }
        if (request.lastActiveDate() != null && !request.lastActiveDate().isBlank()) {
            try {
                stats.setLastActiveDate(LocalDate.parse(request.lastActiveDate()));
            } catch (Exception ignored) {}
        }

        if (request.claimedBadges() != null && !request.claimedBadges().isEmpty()) {
            Set<String> current = new HashSet<>(parseBadges(stats.getUnlockedBadges()));
            current.addAll(request.claimedBadges());
            stats.setUnlockedBadges(String.join(",", current));
        }

        stats = statsRepository.save(stats);
        int level = calculateLevel(stats.getTotalXp());
        List<String> badges = parseBadges(stats.getUnlockedBadges());

        return new GamificationStatsResponse(
                user.getId(),
                stats.getTotalXp(),
                stats.getStreak(),
                stats.getBestStreak(),
                stats.getDailyGoal(),
                level,
                getLevelTitle(level),
                stats.getLastActiveDate() != null ? stats.getLastActiveDate().toString() : null,
                badges
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<LeaderboardUserResponse> getLeaderboard(Jwt jwt, String period) {
        Long currentUserId = null;
        if (jwt != null) {
            try {
                User u = authService.getAuthenticatedUser(jwt);
                currentUserId = u.getId();
            } catch (Exception ignored) {}
        }

        List<UserGamificationStats> topStats = statsRepository.findTop50ByOrderByTotalXpDesc();
        List<LeaderboardUserResponse> result = new ArrayList<>();
        int rank = 1;

        for (UserGamificationStats s : topStats) {
            Optional<User> uOpt = userRepository.findById(s.getUserId());
            if (uOpt.isEmpty()) continue;
            User u = uOpt.get();

            int level = calculateLevel(s.getTotalXp());
            boolean isCur = currentUserId != null && currentUserId.equals(u.getId());

            result.add(new LeaderboardUserResponse(
                    rank++,
                    u.getId(),
                    u.getFullName(),
                    u.getAvatarUrl(),
                    s.getTotalXp(),
                    level,
                    getLevelTitle(level),
                    s.getStreak(),
                    isCur
            ));
        }

        // If list is small or empty, add top benchmark students so users have exciting competition
        if (result.size() < 5) {
            seedBenchmarkLearners(result, currentUserId);
        }

        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<BadgeResponse> getBadges(Jwt jwt) {
        int totalXp = 0;
        int streak = 0;
        Set<String> unlocked = new HashSet<>();

        if (jwt != null) {
            try {
                User user = authService.getAuthenticatedUser(jwt);
                Optional<UserGamificationStats> sOpt = statsRepository.findByUserId(user.getId());
                if (sOpt.isPresent()) {
                    UserGamificationStats s = sOpt.get();
                    totalXp = s.getTotalXp();
                    streak = Math.max(s.getStreak(), s.getBestStreak());
                    unlocked.addAll(parseBadges(s.getUnlockedBadges()));
                }
            } catch (Exception ignored) {}
        }

        return generateSystemBadges(totalXp, streak, unlocked);
    }

    private List<String> parseBadges(String raw) {
        if (raw == null || raw.isBlank()) return Collections.emptyList();
        return Arrays.asList(raw.split(","));
    }

    private List<BadgeResponse> generateSystemBadges(int totalXp, int streak, Set<String> unlocked) {
        List<BadgeResponse> badges = new ArrayList<>();

        badges.add(new BadgeResponse(
                "badge-first-step",
                "Tân Thủ Nhập Môn",
                "初めの一歩",
                "Đạt được 50 điểm XP tích lũy đầu tiên trên hệ thống.",
                "🌸",
                "BRONZE",
                totalXp >= 50 || unlocked.contains("badge-first-step"),
                totalXp >= 50 ? "Đã mở" : null,
                Math.min(100, (int)((totalXp / 50.0) * 100)),
                50,
                totalXp
        ));

        badges.add(new BadgeResponse(
                "badge-streak-3",
                "Ngọn Lửa Tam Nhật",
                "三日坊主克服",
                "Duy trì chuỗi học tập liên tục trong 3 ngày.",
                "🔥",
                "BRONZE",
                streak >= 3 || unlocked.contains("badge-streak-3"),
                streak >= 3 ? "Đã mở" : null,
                Math.min(100, (int)((streak / 3.0) * 100)),
                3,
                streak
        ));

        badges.add(new BadgeResponse(
                "badge-streak-7",
                "Chiến Binh Thất Nhật",
                "七日連続",
                "Học tập chuyên cần trong suốt 7 ngày liên tiếp không ngắt quãng.",
                "⛩️",
                "SILVER",
                streak >= 7 || unlocked.contains("badge-streak-7"),
                streak >= 7 ? "Đã mở" : null,
                Math.min(100, (int)((streak / 7.0) * 100)),
                7,
                streak
        ));

        badges.add(new BadgeResponse(
                "badge-xp-500",
                "Học Viên Chăm Chỉ",
                "努力の結晶",
                "Vượt mốc 500 điểm XP trên hành trình tiếng Nhật.",
                "⚡",
                "SILVER",
                totalXp >= 500 || unlocked.contains("badge-xp-500"),
                totalXp >= 500 ? "Đã mở" : null,
                Math.min(100, (int)((totalXp / 500.0) * 100)),
                500,
                totalXp
        ));

        badges.add(new BadgeResponse(
                "badge-streak-30",
                "Kỷ Luật Thép (30 Ngày)",
                "鉄の規律",
                "Duy trì chuỗi học tập kiên định trong 30 ngày liên tiếp.",
                "🛡️",
                "GOLD",
                streak >= 30 || unlocked.contains("badge-streak-30"),
                streak >= 30 ? "Đã mở" : null,
                Math.min(100, (int)((streak / 30.0) * 100)),
                30,
                streak
        ));

        badges.add(new BadgeResponse(
                "badge-xp-1000",
                "Đại Tông Sư (Master)",
                "達人の境地",
                "Chạm mốc vinh quang 1.000 XP và trở thành tấm gương sáng.",
                "👑",
                "DIAMOND",
                totalXp >= 1000 || unlocked.contains("badge-xp-1000"),
                totalXp >= 1000 ? "Đã mở" : null,
                Math.min(100, (int)((totalXp / 1000.0) * 100)),
                1000,
                totalXp
        ));

        return badges;
    }

    private void seedBenchmarkLearners(List<LeaderboardUserResponse> list, Long currentUserId) {
        String[][] benchmarks = {
                {"Kenji Tanaka", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", "1420", "12", "Chăm chỉ · 努力家", "14"},
                {"Nguyễn Minh Anh", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", "1180", "10", "Chăm chỉ · 努力家", "9"},
                {"Sakura Takahashi", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", "950", "8", "Học viên · 学生", "7"},
                {"Trần Hoàng Nam", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", "760", "7", "Học viên · 学生", "5"},
                {"Lê Bảo Trâm", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", "520", "5", "Học trò · 見習い", "4"}
        };

        int rank = list.size() + 1;
        for (String[] b : benchmarks) {
            list.add(new LeaderboardUserResponse(
                    rank++,
                    (long) rank + 1000,
                    b[0],
                    b[1],
                    Integer.parseInt(b[2]),
                    Integer.parseInt(b[3]),
                    b[4],
                    Integer.parseInt(b[5]),
                    false
            ));
        }
    }
}
