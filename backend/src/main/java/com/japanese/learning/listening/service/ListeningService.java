package com.japanese.learning.listening.service;

import com.japanese.learning.listening.dto.ListeningContentResponse;
import com.japanese.learning.listening.dto.ListeningSubmitRequest;
import com.japanese.learning.listening.dto.ListeningSubmitResponse;

import java.util.List;

public interface ListeningService {

    List<ListeningContentResponse> getListeningsByLessonId(Long lessonId);

    ListeningContentResponse getListeningById(Long id);

    ListeningSubmitResponse submitListening(Long id, ListeningSubmitRequest request);
}
