package com.japanese.learning.admin.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.List;

public record AdminReadingRequest(
        @NotNull(message = "Bài học không được để trống")
        @Positive(message = "ID bài học không hợp lệ")
        Long lessonId,

        @NotBlank(message = "Tiêu đề không được để trống")
        @Size(max = 255, message = "Tiêu đề không vượt quá 255 ký tự")
        String title,

        @NotBlank(message = "Nội dung bài đọc không được để trống")
        String content,

        String translation,

        @Size(max = 500, message = "Đường dẫn ảnh không vượt quá 500 ký tự")
        String imageUrl,

        @NotNull(message = "Thứ tự sắp xếp không được để trống")
        @Min(value = 0, message = "Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")
        Integer sortOrder,

        List<@Valid AdminReadingQuestionRequest> questions
) {
}
