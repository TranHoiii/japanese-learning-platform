package com.japanese.learning.level.service;

import com.japanese.learning.level.dto.LevelResponse;

import java.util.List;

public interface LevelService {

    List<LevelResponse> getAllActiveLevels();

    LevelResponse getById(Long id);
}