package com.japanese.learning.admin.dto;

import java.util.List;

public record AdminReadingResponse(
        Long id,
        Long lessonId,
        Integer lessonNumber,
        String levelCode,
        String title,
        String content,
        String translation,
        String imageUrl,
        Integer sortOrder,
        List<AdminReadingQuestionResponse> questions
) {
}
