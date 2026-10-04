package com.japanese.learning.reading.dto;

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
public class ReadingSubmitResponse {

    private int score;
    private int totalQuestions;
    private int correctCount;
    private int wrongCount;
    private List<ReadingQuestionResultResponse> results;
}
