import { HandbookArticle } from "../types";

export const vocabularyArticles: HandbookArticle[] = [
  // 1. Article 1 (Gốc)
  {
    id: "v-pho-tu-muc-do",
    slug: "pho-tu-chi-muc-do-thuong-gap",
    categoryId: "vocabulary",
    title: "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
    japaneseTitle: "程度を表す副詞のまとめ",
    summary:
      "Hệ thống hóa các phó từ chỉ mức độ theo thước đo từ 100% đến 0%, phân biệt sắc thái khen ngợi, ngạc nhiên và quy tắc đi cùng câu phủ định.",
    level: "N5",
    tags: ["Từ vựng", "Phó từ", "Mức độ", "Giao tiếp", "N5", "N4"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-pt-1",
        title: "1. Thang đo mức độ từ cao xuống thấp (100% -> 0%)",
        content:
          "Các phó từ tiếng Nhật có thang đo cảm xúc và mức độ rất chặt chẽ. Hiểu đúng vị trí trên thang đo giúp bạn diễn đạt tự nhiên chuẩn xác mà không bị thô lỗ hay gượng gạo.",
        type: "table",
        tableData: {
          headers: ["Mức độ", "Phó từ", "Cách dùng với vị ngữ", "Ý nghĩa sắc thái"],
          rows: [
            ["100%", "まったく / 完全に", "Phủ định / Khẳng định", "Hoàn toàn (không thể / hoàn hảo)"],
            ["80% - 90%", "とても / たいへん", "Khẳng định", "Rất (たいへん trang trọng hơn とても)"],
            ["70%", "かなり / ずいぶん", "Khẳng định", "Khá là (vượt quá mức dự đoán thông thường)"],
            ["60%", "けっこう / なかなか", "Khẳng định (hoặc tiềm năng)", "Khá là (bất ngờ, tốt hơn mong đợi)"],
            ["50%", "まあまあ", "Khẳng định", "Tàm tạm, cũng được (không quá xuất sắc)"],
            ["20% - 30%", "あまり", "Bắt buộc đi với Phủ định", "Không... lắm (giảm nhẹ mức độ phủ định)"],
            ["0%", "ぜんぜん (全然)", "Chuẩn mực: Phủ định", "Hoàn toàn không... chút nào"],
          ],
        },
      },
      {
        id: "sec-pt-2",
        title: "2. Sắc thái tinh tế của なかなか và けっこう",
        content:
          "Cả hai đều dịch là 'khá là...', nhưng mang tâm lý 'vượt trên mức kỳ vọng ban đầu':\n- なかなか: Thường dùng khen ngợi khi người nói từng nghĩ điều đó khó đạt được (ví dụ: Bạn nói tiếng Nhật khá tốt đấy - なかなか上手ですね).\n- けっこう: Biểu thị sự hài lòng ở mức đủ dùng, đôi khi mang tính đánh giá chủ quan.",
        type: "rule",
      },
      {
        id: "sec-pt-3",
        title: "3. Câu chuyện về 全然 (zenzen) trong tiếng Nhật hiện đại",
        content:
          "Trong ngữ pháp truyền thống và các kỳ thi JLPT, 全然 BẮT BUỘC đi với vị ngữ phủ định (全然わかりません - Hoàn toàn không hiểu). Tuy nhiên trong giới trẻ Nhật hiện nay, '全然いいよ' (Hoàn toàn ổn, không sao cả) xuất hiện rất nhiều trong khẩu ngữ. Người học sơ cấp nên tuân thủ ngữ pháp chuẩn trong văn viết và bài thi.",
        type: "text",
      },
    ],
    examples: [
      {
        id: "ex-pt-1",
        japanese: "この映画はとても面白いです。",
        reading: "このえいがはとてもおもしろいです。",
        romaji: "Kono eiga wa totemo omoshiroi desu.",
        vietnamese: "Bộ phim này rất hay.",
        explanation: "Dùng とても để nhấn mạnh mức độ thích thú trong câu khẳng định thông thường.",
        context: "Đánh giá phim ảnh",
      },
      {
        id: "ex-pt-2",
        japanese: "日本語の漢字はあまり難しくないです。",
        reading: "にほんごのかんじはあまりむずかしくないです。",
        romaji: "Nihongo no kanji wa amari muzukashiku nai desu.",
        vietnamese: "Chữ Hán tiếng Nhật không khó lắm.",
        explanation: "あまり kết hợp với tính từ phủ định để nói giảm nói tránh lịch sự.",
        context: "Bày tỏ cảm nhận",
      },
      {
        id: "ex-pt-3",
        japanese: "昨日は全然眠れませんでした。",
        reading: "きのうはぜんぜんねむれませんでした。",
        romaji: "Kinou wa zenzen nemuremasen deshita.",
        vietnamese: "Hôm qua tôi hoàn toàn không ngủ được chút nào.",
        explanation: "全然 + phủ định nhấn mạnh mức độ 0% triệt để.",
        context: "Chia sẻ trạng thái bản thân",
      },
    ],
    comparisons: {
      title: "Đối chiếu cặp phó từ phủ định: あまり vs 全然",
      items: [
        {
          subject: "あまり (amari)",
          nuance: "Mức độ 20-30%, phủ định nhẹ nhàng, tạo cảm giác khiêm tốn hoặc lịch sự",
          formula: "あまり + V-nai / A-kunai",
          example: "辛い料理はあまり好きじゃありません。",
          exampleTranslation: "Tôi không thích đồ ăn cay cho lắm.",
          caution: "Tránh dùng trong câu khẳng định khi muốn mang nghĩa 'rất'.",
        },
        {
          subject: "全然 (zenzen)",
          nuance: "Mức độ 0%, phủ định tuyệt đối, không có bất kỳ ngoại lệ nào",
          formula: "全然 + V-nai / A-kunai",
          example: "彼の言っていることが全然わかりません。",
          exampleTranslation: "Tôi hoàn toàn không hiểu anh ấy đang nói gì.",
          caution: "Mang sắc thái dứt khoát mạnh mẽ, cần cẩn trọng khi từ chối cấp trên.",
        },
      ],
      summary: "Nếu muốn lịch sự mềm mỏng, ưu tiên dùng あまり thay vì 全然.",
    },
    notes: [
      "たいへん (taihen) thường dùng trong thư tín, kinh doanh hoặc hoàn cảnh trang trọng hơn とても.",
      "ずいぶん (zuibun) mang cảm giác 'nhiều hơn so với trước đây hoặc so với tưởng tượng' (ví dụ: Bạn đã tiến bộ hơn hẳn rồi nhỉ).",
    ],
    warnings: [
      "Khi khen ngợi cấp trên hoặc người lớn tuổi, tránh dùng なかなか上手ですね vì nó có hàm ý người nói đang ở vị thế cao hơn nhận xét người dưới.",
    ],
    relatedArticles: [
      {
        category: "vocabulary",
        slug: "tu-dien-tu-tuong-thanh-tu-tuong-hinh",
        title: "Từ tượng thanh & Từ tượng hình (Onomatopoeia) căn bản trong đời sống",
        reason: "Cùng làm phong phú cách miêu tả trạng thái bằng từ vựng gợi cảm",
      },
      {
        category: "conversation",
        slug: "cach-tu-choi-kheo-leo-trong-tieng-nhat",
        title: "Nghệ thuật từ chối khéo léo (Kushon Kotoba) tránh làm mất lòng đối phương",
        reason: "Ứng dụng các phó từ giảm nhẹ sắc thái khi giao tiếp lịch sự",
      },
    ],
  },

  // 2. Article 2 (Gốc)
  {
    id: "v-onomatopoeia",
    slug: "tu-dien-tu-tuong-thanh-tu-tuong-hinh",
    categoryId: "vocabulary",
    title: "Từ tượng thanh & Từ tượng hình (Onomatopoeia) căn bản trong đời sống",
    japaneseTitle: "日常でよく使うオノマトペ",
    summary:
      "Khám phá các từ mô phỏng âm thanh (Giseigo) và trạng thái tâm lý cảm xúc (Gitaigo) phổ biến nhất như dokidoki, perapera, girigiri, wakuwaku.",
    level: "ALL",
    tags: ["Từ vựng", "Từ tượng thanh", "Giao tiếp", "Văn hóa", "N5", "N4"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-ono-1",
        title: "1. Tầm quan trọng của Onomatopoeia trong tiếng Nhật",
        content:
          "Người Nhật sử dụng từ tượng thanh và tượng hình với tần suất cực kỳ cao trong đời sống thường nhật. Nếu biết cách sử dụng khéo léo, câu nói của bạn sẽ trở nên sống động, gần gũi và tự nhiên y hệt người bản xứ.",
        type: "text",
      },
      {
        id: "sec-ono-2",
        title: "2. Nhóm từ miêu tả tâm lý và cảm xúc cơ thể",
        content:
          "Các từ thường có dạng lặp âm đôi (A-B-A-B), diễn tả nhịp đập con tim, sự hồi hộp hoặc trạng thái tinh thần:",
        type: "table",
        tableData: {
          headers: ["Từ tượng thanh/hình", "Cách đọc", "Ý nghĩa", "Ví dụ tiêu biểu"],
          rows: [
            ["ドキドキ (dokidoki)", "どきどき", "Tim đập thình thịch (hồi hộp, lo âu, rung động)", "発表の前で緊張してドキドキする。"],
            ["ワクワク (wakuwaku)", "わくわく", "Háo hức, mong chờ một điều vui vẻ", "明日から旅行なのでワクワクしています。"],
            ["イライラ (iraira)", "いらいら", "Bực bội, sốt ruột, nóng mũi", "電車が遅れてイライラする。"],
            ["ペラペラ (perapera)", "ぺらぺら", "Lưu loát, trôi chảy (ngoại ngữ)", "彼は日本語がペラペラです。"],
            ["ギリギリ (girigiri)", "ぎりぎり", "Sát nút, suýt soát (thời gian, hạn chót)", "電車の発車時刻にギリギリ間に合った。"],
          ],
        },
      },
    ],
    examples: [
      {
        id: "ex-ono-1",
        japanese: "面接の前で胸がドキドキしました。",
        reading: "めんせつのまえでむねがドキドキしました。",
        romaji: "Mensetsu no mae de mune ga dokidoki shimashita.",
        vietnamese: "Trước buổi phỏng vấn, ngực tôi đập thình thịch.",
        explanation: "ドキドキ miêu tả cảm xúc hồi hộp xen lẫn lo lắng trước thử thách.",
        context: "Trước sự kiện quan trọng",
      },
      {
        id: "ex-ono-2",
        japanese: "レポートの提出期限にギリギリ間に合いました。",
        reading: "レポートのていしゅつきげんにギリギリまにあいました。",
        romaji: "Repooto no teishutsu kigen ni girigiri maniaimashita.",
        vietnamese: "Tôi đã kịp nộp báo cáo sát nút giờ quy định.",
        explanation: "ギリギリ diễn tả khoảnh khắc cận kề ranh giới.",
        context: "Hạn chót công việc / học tập",
      },
    ],
    comparisons: {
      title: "Phân biệt cảm xúc hồi hộp: ドキドキ vs ワクワク",
      items: [
        {
          subject: "ドキドキ (dokidoki)",
          nuance: "Hồi hộp với tâm lý bất an, lo sợ kết quả xấu hoặc tim đập mạnh do căng thẳng",
          formula: "ドキドキする / 胸がドキドキ",
          example: "テストの結果を見る時、ドキドキした。",
          exampleTranslation: "Lúc xem kết quả thi, tim tôi đập thình thịch.",
          caution: "Cũng có thể dùng trong tình yêu khi gặp crush, nhưng sắc thái nghiêng về nhịp đập vật lý.",
        },
        {
          subject: "ワクワク (wakuwaku)",
          nuance: "Háo hức với niềm vui sướng tích cực hướng về một tương lai tươi đẹp phía trước",
          formula: "ワクワクする / 気持ちがワクワク",
          example: "日本へ行く日をワクワクしながら待っている。",
          exampleTranslation: "Tôi đang háo hức chờ đợi ngày được bay sang Nhật.",
          caution: "Không dùng cho hoàn cảnh có cảm giác nguy hiểm hay tiêu cực.",
        },
      ],
      summary: "Nếu lo lắng căng thẳng -> ドキドキ; nếu vui vẻ đón chờ -> ワクワク.",
    },
    notes: [
      "Từ tượng thanh thường được viết bằng Katakana trong văn cảnh hiện đại để nhấn mạnh cảm giác trực quan, nhưng viết bằng Hiragana vẫn hoàn toàn chính xác.",
    ],
    warnings: [
      "Trong văn bản hành chính hoặc báo cáo khoa học chính quy, hạn chế lạm dụng onomatopoeia; nên dùng từ ngữ trang trọng hơn (ví dụ: 緊張する thay vì ドキドキする).",
    ],
    relatedArticles: [
      {
        category: "vocabulary",
        slug: "pho-tu-chi-muc-do-thuong-gap",
        title: "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
        reason: "Bổ trợ các phó từ chỉ mức độ diễn đạt cảm xúc",
      },
      {
        category: "notes",
        slug: "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        title: "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        reason: "Ghép onomatopoeia vào các cụm động từ thường gặp",
      },
    ],
  },

  // 3. Article 3 (Mới: 知る vs 分かる)
  {
    id: "v-shiru-wakaru",
    slug: "phan-biet-shiru-va-wakaru",
    categoryId: "vocabulary",
    title: "Phân biệt 知る (shiru) và 分かる (wakaru) - Biết thông tin vs Thấu hiểu bản chất",
    japaneseTitle: "「知る」と「分かる」の明確な違い",
    summary:
      "Giải quyết triệt để sự nhầm lẫn giữa tiếp nhận thông tin từ bên ngoài (知る - shiru) và năng lực thấu hiểu nội tại (分かる - wakaru) kèm quy tắc trợ từ を vs が.",
    level: "N5",
    tags: ["Từ vựng", "Động từ dễ nhầm", "知る", "分かる", "N5"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-sw-1",
        title: "1. Bản chất: Tiếp nhận thông tin (知る) vs Thấu hiểu bản chất (分かる)",
        content:
          "- 知る (shiru): Tiếp nhận một mẩu dữ liệu hoặc thông tin khách quan từ bên ngoài đưa vào não bộ (biết tên, biết số điện thoại, biết sự kiện).\n- 分かる (wakaru): Tự thân hiểu được ý nghĩa, quy luật, logic hoặc cảm thông với tâm trạng của ai đó qua sự suy ngẫm nội tâm.",
        type: "rule",
      },
      {
        id: "sec-sw-2",
        title: "2. Khác biệt về cấu trúc trợ từ đi kèm",
        content:
          "- 知る là tha động từ ý chí -> Đối tượng tiếp nhận đi với trợ từ を (電話番号を知っています).\n- 分かる là tự động từ chỉ năng lực/trạng thái -> Đối tượng được hiểu đi với trợ từ が (日本語の意味がわかります).",
        type: "rule",
      },
      {
        id: "sec-sw-3",
        title: "3. Thể phủ định: Bẫy lớn nhất trong các đề thi JLPT",
        content:
          "- 'Tôi biết' -> 知っています (dạng ている).\n- 'Tôi không biết' -> BẮT BUỘC là 知りません (TUYỆT ĐỐI KHÔNG DÙNG 知っていません).\n- 'Tôi không hiểu' -> わかりません.",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-sw-1",
        japanese: "田中さんの電話番号を知っていますか。",
        reading: "たなかさんのでんわばんごうをしっていますか。",
        romaji: "Tanaka-san no denwa bangou o shitte imasu ka.",
        vietnamese: "Bạn có biết số điện thoại của anh Tanaka không?",
        explanation: "Số điện thoại là mẩu thông tin dữ liệu thuần túy -> Dùng を知る.",
        context: "Hỏi thông tin liên lạc",
      },
      {
        id: "ex-sw-2",
        japanese: "先生、この文法の使い方がわかりました。",
        reading: "せんせい、このぶんぽうのつかいかたがわかりました。",
        romaji: "Sensei, kono bunpou no tsukaikata ga wakarimashita.",
        vietnamese: "Thưa thầy, em đã hiểu được cách dùng của ngữ pháp này rồi ạ.",
        explanation: "Hiểu được cách vận hành và logic ngữ pháp -> Dùng が分かる.",
        context: "Báo cáo tiến độ học tập",
      },
    ],
    comparisons: {
      title: "Đối chiếu 知る (shiru) vs 分かる (wakaru)",
      items: [
        {
          subject: "知る (shiru) - Nạp dữ liệu",
          nuance: "Biết thông tin khách quan từ người khác hoặc nguồn tin",
          formula: "N を 知っている / 知りません",
          example: "あの人の名前を知りません。",
          exampleTranslation: "Tôi không biết tên của người kia.",
          caution: "Phủ định là 知りません, không có 知っていません.",
        },
        {
          subject: "分かる (wakaru) - Thấu hiểu logic",
          nuance: "Nắm được nguyên lý, giải quyết được vấn đề trong não",
          formula: "N が 分かる / 分かりません",
          example: "彼の気持ちがよく分かります。",
          exampleTranslation: "Tôi rất thấu hiểu tâm trạng của anh ấy.",
          caution: "Trợ từ là が, không dùng を.",
        },
      ],
      summary: "Biết số nhà, tên tuổi -> 知る; Hiểu bài học, hiểu tâm lý người khác -> 分かる.",
    },
    notes: [
      "Khi ai đó nhờ làm việc gì, nói 'わかりました' nghĩa là 'Tôi đã hiểu và nhận việc', chứ không dùng 'しりました'.",
    ],
    warnings: [
      "Nói '知りません' với khách hàng có thể nghe hơi cụt lủn và thiếu trách nhiệm; người Nhật ở công sở sẽ dùng '存じ上げておりません' hoặc '分かりかねます'.",
    ],
    relatedArticles: [
      {
        category: "grammar",
        slug: "ban-chat-cau-truc-te-iru",
        title: "Bản chất cấu trúc 〜ている: Hành động tiếp diễn, trạng thái kết quả & thói quen",
        reason: "Giải thích lý do 知る luôn ở thể 知っています khi khẳng định",
      },
      {
        category: "conversation",
        slug: "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        title: "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        reason: "Dạng kính ngữ của 知る là ご存知 vs 存じる",
      },
    ],
  },

  // 4. Article 4 (Mới: 見る vs 観る vs 見える vs 見せる)
  {
    id: "v-miru-mieru-miseru",
    slug: "phan-biet-miru-kan-mieru-miseru",
    categoryId: "vocabulary",
    title: "Phân biệt nhóm động từ thị giác: 見る vs 観る vs 見える vs 見せる",
    japaneseTitle: "視覚動詞「見る・観る・見える・見せる」の完全整理",
    summary:
      "Tách bạch giữa nhìn có chủ ý (見る/観る), hình ảnh tự lọt vào mắt một cách tự nhiên (見える), và hành vi cho người khác xem (見せる).",
    level: "N5",
    tags: ["Từ vựng", "Động từ thị giác", "見る", "見える", "N5", "N4"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-mv-1",
        title: "1. Nhìn có ý chí: 見る (miru) vs 観る (miru)",
        content:
          "- 見る (miru): Nhìn nói chung, hướng ánh mắt vào sự vật có chủ đích (xem sách, nhìn đồng hồ, khám bệnh).\n- 観る (miru - chữ QUAN): Thưởng thức nghệ thuật, xem trình diễn có chuyển động thời gian dài (xem phim - 映画を観る, xem kịch, xem bóng đá - 試合を観る).",
        type: "rule",
      },
      {
        id: "sec-mv-2",
        title: "2. Nhìn tự nhiên không tốn sức: 見える (mieru)",
        content:
          "Là tự động từ biểu thị khả năng thị giác tự nhiên. Đối tượng tự lọt vào võng mạc mà không cần người nói phải cố gắng hay tác động ý chí: 部屋から富士山が見えます (Từ phòng nhìn thấy núi Phú Sĩ). Đi với trợ từ が.",
        type: "rule",
      },
      {
        id: "sec-mv-3",
        title: "3. Tác động lên người khác: 見せる (miseru)",
        content:
          "Là tha động từ mang nghĩa 'cho ai đó xem / xuất trình cái gì': パスポートを見せてください (Xin hãy cho tôi xem hộ chiếu).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-mv-1",
        japanese: "週末は家で映画を観ました。",
        reading: "しゅうまつはいえでえいがをみました。",
        romaji: "Shuumatsu wa ie de eiga o mimashita.",
        vietnamese: "Cuối tuần tôi đã xem phim ở nhà.",
        explanation: "Thưởng thức tác phẩm điện ảnh nghệ thuật -> Dùng chữ 観る.",
        context: "Xem phim giải trí",
      },
      {
        id: "ex-mv-2",
        japanese: "メガネをかけると、遠くの文字がよく見えます。",
        reading: "メガネをかけると、とおくのもじがよくみえます。",
        romaji: "Megane o kakeru to, tooku no moji ga yoku miemasu.",
        vietnamese: "Hễ đeo kính vào là các chữ ở xa nhìn thấy rất rõ.",
        explanation: "Khả năng nhìn thấy rõ ràng tự nhiên của đôi mắt -> Dùng 見える.",
        context: "Khả năng thị giác",
      },
    ],
    comparisons: {
      title: "Đối chiếu 見る (Chủ ý) vs 見える (Tự nhiên)",
      items: [
        {
          subject: "見る (miru) - Tha động từ",
          nuance: "Chủ động hướng tầm mắt để quan sát",
          formula: "N を + 見る",
          example: "黒板の字を見てください。",
          exampleTranslation: "Hãy nhìn chữ trên bảng đen.",
          caution: "Người nói có ý thức tập trung.",
        },
        {
          subject: "見える (mieru) - Tự động từ",
          nuance: "Hình ảnh tự đập vào mắt mà không cần tập trung",
          formula: "N が + 見える",
          example: "海が見える部屋に泊まりました。",
          exampleTranslation: "Tôi đã trọ tại căn phòng nhìn ra biển.",
          caution: "Đối tượng luôn đi với trợ từ が.",
        },
      ],
      summary: "Muốn nhìn -> 見る; Đập vào mắt -> 見える; Cho người khác xem -> 見せる.",
    },
    notes: [
      "Khác biệt giữa 見られる (dạng khả năng của 見る: có điều kiện để xem, ví dụ mua vé xem phim) và 見える (mắt sáng nhìn thấy được).",
    ],
    warnings: [
      "Không nói '富士山を見えます' (Sai trợ từ; 見える là tự động từ nên phải dùng が).",
    ],
    relatedArticles: [
      {
        category: "vocabulary",
        slug: "phan-biet-kiku-va-kiku-nghe",
        title: "Phân biệt 聞く (kiku - nghe/hỏi) và 聴く (kiku - lắng nghe có chủ đích)",
        reason: "Cặp động từ thính giác tương ứng với thị giác",
      },
      {
        category: "grammar",
        slug: "phan-biet-tu-dong-tu-va-tha-dong-tu",
        title: "Bản chất Tự động từ (Jidoushi) & Tha động từ (Tadoushi) kèm cặp từ thông dụng",
        reason: "Nguyên lý tự động từ (見える) và tha động từ (見る/見せる)",
      },
    ],
  },

  // 5. Article 5 (Mới: 聞く vs 聴く)
  {
    id: "v-kiku-chokaku",
    slug: "phan-biet-kiku-va-kiku-nghe",
    categoryId: "vocabulary",
    title: "Phân biệt 聞く (kiku - nghe/hỏi) và 聴く (kiku - lắng nghe có chủ đích)",
    japaneseTitle: "「聞く」と「聴く」のニュアンスの違い",
    summary:
      "Tách bạch âm thanh nghe thấy thụ động hoặc hỏi thông tin (聞く) với việc tập trung lắng nghe âm nhạc, tâm tư (聴く), cùng từ vựng nghe tự nhiên 聞こえる.",
    level: "N5",
    tags: ["Từ vựng", "Động từ thính giác", "聞く", "聴く", "N5"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-kk-1",
        title: "1. 聞く (kiku - chữ VĂN): Nghe nói chung & Hỏi",
        content:
          "Là chữ Hán phổ biến nhất cho động từ きく. Nó bao gồm hai nghĩa lớn:\n- Tiếp nhận âm thanh chung (nghe đài, nghe tin tức: ニュースを聞く).\n- Hỏi thông tin từ ai đó: 道を聞く (Hỏi đường), 先生に聞く (Hỏi thầy cô).",
        type: "rule",
      },
      {
        id: "sec-kk-2",
        title: "2. 聴く (kiku - chữ THÍNH): Lắng nghe chăm chú",
        content:
          "Chữ THÍNH có bộ Nhĩ (tai) kết hợp bộ Tâm (tim). Biểu thị hành động dồn toàn bộ tâm trí để thưởng thức hoặc cảm thấu: 音楽を聴く (Thưởng thức âm nhạc), 講義を聴く (Lắng nghe bài giảng), 悩みを聴く (Lắng nghe tâm sự).",
        type: "rule",
      },
      {
        id: "sec-kk-3",
        title: "3. Âm thanh tự lọt vào tai: 聞こえる (kikoeru)",
        content:
          "Tương tự như 見える, 聞こえる là tự động từ chỉ âm thanh tự nhiên lọt vào màng nhĩ mà ta không chủ động lắng nghe: 隣の部屋から声が聞こえます (Nghe thấy tiếng nói phát ra từ phòng bên cạnh). Đi với trợ từ が.",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-kk-1",
        japanese: "好きな歌手の音楽を聴きながら散歩します。",
        reading: "すきなかしゅのおんがくをききながらさんぽします。",
        romaji: "Sukina kashu no ongaku o kikinagara sanpo shimasu.",
        vietnamese: "Tôi vừa tản bộ vừa lắng nghe âm nhạc của ca sĩ mình yêu thích.",
        explanation: "Thưởng thức âm nhạc chăm chú -> Dùng chữ 聴く.",
        context: "Thưởng thức âm nhạc",
      },
      {
        id: "ex-kk-2",
        japanese: "外から雨の音が聞こえます。",
        reading: "そとからあめのおとがきこえます。",
        romaji: "Soto kara ame no oto ga kikoemasu.",
        vietnamese: "Từ bên ngoài nghe thấy tiếng mưa rơi.",
        explanation: "Âm thanh tự đập vào tai khách quan -> Dùng が聞こえる.",
        context: "Âm thanh tự nhiên",
      },
    ],
    comparisons: {
      title: "Đối chiếu 聞く vs 聴く vs 聞こえる",
      items: [
        {
          subject: "聞く (Chữ Văn) / 聴く (Chữ Thính)",
          nuance: "Chủ động dỏng tai lên để nghe hoặc hỏi",
          formula: "N を + 聞く / 聴く",
          example: "ラジオを聞きます / 音楽を聴きます",
          exampleTranslation: "Nghe radio / Lắng nghe âm nhạc",
          caution: "Muốn hỏi ai cái gì thì dùng: Người に 聞く.",
        },
        {
          subject: "聞こえる (kikoeru) - Tự nhiên",
          nuance: "Âm thanh tự vọng vào tai không cần cố gắng",
          formula: "Âm thanh が + 聞こえる",
          example: "変な音が聞こえました。",
          exampleTranslation: "Tôi đã nghe thấy một âm thanh kỳ lạ.",
          caution: "Luôn đi với trợ từ が.",
        },
      ],
      summary: "Hỏi thông tin -> 聞く; Nghe nhạc thưởng thức -> 聴く; Tiếng ồn tự vọng vào -> 聞こえる.",
    },
    notes: [
      "Trong kỳ thi JLPT phần thi nghe hiểu, tên bài thi chính là 聴解 (Choukai - chữ THÍNH đi với chữ GIẢI).",
    ],
    warnings: [
      "Hỏi đường là '道を聞く', không dùng chữ 聴く cho hành động hỏi.",
    ],
    relatedArticles: [
      {
        category: "vocabulary",
        slug: "phan-biet-miru-kan-mieru-miseru",
        title: "Phân biệt nhóm động từ thị giác: 見る vs 観る vs 見える vs 見せる",
        reason: "Cặp phạm trù giác quan nhìn và nghe",
      },
      {
        category: "conversation",
        slug: "hoi-va-chi-duong-trong-thuc-te",
        title: "Hỏi và chỉ đường thực tế tại Nhật: Cấu trúc câu và từ vựng định hướng",
        reason: "Ứng dụng cụm từ 道を聞く trong đời sống",
      },
    ],
  },

  // 6. Article 6 (Mới: 大きい vs 大きな / 小さい vs 小さな)
  {
    id: "v-ookii-ookina",
    slug: "phan-biet-ookii-ookina-chiisai-chiisana",
    categoryId: "vocabulary",
    title: "Phân biệt 大きい / 大きな và 小さい / 小さな: Tính từ đuôi -i vs Liên thể từ",
    japaneseTitle: "「大きい・大きな」「小さい・小さな」の使い分け",
    summary:
      "Hiểu rõ sự khác biệt ngữ pháp giữa tính từ đuôi -i (vừa làm vị ngữ vừa bổ nghĩa danh từ) và liên thể từ Rentaishi (chỉ đứng trước danh từ), cùng sắc thái trừu tượng vs vật lý.",
    level: "N4",
    tags: ["Từ vựng", "Tính từ", "Liên thể từ", "大きい", "大きな", "N4"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-oc-1",
        title: "1. Khác biệt cốt lõi về mặt ngữ pháp",
        content:
          "- 大きい / 小さい: Là TÍNH TỪ ĐUÔI -I. Có thể đứng ở cuối câu làm vị ngữ (この部屋は大きいです) hoặc đứng trước danh từ bổ nghĩa (大きい部屋).\n- 大きな / 小さな: Là LIÊN THỂ TỪ (Rentaishi). CHỈ ĐƯỢC ĐỨNG TRƯỚC DANH TỪ. Tuyệt đối không thể đứng ở cuối câu làm vị ngữ (Không bao giờ có câu: × この部屋は大きなです).",
        type: "rule",
      },
      {
        id: "sec-oc-2",
        title: "2. Sắc thái biểu cảm: Đo lường khách quan vs Cảm xúc trừu tượng",
        content:
          "- 大きい / 小さい: Thường miêu tả kích thước vật lý cụ thể có thể đo đạc bằng thước đo (hộp to, quả táo nhỏ).\n- 大きな / 小さな: Thường mang sắc thái cảm xúc chủ quan, ước mơ, sự kiện trừu tượng (giấc mơ lớn - 大きな夢, sai lầm lớn - 大きな間違い, biến chuyển lớn - 大きな変化).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-oc-1",
        japanese: "私には将来、大きな夢があります。",
        reading: "わたしにはしょうらい、おおきなゆめがあります。",
        romaji: "Watashi ni wa shourai, ookina yume ga arimasu.",
        vietnamese: "Trong tương lai, tôi ấp ủ một ước mơ to lớn.",
        explanation: "Ước mơ là khái niệm trừu tượng giàu cảm xúc -> Dùng 大きな.",
        context: "Nói về ước mơ",
      },
      {
        id: "ex-oc-2",
        japanese: "この荷物は重くて大きいです。",
        reading: "このにもつはおもくておおきいです。",
        romaji: "Kono nimotsu wa omokute ookii desu.",
        vietnamese: "Kiện hành lý này vừa nặng vừa to.",
        explanation: "Đứng ở cuối câu làm vị ngữ miêu tả kích thước vật lý -> Bắt buộc dùng 大きい.",
        context: "Miêu tả đồ đạc",
      },
    ],
    comparisons: {
      title: "Đối chiếu 大きい vs 大きな",
      items: [
        {
          subject: "大きい (Tính từ đuôi -i)",
          nuance: "Kích thước vật lý cụ thể, có thể chia thì quá khứ/phủ định",
          formula: "N が 大きい / 大きい + N",
          example: "大きかった / 大きくない",
          exampleTranslation: "Đã to / Không to",
          caution: "Làm vị ngữ ở cuối câu bình thường.",
        },
        {
          subject: "大きな (Liên thể từ Rentaishi)",
          nuance: "Trừu tượng, cảm xúc, biểu tượng; chỉ bổ nghĩa danh từ",
          formula: "大きな + Danh từ (BẮT BUỘC)",
          example: "大きな声 / 大きな問題",
          exampleTranslation: "Giọng nói lớn / Vấn đề to lớn",
          caution: "Không chia được thì; không đứng cuối câu.",
        },
      ],
      summary: "Đứng cuối câu -> Chỉ dùng 大きい/小さい. Đi với cảm xúc, ước mơ -> Ưu tiên 大きな/小さな.",
    },
    notes: [
      "Tiếng Nhật chỉ có 3 cặp từ tồn tại dạng này: 大きい/大きな, 小さい/小さな, và おかしい/おかしな (kỳ lạ).",
    ],
    warnings: [
      "Câu sai phổ biến: '彼の家は大きなです' -> Phải sửa thành '彼の家は大きいです'.",
    ],
    relatedArticles: [
      {
        category: "notes",
        slug: "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        title: "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        reason: "Các cụm collocation kinh điển với 大きな như 大きな夢, 大きな声",
      },
      {
        category: "vocabulary",
        slug: "pho-tu-chi-muc-do-thuong-gap",
        title: "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
        reason: "Kết hợp phó từ với tính từ để nhấn mạnh",
      },
    ],
  },

  // 7. Article 7 (Mới: 使う vs 利用する)
  {
    id: "v-tsukau-riyou",
    slug: "phan-biet-tsukau-va-riyou-suru",
    categoryId: "vocabulary",
    title: "Phân biệt 使う (tsukau) và 利用する (riyou suru) - Dùng công cụ vs Tận dụng cơ hội",
    japaneseTitle: "「使う」と「利用する」の使い分け",
    summary:
      "Làm rõ ranh giới giữa việc sử dụng công cụ/tiền bạc vật lý thông thường (使う) và việc tận dụng cơ hội, dịch vụ, tài nguyên để sinh lợi ích (利用する).",
    level: "N4",
    tags: ["Từ vựng", "Động từ dễ nhầm", "使う", "利用する", "N4"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-tr-1",
        title: "1. 使う (tsukau): Sử dụng công cụ, vật chất, năng lượng",
        content:
          "Là từ thuần Nhật (Wago) thông dụng nhất. Biểu thị hành động tiêu hao hoặc vận hành một công cụ vật lý, sức lực hoặc tiền bạc: はしを使う (Dùng đũa), お金を使う (Tiêu tiền), 頭を使う (Động não).",
        type: "rule",
      },
      {
        id: "sec-tr-2",
        title: "2. 利用する (riyou suru): Tận dụng dịch vụ, cơ hội, phương tiện",
        content:
          "Là từ Hán - Nhật (Kango) trang trọng hơn. Mang ý nghĩa 'tận dụng tính năng có sẵn của hệ thống, cơ sở vật chất, dịch vụ công cộng hoặc thời cơ để đạt được lợi ích': 電車を利用する (Sử dụng tàu điện), 図書館を利用する (Khai thác thư viện), チャンスを利用する (Tận dụng cơ hội).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-tr-1",
        japanese: "鉛筆を使ってアンケートに記入してください。",
        reading: "えんぴつをつかってアンケートにきにゅうしてください。",
        romaji: "Enpitsu o tsukatte ankeeto ni kinyuu shite kudasai.",
        vietnamese: "Xin hãy sử dụng bút chì để điền vào phiếu khảo sát.",
        explanation: "Bút chì là công cụ vật lý cầm nắm -> Dùng 使う.",
        context: "Sử dụng dụng cụ",
      },
      {
        id: "ex-tr-2",
        japanese: "通勤の時は地下鉄を利用しています。",
        reading: "つうきんのときはちかてつをごりようしています。",
        romaji: "Tsuukin no toki wa chikatetsu o riyou shite imasu.",
        vietnamese: "Khi đi làm tôi thường tận dụng phương tiện tàu điện ngầm.",
        explanation: "Tàu điện ngầm là dịch vụ hạ tầng công cộng -> Dùng 利用する.",
        context: "Sử dụng dịch vụ công cộng",
      },
    ],
    comparisons: {
      title: "Đối chiếu 使う vs 利用する",
      items: [
        {
          subject: "使う (tsukau) - Thuần Nhật",
          nuance: "Dùng công cụ, tiêu tốn thời gian, tiền của, sức lực",
          formula: "N を 使う",
          example: "パソコンを使う",
          exampleTranslation: "Sử dụng máy vi tính",
          caution: "Mang tính trực tiếp của đôi tay và thể chất.",
        },
        {
          subject: "利用する (riyou suru) - Hán Nhật",
          nuance: "Khai thác tiện ích, hưởng lợi từ hệ thống hoặc cơ hội",
          formula: "N を 利用する",
          example: "銀行のサービスを利用する",
          exampleTranslation: "Sử dụng dịch vụ của ngân hàng",
          caution: "Nếu dùng cho con người (人を泣き落としで利用する) mang nghĩa tiêu cực là 'lợi dụng'.",
        },
      ],
      summary: "Dùng đũa, bút, điện thoại -> 使う; Tận dụng mạng xã hội, dịch vụ xe buýt, thời cơ -> 利用する.",
    },
    notes: [
      "Trong thông báo khách hàng, người Nhật luôn dùng kính ngữ: ご利用いただきありがとうございます (Cảm ơn quý khách đã sử dụng dịch vụ).",
    ],
    warnings: [
      "Tránh dùng '人を利⽤する' khi muốn nói nhờ bạn bè giúp đỡ, vì từ này có nghĩa là 'lợi dụng người khác vì tư lợi'.",
    ],
    relatedArticles: [
      {
        category: "kanji",
        slug: "khi-nao-dung-on-yomi-va-kun-yomi",
        title: "Âm On (Onyomi) và Âm Kun (Kunyomi): Bức tranh toàn cảnh khi nào dùng mỗi loại",
        reason: "So sánh từ thuần Nhật (使う) và từ Hán Nhật (利用する)",
      },
      {
        category: "conversation",
        slug: "mua-hang-hoi-gia-va-thanh-toan",
        title: "Mẫu câu mua sắm, hỏi giá, thử đồ và thanh toán tại cửa hàng & konbini",
        reason: "Cụm từ ご利用 trong giao tiếp thương mại",
      },
    ],
  },

  // 8. Article 8 (Mới: 始まる/始める vs 終わる/終える)
  {
    id: "v-hajimaru-owaru",
    slug: "cap-dong-tu-bat-dau-va-ket-thuc",
    categoryId: "vocabulary",
    title: "Cặp động từ 始まる/始める và 終わる/終える: Tự động từ vs Tha động từ",
    japaneseTitle: "開始と終了の自動詞・他動詞のマスター",
    summary:
      "Luyện tập chuẩn xác phản xạ trợ từ が vs を khi nói về sự bắt đầu và kết thúc của buổi học, công việc, cuộc họp và sự kiện.",
    level: "N5",
    tags: ["Từ vựng", "Tự tha động từ", "始める", "始まる", "終わる", "N5"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-ho-1",
        title: "1. Cặp Bắt đầu: 始まる (Tự) vs 始める (Tha)",
        content:
          "- 始まる (hajimaru - Tự động từ): Sự việc tự khởi động theo lịch trình sẵn có. Chủ ngữ đi với が (授業が始まります - Giờ học bắt đầu).\n- 始める (hajimeru - Tha động từ): Con người chủ động kích hoạt hành động. Đi với trợ từ を (先生が授業を始めます - Thầy giáo bắt đầu buổi học).",
        type: "rule",
      },
      {
        id: "sec-ho-2",
        title: "2. Cặp Kết thúc: 終わる (Tự/Tha) vs 終える (Tha trang trọng)",
        content:
          "- 終わる (owaru): Trong tiếng Nhật sơ cấp, 終わる thường dùng như tự động từ với が (仕事が終わりました - Công việc đã kết thúc).\n- 終える (oeru): Là tha động từ trang trọng diễn tả người nói đã hoàn tất trọn vẹn một quá trình dài hơi (Phát thanh viên: これでニュースを終えます - Đến đây xin được kết thúc bản tin thời sự).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-ho-1",
        japanese: "会議は何時に始まりますか。",
        reading: "かいぎはなんじにはじまりますか。",
        romaji: "Kaigi wa nanji ni hajimarimasu ka.",
        vietnamese: "Cuộc họp sẽ bắt đầu lúc mấy giờ?",
        explanation: "Hỏi về lịch trình bắt đầu của cuộc họp -> Dùng tự động từ 始まる.",
        context: "Hỏi lịch làm việc",
      },
      {
        id: "ex-ho-2",
        japanese: "みんな、日本語の勉強を始めましょう！",
        reading: "みんな、にほんごのべんきょうをはじめましょう！",
        romaji: "Minna, nihongo no benkyou o hajimemashou!",
        vietnamese: "Mọi người ơi, chúng mình cùng bắt đầu học tiếng Nhật nào!",
        explanation: "Chủ động rủ rê bắt đầu hành vi học tập -> Dùng tha động từ 始める.",
        context: "Rủ rê hành động",
      },
    ],
    comparisons: {
      title: "Bảng đối chiếu cặp từ bắt đầu & kết thúc",
      items: [
        {
          subject: "始まる / 終わる (Tự động từ: が)",
          nuance: "Sự kiện diễn ra theo tiến trình khách quan",
          formula: "Sự kiện + が + 始まる / 終わる",
          example: "映画が始まった / 試合が終わった",
          exampleTranslation: "Bộ phim đã bắt đầu / Trận đấu đã kết thúc",
          caution: "Không dùng trợ từ を cho 始まる.",
        },
        {
          subject: "始める / 終える (Tha động từ: を)",
          nuance: "Con người có ý chí quyết định tiến trình",
          formula: "Người は + Sự việc + を + 始める / 終える",
          example: "仕事を始める / 発表を終える",
          exampleTranslation: "Bắt đầu công việc / Kết thúc bài thuyết trình",
          caution: "Bắt buộc có tân ngữ chịu tác động đi với を.",
        },
      ],
      summary: "Sự kiện tự bắt đầu -> が 始まる; Mình bắt đầu làm cái gì -> を 始める.",
    },
    notes: [
      "Động từ ghép: V(bỏ ます) + 始める (Bắt đầu làm gì: 降り始める - bắt đầu rơi mưa) hoặc + 終わる (Làm xong gì: 読み終わる - đọc xong).",
    ],
    warnings: [
      "Lỗi phổ biến: '授業を始まりました' (Sai vì 始まる không đi với を). Phải là '授業が始まりました' hoặc '授業を始めました'.",
    ],
    relatedArticles: [
      {
        category: "grammar",
        slug: "phan-biet-tu-dong-tu-va-tha-dong-tu",
        title: "Bản chất Tự động từ (Jidoushi) & Tha động từ (Tadoushi) kèm cặp từ thông dụng",
        reason: "Quy tắc tự - tha động từ tổng quát",
      },
      {
        category: "notes",
        slug: "phuong-phap-ghi-nho-tu-vung-theo-cum-collocation",
        title: "Phương pháp học từ vựng theo cụm (Collocation) thay vì từ đơn lẻ",
        reason: "Ghi nhớ cặp trợ từ đi liền với danh từ và động từ",
      },
    ],
  },
];
