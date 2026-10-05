package com.japanese.learning.admin.controller;

import com.japanese.learning.admin.dto.AdminLessonRequest;
import com.japanese.learning.admin.dto.AdminLessonResponse;
import com.japanese.learning.admin.service.AdminLessonService;
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
@RequestMapping("/api/v1/admin/lessons")
@PreAuthorize("hasRole('ADMIN')")
public class AdminLessonController {

    private final AdminLessonService adminLessonService;
    private final com.japanese.learning.admin.service.AdminKanjiService adminKanjiService;

    @GetMapping
    public ApiResponse<List<AdminLessonResponse>> getLessons(
            @RequestParam(required = false) @Positive Long levelId
    ) {
        return ApiResponse.success("Lấy danh sách bài học thành công", adminLessonService.getLessons(levelId));
    }

    @GetMapping("/{id}")
    public ApiResponse<AdminLessonResponse> getLessonById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy thông tin bài học thành công", adminLessonService.getLessonById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminLessonResponse> createLesson(@Valid @RequestBody AdminLessonRequest request) {
        return ApiResponse.success("Tạo bài học thành công", adminLessonService.createLesson(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<AdminLessonResponse> updateLesson(
            @PathVariable @Positive Long id,
            @Valid @RequestBody AdminLessonRequest request
    ) {
        return ApiResponse.success("Cập nhật bài học thành công", adminLessonService.updateLesson(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteLesson(@PathVariable @Positive Long id) {
        adminLessonService.deleteLesson(id);
        return ApiResponse.success("Xóa bài học thành công", null);
    }

    @PostMapping("/{lessonId}/kanjis/{kanjiId}")
    public ApiResponse<Void> assignKanji(
            @PathVariable @Positive Long lessonId,
            @PathVariable @Positive Long kanjiId,
            @RequestBody(required = false) @Valid com.japanese.learning.admin.dto.AdminLessonKanjiAssignRequest request
    ) {
        adminKanjiService.assignKanjiToLesson(lessonId, kanjiId, request);
        return ApiResponse.success("Gán chữ Hán vào bài học thành công", null);
    }

    @DeleteMapping("/{lessonId}/kanjis/{kanjiId}")
    public ApiResponse<Void> unassignKanji(
            @PathVariable @Positive Long lessonId,
            @PathVariable @Positive Long kanjiId
    ) {
        adminKanjiService.unassignKanjiFromLesson(lessonId, kanjiId);
        return ApiResponse.success("Hủy gán chữ Hán khỏi bài học thành công", null);
    }
}
