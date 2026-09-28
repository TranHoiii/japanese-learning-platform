package com.japanese.learning.level.dto;

import com.japanese.learning.lesson.entity.Level;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LevelMapper {

    @Mapping(target = "isActive", source = "active")
    LevelResponse toResponse(Level entity);
}