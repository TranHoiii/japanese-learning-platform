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
  const [selfTest, setSelfTest] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const revealKana = (id: string) => setRevealed((prev) => new Set(prev).add(id));
  const toggleSelfTest = () => {
    setSelfTest((v) => !v);
    setRevealed(new Set());
  };

  const isKatakana = characters.length > 0 && characters[0].system === "katakana";
  const groupType = characters.length > 0 ? characters[0].type : "seion";
  const isYoon = groupType === "yoon";

  const rows: { id: KanaRow | "all"; label: string }[] = [
    { id: "all", label: "Tất cả" },
    { id: "a", label: isKatakana ? "Hàng A (ア)" : "Hàng A (あ)" },
    { id: "ka", label: isKatakana ? "Hàng Ka (カ)" : "Hàng Ka (か)" },
    { id: "sa", label: isKatakana ? "Hàng Sa (サ)" : "Hàng Sa (さ)" },
    { id: "ta", label: isKatakana ? "Hàng Ta (タ)" : "Hàng Ta (た)" },
    { id: "na", label: isKatakana ? "Hàng Na (ナ)" : "Hàng Na (な)" },
    { id: "ha", label: isKatakana ? "Hàng Ha (ハ)" : "Hàng Ha (は)" },
    { id: "ma", label: isKatakana ? "Hàng Ma (マ)" : "Hàng Ma (ま)" },
    { id: "ya", label: isKatakana ? "Hàng Ya (ヤ)" : "Hàng Ya (や)" },
    { id: "ra", label: isKatakana ? "Hàng Ra (ラ)" : "Hàng Ra (ら)" },
    { id: "wa", label: isKatakana ? "Hàng Wa (ワ)" : "Hàng Wa (わ)" },
    { id: "n", label: isKatakana ? "Âm N (ン)" : "Âm N (ん)" },
  ];

  // Danh sách các cột nguyên âm chuẩn 5 cột (A - I - U - E - O)
  const vowelColumns = [
    { col: "A", kana: isKatakana ? "ア" : "あ" },
    { col: "I", kana: isKatakana ? "イ" : "い" },
    { col: "U", kana: isKatakana ? "ウ" : "う" },
    { col: "E", kana: isKatakana ? "エ" : "え" },
    { col: "O", kana: isKatakana ? "オ" : "お" },
  ];

  // Danh sách cột cho Âm ghép Yōon (3 cột: -a, -u, -o)
  const yoonColumns = [
    { col: "— A", sub: isKatakana ? "ャ" : "ゃ" },
    { col: "— U", sub: isKatakana ? "ュ" : "ゅ" },
    { col: "— O", sub: isKatakana ? "ョ" : "ょ" },
  ];

  // Xây dựng ma trận 5 cột chuẩn xác cho Seion (Gojūon)
  const getSeionSlots = () => {
    const activeRows: KanaRow[] =
      selectedRow === "all"
        ? ["a", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa", "n"]
        : [selectedRow];

    const columns: ("a" | "i" | "u" | "e" | "o")[] = ["a", "i", "u", "e", "o"];
    const slots: { key: string; char: KanaCharacter | null }[] = [];

    activeRows.forEach((rId) => {
      if (rId === "n") {
        // Hàng âm N: Chữ N ở cột A, 4 cột còn lại để trống giữ chỗ
        const nChar = characters.find((c) => c.row === "n");
        slots.push({ key: "n-a", char: nChar || null });
        slots.push({ key: "n-i", char: null });
        slots.push({ key: "n-u", char: null });
        slots.push({ key: "n-e", char: null });
        slots.push({ key: "n-o", char: null });
      } else if (rId === "ya") {
        // Hàng Ya chỉ có 3 chữ: ya (cột a), yu (cột u), yo (cột o)
        const yaChar = characters.find((c) => c.row === "ya" && c.column === "a");
        const yuChar = characters.find((c) => c.row === "ya" && c.column === "u");
        const yoChar = characters.find((c) => c.row === "ya" && c.column === "o");
        slots.push({ key: "ya-a", char: yaChar || null });
        slots.push({ key: "ya-i", char: null });
        slots.push({ key: "ya-u", char: yuChar || null });
        slots.push({ key: "ya-e", char: null });
        slots.push({ key: "ya-o", char: yoChar || null });
      } else if (rId === "wa") {
        // Hàng Wa chỉ có 2 chữ: wa (cột a), wo (cột o)
        const waChar = characters.find((c) => c.row === "wa" && c.column === "a");
        const woChar = characters.find((c) => c.row === "wa" && c.column === "o");
        slots.push({ key: "wa-a", char: waChar || null });
        slots.push({ key: "wa-i", char: null });
        slots.push({ key: "wa-u", char: null });
        slots.push({ key: "wa-e", char: null });
        slots.push({ key: "wa-o", char: woChar || null });
      } else {
        // Các hàng chuẩn đầy đủ 5 ký tự: a, ka, sa, ta, na, ha, ma, ra
        columns.forEach((col) => {
          const char = characters.find((c) => c.row === rId && c.column === col);
          slots.push({ key: `${rId}-${col}`, char: char || null });
        });
      }
    });

    return slots;
  };

  const seionSlots = groupType === "seion" ? getSeionSlots() : [];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Controls row: Row filtering pills + Equivalent Kana Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#F3EEE5]">
        {showRowFilter && (
          <div className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto pb-2.5 custom-scrollbar-x text-xs">
            {rows.map((row) => (
              <button
                key={row.id}
                type="button"
                onClick={() => setSelectedRow(row.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full font-medium shrink-0 transition-colors cursor-pointer",
                  selectedRow === row.id
                    ? "bg-[#2F5496] text-white shadow-xs"
                    : "bg-white text-[#5A5246] border border-[#E7E0D2] hover:bg-[#FAF7F1]",
                )}
              >
                {row.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={toggleSelfTest}
            aria-pressed={selfTest}
            className={cn(
              "px-2.5 py-1 rounded-[8px] text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer",
              selfTest ? "bg-amber-100 text-amber-900 border-amber-300" : "bg-white text-[#766D5E] border-[#D3CABA] hover:bg-[#FAF7F1]",
            )}
            title="Ẩn cách đọc, bấm vào chữ để kiểm tra trí nhớ"
          >
            <span aria-hidden="true">🙈</span>
            <span>{selfTest ? "Đang tự kiểm tra" : "Tự kiểm tra"}</span>
          </button>
        </div>
        {showEquivalentToggle && (
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={() => setShowEquivalent((prev) => !prev)}
              className={cn(
                "px-2.5 py-1 rounded-[8px] text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer",
                showEquivalent
                  ? "bg-[#EEF3FA] text-[#213960] border-[#BDD0EC]"
                  : "bg-white text-[#766D5E] border-[#D3CABA] hover:bg-[#FAF7F1]",
              )}
              title="Bật so sánh chữ Hiragana ↔ Katakana"
            >
              <span aria-hidden="true">🔄</span>
              <span>{showEquivalent ? "Đang hiện đối ứng" : "So sánh Hiragana ↔ Katakana"}</span>
            </button>
          </div>
        )}
      </div>

      {/* 1. Header 5 Cột Nguyên Âm (A - I - U - E - O) chuẩn cho Seion & Dakuten */}
      {!isYoon && groupType !== "extended" && (
        <div className="grid grid-cols-5 gap-2 sm:gap-3.5 text-center mb-1">
          {vowelColumns.map((v) => (
            <div
              key={v.col}
              className="py-1.5 sm:py-2 px-1 rounded-[10px] bg-[#EEF3FA] border border-[#BDD0EC] text-[#213960] font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 shadow-2xs"
            >
              <span className="text-[10px] sm:text-xs text-[#2F5496] uppercase tracking-wider">Cột</span>
              <span className="text-xs sm:text-sm font-extrabold">{v.col}</span>
              <span className="font-japanese text-[11px] sm:text-xs opacity-80">({v.kana})</span>
            </div>
          ))}
        </div>
      )}

      {/* 2. Header 3 Cột dành cho Âm Ghép Yōon (-a, -u, -o) */}
      {isYoon && (
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 text-center mb-1">
          {yoonColumns.map((v) => (
            <div
              key={v.col}
              className="py-2 px-2 rounded-[10px] bg-[#EEF3FA] border border-[#BDD0EC] text-[#213960] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span className="text-xs text-[#2F5496] uppercase tracking-wider">Cột</span>
              <span className="font-extrabold">{v.col}</span>
              <span className="font-japanese text-xs opacity-80">({v.sub})</span>
            </div>
          ))}
        </div>
      )}

      {/* 3. Lưới hiển thị các ký tự (Grid of Characters) */}
      {groupType === "seion" ? (
        // Seion: Sử dụng 5 cột chuẩn tuyệt đối, có ô trống giữ vị trí cho hàng Ya / Wa / N
        <div className="grid grid-cols-5 gap-2 sm:gap-3.5">
          {seionSlots.map((slot) =>
            slot.char ? (
              <KanaCard
                key={slot.char.id}
                kana={slot.char}
                isSelected={selectedKanaId === slot.char.id}
                showEquivalent={showEquivalent}
                concealed={selfTest && !revealed.has(slot.char.id)}
                onReveal={revealKana}
                onSelect={onSelectKana}
              />
            ) : (
              <div
                key={slot.key}
                className="rounded-[14px] bg-[#FAF7F1]/60 border border-dashed border-[#E7E0D2] p-2 sm:p-3 flex flex-col items-center justify-center min-h-[105px] sm:min-h-[130px] select-none"
                aria-hidden="true"
              >
                <span className="text-xs font-bold text-slate-300">—</span>
              </div>
            )
          )}
        </div>
      ) : isYoon ? (
        // Yōon: Lưới 3 cột chuẩn cho các âm ghép (-a, -u, -o)
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
          {characters.map((char) => (
            <KanaCard
              key={char.id}
              kana={char}
              isSelected={selectedKanaId === char.id}
              showEquivalent={showEquivalent}
              concealed={selfTest && !revealed.has(char.id)}
              onReveal={revealKana}
              onSelect={onSelectKana}
            />
          ))}
        </div>
      ) : groupType === "dakuten" ? (
        // Dakuten: Đúng 5 cột tương ứng 5 nguyên âm a - i - u - e - o
        <div className="grid grid-cols-5 gap-2 sm:gap-3.5">
          {characters.map((char) => (
            <KanaCard
              key={char.id}
              kana={char}
              isSelected={selectedKanaId === char.id}
              showEquivalent={showEquivalent}
              concealed={selfTest && !revealed.has(char.id)}
              onReveal={revealKana}
              onSelect={onSelectKana}
            />
          ))}
        </div>
      ) : (
        // Âm mở rộng Tokushuon hoặc nhóm khác
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          {characters.map((char) => (
            <KanaCard
              key={char.id}
              kana={char}
              isSelected={selectedKanaId === char.id}
              showEquivalent={showEquivalent}
              concealed={selfTest && !revealed.has(char.id)}
              onReveal={revealKana}
              onSelect={onSelectKana}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default KanaGrid;
