package com.japanese.learning.gamification.entity;

import com.japanese.learning.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(
        name = "user_gamification_stats",
        indexes = {
                @Index(name = "idx_gamification_user_id", columnList = "user_id"),
                @Index(name = "idx_gamification_total_xp", columnList = "total_xp")
        }
)
public class UserGamificationStats extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(name = "total_xp", nullable = false)
    private Integer totalXp = 0;

    @Column(nullable = false)
    private Integer streak = 0;

    @Column(name = "best_streak", nullable = false)
    private Integer bestStreak = 0;

    @Column(name = "daily_goal", nullable = false)
    private Integer dailyGoal = 50;

    @Column(name = "last_active_date")
    private LocalDate lastActiveDate;

    @Column(name = "unlocked_badges", columnDefinition = "TEXT")
    private String unlockedBadges = "";
}
