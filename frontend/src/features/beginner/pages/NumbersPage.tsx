import React, { useState } from "react";
import { Link } from "react-router-dom";
import BeginnerLayout from "../components/BeginnerLayout";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import NumberBuilder from "../components/NumberBuilder";
import CounterCalculator from "../components/CounterCalculator";
import SoundChangeTable from "../components/SoundChangeTable";
import NumbersPractice from "../components/NumbersPractice";
import {
  NUMBER_CATEGORIES,
  BASIC_NUMBERS,
  HUNDREDS_LIST,
  THOUSANDS_LIST,
  LARGE_NUMBERS_LIST,
  AGE_LIST,
  DATES_LIST,
  MONTHS_LIST,
  WEEKDAYS_LIST,
  TIME_HOURS_LIST,
  TIME_MINUTES_LIST,
  COUNTER_GROUPS,
  SOUND_CHANGE_MATRIX,
  NUMBERS_PRACTICE_QUESTIONS,
} from "../data/numbers";

export const NumbersPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("all");

  const sections = [
    { id: "all", label: "Tất cả nội dung", icon: "📚" },
    { id: "builder", label: "Bộ tính số (Builder)", icon: "🧮" },
    { id: "calculator", label: "Bộ tính lượng từ", icon: "📦" },
    { id: "basic", label: "Số cơ bản (0 - 99)", icon: "🔢" },
    { id: "hundreds-thousands", label: "Trăm, Nghìn & Vạn", icon: "🏛️" },
    { id: "age", label: "Đếm tuổi (〜歳)", icon: "🎂" },
    { id: "dates", label: "Ngày trong tháng (1 - 31)", icon: "📅" },
    { id: "months-weekdays", label: "Tháng & Thứ", icon: "🗓️" },
    { id: "time", label: "Giờ & Phút (〜時 / 〜分)", icon: "⏰" },
    { id: "counters", label: "Bảng lượng từ (Counters)", icon: "📋" },
    { id: "sound-changes", label: "Ma trận biến âm", icon: "⚡" },
    { id: "practice", label: "Luyện tập phản xạ", icon: "🎯" },
  ];

  const shouldShow = (sectionId: string) =>
    activeSection === "all" || activeSection === sectionId;

  return (
    <BeginnerLayout
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Sơ cấp", href: "/beginner" },
        { label: "Số đếm & Lượng từ", href: "/beginner/numbers", isCurrent: true },
      ]}
      title="Sổ Tay Số Đếm & Lượng Từ Tiếng Nhật"
      subtitle="Thư viện tra cứu số đếm • Biến âm & Bộ tính tự động"
      description="Tra cứu đầy đủ số đếm cơ bản (0 - 99), hàng trăm, nghìn, cơ số Vạn (万), ngày tháng, giờ giấc và các lượng từ thông dụng. Tích hợp bộ tính ghép số và ma trận biến âm phản xạ nhanh."
      actions={
        <Link to="/beginner/practice">
          <Button variant="secondary" size="sm">
            Luyện tập tổng hợp &rarr;
          </Button>
        </Link>
      }
    >
      {/* Quick Section Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E2E8F0] scrollbar-none text-xs">
        {sections.map((sec) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => setActiveSection(sec.id)}
            className={`px-3.5 py-2 rounded-full font-semibold shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSection === sec.id
                ? "bg-[#2684D9] text-white shadow-xs"
                : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
            }`}
          >
            <span>{sec.icon}</span>
            <span>{sec.label}</span>
          </button>
        ))}
      </div>

      {/* 1. INTERACTIVE NUMBER BUILDER */}
      {shouldShow("builder") && (
        <section aria-labelledby="sec-builder-title">
          <NumberBuilder />
        </section>
      )}

      {/* 2. INTERACTIVE COUNTER CALCULATOR */}
      {shouldShow("calculator") && (
        <section aria-labelledby="sec-calc-title">
          <CounterCalculator />
        </section>
      )}

      {/* 3. BASIC NUMBERS (0 - 99) */}
      {shouldShow("basic") && (
        <section className="space-y-4 rounded-[16px] bg-white border border-[#E2E8F0] p-5 sm:p-6 shadow-xs">
          <div className="space-y-1 pb-3 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">
                🔢
              </span>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Số Đếm Cơ Bản (0 đến 10) & Nguyên Tắc Ghép Số (11 đến 99)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Từ 11 đến 99, tiếng Nhật ghép cực kỳ logic theo cấu trúc:{" "}
              <strong className="text-[#104673]">
                [Hàng chục] + 十 (じゅう) + [Hàng đơn vị]
              </strong>
              . Ví dụ: 25 = 二十五 (にじゅうご), 99 = 九十九 (きゅうじゅうきゅう).
            </p>
          </div>

          {/* Basic 0-10 Table */}
          <div className="overflow-x-auto rounded-[12px] border border-[#E2E8F0]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#334155]">
                  <th className="p-3 font-semibold text-center w-16">Số</th>
                  <th className="p-3 font-semibold">Hán tự</th>
                  <th className="p-3 font-semibold">Hiragana</th>
                  <th className="p-3 font-semibold">Romaji</th>
                  <th className="p-3 font-semibold">Lưu ý phát âm & Ngữ nghĩa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] text-[#475569]">
                {BASIC_NUMBERS.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-[#F8FAFC]/80 transition-colors ${
                      item.isIrregular ? "bg-[#FFFBEB]/40" : ""
                    }`}
                  >
                    <td className="p-3 font-bold text-[#0F172A] text-center font-mono bg-[#F8FAFC]/40">
                      {item.value}
                    </td>
                    <td className="p-3 font-japanese text-base font-bold text-[#12558F]" lang="ja">
                      {item.kanji}
                    </td>
                    <td className="p-3 font-japanese font-medium text-[#0F172A]" lang="ja">
                      {item.hiragana}
                    </td>
                    <td className="p-3 italic text-[#64748B]">{item.romaji}</td>
                    <td className="p-3 text-xs">
                      {item.isIrregular ? (
                        <span className="font-semibold text-[#B45309]">
                          ⚠️ {item.meaningVi}
                        </span>
                      ) : (
                        <span className="text-[#334155]">{item.meaningVi}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-[10px] bg-[#F0F9FF] border border-[#BAE6FD] p-3 text-xs text-[#0369A1] leading-relaxed">
            💡 <strong>Mẹo phân biệt số 4, 7, 9:</strong> Số 4 thường đọc là <em>yon</em> (tránh âm <em>shi</em> mang nghĩa tử); Số 7 thường đọc là <em>nana</em> khi đếm số lượng; Số 9 đọc là <em>kyuu</em> trong số đếm thường và đọc là <em>ku</em> khi nói giờ (9 giờ - kuji) hoặc tháng (tháng 9 - kugatsu).
          </div>
        </section>
      )}

      {/* 4. HUNDREDS, THOUSANDS & LARGE NUMBERS */}
      {shouldShow("hundreds-thousands") && (
        <section className="space-y-6 rounded-[16px] bg-white border border-[#E2E8F0] p-5 sm:p-6 shadow-xs">
          <div className="space-y-1 pb-3 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">
                🏛️
              </span>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Hàng Trăm (百), Hàng Nghìn (千) & Cơ Số Vạn (万), Ức (億)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Chú ý các biến âm đục và âm ngắt ở số <strong>300 (sanbyaku)</strong>, <strong>600 (roppyaku)</strong>, <strong>800 (happyaku)</strong>, <strong>3000 (sanzen)</strong>, <strong>8000 (hassen)</strong>.
            </p>
          </div>

          {/* Hundreds & Thousands side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hundreds */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#12558F] flex items-center justify-between">
                <span>Hàng Trăm (百 - ひゃく)</span>
                <span className="text-[11px] font-normal text-[#D97706]">⚠️ Biến âm: 300, 600, 800</span>
              </h3>
              <div className="overflow-x-auto rounded-[10px] border border-[#E2E8F0]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
                      <th className="p-2.5 font-semibold text-center w-14">Số</th>
                      <th className="p-2.5 font-semibold">Hán tự</th>
                      <th className="p-2.5 font-semibold">Cách đọc</th>
                      <th className="p-2.5 font-semibold">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {HUNDREDS_LIST.map((item) => (
                      <tr
                        key={item.id}
                        className={item.isIrregular ? "bg-[#FFFBEB]/60" : ""}
                      >
                        <td className="p-2.5 font-bold font-mono text-center">{item.value}</td>
                        <td className="p-2.5 font-japanese font-bold text-[#0F172A]" lang="ja">{item.kanji}</td>
                        <td className="p-2.5 font-japanese font-medium text-[#1E40AF]" lang="ja">{item.hiragana}</td>
                        <td className="p-2.5 text-[11px] text-[#B45309]">
                          {item.irregularReasonVi || "Chuẩn"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Thousands */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#12558F] flex items-center justify-between">
                <span>Hàng Nghìn (千 - せん)</span>
                <span className="text-[11px] font-normal text-[#D97706]">⚠️ Biến âm: 3000, 8000</span>
              </h3>
              <div className="overflow-x-auto rounded-[10px] border border-[#E2E8F0]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
                      <th className="p-2.5 font-semibold text-center w-14">Số</th>
                      <th className="p-2.5 font-semibold">Hán tự</th>
                      <th className="p-2.5 font-semibold">Cách đọc</th>
                      <th className="p-2.5 font-semibold">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {THOUSANDS_LIST.map((item) => (
                      <tr
                        key={item.id}
                        className={item.isIrregular ? "bg-[#FFFBEB]/60" : ""}
                      >
                        <td className="p-2.5 font-bold font-mono text-center">{item.value}</td>
                        <td className="p-2.5 font-japanese font-bold text-[#0F172A]" lang="ja">{item.kanji}</td>
                        <td className="p-2.5 font-japanese font-medium text-[#1E40AF]" lang="ja">{item.hiragana}</td>
                        <td className="p-2.5 text-[11px] text-[#B45309]">
                          {item.irregularReasonVi || "Chuẩn"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Large Numbers: Man & Oku */}
          <div className="space-y-3 pt-2 border-t border-[#F1F5F9]">
            <h3 className="text-sm font-bold text-[#0F172A]">
              Hệ thống số lớn: Vạn (万 - 10.000) & Ức (億 - 100.000.000)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {LARGE_NUMBERS_LIST.map((ln) => (
                <div
                  key={ln.id}
                  className="p-3.5 rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 hover:border-[#94A3B8] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#64748B]">{ln.value}</span>
                    <span className="text-xs font-bold text-[#1E40AF] font-japanese" lang="ja">{ln.kanji}</span>
                  </div>
                  <div className="text-base font-bold font-japanese text-[#0F172A]" lang="ja">
                    {ln.hiragana}
                  </div>
                  <div className="text-xs text-[#334155]">{ln.meaningVi}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. AGE (TUỔI - 〜歳) */}
      {shouldShow("age") && (
        <section className="space-y-4 rounded-[16px] bg-white border border-[#E2E8F0] p-5 sm:p-6 shadow-xs">
          <div className="space-y-1 pb-3 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">
                🎂
              </span>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Cách Đếm Tuổi (〜歳 / 才 - さい) & Dấu Mốc 20 Tuổi (はたち)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Các biến âm sokuon quan trọng: <strong>1 tuổi (いっさい)</strong>, <strong>8 tuổi (はっさい)</strong>, <strong>10 tuổi (じゅっさい)</strong> và cột mốc <strong>20 tuổi (はたち)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {AGE_LIST.map((age) => (
              <div
                key={age.id}
                className={`p-3 rounded-[10px] border text-center space-y-1 ${
                  age.isIrregular
                    ? "bg-[#FFFBEB] border-[#FDE68A]"
                    : "bg-[#F8FAFC] border-[#E2E8F0]"
                }`}
              >
                <span className="text-xs font-bold text-[#64748B] font-mono block">
                  {age.value}
                </span>
                <span className="text-base font-bold font-japanese text-[#0F172A] block" lang="ja">
                  {age.kanji}
                </span>
                <span className="text-xs font-japanese font-semibold text-[#2684D9] block" lang="ja">
                  {age.hiragana}
                </span>
                <span className="text-[10px] italic text-[#64748B] block">
                  {age.romaji}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-[10px] bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534] leading-relaxed">
            💡 <strong>Câu hỏi tuổi lịch sự:</strong> Để hỏi tuổi thân mật ta dùng <em>何歳ですか (Nansai desu ka?)</em>. Trong giao tiếp lịch sự với người lớn tuổi, ta dùng <em>おいくつですか (Oikutsu desu ka?)</em>.
          </div>
        </section>
      )}

      {/* 6. DATES (NGÀY TRONG THÁNG 1 - 31) */}
      {shouldShow("dates") && (
        <section className="space-y-4 rounded-[16px] bg-white border border-[#E2E8F0] p-5 sm:p-6 shadow-xs">
          <div className="space-y-1 pb-3 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">
                📅
              </span>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Bảng Ngày Trong Tháng (1 đến 31)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Mùng 1 đến mùng 10 dùng bộ từ cổ thuần Nhật. Đặc biệt chú ý <strong>ngày 14 (じゅうよっか)</strong>, <strong>ngày 20 (はつか)</strong> và <strong>ngày 24 (にじゅうよっか)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {DATES_LIST.map((d) => (
              <div
                key={d.day}
                className={`p-3 rounded-[10px] border text-center space-y-0.5 transition-colors ${
                  d.isSpecial
                    ? "bg-[#FEF3C7]/70 border-[#FCD34D]"
                    : "bg-[#F8FAFC] border-[#E2E8F0]"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="font-japanese text-[#12558F]">{d.kanji}</span>
                  {d.isSpecial && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-[#D97706] text-white">
                      Đặc biệt
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold font-japanese text-[#0F172A]" lang="ja">
                  {d.hiragana}
                </div>
                <div className="text-[10px] italic text-[#64748B]">
                  {d.romaji}
                </div>
                <div className="text-[10px] text-[#334155] pt-0.5">
                  {d.meaningVi}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. MONTHS & WEEKDAYS */}
      {shouldShow("months-weekdays") && (
        <section className="space-y-6 rounded-[16px] bg-white border border-[#E2E8F0] p-5 sm:p-6 shadow-xs">
          {/* Months */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F1F5F9]">
              <span className="text-xl" aria-hidden="true">
                🗓️
              </span>
              <h2 className="text-lg font-bold text-[#0F172A]">
                12 Tháng Trong Năm (〜月 - がつ)
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {MONTHS_LIST.map((m) => (
                <div
                  key={m.month}
                  className={`p-3 rounded-[10px] border text-center space-y-0.5 ${
                    m.isSpecial
                      ? "bg-[#FEF3C7] border-[#FCD34D]"
                      : "bg-[#F8FAFC] border-[#E2E8F0]"
                  }`}
                >
                  <span className="text-xs font-bold font-japanese text-[#12558F] block" lang="ja">
                    {m.kanji}
                  </span>
                  <span className="text-sm font-bold font-japanese text-[#0F172A] block" lang="ja">
                    {m.hiragana}
                  </span>
                  <span className="text-[11px] italic text-[#64748B] block">
                    {m.romaji}
                  </span>
                  {m.noteVi && (
                    <span className="text-[10px] text-[#B45309] font-medium block">
                      ⚠️ {m.noteVi}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Weekdays */}
          <div className="space-y-3 pt-3 border-t border-[#F1F5F9]">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">
                ⭐
              </span>
              <h3 className="text-base font-bold text-[#0F172A]">
                7 Thứ Trong Tuần (〜曜日 - ようび)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {WEEKDAYS_LIST.map((w) => (
                <div
                  key={w.id}
                  className="p-3.5 rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5 hover:border-[#94A3B8] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E40AF]">{w.dayNameVi}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EBF5FF] text-[#1E40AF] font-medium">
                      {w.elementVi}
                    </span>
                  </div>
                  <div className="text-lg font-bold font-japanese text-[#0F172A]" lang="ja">
                    {w.kanji}
                  </div>
                  <div className="text-xs font-japanese font-medium text-[#2684D9]">
                    {w.hiragana} ({w.romaji})
                  </div>
                  <div className="text-[11px] text-[#64748B] pt-1 border-t border-[#E2E8F0]/60">
                    💡 {w.mnemonicVi}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. TIME (GIỜ & PHÚT) */}
      {shouldShow("time") && (
        <section className="space-y-6 rounded-[16px] bg-white border border-[#E2E8F0] p-5 sm:p-6 shadow-xs">
          <div className="space-y-1 pb-3 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">
                ⏰
              </span>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Thời Gian: Đọc Giờ (〜時 - じ) & Phút (〜分 - ふん / ぷん)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              3 mốc giờ bất quy tắc tuyệt đối không được nhầm: <strong>4 giờ (よじ)</strong>, <strong>7 giờ (しちじ)</strong>, <strong>9 giờ (くじ)</strong>. Số phút chia thành hai nhóm: đuôi <em>fun</em> và đuôi biến âm <em>pun</em>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hours */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#12558F]">12 Mốc Giờ (〜時)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIME_HOURS_LIST.map((h) => (
                  <div
                    key={h.id}
                    className={`p-2.5 rounded-[8px] border text-center space-y-0.5 ${
                      h.isSpecial
                        ? "bg-[#FEF3C7] border-[#FCD34D]"
                        : "bg-[#F8FAFC] border-[#E2E8F0]"
                    }`}
                  >
                    <span className="text-xs font-bold font-japanese text-[#12558F] block" lang="ja">
                      {h.kanji}
                    </span>
                    <span className="text-sm font-bold font-japanese text-[#0F172A] block" lang="ja">
                      {h.hiragana}
                    </span>
                    <span className="text-[10px] italic text-[#64748B] block">
                      {h.romaji}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#12558F]">Mốc Phút Tiêu Biểu (〜分)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIME_MINUTES_LIST.map((m) => (
                  <div
                    key={m.id}
                    className={`p-2.5 rounded-[8px] border text-center space-y-0.5 ${
                      m.isSpecial
                        ? "bg-[#EFF6FF] border-[#BFDBFE]"
                        : "bg-[#F8FAFC] border-[#E2E8F0]"
                    }`}
                  >
                    <span className="text-xs font-bold font-japanese text-[#12558F] block" lang="ja">
                      {m.kanji}
                    </span>
                    <span className="text-sm font-bold font-japanese text-[#0F172A] block" lang="ja">
                      {m.hiragana}
                    </span>
                    <span className="text-[10px] italic text-[#64748B] block">
                      {m.romaji}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. COUNTERS DETAILS */}
      {shouldShow("counters") && (
        <section className="space-y-6 rounded-[16px] bg-white border border-[#E2E8F0] p-5 sm:p-6 shadow-xs">
          <div className="space-y-1 pb-3 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">
                📋
              </span>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Bảng Lượng Từ Chuyên Biệt (Counters)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Chi tiết các lượng từ thông dụng nhất trong tiếng Nhật sơ cấp kèm đối tượng sử dụng và nghi vấn từ tương ứng.
            </p>
          </div>

          <div className="space-y-6">
            {COUNTER_GROUPS.map((cg) => (
              <div
                key={cg.id}
                className="rounded-[14px] bg-[#F8FAFC] border border-[#CBD5E1] p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-start justify-between flex-wrap gap-2 pb-2 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-[8px] bg-white border border-[#CBD5E1] text-[#12558F] font-bold text-base flex items-center justify-center font-japanese shrink-0" lang="ja">
                      {cg.counterKanji}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                        {cg.nameVi}
                      </h3>
                      <p className="text-xs text-[#64748B]">
                        Áp dụng: {cg.targetObjectsVi}
                      </p>
                    </div>
                  </div>

                  <Badge variant="primary" size="sm">
                    Từ hỏi: {cg.questionWord.hiragana} ({cg.questionWord.meaningVi})
                  </Badge>
                </div>

                {/* Items grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {cg.items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-[8px] bg-white border text-center space-y-0.5 ${
                        item.isIrregular ? "border-[#FCD34D] bg-[#FFFBEB]/50" : "border-[#E2E8F0]"
                      }`}
                    >
                      <span className="text-[11px] font-mono text-[#64748B] block">
                        Số lượng: {item.value}
                      </span>
                      <span className="text-sm font-bold font-japanese text-[#0F172A] block" lang="ja">
                        {item.kanji}
                      </span>
                      <span className="text-xs font-japanese font-semibold text-[#2684D9] block" lang="ja">
                        {item.hiragana}
                      </span>
                      <span className="text-[10px] italic text-[#64748B] block">
                        {item.romaji}
                      </span>
                    </div>
                  ))}
                </div>

                {cg.tipsVi && (
                  <div className="text-xs text-[#475569] bg-white p-2.5 rounded-[8px] border border-[#E2E8F0]">
                    💡 <strong>Mẹo:</strong> {cg.tipsVi.join(" ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. SOUND CHANGE TABLE */}
      {shouldShow("sound-changes") && (
        <section aria-labelledby="sec-sound-changes-title">
          <SoundChangeTable rows={SOUND_CHANGE_MATRIX} />
        </section>
      )}

      {/* 11. MINI PRACTICE */}
      {shouldShow("practice") && (
        <section aria-labelledby="sec-practice-title">
          <NumbersPractice questions={NUMBERS_PRACTICE_QUESTIONS} />
        </section>
      )}
    </BeginnerLayout>
  );
};

export default NumbersPage;
