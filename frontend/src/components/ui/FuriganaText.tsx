import React, { useMemo } from "react";
import { cn } from "../../utils/cn";
import { useFurigana, FuriganaMode } from "../../contexts/FuriganaContext";
import KanjiHoverWord from "./KanjiHoverWord";

export interface FuriganaTextProps {
  text: string;
  showFurigana?: boolean;
  mode?: FuriganaMode;
  className?: string;
  rubyClassName?: string;
}

// Regex to detect any CJK Kanji character
const KANJI_REGEX = /[\u4E00-\u9FAF\u3400-\u4DBF]/;
const BRACKET_PATTERN = /([\u4E00-\u9FAF\u3400-\u4DBF]+)\[([^\s\]]+)\]/g;

/**
 * Component render Furigana chuẩn cho tiếng Nhật với khả năng tương tác thông minh:
 * 1. Text kèm ngoặc vuông: "私[わたし]は田中[たなか]です。"
 * 2. Text tiếng Nhật thuần: "私は医者です。" (tự động nhận diện từ vựng Kanji và hiển thị Hiragana trên đầu khi rê chuột)
 * 3. Hỗ trợ 3 chế độ: Rê chuột (Hover - mặc định), Luôn hiện (Always), Ẩn (Off).
 */
export const FuriganaText: React.FC<FuriganaTextProps> = ({
  text,
  showFurigana = true,
  mode: propMode,
  className,
  rubyClassName,
}) => {
  const { mode: contextMode, lookupWord, sortedTerms } = useFurigana();

  // If showFurigana is explicitly false, override to "off"
  const activeMode: FuriganaMode = !showFurigana
    ? "off"
    : propMode || contextMode;

  const elements = useMemo(() => {
    if (!text) return null;

    // Nếu text đã chứa sẵn thẻ <ruby> HTML
    if (text.includes("<ruby") || text.includes("<rt")) {
      return (
        <span
          className={cn(
            "font-japanese leading-loose",
            activeMode === "off" && "hide-furigana",
            className
          )}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }

    // Helper: phân tách một đoạn text chưa có ngoặc vuông thành plain text và KanjiHoverWord
    const segmentPlainText = (rawSegment: string, segmentKeyPrefix: string) => {
      const segElements: React.ReactNode[] = [];
      let i = 0;
      let nonKanjiBuffer = "";

      const flushBuffer = () => {
        if (nonKanjiBuffer) {
          segElements.push(
            <span key={`${segmentKeyPrefix}-txt-${i}`}>{nonKanjiBuffer}</span>
          );
          nonKanjiBuffer = "";
        }
      };

      while (i < rawSegment.length) {
        // Kiểm tra xem vị trí hiện tại có phải là chữ Kanji không
        if (KANJI_REGEX.test(rawSegment[i])) {
          // Thử tìm từ dài nhất trong từ điển bắt đầu từ vị trí i
          let matchedTerm: string | null = null;
          for (const term of sortedTerms) {
            if (rawSegment.startsWith(term, i)) {
              matchedTerm = term;
              break;
            }
          }

          if (matchedTerm) {
            flushBuffer();
            const entry = lookupWord(matchedTerm);
            segElements.push(
              <KanjiHoverWord
                key={`${segmentKeyPrefix}-kw-${i}`}
                word={matchedTerm}
                reading={entry?.reading}
                hanViet={entry?.hanViet}
                meaning={entry?.meaning}
                mode={activeMode}
                rubyClassName={rubyClassName}
              />
            );
            i += matchedTerm.length;
            continue;
          }

          // Nếu không khớp từ ghép nào, lấy chữ Kanji đơn lẻ
          const singleChar = rawSegment[i];
          flushBuffer();
          const singleEntry = lookupWord(singleChar);
          segElements.push(
            <KanjiHoverWord
              key={`${segmentKeyPrefix}-kchar-${i}`}
              word={singleChar}
              reading={singleEntry?.reading}
              hanViet={singleEntry?.hanViet}
              meaning={singleEntry?.meaning}
              mode={activeMode}
              rubyClassName={rubyClassName}
            />
          );
          i += 1;
        } else {
          // Ký tự không phải Kanji (Hiragana, Katakana, khoảng trắng, số, dấu câu, v.v.)
          nonKanjiBuffer += rawSegment[i];
          i += 1;
        }
      }

      flushBuffer();
      return segElements;
    };

    // 1. Phân tích cú pháp nếu có ngoặc vuông: "漢字[かんじ]"
    const resultElements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // Reset regex index
    BRACKET_PATTERN.lastIndex = 0;

    while ((match = BRACKET_PATTERN.exec(text)) !== null) {
      const [fullMatch, kanji, furigana] = match;
      const matchIndex = match.index;

      // Đoạn text trước match -> phân tích kanji trong đoạn này
      if (matchIndex > lastIndex) {
        const preText = text.substring(lastIndex, matchIndex);
        resultElements.push(
          ...segmentPlainText(preText, `seg-${lastIndex}`)
        );
      }

      // Phần khớp có ngoặc vuông -> tra cứu bổ sung thông tin nghĩa & Hán Việt
      const entry = lookupWord(kanji);
      resultElements.push(
        <KanjiHoverWord
          key={`bracket-${matchIndex}`}
          word={kanji}
          reading={furigana}
          hanViet={entry?.hanViet}
          meaning={entry?.meaning}
          mode={activeMode}
          rubyClassName={rubyClassName}
        />
      );

      lastIndex = matchIndex + fullMatch.length;
    }

    // Đoạn text còn lại sau cùng
    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      resultElements.push(
        ...segmentPlainText(remainingText, `seg-end-${lastIndex}`)
      );
    }

    return resultElements;
  }, [text, activeMode, lookupWord, sortedTerms, className, rubyClassName]);

  if (!text) return null;

  return (
    <span className={cn("font-japanese leading-relaxed inline", className)}>
      {elements}
    </span>
  );
};

export default FuriganaText;
