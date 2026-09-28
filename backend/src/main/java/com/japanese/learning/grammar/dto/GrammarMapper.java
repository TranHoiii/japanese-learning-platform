package com.japanese.learning.grammar.dto;

import com.japanese.learning.grammar.entity.Grammar;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {GrammarExampleMapper.class})
public interface GrammarMapper {

    @Mapping(target = "lessonId", source = "lesson.id")
    GrammarResponse toResponse(Grammar entity);
}
