package com.japanese.learning.exercise.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.dto.ExerciseAnswerRequest;
import com.japanese.learning.exercise.dto.ExerciseMapper;
import com.japanese.learning.exercise.dto.ExerciseQuestionResultResponse;
import com.japanese.learning.exercise.dto.ExerciseResponse;
import com.japanese.learning.exercise.dto.ExerciseSubmitRequest;
import com.japanese.learning.exercise.dto.ExerciseSubmitResponse;
import com.japanese.learning.exercise.dto.QuestionMapper;
import com.japanese.learning.exercise.dto.QuestionResponse;
import com.japanese.learning.exercise.entity.Exercise;
import com.japanese.learning.exercise.entity.Question;
import com.japanese.learning.exercise.entity.QuestionOption;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.exercise.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final QuestionRepository questionRepository;
    private final ExerciseMapper exerciseMapper;
    private final QuestionMapper questionMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ExerciseResponse> getAllExercises() {
        return exerciseRepository.findAllByOrderBySortOrderAsc().stream()
                .map(exerciseMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExerciseResponse> getExercisesByLessonId(Long lessonId) {
        return exerciseRepository.findByLessonIdOrderBySortOrderAsc(lessonId).stream()
                .map(exerciseMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ExerciseResponse getExerciseById(Long id) {
        Exercise exercise = exerciseRepository.findWithQuestionsById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài tập với id: " + id));
        if (exercise.getQuestions() != null) {
            for (Question q : exercise.getQuestions()) {
                if (q.getOptions() != null) {
                    q.getOptions().size();
                }
            }
        }
        return exerciseMapper.toResponse(exercise);
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuestionResponse> getQuestionsByExerciseId(Long exerciseId) {
        if (!exerciseRepository.existsById(exerciseId)) {
            throw new ResourceNotFoundException("Không tìm thấy bài tập với id: " + exerciseId);
        }
        return questionRepository.findByExerciseIdOrderBySortOrderAsc(exerciseId).stream()
                .map(questionMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public ExerciseSubmitResponse submitExercise(Long exerciseId, ExerciseSubmitRequest request) {
        Exercise exercise = exerciseRepository.findWithQuestionsById(exerciseId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài tập với id: " + exerciseId));
        if (exercise.getQuestions() != null) {
            for (Question q : exercise.getQuestions()) {
                if (q.getOptions() != null) {
                    q.getOptions().size();
                }
            }
        }

        Map<Long, ExerciseAnswerRequest> userAnswers = (request.getAnswers() != null)
                ? request.getAnswers().stream()
                .filter(a -> a.getQuestionId() != null)
                .collect(Collectors.toMap(ExerciseAnswerRequest::getQuestionId, a -> a, (k1, k2) -> k2))
                : Collections.emptyMap();

        List<ExerciseQuestionResultResponse> results = new ArrayList<>();
        int correctCount = 0;

        for (Question question : exercise.getQuestions()) {
            ExerciseAnswerRequest userAns = userAnswers.get(question.getId());
            Long selectedOptionId = userAns != null ? userAns.getSelectedOptionId() : null;
            String userText = userAns != null ? userAns.getAnswerText() : null;

            QuestionOption correctOption = question.getOptions().stream()
                    .filter(QuestionOption::getCorrect)
                    .findFirst()
                    .orElse(null);

            Long correctOptionId = correctOption != null ? correctOption.getId() : null;
            String correctAnswerText = correctOption != null ? correctOption.getOptionText() : null;

            boolean isCorrect = false;

            if (selectedOptionId != null && correctOptionId != null) {
                isCorrect = selectedOptionId.equals(correctOptionId);
            } else if (userText != null && !userText.trim().isEmpty()) {
                if (correctAnswerText != null && !correctAnswerText.trim().isEmpty()) {
                    isCorrect = userText.trim().equalsIgnoreCase(correctAnswerText.trim());
                } else if (question.getExplanation() != null) {
                    isCorrect = question.getExplanation().trim().equalsIgnoreCase(userText.trim());
                }
            }

            if (isCorrect) {
                correctCount++;
            }

            results.add(ExerciseQuestionResultResponse.builder()
                    .questionId(question.getId())
                    .isCorrect(isCorrect)
                    .selectedOptionId(selectedOptionId)
                    .correctOptionId(correctOptionId)
                    .answerText(userText)
                    .correctAnswerText(correctAnswerText != null ? correctAnswerText : question.getExplanation())
                    .explanation(question.getExplanation())
                    .build());
        }

        int totalQuestions = exercise.getQuestions().size();
        int wrongCount = totalQuestions - correctCount;
        int score = totalQuestions > 0 ? (int) Math.round(((double) correctCount / totalQuestions) * 100) : 0;

        return ExerciseSubmitResponse.builder()
                .score(score)
                .totalQuestions(totalQuestions)
                .correctCount(correctCount)
                .wrongCount(wrongCount)
                .results(results)
                .build();
    }
}
