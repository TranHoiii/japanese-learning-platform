package com.japanese.learning.search.controller;

import com.japanese.learning.common.response.ApiResponse;
import com.japanese.learning.search.dto.SearchResponse;
import com.japanese.learning.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    public ResponseEntity<ApiResponse<SearchResponse>> search(
            @RequestParam(name = "q", required = false) String q,
            @RequestParam(name = "type", required = false) String type,
            @RequestParam(name = "level", required = false) String level,
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "20") Integer size
    ) {
        SearchResponse response = searchService.search(q, type, level, page, size);
        return ResponseEntity.ok(ApiResponse.success("Tìm kiếm thành công", response));
    }
}
