import React, { useEffect, useState } from "react";
import { adminVocabularyApi } from "../../services/adminVocabularyApi";
import { adminLessonApi } from "../../services/adminLessonApi";
import { adminLevelApi } from "../../services/adminLevelApi";
import { AdminVocabulary, AdminVocabularyRequest, AdminLesson, AdminLevel } from "../../types/admin";

export const AdminVocabulariesPage: React.FC = () => {
  const [vocabularies, setVocabularies] = useState<AdminVocabulary[]>([]);
  const [lessons, setLessons] = useState<AdminLesson[]>([]);
  const [levels, setLevels] = useState<AdminLevel[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  const [selectedLevelId, setSelectedLevelId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingVocab, setEditingVocab] = useState<AdminVocabulary | null>(null);
  const [formData, setFormData] = useState<AdminVocabularyRequest>({
    lessonId: 0,
    hiragana: "",
    kanji: "",
    hanViet: "",
    meaning: "",
    partOfSpeech: "",
    audioUrl: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete modal
  const [deletingVocab, setDeletingVocab] = useState<AdminVocabulary | null>(null);
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

  const fetchVocabularies = async (lessonId?: string, levelId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const params: { lessonId?: number; levelId?: number } = {};
      if (lessonId) params.lessonId = parseInt(lessonId);
      if (levelId) params.levelId = parseInt(levelId);
      const data = await adminVocabularyApi.getVocabularies(params);
      setVocabularies(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể tải danh sách từ vựng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
    fetchVocabularies();
  }, []);

  const handleLessonFilter = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    fetchVocabularies(lessonId, selectedLevelId);
  };

  const handleLevelFilter = (levelId: string) => {
    setSelectedLevelId(levelId);
    fetchVocabularies(selectedLessonId, levelId);
  };

  const openCreateModal = () => {
    setEditingVocab(null);
    const defaultLessonId = selectedLessonId ? parseInt(selectedLessonId) : lessons[0]?.id || 0;
    setFormData({
      lessonId: defaultLessonId,
      hiragana: "",
      kanji: "",
      hanViet: "",
      meaning: "",
      partOfSpeech: "Danh từ",
      audioUrl: "",
      notes: "",
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (v: AdminVocabulary) => {
    setEditingVocab(v);
    setFormData({
      lessonId: v.lessonId,
      hiragana: v.hiragana,
      kanji: v.kanji || "",
      hanViet: v.hanViet || "",
      meaning: v.meaning,
      partOfSpeech: v.partOfSpeech || "",
      audioUrl: v.audioUrl || "",
      notes: v.notes || "",
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      if (editingVocab) {
        await adminVocabularyApi.update(editingVocab.id, formData);
      } else {
        await adminVocabularyApi.create(formData);
      }
      setIsModalOpen(false);
      fetchVocabularies(selectedLessonId, selectedLevelId);
    } catch (err: any) {
      setFormError(err.response?.data?.message || "Lỗi khi lưu từ vựng");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingVocab) return;
    setSubmitting(true);
    setDeleteError(null);

    try {
      await adminVocabularyApi.delete(deletingVocab.id);
      setDeletingVocab(null);
      fetchVocabularies(selectedLessonId, selectedLevelId);
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || "Không thể xóa từ vựng này");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Quản lý Từ vựng (Vocabulary)</h2>
          <p className="text-sm text-slate-500 mt-1">Danh sách từ vựng theo bài học và cấp độ</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Level Filter */}
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

          {/* Lesson Filter */}
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
            + Thêm từ vựng mới
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
            Đang tải danh sách từ vựng...
          </div>
        ) : vocabularies.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-base font-semibold">Chưa có từ vựng nào</p>
            <p className="text-xs mt-1 text-slate-500">Hãy chọn bài học khác hoặc bấm nút "Thêm từ vựng mới".</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Bài học</th>
                  <th className="py-3.5 px-6">Hiragana</th>
                  <th className="py-3.5 px-6">Kanji</th>
                  <th className="py-3.5 px-6">Hán Việt</th>
                  <th className="py-3.5 px-6">Ý nghĩa</th>
                  <th className="py-3.5 px-6">Từ loại</th>
                  <th className="py-3.5 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {vocabularies.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-500 font-semibold whitespace-nowrap">
                      {v.levelCode} - Bài {v.lessonNumber}
                    </td>
                    <td className="py-4 px-6 font-bold text-indigo-700 text-base">{v.hiragana}</td>
                    <td className="py-4 px-6 font-bold text-slate-800 text-base">{v.kanji || "—"}</td>
                    <td className="py-4 px-6 text-slate-600">{v.hanViet || "—"}</td>
                    <td className="py-4 px-6 text-slate-800 max-w-xs">{v.meaning}</td>
                    <td className="py-4 px-6 text-slate-500 text-xs">{v.partOfSpeech || "—"}</td>
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(v)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => {
                          setDeletingVocab(v);
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
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                {editingVocab ? "Chỉnh sửa Từ vựng" : "Thêm Từ vựng Mới"}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hiragana *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: がくせい"
                    value={formData.hiragana}
                    onChange={(e) => setFormData({ ...formData, hiragana: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kanji</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 学生"
                    value={formData.kanji || ""}
                    onChange={(e) => setFormData({ ...formData, kanji: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hán Việt</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Học sinh"
                    value={formData.hanViet || ""}
                    onChange={(e) => setFormData({ ...formData, hanViet: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Từ loại</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Danh từ, Động từ nhóm 1"
                    value={formData.partOfSpeech || ""}
                    onChange={(e) => setFormData({ ...formData, partOfSpeech: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ý nghĩa tiếng Việt *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Học sinh, sinh viên..."
                  value={formData.meaning}
                  onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Đường dẫn Audio (URL)</label>
                <input
                  type="text"
                  placeholder="https://... hoặc /audio/..."
                  value={formData.audioUrl || ""}
                  onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ghi chú thêm</label>
                <textarea
                  rows={2}
                  placeholder="Lưu ý cách dùng hoặc ngữ cảnh..."
                  value={formData.notes || ""}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                ></textarea>
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
                  {submitting ? "Đang lưu..." : editingVocab ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingVocab && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-800 mb-2">Xác nhận xóa từ vựng?</h3>
            <p className="text-xs text-slate-500 mb-4">
              Bạn có chắc chắn muốn xóa từ vựng <strong>{deletingVocab.hiragana} ({deletingVocab.meaning})</strong>?
            </p>

            {deleteError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeletingVocab(null)}
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

export default AdminVocabulariesPage;
