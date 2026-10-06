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
} from "../data/categories";
import { filterHandbookArticles } from "../utils/searchHelper";
import { HandbookLevel, HandbookCategoryType } from "../types";

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

  // Filtered within this category
  const filteredArticles = useMemo(() => {
    if (!categoryId) return [];
    return filterHandbookArticles(categoryArticles, {
      query: searchQuery,
      level: selectedLevel,
      tag: activeTag,
    });
  }, [categoryId, categoryArticles, searchQuery, selectedLevel, activeTag]);

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
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#E2E8F0] space-y-4">
          <div className="text-5xl">📂</div>
          <h2 className="text-xl font-bold text-[#0F172A]">
            Danh mục "{category}" không tồn tại
          </h2>
          <p className="text-sm text-[#64748B] max-w-md mx-auto">
            Sổ tay hiện hỗ trợ 5 danh mục chính: Ngữ pháp (grammar), Từ vựng (vocabulary), Hán tự (kanji), Hội thoại (conversation) và Ghi chú (notes).
          </p>
          <div className="pt-2">
            <Link
              to="/handbook"
              className="inline-flex items-center px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors"
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
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-[#475569] bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] transition-colors"
        >
          <span>&larr;</span>
          <span>Tất cả chuyên mục</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Category Pills Navigation */}
        <HandbookCategoryNav currentCategory={categoryId} />

        {/* In-category Search & Filter */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
          <HandbookSearchInput
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            onClear={() => setSearchQuery("")}
            placeholder={`Tìm kiếm trong chuyên mục ${categoryMeta.name}...`}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-[#475569]">Lọc theo cấp độ:</span>
              {(["all", "N5", "N4", "ALL"] as (HandbookLevel | "all")[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    selectedLevel === lvl
                      ? "bg-[#2563EB] text-white shadow-2xs"
                      : "bg-white text-[#475569] border border-[#CBD5E1] hover:bg-[#F1F5F9]"
                  }`}
                >
                  {lvl === "all" ? "Tất cả" : lvl}
                </button>
              ))}
            </div>

            {activeTag && (
              <div className="flex items-center gap-1.5 text-[#1E40AF] bg-[#DBEAFE] px-2.5 py-1 rounded-lg">
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

        {/* Article Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
              Danh sách cẩm nang ({filteredArticles.length})
            </h2>
            {(searchQuery || selectedLevel !== "all" || activeTag) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLevel("all");
                  setActiveTag(undefined);
                }}
                className="text-xs font-semibold text-[#2563EB] hover:underline"
              >
                Đặt lại bộ lọc
              </button>
            )}
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-3">
              <div className="text-4xl">🔍</div>
              <h3 className="text-base font-bold text-[#0F172A]">
                Không có bài viết phù hợp trong danh mục này
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B]">
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
      </div>
    </LearningLayout>
  );
};
