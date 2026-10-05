package com.japanese.learning.admin.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AdminGrammarExampleRequest(
        @NotBlank(message = "Câu tiếng Nhật không được để trống")
        String japanese,

        String furigana,

        String translation,

        String explanation,

        @NotNull(message = "Thứ tự sắp xếp không được để trống")
        @Min(value = 0, message = "Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")
        Integer sortOrder
) {
}
