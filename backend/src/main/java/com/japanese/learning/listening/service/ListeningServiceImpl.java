package com.japanese.learning.listening.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.listening.dto.ListeningContentMapper;
import com.japanese.learning.listening.dto.ListeningContentResponse;
import com.japanese.learning.listening.dto.ListeningSubmitRequest;
import com.japanese.learning.listening.dto.ListeningSubmitResponse;
import com.japanese.learning.listening.dto.QuestionAnswerRequest;
import com.japanese.learning.listening.dto.QuestionResultResponse;
import com.japanese.learning.listening.entity.ListeningContent;
import com.japanese.learning.listening.entity.ListeningOption;
import com.japanese.learning.listening.entity.ListeningQuestion;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ListeningServiceImpl implements ListeningService {

    private final ListeningContentRepository listeningContentRepository;
    private final LessonRepository lessonRepository;
    private final ListeningContentMapper listeningContentMapper;

    @Override
    public List<ListeningContentResponse> getListeningsByLessonId(Long lessonId) {
        if (!lessonRepository.existsById(lessonId)) {
            throw new ResourceNotFoundException("Không tìm thấy bài học với id: " + lessonId);
        }

        return listeningContentRepository.findByLessonIdOrderBySortOrderAsc(lessonId)
                .stream()
                .map(listeningContentMapper::toResponse)
                .toList();
    }

    @Override
    public ListeningContentResponse getListeningById(Long id) {
        return listeningContentRepository.findById(id)
                .map(listeningContentMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài nghe với id: " + id));
    }

    @Override
    public ListeningSubmitResponse submitListening(Long id, ListeningSubmitRequest request) {
        ListeningContent listening = listeningContentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài nghe với id: " + id));

        Map<Long, ListeningQuestion> validQuestionsMap = listening.getQuestions().stream()
                .collect(Collectors.toMap(ListeningQuestion::getId, q -> q));

        for (QuestionAnswerRequest answerReq : request.getAnswers()) {
            ListeningQuestion question = validQuestionsMap.get(answerReq.getQuestionId());
            if (question == null) {
                throw new ResourceNotFoundException("Câu hỏi id " + answerReq.getQuestionId() + " không thuộc bài nghe này");
            }
            if (answerReq.getSelectedOptionId() != null) {
                boolean optionBelongsToQuestion = question.getOptions().stream()
                        .anyMatch(opt -> opt.getId().equals(answerReq.getSelectedOptionId()));
                if (!optionBelongsToQuestion) {
                    throw new IllegalArgumentException("Lựa chọn id " + answerReq.getSelectedOptionId() + " không thuộc câu hỏi id " + answerReq.getQuestionId());
                }
            }
        }

        Map<Long, Long> userAnswers = request.getAnswers().stream()
                .collect(Collectors.toMap(QuestionAnswerRequest::getQuestionId, QuestionAnswerRequest::getSelectedOptionId, (k1, k2) -> k2));

        List<QuestionResultResponse> results = new ArrayList<>();
        int correctCount = 0;

        for (ListeningQuestion question : listening.getQuestions()) {
            Long selectedOptionId = userAnswers.get(question.getId());

            ListeningOption correctOption = question.getOptions().stream()
                    .filter(ListeningOption::getCorrect)
                    .findFirst()
                    .orElse(null);

            Long correctOptionId = correctOption != null ? correctOption.getId() : null;
            boolean isCorrect = selectedOptionId != null && selectedOptionId.equals(correctOptionId);

            if (isCorrect) {
                correctCount++;
            }

            results.add(QuestionResultResponse.builder()
                    .questionId(question.getId())
                    .isCorrect(isCorrect)
                    .selectedOptionId(selectedOptionId)
                    .correctOptionId(correctOptionId)
                    .explanation(question.getExplanation())
                    .build());
        }

        int totalQuestions = listening.getQuestions().size();
        int wrongCount = totalQuestions - correctCount;
        int score = totalQuestions > 0 ? (int) Math.round(((double) correctCount / totalQuestions) * 100) : 0;

        return ListeningSubmitResponse.builder()
                .score(score)
                .totalQuestions(totalQuestions)
                .correctCount(correctCount)
                .wrongCount(wrongCount)
                .results(results)
                .build();
    }
}
