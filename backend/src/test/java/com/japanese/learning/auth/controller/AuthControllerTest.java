package com.japanese.learning.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.auth.dto.AuthResponse;
import com.japanese.learning.auth.dto.LoginRequest;
import com.japanese.learning.auth.dto.RegisterRequest;
import com.japanese.learning.auth.dto.UserResponse;
import com.japanese.learning.auth.service.AuthService;
import com.japanese.learning.common.exception.EmailAlreadyExistsException;
import com.japanese.learning.common.exception.GlobalExceptionHandler;
import com.japanese.learning.common.exception.InvalidCredentialsException;
import com.japanese.learning.common.exception.UserInactiveException;
import com.japanese.learning.user.enums.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(authController)
                .setCustomArgumentResolvers(new org.springframework.security.web.method.annotation.AuthenticationPrincipalArgumentResolver())
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    @DisplayName("POST /api/v1/auth/register thành công trả 200 và ApiResponse")
    void testRegister_Success() throws Exception {
        RegisterRequest request = new RegisterRequest("test@example.com", "password123", "Test User");
        UserResponse userResponse = new UserResponse(1L, "test@example.com", "Test User", null, Role.USER, true);
        AuthResponse authResponse = new AuthResponse("mock.token", userResponse);

        when(authService.register(any(RegisterRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Đăng ký thành công"))
                .andExpect(jsonPath("$.data.accessToken").value("mock.token"))
                .andExpect(jsonPath("$.data.user.email").value("test@example.com"));
    }

    @Test
    @DisplayName("POST /api/v1/auth/register validation error (email rỗng) trả 400")
    void testRegister_ValidationError() throws Exception {
        RegisterRequest request = new RegisterRequest("", "123456", "Test User");

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("POST /api/v1/auth/register trùng email trả 400")
    void testRegister_DuplicateEmail() throws Exception {
        RegisterRequest request = new RegisterRequest("exist@example.com", "password123", "Test User");

        when(authService.register(any(RegisterRequest.class)))
                .thenThrow(new EmailAlreadyExistsException("Email đã được sử dụng"));

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Email đã được sử dụng"));
    }

    @Test
    @DisplayName("POST /api/v1/auth/login thành công trả 200 và ApiResponse")
    void testLogin_Success() throws Exception {
        LoginRequest request = new LoginRequest("test@example.com", "password123");
        UserResponse userResponse = new UserResponse(1L, "test@example.com", "Test User", null, Role.USER, true);
        AuthResponse authResponse = new AuthResponse("mock.token", userResponse);

        when(authService.login(any(LoginRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Đăng nhập thành công"))
                .andExpect(jsonPath("$.data.accessToken").value("mock.token"));
    }

    @Test
    @DisplayName("POST /api/v1/auth/login sai mật khẩu trả 401")
    void testLogin_WrongPassword() throws Exception {
        LoginRequest request = new LoginRequest("test@example.com", "wrongpassword");

        when(authService.login(any(LoginRequest.class)))
                .thenThrow(new InvalidCredentialsException("Email hoặc mật khẩu không chính xác"));

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Email hoặc mật khẩu không chính xác"));
    }

    @Test
    @DisplayName("POST /api/v1/auth/login inactive user trả 403")
    void testLogin_InactiveUser() throws Exception {
        LoginRequest request = new LoginRequest("inactive@example.com", "password123");

        when(authService.login(any(LoginRequest.class)))
                .thenThrow(new UserInactiveException("Tài khoản đã bị vô hiệu hóa hoặc chưa kích hoạt"));

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Tài khoản đã bị vô hiệu hóa hoặc chưa kích hoạt"));
    }

    @Test
    @DisplayName("GET /api/v1/auth/me trả thông tin user thành công")
    void testGetCurrentUser_Success() throws Exception {
        UserResponse userResponse = new UserResponse(1L, "test@example.com", "Test User", null, Role.USER, true);
        when(authService.getCurrentUser(any())).thenReturn(userResponse);

        mockMvc.perform(get("/api/v1/auth/me")
                        .with(org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt()
                                .jwt(builder -> builder.subject("test@example.com").claim("userId", 1L))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.email").value("test@example.com"));
    }
}
