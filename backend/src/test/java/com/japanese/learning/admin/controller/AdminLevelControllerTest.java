package com.japanese.learning.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.dto.AdminLevelRequest;
import com.japanese.learning.admin.dto.AdminLevelResponse;
import com.japanese.learning.admin.service.AdminLevelService;
import com.japanese.learning.common.exception.DeleteConflictException;
import com.japanese.learning.common.exception.DuplicateResourceException;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class AdminLevelControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private AdminLevelService adminLevelService;

    @InjectMocks
    private AdminLevelController adminLevelController;

    private AdminLevelResponse sampleLevel;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(adminLevelController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        sampleLevel = new AdminLevelResponse(1L, "N5", "Cấp độ N5", "Sơ cấp 1", 1, true);
    }

    // ==================================================================
    // GET /api/v1/admin/levels
    // ==================================================================

    @Test
    @DisplayName("Admin GET /api/v1/admin/levels: Lấy tất cả cấp độ thành công")
    void testGetAllLevels_Success() throws Exception {
        when(adminLevelService.getAllLevels()).thenReturn(List.of(sampleLevel));

        mockMvc.perform(get("/api/v1/admin/levels"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách cấp độ thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].code", is("N5")))
                .andExpect(jsonPath("$.data[0].name", is("Cấp độ N5")))
                .andExpect(jsonPath("$.data[0].description", is("Sơ cấp 1")))
                .andExpect(jsonPath("$.data[0].sortOrder", is(1)))
                .andExpect(jsonPath("$.data[0].isActive", is(true)));

        verify(adminLevelService).getAllLevels();
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/levels: Trả về danh sách rỗng khi không có dữ liệu")
    void testGetAllLevels_Empty() throws Exception {
        when(adminLevelService.getAllLevels()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/admin/levels"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(0)));

        verify(adminLevelService).getAllLevels();
    }

    // ==================================================================
    // GET /api/v1/admin/levels/{id}
    // ==================================================================

    @Test
    @DisplayName("Admin GET /api/v1/admin/levels/1: Lấy chi tiết cấp độ theo ID thành công")
    void testGetLevelById_Success() throws Exception {
        when(adminLevelService.getLevelById(1L)).thenReturn(sampleLevel);

        mockMvc.perform(get("/api/v1/admin/levels/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy thông tin cấp độ thành công")))
                .andExpect(jsonPath("$.data.id", is(1)))
                .andExpect(jsonPath("$.data.code", is("N5")))
                .andExpect(jsonPath("$.data.name", is("Cấp độ N5")))
                .andExpect(jsonPath("$.data.sortOrder", is(1)))
                .andExpect(jsonPath("$.data.isActive", is(true)));

        verify(adminLevelService).getLevelById(1L);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/levels/999: Trả về 404 khi cấp độ không tồn tại")
    void testGetLevelById_NotFound() throws Exception {
        when(adminLevelService.getLevelById(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy cấp độ với ID: 999"));

        mockMvc.perform(get("/api/v1/admin/levels/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy cấp độ với ID: 999")));

        verify(adminLevelService).getLevelById(999L);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/levels/abc: Trả về 400 khi ID không đúng định dạng số")
    void testGetLevelById_TypeMismatch_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/admin/levels/abc"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==================================================================
    // POST /api/v1/admin/levels
    // ==================================================================

    @Test
    @DisplayName("Admin POST /api/v1/admin/levels: Tạo cấp độ mới thành công")
    void testCreateLevel_Success() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N4", "Cấp độ N4", "Sơ cấp 2", 2, true);
        AdminLevelResponse createdResponse = new AdminLevelResponse(2L, "N4", "Cấp độ N4", "Sơ cấp 2", 2, true);
        when(adminLevelService.createLevel(any(AdminLevelRequest.class))).thenReturn(createdResponse);

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tạo cấp độ thành công")))
                .andExpect(jsonPath("$.data.id", is(2)))
                .andExpect(jsonPath("$.data.code", is("N4")))
                .andExpect(jsonPath("$.data.name", is("Cấp độ N4")));

        verify(adminLevelService).createLevel(any(AdminLevelRequest.class));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/levels: Trả về 409 khi mã cấp độ đã tồn tại")
    void testCreateLevel_DuplicateCode() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N5", "Cấp độ N5", null, 1, true);
        when(adminLevelService.createLevel(any(AdminLevelRequest.class)))
                .thenThrow(new DuplicateResourceException("Mã cấp độ 'N5' đã tồn tại"));

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Mã cấp độ 'N5' đã tồn tại")));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/levels: Trả về 400 khi thiếu code hoặc code rỗng")
    void testCreateLevel_Validation_BlankCode() throws Exception {
        String json = "{\"code\":\"\",\"name\":\"Cấp độ N5\",\"sortOrder\":1}";

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/levels: Trả về 400 khi code vượt quá 20 ký tự")
    void testCreateLevel_Validation_CodeTooLong() throws Exception {
        String longCode = "A".repeat(21);
        String json = String.format("{\"code\":\"%s\",\"name\":\"Cấp độ\",\"sortOrder\":1}", longCode);

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/levels: Trả về 400 khi thiếu name hoặc name rỗng")
    void testCreateLevel_Validation_BlankName() throws Exception {
        String json = "{\"code\":\"N5\",\"name\":\"   \",\"sortOrder\":1}";

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/levels: Trả về 400 khi name vượt quá 100 ký tự")
    void testCreateLevel_Validation_NameTooLong() throws Exception {
        String longName = "A".repeat(101);
        String json = String.format("{\"code\":\"N5\",\"name\":\"%s\",\"sortOrder\":1}", longName);

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/levels: Trả về 400 khi thiếu sortOrder")
    void testCreateLevel_Validation_MissingSortOrder() throws Exception {
        String json = "{\"code\":\"N5\",\"name\":\"Cấp độ N5\"}";

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/levels: Trả về 400 khi sortOrder âm")
    void testCreateLevel_Validation_NegativeSortOrder() throws Exception {
        String json = "{\"code\":\"N5\",\"name\":\"Cấp độ N5\",\"sortOrder\":-1}";

        mockMvc.perform(post("/api/v1/admin/levels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==================================================================
    // PUT /api/v1/admin/levels/{id}
    // ==================================================================

    @Test
    @DisplayName("Admin PUT /api/v1/admin/levels/1: Cập nhật cấp độ thành công")
    void testUpdateLevel_Success() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N5_UPDATED", "Cấp độ N5 mới", "Mô tả mới", 10, true);
        AdminLevelResponse updatedResponse = new AdminLevelResponse(1L, "N5_UPDATED", "Cấp độ N5 mới", "Mô tả mới", 10, true);
        when(adminLevelService.updateLevel(eq(1L), any(AdminLevelRequest.class))).thenReturn(updatedResponse);

        mockMvc.perform(put("/api/v1/admin/levels/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Cập nhật cấp độ thành công")))
                .andExpect(jsonPath("$.data.id", is(1)))
                .andExpect(jsonPath("$.data.code", is("N5_UPDATED")))
                .andExpect(jsonPath("$.data.name", is("Cấp độ N5 mới")))
                .andExpect(jsonPath("$.data.sortOrder", is(10)));

        verify(adminLevelService).updateLevel(eq(1L), any(AdminLevelRequest.class));
    }

    @Test
    @DisplayName("Admin PUT /api/v1/admin/levels/999: Trả về 404 khi cấp độ cần cập nhật không tồn tại")
    void testUpdateLevel_NotFound() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N5", "Cấp độ N5", null, 1, true);
        when(adminLevelService.updateLevel(eq(999L), any(AdminLevelRequest.class)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy cấp độ với ID: 999"));

        mockMvc.perform(put("/api/v1/admin/levels/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy cấp độ với ID: 999")));
    }

    @Test
    @DisplayName("Admin PUT /api/v1/admin/levels/1: Trả về 409 khi mã cập nhật bị trùng")
    void testUpdateLevel_DuplicateCode() throws Exception {
        AdminLevelRequest request = new AdminLevelRequest("N4", "Cấp độ N4", null, 1, true);
        when(adminLevelService.updateLevel(eq(1L), any(AdminLevelRequest.class)))
                .thenThrow(new DuplicateResourceException("Mã cấp độ 'N4' đã tồn tại"));

        mockMvc.perform(put("/api/v1/admin/levels/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Mã cấp độ 'N4' đã tồn tại")));
    }

    @Test
    @DisplayName("Admin PUT /api/v1/admin/levels/1: Trả về 400 khi request body không hợp lệ")
    void testUpdateLevel_Validation_InvalidBody() throws Exception {
        String invalidJson = "{\"code\":\"\",\"name\":\"\",\"sortOrder\":-5}";

        mockMvc.perform(put("/api/v1/admin/levels/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==================================================================
    // DELETE /api/v1/admin/levels/{id}
    // ==================================================================

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/levels/1: Xóa cấp độ thành công")
    void testDeleteLevel_Success() throws Exception {
        doNothing().when(adminLevelService).deleteLevel(1L);

        mockMvc.perform(delete("/api/v1/admin/levels/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Xóa cấp độ thành công")));

        verify(adminLevelService).deleteLevel(1L);
    }

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/levels/999: Trả về 404 khi cấp độ không tồn tại")
    void testDeleteLevel_NotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy cấp độ với ID: 999"))
                .when(adminLevelService).deleteLevel(999L);

        mockMvc.perform(delete("/api/v1/admin/levels/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/levels/1: Trả về 409 khi cấp độ vẫn còn bài học liên kết")
    void testDeleteLevel_Conflict() throws Exception {
        doThrow(new DeleteConflictException("Không thể xóa cấp độ này vì vẫn còn bài học liên kết"))
                .when(adminLevelService).deleteLevel(1L);

        mockMvc.perform(delete("/api/v1/admin/levels/1"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không thể xóa cấp độ này vì vẫn còn bài học liên kết")));
    }
}
