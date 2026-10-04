import React from "react";
import { ProgressSummaryResponse } from "../../types/progress";

interface ProgressSummaryCardProps {
  summary: ProgressSummaryResponse;
}

export default function ProgressSummaryCard({ summary }: ProgressSummaryCardProps) {
  const notStarted = Math.max(
    0,
    summary.totalLessons - summary.completedLessons - summary.inProgressLessons
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-3">
            Tổng quan tiến độ học tập
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tiến độ tổng thể
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi hành trình hoàn thành các bài học và kỹ năng tiếng Nhật của bạn
          </p>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent">
            {summary.overallProgress}%
          </span>
          <span className="text-xs sm:text-sm font-semibold text-slate-400">hoàn thành</span>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="mt-6 mb-8">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-2">
          <span>Tiến độ chương trình học</span>
          <span className="font-bold text-indigo-600">
            {summary.completedLessons} / {summary.totalLessons} bài hoàn thành
          </span>
        </div>
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-rose-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, summary.overallProgress))}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500">Tổng số bài học</span>
          <div className="flex items-baseline space-x-1 mt-2">
            <span className="text-2xl font-extrabold text-slate-900">{summary.totalLessons}</span>
            <span className="text-xs text-slate-400">bài</span>
          </div>
        </div>

        <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-800">Đã hoàn thành</span>
          </div>
          <div className="flex items-baseline space-x-1 mt-2">
            <span className="text-2xl font-extrabold text-emerald-700">
              {summary.completedLessons}
            </span>
            <span className="text-xs text-emerald-600/80">bài</span>
          </div>
        </div>

        <div className="bg-indigo-50/60 rounded-2xl p-4 border border-indigo-100 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-xs font-semibold text-indigo-800">Đang học</span>
          </div>
          <div className="flex items-baseline space-x-1 mt-2">
            <span className="text-2xl font-extrabold text-indigo-700">
              {summary.inProgressLessons}
            </span>
            <span className="text-xs text-indigo-600/80">bài</span>
          </div>
        </div>

        <div className="bg-slate-100/60 rounded-2xl p-4 border border-slate-200/60 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="text-xs font-semibold text-slate-600">Chưa bắt đầu</span>
          </div>
          <div className="flex items-baseline space-x-1 mt-2">
            <span className="text-2xl font-extrabold text-slate-700">{notStarted}</span>
            <span className="text-xs text-slate-500">bài</span>
          </div>
        </div>
      </div>
    </div>
  );
}
