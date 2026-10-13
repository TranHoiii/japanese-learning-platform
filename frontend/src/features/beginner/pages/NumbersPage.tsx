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
  BASIC_NUMBERS,
  HUNDREDS_LIST,
  THOUSANDS_LIST,
  LARGE_NUMBERS_LIST,
  AGE_LIST,
  DATES_LIST,
  TIME_HOURS_LIST,
  TIME_MINUTES_LIST,
  COUNTER_GROUPS,
  NUMBERS_PRACTICE_QUESTIONS,
} from "../data/numbers";
import { cn } from "../../../utils/cn";

type ToolTab = "builder" | "calculator" | "sound-changes";
type ReferenceTab = "basic" | "time" | "age" | "counters" | "practice";

export const NumbersPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolTab>("builder");
  const [activeRefTab, setActiveRefTab] = useState<ReferenceTab>("basic");
  const [counterSearch, setCounterSearch] = useState("");

  const speak = (txt: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(txt);
      u.lang = "ja-JP";
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const filteredCounters = COUNTER_GROUPS.filter(
    (c) =>
      !counterSearch.trim() ||
      c.counterKanji.includes(counterSearch) ||
      c.counterHiragana.includes(counterSearch) ||
      c.nameVi.toLowerCase().includes(counterSearch.toLowerCase()) ||
      c.targetObjectsVi.toLowerCase().includes(counterSearch.toLowerCase()),
  );

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
        <Link to="/beginner/practice?mode=numbers">
          <Button variant="secondary" size="sm" tactile>
            🎯 Luyện phản xạ &rarr;
          </Button>
        </Link>
      }
    >
      {/* 1. TOP INTERACTIVE WORKBENCH STUDIO */}
      <section className="space-y-4" aria-label="Bộ công cụ tương tác">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1F1C18]">
              Xưởng Thực Hành & Tra Cứu Tự Động
            </h2>
            <p className="text-xs sm:text-sm text-[#766D5E]">
              Chọn công cụ để ghép số lớn, tính lượng từ hoặc tra cứu quy luật biến âm âm đục/âm ngắt.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#EFE9DF] border border-[#DDD6C8] shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTool("builder")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer",
                activeTool === "builder"
                  ? "bg-white text-indigo-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900",
              )}
            >
              🔢 Ghép số & Vạn (万)
            </button>
            <button
              type="button"
              onClick={() => setActiveTool("calculator")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer",
                activeTool === "calculator"
                  ? "bg-white text-indigo-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900",
              )}
            >
              🧮 Bộ tính Lượng từ
            </button>
            <button
              type="button"
              onClick={() => setActiveTool("sound-changes")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer",
                activeTool === "sound-changes"
                  ? "bg-white text-indigo-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900",
              )}
            >
              ⚡ Ma trận Biến âm
            </button>
          </div>
        </div>

        {/* Studio Canvas */}
        <div className="surface rounded-3xl p-5 sm:p-7 shadow-zen border border-[#E7E0D2]">
          {activeTool === "builder" && <NumberBuilder />}
          {activeTool === "calculator" && <CounterCalculator />}
          {activeTool === "sound-changes" && <SoundChangeTable />}
        </div>
      </section>

      {/* 2. BOTTOM REFERENCE DECK */}
      <section className="space-y-5 pt-4" aria-label="Từ điển tra cứu nhanh">
        {/* Navigation Tabs Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-[#E7E0D2]">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#1F1C18]">
              Thư Viện Tra Cứu Trực Quan
            </h3>
            <p className="text-xs text-[#766D5E]">
              Nhấp vào bất kỳ ô số nào để nghe giọng phát âm mẫu chuẩn Tokyo.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              type="button"
              onClick={() => setActiveRefTab("basic")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer",
                activeRefTab === "basic"
                  ? "bg-[#2F5496] text-white shadow-2xs"
                  : "bg-white text-slate-700 border border-[#E7E0D2] hover:bg-slate-100",
              )}
            >
              0 - 99 & Vạn (万)
            </button>
            <button
              type="button"
              onClick={() => setActiveRefTab("time")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer",
                activeRefTab === "time"
                  ? "bg-[#2F5496] text-white shadow-2xs"
                  : "bg-white text-slate-700 border border-[#E7E0D2] hover:bg-slate-100",
              )}
            >
              Giờ, Phút & Ngày (1-31)
            </button>
            <button
              type="button"
              onClick={() => setActiveRefTab("age")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer",
                activeRefTab === "age"
                  ? "bg-[#2F5496] text-white shadow-2xs"
                  : "bg-white text-slate-700 border border-[#E7E0D2] hover:bg-slate-100",
              )}
            >
              Đếm Tuổi (1 - 20+)
            </button>
            <button
              type="button"
              onClick={() => setActiveRefTab("counters")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer",
                activeRefTab === "counters"
                  ? "bg-[#2F5496] text-white shadow-2xs"
                  : "bg-white text-slate-700 border border-[#E7E0D2] hover:bg-slate-100",
              )}
            >
              Tất cả Lượng từ ({COUNTER_GROUPS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveRefTab("practice")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer",
                activeRefTab === "practice"
                  ? "bg-rose-600 text-white shadow-2xs"
                  : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100",
              )}
            >
              🎯 Thử thách ({NUMBERS_PRACTICE_QUESTIONS.length})
            </button>
          </div>
        </div>

        {/* Tab 1: BASIC NUMBERS & LARGE POWERS */}
        {activeRefTab === "basic" && (
          <div className="space-y-6 animate-fade-in">
            {/* 0 to 10 core strip */}
            <div className="surface rounded-3xl p-5 sm:p-7 space-y-4 shadow-zen border border-[#E7E0D2]">
              <div className="flex items-center justify-between pb-2 border-b border-[#F3EEE5]">
                <div>
                  <h4 className="font-display text-base font-bold text-[#1F1C18]">
                    Chữ Số Cơ Bản (0 Đến 10)
                  </h4>
                  <p className="text-xs text-[#766D5E]">
                    Nền móng cho toàn bộ hệ thống số đếm. Lưu ý số 4 (yon/shi), số 7 (nana/shichi), số 9 (kyuu/ku).
                  </p>
                </div>
                <Badge variant="primary" size="sm">11 số cốt lõi</Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5">
                {BASIC_NUMBERS.slice(0, 11).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => speak(item.hiragana)}
                    className="p-3 rounded-2xl bg-white border border-[#E7E0D2] hover:border-[#2F5496] hover:bg-[#EEF3FA]/40 transition-all text-center space-y-0.5 cursor-pointer shadow-2xs group"
                    title={`Phát âm: ${item.hiragana}`}
                  >
                    <span className="font-mono text-xs font-bold text-slate-400 block group-hover:text-indigo-600">
                      #{item.value}
                    </span>
                    <span className="text-2xl font-black font-japanese text-[#213960] block" lang="ja">
                      {item.kanji}
                    </span>
                    <span className="text-xs font-bold text-slate-800 block">
                      {item.hiragana}
                    </span>
                    <span className="text-[10px] text-slate-500 italic block">
                      {item.romaji}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hundreds, Thousands, Large numbers grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Hundreds */}
              <div className="surface rounded-3xl p-5 space-y-3 shadow-zen border border-[#E7E0D2]">
                <div className="flex items-center justify-between pb-2 border-b border-[#F3EEE5]">
                  <h4 className="font-bold text-sm text-[#1F1C18]">Hàng Trăm (〜百 Hyaku)</h4>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    300, 600, 800 biến âm
                  </span>
                </div>
                <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                  {HUNDREDS_LIST.map((h) => (
                    <div
                      key={h.id}
                      onClick={() => speak(h.hiragana)}
                      className={cn(
                        "p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors",
                        h.isIrregular
                          ? "bg-amber-50/70 border-amber-200 hover:bg-amber-100"
                          : "bg-white border-[#E7E0D2] hover:bg-[#FAF7F1]",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#1F1C18] w-10">{h.value}</span>
                        <span className="font-japanese font-bold text-[#213960]" lang="ja">{h.kanji}</span>
                      </div>
                      <div className="text-right">
                        <span className={cn("font-bold", h.isIrregular ? "text-amber-900" : "text-slate-800")}>{h.hiragana}</span>
                        <span className="text-[10px] text-slate-400 block italic">{h.romaji}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thousands */}
              <div className="surface rounded-3xl p-5 space-y-3 shadow-zen border border-[#E7E0D2]">
                <div className="flex items-center justify-between pb-2 border-b border-[#F3EEE5]">
                  <h4 className="font-bold text-sm text-[#1F1C18]">Hàng Nghìn (〜千 Sen)</h4>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    3.000, 8.000 biến âm
                  </span>
                </div>
                <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                  {THOUSANDS_LIST.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => speak(t.hiragana)}
                      className={cn(
                        "p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors",
                        t.isIrregular
                          ? "bg-amber-50/70 border-amber-200 hover:bg-amber-100"
                          : "bg-white border-[#E7E0D2] hover:bg-[#FAF7F1]",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#1F1C18] w-12">{t.value}</span>
                        <span className="font-japanese font-bold text-[#213960]" lang="ja">{t.kanji}</span>
                      </div>
                      <div className="text-right">
                        <span className={cn("font-bold", t.isIrregular ? "text-amber-900" : "text-slate-800")}>{t.hiragana}</span>
                        <span className="text-[10px] text-slate-400 block italic">{t.romaji}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Large Numbers */}
              <div className="surface rounded-3xl p-5 space-y-3 shadow-zen border border-[#E7E0D2]">
                <div className="flex items-center justify-between pb-2 border-b border-[#F3EEE5]">
                  <h4 className="font-bold text-sm text-[#1F1C18]">Hàng Vạn & Ức (万 / 億)</h4>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                    Cơ số 4 số 0
                  </span>
                </div>
                <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                  {LARGE_NUMBERS_LIST.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => speak(l.hiragana)}
                      className="p-2.5 rounded-xl bg-white border border-[#E7E0D2] hover:bg-[#FAF7F1] flex items-center justify-between text-xs cursor-pointer transition-colors"
                    >
                      <div>
                        <span className="font-mono font-bold text-slate-800 block">{l.value}</span>
                        <span className="font-japanese font-bold text-indigo-900 text-sm" lang="ja">{l.kanji}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900 block">{l.hiragana}</span>
                        <span className="text-[10px] text-slate-400 italic">{l.romaji}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: TIME & CALENDAR */}
        {activeRefTab === "time" && (
          <div className="space-y-6 animate-fade-in">
            {/* Dates of Month (1 - 31) */}
            <div className="surface rounded-3xl p-5 sm:p-7 space-y-4 shadow-zen border border-[#E7E0D2]">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#F3EEE5]">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#1F1C18]">
                    Ngày Trong Tháng (1 Đến 31) - Cực Kỳ Dễ Nhầm
                  </h3>
                  <p className="text-xs text-[#766D5E]">
                    Từ mùng 1 đến mùng 10 là cách đếm thuần Nhật bất quy tắc. Ngày 14, 20, 24 cũng biến âm đặc biệt!
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  ⚠️ Ngày 1 đến 10 + 14 + 20 + 24
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
                {DATES_LIST.map((d) => (
                  <button
                    key={d.day}
                    type="button"
                    onClick={() => speak(d.hiragana)}
                    className={cn(
                      "p-3 rounded-2xl border text-center space-y-0.5 cursor-pointer transition-all hover:scale-102",
                      d.isSpecial
                        ? "bg-amber-50/80 border-amber-300 text-amber-950 shadow-2xs"
                        : "bg-white border-[#E7E0D2] text-[#433D34] hover:bg-[#FAF7F1]",
                    )}
                    title={`Mùng ${d.day}: ${d.hiragana}`}
                  >
                    <span className="text-[10px] font-mono font-bold opacity-60 block">Ngày {d.day}</span>
                    <span className="text-lg font-black font-japanese text-[#213960] block" lang="ja">
                      {d.kanji}
                    </span>
                    <span className={cn("text-xs font-bold block", d.isSpecial ? "text-amber-900" : "text-slate-800")}>
                      {d.hiragana}
                    </span>
                    <span className="text-[10px] opacity-70 italic block">
                      {d.romaji}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Hours & Minutes Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Hours */}
              <div className="surface rounded-3xl p-5 space-y-3 shadow-zen border border-[#E7E0D2]">
                <div className="flex items-center justify-between pb-2 border-b border-[#F3EEE5]">
                  <h4 className="font-bold text-sm text-[#1F1C18]">Giờ Trong Ngày (〜時 Ji)</h4>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                    4h (yoji), 7h (shichiji), 9h (kuji)
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIME_HOURS_LIST.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => speak(h.hiragana)}
                      className={cn(
                        "p-2.5 rounded-xl border text-left cursor-pointer transition-colors",
                        h.isSpecial
                          ? "bg-rose-50/70 border-rose-200 hover:bg-rose-100"
                          : "bg-white border-[#E7E0D2] hover:bg-[#FAF7F1]",
                      )}
                    >
                      <span className="font-mono text-xs font-bold text-slate-400 block">{h.value}</span>
                      <span className="font-japanese font-black text-[#213960] text-base" lang="ja">{h.kanji}</span>
                      <span className={cn("text-xs font-bold block", h.isSpecial ? "text-rose-900" : "text-slate-700")}>{h.hiragana}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Minutes */}
              <div className="surface rounded-3xl p-5 space-y-3 shadow-zen border border-[#E7E0D2]">
                <div className="flex items-center justify-between pb-2 border-b border-[#F3EEE5]">
                  <h4 className="font-bold text-sm text-[#1F1C18]">Phút (〜分 Fun / Pun)</h4>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    1, 3, 4, 6, 8, 10 biến âm (pun)
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIME_MINUTES_LIST.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => speak(m.hiragana)}
                      className={cn(
                        "p-2.5 rounded-xl border text-left cursor-pointer transition-colors",
                        m.isSpecial
                          ? "bg-amber-50/70 border-amber-200 hover:bg-amber-100"
                          : "bg-white border-[#E7E0D2] hover:bg-[#FAF7F1]",
                      )}
                    >
                      <span className="font-mono text-xs font-bold text-slate-400 block">{m.value}</span>
                      <span className="font-japanese font-black text-[#213960] text-base" lang="ja">{m.kanji}</span>
                      <span className={cn("text-xs font-bold block", m.isSpecial ? "text-amber-900" : "text-slate-700")}>{m.hiragana}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: AGE & PEOPLE */}
        {activeRefTab === "age" && (
          <div className="surface rounded-3xl p-5 sm:p-7 space-y-5 shadow-zen border border-[#E7E0D2] animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3EEE5]">
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#1F1C18]">
                  Cách Đếm Tuổi (〜歳 Sai) & 20 Tuổi Đặc Biệt (二十歳 Hatachi)
                </h3>
                <p className="text-xs text-[#766D5E]">
                  1 tuổi (issai), 8 tuổi (hassai), 10 tuổi (jussai), 20 tuổi (hatachi - không dùng sai).
                </p>
              </div>
              <Badge variant="warning" size="sm">20 tuổi: はたち</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
              {AGE_LIST.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => speak(a.hiragana)}
                  className={cn(
                    "p-3 rounded-2xl border text-center space-y-0.5 cursor-pointer transition-all hover:scale-102",
                    a.isIrregular
                      ? "bg-amber-50/80 border-amber-300 text-amber-950 shadow-2xs"
                      : "bg-white border-[#E7E0D2] text-[#433D34] hover:bg-[#FAF7F1]",
                  )}
                  title={`${a.value}: ${a.hiragana}`}
                >
                  <span className="text-[10px] font-mono font-bold opacity-60 block">{a.value}</span>
                  <span className="text-xl font-black font-japanese text-[#213960] block" lang="ja">
                    {a.kanji}
                  </span>
                  <span className={cn("text-xs font-bold block", a.isIrregular ? "text-amber-900" : "text-slate-800")}>
                    {a.hiragana}
                  </span>
                  <span className="text-[10px] opacity-70 italic block">
                    {a.romaji}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: ALL COUNTERS DIRECTORY */}
        {activeRefTab === "counters" && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-[#FAF7F1] border border-[#E7E0D2] flex items-center justify-between gap-3">
              <input
                type="text"
                value={counterSearch}
                onChange={(e) => setCounterSearch(e.target.value)}
                placeholder="Tìm lượng từ (ví dụ: con, cái, cuốn, bản, tấm, tsu, hon...)"
                className="w-full max-w-md px-4 py-2 rounded-xl bg-white border border-[#D3CABA] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-indigo-600"
              />
              <span className="text-xs text-slate-500 font-bold shrink-0">
                {filteredCounters.length} lượng từ
              </span>
            </div>

            <div className="space-y-6">
              {filteredCounters.map((group) => (
                <div key={group.id} className="surface rounded-3xl p-5 sm:p-6 space-y-4 shadow-zen border border-[#E7E0D2]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F3EEE5] flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black font-japanese text-[#213960]" lang="ja">
                        〜{group.counterKanji} ({group.counterHiragana})
                      </span>
                      <span className="text-sm font-bold text-slate-800 font-display">
                        • {group.nameVi}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                      Từ để hỏi: {group.questionWord.hiragana} ({group.questionWord.meaningVi})
                    </span>
                  </div>

                  <p className="text-xs text-[#766D5E] leading-relaxed">
                    {group.descriptionVi} • <strong>Đối tượng:</strong> {group.targetObjectsVi}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                    {group.items.slice(0, 10).map((it) => (
                      <button
                        key={it.id}
                        type="button"
                        onClick={() => speak(it.hiragana)}
                        className={cn(
                          "p-2.5 rounded-xl border text-center cursor-pointer transition-all hover:scale-102",
                          it.isIrregular
                            ? "bg-amber-50/80 border-amber-300 text-amber-950 shadow-3xs"
                            : "bg-white border-[#E7E0D2] hover:bg-slate-50 text-slate-800",
                        )}
                        title={`${it.meaningVi}: ${it.hiragana}`}
                      >
                        <span className="font-mono text-[10px] text-slate-400 block">{it.value}</span>
                        <span className="font-bold text-sm block font-japanese text-[#213960]">{it.kanji}</span>
                        <span className={cn("text-xs font-semibold block", it.isIrregular ? "text-amber-900" : "text-slate-700")}>
                          {it.hiragana}
                        </span>
                      </button>
                    ))}
                  </div>

                  {group.tipsVi && group.tipsVi.length > 0 && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                      <span className="font-bold text-slate-700 block">💡 Mẹo ghi nhớ:</span>
                      {group.tipsVi.map((tip, idx) => (
                        <p key={idx}>• {tip}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: INTERACTIVE PRACTICE */}
        {activeRefTab === "practice" && (
          <div className="animate-fade-in">
            <NumbersPractice questions={NUMBERS_PRACTICE_QUESTIONS} />
          </div>
        )}
      </section>
    </BeginnerLayout>
  );
};

export default NumbersPage;
