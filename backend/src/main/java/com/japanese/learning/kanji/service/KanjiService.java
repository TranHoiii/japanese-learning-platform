package com.japanese.learning.kanji.service;

import com.japanese.learning.kanji.dto.KanjiCompoundResponse;
import com.japanese.learning.kanji.dto.KanjiResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface KanjiService {

    Page<KanjiResponse> getAllKanjis(Pageable pageable);

    Page<KanjiResponse> searchKanjis(String query, Pageable pageable);

    KanjiResponse getKanjiById(Long id);

    List<KanjiResponse> getKanjisByLessonId(Long lessonId);

    List<KanjiCompoundResponse> getCompoundsByKanjiId(Long kanjiId);
}
