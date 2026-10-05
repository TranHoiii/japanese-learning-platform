package com.japanese.learning.exercise.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.exercise.dto.ExerciseAnswerRequest;
import com.japanese.learning.exercise.dto.ExerciseQuestionResultResponse;
import com.japanese.learning.exercise.dto.ExerciseResponse;
import com.japanese.learning.exercise.dto.ExerciseSubmitRequest;
import com.japanese.learning.exercise.dto.ExerciseSubmitResponse;
import com.japanese.learning.exercise.dto.QuestionOptionResponse;
import com.japanese.learning.exercise.dto.QuestionResponse;
import com.japanese.learning.exercise.enums.ContentType;
import com.japanese.learning.exercise.enums.ExerciseType;
import com.japanese.learning.exercise.enums.QuestionType;
import com.japanese.learning.exercise.service.ExerciseService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ExerciseController.class)
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class ExerciseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ExerciseService exerciseService;

    @Test
    @DisplayName("TEST 1: GET questions KHÔNG expose explanation, isCorrect, correct, answer hoặc correctAnswer")
    void test1_GetQuestions_DoesNotExposeExplanationOrCorrectAnswer() throws Exception {
        QuestionOptionResponse opt1 = QuestionOptionResponse.builder()
                .id(1L)
                .optionText("私")
                .sortOrder(1)
                .build();
        QuestionOptionResponse opt2 = QuestionOptionResponse.builder()
                .id(2L)
                .optionText("僕")
                .sortOrder(2)
                .build();

        QuestionResponse qRes = QuestionResponse.builder()
                .id(1L)
                .exerciseId(10L)
                .questionText("Chọn đáp án đúng")
                .questionType(QuestionType.MULTIPLE_CHOICE)
                .explanation(null)
                .sortOrder(1)
                .options(List.of(opt1, opt2))
                .build();

        when(exerciseService.getQuestionsByExerciseId(10L)).thenReturn(List.of(qRes));

        mockMvc.perform(get("/api/v1/exercises/10/questions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$..explanation").doesNotExist())
                .andExpect(jsonPath("$..isCorrect").doesNotExist())
                .andExpect(jsonPath("$..correct").doesNotExist())
                .andExpect(jsonPath("$..answer").doesNotExist())
                .andExpect(jsonPath("$..correctAnswer").doesNotExist());
    }

    @Test
    @DisplayName("TEST 2: FILL_BLANK KHÔNG leak expected answer qua explanation hay bất kỳ field nào trước submit")
    void test2_FillBlank_DoesNotLeakExpectedAnswer() throws Exception {
        String expectedSecretAnswer = "学生";

        QuestionResponse qRes = QuestionResponse.builder()
                .id(1L)
                .exerciseId(10L)
                .questionText("わたしは ___ です。")
                .questionType(QuestionType.FILL_BLANK)
                .explanation(null)
                .sortOrder(1)
                .options(List.of())
                .build();

        when(exerciseService.getQuestionsByExerciseId(10L)).thenReturn(List.of(qRes));

        mockMvc.perform(get("/api/v1/exercises/10/questions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].questionText").value("わたしは ___ です。"))
                .andExpect(jsonPath("$.data[0].questionType").value("FILL_BLANK"))
                .andExpect(jsonPath("$.data[0].explanation").doesNotExist())
                .andExpect(jsonPath("$..explanation").doesNotExist())
                .andExpect(content().string(not(containsString(expectedSecretAnswer))));
    }

    @Test
    @DisplayName("TEST 3: MCQ KHÔNG expose correct option trước khi submit")
    void test3_MCQ_OptionsDoNotExposeCorrectFlag() throws Exception {
        QuestionOptionResponse opt1 = QuestionOptionResponse.builder()
                .id(1L)
                .optionText("Option A")
                .sortOrder(1)
                .build();
        QuestionOptionResponse opt2 = QuestionOptionResponse.builder()
                .id(2L)
                .optionText("Option B")
                .sortOrder(2)
                .build();

        QuestionResponse qRes = QuestionResponse.builder()
                .id(1L)
                .exerciseId(10L)
                .questionText("Chọn phương án đúng")
                .questionType(QuestionType.MULTIPLE_CHOICE)
                .explanation(null)
                .sortOrder(1)
                .options(List.of(opt1, opt2))
                .build();

        when(exerciseService.getQuestionsByExerciseId(10L)).thenReturn(List.of(qRes));

        mockMvc.perform(get("/api/v1/exercises/10/questions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].options[0].id").value(1))
                .andExpect(jsonPath("$.data[0].options[0].optionText").value("Option A"))
                .andExpect(jsonPath("$.data[0].options[0].sortOrder").value(1))
                .andExpect(jsonPath("$.data[0].options[0].isCorrect").doesNotExist())
                .andExpect(jsonPath("$.data[0].options[0].correct").doesNotExist())
                .andExpect(jsonPath("$.data[0].options[1].id").value(2))
                .andExpect(jsonPath("$.data[0].options[1].optionText").value("Option B"))
                .andExpect(jsonPath("$.data[0].options[1].isCorrect").doesNotExist())
                .andExpect(jsonPath("$.data[0].options[1].correct").doesNotExist());
    }

    @Test
    @DisplayName("TEST 4: Submit thành công VẪN trả explanation và kết quả chấm điểm sau khi nộp bài")
    void test4_SubmitExercise_ReturnsExplanationAndResults() throws Exception {
        ExerciseSubmitRequest req = new ExerciseSubmitRequest(List.of(
                new ExerciseAnswerRequest(1L, null, "学生")
        ));

        ExerciseQuestionResultResponse result = ExerciseQuestionResultResponse.builder()
                .questionId(1L)
                .isCorrect(true)
                .selectedOptionId(null)
                .correctOptionId(null)
                .answerText("学生")
                .correctAnswerText("学生")
                .explanation("学生")
                .build();

        ExerciseSubmitResponse submitRes = ExerciseSubmitResponse.builder()
                .score(100)
                .totalQuestions(1)
                .correctCount(1)
                .wrongCount(0)
                .results(List.of(result))
                .build();

        when(exerciseService.submitExercise(eq(10L), any(ExerciseSubmitRequest.class))).thenReturn(submitRes);

        mockMvc.perform(post("/api/v1/exercises/10/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.score").value(100))
                .andExpect(jsonPath("$.data.correctCount").value(1))
                .andExpect(jsonPath("$.data.wrongCount").value(0))
                .andExpect(jsonPath("$.data.results[0].questionId").value(1))
                .andExpect(jsonPath("$.data.results[0].isCorrect").value(true))
                .andExpect(jsonPath("$.data.results[0].answerText").value("学生"))
                .andExpect(jsonPath("$.data.results[0].correctAnswerText").value("学生"))
                .andExpect(jsonPath("$.data.results[0].explanation").value("学生"));
    }

    @Test
    @DisplayName("TEST 5: Submit trả kết quả isCorrect=false cho câu trả lời sai kèm explanation để review")
    void test5_SubmitExercise_WrongAnswer_ReturnsExplanationAndIsCorrectFalse() throws Exception {
        ExerciseSubmitRequest req = new ExerciseSubmitRequest(List.of(
                new ExerciseAnswerRequest(1L, null, "先生")
        ));

        ExerciseQuestionResultResponse result = ExerciseQuestionResultResponse.builder()
                .questionId(1L)
                .isCorrect(false)
                .selectedOptionId(null)
                .correctOptionId(null)
                .answerText("先生")
                .correctAnswerText("学生")
                .explanation("学生")
                .build();

        ExerciseSubmitResponse submitRes = ExerciseSubmitResponse.builder()
                .score(0)
                .totalQuestions(1)
                .correctCount(0)
                .wrongCount(1)
                .results(List.of(result))
                .build();

        when(exerciseService.submitExercise(eq(10L), any(ExerciseSubmitRequest.class))).thenReturn(submitRes);

        mockMvc.perform(post("/api/v1/exercises/10/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.score").value(0))
                .andExpect(jsonPath("$.data.correctCount").value(0))
                .andExpect(jsonPath("$.data.wrongCount").value(1))
                .andExpect(jsonPath("$.data.results[0].questionId").value(1))
                .andExpect(jsonPath("$.data.results[0].isCorrect").value(false))
                .andExpect(jsonPath("$.data.results[0].explanation").value("学生"));
    }

    @Test
    @DisplayName("EXTRA: GET /api/v1/exercises/{id} KHÔNG expose explanation trong danh sách questions")
    void testGetExerciseById_DoesNotExposeExplanation() throws Exception {
        QuestionResponse qRes = QuestionResponse.builder()
                .id(1L)
                .exerciseId(10L)
                .questionText("わたしは ___ です。")
                .questionType(QuestionType.FILL_BLANK)
                .explanation(null)
                .sortOrder(1)
                .options(List.of())
                .build();

        ExerciseResponse exRes = ExerciseResponse.builder()
                .id(10L)
                .lessonId(1L)
                .title("Bài 01–02")
                .description("Luyện tập")
                .exerciseType(ExerciseType.LESSON)
                .contentType(ContentType.VOCABULARY)
                .sortOrder(1)
                .questionCount(1)
                .questions(List.of(qRes))
                .build();

        when(exerciseService.getExerciseById(10L)).thenReturn(exRes);

        mockMvc.perform(get("/api/v1/exercises/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Bài 01–02"))
                .andExpect(jsonPath("$.data.questions[0].explanation").doesNotExist())
                .andExpect(jsonPath("$..explanation").doesNotExist());
    }
}
