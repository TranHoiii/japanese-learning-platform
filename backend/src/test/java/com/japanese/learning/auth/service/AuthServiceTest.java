package com.japanese.learning.auth.service;

import com.japanese.learning.auth.dto.AuthResponse;
import com.japanese.learning.auth.dto.LoginRequest;
import com.japanese.learning.auth.dto.RegisterRequest;
import com.japanese.learning.auth.dto.UserResponse;
import com.japanese.learning.common.exception.EmailAlreadyExistsException;
import com.japanese.learning.common.exception.InvalidCredentialsException;
import com.japanese.learning.common.exception.UserInactiveException;
import com.japanese.learning.user.entity.User;
import com.japanese.learning.user.enums.Role;
import com.japanese.learning.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtEncoder jwtEncoder;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(authService, "jwtIssuer", "japanese-learning-platform");
        ReflectionTestUtils.setField(authService, "jwtExpirationSeconds", 86400L);
    }

    private void mockJwtEncoder() {
        Jwt mockJwt = mock(Jwt.class);
        when(mockJwt.getTokenValue()).thenReturn("mocked.jwt.token");
        when(jwtEncoder.encode(any(JwtEncoderParameters.class))).thenReturn(mockJwt);
    }

    @Test
    @DisplayName("1. Register thành công: tạo user role USER, status true, trả token và user info")
    void testRegister_Success() {
        RegisterRequest request = new RegisterRequest("test@example.com", "password123", "Test User");

        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("$2a$10$hashedpassword");
        mockJwtEncoder();

        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setEmail("test@example.com");
        savedUser.setPasswordHash("$2a$10$hashedpassword");
        savedUser.setFullName("Test User");
        savedUser.setRole(Role.USER);
        savedUser.setStatus(true);

        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("mocked.jwt.token", response.accessToken());
        assertNotNull(response.user());
        assertEquals(1L, response.user().id());
        assertEquals("test@example.com", response.user().email());
        assertEquals("Test User", response.user().fullName());
        assertEquals(Role.USER, response.user().role());
        assertTrue(response.user().status());

        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("2. Register duplicate email: ném EmailAlreadyExistsException")
    void testRegister_DuplicateEmail() {
        RegisterRequest request = new RegisterRequest("existing@example.com", "password123", "Existing User");
        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class, () -> authService.register(request));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("3. Password được hash: password lưu vào DB được mã hóa bằng PasswordEncoder")
    void testRegister_PasswordIsHashed() {
        RegisterRequest request = new RegisterRequest("newuser@example.com", "myPlainPassword", "New User");
        when(userRepository.existsByEmail("newuser@example.com")).thenReturn(false);
        when(passwordEncoder.encode("myPlainPassword")).thenReturn("$2a$10$stronghashvalue");
        mockJwtEncoder();

        User savedUser = new User();
        savedUser.setId(2L);
        savedUser.setEmail("newuser@example.com");
        savedUser.setPasswordHash("$2a$10$stronghashvalue");
        savedUser.setFullName("New User");
        savedUser.setRole(Role.USER);
        savedUser.setStatus(true);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        when(userRepository.save(userCaptor.capture())).thenReturn(savedUser);

        authService.register(request);

        User capturedUser = userCaptor.getValue();
        assertEquals("$2a$10$stronghashvalue", capturedUser.getPasswordHash());
        assertNotEquals("myPlainPassword", capturedUser.getPasswordHash());
    }

    @Test
    @DisplayName("4. Login thành công: email và password đúng trả về token và user info")
    void testLogin_Success() {
        LoginRequest request = new LoginRequest("user@example.com", "password123");

        User user = new User();
        user.setId(10L);
        user.setEmail("user@example.com");
        user.setPasswordHash("$2a$10$hashedpassword");
        user.setFullName("Valid User");
        user.setRole(Role.USER);
        user.setStatus(true);

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password123", "$2a$10$hashedpassword")).thenReturn(true);
        mockJwtEncoder();

        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("mocked.jwt.token", response.accessToken());
        assertEquals(10L, response.user().id());
        assertEquals("user@example.com", response.user().email());
    }

    @Test
    @DisplayName("5. Wrong password: ném InvalidCredentialsException")
    void testLogin_WrongPassword() {
        LoginRequest request = new LoginRequest("user@example.com", "wrongpassword");

        User user = new User();
        user.setId(10L);
        user.setEmail("user@example.com");
        user.setPasswordHash("$2a$10$hashedpassword");
        user.setStatus(true);

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongpassword", "$2a$10$hashedpassword")).thenReturn(false);

        InvalidCredentialsException ex = assertThrows(InvalidCredentialsException.class, () -> authService.login(request));
        assertEquals("Email hoặc mật khẩu không chính xác", ex.getMessage());
    }

    @Test
    @DisplayName("6. Inactive user: ném UserInactiveException")
    void testLogin_InactiveUser() {
        LoginRequest request = new LoginRequest("inactive@example.com", "password123");

        User user = new User();
        user.setId(11L);
        user.setEmail("inactive@example.com");
        user.setPasswordHash("$2a$10$hashedpassword");
        user.setStatus(false);

        when(userRepository.findByEmail("inactive@example.com")).thenReturn(Optional.of(user));

        UserInactiveException ex = assertThrows(UserInactiveException.class, () -> authService.login(request));
        assertEquals("Tài khoản đã bị vô hiệu hóa hoặc chưa kích hoạt", ex.getMessage());
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }

    @Test
    @DisplayName("7. GET /auth/me authenticated: trả user info và không bao giờ leak password")
    void testGetCurrentUser_Authenticated() {
        Jwt jwt = mock(Jwt.class);
        when(jwt.getClaim("userId")).thenReturn(15L);

        User user = new User();
        user.setId(15L);
        user.setEmail("me@example.com");
        user.setPasswordHash("$2a$10$supersecretneverleak");
        user.setFullName("Me User");
        user.setAvatarUrl("https://example.com/avatar.png");
        user.setRole(Role.USER);
        user.setStatus(true);

        when(userRepository.findById(15L)).thenReturn(Optional.of(user));

        UserResponse response = authService.getCurrentUser(jwt);

        assertNotNull(response);
        assertEquals(15L, response.id());
        assertEquals("me@example.com", response.email());
        assertEquals("Me User", response.fullName());
        assertEquals("https://example.com/avatar.png", response.avatarUrl());
        assertEquals(Role.USER, response.role());
        assertTrue(response.status());
    }

    @Test
    @DisplayName("8. GET /auth/me unauthenticated: jwt null ném InvalidCredentialsException")
    void testGetCurrentUser_Unauthenticated() {
        assertThrows(InvalidCredentialsException.class, () -> authService.getCurrentUser(null));
    }
}
