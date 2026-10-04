package com.japanese.learning.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.controller.AdminKanjiController;
import com.japanese.learning.admin.controller.AdminLessonController;
import com.japanese.learning.admin.dto.AdminKanjiRequest;
import com.japanese.learning.admin.dto.AdminKanjiResponse;
import com.japanese.learning.admin.dto.AdminLessonKanjiAssignRequest;
import com.japanese.learning.admin.service.AdminKanjiService;
import com.japanese.learning.admin.service.AdminLessonService;
import com.japanese.learning.common.exception.DeleteConflictException;
import com.japanese.learning.common.exception.DuplicateResourceException;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.security.SecurityConfig;
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
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {AdminKanjiController.class, AdminLessonController.class})
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class AdminKanjiTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AdminKanjiService adminKanjiService;

    @MockitoBean
    private AdminLessonService adminLessonService;

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Create Kanji success")
    void testCreateKanji_Success() throws Exception {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "日", "Nhật", "ニチ", "ひ", "Mặt trời, ngày", 4, null, null, null
        );
        AdminKanjiResponse response = new AdminKanjiResponse(
                1L, "日", "Nhật", "ニチ", "ひ", "Mặt trời, ngày", 4, null, null, null, List.of()
        );

        when(adminKanjiService.createKanji(any(AdminKanjiRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/admin/kanjis")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.kanji").value("日"))
                .andExpect(jsonPath("$.data.hanViet").value("Nhật"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Create Kanji duplicate returns 409 Conflict")
    void testCreateKanji_Duplicate_Returns409() throws Exception {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "日", "Nhật", null, null, null, null, null, null, null
        );

        when(adminKanjiService.createKanji(any(AdminKanjiRequest.class)))
                .thenThrow(new DuplicateResourceException("Chữ Hán '日' đã tồn tại"));

        mockMvc.perform(post("/api/v1/admin/kanjis")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Chữ Hán '日' đã tồn tại"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Delete Kanji conflict returns 409")
    void testDeleteKanji_Conflict_Returns409() throws Exception {
        doThrow(new DeleteConflictException("Không thể xóa chữ Hán này vì vẫn đang được gán vào bài học"))
                .when(adminKanjiService).deleteKanji(1L);

        mockMvc.perform(delete("/api/v1/admin/kanjis/1"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Không thể xóa chữ Hán này vì vẫn đang được gán vào bài học"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Assign Kanji to Lesson success")
    void testAssignKanji_Success() throws Exception {
        AdminLessonKanjiAssignRequest request = new AdminLessonKanjiAssignRequest(1);

        doNothing().when(adminKanjiService).assignKanjiToLesson(eq(1L), eq(2L), any(AdminLessonKanjiAssignRequest.class));

        mockMvc.perform(post("/api/v1/admin/lessons/1/kanjis/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Unassign Kanji from Lesson success")
    void testUnassignKanji_Success() throws Exception {
        doNothing().when(adminKanjiService).unassignKanjiFromLesson(1L, 2L);

        mockMvc.perform(delete("/api/v1/admin/lessons/1/kanjis/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}
