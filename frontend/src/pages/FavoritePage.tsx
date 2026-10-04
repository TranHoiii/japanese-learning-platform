import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { favoriteApi } from "../services/favoriteApi";
import { FavoriteContentType } from "../types/favorite";
import Navbar from "../components/Navbar";
import FavoriteItemCard from "../components/favorite/FavoriteItemCard";

export default function FavoritePage() {
  const location = useLocation();
  const { currentUser, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [searchId, setSearchId] = useState<string>("");
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

  // 2. Fetch favorites
  const {
    data: favorites = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favoriteApi.getFavorites(),
    enabled: !!currentUser,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // 3. Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => favoriteApi.deleteFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      showToast("Đã xóa khỏi danh sách yêu thích thành công!");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || "Không thể xóa nội dung yêu thích.";
      showToast(msg);
    },
  });

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  // 4. Filtering
  const filteredFavorites = favorites.filter((item) => {
    const matchesType =
      selectedType === "ALL" ? true : item.contentType === selectedType;
    const matchesId =
      !searchId.trim() || item.contentId.toString().includes(searchId.trim());
    return matchesType && matchesId;
  });

  const typeTabs: { key: string; label: string; count: number }[] = [
    { key: "ALL", label: "Tất cả", count: favorites.length },
    {
      key: "VOCABULARY",
      label: "Từ vựng",
      count: favorites.filter((f) => f.contentType === "VOCABULARY").length,
    },
    {
      key: "GRAMMAR",
      label: "Ngữ pháp",
      count: favorites.filter((f) => f.contentType === "GRAMMAR").length,
    },
    {
      key: "KANJI",
      label: "Kanji",
      count: favorites.filter((f) => f.contentType === "KANJI").length,
    },
    {
      key: "LISTENING",
      label: "Bài nghe",
      count: favorites.filter((f) => f.contentType === "LISTENING").length,
    },
    {
      key: "READING",
      label: "Bài đọc",
      count: favorites.filter((f) => f.contentType === "READING").length,
    },
    {
      key: "EXERCISE",
      label: "Bài tập",
      count: favorites.filter((f) => f.contentType === "EXERCISE").length,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm font-semibold px-4 py-3 rounded-xl shadow-lg border border-slate-700 animate-fade-in flex items-center gap-2">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-md mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-xs">
                ❤️
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Nội dung yêu thích
              </h1>
            </div>
            <p className="text-rose-100 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Lưu giữ các từ vựng, ngữ pháp, kanji và bài tập quan trọng để ôn tập bất cứ khi nào bạn cần.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex items-center gap-4 self-start sm:self-auto min-w-[160px]">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-rose-200">
                Tổng yêu thích
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-0.5" id="favorite-total-count">
                {favorites.length}
              </div>
            </div>
            <div className="text-3xl">🔖</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Content Type Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {typeTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedType(tab.key)}
                id={`filter-tab-${tab.key.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedType === tab.key
                    ? "bg-rose-500 text-white shadow-xs scale-102"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    selectedType === tab.key
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search ID filter */}
          <div className="w-full md:w-64">
            <div className="relative">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Tìm theo ID nội dung..."
                id="search-favorite-id-input"
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-slate-400"
              />
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-500 text-sm font-medium">Đang tải danh sách yêu thích...</p>
          </div>
        ) : isError ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center max-w-lg mx-auto">
            <div className="text-3xl mb-2">⚠️</div>
            <h3 className="text-base font-bold text-rose-800 mb-1">
              Đã có lỗi khi tải danh sách yêu thích
            </h3>
            <p className="text-xs text-rose-600 mb-4">
              {(error as any)?.response?.data?.message || "Vui lòng thử lại sau giây lát."}
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors shadow-xs"
            >
              Thử lại
            </button>
          </div>
        ) : favorites.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl mx-auto flex items-center justify-center text-3xl mb-4 shadow-inner">
              💖
            </div>
            <h3 className="text-lg font-extrabold text-slate-800 mb-2">
              Bạn chưa có nội dung yêu thích.
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Trong lúc học từ vựng, ngữ pháp hay làm bài tập, hãy bấm biểu tượng trái tim để lưu lại những nội dung cần ôn nhé!
            </p>
            <Link
              to="/n5/lessons"
              id="empty-cta-link"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-102 transition-all"
            >
              <span>Khám phá bài học N5</span>
              <span>→</span>
            </Link>
          </div>
        ) : filteredFavorites.length === 0 ? (
          /* Filtered empty state */
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md mx-auto">
            <div className="text-2xl mb-2">🔍</div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">
              Không tìm thấy nội dung phù hợp
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Thử đổi bộ lọc loại nội dung hoặc xóa từ khóa tìm kiếm ID.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedType("ALL");
                setSearchId("");
              }}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          /* Grid of cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFavorites.map((fav) => (
              <FavoriteItemCard
                key={fav.id}
                favorite={fav}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
