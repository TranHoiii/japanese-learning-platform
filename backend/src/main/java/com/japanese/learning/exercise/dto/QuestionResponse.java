package com.japanese.learning.exercise.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.japanese.learning.exercise.enums.QuestionType;
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
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QuestionResponse {

    private Long id;
    private Long exerciseId;
    private String questionText;
    private QuestionType questionType;
    private String explanation;
    private Integer sortOrder;
    private List<QuestionOptionResponse> options;
}
