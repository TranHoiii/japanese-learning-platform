package com.japanese.learning.kanji.controller;

import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.kanji.dto.KanjiCompoundResponse;
import com.japanese.learning.kanji.dto.KanjiResponse;
import com.japanese.learning.kanji.service.KanjiService;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
@RequestMapping("/api/v1/kanjis")
public class KanjiController {

    private final KanjiService kanjiService;

    @GetMapping
    public ApiResponse<Page<KanjiResponse>> getAllKanjis(
            @RequestParam(required = false) String q,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        Page<KanjiResponse> result;
        if (q != null && !q.trim().isEmpty()) {
            result = kanjiService.searchKanjis(q, pageable);
        } else {
            result = kanjiService.getAllKanjis(pageable);
        }
        return ApiResponse.success("Lấy danh sách Kanji thành công", result);
    }

    @GetMapping("/search")
    public ApiResponse<Page<KanjiResponse>> searchKanjis(
            @RequestParam String q,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        Page<KanjiResponse> result = kanjiService.searchKanjis(q, pageable);
        return ApiResponse.success("Tìm kiếm Kanji thành công", result);
    }

    @GetMapping("/{id}")
    public ApiResponse<KanjiResponse> getKanjiById(@PathVariable @Positive Long id) {
        KanjiResponse kanji = kanjiService.getKanjiById(id);
        return ApiResponse.success("Lấy thông tin Kanji thành công", kanji);
    }

    @GetMapping("/{kanjiId}/compounds")
    public ApiResponse<List<KanjiCompoundResponse>> getCompoundsByKanjiId(@PathVariable @Positive Long kanjiId) {
        List<KanjiCompoundResponse> compounds = kanjiService.getCompoundsByKanjiId(kanjiId);
        return ApiResponse.success("Lấy danh sách từ ghép thành công", compounds);
    }
}
