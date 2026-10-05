package com.japanese.learning.vocabulary.controller;

import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.vocabulary.dto.VocabularyResponse;
import com.japanese.learning.vocabulary.service.VocabularyService;
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
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class VocabularyControllerTest {

    private MockMvc mockMvc;

    @Mock
    private VocabularyService vocabularyService;

    @InjectMocks
    private VocabularyController vocabularyController;

    private VocabularyResponse sampleResponse;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(vocabularyController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        sampleResponse = new VocabularyResponse(
                1L,
                10L,
                "ねこ",
                "猫",
                "Miêu",
                "Con mèo",
                "Danh từ",
                "/audio/neko.mp3",
                "Từ vựng N5 phổ biến"
        );
    }

    @Test
    @DisplayName("GET /api/v1/vocabularies: Lấy tất cả từ vựng khi không truyền query param q")
    void testGetAll_NoQueryParam_Returns200AndList() throws Exception {
        when(vocabularyService.getAll()).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/vocabularies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy tất cả từ vựng thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].lessonId", is(10)))
                .andExpect(jsonPath("$.data[0].hiragana", is("ねこ")))
                .andExpect(jsonPath("$.data[0].kanji", is("猫")))
                .andExpect(jsonPath("$.data[0].hanViet", is("Miêu")))
                .andExpect(jsonPath("$.data[0].meaning", is("Con mèo")))
                .andExpect(jsonPath("$.data[0].partOfSpeech", is("Danh từ")))
                .andExpect(jsonPath("$.data[0].audioUrl", is("/audio/neko.mp3")))
                .andExpect(jsonPath("$.data[0].notes", is("Từ vựng N5 phổ biến")));

        verify(vocabularyService).getAll();
    }

    @Test
    @DisplayName("GET /api/v1/vocabularies: Trả về danh sách rỗng khi không có từ vựng")
    void testGetAll_EmptyList_Returns200() throws Exception {
        when(vocabularyService.getAll()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/vocabularies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy tất cả từ vựng thành công")))
                .andExpect(jsonPath("$.data", hasSize(0)));

        verify(vocabularyService).getAll();
    }

    @Test
    @DisplayName("GET /api/v1/vocabularies?q=ねこ: Tìm kiếm từ vựng qua query param q")
    void testGetAll_WithQueryParam_CallsSearch_Returns200() throws Exception {
        when(vocabularyService.search("ねこ")).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/vocabularies").param("q", "ねこ"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tìm kiếm từ vựng thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].hiragana", is("ねこ")));

        verify(vocabularyService).search("ねこ");
    }

    @Test
    @DisplayName("GET /api/v1/vocabularies?q=  : Khi q chỉ chứa khoảng trắng thì gọi getAll")
    void testGetAll_WithBlankQueryParam_CallsGetAll() throws Exception {
        when(vocabularyService.getAll()).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/vocabularies").param("q", "   "))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy tất cả từ vựng thành công")));

        verify(vocabularyService).getAll();
    }

    @Test
    @DisplayName("GET /api/v1/vocabularies/search?q=ねこ: Tìm kiếm qua endpoint riêng")
    void testSearch_WithQuery_Returns200AndResults() throws Exception {
        when(vocabularyService.search("ねこ")).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/vocabularies/search").param("q", "ねこ"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tìm kiếm từ vựng thành công")))
                .andExpect(jsonPath("$.data[0].hiragana", is("ねこ")));

        verify(vocabularyService).search("ねこ");
    }

    @Test
    @DisplayName("GET /api/v1/vocabularies/search: Tìm kiếm không truyền q trả về danh sách rỗng")
    void testSearch_WithoutQuery_Returns200AndEmptyList() throws Exception {
        when(vocabularyService.search(null)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/vocabularies/search"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tìm kiếm từ vựng thành công")))
                .andExpect(jsonPath("$.data", hasSize(0)));

        verify(vocabularyService).search(null);
    }

    @Test
    @DisplayName("GET /api/v1/vocabularies/{id}: Lấy chi tiết từ vựng thành công")
    void testGetById_Success() throws Exception {
        when(vocabularyService.getById(1L)).thenReturn(sampleResponse);

        mockMvc.perform(get("/api/v1/vocabularies/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy từ vựng thành công")))
                .andExpect(jsonPath("$.data.id", is(1)))
                .andExpect(jsonPath("$.data.hiragana", is("ねこ")))
                .andExpect(jsonPath("$.data.meaning", is("Con mèo")));

        verify(vocabularyService).getById(1L);
    }

    @Test
    @DisplayName("GET /api/v1/vocabularies/{id}: Ném 404 khi ID không tồn tại")
    void testGetById_NotFound_Returns404() throws Exception {
        when(vocabularyService.getById(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy từ vựng với id: 999"));

        mockMvc.perform(get("/api/v1/vocabularies/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy từ vựng với id: 999")));

        verify(vocabularyService).getById(999L);
    }

    @Test
    @DisplayName("GET /api/v1/vocabularies/{id}: Trả về 400 khi ID không phải số nguyên")
    void testGetById_TypeMismatch_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/vocabularies/invalid-id"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Tham số request không hợp lệ")));
    }

    @Test
    @DisplayName("GET /api/v1/vocabularies/{id}: Phản hồi không chứa trường nội bộ hoặc nhạy cảm")
    void testResponseContract_NoInternalFieldsExposed() throws Exception {
        when(vocabularyService.getById(1L)).thenReturn(sampleResponse);

        mockMvc.perform(get("/api/v1/vocabularies/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.createdAt").doesNotExist())
                .andExpect(jsonPath("$.data.updatedAt").doesNotExist())
                .andExpect(jsonPath("$.data.password").doesNotExist())
                .andExpect(jsonPath("$.data.lesson").doesNotExist())
                .andExpect(jsonPath("$.data.id").exists())
                .andExpect(jsonPath("$.data.lessonId").exists())
                .andExpect(jsonPath("$.data.hiragana").exists())
                .andExpect(jsonPath("$.data.meaning").exists());
    }
}
