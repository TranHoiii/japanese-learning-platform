package com.japanese.learning.admin.controller;

import com.japanese.learning.admin.dto.AdminGrammarExampleRequest;
import com.japanese.learning.admin.dto.AdminGrammarExampleResponse;
import com.japanese.learning.admin.dto.AdminGrammarRequest;
import com.japanese.learning.admin.dto.AdminGrammarResponse;
import com.japanese.learning.admin.service.AdminGrammarService;
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
@RequestMapping("/api/v1/admin/grammars")
@PreAuthorize("hasRole('ADMIN')")
public class AdminGrammarController {

    private final AdminGrammarService adminGrammarService;

    @GetMapping
    public ApiResponse<List<AdminGrammarResponse>> getGrammars(
            @RequestParam(required = false) @Positive Long lessonId,
            @RequestParam(required = false) @Positive Long levelId
    ) {
        return ApiResponse.success("Lấy danh sách ngữ pháp thành công", adminGrammarService.getGrammars(lessonId, levelId));
    }

    @GetMapping("/{id}")
    public ApiResponse<AdminGrammarResponse> getGrammarById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy thông tin ngữ pháp thành công", adminGrammarService.getGrammarById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminGrammarResponse> createGrammar(@Valid @RequestBody AdminGrammarRequest request) {
        return ApiResponse.success("Tạo ngữ pháp thành công", adminGrammarService.createGrammar(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<AdminGrammarResponse> updateGrammar(
            @PathVariable @Positive Long id,
            @Valid @RequestBody AdminGrammarRequest request
    ) {
        return ApiResponse.success("Cập nhật ngữ pháp thành công", adminGrammarService.updateGrammar(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteGrammar(@PathVariable @Positive Long id) {
        adminGrammarService.deleteGrammar(id);
        return ApiResponse.success("Xóa ngữ pháp thành công", null);
    }

    // Grammar Examples endpoints
    @GetMapping("/{grammarId}/examples")
    public ApiResponse<List<AdminGrammarExampleResponse>> getExamples(@PathVariable @Positive Long grammarId) {
        return ApiResponse.success("Lấy danh sách ví dụ thành công", adminGrammarService.getExamples(grammarId));
    }

    @PostMapping("/{grammarId}/examples")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminGrammarExampleResponse> createExample(
            @PathVariable @Positive Long grammarId,
            @Valid @RequestBody AdminGrammarExampleRequest request
    ) {
        return ApiResponse.success("Tạo ví dụ thành công", adminGrammarService.createExample(grammarId, request));
    }

    @PutMapping("/{grammarId}/examples/{exampleId}")
    public ApiResponse<AdminGrammarExampleResponse> updateExample(
            @PathVariable @Positive Long grammarId,
            @PathVariable @Positive Long exampleId,
            @Valid @RequestBody AdminGrammarExampleRequest request
    ) {
        return ApiResponse.success("Cập nhật ví dụ thành công", adminGrammarService.updateExample(grammarId, exampleId, request));
    }

    @DeleteMapping("/{grammarId}/examples/{exampleId}")
    public ApiResponse<Void> deleteExample(
            @PathVariable @Positive Long grammarId,
            @PathVariable @Positive Long exampleId
    ) {
        adminGrammarService.deleteExample(grammarId, exampleId);
        return ApiResponse.success("Xóa ví dụ thành công", null);
    }
}
