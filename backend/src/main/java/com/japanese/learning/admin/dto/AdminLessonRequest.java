package com.japanese.learning.admin.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record AdminLessonRequest(
        @NotNull(message = "Cấp độ không được để trống")
        @Positive(message = "ID cấp độ không hợp lệ")
        Long levelId,

        @NotNull(message = "Số thứ tự bài học không được để trống")
        @Min(value = 1, message = "Số thứ tự bài học phải lớn hơn hoặc bằng 1")
        Integer lessonNumber,

        @NotBlank(message = "Tiêu đề bài học không được để trống")
        @Size(max = 255, message = "Tiêu đề bài học không vượt quá 255 ký tự")
        String title,

        String description,

        @NotNull(message = "Thứ tự sắp xếp không được để trống")
        @Min(value = 0, message = "Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")
        Integer sortOrder,

        Boolean isActive
) {
}
