/**
 * Pronunciation & Phonetics Data Models
 * Covers the 10 core Japanese pronunciation topics for Vietnamese learners.
 */

export type PronunciationTopicSlug =
  | "dakuten-handakuten"
  | "yoon"
  | "chouon"
  | "sokuon"
  | "hatsuon"
  | "tsu"
  | "ga-row"
  | "devoicing"
  | "pitch-accent"
  | "intonation";

export type PronunciationCategory = "phonetics" | "syllable-rules" | "prosody";

export interface PronunciationExampleItem {
  id: string;
  japanese: string;
  reading: string;
  romaji: string;
  meaningVi: string;
  highlightKana?: string;
  noteVi?: string;
  audioUrl?: string | null;
}

export interface PronunciationRule {
  id: string;
  titleVi: string;
  explanationVi: string;
  examples: PronunciationExampleItem[];
  tipsVi?: string[];
}

export interface PronunciationTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface PronunciationSection {
  id: string;
  titleVi: string;
  contentVi: string;
  rules?: PronunciationRule[];
  table?: PronunciationTable;
}

export interface MoraBlock {
  text: string;
  subtext?: string;
  type?: "normal" | "yoon" | "chouon" | "sokuon" | "hatsuon";
  isHoldingMora?: boolean;
}

export interface MoraComparisonItem {
  id: string;
  word: string;
  kanji?: string;
  reading: string;
  romaji: string;
  meaningVi: string;
  moraCount: number;
  moraBlocks: MoraBlock[];
  highlightNoteVi?: string;
}

export interface PitchPatternItem {
  id: string;
  word: string;
  kanji?: string;
  reading: string;
  romaji: string;
  patternType: "atamadaka" | "heiban" | "nakadaka" | "odaka";
  patternNameVi: string;
  pitchContour: ("high" | "low")[];
  moras: string[];
  dropIndex?: number;
  meaningVi: string;
  particleExample?: {
    particle: string;
    particlePitch: "high" | "low";
    fullReading: string;
    explanationVi: string;
  };
}

export interface PhoneticStepGuideItem {
  stepNumber: number;
  titleVi: string;
  descriptionVi: string;
  tipVi?: string;
}

export interface TopicPracticeOption {
  id: string;
  label: string;
  sublabel?: string;
  isCorrect: boolean;
}

export interface TopicPracticeQuestion {
  id: string;
  prompt: string;
  options: TopicPracticeOption[];
  explanationVi: string;
}

export interface PronunciationTopic {
  id: string;
  slug: PronunciationTopicSlug;
  title: string;
  titleVi: string;
  shortSummaryVi: string;
  category: PronunciationCategory;
  icon: string;
  importance: "essential" | "advanced";
  estimatedReadMinutes: number;
  overviewVi: string;
  sections: PronunciationSection[];
  commonMistakesVi?: string[];
  practiceTipsVi?: string[];
  moraComparisons?: MoraComparisonItem[];
  pitchPatterns?: PitchPatternItem[];
  stepGuide?: {
    titleVi: string;
    descriptionVi?: string;
    steps: PhoneticStepGuideItem[];
  };
  practiceQuestions?: TopicPracticeQuestion[];
}
