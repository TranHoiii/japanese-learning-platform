package com.japanese.learning.review.service;

import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.entity.Exercise;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.grammar.entity.Grammar;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.entity.Kanji;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.listening.entity.ListeningContent;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.reading.entity.ReadingContent;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.review.dto.CreateReviewItemRequest;
import com.japanese.learning.review.dto.ReviewItemResponse;
import com.japanese.learning.review.dto.ReviewResultRequest;
import com.japanese.learning.review.entity.ReviewItem;
import com.japanese.learning.review.enums.ReviewResult;
import com.japanese.learning.review.enums.ReviewStatus;
import com.japanese.learning.review.repository.ReviewItemRepository;
import com.japanese.learning.user.entity.User;
import com.japanese.learning.vocabulary.entity.Vocabulary;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private static final Set<ContentType> SUPPORTED_CONTENT_TYPES = Set.of(
            ContentType.VOCABULARY,
            ContentType.GRAMMAR,
            ContentType.KANJI,
            ContentType.LISTENING,
            ContentType.READING,
            ContentType.EXERCISE
    );

    private final AuthService authService;
    private final ReviewItemRepository reviewItemRepository;
    private final VocabularyRepository vocabularyRepository;
    private final GrammarRepository grammarRepository;
    private final KanjiRepository kanjiRepository;
    private final ListeningContentRepository listeningContentRepository;
    private final ReadingContentRepository readingContentRepository;
    private final ExerciseRepository exerciseRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ReviewItemResponse> getReviewItems(Jwt jwt, ReviewStatus status) {
        User user = authService.getAuthenticatedUser(jwt);
        List<ReviewItem> items;
        if (status != null) {
            items = reviewItemRepository.findByUserIdAndStatusOrderByPriorityDescNextReviewAtAsc(user.getId(), status);
        } else {
            items = reviewItemRepository.findByUserIdOrderByPriorityDescNextReviewAtAsc(user.getId());
        }
        return items.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewItemResponse> getDueReviewItems(Jwt jwt) {
        User user = authService.getAuthenticatedUser(jwt);
        List<ReviewItem> items = reviewItemRepository.findDueItemsByUserId(user.getId(), LocalDateTime.now());
        return items.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public ReviewItemResponse createReviewItem(Jwt jwt, CreateReviewItemRequest request) {
        User user = authService.getAuthenticatedUser(jwt);
        validateSupportedContentType(request.contentType());
        if (request.contentId() == null || request.contentId() <= 0) {
            throw new IllegalArgumentException("ID nội dung phải lớn hơn 0");
        }
        validateContentExists(request.contentType(), request.contentId());

        Optional<ReviewItem> existing = reviewItemRepository
                .findByUserIdAndContentTypeAndContentId(user.getId(), request.contentType(), request.contentId());
        if (existing.isPresent()) {
            return mapToResponse(existing.get());
        }

        ReviewItem newItem = new ReviewItem();
        newItem.setUser(user);
        newItem.setContentType(request.contentType());
        newItem.setContentId(request.contentId());
        newItem.setWrongCount(0);
        newItem.setCorrectCount(0);
        newItem.setPriority(0);
        newItem.setStatus(ReviewStatus.PENDING);
        newItem.setLastReviewedAt(null);
        newItem.setNextReviewAt(LocalDateTime.now());

        ReviewItem saved = reviewItemRepository.save(newItem);
        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public ReviewItemResponse updateReviewItem(Jwt jwt, Long id, ReviewResultRequest request) {
        User user = authService.getAuthenticatedUser(jwt);
        ReviewItem item = reviewItemRepository.findByUserIdAndId(user.getId(), id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy mục ôn tập với ID: " + id));

        LocalDateTime now = LocalDateTime.now();
        item.setLastReviewedAt(now);
        item.setStatus(ReviewStatus.PENDING);

        ReviewResult result = request.result();
        if (result == null) {
            throw new IllegalArgumentException("Kết quả ôn tập không được để trống");
        }

        switch (result) {
            case AGAIN -> {
                item.setWrongCount(item.getWrongCount() + 1);
                item.setPriority(item.getPriority() + 1);
                item.setNextReviewAt(now.plusDays(1));
            }
            case HARD -> {
                item.setWrongCount(item.getWrongCount() + 1);
                item.setPriority(item.getPriority() + 1);
                item.setNextReviewAt(now.plusDays(2));
            }
            case GOOD -> {
                item.setCorrectCount(item.getCorrectCount() + 1);
                item.setPriority(Math.max(0, item.getPriority() - 1));
                item.setNextReviewAt(now.plusDays(4));
            }
            case EASY -> {
                item.setCorrectCount(item.getCorrectCount() + 1);
                item.setPriority(Math.max(0, item.getPriority() - 2));
                item.setNextReviewAt(now.plusDays(7));
            }
        }

        ReviewItem saved = reviewItemRepository.save(item);
        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public void deleteReviewItem(Jwt jwt, Long id) {
        User user = authService.getAuthenticatedUser(jwt);
        ReviewItem item = reviewItemRepository.findByUserIdAndId(user.getId(), id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy mục ôn tập với ID: " + id));
        reviewItemRepository.delete(item);
    }

    private void validateSupportedContentType(ContentType contentType) {
        if (contentType == null || !SUPPORTED_CONTENT_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Loại nội dung không được hỗ trợ trong Review V1: " + contentType);
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

    private ReviewItemResponse mapToResponse(ReviewItem item) {
        String title = null;
        Long lessonId = null;
        Integer lessonNumber = null;

        try {
            switch (item.getContentType()) {
                case VOCABULARY -> {
                    Optional<Vocabulary> vocabOpt = vocabularyRepository.findById(item.getContentId());
                    if (vocabOpt.isPresent()) {
                        Vocabulary v = vocabOpt.get();
                        title = (v.getKanji() != null && !v.getKanji().isBlank())
                                ? v.getKanji() + " (" + v.getHiragana() + ") - " + v.getMeaning()
                                : v.getHiragana() + " - " + v.getMeaning();
                        if (v.getLesson() != null) {
                            lessonId = v.getLesson().getId();
                            lessonNumber = v.getLesson().getLessonNumber();
                        }
                    }
                }
                case GRAMMAR -> {
                    Optional<Grammar> gramOpt = grammarRepository.findById(item.getContentId());
                    if (gramOpt.isPresent()) {
                        Grammar g = gramOpt.get();
                        title = g.getPattern() + " - " + g.getMeaning();
                        if (g.getLesson() != null) {
                            lessonId = g.getLesson().getId();
                            lessonNumber = g.getLesson().getLessonNumber();
                        }
                    }
                }
                case KANJI -> {
                    Optional<Kanji> kanjiOpt = kanjiRepository.findById(item.getContentId());
                    if (kanjiOpt.isPresent()) {
                        Kanji k = kanjiOpt.get();
                        StringBuilder sb = new StringBuilder(k.getKanji());
                        if (k.getHanViet() != null && !k.getHanViet().isBlank()) {
                            sb.append(" (").append(k.getHanViet()).append(")");
                        }
                        if (k.getMeaning() != null && !k.getMeaning().isBlank()) {
                            sb.append(" - ").append(k.getMeaning());
                        }
                        title = sb.toString();
                        if (k.getLessonKanjis() != null && !k.getLessonKanjis().isEmpty()) {
                            var lk = k.getLessonKanjis().get(0);
                            if (lk.getLesson() != null) {
                                lessonId = lk.getLesson().getId();
                                lessonNumber = lk.getLesson().getLessonNumber();
                            }
                        }
                    }
                }
                case LISTENING -> {
                    Optional<ListeningContent> lcOpt = listeningContentRepository.findById(item.getContentId());
                    if (lcOpt.isPresent()) {
                        ListeningContent lc = lcOpt.get();
                        title = lc.getTitle();
                        if (lc.getLesson() != null) {
                            lessonId = lc.getLesson().getId();
                            lessonNumber = lc.getLesson().getLessonNumber();
                        }
                    }
                }
                case READING -> {
                    Optional<ReadingContent> rcOpt = readingContentRepository.findById(item.getContentId());
                    if (rcOpt.isPresent()) {
                        ReadingContent rc = rcOpt.get();
                        title = rc.getTitle();
                        if (rc.getLesson() != null) {
                            lessonId = rc.getLesson().getId();
                            lessonNumber = rc.getLesson().getLessonNumber();
                        }
                    }
                }
                case EXERCISE -> {
                    Optional<Exercise> exOpt = exerciseRepository.findById(item.getContentId());
                    if (exOpt.isPresent()) {
                        Exercise e = exOpt.get();
                        title = e.getTitle();
                        if (e.getLesson() != null) {
                            lessonId = e.getLesson().getId();
                            lessonNumber = e.getLesson().getLessonNumber();
                        }
                    }
                }
                default -> {}
            }
        } catch (Exception e) {
            log.warn("Lỗi khi nạp metadata cho review item {}: {}", item.getId(), e.getMessage());
        }

        return new ReviewItemResponse(
                item.getId(),
                item.getContentType(),
                item.getContentId(),
                item.getWrongCount(),
                item.getCorrectCount(),
                item.getPriority(),
                item.getLastReviewedAt(),
                item.getNextReviewAt(),
                item.getStatus(),
                title,
                lessonId,
                lessonNumber
        );
    }
}
