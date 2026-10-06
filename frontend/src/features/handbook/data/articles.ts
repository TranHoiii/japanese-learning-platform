import { HandbookArticle, HandbookCategoryType } from "../types";
import { grammarArticles } from "./grammarArticles";
import { vocabularyArticles } from "./vocabularyArticles";
import { kanjiArticles } from "./kanjiArticles";
import { conversationArticles } from "./conversationArticles";
import { notesArticles } from "./notesArticles";

export const ALL_HANDBOOK_ARTICLES: HandbookArticle[] = [
  ...grammarArticles,
  ...vocabularyArticles,
  ...kanjiArticles,
  ...conversationArticles,
  ...notesArticles,
];

export function getArticlesByCategory(categoryId: HandbookCategoryType): HandbookArticle[] {
  return ALL_HANDBOOK_ARTICLES.filter((article) => article.categoryId === categoryId);
}

export function getArticleBySlug(
  categoryId: HandbookCategoryType,
  slug: string
): HandbookArticle | undefined {
  return ALL_HANDBOOK_ARTICLES.find(
    (article) => article.categoryId === categoryId && article.slug === slug
  );
}

export function getArticleCountByCategory(categoryId: HandbookCategoryType): number {
  return ALL_HANDBOOK_ARTICLES.filter((article) => article.categoryId === categoryId).length;
}

export function getFeaturedArticles(limit: number = 4): HandbookArticle[] {
  // Select top highlight articles across categories
  const featuredSlugs = [
    "phan-biet-tro-tu-wa-va-ga",
    "quy-tac-chuyen-am-han-viet-sang-on-yomi",
    "cach-tu-choi-kheo-leo-trong-tieng-nhat",
    "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
  ];
  const list = ALL_HANDBOOK_ARTICLES.filter((a) => featuredSlugs.includes(a.slug));
  return list.slice(0, limit);
}
