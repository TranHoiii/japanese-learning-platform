import React, { useState } from "react";
import { Link } from "react-router-dom";
import BeginnerLayout from "../components/BeginnerLayout";
import TopicCard from "../components/TopicCard";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import { PRONUNCIATION_TOPICS } from "../data/pronunciation";
import { PronunciationCategory } from "../types/pronunciation";
import { cn } from "../../../utils/cn";

export const PronunciationOverviewPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PronunciationCategory | "all">("all");

  const categories: { id: PronunciationCategory | "all"; label: string; icon: string; count: number }[] = [
    { id: "all", label: "Tất cả 10 chuyên đề", icon: "📚", count: 10 },
    { id: "syllable-rules", label: "Quy tắc âm tiết", icon: "🎵", count: 4 },
    { id: "phonetics", label: "Ngữ âm đặc thù", icon: "🗣️", count: 3 },
    { id: "prosody", label: "Cao độ & Ngữ điệu", icon: "📈", count: 3 },
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
        <Link to="/beginner/practice?mode=pronunciation">
          <Button variant="secondary" size="sm" tactile>
            🎯 Luyện phản xạ phát âm &rarr;
          </Button>
        </Link>
      }
    >
      {/* 1. MISTAKE ALERT CALLOUT HERO */}
      <div className="surface rounded-3xl p-5 sm:p-7 space-y-4 shadow-zen border border-amber-200/80 bg-gradient-to-br from-amber-500/5 via-transparent to-indigo-500/5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 font-black text-xl flex items-center justify-center" aria-hidden="true">
              🏮
            </span>
            <h2 className="font-display text-base sm:text-lg font-bold text-amber-950">
              3 Sai Lầm Phát Âm Lớn Nhất Của Người Việt & Cách Khắc Phục
            </h2>
          </div>
          <Badge variant="warning" size="sm">Lời khuyên bản xứ</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          <div className="p-3.5 rounded-2xl bg-white border border-amber-200/60 shadow-2xs space-y-1">
            <span className="font-bold text-xs text-amber-900 block">1. Nhầm độ dài phách (Mora)</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trường âm và âm ngắt chiếm đúng <strong>1 phách trọn vẹn</strong>. Đọc thiếu phách làm đổi hoàn toàn nghĩa của từ (ví dụ: <code className="bg-amber-50 px-1 py-0.5 rounded">おばさん</code> vs <code className="bg-amber-50 px-1 py-0.5 rounded">おばあさん</code>).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-amber-200/60 shadow-2xs space-y-1">
            <span className="font-bold text-xs text-amber-900 block">2. Gán thanh điệu tiếng Việt</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tiếng Nhật không có sắc/huyền/hỏi/ngã. Tiếng Nhật chỉ dùng <strong>Cao độ (Pitch Accent: Cao - Thấp)</strong>. Giữ nguyên âm phẳng, chỉ nâng hạ độ cao.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-amber-200/60 shadow-2xs space-y-1">
            <span className="font-bold text-xs text-amber-900 block">3. Phát âm sai âm つ (tsu)</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Không đọc là "chu" hay "tu". Đặt đầu lưỡi chạm mặt sau răng cửa trên, bật nhẹ luồng hơi qua kẽ răng tạo âm gió xát tắc.
            </p>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY SELECTOR PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E7E0D2] custom-scrollbar-x text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "px-4 py-2 rounded-2xl font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2",
              selectedCategory === cat.id
                ? "bg-[#2F5496] text-white shadow-xs"
                : "bg-white text-[#5A5246] border border-[#E7E0D2] hover:bg-[#FAF7F1]",
            )}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600",
              )}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* 3. GRID OF TOPICS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base sm:text-lg font-bold text-[#1F1C18]">
            Danh mục các bài chuyên đề ({filteredTopics.length})
          </h3>
          <span className="text-xs text-[#766D5E]">
            Khuyên dùng: Học theo thứ tự từ Bài 1 đến Bài 10
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {filteredTopics.map((topic, idx) => (
            <TopicCard
              key={topic.id}
              to={`/beginner/pronunciation/${topic.slug}`}
              icon={topic.icon}
              title={`${idx + 1}. ${topic.titleVi}`}
              subtitle={topic.title}
              description={topic.shortSummaryVi}
              badge={topic.importance === "essential" ? "Cốt lõi" : "Nâng cao"}
              badgeVariant={topic.importance === "essential" ? "primary" : "neutral"}
              metaTags={[`⏱️ ${topic.estimatedReadMinutes} phút đọc`]}
              actionText="Khám phá chuyên đề &rarr;"
            />
          ))}
        </div>
      </div>

      {/* 4. FOOTER SAFETY / TTS TIP */}
      <div className="rounded-2xl bg-indigo-50/70 border border-indigo-200/80 p-4 text-xs text-indigo-950 flex items-start gap-3">
        <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">💡</span>
        <div className="leading-relaxed">
          <strong>Cách học hiệu quả:</strong> Mỗi bài đều trang bị sơ đồ trực quan hóa cao độ (Pitch Contour), phân tích phách (Mora) và bài trắc nghiệm phản xạ 3 câu ở cuối trang. Hãy luyện tập phát âm to rõ theo âm thanh mẫu.
        </div>
      </div>
    </BeginnerLayout>
  );
};

export default PronunciationOverviewPage;
