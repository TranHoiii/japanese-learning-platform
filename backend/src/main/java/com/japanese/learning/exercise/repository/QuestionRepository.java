package com.japanese.learning.exercise.repository;

import com.japanese.learning.exercise.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByExerciseIdOrderBySortOrderAsc(Long exerciseId);
}
