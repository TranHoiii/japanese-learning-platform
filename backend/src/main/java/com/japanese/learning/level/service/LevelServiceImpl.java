package com.japanese.learning.level.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.level.dto.LevelMapper;
import com.japanese.learning.level.dto.LevelResponse;
import com.japanese.learning.level.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LevelServiceImpl implements LevelService {

    private final LevelRepository levelRepository;
    private final LevelMapper levelMapper;

    @Override
    public List<LevelResponse> getAllActiveLevels() {
        return levelRepository.findByActiveTrueOrderBySortOrderAsc()
                .stream()
                .map(levelMapper::toResponse)
                .toList();
    }

    @Override
    public LevelResponse getById(Long id) {
        return levelRepository.findById(id)
                .map(levelMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy level với id: " + id));
    }
}