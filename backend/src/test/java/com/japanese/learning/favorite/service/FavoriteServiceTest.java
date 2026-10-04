package com.japanese.learning.favorite.service;

import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.favorite.dto.CreateFavoriteRequest;
import com.japanese.learning.favorite.dto.FavoriteCheckResponse;
import com.japanese.learning.favorite.dto.FavoriteResponse;
import com.japanese.learning.favorite.entity.Favorite;
import com.japanese.learning.favorite.repository.FavoriteRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.user.entity.User;
import com.japanese.learning.user.enums.Role;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.oauth2.jwt.Jwt;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FavoriteServiceTest {

    @Mock
    private AuthService authService;

    @Mock
    private FavoriteRepository favoriteRepository;

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
    private FavoriteServiceImpl favoriteService;

    private User user;
    private Jwt jwt;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("user1@example.com");
        user.setRole(Role.USER);

        jwt = Jwt.withTokenValue("mock-token")
                .header("alg", "HS256")
                .claim("sub", "1")
                .claim("email", "user1@example.com")
                .claim("role", "USER")
                .build();
    }

    @Test
    @DisplayName("User thêm favorite thành công khi nội dung tồn tại và chưa favorite")
    void testAddFavorite_Success() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        when(vocabularyRepository.existsById(10L)).thenReturn(true);
        when(favoriteRepository.findByUserIdAndContentTypeAndContentId(user.getId(), ContentType.VOCABULARY, 10L))
                .thenReturn(Optional.empty());

        Favorite savedFavorite = new Favorite();
        savedFavorite.setId(100L);
        savedFavorite.setUser(user);
        savedFavorite.setContentType(ContentType.VOCABULARY);
        savedFavorite.setContentId(10L);
        savedFavorite.setCreatedAt(LocalDateTime.now());
        when(favoriteRepository.save(any(Favorite.class))).thenReturn(savedFavorite);

        CreateFavoriteRequest request = new CreateFavoriteRequest(ContentType.VOCABULARY, 10L);
        FavoriteResponse response = favoriteService.addFavorite(jwt, request);

        assertNotNull(response);
        assertEquals(100L, response.id());
        assertEquals(ContentType.VOCABULARY, response.contentType());
        assertEquals(10L, response.contentId());

        ArgumentCaptor<Favorite> captor = ArgumentCaptor.forClass(Favorite.class);
        verify(favoriteRepository).save(captor.capture());
        Favorite captured = captor.getValue();
        assertEquals(user, captured.getUser());
        assertEquals(ContentType.VOCABULARY, captured.getContentType());
        assertEquals(10L, captured.getContentId());
        assertNotNull(captured.getCreatedAt());
    }

    @Test
    @DisplayName("Thêm favorite đã tồn tại không tạo bản ghi mới, trả về favorite hiện có")
    void testAddFavorite_Duplicate_ReturnsExisting() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        when(grammarRepository.existsById(5L)).thenReturn(true);

        Favorite existingFavorite = new Favorite();
        existingFavorite.setId(50L);
        existingFavorite.setUser(user);
        existingFavorite.setContentType(ContentType.GRAMMAR);
        existingFavorite.setContentId(5L);
        existingFavorite.setCreatedAt(LocalDateTime.now().minusDays(1));

        when(favoriteRepository.findByUserIdAndContentTypeAndContentId(user.getId(), ContentType.GRAMMAR, 5L))
                .thenReturn(Optional.of(existingFavorite));

        CreateFavoriteRequest request = new CreateFavoriteRequest(ContentType.GRAMMAR, 5L);
        FavoriteResponse response = favoriteService.addFavorite(jwt, request);

        assertNotNull(response);
        assertEquals(50L, response.id());
        assertEquals(ContentType.GRAMMAR, response.contentType());
        assertEquals(5L, response.contentId());
        verify(favoriteRepository, never()).save(any());
    }

    @Test
    @DisplayName("Thêm favorite cho nội dung không tồn tại sẽ throw ResourceNotFoundException")
    void testAddFavorite_ContentNotFound_ThrowsException() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        when(vocabularyRepository.existsById(999L)).thenReturn(false);

        CreateFavoriteRequest request = new CreateFavoriteRequest(ContentType.VOCABULARY, 999L);
        ResourceNotFoundException ex = assertThrows(ResourceNotFoundException.class, () ->
                favoriteService.addFavorite(jwt, request));

        assertTrue(ex.getMessage().contains("Không tìm thấy từ vựng"));
        verify(favoriteRepository, never()).save(any());
    }

    @ParameterizedTest
    @EnumSource(value = ContentType.class, names = {"VOCABULARY", "GRAMMAR", "KANJI", "LISTENING", "READING", "EXERCISE"})
    @DisplayName("Hỗ trợ tất cả 6 loại content type hợp lệ")
    void testAddFavorite_SupportedContentTypes(ContentType contentType) {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);

        switch (contentType) {
            case VOCABULARY -> when(vocabularyRepository.existsById(1L)).thenReturn(true);
            case GRAMMAR -> when(grammarRepository.existsById(1L)).thenReturn(true);
            case KANJI -> when(kanjiRepository.existsById(1L)).thenReturn(true);
            case LISTENING -> when(listeningContentRepository.existsById(1L)).thenReturn(true);
            case READING -> when(readingContentRepository.existsById(1L)).thenReturn(true);
            case EXERCISE -> when(exerciseRepository.existsById(1L)).thenReturn(true);
            default -> {}
        }

        when(favoriteRepository.findByUserIdAndContentTypeAndContentId(user.getId(), contentType, 1L))
                .thenReturn(Optional.empty());

        Favorite saved = new Favorite(1L, user, contentType, 1L, LocalDateTime.now());
        when(favoriteRepository.save(any(Favorite.class))).thenReturn(saved);

        FavoriteResponse response = favoriteService.addFavorite(jwt, new CreateFavoriteRequest(contentType, 1L));
        assertNotNull(response);
        assertEquals(contentType, response.contentType());
    }

    @ParameterizedTest
    @EnumSource(value = ContentType.class, names = {"KAIWA", "TEST"})
    @DisplayName("Từ chối content type không hỗ trợ (KAIWA, TEST)")
    void testAddFavorite_UnsupportedContentType_ThrowsException(ContentType unsupportedType) {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);

        CreateFavoriteRequest request = new CreateFavoriteRequest(unsupportedType, 1L);
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () ->
                favoriteService.addFavorite(jwt, request));

        assertTrue(ex.getMessage().contains("Loại nội dung không được hỗ trợ trong Favorite V1"));
        verify(favoriteRepository, never()).save(any());
    }

    @Test
    @DisplayName("Từ chối request khi contentType là null")
    void testAddFavorite_NullContentType_ThrowsException() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);

        CreateFavoriteRequest request = new CreateFavoriteRequest(null, 1L);
        assertThrows(IllegalArgumentException.class, () ->
                favoriteService.addFavorite(jwt, request));
    }

    @Test
    @DisplayName("Từ chối request khi contentId null hoặc <= 0")
    void testAddFavorite_InvalidContentId_ThrowsException() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);

        CreateFavoriteRequest nullIdRequest = new CreateFavoriteRequest(ContentType.VOCABULARY, null);
        assertThrows(IllegalArgumentException.class, () ->
                favoriteService.addFavorite(jwt, nullIdRequest));

        CreateFavoriteRequest zeroIdRequest = new CreateFavoriteRequest(ContentType.VOCABULARY, 0L);
        assertThrows(IllegalArgumentException.class, () ->
                favoriteService.addFavorite(jwt, zeroIdRequest));

        CreateFavoriteRequest negIdRequest = new CreateFavoriteRequest(ContentType.VOCABULARY, -5L);
        assertThrows(IllegalArgumentException.class, () ->
                favoriteService.addFavorite(jwt, negIdRequest));
    }

    @Test
    @DisplayName("Lấy danh sách favorite của chính user, sắp xếp theo createdAt DESC")
    void testGetFavorites_ReturnsOwnFavoritesSorted() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);

        Favorite fav1 = new Favorite(1L, user, ContentType.VOCABULARY, 10L, LocalDateTime.now());
        Favorite fav2 = new Favorite(2L, user, ContentType.GRAMMAR, 20L, LocalDateTime.now().minusHours(1));

        when(favoriteRepository.findByUserIdOrderByCreatedAtDesc(user.getId())).thenReturn(List.of(fav1, fav2));

        List<FavoriteResponse> results = favoriteService.getFavorites(jwt);

        assertEquals(2, results.size());
        assertEquals(1L, results.get(0).id());
        assertEquals(ContentType.VOCABULARY, results.get(0).contentType());
        assertEquals(2L, results.get(1).id());
        assertEquals(ContentType.GRAMMAR, results.get(1).contentType());
        verify(favoriteRepository).findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    @Test
    @DisplayName("User kiểm tra nội dung đã favorite trả về favorited=true và favoriteId")
    void testCheckFavorite_Favorited() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);

        Favorite fav = new Favorite(15L, user, ContentType.VOCABULARY, 101L, LocalDateTime.now());
        when(favoriteRepository.findByUserIdAndContentTypeAndContentId(user.getId(), ContentType.VOCABULARY, 101L))
                .thenReturn(Optional.of(fav));

        FavoriteCheckResponse response = favoriteService.checkFavorite(jwt, ContentType.VOCABULARY, 101L);

        assertTrue(response.favorited());
        assertEquals(15L, response.favoriteId());
    }

    @Test
    @DisplayName("User kiểm tra nội dung chưa favorite trả về favorited=false và favoriteId=null")
    void testCheckFavorite_NotFavorited() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        when(favoriteRepository.findByUserIdAndContentTypeAndContentId(user.getId(), ContentType.VOCABULARY, 101L))
                .thenReturn(Optional.empty());

        FavoriteCheckResponse response = favoriteService.checkFavorite(jwt, ContentType.VOCABULARY, 101L);

        assertFalse(response.favorited());
        assertNull(response.favoriteId());
    }

    @Test
    @DisplayName("User xóa favorite của chính mình thành công")
    void testDeleteFavorite_OwnFavorite_Success() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);

        Favorite fav = new Favorite(25L, user, ContentType.KANJI, 3L, LocalDateTime.now());
        when(favoriteRepository.findByUserIdAndId(user.getId(), 25L)).thenReturn(Optional.of(fav));

        favoriteService.deleteFavorite(jwt, 25L);

        verify(favoriteRepository).delete(fav);
    }

    @Test
    @DisplayName("User không thể xóa favorite của user khác, throw ResourceNotFoundException")
    void testDeleteFavorite_OtherUserFavorite_ThrowsNotFound() {
        when(authService.getAuthenticatedUser(jwt)).thenReturn(user);
        // findByUserIdAndId returns empty because the favorite with ID 99 belongs to another user
        when(favoriteRepository.findByUserIdAndId(user.getId(), 99L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(ResourceNotFoundException.class, () ->
                favoriteService.deleteFavorite(jwt, 99L));

        assertTrue(ex.getMessage().contains("Không tìm thấy mục yêu thích với ID: 99"));
        verify(favoriteRepository, never()).delete(any());
    }
}
