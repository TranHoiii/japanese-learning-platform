import React from "react";
import { ArticleSection } from "../types";

interface ArticleSectionViewProps {
  section: ArticleSection;
  className?: string;
}

export const ArticleSectionView: React.FC<ArticleSectionViewProps> = ({
  section,
  className = "",
}) => {
  return (
    <section className={`space-y-3 ${className}`}>
      <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
        <span>{section.title}</span>
      </h2>

      {/* Text paragraphs */}
      {section.content && (
        <div className="space-y-2 text-sm sm:text-base text-[#334155] leading-relaxed">
          {section.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {/* Structured Table */}
      {section.type === "table" && section.tableData && (
        <div className="w-full overflow-x-auto rounded-xl border border-[#E2E8F0] shadow-2xs my-4">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
              <tr>
                {section.tableData.headers.map((header, idx) => (
                  <th
                    key={idx}
                    scope="col"
                    className="px-3.5 sm:px-4 py-3 font-semibold whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] bg-white text-[#1E293B]">
              {section.tableData.rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-3.5 sm:px-4 py-3 align-top font-medium"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
