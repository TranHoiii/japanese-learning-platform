/**
 * Japanese Kana (Hiragana & Katakana) Data Models
 * Designed for beginner resource and practice module.
 */

export type KanaType = "seion" | "dakuten" | "handakuten" | "yoon" | "extended";

export type KanaRow =
  | "a"
  | "ka"
  | "sa"
  | "ta"
  | "na"
  | "ha"
  | "ma"
  | "ya"
  | "ra"
  | "wa"
  | "n"
  | "special";

export type KanaColumn = "a" | "i" | "u" | "e" | "o" | "none";

export type KanaSystem = "hiragana" | "katakana";

export interface KanaExample {
  word: string;
  reading: string;
  romaji: string;
  meaningVi: string;
  audioUrl?: string | null;
}

export interface KanaCharacter {
  id: string;
  character: string;
  romaji: string;
  system: KanaSystem;
  type: KanaType;
  row: KanaRow;
  column: KanaColumn;
  strokeCount?: number;
  strokeAssetUrl?: string | null;
  equivalentKana?: string; // Tương đương Hiragana ↔ Katakana
  mnemonic?: string;
  mnemonicVi?: string;
  audioUrl?: string | null;
  examples?: KanaExample[];
}

export interface KanaGroup {
  id: string;
  system: KanaSystem;
  title: string;
  titleVi: string;
  descriptionVi: string;
  type: KanaType;
  characters: KanaCharacter[];
}

export interface ConfusedKanaPair {
  id: string;
  system: KanaSystem;
  charA: string;
  romajiA: string;
  charB: string;
  romajiB: string;
  titleVi: string;
  distinctionVi: string;
  strokeDirectionVi: string;
  memoryTipVi: string;
  exampleA: KanaExample;
  exampleB: KanaExample;
}

export interface KanaFilterOptions {
  type: KanaType | "all";
  row: KanaRow | "all";
  searchQuery?: string;
}
