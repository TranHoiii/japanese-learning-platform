package com.japanese.learning.admin.controller;

import com.japanese.learning.admin.dto.AdminReadingQuestionRequest;
import com.japanese.learning.admin.dto.AdminReadingQuestionResponse;
import com.japanese.learning.admin.dto.AdminReadingRequest;
import com.japanese.learning.admin.dto.AdminReadingResponse;
import com.japanese.learning.admin.service.AdminReadingService;
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
@RequestMapping("/api/v1/admin/readings")
@PreAuthorize("hasRole('ADMIN')")
public class AdminReadingController {

    private final AdminReadingService adminReadingService;

    @GetMapping
    public ApiResponse<List<AdminReadingResponse>> getReadings(
            @RequestParam(required = false) @Positive Long lessonId
    ) {
        return ApiResponse.success("Lấy danh sách bài đọc thành công", adminReadingService.getReadings(lessonId));
    }

    @GetMapping("/{id}")
    public ApiResponse<AdminReadingResponse> getReadingById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy thông tin bài đọc thành công", adminReadingService.getReadingById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminReadingResponse> createReading(@Valid @RequestBody AdminReadingRequest request) {
        return ApiResponse.success("Tạo bài đọc thành công", adminReadingService.createReading(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<AdminReadingResponse> updateReading(
            @PathVariable @Positive Long id,
            @Valid @RequestBody AdminReadingRequest request
    ) {
        return ApiResponse.success("Cập nhật bài đọc thành công", adminReadingService.updateReading(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteReading(@PathVariable @Positive Long id) {
        adminReadingService.deleteReading(id);
        return ApiResponse.success("Xóa bài đọc thành công", null);
    }

    // Nested Questions
    @GetMapping("/{id}/questions")
    public ApiResponse<List<AdminReadingQuestionResponse>> getQuestions(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy danh sách câu hỏi thành công", adminReadingService.getQuestions(id));
    }

    @PostMapping("/{id}/questions")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminReadingQuestionResponse> createQuestion(
            @PathVariable @Positive Long id,
            @Valid @RequestBody AdminReadingQuestionRequest request
    ) {
        return ApiResponse.success("Tạo câu hỏi thành công", adminReadingService.createQuestion(id, request));
    }

    @PutMapping("/{id}/questions/{questionId}")
    public ApiResponse<AdminReadingQuestionResponse> updateQuestion(
            @PathVariable @Positive Long id,
            @PathVariable @Positive Long questionId,
            @Valid @RequestBody AdminReadingQuestionRequest request
    ) {
        return ApiResponse.success("Cập nhật câu hỏi thành công", adminReadingService.updateQuestion(id, questionId, request));
    }

    @DeleteMapping("/{id}/questions/{questionId}")
    public ApiResponse<Void> deleteQuestion(
            @PathVariable @Positive Long id,
            @PathVariable @Positive Long questionId
    ) {
        adminReadingService.deleteQuestion(id, questionId);
        return ApiResponse.success("Xóa câu hỏi thành công", null);
    }
}
