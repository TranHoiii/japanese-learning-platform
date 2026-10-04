package com.japanese.learning.exercise.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
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
public class ExerciseSubmitRequest {

    @NotEmpty(message = "Danh sách câu trả lời không được để trống")
    @Valid
    private List<ExerciseAnswerRequest> answers;
}
