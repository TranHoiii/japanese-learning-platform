package com.japanese.learning.review.dto;

import com.japanese.learning.review.enums.ReviewResult;
import jakarta.validation.constraints.NotNull;

public record ReviewResultRequest(
        @NotNull(message = "Kết quả ôn tập không được để trống")
        ReviewResult result
) {
}
