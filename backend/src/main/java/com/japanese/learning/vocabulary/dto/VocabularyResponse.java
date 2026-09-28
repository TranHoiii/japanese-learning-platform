package com.japanese.learning.vocabulary.dto;

public record VocabularyResponse(
        Long id,
        Long lessonId,
        String hiragana,
        String kanji,
        String hanViet,
        String meaning,
        String partOfSpeech,
        String audioUrl,
        String notes
) {
}