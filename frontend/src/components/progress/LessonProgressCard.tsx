import React from "react";
import { Link } from "react-router-dom";
import { LessonProgressResponse } from "../../types/progress";

interface LessonProgressCardProps {
  lesson: LessonProgressResponse;
}

export default function LessonProgressCard({ lesson }: LessonProgressCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return {
          label: "Hoàn thành",
          containerClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
          barClass: "bg-emerald-500",
          dotClass: "bg-emerald-500",
        };
      case "IN_PROGRESS":
        return {
          label: "Đang học",
          containerClass: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
          barClass: "bg-indigo-600",
          dotClass: "bg-indigo-500",
        };
      default:
        return {
          label: "Chưa bắt đầu",
          containerClass: "bg-slate-100 text-slate-600 border-slate-200/80",
          barClass: "bg-slate-300",
          dotClass: "bg-slate-400",
        };
    }
  };

  const statusConfig = getStatusConfig(lesson.status);

  const formatDate = (dateStr: string | null): string | null => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const formattedLastAccessed = formatDate(lesson.lastAccessedAt);
  const formattedCompleted = formatDate(lesson.completedAt);

  return (
    <Link
      to={`/n5/lessons/${lesson.lessonId}`}
      className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all group flex flex-col justify-between"
    >
      <div>
        {/* Header: Lesson number badge & Status pill */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 font-extrabold text-base flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-xs">
            {lesson.lessonNumber < 10 ? `0${lesson.lessonNumber}` : lesson.lessonNumber}
          </span>
          <span
            className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig.containerClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotClass}`} />
            <span>{statusConfig.label}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-3 line-clamp-2">
          {lesson.lessonTitle}
        </h3>

        {/* Progress bar */}
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between items-center text-xs font-medium text-slate-500">
            <span>Tiến độ bài học</span>
            <span className="font-bold text-slate-800">{lesson.progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
            <div
              className={`h-full rounded-full transition-all duration-500 ${statusConfig.barClass}`}
              style={{ width: `${Math.min(100, Math.max(0, lesson.progressPercent))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer: timestamps & action link */}
      <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 space-y-1">
        {formattedCompleted ? (
          <div className="flex items-center justify-between text-emerald-600 font-medium">
            <span>Hoàn thành:</span>
            <span>{formattedCompleted}</span>
          </div>
        ) : formattedLastAccessed ? (
          <div className="flex items-center justify-between">
            <span>Học gần nhất:</span>
            <span className="text-slate-500">{formattedLastAccessed}</span>
          </div>
        ) : (
          <div className="flex items-center justify-between text-slate-400 italic">
            <span>Chưa có hoạt động học</span>
          </div>
        )}

        <div className="pt-2 flex items-center justify-end font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors">
          <span>Vào bài học →</span>
        </div>
      </div>
    </Link>
  );
}
