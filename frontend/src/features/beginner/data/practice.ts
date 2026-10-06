import {
  PracticeModeCard,
  PracticeQuestion,
  PracticeCategory,
} from "../types/practice";

export const PRACTICE_MODES: PracticeModeCard[] = [
  {
    id: "hiragana",
    titleVi: "Luyện chữ mềm Hiragana",
    icon: "あ",
    descriptionVi: "Nhận diện 46 chữ cái cơ bản, biến âm dakuten, âm ghép yōon và các cặp chữ dễ nhầm.",
    badgeVi: "Căn bản",
    targetCount: 10,
  },
  {
    id: "katakana",
    titleVi: "Luyện chữ cứng Katakana",
    icon: "ア",
    descriptionVi: "Phân biệt các cặp chữ dễ nhầm (Shi/Tsu, So/N), từ mượn ngoại lai và âm mở rộng.",
    badgeVi: "Từ mượn",
    targetCount: 10,
  },
  {
    id: "pronunciation",
    titleVi: "Quy tắc ngữ âm & Phát âm",
    icon: "🗣️",
    descriptionVi: "Trường âm, âm ngắt, âm mũi, âm つ, vô thanh hóa nguyên âm và trọng âm cao độ Tokyo.",
    badgeVi: "Ngữ âm",
    targetCount: 10,
  },
  {
    id: "numbers",
    titleVi: "Số đếm & Lượng từ phản xạ",
    icon: "🔢",
    descriptionVi: "Đếm đồ vật chung (~つ), đếm người, ngày trong tháng, giờ giấc và các biến âm đặc thù.",
    badgeVi: "Ứng dụng",
    targetCount: 10,
  },
  {
    id: "mixed",
    titleVi: "Thử thách tổng hợp",
    icon: "⚡",
    descriptionVi: "Trộn ngẫu nhiên câu hỏi từ cả 4 chuyên đề sơ cấp để rèn luyện phản xạ toàn diện.",
    badgeVi: "Tổng hợp",
    targetCount: 15,
  },
];

export const INITIAL_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // ==========================================
  // 1. HIRAGANA QUESTIONS
  // ==========================================
  {
    id: "q-h-1",
    category: "hiragana",
    type: "character-recognition",
    prompt: "Chữ cái Hiragana sau đây đọc là gì?",
    promptKana: "あ",
    options: [
      { id: "opt-1", label: "a", isCorrect: true },
      { id: "opt-2", label: "o", isCorrect: false },
      { id: "opt-3", label: "u", isCorrect: false },
      { id: "opt-4", label: "e", isCorrect: false },
    ],
    explanationVi:
      "Chữ あ có âm đọc là 'a'. Đừng nhầm lẫn với お (o) vì nét uốn vòng phía dưới khác nhau.",
    audioUrl: null,
  },
  {
    id: "q-h-2",
    category: "hiragana",
    type: "character-recognition",
    prompt: "Từ 'hoa anh đào' trong tiếng Nhật được viết bằng Hiragana là:",
    promptRomaji: "sakura",
    options: [
      { id: "opt-1", label: "さくら", isCorrect: true },
      { id: "opt-2", label: "きくら", isCorrect: false },
      { id: "opt-3", label: "ちくら", isCorrect: false },
      { id: "opt-4", label: "さくり", isCorrect: false },
    ],
    explanationVi:
      "Sakura gồm 3 chữ cái: さ (sa), く (ku), ら (ra).",
    audioUrl: null,
  },
  {
    id: "q-h-3",
    category: "hiragana",
    type: "sound-group",
    prompt: "Chữ Hiragana nào sau đây là 'biến âm đục' có dấu ten-ten (゛)?",
    options: [
      { id: "opt-1", label: "が (ga)", isCorrect: true },
      { id: "opt-2", label: "ぱ (pa)", sublabel: "Dấu tròn maru là bán đục", isCorrect: false },
      { id: "opt-3", label: "か (ka)", isCorrect: false },
      { id: "opt-4", label: "は (ha)", isCorrect: false },
    ],
    explanationVi:
      "が (ga) là biến âm đục của か (ka) khi thêm dấu ten-ten. Còn ぱ (pa) là bán đục âm với dấu tròn maru.",
    audioUrl: null,
  },
  {
    id: "q-h-4",
    category: "hiragana",
    type: "confused-kana",
    prompt: "Phân biệt hai chữ dễ nhầm: Chữ nào sau đây là chữ 'sa' (さ)?",
    options: [
      { id: "opt-1", label: "さ", sublabel: "Chỉ có 1 gạch ngang", isCorrect: true },
      { id: "opt-2", label: "き", sublabel: "Có 2 gạch ngang song song", isCorrect: false },
      { id: "opt-3", label: "ち", sublabel: "Số 5 ngược", isCorrect: false },
      { id: "opt-4", label: "ら", isCorrect: false },
    ],
    explanationVi:
      "さ chỉ có 1 nét gạch ngang (ly nước 1 ống hút). き có 2 nét gạch ngang (chiếc chìa khóa 2 răng).",
    audioUrl: null,
  },
  {
    id: "q-h-5",
    category: "hiragana",
    type: "confused-kana",
    prompt: "Chữ Hiragana nào sau đây là chữ 'nu' (ぬ)?",
    options: [
      { id: "opt-1", label: "ぬ", sublabel: "Có vòng xoắn tròn ở đuôi", isCorrect: true },
      { id: "opt-2", label: "め", sublabel: "Đuôi thả tự nhiên (đôi mắt)", isCorrect: false },
      { id: "opt-3", label: "ね", sublabel: "Chữ Ne (con mèo)", isCorrect: false },
      { id: "opt-4", label: "れ", isCorrect: false },
    ],
    explanationVi:
      "ぬ có vòng tròn thắt nút ở đuôi (như sợi mì ramen). Chữ め đuôi buông lỏng tự nhiên (như khóe mắt me).",
    audioUrl: null,
  },
  {
    id: "q-h-6",
    category: "hiragana",
    type: "confused-kana",
    prompt: "Chữ cái Hiragana sau đây đọc là gì?",
    promptKana: "ほ",
    options: [
      { id: "opt-1", label: "ho", sublabel: "Nét dọc KHÔNG nhô lên trên", isCorrect: true },
      { id: "opt-2", label: "ha (は)", sublabel: "Chỉ có 1 nét gạch ngang", isCorrect: false },
      { id: "opt-3", label: "ma (ま)", sublabel: "Nét dọc nhô lên trên đầu", isCorrect: false },
      { id: "opt-4", label: "yo (よ)", isCorrect: false },
    ],
    explanationVi:
      "ほ (ho) có 2 gạch ngang và nét dọc không nhô lên đầu (đội mũ). は (ha) chỉ có 1 gạch ngang. ま (ma) có nét dọc nhô thẳng lên đỉnh đầu.",
    audioUrl: null,
  },
  {
    id: "q-h-7",
    category: "hiragana",
    type: "character-recognition",
    prompt: "Âm ghép (Yōon) 'kyo' được viết bằng chữ Hiragana nào?",
    options: [
      { id: "opt-1", label: "きょ", sublabel: "き ghép với ょ nhỏ", isCorrect: true },
      { id: "opt-2", label: "きよ", sublabel: "よ viết to bình thường (2 phách)", isCorrect: false },
      { id: "opt-3", label: "ぎょ", sublabel: "Đây là gyo (có ten-ten)", isCorrect: false },
      { id: "opt-4", label: "しょ", sublabel: "Đây là sho", isCorrect: false },
    ],
    explanationVi:
      "きょ (kyo) kết hợp き với ょ viết nhỏ bằng 1/4 kích cỡ bình thường, tạo thành 1 phách duy nhất.",
    audioUrl: null,
  },
  {
    id: "q-h-8",
    category: "hiragana",
    type: "romaji-to-kana",
    prompt: "Từ 'con mèo' (neko) trong tiếng Nhật được viết là:",
    promptRomaji: "neko",
    options: [
      { id: "opt-1", label: "ねこ", isCorrect: true },
      { id: "opt-2", label: "ぬこ", isCorrect: false },
      { id: "opt-3", label: "れこ", isCorrect: false },
      { id: "opt-4", label: "わこ", isCorrect: false },
    ],
    explanationVi:
      "Neko gồm 2 chữ cái: ね (ne) và こ (ko).",
    audioUrl: null,
  },
  {
    id: "q-h-9",
    category: "hiragana",
    type: "confused-kana",
    prompt: "Chữ cái Hiragana nào sau đây là chữ 'ru' (る)?",
    options: [
      { id: "opt-1", label: "る", sublabel: "Đuôi cuộn tròn lại như củ khoai tây", isCorrect: true },
      { id: "opt-2", label: "ろ", sublabel: "Đuôi hất mở tự nhiên (ro)", isCorrect: false },
      { id: "opt-3", label: "そ", isCorrect: false },
      { id: "opt-4", label: "う", isCorrect: false },
    ],
    explanationVi:
      "る (ru) có đuôi xoắn tròn lại. ろ (ro) có đuôi thả mở tự nhiên.",
    audioUrl: null,
  },
  {
    id: "q-h-10",
    category: "hiragana",
    type: "character-recognition",
    prompt: "Chữ cái độc nhất trong tiếng Nhật không có nguyên âm đi kèm là:",
    options: [
      { id: "opt-1", label: "ん (n)", sublabel: "Âm mũi chiếm tròn 1 phách", isCorrect: true },
      { id: "opt-2", label: "っ (tsu nhỏ)", isCorrect: false },
      { id: "opt-3", label: "つ (tsu)", isCorrect: false },
      { id: "opt-4", label: "を (wo)", isCorrect: false },
    ],
    explanationVi:
      "Chữ ん (n) là chữ cái độc nhất không có nguyên âm (a, i, u, e, o) đi kèm nhưng vẫn tính là một phách (mora) trọn vẹn.",
    audioUrl: null,
  },

  // ==========================================
  // 2. KATAKANA QUESTIONS
  // ==========================================
  {
    id: "q-k-1",
    category: "katakana",
    type: "confused-kana",
    prompt: "Chữ Katakana sau đây đọc là gì?",
    promptKana: "シ",
    options: [
      { id: "opt-1", label: "shi", sublabel: "Nét dài thứ ba vuốt từ DƯỚI hất lên", isCorrect: true },
      { id: "opt-2", label: "tsu (ツ)", sublabel: "Nét dài vuốt từ TRÊN dốc xuống", isCorrect: false },
      { id: "opt-3", label: "so (ソ)", isCorrect: false },
      { id: "opt-4", label: "n (ン)", isCorrect: false },
    ],
    explanationVi:
      "Chữ シ (shi) có nét dài thứ ba vuốt từ DƯỚI hất lên (mặt cười nghiêng). Giống chữ し Hiragana cũng vuốt từ dưới lên.",
    audioUrl: null,
  },
  {
    id: "q-k-2",
    category: "katakana",
    type: "loanword-recognition",
    prompt: "Từ mượn 'Cà phê' (Coffee) viết bằng Katakana chuẩn là:",
    options: [
      { id: "opt-1", label: "コーヒー", sublabel: "kōhī (có 2 trường âm ー)", isCorrect: true },
      { id: "opt-2", label: "コヒ", isCorrect: false },
      { id: "opt-3", label: "コーヒ", isCorrect: false },
      { id: "opt-4", label: "コヒー", isCorrect: false },
    ],
    explanationVi:
      "Cà phê trong tiếng Nhật là コーヒー (kōhī), cả hai âm tiết đều có trường âm biểu thị bằng gạch ngang ー.",
    audioUrl: null,
  },
  {
    id: "q-k-3",
    category: "katakana",
    type: "confused-kana",
    prompt: "Chữ Katakana nào sau đây là chữ 'so' (ソ)?",
    options: [
      { id: "opt-1", label: "ソ", sublabel: "Nét dài vuốt từ TRÊN dốc xuống", isCorrect: true },
      { id: "opt-2", label: "ン", sublabel: "Nét dài vuốt từ DƯỚI hất lên (chữ N)", isCorrect: false },
      { id: "opt-3", label: "リ", isCorrect: false },
      { id: "opt-4", label: "ノ", isCorrect: false },
    ],
    explanationVi:
      "Chữ ソ (so) có nét dài vuốt từ TRÊN dốc xuống dưới (dốc đứng như kim đồng hồ chỉ 7h). Chữ ン (n) vuốt từ DƯỚI hất lên.",
    audioUrl: null,
  },
  {
    id: "q-k-4",
    category: "katakana",
    type: "loanword-recognition",
    prompt: "Từ 'Áo sơ mi' (Shirt) chứa cả hai chữ シ và ツ được viết là:",
    options: [
      { id: "opt-1", label: "シャツ", sublabel: "shatsu", isCorrect: true },
      { id: "opt-2", label: "ツヤシ", isCorrect: false },
      { id: "opt-3", label: "シヤシ", isCorrect: false },
      { id: "opt-4", label: "ツヤツ", isCorrect: false },
    ],
    explanationVi:
      "Áo sơ mi là シャツ (shatsu) với chữ シ (shi) đứng trước ghép với ャ nhỏ tạo thành sha, và chữ ツ (tsu) đứng sau.",
    audioUrl: null,
  },
  {
    id: "q-k-5",
    category: "katakana",
    type: "character-recognition",
    prompt: "Chữ cái Katakana tương đương của chữ Hiragana 'あ' là:",
    options: [
      { id: "opt-1", label: "ア", isCorrect: true },
      { id: "opt-2", label: "マ", isCorrect: false },
      { id: "opt-3", label: "ヤ", isCorrect: false },
      { id: "opt-4", label: "オ", isCorrect: false },
    ],
    explanationVi:
      "Chữ あ (Hiragana) và ア (Katakana) đều phát âm là 'a', đại diện cho cùng một âm thanh trong tiếng Nhật.",
    audioUrl: null,
  },
  {
    id: "q-k-6",
    category: "katakana",
    type: "confused-kana",
    prompt: "Phân biệt hai chữ: Chữ nào sau đây là chữ 'ku' (ク)?",
    options: [
      { id: "opt-1", label: "ク", sublabel: "Nét phẩy trái nhô lên trên nét ngang", isCorrect: true },
      { id: "opt-2", label: "ワ", sublabel: "Nét dọc bên trái thẳng góc không nhô (chữ Wa)", isCorrect: false },
      { id: "opt-3", label: "ケ", isCorrect: false },
      { id: "opt-4", label: "タ", isCorrect: false },
    ],
    explanationVi:
      "ク (ku) có nét phẩy bên trái nhô cao vượt lên trên nét ngang gập. Chữ ワ (wa) nét dọc bên trái nằm gọn phía dưới.",
    audioUrl: null,
  },
  {
    id: "q-k-7",
    category: "katakana",
    type: "loanword-recognition",
    prompt: "Từ mượn 'Bánh mì' có nguồn gốc từ tiếng Bồ Đào Nha trong Katakana là:",
    options: [
      { id: "opt-1", label: "パン", sublabel: "pan", isCorrect: true },
      { id: "opt-2", label: "バン", isCorrect: false },
      { id: "opt-3", label: "ブレッド", isCorrect: false },
      { id: "opt-4", label: "ペン", isCorrect: false },
    ],
    explanationVi:
      "Bánh mì trong tiếng Nhật là パン (pan), mượn từ từ 'pão' của tiếng Bồ Đào Nha từ thế kỷ 16.",
    audioUrl: null,
  },
  {
    id: "q-k-8",
    category: "katakana",
    type: "character-recognition",
    prompt: "Âm mở rộng (Extended Katakana) 'fa' trong từ 'Fast food' được viết là:",
    options: [
      { id: "opt-1", label: "ファ", sublabel: "フ ghép với ァ nhỏ", isCorrect: true },
      { id: "opt-2", label: "ハァ", isCorrect: false },
      { id: "opt-3", label: "フア", sublabel: "ア to là 2 phách riêng (fu-a)", isCorrect: false },
      { id: "opt-4", label: "ホァ", isCorrect: false },
    ],
    explanationVi:
      "Âm [fa] là âm mở rộng dùng trong từ mượn, kết hợp chữ フ (fu) với ァ nhỏ.",
    audioUrl: null,
  },
  {
    id: "q-k-9",
    category: "katakana",
    type: "loanword-recognition",
    prompt: "Từ 'Tivi' (Television) viết tắt quen thuộc trong tiếng Nhật là:",
    options: [
      { id: "opt-1", label: "テレビ", sublabel: "terebi", isCorrect: true },
      { id: "opt-2", label: "テレヴィ", isCorrect: false },
      { id: "opt-3", label: "ティヴィ", isCorrect: false },
      { id: "opt-4", label: "テビ", isCorrect: false },
    ],
    explanationVi:
      "Chiếc tivi trong tiếng Nhật được gọi ngắn gọn là テレビ (terebi).",
    audioUrl: null,
  },
  {
    id: "q-k-10",
    category: "katakana",
    type: "character-recognition",
    prompt: "Trong Katakana, ký hiệu nào dùng để biểu thị trường âm (nguyên âm kéo dài 2 phách)?",
    options: [
      { id: "opt-1", label: "Dấu gạch ngang ー (Chōonpu)", isCorrect: true },
      { id: "opt-2", label: "Dấu ten-ten ゛", isCorrect: false },
      { id: "opt-3", label: "Chữ ッ nhỏ", isCorrect: false },
      { id: "opt-4", label: "Dấu hai chấm :", isCorrect: false },
    ],
    explanationVi:
      "Trong Katakana, tất cả mọi trường âm đều được chuẩn hóa bằng dấu gạch ngang ー (như trong コーヒー, ケーキ).",
    audioUrl: null,
  },

  // ==========================================
  // 3. PRONUNCIATION QUESTIONS
  // ==========================================
  {
    id: "q-p-1",
    category: "pronunciation",
    type: "pronunciation-rule",
    prompt: "Trong từ 'おばあさん' (bà), nguyên âm nào được kéo dài 2 phách (trường âm)?",
    options: [
      { id: "opt-1", label: "Âm 'a' (kéo dài thành ba-a)", isCorrect: true },
      { id: "opt-2", label: "Âm 'o'", isCorrect: false },
      { id: "opt-3", label: "Âm 'sa'", isCorrect: false },
      { id: "opt-4", label: "Từ này không có trường âm", isCorrect: false },
    ],
    explanationVi:
      "おばあさん (obāsan) có trường âm ở cột A bằng cách thêm chữ あ, nghĩa là bà. Khác với おばさん (obasan) nghĩa là cô, dì.",
    audioUrl: null,
  },
  {
    id: "q-p-2",
    category: "pronunciation",
    type: "pronunciation-rule",
    prompt: "Hiện tượng 'vô thanh hóa nguyên âm' thường xảy ra với hai nguyên âm nào?",
    options: [
      { id: "opt-1", label: "[i] và [u]", isCorrect: true },
      { id: "opt-2", label: "[a] và [o]", isCorrect: false },
      { id: "opt-3", label: "[e] và [o]", isCorrect: false },
      { id: "opt-4", label: "[a] và [i]", isCorrect: false },
    ],
    explanationVi:
      "Nguyên âm [i] và [u] là hai nguyên âm hẹp, thường bị triệt tiêu rung động dây thanh khi kẹp giữa các phụ âm vô thanh (như trong ~desu, ~masu, suki).",
    audioUrl: null,
  },
  {
    id: "q-p-3",
    category: "pronunciation",
    type: "mora-count",
    prompt: "Từ びょういん (Bệnh viện) và びよういん (Tiệm làm tóc) khác nhau như thế nào về số phách (mora)?",
    options: [
      { id: "opt-1", label: "びょういん có 4 phách; びよういん có 5 phách", sublabel: "びょ là 1 phách yōon, bi-yo là 2 phách riêng", isCorrect: true },
      { id: "opt-2", label: "Cả hai từ đều có 4 phách", isCorrect: false },
      { id: "opt-3", label: "びょういん có 3 phách; びよういん có 4 phách", isCorrect: false },
      { id: "opt-4", label: "びょういん có 5 phách; びよういん có 4 phách", isCorrect: false },
    ],
    explanationVi:
      "びょういん gồm: びょ (1) + う (1) + い (1) + ん (1) = 4 phách. びよういん gồm: び (1) + よ (1) + う (1) + い (1) + ん (1) = 5 phách.",
    audioUrl: null,
  },
  {
    id: "q-p-4",
    category: "pronunciation",
    type: "pronunciation-rule",
    prompt: "Trong từ きって (con tem), chữ っ nhỏ (Sokuon) đóng vai trò gì?",
    options: [
      { id: "opt-1", label: "Tạo khoảng lặng ngắt hơi trong đúng 1 phách", isCorrect: true },
      { id: "opt-2", label: "Đọc thành âm 't' tiếng Việt", isCorrect: false },
      { id: "opt-3", label: "Kéo dài nguyên âm 'i'", isCorrect: false },
      { id: "opt-4", label: "Đọc thành chữ tsu nhỏ", isCorrect: false },
    ],
    explanationVi:
      "Âm ngắt っ là một khoảng lặng nén hơi kéo dài đúng 1 phách thời gian trước phụ âm t.",
    audioUrl: null,
  },
  {
    id: "q-p-5",
    category: "pronunciation",
    type: "pronunciation-rule",
    prompt: "Chữ ん khi đứng trước các phụ âm b, p, m (ví dụ: さんぽ - đi dạo) sẽ biến đổi khẩu hình thành âm nào?",
    options: [
      { id: "opt-1", label: "Hai môi khép lại thành âm [m]", sublabel: "sampo", isCorrect: true },
      { id: "opt-2", label: "Đầu lưỡi chạm răng thành âm [n]", isCorrect: false },
      { id: "opt-3", label: "Gốc lưỡi chạm họng thành âm [ng]", isCorrect: false },
      { id: "opt-4", label: "Không phát âm", isCorrect: false },
    ],
    explanationVi:
      "Hiện tượng đồng hóa âm khiến chữ ん tự động khép hai môi tạo thành âm [m] trước các phụ âm đôi môi b, p, m.",
    audioUrl: null,
  },
  {
    id: "q-p-6",
    category: "pronunciation",
    type: "pronunciation-rule",
    prompt: "Phụ âm của chữ つ (tsu) được cấu tạo từ cơ chế ngữ âm nào?",
    options: [
      { id: "opt-1", label: "Âm tắc-xát [ts]: đầu lưỡi chạm chân răng rồi xát luồng hơi ra", isCorrect: true },
      { id: "opt-2", label: "Chu môi và cong lưỡi đọc như 'chu'", isCorrect: false },
      { id: "opt-3", label: "Âm tắc thuần túy đọc như 'tu'", isCorrect: false },
      { id: "opt-4", label: "Âm rung đầu lưỡi", isCorrect: false },
    ],
    explanationVi:
      "つ [tsɯᵝ] là âm tắc-xát, tuyệt đối không chu mỏ đọc thành 'chu' hay đọc bẹt thành 'tu'.",
    audioUrl: null,
  },
  {
    id: "q-p-7",
    category: "pronunciation",
    type: "pitch-accent",
    prompt: "Trong mô hình trọng âm cao độ Tokyo (Pitch Accent), từ 雨 (あめ - Cơn mưa) có mô hình cao độ là gì?",
    options: [
      { id: "opt-1", label: "Atamadaka (Đầu cao: A cao, me thấp)", isCorrect: true },
      { id: "opt-2", label: "Heiban (Bằng phẳng: a thấp, me cao)", isCorrect: false },
      { id: "opt-3", label: "Nakadaka (Giữa cao)", isCorrect: false },
      { id: "opt-4", label: "Odaka (Đuôi cao)", isCorrect: false },
    ],
    explanationVi:
      "Cơn mưa (雨) thuộc mô hình Atamadaka: phách đầu [A] cao và rơi xuống [me] thấp. Ngược lại, viên kẹo (飴) thuộc mô hình Heiban.",
    audioUrl: null,
  },
  {
    id: "q-p-8",
    category: "pronunciation",
    type: "pronunciation-rule",
    prompt: "Khi nói câu hỏi thân mật không có trợ từ か (ví dụ: いく？ - Đi không?), ngữ điệu câu cần thể hiện thế nào?",
    options: [
      { id: "opt-1", label: "Lên giọng dứt khoát ở âm tiết cuối cùng ↗", isCorrect: true },
      { id: "opt-2", label: "Hạ giọng xuống trầm ↘", isCorrect: false },
      { id: "opt-3", label: "Giữ bằng giọng không đổi", isCorrect: false },
      { id: "opt-4", label: "Kéo dài âm cuối thành trường âm", isCorrect: false },
    ],
    explanationVi:
      "Lên giọng ở cuối câu hỏi thân mật giúp người nghe nhận diện được mục đích nghi vấn thay vì câu trần thuật khẳng định.",
    audioUrl: null,
  },
  {
    id: "q-p-9",
    category: "pronunciation",
    type: "pitch-accent",
    prompt: "Điểm khác biệt quan trọng giữa mô hình Bằng phẳng (Heiban) và Đuôi cao (Odaka) khi đi với trợ từ が là gì?",
    options: [
      { id: "opt-1", label: "Với Heiban trợ từ が vẫn giữ Cao; với Odaka trợ từ が bị rơi xuống Thấp", isCorrect: true },
      { id: "opt-2", label: "Heiban có điểm rơi, Odaka không có điểm rơi", isCorrect: false },
      { id: "opt-3", label: "Odaka có phách đầu cao", isCorrect: false },
      { id: "opt-4", label: "Hai mô hình này hoàn toàn giống nhau khi đi với trợ từ", isCorrect: false },
    ],
    explanationVi:
      "Từ Odaka có điểm rơi hạt nhân ngay sau phách cuối, do đó trợ từ が bị rơi xuống Thấp (ví dụ: 花が ha-NA-ga: L-H-L). Với Heiban trợ từ vẫn giữ Cao (ví dụ: 鼻が ha-NA-GA: L-H-H).",
    audioUrl: null,
  },
  {
    id: "q-p-10",
    category: "pronunciation",
    type: "pronunciation-rule",
    prompt: "Phát biểu nào sau đây về phát âm hàng が (ga, gi, gu, ge, go) là CHÍNH XÁC?",
    options: [
      { id: "opt-1", label: "Người mới học phát âm [ɡ] rõ ràng ở mọi vị trí là chuẩn xác và tự nhiên 100%", isCorrect: true },
      { id: "opt-2", label: "Bắt buộc phải đọc thành âm mũi 'nga' ở mọi vị trí", isCorrect: false },
      { id: "opt-3", label: "Đầu từ bắt buộc phải đọc thành 'nga'", isCorrect: false },
      { id: "opt-4", label: "Hàng が không có biến âm", isCorrect: false },
    ],
    explanationVi:
      "Phát âm [ɡ] rõ ràng ở mọi vị trí là chuẩn mực an toàn hiện đại. Biến thể âm mũi Bidakuon [ŋ] chỉ dùng ở giữa từ trong giọng đài NHK truyền thống.",
    audioUrl: null,
  },

  // ==========================================
  // 4. NUMBERS & COUNTERS QUESTIONS
  // ==========================================
  {
    id: "q-n-1",
    category: "numbers",
    type: "counter-selection",
    prompt: "Để đếm '2 người', người Nhật dùng từ nào?",
    options: [
      { id: "opt-1", label: "ふたり (futari)", isCorrect: true },
      { id: "opt-2", label: "ににん (ninin)", isCorrect: false },
      { id: "opt-3", label: "ふたつ (futatsu)", sublabel: "Đây là 2 cái đồ vật", isCorrect: false },
      { id: "opt-4", label: "りょうにん (ryounin)", isCorrect: false },
    ],
    explanationVi:
      "1 người là ひとり (hitori) và 2 người là ふたり (futari) - đây là cách đọc thuần Nhật đặc biệt, không dùng nin.",
    audioUrl: null,
  },
  {
    id: "q-n-2",
    category: "numbers",
    type: "date-reading",
    prompt: "Ngày mùng 4 trong tháng được phát âm là:",
    options: [
      { id: "opt-1", label: "よっか (yokka)", isCorrect: true },
      { id: "opt-2", label: "よんにち (yonnichi)", isCorrect: false },
      { id: "opt-3", label: "しにち (shinichi)", isCorrect: false },
      { id: "opt-4", label: "いつか (itsuka)", sublabel: "Đây là mùng 5", isCorrect: false },
    ],
    explanationVi:
      "Mùng 4 là よっか (yokka - có âm ngắt っ). Mùng 8 là ようか (yōka - có trường âm う).",
    audioUrl: null,
  },
  {
    id: "q-n-3",
    category: "numbers",
    type: "number-reading",
    prompt: "Số 300 trong tiếng Nhật có biến âm hàng trăm, đọc đúng là:",
    options: [
      { id: "opt-1", label: "さんびゃく (sanbyaku)", sublabel: "Biến âm đục byaku", isCorrect: true },
      { id: "opt-2", label: "さんひゃく (sanhyaku)", isCorrect: false },
      { id: "opt-3", label: "さんぴゃく (sanpyaku)", isCorrect: false },
      { id: "opt-4", label: "みっひゃく (mihhyaku)", isCorrect: false },
    ],
    explanationVi:
      "300 đọc là さんびゃく (sanbyaku). 600 đọc là ろっぴゃく (roppyaku) và 800 đọc là はっぴゃく (happyaku).",
    audioUrl: null,
  },
  {
    id: "q-n-4",
    category: "numbers",
    type: "number-reading",
    prompt: "1 Vạn (一万 - Ichiman) trong tiếng Nhật tương đương với số nào?",
    options: [
      { id: "opt-1", label: "10.000", isCorrect: true },
      { id: "opt-2", label: "1.000", isCorrect: false },
      { id: "opt-3", label: "100.000", isCorrect: false },
      { id: "opt-4", label: "1.000.000", isCorrect: false },
    ],
    explanationVi:
      "Hệ thống số tiếng Nhật nhóm theo 4 số 0: 1 Vạn (一万) = 10.000. 10 Vạn (十万) = 100.000. 1 Ức (一億) = 100.000.000.",
    audioUrl: null,
  },
  {
    id: "q-n-5",
    category: "numbers",
    type: "counter-selection",
    prompt: "Khi đếm '3 chai nước suối', lượng từ 〜本 (hon) được phát âm thành:",
    options: [
      { id: "opt-1", label: "さんぼん (sanbon)", isCorrect: true },
      { id: "opt-2", label: "さんほん (sanhon)", isCorrect: false },
      { id: "opt-3", label: "さんぽん (sanpon)", isCorrect: false },
      { id: "opt-4", label: "みっぽん (mippon)", isCorrect: false },
    ],
    explanationVi:
      "Sau số 3 (San), lượng từ 〜本 đục hóa thành 'bon': さんぼん (sanbon). 1, 6, 8, 10 đọc là 'pon' (ippon, roppon, happon, juppon).",
    audioUrl: null,
  },
  {
    id: "q-n-6",
    category: "numbers",
    type: "time-reading",
    prompt: "Đồng hồ chỉ đúng '4 giờ', tiếng Nhật phát âm là:",
    options: [
      { id: "opt-1", label: "よじ (yoji)", isCorrect: true },
      { id: "opt-2", label: "しじ (shiji)", isCorrect: false },
      { id: "opt-3", label: "よんじ (yonji)", isCorrect: false },
      { id: "opt-4", label: "よんじかん (yonjikan)", isCorrect: false },
    ],
    explanationVi:
      "4 giờ là よじ (yoji). Tương tự 7 giờ là しちじ (shichiji) và 9 giờ là くじ (kuji).",
    audioUrl: null,
  },
  {
    id: "q-n-7",
    category: "numbers",
    type: "date-reading",
    prompt: "Ngày 20 trong tháng có cách đọc đặc biệt là:",
    options: [
      { id: "opt-1", label: "はつか (hatsuka)", isCorrect: true },
      { id: "opt-2", label: "にじゅうにち (nijuunichi)", isCorrect: false },
      { id: "opt-3", label: "はたち (hatachi)", sublabel: "Đây là 20 tuổi", isCorrect: false },
      { id: "opt-4", label: "にじゅうか (nijuuka)", isCorrect: false },
    ],
    explanationVi:
      "Ngày 20 là はつか (hatsuka). Đừng nhầm lẫn với 20 tuổi là はたち (hatachi).",
    audioUrl: null,
  },
  {
    id: "q-n-8",
    category: "numbers",
    type: "counter-selection",
    prompt: "Lượng từ nào sau đây dùng để đếm 'xe ô tô, xe máy, máy vi tính'?",
    options: [
      { id: "opt-1", label: "〜台 (だい - dai)", isCorrect: true },
      { id: "opt-2", label: "〜枚 (まい - mai)", isCorrect: false },
      { id: "opt-3", label: "〜匹 (ひき - hiki)", isCorrect: false },
      { id: "opt-4", label: "〜本 (ほん - hon)", isCorrect: false },
    ],
    explanationVi:
      "Lượng từ 〜台 (dai) dùng để đếm máy móc, xe cộ, đồ cơ giới và thiết bị điện tử gia dụng.",
    audioUrl: null,
  },
  {
    id: "q-n-9",
    category: "numbers",
    type: "number-reading",
    prompt: "Số 20 tuổi trong tiếng Nhật có tên gọi thuần Nhật đặc biệt là:",
    options: [
      { id: "opt-1", label: "はたち (hatachi)", sublabel: "Mốc trưởng thành thành nhân", isCorrect: true },
      { id: "opt-2", label: "にじゅっさい (nijussai)", isCorrect: false },
      { id: "opt-3", label: "はつか (hatsuka)", sublabel: "Đây là ngày 20", isCorrect: false },
      { id: "opt-4", label: "にじっさい (nijissai)", isCorrect: false },
    ],
    explanationVi:
      "20 tuổi là はたち (hatachi). Đây là nét văn hóa truyền thống đặc trưng trong lễ Thành Nhân (Seijin no Hi) của Nhật Bản.",
    audioUrl: null,
  },
  {
    id: "q-n-10",
    category: "numbers",
    type: "time-reading",
    prompt: "Mốc '1 phút' trong tiếng Nhật đọc biến âm là gì?",
    options: [
      { id: "opt-1", label: "いっぷん (ippun)", sublabel: "Biến âm pun", isCorrect: true },
      { id: "opt-2", label: "いちふん (ichifun)", isCorrect: false },
      { id: "opt-3", label: "いふん (ifun)", isCorrect: false },
      { id: "opt-4", label: "いちぷん (ichipun)", isCorrect: false },
    ],
    explanationVi:
      "1 phút đọc là いっぷん (ippun - có âm ngắt và p). Tương tự 3 phút là さんぷん, 6 phút là ろっぷん, 8 phút là はっぷん, 10 phút là じゅっぷん.",
    audioUrl: null,
  },
];

/**
 * Helper to get a curated pool of questions for a specific practice mode.
 * For "mixed", it selects a balanced subset from all 4 categories.
 */
export function getPracticeQuestions(category: PracticeCategory): PracticeQuestion[] {
  if (category === "mixed") {
    // Collect 3-4 questions from each of the 4 categories to make a 14-question mixed set
    const h = INITIAL_PRACTICE_QUESTIONS.filter((q) => q.category === "hiragana").slice(0, 4);
    const k = INITIAL_PRACTICE_QUESTIONS.filter((q) => q.category === "katakana").slice(0, 4);
    const p = INITIAL_PRACTICE_QUESTIONS.filter((q) => q.category === "pronunciation").slice(0, 3);
    const n = INITIAL_PRACTICE_QUESTIONS.filter((q) => q.category === "numbers").slice(0, 3);
    return [...h, ...k, ...p, ...n];
  }

  return INITIAL_PRACTICE_QUESTIONS.filter((q) => q.category === category);
}
