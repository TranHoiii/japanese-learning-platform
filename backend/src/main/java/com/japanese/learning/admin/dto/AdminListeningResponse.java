package com.japanese.learning.admin.dto;

import java.util.List;

public record AdminListeningResponse(
        Long id,
        Long lessonId,
        Integer lessonNumber,
        String levelCode,
        String title,
        String audioUrl,
        String transcript,
        String description,
        Integer sortOrder,
        List<AdminListeningQuestionResponse> questions
) {
}
