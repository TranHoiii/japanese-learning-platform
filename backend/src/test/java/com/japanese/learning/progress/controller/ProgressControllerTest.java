package com.japanese.learning.progress.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.progress.dto.ContentProgressResponse;
import com.japanese.learning.progress.dto.LessonProgressResponse;
import com.japanese.learning.progress.dto.ProgressSummaryResponse;
import com.japanese.learning.progress.dto.UpdateContentProgressRequest;
import com.japanese.learning.progress.dto.UpdateLessonProgressRequest;
import com.japanese.learning.progress.enums.LearningStatus;
import com.japanese.learning.progress.service.ProgressService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ProgressControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private ProgressService progressService;

    @InjectMocks
    private ProgressController progressController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(progressController)
                .setCustomArgumentResolvers(new org.springframework.security.web.method.annotation.AuthenticationPrincipalArgumentResolver())
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    @DisplayName("GET /api/v1/progress thành công trả 200 và summary")
    void testGetProgressSummary_Success() throws Exception {
        ProgressSummaryResponse response = new ProgressSummaryResponse(50, 5, 10, 2);
        when(progressService.getProgressSummary(any())).thenReturn(response);

        mockMvc.perform(get("/api/v1/progress"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.overallProgress").value(50))
                .andExpect(jsonPath("$.data.completedLessons").value(5))
                .andExpect(jsonPath("$.data.totalLessons").value(10))
                .andExpect(jsonPath("$.data.inProgressLessons").value(2));
    }

    @Test
    @DisplayName("GET /api/v1/progress/lessons thành công trả 200 và danh sách")
    void testGetLessonProgresses_Success() throws Exception {
        LessonProgressResponse l1 = new LessonProgressResponse(1L, 1, "Bài 1", 100, LearningStatus.COMPLETED, LocalDateTime.now(), LocalDateTime.now());
        when(progressService.getLessonProgresses(any())).thenReturn(List.of(l1));

        mockMvc.perform(get("/api/v1/progress/lessons"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].lessonId").value(1))
                .andExpect(jsonPath("$.data[0].lessonNumber").value(1))
                .andExpect(jsonPath("$.data[0].status").value("COMPLETED"));
    }

    @Test
    @DisplayName("GET /api/v1/progress/lessons/{lessonId} không tìm thấy trả 404")
    void testGetLessonProgress_NotFound() throws Exception {
        when(progressService.getLessonProgress(any(), eq(999L)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 999"));

        mockMvc.perform(get("/api/v1/progress/lessons/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Không tìm thấy bài học với ID: 999"));
    }

    @Test
    @DisplayName("PUT /api/v1/progress/lessons/{lessonId} thành công")
    void testUpdateLessonProgress_Success() throws Exception {
        UpdateLessonProgressRequest request = new UpdateLessonProgressRequest(80);
        LessonProgressResponse response = new LessonProgressResponse(1L, 1, "Bài 1", 80, LearningStatus.IN_PROGRESS, LocalDateTime.now(), null);

        when(progressService.updateLessonProgress(any(), eq(1L), any(UpdateLessonProgressRequest.class)))
                .thenReturn(response);

        mockMvc.perform(put("/api/v1/progress/lessons/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.progressPercent").value(80))
                .andExpect(jsonPath("$.data.status").value("IN_PROGRESS"));
    }

    @Test
    @DisplayName("7. PUT /api/v1/progress/lessons/{lessonId} validation: progressPercent > 100 trả 400")
    void testUpdateLessonProgress_Validation_PercentGreaterThan100() throws Exception {
        UpdateLessonProgressRequest request = new UpdateLessonProgressRequest(101);

        mockMvc.perform(put("/api/v1/progress/lessons/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("8. PUT /api/v1/progress/lessons/{lessonId} validation: progressPercent < 0 trả 400")
    void testUpdateLessonProgress_Validation_PercentLessThan0() throws Exception {
        UpdateLessonProgressRequest request = new UpdateLessonProgressRequest(-1);

        mockMvc.perform(put("/api/v1/progress/lessons/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("PUT /api/v1/progress/content thành công trả 200")
    void testUpdateContentProgress_Success() throws Exception {
        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.VOCABULARY, 15L, 100);
        ContentProgressResponse response = new ContentProgressResponse(ContentType.VOCABULARY, 15L, 100, LearningStatus.COMPLETED, LocalDateTime.now(), LocalDateTime.now());

        when(progressService.updateContentProgress(any(), any(UpdateContentProgressRequest.class)))
                .thenReturn(response);

        mockMvc.perform(put("/api/v1/progress/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.contentType").value("VOCABULARY"))
                .andExpect(jsonPath("$.data.progressPercent").value(100))
                .andExpect(jsonPath("$.data.status").value("COMPLETED"));
    }

    @Test
    @DisplayName("PUT /api/v1/progress/content validation: contentId <= 0 trả 400")
    void testUpdateContentProgress_Validation_InvalidContentId() throws Exception {
        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.VOCABULARY, 0L, 50);

        mockMvc.perform(put("/api/v1/progress/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("PUT /api/v1/progress/content: Content không tồn tại trả 404")
    void testUpdateContentProgress_NotFound() throws Exception {
        UpdateContentProgressRequest request = new UpdateContentProgressRequest(ContentType.VOCABULARY, 999L, 50);

        when(progressService.updateContentProgress(any(), any(UpdateContentProgressRequest.class)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy từ vựng với ID: 999"));

        mockMvc.perform(put("/api/v1/progress/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Không tìm thấy từ vựng với ID: 999"));
    }
}
