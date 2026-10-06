import { HandbookArticle } from "../types";

export const notesArticles: HandbookArticle[] = [
  {
    "id": "n-bay-dich-thuat",
    "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
    "categoryId": "notes",
    "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
    "japaneseTitle": "ベトナム人学習者が陥りやすい翻訳の罠",
    "summary": "Vạch trần các lỗi tư duy dịch từng từ (word-by-word) từ tiếng Việt: Sự khác biệt tai hại giữa お疲れ様 và ご苦労様, bẫy từ '大丈夫', và bị động bị hại.",
    "level": "ALL",
    "tags": [
      "Kinh nghiệm",
      "Bẫy dịch thuật",
      "Giao tiếp",
      "Văn hóa",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-bd-1",
        "title": "1. Bẫy số 1: お疲れ様です (Otsukaresama) vs ご苦労様です (Gokurousama)",
        "content": "Rất nhiều người học mới sang Nhật chào sếp hoặc khách hàng bằng 'ご苦労様です'. Đây là một sai lầm nghiêm trọng về cấp bậc:\n- ご苦労様 (Gokurousama): Chỉ dành cho người bề trên nói với người bề dưới (sếp nói với nhân viên hoàn thành tốt việc được giao).\n- お疲れ様 (Otsukaresama): Dành cho nhân viên chào sếp, đồng nghiệp chào nhau sau giờ làm việc vất vả.",
        "type": "rule"
      },
      {
        "id": "sec-bd-2",
        "title": "2. Bẫy số 2: Từ '大丈夫' (Daijoubu) trong nhà hàng / cửa hàng tiện lợi",
        "content": "Khi nhân viên hỏi 'レシートは大丈夫ですか？' (Quý khách có cần hóa đơn không?) hoặc 'お水のおかわりは大丈夫ですか？' (Bạn có muốn thêm nước không?):\n- Nếu bạn trả lời '大丈夫です' với nụ cười nhẹ -> Người Nhật hiểu là 'Tôi không cần đâu, tôi ổn rồi (Từ chối khéo)'.\n- Người Việt hay nghĩ 'Đại trượng phu = Ổn = Vâng cứ cho tôi đi', dẫn đến tình huống hiểu nhầm dở khóc dở cười.",
        "type": "pattern"
      },
      {
        "id": "sec-bd-3",
        "title": "3. Bẫy số 3: Thể bị động tiếng Nhật thường mang nghĩa 'Bị hại' (迷惑受け身)",
        "content": "Trong tiếng Việt, 'Tôi được khen' hay 'Tôi bị mắng' đều bình thường. Nhưng trong tiếng Nhật, câu bị động gián tiếp hầu như luôn biểu thị sự phiền phức, bực bội mà chủ thể phải gánh chịu (ví dụ: 雨に降られた - Bị dính mưa xui xẻo). Đừng dịch câu tích cực của tiếng Việt sang thể bị động tiếng Nhật một cách bừa bãi.",
        "type": "text"
      }
    ],
    "examples": [
      {
        "id": "ex-bd-1",
        "japanese": "部長、今日もお疲れ様でした！",
        "reading": "ぶちょう、きょうもおつかれさまでした！",
        "romaji": "Buchou, kyou mo otsukaresama deshita!",
        "vietnamese": "Thưa trưởng phòng, hôm nay anh cũng đã vất vả rồi ạ!",
        "explanation": "Lời chào đúng chuẩn mực của cấp dưới dành cho cấp trên khi tan ca.",
        "context": "Chào tạm biệt ở công sở"
      },
      {
        "id": "ex-bd-2",
        "japanese": "店員: お箸はご利用ですか。\n客: あ、大丈夫です。持っていますので。",
        "reading": "てんいん: おはしはごりようですか。\nきゃく: あ、だいじょうぶです。もっていますので。",
        "romaji": "Ten'in: Ohashi wa goriyou desu ka.\nKyaku: A, daijoubu desu. Motte imasu node.",
        "vietnamese": "Nhân viên: Quý khách có dùng đũa không ạ?\nKhách: À, tôi không cần đâu ạ. Tôi có mang theo sẵn rồi.",
        "explanation": "大丈夫です kết hợp với ngữ cảnh từ chối nhận đồ dùng một lần.",
        "context": "Mua đồ ở konbini"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu câu chào tan làm: お疲れ様 vs ご苦労様",
      "items": [
        {
          "subject": "お疲れ様です (Otsukaresama desu)",
          "nuance": "An toàn tuyệt đối cho mọi mối quan hệ: Dưới nói với Trên, Đồng nghiệp nói với nhau",
          "formula": "Dưới -> Trên / Ngang hàng",
          "example": "先輩、お疲れ様です！",
          "exampleTranslation": "Tiền bối, anh đã vất vả rồi ạ!",
          "caution": "Luôn dùng câu này khi bạn ở vị thế người mới hoặc cấp dưới."
        },
        {
          "subject": "ご苦労様です (Gokurousama desu)",
          "nuance": "Chỉ người bề trên nói với kẻ dưới (như tướng quân khen ngợi lính sau chiến dịch)",
          "formula": "Trên -> Dưới (ĐỘC QUYỀN)",
          "example": "みんな、ご苦労だったね。",
          "exampleTranslation": "Mọi người vất vả rồi, tốt lắm.",
          "caution": "Tuyệt đối không bao giờ nói câu này với cấp trên, sếp, khách hàng hay thầy cô."
        }
      ],
      "summary": "Nếu phân vân không biết dùng từ nào, hãy chọn 100% お疲れ様です."
    },
    "notes": [
      "Tiếng Nhật cực kỳ coi trọng vai vế xã hội (Uchi/Soto, Thượng/Hạ). Hãy luôn đặt mình vào vị thế khiêm tốn trước khi cất lời."
    ],
    "warnings": [
      "Tránh dịch máy móc 'Bạn có khỏe không?' thành 'お元気ですか？' mỗi ngày khi gặp đồng nghiệp. Câu này người Nhật chỉ dùng khi lâu ngày không gặp nhau (vài tuần hoặc vài tháng). Gặp hàng ngày hãy dùng 'おはようございます'."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        "title": "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        "reason": "Học sâu hơn về quy tắc xưng hô công sở"
      },
      {
        "category": "notes",
        "slug": "khi-nao-khong-nen-dich-word-by-word",
        "title": "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        "reason": "Tổng kết các trường hợp dịch word-by-word gây hậu quả nghiêm trọng"
      }
    ]
  },
  {
    "id": "n-hoc-collocation",
    "slug": "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
    "categoryId": "notes",
    "title": "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
    "japaneseTitle": "効果的なコロケーション（連語）学習法",
    "summary": "Bí quyết tối ưu tốc độ ghi nhớ và phản xạ tự nhiên: Gom từ vựng thành từng cụm 'Danh từ + Trợ từ + Động từ' hoàn chỉnh để không bao giờ ghép sai.",
    "level": "ALL",
    "tags": [
      "Kinh nghiệm",
      "Phương pháp học",
      "Collocation",
      "Từ vựng",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cl-1",
        "title": "1. Tại sao học từ đơn lẻ là nguyên nhân khiến bạn nói vấp?",
        "content": "Khi học từ đơn lẻ (ví dụ học từ 'thuốc' là 薬, 'uống' là 飲む, 'ăn' là 食べる), não bạn phải thực hiện 3 bước chậm chạp khi giao tiếp: Tìm danh từ -> Tìm trợ từ -> Tìm động từ. Nếu tiếng Việt nói 'uống thuốc' mà dịch sang tiếng Anh lại là 'take medicine', bạn sẽ phân vân không biết tiếng Nhật dùng động từ nào.",
        "type": "text"
      },
      {
        "id": "sec-cl-2",
        "title": "2. Danh sách Collocation kinh điển bắt buộc thuộc lòng",
        "content": "Hãy nạp vào não bộ nguyên khối cụm từ hoàn chỉnh dưới đây:",
        "type": "table",
        "tableData": {
          "headers": [
            "Cụm từ Collocation",
            "Cách đọc",
            "Ý nghĩa",
            "Điểm cần lưu ý"
          ],
          "rows": [
            [
              "風邪を引く",
              "かぜをひく",
              "Bị cảm cúm",
              "Dùng động từ 引く chứ không dùng なる"
            ],
            [
              "薬を飲む",
              "くすりをのむ",
              "Uống/dùng thuốc",
              "Tiếng Nhật xem thuốc viên/nước đều là 飲む"
            ],
            [
              "夢を見る",
              "ゆめをみる",
              "Nằm mơ thấy...",
              "Mơ là 'nhìn thấy giấc mơ' (見る)"
            ],
            [
              "熱がある / 熱が出る",
              "ねつがある / ねつがでる",
              "Bị sốt / Lên cơn sốt",
              "Trạng thái có sốt (ある) vs Phát sốt (出る)"
            ],
            [
              "帽子をかぶる",
              "ぼうしをかぶる",
              "Đội mũ",
              "Động từ riêng cho đầu/mũ là かぶる"
            ],
            [
              "眼鏡をかける",
              "めがねをかける",
              "Đeo kính",
              "Động từ riêng cho kính mắt là かける"
            ],
            [
              "靴を履く",
              "くつをはく",
              "Đi giày/dép/quần",
              "Mặc từ thắt lưng trở xuống là 履く (はく)"
            ],
            [
              "服を着る",
              "ふくをきる",
              "Mặc áo",
              "Mặc từ cổ đến thân là 着る (きる)"
            ]
          ]
        }
      },
      {
        "id": "sec-cl-3",
        "title": "3. Cách tạo thẻ ghi nhớ Collocation hiệu quả",
        "content": "Mỗi khi học một từ mới, hãy luôn tìm một danh từ hoặc động từ đi cặp thường xuyên nhất của nó. Ví dụ học từ ピアノ (piano) -> Ghi nhớ luôn cụm ピアノを弾く (ひく - chơi đàn piano).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-cl-1",
        "japanese": "昨日から風邪を引いて、熱があります。",
        "reading": "きのうからかぜをひいて、ねつがあります。",
        "romaji": "Kinou kara kaze o hiite, netsu ga arimasu.",
        "vietnamese": "Từ hôm qua tôi đã bị cảm cúm và đang bị sốt.",
        "explanation": "Sử dụng đồng thời 2 cụm collocation chuẩn: 風邪を引く và 熱がある.",
        "context": "Xin nghỉ ốm"
      },
      {
        "id": "ex-cl-2",
        "japanese": "寒いので、帽子をかぶって出かけましょう。",
        "reading": "さむいので、ぼうしをかぶってでかけましょう。",
        "romaji": "Samui node, boushi o kabutte dekakemashou.",
        "vietnamese": "Trời lạnh nên chúng mình hãy đội mũ rồi ra ngoài nhé.",
        "explanation": "Dùng đúng động từ かぶる cho mũ thay vì 着る (mặc quần áo).",
        "context": "Chuẩn bị đi ra ngoài"
      }
    ],
    "comparisons": {
      "title": "Học từ đơn lẻ vs Học theo cụm Collocation",
      "items": [
        {
          "subject": "Học từ đơn lẻ (Chậm chạp & Dễ sai trợ từ)",
          "nuance": "Não phải dịch từng từ và suy nghĩ trợ từ ở giữa mỗi khi nói",
          "formula": "N [nghĩ trợ từ?] + V [nghĩ động từ?]",
          "example": "薬... を? で? 飲む?",
          "exampleTranslation": "Mất 3-5 giây để ghép nối trong đầu.",
          "caution": "Rất dễ mắc lỗi dịch thẳng từ tiếng mẹ đẻ sang."
        },
        {
          "subject": "Học theo Collocation (Phản xạ tức thì)",
          "nuance": "Não lưu trữ như một khối âm thanh duy nhất không thể tách rời",
          "formula": "[Danh từ + Trợ từ + Động từ] = 1 Khối",
          "example": "薬を飲む (Kusuri o nomu)",
          "exampleTranslation": "Bật ra tự nhiên không cần suy nghĩ.",
          "caution": "Luôn chú ý phát âm liền mạch không ngắt giữa chừng."
        }
      ],
      "summary": "Muốn nói tiếng Nhật trôi chảy tự nhiên, hãy biến mọi từ vựng thành cụm Collocation."
    },
    "notes": [
      "Bộ động từ đeo mặc trong tiếng Nhật chia theo bộ phận cơ thể: Đầu (かぶる) - Mắt (かける) - Thân (きる) - Chân (はく) - Cổ/Tay (巻く/つける)."
    ],
    "warnings": [
      "Đừng cố nhồi nhét quá nhiều cụm từ hiếm gặp cùng lúc. Hãy ưu tiên 100 cụm từ gắn liền với thói quen sinh hoạt hàng ngày trước."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "pho-tu-chi-muc-do-thuong-gap",
        "title": "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
        "reason": "Ghép phó từ vào các cụm Collocation để tăng độ biểu cảm"
      },
      {
        "category": "grammar",
        "slug": "phan-biet-tu-dong-tu-va-tha-dong-tu",
        "title": "Bản chất Tự động từ (Jidoushi) & Tha động từ (Tadoushi) kèm cặp từ thông dụng",
        "reason": "Phân biệt trợ từ đi cùng các cụm tự động từ và tha động từ"
      },
      {
        "category": "notes",
        "slug": "nguyen-ly-spaced-repetition-srs-tu-hoc",
        "title": "Nguyên lý Spaced Repetition (SRS): Hiểu đường cong lãng quên và chiến lược tự ôn tập",
        "reason": "Khoa học phân bổ chu kỳ thời gian ôn tập từ vựng"
      }
    ]
  },
  {
    "id": "n-loi-dung-wa-ga",
    "slug": "loi-thuong-gap-khi-dung-wa-va-ga",
    "categoryId": "notes",
    "title": "Trợ từ は và が — Những lỗi tư duy người Việt hay mắc phải nhất và cách sửa",
    "japaneseTitle": "「は」と「が」でよくある誤用パターンと修正法",
    "summary": "Tổng hợp 3 lỗi sai kinh điển người Việt hay gặp khi dùng は và が: Bẫy dịch từ 'thì/là', sai trợ từ trong câu nghi vấn với từ để hỏi, và dùng は trong mệnh đề định ngữ.",
    "level": "ALL",
    "tags": [
      "Ghi chú",
      "Lỗi thường gặp",
      "は",
      "が",
      "Trợ từ",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-lwg-1",
        "title": "1. Lỗi 1: Tự hỏi 'Từ để hỏi' nhưng lại đặt は (Ai đến thế?)",
        "content": "- Câu sai: × だれは来ますか (SAI)\n- Câu đúng: ○ だれが来ますか (ĐÚNG)\nNguyên tắc vàng: Từ để hỏi (誰, 何, どこ) đại diện cho thông tin chưa biết (Unknown info), do đó KHÔNG BAO GIỜ có thể làm chủ đề cũ (Topic - は). Nó bắt buộc phải đi với tiêu điểm が. Tương tự, câu trả lời cũng bắt buộc dùng が: 田中さんが来ます.",
        "type": "rule"
      },
      {
        "id": "sec-lwg-2",
        "title": "2. Lỗi 2: Dùng は trong mệnh đề bổ nghĩa cho danh từ",
        "content": "- Câu sai: × 私 は 買った本は面白いです (SAI)\n- Câu đúng: ○ 私 が 買った本は面白いです (ĐÚNG)\nNguyên tắc: Trong mệnh đề phụ bổ nghĩa (Subordinate Clause), chủ ngữ nhỏ của hành động bổ nghĩa luôn phải hạ xuống đi với が để không tranh chấp với chủ đề lớn của câu chính.",
        "type": "rule"
      },
      {
        "id": "sec-lwg-3",
        "title": "3. Lỗi 3: Dịch máy móc từ 'là' trong tiếng Việt",
        "content": "Trong tiếng Việt, 'Tôi LÀ sinh viên' (là) và 'Hôm nay LÀ chủ nhật' (là). Nhiều bạn nghĩ cứ có 'là' thì điền は. Nhưng trong câu: 'Người đứng đằng kia LÀ ai?', nếu dịch 'あそこに立っている人は誰ですか' thì đúng; nhưng câu 'Ai LÀ người giỏi nhất?' lại phải là '誰が一番上手ですか'.",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-lwg-1",
        "japanese": "A: 誰がケーキを食べましたか。\nB: 私が食べました！",
        "reading": "A: だれがケーキをたべましたか。\nB: わたしがたべました！",
        "romaji": "A: Dare ga keeki o tabemashita ka.\nB: Watashi ga tabemashita!",
        "vietnamese": "A: Ai đã ăn chiếc bánh kem thế?\nB: Chính tôi đã ăn đấy ạ!",
        "explanation": "Cả câu hỏi lẫn câu trả lời cho từ để hỏi đều tuân thủ trợ từ が.",
        "context": "Hỏi và nhận trách nhiệm"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu lỗi sai vs Cách sửa đúng",
      "items": [
        {
          "subject": "Sai: 誰は来ますか",
          "nuance": "Từ để hỏi đi với は phá vỡ logic chủ đề của tiếng Nhật",
          "formula": "Sai: Từ để hỏi + は",
          "example": "× 何は好きですか",
          "exampleTranslation": "Lỗi sai thường thấy ở N5",
          "caution": "Luôn đổi sang が khi chủ ngữ là từ để hỏi."
        },
        {
          "subject": "Đúng: 誰が来ますか",
          "nuance": "Tiêu điểm chỉ định danh tính chính xác",
          "formula": "Đúng: Từ để hỏi + が",
          "example": "○ 何が好きですか",
          "exampleTranslation": "Bạn thích cái gì thế?",
          "caution": "Chuẩn xác 100%."
        }
      ],
      "summary": "Gặp từ để hỏi làm chủ ngữ -> 100% chọn が."
    },
    "notes": [
      "Khi so sánh 2 vế tương phản, luôn dùng は: お酒は飲みませんが、お茶は飲みます (Rượu thì tôi không uống nhưng trà thì tôi uống)."
    ],
    "warnings": [
      "Không bao giờ dùng は trong câu hỏi 'Ai là người...' (Dare wa... là sai tuyệt đối)."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-tro-tu-wa-va-ga",
        "title": "Phân biệt trợ từ は (wa) và が (ga) - Bản chất và ngữ cảnh sử dụng",
        "reason": "Bài viết lý thuyết nền tảng"
      },
      {
        "category": "notes",
        "slug": "khi-nao-khong-nen-dich-word-by-word",
        "title": "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        "reason": "Tránh bẫy dịch từ 'là' sang trợ từ"
      },
      {
        "category": "notes",
        "slug": "bay-tu-duy-luoc-bo-chu-ngu",
        "title": "Bẫy tư duy lược bỏ chủ ngữ: Cách xác định đối tượng hành động qua đuôi câu",
        "reason": "Lược bỏ chủ đề は khi ngữ cảnh đã ngầm hiểu"
      }
    ]
  },
  {
    "id": "n-checklist-ni-de",
    "slug": "checklist-chon-tro-tu-ni-va-de",
    "categoryId": "notes",
    "title": "Checklist 30 giây chọn nhanh trợ từ に hay で không bao giờ nhầm",
    "japaneseTitle": "「に」と「で」の即時判断チェックリスト",
    "summary": "Cẩm nang 3 câu hỏi trắc nghiệm tâm lý giúp bạn quyết định trong 30 giây chọn trợ từ に hay で khi nói về địa điểm, nơi chốn và hoàn cảnh.",
    "level": "N5",
    "tags": [
      "Ghi chú",
      "Checklist",
      "Trợ từ",
      "に",
      "で",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cnd-1",
        "title": "1. Câu hỏi 1: Động từ có phải là 'TỒN TẠI TĨNH' không?",
        "content": "Nếu động từ trong câu là: ある (có - vật), いる (ở - người/động vật), 住む (sống), 座る (ngồi), 泊まる (trọ lại) -> BẮT BUỘC CHỌN に.\nVí dụ: 部屋にいます (Ở trong phòng), ホテルに泊まります (Nghỉ ở khách sạn).",
        "type": "rule"
      },
      {
        "id": "sec-cnd-2",
        "title": "2. Câu hỏi 2: Nơi chốn có phải là 'SÂN KHẤU HÀNH ĐỘNG' không?",
        "content": "Nếu con người thực hiện một hành động tiêu hao năng lượng (Ăn, uống, học, làm việc, tập thể dục, mua sắm) -> BẮT BUỘC CHỌN で.\nVí dụ: レストランで食べます (Ăn ở nhà hàng), 会社で働きます (Làm việc ở công ty).",
        "type": "rule"
      },
      {
        "id": "sec-cnd-3",
        "title": "3. Câu hỏi 3: Trường hợp đặc biệt của sự kiện (Event)",
        "content": "Khi một sự kiện, lễ hội, bữa tiệc diễn ra, dù dùng động từ ある nhưng địa điểm diễn ra BẮT BUỘC DÙNG で:\n- 公園でお祭りがあります (Ở công viên có lễ hội diễn ra).\n- 東京で会議があります (Ở Tokyo diễn ra cuộc họp).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-cnd-1",
        "japanese": "机の上にペンがあります。図書館で本を読みます。",
        "reading": "つくえのうえにペンがあります。としょかんでほんをよみます。",
        "romaji": "Tsukue no ue ni pen ga arimasu. Toshokan de hon o yomimasu.",
        "vietnamese": "Trên bàn có cái bút (に). Tôi đọc sách ở thư viện (で).",
        "explanation": "So sánh trực diện: Tồn tại tĩnh (に) vs Hành động tích cực (で).",
        "context": "Minh họa checklist"
      }
    ],
    "comparisons": {
      "title": "Checklist 30 giây: に vs で",
      "items": [
        {
          "subject": "Trợ từ に (Đích đến / Tĩnh tại)",
          "nuance": "Chỉ vị trí tồn tại, điểm bám đích đến của di chuyển",
          "formula": "Nơi chốn + に + [いる/ある/住む/座る/入る/乗る]",
          "example": "椅子に座る (Ngồi vào ghế)",
          "exampleTranslation": "Isu ni suwaru",
          "caution": "Không dùng に nếu động từ là ăn/học/làm việc."
        },
        {
          "subject": "Trợ từ で (Sân khấu / Công cụ)",
          "nuance": "Nơi diễn ra hành vi, phương tiện công cụ, địa điểm sự kiện",
          "formula": "Nơi chốn + で + [Ăn/Học/Chạy/Làm/Tổ chức sự kiện]",
          "example": "教室で勉強する (Học trong lớp)",
          "exampleTranslation": "Kyoushitsu de benkyou suru",
          "caution": "Sự kiện (party, festival) luôn đi với で."
        }
      ],
      "summary": "Ở đâu có cái gì -> に; Ở đâu làm cái gì / Diễn ra sự kiện gì -> で."
    },
    "notes": [
      "Với phương tiện giao thông: Di chuyển BẰNG phương tiện gì -> で (バスで行く); Bước LÊN phương tiện nào -> に (バスに乗る)."
    ],
    "warnings": [
      "Không nói: '公園にお祭りがあります' (Sai trợ từ khi nói về sự kiện diễn ra)."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-ni-va-de",
        "title": "Phân biệt trợ từ に (ni) và で (de) chỉ nơi chốn & thời gian",
        "reason": "Bài phân tích chi tiết trợ từ に và で"
      },
      {
        "category": "notes",
        "slug": "loi-thuong-gap-khi-dung-wa-va-ga",
        "title": "Trợ từ は và が — Những lỗi tư duy người Việt hay mắc phải nhất và cách sửa",
        "reason": "Cùng làm chủ các cặp trợ từ quan trọng"
      }
    ]
  },
  {
    "id": "n-desu-masu-lich-su",
    "slug": "desu-masu-va-ranh-gioi-lich-su",
    "categoryId": "notes",
    "title": "Desu / Masu không phải lúc nào cũng là 'lịch sự tuyệt đối': Sắc thái khoảng cách tâm lý",
    "japaneseTitle": "「です・ます」の心理的距離と使われ方",
    "summary": "Hiểu đúng bản chất của thể ていねい (Desu/Masu): Nó không chỉ biểu thị sự lịch sự, mà còn là ranh giới giữ khoảng cách tâm lý (Soto) giữa những người chưa thân thiết.",
    "level": "ALL",
    "tags": [
      "Ghi chú",
      "Desu",
      "Masu",
      "Khoảng cách tâm lý",
      "Văn hóa",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-dm-1",
        "title": "1. 'Khoảng cách lịch thiệp' trong văn hóa Nhật",
        "content": "Nhiều bạn nghĩ nói 'です/ます' càng nhiều thì càng được yêu quý. Nhưng nếu bạn đã chơi thân với một người bạn Nhật suốt 1 năm mà vẫn nói 'そうですか、わかりました' bằng thể Desu/Masu, họ sẽ cảm thấy bạn đang dựng lên một 'bức tường vô hình' ngăn cách sự gần gũi.",
        "type": "text"
      },
      {
        "id": "sec-dm-2",
        "title": "2. Thời điểm thích hợp để chuyển từ Desu/Masu sang thể thông thường (Tameguchi)",
        "content": "Khi bạn bè cùng trang lứa hoặc đồng nghiệp cùng tuổi rủ: 'ため口でいいよ' (Cứ nói chuyện tự nhiên bằng thể thường đi nhé) hoặc họ bắt đầu chuyển sang dùng thể ngắn (だ, だよ, ね), đó là tín hiệu họ muốn rút ngắn khoảng cách tâm lý với bạn.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-dm-1",
        "japanese": "A: もう敬語じゃなくていいよ！タメ口で話そう。\nB: え、本当？じゃあ、これからは普通に話すね！",
        "reading": "A: もうけいごじゃなくていいよ！タメぐちではなそう。\nB: え、ほんとう？じゃあ、これからはふつうにはなすね！",
        "romaji": "A: Mou keigo ja nakute ii yo! Tameguchi de hanasou.\nB: E, hontou? Jaa, korekara wa futsuu ni hanasu ne!",
        "vietnamese": "A: Thôi không cần dùng kính ngữ nữa đâu! Cứ nói chuyện tự nhiên như bạn bè nhé.\nB: Ơ thật hả? Thế thì từ nay tớ sẽ nói chuyện bình thường nhé!",
        "explanation": "Khoảnh khắc phá bỏ bức tường lịch sự để trở thành bạn bè thân thiết.",
        "context": "Chuyển giao phong cách giao tiếp bạn bè"
      }
    ],
    "comparisons": {
      "title": "Thể Desu/Masu vs Thể thường (Tameguchi)",
      "items": [
        {
          "subject": "Thể Desu/Masu (Lịch sự & Khoảng cách an toàn)",
          "nuance": "Tôn trọng nhưng giữ ranh giới khách sáo, an toàn cho người mới quen",
          "formula": "〜です / 〜ます",
          "example": "何を食べますか。",
          "exampleTranslation": "Bạn ăn cái gì ạ?",
          "caution": "Nếu dùng với bạn thân sẽ nghe như người xa lạ."
        },
        {
          "subject": "Thể thường (Thân mật & Không khoảng cách)",
          "nuance": "Ấm áp, chia sẻ cảm xúc không phòng thủ, dành cho bạn thân và gia đình",
          "formula": "Thể từ điển / Thể ngắn",
          "example": "何食べる？",
          "exampleTranslation": "Ăn gì đấy?",
          "caution": "Tuyệt đối không dùng với sếp, người lạ hoặc người lớn tuổi."
        }
      ],
      "summary": "Người mới gặp -> Desu/Masu là lịch sự. Bạn thân lâu năm -> Desu/Masu là xa cách."
    },
    "notes": [
      "Tại nơi làm việc, dù thân thiết đến mấy ngoài giờ làm, khi bước vào phòng họp chính thức trước mặt người ngoài, vẫn phải quay lại dùng Desu/Masu."
    ],
    "warnings": [
      "Đừng tự ý chuyển sang thể thường (Tameguchi) với người lớn tuổi hơn bạn hoặc cấp trên nếu họ chưa chủ động đề nghị."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        "title": "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        "reason": "Cấp độ cao hơn của Desu/Masu là Keigo"
      },
      {
        "category": "conversation",
        "slug": "chao-hoi-va-mo-dau-cuoc-tro-chuyen",
        "title": "Chào hỏi và mở đầu cuộc trò chuyện tự nhiên chuẩn người bản xứ",
        "reason": "Ứng dụng thể nói phù hợp khi bắt chuyện"
      }
    ]
  },
  {
    "id": "n-khong-dich-word-by-word",
    "slug": "khi-nao-khong-nen-dich-word-by-word",
    "categoryId": "notes",
    "title": "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
    "japaneseTitle": "直訳を避けるべき日本語の言語習慣",
    "summary": "Chỉ ra những vùng kiến thức dịch sát nghĩa từng chữ sẽ tạo ra câu tiếng Nhật tối nghĩa hoặc thô lỗ: Câu cảm thán, câu từ chối, cách chào hỏi và các động từ đi kèm cơ thể.",
    "level": "ALL",
    "tags": [
      "Ghi chú",
      "Dịch thuật",
      "Tư duy tiếng Nhật",
      "Lỗi sai",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ww-1",
        "title": "1. Vấn đề của phương pháp dịch từng chữ (Word-by-word)",
        "content": "Tiếng Việt và tiếng Nhật thuộc hai ngữ hệ hoàn toàn khác nhau về cấu trúc lẫn thế giới quan văn hóa. Dịch nguyên văn từng từ tiếng Việt sang tiếng Nhật là nguyên nhân số 1 khiến câu nói của bạn nghe lủng củng, 'như dịch từ Google' và làm người Nhật bối rối.",
        "type": "text"
      },
      {
        "id": "sec-ww-2",
        "title": "2. Bảng các câu kinh điển CẤM DỊCH WORD-BY-WORD",
        "content": "Dưới đây là các câu đối chiếu giữa cách dịch máy móc người Việt hay nghĩ và cách nói tự nhiên chuẩn bản xứ:",
        "type": "table",
        "tableData": {
          "headers": [
            "Ý tiếng Việt muốn nói",
            "Dịch sát chữ (CẦN TRÁNH)",
            "Cách nói chuẩn người Nhật"
          ],
          "rows": [
            [
              "Bạn ăn cơm chưa?",
              "ご飯を食べましたか (Nghe tò mò)",
              "こんにちは / お疲れ様です"
            ],
            [
              "Tôi không muốn đi",
              "行きたくないです (Quá thô lỗ)",
              "行きたいのはやまやまですが、都合が悪くて..."
            ],
            [
              "Uống thuốc",
              "薬を食べる (Ăn thuốc)",
              "薬を飲む (Kusuri o nomu)"
            ],
            [
              "Tôi có hẹn với bác sĩ",
              "約束があります (Hẹn bạn chơi)",
              "予約があります (Yoyaku ga arimasu)"
            ],
            [
              "Đi vệ sinh",
              "トイレに行く (Quá thẳng)",
              "お手洗いに失礼します / ちょっと席を外します"
            ]
          ]
        }
      }
    ],
    "examples": [
      {
        "id": "ex-ww-1",
        "japanese": "A: 今日、一緒に帰りませんか。\nB: あ、今日はちょっと野暮用があって...",
        "reading": "A: きょう、いっしょにかえりませんか。\nB: あ、きょうはちょっとやぼようがあって...",
        "romaji": "A: Kyou, issho ni kaerimasen ka.\nB: A, kyou wa chotto yaboyou ga atte...",
        "vietnamese": "A: Hôm nay cùng về chung không?\nB: À, hôm nay tớ lại kẹt chút việc riêng mất rồi...",
        "explanation": "Thay vì nói thẳng 'Tôi không muốn về cùng', người Nhật dùng 'ちょっと野暮用があって' (hơi kẹt chút việc).",
        "context": "Từ chối khéo léo"
      }
    ],
    "comparisons": {
      "title": "Tư duy dịch tiếng Việt vs Tư duy tiếng Nhật",
      "items": [
        {
          "subject": "Tư duy dịch từng chữ (Tiếng Việt -> Nhật)",
          "nuance": "Nghĩ câu tiếng Việt trong đầu rồi tra từ tương ứng để ghép vào",
          "formula": "Chủ ngữ + Trợ từ + Vị ngữ (dịch từng từ)",
          "example": "私の趣味は音楽を聴くことです。(Sách vở)",
          "exampleTranslation": "Sở thích của tôi là nghe nhạc.",
          "caution": "Gượng gạo và tốn 3-4 giây xử lý trong não."
        },
        {
          "subject": "Tư duy theo tình huống (Người Nhật nói gì)",
          "nuance": "Ghi nhớ nguyên mẫu câu người Nhật phản xạ trong tình huống đó",
          "formula": "Tình huống -> Mẫu câu bản xứ bật ra",
          "example": "休みの日はよく音楽を聴いています。(Tự nhiên)",
          "exampleTranslation": "Ngày nghỉ tôi hay nghe nhạc.",
          "caution": "Bật ra phản xạ tức thì."
        }
      ],
      "summary": "Đừng hỏi 'Câu này tiếng Nhật dịch từng chữ là gì?'. Hãy hỏi 'Trong hoàn cảnh này người Nhật nói câu gì?'."
    },
    "notes": [
      "Học ngoại ngữ là học văn hóa và thói quen tư duy của người bản xứ, không phải bài tập thay thế từ vựng toán học."
    ],
    "warnings": [
      "Không hỏi 'Bạn ăn cơm chưa' (Gohan tabemashita ka) thay cho lời chào buổi trưa với người Nhật, vì họ sẽ tưởng bạn đang rủ họ đi ăn hoặc tò mò đời sống cá nhân của họ."
    ],
    "relatedArticles": [
      {
        "category": "notes",
        "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        "reason": "Bài học chi tiết các bẫy dịch thuật"
      },
      {
        "category": "notes",
        "slug": "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        "title": "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        "reason": "Học theo cụm để tránh dịch sai"
      }
    ]
  },
  {
    "id": "n-doc-theo-mora",
    "slug": "doc-cau-theo-nhip-mora-thay-vi-tung-chu",
    "categoryId": "notes",
    "title": "Cách đọc câu tiếng Nhật theo nhịp phách (Mora) thay vì từng chữ cái riêng rẽ",
    "japaneseTitle": "モーラ（拍）感覚で読む日本語リズム",
    "summary": "Bí mật giúp nói tiếng Nhật mượt mà không vấp: Nắm vững khái niệm Mora (phách nhịp), quy tắc trường âm (2 phách), âm ngắt (1 phách tĩnh) và âm Hatsun (ん).",
    "level": "BEGINNER",
    "tags": [
      "Ghi chú",
      "Phát âm",
      "Mora",
      "Nhịp điệu",
      "Ngữ âm",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-mr-1",
        "title": "1. Mora (Phách nhịp) là gì?",
        "content": "Trong khi tiếng Việt có các âm tiết phức tạp (như 'nghiêng' là 1 âm tiết), tiếng Nhật được tính bằng các đơn vị phách đều đặn gọi là MORA (拍 - haku). Mỗi mora có độ dài thời gian phát âm BẰNG NHAU như tiếng tích tắc của đồng hồ quả lắc.",
        "type": "rule"
      },
      {
        "id": "sec-mr-2",
        "title": "2. Bẫy số 1: Âm ngắt (っ) và Âm Hatsun (ん) tính tròn 1 Mora!",
        "content": "- Âm ngắt (っ): Dù không phát ra tiếng nhưng bạn BẮT BUỘC phải dừng lại đúng 1 nhịp phách tĩnh. Ví dụ: きって (tem thư) gồm 3 mora (ki - [ngắt] - te), nếu không ngắt sẽ thành きて (hãy đến) chỉ có 2 mora.\n- Âm ん (hatsuon): Chiếm trọn vẹn 1 mora (Nihon = Ni-ho-n = 3 mora).",
        "type": "rule"
      },
      {
        "id": "sec-mr-3",
        "title": "3. Bẫy số 2: Trường âm (Âm dài) = 2 Mora",
        "content": "- おばさん (Cô/Dì) = 4 mora.\n- おばあさん (Bà cụ) = 5 mora (âm 'baa' dài gấp đôi âm 'ba').\nNếu không giữ đủ 2 nhịp phách, người Nhật sẽ hiểu nhầm bạn đang gọi 'Bà cụ' thành 'Bà cô'!",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-mr-1",
        "japanese": "東京 (とうきょう) -> と・う・きょ・う (4 Mora)",
        "reading": "とうきょう",
        "romaji": "Toukyou",
        "vietnamese": "Thủ đô Tokyo gồm đúng 4 nhịp phách (To - u - kyo - u).",
        "explanation": "Người Việt hay đọc gộp thành 2 âm tiết 'Tô-ki-ô', dẫn đến sai nhịp điệu tiếng Nhật chuẩn.",
        "context": "Đếm phách nhịp địa danh"
      }
    ],
    "comparisons": {
      "title": "Đọc theo Âm tiết tiếng Việt vs Đọc theo Mora tiếng Nhật",
      "items": [
        {
          "subject": "Đọc theo âm tiết tiếng Việt",
          "nuance": "Đọc nuốt âm ngắt hoặc kéo dài tùy hứng không đều nhịp",
          "formula": "Âm dài bị đọc ngắn lại",
          "example": "きって đọc giống 'kít-tê' (quá nhanh)",
          "exampleTranslation": "Nghe cộc lốc và dễ nhầm từ.",
          "caution": "Mất đi nhịp điệu tự nhiên của tiếng Nhật."
        },
        {
          "subject": "Đọc theo nhịp phách Mora",
          "nuance": "Mỗi mora đều đặn như nhịp gõ phách metronome",
          "formula": "1 Ký tự / 1 Trường âm / 1 Âm ngắt = 1 Nhịp",
          "example": "き (1) - っ (1) - て (1) = 3 Nhịp đều",
          "exampleTranslation": "Phát âm chuẩn xác 100% người bản xứ nghe rõ ngay.",
          "caution": "Tập gõ ngón tay xuống bàn khi luyện đọc."
        }
      ],
      "summary": "Gõ tay đều đặn: Mỗi chữ cái, mỗi âm ngắt, mỗi trường âm đều chiếm đúng 1 nhịp gõ."
    },
    "notes": [
      "Âm ghép ảo (Yōon như きゃ, しゅ, ちょ) chỉ tính là 1 mora duy nhất dù viết bằng 2 ký tự (1 to 1 nhỏ)."
    ],
    "warnings": [
      "Đừng bao giờ nuốt âm ngắt (っ) khi đọc từ vựng như がっこう, きっぷ, ざっし."
    ],
    "relatedArticles": [
      {
        "category": "notes",
        "slug": "pitch-accent-nhung-dieu-can-biet",
        "title": "Pitch accent: Những điều người mới học cần biết và những điều KHÔNG cần ép bản thân nhớ ngay",
        "reason": "Kết hợp nhịp mora với cao độ Pitch accent"
      },
      {
        "category": "kanji",
        "slug": "quy-tac-chuyen-am-han-viet-sang-on-yomi",
        "title": "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
        "reason": "Quy luật trường âm và âm ngắt trong chữ Hán"
      },
      {
        "category": "notes",
        "slug": "phat-am-am-mui-hatsuon-n",
        "title": "Phát âm âm mũi ん (Hatsuon): 5 biến thể âm mũi tùy theo phụ âm đứng ngay sau",
        "reason": "Âm mũi ん tính là một phách Mora độc lập"
      },
      {
        "category": "notes",
        "slug": "am-ghep-yoon-phat-am-chuan",
        "title": "Âm ghép ゃ, ゅ, ょ (Youon): Quy tắc phát âm trọn vẹn trong 1 phách morae",
        "reason": "Âm ghép chỉ chiếm 1 Mora dù viết bởi 2 chữ cái"
      }
    ]
  },
  {
    "id": "n-pitch-accent-can-biet",
    "slug": "pitch-accent-nhung-dieu-can-biet",
    "categoryId": "notes",
    "title": "Pitch accent: Những điều người mới học cần biết và những điều KHÔNG cần ép bản thân nhớ ngay",
    "japaneseTitle": "初心者が知っておくべき高低アクセントの基本と向き合い方",
    "summary": "Giải mã đúng mức độ về ngữ điệu cao độ (Pitch accent): Hiểu nguyên lý Cao - Thấp trong tiếng Nhật để nghe tự nhiên, nhưng KHÔNG để nỗi sợ accent làm bạn ngần ngại mở miệng giao tiếp.",
    "level": "ALL",
    "tags": [
      "Ghi chú",
      "Phát âm",
      "Pitch Accent",
      "Ngữ điệu",
      "Kinh nghiệm",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-pa-1",
        "title": "1. Pitch Accent tiếng Nhật là gì?",
        "content": "Khác với tiếng Anh nhấn trọng âm bằng độ mạnh (Stress accent: to hơn, mạnh hơn) hay tiếng Việt dùng 6 thanh điệu (Dấu sắc, huyền, hỏi, ngã, nặng), tiếng Nhật chuẩn Tokyo sử dụng CAO ĐỘ (Pitch accent: Cao - H/High và Thấp - L/Low).\nVí dụ kinh điển:\n- 箸 (はし - Đôi đũa): Cao - Thấp (H-L).\n- 橋 (はし - Cây cầu): Thấp - Cao (L-H).\n- 端 (はし - Mép/Rìa): Thấp - Cao (và trợ từ đi sau vẫn ở mức Cao).",
        "type": "rule"
      },
      {
        "id": "sec-pa-2",
        "title": "2. Quy tắc cốt lõi bạn CẦN BIẾT",
        "content": "Chỉ cần nhớ 2 quy tắc vàng của tiếng Nhật chuẩn Tokyo:\n1. Mora thứ 1 và Mora thứ 2 LUÔN KHÁC NHAU VỀ CAO ĐỘ (Nếu chữ thứ 1 Cao thì chữ thứ 2 phải Thấp; nếu chữ thứ 1 Thấp thì chữ thứ 2 phải Cao).\n2. Trong 1 từ, một khi cao độ đã rơi từ Cao xuống Thấp, nó KHÔNG BAO GIỜ tự bật ngược lên Cao lại trong từ đó nữa.",
        "type": "rule"
      },
      {
        "id": "sec-pa-3",
        "title": "3. Những điều BẠN KHÔNG CẦN ÉP BẢN THÂN NHỚ NGAY",
        "content": "- Ngay cả người Nhật ở các vùng khác nhau (Tokyo, Osaka, Kyoto, Tohoku) cũng có Pitch accent hoàn toàn khác nhau, thậm chí trái ngược nhau mà họ vẫn hiểu nhau 100%!\n- Ngữ cảnh của cả câu (Context) quan trọng gấp 100 lần Pitch accent của 1 từ đơn lẻ. Khi bạn cầm bát cơm và nói 'Hashi o kudasai', không một người Nhật nào nghĩ bạn đang đòi 'cây cầu' cả.\n- Lời khuyên cho người mới học: Tập trung vào phát âm chuẩn Mora và trường âm/âm ngắt trước. Pitch accent chỉ cần tra cứu khi phân vân hoặc khi lên trình độ nâng cao (N2/N1).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-pa-1",
        "japanese": "雨 (あめ - Cơn mưa: H-L) vs 飴 (あめ - Kẹo ngọt: L-H)",
        "reading": "あめ vs あめ",
        "romaji": "Ame (Mưa) vs Ame (Kẹo)",
        "vietnamese": "Mưa: Chữ 'A' đọc cao, chữ 'ME' hạ thấp. Kẹo: Chữ 'A' đọc trầm, chữ 'ME' nhấc cao.",
        "explanation": "Cặp từ phân biệt cao độ kinh điển trong tiếng Nhật Tokyo.",
        "context": "So sánh cao độ"
      }
    ],
    "comparisons": {
      "title": "Trọng âm tiếng Anh vs Thanh điệu tiếng Việt vs Pitch accent tiếng Nhật",
      "items": [
        {
          "subject": "Thanh điệu tiếng Việt (Tone)",
          "nuance": "Mỗi từ có dấu riêng biệt (Ma, Má, Mà, Mả, Mã, Mạ)",
          "formula": "Thay đổi dấu là đổi nghĩa hoàn toàn",
          "example": "Cà phê",
          "exampleTranslation": "Có dấu cụ thể",
          "caution": "Người Việt dễ mang thói quen bỏ dấu này sang tiếng Nhật."
        },
        {
          "subject": "Pitch accent tiếng Nhật (Cao/Thấp)",
          "nuance": "Chỉ lướt sóng nhẹ nhàng giữa nốt Cao và nốt Thấp, không gằn giọng",
          "formula": "Mora 1 và 2 lệch cao độ",
          "example": "ありがとう (L-H-H-H-L)",
          "exampleTranslation": "Cảm ơn",
          "caution": "Không nói quá to hay nhấn gằn từng từ."
        }
      ],
      "summary": "Đừng quá ám ảnh về Pitch accent. Hãy lắng nghe người bản xứ nói và nhại theo ngữ điệu tự nhiên (Shadowing)."
    },
    "notes": [
      "Phương pháp luyện ngữ điệu tốt nhất là Shadowing (nói đuổi theo file nghe người bản xứ) thay vì ngồi học thuộc lòng bảng ký hiệu cao độ của từng từ vựng trong từ điển."
    ],
    "warnings": [
      "Đừng để nỗi ám ảnh về Pitch accent làm bạn sợ hãi không dám giao tiếp. Người Nhật cực kỳ thông cảm và luôn hiểu ý bạn dựa vào ngữ cảnh câu nói."
    ],
    "relatedArticles": [
      {
        "category": "notes",
        "slug": "doc-cau-theo-nhip-mora-thay-vi-tung-chu",
        "title": "Cách đọc câu tiếng Nhật theo nhịp phách (Mora) thay vì từng chữ cái riêng rẽ",
        "reason": "Nền tảng nhịp Mora hỗ trợ cho Pitch accent"
      },
      {
        "category": "conversation",
        "slug": "chao-hoi-va-mo-dau-cuoc-tro-chuyen",
        "title": "Chào hỏi và mở đầu cuộc trò chuyện tự nhiên chuẩn người bản xứ",
        "reason": "Thực hành ngữ điệu giao tiếp đời sống"
      },
      {
        "category": "notes",
        "slug": "vo-thanh-hoa-nguyen-am-i-va-u",
        "title": "Hiện tượng vô thanh hóa nguyên âm (I và U): Vì sao người Nhật đọc す như s",
        "reason": "Ảnh hưởng của vô thanh hóa đến ngữ điệu câu"
      },
      {
        "category": "notes",
        "slug": "phuong-phap-shadowing-thuc-chien",
        "title": "Phương pháp Shadowing thực chiến: Luyện phản xạ ngữ điệu, phát âm lưu loát",
        "reason": "Ứng dụng shadowing bắt chước Pitch accent tự nhiên"
      }
    ]
  },
  {
    "id": "n-truong-am-phat-am",
    "slug": "quy-tac-phat-am-truong-am-chouon",
    "categoryId": "notes",
    "title": "Quy tắc phát âm trường âm (Chouon): Kéo dài chính xác 2 phách và tránh đổi nghĩa từ",
    "japaneseTitle": "長音の法則：2拍の長さと意味の取り違え防止",
    "summary": "Nguyên tắc sống còn trong phát âm tiếng Nhật: Trường âm có độ dài đúng bằng 2 phách (Mora); phát âm thiếu nửa phách có thể làm biến đổi hoàn toàn nghĩa của từ sang một từ khác.",
    "level": "ALL",
    "tags": [
      "Phát âm",
      "Trường âm",
      "Mora",
      "Bẫy phát âm",
      "ALL"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-nta-1",
        "title": "1. Bản chất của Trường âm (長音 - Chouon)",
        "content": "Trong tiếng Nhật, trường âm KHÔNG PHẢI là đọc nhấn mạnh hay lên giọng, mà là KÉO DÀI THỜI GIAN PHÁT ÂM của nguyên âm đó thêm ĐÚNG 1 PHÁCH (Mora).\n- Một âm ngắn: 1 Mora (1 nhịp vỗ tay).\n- Một trường âm: 2 Mora (2 nhịp vỗ tay đều đặn).\nQuy tắc viết trường âm trong Hiragana:\n- Hàng A: Thêm あ (おかあさん - okaasan).\n- Hàng I: Thêm い (おにいさん - oniisan).\n- Hàng U: Thêm う (くうき - kuuki).\n- Hàng E: Thêm え hoặc い (おねえさん - oneesan, せんせい - sensei [viết e+i đọc là ee]).\n- Hàng O: Thêm お hoặc う (お父さん - otousan [viết o+u đọc là oo], とおり - toori).",
        "type": "rule"
      },
      {
        "id": "sec-nta-2",
        "title": "2. Hậu quả nguy hiểm khi phát âm thiếu trường âm",
        "content": "Người Việt hay quen thói quen tiếng Việt (vốn không có trường âm 2 phách), dẫn đến đọc ngắn và gây ra những tai nạn ngôn ngữ dở khóc dở cười:\n- おばさん (obasan - bác/cô gái trung niên) vs おばあさん (obaasan - bà lão).\n- おじさん (ojisan - chú/bác trai) vs おじいさん (ojiisan - ông lão).\n- ゆき (yuki - tuyết rơi) vs ゆうき (yuuki - dũng khí/can đảm).\n- ここ (koko - ở đây) vs こうこう (koukou - trường cấp ba).",
        "type": "rule"
      },
      {
        "id": "sec-nta-3",
        "title": "3. Trường âm trong Katakana (Dấu gạch ngang ー)",
        "content": "Trong chữ Katakana, mọi nguyên âm dài đều được biểu thị đồng nhất bằng dấu gạch ngang [ー]:\n- コーヒー (koohii - cà phê: 4 phách: ko - o - hi - i).\n- ビール (biiru - bia) vs ビル (biru - tòa nhà cao tầng) -> Khác nhau 1 phách biến bia thành tòa nhà!",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-nta-1",
        "japanese": "ビルで冷たいビールを飲みました。",
        "reading": "ビルでつめたいビールをのみました。",
        "romaji": "Biru de tsumetai biiru o nomimashita.",
        "vietnamese": "Tôi đã uống bia lạnh ở một tòa nhà cao tầng.",
        "explanation": "Đối chiếu giữa ビル (biru - 2 phách) và ビール (biiru - 3 phách).",
        "context": "Phân biệt trường âm trong Katakana"
      },
      {
        "id": "ex-nta-2",
        "japanese": "私のおばあさんは今年80歳になります。",
        "reading": "わたしのおばあさんはことしはちじゅっさいになります。",
        "romaji": "Watashi no obaasan wa kotoshi hachijussai ni narimasu.",
        "vietnamese": "Bà của tôi năm nay bước sang tuổi 80.",
        "explanation": "Kéo dài 4 phách o-ba-a-san để chỉ người bà kính yêu.",
        "context": "Nói về tuổi thọ của bà"
      },
      {
        "id": "ex-nta-3",
        "japanese": "勇気を出して、自分の意見を言いました。",
        "reading": "ゆうきをだして、じぶんのいけんをいいました。",
        "romaji": "Yuuki o dashite, jibun no iken o iimashita.",
        "vietnamese": "Tôi đã lấy hết dũng khí để nói ra ý kiến của mình.",
        "explanation": "ゆうき (yuuki - dũng khí) có trường âm u kéo dài.",
        "context": "Kể lại khoảnh khắc dũng cảm"
      }
    ],
    "notes": [
      "Phương pháp luyện tập: Dùng tay vỗ đều đặn xuống bàn theo từng nhịp để cảm nhận độ dài của phách kéo dài."
    ],
    "warnings": [
      "Không gọi nhầm một người phụ nữ trung niên là 'おばあさん' (bà lão), đây là điều cấm kỵ xúc phạm thẩm mỹ ở Nhật."
    ],
    "relatedArticles": [
      {
        "category": "notes",
        "slug": "doc-cau-theo-nhip-mora-thay-vi-tung-chu",
        "title": "Cách đọc câu tiếng Nhật theo nhịp phách (Mora) thay vì từng chữ cái riêng rẽ",
        "reason": "Khái niệm phách Mora trong tiếng Nhật"
      },
      {
        "category": "notes",
        "slug": "am-ngat-sokuon-tsu-nho",
        "title": "Âm ngắt っ (Sokuon): Kỹ thuật giữ 1 phách im lặng và cơ chế bật hơi phụ âm kế tiếp",
        "reason": "Đối chiếu giữa kéo dài âm (trường âm) và ngắt âm (xúc âm)"
      },
      {
        "category": "notes",
        "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        "reason": "Các cặp từ dễ nhầm do phát âm thiếu trường âm"
      }
    ]
  },
  {
    "id": "n-am-ngat-tsu-nho",
    "slug": "am-ngat-sokuon-tsu-nho",
    "categoryId": "notes",
    "title": "Âm ngắt っ (Sokuon): Kỹ thuật giữ 1 phách im lặng và cơ chế bật hơi phụ âm kế tiếp",
    "japaneseTitle": "促音「っ」の発音技術：1拍の沈黙と子音の準備",
    "summary": "Bí quyết xử lý chữ Tsu nhỏ (促音): Không phải là đọc nuốt chữ mà là nín thở giữ trọn vẹn 1 phách im lặng và nén luồng hơi lại trước khi bật ra phụ âm kế tiếp.",
    "level": "ALL",
    "tags": [
      "Phát âm",
      "Âm ngắt",
      "Mora",
      "Sokuon",
      "ALL"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-nsn-1",
        "title": "1. Âm ngắt (促音 - Sokuon) là gì?",
        "content": "Âm ngắt được viết bằng chữ Hiragana っ hoặc Katakana ッ có kích thước nhỏ bằng 1/4 chữ thông thường.\nNguyên tắc vàng: ÂM NGẮT CHIẾM TRỌN VẸN 1 PHÁCH (1 MORA).\nThay vì phát ra âm thanh, âm ngắt là 1 PHÁCH IM LẶNG HOÀN TOÀN (Beat of Silence), tương tự như dấu lặng trong một bản nhạc.",
        "type": "rule"
      },
      {
        "id": "sec-nsn-2",
        "title": "2. Kỹ thuật ngắt hơi và Nén khẩu hình",
        "content": "Khi gặp chữ っ nhỏ:\n1. Khựng lại ngay lập tức tại vị trí âm trước đó.\n2. Chuẩn bị sẵn khẩu hình miệng của PHỤ ÂM ĐỨNG LIỀN SAU NÓ (k, s, t, p).\n3. Giữ im lặng trong đúng 1 nhịp phách.\n4. Bật mạnh phụ âm tiếp theo ra.\n\nVí dụ:\n- 切手 (きって - kitte: tem thư): ki -> nén lưỡi vị trí âm 't' trong 1 nhịp -> te (3 phách: ki - [ngắt] - te).\n- 雑誌 (ざっし - zasshi: tạp chí): za -> ép luồng hơi xì nhẹ -> shi (3 phách: za - [ngắt] - shi).",
        "type": "pattern"
      },
      {
        "id": "sec-nsn-3",
        "title": "3. Nhầm lẫn tai hại khi bỏ quên âm ngắt",
        "content": "- 来て (きて - kite: hãy đến đây) vs 切って (きって - kitte: hãy cắt đi).\n- 待つ (まつ - matsu: chờ) -> 待って (まって - matte: hãy đợi) vs 当て (あて - ate: đích đến).\n- 音 (おと - oto: âm thanh) vs 夫 (おっと - otto: người chồng).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-nsn-1",
        "japanese": "ちょっと待ってください。",
        "reading": "ちょっとまってください。",
        "romaji": "Chotto matte kudasai.",
        "vietnamese": "Xin vui lòng chờ một chút ạ.",
        "explanation": "Có tới 2 âm ngắt: ちょっと (chotto: 3 phách) và 待って (matte: 3 phách).",
        "context": "Nhờ người khác chờ đợi"
      },
      {
        "id": "ex-nsn-2",
        "japanese": "郵便局で切手を二枚買いました。",
        "reading": "ゆうびんきょくできってをにまいかいました。",
        "romaji": "Yuubinkyoku de kitte o nimai kaimashita.",
        "vietnamese": "Tôi đã mua 2 con tem thư ở bưu điện.",
        "explanation": "切手 (kitte - tem thư) bắt buộc giữ 1 phách âm ngắt.",
        "context": "Mua tem gửi thư"
      },
      {
        "id": "ex-nsn-3",
        "japanese": "日記をつける習慣を始めました。",
        "reading": "にっきをつけるしゅうかんをはじめました。",
        "romaji": "Nikki o tsukeru shuukan o hajimemashita.",
        "vietnamese": "Tôi đã bắt đầu thói quen viết nhật ký.",
        "explanation": "日記 (nikki: 3 phách: ni - [ngắt] - ki) phân biệt với 2 phách.",
        "context": "Kể về thói quen cá nhân"
      }
    ],
    "notes": [
      "Âm ngắt chỉ xuất hiện đứng trước các hàng phụ âm: K, S, T, P."
    ],
    "warnings": [
      "Nói 'きてください' (Hãy đến đây) nhầm với 'きってください' (Hãy cắt nó ra) trong bếp có thể gây nguy hiểm dở khóc dở cười."
    ],
    "relatedArticles": [
      {
        "category": "notes",
        "slug": "doc-cau-theo-nhip-mora-thay-vi-tung-chu",
        "title": "Cách đọc câu tiếng Nhật theo nhịp phách (Mora) thay vì từng chữ cái riêng rẽ",
        "reason": "Đếm số phách có chứa âm ngắt っ"
      },
      {
        "category": "notes",
        "slug": "quy-tac-phat-am-truong-am-chouon",
        "title": "Quy tắc phát âm trường âm (Chouon): Kéo dài chính xác 2 phách",
        "reason": "Phân biệt nhịp điệu của âm ngắt và trường âm"
      },
      {
        "category": "vocabulary",
        "slug": "tu-dien-tu-tuong-thanh-tu-tuong-hinh",
        "title": "Từ tượng thanh & Từ tượng hình (Onomatopoeia) căn bản trong đời sống",
        "reason": "Âm ngắt xuất hiện rất nhiều trong từ tượng thanh, tượng hình"
      }
    ]
  },
  {
    "id": "n-hatsuon-n",
    "slug": "phat-am-am-mui-hatsuon-n",
    "categoryId": "notes",
    "title": "Phát âm âm mũi ん (Hatsuon): 5 biến thể âm mũi tùy theo phụ âm đứng ngay sau",
    "japaneseTitle": "撥音「ん」の5つの変化：後続音による自然な調音点",
    "summary": "Âm ん trong tiếng Nhật không chỉ đơn giản là đọc như 'n' tiếng Việt: Nó tự động biến đổi vị trí đầu lưỡi thành [m], [n], [ng], [ngh] hoặc âm mũi hóa tùy phụ âm đi sau.",
    "level": "ALL",
    "tags": [
      "Phát âm",
      "Âm mũi",
      "Hatsuon",
      "Biến âm",
      "ALL"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-nhn-1",
        "title": "1. Bản chất của âm ん (撥音 - Hatsuon)",
        "content": "Âm ん là chữ cái duy nhất trong bảng chữ cái Hiragana không đi kèm bất kỳ nguyên âm nào (a, i, u, e, o).\nĐặc tính cốt lõi:\n- ん ĐỘC LẬP TÍNH LÀ 1 PHÁCH (1 Mora).\n- ん là âm mũi biến thiên theo nguyên lý 'tiết kiệm cơ năng miệng': Khẩu hình miệng sẽ chuẩn bị sẵn cho âm kế tiếp.",
        "type": "rule"
      },
      {
        "id": "sec-nhn-2",
        "title": "2. Quy luật biến đổi 5 vị trí phát âm",
        "content": "1. Phát âm thành [m] (khép chặt hai môi):\n   - Khi đứng trước các âm hàng M, B, P (ま, ば, ぱ).\n   - Ví dụ: さんぽ (sanpo) đọc là [sampo], しんぶん (shinbun) đọc là [shimbum].\n\n2. Phát âm thành [n] (đầu lưỡi chạm nướu răng trên):\n   - Khi đứng trước các âm hàng T, D, N, R (た, だ, な, ら).\n   - Ví dụ: はんたい (hantai) đọc là [hantai], おんな (onna) đọc là [onna].\n\n3. Phát âm thành [ng] (gốc lưỡi nâng lên chạm ngạc mềm):\n   - Khi đứng trước các âm hàng K, G (か, が).\n   - Ví dụ: まんが (manga) đọc là [mang-ga], てんき (tenki) đọc là [teng-ki].\n\n4. Phát âm thành âm mũi hóa tự do:\n   - Khi đứng trước nguyên âm (a, i, u, e, o) hoặc âm S, H, Y, W.\n   - Ví dụ: れんあい (ren'ai) đọc lướt mũi nhẹ nhàng.\n\n5. Phát âm ở cuối từ (ngậm nhẹ vòm họng):\n   - Ví dụ: にほん (Nihon).",
        "type": "pattern"
      },
      {
        "id": "sec-nhn-3",
        "title": "3. Nhịp phách của âm ん",
        "content": "Đừng đọc lướt ん gộp vào âm trước! Người Việt hay đọc 'Shinbun' thành 2 phách [shin - bun]. Nhưng người Nhật đọc đúng 4 phách đều nhau: [shi - n - bu - n].",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-nhn-1",
        "japanese": "毎朝、新聞を読んでいます。",
        "reading": "まいあさ、しんぶんをよんでいます。",
        "romaji": "Maiasa, shinbun o yonde imasu.",
        "vietnamese": "Mỗi sáng tôi đều đọc báo.",
        "explanation": "Chữ ん trong しんぶん biến đổi thành âm m do đứng trước bu.",
        "context": "Kể thói quen buổi sáng"
      },
      {
        "id": "ex-nhn-2",
        "japanese": "今日の天気はとてもいいですね。",
        "reading": "きょうのてんきはとてもいいですね。",
        "romaji": "Kyou no tenki wa totemo ii desu ne.",
        "vietnamese": "Thời tiết hôm nay đẹp thật đấy nhỉ.",
        "explanation": "Chữ ん trong てんき biến thành âm ng do đứng trước ki.",
        "context": "Chào hỏi xã giao thời tiết"
      },
      {
        "id": "ex-nhn-3",
        "japanese": "天ぷらと日本酒を注文しました。",
        "reading": "てんぷらとにほんしゅをちゅうもんしました。",
        "romaji": "Tenpura to nihonshu o chuumon shimashita.",
        "vietnamese": "Tôi đã gọi món Tempura và rượu Sake Nhật.",
        "explanation": "てんぷら phát âm thành tempura (âm m trước pu).",
        "context": "Gọi món tại quán ăn"
      }
    ],
    "notes": [
      "Hiện tượng này hoàn toàn tự nhiên theo sinh học cơ miệng của con người, không cần ép bản thân học thuộc máy móc."
    ],
    "warnings": [
      "Không nuốt phách của chữ ん; từ さん (san) có 2 phách [sa - n], không phải 1 phách như chữ 'sang' hay 'san' tiếng Việt."
    ],
    "relatedArticles": [
      {
        "category": "notes",
        "slug": "doc-cau-theo-nhip-mora-thay-vi-tung-chu",
        "title": "Cách đọc câu tiếng Nhật theo nhịp phách (Mora) thay vì từng chữ cái riêng rẽ",
        "reason": "Âm ん chiếm trọn vẹn 1 phách Mora độc lập"
      },
      {
        "category": "notes",
        "slug": "pitch-accent-nhung-dieu-can-biet",
        "title": "Pitch accent: Những điều người mới học cần biết và những điều KHÔNG cần ép",
        "reason": "Quy tắc rơi cao độ khi có âm ん"
      },
      {
        "category": "notes",
        "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        "reason": "Lỗi phát âm ん như âm 'n' tiếng Việt"
      }
    ]
  },
  {
    "id": "n-am-ghep-yoon",
    "slug": "am-ghep-yoon-phat-am-chuan",
    "categoryId": "notes",
    "title": "Âm ghép ゃ, ゅ, ょ (Youon): Quy tắc phát âm trọn vẹn trong 1 phách morae",
    "japaneseTitle": "拗音「ゃ・ゅ・ょ」の発音ルール：2文字で1拍の基本",
    "summary": "Quy luật cốt lõi của âm ghép (Youon): Dù được viết bởi 2 ký tự (chữ hàng [i] + ya/yu/yo nhỏ) nhưng TUYỆT ĐỐI CHỈ TÍNH LÀ 1 PHÁCH DUY NHẤT.",
    "level": "ALL",
    "tags": [
      "Phát âm",
      "Âm ghép",
      "Youon",
      "Mora",
      "ALL"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-nyo-1",
        "title": "1. Cấu tạo của Âm ghép (拗音 - Youon)",
        "content": "Âm ghép được tạo thành bằng cách lấy các chữ thuộc cột [i] (き, し, ち, に, ひ, み, り, ぎ, じ, び, ぴ) kết hợp với các chữ ゃ, ゅ, ょ viết nhỏ bằng 1/4 chữ cái bình thường.\n- き + ゃ = きゃ (kya), き + ゅ = きゅ (kyu), き + ょ = きょ (kyo).\n- し + ゃ = しゃ (sha), し + ゅ = しゅ (shu), し + ょ = しょ (sho).\n- ち + ゃ = ちゃ (cha), ち + ゅ = ちゅ (chu), ち + ょ = ちょ (cho).",
        "type": "rule"
      },
      {
        "id": "sec-nyo-2",
        "title": "2. Quy tắc 1 Phách duy nhất (1 Mora Rule)",
        "content": "Sai lầm phổ biến nhất của người mới học là đọc tách thành 2 nhịp: [ki - ya] -> SAI HOÀN TOÀN!\n- Hai ký tự ghép lại nhưng phát âm lướt hòa quyện làm một trong đúng 1 nhịp vỗ tay.\n- So sánh số phách:\n  + きよ (ki - yo): 2 chữ lớn = 2 phách.\n  + きょ (kyo): 1 chữ lớn + 1 chữ nhỏ = ĐÚNG 1 PHÁCH.",
        "type": "rule"
      },
      {
        "id": "sec-nyo-3",
        "title": "3. Khi Âm ghép đi kèm Trường âm",
        "content": "Khi âm ghép có thêm trường âm (kéo dài thêm う):\n- きょう (kyou - hôm nay): 2 phách [kyo - u], KHÔNG PHẢI 3 phách [ki - yo - u].\n- じゅう (juu - số mười): 2 phách [ju - u].\n- びょういん (byouin - bệnh viện): 4 phách [byo - u - i - n] vs びよういん (biyouin - tiệm làm tóc): 5 phách [bi - yo - u - i - n] -> Khác nhau 1 phách biến bệnh viện thành tiệm tóc!",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-nyo-1",
        "japanese": "熱があるので、病院へ行きます。",
        "reading": "ねつがあるので、びょういんへいきます。",
        "romaji": "Netsu ga aru node, byouin e ikimasu.",
        "vietnamese": "Vì bị sốt nên tôi đi đến bệnh viện.",
        "explanation": "病院 (びょういん - byouin: 4 phách) bắt đầu bằng âm ghép びょ.",
        "context": "Đi khám bệnh"
      },
      {
        "id": "ex-nyo-2",
        "japanese": "髪を切るために、美容院へ行きました。",
        "reading": "かみをきるために、びよういんへいきました。",
        "romaji": "Kami o kiru tame ni, biyouin e ikimashita.",
        "vietnamese": "Để cắt tóc, tôi đã đi đến tiệm làm tóc.",
        "explanation": "美容院 (びよういん - biyouin: 5 phách) phát âm tách rõ bi - yo.",
        "context": "Đi làm đẹp cắt tóc"
      },
      {
        "id": "ex-nyo-3",
        "japanese": "今日はお茶を飲みながら勉強しましょう。",
        "reading": "きょうはおちゃをのみながらべんきょうしましょう。",
        "romaji": "Kyou wa ocha o nominagara benkyou shimashou.",
        "vietnamese": "Hôm nay chúng ta hãy vừa uống trà vừa học nhé.",
        "explanation": "Chứa nhiều âm ghép: きょう (kyo), お茶 (cha), 勉強 (kyo).",
        "context": "Rủ bạn cùng học nhóm"
      }
    ],
    "notes": [
      "Trên bàn phím máy tính gõ Romaji, để gõ chữ nhỏ đơn lẻ gõ xya, xyu, xyo hoặc lya, lyu, lyo."
    ],
    "warnings": [
      "Không nhầm 病院 (Byouin - bệnh viện) với 美容院 (Biyouin - tiệm làm tóc); đây là lỗi kinh điển khiến taxi đưa nhầm điểm đến."
    ],
    "relatedArticles": [
      {
        "category": "notes",
        "slug": "doc-cau-theo-nhip-mora-thay-vi-tung-chu",
        "title": "Cách đọc câu tiếng Nhật theo nhịp phách (Mora) thay vì từng chữ cái riêng rẽ",
        "reason": "Quy tắc tính phách: Âm ghép chỉ tính là 1 Mora"
      },
      {
        "category": "notes",
        "slug": "quy-tac-phat-am-truong-am-chouon",
        "title": "Quy tắc phát âm trường âm (Chouon): Kéo dài chính xác 2 phách",
        "reason": "Trường âm của âm ghép có độ dài 2 Mora"
      },
      {
        "category": "kanji",
        "slug": "quy-tac-chuyen-am-han-viet-sang-on-yomi",
        "title": "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
        "reason": "Âm ghép trong chuyển âm Hán - On"
      }
    ]
  },
  {
    "id": "n-vo-thanh-hoa-nguyen-am",
    "slug": "vo-thanh-hoa-nguyen-am-i-va-u",
    "categoryId": "notes",
    "title": "Hiện tượng vô thanh hóa nguyên âm (I và U): Vì sao người Nhật đọc す như s và です như des",
    "japaneseTitle": "母音の無声化（「い」「う」）：自然な日本語の抜け感",
    "summary": "Bí mật giúp người học nói tiếng Nhật tự nhiên như người bản xứ: Nguyên âm [i] và [u] bị triệt tiêu rung thanh đới khi kẹp giữa hai phụ âm vô thanh hoặc ở cuối câu.",
    "level": "ALL",
    "tags": [
      "Phát âm",
      "Vô thanh hóa",
      "Ngữ điệu",
      "Tự nhiên",
      "ALL"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-nvt-1",
        "title": "1. Vô thanh hóa nguyên âm (母音の無声化) là gì?",
        "content": "Trong tiếng Nhật chuẩn (Tokyo), hai nguyên âm hẹp là [I] và [U] thường xuyên bị MẤT ĐI ĐỘ RUNG CỦA DÂY THANH ĐỚI, chỉ còn lại luồng gió xì nhẹ qua kẽ răng.\nKết quả là âm thanh nghe như nguyên âm bị 'biến mất', chỉ còn lại phụ âm.\n- です (desu) nghe như 'des'.\n- ます (masu) nghe như 'mas'.\n- すき (suki) nghe như 'ski'.\n- したい (shitai) nghe như 'shtai'.",
        "type": "rule"
      },
      {
        "id": "sec-nvt-2",
        "title": "2. Hai điều kiện kích hoạt hiện tượng vô thanh hóa",
        "content": "Hiện tượng này xảy ra một cách tự nhiên theo vật lý cơ quan phát âm khi:\n1. Nguyên âm [i] hoặc [u] BỊ KẸP GIỮA HAI PHỤ ÂM VÔ THANH (k, s, t, h, p):\n   - 学生 (がくせい - gakusei): Chữ く kẹp giữa 'k' và 's' -> đọc là [gak-sei].\n   - 靴 (くつ - kutsu): Chữ く kẹp giữa 'k' và 'ts' -> đọc là [k-tsu].\n   - 人 (ひと - hito): Chữ ひ kẹp giữa 'h' và 't' -> đọc là [h-to].\n2. Đứng ở CUỐI CÂU sau phụ âm vô thanh (đặc biệt là s):\n   - 〜です, 〜ます, 〜でした.",
        "type": "pattern"
      },
      {
        "id": "sec-nvt-3",
        "title": "3. Lợi ích khi nắm vững nguyên lý này",
        "content": "Người học không còn bị hoang mang khi nghe băng bài thi JLPT chạy nhanh (tại sao băng đọc 'gaksei' mà sách viết 'gakusei'). Đồng thời khi bạn nói câu 'Arigatou gozaimas' thay vì kéo bè 'gozaimasu-u', giọng của bạn sẽ lập tức toát lên phong thái chuẩn bản xứ.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-nvt-1",
        "japanese": "日本語が好きです。",
        "reading": "にほんごがすきです。",
        "romaji": "Nihongo ga suki desu.",
        "vietnamese": "Tôi thích tiếng Nhật.",
        "explanation": "すき đọc lướt vô thanh thành [ski], です đọc thành [des].",
        "context": "Bày tỏ sở thích"
      },
      {
        "id": "ex-nvt-2",
        "japanese": "私はハノイ大学の学生です。",
        "reading": "わたしはハノイだいがくのがくせいです。",
        "romaji": "Watashi wa Hanoi daigaku no gakusei desu.",
        "vietnamese": "Tôi là sinh viên trường Đại học Hà Nội.",
        "explanation": "がくせい đọc vô thanh âm く thành [gak-sei].",
        "context": "Tự giới thiệu bản thân"
      },
      {
        "id": "ex-nvt-3",
        "japanese": "少し疲れました。",
        "reading": "すこしつかれました。",
        "romaji": "Sukoshi tsukaremashita.",
        "vietnamese": "Tôi hơi mệt một chút rồi.",
        "explanation": "すこし âm す kẹp trước c đọc thành [skoshi].",
        "context": "Than thở mệt mỏi"
      }
    ],
    "notes": [
      "Tại một số vùng phương ngữ miền Tây (Kansai), người ta ít vô thanh hóa hơn và phát âm chữ [u] rõ ràng hơn so với chuẩn Tokyo."
    ],
    "warnings": [
      "Vô thanh hóa không có nghĩa là nuốt mất hoàn toàn nhịp phách; thời lượng phách (Mora) vẫn được giữ nguyên vẹn trong dòng chảy âm thanh."
    ],
    "relatedArticles": [
      {
        "category": "notes",
        "slug": "desu-masu-va-ranh-gioi-lich-su",
        "title": "Desu / Masu không phải lúc nào cũng là 'lịch sự tuyệt đối': Sắc thái khoảng cách",
        "reason": "Cách phát âm mềm mại của đuôi câu 〜です và 〜ます"
      },
      {
        "category": "conversation",
        "slug": "giao-tiep-noi-lam-viec-aisatsu",
        "title": "Giao tiếp nơi làm việc: Chào buổi sáng, chào ra về, báo cáo Horenso",
        "reason": "Phát âm câu chào công sở: Shitsurei shimasu (phát âm thành shitsurei shimas)"
      },
      {
        "category": "notes",
        "slug": "pitch-accent-nhung-dieu-can-biet",
        "title": "Pitch accent: Những điều người mới học cần biết và những điều KHÔNG cần ép",
        "reason": "Ảnh hưởng của vô thanh hóa đến ngữ điệu câu"
      }
    ]
  },
  {
    "id": "n-luoc-bo-chu-ngu",
    "slug": "bay-tu-duy-luoc-bo-chu-ngu",
    "categoryId": "notes",
    "title": "Bẫy tư duy lược bỏ chủ ngữ: Cách xác định đối tượng hành động thông qua đuôi câu và trợ từ",
    "japaneseTitle": "主語省略の罠：文末表現と助詞から主語を読み解く",
    "summary": "Hóa giải bí ẩn lớn nhất trong ngữ pháp tiếng Nhật: Tại sao câu văn hầu như không xuất hiện 'Tôi' hay 'Bạn', và làm thế nào để biết ai đang làm gì chỉ thông qua đuôi câu?",
    "level": "ALL",
    "tags": [
      "Bẫy tư duy",
      "Chủ ngữ ẩn",
      "Ngữ pháp",
      "Dịch thuật",
      "ALL"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-nls-1",
        "title": "1. Tại sao người Nhật ghét nói 'Chủ ngữ'?",
        "content": "Trong văn hóa Nhật, việc liên tục lặp lại 'Tôi' (私 - watashi) hoặc 'Bạn' (あなた - anata) bị coi là thô lỗ, thiếu tế nhị hoặc quá quy chụp bản thân.\nKhi cả người nói và người nghe đều đã ngầm hiểu bối cảnh đối thoại, chủ ngữ LUÔN BỊ LƯỢC BỎ 100%.\nVí dụ: '明日行く？ — うん、行くよ' (Mai đi không? — Ừ, đi chứ) -> Không có chữ 'bạn' hay 'tôi' nào xuất hiện.",
        "type": "rule"
      },
      {
        "id": "sec-nls-2",
        "title": "2. Chìa khóa vàng giải mã Chủ ngữ qua Đuôi câu",
        "content": "Người Nhật bù đắp việc thiếu chủ ngữ bằng hệ thống ĐUÔI CÂU cực kỳ chặt chẽ:\n- Mong muốn bản thân: Đuôi 〜たい / 〜ほしい -> Chắc chắn chủ ngữ là 'TÔI'.\n- Nhận xét mong muốn người khác: Đuôi 〜たがっている / 〜ほしがっている -> Chắc chắn chủ ngữ là 'NGƯỜI THỨ BA'.\n- Mẫu câu cho nhận:\n  + 〜てあげる / てやる -> 'TÔI' làm cho ai đó.\n  + 〜てくれる / てくださる -> 'AI ĐÓ' làm lợi ích cho TÔI.\n  + 〜てもらう / ていただく -> TÔI nhận được hành vi từ ai đó.\n- Mẫu câu mệnh lệnh / yêu cầu: 〜てください -> Hướng tới 'BẠN'.",
        "type": "pattern"
      },
      {
        "id": "sec-nls-3",
        "title": "3. Lỗi dịch máy móc của người Việt",
        "content": "Người Việt hay có thói quen ép câu tiếng Nhật phải có chủ ngữ đầu câu như tiếng Việt, dẫn đến việc câu nào cũng mở đầu bằng [私は... 私は...]. Điều này nghe cực kỳ ngây ngô và thiếu tự nhiên.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-nls-1",
        "japanese": "駅まで送ってあげましょうか。",
        "reading": "えきまでおくってあげましょうか。",
        "romaji": "Eki made okutte agemashou ka.",
        "vietnamese": "Để tôi chở bạn ra nhà ga nhé?",
        "explanation": "Đuôi câu 〜てあげましょうか khẳng định người đề nghị lái xe là TÔI.",
        "context": "Đề nghị giúp đỡ đồng nghiệp"
      },
      {
        "id": "ex-nls-2",
        "japanese": "田中さんが傘を貸してくれました。",
        "reading": "たなかさんがかさをかしてくれました。",
        "romaji": "Tanaka-san ga kasa o kashite kuremashita.",
        "vietnamese": "Anh Tanaka đã cho tôi mượn chiếc ô.",
        "explanation": "Đuôi câu 〜てくれました khẳng định đối tượng nhận được sự giúp đỡ là TÔI.",
        "context": "Kể lại việc được giúp đỡ lúc trời mưa"
      },
      {
        "id": "ex-nls-3",
        "japanese": "コーヒーが飲みたいです。",
        "reading": "コーヒーがのみたいです。",
        "romaji": "Koohii ga nomitai desu.",
        "vietnamese": "Tôi muốn uống một tách cà phê.",
        "explanation": "Đuôi câu 〜たい khẳng định người khát nước là TÔI.",
        "context": "Tự bày tỏ nhu cầu"
      }
    ],
    "notes": [
      "Nguyên tắc: Chỉ nhắc đến tên hoặc chủ ngữ khi cần phân biệt rõ ràng giữa hai đối tượng dễ gây hiểu lầm."
    ],
    "warnings": [
      "Tránh dùng từ 'あなた' (Anata) trong giao tiếp hàng ngày; hãy dùng tên riêng [Họ/Tên + さん] để xưng hô với đối phương."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-tro-tu-wa-va-ga",
        "title": "Phân biệt trợ từ は (wa) và が (ga) - Bản chất và ngữ cảnh sử dụng",
        "reason": "Hiểu cơ chế chủ đề lược bỏ khi đối phương đã ngầm hiểu"
      },
      {
        "category": "grammar",
        "slug": "phan-biet-tai-va-hoshii",
        "title": "Phân biệt 〜たい (muốn làm) và 〜ほしい (muốn có) & quy tắc chủ ngữ",
        "reason": "Nhận diện người muốn làm thông qua đuôi たい và たがる"
      },
      {
        "category": "notes",
        "slug": "khi-nao-khong-nen-dich-word-by-word",
        "title": "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        "reason": "Đừng ép câu tiếng Nhật phải dịch rõ 'Tôi', 'Bạn'"
      }
    ]
  },
  {
    "id": "n-bon-tang-nac-van-phong",
    "slug": "bon-nac-thang-van-phong-tieng-nhat",
    "categoryId": "notes",
    "title": "Bốn nấc thang văn phong: Suồng sã (Kudaketa), Lịch sự (Teinei), Khiêm nhường (Kenjou) và Tôn kính (Sonkei)",
    "japaneseTitle": "日本語の4段階の文体：くだけた表現・丁寧語・謙譲語・尊敬語",
    "summary": "Bức tranh toàn cảnh về 4 tầng nấc biểu đạt trong tiếng Nhật: Hiểu rõ khoảng cách địa vị, mối quan hệ xã hội để tự tin chọn đúng văn phong từ bàn ăn bạn bè đến phòng họp đối tác.",
    "level": "ALL",
    "tags": [
      "Văn phong",
      "Kính ngữ",
      "Bản đồ ngôn ngữ",
      "Keigo",
      "ALL"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-nbn-1",
        "title": "1. Nấc 1: Văn phong Suồng sã (くだけた表現 - Kudaketa / Casual)",
        "content": "- Đối tượng: Bạn thân, bạn cùng lớp, người trong gia đình, người dưới.\n- Đặc điểm: Dùng thể thông thường (Futsuukei: だ, る, ない, た). Lược bỏ trợ từ は, を khi nói nhanh.\n- Ví dụ: ご飯食べる？ (Ăn cơm không?), これ美味しいね (Cái này ngon nhỉ).",
        "type": "rule"
      },
      {
        "id": "sec-nbn-2",
        "title": "2. Nấc 2: Văn phong Lịch sự tiêu chuẩn (丁寧語 - Teineigo / Polite)",
        "content": "- Đối tượng: Người mới quen, đồng nghiệp cùng cấp, người lớn tuổi hơn trong sinh hoạt thông thường.\n- Đặc điểm: Dùng đuôi câu です và ます. Thêm tiền tố お / ご trước danh từ sinh hoạt (お水, ご飯).\n- Ví dụ: ご飯を食べます (Tôi ăn cơm), これは美味しいです (Cái này ngon ạ).",
        "type": "rule"
      },
      {
        "id": "sec-nbn-3",
        "title": "3. Nấc 3 & 4: Kính ngữ cao cấp (Keigo) — Khiêm nhường vs Tôn kính",
        "content": "- Nấc 3: Khiêm nhường ngữ (謙譲語 - Kenjougo):\n  + HẠ THẤP HÀNH ĐỘNG CỦA CHÍNH MÌNH hoặc người thuộc phe mình để tôn đối phương lên.\n  + Động từ đặc biệt: 行く/来る -> 参る (mairu), 言う -> 申す (mousu), する -> いたす (itasu).\n- Nấc 4: Tôn kính ngữ (尊敬語 - Sonkeigo):\n  + NÂNG CAO HÀNH ĐỘNG CỦA ĐỐI PHƯƠNG (khách hàng, sếp, thầy cô).\n  + Động từ đặc biệt: 行く/来る/いる -> いらっしゃる (irassharu), 言う -> おっしゃる (ossharu), 食べる -> 召し上がる (meshiaagaru).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-nbn-1",
        "japanese": "明日、何時に行く？ (Casual)",
        "reading": "あした、なんじにいく？",
        "romaji": "Ashita, nanji ni iku?",
        "vietnamese": "Mai mấy giờ đi thế? (Thân mật bạn bè)",
        "explanation": "Dùng thể từ điển 行く hỏi bạn bè.",
        "context": "Nhắn tin cho bạn thân"
      },
      {
        "id": "ex-nbn-2",
        "japanese": "明日、何時に行きますか。 (Polite)",
        "reading": "あした、なんじにいきますか。",
        "romaji": "Ashita, nanji ni ikimasu ka.",
        "vietnamese": "Ngày mai mấy giờ bạn đi vậy ạ? (Lịch sự tiêu chuẩn)",
        "explanation": "Dùng thể ます trong giao tiếp xã hội lịch sự.",
        "context": "Hỏi đồng nghiệp cùng công ty"
      },
      {
        "id": "ex-nbn-3",
        "japanese": "明日の午後、私どもが御社へ伺います。 (Business / Kenjougo)",
        "reading": "あすのごご、わたしどもがおんしゃへうかがいます。",
        "romaji": "Asu no gogo, watashidomo ga onsha e ukagaimasu.",
        "vietnamese": "Chiều mai, phía chúng tôi xin phép được đến thăm quý công ty ạ. (Khiêm nhường)",
        "explanation": "伺います là khiêm nhường ngữ của 行く.",
        "context": "Trao đổi với khách hàng"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "先生が召し上がる (Tôn kính ngữ - Sonkeigo)",
          "nuance": "Hành động ăn của Thầy giáo dùng 召し上がる để tôn vinh. Hành động ăn của Bản thân dùng いただく để hạ mình khiêm tốn.",
          "example": "先生が召し上がる (Tôn kính ngữ - Sonkeigo)",
          "exampleTranslation": "私がいただく (Khiêm nhường ngữ - Kenjougo)",
          "caution": "Hành động ăn của Thầy giáo dùng 召し上がる để tôn vinh. Hành động ăn của Bản thân dùng いただく để hạ mình khiêm tốn."
        }
      ],
      "summary": "Hành động ăn của Thầy giáo dùng 召し上がる để tôn vinh. Hành động ăn của Bản thân dùng いただく để hạ mình khiêm tốn."
    },
    "notes": [
      "Không bao giờ dùng Tôn kính ngữ cho hành động của chính mình (ví dụ: '私が召し上がる' là đại họa ngớ ngẩn)."
    ],
    "warnings": [
      "Lỗi kính ngữ kép (二重敬語) như 'おっしゃられました' là thừa thãi sai quy chuẩn ngữ pháp."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        "title": "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        "reason": "Thực hành kính ngữ trong các tình huống thực tế"
      },
      {
        "category": "vocabulary",
        "slug": "phan-cap-do-trang-trong-tu-vung",
        "title": "Phân cấp độ trang trọng của từ vựng: Thân mật đến Lịch sự và Kính cẩn",
        "reason": "Bảng từ vựng phân chia theo độ trang trọng"
      },
      {
        "category": "notes",
        "slug": "desu-masu-va-ranh-gioi-lich-su",
        "title": "Desu / Masu không phải lúc nào cũng là 'lịch sự tuyệt đối': Sắc thái khoảng cách",
        "reason": "Hiểu đúng ranh giới của văn phong Teigo"
      }
    ]
  },
  {
    "id": "n-phuong-phap-shadowing",
    "slug": "phuong-phap-shadowing-thuc-chien",
    "categoryId": "notes",
    "title": "Phương pháp Shadowing thực chiến: Luyện phản xạ ngữ điệu, phát âm và nói lưu loát chuẩn bản xứ",
    "japaneseTitle": "シャドーイングの実践法：イントネーションと流暢さの養成",
    "summary": "Tuyệt kỹ luyện nói tiếng Nhật số 1 của các thông dịch viên: Nói đuổi theo giọng đọc bản xứ như chiếc bóng (Shadow) với độ trễ 0.5 giây để đánh thức toàn bộ phản xạ thanh quản.",
    "level": "ALL",
    "tags": [
      "Phương pháp học",
      "Shadowing",
      "Luyện nói",
      "Phát âm",
      "ALL"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-nps-1",
        "title": "1. Shadowing là gì?",
        "content": "Shadowing (Nói đuổi) là kỹ thuật vừa nghe một đoạn audio tiếng Nhật vừa ĐỒNG THỜI LẶP LẠI đoạn nói đó như một chiếc bóng theo sau, chỉ chậm hơn giọng đọc gốc khoảng 1 đến 2 từ (độ trễ tầm 0.5 giây).\nKhác với việc nghe xong rồi bấm dừng để nhắc lại (Repeat), Shadowing bắt buộc não bộ phải xử lý thính giác và vận động thanh quản song song trong thời gian thực.",
        "type": "rule"
      },
      {
        "id": "sec-nps-2",
        "title": "2. Quy trình 4 bước thực chiến từ dễ đến khó",
        "content": "1. Bước 1 - Nghe hiểu (Mở kịch bản): Đọc hiểu 100% ngữ nghĩa của bài hội thoại và tra hết từ mới.\n2. Bước 2 - Đồng thanh (Sync Reading): Vừa nhìn kịch bản vừa đọc cùng lúc theo audio để bắt kịp tốc độ.\n3. Bước 3 - Shadowing có nhìn kịch bản: Mắt liếc kịch bản, tai nghe audio và phát âm đuổi theo sau 0.5 giây.\n4. Bước 4 - Shadowing mù (Blind Shadowing): GẬP HOÀN TOÀN TÀI LIỆU LẠI, chỉ dùng tai nghe và miệng đuổi theo ngữ điệu, nhịp ngắt và cảm xúc của người bản xứ.",
        "type": "pattern"
      },
      {
        "id": "sec-nps-3",
        "title": "3. Lợi ích đột phá",
        "content": "- Tự động sửa Pitch accent và nhịp phách Mora mà không cần ghi nhớ quy tắc lý thuyết khô khan.\n- Khắc phục triệt để thói quen dịch nhẩm từ tiếng Việt sang tiếng Nhật trong đầu trước khi nói.\n- Cơ miệng làm quen với tốc độ nói tự nhiên của người Nhật.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-nps-1",
        "japanese": "毎日15分間のシャドーイングで、発音が見違えるほど良くなりました。",
        "reading": "まいにちじゅうごふんかんのシャドーイングで、はつおんがみちがえるほどよくなりました。",
        "romaji": "Mainichi juugofunkan no shadōingu de, hatsuon ga michigaeru hodo yoku narimashita.",
        "vietnamese": "Nhờ luyện tập Shadowing 15 phút mỗi ngày, phát âm của tôi đã tiến bộ rõ rệt đến mức ngạc nhiên.",
        "explanation": "Thói quen duy trì Shadowing ngắn mỗi ngày mang lại hiệu quả cao.",
        "context": "Chia sẻ kinh nghiệm học ngoại ngữ"
      },
      {
        "id": "ex-nps-2",
        "japanese": "最初はテキストを見ながら、慣れたら音だけでシャドーイングしましょう。",
        "reading": "さいしょはテキストをみながら、なれたらおとだけでシャドーイングしましょう。",
        "romaji": "Saisho wa tekisuto o minagara, naretara oto dake de shadōingu shimashou.",
        "vietnamese": "Ban đầu hãy vừa nhìn giáo trình, khi đã quen rồi thì chỉ dùng âm thanh để nói đuổi nhé.",
        "explanation": "Lời khuyên lộ trình luyện tập chuẩn khoa học.",
        "context": "Giảng viên hướng dẫn phương pháp học"
      },
      {
        "id": "ex-nps-3",
        "japanese": "感情を込めて真似することが、シャドーイング上達の秘訣です。",
        "reading": "かんじょうをこめてまねすることが、シャドーイングじょうたつのひけつです。",
        "romaji": "Kanjou o komete mane suru koto ga, shadōingu joutatsu no hiketsu desu.",
        "vietnamese": "Bắt chước kèm theo cảm xúc là bí quyết giúp bạn tiến bộ vượt bậc khi Shadowing.",
        "explanation": "Luyện cả ngữ điệu biểu cảm thay vì đọc như rô-bốt.",
        "context": "Bí quyết luyện nói lưu loát"
      }
    ],
    "notes": [
      "Chọn tài liệu bài nói ngắn (30 giây đến 1 phút) có nội dung đời sống tự nhiên sẽ hiệu quả hơn nhiều so với các đoạn văn tin tức dài dòng."
    ],
    "warnings": [
      "Không bắt đầu ngay bằng bài nói quá nhanh hoặc từ vựng vượt quá năng lực (sẽ gây nản lòng và hình thành tật nói vấp)."
    ],
    "relatedArticles": [
      {
        "category": "notes",
        "slug": "doc-cau-theo-nhip-mora-thay-vi-tung-chu",
        "title": "Cách đọc câu tiếng Nhật theo nhịp phách (Mora) thay vì từng chữ cái riêng rẽ",
        "reason": "Tập giữ nhịp Mora khi bắt chước giọng đọc"
      },
      {
        "category": "notes",
        "slug": "pitch-accent-nhung-dieu-can-biet",
        "title": "Pitch accent: Những điều người mới học cần biết và những điều KHÔNG cần ép",
        "reason": "Bắt chước cao độ tự nhiên không cần học thuộc ký hiệu"
      },
      {
        "category": "conversation",
        "slug": "chao-hoi-va-mo-dau-cuoc-tro-chuyen",
        "title": "Chào hỏi và mở đầu cuộc trò chuyện tự nhiên chuẩn người bản xứ",
        "reason": "Áp dụng shadowing vào các câu thoại chào hỏi hàng ngày"
      }
    ]
  },
  {
    "id": "n-nguyen-ly-srs-tu-hoc",
    "slug": "nguyen-ly-spaced-repetition-srs-tu-hoc",
    "categoryId": "notes",
    "title": "Nguyên lý Spaced Repetition (SRS): Hiểu đường cong lãng quên Ebbinghaus và chiến lược tự ôn tập",
    "japaneseTitle": "分散学習（SRS）の理論：エビングハウスの忘却曲線と自習戦略",
    "summary": "Bản chất khoa học của phương pháp Lặp lại ngắt quãng (Spaced Repetition System): Tại sao học nhồi nhét luôn thất bại và làm thế nào để biến trí nhớ ngắn hạn thành trí nhớ dài hạn vĩnh viễn.",
    "level": "ALL",
    "tags": [
      "Phương pháp học",
      "SRS",
      "Khoa học trí nhớ",
      "Tự học",
      "ALL"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-nsr-1",
        "title": "1. Đường cong lãng quên Ebbinghaus (忘却曲線)",
        "content": "Bộ não con người được thiết kế để quên đi những thông tin không đe dọa sinh tồn nhằm tiết kiệm năng lượng não bộ:\n- Sau 20 phút: Chúng ta quên mất 42% kiến thức vừa học.\n- Sau 24 giờ: Chúng ta quên tới 67% thông tin.\n- Sau 1 tuần: Gần 75% lượng từ vựng bị xóa nhòa nếu không có sự nhắc lại.\nHọc nhồi nhét một đêm trước kỳ thi (Cramming) chỉ lưu trữ thông tin ở bộ nhớ tạm thời và sẽ biến mất gần như sạch trơn sau vài ngày.",
        "type": "rule"
      },
      {
        "id": "sec-nsr-2",
        "title": "2. Cơ chế Spaced Repetition (Lặp lại ngắt quãng)",
        "content": "SRS là phương pháp can thiệp đúng vào thời điểm mà não bộ CHUẨN BỊ QUÊN thông tin đó.\nKhi bạn gợi nhớ lại một từ vựng ngay tại ranh giới của sự lãng quên, não bộ sẽ nhận tín hiệu: 'A, thông tin này vẫn đang được dùng, đây là dữ liệu quan trọng!' và củng cố liên kết nơ-ron mạnh mẽ hơn.\nChu kỳ lý tưởng:\n- Lần 1: Sau 1 ngày.\n- Lần 2: Sau 3 ngày.\n- Lần 3: Sau 7 ngày.\n- Lần 4: Sau 14 ngày.\n- Lần 5: Sau 30 ngày -> Chuyển hoàn toàn vào Trí nhớ dài hạn (Long-term memory).",
        "type": "pattern"
      },
      {
        "id": "sec-nsr-3",
        "title": "3. Ứng dụng tự học thực tế",
        "content": "- Dùng phương pháp hộp thẻ Leitner hoặc flashcard giấy truyền thống chia ngăn ngày 1, ngày 3, ngày 7.\n- Học đều đặn mỗi ngày 15-20 phút thay vì cuối tuần dồn học 5 tiếng kiệt sức.\n- Kết hợp học từ vựng trong ngữ cảnh câu văn và cụm từ thay vì học thẻ từ đơn lẻ.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-nsr-1",
        "japanese": "一度にたくさん覚えるより、復習の間隔を空けて覚えるほうが定着します。",
        "reading": "いちどにたくさんおぼえるより、ふくしゅうのかんかくをあけておぼえるほうがていちゃくします。",
        "romaji": "Ichido ni takusan oboeru yori, fukushuu no kankaku o akete oboeru hou ga teichaku shimasu.",
        "vietnamese": "Thay vì nhớ nhiều thứ cùng một lúc, việc giãn cách các lần ôn tập sẽ giúp kiến thức ghi nhớ sâu hơn.",
        "explanation": "Nguyên lý cốt lõi của việc giãn cách thời gian ôn tập.",
        "context": "Lời khuyên của chuyên gia phương pháp học"
      },
      {
        "id": "ex-nsr-2",
        "japanese": "忘れかけたタイミングで復習するのが、最も記憶効率が良いです。",
        "reading": "わすれかけたタイミングでふくしゅうするのが、もっともきおくこうりつがよいです。",
        "romaji": "Wasurekaketa taimingu de fukushuu suru no ga, mottomo kioku kouritsu ga yoi desu.",
        "vietnamese": "Ôn tập đúng vào thời điểm chuẩn bị quên là cách đạt hiệu suất ghi nhớ cao nhất.",
        "explanation": "Thời điểm vàng can thiệp vào đường cong lãng quên.",
        "context": "Bí quyết học từ vựng tiếng Nhật"
      },
      {
        "id": "ex-nsr-3",
        "japanese": "単語は文脈の中で復習することで、使い方も一緒に身につきます。",
        "reading": "たんごはぶんみゃくのなかでふくしゅうすることで、つかいかたもいっしょにみにつきます。",
        "romaji": "Tango wa bunmyaku no naka de fukushuu suru koto de, tsukaikata mo issho ni mi ni tsukimasu.",
        "vietnamese": "Ôn tập từ vựng bên trong ngữ cảnh câu giúp bạn nắm vững cả cách dùng thực tế.",
        "explanation": "Kết hợp SRS với ngữ cảnh học sinh động.",
        "context": "Định hướng tự học hiệu quả"
      }
    ],
    "notes": [
      "Handbook là thư viện tra cứu kiến thức tĩnh; bạn có thể áp dụng nguyên lý chu kỳ thời gian này vào việc tự phân bổ lịch ôn sổ tay cá nhân."
    ],
    "warnings": [
      "Đừng bao giờ dồn bài ôn tập qua nhiều ngày; lượng bài tồn đọng sẽ làm gãy chu kỳ ngắt quãng tối ưu của não bộ."
    ],
    "relatedArticles": [
      {
        "category": "notes",
        "slug": "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        "title": "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        "reason": "Ôn tập từ vựng theo cụm để nhân đôi hiệu quả ghi nhớ"
      },
      {
        "category": "kanji",
        "slug": "phuong-phap-hoc-kanji-theo-bo-thu-va-tu-ghep",
        "title": "Phương pháp học Kanji theo bộ thủ + từ ghép (Jukugo) thay vì học chữ riêng lẻ",
        "reason": "Chu kỳ lặp lại cho các bộ thủ và chữ Hán"
      },
      {
        "category": "notes",
        "slug": "khi-nao-khong-nen-dich-word-by-word",
        "title": "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        "reason": "Chiến lược tư duy trực tiếp bằng tiếng Nhật"
      }
    ]
  },
  {
    "id": "n-van-hoa-uchi-soto",
    "slug": "van-hoa-uchi-va-soto-trong-ngon-ngu",
    "categoryId": "notes",
    "title": "Khái niệm Uchi (Bên trong) và Soto (Bên ngoài): Chìa khóa hiểu cách dùng kính ngữ đúng người đúng việc",
    "japaneseTitle": "「ウチ」と「ソト」の人間関係：敬語の使い分けを決定する文化的枠組み",
    "summary": "Chìa khóa vàng giải mã bí ẩn kính ngữ công sở Nhật Bản: Khái niệm Uchi (vòng tròn thân thuộc bên trong) và Soto (thế giới khách bên ngoài) quyết định việc gọi sếp mình bằng tên trần trụi.",
    "level": "ALL",
    "tags": [
      "Văn hóa",
      "Kính ngữ",
      "Uchi và Soto",
      "Công sở",
      "ALL"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-nus-1",
        "title": "1. Vòng tròn Uchi (ウチ) và Soto (ソト) là gì?",
        "content": "Xã hội Nhật Bản vận hành dựa trên hai vòng tròn phân định ranh giới tâm lý:\n- Uchi (Bên trong): Những người thuộc phe mình, nội bộ nhóm mình (thành viên gia đình mình, đồng nghiệp trong công ty mình, bạn bè thân thiết).\n- Soto (Bên ngoài): Những người thuộc thế giới bên ngoài (khách hàng, đối tác, người lạ trên đường, người lớn tuổi khác công ty).\nQuy tắc bất biến: Luôn HẠ THẤP UCHI (phe mình) và NÂNG CAO SOTO (phe khách).",
        "type": "rule"
      },
      {
        "id": "sec-nus-2",
        "title": "2. Nghịch lý công sở: Tại sao phải gọi Sếp mình bằng tên trần trụi?",
        "content": "Khi bạn ở trong nội bộ công ty:\n- Trưởng phòng Tanaka là bề trên của bạn -> Bạn gọi là '田中部長' (Trưởng phòng Tanaka) hoặc dùng kính ngữ với sếp.\nTuy nhiên, KHI BẠN NÓI CHUYỆN VỚI ĐỐI TÁC KHÁCH HÀNG (Soto):\n- Cả bạn lẫn sếp Tanaka đều thuộc Uchi (cùng một công ty).\n- Vì vậy, trước mặt khách hàng, BẠN BẮT BUỘC PHẢI HẠ THẤP CẢ SẾP TANAKA XUỐNG để tôn khách hàng lên!\n- Cách nói chuẩn: '部長の田中は席を外しております' (Tanaka trưởng phòng bên em hiện đang vắng mặt ạ - BỎ HẲN -san, BỎ chức danh đằng sau tên!).",
        "type": "pattern"
      },
      {
        "id": "sec-nus-3",
        "title": "3. Ứng dụng trong Gia đình",
        "content": "Quy tắc tương tự áp dụng cho gia đình:\n- Ở nhà: Gọi mẹ là 'お母さん' (Okaasan).\n- Ra ngoài nói với người lạ/thầy giáo: Mẹ mình là Uchi, bắt buộc hạ xuống gọi là '母' (Haha).\nNếu nói với khách: 'お母さんが言いました' (Mẹ kính yêu của cháu nói...) sẽ bị xem là chưa trưởng thành và không biết quy tắc ứng xử xã hội.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-nus-1",
        "japanese": "田中はただいま別の電話に出ております。",
        "reading": "たなかはただいまべつのでんわにでております。",
        "romaji": "Tanaka wa tadaima betsu no denwa ni dete orimasu.",
        "vietnamese": "Anh Tanaka bên công ty chúng tôi hiện đang bận một cuộc gọi khác ạ.",
        "explanation": "Hạ thấp sếp Tanaka (Uchi) trước đối tác gọi điện đến (Soto).",
        "context": "Tiếp điện thoại của khách hàng"
      },
      {
        "id": "ex-nus-2",
        "japanese": "うちの父がいつも大変お世話になっております。",
        "reading": "うちのちちがいつもたいへんおせわになっております。",
        "romaji": "Uchi no chichi ga itsumo taihen osewa ni natte orimasu.",
        "vietnamese": "Bố cháu luôn nhận được sự giúp đỡ tận tình từ bác ạ.",
        "explanation": "Dùng うちの父 (bố cháu) khiêm tốn trước người hàng xóm.",
        "context": "Chào hỏi người quen của bố"
      },
      {
        "id": "ex-nus-3",
        "japanese": "弊社の社長から、貴社の皆様へよろしくお伝えくださいとのことです。",
        "reading": "へいしゃのしゃちょうから、きしゃのみなさまへよろしくおつたえくださいとのことです。",
        "romaji": "Heisha no shachou kara, kisha no minasama e yoroshiku otsutae kudasai to no koto desu.",
        "vietnamese": "Giám đốc công ty chúng tôi xin gửi lời chào trân trọng tới toàn thể quý công ty.",
        "explanation": "Sử dụng 弊社 (công ty tôi - khiêm nhường) và 貴社 (công ty quý khách - tôn kính).",
        "context": "Gửi lời chào trang trọng giữa hai doanh nghiệp"
      }
    ],
    "notes": [
      "Ranh giới Uchi và Soto có tính tương đối và linh hoạt: Khi nói chuyện với người bộ phận khác trong cùng tập đoàn, phòng của bạn là Uchi, phòng khác là Soto."
    ],
    "warnings": [
      "Tuyệt đối không nói '田中部長様' hay '田中さん' khi giao tiếp với đối tác bên ngoài công ty."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "chu-han-nhom-con-nguoi-gia-dinh",
        "title": "Chữ Hán nhóm Con người & Gia đình: 父, 母, 兄, 弟, 姉, 妹, 男, 女, 子",
        "reason": "Chữ Hán và cách gọi người nhà (Uchi) vs gia đình người khác (Soto)"
      },
      {
        "category": "conversation",
        "slug": "giao-tiep-noi-lam-viec-aisatsu",
        "title": "Giao tiếp nơi làm việc: Chào buổi sáng, chào ra về, báo cáo Horenso",
        "reason": "Quy tắc hạ thấp sếp của mình khi nói chuyện với khách hàng"
      },
      {
        "category": "notes",
        "slug": "bon-nac-thang-van-phong-tieng-nhat",
        "title": "Bốn nấc thang văn phong: Suồng sã, Lịch sự, Khiêm nhường và Tôn kính",
        "reason": "Mối liên hệ giữa nấc thang văn phong và vòng tròn Uchi-Soto"
      }
    ]
  }
];
