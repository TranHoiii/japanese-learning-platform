import { HandbookCategoryMeta, HandbookCategoryType } from "../types";

export const HANDBOOK_CATEGORIES: HandbookCategoryMeta[] = [
  {
    id: "grammar",
    name: "Ngữ pháp cốt lõi",
    japaneseName: "文法ハンドブック",
    description: "Cẩm nang đối chiếu trợ từ, liên từ, cấu trúc câu và các điểm ngữ pháp dễ gây nhầm lẫn.",
    icon: "📖",
    badge: "Trợ từ & Cấu trúc",
    color: "#2563EB",
  },
  {
    id: "vocabulary",
    name: "Từ vựng chuyên đề",
    japaneseName: "語彙・表現",
    description: "Phó từ mức độ, từ tượng thanh tượng hình, từ ghép và quy tắc phân loại từ vựng thiết thực.",
    icon: "📚",
    badge: "Phó từ & Biểu đạt",
    color: "#059669",
  },
  {
    id: "kanji",
    name: "Hán tự & Bộ thủ",
    japaneseName: "漢字・部首の法則",
    description: "Quy tắc chuyển âm Hán - Việt sang Âm On, mẹo ghi nhớ bộ thủ và bẫy phát âm thường gặp.",
    icon: "⛩️",
    badge: "Âm On/Kun & Bộ thủ",
    color: "#D97706",
  },
  {
    id: "conversation",
    name: "Hội thoại thực chiến",
    japaneseName: "実践会話・敬語",
    description: "Nghệ thuật từ chối khéo léo, cẩm nang kính ngữ sơ cấp và mẫu câu giao tiếp tự nhiên chuẩn người bản xứ.",
    icon: "💬",
    badge: "Giao tiếp & Kính ngữ",
    color: "#7C3AED",
  },
  {
    id: "notes",
    name: "Ghi chú & Kinh nghiệm",
    japaneseName: "学習ノート・落とし穴",
    description: "Bẫy dịch thuật người Việt hay mắc phải, phương pháp học theo cụm (collocation) và cẩm nang tự học.",
    icon: "📝",
    badge: "Bẫy dịch & Mẹo học",
    color: "#DC2626",
  },
];

export const VALID_CATEGORY_IDS: HandbookCategoryType[] = [
  "grammar",
  "vocabulary",
  "kanji",
  "conversation",
  "notes",
];

export function isValidCategory(category: string | undefined): category is HandbookCategoryType {
  if (!category) return false;
  return VALID_CATEGORY_IDS.includes(category as HandbookCategoryType);
}

export function getCategoryMeta(category: HandbookCategoryType): HandbookCategoryMeta | undefined {
  return HANDBOOK_CATEGORIES.find((c) => c.id === category);
}
