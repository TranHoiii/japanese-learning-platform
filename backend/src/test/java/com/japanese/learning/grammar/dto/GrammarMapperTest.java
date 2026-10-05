package com.japanese.learning.grammar.dto;

import com.japanese.learning.grammar.entity.Grammar;
import com.japanese.learning.grammar.entity.GrammarExample;
import com.japanese.learning.lesson.entity.Lesson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GrammarMapperTest {

    private GrammarMapper grammarMapper;
    private GrammarExampleMapper grammarExampleMapper;

    @BeforeEach
    void setUp() {
        grammarMapper = Mappers.getMapper(GrammarMapper.class);
        grammarExampleMapper = Mappers.getMapper(GrammarExampleMapper.class);
        ReflectionTestUtils.setField(grammarMapper, "grammarExampleMapper", grammarExampleMapper);
    }

    @Test
    @DisplayName("Mapper: Full entity maps correctly to GrammarResponse")
    void testToResponse_FullEntity() {
        Lesson lesson = new Lesson();
        lesson.setId(10L);

        GrammarExample ex = new GrammarExample();
        ex.setId(100L);
        ex.setJapanese("あめがふっていますから、かさをさします。");
        ex.setFurigana("あめがふっていますから、かさをさします。");
        ex.setTranslation("Vì trời đang mưa nên tôi che ô.");
        ex.setExplanation("Ví dụ cấu trúc nguyên nhân - kết quả");
        ex.setSortOrder(1);

        Grammar grammar = new Grammar();
        grammar.setId(1L);
        grammar.setLesson(lesson);
        grammar.setPattern("～から");
        grammar.setMeaning("Bởi vì, do");
        grammar.setUsage("V-thường + から");
        grammar.setExplanation("Dùng để biểu thị lý do, nguyên nhân.");
        grammar.setNotes("Dùng được trong cả văn nói và văn viết.");
        grammar.setSortOrder(1);
        grammar.setExamples(List.of(ex));

        GrammarResponse response = grammarMapper.toResponse(grammar);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals(10L, response.lessonId());
        assertEquals("～から", response.pattern());
        assertEquals("Bởi vì, do", response.meaning());
        assertEquals("V-thường + から", response.usage());
        assertEquals("Dùng để biểu thị lý do, nguyên nhân.", response.explanation());
        assertEquals("Dùng được trong cả văn nói và văn viết.", response.notes());
        assertEquals(1, response.sortOrder());
        assertNotNull(response.examples());
        assertEquals(1, response.examples().size());

        GrammarExampleResponse exResponse = response.examples().get(0);
        assertEquals(100L, exResponse.id());
        assertEquals("あめがふっていますから、かさをさします。", exResponse.japanese());
        assertEquals("Vì trời đang mưa nên tôi che ô.", exResponse.translation());
        assertEquals("Ví dụ cấu trúc nguyên nhân - kết quả", exResponse.explanation());
        assertEquals(1, exResponse.sortOrder());
    }

    @Test
    @DisplayName("Mapper: Entity with null lesson maps to null lessonId")
    void testToResponse_NullLesson() {
        Grammar grammar = new Grammar();
        grammar.setId(2L);
        grammar.setPattern("～てください");
        grammar.setMeaning("Hãy làm gì đó");
        grammar.setSortOrder(2);

        GrammarResponse response = grammarMapper.toResponse(grammar);

        assertNotNull(response);
        assertEquals(2L, response.id());
        assertNull(response.lessonId());
        assertEquals("～てください", response.pattern());
    }

    @Test
    @DisplayName("Mapper: Entity with null optional fields preserves nulls")
    void testToResponse_NullOptionalFields() {
        Lesson lesson = new Lesson();
        lesson.setId(5L);

        Grammar grammar = new Grammar();
        grammar.setId(3L);
        grammar.setLesson(lesson);
        grammar.setPattern("～ないでください");
        grammar.setSortOrder(3);

        GrammarResponse response = grammarMapper.toResponse(grammar);

        assertNotNull(response);
        assertEquals(3L, response.id());
        assertEquals(5L, response.lessonId());
        assertEquals("～ないでください", response.pattern());
        assertNull(response.meaning());
        assertNull(response.usage());
        assertNull(response.explanation());
        assertNull(response.notes());
        assertTrue(response.examples() == null || response.examples().isEmpty());
    }

    @Test
    @DisplayName("Mapper: Null entity returns null")
    void testToResponse_NullEntity() {
        GrammarResponse response = grammarMapper.toResponse(null);
        assertNull(response);
    }

    @Test
    @DisplayName("GrammarExampleMapper: Full entity maps correctly")
    void testExampleMapper_FullEntity() {
        GrammarExample ex = new GrammarExample();
        ex.setId(200L);
        ex.setJapanese("たべてください。");
        ex.setFurigana("たべてください。");
        ex.setTranslation("Hãy ăn đi.");
        ex.setExplanation("Mẫu câu yêu cầu lịch sự.");
        ex.setSortOrder(1);

        GrammarExampleResponse response = grammarExampleMapper.toResponse(ex);

        assertNotNull(response);
        assertEquals(200L, response.id());
        assertEquals("たべてください。", response.japanese());
        assertEquals("たべてください。", response.furigana());
        assertEquals("Hãy ăn đi.", response.translation());
        assertEquals("Mẫu câu yêu cầu lịch sự.", response.explanation());
        assertEquals(1, response.sortOrder());
    }

    @Test
    @DisplayName("GrammarExampleMapper: Null entity returns null")
    void testExampleMapper_NullEntity() {
        GrammarExampleResponse response = grammarExampleMapper.toResponse(null);
        assertNull(response);
    }

    @Test
    @DisplayName("GrammarExampleMapper: Null optional fields preserve nulls")
    void testExampleMapper_NullOptionalFields() {
        GrammarExample ex = new GrammarExample();
        ex.setId(201L);
        ex.setJapanese("みてください。");
        ex.setSortOrder(2);

        GrammarExampleResponse response = grammarExampleMapper.toResponse(ex);

        assertNotNull(response);
        assertEquals(201L, response.id());
        assertEquals("みてください。", response.japanese());
        assertNull(response.furigana());
        assertNull(response.translation());
        assertNull(response.explanation());
        assertEquals(2, response.sortOrder());
    }
}
