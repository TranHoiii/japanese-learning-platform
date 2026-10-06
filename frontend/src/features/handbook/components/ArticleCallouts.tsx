import React from "react";

interface NotesCalloutProps {
  notes: string[];
  className?: string;
}

export const NotesCallout: React.FC<NotesCalloutProps> = ({ notes, className = "" }) => {
  if (!notes || notes.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Mẹo và ghi chú quan trọng"
      className={`p-4 sm:p-5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2.5 ${className}`}
    >
      <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#166534]">
        <span>💡</span>
        <span>Mẹo & Điểm cốt lõi cần nhớ</span>
      </div>
      <ul className="space-y-1.5 text-xs sm:text-sm text-[#14532D] leading-relaxed list-disc list-inside">
        {notes.map((note, idx) => (
          <li key={idx} className="marker:text-[#16A34A]">
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface WarningsCalloutProps {
  warnings: string[];
  className?: string;
}

export const WarningsCallout: React.FC<WarningsCalloutProps> = ({
  warnings,
  className = "",
}) => {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Lưu ý và bẫy thường gặp"
      className={`p-4 sm:p-5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2.5 ${className}`}
    >
      <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#92400E]">
        <span>⚠️</span>
        <span>Lưu ý & Bẫy thường gặp</span>
      </div>
      <ul className="space-y-1.5 text-xs sm:text-sm text-[#78350F] leading-relaxed list-disc list-inside">
        {warnings.map((warn, idx) => (
          <li key={idx} className="marker:text-[#D97706]">
            <span>{warn}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
