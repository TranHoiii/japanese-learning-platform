package com.japanese.learning.kanji.repository;

import com.japanese.learning.kanji.entity.KanjiCompound;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KanjiCompoundRepository extends JpaRepository<KanjiCompound, Long> {

    List<KanjiCompound> findByKanjiId(Long kanjiId);
}
