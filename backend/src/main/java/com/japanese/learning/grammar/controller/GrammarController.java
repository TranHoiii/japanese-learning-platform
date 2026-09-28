package com.japanese.learning.grammar.controller;

import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.grammar.dto.GrammarExampleResponse;
import com.japanese.learning.grammar.dto.GrammarResponse;
import com.japanese.learning.grammar.service.GrammarService;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/grammars")
public class GrammarController {

    private final GrammarService grammarService;

    @GetMapping
    public ApiResponse<List<GrammarResponse>> getGrammars(
            @RequestParam(name = "lessonId", required = false) @Positive Long lessonId) {
        if (lessonId != null) {
            return ApiResponse.success("Lấy danh sách ngữ pháp thành công", grammarService.getByLessonId(lessonId));
        }
        return ApiResponse.success("Lấy danh sách ngữ pháp thành công", Collections.emptyList());
    }

    @GetMapping("/{id}")
    public ApiResponse<GrammarResponse> getById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy mẫu ngữ pháp thành công", grammarService.getById(id));
    }

    @GetMapping("/{id}/examples")
    public ApiResponse<List<GrammarExampleResponse>> getExamplesByGrammarId(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy danh sách ví dụ ngữ pháp thành công", grammarService.getExamplesByGrammarId(id));
    }
}
