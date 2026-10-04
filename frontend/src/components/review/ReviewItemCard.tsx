import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReviewItemResponse, ReviewResult } from "../../types/review";

interface ReviewItemCardProps {
  item: ReviewItemResponse;
  onReview: (id: number, result: ReviewResult) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isUpdating?: boolean;
}

export default function ReviewItemCard({
  item,
  onReview,
  onDelete,
  isUpdating = false,
}: ReviewItemCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeAction, setActiveAction] = useState<ReviewResult | null>(null);

  const getContentTypeConfig = (type: string) => {
    switch (type) {
      case "VOCABULARY":
        return {
          label: "Từ vựng",
          bgClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
          link: item.contentId ? `/vocabulary/${item.contentId}` : undefined,
        };
      case "GRAMMAR":
        return {
          label: "Ngữ pháp",
          bgClass: "bg-sky-50 text-sky-700 border-sky-200/80",
          link: item.contentId ? `/grammar/${item.contentId}` : undefined,
        };
      case "KANJI":
        return {
          label: "Kanji",
          bgClass: "bg-purple-50 text-purple-700 border-purple-200/80",
          link: item.contentId ? `/kanjis/${item.contentId}` : undefined,
        };
      case "LISTENING":
        return {
          label: "Bài nghe",
          bgClass: "bg-amber-50 text-amber-700 border-amber-200/80",
          link: item.contentId ? `/listenings/${item.contentId}` : undefined,
        };
      case "READING":
        return {
          label: "Bài đọc",
          bgClass: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
          link: item.contentId ? `/readings/${item.contentId}` : undefined,
        };
      case "EXERCISE":
        return {
          label: "Bài tập",
          bgClass: "bg-rose-50 text-rose-700 border-rose-200/80",
          link: item.contentId ? `/exercises/${item.contentId}` : undefined,
        };
      default:
        return {
          label: type,
          bgClass: "bg-slate-100 text-slate-700 border-slate-200",
          link: undefined,
        };
    }
  };

  const typeConfig = getContentTypeConfig(item.contentType);

  const isDue = !item.nextReviewAt || new Date(item.nextReviewAt).getTime() <= Date.now();

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return "Chưa có";
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

  const handleReviewClick = async (result: ReviewResult) => {
    setActiveAction(result);
    try {
      await onReview(item.id, result);
    } finally {
      setActiveAction(null);
    }
  };

  const handleDeleteClick = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(item.id);
    } finally {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-md ${
        isDue ? "border-amber-300 ring-1 ring-amber-100" : "border-slate-200/80"
      }`}
    >
      <div>
        {/* Top Badges & Delete */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${typeConfig.bgClass}`}
            >
              {typeConfig.label}
            </span>

            {item.lessonNumber && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">
                Bài {item.lessonNumber}
              </span>
            )}

            {isDue ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white shadow-xs animate-pulse">
                <span>⏰</span> Đến hạn
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                Chưa đến hạn
              </span>
            )}
          </div>

          {/* Delete Action */}
          <div>
            {confirmDelete ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDeleteClick}
                  className="px-2 py-1 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-xs"
                >
                  {isDeleting ? "..." : "Xóa"}
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setConfirmDelete(false)}
                  className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Hủy
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                title="Xóa khỏi danh sách ôn tập"
                className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
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

        {/* Content Title or Link */}
        <div className="mb-4">
          {typeConfig.link ? (
            <Link
              to={typeConfig.link}
              className="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2 block"
            >
              {item.title || `${typeConfig.label} #${item.contentId}`}
            </Link>
          ) : (
            <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2">
              {item.title || `${typeConfig.label} #${item.contentId}`}
            </h3>
          )}
          <span className="text-xs text-slate-400 mt-0.5 block">
            ID nội dung: #{item.contentId}
          </span>
        </div>

        {/* Learning Statistics */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-center mb-4">
          <div>
            <div className="text-xs text-slate-500 font-medium">Đã nhớ</div>
            <div className="text-sm font-extrabold text-emerald-600">
              {item.correctCount}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Quên/Sai</div>
            <div className="text-sm font-extrabold text-rose-500">
              {item.wrongCount}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Ưu tiên</div>
            <div className="text-sm font-extrabold text-indigo-600">
              {item.priority}
            </div>
          </div>
        </div>

        {/* Review Timeline */}
        <div className="text-xs text-slate-500 space-y-1 mb-5">
          <div className="flex justify-between">
            <span>Ôn lần trước:</span>
            <span className="font-medium text-slate-700">
              {item.lastReviewedAt ? formatDate(item.lastReviewedAt) : "Chưa ôn lần nào"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Lần tới:</span>
            <span
              className={`font-semibold ${
                isDue ? "text-amber-600" : "text-slate-700"
              }`}
            >
              {formatDate(item.nextReviewAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Review Actions */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Đánh giá lần ôn này:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          <button
            type="button"
            disabled={isUpdating || activeAction !== null}
            onClick={() => handleReviewClick("AGAIN")}
            title="Sai hoặc quên hoàn toàn (+1 ngày, tăng ưu tiên)"
            className="flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <span>{activeAction === "AGAIN" ? "..." : "Lại"}</span>
            <span className="text-[10px] font-normal text-rose-500 mt-0.5">+1 ngày</span>
          </button>

          <button
            type="button"
            disabled={isUpdating || activeAction !== null}
            onClick={() => handleReviewClick("HARD")}
            title="Khá khó nhớ (+2 ngày, tăng ưu tiên)"
            className="flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <span>{activeAction === "HARD" ? "..." : "Khó"}</span>
            <span className="text-[10px] font-normal text-amber-500 mt-0.5">+2 ngày</span>
          </button>

          <button
            type="button"
            disabled={isUpdating || activeAction !== null}
            onClick={() => handleReviewClick("GOOD")}
            title="Nhớ tốt (+4 ngày, giảm ưu tiên)"
            className="flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <span>{activeAction === "GOOD" ? "..." : "Tốt"}</span>
            <span className="text-[10px] font-normal text-emerald-500 mt-0.5">+4 ngày</span>
          </button>

          <button
            type="button"
            disabled={isUpdating || activeAction !== null}
            onClick={() => handleReviewClick("EASY")}
            title="Rất dễ (+7 ngày, giảm mạnh ưu tiên)"
            className="flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <span>{activeAction === "EASY" ? "..." : "Dễ"}</span>
            <span className="text-[10px] font-normal text-indigo-500 mt-0.5">+7 ngày</span>
          </button>
        </div>
      </div>
    </div>
  );
}
