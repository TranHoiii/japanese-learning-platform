package com.japanese.learning.listening.dto;

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
public class ListeningQuestionResponse {

    private Long id;
    private String question;
    private QuestionType questionType;
    private String explanation;
    private Integer sortOrder;
    private List<ListeningOptionResponse> options;
}
