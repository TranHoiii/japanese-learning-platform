package com.japanese.learning.listening.dto;

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
public class ListeningContentResponse {

    private Long id;
    private Long lessonId;
    private String title;
    private String audioUrl;
    private String transcript;
    private String description;
    private Integer sortOrder;
    private List<ListeningQuestionResponse> questions;
}
