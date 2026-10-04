package com.japanese.learning.exercise.dto;

import com.japanese.learning.exercise.entity.QuestionOption;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionOptionMapper {

    QuestionOptionResponse toResponse(QuestionOption entity);
}
