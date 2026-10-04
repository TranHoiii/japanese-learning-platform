package com.japanese.learning.reading.dto;

import com.japanese.learning.reading.entity.ReadingOption;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReadingOptionMapper {

    ReadingOptionResponse toResponse(ReadingOption entity);
}
