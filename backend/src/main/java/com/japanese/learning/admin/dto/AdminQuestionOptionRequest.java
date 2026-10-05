package com.japanese.learning.admin.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AdminQuestionOptionRequest(
        @NotBlank(message = "Nội dung đáp án không được để trống")
        String optionText,

        @NotNull(message = "Trạng thái đúng/sai không được để trống")
        Boolean correct,

        @NotNull(message = "Thứ tự sắp xếp không được để trống")
        @Min(value = 0, message = "Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")
        Integer sortOrder
) {
}
