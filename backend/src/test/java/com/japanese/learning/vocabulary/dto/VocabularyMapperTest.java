package com.japanese.learning.vocabulary.dto;

import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.vocabulary.entity.Vocabulary;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

class VocabularyMapperTest {

    private final VocabularyMapper mapper = Mappers.getMapper(VocabularyMapper.class);

    @Test
    @DisplayName("Mapper: Full entity maps correctly to VocabularyResponse")
    void testToResponse_FullEntity() {
        Lesson lesson = new Lesson();
        lesson.setId(10L);

        Vocabulary entity = new Vocabulary();
        entity.setId(1L);
        entity.setLesson(lesson);
        entity.setHiragana("ねこ");
        entity.setKanji("猫");
        entity.setHanViet("Miêu");
        entity.setMeaning("Con mèo");
        entity.setPartOfSpeech("Danh từ");
        entity.setAudioUrl("https://example.com/audio/neko.mp3");
        entity.setNotes("Từ vựng N5 quen thuộc");

        VocabularyResponse response = mapper.toResponse(entity);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals(10L, response.lessonId());
        assertEquals("ねこ", response.hiragana());
        assertEquals("猫", response.kanji());
        assertEquals("Miêu", response.hanViet());
        assertEquals("Con mèo", response.meaning());
        assertEquals("Danh từ", response.partOfSpeech());
        assertEquals("https://example.com/audio/neko.mp3", response.audioUrl());
        assertEquals("Từ vựng N5 quen thuộc", response.notes());
    }

    @Test
    @DisplayName("Mapper: Entity with null lesson maps to null lessonId")
    void testToResponse_NullLesson() {
        Vocabulary entity = new Vocabulary();
        entity.setId(2L);
        entity.setHiragana("いぬ");
        entity.setMeaning("Con chó");

        VocabularyResponse response = mapper.toResponse(entity);

        assertNotNull(response);
        assertEquals(2L, response.id());
        assertNull(response.lessonId());
        assertEquals("いぬ", response.hiragana());
        assertEquals("Con chó", response.meaning());
    }

    @Test
    @DisplayName("Mapper: Entity with null optional fields preserves nulls")
    void testToResponse_NullOptionalFields() {
        Lesson lesson = new Lesson();
        lesson.setId(5L);

        Vocabulary entity = new Vocabulary();
        entity.setId(3L);
        entity.setLesson(lesson);
        entity.setHiragana("たべる");
        entity.setMeaning("Ăn");

        VocabularyResponse response = mapper.toResponse(entity);

        assertNotNull(response);
        assertEquals(3L, response.id());
        assertEquals(5L, response.lessonId());
        assertEquals("たべる", response.hiragana());
        assertNull(response.kanji());
        assertNull(response.hanViet());
        assertEquals("Ăn", response.meaning());
        assertNull(response.partOfSpeech());
        assertNull(response.audioUrl());
        assertNull(response.notes());
    }

    @Test
    @DisplayName("Mapper: Null entity returns null")
    void testToResponse_NullEntity() {
        VocabularyResponse response = mapper.toResponse(null);
        assertNull(response);
    }
}
