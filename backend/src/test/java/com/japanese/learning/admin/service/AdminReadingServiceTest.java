package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminReadingOptionRequest;
import com.japanese.learning.admin.dto.AdminReadingOptionResponse;
import com.japanese.learning.admin.dto.AdminReadingQuestionRequest;
import com.japanese.learning.admin.dto.AdminReadingQuestionResponse;
import com.japanese.learning.admin.dto.AdminReadingRequest;
import com.japanese.learning.admin.dto.AdminReadingResponse;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.enums.QuestionType;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.reading.entity.ReadingContent;
import com.japanese.learning.reading.entity.ReadingOption;
import com.japanese.learning.reading.entity.ReadingQuestion;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.reading.repository.ReadingQuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
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
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminReadingServiceTest {

    @Mock
    private ReadingContentRepository readingContentRepository;

    @Mock
    private ReadingQuestionRepository readingQuestionRepository;

    @Mock
    private LessonRepository lessonRepository;

    @InjectMocks
    private AdminReadingService adminReadingService;

    private Lesson sampleLesson;
    private Level sampleLevel;
    private ReadingContent sampleReading;
    private ReadingQuestion sampleQuestion;
    private ReadingOption sampleOption;

    @BeforeEach
    void setUp() {
        sampleLevel = new Level();
        sampleLevel.setId(1L);
        sampleLevel.setCode("N5");
        sampleLevel.setName("N5 Sơ cấp");

        sampleLesson = new Lesson();
        sampleLesson.setId(10L);
        sampleLesson.setTitle("Bài 01");
        sampleLesson.setLessonNumber(1);
        sampleLesson.setLevel(sampleLevel);

        sampleOption = new ReadingOption();
        sampleOption.setId(101L);
        sampleOption.setContent("Tokyo");
        sampleOption.setCorrect(true);
        sampleOption.setSortOrder(1);

        sampleQuestion = new ReadingQuestion();
        sampleQuestion.setId(201L);
        sampleQuestion.setQuestion("Thủ đô Nhật Bản?");
        sampleQuestion.setQuestionType(QuestionType.MULTIPLE_CHOICE);
        sampleQuestion.setExplanation("Tokyo là thủ đô.");
        sampleQuestion.setImageUrl("/img/q1.png");
        sampleQuestion.setSortOrder(1);
        sampleOption.setQuestion(sampleQuestion);
        sampleQuestion.setOptions(new ArrayList<>(List.of(sampleOption)));

        sampleReading = new ReadingContent();
        sampleReading.setId(1L);
        sampleReading.setLesson(sampleLesson);
        sampleReading.setTitle("Đất nước Nhật Bản");
        sampleReading.setContent("Nội dung bài đọc...");
        sampleReading.setTranslation("Bản dịch...");
        sampleReading.setImageUrl("/img/reading1.png");
        sampleReading.setSortOrder(1);
        sampleQuestion.setReading(sampleReading);
        sampleReading.setQuestions(new ArrayList<>(List.of(sampleQuestion)));
    }

    // ==========================================
    // getReadings
    // ==========================================

    @Test
    @DisplayName("getReadings: Lấy tất cả bài đọc khi lessonId là null")
    void testGetReadings_AllReadings_Success() {
        when(readingContentRepository.findAllByOrderBySortOrderAsc()).thenReturn(List.of(sampleReading));

        List<AdminReadingResponse> result = adminReadingService.getReadings(null);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).title()).isEqualTo("Đất nước Nhật Bản");
        assertThat(result.get(0).levelCode()).isEqualTo("N5");
        assertThat(result.get(0).lessonNumber()).isEqualTo(1);
        verify(readingContentRepository).findAllByOrderBySortOrderAsc();
        verify(lessonRepository, never()).existsById(anyLong());
    }

    @Test
    @DisplayName("getReadings: Lọc theo bài học thành công khi bài học tồn tại")
    void testGetReadings_FilterByLesson_Success() {
        when(lessonRepository.existsById(10L)).thenReturn(true);
        when(readingContentRepository.findByLessonIdOrderBySortOrderAsc(10L)).thenReturn(List.of(sampleReading));

        List<AdminReadingResponse> result = adminReadingService.getReadings(10L);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).lessonId()).isEqualTo(10L);
        verify(lessonRepository).existsById(10L);
        verify(readingContentRepository).findByLessonIdOrderBySortOrderAsc(10L);
    }

    @Test
    @DisplayName("getReadings: Ném ResourceNotFoundException khi bài học lọc không tồn tại")
    void testGetReadings_LessonNotFound() {
        when(lessonRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> adminReadingService.getReadings(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy bài học với ID: 99");

        verify(readingContentRepository, never()).findByLessonIdOrderBySortOrderAsc(anyLong());
    }

    // ==========================================
    // getReadingById
    // ==========================================

    @Test
    @DisplayName("getReadingById: Thành công khi bài đọc tồn tại và hiển thị đầy đủ đáp án admin")
    void testGetReadingById_Success() {
        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));

        AdminReadingResponse result = adminReadingService.getReadingById(1L);

        assertThat(result).isNotNull();
        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.title()).isEqualTo("Đất nước Nhật Bản");
        assertThat(result.questions()).hasSize(1);
        AdminReadingQuestionResponse q = result.questions().get(0);
        assertThat(q.explanation()).isEqualTo("Tokyo là thủ đô.");
        assertThat(q.options()).hasSize(1);
        AdminReadingOptionResponse opt = q.options().get(0);
        assertThat(opt.content()).isEqualTo("Tokyo");
        assertThat(opt.correct()).isTrue();
    }

    @Test
    @DisplayName("getReadingById: Ném ResourceNotFoundException khi bài đọc không tồn tại")
    void testGetReadingById_NotFound() {
        when(readingContentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminReadingService.getReadingById(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy bài đọc với ID: 99");
    }

    // ==========================================
    // createReading
    // ==========================================

    @Test
    @DisplayName("createReading: Thành công khi tạo bài đọc với nested questions và options")
    void testCreateReading_WithQuestions_Success() {
        AdminReadingOptionRequest optReq = new AdminReadingOptionRequest("Tokyo", true, 1);
        AdminReadingQuestionRequest qReq = new AdminReadingQuestionRequest(
                "Thủ đô Nhật?", QuestionType.MULTIPLE_CHOICE, "Giải thích", "/img/q.png", 1, List.of(optReq)
        );
        AdminReadingRequest req = new AdminReadingRequest(
                10L, "  Tiêu đề bài đọc  ", "  Nội dung bài đọc  ", "  Bản dịch  ", "  /img/r.png  ", 1, List.of(qReq)
        );

        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(readingContentRepository.save(any(ReadingContent.class))).thenAnswer(invocation -> {
            ReadingContent toSave = invocation.getArgument(0);
            toSave.setId(100L);
            return toSave;
        });

        AdminReadingResponse response = adminReadingService.createReading(req);

        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(100L);
        assertThat(response.title()).isEqualTo("Tiêu đề bài đọc");
        assertThat(response.content()).isEqualTo("Nội dung bài đọc");
        assertThat(response.translation()).isEqualTo("Bản dịch");
        assertThat(response.imageUrl()).isEqualTo("/img/r.png");

        ArgumentCaptor<ReadingContent> captor = ArgumentCaptor.forClass(ReadingContent.class);
        verify(readingContentRepository).save(captor.capture());
        ReadingContent saved = captor.getValue();
        assertThat(saved.getTitle()).isEqualTo("Tiêu đề bài đọc");
        assertThat(saved.getQuestions()).hasSize(1);
        assertThat(saved.getQuestions().get(0).getOptions()).hasSize(1);
    }

    @Test
    @DisplayName("createReading: Thành công khi tạo bài đọc không có câu hỏi và chuỗi rỗng chuyển thành null")
    void testCreateReading_NoQuestions_BlankFieldsBecomeNull() {
        AdminReadingRequest req = new AdminReadingRequest(
                10L, "Tiêu đề", "Nội dung", "   ", "   ", 1, null
        );

        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(readingContentRepository.save(any(ReadingContent.class))).thenAnswer(invocation -> {
            ReadingContent toSave = invocation.getArgument(0);
            toSave.setId(101L);
            return toSave;
        });

        AdminReadingResponse response = adminReadingService.createReading(req);

        assertThat(response.translation()).isNull();
        assertThat(response.imageUrl()).isNull();
        assertThat(response.questions()).isEmpty();
    }

    @Test
    @DisplayName("createReading: Ném ResourceNotFoundException khi bài học không tồn tại")
    void testCreateReading_LessonNotFound() {
        AdminReadingRequest req = new AdminReadingRequest(
                99L, "Tiêu đề", "Nội dung", null, null, 1, null
        );

        when(lessonRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminReadingService.createReading(req))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy bài học với ID: 99");

        verify(readingContentRepository, never()).save(any());
    }

    // ==========================================
    // updateReading
    // ==========================================

    @Test
    @DisplayName("updateReading: Cập nhật thành công bài đọc và thay thế danh sách câu hỏi")
    void testUpdateReading_Success() {
        AdminReadingOptionRequest newOpt = new AdminReadingOptionRequest("Osaka", false, 1);
        AdminReadingQuestionRequest newQ = new AdminReadingQuestionRequest(
                "Câu hỏi mới?", QuestionType.MULTIPLE_CHOICE, null, null, 1, List.of(newOpt)
        );
        AdminReadingRequest updateReq = new AdminReadingRequest(
                10L, "Tiêu đề mới", "Nội dung mới", "Bản dịch mới", null, 2, List.of(newQ)
        );

        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(readingContentRepository.save(any(ReadingContent.class))).thenAnswer(invocation -> invocation.getArgument(0));

        AdminReadingResponse response = adminReadingService.updateReading(1L, updateReq);

        assertThat(response.title()).isEqualTo("Tiêu đề mới");
        assertThat(response.content()).isEqualTo("Nội dung mới");
        assertThat(response.sortOrder()).isEqualTo(2);
        assertThat(response.questions()).hasSize(1);
        assertThat(response.questions().get(0).question()).isEqualTo("Câu hỏi mới?");
    }

    @Test
    @DisplayName("updateReading: Ném ResourceNotFoundException khi bài đọc không tồn tại")
    void testUpdateReading_ReadingNotFound() {
        AdminReadingRequest updateReq = new AdminReadingRequest(
                10L, "Tiêu đề", "Nội dung", null, null, 1, null
        );

        when(readingContentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminReadingService.updateReading(99L, updateReq))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy bài đọc với ID: 99");
    }

    @Test
    @DisplayName("updateReading: Ném ResourceNotFoundException khi lessonId cập nhật không tồn tại")
    void testUpdateReading_LessonNotFound() {
        AdminReadingRequest updateReq = new AdminReadingRequest(
                99L, "Tiêu đề", "Nội dung", null, null, 1, null
        );

        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));
        when(lessonRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminReadingService.updateReading(1L, updateReq))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy bài học với ID: 99");
    }

    // ==========================================
    // deleteReading
    // ==========================================

    @Test
    @DisplayName("deleteReading: Xóa bài đọc thành công")
    void testDeleteReading_Success() {
        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));

        adminReadingService.deleteReading(1L);

        verify(readingContentRepository).delete(sampleReading);
    }

    @Test
    @DisplayName("deleteReading: Ném ResourceNotFoundException khi bài đọc không tồn tại")
    void testDeleteReading_NotFound() {
        when(readingContentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminReadingService.deleteReading(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy bài đọc với ID: 99");

        verify(readingContentRepository, never()).delete(any());
    }

    // ==========================================
    // Nested Questions CRUD
    // ==========================================

    @Test
    @DisplayName("getQuestions: Lấy danh sách câu hỏi của bài đọc thành công")
    void testGetQuestions_Success() {
        when(readingContentRepository.existsById(1L)).thenReturn(true);
        when(readingQuestionRepository.findByReadingIdOrderBySortOrderAsc(1L)).thenReturn(List.of(sampleQuestion));

        List<AdminReadingQuestionResponse> questions = adminReadingService.getQuestions(1L);

        assertThat(questions).hasSize(1);
        assertThat(questions.get(0).question()).isEqualTo("Thủ đô Nhật Bản?");
        assertThat(questions.get(0).options()).hasSize(1);
    }

    @Test
    @DisplayName("getQuestions: Ném ResourceNotFoundException khi bài đọc không tồn tại")
    void testGetQuestions_ReadingNotFound() {
        when(readingContentRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> adminReadingService.getQuestions(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy bài đọc với ID: 99");
    }

    @Test
    @DisplayName("createQuestion: Tạo câu hỏi mới cho bài đọc thành công")
    void testCreateQuestion_Success() {
        AdminReadingOptionRequest opt = new AdminReadingOptionRequest("Đúng", true, 1);
        AdminReadingQuestionRequest req = new AdminReadingQuestionRequest(
                "Nội dung đúng?", QuestionType.MULTIPLE_CHOICE, "Giải thích", null, 1, List.of(opt)
        );

        when(readingContentRepository.findById(1L)).thenReturn(Optional.of(sampleReading));
        when(readingQuestionRepository.save(any(ReadingQuestion.class))).thenAnswer(invocation -> {
            ReadingQuestion q = invocation.getArgument(0);
            q.setId(301L);
            return q;
        });

        AdminReadingQuestionResponse response = adminReadingService.createQuestion(1L, req);

        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(301L);
        assertThat(response.question()).isEqualTo("Nội dung đúng?");
        assertThat(response.options()).hasSize(1);
    }

    @Test
    @DisplayName("createQuestion: Ném ResourceNotFoundException khi bài đọc không tồn tại")
    void testCreateQuestion_ReadingNotFound() {
        AdminReadingQuestionRequest req = new AdminReadingQuestionRequest(
                "Câu hỏi?", QuestionType.MULTIPLE_CHOICE, null, null, 1, null
        );

        when(readingContentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminReadingService.createQuestion(99L, req))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy bài đọc với ID: 99");
    }

    @Test
    @DisplayName("updateQuestion: Cập nhật câu hỏi thành công")
    void testUpdateQuestion_Success() {
        AdminReadingOptionRequest optReq = new AdminReadingOptionRequest("Tokyo", true, 1);
        AdminReadingQuestionRequest updateReq = new AdminReadingQuestionRequest(
                "Thủ đô là gì?", QuestionType.MULTIPLE_CHOICE, "Giải thích cập nhật", "/img/q_new.png", 2, List.of(optReq)
        );

        when(readingQuestionRepository.findById(201L)).thenReturn(Optional.of(sampleQuestion));
        when(readingQuestionRepository.save(any(ReadingQuestion.class))).thenAnswer(invocation -> invocation.getArgument(0));

        AdminReadingQuestionResponse response = adminReadingService.updateQuestion(1L, 201L, updateReq);

        assertThat(response.question()).isEqualTo("Thủ đô là gì?");
        assertThat(response.explanation()).isEqualTo("Giải thích cập nhật");
        assertThat(response.imageUrl()).isEqualTo("/img/q_new.png");
        assertThat(response.sortOrder()).isEqualTo(2);
        assertThat(response.options()).hasSize(1);
    }

    @Test
    @DisplayName("updateQuestion: Ném ResourceNotFoundException khi câu hỏi không tồn tại")
    void testUpdateQuestion_QuestionNotFound() {
        AdminReadingQuestionRequest updateReq = new AdminReadingQuestionRequest(
                "Câu hỏi", QuestionType.MULTIPLE_CHOICE, null, null, 1, null
        );

        when(readingQuestionRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminReadingService.updateQuestion(1L, 999L, updateReq))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy câu hỏi với ID: 999");
    }

    @Test
    @DisplayName("updateQuestion: Ném ResourceNotFoundException khi câu hỏi không thuộc bài đọc đã chỉ định")
    void testUpdateQuestion_QuestionNotBelongToReading() {
        AdminReadingQuestionRequest updateReq = new AdminReadingQuestionRequest(
                "Câu hỏi", QuestionType.MULTIPLE_CHOICE, null, null, 1, null
        );

        // sampleQuestion belongs to reading 1L, but passed readingId is 2L
        when(readingQuestionRepository.findById(201L)).thenReturn(Optional.of(sampleQuestion));

        assertThatThrownBy(() -> adminReadingService.updateQuestion(2L, 201L, updateReq))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Câu hỏi ID: 201 không thuộc bài đọc ID: 2");
    }

    @Test
    @DisplayName("deleteQuestion: Xóa câu hỏi thành công")
    void testDeleteQuestion_Success() {
        when(readingQuestionRepository.findById(201L)).thenReturn(Optional.of(sampleQuestion));

        adminReadingService.deleteQuestion(1L, 201L);

        verify(readingQuestionRepository).delete(sampleQuestion);
    }

    @Test
    @DisplayName("deleteQuestion: Ném ResourceNotFoundException khi câu hỏi không tồn tại")
    void testDeleteQuestion_QuestionNotFound() {
        when(readingQuestionRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminReadingService.deleteQuestion(1L, 999L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Không tìm thấy câu hỏi với ID: 999");
    }

    @Test
    @DisplayName("deleteQuestion: Ném ResourceNotFoundException khi câu hỏi không thuộc bài đọc đã chỉ định")
    void testDeleteQuestion_QuestionNotBelongToReading() {
        when(readingQuestionRepository.findById(201L)).thenReturn(Optional.of(sampleQuestion));

        assertThatThrownBy(() -> adminReadingService.deleteQuestion(2L, 201L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Câu hỏi ID: 201 không thuộc bài đọc ID: 2");
    }
}
