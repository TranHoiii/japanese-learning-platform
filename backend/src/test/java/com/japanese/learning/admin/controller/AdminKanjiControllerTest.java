package com.japanese.learning.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.dto.AdminKanjiRequest;
import com.japanese.learning.admin.dto.AdminKanjiResponse;
import com.japanese.learning.admin.dto.AdminLessonKanjiAssignRequest;
import com.japanese.learning.admin.service.AdminKanjiService;
import com.japanese.learning.admin.service.AdminLessonService;
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
class AdminKanjiControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private AdminKanjiService adminKanjiService;

    @Mock
    private AdminLessonService adminLessonService;

    @InjectMocks
    private AdminKanjiController adminKanjiController;

    private AdminLessonController adminLessonController;

    private AdminKanjiResponse sampleResponse;

    @BeforeEach
    void setUp() {
        adminLessonController = new AdminLessonController(adminLessonService, adminKanjiService);

        mockMvc = MockMvcBuilders.standaloneSetup(adminKanjiController, adminLessonController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        sampleResponse = new AdminKanjiResponse(
                1L,
                "日",
                "NHẬT",
                "ニチ, ジツ",
                "ひ, -び, -か",
                "Mặt trời, ngày",
                4,
                "https://example.com/stroke/nhat.svg",
                "Mặt trời",
                "https://example.com/mnemonic/nhat.png",
                List.of(10L)
        );
    }

    // ==========================================
    // 1. GET ALL KANJIS (/api/v1/admin/kanjis)
    // ==========================================

    @Test
    @DisplayName("Admin GET /api/v1/admin/kanjis: Lấy danh sách thành công")
    void testGetAllKanjis_Success() throws Exception {
        when(adminKanjiService.getAllKanjis()).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/admin/kanjis"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách chữ Hán thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].kanji", is("日")))
                .andExpect(jsonPath("$.data[0].hanViet", is("NHẬT")))
                .andExpect(jsonPath("$.data[0].assignedLessonIds", hasSize(1)));

        verify(adminKanjiService).getAllKanjis();
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/kanjis: Trả về danh sách rỗng khi chưa có chữ Hán")
    void testGetAllKanjis_Empty() throws Exception {
        when(adminKanjiService.getAllKanjis()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/admin/kanjis"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(0)));

        verify(adminKanjiService).getAllKanjis();
    }

    // ==========================================
    // 2. GET KANJI BY ID (/api/v1/admin/kanjis/{id})
    // ==========================================

    @Test
    @DisplayName("Admin GET /api/v1/admin/kanjis/{id}: Lấy chi tiết chữ Hán thành công")
    void testGetKanjiById_Success() throws Exception {
        when(adminKanjiService.getKanjiById(1L)).thenReturn(sampleResponse);

        mockMvc.perform(get("/api/v1/admin/kanjis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy thông tin chữ Hán thành công")))
                .andExpect(jsonPath("$.data.id", is(1)))
                .andExpect(jsonPath("$.data.kanji", is("日")))
                .andExpect(jsonPath("$.data.strokeCount", is(4)));

        verify(adminKanjiService).getKanjiById(1L);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/kanjis/{id}: Ném 404 khi chữ Hán không tồn tại")
    void testGetKanjiById_NotFound() throws Exception {
        when(adminKanjiService.getKanjiById(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy chữ Hán với ID: 999"));

        mockMvc.perform(get("/api/v1/admin/kanjis/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy chữ Hán với ID: 999")));

        verify(adminKanjiService).getKanjiById(999L);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/kanjis/{id}: Trả về 400 khi ID không hợp lệ")
    void testGetKanjiById_TypeMismatch_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/admin/kanjis/abc"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Tham số request không hợp lệ")));
    }

    // ==========================================
    // 3. POST /api/v1/admin/kanjis (createKanji)
    // ==========================================

    @Test
    @DisplayName("Admin POST /api/v1/admin/kanjis: Tạo chữ Hán thành công trả về 201")
    void testCreateKanji_Success() throws Exception {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "月", "NGUYỆT", "ゲツ", "つき", "Mặt trăng", 4, null, null, null
        );
        AdminKanjiResponse createdResponse = new AdminKanjiResponse(
                2L, "月", "NGUYỆT", "ゲツ", "つき", "Mặt trăng", 4, null, null, null, List.of()
        );

        when(adminKanjiService.createKanji(any(AdminKanjiRequest.class))).thenReturn(createdResponse);

        mockMvc.perform(post("/api/v1/admin/kanjis")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tạo chữ Hán thành công")))
                .andExpect(jsonPath("$.data.id", is(2)))
                .andExpect(jsonPath("$.data.kanji", is("月")));

        verify(adminKanjiService).createKanji(any(AdminKanjiRequest.class));
    }

    @Test
    @DisplayName("Admin POST: Trả về 400 khi chữ Hán để trống")
    void testCreateKanji_BlankKanji_Returns400() throws Exception {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "   ", "NHẬT", null, null, null, 4, null, null, null
        );

        mockMvc.perform(post("/api/v1/admin/kanjis")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Chữ Hán không được để trống")));
    }

    @Test
    @DisplayName("Admin POST: Trả về 400 khi chữ Hán vượt quá 10 ký tự")
    void testCreateKanji_KanjiTooLong_Returns400() throws Exception {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "一二三四五六七八九十十一", "DÀI QUÁ", null, null, null, null, null, null, null
        );

        mockMvc.perform(post("/api/v1/admin/kanjis")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Chữ Hán không vượt quá 10 ký tự")));
    }

    @Test
    @DisplayName("Admin POST: Trả về 400 khi hanViet vượt quá 100 ký tự")
    void testCreateKanji_HanVietTooLong_Returns400() throws Exception {
        String longHanViet = "A".repeat(101);
        AdminKanjiRequest request = new AdminKanjiRequest(
                "日", longHanViet, null, null, null, null, null, null, null
        );

        mockMvc.perform(post("/api/v1/admin/kanjis")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Hán Việt không vượt quá 100 ký tự")));
    }

    @Test
    @DisplayName("Admin POST: Trả về 409 khi chữ Hán đã tồn tại")
    void testCreateKanji_Duplicate_Returns409() throws Exception {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "日", "NHẬT", null, null, null, null, null, null, null
        );

        when(adminKanjiService.createKanji(any(AdminKanjiRequest.class)))
                .thenThrow(new DuplicateResourceException("Chữ Hán '日' đã tồn tại"));

        mockMvc.perform(post("/api/v1/admin/kanjis")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Chữ Hán '日' đã tồn tại")));
    }

    // ==========================================
    // 4. PUT /api/v1/admin/kanjis/{id} (updateKanji)
    // ==========================================

    @Test
    @DisplayName("Admin PUT /api/v1/admin/kanjis/{id}: Cập nhật chữ Hán thành công")
    void testUpdateKanji_Success() throws Exception {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "日", "NHẬT BẢN", "ニチ", "ひ", "Mặt trời", 4, null, null, null
        );

        when(adminKanjiService.updateKanji(eq(1L), any(AdminKanjiRequest.class))).thenReturn(sampleResponse);

        mockMvc.perform(put("/api/v1/admin/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Cập nhật chữ Hán thành công")));

        verify(adminKanjiService).updateKanji(eq(1L), any(AdminKanjiRequest.class));
    }

    @Test
    @DisplayName("Admin PUT /api/v1/admin/kanjis/{id}: Ném 404 khi chữ Hán không tồn tại")
    void testUpdateKanji_NotFound() throws Exception {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "日", "NHẬT", null, null, null, null, null, null, null
        );

        when(adminKanjiService.updateKanji(eq(999L), any(AdminKanjiRequest.class)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy chữ Hán với ID: 999"));

        mockMvc.perform(put("/api/v1/admin/kanjis/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy chữ Hán với ID: 999")));
    }

    @Test
    @DisplayName("Admin PUT /api/v1/admin/kanjis/{id}: Ném 409 khi chữ Hán trùng lặp")
    void testUpdateKanji_Duplicate_Returns409() throws Exception {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "月", null, null, null, null, null, null, null, null
        );

        when(adminKanjiService.updateKanji(eq(1L), any(AdminKanjiRequest.class)))
                .thenThrow(new DuplicateResourceException("Chữ Hán '月' đã tồn tại"));

        mockMvc.perform(put("/api/v1/admin/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Chữ Hán '月' đã tồn tại")));
    }

    // ==========================================
    // 5. DELETE /api/v1/admin/kanjis/{id} (deleteKanji)
    // ==========================================

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/kanjis/{id}: Xóa chữ Hán thành công")
    void testDeleteKanji_Success() throws Exception {
        doNothing().when(adminKanjiService).deleteKanji(1L);

        mockMvc.perform(delete("/api/v1/admin/kanjis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Xóa chữ Hán thành công")));

        verify(adminKanjiService).deleteKanji(1L);
    }

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/kanjis/{id}: Ném 404 khi chữ Hán không tồn tại")
    void testDeleteKanji_NotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy chữ Hán với ID: 999"))
                .when(adminKanjiService).deleteKanji(999L);

        mockMvc.perform(delete("/api/v1/admin/kanjis/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy chữ Hán với ID: 999")));
    }

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/kanjis/{id}: Ném 409 khi chữ Hán vẫn đang được gán vào bài học")
    void testDeleteKanji_Conflict_Returns409() throws Exception {
        doThrow(new DeleteConflictException("Không thể xóa chữ Hán này vì vẫn đang được gán vào bài học"))
                .when(adminKanjiService).deleteKanji(1L);

        mockMvc.perform(delete("/api/v1/admin/kanjis/1"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không thể xóa chữ Hán này vì vẫn đang được gán vào bài học")));
    }

    // ==========================================
    // 6. ASSIGN KANJI (/api/v1/admin/lessons/{lessonId}/kanjis/{kanjiId})
    // ==========================================

    @Test
    @DisplayName("Admin POST /api/v1/admin/lessons/{lessonId}/kanjis/{kanjiId}: Gán chữ Hán vào bài học thành công có body")
    void testAssignKanji_Success_WithBody() throws Exception {
        AdminLessonKanjiAssignRequest request = new AdminLessonKanjiAssignRequest(2);
        doNothing().when(adminKanjiService).assignKanjiToLesson(eq(10L), eq(1L), any(AdminLessonKanjiAssignRequest.class));

        mockMvc.perform(post("/api/v1/admin/lessons/10/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Gán chữ Hán vào bài học thành công")));

        verify(adminKanjiService).assignKanjiToLesson(eq(10L), eq(1L), any(AdminLessonKanjiAssignRequest.class));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/lessons/{lessonId}/kanjis/{kanjiId}: Gán chữ Hán thành công không có body")
    void testAssignKanji_Success_WithoutBody() throws Exception {
        doNothing().when(adminKanjiService).assignKanjiToLesson(eq(10L), eq(1L), eq(null));

        mockMvc.perform(post("/api/v1/admin/lessons/10/kanjis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Gán chữ Hán vào bài học thành công")));

        verify(adminKanjiService).assignKanjiToLesson(eq(10L), eq(1L), eq(null));
    }

    @Test
    @DisplayName("Admin POST assign: Trả về 400 khi sortOrder là số âm")
    void testAssignKanji_NegativeSortOrder_Returns400() throws Exception {
        AdminLessonKanjiAssignRequest request = new AdminLessonKanjiAssignRequest(-1);

        mockMvc.perform(post("/api/v1/admin/lessons/10/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")));
    }

    @Test
    @DisplayName("Admin POST assign: Ném 404 khi bài học không tồn tại")
    void testAssignKanji_LessonNotFound_Returns404() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 999"))
                .when(adminKanjiService).assignKanjiToLesson(eq(999L), eq(1L), any());

        mockMvc.perform(post("/api/v1/admin/lessons/999/kanjis/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với ID: 999")));
    }

    @Test
    @DisplayName("Admin POST assign: Ném 404 khi chữ Hán không tồn tại")
    void testAssignKanji_KanjiNotFound_Returns404() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy chữ Hán với ID: 999"))
                .when(adminKanjiService).assignKanjiToLesson(eq(10L), eq(999L), any());

        mockMvc.perform(post("/api/v1/admin/lessons/10/kanjis/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy chữ Hán với ID: 999")));
    }

    @Test
    @DisplayName("Admin POST assign: Ném 409 khi chữ Hán đã được gán vào bài học")
    void testAssignKanji_DuplicateAssignment_Returns409() throws Exception {
        doThrow(new DuplicateResourceException("Chữ Hán này đã được gán vào bài học"))
                .when(adminKanjiService).assignKanjiToLesson(eq(10L), eq(1L), any());

        mockMvc.perform(post("/api/v1/admin/lessons/10/kanjis/1"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Chữ Hán này đã được gán vào bài học")));
    }

    // ==========================================
    // 7. UNASSIGN KANJI (/api/v1/admin/lessons/{lessonId}/kanjis/{kanjiId})
    // ==========================================

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/lessons/{lessonId}/kanjis/{kanjiId}: Hủy gán chữ Hán thành công")
    void testUnassignKanji_Success() throws Exception {
        doNothing().when(adminKanjiService).unassignKanjiFromLesson(10L, 1L);

        mockMvc.perform(delete("/api/v1/admin/lessons/10/kanjis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Hủy gán chữ Hán khỏi bài học thành công")));

        verify(adminKanjiService).unassignKanjiFromLesson(10L, 1L);
    }

    @Test
    @DisplayName("Admin DELETE unassign: Ném 404 khi bài học không tồn tại")
    void testUnassignKanji_LessonNotFound_Returns404() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 999"))
                .when(adminKanjiService).unassignKanjiFromLesson(999L, 1L);

        mockMvc.perform(delete("/api/v1/admin/lessons/999/kanjis/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với ID: 999")));
    }

    @Test
    @DisplayName("Admin DELETE unassign: Ném 404 khi chữ Hán chưa được gán vào bài học")
    void testUnassignKanji_NotAssigned_Returns404() throws Exception {
        doThrow(new ResourceNotFoundException("Chữ Hán này chưa được gán vào bài học"))
                .when(adminKanjiService).unassignKanjiFromLesson(10L, 1L);

        mockMvc.perform(delete("/api/v1/admin/lessons/10/kanjis/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Chữ Hán này chưa được gán vào bài học")));
    }
}
