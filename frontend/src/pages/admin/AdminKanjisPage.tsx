import React, { useEffect, useState } from "react";
import { adminKanjiApi } from "../../services/adminKanjiApi";
import { adminLessonApi } from "../../services/adminLessonApi";
import { AdminKanji, AdminKanjiRequest, AdminLesson } from "../../types/admin";

export const AdminKanjisPage: React.FC = () => {
  const [kanjis, setKanjis] = useState<AdminKanji[]>([]);
  const [lessons, setLessons] = useState<AdminLesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal Create/Edit
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingKanji, setEditingKanji] = useState<AdminKanji | null>(null);
  const [formData, setFormData] = useState<AdminKanjiRequest>({
    kanji: "",
    hanViet: "",
    onyomi: "",
    kunyomi: "",
    meaning: "",
    strokeCount: 4,
    strokeOrderUrl: "",
    mnemonic: "",
    mnemonicImageUrl: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Assign modal
  const [assigningKanji, setAssigningKanji] = useState<AdminKanji | null>(null);
  const [assignLessonId, setAssignLessonId] = useState<number>(0);
  const [assignSortOrder, setAssignSortOrder] = useState<number>(1);
  const [assignError, setAssignError] = useState<string | null>(null);

  // Delete modal
  const [deletingKanji, setDeletingKanji] = useState<AdminKanji | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [kData, lData] = await Promise.all([adminKanjiApi.getAll(), adminLessonApi.getLessons()]);
      setKanjis(kData);
      setLessons(lData);
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể tải danh sách chữ Hán");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingKanji(null);
    setFormData({
      kanji: "",
      hanViet: "",
      onyomi: "",
      kunyomi: "",
      meaning: "",
      strokeCount: 4,
      strokeOrderUrl: "",
      mnemonic: "",
      mnemonicImageUrl: "",
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (k: AdminKanji) => {
    setEditingKanji(k);
    setFormData({
      kanji: k.kanji,
      hanViet: k.hanViet || "",
      onyomi: k.onyomi || "",
      kunyomi: k.kunyomi || "",
      meaning: k.meaning || "",
      strokeCount: k.strokeCount || 1,
      strokeOrderUrl: k.strokeOrderUrl || "",
      mnemonic: k.mnemonic || "",
      mnemonicImageUrl: k.mnemonicImageUrl || "",
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      if (editingKanji) {
        await adminKanjiApi.update(editingKanji.id, formData);
      } else {
        await adminKanjiApi.create(formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      setFormError(err.response?.data?.message || "Lỗi khi lưu chữ Hán");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingKanji) return;
    setSubmitting(true);
    setDeleteError(null);

    try {
      await adminKanjiApi.delete(deletingKanji.id);
      setDeletingKanji(null);
      fetchData();
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || "Không thể xóa chữ Hán này");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigningKanji || !assignLessonId) return;
    setSubmitting(true);
    setAssignError(null);

    try {
      await adminLessonApi.assignKanji(assignLessonId, assigningKanji.id, assignSortOrder);
      setAssigningKanji(null);
      fetchData();
    } catch (err: any) {
      setAssignError(err.response?.data?.message || "Lỗi khi gán chữ Hán vào bài học");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnassign = async (kanjiId: number, lessonId: number) => {
    if (!window.confirm("Bạn có chắc muốn hủy gán chữ Hán này khỏi bài học?")) return;
    try {
      await adminLessonApi.unassignKanji(lessonId, kanjiId);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Không thể hủy gán chữ Hán");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Quản lý Chữ Hán (Kanji)</h2>
          <p className="text-sm text-slate-500 mt-1">Danh mục chữ Hán và gán vào bài học liên quan</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 shadow-xs transition-colors"
        >
          + Thêm chữ Hán mới
        </button>
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
            Đang tải danh sách chữ Hán...
          </div>
        ) : kanjis.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-base font-semibold">Chưa có chữ Hán nào</p>
            <p className="text-xs mt-1 text-slate-500">Bấm nút "Thêm chữ Hán mới" để tạo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Chữ Hán</th>
                  <th className="py-3.5 px-6">Hán Việt</th>
                  <th className="py-3.5 px-6">Âm On / Kun</th>
                  <th className="py-3.5 px-6">Ý nghĩa</th>
                  <th className="py-3.5 px-6">Số nét</th>
                  <th className="py-3.5 px-6">Bài học đã gán</th>
                  <th className="py-3.5 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {kanjis.map((k) => (
                  <tr key={k.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-black text-slate-900 text-2xl font-serif">{k.kanji}</td>
                    <td className="py-4 px-6 font-bold text-indigo-700 text-sm">{k.hanViet || "—"}</td>
                    <td className="py-4 px-6 text-xs text-slate-600 space-y-0.5">
                      <div><strong className="text-slate-400">On:</strong> {k.onyomi || "—"}</div>
                      <div><strong className="text-slate-400">Kun:</strong> {k.kunyomi || "—"}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-800 max-w-xs">{k.meaning || "—"}</td>
                    <td className="py-4 px-6 text-slate-600 font-mono">{k.strokeCount || "—"}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {k.assignedLessonIds && k.assignedLessonIds.length > 0 ? (
                          k.assignedLessonIds.map((lsnId) => {
                            const lsn = lessons.find((l) => l.id === lsnId);
                            return (
                              <span
                                key={lsnId}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200"
                              >
                                {lsn ? `${lsn.levelCode}-B${lsn.lessonNumber}` : `Lesson #${lsnId}`}
                                <button
                                  type="button"
                                  onClick={() => handleUnassign(k.id, lsnId)}
                                  className="text-indigo-400 hover:text-rose-600 font-bold ml-0.5"
                                  title="Hủy gán"
                                >
                                  ×
                                </button>
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-xs text-slate-400 italic">Chưa gán</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setAssigningKanji(k);
                          setAssignLessonId(lessons[0]?.id || 0);
                          setAssignSortOrder(1);
                          setAssignError(null);
                        }}
                        className="px-2.5 py-1.5 rounded-lg border border-indigo-200 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors"
                      >
                        + Gán bài
                      </button>
                      <button
                        onClick={() => openEditModal(k)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => {
                          setDeletingKanji(k);
                          setDeleteError(null);
                        }}
                        className="px-2.5 py-1.5 rounded-lg border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
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
                {editingKanji ? "Chỉnh sửa Chữ Hán" : "Thêm Chữ Hán Mới"}
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Chữ Hán (Kanji) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: 日"
                    value={formData.kanji}
                    onChange={(e) => setFormData({ ...formData, kanji: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-serif text-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Âm Hán Việt</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: NHẬT"
                    value={formData.hanViet || ""}
                    onChange={(e) => setFormData({ ...formData, hanViet: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Âm On (Katakana)</label>
                  <input
                    type="text"
                    placeholder="ニチ, ジツ"
                    value={formData.onyomi || ""}
                    onChange={(e) => setFormData({ ...formData, onyomi: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Âm Kun (Hiragana)</label>
                  <input
                    type="text"
                    placeholder="ひ, -び, -か"
                    value={formData.kunyomi || ""}
                    onChange={(e) => setFormData({ ...formData, kunyomi: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Số nét</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.strokeCount || ""}
                    onChange={(e) => setFormData({ ...formData, strokeCount: parseInt(e.target.value) || undefined })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL thứ tự nét viết</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={formData.strokeOrderUrl || ""}
                    onChange={(e) => setFormData({ ...formData, strokeOrderUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ý nghĩa tiếng Việt</label>
                <textarea
                  rows={2}
                  placeholder="Mặt trời, ban ngày, ngày..."
                  value={formData.meaning || ""}
                  onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mẹo nhớ (Mnemonic)</label>
                <textarea
                  rows={2}
                  placeholder="Hình ảnh mặt trời hình chữ nhật có vạch ở giữa..."
                  value={formData.mnemonic || ""}
                  onChange={(e) => setFormData({ ...formData, mnemonic: e.target.value })}
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
                  {submitting ? "Đang lưu..." : editingKanji ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign to Lesson Modal */}
      {assigningKanji && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-800 mb-1">Gán Chữ Hán vào Bài học</h3>
            <p className="text-xs text-slate-500 mb-4">
              Chữ Hán: <strong className="text-lg font-serif">{assigningKanji.kanji}</strong> ({assigningKanji.hanViet})
            </p>

            {assignError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {assignError}
              </div>
            )}

            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chọn bài học *</label>
                <select
                  required
                  value={assignLessonId}
                  onChange={(e) => setAssignLessonId(parseInt(e.target.value) || 0)}
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Thứ tự hiển thị trong bài</label>
                <input
                  type="number"
                  min={0}
                  value={assignSortOrder}
                  onChange={(e) => setAssignSortOrder(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAssigningKanji(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting || !assignLessonId}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 shadow-xs transition-colors disabled:opacity-50"
                >
                  {submitting ? "Đang gán..." : "Gán vào bài"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingKanji && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-800 mb-2">Xác nhận xóa chữ Hán?</h3>
            <p className="text-xs text-slate-500 mb-4">
              Bạn có chắc chắn muốn xóa chữ Hán <strong>{deletingKanji.kanji} ({deletingKanji.hanViet})</strong>?
              Nếu chữ Hán đang được gán vào bài học, hệ thống sẽ từ chối xóa để đảm bảo toàn vẹn dữ liệu.
            </p>

            {deleteError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeletingKanji(null)}
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

export default AdminKanjisPage;
