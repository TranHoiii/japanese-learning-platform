package com.japanese.learning.admin.controller;

import com.japanese.learning.admin.dto.AdminExerciseRequest;
import com.japanese.learning.admin.dto.AdminExerciseResponse;
import com.japanese.learning.admin.dto.AdminQuestionRequest;
import com.japanese.learning.admin.dto.AdminQuestionResponse;
import com.japanese.learning.admin.service.AdminExerciseService;
import com.japanese.learning.common.response.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/exercises")
@PreAuthorize("hasRole('ADMIN')")
public class AdminExerciseController {

    private final AdminExerciseService adminExerciseService;

    @GetMapping
    public ApiResponse<List<AdminExerciseResponse>> getExercises(
            @RequestParam(required = false) @Positive Long lessonId
    ) {
        return ApiResponse.success("Lấy danh sách bài tập thành công", adminExerciseService.getExercises(lessonId));
    }

    @GetMapping("/{id}")
    public ApiResponse<AdminExerciseResponse> getExerciseById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy thông tin bài tập thành công", adminExerciseService.getExerciseById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminExerciseResponse> createExercise(@Valid @RequestBody AdminExerciseRequest request) {
        return ApiResponse.success("Tạo bài tập thành công", adminExerciseService.createExercise(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<AdminExerciseResponse> updateExercise(
            @PathVariable @Positive Long id,
            @Valid @RequestBody AdminExerciseRequest request
    ) {
        return ApiResponse.success("Cập nhật bài tập thành công", adminExerciseService.updateExercise(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteExercise(@PathVariable @Positive Long id) {
        adminExerciseService.deleteExercise(id);
        return ApiResponse.success("Xóa bài tập thành công", null);
    }

    // Nested Questions
    @GetMapping("/{id}/questions")
    public ApiResponse<List<AdminQuestionResponse>> getQuestions(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy danh sách câu hỏi thành công", adminExerciseService.getQuestions(id));
    }

    @PostMapping("/{id}/questions")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminQuestionResponse> createQuestion(
            @PathVariable @Positive Long id,
            @Valid @RequestBody AdminQuestionRequest request
    ) {
        return ApiResponse.success("Tạo câu hỏi thành công", adminExerciseService.createQuestion(id, request));
    }

    @PutMapping("/{id}/questions/{questionId}")
    public ApiResponse<AdminQuestionResponse> updateQuestion(
            @PathVariable @Positive Long id,
            @PathVariable @Positive Long questionId,
            @Valid @RequestBody AdminQuestionRequest request
    ) {
        return ApiResponse.success("Cập nhật câu hỏi thành công", adminExerciseService.updateQuestion(id, questionId, request));
    }

    @DeleteMapping("/{id}/questions/{questionId}")
    public ApiResponse<Void> deleteQuestion(
            @PathVariable @Positive Long id,
            @PathVariable @Positive Long questionId
    ) {
        adminExerciseService.deleteQuestion(id, questionId);
        return ApiResponse.success("Xóa câu hỏi thành công", null);
    }
}
