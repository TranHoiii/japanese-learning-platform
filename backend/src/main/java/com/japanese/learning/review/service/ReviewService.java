package com.japanese.learning.review.service;

import com.japanese.learning.review.dto.CreateReviewItemRequest;
import com.japanese.learning.review.dto.ReviewItemResponse;
import com.japanese.learning.review.dto.ReviewResultRequest;
import com.japanese.learning.review.enums.ReviewStatus;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public interface ReviewService {

    List<ReviewItemResponse> getReviewItems(Jwt jwt, ReviewStatus status);

    List<ReviewItemResponse> getDueReviewItems(Jwt jwt);

    ReviewItemResponse createReviewItem(Jwt jwt, CreateReviewItemRequest request);

    ReviewItemResponse updateReviewItem(Jwt jwt, Long id, ReviewResultRequest request);

    void deleteReviewItem(Jwt jwt, Long id);
}
