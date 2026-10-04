package com.japanese.learning.vocabulary.repository;

import com.japanese.learning.vocabulary.entity.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {

    List<Vocabulary> findByLessonIdOrderByIdAsc(Long lessonId);

    List<Vocabulary> findAllByOrderByIdAsc();

    @Query("SELECT v FROM Vocabulary v WHERE " +
           "LOWER(v.hiragana) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(COALESCE(v.kanji, '')) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(COALESCE(v.hanViet, '')) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(v.meaning) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "ORDER BY v.id ASC")
    List<Vocabulary> searchVocabularies(@Param("query") String query);

    @Query("SELECT v FROM Vocabulary v " +
           "JOIN FETCH v.lesson l " +
           "JOIN FETCH l.level lvl " +
           "WHERE (:level IS NULL OR UPPER(lvl.code) = UPPER(:level)) " +
           "AND (" +
           "v.hiragana LIKE CONCAT('%', :query, '%') OR " +
           "(v.kanji IS NOT NULL AND v.kanji LIKE CONCAT('%', :query, '%')) OR " +
           "(v.hanViet IS NOT NULL AND (v.hanViet LIKE CONCAT('%', :query, '%') OR LOWER(v.hanViet) LIKE LOWER(CONCAT('%', :query, '%')))) OR " +
           "(v.meaning IS NOT NULL AND (v.meaning LIKE CONCAT('%', :query, '%') OR LOWER(v.meaning) LIKE LOWER(CONCAT('%', :query, '%')))) OR " +
           "(v.notes IS NOT NULL AND (v.notes LIKE CONCAT('%', :query, '%') OR LOWER(v.notes) LIKE LOWER(CONCAT('%', :query, '%'))))" +
           ") ORDER BY v.id ASC")
    List<Vocabulary> searchByKeyword(@Param("query") String query, @Param("level") String level);
}