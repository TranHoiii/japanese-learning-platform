import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email: email.trim(), password });
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const message = error.response?.data?.message || error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại email hoặc mật khẩu.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoFill = () => {
    setEmail("learner@example.com");
    setPassword("password123");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Hero Panel (Visual Studio - 5 cols) */}
          <div className="hidden lg:flex lg:col-span-5 hero-ink pattern-seigaiha rounded-3xl p-8 flex-col justify-between text-white shadow-zen relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 font-black text-2xl flex items-center justify-center font-mincho shadow-md">
                  日
                </span>
                <div>
                  <h2 className="font-display text-xl font-black tracking-tight">Nihongo.</h2>
                  <p className="text-xs text-white/70 font-japanese">日本語を学ぼう</p>
                </div>
              </div>

              {/* Japanese Proverb */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2 backdrop-blur-xs">
                <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase block">
                  Châm ngôn học tập
                </span>
                <p className="text-xl font-bold font-japanese tracking-wide text-white" lang="ja">
                  七転び八起き
                </p>
                <p className="text-xs text-white/90 leading-relaxed font-sans">
                  "Thất chuyển bát khởi" — Ngã bảy lần, đứng dậy tám lần. Kiên trì từng ngày sẽ mở ra cánh cửa Nhật ngữ.
                </p>
              </div>

              {/* Perks */}
              <ul className="space-y-3 text-xs text-white/85">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs">✓</span>
                  <span>Đồng bộ tiến độ học trên mọi thiết bị</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs">✓</span>
                  <span>Lưu lại chuỗi ngày học liên tục (Streak)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs">✓</span>
                  <span>Ôn tập thông minh ngắt quãng (SRS)</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/15 text-[11px] text-white/60">
              Nền tảng học tiếng Nhật toàn diện cho người Việt
            </div>
          </div>

          {/* Right Auth Card (7 cols) */}
          <div className="lg:col-span-7 surface rounded-3xl p-7 sm:p-10 border border-[#E7E0D2] shadow-zen flex flex-col justify-center space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="lg:hidden w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 text-white flex items-center justify-center font-bold text-lg font-mincho shadow-md">
                  日
                </span>
                <span className="text-xs font-semibold text-slate-400">Chào mừng trở lại</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F1C18] tracking-tight">
                Đăng nhập tài khoản
              </h1>
              <p className="text-xs sm:text-sm text-[#766D5E] mt-1">
                Tiếp tục hành trình chinh phục tiếng Nhật của bạn hôm nay.
              </p>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-shake">
                <span className="text-base" aria-hidden="true">⚠️</span>
                <span className="font-medium leading-relaxed">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="login-email">
                  Địa chỉ Email
                </label>
                <input
                  type="email"
                  id="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-600 transition-colors text-slate-900 text-sm font-medium bg-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700" htmlFor="login-password">
                    Mật khẩu
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                  >
                    {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-600 transition-colors text-slate-900 text-sm font-medium bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="login-submit-btn"
                  className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-700 active:translate-y-0.5 transition-all shadow-[0_3px_0_0_#1D3050] active:shadow-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang xử lý đăng nhập..." : "Đăng nhập ngay"}
                </button>
              </div>
            </form>

            {/* Quick Demo Helper */}
            <div className="pt-4 border-t border-[#F3EEE5] flex items-center justify-between text-xs">
              <span className="text-[#766D5E]">Chưa có tài khoản?</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="text-slate-500 hover:text-indigo-700 font-semibold cursor-pointer"
                  title="Điền email/mật khẩu mẫu"
                >
                  Điền tài khoản mẫu
                </button>
                <Link
                  to="/register"
                  id="to-register-link"
                  className="font-bold text-indigo-700 hover:text-indigo-900"
                >
                  Đăng ký miễn phí &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
