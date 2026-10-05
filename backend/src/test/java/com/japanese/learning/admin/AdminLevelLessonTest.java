package com.japanese.learning.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.controller.AdminLessonController;
import com.japanese.learning.admin.controller.AdminLevelController;
import com.japanese.learning.admin.dto.AdminLessonRequest;
import com.japanese.learning.admin.dto.AdminLessonResponse;
import com.japanese.learning.admin.dto.AdminLevelRequest;
import com.japanese.learning.admin.dto.AdminLevelResponse;
import com.japanese.learning.admin.service.AdminLessonService;
import com.japanese.learning.admin.service.AdminLevelService;
import com.japanese.learning.common.exception.DeleteConflictException;
import com.japanese.learning.common.exception.DuplicateResourceException;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {AdminLevelController.class, AdminLessonController.class})
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class AdminLevelLessonTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AdminLevelService adminLevelService;

    @MockitoBean
    private AdminLessonService adminLessonService;

    @MockitoBean
    private com.japanese.learning.admin.service.AdminKanjiService adminKanjiService;

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Create Level success")
    void testCreateLevel_Success() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N4", "Cấp độ N4", "Mô tả", 2, true);
        AdminLevelResponse response = new AdminLevelResponse(2L, "N4", "Cấp độ N4", "Mô tả", 2, true);

        when(adminLevelService.createLevel(any(AdminLevelRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.code").value("N4"))
                .andExpect(jsonPath("$.data.name").value("Cấp độ N4"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Create Level duplicate code returns 409 Conflict")
    void testCreateLevel_DuplicateCode_Returns409() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N5", "Cấp độ N5", null, 1, true);

        when(adminLevelService.createLevel(any(AdminLevelRequest.class)))
                .thenThrow(new DuplicateResourceException("Mã cấp độ 'N5' đã tồn tại"));

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Mã cấp độ 'N5' đã tồn tại"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Delete Level conflict returns 409")
    void testDeleteLevel_Conflict_Returns409() throws Exception {
        doThrow(new DeleteConflictException("Không thể xóa cấp độ này vì vẫn còn bài học liên kết"))
                .when(adminLevelService).deleteLevel(1L);

        mockMvc.perform(delete("/api/v1/admin/levels/1"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Không thể xóa cấp độ này vì vẫn còn bài học liên kết"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Create Lesson duplicate number in level returns 409 Conflict")
    void testCreateLesson_Duplicate_Returns409() throws Exception {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 1", "Mô tả", 1, true);

        when(adminLessonService.createLesson(any(AdminLessonRequest.class)))
                .thenThrow(new DuplicateResourceException("Bài học số 1 đã tồn tại trong cấp độ này"));

        mockMvc.perform(post("/api/v1/admin/lessons")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bài học số 1 đã tồn tại trong cấp độ này"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Delete Lesson conflict returns 409")
    void testDeleteLesson_Conflict_Returns409() throws Exception {
        doThrow(new DeleteConflictException("Không thể xóa bài học này vì vẫn còn nội dung liên kết"))
                .when(adminLessonService).deleteLesson(1L);

        mockMvc.perform(delete("/api/v1/admin/lessons/1"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Không thể xóa bài học này vì vẫn còn nội dung liên kết"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Delete Lesson success returns 200")
    void testDeleteLesson_Success() throws Exception {
        doNothing().when(adminLessonService).deleteLesson(1L);

        mockMvc.perform(delete("/api/v1/admin/lessons/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}
