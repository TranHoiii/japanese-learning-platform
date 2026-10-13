import { Link } from "react-router-dom";
import { SKILLS, type SkillKey } from "../../constants/skills";

interface SkillTabsProps {
  active: SkillKey;
  levelPrefix: "n4" | "n5";
  lessonId?: number | string | null;
  className?: string;
}

/** Tab bar that switches between the six skills of one lesson. */
export function SkillTabs({ active, levelPrefix, lessonId, className = "" }: SkillTabsProps) {
  return (
    <div
      className={`flex items-center gap-1.5 overflow-x-auto custom-scrollbar-x pb-1 ${className}`}
      role="tablist"
      aria-label="Kỹ năng trong bài"
    >
      {SKILLS.map((skill) => {
        const isActive = skill.key === active;
        const classes = `px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shrink-0 whitespace-nowrap transition-all ${
          isActive
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        }`;
        const content = (
          <>
            <span aria-hidden="true">{skill.emoji}</span>
            <span>{skill.label}</span>
          </>
        );
        return isActive ? (
          <span key={skill.key} role="tab" aria-selected="true" className={classes}>
            {content}
          </span>
        ) : (
          <Link
            key={skill.key}
            role="tab"
            aria-selected="false"
            to={`/${levelPrefix}/lessons/${lessonId}/${skill.path}`}
            className={classes}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
