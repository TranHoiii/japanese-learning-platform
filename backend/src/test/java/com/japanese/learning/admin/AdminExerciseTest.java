package com.japanese.learning.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.controller.AdminExerciseController;
import com.japanese.learning.admin.dto.AdminExerciseRequest;
import com.japanese.learning.admin.dto.AdminExerciseResponse;
import com.japanese.learning.admin.dto.AdminQuestionOptionRequest;
import com.japanese.learning.admin.dto.AdminQuestionOptionResponse;
import com.japanese.learning.admin.dto.AdminQuestionRequest;
import com.japanese.learning.admin.dto.AdminQuestionResponse;
import com.japanese.learning.admin.service.AdminExerciseService;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.exercise.enums.ContentType;
import com.japanese.learning.exercise.enums.ExerciseType;
import com.japanese.learning.exercise.enums.QuestionType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AdminExerciseController.class)
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class AdminExerciseTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AdminExerciseService adminExerciseService;

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Create Exercise with questions and options (correct answer included)")
    void testCreateExercise_Success() throws Exception {
        AdminQuestionOptionRequest opt1 = new AdminQuestionOptionRequest("私", true, 1);
        AdminQuestionOptionRequest opt2 = new AdminQuestionOptionRequest("僕", false, 2);
        AdminQuestionRequest qReq = new AdminQuestionRequest(
                "Chọn chữ Hán đúng của 'わたし'", QuestionType.MULTIPLE_CHOICE, "私 là Watashi", 1, List.of(opt1, opt2)
        );
        AdminExerciseRequest req = new AdminExerciseRequest(
                1L, "Bài tập từ vựng 1", "Mô tả", ExerciseType.LESSON, ContentType.VOCABULARY, 1, List.of(qReq)
        );

        AdminQuestionOptionResponse optRes1 = new AdminQuestionOptionResponse(1L, 10L, "私", true, 1);
        AdminQuestionOptionResponse optRes2 = new AdminQuestionOptionResponse(2L, 10L, "僕", false, 2);
        AdminQuestionResponse qRes = new AdminQuestionResponse(
                10L, 5L, "Chọn chữ Hán đúng của 'わたし'", QuestionType.MULTIPLE_CHOICE, "私 là Watashi", 1, List.of(optRes1, optRes2)
        );
        AdminExerciseResponse res = new AdminExerciseResponse(
                5L, 1L, 1, "N5", "Bài tập từ vựng 1", "Mô tả", ExerciseType.LESSON, ContentType.VOCABULARY, 1, List.of(qRes)
        );

        when(adminExerciseService.createExercise(any(AdminExerciseRequest.class))).thenReturn(res);

        mockMvc.perform(post("/api/v1/admin/exercises")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Bài tập từ vựng 1"))
                .andExpect(jsonPath("$.data.questions[0].options[0].correct").value(true));
    }
}
