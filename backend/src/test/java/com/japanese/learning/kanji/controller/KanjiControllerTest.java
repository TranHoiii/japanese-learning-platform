package com.japanese.learning.kanji.controller;

import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.kanji.dto.KanjiCompoundResponse;
import com.japanese.learning.kanji.dto.KanjiResponse;
import com.japanese.learning.kanji.service.KanjiService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class KanjiControllerTest {

    private MockMvc mockMvc;

    @Mock
    private KanjiService kanjiService;

    @InjectMocks
    private KanjiController kanjiController;

    private KanjiResponse sampleKanji;
    private KanjiCompoundResponse sampleCompound;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(kanjiController)
                .setCustomArgumentResolvers(new org.springframework.data.web.PageableHandlerMethodArgumentResolver())
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        sampleCompound = new KanjiCompoundResponse(
                10L,
                "日本",
                "にほん",
                "Nhật Bản",
                "日本に行きたいです。"
        );

        sampleKanji = new KanjiResponse(
                1L,
                "日",
                "NHẬT",
                "ニチ, ジツ",
                "ひ, -び, -か",
                "Mặt trời, ngày",
                4,
                "https://example.com/stroke/nhat.svg",
                "Hình dạng mặt trời tròn có tia sáng ở giữa",
                "https://example.com/mnemonic/nhat.png",
                List.of(sampleCompound)
        );
    }

    // ==========================================
    // GET /api/v1/kanjis (getAllKanjis)
    // ==========================================

    @Test
    @DisplayName("GET /api/v1/kanjis: Lấy danh sách phân trang khi không có query param q")
    void testGetAllKanjis_WithoutQuery_ReturnsPagedKanjis() throws Exception {
        Page<KanjiResponse> page = new PageImpl<>(List.of(sampleKanji), PageRequest.of(0, 20), 1);
        when(kanjiService.getAllKanjis(any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/kanjis"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách Kanji thành công")))
                .andExpect(jsonPath("$.data.content", hasSize(1)))
                .andExpect(jsonPath("$.data.content[0].id", is(1)))
                .andExpect(jsonPath("$.data.content[0].kanji", is("日")))
                .andExpect(jsonPath("$.data.content[0].hanViet", is("NHẬT")))
                .andExpect(jsonPath("$.data.totalElements", is(1)));

        verify(kanjiService).getAllKanjis(any(Pageable.class));
    }

    @Test
    @DisplayName("GET /api/v1/kanjis: Tìm kiếm khi có query param q")
    void testGetAllKanjis_WithQuery_CallsSearchKanjis() throws Exception {
        Page<KanjiResponse> page = new PageImpl<>(List.of(sampleKanji), PageRequest.of(0, 20), 1);
        when(kanjiService.searchKanjis(eq("日"), any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/kanjis").param("q", "日"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách Kanji thành công")))
                .andExpect(jsonPath("$.data.content", hasSize(1)))
                .andExpect(jsonPath("$.data.content[0].kanji", is("日")));

        verify(kanjiService).searchKanjis(eq("日"), any(Pageable.class));
    }

    @Test
    @DisplayName("GET /api/v1/kanjis: Query param q rỗng hoặc khoảng trắng thì gọi getAllKanjis")
    void testGetAllKanjis_WithBlankQuery_CallsGetAllKanjis() throws Exception {
        Page<KanjiResponse> page = new PageImpl<>(List.of(sampleKanji), PageRequest.of(0, 20), 1);
        when(kanjiService.getAllKanjis(any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/kanjis").param("q", "   "))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.content", hasSize(1)));

        verify(kanjiService).getAllKanjis(any(Pageable.class));
    }

    @Test
    @DisplayName("GET /api/v1/kanjis: Trả về trang rỗng khi không có dữ liệu")
    void testGetAllKanjis_EmptyPage_ReturnsEmptyContent() throws Exception {
        Page<KanjiResponse> emptyPage = new PageImpl<>(Collections.emptyList(), PageRequest.of(0, 20), 0);
        when(kanjiService.getAllKanjis(any(Pageable.class))).thenReturn(emptyPage);

        mockMvc.perform(get("/api/v1/kanjis"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.content", hasSize(0)))
                .andExpect(jsonPath("$.data.totalElements", is(0)));

        verify(kanjiService).getAllKanjis(any(Pageable.class));
    }

    // ==========================================
    // GET /api/v1/kanjis/search (searchKanjis)
    // ==========================================

    @Test
    @DisplayName("GET /api/v1/kanjis/search: Tìm kiếm Kanji với từ khóa thành công")
    void testSearchKanjis_Success() throws Exception {
        Page<KanjiResponse> page = new PageImpl<>(List.of(sampleKanji), PageRequest.of(0, 20), 1);
        when(kanjiService.searchKanjis(eq("NHẬT"), any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/kanjis/search").param("q", "NHẬT"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tìm kiếm Kanji thành công")))
                .andExpect(jsonPath("$.data.content", hasSize(1)))
                .andExpect(jsonPath("$.data.content[0].hanViet", is("NHẬT")));

        verify(kanjiService).searchKanjis(eq("NHẬT"), any(Pageable.class));
    }

    @Test
    @DisplayName("GET /api/v1/kanjis/search: Tìm kiếm không có kết quả trả về trang rỗng")
    void testSearchKanjis_EmptyResult() throws Exception {
        Page<KanjiResponse> emptyPage = new PageImpl<>(Collections.emptyList(), PageRequest.of(0, 20), 0);
        when(kanjiService.searchKanjis(eq("không_tồn_tại"), any(Pageable.class))).thenReturn(emptyPage);

        mockMvc.perform(get("/api/v1/kanjis/search").param("q", "không_tồn_tại"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Tìm kiếm Kanji thành công")))
                .andExpect(jsonPath("$.data.content", hasSize(0)))
                .andExpect(jsonPath("$.data.totalElements", is(0)));

        verify(kanjiService).searchKanjis(eq("không_tồn_tại"), any(Pageable.class));
    }

    // ==========================================
    // GET /api/v1/kanjis/{id} (getKanjiById)
    // ==========================================

    @Test
    @DisplayName("GET /api/v1/kanjis/{id}: Lấy thông tin Kanji theo ID thành công")
    void testGetKanjiById_Success() throws Exception {
        when(kanjiService.getKanjiById(1L)).thenReturn(sampleKanji);

        mockMvc.perform(get("/api/v1/kanjis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy thông tin Kanji thành công")))
                .andExpect(jsonPath("$.data.id", is(1)))
                .andExpect(jsonPath("$.data.kanji", is("日")))
                .andExpect(jsonPath("$.data.hanViet", is("NHẬT")))
                .andExpect(jsonPath("$.data.onyomi", is("ニチ, ジツ")))
                .andExpect(jsonPath("$.data.kunyomi", is("ひ, -び, -か")))
                .andExpect(jsonPath("$.data.meaning", is("Mặt trời, ngày")))
                .andExpect(jsonPath("$.data.strokeCount", is(4)))
                .andExpect(jsonPath("$.data.strokeOrderUrl", is("https://example.com/stroke/nhat.svg")))
                .andExpect(jsonPath("$.data.mnemonic", is("Hình dạng mặt trời tròn có tia sáng ở giữa")))
                .andExpect(jsonPath("$.data.mnemonicImageUrl", is("https://example.com/mnemonic/nhat.png")));

        verify(kanjiService).getKanjiById(1L);
    }

    @Test
    @DisplayName("GET /api/v1/kanjis/{id}: Ném 404 khi Kanji không tồn tại")
    void testGetKanjiById_NotFound_Returns404() throws Exception {
        when(kanjiService.getKanjiById(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy Kanji với id: 999"));

        mockMvc.perform(get("/api/v1/kanjis/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy Kanji với id: 999")));

        verify(kanjiService).getKanjiById(999L);
    }

    @Test
    @DisplayName("GET /api/v1/kanjis/{id}: Trả về 400 khi ID không phải số hợp lệ")
    void testGetKanjiById_TypeMismatch_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/kanjis/invalid-id"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Tham số request không hợp lệ")));
    }

    // ==========================================
    // GET /api/v1/kanjis/{kanjiId}/compounds
    // ==========================================

    @Test
    @DisplayName("GET /api/v1/kanjis/{kanjiId}/compounds: Lấy danh sách từ ghép thành công")
    void testGetCompoundsByKanjiId_Success() throws Exception {
        when(kanjiService.getCompoundsByKanjiId(1L)).thenReturn(List.of(sampleCompound));

        mockMvc.perform(get("/api/v1/kanjis/1/compounds"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Lấy danh sách từ ghép thành công")))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].id", is(10)))
                .andExpect(jsonPath("$.data[0].word", is("日本")))
                .andExpect(jsonPath("$.data[0].reading", is("にほん")))
                .andExpect(jsonPath("$.data[0].meaning", is("Nhật Bản")))
                .andExpect(jsonPath("$.data[0].exampleSentence", is("日本に行きたいです。")));

        verify(kanjiService).getCompoundsByKanjiId(1L);
    }

    @Test
    @DisplayName("GET /api/v1/kanjis/{kanjiId}/compounds: Ném 404 khi Kanji không tồn tại")
    void testGetCompoundsByKanjiId_NotFound_Returns404() throws Exception {
        when(kanjiService.getCompoundsByKanjiId(999L))
                .thenThrow(new ResourceNotFoundException("Không tìm thấy Kanji với id: 999"));

        mockMvc.perform(get("/api/v1/kanjis/999/compounds"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Không tìm thấy Kanji với id: 999")));

        verify(kanjiService).getCompoundsByKanjiId(999L);
    }

    @Test
    @DisplayName("GET /api/v1/kanjis/{kanjiId}/compounds: Trả về 400 khi kanjiId sai kiểu")
    void testGetCompoundsByKanjiId_TypeMismatch_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/kanjis/abc/compounds"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Tham số request không hợp lệ")));
    }

    // ==========================================
    // RESPONSE CONTRACT
    // ==========================================

    @Test
    @DisplayName("GET /api/v1/kanjis/{id}: Phản hồi chuẩn không để lộ các trường thực thể JPA nội bộ")
    void testResponseContract_NoInternalFieldsExposed() throws Exception {
        when(kanjiService.getKanjiById(1L)).thenReturn(sampleKanji);

        mockMvc.perform(get("/api/v1/kanjis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.createdAt").doesNotExist())
                .andExpect(jsonPath("$.data.updatedAt").doesNotExist())
                .andExpect(jsonPath("$.data.password").doesNotExist())
                .andExpect(jsonPath("$.data.lessonKanjis").doesNotExist())
                .andExpect(jsonPath("$.data.id", is(1)))
                .andExpect(jsonPath("$.data.kanji", is("日")));
    }
}
