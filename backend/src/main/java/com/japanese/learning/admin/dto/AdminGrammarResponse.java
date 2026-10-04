package com.japanese.learning.admin.dto;

import java.util.List;

public record AdminGrammarResponse(
        Long id,
        Long lessonId,
        Integer lessonNumber,
        String levelCode,
        String pattern,
        String meaning,
        String usage,
        String explanation,
        String notes,
        Integer sortOrder,
        List<AdminGrammarExampleResponse> examples
) {
}
