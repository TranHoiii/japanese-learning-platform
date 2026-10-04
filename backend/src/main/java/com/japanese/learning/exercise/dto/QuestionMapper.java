package com.japanese.learning.exercise.dto;

import com.japanese.learning.exercise.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {QuestionOptionMapper.class})
public interface QuestionMapper {

    @Mapping(target = "exerciseId", source = "exercise.id")
    QuestionResponse toResponse(Question entity);
}
