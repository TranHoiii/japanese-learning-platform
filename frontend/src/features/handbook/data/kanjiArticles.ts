import { HandbookArticle } from "../types";

export const kanjiArticles: HandbookArticle[] = [
  {
    "id": "k-chuyen-am-han-viet",
    "slug": "quy-tac-chuyen-am-han-viet-sang-on-yomi",
    "categoryId": "kanji",
    "title": "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
    "japaneseTitle": "漢字の音読みと漢越音の対応法則",
    "summary": "Tận dụng lợi thế vàng của người Việt: Chuyển đổi trực tiếp các âm đầu và vần Hán - Việt sang âm On tiếng Nhật với độ chính xác lên tới 75-80%.",
    "level": "ALL",
    "tags": [
      "Hán tự",
      "Kanji",
      "Âm On",
      "Mẹo học",
      "Hán Việt",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 8,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ca-1",
        "title": "1. Tại sao người Việt có 'siêu năng lực' học Kanji?",
        "content": "Cả âm Hán - Việt và âm Hán - Nhật (Onyomi) đều bắt nguồn từ hệ thống phát âm tiếng Hán cổ (đặc biệt là thời Đường - Tống). Vì vậy, giữa hai ngôn ngữ tồn tại một quy luật biến âm ngữ âm học cực kỳ chặt chẽ và tương hỗ.",
        "type": "text"
      },
      {
        "id": "sec-ca-2",
        "title": "2. Quy tắc chuyển đổi vần then chốt",
        "content": "Dưới đây là các cặp vần phổ biến nhất giúp bạn đoán đúng cách đọc Onyomi của hàng ngàn chữ Kanji:",
        "type": "table",
        "tableData": {
          "headers": [
            "Vần Hán - Việt",
            "Âm On tương ứng",
            "Ví dụ chữ Hán",
            "Onyomi",
            "Ý nghĩa"
          ],
          "rows": [
            [
              "-AN / -ANG",
              "-AN / -OU",
              "AN (安), QUANG (光)",
              "AN, KOU",
              "Bình an, Ánh sáng"
            ],
            [
              "-ÊNH / -INH",
              "-EI / -OU",
              "SINH (生), CHÍNH (正)",
              "SEI, SEI/SHOU",
              "Sinh sống, Chính xác"
            ],
            [
              "-IÊN",
              "-EN",
              "TIÊN (先), BIÊN (辺), NIÊN (年)",
              "SEN, HEN, NEN",
              "Trước/Tiên sinh, Vùng/Biên giới, Năm"
            ],
            [
              "-UYÊN / -OAN",
              "-EN / -AN",
              "CHUYÊN (専), QUAN (関)",
              "SEN, KAN",
              "Chuyên môn, Liên quan"
            ],
            [
              "-ÔNG / -UNG",
              "-OU",
              "CÔNG (公), TRUNG (中)",
              "KOU, CHUU",
              "Công cộng, Ở giữa"
            ],
            [
              "-ƯƠNG / -ƯỜNG",
              "-OU",
              "TRƯỜNG (長), PHƯƠNG (方)",
              "CHOU, HOU",
              "Dài/Trưởng, Phương hướng"
            ]
          ]
        }
      },
      {
        "id": "sec-ca-3",
        "title": "3. Quy tắc chuyển đổi phụ âm đầu",
        "content": "Phụ âm đầu trong tiếng Việt thường chuyển dịch sang hàng tương ứng trong bảng chữ cái tiếng Nhật:\n- T -> S / SH (Tiên -> SEN, Tân -> SHIN, Tâm -> SHIN)\n- Đ -> T (Đại -> DAI/TAI, Địa -> CHI/JI, Điện -> DEN)\n- N / NH -> N (Nhân -> JIN/NIN, Nam -> NAN, Niên -> NEN)\n- L -> R (Lục -> ROKU, Lộ -> RO, Luân -> RIN)",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-ca-1",
        "japanese": "先生 (せんせい)",
        "reading": "せんせい",
        "romaji": "Sensei",
        "vietnamese": "Tiên sinh (Thầy cô giáo)",
        "explanation": "TIÊN chuyển thành SEN, SINH chuyển thành SEI -> Ghép lại thành SENSEI.",
        "context": "Từ ghép Onyomi kinh điển"
      },
      {
        "id": "ex-ca-2",
        "japanese": "安全 (あんぜん)",
        "reading": "あんぜん",
        "romaji": "Anzen",
        "vietnamese": "An toàn",
        "explanation": "AN chuyển thành AN, TOÀN chuyển thành ZEN -> Ghép lại thành ANZEN.",
        "context": "Từ vựng an toàn"
      },
      {
        "id": "ex-ca-3",
        "japanese": "専門学校 (せんもんがっこう)",
        "reading": "せんもんがっこう",
        "romaji": "Senmon gakkou",
        "vietnamese": "Trường chuyên môn / Trường nghề",
        "explanation": "CHUYÊN (SEN) + MÔN (MON) + HỌC (GAKU biến âm GAK-) + HIỆU (KOU).",
        "context": "Từ ghép 4 chữ Hán"
      }
    ],
    "comparisons": {
      "title": "So sánh Âm On (Onyomi) và Âm Kun (Kunyomi)",
      "items": [
        {
          "subject": "Âm On (Onyomi - 音読み)",
          "nuance": "Cách đọc phỏng theo tiếng Hán cổ, dùng khi ghép từ 2 chữ Hán trở lên (Jukugo)",
          "formula": "Kanji + Kanji -> Âm On",
          "example": "学生 (がくせい)",
          "exampleTranslation": "Học sinh (Gakusei)",
          "caution": "Tuân theo quy tắc biến âm Hán - Việt."
        },
        {
          "subject": "Âm Kun (Kunyomi - 訓読み)",
          "nuance": "Cách đọc thuần Nhật gán nghĩa cho chữ Hán, thường đứng độc lập hoặc có okurigana đi kèm",
          "formula": "Kanji đứng một mình / kèm Hiragana -> Âm Kun",
          "example": "生きる (いきる)",
          "exampleTranslation": "Sống (Ikiru)",
          "caution": "Không áp dụng quy tắc chuyển âm Hán - Việt cho âm Kun."
        }
      ],
      "summary": "Khi gặp từ ghép 2 Kanji -> 85% khả năng đọc bằng âm On. Hãy tra cứu theo quy tắc Hán - Việt để đoán trước cách đọc."
    },
    "notes": [
      "Trường âm (âm dài -ou, -ei) xuất hiện ở hầu hết các chữ Hán có vần kết thúc bằng -NG hoặc -NH trong tiếng Việt (Quang, Trường, Chính, Minh).",
      "Âm ngắt (tsu nhỏ - っ) thường xuất hiện khi chữ Hán thứ nhất có âm kết thúc bằng -KU hoặc -CHI gặp phụ âm K, S, T, H ở chữ thứ hai (Học sinh: Gaku + Sei -> Gakusei; Học hiệu: Gaku + Kou -> Gakkou)."
    ],
    "warnings": [
      "Quy tắc này mang tính xác suất quy nạp cao (~75-80%), KHÔNG PHẢI định luật tuyệt đối 100%. Luôn có những trường hợp dị biệt và biến âm đặc biệt cần tra cứu từ điển."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "bo-thu-kanji-thuong-gap-va-meo-nho",
        "title": "50 Bộ thủ Kanji cốt lõi giúp đoán nghĩa nhanh mọi chữ Hán",
        "reason": "Kết hợp âm đọc (Hán Việt) với ý nghĩa (Bộ thủ) để chinh phục toàn diện Kanji"
      },
      {
        "category": "kanji",
        "slug": "khi-nao-dung-on-yomi-va-kun-yomi",
        "title": "Âm On (Onyomi) và Âm Kun (Kunyomi): Bức tranh toàn cảnh khi nào dùng mỗi loại",
        "reason": "Xác định hoàn cảnh cụ thể sử dụng âm On"
      }
    ]
  },
  {
    "id": "k-bo-thu-kanji",
    "slug": "bo-thu-kanji-thuong-gap-va-meo-nho",
    "categoryId": "kanji",
    "title": "50 Bộ thủ Kanji cốt lõi giúp đoán nghĩa nhanh mọi chữ Hán",
    "japaneseTitle": "主要部首と漢字の覚え方",
    "summary": "Nắm giữ chiếc chìa khóa vạn năng: Nhận diện hình thái bộ thủ để giải mã nghĩa gốc của chữ Hán trong 3 giây và phân biệt các bộ thủ dễ nhầm lẫn nhất.",
    "level": "ALL",
    "tags": [
      "Hán tự",
      "Bộ thủ",
      "Ghi nhớ",
      "Kanji",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-bt-1",
        "title": "1. Bản chất của Bộ thủ (Bushu)",
        "content": "Bộ thủ là thành phần cấu tạo nền tảng đóng vai trò chỉ nghĩa hoặc phân loại chữ Hán trong từ điển. Trong tổng số 214 bộ thủ Khang Hy, chỉ có khoảng 50 bộ thủ xuất hiện trong 80% chữ Hán thường dụng.",
        "type": "rule"
      },
      {
        "id": "sec-bt-2",
        "title": "2. Các bộ thủ xuất hiện nhiều nhất và trường nghĩa",
        "content": "Dưới đây là các bộ thủ đại diện cho các yếu tố tự nhiên và đời sống con người:",
        "type": "table",
        "tableData": {
          "headers": [
            "Bộ thủ",
            "Tên Hán - Việt",
            "Ý nghĩa tượng trưng",
            "Ví dụ chữ Hán tiêu biểu"
          ],
          "rows": [
            [
              "氵 (水)",
              "Thủy",
              "Nước, sông hồ, chất lỏng, ẩm ướt",
              "海 (Hải - Biển), 洗 (Tẩy - Rửa), 泳 (Vịnh - Bơi)"
            ],
            [
              "亻 (人)",
              "Nhân đứng",
              "Con người, hành vi, mối quan hệ",
              "休 (Hưu - Nghỉ), 体 (Thể - Thân thể), 作 (Tác - Làm)"
            ],
            [
              "木",
              "Mộc",
              "Cây cối, gỗ, thực vật rừng",
              "林 (Lâm - Rừng thưa), 森 (Sâm - Rừng rậm), 本 (Bản - Sách/Gốc rễ)"
            ],
            [
              "忄 / 心",
              "Tâm",
              "Tâm tư, cảm xúc, suy nghĩ, tình cảm",
              "忙 (Mang - Bận rộn), 情 (Tình - Tình cảm), 想 (Tưởng - Tưởng tượng)"
            ],
            [
              "口",
              "Khẩu",
              "Miệng, lời nói, ăn uống, lối vào",
              "味 (Vị - Mùi vị), 呼 (Hô - Gọi), 吸 (Hấp - Hít vào)"
            ],
            [
              "宀",
              "Miên (Mái nhà)",
              "Nhà cửa, nơi cư trú, an toàn",
              "家 (Gia - Nhà), 安 (An - Yên ổn), 宿 (Túc - Trọ)"
            ]
          ]
        }
      },
      {
        "id": "sec-bt-3",
        "title": "3. Cặp bộ thủ song sinh dễ nhầm nhất: 礻 vs 衤",
        "content": "Rất nhiều học viên viết sai giữa hai bộ thủ này:\n- 礻 (Thị - 4 nét): Liên quan đến thần linh, cúng bái, lễ nghi và phúc đức (ví dụ: 社 trong 会社, 神 trong Thần thánh, 祝 trong Chúc mừng).\n- 衤 (Y - 5 nét có thêm nét phẩy): Liên quan đến quần áo, vải vóc, trang phục (ví dụ: 被 trong Bị động/Chăn mền, 袖 trong Tay áo, 複 trong Phức tạp).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-bt-1",
        "japanese": "木 (Cây) -> 林 (Rừng nhỏ) -> 森 (Rừng rậm)",
        "reading": "き -> はやし -> もり",
        "romaji": "Ki -> Hayashi -> Mori",
        "vietnamese": "Một cái cây -> Hai cái cây thành rừng nhỏ -> Ba cái cây thành rừng rậm đại ngàn.",
        "explanation": "Phương pháp tư duy hình tượng dựa trên sự nhân bản bộ Mộc.",
        "context": "Tư duy tượng hình"
      },
      {
        "id": "ex-bt-2",
        "japanese": "休む (やすむ)",
        "reading": "やすむ",
        "romaji": "Yasumu",
        "vietnamese": "Nghỉ ngơi",
        "explanation": "Gồm bộ Nhân đứng (亻 - người) đứng tựa lưng vào bộ Mộc (木 - gốc cây) để nghỉ ngơi.",
        "context": "Phân tích chữ hội ý"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu bộ Thị (Thần) và bộ Y (Áo)",
      "items": [
        {
          "subject": "Bộ Thị: 礻 (4 nét)",
          "nuance": "Biểu thị bàn thờ, thần linh, lễ bái, tổ tiên",
          "formula": "礻 + Thành phần khác",
          "example": "神社 (じんじゃ)",
          "exampleTranslation": "Đền thờ Thần đạo (Jinja)",
          "caution": "Chỉ có 1 nét chấm nghiêng ở đầu, nét thứ 3 là sổ thẳng liền."
        },
        {
          "subject": "Bộ Y: 衤 (5 nét)",
          "nuance": "Biểu thị sợi vải, y phục, trang phục may mặc",
          "formula": "衤 + Thành phần khác",
          "example": "衣服 (いふく)",
          "exampleTranslation": "Y phục, quần áo (Ifuku)",
          "caution": "Có 2 nét phẩy/chấm ở góc phải phía trên."
        }
      ],
      "summary": "Nhớ mẹo: Thần linh (礻) giản dị 1 chấm, Quần áo (衤) lộng lẫy 2 chấm."
    },
    "notes": [
      "Khi tra từ điển giấy cổ điển, nếu chữ Hán có nhiều thành phần, ưu tiên tìm bộ thủ ở vị trí: Trái (Biến - Hen) -> Phải (Bàng - Tsukuri) -> Trên (Đầu - Kanmuri) -> Dưới (Đế - Ashi)."
    ],
    "warnings": [
      "Bộ thủ giúp hiểu gốc nghĩa, nhưng qua hàng ngàn năm giản lược và biến nghĩa, có những chữ nghĩa hiện đại đã xa rời nghĩa gốc của bộ thủ. Hãy xem bộ thủ là trợ lực ghi nhớ chứ không phải chân lý duy nhất."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "quy-tac-chuyen-am-han-viet-sang-on-yomi",
        "title": "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
        "reason": "Ghép bộ thủ với âm On để đọc - hiểu toàn diện chữ Hán"
      },
      {
        "category": "kanji",
        "slug": "phuong-phap-hoc-kanji-theo-bo-thu-va-tu-ghep",
        "title": "Phương pháp học Kanji theo bộ thủ + từ ghép (Jukugo) thay vì học chữ riêng lẻ",
        "reason": "Áp dụng bộ thủ vào phương pháp học từ ghép hiệu quả"
      },
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-khau-va-vi",
        "title": "Phân biệt 口 (Khẩu - miệng) và 囗 (Vi - bao quanh): Chữ đơn lẻ vs Bộ bao ngoài",
        "reason": "Phân biệt chữ đơn lẻ với bộ thủ bao quanh"
      }
    ]
  },
  {
    "id": "k-sei-sen-shitsu",
    "slug": "phan-biet-kanji-sinh-tien-that",
    "categoryId": "kanji",
    "title": "Phân biệt các chữ Hán có nét tương đồng dễ nhầm: 生, 先, 失 và mẹo nhớ nét",
    "japaneseTitle": "似ている漢字の識別「生・先・失」",
    "summary": "Giải phẫu chi tiết sự khác biệt về số nét, thứ tự nét viết và mẹo ghi nhớ trực quan cho bộ 3 chữ Hán dễ nhầm nhất ở cấp độ nhập môn: 生 (Sinh), 先 (Tiên), 失 (Thất).",
    "level": "N5",
    "tags": [
      "Hán tự",
      "Chữ dễ nhầm",
      "生",
      "先",
      "失",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-sss-1",
        "title": "1. Bảng đối chiếu 3 chữ Hán song sinh",
        "content": "Học viên sơ cấp thường xuyên viết nhầm lẫn giữa 生, 先, và 失 do chúng đều có cấu tạo bởi các nét phẩy và nét ngang tương tự nhau:",
        "type": "table",
        "tableData": {
          "headers": [
            "Chữ Hán",
            "Hán - Việt",
            "Số nét",
            "Nét khác biệt cốt lõi",
            "Từ vựng tiêu biểu"
          ],
          "rows": [
            [
              "生",
              "SINH",
              "5 nét",
              "Nét phẩy chéo bên trái phía trên, 3 nét ngang, 1 nét sổ thẳng đứng",
              "学生 (gakusei), 生きる (ikiru)"
            ],
            [
              "先",
              "TIÊN",
              "6 nét",
              "Phần dưới là bộ Nhi (儿 - đôi chân đi trước)",
              "先生 (sensei), 先週 (senshuu)"
            ],
            [
              "失",
              "THẤT",
              "5 nét",
              "Nét phẩy trên cùng cắt qua nét ngang (như mũi tên bay mất)",
              "失礼 (shitsurei), 失敗 (shippai)"
            ]
          ]
        }
      },
      {
        "id": "sec-sss-2",
        "title": "2. Mẹo ghi nhớ hình tượng (Mnemonic Note)",
        "content": "- 生 (Sinh): Mầm cây vừa nảy mầm vươn lên từ mặt đất (Sinh sôi, sự sống).\n- 先 (Tiên): Người có đôi chân (儿) bước đi trước dẫn đường (Tiên phong, thầy giáo).\n- 失 (Thất): Bàn tay để tuột mất mũi tên bay xuyên qua (Thất lạc, mất mát).\n(Lưu ý: Đây là mẹo ghi nhớ hình tượng - mnemonic giúp dễ liên tưởng, không phải chiết tự nguồn gốc văn hiến cổ).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-sss-1",
        "japanese": "先生、失礼いたします。",
        "reading": "せんせい、しつれいいたします。",
        "romaji": "Sensei, shitsurei itashimasu.",
        "vietnamese": "Thưa thầy, em xin phép vào ạ.",
        "explanation": "Trong cùng 1 câu xuất hiện cả chữ TIÊN (先 trong 先生) và chữ THẤT (失 trong 失礼).",
        "context": "Chào hỏi lễ phép vào phòng"
      },
      {
        "id": "ex-sss-2",
        "japanese": "大学生が失敗を恐れずに挑戦する。",
        "reading": "だいがくせいがしっぱいをおそれず にちょうせんする。",
        "romaji": "Daigakusei ga shippai o osorezu ni chousen suru.",
        "vietnamese": "Sinh viên đại học thử thách bản thân mà không sợ thất bại.",
        "explanation": "Chữ SINH (生 trong 大学生) đi cùng chữ THẤT (失 trong 失敗).",
        "context": "Khích lệ học tập"
      }
    ],
    "comparisons": {
      "title": "So sánh cấu trúc nét của 生 vs 先 vs 失",
      "items": [
        {
          "subject": "先 (Tiên - 6 nét) vs 失 (Thất - 5 nét)",
          "nuance": "Chữ 先 có nét sổ cong móc chân đi trước; Chữ 失 có nét phẩy cắt ngang nét trên",
          "formula": "先 = 丿 + 一 + 土 + 儿 | 失 = 丿 cắt 一 + 大",
          "example": "先月 (Tháng trước) vs 失望 (Thất vọng)",
          "exampleTranslation": "Sengetsu vs Shitsubou",
          "caution": "Chú ý nét dưới cùng của chữ 先 là bộ đôi chân 儿."
        },
        {
          "subject": "生 (Sinh - 5 nét)",
          "nuance": "3 nét ngang song song, nét sổ dọc đứng thẳng ở giữa",
          "formula": "生 = 丿 + 一 + ｜ + 一 + 一",
          "example": "生活 (Đời sống - Seikatsu)",
          "exampleTranslation": "Seikatsu",
          "caution": "Nét ngang dưới cùng là nét dài nhất."
        }
      ],
      "summary": "Có chân (儿) là TIÊN (先); bị cắt đứt là THẤT (失); 3 nét ngang mầm cây là SINH (生)."
    },
    "notes": [
      "Thứ tự nét viết (Kakujun): Chữ 失 viết nét phẩy trên cùng trước, sau đó đến nét ngang ngắn, rồi nét ngang dài và cuối cùng là hai nét phẩy - mác xòe dưới."
    ],
    "warnings": [
      "Không nhầm chữ 失 (Thất) với chữ 矢 (Thỉ - Mũi tên). Chữ 矢 nét phẩy trên cùng KHÔNG xuyên qua nét ngang."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-dai-tri-thoi",
        "title": "Phân biệt bộ 3 chữ Hán cùng gốc: 待 (Đợi), 持 (Cầm), 時 (Thời gian)",
        "reason": "Tiếp tục phân biệt nhóm chữ Hán có bộ thủ tương đồng"
      },
      {
        "category": "kanji",
        "slug": "quy-tac-chuyen-am-han-viet-sang-on-yomi",
        "title": "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
        "reason": "Âm On của Sinh (SEI), Tiên (SEN), Thất (SHITSU)"
      },
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-vi-va-mat",
        "title": "Phân biệt 未 (Chưa - Vị) và 末 (Cuối - Mạt): Chiều dài nét ngang quyết định ý nghĩa",
        "reason": "Chữ Hán chỉ khác biệt nhỏ ở chiều dài nét ngang"
      }
    ]
  },
  {
    "id": "k-matsu-motsu-toki",
    "slug": "phan-biet-kanji-dai-tri-thoi",
    "categoryId": "kanji",
    "title": "Phân biệt bộ 3 chữ Hán cùng gốc: 待 (Đợi), 持 (Cầm), 時 (Thời gian)",
    "japaneseTitle": "同一パーツの漢字「待・持・時」の識別",
    "summary": "Bí quyết phân biệt 3 chữ Hán có chung phần bên phải là chữ Tự (寺 - Chùa): Đợi bước chân (待), Tay cầm nắm (持), và Mặt trời đo thời gian (時).",
    "level": "N5",
    "tags": [
      "Hán tự",
      "Bộ thủ",
      "待",
      "持",
      "時",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-mmt-1",
        "title": "1. Điểm chung: Phần bên phải là chữ Tự (寺 - ngôi chùa)",
        "content": "Cả 3 chữ 待, 持, 時 đều có phần bên phải là chữ 寺 (Tự - Ngôi chùa). Điểm khác biệt duy nhất quyết định ý nghĩa của chữ nằm ở BỘ THỦ BÊN TRÁI:",
        "type": "table",
        "tableData": {
          "headers": [
            "Chữ Hán",
            "Hán - Việt",
            "Bộ thủ bên trái",
            "Ý nghĩa gợi nhớ",
            "Từ vựng tiêu biểu"
          ],
          "rows": [
            [
              "待",
              "ĐÃI",
              "彳 (Xích - Bước chân ngắn)",
              "Đứng đợi bước chân ai đó đến cổng chùa",
              "待つ (matsu - Chờ đợi), 招待 (shoutai - Chiêu đãi/Mời)"
            ],
            [
              "持",
              "TRÌ",
              "扌 (Thủ - Bàn tay)",
              "Dùng bàn tay cầm nắm đồ vật mang lên chùa",
              "持つ (motsu - Cầm/Có), 気持ち (kimochi - Tâm trạng)"
            ],
            [
              "時",
              "THỜI",
              "日 (Nhật - Mặt trời)",
              "Nhìn bóng mặt trời chiếu xuống mái chùa đo thời gian",
              "時 (toki - Khi/Lúc), 時間 (jikan - Thời gian)"
            ]
          ]
        }
      },
      {
        "id": "sec-mmt-2",
        "title": "2. Gợi ý học tập (Mnemonic)",
        "content": "Hãy nhớ câu vè liên tưởng:\n'Mặt trời (日) là Thời (時);\nĐôi chân (彳) đứng Đợi (待);\nBàn tay (扌) Cầm (持) lấy.'\n(Lưu ý: Mẹo vè này là kỹ thuật ghi nhớ - mnemonic, không phản ánh chiết tự lịch sử giáp cốt văn).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-mmt-1",
        "japanese": "駅の前で友達を待っています。",
        "reading": "えきのまえでともだちをまっています。",
        "romaji": "Eki no mae de tomodachi o matte imasu.",
        "vietnamese": "Tôi đang đứng đợi bạn ở trước nhà ga.",
        "explanation": "Hành động chờ đợi -> Dùng chữ ĐÃI (待 có bộ Xích 彳).",
        "context": "Đứng đợi bạn bè"
      },
      {
        "id": "ex-mmt-2",
        "japanese": "重い荷物を持っています。",
        "reading": "おもいにもつをもっています。",
        "romaji": "Omoi nimotsu o motte imasu.",
        "vietnamese": "Tôi đang cầm một kiện hành lý rất nặng.",
        "explanation": "Hành động dùng tay mang xách -> Dùng chữ TRÌ (持 có bộ Thủ 扌).",
        "context": "Cầm nắm đồ vật"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu bộ thủ bên trái của 待, 持, 時",
      "items": [
        {
          "subject": "待つ (matsu) vs 持つ (motsu)",
          "nuance": "Chân đứng chờ (待) vs Tay cầm đồ (持)",
          "formula": "彳 + 寺 (待) vs 扌 + 寺 (持)",
          "example": "待ってください (Xin đợi) vs 持ってください (Xin cầm hộ)",
          "exampleTranslation": "Matte kudasai vs Motte kudasai",
          "caution": "Phát âm matsu và motsu khác nhau ở nguyên âm a/o."
        },
        {
          "subject": "時 (toki / ji)",
          "nuance": "Chỉ thời gian, giờ giấc, khoảnh khắc",
          "formula": "日 + 寺 (時)",
          "example": "一時 (Một giờ - Ichiji)",
          "exampleTranslation": "Ichiji",
          "caution": "Bộ Nhật 日 ở bên trái viết thon dài."
        }
      ],
      "summary": "Nhìn bộ thủ bên trái là đọc được ngay ý nghĩa: Chân (彳) -> Đợi; Tay (扌) -> Cầm; Mặt trời (日) -> Giờ."
    },
    "notes": [
      "Âm On của cả 3 chữ đều mang âm ĐAI / TRÌ / THỜI: 待 (TAI - 招待 shoutai), 持 (JI - 維持 iji), 時 (JI - 時間 jikan)."
    ],
    "warnings": [
      "Khi viết nhanh, bộ 彳 (2 nét phẩy) rất dễ bị viết ẩu thành bộ 亻 (1 nét phẩy). Chú ý bộ Xích 彳 luôn có 2 nét phẩy ở đầu."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "bo-thu-kanji-thuong-gap-va-meo-nho",
        "title": "50 Bộ thủ Kanji cốt lõi giúp đoán nghĩa nhanh mọi chữ Hán",
        "reason": "Ôn lại bộ Thủ (tay) và bộ Nhật (mặt trời)"
      },
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-sinh-tien-that",
        "title": "Phân biệt các chữ Hán có nét tương đồng dễ nhầm: 生, 先, 失 và mẹo nhớ nét",
        "reason": "Cùng rèn luyện kỹ năng phân biệt hình thể chữ Hán"
      }
    ]
  },
  {
    "id": "k-on-kun-usage",
    "slug": "khi-nao-dung-on-yomi-va-kun-yomi",
    "categoryId": "kanji",
    "title": "Âm On (Onyomi) và Âm Kun (Kunyomi): Bức tranh toàn cảnh khi nào dùng mỗi loại",
    "japaneseTitle": "音読みと訓読みの使い分けの目安",
    "summary": "Quy luật xác suất 85/15: Khi nào chữ Hán đọc bằng âm On (từ ghép Jukugo) và khi nào đọc bằng âm Kun (đứng độc lập, có Okurigana, tên người Nhật), kèm các ngoại lệ.",
    "level": "ALL",
    "tags": [
      "Hán tự",
      "Onyomi",
      "Kunyomi",
      "Cách đọc",
      "Quy tắc",
      "N5"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ok-1",
        "title": "1. Nguyên lý phân chia Âm On vs Âm Kun",
        "content": "- Âm On (Onyomi): Âm mượn từ tiếng Hán cổ thời xưa, thường có 1-2 âm tiết ngắn gọn.\n- Âm Kun (Kunyomi): Âm thuần Nhật (Yamato kotoba) gán vào chữ Hán để thể hiện nghĩa tương đương trong đời sống hàng ngày của người Nhật cổ.",
        "type": "text"
      },
      {
        "id": "sec-ok-2",
        "title": "2. Quy luật xác suất: Khi nào đọc âm On?",
        "content": "Khoảng 85% trường hợp chữ Hán sẽ đọc bằng Âm On khi:\n- Ghép từ 2 chữ Hán trở lên để tạo thành từ ghép danh từ (Jukugo - 熟語): 勉強 (benkyou), 会社 (kaisha), 電話 (denwa).\n- Thuộc từ vựng học thuật, kinh tế, chính trị, công nghệ.",
        "type": "rule"
      },
      {
        "id": "sec-ok-3",
        "title": "3. Khi nào đọc bằng Âm Kun?",
        "content": "Chữ Hán hầu như luôn đọc bằng Âm Kun khi:\n- Đứng một mình độc lập: 水 (mizu - nước), 山 (yama - núi), 人 (hito - người), 犬 (inu - chó).\n- Có phần đuôi Hiragana đi kèm (Okurigana - 送り仮名): 食べる (taberu), 楽しい (tanoshii), 高い (takai).\n- Tên địa danh và họ người thuần Nhật: 山田 (Yamada), 田中 (Tanaka).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-ok-1",
        "japanese": "山 (やま) に登ります vs 富士山 (ふじさん)",
        "reading": "やまにのぼります vs ふじさん",
        "romaji": "Yama ni noborimasu vs Fujisan",
        "vietnamese": "Leo núi (núi đứng một mình đọc là YAMA - Kun) vs Núi Phú Sĩ (từ ghép đọc là SAN - On).",
        "explanation": "Chữ 山 đứng một mình đọc là Kunyomi, ghép trong tên núi đọc là Onyomi.",
        "context": "So sánh chữ 山 đứng một mình và ghép"
      },
      {
        "id": "ex-ok-2",
        "japanese": "水 (みず) を飲む vs 水泳 (すいえい)",
        "reading": "みずをのむ vs すいえい",
        "romaji": "Mizu o nomu vs Suiei",
        "vietnamese": "Uống nước (MIZU - Kun) vs Bơi lội (SUI - On trong từ ghép Thủy Vịnh).",
        "explanation": "Độc lập là mizu, ghép vào từ vựng thể thao là sui.",
        "context": "So sánh chữ 水"
      }
    ],
    "comparisons": {
      "title": "Bảng tổng kết quy tắc On-yomi vs Kun-yomi",
      "items": [
        {
          "subject": "Âm On (Onyomi - Âm Hán)",
          "nuance": "Từ ghép 2+ chữ Hán, khái niệm trừu tượng, học thuật",
          "formula": "Kanji + Kanji -> Âm On",
          "example": "安心 (Anshin - An tâm)",
          "exampleTranslation": "Anshin",
          "caution": "Không phải 100%, có từ ghép thuần Nhật đọc Kun (ví dụ: 花火 hanabi)."
        },
        {
          "subject": "Âm Kun (Kunyomi - Thuần Nhật)",
          "nuance": "Đứng riêng lẻ, động từ có đuôi Hiragana, sự vật thân thuộc",
          "formula": "Kanji + Hiragana / Kanji đơn",
          "example": "走る (Hashiru - Chạy)",
          "exampleTranslation": "Hashiru",
          "caution": "Có những từ Kanji đứng riêng vẫn có thể đọc bằng âm On trong trường hợp đặc biệt."
        }
      ],
      "summary": "Đứng một mình hoặc có Hiragana thò ra ngoài -> Kunyomi; Ghép 2 chữ Hán với nhau -> Onyomi."
    },
    "notes": [
      "Có dạng đọc ghép lai giữa On và Kun: Trọng âm đầu On đuôi Kun (Jubako-yomi) như 重箱 (juubako), hoặc đầu Kun đuôi On (Yutou-yomi) như 湯飲み (yunomi)."
    ],
    "warnings": [
      "Đây là quy luật xác suất (~85%), không phải quy tắc tuyệt đối toán học. Người học luôn cần kiểm chứng bằng từ điển chuẩn."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "quy-tac-chuyen-am-han-viet-sang-on-yomi",
        "title": "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
        "reason": "Quy tắc áp dụng cho âm On"
      },
      {
        "category": "kanji",
        "slug": "phuong-phap-hoc-kanji-theo-bo-thu-va-tu-ghep",
        "title": "Phương pháp học Kanji theo bộ thủ + từ ghép (Jukugo) thay vì học chữ riêng lẻ",
        "reason": "Ứng dụng âm On khi học theo từ ghép"
      }
    ]
  },
  {
    "id": "k-bo-thu-tu-ghep",
    "slug": "phuong-phap-hoc-kanji-theo-bo-thu-va-tu-ghep",
    "categoryId": "kanji",
    "title": "Phương pháp học Kanji theo bộ thủ + từ ghép (Jukugo) thay vì học chữ riêng lẻ",
    "japaneseTitle": "部首と熟語による効率的な漢字学習法",
    "summary": "Từ bỏ thói quen chép phạt từng chữ Hán đơn độc: Chiến lược học theo gốc bộ thủ để hiểu nghĩa và học theo từ ghép (Jukugo) để làm chủ phản xạ ngữ âm và ứng dụng thực tế.",
    "level": "ALL",
    "tags": [
      "Hán tự",
      "Phương pháp học",
      "Bộ thủ",
      "Từ ghép",
      "Jukugo",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-bj-1",
        "title": "1. Vấn đề của cách học truyền thống: 'Học vẹt từng chữ'",
        "content": "Rất nhiều người học dành hàng giờ ngồi chép phạt 1 chữ Kanji đơn lẻ kèm tất cả 5-7 cách đọc On/Kun trong từ điển. Hậu quả là khi gặp chữ đó trong câu văn, não bộ không biết phải lôi cách đọc nào ra, dẫn đến tê liệt phản xạ.",
        "type": "text"
      },
      {
        "id": "sec-bj-2",
        "title": "2. Trụ cột 1: Học ý nghĩa thông qua Bộ thủ (Bushu)",
        "content": "Bộ thủ là 'gốc rễ' của chữ Hán. Khi bạn nắm chắc 50 bộ thủ phổ biến, mỗi chữ Hán mới không còn là một đống nét hỗn độn ngẫu nhiên mà là một bài toán ghép Lego giữa các khối hình quen thuộc.",
        "type": "rule"
      },
      {
        "id": "sec-bj-3",
        "title": "3. Trụ cột 2: Học âm đọc thông qua Từ ghép thực tế (Jukugo)",
        "content": "Thay vì học 'Chữ HỌC đọc là GAKU, MANA', hãy học luôn 3 từ ghép thông dụng nhất có chứa nó:\n- 学生 (Gakusei - Học sinh)\n- 大学 (Daigaku - Đại học)\n- 学ぶ (Manabu - Học hỏi).\nBằng cách này, bạn vừa nhớ được cách đọc chuẩn xác trong ngữ cảnh, vừa tăng vốn từ vựng thực chiến gấp 3 lần.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-bj-1",
        "japanese": "電 (Điện) + 車 (Xa) = 電車 (でんしゃ - Tàu điện)",
        "reading": "でん + しゃ = でんしゃ",
        "romaji": "Den + Sha = Densha",
        "vietnamese": "Xe chạy bằng điện = Tàu điện.",
        "explanation": "Ghép nghĩa của 2 chữ Hán tạo nên từ vựng trực quan dễ nhớ không bao giờ quên.",
        "context": "Tư duy ghép từ Jukugo"
      },
      {
        "id": "ex-bj-2",
        "japanese": "青 (Xanh) + 氵(Thủy) = 清 (Thanh - Nước trong vắt)",
        "reading": "あお + みず = きよい",
        "romaji": "Ao + Mizu = Kiyoi",
        "vietnamese": "Thêm bộ Thủy vào chữ Thanh -> Biểu thị làn nước trong xanh tinh khiết.",
        "explanation": "Sử dụng bộ thủ để mở rộng họ hàng chữ Hán.",
        "context": "Mở rộng họ chữ từ bộ thủ"
      }
    ],
    "comparisons": {
      "title": "Học chữ riêng lẻ vs Học theo từ ghép & bộ thủ",
      "items": [
        {
          "subject": "Học chữ riêng vị lẻ",
          "nuance": "Chép phạt rời rạc, nhớ mặt chữ nhưng không biết đọc trong câu",
          "formula": "1 Chữ = Học vẹt On/Kun",
          "example": "Học chữ Sinh -> nhớ 7 cách đọc nhưng không biết dùng",
          "exampleTranslation": "Mất nhiều công sức nhưng hiệu quả thấp.",
          "caution": "Dễ gây chán nản và mau quên."
        },
        {
          "subject": "Học theo Bộ thủ + Từ ghép",
          "nuance": "Hiểu gốc nghĩa qua bộ thủ, gắn liền cách đọc với từ ghép thực tế",
          "formula": "Bộ thủ -> Chữ Hán -> 3 Từ ghép",
          "example": "Học chữ Sinh qua: 先生, 生活, 生まれる",
          "exampleTranslation": "Ghi nhớ bền vững và phản xạ tức thì.",
          "caution": "Luôn tra cứu từ điển câu ví dụ thực tế."
        }
      ],
      "summary": "Muốn hiểu nghĩa -> nhìn Bộ thủ; Muốn biết đọc -> học theo Từ ghép (Jukugo)."
    },
    "notes": [
      "Bộ sách và phương pháp học Kanji hiện đại của người Nhật bản xứ cho trẻ em tiểu học cũng áp dụng 100% nguyên lý học từ ghép này."
    ],
    "warnings": [
      "Không lạm dụng những câu chuyện liên tưởng quá kỳ quái hoặc sai lệch hoàn toàn với gốc bộ thủ, vì nó sẽ phản tác dụng khi học lên các cấp độ Hán tự cao cấp hơn (N2, N1)."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "bo-thu-kanji-thuong-gap-va-meo-nho",
        "title": "50 Bộ thủ Kanji cốt lõi giúp đoán nghĩa nhanh mọi chữ Hán",
        "reason": "Nắm vững danh sách 50 bộ thủ nền tảng"
      },
      {
        "category": "notes",
        "slug": "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        "title": "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        "reason": "Mở rộng tư duy học theo khối từ Kanji sang ngữ pháp"
      }
    ]
  },
  {
    "id": "k-mi-matsu",
    "slug": "phan-biet-kanji-vi-va-mat",
    "categoryId": "kanji",
    "title": "Phân biệt 未 (Chưa - Vị) và 末 (Cuối - Mạt): Chiều dài nét ngang quyết định ý nghĩa",
    "japaneseTitle": "漢字の判別「未」と「末」：横線の長さで変わる意味",
    "summary": "Chỉ một chênh lệch nhỏ ở nét ngang trên ngắn hay dài sẽ biến đổi hoàn toàn giữa chữ Vị (chưa tới/chưa từng) và chữ Mạt (phần ngọn/điểm kết thúc cuối cùng).",
    "level": "N4",
    "tags": [
      "Kanji",
      "Chữ Hán dễ nhầm",
      "Bộ thủ",
      "Mẹo nhớ",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-kmm-1",
        "title": "1. So sánh hình thái nét: Nét trên ngắn vs Nét trên dài",
        "content": "- 未 (VỊ - Chưa): NÉT NGANG TRÊN NGẮN HƠN NÉT NGANG DƯỚI.\n  + Gợi ý hình tượng: Cây cối còn non, cành trên chưa phát triển dài ra bằng cành dưới -> Mang nghĩa 'Chưa đến, chưa thành'.\n  + Âm On: ミ (mi).\n- 末 (MẠT - Cuối): NÉT NGANG TRÊN DÀI HƠN NÉT NGANG DƯỚI.\n  + Gợi ý hình tượng: Cành trên đã vươn dài tít tắp lên ngọn cây cao nhất -> Mang nghĩa 'Phần ngọn, kết thúc, điểm chót'.\n  + Âm On: マツ (matsu) / バツ (batsu).",
        "type": "rule"
      },
      {
        "id": "sec-kmm-2",
        "title": "2. Từ ghép quan trọng trong JLPT và đời sống",
        "content": "- Chữ 未 (Vị - Chưa):\n  + 未来 (みらい - mirai): Tương lai (những ngày chưa tới).\n  + 未成年 (みせいねん - miseinen): Vị thành niên (chưa đủ tuổi trưởng thành).\n  + 未定 (みてい - mitei): Chưa định, chưa quyết định.\n- Chữ 末 (Mạt - Cuối):\n  + 月末 (げつまつ - getsumatsu): Cuối tháng.\n  + 年末 (ねんまつ - nenmatsu): Cuối năm.\n  + 週末 (しゅうまつ - shuumatsu): Cuối tuần.\n  + 結末 (けつまつ - ketsumatsu): Hồi kết, kết cục.",
        "type": "pattern"
      },
      {
        "id": "sec-kmm-3",
        "title": "3. Mẹo nhớ nhanh (Mnemonic)",
        "content": "Mẹo nhớ mẹo liên tưởng:\n- 'Chưa lớn thì đầu còn ngắn' -> Nét trên ngắn là chữ 未 (Chưa - Vị).\n- 'Đã đến ngọn thì vươn dài ra' -> Nét trên dài là chữ 末 (Cuối - Mạt).\nLưu ý: Đây chỉ là mẹo ghi nhớ hình ảnh (Mnemonic), không phải chiết tự lịch sử giáp cốt văn.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-kmm-1",
        "japanese": "週末は家族と一緒に温泉に行きます。",
        "reading": "しゅうまつはかぞくといっしょにおんせんにいきます。",
        "romaji": "Shuumatsu wa kazoku to issho ni onsen ni ikimasu.",
        "vietnamese": "Cuối tuần tôi sẽ cùng gia đình đi suối nước nóng.",
        "explanation": "Chữ Mạt 末 trong 週末 (cuối tuần - nét trên dài).",
        "context": "Kể về kế hoạch nghỉ dưỡng"
      },
      {
        "id": "ex-kmm-2",
        "japanese": "自分の未来のために、毎日努力しています。",
        "reading": "じぶんのみらいのために、まいにちどりょくしています。",
        "romaji": "Jibun no mirai no tame ni, mainichi doryoku shite imasu.",
        "vietnamese": "Vì tương lai của chính mình, mỗi ngày tôi đều nỗ lực.",
        "explanation": "Chữ Vị 未 trong 未来 (tương lai - nét trên ngắn).",
        "context": "Chia sẻ lý tưởng sống"
      },
      {
        "id": "ex-kmm-3",
        "japanese": "次回の会議の日時はまだ未定です。",
        "reading": "じかいのかいぎのにちじはまだみていです。",
        "romaji": "Jikai no kaigi no nichiji wa mada mitei desu.",
        "vietnamese": "Thời gian cuộc họp tiếp theo vẫn chưa được ấn định.",
        "explanation": "未定 (chưa quyết) dùng chữ 未.",
        "context": "Thông báo tiến độ công việc"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "未来 (Vị lai - 未)",
          "nuance": "Chữ 未 (vị) nét ngang trên ngắn hơn biểu thị 'chưa đến'. Chữ 末 (mạt) nét ngang trên dài hơn biểu thị 'điểm kết thúc cuối cùng'.",
          "example": "未来 (Vị lai - 未)",
          "exampleTranslation": "年末 (Niên mạt - 末)",
          "caution": "Chữ 未 (vị) nét ngang trên ngắn hơn biểu thị 'chưa đến'. Chữ 末 (mạt) nét ngang trên dài hơn biểu thị 'điểm kết thúc cuối cùng'."
        }
      ],
      "summary": "Chữ 未 (vị) nét ngang trên ngắn hơn biểu thị 'chưa đến'. Chữ 末 (mạt) nét ngang trên dài hơn biểu thị 'điểm kết thúc cuối cùng'."
    },
    "notes": [
      "Tránh nhầm với chữ Bổn 本 và chữ Mạt 末 khi viết tay vội vàng."
    ],
    "warnings": [
      "Trong kỳ thi JLPT phần Kanji, hai chữ này thường xuyên được đặt cạnh nhau trong các đáp án trắc nghiệm gây nhiễu thị giác."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-sinh-tien-that",
        "title": "Phân biệt các chữ Hán có nét tương đồng dễ nhầm: 生, 先, 失 và mẹo nhớ nét",
        "reason": "Các cặp chữ Hán sai một ly đi một dặm"
      },
      {
        "category": "grammar",
        "slug": "phan-biet-made-va-made-ni",
        "title": "Phân biệt まで (cho tới khi) và までに (hạn chót hoàn thành): Bản chất hành động",
        "reason": "Từ vựng có chữ 末 chỉ hạn chót: 月末, 週末"
      },
      {
        "category": "kanji",
        "slug": "phuong-phap-hoc-kanji-theo-bo-thu-va-tu-ghep",
        "title": "Phương pháp học Kanji theo bộ thủ + từ ghép (Jukugo) thay vì học chữ riêng lẻ",
        "reason": "Ghi nhớ chữ Hán qua các cặp từ ghép thực tế"
      }
    ]
  },
  {
    "id": "k-tsuchi-samurai",
    "slug": "phan-biet-kanji-tho-va-si",
    "categoryId": "kanji",
    "title": "Phân biệt 土 (Đất - Thổ) và 士 (Kẻ sĩ - Sĩ): Phân tích cấu trúc nét và các từ ghép tiêu biểu",
    "japaneseTitle": "漢字の判別「土」と「士」：上の横線が長いか下の横線が長いか",
    "summary": "Tách bạch giữa chữ Thổ 土 (nét dưới dài làm bệ đỡ mặt đất) và chữ Sĩ 士 (nét trên dài làm bờ vai kẻ sĩ rộng lớn) kèm ứng dụng trong nghề nghiệp và tự nhiên.",
    "level": "N5",
    "tags": [
      "Kanji",
      "Chữ Hán dễ nhầm",
      "Bộ thủ",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-kts-1",
        "title": "1. So sánh tỷ lệ nét: Nét dưới dài vs Nét trên dài",
        "content": "- 土 (THỔ - Đất):\n  + NÉT DƯỚI DÀI HƠN NÉT TRÊN.\n  + Ý nghĩa: Nét dưới dài đóng vai trò là mặt đất nâng đỡ cây mầm nhú lên khỏi đất.\n  + Âm Kun: つち (tsuchi). Âm On: ド (do) / ト (to).\n- 士 (SĨ - Kẻ sĩ, người tài):\n  + NÉT TRÊN DÀI HƠN NÉT DƯỚI.\n  + Ý nghĩa: Người nam nhi có bờ vai rộng gánh vác việc nước, đứng vững chãi.\n  + Âm On: シ (shi). Hầu như không có âm Kun thông dụng.",
        "type": "rule"
      },
      {
        "id": "sec-kts-2",
        "title": "2. Từ vựng ứng dụng phổ biến",
        "content": "- Chữ 土 (Thổ):\n  + 土地 (とち - tochi): Đất đai.\n  + 土曜日 (どようび - doyoubi): Thứ Bảy.\n  + お土産 (おみやげ - omiyage): Quà lưu niệm (đặc sản thổ nhưỡng địa phương).\n- Chữ 士 (Sĩ):\n  + 弁護士 (べんごし - bengoshi): Luật sư.\n  + 医師 (いし - ishi): Bác sĩ (chú ý chữ 師 này là Thầy/Sư, nhưng trong 博士 (はかせ) dùng chữ 士).\n  + 兵士 (へいし - heishi): Binh sĩ.\n  + 富士山 (ふじさん - Fujisan): Núi Phú Sĩ.",
        "type": "pattern"
      },
      {
        "id": "sec-kts-3",
        "title": "3. Mẹo nhớ nhanh",
        "content": "- 'Mặt đất thì đáy phải rộng' -> Nét đáy dài là chữ 土 (Đất).\n- 'Kẻ sĩ thì vai phải to' -> Nét vai trên dài là chữ 士 (Kẻ sĩ).\nLưu ý: Mẹo Mnemonic giúp liên tưởng thị giác tức thì khi làm bài thi.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-kts-1",
        "japanese": "土曜日に友達とお土産を買いに行きます。",
        "reading": "どようびにともだちとおみやげをかいにいきます。",
        "romaji": "Doyoubi ni tomodachi to omiyage o kai ni ikimasu.",
        "vietnamese": "Vào thứ Bảy tôi sẽ cùng bạn đi mua quà lưu niệm.",
        "explanation": "Chữ Thổ 土 trong 土曜日 (thứ Bảy) và お土産 (quà kỷ niệm).",
        "context": "Lên lịch đi mua sắm quà"
      },
      {
        "id": "ex-kts-2",
        "japanese": "将来、弁護士になるために法律を勉強しています。",
        "reading": "しょうらい、べんごしになるためにほうりつをべんきょうしています。",
        "romaji": "Shourai, bengoshi ni naru tame ni houritsu o benkyou shite imasu.",
        "vietnamese": "Để sau này trở thành luật sư, tôi đang học ngành luật.",
        "explanation": "Chữ Sĩ 士 trong 弁護士 (luật sư).",
        "context": "Mục tiêu nghề nghiệp"
      },
      {
        "id": "ex-kts-3",
        "japanese": "新幹線から美しい富士山が見えました。",
        "reading": "しんかんせんからうつくしいふじさんがみえました。",
        "romaji": "Shinkansen kara utsukushii Fujisan ga miemashita.",
        "vietnamese": "Từ trên tàu Shinkansen tôi đã nhìn thấy núi Phú Sĩ tuyệt đẹp.",
        "explanation": "Chữ 士 trong tên ngọn núi biểu tượng 富士山.",
        "context": "Kể lại trải nghiệm đi tàu"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "土曜日 (Thổ - 土)",
          "nuance": "Thổ nét dưới dài hơn. Sĩ nét trên dài hơn.",
          "example": "土曜日 (Thổ - 土)",
          "exampleTranslation": "弁護士 (Sĩ - 士)",
          "caution": "Thổ nét dưới dài hơn. Sĩ nét trên dài hơn."
        }
      ],
      "summary": "Thổ nét dưới dài hơn. Sĩ nét trên dài hơn."
    },
    "notes": [
      "Bộ Thổ 土 cũng là một trong những bộ thủ phổ biến nhất cấu tạo nên các chữ như: 地 (đất), 城 (thành trì), 場 (nơi chốn)."
    ],
    "warnings": [
      "Khi viết chữ Thổ 土 ghép vào bên trái làm bộ thủ (như trong 場, 地), nét ngang dưới cùng biến đổi thành một nét hất chếch lên trên."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "bo-thu-kanji-thuong-gap-va-meo-nho",
        "title": "50 Bộ thủ Kanji cốt lõi giúp đoán nghĩa nhanh mọi chữ Hán",
        "reason": "Bộ Thổ và Bộ Sĩ trong cấu tạo chữ Hán"
      },
      {
        "category": "vocabulary",
        "slug": "tu-vung-ngu-canh-truong-hoc-va-cong-ty",
        "title": "Phân biệt từ vựng môi trường Trường học vs Công ty: 授業/会議, 宿題/書類",
        "reason": "Từ vựng nghề nghiệp chứa chữ 士"
      },
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-vuong-va-ngoc",
        "title": "Phân biệt 王 (Vương - vua) và 玉 (Ngọc - viên ngọc/trứng)",
        "reason": "Mẹo quan sát tỷ lệ nét ngang tương đồng"
      },
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-thien-va-can",
        "title": "Phân biệt 千 (Thiên - một nghìn) và 干 (Can - phơi khô): Nét phẩy nghiêng vs Nét ngang thẳng",
        "reason": "Phân biệt góc nghiêng của nét đầu chữ Hán"
      }
    ]
  },
  {
    "id": "k-kuchi-kakoi",
    "slug": "phan-biet-kanji-khau-va-vi",
    "categoryId": "kanji",
    "title": "Phân biệt 口 (Khẩu - miệng) và 囗 (Vi - bao quanh): Chữ đơn lẻ vs Bộ bao ngoài",
    "japaneseTitle": "漢字の判別「口」と「囗（くにがまえ）」：単独文字と囲み部首",
    "summary": "Hiểu rõ sự khác biệt bản chất giữa chữ Khẩu 口 (đứng độc lập hoặc làm bộ phận nhỏ) và bộ Vi 囗 (Kunigamae - luôn bao bọc kín mít các thành phần khác bên trong).",
    "level": "N5",
    "tags": [
      "Kanji",
      "Bộ thủ",
      "Phân tích chữ",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-kkk-1",
        "title": "1. Bản chất: Chữ đơn 口 (Khẩu) vs Khung bao 囗 (Vi)",
        "content": "- 口 (KHẨU - Miệng, lối vào):\n  + Là một chữ Hán HOÀN CHỈNH ĐỘC LẬP.\n  + Kích thước nhỏ gọn, tượng hình cái miệng mở ra.\n  + Âm Kun: くち (kuchi). Âm On: コウ (kou) / ク (ku).\n- 囗 (VI - Vây quanh, ranh giới):\n  + KHÔNG BAO GIỜ ĐỨNG MỘT MÌNH như một từ có nghĩa độc lập.\n  + Là BỘ THỦ BAO NGOÀI (Kunigamae - 囗).\n  + Kích thước lớn, vuông vức, bắt buộc phải có các nét khác nằm lọt thỏm bên trong.",
        "type": "rule"
      },
      {
        "id": "sec-kkk-2",
        "title": "2. Quy tắc bút thuận khi viết bộ Vi 囗",
        "content": "Quy tắc vàng: 'VÀO TRƯỚC ĐÓNG SAU' (Vào nhà trước rồi mới đóng cửa sau):\n1. Viết nét sổ dọc bên trái.\n2. Viết nét ngang gập bên phải.\n3. Viết toàn bộ các chữ Hán nằm bên trong ruột.\n4. Nét cuối cùng: Viết nét ngang đáy để khóa kín chiếc hộp lại.",
        "type": "rule"
      },
      {
        "id": "sec-kkk-3",
        "title": "3. Các chữ Hán tiêu biểu chứa bộ Vi 囗",
        "content": "- 国 (QUỐC - Đất nước): Bộ Vi bao quanh chữ Ngọc 玉 (bờ cõi bảo vệ ngọc ngà châu báu).\n- 四 (TỨ - Số bốn): Bộ Vi bao quanh hai nét bên trong.\n- 回 (HỒI - Quay lại, vòng): Một vòng tròn bao quanh một vòng tròn nhỏ bên trong (回る - mawaru).\n- 園 (VIÊN - Vườn): Bộ Vi bao quanh vườn tược (公園 - kouen: công viên).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-kkk-1",
        "japanese": "駅の東口で待ち合わせをしましょう。",
        "reading": "えきのひがしぐちでまちあわせをしましょう。",
        "romaji": "Eki no higashiguchi de machiawase o shimashou.",
        "vietnamese": "Chúng ta hãy hẹn gặp nhau ở cổng phía Đông của nhà ga nhé.",
        "explanation": "Chữ Khẩu 口 đứng độc lập ghép thành 東口 (cổng Đông).",
        "context": "Hẹn điểm gặp tại ga lớn"
      },
      {
        "id": "ex-kkk-2",
        "japanese": "外国から来た友達と日本の公園を散歩しました。",
        "reading": "がいこくからきたともだちとにほんのこうえんをさんぽしました。",
        "romaji": "Gaikoku kara kita tomodachi to Nihon no kouen o sanpo shimashita.",
        "vietnamese": "Tôi đã cùng bạn đến từ nước ngoài đi dạo công viên Nhật Bản.",
        "explanation": "Chữ Quốc 国 và chữ Viên 園 đều chứa bộ Vi 囗 bao bên ngoài.",
        "context": "Đón tiếp bạn bè quốc tế"
      },
      {
        "id": "ex-kkk-3",
        "japanese": "この道をまっすぐ行くと、大きな交差点に出ます。",
        "reading": "このみちをまっすぐいくと、おおきなこうさてんにでます。",
        "romaji": "Kono michi o massugu iku to, ookina kousaten ni demasu.",
        "vietnamese": "Đi thẳng con đường này bạn sẽ ra một ngã tư lớn.",
        "explanation": "出口 (cửa ra) dùng chữ Khẩu 口.",
        "context": "Chỉ đường đi bộ"
      }
    ],
    "notes": [
      "Bộ Khẩu 口 khi ghép bên trái thường liên quan đến lời nói, ăn uống: 味 (vị), 吸 (hút), 呼 (gọi)."
    ],
    "warnings": [
      "Đừng viết nét đáy của bộ Vi trước khi viết nội dung bên trong, nếu không bạn sẽ bị sai hoàn toàn về thứ tự nét."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "bo-thu-kanji-thuong-gap-va-meo-nho",
        "title": "50 Bộ thủ Kanji cốt lõi giúp đoán nghĩa nhanh mọi chữ Hán",
        "reason": "Cách nhận diện bộ bao (Vi) trong 国, 四, 回"
      },
      {
        "category": "vocabulary",
        "slug": "tu-vung-ngu-canh-nha-ga-tau-dien",
        "title": "Hệ thống từ vựng thiết yếu tại ga tàu điện: 改札, 切符, 乗り換え, ホーム",
        "reason": "Chữ Khẩu trong cửa ra vào ga: 改札口, 西口, 東口"
      },
      {
        "category": "kanji",
        "slug": "quy-tac-chuyen-am-han-viet-sang-on-yomi",
        "title": "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
        "reason": "Chuyển âm Hán Việt cho chữ mang bộ Khẩu"
      }
    ]
  },
  {
    "id": "k-hito-iru",
    "slug": "phan-biet-kanji-nhan-va-nhap",
    "categoryId": "kanji",
    "title": "Phân biệt 人 (Nhân - người) và 入 (Nhập - đi vào): Trọng tâm nét phẩy đè lên nét mác",
    "japaneseTitle": "漢字の判別「人」と「入」：筆順と左右のバランス",
    "summary": "Bí quyết phân biệt dứt điểm giữa chữ Nhân 人 (nét trái tựa vào nét phải) và chữ Nhập 入 (nét phải đè lên vươn cao hơn nét trái) tránh nhầm lẫn tai hại.",
    "level": "N5",
    "tags": [
      "Kanji",
      "Chữ Hán dễ nhầm",
      "Bút thuận",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-khi-1",
        "title": "1. So sánh thế đứng của hai nét bút",
        "content": "- 人 (NHÂN - Con người):\n  + NÉT TRÁI VIẾT TRƯỚC VÀ NẰM ĐÈ LÊN TRÊN.\n  + Hình ảnh: Hai con người tựa lưng vào nhau để cùng tồn tại.\n  + Âm Kun: ひと (hito). Âm On: ジン (jin) / ニン (nin).\n- 入 (NHẬP - Đi vào, cho vào):\n  + NÉT PHẢI VƯƠN CAO LÊN ĐỈNH ĐẦU VÀ ĐÈ LÊN NÉT TRÁI.\n  + Hình ảnh: Cửa lều hé mở để người ta bước chân lọt vào trong.\n  + Âm Kun: はいる (hairu - vào), いれる (ireru - cho vào). Âm On: ニュウ (nyuu).",
        "type": "rule"
      },
      {
        "id": "sec-khi-2",
        "title": "2. Từ ghép quan trọng phân biệt",
        "content": "- Chữ 人 (Nhân):\n  + 日本人 (にほんじん - nihonjin): Người Nhật.\n  + 人口 (じんこう - jinkou): Dân số.\n  + 大人 (おとな - otona): Người lớn (cách đọc đặc biệt).\n- Chữ 入 (Nhập):\n  + 入口 (いりぐち - iriguchi): Cửa vào.\n  + 入学 (にゅうがく - nyuugaku): Nhập học, vào trường.\n  + 収入 (しゅうにゅう - shuunyuu): Thu nhập.",
        "type": "pattern"
      },
      {
        "id": "sec-khi-3",
        "title": "3. Mẹo nhớ trực quan",
        "content": "- Nhân: Đầu người cúi về bên trái -> nét trái cao hơn.\n- Nhập: Bước chân vào nhà thì chân phải bước tới trước -> nét phải vươn cao hơn đỉnh đầu.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-khi-1",
        "japanese": "あそこに大勢の人が集まっています。",
        "reading": "あそこにたいぜいのひとがあつまっています。",
        "romaji": "Asoko ni taizei no hito ga atsumatte imasu.",
        "vietnamese": "Đằng kia có rất đông người đang tụ tập.",
        "explanation": "Chữ Nhân 人 chỉ con người.",
        "context": "Quan sát đám đông trên phố"
      },
      {
        "id": "ex-khi-2",
        "japanese": "美術館の入口はこちらです。",
        "reading": "びじゅつかんのいりぐちはこちらです。",
        "romaji": "Bijutsukan no iriguchi wa kochira desu.",
        "vietnamese": "Cửa vào bảo tàng mỹ thuật là hướng này.",
        "explanation": "Chữ Nhập 入 trong 入口 (lối vào).",
        "context": "Tìm đường vào tham quan"
      },
      {
        "id": "ex-khi-3",
        "japanese": "来年、日本の大学に入学したいです。",
        "reading": "らいねん、にほんのだいがくににゅうがくしたいです。",
        "romaji": "Rainen, Nihon no daigaku ni nyuugaku shitai desu.",
        "vietnamese": "Sang năm tôi muốn nhập học vào một trường đại học của Nhật.",
        "explanation": "Chữ Nhập 入 trong 入学 (nhập học).",
        "context": "Chia sẻ nguyện vọng du học"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "入口 (Lối vào - 入)",
          "nuance": "入口 là chữ Nhập 入 (nét phải đè lên cao). 人口 là chữ Nhân 人 (nét trái đè lên). Viết nhầm sẽ biến 'lối vào' thành 'dân số'!",
          "example": "入口 (Lối vào - 入)",
          "exampleTranslation": "人口 (Dân số - 人)",
          "caution": "入口 là chữ Nhập 入 (nét phải đè lên cao). 人口 là chữ Nhân 人 (nét trái đè lên). Viết nhầm sẽ biến 'lối vào' thành 'dân số'!"
        }
      ],
      "summary": "入口 là chữ Nhập 入 (nét phải đè lên cao). 人口 là chữ Nhân 人 (nét trái đè lên). Viết nhầm sẽ biến 'lối vào' thành 'dân số'!"
    },
    "notes": [
      "Bộ Nhân đứng (亻) khi ghép vào chữ khác xuất hiện trong vô số chữ như: 休 (nghỉ), 体 (thân thể), 作 (làm)."
    ],
    "warnings": [
      "Lỗi sai kinh điển: Rất nhiều học viên viết nhầm chữ 入口 (iriguchi) thành 人口 (jinkou)."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "chu-han-nhom-con-nguoi-gia-dinh",
        "title": "Chữ Hán nhóm Con người & Gia đình: 父, 母, 兄, 弟, 姉, 妹, 男, 女, 子",
        "reason": "Nhóm chữ Hán về con người mang chữ Nhân"
      },
      {
        "category": "vocabulary",
        "slug": "tu-vung-trai-nghia-khong-gian-vi-tri",
        "title": "Cặp từ trái nghĩa vị trí không gian: 上/下, 前/後, 入る/出る",
        "reason": "Cặp từ trái nghĩa 入る (vào) và 出る (ra)"
      },
      {
        "category": "kanji",
        "slug": "bo-thu-kanji-thuong-gap-va-meo-nho",
        "title": "50 Bộ thủ Kanji cốt lõi giúp đoán nghĩa nhanh mọi chữ Hán",
        "reason": "Bộ Nhân đứng (亻) và ứng dụng đoán nghĩa"
      }
    ]
  },
  {
    "id": "k-hi-me",
    "slug": "phan-biet-kanji-nhat-va-muc",
    "categoryId": "kanji",
    "title": "Phân biệt 日 (Nhật - mặt trời/ngày) và 目 (Mục - mắt/mục lục): Nhận diện số lượng nét ngang",
    "japaneseTitle": "漢字の判別「日」と「目」：横線の本数と象形文字の成り立ち",
    "summary": "Tách bạch chữ Nhật 日 (1 nét ngang bên trong, tổng 4 nét) và chữ Mục 目 (2 nét ngang bên trong, tổng 5 nét) dựa trên nguồn gốc tượng hình mắt và mặt trời.",
    "level": "N5",
    "tags": [
      "Kanji",
      "Chữ Hán dễ nhầm",
      "Tượng hình",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-khm-1",
        "title": "1. Nguồn gốc tượng hình và Số nét",
        "content": "- 日 (NHẬT - Mặt trời, Ngày, Nước Nhật):\n  + Tượng hình vầng thái dương tròn trĩnh có một điểm đen ở giữa.\n  + Số nét: Đúng 4 NÉT (bên trong chỉ có DUY NHẤT 1 NÉT NGANG).\n  + Âm Kun: ひ (hi) / か (ka). Âm On: ニチ (nichi) / ジツ (jitsu).\n- 目 (MỤC - Con mắt, Mục lục, Thứ tự):\n  + Tượng hình con ngươi mắt người mở to với tròng mắt.\n  + Số nét: Đúng 5 NÉT (bên trong có ĐỦ 2 NÉT NGANG).\n  + Âm Kun: め (me). Âm On: モク (moku) / ボク (boku).",
        "type": "rule"
      },
      {
        "id": "sec-khm-2",
        "title": "2. Từ vựng và Biến âm quan trọng",
        "content": "- Chữ 日 (Nhật):\n  + 今日 (きょう - kyou): Hôm nay.\n  + 日曜日 (にちようび - nichiyoubi): Chủ Nhật (chữ Nhật xuất hiện ở cả đầu và cuối từ).\n  + 毎日 (まいにち - mainichi): Mỗi ngày.\n- Chữ 目 (Mục):\n  + 目 (め - me): Mắt.\n  + 目的 (もくてき - mokuteki): Mục đích.\n  + 目次 (もくじ - mokuji): Mục lục cuốn sách.\n  + 一番目 (いちばんめ - ichibanme): Thứ nhất (chỉ thứ tự).",
        "type": "pattern"
      },
      {
        "id": "sec-khm-3",
        "title": "3. Chữ ghép và Bộ thủ phái sinh",
        "content": "- Bộ Nhật 日 xuất hiện trong các chữ liên quan đến thời gian và ánh sáng: 明 (sáng), 早 (sớm), 春 (mùa xuân).\n- Bộ Mục 目 xuất hiện trong các chữ liên quan đến thị giác: 看 (nhìn - trong 看護師 y tá), 眠 (ngủ), 視 (thị lực).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-khm-1",
        "japanese": "毎日日本語の勉強を続けています。",
        "reading": "まいにちにほんごのべんきょうをつづけています。",
        "romaji": "Mainichi nihongo no benkyou o tsuzukete imasu.",
        "vietnamese": "Mỗi ngày tôi đều kiên trì học tiếng Nhật.",
        "explanation": "Chữ Nhật 日 trong 毎日 (mỗi ngày - 1 nét ngang trong).",
        "context": "Kể về thói quen học tập"
      },
      {
        "id": "ex-khm-2",
        "japanese": "パソコンを使いすぎて、目が疲れました。",
        "reading": "パソコンをつかいすぎて、めがつかれました。",
        "romaji": "Pasokon o tsukaisugite, me ga tsukaremashita.",
        "vietnamese": "Dùng máy tính quá nhiều nên mắt tôi bị mỏi.",
        "explanation": "Chữ Mục 目 chỉ đôi mắt (2 nét ngang trong).",
        "context": "Than thở mỏi mắt sau giờ làm việc"
      },
      {
        "id": "ex-khm-3",
        "japanese": "日本へ留学する目的は何ですか。",
        "reading": "にほんへりゅうがくするもくてきはなんですか。",
        "romaji": "Nihon e ryuugaku suru mokuteki wa nan desu ka.",
        "vietnamese": "Mục đích bạn đi du học Nhật Bản là gì?",
        "explanation": "Chữ Mục 目 trong 目的 (mục đích).",
        "context": "Phỏng vấn xin visa du học"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "日 (Nhật - 4 nét)",
          "nuance": "Mặt trời (日) chỉ có 1 đường chân trời ở giữa. Mắt người (目) có 2 mí mắt trên dưới.",
          "example": "日 (Nhật - 4 nét)",
          "exampleTranslation": "目 (Mục - 5 nét)",
          "caution": "Mặt trời (日) chỉ có 1 đường chân trời ở giữa. Mắt người (目) có 2 mí mắt trên dưới."
        }
      ],
      "summary": "Mặt trời (日) chỉ có 1 đường chân trời ở giữa. Mắt người (目) có 2 mí mắt trên dưới."
    },
    "notes": [
      "Đừng viết vội vàng biến 1 nét ngang thành 2 nét ngang làm đảo lộn ý nghĩa bài tập viết."
    ],
    "warnings": [
      "Từ 'Chủ Nhật' 日曜日 có 2 chữ Nhật phát âm hoàn toàn khác nhau: chữ đầu đọc là nichi, chữ cuối đọc là bi."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "chu-han-nhom-thoi-gian",
        "title": "Chữ Hán nhóm Thời gian: 年, 月, 日, 時, 分, 今, 間 và các biến âm đặc biệt",
        "reason": "Chữ Nhật trong các mốc thời gian: 今日, 毎日, 日曜日"
      },
      {
        "category": "vocabulary",
        "slug": "phan-biet-miru-kan-mieru-miseru",
        "title": "Phân biệt nhóm động từ thị giác: 見る vs 観る vs 見える vs 見せる",
        "reason": "Chữ Mục trong các động từ thị giác"
      },
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-dai-thai-khuyen",
        "title": "Phân biệt bộ ba chữ tương đồng: 大 (Đại), 太 (Thái) và 犬 (Khuyển)",
        "reason": "Các chữ Hán chỉ khác nhau một chi tiết nét nhỏ"
      }
    ]
  },
  {
    "id": "k-dai-tai-inu",
    "slug": "phan-biet-kanji-dai-thai-khuyen",
    "categoryId": "kanji",
    "title": "Phân biệt bộ ba chữ tương đồng: 大 (Đại - to lớn), 太 (Thái - béo/dày) và 犬 (Khuyển - con chó)",
    "japaneseTitle": "漢字の判別「大」「太」「犬」：点の位置で激変する意味",
    "summary": "Vị trí một dấu chấm nhỏ quyết định số phận chữ viết: Không có chấm là 大 (to lớn), chấm ở dưới háng là 太 (béo/dày), chấm ở trên vai phải là 犬 (con chó).",
    "level": "N5",
    "tags": [
      "Kanji",
      "Chữ Hán dễ nhầm",
      "Vị trí dấu chấm",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-dti-1",
        "title": "1. So sánh trực quan vị trí dấu chấm",
        "content": "- 大 (ĐẠI - To lớn):\n  + KHÔNG CÓ DẤU CHẤM NÀO.\n  + Tượng hình người dang rộng cả hai tay hai chân để thể hiện sự to lớn vĩ đại.\n  + Âm Kun: おおきい (ookii). Âm On: ダイ (dai) / タイ (tai).\n- 太 (THÁI - Mập mạp, Dày, To béo):\n  + DẤU CHẤM NẰM Ở GIỮA HAI CHÂN PHÍA DƯỚI.\n  + Gợi ý: Người quá béo mập đến mức có thêm phần mỡ thừa rơi ở dưới.\n  + Âm Kun: ふとい (futoi). Âm On: タイ (tai).\n- 犬 (KHUYỂN - Con chó):\n  + DẤU CHẤM NẰM Ở TRÊN VAI PHẢI PHÍA TRÊN.\n  + Gợi ý: Con chó có chiếc đuôi vẫy mừng cong tít ở phía trên lưng.\n  + Âm Kun: いぬ (inu). Âm On: ケン (ken).",
        "type": "rule"
      },
      {
        "id": "sec-dti-2",
        "title": "2. Từ vựng ứng dụng phổ biến",
        "content": "- Chữ 大: 大学 (だいがく - đại học), 大変 (たいへん - vất vả), 大切 (たいせつ - quan trọng).\n- Chữ 太: 太陽 (たいよう - mặt trời), 太る (ふとる - tăng cân/béo lên), 太い (ふとい - sợi to/dày).\n- Chữ 犬: 子犬 (こいぬ - cún con), 盲導犬 (もうどうけん - chó dẫn đường cho người khiếm thị).",
        "type": "pattern"
      },
      {
        "id": "sec-dti-3",
        "title": "3. Mẹo nhớ nhanh không bao giờ nhầm",
        "content": "- Không chấm -> Đại (người lớn).\n- Chấm dưới bụng/háng -> Thái (bụng mỡ phệ, béo tốt).\n- Chấm trên lưng -> Khuyển (chó vẫy đuôi).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-dti-1",
        "japanese": "大学で経済学を勉強しています。",
        "reading": "だいがくでけいざいがくをべんきょうしています。",
        "romaji": "Daigaku de keizaigaku o benkyou shite imasu.",
        "vietnamese": "Tôi đang học chuyên ngành kinh tế học ở trường đại học.",
        "explanation": "Chữ Đại 大 (không có dấu chấm) trong 大学.",
        "context": "Giới thiệu việc học đại học"
      },
      {
        "id": "ex-dti-2",
        "japanese": "最近食べすぎて、少し太ってしまいました。",
        "reading": "さいきんたべすぎて、すこしふとってしまいました。",
        "romaji": "Saikin tabesugite, sukoshi futotte shimaimashita.",
        "vietnamese": "Dạo gần đây ăn nhiều quá nên tôi đã bị tăng cân một chút.",
        "explanation": "Chữ Thái 太 (dấu chấm ở dưới) trong 太る (tăng cân).",
        "context": "Tâm sự về cân nặng"
      },
      {
        "id": "ex-dti-3",
        "japanese": "公園で可愛い子犬を散歩させている人がいました。",
        "reading": "こうえんでかわいいこいぬをさんぽさせているひとがいました。",
        "romaji": "Kouen de kawaii koinu o sanpo sasete iru hito ga imashita.",
        "vietnamese": "Ở công viên có người đang dắt chú cún con đáng yêu đi dạo.",
        "explanation": "Chữ Khuyển 犬 (dấu chấm trên vai phải) trong 子犬.",
        "context": "Kể chuyện nhìn thấy cún con"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "大 (Đại - 0 chấm)",
          "nuance": "Đại là to lớn thông thường. Thái là mập mạp béo tốt hoặc vĩ đại mặt trời (太陽). Chấm trên vai là con chó (犬).",
          "example": "大 (Đại - 0 chấm)",
          "exampleTranslation": "太 (Thái - chấm dưới)",
          "caution": "Đại là to lớn thông thường. Thái là mập mạp béo tốt hoặc vĩ đại mặt trời (太陽). Chấm trên vai là con chó (犬)."
        }
      ],
      "summary": "Đại là to lớn thông thường. Thái là mập mạp béo tốt hoặc vĩ đại mặt trời (太陽). Chấm trên vai là con chó (犬)."
    },
    "notes": [
      "Bộ Khuyển khi làm bộ thủ bên trái biến đổi thành bộ Cẩu (犭) trong các chữ chỉ động vật: 猫 (mèo), 猿 (khỉ), 猪 (heo rừng)."
    ],
    "warnings": [
      "Viết chữ Khuyển 犬 mà quên dấu chấm trên vai sẽ biến con chó thành người khổng lồ 大!"
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "phan-biet-ookii-ookina-chiisai-chiisana",
        "title": "Phân biệt 大きい / 大きな và 小さい / 小さな: Tính từ đuôi -i vs Liên thể từ",
        "reason": "Chữ Đại trong tính từ 大きい"
      },
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-vuong-va-ngoc",
        "title": "Phân biệt 王 (Vương - vua) và 玉 (Ngọc - viên ngọc/trứng)",
        "reason": "Quy tắc vị trí dấu chấm biến đổi ý nghĩa chữ Hán"
      },
      {
        "category": "kanji",
        "slug": "phuong-phap-hoc-kanji-theo-bo-thu-va-tu-ghep",
        "title": "Phương pháp học Kanji theo bộ thủ + từ ghép (Jukugo) thay vì học chữ riêng lẻ",
        "reason": "Học từ ghép tiêu biểu: 大学, 太い, 番犬"
      }
    ]
  },
  {
    "id": "k-sen-kan",
    "slug": "phan-biet-kanji-thien-va-can",
    "categoryId": "kanji",
    "title": "Phân biệt 千 (Thiên - một nghìn) và 干 (Can - làm khô/can thiệp): Nét phẩy nghiêng vs Nét ngang thẳng",
    "japaneseTitle": "漢字の判別「千」と「干」：斜め払いか真横の一文字か",
    "summary": "Chỉ một góc nghiêng của nét trên cùng sẽ phân định giữa số một nghìn 千 (nét phẩy nghiêng) và hành động phơi khô 干 (nét ngang hoàn toàn phẳng).",
    "level": "N5",
    "tags": [
      "Kanji",
      "Chữ Hán dễ nhầm",
      "Nét bút",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ksk-1",
        "title": "1. Nét phẩy nghiêng vs Nét ngang nằm",
        "content": "- 千 (THIÊN - 1.000 / Một nghìn):\n  + NÉT ĐẦU TIÊN LÀ NÉT PHẨY NGHIÊNG (chếch từ phải qua trái).\n  + Âm Kun: ち (chi). Âm On: セン (sen).\n  + Ví dụ: 三千 (さんぜん - 3.000, có biến âm), 千葉 (ちば - tỉnh Chiba).\n- 干 (CAN - Phơi khô, Cạn kiệt, Can thiệp):\n  + NÉT ĐẦU TIÊN LÀ NÉT NGANG HOÀN TOÀN THẲNG HÀNG (từ trái qua phải).\n  + Âm Kun: ほす (hosu - phơi khô), ひる (hiru - nước cạn).\n  + Âm On: カン (kan).",
        "type": "rule"
      },
      {
        "id": "sec-ksk-2",
        "title": "2. Từ vựng đời sống của chữ 干 (Can)",
        "content": "- 洗濯物を干す (せんたくものをほす - sentakumono o hosu): Phơi quần áo sau khi giặt.\n- 干物 (ひもの - himono): Cá khô phơi một nắng (món ăn truyền thống Nhật Bản).\n- 若干 (じゃっかん - jakkan): Một chút, đôi chút.\n- 干渉 (かんしょう - kanshou): Can thiệp vào chuyện người khác.",
        "type": "pattern"
      },
      {
        "id": "sec-ksk-3",
        "title": "3. Mẹo nhớ",
        "content": "- 'Gió thổi nghiêng rạp' -> nét nghiêng là một nghìn (千) tờ tiền bay lượn.\n- 'Thanh sào phơi đồ phẳng lì' -> nét ngang thẳng là phơi khô đồ (干).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-ksk-1",
        "japanese": "このシャツは三千円でした。",
        "reading": "このシャツはさんぜんえんでした。",
        "romaji": "Kono shatsu wa sanzen'en deshita.",
        "vietnamese": "Chiếc áo sơ mi này có giá 3.000 yên.",
        "explanation": "Chữ Thiên 千 trong số tiền 3.000 yên (nét đầu nghiêng).",
        "context": "Kể về giá món đồ vừa mua"
      },
      {
        "id": "ex-ksk-2",
        "japanese": "天気がいいので、ベランダに洗濯物を干しました。",
        "reading": "てんきがいいので、ベランダにせんたくものをほしました。",
        "romaji": "Tenki ga ii node, beranda ni sentakumono o hoshimashita.",
        "vietnamese": "Thời tiết đẹp nên tôi đã phơi quần áo ra ban công.",
        "explanation": "Chữ Can 干 trong 干す (phơi đồ - nét đầu ngang thẳng).",
        "context": "Làm việc nhà buổi sáng"
      },
      {
        "id": "ex-ksk-3",
        "japanese": "朝食に美味しいアジの干物を食べました。",
        "reading": "ちょうしょくにおいしいアジのひものをたべました。",
        "romaji": "Choushoku ni oishii aji no himono o tabemashita.",
        "vietnamese": "Vào bữa sáng tôi đã ăn món cá khô nướng rất ngon.",
        "explanation": "干物 (cá khô) dùng chữ 干.",
        "context": "Kể về bữa sáng kiểu Nhật"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "千 (Thiên - nét nghiêng)",
          "nuance": "Chữ 千 nét đầu tiên chém nghiêng từ trên phải xuống trái. Chữ 干 nét đầu tiên kéo ngang phẳng lì từ trái qua phải.",
          "example": "千 (Thiên - nét nghiêng)",
          "exampleTranslation": "干 (Can - nét ngang)",
          "caution": "Chữ 千 nét đầu tiên chém nghiêng từ trên phải xuống trái. Chữ 干 nét đầu tiên kéo ngang phẳng lì từ trái qua phải."
        }
      ],
      "summary": "Chữ 千 nét đầu tiên chém nghiêng từ trên phải xuống trái. Chữ 干 nét đầu tiên kéo ngang phẳng lì từ trái qua phải."
    },
    "notes": [
      "Bộ Can 干 cũng đóng vai trò là một bộ thủ trong hệ thống 214 bộ thủ Khang Hy."
    ],
    "warnings": [
      "Đừng viết ẩu nét ngang chữ 干 thành nét nghiêng khi ghi giá tiền, tránh gây tranh cãi về mặt chứng từ hóa đơn."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "mua-hang-hoi-gia-va-thanh-toan",
        "title": "Mẫu câu mua sắm, hỏi giá, thử đồ và thanh toán tại cửa hàng & konbini",
        "reason": "Sử dụng chữ Thiên (千) khi tính tiền hàng nghìn Yên"
      },
      {
        "category": "kanji",
        "slug": "quy-tac-chuyen-am-han-viet-sang-on-yomi",
        "title": "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
        "reason": "Quy tắc âm On của âm đầu Th (Sen) và C (Kan)"
      },
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-tho-va-si",
        "title": "Phân biệt 土 (Đất - Thổ) và 士 (Kẻ sĩ - Sĩ)",
        "reason": "Cẩn trọng góc nghiêng và độ dài nét trong chữ Hán"
      }
    ]
  },
  {
    "id": "k-ou-gyoku",
    "slug": "phan-biet-kanji-vuong-va-ngoc",
    "categoryId": "kanji",
    "title": "Phân biệt 王 (Vương - vua) và 玉 (Ngọc - viên ngọc/trứng): Mẹo nhớ dấu chấm ngọc bội",
    "japaneseTitle": "漢字の判別「王」と「玉」：王様が身につける宝の点",
    "summary": "Giải mã sự tương đồng thú vị giữa chữ Vương 王 (Vua đứng cai quản tam giới) và chữ Ngọc 玉 (vị vua đeo thêm viên ngọc quý bên thắt lưng).",
    "level": "N5",
    "tags": [
      "Kanji",
      "Chữ Hán dễ nhầm",
      "Vị trí dấu chấm",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-kog-1",
        "title": "1. Cấu trúc chữ Vương 王 vs chữ Ngọc 玉",
        "content": "- 王 (VƯƠNG - Vua chúa):\n  + Ba nét ngang tượng trưng cho Trời, Đất, Con người (Thiên - Địa - Nhân). Nét sổ dọc ở giữa kết nối cả ba lại với nhau -> Người đứng đầu thiên hạ, Vua.\n  + Số nét: Đúng 4 nét, KHÔNG CÓ DẤU CHẤM.\n  + Âm On: オウ (ou).\n- 玉 (NGỌC - Viên ngọc, Đá quý, Tròn):\n  + Chữ Vương có THÊM MỘT DẤU CHẤM ở góc dưới bên phải.\n  + Ý nghĩa: Vị vua đeo viên ngọc bội quý giá bên người.\n  + Âm Kun: たま (tama). Âm On: ギョク (gyoku).",
        "type": "rule"
      },
      {
        "id": "sec-kog-2",
        "title": "2. Từ vựng đời sống thường gặp",
        "content": "- Chữ 王 (Vương):\n  + 王様 (おうさま - ousama): Đức vua.\n  + 国王 (こくおう - kokuou): Quốc vương.\n  + 女王 (じょおう - joou): Nữ hoàng.\n- Chữ 玉 (Ngọc):\n  + お年玉 (おとしだま - otoshidama): Tiền mừng tuổi lì xì đầu năm.\n  + 玉ねぎ (たまねぎ - tamanegi): Củ hành tây (củ tròn như ngọc).\n  + 目玉 (めだま - medama): Nhãn cầu con mắt / 目玉商品 (món hàng giảm giá đinh của cửa hàng).\n  + 水玉 (みずたま - mizutama): Họa tiết chấm bi (giọt nước tròn).",
        "type": "pattern"
      },
      {
        "id": "sec-kog-3",
        "title": "3. Mẹo nhớ nhanh",
        "content": "Vua (王) khi đeo thêm viên ngọc quý (chấm) vào người thì thành chữ Ngọc (玉).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-kog-1",
        "japanese": "昔々、ある国に優しい王様が住んでいました。",
        "reading": "むかしむかし、あるくににやさしいおうさまがすんでいました。",
        "romaji": "Mukashimukashi, aru kuni ni yasashii ousama ga sunde imashita.",
        "vietnamese": "Ngày xửa ngày xưa, ở một vương quốc nọ có một vị vua nhân từ sinh sống.",
        "explanation": "Chữ Vương 王 trong 王様 (đức vua).",
        "context": "Mở đầu câu chuyện cổ tích"
      },
      {
        "id": "ex-kog-2",
        "japanese": "お正月には子供たちにお年玉をあげます。",
        "reading": "おしょうがつにはこどもたちにおとしだまをあげます。",
        "romaji": "Oshougatsu ni wa kodomotachi ni otoshidama o agemasu.",
        "vietnamese": "Vào dịp Tết, người ta thường tặng tiền lì xì cho trẻ em.",
        "explanation": "Chữ Ngọc 玉 trong お年玉 (tiền mừng tuổi).",
        "context": "Giới thiệu phong tục ngày Tết Nhật Bản"
      },
      {
        "id": "ex-kog-3",
        "japanese": "スーパーで玉ねぎと牛肉を買いました。",
        "reading": "スーパーでたまねぎとぎゅうにくをかいました。",
        "romaji": "Suupaa de tamanegi to gyuuniku o kaimashita.",
        "vietnamese": "Tôi đã mua hành tây và thịt bò ở siêu thị.",
        "explanation": "玉ねぎ (hành tây) dùng chữ Ngọc 玉.",
        "context": "Đi chợ mua đồ nấu ăn"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "王様 (Vương - 王)",
          "nuance": "Chữ Vương không có dấu chấm. Chữ Ngọc có thêm dấu chấm ngọc bội ở góc dưới bên phải.",
          "example": "王様 (Vương - 王)",
          "exampleTranslation": "お年玉 (Ngọc - 玉)",
          "caution": "Chữ Vương không có dấu chấm. Chữ Ngọc có thêm dấu chấm ngọc bội ở góc dưới bên phải."
        }
      ],
      "summary": "Chữ Vương không có dấu chấm. Chữ Ngọc có thêm dấu chấm ngọc bội ở góc dưới bên phải."
    },
    "notes": [
      "Bộ Vương 王 khi ghép bên trái các chữ khác thường giữ nguyên nghĩa là Ngọc (đá quý): 珠 (châu ngọc), 現 (hiện thực - ban đầu là mài giũa ngọc), 理 (lý lẽ - vân ngọc)."
    ],
    "warnings": [
      "Không viết dấu chấm của chữ 玉 vọt ra ngoài nét ngang đáy."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-dai-thai-khuyen",
        "title": "Phân biệt bộ ba chữ tương đồng: 大 (Đại), 太 (Thái) và 犬 (Khuyển)",
        "reason": "Nhận diện tầm quan trọng của dấu chấm trong Kanji"
      },
      {
        "category": "kanji",
        "slug": "bo-thu-kanji-thuong-gap-va-meo-nho",
        "title": "50 Bộ thủ Kanji cốt lõi giúp đoán nghĩa nhanh mọi chữ Hán",
        "reason": "Bộ Vương và bộ Ngọc trong các chữ liên quan đến đá quý"
      },
      {
        "category": "conversation",
        "slug": "mua-hang-hoi-gia-va-thanh-toan",
        "title": "Mẫu câu mua sắm, hỏi giá, thử đồ và thanh toán tại cửa hàng & konbini",
        "reason": "Từ vựng 玉ねぎ hay 目玉商品 khi mua sắm"
      }
    ]
  },
  {
    "id": "k-kanji-thoi-gian",
    "slug": "chu-han-nhom-thoi-gian",
    "categoryId": "kanji",
    "title": "Chữ Hán nhóm Thời gian: 年, 月, 日, 時, 分, 今, 間 và các biến âm đặc biệt cần nhớ",
    "japaneseTitle": "時間を表す基本漢字：年・月・日・時・分・今・間と音便",
    "summary": "Làm chủ trọn bộ chữ Hán chỉ thời gian, cách phối hợp âm On/Kun và các trường hợp biến âm ngoại lệ khó chịu nhất (Hatsuon, Sokuon) trong tiếng Nhật N5.",
    "level": "N5",
    "tags": [
      "Kanji",
      "Nhóm chủ đề",
      "Thời gian",
      "Biến âm",
      "N5"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ktg-1",
        "title": "1. Bộ 7 chữ Hán cốt lõi nhóm Thời gian",
        "content": "- 年 (NIÊN - Năm): とし (toshi) / ネン (nen).\n- 月 (NGUYỆT - Tháng, Mặt trăng): つき (tsuki) / ゲツ (getsu) / ガツ (gatsu).\n- 日 (NHẬT - Ngày, Mặt trời): ひ (hi) / ニチ (nichi) / ジツ (jitsu) / か (ka).\n- 時 (THỜI - Giờ, Thời gian): とき (toki) / ジ (ji).\n- 分 (PHÂN - Phút, Phần, Hiểu): わ・かる (wakaru) / フン (fun) / プン (pun) / ブン (bun).\n- 今 (KIM - Bây giờ, Hiện tại): いま (ima) / コン (kon).\n- 間 (GIAN - Khoảng giữa, Khoảng thời gian): あいだ (aida) / カン (kan).",
        "type": "rule"
      },
      {
        "id": "sec-ktg-2",
        "title": "2. Ma trận biến âm đếm Ngày trong tháng (1 đến 10)",
        "content": "Các ngày đầu tháng dùng âm Kun cổ kết hợp biến âm:\n- 1日: ついたち (tsuitachi - ngoại lệ tuyệt đối).\n- 2日: ふつか (futsuka).\n- 3日: みっか (mikka).\n- 4日: よっか (yokka).\n- 5日: いつか (itsuka).\n- 6日: むいか (muika).\n- 7日: なのか (nanoka).\n- 8日: ようか (youka).\n- 9日: ここのか (kokonoka).\n- 10日: とおか (tooka).\n- 14日: じゅうよっか (juuyokka) / 20日: はつか (hatsuka) / 24日: にじゅうよっか (nijuuyokka).",
        "type": "pattern"
      },
      {
        "id": "sec-ktg-3",
        "title": "3. Biến âm khi đếm Phút (分 - Fun vs Pun)",
        "content": "Đi sau các số 1, 3, 4, 6, 8, 10 thì 分 bị biến âm thành âm ngắt + ぷん (pun):\n- 1分: いっぷん (ippun).\n- 3分: さんぷん (sanpun).\n- 4分: よんぷん (yonpun).\n- 6分: ろっぷん (roppun).\n- 8分: はっぷん (happun).\n- 10分: じゅっぷん / じっぷん (juppun / jippun).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-ktg-1",
        "japanese": "今、何時何分ですか。— ちょうど3時15分です。",
        "reading": "いま、なんじなんぷんですか。— ちょうどさんじじゅうごふんです。",
        "romaji": "Ima, nanji nanpun desu ka. — Choudo sanji juugofun desu.",
        "vietnamese": "Bây giờ là mấy giờ mấy phút? — Đúng 3 giờ 15 phút.",
        "explanation": "Phối hợp 今, 時, 分 trong hỏi và đáp giờ giấc.",
        "context": "Hỏi giờ trên đường"
      },
      {
        "id": "ex-ktg-2",
        "japanese": "来週の月曜日は4月20日です。",
        "reading": "らいしゅうのげつようびはしがつはつかです。",
        "romaji": "Raishuu no getsuyoubi wa shigatsu hatsuka desu.",
        "vietnamese": "Thứ Hai tuần tới là ngày 20 tháng 4.",
        "explanation": "Tháng 4 đọc là しがつ, ngày 20 đọc là はつか.",
        "context": "Xem lịch trình công tác"
      },
      {
        "id": "ex-ktg-3",
        "japanese": "駅から家まで歩いて10分間かかります。",
        "reading": "えきからいえまであるいてじゅっぷんかんかかります。",
        "romaji": "Eki kara ie made aruite juppunkan kakarimasu.",
        "vietnamese": "Từ nhà ga về nhà tôi mất khoảng thời gian 10 phút đi bộ.",
        "explanation": "10分間 kết hợp 分 và 間 chỉ khoảng thời gian kéo dài.",
        "context": "Mô tả khoảng cách thời gian"
      }
    ],
    "notes": [
      "Chữ 間 khi đứng một mình đọc là あいだ (khoảng giữa hai vật/hai mốc), khi ghép từ đếm thời gian đọc là かん (1時間 - 1 tiếng đồng hồ)."
    ],
    "warnings": [
      "Không đọc tháng 4 là よんがつ (phải đọc là しがつ), không đọc tháng 9 là きゅうがつ (phải đọc là くがつ)."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-nhat-va-muc",
        "title": "Phân biệt 日 (Nhật - mặt trời/ngày) và 目 (Mục - mắt/mục lục)",
        "reason": "Chữ Nhật và các quy tắc ghép thời gian"
      },
      {
        "category": "grammar",
        "slug": "phan-biet-made-va-made-ni",
        "title": "Phân biệt まで (cho tới khi) và までに (hạn chót hoàn thành): Bản chất hành động",
        "reason": "Mẫu câu giới hạn thời gian đi kèm danh từ thời gian"
      },
      {
        "category": "conversation",
        "slug": "cach-dat-lich-hen-va-xac-nhan",
        "title": "Cách đặt lịch hẹn và xác nhận thời gian: Hẹn gặp giáo viên, đặt chỗ dịch vụ",
        "reason": "Ứng dụng từ chỉ thời gian khi hẹn gặp"
      }
    ]
  },
  {
    "id": "k-kanji-con-nguoi",
    "slug": "chu-han-nhom-con-nguoi-gia-dinh",
    "categoryId": "kanji",
    "title": "Chữ Hán nhóm Con người & Gia đình: 父, 母, 兄, 弟, 姉, 妹, 男, 女, 子 và quy tắc xưng hô",
    "japaneseTitle": "人間・家族を表す漢字：父・母・兄弟姉妹・男女と呼称のルール",
    "summary": "Tường tận hệ thống chữ Hán chỉ gia đình thân tộc và quy tắc xưng hô Uchi/Soto: Khi nói về gia đình mình (khiêm tốn) đối chiếu với khi nhắc đến gia đình người khác (tôn kính).",
    "level": "N5",
    "tags": [
      "Kanji",
      "Nhóm chủ đề",
      "Gia đình",
      "Xưng hô",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-kcn-1",
        "title": "1. Bộ chữ Hán Gia đình cốt lõi",
        "content": "- 父 (PHỤ - Cha): ちち (chichi) / フ (fu).\n- 母 (MẪU - Mẹ): はは (haha) / ボ (bo).\n- 兄 (HUYNH - Anh trai): あに (ani) / ケイ (kei) / キョウ (kyou).\n- 弟 (ĐỆ - Em trai): おとうと (otouto) / テイ (tei) / ダイ (dai).\n- 姉 (TỶ - Chị gái): あね (ane) / シ (shi).\n- 妹 (MUỘI - Em gái): いもうと (imouto) / マイ (mai).\n- 男 (NAM - Đàn ông): おとこ (otoko) / ダン (dan) / ナン (nan) - gồm Điền 田 và Lực 力.\n- 女 (NỮ - Phụ nữ): おんな (onna) / ジョ (jo).\n- 子 (TỬ - Con cái, Đứa trẻ): こ (ko) / シ (shi).",
        "type": "rule"
      },
      {
        "id": "sec-kcn-2",
        "title": "2. Quy tắc phân định xưng hô Uchi (Nhà mình) vs Soto (Nhà người khác)",
        "content": "Trong văn hóa Nhật, cách gọi người nhà thay đổi 180 độ tùy theo đối tượng lắng nghe:\n- Bố:\n  + Bố mình (khiêm tốn): 父 (ちち - chichi).\n  + Bố người khác (tôn kính): お父さん (おとうさん - otousan).\n- Mẹ:\n  + Mẹ mình: 母 (はは - haha).\n  + Mẹ người khác: お母さん (おかあさん - okaasan).\n- Anh trai:\n  + Anh mình: 兄 (あに - ani).\n  + Anh người khác: お兄さん (おにいさん - oniisan).\n- Chị gái:\n  + Chị mình: 姉 (あね - ane).\n  + Chị người khác: お姉さん (おねえさん - oneesan).",
        "type": "pattern"
      },
      {
        "id": "sec-kcn-3",
        "title": "3. Các từ ghép gia đình quan trọng",
        "content": "- 家族 (かぞく - kazoku): Gia đình.\n- 兄弟 (きょうだい - kyoudai): Anh em (Huynh Đệ).\n- 姉妹 (しまい - shimai): Chị em gái (Tỷ Muội).\n- 両親 (りょうしん - ryoushin): Cả bố lẫn mẹ (Lưỡng Thân).\n- 親戚 (しんせき - shinseki): Họ hàng thân thuộc.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-kcn-1",
        "japanese": "私の父は高校の英語の教師です。",
        "reading": "わたしのちちはこうこうのえいごのきょうしです。",
        "romaji": "Watashi no chichi wa koukou no eigo no kyoushi desu.",
        "vietnamese": "Bố tôi là giáo viên tiếng Anh tại một trường cấp ba.",
        "explanation": "Nói về bố mình với người ngoài bắt buộc dùng 父 (chichi).",
        "context": "Tự giới thiệu nghề nghiệp gia đình"
      },
      {
        "id": "ex-kcn-2",
        "japanese": "田中さんのお父さんはとても背が高いですね。",
        "reading": "たなかさんのおとうさんはとてもせがたかいですね。",
        "romaji": "Tanaka-san no otousan wa totemo se ga takai desu ne.",
        "vietnamese": "Bác trai thân phụ của bạn Tanaka cao ráo thật đấy nhỉ.",
        "explanation": "Nói về bố người khác tôn trọng dùng お父さん.",
        "context": "Khen ngợi thân phụ bạn bè"
      },
      {
        "id": "ex-kcn-3",
        "japanese": "私は三人兄弟で、兄と妹がいます。",
        "reading": "わたしはさんにんきょうだいで、あにといもうとがいます。",
        "romaji": "Watashi wa sannin kyoudai de, ani to imouto ga imasu.",
        "vietnamese": "Nhà tôi có 3 anh em, tôi có một anh trai và một em gái.",
        "explanation": "Sử dụng 兄弟, 兄 và 妹 để miêu tả cơ cấu gia đình.",
        "context": "Trò chuyện thân mật về gia đình"
      }
    ],
    "notes": [
      "Chữ Nam 男 được tạo nên từ bộ Điền 田 (ruộng đồng) ở trên và bộ Lực 力 (sức mạnh) ở dưới: Người đàn ông dùng sức cày ruộng."
    ],
    "warnings": [
      "Không bao giờ gọi bố mình trước mặt sếp hay khách hàng là 'お父さん' (bị coi là trẻ con và thiếu khiêm nhường)."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "phan-biet-kanji-nhan-va-nhap",
        "title": "Phân biệt 人 (Nhân - người) và 入 (Nhập - đi vào)",
        "reason": "Chữ Nhân và bộ Nhân đứng trong Kanji chỉ người"
      },
      {
        "category": "conversation",
        "slug": "tu-gioi-thieu-ban-than-jikoshoukai",
        "title": "Nghệ thuật tự giới thiệu bản thân (Jikoshoukai) ấn tượng và đúng mực",
        "reason": "Cách giới thiệu thành viên gia đình khiêm tốn"
      },
      {
        "category": "notes",
        "slug": "van-hoa-uchi-va-soto-trong-ngon-ngu",
        "title": "Khái niệm Uchi (Bên trong) và Soto (Bên ngoài): Chìa khóa hiểu cách dùng kính ngữ",
        "reason": "Quy ước Uchi/Soto khi xưng hô cha mẹ mình với người ngoài"
      }
    ]
  },
  {
    "id": "k-kanji-chuyen-dong",
    "slug": "chu-han-nhom-chuyen-dong-co-ban",
    "categoryId": "kanji",
    "title": "Chữ Hán nhóm Chuyển động cơ bản: 行, 来, 帰, 出, 入, 歩, 走 và cách phối hợp trợ từ",
    "japaneseTitle": "移動動詞を表す基本漢字：行・来・帰・出・入・歩・走",
    "summary": "Tập hợp 7 chữ Hán hành động chuyển dời không gian cơ bản nhất, cách đọc On/Kun đa dạng và nguyên lý gắn kết trợ từ へ, に, で, を khi di chuyển.",
    "level": "N5",
    "tags": [
      "Kanji",
      "Nhóm chủ đề",
      "Động từ",
      "Chuyển động",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-kcd-1",
        "title": "1. 7 chữ Hán chuyển động cơ bản",
        "content": "- 行 (HÀNH - Đi): い・く (iku) / おこな・う (okonau - tổ chức) / コウ (kou) / ギョウ (gyou).\n- 来 (LAI - Đến): く・る (kuru) / き・ます (kimasu) / こ・ない (konai) / ライ (rai).\n- 帰 (QUY - Trở về): かえ・る (kaeru) / キ (ki).\n- 出 (XUẤT - Đi ra, Cho ra): で・る (deru) / だ・す (dasu) / シュツ (shutsu).\n- 入 (NHẬP - Đi vào): はい・る (hairu) / い・れる (ireru) / ニュウ (nyuu).\n- 歩 (BỘ - Đi bộ): ある・く (aruku) / ホ (ho) / ポ (po).\n- 走 (TẨU - Chạy): はし・る (hashiru) / ソウ (sou).",
        "type": "rule"
      },
      {
        "id": "sec-kcd-2",
        "title": "2. Quy tắc trợ từ chuyển động không gian",
        "content": "- Đích đến chuyển động: Dùng に hoặc へ [Đích + に/へ + 行く/来る/帰る].\n- Điểm xuất phát rời khỏi: Dùng を [Nơi chốn + を出る/降りる].\n- Phương tiện di chuyển: Dùng で [Phương tiện + で行く] (電車で行く - đi bằng tàu điện).\n- Ngoại lệ phương tiện: Đi bộ dùng dạng liên từ [歩いて行く] (KHÔNG dùng 歩きで行く).",
        "type": "pattern"
      },
      {
        "id": "sec-kcd-3",
        "title": "3. Từ ghép chuyển động thường gặp",
        "content": "- 旅行 (りょこう - ryokou): Du lịch.\n- 行事 (ぎょうじ - gyouji): Sự kiện lễ hội.\n- 未来 (みらい - mirai): Tương lai.\n- 来週 (らいしゅう - raishuu): Tuần tới.\n- 帰国 (きこく - kikoku): Về nước.\n- 出発 (しゅっぱつ - shuppatsu): Xuất phát.\n- 散歩 (さんぽ - sanpo): Đi dạo bộ.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-kcd-1",
        "japanese": "毎朝、家から駅まで歩いて行きます。",
        "reading": "まいあさ、いえからえきまであるいていきます。",
        "romaji": "Maiasa, ie kara eki made aruite ikimasu.",
        "vietnamese": "Mỗi sáng, tôi đều đi bộ từ nhà đến nhà ga.",
        "explanation": "Phối hợp chữ 歩 trong 歩く và chữ 行 trong 行く.",
        "context": "Kể thói quen đi làm hàng ngày"
      },
      {
        "id": "ex-kcd-2",
        "japanese": "来月、ベトナムへ帰国する予定です。",
        "reading": "らいげつ、ベトナムへきこくするよていです。",
        "romaji": "Raigetsu, Betonamu e kikoku suru yotei desu.",
        "vietnamese": "Tháng tới, tôi dự định sẽ về nước Việt Nam.",
        "explanation": "Chữ Quy 帰 trong 帰国 (về nước).",
        "context": "Thông báo kế hoạch về thăm gia đình"
      },
      {
        "id": "ex-kcd-3",
        "japanese": "遅刻しそうだったので、駅まで走りました。",
        "reading": "ちこくしそうだったので、えきまではしりました。",
        "romaji": "Chikoku shisou datta node, eki made hashirimashita.",
        "vietnamese": "Vì sắp bị muộn giờ nên tôi đã chạy thục mạng tới ga.",
        "explanation": "Chữ Tẩu 走 trong 走る (chạy).",
        "context": "Kể lại sự việc vội vã buổi sáng"
      }
    ],
    "notes": [
      "Động từ 来る (kuru) là động từ nhóm 3 bất quy tắc, biến đổi nguyên âm theo từng thể: きます (ki), こない (ko), くる (ku)."
    ],
    "warnings": [
      "Không nói '歩きで行く' (sai ngữ pháp), phải chia sang thể て là '歩いて行く'."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "tro-tu-he-phuong-huong-chuyen-dong",
        "title": "Trợ từ へ (e): Phương hướng chuyển động và sự khác biệt tinh tế với に",
        "reason": "Trợ từ へ và に đi kèm các động từ chuyển động"
      },
      {
        "category": "grammar",
        "slug": "tro-tu-o-dich-tac-dong-va-khong-gian",
        "title": "Trợ từ を (o): Đích tác động của hành động và bẫy không gian chuyển động rời khỏi",
        "reason": "Trợ từ を đi kèm động từ chuyển động không gian"
      },
      {
        "category": "vocabulary",
        "slug": "tu-vung-ngu-canh-nha-ga-tau-dien",
        "title": "Hệ thống từ vựng thiết yếu tại ga tàu điện: 改札, 切符, 乗り換え, ホーム",
        "reason": "Ứng dụng chữ Hán chuyển động trên biển hiệu ga tàu"
      }
    ]
  }
];
