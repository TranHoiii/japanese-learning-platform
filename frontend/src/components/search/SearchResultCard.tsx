import React from "react";
import { Link } from "react-router-dom";
import { SearchResultItem, SearchContentType } from "../../types/search";
import { cn } from "../../utils/cn";

interface SearchResultCardProps {
  item: SearchResultItem;
}

const TYPE_CONFIG: Record<
  SearchContentType,
  {
    label: string;
    icon: string;
    kanjiSeal: string;
    badgeClass: string;
    routePrefix: string;
  }
> = {
  VOCABULARY: {
    label: "Từ vựng",
    icon: "📖",
    kanjiSeal: "語",
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300/60 dark:border-emerald-600/40",
    routePrefix: "/vocabulary",
  },
  GRAMMAR: {
    label: "Ngữ pháp",
    icon: "⛩️",
    kanjiSeal: "文",
    badgeClass: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-300/60 dark:border-blue-600/40",
    routePrefix: "/grammar",
  },
  KANJI: {
    label: "Chữ Hán Kanji",
    icon: "🈸",
    kanjiSeal: "字",
    badgeClass: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-300/60 dark:border-rose-600/40",
    routePrefix: "/kanjis",
  },
  LISTENING: {
    label: "Luyện nghe",
    icon: "🎧",
    kanjiSeal: "聴",
    badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-300/60 dark:border-amber-600/40",
    routePrefix: "/listenings",
  },
  READING: {
    label: "Bài đọc hiểu",
    icon: "📰",
    kanjiSeal: "読",
    badgeClass: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-300/60 dark:border-purple-600/40",
    routePrefix: "/readings",
  },
  EXERCISE: {
    label: "Bài tập rèn luyện",
    icon: "✍️",
    kanjiSeal: "習",
    badgeClass: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-300/60 dark:border-indigo-600/40",
    routePrefix: "/exercises",
  },
};

export default function SearchResultCard({ item }: SearchResultCardProps) {
  const config = TYPE_CONFIG[item.contentType] || {
    label: item.contentType,
    icon: "🔖",
    kanjiSeal: "記",
    badgeClass: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-300/60",
    routePrefix: "",
  };

  const linkTarget = config.routePrefix ? `${config.routePrefix}/${item.contentId}` : null;

  const cardContent = (
    <div className="surface rounded-2xl p-4 sm:p-5 border border-[#E7E0D2] shadow-2xs hover:shadow-zen hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200 group relative overflow-hidden">
      {/* Background Decorative Kanji Watermark */}
      <div
        aria-hidden="true"
        className="absolute top-2 right-4 text-5xl font-mincho font-black text-slate-400/10 dark:text-white/5 select-none pointer-events-none group-hover:scale-110 transition-transform duration-300"
      >
        {config.kanjiSeal}
      </div>

      <div className="flex items-start justify-between gap-3 mb-2.5 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          {/* Content Type Badge */}
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-3xs",
              config.badgeClass,
            )}
          >
            <span>{config.icon}</span>
            <span>{config.label}</span>
          </span>

          {/* Level Badge */}
          {item.level && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-slate-900 text-amber-300 dark:bg-amber-400 dark:text-slate-950 border border-slate-800 shadow-3xs">
              {item.level}
            </span>
          )}

          {/* Lesson Title */}
          {item.lessonTitle && (
            <span className="inline-flex items-center text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="mr-1 text-slate-400">•</span>
              {item.lessonTitle}
            </span>
          )}
        </div>

        {/* View detail arrow prompt */}
        {linkTarget && (
          <span className="hidden sm:inline-flex items-center text-xs font-bold text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Chi tiết &rarr;
          </span>
        )}
      </div>

      {/* Main Title & Subtitle */}
      <div className="mb-2 relative z-10">
        <h3 className="text-lg sm:text-xl font-bold font-mincho text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors inline-flex items-center gap-2">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-0.5">
            {item.subtitle}
          </p>
        )}
      </div>

      {/* Description Snippet */}
      {item.description && (
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 relative z-10">
          {item.description}
        </p>
      )}
    </div>
  );

  if (linkTarget) {
    return (
      <Link
        to={linkTarget}
        className="block focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
