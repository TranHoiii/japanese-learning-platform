package com.japanese.learning.search.dto;

import java.util.List;

public record SearchResponse(
        String query,
        int total,
        int page,
        int size,
        List<SearchResultItem> items
) {}
