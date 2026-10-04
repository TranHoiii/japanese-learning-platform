package com.japanese.learning.exercise.repository;

import com.japanese.learning.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("SELECT DISTINCT e FROM Exercise e " +
           "JOIN FETCH e.lesson l " +
           "JOIN FETCH l.level lvl " +
           "LEFT JOIN e.questions q " +
           "WHERE (:level IS NULL OR UPPER(lvl.code) = UPPER(:level)) " +
           "AND (" +
           "e.title LIKE CONCAT('%', :query, '%') OR " +
           "(e.description IS NOT NULL AND (e.description LIKE CONCAT('%', :query, '%') OR LOWER(e.description) LIKE LOWER(CONCAT('%', :query, '%')))) OR " +
           "(q.questionText IS NOT NULL AND (q.questionText LIKE CONCAT('%', :query, '%') OR LOWER(q.questionText) LIKE LOWER(CONCAT('%', :query, '%')))) OR " +
           "(q.explanation IS NOT NULL AND (q.explanation LIKE CONCAT('%', :query, '%') OR LOWER(q.explanation) LIKE LOWER(CONCAT('%', :query, '%'))))" +
           ") ORDER BY e.id ASC")
    List<Exercise> searchByKeyword(@Param("query") String query, @Param("level") String level);
}

