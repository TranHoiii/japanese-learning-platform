package com.japanese.learning.admin.dto;

import com.japanese.learning.exercise.enums.ContentType;
import com.japanese.learning.exercise.enums.ExerciseType;

import java.util.List;

public record AdminExerciseResponse(
        Long id,
        Long lessonId,
        Integer lessonNumber,
        String levelCode,
        String title,
        String description,
        ExerciseType exerciseType,
        ContentType contentType,
        Integer sortOrder,
        List<AdminQuestionResponse> questions
) {
}
