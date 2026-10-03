package com.japanese.learning.listening.dto;

import com.japanese.learning.listening.entity.ListeningContent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {ListeningQuestionMapper.class})
public interface ListeningContentMapper {

    @Mapping(target = "lessonId", source = "lesson.id")
    ListeningContentResponse toResponse(ListeningContent entity);
}
