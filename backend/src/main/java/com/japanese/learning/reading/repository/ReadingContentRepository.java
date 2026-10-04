package com.japanese.learning.reading.repository;

import com.japanese.learning.reading.entity.ReadingContent;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReadingContentRepository extends JpaRepository<ReadingContent, Long> {

    @EntityGraph(attributePaths = {"questions"})
    List<ReadingContent> findByLessonIdOrderBySortOrderAsc(Long lessonId);

    boolean existsByLessonIdAndTitle(Long lessonId, String title);
}
