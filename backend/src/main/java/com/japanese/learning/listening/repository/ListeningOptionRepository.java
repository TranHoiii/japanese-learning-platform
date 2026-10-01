package com.japanese.learning.listening.repository;

import com.japanese.learning.listening.entity.ListeningOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListeningOptionRepository extends JpaRepository<ListeningOption, Long> {

    List<ListeningOption> findByQuestionIdOrderBySortOrderAsc(Long questionId);
}
