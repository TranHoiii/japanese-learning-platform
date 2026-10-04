import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../services/searchApi";
import { SearchContentType } from "../types/search";
import Navbar from "../components/Navbar";
import SearchResultCard from "../components/search/SearchResultCard";

const CONTENT_TYPES: { key: SearchContentType | "ALL"; label: string }[] = [
  { key: "ALL", label: "Tất cả" },
  { key: "VOCABULARY", label: "Từ vựng" },
  { key: "GRAMMAR", label: "Ngữ pháp" },
  { key: "KANJI", label: "Kanji" },
  { key: "LISTENING", label: "Luyện nghe" },
  { key: "READING", label: "Bài đọc" },
  { key: "EXERCISE", label: "Bài tập" },
];

const LEVELS = ["ALL", "N5", "N4", "N3", "N2", "N1"];

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputQuery.trim();
    if (!trimmed) return;

    const newParams = new URLSearchParams();
    newParams.set("q", trimmed);
    if (urlType !== "ALL") newParams.set("type", urlType);
    if (urlLevel !== "ALL") newParams.set("level", urlLevel);
    newParams.set("page", "0");
    setSearchParams(newParams);
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

  const totalResults = searchResponse?.total ?? 0;
  const items = searchResponse?.items ?? [];
  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tìm kiếm nội dung
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Tra cứu từ vựng, ngữ pháp, chữ Hán Kanji, bài nghe, bài đọc và bài tập trong toàn hệ thống
          </p>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto mb-8">
          <div className="relative flex items-center shadow-sm rounded-2xl bg-white border border-slate-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <div className="pl-4 pr-2 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="search-input"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Nhập từ khóa (ví dụ: 食べる, たべる, 食, ăn, N5...)"
              className="flex-1 py-3.5 px-2 text-sm sm:text-base text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
              maxLength={100}
            />
            {inputQuery && (
              <button
                type="button"
                id="clear-search-button"
                onClick={() => setInputQuery("")}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors mr-1"
                title="Xóa tìm kiếm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <div className="pr-1.5 py-1.5">
              <button
                type="submit"
                id="search-submit-button"
                className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>

        {/* Filter Section */}
        <div className="max-w-3xl mx-auto space-y-4 mb-8">
          {/* Content Type Tabs */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Loại nội dung
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {CONTENT_TYPES.map((t) => {
                const isActive = urlType === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => handleTypeChange(t.key)}
                    id={`type-filter-${t.key.toLowerCase()}`}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level Filter Tabs */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
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
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-800 text-white"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {lvl === "ALL" ? "Tất cả Level" : lvl}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content & Results State */}
        <div className="max-w-3xl mx-auto">
          {/* 1. Prompt state: When no search has been initiated yet */}
          {!activeQuery && (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                Bắt đầu tìm kiếm
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Nhập từ vựng, chữ Kanji, ngữ pháp tiếng Nhật hoặc ý nghĩa tiếng Việt để tìm tài liệu học phù hợp.
              </p>
            </div>
          )}

          {/* 2. Loading State */}
          {activeQuery && isLoading && (
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-500">
                Đang tìm kiếm cho "{activeQuery}"...
              </p>
            </div>
          )}

          {/* 3. Error State */}
          {activeQuery && !isLoading && isError && (
            <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-rose-900 mb-1">
                Đã xảy ra lỗi khi tìm kiếm
              </h3>
              <p className="text-sm text-rose-700 mb-4">
                {(error as any)?.response?.data?.message || "Không thể kết nối đến máy chủ. Vui lòng thử lại sau."}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-xl hover:bg-rose-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          )}

          {/* 4. Empty Results */}
          {activeQuery && !isLoading && !isError && items.length === 0 && (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                Không tìm thấy kết quả nào
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">
                Không có nội dung nào phù hợp với từ khóa <span className="font-semibold text-slate-700">"{activeQuery}"</span>.
              </p>
              <div className="text-xs text-slate-400 bg-slate-50 p-4 rounded-xl max-w-sm mx-auto text-left space-y-1">
                <p className="font-semibold text-slate-600">Gợi ý tìm kiếm:</p>
                <p>• Kiểm tra lại lỗi chính tả hoặc khoảng cách</p>
                <p>• Thử tìm kiếm bằng chữ Hán (Kanji), Hiragana hoặc nghĩa tiếng Việt</p>
                <p>• Chọn "Tất cả" ở mục loại nội dung và trình độ</p>
              </div>
            </div>
          )}

          {/* 5. Results List */}
          {activeQuery && !isLoading && !isError && items.length > 0 && (
            <div>
              {/* Results summary banner */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <p className="text-sm text-slate-600">
                  Kết quả cho <span className="font-bold text-slate-900">"{activeQuery}"</span>
                </p>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-full">
                  {totalResults} kết quả
                </span>
              </div>

              {/* Result cards */}
              <div className="space-y-3 mb-8" id="search-results-list">
                {items.map((item) => (
                  <SearchResultCard
                    key={`${item.contentType}-${item.contentId}`}
                    item={item}
                  />
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => handlePageChange(activePage - 1)}
                    disabled={activePage === 0}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    Trước
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      // Only show current page, adjacent pages, first and last page
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
                            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              idx === activePage
                                ? "bg-indigo-600 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      } else if (
                        idx === 1 &&
                        activePage > 2
                      ) {
                        return (
                          <span key={idx} className="px-1 text-slate-400 text-xs">
                            ...
                          </span>
                        );
                      } else if (
                        idx === totalPages - 2 &&
                        activePage < totalPages - 3
                      ) {
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
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    Sau
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
