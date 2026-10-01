package com.japanese.learning.listening.controller;

import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.listening.dto.ListeningContentResponse;
import com.japanese.learning.listening.dto.ListeningSubmitRequest;
import com.japanese.learning.listening.dto.ListeningSubmitResponse;
import com.japanese.learning.listening.service.ListeningService;
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
@RequestMapping("/api/v1/listenings")
public class ListeningController {

    private final ListeningService listeningService;

    @GetMapping
    public ApiResponse<List<ListeningContentResponse>> getListenings(
            @RequestParam(name = "lessonId", required = false) @Positive Long lessonId) {
        if (lessonId != null) {
            return ApiResponse.success("Lấy danh sách bài nghe thành công", listeningService.getListeningsByLessonId(lessonId));
        }
        return ApiResponse.success("Lấy danh sách bài nghe thành công", Collections.emptyList());
    }

    @GetMapping("/{id}")
    public ApiResponse<ListeningContentResponse> getById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy thông tin bài nghe thành công", listeningService.getListeningById(id));
    }

    @PostMapping("/{id}/submit")
    public ApiResponse<ListeningSubmitResponse> submitListening(
            @PathVariable @Positive Long id,
            @Valid @RequestBody ListeningSubmitRequest request) {
        return ApiResponse.success("Nộp bài nghe thành công", listeningService.submitListening(id, request));
    }
}
