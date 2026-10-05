package com.japanese.learning.vocabulary.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.controller.AdminVocabularyController;
import com.japanese.learning.admin.dto.AdminVocabularyRequest;
import com.japanese.learning.admin.dto.AdminVocabularyResponse;
import com.japanese.learning.admin.service.AdminVocabularyService;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.exercise.service.ExerciseService;
import com.japanese.learning.grammar.service.GrammarService;
import com.japanese.learning.kanji.service.KanjiService;
import com.japanese.learning.lesson.controller.LessonController;
import com.japanese.learning.lesson.service.LessonService;
import com.japanese.learning.listening.service.ListeningService;
import com.japanese.learning.reading.service.ReadingService;
import com.japanese.learning.vocabulary.controller.VocabularyController;
import com.japanese.learning.vocabulary.dto.VocabularyResponse;
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
        VocabularyController.class,
        AdminVocabularyController.class,
        LessonController.class
})
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class VocabularySecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private VocabularyService vocabularyService;

    @MockitoBean
    private AdminVocabularyService adminVocabularyService;

    @MockitoBean
    private LessonService lessonService;

    @MockitoBean
    private GrammarService grammarService;

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
    @DisplayName("Learner: GET /api/v1/vocabularies là public không cần đăng nhập")
    void testLearner_GetAll_Public_Returns200() throws Exception {
        when(vocabularyService.getAll()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/vocabularies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: GET /api/v1/vocabularies/search là public không cần đăng nhập")
    void testLearner_Search_Public_Returns200() throws Exception {
        when(vocabularyService.search("neko")).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/vocabularies/search").param("q", "neko"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: GET /api/v1/vocabularies/{id} là public không cần đăng nhập")
    void testLearner_GetById_Public_Returns200() throws Exception {
        VocabularyResponse sample = new VocabularyResponse(
                1L, 10L, "ねこ", "猫", "Miêu", "Con mèo", "Danh từ", null, null
        );
        when(vocabularyService.getById(1L)).thenReturn(sample);

        mockMvc.perform(get("/api/v1/vocabularies/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: GET /api/v1/lessons/{lessonId}/vocabularies là public không cần đăng nhập")
    void testLearner_GetByLessonId_Public_Returns200() throws Exception {
        when(vocabularyService.getByLessonId(1L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/1/vocabularies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    // ==========================================
    // 2. ADMIN ENDPOINTS: ANONYMOUS -> 401
    // ==========================================

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/vocabularies trả về 401")
    void testAdmin_GetVocabularies_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/vocabularies"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/vocabularies/{id} trả về 401")
    void testAdmin_GetById_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/vocabularies/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous POST /api/v1/admin/vocabularies trả về 401")
    void testAdmin_Create_Anonymous_Returns401() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                1L, "ねこ", "猫", "Miêu", "Mèo", "Danh từ", null, null
        );

        mockMvc.perform(post("/api/v1/admin/vocabularies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous PUT /api/v1/admin/vocabularies/{id} trả về 401")
    void testAdmin_Update_Anonymous_Returns401() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                1L, "ねこ", "猫", "Miêu", "Mèo", "Danh từ", null, null
        );

        mockMvc.perform(put("/api/v1/admin/vocabularies/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous DELETE /api/v1/admin/vocabularies/{id} trả về 401")
    void testAdmin_Delete_Anonymous_Returns401() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/vocabularies/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    // ==========================================
    // 3. ADMIN ENDPOINTS: USER ROLE -> 403
    // ==========================================

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER GET /api/v1/admin/vocabularies trả về 403")
    void testAdmin_GetVocabularies_RoleUser_Returns403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/vocabularies"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER GET /api/v1/admin/vocabularies/{id} trả về 403")
    void testAdmin_GetById_RoleUser_Returns403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/vocabularies/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER POST /api/v1/admin/vocabularies trả về 403")
    void testAdmin_Create_RoleUser_Returns403() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                1L, "ねこ", "猫", "Miêu", "Mèo", "Danh từ", null, null
        );

        mockMvc.perform(post("/api/v1/admin/vocabularies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER PUT /api/v1/admin/vocabularies/{id} trả về 403")
    void testAdmin_Update_RoleUser_Returns403() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                1L, "ねこ", "猫", "Miêu", "Mèo", "Danh từ", null, null
        );

        mockMvc.perform(put("/api/v1/admin/vocabularies/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER DELETE /api/v1/admin/vocabularies/{id} trả về 403")
    void testAdmin_Delete_RoleUser_Returns403() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/vocabularies/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    // ==========================================
    // 4. ADMIN ENDPOINTS: ADMIN ROLE -> ALLOWED
    // ==========================================

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN GET /api/v1/admin/vocabularies thành công")
    void testAdmin_GetVocabularies_RoleAdmin_Success() throws Exception {
        when(adminVocabularyService.getVocabularies(null, null)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/admin/vocabularies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN GET /api/v1/admin/vocabularies/{id} thành công")
    void testAdmin_GetById_RoleAdmin_Success() throws Exception {
        AdminVocabularyResponse res = new AdminVocabularyResponse(
                1L, 1L, 1, "N5", "ねこ", "猫", "Miêu", "Mèo", "Danh từ", null, null
        );
        when(adminVocabularyService.getVocabularyById(1L)).thenReturn(res);

        mockMvc.perform(get("/api/v1/admin/vocabularies/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN POST /api/v1/admin/vocabularies thành công trả về 201")
    void testAdmin_Create_RoleAdmin_Success() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                1L, "ねこ", "猫", "Miêu", "Mèo", "Danh từ", null, null
        );
        AdminVocabularyResponse res = new AdminVocabularyResponse(
                1L, 1L, 1, "N5", "ねこ", "猫", "Miêu", "Mèo", "Danh từ", null, null
        );
        when(adminVocabularyService.createVocabulary(any(AdminVocabularyRequest.class))).thenReturn(res);

        mockMvc.perform(post("/api/v1/admin/vocabularies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN PUT /api/v1/admin/vocabularies/{id} thành công")
    void testAdmin_Update_RoleAdmin_Success() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                1L, "ねこ", "猫", "Miêu", "Mèo", "Danh từ", null, null
        );
        AdminVocabularyResponse res = new AdminVocabularyResponse(
                1L, 1L, 1, "N5", "ねこ", "猫", "Miêu", "Mèo", "Danh từ", null, null
        );
        when(adminVocabularyService.updateVocabulary(eq(1L), any(AdminVocabularyRequest.class))).thenReturn(res);

        mockMvc.perform(put("/api/v1/admin/vocabularies/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN DELETE /api/v1/admin/vocabularies/{id} thành công")
    void testAdmin_Delete_RoleAdmin_Success() throws Exception {
        doNothing().when(adminVocabularyService).deleteVocabulary(1L);

        mockMvc.perform(delete("/api/v1/admin/vocabularies/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}
