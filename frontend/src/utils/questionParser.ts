import { ExerciseQuestion } from '../types/exercise';

export type SubItemPart =
  | { type: 'text'; text: string }
  | {
      type: 'blank';
      blankId: string;
      placeholder?: string;
      originalToken: string;
    }
  | {
      type: 'choice';
      blankId: string;
      choices: string[];
    };

export interface SubQuestionItem {
  id: string; // "1", "2", "3", "a", "b", etc.
  label?: string;
  rawText: string;
  parts: SubItemPart[];
  dialogueLines?: {
    speaker?: string;
    parts: SubItemPart[];
  }[];
}

export interface ParsedTableData {
  headers?: string[];
  rows: {
    id: string;
    cells: SubItemPart[][];
  }[];
}

export interface ParsedQuestion {
  questionType: 'MULTIPLE_CHOICE' | 'WORD_BANK' | 'TABLE' | 'INLINE_BLANK' | 'FREE_TEXT';
  instruction: string;
  example?: string;
  wordBank?: string[];
  tableData?: ParsedTableData;
  subQuestions: SubQuestionItem[];
  allBlankIds: string[];
}

// Regex to detect interactive tokens (choices or blanks)
const TOKEN_REGEX =
  /(\{([^\}]+,[^\}]+)\}|\[([^\],]+(?:\/[^\]]+)+)\]|(?:\((?:\s*＿＿+|\s*\_+)\s*\))|(?:（(?:\s*＿＿+|\s*\_+)\s*）)|(?:\[\s*(?:＿＿+|\_+|\s{2,})\s*\])|(?:\(\s*\))|(?:（\s*）)|(?:＿＿+|\_+))/g;

export function parseQuestion(question: ExerciseQuestion): ParsedQuestion {
  const hasOptions = Boolean(question.options && question.options.length > 0);

  // If question has predefined database options, it's a MULTIPLE_CHOICE question
  if (hasOptions) {
    const lines = question.questionText.split('\n').map((l) => l.trim()).filter(Boolean);
    const instruction = lines[0] || question.questionText;
    const example = lines.find((l) => l.startsWith('例:') || l.startsWith('例：'));

    return {
      questionType: 'MULTIPLE_CHOICE',
      instruction,
      example,
      subQuestions: [],
      allBlankIds: [],
    };
  }

  const rawLines = question.questionText.split('\n').map((l) => l.trim()).filter(Boolean);
  let instruction = '';
  let example = '';
  let wordBank: string[] | undefined;
  const contentLines: string[] = [];

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];

    // Check for Word Bank: line matching [ a, b, c ] or 【 a, b, c 】
    const wbMatch = line.match(/^\[\s*([^\]]+,[^\]]+)\s*\]$/) || line.match(/^【\s*([^】]+,[^】]+)\s*】$/);
    if (wbMatch) {
      wordBank = wbMatch[1]
        .split(/[,、，]/)
        .map((w) => w.trim())
        .filter(Boolean);
      continue;
    }

    // Check for instruction: typically first line like "1. ..."
    if (i === 0 && (/^\d+\./.test(line) || /^Bài\s*\d+/i.test(line))) {
      instruction = line;
      continue;
    }

    // Check for examples
    if (line.startsWith('例:') || line.startsWith('例：') || line.startsWith('例1:') || line.startsWith('例2:')) {
      example = example ? `${example}\n${line}` : line;
      continue;
    }

    contentLines.push(line);
  }

  if (!instruction && rawLines.length > 0) {
    instruction = rawLines[0];
  }

  // Check if content is a Table (contains '|')
  const tableLines = contentLines.filter((l) => l.includes('|'));
  if (tableLines.length >= 2 || (tableLines.length === 1 && contentLines.length === 1)) {
    const parsedTable = parseTableQuestion(tableLines);
    if (parsedTable) {
      return {
        questionType: 'TABLE',
        instruction,
        example,
        wordBank,
        tableData: parsedTable,
        subQuestions: [],
        allBlankIds: extractBlankIdsFromTable(parsedTable),
      };
    }
  }

  // Parse Sub-Questions
  const subQuestions: SubQuestionItem[] = [];
  const allBlankIds: string[] = [];

  // Group content lines by sub-question numbers like "1)", "2)", "a.", "b."
  let currentSubId = '';
  let currentSubLines: string[] = [];

  const flushCurrentSub = () => {
    if (!currentSubId && currentSubLines.length === 0) return;
    const subId = currentSubId || String(subQuestions.length + 1);
    const rawText = currentSubLines.join('\n');
    const { parts, dialogueLines, blankIds } = parseSubQuestionBody(subId, currentSubLines);
    subQuestions.push({
      id: subId,
      rawText,
      parts,
      dialogueLines,
    });
    allBlankIds.push(...blankIds);
    currentSubLines = [];
  };

  for (const line of contentLines) {
    const subMatch = line.match(/^(\d+|[a-zA-Z])[\)\.：:]\s*(.*)$/);
    if (subMatch) {
      flushCurrentSub();
      currentSubId = subMatch[1];
      currentSubLines.push(subMatch[2]);
    } else {
      currentSubLines.push(line);
    }
  }
  flushCurrentSub();

  // If no numbered sub-items found, treat the whole content as item 1
  if (subQuestions.length === 0 && contentLines.length > 0) {
    const { parts, dialogueLines, blankIds } = parseSubQuestionBody('1', contentLines);
    subQuestions.push({
      id: '1',
      rawText: contentLines.join('\n'),
      parts,
      dialogueLines,
    });
    allBlankIds.push(...blankIds);
  }

  // Determine question type
  let questionType: ParsedQuestion['questionType'] = 'INLINE_BLANK';
  if (wordBank && wordBank.length > 0) {
    questionType = 'WORD_BANK';
  } else if (allBlankIds.length === 0) {
    questionType = 'FREE_TEXT';
  }

  return {
    questionType,
    instruction,
    example,
    wordBank,
    subQuestions,
    allBlankIds,
  };
}

function parseSubQuestionBody(
  subId: string,
  lines: string[]
): {
  parts: SubItemPart[];
  dialogueLines?: { speaker?: string; parts: SubItemPart[] }[];
  blankIds: string[];
} {
  const blankIds: string[] = [];
  let blankCounter = 0;

  // Check if dialogue format (lines starting with "A:", "B:", "ミラー:", "松本:", etc.)
  const isDialogue = lines.some((l) => /^[A-Z\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]{1,5}[:：]/.test(l));

  if (isDialogue) {
    const dialogueLines: { speaker?: string; parts: SubItemPart[] }[] = [];
    const allParts: SubItemPart[] = [];

    for (const line of lines) {
      const match = line.match(/^([A-Z\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]{1,5})[:：]\s*(.*)$/);
      const speaker = match ? match[1] : undefined;
      const textToParse = match ? match[2] : line;

      const lineParts = parseLineParts(subId, textToParse, () => {
        const id = `${subId}_${blankCounter++}`;
        blankIds.push(id);
        return id;
      });

      dialogueLines.push({ speaker, parts: lineParts });
      allParts.push(...lineParts);
    }

    return { parts: allParts, dialogueLines, blankIds };
  }

  // Standard line parsing
  const parts: SubItemPart[] = [];
  for (let i = 0; i < lines.length; i++) {
    const lineParts = parseLineParts(subId, lines[i], () => {
      const id = `${subId}_${blankCounter++}`;
      blankIds.push(id);
      return id;
    });
    parts.push(...lineParts);
    if (i < lines.length - 1) {
      parts.push({ type: 'text', text: '\n' });
    }
  }

  return { parts, blankIds };
}

function parseLineParts(
  _subId: string,
  text: string,
  nextBlankId: () => string
): SubItemPart[] {
  const parts: SubItemPart[] = [];
  let lastIndex = 0;

  TOKEN_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN_REGEX.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = matchStart + match[0].length;

    // Text before match
    if (matchStart > lastIndex) {
      parts.push({ type: 'text', text: text.slice(lastIndex, matchStart) });
    }

    const matchedToken = match[0];

    // In-line Choice { a, b, c }
    if (match[2]) {
      const choices = match[2].split(/[,、，]/).map((c) => c.trim()).filter(Boolean);
      parts.push({
        type: 'choice',
        blankId: nextBlankId(),
        choices,
      });
    }
    // In-line Choice [ a / b / c ]
    else if (match[3]) {
      const choices = match[3].split(/[\/／]/).map((c) => c.trim()).filter(Boolean);
      parts.push({
        type: 'choice',
        blankId: nextBlankId(),
        choices,
      });
    }
    // Blank
    else {
      parts.push({
        type: 'blank',
        blankId: nextBlankId(),
        originalToken: matchedToken,
        placeholder: '……',
      });
    }

    lastIndex = matchEnd;
  }

  // Trailing text
  if (lastIndex < text.length) {
    parts.push({ type: 'text', text: text.slice(lastIndex) });
  }

  return parts;
}

function parseTableQuestion(lines: string[]): ParsedTableData | null {
  const rows: ParsedTableData['rows'] = [];
  let blankCounter = 0;

  for (let rIdx = 0; rIdx < lines.length; rIdx++) {
    const line = lines[rIdx];
    const cellsRaw = line.split('|').map((c) => c.trim());
    const cells: SubItemPart[][] = [];

    for (let cIdx = 0; cIdx < cellsRaw.length; cIdx++) {
      const cellText = cellsRaw[cIdx];
      // Check if cell starts with a numbered label like "1) ＿＿＿＿"
      const numMatch = cellText.match(/^(\d+|[a-zA-Z])[\)\.：:]\s*(.*)$/);
      const subId = numMatch ? numMatch[1] : `r${rIdx + 1}_c${cIdx + 1}`;
      const textToParse = numMatch ? numMatch[2] : cellText;

      const cellParts = parseLineParts(subId, textToParse, () => {
        // If subId is numeric, use subId as the blank key
        return numMatch ? subId : `tbl_${blankCounter++}`;
      });

      if (numMatch) {
        cells.push([{ type: 'text', text: `${numMatch[1]}) ` }, ...cellParts]);
      } else {
        cells.push(cellParts);
      }
    }

    rows.push({
      id: `row_${rIdx + 1}`,
      cells,
    });
  }

  return { rows };
}

function extractBlankIdsFromTable(table: ParsedTableData): string[] {
  const ids: string[] = [];
  for (const row of table.rows) {
    for (const cell of row.cells) {
      for (const part of cell) {
        if (part.type === 'blank' || part.type === 'choice') {
          ids.push(part.blankId);
        }
      }
    }
  }
  return ids;
}
