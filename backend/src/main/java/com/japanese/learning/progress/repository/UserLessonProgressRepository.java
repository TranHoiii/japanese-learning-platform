package com.japanese.learning.progress.repository;

import com.japanese.learning.progress.entity.UserLessonProgress;
import com.japanese.learning.progress.enums.LearningStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLessonProgressRepository extends JpaRepository<UserLessonProgress, Long> {

    Optional<UserLessonProgress> findByUserIdAndLessonId(Long userId, Long lessonId);

    @Query("SELECT p FROM UserLessonProgress p JOIN FETCH p.lesson WHERE p.user.id = :userId ORDER BY p.lesson.sortOrder ASC, p.lesson.lessonNumber ASC")
    List<UserLessonProgress> findByUserIdWithLesson(@Param("userId") Long userId);

    long countByUserIdAndStatus(Long userId, LearningStatus status);

    @Query("SELECT COALESCE(SUM(p.progressPercent), 0) FROM UserLessonProgress p WHERE p.user.id = :userId")
    Long sumProgressPercentByUserId(@Param("userId") Long userId);
}
