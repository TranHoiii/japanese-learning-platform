import React, { useState, useMemo } from "react";
import { cn } from "../../../utils/cn";
import { KanaSystem, KanaCharacter } from "../types/kana";
import { PracticeQuestion } from "../types/practice";
import { getAllHiraganaCharacters } from "../data/hiragana";
import { getAllKatakanaCharacters } from "../data/katakana";
import { CONFUSED_HIRAGANA_PAIRS, CONFUSED_KATAKANA_PAIRS } from "../data/confusedKana";
import PracticeCard from "./PracticeCard";
import Button from "../../../components/ui/Button";

export interface KanaQuickPracticeProps {
  system: KanaSystem;
  className?: string;
}

export const KanaQuickPractice: React.FC<KanaQuickPracticeProps> = ({
  system,
  className,
}) => {
  const [practiceMode, setPracticeMode] = useState<
    "kana-to-romaji" | "romaji-to-kana" | "confused-pairs"
  >("kana-to-romaji");
  const [sessionKey, setSessionKey] = useState(0);

  // Generate dynamic questions based on real kana data
  const questions: PracticeQuestion[] = useMemo(() => {
    const allKana =
      system === "hiragana"
        ? getAllHiraganaCharacters().filter((c) => c.type === "seion")
        : getAllKatakanaCharacters().filter((c) => c.type === "seion");

    const confusedPairs =
      system === "hiragana" ? CONFUSED_HIRAGANA_PAIRS : CONFUSED_KATAKANA_PAIRS;

    if (practiceMode === "confused-pairs") {
      return confusedPairs.map((pair, idx) => ({
        id: `q-confused-${idx}-${sessionKey}`,
        category: system,
        type: "character-recognition",
        prompt: `Phân biệt hai chữ dễ nhầm: Chữ cái nào có cách đọc là '${pair.romajiA}'?`,
        promptHint: pair.distinctionVi,
        options: [
          { id: "opt-a", label: pair.charA, sublabel: `Phát âm: ${pair.romajiA}`, isCorrect: true },
          { id: "opt-b", label: pair.charB, sublabel: `Phát âm: ${pair.romajiB}`, isCorrect: false },
        ],
        explanationVi: `Chính xác! ${pair.charA} đọc là '${pair.romajiA}'. ${pair.memoryTipVi}`,
        audioUrl: null,
      }));
    }

    // Shuffle and pick 8 characters
    const shuffled = [...allKana].sort(() => 0.5 - Math.random()).slice(0, 8);

    if (practiceMode === "kana-to-romaji") {
      return shuffled.map((kana, idx) => {
        // pick 3 distractor romajis
        const distractors = allKana
          .filter((c) => c.id !== kana.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((c) => c.romaji);

        const options = [
          { id: "correct", label: kana.romaji, isCorrect: true },
          ...distractors.map((d, dIdx) => ({ id: `distractor-${dIdx}`, label: d, isCorrect: false })),
        ].sort(() => 0.5 - Math.random());

        return {
          id: `q-k2r-${idx}-${sessionKey}`,
          category: system,
          type: "character-recognition",
          prompt: `Chữ cái ${system === "hiragana" ? "Hiragana" : "Katakana"} sau đây đọc là gì?`,
          promptKana: kana.character,
          options,
          explanationVi: `Chữ ${kana.character} có cách đọc chuẩn là '${kana.romaji}'. ${kana.mnemonicVi || ""}`,
          audioUrl: kana.audioUrl,
        };
      });
    }

    // romaji-to-kana mode
    return shuffled.map((kana, idx) => {
      const distractors = allKana
        .filter((c) => c.id !== kana.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((c) => c.character);

      const options = [
        { id: "correct", label: kana.character, isCorrect: true },
        ...distractors.map((d, dIdx) => ({ id: `distractor-${dIdx}`, label: d, isCorrect: false })),
      ].sort(() => 0.5 - Math.random());

      return {
        id: `q-r2k-${idx}-${sessionKey}`,
        category: system,
        type: "romaji-to-kana",
        prompt: `Tìm chữ cái ${system === "hiragana" ? "Hiragana" : "Katakana"} tương ứng với âm đọc:`,
        promptRomaji: kana.romaji,
        options,
        explanationVi: `Âm đọc '${kana.romaji}' tương ứng với ký tự ${kana.character}.`,
        audioUrl: kana.audioUrl,
      };
    });
  }, [system, practiceMode, sessionKey]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Mode selection buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => {
              setPracticeMode("kana-to-romaji");
              setSessionKey((prev) => prev + 1);
            }}
            className={cn(
              "px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer",
              practiceMode === "kana-to-romaji"
                ? "bg-[#2684D9] text-white shadow-xs"
                : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]",
            )}
          >
            Nhìn Chữ → Chọn Romaji
          </button>

          <button
            type="button"
            onClick={() => {
              setPracticeMode("romaji-to-kana");
              setSessionKey((prev) => prev + 1);
            }}
            className={cn(
              "px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer",
              practiceMode === "romaji-to-kana"
                ? "bg-[#2684D9] text-white shadow-xs"
                : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]",
            )}
          >
            Nghe/Đọc Âm → Tìm Chữ
          </button>

          <button
            type="button"
            onClick={() => {
              setPracticeMode("confused-pairs");
              setSessionKey((prev) => prev + 1);
            }}
            className={cn(
              "px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer",
              practiceMode === "confused-pairs"
                ? "bg-[#2684D9] text-white shadow-xs"
                : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]",
            )}
          >
            Thử Thách Chữ Dễ Nhầm
          </button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setSessionKey((prev) => prev + 1)}
        >
          Trộn câu hỏi mới
        </Button>
      </div>

      {/* Practice Card Container */}
      <PracticeCard
        key={`${practiceMode}-${sessionKey}`}
        questions={questions}
        categoryTitle={
          practiceMode === "kana-to-romaji"
            ? `Luyện tập ${system === "hiragana" ? "Hiragana" : "Katakana"} (Nhìn chữ)`
            : practiceMode === "romaji-to-kana"
              ? `Luyện tập ${system === "hiragana" ? "Hiragana" : "Katakana"} (Tìm chữ)`
              : `Thử thách phân biệt cặp chữ dễ nhầm`
        }
        onResetSession={() => setSessionKey((prev) => prev + 1)}
      />
    </div>
  );
};

export default KanaQuickPractice;
