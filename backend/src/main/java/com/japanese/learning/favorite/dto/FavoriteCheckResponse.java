package com.japanese.learning.favorite.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record FavoriteCheckResponse(
        @JsonProperty("favorited")
        boolean favorited,

        @JsonProperty("favoriteId")
        Long favoriteId
) {
}
