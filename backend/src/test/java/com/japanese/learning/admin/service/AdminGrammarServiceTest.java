package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminGrammarExampleRequest;
import com.japanese.learning.admin.dto.AdminGrammarExampleResponse;
import com.japanese.learning.admin.dto.AdminGrammarRequest;
import com.japanese.learning.admin.dto.AdminGrammarResponse;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.grammar.entity.Grammar;
import com.japanese.learning.grammar.entity.GrammarExample;
import com.japanese.learning.grammar.repository.GrammarExampleRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminGrammarServiceTest {

    @Mock
    private GrammarRepository grammarRepository;

    @Mock
    private GrammarExampleRepository grammarExampleRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private LevelRepository levelRepository;

    @InjectMocks
    private AdminGrammarService adminGrammarService;

    private Level level;
    private Lesson lesson;
    private Grammar grammar;
    private GrammarExample example;

    @BeforeEach
    void setUp() {
        level = new Level();
        level.setId(1L);
        level.setCode("N5");
        level.setName("N5 Sơ cấp");

        lesson = new Lesson();
        lesson.setId(10L);
        lesson.setLevel(level);
        lesson.setLessonNumber(1);
        lesson.setTitle("Bài 01");

        example = new GrammarExample();
        example.setId(100L);
        example.setJapanese("わたしはHiです。");
        example.setFurigana("わたしはHiです。");
        example.setTranslation("Tôi là Hi.");
        example.setExplanation("Ví dụ tự giới thiệu");
        example.setSortOrder(1);

        grammar = new Grammar();
        grammar.setId(50L);
        grammar.setLesson(lesson);
        grammar.setPattern("～は～です");
        grammar.setMeaning("N1 là N2");
        grammar.setUsage("N1 は N2 です");
        grammar.setExplanation("Câu khẳng định");
        grammar.setNotes("Dùng với danh từ");
        grammar.setSortOrder(1);
        grammar.setExamples(new ArrayList<>(List.of(example)));
        example.setGrammar(grammar);
    }

    @Test
    @DisplayName("getGrammars: Lấy tất cả khi không truyền filter")
    void testGetGrammars_NoFilter_ReturnsAll() {
        when(grammarRepository.findAllByOrderBySortOrderAsc()).thenReturn(List.of(grammar));

        List<AdminGrammarResponse> responses = adminGrammarService.getGrammars(null, null);

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals("～は～です", responses.get(0).pattern());
        assertEquals("N5", responses.get(0).levelCode());
        assertEquals(1, responses.get(0).lessonNumber());
        assertEquals(1, responses.get(0).examples().size());

        verify(grammarRepository).findAllByOrderBySortOrderAsc();
    }

    @Test
    @DisplayName("getGrammars: Lọc theo lessonId thành công")
    void testGetGrammars_ByLessonId_Success() {
        when(lessonRepository.existsById(10L)).thenReturn(true);
        when(grammarRepository.findByLessonIdOrderBySortOrderAsc(10L)).thenReturn(List.of(grammar));

        List<AdminGrammarResponse> responses = adminGrammarService.getGrammars(10L, null);

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals(10L, responses.get(0).lessonId());

        verify(lessonRepository).existsById(10L);
        verify(grammarRepository).findByLessonIdOrderBySortOrderAsc(10L);
    }

    @Test
    @DisplayName("getGrammars: Ném ResourceNotFoundException khi lessonId không tồn tại")
    void testGetGrammars_ByLessonId_NotFound() {
        when(lessonRepository.existsById(999L)).thenReturn(false);

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.getGrammars(999L, null)
        );

        assertEquals("Không tìm thấy bài học với ID: 999", ex.getMessage());
        verify(grammarRepository, never()).findByLessonIdOrderBySortOrderAsc(anyLong());
    }

    @Test
    @DisplayName("getGrammars: Lọc theo levelId thành công khi lessonId là null")
    void testGetGrammars_ByLevelId_Success() {
        when(levelRepository.existsById(1L)).thenReturn(true);
        when(grammarRepository.findByLevelIdOrderBySortOrderAsc(1L)).thenReturn(List.of(grammar));

        List<AdminGrammarResponse> responses = adminGrammarService.getGrammars(null, 1L);

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals("N5", responses.get(0).levelCode());

        verify(levelRepository).existsById(1L);
        verify(grammarRepository).findByLevelIdOrderBySortOrderAsc(1L);
    }

    @Test
    @DisplayName("getGrammars: Ném ResourceNotFoundException khi levelId không tồn tại")
    void testGetGrammars_ByLevelId_NotFound() {
        when(levelRepository.existsById(999L)).thenReturn(false);

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.getGrammars(null, 999L)
        );

        assertEquals("Không tìm thấy cấp độ với ID: 999", ex.getMessage());
        verify(grammarRepository, never()).findByLevelIdOrderBySortOrderAsc(anyLong());
    }

    @Test
    @DisplayName("getGrammarById: Lấy chi tiết thành công")
    void testGetGrammarById_Success() {
        when(grammarRepository.findById(50L)).thenReturn(Optional.of(grammar));

        AdminGrammarResponse response = adminGrammarService.getGrammarById(50L);

        assertNotNull(response);
        assertEquals(50L, response.id());
        assertEquals(10L, response.lessonId());
        assertEquals("～は～です", response.pattern());
        assertEquals(1, response.examples().size());
        assertEquals("わたしはHiです。", response.examples().get(0).japanese());

        verify(grammarRepository).findById(50L);
    }

    @Test
    @DisplayName("getGrammarById: Ném ResourceNotFoundException khi ID không tồn tại")
    void testGetGrammarById_NotFound() {
        when(grammarRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.getGrammarById(999L)
        );

        assertEquals("Không tìm thấy ngữ pháp với ID: 999", ex.getMessage());
    }

    @Test
    @DisplayName("getGrammarById: Xử lý an toàn khi Lesson hoặc Level là null")
    void testGetGrammarById_NullLessonOrLevel() {
        Grammar g = new Grammar();
        g.setId(51L);
        Lesson lNoLevel = new Lesson();
        lNoLevel.setId(20L);
        g.setLesson(lNoLevel);
        g.setPattern("～も");
        g.setSortOrder(2);

        when(grammarRepository.findById(51L)).thenReturn(Optional.of(g));

        AdminGrammarResponse response = adminGrammarService.getGrammarById(51L);

        assertNotNull(response);
        assertEquals(20L, response.lessonId());
        assertNull(response.levelCode());
        assertNull(response.lessonNumber());
        assertTrue(response.examples().isEmpty());
    }

    @Test
    @DisplayName("createGrammar: Tạo ngữ pháp kèm ví dụ lồng nhau thành công")
    void testCreateGrammar_WithNestedExamples_Success() {
        AdminGrammarExampleRequest exReq = new AdminGrammarExampleRequest(
                "  これはペンです。  ", "これはペンです。", "Đây là bút.", "Ghi chú", 1
        );
        AdminGrammarRequest request = new AdminGrammarRequest(
                10L, "  ～じゃありません  ", "  Không phải là  ", "N1 じゃありません", "Phủ định", "Ghi chú", 2, List.of(exReq)
        );

        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(grammarRepository.save(any(Grammar.class))).thenAnswer(inv -> {
            Grammar g = inv.getArgument(0);
            g.setId(55L);
            if (g.getExamples() != null && !g.getExamples().isEmpty()) {
                g.getExamples().get(0).setId(105L);
            }
            return g;
        });

        AdminGrammarResponse response = adminGrammarService.createGrammar(request);

        assertNotNull(response);
        assertEquals(55L, response.id());
        assertEquals("～じゃありません", response.pattern());
        assertEquals("Không phải là", response.meaning());
        assertEquals(1, response.examples().size());
        assertEquals("これはペンです。", response.examples().get(0).japanese());

        ArgumentCaptor<Grammar> captor = ArgumentCaptor.forClass(Grammar.class);
        verify(grammarRepository).save(captor.capture());
        Grammar captured = captor.getValue();
        assertEquals("～じゃありません", captured.getPattern());
        assertEquals("Không phải là", captured.getMeaning());
        assertEquals("これはペンです。", captured.getExamples().get(0).getJapanese());
    }

    @Test
    @DisplayName("createGrammar: Tạo ngữ pháp không có ví dụ thành công")
    void testCreateGrammar_WithoutExamples_Success() {
        AdminGrammarRequest request = new AdminGrammarRequest(
                10L, "～か", "Câu hỏi", null, null, null, 3, null
        );

        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(grammarRepository.save(any(Grammar.class))).thenAnswer(inv -> {
            Grammar g = inv.getArgument(0);
            g.setId(56L);
            return g;
        });

        AdminGrammarResponse response = adminGrammarService.createGrammar(request);

        assertNotNull(response);
        assertEquals(56L, response.id());
        assertEquals("～か", response.pattern());
        assertTrue(response.examples().isEmpty());
    }

    @Test
    @DisplayName("createGrammar: Chuyển các trường tùy chọn rỗng thành null")
    void testCreateGrammar_BlankOptionalFields_ConvertedToNull() {
        AdminGrammarRequest request = new AdminGrammarRequest(
                10L, "～ね", "   ", "", "  ", " ", 4, Collections.emptyList()
        );

        when(lessonRepository.findById(10L)).thenReturn(Optional.of(lesson));
        when(grammarRepository.save(any(Grammar.class))).thenAnswer(inv -> inv.getArgument(0));

        AdminGrammarResponse response = adminGrammarService.createGrammar(request);

        assertNotNull(response);
        assertNull(response.meaning());
        assertNull(response.usage());
        assertNull(response.explanation());
        assertNull(response.notes());
    }

    @Test
    @DisplayName("createGrammar: Ném ResourceNotFoundException khi bài học không tồn tại")
    void testCreateGrammar_LessonNotFound() {
        AdminGrammarRequest request = new AdminGrammarRequest(
                999L, "～よ", null, null, null, null, 1, null
        );

        when(lessonRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.createGrammar(request)
        );

        assertEquals("Không tìm thấy bài học với ID: 999", ex.getMessage());
        verify(grammarRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateGrammar: Cập nhật ngữ pháp và thay thế danh sách ví dụ thành công")
    void testUpdateGrammar_Success() {
        Lesson newLesson = new Lesson();
        newLesson.setId(11L);
        newLesson.setLevel(level);
        newLesson.setLessonNumber(2);

        AdminGrammarExampleRequest newExReq = new AdminGrammarExampleRequest(
                "あめです。", null, "Trời mưa.", null, 1
        );
        AdminGrammarRequest updateReq = new AdminGrammarRequest(
                11L, "～です (update)", "Khẳng định (update)", "N + です", "Giải thích mới", null, 1, List.of(newExReq)
        );

        when(grammarRepository.findById(50L)).thenReturn(Optional.of(grammar));
        when(lessonRepository.findById(11L)).thenReturn(Optional.of(newLesson));
        when(grammarRepository.save(any(Grammar.class))).thenAnswer(inv -> inv.getArgument(0));

        AdminGrammarResponse response = adminGrammarService.updateGrammar(50L, updateReq);

        assertNotNull(response);
        assertEquals(50L, response.id());
        assertEquals(11L, response.lessonId());
        assertEquals("～です (update)", response.pattern());
        assertEquals(1, response.examples().size());
        assertEquals("あめです。", response.examples().get(0).japanese());

        verify(grammarRepository).save(grammar);
    }

    @Test
    @DisplayName("updateGrammar: Ném ResourceNotFoundException khi ngữ pháp không tồn tại")
    void testUpdateGrammar_GrammarNotFound() {
        AdminGrammarRequest request = new AdminGrammarRequest(
                10L, "～です", null, null, null, null, 1, null
        );

        when(grammarRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.updateGrammar(999L, request)
        );

        assertEquals("Không tìm thấy ngữ pháp với ID: 999", ex.getMessage());
        verify(grammarRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateGrammar: Ném ResourceNotFoundException khi bài học mới không tồn tại")
    void testUpdateGrammar_LessonNotFound() {
        AdminGrammarRequest request = new AdminGrammarRequest(
                999L, "～です", null, null, null, null, 1, null
        );

        when(grammarRepository.findById(50L)).thenReturn(Optional.of(grammar));
        when(lessonRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.updateGrammar(50L, request)
        );

        assertEquals("Không tìm thấy bài học với ID: 999", ex.getMessage());
        verify(grammarRepository, never()).save(any());
    }

    @Test
    @DisplayName("deleteGrammar: Xóa ngữ pháp thành công")
    void testDeleteGrammar_Success() {
        when(grammarRepository.findById(50L)).thenReturn(Optional.of(grammar));

        adminGrammarService.deleteGrammar(50L);

        verify(grammarRepository).findById(50L);
        verify(grammarRepository).delete(grammar);
    }

    @Test
    @DisplayName("deleteGrammar: Ném ResourceNotFoundException khi ngữ pháp không tồn tại")
    void testDeleteGrammar_NotFound() {
        when(grammarRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.deleteGrammar(999L)
        );

        assertEquals("Không tìm thấy ngữ pháp với ID: 999", ex.getMessage());
        verify(grammarRepository, never()).delete(any());
    }

    // ==========================================
    // EXAMPLES CRUD TESTS
    // ==========================================

    @Test
    @DisplayName("getExamples: Lấy danh sách ví dụ của ngữ pháp thành công")
    void testGetExamples_Success() {
        when(grammarRepository.existsById(50L)).thenReturn(true);
        when(grammarExampleRepository.findByGrammarIdOrderBySortOrderAsc(50L)).thenReturn(List.of(example));

        List<AdminGrammarExampleResponse> responses = adminGrammarService.getExamples(50L);

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals("わたしはHiです。", responses.get(0).japanese());

        verify(grammarRepository).existsById(50L);
        verify(grammarExampleRepository).findByGrammarIdOrderBySortOrderAsc(50L);
    }

    @Test
    @DisplayName("getExamples: Ném ResourceNotFoundException khi ngữ pháp không tồn tại")
    void testGetExamples_GrammarNotFound() {
        when(grammarRepository.existsById(999L)).thenReturn(false);

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.getExamples(999L)
        );

        assertEquals("Không tìm thấy ngữ pháp với ID: 999", ex.getMessage());
        verify(grammarExampleRepository, never()).findByGrammarIdOrderBySortOrderAsc(anyLong());
    }

    @Test
    @DisplayName("createExample: Tạo ví dụ mới cho ngữ pháp thành công")
    void testCreateExample_Success() {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest(
                "  たべます。  ", "たべます。", "Ăn.", "Động từ", 1
        );

        when(grammarRepository.findById(50L)).thenReturn(Optional.of(grammar));
        when(grammarExampleRepository.save(any(GrammarExample.class))).thenAnswer(inv -> {
            GrammarExample ge = inv.getArgument(0);
            ge.setId(200L);
            return ge;
        });

        AdminGrammarExampleResponse res = adminGrammarService.createExample(50L, req);

        assertNotNull(res);
        assertEquals(200L, res.id());
        assertEquals(50L, res.grammarId());
        assertEquals("たべます。", res.japanese());
        assertEquals("Ăn.", res.translation());

        verify(grammarExampleRepository).save(any(GrammarExample.class));
    }

    @Test
    @DisplayName("createExample: Ném ResourceNotFoundException khi ngữ pháp không tồn tại")
    void testCreateExample_GrammarNotFound() {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest(
                "たべます。", null, null, null, 1
        );

        when(grammarRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.createExample(999L, req)
        );

        assertEquals("Không tìm thấy ngữ pháp với ID: 999", ex.getMessage());
        verify(grammarExampleRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateExample: Cập nhật ví dụ thành công khi thuộc đúng ngữ pháp")
    void testUpdateExample_Success() {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest(
                "わたしはがくせいです。", "わたしはがくせいです。", "Tôi là sinh viên.", "Cập nhật", 2
        );

        when(grammarExampleRepository.findById(100L)).thenReturn(Optional.of(example));
        when(grammarExampleRepository.save(any(GrammarExample.class))).thenAnswer(inv -> inv.getArgument(0));

        AdminGrammarExampleResponse res = adminGrammarService.updateExample(50L, 100L, req);

        assertNotNull(res);
        assertEquals(100L, res.id());
        assertEquals("わたしはがくせいです。", res.japanese());
        assertEquals("Tôi là sinh viên.", res.translation());
        assertEquals(2, res.sortOrder());

        verify(grammarExampleRepository).save(example);
    }

    @Test
    @DisplayName("updateExample: Ném ResourceNotFoundException khi ví dụ không tồn tại")
    void testUpdateExample_NotFound() {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest(
                "テスト", null, null, null, 1
        );

        when(grammarExampleRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.updateExample(50L, 999L, req)
        );

        assertEquals("Không tìm thấy ví dụ với ID: 999", ex.getMessage());
        verify(grammarExampleRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateExample: Ném ResourceNotFoundException khi ví dụ không thuộc ngữ pháp chỉ định (scoping check)")
    void testUpdateExample_WrongGrammarScope() {
        AdminGrammarExampleRequest req = new AdminGrammarExampleRequest(
                "テスト", null, null, null, 1
        );

        when(grammarExampleRepository.findById(100L)).thenReturn(Optional.of(example)); // example belongs to grammar 50L

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.updateExample(99L, 100L, req) // called with grammarId 99L
        );

        assertEquals("Ví dụ ID: 100 không thuộc ngữ pháp ID: 99", ex.getMessage());
        verify(grammarExampleRepository, never()).save(any());
    }

    @Test
    @DisplayName("deleteExample: Xóa ví dụ thành công khi thuộc đúng ngữ pháp")
    void testDeleteExample_Success() {
        when(grammarExampleRepository.findById(100L)).thenReturn(Optional.of(example));

        adminGrammarService.deleteExample(50L, 100L);

        verify(grammarExampleRepository).delete(example);
    }

    @Test
    @DisplayName("deleteExample: Ném ResourceNotFoundException khi ví dụ không tồn tại")
    void testDeleteExample_NotFound() {
        when(grammarExampleRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.deleteExample(50L, 999L)
        );

        assertEquals("Không tìm thấy ví dụ với ID: 999", ex.getMessage());
        verify(grammarExampleRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteExample: Ném ResourceNotFoundException khi ví dụ không thuộc ngữ pháp chỉ định (scoping check)")
    void testDeleteExample_WrongGrammarScope() {
        when(grammarExampleRepository.findById(100L)).thenReturn(Optional.of(example)); // belongs to 50L

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> adminGrammarService.deleteExample(88L, 100L) // called with 88L
        );

        assertEquals("Ví dụ ID: 100 không thuộc ngữ pháp ID: 88", ex.getMessage());
        verify(grammarExampleRepository, never()).delete(any());
    }
}
