package com.japanese.learning.reading;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import com.japanese.learning.reading.config.N5ReadingDataSeeder;
import com.japanese.learning.reading.dto.*;
import com.japanese.learning.reading.entity.ReadingContent;
import com.japanese.learning.reading.entity.ReadingOption;
import com.japanese.learning.reading.entity.ReadingQuestion;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.reading.service.ReadingServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class N5ReadingIntegrationTest {

    @Mock
    private ReadingContentRepository readingContentRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private LevelRepository levelRepository;

    @Mock
    private ReadingContentMapper readingContentMapper;

    private ObjectMapper objectMapper;
    private N5ReadingDataSeeder seeder;
    private ReadingServiceImpl readingService;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        seeder = new N5ReadingDataSeeder(levelRepository, lessonRepository, readingContentRepository, objectMapper);
        readingService = new ReadingServiceImpl(readingContentRepository, lessonRepository, readingContentMapper);
    }

    @Test
    @DisplayName("N5 Reading JSON: File exists, contains all 25 lessons, 37 reading contents with translations and images")
    void testN5ReadingJsonFile_Integrity() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/n5-reading.json");
        assertTrue(resource.exists(), "data/n5-reading.json must exist in classpath");

        List<N5ReadingDataSeeder.LessonReadingGroup> groups;
        try (InputStream is = resource.getInputStream()) {
            groups = objectMapper.readValue(is, new TypeReference<List<N5ReadingDataSeeder.LessonReadingGroup>>() {});
        }

        assertNotNull(groups, "Groups should not be null");
        assertEquals(25, groups.size(), "Should have exactly 25 lessons for N5 (Lessons 1-25)");

        int totalItems = 0;
        int totalQuestions = 0;

        for (int i = 0; i < groups.size(); i++) {
            N5ReadingDataSeeder.LessonReadingGroup group = groups.get(i);
            assertEquals(i + 1, group.lessonNumber(), "Lesson numbers should be sequential 1..25");
            assertNotNull(group.items(), "Items list should not be null");
            assertFalse(group.items().isEmpty(), "Lesson " + (i + 1) + " must have at least one reading item");

            for (N5ReadingDataSeeder.ReadingItemPayload item : group.items()) {
                totalItems++;
                assertNotNull(item.title(), "Title must not be null");
                assertNotNull(item.content(), "Content must not be null");
                assertNotNull(item.translation(), "Translation must not be null for: " + item.title());
                assertFalse(item.translation().isBlank(), "Translation must not be blank for: " + item.title());
                assertNotNull(item.imageUrl(), "Image URL must not be null for: " + item.title());
                assertTrue(item.imageUrl().startsWith("/media/reading/reading_n5_"), "Image URL must follow standard naming");

                assertNotNull(item.questions(), "Questions list must not be null");
                assertFalse(item.questions().isEmpty(), "Questions list must not be empty");

                for (N5ReadingDataSeeder.QuestionPayload q : item.questions()) {
                    totalQuestions++;
                    assertNotNull(q.question(), "Question text must not be null");
                    assertNotNull(q.options(), "Options must not be null");
                    assertTrue(q.options().size() >= 2, "Question should have at least 2 options");

                    long correctCount = q.options().stream().filter(N5ReadingDataSeeder.OptionPayload::correct).count();
                    assertEquals(1, correctCount, "Each question must have exactly 1 correct option: " + q.question());
                }
            }
        }

        assertEquals(37, totalItems, "Total N5 reading contents should be exactly 37");
        assertTrue(totalQuestions >= 100, "Total N5 questions should be >= 100");
    }

    @Test
    @DisplayName("N5 Reading Seeder: Successfully saves reading entities with questions and options")
    void testN5ReadingSeeder_Execution() throws Exception {
        Level n5Level = new Level();
        n5Level.setId(1L);
        n5Level.setCode("N5");
        n5Level.setName("N5");

        when(levelRepository.findByCode("N5")).thenReturn(Optional.of(n5Level));

        for (int i = 1; i <= 25; i++) {
            Lesson lesson = new Lesson();
            lesson.setId((long) i);
            lesson.setLessonNumber(i);
            lesson.setTitle("Bài " + (i < 10 ? "0" + i : i));
            lesson.setLevel(n5Level);
            when(lessonRepository.findByLevelIdAndLessonNumber(1L, i)).thenReturn(Optional.of(lesson));
        }

        when(readingContentRepository.findByLessonIdOrderBySortOrderAsc(anyLong())).thenReturn(Collections.emptyList());

        seeder.run();

        verify(levelRepository, times(1)).findByCode("N5");
        verify(readingContentRepository, times(37)).save(any(ReadingContent.class));
    }

    @Test
    @DisplayName("N5 Reading Service: getReadingsByLessonId returns mapped responses")
    void testGetReadingsByLessonId() {
        Long lessonId = 1L;
        ReadingContent rc = new ReadingContent();
        rc.setId(100L);
        rc.setTitle("お国は どちらですか");
        rc.setContent("☆どこから 来ましたか。");
        rc.setTranslation("Bạn đến từ đâu?");
        rc.setImageUrl("/media/reading/reading_n5_l01_r01.png");

        when(lessonRepository.existsById(lessonId)).thenReturn(true);
        when(readingContentRepository.findByLessonIdOrderBySortOrderAsc(lessonId))
                .thenReturn(List.of(rc));

        ReadingContentResponse expectedResponse = ReadingContentResponse.builder()
                .id(100L)
                .lessonId(lessonId)
                .lessonNumber(1)
                .levelCode("N5")
                .title("お国は どちらですか")
                .content("☆どこから 来ましたか。")
                .translation("Bạn đến từ đâu?")
                .imageUrl("/media/reading/reading_n5_l01_r01.png")
                .build();

        when(readingContentMapper.toResponse(rc)).thenReturn(expectedResponse);

        List<ReadingContentResponse> responses = readingService.getReadingsByLessonId(lessonId);

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals("お国は どちらですか", responses.get(0).getTitle());
        assertEquals("Bạn đến từ đâu?", responses.get(0).getTranslation());
        assertEquals("/media/reading/reading_n5_l01_r01.png", responses.get(0).getImageUrl());
    }

    @Test
    @DisplayName("N5 Reading Service: submitReading calculates score correctly")
    void testSubmitReading_Calculation() {
        Long readingId = 100L;
        ReadingContent rc = new ReadingContent();
        rc.setId(readingId);

        ReadingOption opt1 = new ReadingOption();
        opt1.setId(1L);
        opt1.setCorrect(true);
        opt1.setContent("Tokyo");

        ReadingOption opt2 = new ReadingOption();
        opt2.setId(2L);
        opt2.setCorrect(false);
        opt2.setContent("Kyoto");

        ReadingQuestion q1 = new ReadingQuestion();
        q1.setId(10L);
        q1.setQuestion("Thủ đô Nhật?");
        q1.setExplanation("Tokyo là thủ đô");
        q1.setOptions(List.of(opt1, opt2));

        rc.setQuestions(List.of(q1));

        when(readingContentRepository.findById(readingId))
                .thenReturn(Optional.of(rc));

        ReadingSubmitRequest request = new ReadingSubmitRequest();
        ReadingAnswerRequest answer = new ReadingAnswerRequest();
        answer.setQuestionId(10L);
        answer.setSelectedOptionId(1L); // correct
        request.setAnswers(List.of(answer));

        ReadingSubmitResponse response = readingService.submitReading(readingId, request);

        assertNotNull(response);
        assertEquals(100, response.getScore());
        assertEquals(1, response.getCorrectCount());
        assertEquals(0, response.getWrongCount());
        assertEquals(1, response.getTotalQuestions());
    }
}
