package com.japanese.learning.kanji.repository;

import com.japanese.learning.kanji.entity.Kanji;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KanjiRepository extends JpaRepository<Kanji, Long> {

    Optional<Kanji> findByKanji(String kanji);

    @EntityGraph(attributePaths = {"compounds"})
    @Query("SELECT k FROM Kanji k WHERE k.id = :id")
    Optional<Kanji> findByIdWithDetails(@Param("id") Long id);

    @Query("SELECT k FROM Kanji k WHERE " +
           "LOWER(k.kanji) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(k.hanViet) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(k.onyomi) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(k.kunyomi) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(k.meaning) LIKE LOWER(CONCAT('%', :q, '%'))")
    Page<Kanji> searchKanjis(@Param("q") String q, Pageable pageable);

    @Query("SELECT DISTINCT k FROM Kanji k " +
           "LEFT JOIN FETCH k.lessonKanjis lk " +
           "LEFT JOIN FETCH lk.lesson l " +
           "LEFT JOIN FETCH l.level lvl " +
           "WHERE (:level IS NULL OR (lvl.code IS NOT NULL AND UPPER(lvl.code) = UPPER(:level))) " +
           "AND (" +
           "k.kanji LIKE CONCAT('%', :query, '%') OR " +
           "(k.hanViet IS NOT NULL AND (k.hanViet LIKE CONCAT('%', :query, '%') OR LOWER(k.hanViet) LIKE LOWER(CONCAT('%', :query, '%')))) OR " +
           "(k.onyomi IS NOT NULL AND k.onyomi LIKE CONCAT('%', :query, '%')) OR " +
           "(k.kunyomi IS NOT NULL AND k.kunyomi LIKE CONCAT('%', :query, '%')) OR " +
           "(k.meaning IS NOT NULL AND (k.meaning LIKE CONCAT('%', :query, '%') OR LOWER(k.meaning) LIKE LOWER(CONCAT('%', :query, '%')))) OR " +
           "(k.mnemonic IS NOT NULL AND (k.mnemonic LIKE CONCAT('%', :query, '%') OR LOWER(k.mnemonic) LIKE LOWER(CONCAT('%', :query, '%'))))" +
           ") ORDER BY k.id ASC")
    List<Kanji> searchByKeyword(@Param("query") String query, @Param("level") String level);
}

