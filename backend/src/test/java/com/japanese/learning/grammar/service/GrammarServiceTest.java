package com.japanese.learning.grammar.service;

import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.grammar.dto.GrammarExampleMapper;
import com.japanese.learning.grammar.dto.GrammarExampleResponse;
import com.japanese.learning.grammar.dto.GrammarMapper;
import com.japanese.learning.grammar.dto.GrammarResponse;
import com.japanese.learning.grammar.entity.Grammar;
import com.japanese.learning.grammar.entity.GrammarExample;
import com.japanese.learning.grammar.repository.GrammarExampleRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
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
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GrammarServiceTest {

    @Mock
    private GrammarRepository grammarRepository;

    @Mock
    private GrammarExampleRepository grammarExampleRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Spy
    private GrammarExampleMapper grammarExampleMapper = Mappers.getMapper(GrammarExampleMapper.class);

    @Spy
    private GrammarMapper grammarMapper = Mappers.getMapper(GrammarMapper.class);

    @InjectMocks
    private GrammarServiceImpl grammarService;

    private Lesson lesson;
    private Grammar grammar;
    private GrammarExample example;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(grammarMapper, "grammarExampleMapper", grammarExampleMapper);

        lesson = new Lesson();
        lesson.setId(1L);
        lesson.setLessonNumber(1);

        example = new GrammarExample();
        example.setId(10L);
        example.setJapanese("これは本です。");
        example.setFurigana("これはほんです。");
        example.setTranslation("Đây là sách.");
        example.setSortOrder(1);

        grammar = new Grammar();
        grammar.setId(100L);
        grammar.setLesson(lesson);
        grammar.setPattern("～は～です");
        grammar.setMeaning("N1 là N2");
        grammar.setUsage("N1 は N2 です");
        grammar.setExplanation("Cấu trúc khẳng định cơ bản trong tiếng Nhật.");
        grammar.setNotes("Dùng với danh từ.");
        grammar.setSortOrder(1);
        grammar.setExamples(List.of(example));
    }

    @Test
    @DisplayName("getById: Lấy mẫu ngữ pháp theo ID thành công")
    void testGetById_Success() {
        when(grammarRepository.findById(100L)).thenReturn(Optional.of(grammar));

        GrammarResponse response = grammarService.getById(100L);

        assertNotNull(response);
        assertEquals(100L, response.id());
        assertEquals(1L, response.lessonId());
        assertEquals("～は～です", response.pattern());
        assertEquals("N1 là N2", response.meaning());
        assertEquals(1, response.sortOrder());
        assertNotNull(response.examples());
        assertEquals(1, response.examples().size());
        assertEquals("これは本です。", response.examples().get(0).japanese());

        verify(grammarRepository).findById(100L);
    }

    @Test
    @DisplayName("getById: Ném ResourceNotFoundException khi ID không tồn tại")
    void testGetById_NotFound() {
        when(grammarRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> grammarService.getById(999L)
        );

        assertEquals("Không tìm thấy mẫu ngữ pháp với id: 999", ex.getMessage());
        verify(grammarRepository).findById(999L);
    }

    @Test
    @DisplayName("getByLessonId: Lấy danh sách ngữ pháp theo bài học thành công")
    void testGetByLessonId_Success() {
        when(lessonRepository.existsById(1L)).thenReturn(true);
        when(grammarRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(List.of(grammar));

        List<GrammarResponse> responses = grammarService.getByLessonId(1L);

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals("～は～です", responses.get(0).pattern());
        assertEquals(1L, responses.get(0).lessonId());

        verify(lessonRepository).existsById(1L);
        verify(grammarRepository).findByLessonIdOrderBySortOrderAsc(1L);
    }

    @Test
    @DisplayName("getByLessonId: Trả về danh sách rỗng khi bài học chưa có ngữ pháp")
    void testGetByLessonId_EmptyResult() {
        when(lessonRepository.existsById(1L)).thenReturn(true);
        when(grammarRepository.findByLessonIdOrderBySortOrderAsc(1L)).thenReturn(Collections.emptyList());

        List<GrammarResponse> responses = grammarService.getByLessonId(1L);

        assertNotNull(responses);
        assertTrue(responses.isEmpty());

        verify(lessonRepository).existsById(1L);
        verify(grammarRepository).findByLessonIdOrderBySortOrderAsc(1L);
    }

    @Test
    @DisplayName("getByLessonId: Ném ResourceNotFoundException khi bài học không tồn tại")
    void testGetByLessonId_LessonNotFound() {
        when(lessonRepository.existsById(999L)).thenReturn(false);

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> grammarService.getByLessonId(999L)
        );

        assertEquals("Không tìm thấy bài học với id: 999", ex.getMessage());
        verify(lessonRepository).existsById(999L);
        verify(grammarRepository, never()).findByLessonIdOrderBySortOrderAsc(anyLong());
    }

    @Test
    @DisplayName("getExamplesByGrammarId: Lấy danh sách ví dụ theo ngữ pháp thành công")
    void testGetExamplesByGrammarId_Success() {
        when(grammarRepository.existsById(100L)).thenReturn(true);
        when(grammarExampleRepository.findByGrammarIdOrderBySortOrderAsc(100L)).thenReturn(List.of(example));

        List<GrammarExampleResponse> responses = grammarService.getExamplesByGrammarId(100L);

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals(10L, responses.get(0).id());
        assertEquals("これは本です。", responses.get(0).japanese());
        assertEquals("Đây là sách.", responses.get(0).translation());

        verify(grammarRepository).existsById(100L);
        verify(grammarExampleRepository).findByGrammarIdOrderBySortOrderAsc(100L);
    }

    @Test
    @DisplayName("getExamplesByGrammarId: Trả về danh sách rỗng khi ngữ pháp chưa có ví dụ")
    void testGetExamplesByGrammarId_EmptyList() {
        when(grammarRepository.existsById(100L)).thenReturn(true);
        when(grammarExampleRepository.findByGrammarIdOrderBySortOrderAsc(100L)).thenReturn(Collections.emptyList());

        List<GrammarExampleResponse> responses = grammarService.getExamplesByGrammarId(100L);

        assertNotNull(responses);
        assertTrue(responses.isEmpty());

        verify(grammarRepository).existsById(100L);
        verify(grammarExampleRepository).findByGrammarIdOrderBySortOrderAsc(100L);
    }

    @Test
    @DisplayName("getExamplesByGrammarId: Ném ResourceNotFoundException khi ngữ pháp không tồn tại")
    void testGetExamplesByGrammarId_GrammarNotFound() {
        when(grammarRepository.existsById(999L)).thenReturn(false);

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> grammarService.getExamplesByGrammarId(999L)
        );

        assertEquals("Không tìm thấy mẫu ngữ pháp với id: 999", ex.getMessage());
        verify(grammarRepository).existsById(999L);
        verify(grammarExampleRepository, never()).findByGrammarIdOrderBySortOrderAsc(anyLong());
    }
}
