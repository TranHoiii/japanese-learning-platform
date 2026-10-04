package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminLessonRequest;
import com.japanese.learning.admin.dto.AdminLessonResponse;
import com.japanese.learning.common.exception.DeleteConflictException;
import com.japanese.learning.common.exception.DuplicateResourceException;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.grammar.repository.GrammarRepository;
import com.japanese.learning.kanji.repository.LessonKanjiRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.entity.Level;
import com.japanese.learning.lesson.repository.LessonRepository;
import com.japanese.learning.level.repository.LevelRepository;
import com.japanese.learning.listening.repository.ListeningContentRepository;
import com.japanese.learning.reading.repository.ReadingContentRepository;
import com.japanese.learning.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminLessonService {

    private final LessonRepository lessonRepository;
    private final LevelRepository levelRepository;
    private final VocabularyRepository vocabularyRepository;
    private final GrammarRepository grammarRepository;
    private final LessonKanjiRepository lessonKanjiRepository;
    private final ListeningContentRepository listeningContentRepository;
    private final ReadingContentRepository readingContentRepository;
    private final ExerciseRepository exerciseRepository;

    @Transactional(readOnly = true)
    public List<AdminLessonResponse> getLessons(Long levelId) {
        if (levelId != null) {
            if (!levelRepository.existsById(levelId)) {
                throw new ResourceNotFoundException("Không tìm thấy cấp độ với ID: " + levelId);
            }
            return lessonRepository.findByLevelIdOrderBySortOrderAsc(levelId).stream()
                    .map(this::mapToResponse)
                    .toList();
        }
        return lessonRepository.findAllByOrderBySortOrderAsc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AdminLessonResponse getLessonById(Long id) {
        Lesson lesson = findLessonById(id);
        return mapToResponse(lesson);
    }

    @Transactional
    public AdminLessonResponse createLesson(AdminLessonRequest request) {
        Level level = levelRepository.findById(request.levelId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy cấp độ với ID: " + request.levelId()));

        if (lessonRepository.existsByLevelIdAndLessonNumber(request.levelId(), request.lessonNumber())) {
            throw new DuplicateResourceException(
                    "Bài học số " + request.lessonNumber() + " đã tồn tại trong cấp độ này"
            );
        }

        Lesson lesson = new Lesson();
        lesson.setLevel(level);
        lesson.setLessonNumber(request.lessonNumber());
        lesson.setTitle(request.title().trim());
        lesson.setDescription(request.description() != null ? request.description().trim() : null);
        lesson.setSortOrder(request.sortOrder());
        lesson.setActive(request.isActive() != null ? request.isActive() : true);

        Lesson saved = lessonRepository.save(lesson);
        return mapToResponse(saved);
    }

    @Transactional
    public AdminLessonResponse updateLesson(Long id, AdminLessonRequest request) {
        Lesson lesson = findLessonById(id);

        Level level = levelRepository.findById(request.levelId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy cấp độ với ID: " + request.levelId()));

        if (lessonRepository.existsByLevelIdAndLessonNumberAndIdNot(request.levelId(), request.lessonNumber(), id)) {
            throw new DuplicateResourceException(
                    "Bài học số " + request.lessonNumber() + " đã tồn tại trong cấp độ này"
            );
        }

        lesson.setLevel(level);
        lesson.setLessonNumber(request.lessonNumber());
        lesson.setTitle(request.title().trim());
        lesson.setDescription(request.description() != null ? request.description().trim() : null);
        lesson.setSortOrder(request.sortOrder());
        if (request.isActive() != null) {
            lesson.setActive(request.isActive());
        }

        Lesson updated = lessonRepository.save(lesson);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteLesson(Long id) {
        Lesson lesson = findLessonById(id);

        boolean hasVocabulary = vocabularyRepository.existsByLessonId(id) || !lesson.getVocabularies().isEmpty();
        boolean hasGrammar = grammarRepository.existsByLessonId(id) || !lesson.getGrammars().isEmpty();
        boolean hasKanji = lessonKanjiRepository.existsByLessonId(id) || !lesson.getLessonKanjis().isEmpty();
        boolean hasListening = listeningContentRepository.existsByLessonId(id) || !lesson.getListenings().isEmpty();
        boolean hasReading = readingContentRepository.existsByLessonId(id) || !lesson.getReadings().isEmpty();
        boolean hasExercise = exerciseRepository.existsByLessonId(id) || !lesson.getExercises().isEmpty();

        if (hasVocabulary || hasGrammar || hasKanji || hasListening || hasReading || hasExercise) {
            throw new DeleteConflictException(
                    "Không thể xóa bài học này vì vẫn còn nội dung liên kết (từ vựng, ngữ pháp, kanji, nghe, đọc, hoặc bài tập)"
            );
        }

        lessonRepository.delete(lesson);
    }

    private Lesson findLessonById(Long id) {
        return lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + id));
    }

    private AdminLessonResponse mapToResponse(Lesson lesson) {
        return new AdminLessonResponse(
                lesson.getId(),
                lesson.getLevel().getId(),
                lesson.getLevel().getCode(),
                lesson.getLessonNumber(),
                lesson.getTitle(),
                lesson.getDescription(),
                lesson.getSortOrder(),
                lesson.getActive()
        );
    }
}
