package com.japanese.learning.grammar.repository;

import com.japanese.learning.grammar.entity.GrammarExample;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GrammarExampleRepository extends JpaRepository<GrammarExample, Long> {

    List<GrammarExample> findByGrammarIdOrderBySortOrderAsc(Long grammarId);
}
