import { HandbookArticle } from "../types";

export const conversationArticles: HandbookArticle[] = [
  // 1. Article 1 (Gốc)
  {
    id: "c-tu-choi-kheo-leo",
    slug: "cach-tu-choi-kheo-leo-trong-tieng-nhat",
    categoryId: "conversation",
    title: "Nghệ thuật từ chối khéo léo (Kushon Kotoba) tránh làm mất lòng đối phương",
    japaneseTitle: "角を立てない断り方のコツ",
    summary:
      "Tuyệt chiêu từ chối lời mời hoặc yêu cầu trong văn hóa Nhật Bản: Sử dụng từ đệm đệm lời (Kushon Kotoba), ngập ngừng bỏ lửng câu và đề xuất dịp khác.",
    level: "ALL",
    tags: ["Hội thoại", "Giao tiếp", "Kushon Kotoba", "Văn hóa", "Từ chối khéo", "N5", "N4"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-tc-1",
        title: "1. Tại sao người Nhật 'sợ' từ chối thẳng thừng?",
        content:
          "Trong văn hóa Nhật, sự hòa hợp tập thể (Wa - 和) và giữ thể diện cho người đối diện là tối thượng. Việc nói 'Không được' (ダメです, できません) hoặc 'Tôi không đi' (行きません) bị xem là thô lỗ, tạo cảm giác cắt đứt quan hệ.",
        type: "text",
      },
      {
        id: "sec-tc-2",
        title: "2. Quy trình 3 bước từ chối tinh tế chuẩn bản xứ",
        content:
          "Bước 1: Đệm lời cảm kích / tiếc nuối (せっかく誘っていただいたのに / あいにくですが...)\nBước 2: Nêu lý do khó xử và dùng từ 'ちょっと...' (Bỏ lửng câu với đuôi ...ですが/なんです)\nBước 3: Hẹn vào một dịp khác để duy trì mối quan hệ (また今度誘ってください).",
        type: "rule",
      },
      {
        id: "sec-tc-3",
        title: "3. Các mẫu câu đệm lời vàng (Kushon Kotoba)",
        content:
          "Bảng các cụm từ đệm giúp giảm xóc trước khi nói lời từ chối:",
        type: "table",
        tableData: {
          headers: ["Cụm từ đệm", "Cách đọc", "Ý nghĩa", "Ngữ cảnh"],
          rows: [
            ["せっかくですが", "せっかくですが", "Hiếm khi có dịp tốt thế này nhưng mà...", "Từ chối lời mời đi ăn, đi chơi"],
            ["あいにくですが", "あいにくですが", "Thật không may là / Tiếc là...", "Từ chối trong công việc, cuộc hẹn"],
            ["申し訳ありませんが", "もうしわけありませんが", "Tôi vô cùng xin lỗi nhưng...", "Từ chối yêu cầu, nhờ vả"],
            ["その日はちょっと...", "そのひはちょっと...", "Hôm đó thì tôi hơi kẹt...", "Bỏ lửng câu từ chối lịch thiệp"],
          ],
        },
      },
    ],
    examples: [
      {
        id: "ex-tc-1",
        japanese: "A: 今日の夜、一緒に飲みに行きませんか。\nB: せっかく誘っていただいたんですが、今日はちょっと用事があって...",
        reading: "A: きょうのよる、いっしょにのみにいきませんか。\nB: せっかくさそっていただいたんですが、きょうはちょっとようじがあって...",
        romaji: "A: Kyou no yoru, issho ni nomi ni ikimasen ka.\nB: Sekkaku sasotte itadaita n desu ga, kyou wa chotto youji ga atte...",
        vietnamese: "A: Tối nay đi uống cùng mọi người không?\nB: Anh đã có lòng rủ thế này thật quý, nhưng tối nay em lại có chút việc bận mất rồi...",
        explanation: "Cách từ chối hoàn hảo: Cảm ơn trước -> Nêu lý do -> Bỏ lửng với đuôi '...あって' thể hiện sự day dứt.",
        context: "Hội thoại bạn bè, đồng nghiệp",
      },
      {
        id: "ex-tc-2",
        japanese: "またぜひ誘ってください！",
        reading: "またぜひさそってください！",
        romaji: "Mata zehi sasotte kudasai!",
        vietnamese: "Lần tới nhất định lại rủ em nữa nhé!",
        explanation: "Lời kết ấm áp khẳng định người nói vẫn rất trân trọng tình cảm của đối phương.",
        context: "Lời kết sau khi từ chối",
      },
    ],
    comparisons: {
      title: "Đối chiếu cách từ chối trực tiếp vs từ chối khéo léo",
      items: [
        {
          subject: "Từ chối trực tiếp (Cần tránh)",
          nuance: "Nói thẳng kết luận 'Không làm được / Không đi'",
          formula: "行きたくないです / できません / 嫌です",
          example: "いいえ、行けません。",
          exampleTranslation: "Không, tôi không đi được.",
          caution: "Gây cảm giác xa cách, lạnh lùng và thiếu tôn trọng đối phương.",
        },
        {
          subject: "Từ chối khéo léo (Chuẩn mực)",
          nuance: "Bày tỏ lòng biết ơn, tiếc nuối và để ngỏ sự thông cảm",
          formula: "[Cảm kích] + [ちょっと...] + [Hẹn dịp sau]",
          example: "行きたいのはやまやまなんですが、都合がつかなくて...",
          exampleTranslation: "Em muốn đi lắm nhưng hôm đó lại không thu xếp được...",
          caution: "Nhớ dùng ánh mắt và ngữ điệu tiếc nuối chân thành.",
        },
      ],
      summary: "Trong tiếng Nhật, chữ 'ちょっと' (chotto) kéo dài đuôi chính là tín hiệu ngầm hiểu của lời từ chối.",
    },
    notes: [
      "Khi nghe người Nhật nói 'それはちょっと難しいですね' (Điều đó thì hơi khó nhỉ...), 90% nghĩa là họ đang từ chối dứt khoát, chứ không phải đang tìm giải pháp khắc phục.",
    ],
    warnings: [
      "Không bao giờ dùng từ 'ダメ' (Dame) để từ chối người lớn tuổi, khách hàng hoặc cấp trên. Từ này chỉ dùng cho cha mẹ nhắc con nhỏ hoặc bạn bè cực kỳ thân thiết.",
    ],
    relatedArticles: [
      {
        category: "conversation",
        slug: "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        title: "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        reason: "Nâng cao độ lịch thiệp trong giao tiếp công sở",
      },
      {
        category: "notes",
        slug: "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        title: "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        reason: "Tránh bẫy dịch thẳng 'Không' từ tiếng Việt sang いいえ",
      },
    ],
  },

  // 2. Article 2 (Gốc)
  {
    id: "c-kinh-ngu-keigo",
    slug: "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
    categoryId: "conversation",
    title: "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
    japaneseTitle: "初級者のための敬語の基本原則",
    summary:
      "Phá tan nỗi sợ Kính ngữ bằng nguyên lý cốt lõi: Nâng đối phương lên (Tôn kính ngữ) và Hạ bản thân mình xuống (Khiêm nhường ngữ), kèm bảng động từ biến đổi đặc biệt.",
    level: "N4",
    tags: ["Kính ngữ", "Keigo", "Hội thoại", "Tôn kính ngữ", "Khiêm nhường ngữ", "N4"],
    readTimeMinutes: 7,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-kn-1",
        title: "1. Nguyên lý 2 trục của Kính ngữ Nhật Bản",
        content:
          "Kính ngữ không phải là làm cho câu văn phức tạp hơn một cách vô nghĩa, mà là thiết lập trật tự tôn trọng dựa trên 2 trục:\n- Trục 1: Tôn kính ngữ (Sonkeigo - 尊敬語): Nâng hành động của đối phương (khách hàng, sếp, thầy cô) lên cao.\n- Trục 2: Khiêm nhường ngữ (Kenjougo - 謙譲語): Hạ hành động của bản thân hoặc người thuộc phe mình (công ty mình, gia đình mình) xuống thấp.",
        type: "rule",
      },
      {
        id: "sec-kn-2",
        title: "2. Bảng động từ biến đổi đặc biệt (Bắt buộc thuộc lòng)",
        content:
          "Đây là nhóm động từ có từ vựng riêng biệt thay thế hoàn toàn cho động từ thông thường:",
        type: "table",
        tableData: {
          headers: ["Động từ thường", "Tôn kính ngữ (Đối phương làm)", "Khiêm nhường ngữ (Tôi làm)"],
          rows: [
            ["行く / 来る", "いらっしゃる / おいでになる", "参る (まいります)"],
            ["いる", "いらっしゃる", "おる (おります)"],
            ["食べる / 飲む", "召し上がる (めしあがります)", "いただく (いただきます)"],
            ["言う", "おっしゃる (おっしゃいます)", "申す (もうします) / 申し上げる"],
            ["見る", "ご覧になる (ごらんになります)", "拝見する (はいけんします)"],
            ["知っている", "ご存知です (ごぞんじです)", "存じております (ぞんじております)"],
            ["する", "なさる (なさいます)", "いたす (いたします)"],
          ],
        },
      },
      {
        id: "sec-kn-3",
        title: "3. Công thức biến đổi tổng quát cho động từ còn lại",
        content:
          "- Tôn kính ngữ: お + V(bỏ ます) + になります (ví dụ: お読みになります)\n- Khiêm nhường ngữ: お + V(bỏ ます) + します / いたします (ví dụ: お手伝いします / お持ちします)",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-kn-1",
        japanese: "先生は何時にいらっしゃいますか。",
        reading: "せんせいはなんじにいらっしゃいますか。",
        romaji: "Sensei wa nanji ni irasshaimasu ka.",
        vietnamese: "Thầy giáo mấy giờ sẽ đến ạ?",
        explanation: "Hành động 'đến' là của thầy giáo -> Dùng Tôn kính ngữ 'いらっしゃいます'.",
        context: "Hỏi thăm lịch trình người trên",
      },
      {
        id: "ex-kn-2",
        japanese: "私が資料をお持ちします。",
        reading: "わたしがしりょうをおもちします。",
        romaji: "Watashi ga shiryou o omochi shimasu.",
        vietnamese: "Tôi xin phép được cầm tài liệu giúp ngài ạ.",
        explanation: "Hành động 'cầm' là của tôi giúp người trên -> Dùng Khiêm nhường ngữ 'お持ちします'.",
        context: "Đề nghị giúp đỡ cấp trên/khách hàng",
      },
    ],
    comparisons: {
      title: "So sánh lỗi sai kinh điển: Nhầm lẫn Tôn kính ngữ và Khiêm nhường ngữ",
      items: [
        {
          subject: "Dùng nhầm Tôn kính ngữ cho bản thân (LỖI NẶNG)",
          nuance: "Tự nâng bản thân mình lên ngang hàng hoặc cao hơn người nghe",
          formula: "Lỗi: 私は召し上がります (SAI HOÀNG TOÀN)",
          example: "× 私が言いました -> 私がおっしゃいました (SAI)",
          exampleTranslation: "Lỗi này biến người nói thành kẻ kiêu ngạo lố bịch.",
          caution: "Tuyệt đối không bao giờ dùng Sonkeigo khi chủ ngữ là わたし (Tôi).",
        },
        {
          subject: "Dùng đúng Khiêm nhường ngữ cho bản thân",
          nuance: "Hạ mình xuống để bày tỏ lòng kính trọng sâu sắc",
          formula: "Chuẩn: 私はいただきます / 私が申しました",
          example: "○ 田中と申します。",
          exampleTranslation: "Tôi tên là Tanaka ạ.",
          caution: "Luôn kiểm tra xem ai là người thực hiện hành động trước khi chọn từ.",
        },
      ],
      summary: "Thần chú bất hủ: 'Người khác làm -> Tôn kính; Bản thân làm -> Khiêm nhường'.",
    },
    notes: [
      "Trong giao tiếp nội bộ công ty với khách hàng bên ngoài, sếp của bạn vẫn là 'người phe mình' (uchi), vì vậy khi nói về sếp với khách hàng, BẮT BUỘC dùng Khiêm nhường ngữ (ví dụ: 部長の田中は外出しております).",
    ],
    warnings: [
      "Đừng quá áp lực phải nói kính ngữ hoàn hảo 100% ngay từ đầu. Dùng thể lịch sự です/ます chuẩn xác, ngữ điệu lễ phép và thái độ chân thành đã chiếm 80% thiện cảm của người Nhật.",
    ],
    relatedArticles: [
      {
        category: "conversation",
        slug: "cach-tu-choi-kheo-leo-trong-tieng-nhat",
        title: "Nghệ thuật từ chối khéo léo (Kushon Kotoba) tránh làm mất lòng đối phương",
        reason: "Kết hợp kính ngữ với nghệ thuật đệm lời",
      },
      {
        category: "notes",
        slug: "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        title: "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        reason: "Tránh các lỗi xưng hô và câu chào cửa miệng bị dịch sai nghĩa",
      },
    ],
  },

  // 3. Article 3 (Mới: Chào hỏi và mở đầu cuộc trò chuyện)
  {
    id: "c-chao-hoi-mo-dau",
    slug: "chao-hoi-va-mo-dau-cuoc-tro-chuyen",
    categoryId: "conversation",
    title: "Chào hỏi và mở đầu cuộc trò chuyện tự nhiên chuẩn người bản xứ",
    japaneseTitle: "日常の挨拶と自然な会話のきっかけ作り",
    summary:
      "Vượt qua những câu chào sách giáo khoa cứng nhắc: Cách dùng câu chuyện thời tiết (Aisatsu), mào đầu phá vỡ sự im lặng và duy trì phản xạ lắng nghe (Aizuchi).",
    level: "ALL",
    tags: ["Hội thoại", "Chào hỏi", "Mở đầu", "Aizuchi", "N5"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-ch-1",
        title: "1. Câu chuyện thời tiết: 'Chìa khóa vàng' mở đầu mọi câu chuyện",
        content:
          "Người Nhật hiếm khi mở đầu bằng việc hỏi chuyện riêng tư (lương bổng, hôn nhân). 90% các cuộc trò chuyện tự nhiên đều bắt đầu từ thời tiết:\n- 今日はいい天気ですね (Hôm nay trời đẹp quá nhỉ).\n- 今日はちょっと蒸し暑いですね (Hôm nay trời oi bức một chút nhỉ).\nCâu này không cần tranh luận đúng sai, chỉ nhằm tạo sự đồng thuận ban đầu (共感 - kyoukan).",
        type: "rule",
      },
      {
        id: "sec-ch-2",
        title: "2. Nghệ thuật đệm lời Aizuchi (相槌) để đối phương hào hứng nói",
        content:
          "Nếu người đối diện nói mà bạn chỉ im lặng, họ sẽ nghĩ bạn không hiểu hoặc khó chịu. Hãy liên tục đệm lời:\n- そうですね (Đúng vậy nhỉ / Ra là vậy)\n- なるほど (Thì ra là thế - dùng với bạn bè/ngang hàng)\n- 本当ですか (Thật vậy sao?)\n- ええ / はい (Vâng / Dạ).",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-ch-1",
        japanese: "A: 今日は冷え込みますね。\nB: 本当ですね。午後から雪が降るらしいですよ。",
        reading: "A: きょうはひえこみますね。\nB: ほんとうですね。ごごからゆきがふるらしいですよ。",
        romaji: "A: Kyou wa hiekomimasu ne.\nB: Hontou desu ne. Gogo kara yuki ga furu rashii desu yo.",
        vietnamese: "A: Hôm nay trời trở lạnh buốt quá nhỉ.\nB: Thật vậy anh nhỉ. Nghe nói từ chiều nay tuyết sẽ rơi đấy.",
        explanation: "Mở đầu bằng cảm nhận thời tiết tự nhiên và tiếp lời đồng thuận.",
        context: "Gặp đồng nghiệp buổi sáng",
      },
      {
        id: "ex-ch-2",
        japanese: "お疲れ様です！最近、お忙しいですか。",
        reading: "おつかれさまです！さいきん、おいそがしいですか。",
        romaji: "Otsukaresama desu! Saikin, oisogashii desu ka.",
        vietnamese: "Chào anh/chị nhé! Dạo gần đây anh có bận rộn nhiều không?",
        explanation: "Mở đầu tự nhiên thay cho câu hỏi sách giáo khoa 'Ogenki desu ka'.",
        context: "Bắt chuyện với đồng nghiệp cùng cơ quan",
      },
    ],
    comparisons: {
      title: "Chào hỏi Sách giáo khoa vs Chào hỏi Thực tế",
      items: [
        {
          subject: "Sách giáo khoa sơ cấp",
          nuance: "Lặp lại máy móc, dễ gây cảm giác xa cách nếu gặp mỗi ngày",
          formula: "お元気ですか？ (Ogenki desu ka)",
          example: "はい、元気です。",
          exampleTranslation: "Vâng, tôi khỏe.",
          caution: "Người Nhật chỉ dùng khi lâu ngày không gặp nhau (vài tháng/năm).",
        },
        {
          subject: "Thực tế người bản xứ",
          nuance: "Dùng lời chào theo buổi + nhận xét thời tiết / công việc",
          formula: "おはようございます + [Thời tiết] + ね",
          example: "おはようございます。今日も暑いですね！",
          exampleTranslation: "Chào buổi sáng. Hôm nay cũng nóng bức quá nhỉ!",
          caution: "Tạo cảm giác thân thiện ấm áp tức thì.",
        },
      ],
      summary: "Gặp hàng ngày: Chào theo buổi + nhận xét thời tiết. Đừng hỏi 'Ogenki desu ka' mỗi sáng.",
    },
    notes: [
      "Không dùng 'なるほどですね' với sếp hoặc khách hàng vì đây là lỗi ngữ pháp khẩu ngữ lai căng (Kansei keigo) mà giới trẻ hay mắc.",
    ],
    warnings: [
      "Không bao giờ hỏi tuổi tác, tình trạng hôn nhân, tiền lương hay cân nặng khi mới bắt chuyện với người Nhật.",
    ],
    relatedArticles: [
      {
        category: "conversation",
        slug: "tu-gioi-thieu-ban-than-jikoshoukai",
        title: "Nghệ thuật tự giới thiệu bản thân (Jikoshoukai) ấn tượng và đúng mực",
        reason: "Bước tiếp theo sau khi chào hỏi mở đầu",
      },
      {
        category: "notes",
        slug: "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        title: "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        reason: "Lỗi dùng Ogenki desu ka",
      },
    ],
  },

  // 4. Article 4 (Mới: Tự giới thiệu bản thân Jikoshoukai)
  {
    id: "c-tu-gioi-thieu-ban-than",
    slug: "tu-gioi-thieu-ban-than-jikoshoukai",
    categoryId: "conversation",
    title: "Nghệ thuật tự giới thiệu bản thân (Jikoshoukai) ấn tượng và đúng mực",
    japaneseTitle: "印象に残る自然な自己紹介（初対面）",
    summary:
      "Khung xương 4 phần cho bài tự giới thiệu bản thân chuẩn mực: Lời chào mở đầu, Thông tin cơ bản, Điểm nhấn sở thích/mục tiêu, và Lời kết cúi chào lịch thiệp.",
    level: "ALL",
    tags: ["Hội thoại", "Tự giới thiệu", "Jikoshoukai", "Giao tiếp", "N5"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-js-1",
        title: "1. Khung 4 bước của một bài Jikoshoukai hoàn chỉnh",
        content:
          "Bước 1: Chào mở đầu (初めまして - Hajimemashite - Rất hân hạnh được gặp bạn lần đầu).\nBước 2: Tên, quê quán, xuất thân ([Tên] と申します / と言います).\nBước 3: Chia sẻ ngắn gọn về sở thích hoặc lý do học tiếng Nhật.\nBước 4: Lời kết trang trọng (どうぞよろしくお願いいたします - Douzo yoroshiku onegai itashimasu).",
        type: "rule",
      },
      {
        id: "sec-js-2",
        title: "2. Phân biệt cấp độ lịch sự khi nói tên",
        content:
          "- Thân mật (bạn bè): [Tên] です (Nam desu).\n- Lịch sự phổ thông (lớp học): [Tên] と言います (Nam to iimasu).\n- Trang trọng / Công sở / Phỏng vấn: [Tên] と申します (Nam to moushimasu - Khiêm nhường ngữ).",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-js-1",
        japanese: "初めまして。ベトナムのハノイから来ましたナムと申します。趣味は写真とサッカーです。これからどうぞよろしくお願いいたします。",
        reading: "はじめまして。ベトナムのハノイからきましたナムともうします。しゅみはしゃしんとサッカーです。これからどうぞよろしくおねがいいたします。",
        romaji: "Hajimemashite. Betonamu no Hanoi kara kimashita Namu to moushimasu. Shumi wa shashin to sakkaa desu. Korekara douzo yoroshiku onegai itashimasu.",
        vietnamese: "Rất hân hạnh được gặp mọi người. Tôi tên là Nam, đến từ Hà Nội, Việt Nam. Sở thích của tôi là chụp ảnh và đá bóng. Từ nay rất mong nhận được sự giúp đỡ của mọi người ạ.",
        explanation: "Bài giới thiệu mẫu chuẩn mực, đầy đủ thông tin, thanh lịch và ấm áp.",
        context: "Ngày đầu ra mắt lớp học / công ty mới",
      },
    ],
    comparisons: {
      title: "Cách xưng tên: 〜と言います vs 〜と申します",
      items: [
        {
          subject: "〜と言います (To iimasu)",
          nuance: "Lịch sự thông thường, phù hợp trường học, câu lạc bộ",
          formula: "[Tên] と言います",
          example: "リンと言います。",
          exampleTranslation: "Tôi tên là Linh.",
          caution: "Dùng thoải mái với bạn bè cùng trang lứa.",
        },
        {
          subject: "〜と申します (To moushimasu)",
          nuance: "Khiêm nhường ngữ trang trọng, dùng cho phỏng vấn xin việc, gặp đối tác",
          formula: "[Tên] と申します",
          example: "グエンと申します。",
          exampleTranslation: "Tôi tên là Nguyen ạ.",
          caution: "Gây ấn tượng chuyên nghiệp cao.",
        },
      ],
      summary: "Giao tiếp hàng ngày -> と言います; Đi làm, phỏng vấn -> と申します.",
    },
    notes: [
      "Khi nói câu 'どうぞよろしくお願いいたします', hãy cúi đầu (Ojigi) một góc khoảng 30-45 độ sau khi dứt lời để thể hiện sự chân thành.",
    ],
    warnings: [
      "Không bao giờ thêm hậu tố '-san' vào tên của chính mình khi giới thiệu (Ví dụ: × 私はナムさんです là sai nghiêm trọng).",
    ],
    relatedArticles: [
      {
        category: "conversation",
        slug: "chao-hoi-va-mo-dau-cuoc-tro-chuyen",
        title: "Chào hỏi và mở đầu cuộc trò chuyện tự nhiên chuẩn người bản xứ",
        reason: "Mở đầu trước khi giới thiệu",
      },
      {
        category: "conversation",
        slug: "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        title: "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        reason: "Tìm hiểu sâu hơn về động từ 申す (mousu)",
      },
    ],
  },

  // 5. Article 5 (Mới: Cảm ơn và đáp lại lời cảm ơn)
  {
    id: "c-cam-on-va-dap-lai",
    slug: "cam-on-va-dap-lai-loi-cam-on",
    categoryId: "conversation",
    title: "Các sắc thái cảm ơn và cách đáp lại lời cảm ơn không bị gượng gạo",
    japaneseTitle: "感謝の表現とその自然な返答",
    summary:
      "Khám phá các bậc thang nói lời cảm ơn (từ Domo, Arigatou đến Arigatou gozaimashita) và bí quyết đáp lời chuẩn mực: Khi nào dùng Dou itashimashite, khi nào dùng Ieie.",
    level: "N5",
    tags: ["Hội thoại", "Cảm ơn", "Giao tiếp", "Dou itashimashite", "N5"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-co-1",
        title: "1. Các mức độ cảm ơn trong đời sống",
        content:
          "- どうも (Doumo): Cảm ơn nhẹ khi nhận đồ lặt vặt (nhặt giúp đồ rơi, mở cửa thang máy).\n- ありがとう (Arigatou): Thân mật giữa bạn bè, người thân.\n- ありがとうございます (Arigatou gozaimasu): Lịch sự chuẩn mực cho hành động đang hoặc vừa diễn ra.\n- ありがとうございました (Arigatou gozaimashita): Cảm ơn cho cả một quá trình/sự giúp đỡ đã kết thúc trong quá khứ.",
        type: "rule",
      },
      {
        id: "sec-co-2",
        title: "2. Cách đáp lại lời cảm ơn: Có nên dùng 'どういたしまして'?",
        content:
          "Sách giáo khoa luôn dạy 'どういたしまして' (Dou itashimashite - Không có chi). Nhưng ngoài đời, người Nhật hiếm khi dùng từ này với cấp trên vì nó mang hàm ý 'Tôi vừa làm một điều to tát cho bạn'. Thay vào đó, người bản xứ thường dùng:\n- いえいえ、とんでもないです (Không có chi đâu ạ, có gì to tát đâu ạ).\n- お役に立ててよかったです (Em rất vui vì đã giúp ích được cho anh/chị).\n- こちらこそ (Chính tôi mới là người phải cảm ơn ạ).",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-co-1",
        japanese: "A: 今日は手伝ってくれて、本当にありがとうございました！\nB: いえいえ、こちらこそ楽しかったです！",
        reading: "A: きょうはてつだってくれて、ほんとうにありがとうございました！\nB: いえいえ、こちらこそたのしかったです！",
        romaji: "A: Kyou wa tetsudatte kurete, hontou ni arigatou gozaimashita!\nB: Ieie, kochira koso tanoshikatta desu!",
        vietnamese: "A: Hôm nay cảm ơn cậu thật nhiều vì đã giúp đỡ tớ nhé!\nB: Không có gì đâu, chính tớ cũng thấy rất vui mà!",
        explanation: "Cách đáp lại bằng こちらこそ (chính tôi mới là người phải cảm ơn) rất khiêm nhường và ấm áp.",
        context: "Sau khi giúp đỡ bạn bè",
      },
    ],
    comparisons: {
      title: "Đáp lại lời cảm ơn: どういたしまして vs とんでもないです",
      items: [
        {
          subject: "どういたしまして (Dou itashimashite)",
          nuance: "Không có chi (Dành cho bạn bè, cấp dưới hoặc người nước ngoài)",
          formula: "どういたしまして",
          example: "友達: ありがとう！ -> 自分: どういたしまして！",
          exampleTranslation: "Bạn: Cảm ơn nhé! -> Mình: Không có chi!",
          caution: "Tránh dùng khi sếp hoặc khách hàng cảm ơn bạn.",
        },
        {
          subject: "とんでもないです (Tondemonai desu)",
          nuance: "Khiêm nhường, không dám nhận công to",
          formula: "いえいえ、とんでもないです",
          example: "先輩: 助かったよ。 -> 自分: とんでもないです！",
          exampleTranslation: "Tiền bối: Cảm ơn em cứu anh bàn thua. -> Mình: Dạ không có gì to tát đâu ạ!",
          caution: "Cực kỳ được lòng cấp trên trong công sở.",
        },
      ],
      summary: "Với bạn bè -> いえいえ / どういたしまして; Với cấp trên/khách hàng -> とんでもないです / こちらこそ.",
    },
    notes: [
      "Trong giao tiếp tiếng Nhật, từ 'すみません' (Sumimasen) cũng được dùng để cảm ơn khi ai đó làm phiền lòng vì giúp đỡ mình (ví dụ nhường ghế xe buýt).",
    ],
    warnings: [
      "Đừng nói 'どういたしまして' với khách hàng khi họ nói cảm ơn vì dịch vụ của bạn.",
    ],
    relatedArticles: [
      {
        category: "conversation",
        slug: "xin-loi-va-dap-lai-loi-xin-loi",
        title: "Văn hóa xin lỗi trong tiếng Nhật: Từ Sumimasen, Gomennasai đến Moushiwake arimasen",
        reason: "Hiểu sâu mối liên hệ giữa lời cảm ơn và Sumimasen",
      },
      {
        category: "conversation",
        slug: "nho-giup-do-va-yeu-cau-lich-su",
        title: "Cách nhờ vả và đưa ra yêu cầu lịch sự: Từ 〜てください đến 〜ていただけませんか",
        reason: "Cảm ơn sau khi được người khác giúp đỡ",
      },
    ],
  },

  // 6. Article 6 (Mới: Xin lỗi và cách đáp lại)
  {
    id: "c-xin-loi-va-dap-lai",
    slug: "xin-loi-va-dap-lai-loi-xin-loi",
    categoryId: "conversation",
    title: "Văn hóa xin lỗi trong tiếng Nhật: Từ Sumimasen, Gomennasai đến Moushiwake arimasen",
    japaneseTitle: "謝罪の表現とその受け止め方",
    summary:
      "Phân biệt 4 cấp độ tạ lỗi trong văn hóa Nhật: Sumimasen (giao tiếp đời sống), Gomennasai (riêng tư thân mật), Moushiwake arimasen (công sở trang trọng) và cách đáp lời tha thứ.",
    level: "ALL",
    tags: ["Hội thoại", "Xin lỗi", "Văn hóa", "Sumimasen", "N5", "N4"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-xl-1",
        title: "1. Bốn cấp độ xin lỗi trong tiếng Nhật",
        content:
          "- ごめん / ごめんなさい (Gomen / Gomennasai): Dành cho gia đình, người yêu, bạn bè thân thiết khi trót làm sai chuyện nhỏ. TUYỆT ĐỐI KHÔNG DÙNG VỚI SẾP.\n- すみません (Sumimasen): Từ vạn năng trong đời sống hàng ngày (va quẹt nhẹ, xin lỗi vì làm phiền).\n- 申し訳ありません (Moushiwake arimasen): Xin lỗi trang trọng trong kinh doanh, với khách hàng, cấp trên khi xảy ra sự cố nghiêm trọng.\n- 失礼いたしました (Shitsurei itashimashita): Xin lỗi vì đã thất lễ / làm phiền.",
        type: "rule",
      },
      {
        id: "sec-xl-2",
        title: "2. Cách đáp lại lời xin lỗi của người khác",
        content:
          "Khi ai đó xin lỗi bạn về một sơ suất nhỏ, đừng im lặng. Hãy xua tay nhẹ và nói:\n- いいえ、大丈夫ですよ (Không sao đâu ạ, tôi ổn mà).\n- お気になさらないでください (Xin đừng bận tâm ạ - lịch sự).\n- こちらこそ、すみませんでした (Chính tôi cũng có lỗi sơ suất).",
        type: "pattern",
      },
    ],
    examples: [
      {
        id: "ex-xl-1",
        japanese: "連絡が遅くなってしまい、大変申し訳ありませんでした。",
        reading: "れんらくがおそくなってしまい、たいへんもうしわけありませんでした。",
        romaji: "Renraku ga osoku natte shimai, taihen moushiwake arimasen deshita.",
        vietnamese: "Em xin chân thành xin lỗi vì đã liên lạc muộn trễ ạ.",
        explanation: "Cách xin lỗi cấp trên hoặc đối tác khi chậm trễ hồi đáp.",
        context: "Xin lỗi trong công việc",
      },
      {
        id: "ex-xl-2",
        japanese: "A: 足を踏んでしまって、すみません！\nB: あ、大丈夫ですよ。お気になさらずに。",
        reading: "A: あしをふんでしまって、すみません！\nB: あ、だいじょうぶですよ。おきになさらずに。",
        romaji: "A: Ashi o funde shimatte, sumimasen!\nB: A, daijoubu desu yo. Oki ni nasarazu ni.",
        vietnamese: "A: Tôi lỡ giẫm vào chân bạn, thật xin lỗi!\nB: À, không sao đâu bạn. Xin đừng bận tâm.",
        explanation: "Tình huống va chạm nhẹ trên tàu xe và phản hồi lịch sự.",
        context: "Tình huống công cộng",
      },
    ],
    comparisons: {
      title: "Đối chiếu Gomennasai vs Sumimasen vs Moushiwake arimasen",
      items: [
        {
          subject: "ごめんなさい (Gomennasai)",
          nuance: "Trẻ con, bạn bè thân thiết, thành thật hối lỗi chuyện riêng",
          formula: "ごめん / ごめんなさい",
          example: "待たせてごめんね！",
          exampleTranslation: "Để cậu đợi lâu, cho tớ xin lỗi nhé!",
          caution: "Không dùng trong công sở hay môi trường trang trọng.",
        },
        {
          subject: "申し訳ありません (Moushiwake arimasen)",
          nuance: "Chuyên nghiệp, thừa nhận sai sót nghiêm trọng không có lý do bao biện",
          formula: "大変申し訳ございません",
          example: "ご迷惑をおかけして申し訳ありません。",
          exampleTranslation: "Tôi vô cùng xin lỗi vì đã gây phiền toái cho ngài.",
          caution: "Tiêu chuẩn vàng trong quan hệ kinh doanh tại Nhật.",
        },
      ],
      summary: "Với bạn bè -> ごめん; Đời thường -> すみません; Công sở/Khách hàng -> 申し訳ありません.",
    },
    notes: [
      "Người Nhật xin lỗi không nhất thiết vì họ nhận sai 100%, mà là để xoa dịu bầu không khí căng thẳng và bày tỏ sự tiếc nuối vì sự hòa hợp chung.",
    ],
    warnings: [
      "Tuyệt đối không dùng 'ごめんなさい' khi sếp mắng trong giờ làm việc. Hãy dùng '申し訳ありませんでした'.",
    ],
    relatedArticles: [
      {
        category: "conversation",
        slug: "cam-on-va-dap-lai-loi-cam-on",
        title: "Các sắc thái cảm ơn và cách đáp lại lời cảm ơn không bị gượng gạo",
        reason: "Sự tương đồng về mặt tâm lý xã hội giữa cảm ơn và xin lỗi",
      },
      {
        category: "notes",
        slug: "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        title: "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        reason: "Bẫy hiểu nhầm khi dùng từ Đại trượng phu (大丈夫)",
      },
    ],
  },

  // 7. Article 7 (Mới: Nhờ giúp đỡ / yêu cầu lịch sự)
  {
    id: "c-nho-giup-do-lich-su",
    slug: "nho-giup-do-va-yeu-cau-lich-su",
    categoryId: "conversation",
    title: "Cách nhờ vả và đưa ra yêu cầu lịch sự: Từ 〜てください đến 〜ていただけませんか",
    japaneseTitle: "丁寧な依頼とお願いのフレーズ",
    summary:
      "Nâng cấp câu nhờ vả từ thể てください thông thường lên các mẫu câu tinh tế: 〜てもらえますか, 〜ていただけませんか, và cụm đệm lời お手数をおかけしますが.",
    level: "N4",
    tags: ["Hội thoại", "Nhờ vả", "Yêu cầu", "てください", "Kính ngữ", "N4"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-ng-1",
        title: "1. Thang đo mức độ lịch sự khi nhờ vả",
        content:
          "Trong tiếng Nhật, mức độ gián tiếp của câu càng cao thì câu nói càng lịch sự:\n1. V-て: Thân mật bạn bè (Chỉ đường cho tớ với - 教えて).\n2. V-てください: Lịch sự thông thường (Xin hãy chỉ cho tôi - 教えてください).\n3. V-てもらえますか / もらえない?: Nhờ vả bạn bè/ngang hàng lịch sự (Bạn chỉ giúp tôi được không?)\n4. V-ていただけませんか: Rất lịch sự (Xin ngài vui lòng chỉ bảo giúp tôi có được không ạ?)\n5. V-ていただけますと幸いです: Trang trọng trong email thương mại.",
        type: "table",
        tableData: {
          headers: ["Mẫu câu nhờ vả", "Đối tượng sử dụng", "Mức độ lịch sự"],
          rows: [
            ["V-て", "Bạn bè thân thiết, gia đình", "★☆☆☆☆ (Thân mật)"],
            ["V-てください", "Người lạ, nhân viên dịch vụ, người cùng vị thế", "★★☆☆☆ (Thông thường)"],
            ["V-てもらえますか", "Đồng nghiệp cùng trang lứa, người quen", "★★★☆☆ (Lịch sự)"],
            ["V-ていただけませんか", "Cấp trên, thầy cô giáo, khách hàng", "★★★★☆ (Rất lịch sự)"],
            ["V-ていただけますと幸いです", "Email công sở, đối tác kinh doanh", "★★★★★ (Tuyệt đối)"],
          ],
        },
      },
      {
        id: "sec-ng-2",
        title: "2. Cụm từ đệm giảm xóc trước khi nhờ vả",
        content:
          "Đừng bao giờ nhảy bổ vào nhờ vả ngay. Hãy lót câu bằng một trong các cụm từ sau:\n- お忙しいところ申し訳ありませんが (Xin lỗi vì làm phiền lúc anh đang bận rộn nhưng...)\n- ちょっとお願いがあるんですが (Em có chút việc muốn nhờ vả anh nhưng...)\n- お手数をおかけしますが (Làm phiền anh mất công sức nhưng...).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-ng-1",
        japanese: "すみません、この漢字の読み方を教えていただけませんか。",
        reading: "すみません、このかんじのよみかたをおしえていただけませんか。",
        romaji: "Sumimasen, kono kanji no yomikata o oshiete itadakemasen ka.",
        vietnamese: "Xin lỗi ạ, thầy/anh có thể vui lòng chỉ giúp em cách đọc chữ Hán này được không ạ?",
        explanation: "Cách nhờ vả giáo viên hoặc người trên một cách lễ phép chuẩn mực.",
        context: "Hỏi bài thầy cô",
      },
      {
        id: "ex-ng-2",
        japanese: "お忙しいところ恐れ入りますが、書類を確認していただけますでしょうか。",
        reading: "おいそがしいところおそれいりますが、しょるいをかくにんしていただけますでしょうか。",
        romaji: "Oisogashii tokoro osoreirimasu ga, shorui o kakunin shite itadakemasu deshou ka.",
        vietnamese: "Xin thứ lỗi vì làm phiền trong lúc anh đang bận, anh có thể vui lòng kiểm tra giúp em tập tài liệu này được không ạ?",
        explanation: "Mẫu câu nhờ cấp trên kiểm tra báo cáo trong văn phòng.",
        context: "Nhờ sếp duyệt tài liệu",
      },
    ],
    comparisons: {
      title: "V-てください vs V-ていただけませんか",
      items: [
        {
          subject: "V-てください (Hãy làm...)",
          nuance: "Mang tính chỉ thị, yêu cầu người khác làm theo mong muốn của mình",
          formula: "V-て + ください",
          example: "ここに名前を書いてください。",
          exampleTranslation: "Xin hãy viết tên vào đây.",
          caution: "Không nên dùng khi nhờ cấp trên làm việc gì cho mình.",
        },
        {
          subject: "V-ていただけませんか (Có thể làm giúp tôi được không?)",
          nuance: "Để quyền quyết định cho đối phương, khiêm tốn xin nhận ân huệ",
          formula: "V-て + いただけませんか",
          example: "ここを見ていただけませんか。",
          exampleTranslation: "Ngài có thể xem giúp tôi chỗ này được không ạ?",
          caution: "Mẫu câu nhờ vả lý tưởng nhất cho học viên sơ cấp.",
        },
      ],
      summary: "Với cấp trên: Thay '〜てください' bằng '〜ていただけませんか'.",
    },
    notes: [
      "Nói '〜てください' với cấp trên rất dễ bị xem là bạn đang ra lệnh cho họ.",
    ],
    warnings: [
      "Tuyệt đối tránh câu: '先生、この作文を直してください' (Nghe giống ra lệnh). Phải sửa thành '直していただけませんか'.",
    ],
    relatedArticles: [
      {
        category: "conversation",
        slug: "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        title: "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        reason: "Gốc rễ khiêm nhường ngữ いただく",
      },
      {
        category: "conversation",
        slug: "cach-tu-choi-kheo-leo-trong-tieng-nhat",
        title: "Nghệ thuật từ chối khéo léo (Kushon Kotoba) tránh làm mất lòng đối phương",
        reason: "Cụm từ đệm giảm xóc trong giao tiếp",
      },
    ],
  },

  // 8. Article 8 (Mới: Hỏi và chỉ đường)
  {
    id: "c-hoi-va-chi-duong",
    slug: "hoi-va-chi-duong-trong-thuc-te",
    categoryId: "conversation",
    title: "Hỏi và chỉ đường thực tế tại Nhật: Cấu trúc câu và từ vựng định hướng",
    japaneseTitle: "道案内と道を聞く実践会話",
    summary:
      "Bộ cẩm nang sinh tồn khi bị lạc đường tại Nhật: Cách mở lời với người qua đường hoặc cảnh sát ở Koban, các mẫu câu định hướng và từ vựng vị trí.",
    level: "N5",
    tags: ["Hội thoại", "Chỉ đường", "Đi lại", "Koban", "N5"],
    readTimeMinutes: 5,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-hd-1",
        title: "1. Mẫu câu hỏi đường kinh điển",
        content:
          "Khi muốn hỏi đường đến một địa điểm X, bạn dùng cấu trúc:\n- すみません、[Địa điểm] はどこですか (Xin lỗi, [Địa điểm] ở đâu ạ?)\n- すみません、[Địa điểm] に行きたいんですが、どう行けばいいですか (Xin lỗi, tôi muốn đến [Địa điểm], tôi nên đi như thế nào ạ?)\n- この近くにコンビニはありますか (Gần đây có konbini nào không ạ?).",
        type: "rule",
      },
      {
        id: "sec-hd-2",
        title: "2. Từ vựng chỉ dẫn phương hướng cần nhận diện ngay bằng tai",
        content:
          "- まっすぐ行く (Massugu iku): Đi thẳng\n- 右/左へ曲がる (Migi / Hidari e magaru): Rẽ phải / Rẽ trái\n- あの角 (Ano kado): Góc ngã tư đằng kia\n- 信号 (Shingou): Đèn giao thông\n- 渡る (Wataru): Băng qua đường / cầu\n- 手前 (Temae): Ở phía trước mặt (chưa tới nơi).",
        type: "table",
        tableData: {
          headers: ["Cụm từ chỉ hướng", "Cách đọc", "Ý nghĩa"],
          rows: [
            ["まっすぐ行ってください", "まっすぐいってください", "Xin hãy đi thẳng tiếp"],
            ["右へ曲がってください", "みぎへまがってください", "Xin hãy rẽ sang bên phải"],
            ["信号を渡ってください", "しんごうをわたってください", "Xin hãy băng qua đèn đỏ"],
            ["突き当たり", "つきあたり", "Ngõ cụt / Kịch đường"],
          ],
        },
      },
    ],
    examples: [
      {
        id: "ex-hd-1",
        japanese: "すみません、駅へ行きたいんですが、どの道を歩けばいいですか。",
        reading: "すみません、えきへいきたいんですが、どのみちをあるけばいいですか。",
        romaji: "Sumimasen, eki e ikitai n desu ga, dono michi o arukeba ii desu ka.",
        vietnamese: "Xin lỗi ạ, tôi muốn ra nhà ga, tôi nên đi theo con đường nào ạ?",
        explanation: "Mở đầu lịch sự khi hỏi đường người qua đường.",
        context: "Hỏi đường người dân địa phương",
      },
      {
        id: "ex-hd-2",
        japanese: "あの交差点を左に曲がると、右手に郵便局が見えますよ。",
        reading: "あのこうさてんをひだりにまがると、みぎてにゆうびんきょくがみえますよ。",
        romaji: "Ano kousaten o hidari ni magaru to, migite ni yuubinkyoku ga miemasu yo.",
        vietnamese: "Hễ rẽ trái ở ngã tư đằng kia thì bạn sẽ nhìn thấy bưu điện ở phía tay phải đấy.",
        explanation: "Câu chỉ dẫn đường đi sử dụng điều kiện と và tự động từ 見える.",
        context: "Người bản xứ chỉ đường",
      },
    ],
    comparisons: {
      title: "Hỏi đường trực tiếp vs Hỏi đường lịch sự tự nhiên",
      items: [
        {
          subject: "Hỏi trực tiếp (Cộc lốc)",
          nuance: "Chỉ hỏi cộc lốc địa điểm ở đâu",
          formula: "駅はどこ？",
          example: "駅はどこですか。",
          exampleTranslation: "Ga ở đâu?",
          caution: "Nghe hơi đường đột nếu không có lời đệm đầu.",
        },
        {
          subject: "Hỏi tự nhiên (Chuẩn bản xứ)",
          nuance: "Đệm từ xin lỗi và nêu mong muốn trước khi hỏi",
          formula: "すみません、〜へ行きたいんですが...",
          example: "すみません、この近くに薬局はありますか。",
          exampleTranslation: "Xin lỗi anh, quanh đây có hiệu thuốc nào không ạ?",
          caution: "Người nghe sẽ rất sẵn lòng nhiệt tình giúp đỡ.",
        },
      ],
      summary: "Luôn bắt đầu bằng 'すみません' + '〜行きたいんですが' trước khi hỏi.",
    },
    notes: [
      "Tại Nhật, các đồn cảnh sát khu phố (交番 - Koban) luôn có bản đồ chi tiết khu vực và các chú cảnh sát rất nhiệt tình chỉ đường.",
    ],
    warnings: [
      "Tránh hỏi người đang cắm cúi chạy vội vào ga vào giờ cao điểm đi làm (8:00 - 8:45 sáng) vì họ đang vội bắt tàu sát nút.",
    ],
    relatedArticles: [
      {
        category: "vocabulary",
        slug: "phan-biet-kiku-va-kiku-nghe",
        title: "Phân biệt 聞く (kiku - nghe/hỏi) và 聴く (kiku - lắng nghe có chủ đích)",
        reason: "Cụm từ 道を聞く (Hỏi đường)",
      },
      {
        category: "grammar",
        slug: "so-sanh-to-ba-tara-nara",
        title: "So sánh 4 mẫu câu điều kiện と, ば, たら, なら ở mức độ nhập môn",
        reason: "Sử dụng câu điều kiện と khi chỉ đường máy móc",
      },
    ],
  },

  // 9. Article 9 (Mới: Mua hàng / hỏi giá / thanh toán)
  {
    id: "c-mua-hang-va-thanh-toan",
    slug: "mua-hang-hoi-gia-va-thanh-toan",
    categoryId: "conversation",
    title: "Mẫu câu mua sắm, hỏi giá, thử đồ và thanh toán tại cửa hàng & konbini",
    japaneseTitle: "ショッピングと会計の実践表現",
    summary:
      "Bí kíp giao tiếp tự tin khi đi mua sắm: Hỏi size quần áo, xin phép thử đồ, từ chối túi ni lông tại konbini, và chọn phương thức thanh toán thẻ hay tiền mặt.",
    level: "N5",
    tags: ["Hội thoại", "Mua sắm", "Thanh toán", "Konbini", "N5"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-mh-1",
        title: "1. Thử đồ và hỏi kích cỡ tại cửa hàng quần áo",
        content:
          "- Xin phép thử đồ: これ、試着してもいいですか (Tôi mặc thử chiếc này có được không ạ?)\n- Hỏi size khác: これのMサイズはありますか (Chiếc này có size M không ạ?)\n- Hỏi màu khác: 違う色はありますか (Có màu khác không ạ?).",
        type: "rule",
      },
      {
        id: "sec-mh-2",
        title: "2. Hội thoại 'kinh điển' tại quầy thu ngân Konbini",
        content:
          "Khi đứng trước quầy tính tiền tiện lợi Konbini, nhân viên thường hỏi 3 câu quen thuộc:\n1. Điểm thưởng: ポイントカードはお持ちですか (Quý khách có mang thẻ tích điểm không? -> Không có: ないです).\n2. Hâm nóng cơm hộp: 温めますか (Có hâm nóng không? -> Có: お願いします / Không: 大丈夫です).\n3. Túi nilon: 袋はご利用ですか (Quý khách có dùng túi không? -> Cần: お願いします / Không cần: 大丈夫です).",
        type: "pattern",
      },
      {
        id: "sec-mh-3",
        title: "3. Chọn phương thức thanh toán",
        content:
          "- Tiền mặt: 現金で (Genkin de)\n- Thẻ tín dụng: クレジットカードで (Kurejitto kaado de)\n- Thẻ giao thông (Suica/Pasmo): 交通系ICで (Koutsuukei aishii de).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-mh-1",
        japanese: "店員: 袋はお付けしますか。\n客: あ、大丈夫です。カバンに入りますので。",
        reading: "てんいん: ふくろはおつけしますか。\nきゃく: あ、だいじょうぶです。カバンにはいりますので。",
        romaji: "Ten'in: Fukuro wa otsuke shimasu ka.\nKyaku: A, daijoubu desu. Kaban ni hairimasu node.",
        vietnamese: "Nhân viên: Quý khách có lấy túi không ạ?\nKhách: À, tôi không cần đâu ạ. Bỏ vào balo của tôi là vừa rồi.",
        explanation: "Cách từ chối túi nilon lịch sự ở konbini bằng 大丈夫です.",
        context: "Thanh toán ở cửa hàng tiện lợi",
      },
      {
        id: "ex-mh-2",
        japanese: "支払いはクレジットカードでお願いします。",
        reading: "しはらいはクレジットカードでおねがいします。",
        romaji: "Shiharai wa kurejitto kaado de onegai shimasu.",
        vietnamese: "Tôi xin phép thanh toán bằng thẻ tín dụng ạ.",
        explanation: "Xác nhận phương thức thanh toán tại quầy tính tiền.",
        context: "Thanh toán thẻ",
      },
    ],
    comparisons: {
      title: "Chỉ muốn xem thử vs Quyết định mua",
      items: [
        {
          subject: "Chỉ muốn xem thử (Từ chối nhân viên nhiệt tình)",
          nuance: "Lịch sự thông báo bạn chỉ đang dạo quanh ngắm đồ",
          formula: "見ているだけです (Mite iru dake desu)",
          example: "あ、見ているだけなので大丈夫です。",
          exampleTranslation: "Dạ, tôi chỉ đang xem thử thôi nên không sao đâu ạ.",
          caution: "Nhân viên sẽ để bạn thoải mái ngắm đồ một mình.",
        },
        {
          subject: "Quyết định chốt mua món đồ",
          nuance: "Thông báo với nhân viên bạn lấy món đồ này",
          formula: "これ、ください / これにします",
          example: "これを1つください。",
          exampleTranslation: "Cho tôi lấy 1 cái này nhé.",
          caution: "Dùng これにします khi chọn trong số nhiều lựa chọn.",
        },
      ],
      summary: "Chỉ xem đồ -> 見ているだけです; Chốt mua -> これにします / これをください.",
    },
    notes: [
      "Tại quầy thu ngân Nhật Bản, luôn đặt tiền hoặc thẻ vào chiếc khay nhỏ (Trate / Cash tray), không đưa trực tiếp vào tay nhân viên.",
    ],
    warnings: [
      "Đừng nói 'いいえ' cụt lủn khi nhân viên hỏi có cần túi hay hóa đơn không; hãy nói '大丈夫です' kèm nụ cười nhẹ.",
    ],
    relatedArticles: [
      {
        category: "notes",
        slug: "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        title: "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        reason: "Bẫy từ vựng Đại trượng phu (大丈夫) tại Konbini",
      },
      {
        category: "conversation",
        slug: "goi-mon-tai-nha-hang-quan-an",
        title: "Giao tiếp tại nhà hàng: Đặt bàn, gọi món, xin nước uống và yêu cầu tính tiền",
        reason: "Các mẫu câu thanh toán trong ăn uống",
      },
    ],
  },

  // 10. Article 10 (Mới: Gọi món tại nhà hàng / quán ăn)
  {
    id: "c-goi-mon-nha-hang",
    slug: "goi-mon-tai-nha-hang-quan-an",
    categoryId: "conversation",
    title: "Giao tiếp tại nhà hàng: Đặt bàn, gọi món, xin nước uống và yêu cầu tính tiền",
    japaneseTitle: "飲食店での注文と接客会話の完全ガイド",
    summary:
      "Tự tin bước vào bất kỳ quán ăn nào tại Nhật: Báo số lượng khách, gọi phục vụ (Sumimasen), hỏi món đặc trưng, xin thêm nước và thanh toán.",
    level: "N5",
    tags: ["Hội thoại", "Nhà hàng", "Gọi món", "Ăn uống", "N5"],
    readTimeMinutes: 6,
    updatedAt: "2026-10-06",
    sections: [
      {
        id: "sec-gm-1",
        title: "1. Bước 1: Khi bước vào quán & Báo số lượng người",
        content:
          "Nhân viên chào đón: いらっしゃいませ！何名様ですか (Kính chào quý khách! Đi mấy người ạ?).\nBạn giơ ngón tay hoặc trả lời:\n- 1 người: 1人です (Hitori desu)\n- 2 người: 2人です (Futari desu)\n- 3 người: 3人です (Sannin desu).",
        type: "rule",
      },
      {
        id: "sec-gm-2",
        title: "2. Bước 2: Gọi phục vụ và gọi món",
        content:
          "- Bấm chuông hoặc giơ tay nói to rõ: すみません！ (Sumimasen! - Em ơi!)\n- Chỉ vào menu: これをお願いします (Kore o onegai shimasu - Cho tôi món này ạ)\n- Hỏi món bán chạy: おすすめは何ですか (Món gợi ý của quán là gì ạ?)\n- Xin nước lọc miễn phí: お冷をお願いします (Ohia o onegai shimasu - Cho tôi xin ly nước mát).",
        type: "pattern",
      },
      {
        id: "sec-gm-3",
        title: "3. Bước 3: Tính tiền (Kaikei)",
        content:
          "Sau khi ăn xong, bạn cầm phiếu tính tiền đặt ở đầu bàn ra quầy và nói:\n- お会計をお願いします (Okaikei o onegai shimasu - Cho tôi thanh toán ạ).\n- Muốn chia đôi tiền (với bạn bè): 別々でお願いします (Betsubetsu de onegai shimasu - Tính riêng từng người nhé).",
        type: "rule",
      },
    ],
    examples: [
      {
        id: "ex-gm-1",
        japanese: "客: すみません、注文をお願いします。\n店員: はい、ご注文をお伺いします。\n客: このラーメンを1つと、餃子を1つください。",
        reading: "きゃく: すみません、ちゅうもんをおねがいします。\nてんいん: はい、ごちゅうもんをおうかがいします。\nきゃく: このラーメンをひとつと、ぎょうざをひとつください。",
        romaji: "Kyaku: Sumimasen, chuumon o onegai shimasu.\nTen'in: Hai, gochuumon o oukagaimasu.\nKyaku: Kono raamen o hitotsu to, gyouza o hitotsu kudasai.",
        vietnamese: "Khách: Em ơi cho anh gọi món với.\nNhân viên: Vâng, em xin nghe món của quý khách ạ.\nKhách: Cho anh 1 bát mì ramen này và 1 đĩa há cảo gyoza nhé.",
        explanation: "Cuộc đối thoại gọi món kinh điển tại bất kỳ quán ăn Nhật Bản nào.",
        context: "Gọi món tại quán ramen",
      },
      {
        id: "ex-gm-2",
        japanese: "ごちそうさまでした！とてもおいしかったです。",
        reading: "ごちそうさまでした！とてもおいしかったです。",
        romaji: "Gochisousama deshita! Totemo oishikatta desu.",
        vietnamese: "Cảm ơn vì bữa ăn ngon miệng ạ! Món ăn rất ngon.",
        explanation: "Lời chào cảm ơn ấm áp dành cho đầu bếp khi bước ra khỏi quán.",
        context: "Rời khỏi nhà hàng",
      },
    ],
    comparisons: {
      title: "Nước uống: お水 vs お冷",
      items: [
        {
          subject: "お冷 (Ohia - Chữ LÃNH)",
          nuance: "Từ chuyên dùng trong ngành ẩm thực để chỉ cốc nước lọc đá miễn phí",
          formula: "お冷 (おひや) をお願いします",
          example: "お冷のおかわりをください。",
          exampleTranslation: "Cho tôi xin thêm ly nước đá.",
          caution: "Rất chuẩn phong cách người bản xứ.",
        },
        {
          subject: "お水 (Omizu - Chữ THỦY)",
          nuance: "Nước nói chung trong đời sống",
          formula: "お水をください",
          example: "お水を一杯ください。",
          exampleTranslation: "Cho tôi một cốc nước.",
          caution: "Vẫn hoàn toàn dễ hiểu nhưng お冷 nghe chuyên nghiệp hơn.",
        },
      ],
      summary: "Ở quán ăn, xin nước lọc đá hãy gọi là 'お冷' (Ohia). Ăn xong hãy nói 'ごちそうさまでした'.",
    },
    notes: [
      "Tại Nhật, KHÔNG CÓ VĂN HÓA TIỀN TIP (Tip/Bo). Bạn chỉ cần trả đúng số tiền trên hóa đơn và nói lời cảm ơn chân thành.",
    ],
    warnings: [
      "Không gõ đũa vào bát hoặc cắm thẳng đứng đôi đũa vào bát cơm (Tsukitate-bashi), vì đây là điều cấm kỵ giống nghi thức tang lễ Phật giáo tại Nhật.",
    ],
    relatedArticles: [
      {
        category: "conversation",
        slug: "mua-hang-hoi-gia-va-thanh-toan",
        title: "Mẫu câu mua sắm, hỏi giá, thử đồ và thanh toán tại cửa hàng & konbini",
        reason: "Quy trình thanh toán tiền tệ",
      },
      {
        category: "conversation",
        slug: "cam-on-va-dap-lai-loi-cam-on",
        title: "Các sắc thái cảm ơn và cách đáp lại lời cảm ơn không bị gượng gạo",
        reason: "Lời cảm ơn sau bữa ăn Gochisousama deshita",
      },
    ],
  },
];
