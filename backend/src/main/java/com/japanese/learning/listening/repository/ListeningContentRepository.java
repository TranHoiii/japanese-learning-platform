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

    @EntityGraph(attributePaths = {"questions", "questions.options"})
    @Query("SELECT lc FROM ListeningContent lc WHERE lc.id = :id")
    Optional<ListeningContent> findByIdWithDetails(@Param("id") Long id);

    boolean existsByLessonIdAndAudioUrl(Long lessonId, String audioUrl);
}
