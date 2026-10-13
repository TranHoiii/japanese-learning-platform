import React from "react";
import { Link } from "react-router-dom";
import BeginnerLayout from "../components/BeginnerLayout";
import BeginnerSection from "../components/BeginnerSection";
import TopicCard from "../components/TopicCard";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import { HIRAGANA_OVERVIEW, HIRAGANA_GROUPS } from "../data/hiragana";
import { KATAKANA_OVERVIEW, KATAKANA_GROUPS } from "../data/katakana";
import { PRONUNCIATION_TOPICS } from "../data/pronunciation";
import { NUMBER_CATEGORIES } from "../data/numbers";
import { PRACTICE_MODES } from "../data/practice";

const PATH_STEPS = [
  { to: "/beginner/hiragana", glyph: "あ", title: "Bảng Hiragana", desc: "46 chữ cái nền tảng, kèm biến âm và âm ghép.", cta: "Học Hiragana", tone: "bg-rose-100 text-rose-700" },
  { to: "/beginner/katakana", glyph: "ア", title: "Bảng Katakana", desc: "Chữ dùng cho từ mượn và tên riêng, phân biệt Shi/Tsu, So/N.", cta: "Học Katakana", tone: "bg-indigo-100 text-indigo-700" },
  { to: "/beginner/pronunciation", glyph: "音", title: "10 quy tắc phát âm", desc: "Trường âm, ngắt âm, vô thanh hoá và trọng âm cao độ.", cta: "Luyện phát âm", tone: "bg-amber-100 text-amber-800" },
  { to: "/beginner/numbers", glyph: "数", title: "Số đếm & lượng từ", desc: "Đếm người, đồ vật, ngày tháng và giờ giấc.", cta: "Mở sổ tay số đếm", tone: "bg-emerald-100 text-emerald-700" },
  { to: "/beginner/practice", glyph: "練", title: "Phòng luyện tập", desc: "Trắc nghiệm phản xạ và flashcard nhanh, không áp lực.", cta: "Vào luyện tập", tone: "bg-sky-100 text-sky-700" },
  { to: "/n5/lessons", glyph: "一", title: "Bài 1 Minna no Nihongo N5", desc: "Sẵn sàng rồi? Bắt đầu giáo trình chính thức.", cta: "Khám phá bài học N5", tone: "bg-gradient-to-br from-indigo-700 to-indigo-950 text-white shadow-sm" },
];

export const BeginnerHomePage: React.FC = () => {
  // Character quick sample for preview
  const hiraganaSample = HIRAGANA_GROUPS[0].characters.slice(0, 5);
  const katakanaSample = KATAKANA_GROUPS[0].characters.slice(0, 5);

  return (
    <BeginnerLayout
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Sơ cấp", href: "/beginner", isCurrent: true },
      ]}
      title="Tủ Sách Tiếng Nhật Sơ Cấp (🌱 Sơ cấp)"
      subtitle="Kho tài nguyên & Luyện tập mở • Tra cứu tự do"
      description="Nền tảng căn bản vững chắc dành riêng cho người Việt bắt đầu học tiếng Nhật. Tra cứu bảng chữ cái, 10 quy tắc ngữ âm bản xứ, hệ thống số đếm và phòng luyện tập không áp lực thành tích."
    >
      {/* 1. Learning path — the recommended order, each step is one tap */}
      <section aria-labelledby="beginner-path-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="beginner-path-heading" className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
              Lộ trình khởi đầu
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Đi theo thứ tự gợi ý, hoặc nhảy thẳng tới phần bạn cần tra cứu.
            </p>
          </div>
          <Badge variant="primary" size="sm">Không lưu điểm • Thử sai thoải mái</Badge>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {PATH_STEPS.map((step, i) => (
            <li key={step.to}>
              <Link
                to={step.to}
                className="surface surface-hover group h-full p-5 flex flex-col gap-3 focus-visible:outline-2 focus-visible:outline-indigo-600"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-japanese text-3xl font-bold select-none transition-transform group-hover:scale-105 group-hover:-rotate-3 ${step.tone}`}
                    aria-hidden="true"
                  >
                    {step.glyph}
                  </span>
                  <span className="text-xs font-extrabold text-slate-400 tabular-nums">BƯỚC {i + 1}</span>
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
                <span className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                  {step.cta}
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* 2. Kana side by side */}
      <section id="kana-section" aria-label="Bảng chữ cái" className="grid grid-cols-1 lg:grid-cols-2 gap-4 scroll-mt-20">
        {[
          {
            id: "hiragana",
            name: "Hiragana",
            tag: "Chữ mềm",
            overview: HIRAGANA_OVERVIEW.descriptionVi,
            facts: ["46 âm cơ bản", "25 âm đục & bán đục", "33 âm ghép"],
            sample: hiraganaSample,
            accent: "from-rose-50 to-white",
          },
          {
            id: "katakana",
            name: "Katakana",
            tag: "Chữ cứng • từ mượn",
            overview: KATAKANA_OVERVIEW.descriptionVi,
            facts: ["46 âm cơ bản", "25 Dakuten & 33 Yōon", `${KATAKANA_OVERVIEW.totalExtended} âm mở rộng`],
            sample: katakanaSample,
            accent: "from-indigo-50 to-white",
          },
        ].map((kana) => (
          <article key={kana.id} className={`surface p-5 sm:p-6 space-y-4 bg-gradient-to-br ${kana.accent}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-extrabold text-slate-900">{kana.name}</h2>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">{kana.tag}</p>
              </div>
              <Link to={`/beginner/${kana.id}`}>
                <Button variant="secondary" size="sm">Xem đủ bảng &rarr;</Button>
              </Link>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{kana.overview}</p>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {kana.sample.map((char) => (
                <div
                  key={char.id}
                  className="rounded-2xl bg-white border border-slate-200 py-2.5 text-center shadow-xs"
                >
                  <span className="text-2xl sm:text-3xl font-bold font-japanese text-slate-900 block">
                    {char.character}
                  </span>
                  <span className="text-xs font-semibold text-indigo-700 block mt-0.5">{char.romaji}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {kana.facts.map((f) => (
                <span key={f} className="px-2.5 py-1 rounded-full bg-white/80 border border-slate-200 text-[11px] font-semibold text-slate-600">
                  {f}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>


      {/* 4. Section: Pronunciation (10 Topics Grid) */}
      <BeginnerSection
        id="pronunciation-section"
        icon="🗣️"
        title="10 Quy Tắc Phát Âm & Ngữ Âm Bản Xứ"
        subtitle="Bí quyết nói tiếng Nhật tự nhiên, chuẩn Tokyo"
        description="Được nghiên cứu và tổng hợp bài bản cho người Việt. Giúp bạn phát âm chuẩn xác, làm chủ trường âm, ngắt âm, vô thanh hoá và trọng âm cao độ (Pitch Accent)."
        badge="10 chuyên đề"
        badgeVariant="success"
        actionLink="/beginner/pronunciation"
        actionText="Xem tổng quan chuyên đề phát âm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRONUNCIATION_TOPICS.map((topic) => (
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
              actionText="Đọc bài học ngữ âm"
            />
          ))}
        </div>
      </BeginnerSection>

      {/* 5. Section: Numbers & Counters */}
      <BeginnerSection
        id="numbers-section"
        icon="🔢"
        title="Hệ Thống Số Đếm & Lượng Từ (Counters)"
        subtitle="Quy tắc đếm vạn, lượng từ đồ vật, ngày tháng & thời gian"
        description="Giải mã toàn bộ các trường hợp bất quy tắc kinh điển trong tiếng Nhật: đếm người (hitori, futari), đếm đồ vật (tsu), mùng 1 đến mùng 10, cách chia phút (pun vs fun)."
        badge="9 danh mục tra cứu"
        badgeVariant="warning"
        actionLink="/beginner/numbers"
        actionText="Mở sổ tay tra cứu số đếm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {NUMBER_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="surface surface-hover p-4 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden="true">
                    {category.icon}
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white text-[#213960] border border-[#E7E0D2]">
                    {category.unitExample}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#1F1C18]">
                  {category.titleVi}
                </h3>
                <p className="text-xs text-[#766D5E] leading-relaxed">
                  {category.descriptionVi}
                </p>
              </div>

              <Link
                to="/beginner/numbers"
                className="text-xs font-semibold text-[#213960] hover:text-[#2F5496] flex items-center gap-1 pt-1 border-t border-[#E7E0D2]/60"
              >
                <span>Tra cứu quy tắc</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </BeginnerSection>

      {/* 6. Section: Practice Hub */}
      <BeginnerSection
        id="practice-section"
        icon="🎯"
        title="Phòng Luyện Tập Tương Tác"
        subtitle="Luyện phản xạ nhanh • Tự do thử sai"
        description="Kiểm tra mức độ ghi nhớ ký tự và phản xạ ngữ âm. Kết quả hoàn toàn tạm thời trong trình duyệt, giúp bạn rèn luyện tâm lý thoải mái và vững vàng trước khi bước vào N5."
        badge="5 chế độ luyện tập"
        badgeVariant="info"
        actionLink="/beginner/practice"
        actionText="Vào phòng luyện tập ngay"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {PRACTICE_MODES.map((mode) => (
            <div
              key={mode.id}
              className="surface surface-hover p-4 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-[8px] bg-[#EEF3FA] text-[#213960] flex items-center justify-center font-japanese font-bold text-base">
                    {mode.icon}
                  </div>
                  <Badge variant="neutral" size="sm">
                    {mode.badgeVi}
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-[#1F1C18]">
                  <Link
                    to={`/beginner/practice?mode=${mode.id}`}
                    className="hover:text-[#2F5496] transition-colors"
                  >
                    {mode.titleVi}
                  </Link>
                </h3>
                <p className="text-xs text-[#766D5E] leading-relaxed">
                  {mode.descriptionVi}
                </p>
              </div>

              <Link to={`/beginner/practice?mode=${mode.id}`}>
                <Button variant="outline" size="sm" fullWidth>
                  Bắt đầu bài tập &rarr;
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-[12px] bg-[#EEF3FA] border border-[#BDD0EC] text-xs text-[#213960] flex items-start gap-2.5">
          <span className="text-base shrink-0 mt-0.5" aria-hidden="true">
            💡
          </span>
          <p className="leading-relaxed">
            <strong>Nguyên tắc không lưu áp lực:</strong> Tại phòng Luyện tập Sơ cấp, bạn có thể làm đi làm lại hàng chục lần mà không lo mất chuỗi học, không bị trừ điểm và không hiển thị bảng xếp hạng. Hãy tận hưởng việc học một cách tự nhiên nhất!
          </p>
        </div>
      </BeginnerSection>

      {/* Bottom Bridge CTA to Minnano Nihongo N5 */}
      <div className="hero-ink pattern-seigaiha rounded-3xl p-6 sm:p-8 text-center space-y-3 text-white">
        <p className="text-sm text-white/70">
          Đã nắm vững bảng chữ cái và quy tắc phát âm cơ bản?
        </p>
        <h3 className="font-display text-lg sm:text-xl font-extrabold text-white">
          Sẵn sàng bắt đầu Bài 1 giáo trình Minnano Nihongo N5
        </h3>
        <div className="pt-1 flex items-center justify-center gap-3">
          <Link to="/n5/lessons">
            <Button variant="primary" size="default">
              Khám phá bài học N5 &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </BeginnerLayout>
  );
};

export default BeginnerHomePage;
