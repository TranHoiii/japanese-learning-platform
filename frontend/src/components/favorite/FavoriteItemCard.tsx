import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Favorite, FavoriteContentType } from "../../types/favorite";

interface FavoriteItemCardProps {
  favorite: Favorite;
  onDelete: (id: number) => Promise<void>;
  isDeleting?: boolean;
}

export default function FavoriteItemCard({
  favorite,
  onDelete,
  isDeleting = false,
}: FavoriteItemCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const getContentTypeConfig = (type: FavoriteContentType) => {
    switch (type) {
      case "VOCABULARY":
        return {
          label: "Từ vựng",
          bgClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
          link: `/vocabulary/${favorite.contentId}`,
          icon: "📖",
        };
      case "GRAMMAR":
        return {
          label: "Ngữ pháp",
          bgClass: "bg-sky-50 text-sky-700 border-sky-200/80",
          link: `/grammar/${favorite.contentId}`,
          icon: "📐",
        };
      case "KANJI":
        return {
          label: "Kanji",
          bgClass: "bg-purple-50 text-purple-700 border-purple-200/80",
          link: `/kanjis/${favorite.contentId}`,
          icon: "🈯",
        };
      case "LISTENING":
        return {
          label: "Bài nghe",
          bgClass: "bg-amber-50 text-amber-700 border-amber-200/80",
          link: `/listenings/${favorite.contentId}`,
          icon: "🎧",
        };
      case "READING":
        return {
          label: "Bài đọc",
          bgClass: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
          link: `/readings/${favorite.contentId}`,
          icon: "📰",
        };
      case "EXERCISE":
        return {
          label: "Bài tập",
          bgClass: "bg-rose-50 text-rose-700 border-rose-200/80",
          link: `/exercises/${favorite.contentId}`,
          icon: "✏️",
        };
      default:
        return {
          label: type,
          bgClass: "bg-slate-100 text-slate-700 border-slate-200",
          link: undefined,
          icon: "📌",
        };
    }
  };

  const config = getContentTypeConfig(favorite.contentType);

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
    await onDelete(favorite.id);
    setConfirmDelete(false);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
      id={`favorite-card-${favorite.id}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${config.bgClass}`}
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
                  id={`confirm-delete-btn-${favorite.id}`}
                  className="px-2.5 py-1 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-xs disabled:opacity-50"
                >
                  {isDeleting ? "Đang xóa..." : "Xác nhận xóa"}
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setConfirmDelete(false)}
                  className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Hủy
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                id={`delete-favorite-btn-${favorite.id}`}
                title="Xóa khỏi danh sách yêu thích"
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
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
              className="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2 block"
            >
              {config.label} #{favorite.contentId}
            </Link>
          ) : (
            <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2">
              {config.label} #{favorite.contentId}
            </h3>
          )}
          <span className="text-xs text-slate-400 mt-1 block">
            ID nội dung: #{favorite.contentId}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Đã lưu:
        </span>
        <span className="font-medium text-slate-700">{formatDate(favorite.createdAt)}</span>
      </div>
    </div>
  );
}
