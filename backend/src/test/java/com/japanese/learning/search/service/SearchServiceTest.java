package com.japanese.learning.search.service;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.exercise.entity.Exercise;
import com.japanese.learning.exercise.enums.ExerciseType;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.grammar.entity.Grammar;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.entity.Kanji;
import com.japanese.learning.kanji.entity.LessonKanji;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.listening.entity.ListeningContent;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.reading.entity.ReadingContent;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.search.dto.SearchResponse;
import com.japanese.learning.search.dto.SearchResultItem;
import com.japanese.learning.vocabulary.entity.Vocabulary;
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
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SearchServiceTest {

    @Mock
    private VocabularyRepository vocabularyRepository;

    @Mock
    private GrammarRepository grammarRepository;

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

    private Level n5Level;
    private Lesson lesson1;

    @BeforeEach
    void setUp() {
        n5Level = new Level();
        n5Level.setId(1L);
        n5Level.setCode("N5");
        n5Level.setName("Tiếng Nhật sơ cấp N5");

        lesson1 = new Lesson();
        lesson1.setId(10L);
        lesson1.setTitle("Bài 01");
        lesson1.setLevel(n5Level);
    }

    @Test
    @DisplayName("Tìm kiếm tất cả nội dung không có filter type query 6 repositories")
    void testSearch_AllContentTypes() {
        Vocabulary v = new Vocabulary();
        v.setId(1L);
        v.setHiragana("たべる");
        v.setKanji("食べる");
        v.setMeaning("Ăn");
        v.setLesson(lesson1);

        Grammar g = new Grammar();
        g.setId(2L);
        g.setPattern("～を食べる");
        g.setMeaning("Ăn cái gì đó");
        g.setExplanation("Giải thích ăn");
        g.setLesson(lesson1);

        Kanji k = new Kanji();
        k.setId(3L);
        k.setKanji("食");
        k.setHanViet("THỰC");
        k.setMeaning("Ăn");

        ListeningContent lc = new ListeningContent();
        lc.setId(4L);
        lc.setTitle("Nghe bài ăn uống");
        lc.setDescription("Miêu tả ăn");
        lc.setLesson(lesson1);

        ReadingContent rc = new ReadingContent();
        rc.setId(5L);
        rc.setTitle("Bài đọc về ăn uống");
        rc.setContent("Nội dung ăn");
        rc.setTranslation("Dịch nghĩa ăn");
        rc.setLesson(lesson1);

        Exercise e = new Exercise();
        e.setId(6L);
        e.setTitle("Bài tập về từ 食べる");
        e.setExerciseType(ExerciseType.LESSON);
        e.setLesson(lesson1);

        when(vocabularyRepository.searchByKeyword(eq("食"), any())).thenReturn(List.of(v));
        when(grammarRepository.searchByKeyword(eq("食"), any())).thenReturn(List.of(g));
        when(kanjiRepository.searchByKeyword(eq("食"), any())).thenReturn(List.of(k));
        when(listeningContentRepository.searchByKeyword(eq("食"), any())).thenReturn(List.of(lc));
        when(readingContentRepository.searchByKeyword(eq("食"), any())).thenReturn(List.of(rc));
        when(exerciseRepository.searchByKeyword(eq("食"), any())).thenReturn(List.of(e));

        SearchResponse response = searchService.search("食", null, null, 0, 20);

        assertThat(response).isNotNull();
        assertThat(response.query()).isEqualTo("食");
        assertThat(response.total()).isEqualTo(6);
        assertThat(response.items()).hasSize(6);

        verify(vocabularyRepository).searchByKeyword(eq("食"), any());
        verify(grammarRepository).searchByKeyword(eq("食"), any());
        verify(kanjiRepository).searchByKeyword(eq("食"), any());
        verify(listeningContentRepository).searchByKeyword(eq("食"), any());
        verify(readingContentRepository).searchByKeyword(eq("食"), any());
        verify(exerciseRepository).searchByKeyword(eq("食"), any());
    }

    @Test
    @DisplayName("Tìm kiếm với filter type=VOCABULARY chỉ query VocabularyRepository")
    void testSearch_FilterVocabularyOnly() {
        Vocabulary v = new Vocabulary();
        v.setId(1L);
        v.setHiragana("たべる");
        v.setKanji("食べる");
        v.setMeaning("Ăn");
        v.setLesson(lesson1);

        when(vocabularyRepository.searchByKeyword(eq("食べる"), any())).thenReturn(List.of(v));

        SearchResponse response = searchService.search("食べる", "VOCABULARY", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        assertThat(response.items().get(0).contentType()).isEqualTo(ContentType.VOCABULARY);
        assertThat(response.items().get(0).title()).isEqualTo("食べる");

        verify(vocabularyRepository).searchByKeyword(eq("食べる"), any());
        verifyNoInteractions(grammarRepository, kanjiRepository, listeningContentRepository, readingContentRepository, exerciseRepository);
    }

    @Test
    @DisplayName("Tìm kiếm với filter type=KANJI chỉ query KanjiRepository")
    void testSearch_FilterKanjiOnly() {
        Kanji k = new Kanji();
        k.setId(10L);
        k.setKanji("食");
        k.setHanViet("THỰC");
        k.setMeaning("Ăn");

        when(kanjiRepository.searchByKeyword(eq("食"), any())).thenReturn(List.of(k));

        SearchResponse response = searchService.search("食", "KANJI", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        assertThat(response.items().get(0).contentType()).isEqualTo(ContentType.KANJI);
        assertThat(response.items().get(0).title()).isEqualTo("食");

        verify(kanjiRepository).searchByKeyword(eq("食"), any());
        verifyNoInteractions(vocabularyRepository, grammarRepository, listeningContentRepository, readingContentRepository, exerciseRepository);
    }

    @Test
    @DisplayName("Tìm kiếm với filter type=GRAMMAR chỉ query GrammarRepository")
    void testSearch_FilterGrammarOnly() {
        Grammar g = new Grammar();
        g.setId(20L);
        g.setPattern("～たい");
        g.setMeaning("Muốn làm gì đó");
        g.setLesson(lesson1);

        when(grammarRepository.searchByKeyword(eq("たい"), any())).thenReturn(List.of(g));

        SearchResponse response = searchService.search("たい", "GRAMMAR", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        assertThat(response.items().get(0).contentType()).isEqualTo(ContentType.GRAMMAR);
    }

    @Test
    @DisplayName("Tìm kiếm với filter type=LISTENING chỉ query ListeningContentRepository")
    void testSearch_FilterListeningOnly() {
        ListeningContent lc = new ListeningContent();
        lc.setId(30L);
        lc.setTitle("Bài nghe 1");
        lc.setLesson(lesson1);

        when(listeningContentRepository.searchByKeyword(eq("nghe"), any())).thenReturn(List.of(lc));

        SearchResponse response = searchService.search("nghe", "LISTENING", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        assertThat(response.items().get(0).contentType()).isEqualTo(ContentType.LISTENING);
    }

    @Test
    @DisplayName("Tìm kiếm với filter type=READING chỉ query ReadingContentRepository")
    void testSearch_FilterReadingOnly() {
        ReadingContent rc = new ReadingContent();
        rc.setId(40L);
        rc.setTitle("Bài đọc 1");
        rc.setLesson(lesson1);

        when(readingContentRepository.searchByKeyword(eq("đọc"), any())).thenReturn(List.of(rc));

        SearchResponse response = searchService.search("đọc", "READING", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        assertThat(response.items().get(0).contentType()).isEqualTo(ContentType.READING);
    }

    @Test
    @DisplayName("Tìm kiếm với filter type=EXERCISE chỉ query ExerciseRepository")
    void testSearch_FilterExerciseOnly() {
        Exercise e = new Exercise();
        e.setId(50L);
        e.setTitle("Bài tập 1");
        e.setLesson(lesson1);

        when(exerciseRepository.searchByKeyword(eq("bài tập"), any())).thenReturn(List.of(e));

        SearchResponse response = searchService.search("bài tập", "EXERCISE", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        assertThat(response.items().get(0).contentType()).isEqualTo(ContentType.EXERCISE);
    }

    @Test
    @DisplayName("Type không được hỗ trợ (TEST, KAIWA, USER...) ném lỗi IllegalArgumentException")
    void testSearch_UnsupportedType_ThrowsException() {
        assertThatThrownBy(() -> searchService.search("abc", "TEST", null, 0, 20))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Loại nội dung không được hỗ trợ");

        assertThatThrownBy(() -> searchService.search("abc", "KAIWA", null, 0, 20))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Loại nội dung không được hỗ trợ");

        assertThatThrownBy(() -> searchService.search("abc", "USER", null, 0, 20))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Loại nội dung không được hỗ trợ");

        assertThatThrownBy(() -> searchService.search("abc", "INVALID_TYPE", null, 0, 20))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Loại nội dung không được hỗ trợ");
    }

    @Test
    @DisplayName("Từ khóa rỗng hoặc chỉ có khoảng trắng ném lỗi")
    void testSearch_BlankQuery_ThrowsException() {
        assertThatThrownBy(() -> searchService.search("", null, null, 0, 20))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Từ khóa tìm kiếm không được để trống");

        assertThatThrownBy(() -> searchService.search("   ", null, null, 0, 20))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Từ khóa tìm kiếm không được để trống");

        assertThatThrownBy(() -> searchService.search(null, null, null, 0, 20))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Từ khóa tìm kiếm không được để trống");
    }

    @Test
    @DisplayName("Từ khóa dài hơn 100 ký tự ném lỗi")
    void testSearch_TooLongQuery_ThrowsException() {
        String longQuery = "a".repeat(101);
        assertThatThrownBy(() -> searchService.search(longQuery, null, null, 0, 20))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Từ khóa tìm kiếm không được vượt quá 100 ký tự");
    }

    @Test
    @DisplayName("Từ khóa tiếng Nhật và tiếng Việt được hỗ trợ và trim khoảng trắng")
    void testSearch_JapaneseAndVietnameseKeywords() {
        when(vocabularyRepository.searchByKeyword(eq("食べる"), any())).thenReturn(Collections.emptyList());
        when(grammarRepository.searchByKeyword(eq("食べる"), any())).thenReturn(Collections.emptyList());
        when(kanjiRepository.searchByKeyword(eq("食べる"), any())).thenReturn(Collections.emptyList());
        when(listeningContentRepository.searchByKeyword(eq("食べる"), any())).thenReturn(Collections.emptyList());
        when(readingContentRepository.searchByKeyword(eq("食べる"), any())).thenReturn(Collections.emptyList());
        when(exerciseRepository.searchByKeyword(eq("食べる"), any())).thenReturn(Collections.emptyList());

        SearchResponse response = searchService.search("  食べる  ", null, null, 0, 20);
        assertThat(response.query()).isEqualTo("食べる");

        when(vocabularyRepository.searchByKeyword(eq("ăn cơm"), any())).thenReturn(Collections.emptyList());
        when(grammarRepository.searchByKeyword(eq("ăn cơm"), any())).thenReturn(Collections.emptyList());
        when(kanjiRepository.searchByKeyword(eq("ăn cơm"), any())).thenReturn(Collections.emptyList());
        when(listeningContentRepository.searchByKeyword(eq("ăn cơm"), any())).thenReturn(Collections.emptyList());
        when(readingContentRepository.searchByKeyword(eq("ăn cơm"), any())).thenReturn(Collections.emptyList());
        when(exerciseRepository.searchByKeyword(eq("ăn cơm"), any())).thenReturn(Collections.emptyList());

        SearchResponse vnResponse = searchService.search("ăn cơm", null, null, 0, 20);
        assertThat(vnResponse.query()).isEqualTo("ăn cơm");
    }

    @Test
    @DisplayName("Không tìm thấy kết quả trả về total=0 và danh sách rỗng")
    void testSearch_NoResults() {
        when(vocabularyRepository.searchByKeyword(eq("xyzabc"), any())).thenReturn(Collections.emptyList());
        when(grammarRepository.searchByKeyword(eq("xyzabc"), any())).thenReturn(Collections.emptyList());
        when(kanjiRepository.searchByKeyword(eq("xyzabc"), any())).thenReturn(Collections.emptyList());
        when(listeningContentRepository.searchByKeyword(eq("xyzabc"), any())).thenReturn(Collections.emptyList());
        when(readingContentRepository.searchByKeyword(eq("xyzabc"), any())).thenReturn(Collections.emptyList());
        when(exerciseRepository.searchByKeyword(eq("xyzabc"), any())).thenReturn(Collections.emptyList());

        SearchResponse response = searchService.search("xyzabc", null, null, 0, 20);
        assertThat(response.total()).isEqualTo(0);
        assertThat(response.items()).isEmpty();
    }

    @Test
    @DisplayName("Phân trang cắt đúng subList và tính total")
    void testSearch_Pagination() {
        List<Vocabulary> list = new ArrayList<>();
        for (long i = 1; i <= 25; i++) {
            Vocabulary v = new Vocabulary();
            v.setId(i);
            v.setHiragana("単語" + i);
            v.setMeaning("Nghĩa " + i);
            v.setLesson(lesson1);
            list.add(v);
        }

        when(vocabularyRepository.searchByKeyword(eq("単語"), any())).thenReturn(list);

        // Page 0, size 10 -> items 1..10
        SearchResponse page0 = searchService.search("単語", "VOCABULARY", null, 0, 10);
        assertThat(page0.total()).isEqualTo(25);
        assertThat(page0.page()).isEqualTo(0);
        assertThat(page0.size()).isEqualTo(10);
        assertThat(page0.items()).hasSize(10);
        assertThat(page0.items().get(0).contentId()).isEqualTo(1L);

        // Page 2, size 10 -> items 21..25
        SearchResponse page2 = searchService.search("単語", "VOCABULARY", null, 2, 10);
        assertThat(page2.total()).isEqualTo(25);
        assertThat(page2.page()).isEqualTo(2);
        assertThat(page2.size()).isEqualTo(10);
        assertThat(page2.items()).hasSize(5);
        assertThat(page2.items().get(0).contentId()).isEqualTo(21L);
    }

    @Test
    @DisplayName("Thứ tự kết quả xác định (Deterministic ordering: exact match > prefix match > substring)")
    void testSearch_DeterministicOrdering() {
        Vocabulary exact = new Vocabulary();
        exact.setId(3L);
        exact.setKanji("食べる");
        exact.setHiragana("たべる");
        exact.setMeaning("Ăn");

        Vocabulary prefix = new Vocabulary();
        prefix.setId(2L);
        prefix.setKanji("食べる人");
        prefix.setHiragana("たべるひと");
        prefix.setMeaning("Người ăn");

        Vocabulary substring = new Vocabulary();
        substring.setId(1L);
        substring.setKanji("朝食を食べる");
        substring.setHiragana("ちょうしょくをたべる");
        substring.setMeaning("Ăn sáng");

        // Return out of order from repo
        when(vocabularyRepository.searchByKeyword(eq("食べる"), any()))
                .thenReturn(List.of(substring, prefix, exact));

        SearchResponse response = searchService.search("食べる", "VOCABULARY", null, 0, 20);

        // Expect exact first, then prefix, then substring
        assertThat(response.items()).hasSize(3);
        assertThat(response.items().get(0).title()).isEqualTo("食べる");
        assertThat(response.items().get(1).title()).isEqualTo("食べる人");
        assertThat(response.items().get(2).title()).isEqualTo("朝食を食べる");
    }

    @Test
    @DisplayName("Bộ lọc level được truyền chính xác vào repository")
    void testSearch_LevelFilter() {
        when(vocabularyRepository.searchByKeyword(eq("食べる"), eq("N5"))).thenReturn(Collections.emptyList());

        searchService.search("食べる", "VOCABULARY", "N5", 0, 20);

        verify(vocabularyRepository).searchByKeyword(eq("食べる"), eq("N5"));
    }

    @Test
    @DisplayName("Kanji có liên kết LessonKanji được map đầy đủ level, lessonId, lessonTitle")
    void testSearch_KanjiWithLessonMapping() {
        LessonKanji lk = new LessonKanji();
        lk.setLesson(lesson1);

        Kanji k = new Kanji();
        k.setId(100L);
        k.setKanji("水");
        k.setHanViet("THỦY");
        k.setMeaning("Nước");
        k.setLessonKanjis(List.of(lk));

        when(kanjiRepository.searchByKeyword(eq("水"), eq("N5"))).thenReturn(List.of(k));

        SearchResponse response = searchService.search("水", "KANJI", "N5", 0, 20);

        SearchResultItem item = response.items().get(0);
        assertThat(item.title()).isEqualTo("水");
        assertThat(item.subtitle()).isEqualTo("THỦY");
        assertThat(item.level()).isEqualTo("N5");
        assertThat(item.lessonId()).isEqualTo(10L);
        assertThat(item.lessonTitle()).isEqualTo("Bài 01");
    }
}
