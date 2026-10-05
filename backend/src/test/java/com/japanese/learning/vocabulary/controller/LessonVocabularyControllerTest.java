package com.japanese.learning.vocabulary.controller;

import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.service.ExerciseService;
import com.japanese.learning.grammar.service.GrammarService;
import com.japanese.learning.kanji.service.KanjiService;
import com.japanese.learning.lesson.controller.LessonController;
import com.japanese.learning.lesson.service.LessonService;
import com.japanese.learning.listening.service.ListeningService;
import com.japanese.learning.reading.service.ReadingService;
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
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class LessonVocabularyControllerTest {

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

    private VocabularyResponse sampleResponse;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(lessonController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        sampleResponse = new VocabularyResponse(
                1L,
                10L,
                "ほん",
                "本",
                "Bản",
                "Sách",
                "Danh từ",
                null,
                null
        );
    }

    @Test
    @DisplayName("GET /api/v1/lessons/{lessonId}/vocabularies: Lấy danh sách từ vựng theo bài học thành công")
    void testGetVocabulariesByLessonId_Success() throws Exception {
        when(vocabularyService.getByLessonId(10L)).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/v1/lessons/10/vocabularies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách từ vựng thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].lessonId", is(10)))
                .andExpect(jsonPath("$.data[0].hiragana", is("ほん")))
                .andExpect(jsonPath("$.data[0].meaning", is("Sách")));

        verify(vocabularyService).getByLessonId(10L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/{lessonId}/vocabularies: Trả về danh sách rỗng khi bài học chưa có từ vựng")
    void testGetVocabulariesByLessonId_EmptyList() throws Exception {
        when(vocabularyService.getByLessonId(10L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/vocabularies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách từ vựng thành công")))
                .andExpect(jsonPath("$.data", hasSize(0)));

        verify(vocabularyService).getByLessonId(10L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/{lessonId}/vocabularies: 404 khi bài học không tồn tại")
    void testGetVocabulariesByLessonId_LessonNotFound_Returns404() throws Exception {
        when(vocabularyService.getByLessonId(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với id: 999"));

        mockMvc.perform(get("/api/v1/lessons/999/vocabularies"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với id: 999")));

        verify(vocabularyService).getByLessonId(999L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/{lessonId}/vocabularies: 400 khi lessonId không phải số hợp lệ")
    void testGetVocabulariesByLessonId_TypeMismatch_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/lessons/invalid/vocabularies"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Tham số request không hợp lệ")));
    }
}
