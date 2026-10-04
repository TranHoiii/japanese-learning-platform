package com.japanese.learning.search.security;

import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.search.controller.SearchController;
import com.japanese.learning.search.dto.SearchResponse;
import com.japanese.learning.search.service.SearchService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = SearchController.class)
@Import(SecurityConfig.class)
class SearchSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private SearchService searchService;

    @Test
    @DisplayName("Search endpoint là public, không cần JWT xác thực vẫn trả về 200 OK")
    void testSearch_PublicAccess_Returns200() throws Exception {
        SearchResponse response = new SearchResponse("食べる", 0, 0, 20, Collections.emptyList());
        when(searchService.search(eq("食べる"), any(), any(), any(), any()))
                .thenReturn(response);

        mockMvc.perform(get("/api/v1/search?q=食べる"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.query").value("食べる"));
    }

    @Test
    @DisplayName("Search endpoint không yêu cầu xác thực khi có filter type và level")
    void testSearch_WithFilters_PublicAccess_Returns200() throws Exception {
        SearchResponse response = new SearchResponse("ăn", 0, 0, 20, Collections.emptyList());
        when(searchService.search(eq("ăn"), eq("VOCABULARY"), eq("N5"), any(), any()))
                .thenReturn(response);

        mockMvc.perform(get("/api/v1/search?q=ăn&type=VOCABULARY&level=N5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}
