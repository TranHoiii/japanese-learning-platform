package com.japanese.learning.favorite.dto;

import com.japanese.learning.common.enums.ContentType;

import java.time.LocalDateTime;

public record FavoriteResponse(
        Long id,
        ContentType contentType,
        Long contentId,
        LocalDateTime createdAt
) {
}
