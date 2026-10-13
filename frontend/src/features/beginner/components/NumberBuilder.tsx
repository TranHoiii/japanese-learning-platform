import React, { useState } from "react";
import { cn } from "../../../utils/cn";
import { convertArabicToJapanese } from "../utils/numberConverter";

export interface NumberBuilderProps {
  className?: string;
}

const PRESET_NUMBERS = [
  { label: "12 (Thập nhị)", val: 12 },
  { label: "300 (Biến âm sanbyaku)", val: 300 },
  { label: "600 (Roppyaku)", val: 600 },
  { label: "800 (Happyaku)", val: 800 },
  { label: "3.000 (Sanzen)", val: 3000 },
  { label: "8.000 (Hassen)", val: 8000 },
  { label: "10.000 (1 Vạn - Ichiman)", val: 10000 },
  { label: "12.345", val: 12345 },
  { label: "1.000.000 (100 Vạn)", val: 1000000 },
  { label: "100.000.000 (1 Ức - Ichioku)", val: 100000000 },
];

export const NumberBuilder: React.FC<NumberBuilderProps> = ({ className }) => {
  const [inputValue, setInputValue] = useState<string>("12345");
  const [copied, setCopied] = useState(false);

  const num = parseInt(inputValue.replace(/\D/g, ""), 10);
  const result = !isNaN(num) ? convertArabicToJapanese(num) : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 9) {
      setInputValue(raw);
    }
  };

  const handleAppendDigit = (d: string) => {
    const next = (inputValue + d).replace(/\D/g, "");
    if (next.length <= 9) setInputValue(next);
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

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`${result.kanji} (${result.hiragana})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            <span className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 font-black text-xl flex items-center justify-center" aria-hidden="true">
              🧮
            </span>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#1F1C18]">
                Studio Ghép & Tra Cứu Số Tự Động (Number Builder)
              </h3>
              <p className="text-xs text-[#766D5E]">
                Nhập số từ <strong>0 đến 999.999.999</strong> để phân tích cấu trúc chữ Hán, Hiragana và cơ số 万 (10.000).
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            Hỗ trợ đến 1 Ức (億)
          </span>
        </div>
      </div>

      {/* Main 2-column studio layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Keypad & Input */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            <label htmlFor="number-builder-input" className="text-xs font-bold uppercase tracking-wider text-[#766D5E] block">
              Nhập con số cần tra:
            </label>
            <div className="relative">
              <input
                id="number-builder-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Nhập số..."
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#D3CABA] text-xl font-bold text-[#1F1C18] placeholder-[#9A8F7E] focus:outline-hidden focus:border-[#2F5496] bg-white shadow-xs font-mono tracking-wider"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => setInputValue("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Xóa số đã nhập"
                >
                  ✕ Xóa
                </button>
              )}
            </div>
          </div>

          {/* Mini numeric keypad */}
          <div className="p-3 rounded-2xl bg-[#FAF7F1] border border-[#E7E0D2] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#766D5E] block">
              Bàn phím số nhanh:
            </span>
            <div className="grid grid-cols-4 gap-1.5 font-mono">
              {["1", "2", "3", "+00"].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => k.startsWith("+") ? handleAppendDigit(k.slice(1)) : handleAppendDigit(k)}
                  className="py-2 rounded-xl bg-white border border-[#E7E0D2] hover:bg-[#EEF3FA] hover:border-[#2F5496] text-sm font-bold text-slate-800 transition-colors cursor-pointer"
                >
                  {k}
                </button>
              ))}
              {["4", "5", "6", "+000"].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => k.startsWith("+") ? handleAppendDigit(k.slice(1)) : handleAppendDigit(k)}
                  className="py-2 rounded-xl bg-white border border-[#E7E0D2] hover:bg-[#EEF3FA] hover:border-[#2F5496] text-sm font-bold text-slate-800 transition-colors cursor-pointer"
                >
                  {k}
                </button>
              ))}
              {["7", "8", "9", "+万"].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => k === "+万" ? handleAppendDigit("0000") : handleAppendDigit(k)}
                  className={cn(
                    "py-2 rounded-xl border text-sm font-bold transition-colors cursor-pointer",
                    k === "+万"
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                      : "bg-white border-[#E7E0D2] hover:bg-[#EEF3FA] hover:border-[#2F5496] text-slate-800",
                  )}
                  title={k === "+万" ? "Thêm 4 số 0 (1 Vạn = 10.000)" : undefined}
                >
                  {k}
                </button>
              ))}
              {["0", "Backspace", "Clear"].map((k, idx) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => {
                    if (k === "Backspace") setInputValue((v) => v.slice(0, -1));
                    else if (k === "Clear") setInputValue("");
                    else handleAppendDigit("0");
                  }}
                  className={cn(
                    "py-2 rounded-xl border text-sm font-bold transition-colors cursor-pointer",
                    idx === 0 ? "col-span-2" : "col-span-1",
                    k === "Clear" ? "text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100" : "bg-white border-[#E7E0D2] hover:bg-[#EEF3FA] text-slate-800",
                  )}
                >
                  {k === "Backspace" ? "⌫" : k === "Clear" ? "C" : "0"}
                </button>
              ))}
            </div>
          </div>

          {/* Presets cloud */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-[#766D5E] block">
              Ví dụ số đặc biệt / biến âm:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_NUMBERS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setInputValue(preset.val.toString())}
                  className="px-2.5 py-1 rounded-xl bg-white border border-[#E7E0D2] text-[11px] font-semibold text-[#433D34] hover:bg-[#F3EEE5] hover:border-[#2F5496] transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Result Board */}
        <div className="lg:col-span-7 space-y-4">
          {result ? (
            <div className="rounded-3xl bg-white border-2 border-indigo-100 p-5 sm:p-6 space-y-5 shadow-xs">
              {/* Top Banner with Kanji & Actions */}
              <div className="space-y-3 pb-4 border-b border-[#F3EEE5]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#766D5E]">
                    Chữ Hán Tự (Kanji)
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => speakText(result.hiragana)}
                      className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Phát âm tiếng Nhật"
                    >
                      <span>🔊</span> Nghe
                    </button>
                    <button
                      type="button"
                      onClick={copyResult}
                      className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Sao chép kết quả"
                    >
                      {copied ? "✓ Đã chép" : "📋 Sao chép"}
                    </button>
                  </div>
                </div>

                <div
                  className="text-3xl sm:text-4xl font-extrabold font-japanese text-[#213960] tracking-wide break-all leading-tight"
                  lang="ja"
                >
                  {result.kanji}
                </div>

                <div className="flex items-center gap-3 text-xs text-[#766D5E] flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-mono font-bold text-slate-800">
                    {result.westernFormatted}
                  </span>
                  <span>↔</span>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-semibold">
                    Cơ số Nhật: <strong>{result.japaneseFormatted}</strong>
                  </span>
                </div>
              </div>

              {/* Hiragana & Romaji Card */}
              <div className="p-4 rounded-2xl bg-[#FAF7F1] border border-[#E7E0D2] space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#766D5E] block">
                  Phiên âm Hiragana & Romaji:
                </span>
                <div className="text-xl sm:text-2xl font-bold font-japanese text-indigo-900 leading-snug" lang="ja">
                  {result.hiragana}
                </div>
                <div className="text-sm italic font-medium text-[#766D5E]">
                  {result.romaji}
                </div>
              </div>

              {/* Multi-tier Breakdown by Unit (万, 千, 百, 十...) */}
              {result.breakdown.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#766D5E] block">
                    Cấu trúc ghép từng hàng cơ số:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {result.breakdown.map((part, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-white border border-indigo-100 shadow-2xs space-y-1 hover:border-indigo-300 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[10px] text-[#766D5E]">
                          <span className="font-bold text-indigo-700">{part.unitLabel}</span>
                          <span className="font-mono font-semibold">{part.arabicPart}</span>
                        </div>
                        <div className="text-lg font-bold font-japanese text-[#1F1C18]" lang="ja">
                          {part.kanji}
                        </div>
                        <div className="text-xs text-[#2F5496] font-japanese font-medium truncate">
                          {part.hiragana}
                        </div>
                        <div className="text-[10px] text-[#766D5E] italic truncate">
                          {part.romaji}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-3xl bg-rose-50 border border-rose-200 p-8 text-sm text-rose-800 text-center space-y-2">
              <span className="text-3xl block">⚠️</span>
              <p className="font-bold">Vui lòng nhập một số nguyên dương hợp lệ từ 0 đến 999.999.999</p>
            </div>
          )}

          {/* Mnemonic Wan Rule Card */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200 p-4 text-xs text-amber-950 leading-relaxed flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">💡</span>
            <div>
              <strong className="block text-amber-900 mb-0.5">Bí quyết nhớ cơ số Vạn (万) của người Nhật:</strong>
              Tiếng Việt ngắt 3 số 0 (1.000 Nghìn, 1.000.000 Triệu). Nhưng tiếng Nhật luôn ngắt <strong>4 số 0</strong> một lần: <strong>万 (Man = 10.000)</strong> và <strong>億 (Oku = 100.000.000)</strong>. Ví dụ: <code className="bg-amber-100/80 px-1.5 py-0.5 rounded font-mono font-bold">12.345</code> được hiểu là <code className="bg-amber-100/80 px-1.5 py-0.5 rounded font-mono font-bold">1万 + 2345</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberBuilder;
