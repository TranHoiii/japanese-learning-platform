package com.japanese.learning.kanji.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.kanji.dto.KanjiCompoundMapper;
import com.japanese.learning.kanji.dto.KanjiCompoundResponse;
import com.japanese.learning.kanji.dto.KanjiMapper;
import com.japanese.learning.kanji.dto.KanjiResponse;
import com.japanese.learning.kanji.entity.Kanji;
import com.japanese.learning.kanji.entity.KanjiCompound;
import com.japanese.learning.kanji.entity.LessonKanji;
import com.japanese.learning.kanji.repository.KanjiCompoundRepository;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.kanji.repository.LessonKanjiRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.repository.LessonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class KanjiServiceTest {

    @Mock
    private KanjiRepository kanjiRepository;

    @Mock
    private LessonKanjiRepository lessonKanjiRepository;

    @Mock
    private KanjiCompoundRepository kanjiCompoundRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Spy
    private KanjiCompoundMapper kanjiCompoundMapper = Mappers.getMapper(KanjiCompoundMapper.class);

    @Spy
    private KanjiMapper kanjiMapper = Mappers.getMapper(KanjiMapper.class);

    @InjectMocks
    private KanjiServiceImpl kanjiService;

    private Kanji kanji;
    private KanjiCompound compound;
    private Lesson lesson;
    private LessonKanji lessonKanji;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(kanjiMapper, "kanjiCompoundMapper", kanjiCompoundMapper);

        compound = new KanjiCompound();
        compound.setId(10L);
        compound.setWord("日本");
        compound.setReading("にほん");
        compound.setMeaning("Nhật Bản");

        kanji = new Kanji();
        kanji.setId(1L);
        kanji.setKanji("日");
        kanji.setHanViet("NHẬT");
        kanji.setMeaning("Mặt trời, ngày");
        kanji.setStrokeCount(4);
        kanji.setCompounds(List.of(compound));

        lesson = new Lesson();
        lesson.setId(100L);
        lesson.setLessonNumber(1);

        lessonKanji = new LessonKanji();
        lessonKanji.setId(50L);
        lessonKanji.setLesson(lesson);
        lessonKanji.setKanji(kanji);
        lessonKanji.setSortOrder(1);
    }

    @Test
    @DisplayName("getAllKanjis: Phân trang danh sách chữ Hán thành công")
    void testGetAllKanjis_Success() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Kanji> page = new PageImpl<>(List.of(kanji), pageable, 1);
        when(kanjiRepository.findAll(pageable)).thenReturn(page);

        Page<KanjiResponse> responses = kanjiService.getAllKanjis(pageable);

        assertNotNull(responses);
        assertEquals(1, responses.getTotalElements());
        assertEquals("日", responses.getContent().get(0).getKanji());
        verify(kanjiRepository).findAll(pageable);
    }

    @Test
    @DisplayName("getAllKanjis: Trả về trang rỗng khi không có chữ Hán")
    void testGetAllKanjis_EmptyPage() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Kanji> emptyPage = new PageImpl<>(Collections.emptyList(), pageable, 0);
        when(kanjiRepository.findAll(pageable)).thenReturn(emptyPage);

        Page<KanjiResponse> responses = kanjiService.getAllKanjis(pageable);

        assertNotNull(responses);
        assertEquals(0, responses.getTotalElements());
        assertTrue(responses.getContent().isEmpty());
        verify(kanjiRepository).findAll(pageable);
    }

    @Test
    @DisplayName("searchKanjis: Tìm kiếm theo từ khóa hợp lệ và cắt khoảng trắng")
    void testSearchKanjis_WithValidQuery() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Kanji> page = new PageImpl<>(List.of(kanji), pageable, 1);
        when(kanjiRepository.searchKanjis("日", pageable)).thenReturn(page);

        Page<KanjiResponse> responses = kanjiService.searchKanjis("  日  ", pageable);

        assertNotNull(responses);
        assertEquals(1, responses.getTotalElements());
        assertEquals("日", responses.getContent().get(0).getKanji());
        verify(kanjiRepository).searchKanjis("日", pageable);
    }

    @Test
    @DisplayName("searchKanjis: Khi query là null thì gọi getAllKanjis")
    void testSearchKanjis_NullQuery_DelegatesToGetAll() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Kanji> page = new PageImpl<>(List.of(kanji), pageable, 1);
        when(kanjiRepository.findAll(pageable)).thenReturn(page);

        Page<KanjiResponse> responses = kanjiService.searchKanjis(null, pageable);

        assertNotNull(responses);
        assertEquals(1, responses.getTotalElements());
        verify(kanjiRepository).findAll(pageable);
        verify(kanjiRepository, never()).searchKanjis(any(), any());
    }

    @Test
    @DisplayName("searchKanjis: Khi query chỉ chứa khoảng trắng thì gọi getAllKanjis")
    void testSearchKanjis_BlankQuery_DelegatesToGetAll() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Kanji> page = new PageImpl<>(List.of(kanji), pageable, 1);
        when(kanjiRepository.findAll(pageable)).thenReturn(page);

        Page<KanjiResponse> responses = kanjiService.searchKanjis("   ", pageable);

        assertNotNull(responses);
        assertEquals(1, responses.getTotalElements());
        verify(kanjiRepository).findAll(pageable);
        verify(kanjiRepository, never()).searchKanjis(any(), any());
    }

    @Test
    @DisplayName("getKanjiById: Lấy chi tiết chữ Hán thành công kèm từ ghép")
    void testGetKanjiById_Success() {
        when(kanjiRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(kanji));

        KanjiResponse response = kanjiService.getKanjiById(1L);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("日", response.getKanji());
        assertEquals("NHẬT", response.getHanViet());
        assertEquals(1, response.getCompounds().size());
        assertEquals("日本", response.getCompounds().get(0).getWord());

        verify(kanjiRepository).findByIdWithDetails(1L);
    }

    @Test
    @DisplayName("getKanjiById: Ném ResourceNotFoundException khi ID không tồn tại")
    void testGetKanjiById_NotFound() {
        when(kanjiRepository.findByIdWithDetails(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> kanjiService.getKanjiById(999L)
        );

        assertEquals("Không tìm thấy Kanji với id: 999", ex.getMessage());
        verify(kanjiRepository).findByIdWithDetails(999L);
    }

    @Test
    @DisplayName("getKanjisByLessonId: Lấy danh sách chữ Hán theo bài học thành công")
    void testGetKanjisByLessonId_Success() {
        when(lessonRepository.existsById(100L)).thenReturn(true);
        when(lessonKanjiRepository.findByLessonIdOrderBySortOrderAsc(100L)).thenReturn(List.of(lessonKanji));

        List<KanjiResponse> responses = kanjiService.getKanjisByLessonId(100L);

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals("日", responses.get(0).getKanji());

        verify(lessonRepository).existsById(100L);
        verify(lessonKanjiRepository).findByLessonIdOrderBySortOrderAsc(100L);
    }

    @Test
    @DisplayName("getKanjisByLessonId: Ném ResourceNotFoundException khi bài học không tồn tại")
    void testGetKanjisByLessonId_LessonNotFound() {
        when(lessonRepository.existsById(999L)).thenReturn(false);

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> kanjiService.getKanjisByLessonId(999L)
        );

        assertEquals("Không tìm thấy bài học với id: 999", ex.getMessage());
        verify(lessonRepository).existsById(999L);
        verify(lessonKanjiRepository, never()).findByLessonIdOrderBySortOrderAsc(anyLong());
    }

    @Test
    @DisplayName("getKanjisByLessonId: Trả về danh sách rỗng khi bài học chưa có chữ Hán")
    void testGetKanjisByLessonId_EmptyList() {
        when(lessonRepository.existsById(100L)).thenReturn(true);
        when(lessonKanjiRepository.findByLessonIdOrderBySortOrderAsc(100L)).thenReturn(Collections.emptyList());

        List<KanjiResponse> responses = kanjiService.getKanjisByLessonId(100L);

        assertNotNull(responses);
        assertTrue(responses.isEmpty());

        verify(lessonRepository).existsById(100L);
        verify(lessonKanjiRepository).findByLessonIdOrderBySortOrderAsc(100L);
    }

    @Test
    @DisplayName("getCompoundsByKanjiId: Lấy danh sách từ ghép theo chữ Hán thành công")
    void testGetCompoundsByKanjiId_Success() {
        when(kanjiRepository.existsById(1L)).thenReturn(true);
        when(kanjiCompoundRepository.findByKanjiId(1L)).thenReturn(List.of(compound));

        List<KanjiCompoundResponse> responses = kanjiService.getCompoundsByKanjiId(1L);

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals("日本", responses.get(0).getWord());

        verify(kanjiRepository).existsById(1L);
        verify(kanjiCompoundRepository).findByKanjiId(1L);
    }

    @Test
    @DisplayName("getCompoundsByKanjiId: Ném ResourceNotFoundException khi chữ Hán không tồn tại")
    void testGetCompoundsByKanjiId_KanjiNotFound() {
        when(kanjiRepository.existsById(999L)).thenReturn(false);

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> kanjiService.getCompoundsByKanjiId(999L)
        );

        assertEquals("Không tìm thấy Kanji với id: 999", ex.getMessage());
        verify(kanjiRepository).existsById(999L);
        verify(kanjiCompoundRepository, never()).findByKanjiId(anyLong());
    }
}
