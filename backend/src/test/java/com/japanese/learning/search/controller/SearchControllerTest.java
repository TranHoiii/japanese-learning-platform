package com.japanese.learning.search.controller;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.search.dto.SearchResponse;
import com.japanese.learning.search.dto.SearchResultItem;
import com.japanese.learning.search.service.SearchService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class SearchControllerTest {

    private MockMvc mockMvc;

    @Mock
    private SearchService searchService;

    @InjectMocks
    private SearchController searchController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(searchController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    @DisplayName("GET /api/v1/search?q=食べる thành công trả 200 và kết quả chuẩn ApiResponse")
    void testSearch_Success() throws Exception {
        SearchResultItem item = new SearchResultItem(
                ContentType.VOCABULARY,
                1L,
                "食べる",
                "たべる",
                "Ăn",
                "N5",
                10L,
                "Bài 01"
        );
        SearchResponse response = new SearchResponse("食べる", 1, 0, 20, List.of(item));

        when(searchService.search(eq("食べる"), any(), any(), eq(0), eq(20)))
                .thenReturn(response);

        mockMvc.perform(get("/api/v1/search?q=食べる"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Tìm kiếm thành công"))
                .andExpect(jsonPath("$.data.query").value("食べる"))
                .andExpect(jsonPath("$.data.total").value(1))
                .andExpect(jsonPath("$.data.page").value(0))
                .andExpect(jsonPath("$.data.size").value(20))
                .andExpect(jsonPath("$.data.items[0].contentType").value("VOCABULARY"))
                .andExpect(jsonPath("$.data.items[0].title").value("食べる"))
                .andExpect(jsonPath("$.data.items[0].subtitle").value("たべる"))
                .andExpect(jsonPath("$.data.items[0].description").value("Ăn"))
                .andExpect(jsonPath("$.data.items[0].level").value("N5"))
                .andExpect(jsonPath("$.data.items[0].lessonId").value(10))
                .andExpect(jsonPath("$.data.items[0].lessonTitle").value("Bài 01"));
    }

    @Test
    @DisplayName("GET /api/v1/search?q= trống trả lỗi 400 với thông báo tiếng Việt")
    void testSearch_BlankQuery_Throws400() throws Exception {
        when(searchService.search(eq(""), any(), any(), any(), any()))
                .thenThrow(new IllegalArgumentException("Từ khóa tìm kiếm không được để trống"));

        mockMvc.perform(get("/api/v1/search?q="))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Từ khóa tìm kiếm không được để trống"))
                .andExpect(jsonPath("$.data").doesNotExist());
    }

    @Test
    @DisplayName("GET /api/v1/search?q=   khoảng trắng trả lỗi 400")
    void testSearch_WhitespaceQuery_Throws400() throws Exception {
        when(searchService.search(eq("   "), any(), any(), any(), any()))
                .thenThrow(new IllegalArgumentException("Từ khóa tìm kiếm không được để trống"));

        mockMvc.perform(get("/api/v1/search?q=   "))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Từ khóa tìm kiếm không được để trống"));
    }

    @Test
    @DisplayName("GET /api/v1/search với query vượt quá 100 ký tự trả lỗi 400")
    void testSearch_TooLongQuery_Throws400() throws Exception {
        String longQuery = "a".repeat(101);
        when(searchService.search(eq(longQuery), any(), any(), any(), any()))
                .thenThrow(new IllegalArgumentException("Từ khóa tìm kiếm không được vượt quá 100 ký tự"));

        mockMvc.perform(get("/api/v1/search?q=" + longQuery))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Từ khóa tìm kiếm không được vượt quá 100 ký tự"));
    }

    @Test
    @DisplayName("GET /api/v1/search với type không hỗ trợ trả 400")
    void testSearch_UnsupportedType_Throws400() throws Exception {
        when(searchService.search(eq("test"), eq("TEST"), any(), any(), any()))
                .thenThrow(new IllegalArgumentException("Loại nội dung không được hỗ trợ"));

        mockMvc.perform(get("/api/v1/search?q=test&type=TEST"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Loại nội dung không được hỗ trợ"));
    }

    @Test
    @DisplayName("GET /api/v1/search không có kết quả trả 200 với danh sách rỗng")
    void testSearch_NoResults_Returns200WithEmptyList() throws Exception {
        SearchResponse response = new SearchResponse("xyz123", 0, 0, 20, Collections.emptyList());

        when(searchService.search(eq("xyz123"), any(), any(), eq(0), eq(20)))
                .thenReturn(response);

        mockMvc.perform(get("/api/v1/search?q=xyz123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Tìm kiếm thành công"))
                .andExpect(jsonPath("$.data.total").value(0))
                .andExpect(jsonPath("$.data.items").isEmpty());
    }

    @Test
    @DisplayName("GET /api/v1/search hỗ trợ phân trang và bộ lọc level")
    void testSearch_PaginationAndLevelFilter() throws Exception {
        SearchResponse response = new SearchResponse("食", 15, 1, 10, Collections.emptyList());

        when(searchService.search(eq("食"), eq("KANJI"), eq("N5"), eq(1), eq(10)))
                .thenReturn(response);

        mockMvc.perform(get("/api/v1/search?q=食&type=KANJI&level=N5&page=1&size=10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.total").value(15))
                .andExpect(jsonPath("$.data.page").value(1))
                .andExpect(jsonPath("$.data.size").value(10));
    }
}
