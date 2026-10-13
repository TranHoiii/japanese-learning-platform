import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import PageContainer from "../components/layout/PageContainer";

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const portalCards = [
    {
      to: "/beginner",
      icon: "🌸",
      kanji: "初",
      title: "Tủ sách Sơ cấp",
      desc: "Bảng chữ cái Hiragana, Katakana, số đếm và phát âm chuẩn Nhật.",
      color: "border-rose-200 dark:border-rose-900/60 hover:border-rose-400",
    },
    {
      to: "/n5/lessons",
      icon: "⛩️",
      kanji: "五",
      title: "Bài học Minna N5",
      desc: "25 bài học nền tảng toàn diện với từ vựng, ngữ pháp, kanji và hội thoại.",
      color: "border-indigo-200 dark:border-indigo-900/60 hover:border-indigo-400",
    },
    {
      to: "/practice",
      icon: "🎯",
      kanji: "練",
      title: "Phòng Luyện tập",
      desc: "Hệ thống trắc nghiệm và câu hỏi tương tác củng cố phản xạ kiến thức.",
      color: "border-amber-200 dark:border-amber-900/60 hover:border-amber-400",
    },
    {
      to: "/handbook",
      icon: "📚",
      kanji: "筆",
      title: "Sổ tay Handbook",
      desc: "Cẩm nang ngữ pháp, mẹo thi chứng chỉ JLPT và nét đẹp văn hóa Nhật.",
      color: "border-emerald-200 dark:border-emerald-900/60 hover:border-emerald-400",
    },
  ];

  return (
    <AppShell>
      <PageContainer className="py-8 sm:py-14 pb-28 lg:pb-16 max-w-4xl">
        <div className="surface rounded-3xl p-6 sm:p-12 border border-[#E7E0D2] shadow-zen text-center relative overflow-hidden space-y-8">
          {/* Zen Enso / Torii Watermark */}
          <div
            aria-hidden="true"
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-rose-500/5 dark:bg-rose-500/10 blur-3xl pointer-events-none"
          />

          {/* Torii Gate Artwork */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-3xl bg-rose-500/10 border border-rose-400/30 flex items-center justify-center text-4xl shadow-inner font-mincho text-rose-600 dark:text-rose-400 mb-4 animate-float">
              ⛩️
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-300/40 text-rose-700 dark:text-rose-300 text-xs font-black uppercase tracking-widest mb-2">
              <span>迷い道 • Lạc Lối Giữa Màn Sương</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              404 <span className="text-rose-500 font-mincho">頁無</span>
            </h1>

            {/* Japanese Haiku */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 max-w-md mx-auto text-center space-y-1">
              <p className="font-mincho text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 tracking-wide">
                「霧深き 道を見失い 迷うとも 一歩踏み出せ 我が道あり」
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                (Dù sương giăng khuất lối mòn — Vững lòng tiến bước ắt còn đường đi)
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mt-3 leading-relaxed">
              Trang hoặc tài liệu bạn đang tìm kiếm không tồn tại, đã được đổi tên hoặc liên kết bị gián đoạn.
            </p>
          </div>

          {/* Quick Search on 404 */}
          <div className="relative z-10 max-w-md mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm từ vựng, kanji hoặc ngữ pháp..."
                className="w-full pl-4 pr-24 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-2xs"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold transition-all cursor-pointer"
              >
                Tra cứu
              </button>
            </form>
          </div>

          {/* Quick Portal Cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-left">
            {portalCards.map((portal) => (
              <Link
                key={portal.to}
                to={portal.to}
                className={`p-4 rounded-2xl bg-white dark:bg-slate-900/80 border ${portal.color} shadow-2xs hover:shadow-zen hover:-translate-y-0.5 transition-all group flex items-start gap-3`}
              >
                <span className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                  {portal.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {portal.title}
                    </h3>
                    <span className="text-[10px] font-mincho font-bold text-slate-400">
                      {portal.kanji}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {portal.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Back to Home CTA */}
          <div className="relative z-10 pt-2 flex items-center justify-center gap-3">
            <Link
              to="/"
              className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-500/20 transition-all cursor-pointer active:scale-95 flex items-center gap-2"
            >
              <span>Trở về Trang chủ</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}
