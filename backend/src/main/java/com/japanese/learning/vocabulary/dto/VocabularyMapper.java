package com.japanese.learning.vocabulary.dto;

import com.japanese.learning.vocabulary.entity.Vocabulary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VocabularyMapper {

    @Mapping(target = "lessonId", source = "lesson.id")
    VocabularyResponse toResponse(Vocabulary entity);
}