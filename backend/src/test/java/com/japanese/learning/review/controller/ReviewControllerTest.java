package com.japanese.learning.review.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.review.dto.CreateReviewItemRequest;
import com.japanese.learning.review.dto.ReviewItemResponse;
import com.japanese.learning.review.dto.ReviewResultRequest;
import com.japanese.learning.review.enums.ReviewResult;
import com.japanese.learning.review.enums.ReviewStatus;
import com.japanese.learning.review.service.ReviewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ReviewControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private ReviewService reviewService;

    @InjectMocks
    private ReviewController reviewController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(reviewController)
                .setCustomArgumentResolvers(new org.springframework.security.web.method.annotation.AuthenticationPrincipalArgumentResolver())
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    @DisplayName("GET /api/v1/review thành công trả 200 và danh sách")
    void testGetReviewItems_Success() throws Exception {
        ReviewItemResponse item = new ReviewItemResponse(
                1L, ContentType.VOCABULARY, 10L, 0, 0, 0,
                null, LocalDateTime.now(), ReviewStatus.PENDING, "ねこ - con mèo", 1L, 1
        );
        when(reviewService.getReviewItems(any(), eq(null))).thenReturn(List.of(item));

        mockMvc.perform(get("/api/v1/review"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].id").value(1))
                .andExpect(jsonPath("$.data[0].contentType").value("VOCABULARY"))
                .andExpect(jsonPath("$.data[0].contentId").value(10))
                .andExpect(jsonPath("$.data[0].title").value("ねこ - con mèo"));
    }

    @Test
    @DisplayName("GET /api/v1/review?status=PENDING lọc theo status")
    void testGetReviewItems_WithStatus() throws Exception {
        ReviewItemResponse item = new ReviewItemResponse(
                1L, ContentType.VOCABULARY, 10L, 0, 0, 0,
                null, LocalDateTime.now(), ReviewStatus.PENDING, "ねこ", 1L, 1
        );
        when(reviewService.getReviewItems(any(), eq(ReviewStatus.PENDING))).thenReturn(List.of(item));

        mockMvc.perform(get("/api/v1/review?status=PENDING"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].id").value(1))
                .andExpect(jsonPath("$.data[0].status").value("PENDING"));
    }

    @Test
    @DisplayName("GET /api/v1/review/due thành công trả 200 và danh sách đến hạn")
    void testGetDueReviewItems_Success() throws Exception {
        ReviewItemResponse item = new ReviewItemResponse(
                2L, ContentType.GRAMMAR, 5L, 1, 2, 1,
                LocalDateTime.now().minusDays(1), LocalDateTime.now().minusHours(2), ReviewStatus.PENDING, "~は~です", 1L, 1
        );
        when(reviewService.getDueReviewItems(any())).thenReturn(List.of(item));

        mockMvc.perform(get("/api/v1/review/due"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].id").value(2))
                .andExpect(jsonPath("$.data[0].contentType").value("GRAMMAR"));
    }

    @Test
    @DisplayName("POST /api/v1/review thành công trả 200")
    void testCreateReviewItem_Success() throws Exception {
        CreateReviewItemRequest request = new CreateReviewItemRequest(ContentType.KANJI, 3L);
        ReviewItemResponse response = new ReviewItemResponse(
                5L, ContentType.KANJI, 3L, 0, 0, 0,
                null, LocalDateTime.now(), ReviewStatus.PENDING, "日 (NHẬT) - ngày, mặt trời", null, null
        );
        when(reviewService.createReviewItem(any(), eq(request))).thenReturn(response);

        mockMvc.perform(post("/api/v1/review")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(5))
                .andExpect(jsonPath("$.data.contentType").value("KANJI"))
                .andExpect(jsonPath("$.data.contentId").value(3));
    }

    @Test
    @DisplayName("POST /api/v1/review contentId <= 0 trả 400")
    void testCreateReviewItem_InvalidContentId_Returns400() throws Exception {
        CreateReviewItemRequest request = new CreateReviewItemRequest(ContentType.VOCABULARY, -1L);

        mockMvc.perform(post("/api/v1/review")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("POST /api/v1/review nội dung không tìm thấy trả 404")
    void testCreateReviewItem_NotFound_Returns404() throws Exception {
        CreateReviewItemRequest request = new CreateReviewItemRequest(ContentType.VOCABULARY, 999L);
        when(reviewService.createReviewItem(any(), eq(request)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy từ vựng với ID: 999"));

        mockMvc.perform(post("/api/v1/review")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Không tìm thấy từ vựng với ID: 999"));
    }

    @Test
    @DisplayName("PUT /api/v1/review/{id} thành công trả 200")
    void testUpdateReviewItem_Success() throws Exception {
        ReviewResultRequest request = new ReviewResultRequest(ReviewResult.GOOD);
        ReviewItemResponse response = new ReviewItemResponse(
                1L, ContentType.VOCABULARY, 10L, 0, 1, 0,
                LocalDateTime.now(), LocalDateTime.now().plusDays(4), ReviewStatus.PENDING, "ねこ", 1L, 1
        );
        when(reviewService.updateReviewItem(any(), eq(1L), eq(request))).thenReturn(response);

        mockMvc.perform(put("/api/v1/review/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.correctCount").value(1));
    }

    @Test
    @DisplayName("PUT /api/v1/review/{id} không tìm thấy trả 404")
    void testUpdateReviewItem_NotFound_Returns404() throws Exception {
        ReviewResultRequest request = new ReviewResultRequest(ReviewResult.AGAIN);
        when(reviewService.updateReviewItem(any(), eq(999L), eq(request)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy mục ôn tập với ID: 999"));

        mockMvc.perform(put("/api/v1/review/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Không tìm thấy mục ôn tập với ID: 999"));
    }

    @Test
    @DisplayName("DELETE /api/v1/review/{id} thành công trả 200")
    void testDeleteReviewItem_Success() throws Exception {
        doNothing().when(reviewService).deleteReviewItem(any(), eq(1L));

        mockMvc.perform(delete("/api/v1/review/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Xóa mục ôn tập thành công"));
    }

    @Test
    @DisplayName("DELETE /api/v1/review/{id} không tìm thấy trả 404")
    void testDeleteReviewItem_NotFound_Returns404() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy mục ôn tập với ID: 999"))
                .when(reviewService).deleteReviewItem(any(), eq(999L));

        mockMvc.perform(delete("/api/v1/review/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Không tìm thấy mục ôn tập với ID: 999"));
    }
}
