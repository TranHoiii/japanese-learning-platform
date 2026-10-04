package com.japanese.learning.favorite.security;

import com.japanese.learning.common.security.SecurityConfig;
import com.japanese.learning.favorite.controller.FavoriteController;
import com.japanese.learning.favorite.service.FavoriteService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = FavoriteController.class)
@Import(SecurityConfig.class)
class FavoriteSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private FavoriteService favoriteService;

    @Test
    @DisplayName("Unauthenticated GET /api/v1/favorites trả 401")
    void testGetFavorites_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/favorites"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Unauthenticated POST /api/v1/favorites trả 401")
    void testAddFavorite_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(post("/api/v1/favorites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"contentType\":\"VOCABULARY\",\"contentId\":1}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Unauthenticated GET /api/v1/favorites/check trả 401")
    void testCheckFavorite_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/favorites/check?contentType=VOCABULARY&contentId=1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("Unauthenticated DELETE /api/v1/favorites/1 trả 401")
    void testDeleteFavorite_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(delete("/api/v1/favorites/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }
}
