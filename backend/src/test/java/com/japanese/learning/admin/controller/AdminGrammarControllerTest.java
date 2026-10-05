package com.japanese.learning.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.dto.AdminGrammarExampleRequest;
import com.japanese.learning.admin.dto.AdminGrammarExampleResponse;
import com.japanese.learning.admin.dto.AdminGrammarRequest;
import com.japanese.learning.admin.dto.AdminGrammarResponse;
import com.japanese.learning.admin.service.AdminGrammarService;
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
class AdminGrammarControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private AdminGrammarService adminGrammarService;

    @InjectMocks
    private AdminGrammarController adminGrammarController;

    private AdminGrammarResponse sampleResponse;
    private AdminGrammarExampleResponse sampleExampleResponse;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(adminGrammarController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        sampleExampleResponse = new AdminGrammarExampleResponse(
                100L, 10L, "わたしはがくせいです。", "わたしはがくせいです。", "Tôi là học sinh.", "Giải thích", 1
        );

        sampleResponse = new AdminGrammarResponse(
                10L,
                1L,
                1,
                "N5",
                "～は～です",
                "Là...",
                "N1 は N2 です",
                "Khẳng định",
                "Ghi chú",
                1,
                List.of(sampleExampleResponse)
        );
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/grammars: Lấy tất cả thành công")
    void testGetGrammars_NoFilter_Success() throws Exception {
        when(adminGrammarService.getGrammars(null, null)).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/admin/grammars"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách ngữ pháp thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(10)))
                .andExpect(jsonPath("$.data[0].pattern", is("～は～です")));

        verify(adminGrammarService).getGrammars(null, null);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/grammars?lessonId=1: Lọc theo bài học thành công")
    void testGetGrammars_FilterByLessonId_Success() throws Exception {
        when(adminGrammarService.getGrammars(1L, null)).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/admin/grammars").param("lessonId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(1)));

        verify(adminGrammarService).getGrammars(1L, null);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/grammars?levelId=1: Lọc theo cấp độ thành công")
    void testGetGrammars_FilterByLevelId_Success() throws Exception {
        when(adminGrammarService.getGrammars(null, 1L)).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/admin/grammars").param("levelId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(1)));

        verify(adminGrammarService).getGrammars(null, 1L);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/grammars?lessonId=999: Ném 404 khi bài học không tồn tại")
    void testGetGrammars_LessonNotFound_Returns404() throws Exception {
        when(adminGrammarService.getGrammars(999L, null))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 999"));

        mockMvc.perform(get("/api/v1/admin/grammars").param("lessonId", "999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với ID: 999")));
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/grammars/{id}: Lấy chi tiết thành công")
    void testGetGrammarById_Success() throws Exception {
        when(adminGrammarService.getGrammarById(10L)).thenReturn(sampleResponse);

        mockMvc.perform(get("/api/v1/admin/grammars/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy thông tin ngữ pháp thành công")))
                .andExpect(jsonPath("$.data.id", is(10)))
                .andExpect(jsonPath("$.data.pattern", is("～は～です")));

        verify(adminGrammarService).getGrammarById(10L);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/grammars/{id}: Ném 404 khi ngữ pháp không tồn tại")
    void testGetGrammarById_NotFound() throws Exception {
        when(adminGrammarService.getGrammarById(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy ngữ pháp với ID: 999"));

        mockMvc.perform(get("/api/v1/admin/grammars/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy ngữ pháp với ID: 999")));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/grammars: Tạo ngữ pháp thành công trả về 201")
    void testCreateGrammar_Success() throws Exception {
        AdminGrammarRequest request = new AdminGrammarRequest(
                1L, "～も", "Cũng...", "N も", "Trợ từ", null, 2, null
        );

        when(adminGrammarService.createGrammar(any(AdminGrammarRequest.class))).thenReturn(sampleResponse);

        mockMvc.perform(post("/api/v1/admin/grammars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tạo ngữ pháp thành công")))
                .andExpect(jsonPath("$.data.pattern", is("～は～です")));

        verify(adminGrammarService).createGrammar(any(AdminGrammarRequest.class));
    }

    @Test
    @DisplayName("Admin POST: Trả về 400 khi thiếu lessonId")
    void testCreateGrammar_MissingLessonId_Returns400() throws Exception {
        AdminGrammarRequest request = new AdminGrammarRequest(
                null, "～も", "Cũng", null, null, null, 1, null
        );

        mockMvc.perform(post("/api/v1/admin/grammars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Bài học không được để trống")));
    }

    @Test
    @DisplayName("Admin POST: Trả về 400 khi lessonId là số âm")
    void testCreateGrammar_NegativeLessonId_Returns400() throws Exception {
        AdminGrammarRequest request = new AdminGrammarRequest(
                -1L, "～も", "Cũng", null, null, null, 1, null
        );

        mockMvc.perform(post("/api/v1/admin/grammars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("ID bài học không hợp lệ")));
    }

    @Test
    @DisplayName("Admin POST: Trả về 400 khi pattern để trống")
    void testCreateGrammar_BlankPattern_Returns400() throws Exception {
        AdminGrammarRequest request = new AdminGrammarRequest(
                1L, "   ", "Cũng", null, null, null, 1, null
        );

        mockMvc.perform(post("/api/v1/admin/grammars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Mẫu ngữ pháp không được để trống")));
    }

    @Test
    @DisplayName("Admin POST: Trả về 400 khi sortOrder là số âm")
    void testCreateGrammar_NegativeSortOrder_Returns400() throws Exception {
        AdminGrammarRequest request = new AdminGrammarRequest(
                1L, "～も", "Cũng", null, null, null, -1, null
        );

        mockMvc.perform(post("/api/v1/admin/grammars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")));
    }

    @Test
    @DisplayName("Admin POST: Ném 404 khi bài học không tồn tại")
    void testCreateGrammar_LessonNotFound_Returns404() throws Exception {
        AdminGrammarRequest request = new AdminGrammarRequest(
                999L, "～も", "Cũng", null, null, null, 1, null
        );

        when(adminGrammarService.createGrammar(any(AdminGrammarRequest.class)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 999"));

        mockMvc.perform(post("/api/v1/admin/grammars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với ID: 999")));
    }

    @Test
    @DisplayName("Admin PUT /api/v1/admin/grammars/{id}: Cập nhật ngữ pháp thành công")
    void testUpdateGrammar_Success() throws Exception {
        AdminGrammarRequest request = new AdminGrammarRequest(
                1L, "～は～です", "Là...", null, null, null, 1, null
        );

        when(adminGrammarService.updateGrammar(eq(10L), any(AdminGrammarRequest.class))).thenReturn(sampleResponse);

        mockMvc.perform(put("/api/v1/admin/grammars/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Cập nhật ngữ pháp thành công")));

        verify(adminGrammarService).updateGrammar(eq(10L), any(AdminGrammarRequest.class));
    }

    @Test
    @DisplayName("Admin PUT /api/v1/admin/grammars/{id}: Ném 404 khi ngữ pháp không tồn tại")
    void testUpdateGrammar_NotFound() throws Exception {
        AdminGrammarRequest request = new AdminGrammarRequest(
                1L, "～は～です", "Là...", null, null, null, 1, null
        );

        when(adminGrammarService.updateGrammar(eq(999L), any(AdminGrammarRequest.class)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy ngữ pháp với ID: 999"));

        mockMvc.perform(put("/api/v1/admin/grammars/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy ngữ pháp với ID: 999")));
    }

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/grammars/{id}: Xóa ngữ pháp thành công")
    void testDeleteGrammar_Success() throws Exception {
        doNothing().when(adminGrammarService).deleteGrammar(10L);

        mockMvc.perform(delete("/api/v1/admin/grammars/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Xóa ngữ pháp thành công")));

        verify(adminGrammarService).deleteGrammar(10L);
    }

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/grammars/{id}: Ném 404 khi ngữ pháp không tồn tại")
    void testDeleteGrammar_NotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy ngữ pháp với ID: 999"))
                .when(adminGrammarService).deleteGrammar(999L);

        mockMvc.perform(delete("/api/v1/admin/grammars/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy ngữ pháp với ID: 999")));
    }

    // ==========================================
    // EXAMPLES ENDPOINTS TESTS
    // ==========================================

    @Test
    @DisplayName("Admin GET /api/v1/admin/grammars/{grammarId}/examples: Lấy danh sách ví dụ thành công")
    void testGetExamples_Success() throws Exception {
        when(adminGrammarService.getExamples(10L)).thenReturn(List.of(sampleExampleResponse));

        mockMvc.perform(get("/api/v1/admin/grammars/10/examples"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách ví dụ thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].japanese", is("わたしはがくせいです。")));

        verify(adminGrammarService).getExamples(10L);
    }

    @Test
    @DisplayName("Admin GET /api/v1/admin/grammars/{grammarId}/examples: Ném 404 khi ngữ pháp không tồn tại")
    void testGetExamples_GrammarNotFound() throws Exception {
        when(adminGrammarService.getExamples(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy ngữ pháp với ID: 999"));

        mockMvc.perform(get("/api/v1/admin/grammars/999/examples"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy ngữ pháp với ID: 999")));
    }

    @Test
    @DisplayName("Admin POST /api/v1/admin/grammars/{grammarId}/examples: Tạo ví dụ thành công trả về 201")
    void testCreateExample_Success() throws Exception {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest(
                "わたしはがくせいです。", "わたしはがくせいです。", "Tôi là học sinh.", "Giải thích", 1
        );

        when(adminGrammarService.createExample(eq(10L), any(AdminGrammarExampleRequest.class)))
                .thenReturn(sampleExampleResponse);

        mockMvc.perform(post("/api/v1/admin/grammars/10/examples")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tạo ví dụ thành công")))
                .andExpect(jsonPath("$.data.id", is(100)));

        verify(adminGrammarService).createExample(eq(10L), any(AdminGrammarExampleRequest.class));
    }

    @Test
    @DisplayName("Admin POST example: Trả về 400 khi câu tiếng Nhật để trống")
    void testCreateExample_BlankJapanese_Returns400() throws Exception {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest(
                "   ", null, "Dịch", null, 1
        );

        mockMvc.perform(post("/api/v1/admin/grammars/10/examples")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Câu tiếng Nhật không được để trống")));
    }

    @Test
    @DisplayName("Admin POST example: Trả về 400 khi sortOrder là số âm")
    void testCreateExample_NegativeSortOrder_Returns400() throws Exception {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest(
                "テスト", null, null, null, -1
        );

        mockMvc.perform(post("/api/v1/admin/grammars/10/examples")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")));
    }

    @Test
    @DisplayName("Admin PUT /api/v1/admin/grammars/{grammarId}/examples/{exampleId}: Cập nhật ví dụ thành công")
    void testUpdateExample_Success() throws Exception {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest(
                "わたしはせんせいです。", null, "Tôi là giáo viên.", null, 1
        );

        when(adminGrammarService.updateExample(eq(10L), eq(100L), any(AdminGrammarExampleRequest.class)))
                .thenReturn(sampleExampleResponse);

        mockMvc.perform(put("/api/v1/admin/grammars/10/examples/100")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Cập nhật ví dụ thành công")));

        verify(adminGrammarService).updateExample(eq(10L), eq(100L), any(AdminGrammarExampleRequest.class));
    }

    @Test
    @DisplayName("Admin PUT example: Ném 404 khi ví dụ không thuộc ngữ pháp (scoping check)")
    void testUpdateExample_WrongGrammar_Returns404() throws Exception {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest(
                "テスト", null, null, null, 1
        );

        when(adminGrammarService.updateExample(eq(10L), eq(200L), any(AdminGrammarExampleRequest.class)))
                .thenThrow(new ResourceNotFoundException("Ví dụ ID: 200 không thuộc ngữ pháp ID: 10"));

        mockMvc.perform(put("/api/v1/admin/grammars/10/examples/200")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Ví dụ ID: 200 không thuộc ngữ pháp ID: 10")));
    }

    @Test
    @DisplayName("Admin DELETE /api/v1/admin/grammars/{grammarId}/examples/{exampleId}: Xóa ví dụ thành công")
    void testDeleteExample_Success() throws Exception {
        doNothing().when(adminGrammarService).deleteExample(10L, 100L);

        mockMvc.perform(delete("/api/v1/admin/grammars/10/examples/100"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Xóa ví dụ thành công")));

        verify(adminGrammarService).deleteExample(10L, 100L);
    }

    @Test
    @DisplayName("Admin DELETE example: Ném 404 khi ví dụ không thuộc ngữ pháp (scoping check)")
    void testDeleteExample_WrongGrammar_Returns404() throws Exception {
        doThrow(new ResourceNotFoundException("Ví dụ ID: 200 không thuộc ngữ pháp ID: 10"))
                .when(adminGrammarService).deleteExample(10L, 200L);

        mockMvc.perform(delete("/api/v1/admin/grammars/10/examples/200"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Ví dụ ID: 200 không thuộc ngữ pháp ID: 10")));
    }
}
