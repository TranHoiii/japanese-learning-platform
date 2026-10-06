import React, { useState } from "react";
import { cn } from "../../../utils/cn";
import { KanaCharacter, KanaRow } from "../types/kana";
import KanaCard from "./KanaCard";

export interface KanaGridProps {
  characters: KanaCharacter[];
  selectedKanaId?: string | null;
  onSelectKana?: (kana: KanaCharacter) => void;
  showRowFilter?: boolean;
  showEquivalentToggle?: boolean;
  className?: string;
}

export const KanaGrid: React.FC<KanaGridProps> = ({
  characters,
  selectedKanaId,
  onSelectKana,
  showRowFilter = true,
  showEquivalentToggle = true,
  className,
}) => {
  const [selectedRow, setSelectedRow] = useState<KanaRow | "all">("all");
  const [showEquivalent, setShowEquivalent] = useState(false);

  const rows: { id: KanaRow | "all"; label: string }[] = [
    { id: "all", label: "Tất cả" },
    { id: "a", label: "Hàng A (あ)" },
    { id: "ka", label: "Hàng Ka (か)" },
    { id: "sa", label: "Hàng Sa (さ)" },
    { id: "ta", label: "Hàng Ta (た)" },
    { id: "na", label: "Hàng Na (な)" },
    { id: "ha", label: "Hàng Ha (は)" },
    { id: "ma", label: "Hàng Ma (ま)" },
    { id: "ya", label: "Hàng Ya (や)" },
    { id: "ra", label: "Hàng Ra (ら)" },
    { id: "wa", label: "Hàng Wa (わ)" },
    { id: "n", label: "Âm N (ん)" },
  ];

  const filtered =
    selectedRow === "all"
      ? characters
      : characters.filter((c) => c.row === selectedRow);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Controls row: Row filtering pills + Equivalent Kana Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#F1F5F9]">
        {showRowFilter && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {rows.map((row) => (
              <button
                key={row.id}
                type="button"
                onClick={() => setSelectedRow(row.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full font-medium shrink-0 transition-colors cursor-pointer",
                  selectedRow === row.id
                    ? "bg-[#2684D9] text-white shadow-xs"
                    : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]",
                )}
              >
                {row.label}
              </button>
            ))}
          </div>
        )}

        {showEquivalentToggle && (
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={() => setShowEquivalent((prev) => !prev)}
              className={cn(
                "px-2.5 py-1 rounded-[8px] text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer",
                showEquivalent
                  ? "bg-[#F0F7FF] text-[#12558F] border-[#BBDDFF]"
                  : "bg-white text-[#64748B] border-[#CBD5E1] hover:bg-[#F8FAFC]",
              )}
              title="Bật so sánh chữ Hiragana ↔ Katakana"
            >
              <span aria-hidden="true">🔄</span>
              <span>{showEquivalent ? "Đang hiện đối ứng" : "So sánh Hiragana ↔ Katakana"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid of Characters */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {filtered.map((char) => (
            <KanaCard
              key={char.id}
              kana={char}
              isSelected={selectedKanaId === char.id}
              showEquivalent={showEquivalent}
              onSelect={onSelectKana}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[12px] bg-[#F8FAFC] border border-dashed border-[#CBD5E1] p-8 text-center text-sm text-[#64748B]">
          Không có ký tự nào trong nhóm hàng đã chọn.
        </div>
      )}
    </div>
  );
};

export default KanaGrid;
