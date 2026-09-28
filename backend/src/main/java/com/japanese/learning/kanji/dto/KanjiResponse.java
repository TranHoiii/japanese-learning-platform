package com.japanese.learning.kanji.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KanjiResponse {

    private Long id;
    private String kanji;
    private String hanViet;
    private String onyomi;
    private String kunyomi;
    private String meaning;
    private Integer strokeCount;
    private String strokeOrderUrl;
    private String mnemonic;
    private String mnemonicImageUrl;
    private List<KanjiCompoundResponse> compounds;
}
