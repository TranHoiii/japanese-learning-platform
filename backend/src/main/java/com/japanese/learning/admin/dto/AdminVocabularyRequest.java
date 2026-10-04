package com.japanese.learning.admin.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record AdminVocabularyRequest(
        @NotNull(message = "Bài học không được để trống")
        @Positive(message = "ID bài học không hợp lệ")
        Long lessonId,

        @NotBlank(message = "Hiragana không được để trống")
        @Size(max = 100, message = "Hiragana không vượt quá 100 ký tự")
        String hiragana,

        @Size(max = 100, message = "Kanji không vượt quá 100 ký tự")
        String kanji,

        @Size(max = 255, message = "Hán Việt không vượt quá 255 ký tự")
        String hanViet,

        @NotBlank(message = "Ý nghĩa không được để trống")
        String meaning,

        @Size(max = 100, message = "Từ loại không vượt quá 100 ký tự")
        String partOfSpeech,

        @Size(max = 500, message = "Đường dẫn audio không vượt quá 500 ký tự")
        String audioUrl,

        String notes
) {
}
