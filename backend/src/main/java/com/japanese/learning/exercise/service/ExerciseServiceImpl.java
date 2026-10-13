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
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.progress.dto.UpdateContentProgressRequest;
import com.japanese.learning.progress.entity.UserAnswer;
import com.japanese.learning.progress.repository.UserAnswerRepository;
import com.japanese.learning.progress.service.ProgressService;
import com.japanese.learning.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final QuestionRepository questionRepository;
    private final ExerciseMapper exerciseMapper;
    private final QuestionMapper questionMapper;
    private final ExerciseGradingHelper exerciseGradingHelper;
    private final AuthService authService;
    private final UserAnswerRepository userAnswerRepository;
    private final ProgressService progressService;
    private final ObjectMapper objectMapper;

    @Autowired
    public ExerciseServiceImpl(ExerciseRepository exerciseRepository,
                               QuestionRepository questionRepository,
                               ExerciseMapper exerciseMapper,
                               QuestionMapper questionMapper,
                               ExerciseGradingHelper exerciseGradingHelper,
                               @Autowired(required = false) AuthService authService,
                               @Autowired(required = false) UserAnswerRepository userAnswerRepository,
                               @Autowired(required = false) ProgressService progressService,
                               @Autowired(required = false) ObjectMapper objectMapper) {
        this.exerciseRepository = exerciseRepository;
        this.questionRepository = questionRepository;
        this.exerciseMapper = exerciseMapper;
        this.questionMapper = questionMapper;
        this.exerciseGradingHelper = exerciseGradingHelper != null ? exerciseGradingHelper : new ExerciseGradingHelper();
        this.authService = authService;
        this.userAnswerRepository = userAnswerRepository;
        this.progressService = progressService;
        this.objectMapper = objectMapper != null ? objectMapper : new ObjectMapper();
    }

    public ExerciseServiceImpl(ExerciseRepository exerciseRepository,
                               QuestionRepository questionRepository,
                               ExerciseMapper exerciseMapper,
                               QuestionMapper questionMapper,
                               ExerciseGradingHelper exerciseGradingHelper) {
        this(exerciseRepository, questionRepository, exerciseMapper, questionMapper, exerciseGradingHelper, null, null, null, null);
    }

    public ExerciseServiceImpl(ExerciseRepository exerciseRepository,
                               QuestionRepository questionRepository,
                               ExerciseMapper exerciseMapper,
                               QuestionMapper questionMapper) {
        this(exerciseRepository, questionRepository, exerciseMapper, questionMapper, new ExerciseGradingHelper(), null, null, null, null);
    }



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
        return submitExercise(exerciseId, request, null);
    }

    @Override
    @Transactional
    public ExerciseSubmitResponse submitExercise(Long exerciseId, ExerciseSubmitRequest request, Jwt jwt) {
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
        int autoGradedCount = 0;
        int correctCount = 0;

        for (Question question : exercise.getQuestions()) {
            ExerciseAnswerRequest userAns = userAnswers.get(question.getId());
            ExerciseQuestionResultResponse qResult = exerciseGradingHelper.gradeQuestion(question, userAns);

            if (Boolean.TRUE.equals(qResult.getAutoGraded())) {
                autoGradedCount++;
                if (Boolean.TRUE.equals(qResult.getIsCorrect())) {
                    correctCount++;
                }
            }

            results.add(qResult);
        }

        int totalQuestions = exercise.getQuestions().size();
        int wrongCount = autoGradedCount - correctCount;
        int score = autoGradedCount > 0 ? (int) Math.round(((double) correctCount / autoGradedCount) * 100) : 100;

        // Persist user answers and update learning progress if authenticated
        if (jwt != null && authService != null && userAnswerRepository != null) {
            try {
                User user = authService.getAuthenticatedUser(jwt);
                if (user != null) {
                    // Remove previous answers for this exercise attempt
                    List<UserAnswer> priorAnswers = userAnswerRepository.findByUserIdAndExerciseId(user.getId(), exercise.getId());
                    if (priorAnswers != null && !priorAnswers.isEmpty()) {
                        userAnswerRepository.deleteAll(priorAnswers);
                    }

                    LocalDateTime now = LocalDateTime.now();
                    for (int i = 0; i < exercise.getQuestions().size(); i++) {
                        Question question = exercise.getQuestions().get(i);
                        ExerciseAnswerRequest userAns = userAnswers.get(question.getId());
                        ExerciseQuestionResultResponse qResult = results.get(i);

                        UserAnswer ua = new UserAnswer();
                        ua.setUser(user);
                        ua.setQuestion(question);
                        ua.setExercise(exercise);
                        ua.setCorrect(Boolean.TRUE.equals(qResult.getIsCorrect()));
                        ua.setAnsweredAt(now);

                        if (userAns != null) {
                            if (userAns.getSelectedOptionId() != null && question.getOptions() != null) {
                                question.getOptions().stream()
                                        .filter(opt -> opt.getId().equals(userAns.getSelectedOptionId()))
                                        .findFirst()
                                        .ifPresent(ua::setSelectedOption);
                            }

                            if (userAns.getResponses() != null && !userAns.getResponses().isEmpty()) {
                                try {
                                    ua.setAnswerText(objectMapper.writeValueAsString(userAns.getResponses()));
                                } catch (Exception ex) {
                                    ua.setAnswerText(userAns.getResponses().toString());
                                }
                            } else if (userAns.getAnswerText() != null) {
                                ua.setAnswerText(userAns.getAnswerText());
                            }
                        }

                        userAnswerRepository.save(ua);
                    }

                    if (progressService != null) {
                        progressService.updateContentProgress(jwt, new UpdateContentProgressRequest(
                                ContentType.EXERCISE,
                                exercise.getId(),
                                score
                        ));
                    }
                }
            } catch (Exception ex) {
                log.warn("Không thể lưu kết quả bài làm cho bài tập {}: {}", exerciseId, ex.getMessage());
            }
        }

        return ExerciseSubmitResponse.builder()
                .score(score)
                .totalQuestions(totalQuestions)
                .correctCount(correctCount)
                .wrongCount(wrongCount)
                .results(results)
                .build();
    }
}

