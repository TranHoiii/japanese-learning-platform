import React from 'react';
import { ParsedTableData, SubItemPart } from '../../utils/questionParser';
import { BlankResult } from '../../types/exercise';

interface TableQuestionProps {
  tableData: ParsedTableData;
  values: Record<string, string>;
  blankResults?: BlankResult[];
  disabled?: boolean;
  onChangeValue: (blankId: string, value: string) => void;
}

export const TableQuestion: React.FC<TableQuestionProps> = ({
  tableData,
  values,
  blankResults,
  disabled = false,
  onChangeValue,
}) => {
  const getResult = (blankId: string): BlankResult | undefined => {
    if (!blankResults) return undefined;
    return blankResults.find((r) => r.blankId.toLowerCase() === blankId.toLowerCase());
  };

  const renderCellPart = (part: SubItemPart) => {
    if (part.type === 'text') {
      return (
        <span key={Math.random()} className="text-slate-800 font-medium">
          {part.text}
        </span>
      );
    }

    if (part.type === 'blank') {
      const val = values[part.blankId] || '';
      const bResult = getResult(part.blankId);

      let borderStyle = 'border-slate-300 bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20';

      if (bResult) {
        if (bResult.isCorrect) {
          borderStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500';
        } else {
          borderStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400';
        }
      }

      return (
        <span key={part.blankId} className="inline-flex flex-col items-center">
          <input
            type="text"
            disabled={disabled}
            value={val}
            onChange={(e) => onChangeValue(part.blankId, e.target.value)}
            placeholder="……"
            className={`w-24 sm:w-28 px-2 py-1 text-sm sm:text-base text-center rounded-lg border shadow-2xs ${borderStyle}`}
          />
          {bResult && !bResult.isCorrect && bResult.correctAnswer && (
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded mt-1">
              Đ/A: {bResult.correctAnswer}
            </span>
          )}
        </span>
      );
    }

    return null;
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs bg-white p-2 sm:p-4">
      <table className="min-w-full divide-y divide-slate-200 text-sm sm:text-base">
        <tbody className="divide-y divide-slate-100">
          {tableData.rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
              {row.cells.map((cellParts, cIdx) => (
                <td key={cIdx} className="px-3 sm:px-5 py-3 text-center align-middle whitespace-nowrap">
                  <div className="inline-flex items-center justify-center gap-1.5">
                    {cellParts.map((part) => renderCellPart(part))}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
