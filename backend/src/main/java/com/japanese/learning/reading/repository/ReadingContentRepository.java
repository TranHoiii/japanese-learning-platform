package com.japanese.learning.reading.repository;

import com.japanese.learning.reading.entity.ReadingContent;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReadingContentRepository extends JpaRepository<ReadingContent, Long> {

    @EntityGraph(attributePaths = {"questions"})
    List<ReadingContent> findByLessonIdOrderBySortOrderAsc(Long lessonId);

    List<ReadingContent> findAllByOrderBySortOrderAsc();

    boolean existsByLessonId(Long lessonId);

    boolean existsByLessonIdAndTitle(Long lessonId, String title);

    @Query("SELECT rc FROM ReadingContent rc " +
           "JOIN FETCH rc.lesson l " +
           "JOIN FETCH l.level lvl " +
           "WHERE (:level IS NULL OR UPPER(lvl.code) = UPPER(:level)) " +
           "AND (" +
           "rc.title LIKE CONCAT('%', :query, '%') OR " +
           "(rc.content LIKE CONCAT('%', :query, '%') OR LOWER(rc.content) LIKE LOWER(CONCAT('%', :query, '%'))) OR " +
           "(rc.translation IS NOT NULL AND (rc.translation LIKE CONCAT('%', :query, '%') OR LOWER(rc.translation) LIKE LOWER(CONCAT('%', :query, '%'))))" +
           ") ORDER BY rc.id ASC")
    List<ReadingContent> searchByKeyword(@Param("query") String query, @Param("level") String level);
}

