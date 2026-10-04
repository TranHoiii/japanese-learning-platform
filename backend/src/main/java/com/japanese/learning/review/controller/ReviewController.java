package com.japanese.learning.review.controller;

import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.review.dto.CreateReviewItemRequest;
import com.japanese.learning.review.dto.ReviewItemResponse;
import com.japanese.learning.review.dto.ReviewResultRequest;
import com.japanese.learning.review.enums.ReviewStatus;
import com.japanese.learning.review.service.ReviewService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/v1/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ApiResponse<List<ReviewItemResponse>> getReviewItems(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam(required = false) ReviewStatus status
    ) {
        return ApiResponse.success("Lấy danh sách ôn tập thành công", reviewService.getReviewItems(jwt, status));
    }

    @GetMapping("/due")
    public ApiResponse<List<ReviewItemResponse>> getDueReviewItems(
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ApiResponse.success("Lấy danh sách ôn tập đến hạn thành công", reviewService.getDueReviewItems(jwt));
    }

    @PostMapping
    public ApiResponse<ReviewItemResponse> createReviewItem(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody CreateReviewItemRequest request
    ) {
        return ApiResponse.success("Thêm mục ôn tập thành công", reviewService.createReviewItem(jwt, request));
    }

    @PutMapping("/{id}")
    public ApiResponse<ReviewItemResponse> updateReviewItem(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable @Positive(message = "ID mục ôn tập phải lớn hơn 0") Long id,
            @Valid @RequestBody ReviewResultRequest request
    ) {
        return ApiResponse.success("Cập nhật kết quả ôn tập thành công", reviewService.updateReviewItem(jwt, id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteReviewItem(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable @Positive(message = "ID mục ôn tập phải lớn hơn 0") Long id
    ) {
        reviewService.deleteReviewItem(jwt, id);
        return ApiResponse.success("Xóa mục ôn tập thành công", null);
    }
}
