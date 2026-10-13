import React, { useState } from "react";
import { cn } from "../../../utils/cn";
import {
  SUPPORTED_COUNTERS,
  calculateCounter,
} from "../utils/counterCalculator";
import Badge from "../../../components/ui/Badge";

export interface CounterCalculatorProps {
  className?: string;
}

export const CounterCalculator: React.FC<CounterCalculatorProps> = ({ className }) => {
  const [selectedCounterId, setSelectedCounterId] = useState<string>("nin");
  const [count, setCount] = useState<number>(3);
  const [filterGroup, setFilterGroup] = useState<string>("all");

  const activeCounterDef =
    SUPPORTED_COUNTERS.find((c) => c.id === selectedCounterId) ||
    SUPPORTED_COUNTERS[0];

  const result = calculateCounter(count, selectedCounterId);

  const handleCountChange = (val: number) => {
    if (val >= 1 && val <= 99) {
      setCount(val);
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ja-JP";
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const filteredCounters = SUPPORTED_COUNTERS.filter((c) => {
    if (filterGroup === "all") return true;
    if (filterGroup === "living") return ["nin", "hiki"].includes(c.id);
    if (filterGroup === "objects") return ["tsu", "hon", "mai", "ko", "satsu", "dai", "hai"].includes(c.id);
    if (filterGroup === "time-space") return ["kai", "sai", "nichi"].includes(c.id);
    return true;
  });

  return (
    <div
      className={cn(
        "surface rounded-3xl p-5 sm:p-7 space-y-6 shadow-zen border border-[#E7E0D2]",
        className,
      )}
    >
      {/* Header bar */}
      <div className="flex items-start justify-between flex-wrap gap-3 pb-4 border-b border-[#F3EEE5]">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-700 font-black text-xl flex items-center justify-center" aria-hidden="true">
              📦
            </span>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#1F1C18]">
                Bộ Tính & Tra Cứu Lượng Từ Tương Tác (Counter Calculator)
              </h3>
              <p className="text-xs text-[#766D5E]">
                Chọn lượng từ và số lượng để tra cứu tức thì chữ Hán, phát âm chuẩn và nhận cảnh báo biến âm.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[#766D5E] font-medium hidden sm:inline">Phân loại:</span>
          {[
            { id: "all", label: "Tất cả (11)" },
            { id: "living", label: "Người & Vật" },
            { id: "objects", label: "Đồ vật" },
            { id: "time-space", label: "Tầng & Tuổi" },
          ].map((grp) => (
            <button
              key={grp.id}
              type="button"
              onClick={() => setFilterGroup(grp.id)}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer",
                filterGroup === grp.id
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "bg-white text-slate-600 border border-[#E7E0D2] hover:bg-[#FAF7F1]",
              )}
            >
              {grp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-column studio layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (6 cols): Counter & Stepper selection */}
        <div className="lg:col-span-6 space-y-5">
          {/* 1. Counter Selector Grid */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#766D5E] block">
              1. Chọn lượng từ cần đếm ({filteredCounters.length}):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredCounters.map((counter) => {
                const isSelected = selectedCounterId === counter.id;
                return (
                  <button
                    key={counter.id}
                    type="button"
                    onClick={() => setSelectedCounterId(counter.id)}
                    className={cn(
                      "p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-1 hover:border-[#2F5496]",
                      isSelected
                        ? "bg-[#2F5496] text-white border-[#213960] shadow-xs"
                        : "bg-white text-[#433D34] border-[#E7E0D2] hover:bg-[#FAF7F1]",
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={cn(
                          "font-extrabold font-japanese text-base",
                          isSelected ? "text-white" : "text-[#213960]",
                        )}
                        lang="ja"
                      >
                        {counter.kanji}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded-md font-bold",
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-[#F3EEE5] text-[#766D5E]",
                        )}
                      >
                        {counter.id}
                      </span>
                    </div>
                    <span className="text-xs leading-snug font-medium line-clamp-1 opacity-90">
                      {counter.nameVi.replace(/〜.*?\(/, "(")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Number Stepper & Quick Presets */}
          <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F1] border border-[#E7E0D2]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#766D5E] block">
              2. Chọn số lượng (1 - 99):
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border-2 border-[#D3CABA] rounded-2xl bg-white overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => handleCountChange(count - 1)}
                  disabled={count <= 1}
                  className="px-4 py-2.5 text-lg font-extrabold text-[#5A5246] hover:bg-[#F3EEE5] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  aria-label="Giảm 1"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={count}
                  onChange={(e) => handleCountChange(parseInt(e.target.value, 10) || 1)}
                  className="w-16 py-2 text-center text-lg font-black font-mono text-[#1F1C18] border-x-2 border-[#E7E0D2] focus:outline-hidden"
                  aria-label="Số lượng"
                />
                <button
                  type="button"
                  onClick={() => handleCountChange(count + 1)}
                  disabled={count >= 99}
                  className="px-4 py-2.5 text-lg font-extrabold text-[#5A5246] hover:bg-[#F3EEE5] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  aria-label="Tăng 1"
                >
                  +
                </button>
              </div>

              {/* Slider for smooth dragging */}
              <input
                type="range"
                min={1}
                max={30}
                value={Math.min(count, 30)}
                onChange={(e) => handleCountChange(parseInt(e.target.value, 10))}
                className="flex-1 accent-indigo-600 cursor-pointer"
                aria-label="Thanh trượt chọn số"
              />
            </div>

            {/* Quick Presets with irregular highlights */}
            <div className="pt-2">
              <span className="text-[10px] font-bold text-[#766D5E] uppercase block mb-1">
                Các mốc nhạy cảm hay biến âm:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar-x text-xs">
                {[1, 2, 3, 4, 6, 8, 10, 14, 20].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleCountChange(num)}
                    className={cn(
                      "w-8 h-8 rounded-xl border flex items-center justify-center font-bold font-mono transition-colors cursor-pointer text-xs shrink-0",
                      count === num
                        ? "bg-[#213960] text-white border-[#213960] shadow-2xs"
                        : [1, 3, 6, 8, 10].includes(num)
                          ? "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
                          : "bg-white text-[#5A5246] border-[#E7E0D2] hover:bg-[#FAF7F1]",
                    )}
                    title={[1, 3, 6, 8, 10].includes(num) ? `Số ${num} thường có biến âm` : undefined}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Result Display */}
        <div className="lg:col-span-6 space-y-4">
          {result ? (
            <div className="rounded-3xl bg-white border-2 border-indigo-100 p-5 sm:p-6 space-y-5 shadow-xs">
              {/* Header result row */}
              <div className="flex items-start justify-between flex-wrap gap-2 pb-4 border-b border-[#F3EEE5]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-4xl sm:text-5xl font-black font-japanese text-[#213960] tracking-wide"
                      lang="ja"
                    >
                      {result.kanji}
                    </span>
                    <button
                      type="button"
                      onClick={() => speakText(result.hiragana)}
                      className="p-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer text-base"
                      title="Phát âm"
                      aria-label="Phát âm tiếng Nhật"
                    >
                      🔊
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-lg sm:text-xl font-bold font-japanese text-[#2F5496]">
                    <span>{result.hiragana}</span>
                    <span className="text-xs text-[#9A8F7E]">•</span>
                    <span className="text-sm font-medium italic text-[#766D5E]">
                      {result.romaji}
                    </span>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1.5">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {result.meaningVi}
                  </span>
                  {result.isIrregular && (
                    <Badge variant="warning" size="sm">
                      ⚠️ Biến âm đặc biệt
                    </Badge>
                  )}
                </div>
              </div>

              {/* Context Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#FAF7F1] border border-[#E7E0D2] space-y-1">
                  <span className="font-bold text-[#1F1C18] block">
                    📋 Dùng đếm đối tượng:
                  </span>
                  <p className="text-[#5A5246] leading-relaxed">
                    {activeCounterDef.targetObjectsVi}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F1] border border-[#E7E0D2] space-y-1">
                  <span className="font-bold text-[#1F1C18] block">
                    ❓ Nghi vấn từ (Dùng để hỏi):
                  </span>
                  <p className="text-indigo-900 font-extrabold font-japanese text-sm leading-relaxed" lang="ja">
                    {activeCounterDef.questionWord}
                  </p>
                </div>
              </div>

              {/* Irregular Alert Callout */}
              {result.irregularReasonVi ? (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300 text-xs text-amber-950 leading-relaxed flex items-start gap-2.5 animate-pop">
                  <span className="text-base shrink-0 mt-0.5" aria-hidden="true">⚡</span>
                  <div>
                    <strong className="block font-bold text-amber-900 mb-0.5">Quy tắc biến âm tại số này:</strong>
                    {result.irregularReasonVi}
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-200 text-xs text-emerald-900 leading-relaxed flex items-center gap-2">
                  <span className="text-base" aria-hidden="true">✓</span>
                  <span>Trường hợp đọc theo quy tắc chuẩn, không xảy ra biến âm.</span>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-3xl bg-[#FAF7F1] border border-[#E7E0D2] p-8 text-center text-xs text-[#766D5E]">
              Chưa có dữ liệu cho số lượng này.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounterCalculator;
