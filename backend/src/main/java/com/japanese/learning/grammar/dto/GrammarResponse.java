package com.japanese.learning.grammar.dto;

import java.util.List;

public record GrammarResponse(
        Long id,
        Long lessonId,
        String pattern,
        String meaning,
        String usage,
        String explanation,
        String notes,
        Integer sortOrder,
        List<GrammarExampleResponse> examples
) {
}
