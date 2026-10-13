import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../services/searchApi";
import { SearchContentType } from "../types/search";
import AppShell from "../components/layout/AppShell";
import PageContainer from "../components/layout/PageContainer";
import SearchResultCard from "../components/search/SearchResultCard";
import { cn } from "../utils/cn";

const CONTENT_TYPES: { key: SearchContentType | "ALL"; label: string; icon: string }[] = [
  { key: "ALL", label: "Tất cả", icon: "🌐" },
  { key: "VOCABULARY", label: "Từ vựng", icon: "📖" },
  { key: "GRAMMAR", label: "Ngữ pháp", icon: "⛩️" },
  { key: "KANJI", label: "Kanji", icon: "🈸" },
  { key: "LISTENING", label: "Luyện nghe", icon: "🎧" },
  { key: "READING", label: "Bài đọc", icon: "📰" },
  { key: "EXERCISE", label: "Bài tập", icon: "✍️" },
];

const LEVELS = ["ALL", "N5", "N4", "N3", "N2", "N1"];

const POPULAR_TAGS = [
  "食べる",
  "わたし",
  "です / ます",
  "N5 kanji",
  "〜ている",
  "Bộ thủ",
  "Số đếm",
  "Từ vựng bài 1",
  "Nhật Bản",
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get("q") || "";
  const urlType = searchParams.get("type") || "ALL";
  const urlLevel = searchParams.get("level") || "ALL";
  const urlPage = parseInt(searchParams.get("page") || "0", 10);

  const [inputQuery, setInputQuery] = useState(urlQuery);

  // Sync state if URL query changes (e.g. browser back/forward)
  useEffect(() => {
    setInputQuery(urlQuery);
  }, [urlQuery]);

  const activeQuery = urlQuery.trim();
  const activeType = urlType !== "ALL" ? (urlType as SearchContentType) : undefined;
  const activeLevel = urlLevel !== "ALL" ? urlLevel : undefined;
  const activePage = Number.isNaN(urlPage) || urlPage < 0 ? 0 : urlPage;
  const pageSize = 20;

  const {
    data: searchResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["search", activeQuery, activeType, activeLevel, activePage],
    queryFn: () =>
      searchApi.searchContent({
        q: activeQuery,
        type: activeType,
        level: activeLevel,
        page: activePage,
        size: pageSize,
      }),
    enabled: activeQuery.length > 0,
  });

  const executeSearch = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    const newParams = new URLSearchParams();
    newParams.set("q", trimmed);
    if (urlType !== "ALL") newParams.set("type", urlType);
    if (urlLevel !== "ALL") newParams.set("level", urlLevel);
    newParams.set("page", "0");
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(inputQuery);
  };

  const handleTagClick = (tag: string) => {
    setInputQuery(tag);
    executeSearch(tag);
  };

  const handleTypeChange = (typeKey: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (typeKey === "ALL") {
      newParams.delete("type");
    } else {
      newParams.set("type", typeKey);
    }
    newParams.set("page", "0");
    setSearchParams(newParams);
  };

  const handleLevelChange = (lvl: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (lvl === "ALL") {
      newParams.delete("level");
    } else {
      newParams.set("level", lvl);
    }
    newParams.set("page", "0");
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    const newParams = new URLSearchParams();
    if (activeQuery) newParams.set("q", activeQuery);
    setSearchParams(newParams);
  };

  const totalResults = searchResponse?.total ?? 0;
  const items = searchResponse?.items ?? [];
  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <AppShell>
      <PageContainer className="py-6 sm:py-8 pb-28 lg:pb-12 space-y-6">
        {/* Spotlight Hero Search Banner */}
        <div className="hero-ink pattern-seigaiha rounded-3xl p-6 sm:p-10 text-white shadow-zen relative overflow-hidden">
          {/* Decorative Background Seal */}
          <div
            aria-hidden="true"
            className="absolute -right-6 -bottom-8 text-9xl font-mincho font-black text-white/5 select-none pointer-events-none"
          >
            探
          </div>

          <div className="max-w-2xl relative z-10 space-y-2 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-2xl bg-amber-400/20 border border-amber-300/40 text-amber-300 font-black text-lg flex items-center justify-center font-mincho shadow-md">
                探
              </span>
              <span className="text-xs uppercase tracking-widest font-black text-amber-300/90">
                Studio Tra Cứu Toàn Năng
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              Tìm kiếm kho tàng tiếng Nhật
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
              Tra cứu nhanh chóng từ vựng, ngữ pháp, kanji theo nét vẽ, âm Hán Việt, bài nghe và bài đọc Minna no Nihongo N5 – N1.
            </p>
          </div>

          {/* Elevated Spotlight Search Bar Form */}
          <form onSubmit={handleSearchSubmit} className="relative z-10 max-w-2xl">
            <div className="relative flex items-center rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/30 dark:border-slate-700 shadow-2xl p-1.5 focus-within:ring-2 focus-within:ring-amber-400/60 transition-all">
              <div className="pl-3.5 pr-2 text-slate-400 dark:text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input
                type="text"
                id="search-input"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Nhập từ khóa (vd: 食べる, たべる, Ăn, N5, ~ている...)"
                className="flex-1 py-2.5 px-2 text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent focus:outline-none font-medium"
                maxLength={100}
                autoFocus
              />

              {inputQuery && (
                <button
                  type="button"
                  id="clear-search-button"
                  onClick={() => setInputQuery("")}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mr-1 cursor-pointer"
                  title="Xóa tìm kiếm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              <button
                type="submit"
                id="search-submit-button"
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0"
              >
                <span>Tìm kiếm</span>
                <span className="hidden sm:inline text-slate-800 text-[11px] font-mono opacity-80">↵</span>
              </button>
            </div>

            {/* Popular quick tags */}
            <div className="flex items-center gap-2 mt-3.5 flex-wrap">
              <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider">
                Gợi ý nhanh:
              </span>
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="text-[11px] px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 border border-white/15 transition-all cursor-pointer active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Filter Controls Deck */}
        <div className="surface rounded-3xl p-4 sm:p-5 border border-[#E7E0D2] shadow-zen space-y-4">
          {/* Row 1: Content Type Filter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Loại nội dung
              </span>
              {(urlType !== "ALL" || urlLevel !== "ALL") && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-rose-500 hover:underline cursor-pointer"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {CONTENT_TYPES.map((t) => {
                const isActive = urlType === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => handleTypeChange(t.key)}
                    id={`type-filter-${t.key.toLowerCase()}`}
                    className={cn(
                      "px-3.5 py-1.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5",
                      isActive
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700",
                    )}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: JLPT Level Filter */}
          <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Trình độ (JLPT)
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {LEVELS.map((lvl) => {
                const isActive = urlLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => handleLevelChange(lvl)}
                    id={`level-filter-${lvl.toLowerCase()}`}
                    className={cn(
                      "px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer",
                      isActive
                        ? "bg-slate-900 text-amber-300 dark:bg-amber-400 dark:text-slate-950 shadow-xs"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700",
                    )}
                  >
                    {lvl === "ALL" ? "Tất cả cấp độ" : lvl}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Stream / States */}
        <div>
          {/* 1. Prompt state: When no search has been initiated yet */}
          {!activeQuery && (
            <div className="surface rounded-3xl p-10 sm:p-16 border border-[#E7E0D2] shadow-zen text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mincho text-3xl font-black shadow-inner">
                探
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  Bắt đầu tra cứu tài liệu
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Nhập từ vựng, âm Hán Việt, kanji hoặc ngữ pháp để bắt đầu tìm kiếm thông tin chi tiết.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto pt-4 text-left">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs space-y-1">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 block">📖 Từ vựng</span>
                  <p className="text-slate-500 dark:text-slate-400">Tra theo Hiragana, Kanji hoặc nghĩa tiếng Việt.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs space-y-1">
                  <span className="font-bold text-rose-600 dark:text-rose-400 block">🈸 Chữ Hán Kanji</span>
                  <p className="text-slate-500 dark:text-slate-400">Xem âm On, âm Kun, số nét và từ ghép.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block">⛩️ Ngữ pháp</span>
                  <p className="text-slate-500 dark:text-slate-400">Mẫu câu, cấu trúc và cách kết hợp cụ thể.</p>
                </div>
              </div>
            </div>
          )}

          {/* 2. Loading State */}
          {activeQuery && isLoading && (
            <div className="surface rounded-3xl p-16 border border-[#E7E0D2] text-center space-y-3">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Đang tìm kiếm dữ liệu cho "{activeQuery}"...
              </p>
            </div>
          )}

          {/* 3. Error State */}
          {activeQuery && !isLoading && isError && (
            <div className="surface rounded-3xl p-8 border border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 text-2xl flex items-center justify-center mx-auto">
                ⚠️
              </div>
              <h3 className="text-base font-bold text-rose-900 dark:text-rose-200">
                Đã xảy ra lỗi khi tìm kiếm
              </h3>
              <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-400 max-w-md mx-auto">
                {(error as any)?.response?.data?.message || "Không thể kết nối đến máy chủ. Vui lòng thử lại sau."}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-colors cursor-pointer"
              >
                Thử lại
              </button>
            </div>
          )}

          {/* 4. Empty Results State */}
          {activeQuery && !isLoading && !isError && items.length === 0 && (
            <div className="surface rounded-3xl p-12 sm:p-16 border border-[#E7E0D2] shadow-zen text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-3xl">
                🍃
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                  Không tìm thấy kết quả nào
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Không có nội dung nào phù hợp với từ khóa <span className="font-bold text-slate-900 dark:text-slate-100">"{activeQuery}"</span>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto text-left space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200">Mẹo tìm kiếm:</p>
                <p>• Kiểm tra chính tả chữ Romaji hoặc Hiragana.</p>
                <p>• Thử tìm kiếm với âm Hán Việt (vd: "Thực", "Học", "Tiền").</p>
                <p>• Chuyển bộ lọc loại nội dung sang "Tất cả".</p>
              </div>
            </div>
          )}

          {/* 5. Results List */}
          {activeQuery && !isLoading && !isError && items.length > 0 && (
            <div className="space-y-4">
              {/* Meta bar */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Kết quả cho <span className="font-bold text-slate-900 dark:text-slate-100">"{activeQuery}"</span>
                </p>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 border border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full tabular-nums">
                  {totalResults} kết quả
                </span>
              </div>

              {/* Result cards grid / stream */}
              <div className="space-y-3" id="search-results-list">
                {items.map((item) => (
                  <SearchResultCard
                    key={`${item.contentType}-${item.contentId}`}
                    item={item}
                  />
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-200/80 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => handlePageChange(activePage - 1)}
                    disabled={activePage === 0}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    ← Trang trước
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      if (
                        idx === 0 ||
                        idx === totalPages - 1 ||
                        Math.abs(idx - activePage) <= 1
                      ) {
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handlePageChange(idx)}
                            className={cn(
                              "w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer",
                              idx === activePage
                                ? "bg-indigo-600 text-white shadow-2xs"
                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
                            )}
                          >
                            {idx + 1}
                          </button>
                        );
                      } else if (idx === 1 && activePage > 2) {
                        return (
                          <span key={idx} className="px-1 text-slate-400 text-xs">
                            ...
                          </span>
                        );
                      } else if (idx === totalPages - 2 && activePage < totalPages - 3) {
                        return (
                          <span key={idx} className="px-1 text-slate-400 text-xs">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePageChange(activePage + 1)}
                    disabled={activePage >= totalPages - 1}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    Trang sau →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </PageContainer>
    </AppShell>
  );
}
