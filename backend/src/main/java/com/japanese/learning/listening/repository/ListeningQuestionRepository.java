package com.japanese.learning.listening.repository;

import com.japanese.learning.listening.entity.ListeningQuestion;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListeningQuestionRepository extends JpaRepository<ListeningQuestion, Long> {

    @EntityGraph(attributePaths = {"options"})
    List<ListeningQuestion> findByListeningIdOrderBySortOrderAsc(Long listeningId);
}
