package com.japanese.learning.reading.dto;

import com.japanese.learning.reading.entity.ReadingQuestion;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ReadingOptionMapper.class})
public interface ReadingQuestionMapper {

    ReadingQuestionResponse toResponse(ReadingQuestion entity);
}
