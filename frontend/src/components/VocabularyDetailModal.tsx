import { Vocabulary } from "../types/vocabulary";
import FavoriteButton from "./favorite/FavoriteButton";

interface VocabularyDetailModalProps {
  vocabulary: Vocabulary | null;
  onClose: () => void;
}

export default function VocabularyDetailModal({
  vocabulary,
  onClose,
}: VocabularyDetailModalProps) {
  if (!vocabulary) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <FavoriteButton
              contentType="VOCABULARY"
              contentId={vocabulary.id}
              size="sm"
            />
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="text-xs uppercase tracking-wider text-indigo-300 font-semibold mb-1">
            Chi tiết từ vựng #{vocabulary.id}
          </div>
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl font-extrabold jp-font tracking-wide">
              {vocabulary.hiragana}
            </h2>
            <button
              type="button"
              onClick={() => {
                if ("speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                  const u = new SpeechSynthesisUtterance(vocabulary.hiragana || vocabulary.kanji || "");
                  u.lang = "ja-JP";
                  u.rate = 0.9;
                  window.speechSynthesis.speak(u);
                }
              }}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-indigo-600 text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
              title="Phát âm"
            >
              🔊
            </button>
          </div>
          {vocabulary.kanji && (
            <div className="text-xl text-slate-300 font-medium kanji-text mt-1">
              {vocabulary.kanji}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Hiragana */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              HIRAGANA
            </span>
            <span className="text-xl font-bold text-slate-900 jp-font">
              {vocabulary.hiragana}
            </span>
          </div>

          {/* Kanji & Han Viet Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                KANJI
              </span>
              <span className="text-lg font-bold text-slate-800 kanji-text">
                {vocabulary.kanji || <span className="text-slate-400 font-normal italic">[Trống]</span>}
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                HÁN VIỆT
              </span>
              <span className="text-lg font-bold text-indigo-600">
                {vocabulary.hanViet || <span className="text-slate-400 font-normal italic">[Trống]</span>}
              </span>
            </div>
          </div>

          {/* Meaning */}
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/50">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
              Ý NGHĨA
            </span>
            <p className="text-slate-900 font-medium text-base leading-relaxed">
              {vocabulary.meaning}
            </p>
          </div>

          {/* Audio & Notes */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <button
                disabled
                className="px-3.5 py-2 rounded-lg bg-slate-100 text-slate-400 font-medium text-xs flex items-center space-x-1.5 cursor-not-allowed border border-slate-200/60"
                title="Chưa có file âm thanh"
              >
                <span>🔊</span>
                <span>Âm thanh (Chưa có)</span>
              </button>
            </div>

            {vocabulary.partOfSpeech && (
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                {vocabulary.partOfSpeech}
              </span>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
