import React, { useState } from "react";
import { cn } from "../../../utils/cn";
import { convertArabicToJapanese } from "../utils/numberConverter";
import Button from "../../../components/ui/Button";

export interface NumberBuilderProps {
  className?: string;
}

const PRESET_NUMBERS = [
  { label: "12", val: 12 },
  { label: "300 (Biến âm)", val: 300 },
  { label: "600 (Biến âm)", val: 600 },
  { label: "800 (Biến âm)", val: 800 },
  { label: "3.000 (Biến âm)", val: 3000 },
  { label: "8.000 (Biến âm)", val: 8000 },
  { label: "10.000 (1 Vạn)", val: 10000 },
  { label: "12.345", val: 12345 },
  { label: "1.000.000 (100 Vạn)", val: 1000000 },
  { label: "100.000.000 (1 Ức)", val: 100000000 },
];

export const NumberBuilder: React.FC<NumberBuilderProps> = ({ className }) => {
  const [inputValue, setInputValue] = useState<string>("12345");

  const num = parseInt(inputValue.replace(/\D/g, ""), 10);
  const result = !isNaN(num) ? convertArabicToJapanese(num) : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 9) {
      setInputValue(raw);
    }
  };

  return (
    <div
      className={cn(
        "rounded-[16px] bg-gradient-to-br from-white to-[#F8FAFC] border border-[#CBD5E1] p-5 sm:p-6 space-y-6 shadow-xs",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-2 pb-3 border-b border-[#F1F5F9]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              🧮
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
              Công Cụ Ghép & Tra Cứu Số Tự Động (Number Builder)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            Nhập bất kỳ con số nào từ <strong>0 đến 999.999.999</strong> để xem ngay cách đọc Kanji, Hiragana, Romaji và phân tích cấu trúc từng hàng cơ số 万 (10.000).
          </p>
        </div>
      </div>

      {/* Input & Preset Buttons */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Nhập số từ 0 đến 999999999..."
              className="w-full px-4 py-2.5 rounded-[10px] border border-[#CBD5E1] text-base font-semibold text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden focus:ring-2 focus:ring-[#2684D9] focus:border-transparent bg-white shadow-2xs font-mono"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => setInputValue("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#475569] cursor-pointer"
                aria-label="Xóa số đã nhập"
              >
                ✕ Xóa
              </button>
            )}
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[#64748B] font-semibold shrink-0 mr-1">
            Số mẫu:
          </span>
          {PRESET_NUMBERS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setInputValue(preset.val.toString())}
              className="px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#334155] hover:bg-[#F1F5F9] hover:border-[#94A3B8] transition-colors shrink-0 cursor-pointer font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Box */}
      {result ? (
        <div className="rounded-[14px] bg-white border border-[#BBDDFF] p-4 sm:p-5 space-y-4 shadow-xs">
          {/* Main Visual Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-[#F1F5F9]">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                Chữ Hán tự (Kanji):
              </span>
              <div
                className="text-2xl sm:text-3xl font-bold font-japanese text-[#104673] leading-snug break-all"
                lang="ja"
              >
                {result.kanji}
              </div>
              <div className="flex items-center gap-2 text-xs text-[#64748B]">
                <span>Kiểu Tây: <strong>{result.westernFormatted}</strong></span>
                <span>•</span>
                <span>Kiểu Nhật: <strong className="text-[#2684D9]">{result.japaneseFormatted}</strong></span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                Cách đọc (Hiragana & Romaji):
              </span>
              <div
                className="text-base sm:text-lg font-bold font-japanese text-[#1E40AF] leading-relaxed"
                lang="ja"
              >
                {result.hiragana}
              </div>
              <div className="text-xs sm:text-sm italic text-[#64748B]">
                {result.romaji}
              </div>
            </div>
          </div>

          {/* Breakdown Parts */}
          {result.breakdown.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                Phân tích cấu trúc ghép từng hàng:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {result.breakdown.map((part, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                      <span className="font-semibold">{part.unitLabel}</span>
                      <span className="font-mono text-[#0F172A]">{part.arabicPart}</span>
                    </div>
                    <div className="text-base font-bold font-japanese text-[#0F172A]" lang="ja">
                      {part.kanji}
                    </div>
                    <div className="text-xs text-[#2684D9] font-japanese font-medium">
                      {part.hiragana}
                    </div>
                    <div className="text-[11px] text-[#64748B] italic">
                      {part.romaji}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-[12px] bg-[#FEF2F2] border border-[#FCA5A5] p-4 text-xs sm:text-sm text-[#991B1B] text-center">
          Vui lòng nhập một số nguyên dương hợp lệ từ 0 đến 999.999.999.
        </div>
      )}

      {/* Note about Man vs Western grouping */}
      <div className="rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0] p-3 text-xs text-[#475569] leading-relaxed flex items-start gap-2">
        <span className="text-base shrink-0" aria-hidden="true">💡</span>
        <p>
          <strong>Quy tắc nhớ nhanh:</strong> Tiếng Việt và tiếng Anh ngắt 3 số 0 (Nghìn: 1.000, Triệu: 1.000.000). Nhưng tiếng Nhật ngắt <strong>4 số 0</strong> một lần: <strong>万 (Man = 10.000)</strong> và <strong>億 (Oku = 100.000.000)</strong>. Ví dụ: 12.345 người Nhật nhìn là 1万 (10.000) và 2345.
        </p>
      </div>
    </div>
  );
};

export default NumberBuilder;
