package com.japanese.learning.admin.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AdminListeningOptionRequest(
        @NotBlank(message = "Nội dung lựa chọn không được để trống")
        String content,

        @NotNull(message = "Trạng thái đúng/sai không được để trống")
        Boolean correct,

        @NotNull(message = "Thứ tự sắp xếp không được để trống")
        @Min(value = 0, message = "Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")
        Integer sortOrder
) {
}
