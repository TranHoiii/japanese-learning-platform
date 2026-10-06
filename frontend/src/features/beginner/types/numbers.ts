/**
 * Numbers & Counters Data Models
 * Covers basic numbers (0-99), hundreds, thousands, large numbers (man, oku),
 * counters (tsu, nin, hon, mai, hiki, dai, satsu, ko, kai, sai),
 * dates (1-31), months (1-12), weekdays, time (hour, min, sec),
 * sound change rules, and interactive calculator models.
 */

export type NumberCategoryId =
  | "basic"
  | "large"
  | "age"
  | "dates"
  | "months"
  | "weekdays"
  | "time"
  | "counters"
  | "sound-changes";

export interface NumberItem {
  id: string;
  value: number | string;
  kanji: string;
  hiragana: string;
  romaji: string;
  meaningVi: string;
  isIrregular?: boolean;
  irregularReasonVi?: string;
  audioUrl?: string | null;
  noteVi?: string;
}

export interface CounterGroup {
  id: string;
  counterKanji: string;
  counterHiragana: string;
  counterRomaji: string;
  nameVi: string;
  descriptionVi: string;
  targetObjectsVi: string;
  questionWord: {
    kanji: string;
    hiragana: string;
    romaji: string;
    meaningVi: string;
  };
  items: NumberItem[];
  tipsVi?: string[];
  soundChanges?: {
    numbers: number[];
    explanationVi: string;
  };
}

export interface DateItem {
  day: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  meaningVi: string;
  isSpecial: boolean;
  noteVi?: string;
}

export interface MonthItem {
  month: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  meaningVi: string;
  isSpecial?: boolean;
  noteVi?: string;
}

export interface WeekdayItem {
  id: string;
  dayNameVi: string;
  kanji: string;
  hiragana: string;
  romaji: string;
  elementVi: string;
  mnemonicVi: string;
}

export interface TimeItem {
  id: string;
  value: string;
  type: "hour" | "minute" | "second";
  kanji: string;
  hiragana: string;
  romaji: string;
  meaningVi: string;
  isSpecial?: boolean;
  noteVi?: string;
}

export interface SoundChangeSummaryRow {
  number: number;
  label: string;
  hon: string;
  hiki: string;
  fun: string;
  ko: string;
  satsu: string;
  kai: string;
}

export interface NumberCategoryMetadata {
  id: NumberCategoryId;
  titleVi: string;
  icon: string;
  descriptionVi: string;
  unitExample: string;
}

export interface NumberPracticeOption {
  id: string;
  label: string;
  sublabel?: string;
  isCorrect: boolean;
}

export interface NumberPracticeQuestion {
  id: string;
  category: "number" | "counter" | "date" | "time" | "sound-change";
  prompt: string;
  options: NumberPracticeOption[];
  explanationVi: string;
}
