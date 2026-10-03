package com.japanese.learning.listening.dto;

import com.japanese.learning.listening.entity.ListeningQuestion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {ListeningOptionMapper.class})
public interface ListeningQuestionMapper {

    @Mapping(target = "explanation", ignore = true)
    ListeningQuestionResponse toResponse(ListeningQuestion entity);
}
