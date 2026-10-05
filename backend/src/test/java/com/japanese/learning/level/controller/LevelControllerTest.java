package com.japanese.learning.level.controller;

import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.dto.LessonResponse;
import com.japanese.learning.lesson.service.LessonService;
import com.japanese.learning.level.dto.LevelResponse;
import com.japanese.learning.level.service.LevelService;
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
class LevelControllerTest {

    private MockMvc mockMvc;

    @Mock
    private LevelService levelService;

    @Mock
    private LessonService lessonService;

    @InjectMocks
    private LevelController levelController;

    private LevelResponse sampleLevel;
    private LessonResponse sampleLesson;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(levelController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        sampleLevel = new LevelResponse(1L, "N5", "Cấp độ N5", "Sơ cấp 1", 1, true);
        sampleLesson = new LessonResponse(10L, 1L, 1, "Bài 01", "Giới thiệu", 1, true);
    }

    // ==================================================================
    // GET /api/v1/levels
    // ==================================================================

    @Test
    @DisplayName("GET /api/v1/levels: Lấy danh sách level active thành công")
    void testGetAllActiveLevels_Success() throws Exception {
        when(levelService.getAllActiveLevels()).thenReturn(List.of(sampleLevel));

        mockMvc.perform(get("/api/v1/levels"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách level thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(1)))
                .andExpect(jsonPath("$.data[0].code", is("N5")))
                .andExpect(jsonPath("$.data[0].name", is("Cấp độ N5")))
                .andExpect(jsonPath("$.data[0].description", is("Sơ cấp 1")))
                .andExpect(jsonPath("$.data[0].sortOrder", is(1)))
                .andExpect(jsonPath("$.data[0].isActive", is(true)));

        verify(levelService).getAllActiveLevels();
    }

    @Test
    @DisplayName("GET /api/v1/levels: Trả về danh sách rỗng khi không có level nào")
    void testGetAllActiveLevels_Empty() throws Exception {
        when(levelService.getAllActiveLevels()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/levels"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(0)));

        verify(levelService).getAllActiveLevels();
    }

    // ==================================================================
    // GET /api/v1/levels/{id}
    // ==================================================================

    @Test
    @DisplayName("GET /api/v1/levels/1: Lấy chi tiết level theo ID thành công")
    void testGetById_Success() throws Exception {
        when(levelService.getById(1L)).thenReturn(sampleLevel);

        mockMvc.perform(get("/api/v1/levels/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy level thành công")))
                .andExpect(jsonPath("$.data.id", is(1)))
                .andExpect(jsonPath("$.data.code", is("N5")))
                .andExpect(jsonPath("$.data.name", is("Cấp độ N5")))
                .andExpect(jsonPath("$.data.description", is("Sơ cấp 1")))
                .andExpect(jsonPath("$.data.sortOrder", is(1)))
                .andExpect(jsonPath("$.data.isActive", is(true)));

        verify(levelService).getById(1L);
    }

    @Test
    @DisplayName("GET /api/v1/levels/999: Trả về 404 khi level không tồn tại")
    void testGetById_NotFound() throws Exception {
        when(levelService.getById(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy level với id: 999"));

        mockMvc.perform(get("/api/v1/levels/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy level với id: 999")));

        verify(levelService).getById(999L);
    }

    @Test
    @DisplayName("GET /api/v1/levels/abc: Trả về 400 khi ID sai định dạng")
    void testGetById_TypeMismatch_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/levels/abc"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    // ==================================================================
    // GET /api/v1/levels/{levelId}/lessons
    // ==================================================================

    @Test
    @DisplayName("GET /api/v1/levels/1/lessons: Lấy danh sách bài học theo levelId thành công")
    void testGetLessonsByLevelId_Success() throws Exception {
        when(lessonService.getLessonsByLevelId(1L)).thenReturn(List.of(sampleLesson));

        mockMvc.perform(get("/api/v1/levels/1/lessons"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách bài học thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(10)))
                .andExpect(jsonPath("$.data[0].levelId", is(1)))
                .andExpect(jsonPath("$.data[0].lessonNumber", is(1)))
                .andExpect(jsonPath("$.data[0].title", is("Bài 01")));

        verify(lessonService).getLessonsByLevelId(1L);
    }

    @Test
    @DisplayName("GET /api/v1/levels/1/lessons: Trả về danh sách rỗng khi level không có bài học nào")
    void testGetLessonsByLevelId_Empty() throws Exception {
        when(lessonService.getLessonsByLevelId(1L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/levels/1/lessons"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(0)));

        verify(lessonService).getLessonsByLevelId(1L);
    }

    @Test
    @DisplayName("GET /api/v1/levels/999/lessons: Trả về 404 khi level không tồn tại")
    void testGetLessonsByLevelId_NotFound() throws Exception {
        when(lessonService.getLessonsByLevelId(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy level với id: 999"));

        mockMvc.perform(get("/api/v1/levels/999/lessons"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy level với id: 999")));

        verify(lessonService).getLessonsByLevelId(999L);
    }

    @Test
    @DisplayName("GET /api/v1/levels/abc/lessons: Trả về 400 khi levelId sai định dạng")
    void testGetLessonsByLevelId_TypeMismatch_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/levels/abc/lessons"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }
}
