package com.japanese.learning.reading.dto;

import com.japanese.learning.exercise.enums.QuestionType;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.reading.entity.ReadingContent;
import com.japanese.learning.reading.entity.ReadingOption;
import com.japanese.learning.reading.entity.ReadingQuestion;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ReadingMapperTest {

    private ReadingContentMapper readingContentMapper;
    private ReadingQuestionMapper readingQuestionMapper;
    private ReadingOptionMapper readingOptionMapper;

    @BeforeEach
    void setUp() {
        readingContentMapper = Mappers.getMapper(ReadingContentMapper.class);
        readingQuestionMapper = Mappers.getMapper(ReadingQuestionMapper.class);
        readingOptionMapper = Mappers.getMapper(ReadingOptionMapper.class);

        ReflectionTestUtils.setField(readingQuestionMapper, "readingOptionMapper", readingOptionMapper);
        ReflectionTestUtils.setField(readingContentMapper, "readingQuestionMapper", readingQuestionMapper);
    }

    @Test
    @DisplayName("ReadingContentMapper: Maps full entity with nested questions and options correctly")
    void testReadingContentMapper_FullEntity() {
        Lesson lesson = new Lesson();
        lesson.setId(10L);
        lesson.setTitle("Bài 01");

        ReadingOption opt1 = new ReadingOption();
        opt1.setId(101L);
        opt1.setContent("Tokyo");
        opt1.setCorrect(true);
        opt1.setSortOrder(1);

        ReadingOption opt2 = new ReadingOption();
        opt2.setId(102L);
        opt2.setContent("Kyoto");
        opt2.setCorrect(false);
        opt2.setSortOrder(2);

        ReadingQuestion q1 = new ReadingQuestion();
        q1.setId(201L);
        q1.setQuestion("Thủ đô của Nhật Bản là gì?");
        q1.setQuestionType(QuestionType.MULTIPLE_CHOICE);
        q1.setExplanation("Tokyo là thủ đô của Nhật Bản.");
        q1.setImageUrl("/images/reading/q1.png");
        q1.setSortOrder(1);
        q1.setOptions(new ArrayList<>(List.of(opt1, opt2)));

        ReadingContent reading = new ReadingContent();
        reading.setId(1L);
        reading.setLesson(lesson);
        reading.setTitle("Nhật Bản ngày nay");
        reading.setContent("Tokyo là thành phố lớn...");
        reading.setTranslation("Tokyo is a big city...");
        reading.setImageUrl("/images/reading/reading1.png");
        reading.setSortOrder(1);
        reading.setQuestions(new ArrayList<>(List.of(q1)));

        ReadingContentResponse response = readingContentMapper.toResponse(reading);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals(10L, response.getLessonId());
        assertEquals("Nhật Bản ngày nay", response.getTitle());
        assertEquals("Tokyo là thành phố lớn...", response.getContent());
        assertEquals("Tokyo is a big city...", response.getTranslation());
        assertEquals("/images/reading/reading1.png", response.getImageUrl());
        assertEquals(1, response.getSortOrder());

        assertNotNull(response.getQuestions());
        assertEquals(1, response.getQuestions().size());

        ReadingQuestionResponse qResponse = response.getQuestions().get(0);
        assertEquals(201L, qResponse.getId());
        assertEquals("Thủ đô của Nhật Bản là gì?", qResponse.getQuestion());
        assertEquals(QuestionType.MULTIPLE_CHOICE, qResponse.getQuestionType());
        assertEquals("/images/reading/q1.png", qResponse.getImageUrl());
        assertEquals(1, qResponse.getSortOrder());

        assertNotNull(qResponse.getOptions());
        assertEquals(2, qResponse.getOptions().size());

        ReadingOptionResponse oResponse1 = qResponse.getOptions().get(0);
        assertEquals(101L, oResponse1.getId());
        assertEquals("Tokyo", oResponse1.getContent());
        assertEquals(1, oResponse1.getSortOrder());

        ReadingOptionResponse oResponse2 = qResponse.getOptions().get(1);
        assertEquals(102L, oResponse2.getId());
        assertEquals("Kyoto", oResponse2.getContent());
        assertEquals(2, oResponse2.getSortOrder());
    }

    @Test
    @DisplayName("ReadingContentMapper: Null optional fields preserve null values")
    void testReadingContentMapper_NullOptionalFields() {
        ReadingContent reading = new ReadingContent();
        reading.setId(2L);
        reading.setTitle("Bài đọc đơn giản");
        reading.setContent("Nội dung ngắn");
        reading.setSortOrder(2);
        // lesson, translation, imageUrl, questions are null

        ReadingContentResponse response = readingContentMapper.toResponse(reading);

        assertNotNull(response);
        assertEquals(2L, response.getId());
        assertNull(response.getLessonId());
        assertEquals("Bài đọc đơn giản", response.getTitle());
        assertEquals("Nội dung ngắn", response.getContent());
        assertNull(response.getTranslation());
        assertNull(response.getImageUrl());
        assertEquals(2, response.getSortOrder());
        assertTrue(response.getQuestions() == null || response.getQuestions().isEmpty());
    }

    @Test
    @DisplayName("ReadingContentMapper: Null entity returns null")
    void testReadingContentMapper_NullEntity() {
        assertNull(readingContentMapper.toResponse(null));
    }

    @Test
    @DisplayName("ReadingQuestionMapper: Maps question correctly and preserves null optional fields")
    void testReadingQuestionMapper_FullAndNullFields() {
        ReadingQuestion q = new ReadingQuestion();
        q.setId(301L);
        q.setQuestion("Ai là tác giả?");
        q.setQuestionType(QuestionType.MULTIPLE_CHOICE);
        q.setSortOrder(3);

        ReadingQuestionResponse response = readingQuestionMapper.toResponse(q);

        assertNotNull(response);
        assertEquals(301L, response.getId());
        assertEquals("Ai là tác giả?", response.getQuestion());
        assertEquals(QuestionType.MULTIPLE_CHOICE, response.getQuestionType());
        assertNull(response.getImageUrl());
        assertEquals(3, response.getSortOrder());
        assertTrue(response.getOptions() == null || response.getOptions().isEmpty());
    }

    @Test
    @DisplayName("ReadingQuestionMapper: Null entity returns null")
    void testReadingQuestionMapper_NullEntity() {
        assertNull(readingQuestionMapper.toResponse(null));
    }

    @Test
    @DisplayName("ReadingOptionMapper: Maps option correctly")
    void testReadingOptionMapper_Full() {
        ReadingOption opt = new ReadingOption();
        opt.setId(401L);
        opt.setContent("Lựa chọn đúng");
        opt.setCorrect(true);
        opt.setSortOrder(1);

        ReadingOptionResponse response = readingOptionMapper.toResponse(opt);

        assertNotNull(response);
        assertEquals(401L, response.getId());
        assertEquals("Lựa chọn đúng", response.getContent());
        assertEquals(1, response.getSortOrder());
    }

    @Test
    @DisplayName("ReadingOptionMapper: Null entity returns null")
    void testReadingOptionMapper_NullEntity() {
        assertNull(readingOptionMapper.toResponse(null));
    }

    @Test
    @DisplayName("Security & Contract: Learner DTOs must never contain answer keys or explanations")
    void testSecurityContract_NoAnswerLeakageInLearnerDTOs() {
        // Assert at reflection level that ReadingQuestionResponse has no 'explanation' field
        assertThat(ReadingQuestionResponse.class.getDeclaredFields())
                .extracting("name")
                .doesNotContain("explanation", "answer", "correctAnswer");

        // Assert at reflection level that ReadingOptionResponse has no 'correct' or 'isCorrect' field
        assertThat(ReadingOptionResponse.class.getDeclaredFields())
                .extracting("name")
                .doesNotContain("correct", "isCorrect");
    }
}
