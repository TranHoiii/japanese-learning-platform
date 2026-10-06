import React, { useState } from "react";
import BeginnerLayout from "../components/BeginnerLayout";
import PracticeCard from "../components/PracticeCard";
import Badge from "../../../components/ui/Badge";
import { PRACTICE_MODES, getPracticeQuestions } from "../data/practice";
import { PracticeCategory } from "../types/practice";

export const PracticePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PracticeCategory>("mixed");
  const [sessionKey, setSessionKey] = useState(0);

  const activeMode = PRACTICE_MODES.find((m) => m.id === selectedCategory) || PRACTICE_MODES[4];
  const questionsForMode = getPracticeQuestions(selectedCategory);

  const handleSelectCategory = (catId: PracticeCategory) => {
    setSelectedCategory(catId);
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
        <label className="text-xs font-semibold text-[#475569] block">
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
                className={`p-3 rounded-[12px] border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
                  isSelected
                    ? "bg-[#2684D9] text-white border-[#1D4ED8] shadow-xs"
                    : "bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#94A3B8]"
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
                        : "bg-[#F1F5F9] text-[#64748B]"
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
                      isSelected ? "text-white/90" : "text-[#64748B]"
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
      <div className="rounded-[12px] bg-[#F0FDF4] border border-[#22C55E]/30 p-3.5 flex items-center justify-between gap-3 text-xs text-[#15803D]">
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
          onChangeMode={() => setSelectedCategory("mixed")}
        />
      </div>
    </BeginnerLayout>
  );
};

export default PracticePage;
