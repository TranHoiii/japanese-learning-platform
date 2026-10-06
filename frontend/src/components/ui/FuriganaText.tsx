import React from "react";
import { cn } from "../../utils/cn";

export interface FuriganaTextProps {
  text: string;
  showFurigana?: boolean;
  className?: string;
  rubyClassName?: string;
}

/**
 * Component render Furigana chuẩn cho tiếng Nhật.
 * Hỗ trợ định dạng:
 * 1. Text kèm ngoặc vuông: "私[わたし]は田中[たなか]です。" -> hiển thị thẻ <ruby>私<rt>わたし</rt></ruby>
 * 2. Text HTML đã có sẵn thẻ ruby: <ruby>日<rt>にち</rt></ruby>
 * 3. Text thông thường không có Furigana.
 */
export const FuriganaText: React.FC<FuriganaTextProps> = ({
  text,
  showFurigana = true,
  className,
  rubyClassName,
}) => {
  if (!text) return null;

  // Nếu text đã chứa sẵn thẻ <ruby>
  if (text.includes("<ruby") || text.includes("<rt")) {
    return (
      <span
        className={cn(
          "font-japanese leading-loose",
          !showFurigana && "hide-furigana",
          className
        )}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  // Phân tích cú pháp dạng "漢字[かんじ]"
  // Regex khớp "chữ Hán[phiên âm]"
  const pattern = /([\u4E00-\u9FAF\u3400-\u4DBF]+)\[([^\s\]]+)\]/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const [fullMatch, kanji, furigana] = match;
    const matchIndex = match.index;

    // Đoạn text trước match
    if (matchIndex > lastIndex) {
      elements.push(
        <span key={`text-${lastIndex}`}>{text.substring(lastIndex, matchIndex)}</span>
      );
    }

    // Phần ruby
    elements.push(
      <ruby key={`ruby-${matchIndex}`} className={cn("px-0.5", rubyClassName)}>
        {kanji}
        <rt className={cn("text-[0.62em] font-medium text-slate-500", !showFurigana && "invisible opacity-0")}>
          {furigana}
        </rt>
      </ruby>
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  // Đoạn text còn lại sau cùng
  if (lastIndex < text.length) {
    elements.push(<span key={`text-end`}>{text.substring(lastIndex)}</span>);
  }

  return (
    <span className={cn("font-japanese leading-relaxed inline", className)}>
      {elements}
    </span>
  );
};

export default FuriganaText;
