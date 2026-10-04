import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { reviewApi } from "../services/reviewApi";
import {
  ReviewContentType,
  ReviewItemResponse,
  ReviewResult,
  ReviewStatus,
  CreateReviewItemRequest,
} from "../types/review";
import Navbar from "../components/Navbar";
import ReviewItemCard from "../components/review/ReviewItemCard";
import AddReviewItemModal from "../components/review/AddReviewItemModal";

export default function ReviewPage() {
  const location = useLocation();
  const { currentUser, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<"ALL" | "DUE">("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 1. Auth check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-600 font-medium">Đang kiểm tra thông tin đăng nhập...</p>
        </main>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Fetch Review items and Due items
  const {
    data: allItems = [],
    isLoading: isLoadingAll,
    error: errorAll,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ["review-items"],
    queryFn: () => reviewApi.getReviewItems(),
    enabled: !!currentUser,
  });

  const {
    data: dueItems = [],
    isLoading: isLoadingDue,
    error: errorDue,
    refetch: refetchDue,
  } = useQuery({
    queryKey: ["review-items-due"],
    queryFn: () => reviewApi.getDueReviewItems(),
    enabled: !!currentUser,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // 3. Mutations
  const reviewMutation = useMutation({
    mutationFn: ({ id, result }: { id: number; result: ReviewResult }) =>
      reviewApi.updateReviewItem(id, { result }),
    onSuccess: (updatedItem) => {
      queryClient.invalidateQueries({ queryKey: ["review-items"] });
      queryClient.invalidateQueries({ queryKey: ["review-items-due"] });
      showToast(
        `Đã lưu kết quả ôn tập! Lần ôn tiếp theo: ${
          updatedItem.nextReviewAt ? new Date(updatedItem.nextReviewAt).toLocaleDateString("vi-VN") : "Ngay"
        }`
      );
    },
    onError: () => {
      showToast("Có lỗi xảy ra khi cập nhật kết quả ôn tập");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => reviewApi.deleteReviewItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review-items"] });
      queryClient.invalidateQueries({ queryKey: ["review-items-due"] });
      showToast("Đã xóa mục ôn tập thành công");
    },
    onError: () => {
      showToast("Có lỗi xảy ra khi xóa mục ôn tập");
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateReviewItemRequest) => reviewApi.createReviewItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review-items"] });
      queryClient.invalidateQueries({ queryKey: ["review-items-due"] });
      showToast("Thêm nội dung ôn tập thành công!");
    },
  });

  const handleReview = async (id: number, result: ReviewResult) => {
    await reviewMutation.mutateAsync({ id, result });
  };

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  const handleAddSubmit = async (data: CreateReviewItemRequest) => {
    await createMutation.mutateAsync(data);
  };

  // 4. Filtering
  const sourceList: ReviewItemResponse[] = activeTab === "DUE" ? dueItems : allItems;

  const filteredItems = sourceList.filter((item) => {
    // Status filter
    if (selectedStatus !== "ALL" && item.status !== selectedStatus) {
      return false;
    }

    // Type filter
    if (selectedType !== "ALL" && item.contentType !== selectedType) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchId = item.contentId.toString().includes(q);
      const matchType = item.contentType.toLowerCase().includes(q);
      return matchTitle || matchId || matchType;
    }

    return true;
  });

  const isLoading = isLoadingAll || isLoadingDue;
  const hasError = errorAll || errorDue;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-medium border border-slate-700 animate-in slide-in-from-bottom-5">
          {toastMessage}
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
                Không gian ôn tập cá nhân
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Ôn Tập Kiến Thức
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Tự động lên lịch ôn tập định kỳ dựa trên kết quả ghi nhớ của bạn. Đánh giá độ nhớ từ Lại, Khó, Tốt đến Dễ để tối ưu thời gian học.
              </p>
            </div>

            {/* Quick Stats & Add Button */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl text-center flex-1 sm:flex-none min-w-[100px]">
                <div className="text-2xl font-black text-amber-400">
                  {dueItems.length}
                </div>
                <div className="text-xs text-slate-300 font-medium">Đến hạn ôn</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl text-center flex-1 sm:flex-none min-w-[100px]">
                <div className="text-2xl font-black text-white">
                  {allItems.length}
                </div>
                <div className="text-xs text-slate-300 font-medium">Tổng mục ôn</div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="w-full sm:w-auto px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>➕</span>
                <span>Thêm mục ôn</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang tải danh sách ôn tập...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && hasError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-1">Không thể tải danh sách ôn tập</h3>
            <p className="text-sm text-rose-600 mb-6">
              Đã xảy ra lỗi khi kết nối với máy chủ. Vui lòng thử lại.
            </p>
            <button
              onClick={() => {
                refetchAll();
                refetchDue();
              }}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl shadow-xs transition-colors"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Main Content */}
        {!isLoading && !hasError && (
          <>
            {/* Control Bar: Tabs & Filters */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-8 shadow-xs space-y-4">
              {/* Row 1: Mode Tabs & Search */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 p-1 bg-slate-100/80 rounded-xl w-fit">
                  <button
                    type="button"
                    onClick={() => setActiveTab("ALL")}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                      activeTab === "ALL"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Tất cả nội dung ({allItems.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("DUE")}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "DUE"
                        ? "bg-amber-500 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>Đến hạn ôn</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-xs ${
                        activeTab === "DUE"
                          ? "bg-white text-amber-600"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {dueItems.length}
                    </span>
                  </button>
                </div>

                {/* Search */}
                <div className="relative flex-1 max-w-xs">
                  <input
                    type="text"
                    placeholder="Tìm theo tên, ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="absolute left-3 top-2.5 text-slate-400 text-xs">
                    🔍
                  </span>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Row 2: Status & Type Filters */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
                {/* Content Type Filter */}
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-500">Phân loại:</span>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="ALL">Tất cả loại</option>
                    <option value="VOCABULARY">Từ vựng</option>
                    <option value="GRAMMAR">Ngữ pháp</option>
                    <option value="KANJI">Kanji</option>
                    <option value="LISTENING">Bài nghe</option>
                    <option value="READING">Bài đọc</option>
                    <option value="EXERCISE">Bài tập</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-500">Trạng thái:</span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="ALL">Tất cả trạng thái</option>
                    <option value="PENDING">Chờ ôn (PENDING)</option>
                    <option value="COMPLETED">Hoàn thành (COMPLETED)</option>
                    <option value="SKIPPED">Bỏ qua (SKIPPED)</option>
                  </select>
                </div>

                {(selectedStatus !== "ALL" || selectedType !== "ALL" || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStatus("ALL");
                      setSelectedType("ALL");
                      setSearchQuery("");
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 ml-auto"
                  >
                    Xóa bộ lọc
                  </button>
                )}
              </div>
            </div>

            {/* List or Empty State */}
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-xs">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Bạn chưa có nội dung cần ôn.
                </h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                  {allItems.length === 0
                    ? "Hãy thêm từ vựng, ngữ pháp, Kanji hoặc bài tập vào danh sách ôn tập để hệ thống tự động nhắc nhở bạn nhé!"
                    : "Không tìm thấy nội dung phù hợp với bộ lọc hiện tại của bạn."}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors"
                  >
                    Thêm nội dung ôn tập
                  </button>
                  <Link
                    to="/n5/lessons"
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-xl transition-colors"
                  >
                    Khám phá bài học
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ReviewItemCard
                    key={item.id}
                    item={item}
                    onReview={handleReview}
                    onDelete={handleDelete}
                    isUpdating={reviewMutation.isPending || deleteMutation.isPending}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Add Review Item Modal */}
      <AddReviewItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
      />
    </div>
  );
}
