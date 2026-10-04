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
public class FavoriteServiceImpl implements FavoriteService {

    private static final Set<ContentType> SUPPORTED_CONTENT_TYPES = Set.of(
            ContentType.VOCABULARY,
            ContentType.GRAMMAR,
            ContentType.KANJI,
            ContentType.LISTENING,
            ContentType.READING,
            ContentType.EXERCISE
    );

    private final AuthService authService;
    private final FavoriteRepository favoriteRepository;
    private final VocabularyRepository vocabularyRepository;
    private final GrammarRepository grammarRepository;
    private final KanjiRepository kanjiRepository;
    private final ListeningContentRepository listeningContentRepository;
    private final ReadingContentRepository readingContentRepository;
    private final ExerciseRepository exerciseRepository;

    @Override
    @Transactional(readOnly = true)
    public List<FavoriteResponse> getFavorites(Jwt jwt) {
        User user = authService.getAuthenticatedUser(jwt);
        List<Favorite> favorites = favoriteRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return favorites.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public FavoriteResponse addFavorite(Jwt jwt, CreateFavoriteRequest request) {
        User user = authService.getAuthenticatedUser(jwt);
        validateSupportedContentType(request.contentType());
        if (request.contentId() == null || request.contentId() <= 0) {
            throw new IllegalArgumentException("ID nội dung phải lớn hơn 0");
        }
        validateContentExists(request.contentType(), request.contentId());

        Optional<Favorite> existing = favoriteRepository
                .findByUserIdAndContentTypeAndContentId(user.getId(), request.contentType(), request.contentId());
        if (existing.isPresent()) {
            return mapToResponse(existing.get());
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setContentType(request.contentType());
        favorite.setContentId(request.contentId());
        favorite.setCreatedAt(LocalDateTime.now());

        Favorite saved = favoriteRepository.save(favorite);
        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public FavoriteCheckResponse checkFavorite(Jwt jwt, ContentType contentType, Long contentId) {
        User user = authService.getAuthenticatedUser(jwt);
        validateSupportedContentType(contentType);
        if (contentId == null || contentId <= 0) {
            throw new IllegalArgumentException("ID nội dung phải lớn hơn 0");
        }

        Optional<Favorite> existing = favoriteRepository
                .findByUserIdAndContentTypeAndContentId(user.getId(), contentType, contentId);
        return existing
                .map(f -> new FavoriteCheckResponse(true, f.getId()))
                .orElseGet(() -> new FavoriteCheckResponse(false, null));
    }

    @Override
    @Transactional
    public void deleteFavorite(Jwt jwt, Long id) {
        User user = authService.getAuthenticatedUser(jwt);
        Favorite favorite = favoriteRepository.findByUserIdAndId(user.getId(), id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy mục yêu thích với ID: " + id));
        favoriteRepository.delete(favorite);
    }

    private void validateSupportedContentType(ContentType contentType) {
        if (contentType == null || !SUPPORTED_CONTENT_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Loại nội dung không được hỗ trợ trong Favorite V1: " + contentType);
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

    private FavoriteResponse mapToResponse(Favorite favorite) {
        return new FavoriteResponse(
                favorite.getId(),
                favorite.getContentType(),
                favorite.getContentId(),
                favorite.getCreatedAt()
        );
    }
}
