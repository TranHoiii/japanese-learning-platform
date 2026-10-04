package com.japanese.learning.exercise.dto;

import com.japanese.learning.exercise.entity.Exercise;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {QuestionMapper.class})
public interface ExerciseMapper {

    @Mapping(target = "lessonId", source = "lesson.id")
    @Mapping(target = "questionCount", expression = "java(entity.getQuestions() != null ? entity.getQuestions().size() : 0)")
    ExerciseResponse toResponse(Exercise entity);
}
