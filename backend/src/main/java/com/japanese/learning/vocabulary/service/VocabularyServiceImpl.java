package com.japanese.learning.vocabulary.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.vocabulary.dto.VocabularyMapper;
import com.japanese.learning.vocabulary.dto.VocabularyResponse;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VocabularyServiceImpl implements VocabularyService {

    private final VocabularyRepository vocabularyRepository;
    private final LessonRepository lessonRepository;
    private final VocabularyMapper vocabularyMapper;

    @Override
    public List<VocabularyResponse> getAll() {
        return vocabularyRepository.findAllByOrderByIdAsc()
                .stream()
                .map(vocabularyMapper::toResponse)
                .toList();
    }

    @Override
    public VocabularyResponse getById(Long id) {
        return vocabularyRepository.findById(id)
                .map(vocabularyMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy từ vựng với id: " + id));
    }

    @Override
    public List<VocabularyResponse> getByLessonId(Long lessonId) {
        if (!lessonRepository.existsById(lessonId)) {
            throw new ResourceNotFoundException("Không tìm thấy bài học với id: " + lessonId);
        }

        return vocabularyRepository.findByLessonIdOrderByIdAsc(lessonId)
                .stream()
                .map(vocabularyMapper::toResponse)
                .toList();
    }

    @Override
    public List<VocabularyResponse> search(String query) {
        if (query == null || query.trim().isEmpty()) {
            return Collections.emptyList();
        }

        return vocabularyRepository.searchVocabularies(query.trim())
                .stream()
                .map(vocabularyMapper::toResponse)
                .toList();
    }
}