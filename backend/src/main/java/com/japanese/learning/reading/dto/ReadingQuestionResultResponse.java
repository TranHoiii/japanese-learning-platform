package com.japanese.learning.reading.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class ReadingQuestionResultResponse {

    private Long questionId;

    @JsonProperty("isCorrect")
    private boolean isCorrect;

    private Long selectedOptionId;
    private Long correctOptionId;
    private String explanation;
}
