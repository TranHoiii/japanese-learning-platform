package com.japanese.learning.auth.dto;

public record AuthResponse(
        String accessToken,
        UserResponse user
) {
}
