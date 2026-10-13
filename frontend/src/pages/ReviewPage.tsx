import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { reviewApi } from "../services/reviewApi";
import {
  ReviewItemResponse,
  ReviewResult,
  CreateReviewItemRequest,
} from "../types/review";
import { gamification, XP_REWARDS } from "../lib/gamification";
import { useToast } from "../components/ui/Toast";
import Navbar from "../components/Navbar";
import ReviewItemCard from "../components/review/ReviewItemCard";
import AddReviewItemModal from "../components/review/AddReviewItemModal";
import { cn } from "../utils/cn";

const TYPE_META: Record<string, { label: string; emoji: string; path: (id: number) => string }> = {
  VOCABULARY: { label: "Từ vựng", emoji: "📚", path: (id) => `/vocabulary/${id}` },
  GRAMMAR: { label: "Ngữ pháp", emoji: "⛩️", path: (id) => `/grammar/${id}` },
  KANJI: { label: "Kanji", emoji: "🈁", path: (id) => `/kanjis/${id}` },
  LISTENING: { label: "Bài nghe", emoji: "🎧", path: (id) => `/listenings/${id}` },
  READING: { label: "Bài đọc", emoji: "📖", path: (id) => `/readings/${id}` },
  EXERCISE: { label: "Bài tập", emoji: "✏️", path: (id) => `/exercises/${id}` },
};

const RATINGS: { result: ReviewResult; label: string; hint: string; key: string; xp: number; btn: string; edge: string }[] = [
  { result: "AGAIN", label: "Lại", hint: "+1 ngày", key: "1", xp: XP_REWARDS.reviewAgain, btn: "bg-rose-500 text-white hover:bg-rose-600", edge: "[--press-edge:#8A2043]" },
  { result: "HARD", label: "Khó", hint: "+2 ngày", key: "2", xp: XP_REWARDS.reviewHard, btn: "bg-amber-400 text-amber-950 hover:bg-amber-500", edge: "[--press-edge:#A25C0A]" },
  { result: "GOOD", label: "Tốt", hint: "+4 ngày", key: "3", xp: XP_REWARDS.reviewGood, btn: "bg-emerald-600 text-white hover:bg-emerald-700", edge: "[--press-edge:#374E23]" },
  { result: "EASY", label: "Dễ", hint: "+7 ngày", key: "4", xp: XP_REWARDS.reviewEasy, btn: "bg-indigo-600 text-white hover:bg-indigo-700", edge: "[--press-edge:#1D3050]" },
];

export default function ReviewPage() {
  const location = useLocation();
  const { currentUser, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<"ALL" | "DUE">("DUE");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Study session
  const [queue, setQueue] = useState<ReviewItemResponse[] | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [sessionResults, setSessionResults] = useState<ReviewResult[]>([]);
  const [sessionXp, setSessionXp] = useState(0);
  const [saving, setSaving] = useState(false);

  const {
    data: allItems = [],
    isLoading: isLoadingAll,
    error: errorAll,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ["review-items"],
    queryFn: () => reviewApi.getReviewItems(),
    enabled: !!currentUser,
  });

  const {
    data: dueItems = [],
    isLoading: isLoadingDue,
    error: errorDue,
    refetch: refetchDue,
  } = useQuery({
    queryKey: ["review-items-due"],
    queryFn: () => reviewApi.getDueReviewItems(),
    enabled: !!currentUser,
  });

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["review-items"] });
    queryClient.invalidateQueries({ queryKey: ["review-items-due"] });
  }, [queryClient]);

  const reviewMutation = useMutation({
    mutationFn: ({ id, result }: { id: number; result: ReviewResult }) =>
      reviewApi.updateReviewItem(id, { result }),
    onSuccess: invalidate,
    onError: () => toast.error("Có lỗi xảy ra khi cập nhật kết quả ôn tập"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => reviewApi.deleteReviewItem(id),
    onSuccess: () => {
      invalidate();
      toast.success("Đã xóa mục ôn tập");
    },
    onError: () => toast.error("Có lỗi xảy ra khi xóa mục ôn tập"),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateReviewItemRequest) => reviewApi.createReviewItem(data),
    onSuccess: () => {
      invalidate();
      toast.success("Đã thêm nội dung vào danh sách ôn tập");
    },
  });

  /* ───────── session logic ───────── */
  const current = queue ? queue[qIndex] : null;
  const sessionDone = !!queue && qIndex >= queue.length;

  const startSession = (items: ReviewItemResponse[]) => {
    if (items.length === 0) return;
    setQueue(items);
    setQIndex(0);
    setRevealed(false);
    setSessionResults([]);
    setSessionXp(0);
  };

  const rate = useCallback(
    async (result: ReviewResult) => {
      if (!current || saving) return;
      setSaving(true);
      const meta = RATINGS.find((r) => r.result === result)!;
      try {
        await reviewMutation.mutateAsync({ id: current.id, result });
        gamification.award(meta.xp);
        const nextIndex = qIndex + 1;
        setSessionXp((x) => x + meta.xp);
        setSessionResults((r) => [...r, result]);
        setRevealed(false);
        setQIndex(nextIndex);
        if (queue && nextIndex >= queue.length) {
          gamification.award(XP_REWARDS.sessionBonus, "Hoàn thành phiên ôn");
          setSessionXp((x) => x + XP_REWARDS.sessionBonus);
          gamification.celebrate("Hoàn thành phiên ôn tập!", "Trí nhớ của bạn vừa được củng cố thêm một bước.");
        }
      } catch {
        /* error toast handled by mutation */
      } finally {
        setSaving(false);
      }
    },
    [current, saving, reviewMutation, qIndex, queue],
  );

  useEffect(() => {
    if (!queue || sessionDone) return;
    const onKey = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) return;
      if (e.code === "Space") {
        e.preventDefault();
        setRevealed((v) => !v);
      } else if (revealed) {
        const r = RATINGS.find((x) => x.key === e.key);
        if (r) rate(r.result);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [queue, sessionDone, revealed, rate]);

  /* ───────── list filtering ───────── */
  const filteredItems = useMemo(() => {
    const source = activeTab === "DUE" ? dueItems : allItems;
    const q = searchQuery.toLowerCase().trim();
    return source.filter((item) => {
      if (selectedStatus !== "ALL" && item.status !== selectedStatus) return false;
      if (selectedType !== "ALL" && item.contentType !== selectedType) return false;
      if (!q) return true;
      return (
        item.title?.toLowerCase().includes(q) ||
        item.contentId.toString().includes(q) ||
        item.contentType.toLowerCase().includes(q)
      );
    });
  }, [activeTab, dueItems, allItems, searchQuery, selectedStatus, selectedType]);

  /* ───────── guards (after all hooks) ───────── */
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-600 font-medium">Đang kiểm tra thông tin đăng nhập…</p>
        </main>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isLoading = isLoadingAll || isLoadingDue;
  const hasError = errorAll || errorDue;

  /* ───────────────────────── Session view ───────────────────────── */
  if (queue) {
    const total = queue.length;
    const counts = {
      AGAIN: sessionResults.filter((r) => r === "AGAIN").length,
      HARD: sessionResults.filter((r) => r === "HARD").length,
      GOOD: sessionResults.filter((r) => r === "GOOD").length,
      EASY: sessionResults.filter((r) => r === "EASY").length,
    };
    const remembered = counts.GOOD + counts.EASY;

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-28 lg:pb-12">
          {sessionDone ? (
            <div className="surface overflow-hidden text-center animate-pop">
              <div className="hero-ink pattern-seigaiha px-6 pt-10 pb-12">
                <p className="text-5xl mb-3" aria-hidden="true">{remembered / total >= 0.7 ? "🎉" : "💪"}</p>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold">Xong phiên ôn tập!</h1>
                <p className="text-white/80 text-sm mt-1.5">Bạn đã ôn {total} mục. Hệ thống sẽ nhắc lại đúng lúc cần.</p>
              </div>
              <div className="px-6 py-8 space-y-6">
                <div className="grid grid-cols-4 gap-2.5 max-w-md mx-auto">
                  {RATINGS.map((r) => (
                    <div key={r.result} className="rounded-2xl bg-slate-50 border border-slate-200 p-3">
                      <p className="font-display text-2xl font-extrabold text-slate-900 tabular-nums">{counts[r.result]}</p>
                      <p className="text-[11px] font-bold text-slate-500">{r.label}</p>
                    </div>
                  ))}
                </div>
                <span className="inline-flex rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-bold text-amber-800">⚡ +{sessionXp} XP</span>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  {dueItems.length > 0 && (
                    <button
                      type="button"
                      onClick={() => startSession(dueItems)}
                      className="btn-press rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-extrabold text-white [--press-edge:#1D3050] cursor-pointer"
                    >
                      Ôn tiếp {dueItems.length} mục còn lại
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setQueue(null)}
                    className="rounded-2xl bg-slate-100 hover:bg-slate-200 px-6 py-3.5 text-sm font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    Về danh sách
                  </button>
                </div>
              </div>
            </div>
          ) : (
            current && (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQueue(null)}
                    aria-label="Thoát phiên ôn"
                    className="w-10 h-10 shrink-0 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex-1 h-3.5 rounded-full bg-slate-200/80 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={qIndex}>
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500" style={{ width: `${Math.max((qIndex / total) * 100, qIndex > 0 ? 4 : 0)}%` }} />
                  </div>
                  <span className="text-sm font-extrabold text-slate-700 tabular-nums">{qIndex + 1}/{total}</span>
                </div>

                {(() => {
                  const meta = TYPE_META[current.contentType];
                  return (
                    <div
                      key={current.id}
                      className="surface p-6 sm:p-10 text-center min-h-[320px] flex flex-col items-center justify-center animate-fade-up relative overflow-hidden"
                    >
                      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-400 via-rose-300 to-amber-300" />
                      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                        <span className="rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 px-3 py-1 text-xs font-bold">
                          {meta?.emoji} {meta?.label ?? current.contentType}
                        </span>
                        {current.lessonNumber ? (
                          <span className="rounded-full bg-slate-100 text-slate-600 px-3 py-1 text-xs font-semibold">Bài {current.lessonNumber}</span>
                        ) : null}
                      </div>

                      <h2 className="font-mincho text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight break-words max-w-full">
                        {current.title || `${meta?.label ?? ""} #${current.contentId}`}
                      </h2>

                      <p className="mt-5 text-sm text-slate-500 max-w-md leading-relaxed">
                        {revealed
                          ? "Bạn nhớ nội dung này đến đâu? Mở lại nội dung nếu cần kiểm tra."
                          : "Hãy tự nhớ lại ý nghĩa / cách dùng trước khi tiếp tục."}
                      </p>

                      {revealed && meta && (
                        <Link
                          to={meta.path(current.contentId)}
                          target="_blank"
                          className="mt-4 text-sm font-bold text-indigo-700 hover:text-indigo-900 underline-offset-4 hover:underline"
                        >
                          Mở nội dung để kiểm tra ↗
                        </Link>
                      )}
                    </div>
                  );
                })()}

                {!revealed ? (
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="btn-press w-full h-14 rounded-2xl bg-indigo-600 text-white font-extrabold text-base [--press-edge:#1D3050] cursor-pointer"
                  >
                    Tôi đã nhớ lại — chọn mức độ
                  </button>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 animate-fade-up">
                    {RATINGS.map((r) => (
                      <button
                        key={r.result}
                        type="button"
                        disabled={saving}
                        onClick={() => rate(r.result)}
                        className={cn("btn-press rounded-2xl py-3 px-2 flex flex-col items-center gap-0.5 cursor-pointer disabled:opacity-60", r.btn, r.edge)}
                      >
                        <span className="font-extrabold text-base leading-tight">{r.label}</span>
                        <span className="text-[11px] opacity-80 font-semibold">{r.hint}</span>
                        <kbd className="hidden sm:block text-[10px] font-mono font-bold opacity-70">Phím {r.key} · +{r.xp} XP</kbd>
                      </button>
                    ))}
                  </div>
                )}
                <p className="text-center text-xs text-slate-400 hidden sm:block">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px]">Space</kbd> để hiện đánh giá · phím 1–4 để chọn
                </p>
              </div>
            )
          )}
        </main>
      </div>
    );
  }

  /* ───────────────────────── Overview ───────────────────────── */
  const filtersActive = selectedStatus !== "ALL" || selectedType !== "ALL" || !!searchQuery;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-12 space-y-8">
        {/* Hero */}
        <section className="hero-ink pattern-seigaiha relative overflow-hidden rounded-[28px] p-6 sm:p-10 shadow-zen animate-fade-up">
          <span aria-hidden="true" className="pointer-events-none select-none absolute -right-2 -bottom-14 font-mincho font-extrabold text-[240px] leading-none text-white/[0.07]">復</span>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="inline-flex rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold text-rose-200">🔄 Ôn tập ngắt quãng</span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                {dueItems.length > 0 ? `${dueItems.length} mục đang chờ bạn ôn` : "Bạn đã ôn xong hôm nay!"}
              </h1>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {dueItems.length > 0
                  ? "Ôn đúng lúc sắp quên là cách nhớ lâu nhất. Một phiên chỉ mất vài phút."
                  : "Quay lại sau để nhận lịch ôn tiếp theo, hoặc học thêm bài mới để thêm nội dung vào danh sách."}
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  disabled={dueItems.length === 0}
                  onClick={() => startSession(dueItems)}
                  className="btn-press inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-[15px] font-extrabold text-indigo-900 [--press-edge:#B9C7DD] hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  ▶ Bắt đầu ôn ngay
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 px-5 py-3.5 text-sm font-bold backdrop-blur transition-colors cursor-pointer"
                >
                  ➕ Thêm mục ôn
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 shrink-0">
              <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur px-6 py-4 text-center">
                <p className="font-display text-4xl font-extrabold text-amber-300 tabular-nums">{dueItems.length}</p>
                <p className="text-xs text-white/75 font-semibold mt-1">Đến hạn</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur px-6 py-4 text-center">
                <p className="font-display text-4xl font-extrabold tabular-nums">{allItems.length}</p>
                <p className="text-xs text-white/75 font-semibold mt-1">Tổng mục</p>
              </div>
            </div>
          </div>
        </section>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-busy="true">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="surface h-64 skeleton-shimmer" />)}
          </div>
        )}

        {!isLoading && hasError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-md mx-auto" role="alert">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-1">Không thể tải danh sách ôn tập</h3>
            <p className="text-sm text-rose-600 mb-6">Đã xảy ra lỗi khi kết nối với máy chủ. Vui lòng thử lại.</p>
            <button
              onClick={() => { refetchAll(); refetchDue(); }}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        )}

        {!isLoading && !hasError && (
          <>
            <div className="surface p-4 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit" role="tablist">
                  <button
                    type="button" role="tab" aria-selected={activeTab === "DUE"}
                    onClick={() => setActiveTab("DUE")}
                    className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer", activeTab === "DUE" ? "bg-white text-amber-800 shadow-sm" : "text-slate-500 hover:text-slate-900")}
                  >
                    Đến hạn
                    <span className={cn("px-1.5 rounded-full text-xs tabular-nums", activeTab === "DUE" ? "bg-amber-100" : "bg-slate-200")}>{dueItems.length}</span>
                  </button>
                  <button
                    type="button" role="tab" aria-selected={activeTab === "ALL"}
                    onClick={() => setActiveTab("ALL")}
                    className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer", activeTab === "ALL" ? "bg-white text-indigo-800 shadow-sm" : "text-slate-500 hover:text-slate-900")}
                  >
                    Tất cả ({allItems.length})
                  </button>
                </div>

                <div className="relative flex-1 md:max-w-xs">
                  <input
                    type="search"
                    placeholder="Tìm theo tên, ID…"
                    aria-label="Tìm mục ôn tập"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-4 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedType("ALL")}
                  className={cn("px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer", selectedType === "ALL" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400")}
                >
                  Tất cả loại
                </button>
                {Object.entries(TYPE_META).map(([key, m]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedType(selectedType === key ? "ALL" : key)}
                    className={cn("px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer", selectedType === key ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300")}
                  >
                    {m.emoji} {m.label}
                  </button>
                ))}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  aria-label="Lọc theo trạng thái"
                  className="ml-auto h-9 bg-slate-50 border border-slate-200 rounded-lg px-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/25"
                >
                  <option value="ALL">Mọi trạng thái</option>
                  <option value="PENDING">Chờ ôn</option>
                  <option value="COMPLETED">Hoàn thành</option>
                  <option value="SKIPPED">Bỏ qua</option>
                </select>
                {filtersActive && (
                  <button
                    type="button"
                    onClick={() => { setSelectedStatus("ALL"); setSelectedType("ALL"); setSearchQuery(""); }}
                    className="text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer"
                  >
                    Xóa bộ lọc
                  </button>
                )}
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="surface p-12 text-center">
                <div className="text-5xl mb-4">{allItems.length === 0 ? "🌱" : "✅"}</div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                  {allItems.length === 0 ? "Chưa có nội dung ôn tập" : activeTab === "DUE" && !filtersActive ? "Không còn mục nào đến hạn" : "Không có mục phù hợp bộ lọc"}
                </h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                  {allItems.length === 0
                    ? "Học từ vựng bằng flashcard hoặc thêm nội dung thủ công — hệ thống sẽ tự lên lịch ôn cho bạn."
                    : "Tuyệt vời! Bạn có thể xem toàn bộ nội dung ở tab “Tất cả”."}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button type="button" onClick={() => setIsAddModalOpen(true)} className="btn-press px-5 py-3 bg-indigo-600 text-white text-sm font-extrabold rounded-2xl [--press-edge:#1D3050] cursor-pointer">
                    Thêm nội dung ôn tập
                  </button>
                  <Link to="/n5/lessons" className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-2xl transition-colors">
                    Khám phá bài học
                  </Link>
                </div>
              </div>
            ) : (
              <div className="stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredItems.map((item) => (
                  <ReviewItemCard
                    key={item.id}
                    item={item}
                    onReview={async (id, result) => {
                      await reviewMutation.mutateAsync({ id, result });
                      const meta = RATINGS.find((r) => r.result === result);
                      if (meta) gamification.award(meta.xp);
                      toast.success("Đã lưu kết quả ôn tập");
                    }}
                    onDelete={async (id) => { await deleteMutation.mutateAsync(id); }}
                    isUpdating={reviewMutation.isPending || deleteMutation.isPending}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <AddReviewItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={async (data) => { await createMutation.mutateAsync(data); }}
      />
    </div>
  );
}
