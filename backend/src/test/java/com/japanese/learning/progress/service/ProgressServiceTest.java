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
import com.japanese.learning.user.enums.Role;
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
class ProgressServiceTest {

    @Mock
    private AuthService authService;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private UserLessonProgressRepository userLessonProgressRepository;

    @Mock
    private UserContentProgressRepository userContentProgressRepository;

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

    @Mock
    private Jwt jwt;

    @InjectMocks
    private ProgressServiceImpl progressService;

    private User testUser;
    private Lesson testLesson;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(100L);
        testUser.setEmail("user@example.com");
        testUser.setFullName("Test User");
        testUser.setRole(Role.USER);
        testUser.setStatus(true);

        testLesson = new Lesson();
        testLesson.setId(1L);
        testLesson.setLessonNumber(1);
        testLesson.setTitle("Bài 1");
    }

    @Test
    @DisplayName("1 & 12. Summary: Lấy tổng số bài học động từ repository, không hard-code 25")
    void testGetProgressSummary_CalculatesDynamically() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(lessonRepository.count()).thenReturn(10L); // 10 lessons total (not 25)
        when(userLessonProgressRepository.countByUserIdAndStatus(100L, LearningStatus.COMPLETED)).thenReturn(2L);
        when(userLessonProgressRepository.countByUserIdAndStatus(100L, LearningStatus.IN_PROGRESS)).thenReturn(1L);
        when(userLessonProgressRepository.sumProgressPercentByUserId(100L)).thenReturn(250L); // 100 + 100 + 50 = 250

        ProgressSummaryResponse summary = progressService.getProgressSummary(jwt);

        assertNotNull(summary);
        assertEquals(10L, summary.totalLessons());
        assertEquals(2L, summary.completedLessons());
        assertEquals(1L, summary.inProgressLessons());
        assertEquals(25, summary.overallProgress()); // 250 / 10 = 25%
    }

    @Test
    @DisplayName("Summary: totalLessons = 0 trả overallProgress = 0")
    void testGetProgressSummary_ZeroLessons() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(lessonRepository.count()).thenReturn(0L);
        when(userLessonProgressRepository.countByUserIdAndStatus(100L, LearningStatus.COMPLETED)).thenReturn(0L);
        when(userLessonProgressRepository.countByUserIdAndStatus(100L, LearningStatus.IN_PROGRESS)).thenReturn(0L);

        ProgressSummaryResponse summary = progressService.getProgressSummary(jwt);

        assertNotNull(summary);
        assertEquals(0L, summary.totalLessons());
        assertEquals(0, summary.overallProgress());
    }

    @Test
    @DisplayName("4 & 5. Update content progress thành công: progressPercent 1..99 -> IN_PROGRESS")
    void testUpdateContentProgress_InProgress() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(vocabularyRepository.existsById(15L)).thenReturn(true);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.VOCABULARY, 15L))
                .thenReturn(Optional.empty());
        when(userContentProgressRepository.save(any(UserContentProgress.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.VOCABULARY, 15L, 60);
        ContentProgressResponse response = progressService.updateContentProgress(jwt, request);

        assertNotNull(response);
        assertEquals(ContentType.VOCABULARY, response.contentType());
        assertEquals(15L, response.contentId());
        assertEquals(60, response.progressPercent());
        assertEquals(LearningStatus.IN_PROGRESS, response.status());
        assertNotNull(response.lastAccessedAt());
        assertNull(response.completedAt());
    }

    @Test
    @DisplayName("6. Update content progress: progressPercent = 100 -> COMPLETED, có completedAt")
    void testUpdateContentProgress_Completed() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(grammarRepository.existsById(20L)).thenReturn(true);
        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.GRAMMAR, 20L))
                .thenReturn(Optional.empty());
        when(userContentProgressRepository.save(any(UserContentProgress.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.GRAMMAR, 20L, 100);
        ContentProgressResponse response = progressService.updateContentProgress(jwt, request);

        assertNotNull(response);
        assertEquals(ContentType.GRAMMAR, response.contentType());
        assertEquals(20L, response.contentId());
        assertEquals(100, response.progressPercent());
        assertEquals(LearningStatus.COMPLETED, response.status());
        assertNotNull(response.lastAccessedAt());
        assertNotNull(response.completedAt());
    }

    @Test
    @DisplayName("Update content progress: progressPercent = 0 -> NOT_STARTED, completedAt = null")
    void testUpdateContentProgress_NotStarted() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(kanjiRepository.existsById(5L)).thenReturn(true);

        UserContentProgress existing = new UserContentProgress();
        existing.setUser(testUser);
        existing.setContentType(ContentType.KANJI);
        existing.setContentId(5L);
        existing.setProgressPercent(100);
        existing.setStatus(LearningStatus.COMPLETED);
        existing.setCompletedAt(LocalDateTime.now());

        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.KANJI, 5L))
                .thenReturn(Optional.of(existing));
        when(userContentProgressRepository.save(any(UserContentProgress.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.KANJI, 5L, 0);
        ContentProgressResponse response = progressService.updateContentProgress(jwt, request);

        assertEquals(0, response.progressPercent());
        assertEquals(LearningStatus.NOT_STARTED, response.status());
        assertNull(response.completedAt());
    }

    @Test
    @DisplayName("9. Invalid contentId -> ResourceNotFoundException (404)")
    void testUpdateContentProgress_InvalidContentId_Throws404() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(vocabularyRepository.existsById(999L)).thenReturn(false);

        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.VOCABULARY, 999L, 50);
        assertThrows(ResourceNotFoundException.class, () -> progressService.updateContentProgress(jwt, request));
    }

    @Test
    @DisplayName("Update content progress với unsupported ContentType (TEST/KAIWA) -> IllegalArgumentException (400)")
    void testUpdateContentProgress_UnsupportedContentType_Throws400() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);

        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.TEST, 1L, 50);
        assertThrows(IllegalArgumentException.class, () -> progressService.updateContentProgress(jwt, request));
    }

    @Test
    @DisplayName("11. Upsert cùng content không tạo duplicate record")
    void testUpdateContentProgress_Upsert_DoesNotDuplicate() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(readingContentRepository.existsById(8L)).thenReturn(true);

        UserContentProgress existing = new UserContentProgress();
        existing.setId(42L);
        existing.setUser(testUser);
        existing.setContentType(ContentType.READING);
        existing.setContentId(8L);
        existing.setProgressPercent(30);
        existing.setStatus(LearningStatus.IN_PROGRESS);

        when(userContentProgressRepository.findByUserIdAndContentTypeAndContentId(100L, ContentType.READING, 8L))
                .thenReturn(Optional.of(existing));
        when(userContentProgressRepository.save(any(UserContentProgress.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.READING, 8L, 80);
        ContentProgressResponse response = progressService.updateContentProgress(jwt, request);

        assertEquals(80, response.progressPercent());
        assertEquals(LearningStatus.IN_PROGRESS, response.status());

        ArgumentCaptor<UserContentProgress> captor = ArgumentCaptor.forClass(UserContentProgress.class);
        verify(userContentProgressRepository).save(captor.capture());
        assertEquals(42L, captor.getValue().getId()); // Same existing entity updated
    }

    @Test
    @DisplayName("10. Invalid lessonId khi update lesson progress -> ResourceNotFoundException (404)")
    void testUpdateLessonProgress_InvalidLessonId_Throws404() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(lessonRepository.findById(999L)).thenReturn(Optional.empty());

        UpdateLessonProgressRequest request = new UpdateLessonProgressRequest(50);
        assertThrows(ResourceNotFoundException.class, () -> progressService.updateLessonProgress(jwt, 999L, request));
    }

    @Test
    @DisplayName("Update lesson progress thành công và upsert")
    void testUpdateLessonProgress_Success_AndUpsert() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));
        when(userLessonProgressRepository.findByUserIdAndLessonId(100L, 1L)).thenReturn(Optional.empty());
        when(userLessonProgressRepository.save(any(UserLessonProgress.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        UpdateLessonProgressRequest request = new UpdateLessonProgressRequest(100);
        LessonProgressResponse response = progressService.updateLessonProgress(jwt, 1L, request);

        assertNotNull(response);
        assertEquals(1L, response.lessonId());
        assertEquals(1, response.lessonNumber());
        assertEquals("Bài 1", response.lessonTitle());
        assertEquals(100, response.progressPercent());
        assertEquals(LearningStatus.COMPLETED, response.status());
        assertNotNull(response.completedAt());
    }

    @Test
    @DisplayName("GET /lessons/{lessonId}: Khi user chưa có record -> trả default 0, NOT_STARTED, không tạo record trong DB")
    void testGetLessonProgress_DefaultWhenNoRecord() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));
        when(userLessonProgressRepository.findByUserIdAndLessonId(100L, 1L)).thenReturn(Optional.empty());

        LessonProgressResponse response = progressService.getLessonProgress(jwt, 1L);

        assertNotNull(response);
        assertEquals(1L, response.lessonId());
        assertEquals(1, response.lessonNumber());
        assertEquals("Bài 1", response.lessonTitle());
        assertEquals(0, response.progressPercent());
        assertEquals(LearningStatus.NOT_STARTED, response.status());
        assertNull(response.lastAccessedAt());
        assertNull(response.completedAt());
        verify(userLessonProgressRepository, never()).save(any());
    }

    @Test
    @DisplayName("3. User isolation: User không thể đọc/sửa progress của user khác vì lấy từ JWT")
    void testUserIsolation_UsesOnlyAuthenticatedUserFromJwt() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(testUser);
        when(userLessonProgressRepository.findByUserIdWithLesson(100L)).thenReturn(List.of());

        List<LessonProgressResponse> responses = progressService.getLessonProgresses(jwt);

        assertNotNull(responses);
        verify(userLessonProgressRepository).findByUserIdWithLesson(100L);
        verify(userLessonProgressRepository, never()).findByUserIdWithLesson(eq(200L));
    }
}
