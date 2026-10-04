package com.japanese.learning.exercise.repository;

import com.japanese.learning.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    List<Exercise> findAllByOrderBySortOrderAsc();

    List<Exercise> findByLessonIdOrderBySortOrderAsc(Long lessonId);

    Optional<Exercise> findBySortOrder(Integer sortOrder);

    @EntityGraph(attributePaths = {"questions"})
    Optional<Exercise> findWithQuestionsById(Long id);
}
