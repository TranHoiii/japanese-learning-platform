package com.japanese.learning.grammar.dto;

public record GrammarExampleResponse(
        Long id,
        String japanese,
        String furigana,
        String translation,
        String explanation,
        Integer sortOrder
) {
}
