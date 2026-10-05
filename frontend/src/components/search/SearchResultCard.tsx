import React from "react";
import { Link } from "react-router-dom";
import { SearchResultItem, SearchContentType } from "../../types/search";

interface SearchResultCardProps {
  item: SearchResultItem;
}

const TYPE_CONFIG: Record<
  SearchContentType,
  { label: string; badgeClass: string; routePrefix: string }
> = {
  VOCABULARY: {
    label: "Từ vựng",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    routePrefix: "/vocabulary",
  },
  GRAMMAR: {
    label: "Ngữ pháp",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    routePrefix: "/grammar",
  },
  KANJI: {
    label: "Kanji",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
    routePrefix: "/kanjis",
  },
  LISTENING: {
    label: "Luyện nghe",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    routePrefix: "/listenings",
  },
  READING: {
    label: "Bài đọc",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    routePrefix: "/readings",
  },
  EXERCISE: {
    label: "Bài tập",
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    routePrefix: "/exercises",
  },
};

export default function SearchResultCard({ item }: SearchResultCardProps) {
  const config = TYPE_CONFIG[item.contentType] || {
    label: item.contentType,
    badgeClass: "bg-slate-50 text-slate-700 border-slate-200",
    routePrefix: "",
  };

  const linkTarget = config.routePrefix ? `${config.routePrefix}/${item.contentId}` : null;

  const content = (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${config.badgeClass}`}
          >
            {config.label}
          </span>

          {item.level && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              {item.level}
            </span>
          )}

          {item.lessonTitle && (
            <span className="inline-flex items-center text-xs text-slate-500 font-medium">
              <span className="mr-1 text-slate-300">•</span>
              {item.lessonTitle}
            </span>
          )}
        </div>
      </div>

      <div className="mb-1.5">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors inline-flex items-center gap-2">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-sm font-medium text-slate-500 mt-0.5">
            {item.subtitle}
          </p>
        )}
      </div>

      {item.description && (
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mt-2 pt-2 border-t border-slate-100">
          {item.description}
        </p>
      )}
    </div>
  );

  if (linkTarget) {
    return (
      <Link to={linkTarget} className="block focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl">
        {content}
      </Link>
    );
  }

  return content;
}
