package com.japanese.learning.listening.dto;

import com.japanese.learning.listening.entity.ListeningOption;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ListeningOptionMapper {

    ListeningOptionResponse toResponse(ListeningOption entity);
}
