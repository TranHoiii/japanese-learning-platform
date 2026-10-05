package com.japanese.learning.auth.security;

import com.japanese.learning.common.security.SecurityConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class JwtSecretValidationTest {

    private final SecurityConfig securityConfig = new SecurityConfig();

    @Test
    @DisplayName("1. jwtSecretKey với secret null phải ném IllegalStateException")
    void testJwtSecretKey_NullSecret_ThrowsException() {
        IllegalStateException ex = assertThrows(
                IllegalStateException.class,
                () -> securityConfig.jwtSecretKey(null)
        );
        assertTrue(ex.getMessage().contains("JWT secret is not configured"));
    }

    @Test
    @DisplayName("2. jwtSecretKey với secret rỗng hoặc chỉ có khoảng trắng phải ném IllegalStateException")
    void testJwtSecretKey_BlankSecret_ThrowsException() {
        IllegalStateException ex1 = assertThrows(
                IllegalStateException.class,
                () -> securityConfig.jwtSecretKey("")
        );
        assertTrue(ex1.getMessage().contains("JWT secret is not configured"));

        IllegalStateException ex2 = assertThrows(
                IllegalStateException.class,
                () -> securityConfig.jwtSecretKey("   ")
        );
        assertTrue(ex2.getMessage().contains("JWT secret is not configured"));
    }

    @Test
    @DisplayName("3. jwtSecretKey với secret ngắn hơn 32 bytes (256 bits) phải ném IllegalStateException")
    void testJwtSecretKey_TooShortSecret_ThrowsException() {
        String shortSecret = "too-short-secret-less-32-bytes";
        assertTrue(shortSecret.getBytes(StandardCharsets.UTF_8).length < 32);

        IllegalStateException ex = assertThrows(
                IllegalStateException.class,
                () -> securityConfig.jwtSecretKey(shortSecret)
        );
        assertTrue(ex.getMessage().contains("at least 32 bytes"));
    }

    @Test
    @DisplayName("4. jwtSecretKey với secret hợp lệ (>= 32 bytes) trả về SecretKeySpec chuẩn HmacSHA256")
    void testJwtSecretKey_ValidSecret_ReturnsSecretKey() {
        String validSecret = "this-is-a-valid-secure-jwt-secret-key-that-is-over-32-bytes-long";
        assertTrue(validSecret.getBytes(StandardCharsets.UTF_8).length >= 32);

        SecretKey key = securityConfig.jwtSecretKey(validSecret);
        assertNotNull(key);
        assertEquals("HmacSHA256", key.getAlgorithm());
        assertArrayEquals(validSecret.getBytes(StandardCharsets.UTF_8), key.getEncoded());
    }

    @org.springframework.context.annotation.Configuration
    static class TestSecretConfig {
        @org.springframework.context.annotation.Bean
        public SecretKey jwtSecretKey(@org.springframework.beans.factory.annotation.Value("${app.jwt.secret:${jwt.secret:}}") String secret) {
            return new SecurityConfig().jwtSecretKey(secret);
        }
    }

    @Test
    @DisplayName("5. Spring context không có JWT secret cấu hình phải fail fast khi khởi động")
    void testApplicationContextStartup_MissingSecret_FailsFast() {
        new ApplicationContextRunner()
                .withUserConfiguration(TestSecretConfig.class)
                .run(context -> {
                    assertThat(context).hasFailed();
                    assertThat(context.getStartupFailure())
                            .hasRootCauseInstanceOf(IllegalStateException.class)
                            .hasRootCauseMessage("JWT secret is not configured. Please provide a secure secret via JWT_SECRET environment variable or app.jwt.secret configuration property.");
                });
    }

    @Test
    @DisplayName("6. Spring context với JWT secret hợp lệ khởi động thành công và nạp đủ Beans")
    void testApplicationContextStartup_ValidSecret_Succeeds() {
        new ApplicationContextRunner()
                .withUserConfiguration(TestSecretConfig.class)
                .withPropertyValues("app.jwt.secret=valid-secret-key-that-is-at-least-32-bytes-long-for-testing")
                .run(context -> {
                    assertThat(context).hasNotFailed();
                    assertThat(context).hasSingleBean(SecretKey.class);
                });
    }
}
