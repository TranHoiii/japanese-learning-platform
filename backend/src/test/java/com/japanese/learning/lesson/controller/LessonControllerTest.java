package com.japanese.learning.lesson.controller;

import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.service.ExerciseService;
import com.japanese.learning.grammar.dto.GrammarResponse;
import com.japanese.learning.grammar.service.GrammarService;
import com.japanese.learning.kanji.dto.KanjiResponse;
import com.japanese.learning.kanji.service.KanjiService;
import com.japanese.learning.lesson.dto.LessonResponse;
import com.japanese.learning.lesson.service.LessonService;
import com.japanese.learning.listening.dto.ListeningContentResponse;
import com.japanese.learning.listening.service.ListeningService;
import com.japanese.learning.reading.dto.ReadingContentResponse;
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
class LessonControllerTest {

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

    private LessonResponse sampleLesson;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(lessonController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        sampleLesson = new LessonResponse(10L, 1L, 1, "Bài 01", "Giới thiệu", 1, true);
    }

    // ==================================================================
    // GET /api/v1/lessons/{lessonId}
    // ==================================================================

    @Test
    @DisplayName("GET /api/v1/lessons/10: Lấy bài học theo ID thành công")
    void testGetById_Success() throws Exception {
        when(lessonService.getById(10L)).thenReturn(sampleLesson);

        mockMvc.perform(get("/api/v1/lessons/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy bài học thành công")))
                .andExpect(jsonPath("$.data.id", is(10)))
                .andExpect(jsonPath("$.data.levelId", is(1)))
                .andExpect(jsonPath("$.data.lessonNumber", is(1)))
                .andExpect(jsonPath("$.data.title", is("Bài 01")))
                .andExpect(jsonPath("$.data.description", is("Giới thiệu")))
                .andExpect(jsonPath("$.data.isActive", is(true)));

        verify(lessonService).getById(10L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/999: Trả về 404 khi bài học không tồn tại")
    void testGetById_NotFound() throws Exception {
        when(lessonService.getById(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với id: 999"));

        mockMvc.perform(get("/api/v1/lessons/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy bài học với id: 999")));

        verify(lessonService).getById(999L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/abc: Trả về 400 khi lessonId không phải số")
    void testGetById_TypeMismatch_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/lessons/abc"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==================================================================
    // GET /api/v1/lessons/{lessonId}/vocabularies
    // ==================================================================

    @Test
    @DisplayName("GET /api/v1/lessons/10/vocabularies: Trả về danh sách từ vựng thành công")
    void testGetVocabulariesByLessonId_Success() throws Exception {
        VocabularyResponse vocab = new VocabularyResponse(
                1L, 10L, "わたし", "私", "Tư", "Tôi", "Đại từ", "/audio/watashi.mp3", null
        );
        when(vocabularyService.getByLessonId(10L)).thenReturn(List.of(vocab));

        mockMvc.perform(get("/api/v1/lessons/10/vocabularies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách từ vựng thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].hiragana", is("わたし")));

        verify(vocabularyService).getByLessonId(10L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/10/vocabularies: Trả về danh sách rỗng")
    void testGetVocabulariesByLessonId_Empty() throws Exception {
        when(vocabularyService.getByLessonId(10L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/vocabularies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(0)));
    }

    @Test
    @DisplayName("GET /api/v1/lessons/99/vocabularies: Trả về 404 khi bài học không tồn tại")
    void testGetVocabulariesByLessonId_LessonNotFound() throws Exception {
        when(vocabularyService.getByLessonId(99L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy bài học với id: 99"));

        mockMvc.perform(get("/api/v1/lessons/99/vocabularies"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==================================================================
    // GET /api/v1/lessons/{lessonId}/grammars
    // ==================================================================

    @Test
    @DisplayName("GET /api/v1/lessons/10/grammars: Trả về danh sách ngữ pháp thành công")
    void testGetGrammarsByLessonId_Success() throws Exception {
        GrammarResponse grammar = new GrammarResponse(
                1L, 10L, "～は～です", "Là...", "N1 は N2 です", "Khẳng định", null, 1, List.of()
        );
        when(grammarService.getByLessonId(10L)).thenReturn(List.of(grammar));

        mockMvc.perform(get("/api/v1/lessons/10/grammars"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách ngữ pháp thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)));

        verify(grammarService).getByLessonId(10L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/10/grammars: Trả về danh sách rỗng")
    void testGetGrammarsByLessonId_Empty() throws Exception {
        when(grammarService.getByLessonId(10L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/grammars"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(0)));
    }

    // ==================================================================
    // GET /api/v1/lessons/{lessonId}/kanjis
    // ==================================================================

    @Test
    @DisplayName("GET /api/v1/lessons/10/kanjis: Trả về danh sách kanji thành công")
    void testGetKanjisByLessonId_Success() throws Exception {
        KanjiResponse kanji = KanjiResponse.builder()
                .id(1L)
                .kanji("日")
                .hanViet("NHẬT")
                .onyomi("ニチ")
                .kunyomi("ひ")
                .meaning("Mặt trời, ngày")
                .strokeCount(4)
                .strokeOrderUrl("https://example.com/stroke.svg")
                .build();
        when(kanjiService.getKanjisByLessonId(10L)).thenReturn(List.of(kanji));

        mockMvc.perform(get("/api/v1/lessons/10/kanjis"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách Kanji thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].kanji", is("日")));

        verify(kanjiService).getKanjisByLessonId(10L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/10/kanjis: Trả về danh sách rỗng")
    void testGetKanjisByLessonId_Empty() throws Exception {
        when(kanjiService.getKanjisByLessonId(10L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/kanjis"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(0)));
    }

    // ==================================================================
    // GET /api/v1/lessons/{lessonId}/listenings
    // ==================================================================

    @Test
    @DisplayName("GET /api/v1/lessons/10/listenings: Trả về danh sách bài nghe thành công")
    void testGetListeningsByLessonId_Success() throws Exception {
        ListeningContentResponse listening = ListeningContentResponse.builder()
                .id(1L)
                .lessonId(10L)
                .title("Bài nghe 1")
                .audioUrl("/audio/n5/lesson-01/listening-01.mp3")
                .sortOrder(1)
                .build();
        when(listeningService.getListeningsByLessonId(10L)).thenReturn(List.of(listening));

        mockMvc.perform(get("/api/v1/lessons/10/listenings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách bài nghe thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)));

        verify(listeningService).getListeningsByLessonId(10L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/10/listenings: Trả về danh sách rỗng")
    void testGetListeningsByLessonId_Empty() throws Exception {
        when(listeningService.getListeningsByLessonId(10L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/listenings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(0)));
    }

    // ==================================================================
    // GET /api/v1/lessons/{lessonId}/readings
    // ==================================================================

    @Test
    @DisplayName("GET /api/v1/lessons/10/readings: Trả về danh sách bài đọc thành công")
    void testGetReadingsByLessonId_Success() throws Exception {
        ReadingContentResponse reading = ReadingContentResponse.builder()
                .id(1L)
                .lessonId(10L)
                .title("Bài đọc 1")
                .content("Nội dung bài đọc 1")
                .sortOrder(1)
                .build();
        when(readingService.getReadingsByLessonId(10L)).thenReturn(List.of(reading));

        mockMvc.perform(get("/api/v1/lessons/10/readings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách bài đọc thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)));

        verify(readingService).getReadingsByLessonId(10L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/10/readings: Trả về danh sách rỗng")
    void testGetReadingsByLessonId_Empty() throws Exception {
        when(readingService.getReadingsByLessonId(10L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/readings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(0)));
    }

    // ==================================================================
    // GET /api/v1/lessons/{lessonId}/exercises
    // ==================================================================

    @Test
    @DisplayName("GET /api/v1/lessons/10/exercises: Trả về danh sách bài tập thành công")
    void testGetExercisesByLessonId_Success() throws Exception {
        com.japanese.learning.exercise.dto.ExerciseResponse exercise =
                com.japanese.learning.exercise.dto.ExerciseResponse.builder()
                        .id(1L)
                        .lessonId(10L)
                        .title("Bài tập 1")
                        .description("Mô tả")
                        .sortOrder(1)
                        .build();
        when(exerciseService.getExercisesByLessonId(10L)).thenReturn(List.of(exercise));

        mockMvc.perform(get("/api/v1/lessons/10/exercises"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách bài tập thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)));

        verify(exerciseService).getExercisesByLessonId(10L);
    }

    @Test
    @DisplayName("GET /api/v1/lessons/10/exercises: Trả về danh sách rỗng")
    void testGetExercisesByLessonId_Empty() throws Exception {
        when(exerciseService.getExercisesByLessonId(10L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/lessons/10/exercises"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(0)));
    }
}
