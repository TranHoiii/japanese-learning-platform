import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-6">
              Nền tảng học tiếng Nhật hàng đầu • JLPT N5
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Học Từ Vựng Tiếng Nhật N5 Theo Bài
            </h1>

            <p className="text-slate-300 text-base sm:text-xl leading-relaxed mb-8">
              Hệ thống từ vựng N5 chuẩn 25 bài Minnano Nihongo. Đầy đủ Hiragana, Kanji, Hán Việt và Ý nghĩa tiếng Việt chính xác.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/n5/lessons"
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
              >
                Khám phá 25 Bài N5 →
              </Link>

              <Link
                to="/n5/lessons/1/vocabulary"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold backdrop-blur-md border border-white/20 transition-all"
              >
                Học Bài 01 Ngay
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-bold text-lg text-slate-900 mb-1">25 Bài Học N5</h3>
            <p className="text-slate-500 text-sm">
              Đầy đủ 1053 từ vựng N5 phân theo từng bài chuẩn Minnano Nihongo.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-bold text-lg text-slate-900 mb-1">Tra Cứu Nhanh</h3>
            <p className="text-slate-500 text-sm">
              Tìm kiếm từ vựng linh hoạt theo Hiragana, Kanji, Hán Việt hoặc Ý nghĩa.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="text-3xl mb-3">🎴</div>
            <h3 className="font-bold text-lg text-slate-900 mb-1">Dạng Bảng & Thẻ</h3>
            <p className="text-slate-500 text-sm">
              Tùy chọn chế độ xem bảng trực quan hoặc dạng thẻ card flashcard dễ học.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
