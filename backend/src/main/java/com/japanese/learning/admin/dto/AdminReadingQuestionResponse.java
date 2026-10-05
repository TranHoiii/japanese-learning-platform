package com.japanese.learning.admin.dto;

import com.japanese.learning.exercise.enums.QuestionType;

import java.util.List;

public record AdminReadingQuestionResponse(
        Long id,
        Long readingId,
        String question,
        QuestionType questionType,
        String explanation,
        String imageUrl,
        Integer sortOrder,
        List<AdminReadingOptionResponse> options
) {
}
