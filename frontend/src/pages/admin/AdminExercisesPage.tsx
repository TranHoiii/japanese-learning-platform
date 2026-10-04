import React, { useEffect, useState } from "react";
import { adminExerciseApi } from "../../services/adminExerciseApi";
import { adminLessonApi } from "../../services/adminLessonApi";
import {
  AdminExercise,
  AdminExerciseRequest,
  AdminLesson,
} from "../../types/admin";

export const AdminExercisesPage: React.FC = () => {
  const [exercises, setExercises] = useState<AdminExercise[]>([]);
  const [lessons, setLessons] = useState<AdminLesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal Create/Edit
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingExercise, setEditingExercise] = useState<AdminExercise | null>(null);
  const [formData, setFormData] = useState<AdminExerciseRequest>({
    lessonId: 0,
    title: "",
    description: "",
    exerciseType: "PRACTICE",
    contentType: "MIXED",
    sortOrder: 1,
    questions: [],
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete modal
  const [deletingExercise, setDeletingExercise] = useState<AdminExercise | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchLessons = async () => {
    try {
      const data = await adminLessonApi.getLessons();
      setLessons(data);
    } catch {
      // ignore
    }
  };

  const fetchExercises = async (lessonId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const lsnId = lessonId ? parseInt(lessonId) : undefined;
      const data = await adminExerciseApi.getExercises(lsnId);
      setExercises(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể tải danh sách bài tập");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
    fetchExercises();
  }, []);

  const handleLessonFilter = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    fetchExercises(lessonId);
  };

  const openCreateModal = () => {
    setEditingExercise(null);
    const defaultLessonId = selectedLessonId ? parseInt(selectedLessonId) : lessons[0]?.id || 0;
    setFormData({
      lessonId: defaultLessonId,
      title: "",
      description: "",
      exerciseType: "PRACTICE",
      contentType: "MIXED",
      sortOrder: exercises.length + 1,
      questions: [
        {
          questionText: "",
          questionType: "MULTIPLE_CHOICE",
          explanation: "",
          sortOrder: 1,
          options: [
            { optionText: "", correct: true, sortOrder: 1 },
            { optionText: "", correct: false, sortOrder: 2 },
          ],
        },
      ],
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (ex: AdminExercise) => {
    setEditingExercise(ex);
    setFormData({
      lessonId: ex.lessonId,
      title: ex.title,
      description: ex.description || "",
      exerciseType: ex.exerciseType,
      contentType: ex.contentType,
      sortOrder: ex.sortOrder,
      questions: ex.questions.map((q) => ({
        questionText: q.questionText,
        questionType: q.questionType,
        explanation: q.explanation || "",
        sortOrder: q.sortOrder,
        options: q.options.map((opt) => ({
          optionText: opt.optionText,
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
          questionText: "",
          questionType: "MULTIPLE_CHOICE",
          explanation: "",
          sortOrder: (formData.questions?.length || 0) + 1,
          options: [
            { optionText: "", correct: true, sortOrder: 1 },
            { optionText: "", correct: false, sortOrder: 2 },
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
      { optionText: "", correct: false, sortOrder: (q.options?.length || 0) + 1 },
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
      if (editingExercise) {
        await adminExerciseApi.update(editingExercise.id, formData);
      } else {
        await adminExerciseApi.create(formData);
      }
      setIsModalOpen(false);
      fetchExercises(selectedLessonId);
    } catch (err: any) {
      setFormError(err.response?.data?.message || "Lỗi khi lưu bài tập");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingExercise) return;
    setSubmitting(true);
    setDeleteError(null);

    try {
      await adminExerciseApi.delete(deletingExercise.id);
      setDeletingExercise(null);
      fetchExercises(selectedLessonId);
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || "Không thể xóa bài tập");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Quản lý Bài tập (Exercise)</h2>
          <p className="text-sm text-slate-500 mt-1">Quản lý bài tập trắc nghiệm, các câu hỏi và đáp án đúng</p>
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
            + Thêm bài tập mới
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
            Đang tải danh sách bài tập...
          </div>
        ) : exercises.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-base font-semibold">Chưa có bài tập nào</p>
            <p className="text-xs mt-1 text-slate-500">Hãy bấm nút "Thêm bài tập mới" để tạo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Bài học</th>
                  <th className="py-3.5 px-6">Tiêu đề bài tập</th>
                  <th className="py-3.5 px-6">Loại bài tập</th>
                  <th className="py-3.5 px-6">Loại nội dung</th>
                  <th className="py-3.5 px-6">Câu hỏi</th>
                  <th className="py-3.5 px-6">Thứ tự</th>
                  <th className="py-3.5 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {exercises.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-500 font-semibold whitespace-nowrap">
                      {ex.levelCode} - Bài {ex.lessonNumber}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-800">{ex.title}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                        {ex.exerciseType}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {ex.contentType}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {ex.questions.length} câu hỏi
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-mono">{ex.sortOrder}</td>
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(ex)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => {
                          setDeletingExercise(ex);
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
                {editingExercise ? "Chỉnh sửa Bài tập" : "Thêm Bài tập Mới"}
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Tiêu đề bài tập *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Trắc nghiệm Từ vựng & Ngữ pháp bài 1"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Loại bài tập (Exercise Type) *</label>
                  <select
                    required
                    value={formData.exerciseType}
                    onChange={(e) => setFormData({ ...formData, exerciseType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                  >
                    <option value="PRACTICE">Luyện tập (PRACTICE)</option>
                    <option value="QUIZ">Trắc nghiệm nhanh (QUIZ)</option>
                    <option value="EXAM">Kiểm tra (EXAM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Loại nội dung (Content Type) *</label>
                  <select
                    required
                    value={formData.contentType}
                    onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                  >
                    <option value="MIXED">Tổng hợp (MIXED)</option>
                    <option value="VOCABULARY">Từ vựng (VOCABULARY)</option>
                    <option value="GRAMMAR">Ngữ pháp (GRAMMAR)</option>
                    <option value="KANJI">Hán tự (KANJI)</option>
                    <option value="LISTENING">Nghe hiểu (LISTENING)</option>
                    <option value="READING">Đọc hiểu (READING)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả bài tập</label>
                <textarea
                  rows={2}
                  placeholder="Hướng dẫn làm bài tập..."
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                        placeholder="Nội dung câu hỏi (Ví dụ: Điền trợ từ thích hợp vào chỗ trống: わたし___がくせいです。)"
                        value={q.questionText}
                        onChange={(e) => {
                          const next = [...(formData.questions || [])];
                          next[qIdx].questionText = e.target.value;
                          setFormData({ ...formData, questions: next });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Giải thích đáp án (Hiển thị sau khi học viên nộp bài)"
                        value={q.explanation || ""}
                        onChange={(e) => {
                          const next = [...(formData.questions || [])];
                          next[qIdx].explanation = e.target.value;
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
                            name={`correct-exercise-${qIdx}`}
                            checked={opt.correct}
                            onChange={() => setCorrectOption(qIdx, optIdx)}
                            title="Chọn làm đáp án đúng"
                            className="text-emerald-600 focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                          />
                          <input
                            type="text"
                            required
                            placeholder={`Lựa chọn ${optIdx + 1}`}
                            value={opt.optionText}
                            onChange={(e) => {
                              const next = [...(formData.questions || [])];
                              if (next[qIdx]?.options?.[optIdx]) {
                                next[qIdx].options![optIdx].optionText = e.target.value;
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
                  {submitting ? "Đang lưu..." : editingExercise ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingExercise && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-800 mb-2">Xác nhận xóa bài tập?</h3>
            <p className="text-xs text-slate-500 mb-4">
              Bạn có chắc chắn muốn xóa bài tập <strong>{deletingExercise.title}</strong> cùng toàn bộ câu hỏi và đáp án liên quan?
            </p>

            {deleteError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeletingExercise(null)}
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

export default AdminExercisesPage;
