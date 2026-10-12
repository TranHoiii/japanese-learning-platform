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

  const activeCounterDef =
    SUPPORTED_COUNTERS.find((c) => c.id === selectedCounterId) ||
    SUPPORTED_COUNTERS[0];

  const result = calculateCounter(count, selectedCounterId);

  const handleCountChange = (val: number) => {
    if (val >= 1 && val <= 99) {
      setCount(val);
    }
  };

  return (
    <div
      className={cn(
        "rounded-[16px] bg-gradient-to-br from-white to-[#FAF7F1] border border-[#D3CABA] p-5 sm:p-6 space-y-6 shadow-xs",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-2 pb-3 border-b border-[#F3EEE5]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              📦
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#1F1C18]">
              Bộ Tính Lượng Từ Tương Tác (Counter Calculator)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#5A5246] leading-relaxed">
            Chọn một lượng từ và số lượng để tra cứu tức thì cách phát âm, chữ Hán và nhận cảnh báo biến âm đặc biệt.
          </p>
        </div>
      </div>

      {/* Counter Selector Pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#5A5246] block">
          1. Chọn lượng từ cần đếm:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {SUPPORTED_COUNTERS.map((counter) => {
            const isSelected = selectedCounterId === counter.id;
            return (
              <button
                key={counter.id}
                type="button"
                onClick={() => setSelectedCounterId(counter.id)}
                className={cn(
                  "p-2.5 rounded-[10px] border text-left transition-all cursor-pointer flex flex-col items-start gap-0.5",
                  isSelected
                    ? "bg-[#2F5496] text-white border-[#1D4ED8] shadow-xs"
                    : "bg-white text-[#433D34] border-[#E7E0D2] hover:bg-[#FAF7F1] hover:border-[#9A8F7E]",
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={cn(
                      "font-bold font-japanese text-sm",
                      isSelected ? "text-white" : "text-[#213960]",
                    )}
                  >
                    {counter.kanji}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded font-medium",
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-[#F3EEE5] text-[#766D5E]",
                    )}
                  >
                    {counter.id}
                  </span>
                </div>
                <span className="text-[11px] leading-tight font-medium opacity-90 line-clamp-1">
                  {counter.nameVi.replace(/〜.*?\(/, "(")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Number Controls */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#5A5246] block">
          2. Chọn số lượng (1 đến 99):
        </label>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Quick Counter Stepper */}
          <div className="flex items-center border border-[#D3CABA] rounded-[10px] bg-white overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => handleCountChange(count - 1)}
              disabled={count <= 1}
              className="px-3 py-2 text-base font-bold text-[#5A5246] hover:bg-[#F3EEE5] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              aria-label="Giảm 1 đơn vị"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={99}
              value={count}
              onChange={(e) => handleCountChange(parseInt(e.target.value, 10) || 1)}
              className="w-16 py-2 text-center text-base font-bold font-mono text-[#1F1C18] border-x border-[#E7E0D2] focus:outline-hidden"
              aria-label="Số lượng"
            />
            <button
              type="button"
              onClick={() => handleCountChange(count + 1)}
              disabled={count >= 99}
              className="px-3 py-2 text-base font-bold text-[#5A5246] hover:bg-[#F3EEE5] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              aria-label="Tăng 1 đơn vị"
            >
              +
            </button>
          </div>

          {/* Quick Number Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 custom-scrollbar-x text-xs">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 20].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleCountChange(num)}
                className={cn(
                  "w-8 h-8 rounded-full border flex items-center justify-center font-bold font-mono transition-colors cursor-pointer text-xs",
                  count === num
                    ? "bg-[#1E40AF] text-white border-[#1E40AF]"
                    : "bg-white text-[#5A5246] border-[#E7E0D2] hover:bg-[#FAF7F1]",
                )}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculated Result Card */}
      {result ? (
        <div className="rounded-[14px] bg-white border border-[#BDD0EC] p-4 sm:p-5 space-y-4 shadow-xs">
          <div className="flex items-start justify-between flex-wrap gap-2 pb-3 border-b border-[#F3EEE5]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="text-3xl sm:text-4xl font-bold font-japanese text-[#213960]"
                  lang="ja"
                >
                  {result.kanji}
                </span>
                {result.isIrregular && (
                  <Badge variant="warning" size="sm">
                    ⚠️ Biến âm / Bất quy tắc
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-base sm:text-lg font-bold font-japanese text-[#2F5496]">
                <span>{result.hiragana}</span>
                <span className="text-xs text-[#9A8F7E]">•</span>
                <span className="text-sm font-normal italic text-[#766D5E]">
                  {result.romaji}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]">
                {result.meaningVi}
              </span>
            </div>
          </div>

          {/* Context Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-[10px] bg-[#FAF7F1] border border-[#E7E0D2] space-y-1">
              <span className="font-semibold text-[#1F1C18] block">
                📋 Đối tượng sử dụng:
              </span>
              <p className="text-[#5A5246] leading-relaxed">
                {activeCounterDef.targetObjectsVi}
              </p>
            </div>

            <div className="p-3 rounded-[10px] bg-[#FAF7F1] border border-[#E7E0D2] space-y-1">
              <span className="font-semibold text-[#1F1C18] block">
                ❓ Từ để hỏi (Nghi vấn từ):
              </span>
              <p className="text-[#2F5496] font-bold font-japanese leading-relaxed">
                {activeCounterDef.questionWord}
              </p>
            </div>
          </div>

          {/* Irregular Alert if present */}
          {result.irregularReasonVi && (
            <div className="p-3 rounded-[10px] bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] leading-relaxed flex items-start gap-2">
              <span className="shrink-0" aria-hidden="true">💡</span>
              <p>
                <strong>Lưu ý biến âm:</strong> {result.irregularReasonVi}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-[12px] bg-[#FAF7F1] border border-[#E7E0D2] p-4 text-xs text-[#766D5E] text-center">
          Chưa có dữ liệu cho trường hợp này.
        </div>
      )}
    </div>
  );
};

export default CounterCalculator;
