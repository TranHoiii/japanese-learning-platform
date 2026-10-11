package com.japanese.learning.exercise.service;

import com.japanese.learning.exercise.dto.BlankResponse;
import com.japanese.learning.exercise.dto.ExerciseAnswerRequest;
import com.japanese.learning.exercise.dto.ExerciseQuestionResultResponse;
import com.japanese.learning.exercise.entity.Question;
import com.japanese.learning.exercise.entity.QuestionOption;
import com.japanese.learning.exercise.enums.QuestionType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ExerciseGradingHelperTest {

    private ExerciseGradingHelper grader;

    @BeforeEach
    void setUp() {
        grader = new ExerciseGradingHelper();
    }

    @Test
    @DisplayName("Chấm trắc nghiệm: đúng khi chọn đúng option, sai khi chọn sai option")
    void testGradeMultipleChoiceOption() {
        Question q = new Question();
        q.setId(1L);
        q.setQuestionType(QuestionType.MULTIPLE_CHOICE);
        q.setExplanation("1) ほん");

        QuestionOption opt1 = new QuestionOption();
        opt1.setId(10L);
        opt1.setCorrect(true);
        opt1.setOptionText("ほん");

        QuestionOption opt2 = new QuestionOption();
        opt2.setId(20L);
        opt2.setCorrect(false);
        opt2.setOptionText("じしょ");

        q.setOptions(List.of(opt1, opt2));

        // User picks correct option
        ExerciseAnswerRequest reqCorrect = ExerciseAnswerRequest.builder()
                .questionId(1L)
                .selectedOptionId(10L)
                .build();
        ExerciseQuestionResultResponse res1 = grader.gradeQuestion(q, reqCorrect);
        assertTrue(res1.getIsCorrect());
        assertEquals(10L, res1.getSelectedOptionId());
        assertEquals(10L, res1.getCorrectOptionId());

        // User picks wrong option
        ExerciseAnswerRequest reqWrong = ExerciseAnswerRequest.builder()
                .questionId(1L)
                .selectedOptionId(20L)
                .build();
        ExerciseQuestionResultResponse res2 = grader.gradeQuestion(q, reqWrong);
        assertFalse(res2.getIsCorrect());
        assertEquals(20L, res2.getSelectedOptionId());
        assertEquals(10L, res2.getCorrectOptionId());
    }

    @Test
    @DisplayName("Chấm câu điền nhiều ô (Multi-blank responses)")
    void testGradeMultiBlankResponses() {
        Question q = new Question();
        q.setId(2L);
        q.setQuestionType(QuestionType.FILL_BLANK);
        q.setExplanation("""
                1) 食べない, している
                2) 遅れた, 故障した
                """);
        q.setOptions(new ArrayList<>());

        // User answers both blanks of sub-question 1 correctly
        ExerciseAnswerRequest req = ExerciseAnswerRequest.builder()
                .questionId(2L)
                .responses(List.of(
                        new BlankResponse("1_0", "食べない"),
                        new BlankResponse("1_1", "している"),
                        new BlankResponse("2_0", "遅れた"),
                        new BlankResponse("2_1", "故障した")
                ))
                .build();

        ExerciseQuestionResultResponse res = grader.gradeQuestion(q, req);
        assertTrue(res.getIsCorrect());
        assertEquals(4, res.getBlankResults().size());
        assertTrue(res.getBlankResults().get(0).getIsCorrect());
        assertTrue(res.getBlankResults().get(1).getIsCorrect());
        assertTrue(res.getBlankResults().get(2).getIsCorrect());
        assertTrue(res.getBlankResults().get(3).getIsCorrect());
    }

    @Test
    @DisplayName("Chấm câu có đáp án tương đương / biến thể với dấu ／ hoặc hoặc")
    void testGradeAlternativeAnswers() {
        Question q = new Question();
        q.setId(3L);
        q.setQuestionType(QuestionType.FILL_BLANK);
        q.setExplanation("1) どなたですか。／だれですか。\n2) 作れます。／できます。");
        q.setOptions(new ArrayList<>());

        // User answers alternative 1 for item 1, and alternative 2 for item 2 without Japanese period
        ExerciseAnswerRequest req = ExerciseAnswerRequest.builder()
                .questionId(3L)
                .responses(List.of(
                        new BlankResponse("1", "だれですか"),
                        new BlankResponse("2", "作れます。")
                ))
                .build();

        ExerciseQuestionResultResponse res = grader.gradeQuestion(q, req);
        assertTrue(res.getIsCorrect());
        assertTrue(res.getBlankResults().get(0).getIsCorrect());
        assertTrue(res.getBlankResults().get(1).getIsCorrect());
    }

    @Test
    @DisplayName("Chấm câu có dấu ngoặc tùy chọn [へ]も")
    void testGradeOptionalBrackets() {
        Question q = new Question();
        q.setId(4L);
        q.setQuestionType(QuestionType.FILL_BLANK);
        q.setExplanation("1) へ, [へ]も");
        q.setOptions(new ArrayList<>());

        ExerciseAnswerRequest req1 = ExerciseAnswerRequest.builder()
                .questionId(4L)
                .responses(List.of(
                        new BlankResponse("1_0", "へ"),
                        new BlankResponse("1_1", "も")
                ))
                .build();

        ExerciseQuestionResultResponse res1 = grader.gradeQuestion(q, req1);
        assertTrue(res1.getIsCorrect());
    }

    @Test
    @DisplayName("Câu hỏi mở/tự do cá nhân không chấm điểm giả (autoGraded=false)")
    void testGradeOpenEndedQuestion() {
        Question q = new Question();
        q.setId(5L);
        q.setQuestionType(QuestionType.FILL_BLANK);
        q.setExplanation("""
                1) 例: マイク・ミラーです。
                2) 例: 23歳です。
                """);
        q.setOptions(new ArrayList<>());

        ExerciseAnswerRequest req = ExerciseAnswerRequest.builder()
                .questionId(5L)
                .responses(List.of(
                        new BlankResponse("1", "グプタです"),
                        new BlankResponse("2", "25歳です")
                ))
                .build();

        ExerciseQuestionResultResponse res = grader.gradeQuestion(q, req);
        assertFalse(res.getAutoGraded(), "Câu hỏi cá nhân mở không được auto-grade điểm số giả");
        assertFalse(res.getBlankResults().get(0).getAutoGraded());
        assertFalse(res.getBlankResults().get(1).getAutoGraded());
    }

    @Test
    @DisplayName("Chấm câu có câu trả lời sai: isCorrect=false cho cả câu và từng blank")
    void testGradeIncorrectAnswer() {
        Question q = new Question();
        q.setId(6L);
        q.setQuestionType(QuestionType.FILL_BLANK);
        q.setExplanation("1) はっせんさんびゃく\n2) にまんさんぜんはっぴゃく");
        q.setOptions(new ArrayList<>());

        ExerciseAnswerRequest req = ExerciseAnswerRequest.builder()
                .questionId(6L)
                .responses(List.of(
                        new BlankResponse("1", "はっせんさんびゃく"),
                        new BlankResponse("2", "いちまん")
                ))
                .build();

        ExerciseQuestionResultResponse res = grader.gradeQuestion(q, req);
        assertFalse(res.getIsCorrect());
        assertTrue(res.getBlankResults().get(0).getIsCorrect());
        assertFalse(res.getBlankResults().get(1).getIsCorrect());
        assertEquals("はっせんさんびゃく", res.getBlankResults().get(0).getCorrectAnswer());
        assertEquals("にまんさんぜんはっぴゃく", res.getBlankResults().get(1).getCorrectAnswer());
    }
}
