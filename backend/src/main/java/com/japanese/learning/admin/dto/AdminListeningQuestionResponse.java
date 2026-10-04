package com.japanese.learning.admin.dto;

import com.japanese.learning.exercise.enums.QuestionType;

import java.util.List;

public record AdminListeningQuestionResponse(
        Long id,
        Long listeningId,
        String question,
        QuestionType questionType,
        String explanation,
        Integer sortOrder,
        List<AdminListeningOptionResponse> options
) {
}
