import React from "react";
import { useParams, Link } from "react-router-dom";
import BeginnerLayout from "../components/BeginnerLayout";
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
      subtitle={topic.title}
      description={topic.shortSummaryVi}
      actions={
        <Link to="/beginner/pronunciation">
          <Button variant="outline" size="sm">
            Tất cả chuyên đề
          </Button>
        </Link>
      }
    >
      {/* Knowledge Article Display */}
      <KnowledgeArticle topic={topic} />

      {/* Prev / Next Navigation Bar */}
      <div className="pt-8 mt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevTopic ? (
          <Link
            to={`/beginner/pronunciation/${prevTopic.slug}`}
            className="w-full sm:w-auto"
          >
            <Button variant="outline" size="sm" fullWidth>
              &larr; {prevTopic.titleVi}
            </Button>
          </Link>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <Link
            to={`/beginner/pronunciation/${nextTopic.slug}`}
            className="w-full sm:w-auto"
          >
            <Button variant="primary" size="sm" fullWidth>
              {nextTopic.titleVi} &rarr;
            </Button>
          </Link>
        ) : (
          <Link to="/beginner/practice" className="w-full sm:w-auto">
            <Button variant="primary" size="sm" fullWidth>
              Luyện tập phản xạ &rarr;
            </Button>
          </Link>
        )}
      </div>
    </BeginnerLayout>
  );
};

export default PronunciationTopicPage;
