import { HandbookArticle } from "../types";

export const grammarArticles: HandbookArticle[] = [
  // 1. Article 1 (Gốc)
  {
    id: "g-wa-ga",
    slug: "phan-biet-tro-tu-wa-va-ga",
    categoryId: "grammar",
    title: "Phân biệt trợ từ は (wa) và が (ga) - Bản chất và ngữ cảnh sử dụng",
    japaneseTitle: "助詞「は」と「が」の使い分け",
    summary:
      "Hiểu rõ bản chất chủ đề (Topic - は) đối chiếu với tiêu điểm thông tin (Focus - が), giải mã câu hiện tượng khách quan và quy tắc mệnh đề phụ.",
    level: "ALL",
    tags: ["Trợ từ", "Ngữ pháp cốt lõi", "Cặp trợ từ dễ nhầm", "wa và ga", "N5", "N4"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-wa-ga-1",
        title: "1. Bản chất cốt lõi: Chủ đề (Topic) vs Tiêu điểm (Focus)",
        content:
          "Điểm khác biệt quan trọng nhất không nằm ở dịch nghĩa sang tiếng Việt, mà nằm ở vị trí thông tin mới (New Information) mà người nói muốn người nghe chú ý.\n\n- Trợ từ は (wa) đánh dấu Chủ đề câu (Topic). Phần sau は mới là thông tin quan trọng mà người nói muốn truyền đạt.\n- Trợ từ が (ga) đánh dấu Tiêu điểm (Focus). Từ đứng trước が chính là thông tin quan trọng mới xuất hiện, trả lời cho câu hỏi 'Ai? Cái gì?'.",
        type: "rule",
      },
      {
        id: "sec-wa-ga-2",
        title: "2. Câu miêu tả hiện tượng khách quan (Hiện tượng trước mắt)",
        content:
          "Khi miêu tả một sự vật, hiện tượng bất ngờ xảy ra trước mắt mà người nói chưa xử lý hay biến nó thành chủ đề trò chuyện, người Nhật luôn dùng が để ghi nhận thực tế khách quan.",
        type: "pattern",
      },
      {
        id: "sec-wa-ga-3",
        title: "3. Quy tắc mệnh đề phụ (Subordinate Clauses)",
        content:
          "Trong mệnh đề phụ bổ nghĩa cho danh từ hoặc mệnh đề chỉ thời gian/điều kiện (khi..., nếu...), chủ ngữ của mệnh đề phụ hầu như luôn đi với が, hiếm khi dùng は để tránh xung đột với chủ đề của câu chính.",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-wg-1",
        japanese: "私はナムです。",
        reading: "わたしはナムです。",
        romaji: "Watashi wa Namu desu.",
        vietnamese: "Tôi là Nam.",
        explanation: "Chủ đề câu là 'Tôi' (người nghe đã biết), thông tin mới cần cung cấp là tên 'Nam'.",
        context: "Tự giới thiệu bản thân thông thường",
      },
      {
        id: "ex-wg-2",
        japanese: "私がナムです。",
        reading: "わたしがナムです。",
        romaji: "Watashi ga Namu desu.",
        vietnamese: "Chính tôi là Nam (người mà bạn đang tìm chính là tôi).",
        explanation: "Nhấn mạnh vào 'Tôi', giải đáp câu hỏi 'Ai là Nam?'.",
        context: "Khi ai đó gọi 'Ai là Nam ở đây?'",
      },
      {
        id: "ex-wg-3",
        japanese: "あ、雨が降っています。",
        reading: "あ、あめがふっています。",
        romaji: "A, ame ga futte imasu.",
        vietnamese: "A, trời đang mưa kìa.",
        explanation: "Miêu tả hiện tượng thiên nhiên khách quan vừa nhận biết qua giác quan.",
        context: "Nhìn thấy mưa bất chợt rơi",
      },
      {
        id: "ex-wg-4",
        japanese: "父が作った料理はおいしいです。",
        reading: "ちちがつくりょうりはおいしいです。",
        romaji: "Chichi ga tsukutta ryouri wa oishii desu.",
        vietnamese: "Món ăn mà bố tôi nấu rất ngon.",
        explanation: "Trong cụm bổ nghĩa danh từ '父が作った料理', chủ thể thực hiện hành động 'bố' phải đi với が.",
        context: "Mệnh đề phụ bổ nghĩa cho danh từ",
      },
    ],
    comparisons: {
      title: "Bảng đối chiếu tổng quan giữa は và が",
      description: "Xem xét sự khác biệt theo từng tiêu chí ngữ dụng học:",
      items: [
        {
          subject: "Trợ từ は (wa)",
          nuance: "Đánh dấu chủ đề (Topic), mang tính khái quát, thông tin cũ làm nền tảng",
          formula: "A は [Thông tin mới quan trọng]",
          example: "田中さんは親切です。",
          exampleTranslation: "Anh Tanaka thì tốt bụng.",
          caution: "Tránh dịch máy móc là 'thì/là', cần xem ý đồ người nói có đang so sánh tương phản hay không.",
        },
        {
          subject: "Trợ từ が (ga)",
          nuance: "Đánh dấu tiêu điểm (Focus), chỉ định rõ danh tính, miêu tả hiện tượng thực tế",
          formula: "[Thông tin quan trọng] が B",
          example: "田中さんが来ました！",
          exampleTranslation: "Anh Tanaka đến rồi kìa!",
          caution: "Dùng để chọn ra một đối tượng cụ thể trong số nhiều đối tượng.",
        },
      ],
      summary:
        "Quy tắc ghi nhớ ngắn gọn: Sau は là thông tin cần nghe, trước が là người/vật cần chọn.",
    },
    notes: [
      "Câu hỏi có từ để hỏi (誰, 何, どこ) làm chủ ngữ thì câu hỏi BẮT BUỘC dùng が: 誰が来ますか？",
      "Câu trả lời cho từ để hỏi làm chủ ngữ cũng BẮT BUỘC dùng が: 田中さんが来ます。",
      "Tính từ chỉ cảm xúc, sở thích, năng lực (好き, 嫌い, 上手, 下手, わかる, できる) luôn đi với tân ngữ が.",
    ],
    warnings: [
      "Không có quy tắc cứng nhắc tuyệt đối 100% trong mọi ngữ cảnh văn phong. Cùng một câu, nếu đổi は sang が, ngữ cảnh và hàm ý tâm lý của người nói sẽ thay đổi.",
      "Trong giao tiếp thân mật hàng ngày, trợ từ は và が thường bị lược bỏ trong câu ngắn nếu ngữ cảnh đã hoàn toàn rõ ràng.",
    ],
    relatedArticles: [
      {
        category: "grammar",
        slug: "phan-biet-ni-va-de",
        title: "Phân biệt trợ từ に (ni) và で (de) chỉ nơi chốn & thời gian",
        reason: "Tiếp tục làm chủ cặp trợ từ nền tảng tiếp theo",
      },
      {
        category: "notes",
        slug: "loi-thuong-gap-khi-dung-wa-va-ga",
        title: "Trợ từ は và が — Những lỗi tư duy người Việt hay mắc phải nhất và cách sửa",
        reason: "Điểm mặt các lỗi sai cụ thể người Việt hay mắc",
      },
    ],
  },

  // 2. Article 2 (Gốc)
  {
    id: "g-ni-de",
    slug: "phan-biet-ni-va-de",
    categoryId: "grammar",
    title: "Phân biệt trợ từ に (ni) và で (de) chỉ nơi chốn & thời gian",
    japaneseTitle: "場所・時間の助詞「に」と「で」",
    summary:
      "Xác định ranh giới giữa điểm tồn tại tĩnh/đích đến (に) và nơi diễn ra hành động động/phương tiện (で), giải quyết triệt để sự nhầm lẫn khi dịch từ 'ở/tại'.",
    level: "N5",
    tags: ["Trợ từ", "Nơi chốn", "Thời gian", "N5", "Căn bản"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-ni-de-1",
        title: "1. Vấn đề của người học tiếng Việt",
        content:
          "Trong tiếng Việt, cả hai câu 'Tôi ở nhà' và 'Tôi ăn cơm ở nhà' đều dùng từ 'ở'. Tuy nhiên trong tiếng Nhật:\n- 'Tôi ở nhà' là trạng thái tồn tại tĩnh -> Dùng に (家にいます).\n- 'Tôi ăn cơm ở nhà' là địa điểm diễn ra hành động ăn -> Dùng で (家でご飯を食べます).",
        type: "text",
      },
      {
        id: "sec-ni-de-2",
        title: "2. Trợ từ に - Đích đến, điểm kết thúc và vị trí tồn tại",
        content:
          "Trợ từ に biểu thị điểm dừng chân, đích đến của hành động di chuyển (行く, 来る, 帰る), vị trí của sự tồn tại (いる, ある, 住む), hoặc kết quả của sự tác động bám vào (座る, 乗る, 入る).",
        type: "rule",
      },
      {
        id: "sec-ni-de-3",
        title: "3. Trợ từ で - Sân khấu diễn ra hành động, phương tiện, cách thức",
        content:
          "Trợ từ で biểu thị 'sân khấu' nơi một hành động năng động diễn ra (勉強する, 働く, 運動する), hoặc công cụ/phương tiện được dùng để thực hiện hành động đó (箸で食べる, 電車で行く).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-nd-1",
        japanese: "ハノイに住んでいます。",
        reading: "ハノイにすんでいます。",
        romaji: "Hanoi ni sunde imasu.",
        vietnamese: "Tôi đang sống ở Hà Nội.",
        explanation: "Hành động 'sống' là trạng thái định cư lâu dài, gắn liền với trợ từ に.",
        context: "Hỏi thăm nơi ở",
      },
      {
        id: "ex-nd-2",
        japanese: "図書館で日本語を勉強します。",
        reading: "としょかんでにほんごをべんきょうします。",
        romaji: "Toshokan de nihongo o benkyou shimasu.",
        vietnamese: "Tôi học tiếng Nhật ở thư viện.",
        explanation: "'Học' là hành động tích cực diễn ra tại thư viện -> Dùng で.",
        context: "Địa điểm diễn ra hoạt động học tập",
      },
      {
        id: "ex-nd-3",
        japanese: "電車に乗ります。",
        reading: "でんしゃにのります。",
        romaji: "Densha ni norimasu.",
        vietnamese: "Tôi lên tàu điện.",
        explanation: "Bước lên tàu là hành động hướng đích bám vào phương tiện -> Dùng に.",
        context: "Hành động lên tàu xe",
      },
      {
        id: "ex-nd-4",
        japanese: "電車で会社に行きます。",
        reading: "でんしゃでかいしゃにいきます。",
        romaji: "Densha de kaisha ni ikimasu.",
        vietnamese: "Tôi đến công ty bằng tàu điện.",
        explanation: "Tàu điện đóng vai trò phương tiện di chuyển -> Dùng で; công ty là đích đến -> Dùng に.",
        context: "Phương tiện và đích đến",
      },
    ],
    comparisons: {
      title: "Đối chiếu trợ từ に vs で theo chức năng",
      items: [
        {
          subject: "Trợ từ に (Điểm đến / Tĩnh)",
          nuance: "Chỉ vị trí tồn tại tĩnh, đích đến của di chuyển, thời điểm có con số cụ thể",
          formula: "Nơi chốn + に + [いる/ある/住む/座る/行く]",
          example: "公園にベンチがあります。",
          exampleTranslation: "Ở công viên có ghế dài.",
          caution: "Không dùng に cho nơi chốn nếu động từ là hành vi tích cực tạo ra sự kiện.",
        },
        {
          subject: "Trợ từ で (Sân khấu / Động / Công cụ)",
          nuance: "Chỉ nơi diễn ra hành động, công cụ, phương tiện, phạm vi hoặc nguyên nhân",
          formula: "Nơi chốn + で + [Ăn/Uống/Học/Chạy/Làm việc]",
          example: "公園で友達と散歩します。",
          exampleTranslation: "Tôi đi dạo với bạn ở công viên.",
          caution: "Với sự kiện/lễ hội (お祭り, パーティー), địa điểm tổ chức luôn đi với で (公園でお祭りがある).",
        },
      ],
      summary:
        "Mẹo phân biệt: 'Ở đâu có cái gì' dùng に; 'Ở đâu làm việc gì' hoặc 'Ở đâu diễn ra sự kiện gì' dùng で.",
    },
    notes: [
      "Với thời gian: Có con số cụ thể thì dùng に (7時に起きます), không có con số cụ thể thì không dùng に (昨日、今日、来週).",
      "Động từ 働く (làm việc) thường đi với で (会社で働きます), nhưng 勤める (cống hiến/biên chế) lại đi với に (会社に勤めます).",
    ],
    warnings: [
      "Tránh nhầm lẫn đặc biệt: Sự kiện diễn ra (パーティーがある, 試験がある) thì dùng で chứ không dùng に vì mang tính chất hoạt động diễn ra.",
    ],
    relatedArticles: [
      {
        category: "grammar",
        slug: "phan-biet-tro-tu-wa-va-ga",
        title: "Phân biệt trợ từ は (wa) và が (ga) - Bản chất và ngữ cảnh sử dụng",
        reason: "Cặp trợ từ chủ đề - tiêu điểm nền tảng",
      },
      {
        category: "notes",
        slug: "checklist-chon-tro-tu-ni-va-de",
        title: "Checklist 30 giây chọn nhanh trợ từ に hay で không bao giờ nhầm",
        reason: "Bảng tra cứu quy tắc nhanh khi phân vân giữa に và で",
      },
    ],
  },

  // 3. Article 3 (Gốc)
  {
    id: "g-jidoushi-tadoushi",
    slug: "phan-biet-tu-dong-tu-va-tha-dong-tu",
    categoryId: "grammar",
    title: "Bản chất Tự động từ (Jidoushi) & Tha động từ (Tadoushi) kèm cặp từ thông dụng",
    japaneseTitle: "自動詞と他動詞の対応法則",
    summary:
      "Nắm vững nguyên lý diễn đạt trạng thái khách quan (Tự động từ + が) đối chiếu với hành vi có chủ ý của con người (Tha động từ + を) cùng các cặp từ then chốt.",
    level: "N4",
    tags: ["Động từ", "Tự động từ", "Tha động từ", "N4", "Quy tắc cặp từ"],
    readTimeMinutes: 7,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-jt-1",
        title: "1. Tự động từ (Jidoushi) là gì?",
        content:
          "Tự động từ miêu tả hành động tự thân của sự vật hiện tượng, hoặc trạng thái biến đổi không có sự can thiệp trực tiếp của con người ở thời điểm nói. Danh từ đi trước tự động từ thường đi với trợ từ が.\nCông thức: N が + Tự động từ.",
        type: "rule",
      },
      {
        id: "sec-jt-2",
        title: "2. Tha động từ (Tadoushi) là gì?",
        content:
          "Tha động từ miêu tả hành động có chủ ý của một tác nhân (thường là con người) tác động lên một đối tượng bên ngoài. Đối tượng tiếp nhận hành động đi với trợ từ を.\nCông thức: Người は + N を + Tha động từ.",
        type: "rule",
      },
      {
        id: "sec-jt-3",
        title: "3. Các cặp từ thường gặp nhất trong JLPT N5 - N4",
        content:
          "Dưới đây là các cặp tự - tha động từ xuất hiện với tần suất cao nhất mà người học bắt buộc phải ghi nhớ chuẩn:",
        type: "table",
        tableData: {
          headers: ["Tự động từ (が)", "Tha động từ (を)", "Ý nghĩa tiếng Việt"],
          rows: [
            ["開く (あく)", "開ける (あける)", "Mở (cửa tự mở vs người mở cửa)"],
            ["閉まる (しまる)", "閉める (しめる)", "Đóng (cửa tự đóng vs người đóng cửa)"],
            ["つく", "つける", "Bật (đèn tự sáng vs người bật đèn)"],
            ["消える (きえる)", "消す (けす)", "Tắt (đèn tự tắt vs người tắt đèn)"],
            ["始まる (はじまる)", "始める (はじめる)", "Bắt đầu (sự kiện bắt đầu vs ai bắt đầu việc gì)"],
            ["終わる (おわる)", "終える (おえる)", "Kết thúc (giờ học kết thúc vs hoàn thành việc)"],
            ["入る (はいる)", "入れる (いれる)", "Vào / Cho vào"],
            ["出る (でる)", "出す (だす)", "Ra / Lấy ra"],
          ],
        },
      },
    ],
    examples: [
      {
        id: "ex-jt-1",
        japanese: "ドアが開きました。",
        reading: "ドアがあきました。",
        romaji: "Doa ga akimashita.",
        vietnamese: "Cửa đã mở ra (tự mở hoặc không quan tâm ai mở).",
        explanation: "Miêu tả hiện tượng chiếc cửa tự hé mở hoặc trạng thái thay đổi.",
        context: "Tự động từ",
      },
      {
        id: "ex-jt-2",
        japanese: "風が強いので、窓を閉めてください。",
        reading: "かぜがつよいので、まどをしめてください。",
        romaji: "Kaze ga tsuyoi node, mado o shimete kudasai.",
        vietnamese: "Vì gió to nên xin bạn hãy đóng cửa sổ lại.",
        explanation: "Yêu cầu một người tác động lên chiếc cửa sổ để đóng nó lại.",
        context: "Tha động từ",
      },
    ],
    comparisons: {
      title: "So sánh Tự động từ và Tha động từ",
      items: [
        {
          subject: "Tự động từ (Jidoushi)",
          nuance: "Tập trung vào hiện tượng và kết quả biến đổi của đối tượng",
          formula: "N が + Tự động từ",
          example: "電気が消えています。",
          exampleTranslation: "Đèn đang bị tắt.",
          caution: "Tránh dùng を với tự động từ thuần túy.",
        },
        {
          subject: "Tha động từ (Tadoushi)",
          nuance: "Tập trung vào hành vi và ý chí của người thực hiện",
          formula: "N を + Tha động từ",
          example: "部屋の電気を消しました。",
          exampleTranslation: "Tôi đã tắt đèn phòng.",
          caution: "Khi chuyển sang thể bị động hoặc thể sai khiến, cấu trúc trợ từ sẽ biến đổi.",
        },
      ],
      summary:
        "Tự động từ chú trọng vào 'sự việc xảy ra như thế nào', Tha động từ chú trọng vào 'ai làm việc đó'.",
    },
    notes: [
      "Đuôi -aru thường là tự động từ (閉まる, 始まる), đuôi -eru thường là tha động từ tương ứng (閉める, 始める).",
      "Đuôi -su hầu như luôn là tha động từ (消す, 出す, 直す, 落とす).",
    ],
    warnings: [
      "Có những động từ nhìn giống nhau nhưng quy tắc đuôi bị đảo ngược (ví dụ: 聞こえる là tự động từ chỉ nghe thấy tự nhiên). Không nên học vẹt công thức mà hãy học theo ngữ cảnh từng cặp.",
    ],
    relatedArticles: [
      {
        category: "grammar",
        slug: "ban-chat-cau-truc-te-iru",
        title: "Bản chất cấu trúc 〜ている: Hành động tiếp diễn, trạng thái kết quả & thói quen",
        reason: "Tự động từ kết hợp với 〜ている biểu thị trạng thái kết quả",
      },
      {
        category: "vocabulary",
        slug: "cap-dong-tu-bat-dau-va-ket-thuc",
        title: "Cặp động từ 始まる/始める và 終わる/終える: Tự động từ vs Tha động từ",
        reason: "Ứng dụng trực tiếp cặp tự-tha động từ kinh điển",
      },
    ],
  },

  // 4. Article 4 (Mới: Phân biệt から và ので)
  {
    id: "g-kara-node",
    slug: "phan-biet-kara-va-node",
    categoryId: "grammar",
    title: "Phân biệt から (kara) và ので (node) chỉ nguyên nhân, lý do",
    japaneseTitle: "理由・原因を表す「から」と「ので」の使い分け",
    summary:
      "So sánh mức độ chủ quan vs khách quan, độ lịch sự khi xin phép hay từ chối, và các trường hợp chỉ được dùng から mà không được dùng ので.",
    level: "N5",
    tags: ["Ngữ pháp", "Liên từ", "Lý do", "から", "ので", "N5"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-kn-1",
        title: "1. Bản chất: Chủ quan (から) vs Khách quan (ので)",
        content:
          "- から (kara) nhấn mạnh lý do chủ quan của người nói, thể hiện rõ lập trường cá nhân hoặc cảm xúc ('Vì tôi nghĩ thế nên...').\n- ので (node) biểu thị lý do khách quan, nhẹ nhàng mang tính thực tế hiển nhiên, làm dịu bớt áp lực cho người nghe ('Do hoàn cảnh thực tế như vậy nên...').",
        type: "rule",
      },
      {
        id: "sec-kn-2",
        title: "2. Mệnh đề sau: Mệnh lệnh, yêu cầu, rủ rê đi với cái nào?",
        content:
          "Khi vế sau là câu mệnh lệnh (〜しろ), cấm chỉ (〜な), khuyên nhủ (〜ほうがいい) hay rủ rê (〜ましょう/〜ませんか), chỉ có thể dùng から. Dùng ので trong các câu này sẽ nghe rất gượng gạo hoặc thiếu tự nhiên.",
        type: "rule",
      },
      {
        id: "sec-kn-3",
        title: "3. Lỗi thường gặp của người Việt khi xin phép / xin lỗi",
        content:
          "Khi xin phép nghỉ ốm hay xin lỗi khách hàng, người Việt hay quen miệng dùng から (熱がありますから、休みます). Trong mắt người Nhật, câu này nghe có vẻ áp đặt lý do cá nhân. Hãy dùng ので (熱がありますので、休ませていただけませんか) để thể hiện sự lịch thiệp và tôn trọng đối phương.",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-kn-1",
        japanese: "危ないですから、触らないでください。",
        reading: "あぶないですから、さわらないでください。",
        romaji: "Abunai desu kara, sawaranaide kudasai.",
        vietnamese: "Vì nguy hiểm nên xin đừng chạm vào.",
        explanation: "Vế sau là yêu cầu dứt khoát 'đừng chạm vào' -> Dùng から.",
        context: "Biển cảnh báo an toàn",
      },
      {
        id: "ex-kn-2",
        japanese: "電車が遅れましたので、遅刻してしまいました。",
        reading: "でんしゃがおくれましたので、ちこくしてしまいました。",
        romaji: "Densha ga okuremashita node, chikoku shite shimaimashita.",
        vietnamese: "Do tàu điện bị trễ chuyến nên em đã lỡ đi muộn ạ.",
        explanation: "Trình bày lý do khách quan bất khả kháng một cách lịch sự trước giáo viên hoặc sếp.",
        context: "Giải thích lý do đi muộn",
      },
    ],
    comparisons: {
      title: "Bảng đối chiếu から vs ので",
      items: [
        {
          subject: "から (kara) - Chủ quan & Mạnh mẽ",
          nuance: "Nhấn mạnh lý do cá nhân, có thể đi kèm mệnh lệnh, rủ rê, ý chí",
          formula: "Thể thông thường / Thể lịch sự + から",
          example: "時間がありませんから、急ぎましょう。",
          exampleTranslation: "Vì không có thời gian đâu, chúng mình nhanh lên nào.",
          caution: "Tránh dùng khi xin lỗi khách hàng vì nghe giống bao biện.",
        },
        {
          subject: "ので (node) - Khách quan & Lịch sự",
          nuance: "Diễn tả nguyên nhân tự nhiên theo hoàn cảnh, giảm nhẹ tính áp đặt",
          formula: "Thể thông thường (Na-adj / N thêm な) + ので",
          example: "頭が痛いので、少し休んでもいいですか。",
          exampleTranslation: "Vì em bị đau đầu nên em xin phép nghỉ một chút được không ạ?",
          caution: "Vế sau không dùng mệnh lệnh trực tiếp (しろ, するな).",
        },
      ],
      summary: "Muốn xin phép, xin lỗi, giao tiếp công sở -> Ưu tiên ので. Muốn rủ rê, ra lệnh, quả quyết -> Dùng から.",
    },
    notes: [
      "Với danh từ và tính từ đuôi -na: Khi nối với ので phải thêm な (雨なので、暇なので); khi nối với から có thể là だから hoặc ですから.",
    ],
    warnings: [
      "Không bao giờ dùng câu mệnh lệnh như '危険ですので、入るな' (sai ngữ cảm). Nếu là biển cấm ngặt nghèo, người Nhật dùng から hoặc danh từ hóa.",
    ],
    relatedArticles: [
      {
        category: "conversation",
        slug: "xin-loi-va-dap-lai-loi-xin-loi",
        title: "Văn hóa xin lỗi trong tiếng Nhật: Từ Sumimasen, Gomennasai đến Moushiwake arimasen",
        reason: "Ứng dụng ので khi nêu lý do trong câu xin lỗi",
      },
      {
        category: "grammar",
        slug: "phan-biet-temo-va-temo-ii",
        title: "Phân biệt cấu trúc 〜ても (nhượng bộ) và 〜てもいい (cho phép)",
        reason: "Kết hợp câu xin phép lịch sự",
      },
    ],
  },

  // 5. Article 5 (Mới: Phân biệt ても và てom-ii)
  {
    id: "g-temo-temo-ii",
    slug: "phan-biet-temo-va-temo-ii",
    categoryId: "grammar",
    title: "Phân biệt cấu trúc 〜ても (nhượng bộ) và 〜てもいい (cho phép)",
    japaneseTitle: "逆接「〜ても」と許可「〜てもいい」の区別",
    summary:
      "Làm rõ sự khác biệt giữa liên từ nhượng bộ 'Dù cho... thì vẫn...' (〜ても) và mẫu câu xin phép hoặc chấp thuận 'Làm... cũng được' (〜てもいい/〜てもかまいません).",
    level: "N5",
    tags: ["Ngữ pháp", "Nhượng bộ", "Xin phép", "ても", "てもいい", "N5"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-tm-1",
        title: "1. Mẫu câu xin phép / cho phép: V-てもいい (てもいいです)",
        content:
          "Dùng khi người nói muốn xin phép người khác thực hiện một hành động (〜てもいいですか - Tôi làm... có được không?) hoặc người có thẩm quyền cho phép người khác làm điều gì (〜てもいいです - Bạn làm... cũng được).",
        type: "rule",
      },
      {
        id: "sec-tm-2",
        title: "2. Cấu trúc nhượng bộ: 〜ても (〜でも)",
        content:
          "Diễn đạt ý nghĩa 'Dù cho điều kiện A có xảy ra, thì kết quả B vẫn không thay đổi hoặc trái với kỳ vọng thông thường'.\nCông thức:\n- Động từ thể Te + も\n- Tính từ -i: bỏ い + くても\n- Tính từ -na / Danh từ: + でも.",
        type: "rule",
      },
      {
        id: "sec-tm-3",
        title: "3. Nhầm lẫn tai hại của người học",
        content:
          "Vì cả hai đều có thành phần 'ても' ở đầu, nhiều bạn học sinh khi muốn nói 'Dù mưa tôi vẫn đi' (雨が降っても行きます) lại nhầm thành '雨が降ってもいい...' khiến người nghe tưởng là bạn đang cho phép trời mưa!",
        type: "text",
      },
    ],
    examples: [
      {
        id: "ex-tm-1",
        japanese: "ここで写真を撮ってもいいですか。",
        reading: "ここでしゃしんをとってもいいですか。",
        romaji: "Koko de shashin o totte mo ii desu ka.",
        vietnamese: "Tôi chụp ảnh ở đây có được không ạ?",
        explanation: "Dùng để hỏi xin phép lịch sự trước khi chụp ảnh tại bảo tàng/di tích.",
        context: "Xin phép làm một hành động",
      },
      {
        id: "ex-tm-2",
        japanese: "何度読んでも、この文の意味がわかりません。",
        reading: "なんどよんでも、このぶんのいみがわかりません。",
        romaji: "Nando yonde mo, kono bun no imi ga wakarimasen.",
        vietnamese: "Dù đọc bao nhiêu lần đi nữa, tôi vẫn không hiểu nghĩa của câu này.",
        explanation: "Nhượng bộ: Nỗ lực đọc nhiều lần nhưng kết quả vẫn không hiểu.",
        context: "Biểu đạt sự khó khăn",
      },
    ],
    comparisons: {
      title: "Đối chiếu V-ても vs V-てもいい",
      items: [
        {
          subject: "〜ても (Nhượng bộ: Dù... cũng)",
          nuance: "Nối 2 vế câu tương phản với logic thông thường",
          formula: "V-て + も + [Kết quả không đổi]",
          example: "薬を飲んでも、熱が下がりません。",
          exampleTranslation: "Dù đã uống thuốc nhưng vẫn không hạ sốt.",
          caution: "Phải có vế kết quả theo sau.",
        },
        {
          subject: "〜てもいい (Cho phép: Làm... cũng được)",
          nuance: "Bày tỏ sự đồng thuận, chấp nhận hoặc xin phép",
          formula: "V-て + もいい (です/ですか)",
          example: "もう帰ってもいいですよ。",
          exampleTranslation: "Bạn có thể về được rồi đấy.",
          caution: "Khi nói với người bề trên, không dùng 〜てもいい để cho phép họ.",
        },
      ],
      summary: "Thiếu chữ 'いい' câu sẽ biến từ xin phép sang câu nhượng bộ dở dang.",
    },
    notes: [
      "Trong giao tiếp lịch sự hơn, thay '〜てもいいですか' bằng '〜てもよろしいでしょうか' hoặc '〜てもかまいませんか'.",
    ],
    warnings: [
      "Tránh trả lời sếp '〜てもいいです' khi sếp xin phép bạn điều gì. Đối với bề trên, phải dùng thể lịch sự khiêm nhường.",
    ],
    relatedArticles: [
      {
        category: "grammar",
        slug: "phan-biet-kara-va-node",
        title: "Phân biệt から (kara) và ので (node) chỉ nguyên nhân, lý do",
        reason: "Nêu lý do đi kèm khi xin phép bằng 〜てもいいですか",
      },
      {
        category: "conversation",
        slug: "nho-giup-do-va-yeu-cau-lich-su",
        title: "Cách nhờ vả và đưa ra yêu cầu lịch sự: Từ 〜てください đến 〜ていただけませんか",
        reason: "Mở rộng các mẫu câu xin phép và nhờ vả trang trọng",
      },
    ],
  },

  // 6. Article 6 (Mới: Bản chất cấu trúc 〜ている)
  {
    id: "g-te-iru",
    slug: "ban-chat-cau-truc-te-iru",
    categoryId: "grammar",
    title: "Bản chất cấu trúc 〜ている: Hành động tiếp diễn, trạng thái kết quả & thói quen",
    japaneseTitle: "「〜ている」の3大用法（進行・結果状態・習慣）",
    summary:
      "Giải mã 3 sắc thái lớn của 〜ている: Đang thực hiện hành động, trạng thái là kết quả của hành động đã xong trong quá khứ, và thói quen lặp lại.",
    level: "N5",
    tags: ["Ngữ pháp", "Thể Te", "ている", "Trạng thái", "N5", "N4"],
    readTimeMinutes: 7,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-ti-1",
        title: "1. Ý nghĩa 1: Hành động đang diễn ra (Tiếp diễn)",
        content:
          "Đi kèm các động từ hành vi có thời lượng kéo dài (đọc, ăn, viết, học). Diễn tả hành động đang xảy ra ngay tại thời điểm nói tương đương 'to be V-ing' trong tiếng Anh (今、本を読んでいます - Tôi đang đọc sách).",
        type: "rule",
      },
      {
        id: "sec-ti-2",
        title: "2. Ý nghĩa 2: Trạng thái kết quả (Lỗi lớn nhất của người học!)",
        content:
          "Đi kèm các động từ biến đổi trạng thái mang tính khoảnh khắc (kết hôn, chết, mở cửa, mặc áo, biết). Khi chuyển sang 〜ている, nó KHÔNG mang nghĩa là đang làm, mà là HÀNH ĐỘNG ĐÃ LÀM XONG VÀ TRẠNG THÁI ĐÓ ĐANG TỒN TẠI.\n- 結婚しています: Đã kết hôn và hiện đang trong tình trạng có gia đình (chứ không phải đang tổ chức đám cưới!).\n- 死んでいます: Đã chết và hiện đang ở trạng thái chết.",
        type: "rule",
      },
      {
        id: "sec-ti-3",
        title: "3. Ý nghĩa 3: Nghề nghiệp và thói quen lặp lại lâu dài",
        content:
          "Diễn tả một thói quen hoặc hành vi mang tính nghề nghiệp được lặp đi lặp lại thường xuyên trong đời sống: 銀行で働いています (Tôi đang làm việc ở ngân hàng).",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-ti-1",
        japanese: "田中さんは今、電話をかけています。",
        reading: "たなかさんはいま、でんわをかけています。",
        romaji: "Tanaka-san wa ima, denwa o kakete imasu.",
        vietnamese: "Anh Tanaka bây giờ đang gọi điện thoại.",
        explanation: "Hành động gọi điện đang diễn ra ở hiện tại.",
        context: "Hành động tiếp diễn",
      },
      {
        id: "ex-ti-2",
        japanese: "窓が開いています。",
        reading: "まどがあいています。",
        romaji: "Mado ga aite imasu.",
        vietnamese: "Cửa sổ đang mở (ở trạng thái mở sẵn).",
        explanation: "Tự động từ 開く kết hợp với ている để biểu thị trạng thái kết quả của chiếc cửa sổ.",
        context: "Trạng thái kết quả",
      },
      {
        id: "ex-ti-3",
        japanese: "私はメガネをかけています。",
        reading: "わたしはメガネをかけています。",
        romaji: "Watashi wa megane o kakete imasu.",
        vietnamese: "Tôi đang đeo kính (trên mặt tôi hiện có cặp kính).",
        explanation: "Hành vi đeo đã xong, hiện tại duy trì trạng thái đeo trên mặt.",
        context: "Miêu tả ngoại hình",
      },
    ],
    comparisons: {
      title: "Hành động đang diễn ra vs Trạng thái kết quả",
      items: [
        {
          subject: "Động từ hành vi (Đang làm)",
          nuance: "Chưa kết thúc, đang trong tiến trình",
          formula: "Động từ hành vi + ている",
          example: "ご飯を食べています。",
          exampleTranslation: "Tôi đang ăn cơm.",
          caution: "Dừng lại là hết ăn.",
        },
        {
          subject: "Động từ trạng thái / Khoảnh khắc (Đã xong & còn duy trì)",
          nuance: "Hành động xảy ra trong chớp mắt, kết quả đọng lại",
          formula: "Động từ khoảnh khắc + ている",
          example: "鍵が落ちています。",
          exampleTranslation: "Chùm chìa khóa đang rơi nằm ở dưới đất.",
          caution: "Không dịch là 'đang rơi', mà là 'đã rơi và đang nằm đó'.",
        },
      ],
      summary: "Nếu động từ có thể làm liên tục 30 phút -> ている là 'đang làm'. Nếu động từ chỉ diễn ra trong 1 giây -> ている là 'kết quả còn lưu lại'.",
    },
    notes: [
      "Động từ 知る (biết): Khẳng định dùng 知っています (đang có kiến thức đó), nhưng phủ định BẮT BUỘC dùng 知りません (chứ không dùng 知っていません).",
    ],
    warnings: [
      "Tuyệt đối không dịch 'Tôi đang kết hôn' khi thấy 結婚しています. Phải hiểu là 'Tôi đã có gia đình'.",
    ],
    relatedArticles: [
      {
        category: "grammar",
        slug: "phan-biet-tu-dong-tu-va-tha-dong-tu",
        title: "Bản chất Tự động từ (Jidoushi) & Tha động từ (Tadoushi) kèm cặp từ thông dụng",
        reason: "Tự động từ đi với ている luôn miêu tả trạng thái kết quả",
      },
      {
        category: "vocabulary",
        slug: "phan-biet-shiru-va-wakaru",
        title: "Phân biệt 知る (shiru) và 分かる (wakaru) - Biết thông tin vs Thấu hiểu bản chất",
        reason: "Đặc thù thể phủ định của 知っています",
      },
    ],
  },

  // 7. Article 7 (Mới: たい / ほしい)
  {
    id: "g-tai-hoshii",
    slug: "phan-biet-tai-va-hoshii",
    categoryId: "grammar",
    title: "Phân biệt 〜たい (muốn làm) và 〜ほしい (muốn có) & quy tắc chủ ngữ",
    japaneseTitle: "願望表現「〜たい」と「〜ほしい」のルール",
    summary:
      "Phân biệt mong muốn hành động (V-たい) với mong muốn sở hữu vật thể (N-がほしい), cùng điều cấm kỵ khi hỏi trực tiếp người bề trên.",
    level: "N5",
    tags: ["Ngữ pháp", "Nguyện vọng", "たい", "ほしい", "N5"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-th-1",
        title: "1. Khác biệt cơ bản về đối tượng mong muốn",
        content:
          "- V-たい: Muốn thực hiện một HÀNH ĐỘNG (Đi với động từ: 日本へ行きたい - Muốn đi Nhật).\n- N がほしい: Muốn sở hữu một ĐỒ VẬT / DANH TỪ (Đi với danh từ: 新しい車がほしい - Muốn có chiếc xe ô tô mới).",
        type: "rule",
      },
      {
        id: "sec-th-2",
        title: "2. Quy tắc chủ ngữ ngôi thứ 3 (Người khác muốn)",
        content:
          "Trong tiếng Nhật, cảm xúc nội tâm sâu kín chỉ bản thân người nói (ngôi thứ 1) mới cảm nhận chắc chắn được. Do đó, bạn KHÔNG ĐƯỢC NÓI '田中さんは日本へ行きたいです'. Khi nói về người thứ 3, bắt buộc phải dùng:\n- 〜たがっています (Đang tỏ ra muốn...)\n- 〜たいと言っています (Nói rằng muốn...)\n- 〜たいそうです (Nghe nói là muốn...).",
        type: "rule",
      },
      {
        id: "sec-th-3",
        title: "3. Điều cấm kỵ với người bề trên",
        content:
          "Không bao giờ hỏi sếp hoặc khách hàng: 'お茶がほしいですか' hay '何が食べたいですか'. Hỏi trực tiếp như vậy bị coi là suồng sã, tò mò vào mong muốn cá nhân của họ. Hãy thay bằng câu đề xuất lịch sự: 'お茶はいかがですか' (Trà có được không ạ?).",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-th-1",
        japanese: "今度の休みに富士山に登りたいです。",
        reading: "こんどのやすみにふじさんにのぼりたいです。",
        romaji: "Kondo no yasumi ni Fujisan ni noboritai desu.",
        vietnamese: "Kỳ nghỉ tới tôi muốn leo núi Phú Sĩ.",
        explanation: "Muốn làm hành động 'leo núi' -> V-たい.",
        context: "Bày tỏ nguyện vọng cá nhân",
      },
      {
        id: "ex-th-2",
        japanese: "弟は新しいゲームをほしがっています。",
        reading: "おとうとはあたらしいゲームをほしがっています。",
        romaji: "Otouto wa atarashii geemu o hoshigatte imasu.",
        vietnamese: "Em trai tôi đang rất muốn có bộ game mới.",
        explanation: "Người thứ 3 (em trai) muốn có đồ vật -> Dùng đuôi ほしがる.",
        context: "Miêu tả ý muốn người khác",
      },
    ],
    comparisons: {
      title: "Đối chiếu 〜たい vs 〜ほしい",
      items: [
        {
          subject: "V-たい (Muốn làm)",
          nuance: "Khát khao thực hiện hành vi, động từ chuyển thành tính từ đuôi -i",
          formula: "V(bỏ ます) + たい (Trợ từ を hoặc が)",
          example: "水を飲みたいです。",
          exampleTranslation: "Tôi muốn uống nước.",
          caution: "Tân ngữ có thể đi với を hoặc が.",
        },
        {
          subject: "N が ほしい (Muốn có)",
          nuance: "Khát khao sở hữu một đối tượng danh từ cụ thể",
          formula: "Danh từ + が + ほしい",
          example: "自由な時間がほしいです。",
          exampleTranslation: "Tôi muốn có thời gian tự do.",
          caution: "Trợ từ bắt buộc là が, không dùng を.",
        },
      ],
      summary: "Muốn ĐỘNG TỪ thì dùng たい; muốn DANH TỪ thì dùng ほしい.",
    },
    notes: [
      "Phủ định của たい là たくない; phủ định của ほしい là ほしくない.",
    ],
    warnings: [
      "Hỏi người lạ 'コーヒーがほしいですか' là câu hỏi dịch thô từ tiếng Anh/Việt và nghe rất khiếm nhã trong tiếng Nhật.",
    ],
    relatedArticles: [
      {
        category: "conversation",
        slug: "goi-mon-tai-nha-hang-quan-an",
        title: "Giao tiếp tại nhà hàng: Đặt bàn, gọi món, xin nước uống và yêu cầu tính tiền",
        reason: "Cách diễn đạt mong muốn gọi món tinh tế thay vì dùng たい thô cứng",
      },
      {
        category: "notes",
        slug: "khi-nao-khong-nen-dich-word-by-word",
        title: "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        reason: "Tránh bẫy dịch trực tiếp từ 'muốn' sang tiếng Nhật",
      },
    ],
  },

  // 8. Article 8 (Mới: ないで vs なくて)
  {
    id: "g-naide-nakute",
    slug: "phan-biet-naide-va-nakute",
    categoryId: "grammar",
    title: "Phân biệt 〜ないで và 〜なくて: Hành động đi kèm, lý do hay nhượng bộ?",
    japaneseTitle: "否定の接続「〜ないで」と「〜なくて」の使い分け",
    summary:
      "Phân biệt rạch ròi giữa 'không làm A mà làm B / trạng thái phụ đi kèm' (ないで) và 'vì không A nên B / nối tính từ phủ định' (なくて).",
    level: "N4",
    tags: ["Ngữ pháp", "Phủ định", "ないで", "なくて", "N4"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-nn-1",
        title: "1. V-ないで: Làm hành động B trong trạng thái không làm A",
        content:
          "V-ないで (naide) được dùng khi hai hành động cùng xuất phát từ một chủ thể:\n- Làm B mà không làm A: 朝ご飯を食べないで、学校へ行きました (Tôi đến trường mà không ăn sáng).\n- Dùng trong câu yêu cầu/xin đừng: 忘れないでください (Xin đừng quên).",
        type: "rule",
      },
      {
        id: "sec-nn-2",
        title: "2. V-なくて / A-くなくて: Nêu nguyên nhân, lý do hoặc sự tương phản",
        content:
          "V-なくて (nakute) đóng vai trò như liên từ chỉ lý do hoặc nối các vế câu phủ định:\n- Vì không A nên kết quả B xảy ra: 時間がなくて、朝ご飯を食べられませんでした (Vì không có thời gian nên tôi không thể ăn sáng).\n- Dùng cho tính từ đuôi -i và -na: 高くなくて、おいしいです (Không đắt mà lại ngon).",
        type: "rule",
      },
      {
        id: "sec-nn-3",
        title: "3. Mẹo kiểm tra thay thế cực nhanh",
        content:
          "Hãy tự hỏi: Câu này mang nghĩa 'LÀM MÀ KHÔNG CÓ CÁI ĐÓ' (-> ないで) hay mang nghĩa 'VÌ KHÔNG CÓ NÊN...' (-> なくて)?\n- Đi làm mà không mang ô -> 傘を持たないで会社に行った (ないで).\n- Vì không có tiền nên không mua được ô -> お金がなくて買えなかった (なくて).",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-nn-1",
        japanese: "辞書を見ないで、日本語の新聞を読みました。",
        reading: "じしょをみないで、にほんごのしんぶんをよみました。",
        romaji: "Jisho o minaide, nihongo no shinbun o yomimashita.",
        vietnamese: "Tôi đã đọc báo tiếng Nhật mà không cần tra từ điển.",
        explanation: "Hành động đọc báo được thực hiện kèm điều kiện 'không tra từ điển' -> Dùng ないで.",
        context: "Phương thức thực hiện hành động",
      },
      {
        id: "ex-nn-2",
        japanese: "バスが来なくて、30分も待ちました。",
        reading: "バスがこなくて、さんじゅっぷんもまちました。",
        romaji: "Basu ga konakute, sanjuppun mo machimashita.",
        vietnamese: "Vì xe buýt không tới nên tôi đã phải đợi tận 30 phút.",
        explanation: "Xe buýt không tới là nguyên nhân dẫn đến việc phải đợi lâu -> Dùng なくて.",
        context: "Nêu nguyên nhân lý do",
      },
    ],
    comparisons: {
      title: "Đối chiếu 〜ないで vs 〜なくて",
      items: [
        {
          subject: "V-ないで (Không làm... mà làm...)",
          nuance: "Chỉ trạng thái hoặc hành vi đi kèm; đi được với câu xin đừng (〜ないでください)",
          formula: "V-ない + で + [Hành động khác]",
          example: "砂糖を入れないで飲みます。",
          exampleTranslation: "Tôi uống mà không bỏ đường.",
          caution: "Không dùng để nối tính từ.",
        },
        {
          subject: "V-なくて (Vì không... / Nối tính từ)",
          nuance: "Chỉ nguyên nhân, lý do khách quan; nối 2 mệnh đề tương phản",
          formula: "V-なく / A-くなく + て + [Kết quả]",
          example: "会えなくて、寂しいです。",
          exampleTranslation: "Vì không được gặp bạn nên tôi rất buồn.",
          caution: "Không dùng trong câu cấm đoán yêu cầu (không có 〜なくてください).",
        },
      ],
      summary: "Thần chú: 'Không làm A mà làm B' -> ないで; 'Vì không có A nên B' -> なくて.",
    },
    notes: [
      "Câu 'Cảm ơn vì đã...' khi dùng phủ định luôn đi với なくて: 来てくれなくて -> 来てくださってありがとうございます; nhưng 'Xin lỗi vì không đến được' -> 行けなくてすみません.",
    ],
    warnings: [
      "Không bao giờ tồn tại cấu trúc '〜なくてください'. Muốn xin đừng làm gì bắt buộc phải là '〜ないでください'.",
    ],
    relatedArticles: [
      {
        category: "grammar",
        slug: "phan-biet-kara-va-node",
        title: "Phân biệt から (kara) và ので (node) chỉ nguyên nhân, lý do",
        reason: "So sánh các cách biểu đạt lý do trong tiếng Nhật",
      },
      {
        category: "conversation",
        slug: "xin-loi-va-dap-lai-loi-xin-loi",
        title: "Văn hóa xin lỗi trong tiếng Nhật: Từ Sumimasen, Gomennasai đến Moushiwake arimasen",
        reason: "Cấu trúc xin lỗi vì không làm được điều gì (〜なくてすみません)",
      },
    ],
  },

  // 9. Article 9 (Mới: たことがある)
  {
    id: "g-ta-koto-ga-aru",
    slug: "cau-truc-ta-koto-ga-aru",
    categoryId: "grammar",
    title: "Cấu trúc 〜たことがある: Kể về trải nghiệm trong quá khứ & những bẫy thường gặp",
    japaneseTitle: "経験表現「〜たことがある」の正しい使い方",
    summary:
      "Phân biệt giữa 'kể trải nghiệm trong đời' (〜たことがある) với 'hành động vừa làm trong quá khứ đơn thuần' (V-ました) và cách trả lời câu hỏi kinh nghiệm.",
    level: "N5",
    tags: ["Ngữ pháp", "Trải nghiệm", "Thể Ta", "たことがある", "N5"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-tk-1",
        title: "1. Bản chất: Trải nghiệm tích lũy trong quá khứ",
        content:
          "Cấu trúc V-たことがある diễn tả một sự việc người nói đã từng trải qua ít nhất một lần từ trước đến nay trong cuộc đời (như một tài sản kinh nghiệm cá nhân).",
        type: "rule",
      },
      {
        id: "sec-tk-2",
        title: "2. Bẫy nhầm lẫn giữa V-たことがある và V-ました",
        content:
          "- 'Hôm qua tôi đã ăn sushi' -> Kinou sushi o tabemashita (V-ました: Sự kiện đơn lẻ đã hoàn tất trong quá khứ gần có mốc thời gian rõ ràng).\n- 'Tôi đã từng ăn sushi' -> Sushi o tabeta koto ga arimasu (V-たことがある: Trải nghiệm trong đời, không đi kèm mốc thời gian cụ thể như 'hôm qua, sáng nay').",
        type: "pattern",
      },
      {
        id: "sec-tk-3",
        title: "3. Cách trả lời câu hỏi phủ định 'Chưa từng làm bao giờ'",
        content:
          "Khi được hỏi '〜たことがありますか', nếu chưa từng làm bao giờ, người Nhật thường trả lời:\n- いいえ、一度もありません (Không, chưa một lần nào cả).\n- いいえ、まだありません (Không, tôi vẫn chưa có dịp làm).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-tk-1",
        japanese: "日本へ行ったことがありますか。",
        reading: "にほんへいったことがありますか。",
        romaji: "Nihon e itta koto ga arimasu ka.",
        vietnamese: "Bạn đã từng đi Nhật Bản bao giờ chưa?",
        explanation: "Hỏi về kinh nghiệm đã từng đặt chân đến nước Nhật trong đời hay chưa.",
        context: "Hỏi thăm trải nghiệm",
      },
      {
        id: "ex-tk-2",
        japanese: "富士山に登ったことは一度もありません。",
        reading: "ふじさんにのぼったことはいちどもありません。",
        romaji: "Fujisan ni nobotta koto wa ichido mo arimasen.",
        vietnamese: "Tôi chưa từng leo núi Phú Sĩ một lần nào cả.",
        explanation: "Phủ định hoàn toàn kinh nghiệm bằng 一度もありません.",
        context: "Kể về việc chưa từng trải qua",
      },
    ],
    comparisons: {
      title: "V-たことがある vs V-ました",
      items: [
        {
          subject: "V-たことがある (Đã từng trải qua)",
          nuance: "Nhấn mạnh vào kinh nghiệm sống tích lũy trong cuộc đời",
          formula: "V(thể Ta) + ことがある",
          example: "納豆を食べたことがあります。",
          exampleTranslation: "Tôi đã từng ăn Natto rồi.",
          caution: "Không dùng với các từ chỉ thời gian gần như 'hôm qua', 'vừa nãy'.",
        },
        {
          subject: "V-ました (Đã làm việc gì)",
          nuance: "Chỉ một hành động cụ thể đã kết thúc trong quá khứ",
          formula: "V-ました",
          example: "昨日の夜、納豆を食べました。",
          exampleTranslation: "Tối hôm qua tôi đã ăn Natto.",
          caution: "Gắn liền với mốc thời gian cụ thể của sự việc.",
        },
      ],
      summary: "Nếu có từ 'hôm qua, tuần trước' -> dùng V-ました; nếu nói về vốn sống 'đã từng' -> dùng たことがある.",
    },
    notes: [
      "Có thể thêm phó từ 一度 (ichido - một lần) hoặc 何度も (nandomo - nhiều lần) để làm rõ mức độ: 何度もあります (Đã từng làm nhiều lần rồi).",
    ],
    warnings: [
      "Sai ngữ pháp: '昨日の朝、パンを食べたことがあります' (Sai vì 'sáng hôm qua' là sự kiện cụ thể, không thể coi là trải nghiệm cuộc đời).",
    ],
    relatedArticles: [
      {
        category: "grammar",
        slug: "ban-chat-cau-truc-te-iru",
        title: "Bản chất cấu trúc 〜ている: Hành động tiếp diễn, trạng thái kết quả & thói quen",
        reason: "Phân biệt các dạng biểu đạt thời gian và trạng thái động từ",
      },
      {
        category: "conversation",
        slug: "chao-hoi-va-mo-dau-cuoc-tro-chuyen",
        title: "Chào hỏi và mở đầu cuộc trò chuyện tự nhiên chuẩn người bản xứ",
        reason: "Mẫu câu hỏi kinh nghiệm để bắt chuyện với người mới quen",
      },
    ],
  },

  // 10. Article 10 (Mới: So sánh と, ば, たら, なら)
  {
    id: "g-to-ba-tara-nara",
    slug: "so-sanh-to-ba-tara-nara",
    categoryId: "grammar",
    title: "So sánh 4 mẫu câu điều kiện と, ば, たら, なら ở mức độ nhập môn",
    japaneseTitle: "初級条件表現「と・ば・たら・なら」の使い分け",
    summary:
      "Bản đồ phân biệt 4 từ chỉ điều kiện giả định 'Nếu / Hễ mà': Tự nhiên hiển nhiên (と), Giả định chung (ば), Sau khi xong / Thực tế đời sống (たら), Tiếp nhận chủ đề đối phương (なら).",
    level: "N4",
    tags: ["Ngữ pháp", "Câu điều kiện", "と", "ば", "たら", "なら", "N4"],
    readTimeMinutes: 8,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-tb-1",
        title: "1. Điều kiện hiển nhiên: と (Hễ mà... là...)",
        content:
          "Dùng cho các quy luật tự nhiên, sự thật hiển nhiên hoặc chỉ dẫn đường đi máy móc:\n- Mùa xuân đến thì hoa nở: 春になると、花が咲きます.\n- Rẽ phải ở góc kia là thấy ngân hàng: あの角を右へ曲がると、銀行があります.\nĐặc điểm: Vế sau KHÔNG ĐƯỢC LÀ ý chí, mệnh lệnh, rủ rê của con người.",
        type: "rule",
      },
      {
        id: "sec-tb-2",
        title: "2. Điều kiện thực dụng nhất: たら (Nếu... / Sau khi...)",
        content:
          "Là mẫu câu điều kiện linh hoạt và phổ biến nhất trong khẩu ngữ đời sống:\n- Vế sau có thể thoải mái đi cùng mệnh lệnh, rủ rê, ý chí.\n- Mang nghĩa 'sau khi việc A xong thì làm việc B': 家に帰ったら、すぐシャワーを浴びます (Về đến nhà là tôi đi tắm ngay).",
        type: "rule",
      },
      {
        id: "sec-tb-3",
        title: "3. Điều kiện giả định: ば & Tiếp nhận chủ đề: なら",
        content:
          "- ば: Điều kiện giả định logic mang tính lý thuyết ('Nếu có tiền thì tốt nhỉ' - 安ければ買います).\n- なら: Tiếp nhận chủ đề mà đối phương vừa nhắc tới để đưa ra lời khuyên hoặc gợi ý ('Nếu là đi du lịch thì tôi khuyên nên đi Kyoto' - 旅行なら、京都がいいですよ).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-tb-1",
        japanese: "ボタンを押すと、お釣りが出ます。",
        reading: "ボタンをおすと、おつりがでます。",
        romaji: "Botan o osu to, otsuri ga demasu.",
        vietnamese: "Hễ bấm nút này là tiền thừa sẽ tự động nhả ra.",
        explanation: "Quy luật vận hành máy móc tự động -> Bắt buộc dùng と.",
        context: "Máy bán hàng tự động",
      },
      {
        id: "ex-tb-2",
        japanese: "明日雨が降ったら、出かけません。",
        reading: "あしたあめがふったら、でかけません。",
        romaji: "Ashita ame ga futtara, dekakemasen.",
        vietnamese: "Ngày mai nếu trời mưa thì tôi sẽ không đi ra ngoài.",
        explanation: "Giả định thực tế đời sống thường ngày -> Dùng たら.",
        context: "Kế hoạch ngày mai",
      },
      {
        id: "ex-tb-3",
        japanese: "日本へ行くなら、秋が一番おすすめですよ。",
        reading: "にほんへいくなら、あきがいちばんおすすめですよ。",
        romaji: "Nihon e iku nara, aki ga ichiban osusume desu yo.",
        vietnamese: "Nếu bạn định đi Nhật thì mùa thu là thời điểm đáng đi nhất đấy.",
        explanation: "Đón lấy chủ đề 'đi Nhật' của bạn để đưa ra lời khuyên -> Dùng なら.",
        context: "Đưa ra lời khuyên",
      },
    ],
    comparisons: {
      title: "Bảng tóm tắt nhanh 4 mẫu câu điều kiện",
      items: [
        {
          subject: "と (Tự nhiên / Máy móc)",
          nuance: "Hễ A là tất yếu xảy ra B",
          formula: "V-từ điển + と",
          example: "冬になると寒くなります。",
          exampleTranslation: "Hễ mùa đông tới là trời trở lạnh.",
          caution: "Vế sau cấm tuyệt đối mệnh lệnh, rủ rê.",
        },
        {
          subject: "たら (Linh hoạt nhất)",
          nuance: "Nếu A / Sau khi A xong thì làm B",
          formula: "V-thể Ta + ら",
          example: "着いたら電話してください。",
          exampleTranslation: "Đến nơi thì hãy gọi điện cho tôi nhé.",
          caution: "Hay dùng nhất trong giao tiếp hàng ngày.",
        },
      ],
      summary: "Quy tắc an toàn cho người mới: Trong giao tiếp nói thông thường, nếu phân vân thì dùng たら an toàn tới 80%.",
    },
    notes: [
      "Không nên cố gắng học thuộc lòng mọi sắc thái phức tạp của câu điều kiện ở trình độ sơ cấp; hãy nắm chắc ranh giới: 'Tự nhiên/máy móc' = と, 'Đưa lời khuyên theo chủ đề' = なら, còn lại = たら.",
    ],
    warnings: [
      "Tuyệt đối không dùng と trong câu 'Nếu rảnh thì cùng đi ăn nhé' (sai vì có rủ rê ở vế sau). Phải dùng たら: 暇だったら、ご飯に行きましょう.",
    ],
    relatedArticles: [
      {
        category: "grammar",
        slug: "phan-biet-kara-va-node",
        title: "Phân biệt から (kara) và ので (node) chỉ nguyên nhân, lý do",
        reason: "Phân biệt nguyên nhân thực tế với điều kiện giả định",
      },
      {
        category: "notes",
        slug: "khi-nao-khong-nen-dich-word-by-word",
        title: "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        reason: "Cẩn trọng khi dịch từ 'nếu' từ tiếng Việt sang tiếng Nhật",
      },
    ],
  },
];
