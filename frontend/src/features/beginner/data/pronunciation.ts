import { PronunciationTopic } from "../types/pronunciation";

export const PRONUNCIATION_TOPICS: PronunciationTopic[] = [
  // ==========================================
  // TOPIC 1: DAKUTEN & HANDAKUTEN (濁音・半濁音)
  // ==========================================
  {
    id: "p-dakuten-handakuten",
    slug: "dakuten-handakuten",
    title: "Dakuten & Handakuten (濁音・半濁音)",
    titleVi: "Biến âm: Đục âm (゛) & Bán đục âm (゜)",
    shortSummaryVi:
      "Quy tắc thêm ten-ten và maru để biến đổi từ phụ âm vô thanh sang phụ âm hữu thanh và âm bật môi.",
    category: "syllable-rules",
    icon: "⚡",
    importance: "essential",
    estimatedReadMinutes: 4,
    overviewVi:
      "Trong tiếng Nhật, các phụ âm vô thanh thuộc 4 hàng K, S, T, H khi thêm dấu ten-ten (゛) sẽ làm rung dây thanh đới tạo thành các âm đục G, Z, D, B. Riêng hàng H khi thêm dấu tròn maru (゜) sẽ chuyển thành âm bật môi P.",
    sections: [
      {
        id: "sec-rules",
        titleVi: "4 quy tắc biến âm căn bản",
        contentVi:
          "Nguyên lý cơ thể học: Đặt nhẹ tay lên cổ họng khi phát âm. Âm cơ bản (vô thanh) không làm dây thanh rung, khi thêm ten-ten (đục âm) dây thanh đới sẽ rung rõ rệt.",
        rules: [
          {
            id: "r-k-g",
            titleVi: "1. Hàng K (か, き, く, け, こ) ➔ Hàng G (が, ぎ, ぐ, げ, ご)",
            explanationVi:
              "Biến đổi từ âm tắc vô thanh [k] sang âm tắc hữu thanh [ɡ]. Dây thanh đới rung khi phát âm.",
            examples: [
              { id: "eg-1", japanese: "かさ", reading: "かさ", romaji: "kasa", meaningVi: "Cái ô / Cây dù", highlightKana: "か", audioUrl: null },
              { id: "eg-2", japanese: "がくせい", reading: "がくせい", romaji: "gakusei", meaningVi: "Học sinh / Sinh viên", highlightKana: "が", audioUrl: null },
            ],
          },
          {
            id: "r-s-z",
            titleVi: "2. Hàng S (さ, し, す, せ, そ) ➔ Hàng Z/J (ざ, じ, ず, ぜ, ぞ)",
            explanationVi:
              "Biến đổi sang âm xát hữu thanh [z]. Riêng chữ し (shi [ɕi]) khi thêm ten-ten chuyển thành じ [dʑi] (ji), không đọc là zi.",
            examples: [
              { id: "eg-3", japanese: "すし", reading: "すし", romaji: "sushi", meaningVi: "Món sushi", highlightKana: "す", audioUrl: null },
              { id: "eg-4", japanese: "みず", reading: "みず", romaji: "mizu", meaningVi: "Nước uống", highlightKana: "ず", audioUrl: null },
            ],
          },
          {
            id: "r-t-d",
            titleVi: "3. Hàng T (た, ち, つ, て, と) ➔ Hàng D (だ, ぢ, づ, で, ど)",
            explanationVi:
              "Biến đổi sang âm tắc hữu thanh [d]. Chú ý đặc biệt: ぢ và づ trong tiếng Nhật hiện đại có cách phát âm trùng hoàn toàn với じ [dʑi] và ず [zɯ].",
            examples: [
              { id: "eg-5", japanese: "て", reading: "て", romaji: "te", meaningVi: "Bàn tay", highlightKana: "て", audioUrl: null },
              { id: "eg-6", japanese: "でんしゃ", reading: "でんしゃ", romaji: "densha", meaningVi: "Tàu điện", highlightKana: "で", audioUrl: null },
            ],
          },
          {
            id: "r-h-b-p",
            titleVi: "4. Hàng H (は, ひ, ふ, へ, ほ) ➔ B (ば..) & P (ぱ..)",
            explanationVi:
              "Ten-ten (゛) tạo thành âm B hữu thanh [b]. Dấu tròn maru (゜) tạo thành âm bật môi P vô thanh [p].",
            examples: [
              { id: "eg-7", japanese: "ほん", reading: "ほん", romaji: "hon", meaningVi: "Quyển sách", highlightKana: "ほ", audioUrl: null },
              { id: "eg-8", japanese: "ばんごう", reading: "ばんごう", romaji: "bangō", meaningVi: "Số thứ tự", highlightKana: "ば", audioUrl: null },
              { id: "eg-9", japanese: "パン", reading: "パン", romaji: "pan", meaningVi: "Bánh mì (Katakana)", highlightKana: "パ", audioUrl: null },
            ],
          },
        ],
      },
      {
        id: "sec-yotsugana",
        titleVi: "Hiện tượng 'Tứ giả danh' (Yotsugana): じ vs ぢ và ず vs づ",
        contentVi:
          "Trong tiếng Nhật Tokyo hiện đại, じ và ぢ phát âm giống nhau là [dʑi], ず và づ phát âm giống nhau là [zɯ].\nVậy khi nào dùng ぢ và づ?",
        table: {
          headers: ["Quy tắc dùng ぢ / づ", "Giải thích", "Ví dụ cụ thể"],
          rows: [
            ["Hiện tượng chập âm (từ lặp)", "Chữ cái thứ hai lặp lại chữ cái đầu và bị biến âm", "つづく (続く - tiếp tục), ちぢむ (縮む - co rút)"],
            ["Biến âm ghép từ (Rendaku)", "Từ gốc bắt đầu bằng ち hoặc つ bị biến âm khi ghép từ", "はなぢ (鼻血: はな + ち - chảy máu cam), みかづき (三日月: trăng lưỡi liềm)"],
            ["Các từ vựng thông thường khác", "Mặc định luôn sử dụng じ và ず", "じかん (thời gian), みず (nước), ちず (bản đồ)"],
          ],
        },
      },
    ],
    commonMistakesVi: [
      "Người Việt hay phát âm chữ ざ (za) thành âm 'd' hoặc 'gi' kiểu tiếng Việt. Cần khép nhẹ hai hàm răng và xát âm rung [z].",
      "Phát âm nhầm じ (ji) thành 'di' cứng nhắc thay vì âm xát nhẹ [dʑi].",
      "Lúng túng không biết khi nào gõ ぢ và づ trên bàn phím: gõ 'di' để ra ぢ, gõ 'du' để ra づ.",
    ],
    practiceTipsVi: [
      "Tập đặt ngón tay lên thanh quản và đọc lần lượt theo cặp: か - が, さ - ざ, た - だ, は - ば - ぱ để cảm nhận độ rung rõ rệt.",
    ],
    practiceQuestions: [
      {
        id: "pq-d1",
        prompt: "Dấu tròn nhỏ (゜- Handakuten) chỉ có thể gắn vào hàng chữ cái nào trong tiếng Nhật?",
        options: [
          { id: "opt-1", label: "Hàng H (は, ひ, ふ, へ, ほ)", sublabel: "Biến thành ぱ, ぴ, ぷ, ぺ, ぽ", isCorrect: true },
          { id: "opt-2", label: "Hàng K (か, き, く, け, こ)", isCorrect: false },
          { id: "opt-3", label: "Hàng S (さ, し, す, せ, そ)", isCorrect: false },
          { id: "opt-4", label: "Hàng T (た, ち, つ, て, と)", isCorrect: false },
        ],
        explanationVi:
          "Dấu tròn maru (Handakuten) chỉ duy nhất kết hợp với hàng H (ha, hi, fu, he, ho) để tạo thành hàng P (pa, pi, pu, pe, po).",
      },
      {
        id: "pq-d2",
        prompt: "Trong tiếng Nhật hiện đại chuẩn Tokyo, chữ ぢ (từ hàng Ta) có cách phát âm giống hệt chữ nào?",
        options: [
          { id: "opt-1", label: "Chữ じ (ji)", sublabel: "Cả hai đều phát âm là [dʑi]", isCorrect: true },
          { id: "opt-2", label: "Chữ づ (zu)", isCorrect: false },
          { id: "opt-3", label: "Chữ び (bi)", isCorrect: false },
          { id: "opt-4", label: "Chữ だ (da)", isCorrect: false },
        ],
        explanationVi:
          "Trong tiếng Nhật hiện đại (hiện tượng Yotsugana), ぢ và じ phát âm hoàn toàn đồng nhất là [dʑi]. Tương tự, づ và ず phát âm đồng nhất là [zɯ].",
      },
      {
        id: "pq-d3",
        prompt: "Từ 'chảy máu cam' trong tiếng Nhật được viết là はなぢ (hanaji) thay vì はなじ vì lý do gì?",
        options: [
          { id: "opt-1", label: "Do từ gốc là ち (máu) ghép với はな (mũi) sinh ra biến âm", sublabel: "Quy tắc Rendaku (連濁)", isCorrect: true },
          { id: "opt-2", label: "Do đây là từ ngoại lai mượn từ phương Tây", isCorrect: false },
          { id: "opt-3", label: "Do chữ じ không bao giờ đứng ở cuối từ", isCorrect: false },
          { id: "opt-4", label: "Do quy tắc viết hoa trong tiếng Nhật", isCorrect: false },
        ],
        explanationVi:
          "Từ はなぢ là từ ghép giữa はな (mũi) và ち (máu). Khi ghép lại, âm ち bị đục hóa thành ぢ theo quy tắc Rendaku.",
      },
    ],
  },

  // ==========================================
  // TOPIC 2: YŌON (拗音)
  // ==========================================
  {
    id: "p-yoon",
    slug: "yoon",
    title: "Yōon (拗音)",
    titleVi: "Ảo âm / Âm ghép (kya, sha, chu, ryo...)",
    shortSummaryVi:
      "Quy tắc ghép phụ âm cột [i] với ya, yu, yo viết nhỏ tạo thành một phách duy nhất.",
    category: "syllable-rules",
    icon: "🧩",
    importance: "essential",
    estimatedReadMinutes: 4,
    overviewVi:
      "Yōon (ảo âm) xuất hiện khi kết hợp một chữ cái thuộc cột [i] (như ki, shi, chi, ni, hi, mi, ri, gi, ji, bi, pi) với các chữ cái ゃ (ya), ゅ (yu), ょ (yo) được viết nhỏ bằng 1/4 kích thước bình thường. Điểm cốt tử: Âm ghép chỉ chiếm đúng 1 phách (mora) thời gian.",
    moraComparisons: [
      {
        id: "mc-byoin-biyoin",
        word: "びょういん",
        kanji: "病院",
        reading: "びょういん",
        romaji: "byōin",
        meaningVi: "Bệnh viện",
        moraCount: 4,
        moraBlocks: [
          { text: "びょ", subtext: "byo (ghép)", type: "yoon" },
          { text: "う", subtext: "u (trường âm)", type: "chouon" },
          { text: "い", subtext: "i", type: "normal" },
          { text: "ん", subtext: "n", type: "hatsuon" },
        ],
        highlightNoteVi:
          "Chữ ょ viết nhỏ: びょ tính là 1 phách yōon duy nhất. Tổng cộng đúng 4 phách (mora).",
      },
      {
        id: "mc-biyoin",
        word: "びよういん",
        kanji: "美容院",
        reading: "びよういん",
        romaji: "biyōin",
        meaningVi: "Tiệm làm tóc / Thẩm mỹ viện",
        moraCount: 5,
        moraBlocks: [
          { text: "び", subtext: "bi", type: "normal" },
          { text: "よ", subtext: "yo (rời)", type: "normal" },
          { text: "う", subtext: "u (trường âm)", type: "chouon" },
          { text: "い", subtext: "i", type: "normal" },
          { text: "ん", subtext: "n", type: "hatsuon" },
        ],
        highlightNoteVi:
          "Chữ よ viết to bình thường: び và よ là 2 phách tách rời nhau. Tổng cộng 5 phách (mora).",
      },
      {
        id: "mc-kyo-kiyo",
        word: "きょう",
        kanji: "今日",
        reading: "きょう",
        romaji: "kyō",
        meaningVi: "Hôm nay",
        moraCount: 2,
        moraBlocks: [
          { text: "きょ", subtext: "kyo", type: "yoon" },
          { text: "う", subtext: "u", type: "chouon" },
        ],
        highlightNoteVi: "きょ là 1 phách, う là 1 phách trường âm. Tổng cộng 2 phách.",
      },
      {
        id: "mc-kiyo",
        word: "きよう",
        kanji: "器用",
        reading: "きよう",
        romaji: "kiyō",
        meaningVi: "Khéo léo",
        moraCount: 3,
        moraBlocks: [
          { text: "き", subtext: "ki", type: "normal" },
          { text: "よ", subtext: "yo", type: "normal" },
          { text: "う", subtext: "u", type: "chouon" },
        ],
        highlightNoteVi: "Chữ よ to tách biệt: ki (1) + yo (1) + u (1) = 3 phách.",
      },
    ],
    sections: [
      {
        id: "sec-mora-rule",
        titleVi: "Nguyên tắc trường độ: 1 phách duy nhất",
        contentVi:
          "Điểm mấu chốt trong ngữ âm học tiếng Nhật: Âm ghép yōon (ví dụ: kya, shu, cho, ryo) chỉ kéo dài đúng 1 phách (mora). Tuyệt đối không đọc tách rời thành 2 âm tiết 'ki-a' hay 'shi-u'.",
        rules: [
          {
            id: "r-yoon-distinction",
            titleVi: "Phân biệt âm ghép vs âm rời qua kích thước chữ",
            explanationVi:
              "Kích thước chữ nhỏ hay to thay đổi số lượng phách và biến đổi hoàn toàn nghĩa của từ vựng.",
            examples: [
              { id: "eg-y1", japanese: "びょういん (病院)", reading: "びょういん", romaji: "byōin", meaningVi: "Bệnh viện (4 phách: byo - u - i - n)", highlightKana: "びょ", audioUrl: null },
              { id: "eg-y2", japanese: "びよういん (美容院)", reading: "びよういん", romaji: "biyōin", meaningVi: "Tiệm làm tóc (5 phách: bi - yo - u - i - n)", highlightKana: "びよ", audioUrl: null },
              { id: "eg-y3", japanese: "おちゃ (お茶)", reading: "おちゃ", romaji: "ocha", meaningVi: "Trà xanh (2 phách: o - cha)", highlightKana: "ちゃ", audioUrl: null },
              { id: "eg-y4", japanese: "じゅぎょう (授業)", reading: "じゅぎょう", romaji: "jugyō", meaningVi: "Giờ học (3 phách: ju - gyo - u)", highlightKana: "じゅ・ぎょ", audioUrl: null },
            ],
          },
        ],
      },
    ],
    commonMistakesVi: [
      "Đọc nhầm びょういん (bệnh viện - 4 phách) thành びよういん (tiệm làm tóc - 5 phách) vì không phân biệt kích thước chữ ょ nhỏ.",
      "Người Việt hay có xu hướng tách âm đọc thành 'ki-da', 'si-u' thay vì lướt mượt mà thành một khối âm dứt khoát 1 phách.",
    ],
    practiceTipsVi: [
      "Vỗ tay theo nhịp đều đặn: Khi đọc 'kya' chỉ vỗ 1 nhịp dứt khoát, bằng thời gian của 1 chữ cái đơn lẻ như 'ka'.",
    ],
    practiceQuestions: [
      {
        id: "pq-y1",
        prompt: "Từ びょういん (Bệnh viện) có bao nhiêu phách (mora) trong tiếng Nhật chuẩn?",
        options: [
          { id: "opt-1", label: "4 phách (byo - u - i - n)", sublabel: "びょ tính là 1 phách duy nhất", isCorrect: true },
          { id: "opt-2", label: "3 phách (byō - in)", isCorrect: false },
          { id: "opt-3", label: "5 phách (bi - yo - u - i - n)", isCorrect: false },
          { id: "opt-4", label: "2 phách", isCorrect: false },
        ],
        explanationVi:
          "びょういん gồm: びょ (1 phách yōon) + う (1 phách trường âm) + い (1 phách) + ん (1 phách) = 4 phách (mora). Trong khi びよういん (tiệm tóc) gồm 5 phách vì chữ よ to là 1 phách riêng biệt.",
      },
      {
        id: "pq-y2",
        prompt: "Các chữ cái nào sau đây được viết nhỏ để tạo thành âm ghép Yōon trong Hiragana?",
        options: [
          { id: "opt-1", label: "ゃ (ya), ゅ (yu), ょ (yo)", sublabel: "Viết bằng 1/4 kích cỡ thông thường", isCorrect: true },
          { id: "opt-2", label: "ぁ (a), ぃ (i), ぅ (u)", isCorrect: false },
          { id: "opt-3", label: "っ (tsu)", sublabel: "Đây là âm ngắt sokuon", isCorrect: false },
          { id: "opt-4", label: "わ (wa), を (wo)", isCorrect: false },
        ],
        explanationVi:
          "Ba chữ cái ゃ (ya), ゅ (yu), ょ (yo) khi viết nhỏ kết hợp với cột [i] sẽ tạo thành âm ghép Yōon.",
      },
      {
        id: "pq-y3",
        prompt: "Phát biểu nào sau đây về trường độ của âm ghép Yōon là CHÍNH XÁC?",
        options: [
          { id: "opt-1", label: "Âm ghép chỉ kéo dài đúng 1 phách (mora), bằng một chữ cái đơn", isCorrect: true },
          { id: "opt-2", label: "Âm ghép kéo dài 2 phách vì có 2 chữ cái kết hợp", isCorrect: false },
          { id: "opt-3", label: "Âm ghép không được tính là phách trong tiếng Nhật", isCorrect: false },
          { id: "opt-4", label: "Âm ghép luôn phải đi kèm với âm ngắt", isCorrect: false },
        ],
        explanationVi:
          "Mặc dù gồm 2 ký tự ghép lại (ví dụ: き + ゃ = きゃ), âm ghép Yōon chỉ chiếm đúng 1 phách thời gian (1 mora).",
      },
    ],
  },

  // ==========================================
  // TOPIC 3: CHŌON (長音)
  // ==========================================
  {
    id: "p-chouon",
    slug: "chouon",
    title: "Chōon (長音)",
    titleVi: "Trường âm: Nguyên âm kéo dài 2 phách",
    shortSummaryVi:
      "Quy tắc kéo dài nguyên âm đúng gấp đôi thời gian, phân biệt rõ các từ đồng âm khác độ dài.",
    category: "syllable-rules",
    icon: "⏳",
    importance: "essential",
    estimatedReadMinutes: 4,
    overviewVi:
      "Trường âm (nguyên âm dài) là nguyên âm được phát âm kéo dài tròn 2 phách (mora). Trong tiếng Nhật, trường âm không phải là nhấn mạnh hay nói to hơn, mà là kéo dài đúng gấp đôi thời gian. Độ dài nguyên âm thay đổi trực tiếp ý nghĩa của từ vựng.",
    moraComparisons: [
      {
        id: "mc-obasan-obaasan",
        word: "おばさん",
        reading: "おばさん",
        romaji: "obasan",
        meaningVi: "Cô, dì, bác gái",
        moraCount: 4,
        moraBlocks: [
          { text: "お", subtext: "o", type: "normal" },
          { text: "ば", subtext: "ba", type: "normal" },
          { text: "さ", subtext: "sa", type: "normal" },
          { text: "ん", subtext: "n", type: "hatsuon" },
        ],
        highlightNoteVi: "Âm thường: o (1) + ba (1) + sa (1) + n (1) = 4 phách (mora).",
      },
      {
        id: "mc-obaasan",
        word: "おばあさん",
        reading: "おばあさん",
        romaji: "obāsan",
        meaningVi: "Bà nội, bà ngoại",
        moraCount: 5,
        moraBlocks: [
          { text: "お", subtext: "o", type: "normal" },
          { text: "ば", subtext: "ba", type: "normal" },
          { text: "あ", subtext: "a (trường âm)", type: "chouon" },
          { text: "さ", subtext: "sa", type: "normal" },
          { text: "ん", subtext: "n", type: "hatsuon" },
        ],
        highlightNoteVi:
          "Có trường âm あ: o (1) + ba (1) + a (1) + sa (1) + n (1) = 5 phách. Khác biệt hoàn toàn!",
      },
      {
        id: "mc-biru-biiru",
        word: "ビル",
        reading: "ビル",
        romaji: "biru",
        meaningVi: "Tòa nhà cao tầng",
        moraCount: 2,
        moraBlocks: [
          { text: "ビ", subtext: "bi", type: "normal" },
          { text: "ル", subtext: "ru", type: "normal" },
        ],
        highlightNoteVi: "Không có trường âm: 2 phách.",
      },
      {
        id: "mc-biiru",
        word: "ビール",
        reading: "ビール",
        romaji: "bīru",
        meaningVi: "Bia (đồ uống)",
        moraCount: 3,
        moraBlocks: [
          { text: "ビ", subtext: "bi", type: "normal" },
          { text: "ー", subtext: "kéo dài (1 phách)", type: "chouon" },
          { text: "ル", subtext: "ru", type: "normal" },
        ],
        highlightNoteVi: "Dấu gạch ngang ー trong Katakana tính là 1 phách trường âm. Tổng cộng 3 phách.",
      },
    ],
    sections: [
      {
        id: "sec-rules-kana",
        titleVi: "Quy tắc viết trường âm trong Hiragana và Katakana",
        contentVi:
          "Trong Katakana, trường âm luôn được biểu thị bằng dấu gạch ngang (ー - Chōonpu). Trong Hiragana, trường âm được tạo bởi nguyên âm đi kèm phía sau theo quy tắc cột âm.",
        table: {
          headers: ["Cột âm", "Quy tắc Hiragana", "Ví dụ Hiragana", "Quy tắc Katakana", "Ví dụ Katakana"],
          rows: [
            ["Cột A", "Thêm あ", "おかあさん (mẹ), おばあさん (bà)", "Thêm dấu ー", "カード (kādo - thẻ)"],
            ["Cột I", "Thêm い", "おにいさん (anh trai), ちいさい (nhỏ)", "Thêm dấu ー", "タクシー (takushī - taxi)"],
            ["Cột U", "Thêm う", "くうき (không khí), ぎゅうにゅう (sữa)", "Thêm dấu ー", "プール (pūru - hồ bơi)"],
            ["Cột E", "Phần lớn thêm い, từ thuần Nhật thêm え", "せんせい (sensei [senseː]), おねえさん (chị)", "Thêm dấu ー", "ケーキ (kēki - bánh ngọt)"],
            ["Cột O", "Phần lớn thêm う (~90%), từ cổ thêm お", "おとうさん (bố), こうこう (cấp 3), とおり (đường phố)", "Thêm dấu ー", "ノート (nōto - vở ghi)"],
          ],
        },
      },
      {
        id: "sec-meaning-pairs",
        titleVi: "Các cặp từ thay đổi ý nghĩa vì trường âm",
        contentVi:
          "Trong tiếng Nhật, nuốt mất trường âm sẽ biến câu nói của bạn thành một từ hoàn toàn khác, gây hiểu lầm tai hại trong giao tiếp.",
        rules: [
          {
            id: "r-chouon-pairs",
            titleVi: "So sánh các cặp từ kinh điển",
            explanationVi: "Hãy chú ý độ dài khi nói và nghe các cặp từ này:",
            examples: [
              { id: "eg-c1", japanese: "おばさん", reading: "おばさん", romaji: "obasan", meaningVi: "Cô, dì, bác gái (4 phách: o-ba-sa-n)", audioUrl: null },
              { id: "eg-c2", japanese: "おばあさん", reading: "おばあさん", romaji: "obāsan", meaningVi: "Bà nội, bà ngoại (5 phách: o-ba-a-sa-n)", highlightKana: "あ", audioUrl: null },
              { id: "eg-c3", japanese: "ゆき", reading: "ゆき", romaji: "yuki", meaningVi: "Tuyết rơi (2 phách)", audioUrl: null },
              { id: "eg-c4", japanese: "ゆうき", reading: "ゆうき", romaji: "yūki", meaningVi: "Lòng dũng cảm (3 phách)", highlightKana: "う", audioUrl: null },
              { id: "eg-c5", japanese: "ここ", reading: "ここ", romaji: "koko", meaningVi: "Ở đây (2 phách)", audioUrl: null },
              { id: "eg-c6", japanese: "こうこう", reading: "こうこう", romaji: "kōkō", meaningVi: "Trường cấp 3 (4 phách: ko-u-ko-u)", highlightKana: "う", audioUrl: null },
            ],
          },
        ],
      },
    ],
    commonMistakesVi: [
      "Người Việt có thói quen đọc lướt nhanh nên hay nuốt mất trường âm, gọi 'bà' thành 'cô dì' (obāsan thành obasan).",
      "Đọc từ せんせい (thầy cô) thành 'xen-xây' kiểu tiếng Việt thay vì kéo dài nguyên âm ê tròn 2 phách [senseː].",
      "Quên rằng chữ ん tính là 1 phách riêng, nên おばさん có 4 phách chứ không phải 3 âm tiết như tiếng Việt.",
    ],
    practiceTipsVi: [
      "Đếm nhịp mora bằng tay: Khi đọc nguyên âm thường gõ 1 nhịp, khi đọc trường âm giữ tay ngân đúng 2 nhịp đều đặn.",
    ],
    practiceQuestions: [
      {
        id: "pq-c1",
        prompt: "Trong Katakana, trường âm (nguyên âm kéo dài) được biểu thị bằng ký hiệu nào?",
        options: [
          { id: "opt-1", label: "Dấu gạch ngang ー (Chōonpu)", isCorrect: true },
          { id: "opt-2", label: "Dấu ten-ten (゛)", isCorrect: false },
          { id: "opt-3", label: "Chữ ッ nhỏ", isCorrect: false },
          { id: "opt-4", label: "Chữ ウ viết hoa", isCorrect: false },
        ],
        explanationVi:
          "Trong Katakana, tất cả mọi trường âm đều được chuẩn hóa bằng dấu gạch ngang ー (ví dụ: コーヒー, ケーキ, タクシー).",
      },
      {
        id: "pq-c2",
        prompt: "Từ せんせい (Giáo viên / Thầy cô) trong thực tế tiếng Nhật chuẩn được phát âm trường âm như thế nào?",
        options: [
          { id: "opt-1", label: "Kéo dài âm [e] thành [senseː]", sublabel: "Cột E + い phát âm thành âm ê kéo dài", isCorrect: true },
          { id: "opt-2", label: "Đọc thành hai âm rời 'sen - say'", isCorrect: false },
          { id: "opt-3", label: "Đọc lướt bỏ qua âm い", isCorrect: false },
          { id: "opt-4", label: "Nhấn mạnh âm 'sen' và hạ giọng ở 'sei'", isCorrect: false },
        ],
        explanationVi:
          "Trong Hiragana, các chữ thuộc cột E khi đi với い (như せんせい, えいが) trong phát âm chuẩn được thể hiện thành nguyên âm [eː] kéo dài 2 phách.",
      },
      {
        id: "pq-c3",
        prompt: "Từ nào sau đây có độ dài chính xác là 3 phách (mora)?",
        options: [
          { id: "opt-1", label: "ビール (Bia)", sublabel: "Bi (1) + ー (1) + ru (1) = 3 phách", isCorrect: true },
          { id: "opt-2", label: "ビル (Tòa nhà)", sublabel: "Bi (1) + ru (1) = 2 phách", isCorrect: false },
          { id: "opt-3", label: "ここ (Ở đây)", sublabel: "Ko (1) + ko (1) = 2 phách", isCorrect: false },
          { id: "opt-4", label: "こうこう (Trường cấp 3)", sublabel: "Ko (1) + u (1) + ko (1) + u (1) = 4 phách", isCorrect: false },
        ],
        explanationVi:
          "Từ ビール gồm: ビ (1 phách) + ー (1 phách trường âm) + ル (1 phách) = 3 phách (mora). Trong khi ビル chỉ có 2 phách.",
      },
    ],
  },

  // ==========================================
  // TOPIC 4: SOKUON (促音)
  // ==========================================
  {
    id: "p-sokuon",
    slug: "sokuon",
    title: "Sokuon (促音)",
    titleVi: "Âm ngắt: っ / ッ (Khoảng lặng 1 phách)",
    shortSummaryVi:
      "Quy tắc nén hơi dừng 1 phách trước các phụ âm k, s, t, p với cơ chế Stop - Hold - Release.",
    category: "syllable-rules",
    icon: "🛑",
    importance: "essential",
    estimatedReadMinutes: 4,
    overviewVi:
      "Âm ngắt được biểu thị bằng chữ つ (tsu) hoặc ツ viết nhỏ bằng 1/4 kích thước thông thường. Khi gặp âm ngắt, bạn không phát âm thành tiếng mà ngắt luồng hơi, giữ yên thanh quản trong đúng 1 phách trước khi bật ra âm tiếp theo. Đây là hiện tượng gấp đôi phụ âm (Consonant Gemination).",
    stepGuide: {
      titleVi: "Cơ chế 3 bước phát âm âm ngắt (Stop - Hold - Release)",
      descriptionVi:
        "Tuyệt đối không chèn âm 't' hay 'ch' vào giữa, mà hãy thực hiện chuẩn xác 3 nhịp động tác sau:",
      steps: [
        {
          stepNumber: 1,
          titleVi: "Chuẩn bị khẩu hình",
          descriptionVi:
            "Phát âm xong chữ cái đứng trước, lập tức đưa lưỡi hoặc môi vào đúng vị trí chuẩn bị phát âm phụ âm đứng sau (K, S, T, hoặc P).",
          tipVi: "Ví dụ trước chữ て: đưa đầu lưỡi áp sát chân răng trên.",
        },
        {
          stepNumber: 2,
          titleVi: "Nén ngắt hơi 1 phách (Hold)",
          descriptionVi:
            "Khóa luồng khí lại, giữ yên thanh quản không tạo ra âm thanh nào trong trọn vẹn đúng 1 phách thời gian.",
          tipVi: "Cảm giác như nấc cụt hoặc giữ một tích tắc khoảng lặng.",
        },
        {
          stepNumber: 3,
          titleVi: "Bật giải phóng âm (Release)",
          descriptionVi:
            "Bật dứt khoát luồng hơi để phát âm chữ cái tiếp theo.",
          tipVi: "Âm tiếp theo sẽ nghe đanh và gọn hơn bình thường.",
        },
      ],
    },
    moraComparisons: [
      {
        id: "mc-kite-kitte",
        word: "きて",
        reading: "きて",
        romaji: "kite",
        meaningVi: "Hãy đến đây (thể て của くる)",
        moraCount: 2,
        moraBlocks: [
          { text: "き", subtext: "ki", type: "normal" },
          { text: "て", subtext: "te", type: "normal" },
        ],
        highlightNoteVi: "Không có âm ngắt: 2 phách đọc liền mạch ki - te.",
      },
      {
        id: "mc-kitte",
        word: "きって",
        reading: "きって",
        romaji: "kitte",
        meaningVi: "Con tem bưu chính",
        moraCount: 3,
        moraBlocks: [
          { text: "き", subtext: "ki", type: "normal" },
          { text: "っ", subtext: "ngắt hơi (1 phách)", type: "sokuon" },
          { text: "て", subtext: "te", type: "normal" },
        ],
        highlightNoteVi: "Chữ っ nhỏ chiếm 1 phách im lặng. Tổng cộng đúng 3 phách.",
      },
      {
        id: "mc-zasshi",
        word: "ざっし",
        reading: "ざっし",
        romaji: "zasshi",
        meaningVi: "Tạp chí",
        moraCount: 3,
        moraBlocks: [
          { text: "ざ", subtext: "za", type: "normal" },
          { text: "っ", subtext: "ngắt hơi", type: "sokuon" },
          { text: "し", subtext: "shi", type: "normal" },
        ],
        highlightNoteVi: "Trước phụ âm S: nén hơi khép răng tạo ma sát dừng 1 phách.",
      },
      {
        id: "mc-gakkou",
        word: "がっこう",
        reading: "がっこう",
        romaji: "gakkō",
        meaningVi: "Trường học",
        moraCount: 4,
        moraBlocks: [
          { text: "が", subtext: "ga", type: "normal" },
          { text: "っ", subtext: "ngắt hơi", type: "sokuon" },
          { text: "こ", subtext: "ko", type: "normal" },
          { text: "う", subtext: "u (trường âm)", type: "chouon" },
        ],
        highlightNoteVi: "ga (1) + っ (1) + ko (1) + u (1) = 4 phách trọn vẹn.",
      },
    ],
    sections: [
      {
        id: "sec-environments",
        titleVi: "4 môi trường xuất hiện âm ngắt",
        contentVi:
          "Trong tiếng Nhật chuẩn, âm ngắt っ chỉ đứng trước đúng 4 hàng phụ âm vô thanh: K, S, T, P.",
        table: {
          headers: ["Hàng phụ âm", "Cơ chế miệng khi ngắt hơi", "Ví dụ tiêu biểu"],
          rows: [
            ["Hàng K (k)", "Cuống lưỡi nâng lên chạm ngạc mềm chặn đường khí", "がっこう (gakkō - trường học), けっこん (kekkon - kết hôn)"],
            ["Hàng S (s, sh)", "Hai hàm răng khép gần nhau, luồng hơi xát nhẹ dừng lại", "ざっし (zasshi - tạp chí), きっさてん (kissaten - quán cà phê)"],
            ["Hàng T (t, ch)", "Đầu lưỡi ép chặt vào mặt sau chân răng hàm trên", "きって (kitte - tem), まって (matte - hãy đợi)"],
            ["Hàng P (p)", "Hai môi mím chặt nén áp lực khí trước khi bật", "いっぱい (ippai - đầy), きっぷ (kippu - vé xe)"],
          ],
        },
      },
    ],
    commonMistakesVi: [
      "Người Việt quen đọc chữ 'kitte' thành 'kít-tê' bằng cách chèn âm 't' tiếng Việt. Đúng chuẩn phải là giữ khoảng lặng rồi bật 'te'.",
      "Lướt quá nhanh không chừa đủ khoảng lặng tròn 1 phách, làm 'kitte kudasai' (hãy cắt) bị nghe nhầm thành 'kite kudasai' (hãy đến).",
    ],
    practiceTipsVi: [
      "Vỗ tay đập nhịp: Khi gặp chữ っ nhỏ, hãy dậm chân hoặc nắm tay lại giữ yên 1 nhịp tim trước khi phát âm chữ tiếp theo.",
    ],
    practiceQuestions: [
      {
        id: "pq-s1",
        prompt: "Cơ chế phát âm đúng của âm ngắt っ (Sokuon) là gì?",
        options: [
          { id: "opt-1", label: "Ngắt hơi, giữ yên thanh quản trong 1 phách trước khi bật âm sau", isCorrect: true },
          { id: "opt-2", label: "Phát âm thành chữ 'tsu' nhỏ", isCorrect: false },
          { id: "opt-3", label: "Kéo dài nguyên âm phía trước ra 2 nhịp", isCorrect: false },
          { id: "opt-4", label: "Chèn thêm phụ âm 't' giống tiếng Việt", isCorrect: false },
        ],
        explanationVi:
          "Âm ngắt っ là một khoảng lặng có trường độ đúng 1 phách. Bạn ngắt luồng hơi (Stop), giữ vị trí khẩu hình (Hold), rồi mới bật âm tiếp theo (Release).",
      },
      {
        id: "pq-s2",
        prompt: "Âm ngắt っ CHỈ đứng trước các hàng phụ âm nào sau đây trong tiếng Nhật chuẩn?",
        options: [
          { id: "opt-1", label: "K, S, T, P", sublabel: "4 hàng phụ âm vô thanh", isCorrect: true },
          { id: "opt-2", label: "N, M, R, W", isCorrect: false },
          { id: "opt-3", label: "G, Z, D, B", isCorrect: false },
          { id: "opt-4", label: "A, I, U, E, O", isCorrect: false },
        ],
        explanationVi:
          "Trong tiếng Nhật chuẩn, âm ngắt っ chỉ xuất hiện trước 4 hàng phụ âm vô thanh: K (ka..), S (sa..), T (ta..), và P (pa..).",
      },
      {
        id: "pq-s3",
        prompt: "Từ きって (con tem) và きて (hãy đến) khác nhau bao nhiêu phách (mora)?",
        options: [
          { id: "opt-1", label: "きって nhiều hơn 1 phách vì có âm ngắt っ", sublabel: "3 phách vs 2 phách", isCorrect: true },
          { id: "opt-2", label: "Số phách bằng nhau, chỉ khác cao độ", isCorrect: false },
          { id: "opt-3", label: "きって ít hơn 1 phách vì bị ngắt âm", isCorrect: false },
          { id: "opt-4", label: "Khác nhau 2 phách", isCorrect: false },
        ],
        explanationVi:
          "きて gồm 2 phách (ki - te). きって gồm 3 phách (ki - っ - te), trong đó âm ngắt っ chiếm trọn vẹn 1 phách thời gian.",
      },
    ],
  },

  // ==========================================
  // TOPIC 5: HATSUON ん (撥音)
  // ==========================================
  {
    id: "p-hatsuon",
    slug: "hatsuon",
    title: "Hatsuon (撥音)",
    titleVi: "Âm mũi ん / ン (Âm N đặc biệt)",
    shortSummaryVi:
      "Chữ cái độc nhất đứng riêng thành 1 phách, tự biến đổi khẩu hình [m], [n], [ŋ] theo âm sau nó.",
    category: "phonetics",
    icon: "👃",
    importance: "essential",
    estimatedReadMinutes: 4,
    overviewVi:
      "Chữ ん (n) là âm tiết đặc biệt nhất bảng chữ cái tiếng Nhật: nó không có nguyên âm đi kèm nhưng vẫn tính là một phách (mora) trọn vẹn. Khẩu hình của ん sẽ tự động biến đổi linh hoạt tùy theo âm đứng ngay sau nó thông qua hiện tượng đồng hóa âm (Assimilation).",
    moraComparisons: [
      {
        id: "mc-nihon",
        word: "にほん",
        kanji: "日本",
        reading: "にほん",
        romaji: "nihon",
        meaningVi: "Nhật Bản",
        moraCount: 3,
        moraBlocks: [
          { text: "に", subtext: "ni", type: "normal" },
          { text: "ほ", subtext: "ho", type: "normal" },
          { text: "ん", subtext: "n (1 phách)", type: "hatsuon" },
        ],
        highlightNoteVi: "Chữ ん ở cuối từ chiếm trọn vẹn 1 phách nhịp: ni (1) + ho (1) + n (1) = 3 phách.",
      },
      {
        id: "mc-shinkansen",
        word: "しんかんせん",
        kanji: "新幹線",
        reading: "しんかんせん",
        romaji: "shinkansen",
        meaningVi: "Tàu siêu tốc Shinkansen",
        moraCount: 6,
        moraBlocks: [
          { text: "し", subtext: "shi", type: "normal" },
          { text: "ん", subtext: "n (trước k)", type: "hatsuon" },
          { text: "か", subtext: "ka", type: "normal" },
          { text: "ん", subtext: "n (trước s)", type: "hatsuon" },
          { text: "せ", subtext: "se", type: "normal" },
          { text: "ん", subtext: "n (cuối từ)", type: "hatsuon" },
        ],
        highlightNoteVi: "Mỗi chữ ん đều là 1 phách. Từ này có tới 3 chữ ん, tổng cộng đúng 6 phách!",
      },
    ],
    sections: [
      {
        id: "sec-hatsuon-variants",
        titleVi: "4 cách biến đổi khẩu hình của âm ん",
        contentVi:
          "Bạn không cần gồng mình học thuộc vẹt: cơ thể bạn sẽ tự động chọn khẩu hình thuận lợi nhất để chuẩn bị phát âm âm tiếp theo:",
        table: {
          headers: ["Khẩu hình thực tế", "Âm đứng ngay sau", "Cơ chế khẩu hình", "Ví dụ thực tế"],
          rows: [
            ["Phát âm [m]", "Đứng trước m, b, p (hàng ま, ば, ぱ)", "Hai môi khép chặt lại trước khi bật âm tiếp", "さんぽ (sanpo ➔ sampo), しんぶん (shinbun ➔ shimbun), えんぴつ (enpitsu ➔ empitsu)"],
            ["Phát âm [n]", "Đứng trước t, d, n, r, ch, j (hàng た, だ, な, ら..)", "Đầu lưỡi chạm vào lợi răng hàm trên", "あんない (annai - hướng dẫn), おんな (onna - phụ nữ), べんとう (bentō - cơm hộp)"],
            ["Phát âm [ŋ] (tựa 'ng')", "Đứng trước k, g (hàng か, が)", "Gốc lưỡi nâng lên chạm ngạc mềm chặn khí", "まんが (manga - truyện tranh), てんき (tenki - thời tiết), げんき (genki - khỏe mạnh)"],
            ["Âm mũi thoát hơi [ɴ] / [ɰ̃]", "Đứng cuối câu hoặc trước nguyên âm/bán âm (a, i, u, e, o, y, w, s)", "Đầu lưỡi không chạm ngạc, luồng khí thoát đằng mũi", "にほん (nihon - Nhật Bản), ほん (hon - sách), れんあい (ren'ai - tình yêu), でんわ (denwa - điện thoại)"],
          ],
        },
      },
    ],
    commonMistakesVi: [
      "Coi âm ん chỉ là phụ âm cuối như chữ 'n' trong tiếng Việt mà nuốt mất 1 phách thời gian của nó.",
      "Cố ép đọc chữ 'n' khi đứng trước b/p thay vì khép môi tự nhiên thành [m] (ví dụ: san-po khó đọc hơn sam-po).",
      "Khi ん đứng trước nguyên âm (như れんあい ren'ai), người Việt hay đọc nối thành 're-nai', làm mất phách âm mũi.",
    ],
    practiceTipsVi: [
      "Đếm nhịp mora: Từ にほん (nihon) có 3 phách (ni - ho - n), nhịp vỗ tay rơi vào cả chữ n cuối cùng.",
    ],
    practiceQuestions: [
      {
        id: "pq-h1",
        prompt: "Khi chữ ん đứng trước các phụ âm b, p, m (như trong さんぽ - đi dạo), khẩu hình của nó biến đổi thành gì?",
        options: [
          { id: "opt-1", label: "Hai môi khép lại thành âm [m]", sublabel: "Phát âm như sampo", isCorrect: true },
          { id: "opt-2", label: "Đầu lưỡi chạm răng thành âm [n]", isCorrect: false },
          { id: "opt-3", label: "Cuống lưỡi nâng lên thành âm [ng]", isCorrect: false },
          { id: "opt-4", label: "Âm ん bị nuốt mất không phát âm", isCorrect: false },
        ],
        explanationVi:
          "Vì các âm b, p, m là âm đôi môi (bilabial), chữ ん đứng trước sẽ tự động khép hai môi tạo thành âm mũi [m] để chuyển âm mượt mà nhất.",
      },
      {
        id: "pq-h2",
        prompt: "Từ にほん (Nhật Bản) có bao nhiêu phách (mora) theo hệ thống ngữ âm tiếng Nhật?",
        options: [
          { id: "opt-1", label: "3 phách (ni - ho - n)", sublabel: "Chữ ん tính là 1 phách trọn vẹn", isCorrect: true },
          { id: "opt-2", label: "2 phách giống 2 âm tiết tiếng Việt", isCorrect: false },
          { id: "opt-3", label: "1 phách duy nhất", isCorrect: false },
          { id: "opt-4", label: "4 phách", isCorrect: false },
        ],
        explanationVi:
          "Trong tiếng Nhật, chữ ん là một phách (mora) độc lập. Do đó, にほん gồm đúng 3 phách: ni (1) + ho (1) + n (1).",
      },
      {
        id: "pq-h3",
        prompt: "Khi chữ ん đứng trước nguyên âm như trong từ れんあい (tình yêu), cách phát âm chuẩn là gì?",
        options: [
          { id: "opt-1", label: "Phát âm âm mũi thoát hơi [ɰ̃], không nối dính thành 're-nai'", isCorrect: true },
          { id: "opt-2", label: "Nối âm trực tiếp thành 're-nai' cho nhanh", isCorrect: false },
          { id: "opt-3", label: "Bỏ qua chữ ん đọc là re-ai", isCorrect: false },
          { id: "opt-4", label: "Biến thành âm ngắt っ", isCorrect: false },
        ],
        explanationVi:
          "Trước nguyên âm, chữ ん được phát âm thành nguyên âm mũi hóa [ɰ̃] độc lập 1 phách, giữ khoảng cách rõ ràng chứ không được nối âm thành 're-nai'.",
      },
    ],
  },

  // ==========================================
  // TOPIC 6: PHÁT ÂM つ (TSU)
  // ==========================================
  {
    id: "p-tsu",
    slug: "tsu",
    title: "Phát âm つ / ツ (Tsu)",
    titleVi: "Bí quyết phát âm âm つ chuẩn người bản xứ",
    shortSummaryVi:
      "Phân biệt phụ âm tắc-xát [ts] với âm 'tu' hay 'chu' tiếng Việt để không bị phát âm lơ lớ.",
    category: "phonetics",
    icon: "🎯",
    importance: "essential",
    estimatedReadMinutes: 3,
    overviewVi:
      "Âm つ (tsu) là một trong những âm gây nhiều khó khăn nhất cho người Việt Nam mới học tiếng Nhật. Rất nhiều bạn phát âm nhầm thành 'tu' (âm tắc đơn giản) hoặc 'chu' (âm cong lưỡi/chu môi). Trong ngữ âm học, つ là phụ âm tắc-xát vô thanh đầu lưỡi - chân răng [tsɯᵝ].",
    stepGuide: {
      titleVi: "3 bước phát âm âm つ chuẩn xác tuyệt đối",
      descriptionVi:
        "Hãy thực hiện tuần tự theo 3 bước khẩu hình sau trước gương:",
      steps: [
        {
          stepNumber: 1,
          titleVi: "Áp đầu lưỡi vào chân răng trên",
          descriptionVi:
            "Đặt mặt trên của đầu lưỡi áp sát vào mặt sau chân răng hàm trên (vị trí chuẩn bị nói chữ 't').",
          tipVi: "Khóa chặt luồng không khí ở khoang miệng.",
        },
        {
          stepNumber: 2,
          titleVi: "Tích tụ luồng hơi nhẹ",
          descriptionVi:
            "Nén một luồng hơi nhẹ ngay phía sau đầu lưỡi.",
          tipVi: "Không chu môi ra phía trước như khi nói 'chu'.",
        },
        {
          stepNumber: 3,
          titleVi: "Hé nhẹ lưỡi phóng luồng xát",
          descriptionVi:
            "Hạ nhẹ đầu lưỡi tạo một khe hẹp rất nhỏ để luồng hơi xát mạnh vụt ra ngoài (/ts/), kết hợp với nguyên âm u dẹt miệng.",
          tipVi: "Giống âm đuôi 'ts' trong từ 'cats' tiếng Anh nhưng thêm âm 'u'.",
        },
      ],
    },
    sections: [
      {
        id: "sec-how-to-produce-tsu",
        titleVi: "So sánh bộ ba âm dễ nhầm: つ vs す vs ち",
        contentVi:
          "Hãy quan sát sự khác biệt rõ rệt giữa ba âm này để không gọi nhầm 'mặt trăng' thành 'thích':",
        rules: [
          {
            id: "r-tsu-pairs",
            titleVi: "So sánh đối chiếu từ vựng thực tế",
            explanationVi: "Khẩu hình và luồng hơi khác nhau tạo nên các từ hoàn toàn khác biệt:",
            examples: [
              { id: "eg-ts1", japanese: "つき (月)", reading: "つき", romaji: "tsuki", meaningVi: "Mặt trăng (âm tắc-xát [ts])", highlightKana: "つ", audioUrl: null },
              { id: "eg-ts2", japanese: "すき (好き)", reading: "すき", romaji: "suki", meaningVi: "Thích (âm xát thuần [s], lưỡi không chạm răng)", highlightKana: "す", audioUrl: null },
              { id: "eg-ts3", japanese: "ちず (地図)", reading: "ちず", romaji: "chizu", meaningVi: "Bản đồ (âm tắc-xát vòm miệng [tɕ])", highlightKana: "ち", audioUrl: null },
              { id: "eg-ts4", japanese: "つくえ (机)", reading: "つくえ", romaji: "tsukue", meaningVi: "Cái bàn làm việc", highlightKana: "つ", audioUrl: null },
            ],
          },
        ],
      },
    ],
    commonMistakesVi: [
      "Đọc つ thành 'chu' (chu mỏ giống chữ ch tiếng Việt) ➔ sai khẩu hình và ngữ âm nghiêm trọng.",
      "Đọc つ thành 'tu' (chỉ có âm tắc mà không có luồng hơi xát [s] thoát ra).",
      "Chu môi quá tròn khi phát âm nguyên âm 'u' của tiếng Nhật (nguyên âm u tiếng Nhật là môi dẹt, không chu).",
    ],
    practiceTipsVi: [
      "Nói từ 'cats' hoặc 'bats' trong tiếng Anh rồi giữ lại đuôi âm 'ts', sau đó thở nhẹ âm 'u' dẹt miệng: cats ➔ tsu.",
    ],
    practiceQuestions: [
      {
        id: "pq-t1",
        prompt: "Phụ âm của chữ つ (tsu) thuộc loại âm nào trong ngữ âm học?",
        options: [
          { id: "opt-1", label: "Âm tắc - xát (Affricate) [ts]", sublabel: "Chạm đầu lưỡi rồi xát luồng hơi ra", isCorrect: true },
          { id: "opt-2", label: "Âm tắc thuần túy giống chữ 't'", isCorrect: false },
          { id: "opt-3", label: "Âm xát thuần túy giống chữ 's'", isCorrect: false },
          { id: "opt-4", label: "Âm mũi giống chữ 'n'", isCorrect: false },
        ],
        explanationVi:
          "つ [tsɯᵝ] là âm tắc-xát: ban đầu đầu lưỡi chặn luồng khí (tắc), sau đó mở hé khe hẹp để khí ma sát thoát ra (xát).",
      },
      {
        id: "pq-t2",
        prompt: "Lỗi phát âm chữ つ phổ biến nhất mà người Việt Nam hay mắc phải là gì?",
        options: [
          { id: "opt-1", label: "Chu mỏ đọc thành 'chu' hoặc đọc thành 'tu'", isCorrect: true },
          { id: "opt-2", label: "Đọc thành âm 'ka'", isCorrect: false },
          { id: "opt-3", label: "Kéo dài thành trường âm", isCorrect: false },
          { id: "opt-4", label: "Nuốt mất phụ âm", isCorrect: false },
        ],
        explanationVi:
          "Người Việt hay có xu hướng chu mỏ đọc thành 'chu' giống chữ ch tiếng Việt, hoặc phát âm thành 'tu' thiếu luồng hơi xát.",
      },
      {
        id: "pq-t3",
        prompt: "Từ つき (tsuki - mặt trăng) khác với すき (suki - thích) ở điểm mấu chốt nào?",
        options: [
          { id: "opt-1", label: "Chữ つ có đầu lưỡi chạm chân răng chặn khí trước khi xát, chữ す thì không", isCorrect: true },
          { id: "opt-2", label: "Chữ つ phát âm chu môi, chữ す dẹt môi", isCorrect: false },
          { id: "opt-3", label: "Hai từ này phát âm hoàn toàn giống nhau", isCorrect: false },
          { id: "opt-4", label: "Chữ つ có âm rung dây thanh, chữ す thì không", isCorrect: false },
        ],
        explanationVi:
          "Với す [sɯᵝ], đầu lưỡi không chạm chân răng mà tạo khe hở xát ngay từ đầu. Với つ [tsɯᵝ], đầu lưỡi phải chạm chặt chân răng chặn khí rồi mới mở hé xát ra.",
      },
    ],
  },

  // ==========================================
  // TOPIC 7: GA-ROW PRONUNCIATION (が・ぎ・ぐ・げ・ご)
  // ==========================================
  {
    id: "p-ga-row",
    slug: "ga-row",
    title: "Phát âm hàng が (Bidakuon)",
    titleVi: "Hiện tượng âm mũi hàng Ga (Đục âm vs Tỵ đục âm)",
    shortSummaryVi:
      "Hiểu rõ hiện tượng người bản xứ và phát thanh viên NHK đọc 'ga' mềm mại tựa như 'nga' ở giữa câu.",
    category: "phonetics",
    icon: "📻",
    importance: "advanced",
    estimatedReadMinutes: 4,
    overviewVi:
      "Trong tiếng Nhật chuẩn, hàng が (ga, gi, gu, ge, go) có hai biến thể âm: Âm tắc đục thông thường [ɡ] và Âm mũi đục (Bidakuon - 鼻濁音 [ŋ]). Nắm vững hiện tượng này giúp bạn hiểu vì sao nghe người bản xứ đôi khi phát âm 'watashi ga' thành âm mềm mại tựa như 'nga'.",
    sections: [
      {
        id: "sec-ga-positions",
        titleVi: "Quy luật và lời khuyên chuẩn xác cho người mới học",
        contentVi:
          "QUY TẮC VÀNG CHO NGƯỜI BẮT ĐẦU:\n1. Phát âm âm [ɡ] rõ ràng (giống chữ 'g' tiếng Việt) ở MỌI VỊ TRÍ là hoàn toàn chuẩn xác, tự nhiên và được 100% người Nhật hiểu.\n2. Giới trẻ Nhật ngày nay cũng có xu hướng phát âm [ɡ] phổ biến trong đời thường.\n3. Bidakuon [ŋ] (âm mũi) chủ yếu được sử dụng bởi các phát thanh viên NHK, người lớn tuổi, hoặc trong diễn kịch truyền thống nhằm tạo cảm giác tao nhã, mềm mại.",
        table: {
          headers: ["Vị trí trong câu/từ", "Hiện tượng truyền thống (Bidakuon)", "Xu hướng hiện đại & Lời khuyên", "Ví dụ cụ thể"],
          rows: [
            ["Đầu câu / Đầu từ", "Luôn phát âm là âm tắc đục [ɡ]", "Phát âm [ɡ] rõ ràng dứt khoát", "がくせい (gakusei - học sinh), がっこう (gakkō)"],
            ["Giữa từ vựng", "Có xu hướng phát âm thành âm mũi [ŋ]", "Phát âm [ɡ] hay [ŋ] đều được chấp nhận", "かがみ (kagami ➔ ka-ŋa-mi: cái gương), かぎ (kagi)"],
            ["Trợ từ が (ga)", "Thường phát âm mềm mại thành [ŋa]", "Người học nói [ɡa] vẫn hoàn toàn chuẩn", "わたしが (watashi ga ➔ watashi ŋa: Tôi thì...)"],
          ],
        },
      },
      {
        id: "sec-ga-compare",
        titleVi: "Các ví dụ minh họa hàng Ga",
        contentVi: "Quan sát các vị trí khác nhau của chữ が trong từ vựng và câu:",
        rules: [
          {
            id: "r-ga-compare",
            titleVi: "Ví dụ đầu từ vs giữa từ vs trợ từ",
            explanationVi: "Xem các trường hợp thực tế trong giao tiếp tiếng Nhật:",
            examples: [
              { id: "eg-g1", japanese: "がくせい (学生)", reading: "がくせい", romaji: "gakusei", meaningVi: "Học sinh (đầu từ: đọc [ɡ] dứt khoát)", highlightKana: "が", audioUrl: null },
              { id: "eg-g2", japanese: "かがみ (鏡)", reading: "かがみ", romaji: "kagami", meaningVi: "Cái gương (giữa từ: người bản xứ đọc mềm tựa ka-nga-mi)", highlightKana: "が", audioUrl: null },
              { id: "eg-g3", japanese: "だいがく (大学)", reading: "だいがく", romaji: "daigaku", meaningVi: "Đại học (giữa từ: dai-gaku hoặc dai-ŋaku)", highlightKana: "が", audioUrl: null },
              { id: "eg-g4", japanese: "わたしが (私が)", reading: "わたしが", romaji: "watashi ga", meaningVi: "Trợ từ が (thường nghe mềm như nga trong đài báo)", highlightKana: "が", audioUrl: null },
            ],
          },
        ],
      },
    ],
    commonMistakesVi: [
      "Quá hoang mang khi nghe người Nhật nói 'watashi nga' và tưởng đó là một trợ từ hoàn toàn mới.",
      "Cố gượng ép biến tất cả mọi chữ 'ga' thành 'nga' (ví dụ đọc gakusei thành ngakusei là SAI vì đầu từ luôn là [ɡ]).",
    ],
    practiceTipsVi: [
      "Lắng nghe các bản tin của đài NHK để làm quen với độ mềm mại của âm mũi Bidakuon khi người dẫn chương trình đọc trợ từ が.",
    ],
    practiceQuestions: [
      {
        id: "pq-g1",
        prompt: "Phát biểu nào sau đây về phát âm hàng が (ga, gi, gu, ge, go) là CHÍNH XÁC?",
        options: [
          { id: "opt-1", label: "Phát âm [ɡ] rõ ràng ở mọi vị trí là hoàn toàn chuẩn xác và được hiểu 100%", isCorrect: true },
          { id: "opt-2", label: "Tất cả mọi chữ hàng が bắt buộc phải đọc thành 'nga'", isCorrect: false },
          { id: "opt-3", label: "Chữ が ở đầu từ bắt buộc phải đọc thành 'nga'", isCorrect: false },
          { id: "opt-4", label: "Hàng が không bao giờ có biến thể âm mũi", isCorrect: false },
        ],
        explanationVi:
          "Người học hoàn toàn có thể an tâm phát âm [ɡ] rõ ràng ở mọi vị trí. Âm mũi Bidakuon [ŋ] chỉ là một biến thể ngữ âm truyền thống, không bắt buộc người mới học phải ép mình phát âm.",
      },
      {
        id: "pq-g2",
        prompt: "Khi chữ が đứng ở ĐẦU TỪ (như がくせい - học sinh), quy tắc phát âm chuẩn là gì?",
        options: [
          { id: "opt-1", label: "Luôn luôn phát âm là âm tắc đục [ɡ] rõ ràng", isCorrect: true },
          { id: "opt-2", label: "Đọc thành âm mũi [ŋ]", isCorrect: false },
          { id: "opt-3", label: "Đọc thành âm vô thanh [k]", isCorrect: false },
          { id: "opt-4", label: "Nuốt âm không phát âm", isCorrect: false },
        ],
        explanationVi:
          "Ở đầu từ (word-initial), hàng が luôn luôn được phát âm là âm tắc đục [ɡ], không bao giờ biến thành âm mũi.",
      },
      {
        id: "pq-g3",
        prompt: "Hiện tượng Tỵ đục âm (Bidakuon - đọc tựa như 'nga') thường dễ bắt gặp nhất ở đâu?",
        options: [
          { id: "opt-1", label: "Ở giữa từ vựng hoặc trợ từ が trong giọng đọc chuẩn NHK", isCorrect: true },
          { id: "opt-2", label: "Chỉ có trong tiếng lóng của giới trẻ", isCorrect: false },
          { id: "opt-3", label: "Trong từ mượn tiếng Anh Katakana", isCorrect: false },
          { id: "opt-4", label: "Chỉ có ở đầu câu", isCorrect: false },
        ],
        explanationVi:
          "Bidakuon xuất hiện ở vị trí giữa từ hoặc ở trợ từ が, là chuẩn mực truyền thống được đào tạo khắt khe cho phát thanh viên đài truyền hình NHK.",
      },
    ],
  },

  // ==========================================
  // TOPIC 8: VOWEL DEVOICING (母音の無声化)
  // ==========================================
  {
    id: "p-devoicing",
    slug: "devoicing",
    title: "Vô thanh hóa nguyên âm (Bosei no Museika)",
    titleVi: "Hiện tượng lướt âm [i] và [u] trong ~desu, ~masu",
    shortSummaryVi:
      "Lý do tại sao です đọc là 'đề-s' chứ không phải 'đề-xư', và すき đọc lướt thành 's-ki'.",
    category: "phonetics",
    icon: "💨",
    importance: "essential",
    estimatedReadMinutes: 4,
    overviewVi:
      "Vô thanh hóa nguyên âm (母音の無声化) là hiện tượng hai nguyên âm hẹp [i] và [u] bị triệt tiêu sự rung động của dây thanh đới khi kẹp giữa hai phụ âm vô thanh (k, s, t, h, p) hoặc đứng ở cuối câu sau một phụ âm vô thanh. Miệng vẫn tạo khẩu hình nguyên âm đó nhưng luồng khí chỉ thổi qua như một âm thì thầm.",
    sections: [
      {
        id: "sec-devoicing-conditions",
        titleVi: "Khi nào hiện tượng vô thanh hóa xảy ra?",
        contentVi:
          "Nguyên âm bị vô thanh hóa KHÔNG PHẢI là bị xóa bỏ hoàn toàn! Bạn vẫn giữ khẩu hình của âm [i] hoặc [u], nhưng thở luồng khí nhẹ ra mà không rung thanh đới.\nĐiều này tạo nên nét tự nhiên đặc trưng, thanh thoát của người bản xứ.",
        table: {
          headers: ["Điều kiện xuất hiện", "Cơ chế ngữ âm", "Ví dụ thực tế"],
          rows: [
            ["Cuối câu sau phụ âm vô thanh", "Nguyên âm [u] sau âm s bị vô thanh hóa thành tiếng xì gió", "です (desu ➔ [desɯ̥]), ます (masu ➔ [masɯ̥])"],
            ["Kẹp giữa 2 phụ âm vô thanh (k, s, t, h, p)", "Nguyên âm [i], [u] bị ép thành âm gió lướt", "すき (suki ➔ [sɯ̥ki]), つき (tsuki ➔ [tsɯ̥ki]), くさ (kusa ➔ [kɯ̥sa])"],
            ["Trong đuôi quá khứ ~mashita", "Âm [i] trong chữ し bị lướt nhanh", "たべました (tabemashita ➔ [tabemaɕi̥ta])"],
            ["Âm [i] sau phụ âm h", "Âm [i] trong ひと bị lướt nhẹ", "ひと (hito ➔ [çi̥to]: người)"],
          ],
        },
      },
      {
        id: "sec-devoicing-examples",
        titleVi: "Các ví dụ vô thanh hóa hàng ngày",
        contentVi: "Các từ vựng và đuôi câu căn bản xuất hiện ngay trong bài học đầu tiên:",
        rules: [
          {
            id: "r-devoicing-cases",
            titleVi: "So sánh khẩu hình thực tế",
            explanationVi: "Xem các trường hợp phổ biến nhất:",
            examples: [
              { id: "eg-d1", japanese: "です", reading: "です", romaji: "desu", meaningVi: "Là... (nguyên âm u ở cuối từ triệt tiêu, phát âm gọn [des])", highlightKana: "す", audioUrl: null },
              { id: "eg-d2", japanese: "たべました", reading: "たべました", romaji: "tabemashita", meaningVi: "Đã ăn (âm i trong shi bị vô thanh hóa: [tabemashta])", highlightKana: "し", audioUrl: null },
              { id: "eg-d3", japanese: "すき (好き)", reading: "すき", romaji: "suki", meaningVi: "Thích (u kẹp giữa s và k: phát âm lướt nhẹ [s'ki])", highlightKana: "す", audioUrl: null },
              { id: "eg-d4", japanese: "くつ (靴)", reading: "くつ", romaji: "kutsu", meaningVi: "Đôi giày (u kẹp giữa k và ts: phát âm [k'tsu])", highlightKana: "く", audioUrl: null },
            ],
          },
        ],
      },
    ],
    commonMistakesVi: [
      "Phát âm rành rọt từng chữ 'đề - xư', 'tá - bê - ma - si - ta' khiến câu nói bị gượng gạo, cứng đơ như người máy.",
      "Tưởng rằng âm 'u' bị biến mất hẳn nên bỏ luôn khẩu hình môi.",
      "Khi nói chậm rãi hoặc khi hát bài hát, nguyên âm vẫn có thể được phát âm hữu thanh bình thường — không xem vô thanh hóa là quy tắc tuyệt đối.",
    ],
    practiceTipsVi: [
      "Khi nói 'desu', chỉ cần khép nhẹ hai hàm răng và xì nhẹ hơi [s] ra ở cuối câu thay vì tròn miệng nói rõ chữ 'xư'.",
    ],
    practiceQuestions: [
      {
        id: "pq-v1",
        prompt: "Hiện tượng vô thanh hóa nguyên âm (Bosei no Museika) xảy ra chủ yếu với hai nguyên âm nào?",
        options: [
          { id: "opt-1", label: "[i] và [u]", sublabel: "Hai nguyên âm hẹp trong tiếng Nhật", isCorrect: true },
          { id: "opt-2", label: "[a] và [o]", isCorrect: false },
          { id: "opt-3", label: "[e] và [o]", isCorrect: false },
          { id: "opt-4", label: "[a] và [e]", isCorrect: false },
        ],
        explanationVi:
          "Hai nguyên âm hẹp [i] và [u] có độ mở miệng nhỏ và năng lượng âm thấp, nên dễ bị vô thanh hóa nhất khi kẹp giữa các phụ âm vô thanh.",
      },
      {
        id: "pq-v2",
        prompt: "Tại sao từ です (desu) trong thực tế giao tiếp người Nhật thường phát âm tựa như 'des'?",
        options: [
          { id: "opt-1", label: "Vì nguyên âm [u] đứng ở cuối câu sau phụ âm vô thanh [s] bị triệt tiêu rung động thanh đới", isCorrect: true },
          { id: "opt-2", label: "Vì người Nhật đọc tắt cho nhanh", isCorrect: false },
          { id: "opt-3", label: "Vì chữ す không có nguyên âm", isCorrect: false },
          { id: "opt-4", label: "Do ảnh hưởng của tiếng Anh", isCorrect: false },
        ],
        explanationVi:
          "Sau phụ âm vô thanh [s] ở cuối câu trước khi dừng nhịp, nguyên âm [u] bị vô thanh hóa tự nhiên, biến thành luồng hơi xì nhẹ không rung dây thanh.",
      },
      {
        id: "pq-v3",
        prompt: "Phát biểu nào sau đây về vô thanh hóa nguyên âm là ĐÚNG?",
        options: [
          { id: "opt-1", label: "Khẩu hình vẫn được hình thành nhưng dây thanh đới không rung; khi hát hoặc nhấn mạnh vẫn có thể có thanh", isCorrect: true },
          { id: "opt-2", label: "Nguyên âm biến mất hoàn toàn không để lại dấu vết gì", isCorrect: false },
          { id: "opt-3", label: "Đây là một lỗi phát âm cần phải loại bỏ", isCorrect: false },
          { id: "opt-4", label: "Bắt buộc phải áp dụng trong 100% mọi tình huống", isCorrect: false },
        ],
        explanationVi:
          "Vô thanh hóa là hiện tượng tự nhiên giúp lời nói thanh thoát. Khẩu hình miệng vẫn tạo hình âm đó, và trong trường hợp nhấn mạnh hay hát ca khúc, âm vẫn có thể được phát âm hữu thanh.",
      },
    ],
  },

  // ==========================================
  // TOPIC 9: PITCH ACCENT (高低アクセント)
  // ==========================================
  {
    id: "p-pitch-accent",
    slug: "pitch-accent",
    title: "Pitch Accent (高低アクセント)",
    titleVi: "Trọng âm cao độ tiếng Nhật (Cao - Thấp)",
    shortSummaryVi:
      "Tiếng Nhật không có dấu thanh điệu mà dùng nốt cao - nốt thấp để phân biệt từ vựng chuẩn Tokyo.",
    category: "prosody",
    icon: "📈",
    importance: "essential",
    estimatedReadMinutes: 5,
    overviewVi:
      "Khác với tiếng Việt (ngôn ngữ thanh điệu với 6 dấu thanh phức tạp) hay tiếng Anh (ngôn ngữ nhấn trọng âm độ mạnh bằng hơi - Stress Accent), tiếng Nhật sử dụng Trọng âm cao độ (Pitch Accent). Mỗi phách (mora) được phát âm ở một trong hai cao độ: CAO [H] hoặc THẤP [L].",
    pitchPatterns: [
      {
        id: "pp-atamadaka-ame",
        word: "あめ",
        kanji: "雨",
        reading: "あめ",
        romaji: "àme",
        patternType: "atamadaka",
        patternNameVi: "Đầu cao (Atamadaka)",
        pitchContour: ["high", "low"],
        moras: ["あ", "め"],
        dropIndex: 0,
        meaningVi: "Cơn mưa (Phách 1 CAO, phách 2 rơi THẤP)",
        particleExample: {
          particle: "が",
          particlePitch: "low",
          fullReading: "あめが (A-me-ga: H-L-L)",
          explanationVi: "Trợ từ đi sau rơi xuống THẤP (A-me-ga).",
        },
      },
      {
        id: "pp-heiban-ame",
        word: "あめ",
        kanji: "飴",
        reading: "あめ",
        romaji: "amé",
        patternType: "heiban",
        patternNameVi: "Bằng phẳng (Heiban)",
        pitchContour: ["low", "high"],
        moras: ["あ", "め"],
        meaningVi: "Viên kẹo (Phách 1 THẤP, phách 2 CAO)",
        particleExample: {
          particle: "が",
          particlePitch: "high",
          fullReading: "あめが (a-ME-GA: L-H-H)",
          explanationVi: "Không có điểm rơi: Trợ từ が VẪN GIỮ CAO!",
        },
      },
      {
        id: "pp-nakadaka-tamago",
        word: "たまご",
        kanji: "卵",
        reading: "たまご",
        romaji: "tamágo",
        patternType: "nakadaka",
        patternNameVi: "Giữa cao (Nakadaka)",
        pitchContour: ["low", "high", "low"],
        moras: ["た", "ま", "ご"],
        dropIndex: 1,
        meaningVi: "Quả trứng (ta Thấp, MA Cao, go Thấp)",
        particleExample: {
          particle: "が",
          particlePitch: "low",
          fullReading: "たまごが (ta-MA-go-ga: L-H-L-L)",
          explanationVi: "Rơi ở mora giữa: Trợ từ đi sau là THẤP.",
        },
      },
      {
        id: "pp-odaka-hana",
        word: "はな",
        kanji: "花",
        reading: "はな",
        romaji: "haná",
        patternType: "odaka",
        patternNameVi: "Đuôi cao (Odaka)",
        pitchContour: ["low", "high"],
        moras: ["は", "な"],
        dropIndex: 1,
        meaningVi: "Bông hoa (ha Thấp, NA Cao)",
        particleExample: {
          particle: "が",
          particlePitch: "low",
          fullReading: "はなが (ha-NA-ga: L-H-L)",
          explanationVi:
            "Điểm rơi ngay sau phách cuối: TRỢ TỪ RƠI XUỐNG THẤP! (Khác với Heiban はな [Mũi] thì trợ từ vẫn Cao).",
        },
      },
    ],
    sections: [
      {
        id: "sec-pitch-patterns",
        titleVi: "2 nguyên tắc vàng của cao độ chuẩn Tokyo",
        contentVi:
          "Trong tiếng Nhật chuẩn Tokyo, có hai quy tắc bất di bất dịch:\n1. Phách 1 và Phách 2 LUÔN CÓ CAO ĐỘ KHÁC NHAU (nếu phách 1 Thấp thì phách 2 Cao; nếu phách 1 Cao thì phách 2 Thấp).\n2. Một khi cao độ đã rơi xuống Thấp sau hạt nhân trọng âm (Accent Nucleus) thì trong cùng một từ KHÔNG BAO GIỜ vọt lên Cao lại.",
        table: {
          headers: ["Mô hình Tokyo", "Đặc điểm cao độ", "Vị trí điểm rơi (Nucleus)", "Ví dụ đối chiếu"],
          rows: [
            ["Atamadaka (頭高型 - Đầu cao)", "Cao ➔ Thấp ➔ Thấp...", "Rơi ngay sau phách 1", "あめ (雨 - Mưa: A cao, me thấp), はし (箸 - Đũa)"],
            ["Heiban (平板型 - Bằng phẳng)", "Thấp ➔ Cao ➔ Cao... (Trợ từ vẫn Cao)", "Không có điểm rơi", "あめ (飴 - Kẹo: a thấp, ME cao), さくら (Hoa anh đào)"],
            ["Nakadaka (中高型 - Giữa cao)", "Thấp ➔ CAO... ➔ Thấp...", "Rơi ở một phách giữa từ", "たまご (卵 - Trứng: ta-MA-go), あなた (Bạn)"],
            ["Odaka (尾高型 - Đuôi cao)", "Thấp ➔ Cao... (Trợ từ rơi xuống Thấp)", "Rơi ngay sau phách cuối cùng", "はな (花 - Hoa: ha-NA, trợ từ ga Thấp), はし (橋 - Cây cầu)"],
          ],
        },
      },
      {
        id: "sec-classic-pairs",
        titleVi: "Sự khác biệt sống còn giữa Heiban và Odaka",
        contentVi:
          "Hai từ はな (Mũi) và はな (Hoa) khi đứng một mình đều phát âm là ha-NA (Thấp - Cao).\nSự khác biệt chỉ lộ diện khi đi kèm trợ từ (như が):",
        rules: [
          {
            id: "r-pitch-ame-hashi",
            titleVi: "So sánh はな (Mũi) vs はな (Hoa)",
            explanationVi: "Xem cách trợ từ phản ánh mô hình cao độ:",
            examples: [
              { id: "eg-pa1", japanese: "鼻 (はな) + が", reading: "はなが [L-H-H]", romaji: "hana ga (Heiban)", meaningVi: "Cái mũi (Heiban: trợ từ が vẫn giữ CAO)", audioUrl: null },
              { id: "eg-pa2", japanese: "花 (はな) + が", reading: "はなが [L-H-L]", romaji: "hana ga (Odaka)", meaningVi: "Bông hoa (Odaka: trợ từ が rơi xuống THẤP)", audioUrl: null },
              { id: "eg-pa3", japanese: "雨 (あめ)", reading: "あめ [H-L]", romaji: "A-me (Atamadaka)", meaningVi: "Cơn mưa (Atamadaka: A cao, me thấp)", audioUrl: null },
              { id: "eg-pa4", japanese: "飴 (あめ)", reading: "あめ [L-H]", romaji: "a-ME (Heiban)", meaningVi: "Viên kẹo (Heiban: a thấp, me cao)", audioUrl: null },
            ],
          },
        ],
      },
    ],
    commonMistakesVi: [
      "Người Việt quen mang dấu tiếng Việt áp vào tiếng Nhật (như đọc 'arigatou' thành 'a-ri-gá-tồ'). Tiếng Nhật là nốt nhạc phẳng lượn sóng.",
      "Nhấn giọng thật mạnh kiểu Stress Accent tiếng Anh (to - nhỏ) thay vì thay đổi cao độ thanh quản (cao - thấp).",
    ],
    practiceTipsVi: [
      "Ngân nga từ ngữ theo 2 nốt nhạc Đô (Thấp) - Sol (Cao) để cơ thể làm quen với việc điều khiển cao độ thay vì nhấn lực hơi.",
    ],
    practiceQuestions: [
      {
        id: "pq-p1",
        prompt: "Trong tiếng Nhật chuẩn Tokyo, quan hệ cao độ giữa Phách 1 và Phách 2 luôn tuân theo quy tắc nào?",
        options: [
          { id: "opt-1", label: "Phách 1 và Phách 2 luôn có cao độ KHÁC NHAU (nếu 1 Thấp thì 2 Cao, hoặc ngược lại)", isCorrect: true },
          { id: "opt-2", label: "Phách 1 và Phách 2 luôn luôn cùng Cao", isCorrect: false },
          { id: "opt-3", label: "Phách 1 và Phách 2 luôn luôn cùng Thấp", isCorrect: false },
          { id: "opt-4", label: "Không có quy tắc nào, tùy ý người nói", isCorrect: false },
        ],
        explanationVi:
          "Quy tắc cơ bản của phương ngữ Tokyo: Phách 1 và Phách 2 luôn khác cao độ. Không bao giờ có chuyện cả hai phách đầu cùng Cao hoặc cùng Thấp.",
      },
      {
        id: "pq-p2",
        prompt: "Điểm khác biệt mấu chốt giữa mô hình Bằng phẳng (Heiban) và Đuôi cao (Odaka) khi nối với trợ từ が là gì?",
        options: [
          { id: "opt-1", label: "Với Heiban trợ từ が vẫn giữ Cao; với Odaka trợ từ が bị rơi xuống Thấp", isCorrect: true },
          { id: "opt-2", label: "Heiban có điểm rơi, Odaka không có điểm rơi", isCorrect: false },
          { id: "opt-3", label: "Odaka có phách đầu cao, Heiban có phách đầu thấp", isCorrect: false },
          { id: "opt-4", label: "Hai mô hình này khi có trợ từ hoàn toàn giống hệt nhau", isCorrect: false },
        ],
        explanationVi:
          "Từ Odaka có điểm rơi hạt nhân ngay sau phách cuối, do đó trợ từ đi kèm bị kéo xuống Thấp (ví dụ: はなが L-H-L). Từ Heiban không có điểm rơi nên trợ từ tiếp tục giữ Cao (L-H-H).",
      },
      {
        id: "pq-p3",
        prompt: "Từ あめ (雨 - Mưa) thuộc mô hình cao độ nào trong chuẩn Tokyo?",
        options: [
          { id: "opt-1", label: "Atamadaka (Đầu cao: A cao, me thấp)", isCorrect: true },
          { id: "opt-2", label: "Heiban (Bằng phẳng: a thấp, me cao)", sublabel: "Đây là viên kẹo (飴)", isCorrect: false },
          { id: "opt-3", label: "Nakadaka (Giữa cao)", isCorrect: false },
          { id: "opt-4", label: "Odaka (Đuôi cao)", isCorrect: false },
        ],
        explanationVi:
          "Cơn mưa (雨) thuộc mô hình Atamadaka: phách đầu [A] cao và phách sau [me] thấp. Ngược lại, viên kẹo (飴) thuộc mô hình Heiban: [a] thấp và [me] cao.",
      },
    ],
  },

  // ==========================================
  // TOPIC 10: INTONATION (Ngữ điệu câu)
  // ==========================================
  {
    id: "p-intonation",
    slug: "intonation",
    title: "Ngữ điệu câu (Intonation)",
    titleVi: "Ngữ điệu câu: Hỏi, Khẳng định & Cảm thán",
    shortSummaryVi:
      "Quy tắc lên giọng cuối câu hỏi, giữ bằng giọng trần thuật và các tiểu từ biểu cảm ね, よ.",
    category: "prosody",
    icon: "🎶",
    importance: "essential",
    estimatedReadMinutes: 3,
    overviewVi:
      "Ngữ điệu câu (Intonation) thể hiện thái độ, cảm xúc và mục đích giao tiếp của người nói ở cấp độ cả câu. Trong tiếng Nhật, sự điều chỉnh cao độ ở 1-2 âm tiết cuối cùng quyết định bạn đang chân thành hỏi, khẳng định dứt khoát hay tìm kiếm sự đồng cảm.",
    sections: [
      {
        id: "sec-sentence-types",
        titleVi: "4 bối cảnh ngữ điệu câu cốt lõi",
        contentVi:
          "Tránh các quy tắc giản lược sai lệch như 'hỏi luôn lên, kể luôn xuống'. Ngữ điệu thực tế phụ thuộc chặt chẽ vào ngữ cảnh và cảm xúc người nói:",
        rules: [
          {
            id: "r-question-intonation",
            titleVi: "1. Câu hỏi nghi vấn & Hỏi thân mật (Lên giọng ↗)",
            explanationVi:
              "Khi kết thúc bằng trợ từ nghi vấn か tìm kiếm thông tin mới, hoặc câu hỏi thân mật bỏ trợ từ, hãy nâng cao độ ở âm tiết cuối cùng.",
            examples: [
              { id: "eg-i1", japanese: "これですか↗", reading: "これですか", romaji: "Kore desu ka? ↗", meaningVi: "Cái này phải không? (lên giọng rõ ở âm ka)", highlightKana: "か", audioUrl: null },
              { id: "eg-i2", japanese: "いく？↗", reading: "いく", romaji: "Iku? ↗", meaningVi: "Đi không? (hỏi thân mật lên giọng ở phách ku)", highlightKana: "く", audioUrl: null },
            ],
          },
          {
            id: "r-statement-intonation",
            titleVi: "2. Câu trần thuật khẳng định & Vỡ lẽ (Hạ nhẹ ↘ hoặc Ngang →)",
            explanationVi:
              "Câu trần thuật bình thường kết thúc bằng です/ます sẽ đi ngang và hơi hạ nhẹ. Trong câu biểu thị sự nhận ra, vỡ lẽ (tu từ), ngữ điệu hạ trầm xuống.",
            examples: [
              { id: "eg-i3", japanese: "はい、そうです↘", reading: "はい、そうです", romaji: "Hai, sō desu. ↘", meaningVi: "Vâng, đúng vậy rồi. (khẳng định trầm tĩnh)", audioUrl: null },
              { id: "eg-i4", japanese: "そうだったのか↘", reading: "そうだったのか", romaji: "Sō datta no ka... ↘", meaningVi: "Hóa ra là như vậy à... (vỡ lẽ, ngữ điệu hạ trầm dù có ka)", highlightKana: "か", audioUrl: null },
            ],
          },
          {
            id: "r-particle-ne",
            titleVi: "3. Trợ từ ね: Lên nhẹ ↗ (xác nhận) vs Ngân dài → (đồng cảm)",
            explanationVi:
              "Trợ từ ね lên nhẹ khi muốn đối phương xác nhận; ngân dài đi ngang khi cùng đồng cảm sâu sắc.",
            examples: [
              { id: "eg-i5", japanese: "明日ですね？↗", reading: "あしたですね", romaji: "Ashita desu ne? ↗", meaningVi: "Ngày mai đúng không nhỉ? (lên nhẹ cầu thị xác nhận)", highlightKana: "ね", audioUrl: null },
              { id: "eg-i6", japanese: "いい天気ですね〜→", reading: "いいてんきですね", romaji: "Ii tenki desu ne~ →", meaningVi: "Thời tiết đẹp quá nhỉ! (ngân ngang đồng cảm)", highlightKana: "ね", audioUrl: null },
            ],
          },
          {
            id: "r-particle-yo",
            titleVi: "4. Trợ từ よ: Dứt khoát nhấn mạnh thông tin mới",
            explanationVi:
              "Trợ từ よ mang sắc thái thông báo điều đối phương chưa biết hoặc khuyên nhủ, ngữ điệu dứt khoát.",
            examples: [
              { id: "eg-i7", japanese: "おいしいですよ！", reading: "おいしいですよ", romaji: "Oishii desu yo!", meaningVi: "Món này ngon lắm đấy nhé! (nhấn mạnh truyền đạt)", highlightKana: "よ", audioUrl: null },
            ],
          },
        ],
      },
    ],
    commonMistakesVi: [
      "Quá lên giọng kịch tính ở giữa câu làm gãy vỡ nhịp điệu cao độ tự nhiên của tiếng Nhật.",
      "Quên lên giọng ở câu hỏi thân mật không có trợ từ か khiến đối phương tưởng bạn đang nói câu trần thuật khẳng định.",
      "Áp dụng máy móc quy tắc 'cứ có chữ か là phải lên giọng' kể cả khi nói câu tự vấn, vỡ lẽ.",
    ],
    practiceTipsVi: [
      "Luyện nói câu thoại ngắn theo cặp: Một bạn hỏi lên giọng 'Iku? ↗' và bạn kia đáp hạ giọng dứt khoát 'Iku! ↘'.",
    ],
    practiceQuestions: [
      {
        id: "pq-in1",
        prompt: "Trong câu hỏi thân mật không dùng trợ từ か (ví dụ: いく？ - Đi không?), người nói cần thể hiện ngữ điệu như thế nào?",
        options: [
          { id: "opt-1", label: "Lên giọng rõ ràng ở âm tiết cuối cùng ↗", isCorrect: true },
          { id: "opt-2", label: "Hạ giọng thật trầm ở âm tiết cuối ↘", isCorrect: false },
          { id: "opt-3", label: "Giữ bằng giọng đều đều không đổi", isCorrect: false },
          { id: "opt-4", label: "Ngừng thở không phát âm", isCorrect: false },
        ],
        explanationVi:
          "Trong câu hỏi thân mật không có trợ từ nghi vấn か, việc lên giọng ở âm tiết cuối (Iku? ↗) là dấu hiệu duy nhất giúp người nghe nhận biết đây là câu hỏi thay vì câu trần thuật.",
      },
      {
        id: "pq-in2",
        prompt: "Khi nói câu biểu thị sự vỡ lẽ, tự nhủ với bản thân (như そうだったのか - Hóa ra là vậy à...), ngữ điệu thường diễn biến thế nào?",
        options: [
          { id: "opt-1", label: "Hạ trầm giọng xuống ở cuối câu ↘ dù có trợ từ か", isCorrect: true },
          { id: "opt-2", label: "Luôn luôn vọt cao giọng lên thật mạnh", isCorrect: false },
          { id: "opt-3", label: "Bắt buộc phải lên giọng vì có trợ từ か", isCorrect: false },
          { id: "opt-4", label: "Kéo dài âm ka thành 3 phách", isCorrect: false },
        ],
        explanationVi:
          "Ngữ điệu phụ thuộc vào ngữ cảnh và cảm xúc: Trong câu cảm thán, tự nhủ hay vỡ lẽ, dù có trợ từ か thì ngữ điệu vẫn hạ trầm xuống chứ không lên giọng như câu hỏi tìm thông tin.",
      },
      {
        id: "pq-in3",
        prompt: "Trợ từ cuối câu ね thường được dùng với ngữ điệu nào khi người nói muốn thể hiện sự đồng cảm sâu sắc (ví dụ: いい天気ですね〜)?",
        options: [
          { id: "opt-1", label: "Ngân dài nhẹ nhàng đi ngang hoặc hơi hạ êm dịu →", isCorrect: true },
          { id: "opt-2", label: "Bật giật cục thật to và gắt", isCorrect: false },
          { id: "opt-3", label: "Vọt lên thật cao như hét", isCorrect: false },
          { id: "opt-4", label: "Nuốt mất chữ ね", isCorrect: false },
        ],
        explanationVi:
          "Khi chia sẻ cảm xúc đồng tình (như khen thời tiết đẹp), trợ từ ね được kéo dài êm dịu, đi ngang để tạo không khí đồng cảm ấm áp.",
      },
    ],
  },
];

export function getPronunciationTopicBySlug(slug: string): PronunciationTopic | undefined {
  return PRONUNCIATION_TOPICS.find((topic) => topic.slug === slug);
}
