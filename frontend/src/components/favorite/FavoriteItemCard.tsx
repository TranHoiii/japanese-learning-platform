import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Favorite, FavoriteContentType } from "../../types/favorite";

export interface FavoriteItemCardProps {
  favorite?: Favorite;
  item?: Favorite;
  onDelete: (id: number) => Promise<void>;
  isDeleting?: boolean;
}

export default function FavoriteItemCard({
  favorite,
  item,
  onDelete,
  isDeleting = false,
}: FavoriteItemCardProps) {
  const fav = favorite || item;
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!fav) return null;

  const getContentTypeConfig = (type: FavoriteContentType) => {
    switch (type) {
      case "VOCABULARY":
        return {
          label: "Từ vựng",
          bgClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300/60 dark:border-emerald-700/60",
          link: `/vocabulary/${fav.contentId}`,
          icon: "📖",
          kanji: "語",
        };
      case "GRAMMAR":
        return {
          label: "Ngữ pháp",
          bgClass: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-300/60 dark:border-blue-700/60",
          link: `/grammar/${fav.contentId}`,
          icon: "⛩️",
          kanji: "文",
        };
      case "KANJI":
        return {
          label: "Kanji",
          bgClass: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-300/60 dark:border-rose-700/60",
          link: `/kanjis/${fav.contentId}`,
          icon: "🈸",
          kanji: "字",
        };
      case "LISTENING":
        return {
          label: "Bài nghe",
          bgClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-300/60 dark:border-amber-700/60",
          link: `/listenings/${fav.contentId}`,
          icon: "🎧",
          kanji: "聴",
        };
      case "READING":
        return {
          label: "Bài đọc",
          bgClass: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-300/60 dark:border-purple-700/60",
          link: `/readings/${fav.contentId}`,
          icon: "📰",
          kanji: "読",
        };
      case "EXERCISE":
        return {
          label: "Bài tập",
          bgClass: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-300/60 dark:border-indigo-700/60",
          link: `/exercises/${fav.contentId}`,
          icon: "✍️",
          kanji: "習",
        };
      default:
        return {
          label: type,
          bgClass: "bg-slate-100 text-slate-700 border-slate-200",
          link: undefined,
          icon: "📌",
          kanji: "記",
        };
    }
  };

  const config = getContentTypeConfig(fav.contentType);

  const formatDate = (dateStr: string): string => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await onDelete(fav.id);
    setConfirmDelete(false);
  };

  return (
    <div
      className="surface rounded-2xl border border-[#E7E0D2] p-5 flex flex-col justify-between shadow-2xs hover:shadow-zen hover:border-rose-400 dark:hover:border-rose-500 transition-all duration-200 relative overflow-hidden group"
      id={`favorite-card-${fav.id}`}
    >
      {/* Decorative Kanji seal watermark */}
      <div
        aria-hidden="true"
        className="absolute top-2 right-3 text-5xl font-mincho font-black text-slate-400/10 dark:text-white/5 select-none pointer-events-none group-hover:scale-110 transition-transform"
      >
        {config.kanji}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${config.bgClass}`}
          >
            <span>{config.icon}</span>
            <span>{config.label}</span>
          </span>

          <div>
            {confirmDelete ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDelete}
                  id={`confirm-delete-btn-${fav.id}`}
                  className="px-2.5 py-1 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {isDeleting ? "Đang xóa..." : "Xác nhận xóa"}
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setConfirmDelete(false)}
                  className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                id={`delete-favorite-btn-${fav.id}`}
                title="Xóa khỏi danh sách yêu thích"
                className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="mb-4">
          {config.link ? (
            <Link
              to={config.link}
              className="text-base sm:text-lg font-bold font-mincho text-slate-900 dark:text-slate-100 hover:text-rose-600 dark:hover:text-rose-400 transition-colors line-clamp-2 block"
            >
              {config.label} #{fav.contentId}
            </Link>
          ) : (
            <h3 className="text-base sm:text-lg font-bold font-mincho text-slate-900 dark:text-slate-100 line-clamp-2">
              {config.label} #{fav.contentId}
            </h3>
          )}
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block font-mono">
            Mã định danh: #{fav.contentId}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 relative z-10">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Đã lưu:
        </span>
        <span className="font-medium text-slate-700 dark:text-slate-300">{formatDate(fav.createdAt)}</span>
      </div>
    </div>
  );
}
