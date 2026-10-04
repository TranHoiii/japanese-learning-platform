package com.japanese.learning.exercise.dto;

import jakarta.validation.constraints.NotNull;
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
public class ExerciseAnswerRequest {

    @NotNull(message = "questionId không được để trống")
    private Long questionId;

    private Long selectedOptionId;

    private String answerText;
}
