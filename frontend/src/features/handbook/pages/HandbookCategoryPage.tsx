import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import LearningLayout from "../../../components/learning/LearningLayout";
import {
  HandbookSearchInput,
  HandbookCategoryNav,
  ArticleCard,
} from "../components";
import {
  getArticlesByCategory,
} from "../data/articles";
import {
  isValidCategory,
  getCategoryMeta,
  HANDBOOK_CATEGORIES,
} from "../data/categories";
import { filterHandbookArticles } from "../utils/searchHelper";
import { HandbookLevel, HandbookCategoryType } from "../types";
import { cn } from "../../../utils/cn";

export const HandbookCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<HandbookLevel | "all">("all");
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);

  // Validate category param
  const valid = isValidCategory(category);
  const categoryId = valid ? (category as HandbookCategoryType) : null;
  const categoryMeta = categoryId ? getCategoryMeta(categoryId) : null;

  // Articles for this category
  const categoryArticles = useMemo(() => {
    if (!categoryId) return [];
    return getArticlesByCategory(categoryId);
  }, [categoryId]);

  // Featured article: first article or most comprehensive
  const featuredArticle = categoryArticles.length > 0 ? categoryArticles[0] : null;

  // Filtered within this category
  const filteredArticles = useMemo(() => {
    if (!categoryId) return [];
    return filterHandbookArticles(categoryArticles, {
      query: searchQuery,
      level: selectedLevel,
      tag: activeTag,
    });
  }, [categoryId, categoryArticles, searchQuery, selectedLevel, activeTag]);

  // Collect all unique tags in this category
  const popularTags = useMemo(() => {
    const set = new Set<string>();
    categoryArticles.forEach((a) => a.tags?.forEach((t) => set.add(t)));
    return Array.from(set).slice(0, 8);
  }, [categoryArticles]);

  // If invalid category, render clear and safe fallback state
  if (!valid || !categoryMeta || !categoryId) {
    return (
      <LearningLayout
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Sổ tay Nhật ngữ", href: "/handbook" },
          { label: "Không tìm thấy danh mục", isCurrent: true },
        ]}
        title="Danh mục không tồn tại"
        subtitle="404 - Lỗi đường dẫn"
        description="Đường dẫn chuyên mục sổ tay bạn truy cập không hợp lệ hoặc đã bị thay đổi."
      >
        <div className="text-center py-16 px-4 surface rounded-3xl border border-[#E7E0D2] space-y-4">
          <div className="text-5xl">📂</div>
          <h2 className="font-display text-xl font-bold text-[#1F1C18]">
            Danh mục "{category}" không tồn tại
          </h2>
          <p className="text-sm text-[#766D5E] max-w-md mx-auto">
            Sổ tay hiện hỗ trợ 5 danh mục chính: Ngữ pháp (grammar), Từ vựng (vocabulary), Hán tự (kanji), Hội thoại (conversation) và Ghi chú (notes).
          </p>
          <div className="pt-2">
            <Link
              to="/handbook"
              className="inline-flex items-center px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#2F5496] text-white hover:bg-[#213960] transition-colors"
            >
              &larr; Trở về Trang chủ Sổ tay
            </Link>
          </div>
        </div>
      </LearningLayout>
    );
  }

  return (
    <LearningLayout
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Sổ tay Nhật ngữ", href: "/handbook" },
        { label: categoryMeta.name, isCurrent: true },
      ]}
      title={`${categoryMeta.icon} ${categoryMeta.name}`}
      subtitle={categoryMeta.japaneseName}
      description={categoryMeta.description}
      actions={
        <Link
          to="/handbook"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-[#5A5246] bg-white border border-[#D3CABA] hover:bg-[#FAF7F1] transition-colors"
        >
          <span>&larr;</span>
          <span>Tất cả chuyên mục</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Category Pills Navigation */}
        <HandbookCategoryNav currentCategory={categoryId} />

        {/* FEATURED ARTICLE HERO CARD */}
        {featuredArticle && !searchQuery && selectedLevel === "all" && !activeTag && (
          <div className="surface rounded-3xl p-6 sm:p-8 border-2 border-indigo-200/80 shadow-zen bg-gradient-to-br from-indigo-500/5 via-transparent to-rose-500/5 relative overflow-hidden group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-500 text-white">
                    ⭐ Bài đọc tiêu biểu
                  </span>
                  <span className="text-xs text-slate-500 font-bold">
                    ⏱️ {featuredArticle.readTimeMinutes} phút đọc
                  </span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1F1C18] group-hover:text-indigo-800 transition-colors">
                  <Link to={`/handbook/${categoryId}/${featuredArticle.slug}`}>
                    {featuredArticle.title}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-[#5A5246] leading-relaxed line-clamp-2">
                  {featuredArticle.summary}
                </p>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  {featuredArticle.tags?.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-indigo-700 hover:border-indigo-300 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 self-start lg:self-center">
                <Link
                  to={`/handbook/${categoryId}/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow-card transition-all"
                >
                  <span>Đọc bài viết</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* MAIN SPLIT EDITORIAL DIRECTORY LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column (8 cols): Filters & Article Cards */}
          <div className="lg:col-span-8 space-y-5">
            {/* Search & Level Filters Bar */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#FAF7F1] border border-[#E7E0D2] space-y-3 shadow-2xs">
              <HandbookSearchInput
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                onClear={() => setSearchQuery("")}
                placeholder={`Tìm kiếm trong chuyên mục ${categoryMeta.name}...`}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#5A5246]">Trình độ:</span>
                  {(["all", "N5", "N4", "ALL"] as (HandbookLevel | "all")[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevel(lvl)}
                      className={cn(
                        "px-3 py-1 rounded-xl font-bold transition-all cursor-pointer",
                        selectedLevel === lvl
                          ? "bg-[#2F5496] text-white shadow-2xs"
                          : "bg-white text-[#5A5246] border border-[#D3CABA] hover:bg-[#F3EEE5]",
                      )}
                    >
                      {lvl === "all" ? "Tất cả" : lvl}
                    </button>
                  ))}
                </div>

                {activeTag && (
                  <div className="flex items-center gap-1.5 text-indigo-900 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-xl">
                    <span className="font-semibold">Thẻ: #{activeTag}</span>
                    <button
                      type="button"
                      onClick={() => setActiveTag(undefined)}
                      className="hover:text-rose-600 font-bold ml-1 cursor-pointer"
                      aria-label="Xóa bộ lọc thẻ"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-[#1F1C18]">
                Tất cả bài viết ({filteredArticles.length})
              </h3>
              {(searchQuery || selectedLevel !== "all" || activeTag) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLevel("all");
                    setActiveTag(undefined);
                  }}
                  className="text-xs font-bold text-[#2F5496] hover:underline cursor-pointer"
                >
                  Đặt lại bộ lọc
                </button>
              )}
            </div>

            {/* Articles List / Grid */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12 px-4 surface rounded-3xl border border-[#E7E0D2] space-y-3">
                <div className="text-4xl">🔍</div>
                <h4 className="text-base font-bold text-[#1F1C18]">
                  Không tìm thấy bài viết phù hợp
                </h4>
                <p className="text-xs sm:text-sm text-[#766D5E]">
                  Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn cấp độ khác.
                </p>
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
          </div>

          {/* Sidebar Column (4 cols): Other Categories & Popular Tags */}
          <aside className="lg:col-span-4 space-y-5" aria-label="Điều hướng chuyên mục bổ trợ">
            {/* Other Categories */}
            <div className="surface rounded-3xl p-5 border border-[#E7E0D2] shadow-zen space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#766D5E] block">
                Chuyên mục khác trong Sổ tay
              </span>
              <div className="space-y-1.5">
                {HANDBOOK_CATEGORIES.map((cat) => {
                  const isCurrent = cat.id === categoryId;
                  return (
                    <Link
                      key={cat.id}
                      to={`/handbook/${cat.id}`}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-2xl transition-all text-xs font-bold",
                        isCurrent
                          ? "bg-indigo-50 text-indigo-900 border border-indigo-200"
                          : "text-slate-700 hover:bg-slate-100",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-japanese">{cat.japaneseName}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Popular Tags Cloud */}
            {popularTags.length > 0 && (
              <div className="surface rounded-3xl p-5 border border-[#E7E0D2] shadow-zen space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#766D5E] block">
                  Chủ đề phổ biến
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(activeTag === tag ? undefined : tag)}
                      className={cn(
                        "text-xs px-2.5 py-1 rounded-xl font-semibold transition-colors cursor-pointer",
                        activeTag === tag
                          ? "bg-indigo-600 text-white shadow-2xs"
                          : "bg-white border border-[#E7E0D2] text-slate-700 hover:bg-[#FAF7F1]",
                      )}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Advice Card */}
            <div className="rounded-3xl bg-amber-500/10 border border-amber-300/80 p-5 space-y-2 text-xs text-amber-950">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <span aria-hidden="true">💡</span>
                <span>Mẹo tra cứu hiệu quả</span>
              </div>
              <p className="leading-relaxed">
                Khi đọc cẩm nang, hãy chú ý các hộp <strong>Bảng đối chiếu</strong> và <strong>Cảnh báo nhầm lẫn</strong>. Đừng chỉ đọc lướt, hãy thử đặt ngay 1 câu ví dụ của riêng mình vào sổ tay ghi chép cá nhân.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </LearningLayout>
  );
};

export default HandbookCategoryPage;
