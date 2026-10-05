package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminKanjiRequest;
import com.japanese.learning.admin.dto.AdminKanjiResponse;
import com.japanese.learning.admin.dto.AdminLessonKanjiAssignRequest;
import com.japanese.learning.common.exception.DeleteConflictException;
import com.japanese.learning.common.exception.DuplicateResourceException;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.kanji.entity.Kanji;
import com.japanese.learning.kanji.entity.LessonKanji;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.kanji.repository.LessonKanjiRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.repository.LessonRepository;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminKanjiServiceTest {

    @Mock
    private KanjiRepository kanjiRepository;

    @Mock
    private LessonKanjiRepository lessonKanjiRepository;

    @Mock
    private LessonRepository lessonRepository;

    @InjectMocks
    private AdminKanjiService adminKanjiService;

    private Kanji sampleKanji;
    private Lesson sampleLesson;
    private LessonKanji sampleLessonKanji;

    @BeforeEach
    void setUp() {
        sampleLesson = new Lesson();
        sampleLesson.setId(10L);
        sampleLesson.setTitle("Bài 01");

        sampleKanji = new Kanji();
        sampleKanji.setId(1L);
        sampleKanji.setKanji("日");
        sampleKanji.setHanViet("NHẬT");
        sampleKanji.setOnyomi("ニチ, ジツ");
        sampleKanji.setKunyomi("ひ, -び, -か");
        sampleKanji.setMeaning("Mặt trời, ngày");
        sampleKanji.setStrokeCount(4);
        sampleKanji.setStrokeOrderUrl("https://example.com/stroke/nhat.svg");
        sampleKanji.setMnemonic("Hình ảnh mặt trời");
        sampleKanji.setMnemonicImageUrl("https://example.com/mnemonic/nhat.png");
        sampleKanji.setLessonKanjis(new ArrayList<>());

        sampleLessonKanji = new LessonKanji();
        sampleLessonKanji.setId(100L);
        sampleLessonKanji.setLesson(sampleLesson);
        sampleLessonKanji.setKanji(sampleKanji);
        sampleLessonKanji.setSortOrder(1);
    }

    // ==========================================
    // 1. GET ALL KANJIS
    // ==========================================

    @Test
    @DisplayName("getAllKanjis: Trả về danh sách tất cả Kanji được sắp xếp theo ID tăng dần")
    void testGetAllKanjis_Success() {
        sampleKanji.getLessonKanjis().add(sampleLessonKanji);
        when(kanjiRepository.findAllByOrderByIdAsc()).thenReturn(List.of(sampleKanji));

        List<AdminKanjiResponse> responses = adminKanjiService.getAllKanjis();

        assertThat(responses).hasSize(1);
        AdminKanjiResponse res = responses.get(0);
        assertThat(res.id()).isEqualTo(1L);
        assertThat(res.kanji()).isEqualTo("日");
        assertThat(res.hanViet()).isEqualTo("NHẬT");
        assertThat(res.assignedLessonIds()).containsExactly(10L);

        verify(kanjiRepository).findAllByOrderByIdAsc();
    }

    @Test
    @DisplayName("getAllKanjis: Trả về danh sách rỗng khi chưa có Kanji")
    void testGetAllKanjis_Empty() {
        when(kanjiRepository.findAllByOrderByIdAsc()).thenReturn(Collections.emptyList());

        List<AdminKanjiResponse> responses = adminKanjiService.getAllKanjis();

        assertThat(responses).isEmpty();
        verify(kanjiRepository).findAllByOrderByIdAsc();
    }

    // ==========================================
    // 2. GET KANJI BY ID
    // ==========================================

    @Test
    @DisplayName("getKanjiById: Lấy chi tiết Kanji theo ID thành công")
    void testGetKanjiById_Success() {
        when(kanjiRepository.findById(1L)).thenReturn(Optional.of(sampleKanji));

        AdminKanjiResponse response = adminKanjiService.getKanjiById(1L);

        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.kanji()).isEqualTo("日");
        assertThat(response.strokeCount()).isEqualTo(4);

        verify(kanjiRepository).findById(1L);
    }

    @Test
    @DisplayName("getKanjiById: Ném ResourceNotFoundException khi ID không tồn tại")
    void testGetKanjiById_NotFound_ThrowsException() {
        when(kanjiRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminKanjiService.getKanjiById(999L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Không tìm thấy chữ Hán với ID: 999");

        verify(kanjiRepository).findById(999L);
    }

    // ==========================================
    // 3. CREATE KANJI
    // ==========================================

    @Test
    @DisplayName("createKanji: Tạo Kanji thành công và chuẩn hóa trim dữ liệu")
    void testCreateKanji_Success() {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "  月  ",
                "  NGUYỆT  ",
                "  ゲツ, ガツ  ",
                "  つき  ",
                "  Mặt trăng, tháng  ",
                4,
                "  https://example.com/stroke/nguyet.svg  ",
                "  Hình mặt trăng khuyết  ",
                "  https://example.com/mnemonic/nguyet.png  "
        );

        when(kanjiRepository.existsByKanji("月")).thenReturn(false);
        when(kanjiRepository.save(any(Kanji.class))).thenAnswer(invocation -> {
            Kanji k = invocation.getArgument(0);
            k.setId(2L);
            return k;
        });

        AdminKanjiResponse response = adminKanjiService.createKanji(request);

        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(2L);
        assertThat(response.kanji()).isEqualTo("月");
        assertThat(response.hanViet()).isEqualTo("NGUYỆT");
        assertThat(response.onyomi()).isEqualTo("ゲツ, ガツ");
        assertThat(response.kunyomi()).isEqualTo("つき");
        assertThat(response.meaning()).isEqualTo("Mặt trăng, tháng");
        assertThat(response.strokeOrderUrl()).isEqualTo("https://example.com/stroke/nguyet.svg");
        assertThat(response.mnemonic()).isEqualTo("Hình mặt trăng khuyết");
        assertThat(response.mnemonicImageUrl()).isEqualTo("https://example.com/mnemonic/nguyet.png");

        ArgumentCaptor<Kanji> captor = ArgumentCaptor.forClass(Kanji.class);
        verify(kanjiRepository).save(captor.capture());
        Kanji saved = captor.getValue();
        assertThat(saved.getKanji()).isEqualTo("月");
        assertThat(saved.getHanViet()).isEqualTo("NGUYỆT");
    }

    @Test
    @DisplayName("createKanji: Chuẩn hóa chuỗi rỗng thành null")
    void testCreateKanji_BlankOptionalFields_ConvertedToNull() {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "日",
                "   ",
                "",
                "   ",
                "",
                null,
                "   ",
                "",
                "   "
        );

        when(kanjiRepository.existsByKanji("日")).thenReturn(false);
        when(kanjiRepository.save(any(Kanji.class))).thenAnswer(inv -> {
            Kanji k = inv.getArgument(0);
            k.setId(3L);
            return k;
        });

        AdminKanjiResponse response = adminKanjiService.createKanji(request);

        assertThat(response.hanViet()).isNull();
        assertThat(response.onyomi()).isNull();
        assertThat(response.kunyomi()).isNull();
        assertThat(response.meaning()).isNull();
        assertThat(response.strokeCount()).isNull();
        assertThat(response.strokeOrderUrl()).isNull();
        assertThat(response.mnemonic()).isNull();
        assertThat(response.mnemonicImageUrl()).isNull();
    }

    @Test
    @DisplayName("createKanji: Ném DuplicateResourceException khi chữ Hán đã tồn tại")
    void testCreateKanji_DuplicateKanji_ThrowsDuplicateResourceException() {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "日", null, null, null, null, null, null, null, null
        );

        when(kanjiRepository.existsByKanji("日")).thenReturn(true);

        assertThatThrownBy(() -> adminKanjiService.createKanji(request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("Chữ Hán '日' đã tồn tại");

        verify(kanjiRepository, never()).save(any());
    }

    // ==========================================
    // 4. UPDATE KANJI
    // ==========================================

    @Test
    @DisplayName("updateKanji: Cập nhật thông tin Kanji thành công")
    void testUpdateKanji_Success() {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "日",
                "NHẬT",
                "ニチ",
                "ひ",
                "Mặt trời",
                4,
                null,
                null,
                null
        );

        when(kanjiRepository.findById(1L)).thenReturn(Optional.of(sampleKanji));
        when(kanjiRepository.existsByKanjiAndIdNot("日", 1L)).thenReturn(false);
        when(kanjiRepository.save(any(Kanji.class))).thenAnswer(inv -> inv.getArgument(0));

        AdminKanjiResponse response = adminKanjiService.updateKanji(1L, request);

        assertThat(response).isNotNull();
        assertThat(response.onyomi()).isEqualTo("ニチ");
        assertThat(response.kunyomi()).isEqualTo("ひ");

        verify(kanjiRepository).save(sampleKanji);
    }

    @Test
    @DisplayName("updateKanji: Ném ResourceNotFoundException khi ID không tồn tại")
    void testUpdateKanji_NotFound_ThrowsException() {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "日", null, null, null, null, null, null, null, null
        );

        when(kanjiRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminKanjiService.updateKanji(999L, request))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Không tìm thấy chữ Hán với ID: 999");

        verify(kanjiRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateKanji: Ném DuplicateResourceException khi đổi thành chữ Hán đã thuộc ID khác")
    void testUpdateKanji_DuplicateKanji_ThrowsDuplicateResourceException() {
        AdminKanjiRequest request = new AdminKanjiRequest(
                "月", null, null, null, null, null, null, null, null
        );

        when(kanjiRepository.findById(1L)).thenReturn(Optional.of(sampleKanji));
        when(kanjiRepository.existsByKanjiAndIdNot("月", 1L)).thenReturn(true);

        assertThatThrownBy(() -> adminKanjiService.updateKanji(1L, request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("Chữ Hán '月' đã tồn tại");

        verify(kanjiRepository, never()).save(any());
    }

    // ==========================================
    // 5. DELETE KANJI
    // ==========================================

    @Test
    @DisplayName("deleteKanji: Xóa Kanji thành công khi chưa gán vào bài học nào")
    void testDeleteKanji_Success() {
        when(kanjiRepository.findById(1L)).thenReturn(Optional.of(sampleKanji));
        when(lessonKanjiRepository.existsByKanjiId(1L)).thenReturn(false);

        adminKanjiService.deleteKanji(1L);

        verify(kanjiRepository).delete(sampleKanji);
    }

    @Test
    @DisplayName("deleteKanji: Ném ResourceNotFoundException khi ID không tồn tại")
    void testDeleteKanji_NotFound_ThrowsException() {
        when(kanjiRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminKanjiService.deleteKanji(999L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Không tìm thấy chữ Hán với ID: 999");

        verify(kanjiRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteKanji: Ném DeleteConflictException khi Kanji vẫn còn liên kết với bài học qua repository")
    void testDeleteKanji_AssignedToLessonInRepo_ThrowsDeleteConflictException() {
        when(kanjiRepository.findById(1L)).thenReturn(Optional.of(sampleKanji));
        when(lessonKanjiRepository.existsByKanjiId(1L)).thenReturn(true);

        assertThatThrownBy(() -> adminKanjiService.deleteKanji(1L))
                .isInstanceOf(DeleteConflictException.class)
                .hasMessage("Không thể xóa chữ Hán này vì vẫn đang được gán vào bài học");

        verify(kanjiRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteKanji: Ném DeleteConflictException khi entity lessonKanjis không rỗng")
    void testDeleteKanji_AssignedToLessonInEntityList_ThrowsDeleteConflictException() {
        sampleKanji.getLessonKanjis().add(sampleLessonKanji);
        when(kanjiRepository.findById(1L)).thenReturn(Optional.of(sampleKanji));
        when(lessonKanjiRepository.existsByKanjiId(1L)).thenReturn(false);

        assertThatThrownBy(() -> adminKanjiService.deleteKanji(1L))
                .isInstanceOf(DeleteConflictException.class)
                .hasMessage("Không thể xóa chữ Hán này vì vẫn đang được gán vào bài học");

        verify(kanjiRepository, never()).delete(any());
    }

    // ==========================================
    // 6. ASSIGN KANJI TO LESSON
    // ==========================================

    @Test
    @DisplayName("assignKanjiToLesson: Gán Kanji vào bài học thành công có cung cấp sortOrder")
    void testAssignKanjiToLesson_Success_WithSortOrder() {
        AdminLessonKanjiAssignRequest request = new AdminLessonKanjiAssignRequest(5);

        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(kanjiRepository.findById(1L)).thenReturn(Optional.of(sampleKanji));
        when(lessonKanjiRepository.existsByLessonIdAndKanjiId(10L, 1L)).thenReturn(false);

        adminKanjiService.assignKanjiToLesson(10L, 1L, request);

        ArgumentCaptor<LessonKanji> captor = ArgumentCaptor.forClass(LessonKanji.class);
        verify(lessonKanjiRepository).save(captor.capture());
        LessonKanji savedLk = captor.getValue();
        assertThat(savedLk.getLesson()).isEqualTo(sampleLesson);
        assertThat(savedLk.getKanji()).isEqualTo(sampleKanji);
        assertThat(savedLk.getSortOrder()).isEqualTo(5);
    }

    @Test
    @DisplayName("assignKanjiToLesson: Gán Kanji vào bài học thành công khi request là null thì mặc định sortOrder = 0")
    void testAssignKanjiToLesson_Success_NullRequest_DefaultsSortOrderZero() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(kanjiRepository.findById(1L)).thenReturn(Optional.of(sampleKanji));
        when(lessonKanjiRepository.existsByLessonIdAndKanjiId(10L, 1L)).thenReturn(false);

        adminKanjiService.assignKanjiToLesson(10L, 1L, null);

        ArgumentCaptor<LessonKanji> captor = ArgumentCaptor.forClass(LessonKanji.class);
        verify(lessonKanjiRepository).save(captor.capture());
        assertThat(captor.getValue().getSortOrder()).isEqualTo(0);
    }

    @Test
    @DisplayName("assignKanjiToLesson: Gán Kanji vào bài học thành công khi sortOrder trong request là null thì mặc định 0")
    void testAssignKanjiToLesson_Success_NullSortOrder_DefaultsSortOrderZero() {
        AdminLessonKanjiAssignRequest request = new AdminLessonKanjiAssignRequest(null);

        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(kanjiRepository.findById(1L)).thenReturn(Optional.of(sampleKanji));
        when(lessonKanjiRepository.existsByLessonIdAndKanjiId(10L, 1L)).thenReturn(false);

        adminKanjiService.assignKanjiToLesson(10L, 1L, request);

        ArgumentCaptor<LessonKanji> captor = ArgumentCaptor.forClass(LessonKanji.class);
        verify(lessonKanjiRepository).save(captor.capture());
        assertThat(captor.getValue().getSortOrder()).isEqualTo(0);
    }

    @Test
    @DisplayName("assignKanjiToLesson: Ném ResourceNotFoundException khi bài học không tồn tại")
    void testAssignKanjiToLesson_LessonNotFound_ThrowsException() {
        when(lessonRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminKanjiService.assignKanjiToLesson(999L, 1L, null))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Không tìm thấy bài học với ID: 999");

        verify(kanjiRepository, never()).findById(anyLong());
        verify(lessonKanjiRepository, never()).save(any());
    }

    @Test
    @DisplayName("assignKanjiToLesson: Ném ResourceNotFoundException khi Kanji không tồn tại")
    void testAssignKanjiToLesson_KanjiNotFound_ThrowsException() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(kanjiRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminKanjiService.assignKanjiToLesson(10L, 999L, null))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Không tìm thấy chữ Hán với ID: 999");

        verify(lessonKanjiRepository, never()).save(any());
    }

    @Test
    @DisplayName("assignKanjiToLesson: Ném DuplicateResourceException khi Kanji đã được gán vào bài học")
    void testAssignKanjiToLesson_AlreadyAssigned_ThrowsDuplicateResourceException() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(kanjiRepository.findById(1L)).thenReturn(Optional.of(sampleKanji));
        when(lessonKanjiRepository.existsByLessonIdAndKanjiId(10L, 1L)).thenReturn(true);

        assertThatThrownBy(() -> adminKanjiService.assignKanjiToLesson(10L, 1L, null))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("Chữ Hán này đã được gán vào bài học");

        verify(lessonKanjiRepository, never()).save(any());
    }

    // ==========================================
    // 7. UNASSIGN KANJI FROM LESSON
    // ==========================================

    @Test
    @DisplayName("unassignKanjiFromLesson: Hủy gán Kanji khỏi bài học thành công")
    void testUnassignKanjiFromLesson_Success() {
        when(lessonRepository.existsById(10L)).thenReturn(true);
        when(kanjiRepository.existsById(1L)).thenReturn(true);
        when(lessonKanjiRepository.findByLessonIdAndKanjiId(10L, 1L)).thenReturn(Optional.of(sampleLessonKanji));

        adminKanjiService.unassignKanjiFromLesson(10L, 1L);

        verify(lessonKanjiRepository).delete(sampleLessonKanji);
    }

    @Test
    @DisplayName("unassignKanjiFromLesson: Ném ResourceNotFoundException khi bài học không tồn tại")
    void testUnassignKanjiFromLesson_LessonNotFound_ThrowsException() {
        when(lessonRepository.existsById(999L)).thenReturn(false);

        assertThatThrownBy(() -> adminKanjiService.unassignKanjiFromLesson(999L, 1L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Không tìm thấy bài học với ID: 999");

        verify(kanjiRepository, never()).existsById(anyLong());
        verify(lessonKanjiRepository, never()).delete(any());
    }

    @Test
    @DisplayName("unassignKanjiFromLesson: Ném ResourceNotFoundException khi Kanji không tồn tại")
    void testUnassignKanjiFromLesson_KanjiNotFound_ThrowsException() {
        when(lessonRepository.existsById(10L)).thenReturn(true);
        when(kanjiRepository.existsById(999L)).thenReturn(false);

        assertThatThrownBy(() -> adminKanjiService.unassignKanjiFromLesson(10L, 999L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Không tìm thấy chữ Hán với ID: 999");

        verify(lessonKanjiRepository, never()).findByLessonIdAndKanjiId(anyLong(), anyLong());
        verify(lessonKanjiRepository, never()).delete(any());
    }

    @Test
    @DisplayName("unassignKanjiFromLesson: Ném ResourceNotFoundException khi Kanji chưa từng gán vào bài học")
    void testUnassignKanjiFromLesson_NotAssigned_ThrowsException() {
        when(lessonRepository.existsById(10L)).thenReturn(true);
        when(kanjiRepository.existsById(1L)).thenReturn(true);
        when(lessonKanjiRepository.findByLessonIdAndKanjiId(10L, 1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminKanjiService.unassignKanjiFromLesson(10L, 1L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Chữ Hán này chưa được gán vào bài học");

        verify(lessonKanjiRepository, never()).delete(any());
    }
}
