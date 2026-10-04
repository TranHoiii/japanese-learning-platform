package com.japanese.learning.admin.dto;

import com.japanese.learning.exercise.enums.ContentType;
import com.japanese.learning.exercise.enums.ExerciseType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.List;

public record AdminExerciseRequest(
        @NotNull(message = "Bài học không được để trống")
        @Positive(message = "ID bài học không hợp lệ")
        Long lessonId,

        @NotBlank(message = "Tiêu đề không được để trống")
        @Size(max = 255, message = "Tiêu đề không vượt quá 255 ký tự")
        String title,

        String description,

        @NotNull(message = "Loại bài tập không được để trống")
        ExerciseType exerciseType,

        @NotNull(message = "Loại nội dung không được để trống")
        ContentType contentType,

        @NotNull(message = "Thứ tự sắp xếp không được để trống")
        @Min(value = 0, message = "Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")
        Integer sortOrder,

        List<@Valid AdminQuestionRequest> questions
) {
}
