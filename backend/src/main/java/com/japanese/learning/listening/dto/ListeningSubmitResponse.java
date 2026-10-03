package com.japanese.learning.listening.dto;

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
public class ListeningSubmitResponse {

    private Integer score;
    private Integer totalQuestions;
    private Integer correctCount;
    private Integer wrongCount;
    private List<QuestionResultResponse> results;
}
