package com.japanese.learning.admin.dto;

public record AdminVocabularyResponse(
        Long id,
        Long lessonId,
        Integer lessonNumber,
        String levelCode,
        String hiragana,
        String kanji,
        String hanViet,
        String meaning,
        String partOfSpeech,
        String audioUrl,
        String notes
) {
}
