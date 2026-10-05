package com.japanese.learning.admin.dto;

import java.util.List;

public record AdminKanjiResponse(
        Long id,
        String kanji,
        String hanViet,
        String onyomi,
        String kunyomi,
        String meaning,
        Integer strokeCount,
        String strokeOrderUrl,
        String mnemonic,
        String mnemonicImageUrl,
        List<Long> assignedLessonIds
) {
}
