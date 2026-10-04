package com.japanese.learning.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.admin.controller.AdminGrammarController;
import com.japanese.learning.admin.controller.AdminVocabularyController;
import com.japanese.learning.admin.dto.AdminGrammarExampleRequest;
import com.japanese.learning.admin.dto.AdminGrammarExampleResponse;
import com.japanese.learning.admin.dto.AdminGrammarRequest;
import com.japanese.learning.admin.dto.AdminGrammarResponse;
import com.japanese.learning.admin.dto.AdminVocabularyRequest;
import com.japanese.learning.admin.dto.AdminVocabularyResponse;
import com.japanese.learning.admin.service.AdminGrammarService;
import com.japanese.learning.admin.service.AdminVocabularyService;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.security.SecurityConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {AdminVocabularyController.class, AdminGrammarController.class})
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class AdminVocabGrammarTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AdminVocabularyService adminVocabularyService;

    @MockitoBean
    private AdminGrammarService adminGrammarService;

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Create Vocabulary success")
    void testCreateVocabulary_Success() throws Exception {
        AdminVocabularyRequest request = new AdminVocabularyRequest(
                1L, "ねこ", "猫", "Miêu", "Con mèo", "Danh từ", null, "Ghi chú"
        );
        AdminVocabularyResponse response = new AdminVocabularyResponse(
                10L, 1L, 1, "N5", "ねこ", "猫", "Miêu", "Con mèo", "Danh từ", null, "Ghi chú"
        );

        when(adminVocabularyService.createVocabulary(any(AdminVocabularyRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/admin/vocabularies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.hiragana").value("ねこ"))
                .andExpect(jsonPath("$.data.meaning").value("Con mèo"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Create Grammar with nested examples success")
    void testCreateGrammar_Success() throws Exception {
        AdminGrammarExampleRequest exReq = new AdminGrammarExampleRequest(
                "わたしはがくせいです。", "わたしはがくせいです。", "Tôi là học sinh.", "Giải thích", 1
        );
        AdminGrammarRequest request = new AdminGrammarRequest(
                1L, "~は~です", "Là...", "N1 は N2 です", "Khẳng định", null, 1, List.of(exReq)
        );

        AdminGrammarExampleResponse exRes = new AdminGrammarExampleResponse(
                100L, 20L, "わたしはがくせいです。", "わたしはがくせいです。", "Tôi là học sinh.", "Giải thích", 1
        );
        AdminGrammarResponse response = new AdminGrammarResponse(
                20L, 1L, 1, "N5", "~は~です", "Là...", "N1 は N2 です", "Khẳng định", null, 1, List.of(exRes)
        );

        when(adminGrammarService.createGrammar(any(AdminGrammarRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/admin/grammars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.pattern").value("~は~です"))
                .andExpect(jsonPath("$.data.examples[0].japanese").value("わたしはがくせいです。"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin: Create Grammar Example endpoint success")
    void testCreateGrammarExample_Success() throws Exception {
        AdminGrammarExampleRequest exReq = new AdminGrammarExampleRequest(
                "これは本です。", "これはほんです。", "Đây là sách.", null, 2
        );
        AdminGrammarExampleResponse exRes = new AdminGrammarExampleResponse(
                101L, 20L, "これは本です。", "これはほんです。", "Đây là sách.", null, 2
        );

        when(adminGrammarService.createExample(eq(20L), any(AdminGrammarExampleRequest.class))).thenReturn(exRes);

        mockMvc.perform(post("/api/v1/admin/grammars/20/examples")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(exReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.japanese").value("これは本です。"));
    }
}
