package com.japanese.learning.auth.security;

import com.japanese.learning.common.security.SecurityConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class JwtSecurityTest {

    private final SecurityConfig securityConfig = new SecurityConfig();

    @Test
    @DisplayName("9a. JWT role mapping: USER -> ROLE_USER")
    void testJwtRoleMapping_User() {
        JwtAuthenticationConverter converter = securityConfig.jwtAuthenticationConverter();

        Jwt jwt = Jwt.withTokenValue("mock.token.user")
                .header("alg", "HS256")
                .subject("user@example.com")
                .claim("userId", 100L)
                .claim("role", "USER")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(3600))
                .build();

        AbstractAuthenticationToken auth = converter.convert(jwt);
        assertNotNull(auth);

        Collection<GrantedAuthority> authorities = auth.getAuthorities();
        List<String> authorityStrings = authorities.stream().map(GrantedAuthority::getAuthority).toList();

        assertTrue(authorityStrings.contains("ROLE_USER"), "GrantedAuthorities must contain ROLE_USER");
        assertFalse(authorityStrings.contains("ROLE_ADMIN"), "GrantedAuthorities must not contain ROLE_ADMIN");
    }

    @Test
    @DisplayName("9b. JWT role mapping: ADMIN -> ROLE_ADMIN")
    void testJwtRoleMapping_Admin() {
        JwtAuthenticationConverter converter = securityConfig.jwtAuthenticationConverter();

        Jwt jwt = Jwt.withTokenValue("mock.token.admin")
                .header("alg", "HS256")
                .subject("admin@example.com")
                .claim("userId", 200L)
                .claim("role", "ADMIN")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(3600))
                .build();

        AbstractAuthenticationToken auth = converter.convert(jwt);
        assertNotNull(auth);

        Collection<GrantedAuthority> authorities = auth.getAuthorities();
        List<String> authorityStrings = authorities.stream().map(GrantedAuthority::getAuthority).toList();

        assertTrue(authorityStrings.contains("ROLE_ADMIN"), "GrantedAuthorities must contain ROLE_ADMIN");
        assertFalse(authorityStrings.contains("ROLE_USER"), "GrantedAuthorities must not contain ROLE_USER");
    }
}
