package com.japanese.learning.admin.dto;

import com.japanese.learning.exercise.enums.QuestionType;

import java.util.List;

public record AdminQuestionResponse(
        Long id,
        Long exerciseId,
        String questionText,
        QuestionType questionType,
        String explanation,
        Integer sortOrder,
        List<AdminQuestionOptionResponse> options
) {
}
