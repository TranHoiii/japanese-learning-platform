package com.japanese.learning.auth.service;

import com.japanese.learning.auth.dto.AuthResponse;
import com.japanese.learning.auth.dto.LoginRequest;
import com.japanese.learning.auth.dto.RegisterRequest;
import com.japanese.learning.auth.dto.UserResponse;
import com.japanese.learning.common.exception.EmailAlreadyExistsException;
import com.japanese.learning.common.exception.InvalidCredentialsException;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.common.exception.UserInactiveException;
import com.japanese.learning.user.entity.User;
import com.japanese.learning.user.enums.Role;
import com.japanese.learning.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;

    @Value("${app.jwt.issuer:japanese-learning-platform}")
    private String jwtIssuer;

    @Value("${app.jwt.expiration-seconds:86400}")
    private long jwtExpirationSeconds;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException("Email đã được sử dụng");
        }

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setFullName(request.fullName().trim());
        user.setRole(Role.USER);
        user.setStatus(true);

        User savedUser = userRepository.save(user);
        String token = generateToken(savedUser);

        return new AuthResponse(token, UserResponse.fromEntity(savedUser));
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidCredentialsException("Email hoặc mật khẩu không chính xác"));

        if (!Boolean.TRUE.equals(user.getStatus())) {
            throw new UserInactiveException("Tài khoản đã bị vô hiệu hóa hoặc chưa kích hoạt");
        }

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Email hoặc mật khẩu không chính xác");
        }

        String token = generateToken(user);
        return new AuthResponse(token, UserResponse.fromEntity(user));
    }

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(Jwt jwt) {
        User user = getAuthenticatedUser(jwt);
        return UserResponse.fromEntity(user);
    }

    @Transactional(readOnly = true)
    public User getAuthenticatedUser(Jwt jwt) {
        if (jwt == null) {
            throw new InvalidCredentialsException("Yêu cầu xác thực tài khoản");
        }

        Long parsedUserId = null;
        Object userIdClaim = jwt.getClaim("userId");
        if (userIdClaim instanceof Number number) {
            parsedUserId = number.longValue();
        } else if (userIdClaim instanceof String str && !str.isBlank()) {
            try {
                parsedUserId = Long.parseLong(str);
            } catch (NumberFormatException ignored) {
            }
        }

        if (parsedUserId != null) {
            final Long targetUserId = parsedUserId;
            return userRepository.findById(targetUserId)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + targetUserId));
        } else {
            final String email = jwt.getSubject();
            if (email == null || email.isBlank()) {
                throw new InvalidCredentialsException("Token không hợp lệ");
            }
            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với email: " + email));
        }
    }

    public String generateToken(User user) {
        Instant now = Instant.now();
        Instant expiresAt = now.plusSeconds(jwtExpirationSeconds);

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(jwtIssuer)
                .issuedAt(now)
                .expiresAt(expiresAt)
                .subject(user.getEmail())
                .claim("userId", user.getId())
                .claim("role", user.getRole().name())
                .build();

        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}
