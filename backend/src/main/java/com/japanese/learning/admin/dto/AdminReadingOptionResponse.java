package com.japanese.learning.admin.dto;

public record AdminReadingOptionResponse(
        Long id,
        Long questionId,
        String content,
        Boolean correct,
        Integer sortOrder
) {
}
