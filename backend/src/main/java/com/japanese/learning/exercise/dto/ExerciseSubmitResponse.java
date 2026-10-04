package com.japanese.learning.exercise.dto;

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
public class ExerciseSubmitResponse {

    private Integer score;
    private Integer totalQuestions;
    private Integer correctCount;
    private Integer wrongCount;
    private List<ExerciseQuestionResultResponse> results;
}
