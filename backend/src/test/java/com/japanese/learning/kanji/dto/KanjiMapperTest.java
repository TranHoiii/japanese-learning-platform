package com.japanese.learning.kanji.dto;

import com.japanese.learning.kanji.entity.Kanji;
import com.japanese.learning.kanji.entity.KanjiCompound;
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

class KanjiMapperTest {

    private KanjiMapper kanjiMapper;
    private KanjiCompoundMapper kanjiCompoundMapper;

    @BeforeEach
    void setUp() {
        kanjiMapper = Mappers.getMapper(KanjiMapper.class);
        kanjiCompoundMapper = Mappers.getMapper(KanjiCompoundMapper.class);
        ReflectionTestUtils.setField(kanjiMapper, "kanjiCompoundMapper", kanjiCompoundMapper);
    }

    @Test
    @DisplayName("Mapper: Full entity maps correctly to KanjiResponse")
    void testToResponse_FullEntity() {
        KanjiCompound compound = new KanjiCompound();
        compound.setId(10L);
        compound.setWord("日本");
        compound.setReading("にほん");
        compound.setMeaning("Nhật Bản");
        compound.setExampleSentence("日本に行きます。");

        Kanji kanji = new Kanji();
        kanji.setId(1L);
        kanji.setKanji("日");
        kanji.setHanViet("NHẬT");
        kanji.setOnyomi("ニチ, ジツ");
        kanji.setKunyomi("ひ, -び, -か");
        kanji.setMeaning("Mặt trời, ngày");
        kanji.setStrokeCount(4);
        kanji.setStrokeOrderUrl("/images/kanji/nichi.svg");
        kanji.setMnemonic("Hình dạng mặt trời");
        kanji.setMnemonicImageUrl("/images/kanji/sun.png");
        kanji.setCompounds(List.of(compound));

        KanjiResponse response = kanjiMapper.toResponse(kanji);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("日", response.getKanji());
        assertEquals("NHẬT", response.getHanViet());
        assertEquals("ニチ, ジツ", response.getOnyomi());
        assertEquals("ひ, -び, -か", response.getKunyomi());
        assertEquals("Mặt trời, ngày", response.getMeaning());
        assertEquals(4, response.getStrokeCount());
        assertEquals("/images/kanji/nichi.svg", response.getStrokeOrderUrl());
        assertEquals("Hình dạng mặt trời", response.getMnemonic());
        assertEquals("/images/kanji/sun.png", response.getMnemonicImageUrl());

        assertNotNull(response.getCompounds());
        assertEquals(1, response.getCompounds().size());
        KanjiCompoundResponse cResponse = response.getCompounds().get(0);
        assertEquals(10L, cResponse.getId());
        assertEquals("日本", cResponse.getWord());
        assertEquals("にほん", cResponse.getReading());
        assertEquals("Nhật Bản", cResponse.getMeaning());
        assertEquals("日本に行きます。", cResponse.getExampleSentence());
    }

    @Test
    @DisplayName("Mapper: Entity with null optional fields preserves nulls")
    void testToResponse_NullOptionalFields() {
        Kanji kanji = new Kanji();
        kanji.setId(2L);
        kanji.setKanji("月");

        KanjiResponse response = kanjiMapper.toResponse(kanji);

        assertNotNull(response);
        assertEquals(2L, response.getId());
        assertEquals("月", response.getKanji());
        assertNull(response.getHanViet());
        assertNull(response.getOnyomi());
        assertNull(response.getKunyomi());
        assertNull(response.getMeaning());
        assertNull(response.getStrokeCount());
        assertNull(response.getStrokeOrderUrl());
        assertNull(response.getMnemonic());
        assertNull(response.getMnemonicImageUrl());
        assertTrue(response.getCompounds() == null || response.getCompounds().isEmpty());
    }

    @Test
    @DisplayName("Mapper: Null entity returns null")
    void testToResponse_NullEntity() {
        assertNull(kanjiMapper.toResponse(null));
    }

    @Test
    @DisplayName("KanjiCompoundMapper: Full entity maps correctly")
    void testCompoundMapper_FullEntity() {
        KanjiCompound compound = new KanjiCompound();
        compound.setId(20L);
        compound.setWord("月曜日");
        compound.setReading("げつようび");
        compound.setMeaning("Thứ hai");
        compound.setExampleSentence("月曜日にテストがあります。");

        KanjiCompoundResponse response = kanjiCompoundMapper.toResponse(compound);

        assertNotNull(response);
        assertEquals(20L, response.getId());
        assertEquals("月曜日", response.getWord());
        assertEquals("げつようび", response.getReading());
        assertEquals("Thứ hai", response.getMeaning());
        assertEquals("月曜日にテストがあります。", response.getExampleSentence());
    }

    @Test
    @DisplayName("KanjiCompoundMapper: Null entity returns null")
    void testCompoundMapper_NullEntity() {
        assertNull(kanjiCompoundMapper.toResponse(null));
    }

    @Test
    @DisplayName("KanjiCompoundMapper: Null optional fields preserve nulls")
    void testCompoundMapper_NullOptionalFields() {
        KanjiCompound compound = new KanjiCompound();
        compound.setId(21L);
        compound.setWord("今月");
        compound.setReading("こんげつ");
        compound.setMeaning("Tháng này");

        KanjiCompoundResponse response = kanjiCompoundMapper.toResponse(compound);

        assertNotNull(response);
        assertEquals(21L, response.getId());
        assertEquals("今月", response.getWord());
        assertEquals("こんげつ", response.getReading());
        assertEquals("Tháng này", response.getMeaning());
        assertNull(response.getExampleSentence());
    }
}
