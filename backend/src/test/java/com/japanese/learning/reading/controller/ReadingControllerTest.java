package com.japanese.learning.reading.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.enums.QuestionType;
import com.japanese.learning.reading.dto.ReadingAnswerRequest;
import com.japanese.learning.reading.dto.ReadingContentResponse;
import com.japanese.learning.reading.dto.ReadingOptionResponse;
import com.japanese.learning.reading.dto.ReadingQuestionResponse;
import com.japanese.learning.reading.dto.ReadingQuestionResultResponse;
import com.japanese.learning.reading.dto.ReadingSubmitRequest;
import com.japanese.learning.reading.dto.ReadingSubmitResponse;
import com.japanese.learning.reading.service.ReadingService;
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
import static org.hamcrest.Matchers.nullValue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ReadingControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private ReadingService readingService;

    @InjectMocks
    private ReadingController readingController;

    private ReadingContentResponse sampleReadingResponse;
    private ReadingSubmitResponse sampleSubmitResponse;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(readingController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        ReadingOptionResponse opt1 = ReadingOptionResponse.builder()
                .id(101L)
                .content("Tokyo")
                .sortOrder(1)
                .build();

        ReadingOptionResponse opt2 = ReadingOptionResponse.builder()
                .id(102L)
                .content("Osaka")
                .sortOrder(2)
                .build();

        ReadingQuestionResponse q1 = ReadingQuestionResponse.builder()
                .id(201L)
                .question("Thủ đô của Nhật Bản?")
                .questionType(QuestionType.MULTIPLE_CHOICE)
                .imageUrl("/images/reading/q1.png")
                .sortOrder(1)
                .options(List.of(opt1, opt2))
                .build();

        sampleReadingResponse = ReadingContentResponse.builder()
                .id(1L)
                .lessonId(10L)
                .title("Đất nước Nhật Bản")
                .content("Nhật Bản có thủ đô là Tokyo...")
                .translation("Japan has capital Tokyo...")
                .imageUrl("/images/reading/reading1.png")
                .sortOrder(1)
                .questions(List.of(q1))
                .build();

        ReadingQuestionResultResponse res1 = ReadingQuestionResultResponse.builder()
                .questionId(201L)
                .isCorrect(true)
                .selectedOptionId(101L)
                .correctOptionId(101L)
                .explanation("Tokyo là thủ đô.")
                .build();

        sampleSubmitResponse = ReadingSubmitResponse.builder()
                .score(100)
                .totalQuestions(1)
                .correctCount(1)
                .wrongCount(0)
                .results(List.of(res1))
                .build();
    }

    // ==========================================
    // GET /api/v1/readings
    // ==========================================

    @Test
    @DisplayName("GET /api/v1/readings?lessonId=10: Thành công trả về danh sách bài đọc")
    void testGetReadings_WithLessonId_Success() throws Exception {
        when(readingService.getReadingsByLessonId(10L)).thenReturn(List.of(sampleReadingResponse));

        mockMvc.perform(get("/api/v1/readings").param("lessonId", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách bài đọc thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].title", is("Đất nước Nhật Bản")))
                .andExpect(jsonPath("$.data[0].lessonId", is(10)));

        verify(readingService).getReadingsByLessonId(10L);
    }

    @Test
    @DisplayName("GET /api/v1/readings?lessonId=10: Trả về danh sách rỗng khi không có bài đọc")
    void testGetReadings_WithLessonId_Empty() throws Exception {
        when(readingService.getReadingsByLessonId(10L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/readings").param("lessonId", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(0)));
    }

    @Test
    @DisplayName("GET /api/v1/readings: Không truyền lessonId trả về danh sách rỗng thành công")
    void testGetReadings_WithoutLessonId_ReturnsEmptyList() throws Exception {
        mockMvc.perform(get("/api/v1/readings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách bài đọc thành công")))
                .andExpect(jsonPath("$.data", hasSize(0)));
    }

    @Test
    @DisplayName("GET /api/v1/readings?lessonId=99: Bài học không tồn tại trả về 404")
    void testGetReadings_LessonNotFound() throws Exception {
        when(readingService.getReadingsByLessonId(99L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với id: 99"));

        mockMvc.perform(get("/api/v1/readings").param("lessonId", "99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với id: 99")));
    }

    @Test
    @DisplayName("GET /api/v1/readings?lessonId=abc: Kiểu dữ liệu lessonId không đúng trả về 400")
    void testGetReadings_TypeMismatchLessonId() throws Exception {
        mockMvc.perform(get("/api/v1/readings").param("lessonId", "invalid-id"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Tham số request không hợp lệ")));
    }

    // ==========================================
    // GET /api/v1/readings/{id}
    // ==========================================

    @Test
    @DisplayName("GET /api/v1/readings/1: Thành công trả về thông tin bài đọc chi tiết")
    void testGetById_Success() throws Exception {
        when(readingService.getReadingById(1L)).thenReturn(sampleReadingResponse);

        mockMvc.perform(get("/api/v1/readings/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy thông tin bài đọc thành công")))
                .andExpect(jsonPath("$.data.id", is(1)))
                .andExpect(jsonPath("$.data.title", is("Đất nước Nhật Bản")))
                .andExpect(jsonPath("$.data.content", is("Nhật Bản có thủ đô là Tokyo...")))
                .andExpect(jsonPath("$.data.translation", is("Japan has capital Tokyo...")))
                .andExpect(jsonPath("$.data.imageUrl", is("/images/reading/reading1.png")))
                .andExpect(jsonPath("$.data.questions", hasSize(1)))
                .andExpect(jsonPath("$.data.questions[0].id", is(201)))
                .andExpect(jsonPath("$.data.questions[0].question", is("Thủ đô của Nhật Bản?")))
                .andExpect(jsonPath("$.data.questions[0].questionType", is("MULTIPLE_CHOICE")))
                .andExpect(jsonPath("$.data.questions[0].options", hasSize(2)))
                .andExpect(jsonPath("$.data.questions[0].options[0].id", is(101)))
                .andExpect(jsonPath("$.data.questions[0].options[0].content", is("Tokyo")));

        verify(readingService).getReadingById(1L);
    }

    @Test
    @DisplayName("GET /api/v1/readings/1: Bảo mật - Không để lộ đáp án đúng hoặc giải thích trước khi submit")
    void testGetById_Security_NoAnswerLeakage() throws Exception {
        when(readingService.getReadingById(1L)).thenReturn(sampleReadingResponse);

        mockMvc.perform(get("/api/v1/readings/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.questions[0].explanation").doesNotExist())
                .andExpect(jsonPath("$.data.questions[0].options[0].correct").doesNotExist())
                .andExpect(jsonPath("$.data.questions[0].options[0].isCorrect").doesNotExist())
                .andExpect(jsonPath("$.data.questions[0].options[1].correct").doesNotExist());
    }

    @Test
    @DisplayName("GET /api/v1/readings/99: Bài đọc không tồn tại trả về 404")
    void testGetById_NotFound() throws Exception {
        when(readingService.getReadingById(99L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài đọc với id: 99"));

        mockMvc.perform(get("/api/v1/readings/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài đọc với id: 99")));
    }

    @Test
    @DisplayName("GET /api/v1/readings/invalid-id: ID không phải số nguyên trả về 400")
    void testGetById_TypeMismatch() throws Exception {
        mockMvc.perform(get("/api/v1/readings/invalid-id"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Tham số request không hợp lệ")));
    }

    // ==========================================
    // POST /api/v1/readings/{id}/submit
    // ==========================================

    @Test
    @DisplayName("POST /api/v1/readings/1/submit: Nộp bài thành công trả về 200 và kết quả chấm điểm")
    void testSubmitReading_Success() throws Exception {
        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, 101L)
        ));

        when(readingService.submitReading(eq(1L), any(ReadingSubmitRequest.class)))
                .thenReturn(sampleSubmitResponse);

        mockMvc.perform(post("/api/v1/readings/1/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Nộp bài đọc thành công")))
                .andExpect(jsonPath("$.data.score", is(100)))
                .andExpect(jsonPath("$.data.totalQuestions", is(1)))
                .andExpect(jsonPath("$.data.correctCount", is(1)))
                .andExpect(jsonPath("$.data.wrongCount", is(0)))
                .andExpect(jsonPath("$.data.results", hasSize(1)))
                .andExpect(jsonPath("$.data.results[0].questionId", is(201)))
                .andExpect(jsonPath("$.data.results[0].isCorrect", is(true)))
                .andExpect(jsonPath("$.data.results[0].selectedOptionId", is(101)))
                .andExpect(jsonPath("$.data.results[0].correctOptionId", is(101)))
                .andExpect(jsonPath("$.data.results[0].explanation", is("Tokyo là thủ đô.")));

        verify(readingService).submitReading(eq(1L), any(ReadingSubmitRequest.class));
    }

    @Test
    @DisplayName("POST /api/v1/readings/1/submit: Request rỗng không có answers trả về 400")
    void testSubmitReading_EmptyAnswers() throws Exception {
        String emptyJson = "{\"answers\": []}";

        mockMvc.perform(post("/api/v1/readings/1/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(emptyJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Danh sách câu trả lời không được để trống")));
    }

    @Test
    @DisplayName("POST /api/v1/readings/1/submit: Request thiếu answers trả về 400")
    void testSubmitReading_NullAnswers() throws Exception {
        String nullAnswersJson = "{}";

        mockMvc.perform(post("/api/v1/readings/1/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(nullAnswersJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("POST /api/v1/readings/1/submit: answer có questionId null trả về 400")
    void testSubmitReading_NullQuestionIdInAnswer() throws Exception {
        String invalidJson = "{\"answers\": [{\"questionId\": null, \"selectedOptionId\": 101}]}";

        mockMvc.perform(post("/api/v1/readings/1/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("POST /api/v1/readings/1/submit: answer có questionId không dương trả về 400")
    void testSubmitReading_NonPositiveQuestionIdInAnswer() throws Exception {
        String invalidJson = "{\"answers\": [{\"questionId\": -1, \"selectedOptionId\": 101}]}";

        mockMvc.perform(post("/api/v1/readings/1/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("POST /api/v1/readings/99/submit: Bài đọc không tồn tại trả về 404")
    void testSubmitReading_ReadingNotFound() throws Exception {
        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, 101L)
        ));

        when(readingService.submitReading(eq(99L), any(ReadingSubmitRequest.class)))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài đọc với id: 99"));

        mockMvc.perform(post("/api/v1/readings/99/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài đọc với id: 99")));
    }

    @Test
    @DisplayName("POST /api/v1/readings/1/submit: Câu hỏi không thuộc bài đọc trả về 404")
    void testSubmitReading_QuestionNotBelongToReading() throws Exception {
        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(999L, 101L)
        ));

        when(readingService.submitReading(eq(1L), any(ReadingSubmitRequest.class)))
                .thenThrow(new ResourceNotFoundException("Câu hỏi id 999 không thuộc bài đọc này"));

        mockMvc.perform(post("/api/v1/readings/1/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Câu hỏi id 999 không thuộc bài đọc này")));
    }

    @Test
    @DisplayName("POST /api/v1/readings/1/submit: Option không thuộc câu hỏi trả về 400")
    void testSubmitReading_OptionNotBelongToQuestion() throws Exception {
        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, 999L)
        ));

        when(readingService.submitReading(eq(1L), any(ReadingSubmitRequest.class)))
                .thenThrow(new IllegalArgumentException("Lựa chọn id 999 không thuộc câu hỏi id 201"));

        mockMvc.perform(post("/api/v1/readings/1/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Lựa chọn id 999 không thuộc câu hỏi id 201")));
    }
}
