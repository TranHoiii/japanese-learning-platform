package com.japanese.learning.reading.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.controller.AdminReadingController;
import com.japanese.learning.admin.dto.AdminReadingOptionRequest;
import com.japanese.learning.admin.dto.AdminReadingOptionResponse;
import com.japanese.learning.admin.dto.AdminReadingQuestionRequest;
import com.japanese.learning.admin.dto.AdminReadingQuestionResponse;
import com.japanese.learning.admin.dto.AdminReadingRequest;
import com.japanese.learning.admin.dto.AdminReadingResponse;
import com.japanese.learning.admin.service.AdminReadingService;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.exercise.enums.QuestionType;
import com.japanese.learning.exercise.service.ExerciseService;
import com.japanese.learning.grammar.service.GrammarService;
import com.japanese.learning.kanji.service.KanjiService;
import com.japanese.learning.lesson.controller.LessonController;
import com.japanese.learning.lesson.service.LessonService;
import com.japanese.learning.listening.service.ListeningService;
import com.japanese.learning.reading.controller.ReadingController;
import com.japanese.learning.reading.dto.ReadingAnswerRequest;
import com.japanese.learning.reading.dto.ReadingContentResponse;
import com.japanese.learning.reading.dto.ReadingSubmitRequest;
import com.japanese.learning.reading.dto.ReadingSubmitResponse;
import com.japanese.learning.reading.service.ReadingService;
import com.japanese.learning.vocabulary.service.VocabularyService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {
        ReadingController.class,
        AdminReadingController.class,
        LessonController.class
})
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class ReadingSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ReadingService readingService;

    @MockitoBean
    private AdminReadingService adminReadingService;

    @MockitoBean
    private LessonService lessonService;

    @MockitoBean
    private VocabularyService vocabularyService;

    @MockitoBean
    private GrammarService grammarService;

    @MockitoBean
    private KanjiService kanjiService;

    @MockitoBean
    private ListeningService listeningService;

    @MockitoBean
    private ExerciseService exerciseService;

    // ==========================================
    // 1. LEARNER ENDPOINTS: PUBLIC ACCESS
    // ==========================================

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/readings cho phép truy cập (200)")
    void testLearner_GetReadings_Anonymous_Allows200() throws Exception {
        when(readingService.getReadingsByLessonId(anyLong())).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/readings").param("lessonId", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/readings/{id} cho phép truy cập (200)")
    void testLearner_GetReadingById_Anonymous_Allows200() throws Exception {
        ReadingContentResponse res = ReadingContentResponse.builder()
                .id(1L)
                .title("Bài đọc 1")
                .build();
        when(readingService.getReadingById(1L)).thenReturn(res);

        mockMvc.perform(get("/api/v1/readings/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: Anonymous POST /api/v1/readings/{id}/submit cho phép truy cập (200)")
    void testLearner_SubmitReading_Anonymous_Allows200() throws Exception {
        ReadingSubmitRequest req = new ReadingSubmitRequest(List.of(new ReadingAnswerRequest(101L, 201L)));
        ReadingSubmitResponse res = ReadingSubmitResponse.builder().score(100).build();

        when(readingService.submitReading(eq(1L), any(ReadingSubmitRequest.class))).thenReturn(res);

        mockMvc.perform(post("/api/v1/readings/1/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/lessons/{lessonId}/readings cho phép truy cập (200)")
    void testLearner_GetLessonReadings_Anonymous_Allows200() throws Exception {
        when(readingService.getReadingsByLessonId(10L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/readings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Learner: ROLE_USER truy cập learner endpoints thành công (200)")
    void testLearner_Endpoints_RoleUser_Allows200() throws Exception {
        when(readingService.getReadingsByLessonId(anyLong())).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/readings").param("lessonId", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        mockMvc.perform(get("/api/v1/lessons/10/readings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    // ==========================================
    // 2. ADMIN ENDPOINTS: ANONYMOUS -> 401
    // ==========================================

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/readings trả về 401")
    void testAdmin_GetReadings_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/readings"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/readings/{id} trả về 401")
    void testAdmin_GetReadingById_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/readings/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous POST /api/v1/admin/readings trả về 401")
    void testAdmin_CreateReading_Anonymous_Returns401() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(10L, "Tiêu đề", "Nội dung", null, null, 1, null);

        mockMvc.perform(post("/api/v1/admin/readings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous PUT /api/v1/admin/readings/{id} trả về 401")
    void testAdmin_UpdateReading_Anonymous_Returns401() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(10L, "Tiêu đề", "Nội dung", null, null, 1, null);

        mockMvc.perform(put("/api/v1/admin/readings/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous DELETE /api/v1/admin/readings/{id} trả về 401")
    void testAdmin_DeleteReading_Anonymous_Returns401() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/readings/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/readings/{id}/questions trả về 401")
    void testAdmin_GetQuestions_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/readings/1/questions"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous POST /api/v1/admin/readings/{id}/questions trả về 401")
    void testAdmin_CreateQuestion_Anonymous_Returns401() throws Exception {
        AdminReadingQuestionRequest req = new AdminReadingQuestionRequest("Câu hỏi?", QuestionType.MULTIPLE_CHOICE, null, null, 1, null);

        mockMvc.perform(post("/api/v1/admin/readings/1/questions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous PUT /api/v1/admin/readings/{id}/questions/{qid} trả về 401")
    void testAdmin_UpdateQuestion_Anonymous_Returns401() throws Exception {
        AdminReadingQuestionRequest req = new AdminReadingQuestionRequest("Câu hỏi?", QuestionType.MULTIPLE_CHOICE, null, null, 1, null);

        mockMvc.perform(put("/api/v1/admin/readings/1/questions/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous DELETE /api/v1/admin/readings/{id}/questions/{qid} trả về 401")
    void testAdmin_DeleteQuestion_Anonymous_Returns401() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/readings/1/questions/10"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    // ==========================================
    // 3. ADMIN ENDPOINTS: ROLE_USER -> 403
    // ==========================================

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER GET /api/v1/admin/readings trả về 403")
    void testAdmin_GetReadings_RoleUser_Returns403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/readings"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER GET /api/v1/admin/readings/{id} trả về 403")
    void testAdmin_GetReadingById_RoleUser_Returns403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/readings/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER POST /api/v1/admin/readings trả về 403")
    void testAdmin_CreateReading_RoleUser_Returns403() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(10L, "Tiêu đề", "Nội dung", null, null, 1, null);

        mockMvc.perform(post("/api/v1/admin/readings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER PUT /api/v1/admin/readings/{id} trả về 403")
    void testAdmin_UpdateReading_RoleUser_Returns403() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(10L, "Tiêu đề", "Nội dung", null, null, 1, null);

        mockMvc.perform(put("/api/v1/admin/readings/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER DELETE /api/v1/admin/readings/{id} trả về 403")
    void testAdmin_DeleteReading_RoleUser_Returns403() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/readings/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER GET /api/v1/admin/readings/{id}/questions trả về 403")
    void testAdmin_GetQuestions_RoleUser_Returns403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/readings/1/questions"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER POST /api/v1/admin/readings/{id}/questions trả về 403")
    void testAdmin_CreateQuestion_RoleUser_Returns403() throws Exception {
        AdminReadingQuestionRequest req = new AdminReadingQuestionRequest("Câu hỏi?", QuestionType.MULTIPLE_CHOICE, null, null, 1, null);

        mockMvc.perform(post("/api/v1/admin/readings/1/questions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER PUT /api/v1/admin/readings/{id}/questions/{qid} trả về 403")
    void testAdmin_UpdateQuestion_RoleUser_Returns403() throws Exception {
        AdminReadingQuestionRequest req = new AdminReadingQuestionRequest("Câu hỏi?", QuestionType.MULTIPLE_CHOICE, null, null, 1, null);

        mockMvc.perform(put("/api/v1/admin/readings/1/questions/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER DELETE /api/v1/admin/readings/{id}/questions/{qid} trả về 403")
    void testAdmin_DeleteQuestion_RoleUser_Returns403() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/readings/1/questions/10"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    // ==========================================
    // 4. ADMIN ENDPOINTS: ROLE_ADMIN -> SUCCESS
    // ==========================================

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN GET /api/v1/admin/readings trả về 200")
    void testAdmin_GetReadings_RoleAdmin_Success() throws Exception {
        when(adminReadingService.getReadings(null)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/admin/readings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN POST /api/v1/admin/readings trả về 201")
    void testAdmin_CreateReading_RoleAdmin_Success() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(10L, "Tiêu đề", "Nội dung", null, null, 1, null);
        AdminReadingResponse res = new AdminReadingResponse(1L, 10L, 1, "N5", "Tiêu đề", "Nội dung", null, null, 1, Collections.emptyList());

        when(adminReadingService.createReading(any(AdminReadingRequest.class))).thenReturn(res);

        mockMvc.perform(post("/api/v1/admin/readings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN PUT /api/v1/admin/readings/{id} trả về 200")
    void testAdmin_UpdateReading_RoleAdmin_Success() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(10L, "Tiêu đề", "Nội dung", null, null, 1, null);
        AdminReadingResponse res = new AdminReadingResponse(1L, 10L, 1, "N5", "Tiêu đề", "Nội dung", null, null, 1, Collections.emptyList());

        when(adminReadingService.updateReading(eq(1L), any(AdminReadingRequest.class))).thenReturn(res);

        mockMvc.perform(put("/api/v1/admin/readings/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN DELETE /api/v1/admin/readings/{id} trả về 200")
    void testAdmin_DeleteReading_RoleAdmin_Success() throws Exception {
        doNothing().when(adminReadingService).deleteReading(1L);

        mockMvc.perform(delete("/api/v1/admin/readings/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN POST /api/v1/admin/readings/{id}/questions trả về 201")
    void testAdmin_CreateQuestion_RoleAdmin_Success() throws Exception {
        AdminReadingQuestionRequest req = new AdminReadingQuestionRequest("Câu hỏi?", QuestionType.MULTIPLE_CHOICE, null, null, 1, null);
        AdminReadingQuestionResponse res = new AdminReadingQuestionResponse(10L, 1L, "Câu hỏi?", QuestionType.MULTIPLE_CHOICE, null, null, 1, Collections.emptyList());

        when(adminReadingService.createQuestion(eq(1L), any(AdminReadingQuestionRequest.class))).thenReturn(res);

        mockMvc.perform(post("/api/v1/admin/readings/1/questions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true));
    }
}
