package com.japanese.learning.progress.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateLessonProgressRequest(
        @NotNull(message = "Tiến độ không được để trống")
        @Min(value = 0, message = "Tiến độ phải từ 0 đến 100")
        @Max(value = 100, message = "Tiến độ phải từ 0 đến 100")
        Integer progressPercent
) {
}
