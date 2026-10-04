package com.japanese.learning.progress.service;

import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.progress.dto.ContentProgressResponse;
import com.japanese.learning.progress.dto.LessonProgressResponse;
import com.japanese.learning.progress.dto.ProgressSummaryResponse;
import com.japanese.learning.progress.dto.UpdateContentProgressRequest;
import com.japanese.learning.progress.dto.UpdateLessonProgressRequest;
import com.japanese.learning.progress.entity.UserContentProgress;
import com.japanese.learning.progress.entity.UserLessonProgress;
import com.japanese.learning.progress.enums.LearningStatus;
import com.japanese.learning.progress.repository.UserContentProgressRepository;
import com.japanese.learning.progress.repository.UserLessonProgressRepository;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.user.entity.User;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProgressServiceImpl implements ProgressService {

    private static final Set<ContentType> SUPPORTED_CONTENT_TYPES = Set.of(
            ContentType.VOCABULARY,
            ContentType.GRAMMAR,
            ContentType.KANJI,
            ContentType.LISTENING,
            ContentType.READING,
            ContentType.EXERCISE
    );

    private final AuthService authService;
    private final LessonRepository lessonRepository;
    private final UserLessonProgressRepository userLessonProgressRepository;
    private final UserContentProgressRepository userContentProgressRepository;
    private final VocabularyRepository vocabularyRepository;
    private final GrammarRepository grammarRepository;
    private final KanjiRepository kanjiRepository;
    private final ListeningContentRepository listeningContentRepository;
    private final ReadingContentRepository readingContentRepository;
    private final ExerciseRepository exerciseRepository;

    @Override
    @Transactional(readOnly = true)
    public ProgressSummaryResponse getProgressSummary(Jwt jwt) {
        User user = authService.getAuthenticatedUser(jwt);
        long totalLessons = lessonRepository.count();
        long completedLessons = userLessonProgressRepository.countByUserIdAndStatus(user.getId(), LearningStatus.COMPLETED);
        long inProgressLessons = userLessonProgressRepository.countByUserIdAndStatus(user.getId(), LearningStatus.IN_PROGRESS);

        int overallProgress = 0;
        if (totalLessons > 0) {
            Long sumProgress = userLessonProgressRepository.sumProgressPercentByUserId(user.getId());
            if (sumProgress != null && sumProgress > 0) {
                overallProgress = (int) Math.round((double) sumProgress / totalLessons);
                overallProgress = Math.max(0, Math.min(100, overallProgress));
            }
        }

        return new ProgressSummaryResponse(overallProgress, completedLessons, totalLessons, inProgressLessons);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LessonProgressResponse> getLessonProgresses(Jwt jwt) {
        User user = authService.getAuthenticatedUser(jwt);
        List<UserLessonProgress> progresses = userLessonProgressRepository.findByUserIdWithLesson(user.getId());
        return progresses.stream()
                .map(this::mapToLessonProgressResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public LessonProgressResponse getLessonProgress(Jwt jwt, Long lessonId) {
        User user = authService.getAuthenticatedUser(jwt);
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + lessonId));

        return userLessonProgressRepository.findByUserIdAndLessonId(user.getId(), lessonId)
                .map(this::mapToLessonProgressResponse)
                .orElseGet(() -> new LessonProgressResponse(
                        lesson.getId(),
                        lesson.getLessonNumber(),
                        lesson.getTitle(),
                        0,
                        LearningStatus.NOT_STARTED,
                        null,
                        null
                ));
    }

    @Override
    @Transactional
    public LessonProgressResponse updateLessonProgress(Jwt jwt, Long lessonId, UpdateLessonProgressRequest request) {
        User user = authService.getAuthenticatedUser(jwt);
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + lessonId));

        UserLessonProgress progress = userLessonProgressRepository.findByUserIdAndLessonId(user.getId(), lessonId)
                .orElseGet(() -> {
                    UserLessonProgress newProgress = new UserLessonProgress();
                    newProgress.setUser(user);
                    newProgress.setLesson(lesson);
                    return newProgress;
                });

        progress.setProgressPercent(request.progressPercent());
        progress.setStatus(LearningStatus.fromProgressPercent(request.progressPercent()));
        LocalDateTime now = LocalDateTime.now();
        progress.setLastAccessedAt(now);
        if (request.progressPercent() == 100) {
            progress.setCompletedAt(now);
        } else {
            progress.setCompletedAt(null);
        }

        UserLessonProgress saved = userLessonProgressRepository.save(progress);
        return mapToLessonProgressResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContentProgressResponse> getContentProgresses(Jwt jwt, ContentType contentType) {
        User user = authService.getAuthenticatedUser(jwt);
        List<UserContentProgress> list;
        if (contentType != null) {
            validateSupportedContentType(contentType);
            list = userContentProgressRepository.findByUserIdAndContentTypeOrderByLastAccessedAtDesc(user.getId(), contentType);
        } else {
            list = userContentProgressRepository.findByUserIdAndContentTypeInOrderByLastAccessedAtDesc(user.getId(), SUPPORTED_CONTENT_TYPES);
        }

        return list.stream()
                .map(this::mapToContentProgressResponse)
                .toList();
    }

    @Override
    @Transactional
    public ContentProgressResponse updateContentProgress(Jwt jwt, UpdateContentProgressRequest request) {
        User user = authService.getAuthenticatedUser(jwt);
        validateSupportedContentType(request.contentType());
        validateContentExists(request.contentType(), request.contentId());

        UserContentProgress progress = userContentProgressRepository
                .findByUserIdAndContentTypeAndContentId(user.getId(), request.contentType(), request.contentId())
                .orElseGet(() -> {
                    UserContentProgress newProgress = new UserContentProgress();
                    newProgress.setUser(user);
                    newProgress.setContentType(request.contentType());
                    newProgress.setContentId(request.contentId());
                    return newProgress;
                });

        progress.setProgressPercent(request.progressPercent());
        progress.setStatus(LearningStatus.fromProgressPercent(request.progressPercent()));
        LocalDateTime now = LocalDateTime.now();
        progress.setLastAccessedAt(now);
        if (request.progressPercent() == 100) {
            progress.setCompletedAt(now);
        } else {
            progress.setCompletedAt(null);
        }

        UserContentProgress saved = userContentProgressRepository.save(progress);
        return mapToContentProgressResponse(saved);
    }

    private void validateSupportedContentType(ContentType contentType) {
        if (contentType == null || !SUPPORTED_CONTENT_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Loại nội dung không được hỗ trợ trong Progress V1: " + contentType);
        }
    }

    private void validateContentExists(ContentType contentType, Long contentId) {
        boolean exists = switch (contentType) {
            case VOCABULARY -> vocabularyRepository.existsById(contentId);
            case GRAMMAR -> grammarRepository.existsById(contentId);
            case KANJI -> kanjiRepository.existsById(contentId);
            case LISTENING -> listeningContentRepository.existsById(contentId);
            case READING -> readingContentRepository.existsById(contentId);
            case EXERCISE -> exerciseRepository.existsById(contentId);
            default -> false;
        };

        if (!exists) {
            throw new ResourceNotFoundException("Không tìm thấy " + getContentTypeDisplayName(contentType) + " với ID: " + contentId);
        }
    }

    private String getContentTypeDisplayName(ContentType contentType) {
        return switch (contentType) {
            case VOCABULARY -> "từ vựng";
            case GRAMMAR -> "ngữ pháp";
            case KANJI -> "Kanji";
            case LISTENING -> "bài nghe";
            case READING -> "bài đọc";
            case EXERCISE -> "bài tập";
            default -> "nội dung";
        };
    }

    private LessonProgressResponse mapToLessonProgressResponse(UserLessonProgress p) {
        return new LessonProgressResponse(
                p.getLesson().getId(),
                p.getLesson().getLessonNumber(),
                p.getLesson().getTitle(),
                p.getProgressPercent(),
                p.getStatus(),
                p.getLastAccessedAt(),
                p.getCompletedAt()
        );
    }

    private ContentProgressResponse mapToContentProgressResponse(UserContentProgress p) {
        return new ContentProgressResponse(
                p.getContentType(),
                p.getContentId(),
                p.getProgressPercent(),
                p.getStatus(),
                p.getLastAccessedAt(),
                p.getCompletedAt()
        );
    }
}
