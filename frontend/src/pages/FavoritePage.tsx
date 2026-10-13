import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { favoriteApi } from "../services/favoriteApi";
import AppShell from "../components/layout/AppShell";
import PageContainer from "../components/layout/PageContainer";
import FavoriteItemCard from "../components/favorite/FavoriteItemCard";
import { cn } from "../utils/cn";

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
      <AppShell>
        <PageContainer className="py-20 text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Đang kiểm tra thông tin đăng nhập...</p>
        </PageContainer>
      </AppShell>
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

  const typeTabs: { key: string; label: string; icon: string; count: number }[] = [
    { key: "ALL", label: "Tất cả", icon: "⭐", count: favorites.length },
    {
      key: "VOCABULARY",
      label: "Từ vựng",
      icon: "📖",
      count: favorites.filter((f) => f.contentType === "VOCABULARY").length,
    },
    {
      key: "GRAMMAR",
      label: "Ngữ pháp",
      icon: "⛩️",
      count: favorites.filter((f) => f.contentType === "GRAMMAR").length,
    },
    {
      key: "KANJI",
      label: "Kanji",
      icon: "🈸",
      count: favorites.filter((f) => f.contentType === "KANJI").length,
    },
    {
      key: "LISTENING",
      label: "Bài nghe",
      icon: "🎧",
      count: favorites.filter((f) => f.contentType === "LISTENING").length,
    },
    {
      key: "READING",
      label: "Bài đọc",
      icon: "📰",
      count: favorites.filter((f) => f.contentType === "READING").length,
    },
    {
      key: "EXERCISE",
      label: "Bài tập",
      icon: "✍️",
      count: favorites.filter((f) => f.contentType === "EXERCISE").length,
    },
  ];

  return (
    <AppShell>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 animate-pop flex items-center gap-2">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <PageContainer className="py-6 sm:py-8 pb-28 lg:pb-12 space-y-6">
        {/* Header Hero Banner (Washi & Ai-iro) */}
        <div className="hero-ink pattern-seigaiha rounded-3xl p-6 sm:p-8 text-white shadow-zen flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-300 font-black text-xl flex items-center justify-center font-mincho shadow-md">
                愛
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                Kho Lưu Trữ Yêu Thích (Favorites)
              </h1>
            </div>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Tất cả các từ vựng, ngữ pháp, kanji và bài tập bạn đã đánh dấu để ôn tập bất cứ lúc nào.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 text-center min-w-[110px] backdrop-blur-xs">
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">
                Tổng số mục
              </span>
              <span className="text-2xl font-black text-amber-300 tabular-nums">
                {favorites.length}
              </span>
            </div>

            <Link
              to="/review"
              className="px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-rose-500 hover:bg-rose-600 text-white shadow-card transition-all active:translate-y-0.5 flex items-center gap-1.5"
            >
              <span>Ôn tập ngay</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="surface rounded-3xl p-4 sm:p-5 border border-[#E7E0D2] shadow-zen space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Type tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar-x text-xs">
              {typeTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedType(tab.key)}
                  id={`filter-tab-${tab.key.toLowerCase()}`}
                  className={cn(
                    "px-3.5 py-2 rounded-2xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0",
                    selectedType === tab.key
                      ? "bg-rose-500 text-white shadow-2xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100",
                  )}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                      selectedType === tab.key
                        ? "bg-white/25 text-white"
                        : "bg-slate-100 text-slate-600",
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Filter Input */}
            <div className="w-full md:w-56 shrink-0">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Lọc theo ID mục..."
                className="w-full px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="surface rounded-3xl p-12 text-center border border-[#E7E0D2]">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-600 text-sm font-semibold">Đang tải danh sách mục yêu thích...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="surface rounded-3xl p-8 text-center border border-rose-200 bg-rose-50/50 space-y-3">
            <span className="text-3xl block">⚠️</span>
            <p className="text-sm font-bold text-rose-800">Không thể tải danh sách yêu thích.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredFavorites.length === 0 && (
          <div className="surface rounded-3xl p-10 sm:p-14 text-center border border-[#E7E0D2] shadow-zen space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 text-3xl flex items-center justify-center mx-auto shadow-2xs font-mincho">
              愛
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                Chưa có nội dung yêu thích nào
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Khi học Từ vựng, Hán tự, Ngữ pháp hoặc Bài tập, hãy nhấn biểu tượng trái tim ❤️ để lưu lại tại đây.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 flex-wrap text-xs">
              <Link to="/n5/lessons" className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 transition-colors">
                Khám phá bài học N5 &rarr;
              </Link>
              <Link to="/beginner" className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors">
                Vào Tủ sách Sơ cấp &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Favorites Grid */}
        {!isLoading && !isError && filteredFavorites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFavorites.map((item) => (
              <FavoriteItemCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </PageContainer>
    </AppShell>
  );
}
