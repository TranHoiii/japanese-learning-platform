package com.japanese.learning.kanji.repository;

import com.japanese.learning.kanji.entity.LessonKanji;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonKanjiRepository extends JpaRepository<LessonKanji, Long> {

    @EntityGraph(attributePaths = {"kanji", "kanji.compounds"})
    List<LessonKanji> findByLessonIdOrderBySortOrderAsc(Long lessonId);

    boolean existsByLessonId(Long lessonId);

    boolean existsByKanjiId(Long kanjiId);

    boolean existsByLessonIdAndKanjiId(Long lessonId, Long kanjiId);

    java.util.Optional<LessonKanji> findByLessonIdAndKanjiId(Long lessonId, Long kanjiId);

    void deleteByLessonIdAndKanjiId(Long lessonId, Long kanjiId);
}
