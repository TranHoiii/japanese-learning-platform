package com.japanese.learning.reading.repository;

import com.japanese.learning.reading.entity.ReadingOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReadingOptionRepository extends JpaRepository<ReadingOption, Long> {

    List<ReadingOption> findByQuestionIdOrderBySortOrderAsc(Long questionId);
}
