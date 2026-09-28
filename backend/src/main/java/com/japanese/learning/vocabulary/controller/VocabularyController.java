package com.japanese.learning.vocabulary.controller;

import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.vocabulary.dto.VocabularyResponse;
import com.japanese.learning.vocabulary.service.VocabularyService;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/vocabularies")
public class VocabularyController {

    private final VocabularyService vocabularyService;

    @GetMapping
    public ApiResponse<List<VocabularyResponse>> getAllOrSearch(
            @RequestParam(name = "q", required = false) String q) {
        if (q != null && !q.trim().isEmpty()) {
            return ApiResponse.success("Tìm kiếm từ vựng thành công", vocabularyService.search(q));
        }
        return ApiResponse.success("Lấy tất cả từ vựng thành công", vocabularyService.getAll());
    }

    @GetMapping("/search")
    public ApiResponse<List<VocabularyResponse>> search(
            @RequestParam(name = "q", required = false) String q) {
        return ApiResponse.success("Tìm kiếm từ vựng thành công", vocabularyService.search(q));
    }

    @GetMapping("/{id}")
    public ApiResponse<VocabularyResponse> getById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy từ vựng thành công", vocabularyService.getById(id));
    }
}