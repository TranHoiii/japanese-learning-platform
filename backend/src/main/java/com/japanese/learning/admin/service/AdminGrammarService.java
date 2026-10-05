package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminGrammarExampleRequest;
import com.japanese.learning.admin.dto.AdminGrammarExampleResponse;
import com.japanese.learning.admin.dto.AdminGrammarRequest;
import com.japanese.learning.admin.dto.AdminGrammarResponse;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.grammar.entity.Grammar;
import com.japanese.learning.grammar.entity.GrammarExample;
import com.japanese.learning.grammar.repository.GrammarExampleRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminGrammarService {

    private final GrammarRepository grammarRepository;
    private final GrammarExampleRepository grammarExampleRepository;
    private final LessonRepository lessonRepository;
    private final LevelRepository levelRepository;

    @Transactional(readOnly = true)
    public List<AdminGrammarResponse> getGrammars(Long lessonId, Long levelId) {
        List<Grammar> grammars;
        if (lessonId != null) {
            if (!lessonRepository.existsById(lessonId)) {
                throw new ResourceNotFoundException("Không tìm thấy bài học với ID: " + lessonId);
            }
            grammars = grammarRepository.findByLessonIdOrderBySortOrderAsc(lessonId);
        } else if (levelId != null) {
            if (!levelRepository.existsById(levelId)) {
                throw new ResourceNotFoundException("Không tìm thấy cấp độ với ID: " + levelId);
            }
            grammars = grammarRepository.findByLevelIdOrderBySortOrderAsc(levelId);
        } else {
            grammars = grammarRepository.findAllByOrderBySortOrderAsc();
        }

        return grammars.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AdminGrammarResponse getGrammarById(Long id) {
        Grammar grammar = findGrammarById(id);
        return mapToResponse(grammar);
    }

    @Transactional
    public AdminGrammarResponse createGrammar(AdminGrammarRequest request) {
        Lesson lesson = lessonRepository.findById(request.lessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + request.lessonId()));

        Grammar grammar = new Grammar();
        grammar.setLesson(lesson);
        applyRequestToEntity(request, grammar);

        if (request.examples() != null && !request.examples().isEmpty()) {
            for (AdminGrammarExampleRequest exReq : request.examples()) {
                GrammarExample example = new GrammarExample();
                example.setGrammar(grammar);
                applyExampleRequestToEntity(exReq, example);
                grammar.getExamples().add(example);
            }
        }

        Grammar saved = grammarRepository.save(grammar);
        return mapToResponse(saved);
    }

    @Transactional
    public AdminGrammarResponse updateGrammar(Long id, AdminGrammarRequest request) {
        Grammar grammar = findGrammarById(id);

        Lesson lesson = lessonRepository.findById(request.lessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + request.lessonId()));

        grammar.setLesson(lesson);
        applyRequestToEntity(request, grammar);

        if (request.examples() != null) {
            grammar.getExamples().clear();
            for (AdminGrammarExampleRequest exReq : request.examples()) {
                GrammarExample example = new GrammarExample();
                example.setGrammar(grammar);
                applyExampleRequestToEntity(exReq, example);
                grammar.getExamples().add(example);
            }
        }

        Grammar updated = grammarRepository.save(grammar);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteGrammar(Long id) {
        Grammar grammar = findGrammarById(id);
        grammarRepository.delete(grammar);
    }

    // Nested examples management
    @Transactional(readOnly = true)
    public List<AdminGrammarExampleResponse> getExamples(Long grammarId) {
        if (!grammarRepository.existsById(grammarId)) {
            throw new ResourceNotFoundException("Không tìm thấy ngữ pháp với ID: " + grammarId);
        }
        return grammarExampleRepository.findByGrammarIdOrderBySortOrderAsc(grammarId).stream()
                .map(this::mapExampleToResponse)
                .toList();
    }

    @Transactional
    public AdminGrammarExampleResponse createExample(Long grammarId, AdminGrammarExampleRequest request) {
        Grammar grammar = findGrammarById(grammarId);

        GrammarExample example = new GrammarExample();
        example.setGrammar(grammar);
        applyExampleRequestToEntity(request, example);

        GrammarExample saved = grammarExampleRepository.save(example);
        return mapExampleToResponse(saved);
    }

    @Transactional
    public AdminGrammarExampleResponse updateExample(Long grammarId, Long exampleId, AdminGrammarExampleRequest request) {
        GrammarExample example = grammarExampleRepository.findById(exampleId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy ví dụ với ID: " + exampleId));

        if (!example.getGrammar().getId().equals(grammarId)) {
            throw new ResourceNotFoundException("Ví dụ ID: " + exampleId + " không thuộc ngữ pháp ID: " + grammarId);
        }

        applyExampleRequestToEntity(request, example);
        GrammarExample updated = grammarExampleRepository.save(example);
        return mapExampleToResponse(updated);
    }

    @Transactional
    public void deleteExample(Long grammarId, Long exampleId) {
        GrammarExample example = grammarExampleRepository.findById(exampleId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy ví dụ với ID: " + exampleId));

        if (!example.getGrammar().getId().equals(grammarId)) {
            throw new ResourceNotFoundException("Ví dụ ID: " + exampleId + " không thuộc ngữ pháp ID: " + grammarId);
        }

        grammarExampleRepository.delete(example);
    }

    private Grammar findGrammarById(Long id) {
        return grammarRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy ngữ pháp với ID: " + id));
    }

    private void applyRequestToEntity(AdminGrammarRequest request, Grammar grammar) {
        grammar.setPattern(request.pattern().trim());
        grammar.setMeaning(request.meaning() != null && !request.meaning().isBlank() ? request.meaning().trim() : null);
        grammar.setUsage(request.usage() != null && !request.usage().isBlank() ? request.usage().trim() : null);
        grammar.setExplanation(request.explanation() != null && !request.explanation().isBlank() ? request.explanation().trim() : null);
        grammar.setNotes(request.notes() != null && !request.notes().isBlank() ? request.notes().trim() : null);
        grammar.setSortOrder(request.sortOrder());
    }

    private void applyExampleRequestToEntity(AdminGrammarExampleRequest request, GrammarExample example) {
        example.setJapanese(request.japanese().trim());
        example.setFurigana(request.furigana() != null && !request.furigana().isBlank() ? request.furigana().trim() : null);
        example.setTranslation(request.translation() != null && !request.translation().isBlank() ? request.translation().trim() : null);
        example.setExplanation(request.explanation() != null && !request.explanation().isBlank() ? request.explanation().trim() : null);
        example.setSortOrder(request.sortOrder());
    }

    private AdminGrammarResponse mapToResponse(Grammar grammar) {
        String levelCode = (grammar.getLesson() != null && grammar.getLesson().getLevel() != null)
                ? grammar.getLesson().getLevel().getCode()
                : null;
        Integer lessonNumber = grammar.getLesson() != null ? grammar.getLesson().getLessonNumber() : null;

        List<AdminGrammarExampleResponse> examples = grammar.getExamples() != null
                ? grammar.getExamples().stream().map(this::mapExampleToResponse).toList()
                : new ArrayList<>();

        return new AdminGrammarResponse(
                grammar.getId(),
                grammar.getLesson().getId(),
                lessonNumber,
                levelCode,
                grammar.getPattern(),
                grammar.getMeaning(),
                grammar.getUsage(),
                grammar.getExplanation(),
                grammar.getNotes(),
                grammar.getSortOrder(),
                examples
        );
    }

    private AdminGrammarExampleResponse mapExampleToResponse(GrammarExample example) {
        return new AdminGrammarExampleResponse(
                example.getId(),
                example.getGrammar().getId(),
                example.getJapanese(),
                example.getFurigana(),
                example.getTranslation(),
                example.getExplanation(),
                example.getSortOrder()
        );
    }
}
