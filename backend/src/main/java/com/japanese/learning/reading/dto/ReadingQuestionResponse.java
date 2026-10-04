package com.japanese.learning.reading.dto;

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
public class ReadingQuestionResponse {

    private Long id;
    private String question;
    private QuestionType questionType;
    private String imageUrl;
    private Integer sortOrder;
    private List<ReadingOptionResponse> options;
}
