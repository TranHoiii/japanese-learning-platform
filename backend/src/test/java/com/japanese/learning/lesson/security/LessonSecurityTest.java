package com.japanese.learning.lesson.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.controller.AdminLessonController;
import com.japanese.learning.admin.dto.AdminLessonRequest;
import com.japanese.learning.admin.dto.AdminLessonResponse;
import com.japanese.learning.admin.service.AdminKanjiService;
import com.japanese.learning.admin.service.AdminLessonService;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.exercise.service.ExerciseService;
import com.japanese.learning.grammar.service.GrammarService;
import com.japanese.learning.kanji.service.KanjiService;
import com.japanese.learning.lesson.controller.LessonController;
import com.japanese.learning.lesson.dto.LessonResponse;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {
        LessonController.class,
        AdminLessonController.class
})
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class LessonSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

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
    private ReadingService readingService;

    @MockitoBean
    private ExerciseService exerciseService;

    @MockitoBean
    private AdminLessonService adminLessonService;

    @MockitoBean
    private AdminKanjiService adminKanjiService;

    // ============================================================
    // LEARNER ENDPOINTS: PUBLIC (no auth required)
    // ============================================================

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/lessons/{id} cho phép truy cập (200)")
    void testLearner_GetLesson_Anonymous_Allows200() throws Exception {
        when(lessonService.getById(anyLong()))
                .thenReturn(new LessonResponse(10L, 1L, 1, "Bài 01", null, 1, true));

        mockMvc.perform(get("/api/v1/lessons/10"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/lessons/{id}/vocabularies cho phép truy cập (200)")
    void testLearner_GetVocabularies_Anonymous_Allows200() throws Exception {
        when(vocabularyService.getByLessonId(anyLong())).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/vocabularies"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/lessons/{id}/grammars cho phép truy cập (200)")
    void testLearner_GetGrammars_Anonymous_Allows200() throws Exception {
        when(grammarService.getByLessonId(anyLong())).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/grammars"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/lessons/{id}/kanjis cho phép truy cập (200)")
    void testLearner_GetKanjis_Anonymous_Allows200() throws Exception {
        when(kanjiService.getKanjisByLessonId(anyLong())).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/kanjis"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/lessons/{id}/listenings cho phép truy cập (200)")
    void testLearner_GetListenings_Anonymous_Allows200() throws Exception {
        when(listeningService.getListeningsByLessonId(anyLong())).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/listenings"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/lessons/{id}/readings cho phép truy cập (200)")
    void testLearner_GetReadings_Anonymous_Allows200() throws Exception {
        when(readingService.getReadingsByLessonId(anyLong())).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/readings"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/lessons/{id}/exercises cho phép truy cập (200)")
    void testLearner_GetExercises_Anonymous_Allows200() throws Exception {
        when(exerciseService.getExercisesByLessonId(anyLong())).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/exercises"))
                .andExpect(status().isOk());
    }

    // ============================================================
    // ADMIN ENDPOINTS: ROLE_ADMIN required
    // ============================================================

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/lessons bị từ chối (401)")
    void testAdmin_GetLessons_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/lessons"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Admin: ROLE_USER GET /api/v1/admin/lessons bị từ chối (403)")
    @WithMockUser(roles = "USER")
    void testAdmin_GetLessons_User_Returns403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/lessons"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Admin: ROLE_ADMIN GET /api/v1/admin/lessons cho phép truy cập (200)")
    @WithMockUser(roles = "ADMIN")
    void testAdmin_GetLessons_Admin_Returns200() throws Exception {
        when(adminLessonService.getLessons(null)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/admin/lessons"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/lessons/{id} bị từ chối (401)")
    void testAdmin_GetLessonById_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/lessons/10"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Admin: ROLE_ADMIN GET /api/v1/admin/lessons/{id} cho phép truy cập (200)")
    @WithMockUser(roles = "ADMIN")
    void testAdmin_GetLessonById_Admin_Returns200() throws Exception {
        when(adminLessonService.getLessonById(10L))
                .thenReturn(new AdminLessonResponse(10L, 1L, "N5", 1, "Bài 01", null, 1, true));

        mockMvc.perform(get("/api/v1/admin/lessons/10"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Admin: Anonymous POST /api/v1/admin/lessons bị từ chối (401)")
    void testAdmin_CreateLesson_Anonymous_Returns401() throws Exception {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01", null, 1, true);

        mockMvc.perform(post("/api/v1/admin/lessons")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Admin: ROLE_USER POST /api/v1/admin/lessons bị từ chối (403)")
    @WithMockUser(roles = "USER")
    void testAdmin_CreateLesson_User_Returns403() throws Exception {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01", null, 1, true);

        mockMvc.perform(post("/api/v1/admin/lessons")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Admin: ROLE_ADMIN POST /api/v1/admin/lessons cho phép tạo bài học (201)")
    @WithMockUser(roles = "ADMIN")
    void testAdmin_CreateLesson_Admin_Returns201() throws Exception {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01", null, 1, true);
        when(adminLessonService.createLesson(any()))
                .thenReturn(new AdminLessonResponse(10L, 1L, "N5", 1, "Bài 01", null, 1, true));

        mockMvc.perform(post("/api/v1/admin/lessons")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Admin: Anonymous PUT /api/v1/admin/lessons/{id} bị từ chối (401)")
    void testAdmin_UpdateLesson_Anonymous_Returns401() throws Exception {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01", null, 1, true);

        mockMvc.perform(put("/api/v1/admin/lessons/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Admin: ROLE_ADMIN PUT /api/v1/admin/lessons/{id} cho phép cập nhật (200)")
    @WithMockUser(roles = "ADMIN")
    void testAdmin_UpdateLesson_Admin_Returns200() throws Exception {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01 Updated", null, 1, true);
        when(adminLessonService.updateLesson(anyLong(), any()))
                .thenReturn(new AdminLessonResponse(10L, 1L, "N5", 1, "Bài 01 Updated", null, 1, true));

        mockMvc.perform(put("/api/v1/admin/lessons/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Admin: Anonymous DELETE /api/v1/admin/lessons/{id} bị từ chối (401)")
    void testAdmin_DeleteLesson_Anonymous_Returns401() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/lessons/10"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Admin: ROLE_USER DELETE /api/v1/admin/lessons/{id} bị từ chối (403)")
    @WithMockUser(roles = "USER")
    void testAdmin_DeleteLesson_User_Returns403() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/lessons/10"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Admin: ROLE_ADMIN DELETE /api/v1/admin/lessons/{id} cho phép xóa (200)")
    @WithMockUser(roles = "ADMIN")
    void testAdmin_DeleteLesson_Admin_Returns200() throws Exception {
        doNothing().when(adminLessonService).deleteLesson(10L);

        mockMvc.perform(delete("/api/v1/admin/lessons/10"))
                .andExpect(status().isOk());
    }

    // ============================================================
    // ADMIN ENDPOINTS: Kanji assignment
    // ============================================================

    @Test
    @DisplayName("Admin: Anonymous POST /api/v1/admin/lessons/{id}/kanjis/{kanjiId} bị từ chối (401)")
    void testAdmin_AssignKanji_Anonymous_Returns401() throws Exception {
        mockMvc.perform(post("/api/v1/admin/lessons/10/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Admin: ROLE_ADMIN POST /api/v1/admin/lessons/{id}/kanjis/{kanjiId} cho phép gán (200)")
    @WithMockUser(roles = "ADMIN")
    void testAdmin_AssignKanji_Admin_Returns200() throws Exception {
        doNothing().when(adminKanjiService).assignKanjiToLesson(anyLong(), anyLong(), any());

        mockMvc.perform(post("/api/v1/admin/lessons/10/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Admin: Anonymous DELETE /api/v1/admin/lessons/{id}/kanjis/{kanjiId} bị từ chối (401)")
    void testAdmin_UnassignKanji_Anonymous_Returns401() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/lessons/10/kanjis/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Admin: ROLE_ADMIN DELETE /api/v1/admin/lessons/{id}/kanjis/{kanjiId} cho phép hủy gán (200)")
    @WithMockUser(roles = "ADMIN")
    void testAdmin_UnassignKanji_Admin_Returns200() throws Exception {
        doNothing().when(adminKanjiService).unassignKanjiFromLesson(anyLong(), anyLong());

        mockMvc.perform(delete("/api/v1/admin/lessons/10/kanjis/1"))
                .andExpect(status().isOk());
    }
}
