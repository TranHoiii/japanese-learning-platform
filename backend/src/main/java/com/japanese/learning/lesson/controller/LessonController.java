package com.japanese.learning.lesson.controller;

import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.lesson.dto.LessonResponse;
import com.japanese.learning.lesson.service.LessonService;
import com.japanese.learning.vocabulary.dto.VocabularyResponse;
import com.japanese.learning.vocabulary.service.VocabularyService;
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
@RequestMapping("/api/v1/lessons")
public class LessonController {

    private final LessonService lessonService;
    private final VocabularyService vocabularyService;

    @GetMapping("/{lessonId}")
    public ApiResponse<LessonResponse> getById(@PathVariable @Positive Long lessonId) {
        return ApiResponse.success("Lấy bài học thành công", lessonService.getById(lessonId));
    }

    @GetMapping("/{lessonId}/vocabularies")
    public ApiResponse<List<VocabularyResponse>> getVocabulariesByLessonId(@PathVariable @Positive Long lessonId) {
        return ApiResponse.success("Lấy danh sách từ vựng thành công", vocabularyService.getByLessonId(lessonId));
    }
}