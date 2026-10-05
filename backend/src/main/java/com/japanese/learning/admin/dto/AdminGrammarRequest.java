package com.japanese.learning.admin.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.List;

public record AdminGrammarRequest(
        @NotNull(message = "Bài học không được để trống")
        @Positive(message = "ID bài học không hợp lệ")
        Long lessonId,

        @NotBlank(message = "Mẫu ngữ pháp không được để trống")
        @Size(max = 255, message = "Mẫu ngữ pháp không vượt quá 255 ký tự")
        String pattern,

        String meaning,

        String usage,

        String explanation,

        String notes,

        @NotNull(message = "Thứ tự sắp xếp không được để trống")
        @Min(value = 0, message = "Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")
        Integer sortOrder,

        List<@Valid AdminGrammarExampleRequest> examples
) {
}
