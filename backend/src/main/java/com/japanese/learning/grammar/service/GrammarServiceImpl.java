package com.japanese.learning.grammar.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.grammar.dto.GrammarExampleMapper;
import com.japanese.learning.grammar.dto.GrammarExampleResponse;
import com.japanese.learning.grammar.dto.GrammarMapper;
import com.japanese.learning.grammar.dto.GrammarResponse;
import com.japanese.learning.grammar.repository.GrammarExampleRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.lesson.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GrammarServiceImpl implements GrammarService {

    private final GrammarRepository grammarRepository;
    private final GrammarExampleRepository grammarExampleRepository;
    private final LessonRepository lessonRepository;
    private final GrammarMapper grammarMapper;
    private final GrammarExampleMapper grammarExampleMapper;

    @Override
    public GrammarResponse getById(Long id) {
        return grammarRepository.findById(id)
                .map(grammarMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy mẫu ngữ pháp với id: " + id));
    }

    @Override
    public List<GrammarResponse> getByLessonId(Long lessonId) {
        if (!lessonRepository.existsById(lessonId)) {
            throw new ResourceNotFoundException("Không tìm thấy bài học với id: " + lessonId);
        }

        return grammarRepository.findByLessonIdOrderBySortOrderAsc(lessonId)
                .stream()
                .map(grammarMapper::toResponse)
                .toList();
    }

    @Override
    public List<GrammarExampleResponse> getExamplesByGrammarId(Long grammarId) {
        if (!grammarRepository.existsById(grammarId)) {
            throw new ResourceNotFoundException("Không tìm thấy mẫu ngữ pháp với id: " + grammarId);
        }

        return grammarExampleRepository.findByGrammarIdOrderBySortOrderAsc(grammarId)
                .stream()
                .map(grammarExampleMapper::toResponse)
                .toList();
    }
}
