package com.japanese.learning.reading.service;

import com.japanese.learning.reading.dto.ReadingContentResponse;
import com.japanese.learning.reading.dto.ReadingSubmitRequest;
import com.japanese.learning.reading.dto.ReadingSubmitResponse;

import java.util.List;

public interface ReadingService {

    List<ReadingContentResponse> getReadingsByLessonId(Long lessonId);

    ReadingContentResponse getReadingById(Long id);

    ReadingSubmitResponse submitReading(Long id, ReadingSubmitRequest request);
}
