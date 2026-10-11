package com.japanese.learning.exercise.dto;

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
public class BlankResultResponse {

    private String blankId;
    private Boolean isCorrect;
    private String userAnswer;
    private String correctAnswer;
    private Boolean autoGraded;
}
