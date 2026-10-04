package com.japanese.learning.reading.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingContentResponse {

    private Long id;
    private Long lessonId;
    private String title;
    private String content;
    private String translation;
    private String imageUrl;
    private Integer sortOrder;
    private List<ReadingQuestionResponse> questions;
}
