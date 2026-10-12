import React from "react";
import { Link } from "react-router-dom";
import type { Lesson } from "../../types/vocabulary";
import type { LessonProgressResponse } from "../../types/progress";
import { getLessonDisplayInfo } from "../../constants/lessonTopics";
import { SKILLS, nextSkill, skillProgress } from "../../constants/skills";
import CircularProgress from "../ui/CircularProgress";
import { cn } from "../../utils/cn";

export interface LessonCardProps {
  lesson: Lesson;
  /** "n5" | "n4" — route prefix */
  levelPrefix: string;
  progress?: LessonProgressResponse;
  /** Percentage 0-100 (falls back to progress.progressPercent) */
  percent?: number;
  /** Marks the lesson the learner should do next */
  current?: boolean;
  className?: string;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  levelPrefix,
  progress,
  percent,
  current = false,
  className,
}) => {
  const prog = Math.round(percent ?? progress?.progressPercent ?? 0);
  const isComplete = prog >= 100;
  const inProgress = prog > 0 && prog < 100;
  const topic = getLessonDisplayInfo(lesson.lessonNumber, lesson.title, lesson.description);
  const base = `/${levelPrefix}/lessons/${lesson.id}`;
  const next = nextSkill(progress);
  const hasSkillData = !!progress;
  const lessonPad = lesson.lessonNumber < 10 ? `0${lesson.lessonNumber}` : `${lesson.lessonNumber}`;

  const cta = isComplete ? "Ôn lại bài" : inProgress ? `Học tiếp · ${next.label}` : "Bắt đầu học";

  return (
    <article
      className={cn(
        "surface surface-hover group relative flex flex-col overflow-hidden p-5",
        current && "ring-2 ring-indigo-400/70 border-indigo-300 shadow-glow-primary",
        isComplete && "bg-gradient-to-br from-white to-emerald-50/60",
        className,
      )}
    >
      {/* watermark number */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-2 -top-4 font-mincho font-extrabold text-[88px] leading-none text-slate-900/[0.04] group-hover:text-indigo-600/[0.07] transition-colors"
      >
        {lessonPad}
      </span>

      {current && (
        <span className="absolute top-0 left-5 -translate-y-px rounded-b-lg bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-sm">
          Tiếp theo
        </span>
      )}

      <div className={cn("relative flex items-start gap-3.5", current && "mt-3")}>
        <CircularProgress
          value={prog}
          size={52}
          strokeWidth={5}
          color={isComplete ? "text-emerald-500" : inProgress ? "text-indigo-600" : "text-slate-300"}
          trackColor="text-slate-100"
        >
          {isComplete ? (
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="font-display font-extrabold text-base text-slate-800 tabular-nums">
              {lesson.lessonNumber}
            </span>
          )}
        </CircularProgress>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase">Bài {lessonPad}</span>
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                isComplete
                  ? "bg-emerald-100 text-emerald-800"
                  : inProgress
                    ? "bg-amber-100 text-amber-800"
                    : "bg-slate-100 text-slate-500",
              )}
            >
              {isComplete ? "Hoàn thành" : inProgress ? `${prog}%` : "Chưa học"}
            </span>
          </div>
          <h3 className="font-display text-[17px] font-bold text-slate-900 leading-snug group-hover:text-indigo-700 transition-colors">
            {topic.title}
          </h3>
        </div>
      </div>

      <p className="relative mt-2.5 text-[13px] text-slate-500 line-clamp-2 leading-relaxed min-h-[2.6em]">
        {topic.desc}
      </p>

      {/* skills */}
      <div className="relative mt-4 grid grid-cols-3 gap-1.5">
        {SKILLS.map((skill) => {
          const p = skillProgress(progress, skill);
          const done = hasSkillData && (p ?? 0) >= 100;
          return (
            <Link
              key={skill.key}
              to={`${base}/${skill.path}`}
              title={p !== null ? `${skill.label}: ${Math.round(p)}%` : skill.label}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[11px] font-semibold transition-all hover:-translate-y-0.5",
                done ? skill.done : skill.tint,
              )}
            >
              <span className="text-base leading-none" aria-hidden="true">
                {done ? "✓" : skill.emoji}
              </span>
              <span className="leading-none">{skill.label}</span>
              {p !== null && !done && p > 0 && (
                <span className="absolute inset-x-2 bottom-1 h-[3px] rounded-full bg-black/10 overflow-hidden">
                  <span className={cn("block h-full rounded-full", skill.bar)} style={{ width: `${p}%` }} />
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <Link
        to={`${base}/${next.path}`}
        aria-label={`${cta} — Bài ${lesson.lessonNumber}`}
        className={cn(
          "relative mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all active:scale-[0.98]",
          isComplete
            ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-[0_3px_0_0_#1D3050] active:translate-y-[2px] active:shadow-none",
        )}
      >
        {cta}
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
};

export default LessonCard;
