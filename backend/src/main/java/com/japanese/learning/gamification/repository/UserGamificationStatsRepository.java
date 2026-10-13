package com.japanese.learning.gamification.repository;

import com.japanese.learning.gamification.entity.UserGamificationStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserGamificationStatsRepository extends JpaRepository<UserGamificationStats, Long> {
    Optional<UserGamificationStats> findByUserId(Long userId);
    List<UserGamificationStats> findTop50ByOrderByTotalXpDesc();
}
