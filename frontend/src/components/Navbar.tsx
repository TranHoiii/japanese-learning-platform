import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            日
          </div>
          <div>
            <span className="font-extrabold text-lg bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent block leading-tight">
              Japanese Platform
            </span>
            <span className="text-xs text-slate-500 font-medium">Học tiếng Nhật N5 - N1</span>
          </div>
        </Link>

        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Link
            to="/n5/lessons"
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              location.pathname === "/n5/lessons"
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Bài học N5
          </Link>
          <Link
            to="/n5/exercises"
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              location.pathname.startsWith("/n5/exercises") || location.pathname.startsWith("/exercises")
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Bài tập N5 (27 bài)
          </Link>
          <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
            JLPT N5
          </span>
        </nav>
      </div>
    </header>
  );
}
