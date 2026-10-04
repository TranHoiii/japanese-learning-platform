package com.japanese.learning.grammar.repository;

import com.japanese.learning.grammar.entity.Grammar;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GrammarRepository extends JpaRepository<Grammar, Long> {

    List<Grammar> findByLessonIdOrderBySortOrderAsc(Long lessonId);

    Optional<Grammar> findByLessonIdAndPattern(Long lessonId, String pattern);

    @Query("SELECT DISTINCT g FROM Grammar g " +
           "JOIN FETCH g.lesson l " +
           "JOIN FETCH l.level lvl " +
           "LEFT JOIN g.examples ge " +
           "WHERE (:level IS NULL OR UPPER(lvl.code) = UPPER(:level)) " +
           "AND (" +
           "g.pattern LIKE CONCAT('%', :query, '%') OR " +
           "(g.meaning IS NOT NULL AND (g.meaning LIKE CONCAT('%', :query, '%') OR LOWER(g.meaning) LIKE LOWER(CONCAT('%', :query, '%')))) OR " +
           "(g.usage IS NOT NULL AND (g.usage LIKE CONCAT('%', :query, '%') OR LOWER(g.usage) LIKE LOWER(CONCAT('%', :query, '%')))) OR " +
           "(g.explanation IS NOT NULL AND (g.explanation LIKE CONCAT('%', :query, '%') OR LOWER(g.explanation) LIKE LOWER(CONCAT('%', :query, '%')))) OR " +
           "(g.notes IS NOT NULL AND (g.notes LIKE CONCAT('%', :query, '%') OR LOWER(g.notes) LIKE LOWER(CONCAT('%', :query, '%')))) OR " +
           "(ge.japanese IS NOT NULL AND ge.japanese LIKE CONCAT('%', :query, '%')) OR " +
           "(ge.furigana IS NOT NULL AND ge.furigana LIKE CONCAT('%', :query, '%')) OR " +
           "(ge.translation IS NOT NULL AND (ge.translation LIKE CONCAT('%', :query, '%') OR LOWER(ge.translation) LIKE LOWER(CONCAT('%', :query, '%')))) OR " +
           "(ge.explanation IS NOT NULL AND (ge.explanation LIKE CONCAT('%', :query, '%') OR LOWER(ge.explanation) LIKE LOWER(CONCAT('%', :query, '%'))))" +
           ") ORDER BY g.id ASC")
    List<Grammar> searchByKeyword(@Param("query") String query, @Param("level") String level);
}

