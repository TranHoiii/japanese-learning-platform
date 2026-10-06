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
      {/* 1. Hero & Philosophy Banner */}
      <div className="rounded-[16px] bg-gradient-to-r from-[#F0F7FF] via-[#E6F2FF] to-[#DCEEFF] border border-[#BBDDFF] p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="primary" size="md">
              Mô hình Tra cứu & Luyện tập (Resource & Practice)
            </Badge>
            <span className="text-xs text-[#12558F] font-semibold">
              Tra cứu → Học → Thực hành → Kiểm tra → Học lại
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] leading-snug">
            Tự do học tập theo nhịp độ riêng, không áp lực điểm số
          </h2>

          <p className="text-sm sm:text-base text-[#104673] leading-relaxed">
            Phân hệ Sơ cấp được thiết kế như một thư viện số mở. Bạn có thể tra cứu ngay ký tự chưa nhớ, kiểm tra phát âm khi cần và thực hành phản xạ bất kỳ lúc nào. Toàn bộ bài tập chỉ lưu tạm trong phiên học để bạn thoả sức thử sai mà không lo ảnh hưởng đến tiến độ cá nhân.
          </p>
        </div>

        {/* 3 Pillars of Beginner Module */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="rounded-[12px] bg-white/80 backdrop-blur-xs border border-[#BBDDFF]/70 p-4 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-sm font-bold text-[#12558F]">
              <span aria-hidden="true">📖</span>
              <span>Tra cứu tức thì</span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              Bảng chữ cái, biến âm và quy tắc ngữ âm luôn mở sẵn như một cuốn sổ tay điện tử.
            </p>
          </div>

          <div className="rounded-[12px] bg-white/80 backdrop-blur-xs border border-[#BBDDFF]/70 p-4 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-sm font-bold text-[#12558F]">
              <span aria-hidden="true">🗣️</span>
              <span>10 chuyên đề phát âm</span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              Phân tích chuyên sâu khẩu hình, cao độ (Pitch Accent) và sửa lỗi kinh điển cho người Việt.
            </p>
          </div>

          <div className="rounded-[12px] bg-white/80 backdrop-blur-xs border border-[#BBDDFF]/70 p-4 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-sm font-bold text-[#12558F]">
              <span aria-hidden="true">🎯</span>
              <span>Thực hành không áp lực</span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              Trắc nghiệm phản xạ và flashcard nhanh trong phiên học, không tính điểm XP hay phạt streak.
            </p>
          </div>
        </div>

        {/* Quick Anchor Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 text-xs scrollbar-none">
          <a
            href="#hiragana-section"
            className="px-3 py-1.5 rounded-full bg-white text-[#12558F] font-semibold border border-[#BBDDFF] hover:bg-[#F0F7FF] transition-colors shrink-0"
          >
            あ Bảng Hiragana
          </a>
          <a
            href="#katakana-section"
            className="px-3 py-1.5 rounded-full bg-white text-[#12558F] font-semibold border border-[#BBDDFF] hover:bg-[#F0F7FF] transition-colors shrink-0"
          >
            ア Bảng Katakana
          </a>
          <a
            href="#pronunciation-section"
            className="px-3 py-1.5 rounded-full bg-white text-[#12558F] font-semibold border border-[#BBDDFF] hover:bg-[#F0F7FF] transition-colors shrink-0"
          >
            🗣️ Quy tắc phát âm
          </a>
          <a
            href="#numbers-section"
            className="px-3 py-1.5 rounded-full bg-white text-[#12558F] font-semibold border border-[#BBDDFF] hover:bg-[#F0F7FF] transition-colors shrink-0"
          >
            🔢 Số đếm & Lượng từ
          </a>
          <a
            href="#practice-section"
            className="px-3 py-1.5 rounded-full bg-white text-[#12558F] font-semibold border border-[#BBDDFF] hover:bg-[#F0F7FF] transition-colors shrink-0"
          >
            🎯 Phòng Luyện tập
          </a>
        </div>
      </div>

      {/* 2. Section: Hiragana */}
      <BeginnerSection
        id="hiragana-section"
        icon="あ"
        title="Bảng chữ cái Hiragana (Chữ mềm)"
        subtitle="Hệ thống chữ cái nền tảng nhất"
        description={HIRAGANA_OVERVIEW.descriptionVi}
        badge="46 ký tự + biến âm"
        badgeVariant="primary"
        actionLink="/beginner/hiragana"
        actionText="Xem bảng Hiragana đầy đủ"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] p-4 space-y-1">
              <span className="text-xs font-bold text-[#12558F]">Âm cơ bản (Seion)</span>
              <p className="text-xl font-bold text-[#0F172A]">46 chữ cái</p>
              <p className="text-xs text-[#64748B]">Hàng A, Ka, Sa, Ta, Na, Ha, Ma, Ya, Ra, Wa, N</p>
            </div>
            <div className="rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] p-4 space-y-1">
              <span className="text-xs font-bold text-[#12558F]">Biến âm (Dakuten)</span>
              <p className="text-xl font-bold text-[#0F172A]">25 âm đục & bán đục</p>
              <p className="text-xs text-[#64748B]">Ga, Za, Da, Ba (ten-ten ゛) & Pa (maru ゜)</p>
            </div>
            <div className="rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] p-4 space-y-1">
              <span className="text-xs font-bold text-[#12558F]">Ảo âm (Yōon)</span>
              <p className="text-xl font-bold text-[#0F172A]">33 âm ghép</p>
              <p className="text-xs text-[#64748B]">Ghép với ゃ (ya), ゅ (yu), ょ (yo) nhỏ</p>
            </div>
          </div>

          {/* Quick Preview of Row A */}
          <div className="rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#475569]">
              <span>Mẫu hàng A cơ bản (a - i - u - e - o):</span>
              <Link to="/beginner/hiragana" className="text-[#2684D9] hover:underline">
                Tra cứu cả bảng &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {hiraganaSample.map((char) => (
                <div
                  key={char.id}
                  className="rounded-[10px] bg-white border border-[#CBD5E1]/60 p-2 sm:p-3 text-center"
                >
                  <span className="text-2xl sm:text-3xl font-bold font-japanese text-[#0F172A] block">
                    {char.character}
                  </span>
                  <span className="text-xs font-semibold text-[#12558F] block mt-0.5">
                    {char.romaji}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BeginnerSection>

      {/* 3. Section: Katakana */}
      <BeginnerSection
        id="katakana-section"
        icon="ア"
        title="Bảng chữ cái Katakana (Chữ cứng)"
        subtitle="Chữ dùng cho từ mượn ngoại lai & tên riêng"
        description={KATAKANA_OVERVIEW.descriptionVi}
        badge="46 ký tự + biến âm, ghép & mở rộng"
        badgeVariant="primary"
        actionLink="/beginner/katakana"
        actionText="Xem bảng Katakana đầy đủ"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] p-4 space-y-1">
              <span className="text-xs font-bold text-[#12558F]">Âm cơ bản (Seion)</span>
              <p className="text-xl font-bold text-[#0F172A]">46 chữ cái nét thẳng</p>
              <p className="text-xs text-[#64748B]">Góc cạnh dứt khoát, phân biệt Shi/Tsu, So/N</p>
            </div>
            <div className="rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] p-4 space-y-1">
              <span className="text-xs font-bold text-[#12558F]">Biến âm & Âm ghép</span>
              <p className="text-xl font-bold text-[#0F172A]">25 Dakuten & 33 Yōon</p>
              <p className="text-xs text-[#64748B]">Trường âm Katakana luôn viết bằng dấu gạch ー</p>
            </div>
            <div className="rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] p-4 space-y-1">
              <span className="text-xs font-bold text-[#12558F]">Âm mở rộng (Tokushuon)</span>
              <p className="text-xl font-bold text-[#0F172A]">{KATAKANA_OVERVIEW.totalExtended} âm ngoại lai</p>
              <p className="text-xs text-[#64748B]">Ti, Di, Fa, Fi, We, V... mô phỏng từ tiếng Anh</p>
            </div>
          </div>

          {/* Quick Preview of Row A */}
          <div className="rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#475569]">
              <span>Mẫu hàng A cơ bản (a - i - u - e - o):</span>
              <Link to="/beginner/katakana" className="text-[#2684D9] hover:underline">
                Tra cứu cả bảng &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {katakanaSample.map((char) => (
                <div
                  key={char.id}
                  className="rounded-[10px] bg-white border border-[#CBD5E1]/60 p-2 sm:p-3 text-center"
                >
                  <span className="text-2xl sm:text-3xl font-bold font-japanese text-[#0F172A] block">
                    {char.character}
                  </span>
                  <span className="text-xs font-semibold text-[#12558F] block mt-0.5">
                    {char.romaji}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BeginnerSection>

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
              className="rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] p-4 flex flex-col justify-between space-y-3 hover:bg-white hover:border-[#CBD5E1] transition-all"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden="true">
                    {category.icon}
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white text-[#12558F] border border-[#E2E8F0]">
                    {category.unitExample}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  {category.titleVi}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {category.descriptionVi}
                </p>
              </div>

              <Link
                to="/beginner/numbers"
                className="text-xs font-semibold text-[#12558F] hover:text-[#2684D9] flex items-center gap-1 pt-1 border-t border-[#E2E8F0]/60"
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
              className="rounded-[12px] bg-white border border-[#E2E8F0] p-4 flex flex-col justify-between space-y-3 shadow-2xs hover:border-[#2684D9] transition-all"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-[8px] bg-[#F0F7FF] text-[#12558F] flex items-center justify-center font-japanese font-bold text-base">
                    {mode.icon}
                  </div>
                  <Badge variant="neutral" size="sm">
                    {mode.badgeVi}
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  {mode.titleVi}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {mode.descriptionVi}
                </p>
              </div>

              <Link to="/beginner/practice">
                <Button variant="outline" size="sm" fullWidth>
                  Bắt đầu bài tập &rarr;
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-[12px] bg-[#F0F7FF] border border-[#BBDDFF] text-xs text-[#12558F] flex items-start gap-2.5">
          <span className="text-base shrink-0 mt-0.5" aria-hidden="true">
            💡
          </span>
          <p className="leading-relaxed">
            <strong>Nguyên tắc không lưu áp lực:</strong> Tại phòng Luyện tập Sơ cấp, bạn có thể làm đi làm lại hàng chục lần mà không lo mất chuỗi học, không bị trừ điểm và không hiển thị bảng xếp hạng. Hãy tận hưởng việc học một cách tự nhiên nhất!
          </p>
        </div>
      </BeginnerSection>

      {/* Bottom Bridge CTA to Minnano Nihongo N5 */}
      <div className="rounded-[16px] bg-white border border-[#E2E8F0] p-6 text-center space-y-3">
        <p className="text-sm text-[#64748B]">
          Đã nắm vững bảng chữ cái và quy tắc phát âm cơ bản?
        </p>
        <h3 className="text-lg font-bold text-[#0F172A]">
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
