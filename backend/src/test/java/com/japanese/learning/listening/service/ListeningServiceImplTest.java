package com.japanese.learning.listening.service;

import com.japanese.learning.exercise.enums.QuestionType;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.listening.dto.ListeningContentMapper;
import com.japanese.learning.listening.dto.ListeningContentResponse;
import com.japanese.learning.listening.dto.ListeningSubmitRequest;
import com.japanese.learning.listening.dto.ListeningSubmitResponse;
import com.japanese.learning.listening.dto.QuestionAnswerRequest;
import com.japanese.learning.listening.entity.ListeningContent;
import com.japanese.learning.listening.entity.ListeningOption;
import com.japanese.learning.listening.entity.ListeningQuestion;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ListeningServiceImplTest {

    @Mock
    private ListeningContentRepository listeningContentRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private ListeningContentMapper listeningContentMapper;

    @InjectMocks
    private ListeningServiceImpl listeningService;

    private ListeningContent mockContent;
    private ListeningQuestion mockQuestion1;
    private ListeningQuestion mockQuestion2;
    private ListeningOption option1A;
    private ListeningOption option1B;
    private ListeningOption option2A;
    private ListeningOption option2B;

    @BeforeEach
    void setUp() {
        Lesson mockLesson = new Lesson();
        mockLesson.setId(1L);

        mockContent = new ListeningContent();
        mockContent.setId(10L);
        mockContent.setLesson(mockLesson);
        mockContent.setTitle("Bài nghe 01");
        mockContent.setAudioUrl("/audio/n5/lesson-01/listening-01.mp3");

        mockQuestion1 = new ListeningQuestion();
        mockQuestion1.setId(100L);
        mockQuestion1.setListening(mockContent);
        mockQuestion1.setQuestion("Câu 1");
        mockQuestion1.setQuestionType(QuestionType.MULTIPLE_CHOICE);
        mockQuestion1.setExplanation("Giải thích 1");

        option1A = new ListeningOption();
        option1A.setId(1001L);
        option1A.setQuestion(mockQuestion1);
        option1A.setContent("Đáp án A");
        option1A.setCorrect(true);

        option1B = new ListeningOption();
        option1B.setId(1002L);
        option1B.setQuestion(mockQuestion1);
        option1B.setContent("Đáp án B");
        option1B.setCorrect(false);

        mockQuestion1.getOptions().addAll(List.of(option1A, option1B));

        mockQuestion2 = new ListeningQuestion();
        mockQuestion2.setId(200L);
        mockQuestion2.setListening(mockContent);
        mockQuestion2.setQuestion("Câu 2");
        mockQuestion2.setQuestionType(QuestionType.MULTIPLE_CHOICE);
        mockQuestion2.setExplanation("Giải thích 2");

        option2A = new ListeningOption();
        option2A.setId(2001L);
        option2A.setQuestion(mockQuestion2);
        option2A.setContent("Đáp án A");
        option2A.setCorrect(false);

        option2B = new ListeningOption();
        option2B.setId(2002L);
        option2B.setQuestion(mockQuestion2);
        option2B.setContent("Đáp án B");
        option2B.setCorrect(true);

        mockQuestion2.getOptions().addAll(List.of(option2A, option2B));

        mockContent.getQuestions().addAll(List.of(mockQuestion1, mockQuestion2));
    }

    @Test
    @DisplayName("Lấy bài nghe theo lessonId thành công")
    void testGetListeningsByLessonId() {
        when(lessonRepository.existsById(1L)).thenReturn(true);
        when(listeningContentRepository.findByLessonIdOrderBySortOrderAsc(1L))
                .thenReturn(List.of(mockContent));
        when(listeningContentMapper.toResponse(any())).thenReturn(ListeningContentResponse.builder().id(10L).build());

        List<ListeningContentResponse> result = listeningService.getListeningsByLessonId(1L);

        assertEquals(1, result.size());
        assertEquals(10L, result.get(0).getId());
    }

    @Test
    @DisplayName("Submit bài nghe với tất cả các câu trả lời đúng")
    void testSubmitListeningAllCorrect() {
        when(listeningContentRepository.findById(10L)).thenReturn(Optional.of(mockContent));

        ListeningSubmitRequest request = ListeningSubmitRequest.builder()
                .answers(List.of(
                        QuestionAnswerRequest.builder().questionId(100L).selectedOptionId(1001L).build(),
                        QuestionAnswerRequest.builder().questionId(200L).selectedOptionId(2002L).build()
                ))
                .build();

        ListeningSubmitResponse response = listeningService.submitListening(10L, request);

        assertEquals(100, response.getScore());
        assertEquals(2, response.getTotalQuestions());
        assertEquals(2, response.getCorrectCount());
        assertEquals(0, response.getWrongCount());
        assertTrue(response.getResults().get(0).getIsCorrect());
        assertTrue(response.getResults().get(1).getIsCorrect());
    }

    @Test
    @DisplayName("Submit bài nghe với một câu đúng và một câu sai")
    void testSubmitListeningPartialCorrect() {
        when(listeningContentRepository.findById(10L)).thenReturn(Optional.of(mockContent));

        ListeningSubmitRequest request = ListeningSubmitRequest.builder()
                .answers(List.of(
                        QuestionAnswerRequest.builder().questionId(100L).selectedOptionId(1001L).build(), // Correct (1001)
                        QuestionAnswerRequest.builder().questionId(200L).selectedOptionId(2001L).build()  // Wrong (Selected 2001, correct is 2002)
                ))
                .build();

        ListeningSubmitResponse response = listeningService.submitListening(10L, request);

        assertEquals(50, response.getScore());
        assertEquals(2, response.getTotalQuestions());
        assertEquals(1, response.getCorrectCount());
        assertEquals(1, response.getWrongCount());
        assertTrue(response.getResults().get(0).getIsCorrect());
        assertFalse(response.getResults().get(1).getIsCorrect());
        assertEquals("Giải thích 2", response.getResults().get(1).getExplanation());
    }
}
