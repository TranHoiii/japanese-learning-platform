import React, { useEffect, useState } from "react";
import { adminGrammarApi } from "../../services/adminGrammarApi";
import { adminLessonApi } from "../../services/adminLessonApi";
import { adminLevelApi } from "../../services/adminLevelApi";
import {
  AdminGrammar,
  AdminGrammarRequest,
  AdminGrammarExampleRequest,
  AdminLesson,
  AdminLevel,
} from "../../types/admin";

export const AdminGrammarsPage: React.FC = () => {
  const [grammars, setGrammars] = useState<AdminGrammar[]>([]);
  const [lessons, setLessons] = useState<AdminLesson[]>([]);
  const [levels, setLevels] = useState<AdminLevel[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  const [selectedLevelId, setSelectedLevelId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingGrammar, setEditingGrammar] = useState<AdminGrammar | null>(null);
  const [formData, setFormData] = useState<AdminGrammarRequest>({
    lessonId: 0,
    pattern: "",
    meaning: "",
    usage: "",
    explanation: "",
    notes: "",
    sortOrder: 1,
    examples: [],
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete modal
  const [deletingGrammar, setDeletingGrammar] = useState<AdminGrammar | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchFilters = async () => {
    try {
      const [lvls, lsns] = await Promise.all([adminLevelApi.getAll(), adminLessonApi.getLessons()]);
      setLevels(lvls);
      setLessons(lsns);
    } catch {
      // ignore
    }
  };

  const fetchGrammars = async (lessonId?: string, levelId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const params: { lessonId?: number; levelId?: number } = {};
      if (lessonId) params.lessonId = parseInt(lessonId);
      if (levelId) params.levelId = parseInt(levelId);
      const data = await adminGrammarApi.getGrammars(params);
      setGrammars(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể tải danh sách ngữ pháp");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
    fetchGrammars();
  }, []);

  const handleLessonFilter = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    fetchGrammars(lessonId, selectedLevelId);
  };

  const handleLevelFilter = (levelId: string) => {
    setSelectedLevelId(levelId);
    fetchGrammars(selectedLessonId, levelId);
  };

  const openCreateModal = () => {
    setEditingGrammar(null);
    const defaultLessonId = selectedLessonId ? parseInt(selectedLessonId) : lessons[0]?.id || 0;
    setFormData({
      lessonId: defaultLessonId,
      pattern: "",
      meaning: "",
      usage: "",
      explanation: "",
      notes: "",
      sortOrder: grammars.length + 1,
      examples: [
        {
          japanese: "",
          furigana: "",
          translation: "",
          explanation: "",
          sortOrder: 1,
        },
      ],
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (g: AdminGrammar) => {
    setEditingGrammar(g);
    setFormData({
      lessonId: g.lessonId,
      pattern: g.pattern,
      meaning: g.meaning || "",
      usage: g.usage || "",
      explanation: g.explanation || "",
      notes: g.notes || "",
      sortOrder: g.sortOrder,
      examples: g.examples.map((ex) => ({
        japanese: ex.japanese,
        furigana: ex.furigana || "",
        translation: ex.translation || "",
        explanation: ex.explanation || "",
        sortOrder: ex.sortOrder,
      })),
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const addExampleField = () => {
    setFormData({
      ...formData,
      examples: [
        ...(formData.examples || []),
        {
          japanese: "",
          furigana: "",
          translation: "",
          explanation: "",
          sortOrder: (formData.examples?.length || 0) + 1,
        },
      ],
    });
  };

  const removeExampleField = (index: number) => {
    const next = [...(formData.examples || [])];
    next.splice(index, 1);
    setFormData({ ...formData, examples: next });
  };

  const updateExampleField = (index: number, field: keyof AdminGrammarExampleRequest, val: any) => {
    const next = [...(formData.examples || [])];
    next[index] = { ...next[index], [field]: val };
    setFormData({ ...formData, examples: next });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      if (editingGrammar) {
        await adminGrammarApi.update(editingGrammar.id, formData);
      } else {
        await adminGrammarApi.create(formData);
      }
      setIsModalOpen(false);
      fetchGrammars(selectedLessonId, selectedLevelId);
    } catch (err: any) {
      setFormError(err.response?.data?.message || "Lỗi khi lưu ngữ pháp");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingGrammar) return;
    setSubmitting(true);
    setDeleteError(null);

    try {
      await adminGrammarApi.delete(deletingGrammar.id);
      setDeletingGrammar(null);
      fetchGrammars(selectedLessonId, selectedLevelId);
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || "Không thể xóa ngữ pháp này");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Quản lý Ngữ pháp (Grammar)</h2>
          <p className="text-sm text-slate-500 mt-1">Danh sách cấu trúc ngữ pháp và ví dụ minh họa</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedLevelId}
            onChange={(e) => handleLevelFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="">Tất cả cấp độ</option>
            {levels.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                {lvl.code} - {lvl.name}
              </option>
            ))}
          </select>

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
            + Thêm ngữ pháp mới
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
            Đang tải danh sách ngữ pháp...
          </div>
        ) : grammars.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-base font-semibold">Chưa có điểm ngữ pháp nào</p>
            <p className="text-xs mt-1 text-slate-500">Hãy chọn bài học khác hoặc bấm nút "Thêm ngữ pháp mới".</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Bài học</th>
                  <th className="py-3.5 px-6">Mẫu ngữ pháp</th>
                  <th className="py-3.5 px-6">Ý nghĩa</th>
                  <th className="py-3.5 px-6">Ví dụ minh họa</th>
                  <th className="py-3.5 px-6">Thứ tự</th>
                  <th className="py-3.5 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {grammars.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-500 font-semibold whitespace-nowrap">
                      {g.levelCode} - Bài {g.lessonNumber}
                    </td>
                    <td className="py-4 px-6 font-bold text-indigo-700 text-base">{g.pattern}</td>
                    <td className="py-4 px-6 text-slate-800 max-w-xs">{g.meaning || "—"}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {g.examples.length} ví dụ
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-mono">{g.sortOrder}</td>
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(g)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => {
                          setDeletingGrammar(g);
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
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                {editingGrammar ? "Chỉnh sửa Ngữ pháp" : "Thêm Ngữ pháp Mới"}
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Mẫu ngữ pháp (Pattern) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: ~ は ~ です"
                  value={formData.pattern}
                  onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ý nghĩa</label>
                <textarea
                  rows={2}
                  placeholder="Khẳng định: N1 là N2..."
                  value={formData.meaning || ""}
                  onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cách dùng (Usage)</label>
                <textarea
                  rows={2}
                  placeholder="Dùng khi giới thiệu danh tính, nghề nghiệp..."
                  value={formData.usage || ""}
                  onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Giải thích chi tiết</label>
                <textarea
                  rows={2}
                  placeholder="Phân tích ngữ pháp..."
                  value={formData.explanation || ""}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                ></textarea>
              </div>

              {/* Nested Examples Section */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Danh sách ví dụ ({formData.examples?.length || 0})
                  </h4>
                  <button
                    type="button"
                    onClick={addExampleField}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    + Thêm câu ví dụ
                  </button>
                </div>

                {formData.examples?.map((ex, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Ví dụ #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeExampleField(idx)}
                        className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                      >
                        Xóa ví dụ
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Tiếng Nhật (ví dụ: わたしはがくせいです)"
                          value={ex.japanese}
                          onChange={(e) => updateExampleField(idx, "japanese", e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Furigana (tuỳ chọn)"
                          value={ex.furigana || ""}
                          onChange={(e) => updateExampleField(idx, "furigana", e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Bản dịch tiếng Việt (Tôi là học sinh)"
                        value={ex.translation || ""}
                        onChange={(e) => updateExampleField(idx, "translation", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
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
                  {submitting ? "Đang lưu..." : editingGrammar ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingGrammar && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-800 mb-2">Xác nhận xóa ngữ pháp?</h3>
            <p className="text-xs text-slate-500 mb-4">
              Bạn có chắc chắn muốn xóa mẫu ngữ pháp <strong>{deletingGrammar.pattern}</strong> và toàn bộ ví dụ đi kèm?
            </p>

            {deleteError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeletingGrammar(null)}
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

export default AdminGrammarsPage;
