package com.japanese.learning.auth.security;

import com.japanese.learning.auth.controller.AuthController;
import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.security.SecurityConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AuthController.class)
@Import(SecurityConfig.class)
class SecurityEndpointTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AuthService authService;

    @Test
    @DisplayName("8. GET /api/v1/auth/me unauthenticated trả 401 và ApiResponse chuẩn")
    void testGetMe_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/auth/me"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @DisplayName("9. POST /api/v1/auth/login là public endpoint: không bị chặn 401 bởi Security")
    void testLogin_PublicEndpoint() throws Exception {
        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post("/api/v1/auth/login")
                        .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest()); // 400 validation error, NOT 401 Unauthorized
    }

    @Test
    @DisplayName("10. POST /api/v1/auth/register là public endpoint: không bị chặn 401 bởi Security")
    void testRegister_PublicEndpoint() throws Exception {
        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post("/api/v1/auth/register")
                        .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest()); // 400 validation error, NOT 401 Unauthorized
    }
}
