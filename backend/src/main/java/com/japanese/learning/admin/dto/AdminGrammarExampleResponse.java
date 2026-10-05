package com.japanese.learning.admin.dto;

public record AdminGrammarExampleResponse(
        Long id,
        Long grammarId,
        String japanese,
        String furigana,
        String translation,
        String explanation,
        Integer sortOrder
) {
}
