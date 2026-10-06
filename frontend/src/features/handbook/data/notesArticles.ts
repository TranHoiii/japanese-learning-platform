import { HandbookArticle } from "../types";

export const notesArticles: HandbookArticle[] = [
  // 1. Article 1 (Gốc)
  {
    id: "n-bay-dich-thuat",
    slug: "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
    categoryId: "notes",
    title: "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
    japaneseTitle: "ベトナム人学習者が陥りやすい翻訳の罠",
    summary:
      "Vạch trần các lỗi tư duy dịch từng từ (word-by-word) từ tiếng Việt: Sự khác biệt tai hại giữa お疲れ様 và ご苦労様, bẫy từ '大丈夫', và bị động bị hại.",
    level: "ALL",
    tags: ["Kinh nghiệm", "Bẫy dịch thuật", "Giao tiếp", "Văn hóa", "N5", "N4"],
    readTimeMinutes: 7,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-bd-1",
        title: "1. Bẫy số 1: お疲れ様です (Otsukaresama) vs ご苦労様です (Gokurousama)",
        content:
          "Rất nhiều người học mới sang Nhật chào sếp hoặc khách hàng bằng 'ご苦労様です'. Đây là một sai lầm nghiêm trọng về cấp bậc:\n- ご苦労様 (Gokurousama): Chỉ dành cho người bề trên nói với người bề dưới (sếp nói với nhân viên hoàn thành tốt việc được giao).\n- お疲れ様 (Otsukaresama): Dành cho nhân viên chào sếp, đồng nghiệp chào nhau sau giờ làm việc vất vả.",
        type: "rule",
      },
      {
        id: "sec-bd-2",
        title: "2. Bẫy số 2: Từ '大丈夫' (Daijoubu) trong nhà hàng / cửa hàng tiện lợi",
        content:
          "Khi nhân viên hỏi 'レシートは大丈夫ですか？' (Quý khách có cần hóa đơn không?) hoặc 'お水のおかわりは大丈夫ですか？' (Bạn có muốn thêm nước không?):\n- Nếu bạn trả lời '大丈夫です' với nụ cười nhẹ -> Người Nhật hiểu là 'Tôi không cần đâu, tôi ổn rồi (Từ chối khéo)'.\n- Người Việt hay nghĩ 'Đại trượng phu = Ổn = Vâng cứ cho tôi đi', dẫn đến tình huống hiểu nhầm dở khóc dở cười.",
        type: "pattern",
      },
      {
        id: "sec-bd-3",
        title: "3. Bẫy số 3: Thể bị động tiếng Nhật thường mang nghĩa 'Bị hại' (迷惑受け身)",
        content:
          "Trong tiếng Việt, 'Tôi được khen' hay 'Tôi bị mắng' đều bình thường. Nhưng trong tiếng Nhật, câu bị động gián tiếp hầu như luôn biểu thị sự phiền phức, bực bội mà chủ thể phải gánh chịu (ví dụ: 雨に降られた - Bị dính mưa xui xẻo). Đừng dịch câu tích cực của tiếng Việt sang thể bị động tiếng Nhật một cách bừa bãi.",
        type: "text",
      },
    ],
    examples: [
      {
        id: "ex-bd-1",
        japanese: "部長、今日もお疲れ様でした！",
        reading: "ぶちょう、きょうもおつかれさまでした！",
        romaji: "Buchou, kyou mo otsukaresama deshita!",
        vietnamese: "Thưa trưởng phòng, hôm nay anh cũng đã vất vả rồi ạ!",
        explanation: "Lời chào đúng chuẩn mực của cấp dưới dành cho cấp trên khi tan ca.",
        context: "Chào tạm biệt ở công sở",
      },
      {
        id: "ex-bd-2",
        japanese: "店員: お箸はご利用ですか。\n客: あ、大丈夫です。持っていますので。",
        reading: "てんいん: おはしはごりようですか。\nきゃく: あ、だいじょうぶです。もっていますので。",
        romaji: "Ten'in: Ohashi wa goriyou desu ka.\nKyaku: A, daijoubu desu. Motte imasu node.",
        vietnamese: "Nhân viên: Quý khách có dùng đũa không ạ?\nKhách: À, tôi không cần đâu ạ. Tôi có mang theo sẵn rồi.",
        explanation: "大丈夫です kết hợp với ngữ cảnh từ chối nhận đồ dùng một lần.",
        context: "Mua đồ ở konbini",
      },
    ],
    comparisons: {
      title: "Đối chiếu câu chào tan làm: お疲れ様 vs ご苦労様",
      items: [
        {
          subject: "お疲れ様です (Otsukaresama desu)",
          nuance: "An toàn tuyệt đối cho mọi mối quan hệ: Dưới nói với Trên, Đồng nghiệp nói với nhau",
          formula: "Dưới -> Trên / Ngang hàng",
          example: "先輩、お疲れ様です！",
          exampleTranslation: "Tiền bối, anh đã vất vả rồi ạ!",
          caution: "Luôn dùng câu này khi bạn ở vị thế người mới hoặc cấp dưới.",
        },
        {
          subject: "ご苦労様です (Gokurousama desu)",
          nuance: "Chỉ người bề trên nói với kẻ dưới (như tướng quân khen ngợi lính sau chiến dịch)",
          formula: "Trên -> Dưới (ĐỘC QUYỀN)",
          example: "みんな、ご苦労だったね。",
          exampleTranslation: "Mọi người vất vả rồi, tốt lắm.",
          caution: "Tuyệt đối không bao giờ nói câu này với cấp trên, sếp, khách hàng hay thầy cô.",
        },
      ],
      summary: "Nếu phân vân không biết dùng từ nào, hãy chọn 100% お疲れ様です.",
    },
    notes: [
      "Tiếng Nhật cực kỳ coi trọng vai vế xã hội (Uchi/Soto, Thượng/Hạ). Hãy luôn đặt mình vào vị thế khiêm tốn trước khi cất lời.",
    ],
    warnings: [
      "Tránh dịch máy móc 'Bạn có khỏe không?' thành 'お元気ですか？' mỗi ngày khi gặp đồng nghiệp. Câu này người Nhật chỉ dùng khi lâu ngày không gặp nhau (vài tuần hoặc vài tháng). Gặp hàng ngày hãy dùng 'おはようございます'.",
    ],
    relatedArticles: [
      {
        category: "conversation",
        slug: "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        title: "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        reason: "Học sâu hơn về quy tắc xưng hô công sở",
      },
      {
        category: "notes",
        slug: "khi-nao-khong-nen-dich-word-by-word",
        title: "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        reason: "Tổng kết các trường hợp dịch word-by-word gây hậu quả nghiêm trọng",
      },
    ],
  },

  // 2. Article 2 (Gốc)
  {
    id: "n-hoc-collocation",
    slug: "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
    categoryId: "notes",
    title: "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
    japaneseTitle: "効果的なコロケーション（連語）学習法",
    summary:
      "Bí quyết tối ưu tốc độ ghi nhớ và phản xạ tự nhiên: Gom từ vựng thành từng cụm 'Danh từ + Trợ từ + Động từ' hoàn chỉnh để không bao giờ ghép sai.",
    level: "ALL",
    tags: ["Kinh nghiệm", "Phương pháp học", "Collocation", "Từ vựng", "N5", "N4"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-cl-1",
        title: "1. Tại sao học từ đơn lẻ là nguyên nhân khiến bạn nói vấp?",
        content:
          "Khi học từ đơn lẻ (ví dụ học từ 'thuốc' là 薬, 'uống' là 飲む, 'ăn' là 食べる), não bạn phải thực hiện 3 bước chậm chạp khi giao tiếp: Tìm danh từ -> Tìm trợ từ -> Tìm động từ. Nếu tiếng Việt nói 'uống thuốc' mà dịch sang tiếng Anh lại là 'take medicine', bạn sẽ phân vân không biết tiếng Nhật dùng động từ nào.",
        type: "text",
      },
      {
        id: "sec-cl-2",
        title: "2. Danh sách Collocation kinh điển bắt buộc thuộc lòng",
        content:
          "Hãy nạp vào não bộ nguyên khối cụm từ hoàn chỉnh dưới đây:",
        type: "table",
        tableData: {
          headers: ["Cụm từ Collocation", "Cách đọc", "Ý nghĩa", "Điểm cần lưu ý"],
          rows: [
            ["風邪を引く", "かぜをひく", "Bị cảm cúm", "Dùng động từ 引く chứ không dùng なる"],
            ["薬を飲む", "くすりをのむ", "Uống/dùng thuốc", "Tiếng Nhật xem thuốc viên/nước đều là 飲む"],
            ["夢を見る", "ゆめをみる", "Nằm mơ thấy...", "Mơ là 'nhìn thấy giấc mơ' (見る)"],
            ["熱がある / 熱が出る", "ねつがある / ねつがでる", "Bị sốt / Lên cơn sốt", "Trạng thái có sốt (ある) vs Phát sốt (出る)"],
            ["帽子をかぶる", "ぼうしをかぶる", "Đội mũ", "Động từ riêng cho đầu/mũ là かぶる"],
            ["眼鏡をかける", "めがねをかける", "Đeo kính", "Động từ riêng cho kính mắt là かける"],
            ["靴を履く", "くつをはく", "Đi giày/dép/quần", "Mặc từ thắt lưng trở xuống là 履く (はく)"],
            ["服を着る", "ふくをきる", "Mặc áo", "Mặc từ cổ đến thân là 着る (きる)"],
          ],
        },
      },
      {
        id: "sec-cl-3",
        title: "3. Cách tạo thẻ ghi nhớ Collocation hiệu quả",
        content:
          "Mỗi khi học một từ mới, hãy luôn tìm một danh từ hoặc động từ đi cặp thường xuyên nhất của nó. Ví dụ học từ ピアノ (piano) -> Ghi nhớ luôn cụm ピアノを弾く (ひく - chơi đàn piano).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-cl-1",
        japanese: "昨日から風邪を引いて、熱があります。",
        reading: "きのうからかぜをひいて、ねつがあります。",
        romaji: "Kinou kara kaze o hiite, netsu ga arimasu.",
        vietnamese: "Từ hôm qua tôi đã bị cảm cúm và đang bị sốt.",
        explanation: "Sử dụng đồng thời 2 cụm collocation chuẩn: 風邪を引く và 熱がある.",
        context: "Xin nghỉ ốm",
      },
      {
        id: "ex-cl-2",
        japanese: "寒いので、帽子をかぶって出かけましょう。",
        reading: "さむいので、ぼうしをかぶってでかけましょう。",
        romaji: "Samui node, boushi o kabutte dekakemashou.",
        vietnamese: "Trời lạnh nên chúng mình hãy đội mũ rồi ra ngoài nhé.",
        explanation: "Dùng đúng động từ かぶる cho mũ thay vì 着る (mặc quần áo).",
        context: "Chuẩn bị đi ra ngoài",
      },
    ],
    comparisons: {
      title: "Học từ đơn lẻ vs Học theo cụm Collocation",
      items: [
        {
          subject: "Học từ đơn lẻ (Chậm chạp & Dễ sai trợ từ)",
          nuance: "Não phải dịch từng từ và suy nghĩ trợ từ ở giữa mỗi khi nói",
          formula: "N [nghĩ trợ từ?] + V [nghĩ động từ?]",
          example: "薬... を? で? 飲む?",
          exampleTranslation: "Mất 3-5 giây để ghép nối trong đầu.",
          caution: "Rất dễ mắc lỗi dịch thẳng từ tiếng mẹ đẻ sang.",
        },
        {
          subject: "Học theo Collocation (Phản xạ tức thì)",
          nuance: "Não lưu trữ như một khối âm thanh duy nhất không thể tách rời",
          formula: "[Danh từ + Trợ từ + Động từ] = 1 Khối",
          example: "薬を飲む (Kusuri o nomu)",
          exampleTranslation: "Bật ra tự nhiên không cần suy nghĩ.",
          caution: "Luôn chú ý phát âm liền mạch không ngắt giữa chừng.",
        },
      ],
      summary: "Muốn nói tiếng Nhật trôi chảy tự nhiên, hãy biến mọi từ vựng thành cụm Collocation.",
    },
    notes: [
      "Bộ động từ đeo mặc trong tiếng Nhật chia theo bộ phận cơ thể: Đầu (かぶる) - Mắt (かける) - Thân (きる) - Chân (はく) - Cổ/Tay (巻く/つける).",
    ],
    warnings: [
      "Đừng cố nhồi nhét quá nhiều cụm từ hiếm gặp cùng lúc. Hãy ưu tiên 100 cụm từ gắn liền với thói quen sinh hoạt hàng ngày trước.",
    ],
    relatedArticles: [
      {
        category: "vocabulary",
        slug: "pho-tu-chi-muc-do-thuong-gap",
        title: "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
        reason: "Ghép phó từ vào các cụm Collocation để tăng độ biểu cảm",
      },
      {
        category: "grammar",
        slug: "phan-biet-tu-dong-tu-va-tha-dong-tu",
        title: "Bản chất Tự động từ (Jidoushi) & Tha động từ (Tadoushi) kèm cặp từ thông dụng",
        reason: "Phân biệt trợ từ đi cùng các cụm tự động từ và tha động từ",
      },
    ],
  },

  // 3. Article 3 (Mới: は và が những lỗi người Việt thường mắc)
  {
    id: "n-loi-dung-wa-ga",
    slug: "loi-thuong-gap-khi-dung-wa-va-ga",
    categoryId: "notes",
    title: "Trợ từ は và が — Những lỗi tư duy người Việt hay mắc phải nhất và cách sửa",
    japaneseTitle: "「は」と「が」でよくある誤用パターンと修正法",
    summary:
      "Tổng hợp 3 lỗi sai kinh điển người Việt hay gặp khi dùng は và が: Bẫy dịch từ 'thì/là', sai trợ từ trong câu nghi vấn với từ để hỏi, và dùng は trong mệnh đề định ngữ.",
    level: "ALL",
    tags: ["Ghi chú", "Lỗi thường gặp", "は", "が", "Trợ từ", "N5"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-lwg-1",
        title: "1. Lỗi 1: Tự hỏi 'Từ để hỏi' nhưng lại đặt は (Ai đến thế?)",
        content:
          "- Câu sai: × だれは来ますか (SAI)\n- Câu đúng: ○ だれが来ますか (ĐÚNG)\nNguyên tắc vàng: Từ để hỏi (誰, 何, どこ) đại diện cho thông tin chưa biết (Unknown info), do đó KHÔNG BAO GIỜ có thể làm chủ đề cũ (Topic - は). Nó bắt buộc phải đi với tiêu điểm が. Tương tự, câu trả lời cũng bắt buộc dùng が: 田中さんが来ます.",
        type: "rule",
      },
      {
        id: "sec-lwg-2",
        title: "2. Lỗi 2: Dùng は trong mệnh đề bổ nghĩa cho danh từ",
        content:
          "- Câu sai: × 私 は 買った本は面白いです (SAI)\n- Câu đúng: ○ 私 が 買った本は面白いです (ĐÚNG)\nNguyên tắc: Trong mệnh đề phụ bổ nghĩa (Subordinate Clause), chủ ngữ nhỏ của hành động bổ nghĩa luôn phải hạ xuống đi với が để không tranh chấp với chủ đề lớn của câu chính.",
        type: "rule",
      },
      {
        id: "sec-lwg-3",
        title: "3. Lỗi 3: Dịch máy móc từ 'là' trong tiếng Việt",
        content:
          "Trong tiếng Việt, 'Tôi LÀ sinh viên' (là) và 'Hôm nay LÀ chủ nhật' (là). Nhiều bạn nghĩ cứ có 'là' thì điền は. Nhưng trong câu: 'Người đứng đằng kia LÀ ai?', nếu dịch 'あそこに立っている人は誰ですか' thì đúng; nhưng câu 'Ai LÀ người giỏi nhất?' lại phải là '誰が一番上手ですか'.",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-lwg-1",
        japanese: "A: 誰がケーキを食べましたか。\nB: 私が食べました！",
        reading: "A: だれがケーキをたべましたか。\nB: わたしがたべました！",
        romaji: "A: Dare ga keeki o tabemashita ka.\nB: Watashi ga tabemashita!",
        vietnamese: "A: Ai đã ăn chiếc bánh kem thế?\nB: Chính tôi đã ăn đấy ạ!",
        explanation: "Cả câu hỏi lẫn câu trả lời cho từ để hỏi đều tuân thủ trợ từ が.",
        context: "Hỏi và nhận trách nhiệm",
      },
    ],
    comparisons: {
      title: "Bảng đối chiếu lỗi sai vs Cách sửa đúng",
      items: [
        {
          subject: "Sai: 誰は来ますか",
          nuance: "Từ để hỏi đi với は phá vỡ logic chủ đề của tiếng Nhật",
          formula: "Sai: Từ để hỏi + は",
          example: "× 何は好きですか",
          exampleTranslation: "Lỗi sai thường thấy ở N5",
          caution: "Luôn đổi sang が khi chủ ngữ là từ để hỏi.",
        },
        {
          subject: "Đúng: 誰が来ますか",
          nuance: "Tiêu điểm chỉ định danh tính chính xác",
          formula: "Đúng: Từ để hỏi + が",
          example: "○ 何が好きですか",
          exampleTranslation: "Bạn thích cái gì thế?",
          caution: "Chuẩn xác 100%.",
        },
      ],
      summary: "Gặp từ để hỏi làm chủ ngữ -> 100% chọn が.",
    },
    notes: [
      "Khi so sánh 2 vế tương phản, luôn dùng は: お酒は飲みませんが、お茶は飲みます (Rượu thì tôi không uống nhưng trà thì tôi uống).",
    ],
    warnings: [
      "Không bao giờ dùng は trong câu hỏi 'Ai là người...' (Dare wa... là sai tuyệt đối).",
    ],
    relatedArticles: [
      {
        category: "grammar",
        slug: "phan-biet-tro-tu-wa-va-ga",
        title: "Phân biệt trợ từ は (wa) và が (ga) - Bản chất và ngữ cảnh sử dụng",
        reason: "Bài viết lý thuyết nền tảng",
      },
      {
        category: "notes",
        slug: "khi-nao-khong-nen-dich-word-by-word",
        title: "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        reason: "Tránh bẫy dịch từ 'là' sang trợ từ",
      },
    ],
  },

  // 4. Article 4 (Mới: に và で checklist chọn trợ từ nhanh)
  {
    id: "n-checklist-ni-de",
    slug: "checklist-chon-tro-tu-ni-va-de",
    categoryId: "notes",
    title: "Checklist 30 giây chọn nhanh trợ từ に hay で không bao giờ nhầm",
    japaneseTitle: "「に」と「で」の即時判断チェックリスト",
    summary:
      "Cẩm nang 3 câu hỏi trắc nghiệm tâm lý giúp bạn quyết định trong 30 giây chọn trợ từ に hay で khi nói về địa điểm, nơi chốn và hoàn cảnh.",
    level: "N5",
    tags: ["Ghi chú", "Checklist", "Trợ từ", "に", "で", "N5"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-cnd-1",
        title: "1. Câu hỏi 1: Động từ có phải là 'TỒN TẠI TĨNH' không?",
        content:
          "Nếu động từ trong câu là: ある (có - vật), いる (ở - người/động vật), 住む (sống), 座る (ngồi), 泊まる (trọ lại) -> BẮT BUỘC CHỌN に.\nVí dụ: 部屋にいます (Ở trong phòng), ホテルに泊まります (Nghỉ ở khách sạn).",
        type: "rule",
      },
      {
        id: "sec-cnd-2",
        title: "2. Câu hỏi 2: Nơi chốn có phải là 'SÂN KHẤU HÀNH ĐỘNG' không?",
        content:
          "Nếu con người thực hiện một hành động tiêu hao năng lượng (Ăn, uống, học, làm việc, tập thể dục, mua sắm) -> BẮT BUỘC CHỌN で.\nVí dụ: レストランで食べます (Ăn ở nhà hàng), 会社で働きます (Làm việc ở công ty).",
        type: "rule",
      },
      {
        id: "sec-cnd-3",
        title: "3. Câu hỏi 3: Trường hợp đặc biệt của sự kiện (Event)",
        content:
          "Khi một sự kiện, lễ hội, bữa tiệc diễn ra, dù dùng động từ ある nhưng địa điểm diễn ra BẮT BUỘC DÙNG で:\n- 公園でお祭りがあります (Ở công viên có lễ hội diễn ra).\n- 東京で会議があります (Ở Tokyo diễn ra cuộc họp).",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-cnd-1",
        japanese: "机の上にペンがあります。図書館で本を読みます。",
        reading: "つくえのうえにペンがあります。としょかんでほんをよみます。",
        romaji: "Tsukue no ue ni pen ga arimasu. Toshokan de hon o yomimasu.",
        vietnamese: "Trên bàn có cái bút (に). Tôi đọc sách ở thư viện (で).",
        explanation: "So sánh trực diện: Tồn tại tĩnh (に) vs Hành động tích cực (で).",
        context: "Minh họa checklist",
      },
    ],
    comparisons: {
      title: "Checklist 30 giây: に vs で",
      items: [
        {
          subject: "Trợ từ に (Đích đến / Tĩnh tại)",
          nuance: "Chỉ vị trí tồn tại, điểm bám đích đến của di chuyển",
          formula: "Nơi chốn + に + [いる/ある/住む/座る/入る/乗る]",
          example: "椅子に座る (Ngồi vào ghế)",
          exampleTranslation: "Isu ni suwaru",
          caution: "Không dùng に nếu động từ là ăn/học/làm việc.",
        },
        {
          subject: "Trợ từ で (Sân khấu / Công cụ)",
          nuance: "Nơi diễn ra hành vi, phương tiện công cụ, địa điểm sự kiện",
          formula: "Nơi chốn + で + [Ăn/Học/Chạy/Làm/Tổ chức sự kiện]",
          example: "教室で勉強する (Học trong lớp)",
          exampleTranslation: "Kyoushitsu de benkyou suru",
          caution: "Sự kiện (party, festival) luôn đi với で.",
        },
      ],
      summary: "Ở đâu có cái gì -> に; Ở đâu làm cái gì / Diễn ra sự kiện gì -> で.",
    },
    notes: [
      "Với phương tiện giao thông: Di chuyển BẰNG phương tiện gì -> で (バスで行く); Bước LÊN phương tiện nào -> に (バスに乗る).",
    ],
    warnings: [
      "Không nói: '公園にお祭りがあります' (Sai trợ từ khi nói về sự kiện diễn ra).",
    ],
    relatedArticles: [
      {
        category: "grammar",
        slug: "phan-biet-ni-va-de",
        title: "Phân biệt trợ từ に (ni) và で (de) chỉ nơi chốn & thời gian",
        reason: "Bài phân tích chi tiết trợ từ に và で",
      },
      {
        category: "notes",
        slug: "loi-thuong-gap-khi-dung-wa-va-ga",
        title: "Trợ từ は và が — Những lỗi tư duy người Việt hay mắc phải nhất và cách sửa",
        reason: "Cùng làm chủ các cặp trợ từ quan trọng",
      },
    ],
  },

  // 5. Article 5 (Mới: です / ます không phải lúc nào cũng lịch sự tuyệt đối)
  {
    id: "n-desu-masu-lich-su",
    slug: "desu-masu-va-ranh-gioi-lich-su",
    categoryId: "notes",
    title: "Desu / Masu không phải lúc nào cũng là 'lịch sự tuyệt đối': Sắc thái khoảng cách tâm lý",
    japaneseTitle: "「です・ます」の心理的距離と使われ方",
    summary:
      "Hiểu đúng bản chất của thể ていねい (Desu/Masu): Nó không chỉ biểu thị sự lịch sự, mà còn là ranh giới giữ khoảng cách tâm lý (Soto) giữa những người chưa thân thiết.",
    level: "ALL",
    tags: ["Ghi chú", "Desu", "Masu", "Khoảng cách tâm lý", "Văn hóa", "N4"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-dm-1",
        title: "1. 'Khoảng cách lịch thiệp' trong văn hóa Nhật",
        content:
          "Nhiều bạn nghĩ nói 'です/ます' càng nhiều thì càng được yêu quý. Nhưng nếu bạn đã chơi thân với một người bạn Nhật suốt 1 năm mà vẫn nói 'そうですか、わかりました' bằng thể Desu/Masu, họ sẽ cảm thấy bạn đang dựng lên một 'bức tường vô hình' ngăn cách sự gần gũi.",
        type: "text",
      },
      {
        id: "sec-dm-2",
        title: "2. Thời điểm thích hợp để chuyển từ Desu/Masu sang thể thông thường (Tameguchi)",
        content:
          "Khi bạn bè cùng trang lứa hoặc đồng nghiệp cùng tuổi rủ: 'ため口でいいよ' (Cứ nói chuyện tự nhiên bằng thể thường đi nhé) hoặc họ bắt đầu chuyển sang dùng thể ngắn (だ, だよ, ね), đó là tín hiệu họ muốn rút ngắn khoảng cách tâm lý với bạn.",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-dm-1",
        japanese: "A: もう敬語じゃなくていいよ！タメ口で話そう。\nB: え、本当？じゃあ、これからは普通に話すね！",
        reading: "A: もうけいごじゃなくていいよ！タメぐちではなそう。\nB: え、ほんとう？じゃあ、これからはふつうにはなすね！",
        romaji: "A: Mou keigo ja nakute ii yo! Tameguchi de hanasou.\nB: E, hontou? Jaa, korekara wa futsuu ni hanasu ne!",
        vietnamese: "A: Thôi không cần dùng kính ngữ nữa đâu! Cứ nói chuyện tự nhiên như bạn bè nhé.\nB: Ơ thật hả? Thế thì từ nay tớ sẽ nói chuyện bình thường nhé!",
        explanation: "Khoảnh khắc phá bỏ bức tường lịch sự để trở thành bạn bè thân thiết.",
        context: "Chuyển giao phong cách giao tiếp bạn bè",
      },
    ],
    comparisons: {
      title: "Thể Desu/Masu vs Thể thường (Tameguchi)",
      items: [
        {
          subject: "Thể Desu/Masu (Lịch sự & Khoảng cách an toàn)",
          nuance: "Tôn trọng nhưng giữ ranh giới khách sáo, an toàn cho người mới quen",
          formula: "〜です / 〜ます",
          example: "何を食べますか。",
          exampleTranslation: "Bạn ăn cái gì ạ?",
          caution: "Nếu dùng với bạn thân sẽ nghe như người xa lạ.",
        },
        {
          subject: "Thể thường (Thân mật & Không khoảng cách)",
          nuance: "Ấm áp, chia sẻ cảm xúc không phòng thủ, dành cho bạn thân và gia đình",
          formula: "Thể từ điển / Thể ngắn",
          example: "何食べる？",
          exampleTranslation: "Ăn gì đấy?",
          caution: "Tuyệt đối không dùng với sếp, người lạ hoặc người lớn tuổi.",
        },
      ],
      summary: "Người mới gặp -> Desu/Masu là lịch sự. Bạn thân lâu năm -> Desu/Masu là xa cách.",
    },
    notes: [
      "Tại nơi làm việc, dù thân thiết đến mấy ngoài giờ làm, khi bước vào phòng họp chính thức trước mặt người ngoài, vẫn phải quay lại dùng Desu/Masu.",
    ],
    warnings: [
      "Đừng tự ý chuyển sang thể thường (Tameguchi) với người lớn tuổi hơn bạn hoặc cấp trên nếu họ chưa chủ động đề nghị.",
    ],
    relatedArticles: [
      {
        category: "conversation",
        slug: "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        title: "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        reason: "Cấp độ cao hơn của Desu/Masu là Keigo",
      },
      {
        category: "conversation",
        slug: "chao-hoi-va-mo-dau-cuoc-tro-chuyen",
        title: "Chào hỏi và mở đầu cuộc trò chuyện tự nhiên chuẩn người bản xứ",
        reason: "Ứng dụng thể nói phù hợp khi bắt chuyện",
      },
    ],
  },

  // 6. Article 6 (Mới: Khi nào không nên dịch word-by-word)
  {
    id: "n-khong-dich-word-by-word",
    slug: "khi-nao-khong-nen-dich-word-by-word",
    categoryId: "notes",
    title: "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
    japaneseTitle: "直訳を避けるべき日本語の言語習慣",
    summary:
      "Chỉ ra những vùng kiến thức dịch sát nghĩa từng chữ sẽ tạo ra câu tiếng Nhật tối nghĩa hoặc thô lỗ: Câu cảm thán, câu từ chối, cách chào hỏi và các động từ đi kèm cơ thể.",
    level: "ALL",
    tags: ["Ghi chú", "Dịch thuật", "Tư duy tiếng Nhật", "Lỗi sai", "N5"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-ww-1",
        title: "1. Vấn đề của phương pháp dịch từng chữ (Word-by-word)",
        content:
          "Tiếng Việt và tiếng Nhật thuộc hai ngữ hệ hoàn toàn khác nhau về cấu trúc lẫn thế giới quan văn hóa. Dịch nguyên văn từng từ tiếng Việt sang tiếng Nhật là nguyên nhân số 1 khiến câu nói của bạn nghe lủng củng, 'như dịch từ Google' và làm người Nhật bối rối.",
        type: "text",
      },
      {
        id: "sec-ww-2",
        title: "2. Bảng các câu kinh điển CẤM DỊCH WORD-BY-WORD",
        content:
          "Dưới đây là các câu đối chiếu giữa cách dịch máy móc người Việt hay nghĩ và cách nói tự nhiên chuẩn bản xứ:",
        type: "table",
        tableData: {
          headers: ["Ý tiếng Việt muốn nói", "Dịch sát chữ (CẦN TRÁNH)", "Cách nói chuẩn người Nhật"],
          rows: [
            ["Bạn ăn cơm chưa?", "ご飯を食べましたか (Nghe tò mò)", "こんにちは / お疲れ様です"],
            ["Tôi không muốn đi", "行きたくないです (Quá thô lỗ)", "行きたいのはやまやまですが、都合が悪くて..."],
            ["Uống thuốc", "薬を食べる (Ăn thuốc)", "薬を飲む (Kusuri o nomu)"],
            ["Tôi có hẹn với bác sĩ", "約束があります (Hẹn bạn chơi)", "予約があります (Yoyaku ga arimasu)"],
            ["Đi vệ sinh", "トイレに行く (Quá thẳng)", "お手洗いに失礼します / ちょっと席を外します"],
          ],
        },
      },
    ],
    examples: [
      {
        id: "ex-ww-1",
        japanese: "A: 今日、一緒に帰りませんか。\nB: あ、今日はちょっと野暮用があって...",
        reading: "A: きょう、いっしょにかえりませんか。\nB: あ、きょうはちょっとやぼようがあって...",
        romaji: "A: Kyou, issho ni kaerimasen ka.\nB: A, kyou wa chotto yaboyou ga atte...",
        vietnamese: "A: Hôm nay cùng về chung không?\nB: À, hôm nay tớ lại kẹt chút việc riêng mất rồi...",
        explanation: "Thay vì nói thẳng 'Tôi không muốn về cùng', người Nhật dùng 'ちょっと野暮用があって' (hơi kẹt chút việc).",
        context: "Từ chối khéo léo",
      },
    ],
    comparisons: {
      title: "Tư duy dịch tiếng Việt vs Tư duy tiếng Nhật",
      items: [
        {
          subject: "Tư duy dịch từng chữ (Tiếng Việt -> Nhật)",
          nuance: "Nghĩ câu tiếng Việt trong đầu rồi tra từ tương ứng để ghép vào",
          formula: "Chủ ngữ + Trợ từ + Vị ngữ (dịch từng từ)",
          example: "私の趣味は音楽を聴くことです。(Sách vở)",
          exampleTranslation: "Sở thích của tôi là nghe nhạc.",
          caution: "Gượng gạo và tốn 3-4 giây xử lý trong não.",
        },
        {
          subject: "Tư duy theo tình huống (Người Nhật nói gì)",
          nuance: "Ghi nhớ nguyên mẫu câu người Nhật phản xạ trong tình huống đó",
          formula: "Tình huống -> Mẫu câu bản xứ bật ra",
          example: "休みの日はよく音楽を聴いています。(Tự nhiên)",
          exampleTranslation: "Ngày nghỉ tôi hay nghe nhạc.",
          caution: "Bật ra phản xạ tức thì.",
        },
      ],
      summary: "Đừng hỏi 'Câu này tiếng Nhật dịch từng chữ là gì?'. Hãy hỏi 'Trong hoàn cảnh này người Nhật nói câu gì?'.",
    },
    notes: [
      "Học ngoại ngữ là học văn hóa và thói quen tư duy của người bản xứ, không phải bài tập thay thế từ vựng toán học.",
    ],
    warnings: [
      "Không hỏi 'Bạn ăn cơm chưa' (Gohan tabemashita ka) thay cho lời chào buổi trưa với người Nhật, vì họ sẽ tưởng bạn đang rủ họ đi ăn hoặc tò mò đời sống cá nhân của họ.",
    ],
    relatedArticles: [
      {
        category: "notes",
        slug: "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        title: "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        reason: "Bài học chi tiết các bẫy dịch thuật",
      },
      {
        category: "notes",
        slug: "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        title: "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        reason: "Học theo cụm để tránh dịch sai",
      },
    ],
  },

  // 7. Article 7 (Mới: Đọc câu theo mora thay vì từng chữ cái)
  {
    id: "n-doc-theo-mora",
    slug: "doc-cau-theo-nhip-mora-thay-vi-tung-chu",
    categoryId: "notes",
    title: "Cách đọc câu tiếng Nhật theo nhịp phách (Mora) thay vì từng chữ cái riêng rẽ",
    japaneseTitle: "モーラ（拍）感覚で読む日本語リズム",
    summary:
      "Bí mật giúp nói tiếng Nhật mượt mà không vấp: Nắm vững khái niệm Mora (phách nhịp), quy tắc trường âm (2 phách), âm ngắt (1 phách tĩnh) và âm Hatsun (ん).",
    level: "BEGINNER",
    tags: ["Ghi chú", "Phát âm", "Mora", "Nhịp điệu", "Ngữ âm", "N5"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-mr-1",
        title: "1. Mora (Phách nhịp) là gì?",
        content:
          "Trong khi tiếng Việt có các âm tiết phức tạp (như 'nghiêng' là 1 âm tiết), tiếng Nhật được tính bằng các đơn vị phách đều đặn gọi là MORA (拍 - haku). Mỗi mora có độ dài thời gian phát âm BẰNG NHAU như tiếng tích tắc của đồng hồ quả lắc.",
        type: "rule",
      },
      {
        id: "sec-mr-2",
        title: "2. Bẫy số 1: Âm ngắt (っ) và Âm Hatsun (ん) tính tròn 1 Mora!",
        content:
          "- Âm ngắt (っ): Dù không phát ra tiếng nhưng bạn BẮT BUỘC phải dừng lại đúng 1 nhịp phách tĩnh. Ví dụ: きって (tem thư) gồm 3 mora (ki - [ngắt] - te), nếu không ngắt sẽ thành きて (hãy đến) chỉ có 2 mora.\n- Âm ん (hatsuon): Chiếm trọn vẹn 1 mora (Nihon = Ni-ho-n = 3 mora).",
        type: "rule",
      },
      {
        id: "sec-mr-3",
        title: "3. Bẫy số 2: Trường âm (Âm dài) = 2 Mora",
        content:
          "- おばさん (Cô/Dì) = 4 mora.\n- おばあさん (Bà cụ) = 5 mora (âm 'baa' dài gấp đôi âm 'ba').\nNếu không giữ đủ 2 nhịp phách, người Nhật sẽ hiểu nhầm bạn đang gọi 'Bà cụ' thành 'Bà cô'!",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-mr-1",
        japanese: "東京 (とうきょう) -> と・う・きょ・う (4 Mora)",
        reading: "とうきょう",
        romaji: "Toukyou",
        vietnamese: "Thủ đô Tokyo gồm đúng 4 nhịp phách (To - u - kyo - u).",
        explanation: "Người Việt hay đọc gộp thành 2 âm tiết 'Tô-ki-ô', dẫn đến sai nhịp điệu tiếng Nhật chuẩn.",
        context: "Đếm phách nhịp địa danh",
      },
    ],
    comparisons: {
      title: "Đọc theo Âm tiết tiếng Việt vs Đọc theo Mora tiếng Nhật",
      items: [
        {
          subject: "Đọc theo âm tiết tiếng Việt",
          nuance: "Đọc nuốt âm ngắt hoặc kéo dài tùy hứng không đều nhịp",
          formula: "Âm dài bị đọc ngắn lại",
          example: "きって đọc giống 'kít-tê' (quá nhanh)",
          exampleTranslation: "Nghe cộc lốc và dễ nhầm từ.",
          caution: "Mất đi nhịp điệu tự nhiên của tiếng Nhật.",
        },
        {
          subject: "Đọc theo nhịp phách Mora",
          nuance: "Mỗi mora đều đặn như nhịp gõ phách metronome",
          formula: "1 Ký tự / 1 Trường âm / 1 Âm ngắt = 1 Nhịp",
          example: "き (1) - っ (1) - て (1) = 3 Nhịp đều",
          exampleTranslation: "Phát âm chuẩn xác 100% người bản xứ nghe rõ ngay.",
          caution: "Tập gõ ngón tay xuống bàn khi luyện đọc.",
        },
      ],
      summary: "Gõ tay đều đặn: Mỗi chữ cái, mỗi âm ngắt, mỗi trường âm đều chiếm đúng 1 nhịp gõ.",
    },
    notes: [
      "Âm ghép ảo (Yōon như きゃ, しゅ, ちょ) chỉ tính là 1 mora duy nhất dù viết bằng 2 ký tự (1 to 1 nhỏ).",
    ],
    warnings: [
      "Đừng bao giờ nuốt âm ngắt (っ) khi đọc từ vựng như がっこう, きっぷ, ざっし.",
    ],
    relatedArticles: [
      {
        category: "notes",
        slug: "pitch-accent-nhung-dieu-can-biet",
        title: "Pitch accent: Những điều người mới học cần biết và những điều KHÔNG cần ép bản thân nhớ ngay",
        reason: "Kết hợp nhịp mora với cao độ Pitch accent",
      },
      {
        category: "kanji",
        slug: "quy-tac-chuyen-am-han-viet-sang-on-yomi",
        title: "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
        reason: "Quy luật trường âm và âm ngắt trong chữ Hán",
      },
    ],
  },

  // 8. Article 8 (Mới: Pitch accent)
  {
    id: "n-pitch-accent-can-biet",
    slug: "pitch-accent-nhung-dieu-can-biet",
    categoryId: "notes",
    title: "Pitch accent: Những điều người mới học cần biết và những điều KHÔNG cần ép bản thân nhớ ngay",
    japaneseTitle: "初心者が知っておくべき高低アクセントの基本と向き合い方",
    summary:
      "Giải mã đúng mức độ về ngữ điệu cao độ (Pitch accent): Hiểu nguyên lý Cao - Thấp trong tiếng Nhật để nghe tự nhiên, nhưng KHÔNG để nỗi sợ accent làm bạn ngần ngại mở miệng giao tiếp.",
    level: "ALL",
    tags: ["Ghi chú", "Phát âm", "Pitch Accent", "Ngữ điệu", "Kinh nghiệm", "N5"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-pa-1",
        title: "1. Pitch Accent tiếng Nhật là gì?",
        content:
          "Khác với tiếng Anh nhấn trọng âm bằng độ mạnh (Stress accent: to hơn, mạnh hơn) hay tiếng Việt dùng 6 thanh điệu (Dấu sắc, huyền, hỏi, ngã, nặng), tiếng Nhật chuẩn Tokyo sử dụng CAO ĐỘ (Pitch accent: Cao - H/High và Thấp - L/Low).\nVí dụ kinh điển:\n- 箸 (はし - Đôi đũa): Cao - Thấp (H-L).\n- 橋 (はし - Cây cầu): Thấp - Cao (L-H).\n- 端 (はし - Mép/Rìa): Thấp - Cao (và trợ từ đi sau vẫn ở mức Cao).",
        type: "rule",
      },
      {
        id: "sec-pa-2",
        title: "2. Quy tắc cốt lõi bạn CẦN BIẾT",
        content:
          "Chỉ cần nhớ 2 quy tắc vàng của tiếng Nhật chuẩn Tokyo:\n1. Mora thứ 1 và Mora thứ 2 LUÔN KHÁC NHAU VỀ CAO ĐỘ (Nếu chữ thứ 1 Cao thì chữ thứ 2 phải Thấp; nếu chữ thứ 1 Thấp thì chữ thứ 2 phải Cao).\n2. Trong 1 từ, một khi cao độ đã rơi từ Cao xuống Thấp, nó KHÔNG BAO GIỜ tự bật ngược lên Cao lại trong từ đó nữa.",
        type: "rule",
      },
      {
        id: "sec-pa-3",
        title: "3. Những điều BẠN KHÔNG CẦN ÉP BẢN THÂN NHỚ NGAY",
        content:
          "- Ngay cả người Nhật ở các vùng khác nhau (Tokyo, Osaka, Kyoto, Tohoku) cũng có Pitch accent hoàn toàn khác nhau, thậm chí trái ngược nhau mà họ vẫn hiểu nhau 100%!\n- Ngữ cảnh của cả câu (Context) quan trọng gấp 100 lần Pitch accent của 1 từ đơn lẻ. Khi bạn cầm bát cơm và nói 'Hashi o kudasai', không một người Nhật nào nghĩ bạn đang đòi 'cây cầu' cả.\n- Lời khuyên cho người mới học: Tập trung vào phát âm chuẩn Mora và trường âm/âm ngắt trước. Pitch accent chỉ cần tra cứu khi phân vân hoặc khi lên trình độ nâng cao (N2/N1).",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-pa-1",
        japanese: "雨 (あめ - Cơn mưa: H-L) vs 飴 (あめ - Kẹo ngọt: L-H)",
        reading: "あめ vs あめ",
        romaji: "Ame (Mưa) vs Ame (Kẹo)",
        vietnamese: "Mưa: Chữ 'A' đọc cao, chữ 'ME' hạ thấp. Kẹo: Chữ 'A' đọc trầm, chữ 'ME' nhấc cao.",
        explanation: "Cặp từ phân biệt cao độ kinh điển trong tiếng Nhật Tokyo.",
        context: "So sánh cao độ",
      },
    ],
    comparisons: {
      title: "Trọng âm tiếng Anh vs Thanh điệu tiếng Việt vs Pitch accent tiếng Nhật",
      items: [
        {
          subject: "Thanh điệu tiếng Việt (Tone)",
          nuance: "Mỗi từ có dấu riêng biệt (Ma, Má, Mà, Mả, Mã, Mạ)",
          formula: "Thay đổi dấu là đổi nghĩa hoàn toàn",
          example: "Cà phê",
          exampleTranslation: "Có dấu cụ thể",
          caution: "Người Việt dễ mang thói quen bỏ dấu này sang tiếng Nhật.",
        },
        {
          subject: "Pitch accent tiếng Nhật (Cao/Thấp)",
          nuance: "Chỉ lướt sóng nhẹ nhàng giữa nốt Cao và nốt Thấp, không gằn giọng",
          formula: "Mora 1 và 2 lệch cao độ",
          example: "ありがとう (L-H-H-H-L)",
          exampleTranslation: "Cảm ơn",
          caution: "Không nói quá to hay nhấn gằn từng từ.",
        },
      ],
      summary: "Đừng quá ám ảnh về Pitch accent. Hãy lắng nghe người bản xứ nói và nhại theo ngữ điệu tự nhiên (Shadowing).",
    },
    notes: [
      "Phương pháp luyện ngữ điệu tốt nhất là Shadowing (nói đuổi theo file nghe người bản xứ) thay vì ngồi học thuộc lòng bảng ký hiệu cao độ của từng từ vựng trong từ điển.",
    ],
    warnings: [
      "Đừng để nỗi ám ảnh về Pitch accent làm bạn sợ hãi không dám giao tiếp. Người Nhật cực kỳ thông cảm và luôn hiểu ý bạn dựa vào ngữ cảnh câu nói.",
    ],
    relatedArticles: [
      {
        category: "notes",
        slug: "doc-cau-theo-nhip-mora-thay-vi-tung-chu",
        title: "Cách đọc câu tiếng Nhật theo nhịp phách (Mora) thay vì từng chữ cái riêng rẽ",
        reason: "Nền tảng nhịp Mora hỗ trợ cho Pitch accent",
      },
      {
        category: "conversation",
        slug: "chao-hoi-va-mo-dau-cuoc-tro-chuyen",
        title: "Chào hỏi và mở đầu cuộc trò chuyện tự nhiên chuẩn người bản xứ",
        reason: "Thực hành ngữ điệu giao tiếp đời sống",
      },
    ],
  },
];
