package com.japanese.learning.grammar.service;

import com.japanese.learning.grammar.dto.GrammarExampleResponse;
import com.japanese.learning.grammar.dto.GrammarResponse;

import java.util.List;

public interface GrammarService {

    GrammarResponse getById(Long id);

    List<GrammarResponse> getByLessonId(Long lessonId);

    List<GrammarExampleResponse> getExamplesByGrammarId(Long grammarId);
}
