package com.japanese.learning.admin.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AdminLevelRequest(
        @NotBlank(message = "Mã cấp độ không được để trống")
        @Size(max = 20, message = "Mã cấp độ không vượt quá 20 ký tự")
        String code,

        @NotBlank(message = "Tên cấp độ không được để trống")
        @Size(max = 100, message = "Tên cấp độ không vượt quá 100 ký tự")
        String name,

        String description,

        @NotNull(message = "Thứ tự sắp xếp không được để trống")
        @Min(value = 0, message = "Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")
        Integer sortOrder,

        Boolean isActive
) {
}
