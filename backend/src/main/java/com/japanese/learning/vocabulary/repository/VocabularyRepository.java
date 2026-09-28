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
}