import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import LearningLayout from "../../../components/learning/LearningLayout";
import {
  HandbookSearchInput,
  HandbookCategoryNav,
  ArticleCard,
} from "../components";
import {
  ALL_HANDBOOK_ARTICLES,
  getFeaturedArticles,
} from "../data/articles";
import { filterHandbookArticles } from "../utils/searchHelper";
import { HandbookCategoryType, HandbookLevel } from "../types";

export const HandbookHomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<HandbookCategoryType | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<HandbookLevel | "all">("all");
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return filterHandbookArticles(ALL_HANDBOOK_ARTICLES, {
      query: searchQuery,
      category: selectedCategory,
      level: selectedLevel,
      tag: activeTag,
    });
  }, [searchQuery, selectedCategory, selectedLevel, activeTag]);

  const featuredArticles = useMemo(() => getFeaturedArticles(4), []);

  const isFiltering = Boolean(
    searchQuery.trim() ||
      selectedCategory !== "all" ||
      selectedLevel !== "all" ||
      activeTag
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setActiveTag(undefined);
  };

  return (
    <LearningLayout
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Sổ tay Nhật ngữ", isCurrent: true },
      ]}
      title="Sổ tay Nhật ngữ (ハンドブック)"
      subtitle="Cẩm nang tra cứu & đúc kết kiến thức"
      description="Tra cứu nhanh các cặp trợ từ dễ nhầm, phó từ mức độ, quy tắc Hán - Việt, mẫu câu giao tiếp và những bẫy ngữ pháp thường gặp."
    >
      <div className="space-y-8">
        {/* Search & Filter Bar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#F0F7FF] to-[#E6F0FA] border border-[#CBD5E1] space-y-4">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
              Tra cứu nhanh trong sổ tay
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              Tìm kiếm theo từ khóa, trợ từ, quy tắc chuyển âm, mẫu câu hoặc thẻ phân loại.
            </p>
          </div>

          <HandbookSearchInput
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            onClear={() => setSearchQuery("")}
          />

          {/* Filters: Category and Level */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-[#475569]">Cấp độ:</span>
              {(["all", "N5", "N4", "ALL"] as (HandbookLevel | "all")[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedLevel === lvl
                      ? "bg-[#2563EB] text-white shadow-2xs"
                      : "bg-white text-[#475569] border border-[#CBD5E1] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {lvl === "all" ? "Tất cả cấp độ" : lvl}
                </button>
              ))}
            </div>

            {activeTag && (
              <div className="flex items-center gap-1.5 text-xs text-[#1E40AF] bg-[#DBEAFE] px-2.5 py-1 rounded-lg">
                <span>Thẻ: #{activeTag}</span>
                <button
                  type="button"
                  onClick={() => setActiveTag(undefined)}
                  className="hover:text-red-600 font-bold ml-1"
                  aria-label="Xóa bộ lọc thẻ"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* If user is actively searching or filtering, show search results */}
        {isFiltering ? (
          <section className="space-y-4" aria-label="Kết quả tìm kiếm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <span>Kết quả tìm kiếm</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E2E8F0] text-[#334155]">
                  {filteredArticles.length} bài viết
                </span>
              </h2>

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs sm:text-sm font-semibold text-[#2563EB] hover:underline"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-3">
                <div className="text-4xl">🔍</div>
                <h3 className="text-base font-bold text-[#0F172A]">
                  Không tìm thấy bài viết phù hợp
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
                  Không có bài viết nào khớp với từ khóa "{searchQuery}". Hãy thử tìm kiếm bằng từ khóa ngắn hơn, tra cứu bằng chữ Kanji hoặc xóa bộ lọc.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-2 inline-flex items-center px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors"
                >
                  Xem tất cả cẩm nang
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onTagClick={(tag) => setActiveTag(tag)}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Category Cards Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                    5 Chuyên mục cốt lõi
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Chọn lĩnh vực bạn muốn tra cứu và nắm bắt bản chất ngữ nghĩa
                  </p>
                </div>
              </div>

              <HandbookCategoryNav variant="cards" />
            </section>

            {/* Featured Articles Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                    Bài viết trọng tâm nên đọc
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Những điểm kiến thức hay nhầm lẫn nhất được đúc kết cô đọng
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onTagClick={(tag) => setActiveTag(tag)}
                  />
                ))}
              </div>
            </section>

            {/* All Articles Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                    Tất cả cẩm nang ({ALL_HANDBOOK_ARTICLES.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Toàn bộ danh mục bài viết tra cứu đã sẵn sàng
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_HANDBOOK_ARTICLES.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onTagClick={(tag) => setActiveTag(tag)}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </LearningLayout>
  );
};
