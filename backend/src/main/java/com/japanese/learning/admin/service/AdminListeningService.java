package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminListeningOptionRequest;
import com.japanese.learning.admin.dto.AdminListeningOptionResponse;
import com.japanese.learning.admin.dto.AdminListeningQuestionRequest;
import com.japanese.learning.admin.dto.AdminListeningQuestionResponse;
import com.japanese.learning.admin.dto.AdminListeningRequest;
import com.japanese.learning.admin.dto.AdminListeningResponse;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.listening.entity.ListeningContent;
import com.japanese.learning.listening.entity.ListeningOption;
import com.japanese.learning.listening.entity.ListeningQuestion;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.listening.repository.ListeningQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminListeningService {

    private final ListeningContentRepository listeningContentRepository;
    private final ListeningQuestionRepository listeningQuestionRepository;
    private final LessonRepository lessonRepository;

    @Transactional(readOnly = true)
    public List<AdminListeningResponse> getListenings(Long lessonId) {
        List<ListeningContent> contents;
        if (lessonId != null) {
            if (!lessonRepository.existsById(lessonId)) {
                throw new ResourceNotFoundException("Không tìm thấy bài học với ID: " + lessonId);
            }
            contents = listeningContentRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        } else {
            contents = listeningContentRepository.findAllByOrderBySortOrderAsc();
        }

        return contents.stream().map(this::mapToResponse).toList();
    }

    @Transactional(readOnly = true)
    public AdminListeningResponse getListeningById(Long id) {
        ListeningContent content = findContentById(id);
        return mapToResponse(content);
    }

    @Transactional
    public AdminListeningResponse createListening(AdminListeningRequest request) {
        Lesson lesson = lessonRepository.findById(request.lessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + request.lessonId()));

        ListeningContent content = new ListeningContent();
        content.setLesson(lesson);
        applyRequestToContent(request, content);

        if (request.questions() != null && !request.questions().isEmpty()) {
            for (AdminListeningQuestionRequest qReq : request.questions()) {
                ListeningQuestion question = createQuestionFromRequest(content, qReq);
                content.getQuestions().add(question);
            }
        }

        ListeningContent saved = listeningContentRepository.save(content);
        return mapToResponse(saved);
    }

    @Transactional
    public AdminListeningResponse updateListening(Long id, AdminListeningRequest request) {
        ListeningContent content = findContentById(id);

        Lesson lesson = lessonRepository.findById(request.lessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + request.lessonId()));

        content.setLesson(lesson);
        applyRequestToContent(request, content);

        if (request.questions() != null) {
            content.getQuestions().clear();
            for (AdminListeningQuestionRequest qReq : request.questions()) {
                ListeningQuestion question = createQuestionFromRequest(content, qReq);
                content.getQuestions().add(question);
            }
        }

        ListeningContent updated = listeningContentRepository.save(content);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteListening(Long id) {
        ListeningContent content = findContentById(id);
        listeningContentRepository.delete(content);
    }

    // Nested Questions
    @Transactional(readOnly = true)
    public List<AdminListeningQuestionResponse> getQuestions(Long listeningId) {
        if (!listeningContentRepository.existsById(listeningId)) {
            throw new ResourceNotFoundException("Không tìm thấy bài nghe với ID: " + listeningId);
        }
        return listeningQuestionRepository.findByListeningIdOrderBySortOrderAsc(listeningId).stream()
                .map(this::mapQuestionToResponse)
                .toList();
    }

    @Transactional
    public AdminListeningQuestionResponse createQuestion(Long listeningId, AdminListeningQuestionRequest request) {
        ListeningContent content = findContentById(listeningId);
        ListeningQuestion question = createQuestionFromRequest(content, request);
        ListeningQuestion saved = listeningQuestionRepository.save(question);
        return mapQuestionToResponse(saved);
    }

    @Transactional
    public AdminListeningQuestionResponse updateQuestion(Long listeningId, Long questionId, AdminListeningQuestionRequest request) {
        ListeningQuestion question = listeningQuestionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy câu hỏi với ID: " + questionId));

        if (!question.getListening().getId().equals(listeningId)) {
            throw new ResourceNotFoundException("Câu hỏi ID: " + questionId + " không thuộc bài nghe ID: " + listeningId);
        }

        question.setQuestion(request.question().trim());
        question.setQuestionType(request.questionType());
        question.setExplanation(request.explanation() != null && !request.explanation().isBlank() ? request.explanation().trim() : null);
        question.setSortOrder(request.sortOrder());

        if (request.options() != null) {
            question.getOptions().clear();
            for (AdminListeningOptionRequest optReq : request.options()) {
                ListeningOption opt = new ListeningOption();
                opt.setQuestion(question);
                opt.setContent(optReq.content().trim());
                opt.setCorrect(optReq.correct());
                opt.setSortOrder(optReq.sortOrder());
                question.getOptions().add(opt);
            }
        }

        ListeningQuestion updated = listeningQuestionRepository.save(question);
        return mapQuestionToResponse(updated);
    }

    @Transactional
    public void deleteQuestion(Long listeningId, Long questionId) {
        ListeningQuestion question = listeningQuestionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy câu hỏi với ID: " + questionId));

        if (!question.getListening().getId().equals(listeningId)) {
            throw new ResourceNotFoundException("Câu hỏi ID: " + questionId + " không thuộc bài nghe ID: " + listeningId);
        }

        listeningQuestionRepository.delete(question);
    }

    private ListeningContent findContentById(Long id) {
        return listeningContentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài nghe với ID: " + id));
    }

    private void applyRequestToContent(AdminListeningRequest request, ListeningContent content) {
        content.setTitle(request.title().trim());
        content.setAudioUrl(request.audioUrl() != null && !request.audioUrl().isBlank() ? request.audioUrl().trim() : null);
        content.setTranscript(request.transcript() != null && !request.transcript().isBlank() ? request.transcript().trim() : null);
        content.setDescription(request.description() != null && !request.description().isBlank() ? request.description().trim() : null);
        content.setSortOrder(request.sortOrder());
    }

    private ListeningQuestion createQuestionFromRequest(ListeningContent content, AdminListeningQuestionRequest request) {
        ListeningQuestion question = new ListeningQuestion();
        question.setListening(content);
        question.setQuestion(request.question().trim());
        question.setQuestionType(request.questionType());
        question.setExplanation(request.explanation() != null && !request.explanation().isBlank() ? request.explanation().trim() : null);
        question.setSortOrder(request.sortOrder());

        if (request.options() != null) {
            for (AdminListeningOptionRequest optReq : request.options()) {
                ListeningOption opt = new ListeningOption();
                opt.setQuestion(question);
                opt.setContent(optReq.content().trim());
                opt.setCorrect(optReq.correct());
                opt.setSortOrder(optReq.sortOrder());
                question.getOptions().add(opt);
            }
        }
        return question;
    }

    private AdminListeningResponse mapToResponse(ListeningContent content) {
        String levelCode = (content.getLesson() != null && content.getLesson().getLevel() != null)
                ? content.getLesson().getLevel().getCode()
                : null;
        Integer lessonNumber = content.getLesson() != null ? content.getLesson().getLessonNumber() : null;

        List<AdminListeningQuestionResponse> questions = content.getQuestions() != null
                ? content.getQuestions().stream().map(this::mapQuestionToResponse).toList()
                : new ArrayList<>();

        return new AdminListeningResponse(
                content.getId(),
                content.getLesson().getId(),
                lessonNumber,
                levelCode,
                content.getTitle(),
                content.getAudioUrl(),
                content.getTranscript(),
                content.getDescription(),
                content.getSortOrder(),
                questions
        );
    }

    private AdminListeningQuestionResponse mapQuestionToResponse(ListeningQuestion question) {
        List<AdminListeningOptionResponse> options = question.getOptions() != null
                ? question.getOptions().stream().map(opt -> new AdminListeningOptionResponse(
                opt.getId(),
                question.getId(),
                opt.getContent(),
                opt.getCorrect(),
                opt.getSortOrder()
        )).toList()
                : new ArrayList<>();

        return new AdminListeningQuestionResponse(
                question.getId(),
                question.getListening().getId(),
                question.getQuestion(),
                question.getQuestionType(),
                question.getExplanation(),
                question.getSortOrder(),
                options
        );
    }
}
