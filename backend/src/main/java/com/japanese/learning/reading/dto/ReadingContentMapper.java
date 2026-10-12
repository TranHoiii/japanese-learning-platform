package com.japanese.learning.reading.dto;

import com.japanese.learning.reading.entity.ReadingContent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {ReadingQuestionMapper.class})
public interface ReadingContentMapper {

    @Mapping(target = "lessonId", source = "lesson.id")
    @Mapping(target = "lessonNumber", source = "lesson.lessonNumber")
    @Mapping(target = "levelCode", source = "lesson.level.code")
    ReadingContentResponse toResponse(ReadingContent entity);
}
