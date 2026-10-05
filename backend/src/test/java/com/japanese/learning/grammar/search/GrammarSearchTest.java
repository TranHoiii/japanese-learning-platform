package com.japanese.learning.grammar.search;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.grammar.entity.Grammar;
import com.japanese.learning.grammar.entity.GrammarExample;
import com.japanese.learning.grammar.repository.GrammarRepository;
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

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GrammarSearchTest {

    @Mock
    private GrammarRepository grammarRepository;

    @Mock
    private VocabularyRepository vocabularyRepository;

    @Mock
    private KanjiRepository kanjiRepository;

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
    private Grammar grammar;

    @BeforeEach
    void setUp() {
        level = new Level();
        level.setId(1L);
        level.setCode("N5");

        lesson = new Lesson();
        lesson.setId(10L);
        lesson.setTitle("Bài 01");
        lesson.setLevel(level);

        grammar = new Grammar();
        grammar.setId(100L);
        grammar.setPattern("～から");
        grammar.setMeaning("Bởi vì, do");
        grammar.setUsage("V-thường + から");
        grammar.setExplanation("Biểu thị nguyên nhân, lý do.");
        grammar.setNotes("Dùng trong câu chỉ lý do");
        grammar.setSortOrder(1);
        grammar.setLesson(lesson);
    }

    @Test
    @DisplayName("Search Grammar: Khớp theo pattern tiếng Nhật")
    void testSearch_Grammar_PatternMatch() {
        when(grammarRepository.searchByKeyword(eq("から"), any())).thenReturn(List.of(grammar));

        SearchResponse response = searchService.search("から", "GRAMMAR", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.contentType()).isEqualTo(ContentType.GRAMMAR);
        assertThat(item.contentId()).isEqualTo(100L);
        assertThat(item.title()).isEqualTo("～から");
        assertThat(item.subtitle()).isEqualTo("Bởi vì, do");
        assertThat(item.description()).isEqualTo("Biểu thị nguyên nhân, lý do.");
        assertThat(item.level()).isEqualTo("N5");
        assertThat(item.lessonId()).isEqualTo(10L);
        assertThat(item.lessonTitle()).isEqualTo("Bài 01");

        verify(grammarRepository).searchByKeyword(eq("から"), any());
    }

    @Test
    @DisplayName("Search Grammar: Khớp theo ý nghĩa tiếng Việt")
    void testSearch_Grammar_MeaningMatch() {
        when(grammarRepository.searchByKeyword(eq("Bởi vì"), any())).thenReturn(List.of(grammar));

        SearchResponse response = searchService.search("Bởi vì", "GRAMMAR", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.title()).isEqualTo("～から");
        assertThat(item.subtitle()).isEqualTo("Bởi vì, do");
    }

    @Test
    @DisplayName("Search Grammar: Lọc theo level N5 thành công")
    void testSearch_Grammar_WithLevelFilter() {
        when(grammarRepository.searchByKeyword(eq("から"), eq("N5"))).thenReturn(List.of(grammar));

        SearchResponse response = searchService.search("から", "GRAMMAR", "N5", 0, 20);

        assertThat(response.total()).isEqualTo(1);
        assertThat(response.items().get(0).level()).isEqualTo("N5");
        verify(grammarRepository).searchByKeyword(eq("から"), eq("N5"));
    }

    @Test
    @DisplayName("Search Grammar: Khi explanation để trống thì fallback sang usage làm description")
    void testSearch_Grammar_FallbackUsageWhenExplanationNull() {
        Grammar gNoExplanation = new Grammar();
        gNoExplanation.setId(101L);
        gNoExplanation.setPattern("～てください");
        gNoExplanation.setMeaning("Hãy làm");
        gNoExplanation.setUsage("V-te + ください");
        gNoExplanation.setExplanation(null);
        gNoExplanation.setLesson(lesson);

        when(grammarRepository.searchByKeyword(eq("ください"), any())).thenReturn(List.of(gNoExplanation));

        SearchResponse response = searchService.search("ください", "GRAMMAR", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.description()).isEqualTo("V-te + ください");
    }

    @Test
    @DisplayName("Search Grammar: Khi không tìm thấy kết quả trả về danh sách rỗng")
    void testSearch_Grammar_NoMatch_ReturnsEmpty() {
        when(grammarRepository.searchByKeyword(eq("không_có"), any())).thenReturn(Collections.emptyList());

        SearchResponse response = searchService.search("không_có", "GRAMMAR", null, 0, 20);

        assertThat(response.total()).isEqualTo(0);
        assertThat(response.items()).isEmpty();
    }

    @Test
    @DisplayName("Search Grammar: Xử lý an toàn khi lesson hoặc level là null")
    void testSearch_Grammar_NullLessonOrLevel() {
        Grammar gNoLesson = new Grammar();
        gNoLesson.setId(102L);
        gNoLesson.setPattern("～も");
        gNoLesson.setMeaning("Cũng");
        gNoLesson.setLesson(null);

        when(grammarRepository.searchByKeyword(eq("も"), any())).thenReturn(List.of(gNoLesson));

        SearchResponse response = searchService.search("も", "GRAMMAR", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.level()).isNull();
        assertThat(item.lessonId()).isNull();
        assertThat(item.lessonTitle()).isNull();
    }
}
