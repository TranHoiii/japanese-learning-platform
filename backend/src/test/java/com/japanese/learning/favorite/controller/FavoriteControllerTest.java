package com.japanese.learning.favorite.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.favorite.dto.CreateFavoriteRequest;
import com.japanese.learning.favorite.dto.FavoriteCheckResponse;
import com.japanese.learning.favorite.dto.FavoriteResponse;
import com.japanese.learning.favorite.service.FavoriteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class FavoriteControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private FavoriteService favoriteService;

    @InjectMocks
    private FavoriteController favoriteController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(favoriteController)
                .setCustomArgumentResolvers(new org.springframework.security.web.method.annotation.AuthenticationPrincipalArgumentResolver())
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    @DisplayName("GET /api/v1/favorites thành công trả 200 và danh sách")
    void testGetFavorites_Success() throws Exception {
        FavoriteResponse item = new FavoriteResponse(1L, ContentType.VOCABULARY, 10L, LocalDateTime.now());
        when(favoriteService.getFavorites(any())).thenReturn(List.of(item));

        mockMvc.perform(get("/api/v1/favorites"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Lấy danh sách yêu thích thành công"))
                .andExpect(jsonPath("$.data[0].id").value(1))
                .andExpect(jsonPath("$.data[0].contentType").value("VOCABULARY"))
                .andExpect(jsonPath("$.data[0].contentId").value(10));
    }

    @Test
    @DisplayName("POST /api/v1/favorites thành công trả 200 và FavoriteResponse")
    void testAddFavorite_Success() throws Exception {
        CreateFavoriteRequest request = new CreateFavoriteRequest(ContentType.VOCABULARY, 101L);
        FavoriteResponse response = new FavoriteResponse(1L, ContentType.VOCABULARY, 101L, LocalDateTime.now());
        when(favoriteService.addFavorite(any(), any(CreateFavoriteRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/favorites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Thêm vào danh sách yêu thích thành công"))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.contentType").value("VOCABULARY"))
                .andExpect(jsonPath("$.data.contentId").value(101));
    }

    @Test
    @DisplayName("POST /api/v1/favorites thất bại khi contentType null")
    void testAddFavorite_NullContentType() throws Exception {
        String body = "{\"contentType\": null, \"contentId\": 101}";

        mockMvc.perform(post("/api/v1/favorites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("POST /api/v1/favorites thất bại khi contentId null")
    void testAddFavorite_NullContentId() throws Exception {
        String body = "{\"contentType\": \"VOCABULARY\", \"contentId\": null}";

        mockMvc.perform(post("/api/v1/favorites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("POST /api/v1/favorites thất bại khi contentId <= 0")
    void testAddFavorite_NegativeContentId() throws Exception {
        CreateFavoriteRequest request = new CreateFavoriteRequest(ContentType.VOCABULARY, 0L);

        mockMvc.perform(post("/api/v1/favorites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("GET /api/v1/favorites/check trả favorited=true khi đã yêu thích")
    void testCheckFavorite_True() throws Exception {
        FavoriteCheckResponse response = new FavoriteCheckResponse(true, 10L);
        when(favoriteService.checkFavorite(any(), eq(ContentType.VOCABULARY), eq(101L))).thenReturn(response);

        mockMvc.perform(get("/api/v1/favorites/check")
                        .param("contentType", "VOCABULARY")
                        .param("contentId", "101"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Kiểm tra yêu thích thành công"))
                .andExpect(jsonPath("$.data.favorited").value(true))
                .andExpect(jsonPath("$.data.favoriteId").value(10));
    }

    @Test
    @DisplayName("GET /api/v1/favorites/check trả favorited=false khi chưa yêu thích")
    void testCheckFavorite_False() throws Exception {
        FavoriteCheckResponse response = new FavoriteCheckResponse(false, null);
        when(favoriteService.checkFavorite(any(), eq(ContentType.VOCABULARY), eq(101L))).thenReturn(response);

        mockMvc.perform(get("/api/v1/favorites/check")
                        .param("contentType", "VOCABULARY")
                        .param("contentId", "101"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Kiểm tra yêu thích thành công"))
                .andExpect(jsonPath("$.data.favorited").value(false))
                .andExpect(jsonPath("$.data.favoriteId").isEmpty());
    }

    @Test
    @DisplayName("DELETE /api/v1/favorites/{id} thành công trả 200")
    void testDeleteFavorite_Success() throws Exception {
        doNothing().when(favoriteService).deleteFavorite(any(), eq(1L));

        mockMvc.perform(delete("/api/v1/favorites/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Xóa yêu thích thành công"))
                .andExpect(jsonPath("$.data").doesNotExist());
    }

    @Test
    @DisplayName("DELETE /api/v1/favorites/{id} trả 404 khi không tìm thấy")
    void testDeleteFavorite_NotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Không tìm thấy mục yêu thích với ID: 99"))
                .when(favoriteService).deleteFavorite(any(), eq(99L));

        mockMvc.perform(delete("/api/v1/favorites/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Không tìm thấy mục yêu thích với ID: 99"));
    }
}
