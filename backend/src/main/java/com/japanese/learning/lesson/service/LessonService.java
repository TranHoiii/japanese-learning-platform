package com.japanese.learning.lesson.service;

import com.japanese.learning.lesson.dto.LessonResponse;

import java.util.List;

public interface LessonService {

    List<LessonResponse> getLessonsByLevelId(Long levelId);

    LessonResponse getById(Long id);
}