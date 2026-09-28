package com.japanese.learning.level.dto;

public record LevelResponse(
        Long id,
        String code,
        String name,
        String description,
        Integer sortOrder,
        Boolean isActive
) {
}