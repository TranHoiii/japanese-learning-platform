import {
  NumberCategoryMetadata,
  NumberItem,
  CounterGroup,
  DateItem,
  MonthItem,
  WeekdayItem,
  TimeItem,
  SoundChangeSummaryRow,
  NumberPracticeQuestion,
} from "../types/numbers";

export const NUMBER_CATEGORIES: NumberCategoryMetadata[] = [
  {
    id: "basic",
    titleVi: "Số cơ bản (0 - 99)",
    icon: "🔢",
    descriptionVi: "Quy tắc đọc chữ số 0 đến 10 và cách ghép hàng chục đến 99.",
    unitExample: "一, 二, 三...",
  },
  {
    id: "large",
    titleVi: "Hàng Trăm, Nghìn & Vạn (100 - 100 Triệu)",
    icon: "🏛️",
    descriptionVi: "Hệ thống đếm cơ số 10.000 (Vạn - 万), 100.000.000 (Ức - 億) và các biến âm 300, 600, 800, 3000, 8000.",
    unitExample: "百, 千, 万, 億",
  },
  {
    id: "age",
    titleVi: "Đếm Tuổi (〜歳)",
    icon: "🎂",
    descriptionVi: "Quy tắc đọc tuổi, biến âm 1 tuổi, 8 tuổi, 10 tuổi và mốc trưởng thành 20 tuổi (Hatachi).",
    unitExample: "いっさい, はたち...",
  },
  {
    id: "dates",
    titleVi: "Ngày trong tháng (1 - 31)",
    icon: "📅",
    descriptionVi: "Bộ từ thuần Nhật mùng 1 đến mùng 10 và các ngày đặc biệt 14, 20, 24.",
    unitExample: "ついたち, ふつか...",
  },
  {
    id: "months",
    titleVi: "Tháng trong năm (1 - 12)",
    icon: "🗓️",
    descriptionVi: "12 tháng với 3 tháng đặc biệt bắt buộc phát âm đúng: Tháng 4 (Shigatsu), Tháng 7 (Shichigatsu), Tháng 9 (Kugatsu).",
    unitExample: "しがつ, しちがつ, くがつ",
  },
  {
    id: "weekdays",
    titleVi: "Thứ trong tuần (月〜日)",
    icon: "⭐",
    descriptionVi: "7 thứ đặt theo Ngũ hành và Nhật Nguyệt: Mặt trời, Mặt trăng, Lửa, Nước, Cây, Vàng, Đất.",
    unitExample: "げつ, か, すい, もく, きん, ど, にち",
  },
  {
    id: "time",
    titleVi: "Giờ & Phút (〜時 / 〜分)",
    icon: "⏰",
    descriptionVi: "Đọc giờ (lưu ý 4 giờ Yoji, 7 giờ Shichiji, 9 giờ Kuji) và ma trận biến âm số phút (fun / pun).",
    unitExample: "よじ, しちじ, くじ, いっぷん...",
  },
  {
    id: "counters",
    titleVi: "Lượng từ thông dụng (Counters)",
    icon: "📋",
    descriptionVi: "Đồ vật chung (〜つ), người (〜人), cây/chai (〜本), tờ/chiếc (〜枚), con (〜匹), xe (〜台), sách (〜冊), tầng (〜階).",
    unitExample: "つ, 人, 本, 枚, 匹, 台, 冊, 個, 回, 階",
  },
  {
    id: "sound-changes",
    titleVi: "Bảng tổng hợp biến âm",
    icon: "⚡",
    descriptionVi: "Ma trận biến âm phản xạ nhanh cho số 1, 3, 6, 8, 10 với các lượng từ quan trọng.",
    unitExample: "1, 3, 6, 8, 10",
  },
];

// ==========================================
// 1. BASIC NUMBERS (0 - 10)
// ==========================================
export const BASIC_NUMBERS: NumberItem[] = [
  { id: "num-0", value: 0, kanji: "零", hiragana: "ゼロ / れい", romaji: "zero / rei", meaningVi: "Số 0 (trong số điện thoại thường đọc là 'zero' hoặc 'maru')", audioUrl: null },
  { id: "num-1", value: 1, kanji: "一", hiragana: "いち", romaji: "ichi", meaningVi: "Số 1", audioUrl: null },
  { id: "num-2", value: 2, kanji: "二", hiragana: "に", romaji: "ni", meaningVi: "Số 2", audioUrl: null },
  { id: "num-3", value: 3, kanji: "三", hiragana: "さん", romaji: "san", meaningVi: "Số 3", audioUrl: null },
  { id: "num-4", value: 4, kanji: "四", hiragana: "よん / し", romaji: "yon / shi", meaningVi: "Số 4 (thường đọc yon để tránh âm shi nghĩa là tử)", isIrregular: true, audioUrl: null },
  { id: "num-5", value: 5, kanji: "五", hiragana: "ご", romaji: "go", meaningVi: "Số 5", audioUrl: null },
  { id: "num-6", value: 6, kanji: "六", hiragana: "ろく", romaji: "roku", meaningVi: "Số 6", audioUrl: null },
  { id: "num-7", value: 7, kanji: "七", hiragana: "なな / しち", romaji: "nana / shichi", meaningVi: "Số 7 (nana phổ biến hơn trong đếm số lượng)", isIrregular: true, audioUrl: null },
  { id: "num-8", value: 8, kanji: "八", hiragana: "はち", romaji: "hachi", meaningVi: "Số 8", audioUrl: null },
  { id: "num-9", value: 9, kanji: "九", hiragana: "きゅう / く", romaji: "kyuu / ku", meaningVi: "Số 9 (kyuu phổ biến hơn, ku thường dùng trong 9 giờ, tháng 9)", isIrregular: true, audioUrl: null },
  { id: "num-10", value: 10, kanji: "十", hiragana: "じゅう", romaji: "juu", meaningVi: "Số 10", audioUrl: null },
];

// ==========================================
// 2. HUNDREDS (100 - 900)
// ==========================================
export const HUNDREDS_LIST: NumberItem[] = [
  { id: "h-100", value: 100, kanji: "百", hiragana: "ひゃく", romaji: "hyaku", meaningVi: "100 (không nói ichi-hyaku)", audioUrl: null },
  { id: "h-200", value: 200, kanji: "二百", hiragana: "にひゃく", romaji: "nihyaku", meaningVi: "200", audioUrl: null },
  { id: "h-300", value: 300, kanji: "三百", hiragana: "さんびゃく", romaji: "sanbyaku", meaningVi: "300 (⚠️ Biến âm đục byaku)", isIrregular: true, irregularReasonVi: "Hàng H đục hóa thành B sau âm San: sanbyaku", audioUrl: null },
  { id: "h-400", value: 400, kanji: "四百", hiragana: "よんひゃく", romaji: "yonhyaku", meaningVi: "400", audioUrl: null },
  { id: "h-500", value: 500, kanji: "五百", hiragana: "ごひゃく", romaji: "gohyaku", meaningVi: "500", audioUrl: null },
  { id: "h-600", value: 600, kanji: "六百", hiragana: "ろっぴゃく", romaji: "roppyaku", meaningVi: "600 (⚠️ Âm ngắt sokuon + bán đục pyaku)", isIrregular: true, irregularReasonVi: "Roku + hyaku biến âm thành roppyaku", audioUrl: null },
  { id: "h-700", value: 700, kanji: "七百", hiragana: "ななひゃく", romaji: "nanahyaku", meaningVi: "700", audioUrl: null },
  { id: "h-800", value: 800, kanji: "八百", hiragana: "はっぴゃく", romaji: "happyaku", meaningVi: "800 (⚠️ Âm ngắt sokuon + bán đục pyaku)", isIrregular: true, irregularReasonVi: "Hachi + hyaku biến âm thành happyaku", audioUrl: null },
  { id: "h-900", value: 900, kanji: "九百", hiragana: "きゅうひゃく", romaji: "kyuuhyaku", meaningVi: "900", audioUrl: null },
];

// ==========================================
// 3. THOUSANDS (1,000 - 9,000)
// ==========================================
export const THOUSANDS_LIST: NumberItem[] = [
  { id: "th-1000", value: "1.000", kanji: "千", hiragana: "せん", romaji: "sen", meaningVi: "1.000 (đứng một mình đọc là sen, trong số lớn đọc issen)", audioUrl: null },
  { id: "th-2000", value: "2.000", kanji: "二千", hiragana: "にせん", romaji: "nisen", meaningVi: "2.000", audioUrl: null },
  { id: "th-3000", value: "3.000", kanji: "三千", hiragana: "さんぜん", romaji: "sanzen", meaningVi: "3.000 (⚠️ Biến âm đục zen)", isIrregular: true, irregularReasonVi: "Sen đục hóa thành zen sau San: sanzen", audioUrl: null },
  { id: "th-4000", value: "4.000", kanji: "四千", hiragana: "よんせん", romaji: "yonsen", meaningVi: "4.000", audioUrl: null },
  { id: "th-5000", value: "5.000", kanji: "五千", hiragana: "ごせん", romaji: "gosen", meaningVi: "5.000", audioUrl: null },
  { id: "th-6000", value: "6.000", kanji: "六千", hiragana: "ろくせん", romaji: "rokusen", meaningVi: "6.000", audioUrl: null },
  { id: "th-7000", value: "7.000", kanji: "七千", hiragana: "ななせん", romaji: "nanasen", meaningVi: "7.000", audioUrl: null },
  { id: "th-8000", value: "8.000", kanji: "八千", hiragana: "はっせん", romaji: "hassen", meaningVi: "8.000 (⚠️ Âm ngắt sokuon: hassen)", isIrregular: true, irregularReasonVi: "Hachi + sen biến âm thành hassen", audioUrl: null },
  { id: "th-9000", value: "9.000", kanji: "九千", hiragana: "きゅうせん", romaji: "kyuusen", meaningVi: "9.000", audioUrl: null },
];

// ==========================================
// 4. LARGE NUMBERS (VẠN & ỨC)
// ==========================================
export const LARGE_NUMBERS_LIST: NumberItem[] = [
  { id: "ln-10k", value: "10.000", kanji: "一万", hiragana: "いちまん", romaji: "ichiman", meaningVi: "1 Vạn = 10 nghìn (bắt buộc phải có 'ichi')", isIrregular: true, audioUrl: null },
  { id: "ln-100k", value: "100.000", kanji: "十万", hiragana: "じゅうまん", romaji: "juuman", meaningVi: "10 Vạn = 100 nghìn", audioUrl: null },
  { id: "ln-1m", value: "1.000.000", kanji: "百万", hiragana: "ひゃくまん", romaji: "hyakuman", meaningVi: "100 Vạn = 1 triệu", audioUrl: null },
  { id: "ln-10m", value: "10.000.000", kanji: "一千万", hiragana: "いっせんまん", romaji: "issenman", meaningVi: "1.000 Vạn = 10 triệu (có âm ngắt issenman)", isIrregular: true, audioUrl: null },
  { id: "ln-100m", value: "100.000.000", kanji: "一億", hiragana: "いちおく", romaji: "ichioku", meaningVi: "1 Ức = 100 triệu (bắt buộc phải có 'ichi')", isIrregular: true, audioUrl: null },
  { id: "ln-1b", value: "1.000.000.000", kanji: "十億", hiragana: "じゅうおく", romaji: "juuoku", meaningVi: "10 Ức = 1 tỷ", audioUrl: null },
];

// ==========================================
// 5. AGE (TUỔI - 〜歳)
// ==========================================
export const AGE_LIST: NumberItem[] = [
  { id: "age-1", value: "1 tuổi", kanji: "一歳", hiragana: "いっさい", romaji: "issai", meaningVi: "1 tuổi (biến âm sokuon)", isIrregular: true, audioUrl: null },
  { id: "age-2", value: "2 tuổi", kanji: "二歳", hiragana: "にさい", romaji: "nisai", meaningVi: "2 tuổi", audioUrl: null },
  { id: "age-3", value: "3 tuổi", kanji: "三歳", hiragana: "さんさい", romaji: "sansai", meaningVi: "3 tuổi", audioUrl: null },
  { id: "age-4", value: "4 tuổi", kanji: "四歳", hiragana: "よんさい", romaji: "yonsai", meaningVi: "4 tuổi", audioUrl: null },
  { id: "age-5", value: "5 tuổi", kanji: "五歳", hiragana: "ごさい", romaji: "gosai", meaningVi: "5 tuổi", audioUrl: null },
  { id: "age-6", value: "6 tuổi", kanji: "六歳", hiragana: "ろくさい", romaji: "rokusai", meaningVi: "6 tuổi", audioUrl: null },
  { id: "age-7", value: "7 tuổi", kanji: "七歳", hiragana: "ななさい", romaji: "nanasai", meaningVi: "7 tuổi", audioUrl: null },
  { id: "age-8", value: "8 tuổi", kanji: "八歳", hiragana: "はっさい", romaji: "hassai", meaningVi: "8 tuổi (biến âm sokuon)", isIrregular: true, audioUrl: null },
  { id: "age-9", value: "9 tuổi", kanji: "九歳", hiragana: "きゅうさい", romaji: "kyuusai", meaningVi: "9 tuổi", audioUrl: null },
  { id: "age-10", value: "10 tuổi", kanji: "十歳", hiragana: "じゅっさい / じっさい", romaji: "jussai / jissai", meaningVi: "10 tuổi (biến âm sokuon)", isIrregular: true, audioUrl: null },
  { id: "age-20", value: "20 tuổi", kanji: "二十歳", hiragana: "はたち", romaji: "hatachi", meaningVi: "20 tuổi (Mốc trưởng thành thuần Nhật)", isIrregular: true, irregularReasonVi: "Cách đọc truyền thống của ngày lễ thành nhân", audioUrl: null },
];

// ==========================================
// 6. DATES (NGÀY TRONG THÁNG 1 - 31)
// ==========================================
export const DATES_LIST: DateItem[] = [
  { day: 1, kanji: "1日", hiragana: "ついたち", romaji: "tsuitachi", meaningVi: "Mùng 1", isSpecial: true, noteVi: "Gốc từ cổ tuki-tachi (trăng mọc)" },
  { day: 2, kanji: "2日", hiragana: "ふつか", romaji: "futsuka", meaningVi: "Mùng 2 / 2 ngày", isSpecial: true },
  { day: 3, kanji: "3日", hiragana: "みっか", romaji: "mikka", meaningVi: "Mùng 3 / 3 ngày", isSpecial: true },
  { day: 4, kanji: "4日", hiragana: "よっか", romaji: "yokka", meaningVi: "Mùng 4 / 4 ngày", isSpecial: true },
  { day: 5, kanji: "5日", hiragana: "いつか", romaji: "itsuka", meaningVi: "Mùng 5 / 5 ngày", isSpecial: true },
  { day: 6, kanji: "6日", hiragana: "むいか", romaji: "muika", meaningVi: "Mùng 6 / 6 ngày", isSpecial: true },
  { day: 7, kanji: "7日", hiragana: "なのか", romaji: "nanoka", meaningVi: "Mùng 7 / 7 ngày", isSpecial: true },
  { day: 8, kanji: "8日", hiragana: "ようか", romaji: "youka", meaningVi: "Mùng 8 / 8 ngày", isSpecial: true },
  { day: 9, kanji: "9日", hiragana: "ここのか", romaji: "kokonoka", meaningVi: "Mùng 9 / 9 ngày", isSpecial: true },
  { day: 10, kanji: "10日", hiragana: "とおか", romaji: "tooka", meaningVi: "Mùng 10 / 10 ngày", isSpecial: true },
  { day: 11, kanji: "11日", hiragana: "じゅういちにち", romaji: "juuichinichi", meaningVi: "Ngày 11", isSpecial: false },
  { day: 12, kanji: "12日", hiragana: "じゅうににち", romaji: "juuninichi", meaningVi: "Ngày 12", isSpecial: false },
  { day: 13, kanji: "13日", hiragana: "じゅうさんにち", romaji: "juusannichi", meaningVi: "Ngày 13", isSpecial: false },
  { day: 14, kanji: "14日", hiragana: "じゅうよっか", romaji: "juuyokka", meaningVi: "Ngày 14", isSpecial: true, noteVi: "Đuôi 4 là yokka bất quy tắc" },
  { day: 15, kanji: "15日", hiragana: "じゅうごにち", romaji: "juugonichi", meaningVi: "Ngày 15", isSpecial: false },
  { day: 16, kanji: "16日", hiragana: "じゅうろくにち", romaji: "juurokunichi", meaningVi: "Ngày 16", isSpecial: false },
  { day: 17, kanji: "17日", hiragana: "じゅうしちにち / じゅうななにち", romaji: "juushichinichi", meaningVi: "Ngày 17", isSpecial: false },
  { day: 18, kanji: "18日", hiragana: "じゅうはちにち", romaji: "juuhachinichi", meaningVi: "Ngày 18", isSpecial: false },
  { day: 19, kanji: "19日", hiragana: "じゅうくにち", romaji: "juukunichi", meaningVi: "Ngày 19", isSpecial: false },
  { day: 20, kanji: "20日", hiragana: "はつか", romaji: "hatsuka", meaningVi: "Ngày 20", isSpecial: true, noteVi: "Từ thuần Nhật đặc biệt" },
  { day: 21, kanji: "21日", hiragana: "にじゅういちにち", romaji: "nijuuichinichi", meaningVi: "Ngày 21", isSpecial: false },
  { day: 22, kanji: "22日", hiragana: "にじゅうににち", romaji: "nijuuninichi", meaningVi: "Ngày 22", isSpecial: false },
  { day: 23, kanji: "23日", hiragana: "にじゅうさんにち", romaji: "nijuusannichi", meaningVi: "Ngày 23", isSpecial: false },
  { day: 24, kanji: "24日", hiragana: "にじゅうよっか", romaji: "nijuuyokka", meaningVi: "Ngày 24", isSpecial: true, noteVi: "Đuôi 4 là yokka bất quy tắc" },
  { day: 25, kanji: "25日", hiragana: "にじゅうごにち", romaji: "nijuugonichi", meaningVi: "Ngày 25", isSpecial: false },
  { day: 26, kanji: "26日", hiragana: "にじゅうろくにち", romaji: "nijuurokunichi", meaningVi: "Ngày 26", isSpecial: false },
  { day: 27, kanji: "27日", hiragana: "にじゅうしちにち / にじゅうななにち", romaji: "nijuushichinichi", meaningVi: "Ngày 27", isSpecial: false },
  { day: 28, kanji: "28日", hiragana: "にじゅうはちにち", romaji: "nijuuhachinichi", meaningVi: "Ngày 28", isSpecial: false },
  { day: 29, kanji: "29日", hiragana: "にじゅうくにち", romaji: "nijuukunichi", meaningVi: "Ngày 29", isSpecial: false },
  { day: 30, kanji: "30日", hiragana: "さんじゅうにち", romaji: "sanjuunichi", meaningVi: "Ngày 30", isSpecial: false },
  { day: 31, kanji: "31日", hiragana: "さんじゅういちにち", romaji: "sanjuuichinichi", meaningVi: "Ngày 31", isSpecial: false },
];

// ==========================================
// 7. MONTHS (THÁNG TRONG NĂM 1 - 12)
// ==========================================
export const MONTHS_LIST: MonthItem[] = [
  { month: 1, kanji: "1月", hiragana: "いちがつ", romaji: "ichigatsu", meaningVi: "Tháng 1" },
  { month: 2, kanji: "2月", hiragana: "にがつ", romaji: "nigatsu", meaningVi: "Tháng 2" },
  { month: 3, kanji: "3月", hiragana: "さんがつ", romaji: "sangatsu", meaningVi: "Tháng 3" },
  { month: 4, kanji: "4月", hiragana: "しがつ", romaji: "shigatsu", meaningVi: "Tháng 4", isSpecial: true, noteVi: "Bắt buộc đọc shigatsu, không đọc yongatsu!" },
  { month: 5, kanji: "5月", hiragana: "ごがつ", romaji: "gogatsu", meaningVi: "Tháng 5" },
  { month: 6, kanji: "6月", hiragana: "ろくがつ", romaji: "rokugatsu", meaningVi: "Tháng 6" },
  { month: 7, kanji: "7月", hiragana: "しちがつ", romaji: "shichigatsu", meaningVi: "Tháng 7", isSpecial: true, noteVi: "Bắt buộc đọc shichigatsu, không đọc nanagatsu!" },
  { month: 8, kanji: "8月", hiragana: "はちがつ", romaji: "hachigatsu", meaningVi: "Tháng 8" },
  { month: 9, kanji: "9月", hiragana: "くがつ", romaji: "kugatsu", meaningVi: "Tháng 9", isSpecial: true, noteVi: "Bắt buộc đọc kugatsu, không đọc kyuugatsu!" },
  { month: 10, kanji: "10月", hiragana: "じゅうがつ", romaji: "juugatsu", meaningVi: "Tháng 10" },
  { month: 11, kanji: "11月", hiragana: "じゅういちがつ", romaji: "juuichigatsu", meaningVi: "Tháng 11" },
  { month: 12, kanji: "12月", hiragana: "じゅうにがつ", romaji: "juunigatsu", meaningVi: "Tháng 12" },
];

// ==========================================
// 8. WEEKDAYS (THỨ TRONG TUẦN)
// ==========================================
export const WEEKDAYS_LIST: WeekdayItem[] = [
  { id: "mon", dayNameVi: "Thứ Hai", kanji: "月曜日", hiragana: "げつようび", romaji: "getsuyoubi", elementVi: "Mặt trăng (Nguyệt)", mnemonicVi: "Khởi đầu tuần mới dưới ánh trăng" },
  { id: "tue", dayNameVi: "Thứ Ba", kanji: "火曜日", hiragana: "かようび", romaji: "kayoubi", elementVi: "Ngọn lửa (Hỏa)", mnemonicVi: "Thứ 3 nhiệt huyết hừng hực như lửa" },
  { id: "wed", dayNameVi: "Thứ Tư", kanji: "水曜日", hiragana: "すいようび", romaji: "suiyoubi", elementVi: "Nước (Thủy)", mnemonicVi: "Giữa tuần thư giãn dịu mát như dòng nước" },
  { id: "thu", dayNameVi: "Thứ Năm", kanji: "木曜日", hiragana: "もくようび", romaji: "mokuyoubi", elementVi: "Cây cối (Mộc)", mnemonicVi: "Thứ 5 vững chãi như cây cổ thụ" },
  { id: "fri", dayNameVi: "Thứ Sáu", kanji: "金曜日", hiragana: "きんようび", romaji: "kinyoubi", elementVi: "Vàng / Tiền (Kim)", mnemonicVi: "Thứ 6 lãnh lương, ngày vàng kết thúc tuần làm" },
  { id: "sat", dayNameVi: "Thứ Bảy", kanji: "土曜日", hiragana: "どようび", romaji: "doyoubi", elementVi: "Đất (Thổ)", mnemonicVi: "Thứ 7 về với đất mẹ nghỉ ngơi đi dạo" },
  { id: "sun", dayNameVi: "Chủ Nhật", kanji: "日曜日", hiragana: "にちようび", romaji: "nichiyoubi", elementVi: "Mặt trời (Nhật)", mnemonicVi: "Chủ nhật đón ánh nắng mặt trời rực rỡ" },
];

// ==========================================
// 9. TIME (GIỜ & PHÚT)
// ==========================================
export const TIME_HOURS_LIST: TimeItem[] = [
  { id: "h-1", value: "1 giờ", type: "hour", kanji: "1時", hiragana: "いちじ", romaji: "ichiji", meaningVi: "1 giờ" },
  { id: "h-2", value: "2 giờ", type: "hour", kanji: "2時", hiragana: "にじ", romaji: "niji", meaningVi: "2 giờ" },
  { id: "h-3", value: "3 giờ", type: "hour", kanji: "3時", hiragana: "さんじ", romaji: "sanji", meaningVi: "3 giờ" },
  { id: "h-4", value: "4 giờ", type: "hour", kanji: "4時", hiragana: "よじ", romaji: "yoji", meaningVi: "4 giờ", isSpecial: true, noteVi: "Tuyệt đối không đọc shiji hay yonji!" },
  { id: "h-5", value: "5 giờ", type: "hour", kanji: "5時", hiragana: "ごじ", romaji: "goji", meaningVi: "5 giờ" },
  { id: "h-6", value: "6 giờ", type: "hour", kanji: "6時", hiragana: "ろくじ", romaji: "rokuji", meaningVi: "6 giờ" },
  { id: "h-7", value: "7 giờ", type: "hour", kanji: "7時", hiragana: "しちじ", romaji: "shichiji", meaningVi: "7 giờ", isSpecial: true, noteVi: "Tuyệt đối không đọc nanaji!" },
  { id: "h-8", value: "8 giờ", type: "hour", kanji: "8時", hiragana: "はちじ", romaji: "hachiji", meaningVi: "8 giờ" },
  { id: "h-9", value: "9 giờ", type: "hour", kanji: "9時", hiragana: "くじ", romaji: "kuji", meaningVi: "9 giờ", isSpecial: true, noteVi: "Tuyệt đối không đọc kyuuji!" },
  { id: "h-10", value: "10 giờ", type: "hour", kanji: "10時", hiragana: "じゅうじ", romaji: "juuji", meaningVi: "10 giờ" },
  { id: "h-11", value: "11 giờ", type: "hour", kanji: "11時", hiragana: "じゅういちじ", romaji: "juuichiji", meaningVi: "11 giờ" },
  { id: "h-12", value: "12 giờ", type: "hour", kanji: "12時", hiragana: "じゅうにじ", romaji: "juuniji", meaningVi: "12 giờ" },
];

export const TIME_MINUTES_LIST: TimeItem[] = [
  { id: "m-1", value: "1 phút", type: "minute", kanji: "1分", hiragana: "いっぷん", romaji: "ippun", meaningVi: "1 phút (biến âm pun)", isSpecial: true },
  { id: "m-2", value: "2 phút", type: "minute", kanji: "2分", hiragana: "にふん", romaji: "nifun", meaningVi: "2 phút (âm chuẩn fun)" },
  { id: "m-3", value: "3 phút", type: "minute", kanji: "3分", hiragana: "さんぷん", romaji: "sanpun", meaningVi: "3 phút (biến âm pun)", isSpecial: true },
  { id: "m-4", value: "4 phút", type: "minute", kanji: "4分", hiragana: "よんぷん", romaji: "yonpun", meaningVi: "4 phút (biến âm pun)", isSpecial: true },
  { id: "m-5", value: "5 phút", type: "minute", kanji: "5分", hiragana: "ごふん", romaji: "gofun", meaningVi: "5 phút (âm chuẩn fun)" },
  { id: "m-6", value: "6 phút", type: "minute", kanji: "6分", hiragana: "ろっぷん", romaji: "roppun", meaningVi: "6 phút (biến âm pun)", isSpecial: true },
  { id: "m-7", value: "7 phút", type: "minute", kanji: "7分", hiragana: "ななふん", romaji: "nanafun", meaningVi: "7 phút (âm chuẩn fun)" },
  { id: "m-8", value: "8 phút", type: "minute", kanji: "8分", hiragana: "はっぷん / はちふん", romaji: "happun / hachifun", meaningVi: "8 phút (thường đọc happun)", isSpecial: true },
  { id: "m-9", value: "9 phút", type: "minute", kanji: "9分", hiragana: "きゅうふん", romaji: "kyuufun", meaningVi: "9 phút (âm chuẩn fun)" },
  { id: "m-10", value: "10 phút", type: "minute", kanji: "10分", hiragana: "じゅっぷん / じっぷん", romaji: "juppun / jippun", meaningVi: "10 phút (biến âm pun)", isSpecial: true },
  { id: "m-15", value: "15 phút", type: "minute", kanji: "15分", hiragana: "じゅうごふん", romaji: "juugofun", meaningVi: "15 phút" },
  { id: "m-30", value: "30 phút / rưỡi", type: "minute", kanji: "30分 / 半", hiragana: "さんじゅっぷん / はん", romaji: "sanjuppun / han", meaningVi: "30 phút hoặc giờ rưỡi (半)", isSpecial: true },
];

// ==========================================
// 10. COUNTERS (BỘ LƯỢNG TỪ CHÍNH)
// ==========================================
export const COUNTER_GROUPS: CounterGroup[] = [
  {
    id: "cg-objects",
    counterKanji: "つ",
    counterHiragana: "つ",
    counterRomaji: "tsu",
    nameVi: "Đếm đồ vật chung (1 đến 10)",
    descriptionVi:
      "Dùng khi đếm các đồ vật trừu tượng, đồ vật nhỏ hoặc khi bạn chưa biết chính xác lượng từ chuyên biệt của đồ vật đó.",
    targetObjectsVi: "Bánh, táo, ghế, câu hỏi, ý kiến, đồ dùng linh tinh...",
    questionWord: { kanji: "幾つ", hiragana: "いくつ", romaji: "ikutsu", meaningVi: "Mấy cái? Bao nhiêu cái?" },
    items: [
      { id: "tsu-1", value: 1, kanji: "一つ", hiragana: "ひとつ", romaji: "hitotsu", meaningVi: "1 cái", isIrregular: true, audioUrl: null },
      { id: "tsu-2", value: 2, kanji: "二つ", hiragana: "ふたつ", romaji: "futatsu", meaningVi: "2 cái", isIrregular: true, audioUrl: null },
      { id: "tsu-3", value: 3, kanji: "三つ", hiragana: "みっつ", romaji: "mittsu", meaningVi: "3 cái", isIrregular: true, audioUrl: null },
      { id: "tsu-4", value: 4, kanji: "四つ", hiragana: "よっつ", romaji: "yottsu", meaningVi: "4 cái", isIrregular: true, audioUrl: null },
      { id: "tsu-5", value: 5, kanji: "五つ", hiragana: "いつつ", romaji: "itsutsu", meaningVi: "5 cái", isIrregular: true, audioUrl: null },
      { id: "tsu-6", value: 6, kanji: "六つ", hiragana: "むっつ", romaji: "muttsu", meaningVi: "6 cái", isIrregular: true, audioUrl: null },
      { id: "tsu-7", value: 7, kanji: "七つ", hiragana: "ななつ", romaji: "nanatsu", meaningVi: "7 cái", isIrregular: true, audioUrl: null },
      { id: "tsu-8", value: 8, kanji: "八つ", hiragana: "やっつ", romaji: "yattsu", meaningVi: "8 cái", isIrregular: true, audioUrl: null },
      { id: "tsu-9", value: 9, kanji: "九つ", hiragana: "ここのつ", romaji: "kokonotsu", meaningVi: "9 cái", isIrregular: true, audioUrl: null },
      { id: "tsu-10", value: 10, kanji: "十", hiragana: "とお", romaji: "too", meaningVi: "10 cái (không có chữ つ ở đuôi)", isIrregular: true, audioUrl: null },
    ],
    tipsVi: [
      "Bộ số này chỉ đếm từ 1 đến 10. Từ 11 cái trở lên quay về dùng số đếm thường (11 = じゅういち).",
      "Số 10 (とお) là số duy nhất trong bộ này không kết thúc bằng chữ つ.",
    ],
  },
  {
    id: "cg-people",
    counterKanji: "人",
    counterHiragana: "にん",
    counterRomaji: "nin",
    nameVi: "Đếm số người (人)",
    descriptionVi:
      "Quy tắc đếm người thông dụng. Chú ý 1 người và 2 người dùng từ gốc thuần Nhật hoàn toàn bất quy tắc.",
    targetObjectsVi: "Con người, học sinh, gia đình, bạn bè...",
    questionWord: { kanji: "何人", hiragana: "なんにん", romaji: "nannin", meaningVi: "Mấy người? Bao nhiêu người?" },
    items: [
      { id: "p-1", value: 1, kanji: "一人", hiragana: "ひとり", romaji: "hitori", meaningVi: "1 người", isIrregular: true, irregularReasonVi: "Cách đọc thuần Nhật", audioUrl: null },
      { id: "p-2", value: 2, kanji: "二人", hiragana: "ふたり", romaji: "futari", meaningVi: "2 người", isIrregular: true, irregularReasonVi: "Cách đọc thuần Nhật", audioUrl: null },
      { id: "p-3", value: 3, kanji: "三人", hiragana: "さんにん", romaji: "sannin", meaningVi: "3 người", audioUrl: null },
      { id: "p-4", value: 4, kanji: "四人", hiragana: "よにん", romaji: "yonin", meaningVi: "4 người (tuyệt đối không đọc shinin)", isIrregular: true, audioUrl: null },
      { id: "p-5", value: 5, kanji: "五人", hiragana: "ごにん", romaji: "gonin", meaningVi: "5 người", audioUrl: null },
      { id: "p-6", value: 6, kanji: "六人", hiragana: "ろくにん", romaji: "rokunin", meaningVi: "6 người", audioUrl: null },
      { id: "p-7", value: 7, kanji: "七人", hiragana: "ななにん / しちにん", romaji: "nananin", meaningVi: "7 người", audioUrl: null },
      { id: "p-8", value: 8, kanji: "八人", hiragana: "はちにん", romaji: "hachinin", meaningVi: "8 người", audioUrl: null },
      { id: "p-9", value: 9, kanji: "九人", hiragana: "きゅうにん / くにん", romaji: "kyuunin", meaningVi: "9 người", audioUrl: null },
      { id: "p-10", value: 10, kanji: "十人", hiragana: "じゅうにん", romaji: "juunin", meaningVi: "10 người", audioUrl: null },
    ],
    tipsVi: [
      "4 người luôn đọc là よにん (yonin), không đọc là しにん (shinin) vì từ shinin đồng âm với 'người chết'.",
    ],
  },
  {
    id: "cg-hon",
    counterKanji: "本",
    counterHiragana: "ほん / ぼん / ぽん",
    counterRomaji: "hon / bon / pon",
    nameVi: "Đếm vật thon dài (本)",
    descriptionVi:
      "Dùng đếm các vật có hình trụ thon dài: bút viết, chai nước, cây xanh, ô dù, chuối, video clip.",
    targetObjectsVi: "Bút, chai nước, que kem, ô dù, cái cây, phim ảnh...",
    questionWord: { kanji: "何本", hiragana: "なんぼん", romaji: "nanbon", meaningVi: "Mấy chai / cây?" },
    items: [
      { id: "hon-1", value: 1, kanji: "一本", hiragana: "いっぽん", romaji: "ippon", meaningVi: "1 cây / chai", isIrregular: true, audioUrl: null },
      { id: "hon-2", value: 2, kanji: "二本", hiragana: "にほん", romaji: "nihon", meaningVi: "2 cây / chai", audioUrl: null },
      { id: "hon-3", value: 3, kanji: "三本", hiragana: "さんぼん", romaji: "sanbon", meaningVi: "3 cây / chai", isIrregular: true, audioUrl: null },
      { id: "hon-4", value: 4, kanji: "四本", hiragana: "よんほん", romaji: "yonhon", meaningVi: "4 cây / chai", audioUrl: null },
      { id: "hon-5", value: 5, kanji: "五本", hiragana: "ごほん", romaji: "gohon", meaningVi: "5 cây / chai", audioUrl: null },
      { id: "hon-6", value: 6, kanji: "六本", hiragana: "ろっぽん", romaji: "roppon", meaningVi: "6 cây / chai", isIrregular: true, audioUrl: null },
      { id: "hon-7", value: 7, kanji: "七本", hiragana: "ななほん", romaji: "nanahon", meaningVi: "7 cây / chai", audioUrl: null },
      { id: "hon-8", value: 8, kanji: "八本", hiragana: "はっぽん", romaji: "happon", meaningVi: "8 cây / chai", isIrregular: true, audioUrl: null },
      { id: "hon-9", value: 9, kanji: "九本", hiragana: "きゅうほん", romaji: "kyuuhon", meaningVi: "9 cây / chai", audioUrl: null },
      { id: "hon-10", value: 10, kanji: "十本", hiragana: "じゅっぽん", romaji: "juppon", meaningVi: "10 cây / chai", isIrregular: true, audioUrl: null },
    ],
    tipsVi: [
      "Ghi nhớ câu thần chú: 1, 6, 8, 10 đọc là 'pon' (âm ngắt p), số 3 đọc là 'bon' (âm đục b).",
    ],
  },
  {
    id: "cg-mai",
    counterKanji: "枚",
    counterHiragana: "まい",
    counterRomaji: "mai",
    nameVi: "Đếm vật mỏng phẳng (枚)",
    descriptionVi:
      "Dùng đếm các vật có bề mặt phẳng mỏng như giấy tờ, vé, đĩa, áo quần, tranh ảnh. Lượng từ này hoàn toàn đều đặn không có biến âm.",
    targetObjectsVi: "Tờ giấy, vé tàu, áo sơ mi, đĩa CD, ảnh chụp...",
    questionWord: { kanji: "何枚", hiragana: "なんまい", romaji: "nanmai", meaningVi: "Mấy tờ / chiếc?" },
    items: [
      { id: "mai-1", value: 1, kanji: "一枚", hiragana: "いちまい", romaji: "ichimai", meaningVi: "1 tờ / chiếc", audioUrl: null },
      { id: "mai-2", value: 2, kanji: "二枚", hiragana: "にまい", romaji: "nimai", meaningVi: "2 tờ / chiếc", audioUrl: null },
      { id: "mai-3", value: 3, kanji: "三枚", hiragana: "さんまい", romaji: "sanmai", meaningVi: "3 tờ / chiếc", audioUrl: null },
      { id: "mai-4", value: 4, kanji: "四枚", hiragana: "よんまい", romaji: "yonmai", meaningVi: "4 tờ / chiếc", audioUrl: null },
      { id: "mai-5", value: 5, kanji: "五枚", hiragana: "ごまい", romaji: "gomai", meaningVi: "5 tờ / chiếc", audioUrl: null },
      { id: "mai-6", value: 6, kanji: "六枚", hiragana: "ろくまい", romaji: "rokumai", meaningVi: "6 tờ / chiếc", audioUrl: null },
      { id: "mai-7", value: 7, kanji: "七枚", hiragana: "ななまい", romaji: "nanamai", meaningVi: "7 tờ / chiếc", audioUrl: null },
      { id: "mai-8", value: 8, kanji: "八枚", hiragana: "はちまい", romaji: "hachimai", meaningVi: "8 tờ / chiếc", audioUrl: null },
      { id: "mai-9", value: 9, kanji: "九枚", hiragana: "きゅうまい", romaji: "kyuumai", meaningVi: "9 tờ / chiếc", audioUrl: null },
      { id: "mai-10", value: 10, kanji: "十枚", hiragana: "じゅうまい", romaji: "juumai", meaningVi: "10 tờ / chiếc", audioUrl: null },
    ],
    tipsVi: [
      "〜枚 là một trong những lượng từ dễ nhớ nhất vì không có bất kỳ biến âm nào từ 1 đến 10.",
    ],
  },
  {
    id: "cg-hiki",
    counterKanji: "匹",
    counterHiragana: "ひき / びき / ぴき",
    counterRomaji: "hiki / biki / piki",
    nameVi: "Đếm động vật nhỏ (匹)",
    descriptionVi:
      "Dùng đếm các loài động vật nhỏ (chó, mèo, thỏ), cá và côn trùng. Biến âm giống hệt 〜本: 1, 6, 8, 10 đọc piki; 3 đọc biki.",
    targetObjectsVi: "Chó, mèo, cá vàng, chim cảnh, chuột...",
    questionWord: { kanji: "何匹", hiragana: "なんびき", romaji: "nanbiki", meaningVi: "Mấy con?" },
    items: [
      { id: "hiki-1", value: 1, kanji: "一匹", hiragana: "いっぴき", romaji: "ippiki", meaningVi: "1 con", isIrregular: true, audioUrl: null },
      { id: "hiki-2", value: 2, kanji: "二匹", hiragana: "にひき", romaji: "nihiki", meaningVi: "2 con", audioUrl: null },
      { id: "hiki-3", value: 3, kanji: "三匹", hiragana: "さんびき", romaji: "sanbiki", meaningVi: "3 con", isIrregular: true, audioUrl: null },
      { id: "hiki-4", value: 4, kanji: "四匹", hiragana: "よんひき", romaji: "yonhiki", meaningVi: "4 con", audioUrl: null },
      { id: "hiki-5", value: 5, kanji: "五匹", hiragana: "ごひき", romaji: "gohiki", meaningVi: "5 con", audioUrl: null },
      { id: "hiki-6", value: 6, kanji: "六匹", hiragana: "ろっぴき", romaji: "roppiki", meaningVi: "6 con", isIrregular: true, audioUrl: null },
      { id: "hiki-7", value: 7, kanji: "七匹", hiragana: "ななひき", romaji: "nanahiki", meaningVi: "7 con", audioUrl: null },
      { id: "hiki-8", value: 8, kanji: "八匹", hiragana: "はっぴき", romaji: "happiki", meaningVi: "8 con", isIrregular: true, audioUrl: null },
      { id: "hiki-9", value: 9, kanji: "九匹", hiragana: "きゅうひき", romaji: "kyuuhiki", meaningVi: "9 con", audioUrl: null },
      { id: "hiki-10", value: 10, kanji: "十匹", hiragana: "じゅっぴき", romaji: "juppiki", meaningVi: "10 con", isIrregular: true, audioUrl: null },
    ],
  },
  {
    id: "cg-dai",
    counterKanji: "台",
    counterHiragana: "だい",
    counterRomaji: "dai",
    nameVi: "Đếm máy móc & xe cộ (台)",
    descriptionVi:
      "Dùng đếm các thiết bị máy móc cơ giới, phương tiện giao thông (xe hơi, xe đạp) và đồ điện gia dụng (tivi, máy tính, tủ lạnh).",
    targetObjectsVi: "Ô tô, xe máy, xe đạp, laptop, tivi, tủ lạnh...",
    questionWord: { kanji: "何台", hiragana: "なんだい", romaji: "nandai", meaningVi: "Mấy chiếc / cái?" },
    items: [
      { id: "dai-1", value: 1, kanji: "一台", hiragana: "いちだい", romaji: "ichidai", meaningVi: "1 chiếc", audioUrl: null },
      { id: "dai-2", value: 2, kanji: "二台", hiragana: "にだい", romaji: "nidai", meaningVi: "2 chiếc", audioUrl: null },
      { id: "dai-3", value: 3, kanji: "三台", hiragana: "さんだい", romaji: "sandai", meaningVi: "3 chiếc", audioUrl: null },
      { id: "dai-4", value: 4, kanji: "四台", hiragana: "よんだい", romaji: "yondai", meaningVi: "4 chiếc", audioUrl: null },
      { id: "dai-5", value: 5, kanji: "五台", hiragana: "ごだい", romaji: "godai", meaningVi: "5 chiếc", audioUrl: null },
      { id: "dai-6", value: 6, kanji: "六台", hiragana: "ろくだい", romaji: "rokudai", meaningVi: "6 chiếc", audioUrl: null },
      { id: "dai-7", value: 7, kanji: "七台", hiragana: "ななだい", romaji: "nanadai", meaningVi: "7 chiếc", audioUrl: null },
      { id: "dai-8", value: 8, kanji: "八台", hiragana: "はちだい", romaji: "hachidai", meaningVi: "8 chiếc", audioUrl: null },
      { id: "dai-9", value: 9, kanji: "九台", hiragana: "きゅうだい", romaji: "kyuudai", meaningVi: "9 chiếc", audioUrl: null },
      { id: "dai-10", value: 10, kanji: "十台", hiragana: "じゅうだい", romaji: "juudai", meaningVi: "10 chiếc", audioUrl: null },
    ],
  },
  {
    id: "cg-satsu",
    counterKanji: "冊",
    counterHiragana: "さつ",
    counterRomaji: "satsu",
    nameVi: "Đếm sách vở (冊)",
    descriptionVi:
      "Dùng đếm các ấn phẩm đóng gáy: sách, vở, tiểu thuyết, từ điển, tạp chí.",
    targetObjectsVi: "Sách giáo khoa, truyện tranh, cuốn sổ tay...",
    questionWord: { kanji: "何冊", hiragana: "なんさつ", romaji: "nansatsu", meaningVi: "Mấy cuốn / quyển?" },
    items: [
      { id: "satsu-1", value: 1, kanji: "一冊", hiragana: "いっさつ", romaji: "issatsu", meaningVi: "1 cuốn", isIrregular: true, audioUrl: null },
      { id: "satsu-2", value: 2, kanji: "二冊", hiragana: "にさつ", romaji: "nisatsu", meaningVi: "2 cuốn", audioUrl: null },
      { id: "satsu-3", value: 3, kanji: "三冊", hiragana: "さんさつ", romaji: "sansatsu", meaningVi: "3 cuốn", audioUrl: null },
      { id: "satsu-4", value: 4, kanji: "四冊", hiragana: "よんさつ", romaji: "yonsatsu", meaningVi: "4 cuốn", audioUrl: null },
      { id: "satsu-5", value: 5, kanji: "五冊", hiragana: "ごさつ", romaji: "gosatsu", meaningVi: "5 cuốn", audioUrl: null },
      { id: "satsu-6", value: 6, kanji: "六冊", hiragana: "ろくさつ", romaji: "rokusatsu", meaningVi: "6 cuốn", audioUrl: null },
      { id: "satsu-7", value: 7, kanji: "七冊", hiragana: "ななさつ", romaji: "nanasatsu", meaningVi: "7 cuốn", audioUrl: null },
      { id: "satsu-8", value: 8, kanji: "八冊", hiragana: "はっさつ", romaji: "hassatsu", meaningVi: "8 cuốn", isIrregular: true, audioUrl: null },
      { id: "satsu-9", value: 9, kanji: "九冊", hiragana: "きゅうさつ", romaji: "kyuusatsu", meaningVi: "9 cuốn", audioUrl: null },
      { id: "satsu-10", value: 10, kanji: "十冊", hiragana: "じゅっさつ", romaji: "jussatsu", meaningVi: "10 cuốn", isIrregular: true, audioUrl: null },
    ],
  },
  {
    id: "cg-ko",
    counterKanji: "個",
    counterHiragana: "こ",
    counterRomaji: "ko",
    nameVi: "Đếm đồ vật nhỏ / quả tròn (個)",
    descriptionVi:
      "Dùng đếm các vật nhỏ, hình khối, quả tròn, hộp quà nhỏ: quả táo, quả trứng, viên kẹo, cục tẩy.",
    targetObjectsVi: "Quả trứng, viên kẹo, quả táo, cái hộp nhỏ, cục gôm...",
    questionWord: { kanji: "何個", hiragana: "なんこ", romaji: "nanko", meaningVi: "Mấy cái / quả?" },
    items: [
      { id: "ko-1", value: 1, kanji: "一個", hiragana: "いっこ", romaji: "ikko", meaningVi: "1 cái / quả", isIrregular: true, audioUrl: null },
      { id: "ko-2", value: 2, kanji: "二個", hiragana: "にこ", romaji: "niko", meaningVi: "2 cái / quả", audioUrl: null },
      { id: "ko-3", value: 3, kanji: "三個", hiragana: "さんこ", romaji: "sanko", meaningVi: "3 cái / quả", audioUrl: null },
      { id: "ko-4", value: 4, kanji: "四個", hiragana: "よんこ", romaji: "yonko", meaningVi: "4 cái / quả", audioUrl: null },
      { id: "ko-5", value: 5, kanji: "五個", hiragana: "ごこ", romaji: "goko", meaningVi: "5 cái / quả", audioUrl: null },
      { id: "ko-6", value: 6, kanji: "六個", hiragana: "ろっこ", romaji: "rokko", meaningVi: "6 cái / quả", isIrregular: true, audioUrl: null },
      { id: "ko-7", value: 7, kanji: "七個", hiragana: "ななこ", romaji: "nanako", meaningVi: "7 cái / quả", audioUrl: null },
      { id: "ko-8", value: 8, kanji: "八個", hiragana: "はっこ", romaji: "hakko", meaningVi: "8 cái / quả", isIrregular: true, audioUrl: null },
      { id: "ko-9", value: 9, kanji: "九個", hiragana: "きゅうこ", romaji: "kyuuko", meaningVi: "9 cái / quả", audioUrl: null },
      { id: "ko-10", value: 10, kanji: "十個", hiragana: "じゅっこ", romaji: "jukko", meaningVi: "10 cái / quả", isIrregular: true, audioUrl: null },
    ],
  },
  {
    id: "cg-floor",
    counterKanji: "階",
    counterHiragana: "かい / がい",
    counterRomaji: "kai / gai",
    nameVi: "Đếm tầng nhà (階)",
    descriptionVi:
      "Dùng đếm số tầng của tòa nhà. Lưu ý tầng 3 đọc biến âm đục: Sangai.",
    targetObjectsVi: "Tầng 1, tầng 2, tầng 3 của tòa nhà...",
    questionWord: { kanji: "何階", hiragana: "なんがい", romaji: "nangai", meaningVi: "Tầng mấy?" },
    items: [
      { id: "fl-1", value: 1, kanji: "一階", hiragana: "いっかい", romaji: "ikkai", meaningVi: "Tầng 1", isIrregular: true, audioUrl: null },
      { id: "fl-2", value: 2, kanji: "二階", hiragana: "にかい", romaji: "nikai", meaningVi: "Tầng 2", audioUrl: null },
      { id: "fl-3", value: 3, kanji: "三階", hiragana: "さんがい", romaji: "sangai", meaningVi: "Tầng 3 (⚠️ Biến âm gai)", isIrregular: true, audioUrl: null },
      { id: "fl-4", value: 4, kanji: "四階", hiragana: "よんかい", romaji: "yonkai", meaningVi: "Tầng 4", audioUrl: null },
      { id: "fl-5", value: 5, kanji: "五階", hiragana: "ごかい", romaji: "gokai", meaningVi: "Tầng 5", audioUrl: null },
      { id: "fl-6", value: 6, kanji: "六階", hiragana: "ろっかい", romaji: "rokkai", meaningVi: "Tầng 6", isIrregular: true, audioUrl: null },
      { id: "fl-7", value: 7, kanji: "七階", hiragana: "ななかい", romaji: "nanakai", meaningVi: "Tầng 7", audioUrl: null },
      { id: "fl-8", value: 8, kanji: "八階", hiragana: "はっかい", romaji: "hakkai", meaningVi: "Tầng 8", isIrregular: true, audioUrl: null },
      { id: "fl-9", value: 9, kanji: "九階", hiragana: "きゅうかい", romaji: "kyuukai", meaningVi: "Tầng 9", audioUrl: null },
      { id: "fl-10", value: 10, kanji: "十階", hiragana: "じゅっかい", romaji: "jukkai", meaningVi: "Tầng 10", isIrregular: true, audioUrl: null },
    ],
  },
];

// ==========================================
// 11. SOUND CHANGE MATRIX (1, 3, 6, 8, 10)
// ==========================================
export const SOUND_CHANGE_MATRIX: SoundChangeSummaryRow[] = [
  {
    number: 1,
    label: "1",
    hon: "いっぽん",
    hiki: "いっぴき",
    fun: "いっぷん",
    ko: "いっこ",
    satsu: "いっさつ",
    kai: "いっかい",
  },
  {
    number: 3,
    label: "3",
    hon: "さんぼん",
    hiki: "さんびき",
    fun: "さんぷん",
    ko: "さんこ",
    satsu: "さんさつ",
    kai: "さんがい",
  },
  {
    number: 6,
    label: "6",
    hon: "ろっぽん",
    hiki: "ろっぴき",
    fun: "ろっぷん",
    ko: "ろっこ",
    satsu: "ろくさつ",
    kai: "ろっかい",
  },
  {
    number: 8,
    label: "8",
    hon: "はっぽん",
    hiki: "はっぴき",
    fun: "はっぷん",
    ko: "はっこ",
    satsu: "はっさつ",
    kai: "はっかい",
  },
  {
    number: 10,
    label: "10",
    hon: "じゅっぽん",
    hiki: "じゅっぴき",
    fun: "じゅっぷん",
    ko: "じゅっこ",
    satsu: "じゅっさつ",
    kai: "じゅっかい",
  },
];

// ==========================================
// 12. MINI PRACTICE QUESTIONS
// ==========================================
export const NUMBERS_PRACTICE_QUESTIONS: NumberPracticeQuestion[] = [
  {
    id: "npq-1",
    category: "number",
    prompt: "Số 300 trong tiếng Nhật được phát âm đúng là gì?",
    options: [
      { id: "opt-1", label: "さんびゃく (sanbyaku)", sublabel: "Biến âm đục byaku", isCorrect: true },
      { id: "opt-2", label: "さんひゃく (sanhyaku)", isCorrect: false },
      { id: "opt-3", label: "さんぴゃく (sanpyaku)", isCorrect: false },
      { id: "opt-4", label: "みっぴゃく (mippyaku)", isCorrect: false },
    ],
    explanationVi:
      "300 đọc là さんびゃく (sanbyaku), trong đó hàng trăm 'hyaku' bị đục hóa thành 'byaku' sau số 3 (San).",
  },
  {
    id: "npq-2",
    category: "number",
    prompt: "Trong hệ thống số lớn tiếng Nhật, 1 Vạn (一万 - Ichiman) tương đương với bao nhiêu?",
    options: [
      { id: "opt-1", label: "10.000 (Mười nghìn)", isCorrect: true },
      { id: "opt-2", label: "1.000 (Một nghìn)", isCorrect: false },
      { id: "opt-3", label: "100.000 (Một trăm nghìn)", isCorrect: false },
      { id: "opt-4", label: "1.000.000 (Một triệu)", isCorrect: false },
    ],
    explanationVi:
      "Hệ thống số tiếng Nhật nhóm 4 số 0 một lần: 1 Vạn (一万) = 10.000. Do đó, 100.000 = 10 vạn (十万) và 1.000.000 = 100 vạn (百万).",
  },
  {
    id: "npq-3",
    category: "counter",
    prompt: "Để đếm '2 người', người Nhật bắt buộc dùng từ nào?",
    options: [
      { id: "opt-1", label: "ふたり (futari)", sublabel: "Cách đọc thuần Nhật bất quy tắc", isCorrect: true },
      { id: "opt-2", label: "ににん (ninin)", isCorrect: false },
      { id: "opt-3", label: "ふたつ (futatsu)", sublabel: "Đây là 2 cái đồ vật", isCorrect: false },
      { id: "opt-4", label: "りょうにん (ryounin)", isCorrect: false },
    ],
    explanationVi:
      "1 người là ひとり (hitori) và 2 người là ふたり (futari) - đây là hai từ thuần Nhật bất quy tắc bắt buộc thuộc lòng, không dùng 'ninin'.",
  },
  {
    id: "npq-4",
    category: "date",
    prompt: "Ngày mùng 4 trong tháng được phát âm là:",
    options: [
      { id: "opt-1", label: "よっか (yokka)", sublabel: "Có âm ngắt sokuon", isCorrect: true },
      { id: "opt-2", label: "よんにち (yonnichi)", isCorrect: false },
      { id: "opt-3", label: "いつか (itsuka)", sublabel: "Đây là ngày mùng 5", isCorrect: false },
      { id: "opt-4", label: "しにち (shinichi)", isCorrect: false },
    ],
    explanationVi:
      "Mùng 4 là よっか (yokka). Tương tự ngày 14 là じゅうよっか (juuyokka) và ngày 24 là にじゅうよっか (nijuuyokka).",
  },
  {
    id: "npq-5",
    category: "time",
    prompt: "Đồng hồ chỉ '4 giờ đúng', tiếng Nhật đọc là:",
    options: [
      { id: "opt-1", label: "よじ (yoji)", isCorrect: true },
      { id: "opt-2", label: "しじ (shiji)", isCorrect: false },
      { id: "opt-3", label: "よんじ (yonji)", isCorrect: false },
      { id: "opt-4", label: "よんじかん (yonjikan)", sublabel: "Đây là 4 tiếng đồng hồ (thời lượng)", isCorrect: false },
    ],
    explanationVi:
      "4 giờ là よじ (yoji). Tương tự 7 giờ là しちじ (shichiji) và 9 giờ là くじ (kuji).",
  },
  {
    id: "npq-6",
    category: "counter",
    prompt: "Khi đếm '3 chai nước suối', ta dùng lượng từ 〜本 với cách đọc nào?",
    options: [
      { id: "opt-1", label: "さんぼん (sanbon)", sublabel: "Biến âm đục bon", isCorrect: true },
      { id: "opt-2", label: "さんほん (sanhon)", isCorrect: false },
      { id: "opt-3", label: "さんぽん (sanpon)", isCorrect: false },
      { id: "opt-4", label: "みっほん (mihhon)", isCorrect: false },
    ],
    explanationVi:
      "Lượng từ 〜本 khi đi với số 3 sẽ bị đục hóa thành 'bon': さんぼん (sanbon). 1, 6, 8, 10 đọc là 'pon' (ippon, roppon, happon, juppon).",
  },
  {
    id: "npq-7",
    category: "sound-change",
    prompt: "Thứ Sáu trong tuần trong tiếng Nhật mang ý nghĩa nguyên tố nào?",
    options: [
      { id: "opt-1", label: "Kim (Vàng / Tiền) - 金曜日 (きんようび)", isCorrect: true },
      { id: "opt-2", label: "Hỏa (Lửa) - 火曜日", isCorrect: false },
      { id: "opt-3", label: "Thủy (Nước) - 水曜日", isCorrect: false },
      { id: "opt-4", label: "Mộc (Cây cối) - 木曜日", isCorrect: false },
    ],
    explanationVi:
      "Thứ Sáu là 金曜日 (kinyoubi - Kim tinh / Vàng bạc). Thứ Bảy là 土曜日 (Thổ - Đất) và Chủ Nhật là 日曜日 (Nhật - Mặt trời).",
  },
  {
    id: "npq-8",
    category: "date",
    prompt: "Ngày 20 trong tháng có cách đọc đặc biệt là:",
    options: [
      { id: "opt-1", label: "はつか (hatsuka)", sublabel: "Cách đọc thuần Nhật", isCorrect: true },
      { id: "opt-2", label: "にじゅうにち (nijuunichi)", isCorrect: false },
      { id: "opt-3", label: "にじゅうか (nijuuka)", isCorrect: false },
      { id: "opt-4", label: "はたち (hatachi)", sublabel: "Đây là 20 tuổi", isCorrect: false },
    ],
    explanationVi:
      "Ngày 20 là はつか (hatsuka). Đừng nhầm lẫn với 20 tuổi là はたち (hatachi)!",
  },
];
