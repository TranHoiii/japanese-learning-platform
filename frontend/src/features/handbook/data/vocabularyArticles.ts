import { HandbookArticle } from "../types";

export const vocabularyArticles: HandbookArticle[] = [
  {
    "id": "v-pho-tu-muc-do",
    "slug": "pho-tu-chi-muc-do-thuong-gap",
    "categoryId": "vocabulary",
    "title": "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
    "japaneseTitle": "程度を表す副詞のまとめ",
    "summary": "Hệ thống hóa các phó từ chỉ mức độ theo thước đo từ 100% đến 0%, phân biệt sắc thái khen ngợi, ngạc nhiên và quy tắc đi cùng câu phủ định.",
    "level": "N5",
    "tags": [
      "Từ vựng",
      "Phó từ",
      "Mức độ",
      "Giao tiếp",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-pt-1",
        "title": "1. Thang đo mức độ từ cao xuống thấp (100% -> 0%)",
        "content": "Các phó từ tiếng Nhật có thang đo cảm xúc và mức độ rất chặt chẽ. Hiểu đúng vị trí trên thang đo giúp bạn diễn đạt tự nhiên chuẩn xác mà không bị thô lỗ hay gượng gạo.",
        "type": "table",
        "tableData": {
          "headers": [
            "Mức độ",
            "Phó từ",
            "Cách dùng với vị ngữ",
            "Ý nghĩa sắc thái"
          ],
          "rows": [
            [
              "100%",
              "まったく / 完全に",
              "Phủ định / Khẳng định",
              "Hoàn toàn (không thể / hoàn hảo)"
            ],
            [
              "80% - 90%",
              "とても / たいへん",
              "Khẳng định",
              "Rất (たいへん trang trọng hơn とても)"
            ],
            [
              "70%",
              "かなり / ずいぶん",
              "Khẳng định",
              "Khá là (vượt quá mức dự đoán thông thường)"
            ],
            [
              "60%",
              "けっこう / なかなか",
              "Khẳng định (hoặc tiềm năng)",
              "Khá là (bất ngờ, tốt hơn mong đợi)"
            ],
            [
              "50%",
              "まあまあ",
              "Khẳng định",
              "Tàm tạm, cũng được (không quá xuất sắc)"
            ],
            [
              "20% - 30%",
              "あまり",
              "Bắt buộc đi với Phủ định",
              "Không... lắm (giảm nhẹ mức độ phủ định)"
            ],
            [
              "0%",
              "ぜんぜん (全然)",
              "Chuẩn mực: Phủ định",
              "Hoàn toàn không... chút nào"
            ]
          ]
        }
      },
      {
        "id": "sec-pt-2",
        "title": "2. Sắc thái tinh tế của なかなか và けっこう",
        "content": "Cả hai đều dịch là 'khá là...', nhưng mang tâm lý 'vượt trên mức kỳ vọng ban đầu':\n- なかなか: Thường dùng khen ngợi khi người nói từng nghĩ điều đó khó đạt được (ví dụ: Bạn nói tiếng Nhật khá tốt đấy - なかなか上手ですね).\n- けっこう: Biểu thị sự hài lòng ở mức đủ dùng, đôi khi mang tính đánh giá chủ quan.",
        "type": "rule"
      },
      {
        "id": "sec-pt-3",
        "title": "3. Câu chuyện về 全然 (zenzen) trong tiếng Nhật hiện đại",
        "content": "Trong ngữ pháp truyền thống và các kỳ thi JLPT, 全然 BẮT BUỘC đi với vị ngữ phủ định (全然わかりません - Hoàn toàn không hiểu). Tuy nhiên trong giới trẻ Nhật hiện nay, '全然いいよ' (Hoàn toàn ổn, không sao cả) xuất hiện rất nhiều trong khẩu ngữ. Người học sơ cấp nên tuân thủ ngữ pháp chuẩn trong văn viết và bài thi.",
        "type": "text"
      }
    ],
    "examples": [
      {
        "id": "ex-pt-1",
        "japanese": "この映画はとても面白いです。",
        "reading": "このえいがはとてもおもしろいです。",
        "romaji": "Kono eiga wa totemo omoshiroi desu.",
        "vietnamese": "Bộ phim này rất hay.",
        "explanation": "Dùng とても để nhấn mạnh mức độ thích thú trong câu khẳng định thông thường.",
        "context": "Đánh giá phim ảnh"
      },
      {
        "id": "ex-pt-2",
        "japanese": "日本語の漢字はあまり難しくないです。",
        "reading": "にほんごのかんじはあまりむずかしくないです。",
        "romaji": "Nihongo no kanji wa amari muzukashiku nai desu.",
        "vietnamese": "Chữ Hán tiếng Nhật không khó lắm.",
        "explanation": "あまり kết hợp với tính từ phủ định để nói giảm nói tránh lịch sự.",
        "context": "Bày tỏ cảm nhận"
      },
      {
        "id": "ex-pt-3",
        "japanese": "昨日は全然眠れませんでした。",
        "reading": "きのうはぜんぜんねむれませんでした。",
        "romaji": "Kinou wa zenzen nemuremasen deshita.",
        "vietnamese": "Hôm qua tôi hoàn toàn không ngủ được chút nào.",
        "explanation": "全然 + phủ định nhấn mạnh mức độ 0% triệt để.",
        "context": "Chia sẻ trạng thái bản thân"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu cặp phó từ phủ định: あまり vs 全然",
      "items": [
        {
          "subject": "あまり (amari)",
          "nuance": "Mức độ 20-30%, phủ định nhẹ nhàng, tạo cảm giác khiêm tốn hoặc lịch sự",
          "formula": "あまり + V-nai / A-kunai",
          "example": "辛い料理はあまり好きじゃありません。",
          "exampleTranslation": "Tôi không thích đồ ăn cay cho lắm.",
          "caution": "Tránh dùng trong câu khẳng định khi muốn mang nghĩa 'rất'."
        },
        {
          "subject": "全然 (zenzen)",
          "nuance": "Mức độ 0%, phủ định tuyệt đối, không có bất kỳ ngoại lệ nào",
          "formula": "全然 + V-nai / A-kunai",
          "example": "彼の言っていることが全然わかりません。",
          "exampleTranslation": "Tôi hoàn toàn không hiểu anh ấy đang nói gì.",
          "caution": "Mang sắc thái dứt khoát mạnh mẽ, cần cẩn trọng khi từ chối cấp trên."
        }
      ],
      "summary": "Nếu muốn lịch sự mềm mỏng, ưu tiên dùng あまり thay vì 全然."
    },
    "notes": [
      "たいへん (taihen) thường dùng trong thư tín, kinh doanh hoặc hoàn cảnh trang trọng hơn とても.",
      "ずいぶん (zuibun) mang cảm giác 'nhiều hơn so với trước đây hoặc so với tưởng tượng' (ví dụ: Bạn đã tiến bộ hơn hẳn rồi nhỉ)."
    ],
    "warnings": [
      "Khi khen ngợi cấp trên hoặc người lớn tuổi, tránh dùng なかなか上手ですね vì nó có hàm ý người nói đang ở vị thế cao hơn nhận xét người dưới."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "tu-dien-tu-tuong-thanh-tu-tuong-hinh",
        "title": "Từ tượng thanh & Từ tượng hình (Onomatopoeia) căn bản trong đời sống",
        "reason": "Cùng làm phong phú cách miêu tả trạng thái bằng từ vựng gợi cảm"
      },
      {
        "category": "conversation",
        "slug": "cach-tu-choi-kheo-leo-trong-tieng-nhat",
        "title": "Nghệ thuật từ chối khéo léo (Kushon Kotoba) tránh làm mất lòng đối phương",
        "reason": "Ứng dụng các phó từ giảm nhẹ sắc thái khi giao tiếp lịch sự"
      },
      {
        "category": "vocabulary",
        "slug": "phan-biet-sugu-va-suguni",
        "title": "Phân biệt すぐ (ngay lập tức / cự ly rất gần) và すぐに (ngay tức thì về thời gian)",
        "reason": "Phó từ chỉ thời gian tức thì và khoảng cách cự ly"
      }
    ]
  },
  {
    "id": "v-onomatopoeia",
    "slug": "tu-dien-tu-tuong-thanh-tu-tuong-hinh",
    "categoryId": "vocabulary",
    "title": "Từ tượng thanh & Từ tượng hình (Onomatopoeia) căn bản trong đời sống",
    "japaneseTitle": "日常でよく使うオノマトペ",
    "summary": "Khám phá các từ mô phỏng âm thanh (Giseigo) và trạng thái tâm lý cảm xúc (Gitaigo) phổ biến nhất như dokidoki, perapera, girigiri, wakuwaku.",
    "level": "ALL",
    "tags": [
      "Từ vựng",
      "Từ tượng thanh",
      "Giao tiếp",
      "Văn hóa",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ono-1",
        "title": "1. Tầm quan trọng của Onomatopoeia trong tiếng Nhật",
        "content": "Người Nhật sử dụng từ tượng thanh và tượng hình với tần suất cực kỳ cao trong đời sống thường nhật. Nếu biết cách sử dụng khéo léo, câu nói của bạn sẽ trở nên sống động, gần gũi và tự nhiên y hệt người bản xứ.",
        "type": "text"
      },
      {
        "id": "sec-ono-2",
        "title": "2. Nhóm từ miêu tả tâm lý và cảm xúc cơ thể",
        "content": "Các từ thường có dạng lặp âm đôi (A-B-A-B), diễn tả nhịp đập con tim, sự hồi hộp hoặc trạng thái tinh thần:",
        "type": "table",
        "tableData": {
          "headers": [
            "Từ tượng thanh/hình",
            "Cách đọc",
            "Ý nghĩa",
            "Ví dụ tiêu biểu"
          ],
          "rows": [
            [
              "ドキドキ (dokidoki)",
              "どきどき",
              "Tim đập thình thịch (hồi hộp, lo âu, rung động)",
              "発表の前で緊張してドキドキする。"
            ],
            [
              "ワクワク (wakuwaku)",
              "わくわく",
              "Háo hức, mong chờ một điều vui vẻ",
              "明日から旅行なのでワクワクしています。"
            ],
            [
              "イライラ (iraira)",
              "いらいら",
              "Bực bội, sốt ruột, nóng mũi",
              "電車が遅れてイライラする。"
            ],
            [
              "ペラペラ (perapera)",
              "ぺらぺら",
              "Lưu loát, trôi chảy (ngoại ngữ)",
              "彼は日本語がペラペラです。"
            ],
            [
              "ギリギリ (girigiri)",
              "ぎりぎり",
              "Sát nút, suýt soát (thời gian, hạn chót)",
              "電車の発車時刻にギリギリ間に合った。"
            ]
          ]
        }
      }
    ],
    "examples": [
      {
        "id": "ex-ono-1",
        "japanese": "面接の前で胸がドキドキしました。",
        "reading": "めんせつのまえでむねがドキドキしました。",
        "romaji": "Mensetsu no mae de mune ga dokidoki shimashita.",
        "vietnamese": "Trước buổi phỏng vấn, ngực tôi đập thình thịch.",
        "explanation": "ドキドキ miêu tả cảm xúc hồi hộp xen lẫn lo lắng trước thử thách.",
        "context": "Trước sự kiện quan trọng"
      },
      {
        "id": "ex-ono-2",
        "japanese": "レポートの提出期限にギリギリ間に合いました。",
        "reading": "レポートのていしゅつきげんにギリギリまにあいました。",
        "romaji": "Repooto no teishutsu kigen ni girigiri maniaimashita.",
        "vietnamese": "Tôi đã kịp nộp báo cáo sát nút giờ quy định.",
        "explanation": "ギリギリ diễn tả khoảnh khắc cận kề ranh giới.",
        "context": "Hạn chót công việc / học tập"
      }
    ],
    "comparisons": {
      "title": "Phân biệt cảm xúc hồi hộp: ドキドキ vs ワクワク",
      "items": [
        {
          "subject": "ドキドキ (dokidoki)",
          "nuance": "Hồi hộp với tâm lý bất an, lo sợ kết quả xấu hoặc tim đập mạnh do căng thẳng",
          "formula": "ドキドキする / 胸がドキドキ",
          "example": "テストの結果を見る時、ドキドキした。",
          "exampleTranslation": "Lúc xem kết quả thi, tim tôi đập thình thịch.",
          "caution": "Cũng có thể dùng trong tình yêu khi gặp crush, nhưng sắc thái nghiêng về nhịp đập vật lý."
        },
        {
          "subject": "ワクワク (wakuwaku)",
          "nuance": "Háo hức với niềm vui sướng tích cực hướng về một tương lai tươi đẹp phía trước",
          "formula": "ワクワクする / 気持ちがワクワク",
          "example": "日本へ行く日をワクワクしながら待っている。",
          "exampleTranslation": "Tôi đang háo hức chờ đợi ngày được bay sang Nhật.",
          "caution": "Không dùng cho hoàn cảnh có cảm giác nguy hiểm hay tiêu cực."
        }
      ],
      "summary": "Nếu lo lắng căng thẳng -> ドキドキ; nếu vui vẻ đón chờ -> ワクワク."
    },
    "notes": [
      "Từ tượng thanh thường được viết bằng Katakana trong văn cảnh hiện đại để nhấn mạnh cảm giác trực quan, nhưng viết bằng Hiragana vẫn hoàn toàn chính xác."
    ],
    "warnings": [
      "Trong văn bản hành chính hoặc báo cáo khoa học chính quy, hạn chế lạm dụng onomatopoeia; nên dùng từ ngữ trang trọng hơn (ví dụ: 緊張する thay vì ドキドキする)."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "pho-tu-chi-muc-do-thuong-gap",
        "title": "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
        "reason": "Bổ trợ các phó từ chỉ mức độ diễn đạt cảm xúc"
      },
      {
        "category": "notes",
        "slug": "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        "title": "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        "reason": "Ghép onomatopoeia vào các cụm động từ thường gặp"
      }
    ]
  },
  {
    "id": "v-shiru-wakaru",
    "slug": "phan-biet-shiru-va-wakaru",
    "categoryId": "vocabulary",
    "title": "Phân biệt 知る (shiru) và 分かる (wakaru) - Biết thông tin vs Thấu hiểu bản chất",
    "japaneseTitle": "「知る」と「分かる」の明確な違い",
    "summary": "Giải quyết triệt để sự nhầm lẫn giữa tiếp nhận thông tin từ bên ngoài (知る - shiru) và năng lực thấu hiểu nội tại (分かる - wakaru) kèm quy tắc trợ từ を vs が.",
    "level": "N5",
    "tags": [
      "Từ vựng",
      "Động từ dễ nhầm",
      "知る",
      "分かる",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-sw-1",
        "title": "1. Bản chất: Tiếp nhận thông tin (知る) vs Thấu hiểu bản chất (分かる)",
        "content": "- 知る (shiru): Tiếp nhận một mẩu dữ liệu hoặc thông tin khách quan từ bên ngoài đưa vào não bộ (biết tên, biết số điện thoại, biết sự kiện).\n- 分かる (wakaru): Tự thân hiểu được ý nghĩa, quy luật, logic hoặc cảm thông với tâm trạng của ai đó qua sự suy ngẫm nội tâm.",
        "type": "rule"
      },
      {
        "id": "sec-sw-2",
        "title": "2. Khác biệt về cấu trúc trợ từ đi kèm",
        "content": "- 知る là tha động từ ý chí -> Đối tượng tiếp nhận đi với trợ từ を (電話番号を知っています).\n- 分かる là tự động từ chỉ năng lực/trạng thái -> Đối tượng được hiểu đi với trợ từ が (日本語の意味がわかります).",
        "type": "rule"
      },
      {
        "id": "sec-sw-3",
        "title": "3. Thể phủ định: Bẫy lớn nhất trong các đề thi JLPT",
        "content": "- 'Tôi biết' -> 知っています (dạng ている).\n- 'Tôi không biết' -> BẮT BUỘC là 知りません (TUYỆT ĐỐI KHÔNG DÙNG 知っていません).\n- 'Tôi không hiểu' -> わかりません.",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-sw-1",
        "japanese": "田中さんの電話番号を知っていますか。",
        "reading": "たなかさんのでんわばんごうをしっていますか。",
        "romaji": "Tanaka-san no denwa bangou o shitte imasu ka.",
        "vietnamese": "Bạn có biết số điện thoại của anh Tanaka không?",
        "explanation": "Số điện thoại là mẩu thông tin dữ liệu thuần túy -> Dùng を知る.",
        "context": "Hỏi thông tin liên lạc"
      },
      {
        "id": "ex-sw-2",
        "japanese": "先生、この文法の使い方がわかりました。",
        "reading": "せんせい、このぶんぽうのつかいかたがわかりました。",
        "romaji": "Sensei, kono bunpou no tsukaikata ga wakarimashita.",
        "vietnamese": "Thưa thầy, em đã hiểu được cách dùng của ngữ pháp này rồi ạ.",
        "explanation": "Hiểu được cách vận hành và logic ngữ pháp -> Dùng が分かる.",
        "context": "Báo cáo tiến độ học tập"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu 知る (shiru) vs 分かる (wakaru)",
      "items": [
        {
          "subject": "知る (shiru) - Nạp dữ liệu",
          "nuance": "Biết thông tin khách quan từ người khác hoặc nguồn tin",
          "formula": "N を 知っている / 知りません",
          "example": "あの人の名前を知りません。",
          "exampleTranslation": "Tôi không biết tên của người kia.",
          "caution": "Phủ định là 知りません, không có 知っていません."
        },
        {
          "subject": "分かる (wakaru) - Thấu hiểu logic",
          "nuance": "Nắm được nguyên lý, giải quyết được vấn đề trong não",
          "formula": "N が 分かる / 分かりません",
          "example": "彼の気持ちがよく分かります。",
          "exampleTranslation": "Tôi rất thấu hiểu tâm trạng của anh ấy.",
          "caution": "Trợ từ là が, không dùng を."
        }
      ],
      "summary": "Biết số nhà, tên tuổi -> 知る; Hiểu bài học, hiểu tâm lý người khác -> 分かる."
    },
    "notes": [
      "Khi ai đó nhờ làm việc gì, nói 'わかりました' nghĩa là 'Tôi đã hiểu và nhận việc', chứ không dùng 'しりました'."
    ],
    "warnings": [
      "Nói '知りません' với khách hàng có thể nghe hơi cụt lủn và thiếu trách nhiệm; người Nhật ở công sở sẽ dùng '存じ上げておりません' hoặc '分かりかねます'."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "ban-chat-cau-truc-te-iru",
        "title": "Bản chất cấu trúc 〜ている: Hành động tiếp diễn, trạng thái kết quả & thói quen",
        "reason": "Giải thích lý do 知る luôn ở thể 知っています khi khẳng định"
      },
      {
        "category": "conversation",
        "slug": "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        "title": "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        "reason": "Dạng kính ngữ của 知る là ご存知 vs 存じる"
      }
    ]
  },
  {
    "id": "v-miru-mieru-miseru",
    "slug": "phan-biet-miru-kan-mieru-miseru",
    "categoryId": "vocabulary",
    "title": "Phân biệt nhóm động từ thị giác: 見る vs 観る vs 見える vs 見せる",
    "japaneseTitle": "視覚動詞「見る・観る・見える・見せる」の完全整理",
    "summary": "Tách bạch giữa nhìn có chủ ý (見る/観る), hình ảnh tự lọt vào mắt một cách tự nhiên (見える), và hành vi cho người khác xem (見せる).",
    "level": "N5",
    "tags": [
      "Từ vựng",
      "Động từ thị giác",
      "見る",
      "見える",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-mv-1",
        "title": "1. Nhìn có ý chí: 見る (miru) vs 観る (miru)",
        "content": "- 見る (miru): Nhìn nói chung, hướng ánh mắt vào sự vật có chủ đích (xem sách, nhìn đồng hồ, khám bệnh).\n- 観る (miru - chữ QUAN): Thưởng thức nghệ thuật, xem trình diễn có chuyển động thời gian dài (xem phim - 映画を観る, xem kịch, xem bóng đá - 試合を観る).",
        "type": "rule"
      },
      {
        "id": "sec-mv-2",
        "title": "2. Nhìn tự nhiên không tốn sức: 見える (mieru)",
        "content": "Là tự động từ biểu thị khả năng thị giác tự nhiên. Đối tượng tự lọt vào võng mạc mà không cần người nói phải cố gắng hay tác động ý chí: 部屋から富士山が見えます (Từ phòng nhìn thấy núi Phú Sĩ). Đi với trợ từ が.",
        "type": "rule"
      },
      {
        "id": "sec-mv-3",
        "title": "3. Tác động lên người khác: 見せる (miseru)",
        "content": "Là tha động từ mang nghĩa 'cho ai đó xem / xuất trình cái gì': パスポートを見せてください (Xin hãy cho tôi xem hộ chiếu).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-mv-1",
        "japanese": "週末は家で映画を観ました。",
        "reading": "しゅうまつはいえでえいがをみました。",
        "romaji": "Shuumatsu wa ie de eiga o mimashita.",
        "vietnamese": "Cuối tuần tôi đã xem phim ở nhà.",
        "explanation": "Thưởng thức tác phẩm điện ảnh nghệ thuật -> Dùng chữ 観る.",
        "context": "Xem phim giải trí"
      },
      {
        "id": "ex-mv-2",
        "japanese": "メガネをかけると、遠くの文字がよく見えます。",
        "reading": "メガネをかけると、とおくのもじがよくみえます。",
        "romaji": "Megane o kakeru to, tooku no moji ga yoku miemasu.",
        "vietnamese": "Hễ đeo kính vào là các chữ ở xa nhìn thấy rất rõ.",
        "explanation": "Khả năng nhìn thấy rõ ràng tự nhiên của đôi mắt -> Dùng 見える.",
        "context": "Khả năng thị giác"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu 見る (Chủ ý) vs 見える (Tự nhiên)",
      "items": [
        {
          "subject": "見る (miru) - Tha động từ",
          "nuance": "Chủ động hướng tầm mắt để quan sát",
          "formula": "N を + 見る",
          "example": "黒板の字を見てください。",
          "exampleTranslation": "Hãy nhìn chữ trên bảng đen.",
          "caution": "Người nói có ý thức tập trung."
        },
        {
          "subject": "見える (mieru) - Tự động từ",
          "nuance": "Hình ảnh tự đập vào mắt mà không cần tập trung",
          "formula": "N が + 見える",
          "example": "海が見える部屋に泊まりました。",
          "exampleTranslation": "Tôi đã trọ tại căn phòng nhìn ra biển.",
          "caution": "Đối tượng luôn đi với trợ từ が."
        }
      ],
      "summary": "Muốn nhìn -> 見る; Đập vào mắt -> 見える; Cho người khác xem -> 見せる."
    },
    "notes": [
      "Khác biệt giữa 見られる (dạng khả năng của 見る: có điều kiện để xem, ví dụ mua vé xem phim) và 見える (mắt sáng nhìn thấy được)."
    ],
    "warnings": [
      "Không nói '富士山を見えます' (Sai trợ từ; 見える là tự động từ nên phải dùng が)."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "phan-biet-kiku-va-kiku-nghe",
        "title": "Phân biệt 聞く (kiku - nghe/hỏi) và 聴く (kiku - lắng nghe có chủ đích)",
        "reason": "Cặp động từ thính giác tương ứng với thị giác"
      },
      {
        "category": "grammar",
        "slug": "phan-biet-tu-dong-tu-va-tha-dong-tu",
        "title": "Bản chất Tự động từ (Jidoushi) & Tha động từ (Tadoushi) kèm cặp từ thông dụng",
        "reason": "Nguyên lý tự động từ (見える) và tha động từ (見る/見せる)"
      }
    ]
  },
  {
    "id": "v-kiku-chokaku",
    "slug": "phan-biet-kiku-va-kiku-nghe",
    "categoryId": "vocabulary",
    "title": "Phân biệt 聞く (kiku - nghe/hỏi) và 聴く (kiku - lắng nghe có chủ đích)",
    "japaneseTitle": "「聞く」と「聴く」のニュアンスの違い",
    "summary": "Tách bạch âm thanh nghe thấy thụ động hoặc hỏi thông tin (聞く) với việc tập trung lắng nghe âm nhạc, tâm tư (聴く), cùng từ vựng nghe tự nhiên 聞こえる.",
    "level": "N5",
    "tags": [
      "Từ vựng",
      "Động từ thính giác",
      "聞く",
      "聴く",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-kk-1",
        "title": "1. 聞く (kiku - chữ VĂN): Nghe nói chung & Hỏi",
        "content": "Là chữ Hán phổ biến nhất cho động từ きく. Nó bao gồm hai nghĩa lớn:\n- Tiếp nhận âm thanh chung (nghe đài, nghe tin tức: ニュースを聞く).\n- Hỏi thông tin từ ai đó: 道を聞く (Hỏi đường), 先生に聞く (Hỏi thầy cô).",
        "type": "rule"
      },
      {
        "id": "sec-kk-2",
        "title": "2. 聴く (kiku - chữ THÍNH): Lắng nghe chăm chú",
        "content": "Chữ THÍNH có bộ Nhĩ (tai) kết hợp bộ Tâm (tim). Biểu thị hành động dồn toàn bộ tâm trí để thưởng thức hoặc cảm thấu: 音楽を聴く (Thưởng thức âm nhạc), 講義を聴く (Lắng nghe bài giảng), 悩みを聴く (Lắng nghe tâm sự).",
        "type": "rule"
      },
      {
        "id": "sec-kk-3",
        "title": "3. Âm thanh tự lọt vào tai: 聞こえる (kikoeru)",
        "content": "Tương tự như 見える, 聞こえる là tự động từ chỉ âm thanh tự nhiên lọt vào màng nhĩ mà ta không chủ động lắng nghe: 隣の部屋から声が聞こえます (Nghe thấy tiếng nói phát ra từ phòng bên cạnh). Đi với trợ từ が.",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-kk-1",
        "japanese": "好きな歌手の音楽を聴きながら散歩します。",
        "reading": "すきなかしゅのおんがくをききながらさんぽします。",
        "romaji": "Sukina kashu no ongaku o kikinagara sanpo shimasu.",
        "vietnamese": "Tôi vừa tản bộ vừa lắng nghe âm nhạc của ca sĩ mình yêu thích.",
        "explanation": "Thưởng thức âm nhạc chăm chú -> Dùng chữ 聴く.",
        "context": "Thưởng thức âm nhạc"
      },
      {
        "id": "ex-kk-2",
        "japanese": "外から雨の音が聞こえます。",
        "reading": "そとからあめのおとがきこえます。",
        "romaji": "Soto kara ame no oto ga kikoemasu.",
        "vietnamese": "Từ bên ngoài nghe thấy tiếng mưa rơi.",
        "explanation": "Âm thanh tự đập vào tai khách quan -> Dùng が聞こえる.",
        "context": "Âm thanh tự nhiên"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu 聞く vs 聴く vs 聞こえる",
      "items": [
        {
          "subject": "聞く (Chữ Văn) / 聴く (Chữ Thính)",
          "nuance": "Chủ động dỏng tai lên để nghe hoặc hỏi",
          "formula": "N を + 聞く / 聴く",
          "example": "ラジオを聞きます / 音楽を聴きます",
          "exampleTranslation": "Nghe radio / Lắng nghe âm nhạc",
          "caution": "Muốn hỏi ai cái gì thì dùng: Người に 聞く."
        },
        {
          "subject": "聞こえる (kikoeru) - Tự nhiên",
          "nuance": "Âm thanh tự vọng vào tai không cần cố gắng",
          "formula": "Âm thanh が + 聞こえる",
          "example": "変な音が聞こえました。",
          "exampleTranslation": "Tôi đã nghe thấy một âm thanh kỳ lạ.",
          "caution": "Luôn đi với trợ từ が."
        }
      ],
      "summary": "Hỏi thông tin -> 聞く; Nghe nhạc thưởng thức -> 聴く; Tiếng ồn tự vọng vào -> 聞こえる."
    },
    "notes": [
      "Trong kỳ thi JLPT phần thi nghe hiểu, tên bài thi chính là 聴解 (Choukai - chữ THÍNH đi với chữ GIẢI)."
    ],
    "warnings": [
      "Hỏi đường là '道を聞く', không dùng chữ 聴く cho hành động hỏi."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "phan-biet-miru-kan-mieru-miseru",
        "title": "Phân biệt nhóm động từ thị giác: 見る vs 観る vs 見える vs 見せる",
        "reason": "Cặp phạm trù giác quan nhìn và nghe"
      },
      {
        "category": "conversation",
        "slug": "hoi-va-chi-duong-trong-thuc-te",
        "title": "Hỏi và chỉ đường thực tế tại Nhật: Cấu trúc câu và từ vựng định hướng",
        "reason": "Ứng dụng cụm từ 道を聞く trong đời sống"
      }
    ]
  },
  {
    "id": "v-ookii-ookina",
    "slug": "phan-biet-ookii-ookina-chiisai-chiisana",
    "categoryId": "vocabulary",
    "title": "Phân biệt 大きい / 大きな và 小さい / 小さな: Tính từ đuôi -i vs Liên thể từ",
    "japaneseTitle": "「大きい・大きな」「小さい・小さな」の使い分け",
    "summary": "Hiểu rõ sự khác biệt ngữ pháp giữa tính từ đuôi -i (vừa làm vị ngữ vừa bổ nghĩa danh từ) và liên thể từ Rentaishi (chỉ đứng trước danh từ), cùng sắc thái trừu tượng vs vật lý.",
    "level": "N4",
    "tags": [
      "Từ vựng",
      "Tính từ",
      "Liên thể từ",
      "大きい",
      "大きな",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-oc-1",
        "title": "1. Khác biệt cốt lõi về mặt ngữ pháp",
        "content": "- 大きい / 小さい: Là TÍNH TỪ ĐUÔI -I. Có thể đứng ở cuối câu làm vị ngữ (この部屋は大きいです) hoặc đứng trước danh từ bổ nghĩa (大きい部屋).\n- 大きな / 小さな: Là LIÊN THỂ TỪ (Rentaishi). CHỈ ĐƯỢC ĐỨNG TRƯỚC DANH TỪ. Tuyệt đối không thể đứng ở cuối câu làm vị ngữ (Không bao giờ có câu: × この部屋は大きなです).",
        "type": "rule"
      },
      {
        "id": "sec-oc-2",
        "title": "2. Sắc thái biểu cảm: Đo lường khách quan vs Cảm xúc trừu tượng",
        "content": "- 大きい / 小さい: Thường miêu tả kích thước vật lý cụ thể có thể đo đạc bằng thước đo (hộp to, quả táo nhỏ).\n- 大きな / 小さな: Thường mang sắc thái cảm xúc chủ quan, ước mơ, sự kiện trừu tượng (giấc mơ lớn - 大きな夢, sai lầm lớn - 大きな間違い, biến chuyển lớn - 大きな変化).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-oc-1",
        "japanese": "私には将来、大きな夢があります。",
        "reading": "わたしにはしょうらい、おおきなゆめがあります。",
        "romaji": "Watashi ni wa shourai, ookina yume ga arimasu.",
        "vietnamese": "Trong tương lai, tôi ấp ủ một ước mơ to lớn.",
        "explanation": "Ước mơ là khái niệm trừu tượng giàu cảm xúc -> Dùng 大きな.",
        "context": "Nói về ước mơ"
      },
      {
        "id": "ex-oc-2",
        "japanese": "この荷物は重くて大きいです。",
        "reading": "このにもつはおもくておおきいです。",
        "romaji": "Kono nimotsu wa omokute ookii desu.",
        "vietnamese": "Kiện hành lý này vừa nặng vừa to.",
        "explanation": "Đứng ở cuối câu làm vị ngữ miêu tả kích thước vật lý -> Bắt buộc dùng 大きい.",
        "context": "Miêu tả đồ đạc"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu 大きい vs 大きな",
      "items": [
        {
          "subject": "大きい (Tính từ đuôi -i)",
          "nuance": "Kích thước vật lý cụ thể, có thể chia thì quá khứ/phủ định",
          "formula": "N が 大きい / 大きい + N",
          "example": "大きかった / 大きくない",
          "exampleTranslation": "Đã to / Không to",
          "caution": "Làm vị ngữ ở cuối câu bình thường."
        },
        {
          "subject": "大きな (Liên thể từ Rentaishi)",
          "nuance": "Trừu tượng, cảm xúc, biểu tượng; chỉ bổ nghĩa danh từ",
          "formula": "大きな + Danh từ (BẮT BUỘC)",
          "example": "大きな声 / 大きな問題",
          "exampleTranslation": "Giọng nói lớn / Vấn đề to lớn",
          "caution": "Không chia được thì; không đứng cuối câu."
        }
      ],
      "summary": "Đứng cuối câu -> Chỉ dùng 大きい/小さい. Đi với cảm xúc, ước mơ -> Ưu tiên 大きな/小さな."
    },
    "notes": [
      "Tiếng Nhật chỉ có 3 cặp từ tồn tại dạng này: 大きい/大きな, 小さい/小さな, và おかしい/おかしな (kỳ lạ)."
    ],
    "warnings": [
      "Câu sai phổ biến: '彼の家は大きなです' -> Phải sửa thành '彼の家は大きいです'."
    ],
    "relatedArticles": [
      {
        "category": "notes",
        "slug": "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        "title": "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        "reason": "Các cụm collocation kinh điển với 大きな như 大きな夢, 大きな声"
      },
      {
        "category": "vocabulary",
        "slug": "pho-tu-chi-muc-do-thuong-gap",
        "title": "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
        "reason": "Kết hợp phó từ với tính từ để nhấn mạnh"
      },
      {
        "category": "vocabulary",
        "slug": "phan-biet-kirei-va-utsukushii",
        "title": "Phân biệt きれい (sạch sẽ, xinh xắn) và 美しい (đẹp thanh cao, nghệ thuật)",
        "reason": "Các cặp tính từ miêu tả cảm quan thẩm mỹ trong tiếng Nhật"
      }
    ]
  },
  {
    "id": "v-tsukau-riyou",
    "slug": "phan-biet-tsukau-va-riyou-suru",
    "categoryId": "vocabulary",
    "title": "Phân biệt 使う (tsukau) và 利用する (riyou suru) - Dùng công cụ vs Tận dụng cơ hội",
    "japaneseTitle": "「使う」と「利用する」の使い分け",
    "summary": "Làm rõ ranh giới giữa việc sử dụng công cụ/tiền bạc vật lý thông thường (使う) và việc tận dụng cơ hội, dịch vụ, tài nguyên để sinh lợi ích (利用する).",
    "level": "N4",
    "tags": [
      "Từ vựng",
      "Động từ dễ nhầm",
      "使う",
      "利用する",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-tr-1",
        "title": "1. 使う (tsukau): Sử dụng công cụ, vật chất, năng lượng",
        "content": "Là từ thuần Nhật (Wago) thông dụng nhất. Biểu thị hành động tiêu hao hoặc vận hành một công cụ vật lý, sức lực hoặc tiền bạc: はしを使う (Dùng đũa), お金を使う (Tiêu tiền), 頭を使う (Động não).",
        "type": "rule"
      },
      {
        "id": "sec-tr-2",
        "title": "2. 利用する (riyou suru): Tận dụng dịch vụ, cơ hội, phương tiện",
        "content": "Là từ Hán - Nhật (Kango) trang trọng hơn. Mang ý nghĩa 'tận dụng tính năng có sẵn của hệ thống, cơ sở vật chất, dịch vụ công cộng hoặc thời cơ để đạt được lợi ích': 電車を利用する (Sử dụng tàu điện), 図書館を利用する (Khai thác thư viện), チャンスを利用する (Tận dụng cơ hội).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-tr-1",
        "japanese": "鉛筆を使ってアンケートに記入してください。",
        "reading": "えんぴつをつかってアンケートにきにゅうしてください。",
        "romaji": "Enpitsu o tsukatte ankeeto ni kinyuu shite kudasai.",
        "vietnamese": "Xin hãy sử dụng bút chì để điền vào phiếu khảo sát.",
        "explanation": "Bút chì là công cụ vật lý cầm nắm -> Dùng 使う.",
        "context": "Sử dụng dụng cụ"
      },
      {
        "id": "ex-tr-2",
        "japanese": "通勤の時は地下鉄を利用しています。",
        "reading": "つうきんのときはちかてつをごりようしています。",
        "romaji": "Tsuukin no toki wa chikatetsu o riyou shite imasu.",
        "vietnamese": "Khi đi làm tôi thường tận dụng phương tiện tàu điện ngầm.",
        "explanation": "Tàu điện ngầm là dịch vụ hạ tầng công cộng -> Dùng 利用する.",
        "context": "Sử dụng dịch vụ công cộng"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu 使う vs 利用する",
      "items": [
        {
          "subject": "使う (tsukau) - Thuần Nhật",
          "nuance": "Dùng công cụ, tiêu tốn thời gian, tiền của, sức lực",
          "formula": "N を 使う",
          "example": "パソコンを使う",
          "exampleTranslation": "Sử dụng máy vi tính",
          "caution": "Mang tính trực tiếp của đôi tay và thể chất."
        },
        {
          "subject": "利用する (riyou suru) - Hán Nhật",
          "nuance": "Khai thác tiện ích, hưởng lợi từ hệ thống hoặc cơ hội",
          "formula": "N を 利用する",
          "example": "銀行のサービスを利用する",
          "exampleTranslation": "Sử dụng dịch vụ của ngân hàng",
          "caution": "Nếu dùng cho con người (人を泣き落としで利用する) mang nghĩa tiêu cực là 'lợi dụng'."
        }
      ],
      "summary": "Dùng đũa, bút, điện thoại -> 使う; Tận dụng mạng xã hội, dịch vụ xe buýt, thời cơ -> 利用する."
    },
    "notes": [
      "Trong thông báo khách hàng, người Nhật luôn dùng kính ngữ: ご利用いただきありがとうございます (Cảm ơn quý khách đã sử dụng dịch vụ)."
    ],
    "warnings": [
      "Tránh dùng '人を利⽤する' khi muốn nói nhờ bạn bè giúp đỡ, vì từ này có nghĩa là 'lợi dụng người khác vì tư lợi'."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "khi-nao-dung-on-yomi-va-kun-yomi",
        "title": "Âm On (Onyomi) và Âm Kun (Kunyomi): Bức tranh toàn cảnh khi nào dùng mỗi loại",
        "reason": "So sánh từ thuần Nhật (使う) và từ Hán Nhật (利用する)"
      },
      {
        "category": "conversation",
        "slug": "mua-hang-hoi-gia-va-thanh-toan",
        "title": "Mẫu câu mua sắm, hỏi giá, thử đồ và thanh toán tại cửa hàng & konbini",
        "reason": "Cụm từ ご利用 trong giao tiếp thương mại"
      },
      {
        "category": "vocabulary",
        "slug": "phan-biet-chu-han-dong-tu-tsukuru",
        "title": "Phân biệt các chữ Hán của động từ 'Làm ra': 作る vs 造る vs 創る",
        "reason": "Cặp động từ làm ra và sử dụng công cụ"
      }
    ]
  },
  {
    "id": "v-hajimaru-owaru",
    "slug": "cap-dong-tu-bat-dau-va-ket-thuc",
    "categoryId": "vocabulary",
    "title": "Cặp động từ 始まる/始める và 終わる/終える: Tự động từ vs Tha động từ",
    "japaneseTitle": "開始と終了の自動詞・他動詞のマスター",
    "summary": "Luyện tập chuẩn xác phản xạ trợ từ が vs を khi nói về sự bắt đầu và kết thúc của buổi học, công việc, cuộc họp và sự kiện.",
    "level": "N5",
    "tags": [
      "Từ vựng",
      "Tự tha động từ",
      "始める",
      "始まる",
      "終わる",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ho-1",
        "title": "1. Cặp Bắt đầu: 始まる (Tự) vs 始める (Tha)",
        "content": "- 始まる (hajimaru - Tự động từ): Sự việc tự khởi động theo lịch trình sẵn có. Chủ ngữ đi với が (授業が始まります - Giờ học bắt đầu).\n- 始める (hajimeru - Tha động từ): Con người chủ động kích hoạt hành động. Đi với trợ từ を (先生が授業を始めます - Thầy giáo bắt đầu buổi học).",
        "type": "rule"
      },
      {
        "id": "sec-ho-2",
        "title": "2. Cặp Kết thúc: 終わる (Tự/Tha) vs 終える (Tha trang trọng)",
        "content": "- 終わる (owaru): Trong tiếng Nhật sơ cấp, 終わる thường dùng như tự động từ với が (仕事が終わりました - Công việc đã kết thúc).\n- 終える (oeru): Là tha động từ trang trọng diễn tả người nói đã hoàn tất trọn vẹn một quá trình dài hơi (Phát thanh viên: これでニュースを終えます - Đến đây xin được kết thúc bản tin thời sự).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-ho-1",
        "japanese": "会議は何時に始まりますか。",
        "reading": "かいぎはなんじにはじまりますか。",
        "romaji": "Kaigi wa nanji ni hajimarimasu ka.",
        "vietnamese": "Cuộc họp sẽ bắt đầu lúc mấy giờ?",
        "explanation": "Hỏi về lịch trình bắt đầu của cuộc họp -> Dùng tự động từ 始まる.",
        "context": "Hỏi lịch làm việc"
      },
      {
        "id": "ex-ho-2",
        "japanese": "みんな、日本語の勉強を始めましょう！",
        "reading": "みんな、にほんごのべんきょうをはじめましょう！",
        "romaji": "Minna, nihongo no benkyou o hajimemashou!",
        "vietnamese": "Mọi người ơi, chúng mình cùng bắt đầu học tiếng Nhật nào!",
        "explanation": "Chủ động rủ rê bắt đầu hành vi học tập -> Dùng tha động từ 始める.",
        "context": "Rủ rê hành động"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu cặp từ bắt đầu & kết thúc",
      "items": [
        {
          "subject": "始まる / 終わる (Tự động từ: が)",
          "nuance": "Sự kiện diễn ra theo tiến trình khách quan",
          "formula": "Sự kiện + が + 始まる / 終わる",
          "example": "映画が始まった / 試合が終わった",
          "exampleTranslation": "Bộ phim đã bắt đầu / Trận đấu đã kết thúc",
          "caution": "Không dùng trợ từ を cho 始まる."
        },
        {
          "subject": "始める / 終える (Tha động từ: を)",
          "nuance": "Con người có ý chí quyết định tiến trình",
          "formula": "Người は + Sự việc + を + 始める / 終える",
          "example": "仕事を始める / 発表を終える",
          "exampleTranslation": "Bắt đầu công việc / Kết thúc bài thuyết trình",
          "caution": "Bắt buộc có tân ngữ chịu tác động đi với を."
        }
      ],
      "summary": "Sự kiện tự bắt đầu -> が 始まる; Mình bắt đầu làm cái gì -> を 始める."
    },
    "notes": [
      "Động từ ghép: V(bỏ ます) + 始める (Bắt đầu làm gì: 降り始める - bắt đầu rơi mưa) hoặc + 終わる (Làm xong gì: 読み終わる - đọc xong)."
    ],
    "warnings": [
      "Lỗi phổ biến: '授業を始まりました' (Sai vì 始まる không đi với を). Phải là '授業が始まりました' hoặc '授業を始めました'."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-tu-dong-tu-va-tha-dong-tu",
        "title": "Bản chất Tự động từ (Jidoushi) & Tha động từ (Tadoushi) kèm cặp từ thông dụng",
        "reason": "Quy tắc tự - tha động từ tổng quát"
      },
      {
        "category": "notes",
        "slug": "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        "title": "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        "reason": "Ghi nhớ cặp trợ từ đi liền với danh từ và động từ"
      },
      {
        "category": "vocabulary",
        "slug": "phan-biet-benri-va-yakunitatsu",
        "title": "Phân biệt 便利 (tiện lợi công cụ) và 役に立つ (hữu ích, phát huy giá trị thực tế)",
        "reason": "Từ vựng đánh giá tính hữu dụng của các công cụ và phương pháp"
      },
      {
        "category": "vocabulary",
        "slug": "tu-vung-trai-nghia-dong-mo-tang-giam",
        "title": "Cặp từ trái nghĩa trạng thái: 開ける/閉める, 開く/閉まる, 増える/減る",
        "reason": "Cặp biến chuyển trạng thái tự động từ và tha động từ"
      }
    ]
  },
  {
    "id": "v-omou-kangaeru",
    "slug": "phan-biet-omou-va-kangaeru",
    "categoryId": "vocabulary",
    "title": "Phân biệt 思う (omou - cảm nhận chủ quan) và 考える (kangaeru - tư duy logic có tính toán)",
    "japaneseTitle": "「思う」と「考える」の違い：直感と論理的思考",
    "summary": "Giải mã sự khác biệt tinh tế giữa 思う (trực giác, cảm tính, nảy sinh tức thời) và 考える (tư duy logic, suy ngẫm, phân tích để giải quyết vấn đề).",
    "level": "N5",
    "tags": [
      "Từ vựng",
      "Gần nghĩa",
      "Động từ nhận thức",
      "comparison",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ok-1",
        "title": "1. 思う (Omou): Trực giác, cảm xúc và Ý kiến mềm mỏng",
        "content": "思う dùng khi diễn tả cảm nghĩ, ấn tượng nảy sinh một cách TỰ NHIÊN, TRỰC GIÁC mà không cần trải qua quá trình tính toán logic.\n- Ý kiến cá nhân mềm mỏng: [Thể thông thường + と思います] (Tôi nghĩ rằng... - tránh áp đặt lên người nghe).\n- Cảm xúc nhất thời: 今日は暑いと思う (Tôi cảm thấy hôm nay trời nóng).\n- Trực giác không cần bằng chứng: 彼は来ないと思う (Tôi linh cảm anh ấy sẽ không đến).",
        "type": "rule"
      },
      {
        "id": "sec-ok-2",
        "title": "2. 考える (Kangaeru): Tư duy logic, Phân tích và Lập kế hoạch",
        "content": "考える yêu cầu người nói phải NÃO BỘ HOẠT ĐỘNG TÍCH CỰC: suy ngẫm sâu sắc, tính toán thiệt hơn, tìm kiếm giải pháp cho bài toán.\n- Giải toán / bài tập: 答えを考える (suy nghĩ tìm lời giải đáp).\n- Lên kế hoạch tương lai: 将来の進路を考える (nghiền ngẫm định hướng tương lai).\n- Cân nhắc quyết định: よく考えてから決めてください (Hãy suy nghĩ cho thật thấu đáo rồi hẵng quyết định).",
        "type": "rule"
      },
      {
        "id": "sec-ok-3",
        "title": "3. So sánh trực diện và Bẫy sử dụng",
        "content": "Không thể thay thế lẫn nhau trong các trường hợp sau:\n- 'Tìm cách giải quyết': Phải dùng 解決策を考える, không dùng 思う.\n- 'Tôi nghĩ ngày mai trời sẽ mưa': Phải dùng 明日は雨が降ると思う, không dùng 考える vì đây là nhận định phỏng đoán cá nhân.",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-ok-1",
        "japanese": "この映画はとても面白いと思います。",
        "reading": "このえいがはとてもおもしろいとおもいます。",
        "romaji": "Kono eiga wa totemo omoshiroi to omoimasu.",
        "vietnamese": "Tôi thấy bộ phim này rất là thú vị.",
        "explanation": "Cảm nhận chủ quan về bộ phim sau khi xem xong.",
        "context": "Nêu cảm tưởng sau buổi xem phim"
      },
      {
        "id": "ex-ok-2",
        "japanese": "いくら考えても、いいアイデアが浮かびません。",
        "reading": "いくらかんがえても、いいアイデアがうかびません。",
        "romaji": "Ikura kangaete mo, ii aidea ga ukabimasen.",
        "vietnamese": "Dù có vắt óc suy nghĩ bao nhiêu đi nữa, tôi vẫn không nảy ra được ý tưởng hay nào.",
        "explanation": "考える thể hiện nỗ lực tư duy tìm giải pháp.",
        "context": "Họp bàn ý tưởng chiến dịch"
      },
      {
        "id": "ex-ok-3",
        "japanese": "どう思う？ — 少し考えさせてください。",
        "reading": "どうおもう？ — すこしかんがえさせてください。",
        "romaji": "Dou omou? — Sukoshi kangaesasete kudasai.",
        "vietnamese": "Cậu thấy thế nào? — Hãy để tôi suy nghĩ cân nhắc một lát đã.",
        "explanation": "Hỏi cảm nhận (思う) đối đáp với việc xin thời gian tư duy cân nhắc (考える).",
        "context": "Trao đổi quyết định kinh doanh"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "明日行くと思う (思う)",
          "nuance": "A là linh cảm/ý định tự nhiên (chắc mai tôi sẽ đi). B là ngồi cân nhắc lịch trình xem có nên đi hay không.",
          "example": "明日行くと思う (思う)",
          "exampleTranslation": "明日行くか考える (考える)",
          "caution": "A là linh cảm/ý định tự nhiên (chắc mai tôi sẽ đi). B là ngồi cân nhắc lịch trình xem có nên đi hay không."
        }
      ],
      "summary": "A là linh cảm/ý định tự nhiên (chắc mai tôi sẽ đi). B là ngồi cân nhắc lịch trình xem có nên đi hay không."
    },
    "notes": [
      "Trong giao tiếp tiếng Nhật, đưa ra ý kiến bằng 〜と思います là chuẩn mực giao tiếp quan trọng để không tỏ ra độc đoán."
    ],
    "warnings": [
      "Không dùng 考えています để kết thúc câu nêu quan điểm cá nhân thông thường trong hội thoại (nói 私の意見は...と考えます nghe rất cứng nhắc như văn bản học thuật)."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "phan-biet-shiru-va-wakaru",
        "title": "Phân biệt 知る (shiru) và 分かる (wakaru) - Biết thông tin vs Thấu hiểu bản chất",
        "reason": "Cặp động từ nhận thức trí tuệ bổ trợ"
      },
      {
        "category": "grammar",
        "slug": "the-y-chi-ikoukei-va-cau-truc-du-dinh",
        "title": "Thể ý chí (Ikoukei): Cách chia, rủ rê suồng sã và cấu trúc 〜ようと思う",
        "reason": "Cấu trúc biểu đạt ý định nhen nhóm với と思う"
      },
      {
        "category": "conversation",
        "slug": "ky-nang-tan-gau-small-talk",
        "title": "Kỹ năng tán gẫu (Aizuchi & Small Talk): Mở lời về thời tiết, đồ ăn và giữ nhịp trò chuyện",
        "reason": "Nêu quan điểm mềm mại trong giao tiếp xã giao"
      }
    ]
  },
  {
    "id": "v-tsukuru-kanji",
    "slug": "phan-biet-chu-han-dong-tu-tsukuru",
    "categoryId": "vocabulary",
    "title": "Phân biệt các chữ Hán của động từ 'Làm ra': 作る (đồ vật/món ăn) vs 造る (công trình/quy mô lớn) vs 創る (sáng tạo độc bản)",
    "japaneseTitle": "「つくる」の漢字使い分け：作る・造る・創る",
    "summary": "Hiểu rõ khi nào dùng chữ Tác (作る), chữ Tạo (造る) và chữ Sáng (創る) để viết đúng chính tả tiếng Nhật trong đời sống, kỹ thuật và văn học nghệ thuật.",
    "level": "N4",
    "tags": [
      "Từ vựng",
      "Chữ Hán đồng âm",
      "Kanji",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-tsk-1",
        "title": "1. 作る (Chữ TÁC - 作): Đồ vật thông dụng, Món ăn và Quan hệ",
        "content": "Là chữ phổ biến nhất trong đời sống hàng ngày, học ở cấp độ N5.\n- Làm đồ thủ công, vật dụng nhỏ: 箱を作る (làm cái hộp), 洋服を作る (may quần áo).\n- Nấu nướng: 料理を作る (nấu ăn), ケーキを作る (làm bánh kem).\n- Xây dựng quan hệ vô hình: 友達を作る (kết bạn), 記録を作る (lập kỷ lục).",
        "type": "rule"
      },
      {
        "id": "sec-tsk-2",
        "title": "2. 造る (Chữ TẠO - 造): Công trình lớn, Phương tiện và Lên men",
        "content": "Dùng cho những thứ có QUY MÔ LỚN, CÔNG TRÌNH VẬT CHẤT KIÊN CỐ hoặc QUÁ TRÌNH LÊN MEN CÔNG NGHIỆP:\n- Công trình kiến trúc, hạ tầng: 家を造る (xây nhà lớn), 庭を造る (làm sân vườn lớn), 船を造る (đóng tàu thủy - 造船).\n- Đồ uống lên men: 酒を造る (nấu rượu sake), ビールを造る (nấu ủ bia).",
        "type": "rule"
      },
      {
        "id": "sec-tsk-3",
        "title": "3. 創る (Chữ SÁNG - 創): Sáng tạo nghệ thuật và Cái mới chưa từng có",
        "content": "Dùng trong văn chương nghệ thuật, sáng tạo những giá trị tinh thần mang tính ĐỘC BẢN hoặc CHƯA TỪNG TỒN TẠI TRƯỚC ĐÂY:\n- Nghệ thuật & Tác phẩm: 新しい時代を創る (kiến tạo thời đại mới), 音楽を創る (sáng tác âm nhạc).\n- Từ ghép thường gặp: 創造 (sáng tạo), 創立 (sáng lập).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-tsk-1",
        "japanese": "母と一緒に晩ご飯を作りました。",
        "reading": "ははといっしょにばんごはんをつくりました。",
        "romaji": "Haha to issho ni bangohan o tsukurimashita.",
        "vietnamese": "Tôi đã cùng mẹ nấu bữa cơm tối.",
        "explanation": "Nấu ăn đời thường bắt buộc dùng chữ Tác 作る.",
        "context": "Kể chuyện sinh hoạt gia đình"
      },
      {
        "id": "ex-tsk-2",
        "japanese": "この蔵では200年前から日本酒を造っています。",
        "reading": "このくらではにひゃくねんまえからにほんしゅをつくっています。",
        "romaji": "Kono kura de wa nihyakunen mae kara nihonshu o tsukutte imasu.",
        "vietnamese": "Xưởng rượu này đã ủ nấu rượu Sake Nhật từ 200 năm trước.",
        "explanation": "Nấu rượu lên men dùng chữ Tạo 造る.",
        "context": "Tham quan làng nghề nấu rượu truyền thống"
      },
      {
        "id": "ex-tsk-3",
        "japanese": "若者たちが新しい文化を創り出しています。",
        "reading": "わかものたちがあたらしいぶんかをくりだしています。",
        "romaji": "Wakamonotachi ga atarashii bunka o tsukuridashite imasu.",
        "vietnamese": "Những người trẻ đang sáng tạo nên một nền văn hóa mới.",
        "explanation": "Sáng tạo giá trị văn hóa chưa từng có dùng chữ Sáng 創る.",
        "context": "Bình luận xã hội về giới trẻ"
      }
    ],
    "notes": [
      "Trong trường hợp không chắc chắn giữa 造る và 作る, viết 作る hoặc viết bằng hiragana つくる luôn là lựa chọn an toàn không bị trừ điểm trong bài viết thông thường."
    ],
    "warnings": [
      "Không dùng 造る cho việc nấu nướng các món ăn gia đình thông thường (ví dụ: 'ご飯を造る' là sai chữ Hán)."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "quy-tac-chuyen-am-han-viet-sang-on-yomi",
        "title": "Quy tắc vàng chuyển âm Hán - Việt sang Âm On (Onyomi) tiếng Nhật",
        "reason": "Âm On của các chữ Hán Tác (Saku), Tạo (Zou), Sáng (Sou)"
      },
      {
        "category": "vocabulary",
        "slug": "phan-biet-tsukau-va-riyou-suru",
        "title": "Phân biệt 使う (tsukau) và 利用する (riyou suru) - Dùng công cụ vs Tận dụng cơ hội",
        "reason": "Mối liên hệ giữa việc chế tạo công cụ và sử dụng công cụ"
      },
      {
        "category": "vocabulary",
        "slug": "cum-tu-collocation-sinh-hoat-doi-song",
        "title": "Collocation thiết yếu trong sinh hoạt: 電話をかける, 写真を撮る, 約束をする",
        "reason": "Các cụm từ tự nhiên với 作る trong đời sống"
      }
    ]
  },
  {
    "id": "v-takusan-ooi",
    "slug": "phan-biet-takusan-va-ooi",
    "categoryId": "vocabulary",
    "title": "Phân biệt たくさん (phó từ/danh từ) và 多い (tính từ vị ngữ): Bẫy ngữ pháp 'Nhiều người'",
    "japaneseTitle": "「たくさん」と「多い」の使い分け：「人が多い」の正しい文法",
    "summary": "Vạch trần lỗi sai phổ biến bậc nhất của người học tiếng Nhật: Tại sao không được nói 'たくさん人' mà phải nói 'たくさんの人' hoặc dùng tính từ vị ngữ '人が多い'?",
    "level": "N5",
    "tags": [
      "Từ vựng",
      "Tính từ",
      "Phó từ",
      "comparison",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-to-1",
        "title": "1. Bản chất từ loại: たくさん (Phó từ/Danh từ) vs 多い (Tính từ đuôi -i)",
        "content": "- たくさん: Vốn là một PHÓ TỪ hoặc DANH TỪ. Nó bổ nghĩa trực tiếp cho động từ (たくさん食べる - ăn nhiều). Nếu muốn bổ nghĩa trực tiếp cho danh từ đứng sau, BẮT BUỘC phải thêm の: [たくさんの + Danh từ] (たくさんの人 - nhiều người).\n- 多い (ooi): Là một TÍNH TỪ ĐUÔI -I. Tuy nhiên, 多い có quy tắc hạn chế đặc biệt: Nó hầu như KHÔNG BAO GIỜ đứng trực tiếp trước danh từ để bổ nghĩa đơn độc (không nói '多い人' [SAI]).",
        "type": "rule"
      },
      {
        "id": "sec-to-2",
        "title": "2. Cách dùng chuẩn của 多い: Luôn làm VỊ NGỮ",
        "content": "Tính từ 多い được dùng tự nhiên nhất khi đứng ở VỊ NGỮ của câu theo cấu trúc:\n[Chủ đề/Địa điểm + は + Danh từ + が多い].\n\nVí dụ:\n- 東京は人が多いです (Tokyo thì đông người / nhiều người).\n- この町は公園が多い (Thị trấn này có nhiều công viên).\nĐây là cách diễn đạt tự nhiên chuẩn mực nhất của người bản xứ.",
        "type": "pattern"
      },
      {
        "id": "sec-to-3",
        "title": "3. Bảng sửa lỗi nhanh người Việt hay mắc",
        "content": "- Sai: 公園にたくさん人がいます -> Sửa: 公園に人がたくさんいます (cho たくさん đứng trước động từ) hoặc 公園にたくさんの人がいます.\n- Sai: 多い人が来ました -> Sửa: たくさんの人が来ました hoặc 来た人が多かったです.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-to-1",
        "japanese": "休日のショッピングモールは人が多いですね。",
        "reading": "きゅうじつのショッピングモールはひとがおおいですね。",
        "romaji": "Kyuujitsu no shoppingu mooru wa hito ga ooi desu ne.",
        "vietnamese": "Trung tâm thương mại vào ngày nghỉ đông người thật đấy nhỉ.",
        "explanation": "Dùng tính từ 多い làm vị ngữ miêu tả số lượng người đông đúc (人が多い).",
        "context": "Đi chơi trung tâm thương mại cuối tuần"
      },
      {
        "id": "ex-to-2",
        "japanese": "昨日、本をたくさん買いました。",
        "reading": "きのう、ほんをたくさんかいました。",
        "romaji": "Kinou, hon o takusan kaimashita.",
        "vietnamese": "Hôm qua tôi đã mua rất nhiều sách.",
        "explanation": "たくさん làm phó từ bổ nghĩa trực tiếp cho động từ 買いました.",
        "context": "Kể về chuyến đi hiệu sách"
      },
      {
        "id": "ex-to-3",
        "japanese": "たくさんの友達が集まってくれました。",
        "reading": "たくさんのともだちがあつまってくれました。",
        "romaji": "Takusan no tomodachi ga atsumatte kuremashita.",
        "vietnamese": "Rất nhiều bạn bè đã đến tụ họp chung vui với tôi.",
        "explanation": "Dùng たくさんの đi trước danh từ 友達.",
        "context": "Tâm sự sau bữa tiệc sinh nhật"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "人が多い (多い)",
          "nuance": "A dùng 多い làm tính từ vị ngữ miêu tả trạng thái đông đúc. B dùng たくさん làm phó từ bổ nghĩa cho hành động thu gom/tập hợp.",
          "example": "人が多い (多い)",
          "exampleTranslation": "人をたくさん集める (たくさん)",
          "caution": "A dùng 多い làm tính từ vị ngữ miêu tả trạng thái đông đúc. B dùng たくさん làm phó từ bổ nghĩa cho hành động thu gom/tập hợp."
        }
      ],
      "summary": "A dùng 多い làm tính từ vị ngữ miêu tả trạng thái đông đúc. B dùng たくさん làm phó từ bổ nghĩa cho hành động thu gom/tập hợp."
    },
    "notes": [
      "Quy tắc không đứng trước danh từ đơn độc cũng áp dụng cho tính từ trái nghĩa 少ない (sukunai - ít): Không nói 少ない人 mà nói 人が少ない."
    ],
    "warnings": [
      "Tuyệt đối không ghép trực tiếp: 'たくさん人' (thiếu trợ từ の)."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-tro-tu-wa-va-ga",
        "title": "Phân biệt trợ từ は (wa) và が (ga) - Bản chất và ngữ cảnh sử dụng",
        "reason": "Cấu trúc chủ đề và vị ngữ [Địa điểm は Danh từ が多い]"
      },
      {
        "category": "grammar",
        "slug": "so-sanh-kurai-hodo-yori",
        "title": "So sánh mức độ và ước lượng: くらい / ぐらい, ほど và より",
        "reason": "Các mẫu câu ước lượng mức độ và số lượng"
      },
      {
        "category": "notes",
        "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        "reason": "Bẫy dịch từ 'nhiều' từ tiếng Việt sang tiếng Nhật"
      }
    ]
  },
  {
    "id": "v-sugu-suguni",
    "slug": "phan-biet-sugu-va-suguni",
    "categoryId": "vocabulary",
    "title": "Phân biệt すぐ (ngay lập tức / cự ly rất gần) và すぐに (ngay tức thì về mặt thời gian)",
    "japaneseTitle": "「すぐ」と「すぐに」の違い：空間的距離と時間的即時性",
    "summary": "Hiểu rõ sự khác biệt: すぐ vừa chỉ khoảng cách không gian cực gần vừa chỉ thời gian, trong khi すぐに thuần túy chỉ tính tức thì về mặt thời gian.",
    "level": "N5",
    "tags": [
      "Từ vựng",
      "Phó từ",
      "Thời gian",
      "Không gian",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ss-1",
        "title": "1. すぐ (Sugu): Đa năng - Cả Không gian lẫn Thời gian",
        "content": "Từ すぐ có phạm vi sử dụng rộng hơn nhiều:\n- Khoảng cách không gian cực gần (Gần ngay cạnh): 駅のすぐ近く (ngay sát cạnh nhà ga), コンビニは家のすぐそこです (tiệm tiện lợi ở ngay đằng kia).\n- Thời gian ngắn nảy sinh: すぐ戻ります (tôi sẽ quay lại ngay).\n- Trực tiếp đi trước danh từ: [すぐ + Danh từ] (すぐ隣 - ngay sát vách).",
        "type": "rule"
      },
      {
        "id": "sec-ss-2",
        "title": "2. すぐに (Sugu ni): Chuyên biệt về Tính tức thì của Thời gian",
        "content": "Khi thêm trợ từ に vào thành すぐに, từ này trở thành một phó từ chỉ thời gian tuyệt đối:\n- Nhấn mạnh hành động diễn ra TỨC KHẮC, NGAY LẬP TỨC KHÔNG CHẬM TRỄ.\n- Ví dụ: 救急車を呼ぶと、すぐに来ました (Khi gọi xe cấp cứu, xe tới ngay lập tức).\n- Chú ý: すぐに TUYỆT ĐỐI KHÔNG dùng để chỉ cự ly không gian (không nói 'すぐに近く' [SAI]).",
        "type": "rule"
      },
      {
        "id": "sec-ss-3",
        "title": "3. Tóm tắt quy tắc chọn lựa",
        "content": "- Chỉ vị trí cự ly gần: Bắt buộc dùng すぐ (すぐそこ, すぐ隣, すぐ前).\n- Chỉ hành động phản hồi khẩn cấp: Dùng すぐに hoặc すぐ đều được, nhưng すぐに mang lại cảm giác dứt khoát và trang trọng hơn trong ngữ cảnh công việc.",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-ss-1",
        "japanese": "郵便局は銀行のすぐ隣にあります。",
        "reading": "ゆうびんきょくはぎんこうのすぐとなりにあります。",
        "romaji": "Yuubinkyoku wa ginkou no sugu tonari ni arimasu.",
        "vietnamese": "Bưu điện nằm ở ngay sát vách ngân hàng.",
        "explanation": "Chỉ vị trí không gian cự ly cực gần bắt buộc dùng すぐ.",
        "context": "Chỉ đường cho người hỏi"
      },
      {
        "id": "ex-ss-2",
        "japanese": "メールを確認したら、すぐに返信してください。",
        "reading": "メールをかくにんしたら、すぐにへんしんしてください。",
        "romaji": "Meeru o kakunin shitara, sugu ni henshin shite kudasai.",
        "vietnamese": "Sau khi kiểm tra email, xin hãy hồi âm lại ngay lập tức.",
        "explanation": "Hành động phản hồi tức khắc về mặt thời gian dùng すぐに.",
        "context": "Chỉ đạo công việc gấp"
      },
      {
        "id": "ex-ss-3",
        "japanese": "薬を飲んだら、すぐに熱が下がりました。",
        "reading": "くすりをのんだら、すぐにねつがさがりました。",
        "romaji": "Kusuri o nondara, sugu ni netsu ga sagarimashita.",
        "vietnamese": "Uống thuốc xong một cái là cơn sốt hạ xuống ngay tức thì.",
        "explanation": "Hiệu quả tức thì về mặt thời gian.",
        "context": "Kể lại chuyển biến sức khỏe"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "すぐ隣 (すぐ)",
          "nuance": "すぐ có thể bổ nghĩa vị trí khoảng cách không gian. すぐに chỉ đi với hành động xảy ra ngay về thời gian.",
          "example": "すぐ隣 (すぐ)",
          "exampleTranslation": "すぐに返信する (すぐに)",
          "caution": "すぐ có thể bổ nghĩa vị trí khoảng cách không gian. すぐに chỉ đi với hành động xảy ra ngay về thời gian."
        }
      ],
      "summary": "すぐ có thể bổ nghĩa vị trí khoảng cách không gian. すぐに chỉ đi với hành động xảy ra ngay về thời gian."
    },
    "notes": [
      "Trong giao tiếp thường ngày, người Nhật hay nói [すぐ行くね] (tớ tới ngay đây) rất thân mật và tự nhiên."
    ],
    "warnings": [
      "Không bao giờ nói '駅のすぐに前' (chỉ vị trí không gian không được dùng に)."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "pho-tu-chi-muc-do-thuong-gap",
        "title": "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
        "reason": "Hệ thống phó từ chỉ thời gian và mức độ trong tiếng Nhật"
      },
      {
        "category": "conversation",
        "slug": "hoi-va-chi-duong-trong-thuc-te",
        "title": "Hỏi và chỉ đường thực tế tại Nhật: Cấu trúc câu và từ vựng định hướng",
        "reason": "Ứng dụng すぐ khi chỉ đường và cự ly gần"
      },
      {
        "category": "notes",
        "slug": "doc-cau-theo-nhip-mora-thay-vi-tung-chu",
        "title": "Cách đọc câu tiếng Nhật theo nhịp phách (Mora) thay vì từng chữ cái riêng rẽ",
        "reason": "Cách nhấn phách khi nói すぐに để thể hiện sự khẩn trương"
      }
    ]
  },
  {
    "id": "v-kirei-utsukushii",
    "slug": "phan-biet-kirei-va-utsukushii",
    "categoryId": "vocabulary",
    "title": "Phân biệt きれい (sạch sẽ, gọn gàng, xinh xắn) và 美しい (đẹp thanh cao, nghệ thuật, rung cảm)",
    "japaneseTitle": "「きれい」と「美しい」の使い分け：日常的な美と崇高な美",
    "summary": "Khám phá hai lăng kính thẩm mỹ trong tiếng Nhật: きれい quen thuộc trong đời sống gắn liền với sự sạch sẽ ngăn nắp, và 美しい mang chiều sâu rung cảm nghệ thuật thanh cao.",
    "level": "N4",
    "tags": [
      "Từ vựng",
      "Tính từ",
      "Gần nghĩa",
      "comparison",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ku-1",
        "title": "1. きれい (Kirei - 綺麗): Tính từ đuôi -na của đời sống hàng ngày",
        "content": "きれい có phạm vi bao phủ rất rộng trong sinh hoạt thường nhật:\n- Sạch sẽ, tinh tươm: 部屋をきれいにする (dọn phòng sạch sẽ).\n- Đẹp mắt, ưa nhìn: きれいな花 (bông hoa đẹp), きれいな人 (cô gái xinh đẹp).\n- Rõ ràng, thanh thoát: きれいな声 (giọng nói trong trẻo).\nĐặc biệt: Mang nghĩa 'sạch / không vết bẩn' mà 美しい không bao giờ có.",
        "type": "rule"
      },
      {
        "id": "sec-ku-2",
        "title": "2. 美しい (Utsukushii - 美しい): Tính từ đuôi -i của cái đẹp cao quý",
        "content": "美しい là từ mang sắc thái trang trọng, văn học, gợi lên sự rung động sâu sắc trong tâm hồn:\n- Vẻ đẹp hùng vĩ của thiên nhiên: 美しい夕焼け (hoàng hôn đẹp tráng lệ), 美しい富士山 (núi Phú Sĩ tuyệt mỹ).\n- Vẻ đẹp đạo đức, tâm hồn: 美しい心 (tâm hồn cao đẹp).\n- Tác phẩm nghệ thuật đỉnh cao: 美しい旋律 (giai điệu tuyệt mỹ).",
        "type": "rule"
      },
      {
        "id": "sec-ku-3",
        "title": "3. Điểm khác biệt mấu chốt",
        "content": "- 'Phòng này sạch sẽ quá': Bắt buộc dùng [この部屋はきれいです]. Tuyệt đối không dùng 美しい vì căn phòng sạch bụi không phải là vẻ đẹp nghệ thuật thanh cao.\n- 'Trái tim cao đẹp': Dùng [美しい心], dùng きれいな心 nghe rất ngây thơ trẻ con.",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-ku-1",
        "japanese": "掃除をしたので、部屋がとてもきれいになりました。",
        "reading": "そうじをしたので、へやがとてもきれいになりました。",
        "romaji": "Souji o shita node, heya ga totemo kirei ni narimashita.",
        "vietnamese": "Vì đã dọn dẹp nên căn phòng đã trở nên rất sạch sẽ.",
        "explanation": "Kirei ở đây mang nghĩa sạch sẽ tinh tươm sau khi quét dọn.",
        "context": "Sau buổi tổng vệ sinh nhà cửa"
      },
      {
        "id": "ex-ku-2",
        "japanese": "山頂から見た朝日は息をのむほど美しかったです。",
        "reading": "さんちょうからみたあさひはいきをのむほどつくしかったです。",
        "romaji": "Sanchou kara mita asahi wa iki o nomu hodo utsukushikatta desu.",
        "vietnamese": "Bình minh nhìn từ đỉnh núi đẹp đến mức nghẹt thở.",
        "explanation": "Cảnh sắc thiên nhiên tráng lệ làm rung động tâm hồn dùng 美しい.",
        "context": "Kể lại chuyến leo núi ngắm bình minh"
      },
      {
        "id": "ex-ku-3",
        "japanese": "彼女は立ち居振る舞いが美しい人です。",
        "reading": "かのじょはたちいふるまいがうつくしいひとです。",
        "romaji": "Kanojo wa tachiifurumai ga utsukushii hito desu.",
        "vietnamese": "Cô ấy là một người có phong thái và cử chỉ vô cùng thanh nhã.",
        "explanation": "Vẻ đẹp cử chỉ cốt cách đoan trang dùng 美しい.",
        "context": "Khen ngợi khí chất một người phụ nữ"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "手がきれい (きれい)",
          "nuance": "A có thể chỉ đơn giản là bàn tay vừa rửa xà phòng sạch sẽ không dính bẩn. B là bàn tay thon dài thanh tú như tác phẩm điêu khắc nghệ thuật.",
          "example": "手がきれい (きれい)",
          "exampleTranslation": "美しい手 (美しい)",
          "caution": "A có thể chỉ đơn giản là bàn tay vừa rửa xà phòng sạch sẽ không dính bẩn. B là bàn tay thon dài thanh tú như tác phẩm điêu khắc nghệ thuật."
        }
      ],
      "summary": "A có thể chỉ đơn giản là bàn tay vừa rửa xà phòng sạch sẽ không dính bẩn. B là bàn tay thon dài thanh tú như tác phẩm điêu khắc nghệ thuật."
    },
    "notes": [
      "Chữ Hán của きれい là 綺麗, tuy nhiên trong đời sống người Nhật thường viết bằng chữ hiragana きれい."
    ],
    "warnings": [
      "Nhớ rằng きれい là TÍNH TỪ ĐUÔI -NA dù đuôi kết thúc bằng chữ い (bổ nghĩa: きれいな部屋)."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "tu-dien-tu-tuong-thanh-tu-tuong-hinh",
        "title": "Từ tượng thanh & Từ tượng hình (Onomatopoeia) căn bản trong đời sống",
        "reason": "Các từ tượng hình miêu tả vẻ đẹp lấp lánh (Pikapika, Kirakira)"
      },
      {
        "category": "conversation",
        "slug": "ky-nang-tan-gau-small-talk",
        "title": "Kỹ năng tán gẫu (Aizuchi & Small Talk): Mở lời về thời tiết, đồ ăn và giữ nhịp trò chuyện",
        "reason": "Khen ngợi phong cảnh hoặc đồ dùng trong cuộc trò chuyện"
      },
      {
        "category": "notes",
        "slug": "khi-nao-khong-nen-dich-word-by-word",
        "title": "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        "reason": "Bẫy dịch từ 'đẹp' từ tiếng Việt sang tiếng Nhật"
      }
    ]
  },
  {
    "id": "v-benri-yakunitatsu",
    "slug": "phan-biet-benri-va-yakunitatsu",
    "categoryId": "vocabulary",
    "title": "Phân biệt 便利 (tiện lợi về tiện nghi, công cụ) và 役に立つ (hữu ích, phát huy giá trị trong thực tế)",
    "japaneseTitle": "「便利」と「役に立つ」の違い：機能の利便性と実質的な有用性",
    "summary": "Tách bạch giữa 便利 (sự tiện lợi giúp tiết kiệm công sức, thời gian nhờ cơ sở vật chất, tính năng) và cụm động từ 役に立つ (thực sự phát huy vai trò đắc lực, có ích cho con người).",
    "level": "N5",
    "tags": [
      "Từ vựng",
      "Tính từ",
      "Cụm động từ",
      "comparison",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-by-1",
        "title": "1. 便利 (Benri - 便利): Tính từ tiện nghi, tiện dụng",
        "content": "便利 là tính từ đuôi -na, miêu tả tính chất của một sự vật, địa điểm, công cụ giúp con người tiết kiệm thời gian, công sức hoặc thao tác dễ dàng:\n- Vị trí thuận lợi: 駅の近くは便利です (gần nhà ga thì rất tiện lợi).\n- Đồ dùng thông minh: スマホは便利です (điện thoại thông minh rất tiện).\n- Trái nghĩa: 不便 (fuben - bất tiện).",
        "type": "rule"
      },
      {
        "id": "sec-by-2",
        "title": "2. 役に立つ (Yaku ni tatsu - 役に立つ): Cụm động từ hữu ích thực tế",
        "content": "役に立つ là một cụm động từ (nghĩa đen: đứng ở vai trò có ích), biểu thị một kiến thức, lời khuyên, trải nghiệm hoặc con người phát huy giá trị đắc lực trong một tình huống cụ thể:\n- Lời khuyên bổ ích: 先輩のアドバイスはとても役に立ちました (Lời khuyên của tiền bối rất hữu ích).\n- Kiến thức có ích: 日本語の勉強は将来役に立ちます (Học tiếng Nhật sẽ có ích cho tương lai sau này).\n- Người có ích: 社会の役に立つ人になりたい (Tôi muốn trở thành người có ích cho xã hội).",
        "type": "rule"
      },
      {
        "id": "sec-by-3",
        "title": "3. Điểm khác biệt mang tính quyết định",
        "content": "- Với CON NGƯỜI: Tuyệt đối không nói 'あの人は便利です' (người đó tiện lợi - nghe như coi người ta là công cụ lợi dụng). Bắt buộc phải dùng [役に立つ人] (người có ích).\n- Với LỜI KHUYÊN/TRI THỨC: Dùng 役に立つ tự nhiên hơn nhiều so với 便利.",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-by-1",
        "japanese": "このアプリは電車の乗り換えを調べるのに便利です。",
        "reading": "このアプリはでんしゃののりかえをしらべるのにべんりです。",
        "romaji": "Kono apuri wa densha no norikae o shiraberu no ni benri desu.",
        "vietnamese": "Ứng dụng này rất tiện lợi cho việc tra cứu đổi tuyến tàu điện.",
        "explanation": "Công cụ phần mềm tiết kiệm thời gian tra cứu dùng 便利.",
        "context": "Giới thiệu ứng dụng hữu ích trên điện thoại"
      },
      {
        "id": "ex-by-2",
        "japanese": "先生から教わった勉強法が試験で役に立ちました。",
        "reading": "せんせいからおそわったべんきょうほうがしけんでやくにたちました。",
        "romaji": "Sensei kara osowatta benkyouhou ga shiken de yaku ni tachimashita.",
        "vietnamese": "Phương pháp học được thầy chỉ dạy đã phát huy tác dụng rất tốt trong kỳ thi.",
        "explanation": "Phương pháp phát huy giá trị thực tế dùng 役に立つ.",
        "context": "Báo cáo kết quả thi với thầy cô"
      },
      {
        "id": "ex-by-3",
        "japanese": "誰かの役に立ちたいと思って、ボランティアに参加しました。",
        "reading": "だれかのやくにたちたいとおもって、ボランティアにさんかしました。",
        "romaji": "Dareka no yaku ni tachitai to omotte, borantia ni sanka shimashita.",
        "vietnamese": "Với mong muốn giúp ích được cho ai đó, tôi đã tham gia hoạt động tình nguyện.",
        "explanation": "Giúp ích cho con người dùng 役に立ちたい.",
        "context": "Phỏng vấn hoạt động tình nguyện"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "便利な辞書 (便利)",
          "nuance": "Cuốn từ điển tra nhanh, nhẹ gọi là 便利. Kiến thức học được giúp giải quyết bài toán gọi là 役に立つ.",
          "example": "便利な辞書 (便利)",
          "exampleTranslation": "役に立つ知識 (役に立つ)",
          "caution": "Cuốn từ điển tra nhanh, nhẹ gọi là 便利. Kiến thức học được giúp giải quyết bài toán gọi là 役に立つ."
        }
      ],
      "summary": "Cuốn từ điển tra nhanh, nhẹ gọi là 便利. Kiến thức học được giúp giải quyết bài toán gọi là 役に立つ."
    },
    "notes": [
      "Trong văn phong trang trọng, cụm [役に立つ] có thể được chuyển thành dạng danh từ [お役に立てて光栄です] (rất vinh hạnh được giúp ích cho quý khách)."
    ],
    "warnings": [
      "Không dùng 便利 để khen ngợi bạn bè hay đồng nghiệp."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "phan-biet-tsukau-va-riyou-suru",
        "title": "Phân biệt 使う (tsukau) và 利用する (riyou suru) - Dùng công cụ vs Tận dụng cơ hội",
        "reason": "Mối liên hệ giữa công cụ và việc áp dụng hữu ích"
      },
      {
        "category": "conversation",
        "slug": "giao-tiep-trong-truong-dai-hoc",
        "title": "Giao tiếp trong trường học & đại học: Trao đổi với giáo sư, hỏi bài bạn học",
        "reason": "Hỏi và đánh giá tài liệu học tập hữu ích"
      },
      {
        "category": "notes",
        "slug": "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        "title": "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        "reason": "Cách ghi nhớ cụm 役に立つ như một collocation cố định"
      }
    ]
  },
  {
    "id": "v-trai-nghia-khong-gian",
    "slug": "tu-vung-trai-nghia-khong-gian-vi-tri",
    "categoryId": "vocabulary",
    "title": "Cặp từ trái nghĩa vị trí không gian: 上/下, 前/後, 入る/出る và cách phối hợp trợ từ",
    "japaneseTitle": "空間と位置の対義語：上・下、前・後、入る・出る",
    "summary": "Nắm vững các cặp từ trái nghĩa định vị không gian cốt lõi và quy luật chuyển dịch trợ từ đi kèm (に/で/を) khi di chuyển vào - ra hoặc chuyển vị trí trước - sau.",
    "level": "N5",
    "tags": [
      "Từ vựng",
      "Trái nghĩa",
      "Không gian",
      "Trợ từ",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-tnk-1",
        "title": "1. Cặp từ vị trí tĩnh: 上 (Trên) vs 下 (Dưới)",
        "content": "- 上 (うえ - ue): Phía trên. 机の上 (trên bàn).\n- 下 (した - shita): Phía dưới. いすの下 (dưới gầm ghế).\nQuy tắc trợ từ tồn tại: [Vị trí + の + 上/下 + に + Danh từ + があります/います].\nVí dụ: 机の上に鍵があります (Trên bàn có chìa khóa).",
        "type": "rule"
      },
      {
        "id": "sec-tnk-2",
        "title": "2. Cặp từ thời không: 前 (Trước) vs 後ろ (Sau)",
        "content": "- 前 (まえ - mae): Phía trước về không gian (駅の前 - trước nhà ga) hoặc Trước về thời gian (3時前 - trước 3 giờ, 寝る前に - trước khi ngủ).\n- 後ろ (うしろ - ushiro): Phía sau về không gian (車の後ろ - phía sau xe ô tô).\nChú ý: Sau về thời gian người Nhật dùng 後 (あと / のち), không dùng 後ろ (うしろ).",
        "type": "pattern"
      },
      {
        "id": "sec-tnk-3",
        "title": "3. Cặp động từ di chuyển: 入る (Vào) vs 出る (Ra)",
        "content": "Quy tắc phối hợp trợ từ sống còn:\n- Đi vào điểm đích: Luôn dùng trợ từ に [Địa điểm + に入る] (部屋に入る - bước vào phòng).\n- Đi ra khỏi điểm xuất phát: Luôn dùng trợ từ を [Địa điểm + を出る] (部屋を出る - bước ra khỏi phòng).\nLỗi kinh điển: Người học hay dùng から cho 出る thay vì を.",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-tnk-1",
        "japanese": "猫がベッドの下で寝ています。",
        "reading": "ねこがベッドのしたでねています。",
        "romaji": "Neko ga beddo no shita de nete imasu.",
        "vietnamese": "Con mèo đang ngủ ở dưới gầm giường.",
        "explanation": "Xác định vị trí không gian tĩnh bằng 下 (した).",
        "context": "Tìm thú cưng trong phòng"
      },
      {
        "id": "ex-tnk-2",
        "japanese": "駅前のカフェで待ち合わせしましょう。",
        "reading": "えきまえのカフェでまちあわせしましょう。",
        "romaji": "Ekimae no kafe de machiawase shimashou.",
        "vietnamese": "Chúng ta hãy hẹn gặp nhau ở quán cà phê trước nhà ga nhé.",
        "explanation": "前 (まえ) ghép danh từ thành 駅前 (trước cửa ga).",
        "context": "Hẹn gặp bạn bè"
      },
      {
        "id": "ex-tnk-3",
        "japanese": "お風呂に入ってから、部屋を出ました。",
        "reading": "おふろにはいってから、へやをでました。",
        "romaji": "Ofuro ni haitte kara, heya o demashita.",
        "vietnamese": "Sau khi vào ngâm bồn tắm xong, tôi đã rời khỏi phòng.",
        "explanation": "Đối chiếu trợ từ に cho 入る và を cho 出る.",
        "context": "Kể lại các sinh hoạt trong khách sạn"
      }
    ],
    "notes": [
      "Từ ghép không gian thông dụng: 右 (phải), 左 (trái), 中 (trong), 外 (ngoài), 隣 (bên cạnh), 近く (gần)."
    ],
    "warnings": [
      "Không nhầm うしろ (phía sau lưng về không gian) với あと (sau này về thời gian)."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-ni-va-de",
        "title": "Phân biệt trợ từ に (ni) và で (de) chỉ nơi chốn & thời gian",
        "reason": "Trợ từ chỉ vị trí và điểm rơi của chuyển động"
      },
      {
        "category": "grammar",
        "slug": "tro-tu-o-dich-tac-dong-va-khong-gian",
        "title": "Trợ từ を (o): Đích tác động của hành động và bẫy không gian chuyển động rời khỏi",
        "reason": "Trợ từ を đi với động từ rời khỏi (部屋を出る)"
      },
      {
        "category": "conversation",
        "slug": "hoi-va-chi-duong-trong-thuc-te",
        "title": "Hỏi và chỉ đường thực tế tại Nhật: Cấu trúc câu và từ vựng định hướng",
        "reason": "Ứng dụng từ vựng không gian khi chỉ đường"
      }
    ]
  },
  {
    "id": "v-trai-nghia-dong-mo",
    "slug": "tu-vung-trai-nghia-dong-mo-tang-giam",
    "categoryId": "vocabulary",
    "title": "Cặp từ trái nghĩa trạng thái: 開ける/閉める, 開く/閉まる, 増える/減る",
    "japaneseTitle": "状態変化の対義語：開閉・増減と自動詞・他動詞の対応",
    "summary": "Nắm chắc các cặp từ biến chuyển trạng thái đối lập: Đóng/Mở (kèm phân biệt Tự - Tha động từ) và Tăng/Giảm trong mô tả số lượng, hiện tượng tự nhiên.",
    "level": "N4",
    "tags": [
      "Từ vựng",
      "Trái nghĩa",
      "Tự tha động từ",
      "comparison",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-tod-1",
        "title": "1. Đóng và Mở: Ma trận Tự động từ vs Tha động từ",
        "content": "Hành vi Đóng/Mở có sự phân chia rạch ròi theo sự có mặt của người tác động:\n- Mở:\n  + Tha động từ: ドアを開ける (mở cửa sổ/cửa chính - người có chủ ý mở).\n  + Tự động từ: ドアが開く (cửa tự động mở ra / gió thổi tự mở).\n- Đóng:\n  + Tha động từ: ドアを閉める (người đóng cửa lại).\n  + Tự động từ: ドアが閉まる (cửa tự khép lại).",
        "type": "rule"
      },
      {
        "id": "sec-tod-2",
        "title": "2. Tăng và Giảm: 増える (Tăng) vs 減る (Giảm)",
        "content": "Hai động từ mô tả biến động số lượng, quy mô:\n- 増える (ふえる - fueru): Tăng lên (Tự động từ: 人口が増える - dân số tăng lên, 体重が増える - cân nặng tăng lên).\n- 減る (へる - heru): Giảm đi (Tự động từ: 給料が減る - lương bị giảm, お腹が減る - đói bụng / bụng xẹp đi).\n- Tha động từ tương ứng: 増やす (ふやす - làm tăng thêm) vs 減らす (へらす - cắt giảm bớt).",
        "type": "pattern"
      },
      {
        "id": "sec-tod-3",
        "title": "3. Ứng dụng thực tế trong đời sống",
        "content": "Khi đi tàu điện hoặc thang máy tại Nhật, bạn sẽ nghe thông báo:\n- 'ドアが開きます。ご注意ください' (Cửa sắp mở ra. Xin quý khách chú ý - dùng tự động từ 開く).\n- 'ドアが閉まります' (Cửa chuẩn bị đóng lại - dùng tự động từ 閉まる).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-tod-1",
        "japanese": "寒くなってきたので、窓を閉めてください。",
        "reading": "さむくなってきたので、まどをしめてください。",
        "romaji": "Samuku natte kita node, mado o shimete kudasai.",
        "vietnamese": "Trời bắt đầu lạnh rồi nên xin hãy đóng cửa sổ lại.",
        "explanation": "Hành động có chủ ý đóng cửa của con người dùng tha động từ 閉める.",
        "context": "Yêu cầu trong lớp học"
      },
      {
        "id": "ex-tod-2",
        "japanese": "最近、日本語を勉強する外国人が増えています。",
        "reading": "さいきん、にほんごをべんきょうするがいこくじんがふえています。",
        "romaji": "Saikin, nihongo o benkyou suru gaikokujin ga fuete imasu.",
        "vietnamese": "Dạo gần đây, số lượng người nước ngoài học tiếng Nhật đang tăng lên.",
        "explanation": "Số lượng người tự tăng lên dùng tự động từ 増える.",
        "context": "Bình luận xu hướng xã hội"
      },
      {
        "id": "ex-tod-3",
        "japanese": "運動を始めたら、体重が2キロ減りました。",
        "reading": "うんどうをはじめたら、たいじゅうがにキロへりました。",
        "romaji": "Undou o hajimetara, taijuu ga nikiro herimashita.",
        "vietnamese": "Sau khi bắt đầu tập thể dục, cân nặng của tôi đã giảm được 2 kg.",
        "explanation": "Cân nặng tự giảm xuống dùng 減る.",
        "context": "Chia sẻ kết quả rèn luyện sức khỏe"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "ドアが開く (Tự động từ)",
          "nuance": "A miêu tả trạng thái cửa tự mở (như cửa tự động ở konbini). B là hành động tay người cầm vào cửa kéo mở ra.",
          "example": "ドアが開く (Tự động từ)",
          "exampleTranslation": "ドアを開ける (Tha động từ)",
          "caution": "A miêu tả trạng thái cửa tự mở (như cửa tự động ở konbini). B là hành động tay người cầm vào cửa kéo mở ra."
        }
      ],
      "summary": "A miêu tả trạng thái cửa tự mở (như cửa tự động ở konbini). B là hành động tay người cầm vào cửa kéo mở ra."
    },
    "notes": [
      "Thành ngữ quen thuộc: [お腹が減った] (đói bụng rồi) là câu cửa miệng cực phổ biến của người Nhật."
    ],
    "warnings": [
      "Không nhầm 閉める (shimeru - đóng cửa) với 締める (shimeru - thắt cà vạt/dây an toàn)."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-tu-dong-tu-va-tha-dong-tu",
        "title": "Bản chất Tự động từ (Jidoushi) & Tha động từ (Tadoushi) kèm cặp từ thông dụng",
        "reason": "Cặp tự động từ và tha động từ kinh điển 開く/開ける"
      },
      {
        "category": "vocabulary",
        "slug": "cap-dong-tu-bat-dau-va-ket-thuc",
        "title": "Cặp động từ 始まる/始める và 終わる/終える: Tự động từ vs Tha động từ",
        "reason": "Đối chiếu với cặp bắt đầu và kết thúc"
      },
      {
        "category": "conversation",
        "slug": "di-xe-buyt-tai-nhat-ban",
        "title": "Đi xe buýt tại Nhật: Cách lên cửa trước/sau, bấm chuông dừng và thanh toán",
        "reason": "Thông báo cửa xe buýt mở và đóng"
      }
    ]
  },
  {
    "id": "v-collocation-doi-song",
    "slug": "cum-tu-collocation-sinh-hoat-doi-song",
    "categoryId": "vocabulary",
    "title": "Collocation thiết yếu trong sinh hoạt: 電話をかける, 写真を撮る, 約束をする, 予定を立てる",
    "japaneseTitle": "日常生活のコロケーション：自然な動詞の結びつき",
    "summary": "Tổng hợp các cụm từ kết hợp tự nhiên (Collocation) trong đời sống thường ngày mà người học không thể dịch từng chữ từ tiếng Việt sang nếu không muốn nghe ngô nghê.",
    "level": "ALL",
    "tags": [
      "Từ vựng",
      "Collocation",
      "Đời sống",
      "Động từ",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cds-1",
        "title": "1. Collocation là gì và tại sao bắt buộc phải học?",
        "content": "Collocation là sự kết hợp tự nhiên giữa danh từ và động từ theo thói quen của người bản xứ.\nVí dụ: Tiếng Việt nói 'gọi điện thoại', nếu bạn dịch 'gọi' là 呼ぶ (yobu) thành '電話を呼ぶ' thì người Nhật sẽ tưởng bạn đang gọi một chiếc điện thoại biết chạy lại đây! Người Nhật dùng cụm [電話をかける] (treo/phát điện thoại đi).",
        "type": "rule"
      },
      {
        "id": "sec-cds-2",
        "title": "2. Bảng các cụm Collocation sinh hoạt hàng đầu",
        "content": "- Gọi điện thoại: 電話をかける (denwa o kakeru).\n- Bắt máy / Trả lời điện thoại: 電話に出る (denwa ni deru).\n- Chụp ảnh: 写真を撮る (shashin o toru - dùng chữ Toát 撮る).\n- Hẹn ước / Hứa hẹn: 約束をする / 約束を守る (giữ lời hứa) / 約束を破る (thất hứa).\n- Lên kế hoạch: 予定を立てる (yotei o tateru - nghĩa đen: dựng kế hoạch lên).\n- Đeo kính: メガネをかける (megane o kakeru).\n- Bật / Tắt điều hòa: エアコンをつける / エアコンを消す.",
        "type": "pattern"
      },
      {
        "id": "sec-cds-3",
        "title": "3. Nhóm động từ mặc và phụ kiện trên cơ thể",
        "content": "Tiếng Việt chỉ có một chữ 'mặc/đeo', nhưng tiếng Nhật chia theo bộ phận:\n- Thân trên / Toàn thân: 着る (áo sơ mi, áo khoác, kimono).\n- Thân dưới (từ thắt lưng trở xuống): 履く (quần, váy, tất, giày).\n- Đầu: かぶる (đội mũ).\n- Phụ kiện nhỏ (đồng hồ, nhẫn): つける hoặc はめる.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-cds-1",
        "japanese": "後で先生に電話をかけなければなりません。",
        "reading": "あとでせんせいにでんわをかけなければなりません。",
        "romaji": "Ato de sensei ni denwa o kakenakereba narimasen.",
        "vietnamese": "Lát nữa tôi phải gọi điện thoại cho thầy giáo.",
        "explanation": "Dùng cụm cố định 電話をかける thay vì dùng các từ gọi khác.",
        "context": "Nói về việc cần làm trong ngày"
      },
      {
        "id": "ex-cds-2",
        "japanese": "夏休みの旅行の予定を立てましょう。",
        "reading": "なつやすみのりょこうのよていをたてましょう。",
        "romaji": "Natsuyasumi no ryokou no yotei o tatemashou.",
        "vietnamese": "Chúng ta hãy cùng nhau lên kế hoạch cho chuyến du lịch nghỉ hè nhé.",
        "explanation": "予定を立てる là cụm từ tự nhiên chuẩn mực chỉ việc lập kế hoạch.",
        "context": "Bàn chuyện đi du lịch cùng bạn bè"
      },
      {
        "id": "ex-cds-3",
        "japanese": "ここで一緒に記念写真を撮りませんか。",
        "reading": "ここでいっしょにきねんしゃしんをとりませんか。",
        "romaji": "Koko de issho ni kinenshashin o torimasen ka.",
        "vietnamese": "Chúng ta cùng chụp một tấm ảnh kỷ niệm ở đây nhé?",
        "explanation": "写真を撮る là cụm từ chụp ảnh cố định.",
        "context": "Đề nghị chụp ảnh lưu niệm"
      }
    ],
    "notes": [
      "Học từ vựng theo cụm giúp bạn phản xạ nhanh gấp 3 lần và không bao giờ phải băn khoăn về trợ từ."
    ],
    "warnings": [
      "Không dịch 'mặc quần' thành ズボンを着る (phải dùng 履く: ズボンを履く)."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "tro-tu-o-dich-tac-dong-va-khong-gian",
        "title": "Trợ từ を (o): Đích tác động của hành động và bẫy không gian chuyển động rời khỏi",
        "reason": "Cách phối hợp trợ từ を với danh từ trong cụm từ"
      },
      {
        "category": "conversation",
        "slug": "cach-dat-lich-hen-va-xac-nhan",
        "title": "Cách đặt lịch hẹn và xác nhận thời gian: Hẹn gặp giáo viên, đặt chỗ dịch vụ",
        "reason": "Sử dụng cụm 約束をする khi hẹn gặp"
      },
      {
        "category": "notes",
        "slug": "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        "title": "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        "reason": "Nguyên lý học từ vựng theo cụm thay vì từ đơn lẻ"
      }
    ]
  },
  {
    "id": "v-collocation-suc-khoe",
    "slug": "cum-tu-collocation-suc-khoe-y-te",
    "categoryId": "vocabulary",
    "title": "Collocation sức khỏe & y tế: 風邪を引く, 薬を飲む, 熱がある, 痛みが治まる",
    "japaneseTitle": "健康・医療のコロケーション：症状と治療の自然な日本語",
    "summary": "Nắm trọn các cụm từ cố định khi bị ốm đau, đi khám bệnh và uống thuốc để mô tả chính xác tình trạng cơ thể cho bác sĩ và dược sĩ người Nhật.",
    "level": "ALL",
    "tags": [
      "Từ vựng",
      "Collocation",
      "Sức khỏe",
      "Y tế",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-csk-1",
        "title": "1. Bị ốm và Cảm mạo: Bẫy dịch thuật",
        "content": "- Bị cảm lạnh: 風邪を引く (kaze o hiku - nghĩa đen: kéo cơn gió lạnh vào người). Tuyệt đối không dịch 風邪になる.\n- Bị sốt: 熱がある (netsu ga aru - có nhiệt độ cao) hoặc 熱が出る (netsu ga deru - sốt phát ra).\n- Ho: 咳が出る (seki ga deru) hoặc 咳をする (ho húng hắng).\n- Sổ mũi / Nghẹt mũi: 鼻水が出る (hanamizu ga deru) / 鼻が詰まる (hana ga tsumaru).",
        "type": "rule"
      },
      {
        "id": "sec-csk-2",
        "title": "2. Đau ốm và Bệnh tật: Cách dùng tính từ 痛い và động từ",
        "content": "- Đau bộ phận: [Bộ phận + が痛い] (頭が痛い - đau đầu, お腹が痛い - đau bụng, 喉が痛い - rát họng).\n- Cơn đau dịu đi: 痛みが治まる (itami ga osamaru).\n- Khỏi bệnh: 病気が治る (byouki ga naoru - dùng chữ Trị 治る).",
        "type": "pattern"
      },
      {
        "id": "sec-csk-3",
        "title": "3. 'Uống thuốc' trong tiếng Nhật",
        "content": "Trong tiếng Nhật, hành động dùng thuốc luôn là [薬を飲む] (uống thuốc), dù là thuốc viên, thuốc tễ hay thuốc bột. Tuyệt đối không dùng 食べる (ăn).\n- Bôi thuốc ngoài da: 薬を塗る (kusuri o nuru).\n- Nhỏ mắt: 目薬をさす (megusuri o sasu - dùng động từ sasu).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-csk-1",
        "japanese": "風邪を引いたみたいで、喉が痛いです。",
        "reading": "かぜをひいたみたいで、のどがいたいです。",
        "romaji": "Kaze o hiita mitai de, nodo ga itai desu.",
        "vietnamese": "Dường như tôi bị cảm rồi, họng đau rát quá.",
        "explanation": "Cụm từ cố định 風邪を引く kết hợp với 喉が痛い.",
        "context": "Khai báo triệu chứng ban đầu"
      },
      {
        "id": "ex-csk-2",
        "japanese": "食後にこの薬を二錠飲んでください。",
        "reading": "しょくごにこのくすりをにじょうのんでください。",
        "romaji": "Shokugo ni kono kusuri o nijou nonde kudasai.",
        "vietnamese": "Sau bữa ăn xin hãy uống 2 viên thuốc này.",
        "explanation": "薬を飲む là cụm dùng thuốc tiêu chuẩn.",
        "context": "Dược sĩ dặn dò cách dùng thuốc"
      },
      {
        "id": "ex-csk-3",
        "japanese": "薬を飲んだら、痛みがすっかり治まりました。",
        "reading": "くすりをのんだら、いたみがすっかりおさまりました。",
        "romaji": "Kusuri o nondara, itami ga sukkari osamarimashita.",
        "vietnamese": "Sau khi uống thuốc xong thì cơn đau đã dịu hẳn đi.",
        "explanation": "痛みが治まる diễn tả cơn đau giảm dần và biến mất.",
        "context": "Phản hồi tác dụng của thuốc"
      }
    ],
    "notes": [
      "Chữ Hán 治る (naoru) dùng cho bệnh tật khỏi, còn 直る (naoru) dùng cho đồ vật hư hỏng được sửa chữa."
    ],
    "warnings": [
      "Không bao giờ nói '薬を食べる' dù thuốc là dạng kẹo nhai hay viên ngậm."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "di-kham-tai-benh-vien-phong-kham",
        "title": "Đi khám tại phòng khám/bệnh viện: Khai phiếu hỏi bệnh, mô tả triệu chứng và lấy đơn thuốc",
        "reason": "Cách miêu tả triệu chứng khi đi khám bệnh"
      },
      {
        "category": "vocabulary",
        "slug": "tu-vung-ngu-canh-benh-vien-nha-thuoc",
        "title": "Từ vựng bối cảnh Bệnh viện & Nhà thuốc: 内科, 処方箋, 保険証, 症状",
        "reason": "Từ vựng bối cảnh bệnh viện và chuyên khoa"
      },
      {
        "category": "notes",
        "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        "reason": "Người Việt hay nhầm uống thuốc và diễn đạt đau ốm"
      }
    ]
  },
  {
    "id": "v-cap-do-trang-trong",
    "slug": "phan-cap-do-trang-trong-tu-vung",
    "categoryId": "vocabulary",
    "title": "Phân cấp độ trang trọng của từ vựng: Thân mật (Kudaketa) đến Lịch sự (Teinei) và Kính cẩn (Keigo)",
    "japaneseTitle": "語彙のフォーマリティレベル：くだけた表現から改まった表現まで",
    "summary": "Bản đồ đối chiếu các từ vựng tương đương theo thang đo độ trang trọng: Từ cách nói suồng sã với bạn bè đến cách nói chuẩn mực công sở và giao dịch khách hàng.",
    "level": "ALL",
    "tags": [
      "Từ vựng",
      "Văn phong",
      "Trang trọng",
      "Keigo",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cdt-1",
        "title": "1. Tầm quan trọng của Cấp độ trang trọng (Register)",
        "content": "Trong tiếng Nhật, việc dùng từ đúng nghĩa nhưng SAI CẤP ĐỘ TRANG TRỌNG có thể bị xem là bất lịch sự hoặc tạo ra khoảng cách xa lạ không cần thiết.\nCó 3 cấp độ từ vựng chính:\n- Cấp độ Thân mật (Kudaketa / Casual): Dùng cho bạn bè cùng trang lứa, người trong gia đình.\n- Cấp độ Lịch sự tiêu chuẩn (Teinei / Polite): Dùng trong giao tiếp xã hội hàng ngày, người mới gặp.\n- Cấp độ Trang trọng / Kính cẩn (Aratamatta / Keigo): Dùng trong công sở, kinh doanh, email trang trọng.",
        "type": "rule"
      },
      {
        "id": "sec-cdt-2",
        "title": "2. Bảng đối chiếu các cặp từ vựng tiêu biểu",
        "content": "- Cảm thán tốt / tuyệt vời:\n  + Thân mật: すごい (sugoi) / いいね\n  + Lịch sự: 素晴らしい (subarashii) / とても良いです\n  + Trang trọng: 大変優れております / 結構でございます\n\n- Cảm ơn:\n  + Thân mật: どうも / ありがとう\n  + Lịch sự: ありがとうございます\n  + Trang trọng: 誠にありがとうございます / 心より感謝申し上げます\n\n- Xin lỗi:\n  + Thân mật: ごめん / ごめんね\n  + Lịch sự: すみません / ごめんなさい\n  + Trang trọng: 申し訳ございません / お詫び申し上げます",
        "type": "pattern"
      },
      {
        "id": "sec-cdt-3",
        "title": "3. Nhóm từ chỉ Người và Địa điểm",
        "content": "- Tôi: 俺/僕 (thân mật nam) -> わたし (tiêu chuẩn) -> わたくし (trang trọng công sở).\n- Người đó: あいつ (suồng sã) -> あの人 (lịch sự) -> あの方 (kính cẩn).\n- Ở đâu: どこ (tiêu chuẩn) -> どちら (lịch sự trang trọng).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-cdt-1",
        "japanese": "手伝ってくれてありがとう！ (Casual)",
        "reading": "てつだってくれてありがとう！",
        "romaji": "Tetsudatte kurete arigatou!",
        "vietnamese": "Cảm ơn vì đã giúp tớ nhé! (Thân mật)",
        "explanation": "Dùng giữa bạn bè cùng lớp học.",
        "context": "Nói với bạn thân sau khi nhờ vả"
      },
      {
        "id": "ex-cdt-2",
        "japanese": "本日はお忙しい中、誠にありがとうございます。 (Business)",
        "reading": "ほんじつはおいそがしいなか、まことにありがとうございます。",
        "romaji": "Honjitsu wa oisogashii naka, makoto ni arigatou gozaimasu.",
        "vietnamese": "Hôm nay giữa lúc bận rộn, chân thành cảm ơn quý khách đã dành thời gian.",
        "explanation": "Dùng 本日 thay cho 今日, 誠に thay cho とても để tăng độ trang trọng.",
        "context": "Mở đầu buổi đón tiếp đối tác"
      },
      {
        "id": "ex-cdt-3",
        "japanese": "トイレはどちらですか。 (Polite)",
        "reading": "トイレはどちらですか。",
        "romaji": "Toire wa dochira desu ka.",
        "vietnamese": "Nhà vệ sinh ở hướng nào vậy ạ?",
        "explanation": "Dùng どちら thay vì どこ khi hỏi ở nhà hàng cao cấp.",
        "context": "Hỏi nhân viên lễ tân"
      }
    ],
    "notes": [
      "Quy tắc vàng: Nếu không chắc mức độ thân thiết, luôn bắt đầu bằng cấp độ Lịch sự tiêu chuẩn (Teinei) để không bao giờ bị coi là thất lễ."
    ],
    "warnings": [
      "Không dùng từ suồng sã như 'すごい' hoặc 'ごめん' khi nói chuyện với giám đốc hoặc khách hàng."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        "title": "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        "reason": "Cẩm nang kính ngữ giao tiếp cho người mới"
      },
      {
        "category": "conversation",
        "slug": "giao-tiep-noi-lam-viec-aisatsu",
        "title": "Giao tiếp nơi làm việc: Chào buổi sáng, chào ra về, báo cáo Horenso",
        "reason": "Lựa chọn từ ngữ chuẩn mực tại nơi làm việc"
      },
      {
        "category": "notes",
        "slug": "bon-nac-thang-van-phong-tieng-nhat",
        "title": "Bốn nấc thang văn phong: Suồng sã, Lịch sự, Khiêm nhường và Tôn kính",
        "reason": "Bốn nấc thang văn phong trong ngôn ngữ Nhật"
      }
    ]
  },
  {
    "id": "v-ngu-canh-nha-ga",
    "slug": "tu-vung-ngu-canh-nha-ga-tau-dien",
    "categoryId": "vocabulary",
    "title": "Hệ thống từ vựng thiết yếu tại ga tàu điện: 改札, 切符, 乗り換え, ホーム, 特急, 遅延",
    "japaneseTitle": "駅・鉄道の必須語彙：改札口から乗り換えまで",
    "summary": "Cẩm nang từ vựng sinh tồn tại các nhà ga Nhật Bản: Đọc hiểu biển chỉ dẫn, mua vé, đổi tuyến, cửa soát vé và xử lý các sự cố trễ tàu thường gặp.",
    "level": "ALL",
    "tags": [
      "Từ vựng",
      "Chủ đề",
      "Ga tàu",
      "Giao thông",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-vng-1",
        "title": "1. Khu vực nhà ga và Thiết bị soát vé",
        "content": "- 改札口 (かいさつぐち - kaisatsuguchi): Cổng soát vé.\n- 切符 (きっぷ - kippu): Vé tàu giấy.\n- 券売機 (けんばいき - kenbaiki): Máy bán vé tự động.\n- 精算機 (せいさんき - seisanki): Máy nạp thêm tiền khi thiếu cước.\n- ホーム (hōmu): Sân ga / ke ga đón tàu (ví dụ: 1番線ホーム - sân ga số 1).\n- 忘れ物センター (wasuremono sentā): Trung tâm tìm đồ thất lạc của nhà ga.",
        "type": "rule"
      },
      {
        "id": "sec-vng-2",
        "title": "2. Phân loại các loại tàu và Tuyến đường",
        "content": "- 各駅停車 / 普通 (kakueki teisha / futsuu): Tàu dừng ở mọi ga.\n- 快速 (kaisoku): Tàu nhanh (bỏ qua một số ga nhỏ).\n- 急行 (kyuukou): Tàu tốc hành.\n- 特急 (tokkyuu): Tàu đặc cấp / siêu tốc (cần mua thêm vé đặc cấp).\n- 終電 (shuuden): Chuyến tàu cuối cùng trong đêm (cần chú ý để không bị lỡ).\n- 始発 (shihatsu): Chuyến tàu đầu tiên buổi sáng.",
        "type": "pattern"
      },
      {
        "id": "sec-vng-3",
        "title": "3. Hành động đi lại và Biến cố lịch trình",
        "content": "- 乗り換え (のりかえ - norikae): Đổi tàu / chuyển tuyến.\n- 乗り過ごす (のりすごす - norisugosu): Ngủ quên hoặc đi quá ga cần xuống.\n- 乗り遅れる (のりおくれる - noriokureru): Đến muộn bị lỡ tàu.\n- 遅延 (ちえん - chien): Tàu bị trễ giờ (người Nhật sẽ xin 遅延証明書 - giấy chứng nhận trễ tàu nộp cho công ty).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-vng-1",
        "japanese": "新宿駅で山手線に乗り換えてください。",
        "reading": "しんじゅくえきでやまのてせんにのりかえてください。",
        "romaji": "Shinjuku-eki de Yamanote-sen ni norikaete kudasai.",
        "vietnamese": "Xin hãy đổi sang tuyến Yamanote ở ga Shinjuku.",
        "explanation": "乗り換える là động từ đổi tuyến tàu điện.",
        "context": "Chỉ dẫn cách đi tàu cho du khách"
      },
      {
        "id": "ex-vng-2",
        "japanese": "カードの残高が足りなくて、改札口で止められました。",
        "reading": "カードのざんだかがたりなくて、かいさつぐちでとめられました。",
        "romaji": "Kaado no zandaka ga tarinakute, kaisatsuguchi de tomeraremashita.",
        "vietnamese": "Vì số dư thẻ IC không đủ nên tôi đã bị chặn lại ở cổng soát vé.",
        "explanation": "改札口 là cổng soát vé tàu điện.",
        "context": "Sự cố thường gặp khi đi tàu điện"
      },
      {
        "id": "ex-vng-3",
        "japanese": "大雨の影響で、電車が15分遅延しています。",
        "reading": "おおあめのえいきょうで、でんしゃがじゅうごふんちえんしています。",
        "romaji": "Ooame no eikyou de, densha ga juugofun chien shite imasu.",
        "vietnamese": "Do ảnh hưởng của mưa lớn, tàu điện đang bị trễ 15 phút.",
        "explanation": "遅延 (chien) là từ chuẩn chỉ việc trễ giờ tàu.",
        "context": "Thông báo phát thanh tại nhà ga"
      }
    ],
    "notes": [
      "Thẻ IC giao thông phổ biến nhất ở Tokyo là Suica và Pasmo, ở Kansai là Icoca."
    ],
    "warnings": [
      "Lên nhầm tàu 特急 (Tokkyuu) mà chỉ quẹt thẻ thường sẽ bị nhân viên soát vé phạt hoặc yêu cầu mua bổ sung vé đặc cấp trên tàu."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "xu-ly-tinh-huong-tai-ga-tau-dien",
        "title": "Xử lý tình huống tại ga tàu điện: Mua vé, nạp tiền thẻ IC, hỏi tuyến tàu",
        "reason": "Các mẫu câu tình huống thực tế tại ga tàu"
      },
      {
        "category": "kanji",
        "slug": "chu-han-nhom-chuyen-dong-co-ban",
        "title": "Chữ Hán nhóm Chuyển động cơ bản: 行, 来, 帰, 出, 入, 歩, 走",
        "reason": "Các chữ Hán chuyển động thường gặp ở biển báo nhà ga"
      },
      {
        "category": "conversation",
        "slug": "di-xe-buyt-tai-nhat-ban",
        "title": "Đi xe buýt tại Nhật: Cách lên cửa trước/sau, bấm chuông dừng và thanh toán",
        "reason": "Phương tiện công cộng bổ trợ trong đô thị"
      }
    ]
  },
  {
    "id": "v-ngu-canh-benh-vien",
    "slug": "tu-vung-ngu-canh-benh-vien-nha-thuoc",
    "categoryId": "vocabulary",
    "title": "Từ vựng bối cảnh Bệnh viện & Nhà thuốc: 内科, 処方箋, 保険証, 症状, アレルギー",
    "japaneseTitle": "病院・薬局の基本語彙：診察から調剤まで",
    "summary": "Tập hợp từ vựng chuyên dụng khi đi khám bệnh tại Nhật: Tên các khoa khám bệnh, các loại giấy tờ y tế, thủ tục thanh toán bảo hiểm và nhận thuốc.",
    "level": "ALL",
    "tags": [
      "Từ vựng",
      "Chủ đề",
      "Bệnh viện",
      "Y tế",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-vnb-1",
        "title": "1. Các chuyên khoa khám bệnh phổ biến",
        "content": "- 内科 (ないか - naika): Khoa Nội (cảm sốt, đau bụng, bệnh tiêu hóa thông thường - nơi đi khám đầu tiên).\n- 外科 (げか - geka): Khoa Ngoại (vết thương rách da, gãy xương, phẫu thuật).\n- 小児科 (しょうにか - shounika): Khoa Nhi.\n- 眼科 (がんか - ganka): Khoa Mắt.\n- 歯科 (しか - shika): Nha khoa / Khoa Răng.\n- 皮膚科 (ひふか - hifuka): Khoa Da liễu.\n- 耳鼻咽喉科 (じびいんこうか - jibikouka): Khoa Tai Mũi Họng.",
        "type": "rule"
      },
      {
        "id": "sec-vnb-2",
        "title": "2. Giấy tờ và Thủ tục y tế",
        "content": "- 健康保険証 (けんこうほけんしょう - kenkou hokenshou): Thẻ bảo hiểm y tế (bắt buộc mang theo để chỉ phải trả 30% chi phí).\n- 診察券 (しんさつけん - shinsatsuken): Thẻ khám bệnh của từng bệnh viện/phòng khám.\n- 問診票 (もんしんひょう - monshinhyou): Phiếu hỏi bệnh (điền triệu chứng và tiền sử dị ứng lúc đầu).\n- 処方箋 (しょほうせん - shohousen): Đơn thuốc do bác sĩ kê (mang ra tiệm thuốc 薬局 để mua).",
        "type": "pattern"
      },
      {
        "id": "sec-vnb-3",
        "title": "3. Từ vựng triệu chứng lâm sàng",
        "content": "- 症状 (しょうじょう - shoujou): Triệu chứng bệnh.\n- アレルギー (arerugii): Dị ứng (thức ăn hoặc thuốc lá, phấn hoa).\n- 副作用 (ふくさよう - fukusayou): Tác dụng phụ của thuốc.\n- 吐き気 (はきけ - hakike): Buồn nôn.\n- めまい (memai): Chóng mặt, hoa mắt.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-vnb-1",
        "japanese": "初めて受診するので、問診票に記入してください。",
        "reading": "はじめてじゅしんするので、もんしんひょうにきにゅうしてください。",
        "romaji": "Hajimete jushin suru node, monshinhyou ni kinyuu shite kudasai.",
        "vietnamese": "Vì là lần đầu khám nên xin quý khách hãy điền vào phiếu hỏi bệnh.",
        "explanation": "問診票 là tờ giấy khai báo tiền sử sức khỏe trước khi gặp bác sĩ.",
        "context": "Lễ tân phòng khám hướng dẫn bệnh nhân mới"
      },
      {
        "id": "ex-vnb-2",
        "japanese": "お会計の後に、こちらの処方箋を薬局へお持ちください。",
        "reading": "おかいけいのあとに、こちらのしょほうせんをやっきょくへおもちください。",
        "romaji": "Okaikei no ato ni, kochira no shohousen o yakkyoku e omochi kudasai.",
        "vietnamese": "Sau khi thanh toán tiền, xin hãy mang đơn thuốc này ra nhà thuốc.",
        "explanation": "Tại Nhật, bệnh viện và nhà thuốc thường tách riêng (処方箋).",
        "context": "Nhận đơn thuốc sau khi khám xong"
      },
      {
        "id": "ex-vnb-3",
        "japanese": "何か薬のアレルギーはありますか。",
        "reading": "なにかくすりのアレルギーはありますか。",
        "romaji": "Nanika kusuri no arerugii wa arimasu ka.",
        "vietnamese": "Bạn có bị dị ứng với loại thuốc nào không?",
        "explanation": "Câu hỏi bắt buộc của y bác sĩ trước khi kê đơn.",
        "context": "Bác sĩ thăm khám bệnh nhân"
      }
    ],
    "notes": [
      "Tại Nhật, phòng khám tư nhân (クリニック/医院) rất nhiều và thuận tiện; chỉ những ca bệnh nặng mới chuyển tuyến lên bệnh viện lớn (総合病院)."
    ],
    "warnings": [
      "Nếu đi khám mà quên mang Thẻ bảo hiểm y tế (保険証), bạn sẽ phải tự trả 100% viện phí tại chỗ (dù sau đó có thể mang thẻ đến xin hoàn tiền lại)."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "cum-tu-collocation-suc-khoe-y-te",
        "title": "Collocation sức khỏe & y tế: 風邪を引く, 薬を飲む, 熱がある, 痛みが治まる",
        "reason": "Các cụm từ chỉ bệnh lý và triệu chứng cơ thể"
      },
      {
        "category": "conversation",
        "slug": "di-kham-tai-benh-vien-phong-kham",
        "title": "Đi khám tại phòng khám/bệnh viện: Khai phiếu hỏi bệnh, mô tả triệu chứng và lấy đơn thuốc",
        "reason": "Mẫu câu giao tiếp thực tế với bác sĩ và nhân viên lễ tân"
      },
      {
        "category": "grammar",
        "slug": "the-phu-dinh-naikei-va-mau-cau-bat-buoc",
        "title": "Thể phủ định ngắn (Naikei) và mẫu câu: 〜なければならない, 〜なくてもいい",
        "reason": "Mẫu câu chỉ định kiêng cữ của bác sĩ"
      }
    ]
  },
  {
    "id": "v-ngu-canh-truong-hoc-cong-ty",
    "slug": "tu-vung-ngu-canh-truong-hoc-va-cong-ty",
    "categoryId": "vocabulary",
    "title": "Phân biệt từ vựng môi trường Trường học vs Công ty: 授業/会議, 宿題/書類, 先生/上司",
    "japaneseTitle": "学校と会社の対応語彙：学びの場とビジネスの現場",
    "summary": "So sánh đối chiếu hệ thống từ vựng song hành giữa môi trường học đường (Đại học/tiếng Nhật) và môi trường doanh nghiệp Nhật Bản: Cùng một khái niệm nhưng thay đổi theo bối cảnh.",
    "level": "ALL",
    "tags": [
      "Từ vựng",
      "Đối chiếu",
      "Công sở",
      "Trường học",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-vtc-1",
        "title": "1. Người phụ trách và Đối tượng tương tác",
        "content": "- Người hướng dẫn:\n  + Trường học: 先生 (thầy cô giáo) / 教授 (giáo sư đại học).\n  + Công ty: 上司 (cấp trên) / 先輩 (tiền bối đi trước) / 部長 (trưởng phòng) / 課長 (trưởng nhóm).\n- Người cùng vai vế:\n  + Trường học: クラスメイト / 友達 (bạn học, bạn bè).\n  + Công ty: 同僚 (đồng nghiệp) / 同期 (đồng nghiệp cùng đợt vào công ty).",
        "type": "rule"
      },
      {
        "id": "sec-vtc-2",
        "title": "2. Hoạt động trao đổi và Tài liệu",
        "content": "- Hoạt động tập trung:\n  + Trường học: 授業 (tiết học) / 講義 (bài giảng đại học) / セミナー (hội thảo nghiên cứu).\n  + Công ty: 会議 (cuộc họp) / ミーティング (meeting) / 打ち合わせ (trao đổi nhanh).\n- Việc phải hoàn thành:\n  + Trường học: 宿題 (bài tập về nhà) / レポート (bài thu hoạch, tiểu luận).\n  + Công ty: 業務 / 仕事 (nghiệp vụ, công việc) / 書類・資料 (hồ sơ, tài liệu).",
        "type": "pattern"
      },
      {
        "id": "sec-vtc-3",
        "title": "3. Kỳ hạn và Kết quả",
        "content": "- Hạn chót:\n  + Trường học: 提出期限 (hạn nộp bài tập).\n  + Công ty: 締め切り (deadline công việc) / 納期 (hạn giao hàng sản phẩm).\n- Nghỉ phép:\n  + Trường học: 休講 (buổi học bị hủy) / 欠席 (vắng mặt).\n  + Công ty: 有給休暇 (nghỉ phép có lương) / 欠勤 (nghỉ làm việc).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-vtc-1",
        "japanese": "明日の会議の資料を印刷しておきました。",
        "reading": "あすのかいぎのしりょうをいんさつしておきました。",
        "romaji": "Asu no kaigi no shiryou o insatsu shite okimashita.",
        "vietnamese": "Tôi đã in sẵn tài liệu cho cuộc họp ngày mai rồi ạ.",
        "explanation": "Dùng 会議 (cuộc họp) và 資料 (tài liệu) trong công sở.",
        "context": "Báo cáo công việc với cấp trên"
      },
      {
        "id": "ex-vtc-2",
        "japanese": "レポートの締め切りは来週の金曜日です。",
        "reading": "レポートのしめきりはらいしゅうのきんようびです。",
        "romaji": "Repooto no shimekiri wa raishuu no kinyoubi desu.",
        "vietnamese": "Hạn chót nộp báo cáo tiểu luận là thứ Sáu tuần tới.",
        "explanation": "Dùng レポート và 締め切り trong trường đại học.",
        "context": "Giáo sư thông báo lịch nộp bài tập"
      },
      {
        "id": "ex-vtc-3",
        "japanese": "上司に相談してからお返事いたします。",
        "reading": "じょうしにそうだんしてからおへんじいたします。",
        "romaji": "Joushi ni soudan shite kara ohenji itashimasu.",
        "vietnamese": "Sau khi trao đổi xin ý kiến cấp trên, tôi sẽ xin phép phản hồi lại ạ.",
        "explanation": "上司 là từ chuẩn mực chỉ sếp/cấp trên khi nói với đối tác.",
        "context": "Đàm phán công việc với khách hàng"
      }
    ],
    "notes": [
      "Khi nói chuyện với khách hàng ngoài công ty, người Nhật gọi sếp của mình bằng chức danh hoặc họ tên thông thường mà KHÔNG thêm -san (quy tắc Uchi/Soto)."
    ],
    "warnings": [
      "Không gọi sếp trong công ty là '先生' (trừ khi sếp là bác sĩ, luật sư hoặc chính trị gia)."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "giao-tiep-trong-truong-dai-hoc",
        "title": "Giao tiếp trong trường học & đại học: Trao đổi với giáo sư, hỏi bài bạn học",
        "reason": "Giao tiếp trong trường đại học với thầy cô và bạn bè"
      },
      {
        "category": "conversation",
        "slug": "giao-tiep-noi-lam-viec-aisatsu",
        "title": "Giao tiếp nơi làm việc: Chào buổi sáng, chào ra về, báo cáo Horenso",
        "reason": "Giao tiếp và chào hỏi tại văn phòng làm việc"
      },
      {
        "category": "kanji",
        "slug": "chu-han-nhom-con-nguoi-gia-dinh",
        "title": "Chữ Hán nhóm Con người & Gia đình: 父, 母, 兄, 弟, 姉, 妹, 男, 女, 子",
        "reason": "Chữ Hán chỉ các vai vế và mối quan hệ con người"
      }
    ]
  }
];
