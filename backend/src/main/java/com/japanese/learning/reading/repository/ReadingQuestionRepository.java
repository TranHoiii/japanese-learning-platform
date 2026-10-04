package com.japanese.learning.reading.repository;

import com.japanese.learning.reading.entity.ReadingQuestion;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReadingQuestionRepository extends JpaRepository<ReadingQuestion, Long> {

    @EntityGraph(attributePaths = {"options"})
    List<ReadingQuestion> findByReadingIdOrderBySortOrderAsc(Long readingId);
}
