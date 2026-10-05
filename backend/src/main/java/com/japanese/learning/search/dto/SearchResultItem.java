package com.japanese.learning.search.dto;

import com.japanese.learning.common.enums.ContentType;

public record SearchResultItem(
        ContentType contentType,
        Long contentId,
        String title,
        String subtitle,
        String description,
        String level,
        Long lessonId,
        String lessonTitle
) {}
