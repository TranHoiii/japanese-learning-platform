import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { currentUser, register } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMessage("Vui lòng điền đầy đủ các thông tin bắt buộc.");
      return;
    }

    if (fullName.trim().length > 100) {
      setErrorMessage("Họ và tên không được vượt quá 100 ký tự.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      setIsSubmitting(true);
      await register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const message = error.response?.data?.message || error.message || "Đăng ký thất bại. Vui lòng thử lại.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
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
                  Khởi đầu hành trình
                </span>
                <p className="text-xl font-bold font-japanese tracking-wide text-white" lang="ja">
                  千里の道も一歩から
                </p>
                <p className="text-xs text-white/90 leading-relaxed font-sans">
                  "Chặng đường ngàn dặm bắt đầu từ một bước chân." Hãy tạo tài khoản hôm nay để bắt đầu tích lũy kiến thức từng ngày.
                </p>
              </div>

              {/* Community & Free Pledge */}
              <div className="space-y-3 text-xs text-white/85">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/30 text-rose-200 flex items-center justify-center text-xs shrink-0 mt-0.5">🌸</span>
                  <span>Miễn phí 100% toàn bộ giáo trình N5 & N4</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/30 text-rose-200 flex items-center justify-center text-xs shrink-0 mt-0.5">🔥</span>
                  <span>Tự động tính chuỗi học & điểm kinh nghiệm XP</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/30 text-rose-200 flex items-center justify-center text-xs shrink-0 mt-0.5">⭐</span>
                  <span>Lưu bài học và ghi nhớ thẻ từ vựng yêu thích</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/15 text-[11px] text-white/60">
              Cộng đồng người Việt học tiếng Nhật chủ động
            </div>
          </div>

          {/* Right Auth Card (7 cols) */}
          <div className="lg:col-span-7 surface rounded-3xl p-7 sm:p-10 border border-[#E7E0D2] shadow-zen flex flex-col justify-center space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="lg:hidden w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 text-white flex items-center justify-center font-bold text-lg font-mincho shadow-md">
                  日
                </span>
                <span className="text-xs font-semibold text-slate-400">Tham gia ngay</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F1C18] tracking-tight">
                Tạo tài khoản học tập
              </h1>
              <p className="text-xs sm:text-sm text-[#766D5E] mt-1">
                Hoàn toàn miễn phí, chỉ mất chưa đầy 30 giây để bắt đầu.
              </p>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-shake">
                <span className="text-base" aria-hidden="true">⚠️</span>
                <span className="font-medium leading-relaxed">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="register-fullname">
                  Họ và tên của bạn
                </label>
                <input
                  type="text"
                  id="register-fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  required
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-600 transition-colors text-slate-900 text-sm font-medium bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="register-email">
                  Địa chỉ Email
                </label>
                <input
                  type="email"
                  id="register-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-600 transition-colors text-slate-900 text-sm font-medium bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700" htmlFor="register-password">
                      Mật khẩu
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                    >
                      {showPassword ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="register-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ít nhất 6 ký tự"
                    required
                    minLength={6}
                    className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-600 transition-colors text-slate-900 text-sm font-medium bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="register-confirm-password">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="register-confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    required
                    className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-600 transition-colors text-slate-900 text-sm font-medium bg-white"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="register-submit-btn"
                  className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-700 active:translate-y-0.5 transition-all shadow-[0_3px_0_0_#1D3050] active:shadow-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang khởi tạo tài khoản..." : "Đăng ký tài khoản miễn phí"}
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-[#F3EEE5] flex items-center justify-between text-xs">
              <span className="text-[#766D5E]">Đã có tài khoản?</span>
              <Link
                to="/login"
                id="to-login-link"
                className="font-bold text-indigo-700 hover:text-indigo-900"
              >
                Đăng nhập ngay &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
