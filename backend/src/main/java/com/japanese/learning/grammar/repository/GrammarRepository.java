package com.japanese.learning.grammar.repository;

import com.japanese.learning.grammar.entity.Grammar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GrammarRepository extends JpaRepository<Grammar, Long> {

    List<Grammar> findByLessonIdOrderBySortOrderAsc(Long lessonId);

    Optional<Grammar> findByLessonIdAndPattern(Long lessonId, String pattern);
}
