package com.japanese.learning.kanji.repository;

import com.japanese.learning.kanji.entity.Kanji;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
}
