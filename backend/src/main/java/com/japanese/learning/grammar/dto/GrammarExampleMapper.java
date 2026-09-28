package com.japanese.learning.grammar.dto;

import com.japanese.learning.grammar.entity.GrammarExample;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GrammarExampleMapper {

    GrammarExampleResponse toResponse(GrammarExample entity);
}
