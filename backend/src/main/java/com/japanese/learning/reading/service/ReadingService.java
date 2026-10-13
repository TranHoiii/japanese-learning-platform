package com.japanese.learning.reading.service;

import com.japanese.learning.reading.dto.ReadingContentResponse;
import com.japanese.learning.reading.dto.ReadingSubmitRequest;
import com.japanese.learning.reading.dto.ReadingSubmitResponse;

import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public interface ReadingService {

    List<ReadingContentResponse> getReadingsByLessonId(Long lessonId);

    ReadingContentResponse getReadingById(Long id);

    ReadingSubmitResponse submitReading(Long id, ReadingSubmitRequest request);

    ReadingSubmitResponse submitReading(Long id, ReadingSubmitRequest request, Jwt jwt);
}
