package com.japanese.learning.exercise.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.japanese.learning.exercise.dto.ExerciseMapper;
import com.japanese.learning.exercise.dto.ExerciseResponse;
import com.japanese.learning.exercise.dto.QuestionMapper;
import com.japanese.learning.exercise.entity.Exercise;
import com.japanese.learning.exercise.entity.Question;
import com.japanese.learning.exercise.enums.ExerciseType;
import com.japanese.learning.exercise.repository.ExerciseRepository;
import com.japanese.learning.exercise.repository.QuestionRepository;
import com.japanese.learning.lesson.entity.Lesson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mapstruct.factory.Mappers;

import java.io.InputStream;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExerciseServiceTest {

    @Mock
    private ExerciseRepository exerciseRepository;

    @Mock
    private QuestionRepository questionRepository;

    private final ExerciseMapper exerciseMapper = Mappers.getMapper(ExerciseMapper.class);
    private final QuestionMapper questionMapper = Mappers.getMapper(QuestionMapper.class);

    @Test
    @DisplayName("TEST 1 & 3: GET danh sách Exercise trả về đúng 27 bài theo Business Sort Order 1 -> 27")
    void testGetAllExercises_StrictBusinessSortOrder() {
        ExerciseServiceImpl service = new ExerciseServiceImpl(exerciseRepository, questionRepository, exerciseMapper, questionMapper);

        List<Exercise> mockExercises = new ArrayList<>();
        String[] titles = new String[]{
                "Bài 01–02", "Bài 03", "Bài 04", "Bài 05", "Bài 06", "Bài 07", "Bài 08",
                "Tổng hợp Bài 01–08",
                "Bài 09", "Bài 10", "Bài 11", "Bài 12", "Bài 13", "Bài 14", "Bài 15", "Bài 16", "Bài 17",
                "Tổng hợp Bài 09–17",
                "Bài 18", "Bài 19", "Bài 20", "Bài 21", "Bài 22", "Bài 23", "Bài 24", "Bài 25",
                "Tổng hợp Bài 18–25"
        };

        for (int i = 0; i < 27; i++) {
            Exercise ex = new Exercise();
            ex.setId((long) (i + 100)); // DB ID does not match sort order
            ex.setSortOrder(i + 1);
            ex.setTitle(titles[i]);
            ex.setExerciseType((i == 7 || i == 17 || i == 26) ? ExerciseType.REVIEW : ExerciseType.LESSON);

            Lesson lesson = new Lesson();
            lesson.setId((long) (30 - i)); // Lesson ID is deliberately inverse to verify sort_order supremacy
            ex.setLesson(lesson);

            mockExercises.add(ex);
        }

        when(exerciseRepository.findAllByOrderBySortOrderAsc()).thenReturn(mockExercises);

        List<ExerciseResponse> result = service.getAllExercises();

        assertEquals(27, result.size());

        // Verify exact sort orders 1 to 27
        for (int i = 0; i < 27; i++) {
            assertEquals(i + 1, result.get(i).getSortOrder());
            assertEquals(titles[i], result.get(i).getTitle());
        }

        // Test 1 & 3 checks
        assertEquals("Bài 01–02", result.get(0).getTitle());
        assertEquals(1, result.get(0).getSortOrder());
        assertEquals(ExerciseType.LESSON, result.get(0).getExerciseType());

        assertEquals("Tổng hợp Bài 01–08", result.get(7).getTitle());
        assertEquals(8, result.get(7).getSortOrder());
        assertEquals(ExerciseType.REVIEW, result.get(7).getExerciseType());

        assertEquals("Tổng hợp Bài 09–17", result.get(17).getTitle());
        assertEquals(18, result.get(17).getSortOrder());
        assertEquals(ExerciseType.REVIEW, result.get(17).getExerciseType());

        assertEquals("Tổng hợp Bài 18–25", result.get(26).getTitle());
        assertEquals(27, result.get(26).getSortOrder());
        assertEquals(ExerciseType.REVIEW, result.get(26).getExerciseType());
    }

    @Test
    @DisplayName("TEST 2: Kiểm tra Exercise Bài 01–02 là 1 bài duy nhất, không có Bài 01 riêng hay Bài 02 riêng")
    void testExercise01_02IsSingleAndMerged() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream is = getClass().getResourceAsStream("/data/n5-exercise.json");
        assertNotNull(is, "File n5-exercise.json phải tồn tại trong resources/data");

        List<Map<String, Object>> seedData = mapper.readValue(is, new TypeReference<>() {});
        assertEquals(27, seedData.size(), "Phải có đúng 27 bài tập chính thức");

        boolean hasBai01Alone = seedData.stream().anyMatch(e -> "Bài 01".equals(e.get("title")));
        boolean hasBai02Alone = seedData.stream().anyMatch(e -> "Bài 02".equals(e.get("title")));
        boolean hasMerged0102 = seedData.stream().anyMatch(e -> "Bài 01–02".equals(e.get("title")));

        assertFalse(hasBai01Alone, "Không được có Exercise Bài 01 riêng biệt");
        assertFalse(hasBai02Alone, "Không được có Exercise Bài 02 riêng biệt");
        assertTrue(hasMerged0102, "Phải có Exercise Bài 01–02 gộp chung");

        // Verify sortOrder of Bài 01-02 is 1
        Map<String, Object> firstExercise = seedData.get(0);
        assertEquals("Bài 01–02", firstExercise.get("title"));
        assertEquals(1, firstExercise.get("sortOrder"));
        assertEquals("LESSON", firstExercise.get("exerciseType"));
    }

    @Test
    @DisplayName("TEST 4: Thứ tự Exercise KHÔNG bị chi phối bởi lesson_id")
    void testLessonIdDoesNotControlExerciseOrder() {
        ExerciseServiceImpl service = new ExerciseServiceImpl(exerciseRepository, questionRepository, exerciseMapper, questionMapper);

        Exercise ex1 = new Exercise();
        ex1.setId(50L);
        ex1.setSortOrder(1);
        ex1.setTitle("Bài 01–02");
        Lesson l1 = new Lesson();
        l1.setId(999L); // Arbitrary large lesson ID
        ex1.setLesson(l1);

        Exercise ex2 = new Exercise();
        ex2.setId(10L);
        ex2.setSortOrder(2);
        ex2.setTitle("Bài 03");
        Lesson l2 = new Lesson();
        l2.setId(1L); // Small lesson ID
        ex2.setLesson(l2);

        // Even though ex1 has lesson_id=999 and ex2 has lesson_id=1,
        // findAllByOrderBySortOrderAsc() returns ex1 first because sort_order=1 < sort_order=2
        when(exerciseRepository.findAllByOrderBySortOrderAsc()).thenReturn(List.of(ex1, ex2));

        List<ExerciseResponse> result = service.getAllExercises();
        assertEquals(1, result.get(0).getSortOrder());
        assertEquals("Bài 01–02", result.get(0).getTitle());
        assertEquals(2, result.get(1).getSortOrder());
        assertEquals("Bài 03", result.get(1).getTitle());
    }

    @Test
    @DisplayName("TEST 5: Question giữ đúng thứ tự sort_order bên trong Exercise")
    void testQuestionsRetainSortOrder() {
        ExerciseServiceImpl service = new ExerciseServiceImpl(exerciseRepository, questionRepository, exerciseMapper, questionMapper);

        Long exerciseId = 1L;
        when(exerciseRepository.existsById(exerciseId)).thenReturn(true);

        List<Question> mockQuestions = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            Question q = new Question();
            q.setId((long) (100 - i)); // ID is backwards
            q.setSortOrder(i);
            q.setQuestionText("Câu hỏi số " + i);
            mockQuestions.add(q);
        }

        when(questionRepository.findByExerciseIdOrderBySortOrderAsc(exerciseId)).thenReturn(mockQuestions);

        var questions = service.getQuestionsByExerciseId(exerciseId);
        assertEquals(5, questions.size());
        for (int i = 0; i < 5; i++) {
            assertEquals(i + 1, questions.get(i).getSortOrder());
            assertEquals("Câu hỏi số " + (i + 1), questions.get(i).getQuestionText());
        }
    }

    @Test
    @DisplayName("VALIDATION TOÀN DIỆN: 27 bài tập trong n5-exercise.json tuân thủ 100% Business Rules")
    void testN5ExerciseJsonIntegrity() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream is = getClass().getResourceAsStream("/data/n5-exercise.json");
        assertNotNull(is);

        List<Map<String, Object>> exercises = mapper.readValue(is, new TypeReference<>() {});
        assertEquals(27, exercises.size());

        Set<Integer> sortOrders = new HashSet<>();

        for (int i = 0; i < 27; i++) {
            Map<String, Object> ex = exercises.get(i);
            int sortOrder = (Integer) ex.get("sortOrder");
            assertNotNull(sortOrder, "sortOrder không được null");
            assertFalse(sortOrders.contains(sortOrder), "sortOrder không được trùng lặp: " + sortOrder);
            sortOrders.add(sortOrder);

            assertEquals(i + 1, sortOrder, "Exercise tại index " + i + " phải có sortOrder = " + (i + 1));

            // Verify Review positions
            if (sortOrder == 8) {
                assertEquals("Tổng hợp Bài 01–08", ex.get("title"));
                assertEquals("REVIEW", ex.get("exerciseType"));
            } else if (sortOrder == 18) {
                assertEquals("Tổng hợp Bài 09–17", ex.get("title"));
                assertEquals("REVIEW", ex.get("exerciseType"));
            } else if (sortOrder == 27) {
                assertEquals("Tổng hợp Bài 18–25", ex.get("title"));
                assertEquals("REVIEW", ex.get("exerciseType"));
            } else {
                assertEquals("LESSON", ex.get("exerciseType"));
            }

            // Verify questions
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> questions = (List<Map<String, Object>>) ex.get("questions");
            assertNotNull(questions);
            assertTrue(questions.size() > 0, "Mỗi bài tập phải có ít nhất 1 câu hỏi từ file PDF gốc");

            for (int qIdx = 0; qIdx < questions.size(); qIdx++) {
                Map<String, Object> q = questions.get(qIdx);
                assertEquals(qIdx + 1, q.get("sortOrder"), "Question sortOrder phải liên tục bắt đầu từ 1");
                assertNotNull(q.get("questionText"));
                assertNotNull(q.get("questionType"));
            }
        }
    }
}
