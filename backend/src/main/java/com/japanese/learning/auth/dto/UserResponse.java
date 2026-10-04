package com.japanese.learning.auth.dto;

import com.japanese.learning.user.entity.User;
import com.japanese.learning.user.enums.Role;

public record UserResponse(
        Long id,
        String email,
        String fullName,
        String avatarUrl,
        Role role,
        Boolean status
) {
    public static UserResponse fromEntity(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getAvatarUrl(),
                user.getRole(),
                user.getStatus()
        );
    }
}
