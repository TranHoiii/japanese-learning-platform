package com.japanese.learning.progress.dto;

import com.japanese.learning.common.enums.ContentType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record UpdateContentProgressRequest(
        @NotNull(message = "Loại nội dung không được để trống")
        ContentType contentType,

        @NotNull(message = "ID nội dung không được để trống")
        @Positive(message = "ID nội dung phải lớn hơn 0")
        Long contentId,

        @Min(value = 0, message = "Tiến độ phải từ 0 đến 100")
        @Max(value = 100, message = "Tiến độ phải từ 0 đến 100")
        Integer progressPercent,

        Boolean patternOpened,
        Boolean contentViewed,
        Boolean examplesViewed
) {
    public UpdateContentProgressRequest(
            ContentType contentType,
            Long contentId,
            Integer progressPercent
    ) {
        this(contentType, contentId, progressPercent, null, null, null);
    }
}
