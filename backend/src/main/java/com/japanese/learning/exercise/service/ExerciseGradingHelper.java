package com.japanese.learning.exercise.service;

import com.japanese.learning.exercise.dto.BlankResponse;
import com.japanese.learning.exercise.dto.BlankResultResponse;
import com.japanese.learning.exercise.dto.ExerciseAnswerRequest;
import com.japanese.learning.exercise.dto.ExerciseQuestionResultResponse;
import com.japanese.learning.exercise.entity.Question;
import com.japanese.learning.exercise.entity.QuestionOption;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ExerciseGradingHelper {

    private static final Pattern SUB_QUESTION_PATTERN =
            Pattern.compile("^([0-9]+|[a-z])[\n\\)\\.：:]\\s*(.*)$", Pattern.CASE_INSENSITIVE);

    public ExerciseQuestionResultResponse gradeQuestion(Question question, ExerciseAnswerRequest userAns) {
        Long selectedOptionId = userAns != null ? userAns.getSelectedOptionId() : null;
        String userText = userAns != null ? userAns.getAnswerText() : null;
        List<BlankResponse> responses = userAns != null ? userAns.getResponses() : null;

        QuestionOption correctOption = question.getOptions() != null ? question.getOptions().stream()
                .filter(o -> Boolean.TRUE.equals(o.getCorrect()))
                .findFirst()
                .orElse(null) : null;

        Long correctOptionId = correctOption != null ? correctOption.getId() : null;
        String correctAnswerText = correctOption != null ? correctOption.getOptionText() : null;
        String explanation = question.getExplanation();

        // 1. Multiple Choice Option mode
        if (selectedOptionId != null || (question.getOptions() != null && !question.getOptions().isEmpty() && responses == null && (userText == null || userText.isBlank()))) {
            boolean isCorrect = false;
            if (selectedOptionId != null && correctOptionId != null) {
                isCorrect = selectedOptionId.equals(correctOptionId);
            }
            return ExerciseQuestionResultResponse.builder()
                    .questionId(question.getId())
                    .isCorrect(isCorrect)
                    .selectedOptionId(selectedOptionId)
                    .correctOptionId(correctOptionId)
                    .answerText(userText)
                    .correctAnswerText(correctAnswerText != null ? correctAnswerText : explanation)
                    .explanation(explanation)
                    .autoGraded(true)
                    .blankResults(Collections.emptyList())
                    .build();
        }

        // 2. Structured Blank Responses mode
        if (responses != null && !responses.isEmpty()) {
            Map<String, List<String>> parsedExplanation = parseExplanationTokens(explanation);
            List<BlankResultResponse> blankResults = new ArrayList<>();
            boolean allCorrect = true;
            boolean anyAutoGraded = false;

            // Map user responses by blankId
            Map<String, String> userResponsesMap = new LinkedHashMap<>();
            for (BlankResponse resp : responses) {
                if (resp.getBlankId() != null) {
                    userResponsesMap.put(resp.getBlankId().trim().toLowerCase(), resp.getValue() != null ? resp.getValue().trim() : "");
                }
            }

            // Grade based on parsed explanation tokens
            if (!parsedExplanation.isEmpty()) {
                for (Map.Entry<String, List<String>> entry : parsedExplanation.entrySet()) {
                    String subKey = entry.getKey();
                    List<String> expectedTokens = entry.getValue();

                    for (int tokenIdx = 0; tokenIdx < expectedTokens.size(); tokenIdx++) {
                        String rawExpected = expectedTokens.get(tokenIdx);
                        String candidateBlankId1 = subKey + "_" + tokenIdx;
                        String candidateBlankId2 = subKey + "-" + (tokenIdx + 1);
                        String candidateBlankId3 = subKey; // single blank shorthand

                        String userVal = null;
                        String matchedBlankId = candidateBlankId1;
                        if (userResponsesMap.containsKey(candidateBlankId1)) {
                            userVal = userResponsesMap.get(candidateBlankId1);
                            matchedBlankId = candidateBlankId1;
                        } else if (userResponsesMap.containsKey(candidateBlankId2)) {
                            userVal = userResponsesMap.get(candidateBlankId2);
                            matchedBlankId = candidateBlankId2;
                        } else if (tokenIdx == 0 && userResponsesMap.containsKey(candidateBlankId3)) {
                            userVal = userResponsesMap.get(candidateBlankId3);
                            matchedBlankId = candidateBlankId3;
                        } else {
                            // Check if user submitted blankId matching subKey
                            userVal = userResponsesMap.get(subKey);
                            matchedBlankId = (expectedTokens.size() > 1) ? subKey + "_" + tokenIdx : subKey;
                        }

                        boolean isOpenEnded = isOpenEndedAnswer(rawExpected);
                        boolean blankCorrect = false;

                        if (isOpenEnded) {
                            blankCorrect = (userVal != null && !userVal.isBlank());
                        } else {
                            anyAutoGraded = true;
                            if (userVal != null && !userVal.isBlank()) {
                                blankCorrect = checkAnswerMatch(userVal, rawExpected);
                            }
                        }

                        if (!blankCorrect && !isOpenEnded) {
                            allCorrect = false;
                        }

                        blankResults.add(BlankResultResponse.builder()
                                .blankId(matchedBlankId)
                                .isCorrect(blankCorrect)
                                .userAnswer(userVal)
                                .correctAnswer(cleanDisplayAnswer(rawExpected))
                                .autoGraded(!isOpenEnded)
                                .build());
                    }
                }
            } else {
                // If explanation is not split into numbered items, evaluate user responses against raw explanation
                for (Map.Entry<String, String> uEntry : userResponsesMap.entrySet()) {
                    String userVal = uEntry.getValue();
                    boolean match = (explanation != null) && checkAnswerMatch(userVal, explanation);
                    if (!match) {
                        allCorrect = false;
                    }
                    blankResults.add(BlankResultResponse.builder()
                            .blankId(uEntry.getKey())
                            .isCorrect(match)
                            .userAnswer(userVal)
                            .correctAnswer(cleanDisplayAnswer(explanation))
                            .autoGraded(true)
                            .build());
                }
            }

            boolean finalCorrect = anyAutoGraded ? allCorrect : true;

            return ExerciseQuestionResultResponse.builder()
                    .questionId(question.getId())
                    .isCorrect(finalCorrect)
                    .selectedOptionId(null)
                    .correctOptionId(correctOptionId)
                    .answerText(userText)
                    .correctAnswerText(correctAnswerText != null ? correctAnswerText : explanation)
                    .explanation(explanation)
                    .autoGraded(anyAutoGraded)
                    .blankResults(blankResults)
                    .build();
        }

        // 3. Fallback / Legacy single text answer
        boolean isCorrect = false;
        if (userText != null && !userText.trim().isEmpty()) {
            if (correctAnswerText != null && !correctAnswerText.trim().isEmpty()) {
                isCorrect = checkAnswerMatch(userText, correctAnswerText);
            } else if (explanation != null) {
                isCorrect = checkAnswerMatch(userText, explanation);
            }
        }

        return ExerciseQuestionResultResponse.builder()
                .questionId(question.getId())
                .isCorrect(isCorrect)
                .selectedOptionId(selectedOptionId)
                .correctOptionId(correctOptionId)
                .answerText(userText)
                .correctAnswerText(correctAnswerText != null ? correctAnswerText : explanation)
                .explanation(explanation)
                .autoGraded(true)
                .blankResults(Collections.emptyList())
                .build();
    }

    public Map<String, List<String>> parseExplanationTokens(String explanation) {
        if (explanation == null || explanation.isBlank()) {
            return Collections.emptyMap();
        }

        Map<String, List<String>> results = new LinkedHashMap<>();
        String[] lines = explanation.split("\\r?\\n");

        for (String rawLine : lines) {
            String line = rawLine.trim();
            if (line.isBlank() || line.startsWith("Đáp án") || line.startsWith("Giải thích")) {
                continue;
            }

            Matcher matcher = SUB_QUESTION_PATTERN.matcher(line);
            if (matcher.find()) {
                String subKey = matcher.group(1).toLowerCase();
                String content = matcher.group(2).trim();

                List<String> tokens = splitContentTokens(content);
                if (!tokens.isEmpty()) {
                    results.put(subKey, tokens);
                }
            }
        }

        return results;
    }

    private List<String> splitContentTokens(String content) {
        List<String> tokens = new ArrayList<>();
        // Strip explanations like "(tần suất: に...)" or "(ngày 20...)"
        String cleaned = content.replaceAll("[\\(（][^\\)）]*[\\)）]", "").trim();
        // Strip leading labels like "93,648: "
        cleaned = cleaned.replaceAll("^[0-9a-zA-Z,.:]+\\s*:\\s*", "").trim();

        // Split by comma: ',' or '、' or '，'
        // But do not split alternative answers with '／' or '/'
        String[] parts = cleaned.split("[,，、]\\s*");
        for (String part : parts) {
            String p = part.trim();
            if (!p.isEmpty()) {
                tokens.add(p);
            }
        }
        if (tokens.isEmpty() && !content.isBlank()) {
            tokens.add(content.trim());
        }
        return tokens;
    }

    public boolean checkAnswerMatch(String userAnswer, String rawExpected) {
        if (userAnswer == null || rawExpected == null) {
            return false;
        }

        String userNormalized = normalizeJapanese(userAnswer);
        if (userNormalized.isEmpty()) {
            return false;
        }

        // Expected might contain alternatives separated by '／' or '/' or ' hoặc '
        String[] alternatives = rawExpected.split("[／/]|(\\s+hoặc\\s+)");
        for (String alt : alternatives) {
            String cleanAlt = alt.replaceAll("[\\(（][^\\)）]*[\\)）]", "").trim();
            // Handle optional brackets like "[へ]も" -> matches "へも" or "も"
            if (cleanAlt.contains("[") && cleanAlt.contains("]")) {
                String optionWith = cleanAlt.replace("[", "").replace("]", "");
                String optionWithout = cleanAlt.replaceAll("\\[[^\\]]*\\]", "");
                if (userNormalized.equalsIgnoreCase(normalizeJapanese(optionWith)) ||
                        userNormalized.equalsIgnoreCase(normalizeJapanese(optionWithout))) {
                    return true;
                }
            }

            String expectedNormalized = normalizeJapanese(cleanAlt);
            if (userNormalized.equalsIgnoreCase(expectedNormalized)) {
                return true;
            }
        }

        return false;
    }

    public String normalizeJapanese(String text) {
        if (text == null) return "";
        return text.trim()
                .replaceAll("\\s+", "")
                .replaceAll("[。\\.\\!\\?！？、,]+$", "")
                .replaceAll("^[。\\.\\!\\?！？、,]+", "");
    }

    public boolean isOpenEndedAnswer(String expected) {
        if (expected == null) return false;
        String trimmed = expected.trim();
        return trimmed.startsWith("例:") ||
                trimmed.startsWith("例：") ||
                trimmed.contains("○○") ||
                trimmed.contains("...") ||
                trimmed.contains("…");
    }

    public String cleanDisplayAnswer(String expected) {
        if (expected == null) return "";
        return expected.trim()
                .replaceAll("^[0-9a-zA-Z]+[\\)\\.：:]\\s*", "")
                .trim();
    }
}
