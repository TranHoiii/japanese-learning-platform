package com.japanese.learning.exercise.service;

import com.japanese.learning.exercise.dto.ExerciseResponse;
import com.japanese.learning.exercise.dto.ExerciseSubmitRequest;
import com.japanese.learning.exercise.dto.ExerciseSubmitResponse;
import com.japanese.learning.exercise.dto.QuestionResponse;

import java.util.List;

public interface ExerciseService {

    List<ExerciseResponse> getAllExercises();

    List<ExerciseResponse> getExercisesByLessonId(Long lessonId);

    ExerciseResponse getExerciseById(Long id);

    List<QuestionResponse> getQuestionsByExerciseId(Long exerciseId);

    ExerciseSubmitResponse submitExercise(Long exerciseId, ExerciseSubmitRequest request);
}
