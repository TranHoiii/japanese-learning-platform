import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BeginnerLayout from "../components/BeginnerLayout";
import KanaGrid from "../components/KanaGrid";
import KanaDetailModal from "../components/KanaDetailModal";
import ConfusedKanaSection from "../components/ConfusedKanaSection";
import KanaQuickPractice from "../components/KanaQuickPractice";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import {
  KATAKANA_GROUPS,
  KATAKANA_OVERVIEW,
  getAllKatakanaCharacters,
  getKatakanaByCharacter,
} from "../data/katakana";
import { CONFUSED_KATAKANA_PAIRS } from "../data/confusedKana";
import { KanaCharacter, KanaType } from "../types/kana";

export const KatakanaPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "confused" | "practice">("grid");
  const [activeTab, setActiveTab] = useState<KanaType>("seion");
  const [selectedKana, setSelectedKana] = useState<KanaCharacter | null>(null);

  const currentGroup =
    KATAKANA_GROUPS.find((g) => g.id === activeTab) || KATAKANA_GROUPS[0];

  const allKatakana = getAllKatakanaCharacters();

  // If query param ?highlight=ア is present, auto-open that kana in modal
  useEffect(() => {
    const highlightChar = searchParams.get("highlight");
    if (highlightChar) {
      const match = getKatakanaByCharacter(highlightChar);
      if (match) {
        setSelectedKana(match);
        setActiveTab(match.type);
      }
    }
  }, [searchParams]);

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
    navigate(`/beginner/hiragana?highlight=${encodeURIComponent(equivalentChar)}`);
  };

  return (
    <BeginnerLayout
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Sơ cấp", href: "/beginner" },
        { label: "Bảng chữ cái Katakana", href: "/beginner/katakana", isCurrent: true },
      ]}
      title="Bảng Chữ Cái Katakana (カタカナ)"
      subtitle="Chữ cứng • Từ mượn ngoại lai & Danh từ quốc tế"
      description="Tra cứu 46 ký tự Katakana căn bản (Seion), 25 biến âm (Dakuten/Handakuten), 33 âm ghép (Yōon) và 16 âm mở rộng (Tokushuon). Phân biệt triệt để cặp chữ kinh điển (Shi/Tsu, So/N)."
      actions={
        <div className="flex items-center gap-2">
          <Link to="/beginner/hiragana">
            <Button variant="outline" size="sm">
              Xem bảng Hiragana &rarr;
            </Button>
          </Link>
        </div>
      }
    >
      {/* View Mode Bar: Grid | Confused Pairs | Practice */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-[12px] bg-[#F1F5F9] border border-[#E2E8F0]">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-white text-[#12558F] shadow-xs"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            📖 Bảng Chữ Cái & Chi Tiết
          </button>

          <button
            type="button"
            onClick={() => setViewMode("confused")}
            className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === "confused"
                ? "bg-white text-[#12558F] shadow-xs"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            🔍 Cặp Chữ Dễ Nhầm ({CONFUSED_KATAKANA_PAIRS.length})
          </button>

          <button
            type="button"
            onClick={() => setViewMode("practice")}
            className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === "practice"
                ? "bg-white text-[#12558F] shadow-xs"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            🎯 Luyện Tập Phản Xạ
          </button>
        </div>

        <span className="text-xs text-[#64748B] pr-3 hidden sm:inline">
          {viewMode === "grid"
            ? `${allKatakana.length} ký tự hoàn chỉnh`
            : viewMode === "confused"
              ? "Bí quyết nét vuốt"
              : "Lưu tạm phiên học"}
        </span>
      </div>

      {/* Mode 1: Main Grid & Detail View */}
      {viewMode === "grid" && (
        <div className="space-y-6">
          {/* Tab Switcher: Seion / Dakuten / Yoon / Extended */}
          <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab("seion")}
              className={`px-4 py-2 rounded-[8px] text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                activeTab === "seion"
                  ? "bg-[#2684D9] text-white shadow-xs"
                  : "bg-white text-[#475569] hover:bg-[#F1F5F9]"
              }`}
            >
              46 Âm Cơ Bản (Seion)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("dakuten")}
              className={`px-4 py-2 rounded-[8px] text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                activeTab === "dakuten"
                  ? "bg-[#2684D9] text-white shadow-xs"
                  : "bg-white text-[#475569] hover:bg-[#F1F5F9]"
              }`}
            >
              25 Biến Âm (Dakuten & Handakuten)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("yoon")}
              className={`px-4 py-2 rounded-[8px] text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                activeTab === "yoon"
                  ? "bg-[#2684D9] text-white shadow-xs"
                  : "bg-white text-[#475569] hover:bg-[#F1F5F9]"
              }`}
            >
              33 Âm Ghép (Yōon)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("extended")}
              className={`px-4 py-2 rounded-[8px] text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                activeTab === "extended"
                  ? "bg-[#2684D9] text-white shadow-xs"
                  : "bg-white text-[#475569] hover:bg-[#F1F5F9]"
              }`}
            >
              16 Âm Mở Rộng (Ngoại lai)
            </button>
          </div>

          {/* Group Description Banner */}
          <div className="rounded-[14px] bg-[#F0F7FF] border border-[#BBDDFF] p-4 sm:p-5 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-[8px] bg-white text-[#12558F] font-bold text-lg flex items-center justify-center shrink-0 font-japanese border border-[#BBDDFF]">
              ア
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-[#12558F]">
                  {currentGroup.title}
                </h2>
                <Badge variant="primary" size="sm">
                  {currentGroup.characters.length} ký tự
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-[#104673] leading-relaxed">
                {currentGroup.descriptionVi}
              </p>
            </div>
          </div>

          {/* Interactive Instructions */}
          <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
            <span>💡 Nhấn vào bất kỳ ký tự nào để xem nét viết chuẩn, từ mượn tiếng Anh và chữ Hiragana đối ứng.</span>
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
          <div className="rounded-[14px] bg-white border border-[#E2E8F0] p-5 space-y-3 shadow-2xs">
            <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
              <span>💡</span>
              <span>Lưu ý sư phạm quan trọng khi học Katakana</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#475569] list-disc list-inside leading-relaxed">
              {KATAKANA_OVERVIEW.learningTipsVi.map((tip, idx) => (
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
            pairs={CONFUSED_KATAKANA_PAIRS}
            title="Các cặp chữ Katakana kinh điển dễ nhầm lẫn nhất (Shi/Tsu, So/N)"
          />
        </div>
      )}

      {/* Mode 3: Quick Practice */}
      {viewMode === "practice" && (
        <div className="space-y-6">
          <KanaQuickPractice system="katakana" />
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

export default KatakanaPage;
