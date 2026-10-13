import React from "react";
import { useParams, Link } from "react-router-dom";
import LearningLayout from "../../../components/learning/LearningLayout";
import ReadingProgress from "../../../components/learning/ReadingProgress";
import {
  ArticleSectionView,
  ArticleExampleCard,
  ArticleComparisonTable,
  NotesCallout,
  WarningsCallout,
  RelatedArticlesList,
} from "../components";
import { getArticleBySlug } from "../data/articles";
import { isValidCategory, getCategoryMeta } from "../data/categories";
import { HandbookCategoryType } from "../types";

export const HandbookArticleDetailPage: React.FC = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();

  // 1. Check if category is valid
  const validCat = isValidCategory(category);
  const categoryId = validCat ? (category as HandbookCategoryType) : null;
  const categoryMeta = categoryId ? getCategoryMeta(categoryId) : null;

  // 2. Find article by slug and category
  const article = categoryId && slug ? getArticleBySlug(categoryId, slug) : undefined;

  // If invalid category or invalid slug, render clear fallback
  if (!validCat || !categoryMeta || !categoryId || !article) {
    return (
      <LearningLayout
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Sổ tay Nhật ngữ", href: "/handbook" },
          ...(categoryMeta
            ? [{ label: categoryMeta.name, href: `/handbook/${categoryMeta.id}` }]
            : []),
          { label: "Bài viết không tồn tại", isCurrent: true },
        ]}
        title="Không tìm thấy bài viết"
        subtitle="404 - Nội dung không tồn tại"
        description="Bài viết bạn đang tìm kiếm không tồn tại, đã bị đổi đường dẫn hoặc danh mục không chính xác."
      >
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#E7E0D2] space-y-4">
          <div className="text-5xl">📄</div>
          <h2 className="font-display text-xl font-bold text-[#1F1C18]">
            Bài viết "{slug || "Không xác định"}" không tồn tại
          </h2>
          <p className="text-sm text-[#766D5E] max-w-md mx-auto">
            Vui lòng kiểm tra lại liên kết hoặc quay về danh mục để tra cứu các chủ đề khác.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            {categoryMeta && (
              <Link
                to={`/handbook/${categoryMeta.id}`}
                className="inline-flex items-center px-4 py-2.5 rounded-xl font-semibold text-sm bg-white border border-[#D3CABA] text-[#433D34] hover:bg-[#FAF7F1] transition-colors"
              >
                &larr; Về danh mục {categoryMeta.name}
              </Link>
            )}
            <Link
              to="/handbook"
              className="inline-flex items-center px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#2F5496] text-white hover:bg-[#213960] transition-colors"
            >
              Về Trang chủ Sổ tay
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
        { label: categoryMeta.name, href: `/handbook/${categoryMeta.id}` },
        { label: article.title, isCurrent: true },
      ]}
      title={article.title}
      subtitle={categoryMeta.name}
      actions={
        <Link
          to={`/handbook/${categoryMeta.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#5A5246] bg-white border border-[#D3CABA] hover:bg-[#FAF7F1] transition-colors shadow-2xs"
        >
          <span>&larr;</span>
          <span>{categoryMeta.name}</span>
        </Link>
      }
    >
      <ReadingProgress />
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_230px] lg:gap-8 items-start">
      <article className="space-y-8 min-w-0">
        {/* Article Meta Header */}
        <div className="surface hero-ink pattern-seigaiha text-white p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white/15 text-white">
                <span>{categoryMeta.icon}</span>
                <span>{categoryMeta.name}</span>
              </span>

              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/10 text-white/90 border border-white/20">
                {article.level}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{article.readTimeMinutes} phút đọc</span>
              </span>
              <span>•</span>
              <span>Cập nhật: {article.updatedAt}</span>
            </div>
          </div>

          {article.japaneseTitle && (
            <p
              lang="ja"
              className="text-sm sm:text-base font-semibold text-white/80 font-japanese"
            >
              🇯🇵 {article.japaneseTitle}
            </p>
          )}

          {/* Summary Callout */}
          <div className="p-4 rounded-xl bg-white/10 border-l-4 border-amber-300 text-sm sm:text-base text-white/90 leading-relaxed">
            <p className="font-bold text-amber-300 mb-1">Tóm tắt cốt lõi:</p>
            <p>{article.summary}</p>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs text-white/70">Chủ đề liên quan:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-white/10 text-white/90"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Comparison Table / Module if exists */}
        {article.comparisons && (
          <ArticleComparisonTable comparison={article.comparisons} />
        )}

        {/* Sections */}
        <div className="space-y-6">
          {article.sections.map((section) => (
            <div
              key={section.id}
              id={`sec-${section.id}`}
              className="surface p-5 sm:p-6 scroll-mt-24"
            >
              <ArticleSectionView section={section} />
            </div>
          ))}
        </div>

        {/* Examples Section */}
        {article.examples && article.examples.length > 0 && (
          <section className="space-y-4" aria-label="Ví dụ thực tế">
            <div className="flex items-center gap-2">
              <span className="text-xl">💬</span>
              <h2 className="font-display text-lg sm:text-xl font-bold text-[#1F1C18]">
                Ví dụ thực tế & Ngữ cảnh chuẩn bản xứ
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {article.examples.map((ex, idx) => (
                <ArticleExampleCard key={ex.id} example={ex} index={idx} />
              ))}
            </div>
          </section>
        )}

        {/* Notes & Warnings Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NotesCallout notes={article.notes} />
          <WarningsCallout warnings={article.warnings} />
        </div>

        {/* Related Articles */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F1] border border-[#E7E0D2]">
            <RelatedArticlesList relatedArticles={article.relatedArticles} />
          </div>
        )}

        {/* Bottom Back Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E7E0D2]">
          <Link
            to={`/handbook/${categoryMeta.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2F5496] hover:text-[#213960] transition-colors"
          >
            <span>&larr;</span>
            <span>Về chuyên mục {categoryMeta.name}</span>
          </Link>

          <Link
            to="/handbook"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#766D5E] hover:text-[#1F1C18] transition-colors"
          >
            <span>Trang chủ Sổ tay</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </article>

      {article.sections.length > 1 && (
        <aside className="hidden lg:block sticky top-24 self-start" aria-label="Mục lục bài viết">
          <nav className="surface p-4 space-y-1">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#766D5E] mb-2">Trong bài viết</p>
            {article.sections.map((s, i) => (
              <a key={s.id} href={`#sec-${s.id}`} className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold text-[#5A5246] hover:bg-[#EEF3FA] hover:text-[#213960] transition-colors">
                <span className="text-[#9A8F7E] tabular-nums">{i + 1}.</span>
                <span className="leading-snug">{s.title}</span>
              </a>
            ))}
          </nav>
        </aside>
      )}
      </div>
    </LearningLayout>
  );
};
