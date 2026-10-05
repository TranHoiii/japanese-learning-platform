package com.japanese.learning.reading.search;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.reading.entity.ReadingContent;
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
class ReadingSearchTest {

    @Mock
    private ReadingContentRepository readingContentRepository;

    @Mock
    private VocabularyRepository vocabularyRepository;

    @Mock
    private GrammarRepository grammarRepository;

    @Mock
    private KanjiRepository kanjiRepository;

    @Mock
    private ListeningContentRepository listeningContentRepository;

    @Mock
    private ExerciseRepository exerciseRepository;

    @InjectMocks
    private SearchServiceImpl searchService;

    private Lesson lesson;
    private Level level;
    private ReadingContent readingContent;

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

        readingContent = new ReadingContent();
        readingContent.setId(100L);
        readingContent.setLesson(lesson);
        readingContent.setTitle("Đất nước Nhật Bản");
        readingContent.setContent("Tokyo là thủ đô của Nhật Bản. Núi Phú Sĩ là ngọn núi cao nhất.");
        readingContent.setTranslation("Tokyo is Japan's capital. Mt. Fuji is the highest mountain.");
        readingContent.setSortOrder(1);
    }

    @Test
    @DisplayName("Search Reading: Khớp theo tiêu đề bài đọc")
    void testSearch_Reading_TitleMatch() {
        when(readingContentRepository.searchByKeyword(eq("Nhật Bản"), any())).thenReturn(List.of(readingContent));

        SearchResponse response = searchService.search("Nhật Bản", "READING", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.contentType()).isEqualTo(ContentType.READING);
        assertThat(item.contentId()).isEqualTo(100L);
        assertThat(item.title()).isEqualTo("Đất nước Nhật Bản");
        assertThat(item.subtitle()).isEqualTo("Bài 01");
        assertThat(item.description()).isEqualTo("Tokyo is Japan's capital. Mt. Fuji is the highest mountain.");
        assertThat(item.level()).isEqualTo("N5");
        assertThat(item.lessonId()).isEqualTo(10L);
        assertThat(item.lessonTitle()).isEqualTo("Bài 01");

        verify(readingContentRepository).searchByKeyword(eq("Nhật Bản"), any());
    }

    @Test
    @DisplayName("Search Reading: Lọc theo level N5 thành công")
    void testSearch_Reading_WithLevelFilter() {
        when(readingContentRepository.searchByKeyword(eq("Tokyo"), eq("N5"))).thenReturn(List.of(readingContent));

        SearchResponse response = searchService.search("Tokyo", "READING", "N5", 0, 20);

        assertThat(response.total()).isEqualTo(1);
        assertThat(response.items().get(0).level()).isEqualTo("N5");
        verify(readingContentRepository).searchByKeyword(eq("Tokyo"), eq("N5"));
    }

    @Test
    @DisplayName("Search Reading: Mô tả ưu tiên translation ngắn (<= 120 ký tự)")
    void testSearch_Reading_DescriptionUsesShortTranslation() {
        readingContent.setTranslation("Bản dịch ngắn.");
        when(readingContentRepository.searchByKeyword(eq("Nhật"), any())).thenReturn(List.of(readingContent));

        SearchResponse response = searchService.search("Nhật", "READING", null, 0, 20);

        assertThat(response.items().get(0).description()).isEqualTo("Bản dịch ngắn.");
    }

    @Test
    @DisplayName("Search Reading: Mô tả cắt gọn translation dài (> 120 ký tự) thêm '...'")
    void testSearch_Reading_DescriptionTruncatesLongTranslation() {
        String longTranslation = "A".repeat(150);
        readingContent.setTranslation(longTranslation);
        when(readingContentRepository.searchByKeyword(eq("Nhật"), any())).thenReturn(List.of(readingContent));

        SearchResponse response = searchService.search("Nhật", "READING", null, 0, 20);

        String expected = "A".repeat(120) + "...";
        assertThat(response.items().get(0).description()).isEqualTo(expected);
    }

    @Test
    @DisplayName("Search Reading: Khi translation null thì fallback sang content ngắn (<= 120 ký tự)")
    void testSearch_Reading_DescriptionFallbackToShortContent() {
        readingContent.setTranslation(null);
        readingContent.setContent("Nội dung bài đọc ngắn");
        when(readingContentRepository.searchByKeyword(eq("Nhật"), any())).thenReturn(List.of(readingContent));

        SearchResponse response = searchService.search("Nhật", "READING", null, 0, 20);

        assertThat(response.items().get(0).description()).isEqualTo("Nội dung bài đọc ngắn");
    }

    @Test
    @DisplayName("Search Reading: Khi translation rỗng thì fallback sang content dài (> 120 ký tự) cắt gọn '...'")
    void testSearch_Reading_DescriptionFallbackToLongContent() {
        readingContent.setTranslation("   ");
        String longContent = "B".repeat(150);
        readingContent.setContent(longContent);
        when(readingContentRepository.searchByKeyword(eq("Nhật"), any())).thenReturn(List.of(readingContent));

        SearchResponse response = searchService.search("Nhật", "READING", null, 0, 20);

        String expected = "B".repeat(120) + "...";
        assertThat(response.items().get(0).description()).isEqualTo(expected);
    }

    @Test
    @DisplayName("Search Reading: Khi cả translation và content đều null thì description là null")
    void testSearch_Reading_DescriptionNullWhenBothNull() {
        readingContent.setTranslation(null);
        readingContent.setContent(null);
        when(readingContentRepository.searchByKeyword(eq("Nhật"), any())).thenReturn(List.of(readingContent));

        SearchResponse response = searchService.search("Nhật", "READING", null, 0, 20);

        assertThat(response.items().get(0).description()).isNull();
    }

    @Test
    @DisplayName("Search Reading: Xử lý an toàn khi reading chưa thuộc bài học nào (lesson = null)")
    void testSearch_Reading_NoLessonAssigned() {
        readingContent.setLesson(null);
        when(readingContentRepository.searchByKeyword(eq("Nhật"), any())).thenReturn(List.of(readingContent));

        SearchResponse response = searchService.search("Nhật", "READING", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.level()).isNull();
        assertThat(item.lessonId()).isNull();
        assertThat(item.lessonTitle()).isNull();
        assertThat(item.subtitle()).isNull();
    }

    @Test
    @DisplayName("Search Reading: Xử lý an toàn khi bài học có level là null")
    void testSearch_Reading_LessonHasNullLevel() {
        lesson.setLevel(null);
        when(readingContentRepository.searchByKeyword(eq("Nhật"), any())).thenReturn(List.of(readingContent));

        SearchResponse response = searchService.search("Nhật", "READING", null, 0, 20);

        assertThat(response.total()).isEqualTo(1);
        SearchResultItem item = response.items().get(0);
        assertThat(item.level()).isNull();
        assertThat(item.lessonId()).isEqualTo(10L);
        assertThat(item.lessonTitle()).isEqualTo("Bài 01");
    }

    @Test
    @DisplayName("Search Reading: Khi không có kết quả trả về danh sách rỗng")
    void testSearch_Reading_NoMatch_ReturnsEmpty() {
        when(readingContentRepository.searchByKeyword(eq("không_tồn_tại"), any())).thenReturn(Collections.emptyList());

        SearchResponse response = searchService.search("không_tồn_tại", "READING", null, 0, 20);

        assertThat(response.total()).isEqualTo(0);
        assertThat(response.items()).isEmpty();
    }

    @Test
    @DisplayName("Search Reading: Phân trang kết quả tìm kiếm đúng boundary")
    void testSearch_Reading_Pagination() {
        ReadingContent rc2 = new ReadingContent();
        rc2.setId(101L);
        rc2.setLesson(lesson);
        rc2.setTitle("Nhật Bản hiện đại");
        rc2.setContent("Nội dung...");
        rc2.setSortOrder(2);

        when(readingContentRepository.searchByKeyword(eq("Nhật Bản"), any())).thenReturn(List.of(readingContent, rc2));

        // Page 0, size 1 -> 1 item, total 2
        SearchResponse page0 = searchService.search("Nhật Bản", "READING", null, 0, 1);
        assertThat(page0.total()).isEqualTo(2);
        assertThat(page0.items()).hasSize(1);
        assertThat(page0.page()).isEqualTo(0);
        assertThat(page0.size()).isEqualTo(1);

        // Page 1, size 1 -> 1 item
        SearchResponse page1 = searchService.search("Nhật Bản", "READING", null, 1, 1);
        assertThat(page1.total()).isEqualTo(2);
        assertThat(page1.items()).hasSize(1);
        assertThat(page1.page()).isEqualTo(1);
    }
}
