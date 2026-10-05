package com.japanese.learning.admin.dto;

import com.japanese.learning.exercise.enums.QuestionType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record AdminReadingQuestionRequest(
        @NotBlank(message = "Câu hỏi không được để trống")
        String question,

        @NotNull(message = "Loại câu hỏi không được để trống")
        QuestionType questionType,

        String explanation,

        @Size(max = 500, message = "Đường dẫn ảnh không vượt quá 500 ký tự")
        String imageUrl,

        @NotNull(message = "Thứ tự sắp xếp không được để trống")
        @Min(value = 0, message = "Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")
        Integer sortOrder,

        List<@Valid AdminReadingOptionRequest> options
) {
}
