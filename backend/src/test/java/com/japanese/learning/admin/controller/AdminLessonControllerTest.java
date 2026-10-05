package com.japanese.learning.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.dto.AdminLessonKanjiAssignRequest;
import com.japanese.learning.admin.dto.AdminLessonRequest;
import com.japanese.learning.admin.dto.AdminLessonResponse;
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
class AdminLessonControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private AdminLessonService adminLessonService;

    @Mock
    private AdminKanjiService adminKanjiService;

    @InjectMocks
    private AdminLessonController adminLessonController;

    private AdminLessonResponse sampleResponse;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(adminLessonController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        sampleResponse = new AdminLessonResponse(10L, 1L, "N5", 1, "Bài 01", "Giới thiệu", 1, true);
    }

    // ==================================================================
    // GET /api/v1/admin/lessons
    // ==================================================================

    @Test
    @DisplayName("Admin GET /api/v1/admin/lessons: Lấy tất cả bài học thành công")
    void testGetLessons_NoFilter_Success() throws Exception {
        when(adminLessonService.getLessons(null)).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/admin/lessons"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách bài học thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(10)))
                .andExpect(jsonPath("$.data[0].levelId", is(1)))
                .andExpect(jsonPath("$.data[0].levelCode", is("N5")))
                .andExpect(jsonPath("$.data[0].lessonNumber", is(1)))
                .andExpect(jsonPath("$.data[0].title", is("Bài 01")))
                .andExpect(jsonPath("$.data[0].isActive", is(true)));

        verify(adminLessonService).getLessons(null);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/lessons?levelId=1: Lấy danh sách theo levelId")
    void testGetLessons_ByLevelId_Success() throws Exception {
        when(adminLessonService.getLessons(1L)).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/admin/lessons").param("levelId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(1)));

        verify(adminLessonService).getLessons(1L);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/lessons?levelId=999: Trả về 404 khi level không tồn tại")
    void testGetLessons_LevelNotFound() throws Exception {
        when(adminLessonService.getLessons(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy cấp độ với ID: 999"));

        mockMvc.perform(get("/api/v1/admin/lessons").param("levelId", "999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/lessons: Trả về danh sách rỗng")
    void testGetLessons_Empty() throws Exception {
        when(adminLessonService.getLessons(null)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/admin/lessons"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(0)));
    }

    // ==================================================================
    // GET /api/v1/admin/lessons/{id}
    // ==================================================================

    @Test
    @DisplayName("Admin GET /api/v1/admin/lessons/10: Lấy bài học theo ID thành công")
    void testGetLessonById_Success() throws Exception {
        when(adminLessonService.getLessonById(10L)).thenReturn(sampleResponse);

        mockMvc.perform(get("/api/v1/admin/lessons/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy thông tin bài học thành công")))
                .andExpect(jsonPath("$.data.id", is(10)))
                .andExpect(jsonPath("$.data.levelCode", is("N5")))
                .andExpect(jsonPath("$.data.title", is("Bài 01")));

        verify(adminLessonService).getLessonById(10L);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/lessons/999: Trả về 404 khi bài học không tồn tại")
    void testGetLessonById_NotFound() throws Exception {
        when(adminLessonService.getLessonById(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 999"));

        mockMvc.perform(get("/api/v1/admin/lessons/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==================================================================
    // POST /api/v1/admin/lessons
    // ==================================================================

    @Test
    @DisplayName("Admin POST /api/v1/admin/lessons: Tạo bài học mới thành công")
    void testCreateLesson_Success() throws Exception {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01", "Giới thiệu", 1, true);
        when(adminLessonService.createLesson(any(AdminLessonRequest.class))).thenReturn(sampleResponse);

        mockMvc.perform(post("/api/v1/admin/lessons")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tạo bài học thành công")))
                .andExpect(jsonPath("$.data.id", is(10)))
                .andExpect(jsonPath("$.data.lessonNumber", is(1)));

        verify(adminLessonService).createLesson(any(AdminLessonRequest.class));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/lessons: Trả về 409 khi số bài học trùng lặp")
    void testCreateLesson_Duplicate() throws Exception {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01", null, 1, true);
        when(adminLessonService.createLesson(any(AdminLessonRequest.class)))
                .thenThrow(new DuplicateResourceException("Bài học số 1 đã tồn tại trong cấp độ này"));

        mockMvc.perform(post("/api/v1/admin/lessons")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/lessons: Trả về 400 khi request không hợp lệ (thiếu title)")
    void testCreateLesson_InvalidRequest_MissingTitle() throws Exception {
        // title is blank - invalid
        String invalidJson = "{\"levelId\":1,\"lessonNumber\":1,\"title\":\"\",\"sortOrder\":1}";

        mockMvc.perform(post("/api/v1/admin/lessons")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/lessons: Trả về 400 khi levelId null")
    void testCreateLesson_InvalidRequest_MissingLevelId() throws Exception {
        String invalidJson = "{\"lessonNumber\":1,\"title\":\"Bài 01\",\"sortOrder\":1}";

        mockMvc.perform(post("/api/v1/admin/lessons")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==================================================================
    // PUT /api/v1/admin/lessons/{id}
    // ==================================================================

    @Test
    @DisplayName("Admin PUT /api/v1/admin/lessons/10: Cập nhật bài học thành công")
    void testUpdateLesson_Success() throws Exception {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01 Updated", "Mô tả mới", 1, false);
        AdminLessonResponse updatedResponse = new AdminLessonResponse(10L, 1L, "N5", 1, "Bài 01 Updated", "Mô tả mới", 1, false);
        when(adminLessonService.updateLesson(eq(10L), any(AdminLessonRequest.class))).thenReturn(updatedResponse);

        mockMvc.perform(put("/api/v1/admin/lessons/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Cập nhật bài học thành công")))
                .andExpect(jsonPath("$.data.title", is("Bài 01 Updated")))
                .andExpect(jsonPath("$.data.isActive", is(false)));

        verify(adminLessonService).updateLesson(eq(10L), any(AdminLessonRequest.class));
    }

    @Test
    @DisplayName("Admin PUT /api/v1/admin/lessons/999: Trả về 404 khi bài học không tồn tại")
    void testUpdateLesson_NotFound() throws Exception {
        AdminLessonRequest request = new AdminLessonRequest(1L, 1, "Bài 01", null, 1, true);
        when(adminLessonService.updateLesson(eq(999L), any(AdminLessonRequest.class)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 999"));

        mockMvc.perform(put("/api/v1/admin/lessons/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin PUT /api/v1/admin/lessons/10: Trả về 409 khi lessonNumber trùng lặp")
    void testUpdateLesson_DuplicateLessonNumber() throws Exception {
        AdminLessonRequest request = new AdminLessonRequest(1L, 2, "Bài 02", null, 2, true);
        when(adminLessonService.updateLesson(eq(10L), any(AdminLessonRequest.class)))
                .thenThrow(new DuplicateResourceException("Bài học số 2 đã tồn tại trong cấp độ này"));

        mockMvc.perform(put("/api/v1/admin/lessons/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==================================================================
    // DELETE /api/v1/admin/lessons/{id}
    // ==================================================================

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/lessons/10: Xóa bài học thành công")
    void testDeleteLesson_Success() throws Exception {
        doNothing().when(adminLessonService).deleteLesson(10L);

        mockMvc.perform(delete("/api/v1/admin/lessons/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Xóa bài học thành công")));

        verify(adminLessonService).deleteLesson(10L);
    }

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/lessons/999: Trả về 404 khi bài học không tồn tại")
    void testDeleteLesson_NotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 999"))
                .when(adminLessonService).deleteLesson(999L);

        mockMvc.perform(delete("/api/v1/admin/lessons/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/lessons/10: Trả về 409 khi có nội dung liên kết")
    void testDeleteLesson_Conflict() throws Exception {
        doThrow(new DeleteConflictException("Không thể xóa bài học này vì vẫn còn nội dung liên kết"))
                .when(adminLessonService).deleteLesson(10L);

        mockMvc.perform(delete("/api/v1/admin/lessons/10"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==================================================================
    // POST /api/v1/admin/lessons/{lessonId}/kanjis/{kanjiId}  (assign)
    // ==================================================================

    @Test
    @DisplayName("Admin POST /api/v1/admin/lessons/10/kanjis/1: Gán kanji vào bài học thành công")
    void testAssignKanji_Success() throws Exception {
        AdminLessonKanjiAssignRequest assignRequest = new AdminLessonKanjiAssignRequest(1);
        doNothing().when(adminKanjiService).assignKanjiToLesson(eq(10L), eq(1L), any());

        mockMvc.perform(post("/api/v1/admin/lessons/10/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(assignRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Gán chữ Hán vào bài học thành công")));

        verify(adminKanjiService).assignKanjiToLesson(eq(10L), eq(1L), any());
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/lessons/10/kanjis/1: Gán thành công không cần body")
    void testAssignKanji_NoBody_Success() throws Exception {
        doNothing().when(adminKanjiService).assignKanjiToLesson(eq(10L), eq(1L), any());

        mockMvc.perform(post("/api/v1/admin/lessons/10/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)));

        verify(adminKanjiService).assignKanjiToLesson(eq(10L), eq(1L), any());
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/lessons/999/kanjis/1: Trả về 404 khi bài học không tồn tại")
    void testAssignKanji_LessonNotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 999"))
                .when(adminKanjiService).assignKanjiToLesson(eq(999L), eq(1L), any());

        mockMvc.perform(post("/api/v1/admin/lessons/999/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/lessons/10/kanjis/999: Trả về 404 khi kanji không tồn tại")
    void testAssignKanji_KanjiNotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy chữ Hán với ID: 999"))
                .when(adminKanjiService).assignKanjiToLesson(eq(10L), eq(999L), any());

        mockMvc.perform(post("/api/v1/admin/lessons/10/kanjis/999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/lessons/10/kanjis/1: Trả về 409 khi kanji đã được gán")
    void testAssignKanji_AlreadyAssigned() throws Exception {
        doThrow(new DuplicateResourceException("Chữ Hán đã được gán vào bài học này"))
                .when(adminKanjiService).assignKanjiToLesson(eq(10L), eq(1L), any());

        mockMvc.perform(post("/api/v1/admin/lessons/10/kanjis/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==================================================================
    // DELETE /api/v1/admin/lessons/{lessonId}/kanjis/{kanjiId}  (unassign)
    // ==================================================================

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/lessons/10/kanjis/1: Hủy gán kanji thành công")
    void testUnassignKanji_Success() throws Exception {
        doNothing().when(adminKanjiService).unassignKanjiFromLesson(10L, 1L);

        mockMvc.perform(delete("/api/v1/admin/lessons/10/kanjis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Hủy gán chữ Hán khỏi bài học thành công")));

        verify(adminKanjiService).unassignKanjiFromLesson(10L, 1L);
    }

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/lessons/999/kanjis/1: Trả về 404 khi bài học không tồn tại")
    void testUnassignKanji_LessonNotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 999"))
                .when(adminKanjiService).unassignKanjiFromLesson(999L, 1L);

        mockMvc.perform(delete("/api/v1/admin/lessons/999/kanjis/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)));
    }
}
