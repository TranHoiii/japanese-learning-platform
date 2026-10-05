package com.japanese.learning.admin.dto;

public record AdminLevelResponse(
        Long id,
        String code,
        String name,
        String description,
        Integer sortOrder,
        Boolean isActive
) {
}
