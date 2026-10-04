package com.japanese.learning.admin.controller;

import com.japanese.learning.admin.dto.AdminVocabularyRequest;
import com.japanese.learning.admin.dto.AdminVocabularyResponse;
import com.japanese.learning.admin.service.AdminVocabularyService;
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
@RequestMapping("/api/v1/admin/vocabularies")
@PreAuthorize("hasRole('ADMIN')")
public class AdminVocabularyController {

    private final AdminVocabularyService adminVocabularyService;

    @GetMapping
    public ApiResponse<List<AdminVocabularyResponse>> getVocabularies(
            @RequestParam(required = false) @Positive Long lessonId,
            @RequestParam(required = false) @Positive Long levelId
    ) {
        return ApiResponse.success("Lấy danh sách từ vựng thành công", adminVocabularyService.getVocabularies(lessonId, levelId));
    }

    @GetMapping("/{id}")
    public ApiResponse<AdminVocabularyResponse> getVocabularyById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy thông tin từ vựng thành công", adminVocabularyService.getVocabularyById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminVocabularyResponse> createVocabulary(@Valid @RequestBody AdminVocabularyRequest request) {
        return ApiResponse.success("Tạo từ vựng thành công", adminVocabularyService.createVocabulary(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<AdminVocabularyResponse> updateVocabulary(
            @PathVariable @Positive Long id,
            @Valid @RequestBody AdminVocabularyRequest request
    ) {
        return ApiResponse.success("Cập nhật từ vựng thành công", adminVocabularyService.updateVocabulary(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteVocabulary(@PathVariable @Positive Long id) {
        adminVocabularyService.deleteVocabulary(id);
        return ApiResponse.success("Xóa từ vựng thành công", null);
    }
}
