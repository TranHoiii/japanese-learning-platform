import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import BeginnerLayout from "../components/BeginnerLayout";
import PracticeCard from "../components/PracticeCard";
import Badge from "../../../components/ui/Badge";
import { PRACTICE_MODES, getPracticeQuestions } from "../data/practice";
import { PracticeCategory } from "../types/practice";

const VALID_CATEGORIES: PracticeCategory[] = [
  "hiragana",
  "katakana",
  "pronunciation",
  "numbers",
  "mixed",
];

export const PracticePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const modeParam = searchParams.get("mode");

  const initialCategory: PracticeCategory =
    modeParam && VALID_CATEGORIES.includes(modeParam as PracticeCategory)
      ? (modeParam as PracticeCategory)
      : "hiragana";

  const [selectedCategory, setSelectedCategory] = useState<PracticeCategory>(initialCategory);
  const [sessionKey, setSessionKey] = useState(0);

  // Synchronize category state if URL query param changes externally
  useEffect(() => {
    const currentMode = searchParams.get("mode");
    if (currentMode && VALID_CATEGORIES.includes(currentMode as PracticeCategory)) {
      if (currentMode !== selectedCategory) {
        setSelectedCategory(currentMode as PracticeCategory);
        setSessionKey((prev) => prev + 1);
      }
    }
  }, [searchParams, selectedCategory]);

  const activeMode =
    PRACTICE_MODES.find((m) => m.id === selectedCategory) || PRACTICE_MODES[0];

  const questionsForMode = useMemo(() => {
    return getPracticeQuestions(selectedCategory);
  }, [selectedCategory, sessionKey]);

  const handleSelectCategory = (catId: PracticeCategory) => {
    setSelectedCategory(catId);
    setSearchParams({ mode: catId });
    setSessionKey((prev) => prev + 1);
  };

  const handleResetSession = () => {
    setSessionKey((prev) => prev + 1);
  };

  return (
    <BeginnerLayout
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Sơ cấp", href: "/beginner" },
        { label: "Luyện tập", href: "/beginner/practice", isCurrent: true },
      ]}
      title="Phòng Luyện Tập Tương Tác Sơ Cấp (Practice Hub)"
      subtitle="5 Chế độ thực hành phản xạ • Thử thách 60s hoặc Tự do"
      description="Rèn luyện phản xạ nhận diện mặt chữ Hiragana, Katakana, quy tắc trường âm/âm ngắt và tính toán số đếm. Kết quả chỉ lưu trong phiên học này, bạn có thể thực hành lại bao nhiêu lần tùy thích mà không lo áp lực điểm số."
    >
      {/* 5 Mode Selector Buttons */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-[#5A5246] block">
          Chọn chế độ luyện tập:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {PRACTICE_MODES.map((mode) => {
            const isSelected = selectedCategory === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleSelectCategory(mode.id)}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 hover:-translate-y-0.5 ${
                  isSelected
                    ? "bg-[#2F5496] text-white border-[#213960] shadow-md shadow-indigo-900/20"
                    : "bg-white text-[#433D34] border-[#E7E0D2] hover:bg-[#FAF7F1] hover:border-[#9A8F7E]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xl" aria-hidden="true">
                    {mode.icon}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-[#F3EEE5] text-[#766D5E]"
                    }`}
                  >
                    {mode.targetCount} câu
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold block leading-snug">
                    {mode.titleVi}
                  </span>
                  <span
                    className={`text-[10px] line-clamp-1 block opacity-85 ${
                      isSelected ? "text-white/90" : "text-[#766D5E]"
                    }`}
                  >
                    {mode.descriptionVi}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Philosophy Callout */}
      <div className="rounded-2xl bg-[#F0FDF4] border border-[#22C55E]/30 p-3.5 flex items-center justify-between gap-3 text-xs text-[#15803D]">
        <div className="flex items-center gap-2">
          <span className="text-base" aria-hidden="true">
            🌱
          </span>
          <span>
            <strong>Chế độ tự do:</strong> Không chấm điểm XP, không ảnh hưởng chuỗi học streak. Có thể bật hẹn giờ 60 giây hoặc luyện tập không giới hạn!
          </span>
        </div>
        <Badge variant="success" size="sm">
          {questionsForMode.length} câu trong bộ đề
        </Badge>
      </div>

      {/* Interactive Practice Session */}
      <div className="py-2">
        <PracticeCard
          key={`${selectedCategory}-${sessionKey}`}
          questions={questionsForMode}
          categoryTitle={activeMode.titleVi}
          onResetSession={handleResetSession}
          onChangeMode={() => handleSelectCategory("mixed")}
        />
      </div>
    </BeginnerLayout>
  );
};

export default PracticePage;
