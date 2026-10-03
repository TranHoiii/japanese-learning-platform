package com.japanese.learning.listening.dto;

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
public class ListeningSubmitRequest {

    @NotEmpty(message = "Answers list cannot be empty")
    @Valid
    private List<QuestionAnswerRequest> answers;
}
