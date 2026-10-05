package com.japanese.learning.reading.controller;

import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.service.ExerciseService;
import com.japanese.learning.grammar.service.GrammarService;
import com.japanese.learning.kanji.service.KanjiService;
import com.japanese.learning.lesson.controller.LessonController;
import com.japanese.learning.lesson.service.LessonService;
import com.japanese.learning.listening.service.ListeningService;
import com.japanese.learning.reading.dto.ReadingContentResponse;
import com.japanese.learning.reading.service.ReadingService;
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
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class LessonReadingControllerTest {

    private MockMvc mockMvc;

    @Mock
    private LessonService lessonService;

    @Mock
    private VocabularyService vocabularyService;

    @Mock
    private GrammarService grammarService;

    @Mock
    private KanjiService kanjiService;

    @Mock
    private ListeningService listeningService;

    @Mock
    private ReadingService readingService;

    @Mock
    private ExerciseService exerciseService;

    @InjectMocks
    private LessonController lessonController;

    private ReadingContentResponse sampleReadingResponse;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(lessonController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        sampleReadingResponse = ReadingContentResponse.builder()
                .id(1L)
                .lessonId(10L)
                .title("Bài đọc bài 1")
                .content("Nội dung bài đọc bài 1...")
                .translation("Bản dịch bài đọc bài 1...")
                .sortOrder(1)
                .build();
    }

    @Test
    @DisplayName("GET /api/v1/lessons/10/readings: Thành công trả về danh sách bài đọc của bài học")
    void testGetReadingsByLessonId_Success() throws Exception {
        when(readingService.getReadingsByLessonId(10L)).thenReturn(List.of(sampleReadingResponse));

        mockMvc.perform(get("/api/v1/lessons/10/readings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách bài đọc thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].title", is("Bài đọc bài 1")))
                .andExpect(jsonPath("$.data[0].lessonId", is(10)));

        verify(readingService).getReadingsByLessonId(10L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/10/readings: Trả về danh sách rỗng khi bài học chưa có bài đọc")
    void testGetReadingsByLessonId_Empty() throws Exception {
        when(readingService.getReadingsByLessonId(10L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/readings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách bài đọc thành công")))
                .andExpect(jsonPath("$.data", hasSize(0)));

        verify(readingService).getReadingsByLessonId(10L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/99/readings: Bài học không tồn tại trả về 404")
    void testGetReadingsByLessonId_NotFound() throws Exception {
        when(readingService.getReadingsByLessonId(99L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với id: 99"));

        mockMvc.perform(get("/api/v1/lessons/99/readings"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với id: 99")));

        verify(readingService).getReadingsByLessonId(99L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/{lessonId}/readings: Trả về 400 khi lessonId không phải số")
    void testGetReadingsByLessonId_TypeMismatch_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/lessons/abc/readings"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Tham số request không hợp lệ")));
    }
}
