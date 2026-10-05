package com.japanese.learning.admin.dto;

import com.japanese.learning.exercise.enums.QuestionType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record AdminQuestionRequest(
        @NotBlank(message = "Nội dung câu hỏi không được để trống")
        String questionText,

        @NotNull(message = "Loại câu hỏi không được để trống")
        QuestionType questionType,

        String explanation,

        @NotNull(message = "Thứ tự sắp xếp không được để trống")
        @Min(value = 0, message = "Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")
        Integer sortOrder,

        List<@Valid AdminQuestionOptionRequest> options
) {
}
