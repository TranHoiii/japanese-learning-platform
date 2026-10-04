package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminExerciseRequest;
import com.japanese.learning.admin.dto.AdminExerciseResponse;
import com.japanese.learning.admin.dto.AdminQuestionOptionRequest;
import com.japanese.learning.admin.dto.AdminQuestionOptionResponse;
import com.japanese.learning.admin.dto.AdminQuestionRequest;
import com.japanese.learning.admin.dto.AdminQuestionResponse;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.entity.Exercise;
import com.japanese.learning.exercise.entity.Question;
import com.japanese.learning.exercise.entity.QuestionOption;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.exercise.repository.QuestionRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final QuestionRepository questionRepository;
    private final LessonRepository lessonRepository;

    @Transactional(readOnly = true)
    public List<AdminExerciseResponse> getExercises(Long lessonId) {
        List<Exercise> exercises;
        if (lessonId != null) {
            if (!lessonRepository.existsById(lessonId)) {
                throw new ResourceNotFoundException("Không tìm thấy bài học với ID: " + lessonId);
            }
            exercises = exerciseRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        } else {
            exercises = exerciseRepository.findAllByOrderBySortOrderAsc();
        }

        return exercises.stream().map(this::mapToResponse).toList();
    }

    @Transactional(readOnly = true)
    public AdminExerciseResponse getExerciseById(Long id) {
        Exercise exercise = findExerciseById(id);
        return mapToResponse(exercise);
    }

    @Transactional
    public AdminExerciseResponse createExercise(AdminExerciseRequest request) {
        Lesson lesson = lessonRepository.findById(request.lessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + request.lessonId()));

        Exercise exercise = new Exercise();
        exercise.setLesson(lesson);
        applyRequestToExercise(request, exercise);

        if (request.questions() != null && !request.questions().isEmpty()) {
            for (AdminQuestionRequest qReq : request.questions()) {
                Question question = createQuestionFromRequest(exercise, qReq);
                exercise.getQuestions().add(question);
            }
        }

        Exercise saved = exerciseRepository.save(exercise);
        return mapToResponse(saved);
    }

    @Transactional
    public AdminExerciseResponse updateExercise(Long id, AdminExerciseRequest request) {
        Exercise exercise = findExerciseById(id);

        Lesson lesson = lessonRepository.findById(request.lessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + request.lessonId()));

        exercise.setLesson(lesson);
        applyRequestToExercise(request, exercise);

        if (request.questions() != null) {
            exercise.getQuestions().clear();
            for (AdminQuestionRequest qReq : request.questions()) {
                Question question = createQuestionFromRequest(exercise, qReq);
                exercise.getQuestions().add(question);
            }
        }

        Exercise updated = exerciseRepository.save(exercise);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteExercise(Long id) {
        Exercise exercise = findExerciseById(id);
        exerciseRepository.delete(exercise);
    }

    // Nested Questions
    @Transactional(readOnly = true)
    public List<AdminQuestionResponse> getQuestions(Long exerciseId) {
        if (!exerciseRepository.existsById(exerciseId)) {
            throw new ResourceNotFoundException("Không tìm thấy bài tập với ID: " + exerciseId);
        }
        return questionRepository.findByExerciseIdOrderBySortOrderAsc(exerciseId).stream()
                .map(this::mapQuestionToResponse)
                .toList();
    }

    @Transactional
    public AdminQuestionResponse createQuestion(Long exerciseId, AdminQuestionRequest request) {
        Exercise exercise = findExerciseById(exerciseId);
        Question question = createQuestionFromRequest(exercise, request);
        Question saved = questionRepository.save(question);
        return mapQuestionToResponse(saved);
    }

    @Transactional
    public AdminQuestionResponse updateQuestion(Long exerciseId, Long questionId, AdminQuestionRequest request) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy câu hỏi với ID: " + questionId));

        if (!question.getExercise().getId().equals(exerciseId)) {
            throw new ResourceNotFoundException("Câu hỏi ID: " + questionId + " không thuộc bài tập ID: " + exerciseId);
        }

        question.setQuestionText(request.questionText().trim());
        question.setQuestionType(request.questionType());
        question.setExplanation(request.explanation() != null && !request.explanation().isBlank() ? request.explanation().trim() : null);
        question.setSortOrder(request.sortOrder());

        if (request.options() != null) {
            question.getOptions().clear();
            for (AdminQuestionOptionRequest optReq : request.options()) {
                QuestionOption opt = new QuestionOption();
                opt.setQuestion(question);
                opt.setOptionText(optReq.optionText().trim());
                opt.setCorrect(optReq.correct());
                opt.setSortOrder(optReq.sortOrder());
                question.getOptions().add(opt);
            }
        }

        Question updated = questionRepository.save(question);
        return mapQuestionToResponse(updated);
    }

    @Transactional
    public void deleteQuestion(Long exerciseId, Long questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy câu hỏi với ID: " + questionId));

        if (!question.getExercise().getId().equals(exerciseId)) {
            throw new ResourceNotFoundException("Câu hỏi ID: " + questionId + " không thuộc bài tập ID: " + exerciseId);
        }

        questionRepository.delete(question);
    }

    private Exercise findExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài tập với ID: " + id));
    }

    private void applyRequestToExercise(AdminExerciseRequest request, Exercise exercise) {
        exercise.setTitle(request.title().trim());
        exercise.setDescription(request.description() != null && !request.description().isBlank() ? request.description().trim() : null);
        exercise.setExerciseType(request.exerciseType());
        exercise.setContentType(request.contentType());
        exercise.setSortOrder(request.sortOrder());
    }

    private Question createQuestionFromRequest(Exercise exercise, AdminQuestionRequest request) {
        Question question = new Question();
        question.setExercise(exercise);
        question.setQuestionText(request.questionText().trim());
        question.setQuestionType(request.questionType());
        question.setExplanation(request.explanation() != null && !request.explanation().isBlank() ? request.explanation().trim() : null);
        question.setSortOrder(request.sortOrder());

        if (request.options() != null) {
            for (AdminQuestionOptionRequest optReq : request.options()) {
                QuestionOption opt = new QuestionOption();
                opt.setQuestion(question);
                opt.setOptionText(optReq.optionText().trim());
                opt.setCorrect(optReq.correct());
                opt.setSortOrder(optReq.sortOrder());
                question.getOptions().add(opt);
            }
        }
        return question;
    }

    private AdminExerciseResponse mapToResponse(Exercise exercise) {
        String levelCode = (exercise.getLesson() != null && exercise.getLesson().getLevel() != null)
                ? exercise.getLesson().getLevel().getCode()
                : null;
        Integer lessonNumber = exercise.getLesson() != null ? exercise.getLesson().getLessonNumber() : null;

        List<AdminQuestionResponse> questions = exercise.getQuestions() != null
                ? exercise.getQuestions().stream().map(this::mapQuestionToResponse).toList()
                : new ArrayList<>();

        return new AdminExerciseResponse(
                exercise.getId(),
                exercise.getLesson().getId(),
                lessonNumber,
                levelCode,
                exercise.getTitle(),
                exercise.getDescription(),
                exercise.getExerciseType(),
                exercise.getContentType(),
                exercise.getSortOrder(),
                questions
        );
    }

    private AdminQuestionResponse mapQuestionToResponse(Question question) {
        List<AdminQuestionOptionResponse> options = question.getOptions() != null
                ? question.getOptions().stream().map(opt -> new AdminQuestionOptionResponse(
                opt.getId(),
                question.getId(),
                opt.getOptionText(),
                opt.getCorrect(),
                opt.getSortOrder()
        )).toList()
                : new ArrayList<>();

        return new AdminQuestionResponse(
                question.getId(),
                question.getExercise().getId(),
                question.getQuestionText(),
                question.getQuestionType(),
                question.getExplanation(),
                question.getSortOrder(),
                options
        );
    }
}
