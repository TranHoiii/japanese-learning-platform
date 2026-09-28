package com.japanese.learning.kanji.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KanjiCompoundResponse {

    private Long id;
    private String word;
    private String reading;
    private String meaning;
    private String exampleSentence;
}
