package com.japanese.learning.review.security;

import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.review.controller.ReviewController;
import com.japanese.learning.review.service.ReviewService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ReviewController.class)
@Import(SecurityConfig.class)
class ReviewSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ReviewService reviewService;

    @Test
    @DisplayName("Unauthenticated GET /api/v1/review trả 401 ApiResponse chuẩn")
    void testGetReviewItems_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/review"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Unauthenticated GET /api/v1/review/due trả 401")
    void testGetDueReviewItems_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/review/due"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Unauthenticated POST /api/v1/review trả 401")
    void testCreateReviewItem_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(post("/api/v1/review")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"contentType\":\"VOCABULARY\",\"contentId\":1}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Unauthenticated PUT /api/v1/review/1 trả 401")
    void testUpdateReviewItem_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(put("/api/v1/review/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"result\":\"GOOD\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Unauthenticated DELETE /api/v1/review/1 trả 401")
    void testDeleteReviewItem_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(delete("/api/v1/review/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }
}
