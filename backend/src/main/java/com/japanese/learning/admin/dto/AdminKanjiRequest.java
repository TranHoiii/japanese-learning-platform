package com.japanese.learning.admin.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdminKanjiRequest(
        @NotBlank(message = "Chữ Hán không được để trống")
        @Size(max = 10, message = "Chữ Hán không vượt quá 10 ký tự")
        String kanji,

        @Size(max = 100, message = "Hán Việt không vượt quá 100 ký tự")
        String hanViet,

        @Size(max = 255, message = "Âm On không vượt quá 255 ký tự")
        String onyomi,

        @Size(max = 255, message = "Âm Kun không vượt quá 255 ký tự")
        String kunyomi,

        String meaning,

        Integer strokeCount,

        @Size(max = 500, message = "Đường dẫn nét viết không vượt quá 500 ký tự")
        String strokeOrderUrl,

        String mnemonic,

        @Size(max = 500, message = "Đường dẫn hình ảnh ghi nhớ không vượt quá 500 ký tự")
        String mnemonicImageUrl
) {
}
