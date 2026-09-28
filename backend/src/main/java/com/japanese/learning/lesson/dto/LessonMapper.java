package com.japanese.learning.lesson.dto;

import com.japanese.learning.lesson.entity.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LessonMapper {

    @Mapping(target = "levelId", source = "level.id")
    @Mapping(target = "isActive", source = "active")
    LessonResponse toResponse(Lesson entity);
}