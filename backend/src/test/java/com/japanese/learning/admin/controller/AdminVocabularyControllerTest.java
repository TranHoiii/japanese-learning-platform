package com.japanese.learning.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.dto.AdminVocabularyRequest;
import com.japanese.learning.admin.dto.AdminVocabularyResponse;
import com.japanese.learning.admin.service.AdminVocabularyService;
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
class AdminVocabularyControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private AdminVocabularyService adminVocabularyService;

    @InjectMocks
    private AdminVocabularyController adminVocabularyController;

    private AdminVocabularyResponse sampleResponse;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(adminVocabularyController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        sampleResponse = new AdminVocabularyResponse(
                1L,
                10L,
                1,
                "N5",
                "みず",
                "水",
                "Thủy",
                "Nước",
                "Danh từ",
                "/audio/mizu.mp3",
                "Từ vựng cơ bản"
        );
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/vocabularies: Lấy tất cả thành công")
    void testGetVocabularies_NoFilter_Success() throws Exception {
        when(adminVocabularyService.getVocabularies(null, null)).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/admin/vocabularies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách từ vựng thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].lessonId", is(10)))
                .andExpect(jsonPath("$.data[0].lessonNumber", is(1)))
                .andExpect(jsonPath("$.data[0].levelCode", is("N5")))
                .andExpect(jsonPath("$.data[0].hiragana", is("みず")))
                .andExpect(jsonPath("$.data[0].kanji", is("水")))
                .andExpect(jsonPath("$.data[0].hanViet", is("Thủy")))
                .andExpect(jsonPath("$.data[0].meaning", is("Nước")));

        verify(adminVocabularyService).getVocabularies(null, null);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/vocabularies?lessonId=10: Lọc theo bài học thành công")
    void testGetVocabularies_FilterByLessonId_Success() throws Exception {
        when(adminVocabularyService.getVocabularies(10L, null)).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/admin/vocabularies").param("lessonId", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(1)));

        verify(adminVocabularyService).getVocabularies(10L, null);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/vocabularies?levelId=1: Lọc theo cấp độ thành công")
    void testGetVocabularies_FilterByLevelId_Success() throws Exception {
        when(adminVocabularyService.getVocabularies(null, 1L)).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/admin/vocabularies").param("levelId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(1)));

        verify(adminVocabularyService).getVocabularies(null, 1L);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/vocabularies?lessonId=999: Ném 404 khi bài học không tồn tại")
    void testGetVocabularies_LessonNotFound_Returns404() throws Exception {
        when(adminVocabularyService.getVocabularies(999L, null))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 999"));

        mockMvc.perform(get("/api/v1/admin/vocabularies").param("lessonId", "999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với ID: 999")));
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/vocabularies/{id}: Lấy chi tiết thành công")
    void testGetVocabularyById_Success() throws Exception {
        when(adminVocabularyService.getVocabularyById(1L)).thenReturn(sampleResponse);

        mockMvc.perform(get("/api/v1/admin/vocabularies/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy thông tin từ vựng thành công")))
                .andExpect(jsonPath("$.data.id", is(1)))
                .andExpect(jsonPath("$.data.hiragana", is("みず")));

        verify(adminVocabularyService).getVocabularyById(1L);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/vocabularies/{id}: Ném 404 khi từ vựng không tồn tại")
    void testGetVocabularyById_NotFound() throws Exception {
        when(adminVocabularyService.getVocabularyById(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy từ vựng với ID: 999"));

        mockMvc.perform(get("/api/v1/admin/vocabularies/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy từ vựng với ID: 999")));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/vocabularies: Tạo từ vựng thành công trả về 201")
    void testCreateVocabulary_Success() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                10L, "みず", "水", "Thủy", "Nước", "Danh từ", "/audio/mizu.mp3", "Từ vựng cơ bản"
        );

        when(adminVocabularyService.createVocabulary(any(AdminVocabularyRequest.class))).thenReturn(sampleResponse);

        mockMvc.perform(post("/api/v1/admin/vocabularies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tạo từ vựng thành công")))
                .andExpect(jsonPath("$.data.id", is(1)))
                .andExpect(jsonPath("$.data.hiragana", is("みず")));

        verify(adminVocabularyService).createVocabulary(any(AdminVocabularyRequest.class));
    }

    @Test
    @DisplayName("Admin POST: Trả về 400 khi thiếu lessonId")
    void testCreateVocabulary_MissingLessonId_Returns400() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                null, "みず", "水", "Thủy", "Nước", "Danh từ", null, null
        );

        mockMvc.perform(post("/api/v1/admin/vocabularies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Bài học không được để trống")));
    }

    @Test
    @DisplayName("Admin POST: Trả về 400 khi lessonId âm")
    void testCreateVocabulary_NegativeLessonId_Returns400() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                -5L, "みず", "水", "Thủy", "Nước", "Danh từ", null, null
        );

        mockMvc.perform(post("/api/v1/admin/vocabularies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("ID bài học không hợp lệ")));
    }

    @Test
    @DisplayName("Admin POST: Trả về 400 khi hiragana để trống")
    void testCreateVocabulary_BlankHiragana_Returns400() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                10L, "   ", "水", "Thủy", "Nước", "Danh từ", null, null
        );

        mockMvc.perform(post("/api/v1/admin/vocabularies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Hiragana không được để trống")));
    }

    @Test
    @DisplayName("Admin POST: Trả về 400 khi meaning để trống")
    void testCreateVocabulary_BlankMeaning_Returns400() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                10L, "みず", "水", "Thủy", "   ", "Danh từ", null, null
        );

        mockMvc.perform(post("/api/v1/admin/vocabularies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Ý nghĩa không được để trống")));
    }

    @Test
    @DisplayName("Admin POST: Trả về 400 khi hiragana vượt quá 100 ký tự")
    void testCreateVocabulary_HiraganaTooLong_Returns400() throws Exception {
        String longHiragana = "a".repeat(101);
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                10L, longHiragana, null, null, "Ý nghĩa", null, null, null
        );

        mockMvc.perform(post("/api/v1/admin/vocabularies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Hiragana không vượt quá 100 ký tự")));
    }

    @Test
    @DisplayName("Admin POST: Ném 404 khi bài học không tồn tại trong service")
    void testCreateVocabulary_LessonNotFound_Returns404() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                999L, "みず", null, null, "Nước", null, null, null
        );

        when(adminVocabularyService.createVocabulary(any(AdminVocabularyRequest.class)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 999"));

        mockMvc.perform(post("/api/v1/admin/vocabularies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với ID: 999")));
    }

    @Test
    @DisplayName("Admin PUT /api/v1/admin/vocabularies/{id}: Cập nhật từ vựng thành công")
    void testUpdateVocabulary_Success() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                10L, "おみず", "お水", "Thủy", "Nước (kính ngữ)", "Danh từ", null, null
        );

        AdminVocabularyResponse updatedResponse = new AdminVocabularyResponse(
                1L, 10L, 1, "N5", "おみず", "お水", "Thủy", "Nước (kính ngữ)", "Danh từ", null, null
        );

        when(adminVocabularyService.updateVocabulary(eq(1L), any(AdminVocabularyRequest.class)))
                .thenReturn(updatedResponse);

        mockMvc.perform(put("/api/v1/admin/vocabularies/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Cập nhật từ vựng thành công")))
                .andExpect(jsonPath("$.data.hiragana", is("おみず")))
                .andExpect(jsonPath("$.data.meaning", is("Nước (kính ngữ)")));

        verify(adminVocabularyService).updateVocabulary(eq(1L), any(AdminVocabularyRequest.class));
    }

    @Test
    @DisplayName("Admin PUT /api/v1/admin/vocabularies/{id}: Ném 404 khi từ vựng không tồn tại")
    void testUpdateVocabulary_NotFound() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                10L, "みず", null, null, "Nước", null, null, null
        );

        when(adminVocabularyService.updateVocabulary(eq(999L), any(AdminVocabularyRequest.class)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy từ vựng với ID: 999"));

        mockMvc.perform(put("/api/v1/admin/vocabularies/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy từ vựng với ID: 999")));
    }

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/vocabularies/{id}: Xóa từ vựng thành công")
    void testDeleteVocabulary_Success() throws Exception {
        doNothing().when(adminVocabularyService).deleteVocabulary(1L);

        mockMvc.perform(delete("/api/v1/admin/vocabularies/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Xóa từ vựng thành công")))
                .andExpect(jsonPath("$.data").doesNotExist());

        verify(adminVocabularyService).deleteVocabulary(1L);
    }

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/vocabularies/{id}: Ném 404 khi từ vựng không tồn tại")
    void testDeleteVocabulary_NotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy từ vựng với ID: 999"))
                .when(adminVocabularyService).deleteVocabulary(999L);

        mockMvc.perform(delete("/api/v1/admin/vocabularies/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy từ vựng với ID: 999")));

        verify(adminVocabularyService).deleteVocabulary(999L);
    }
}
