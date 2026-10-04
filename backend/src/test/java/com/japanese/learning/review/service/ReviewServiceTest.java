package com.japanese.learning.review.service;

import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.review.dto.CreateReviewItemRequest;
import com.japanese.learning.review.dto.ReviewItemResponse;
import com.japanese.learning.review.dto.ReviewResultRequest;
import com.japanese.learning.review.entity.ReviewItem;
import com.japanese.learning.review.enums.ReviewResult;
import com.japanese.learning.review.enums.ReviewStatus;
import com.japanese.learning.review.repository.ReviewItemRepository;
import com.japanese.learning.user.entity.User;
import com.japanese.learning.user.enums.Role;
import com.japanese.learning.vocabulary.entity.Vocabulary;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.oauth2.jwt.Jwt;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReviewServiceTest {

    @Mock
    private AuthService authService;

    @Mock
    private ReviewItemRepository reviewItemRepository;

    @Mock
    private VocabularyRepository vocabularyRepository;

    @Mock
    private GrammarRepository grammarRepository;

    @Mock
    private KanjiRepository kanjiRepository;

    @Mock
    private ListeningContentRepository listeningContentRepository;

    @Mock
    private ReadingContentRepository readingContentRepository;

    @Mock
    private ExerciseRepository exerciseRepository;

    @InjectMocks
    private ReviewServiceImpl reviewService;

    private User user;
    private Jwt jwt;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setRole(Role.USER);

        jwt = Jwt.withTokenValue("mock-token")
                .header("alg", "HS256")
                .claim("sub", "1")
                .claim("email", "test@example.com")
                .claim("role", "USER")
                .build();
    }

    @Test
    @DisplayName("Tạo review item thành công khi nội dung hợp lệ và chưa tồn tại")
    void testCreateReviewItem_Success() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        when(vocabularyRepository.existsById(10L)).thenReturn(true);
        when(reviewItemRepository.findByUserIdAndContentTypeAndContentId(user.getId(), ContentType.VOCABULARY, 10L))
                .thenReturn(Optional.empty());

        ReviewItem savedItem = new ReviewItem();
        savedItem.setId(100L);
        savedItem.setUser(user);
        savedItem.setContentType(ContentType.VOCABULARY);
        savedItem.setContentId(10L);
        savedItem.setWrongCount(0);
        savedItem.setCorrectCount(0);
        savedItem.setPriority(0);
        savedItem.setStatus(ReviewStatus.PENDING);
        savedItem.setNextReviewAt(LocalDateTime.now());

        when(reviewItemRepository.save(any(ReviewItem.class))).thenReturn(savedItem);

        Vocabulary vocab = new Vocabulary();
        vocab.setId(10L);
        vocab.setHiragana("ねこ");
        vocab.setMeaning("con mèo");
        when(vocabularyRepository.findById(10L)).thenReturn(Optional.of(vocab));

        CreateReviewItemRequest request = new CreateReviewItemRequest(ContentType.VOCABULARY, 10L);
        ReviewItemResponse response = reviewService.createReviewItem(jwt, request);

        assertNotNull(response);
        assertEquals(100L, response.id());
        assertEquals(ContentType.VOCABULARY, response.contentType());
        assertEquals(10L, response.contentId());
        assertEquals(0, response.wrongCount());
        assertEquals(0, response.correctCount());
        assertEquals(0, response.priority());
        assertEquals(ReviewStatus.PENDING, response.status());
        assertNotNull(response.nextReviewAt());
        assertNull(response.lastReviewedAt());
        assertEquals("ねこ - con mèo", response.title());

        ArgumentCaptor<ReviewItem> captor = ArgumentCaptor.forClass(ReviewItem.class);
        verify(reviewItemRepository).save(captor.capture());
        ReviewItem created = captor.getValue();
        assertEquals(user, created.getUser());
        assertEquals(ContentType.VOCABULARY, created.getContentType());
        assertEquals(10L, created.getContentId());
        assertEquals(0, created.getPriority());
    }

    @Test
    @DisplayName("Tạo review item trùng lặp không tạo mới mà trả về item hiện có")
    void testCreateReviewItem_Duplicate_ReturnsExisting() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        when(grammarRepository.existsById(5L)).thenReturn(true);

        ReviewItem existingItem = new ReviewItem();
        existingItem.setId(50L);
        existingItem.setUser(user);
        existingItem.setContentType(ContentType.GRAMMAR);
        existingItem.setContentId(5L);
        existingItem.setWrongCount(2);
        existingItem.setCorrectCount(3);
        existingItem.setPriority(1);
        existingItem.setStatus(ReviewStatus.PENDING);

        when(reviewItemRepository.findByUserIdAndContentTypeAndContentId(user.getId(), ContentType.GRAMMAR, 5L))
                .thenReturn(Optional.of(existingItem));

        CreateReviewItemRequest request = new CreateReviewItemRequest(ContentType.GRAMMAR, 5L);
        ReviewItemResponse response = reviewService.createReviewItem(jwt, request);

        assertNotNull(response);
        assertEquals(50L, response.id());
        assertEquals(ContentType.GRAMMAR, response.contentType());
        assertEquals(5L, response.contentId());
        assertEquals(2, response.wrongCount());
        assertEquals(3, response.correctCount());
        verify(reviewItemRepository, never()).save(any(ReviewItem.class));
    }

    @Test
    @DisplayName("Nội dung không tồn tại khi tạo review ném ResourceNotFoundException 404")
    void testCreateReviewItem_ContentNotFound_Throws404() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        when(kanjiRepository.existsById(999L)).thenReturn(false);

        CreateReviewItemRequest request = new CreateReviewItemRequest(ContentType.KANJI, 999L);
        assertThrows(ResourceNotFoundException.class, () -> reviewService.createReviewItem(jwt, request));
        verify(reviewItemRepository, never()).save(any(ReviewItem.class));
    }

    @Test
    @DisplayName("Loại nội dung không thuộc scope Review V1 ném IllegalArgumentException")
    void testCreateReviewItem_UnsupportedContentType_ThrowsIllegalArgument() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);

        CreateReviewItemRequest request = new CreateReviewItemRequest(ContentType.TEST, 1L);
        assertThrows(IllegalArgumentException.class, () -> reviewService.createReviewItem(jwt, request));
    }

    @Test
    @DisplayName("User isolation: Không thể cập nhật review item của user khác ném 404")
    void testUpdateReviewItem_OtherUserItem_Throws404() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        when(reviewItemRepository.findByUserIdAndId(user.getId(), 200L)).thenReturn(Optional.empty());

        ReviewResultRequest request = new ReviewResultRequest(ReviewResult.GOOD);
        assertThrows(ResourceNotFoundException.class, () -> reviewService.updateReviewItem(jwt, 200L, request));
        verify(reviewItemRepository, never()).save(any(ReviewItem.class));
    }

    @Test
    @DisplayName("User isolation: Không thể xóa review item của user khác ném 404")
    void testDeleteReviewItem_OtherUserItem_Throws404() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        when(reviewItemRepository.findByUserIdAndId(user.getId(), 200L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> reviewService.deleteReviewItem(jwt, 200L));
        verify(reviewItemRepository, never()).delete(any(ReviewItem.class));
    }

    @Test
    @DisplayName("Xóa review item của chính mình thành công")
    void testDeleteReviewItem_OwnItem_Success() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        ReviewItem item = new ReviewItem();
        item.setId(200L);
        item.setUser(user);
        when(reviewItemRepository.findByUserIdAndId(user.getId(), 200L)).thenReturn(Optional.of(item));

        reviewService.deleteReviewItem(jwt, 200L);
        verify(reviewItemRepository).delete(item);
    }

    @Test
    @DisplayName("Lấy danh sách đến hạn review (due items)")
    void testGetDueReviewItems_Success() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        ReviewItem item1 = new ReviewItem();
        item1.setId(1L);
        item1.setContentType(ContentType.VOCABULARY);
        item1.setContentId(10L);
        item1.setPriority(2);
        item1.setNextReviewAt(LocalDateTime.now().minusHours(1));

        ReviewItem item2 = new ReviewItem();
        item2.setId(2L);
        item2.setContentType(ContentType.KANJI);
        item2.setContentId(5L);
        item2.setPriority(0);
        item2.setNextReviewAt(null);

        when(reviewItemRepository.findDueItemsByUserId(eq(user.getId()), any(LocalDateTime.class)))
                .thenReturn(List.of(item1, item2));

        List<ReviewItemResponse> dueItems = reviewService.getDueReviewItems(jwt);
        assertEquals(2, dueItems.size());
        assertEquals(1L, dueItems.get(0).id());
        assertEquals(2L, dueItems.get(1).id());
    }

    @Test
    @DisplayName("Schedule AGAIN: wrongCount + 1, priority + 1, nextReviewAt + 1 day, status PENDING")
    void testUpdateReviewItem_ScheduleAgain() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        ReviewItem item = new ReviewItem();
        item.setId(1L);
        item.setUser(user);
        item.setContentType(ContentType.VOCABULARY);
        item.setContentId(1L);
        item.setWrongCount(0);
        item.setCorrectCount(2);
        item.setPriority(1);
        item.setStatus(ReviewStatus.PENDING);

        when(reviewItemRepository.findByUserIdAndId(user.getId(), 1L)).thenReturn(Optional.of(item));
        when(reviewItemRepository.save(any(ReviewItem.class))).thenAnswer(invocation -> invocation.getArgument(0));

        LocalDateTime beforeUpdate = LocalDateTime.now();
        ReviewResultRequest request = new ReviewResultRequest(ReviewResult.AGAIN);
        ReviewItemResponse response = reviewService.updateReviewItem(jwt, 1L, request);

        assertEquals(1, response.wrongCount());
        assertEquals(2, response.correctCount());
        assertEquals(2, response.priority());
        assertEquals(ReviewStatus.PENDING, response.status());
        assertNotNull(response.lastReviewedAt());
        assertTrue(response.nextReviewAt().isAfter(beforeUpdate.plusHours(23)));
        assertTrue(response.nextReviewAt().isBefore(beforeUpdate.plusHours(25)));
    }

    @Test
    @DisplayName("Schedule HARD: wrongCount + 1, priority + 1, nextReviewAt + 2 days, status PENDING")
    void testUpdateReviewItem_ScheduleHard() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        ReviewItem item = new ReviewItem();
        item.setId(1L);
        item.setUser(user);
        item.setContentType(ContentType.VOCABULARY);
        item.setContentId(1L);
        item.setWrongCount(1);
        item.setCorrectCount(2);
        item.setPriority(2);
        item.setStatus(ReviewStatus.PENDING);

        when(reviewItemRepository.findByUserIdAndId(user.getId(), 1L)).thenReturn(Optional.of(item));
        when(reviewItemRepository.save(any(ReviewItem.class))).thenAnswer(invocation -> invocation.getArgument(0));

        LocalDateTime beforeUpdate = LocalDateTime.now();
        ReviewResultRequest request = new ReviewResultRequest(ReviewResult.HARD);
        ReviewItemResponse response = reviewService.updateReviewItem(jwt, 1L, request);

        assertEquals(2, response.wrongCount());
        assertEquals(2, response.correctCount());
        assertEquals(3, response.priority());
        assertEquals(ReviewStatus.PENDING, response.status());
        assertNotNull(response.lastReviewedAt());
        assertTrue(response.nextReviewAt().isAfter(beforeUpdate.plusDays(1).plusHours(23)));
        assertTrue(response.nextReviewAt().isBefore(beforeUpdate.plusDays(2).plusHours(1)));
    }

    @Test
    @DisplayName("Schedule GOOD: correctCount + 1, priority max(0, priority - 1), nextReviewAt + 4 days")
    void testUpdateReviewItem_ScheduleGood() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        ReviewItem item = new ReviewItem();
        item.setId(1L);
        item.setUser(user);
        item.setContentType(ContentType.VOCABULARY);
        item.setContentId(1L);
        item.setWrongCount(0);
        item.setCorrectCount(1);
        item.setPriority(2);
        item.setStatus(ReviewStatus.PENDING);

        when(reviewItemRepository.findByUserIdAndId(user.getId(), 1L)).thenReturn(Optional.of(item));
        when(reviewItemRepository.save(any(ReviewItem.class))).thenAnswer(invocation -> invocation.getArgument(0));

        LocalDateTime beforeUpdate = LocalDateTime.now();
        ReviewResultRequest request = new ReviewResultRequest(ReviewResult.GOOD);
        ReviewItemResponse response = reviewService.updateReviewItem(jwt, 1L, request);

        assertEquals(0, response.wrongCount());
        assertEquals(2, response.correctCount());
        assertEquals(1, response.priority());
        assertEquals(ReviewStatus.PENDING, response.status());
        assertNotNull(response.lastReviewedAt());
        assertTrue(response.nextReviewAt().isAfter(beforeUpdate.plusDays(3).plusHours(23)));
        assertTrue(response.nextReviewAt().isBefore(beforeUpdate.plusDays(4).plusHours(1)));
    }

    @Test
    @DisplayName("Schedule EASY: correctCount + 1, priority max(0, priority - 2), nextReviewAt + 7 days")
    void testUpdateReviewItem_ScheduleEasy() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        ReviewItem item = new ReviewItem();
        item.setId(1L);
        item.setUser(user);
        item.setContentType(ContentType.VOCABULARY);
        item.setContentId(1L);
        item.setWrongCount(0);
        item.setCorrectCount(3);
        item.setPriority(1); // will become max(0, 1 - 2) = 0
        item.setStatus(ReviewStatus.PENDING);

        when(reviewItemRepository.findByUserIdAndId(user.getId(), 1L)).thenReturn(Optional.of(item));
        when(reviewItemRepository.save(any(ReviewItem.class))).thenAnswer(invocation -> invocation.getArgument(0));

        LocalDateTime beforeUpdate = LocalDateTime.now();
        ReviewResultRequest request = new ReviewResultRequest(ReviewResult.EASY);
        ReviewItemResponse response = reviewService.updateReviewItem(jwt, 1L, request);

        assertEquals(0, response.wrongCount());
        assertEquals(4, response.correctCount());
        assertEquals(0, response.priority()); // floor at 0
        assertEquals(ReviewStatus.PENDING, response.status());
        assertNotNull(response.lastReviewedAt());
        assertTrue(response.nextReviewAt().isAfter(beforeUpdate.plusDays(6).plusHours(23)));
        assertTrue(response.nextReviewAt().isBefore(beforeUpdate.plusDays(7).plusHours(1)));
    }
}
