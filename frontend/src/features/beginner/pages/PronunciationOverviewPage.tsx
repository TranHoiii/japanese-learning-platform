import React, { useState } from "react";
import { Link } from "react-router-dom";
import BeginnerLayout from "../components/BeginnerLayout";
import TopicCard from "../components/TopicCard";
import Button from "../../../components/ui/Button";
import { PRONUNCIATION_TOPICS } from "../data/pronunciation";
import { PronunciationCategory } from "../types/pronunciation";

export const PronunciationOverviewPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PronunciationCategory | "all">("all");

  const categories: { id: PronunciationCategory | "all"; label: string }[] = [
    { id: "all", label: "Tất cả 10 chuyên đề" },
    { id: "syllable-rules", label: "Quy tắc âm tiết (Biến âm, Trường âm, Âm ngắt)" },
    { id: "phonetics", label: "Ngữ âm đặc thù (Âm つ, Hàng が, Vô thanh hóa)" },
    { id: "prosody", label: "Cao độ & Ngữ điệu (Pitch Accent, Intonation)" },
  ];

  const filteredTopics =
    selectedCategory === "all"
      ? PRONUNCIATION_TOPICS
      : PRONUNCIATION_TOPICS.filter((t) => t.category === selectedCategory);

  return (
    <BeginnerLayout
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Sơ cấp", href: "/beginner" },
        { label: "Quy tắc phát âm", href: "/beginner/pronunciation", isCurrent: true },
      ]}
      title="Quy Tắc Phát Âm & Ngữ Âm Tiếng Nhật"
      subtitle="Chuyên đề ngữ âm bản xứ • Thiết kế riêng cho người Việt"
      description="10 chuyên đề ngữ âm chuẩn xác giúp bạn thoát khỏi thói quen 'Việt hóa' tiếng Nhật, làm chủ cao độ (Pitch Accent), ngắt âm, biến âm và phát âm chuẩn Tokyo ngay từ ngày đầu."
      actions={
        <Link to="/beginner/practice">
          <Button variant="secondary" size="sm">
            Luyện tập phát âm &rarr;
          </Button>
        </Link>
      }
    >
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E2E8F0] scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-full font-semibold shrink-0 transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-[#2684D9] text-white shadow-xs"
                : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of 10 Topics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            to={`/beginner/pronunciation/${topic.slug}`}
            icon={topic.icon}
            title={topic.titleVi}
            subtitle={topic.title}
            description={topic.shortSummaryVi}
            badge={topic.importance === "essential" ? "Cốt lõi" : "Nâng cao"}
            badgeVariant={topic.importance === "essential" ? "primary" : "neutral"}
            metaTags={[`⏱️ ${topic.estimatedReadMinutes} phút đọc`]}
            actionText="Xem chi tiết chuyên đề"
          />
        ))}
      </div>

      {/* Audio Safety Note */}
      <div className="rounded-[12px] bg-[#F8FAFC] border border-[#CBD5E1] p-4 text-xs text-[#64748B] flex items-start gap-2.5">
        <span className="text-base shrink-0 mt-0.5" aria-hidden="true">
          ℹ️
        </span>
        <p className="leading-relaxed">
          Tài nguyên phát âm bao gồm bảng phân tích khẩu hình, sơ đồ âm tiết và ví dụ ngữ âm trực quan. Các nút âm thanh được chuẩn bị sẵn sàng và sẽ tự động kích hoạt khi có tệp ghi âm giọng bản xứ chính thức.
        </p>
      </div>
    </BeginnerLayout>
  );
};

export default PronunciationOverviewPage;
