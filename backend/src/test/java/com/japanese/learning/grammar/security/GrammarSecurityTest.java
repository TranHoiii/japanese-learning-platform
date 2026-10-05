package com.japanese.learning.grammar.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.controller.AdminGrammarController;
import com.japanese.learning.admin.dto.AdminGrammarExampleRequest;
import com.japanese.learning.admin.dto.AdminGrammarExampleResponse;
import com.japanese.learning.admin.dto.AdminGrammarRequest;
import com.japanese.learning.admin.dto.AdminGrammarResponse;
import com.japanese.learning.admin.service.AdminGrammarService;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.exercise.service.ExerciseService;
import com.japanese.learning.grammar.controller.GrammarController;
import com.japanese.learning.grammar.dto.GrammarResponse;
import com.japanese.learning.grammar.service.GrammarService;
import com.japanese.learning.kanji.service.KanjiService;
import com.japanese.learning.lesson.controller.LessonController;
import com.japanese.learning.lesson.service.LessonService;
import com.japanese.learning.listening.service.ListeningService;
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
        GrammarController.class,
        AdminGrammarController.class,
        LessonController.class
})
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class GrammarSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private GrammarService grammarService;

    @MockitoBean
    private AdminGrammarService adminGrammarService;

    @MockitoBean
    private LessonService lessonService;

    @MockitoBean
    private VocabularyService vocabularyService;

    @MockitoBean
    private KanjiService kanjiService;

    @MockitoBean
    private ListeningService listeningService;

    @MockitoBean
    private ReadingService readingService;

    @MockitoBean
    private ExerciseService exerciseService;

    // ==========================================
    // 1. LEARNER ENDPOINTS: PUBLIC ACCESS
    // ==========================================

    @Test
    @DisplayName("Learner: GET /api/v1/grammars là public")
    void testLearner_GetGrammars_Public_Returns200() throws Exception {
        when(grammarService.getByLessonId(1L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/grammars").param("lessonId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: GET /api/v1/grammars/{id} là public")
    void testLearner_GetById_Public_Returns200() throws Exception {
        GrammarResponse res = new GrammarResponse(
                1L, 1L, "～は～です", "Là", null, null, null, 1, Collections.emptyList()
        );
        when(grammarService.getById(1L)).thenReturn(res);

        mockMvc.perform(get("/api/v1/grammars/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: GET /api/v1/grammars/{id}/examples là public")
    void testLearner_GetExamples_Public_Returns200() throws Exception {
        when(grammarService.getExamplesByGrammarId(1L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/grammars/1/examples"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: GET /api/v1/lessons/{lessonId}/grammars là public")
    void testLearner_GetByLessonId_Public_Returns200() throws Exception {
        when(grammarService.getByLessonId(1L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/1/grammars"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    // ==========================================
    // 2. ADMIN ENDPOINTS: ANONYMOUS -> 401
    // ==========================================

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/grammars trả về 401")
    void testAdmin_GetGrammars_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/grammars"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/grammars/{id} trả về 401")
    void testAdmin_GetById_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/grammars/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous POST /api/v1/admin/grammars trả về 401")
    void testAdmin_Create_Anonymous_Returns401() throws Exception {
        AdminGrammarRequest req = new AdminGrammarRequest(1L, "～も", null, null, null, null, 1, null);

        mockMvc.perform(post("/api/v1/admin/grammars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous PUT /api/v1/admin/grammars/{id} trả về 401")
    void testAdmin_Update_Anonymous_Returns401() throws Exception {
        AdminGrammarRequest req = new AdminGrammarRequest(1L, "～も", null, null, null, null, 1, null);

        mockMvc.perform(put("/api/v1/admin/grammars/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous DELETE /api/v1/admin/grammars/{id} trả về 401")
    void testAdmin_Delete_Anonymous_Returns401() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/grammars/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous GET examples trả về 401")
    void testAdmin_GetExamples_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/grammars/1/examples"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous POST example trả về 401")
    void testAdmin_CreateExample_Anonymous_Returns401() throws Exception {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest("テスト", null, null, null, 1);

        mockMvc.perform(post("/api/v1/admin/grammars/1/examples")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous PUT example trả về 401")
    void testAdmin_UpdateExample_Anonymous_Returns401() throws Exception {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest("テスト", null, null, null, 1);

        mockMvc.perform(put("/api/v1/admin/grammars/1/examples/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous DELETE example trả về 401")
    void testAdmin_DeleteExample_Anonymous_Returns401() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/grammars/1/examples/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    // ==========================================
    // 3. ADMIN ENDPOINTS: USER ROLE -> 403
    // ==========================================

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER GET grammars trả về 403")
    void testAdmin_GetGrammars_RoleUser_Returns403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/grammars"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER POST grammar trả về 403")
    void testAdmin_Create_RoleUser_Returns403() throws Exception {
        AdminGrammarRequest req = new AdminGrammarRequest(1L, "～も", null, null, null, null, 1, null);

        mockMvc.perform(post("/api/v1/admin/grammars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER PUT grammar trả về 403")
    void testAdmin_Update_RoleUser_Returns403() throws Exception {
        AdminGrammarRequest req = new AdminGrammarRequest(1L, "～も", null, null, null, null, 1, null);

        mockMvc.perform(put("/api/v1/admin/grammars/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER DELETE grammar trả về 403")
    void testAdmin_Delete_RoleUser_Returns403() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/grammars/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER POST example trả về 403")
    void testAdmin_CreateExample_RoleUser_Returns403() throws Exception {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest("テスト", null, null, null, 1);

        mockMvc.perform(post("/api/v1/admin/grammars/1/examples")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER PUT example trả về 403")
    void testAdmin_UpdateExample_RoleUser_Returns403() throws Exception {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest("テスト", null, null, null, 1);

        mockMvc.perform(put("/api/v1/admin/grammars/1/examples/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER DELETE example trả về 403")
    void testAdmin_DeleteExample_RoleUser_Returns403() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/grammars/1/examples/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    // ==========================================
    // 4. ADMIN ENDPOINTS: ADMIN ROLE -> ALLOWED
    // ==========================================

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN GET grammars thành công")
    void testAdmin_GetGrammars_RoleAdmin_Success() throws Exception {
        when(adminGrammarService.getGrammars(null, null)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/admin/grammars"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN GET grammar by ID thành công")
    void testAdmin_GetById_RoleAdmin_Success() throws Exception {
        AdminGrammarResponse res = new AdminGrammarResponse(
                1L, 1L, 1, "N5", "～も", null, null, null, null, 1, Collections.emptyList()
        );
        when(adminGrammarService.getGrammarById(1L)).thenReturn(res);

        mockMvc.perform(get("/api/v1/admin/grammars/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN POST grammar thành công trả về 201")
    void testAdmin_Create_RoleAdmin_Success() throws Exception {
        AdminGrammarRequest req = new AdminGrammarRequest(1L, "～も", null, null, null, null, 1, null);
        AdminGrammarResponse res = new AdminGrammarResponse(
                1L, 1L, 1, "N5", "～も", null, null, null, null, 1, Collections.emptyList()
        );
        when(adminGrammarService.createGrammar(any(AdminGrammarRequest.class))).thenReturn(res);

        mockMvc.perform(post("/api/v1/admin/grammars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN PUT grammar thành công")
    void testAdmin_Update_RoleAdmin_Success() throws Exception {
        AdminGrammarRequest req = new AdminGrammarRequest(1L, "～も", null, null, null, null, 1, null);
        AdminGrammarResponse res = new AdminGrammarResponse(
                1L, 1L, 1, "N5", "～も", null, null, null, null, 1, Collections.emptyList()
        );
        when(adminGrammarService.updateGrammar(eq(1L), any(AdminGrammarRequest.class))).thenReturn(res);

        mockMvc.perform(put("/api/v1/admin/grammars/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN DELETE grammar thành công")
    void testAdmin_Delete_RoleAdmin_Success() throws Exception {
        doNothing().when(adminGrammarService).deleteGrammar(1L);

        mockMvc.perform(delete("/api/v1/admin/grammars/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN GET examples thành công")
    void testAdmin_GetExamples_RoleAdmin_Success() throws Exception {
        when(adminGrammarService.getExamples(1L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/admin/grammars/1/examples"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN POST example thành công trả về 201")
    void testAdmin_CreateExample_RoleAdmin_Success() throws Exception {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest("テスト", null, null, null, 1);
        AdminGrammarExampleResponse res = new AdminGrammarExampleResponse(10L, 1L, "テスト", null, null, null, 1);
        when(adminGrammarService.createExample(eq(1L), any(AdminGrammarExampleRequest.class))).thenReturn(res);

        mockMvc.perform(post("/api/v1/admin/grammars/1/examples")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN PUT example thành công")
    void testAdmin_UpdateExample_RoleAdmin_Success() throws Exception {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest("テスト", null, null, null, 1);
        AdminGrammarExampleResponse res = new AdminGrammarExampleResponse(10L, 1L, "テスト", null, null, null, 1);
        when(adminGrammarService.updateExample(eq(1L), eq(10L), any(AdminGrammarExampleRequest.class))).thenReturn(res);

        mockMvc.perform(put("/api/v1/admin/grammars/1/examples/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN DELETE example thành công")
    void testAdmin_DeleteExample_RoleAdmin_Success() throws Exception {
        doNothing().when(adminGrammarService).deleteExample(1L, 10L);

        mockMvc.perform(delete("/api/v1/admin/grammars/1/examples/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}
