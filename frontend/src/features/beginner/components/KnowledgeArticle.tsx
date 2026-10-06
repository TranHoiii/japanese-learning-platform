import React from "react";
import { cn } from "../../../utils/cn";
import { PronunciationTopic } from "../types/pronunciation";
import Badge from "../../../components/ui/Badge";
import PronunciationExample from "./PronunciationExample";
import MoraVisualizer from "./MoraVisualizer";
import PitchContourVisualizer from "./PitchContourVisualizer";
import PhoneticStepGuide from "./PhoneticStepGuide";
import PronunciationMiniPractice from "./PronunciationMiniPractice";

export interface KnowledgeArticleProps {
  topic: PronunciationTopic;
  className?: string;
}

export const KnowledgeArticle: React.FC<KnowledgeArticleProps> = ({
  topic,
  className,
}) => {
  return (
    <article className={cn("space-y-8 max-w-4xl mx-auto", className)}>
      {/* Header Overview Card */}
      <div className="rounded-[16px] bg-gradient-to-br from-[#F0F7FF] to-white border border-[#BBDDFF] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              {topic.icon}
            </span>
            <Badge variant="primary" size="md">
              {topic.category === "phonetics"
                ? "Ngữ âm cơ bản"
                : topic.category === "syllable-rules"
                  ? "Quy tắc âm tiết"
                  : "Cao độ & Ngữ điệu"}
            </Badge>
          </div>
          <span className="text-xs text-[#64748B] font-medium">
            ⏱️ Đọc khoảng {topic.estimatedReadMinutes} phút
          </span>
        </div>

        <p className="text-sm sm:text-base text-[#104673] leading-relaxed">
          {topic.overviewVi}
        </p>
      </div>

      {/* Visual Phonetics: Step Guide if present */}
      {topic.stepGuide && (
        <PhoneticStepGuide guide={topic.stepGuide} />
      )}

      {/* Visual Phonetics: Mora Comparisons if present */}
      {topic.moraComparisons && topic.moraComparisons.length > 0 && (
        <MoraVisualizer comparisons={topic.moraComparisons} />
      )}

      {/* Visual Phonetics: Pitch Contour if present */}
      {topic.pitchPatterns && topic.pitchPatterns.length > 0 && (
        <PitchContourVisualizer patterns={topic.pitchPatterns} />
      )}

      {/* Sections and Rules */}
      {topic.sections.map((section) => (
        <section
          key={section.id}
          className="rounded-[14px] bg-white border border-[#E2E8F0] p-5 sm:p-6 space-y-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
        >
          <div className="space-y-1 pb-3 border-b border-[#F1F5F9]">
            <h3 className="text-lg font-bold text-[#0F172A]">
              {section.titleVi}
            </h3>
            {section.contentVi && (
              <p className="text-sm text-[#475569] leading-relaxed whitespace-pre-line">
                {section.contentVi}
              </p>
            )}
          </div>

          {/* Table if present */}
          {section.table && (
            <div className="overflow-x-auto rounded-[10px] border border-[#E2E8F0]">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#334155]">
                    {section.table.headers.map((h, idx) => (
                      <th key={idx} className="p-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] text-[#475569]">
                  {section.table.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#F8FAFC]/80 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Rules and Examples */}
          {section.rules && section.rules.length > 0 && (
            <div className="space-y-5">
              {section.rules.map((rule) => (
                <div
                  key={rule.id}
                  className="rounded-[12px] bg-[#F8FAFC]/60 border border-[#E2E8F0] p-4 space-y-3"
                >
                  <h4 className="text-sm sm:text-base font-bold text-[#12558F]">
                    {rule.titleVi}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#475569]">
                    {rule.explanationVi}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {rule.examples.map((ex) => (
                      <PronunciationExample key={ex.id} example={ex} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Common Mistakes callout */}
      {topic.commonMistakesVi && topic.commonMistakesVi.length > 0 && (
        <div className="rounded-[14px] bg-[#FEF2F2] border border-[#EF4444]/20 p-5 space-y-2">
          <div className="flex items-center gap-2 text-[#B91C1C] font-bold text-sm sm:text-base">
            <span aria-hidden="true">⚠️</span>
            <h4>Lỗi người Việt thường gặp</h4>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-[#991B1B]">
            {topic.commonMistakesVi.map((mistake, idx) => (
              <li key={idx} className="leading-relaxed">
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Practice Tips callout */}
      {topic.practiceTipsVi && topic.practiceTipsVi.length > 0 && (
        <div className="rounded-[14px] bg-[#F0FDF4] border border-[#22C55E]/20 p-5 space-y-2">
          <div className="flex items-center gap-2 text-[#15803D] font-bold text-sm sm:text-base">
            <span aria-hidden="true">💡</span>
            <h4>Mẹo luyện tập bản xứ</h4>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-[#166534]">
            {topic.practiceTipsVi.map((tip, idx) => (
              <li key={idx} className="leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* In-Memory Mini Practice */}
      {topic.practiceQuestions && topic.practiceQuestions.length > 0 && (
        <PronunciationMiniPractice
          questions={topic.practiceQuestions}
          topicTitleVi={topic.titleVi}
        />
      )}
    </article>
  );
};

export default KnowledgeArticle;

