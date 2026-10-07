package com.japanese.learning.listening.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.controller.AdminListeningController;
import com.japanese.learning.admin.dto.AdminListeningRequest;
import com.japanese.learning.admin.dto.AdminListeningResponse;
import com.japanese.learning.admin.service.AdminListeningService;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.exercise.service.ExerciseService;
import com.japanese.learning.grammar.service.GrammarService;
import com.japanese.learning.kanji.service.KanjiService;
import com.japanese.learning.lesson.service.LessonService;
import com.japanese.learning.listening.controller.ListeningController;
import com.japanese.learning.listening.dto.ListeningContentResponse;
import com.japanese.learning.listening.dto.ListeningSubmitRequest;
import com.japanese.learning.listening.dto.ListeningSubmitResponse;
import com.japanese.learning.listening.dto.QuestionAnswerRequest;
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
        ListeningController.class,
        AdminListeningController.class
})
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class ListeningSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ListeningService listeningService;

    @MockitoBean
    private AdminListeningService adminListeningService;

    @MockitoBean
    private VocabularyService vocabularyService;

    @MockitoBean
    private GrammarService grammarService;

    @MockitoBean
    private KanjiService kanjiService;

    @MockitoBean
    private ReadingService readingService;

    @MockitoBean
    private ExerciseService exerciseService;

    @MockitoBean
    private LessonService lessonService;

    // =========================================================================
    // Learner (Public) Endpoints
    // =========================================================================

    @Test
    @DisplayName("GET /api/v1/listenings - Anonymous user can access")
    void testGetListeningsAnonymous() throws Exception {
        when(listeningService.getListeningsByLessonId(26L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/listenings?lessonId=26"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("GET /api/v1/listenings/{id} - Anonymous user can access")
    void testGetListeningByIdAnonymous() throws Exception {
        ListeningContentResponse response = ListeningContentResponse.builder()
                .id(1L)
                .lessonId(26L)
                .title("Bài 26 - Luyện nghe 1")
                .audioUrl("/audio/n4/lesson-26/listening-01.mp3")
                .questions(Collections.emptyList())
                .build();

        when(listeningService.getListeningById(1L)).thenReturn(response);

        mockMvc.perform(get("/api/v1/listenings/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Bài 26 - Luyện nghe 1"));
    }

    @Test
    @DisplayName("POST /api/v1/listenings/{id}/submit - Anonymous user can submit")
    void testSubmitListeningAnonymous() throws Exception {
        ListeningSubmitRequest request = ListeningSubmitRequest.builder()
                .answers(List.of(QuestionAnswerRequest.builder().questionId(1L).selectedOptionId(2L).build()))
                .build();

        ListeningSubmitResponse response = ListeningSubmitResponse.builder()
                .totalQuestions(1)
                .correctCount(1)
                .wrongCount(0)
                .score(100)
                .results(Collections.emptyList())
                .build();

        when(listeningService.submitListening(eq(1L), any(ListeningSubmitRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/listenings/1/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.score").value(100));
    }

    // =========================================================================
    // Admin Endpoints - Anonymous Access (401 Unauthorized)
    // =========================================================================

    @Test
    @DisplayName("GET /api/v1/admin/listenings - Anonymous receives 401")
    void testAdminGetListeningsAnonymous() throws Exception {
        mockMvc.perform(get("/api/v1/admin/listenings"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("POST /api/v1/admin/listenings - Anonymous receives 401")
    void testAdminCreateListeningAnonymous() throws Exception {
        AdminListeningRequest req = new AdminListeningRequest(26L, "Title", "audio.mp3", null, null, 1, Collections.emptyList());

        mockMvc.perform(post("/api/v1/admin/listenings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized());
    }

    // =========================================================================
    // Admin Endpoints - USER Role Access (403 Forbidden)
    // =========================================================================

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("GET /api/v1/admin/listenings - USER receives 403")
    void testAdminGetListeningsUserRole() throws Exception {
        mockMvc.perform(get("/api/v1/admin/listenings"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("POST /api/v1/admin/listenings - USER receives 403")
    void testAdminCreateListeningUserRole() throws Exception {
        AdminListeningRequest req = new AdminListeningRequest(26L, "Title", "audio.mp3", null, null, 1, Collections.emptyList());

        mockMvc.perform(post("/api/v1/admin/listenings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("DELETE /api/v1/admin/listenings/1 - USER receives 403")
    void testAdminDeleteListeningUserRole() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/listenings/1"))
                .andExpect(status().isForbidden());
    }

    // =========================================================================
    // Admin Endpoints - ADMIN Role Access (Allowed)
    // =========================================================================

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("GET /api/v1/admin/listenings - ADMIN receives 200")
    void testAdminGetListeningsAdminRole() throws Exception {
        when(adminListeningService.getListenings(null)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/admin/listenings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("POST /api/v1/admin/listenings - ADMIN receives 201")
    void testAdminCreateListeningAdminRole() throws Exception {
        AdminListeningRequest req = new AdminListeningRequest(26L, "Title", "audio.mp3", null, null, 1, Collections.emptyList());
        AdminListeningResponse resp = new AdminListeningResponse(
                1L, 26L, 26, "N4", "Title", "audio.mp3", null, null, 1, Collections.emptyList()
        );

        when(adminListeningService.createListening(any(AdminListeningRequest.class))).thenReturn(resp);

        mockMvc.perform(post("/api/v1/admin/listenings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("DELETE /api/v1/admin/listenings/1 - ADMIN receives 200")
    void testAdminDeleteListeningAdminRole() throws Exception {
        doNothing().when(adminListeningService).deleteListening(1L);

        mockMvc.perform(delete("/api/v1/admin/listenings/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}
