package com.japanese.learning.search.service;

import com.japanese.learning.search.dto.SearchResponse;

public interface SearchService {
    SearchResponse search(String query, String type, String level, Integer page, Integer size);
}
