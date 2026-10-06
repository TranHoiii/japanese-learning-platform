import { HandbookArticle } from "../types";

export const conversationArticles: HandbookArticle[] = [
  {
    "id": "c-tu-choi-kheo-leo",
    "slug": "cach-tu-choi-kheo-leo-trong-tieng-nhat",
    "categoryId": "conversation",
    "title": "Nghệ thuật từ chối khéo léo (Kushon Kotoba) tránh làm mất lòng đối phương",
    "japaneseTitle": "角を立てない断り方のコツ",
    "summary": "Tuyệt chiêu từ chối lời mời hoặc yêu cầu trong văn hóa Nhật Bản: Sử dụng từ đệm đệm lời (Kushon Kotoba), ngập ngừng bỏ lửng câu và đề xuất dịp khác.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Giao tiếp",
      "Kushon Kotoba",
      "Văn hóa",
      "Từ chối khéo",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-tc-1",
        "title": "1. Tại sao người Nhật 'sợ' từ chối thẳng thừng?",
        "content": "Trong văn hóa Nhật, sự hòa hợp tập thể (Wa - 和) và giữ thể diện cho người đối diện là tối thượng. Việc nói 'Không được' (ダメです, できません) hoặc 'Tôi không đi' (行きません) bị xem là thô lỗ, tạo cảm giác cắt đứt quan hệ.",
        "type": "text"
      },
      {
        "id": "sec-tc-2",
        "title": "2. Quy trình 3 bước từ chối tinh tế chuẩn bản xứ",
        "content": "Bước 1: Đệm lời cảm kích / tiếc nuối (せっかく誘っていただいたのに / あいにくですが...)\nBước 2: Nêu lý do khó xử và dùng từ 'ちょっと...' (Bỏ lửng câu với đuôi ...ですが/なんです)\nBước 3: Hẹn vào một dịp khác để duy trì mối quan hệ (また今度誘ってください).",
        "type": "rule"
      },
      {
        "id": "sec-tc-3",
        "title": "3. Các mẫu câu đệm lời vàng (Kushon Kotoba)",
        "content": "Bảng các cụm từ đệm giúp giảm xóc trước khi nói lời từ chối:",
        "type": "table",
        "tableData": {
          "headers": [
            "Cụm từ đệm",
            "Cách đọc",
            "Ý nghĩa",
            "Ngữ cảnh"
          ],
          "rows": [
            [
              "せっかくですが",
              "せっかくですが",
              "Hiếm khi có dịp tốt thế này nhưng mà...",
              "Từ chối lời mời đi ăn, đi chơi"
            ],
            [
              "あいにくですが",
              "あいにくですが",
              "Thật không may là / Tiếc là...",
              "Từ chối trong công việc, cuộc hẹn"
            ],
            [
              "申し訳ありませんが",
              "もうしわけありませんが",
              "Tôi vô cùng xin lỗi nhưng...",
              "Từ chối yêu cầu, nhờ vả"
            ],
            [
              "その日はちょっと...",
              "そのひはちょっと...",
              "Hôm đó thì tôi hơi kẹt...",
              "Bỏ lửng câu từ chối lịch thiệp"
            ]
          ]
        }
      }
    ],
    "examples": [
      {
        "id": "ex-tc-1",
        "japanese": "A: 今日の夜、一緒に飲みに行きませんか。\nB: せっかく誘っていただいたんですが、今日はちょっと用事があって...",
        "reading": "A: きょうのよる、いっしょにのみにいきませんか。\nB: せっかくさそっていただいたんですが、きょうはちょっとようじがあって...",
        "romaji": "A: Kyou no yoru, issho ni nomi ni ikimasen ka.\nB: Sekkaku sasotte itadaita n desu ga, kyou wa chotto youji ga atte...",
        "vietnamese": "A: Tối nay đi uống cùng mọi người không?\nB: Anh đã có lòng rủ thế này thật quý, nhưng tối nay em lại có chút việc bận mất rồi...",
        "explanation": "Cách từ chối hoàn hảo: Cảm ơn trước -> Nêu lý do -> Bỏ lửng với đuôi '...あって' thể hiện sự day dứt.",
        "context": "Hội thoại bạn bè, đồng nghiệp"
      },
      {
        "id": "ex-tc-2",
        "japanese": "またぜひ誘ってください！",
        "reading": "またぜひさそってください！",
        "romaji": "Mata zehi sasotte kudasai!",
        "vietnamese": "Lần tới nhất định lại rủ em nữa nhé!",
        "explanation": "Lời kết ấm áp khẳng định người nói vẫn rất trân trọng tình cảm của đối phương.",
        "context": "Lời kết sau khi từ chối"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu cách từ chối trực tiếp vs từ chối khéo léo",
      "items": [
        {
          "subject": "Từ chối trực tiếp (Cần tránh)",
          "nuance": "Nói thẳng kết luận 'Không làm được / Không đi'",
          "formula": "行きたくないです / できません / 嫌です",
          "example": "いいえ、行けません。",
          "exampleTranslation": "Không, tôi không đi được.",
          "caution": "Gây cảm giác xa cách, lạnh lùng và thiếu tôn trọng đối phương."
        },
        {
          "subject": "Từ chối khéo léo (Chuẩn mực)",
          "nuance": "Bày tỏ lòng biết ơn, tiếc nuối và để ngỏ sự thông cảm",
          "formula": "[Cảm kích] + [ちょっと...] + [Hẹn dịp sau]",
          "example": "行きたいのはやまやまなんですが、都合がつかなくて...",
          "exampleTranslation": "Em muốn đi lắm nhưng hôm đó lại không thu xếp được...",
          "caution": "Nhớ dùng ánh mắt và ngữ điệu tiếc nuối chân thành."
        }
      ],
      "summary": "Trong tiếng Nhật, chữ 'ちょっと' (chotto) kéo dài đuôi chính là tín hiệu ngầm hiểu của lời từ chối."
    },
    "notes": [
      "Khi nghe người Nhật nói 'それはちょっと難しいですね' (Điều đó thì hơi khó nhỉ...), 90% nghĩa là họ đang từ chối dứt khoát, chứ không phải đang tìm giải pháp khắc phục."
    ],
    "warnings": [
      "Không bao giờ dùng từ 'ダメ' (Dame) để từ chối người lớn tuổi, khách hàng hoặc cấp trên. Từ này chỉ dùng cho cha mẹ nhắc con nhỏ hoặc bạn bè cực kỳ thân thiết."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        "title": "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        "reason": "Nâng cao độ lịch thiệp trong giao tiếp công sở"
      },
      {
        "category": "notes",
        "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        "reason": "Tránh bẫy dịch thẳng 'Không' từ tiếng Việt sang いいえ"
      }
    ]
  },
  {
    "id": "c-kinh-ngu-keigo",
    "slug": "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
    "categoryId": "conversation",
    "title": "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
    "japaneseTitle": "初級者のための敬語の基本原則",
    "summary": "Phá tan nỗi sợ Kính ngữ bằng nguyên lý cốt lõi: Nâng đối phương lên (Tôn kính ngữ) và Hạ bản thân mình xuống (Khiêm nhường ngữ), kèm bảng động từ biến đổi đặc biệt.",
    "level": "N4",
    "tags": [
      "Kính ngữ",
      "Keigo",
      "Hội thoại",
      "Tôn kính ngữ",
      "Khiêm nhường ngữ",
      "N4"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-kn-1",
        "title": "1. Nguyên lý 2 trục của Kính ngữ Nhật Bản",
        "content": "Kính ngữ không phải là làm cho câu văn phức tạp hơn một cách vô nghĩa, mà là thiết lập trật tự tôn trọng dựa trên 2 trục:\n- Trục 1: Tôn kính ngữ (Sonkeigo - 尊敬語): Nâng hành động của đối phương (khách hàng, sếp, thầy cô) lên cao.\n- Trục 2: Khiêm nhường ngữ (Kenjougo - 謙譲語): Hạ hành động của bản thân hoặc người thuộc phe mình (công ty mình, gia đình mình) xuống thấp.",
        "type": "rule"
      },
      {
        "id": "sec-kn-2",
        "title": "2. Bảng động từ biến đổi đặc biệt (Bắt buộc thuộc lòng)",
        "content": "Đây là nhóm động từ có từ vựng riêng biệt thay thế hoàn toàn cho động từ thông thường:",
        "type": "table",
        "tableData": {
          "headers": [
            "Động từ thường",
            "Tôn kính ngữ (Đối phương làm)",
            "Khiêm nhường ngữ (Tôi làm)"
          ],
          "rows": [
            [
              "行く / 来る",
              "いらっしゃる / おいでになる",
              "参る (まいります)"
            ],
            [
              "いる",
              "いらっしゃる",
              "おる (おります)"
            ],
            [
              "食べる / 飲む",
              "召し上がる (めしあがります)",
              "いただく (いただきます)"
            ],
            [
              "言う",
              "おっしゃる (おっしゃいます)",
              "申す (もうします) / 申し上げる"
            ],
            [
              "見る",
              "ご覧になる (ごらんになります)",
              "拝見する (はいけんします)"
            ],
            [
              "知っている",
              "ご存知です (ごぞんじです)",
              "存じております (ぞんじております)"
            ],
            [
              "する",
              "なさる (なさいます)",
              "いたす (いたします)"
            ]
          ]
        }
      },
      {
        "id": "sec-kn-3",
        "title": "3. Công thức biến đổi tổng quát cho động từ còn lại",
        "content": "- Tôn kính ngữ: お + V(bỏ ます) + になります (ví dụ: お読みになります)\n- Khiêm nhường ngữ: お + V(bỏ ます) + します / いたします (ví dụ: お手伝いします / お持ちします)",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-kn-1",
        "japanese": "先生は何時にいらっしゃいますか。",
        "reading": "せんせいはなんじにいらっしゃいますか。",
        "romaji": "Sensei wa nanji ni irasshaimasu ka.",
        "vietnamese": "Thầy giáo mấy giờ sẽ đến ạ?",
        "explanation": "Hành động 'đến' là của thầy giáo -> Dùng Tôn kính ngữ 'いらっしゃいます'.",
        "context": "Hỏi thăm lịch trình người trên"
      },
      {
        "id": "ex-kn-2",
        "japanese": "私が資料をお持ちします。",
        "reading": "わたしがしりょうをおもちします。",
        "romaji": "Watashi ga shiryou o omochi shimasu.",
        "vietnamese": "Tôi xin phép được cầm tài liệu giúp ngài ạ.",
        "explanation": "Hành động 'cầm' là của tôi giúp người trên -> Dùng Khiêm nhường ngữ 'お持ちします'.",
        "context": "Đề nghị giúp đỡ cấp trên/khách hàng"
      }
    ],
    "comparisons": {
      "title": "So sánh lỗi sai kinh điển: Nhầm lẫn Tôn kính ngữ và Khiêm nhường ngữ",
      "items": [
        {
          "subject": "Dùng nhầm Tôn kính ngữ cho bản thân (LỖI NẶNG)",
          "nuance": "Tự nâng bản thân mình lên ngang hàng hoặc cao hơn người nghe",
          "formula": "Lỗi: 私は召し上がります (SAI HOÀNG TOÀN)",
          "example": "× 私が言いました -> 私がおっしゃいました (SAI)",
          "exampleTranslation": "Lỗi này biến người nói thành kẻ kiêu ngạo lố bịch.",
          "caution": "Tuyệt đối không bao giờ dùng Sonkeigo khi chủ ngữ là わたし (Tôi)."
        },
        {
          "subject": "Dùng đúng Khiêm nhường ngữ cho bản thân",
          "nuance": "Hạ mình xuống để bày tỏ lòng kính trọng sâu sắc",
          "formula": "Chuẩn: 私はいただきます / 私が申しました",
          "example": "○ 田中と申します。",
          "exampleTranslation": "Tôi tên là Tanaka ạ.",
          "caution": "Luôn kiểm tra xem ai là người thực hiện hành động trước khi chọn từ."
        }
      ],
      "summary": "Thần chú bất hủ: 'Người khác làm -> Tôn kính; Bản thân làm -> Khiêm nhường'."
    },
    "notes": [
      "Trong giao tiếp nội bộ công ty với khách hàng bên ngoài, sếp của bạn vẫn là 'người phe mình' (uchi), vì vậy khi nói về sếp với khách hàng, BẮT BUỘC dùng Khiêm nhường ngữ (ví dụ: 部長の田中は外出しております)."
    ],
    "warnings": [
      "Đừng quá áp lực phải nói kính ngữ hoàn hảo 100% ngay từ đầu. Dùng thể lịch sự です/ます chuẩn xác, ngữ điệu lễ phép và thái độ chân thành đã chiếm 80% thiện cảm của người Nhật."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "cach-tu-choi-kheo-leo-trong-tieng-nhat",
        "title": "Nghệ thuật từ chối khéo léo (Kushon Kotoba) tránh làm mất lòng đối phương",
        "reason": "Kết hợp kính ngữ với nghệ thuật đệm lời"
      },
      {
        "category": "notes",
        "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        "reason": "Tránh các lỗi xưng hô và câu chào cửa miệng bị dịch sai nghĩa"
      }
    ]
  },
  {
    "id": "c-chao-hoi-mo-dau",
    "slug": "chao-hoi-va-mo-dau-cuoc-tro-chuyen",
    "categoryId": "conversation",
    "title": "Chào hỏi và mở đầu cuộc trò chuyện tự nhiên chuẩn người bản xứ",
    "japaneseTitle": "日常の挨拶と自然な会話のきっかけ作り",
    "summary": "Vượt qua những câu chào sách giáo khoa cứng nhắc: Cách dùng câu chuyện thời tiết (Aisatsu), mào đầu phá vỡ sự im lặng và duy trì phản xạ lắng nghe (Aizuchi).",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Chào hỏi",
      "Mở đầu",
      "Aizuchi",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ch-1",
        "title": "1. Câu chuyện thời tiết: 'Chìa khóa vàng' mở đầu mọi câu chuyện",
        "content": "Người Nhật hiếm khi mở đầu bằng việc hỏi chuyện riêng tư (lương bổng, hôn nhân). 90% các cuộc trò chuyện tự nhiên đều bắt đầu từ thời tiết:\n- 今日はいい天気ですね (Hôm nay trời đẹp quá nhỉ).\n- 今日はちょっと蒸し暑いですね (Hôm nay trời oi bức một chút nhỉ).\nCâu này không cần tranh luận đúng sai, chỉ nhằm tạo sự đồng thuận ban đầu (共感 - kyoukan).",
        "type": "rule"
      },
      {
        "id": "sec-ch-2",
        "title": "2. Nghệ thuật đệm lời Aizuchi (相槌) để đối phương hào hứng nói",
        "content": "Nếu người đối diện nói mà bạn chỉ im lặng, họ sẽ nghĩ bạn không hiểu hoặc khó chịu. Hãy liên tục đệm lời:\n- そうですね (Đúng vậy nhỉ / Ra là vậy)\n- なるほど (Thì ra là thế - dùng với bạn bè/ngang hàng)\n- 本当ですか (Thật vậy sao?)\n- ええ / はい (Vâng / Dạ).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-ch-1",
        "japanese": "A: 今日は冷え込みますね。\nB: 本当ですね。午後から雪が降るらしいですよ。",
        "reading": "A: きょうはひえこみますね。\nB: ほんとうですね。ごごからゆきがふるらしいですよ。",
        "romaji": "A: Kyou wa hiekomimasu ne.\nB: Hontou desu ne. Gogo kara yuki ga furu rashii desu yo.",
        "vietnamese": "A: Hôm nay trời trở lạnh buốt quá nhỉ.\nB: Thật vậy anh nhỉ. Nghe nói từ chiều nay tuyết sẽ rơi đấy.",
        "explanation": "Mở đầu bằng cảm nhận thời tiết tự nhiên và tiếp lời đồng thuận.",
        "context": "Gặp đồng nghiệp buổi sáng"
      },
      {
        "id": "ex-ch-2",
        "japanese": "お疲れ様です！最近、お忙しいですか。",
        "reading": "おつかれさまです！さいきん、おいそがしいですか。",
        "romaji": "Otsukaresama desu! Saikin, oisogashii desu ka.",
        "vietnamese": "Chào anh/chị nhé! Dạo gần đây anh có bận rộn nhiều không?",
        "explanation": "Mở đầu tự nhiên thay cho câu hỏi sách giáo khoa 'Ogenki desu ka'.",
        "context": "Bắt chuyện với đồng nghiệp cùng cơ quan"
      }
    ],
    "comparisons": {
      "title": "Chào hỏi Sách giáo khoa vs Chào hỏi Thực tế",
      "items": [
        {
          "subject": "Sách giáo khoa sơ cấp",
          "nuance": "Lặp lại máy móc, dễ gây cảm giác xa cách nếu gặp mỗi ngày",
          "formula": "お元気ですか？ (Ogenki desu ka)",
          "example": "はい、元気です。",
          "exampleTranslation": "Vâng, tôi khỏe.",
          "caution": "Người Nhật chỉ dùng khi lâu ngày không gặp nhau (vài tháng/năm)."
        },
        {
          "subject": "Thực tế người bản xứ",
          "nuance": "Dùng lời chào theo buổi + nhận xét thời tiết / công việc",
          "formula": "おはようございます + [Thời tiết] + ね",
          "example": "おはようございます。今日も暑いですね！",
          "exampleTranslation": "Chào buổi sáng. Hôm nay cũng nóng bức quá nhỉ!",
          "caution": "Tạo cảm giác thân thiện ấm áp tức thì."
        }
      ],
      "summary": "Gặp hàng ngày: Chào theo buổi + nhận xét thời tiết. Đừng hỏi 'Ogenki desu ka' mỗi sáng."
    },
    "notes": [
      "Không dùng 'なるほどですね' với sếp hoặc khách hàng vì đây là lỗi ngữ pháp khẩu ngữ lai căng (Kansei keigo) mà giới trẻ hay mắc."
    ],
    "warnings": [
      "Không bao giờ hỏi tuổi tác, tình trạng hôn nhân, tiền lương hay cân nặng khi mới bắt chuyện với người Nhật."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "tu-gioi-thieu-ban-than-jikoshoukai",
        "title": "Nghệ thuật tự giới thiệu bản thân (Jikoshoukai) ấn tượng và đúng mực",
        "reason": "Bước tiếp theo sau khi chào hỏi mở đầu"
      },
      {
        "category": "notes",
        "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        "reason": "Lỗi dùng Ogenki desu ka"
      },
      {
        "category": "conversation",
        "slug": "nghe-thuat-ket-thuc-cuoc-tro-chuyen",
        "title": "Nghệ thuật kết thúc cuộc trò chuyện lịch sự mà không gây cụt hứng",
        "reason": "Cặp kỹ năng trọn vẹn: Mở đầu cuộc trò chuyện và kết thúc cuộc trò chuyện"
      }
    ]
  },
  {
    "id": "c-tu-gioi-thieu-ban-than",
    "slug": "tu-gioi-thieu-ban-than-jikoshoukai",
    "categoryId": "conversation",
    "title": "Nghệ thuật tự giới thiệu bản thân (Jikoshoukai) ấn tượng và đúng mực",
    "japaneseTitle": "印象に残る自然な自己紹介（初対面）",
    "summary": "Khung xương 4 phần cho bài tự giới thiệu bản thân chuẩn mực: Lời chào mở đầu, Thông tin cơ bản, Điểm nhấn sở thích/mục tiêu, và Lời kết cúi chào lịch thiệp.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Tự giới thiệu",
      "Jikoshoukai",
      "Giao tiếp",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-js-1",
        "title": "1. Khung 4 bước của một bài Jikoshoukai hoàn chỉnh",
        "content": "Bước 1: Chào mở đầu (初めまして - Hajimemashite - Rất hân hạnh được gặp bạn lần đầu).\nBước 2: Tên, quê quán, xuất thân ([Tên] と申します / と言います).\nBước 3: Chia sẻ ngắn gọn về sở thích hoặc lý do học tiếng Nhật.\nBước 4: Lời kết trang trọng (どうぞよろしくお願いいたします - Douzo yoroshiku onegai itashimasu).",
        "type": "rule"
      },
      {
        "id": "sec-js-2",
        "title": "2. Phân biệt cấp độ lịch sự khi nói tên",
        "content": "- Thân mật (bạn bè): [Tên] です (Nam desu).\n- Lịch sự phổ thông (lớp học): [Tên] と言います (Nam to iimasu).\n- Trang trọng / Công sở / Phỏng vấn: [Tên] と申します (Nam to moushimasu - Khiêm nhường ngữ).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-js-1",
        "japanese": "初めまして。ベトナムのハノイから来ましたナムと申します。趣味は写真とサッカーです。これからどうぞよろしくお願いいたします。",
        "reading": "はじめまして。ベトナムのハノイからきましたナムともうします。しゅみはしゃしんとサッカーです。これからどうぞよろしくおねがいいたします。",
        "romaji": "Hajimemashite. Betonamu no Hanoi kara kimashita Namu to moushimasu. Shumi wa shashin to sakkaa desu. Korekara douzo yoroshiku onegai itashimasu.",
        "vietnamese": "Rất hân hạnh được gặp mọi người. Tôi tên là Nam, đến từ Hà Nội, Việt Nam. Sở thích của tôi là chụp ảnh và đá bóng. Từ nay rất mong nhận được sự giúp đỡ của mọi người ạ.",
        "explanation": "Bài giới thiệu mẫu chuẩn mực, đầy đủ thông tin, thanh lịch và ấm áp.",
        "context": "Ngày đầu ra mắt lớp học / công ty mới"
      }
    ],
    "comparisons": {
      "title": "Cách xưng tên: 〜と言います vs 〜と申します",
      "items": [
        {
          "subject": "〜と言います (To iimasu)",
          "nuance": "Lịch sự thông thường, phù hợp trường học, câu lạc bộ",
          "formula": "[Tên] と言います",
          "example": "リンと言います。",
          "exampleTranslation": "Tôi tên là Linh.",
          "caution": "Dùng thoải mái với bạn bè cùng trang lứa."
        },
        {
          "subject": "〜と申します (To moushimasu)",
          "nuance": "Khiêm nhường ngữ trang trọng, dùng cho phỏng vấn xin việc, gặp đối tác",
          "formula": "[Tên] と申します",
          "example": "グエンと申します。",
          "exampleTranslation": "Tôi tên là Nguyen ạ.",
          "caution": "Gây ấn tượng chuyên nghiệp cao."
        }
      ],
      "summary": "Giao tiếp hàng ngày -> と言います; Đi làm, phỏng vấn -> と申します."
    },
    "notes": [
      "Khi nói câu 'どうぞよろしくお願いいたします', hãy cúi đầu (Ojigi) một góc khoảng 30-45 độ sau khi dứt lời để thể hiện sự chân thành."
    ],
    "warnings": [
      "Không bao giờ thêm hậu tố '-san' vào tên của chính mình khi giới thiệu (Ví dụ: × 私はナムさんです là sai nghiêm trọng)."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "chao-hoi-va-mo-dau-cuoc-tro-chuyen",
        "title": "Chào hỏi và mở đầu cuộc trò chuyện tự nhiên chuẩn người bản xứ",
        "reason": "Mở đầu trước khi giới thiệu"
      },
      {
        "category": "conversation",
        "slug": "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        "title": "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        "reason": "Tìm hiểu sâu hơn về động từ 申す (mousu)"
      }
    ]
  },
  {
    "id": "c-cam-on-va-dap-lai",
    "slug": "cam-on-va-dap-lai-loi-cam-on",
    "categoryId": "conversation",
    "title": "Các sắc thái cảm ơn và cách đáp lại lời cảm ơn không bị gượng gạo",
    "japaneseTitle": "感謝の表現とその自然な返答",
    "summary": "Khám phá các bậc thang nói lời cảm ơn (từ Domo, Arigatou đến Arigatou gozaimashita) và bí quyết đáp lời chuẩn mực: Khi nào dùng Dou itashimashite, khi nào dùng Ieie.",
    "level": "N5",
    "tags": [
      "Hội thoại",
      "Cảm ơn",
      "Giao tiếp",
      "Dou itashimashite",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-co-1",
        "title": "1. Các mức độ cảm ơn trong đời sống",
        "content": "- どうも (Doumo): Cảm ơn nhẹ khi nhận đồ lặt vặt (nhặt giúp đồ rơi, mở cửa thang máy).\n- ありがとう (Arigatou): Thân mật giữa bạn bè, người thân.\n- ありがとうございます (Arigatou gozaimasu): Lịch sự chuẩn mực cho hành động đang hoặc vừa diễn ra.\n- ありがとうございました (Arigatou gozaimashita): Cảm ơn cho cả một quá trình/sự giúp đỡ đã kết thúc trong quá khứ.",
        "type": "rule"
      },
      {
        "id": "sec-co-2",
        "title": "2. Cách đáp lại lời cảm ơn: Có nên dùng 'どういたしまして'?",
        "content": "Sách giáo khoa luôn dạy 'どういたしまして' (Dou itashimashite - Không có chi). Nhưng ngoài đời, người Nhật hiếm khi dùng từ này với cấp trên vì nó mang hàm ý 'Tôi vừa làm một điều to tát cho bạn'. Thay vào đó, người bản xứ thường dùng:\n- いえいえ、とんでもないです (Không có chi đâu ạ, có gì to tát đâu ạ).\n- お役に立ててよかったです (Em rất vui vì đã giúp ích được cho anh/chị).\n- こちらこそ (Chính tôi mới là người phải cảm ơn ạ).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-co-1",
        "japanese": "A: 今日は手伝ってくれて、本当にありがとうございました！\nB: いえいえ、こちらこそ楽しかったです！",
        "reading": "A: きょうはてつだってくれて、ほんとうにありがとうございました！\nB: いえいえ、こちらこそたのしかったです！",
        "romaji": "A: Kyou wa tetsudatte kurete, hontou ni arigatou gozaimashita!\nB: Ieie, kochira koso tanoshikatta desu!",
        "vietnamese": "A: Hôm nay cảm ơn cậu thật nhiều vì đã giúp đỡ tớ nhé!\nB: Không có gì đâu, chính tớ cũng thấy rất vui mà!",
        "explanation": "Cách đáp lại bằng こちらこそ (chính tôi mới là người phải cảm ơn) rất khiêm nhường và ấm áp.",
        "context": "Sau khi giúp đỡ bạn bè"
      }
    ],
    "comparisons": {
      "title": "Đáp lại lời cảm ơn: どういたしまして vs とんでもないです",
      "items": [
        {
          "subject": "どういたしまして (Dou itashimashite)",
          "nuance": "Không có chi (Dành cho bạn bè, cấp dưới hoặc người nước ngoài)",
          "formula": "どういたしまして",
          "example": "友達: ありがとう！ -> 自分: どういたしまして！",
          "exampleTranslation": "Bạn: Cảm ơn nhé! -> Mình: Không có chi!",
          "caution": "Tránh dùng khi sếp hoặc khách hàng cảm ơn bạn."
        },
        {
          "subject": "とんでもないです (Tondemonai desu)",
          "nuance": "Khiêm nhường, không dám nhận công to",
          "formula": "いえいえ、とんでもないです",
          "example": "先輩: 助かったよ。 -> 自分: とんでもないです！",
          "exampleTranslation": "Tiền bối: Cảm ơn em cứu anh bàn thua. -> Mình: Dạ không có gì to tát đâu ạ!",
          "caution": "Cực kỳ được lòng cấp trên trong công sở."
        }
      ],
      "summary": "Với bạn bè -> いえいえ / どういたしまして; Với cấp trên/khách hàng -> とんでもないです / こちらこそ."
    },
    "notes": [
      "Trong giao tiếp tiếng Nhật, từ 'すみません' (Sumimasen) cũng được dùng để cảm ơn khi ai đó làm phiền lòng vì giúp đỡ mình (ví dụ nhường ghế xe buýt)."
    ],
    "warnings": [
      "Đừng nói 'どういたしまして' với khách hàng khi họ nói cảm ơn vì dịch vụ của bạn."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "xin-loi-va-dap-lai-loi-xin-loi",
        "title": "Văn hóa xin lỗi trong tiếng Nhật: Từ Sumimasen, Gomennasai đến Moushiwake arimasen",
        "reason": "Hiểu sâu mối liên hệ giữa lời cảm ơn và Sumimasen"
      },
      {
        "category": "conversation",
        "slug": "nho-giup-do-va-yeu-cau-lich-su",
        "title": "Cách nhờ vả và đưa ra yêu cầu lịch sự: Từ 〜てください đến 〜ていただけませんか",
        "reason": "Cảm ơn sau khi được người khác giúp đỡ"
      }
    ]
  },
  {
    "id": "c-xin-loi-va-dap-lai",
    "slug": "xin-loi-va-dap-lai-loi-xin-loi",
    "categoryId": "conversation",
    "title": "Văn hóa xin lỗi trong tiếng Nhật: Từ Sumimasen, Gomennasai đến Moushiwake arimasen",
    "japaneseTitle": "謝罪の表現とその受け止め方",
    "summary": "Phân biệt 4 cấp độ tạ lỗi trong văn hóa Nhật: Sumimasen (giao tiếp đời sống), Gomennasai (riêng tư thân mật), Moushiwake arimasen (công sở trang trọng) và cách đáp lời tha thứ.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Xin lỗi",
      "Văn hóa",
      "Sumimasen",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-xl-1",
        "title": "1. Bốn cấp độ xin lỗi trong tiếng Nhật",
        "content": "- ごめん / ごめんなさい (Gomen / Gomennasai): Dành cho gia đình, người yêu, bạn bè thân thiết khi trót làm sai chuyện nhỏ. TUYỆT ĐỐI KHÔNG DÙNG VỚI SẾP.\n- すみません (Sumimasen): Từ vạn năng trong đời sống hàng ngày (va quẹt nhẹ, xin lỗi vì làm phiền).\n- 申し訳ありません (Moushiwake arimasen): Xin lỗi trang trọng trong kinh doanh, với khách hàng, cấp trên khi xảy ra sự cố nghiêm trọng.\n- 失礼いたしました (Shitsurei itashimashita): Xin lỗi vì đã thất lễ / làm phiền.",
        "type": "rule"
      },
      {
        "id": "sec-xl-2",
        "title": "2. Cách đáp lại lời xin lỗi của người khác",
        "content": "Khi ai đó xin lỗi bạn về một sơ suất nhỏ, đừng im lặng. Hãy xua tay nhẹ và nói:\n- いいえ、大丈夫ですよ (Không sao đâu ạ, tôi ổn mà).\n- お気になさらないでください (Xin đừng bận tâm ạ - lịch sự).\n- こちらこそ、すみませんでした (Chính tôi cũng có lỗi sơ suất).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-xl-1",
        "japanese": "連絡が遅くなってしまい、大変申し訳ありませんでした。",
        "reading": "れんらくがおそくなってしまい、たいへんもうしわけありませんでした。",
        "romaji": "Renraku ga osoku natte shimai, taihen moushiwake arimasen deshita.",
        "vietnamese": "Em xin chân thành xin lỗi vì đã liên lạc muộn trễ ạ.",
        "explanation": "Cách xin lỗi cấp trên hoặc đối tác khi chậm trễ hồi đáp.",
        "context": "Xin lỗi trong công việc"
      },
      {
        "id": "ex-xl-2",
        "japanese": "A: 足を踏んでしまって、すみません！\nB: あ、大丈夫ですよ。お気になさらずに。",
        "reading": "A: あしをふんでしまって、すみません！\nB: あ、だいじょうぶですよ。おきになさらずに。",
        "romaji": "A: Ashi o funde shimatte, sumimasen!\nB: A, daijoubu desu yo. Oki ni nasarazu ni.",
        "vietnamese": "A: Tôi lỡ giẫm vào chân bạn, thật xin lỗi!\nB: À, không sao đâu bạn. Xin đừng bận tâm.",
        "explanation": "Tình huống va chạm nhẹ trên tàu xe và phản hồi lịch sự.",
        "context": "Tình huống công cộng"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu Gomennasai vs Sumimasen vs Moushiwake arimasen",
      "items": [
        {
          "subject": "ごめんなさい (Gomennasai)",
          "nuance": "Trẻ con, bạn bè thân thiết, thành thật hối lỗi chuyện riêng",
          "formula": "ごめん / ごめんなさい",
          "example": "待たせてごめんね！",
          "exampleTranslation": "Để cậu đợi lâu, cho tớ xin lỗi nhé!",
          "caution": "Không dùng trong công sở hay môi trường trang trọng."
        },
        {
          "subject": "申し訳ありません (Moushiwake arimasen)",
          "nuance": "Chuyên nghiệp, thừa nhận sai sót nghiêm trọng không có lý do bao biện",
          "formula": "大変申し訳ございません",
          "example": "ご迷惑をおかけして申し訳ありません。",
          "exampleTranslation": "Tôi vô cùng xin lỗi vì đã gây phiền toái cho ngài.",
          "caution": "Tiêu chuẩn vàng trong quan hệ kinh doanh tại Nhật."
        }
      ],
      "summary": "Với bạn bè -> ごめん; Đời thường -> すみません; Công sở/Khách hàng -> 申し訳ありません."
    },
    "notes": [
      "Người Nhật xin lỗi không nhất thiết vì họ nhận sai 100%, mà là để xoa dịu bầu không khí căng thẳng và bày tỏ sự tiếc nuối vì sự hòa hợp chung."
    ],
    "warnings": [
      "Tuyệt đối không dùng 'ごめんなさい' khi sếp mắng trong giờ làm việc. Hãy dùng '申し訳ありませんでした'."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "cam-on-va-dap-lai-loi-cam-on",
        "title": "Các sắc thái cảm ơn và cách đáp lại lời cảm ơn không bị gượng gạo",
        "reason": "Sự tương đồng về mặt tâm lý xã hội giữa cảm ơn và xin lỗi"
      },
      {
        "category": "notes",
        "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        "reason": "Bẫy hiểu nhầm khi dùng từ Đại trượng phu (大丈夫)"
      }
    ]
  },
  {
    "id": "c-nho-giup-do-lich-su",
    "slug": "nho-giup-do-va-yeu-cau-lich-su",
    "categoryId": "conversation",
    "title": "Cách nhờ vả và đưa ra yêu cầu lịch sự: Từ 〜てください đến 〜ていただけませんか",
    "japaneseTitle": "丁寧な依頼とお願いのフレーズ",
    "summary": "Nâng cấp câu nhờ vả từ thể てください thông thường lên các mẫu câu tinh tế: 〜てもらえますか, 〜ていただけませんか, và cụm đệm lời お手数をおかけしますが.",
    "level": "N4",
    "tags": [
      "Hội thoại",
      "Nhờ vả",
      "Yêu cầu",
      "てください",
      "Kính ngữ",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ng-1",
        "title": "1. Thang đo mức độ lịch sự khi nhờ vả",
        "content": "Trong tiếng Nhật, mức độ gián tiếp của câu càng cao thì câu nói càng lịch sự:\n1. V-て: Thân mật bạn bè (Chỉ đường cho tớ với - 教えて).\n2. V-てください: Lịch sự thông thường (Xin hãy chỉ cho tôi - 教えてください).\n3. V-てもらえますか / もらえない?: Nhờ vả bạn bè/ngang hàng lịch sự (Bạn chỉ giúp tôi được không?)\n4. V-ていただけませんか: Rất lịch sự (Xin ngài vui lòng chỉ bảo giúp tôi có được không ạ?)\n5. V-ていただけますと幸いです: Trang trọng trong email thương mại.",
        "type": "table",
        "tableData": {
          "headers": [
            "Mẫu câu nhờ vả",
            "Đối tượng sử dụng",
            "Mức độ lịch sự"
          ],
          "rows": [
            [
              "V-て",
              "Bạn bè thân thiết, gia đình",
              "★☆☆☆☆ (Thân mật)"
            ],
            [
              "V-てください",
              "Người lạ, nhân viên dịch vụ, người cùng vị thế",
              "★★☆☆☆ (Thông thường)"
            ],
            [
              "V-てもらえますか",
              "Đồng nghiệp cùng trang lứa, người quen",
              "★★★☆☆ (Lịch sự)"
            ],
            [
              "V-ていただけませんか",
              "Cấp trên, thầy cô giáo, khách hàng",
              "★★★★☆ (Rất lịch sự)"
            ],
            [
              "V-ていただけますと幸いです",
              "Email công sở, đối tác kinh doanh",
              "★★★★★ (Tuyệt đối)"
            ]
          ]
        }
      },
      {
        "id": "sec-ng-2",
        "title": "2. Cụm từ đệm giảm xóc trước khi nhờ vả",
        "content": "Đừng bao giờ nhảy bổ vào nhờ vả ngay. Hãy lót câu bằng một trong các cụm từ sau:\n- お忙しいところ申し訳ありませんが (Xin lỗi vì làm phiền lúc anh đang bận rộn nhưng...)\n- ちょっとお願いがあるんですが (Em có chút việc muốn nhờ vả anh nhưng...)\n- お手数をおかけしますが (Làm phiền anh mất công sức nhưng...).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-ng-1",
        "japanese": "すみません、この漢字の読み方を教えていただけませんか。",
        "reading": "すみません、このかんじのよみかたをおしえていただけませんか。",
        "romaji": "Sumimasen, kono kanji no yomikata o oshiete itadakemasen ka.",
        "vietnamese": "Xin lỗi ạ, thầy/anh có thể vui lòng chỉ giúp em cách đọc chữ Hán này được không ạ?",
        "explanation": "Cách nhờ vả giáo viên hoặc người trên một cách lễ phép chuẩn mực.",
        "context": "Hỏi bài thầy cô"
      },
      {
        "id": "ex-ng-2",
        "japanese": "お忙しいところ恐れ入りますが、書類を確認していただけますでしょうか。",
        "reading": "おいそがしいところおそれいりますが、しょるいをかくにんしていただけますでしょうか。",
        "romaji": "Oisogashii tokoro osoreirimasu ga, shorui o kakunin shite itadakemasu deshou ka.",
        "vietnamese": "Xin thứ lỗi vì làm phiền trong lúc anh đang bận, anh có thể vui lòng kiểm tra giúp em tập tài liệu này được không ạ?",
        "explanation": "Mẫu câu nhờ cấp trên kiểm tra báo cáo trong văn phòng.",
        "context": "Nhờ sếp duyệt tài liệu"
      }
    ],
    "comparisons": {
      "title": "V-てください vs V-ていただけませんか",
      "items": [
        {
          "subject": "V-てください (Hãy làm...)",
          "nuance": "Mang tính chỉ thị, yêu cầu người khác làm theo mong muốn của mình",
          "formula": "V-て + ください",
          "example": "ここに名前を書いてください。",
          "exampleTranslation": "Xin hãy viết tên vào đây.",
          "caution": "Không nên dùng khi nhờ cấp trên làm việc gì cho mình."
        },
        {
          "subject": "V-ていただけませんか (Có thể làm giúp tôi được không?)",
          "nuance": "Để quyền quyết định cho đối phương, khiêm tốn xin nhận ân huệ",
          "formula": "V-て + いただけませんか",
          "example": "ここを見ていただけませんか。",
          "exampleTranslation": "Ngài có thể xem giúp tôi chỗ này được không ạ?",
          "caution": "Mẫu câu nhờ vả lý tưởng nhất cho học viên sơ cấp."
        }
      ],
      "summary": "Với cấp trên: Thay '〜てください' bằng '〜ていただけませんか'."
    },
    "notes": [
      "Nói '〜てください' với cấp trên rất dễ bị xem là bạn đang ra lệnh cho họ."
    ],
    "warnings": [
      "Tuyệt đối tránh câu: '先生、この作文を直してください' (Nghe giống ra lệnh). Phải sửa thành '直していただけませんか'."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        "title": "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        "reason": "Gốc rễ khiêm nhường ngữ いただく"
      },
      {
        "category": "conversation",
        "slug": "cach-tu-choi-kheo-leo-trong-tieng-nhat",
        "title": "Nghệ thuật từ chối khéo léo (Kushon Kotoba) tránh làm mất lòng đối phương",
        "reason": "Cụm từ đệm giảm xóc trong giao tiếp"
      }
    ]
  },
  {
    "id": "c-hoi-va-chi-duong",
    "slug": "hoi-va-chi-duong-trong-thuc-te",
    "categoryId": "conversation",
    "title": "Hỏi và chỉ đường thực tế tại Nhật: Cấu trúc câu và từ vựng định hướng",
    "japaneseTitle": "道案内と道を聞く実践会話",
    "summary": "Bộ cẩm nang sinh tồn khi bị lạc đường tại Nhật: Cách mở lời với người qua đường hoặc cảnh sát ở Koban, các mẫu câu định hướng và từ vựng vị trí.",
    "level": "N5",
    "tags": [
      "Hội thoại",
      "Chỉ đường",
      "Đi lại",
      "Koban",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-hd-1",
        "title": "1. Mẫu câu hỏi đường kinh điển",
        "content": "Khi muốn hỏi đường đến một địa điểm X, bạn dùng cấu trúc:\n- すみません、[Địa điểm] はどこですか (Xin lỗi, [Địa điểm] ở đâu ạ?)\n- すみません、[Địa điểm] に行きたいんですが、どう行けばいいですか (Xin lỗi, tôi muốn đến [Địa điểm], tôi nên đi như thế nào ạ?)\n- この近くにコンビニはありますか (Gần đây có konbini nào không ạ?).",
        "type": "rule"
      },
      {
        "id": "sec-hd-2",
        "title": "2. Từ vựng chỉ dẫn phương hướng cần nhận diện ngay bằng tai",
        "content": "- まっすぐ行く (Massugu iku): Đi thẳng\n- 右/左へ曲がる (Migi / Hidari e magaru): Rẽ phải / Rẽ trái\n- あの角 (Ano kado): Góc ngã tư đằng kia\n- 信号 (Shingou): Đèn giao thông\n- 渡る (Wataru): Băng qua đường / cầu\n- 手前 (Temae): Ở phía trước mặt (chưa tới nơi).",
        "type": "table",
        "tableData": {
          "headers": [
            "Cụm từ chỉ hướng",
            "Cách đọc",
            "Ý nghĩa"
          ],
          "rows": [
            [
              "まっすぐ行ってください",
              "まっすぐいってください",
              "Xin hãy đi thẳng tiếp"
            ],
            [
              "右へ曲がってください",
              "みぎへまがってください",
              "Xin hãy rẽ sang bên phải"
            ],
            [
              "信号を渡ってください",
              "しんごうをわたってください",
              "Xin hãy băng qua đèn đỏ"
            ],
            [
              "突き当たり",
              "つきあたり",
              "Ngõ cụt / Kịch đường"
            ]
          ]
        }
      }
    ],
    "examples": [
      {
        "id": "ex-hd-1",
        "japanese": "すみません、駅へ行きたいんですが、どの道を歩けばいいですか。",
        "reading": "すみません、えきへいきたいんですが、どのみちをあるけばいいですか。",
        "romaji": "Sumimasen, eki e ikitai n desu ga, dono michi o arukeba ii desu ka.",
        "vietnamese": "Xin lỗi ạ, tôi muốn ra nhà ga, tôi nên đi theo con đường nào ạ?",
        "explanation": "Mở đầu lịch sự khi hỏi đường người qua đường.",
        "context": "Hỏi đường người dân địa phương"
      },
      {
        "id": "ex-hd-2",
        "japanese": "あの交差点を左に曲がると、右手に郵便局が見えますよ。",
        "reading": "あのこうさてんをひだりにまがると、みぎてにゆうびんきょくがみえますよ。",
        "romaji": "Ano kousaten o hidari ni magaru to, migite ni yuubinkyoku ga miemasu yo.",
        "vietnamese": "Hễ rẽ trái ở ngã tư đằng kia thì bạn sẽ nhìn thấy bưu điện ở phía tay phải đấy.",
        "explanation": "Câu chỉ dẫn đường đi sử dụng điều kiện と và tự động từ 見える.",
        "context": "Người bản xứ chỉ đường"
      }
    ],
    "comparisons": {
      "title": "Hỏi đường trực tiếp vs Hỏi đường lịch sự tự nhiên",
      "items": [
        {
          "subject": "Hỏi trực tiếp (Cộc lốc)",
          "nuance": "Chỉ hỏi cộc lốc địa điểm ở đâu",
          "formula": "駅はどこ？",
          "example": "駅はどこですか。",
          "exampleTranslation": "Ga ở đâu?",
          "caution": "Nghe hơi đường đột nếu không có lời đệm đầu."
        },
        {
          "subject": "Hỏi tự nhiên (Chuẩn bản xứ)",
          "nuance": "Đệm từ xin lỗi và nêu mong muốn trước khi hỏi",
          "formula": "すみません、〜へ行きたいんですが...",
          "example": "すみません、この近くに薬局はありますか。",
          "exampleTranslation": "Xin lỗi anh, quanh đây có hiệu thuốc nào không ạ?",
          "caution": "Người nghe sẽ rất sẵn lòng nhiệt tình giúp đỡ."
        }
      ],
      "summary": "Luôn bắt đầu bằng 'すみません' + '〜行きたいんですが' trước khi hỏi."
    },
    "notes": [
      "Tại Nhật, các đồn cảnh sát khu phố (交番 - Koban) luôn có bản đồ chi tiết khu vực và các chú cảnh sát rất nhiệt tình chỉ đường."
    ],
    "warnings": [
      "Tránh hỏi người đang cắm cúi chạy vội vào ga vào giờ cao điểm đi làm (8:00 - 8:45 sáng) vì họ đang vội bắt tàu sát nút."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "phan-biet-kiku-va-kiku-nghe",
        "title": "Phân biệt 聞く (kiku - nghe/hỏi) và 聴く (kiku - lắng nghe có chủ đích)",
        "reason": "Cụm từ 道を聞く (Hỏi đường)"
      },
      {
        "category": "grammar",
        "slug": "so-sanh-to-ba-tara-nara",
        "title": "So sánh 4 mẫu câu điều kiện と, ば, たら, なら ở mức độ nhập môn",
        "reason": "Sử dụng câu điều kiện と khi chỉ đường máy móc"
      },
      {
        "category": "conversation",
        "slug": "giao-tiep-tai-khach-san",
        "title": "Giao tiếp tại khách sạn: Check-in, gửi hành lý trước giờ nhận phòng, hỏi dịch vụ",
        "reason": "Hỏi đường đi tới khách sạn và giao tiếp lễ tân"
      }
    ]
  },
  {
    "id": "c-mua-hang-va-thanh-toan",
    "slug": "mua-hang-hoi-gia-va-thanh-toan",
    "categoryId": "conversation",
    "title": "Mẫu câu mua sắm, hỏi giá, thử đồ và thanh toán tại cửa hàng & konbini",
    "japaneseTitle": "ショッピングと会計の実践表現",
    "summary": "Bí kíp giao tiếp tự tin khi đi mua sắm: Hỏi size quần áo, xin phép thử đồ, từ chối túi ni lông tại konbini, và chọn phương thức thanh toán thẻ hay tiền mặt.",
    "level": "N5",
    "tags": [
      "Hội thoại",
      "Mua sắm",
      "Thanh toán",
      "Konbini",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-mh-1",
        "title": "1. Thử đồ và hỏi kích cỡ tại cửa hàng quần áo",
        "content": "- Xin phép thử đồ: これ、試着してもいいですか (Tôi mặc thử chiếc này có được không ạ?)\n- Hỏi size khác: これのMサイズはありますか (Chiếc này có size M không ạ?)\n- Hỏi màu khác: 違う色はありますか (Có màu khác không ạ?).",
        "type": "rule"
      },
      {
        "id": "sec-mh-2",
        "title": "2. Hội thoại 'kinh điển' tại quầy thu ngân Konbini",
        "content": "Khi đứng trước quầy tính tiền tiện lợi Konbini, nhân viên thường hỏi 3 câu quen thuộc:\n1. Điểm thưởng: ポイントカードはお持ちですか (Quý khách có mang thẻ tích điểm không? -> Không có: ないです).\n2. Hâm nóng cơm hộp: 温めますか (Có hâm nóng không? -> Có: お願いします / Không: 大丈夫です).\n3. Túi nilon: 袋はご利用ですか (Quý khách có dùng túi không? -> Cần: お願いします / Không cần: 大丈夫です).",
        "type": "pattern"
      },
      {
        "id": "sec-mh-3",
        "title": "3. Chọn phương thức thanh toán",
        "content": "- Tiền mặt: 現金で (Genkin de)\n- Thẻ tín dụng: クレジットカードで (Kurejitto kaado de)\n- Thẻ giao thông (Suica/Pasmo): 交通系ICで (Koutsuukei aishii de).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-mh-1",
        "japanese": "店員: 袋はお付けしますか。\n客: あ、大丈夫です。カバンに入りますので。",
        "reading": "てんいん: ふくろはおつけしますか。\nきゃく: あ、だいじょうぶです。カバンにはいりますので。",
        "romaji": "Ten'in: Fukuro wa otsuke shimasu ka.\nKyaku: A, daijoubu desu. Kaban ni hairimasu node.",
        "vietnamese": "Nhân viên: Quý khách có lấy túi không ạ?\nKhách: À, tôi không cần đâu ạ. Bỏ vào balo của tôi là vừa rồi.",
        "explanation": "Cách từ chối túi nilon lịch sự ở konbini bằng 大丈夫です.",
        "context": "Thanh toán ở cửa hàng tiện lợi"
      },
      {
        "id": "ex-mh-2",
        "japanese": "支払いはクレジットカードでお願いします。",
        "reading": "しはらいはクレジットカードでおねがいします。",
        "romaji": "Shiharai wa kurejitto kaado de onegai shimasu.",
        "vietnamese": "Tôi xin phép thanh toán bằng thẻ tín dụng ạ.",
        "explanation": "Xác nhận phương thức thanh toán tại quầy tính tiền.",
        "context": "Thanh toán thẻ"
      }
    ],
    "comparisons": {
      "title": "Chỉ muốn xem thử vs Quyết định mua",
      "items": [
        {
          "subject": "Chỉ muốn xem thử (Từ chối nhân viên nhiệt tình)",
          "nuance": "Lịch sự thông báo bạn chỉ đang dạo quanh ngắm đồ",
          "formula": "見ているだけです (Mite iru dake desu)",
          "example": "あ、見ているだけなので大丈夫です。",
          "exampleTranslation": "Dạ, tôi chỉ đang xem thử thôi nên không sao đâu ạ.",
          "caution": "Nhân viên sẽ để bạn thoải mái ngắm đồ một mình."
        },
        {
          "subject": "Quyết định chốt mua món đồ",
          "nuance": "Thông báo với nhân viên bạn lấy món đồ này",
          "formula": "これ、ください / これにします",
          "example": "これを1つください。",
          "exampleTranslation": "Cho tôi lấy 1 cái này nhé.",
          "caution": "Dùng これにします khi chọn trong số nhiều lựa chọn."
        }
      ],
      "summary": "Chỉ xem đồ -> 見ているだけです; Chốt mua -> これにします / これをください."
    },
    "notes": [
      "Tại quầy thu ngân Nhật Bản, luôn đặt tiền hoặc thẻ vào chiếc khay nhỏ (Trate / Cash tray), không đưa trực tiếp vào tay nhân viên."
    ],
    "warnings": [
      "Đừng nói 'いいえ' cụt lủn khi nhân viên hỏi có cần túi hay hóa đơn không; hãy nói '大丈夫です' kèm nụ cười nhẹ."
    ],
    "relatedArticles": [
      {
        "category": "notes",
        "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        "reason": "Bẫy từ vựng Đại trượng phu (大丈夫) tại Konbini"
      },
      {
        "category": "conversation",
        "slug": "goi-mon-tai-nha-hang-quan-an",
        "title": "Giao tiếp tại nhà hàng: Đặt bàn, gọi món, xin nước uống và yêu cầu tính tiền",
        "reason": "Các mẫu câu thanh toán trong ăn uống"
      }
    ]
  },
  {
    "id": "c-goi-mon-nha-hang",
    "slug": "goi-mon-tai-nha-hang-quan-an",
    "categoryId": "conversation",
    "title": "Giao tiếp tại nhà hàng: Đặt bàn, gọi món, xin nước uống và yêu cầu tính tiền",
    "japaneseTitle": "飲食店での注文と接客会話の完全ガイド",
    "summary": "Tự tin bước vào bất kỳ quán ăn nào tại Nhật: Báo số lượng khách, gọi phục vụ (Sumimasen), hỏi món đặc trưng, xin thêm nước và thanh toán.",
    "level": "N5",
    "tags": [
      "Hội thoại",
      "Nhà hàng",
      "Gọi món",
      "Ăn uống",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-gm-1",
        "title": "1. Bước 1: Khi bước vào quán & Báo số lượng người",
        "content": "Nhân viên chào đón: いらっしゃいませ！何名様ですか (Kính chào quý khách! Đi mấy người ạ?).\nBạn giơ ngón tay hoặc trả lời:\n- 1 người: 1人です (Hitori desu)\n- 2 người: 2人です (Futari desu)\n- 3 người: 3人です (Sannin desu).",
        "type": "rule"
      },
      {
        "id": "sec-gm-2",
        "title": "2. Bước 2: Gọi phục vụ và gọi món",
        "content": "- Bấm chuông hoặc giơ tay nói to rõ: すみません！ (Sumimasen! - Em ơi!)\n- Chỉ vào menu: これをお願いします (Kore o onegai shimasu - Cho tôi món này ạ)\n- Hỏi món bán chạy: おすすめは何ですか (Món gợi ý của quán là gì ạ?)\n- Xin nước lọc miễn phí: お冷をお願いします (Ohia o onegai shimasu - Cho tôi xin ly nước mát).",
        "type": "pattern"
      },
      {
        "id": "sec-gm-3",
        "title": "3. Bước 3: Tính tiền (Kaikei)",
        "content": "Sau khi ăn xong, bạn cầm phiếu tính tiền đặt ở đầu bàn ra quầy và nói:\n- お会計をお願いします (Okaikei o onegai shimasu - Cho tôi thanh toán ạ).\n- Muốn chia đôi tiền (với bạn bè): 別々でお願いします (Betsubetsu de onegai shimasu - Tính riêng từng người nhé).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-gm-1",
        "japanese": "客: すみません、注文をお願いします。\n店員: はい、ご注文をお伺いします。\n客: このラーメンを1つと、餃子を1つください。",
        "reading": "きゃく: すみません、ちゅうもんをおねがいします。\nてんいん: はい、ごちゅうもんをおうかがいします。\nきゃく: このラーメンをひとつと、ぎょうざをひとつください。",
        "romaji": "Kyaku: Sumimasen, chuumon o onegai shimasu.\nTen'in: Hai, gochuumon o oukagaimasu.\nKyaku: Kono raamen o hitotsu to, gyouza o hitotsu kudasai.",
        "vietnamese": "Khách: Em ơi cho anh gọi món với.\nNhân viên: Vâng, em xin nghe món của quý khách ạ.\nKhách: Cho anh 1 bát mì ramen này và 1 đĩa há cảo gyoza nhé.",
        "explanation": "Cuộc đối thoại gọi món kinh điển tại bất kỳ quán ăn Nhật Bản nào.",
        "context": "Gọi món tại quán ramen"
      },
      {
        "id": "ex-gm-2",
        "japanese": "ごちそうさまでした！とてもおいしかったです。",
        "reading": "ごちそうさまでした！とてもおいしかったです。",
        "romaji": "Gochisousama deshita! Totemo oishikatta desu.",
        "vietnamese": "Cảm ơn vì bữa ăn ngon miệng ạ! Món ăn rất ngon.",
        "explanation": "Lời chào cảm ơn ấm áp dành cho đầu bếp khi bước ra khỏi quán.",
        "context": "Rời khỏi nhà hàng"
      }
    ],
    "comparisons": {
      "title": "Nước uống: お水 vs お冷",
      "items": [
        {
          "subject": "お冷 (Ohia - Chữ LÃNH)",
          "nuance": "Từ chuyên dùng trong ngành ẩm thực để chỉ cốc nước lọc đá miễn phí",
          "formula": "お冷 (おひや) をお願いします",
          "example": "お冷のおかわりをください。",
          "exampleTranslation": "Cho tôi xin thêm ly nước đá.",
          "caution": "Rất chuẩn phong cách người bản xứ."
        },
        {
          "subject": "お水 (Omizu - Chữ THỦY)",
          "nuance": "Nước nói chung trong đời sống",
          "formula": "お水をください",
          "example": "お水を一杯ください。",
          "exampleTranslation": "Cho tôi một cốc nước.",
          "caution": "Vẫn hoàn toàn dễ hiểu nhưng お冷 nghe chuyên nghiệp hơn."
        }
      ],
      "summary": "Ở quán ăn, xin nước lọc đá hãy gọi là 'お冷' (Ohia). Ăn xong hãy nói 'ごちそうさまでした'."
    },
    "notes": [
      "Tại Nhật, KHÔNG CÓ VĂN HÓA TIỀN TIP (Tip/Bo). Bạn chỉ cần trả đúng số tiền trên hóa đơn và nói lời cảm ơn chân thành."
    ],
    "warnings": [
      "Không gõ đũa vào bát hoặc cắm thẳng đứng đôi đũa vào bát cơm (Tsukitate-bashi), vì đây là điều cấm kỵ giống nghi thức tang lễ Phật giáo tại Nhật."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "mua-hang-hoi-gia-va-thanh-toan",
        "title": "Mẫu câu mua sắm, hỏi giá, thử đồ và thanh toán tại cửa hàng & konbini",
        "reason": "Quy trình thanh toán tiền tệ"
      },
      {
        "category": "conversation",
        "slug": "cam-on-va-dap-lai-loi-cam-on",
        "title": "Các sắc thái cảm ơn và cách đáp lại lời cảm ơn không bị gượng gạo",
        "reason": "Lời cảm ơn sau bữa ăn Gochisousama deshita"
      }
    ]
  },
  {
    "id": "c-truong-dai-hoc",
    "slug": "giao-tiep-trong-truong-dai-hoc",
    "categoryId": "conversation",
    "title": "Giao tiếp trong trường học & đại học: Trao đổi với giáo sư, hỏi bài bạn học và nộp báo cáo",
    "japaneseTitle": "大学・学校での会話：教授への相談・友人への質問・レポート提出",
    "summary": "Tuyển tập mẫu câu giao tiếp chuẩn mực trong môi trường học thuật Nhật Bản: Giữ lễ nghi tôn kính với Giáo sư và cách nói chuyện thân thiện, cởi mở với bạn học cùng lớp.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Trường học",
      "Đại học",
      "Lễ nghi",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ctu-1",
        "title": "1. Trao đổi với Giáo sư (教授 - Kyouju) và Giảng viên",
        "content": "Khi bước vào phòng nghiên cứu (研究室) của giáo sư, luôn gõ cửa 3 tiếng và nói:\n- '失礼いたします。◯◯ゼミの［Tên］です。今、お時間よろしいでしょうか。' (Em xin phép vào ạ. Em là [Tên] lớp thầy. Thầy có tiện thời gian bây giờ không ạ?).\nKhi nhờ giáo sư sửa bài báo cáo/luận văn:\n- '先生、レポートの件でご相談があるのですが、見ていただけないでしょうか。' (Thưa thầy, em có điều muốn trao đổi về bài báo cáo, thầy có thể xem qua giúp em được không ạ?).",
        "type": "rule"
      },
      {
        "id": "sec-ctu-2",
        "title": "2. Hỏi bài và Mượn vở bạn cùng lớp (Thân mật - Casual)",
        "content": "Với bạn học, không dùng kính ngữ cứng nhắc mà dùng văn phong tự nhiên:\n- 'ねえ、昨日の講義のノート、見せてもらってもいい？' (Này, cho tớ mượn xem vở ghi bài giảng hôm qua được không?).\n- 'ここ、どうしても分からないんだけど、教えてくれない？' (Chỗ này tớ nghĩ mãi không hiểu, cậu chỉ cho tớ với được không?).",
        "type": "pattern"
      },
      {
        "id": "sec-ctu-3",
        "title": "3. Nộp báo cáo tiểu luận (レポート提出)",
        "content": "Khi nộp bài cho giáo viên hoặc văn phòng khoa:\n- '遅くなって申し訳ありません。経済学のレポートを提出いたします。' (Em xin lỗi vì nộp muộn. Em xin phép nộp báo cáo môn Kinh tế học ạ).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-ctu-1",
        "japanese": "先生、質問があるのですが、今よろしいでしょうか。",
        "reading": "せんせい、しつもんがあるのですが、いまよろしいでしょうか。",
        "romaji": "Sensei, shitsumon ga aru no desu ga, ima yoroshii deshou ka.",
        "vietnamese": "Thưa thầy, em có câu hỏi muốn hỏi, bây giờ thầy có tiện không ạ?",
        "explanation": "Mẫu câu xin phép mở lời lịch sự với giáo viên.",
        "context": "Hỏi bài sau giờ giảng"
      },
      {
        "id": "ex-ctu-2",
        "japanese": "この前のテスト、難しかったよね！何点だった？",
        "reading": "このまえのテスト、むずかしかったよね！なんてんだった？",
        "romaji": "Kono mae no tesuto, muzukashikatta yo ne! Nanten datta?",
        "vietnamese": "Bài kiểm tra hôm nọ khó thật đấy nhỉ! Cậu được bao nhiêu điểm?",
        "explanation": "Trò chuyện suồng sã tự nhiên với bạn học cùng lớp.",
        "context": "Tán gẫu giờ giải lao"
      },
      {
        "id": "ex-ctu-3",
        "japanese": "期末レポートの締め切りはいつまでですか。",
        "reading": "きまつレポートのしめきりはいつまでですか。",
        "romaji": "Kimatsu repooto no shimekiri wa itsu made desu ka.",
        "vietnamese": "Hạn chót nộp bài báo cáo cuối kỳ là khi nào vậy ạ?",
        "explanation": "Hỏi về kỳ hạn nộp bài trong trường.",
        "context": "Xác nhận lịch nộp bài"
      }
    ],
    "notes": [
      "Tại trường đại học Nhật Bản, sinh viên không gọi giảng viên bằng tên riêng mà luôn dùng chức danh [Họ + 先生]."
    ],
    "warnings": [
      "Không gõ cửa 2 tiếng (2 tiếng gõ thường là kiểm tra bồn cầu nhà vệ sinh có người hay không). Gõ cửa phòng làm việc phải gõ 3 hoặc 4 tiếng."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "tu-vung-ngu-canh-truong-hoc-va-cong-ty",
        "title": "Phân biệt từ vựng môi trường Trường học vs Công ty: 授業/会議, 宿題/書類",
        "reason": "Từ vựng môi trường trường học và giáo dục"
      },
      {
        "category": "grammar",
        "slug": "phan-biet-made-va-made-ni",
        "title": "Phân biệt まで (cho tới khi) và までに (hạn chót hoàn thành): Bản chất hành động",
        "reason": "Mẫu câu hạn chót nộp bài tập"
      },
      {
        "category": "conversation",
        "slug": "nho-giup-do-va-yeu-cau-lich-su",
        "title": "Cách nhờ vả và đưa ra yêu cầu lịch sự: Từ 〜てください đến 〜ていただけませんか",
        "reason": "Cách nhờ thầy cô kiểm tra báo cáo lịch sự"
      }
    ]
  },
  {
    "id": "c-noi-lam-viec-aisatsu",
    "slug": "giao-tiep-noi-lam-viec-aisatsu",
    "categoryId": "conversation",
    "title": "Giao tiếp nơi làm việc: Chào buổi sáng, chào ra về (Osakini ni shitsurei shimasu), báo cáo Horenso",
    "japaneseTitle": "職場での日常会話：挨拶・お先に失礼します・ほうれんそう（報連相）",
    "summary": "Văn hóa ứng xử sống còn trong doanh nghiệp Nhật: Từ câu chào bắt đầu ngày làm việc đến văn hóa chào ra về trước đồng nghiệp và nguyên tắc báo cáo Horenso kinh điển.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Công sở",
      "Chào hỏi",
      "Horenso",
      "N4"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cnl-1",
        "title": "1. Chào buổi sáng và Chào trong giờ làm việc",
        "content": "- Bắt đầu ngày làm việc: 'おはようございます！' (Chào buổi sáng - nói to, rõ ràng, dõng dạc).\n- Chào đồng nghiệp khi đi lướt qua nhau trong công ty: 'お疲れ様です' (Otsukaresama desu - Anh/chị đã vất vả rồi).\n- Chú ý: Tuyệt đối không dùng ご苦労様です (Gokurousama desu) với cấp trên (chỉ có sếp nói câu này với nhân viên).",
        "type": "rule"
      },
      {
        "id": "sec-cnl-2",
        "title": "2. Văn hóa ra về: お先に失礼します (Osaki ni shitsurei shimasu)",
        "content": "Khi bạn hoàn thành công việc và ra về trước đồng nghiệp:\n- Người về trước nói: 'お先に失礼いたします。' (Tôi xin phép về trước ạ).\n- Mọi người ở lại đồng thanh đáp lại: 'お疲れ様でした！' (Anh/chị đã vất vả cả ngày hôm nay rồi!).\nNếu ra về mà không chào câu này, bạn sẽ bị đánh giá là thiếu tôn trọng tập thể.",
        "type": "pattern"
      },
      {
        "id": "sec-cnl-3",
        "title": "3. Nguyên tắc Horenso (報連相): Báo cáo - Liên lạc - Thảo luận",
        "content": "- Báo cáo (Houkoku): '先ほどの件、完了いたしました。' (Vụ việc lúc nãy em đã hoàn tất rồi ạ).\n- Liên lạc (Renraku): '電車遅延のため、10分ほど遅れます。' (Vì tàu trễ nên em sẽ đến muộn tầm 10 phút ạ).\n- Thảo luận (Soudan): 'ちょっとご相談したいことがあるのですが、今よろしいでしょうか。' (Em có chút việc muốn xin ý kiến sếp, bây giờ sếp có tiện không ạ?).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-cnl-1",
        "japanese": "お先に失礼します。— お疲れ様でした！",
        "reading": "おさきにしつれいします。— おつかれさまでした！",
        "romaji": "Osaki ni shitsurei shimasu. — Otsukaresama deshita!",
        "vietnamese": "Tôi xin phép về trước ạ. — Bạn đã vất vả cả ngày rồi!",
        "explanation": "Cặp thoại chào ra về chuẩn mực nơi công sở.",
        "context": "Tan sở cuối ngày"
      },
      {
        "id": "ex-cnl-2",
        "japanese": "課長、昨日の会議の議事録を作成いたしましたので、ご確認お願いいたします。",
        "reading": "かちょう、きのうのかいぎのぎじろくをさくせいい工业しましたので、ごかくにんおねがいいたします。",
        "romaji": "Kachou, kinou no kaigi no gijiroku o sakusei itashimashita node, gokakunin onegai itashimasu.",
        "vietnamese": "Thưa trưởng nhóm, em đã soạn xong biên bản cuộc họp hôm qua rồi, xin nhờ anh kiểm tra giúp em ạ.",
        "explanation": "Báo cáo tiến độ công việc kèm đề nghị kiểm tra lịch sự.",
        "context": "Báo cáo công việc với cấp trên"
      },
      {
        "id": "ex-cnl-3",
        "japanese": "外出してまいります。— いってらっしゃい。",
        "reading": "がいしゅつしてまいります。— いってらっしゃい。",
        "romaji": "Gaishutsu shite mairimasu. — Itterasshai.",
        "vietnamese": "Tôi xin phép ra ngoài đi gặp khách ạ. — Anh đi cẩn thận nhé.",
        "explanation": "Chào khi rời văn phòng đi công việc.",
        "context": "Nhân viên ra ngoài gặp đối tác"
      }
    ],
    "notes": [
      "Trong công ty Nhật, 'お疲れ様です' còn được dùng làm câu mở đầu email thay thế cho câu chào thông thường."
    ],
    "warnings": [
      "Không bao giờ nói 'さようなら' (Sayounara) khi ra về ở công ty; câu đó mang cảm giác như từ biệt vĩnh viễn không gặp lại."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        "title": "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        "reason": "Kính ngữ cơ bản trong môi trường công sở"
      },
      {
        "category": "vocabulary",
        "slug": "phan-cap-do-trang-trong-tu-vung",
        "title": "Phân cấp độ trang trọng của từ vựng: Thân mật đến Lịch sự và Kính cẩn",
        "reason": "Lựa chọn từ ngữ chuẩn mực khi nói chuyện với cấp trên"
      },
      {
        "category": "notes",
        "slug": "bon-nac-thang-van-phong-tieng-nhat",
        "title": "Bốn nấc thang văn phong: Suồng sã, Lịch sự, Khiêm nhường và Tôn kính",
        "reason": "Phân biệt văn phong công sở với văn phong hàng ngày"
      },
      {
        "category": "conversation",
        "slug": "ky-nang-nghe-goi-dien-thoai",
        "title": "Kỹ năng nghe gọi điện thoại cơ bản: Bắt máy, xưng danh, xin nối máy và hẹn gọi lại",
        "reason": "Kỹ năng trực điện thoại chuẩn mực tại nơi làm việc"
      }
    ]
  },
  {
    "id": "c-xin-phep-lich-su",
    "slug": "xin-phep-lich-su-trong-doi-song",
    "categoryId": "conversation",
    "title": "Cách xin phép lịch sự: Từ 〜てもいいですか đến 〜てよろしいでしょうか trong văn phòng và đời sống",
    "japaneseTitle": "許可を求める丁寧な表現：「〜てもいいですか」から「〜てもよろしいでしょうか」",
    "summary": "Nâng cấp khả năng xin phép từ sơ cấp đến trung cấp: Từng bước làm mềm câu nói, thể hiện sự kính trọng đối phương và đạt được sự đồng thuận cao nhất.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Xin phép",
      "Kính ngữ",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-xpl-1",
        "title": "1. Thang đo 4 cấp độ xin phép",
        "content": "- Cấp độ 1 (Bạn bè thân mật): [V-te + もいい？] (トイレ使ってもいい？ - Dùng toilet được không?).\n- Cấp độ 2 (Lịch sự tiêu chuẩn - N5): [V-te + もいいですか] (写真を撮ってもいいですか - Chụp ảnh có được không ạ?).\n- Cấp độ 3 (Trang trọng công sở - N4): [V-te + もよろしいでしょうか] (こちらに座ってもよろしいでしょうか - Tôi xin phép ngồi đây có được không ạ?).\n- Cấp độ 4 (Kính cẩn tuyệt đối - Khiêm nhường sai khiến): [V-sai khiến + ていただいてもよろしいでしょうか] (本日早退させていただけますでしょうか - Xin phép cho em được về sớm hôm nay có được không ạ?).",
        "type": "rule"
      },
      {
        "id": "sec-xpl-2",
        "title": "2. Kỹ thuật đệm lời (Kushon Kotoba) trước khi xin phép",
        "content": "Người Nhật không bao giờ hỏi xin phép thẳng thừng mà luôn đệm trước một câu làm giảm nhẹ tác động:\n- '恐れ入りますが...' (Xin thứ lỗi cho sự đường đột của tôi nhưng mà...).\n- '申し訳ありませんが...' (Thật vô cùng xin lỗi nhưng mà...).\n- 'ご迷惑をおかけしますが...' (Xin làm phiền quý vị nhưng mà...).",
        "type": "pattern"
      },
      {
        "id": "sec-xpl-3",
        "title": "3. Cách hồi đáp khi nhận được lời xin phép",
        "content": "- Đồng ý niềm nở: 'どうぞ、ご自由にどうぞ' (Xin mời, xin cứ tự nhiên ạ).\n- Từ chối khéo léo: '申し訳ありません、こちらはちょっと...' (Thật xin lỗi, ở đây thì hơi kẹt một chút ạ - bỏ lửng câu).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-xpl-1",
        "japanese": "すみません、ここに荷物を置いてもいいですか。",
        "reading": "すみません、ここににもつをおいてもいいですか。",
        "romaji": "Sumimasen, koko ni nimotsu o oite mo ii desu ka.",
        "vietnamese": "Xin lỗi, tôi để hành lý ở đây có được không ạ?",
        "explanation": "Xin phép đặt đồ ở nơi công cộng lịch sự.",
        "context": "Hỏi người ngồi cạnh trên tàu"
      },
      {
        "id": "ex-xpl-2",
        "japanese": "恐れ入りますが、こちらの資料を一部いただいてもよろしいでしょうか。",
        "reading": "おそれいりますが、こちらのしりょうをいちぶいただいてもよろしいでしょうか。",
        "romaji": "Osoreirimasu ga, kochira no shiryou o ichibu itadaite mo yoroshii deshou ka.",
        "vietnamese": "Xin mạn phép hỏi, tôi có thể xin một bản tài liệu này được không ạ?",
        "explanation": "Dùng よろしいでしょうか xin tài liệu tại triển lãm/hội thảo.",
        "context": "Hội chợ triển lãm doanh nghiệp"
      },
      {
        "id": "ex-xpl-3",
        "japanese": "体調が優れないため、本日は早退させていただけないでしょうか。",
        "reading": "たいちょうがすぐれないため、ほんじつはそうたいさせていただけないでしょうか。",
        "romaji": "Taichou ga sugurenai tame, honjitsu wa soutai sasete itadakenai deshou ka.",
        "vietnamese": "Vì sức khỏe không được tốt, xin phép sếp cho em được về sớm hôm nay có được không ạ?",
        "explanation": "Cấu trúc xin phép khiêm nhường chuẩn mực trong công ty.",
        "context": "Xin phép cấp trên về sớm dưỡng bệnh"
      }
    ],
    "notes": [
      "Câu xin phép bỏ lửng đuôi [〜てもいいですか？] với ngữ điệu lên giọng ở cuối câu là phản xạ tự nhiên của người Nhật."
    ],
    "warnings": [
      "Không dùng '〜てもいいですか' với đối tác khách hàng lớn (nghe bị cụt và thiếu độ trang trọng, nên nâng cấp lên '〜てもよろしいでしょうか')."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-temo-va-temo-ii",
        "title": "Phân biệt cấu trúc 〜ても (nhượng bộ) và 〜てもいい (cho phép)",
        "reason": "Ngữ pháp gốc của cấu trúc cho phép 〜てもいい"
      },
      {
        "category": "grammar",
        "slug": "the-sai-khien-shiekikei-va-xin-phep",
        "title": "Thể sai khiến (Shiekikei): Cho phép, bắt buộc và cấu trúc xin phép 〜させてください",
        "reason": "Cấu trúc xin phép khiêm nhường đỉnh cao 〜させていただけますか"
      },
      {
        "category": "conversation",
        "slug": "cach-tu-choi-kheo-leo-trong-tieng-nhat",
        "title": "Nghệ thuật từ chối khéo léo (Kushon Kotoba) tránh làm mất lòng đối phương",
        "reason": "Cách ứng xử khi lời xin phép bị từ chối khéo"
      }
    ]
  },
  {
    "id": "c-quan-cafe",
    "slug": "giao-tiep-tai-quan-cafe",
    "categoryId": "conversation",
    "title": "Giao tiếp tại quán Cafe: Chọn kích cỡ ly, mang đi hay dùng tại quán, chọn loại sữa và đường",
    "japaneseTitle": "カフェでの注文会話：サイズ・店内飲食か持ち帰りか・カスタマイズ",
    "summary": "Tự tin bước vào Starbucks hay các quán cà phê Nhật Bản: Xử lý mượt mà các câu hỏi về kích cỡ ly, thuế suất mang đi/ngồi tại quán, nạp Wi-Fi và xin thêm đá/đường.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Đời sống",
      "Cafe",
      "Gọi món",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cqc-1",
        "title": "1. Câu hỏi đầu tiên: Dùng tại quán hay Mang đi?",
        "content": "Tại Nhật, mức thuế VAT khác nhau: Ngồi tại quán thuế 10%, mang đi thuế 8%. Nhân viên luôn hỏi câu đầu tiên:\n- '店内でお召し上がりですか。お持ち帰りですか。' (Quý khách dùng tại quán hay mang về ạ?).\nCách trả lời:\n- Dùng tại quán: '店内で' (Ten'nai de) hoặc 'ここで飲みます' (Koko de nomimasu).\n- Mang đi: '持ち帰りで' (Mochikaeri de) hoặc 'テイクアウトで' (Teikuauto de).",
        "type": "rule"
      },
      {
        "id": "sec-cqc-2",
        "title": "2. Chọn loại đồ uống, Nóng/Đá và Kích cỡ (Size)",
        "content": "- Nóng hay Đá:\n  + Nóng: ホット (hotto).\n  + Đá: アイス (aisu).\n- Kích cỡ:\n  + Nhỏ: Sサイズ / ショート (Short).\n  + Vừa: Mサイズ / トール (Tall).\n  + Lớn: Lサイズ / グランデ (Grande).\nCấu trúc đặt hàng: [Tên đồ uống + の + Hot/Ice + を + Size + でお願いします].\nVí dụ: 'アイスカフェラテのトールサイズをお願いします。'",
        "type": "pattern"
      },
      {
        "id": "sec-cqc-3",
        "title": "3. Tùy chỉnh (Customization) và Dịch vụ bổ sung",
        "content": "- Giảm đá: '氷少なめでお願いします' (Koori sukuname de onegai shimasu).\n- Đổi sang sữa đậu nành: 'ソイミルクに変更できますか' (Soimiruku ni henkou dekimasu ka).\n- Hỏi mật khẩu Wi-Fi: 'Wi-Fiのパスワードを教えていただけますか。'",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-cqc-1",
        "japanese": "いらっしゃいませ。店内でお召し上がりですか。— はい、店内でお願いします。",
        "reading": "いらっしゃいませ。てん内でおめしあがりですか。— はい、てん内でおねがいします。",
        "romaji": "Irasshaimase. Ten'nai de omeshiagari desu ka. — Hai, ten'nai de onegai shimasu.",
        "vietnamese": "Xin kính chào quý khách. Quý khách dùng tại quán ạ? — Vâng, cho tôi dùng tại quán ạ.",
        "explanation": "Đối thoại xác nhận thuế suất và chỗ ngồi.",
        "context": "Đứng trước quầy thu ngân quán cafe"
      },
      {
        "id": "ex-cqc-2",
        "japanese": "アイスアメリカーノのトールサイズを一つ、氷少なめでお願いします。",
        "reading": "アイスアメリカーノのトールサイズをひとつ、こおりすくなめでおねがいします。",
        "romaji": "Aisu amerikaano no tooru saizu o hitotsu, koori sukuname de onegai shimasu.",
        "vietnamese": "Cho tôi một ly Americano đá cỡ vừa, ít đá nhé.",
        "explanation": "Gọi món đầy đủ chủng loại, kích cỡ và lượng đá.",
        "context": "Gọi món chi tiết"
      },
      {
        "id": "ex-cqc-3",
        "japanese": "レシートはご利用ですか。— いえ、大丈夫です。",
        "reading": "レシートはごりようですか。— いえ、だいじょうぶです。",
        "romaji": "Reshiito wa goriyou desu ka. — Ie, daijoubu desu.",
        "vietnamese": "Quý khách có cần lấy hóa đơn không ạ? — Dạ thôi, không cần đâu ạ.",
        "explanation": "Từ chối lấy hóa đơn nhẹ nhàng với 大丈夫です.",
        "context": "Sau khi thanh toán xong tiền"
      }
    ],
    "notes": [
      "Tại nhiều quán cafe Nhật, sau khi uống xong khách tự mang khay trả về quầy 返却口 (Henkyakuguchi)."
    ],
    "warnings": [
      "Nếu đã nói 'mang đi' (8% thuế) thì không được tự ý bê đồ ra bàn trong quán ngồi uống."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "goi-mon-tai-nha-hang-quan-an",
        "title": "Giao tiếp tại nhà hàng: Đặt bàn, gọi món, xin nước uống và yêu cầu tính tiền",
        "reason": "Mẫu câu gọi món tại nhà hàng ăn uống"
      },
      {
        "category": "conversation",
        "slug": "mua-hang-hoi-gia-va-thanh-toan",
        "title": "Mẫu câu mua sắm, hỏi giá, thử đồ và thanh toán tại cửa hàng & konbini",
        "reason": "Cách thanh toán tiền mặt hoặc quét mã QR"
      },
      {
        "category": "vocabulary",
        "slug": "pho-tu-chi-muc-do-thuong-gap",
        "title": "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
        "reason": "Các phó từ chỉ lượng đá, đường, sữa"
      }
    ]
  },
  {
    "id": "c-nha-ga-tau-dien",
    "slug": "xu-ly-tinh-huong-tai-ga-tau-dien",
    "categoryId": "conversation",
    "title": "Xử lý tình huống tại ga tàu điện: Mua vé, nạp tiền thẻ IC, hỏi tuyến tàu và tìm đồ thất lạc",
    "japaneseTitle": "駅でのトラブル・手続き会話：ICカード・乗り換え・忘れ物センター",
    "summary": "Tất tần tật các mẫu câu đối thoại thực tế với nhân viên ga tàu Nhật Bản (Ekiin): Tìm đường đổi tuyến, nạp thêm tiền thẻ IC khi bị kẹt ở cửa soát vé và tìm đồ bỏ quên.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Ga tàu",
      "Giao thông",
      "Xử lý tình huống",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cng-1",
        "title": "1. Hỏi tuyến tàu và Sân ga (Ke ga)",
        "content": "Khi đứng giữa mê cung các ga lớn như Shinjuku, Shibuya:\n- 'すみません、渋谷へ行くには何番線に乗ればいいですか。' (Xin lỗi, để đi đến Shibuya thì tôi nên lên tàu ở sân ga số mấy ạ?).\n- 'この電車は秋葉原に止まりますか。' (Chuyến tàu này có dừng ở Akihabara không ạ?).\n- '次の急行に乗れば間に合いますか。' (Nếu lên chuyến tàu tốc hành kế tiếp thì có kịp giờ không?).",
        "type": "rule"
      },
      {
        "id": "sec-cng-2",
        "title": "2. Bị kẹt ở Cửa soát vé (改札口で止められた)",
        "content": "Khi quẹt thẻ IC mà cửa soát vé đóng sập lại và kêu tít tít, hãy cầm thẻ tới quầy nhân viên có ô kính bên cạnh:\n- 'チャージしたいのですが、精算機はどこですか。' (Tôi muốn nạp thêm tiền, máy tinh toán cước ở đâu ạ?).\n- '残高が足りないみたいです。精算をお願いします。' (Hình như số dư không đủ, xin làm thủ tục điều chỉnh cước giúp tôi với ạ).",
        "type": "pattern"
      },
      {
        "id": "sec-cng-3",
        "title": "3. Tìm đồ thất lạc (忘れ物 - Wasuremono)",
        "content": "Khi để quên ô, túi xách trên tàu, hãy tới 忘れ物センター (Trung tâm đồ thất lạc):\n- '電車の中に傘を忘れてしまったのですが...' (Tôi đã lỡ để quên chiếc ô ở trên tàu điện...).\n- Nhân viên sẽ hỏi: '何時頃の、どの路線の電車でしたか。' (Tàu tuyến nào, vào khoảng mấy giờ thế ạ?). Hãy chuẩn bị trước mô tả đồ vật.",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-cng-1",
        "japanese": "すみません、東京駅へ行きたいのですが、どの電車に乗ればいいですか。",
        "reading": "すみません、とうきょうえきへいきたいのですが、どのでんしゃにのればいいですか。",
        "romaji": "Sumimasen, Toukyou-eki e ikitai no desu ga, dono densha ni noreba ii desu ka.",
        "vietnamese": "Xin lỗi, tôi muốn đi đến ga Tokyo thì nên lên chuyến tàu nào ạ?",
        "explanation": "Mẫu câu hỏi tuyến tàu kinh điển khi ở ga lạ.",
        "context": "Hỏi nhân viên trực ban nhà ga"
      },
      {
        "id": "ex-cng-2",
        "japanese": "この切符で特急に乗れますか。— 特急券が別途必要になります。",
        "reading": "このきっぷでとっきゅうにのれますか。— とっきゅうけんがべっとひつようになります。",
        "romaji": "Kono kippu de tokkyuu ni noremasu ka. — Tokkyuuken ga betto hitsuyou ni narimasu.",
        "vietnamese": "Bằng chiếc vé này tôi có lên được tàu đặc cấp không ạ? — Quý khách cần mua thêm vé đặc cấp riêng ạ.",
        "explanation": "Hỏi điều kiện lên các chuyến tàu nhanh.",
        "context": "Kiểm tra vé trước khi lên tàu"
      },
      {
        "id": "ex-cng-3",
        "japanese": "網棚の上に黒いリュックを忘れてしまいました。",
        "reading": "あみだなのうえにくろいリュックをわすれてしまいました。",
        "romaji": "Amidana no ue ni kuroi ryukku o wasurete shimaimashita.",
        "vietnamese": "Tôi đã lỡ để quên chiếc balo màu đen ở trên giá để hành lý.",
        "explanation": "Báo cáo vị trí bỏ quên đồ trên tàu (網棚 - giá lưới để đồ).",
        "context": "Khai báo tại quầy đồ thất lạc"
      }
    ],
    "notes": [
      "Tại các nhà ga Nhật, tỉ lệ tìm lại được đồ thất lạc là cực kỳ cao (trên 80%), đừng ngần ngại báo ngay cho nhân viên nhà ga."
    ],
    "warnings": [
      "Đừng cố nhảy qua cửa soát vé khi bị kẹt thẻ, điều này bị coi là hành vi trốn vé và có thể bị cảnh sát xử lý."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "tu-vung-ngu-canh-nha-ga-tau-dien",
        "title": "Hệ thống từ vựng thiết yếu tại ga tàu điện: 改札, 切符, 乗り換え, ホーム",
        "reason": "Từ vựng chuyên ngành ga tàu điện và đường sắt"
      },
      {
        "category": "conversation",
        "slug": "hoi-va-chi-duong-trong-thuc-te",
        "title": "Hỏi và chỉ đường thực tế tại Nhật: Cấu trúc câu và từ vựng định hướng",
        "reason": "Hỏi đường và tìm cổng ra tại nhà ga lớn"
      },
      {
        "category": "conversation",
        "slug": "nho-giup-do-va-yeu-cau-lich-su",
        "title": "Cách nhờ vả và đưa ra yêu cầu lịch sự: Từ 〜てください đến 〜ていただけませんか",
        "reason": "Nhờ nhân viên nhà ga hỗ trợ hành lý và tìm đường"
      }
    ]
  },
  {
    "id": "c-xe-buyt",
    "slug": "di-xe-buyt-tai-nhat-ban",
    "categoryId": "conversation",
    "title": "Đi xe buýt tại Nhật: Cách lên cửa trước/sau, bấm chuông dừng, lấy vé số thứ tự và thanh toán",
    "japaneseTitle": "日本のバスの乗り方・会話：整理券・降車ボタン・運賃の支払い",
    "summary": "Chinh phục phương tiện xe buýt tại Nhật Bản mà không sợ bỡ ngỡ: Phân biệt buýt cước đồng giá (Tokyo) và buýt cước theo chặng (Kyoto/ngoại ô), cách bấm nút dừng và đổi tiền lẻ.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Xe buýt",
      "Giao thông",
      "Đời sống",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cxb-1",
        "title": "1. Hai quy tắc lên xe buýt trái ngược nhau ở Nhật",
        "content": "- Hệ thống Cước đồng giá (Phổ biến ở nội thành Tokyo):\n  + Lên cửa TRƯỚC, quẹt thẻ IC hoặc trả tiền luôn lúc lên -> Xuống cửa SAU.\n- Hệ thống Cước theo chặng cự ly (Phổ biến ở Kyoto và các tỉnh ngoại ô):\n  + Lên cửa SAU, rút một chiếc vé số thứ tự (整理券 - Seiriken) hoặc quẹt thẻ IC ở cửa sau.\n  + Khi xuống xe: Nhìn bảng điện tử phía trên tài xế, số trên vé tương ứng số tiền phải trả -> Xuống cửa TRƯỚC và bỏ tiền/vé vào hộp.",
        "type": "rule"
      },
      {
        "id": "sec-cxb-2",
        "title": "2. Bấm chuông dừng xe (とまります)",
        "content": "Khi nghe loa phát thanh đọc tên trạm bạn muốn xuống:\n- Nhấn nút dừng xe (降車ボタン) có chữ とまります gắn dọc thân xe.\n- Tuyệt đối ngồi yên tại chỗ cho tới khi xe buýt DỪNG HẲN mới đứng dậy bước ra cửa trước (tài xế sẽ nhắc: '完全に止まるまでお立ちにならないでください').",
        "type": "pattern"
      },
      {
        "id": "sec-cxb-3",
        "title": "3. Mẫu câu giao tiếp với bác tài xế",
        "content": "- Hỏi xe có đi qua điểm cần tới không: 'すみません、このバスは京都駅へ行きますか。' (Bác tài ơi, xe này có đi tới ga Kyoto không ạ?).\n- Đổi tiền lẻ trên xe: Máy thanh toán cạnh tài xế có khe đổi tiền tự động (両替 - Ryougae) cho tờ 1.000 yên hoặc đồng 500 yên.\n- Nói khi xuống xe: 'ありがとうございました！' (Cảm ơn bác tài!).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-cxb-1",
        "japanese": "すみません、金閣寺へ行くにはどのバスに乗ればいいですか。",
        "reading": "すみません、きんかくじへいくにはどのバスにのればいいですか。",
        "romaji": "Sumimasen, Kinkakuji e iku ni wa dono basu ni noreba ii desu ka.",
        "vietnamese": "Xin lỗi, để đi chùa Kinkakuji thì tôi nên lên tuyến xe buýt nào ạ?",
        "explanation": "Hỏi tuyến xe buýt tại trạm chờ.",
        "context": "Hỏi người dân địa phương tại trạm dừng"
      },
      {
        "id": "ex-cxb-2",
        "japanese": "千円札の両替をお願いできますか。",
        "reading": "せんえんさつのりょうがえをおねがいできますか。",
        "romaji": "Sen'ensatsu no ryougae o onegai dekimasu ka.",
        "vietnamese": "Bác tài cho cháu xin đổi tờ 1.000 yên ra tiền lẻ được không ạ?",
        "explanation": "Nhờ đổi tiền lẻ trên xe buýt khi không có xu.",
        "context": "Thao tác trước khi xuống xe buýt"
      },
      {
        "id": "ex-cxb-3",
        "japanese": "降ります！後ろのドアを開けていただけますか。",
        "reading": "おります！うしろのドアをあけていただけますか。",
        "romaji": "Orimasu! Ushiro no doa o akete itadakemasu ka.",
        "vietnamese": "Tôi xuống trạm này ạ! Bác tài mở giúp tôi cửa sau được không ạ?",
        "explanation": "Hô to khi xe đông người chưa kịp xuống.",
        "context": "Tình huống đông khách giờ cao điểm"
      }
    ],
    "notes": [
      "Hầu hết các xe buýt thành phố hiện nay đều chấp nhận quẹt thẻ Suica / Pasmo / Icoca cực kỳ tiện lợi."
    ],
    "warnings": [
      "Không đứng dậy bước đi trong lúc xe buýt đang lăn bánh; tài xế Nhật có thể bấm còi hoặc nhắc nhở nghiêm khắc vì lý do an toàn."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "tro-tu-o-dich-tac-dong-va-khong-gian",
        "title": "Trợ từ を (o): Đích tác động của hành động và bẫy không gian chuyển động rời khỏi",
        "reason": "Trợ từ を khi xuống phương tiện giao thông (バスを降りる)"
      },
      {
        "category": "conversation",
        "slug": "xu-ly-tinh-huong-tai-ga-tau-dien",
        "title": "Xử lý tình huống tại ga tàu điện: Mua vé, nạp tiền thẻ IC, hỏi tuyến tàu",
        "reason": "Phối hợp đi tàu điện và xe buýt tại Nhật"
      },
      {
        "category": "vocabulary",
        "slug": "tu-vung-trai-nghia-khong-gian-vi-tri",
        "title": "Cặp từ trái nghĩa vị trí không gian: 上/下, 前/後, 入る/出る",
        "reason": "Từ vựng cửa trước, cửa sau xe buýt"
      }
    ]
  },
  {
    "id": "c-khach-san",
    "slug": "giao-tiep-tai-khach-san",
    "categoryId": "conversation",
    "title": "Giao tiếp tại khách sạn: Check-in, gửi hành lý trước giờ nhận phòng, hỏi dịch vụ và Check-out",
    "japaneseTitle": "ホテルでの英会話・日本語会話：チェックイン・荷物預かり・チェックアウト",
    "summary": "Tự tin làm thủ tục tại khách sạn Nhật Bản: Đọc tên đặt phòng, gửi vali trước giờ nhận phòng để thảnh thơi đi chơi, mượn sạc pin và làm thủ tục trả phòng êm thấm.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Khách sạn",
      "Du lịch",
      "Dịch vụ",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cks-1",
        "title": "1. Thủ tục Check-in (Nhận phòng)",
        "content": "Khi bước vào quầy lễ tân (フロント):\n- 'チェックインをお願いします。予約した［Tên bạn］です。' (Cho tôi làm thủ tục nhận phòng ạ. Tôi là [Tên] đã đặt trước).\n- Lễ tân sẽ đáp: 'パスポートのご提示をお願いいたします。' (Xin quý khách xuất trình hộ chiếu ạ).\n- Điền thông tin vào phiếu lưu trú (宿泊カード) và nhận chìa khóa phòng (ルームキー).",
        "type": "rule"
      },
      {
        "id": "sec-cks-2",
        "title": "2. Gửi hành lý trước giờ nhận phòng hoặc sau khi Check-out",
        "content": "Giờ nhận phòng thường là 15:00. Nếu bạn tới sớm lúc 11:00:\n- 'チェックイン前ですが、荷物を預かっていただけますか。' (Chưa tới giờ nhận phòng nhưng khách sạn có thể giữ giúp tôi hành lý được không ạ?).\n- Lễ tân sẽ gắn thẻ số hành lý (お預かり札) và trao thẻ cho bạn.",
        "type": "pattern"
      },
      {
        "id": "sec-cks-3",
        "title": "3. Hỏi mượn đồ dùng và Check-out",
        "content": "- Mượn sạc điện thoại: 'スマートフォンの充電器をお借りできますか。'\n- Hỏi giờ ăn sáng: '朝食は何時から何時までですか。'\n- Làm thủ tục trả phòng: 'チェックアウトをお願いします。大変お世話になりました。' (Cho tôi trả phòng ạ. Chân thành cảm ơn sự phục vụ chu đáo của khách sạn).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-cks-1",
        "japanese": "予約しているナムと申します。チェックインをお願いします。",
        "reading": "よやくしているナムともうします。チェックインをおねがいします。",
        "romaji": "Yoyaku shite iru Namu to moushimasu. Chekkuin o onegai shimasu.",
        "vietnamese": "Tôi là Nam đã đặt phòng trước. Xin làm thủ tục nhận phòng giúp tôi ạ.",
        "explanation": "Xưng tên khiêm tốn bằng と申します tại quầy lễ tân.",
        "context": "Đến khách sạn làm thủ tục"
      },
      {
        "id": "ex-cks-2",
        "japanese": "チェックアウト後も夕方まで荷物を預かってもらえますか。",
        "reading": "チェックアウトごもゆうがたまでににもつをあずかってもらえますか。",
        "romaji": "Chekkuauto-go mo yuugata made nimotsu o azukatte moraemasu ka.",
        "vietnamese": "Sau khi trả phòng xong, khách sạn có thể giữ hành lý giúp tôi tới chiều tối được không ạ?",
        "explanation": "Gửi vali lại khách sạn để đi chơi tiếp.",
        "context": "Sáng ngày trả phòng"
      },
      {
        "id": "ex-cks-3",
        "japanese": "お部屋のWi-Fiはパスワードなしでご利用いただけます。",
        "reading": "おへやのワイファイはパスワードなしでごりよういただけます。",
        "romaji": "Oheya no Wi-Fi wa pasuwaado nashi de goriyou itadakemasu.",
        "vietnamese": "Wi-Fi trong phòng có thể sử dụng mà không cần mật khẩu ạ.",
        "explanation": "Lễ tân hướng dẫn tiện ích phòng ở.",
        "context": "Nhận phòng tại lễ tân"
      }
    ],
    "notes": [
      "Tại khách sạn ryokan truyền thống, khách phải tháo giày tại sảnh vào (Genkan) và đi dép chuyên dụng của khách sạn."
    ],
    "warnings": [
      "Tại Nhật, tiền boa (Tip) không hề tồn tại; đưa thêm tiền thừa cho lễ tân sẽ làm họ bối rối và chạy theo trả lại."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "kinh-ngu-giao-tiep-hang-ngay-cho-nguoi-moi",
        "title": "Cẩm nang Kính ngữ (Keigo) thực tế: Tôn kính ngữ vs Khiêm nhường ngữ",
        "reason": "Lắng nghe kính ngữ phục vụ khách sạn của nhân viên"
      },
      {
        "category": "conversation",
        "slug": "nho-giup-do-va-yeu-cau-lich-su",
        "title": "Cách nhờ vả và đưa ra yêu cầu lịch sự: Từ 〜てください đến 〜ていただけませんか",
        "reason": "Cách nhờ lễ tân gọi taxi hoặc bảo quản đồ"
      },
      {
        "category": "grammar",
        "slug": "the-qua-khu-takei-va-mau-cau-quan-trong",
        "title": "Thể quá khứ ngắn (Ta-kei) và các mẫu câu: 〜たり〜たり, 〜後で",
        "reason": "Mẫu câu hỏi sau khi đã trả phòng xong (チェックアウトした後で)"
      }
    ]
  },
  {
    "id": "c-benh-vien",
    "slug": "di-kham-tai-benh-vien-phong-kham",
    "categoryId": "conversation",
    "title": "Đi khám tại phòng khám/bệnh viện: Khai phiếu hỏi bệnh, mô tả triệu chứng và lấy đơn thuốc",
    "japaneseTitle": "病院・クリニックでの受診会話：問診票・症状の伝達・処方箋",
    "summary": "Vượt qua nỗi sợ rào cản ngôn ngữ khi bị ốm tại Nhật: Cách mô tả chi tiết cơn đau, nhiệt độ sốt, dị ứng thuốc và hiểu rõ lời dặn dò của bác sĩ.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Bệnh viện",
      "Sức khỏe",
      "Y tế",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cbv-1",
        "title": "1. Tại quầy tiếp tân (受付 - Uketsuke)",
        "content": "Khi bước vào phòng khám:\n- 'すみません、熱があって頭が痛いのですが、診察をお願いできますか。' (Xin lỗi, tôi bị sốt và đau đầu, tôi xin phép khám bệnh được không ạ?).\n- Lễ tân sẽ yêu cầu: '保険証はお持ちですか。問診票をご記入ください。' (Bạn có mang thẻ bảo hiểm không? Xin hãy điền vào phiếu hỏi bệnh).",
        "type": "rule"
      },
      {
        "id": "sec-cbv-2",
        "title": "2. Trong phòng khám với Bác sĩ (診察室 - Shinsatsushitsu)",
        "content": "Bác sĩ sẽ hỏi: '今日はどうされましたか。' (Hôm nay bạn bị làm sao thế?).\nMô tả triệu chứng bằng các mẫu câu rõ ràng:\n- '一昨日の夜から38度の熱が出ています。' (Từ đêm hôm kia tôi bị sốt 38 độ).\n- '喉が痛くて、唾を飲み込むのもつらいです。' (Họng đau rát, nuốt nước bọt cũng thấy buốt đau).\n- 'お腹が痛くて、下痢が続いています。' (Bụng đau quặn và bị tiêu chảy liên tục).",
        "type": "pattern"
      },
      {
        "id": "sec-cbv-3",
        "title": "3. Nhận thuốc tại Nhà thuốc kê đơn (調剤薬局)",
        "content": "Mang đơn thuốc (処方箋) sang hiệu thuốc kế bên:\n- Dược sĩ dặn: 'この薬は毎食後、1回1錠飲んでください。眠くなる成分が入っていますので、運転はお控えください。' (Thuốc này uống sau mỗi bữa ăn, mỗi lần 1 viên. Vì có thành phần gây buồn ngủ nên xin tránh lái xe).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-cbv-1",
        "japanese": "昨日から胃がキリキリ痛むのですが、診てもらえますか。",
        "reading": "きのうからいがキリキリいたむのですが、みてもらえますか。",
        "romaji": "Kinou kara i ga kirikiri itamu no desu ga, mite moraemasu ka.",
        "vietnamese": "Từ hôm qua dạ dày tôi cứ đau nhói từng cơn, bác sĩ khám giúp tôi được không ạ?",
        "explanation": "Dùng từ tượng hình キリキリ miêu tả cơn đau dạ dày quặn thắt.",
        "context": "Bác sĩ thăm khám"
      },
      {
        "id": "ex-cbv-2",
        "japanese": "薬のアレルギーや、現在飲んでいるお薬はありますか。",
        "reading": "くすりのアレルギーや、げんざいのんでいるおくすりはありますか。",
        "romaji": "Kusuri no arerugii ya, genzai nonde iru okusuri wa arimasu ka.",
        "vietnamese": "Bạn có dị ứng với thuốc nào, hoặc hiện tại đang uống loại thuốc nào khác không?",
        "explanation": "Bác sĩ kiểm tra tiền sử dị ứng trước khi kê đơn.",
        "context": "Khám bệnh tại bệnh viện"
      },
      {
        "id": "ex-cbv-3",
        "japanese": "お大事になさってください。— ありがとうございました。",
        "reading": "おだいじになさってください。— ありがとうございました。",
        "romaji": "Odaiji ni nasatte kudasai. — Arigatou gozaimashita.",
        "vietnamese": "Chúc bạn mau chóng bình phục sức khỏe nhé. — Cảm ơn bác sĩ nhiều ạ.",
        "explanation": "Câu chào chúc mau khỏe kinh điển khi rời bệnh viện.",
        "context": "Ra về sau khi lấy thuốc"
      }
    ],
    "notes": [
      "Câu [お大事に] (Odaiji ni) là câu chúc độc quyền chỉ dành riêng cho người bị ốm đau bệnh tật."
    ],
    "warnings": [
      "Không bao giờ chúc người đang ốm là '頑張ってください' (Hãy cố lên nhé) vì người ốm đang kiệt sức, nghe sẽ rất vô tâm."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "cum-tu-collocation-suc-khoe-y-te",
        "title": "Collocation sức khỏe & y tế: 風邪を引く, 薬を飲む, 熱がある, 痛みが治まる",
        "reason": "Các cụm từ cố định miêu tả cảm sốt và đau nhức"
      },
      {
        "category": "vocabulary",
        "slug": "tu-vung-ngu-canh-benh-vien-nha-thuoc",
        "title": "Từ vựng bối cảnh Bệnh viện & Nhà thuốc: 内科, 処方箋, 保険証, 症状",
        "reason": "Từ vựng các chuyên khoa và thủ tục bảo hiểm y tế"
      },
      {
        "category": "grammar",
        "slug": "the-phu-dinh-naikei-va-mau-cau-bat-buoc",
        "title": "Thể phủ định ngắn (Naikei) và mẫu câu: 〜なければならない, 〜なくてもいい",
        "reason": "Hiểu hướng dẫn uống thuốc trước/sau ăn của dược sĩ"
      }
    ]
  },
  {
    "id": "c-dien-thoai",
    "slug": "ky-nang-nghe-goi-dien-thoai",
    "categoryId": "conversation",
    "title": "Kỹ năng nghe gọi điện thoại cơ bản: Bắt máy, xưng danh, xin nối máy và hẹn gọi lại",
    "japaneseTitle": "電話応対の基本フレーズ：名乗り・取り次ぎ・折り返しの約束",
    "summary": "Chinh phục nỗi ám ảnh lớn nhất của người học tiếng Nhật - Nghe gọi điện thoại: Quy chuẩn xưng danh, xin gặp người phụ trách và cách xử lý khi nghe không kịp.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Điện thoại",
      "Công sở",
      "Kính ngữ",
      "N4"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cdt-1",
        "title": "1. Bắt máy và Xưng danh (名乗り - Nanori)",
        "content": "Khi điện thoại đổ chuông (chuông reo dưới 3 hồi):\n- Bắt máy: 'はい、◯◯会社でございます。' (Vâng, công ty ◯◯ xin nghe ạ).\n- Nếu để chuông reo quá 3 hồi mới bắt máy: 'お待たせいたしました。◯◯でございます。' (Xin lỗi đã để quý khách phải chờ đợi).\nKhi bạn là người gọi đi:\n- 'いつもお世話になっております。ABCの［Tên bạn］と申します。' (Cảm ơn quý công ty đã luôn giúp đỡ. Tôi là [Tên] từ công ty ABC ạ).",
        "type": "rule"
      },
      {
        "id": "sec-cdt-2",
        "title": "2. Xin nối máy gặp người phụ trách (取り次ぎ - Toritsugi)",
        "content": "Mẫu câu xin gặp người phụ trách:\n- '営業部の田中様はいらっしゃいますでしょうか。' (Dạ cho em hỏi có anh Tanaka ở phòng kinh doanh ở đó không ạ?).\nNếu người đó vắng mặt, người nghe sẽ nói:\n- 'あいにく田中は外出しております。' (Tiếc là anh Tanaka hiện đang đi ra ngoài mất rồi ạ - chú ý hạ thấp người công ty mình, bỏ -san).",
        "type": "pattern"
      },
      {
        "id": "sec-cdt-3",
        "title": "3. Hẹn gọi lại (折り返し - Orikaeshi) và Cứu nguy khi nghe không rõ",
        "content": "- Nhờ gọi lại: '戻りましたら、折り返しお電話をいただけますでしょうか。' (Khi anh ấy về, nhờ anh ấy gọi lại cho tôi được không ạ?).\n- Khi đường truyền rè hoặc nghe không kịp: '少々お電話が遠いようでございますが、もう一度お願いできますでしょうか。' (Dường như đường truyền điện thoại hơi nhỏ, xin phép quý khách nói lại một lần nữa được không ạ?). Tuyệt đối không nói 'え？' (Hả?).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-cdt-1",
        "japanese": "はい、サクラ商事でございます。— いつもお世話になっております。ベトナム貿易のナムと申します。",
        "reading": "はい、サクラしょうじでございます。— いつもおせわになっております。ベトナムぼうえきのナムともうします。",
        "romaji": "Hai, Sakura Shouji de gozaimasu. — Itsumo osewa ni natte orimasu. Betonamu Boueki no Namu to moushimasu.",
        "vietnamese": "Vâng, công ty Sakura xin nghe ạ. — Chào quý công ty. Tôi là Nam bên công ty Thương mại Việt Nam ạ.",
        "explanation": "Thủ tục bắt máy và xưng danh đối tác chuẩn xác 100%.",
        "context": "Bắt đầu cuộc gọi làm việc"
      },
      {
        "id": "ex-cdt-2",
        "japanese": "恐れ入りますが、もう一度お名前を伺ってもよろしいでしょうか。",
        "reading": "おそれいりますが、もういちどおなまえをうかがってもよろしいでしょうか。",
        "romaji": "Osoreirimasu ga, mou ichido onamae o ukagatte mo yoroshii deshou ka.",
        "vietnamese": "Xin mạn phép hỏi lại, quý khách có thể nhắc lại quý danh một lần nữa được không ạ?",
        "explanation": "Hỏi lại tên khách hàng khéo léo khi nghe chưa rõ.",
        "context": "Ghi chép thông tin người gọi"
      },
      {
        "id": "ex-cdt-3",
        "japanese": "こちらから折り返しお電話いたしますので、お電話番号をお願いできますか。",
        "reading": "こちらからおりかえしおでんわいたしますので、おでんわばんごうをおねがいできますか。",
        "romaji": "Kochira kara orikaeshi odenwa itashimasu node, odenwa bangou o onegai dekimasu ka.",
        "vietnamese": "Phía chúng tôi sẽ gọi điện lại ngay sau, xin quý khách cho biết số điện thoại ạ.",
        "explanation": "Chủ động hẹn gọi lại để không làm tốn cước của khách.",
        "context": "Xử lý khi người cần gặp đang bận họp"
      }
    ],
    "notes": [
      "Quy tắc vàng khi cúp máy: Luôn đợi người có vai vế cao hơn (khách hàng, sếp) cúp máy trước, hoặc ấn nút ngắt máy thật khẽ sau 3 giây."
    ],
    "warnings": [
      "Không bao giờ nói '聞こえません' (Tôi không nghe thấy bạn nói gì); người Nhật luôn đổ lỗi cho đường truyền: 'お電話が少し遠いようでございます'."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "cum-tu-collocation-sinh-hoat-doi-song",
        "title": "Collocation thiết yếu trong sinh hoạt: 電話をかける, 写真を撮る, 約束をする",
        "reason": "Cụm từ tự nhiên: 電話をかける, 電話に出る"
      },
      {
        "category": "conversation",
        "slug": "giao-tiep-noi-lam-viec-aisatsu",
        "title": "Giao tiếp nơi làm việc: Chào buổi sáng, chào ra về, báo cáo Horenso",
        "reason": "Ứng dụng kỹ năng nghe điện thoại tại văn phòng"
      },
      {
        "category": "notes",
        "slug": "desu-masu-va-ranh-gioi-lich-su",
        "title": "Desu / Masu không phải lúc nào cũng là 'lịch sự tuyệt đối': Sắc thái khoảng cách",
        "reason": "Giọng điệu và ngữ điệu lịch sự qua điện thoại"
      }
    ]
  },
  {
    "id": "c-dat-lich-hen",
    "slug": "cach-dat-lich-hen-va-xac-nhan",
    "categoryId": "conversation",
    "title": "Cách đặt lịch hẹn và xác nhận thời gian: Hẹn gặp giáo viên, đặt chỗ nhà hàng/dịch vụ",
    "japaneseTitle": "予約と日程調整の会話：アポイントメントの取り付けと確認",
    "summary": "Tự tin gọi điện đặt bàn ăn, xếp lịch hẹn gặp giáo sư hoặc đối tác: Cách đề xuất khung giờ, xác nhận lại mốc thời gian và xử lý khi bị trùng lịch khéo léo.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Đặt hẹn",
      "Thời gian",
      "Lịch trình",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cdh-1",
        "title": "1. Đặt bàn nhà hàng / Tiệm cắt tóc (予約 - Yoyaku)",
        "content": "Các thông tin cốt lõi bắt buộc phải nêu:\n1. Thời gian: Ngày nào, mấy giờ (◯月◯日の◯時).\n2. Số lượng người: Mấy người (◯名です).\n3. Tên người đặt và số điện thoại.\nMẫu câu mở đầu: '予約をお願いしたいのですが、今週の土曜日の夜7時に4名で席は空いていますでしょうか。' (Tôi muốn xin đặt chỗ, tối thứ Bảy tuần này lúc 7 giờ có bàn trống cho 4 người không ạ?).",
        "type": "rule"
      },
      {
        "id": "sec-cdh-2",
        "title": "2. Xếp lịch hẹn gặp đối tác / Giáo sư (日程調整)",
        "content": "Khi muốn xin cái hẹn gặp mặt:\n- Đưa ra nhiều phương án lựa chọn: '来週の火曜日の午後か、木曜日の午前中はいかがでしょうか。' (Chiều thứ Ba hoặc sáng thứ Năm tuần tới liệu có tiện cho anh không ạ?).\n- Nếu thời gian bên kia đưa ra không tiện: 'あいにくその時間は先約がございまして... 翌日ではいかがでしょうか。' (Rất tiếc thời gian đó tôi đã có hẹn trước mất rồi... chuyển sang ngày hôm sau có được không ạ?).",
        "type": "pattern"
      },
      {
        "id": "sec-cdh-3",
        "title": "3. Nhắc lại xác nhận (Repeat Confirmation)",
        "content": "Trước khi kết thúc cuộc hẹn, luôn lặp lại thông tin bằng cấu trúc:\n- '復唱いたします。◯月◯日◯時、◯名様でご予約を承りました。' (Tôi xin phép nhắc lại để xác nhận: Đã nhận đặt chỗ cho quý khách vào lúc ◯ giờ ngày ◯ tháng ◯ cho ◯ người ạ).\n- Đáp lại: 'はい、間違いありません。よろしくお願いいたします。'",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-cdh-1",
        "japanese": "明日の午後2時に美容院の予約を取りたいのですが、空いていますか。",
        "reading": "あすのごごにじにびよういんのよやくをとりたいのですが、あいていますか。",
        "romaji": "Asu no gogo niji ni biyouin no yoyaku o toritai no desu ga, aite imasu ka.",
        "vietnamese": "Tôi muốn đặt lịch làm tóc vào 2 giờ chiều ngày mai, quán có còn chỗ trống không ạ?",
        "explanation": "Đặt chỗ tiệm làm tóc thân thiện, lịch sự.",
        "context": "Gọi điện thoại đặt dịch vụ"
      },
      {
        "id": "ex-cdh-2",
        "japanese": "それでは、来週の水曜日の15時に貴社へお伺いいたします。",
        "reading": "それでは、らいしゅうのすいようびのじゅうごじにきしゃへおうかがいいたします。",
        "romaji": "Soredewa, raishuu no suiyoubi no juugoji ni kisha e oukagai itashimasu.",
        "vietnamese": "Vậy thì, tôi xin phép sẽ ghé thăm quý công ty vào lúc 15 giờ thứ Tư tuần tới ạ.",
        "explanation": "Dùng khiêm nhường ngữ お伺いいたします khi hẹn đến thăm công ty đối tác.",
        "context": "Chốt lịch hẹn công tác"
      },
      {
        "id": "ex-cdh-3",
        "japanese": "日程の変更をお願いすることは可能でしょうか。",
        "reading": "にっていへのへんこうをおねがいすることはかのうでしょうか。",
        "romaji": "Nittei no henkou o onegai suru koto wa kanou deshou ka.",
        "vietnamese": "Liệu tôi có thể xin phép thay đổi lịch hẹn đã định được không ạ?",
        "explanation": "Mẫu câu xin dời lịch hẹn mềm mỏng.",
        "context": "Bị sự cố đột xuất cần đổi lịch"
      }
    ],
    "notes": [
      "Tại Nhật Bản, hủy hẹn vào phút chót (Cancel không báo trước) là hành vi bị kiêng kị nặng nề nhất; nếu không thể đến, bắt buộc phải gọi điện xin lỗi và báo hủy trước ít nhất vài tiếng."
    ],
    "warnings": [
      "Không bao giờ đến muộn hẹn ở Nhật; luôn có mặt trước giờ hẹn từ 5 đến 10 phút."
    ],
    "relatedArticles": [
      {
        "category": "kanji",
        "slug": "chu-han-nhom-thoi-gian",
        "title": "Chữ Hán nhóm Thời gian: 年, 月, 日, 時, 分, 今, 間 và các biến âm đặc biệt",
        "reason": "Từ vựng chỉ ngày tháng và khung giờ khi chốt hẹn"
      },
      {
        "category": "vocabulary",
        "slug": "cum-tu-collocation-sinh-hoat-doi-song",
        "title": "Collocation thiết yếu trong sinh hoạt: 電話をかける, 写真を撮る, 約束をする",
        "reason": "Cụm từ 予約をする và 約束をする"
      },
      {
        "category": "conversation",
        "slug": "cach-tu-choi-kheo-leo-trong-tieng-nhat",
        "title": "Nghệ thuật từ chối khéo léo (Kushon Kotoba) tránh làm mất lòng đối phương",
        "reason": "Cách đổi ngày khéo léo khi bị trùng lịch"
      }
    ]
  },
  {
    "id": "c-moi-moc-ru-re",
    "slug": "nghe-thuat-moi-moc-ru-re",
    "categoryId": "conversation",
    "title": "Nghệ thuật rủ rê và mời mọc: Từ thân mật 〜ない？/〜よう đến lịch sự 〜ませんか",
    "japaneseTitle": "誘いの表現テクニック：「〜ない？」「〜よう」から「〜ませんか」まで",
    "summary": "Tuyệt chiêu rủ bạn bè, đồng nghiệp đi ăn uống, xem phim: Phân cấp độ quan hệ từ thân mật đến lịch sự, cách rào trước để đối phương không cảm thấy bị ép buộc.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Mời mọc",
      "Rủ rê",
      "Quan hệ bạn bè",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cmm-1",
        "title": "1. Thang đo 3 cấp độ mời mọc",
        "content": "- Cấp độ Thân mật (Bạn bè thân thiết): Dùng thể phủ định ngắn lên giọng [V-nai？] hoặc thể ý chí [V-ou].\n  + '今夜、ご飯食べに行かない？' (Tối nay đi ăn cơm không?).\n  + '映画観に行こうよ！' (Đi xem phim thôi nào!).\n- Cấp độ Lịch sự tiêu chuẩn (N5): Dùng mẫu câu [V-masen ka].\n  + '一緒にコーヒーでも飲みませんか。' (Mình cùng đi uống cà phê nhé?).\n- Cấp độ Trang trọng (Cấp trên / Khách hàng): [V-masen deshita ka / ikaga desu ka].\n  + 'よろしければ、お食事でもいかがでしょうか。' (Nếu tiện, xin mời anh dùng bữa cùng chúng tôi có được không ạ?).",
        "type": "rule"
      },
      {
        "id": "sec-cmm-2",
        "title": "2. Kỹ thuật đệm trợ từ でも (Làm mềm lời mời)",
        "content": "Khi mời mọc, người Nhật hay thêm trợ từ でも sau danh từ: [Cà phê でも, Cơm でも].\nÝ nghĩa: 'Uống cà phê hay thứ gì tương tự cũng được'. Điều này tạo cảm giác thư thả, không bắt ép đối phương phải nhất định uống đúng cà phê.",
        "type": "pattern"
      },
      {
        "id": "sec-cmm-3",
        "title": "3. Thăm dò lịch rảnh trước khi mời (Kushon)",
        "content": "Đừng vào đề mời ngay lập tức, hãy thăm dò lịch trình đối phương trước:\n- '今週末、何か予定ある？' (Cuối tuần này cậu có kế hoạch gì chưa?).\n- 'もし時間が空いていたら...' (Nếu mà cậu có thời gian rảnh thì...).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-cmm-1",
        "japanese": "週末、久しぶりにカラオケに行かない？",
        "reading": "しゅうまつ、ひさしぶりにカラオケにいかない？",
        "romaji": "Shuumatsu, hisashiburi ni karaoke ni ikanai?",
        "vietnamese": "Cuối tuần này đi hát karaoke không? Lâu lắm rồi chưa đi đấy!",
        "explanation": "Dùng thể phủ định thân mật いかない？ rủ bạn bè.",
        "context": "Rủ bạn thân đi giải trí"
      },
      {
        "id": "ex-cmm-2",
        "japanese": "仕事が終わったら、一杯飲みに行きませんか。",
        "reading": "しごとがおわったら、いっぱいのみにいきませんか。",
        "romaji": "Shigoto ga owattara, ippai nomi ni ikimasen ka.",
        "vietnamese": "Sau khi xong việc, chúng ta đi uống một ly nhé?",
        "explanation": "Cấu trúc 〜ませんか rủ đồng nghiệp lịch sự chuẩn mực.",
        "context": "Rủ đồng nghiệp đi nhậu sau giờ làm"
      },
      {
        "id": "ex-cmm-3",
        "japanese": "もしご都合がよろしければ、展覧会をご一緒しませんか。",
        "reading": "もしごつごうがよろしければ、てんらんかいをごいっしょしませんか。",
        "romaji": "Moshi gotsugou ga yoroshikereba, tenrankai o goissho shimasen ka.",
        "vietnamese": "Nếu thời gian tiện cho quý vị, chúng ta cùng đi xem buổi triển lãm nhé?",
        "explanation": "Lời mời trang trọng đầy tôn trọng gửi tới người trên.",
        "context": "Mời đối tác tham quan triển lãm"
      }
    ],
    "notes": [
      "Câu hỏi [〜ませんか] trong tiếng Nhật mang nghĩa mời mọc tích cực, KHÔNG phải là hỏi nghi ngờ 'sao không làm?'."
    ],
    "warnings": [
      "Không dùng '〜ましょう' (Hãy làm đi) để bắt đầu một lời mời với người lạ hay người trên, vì câu đó mang tính áp đặt như mệnh lệnh."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "the-y-chi-ikoukei-va-cau-truc-du-dinh",
        "title": "Thể ý chí (Ikoukei): Cách chia, rủ rê suồng sã và cấu trúc 〜ようと思う",
        "reason": "Ngữ pháp thể ý chí dùng để rủ bạn bè"
      },
      {
        "category": "conversation",
        "slug": "cach-nhan-loi-moi-tu-nhien",
        "title": "Cách nhận lời mời tự nhiên và hào hứng: Thể hiện sự mong chờ",
        "reason": "Cách đáp lại khi nhận được lời mời"
      },
      {
        "category": "conversation",
        "slug": "cach-tu-choi-kheo-leo-trong-tieng-nhat",
        "title": "Nghệ thuật từ chối khéo léo (Kushon Kotoba) tránh làm mất lòng đối phương",
        "reason": "Cách từ chối khi không thể tham gia"
      }
    ]
  },
  {
    "id": "c-dong-y-loi-moi",
    "slug": "cach-nhan-loi-moi-tu-nhien",
    "categoryId": "conversation",
    "title": "Cách nhận lời mời tự nhiên và hào hứng: Thể hiện sự mong chờ, bàn về thời gian và địa điểm",
    "japaneseTitle": "誘いに対する快諾の会話：前向きな返答と詳細の打ち合わせ",
    "summary": "Đáp lại lời mời mọc một cách tinh tế và tràn đầy năng lượng: Từ câu nhận lời hào hứng 'ぜひ！' đến bước phối hợp chốt thời gian, điểm hẹn mà không gây lúng túng.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Nhận lời",
      "Đồng ý",
      "Kế hoạch",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cdy-1",
        "title": "1. Câu cửa miệng nhận lời tức thì: ぜひ！ (Zehi!)",
        "content": "Từ vàng khi nhận lời mời là [ぜひ！] (Nhất định rồi! / Rất sẵn lòng!):\n- 'ぜひ行きたいです！' (Em rất muốn đi ạ!).\n- 'ぜひご一緒させてください！' (Nhất định cho tôi đi cùng với nhé!).\nTừ này thể hiện thái độ nhiệt tình, hào hứng, khiến người mở lời mời cảm thấy rất vui vẻ và được tôn trọng.",
        "type": "rule"
      },
      {
        "id": "sec-cdy-2",
        "title": "2. Thể hiện sự đồng tình thân mật (Casual)",
        "content": "Với bạn bè cùng trang lứa:\n- 'いいね！行こう行こう！' (Được đấy! Đi thôi đi thôi!).\n- '賛成！何時からにする？' (Nhất trí! Mấy giờ thì bắt đầu nhỉ?).\n- 'ちょうど私も行きたかったんだ！' (Đúng lúc tớ cũng đang muốn đi chỗ đó đây!).",
        "type": "pattern"
      },
      {
        "id": "sec-cdy-3",
        "title": "3. Chốt chi tiết: Thời gian và Điểm hẹn",
        "content": "Sau khi đồng ý, chủ động trao đổi các thông tin hậu cần:\n- 'どこで待ち合わせする？' (Chúng mình hẹn gặp nhau ở đâu nhỉ?).\n- '駅の改札口でいい？' (Gặp ở cửa soát vé nhà ga được không?).\n- '楽しみにしています！' (Tôi rất mong chờ tới hôm đó đấy nhé!).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-cdy-1",
        "japanese": "今度の土曜日にラーメンを食べに行きませんか。— ぜひ！喜んで！",
        "reading": "こんどのどようびにラーメンをたべにいきませんか。— ぜひ！よろこんで！",
        "romaji": "Kondo no doyoubi ni raamen o tabe ni ikimasen ka. — Zehi! Yorokonde!",
        "vietnamese": "Thứ Bảy tuần này đi ăn mì Ramen không? — Nhất định rồi! Rất hân hạnh!",
        "explanation": "Cặp hồi đáp nhận lời kinh điển với ぜひ và 喜んで.",
        "context": "Nhận lời rủ đi ăn uống"
      },
      {
        "id": "ex-cdy-2",
        "japanese": "お誘いいただき、ありがとうございます。ぜひ参加させていただきます。",
        "reading": "おさそいいただき、ありがとうございます。ぜひさんかさせていただきます。",
        "romaji": "Osasoi itadaki, arigatou gozaimasu. Zehi sanka sasete itadakimasu.",
        "vietnamese": "Cảm ơn anh đã có lời mời. Tôi nhất định xin phép được tham gia ạ.",
        "explanation": "Nhận lời mời trang trọng trong công việc/tiệc tùng đối tác.",
        "context": "Hồi âm email mời dự tiệc"
      },
      {
        "id": "ex-cdy-3",
        "japanese": "じゃあ、渋谷駅のハチ公前で18時に集合ね！楽しみにしているよ！",
        "reading": "じゃあ、しぶやえきのはちこうまえでじゅうはちじにしゅうごうね！たのしみにしているよ！",
        "romaji": "Jaa, Shibuya-eki no Hachikou-mae de juuhachiji ni shuugou ne! Tanoshimi ni shite iru yo!",
        "vietnamese": "Vậy thì, 18 giờ tập trung trước tượng Hachiko ở ga Shibuya nhé! Tớ mong chờ lắm đấy!",
        "explanation": "Chốt địa điểm và gửi gắm cảm xúc mong chờ.",
        "context": "Thống nhất lịch hẹn bạn bè"
      }
    ],
    "notes": [
      "Câu kết [楽しみにしています] (Tôi rất mong chờ) là gia vị giao tiếp tuyệt vời giúp tình cảm đôi bên gắn bó hơn."
    ],
    "warnings": [
      "Đừng chỉ trả lời cộc lốc 'はい' (Vâng) vì sẽ tạo cảm giác như bạn bị ép buộc phải đi chứ không hề hào hứng."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "nghe-thuat-moi-moc-ru-re",
        "title": "Nghệ thuật rủ rê và mời mọc: Từ thân mật 〜ない？ đến lịch sự 〜ませんか",
        "reason": "Mẫu câu đối thoại rủ rê và hồi đáp ăn khớp"
      },
      {
        "category": "conversation",
        "slug": "cam-on-va-dap-lai-loi-cam-on",
        "title": "Các sắc thái cảm ơn và cách đáp lại lời cảm ơn không bị gượng gạo",
        "reason": "Cảm ơn đối phương vì đã nhớ tới và mời mình"
      },
      {
        "category": "conversation",
        "slug": "cach-dat-lich-hen-va-xac-nhan",
        "title": "Cách đặt lịch hẹn và xác nhận thời gian: Hẹn gặp giáo viên, đặt chỗ dịch vụ",
        "reason": "Thống nhất lịch hẹn sau khi đồng ý"
      }
    ]
  },
  {
    "id": "c-small-talk",
    "slug": "ky-nang-tan-gau-small-talk",
    "categoryId": "conversation",
    "title": "Kỹ năng tán gẫu (Aizuchi & Small Talk): Mở lời về thời tiết, đồ ăn và giữ nhịp trò chuyện tự nhiên",
    "japaneseTitle": "雑談（スモールトーク）と相槌の技術：天気・食・趣味の話題",
    "summary": "Bí quyết phá tan sự im lặng ngượng ngùng (Awkward Silence): Từ câu mở đầu thời tiết an toàn, phản hồi đệm giọng Aizuchi (gật đầu, đệm âm) tới duy trì câu chuyện bất tận.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Small talk",
      "Aizuchi",
      "Giao tiếp xã giao",
      "ALL"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-cst-1",
        "title": "1. Chủ đề an toàn số 1 của người Nhật: Thời tiết",
        "content": "Thời tiết là chủ đề mở đầu hoàn hảo, không xâm phạm đời tư ai:\n- Trời nắng đẹp: '今日はいいお天気ですね。' (Hôm nay trời đẹp thật nhỉ).\n- Trời nóng nực: '今日も暑いですね。熱中症には気をつけてくださいね。' (Hôm nay lại nóng rồi, nhớ cẩn thận tránh say nắng nhé).\n- Trời mưa lạnh: '最近、急に寒くなりましたね。' (Dạo gần đây trời bỗng lạnh đột ngột nhỉ).",
        "type": "rule"
      },
      {
        "id": "sec-cst-2",
        "title": "2. Nghệ thuật Aizuchi (相槌 - Đệm âm giữ nhịp hội thoại)",
        "content": "Trong tiếng Nhật, nếu bạn im lặng nghe đối phương nói mà không phát ra tiếng động, người Nhật sẽ tưởng bạn không chú ý hoặc đang tức giận. Bắt buộc phải đệm Aizuchi:\n- Cấp độ Thân mật: うん、うん (Un, un), そうなんだ (Thế à), 本当に？ (Thật á?).\n- Cấp độ Lịch sự: そうですね (Đúng vậy nhỉ), なるほど (Hóa ra là vậy), ええ (Vâng).\n- Thể hiện ngạc nhiên: すごいですね！ (Tuyệt vời quá nhỉ!), 大変でしたね (Vất vả cho bạn quá).",
        "type": "pattern"
      },
      {
        "id": "sec-cst-3",
        "title": "3. Kỹ thuật ném bóng quay lại (Quả bóng hội thoại)",
        "content": "Sau khi trả lời câu hỏi của đối phương, luôn ném lại quả bóng bằng cách hỏi ngược lại:\n- '◯◯さんはどうですか。' (Còn bạn ◯◯ thì sao ạ?).\nĐiều này tạo nên dòng chảy trò chuyện hai chiều tự nhiên và ấm áp.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-cst-1",
        "japanese": "今日は一段と冷え込みますね。— 本当ですね。今夜は雪が降るらしいですよ。",
        "reading": "きょうはいちだんとひえこみますね。— ほんとうですね。こんやはゆきがふるらしいですよ。",
        "romaji": "Kyou wa ichidanto hiekomimasu ne. — Hontou desu ne. Konya wa yuki ga furu rashii desu yo.",
        "vietnamese": "Hôm nay trời trở lạnh buốt hơn hẳn nhỉ. — Thật vậy đấy. Nghe bảo tối nay có tuyết rơi đấy.",
        "explanation": "Bắt đầu cuộc trò chuyện bằng đề tài thời tiết.",
        "context": "Chào nhau lúc đứng chờ thang máy"
      },
      {
        "id": "ex-cst-2",
        "japanese": "週末は何か楽しいことありましたか。— ええ、家族で新しい水族館に行ってきたんですよ。",
        "reading": "しゅうまつはなにかたのしいことありましたか。— ええ、かぞくであたらしいすいぞくかんにいってきたんですよ。",
        "romaji": "Shuumatsu wa nanika tanoshii koto arimashita ka. — Ee, kazoku de atarashii suizokukan ni itte kita n desu yo.",
        "vietnamese": "Cuối tuần rồi bạn có gì vui không? — Dạ vâng, tôi vừa cùng gia đình đi thủy cung mới mở về đấy.",
        "explanation": "Hỏi thăm sinh hoạt cuối tuần tạo thiện cảm.",
        "context": "Trò chuyện đầu tuần tại công ty"
      },
      {
        "id": "ex-cst-3",
        "japanese": "へえ、そうなんですか！それは知らなかったです。勉強になります。",
        "reading": "へえ、そうなんですか！それはしらなかったです。べんきょうになります。",
        "romaji": "Hee, sou nan desu ka! Sore wa shiranakatta desu. Benkyou ni narimasu.",
        "vietnamese": "Ồ, vậy cơ ạ! Điều đó em chưa từng biết luôn. Em học hỏi thêm được nhiều rồi.",
        "explanation": "Phản hồi Aizuchi đầy hứng thú kích thích đối phương kể tiếp.",
        "context": "Lắng nghe tiền bối chia sẻ kinh nghiệm"
      }
    ],
    "notes": [
      "Tại Nhật, khoảng cách im lặng quá 5 giây sẽ tạo cảm giác bối rối; chỉ cần một câu nhận xét thời tiết là không khí lại rôm rả."
    ],
    "warnings": [
      "Tránh các chủ đề nhạy cảm khi Small talk: Tuổi tác phụ nữ, tình trạng hôn nhân/con cái, tiền lương và tôn giáo chính trị."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "chao-hoi-va-mo-dau-cuoc-tro-chuyen",
        "title": "Chào hỏi và mở đầu cuộc trò chuyện tự nhiên chuẩn người bản xứ",
        "reason": "Bắt đầu cuộc trò chuyện từ câu chào buổi sáng"
      },
      {
        "category": "vocabulary",
        "slug": "tu-dien-tu-tuong-thanh-tu-tuong-hinh",
        "title": "Từ tượng thanh & Từ tượng hình (Onomatopoeia) căn bản trong đời sống",
        "reason": "Dùng từ tượng thanh miêu tả thời tiết và tâm trạng"
      },
      {
        "category": "notes",
        "slug": "doc-cau-theo-nhip-mora-thay-vi-tung-chu",
        "title": "Cách đọc câu tiếng Nhật theo nhịp phách (Mora) thay vì từng chữ cái riêng rẽ",
        "reason": "Nhịp gật đầu và phản hồi Aizuchi chuẩn phách"
      }
    ]
  },
  {
    "id": "c-ket-thuc-cuoc-tro-chuyen",
    "slug": "nghe-thuat-ket-thuc-cuoc-tro-chuyen",
    "categoryId": "conversation",
    "title": "Nghệ thuật kết thúc cuộc trò chuyện lịch sự mà không gây cụt hứng hay ngượng ngùng",
    "japaneseTitle": "会話をスムーズに切り上げる表現：失礼のない別れ際の一言",
    "summary": "Bí quyết rút lui êm đẹp khỏi một cuộc trò chuyện dài: Cách khéo léo lấy lý do công việc, xin lỗi vì đã làm mất thời gian của đối phương và để lại dư âm tốt đẹp.",
    "level": "ALL",
    "tags": [
      "Hội thoại",
      "Kết thúc trò chuyện",
      "Tạm biệt",
      "Lịch sự",
      "ALL"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ckt-1",
        "title": "1. Tín hiệu chuyển tiếp (Tranzishon) trước khi ngắt lời",
        "content": "Không bao giờ đột ngột đứng dậy nói 'Tạm biệt', mà luôn dùng các từ chuyển tiếp làm tín hiệu báo trước:\n- 'そろそろ...' (Sorosoro... - Đã đến lúc...).\n- 'あ、もうこんな時間ですね。' (A, đã muộn thế này rồi cơ à).\n- '長々とお引き止めしてしまってすみません。' (Xin lỗi vì đã giữ chân anh lâu quá).",
        "type": "rule"
      },
      {
        "id": "sec-ckt-2",
        "title": "2. Nêu lý do rút lui chính đáng",
        "content": "Đưa ra một lý do khách quan không liên quan đến việc bạn chán nói chuyện:\n- '次の予定がありますので...' (Vì tôi có lịch hẹn tiếp theo nên là...).\n- 'そろそろ戻らないといけなくて...' (Tôi sắp phải quay lại công việc mất rồi...).\n- '電車の時間がありますので...' (Đã đến giờ chuyến tàu của tôi rồi...).",
        "type": "pattern"
      },
      {
        "id": "sec-ckt-3",
        "title": "3. Lời chào kết thúc ấm áp để lại ấn tượng tốt",
        "content": "- '今日はお話しできて本当に楽しかったです！' (Hôm nay được nói chuyện cùng bạn thật là vui!).\n- 'また近いうちにお会いしましょう。' (Hẹn sớm gặp lại bạn trong thời gian tới nhé).\n- 'それでは、失礼いたします。' (Vậy thì tôi xin phép ạ).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-ckt-1",
        "japanese": "あ、もうこんな時間！そろそろ行かないと電車に遅れちゃう。",
        "reading": "あ、もうこんなじかん！そろそろいかないとでんしゃにおくれちゃう。",
        "romaji": "A, mou konna jikan! Sorosoro ikanai to densha ni okurechau.",
        "vietnamese": "A, đã giờ này rồi cơ à! Tớ phải đi ngay thôi kẻo trễ chuyến tàu mất.",
        "explanation": "Cách chia tay tự nhiên với bạn bè sau buổi cà phê.",
        "context": "Kết thúc buổi gặp bạn bè"
      },
      {
        "id": "ex-ckt-2",
        "japanese": "長居してしまい、申し訳ありませんでした。そろそろ失礼いたします。",
        "reading": "ながいしてしまい、もうしわけありませんでした。そろそろしつれいいたします。",
        "romaji": "Nagai shite shimai, moushiwake arimasen deshita. Sorosoro shitsurei itashimasu.",
        "vietnamese": "Tôi đã ở lại trò chuyện quá lâu, thật vô cùng có lỗi. Tôi xin phép ra về ạ.",
        "explanation": "Mẫu câu lịch sự khi đứng dậy ra về tại nhà người khác hoặc đối tác.",
        "context": "Xin phép ra về sau chuyến thăm"
      },
      {
        "id": "ex-ckt-3",
        "japanese": "本日は貴重なお時間をいただき、誠にありがとうございました。",
        "reading": "ほんじつはきちょうなおじかんをいただき、まことにありがとうございました。",
        "romaji": "Honjitsu wa kichou na ojikan o itadaki, makoto ni arigatou gozaimashita.",
        "vietnamese": "Hôm nay chân thành cảm ơn quý vị đã dành khoảng thời gian quý báu cho tôi.",
        "explanation": "Lời cảm ơn đúc kết cuộc gặp gỡ trong công việc.",
        "context": "Kết thúc buổi đàm phán kinh doanh"
      }
    ],
    "notes": [
      "Sau khi chào tạm biệt, người Nhật thường quay lại cúi đầu chào thêm một lần nữa khi đi cách xa khoảng 5-10 mét."
    ],
    "warnings": [
      "Đừng vừa nói chuyện vừa liên tục nhìn đồng hồ đeo tay một cách sốt ruột; đối phương sẽ cảm thấy bạn đang coi thường họ."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "ky-nang-tan-gau-small-talk",
        "title": "Kỹ năng tán gẫu (Aizuchi & Small Talk): Mở lời về thời tiết, đồ ăn và giữ nhịp trò chuyện",
        "reason": "Chuyển tiếp từ chuyện phiếm sang chào tạm biệt"
      },
      {
        "category": "conversation",
        "slug": "giao-tiep-noi-lam-viec-aisatsu",
        "title": "Giao tiếp nơi làm việc: Chào buổi sáng, chào ra về, báo cáo Horenso",
        "reason": "Chào tạm biệt đồng nghiệp cuối ngày làm việc"
      },
      {
        "category": "conversation",
        "slug": "xin-loi-va-dap-lai-loi-xin-loi",
        "title": "Văn hóa xin lỗi trong tiếng Nhật: Từ Sumimasen đến Moushiwake arimasen",
        "reason": "Dùng câu xin lỗi nhẹ nhàng như lời xin phép rời đi"
      }
    ]
  }
];
