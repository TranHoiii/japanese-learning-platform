package com.japanese.learning.level.controller;

import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.lesson.dto.LessonResponse;
import com.japanese.learning.lesson.service.LessonService;
import com.japanese.learning.level.dto.LevelResponse;
import com.japanese.learning.level.service.LevelService;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/levels")
public class LevelController {

    private final LevelService levelService;
    private final LessonService lessonService;

    @GetMapping
    public ApiResponse<List<LevelResponse>> getAllActiveLevels() {
        return ApiResponse.success("Lấy danh sách level thành công", levelService.getAllActiveLevels());
    }

    @GetMapping("/{id}")
    public ApiResponse<LevelResponse> getById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy level thành công", levelService.getById(id));
    }

    @GetMapping("/{levelId}/lessons")
    public ApiResponse<List<LessonResponse>> getLessonsByLevelId(@PathVariable @Positive Long levelId) {
        return ApiResponse.success("Lấy danh sách bài học thành công", lessonService.getLessonsByLevelId(levelId));
    }
}