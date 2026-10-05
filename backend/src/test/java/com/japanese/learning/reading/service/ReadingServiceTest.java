package com.japanese.learning.reading.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.enums.QuestionType;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.reading.dto.ReadingAnswerRequest;
import com.japanese.learning.reading.dto.ReadingContentMapper;
import com.japanese.learning.reading.dto.ReadingContentResponse;
import com.japanese.learning.reading.dto.ReadingQuestionResultResponse;
import com.japanese.learning.reading.dto.ReadingSubmitRequest;
import com.japanese.learning.reading.dto.ReadingSubmitResponse;
import com.japanese.learning.reading.entity.ReadingContent;
import com.japanese.learning.reading.entity.ReadingOption;
import com.japanese.learning.reading.entity.ReadingQuestion;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReadingServiceTest {

    @Mock
    private ReadingContentRepository readingContentRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private ReadingContentMapper readingContentMapper;

    @InjectMocks
    private ReadingServiceImpl readingService;

    private Lesson sampleLesson;
    private ReadingContent sampleReading;
    private ReadingQuestion question1;
    private ReadingQuestion question2;
    private ReadingOption opt1Q1;
    private ReadingOption opt2Q1;
    private ReadingOption opt1Q2;
    private ReadingOption opt2Q2;
    private ReadingContentResponse sampleResponse;

    @BeforeEach
    void setUp() {
        sampleLesson = new Lesson();
        sampleLesson.setId(10L);
        sampleLesson.setTitle("Bài 01");

        // Question 1 with options
        opt1Q1 = new ReadingOption();
        opt1Q1.setId(101L);
        opt1Q1.setContent("Tokyo");
        opt1Q1.setCorrect(true);
        opt1Q1.setSortOrder(1);

        opt2Q1 = new ReadingOption();
        opt2Q1.setId(102L);
        opt2Q1.setContent("Osaka");
        opt2Q1.setCorrect(false);
        opt2Q1.setSortOrder(2);

        question1 = new ReadingQuestion();
        question1.setId(201L);
        question1.setQuestion("Thủ đô của Nhật Bản?");
        question1.setQuestionType(QuestionType.MULTIPLE_CHOICE);
        question1.setExplanation("Tokyo là thủ đô.");
        question1.setSortOrder(1);
        opt1Q1.setQuestion(question1);
        opt2Q1.setQuestion(question1);
        question1.setOptions(new ArrayList<>(List.of(opt1Q1, opt2Q1)));

        // Question 2 with options
        opt1Q2 = new ReadingOption();
        opt1Q2.setId(103L);
        opt1Q2.setContent("Núi Phú Sĩ");
        opt1Q2.setCorrect(true);
        opt1Q2.setSortOrder(1);

        opt2Q2 = new ReadingOption();
        opt2Q2.setId(104L);
        opt2Q2.setContent("Núi Fansipan");
        opt2Q2.setCorrect(false);
        opt2Q2.setSortOrder(2);

        question2 = new ReadingQuestion();
        question2.setId(202L);
        question2.setQuestion("Ngọn núi cao nhất Nhật Bản?");
        question2.setQuestionType(QuestionType.MULTIPLE_CHOICE);
        question2.setExplanation("Phú Sĩ là ngọn núi cao nhất.");
        question2.setSortOrder(2);
        opt1Q2.setQuestion(question2);
        opt2Q2.setQuestion(question2);
        question2.setOptions(new ArrayList<>(List.of(opt1Q2, opt2Q2)));

        // ReadingContent
        sampleReading = new ReadingContent();
        sampleReading.setId(1L);
        sampleReading.setLesson(sampleLesson);
        sampleReading.setTitle("Đất nước Nhật Bản");
        sampleReading.setContent("Nhật Bản có thủ đô là Tokyo và núi Phú Sĩ...");
        sampleReading.setTranslation("Japan has capital Tokyo and Mt. Fuji...");
        sampleReading.setSortOrder(1);
        question1.setReading(sampleReading);
        question2.setReading(sampleReading);
        sampleReading.setQuestions(new ArrayList<>(List.of(question1, question2)));

        sampleResponse = ReadingContentResponse.builder()
                .id(1L)
                .lessonId(10L)
                .title("Đất nước Nhật Bản")
                .content("Nhật Bản có thủ đô là Tokyo và núi Phú Sĩ...")
                .translation("Japan has capital Tokyo and Mt. Fuji...")
                .sortOrder(1)
                .build();
    }

    // ==========================================
    // getReadingsByLessonId
    // ==========================================

    @Test
    @DisplayName("getReadingsByLessonId: Thành công khi bài học tồn tại và có bài đọc")
    void testGetReadingsByLessonId_Success() {
        when(lessonRepository.existsById(10L)).thenReturn(true);
        when(readingContentRepository.findByLessonIdOrderBySortOrderAsc(10L)).thenReturn(List.of(sampleReading));
        when(readingContentMapper.toResponse(sampleReading)).thenReturn(sampleResponse);

        List<ReadingContentResponse> result = readingService.getReadingsByLessonId(10L);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("Đất nước Nhật Bản");
        verify(lessonRepository).existsById(10L);
        verify(readingContentRepository).findByLessonIdOrderBySortOrderAsc(10L);
        verify(readingContentMapper).toResponse(sampleReading);
    }

    @Test
    @DisplayName("getReadingsByLessonId: Thành công trả về rỗng khi bài học tồn tại nhưng không có bài đọc")
    void testGetReadingsByLessonId_EmptyList() {
        when(lessonRepository.existsById(10L)).thenReturn(true);
        when(readingContentRepository.findByLessonIdOrderBySortOrderAsc(10L)).thenReturn(Collections.emptyList());

        List<ReadingContentResponse> result = readingService.getReadingsByLessonId(10L);

        assertThat(result).isEmpty();
        verify(lessonRepository).existsById(10L);
        verify(readingContentRepository).findByLessonIdOrderBySortOrderAsc(10L);
        verify(readingContentMapper, never()).toResponse(any());
    }

    @Test
    @DisplayName("getReadingsByLessonId: Ném ResourceNotFoundException khi bài học không tồn tại")
    void testGetReadingsByLessonId_LessonNotFound() {
        when(lessonRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> readingService.getReadingsByLessonId(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy bài học với id: 99");

        verify(lessonRepository).existsById(99L);
        verify(readingContentRepository, never()).findByLessonIdOrderBySortOrderAsc(any());
    }

    // ==========================================
    // getReadingById
    // ==========================================

    @Test
    @DisplayName("getReadingById: Thành công khi bài đọc tồn tại")
    void testGetReadingById_Success() {
        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));
        when(readingContentMapper.toResponse(sampleReading)).thenReturn(sampleResponse);

        ReadingContentResponse result = readingService.getReadingById(1L);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("Đất nước Nhật Bản");
        verify(readingContentRepository).findById(1L);
        verify(readingContentMapper).toResponse(sampleReading);
    }

    @Test
    @DisplayName("getReadingById: Ném ResourceNotFoundException khi bài đọc không tồn tại")
    void testGetReadingById_NotFound() {
        when(readingContentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> readingService.getReadingById(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy bài đọc với id: 99");

        verify(readingContentRepository).findById(99L);
        verify(readingContentMapper, never()).toResponse(any());
    }

    // ==========================================
    // submitReading
    // ==========================================

    @Test
    @DisplayName("submitReading: Ném ResourceNotFoundException khi bài đọc không tồn tại")
    void testSubmitReading_ReadingNotFound() {
        when(readingContentRepository.findById(99L)).thenReturn(Optional.empty());
        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, 101L)
        ));

        assertThatThrownBy(() -> readingService.submitReading(99L, request))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy bài đọc với id: 99");

        verify(readingContentRepository).findById(99L);
    }

    @Test
    @DisplayName("submitReading: Ném ResourceNotFoundException khi questionId không thuộc bài đọc")
    void testSubmitReading_QuestionNotBelongToReading() {
        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));
        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(999L, 101L)
        ));

        assertThatThrownBy(() -> readingService.submitReading(1L, request))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Câu hỏi id 999 không thuộc bài đọc này");
    }

    @Test
    @DisplayName("submitReading: Ném IllegalArgumentException khi selectedOptionId không thuộc câu hỏi")
    void testSubmitReading_OptionNotBelongToQuestion() {
        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));
        // Option 103 belongs to question2, but passed for question1
        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, 103L)
        ));

        assertThatThrownBy(() -> readingService.submitReading(1L, request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Lựa chọn id 103 không thuộc câu hỏi id 201");
    }

    @Test
    @DisplayName("submitReading: Đúng tất cả các câu hỏi (100% điểm)")
    void testSubmitReading_AllCorrect() {
        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));
        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, 101L), // correct (Tokyo)
                new ReadingAnswerRequest(202L, 103L)  // correct (Núi Phú Sĩ)
        ));

        ReadingSubmitResponse response = readingService.submitReading(1L, request);

        assertThat(response.getScore()).isEqualTo(100);
        assertThat(response.getTotalQuestions()).isEqualTo(2);
        assertThat(response.getCorrectCount()).isEqualTo(2);
        assertThat(response.getWrongCount()).isEqualTo(0);
        assertThat(response.getResults()).hasSize(2);

        ReadingQuestionResultResponse r1 = response.getResults().get(0);
        assertThat(r1.getQuestionId()).isEqualTo(201L);
        assertThat(r1.isCorrect()).isTrue();
        assertThat(r1.getSelectedOptionId()).isEqualTo(101L);
        assertThat(r1.getCorrectOptionId()).isEqualTo(101L);
        assertThat(r1.getExplanation()).isEqualTo("Tokyo là thủ đô.");

        ReadingQuestionResultResponse r2 = response.getResults().get(1);
        assertThat(r2.getQuestionId()).isEqualTo(202L);
        assertThat(r2.isCorrect()).isTrue();
        assertThat(r2.getSelectedOptionId()).isEqualTo(103L);
        assertThat(r2.getCorrectOptionId()).isEqualTo(103L);
        assertThat(r2.getExplanation()).isEqualTo("Phú Sĩ là ngọn núi cao nhất.");
    }

    @Test
    @DisplayName("submitReading: Sai tất cả các câu hỏi (0% điểm)")
    void testSubmitReading_AllWrong() {
        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));
        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, 102L), // wrong (Osaka)
                new ReadingAnswerRequest(202L, 104L)  // wrong (Núi Fansipan)
        ));

        ReadingSubmitResponse response = readingService.submitReading(1L, request);

        assertThat(response.getScore()).isEqualTo(0);
        assertThat(response.getTotalQuestions()).isEqualTo(2);
        assertThat(response.getCorrectCount()).isEqualTo(0);
        assertThat(response.getWrongCount()).isEqualTo(2);

        ReadingQuestionResultResponse r1 = response.getResults().get(0);
        assertThat(r1.isCorrect()).isFalse();
        assertThat(r1.getSelectedOptionId()).isEqualTo(102L);
        assertThat(r1.getCorrectOptionId()).isEqualTo(101L);

        ReadingQuestionResultResponse r2 = response.getResults().get(1);
        assertThat(r2.isCorrect()).isFalse();
        assertThat(r2.getSelectedOptionId()).isEqualTo(104L);
        assertThat(r2.getCorrectOptionId()).isEqualTo(103L);
    }

    @Test
    @DisplayName("submitReading: Đúng một phần và kiểm tra làm tròn điểm (Math.round)")
    void testSubmitReading_MixedAnswers_RoundingScore() {
        // Add a 3rd question
        ReadingOption opt1Q3 = new ReadingOption();
        opt1Q3.setId(105L);
        opt1Q3.setContent("Tiếng Nhật");
        opt1Q3.setCorrect(true);
        opt1Q3.setSortOrder(1);

        ReadingOption opt2Q3 = new ReadingOption();
        opt2Q3.setId(106L);
        opt2Q3.setContent("Tiếng Anh");
        opt2Q3.setCorrect(false);
        opt2Q3.setSortOrder(2);

        ReadingQuestion question3 = new ReadingQuestion();
        question3.setId(203L);
        question3.setQuestion("Ngôn ngữ chính thức?");
        question3.setQuestionType(QuestionType.MULTIPLE_CHOICE);
        question3.setExplanation("Tiếng Nhật.");
        question3.setSortOrder(3);
        opt1Q3.setQuestion(question3);
        opt2Q3.setQuestion(question3);
        question3.setOptions(new ArrayList<>(List.of(opt1Q3, opt2Q3)));
        question3.setReading(sampleReading);

        sampleReading.getQuestions().add(question3);

        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));

        // Answer 2 correct, 1 wrong -> 2/3 = 66.666% -> rounded to 67%
        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, 101L), // correct
                new ReadingAnswerRequest(202L, 103L), // correct
                new ReadingAnswerRequest(203L, 106L)  // wrong
        ));

        ReadingSubmitResponse response = readingService.submitReading(1L, request);

        assertThat(response.getScore()).isEqualTo(67);
        assertThat(response.getTotalQuestions()).isEqualTo(3);
        assertThat(response.getCorrectCount()).isEqualTo(2);
        assertThat(response.getWrongCount()).isEqualTo(1);
    }

    @Test
    @DisplayName("submitReading: Người dùng không trả lời hết tất cả câu hỏi (missing answers)")
    void testSubmitReading_MissingAnswers() {
        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));

        // Only answer question 1, omit question 2
        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, 101L) // correct
        ));

        ReadingSubmitResponse response = readingService.submitReading(1L, request);

        assertThat(response.getScore()).isEqualTo(50);
        assertThat(response.getTotalQuestions()).isEqualTo(2);
        assertThat(response.getCorrectCount()).isEqualTo(1);
        assertThat(response.getWrongCount()).isEqualTo(1);

        ReadingQuestionResultResponse r1 = response.getResults().get(0);
        assertThat(r1.getQuestionId()).isEqualTo(201L);
        assertThat(r1.isCorrect()).isTrue();
        assertThat(r1.getSelectedOptionId()).isEqualTo(101L);

        ReadingQuestionResultResponse r2 = response.getResults().get(1);
        assertThat(r2.getQuestionId()).isEqualTo(202L);
        assertThat(r2.isCorrect()).isFalse();
        assertThat(r2.getSelectedOptionId()).isNull();
        assertThat(r2.getCorrectOptionId()).isEqualTo(103L);
        assertThat(r2.getExplanation()).isEqualTo("Phú Sĩ là ngọn núi cao nhất.");
    }

    @Test
    @DisplayName("submitReading: Xử lý an toàn khi selectedOptionId là null (câu hỏi chưa được trả lời)")
    void testSubmitReading_SelectedOptionIdNull_TreatedAsUnansweredAndIncorrect() {
        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));

        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, 101L), // answered correctly (Tokyo)
                new ReadingAnswerRequest(202L, null)  // unanswered
        ));

        ReadingSubmitResponse response = readingService.submitReading(1L, request);

        assertThat(response).isNotNull();
        assertThat(response.getScore()).isEqualTo(50);
        assertThat(response.getTotalQuestions()).isEqualTo(2);
        assertThat(response.getCorrectCount()).isEqualTo(1);
        assertThat(response.getWrongCount()).isEqualTo(1);
        assertThat(response.getResults()).hasSize(2);

        ReadingQuestionResultResponse r1 = response.getResults().get(0);
        assertThat(r1.getQuestionId()).isEqualTo(201L);
        assertThat(r1.isCorrect()).isTrue();
        assertThat(r1.getSelectedOptionId()).isEqualTo(101L);
        assertThat(r1.getCorrectOptionId()).isEqualTo(101L);

        ReadingQuestionResultResponse r2 = response.getResults().get(1);
        assertThat(r2.getQuestionId()).isEqualTo(202L);
        assertThat(r2.isCorrect()).isFalse();
        assertThat(r2.getSelectedOptionId()).isNull();
        assertThat(r2.getCorrectOptionId()).isEqualTo(103L);
        assertThat(r2.getExplanation()).isEqualTo("Phú Sĩ là ngọn núi cao nhất.");
    }

    @Test
    @DisplayName("submitReading: Tất cả câu trả lời có selectedOptionId là null")
    void testSubmitReading_AllAnswersSelectedOptionIdNull() {
        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));

        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, null),
                new ReadingAnswerRequest(202L, null)
        ));

        ReadingSubmitResponse response = readingService.submitReading(1L, request);

        assertThat(response).isNotNull();
        assertThat(response.getScore()).isEqualTo(0);
        assertThat(response.getTotalQuestions()).isEqualTo(2);
        assertThat(response.getCorrectCount()).isEqualTo(0);
        assertThat(response.getWrongCount()).isEqualTo(2);
        assertThat(response.getResults().get(0).isCorrect()).isFalse();
        assertThat(response.getResults().get(0).getSelectedOptionId()).isNull();
        assertThat(response.getResults().get(1).isCorrect()).isFalse();
        assertThat(response.getResults().get(1).getSelectedOptionId()).isNull();
    }

    @Test
    @DisplayName("submitReading: Trùng lặp câu trả lời trong request thì lấy câu trả lời cuối cùng")
    void testSubmitReading_DuplicateQuestionAnswerInRequest() {
        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));

        // Question 201 answered with wrong option 102 first, then correct option 101
        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, 102L),
                new ReadingAnswerRequest(201L, 101L),
                new ReadingAnswerRequest(202L, 103L)
        ));

        ReadingSubmitResponse response = readingService.submitReading(1L, request);

        assertThat(response.getScore()).isEqualTo(100);
        assertThat(response.getCorrectCount()).isEqualTo(2);
        assertThat(response.getResults().get(0).getSelectedOptionId()).isEqualTo(101L);
    }

    @Test
    @DisplayName("submitReading: Bài đọc không có câu hỏi nào thì score là 0")
    void testSubmitReading_NoQuestionsInReading() {
        sampleReading.setQuestions(Collections.emptyList());
        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));

        // Even if empty answers list passed (though controller validation blocks empty, test service defensively)
        ReadingSubmitRequest request = new ReadingSubmitRequest(Collections.emptyList());

        ReadingSubmitResponse response = readingService.submitReading(1L, request);

        assertThat(response.getScore()).isEqualTo(0);
        assertThat(response.getTotalQuestions()).isEqualTo(0);
        assertThat(response.getCorrectCount()).isEqualTo(0);
        assertThat(response.getWrongCount()).isEqualTo(0);
        assertThat(response.getResults()).isEmpty();
    }

    @Test
    @DisplayName("submitReading: Câu hỏi không có đáp án đúng nào được cấu hình trong DB")
    void testSubmitReading_QuestionWithNoCorrectOption() {
        opt1Q1.setCorrect(false);
        opt2Q1.setCorrect(false);

        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));

        ReadingSubmitRequest request = new ReadingSubmitRequest(List.of(
                new ReadingAnswerRequest(201L, 101L),
                new ReadingAnswerRequest(202L, 103L)
        ));

        ReadingSubmitResponse response = readingService.submitReading(1L, request);

        assertThat(response.getCorrectCount()).isEqualTo(1);
        ReadingQuestionResultResponse r1 = response.getResults().get(0);
        assertThat(r1.isCorrect()).isFalse();
        assertThat(r1.getCorrectOptionId()).isNull();
    }
}
