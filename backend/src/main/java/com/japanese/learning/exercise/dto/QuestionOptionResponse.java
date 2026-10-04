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
public class QuestionOptionResponse {

    private Long id;
    private String optionText;
    private Integer sortOrder;
}
