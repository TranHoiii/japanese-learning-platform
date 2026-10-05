package com.japanese.learning.grammar.controller;

import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.grammar.dto.GrammarExampleResponse;
import com.japanese.learning.grammar.dto.GrammarResponse;
import com.japanese.learning.grammar.service.GrammarService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class GrammarControllerTest {

    private MockMvc mockMvc;

    @Mock
    private GrammarService grammarService;

    @InjectMocks
    private GrammarController grammarController;

    private GrammarResponse sampleGrammar;
    private GrammarExampleResponse sampleExample;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(grammarController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        sampleExample = new GrammarExampleResponse(
                10L,
                "わたしはがくせいです。",
                "わたしはがくせいです。",
                "Tôi là học sinh.",
                "Giải thích mẫu câu",
                1
        );

        sampleGrammar = new GrammarResponse(
                1L,
                10L,
                "～は～です",
                "Là...",
                "N1 は N2 です",
                "Cấu trúc khẳng định",
                "Ghi chú",
                1,
                List.of(sampleExample)
        );
    }

    @Test
    @DisplayName("GET /api/v1/grammars?lessonId=10: Lấy danh sách ngữ pháp theo bài học")
    void testGetGrammars_WithLessonId_Returns200AndList() throws Exception {
        when(grammarService.getByLessonId(10L)).thenReturn(List.of(sampleGrammar));

        mockMvc.perform(get("/api/v1/grammars").param("lessonId", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách ngữ pháp thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].pattern", is("～は～です")))
                .andExpect(jsonPath("$.data[0].examples", hasSize(1)))
                .andExpect(jsonPath("$.data[0].examples[0].japanese", is("わたしはがくせいです。")));

        verify(grammarService).getByLessonId(10L);
    }

    @Test
    @DisplayName("GET /api/v1/grammars: Không truyền lessonId trả về danh sách rỗng")
    void testGetGrammars_WithoutLessonId_Returns200AndEmptyList() throws Exception {
        mockMvc.perform(get("/api/v1/grammars"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách ngữ pháp thành công")))
                .andExpect(jsonPath("$.data", hasSize(0)));
    }

    @Test
    @DisplayName("GET /api/v1/grammars?lessonId=999: Ném 404 khi bài học không tồn tại")
    void testGetGrammars_LessonNotFound_Returns404() throws Exception {
        when(grammarService.getByLessonId(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với id: 999"));

        mockMvc.perform(get("/api/v1/grammars").param("lessonId", "999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với id: 999")));

        verify(grammarService).getByLessonId(999L);
    }

    @Test
    @DisplayName("GET /api/v1/grammars/{id}: Lấy chi tiết mẫu ngữ pháp thành công")
    void testGetById_Success() throws Exception {
        when(grammarService.getById(1L)).thenReturn(sampleGrammar);

        mockMvc.perform(get("/api/v1/grammars/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy mẫu ngữ pháp thành công")))
                .andExpect(jsonPath("$.data.id", is(1)))
                .andExpect(jsonPath("$.data.pattern", is("～は～です")))
                .andExpect(jsonPath("$.data.meaning", is("Là...")))
                .andExpect(jsonPath("$.data.usage", is("N1 は N2 です")))
                .andExpect(jsonPath("$.data.sortOrder", is(1)));

        verify(grammarService).getById(1L);
    }

    @Test
    @DisplayName("GET /api/v1/grammars/{id}: Ném 404 khi ID không tồn tại")
    void testGetById_NotFound_Returns404() throws Exception {
        when(grammarService.getById(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy mẫu ngữ pháp với id: 999"));

        mockMvc.perform(get("/api/v1/grammars/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy mẫu ngữ pháp với id: 999")));

        verify(grammarService).getById(999L);
    }

    @Test
    @DisplayName("GET /api/v1/grammars/{id}: Trả về 400 khi ID không phải số hợp lệ")
    void testGetById_TypeMismatch_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/grammars/invalid"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Tham số request không hợp lệ")));
    }

    @Test
    @DisplayName("GET /api/v1/grammars/{id}/examples: Lấy danh sách ví dụ thành công")
    void testGetExamplesByGrammarId_Success() throws Exception {
        when(grammarService.getExamplesByGrammarId(1L)).thenReturn(List.of(sampleExample));

        mockMvc.perform(get("/api/v1/grammars/1/examples"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách ví dụ ngữ pháp thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(10)))
                .andExpect(jsonPath("$.data[0].japanese", is("わたしはがくせいです。")));

        verify(grammarService).getExamplesByGrammarId(1L);
    }

    @Test
    @DisplayName("GET /api/v1/grammars/{id}/examples: Ném 404 khi ngữ pháp không tồn tại")
    void testGetExamplesByGrammarId_NotFound_Returns404() throws Exception {
        when(grammarService.getExamplesByGrammarId(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy mẫu ngữ pháp với id: 999"));

        mockMvc.perform(get("/api/v1/grammars/999/examples"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy mẫu ngữ pháp với id: 999")));

        verify(grammarService).getExamplesByGrammarId(999L);
    }

    @Test
    @DisplayName("GET /api/v1/grammars/{id}/examples: Trả về 400 khi ID kiểu không hợp lệ")
    void testGetExamplesByGrammarId_TypeMismatch_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/grammars/abc/examples"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Tham số request không hợp lệ")));
    }

    @Test
    @DisplayName("GET /api/v1/grammars/{id}: Phản hồi chuẩn không để lộ các trường thực thể nội bộ")
    void testResponseContract_NoInternalFieldsExposed() throws Exception {
        when(grammarService.getById(1L)).thenReturn(sampleGrammar);

        mockMvc.perform(get("/api/v1/grammars/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.createdAt").doesNotExist())
                .andExpect(jsonPath("$.data.updatedAt").doesNotExist())
                .andExpect(jsonPath("$.data.password").doesNotExist())
                .andExpect(jsonPath("$.data.lesson").doesNotExist())
                .andExpect(jsonPath("$.data.id").exists())
                .andExpect(jsonPath("$.data.lessonId").exists())
                .andExpect(jsonPath("$.data.pattern").exists());
    }
}
