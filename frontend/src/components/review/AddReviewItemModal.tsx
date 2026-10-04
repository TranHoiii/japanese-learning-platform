import React, { useState } from "react";
import { CreateReviewItemRequest, ReviewContentType } from "../../types/review";

interface AddReviewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateReviewItemRequest) => Promise<void>;
}

export default function AddReviewItemModal({
  isOpen,
  onClose,
  onSubmit,
}: AddReviewItemModalProps) {
  const [contentType, setContentType] = useState<ReviewContentType>("VOCABULARY");
  const [contentId, setContentId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(contentId, 10);
    if (isNaN(id) || id <= 0) {
      setError("ID nội dung phải là số nguyên dương lớn hơn 0");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit({
        contentType,
        contentId: id,
      });
      setContentId("");
      onClose();
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      const msg = errorObj.response?.data?.message || "Không thể thêm nội dung vào danh sách ôn tập";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-extrabold text-slate-900">
            Thêm nội dung vào danh sách ôn
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Loại nội dung
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value as ReviewContentType)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="VOCABULARY">Từ vựng (Vocabulary)</option>
              <option value="GRAMMAR">Ngữ pháp (Grammar)</option>
              <option value="KANJI">Kanji (Chữ Hán)</option>
              <option value="LISTENING">Bài nghe (Listening)</option>
              <option value="READING">Bài đọc (Reading)</option>
              <option value="EXERCISE">Bài tập (Exercise)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              ID nội dung
            </label>
            <input
              type="number"
              min="1"
              required
              placeholder="Ví dụ: 1, 2, 10..."
              value={contentId}
              onChange={(e) => setContentId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Nhập mã ID của mục tương ứng mà bạn muốn ôn tập lại.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? "Đang thêm..." : "Thêm vào danh sách"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
