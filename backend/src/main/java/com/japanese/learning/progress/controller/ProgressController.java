package com.japanese.learning.progress.controller;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.progress.dto.ContentProgressResponse;
import com.japanese.learning.progress.dto.LessonProgressResponse;
import com.japanese.learning.progress.dto.ProgressSummaryResponse;
import com.japanese.learning.progress.dto.UpdateContentProgressRequest;
import com.japanese.learning.progress.dto.UpdateLessonProgressRequest;
import com.japanese.learning.progress.service.ProgressService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/v1/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    @GetMapping
    public ApiResponse<ProgressSummaryResponse> getProgressSummary(@AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.success("Lấy tổng quan tiến độ học tập thành công", progressService.getProgressSummary(jwt));
    }

    @GetMapping("/lessons")
    public ApiResponse<List<LessonProgressResponse>> getLessonProgresses(@AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.success("Lấy tiến độ bài học thành công", progressService.getLessonProgresses(jwt));
    }

    @GetMapping("/lessons/{lessonId}")
    public ApiResponse<LessonProgressResponse> getLessonProgress(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable @Positive(message = "ID bài học phải lớn hơn 0") Long lessonId
    ) {
        return ApiResponse.success("Lấy tiến độ bài học thành công", progressService.getLessonProgress(jwt, lessonId));
    }

    @PutMapping("/lessons/{lessonId}")
    public ApiResponse<LessonProgressResponse> updateLessonProgress(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable @Positive(message = "ID bài học phải lớn hơn 0") Long lessonId,
            @Valid @RequestBody UpdateLessonProgressRequest request
    ) {
        return ApiResponse.success("Cập nhật tiến độ bài học thành công", progressService.updateLessonProgress(jwt, lessonId, request));
    }

    @GetMapping("/content")
    public ApiResponse<List<ContentProgressResponse>> getContentProgresses(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam(required = false) ContentType contentType
    ) {
        return ApiResponse.success("Lấy tiến độ nội dung thành công", progressService.getContentProgresses(jwt, contentType));
    }

    @PutMapping("/content")
    public ApiResponse<ContentProgressResponse> updateContentProgress(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UpdateContentProgressRequest request
    ) {
        return ApiResponse.success("Cập nhật tiến độ nội dung thành công", progressService.updateContentProgress(jwt, request));
    }
}
