import React, { useEffect, useState } from "react";
import { adminLessonApi } from "../../services/adminLessonApi";
import { adminLevelApi } from "../../services/adminLevelApi";
import { AdminLesson, AdminLessonRequest, AdminLevel } from "../../types/admin";

export const AdminLessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<AdminLesson[]>([]);
  const [levels, setLevels] = useState<AdminLevel[]>([]);
  const [selectedLevelId, setSelectedLevelId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingLesson, setEditingLesson] = useState<AdminLesson | null>(null);
  const [formData, setFormData] = useState<AdminLessonRequest>({
    levelId: 0,
    lessonNumber: 1,
    title: "",
    description: "",
    sortOrder: 1,
    isActive: true,
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete modal state
  const [deletingLesson, setDeletingLesson] = useState<AdminLesson | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchLevels = async () => {
    try {
      const data = await adminLevelApi.getAll();
      setLevels(data);
    } catch {
      // non-fatal
    }
  };

  const fetchLessons = async (levelIdFilter?: string) => {
    try {
      setLoading(true);
      setError(null);
      const lvlId = levelIdFilter ? parseInt(levelIdFilter) : undefined;
      const data = await adminLessonApi.getLessons(lvlId);
      setLessons(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể tải danh sách bài học");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLevels();
    fetchLessons();
  }, []);

  const handleLevelFilterChange = (lvlId: string) => {
    setSelectedLevelId(lvlId);
    fetchLessons(lvlId);
  };

  const openCreateModal = () => {
    setEditingLesson(null);
    const defaultLevelId = selectedLevelId ? parseInt(selectedLevelId) : levels[0]?.id || 0;
    setFormData({
      levelId: defaultLevelId,
      lessonNumber: lessons.length + 1,
      title: "",
      description: "",
      sortOrder: lessons.length + 1,
      isActive: true,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (lesson: AdminLesson) => {
    setEditingLesson(lesson);
    setFormData({
      levelId: lesson.levelId,
      lessonNumber: lesson.lessonNumber,
      title: lesson.title,
      description: lesson.description || "",
      sortOrder: lesson.sortOrder,
      isActive: lesson.isActive,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      if (editingLesson) {
        await adminLessonApi.update(editingLesson.id, formData);
      } else {
        await adminLessonApi.create(formData);
      }
      setIsModalOpen(false);
      fetchLessons(selectedLevelId);
    } catch (err: any) {
      setFormError(err.response?.data?.message || "Đã xảy ra lỗi khi lưu bài học");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingLesson) return;
    setSubmitting(true);
    setDeleteError(null);

    try {
      await adminLessonApi.delete(deletingLesson.id);
      setDeletingLesson(null);
      fetchLessons(selectedLevelId);
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || "Không thể xóa bài học này");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Quản lý Bài học (Lessons)</h2>
          <p className="text-sm text-slate-500 mt-1">Danh sách bài học theo cấp độ (N5 - N1)</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Level Filter */}
          <select
            value={selectedLevelId}
            onChange={(e) => handleLevelFilterChange(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="">Tất cả cấp độ</option>
            {levels.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                {lvl.code} - {lvl.name}
              </option>
            ))}
          </select>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 shadow-xs transition-colors"
          >
            + Thêm bài học mới
          </button>
        </div>
      </div>

      {/* Global Error Banner */}
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
            Đang tải danh sách bài học...
          </div>
        ) : lessons.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-base font-semibold">Chưa có bài học nào</p>
            <p className="text-xs mt-1 text-slate-500">Hãy chọn cấp độ hoặc bấm nút "Thêm bài học mới".</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Cấp độ</th>
                  <th className="py-3.5 px-6">Bài số</th>
                  <th className="py-3.5 px-6">Tiêu đề</th>
                  <th className="py-3.5 px-6">Mô tả</th>
                  <th className="py-3.5 px-6">Thứ tự</th>
                  <th className="py-3.5 px-6">Trạng thái</th>
                  <th className="py-3.5 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {lessons.map((lesson) => (
                  <tr key={lesson.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-indigo-700">{lesson.levelCode}</td>
                    <td className="py-4 px-6 font-semibold text-slate-800 font-mono">
                      Bài {lesson.lessonNumber < 10 ? `0${lesson.lessonNumber}` : lesson.lessonNumber}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800">{lesson.title}</td>
                    <td className="py-4 px-6 text-slate-500 max-w-xs truncate">{lesson.description || "—"}</td>
                    <td className="py-4 px-6 text-slate-600 font-mono">{lesson.sortOrder}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          lesson.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {lesson.isActive ? "Hoạt động" : "Tạm ẩn"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(lesson)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => {
                          setDeletingLesson(lesson);
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                {editingLesson ? "Chỉnh sửa Bài học" : "Thêm Bài học Mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cấp độ (Level) *</label>
                <select
                  required
                  value={formData.levelId}
                  onChange={(e) => setFormData({ ...formData, levelId: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                >
                  <option value={0}>-- Chọn cấp độ --</option>
                  {levels.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.code} - {lvl.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bài số (Lesson Number) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.lessonNumber}
                    onChange={(e) => setFormData({ ...formData, lessonNumber: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Thứ tự sắp xếp *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tiêu đề bài học *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Giới thiệu bản thân & Chào hỏi"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả bài học</label>
                <textarea
                  rows={3}
                  placeholder="Mục tiêu bài học, ngữ cảnh..."
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="lessonIsActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="lessonIsActive" className="text-xs font-medium text-slate-700 cursor-pointer">
                  Kích hoạt hiển thị cho học viên
                </label>
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
                  {submitting ? "Đang lưu..." : editingLesson ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingLesson && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-800 mb-2">Xác nhận xóa bài học?</h3>
            <p className="text-xs text-slate-500 mb-4">
              Bạn có chắc chắn muốn xóa bài học <strong>Bài {deletingLesson.lessonNumber}: {deletingLesson.title}</strong>?
              Nếu bài học còn từ vựng, ngữ pháp, chữ Hán, bài nghe, bài đọc hoặc bài tập liên kết, hệ thống sẽ từ chối xóa để đảm bảo an toàn.
            </p>

            {deleteError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeletingLesson(null)}
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

export default AdminLessonsPage;
