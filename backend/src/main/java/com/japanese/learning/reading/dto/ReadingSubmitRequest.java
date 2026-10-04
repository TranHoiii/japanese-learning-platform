package com.japanese.learning.reading.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
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
public class ReadingSubmitRequest {

    @NotEmpty(message = "Danh sách câu trả lời không được để trống")
    @Valid
    private List<ReadingAnswerRequest> answers;
}
