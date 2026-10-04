package com.japanese.learning.review.dto;

import com.japanese.learning.common.enums.ContentType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateReviewItemRequest(
        @NotNull(message = "Loại nội dung không được để trống")
        ContentType contentType,

        @NotNull(message = "ID nội dung không được để trống")
        @Positive(message = "ID nội dung phải lớn hơn 0")
        Long contentId
) {
}
