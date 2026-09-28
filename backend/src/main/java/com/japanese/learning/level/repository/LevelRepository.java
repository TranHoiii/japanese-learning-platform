package com.japanese.learning.level.repository;

import com.japanese.learning.lesson.entity.Level;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LevelRepository extends JpaRepository<Level, Long> {

    List<Level> findByActiveTrueOrderBySortOrderAsc();

    Optional<Level> findByCode(String code);
}