package com.japanese.learning.admin.controller;

import com.japanese.learning.admin.dto.AdminLevelRequest;
import com.japanese.learning.admin.dto.AdminLevelResponse;
import com.japanese.learning.admin.service.AdminLevelService;
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
@RequestMapping("/api/v1/admin/levels")
@PreAuthorize("hasRole('ADMIN')")
public class AdminLevelController {

    private final AdminLevelService adminLevelService;

    @GetMapping
    public ApiResponse<List<AdminLevelResponse>> getAllLevels() {
        return ApiResponse.success("Lấy danh sách cấp độ thành công", adminLevelService.getAllLevels());
    }

    @GetMapping("/{id}")
    public ApiResponse<AdminLevelResponse> getLevelById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy thông tin cấp độ thành công", adminLevelService.getLevelById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AdminLevelResponse> createLevel(@Valid @RequestBody AdminLevelRequest request) {
        return ApiResponse.success("Tạo cấp độ thành công", adminLevelService.createLevel(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<AdminLevelResponse> updateLevel(
            @PathVariable @Positive Long id,
            @Valid @RequestBody AdminLevelRequest request
    ) {
        return ApiResponse.success("Cập nhật cấp độ thành công", adminLevelService.updateLevel(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteLevel(@PathVariable @Positive Long id) {
        adminLevelService.deleteLevel(id);
        return ApiResponse.success("Xóa cấp độ thành công", null);
    }
}
