package com.japanese.learning.reading.controller;

import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.reading.dto.ReadingContentResponse;
import com.japanese.learning.reading.dto.ReadingSubmitRequest;
import com.japanese.learning.reading.dto.ReadingSubmitResponse;
import com.japanese.learning.reading.service.ReadingService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/readings")
public class ReadingController {

    private final ReadingService readingService;

    @GetMapping
    public ApiResponse<List<ReadingContentResponse>> getReadings(
            @RequestParam(name = "lessonId", required = false) @Positive Long lessonId) {
        if (lessonId != null) {
            return ApiResponse.success("Lấy danh sách bài đọc thành công", readingService.getReadingsByLessonId(lessonId));
        }
        return ApiResponse.success("Lấy danh sách bài đọc thành công", Collections.emptyList());
    }

    @GetMapping("/{id}")
    public ApiResponse<ReadingContentResponse> getById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy thông tin bài đọc thành công", readingService.getReadingById(id));
    }

    @PostMapping("/{id}/submit")
    public ApiResponse<ReadingSubmitResponse> submitReading(
            @PathVariable @Positive Long id,
            @Valid @RequestBody ReadingSubmitRequest request) {
        return ApiResponse.success("Nộp bài đọc thành công", readingService.submitReading(id, request));
    }
}
