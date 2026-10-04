package com.japanese.learning.favorite.service;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.favorite.dto.CreateFavoriteRequest;
import com.japanese.learning.favorite.dto.FavoriteCheckResponse;
import com.japanese.learning.favorite.dto.FavoriteResponse;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public interface FavoriteService {

    List<FavoriteResponse> getFavorites(Jwt jwt);

    FavoriteResponse addFavorite(Jwt jwt, CreateFavoriteRequest request);

    FavoriteCheckResponse checkFavorite(Jwt jwt, ContentType contentType, Long contentId);

    void deleteFavorite(Jwt jwt, Long id);
}
