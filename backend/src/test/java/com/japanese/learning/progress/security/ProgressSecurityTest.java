package com.japanese.learning.progress.security;

import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.progress.controller.ProgressController;
import com.japanese.learning.progress.service.ProgressService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ProgressController.class)
@Import(SecurityConfig.class)
class ProgressSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProgressService progressService;

    @Test
    @DisplayName("2. Unauthenticated GET /api/v1/progress trả 401 ApiResponse chuẩn")
    void testGetProgressSummary_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/progress"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Unauthenticated GET /api/v1/progress/lessons trả 401")
    void testGetLessonProgresses_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/progress/lessons"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Unauthenticated PUT /api/v1/progress/lessons/1 trả 401")
    void testUpdateLessonProgress_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(put("/api/v1/progress/lessons/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"progressPercent\": 50}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Unauthenticated GET /api/v1/progress/content trả 401")
    void testGetContentProgress_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/progress/content"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Unauthenticated PUT /api/v1/progress/content trả 401")
    void testUpdateContentProgress_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(put("/api/v1/progress/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"contentType\":\"VOCABULARY\",\"contentId\":1,\"progressPercent\":100}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }
}
