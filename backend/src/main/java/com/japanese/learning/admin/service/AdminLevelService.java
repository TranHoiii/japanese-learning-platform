package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminLevelRequest;
import com.japanese.learning.admin.dto.AdminLevelResponse;
import com.japanese.learning.common.exception.DeleteConflictException;
import com.japanese.learning.common.exception.DuplicateResourceException;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminLevelService {

    private final LevelRepository levelRepository;
    private final LessonRepository lessonRepository;

    @Transactional(readOnly = true)
    public List<AdminLevelResponse> getAllLevels() {
        return levelRepository.findAllByOrderBySortOrderAsc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AdminLevelResponse getLevelById(Long id) {
        Level level = findLevelById(id);
        return mapToResponse(level);
    }

    @Transactional
    public AdminLevelResponse createLevel(AdminLevelRequest request) {
        String normalizedCode = request.code().trim().toUpperCase();
        if (levelRepository.existsByCode(normalizedCode)) {
            throw new DuplicateResourceException("Mã cấp độ '" + normalizedCode + "' đã tồn tại");
        }

        Level level = new Level();
        level.setCode(normalizedCode);
        level.setName(request.name().trim());
        level.setDescription(request.description() != null ? request.description().trim() : null);
        level.setSortOrder(request.sortOrder());
        level.setActive(request.isActive() != null ? request.isActive() : true);

        Level saved = levelRepository.save(level);
        return mapToResponse(saved);
    }

    @Transactional
    public AdminLevelResponse updateLevel(Long id, AdminLevelRequest request) {
        Level level = findLevelById(id);
        String normalizedCode = request.code().trim().toUpperCase();

        if (levelRepository.existsByCodeAndIdNot(normalizedCode, id)) {
            throw new DuplicateResourceException("Mã cấp độ '" + normalizedCode + "' đã tồn tại");
        }

        level.setCode(normalizedCode);
        level.setName(request.name().trim());
        level.setDescription(request.description() != null ? request.description().trim() : null);
        level.setSortOrder(request.sortOrder());
        if (request.isActive() != null) {
            level.setActive(request.isActive());
        }

        Level updated = levelRepository.save(level);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteLevel(Long id) {
        Level level = findLevelById(id);

        if (lessonRepository.existsByLevelId(id) || !level.getLessons().isEmpty()) {
            throw new DeleteConflictException("Không thể xóa cấp độ này vì vẫn còn bài học liên kết");
        }

        levelRepository.delete(level);
    }

    private Level findLevelById(Long id) {
        return levelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy cấp độ với ID: " + id));
    }

    private AdminLevelResponse mapToResponse(Level level) {
        return new AdminLevelResponse(
                level.getId(),
                level.getCode(),
                level.getName(),
                level.getDescription(),
                level.getSortOrder(),
                level.getActive()
        );
    }
}
