package com.japanese.learning.vocabulary.service;

import com.japanese.learning.vocabulary.dto.VocabularyResponse;

import java.util.List;

public interface VocabularyService {

    List<VocabularyResponse> getAll();

    VocabularyResponse getById(Long id);

    List<VocabularyResponse> getByLessonId(Long lessonId);

    List<VocabularyResponse> search(String query);
}