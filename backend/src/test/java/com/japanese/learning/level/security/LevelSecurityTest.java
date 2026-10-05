package com.japanese.learning.level.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.controller.AdminLevelController;
import com.japanese.learning.admin.dto.AdminLevelRequest;
import com.japanese.learning.admin.dto.AdminLevelResponse;
import com.japanese.learning.admin.service.AdminLevelService;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.lesson.service.LessonService;
import com.japanese.learning.level.controller.LevelController;
import com.japanese.learning.level.dto.LevelResponse;
import com.japanese.learning.level.service.LevelService;
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
        LevelController.class,
        AdminLevelController.class
})
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class LevelSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private LevelService levelService;

    @MockitoBean
    private LessonService lessonService;

    @MockitoBean
    private AdminLevelService adminLevelService;

    // ============================================================
    // LEARNER ENDPOINTS: PUBLIC (Anonymous / No auth required)
    // ============================================================

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/levels cho phép truy cập (200)")
    void testLearner_GetAllLevels_Anonymous_Allows200() throws Exception {
        when(levelService.getAllActiveLevels()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/levels"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/levels/{id} cho phép truy cập (200)")
    void testLearner_GetLevelById_Anonymous_Allows200() throws Exception {
        when(levelService.getById(anyLong()))
                .thenReturn(new LevelResponse(1L, "N5", "Cấp độ N5", null, 1, true));

        mockMvc.perform(get("/api/v1/levels/1"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Learner: Anonymous GET /api/v1/levels/{levelId}/lessons cho phép truy cập (200)")
    void testLearner_GetLessonsByLevelId_Anonymous_Allows200() throws Exception {
        when(lessonService.getLessonsByLevelId(anyLong())).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/levels/1/lessons"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Learner: Authenticated USER GET /api/v1/levels cho phép truy cập (200)")
    @WithMockUser(roles = "USER")
    void testLearner_GetAllLevels_User_Allows200() throws Exception {
        when(levelService.getAllActiveLevels()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/levels"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Learner: Authenticated USER GET /api/v1/levels/{id} cho phép truy cập (200)")
    @WithMockUser(roles = "USER")
    void testLearner_GetLevelById_User_Allows200() throws Exception {
        when(levelService.getById(anyLong()))
                .thenReturn(new LevelResponse(1L, "N5", "Cấp độ N5", null, 1, true));

        mockMvc.perform(get("/api/v1/levels/1"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Learner: Authenticated USER GET /api/v1/levels/{levelId}/lessons cho phép truy cập (200)")
    @WithMockUser(roles = "USER")
    void testLearner_GetLessonsByLevelId_User_Allows200() throws Exception {
        when(lessonService.getLessonsByLevelId(anyLong())).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/levels/1/lessons"))
                .andExpect(status().isOk());
    }

    // ============================================================
    // ADMIN ENDPOINTS: Anonymous (401 Unauthorized)
    // ============================================================

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/levels bị từ chối (401)")
    void testAdmin_GetAllLevels_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/levels"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Admin: Anonymous GET /api/v1/admin/levels/{id} bị từ chối (401)")
    void testAdmin_GetLevelById_Anonymous_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/levels/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Admin: Anonymous POST /api/v1/admin/levels bị từ chối (401)")
    void testAdmin_CreateLevel_Anonymous_Returns401() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N5", "Cấp độ N5", null, 1, true);

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Admin: Anonymous PUT /api/v1/admin/levels/{id} bị từ chối (401)")
    void testAdmin_UpdateLevel_Anonymous_Returns401() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N5", "Cấp độ N5", null, 1, true);

        mockMvc.perform(put("/api/v1/admin/levels/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Admin: Anonymous DELETE /api/v1/admin/levels/{id} bị từ chối (401)")
    void testAdmin_DeleteLevel_Anonymous_Returns401() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/levels/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    // ============================================================
    // ADMIN ENDPOINTS: Authenticated USER (403 Forbidden)
    // ============================================================

    @Test
    @DisplayName("Admin: ROLE_USER GET /api/v1/admin/levels bị từ chối (403)")
    @WithMockUser(roles = "USER")
    void testAdmin_GetAllLevels_User_Returns403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/levels"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Admin: ROLE_USER GET /api/v1/admin/levels/{id} bị từ chối (403)")
    @WithMockUser(roles = "USER")
    void testAdmin_GetLevelById_User_Returns403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/levels/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Admin: ROLE_USER POST /api/v1/admin/levels bị từ chối (403)")
    @WithMockUser(roles = "USER")
    void testAdmin_CreateLevel_User_Returns403() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N5", "Cấp độ N5", null, 1, true);

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Admin: ROLE_USER PUT /api/v1/admin/levels/{id} bị từ chối (403)")
    @WithMockUser(roles = "USER")
    void testAdmin_UpdateLevel_User_Returns403() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N5", "Cấp độ N5", null, 1, true);

        mockMvc.perform(put("/api/v1/admin/levels/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Admin: ROLE_USER DELETE /api/v1/admin/levels/{id} bị từ chối (403)")
    @WithMockUser(roles = "USER")
    void testAdmin_DeleteLevel_User_Returns403() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/levels/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false));
    }

    // ============================================================
    // ADMIN ENDPOINTS: Authenticated ADMIN (Allowed)
    // ============================================================

    @Test
    @DisplayName("Admin: ROLE_ADMIN GET /api/v1/admin/levels được phép truy cập (200)")
    @WithMockUser(roles = "ADMIN")
    void testAdmin_GetAllLevels_Admin_Allows200() throws Exception {
        when(adminLevelService.getAllLevels()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/admin/levels"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Admin: ROLE_ADMIN GET /api/v1/admin/levels/{id} được phép truy cập (200)")
    @WithMockUser(roles = "ADMIN")
    void testAdmin_GetLevelById_Admin_Allows200() throws Exception {
        when(adminLevelService.getLevelById(anyLong()))
                .thenReturn(new AdminLevelResponse(1L, "N5", "Cấp độ N5", null, 1, true));

        mockMvc.perform(get("/api/v1/admin/levels/1"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Admin: ROLE_ADMIN POST /api/v1/admin/levels cho phép tạo mới (201)")
    @WithMockUser(roles = "ADMIN")
    void testAdmin_CreateLevel_Admin_Allows201() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N5", "Cấp độ N5", null, 1, true);
        when(adminLevelService.createLevel(any(AdminLevelRequest.class)))
                .thenReturn(new AdminLevelResponse(1L, "N5", "Cấp độ N5", null, 1, true));

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Admin: ROLE_ADMIN PUT /api/v1/admin/levels/{id} cho phép cập nhật (200)")
    @WithMockUser(roles = "ADMIN")
    void testAdmin_UpdateLevel_Admin_Allows200() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N5", "Cấp độ N5", null, 1, true);
        when(adminLevelService.updateLevel(eq(1L), any(AdminLevelRequest.class)))
                .thenReturn(new AdminLevelResponse(1L, "N5", "Cấp độ N5", null, 1, true));

        mockMvc.perform(put("/api/v1/admin/levels/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Admin: ROLE_ADMIN DELETE /api/v1/admin/levels/{id} cho phép xóa (200)")
    @WithMockUser(roles = "ADMIN")
    void testAdmin_DeleteLevel_Admin_Allows200() throws Exception {
        doNothing().when(adminLevelService).deleteLevel(1L);

        mockMvc.perform(delete("/api/v1/admin/levels/1"))
                .andExpect(status().isOk());
    }
}
