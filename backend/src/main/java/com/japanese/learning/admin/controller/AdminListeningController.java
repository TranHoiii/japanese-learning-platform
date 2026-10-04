package com.japanese.learning.admin.controller;

import com.japanese.learning.admin.dto.AdminListeningQuestionRequest;
import com.japanese.learning.admin.dto.AdminListeningQuestionResponse;
import com.japanese.learning.admin.dto.AdminListeningRequest;
import com.japanese.learning.admin.dto.AdminListeningResponse;
import com.japanese.learning.admin.service.AdminListeningService;
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
@RequestMapping("/api/v1/admin/listenings")
@PreAuthorize("hasRole('ADMIN')")
public class AdminListeningController {

    private final AdminListeningService adminListeningService;

    @GetMapping
    public ApiResponse<List<AdminListeningResponse>> getListenings(
            @RequestParam(required = false) @Positive Long lessonId
    ) {
        return ApiResponse.success("Lấy danh sách bài nghe thành công", adminListeningService.getListenings(lessonId));
    }

    @GetMapping("/{id}")
    public ApiResponse<AdminListeningResponse> getListeningById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy thông tin bài nghe thành công", adminListeningService.getListeningById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminListeningResponse> createListening(@Valid @RequestBody AdminListeningRequest request) {
        return ApiResponse.success("Tạo bài nghe thành công", adminListeningService.createListening(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<AdminListeningResponse> updateListening(
            @PathVariable @Positive Long id,
            @Valid @RequestBody AdminListeningRequest request
    ) {
        return ApiResponse.success("Cập nhật bài nghe thành công", adminListeningService.updateListening(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteListening(@PathVariable @Positive Long id) {
        adminListeningService.deleteListening(id);
        return ApiResponse.success("Xóa bài nghe thành công", null);
    }

    // Nested Questions
    @GetMapping("/{id}/questions")
    public ApiResponse<List<AdminListeningQuestionResponse>> getQuestions(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy danh sách câu hỏi thành công", adminListeningService.getQuestions(id));
    }

    @PostMapping("/{id}/questions")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminListeningQuestionResponse> createQuestion(
            @PathVariable @Positive Long id,
            @Valid @RequestBody AdminListeningQuestionRequest request
    ) {
        return ApiResponse.success("Tạo câu hỏi thành công", adminListeningService.createQuestion(id, request));
    }

    @PutMapping("/{id}/questions/{questionId}")
    public ApiResponse<AdminListeningQuestionResponse> updateQuestion(
            @PathVariable @Positive Long id,
            @PathVariable @Positive Long questionId,
            @Valid @RequestBody AdminListeningQuestionRequest request
    ) {
        return ApiResponse.success("Cập nhật câu hỏi thành công", adminListeningService.updateQuestion(id, questionId, request));
    }

    @DeleteMapping("/{id}/questions/{questionId}")
    public ApiResponse<Void> deleteQuestion(
            @PathVariable @Positive Long id,
            @PathVariable @Positive Long questionId
    ) {
        adminListeningService.deleteQuestion(id, questionId);
        return ApiResponse.success("Xóa câu hỏi thành công", null);
    }
}
