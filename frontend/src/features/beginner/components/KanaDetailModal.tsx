import React, { useEffect } from "react";
import { cn } from "../../../utils/cn";
import { KanaCharacter } from "../types/kana";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import AudioButton from "./AudioButton";
import KanaStrokeOrder from "./KanaStrokeOrder";

export interface KanaDetailModalProps {
  kana: KanaCharacter | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onSelectEquivalent?: (equivalentChar: string) => void;
}

export const KanaDetailModal: React.FC<KanaDetailModalProps> = ({
  kana,
  isOpen,
  onClose,
  onPrev,
  onNext,
  onSelectEquivalent,
}) => {
  // Handle keyboard navigation: Esc to close, ArrowLeft / ArrowRight to navigate
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && onNext) {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !kana) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kana-detail-title"
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[18px] bg-white border border-[#E2E8F0] p-6 sm:p-7 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar: System & Type badge + Navigation + Close */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">
              {kana.system === "hiragana" ? "Bảng Hiragana" : "Bảng Katakana"}
            </Badge>
            <Badge variant="neutral" size="sm">
              {kana.type === "seion"
                ? "Âm cơ bản"
                : kana.type === "dakuten"
                  ? "Biến âm"
                  : kana.type === "handakuten"
                    ? "Bán đục âm"
                    : kana.type === "yoon"
                      ? "Âm ghép"
                      : "Âm mở rộng"}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                aria-label="Ký tự trước đó"
                title="Ký tự trước (Phím ←)"
                className="w-8 h-8 rounded-full border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] flex items-center justify-center text-sm font-bold text-[#475569] transition-colors cursor-pointer"
              >
                &larr;
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                aria-label="Ký tự tiếp theo"
                title="Ký tự tiếp (Phím →)"
                className="w-8 h-8 rounded-full border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] flex items-center justify-center text-sm font-bold text-[#475569] transition-colors cursor-pointer"
              >
                &rarr;
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng cửa sổ"
              className="w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center text-sm font-bold text-[#475569] transition-colors ml-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Center Spotlight: Giant Character & Romaji & Audio */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-[14px] bg-[#F0F7FF]/50 border border-[#BBDDFF]/70">
          <div className="flex items-center gap-4">
            <span
              id="kana-detail-title"
              className="text-6xl sm:text-7xl font-bold font-japanese text-[#0F172A] select-none leading-none"
              lang="ja"
            >
              {kana.character}
            </span>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-[#12558F] tracking-wide block">
                {kana.romaji}
              </span>
              <span className="text-xs text-[#64748B] block">
                {kana.strokeCount ? `${kana.strokeCount} nét viết` : ""}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AudioButton
              audioUrl={kana.audioUrl}
              label={kana.character}
              size="lg"
              variant="primary"
              showDisabledState={true}
            />

            {/* Hiragana ↔ Katakana Relationship Indicator */}
            {kana.equivalentKana && (
              <div className="flex flex-col items-center p-2.5 rounded-[10px] bg-white border border-[#CBD5E1] text-center">
                <span className="text-[10px] font-medium text-[#64748B]">
                  {kana.system === "hiragana" ? "Chữ Katakana" : "Chữ Hiragana"}
                </span>
                <span className="text-xl font-bold font-japanese text-[#0F172A] my-0.5">
                  {kana.equivalentKana}
                </span>
                {onSelectEquivalent && (
                  <button
                    type="button"
                    onClick={() => onSelectEquivalent(kana.equivalentKana!)}
                    className="text-[10px] font-semibold text-[#2684D9] hover:underline cursor-pointer"
                  >
                    Xem chi tiết &rarr;
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stroke Order Presenter */}
        <KanaStrokeOrder
          character={kana.character}
          strokeCount={kana.strokeCount}
          strokeAssetUrl={kana.strokeAssetUrl}
        />

        {/* Mnemonic / Memory Tip */}
        {kana.mnemonicVi && (
          <div className="rounded-[12px] bg-[#FFFBEB] border border-[#FDE68A] p-4 text-xs sm:text-sm text-[#92400E] space-y-1 leading-relaxed">
            <p className="font-bold flex items-center gap-1.5">
              <span>💡</span>
              <span>Gợi ý ghi nhớ hình ảnh:</span>
            </p>
            <p>{kana.mnemonicVi}</p>
          </div>
        )}

        {/* Example Words */}
        {kana.examples && kana.examples.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#0F172A] flex items-center justify-between">
              <span>Từ vựng mẫu ứng dụng</span>
              <span className="text-xs text-[#64748B] font-normal">
                {kana.examples.length} từ ví dụ
              </span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {kana.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0] p-3 flex items-center justify-between gap-2 hover:bg-white hover:border-[#CBD5E1] transition-colors"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-japanese font-bold text-base text-[#0F172A]">
                        {ex.word}
                      </span>
                      <span className="text-xs text-[#12558F] font-japanese">
                        ({ex.reading})
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] italic">{ex.romaji}</p>
                    <p className="text-xs text-[#334155] font-medium truncate">
                      {ex.meaningVi}
                    </p>
                  </div>

                  <AudioButton
                    audioUrl={ex.audioUrl}
                    label={ex.word}
                    size="sm"
                    variant="ghost"
                    showDisabledState={false}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-2 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KanaDetailModal;
