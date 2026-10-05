import React, { useEffect, useState } from "react";
import { adminReadingApi } from "../../services/adminReadingApi";
import { adminLessonApi } from "../../services/adminLessonApi";
import {
  AdminReading,
  AdminReadingRequest,
  AdminLesson,
} from "../../types/admin";

export const AdminReadingsPage: React.FC = () => {
  const [readings, setReadings] = useState<AdminReading[]>([]);
  const [lessons, setLessons] = useState<AdminLesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal Create/Edit
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingReading, setEditingReading] = useState<AdminReading | null>(null);
  const [formData, setFormData] = useState<AdminReadingRequest>({
    lessonId: 0,
    title: "",
    content: "",
    translation: "",
    imageUrl: "",
    sortOrder: 1,
    questions: [],
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete modal
  const [deletingReading, setDeletingReading] = useState<AdminReading | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchLessons = async () => {
    try {
      const data = await adminLessonApi.getLessons();
      setLessons(data);
    } catch {
      // ignore
    }
  };

  const fetchReadings = async (lessonId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const lsnId = lessonId ? parseInt(lessonId) : undefined;
      const data = await adminReadingApi.getReadings(lsnId);
      setReadings(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể tải danh sách bài đọc");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
    fetchReadings();
  }, []);

  const handleLessonFilter = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    fetchReadings(lessonId);
  };

  const openCreateModal = () => {
    setEditingReading(null);
    const defaultLessonId = selectedLessonId ? parseInt(selectedLessonId) : lessons[0]?.id || 0;
    setFormData({
      lessonId: defaultLessonId,
      title: "",
      content: "",
      translation: "",
      imageUrl: "",
      sortOrder: readings.length + 1,
      questions: [
        {
          question: "",
          questionType: "MULTIPLE_CHOICE",
          explanation: "",
          imageUrl: "",
          sortOrder: 1,
          options: [
            { content: "", correct: true, sortOrder: 1 },
            { content: "", correct: false, sortOrder: 2 },
          ],
        },
      ],
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (r: AdminReading) => {
    setEditingReading(r);
    setFormData({
      lessonId: r.lessonId,
      title: r.title,
      content: r.content,
      translation: r.translation || "",
      imageUrl: r.imageUrl || "",
      sortOrder: r.sortOrder,
      questions: r.questions.map((q) => ({
        question: q.question,
        questionType: q.questionType,
        explanation: q.explanation || "",
        imageUrl: q.imageUrl || "",
        sortOrder: q.sortOrder,
        options: q.options.map((opt) => ({
          content: opt.content,
          correct: opt.correct,
          sortOrder: opt.sortOrder,
        })),
      })),
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const addQuestionField = () => {
    setFormData({
      ...formData,
      questions: [
        ...(formData.questions || []),
        {
          question: "",
          questionType: "MULTIPLE_CHOICE",
          explanation: "",
          imageUrl: "",
          sortOrder: (formData.questions?.length || 0) + 1,
          options: [
            { content: "", correct: true, sortOrder: 1 },
            { content: "", correct: false, sortOrder: 2 },
          ],
        },
      ],
    });
  };

  const removeQuestionField = (qIdx: number) => {
    const next = [...(formData.questions || [])];
    next.splice(qIdx, 1);
    setFormData({ ...formData, questions: next });
  };

  const addOptionField = (qIdx: number) => {
    const next = [...(formData.questions || [])];
    const q = next[qIdx];
    q.options = [
      ...(q.options || []),
      { content: "", correct: false, sortOrder: (q.options?.length || 0) + 1 },
    ];
    setFormData({ ...formData, questions: next });
  };

  const removeOptionField = (qIdx: number, optIdx: number) => {
    const next = [...(formData.questions || [])];
    next[qIdx].options?.splice(optIdx, 1);
    setFormData({ ...formData, questions: next });
  };

  const setCorrectOption = (qIdx: number, optIdx: number) => {
    const next = [...(formData.questions || [])];
    const opts = next[qIdx].options || [];
    opts.forEach((o, i) => {
      o.correct = i === optIdx;
    });
    setFormData({ ...formData, questions: next });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      if (editingReading) {
        await adminReadingApi.update(editingReading.id, formData);
      } else {
        await adminReadingApi.create(formData);
      }
      setIsModalOpen(false);
      fetchReadings(selectedLessonId);
    } catch (err: any) {
      setFormError(err.response?.data?.message || "Lỗi khi lưu bài đọc");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingReading) return;
    setSubmitting(true);
    setDeleteError(null);

    try {
      await adminReadingApi.delete(deletingReading.id);
      setDeletingReading(null);
      fetchReadings(selectedLessonId);
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || "Không thể xóa bài đọc");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Quản lý Luyện đọc (Reading)</h2>
          <p className="text-sm text-slate-500 mt-1">Đoạn văn đọc hiểu, bản dịch và câu hỏi trắc nghiệm</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedLessonId}
            onChange={(e) => handleLessonFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="">Tất cả bài học</option>
            {lessons.map((lsn) => (
              <option key={lsn.id} value={lsn.id}>
                {lsn.levelCode} - Bài {lsn.lessonNumber}: {lsn.title}
              </option>
            ))}
          </select>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 shadow-xs transition-colors"
          >
            + Thêm bài đọc mới
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            Đang tải danh sách bài đọc...
          </div>
        ) : readings.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-base font-semibold">Chưa có bài đọc nào</p>
            <p className="text-xs mt-1 text-slate-500">Hãy bấm nút "Thêm bài đọc mới" để tạo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Bài học</th>
                  <th className="py-3.5 px-6">Tiêu đề bài đọc</th>
                  <th className="py-3.5 px-6">Nội dung đoạn văn</th>
                  <th className="py-3.5 px-6">Câu hỏi</th>
                  <th className="py-3.5 px-6">Thứ tự</th>
                  <th className="py-3.5 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {readings.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-500 font-semibold whitespace-nowrap">
                      {r.levelCode} - Bài {r.lessonNumber}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-800">{r.title}</td>
                    <td className="py-4 px-6 text-xs text-slate-600 max-w-sm truncate">
                      {r.content}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {r.questions.length} câu hỏi
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-mono">{r.sortOrder}</td>
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(r)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => {
                          setDeletingReading(r);
                          setDeleteError(null);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Create / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                {editingReading ? "Chỉnh sửa Bài đọc" : "Thêm Bài đọc Mới"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Thuộc Bài học *</label>
                  <select
                    required
                    value={formData.lessonId}
                    onChange={(e) => setFormData({ ...formData, lessonId: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                  >
                    <option value={0}>-- Chọn bài học --</option>
                    {lessons.map((lsn) => (
                      <option key={lsn.id} value={lsn.id}>
                        {lsn.levelCode} - Bài {lsn.lessonNumber}: {lsn.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Thứ tự sắp xếp *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tiêu đề bài đọc *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Đoạn văn giới thiệu bản thân"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hình ảnh đính kèm (URL nếu có)</label>
                <input
                  type="text"
                  placeholder="https://... hoặc /images/..."
                  value={formData.imageUrl || ""}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung đoạn văn tiếng Nhật *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Nội dung bài đọc tiếng Nhật (Hiragana, Kanji)..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bản dịch tiếng Việt (Tuỳ chọn)</label>
                <textarea
                  rows={3}
                  placeholder="Dịch nghĩa tham khảo cho học viên..."
                  value={formData.translation || ""}
                  onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                ></textarea>
              </div>

              {/* Questions Section */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Danh sách câu hỏi & Đáp án đúng ({formData.questions?.length || 0})
                  </h4>
                  <button
                    type="button"
                    onClick={addQuestionField}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    + Thêm câu hỏi
                  </button>
                </div>

                {formData.questions?.map((q, qIdx) => (
                  <div key={qIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-700">Câu hỏi #{qIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeQuestionField(qIdx)}
                        className="text-xs text-rose-600 font-semibold"
                      >
                        Xóa câu hỏi
                      </button>
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Nội dung câu hỏi (Ví dụ: Tác giả là người nước nào?)"
                        value={q.question}
                        onChange={(e) => {
                          const next = [...(formData.questions || [])];
                          next[qIdx].question = e.target.value;
                          setFormData({ ...formData, questions: next });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Options list with correct flag */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Các lựa chọn (Tích tròn chọn đáp án ĐÚNG)
                        </span>
                        <button
                          type="button"
                          onClick={() => addOptionField(qIdx)}
                          className="text-[11px] font-semibold text-indigo-600 hover:underline"
                        >
                          + Thêm lựa chọn
                        </button>
                      </div>

                      {q.options?.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`correct-reading-${qIdx}`}
                            checked={opt.correct}
                            onChange={() => setCorrectOption(qIdx, optIdx)}
                            title="Chọn làm đáp án đúng"
                            className="text-emerald-600 focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                          />
                          <input
                            type="text"
                            required
                            placeholder={`Lựa chọn ${optIdx + 1}`}
                            value={opt.content}
                            onChange={(e) => {
                              const next = [...(formData.questions || [])];
                              if (next[qIdx]?.options?.[optIdx]) {
                                next[qIdx].options![optIdx].content = e.target.value;
                                setFormData({ ...formData, questions: next });
                              }
                            }}
                            className={`flex-1 px-3 py-1.5 rounded-lg border text-xs bg-white focus:outline-none ${
                              opt.correct
                                ? "border-emerald-500 ring-1 ring-emerald-500/20 font-semibold text-emerald-900"
                                : "border-slate-300"
                            }`}
                          />
                          {opt.correct && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              Đúng
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeOptionField(qIdx, optIdx)}
                            className="text-slate-400 hover:text-rose-600 text-sm px-1"
                            title="Xóa lựa chọn"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 shadow-xs transition-colors disabled:opacity-50"
                >
                  {submitting ? "Đang lưu..." : editingReading ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingReading && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-800 mb-2">Xác nhận xóa bài đọc?</h3>
            <p className="text-xs text-slate-500 mb-4">
              Bạn có chắc chắn muốn xóa bài đọc <strong>{deletingReading.title}</strong> cùng toàn bộ câu hỏi và đáp án liên quan?
            </p>

            {deleteError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeletingReading(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                disabled={submitting}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-500 shadow-xs transition-colors disabled:opacity-50"
              >
                {submitting ? "Đang xóa..." : "Xác nhận xóa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReadingsPage;
