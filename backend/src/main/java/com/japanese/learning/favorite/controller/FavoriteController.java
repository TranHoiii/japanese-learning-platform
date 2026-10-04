package com.japanese.learning.favorite.controller;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.favorite.dto.CreateFavoriteRequest;
import com.japanese.learning.favorite.dto.FavoriteCheckResponse;
import com.japanese.learning.favorite.dto.FavoriteResponse;
import com.japanese.learning.favorite.service.FavoriteService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/v1/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    @GetMapping
    public ApiResponse<List<FavoriteResponse>> getFavorites(
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ApiResponse.success("Lấy danh sách yêu thích thành công", favoriteService.getFavorites(jwt));
    }

    @PostMapping
    public ApiResponse<FavoriteResponse> addFavorite(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody CreateFavoriteRequest request
    ) {
        return ApiResponse.success("Thêm vào danh sách yêu thích thành công", favoriteService.addFavorite(jwt, request));
    }

    @GetMapping("/check")
    public ApiResponse<FavoriteCheckResponse> checkFavorite(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam @NotNull(message = "Loại nội dung không được để trống") ContentType contentType,
            @RequestParam @NotNull(message = "ID nội dung không được để trống") @Positive(message = "ID nội dung phải lớn hơn 0") Long contentId
    ) {
        return ApiResponse.success("Kiểm tra yêu thích thành công", favoriteService.checkFavorite(jwt, contentType, contentId));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteFavorite(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable @Positive(message = "ID mục yêu thích phải lớn hơn 0") Long id
    ) {
        favoriteService.deleteFavorite(jwt, id);
        return ApiResponse.success("Xóa yêu thích thành công", null);
    }
}
