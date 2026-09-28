package com.japanese.learning.lesson.repository;

import com.japanese.learning.lesson.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByLevelIdAndActiveTrueOrderBySortOrderAsc(Long levelId);

    java.util.Optional<Lesson> findByLevelIdAndLessonNumber(Long levelId, Integer lessonNumber);
}