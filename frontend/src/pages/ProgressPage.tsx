import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { progressApi } from "../services/progressApi";
import Navbar from "../components/Navbar";
import ProgressSummaryCard from "../components/progress/ProgressSummaryCard";
import LessonProgressCard from "../components/progress/LessonProgressCard";

export default function ProgressPage() {
  const location = useLocation();
  const { currentUser, loading: authLoading } = useAuth();

  // 1. Auth check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-600 font-medium">Đang kiểm tra thông tin đăng nhập...</p>
        </main>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Data fetching (only runs when currentUser is authenticated)
  const {
    data: summary,
    isLoading: isLoadingSummary,
    error: errorSummary,
    refetch: refetchSummary,
  } = useQuery({
    queryKey: ["progress-summary"],
    queryFn: progressApi.getProgressSummary,
    enabled: !!currentUser,
  });

  const {
    data: lessonProgresses,
    isLoading: isLoadingLessons,
    error: errorLessons,
    refetch: refetchLessons,
  } = useQuery({
    queryKey: ["progress-lessons"],
    queryFn: progressApi.getLessonProgresses,
    enabled: !!currentUser,
  });

  const {
    data: contentProgresses,
    isLoading: isLoadingContent,
  } = useQuery({
    queryKey: ["progress-content"],
    queryFn: () => progressApi.getContentProgresses(),
    enabled: !!currentUser,
  });

  const isLoading = isLoadingSummary || isLoadingLessons;
  const hasError = errorSummary || errorLessons;

  const handleRetry = () => {
    refetchSummary();
    refetchLessons();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-4">
              Dashboard cá nhân
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Tiến Độ Học Tập Của {currentUser.fullName || currentUser.email}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Theo dõi chi tiết mức độ hoàn thành bài học, từ vựng, ngữ pháp và bài tập tiếng Nhật. Hãy duy trì thói quen học tập đều đặn mỗi ngày!
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang tải dữ liệu tiến độ học tập...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && hasError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-1">Không thể tải dữ liệu tiến độ</h3>
            <p className="text-sm text-rose-600 mb-6">
              Đã xảy ra lỗi khi kết nối với máy chủ. Vui lòng thử lại.
            </p>
            <button
              onClick={handleRetry}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl shadow-xs transition-colors"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Main Content when loaded successfully */}
        {!isLoading && !hasError && (
          <>
            {/* 1. Summary Section */}
            {summary && <ProgressSummaryCard summary={summary} />}

            {/* 2. Lesson Progress Section */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Tiến độ từng bài học
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Danh sách các bài học bạn đã tham gia hoặc đang hoàn thành
                  </p>
                </div>
                <Link
                  to="/n5/lessons"
                  className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center space-x-1"
                >
                  <span>Xem tất cả bài học</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Empty state */}
              {(!lessonProgresses || lessonProgresses.length === 0) ? (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center shadow-xs">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 text-3xl flex items-center justify-center mx-auto mb-4">
                    📚
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    Bạn chưa bắt đầu học bài nào.
                  </h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                    Hãy bắt đầu ngay với Bài 1 N5 để tích lũy từ vựng, ngữ pháp và theo dõi tiến độ của bạn tại đây!
                  </p>
                  <Link
                    to="/n5/lessons"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-600/20 hover:bg-indigo-500 transition-all"
                  >
                    <span>Khám phá bài học N5</span>
                    <span>→</span>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {lessonProgresses.map((lesson) => (
                    <LessonProgressCard key={lesson.lessonId} lesson={lesson} />
                  ))}
                </div>
              )}
            </div>

            {/* 3. Content Progress Section (Optional summary of items learned) */}
            {contentProgresses && contentProgresses.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      Hoạt động nội dung gần đây
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Ghi nhận {contentProgresses.length} mục nội dung đã tương tác
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                  {(["VOCABULARY", "GRAMMAR", "KANJI", "LISTENING", "READING", "EXERCISE"] as const).map(
                    (type) => {
                      const count = contentProgresses.filter((c) => c.contentType === type).length;
                      const typeLabel = {
                        VOCABULARY: "Từ vựng",
                        GRAMMAR: "Ngữ pháp",
                        KANJI: "Kanji",
                        LISTENING: "Bài nghe",
                        READING: "Bài đọc",
                        EXERCISE: "Bài tập",
                      }[type];

                      return (
                        <div
                          key={type}
                          className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col items-center text-center"
                        >
                          <span className="text-xs font-semibold text-slate-600">{typeLabel}</span>
                          <span className="text-lg font-black text-indigo-700 mt-1">{count}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
