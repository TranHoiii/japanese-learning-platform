package com.japanese.learning.lesson.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.dto.LessonMapper;
import com.japanese.learning.lesson.dto.LessonResponse;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final LevelRepository levelRepository;
    private final LessonMapper lessonMapper;

    @Override
    public List<LessonResponse> getLessonsByLevelId(Long levelId) {
        if (!levelRepository.existsById(levelId)) {
            throw new ResourceNotFoundException("Không tìm thấy level với id: " + levelId);
        }

        return lessonRepository.findByLevelIdAndActiveTrueOrderBySortOrderAsc(levelId)
                .stream()
                .map(lessonMapper::toResponse)
                .toList();
    }

    @Override
    public LessonResponse getById(Long id) {
        return lessonRepository.findById(id)
                .map(lessonMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với id: " + id));
    }
}