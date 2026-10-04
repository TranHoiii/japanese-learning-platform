package com.japanese.learning.reading.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class ReadingAnswerRequest {

    @NotNull(message = "questionId không được để trống")
    @Positive(message = "questionId phải là số dương")
    private Long questionId;

    private Long selectedOptionId;
}
