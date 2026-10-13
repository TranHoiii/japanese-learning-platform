import React from "react";
import { useParams, Link } from "react-router-dom";
import BeginnerLayout from "../components/BeginnerLayout";
import ReadingProgress from "../../../components/learning/ReadingProgress";
import KnowledgeArticle from "../components/KnowledgeArticle";
import Button from "../../../components/ui/Button";
import ErrorState from "../../../components/ui/ErrorState";
import {
  PRONUNCIATION_TOPICS,
  getPronunciationTopicBySlug,
} from "../data/pronunciation";

export const PronunciationTopicPage: React.FC = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();

  const topic = topicSlug ? getPronunciationTopicBySlug(topicSlug) : undefined;

  if (!topic) {
    return (
      <BeginnerLayout
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Sơ cấp", href: "/beginner" },
          { label: "Quy tắc phát âm", href: "/beginner/pronunciation" },
          { label: "Không tìm thấy chuyên đề", isCurrent: true },
        ]}
        title="Không tìm thấy chuyên đề phát âm"
      >
        <ErrorState
          statusCode={404}
          title="Chuyên đề không tồn tại"
          message="Chuyên đề phát âm bạn đang tìm kiếm không tồn tại hoặc đường dẫn không đúng."
          action={
            <Link to="/beginner/pronunciation">
              <Button variant="primary">Quay lại danh mục phát âm</Button>
            </Link>
          }
        />
      </BeginnerLayout>
    );
  }

  // Find previous and next topics
  const currentIndex = PRONUNCIATION_TOPICS.findIndex((t) => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? PRONUNCIATION_TOPICS[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < PRONUNCIATION_TOPICS.length - 1
      ? PRONUNCIATION_TOPICS[currentIndex + 1]
      : null;

  return (
    <BeginnerLayout
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Sơ cấp", href: "/beginner" },
        { label: "Quy tắc phát âm", href: "/beginner/pronunciation" },
        { label: topic.titleVi, href: `/beginner/pronunciation/${topic.slug}`, isCurrent: true },
      ]}
      title={topic.titleVi}
      subtitle={`Bài ${currentIndex + 1} / 10 • ${topic.title}`}
      description={topic.shortSummaryVi}
      actions={
        <div className="flex items-center gap-2">
          <Link to="/beginner/pronunciation">
            <Button variant="outline" size="sm">
              &larr; Tất cả chuyên đề
            </Button>
          </Link>
          <Link to="/beginner/practice?mode=pronunciation">
            <Button variant="secondary" size="sm" tactile>
              Luyện trắc nghiệm
            </Button>
          </Link>
        </div>
      }
    >
      <ReadingProgress />

      {/* Main 2-column layout: Article + Sticky Outline */}
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-8 items-start">
        {/* Knowledge Article Body */}
        <div className="min-w-0 space-y-8">
          <KnowledgeArticle topic={topic} />

          {/* Prev / Next Navigation Footer Card */}
          <div className="surface rounded-3xl p-5 sm:p-6 border border-[#E7E0D2] shadow-zen flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevTopic ? (
              <Link
                to={`/beginner/pronunciation/${prevTopic.slug}`}
                className="w-full sm:w-1/2 p-3.5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-slate-50 transition-all text-left group"
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  &larr; Bài trước
                </span>
                <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors block truncate">
                  {prevTopic.titleVi}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block sm:w-1/2" />
            )}

            {nextTopic ? (
              <Link
                to={`/beginner/pronunciation/${nextTopic.slug}`}
                className="w-full sm:w-1/2 p-3.5 rounded-2xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/70 hover:border-indigo-400 transition-all text-right group"
              >
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">
                  Bài tiếp theo &rarr;
                </span>
                <span className="text-sm font-bold text-indigo-900 group-hover:text-indigo-800 transition-colors block truncate">
                  {nextTopic.titleVi}
                </span>
              </Link>
            ) : (
              <Link
                to="/beginner/practice?mode=pronunciation"
                className="w-full sm:w-1/2 p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 text-right group"
              >
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                  Hoàn thành 10 bài 🎉
                </span>
                <span className="text-sm font-bold text-emerald-900 block truncate">
                  Vào Phòng Luyện Tập &rarr;
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Sticky Desktop Table of Contents Sidebar */}
        <aside className="hidden lg:block sticky top-24 self-start" aria-label="Mục lục bài học">
          <nav className="surface rounded-2xl p-4 border border-[#E7E0D2] shadow-sm space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#766D5E]">
              Nội dung bài học
            </p>
            <ul className="space-y-1 text-xs">
              <li>
                <a
                  href="#overview"
                  className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-700 transition-colors"
                >
                  <span>📌</span>
                  <span>Tổng quan & Khái niệm</span>
                </a>
              </li>
              {topic.stepGuide && (
                <li>
                  <a
                    href="#step-guide"
                    className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-700 transition-colors"
                  >
                    <span>👄</span>
                    <span>Hướng dẫn khẩu hình</span>
                  </a>
                </li>
              )}
              {topic.moraComparisons && topic.moraComparisons.length > 0 && (
                <li>
                  <a
                    href="#mora-guide"
                    className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-700 transition-colors"
                  >
                    <span>⏱️</span>
                    <span>Phân tích phách (Mora)</span>
                  </a>
                </li>
              )}
              {topic.pitchPatterns && topic.pitchPatterns.length > 0 && (
                <li>
                  <a
                    href="#pitch-guide"
                    className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-700 transition-colors"
                  >
                    <span>📈</span>
                    <span>Sơ đồ cao độ (Pitch)</span>
                  </a>
                </li>
              )}
              {topic.sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#section-${s.id}`}
                    className="flex items-start gap-1.5 rounded-xl px-2.5 py-1.5 font-medium text-slate-600 hover:bg-slate-100 hover:text-indigo-700 transition-colors"
                  >
                    <span className="text-slate-400 font-mono">{i + 1}.</span>
                    <span className="truncate leading-snug">{s.titleVi}</span>
                  </a>
                </li>
              ))}
              {topic.practiceQuestions && topic.practiceQuestions.length > 0 && (
                <li className="pt-1 border-t border-slate-100">
                  <a
                    href="#mini-practice"
                    className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 font-bold text-indigo-700 bg-indigo-50/60 hover:bg-indigo-100 transition-colors"
                  >
                    <span>🎯</span>
                    <span>Trắc nghiệm nhanh</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </aside>
      </div>
    </BeginnerLayout>
  );
};

export default PronunciationTopicPage;
