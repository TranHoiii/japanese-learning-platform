package com.japanese.learning.admin.service;

import com.japanese.learning.admin.dto.AdminKanjiRequest;
import com.japanese.learning.admin.dto.AdminKanjiResponse;
import com.japanese.learning.admin.dto.AdminLessonKanjiAssignRequest;
import com.japanese.learning.common.exception.DeleteConflictException;
import com.japanese.learning.common.exception.DuplicateResourceException;
import com.japanese.learning.common.exception.ResourceNotFoundException;
import com.japanese.learning.kanji.entity.Kanji;
import com.japanese.learning.kanji.entity.LessonKanji;
import com.japanese.learning.kanji.repository.KanjiRepository;
import com.japanese.learning.kanji.repository.LessonKanjiRepository;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.lesson.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminKanjiService {

    private final KanjiRepository kanjiRepository;
    private final LessonKanjiRepository lessonKanjiRepository;
    private final LessonRepository lessonRepository;

    @Transactional(readOnly = true)
    public List<AdminKanjiResponse> getAllKanjis() {
        return kanjiRepository.findAllByOrderByIdAsc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AdminKanjiResponse getKanjiById(Long id) {
        Kanji kanji = findKanjiById(id);
        return mapToResponse(kanji);
    }

    @Transactional
    public AdminKanjiResponse createKanji(AdminKanjiRequest request) {
        String kanjiChar = request.kanji().trim();
        if (kanjiRepository.existsByKanji(kanjiChar)) {
            throw new DuplicateResourceException("Chữ Hán '" + kanjiChar + "' đã tồn tại");
        }

        Kanji kanji = new Kanji();
        applyRequestToEntity(request, kanji);

        Kanji saved = kanjiRepository.save(kanji);
        return mapToResponse(saved);
    }

    @Transactional
    public AdminKanjiResponse updateKanji(Long id, AdminKanjiRequest request) {
        Kanji kanji = findKanjiById(id);
        String kanjiChar = request.kanji().trim();

        if (kanjiRepository.existsByKanjiAndIdNot(kanjiChar, id)) {
            throw new DuplicateResourceException("Chữ Hán '" + kanjiChar + "' đã tồn tại");
        }

        applyRequestToEntity(request, kanji);
        Kanji updated = kanjiRepository.save(kanji);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteKanji(Long id) {
        Kanji kanji = findKanjiById(id);

        if (lessonKanjiRepository.existsByKanjiId(id) || !kanji.getLessonKanjis().isEmpty()) {
            throw new DeleteConflictException("Không thể xóa chữ Hán này vì vẫn đang được gán vào bài học");
        }

        kanjiRepository.delete(kanji);
    }

    @Transactional
    public void assignKanjiToLesson(Long lessonId, Long kanjiId, AdminLessonKanjiAssignRequest request) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài học với ID: " + lessonId));

        Kanji kanji = findKanjiById(kanjiId);

        if (lessonKanjiRepository.existsByLessonIdAndKanjiId(lessonId, kanjiId)) {
            throw new DuplicateResourceException("Chữ Hán này đã được gán vào bài học");
        }

        LessonKanji lessonKanji = new LessonKanji();
        lessonKanji.setLesson(lesson);
        lessonKanji.setKanji(kanji);
        lessonKanji.setSortOrder(request != null && request.sortOrder() != null ? request.sortOrder() : 0);

        lessonKanjiRepository.save(lessonKanji);
    }

    @Transactional
    public void unassignKanjiFromLesson(Long lessonId, Long kanjiId) {
        if (!lessonRepository.existsById(lessonId)) {
            throw new ResourceNotFoundException("Không tìm thấy bài học với ID: " + lessonId);
        }
        if (!kanjiRepository.existsById(kanjiId)) {
            throw new ResourceNotFoundException("Không tìm thấy chữ Hán với ID: " + kanjiId);
        }

        LessonKanji lessonKanji = lessonKanjiRepository.findByLessonIdAndKanjiId(lessonId, kanjiId)
                .orElseThrow(() -> new ResourceNotFoundException("Chữ Hán này chưa được gán vào bài học"));

        lessonKanjiRepository.delete(lessonKanji);
    }

    private Kanji findKanjiById(Long id) {
        return kanjiRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy chữ Hán với ID: " + id));
    }

    private void applyRequestToEntity(AdminKanjiRequest request, Kanji kanji) {
        kanji.setKanji(request.kanji().trim());
        kanji.setHanViet(request.hanViet() != null && !request.hanViet().isBlank() ? request.hanViet().trim() : null);
        kanji.setOnyomi(request.onyomi() != null && !request.onyomi().isBlank() ? request.onyomi().trim() : null);
        kanji.setKunyomi(request.kunyomi() != null && !request.kunyomi().isBlank() ? request.kunyomi().trim() : null);
        kanji.setMeaning(request.meaning() != null && !request.meaning().isBlank() ? request.meaning().trim() : null);
        kanji.setStrokeCount(request.strokeCount());
        kanji.setStrokeOrderUrl(request.strokeOrderUrl() != null && !request.strokeOrderUrl().isBlank() ? request.strokeOrderUrl().trim() : null);
        kanji.setMnemonic(request.mnemonic() != null && !request.mnemonic().isBlank() ? request.mnemonic().trim() : null);
        kanji.setMnemonicImageUrl(request.mnemonicImageUrl() != null && !request.mnemonicImageUrl().isBlank() ? request.mnemonicImageUrl().trim() : null);
    }

    private AdminKanjiResponse mapToResponse(Kanji kanji) {
        List<Long> assignedLessonIds = kanji.getLessonKanjis() != null
                ? kanji.getLessonKanjis().stream().map(lk -> lk.getLesson().getId()).toList()
                : List.of();

        return new AdminKanjiResponse(
                kanji.getId(),
                kanji.getKanji(),
                kanji.getHanViet(),
                kanji.getOnyomi(),
                kanji.getKunyomi(),
                kanji.getMeaning(),
                kanji.getStrokeCount(),
                kanji.getStrokeOrderUrl(),
                kanji.getMnemonic(),
                kanji.getMnemonicImageUrl(),
                assignedLessonIds
        );
    }
}
