package com.japanese.learning.kanji.dto;

import com.japanese.learning.kanji.entity.Kanji;
import com.japanese.learning.kanji.entity.LessonKanji;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {KanjiCompoundMapper.class})
public interface KanjiMapper {

    @Mapping(target = "levelCode", expression = "java(resolveLevelCode(entity))")
    @Mapping(target = "lessonNumber", expression = "java(resolveLessonNumber(entity))")
    KanjiResponse toResponse(Kanji entity);

    default String resolveLevelCode(Kanji kanji) {
        if (kanji == null || kanji.getLessonKanjis() == null || kanji.getLessonKanjis().isEmpty()) {
            return null;
        }
        LessonKanji lk = kanji.getLessonKanjis().get(0);
        if (lk.getLesson() != null && lk.getLesson().getLevel() != null) {
            return lk.getLesson().getLevel().getCode();
        }
        return null;
    }

    default Integer resolveLessonNumber(Kanji kanji) {
        if (kanji == null || kanji.getLessonKanjis() == null || kanji.getLessonKanjis().isEmpty()) {
            return null;
        }
        LessonKanji lk = kanji.getLessonKanjis().get(0);
        if (lk.getLesson() != null) {
            return lk.getLesson().getLessonNumber();
        }
        return null;
    }
}
