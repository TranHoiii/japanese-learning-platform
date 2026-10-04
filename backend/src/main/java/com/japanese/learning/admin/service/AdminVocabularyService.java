package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminVocabularyRequest;
import com.japanese.learning.admin.dto.AdminVocabularyResponse;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import com.japanese.learning.vocabulary.entity.Vocabulary;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminVocabularyService {

    private final VocabularyRepository vocabularyRepository;
    private final LessonRepository lessonRepository;
    private final LevelRepository levelRepository;

    @Transactional(readOnly = true)
    public List<AdminVocabularyResponse> getVocabularies(Long lessonId, Long levelId) {
        if (lessonId != null) {
            if (!lessonRepository.existsById(lessonId)) {
                throw new ResourceNotFoundException("Không tìm thấy bài học với ID: " + lessonId);
            }
            return vocabularyRepository.findByLessonIdOrderByIdAsc(lessonId).stream()
                    .map(this::mapToResponse)
                    .toList();
        }

        if (levelId != null) {
            if (!levelRepository.existsById(levelId)) {
                throw new ResourceNotFoundException("Không tìm thấy cấp độ với ID: " + levelId);
            }
            return vocabularyRepository.findByLevelIdOrderByIdAsc(levelId).stream()
                    .map(this::mapToResponse)
                    .toList();
        }

        return vocabularyRepository.findAllByOrderByIdAsc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AdminVocabularyResponse getVocabularyById(Long id) {
        Vocabulary vocabulary = findVocabularyById(id);
        return mapToResponse(vocabulary);
    }

    @Transactional
    public AdminVocabularyResponse createVocabulary(AdminVocabularyRequest request) {
        Lesson lesson = lessonRepository.findById(request.lessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + request.lessonId()));

        Vocabulary vocabulary = new Vocabulary();
        vocabulary.setLesson(lesson);
        applyRequestToEntity(request, vocabulary);

        Vocabulary saved = vocabularyRepository.save(vocabulary);
        return mapToResponse(saved);
    }

    @Transactional
    public AdminVocabularyResponse updateVocabulary(Long id, AdminVocabularyRequest request) {
        Vocabulary vocabulary = findVocabularyById(id);

        Lesson lesson = lessonRepository.findById(request.lessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + request.lessonId()));

        vocabulary.setLesson(lesson);
        applyRequestToEntity(request, vocabulary);

        Vocabulary updated = vocabularyRepository.save(vocabulary);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteVocabulary(Long id) {
        Vocabulary vocabulary = findVocabularyById(id);
        vocabularyRepository.delete(vocabulary);
    }

    private Vocabulary findVocabularyById(Long id) {
        return vocabularyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy từ vựng với ID: " + id));
    }

    private void applyRequestToEntity(AdminVocabularyRequest request, Vocabulary vocabulary) {
        vocabulary.setHiragana(request.hiragana().trim());
        vocabulary.setKanji(request.kanji() != null && !request.kanji().isBlank() ? request.kanji().trim() : null);
        vocabulary.setHanViet(request.hanViet() != null && !request.hanViet().isBlank() ? request.hanViet().trim() : null);
        vocabulary.setMeaning(request.meaning().trim());
        vocabulary.setPartOfSpeech(request.partOfSpeech() != null && !request.partOfSpeech().isBlank() ? request.partOfSpeech().trim() : null);
        vocabulary.setAudioUrl(request.audioUrl() != null && !request.audioUrl().isBlank() ? request.audioUrl().trim() : null);
        vocabulary.setNotes(request.notes() != null && !request.notes().isBlank() ? request.notes().trim() : null);
    }

    private AdminVocabularyResponse mapToResponse(Vocabulary vocabulary) {
        String levelCode = (vocabulary.getLesson() != null && vocabulary.getLesson().getLevel() != null)
                ? vocabulary.getLesson().getLevel().getCode()
                : null;
        Integer lessonNumber = vocabulary.getLesson() != null ? vocabulary.getLesson().getLessonNumber() : null;

        return new AdminVocabularyResponse(
                vocabulary.getId(),
                vocabulary.getLesson().getId(),
                lessonNumber,
                levelCode,
                vocabulary.getHiragana(),
                vocabulary.getKanji(),
                vocabulary.getHanViet(),
                vocabulary.getMeaning(),
                vocabulary.getPartOfSpeech(),
                vocabulary.getAudioUrl(),
                vocabulary.getNotes()
        );
    }
}
