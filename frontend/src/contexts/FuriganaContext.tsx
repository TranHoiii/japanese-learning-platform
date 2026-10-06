import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { vocabularyApi } from "../services/vocabularyApi";
import { kanjiApi } from "../services/kanjiApi";

export type FuriganaMode = "hover" | "always" | "off";

export interface KanjiWordEntry {
  term: string;
  reading: string;
  hanViet?: string | null;
  meaning?: string | null;
  audioUrl?: string | null;
}

interface FuriganaContextType {
  mode: FuriganaMode;
  setMode: (mode: FuriganaMode) => void;
  lookupWord: (word: string) => KanjiWordEntry | null;
  dictionary: Map<string, KanjiWordEntry>;
  sortedTerms: string[];
  isLoaded: boolean;
}

// Built-in offline N5 core vocabulary & Kanji database
// Loaded immediately for 0ms initial render latency
const BUILT_IN_DICTIONARY: Record<string, KanjiWordEntry> = {
  // Đại từ & nhân xưng
  私: { term: "私", reading: "わたし", hanViet: "TƯ", meaning: "Tôi" },
  貴方: { term: "貴方", reading: "あなた", hanViet: "QUÝ PHƯƠNG", meaning: "Bạn" },
  あの人: { term: "あの人", reading: "あのひと", hanViet: "NHÂN", meaning: "Người kia" },
  あの方: { term: "あの方", reading: "あのかた", hanViet: "PHƯƠNG", meaning: "Vị kia (lịch sự)" },
  人: { term: "人", reading: "ひと", hanViet: "NHÂN", meaning: "Người" },
  先生: { term: "先生", reading: "せんせい", hanViet: "TIÊN SINH", meaning: "Thầy/cô giáo" },
  教師: { term: "教師", reading: "きょうし", hanViet: "GIÁO SƯ", meaning: "Giáo viên" },
  学生: { term: "学生", reading: "がくせい", hanViet: "HỌC SINH", meaning: "Học sinh, sinh viên" },
  会社員: { term: "会社員", reading: "かいしゃいん", hanViet: "HỘI XÃ VIÊN", meaning: "Nhân viên công ty" },
  社員: { term: "社員", reading: "しゃいん", hanViet: "XÃ VIÊN", meaning: "Nhân viên" },
  銀行員: { term: "銀行員", reading: "ぎんこういん", hanViet: "NGÂN HÀNG VIÊN", meaning: "Nhân viên ngân hàng" },
  医者: { term: "医者", reading: "いしゃ", hanViet: "Y GIẢ", meaning: "Bác sĩ" },
  研究者: { term: "研究者", reading: "けんきゅうしゃ", hanViet: "NGHIÊN CỨU GIẢ", meaning: "Nhà nghiên cứu" },
  大学: { term: "大学", reading: "だいがく", hanViet: "ĐẠI HỌC", meaning: "Trường đại học" },
  病院: { term: "病院", reading: "びょういん", hanViet: "BỆNH VIỆN", meaning: "Bệnh viện" },
  誰: { term: "誰", reading: "だれ", hanViet: "THÙY", meaning: "Ai" },
  歳: { term: "歳", reading: "さい", hanViet: "TUẾ", meaning: "Tuổi" },
  何歳: { term: "何歳", reading: "なんさい", hanViet: "HÀ TUẾ", meaning: "Mấy tuổi" },
  何: { term: "何", reading: "なに", hanViet: "HÀ", meaning: "Cái gì" },
  何時: { term: "何時", reading: "なんじ", hanViet: "HÀ THỜI", meaning: "Mấy giờ" },
  何分: { term: "何分", reading: "なんぷん", hanViet: "HÀ PHÂN", meaning: "Mấy phút" },
  何曜日: { term: "何曜日", reading: "なんようび", hanViet: "HÀ DIỆU NHẬT", meaning: "Thứ mấy" },

  // Quốc gia & ngôn ngữ
  日本: { term: "日本", reading: "にほん", hanViet: "NHẬT BẢN", meaning: "Nước Nhật" },
  日本人: { term: "日本人", reading: "にほんじん", hanViet: "NHẬT BẢN NHÂN", meaning: "Người Nhật" },
  日本語: { term: "日本語", reading: "にほんご", hanViet: "NHẬT BẢN NGỮ", meaning: "Tiếng Nhật" },
  英語: { term: "英語", reading: "えいご", hanViet: "ANH NGỮ", meaning: "Tiếng Anh" },
  中国: { term: "中国", reading: "ちゅうごく", hanViet: "TRUNG QUỐC", meaning: "Trung Quốc" },
  韓国: { term: "韓国", reading: "かんこく", hanViet: "HÀN QUỐC", meaning: "Hàn Quốc" },

  // Tên người phổ biến trong sách Minna
  田中: { term: "田中", reading: "たなか", hanViet: "ĐIỀN TRUNG", meaning: "Tanaka (Họ người Nhật)" },
  山田: { term: "山田", reading: "やまだ", hanViet: "SƠN ĐIỀN", meaning: "Yamada (Họ người Nhật)" },
  佐藤: { term: "佐藤", reading: "さとう", hanViet: "TÁ ĐẰNG", meaning: "Satou (Họ người Nhật)" },
  鈴木: { term: "鈴木", reading: "すずき", hanViet: "LINH MỘC", meaning: "Suzuki (Họ người Nhật)" },
  高橋: { term: "高橋", reading: "たかはし", hanViet: "CAO KIỀU", meaning: "Takahashi (Họ người Nhật)" },
  木村: { term: "木村", reading: "きむら", hanViet: "MỘC THÔN", meaning: "Kimura (Họ người Nhật)" },
  林: { term: "林", reading: "はやし", hanViet: "LÂM", meaning: "Hayashi (Họ người Nhật)" },

  // Đồ vật & địa điểm
  本: { term: "本", reading: "ほん", hanViet: "BẢN", meaning: "Sách" },
  辞書: { term: "辞書", reading: "じしょ", hanViet: "TỪ THƯ", meaning: "Từ điển" },
  雑誌: { term: "雑誌", reading: "ざっし", hanViet: "TẠP CHÍ", meaning: "Tạp chí" },
  新聞: { term: "新聞", reading: "しんぶん", hanViet: "TÂN VĂN", meaning: "Báo chí" },
  手帳: { term: "手帳", reading: "てちょう", hanViet: "THỦ TRƯỚNG", meaning: "Sổ tay" },
  名刺: { term: "名刺", reading: "めいし", hanViet: "DANH THỨC", meaning: "Danh thiếp" },
  車: { term: "車", reading: "くるま", hanViet: "XA", meaning: "Xe hơi, ô tô" },
  自動車: { term: "自動車", reading: "じどうしゃ", hanViet: "TỰ ĐỘNG XA", meaning: "Ô tô, xe hơi" },
  机: { term: "机", reading: "つくえ", hanViet: "CƠ", meaning: "Bàn học/làm việc" },
  椅子: { term: "椅子", reading: "いす", hanViet: "Y TỬ", meaning: "Ghế" },
  時計: { term: "時計", reading: "とけい", hanViet: "THỜI KẾ", meaning: "Đồng hồ" },
  傘: { term: "傘", reading: "かさ", hanViet: "TÁN", meaning: "Cây dù / Ô" },
  鞄: { term: "鞄", reading: "かばん", hanViet: "BAO", meaning: "Cặp xách, túi xách" },
  手紙: { term: "手紙", reading: "てがみ", hanViet: "THỦ CHỈ", meaning: "Bức thư" },
  写真: { term: "写真", reading: "しゃしん", hanViet: "TẢ CHÂN", meaning: "Bức ảnh" },
  切手: { term: "切手", reading: "きって", hanViet: "THIẾT THỦ", meaning: "Con tem" },
  荷物: { term: "荷物", reading: "にもつ", hanViet: "HÀ VẬT", meaning: "Hành lý" },
  お金: { term: "お金", reading: "おかね", hanViet: "KIM", meaning: "Tiền" },
  教室: { term: "教室", reading: "きょうしつ", hanViet: "GIÁO THẤT", meaning: "Phòng học" },
  食堂: { term: "食堂", reading: "しょくどう", hanViet: "THỰC ĐƯỜNG", meaning: "Nhà ăn" },
  事務所: { term: "事務所", reading: "じむしょ", hanViet: "SỰ VỤ SỞ", meaning: "Văn phòng" },
  会議室: { term: "会議室", reading: "かいぎしつ", hanViet: "HỘI NGHỊ THẤT", meaning: "Phòng họp" },
  受付: { term: "受付", reading: "うけつけ", hanViet: "THỤ PHÓ", meaning: "Quầy tiếp tân" },
  部屋: { term: "部屋", reading: "へや", hanViet: "BỘ ỐC", meaning: "Căn phòng" },
  会社: { term: "会社", reading: "かいしゃ", hanViet: "HỘI XÃ", meaning: "Công ty" },
  家: { term: "家", reading: "うち", hanViet: "GIA", meaning: "Nhà" },
  国: { term: "国", reading: "くに", hanViet: "QUỐC", meaning: "Đất nước" },
  売場: { term: "売場", reading: "うりば", hanViet: "MẠI TRƯỜNG", meaning: "Quầy bán hàng" },
  階: { term: "階", reading: "かい", hanViet: "GIAI", meaning: "Tầng" },
  円: { term: "円", reading: "えん", hanViet: "YÊN", meaning: "Yên Nhật" },
  百: { term: "百", reading: "ひゃく", hanViet: "BÁCH", meaning: "Một trăm" },
  千: { term: "千", reading: "せん", hanViet: "THIÊN", meaning: "Một nghìn" },
  万: { term: "万", reading: "まん", hanViet: "VẠN", meaning: "Mười nghìn" },

  // Thời gian
  今: { term: "今", reading: "いま", hanViet: "KIM", meaning: "Bây giờ" },
  時: { term: "時", reading: "じ", hanViet: "THỜI", meaning: "Giờ" },
  分: { term: "分", reading: "ふん", hanViet: "PHÂN", meaning: "Phút" },
  半: { term: "半", reading: "はん", hanViet: "BÁN", meaning: "Rưỡi / Nửa" },
  午前: { term: "午前", reading: "ごぜん", hanViet: "NGỌ TIỀN", meaning: "Buổi sáng (AM)" },
  午後: { term: "午後", reading: "ごご", hanViet: "NGỌ HẬU", meaning: "Buổi chiều (PM)" },
  朝: { term: "朝", reading: "あさ", hanViet: "TRIÊU", meaning: "Buổi sáng" },
  昼: { term: "昼", reading: "ひる", hanViet: "TRÚ", meaning: "Buổi trưa" },
  晩: { term: "晩", reading: "ばん", hanViet: "VÃN", meaning: "Buổi tối" },
  夜: { term: "夜", reading: "よる", hanViet: "DẠ", meaning: "Ban đêm" },
  今日: { term: "今日", reading: "きょう", hanViet: "KIM NHẬT", meaning: "Hôm nay" },
  明日: { term: "明日", reading: "あした", hanViet: "MINH NHẬT", meaning: "Ngày mai" },
  昨日: { term: "昨日", reading: "きのう", hanViet: "TÁC NHẬT", meaning: "Hôm qua" },
  毎朝: { term: "毎朝", reading: "まいあさ", hanViet: "MỖI TRIÊU", meaning: "Mỗi sáng" },
  毎晩: { term: "毎晩", reading: "まいばん", hanViet: "MỖI VÃN", meaning: "Mỗi tối" },
  毎日: { term: "毎日", reading: "まいにち", hanViet: "MỖI NHẬT", meaning: "Mỗi ngày" },
  月曜日: { term: "月曜日", reading: "げつようび", hanViet: "NGUYỆT DIỆU NHẬT", meaning: "Thứ Hai" },
  火曜日: { term: "火曜日", reading: "かようび", hanViet: "HỎA DIỆU NHẬT", meaning: "Thứ Ba" },
  水曜日: { term: "水曜日", reading: "すいようび", hanViet: "THỦY DIỆU NHẬT", meaning: "Thứ Tư" },
  木曜日: { term: "木曜日", reading: "もくようび", hanViet: "MỘC DIỆU NHẬT", meaning: "Thứ Năm" },
  金曜日: { term: "金曜日", reading: "きんようび", hanViet: "KIM DIỆU NHẬT", meaning: "Thứ Sáu" },
  土曜日: { term: "土曜日", reading: "どようび", hanViet: "THỔ DIỆU NHẬT", meaning: "Thứ Bảy" },
  日曜日: { term: "日曜日", reading: "にちようび", hanViet: "NHẬT DIỆU NHẬT", meaning: "Chủ Nhật" },

  // Động từ cơ bản (cả dạng thể ます và thể từ điển)
  起きます: { term: "起きます", reading: "おきます", hanViet: "KHỞI", meaning: "Thức dậy" },
  起きる: { term: "起きる", reading: "おきる", hanViet: "KHỞI", meaning: "Thức dậy" },
  寝ます: { term: "寝ます", reading: "ねます", hanViet: "TẨM", meaning: "Đi ngủ" },
  寝る: { term: "寝る", reading: "ねる", hanViet: "TẨM", meaning: "Đi ngủ" },
  働きます: { term: "働きます", reading: "はたらきます", hanViet: "ĐỘNG", meaning: "Làm việc" },
  働く: { term: "働く", reading: "はたらく", hanViet: "ĐỘNG", meaning: "Làm việc" },
  休みます: { term: "休みます", reading: "やすみます", hanViet: "HƯU", meaning: "Nghỉ ngơi" },
  休む: { term: "休む", reading: "やすむ", hanViet: "HƯU", meaning: "Nghỉ ngơi" },
  勉強します: { term: "勉強します", reading: "べんきょうします", hanViet: "MIỄN CƯỠNG", meaning: "Học tập" },
  勉強: { term: "勉強", reading: "べんきょう", hanViet: "MIỄN CƯỠNG", meaning: "Học tập" },
  終わります: { term: "終わります", reading: "おわります", hanViet: "CHUNG", meaning: "Kết thúc" },
  終わる: { term: "終わる", reading: "おわる", hanViet: "CHUNG", meaning: "Kết thúc" },
  行きます: { term: "行きます", reading: "いきます", hanViet: "HÀNH", meaning: "Đi" },
  行く: { term: "行く", reading: "いく", hanViet: "HÀNH", meaning: "Đi" },
  来ます: { term: "来ます", reading: "きます", hanViet: "LAI", meaning: "Đến" },
  来る: { term: "来る", reading: "くる", hanViet: "LAI", meaning: "Đến" },
  帰ります: { term: "帰ります", reading: "かえります", hanViet: "QUY", meaning: "Về" },
  帰る: { term: "帰る", reading: "かえる", hanViet: "QUY", meaning: "Về" },
  食べます: { term: "食べます", reading: "たべます", hanViet: "THỰC", meaning: "Ăn" },
  食べる: { term: "食べる", reading: "たべる", hanViet: "THỰC", meaning: "Ăn" },
  飲みます: { term: "飲みます", reading: "のみます", hanViet: "ẨM", meaning: "Uống" },
  飲む: { term: "飲む", reading: "のむ", hanViet: "ẨM", meaning: "Uống" },
  見ます: { term: "見ます", reading: "みます", hanViet: "KIẾN", meaning: "Xem, nhìn" },
  見る: { term: "見る", reading: "みる", hanViet: "KIẾN", meaning: "Xem, nhìn" },
  聞きます: { term: "聞きます", reading: "ききます", hanViet: "VĂN", meaning: "Nghe" },
  聞く: { term: "聞く", reading: "きく", hanViet: "VĂN", meaning: "Nghe" },
  読みます: { term: "読みます", reading: "よみます", hanViet: "ĐỘC", meaning: "Đọc" },
  読む: { term: "読む", reading: "よむ", hanViet: "ĐỘC", meaning: "Đọc" },
  書きます: { term: "書きます", reading: "かきます", hanViet: "THƯ", meaning: "Viết" },
  書く: { term: "書く", reading: "かく", hanViet: "THƯ", meaning: "Viết" },
  買います: { term: "買います", reading: "かいます", hanViet: "MÃI", meaning: "Mua" },
  買う: { term: "買う", reading: "かう", hanViet: "MÃI", meaning: "Mua" },
  撮ります: { term: "撮ります", reading: "とります", hanViet: "TOÁT", meaning: "Chụp ảnh" },
  撮る: { term: "撮る", reading: "とる", hanViet: "TOÁT", meaning: "Chụp ảnh" },
  会います: { term: "会います", reading: "あいます", hanViet: "HỘI", meaning: "Gặp gỡ" },
  会う: { term: "会う", reading: "あう", hanViet: "HỘI", meaning: "Gặp gỡ" },
  切ります: { term: "切ります", reading: "きります", hanViet: "THIẾT", meaning: "Cắt" },
  切る: { term: "切る", reading: "きる", hanViet: "THIẾT", meaning: "Cắt" },
  送ります: { term: "送ります", reading: "おくります", hanViet: "TỐNG", meaning: "Gửi đi" },
  送る: { term: "送る", reading: "おくる", hanViet: "TỐNG", meaning: "Gửi đi" },
  貸します: { term: "貸します", reading: "かします", hanViet: "THẢI", meaning: "Cho mượn" },
  貸す: { term: "貸す", reading: "かす", hanViet: "THẢI", meaning: "Cho mượn" },
  借ります: { term: "借ります", reading: "かります", hanViet: "TÁ", meaning: "Vay, mượn" },
  借りる: { term: "借りる", reading: "かりる", hanViet: "TÁ", meaning: "Vay, mượn" },
  教えます: { term: "教えます", reading: "おしえます", hanViet: "GIÁO", meaning: "Dạy, hướng dẫn" },
  教える: { term: "教える", reading: "おしえる", hanViet: "GIÁO", meaning: "Dạy, hướng dẫn" },
  習います: { term: "習います", reading: "ならいます", hanViet: "TẬP", meaning: "Học tập" },
  習う: { term: "習う", reading: "ならう", hanViet: "TẬP", meaning: "Học tập" },
  友達: { term: "友達", reading: "ともだち", hanViet: "HỮU ĐẠT", meaning: "Bạn bè" },
  電話: { term: "電話", reading: "でんわ", hanViet: "ĐIỆN THOẠI", meaning: "Điện thoại" },
  京都: { term: "京都", reading: "きょうと", hanViet: "KINH ĐÔ", meaning: "Kyoto" },
  東京: { term: "東京", reading: "とうきょう", hanViet: "ĐÔNG KINH", meaning: "Tokyo" },
  大阪: { term: "大阪", reading: "おおさか", hanViet: "ĐẠI PHẢN", meaning: "Osaka" },

  // Chữ Kanji đơn lẻ cơ bản
  一: { term: "一", reading: "いち", hanViet: "NHẤT", meaning: "Một (Số 1)" },
  二: { term: "二", reading: "に", hanViet: "NHỊ", meaning: "Hai (Số 2)" },
  三: { term: "三", reading: "さん", hanViet: "TAM", meaning: "Ba (Số 3)" },
  四: { term: "四", reading: "よん", hanViet: "TỨ", meaning: "Bốn (Số 4)" },
  五: { term: "五", reading: "ご", hanViet: "NGŨ", meaning: "Năm (Số 5)" },
  六: { term: "六", reading: "ろく", hanViet: "LỤC", meaning: "Sáu (Số 6)" },
  七: { term: "七", reading: "なな", hanViet: "THẤT", meaning: "Bảy (Số 7)" },
  八: { term: "八", reading: "はち", hanViet: "BÁT", meaning: "Tám (Số 8)" },
  九: { term: "九", reading: "きゅう", hanViet: "CỬU", meaning: "Chín (Số 9)" },
  十: { term: "十", reading: "じゅう", hanViet: "THẬP", meaning: "Mười (Số 10)" },
  日: { term: "日", reading: "にち", hanViet: "NHẬT", meaning: "Ngày, mặt trời" },
  月: { term: "月", reading: "つき", hanViet: "NGUYỆT", meaning: "Tháng, mặt trăng" },
  火: { term: "火", reading: "ひ", hanViet: "HỎA", meaning: "Lửa" },
  水: { term: "水", reading: "みず", hanViet: "THỦY", meaning: "Nước" },
  木: { term: "木", reading: "き", hanViet: "MỘC", meaning: "Cây, gỗ" },
  金: { term: "金", reading: "きん", hanViet: "KIM", meaning: "Vàng, tiền" },
  土: { term: "土", reading: "つち", hanViet: "THỔ", meaning: "Đất" },
  山: { term: "山", reading: "やま", hanViet: "SƠN", meaning: "Núi" },
  川: { term: "川", reading: "かわ", hanViet: "XUYÊN", meaning: "Sông" },
  田: { term: "田", reading: "た", hanViet: "ĐIỀN", meaning: "Ruộng" },
  上: { term: "上", reading: "うえ", hanViet: "THƯỢNG", meaning: "Ở trên" },
  下: { term: "下", reading: "した", hanViet: "HẠ", meaning: "Ở dưới" },
  前: { term: "前", reading: "まえ", hanViet: "TIỀN", meaning: "Phía trước" },
  後: { term: "後", reading: "うしろ", hanViet: "HẬU", meaning: "Phía sau" },
  中: { term: "中", reading: "なか", hanViet: "TRUNG", meaning: "Bên trong, ở giữa" },
  右: { term: "右", reading: "みぎ", hanViet: "HỮU", meaning: "Bên phải" },
  左: { term: "左", reading: "ひだり", hanViet: "TẢ", meaning: "Bên trái" },
  外: { term: "外", reading: "そと", hanViet: "NGOẠI", meaning: "Bên ngoài" },
  男: { term: "男", reading: "おとこ", hanViet: "NAM", meaning: "Nam giới" },
  女: { term: "女", reading: "おんな", hanViet: "NỮ", meaning: "Nữ giới" },
  子: { term: "子", reading: "こ", hanViet: "TỬ", meaning: "Đứa trẻ" },
  父: { term: "父", reading: "ちち", hanViet: "PHỤ", meaning: "Bố" },
  母: { term: "母", reading: "はは", hanViet: "MẪU", meaning: "Mẹ" },
  友: { term: "友", reading: "とも", hanViet: "HỮU", meaning: "Bạn" },
  魚: { term: "魚", reading: "さかな", hanViet: "NGƯ", meaning: "Con cá" },
  肉: { term: "肉", reading: "にく", hanViet: "NHỤC", meaning: "Thịt" },
  茶: { term: "茶", reading: "ちゃ", hanViet: "TRÀ", meaning: "Trà" },
};

const FuriganaContext = createContext<FuriganaContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "jp_furigana_display_mode";

export const FuriganaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Mode: "hover" (default, furigana on hover), "always", "off"
  const [mode, setModeState] = useState<FuriganaMode>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved === "always" || saved === "off" || saved === "hover") {
      return saved;
    }
    return "hover"; // Mặc định là hover theo đúng yêu cầu người dùng
  });

  const setMode = useCallback((newMode: FuriganaMode) => {
    setModeState(newMode);
    localStorage.setItem(LOCAL_STORAGE_KEY, newMode);
  }, []);

  // In-memory dictionary
  const [dictionary, setDictionary] = useState<Map<string, KanjiWordEntry>>(() => {
    const initialMap = new Map<string, KanjiWordEntry>();
    Object.entries(BUILT_IN_DICTIONARY).forEach(([k, v]) => {
      initialMap.set(k, v);
    });
    return initialMap;
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Load full vocabularies & kanjis in background from backend
  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      try {
        const [vocabList, kanjiPage] = await Promise.allSettled([
          vocabularyApi.getAllVocabularies(),
          kanjiApi.getAllKanjis(0, 100),
        ]);

        if (isCancelled) return;

        setDictionary((prevMap) => {
          const nextMap = new Map(prevMap);

          // 1. Ingest vocabularies
          if (vocabList.status === "fulfilled" && Array.isArray(vocabList.value)) {
            vocabList.value.forEach((v) => {
              if (v.kanji) {
                // Clean term (remove ~ prefix/suffix if any)
                const cleanKanji = v.kanji.replace(/^[～~]/, "").replace(/[～~]$/, "").trim();
                const cleanReading = v.hiragana.replace(/\s+/g, "").trim();

                if (cleanKanji) {
                  // Only add if not already present or if more specific
                  if (!nextMap.has(cleanKanji) || !nextMap.get(cleanKanji)?.meaning) {
                    nextMap.set(cleanKanji, {
                      term: cleanKanji,
                      reading: cleanReading,
                      hanViet: v.hanViet,
                      meaning: v.meaning,
                      audioUrl: v.audioUrl,
                    });
                  }
                }
              }
            });
          }

          // 2. Ingest kanjis
          if (kanjiPage.status === "fulfilled" && kanjiPage.value?.content) {
            kanjiPage.value.content.forEach((k) => {
              if (k.kanji && !nextMap.has(k.kanji)) {
                // Use primary kunyomi or onyomi for single kanji reading
                const reading = (k.kunyomi || k.onyomi || "").split(",")[0].trim();
                nextMap.set(k.kanji, {
                  term: k.kanji,
                  reading,
                  hanViet: k.hanViet,
                  meaning: k.meaning,
                });
              }

              // Also add compounds if available
              if (k.compounds && Array.isArray(k.compounds)) {
                k.compounds.forEach((c) => {
                  if (c.word && !nextMap.has(c.word)) {
                    nextMap.set(c.word, {
                      term: c.word,
                      reading: c.reading,
                      meaning: c.meaning,
                      hanViet: null,
                    });
                  }
                });
              }
            });
          }

          return nextMap;
        });

        setIsLoaded(true);
      } catch (err) {
        console.warn("Could not load supplementary dictionary from backend, using built-in:", err);
      }
    }

    loadData();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Pre-sort dictionary terms by length descending for longest-match parsing
  const sortedTerms = useMemo(() => {
    return Array.from(dictionary.keys()).sort((a, b) => b.length - a.length);
  }, [dictionary]);

  const lookupWord = useCallback(
    (word: string): KanjiWordEntry | null => {
      return dictionary.get(word) || null;
    },
    [dictionary]
  );

  return (
    <FuriganaContext.Provider
      value={{
        mode,
        setMode,
        lookupWord,
        dictionary,
        sortedTerms,
        isLoaded,
      }}
    >
      {children}
    </FuriganaContext.Provider>
  );
};

export const useFurigana = (): FuriganaContextType => {
  const context = useContext(FuriganaContext);
  if (!context) {
    // Return a safe fallback if used outside provider
    return {
      mode: "hover",
      setMode: () => {},
      lookupWord: (word: string) => BUILT_IN_DICTIONARY[word] || null,
      dictionary: new Map(Object.entries(BUILT_IN_DICTIONARY)),
      sortedTerms: Object.keys(BUILT_IN_DICTIONARY).sort((a, b) => b.length - a.length),
      isLoaded: true,
    };
  }
  return context;
};
