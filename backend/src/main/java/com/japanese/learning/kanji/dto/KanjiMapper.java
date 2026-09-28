package com.japanese.learning.kanji.dto;

import com.japanese.learning.kanji.entity.Kanji;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {KanjiCompoundMapper.class})
public interface KanjiMapper {

    KanjiResponse toResponse(Kanji entity);
}
