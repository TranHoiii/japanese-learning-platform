package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminReadingOptionRequest;
import com.japanese.learning.admin.dto.AdminReadingOptionResponse;
import com.japanese.learning.admin.dto.AdminReadingQuestionRequest;
import com.japanese.learning.admin.dto.AdminReadingQuestionResponse;
import com.japanese.learning.admin.dto.AdminReadingRequest;
import com.japanese.learning.admin.dto.AdminReadingResponse;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.reading.entity.ReadingContent;
import com.japanese.learning.reading.entity.ReadingOption;
import com.japanese.learning.reading.entity.ReadingQuestion;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.reading.repository.ReadingQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminReadingService {

    private final ReadingContentRepository readingContentRepository;
    private final ReadingQuestionRepository readingQuestionRepository;
    private final LessonRepository lessonRepository;

    @Transactional(readOnly = true)
    public List<AdminReadingResponse> getReadings(Long lessonId) {
        List<ReadingContent> contents;
        if (lessonId != null) {
            if (!lessonRepository.existsById(lessonId)) {
                throw new ResourceNotFoundException("Không tìm thấy bài học với ID: " + lessonId);
            }
            contents = readingContentRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        } else {
            contents = readingContentRepository.findAllByOrderBySortOrderAsc();
        }

        return contents.stream().map(this::mapToResponse).toList();
    }

    @Transactional(readOnly = true)
    public AdminReadingResponse getReadingById(Long id) {
        ReadingContent content = findContentById(id);
        return mapToResponse(content);
    }

    @Transactional
    public AdminReadingResponse createReading(AdminReadingRequest request) {
        Lesson lesson = lessonRepository.findById(request.lessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + request.lessonId()));

        ReadingContent content = new ReadingContent();
        content.setLesson(lesson);
        applyRequestToContent(request, content);

        if (request.questions() != null && !request.questions().isEmpty()) {
            for (AdminReadingQuestionRequest qReq : request.questions()) {
                ReadingQuestion question = createQuestionFromRequest(content, qReq);
                content.getQuestions().add(question);
            }
        }

        ReadingContent saved = readingContentRepository.save(content);
        return mapToResponse(saved);
    }

    @Transactional
    public AdminReadingResponse updateReading(Long id, AdminReadingRequest request) {
        ReadingContent content = findContentById(id);

        Lesson lesson = lessonRepository.findById(request.lessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + request.lessonId()));

        content.setLesson(lesson);
        applyRequestToContent(request, content);

        if (request.questions() != null) {
            content.getQuestions().clear();
            for (AdminReadingQuestionRequest qReq : request.questions()) {
                ReadingQuestion question = createQuestionFromRequest(content, qReq);
                content.getQuestions().add(question);
            }
        }

        ReadingContent updated = readingContentRepository.save(content);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteReading(Long id) {
        ReadingContent content = findContentById(id);
        readingContentRepository.delete(content);
    }

    // Nested Questions
    @Transactional(readOnly = true)
    public List<AdminReadingQuestionResponse> getQuestions(Long readingId) {
        if (!readingContentRepository.existsById(readingId)) {
            throw new ResourceNotFoundException("Không tìm thấy bài đọc với ID: " + readingId);
        }
        return readingQuestionRepository.findByReadingIdOrderBySortOrderAsc(readingId).stream()
                .map(this::mapQuestionToResponse)
                .toList();
    }

    @Transactional
    public AdminReadingQuestionResponse createQuestion(Long readingId, AdminReadingQuestionRequest request) {
        ReadingContent content = findContentById(readingId);
        ReadingQuestion question = createQuestionFromRequest(content, request);
        ReadingQuestion saved = readingQuestionRepository.save(question);
        return mapQuestionToResponse(saved);
    }

    @Transactional
    public AdminReadingQuestionResponse updateQuestion(Long readingId, Long questionId, AdminReadingQuestionRequest request) {
        ReadingQuestion question = readingQuestionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy câu hỏi với ID: " + questionId));

        if (!question.getReading().getId().equals(readingId)) {
            throw new ResourceNotFoundException("Câu hỏi ID: " + questionId + " không thuộc bài đọc ID: " + readingId);
        }

        question.setQuestion(request.question().trim());
        question.setQuestionType(request.questionType());
        question.setExplanation(request.explanation() != null && !request.explanation().isBlank() ? request.explanation().trim() : null);
        question.setImageUrl(request.imageUrl() != null && !request.imageUrl().isBlank() ? request.imageUrl().trim() : null);
        question.setSortOrder(request.sortOrder());

        if (request.options() != null) {
            question.getOptions().clear();
            for (AdminReadingOptionRequest optReq : request.options()) {
                ReadingOption opt = new ReadingOption();
                opt.setQuestion(question);
                opt.setContent(optReq.content().trim());
                opt.setCorrect(optReq.correct());
                opt.setSortOrder(optReq.sortOrder());
                question.getOptions().add(opt);
            }
        }

        ReadingQuestion updated = readingQuestionRepository.save(question);
        return mapQuestionToResponse(updated);
    }

    @Transactional
    public void deleteQuestion(Long readingId, Long questionId) {
        ReadingQuestion question = readingQuestionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy câu hỏi với ID: " + questionId));

        if (!question.getReading().getId().equals(readingId)) {
            throw new ResourceNotFoundException("Câu hỏi ID: " + questionId + " không thuộc bài đọc ID: " + readingId);
        }

        readingQuestionRepository.delete(question);
    }

    private ReadingContent findContentById(Long id) {
        return readingContentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài đọc với ID: " + id));
    }

    private void applyRequestToContent(AdminReadingRequest request, ReadingContent content) {
        content.setTitle(request.title().trim());
        content.setContent(request.content().trim());
        content.setTranslation(request.translation() != null && !request.translation().isBlank() ? request.translation().trim() : null);
        content.setImageUrl(request.imageUrl() != null && !request.imageUrl().isBlank() ? request.imageUrl().trim() : null);
        content.setSortOrder(request.sortOrder());
    }

    private ReadingQuestion createQuestionFromRequest(ReadingContent content, AdminReadingQuestionRequest request) {
        ReadingQuestion question = new ReadingQuestion();
        question.setReading(content);
        question.setQuestion(request.question().trim());
        question.setQuestionType(request.questionType());
        question.setExplanation(request.explanation() != null && !request.explanation().isBlank() ? request.explanation().trim() : null);
        question.setImageUrl(request.imageUrl() != null && !request.imageUrl().isBlank() ? request.imageUrl().trim() : null);
        question.setSortOrder(request.sortOrder());

        if (request.options() != null) {
            for (AdminReadingOptionRequest optReq : request.options()) {
                ReadingOption opt = new ReadingOption();
                opt.setQuestion(question);
                opt.setContent(optReq.content().trim());
                opt.setCorrect(optReq.correct());
                opt.setSortOrder(optReq.sortOrder());
                question.getOptions().add(opt);
            }
        }
        return question;
    }

    private AdminReadingResponse mapToResponse(ReadingContent content) {
        String levelCode = (content.getLesson() != null && content.getLesson().getLevel() != null)
                ? content.getLesson().getLevel().getCode()
                : null;
        Integer lessonNumber = content.getLesson() != null ? content.getLesson().getLessonNumber() : null;

        List<AdminReadingQuestionResponse> questions = content.getQuestions() != null
                ? content.getQuestions().stream().map(this::mapQuestionToResponse).toList()
                : new ArrayList<>();

        return new AdminReadingResponse(
                content.getId(),
                content.getLesson().getId(),
                lessonNumber,
                levelCode,
                content.getTitle(),
                content.getContent(),
                content.getTranslation(),
                content.getImageUrl(),
                content.getSortOrder(),
                questions
        );
    }

    private AdminReadingQuestionResponse mapQuestionToResponse(ReadingQuestion question) {
        List<AdminReadingOptionResponse> options = question.getOptions() != null
                ? question.getOptions().stream().map(opt -> new AdminReadingOptionResponse(
                opt.getId(),
                question.getId(),
                opt.getContent(),
                opt.getCorrect(),
                opt.getSortOrder()
        )).toList()
                : new ArrayList<>();

        return new AdminReadingQuestionResponse(
                question.getId(),
                question.getReading().getId(),
                question.getQuestion(),
                question.getQuestionType(),
                question.getExplanation(),
                question.getImageUrl(),
                question.getSortOrder(),
                options
        );
    }
}
