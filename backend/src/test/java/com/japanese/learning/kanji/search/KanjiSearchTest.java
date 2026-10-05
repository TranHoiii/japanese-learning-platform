package com.japanese.learning.kanji.search;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.entity.Kanji;
import com.japanese.learning.kanji.entity.LessonKanji;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.search.dto.SearchResponse;
import com.japanese.learning.search.dto.SearchResultItem;
import com.japanese.learning.search.service.SearchServiceImpl;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class KanjiSearchTest {

    @Mock
    private KanjiRepository kanjiRepository;

    @Mock
    private VocabularyRepository vocabularyRepository;

    @Mock
    private GrammarRepository grammarRepository;

    @Mock
    private ListeningContentRepository listeningContentRepository;

    @Mock
    private ReadingContentRepository readingContentRepository;

    @Mock
    private ExerciseRepository exerciseRepository;

    @InjectMocks
    private SearchServiceImpl searchService;

    private Lesson lesson;
    private Level level;
    private Kanji kanji;
    private LessonKanji lessonKanji;

    @BeforeEach
    void setUp() {
        level = new Level();
        level.setId(1L);
        level.setCode("N5");
        level.setName("N5 Sơ cấp");

        lesson = new Lesson();
        lesson.setId(10L);
        lesson.setTitle("Bài 01");
        lesson.setLevel(level);

        kanji = new Kanji();
        kanji.setId(100L);
        kanji.setKanji("日");
        kanji.setHanViet("NHẬT");
        kanji.setOnyomi("ニチ, ジツ");
        kanji.setKunyomi("ひ, -び, -か");
        kanji.setMeaning("Mặt trời, ngày");
        kanji.setMnemonic("Hình dạng mặt trời tròn có tia sáng");
        kanji.setStrokeCount(4);

        lessonKanji = new LessonKanji();
        lessonKanji.setId(1L);
        lessonKanji.setLesson(lesson);
        lessonKanji.setKanji(kanji);
        lessonKanji.setSortOrder(1);

        kanji.setLessonKanjis(new ArrayList<>(List.of(lessonKanji)));
    }

    @Test
    @DisplayName("Search Kanji: Khớp theo chữ Hán tiếng Nhật")
    void testSearch_Kanji_CharacterMatch() {
        when(kanjiRepository.searchByKeyword(eq("日"), any())).thenReturn(List.of(kanji));

        SearchResponse response = searchService.search("日", "KANJI", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.contentType()).isEqualTo(ContentType.KANJI);
        assertThat(item.contentId()).isEqualTo(100L);
        assertThat(item.title()).isEqualTo("日");
        assertThat(item.subtitle()).isEqualTo("NHẬT");
        assertThat(item.description()).isEqualTo("Mặt trời, ngày");
        assertThat(item.level()).isEqualTo("N5");
        assertThat(item.lessonId()).isEqualTo(10L);
        assertThat(item.lessonTitle()).isEqualTo("Bài 01");

        verify(kanjiRepository).searchByKeyword(eq("日"), any());
    }

    @Test
    @DisplayName("Search Kanji: Khớp theo âm Hán Việt")
    void testSearch_Kanji_HanVietMatch() {
        when(kanjiRepository.searchByKeyword(eq("NHẬT"), any())).thenReturn(List.of(kanji));

        SearchResponse response = searchService.search("NHẬT", "KANJI", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.title()).isEqualTo("日");
        assertThat(item.subtitle()).isEqualTo("NHẬT");
    }

    @Test
    @DisplayName("Search Kanji: Khớp theo nghĩa tiếng Việt")
    void testSearch_Kanji_MeaningMatch() {
        when(kanjiRepository.searchByKeyword(eq("Mặt trời"), any())).thenReturn(List.of(kanji));

        SearchResponse response = searchService.search("Mặt trời", "KANJI", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.title()).isEqualTo("日");
        assertThat(item.description()).isEqualTo("Mặt trời, ngày");
    }

    @Test
    @DisplayName("Search Kanji: Lọc theo level N5 thành công")
    void testSearch_Kanji_WithLevelFilter() {
        when(kanjiRepository.searchByKeyword(eq("日"), eq("N5"))).thenReturn(List.of(kanji));

        SearchResponse response = searchService.search("日", "KANJI", "N5", 0, 20);

        assertThat(response.total()).isEqualTo(1);
        assertThat(response.items().get(0).level()).isEqualTo("N5");
        verify(kanjiRepository).searchByKeyword(eq("日"), eq("N5"));
    }

    @Test
    @DisplayName("Search Kanji: Khi HanViet null thì fallback sang Onyomi làm subtitle")
    void testSearch_Kanji_FallbackOnyomiWhenHanVietNull() {
        kanji.setHanViet(null);
        when(kanjiRepository.searchByKeyword(eq("ニチ"), any())).thenReturn(List.of(kanji));

        SearchResponse response = searchService.search("ニチ", "KANJI", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.subtitle()).isEqualTo("ニチ, ジツ");
    }

    @Test
    @DisplayName("Search Kanji: Khi cả HanViet và Onyomi null thì fallback sang Kunyomi làm subtitle")
    void testSearch_Kanji_FallbackKunyomiWhenHanVietAndOnyomiNull() {
        kanji.setHanViet(null);
        kanji.setOnyomi(null);
        when(kanjiRepository.searchByKeyword(eq("ひ"), any())).thenReturn(List.of(kanji));

        SearchResponse response = searchService.search("ひ", "KANJI", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.subtitle()).isEqualTo("ひ, -び, -か");
    }

    @Test
    @DisplayName("Search Kanji: Lọc theo level chọn đúng LessonKanji có level khớp")
    void testSearch_Kanji_MultiLesson_MatchesFilteredLevel() {
        Level n4Level = new Level();
        n4Level.setId(2L);
        n4Level.setCode("N4");

        Lesson n4Lesson = new Lesson();
        n4Lesson.setId(20L);
        n4Lesson.setTitle("Bài 26");
        n4Lesson.setLevel(n4Level);

        LessonKanji lkN4 = new LessonKanji();
        lkN4.setId(2L);
        lkN4.setLesson(n4Lesson);
        lkN4.setKanji(kanji);

        kanji.getLessonKanjis().add(lkN4);

        when(kanjiRepository.searchByKeyword(eq("日"), eq("N4"))).thenReturn(List.of(kanji));

        SearchResponse response = searchService.search("日", "KANJI", "N4", 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.level()).isEqualTo("N4");
        assertThat(item.lessonId()).isEqualTo(20L);
        assertThat(item.lessonTitle()).isEqualTo("Bài 26");
    }

    @Test
    @DisplayName("Search Kanji: Khi không có kết quả trả về danh sách rỗng")
    void testSearch_Kanji_NoMatch_ReturnsEmpty() {
        when(kanjiRepository.searchByKeyword(eq("không_có"), any())).thenReturn(Collections.emptyList());

        SearchResponse response = searchService.search("không_có", "KANJI", null, 0, 20);

        assertThat(response.total()).isEqualTo(0);
        assertThat(response.items()).isEmpty();
    }

    @Test
    @DisplayName("Search Kanji: Xử lý an toàn khi Kanji chưa được gán vào bài học nào")
    void testSearch_Kanji_NoLessonAssigned() {
        kanji.setLessonKanjis(null);
        when(kanjiRepository.searchByKeyword(eq("日"), any())).thenReturn(List.of(kanji));

        SearchResponse response = searchService.search("日", "KANJI", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.level()).isNull();
        assertThat(item.lessonId()).isNull();
        assertThat(item.lessonTitle()).isNull();
    }

    @Test
    @DisplayName("Search Kanji: Xử lý an toàn khi bài học có level null")
    void testSearch_Kanji_LessonHasNullLevel() {
        lesson.setLevel(null);
        when(kanjiRepository.searchByKeyword(eq("日"), any())).thenReturn(List.of(kanji));

        SearchResponse response = searchService.search("日", "KANJI", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.level()).isNull();
        assertThat(item.lessonId()).isEqualTo(10L);
        assertThat(item.lessonTitle()).isEqualTo("Bài 01");
    }
}
