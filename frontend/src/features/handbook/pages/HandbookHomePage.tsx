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
import { getCategoryMeta } from "../data/categories";

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
        <div className="surface p-5 sm:p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="font-display text-base sm:text-lg font-bold text-[#1F1C18]">
              Tra cứu nhanh trong sổ tay
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5246]">
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
              <span className="text-xs font-semibold text-[#5A5246]">Cấp độ:</span>
              {(["all", "N5", "N4", "ALL"] as (HandbookLevel | "all")[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedLevel === lvl
                      ? "bg-[#2F5496] text-white shadow-2xs"
                      : "bg-white text-[#5A5246] border border-[#D3CABA] hover:bg-[#FAF7F1]"
                  }`}
                >
                  {lvl === "all" ? "Tất cả cấp độ" : lvl}
                </button>
              ))}
            </div>

            {activeTag && (
              <div className="flex items-center gap-1.5 text-xs text-[#213960] bg-[#DDE7F5] px-2.5 py-1 rounded-lg">
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
              <h2 className="font-display text-lg font-bold text-[#1F1C18] flex items-center gap-2">
                <span>Kết quả tìm kiếm</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E7E0D2] text-[#433D34]">
                  {filteredArticles.length} bài viết
                </span>
              </h2>

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs sm:text-sm font-semibold text-[#2F5496] hover:underline"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-12 px-4 surface space-y-3">
                <div className="text-4xl">🔍</div>
                <h3 className="text-base font-bold text-[#1F1C18]">
                  Không tìm thấy bài viết phù hợp
                </h3>
                <p className="text-xs sm:text-sm text-[#766D5E] max-w-md mx-auto">
                  Không có bài viết nào khớp với từ khóa "{searchQuery}". Hãy thử tìm kiếm bằng từ khóa ngắn hơn, tra cứu bằng chữ Kanji hoặc xóa bộ lọc.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-2 inline-flex items-center px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#2F5496] text-white hover:bg-[#213960] transition-colors"
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
                  <h2 className="font-display text-lg sm:text-xl font-extrabold text-[#1F1C18]">
                    5 Chuyên mục cốt lõi
                  </h2>
                  <p className="text-xs sm:text-sm text-[#766D5E]">
                    Chọn lĩnh vực bạn muốn tra cứu và nắm bắt bản chất ngữ nghĩa
                  </p>
                </div>
              </div>

              <HandbookCategoryNav variant="cards" />
            </section>

            {/* Featured Articles Section: one big highlight + compact reading list */}
            <section className="space-y-4" aria-labelledby="hb-featured">
              <div>
                <h2 id="hb-featured" className="font-display text-lg sm:text-xl font-extrabold text-[#1F1C18]">
                  Bài viết trọng tâm nên đọc
                </h2>
                <p className="text-xs sm:text-sm text-[#766D5E]">
                  Những điểm kiến thức hay nhầm lẫn nhất được đúc kết cô đọng
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {featuredArticles[0] && (
                  <Link
                    to={`/handbook/${featuredArticles[0].categoryId}/${featuredArticles[0].slug}`}
                    className="hero-ink pattern-seigaiha lg:col-span-3 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between gap-6 min-h-[220px] group transition-transform hover:-translate-y-0.5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                        <span className="px-2.5 py-1 rounded-full bg-amber-400 text-amber-950">Nổi bật</span>
                        <span className="px-2.5 py-1 rounded-full bg-white/15">{featuredArticles[0].level}</span>
                        <span className="text-white/70 normal-case tracking-normal font-medium">
                          {featuredArticles[0].readTimeMinutes} phút đọc
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold leading-snug">
                        {featuredArticles[0].title}
                      </h3>
                      {featuredArticles[0].japaneseTitle && (
                        <p lang="ja" className="font-japanese text-white/70 text-sm">{featuredArticles[0].japaneseTitle}</p>
                      )}
                      <p className="text-sm text-white/80 leading-relaxed line-clamp-3">{featuredArticles[0].summary}</p>
                    </div>
                    <span className="text-sm font-bold flex items-center gap-1.5">
                      Đọc ngay
                      <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                    </span>
                  </Link>
                )}

                <ul className="lg:col-span-2 flex flex-col gap-3">
                  {featuredArticles.slice(1).map((article) => (
                    <li key={article.id}>
                      <Link
                        to={`/handbook/${article.categoryId}/${article.slug}`}
                        className="surface surface-hover p-4 flex items-start gap-3 group"
                      >
                        <span className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-lg shrink-0" aria-hidden="true">
                          {getCategoryMeta(article.categoryId)?.icon || "📖"}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-sm font-bold text-[#1F1C18] group-hover:text-indigo-700 transition-colors leading-snug">
                            {article.title}
                          </span>
                          <span className="block text-xs text-[#766D5E] mt-0.5">
                            {article.level} &middot; {article.readTimeMinutes} phút đọc
                          </span>
                        </span>
                        <span className="text-indigo-600 transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* All Articles Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-extrabold text-[#1F1C18]">
                    Tất cả cẩm nang ({ALL_HANDBOOK_ARTICLES.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-[#766D5E]">
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
