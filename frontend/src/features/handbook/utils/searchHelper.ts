import { HandbookArticle, SearchFilterOptions } from "../types";
import { ALL_HANDBOOK_ARTICLES } from "../data/articles";

export function filterHandbookArticles(
  articles: HandbookArticle[] = ALL_HANDBOOK_ARTICLES,
  options: SearchFilterOptions = {}
): HandbookArticle[] {
  const { query, category, level, tag } = options;

  const trimmedQuery = query ? query.trim().toLowerCase() : "";

  return articles.filter((article) => {
    // 1. Category Filter
    if (category && category !== "all") {
      if (article.categoryId !== category) {
        return false;
      }
    }

    // 2. Level Filter
    if (level && level !== "all") {
      if (article.level !== "ALL" && article.level !== level) {
        return false;
      }
    }

    // 3. Tag Filter
    if (tag) {
      const normalizedTag = tag.trim().toLowerCase();
      const hasTag = article.tags.some((t) => t.toLowerCase() === normalizedTag);
      if (!hasTag) {
        return false;
      }
    }

    // 4. Query Search
    if (!trimmedQuery) {
      return true;
    }

    // Match title
    if (article.title.toLowerCase().includes(trimmedQuery)) {
      return true;
    }

    // Match japanese title
    if (article.japaneseTitle && article.japaneseTitle.toLowerCase().includes(trimmedQuery)) {
      return true;
    }

    // Match summary
    if (article.summary.toLowerCase().includes(trimmedQuery)) {
      return true;
    }

    // Match tags
    if (article.tags.some((t) => t.toLowerCase().includes(trimmedQuery))) {
      return true;
    }

    // Match sections (title & content)
    const matchesSection = article.sections.some(
      (sec) =>
        sec.title.toLowerCase().includes(trimmedQuery) ||
        sec.content.toLowerCase().includes(trimmedQuery) ||
        (sec.tableData &&
          sec.tableData.rows.some((row) =>
            row.some((cell) => cell.toLowerCase().includes(trimmedQuery))
          ))
    );
    if (matchesSection) {
      return true;
    }

    // Match examples (japanese, reading, vietnamese)
    const matchesExample = article.examples.some(
      (ex) =>
        ex.japanese.toLowerCase().includes(trimmedQuery) ||
        ex.reading.toLowerCase().includes(trimmedQuery) ||
        ex.vietnamese.toLowerCase().includes(trimmedQuery) ||
        (ex.romaji && ex.romaji.toLowerCase().includes(trimmedQuery))
    );
    if (matchesExample) {
      return true;
    }

    // Match comparisons
    if (article.comparisons) {
      if (article.comparisons.title.toLowerCase().includes(trimmedQuery)) {
        return true;
      }
      const matchesComparisonItem = article.comparisons.items.some(
        (item) =>
          item.subject.toLowerCase().includes(trimmedQuery) ||
          item.nuance.toLowerCase().includes(trimmedQuery) ||
          item.example.toLowerCase().includes(trimmedQuery) ||
          item.exampleTranslation.toLowerCase().includes(trimmedQuery)
      );
      if (matchesComparisonItem) {
        return true;
      }
    }

    return false;
  });
}
