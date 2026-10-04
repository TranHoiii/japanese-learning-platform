package com.japanese.learning.progress.repository;

import com.japanese.learning.progress.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {

    List<UserAnswer> findByUserId(Long userId);

    List<UserAnswer> findByUserIdAndExerciseId(Long userId, Long exerciseId);
}
