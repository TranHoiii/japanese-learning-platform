package com.japanese.learning.listening.repository;

import com.japanese.learning.listening.entity.ListeningContent;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ListeningContentRepository extends JpaRepository<ListeningContent, Long> {

    @EntityGraph(attributePaths = {"questions"})
    List<ListeningContent> findByLessonIdOrderBySortOrderAsc(Long lessonId);

    List<ListeningContent> findAllByOrderBySortOrderAsc();

    boolean existsByLessonId(Long lessonId);

    @EntityGraph(attributePaths = {"questions", "questions.options"})
    @Query("SELECT lc FROM ListeningContent lc WHERE lc.id = :id")
    Optional<ListeningContent> findByIdWithDetails(@Param("id") Long id);

    boolean existsByLessonIdAndAudioUrl(Long lessonId, String audioUrl);

    @Query("SELECT lc FROM ListeningContent lc " +
           "JOIN FETCH lc.lesson l " +
           "JOIN FETCH l.level lvl " +
           "WHERE (:level IS NULL OR UPPER(lvl.code) = UPPER(:level)) " +
           "AND (" +
           "lc.title LIKE CONCAT('%', :query, '%') OR " +
           "(lc.description IS NOT NULL AND (lc.description LIKE CONCAT('%', :query, '%') OR LOWER(lc.description) LIKE LOWER(CONCAT('%', :query, '%')))) OR " +
           "(lc.transcript IS NOT NULL AND (lc.transcript LIKE CONCAT('%', :query, '%') OR LOWER(lc.transcript) LIKE LOWER(CONCAT('%', :query, '%'))))" +
           ") ORDER BY lc.id ASC")
    List<ListeningContent> searchByKeyword(@Param("query") String query, @Param("level") String level);
}

