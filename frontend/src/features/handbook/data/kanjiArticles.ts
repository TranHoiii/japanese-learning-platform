import { HandbookArticle } from "../types";

export const kanjiArticles: HandbookArticle[] = [
  // 1. Article 1 (Gốc)
  {
    id: "k-chuyen-am-han-viet",
    slug: "quy-tac-chuyen-am-han-viet-sang-on-yomi",
    categoryId: "kanji",
    title: "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
    japaneseTitle: "漢字の音読みと漢越音の対応法則",
    summary:
      "Tận dụng lợi thế vàng của người Việt: Chuyển đổi trực tiếp các âm đầu và vần Hán - Việt sang âm On tiếng Nhật với độ chính xác lên tới 75-80%.",
    level: "ALL",
    tags: ["Hán tự", "Kanji", "Âm On", "Mẹo học", "Hán Việt", "N5", "N4"],
    readTimeMinutes: 8,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-ca-1",
        title: "1. Tại sao người Việt có 'siêu năng lực' học Kanji?",
        content:
          "Cả âm Hán - Việt và âm Hán - Nhật (Onyomi) đều bắt nguồn từ hệ thống phát âm tiếng Hán cổ (đặc biệt là thời Đường - Tống). Vì vậy, giữa hai ngôn ngữ tồn tại một quy luật biến âm ngữ âm học cực kỳ chặt chẽ và tương hỗ.",
        type: "text",
      },
      {
        id: "sec-ca-2",
        title: "2. Quy tắc chuyển đổi vần then chốt",
        content:
          "Dưới đây là các cặp vần phổ biến nhất giúp bạn đoán đúng cách đọc Onyomi của hàng ngàn chữ Kanji:",
        type: "table",
        tableData: {
          headers: ["Vần Hán - Việt", "Âm On tương ứng", "Ví dụ chữ Hán", "Onyomi", "Ý nghĩa"],
          rows: [
            ["-AN / -ANG", "-AN / -OU", "AN (安), QUANG (光)", "AN, KOU", "Bình an, Ánh sáng"],
            ["-ÊNH / -INH", "-EI / -OU", "SINH (生), CHÍNH (正)", "SEI, SEI/SHOU", "Sinh sống, Chính xác"],
            ["-IÊN", "-EN", "TIÊN (先), BIÊN (辺), NIÊN (年)", "SEN, HEN, NEN", "Trước/Tiên sinh, Vùng/Biên giới, Năm"],
            ["-UYÊN / -OAN", "-EN / -AN", "CHUYÊN (専), QUAN (関)", "SEN, KAN", "Chuyên môn, Liên quan"],
            ["-ÔNG / -UNG", "-OU", "CÔNG (公), TRUNG (中)", "KOU, CHUU", "Công cộng, Ở giữa"],
            ["-ƯƠNG / -ƯỜNG", "-OU", "TRƯỜNG (長), PHƯƠNG (方)", "CHOU, HOU", "Dài/Trưởng, Phương hướng"],
          ],
        },
      },
      {
        id: "sec-ca-3",
        title: "3. Quy tắc chuyển đổi phụ âm đầu",
        content:
          "Phụ âm đầu trong tiếng Việt thường chuyển dịch sang hàng tương ứng trong bảng chữ cái tiếng Nhật:\n- T -> S / SH (Tiên -> SEN, Tân -> SHIN, Tâm -> SHIN)\n- Đ -> T (Đại -> DAI/TAI, Địa -> CHI/JI, Điện -> DEN)\n- N / NH -> N (Nhân -> JIN/NIN, Nam -> NAN, Niên -> NEN)\n- L -> R (Lục -> ROKU, Lộ -> RO, Luân -> RIN)",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-ca-1",
        japanese: "先生 (せんせい)",
        reading: "せんせい",
        romaji: "Sensei",
        vietnamese: "Tiên sinh (Thầy cô giáo)",
        explanation: "TIÊN chuyển thành SEN, SINH chuyển thành SEI -> Ghép lại thành SENSEI.",
        context: "Từ ghép Onyomi kinh điển",
      },
      {
        id: "ex-ca-2",
        japanese: "安全 (あんぜん)",
        reading: "あんぜん",
        romaji: "Anzen",
        vietnamese: "An toàn",
        explanation: "AN chuyển thành AN, TOÀN chuyển thành ZEN -> Ghép lại thành ANZEN.",
        context: "Từ vựng an toàn",
      },
      {
        id: "ex-ca-3",
        japanese: "専門学校 (せんもんがっこう)",
        reading: "せんもんがっこう",
        romaji: "Senmon gakkou",
        vietnamese: "Trường chuyên môn / Trường nghề",
        explanation: "CHUYÊN (SEN) + MÔN (MON) + HỌC (GAKU biến âm GAK-) + HIỆU (KOU).",
        context: "Từ ghép 4 chữ Hán",
      },
    ],
    comparisons: {
      title: "So sánh Âm On (Onyomi) và Âm Kun (Kunyomi)",
      items: [
        {
          subject: "Âm On (Onyomi - 音読み)",
          nuance: "Cách đọc phỏng theo tiếng Hán cổ, dùng khi ghép từ 2 chữ Hán trở lên (Jukugo)",
          formula: "Kanji + Kanji -> Âm On",
          example: "学生 (がくせい)",
          exampleTranslation: "Học sinh (Gakusei)",
          caution: "Tuân theo quy tắc biến âm Hán - Việt.",
        },
        {
          subject: "Âm Kun (Kunyomi - 訓読み)",
          nuance: "Cách đọc thuần Nhật gán nghĩa cho chữ Hán, thường đứng độc lập hoặc có okurigana đi kèm",
          formula: "Kanji đứng một mình / kèm Hiragana -> Âm Kun",
          example: "生きる (いきる)",
          exampleTranslation: "Sống (Ikiru)",
          caution: "Không áp dụng quy tắc chuyển âm Hán - Việt cho âm Kun.",
        },
      ],
      summary:
        "Khi gặp từ ghép 2 Kanji -> 85% khả năng đọc bằng âm On. Hãy tra cứu theo quy tắc Hán - Việt để đoán trước cách đọc.",
    },
    notes: [
      "Trường âm (âm dài -ou, -ei) xuất hiện ở hầu hết các chữ Hán có vần kết thúc bằng -NG hoặc -NH trong tiếng Việt (Quang, Trường, Chính, Minh).",
      "Âm ngắt (tsu nhỏ - っ) thường xuất hiện khi chữ Hán thứ nhất có âm kết thúc bằng -KU hoặc -CHI gặp phụ âm K, S, T, H ở chữ thứ hai (Học sinh: Gaku + Sei -> Gakusei; Học hiệu: Gaku + Kou -> Gakkou).",
    ],
    warnings: [
      "Quy tắc này mang tính xác suất quy nạp cao (~75-80%), KHÔNG PHẢI định luật tuyệt đối 100%. Luôn có những trường hợp dị biệt và biến âm đặc biệt cần tra cứu từ điển.",
    ],
    relatedArticles: [
      {
        category: "kanji",
        slug: "bo-thu-kanji-thuong-gap-va-meo-nho",
        title: "50 Bộ thủ Kanji cốt lõi giúp đoán nghĩa nhanh mọi chữ Hán",
        reason: "Kết hợp âm đọc (Hán Việt) với ý nghĩa (Bộ thủ) để chinh phục toàn diện Kanji",
      },
      {
        category: "kanji",
        slug: "khi-nao-dung-on-yomi-va-kun-yomi",
        title: "Âm On (Onyomi) và Âm Kun (Kunyomi): Bức tranh toàn cảnh khi nào dùng mỗi loại",
        reason: "Xác định hoàn cảnh cụ thể sử dụng âm On",
      },
    ],
  },

  // 2. Article 2 (Gốc)
  {
    id: "k-bo-thu-kanji",
    slug: "bo-thu-kanji-thuong-gap-va-meo-nho",
    categoryId: "kanji",
    title: "50 Bộ thủ Kanji cốt lõi giúp đoán nghĩa nhanh mọi chữ Hán",
    japaneseTitle: "主要部首と漢字の覚え方",
    summary:
      "Nắm giữ chiếc chìa khóa vạn năng: Nhận diện hình thái bộ thủ để giải mã nghĩa gốc của chữ Hán trong 3 giây và phân biệt các bộ thủ dễ nhầm lẫn nhất.",
    level: "ALL",
    tags: ["Hán tự", "Bộ thủ", "Ghi nhớ", "Kanji", "N5", "N4"],
    readTimeMinutes: 7,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-bt-1",
        title: "1. Bản chất của Bộ thủ (Bushu)",
        content:
          "Bộ thủ là thành phần cấu tạo nền tảng đóng vai trò chỉ nghĩa hoặc phân loại chữ Hán trong từ điển. Trong tổng số 214 bộ thủ Khang Hy, chỉ có khoảng 50 bộ thủ xuất hiện trong 80% chữ Hán thường dụng.",
        type: "rule",
      },
      {
        id: "sec-bt-2",
        title: "2. Các bộ thủ xuất hiện nhiều nhất và trường nghĩa",
        content:
          "Dưới đây là các bộ thủ đại diện cho các yếu tố tự nhiên và đời sống con người:",
        type: "table",
        tableData: {
          headers: ["Bộ thủ", "Tên Hán - Việt", "Ý nghĩa tượng trưng", "Ví dụ chữ Hán tiêu biểu"],
          rows: [
            ["氵 (水)", "Thủy", "Nước, sông hồ, chất lỏng, ẩm ướt", "海 (Hải - Biển), 洗 (Tẩy - Rửa), 泳 (Vịnh - Bơi)"],
            ["亻 (人)", "Nhân đứng", "Con người, hành vi, mối quan hệ", "休 (Hưu - Nghỉ), 体 (Thể - Thân thể), 作 (Tác - Làm)"],
            ["木", "Mộc", "Cây cối, gỗ, thực vật rừng", "林 (Lâm - Rừng thưa), 森 (Sâm - Rừng rậm), 本 (Bản - Sách/Gốc rễ)"],
            ["忄 / 心", "Tâm", "Tâm tư, cảm xúc, suy nghĩ, tình cảm", "忙 (Mang - Bận rộn), 情 (Tình - Tình cảm), 想 (Tưởng - Tưởng tượng)"],
            ["口", "Khẩu", "Miệng, lời nói, ăn uống, lối vào", "味 (Vị - Mùi vị), 呼 (Hô - Gọi), 吸 (Hấp - Hít vào)"],
            ["宀", "Miên (Mái nhà)", "Nhà cửa, nơi cư trú, an toàn", "家 (Gia - Nhà), 安 (An - Yên ổn), 宿 (Túc - Trọ)"],
          ],
        },
      },
      {
        id: "sec-bt-3",
        title: "3. Cặp bộ thủ song sinh dễ nhầm nhất: 礻 vs 衤",
        content:
          "Rất nhiều học viên viết sai giữa hai bộ thủ này:\n- 礻 (Thị - 4 nét): Liên quan đến thần linh, cúng bái, lễ nghi và phúc đức (ví dụ: 社 trong 会社, 神 trong Thần thánh, 祝 trong Chúc mừng).\n- 衤 (Y - 5 nét có thêm nét phẩy): Liên quan đến quần áo, vải vóc, trang phục (ví dụ: 被 trong Bị động/Chăn mền, 袖 trong Tay áo, 複 trong Phức tạp).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-bt-1",
        japanese: "木 (Cây) -> 林 (Rừng nhỏ) -> 森 (Rừng rậm)",
        reading: "き -> はやし -> もり",
        romaji: "Ki -> Hayashi -> Mori",
        vietnamese: "Một cái cây -> Hai cái cây thành rừng nhỏ -> Ba cái cây thành rừng rậm đại ngàn.",
        explanation: "Phương pháp tư duy hình tượng dựa trên sự nhân bản bộ Mộc.",
        context: "Tư duy tượng hình",
      },
      {
        id: "ex-bt-2",
        japanese: "休む (やすむ)",
        reading: "やすむ",
        romaji: "Yasumu",
        vietnamese: "Nghỉ ngơi",
        explanation: "Gồm bộ Nhân đứng (亻 - người) đứng tựa lưng vào bộ Mộc (木 - gốc cây) để nghỉ ngơi.",
        context: "Phân tích chữ hội ý",
      },
    ],
    comparisons: {
      title: "Đối chiếu bộ Thị (Thần) và bộ Y (Áo)",
      items: [
        {
          subject: "Bộ Thị: 礻 (4 nét)",
          nuance: "Biểu thị bàn thờ, thần linh, lễ bái, tổ tiên",
          formula: "礻 + Thành phần khác",
          example: "神社 (じんじゃ)",
          exampleTranslation: "Đền thờ Thần đạo (Jinja)",
          caution: "Chỉ có 1 nét chấm nghiêng ở đầu, nét thứ 3 là sổ thẳng liền.",
        },
        {
          subject: "Bộ Y: 衤 (5 nét)",
          nuance: "Biểu thị sợi vải, y phục, trang phục may mặc",
          formula: "衤 + Thành phần khác",
          example: "衣服 (いふく)",
          exampleTranslation: "Y phục, quần áo (Ifuku)",
          caution: "Có 2 nét phẩy/chấm ở góc phải phía trên.",
        },
      ],
      summary: "Nhớ mẹo: Thần linh (礻) giản dị 1 chấm, Quần áo (衤) lộng lẫy 2 chấm.",
    },
    notes: [
      "Khi tra từ điển giấy cổ điển, nếu chữ Hán có nhiều thành phần, ưu tiên tìm bộ thủ ở vị trí: Trái (Biến - Hen) -> Phải (Bàng - Tsukuri) -> Trên (Đầu - Kanmuri) -> Dưới (Đế - Ashi).",
    ],
    warnings: [
      "Bộ thủ giúp hiểu gốc nghĩa, nhưng qua hàng ngàn năm giản lược và biến nghĩa, có những chữ nghĩa hiện đại đã xa rời nghĩa gốc của bộ thủ. Hãy xem bộ thủ là trợ lực ghi nhớ chứ không phải chân lý duy nhất.",
    ],
    relatedArticles: [
      {
        category: "kanji",
        slug: "quy-tac-chuyen-am-han-viet-sang-on-yomi",
        title: "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
        reason: "Ghép bộ thủ với âm On để đọc - hiểu toàn diện chữ Hán",
      },
      {
        category: "kanji",
        slug: "phuong-phap-hoc-kanji-theo-bo-thu-va-tu-ghep",
        title: "Phương pháp học Kanji theo bộ thủ + từ ghép (Jukugo) thay vì học chữ riêng lẻ",
        reason: "Áp dụng bộ thủ vào phương pháp học từ ghép hiệu quả",
      },
    ],
  },

  // 3. Article 3 (Mới: Phân biệt 生 / 先 / 失)
  {
    id: "k-sei-sen-shitsu",
    slug: "phan-biet-kanji-sinh-tien-that",
    categoryId: "kanji",
    title: "Phân biệt các chữ Hán có nét tương đồng dễ nhầm: 生, 先, 失 và mẹo nhớ nét",
    japaneseTitle: "似ている漢字の識別「生・先・失」",
    summary:
      "Giải phẫu chi tiết sự khác biệt về số nét, thứ tự nét viết và mẹo ghi nhớ trực quan cho bộ 3 chữ Hán dễ nhầm nhất ở cấp độ nhập môn: 生 (Sinh), 先 (Tiên), 失 (Thất).",
    level: "N5",
    tags: ["Hán tự", "Chữ dễ nhầm", "生", "先", "失", "N5"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-sss-1",
        title: "1. Bảng đối chiếu 3 chữ Hán song sinh",
        content:
          "Học viên sơ cấp thường xuyên viết nhầm lẫn giữa 生, 先, và 失 do chúng đều có cấu tạo bởi các nét phẩy và nét ngang tương tự nhau:",
        type: "table",
        tableData: {
          headers: ["Chữ Hán", "Hán - Việt", "Số nét", "Nét khác biệt cốt lõi", "Từ vựng tiêu biểu"],
          rows: [
            ["生", "SINH", "5 nét", "Nét phẩy chéo bên trái phía trên, 3 nét ngang, 1 nét sổ thẳng đứng", "学生 (gakusei), 生きる (ikiru)"],
            ["先", "TIÊN", "6 nét", "Phần dưới là bộ Nhi (儿 - đôi chân đi trước)", "先生 (sensei), 先週 (senshuu)"],
            ["失", "THẤT", "5 nét", "Nét phẩy trên cùng cắt qua nét ngang (như mũi tên bay mất)", "失礼 (shitsurei), 失敗 (shippai)"],
          ],
        },
      },
      {
        id: "sec-sss-2",
        title: "2. Mẹo ghi nhớ hình tượng (Mnemonic Note)",
        content:
          "- 生 (Sinh): Mầm cây vừa nảy mầm vươn lên từ mặt đất (Sinh sôi, sự sống).\n- 先 (Tiên): Người có đôi chân (儿) bước đi trước dẫn đường (Tiên phong, thầy giáo).\n- 失 (Thất): Bàn tay để tuột mất mũi tên bay xuyên qua (Thất lạc, mất mát).\n(Lưu ý: Đây là mẹo ghi nhớ hình tượng - mnemonic giúp dễ liên tưởng, không phải chiết tự nguồn gốc văn hiến cổ).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-sss-1",
        japanese: "先生、失礼いたします。",
        reading: "せんせい、しつれいいたします。",
        romaji: "Sensei, shitsurei itashimasu.",
        vietnamese: "Thưa thầy, em xin phép vào ạ.",
        explanation: "Trong cùng 1 câu xuất hiện cả chữ TIÊN (先 trong 先生) và chữ THẤT (失 trong 失礼).",
        context: "Chào hỏi lễ phép vào phòng",
      },
      {
        id: "ex-sss-2",
        japanese: "大学生が失敗を恐れずに挑戦する。",
        reading: "だいがくせいがしっぱいをおそれず にちょうせんする。",
        romaji: "Daigakusei ga shippai o osorezu ni chousen suru.",
        vietnamese: "Sinh viên đại học thử thách bản thân mà không sợ thất bại.",
        explanation: "Chữ SINH (生 trong 大学生) đi cùng chữ THẤT (失 trong 失敗).",
        context: "Khích lệ học tập",
      },
    ],
    comparisons: {
      title: "So sánh cấu trúc nét của 生 vs 先 vs 失",
      items: [
        {
          subject: "先 (Tiên - 6 nét) vs 失 (Thất - 5 nét)",
          nuance: "Chữ 先 có nét sổ cong móc chân đi trước; Chữ 失 có nét phẩy cắt ngang nét trên",
          formula: "先 = 丿 + 一 + 土 + 儿 | 失 = 丿 cắt 一 + 大",
          example: "先月 (Tháng trước) vs 失望 (Thất vọng)",
          exampleTranslation: "Sengetsu vs Shitsubou",
          caution: "Chú ý nét dưới cùng của chữ 先 là bộ đôi chân 儿.",
        },
        {
          subject: "生 (Sinh - 5 nét)",
          nuance: "3 nét ngang song song, nét sổ dọc đứng thẳng ở giữa",
          formula: "生 = 丿 + 一 + ｜ + 一 + 一",
          example: "生活 (Đời sống - Seikatsu)",
          exampleTranslation: "Seikatsu",
          caution: "Nét ngang dưới cùng là nét dài nhất.",
        },
      ],
      summary: "Có chân (儿) là TIÊN (先); bị cắt đứt là THẤT (失); 3 nét ngang mầm cây là SINH (生).",
    },
    notes: [
      "Thứ tự nét viết (Kakujun): Chữ 失 viết nét phẩy trên cùng trước, sau đó đến nét ngang ngắn, rồi nét ngang dài và cuối cùng là hai nét phẩy - mác xòe dưới.",
    ],
    warnings: [
      "Không nhầm chữ 失 (Thất) với chữ 矢 (Thỉ - Mũi tên). Chữ 矢 nét phẩy trên cùng KHÔNG xuyên qua nét ngang.",
    ],
    relatedArticles: [
      {
        category: "kanji",
        slug: "phan-biet-kanji-dai-tri-thoi",
        title: "Phân biệt bộ 3 chữ Hán cùng gốc: 待 (Đợi), 持 (Cầm), 時 (Thời gian)",
        reason: "Tiếp tục phân biệt nhóm chữ Hán có bộ thủ tương đồng",
      },
      {
        category: "kanji",
        slug: "quy-tac-chuyen-am-han-viet-sang-on-yomi",
        title: "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
        reason: "Âm On của Sinh (SEI), Tiên (SEN), Thất (SHITSU)",
      },
    ],
  },

  // 4. Article 4 (Mới: Phân biệt 待 / 持 / 時)
  {
    id: "k-matsu-motsu-toki",
    slug: "phan-biet-kanji-dai-tri-thoi",
    categoryId: "kanji",
    title: "Phân biệt bộ 3 chữ Hán cùng gốc: 待 (Đợi), 持 (Cầm), 時 (Thời gian)",
    japaneseTitle: "同一パーツの漢字「待・持・時」の識別",
    summary:
      "Bí quyết phân biệt 3 chữ Hán có chung phần bên phải là chữ Tự (寺 - Chùa): Đợi bước chân (待), Tay cầm nắm (持), và Mặt trời đo thời gian (時).",
    level: "N5",
    tags: ["Hán tự", "Bộ thủ", "待", "持", "時", "N5"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-mmt-1",
        title: "1. Điểm chung: Phần bên phải là chữ Tự (寺 - ngôi chùa)",
        content:
          "Cả 3 chữ 待, 持, 時 đều có phần bên phải là chữ 寺 (Tự - Ngôi chùa). Điểm khác biệt duy nhất quyết định ý nghĩa của chữ nằm ở BỘ THỦ BÊN TRÁI:",
        type: "table",
        tableData: {
          headers: ["Chữ Hán", "Hán - Việt", "Bộ thủ bên trái", "Ý nghĩa gợi nhớ", "Từ vựng tiêu biểu"],
          rows: [
            ["待", "ĐÃI", "彳 (Xích - Bước chân ngắn)", "Đứng đợi bước chân ai đó đến cổng chùa", "待つ (matsu - Chờ đợi), 招待 (shoutai - Chiêu đãi/Mời)"],
            ["持", "TRÌ", "扌 (Thủ - Bàn tay)", "Dùng bàn tay cầm nắm đồ vật mang lên chùa", "持つ (motsu - Cầm/Có), 気持ち (kimochi - Tâm trạng)"],
            ["時", "THỜI", "日 (Nhật - Mặt trời)", "Nhìn bóng mặt trời chiếu xuống mái chùa đo thời gian", "時 (toki - Khi/Lúc), 時間 (jikan - Thời gian)"],
          ],
        },
      },
      {
        id: "sec-mmt-2",
        title: "2. Gợi ý học tập (Mnemonic)",
        content:
          "Hãy nhớ câu vè liên tưởng:\n'Mặt trời (日) là Thời (時);\nĐôi chân (彳) đứng Đợi (待);\nBàn tay (扌) Cầm (持) lấy.'\n(Lưu ý: Mẹo vè này là kỹ thuật ghi nhớ - mnemonic, không phản ánh chiết tự lịch sử giáp cốt văn).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-mmt-1",
        japanese: "駅の前で友達を待っています。",
        reading: "えきのまえでともだちをまっています。",
        romaji: "Eki no mae de tomodachi o matte imasu.",
        vietnamese: "Tôi đang đứng đợi bạn ở trước nhà ga.",
        explanation: "Hành động chờ đợi -> Dùng chữ ĐÃI (待 có bộ Xích 彳).",
        context: "Đứng đợi bạn bè",
      },
      {
        id: "ex-mmt-2",
        japanese: "重い荷物を持っています。",
        reading: "おもいにもつをもっています。",
        romaji: "Omoi nimotsu o motte imasu.",
        vietnamese: "Tôi đang cầm một kiện hành lý rất nặng.",
        explanation: "Hành động dùng tay mang xách -> Dùng chữ TRÌ (持 có bộ Thủ 扌).",
        context: "Cầm nắm đồ vật",
      },
    ],
    comparisons: {
      title: "Đối chiếu bộ thủ bên trái của 待, 持, 時",
      items: [
        {
          subject: "待つ (matsu) vs 持つ (motsu)",
          nuance: "Chân đứng chờ (待) vs Tay cầm đồ (持)",
          formula: "彳 + 寺 (待) vs 扌 + 寺 (持)",
          example: "待ってください (Xin đợi) vs 持ってください (Xin cầm hộ)",
          exampleTranslation: "Matte kudasai vs Motte kudasai",
          caution: "Phát âm matsu và motsu khác nhau ở nguyên âm a/o.",
        },
        {
          subject: "時 (toki / ji)",
          nuance: "Chỉ thời gian, giờ giấc, khoảnh khắc",
          formula: "日 + 寺 (時)",
          example: "一時 (Một giờ - Ichiji)",
          exampleTranslation: "Ichiji",
          caution: "Bộ Nhật 日 ở bên trái viết thon dài.",
        },
      ],
      summary: "Nhìn bộ thủ bên trái là đọc được ngay ý nghĩa: Chân (彳) -> Đợi; Tay (扌) -> Cầm; Mặt trời (日) -> Giờ.",
    },
    notes: [
      "Âm On của cả 3 chữ đều mang âm ĐAI / TRÌ / THỜI: 待 (TAI - 招待 shoutai), 持 (JI - 維持 iji), 時 (JI - 時間 jikan).",
    ],
    warnings: [
      "Khi viết nhanh, bộ 彳 (2 nét phẩy) rất dễ bị viết ẩu thành bộ 亻 (1 nét phẩy). Chú ý bộ Xích 彳 luôn có 2 nét phẩy ở đầu.",
    ],
    relatedArticles: [
      {
        category: "kanji",
        slug: "bo-thu-kanji-thuong-gap-va-meo-nho",
        title: "50 Bộ thủ Kanji cốt lõi giúp đoán nghĩa nhanh mọi chữ Hán",
        reason: "Ôn lại bộ Thủ (tay) và bộ Nhật (mặt trời)",
      },
      {
        category: "kanji",
        slug: "phan-biet-kanji-sinh-tien-that",
        title: "Phân biệt các chữ Hán có nét tương đồng dễ nhầm: 生, 先, 失 và mẹo nhớ nét",
        reason: "Cùng rèn luyện kỹ năng phân biệt hình thể chữ Hán",
      },
    ],
  },

  // 5. Article 5 (Mới: On-yomi và Kun-yomi khi nào dùng)
  {
    id: "k-on-kun-usage",
    slug: "khi-nao-dung-on-yomi-va-kun-yomi",
    categoryId: "kanji",
    title: "Âm On (Onyomi) và Âm Kun (Kunyomi): Bức tranh toàn cảnh khi nào dùng mỗi loại",
    japaneseTitle: "音読みと訓読みの使い分けの目安",
    summary:
      "Quy luật xác suất 85/15: Khi nào chữ Hán đọc bằng âm On (từ ghép Jukugo) và khi nào đọc bằng âm Kun (đứng độc lập, có Okurigana, tên người Nhật), kèm các ngoại lệ.",
    level: "ALL",
    tags: ["Hán tự", "Onyomi", "Kunyomi", "Cách đọc", "Quy tắc", "N5"],
    readTimeMinutes: 7,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-ok-1",
        title: "1. Nguyên lý phân chia Âm On vs Âm Kun",
        content:
          "- Âm On (Onyomi): Âm mượn từ tiếng Hán cổ thời xưa, thường có 1-2 âm tiết ngắn gọn.\n- Âm Kun (Kunyomi): Âm thuần Nhật (Yamato kotoba) gán vào chữ Hán để thể hiện nghĩa tương đương trong đời sống hàng ngày của người Nhật cổ.",
        type: "text",
      },
      {
        id: "sec-ok-2",
        title: "2. Quy luật xác suất: Khi nào đọc âm On?",
        content:
          "Khoảng 85% trường hợp chữ Hán sẽ đọc bằng Âm On khi:\n- Ghép từ 2 chữ Hán trở lên để tạo thành từ ghép danh từ (Jukugo - 熟語): 勉強 (benkyou), 会社 (kaisha), 電話 (denwa).\n- Thuộc từ vựng học thuật, kinh tế, chính trị, công nghệ.",
        type: "rule",
      },
      {
        id: "sec-ok-3",
        title: "3. Khi nào đọc bằng Âm Kun?",
        content:
          "Chữ Hán hầu như luôn đọc bằng Âm Kun khi:\n- Đứng một mình độc lập: 水 (mizu - nước), 山 (yama - núi), 人 (hito - người), 犬 (inu - chó).\n- Có phần đuôi Hiragana đi kèm (Okurigana - 送り仮名): 食べる (taberu), 楽しい (tanoshii), 高い (takai).\n- Tên địa danh và họ người thuần Nhật: 山田 (Yamada), 田中 (Tanaka).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-ok-1",
        japanese: "山 (やま) に登ります vs 富士山 (ふじさん)",
        reading: "やまにのぼります vs ふじさん",
        romaji: "Yama ni noborimasu vs Fujisan",
        vietnamese: "Leo núi (núi đứng một mình đọc là YAMA - Kun) vs Núi Phú Sĩ (từ ghép đọc là SAN - On).",
        explanation: "Chữ 山 đứng một mình đọc là Kunyomi, ghép trong tên núi đọc là Onyomi.",
        context: "So sánh chữ 山 đứng một mình và ghép",
      },
      {
        id: "ex-ok-2",
        japanese: "水 (みず) を飲む vs 水泳 (すいえい)",
        reading: "みずをのむ vs すいえい",
        romaji: "Mizu o nomu vs Suiei",
        vietnamese: "Uống nước (MIZU - Kun) vs Bơi lội (SUI - On trong từ ghép Thủy Vịnh).",
        explanation: "Độc lập là mizu, ghép vào từ vựng thể thao là sui.",
        context: "So sánh chữ 水",
      },
    ],
    comparisons: {
      title: "Bảng tổng kết quy tắc On-yomi vs Kun-yomi",
      items: [
        {
          subject: "Âm On (Onyomi - Âm Hán)",
          nuance: "Từ ghép 2+ chữ Hán, khái niệm trừu tượng, học thuật",
          formula: "Kanji + Kanji -> Âm On",
          example: "安心 (Anshin - An tâm)",
          exampleTranslation: "Anshin",
          caution: "Không phải 100%, có từ ghép thuần Nhật đọc Kun (ví dụ: 花火 hanabi).",
        },
        {
          subject: "Âm Kun (Kunyomi - Thuần Nhật)",
          nuance: "Đứng riêng lẻ, động từ có đuôi Hiragana, sự vật thân thuộc",
          formula: "Kanji + Hiragana / Kanji đơn",
          example: "走る (Hashiru - Chạy)",
          exampleTranslation: "Hashiru",
          caution: "Có những từ Kanji đứng riêng vẫn có thể đọc bằng âm On trong trường hợp đặc biệt.",
        },
      ],
      summary: "Đứng một mình hoặc có Hiragana thò ra ngoài -> Kunyomi; Ghép 2 chữ Hán với nhau -> Onyomi.",
    },
    notes: [
      "Có dạng đọc ghép lai giữa On và Kun: Trọng âm đầu On đuôi Kun (Jubako-yomi) như 重箱 (juubako), hoặc đầu Kun đuôi On (Yutou-yomi) như 湯飲み (yunomi).",
    ],
    warnings: [
      "Đây là quy luật xác suất (~85%), không phải quy tắc tuyệt đối toán học. Người học luôn cần kiểm chứng bằng từ điển chuẩn.",
    ],
    relatedArticles: [
      {
        category: "kanji",
        slug: "quy-tac-chuyen-am-han-viet-sang-on-yomi",
        title: "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
        reason: "Quy tắc áp dụng cho âm On",
      },
      {
        category: "kanji",
        slug: "phuong-phap-hoc-kanji-theo-bo-thu-va-tu-ghep",
        title: "Phương pháp học Kanji theo bộ thủ + từ ghép (Jukugo) thay vì học chữ riêng lẻ",
        reason: "Ứng dụng âm On khi học theo từ ghép",
      },
    ],
  },

  // 6. Article 6 (Mới: Cách học Kanji theo bộ thủ + từ ghép)
  {
    id: "k-bo-thu-tu-ghep",
    slug: "phuong-phap-hoc-kanji-theo-bo-thu-va-tu-ghep",
    categoryId: "kanji",
    title: "Phương pháp học Kanji theo bộ thủ + từ ghép (Jukugo) thay vì học chữ riêng lẻ",
    japaneseTitle: "部首と熟語による効率的な漢字学習法",
    summary:
      "Từ bỏ thói quen chép phạt từng chữ Hán đơn độc: Chiến lược học theo gốc bộ thủ để hiểu nghĩa và học theo từ ghép (Jukugo) để làm chủ phản xạ ngữ âm và ứng dụng thực tế.",
    level: "ALL",
    tags: ["Hán tự", "Phương pháp học", "Bộ thủ", "Từ ghép", "Jukugo", "N5", "N4"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-bj-1",
        title: "1. Vấn đề của cách học truyền thống: 'Học vẹt từng chữ'",
        content:
          "Rất nhiều người học dành hàng giờ ngồi chép phạt 1 chữ Kanji đơn lẻ kèm tất cả 5-7 cách đọc On/Kun trong từ điển. Hậu quả là khi gặp chữ đó trong câu văn, não bộ không biết phải lôi cách đọc nào ra, dẫn đến tê liệt phản xạ.",
        type: "text",
      },
      {
        id: "sec-bj-2",
        title: "2. Trụ cột 1: Học ý nghĩa thông qua Bộ thủ (Bushu)",
        content:
          "Bộ thủ là 'gốc rễ' của chữ Hán. Khi bạn nắm chắc 50 bộ thủ phổ biến, mỗi chữ Hán mới không còn là một đống nét hỗn độn ngẫu nhiên mà là một bài toán ghép Lego giữa các khối hình quen thuộc.",
        type: "rule",
      },
      {
        id: "sec-bj-3",
        title: "3. Trụ cột 2: Học âm đọc thông qua Từ ghép thực tế (Jukugo)",
        content:
          "Thay vì học 'Chữ HỌC đọc là GAKU, MANA', hãy học luôn 3 từ ghép thông dụng nhất có chứa nó:\n- 学生 (Gakusei - Học sinh)\n- 大学 (Daigaku - Đại học)\n- 学ぶ (Manabu - Học hỏi).\nBằng cách này, bạn vừa nhớ được cách đọc chuẩn xác trong ngữ cảnh, vừa tăng vốn từ vựng thực chiến gấp 3 lần.",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-bj-1",
        japanese: "電 (Điện) + 車 (Xa) = 電車 (でんしゃ - Tàu điện)",
        reading: "でん + しゃ = でんしゃ",
        romaji: "Den + Sha = Densha",
        vietnamese: "Xe chạy bằng điện = Tàu điện.",
        explanation: "Ghép nghĩa của 2 chữ Hán tạo nên từ vựng trực quan dễ nhớ không bao giờ quên.",
        context: "Tư duy ghép từ Jukugo",
      },
      {
        id: "ex-bj-2",
        japanese: "青 (Xanh) + 氵(Thủy) = 清 (Thanh - Nước trong vắt)",
        reading: "あお + みず = きよい",
        romaji: "Ao + Mizu = Kiyoi",
        vietnamese: "Thêm bộ Thủy vào chữ Thanh -> Biểu thị làn nước trong xanh tinh khiết.",
        explanation: "Sử dụng bộ thủ để mở rộng họ hàng chữ Hán.",
        context: "Mở rộng họ chữ từ bộ thủ",
      },
    ],
    comparisons: {
      title: "Học chữ riêng lẻ vs Học theo từ ghép & bộ thủ",
      items: [
        {
          subject: "Học chữ riêng vị lẻ",
          nuance: "Chép phạt rời rạc, nhớ mặt chữ nhưng không biết đọc trong câu",
          formula: "1 Chữ = Học vẹt On/Kun",
          example: "Học chữ Sinh -> nhớ 7 cách đọc nhưng không biết dùng",
          exampleTranslation: "Mất nhiều công sức nhưng hiệu quả thấp.",
          caution: "Dễ gây chán nản và mau quên.",
        },
        {
          subject: "Học theo Bộ thủ + Từ ghép",
          nuance: "Hiểu gốc nghĩa qua bộ thủ, gắn liền cách đọc với từ ghép thực tế",
          formula: "Bộ thủ -> Chữ Hán -> 3 Từ ghép",
          example: "Học chữ Sinh qua: 先生, 生活, 生まれる",
          exampleTranslation: "Ghi nhớ bền vững và phản xạ tức thì.",
          caution: "Luôn tra cứu từ điển câu ví dụ thực tế.",
        },
      ],
      summary: "Muốn hiểu nghĩa -> nhìn Bộ thủ; Muốn biết đọc -> học theo Từ ghép (Jukugo).",
    },
    notes: [
      "Bộ sách và phương pháp học Kanji hiện đại của người Nhật bản xứ cho trẻ em tiểu học cũng áp dụng 100% nguyên lý học từ ghép này.",
    ],
    warnings: [
      "Không lạm dụng những câu chuyện liên tưởng quá kỳ quái hoặc sai lệch hoàn toàn với gốc bộ thủ, vì nó sẽ phản tác dụng khi học lên các cấp độ Hán tự cao cấp hơn (N2, N1).",
    ],
    relatedArticles: [
      {
        category: "kanji",
        slug: "bo-thu-kanji-thuong-gap-va-meo-nho",
        title: "50 Bộ thủ Kanji cốt lõi giúp đoán nghĩa nhanh mọi chữ Hán",
        reason: "Nắm vững danh sách 50 bộ thủ nền tảng",
      },
      {
        category: "notes",
        slug: "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        title: "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        reason: "Mở rộng tư duy học theo khối từ Kanji sang ngữ pháp",
      },
    ],
  },
];
