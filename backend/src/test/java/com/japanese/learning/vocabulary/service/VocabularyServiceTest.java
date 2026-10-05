package com.japanese.learning.vocabulary.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.vocabulary.dto.VocabularyMapper;
import com.japanese.learning.vocabulary.dto.VocabularyResponse;
import com.japanese.learning.vocabulary.entity.Vocabulary;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VocabularyServiceTest {

    @Mock
    private VocabularyRepository vocabularyRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Spy
    private VocabularyMapper vocabularyMapper = Mappers.getMapper(VocabularyMapper.class);

    @InjectMocks
    private VocabularyServiceImpl vocabularyService;

    private Lesson testLesson;
    private Vocabulary vocab1;
    private Vocabulary vocab2;

    @BeforeEach
    void setUp() {
        testLesson = new Lesson();
        testLesson.setId(1L);
        testLesson.setLessonNumber(1);
        testLesson.setTitle("Bài 01");

        vocab1 = new Vocabulary();
        vocab1.setId(10L);
        vocab1.setLesson(testLesson);
        vocab1.setHiragana("わたし");
        vocab1.setKanji("私");
        vocab1.setHanViet("Tư");
        vocab1.setMeaning("Tôi");
        vocab1.setPartOfSpeech("Đại từ");
        vocab1.setAudioUrl("/audio/watashi.mp3");
        vocab1.setNotes("Dùng xưng hô lịch sự");

        vocab2 = new Vocabulary();
        vocab2.setId(11L);
        vocab2.setLesson(testLesson);
        vocab2.setHiragana("あなた");
        vocab2.setKanji("貴方");
        vocab2.setHanViet("Quý phương");
        vocab2.setMeaning("Bạn, anh, chị");
        vocab2.setPartOfSpeech("Đại từ");
    }

    @Test
    @DisplayName("getAll: Trả về danh sách từ vựng thành công")
    void testGetAll_Success() {
        when(vocabularyRepository.findAllByOrderByIdAsc()).thenReturn(List.of(vocab1, vocab2));

        List<VocabularyResponse> responses = vocabularyService.getAll();

        assertNotNull(responses);
        assertEquals(2, responses.size());
        assertEquals("わたし", responses.get(0).hiragana());
        assertEquals("Tôi", responses.get(0).meaning());
        assertEquals(1L, responses.get(0).lessonId());
        assertEquals("あなた", responses.get(1).hiragana());
        verify(vocabularyRepository).findAllByOrderByIdAsc();
    }

    @Test
    @DisplayName("getAll: Trả về danh sách rỗng khi không có từ vựng")
    void testGetAll_Empty() {
        when(vocabularyRepository.findAllByOrderByIdAsc()).thenReturn(Collections.emptyList());

        List<VocabularyResponse> responses = vocabularyService.getAll();

        assertNotNull(responses);
        assertTrue(responses.isEmpty());
        verify(vocabularyRepository).findAllByOrderByIdAsc();
    }

    @Test
    @DisplayName("getById: Lấy từ vựng theo ID thành công")
    void testGetById_Success() {
        when(vocabularyRepository.findById(10L)).thenReturn(Optional.of(vocab1));

        VocabularyResponse response = vocabularyService.getById(10L);

        assertNotNull(response);
        assertEquals(10L, response.id());
        assertEquals(1L, response.lessonId());
        assertEquals("わたし", response.hiragana());
        assertEquals("私", response.kanji());
        assertEquals("Tư", response.hanViet());
        assertEquals("Tôi", response.meaning());
        assertEquals("Đại từ", response.partOfSpeech());
        assertEquals("/audio/watashi.mp3", response.audioUrl());
        assertEquals("Dùng xưng hô lịch sự", response.notes());
        verify(vocabularyRepository).findById(10L);
    }

    @Test
    @DisplayName("getById: Ném ResourceNotFoundException khi ID không tồn tại")
    void testGetById_NotFound() {
        when(vocabularyRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(
                ResourceNotFoundException.class,
                () -> vocabularyService.getById(999L)
        );

        assertTrue(exception.getMessage().contains("999"));
        assertEquals("Không tìm thấy từ vựng với id: 999", exception.getMessage());
        verify(vocabularyRepository).findById(999L);
    }

    @Test
    @DisplayName("getByLessonId: Lấy danh sách từ vựng theo bài học thành công")
    void testGetByLessonId_Success() {
        when(lessonRepository.existsById(1L)).thenReturn(true);
        when(vocabularyRepository.findByLessonIdOrderByIdAsc(1L)).thenReturn(List.of(vocab1, vocab2));

        List<VocabularyResponse> responses = vocabularyService.getByLessonId(1L);

        assertNotNull(responses);
        assertEquals(2, responses.size());
        assertEquals("わたし", responses.get(0).hiragana());
        assertEquals("あなた", responses.get(1).hiragana());
        verify(lessonRepository).existsById(1L);
        verify(vocabularyRepository).findByLessonIdOrderByIdAsc(1L);
    }

    @Test
    @DisplayName("getByLessonId: Ném ResourceNotFoundException khi bài học không tồn tại")
    void testGetByLessonId_LessonNotFound() {
        when(lessonRepository.existsById(999L)).thenReturn(false);

        ResourceNotFoundException exception = assertThrows(
                ResourceNotFoundException.class,
                () -> vocabularyService.getByLessonId(999L)
        );

        assertEquals("Không tìm thấy bài học với id: 999", exception.getMessage());
        verify(lessonRepository).existsById(999L);
        verify(vocabularyRepository, never()).findByLessonIdOrderByIdAsc(anyLong());
    }

    @Test
    @DisplayName("getByLessonId: Trả về danh sách rỗng khi bài học tồn tại nhưng chưa có từ vựng")
    void testGetByLessonId_EmptyList() {
        when(lessonRepository.existsById(1L)).thenReturn(true);
        when(vocabularyRepository.findByLessonIdOrderByIdAsc(1L)).thenReturn(Collections.emptyList());

        List<VocabularyResponse> responses = vocabularyService.getByLessonId(1L);

        assertNotNull(responses);
        assertTrue(responses.isEmpty());
        verify(lessonRepository).existsById(1L);
        verify(vocabularyRepository).findByLessonIdOrderByIdAsc(1L);
    }

    @Test
    @DisplayName("search: Tìm kiếm từ vựng với từ khóa hợp lệ thành công")
    void testSearch_ValidQuery() {
        when(vocabularyRepository.searchVocabularies("わたし")).thenReturn(List.of(vocab1));

        List<VocabularyResponse> responses = vocabularyService.search("  わたし  ");

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals("わたし", responses.get(0).hiragana());
        verify(vocabularyRepository).searchVocabularies("わたし");
    }

    @Test
    @DisplayName("search: Trả về danh sách rỗng và không gọi repository khi query là null")
    void testSearch_NullQuery() {
        List<VocabularyResponse> responses = vocabularyService.search(null);

        assertNotNull(responses);
        assertTrue(responses.isEmpty());
        verify(vocabularyRepository, never()).searchVocabularies(anyString());
    }

    @Test
    @DisplayName("search: Trả về danh sách rỗng và không gọi repository khi query rỗng")
    void testSearch_EmptyQuery() {
        List<VocabularyResponse> responses = vocabularyService.search("");

        assertNotNull(responses);
        assertTrue(responses.isEmpty());
        verify(vocabularyRepository, never()).searchVocabularies(anyString());
    }

    @Test
    @DisplayName("search: Trả về danh sách rỗng và không gọi repository khi query chỉ có khoảng trắng")
    void testSearch_BlankQuery() {
        List<VocabularyResponse> responses = vocabularyService.search("   ");

        assertNotNull(responses);
        assertTrue(responses.isEmpty());
        verify(vocabularyRepository, never()).searchVocabularies(anyString());
    }

    @Test
    @DisplayName("search: Trả về danh sách rỗng khi không có từ vựng khớp với từ khóa")
    void testSearch_NoMatch() {
        when(vocabularyRepository.searchVocabularies("không_tồn_tại")).thenReturn(Collections.emptyList());

        List<VocabularyResponse> responses = vocabularyService.search("không_tồn_tại");

        assertNotNull(responses);
        assertTrue(responses.isEmpty());
        verify(vocabularyRepository).searchVocabularies("không_tồn_tại");
    }
}
