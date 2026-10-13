package com.japanese.learning.reading.service;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.progress.dto.UpdateContentProgressRequest;
import com.japanese.learning.progress.service.ProgressService;
import com.japanese.learning.reading.dto.ReadingAnswerRequest;
import com.japanese.learning.reading.dto.ReadingContentMapper;
import com.japanese.learning.reading.dto.ReadingContentResponse;
import com.japanese.learning.reading.dto.ReadingQuestionResultResponse;
import com.japanese.learning.reading.dto.ReadingSubmitRequest;
import com.japanese.learning.reading.dto.ReadingSubmitResponse;
import com.japanese.learning.reading.entity.ReadingContent;
import com.japanese.learning.reading.entity.ReadingOption;
import com.japanese.learning.reading.entity.ReadingQuestion;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
public class ReadingServiceImpl implements ReadingService {

    private final ReadingContentRepository readingContentRepository;
    private final LessonRepository lessonRepository;
    private final ReadingContentMapper readingContentMapper;
    private final ProgressService progressService;

    public ReadingServiceImpl(
            ReadingContentRepository readingContentRepository,
            LessonRepository lessonRepository,
            ReadingContentMapper readingContentMapper) {
        this(readingContentRepository, lessonRepository, readingContentMapper, null);
    }

    @Autowired
    public ReadingServiceImpl(
            ReadingContentRepository readingContentRepository,
            LessonRepository lessonRepository,
            ReadingContentMapper readingContentMapper,
            @Autowired(required = false) ProgressService progressService) {
        this.readingContentRepository = readingContentRepository;
        this.lessonRepository = lessonRepository;
        this.readingContentMapper = readingContentMapper;
        this.progressService = progressService;
    }

    @Override
    public List<ReadingContentResponse> getReadingsByLessonId(Long lessonId) {
        if (!lessonRepository.existsById(lessonId)) {
            throw new ResourceNotFoundException("Không tìm thấy bài học với id: " + lessonId);
        }

        return readingContentRepository.findByLessonIdOrderBySortOrderAsc(lessonId)
                .stream()
                .map(readingContentMapper::toResponse)
                .toList();
    }

    @Override
    public ReadingContentResponse getReadingById(Long id) {
        return readingContentRepository.findById(id)
                .map(readingContentMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài đọc với id: " + id));
    }

    @Override
    @Transactional
    public ReadingSubmitResponse submitReading(Long id, ReadingSubmitRequest request) {
        return submitReading(id, request, null);
    }

    @Override
    @Transactional
    public ReadingSubmitResponse submitReading(Long id, ReadingSubmitRequest request, Jwt jwt) {
        ReadingContent reading = readingContentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài đọc với id: " + id));

        Map<Long, ReadingQuestion> validQuestionsMap = reading.getQuestions().stream()
                .collect(Collectors.toMap(ReadingQuestion::getId, q -> q));

        for (ReadingAnswerRequest answerReq : request.getAnswers()) {
            ReadingQuestion question = validQuestionsMap.get(answerReq.getQuestionId());
            if (question == null) {
                throw new ResourceNotFoundException("Câu hỏi id " + answerReq.getQuestionId() + " không thuộc bài đọc này");
            }
            if (answerReq.getSelectedOptionId() != null) {
                boolean optionBelongsToQuestion = question.getOptions().stream()
                        .anyMatch(opt -> opt.getId().equals(answerReq.getSelectedOptionId()));
                if (!optionBelongsToQuestion) {
                    throw new IllegalArgumentException("Lựa chọn id " + answerReq.getSelectedOptionId() + " không thuộc câu hỏi id " + answerReq.getQuestionId());
                }
            }
        }

        Map<Long, Long> userAnswers = new HashMap<>();
        for (ReadingAnswerRequest answerReq : request.getAnswers()) {
            userAnswers.put(answerReq.getQuestionId(), answerReq.getSelectedOptionId());
        }

        List<ReadingQuestionResultResponse> results = new ArrayList<>();
        int correctCount = 0;

        for (ReadingQuestion question : reading.getQuestions()) {
            Long selectedOptionId = userAnswers.get(question.getId());

            ReadingOption correctOption = question.getOptions().stream()
                    .filter(ReadingOption::getCorrect)
                    .findFirst()
                    .orElse(null);

            Long correctOptionId = correctOption != null ? correctOption.getId() : null;
            boolean isCorrect = selectedOptionId != null && selectedOptionId.equals(correctOptionId);

            if (isCorrect) {
                correctCount++;
            }

            results.add(ReadingQuestionResultResponse.builder()
                    .questionId(question.getId())
                    .isCorrect(isCorrect)
                    .selectedOptionId(selectedOptionId)
                    .correctOptionId(correctOptionId)
                    .explanation(question.getExplanation())
                    .build());
        }

        int totalQuestions = reading.getQuestions().size();
        int wrongCount = totalQuestions - correctCount;
        int score = totalQuestions > 0 ? (int) Math.round(((double) correctCount / totalQuestions) * 100) : 0;

        // Persist user learning progress if authenticated
        if (jwt != null && progressService != null) {
            try {
                progressService.updateContentProgress(jwt, new UpdateContentProgressRequest(
                        ContentType.READING,
                        reading.getId(),
                        score
                ));
            } catch (Exception ex) {
                log.warn("Không thể lưu tiến độ cho bài đọc {}: {}", id, ex.getMessage());
            }
        }

        return ReadingSubmitResponse.builder()
                .score(score)
                .totalQuestions(totalQuestions)
                .correctCount(correctCount)
                .wrongCount(wrongCount)
                .results(results)
                .build();
    }
}
