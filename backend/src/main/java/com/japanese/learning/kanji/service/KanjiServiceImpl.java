package com.japanese.learning.kanji.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.kanji.dto.KanjiCompoundMapper;
import com.japanese.learning.kanji.dto.KanjiCompoundResponse;
import com.japanese.learning.kanji.dto.KanjiMapper;
import com.japanese.learning.kanji.dto.KanjiResponse;
import com.japanese.learning.kanji.entity.Kanji;
import com.japanese.learning.kanji.entity.LessonKanji;
import com.japanese.learning.kanji.repository.KanjiCompoundRepository;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.kanji.repository.LessonKanjiRepository;
import com.japanese.learning.lesson.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class KanjiServiceImpl implements KanjiService {

    private final KanjiRepository kanjiRepository;
    private final LessonKanjiRepository lessonKanjiRepository;
    private final KanjiCompoundRepository kanjiCompoundRepository;
    private final LessonRepository lessonRepository;
    private final KanjiMapper kanjiMapper;
    private final KanjiCompoundMapper kanjiCompoundMapper;

    @Override
    public Page<KanjiResponse> getAllKanjis(Pageable pageable) {
        return kanjiRepository.findAll(pageable)
                .map(kanjiMapper::toResponse);
    }

    @Override
    public Page<KanjiResponse> searchKanjis(String query, Pageable pageable) {
        if (query == null || query.trim().isEmpty()) {
            return getAllKanjis(pageable);
        }
        return kanjiRepository.searchKanjis(query.trim(), pageable)
                .map(kanjiMapper::toResponse);
    }

    @Override
    public KanjiResponse getKanjiById(Long id) {
        Kanji kanji = kanjiRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy Kanji với id: " + id));
        return kanjiMapper.toResponse(kanji);
    }

    @Override
    public List<KanjiResponse> getKanjisByLessonId(Long lessonId) {
        if (!lessonRepository.existsById(lessonId)) {
            throw new ResourceNotFoundException("Không tìm thấy bài học với id: " + lessonId);
        }

        List<LessonKanji> lessonKanjis = lessonKanjiRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        return lessonKanjis.stream()
                .map(lk -> kanjiMapper.toResponse(lk.getKanji()))
                .toList();
    }

    @Override
    public List<KanjiCompoundResponse> getCompoundsByKanjiId(Long kanjiId) {
        if (!kanjiRepository.existsById(kanjiId)) {
            throw new ResourceNotFoundException("Không tìm thấy Kanji với id: " + kanjiId);
        }

        return kanjiCompoundRepository.findByKanjiId(kanjiId).stream()
                .map(kanjiCompoundMapper::toResponse)
                .toList();
    }
}
