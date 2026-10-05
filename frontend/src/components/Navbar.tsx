import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();

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
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
              location.pathname === "/n5/lessons"
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Bài học N5
          </Link>
          <Link
            to="/n5/exercises"
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
              location.pathname.startsWith("/n5/exercises") || location.pathname.startsWith("/exercises")
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Bài tập N5
          </Link>
          <Link
            to="/search"
            id="search-nav-link"
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
              location.pathname === "/search"
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Tìm kiếm
          </Link>
          {currentUser && (
            <>
              <Link
                to="/progress"
                id="progress-nav-link"
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                  location.pathname === "/progress"
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Tiến độ
              </Link>
              <Link
                to="/review"
                id="review-nav-link"
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                  location.pathname === "/review"
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Ôn tập
              </Link>
              <Link
                to="/favorites"
                id="favorites-nav-link"
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                  location.pathname === "/favorites"
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Yêu thích
              </Link>
            </>
          )}
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
            JLPT N5
          </span>

          <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

          {currentUser ? (
            <div className="flex items-center space-x-2 pl-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs border border-indigo-200">
                  {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                    {currentUser.fullName || currentUser.email}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight truncate max-w-[120px]">
                    {currentUser.email}
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                id="logout-button"
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-slate-200"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Link
                to="/login"
                id="login-link"
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                id="register-link"
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-xs transition-colors"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
