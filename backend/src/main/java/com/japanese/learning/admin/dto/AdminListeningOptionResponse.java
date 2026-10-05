package com.japanese.learning.admin.dto;

public record AdminListeningOptionResponse(
        Long id,
        Long questionId,
        String content,
        Boolean correct,
        Integer sortOrder
) {
}
