package com.japanese.learning.exercise.controller;

import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.exercise.dto.ExerciseResponse;
import com.japanese.learning.exercise.dto.ExerciseSubmitRequest;
import com.japanese.learning.exercise.dto.ExerciseSubmitResponse;
import com.japanese.learning.exercise.dto.QuestionResponse;
import com.japanese.learning.exercise.service.ExerciseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @GetMapping
    public ApiResponse<List<ExerciseResponse>> getExercises(
            @RequestParam(name = "lessonId", required = false) @Positive Long lessonId) {
        if (lessonId != null) {
            return ApiResponse.success("Lấy danh sách bài tập theo bài học thành công", exerciseService.getExercisesByLessonId(lessonId));
        }
        return ApiResponse.success("Lấy danh sách bài tập thành công", exerciseService.getAllExercises());
    }

    @GetMapping("/{id}")
    public ApiResponse<ExerciseResponse> getById(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy thông tin bài tập thành công", exerciseService.getExerciseById(id));
    }

    @GetMapping("/{id}/questions")
    public ApiResponse<List<QuestionResponse>> getQuestions(@PathVariable @Positive Long id) {
        return ApiResponse.success("Lấy danh sách câu hỏi thành công", exerciseService.getQuestionsByExerciseId(id));
    }

    @PostMapping("/{exerciseId}/submit")
    public ApiResponse<ExerciseSubmitResponse> submitExercise(
            @PathVariable @Positive Long exerciseId,
            @Valid @RequestBody ExerciseSubmitRequest request) {
        return ApiResponse.success("Nộp bài tập thành công", exerciseService.submitExercise(exerciseId, request));
    }
}
