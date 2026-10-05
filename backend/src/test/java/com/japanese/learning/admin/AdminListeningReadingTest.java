package com.japanese.learning.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.controller.AdminListeningController;
import com.japanese.learning.admin.controller.AdminReadingController;
import com.japanese.learning.admin.dto.AdminListeningOptionRequest;
import com.japanese.learning.admin.dto.AdminListeningOptionResponse;
import com.japanese.learning.admin.dto.AdminListeningQuestionRequest;
import com.japanese.learning.admin.dto.AdminListeningQuestionResponse;
import com.japanese.learning.admin.dto.AdminListeningRequest;
import com.japanese.learning.admin.dto.AdminListeningResponse;
import com.japanese.learning.admin.dto.AdminReadingOptionRequest;
import com.japanese.learning.admin.dto.AdminReadingOptionResponse;
import com.japanese.learning.admin.dto.AdminReadingQuestionRequest;
import com.japanese.learning.admin.dto.AdminReadingQuestionResponse;
import com.japanese.learning.admin.dto.AdminReadingRequest;
import com.japanese.learning.admin.dto.AdminReadingResponse;
import com.japanese.learning.admin.service.AdminListeningService;
import com.japanese.learning.admin.service.AdminReadingService;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.exercise.enums.QuestionType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {AdminListeningController.class, AdminReadingController.class})
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class AdminListeningReadingTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AdminListeningService adminListeningService;

    @MockitoBean
    private AdminReadingService adminReadingService;

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Create Listening with nested questions and options (with correct answers)")
    void testCreateListening_Success() throws Exception {
        AdminListeningOptionRequest opt1 = new AdminListeningOptionRequest("Đáp án A", false, 1);
        AdminListeningOptionRequest opt2 = new AdminListeningOptionRequest("Đáp án B", true, 2);
        AdminListeningQuestionRequest qReq = new AdminListeningQuestionRequest(
                "Người nói đi đâu?", QuestionType.MULTIPLE_CHOICE, "Giải thích", 1, List.of(opt1, opt2)
        );
        AdminListeningRequest req = new AdminListeningRequest(
                1L, "Bài nghe 1", "audio1.mp3", "Transcript...", "Mô tả", 1, List.of(qReq)
        );

        AdminListeningOptionResponse optRes1 = new AdminListeningOptionResponse(1L, 10L, "Đáp án A", false, 1);
        AdminListeningOptionResponse optRes2 = new AdminListeningOptionResponse(2L, 10L, "Đáp án B", true, 2);
        AdminListeningQuestionResponse qRes = new AdminListeningQuestionResponse(
                10L, 5L, "Người nói đi đâu?", QuestionType.MULTIPLE_CHOICE, "Giải thích", 1, List.of(optRes1, optRes2)
        );
        AdminListeningResponse res = new AdminListeningResponse(
                5L, 1L, 1, "N5", "Bài nghe 1", "audio1.mp3", "Transcript...", "Mô tả", 1, List.of(qRes)
        );

        when(adminListeningService.createListening(any(AdminListeningRequest.class))).thenReturn(res);

        mockMvc.perform(post("/api/v1/admin/listenings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Bài nghe 1"))
                .andExpect(jsonPath("$.data.questions[0].options[1].correct").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Create Reading with nested questions and options")
    void testCreateReading_Success() throws Exception {
        AdminReadingOptionRequest opt = new AdminReadingOptionRequest("Đúng", true, 1);
        AdminReadingQuestionRequest qReq = new AdminReadingQuestionRequest(
                "Nội dung đúng?", QuestionType.MULTIPLE_CHOICE, "Giải thích", null, 1, List.of(opt)
        );
        AdminReadingRequest req = new AdminReadingRequest(
                1L, "Bài đọc 1", "Nội dung...", "Bản dịch...", "image.jpg", 1, List.of(qReq)
        );

        AdminReadingOptionResponse optRes = new AdminReadingOptionResponse(1L, 20L, "Đúng", true, 1);
        AdminReadingQuestionResponse qRes = new AdminReadingQuestionResponse(
                20L, 8L, "Nội dung đúng?", QuestionType.MULTIPLE_CHOICE, "Giải thích", null, 1, List.of(optRes)
        );
        AdminReadingResponse res = new AdminReadingResponse(
                8L, 1L, 1, "N5", "Bài đọc 1", "Nội dung...", "Bản dịch...", "image.jpg", 1, List.of(qRes)
        );

        when(adminReadingService.createReading(any(AdminReadingRequest.class))).thenReturn(res);

        mockMvc.perform(post("/api/v1/admin/readings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.imageUrl").value("image.jpg"))
                .andExpect(jsonPath("$.data.questions[0].options[0].correct").value(true));
    }
}
