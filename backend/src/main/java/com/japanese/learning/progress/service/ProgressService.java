package com.japanese.learning.progress.service;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.progress.dto.ContentProgressResponse;
import com.japanese.learning.progress.dto.LessonProgressResponse;
import com.japanese.learning.progress.dto.ProgressSummaryResponse;
import com.japanese.learning.progress.dto.UpdateContentProgressRequest;
import com.japanese.learning.progress.dto.UpdateLessonProgressRequest;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public interface ProgressService {

    ProgressSummaryResponse getProgressSummary(Jwt jwt);

    List<LessonProgressResponse> getLessonProgresses(Jwt jwt);

    LessonProgressResponse getLessonProgress(Jwt jwt, Long lessonId);

    LessonProgressResponse updateLessonProgress(Jwt jwt, Long lessonId, UpdateLessonProgressRequest request);

    List<ContentProgressResponse> getContentProgresses(Jwt jwt, ContentType contentType);

    ContentProgressResponse updateContentProgress(Jwt jwt, UpdateContentProgressRequest request);
}
