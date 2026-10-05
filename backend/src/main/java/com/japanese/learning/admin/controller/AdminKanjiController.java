package com.japanese.learning.admin.controller;

import com.japanese.learning.admin.dto.AdminKanjiRequest;
import com.japanese.learning.admin.dto.AdminKanjiResponse;
import com.japanese.learning.admin.service.AdminKanjiService;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/kanjis")
@PreAuthorize("hasRole('ADMIN')")
public class AdminKanjiController {

    private final AdminKanjiService adminKanjiService;

    @GetMapping
    public ApiResponse<List<AdminKanjiResponse>> getAllKanjis() {
        return ApiResponse.success("Lấy danh sách chữ Hán thành công", adminKanjiService.getAllKanjis());
    }

    @GetMapping("/{id}")
    public ApiResponse<AdminKanjiResponse> getKanjiById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy thông tin chữ Hán thành công", adminKanjiService.getKanjiById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminKanjiResponse> createKanji(@Valid @RequestBody AdminKanjiRequest request) {
        return ApiResponse.success("Tạo chữ Hán thành công", adminKanjiService.createKanji(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<AdminKanjiResponse> updateKanji(
            @PathVariable @Positive Long id,
            @Valid @RequestBody AdminKanjiRequest request
    ) {
        return ApiResponse.success("Cập nhật chữ Hán thành công", adminKanjiService.updateKanji(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteKanji(@PathVariable @Positive Long id) {
        adminKanjiService.deleteKanji(id);
        return ApiResponse.success("Xóa chữ Hán thành công", null);
    }
}
