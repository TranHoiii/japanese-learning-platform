package com.japanese.learning.kanji.dto;

import com.japanese.learning.kanji.entity.KanjiCompound;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface KanjiCompoundMapper {

    KanjiCompoundResponse toResponse(KanjiCompound entity);
}
