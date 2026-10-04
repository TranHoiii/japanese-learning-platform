package com.japanese.learning.exercise.dto;

import com.japanese.learning.exercise.enums.ContentType;
import com.japanese.learning.exercise.enums.ExerciseType;
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
public class ExerciseResponse {

    private Long id;
    private Long lessonId;
    private String title;
    private String description;
    private ExerciseType exerciseType;
    private ContentType contentType;
    private Integer sortOrder;
    private Integer questionCount;
    private List<QuestionResponse> questions;
}
