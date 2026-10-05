package com.japanese.learning.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.dto.AdminReadingOptionRequest;
import com.japanese.learning.admin.dto.AdminReadingOptionResponse;
import com.japanese.learning.admin.dto.AdminReadingQuestionRequest;
import com.japanese.learning.admin.dto.AdminReadingQuestionResponse;
import com.japanese.learning.admin.dto.AdminReadingRequest;
import com.japanese.learning.admin.dto.AdminReadingResponse;
import com.japanese.learning.admin.service.AdminReadingService;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.enums.QuestionType;
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
class AdminReadingControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private AdminReadingService adminReadingService;

    @InjectMocks
    private AdminReadingController adminReadingController;

    private AdminReadingResponse sampleResponse;
    private AdminReadingQuestionResponse sampleQuestionResponse;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(adminReadingController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        AdminReadingOptionResponse opt = new AdminReadingOptionResponse(101L, 201L, "Tokyo", true, 1);
        sampleQuestionResponse = new AdminReadingQuestionResponse(
                201L, 1L, "Thủ đô Nhật?", QuestionType.MULTIPLE_CHOICE, "Tokyo là thủ đô.", "/img/q.png", 1, List.of(opt)
        );

        sampleResponse = new AdminReadingResponse(
                1L, 10L, 1, "N5", "Đất nước Nhật Bản", "Nội dung...", "Bản dịch...", "/img/r.png", 1, List.of(sampleQuestionResponse)
        );
    }

    // ==========================================
    // GET /api/v1/admin/readings
    // ==========================================

    @Test
    @DisplayName("GET /api/v1/admin/readings: Lấy tất cả bài đọc thành công khi không có lessonId")
    void testGetReadings_WithoutLessonId_Success() throws Exception {
        when(adminReadingService.getReadings(null)).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/admin/readings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách bài đọc thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].title", is("Đất nước Nhật Bản")));

        verify(adminReadingService).getReadings(null);
    }

    @Test
    @DisplayName("GET /api/v1/admin/readings?lessonId=10: Lọc theo bài học thành công")
    void testGetReadings_WithLessonId_Success() throws Exception {
        when(adminReadingService.getReadings(10L)).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/admin/readings").param("lessonId", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].lessonId", is(10)));

        verify(adminReadingService).getReadings(10L);
    }

    @Test
    @DisplayName("GET /api/v1/admin/readings?lessonId=99: Bài học không tồn tại trả về 404")
    void testGetReadings_LessonNotFound() throws Exception {
        when(adminReadingService.getReadings(99L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 99"));

        mockMvc.perform(get("/api/v1/admin/readings").param("lessonId", "99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với ID: 99")));
    }

    @Test
    @DisplayName("GET /api/v1/admin/readings?lessonId=abc: Kiểu dữ liệu lessonId không hợp lệ trả về 400")
    void testGetReadings_TypeMismatchLessonId() throws Exception {
        mockMvc.perform(get("/api/v1/admin/readings").param("lessonId", "invalid-id"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Tham số request không hợp lệ")));
    }

    // ==========================================
    // GET /api/v1/admin/readings/{id}
    // ==========================================

    @Test
    @DisplayName("GET /api/v1/admin/readings/1: Lấy chi tiết bài đọc thành công (kèm đáp án đúng)")
    void testGetReadingById_Success() throws Exception {
        when(adminReadingService.getReadingById(1L)).thenReturn(sampleResponse);

        mockMvc.perform(get("/api/v1/admin/readings/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy thông tin bài đọc thành công")))
                .andExpect(jsonPath("$.data.id", is(1)))
                .andExpect(jsonPath("$.data.questions[0].explanation", is("Tokyo là thủ đô.")))
                .andExpect(jsonPath("$.data.questions[0].options[0].correct", is(true)));

        verify(adminReadingService).getReadingById(1L);
    }

    @Test
    @DisplayName("GET /api/v1/admin/readings/99: Bài đọc không tồn tại trả về 404")
    void testGetReadingById_NotFound() throws Exception {
        when(adminReadingService.getReadingById(99L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài đọc với ID: 99"));

        mockMvc.perform(get("/api/v1/admin/readings/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài đọc với ID: 99")));
    }

    @Test
    @DisplayName("GET /api/v1/admin/readings/invalid-id: ID không phải số trả về 400")
    void testGetReadingById_TypeMismatch() throws Exception {
        mockMvc.perform(get("/api/v1/admin/readings/invalid-id"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Tham số request không hợp lệ")));
    }

    // ==========================================
    // POST /api/v1/admin/readings
    // ==========================================

    @Test
    @DisplayName("POST /api/v1/admin/readings: Tạo bài đọc thành công trả về 201")
    void testCreateReading_Success() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(
                10L, "Bài đọc mới", "Nội dung mới...", "Bản dịch...", null, 1, Collections.emptyList()
        );

        when(adminReadingService.createReading(any(AdminReadingRequest.class))).thenReturn(sampleResponse);

        mockMvc.perform(post("/api/v1/admin/readings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tạo bài đọc thành công")))
                .andExpect(jsonPath("$.data.id", is(1)));

        verify(adminReadingService).createReading(any(AdminReadingRequest.class));
    }

    @Test
    @DisplayName("POST /api/v1/admin/readings: Thiếu lessonId trả về 400")
    void testCreateReading_MissingLessonId() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(
                null, "Tiêu đề", "Nội dung", null, null, 1, null
        );

        mockMvc.perform(post("/api/v1/admin/readings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("POST /api/v1/admin/readings: Tiêu đề trống trả về 400")
    void testCreateReading_BlankTitle() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(
                10L, "   ", "Nội dung", null, null, 1, null
        );

        mockMvc.perform(post("/api/v1/admin/readings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("POST /api/v1/admin/readings: Nội dung trống trả về 400")
    void testCreateReading_BlankContent() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(
                10L, "Tiêu đề", "  ", null, null, 1, null
        );

        mockMvc.perform(post("/api/v1/admin/readings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("POST /api/v1/admin/readings: sortOrder âm trả về 400")
    void testCreateReading_NegativeSortOrder() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(
                10L, "Tiêu đề", "Nội dung", null, null, -1, null
        );

        mockMvc.perform(post("/api/v1/admin/readings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("POST /api/v1/admin/readings: Bài học không tồn tại trả về 404")
    void testCreateReading_LessonNotFound() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(
                99L, "Tiêu đề", "Nội dung", null, null, 1, null
        );

        when(adminReadingService.createReading(any(AdminReadingRequest.class)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với ID: 99"));

        mockMvc.perform(post("/api/v1/admin/readings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với ID: 99")));
    }

    // ==========================================
    // PUT /api/v1/admin/readings/{id}
    // ==========================================

    @Test
    @DisplayName("PUT /api/v1/admin/readings/1: Cập nhật thành công trả về 200")
    void testUpdateReading_Success() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(
                10L, "Tiêu đề cập nhật", "Nội dung cập nhật", null, null, 2, null
        );

        when(adminReadingService.updateReading(eq(1L), any(AdminReadingRequest.class))).thenReturn(sampleResponse);

        mockMvc.perform(put("/api/v1/admin/readings/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Cập nhật bài đọc thành công")));

        verify(adminReadingService).updateReading(eq(1L), any(AdminReadingRequest.class));
    }

    @Test
    @DisplayName("PUT /api/v1/admin/readings/99: Cập nhật bài đọc không tồn tại trả về 404")
    void testUpdateReading_NotFound() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(
                10L, "Tiêu đề", "Nội dung", null, null, 1, null
        );

        when(adminReadingService.updateReading(eq(99L), any(AdminReadingRequest.class)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài đọc với ID: 99"));

        mockMvc.perform(put("/api/v1/admin/readings/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài đọc với ID: 99")));
    }

    @Test
    @DisplayName("PUT /api/v1/admin/readings/invalid-id: ID sai định dạng trả về 400")
    void testUpdateReading_TypeMismatch() throws Exception {
        AdminReadingRequest req = new AdminReadingRequest(
                10L, "Tiêu đề", "Nội dung", null, null, 1, null
        );

        mockMvc.perform(put("/api/v1/admin/readings/invalid-id")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==========================================
    // DELETE /api/v1/admin/readings/{id}
    // ==========================================

    @Test
    @DisplayName("DELETE /api/v1/admin/readings/1: Xóa bài đọc thành công trả về 200")
    void testDeleteReading_Success() throws Exception {
        doNothing().when(adminReadingService).deleteReading(1L);

        mockMvc.perform(delete("/api/v1/admin/readings/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Xóa bài đọc thành công")));

        verify(adminReadingService).deleteReading(1L);
    }

    @Test
    @DisplayName("DELETE /api/v1/admin/readings/99: Xóa bài đọc không tồn tại trả về 404")
    void testDeleteReading_NotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy bài đọc với ID: 99"))
                .when(adminReadingService).deleteReading(99L);

        mockMvc.perform(delete("/api/v1/admin/readings/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài đọc với ID: 99")));
    }

    @Test
    @DisplayName("DELETE /api/v1/admin/readings/invalid-id: ID không phải số trả về 400")
    void testDeleteReading_TypeMismatch() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/readings/invalid-id"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==========================================
    // Nested Questions Endpoints
    // ==========================================

    @Test
    @DisplayName("GET /api/v1/admin/readings/1/questions: Lấy danh sách câu hỏi thành công")
    void testGetQuestions_Success() throws Exception {
        when(adminReadingService.getQuestions(1L)).thenReturn(List.of(sampleQuestionResponse));

        mockMvc.perform(get("/api/v1/admin/readings/1/questions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách câu hỏi thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(201)));

        verify(adminReadingService).getQuestions(1L);
    }

    @Test
    @DisplayName("GET /api/v1/admin/readings/99/questions: Bài đọc không tồn tại trả về 404")
    void testGetQuestions_NotFound() throws Exception {
        when(adminReadingService.getQuestions(99L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài đọc với ID: 99"));

        mockMvc.perform(get("/api/v1/admin/readings/99/questions"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài đọc với ID: 99")));
    }

    @Test
    @DisplayName("POST /api/v1/admin/readings/1/questions: Tạo câu hỏi thành công trả về 201")
    void testCreateQuestion_Success() throws Exception {
        AdminReadingOptionRequest opt = new AdminReadingOptionRequest("Tokyo", true, 1);
        AdminReadingQuestionRequest req = new AdminReadingQuestionRequest(
                "Thủ đô là gì?", QuestionType.MULTIPLE_CHOICE, "Giải thích", null, 1, List.of(opt)
        );

        when(adminReadingService.createQuestion(eq(1L), any(AdminReadingQuestionRequest.class)))
                .thenReturn(sampleQuestionResponse);

        mockMvc.perform(post("/api/v1/admin/readings/1/questions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tạo câu hỏi thành công")))
                .andExpect(jsonPath("$.data.id", is(201)));

        verify(adminReadingService).createQuestion(eq(1L), any(AdminReadingQuestionRequest.class));
    }

    @Test
    @DisplayName("POST /api/v1/admin/readings/1/questions: Câu hỏi trống trả về 400")
    void testCreateQuestion_BlankQuestion() throws Exception {
        AdminReadingQuestionRequest req = new AdminReadingQuestionRequest(
                "   ", QuestionType.MULTIPLE_CHOICE, null, null, 1, null
        );

        mockMvc.perform(post("/api/v1/admin/readings/1/questions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("POST /api/v1/admin/readings/1/questions: Thiếu questionType trả về 400")
    void testCreateQuestion_NullQuestionType() throws Exception {
        String invalidJson = "{\"question\": \"Câu hỏi?\", \"sortOrder\": 1}";

        mockMvc.perform(post("/api/v1/admin/readings/1/questions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("PUT /api/v1/admin/readings/1/questions/201: Cập nhật câu hỏi thành công trả về 200")
    void testUpdateQuestion_Success() throws Exception {
        AdminReadingOptionRequest opt = new AdminReadingOptionRequest("Tokyo", true, 1);
        AdminReadingQuestionRequest req = new AdminReadingQuestionRequest(
                "Thủ đô là gì?", QuestionType.MULTIPLE_CHOICE, "Giải thích mới", null, 1, List.of(opt)
        );

        when(adminReadingService.updateQuestion(eq(1L), eq(201L), any(AdminReadingQuestionRequest.class)))
                .thenReturn(sampleQuestionResponse);

        mockMvc.perform(put("/api/v1/admin/readings/1/questions/201")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Cập nhật câu hỏi thành công")));

        verify(adminReadingService).updateQuestion(eq(1L), eq(201L), any(AdminReadingQuestionRequest.class));
    }

    @Test
    @DisplayName("PUT /api/v1/admin/readings/1/questions/999: Câu hỏi không tồn tại trả về 404")
    void testUpdateQuestion_NotFound() throws Exception {
        AdminReadingQuestionRequest req = new AdminReadingQuestionRequest(
                "Câu hỏi?", QuestionType.MULTIPLE_CHOICE, null, null, 1, null
        );

        when(adminReadingService.updateQuestion(eq(1L), eq(999L), any(AdminReadingQuestionRequest.class)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy câu hỏi với ID: 999"));

        mockMvc.perform(put("/api/v1/admin/readings/1/questions/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy câu hỏi với ID: 999")));
    }

    @Test
    @DisplayName("DELETE /api/v1/admin/readings/1/questions/201: Xóa câu hỏi thành công trả về 200")
    void testDeleteQuestion_Success() throws Exception {
        doNothing().when(adminReadingService).deleteQuestion(1L, 201L);

        mockMvc.perform(delete("/api/v1/admin/readings/1/questions/201"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Xóa câu hỏi thành công")));

        verify(adminReadingService).deleteQuestion(1L, 201L);
    }

    @Test
    @DisplayName("DELETE /api/v1/admin/readings/1/questions/999: Xóa câu hỏi không tồn tại trả về 404")
    void testDeleteQuestion_NotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy câu hỏi với ID: 999"))
                .when(adminReadingService).deleteQuestion(1L, 999L);

        mockMvc.perform(delete("/api/v1/admin/readings/1/questions/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy câu hỏi với ID: 999")));
    }
}
