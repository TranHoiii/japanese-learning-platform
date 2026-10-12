import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BeginnerLayout from "../components/BeginnerLayout";
import KanaGrid from "../components/KanaGrid";
import KanaDetailModal from "../components/KanaDetailModal";
import ConfusedKanaSection from "../components/ConfusedKanaSection";
import KanaQuickPractice from "../components/KanaQuickPractice";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import {
  HIRAGANA_GROUPS,
  HIRAGANA_OVERVIEW,
  getAllHiraganaCharacters,
  getHiraganaByCharacter,
} from "../data/hiragana";
import { CONFUSED_HIRAGANA_PAIRS } from "../data/confusedKana";
import { KanaCharacter, KanaType } from "../types/kana";

export const HiraganaPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "confused" | "practice">("grid");
  const [activeTab, setActiveTab] = useState<KanaType>("seion");
  const [selectedKana, setSelectedKana] = useState<KanaCharacter | null>(null);

  const currentGroup =
    HIRAGANA_GROUPS.find((g) => g.id === activeTab) || HIRAGANA_GROUPS[0];

  const allHiragana = getAllHiraganaCharacters();

  // Find previous and next kana for modal navigation
  const currentIndex = selectedKana
    ? currentGroup.characters.findIndex((c) => c.id === selectedKana.id)
    : -1;

  const handlePrevKana = () => {
    if (currentIndex > 0) {
      setSelectedKana(currentGroup.characters[currentIndex - 1]);
    }
  };

  const handleNextKana = () => {
    if (currentIndex >= 0 && currentIndex < currentGroup.characters.length - 1) {
      setSelectedKana(currentGroup.characters[currentIndex + 1]);
    }
  };

  const handleSelectEquivalent = (equivalentChar: string) => {
    // When clicking the equivalent Katakana, navigate to Katakana page with state or search
    navigate(`/beginner/katakana?highlight=${encodeURIComponent(equivalentChar)}`);
  };

  return (
    <BeginnerLayout
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Sơ cấp", href: "/beginner" },
        { label: "Bảng chữ cái Hiragana", href: "/beginner/hiragana", isCurrent: true },
      ]}
      title="Bảng Chữ Cái Hiragana (ひらがな)"
      subtitle="Chữ mềm • Nền tảng căn bản tiếng Nhật"
      description="Tra cứu 46 ký tự Hiragana căn bản (Seion), 25 biến âm (Dakuten/Handakuten) và 33 âm ghép (Yōon). Học cách viết, mẹo phân biệt chữ dễ nhầm, và thực hành phản xạ nhanh."
      actions={
        <div className="flex items-center gap-2">
          <Link to="/beginner/katakana">
            <Button variant="outline" size="sm">
              Xem bảng Katakana &rarr;
            </Button>
          </Link>
        </div>
      }
    >
      {/* View Mode Bar: Grid | Confused Pairs | Practice */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-[12px] bg-[#F3EEE5] border border-[#E7E0D2]">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-white text-[#213960] shadow-xs"
                : "text-[#766D5E] hover:text-[#1F1C18]"
            }`}
          >
            📖 Bảng Chữ Cái & Chi Tiết
          </button>

          <button
            type="button"
            onClick={() => setViewMode("confused")}
            className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === "confused"
                ? "bg-white text-[#213960] shadow-xs"
                : "text-[#766D5E] hover:text-[#1F1C18]"
            }`}
          >
            🔍 Cặp Chữ Dễ Nhầm ({CONFUSED_HIRAGANA_PAIRS.length})
          </button>

          <button
            type="button"
            onClick={() => setViewMode("practice")}
            className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === "practice"
                ? "bg-white text-[#213960] shadow-xs"
                : "text-[#766D5E] hover:text-[#1F1C18]"
            }`}
          >
            🎯 Luyện Tập Phản Xạ
          </button>
        </div>

        <span className="text-xs text-[#766D5E] pr-3 hidden sm:inline">
          {viewMode === "grid"
            ? `${allHiragana.length} ký tự hoàn chỉnh`
            : viewMode === "confused"
              ? "Phân biệt trực quan"
              : "Lưu tạm phiên học"}
        </span>
      </div>

      {/* Mode 1: Main Grid & Detail View */}
      {viewMode === "grid" && (
        <div className="space-y-6">
          {/* Tab Switcher: Seion / Dakuten / Yoon */}
          <div className="flex items-center gap-2 border-b border-[#E7E0D2] overflow-x-auto pb-3 custom-scrollbar-x">
            <button
              type="button"
              onClick={() => setActiveTab("seion")}
              className={`px-4 py-2 rounded-[8px] text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                activeTab === "seion"
                  ? "bg-[#2F5496] text-white shadow-xs"
                  : "bg-white text-[#5A5246] hover:bg-[#F3EEE5]"
              }`}
            >
              46 Âm Cơ Bản (Seion)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("dakuten")}
              className={`px-4 py-2 rounded-[8px] text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                activeTab === "dakuten"
                  ? "bg-[#2F5496] text-white shadow-xs"
                  : "bg-white text-[#5A5246] hover:bg-[#F3EEE5]"
              }`}
            >
              25 Biến Âm (Dakuten & Handakuten)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("yoon")}
              className={`px-4 py-2 rounded-[8px] text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                activeTab === "yoon"
                  ? "bg-[#2F5496] text-white shadow-xs"
                  : "bg-white text-[#5A5246] hover:bg-[#F3EEE5]"
              }`}
            >
              33 Âm Ghép (Yōon)
            </button>
          </div>

          {/* Group Description Banner */}
          <div className="rounded-[14px] bg-[#EEF3FA] border border-[#BDD0EC] p-4 sm:p-5 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-[8px] bg-white text-[#213960] font-bold text-lg flex items-center justify-center shrink-0 font-japanese border border-[#BDD0EC]">
              あ
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-[#213960]">
                  {currentGroup.title}
                </h2>
                <Badge variant="primary" size="sm">
                  {currentGroup.characters.length} ký tự
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-[#213960] leading-relaxed">
                {currentGroup.descriptionVi}
              </p>
            </div>
          </div>

          {/* Interactive Instructions */}
          <div className="flex items-center justify-between text-xs text-[#766D5E] px-1">
            <span>💡 Nhấn vào bất kỳ ký tự nào để xem nét viết chuẩn, từ vựng và chữ Katakana đối ứng.</span>
          </div>

          {/* Grid of Characters */}
          <KanaGrid
            characters={currentGroup.characters}
            selectedKanaId={selectedKana?.id}
            onSelectKana={(kana) => setSelectedKana(kana)}
            showRowFilter={activeTab === "seion"}
            showEquivalentToggle={true}
          />

          {/* Pedagogy Tips box for Vietnamese learners */}
          <div className="rounded-[14px] bg-white border border-[#E7E0D2] p-5 space-y-3 shadow-2xs">
            <h3 className="text-sm font-bold text-[#1F1C18] flex items-center gap-2">
              <span>💡</span>
              <span>Lưu ý sư phạm quan trọng khi học Hiragana</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5A5246] list-disc list-inside leading-relaxed">
              {HIRAGANA_OVERVIEW.learningTipsVi.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Mode 2: Commonly Confused Pairs */}
      {viewMode === "confused" && (
        <div className="space-y-6">
          <ConfusedKanaSection
            pairs={CONFUSED_HIRAGANA_PAIRS}
            title="Các cặp chữ Hiragana dễ nhầm lẫn nhất cho người mới bắt đầu"
          />
        </div>
      )}

      {/* Mode 3: Quick Practice */}
      {viewMode === "practice" && (
        <div className="space-y-6">
          <KanaQuickPractice system="hiragana" />
        </div>
      )}

      {/* Selected Kana Detail Modal */}
      <KanaDetailModal
        kana={selectedKana}
        isOpen={selectedKana !== null}
        onClose={() => setSelectedKana(null)}
        onPrev={currentIndex > 0 ? handlePrevKana : undefined}
        onNext={
          currentIndex >= 0 && currentIndex < currentGroup.characters.length - 1
            ? handleNextKana
            : undefined
        }
        onSelectEquivalent={handleSelectEquivalent}
      />
    </BeginnerLayout>
  );
};

export default HiraganaPage;
