import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { vocabularyApi } from "../services/vocabularyApi";
import { progressApi } from "../services/progressApi";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import CircularProgress from "../components/ui/CircularProgress";
import { getLessonDisplayInfo } from "../constants/lessonTopics";

export default function LessonsPage() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const isN4 = location.pathname.startsWith("/n4") || location.pathname.includes("n4");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "IN_PROGRESS" | "COMPLETED">("ALL");

  const { data: levels, isLoading: isLoadingLevels, error: errorLevels } = useQuery({
    queryKey: ["levels"],
    queryFn: vocabularyApi.getLevels,
  });

  const targetLevel = levels?.find((l) => l.code === (isN4 ? "N4" : "N5")) || (isN4 ? levels?.find((l) => l.code === "N4") : levels?.[0]);

  const {
    data: lessons,
    isLoading: isLoadingLessons,
    error: errorLessons,
  } = useQuery({
    queryKey: ["lessons", targetLevel?.id],
    queryFn: () => vocabularyApi.getLessonsByLevel(targetLevel!.id),
    enabled: !!targetLevel,
  });

  // Fetch progress if authenticated
  const { data: lessonProgresses = [] } = useQuery({
    queryKey: ["progress-lessons"],
    queryFn: progressApi.getLessonProgresses,
    enabled: !!currentUser,
  });

  const progressMap = useMemo(() => {
    const map = new Map<number, number>();
    lessonProgresses.forEach((p) => {
      map.set(p.lessonId, p.progressPercent || 0);
    });
    return map;
  }, [lessonProgresses]);

  const filteredLessons = useMemo(() => {
    if (!lessons) return [];
    return lessons.filter((l) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.lessonNumber.toString().includes(q) ||
        (l.description && l.description.toLowerCase().includes(q));

      const prog = progressMap.get(l.id) || 0;
      const isComplete = prog >= 100;
      const isInProgress = prog > 0 && prog < 100;

      if (filterStatus === "COMPLETED") return matchQuery && isComplete;
      if (filterStatus === "IN_PROGRESS") return matchQuery && isInProgress;
      return matchQuery;
    });
  }, [lessons, searchQuery, filterStatus, progressMap]);

  const isLoading = isLoadingLevels || isLoadingLessons;
  const error = errorLevels || errorLessons;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-zen relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
              isN4
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
            }`}>
              {isN4 ? "📗 JLPT N4 • 25 Bài học Minnano Nihongo" : "🌸 JLPT N5 • 25 Bài học Minnano Nihongo"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {isN4 ? "Lộ Trình Từ Vựng 25 Bài Học N4" : "Lộ Trình Toàn Diện 25 Bài Học N5"}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isN4
                ? "Tổng hợp đầy đủ 1138 từ vựng tiếng Nhật trình độ N4 chuẩn giáo trình Minnano Nihongo (Bài 26 đến Bài 50)."
                : "Tổng hợp đầy đủ các bài học chuẩn Minnano Nihongo. Mỗi bài bao gồm Từ vựng, Ngữ pháp mẫu câu, Hán tự Kanji, Luyện nghe Audio bản xứ, Luyện đọc hiểu và Bài tập củng cố."}
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bài học (Bài 1, chào hỏi, địa điểm)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 self-end sm:self-auto">
            <button
              onClick={() => setFilterStatus("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === "ALL"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tất cả (25)
            </button>
            <button
              onClick={() => setFilterStatus("IN_PROGRESS")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === "IN_PROGRESS"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Đang học
            </button>
            <button
              onClick={() => setFilterStatus("COMPLETED")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === "COMPLETED"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Hoàn thành
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang tải danh sách 25 bài học {isN4 ? "N4" : "N5"}...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-2xl text-center max-w-lg mx-auto">
            <div className="text-3xl mb-2">⚠️</div>
            <h3 className="font-bold text-lg mb-1">Không thể tải dữ liệu bài học</h3>
            <p className="text-sm text-rose-600">
              Vui lòng kiểm tra kết nối với Backend API Spring Boot.
            </p>
          </div>
        )}

        {/* Lessons Grid */}
        {!isLoading && !error && filteredLessons.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => {
              const prog = progressMap.get(lesson.id) || 0;
              const isComplete = prog >= 100;
              const inProgress = prog > 0 && prog < 100;
              const lessonPad = lesson.lessonNumber < 10 ? `0${lesson.lessonNumber}` : lesson.lessonNumber;
              const topicInfo = getLessonDisplayInfo(lesson.lessonNumber, lesson.title, lesson.description);

              return (
                <div
                  key={lesson.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-lg hover:border-indigo-400 transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Header Card */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <CircularProgress
                          value={prog}
                          size={46}
                          strokeWidth={4}
                          color={isComplete ? "text-emerald-500" : inProgress ? "text-indigo-600" : "text-slate-300"}
                        />
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            BÀI {lessonPad}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                              isComplete
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : inProgress
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-slate-100 text-slate-500 border border-slate-200"
                            }`}
                          >
                            {isComplete ? "Hoàn thành" : inProgress ? `${prog}% hoàn thành` : "Chưa học"}
                          </span>
                        </div>
                      </div>

                      <span className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 font-black text-sm flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-2xs">
                        {lesson.lessonNumber}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                      {topicInfo.title}
                    </h2>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                      {topicInfo.desc}
                    </p>
                  </div>

                  {/* Skills Pills */}
                  <div>
                    {isN4 ? (
                      <div className="pt-3 border-t border-slate-100">
                        <Link
                          to={`/n4/lessons/${lesson.id}/vocabulary`}
                          className="w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 text-center text-xs font-bold transition-all shadow-2xs flex items-center justify-center space-x-1.5"
                        >
                          <span>📚</span>
                          <span>Học Từ vựng Bài {lesson.lessonNumber}</span>
                          <span>&rarr;</span>
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-1.5 text-center text-xs font-medium">
                          <Link
                            to={`/n5/lessons/${lesson.id}/vocabulary`}
                            className="py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                          >
                            📚 Từ vựng
                          </Link>
                          <Link
                            to={`/n5/lessons/${lesson.id}/grammar`}
                            className="py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                          >
                            ⛩️ Ngữ pháp
                          </Link>
                          <Link
                            to={`/n5/lessons/${lesson.id}/kanji`}
                            className="py-1.5 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                          >
                            🈁 Kanji
                          </Link>
                          <Link
                            to={`/n5/lessons/${lesson.id}/listening`}
                            className="py-1.5 rounded-lg bg-slate-50 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                          >
                            🎧 Nghe
                          </Link>
                          <Link
                            to={`/n5/lessons/${lesson.id}/reading`}
                            className="py-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                          >
                            📖 Đọc
                          </Link>
                          <Link
                            to={`/n5/lessons/${lesson.id}/exercise`}
                            className="py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                          >
                            ✏️ Bài tập
                          </Link>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-400">25 bài Minnano</span>
                          <Link
                            to={`/n5/lessons/${lesson.id}/vocabulary`}
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center space-x-1"
                          >
                            <span>Học ngay</span>
                            <span>&rarr;</span>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
