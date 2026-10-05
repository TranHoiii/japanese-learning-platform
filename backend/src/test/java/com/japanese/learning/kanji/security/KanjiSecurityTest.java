package com.japanese.learning.kanji.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.controller.AdminKanjiController;
import com.japanese.learning.admin.controller.AdminLessonController;
import com.japanese.learning.admin.dto.AdminKanjiRequest;
import com.japanese.learning.admin.dto.AdminKanjiResponse;
import com.japanese.learning.admin.dto.AdminLessonKanjiAssignRequest;
import com.japanese.learning.admin.service.AdminKanjiService;
import com.japanese.learning.admin.service.AdminLessonService;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.exercise.service.ExerciseService;
import com.japanese.learning.grammar.service.GrammarService;
import com.japanese.learning.kanji.controller.KanjiController;
import com.japanese.learning.kanji.dto.KanjiCompoundResponse;
import com.japanese.learning.kanji.dto.KanjiResponse;
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
import org.springframework.data.domain.PageImpl;
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
        KanjiController.class,
        AdminKanjiController.class,
        AdminLessonController.class,
        LessonController.class
})
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class KanjiSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private KanjiService kanjiService;

    @MockitoBean
    private AdminKanjiService adminKanjiService;

    @MockitoBean
    private AdminLessonService adminLessonService;

    @MockitoBean
    private LessonService lessonService;

    @MockitoBean
    private VocabularyService vocabularyService;

    @MockitoBean
    private GrammarService grammarService;

    @MockitoBean
    private ListeningService listeningService;

    @MockitoBean
    private ReadingService readingService;

    @MockitoBean
    private ExerciseService exerciseService;

    private final KanjiResponse sampleLearnerKanji = new KanjiResponse(
            1L, "日", "NHẬT", "ニチ", "ひ", "Mặt trời", 4, null, null, null, Collections.emptyList()
    );

    private final AdminKanjiResponse sampleAdminKanji = new AdminKanjiResponse(
            1L, "日", "NHẬT", "ニチ", "ひ", "Mặt trời", 4, null, null, null, List.of()
    );

    // ==========================================
    // 1. LEARNER ENDPOINTS: PUBLIC ACCESS
    // ==========================================

    @Test
    @DisplayName("Learner: GET /api/v1/kanjis là public")
    void testLearner_GetAllKanjis_Public_Returns200() throws Exception {
        when(kanjiService.getAllKanjis(any())).thenReturn(new PageImpl<>(Collections.emptyList()));

        mockMvc.perform(get("/api/v1/kanjis"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: GET /api/v1/kanjis/search là public")
    void testLearner_SearchKanjis_Public_Returns200() throws Exception {
        when(kanjiService.searchKanjis(eq("日"), any())).thenReturn(new PageImpl<>(Collections.emptyList()));

        mockMvc.perform(get("/api/v1/kanjis/search").param("q", "日"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: GET /api/v1/kanjis/search thiếu tham số bắt buộc q trả về 400 Bad Request theo ApiResponse")
    void testLearner_SearchKanjis_MissingQuery_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/kanjis/search"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Thiếu tham số request: q"));
    }

    @Test
    @DisplayName("Learner: GET /api/v1/kanjis/{id} là public")
    void testLearner_GetKanjiById_Public_Returns200() throws Exception {
        when(kanjiService.getKanjiById(1L)).thenReturn(sampleLearnerKanji);

        mockMvc.perform(get("/api/v1/kanjis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: GET /api/v1/kanjis/{kanjiId}/compounds là public")
    void testLearner_GetCompounds_Public_Returns200() throws Exception {
        when(kanjiService.getCompoundsByKanjiId(1L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/kanjis/1/compounds"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Learner: GET /api/v1/lessons/{lessonId}/kanjis là public")
    void testLearner_GetKanjisByLessonId_Public_Returns200() throws Exception {
        when(kanjiService.getKanjisByLessonId(1L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/1/kanjis"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    // ==========================================
    // 2. ADMIN ENDPOINTS: ANONYMOUS -> 401
    // ==========================================

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/kanjis trả về 401")
    void testAdmin_GetAll_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/kanjis"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/kanjis/{id} trả về 401")
    void testAdmin_GetById_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/kanjis/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous POST /api/v1/admin/kanjis trả về 401")
    void testAdmin_Create_Anonymous_Returns401() throws Exception {
        AdminKanjiRequest req = new AdminKanjiRequest("日", null, null, null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/kanjis")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous PUT /api/v1/admin/kanjis/{id} trả về 401")
    void testAdmin_Update_Anonymous_Returns401() throws Exception {
        AdminKanjiRequest req = new AdminKanjiRequest("日", null, null, null, null, null, null, null, null);

        mockMvc.perform(put("/api/v1/admin/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous DELETE /api/v1/admin/kanjis/{id} trả về 401")
    void testAdmin_Delete_Anonymous_Returns401() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/kanjis/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous POST /api/v1/admin/lessons/{lessonId}/kanjis/{kanjiId} trả về 401")
    void testAdmin_Assign_Anonymous_Returns401() throws Exception {
        mockMvc.perform(post("/api/v1/admin/lessons/1/kanjis/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Admin: Anonymous DELETE /api/v1/admin/lessons/{lessonId}/kanjis/{kanjiId} trả về 401")
    void testAdmin_Unassign_Anonymous_Returns401() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/lessons/1/kanjis/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    // ==========================================
    // 3. ADMIN ENDPOINTS: ROLE_USER -> 403
    // ==========================================

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER GET /api/v1/admin/kanjis trả về 403")
    void testAdmin_GetAll_RoleUser_Returns403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/kanjis"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER GET /api/v1/admin/kanjis/{id} trả về 403")
    void testAdmin_GetById_RoleUser_Returns403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/kanjis/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER POST /api/v1/admin/kanjis trả về 403")
    void testAdmin_Create_RoleUser_Returns403() throws Exception {
        AdminKanjiRequest req = new AdminKanjiRequest("日", null, null, null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/kanjis")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER PUT /api/v1/admin/kanjis/{id} trả về 403")
    void testAdmin_Update_RoleUser_Returns403() throws Exception {
        AdminKanjiRequest req = new AdminKanjiRequest("日", null, null, null, null, null, null, null, null);

        mockMvc.perform(put("/api/v1/admin/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER DELETE /api/v1/admin/kanjis/{id} trả về 403")
    void testAdmin_Delete_RoleUser_Returns403() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/kanjis/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER POST assign trả về 403")
    void testAdmin_Assign_RoleUser_Returns403() throws Exception {
        mockMvc.perform(post("/api/v1/admin/lessons/1/kanjis/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Admin: ROLE_USER DELETE unassign trả về 403")
    void testAdmin_Unassign_RoleUser_Returns403() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/lessons/1/kanjis/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    // ==========================================
    // 4. ADMIN ENDPOINTS: ROLE_ADMIN -> ALLOWED
    // ==========================================

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN GET /api/v1/admin/kanjis thành công")
    void testAdmin_GetAll_RoleAdmin_Success() throws Exception {
        when(adminKanjiService.getAllKanjis()).thenReturn(List.of(sampleAdminKanji));

        mockMvc.perform(get("/api/v1/admin/kanjis"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN GET /api/v1/admin/kanjis/{id} thành công")
    void testAdmin_GetById_RoleAdmin_Success() throws Exception {
        when(adminKanjiService.getKanjiById(1L)).thenReturn(sampleAdminKanji);

        mockMvc.perform(get("/api/v1/admin/kanjis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN POST /api/v1/admin/kanjis thành công trả về 201")
    void testAdmin_Create_RoleAdmin_Success() throws Exception {
        AdminKanjiRequest req = new AdminKanjiRequest("日", null, null, null, null, null, null, null, null);
        when(adminKanjiService.createKanji(any(AdminKanjiRequest.class))).thenReturn(sampleAdminKanji);

        mockMvc.perform(post("/api/v1/admin/kanjis")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN PUT /api/v1/admin/kanjis/{id} thành công")
    void testAdmin_Update_RoleAdmin_Success() throws Exception {
        AdminKanjiRequest req = new AdminKanjiRequest("日", null, null, null, null, null, null, null, null);
        when(adminKanjiService.updateKanji(eq(1L), any(AdminKanjiRequest.class))).thenReturn(sampleAdminKanji);

        mockMvc.perform(put("/api/v1/admin/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN DELETE /api/v1/admin/kanjis/{id} thành công")
    void testAdmin_Delete_RoleAdmin_Success() throws Exception {
        doNothing().when(adminKanjiService).deleteKanji(1L);

        mockMvc.perform(delete("/api/v1/admin/kanjis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN POST assign thành công")
    void testAdmin_Assign_RoleAdmin_Success() throws Exception {
        doNothing().when(adminKanjiService).assignKanjiToLesson(eq(1L), eq(1L), any());

        mockMvc.perform(post("/api/v1/admin/lessons/1/kanjis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: ROLE_ADMIN DELETE unassign thành công")
    void testAdmin_Unassign_RoleAdmin_Success() throws Exception {
        doNothing().when(adminKanjiService).unassignKanjiFromLesson(1L, 1L);

        mockMvc.perform(delete("/api/v1/admin/lessons/1/kanjis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}
