import React, { useState } from "react";
import { cn } from "../../../utils/cn";
import { SoundChangeSummaryRow } from "../types/numbers";
import { SOUND_CHANGE_MATRIX } from "../data/numbers";

export interface SoundChangeTableProps {
  rows?: SoundChangeSummaryRow[];
  className?: string;
}

export const SoundChangeTable: React.FC<SoundChangeTableProps> = ({
  rows = SOUND_CHANGE_MATRIX,
  className,
}) => {
  const [selectedNum, setSelectedNum] = useState<number | null>(null);

  const speak = (txt: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(txt.replace(/\s+/g, ""));
      u.lang = "ja-JP";
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const getReason = (num: number | null) => {
    switch (num) {
      case 1:
        return "Số 1 (ichi) khi gặp hàng H/K/S biến thành âm ngắt (っ) + âm bán đục (p) hoặc âm ngắt (k, s). Ví dụ: いっぽん, いっこ, いっさつ.";
      case 3:
        return "Số 3 (san) có âm mũi 'n' kéo theo biến âm đục (b, g, z). Ví dụ: さんぼん (hon -> bon), さんびき (hiki -> biki), さんぷん (fun -> pun).";
      case 6:
        return "Số 6 (roku) biến âm ngắt mạnh khi gặp H/K: ろっぽん (hon -> ppon), ろっこ (ko -> kko), ろっぴき (hiki -> ppiki).";
      case 8:
        return "Số 8 (hachi) biến thành âm ngắt っ: はっぽん, はっぴき, はっぷん, はっこ, はっさつ, はっかい.";
      case 10:
        return "Số 10 (jū) biến âm ngắt: じゅっぽん (hoặc じっぽん), じゅっぷん, じゅっこ, じゅっさつ.";
      default:
        return "Nhấp vào một con số ở cột 'Số' để xem phân tích quy tắc biến âm và phát âm mẫu của số đó.";
    }
  };

  return (
    <div
      className={cn(
        "surface rounded-3xl p-5 sm:p-7 space-y-6 shadow-zen border border-[#E7E0D2]",
        className,
      )}
    >
      <div className="flex items-start justify-between flex-wrap gap-3 pb-3 border-b border-[#F3EEE5]">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 font-black text-xl flex items-center justify-center" aria-hidden="true">
              ⚡
            </span>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#1F1C18]">
                Ma Trận Biến Âm Lượng Từ Kinh Điển (1, 3, 6, 8, 10)
              </h3>
              <p className="text-xs text-[#766D5E]">
                Bảng đối chiếu phản xạ nhanh giúp bạn không bao giờ nhầm lẫn giữa âm ngắt (っ), âm đục (b, g) và bán đục (p).
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[11px] font-bold">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Âm đục & bán đục (p/b)
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Âm ngắt (っ)
          </span>
        </div>
      </div>

      {/* Explanatory banner for selected number */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
        <span className="text-base shrink-0 mt-0.5" aria-hidden="true">💡</span>
        <div className="leading-relaxed">
          <strong className="text-amber-900 font-bold block mb-0.5">
            {selectedNum ? `Quy tắc biến âm cho số ${selectedNum}:` : "Mẹo ghi nhớ:"}
          </strong>
          {getReason(selectedNum)}
        </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border-2 border-[#E7E0D2] shadow-2xs">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[680px]">
          <thead>
            <tr className="bg-[#FAF7F1] border-b-2 border-[#E7E0D2] text-[#433D34]">
              <th className="p-3.5 font-bold text-center w-20">Số</th>
              <th className="p-3.5 font-extrabold text-[#213960]">〜本 (hon) - que/chai</th>
              <th className="p-3.5 font-extrabold text-[#213960]">〜匹 (hiki) - con nhỏ</th>
              <th className="p-3.5 font-extrabold text-[#213960]">〜分 (fun) - phút</th>
              <th className="p-3.5 font-extrabold text-[#213960]">〜個 (ko) - cái nhỏ</th>
              <th className="p-3.5 font-extrabold text-[#213960]">〜冊 (satsu) - cuốn</th>
              <th className="p-3.5 font-extrabold text-[#213960]">〜階 (kai) - tầng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3EEE5] text-[#433D34]">
            {rows.map((row) => {
              const isRowSelected = selectedNum === row.number;
              return (
                <tr
                  key={row.number}
                  className={cn(
                    "transition-colors font-japanese",
                    isRowSelected
                      ? "bg-amber-50/70"
                      : "hover:bg-[#FAF7F1]/80",
                  )}
                >
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedNum(isRowSelected ? null : row.number)}
                      className={cn(
                        "w-9 h-9 rounded-xl font-mono font-bold text-sm transition-all cursor-pointer inline-flex items-center justify-center",
                        isRowSelected
                          ? "bg-amber-600 text-white shadow-2xs scale-105"
                          : [1, 3, 6, 8, 10].includes(row.number)
                            ? "bg-amber-100/80 text-amber-900 border border-amber-300 hover:bg-amber-200"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                      )}
                      title={`Xem quy tắc biến âm số ${row.number}`}
                    >
                      {row.label}
                    </button>
                  </td>

                  {/* Hon */}
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => speak(row.hon)}
                      className="cursor-pointer text-left hover:underline"
                      title="Bấm để nghe phát âm"
                    >
                      {row.hon.includes("ぽ") || row.hon.includes("ぼ") ? (
                        <span className="font-extrabold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-2 py-0.5 rounded-lg inline-block">
                          {row.hon}
                        </span>
                      ) : (
                        <span className="font-medium text-slate-700">{row.hon}</span>
                      )}
                    </button>
                  </td>

                  {/* Hiki */}
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => speak(row.hiki)}
                      className="cursor-pointer text-left hover:underline"
                      title="Bấm để nghe phát âm"
                    >
                      {row.hiki.includes("ぴ") || row.hiki.includes("び") ? (
                        <span className="font-extrabold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-2 py-0.5 rounded-lg inline-block">
                          {row.hiki}
                        </span>
                      ) : (
                        <span className="font-medium text-slate-700">{row.hiki}</span>
                      )}
                    </button>
                  </td>

                  {/* Fun */}
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => speak(row.fun)}
                      className="cursor-pointer text-left hover:underline"
                      title="Bấm để nghe phát âm"
                    >
                      {row.fun.includes("ぷ") ? (
                        <span className="font-extrabold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-2 py-0.5 rounded-lg inline-block">
                          {row.fun}
                        </span>
                      ) : (
                        <span className="font-medium text-slate-700">{row.fun}</span>
                      )}
                    </button>
                  </td>

                  {/* Ko */}
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => speak(row.ko)}
                      className="cursor-pointer text-left hover:underline"
                      title="Bấm để nghe phát âm"
                    >
                      {row.ko.includes("っ") ? (
                        <span className="font-extrabold text-indigo-900 bg-indigo-100/90 border border-indigo-200 px-2 py-0.5 rounded-lg inline-block">
                          {row.ko}
                        </span>
                      ) : (
                        <span className="font-medium text-slate-700">{row.ko}</span>
                      )}
                    </button>
                  </td>

                  {/* Satsu */}
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => speak(row.satsu)}
                      className="cursor-pointer text-left hover:underline"
                      title="Bấm để nghe phát âm"
                    >
                      {row.satsu.includes("っ") ? (
                        <span className="font-extrabold text-indigo-900 bg-indigo-100/90 border border-indigo-200 px-2 py-0.5 rounded-lg inline-block">
                          {row.satsu}
                        </span>
                      ) : (
                        <span className="font-medium text-slate-700">{row.satsu}</span>
                      )}
                    </button>
                  </td>

                  {/* Kai */}
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => speak(row.kai)}
                      className="cursor-pointer text-left hover:underline"
                      title="Bấm để nghe phát âm"
                    >
                      {row.kai.includes("っ") || row.kai.includes("がい") ? (
                        <span className="font-extrabold text-indigo-900 bg-indigo-100/90 border border-indigo-200 px-2 py-0.5 rounded-lg inline-block">
                          {row.kai}
                        </span>
                      ) : (
                        <span className="font-medium text-slate-700">{row.kai}</span>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoundChangeTable;
