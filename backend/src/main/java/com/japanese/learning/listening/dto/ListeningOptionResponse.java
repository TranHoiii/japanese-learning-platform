package com.japanese.learning.listening.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListeningOptionResponse {

    private Long id;
    private String content;
    private Integer sortOrder;
}
