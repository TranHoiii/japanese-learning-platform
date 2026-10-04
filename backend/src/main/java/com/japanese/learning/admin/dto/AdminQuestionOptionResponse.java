package com.japanese.learning.admin.dto;

public record AdminQuestionOptionResponse(
        Long id,
        Long questionId,
        String optionText,
        Boolean correct,
        Integer sortOrder
) {
}
