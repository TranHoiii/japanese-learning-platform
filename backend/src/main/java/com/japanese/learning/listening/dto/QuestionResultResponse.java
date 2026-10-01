package com.japanese.learning.listening.dto;

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
public class QuestionResultResponse {

    private Long questionId;
    private Boolean isCorrect;
    private Long selectedOptionId;
    private Long correctOptionId;
    private String explanation;
}
