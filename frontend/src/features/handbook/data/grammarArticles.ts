import { HandbookArticle } from "../types";

export const grammarArticles: HandbookArticle[] = [
  {
    "id": "g-wa-ga",
    "slug": "phan-biet-tro-tu-wa-va-ga",
    "categoryId": "grammar",
    "title": "Phân biệt trợ từ は (wa) và が (ga) - Bản chất và ngữ cảnh sử dụng",
    "japaneseTitle": "助詞「は」と「が」の使い分け",
    "summary": "Hiểu rõ bản chất chủ đề (Topic - は) đối chiếu với tiêu điểm thông tin (Focus - が), giải mã câu hiện tượng khách quan và quy tắc mệnh đề phụ.",
    "level": "ALL",
    "tags": [
      "Trợ từ",
      "Ngữ pháp cốt lõi",
      "Cặp trợ từ dễ nhầm",
      "wa và ga",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-wa-ga-1",
        "title": "1. Bản chất cốt lõi: Chủ đề (Topic) vs Tiêu điểm (Focus)",
        "content": "Điểm khác biệt quan trọng nhất không nằm ở dịch nghĩa sang tiếng Việt, mà nằm ở vị trí thông tin mới (New Information) mà người nói muốn người nghe chú ý.\n\n- Trợ từ は (wa) đánh dấu Chủ đề câu (Topic). Phần sau は mới là thông tin quan trọng mà người nói muốn truyền đạt.\n- Trợ từ が (ga) đánh dấu Tiêu điểm (Focus). Từ đứng trước が chính là thông tin quan trọng mới xuất hiện, trả lời cho câu hỏi 'Ai? Cái gì?'.",
        "type": "rule"
      },
      {
        "id": "sec-wa-ga-2",
        "title": "2. Câu miêu tả hiện tượng khách quan (Hiện tượng trước mắt)",
        "content": "Khi miêu tả một sự vật, hiện tượng bất ngờ xảy ra trước mắt mà người nói chưa xử lý hay biến nó thành chủ đề trò chuyện, người Nhật luôn dùng が để ghi nhận thực tế khách quan.",
        "type": "pattern"
      },
      {
        "id": "sec-wa-ga-3",
        "title": "3. Quy tắc mệnh đề phụ (Subordinate Clauses)",
        "content": "Trong mệnh đề phụ bổ nghĩa cho danh từ hoặc mệnh đề chỉ thời gian/điều kiện (khi..., nếu...), chủ ngữ của mệnh đề phụ hầu như luôn đi với が, hiếm khi dùng は để tránh xung đột với chủ đề của câu chính.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-wg-1",
        "japanese": "私はナムです。",
        "reading": "わたしはナムです。",
        "romaji": "Watashi wa Namu desu.",
        "vietnamese": "Tôi là Nam.",
        "explanation": "Chủ đề câu là 'Tôi' (người nghe đã biết), thông tin mới cần cung cấp là tên 'Nam'.",
        "context": "Tự giới thiệu bản thân thông thường"
      },
      {
        "id": "ex-wg-2",
        "japanese": "私がナムです。",
        "reading": "わたしがナムです。",
        "romaji": "Watashi ga Namu desu.",
        "vietnamese": "Chính tôi là Nam (người mà bạn đang tìm chính là tôi).",
        "explanation": "Nhấn mạnh vào 'Tôi', giải đáp câu hỏi 'Ai là Nam?'.",
        "context": "Khi ai đó gọi 'Ai là Nam ở đây?'"
      },
      {
        "id": "ex-wg-3",
        "japanese": "あ、雨が降っています。",
        "reading": "あ、あめがふっています。",
        "romaji": "A, ame ga futte imasu.",
        "vietnamese": "A, trời đang mưa kìa.",
        "explanation": "Miêu tả hiện tượng thiên nhiên khách quan vừa nhận biết qua giác quan.",
        "context": "Nhìn thấy mưa bất chợt rơi"
      },
      {
        "id": "ex-wg-4",
        "japanese": "父が作った料理はおいしいです。",
        "reading": "ちちがつくりょうりはおいしいです。",
        "romaji": "Chichi ga tsukutta ryouri wa oishii desu.",
        "vietnamese": "Món ăn mà bố tôi nấu rất ngon.",
        "explanation": "Trong cụm bổ nghĩa danh từ '父が作った料理', chủ thể thực hiện hành động 'bố' phải đi với が.",
        "context": "Mệnh đề phụ bổ nghĩa cho danh từ"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu tổng quan giữa は và が",
      "description": "Xem xét sự khác biệt theo từng tiêu chí ngữ dụng học:",
      "items": [
        {
          "subject": "Trợ từ は (wa)",
          "nuance": "Đánh dấu chủ đề (Topic), mang tính khái quát, thông tin cũ làm nền tảng",
          "formula": "A は [Thông tin mới quan trọng]",
          "example": "田中さんは親切です。",
          "exampleTranslation": "Anh Tanaka thì tốt bụng.",
          "caution": "Tránh dịch máy móc là 'thì/là', cần xem ý đồ người nói có đang so sánh tương phản hay không."
        },
        {
          "subject": "Trợ từ が (ga)",
          "nuance": "Đánh dấu tiêu điểm (Focus), chỉ định rõ danh tính, miêu tả hiện tượng thực tế",
          "formula": "[Thông tin quan trọng] が B",
          "example": "田中さんが来ました！",
          "exampleTranslation": "Anh Tanaka đến rồi kìa!",
          "caution": "Dùng để chọn ra một đối tượng cụ thể trong số nhiều đối tượng."
        }
      ],
      "summary": "Quy tắc ghi nhớ ngắn gọn: Sau は là thông tin cần nghe, trước が là người/vật cần chọn."
    },
    "notes": [
      "Câu hỏi có từ để hỏi (誰, 何, どこ) làm chủ ngữ thì câu hỏi BẮT BUỘC dùng が: 誰が来ますか？",
      "Câu trả lời cho từ để hỏi làm chủ ngữ cũng BẮT BUỘC dùng が: 田中さんが来ます。",
      "Tính từ chỉ cảm xúc, sở thích, năng lực (好き, 嫌い, 上手, 下手, わかる, できる) luôn đi với tân ngữ が."
    ],
    "warnings": [
      "Không có quy tắc cứng nhắc tuyệt đối 100% trong mọi ngữ cảnh văn phong. Cùng một câu, nếu đổi は sang が, ngữ cảnh và hàm ý tâm lý của người nói sẽ thay đổi.",
      "Trong giao tiếp thân mật hàng ngày, trợ từ は và が thường bị lược bỏ trong câu ngắn nếu ngữ cảnh đã hoàn toàn rõ ràng."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-ni-va-de",
        "title": "Phân biệt trợ từ に (ni) và で (de) chỉ nơi chốn & thời gian",
        "reason": "Tiếp tục làm chủ cặp trợ từ nền tảng tiếp theo"
      },
      {
        "category": "notes",
        "slug": "loi-thuong-gap-khi-dung-wa-va-ga",
        "title": "Trợ từ は và が — Những lỗi tư duy người Việt hay mắc phải nhất và cách sửa",
        "reason": "Điểm mặt các lỗi sai cụ thể người Việt hay mắc"
      },
      {
        "category": "grammar",
        "slug": "bo-ba-tro-tu-to-mo-no",
        "title": "Bộ ba trợ từ kết nối danh từ と, も, の: Bản chất ngữ nghĩa và cách phối hợp",
        "reason": "Cách trợ từ も thay thế hoặc đi kèm với は và が"
      }
    ]
  },
  {
    "id": "g-ni-de",
    "slug": "phan-biet-ni-va-de",
    "categoryId": "grammar",
    "title": "Phân biệt trợ từ に (ni) và で (de) chỉ nơi chốn & thời gian",
    "japaneseTitle": "場所・時間の助詞「に」と「で」",
    "summary": "Xác định ranh giới giữa điểm tồn tại tĩnh/đích đến (に) và nơi diễn ra hành động động/phương tiện (で), giải quyết triệt để sự nhầm lẫn khi dịch từ 'ở/tại'.",
    "level": "N5",
    "tags": [
      "Trợ từ",
      "Nơi chốn",
      "Thời gian",
      "N5",
      "Căn bản"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ni-de-1",
        "title": "1. Vấn đề của người học tiếng Việt",
        "content": "Trong tiếng Việt, cả hai câu 'Tôi ở nhà' và 'Tôi ăn cơm ở nhà' đều dùng từ 'ở'. Tuy nhiên trong tiếng Nhật:\n- 'Tôi ở nhà' là trạng thái tồn tại tĩnh -> Dùng に (家にいます).\n- 'Tôi ăn cơm ở nhà' là địa điểm diễn ra hành động ăn -> Dùng で (家でご飯を食べます).",
        "type": "text"
      },
      {
        "id": "sec-ni-de-2",
        "title": "2. Trợ từ に - Đích đến, điểm kết thúc và vị trí tồn tại",
        "content": "Trợ từ に biểu thị điểm dừng chân, đích đến của hành động di chuyển (行く, 来る, 帰る), vị trí của sự tồn tại (いる, ある, 住む), hoặc kết quả của sự tác động bám vào (座る, 乗る, 入る).",
        "type": "rule"
      },
      {
        "id": "sec-ni-de-3",
        "title": "3. Trợ từ で - Sân khấu diễn ra hành động, phương tiện, cách thức",
        "content": "Trợ từ で biểu thị 'sân khấu' nơi một hành động năng động diễn ra (勉強する, 働く, 運動する), hoặc công cụ/phương tiện được dùng để thực hiện hành động đó (箸で食べる, 電車で行く).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-nd-1",
        "japanese": "ハノイに住んでいます。",
        "reading": "ハノイにすんでいます。",
        "romaji": "Hanoi ni sunde imasu.",
        "vietnamese": "Tôi đang sống ở Hà Nội.",
        "explanation": "Hành động 'sống' là trạng thái định cư lâu dài, gắn liền với trợ từ に.",
        "context": "Hỏi thăm nơi ở"
      },
      {
        "id": "ex-nd-2",
        "japanese": "図書館で日本語を勉強します。",
        "reading": "としょかんでにほんごをべんきょうします。",
        "romaji": "Toshokan de nihongo o benkyou shimasu.",
        "vietnamese": "Tôi học tiếng Nhật ở thư viện.",
        "explanation": "'Học' là hành động tích cực diễn ra tại thư viện -> Dùng で.",
        "context": "Địa điểm diễn ra hoạt động học tập"
      },
      {
        "id": "ex-nd-3",
        "japanese": "電車に乗ります。",
        "reading": "でんしゃにのります。",
        "romaji": "Densha ni norimasu.",
        "vietnamese": "Tôi lên tàu điện.",
        "explanation": "Bước lên tàu là hành động hướng đích bám vào phương tiện -> Dùng に.",
        "context": "Hành động lên tàu xe"
      },
      {
        "id": "ex-nd-4",
        "japanese": "電車で会社に行きます。",
        "reading": "でんしゃでかいしゃにいきます。",
        "romaji": "Densha de kaisha ni ikimasu.",
        "vietnamese": "Tôi đến công ty bằng tàu điện.",
        "explanation": "Tàu điện đóng vai trò phương tiện di chuyển -> Dùng で; công ty là đích đến -> Dùng に.",
        "context": "Phương tiện và đích đến"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu trợ từ に vs で theo chức năng",
      "items": [
        {
          "subject": "Trợ từ に (Điểm đến / Tĩnh)",
          "nuance": "Chỉ vị trí tồn tại tĩnh, đích đến của di chuyển, thời điểm có con số cụ thể",
          "formula": "Nơi chốn + に + [いる/ある/住む/座る/行く]",
          "example": "公園にベンチがあります。",
          "exampleTranslation": "Ở công viên có ghế dài.",
          "caution": "Không dùng に cho nơi chốn nếu động từ là hành vi tích cực tạo ra sự kiện."
        },
        {
          "subject": "Trợ từ で (Sân khấu / Động / Công cụ)",
          "nuance": "Chỉ nơi diễn ra hành động, công cụ, phương tiện, phạm vi hoặc nguyên nhân",
          "formula": "Nơi chốn + で + [Ăn/Uống/Học/Chạy/Làm việc]",
          "example": "公園で友達と散歩します。",
          "exampleTranslation": "Tôi đi dạo với bạn ở công viên.",
          "caution": "Với sự kiện/lễ hội (お祭り, パーティー), địa điểm tổ chức luôn đi với で (公園でお祭りがある)."
        }
      ],
      "summary": "Mẹo phân biệt: 'Ở đâu có cái gì' dùng に; 'Ở đâu làm việc gì' hoặc 'Ở đâu diễn ra sự kiện gì' dùng で."
    },
    "notes": [
      "Với thời gian: Có con số cụ thể thì dùng に (7時に起きます), không có con số cụ thể thì không dùng に (昨日、今日、来週).",
      "Động từ 働く (làm việc) thường đi với で (会社で働きます), nhưng 勤める (cống hiến/biên chế) lại đi với に (会社に勤めます)."
    ],
    "warnings": [
      "Tránh nhầm lẫn đặc biệt: Sự kiện diễn ra (パーティーがある, 試験がある) thì dùng で chứ không dùng に vì mang tính chất hoạt động diễn ra."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-tro-tu-wa-va-ga",
        "title": "Phân biệt trợ từ は (wa) và が (ga) - Bản chất và ngữ cảnh sử dụng",
        "reason": "Cặp trợ từ chủ đề - tiêu điểm nền tảng"
      },
      {
        "category": "notes",
        "slug": "checklist-chon-tro-tu-ni-va-de",
        "title": "Checklist 30 giây chọn nhanh trợ từ に hay で không bao giờ nhầm",
        "reason": "Bảng tra cứu quy tắc nhanh khi phân vân giữa に và で"
      }
    ]
  },
  {
    "id": "g-jidoushi-tadoushi",
    "slug": "phan-biet-tu-dong-tu-va-tha-dong-tu",
    "categoryId": "grammar",
    "title": "Bản chất Tự động từ (Jidoushi) & Tha động từ (Tadoushi) kèm cặp từ thông dụng",
    "japaneseTitle": "自動詞と他動詞の対応法則",
    "summary": "Nắm vững nguyên lý diễn đạt trạng thái khách quan (Tự động từ + が) đối chiếu với hành vi có chủ ý của con người (Tha động từ + を) cùng các cặp từ then chốt.",
    "level": "N4",
    "tags": [
      "Động từ",
      "Tự động từ",
      "Tha động từ",
      "N4",
      "Quy tắc cặp từ"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-jt-1",
        "title": "1. Tự động từ (Jidoushi) là gì?",
        "content": "Tự động từ miêu tả hành động tự thân của sự vật hiện tượng, hoặc trạng thái biến đổi không có sự can thiệp trực tiếp của con người ở thời điểm nói. Danh từ đi trước tự động từ thường đi với trợ từ が.\nCông thức: N が + Tự động từ.",
        "type": "rule"
      },
      {
        "id": "sec-jt-2",
        "title": "2. Tha động từ (Tadoushi) là gì?",
        "content": "Tha động từ miêu tả hành động có chủ ý của một tác nhân (thường là con người) tác động lên một đối tượng bên ngoài. Đối tượng tiếp nhận hành động đi với trợ từ を.\nCông thức: Người は + N を + Tha động từ.",
        "type": "rule"
      },
      {
        "id": "sec-jt-3",
        "title": "3. Các cặp từ thường gặp nhất trong JLPT N5 - N4",
        "content": "Dưới đây là các cặp tự - tha động từ xuất hiện với tần suất cao nhất mà người học bắt buộc phải ghi nhớ chuẩn:",
        "type": "table",
        "tableData": {
          "headers": [
            "Tự động từ (が)",
            "Tha động từ (を)",
            "Ý nghĩa tiếng Việt"
          ],
          "rows": [
            [
              "開く (あく)",
              "開ける (あける)",
              "Mở (cửa tự mở vs người mở cửa)"
            ],
            [
              "閉まる (しまる)",
              "閉める (しめる)",
              "Đóng (cửa tự đóng vs người đóng cửa)"
            ],
            [
              "つく",
              "つける",
              "Bật (đèn tự sáng vs người bật đèn)"
            ],
            [
              "消える (きえる)",
              "消す (けす)",
              "Tắt (đèn tự tắt vs người tắt đèn)"
            ],
            [
              "始まる (はじまる)",
              "始める (はじめる)",
              "Bắt đầu (sự kiện bắt đầu vs ai bắt đầu việc gì)"
            ],
            [
              "終わる (おわる)",
              "終える (おえる)",
              "Kết thúc (giờ học kết thúc vs hoàn thành việc)"
            ],
            [
              "入る (はいる)",
              "入れる (いれる)",
              "Vào / Cho vào"
            ],
            [
              "出る (でる)",
              "出す (だす)",
              "Ra / Lấy ra"
            ]
          ]
        }
      }
    ],
    "examples": [
      {
        "id": "ex-jt-1",
        "japanese": "ドアが開きました。",
        "reading": "ドアがあきました。",
        "romaji": "Doa ga akimashita.",
        "vietnamese": "Cửa đã mở ra (tự mở hoặc không quan tâm ai mở).",
        "explanation": "Miêu tả hiện tượng chiếc cửa tự hé mở hoặc trạng thái thay đổi.",
        "context": "Tự động từ"
      },
      {
        "id": "ex-jt-2",
        "japanese": "風が強いので、窓を閉めてください。",
        "reading": "かぜがつよいので、まどをしめてください。",
        "romaji": "Kaze ga tsuyoi node, mado o shimete kudasai.",
        "vietnamese": "Vì gió to nên xin bạn hãy đóng cửa sổ lại.",
        "explanation": "Yêu cầu một người tác động lên chiếc cửa sổ để đóng nó lại.",
        "context": "Tha động từ"
      }
    ],
    "comparisons": {
      "title": "So sánh Tự động từ và Tha động từ",
      "items": [
        {
          "subject": "Tự động từ (Jidoushi)",
          "nuance": "Tập trung vào hiện tượng và kết quả biến đổi của đối tượng",
          "formula": "N が + Tự động từ",
          "example": "電気が消えています。",
          "exampleTranslation": "Đèn đang bị tắt.",
          "caution": "Tránh dùng を với tự động từ thuần túy."
        },
        {
          "subject": "Tha động từ (Tadoushi)",
          "nuance": "Tập trung vào hành vi và ý chí của người thực hiện",
          "formula": "N を + Tha động từ",
          "example": "部屋の電気を消しました。",
          "exampleTranslation": "Tôi đã tắt đèn phòng.",
          "caution": "Khi chuyển sang thể bị động hoặc thể sai khiến, cấu trúc trợ từ sẽ biến đổi."
        }
      ],
      "summary": "Tự động từ chú trọng vào 'sự việc xảy ra như thế nào', Tha động từ chú trọng vào 'ai làm việc đó'."
    },
    "notes": [
      "Đuôi -aru thường là tự động từ (閉まる, 始まる), đuôi -eru thường là tha động từ tương ứng (閉める, 始める).",
      "Đuôi -su hầu như luôn là tha động từ (消す, 出す, 直す, 落とす)."
    ],
    "warnings": [
      "Có những động từ nhìn giống nhau nhưng quy tắc đuôi bị đảo ngược (ví dụ: 聞こえる là tự động từ chỉ nghe thấy tự nhiên). Không nên học vẹt công thức mà hãy học theo ngữ cảnh từng cặp."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "ban-chat-cau-truc-te-iru",
        "title": "Bản chất cấu trúc 〜ている: Hành động tiếp diễn, trạng thái kết quả & thói quen",
        "reason": "Tự động từ kết hợp với 〜ている biểu thị trạng thái kết quả"
      },
      {
        "category": "vocabulary",
        "slug": "cap-dong-tu-bat-dau-va-ket-thuc",
        "title": "Cặp động từ 始まる/始める và 終わる/終える: Tự động từ vs Tha động từ",
        "reason": "Ứng dụng trực tiếp cặp tự-tha động từ kinh điển"
      }
    ]
  },
  {
    "id": "g-kara-node",
    "slug": "phan-biet-kara-va-node",
    "categoryId": "grammar",
    "title": "Phân biệt から (kara) và ので (node) chỉ nguyên nhân, lý do",
    "japaneseTitle": "理由・原因を表す「から」と「ので」の使い分け",
    "summary": "So sánh mức độ chủ quan vs khách quan, độ lịch sự khi xin phép hay từ chối, và các trường hợp chỉ được dùng から mà không được dùng ので.",
    "level": "N5",
    "tags": [
      "Ngữ pháp",
      "Liên từ",
      "Lý do",
      "から",
      "ので",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-kn-1",
        "title": "1. Bản chất: Chủ quan (から) vs Khách quan (ので)",
        "content": "- から (kara) nhấn mạnh lý do chủ quan của người nói, thể hiện rõ lập trường cá nhân hoặc cảm xúc ('Vì tôi nghĩ thế nên...').\n- ので (node) biểu thị lý do khách quan, nhẹ nhàng mang tính thực tế hiển nhiên, làm dịu bớt áp lực cho người nghe ('Do hoàn cảnh thực tế như vậy nên...').",
        "type": "rule"
      },
      {
        "id": "sec-kn-2",
        "title": "2. Mệnh đề sau: Mệnh lệnh, yêu cầu, rủ rê đi với cái nào?",
        "content": "Khi vế sau là câu mệnh lệnh (〜しろ), cấm chỉ (〜な), khuyên nhủ (〜ほうがいい) hay rủ rê (〜ましょう/〜ませんか), chỉ có thể dùng から. Dùng ので trong các câu này sẽ nghe rất gượng gạo hoặc thiếu tự nhiên.",
        "type": "rule"
      },
      {
        "id": "sec-kn-3",
        "title": "3. Lỗi thường gặp của người Việt khi xin phép / xin lỗi",
        "content": "Khi xin phép nghỉ ốm hay xin lỗi khách hàng, người Việt hay quen miệng dùng から (熱がありますから、休みます). Trong mắt người Nhật, câu này nghe có vẻ áp đặt lý do cá nhân. Hãy dùng ので (熱がありますので、休ませていただけませんか) để thể hiện sự lịch thiệp và tôn trọng đối phương.",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-kn-1",
        "japanese": "危ないですから、触らないでください。",
        "reading": "あぶないですから、さわらないでください。",
        "romaji": "Abunai desu kara, sawaranaide kudasai.",
        "vietnamese": "Vì nguy hiểm nên xin đừng chạm vào.",
        "explanation": "Vế sau là yêu cầu dứt khoát 'đừng chạm vào' -> Dùng から.",
        "context": "Biển cảnh báo an toàn"
      },
      {
        "id": "ex-kn-2",
        "japanese": "電車が遅れましたので、遅刻してしまいました。",
        "reading": "でんしゃがおくれましたので、ちこくしてしまいました。",
        "romaji": "Densha ga okuremashita node, chikoku shite shimaimashita.",
        "vietnamese": "Do tàu điện bị trễ chuyến nên em đã lỡ đi muộn ạ.",
        "explanation": "Trình bày lý do khách quan bất khả kháng một cách lịch sự trước giáo viên hoặc sếp.",
        "context": "Giải thích lý do đi muộn"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu から vs ので",
      "items": [
        {
          "subject": "から (kara) - Chủ quan & Mạnh mẽ",
          "nuance": "Nhấn mạnh lý do cá nhân, có thể đi kèm mệnh lệnh, rủ rê, ý chí",
          "formula": "Thể thông thường / Thể lịch sự + から",
          "example": "時間がありませんから、急ぎましょう。",
          "exampleTranslation": "Vì không có thời gian đâu, chúng mình nhanh lên nào.",
          "caution": "Tránh dùng khi xin lỗi khách hàng vì nghe giống bao biện."
        },
        {
          "subject": "ので (node) - Khách quan & Lịch sự",
          "nuance": "Diễn tả nguyên nhân tự nhiên theo hoàn cảnh, giảm nhẹ tính áp đặt",
          "formula": "Thể thông thường (Na-adj / N thêm な) + ので",
          "example": "頭が痛いので、少し休んでもいいですか。",
          "exampleTranslation": "Vì em bị đau đầu nên em xin phép nghỉ một chút được không ạ?",
          "caution": "Vế sau không dùng mệnh lệnh trực tiếp (しろ, するな)."
        }
      ],
      "summary": "Muốn xin phép, xin lỗi, giao tiếp công sở -> Ưu tiên ので. Muốn rủ rê, ra lệnh, quả quyết -> Dùng から."
    },
    "notes": [
      "Với danh từ và tính từ đuôi -na: Khi nối với ので phải thêm な (雨なので、暇なので); khi nối với から có thể là だから hoặc ですから."
    ],
    "warnings": [
      "Không bao giờ dùng câu mệnh lệnh như '危険ですので、入るな' (sai ngữ cảm). Nếu là biển cấm ngặt nghèo, người Nhật dùng から hoặc danh từ hóa."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "xin-loi-va-dap-lai-loi-xin-loi",
        "title": "Văn hóa xin lỗi trong tiếng Nhật: Từ Sumimasen, Gomennasai đến Moushiwake arimasen",
        "reason": "Ứng dụng ので khi nêu lý do trong câu xin lỗi"
      },
      {
        "category": "grammar",
        "slug": "phan-biet-temo-va-temo-ii",
        "title": "Phân biệt cấu trúc 〜ても (nhượng bộ) và 〜てもいい (cho phép)",
        "reason": "Kết hợp câu xin phép lịch sự"
      }
    ]
  },
  {
    "id": "g-temo-temo-ii",
    "slug": "phan-biet-temo-va-temo-ii",
    "categoryId": "grammar",
    "title": "Phân biệt cấu trúc 〜ても (nhượng bộ) và 〜てもいい (cho phép)",
    "japaneseTitle": "逆接「〜ても」と許可「〜てもいい」の区別",
    "summary": "Làm rõ sự khác biệt giữa liên từ nhượng bộ 'Dù cho... thì vẫn...' (〜ても) và mẫu câu xin phép hoặc chấp thuận 'Làm... cũng được' (〜てもいい/〜てもかまいません).",
    "level": "N5",
    "tags": [
      "Ngữ pháp",
      "Nhượng bộ",
      "Xin phép",
      "ても",
      "てもいい",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-tm-1",
        "title": "1. Mẫu câu xin phép / cho phép: V-てもいい (てもいいです)",
        "content": "Dùng khi người nói muốn xin phép người khác thực hiện một hành động (〜てもいいですか - Tôi làm... có được không?) hoặc người có thẩm quyền cho phép người khác làm điều gì (〜てもいいです - Bạn làm... cũng được).",
        "type": "rule"
      },
      {
        "id": "sec-tm-2",
        "title": "2. Cấu trúc nhượng bộ: 〜ても (〜でも)",
        "content": "Diễn đạt ý nghĩa 'Dù cho điều kiện A có xảy ra, thì kết quả B vẫn không thay đổi hoặc trái với kỳ vọng thông thường'.\nCông thức:\n- Động từ thể Te + も\n- Tính từ -i: bỏ い + くても\n- Tính từ -na / Danh từ: + でも.",
        "type": "rule"
      },
      {
        "id": "sec-tm-3",
        "title": "3. Nhầm lẫn tai hại của người học",
        "content": "Vì cả hai đều có thành phần 'ても' ở đầu, nhiều bạn học sinh khi muốn nói 'Dù mưa tôi vẫn đi' (雨が降っても行きます) lại nhầm thành '雨が降ってもいい...' khiến người nghe tưởng là bạn đang cho phép trời mưa!",
        "type": "text"
      }
    ],
    "examples": [
      {
        "id": "ex-tm-1",
        "japanese": "ここで写真を撮ってもいいですか。",
        "reading": "ここでしゃしんをとってもいいですか。",
        "romaji": "Koko de shashin o totte mo ii desu ka.",
        "vietnamese": "Tôi chụp ảnh ở đây có được không ạ?",
        "explanation": "Dùng để hỏi xin phép lịch sự trước khi chụp ảnh tại bảo tàng/di tích.",
        "context": "Xin phép làm một hành động"
      },
      {
        "id": "ex-tm-2",
        "japanese": "何度読んでも、この文の意味がわかりません。",
        "reading": "なんどよんでも、このぶんのいみがわかりません。",
        "romaji": "Nando yonde mo, kono bun no imi ga wakarimasen.",
        "vietnamese": "Dù đọc bao nhiêu lần đi nữa, tôi vẫn không hiểu nghĩa của câu này.",
        "explanation": "Nhượng bộ: Nỗ lực đọc nhiều lần nhưng kết quả vẫn không hiểu.",
        "context": "Biểu đạt sự khó khăn"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu V-ても vs V-てもいい",
      "items": [
        {
          "subject": "〜ても (Nhượng bộ: Dù... cũng)",
          "nuance": "Nối 2 vế câu tương phản với logic thông thường",
          "formula": "V-て + も + [Kết quả không đổi]",
          "example": "薬を飲んでも、熱が下がりません。",
          "exampleTranslation": "Dù đã uống thuốc nhưng vẫn không hạ sốt.",
          "caution": "Phải có vế kết quả theo sau."
        },
        {
          "subject": "〜てもいい (Cho phép: Làm... cũng được)",
          "nuance": "Bày tỏ sự đồng thuận, chấp nhận hoặc xin phép",
          "formula": "V-て + もいい (です/ですか)",
          "example": "もう帰ってもいいですよ。",
          "exampleTranslation": "Bạn có thể về được rồi đấy.",
          "caution": "Khi nói với người bề trên, không dùng 〜てもいい để cho phép họ."
        }
      ],
      "summary": "Thiếu chữ 'いい' câu sẽ biến từ xin phép sang câu nhượng bộ dở dang."
    },
    "notes": [
      "Trong giao tiếp lịch sự hơn, thay '〜てもいいですか' bằng '〜てもよろしいでしょうか' hoặc '〜てもかまいませんか'."
    ],
    "warnings": [
      "Tránh trả lời sếp '〜てもいいです' khi sếp xin phép bạn điều gì. Đối với bề trên, phải dùng thể lịch sự khiêm nhường."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-kara-va-node",
        "title": "Phân biệt から (kara) và ので (node) chỉ nguyên nhân, lý do",
        "reason": "Nêu lý do đi kèm khi xin phép bằng 〜てもいいですか"
      },
      {
        "category": "conversation",
        "slug": "nho-giup-do-va-yeu-cau-lich-su",
        "title": "Cách nhờ vả và đưa ra yêu cầu lịch sự: Từ 〜てください đến 〜ていただけませんか",
        "reason": "Mở rộng các mẫu câu xin phép và nhờ vả trang trọng"
      }
    ]
  },
  {
    "id": "g-te-iru",
    "slug": "ban-chat-cau-truc-te-iru",
    "categoryId": "grammar",
    "title": "Bản chất cấu trúc 〜ている: Hành động tiếp diễn, trạng thái kết quả & thói quen",
    "japaneseTitle": "「〜ている」の3大用法（進行・結果状態・習慣）",
    "summary": "Giải mã 3 sắc thái lớn của 〜ている: Đang thực hiện hành động, trạng thái là kết quả của hành động đã xong trong quá khứ, và thói quen lặp lại.",
    "level": "N5",
    "tags": [
      "Ngữ pháp",
      "Thể Te",
      "ている",
      "Trạng thái",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ti-1",
        "title": "1. Ý nghĩa 1: Hành động đang diễn ra (Tiếp diễn)",
        "content": "Đi kèm các động từ hành vi có thời lượng kéo dài (đọc, ăn, viết, học). Diễn tả hành động đang xảy ra ngay tại thời điểm nói tương đương 'to be V-ing' trong tiếng Anh (今、本を読んでいます - Tôi đang đọc sách).",
        "type": "rule"
      },
      {
        "id": "sec-ti-2",
        "title": "2. Ý nghĩa 2: Trạng thái kết quả (Lỗi lớn nhất của người học!)",
        "content": "Đi kèm các động từ biến đổi trạng thái mang tính khoảnh khắc (kết hôn, chết, mở cửa, mặc áo, biết). Khi chuyển sang 〜ている, nó KHÔNG mang nghĩa là đang làm, mà là HÀNH ĐỘNG ĐÃ LÀM XONG VÀ TRẠNG THÁI ĐÓ ĐANG TỒN TẠI.\n- 結婚しています: Đã kết hôn và hiện đang trong tình trạng có gia đình (chứ không phải đang tổ chức đám cưới!).\n- 死んでいます: Đã chết và hiện đang ở trạng thái chết.",
        "type": "rule"
      },
      {
        "id": "sec-ti-3",
        "title": "3. Ý nghĩa 3: Nghề nghiệp và thói quen lặp lại lâu dài",
        "content": "Diễn tả một thói quen hoặc hành vi mang tính nghề nghiệp được lặp đi lặp lại thường xuyên trong đời sống: 銀行で働いています (Tôi đang làm việc ở ngân hàng).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-ti-1",
        "japanese": "田中さんは今、電話をかけています。",
        "reading": "たなかさんはいま、でんわをかけています。",
        "romaji": "Tanaka-san wa ima, denwa o kakete imasu.",
        "vietnamese": "Anh Tanaka bây giờ đang gọi điện thoại.",
        "explanation": "Hành động gọi điện đang diễn ra ở hiện tại.",
        "context": "Hành động tiếp diễn"
      },
      {
        "id": "ex-ti-2",
        "japanese": "窓が開いています。",
        "reading": "まどがあいています。",
        "romaji": "Mado ga aite imasu.",
        "vietnamese": "Cửa sổ đang mở (ở trạng thái mở sẵn).",
        "explanation": "Tự động từ 開く kết hợp với ている để biểu thị trạng thái kết quả của chiếc cửa sổ.",
        "context": "Trạng thái kết quả"
      },
      {
        "id": "ex-ti-3",
        "japanese": "私はメガネをかけています。",
        "reading": "わたしはメガネをかけています。",
        "romaji": "Watashi wa megane o kakete imasu.",
        "vietnamese": "Tôi đang đeo kính (trên mặt tôi hiện có cặp kính).",
        "explanation": "Hành vi đeo đã xong, hiện tại duy trì trạng thái đeo trên mặt.",
        "context": "Miêu tả ngoại hình"
      }
    ],
    "comparisons": {
      "title": "Hành động đang diễn ra vs Trạng thái kết quả",
      "items": [
        {
          "subject": "Động từ hành vi (Đang làm)",
          "nuance": "Chưa kết thúc, đang trong tiến trình",
          "formula": "Động từ hành vi + ている",
          "example": "ご飯を食べています。",
          "exampleTranslation": "Tôi đang ăn cơm.",
          "caution": "Dừng lại là hết ăn."
        },
        {
          "subject": "Động từ trạng thái / Khoảnh khắc (Đã xong & còn duy trì)",
          "nuance": "Hành động xảy ra trong chớp mắt, kết quả đọng lại",
          "formula": "Động từ khoảnh khắc + ている",
          "example": "鍵が落ちています。",
          "exampleTranslation": "Chùm chìa khóa đang rơi nằm ở dưới đất.",
          "caution": "Không dịch là 'đang rơi', mà là 'đã rơi và đang nằm đó'."
        }
      ],
      "summary": "Nếu động từ có thể làm liên tục 30 phút -> ている là 'đang làm'. Nếu động từ chỉ diễn ra trong 1 giây -> ている là 'kết quả còn lưu lại'."
    },
    "notes": [
      "Động từ 知る (biết): Khẳng định dùng 知っています (đang có kiến thức đó), nhưng phủ định BẮT BUỘC dùng 知りません (chứ không dùng 知っていません)."
    ],
    "warnings": [
      "Tuyệt đối không dịch 'Tôi đang kết hôn' khi thấy 結婚しています. Phải hiểu là 'Tôi đã có gia đình'."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-tu-dong-tu-va-tha-dong-tu",
        "title": "Bản chất Tự động từ (Jidoushi) & Tha động từ (Tadoushi) kèm cặp từ thông dụng",
        "reason": "Tự động từ đi với ている luôn miêu tả trạng thái kết quả"
      },
      {
        "category": "vocabulary",
        "slug": "phan-biet-shiru-va-wakaru",
        "title": "Phân biệt 知る (shiru) và 分かる (wakaru) - Biết thông tin vs Thấu hiểu bản chất",
        "reason": "Đặc thù thể phủ định của 知っています"
      },
      {
        "category": "grammar",
        "slug": "cau-truc-sugiru-va-nagara",
        "title": "Cấu trúc 〜すぎる (vượt quá mức độ) và 〜ながら (hành động diễn ra đồng thời)",
        "reason": "Hành động phụ tiếp diễn đồng thời với hành động chính"
      }
    ]
  },
  {
    "id": "g-tai-hoshii",
    "slug": "phan-biet-tai-va-hoshii",
    "categoryId": "grammar",
    "title": "Phân biệt 〜たい (muốn làm) và 〜ほしい (muốn có) & quy tắc chủ ngữ",
    "japaneseTitle": "願望表現「〜たい」と「〜ほしい」のルール",
    "summary": "Phân biệt mong muốn hành động (V-たい) với mong muốn sở hữu vật thể (N-がほしい), cùng điều cấm kỵ khi hỏi trực tiếp người bề trên.",
    "level": "N5",
    "tags": [
      "Ngữ pháp",
      "Nguyện vọng",
      "たい",
      "ほしい",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-th-1",
        "title": "1. Khác biệt cơ bản về đối tượng mong muốn",
        "content": "- V-たい: Muốn thực hiện một HÀNH ĐỘNG (Đi với động từ: 日本へ行きたい - Muốn đi Nhật).\n- N がほしい: Muốn sở hữu một ĐỒ VẬT / DANH TỪ (Đi với danh từ: 新しい車がほしい - Muốn có chiếc xe ô tô mới).",
        "type": "rule"
      },
      {
        "id": "sec-th-2",
        "title": "2. Quy tắc chủ ngữ ngôi thứ 3 (Người khác muốn)",
        "content": "Trong tiếng Nhật, cảm xúc nội tâm sâu kín chỉ bản thân người nói (ngôi thứ 1) mới cảm nhận chắc chắn được. Do đó, bạn KHÔNG ĐƯỢC NÓI '田中さんは日本へ行きたいです'. Khi nói về người thứ 3, bắt buộc phải dùng:\n- 〜たがっています (Đang tỏ ra muốn...)\n- 〜たいと言っています (Nói rằng muốn...)\n- 〜たいそうです (Nghe nói là muốn...).",
        "type": "rule"
      },
      {
        "id": "sec-th-3",
        "title": "3. Điều cấm kỵ với người bề trên",
        "content": "Không bao giờ hỏi sếp hoặc khách hàng: 'お茶がほしいですか' hay '何が食べたいですか'. Hỏi trực tiếp như vậy bị coi là suồng sã, tò mò vào mong muốn cá nhân của họ. Hãy thay bằng câu đề xuất lịch sự: 'お茶はいかがですか' (Trà có được không ạ?).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-th-1",
        "japanese": "今度の休みに富士山に登りたいです。",
        "reading": "こんどのやすみにふじさんにのぼりたいです。",
        "romaji": "Kondo no yasumi ni Fujisan ni noboritai desu.",
        "vietnamese": "Kỳ nghỉ tới tôi muốn leo núi Phú Sĩ.",
        "explanation": "Muốn làm hành động 'leo núi' -> V-たい.",
        "context": "Bày tỏ nguyện vọng cá nhân"
      },
      {
        "id": "ex-th-2",
        "japanese": "弟は新しいゲームをほしがっています。",
        "reading": "おとうとはあたらしいゲームをほしがっています。",
        "romaji": "Otouto wa atarashii geemu o hoshigatte imasu.",
        "vietnamese": "Em trai tôi đang rất muốn có bộ game mới.",
        "explanation": "Người thứ 3 (em trai) muốn có đồ vật -> Dùng đuôi ほしがる.",
        "context": "Miêu tả ý muốn người khác"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu 〜たい vs 〜ほしい",
      "items": [
        {
          "subject": "V-たい (Muốn làm)",
          "nuance": "Khát khao thực hiện hành vi, động từ chuyển thành tính từ đuôi -i",
          "formula": "V(bỏ ます) + たい (Trợ từ を hoặc が)",
          "example": "水を飲みたいです。",
          "exampleTranslation": "Tôi muốn uống nước.",
          "caution": "Tân ngữ có thể đi với を hoặc が."
        },
        {
          "subject": "N が ほしい (Muốn có)",
          "nuance": "Khát khao sở hữu một đối tượng danh từ cụ thể",
          "formula": "Danh từ + が + ほしい",
          "example": "自由な時間がほしいです。",
          "exampleTranslation": "Tôi muốn có thời gian tự do.",
          "caution": "Trợ từ bắt buộc là が, không dùng を."
        }
      ],
      "summary": "Muốn ĐỘNG TỪ thì dùng たい; muốn DANH TỪ thì dùng ほしい."
    },
    "notes": [
      "Phủ định của たい là たくない; phủ định của ほしい là ほしくない."
    ],
    "warnings": [
      "Hỏi người lạ 'コーヒーがほしいですか' là câu hỏi dịch thô từ tiếng Anh/Việt và nghe rất khiếm nhã trong tiếng Nhật."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "goi-mon-tai-nha-hang-quan-an",
        "title": "Giao tiếp tại nhà hàng: Đặt bàn, gọi món, xin nước uống và yêu cầu tính tiền",
        "reason": "Cách diễn đạt mong muốn gọi món tinh tế thay vì dùng たい thô cứng"
      },
      {
        "category": "notes",
        "slug": "khi-nao-khong-nen-dich-word-by-word",
        "title": "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        "reason": "Tránh bẫy dịch trực tiếp từ 'muốn' sang tiếng Nhật"
      }
    ]
  },
  {
    "id": "g-naide-nakute",
    "slug": "phan-biet-naide-va-nakute",
    "categoryId": "grammar",
    "title": "Phân biệt 〜ないで và 〜なくて: Hành động đi kèm, lý do hay nhượng bộ?",
    "japaneseTitle": "否定の接続「〜ないで」と「〜なくて」の使い分け",
    "summary": "Phân biệt rạch ròi giữa 'không làm A mà làm B / trạng thái phụ đi kèm' (ないで) và 'vì không A nên B / nối tính từ phủ định' (なくて).",
    "level": "N4",
    "tags": [
      "Ngữ pháp",
      "Phủ định",
      "ないで",
      "なくて",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-nn-1",
        "title": "1. V-ないで: Làm hành động B trong trạng thái không làm A",
        "content": "V-ないで (naide) được dùng khi hai hành động cùng xuất phát từ một chủ thể:\n- Làm B mà không làm A: 朝ご飯を食べないで、学校へ行きました (Tôi đến trường mà không ăn sáng).\n- Dùng trong câu yêu cầu/xin đừng: 忘れないでください (Xin đừng quên).",
        "type": "rule"
      },
      {
        "id": "sec-nn-2",
        "title": "2. V-なくて / A-くなくて: Nêu nguyên nhân, lý do hoặc sự tương phản",
        "content": "V-なくて (nakute) đóng vai trò như liên từ chỉ lý do hoặc nối các vế câu phủ định:\n- Vì không A nên kết quả B xảy ra: 時間がなくて、朝ご飯を食べられませんでした (Vì không có thời gian nên tôi không thể ăn sáng).\n- Dùng cho tính từ đuôi -i và -na: 高くなくて、おいしいです (Không đắt mà lại ngon).",
        "type": "rule"
      },
      {
        "id": "sec-nn-3",
        "title": "3. Mẹo kiểm tra thay thế cực nhanh",
        "content": "Hãy tự hỏi: Câu này mang nghĩa 'LÀM MÀ KHÔNG CÓ CÁI ĐÓ' (-> ないで) hay mang nghĩa 'VÌ KHÔNG CÓ NÊN...' (-> なくて)?\n- Đi làm mà không mang ô -> 傘を持たないで会社に行った (ないで).\n- Vì không có tiền nên không mua được ô -> お金がなくて買えなかった (なくて).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-nn-1",
        "japanese": "辞書を見ないで、日本語の新聞を読みました。",
        "reading": "じしょをみないで、にほんごのしんぶんをよみました。",
        "romaji": "Jisho o minaide, nihongo no shinbun o yomimashita.",
        "vietnamese": "Tôi đã đọc báo tiếng Nhật mà không cần tra từ điển.",
        "explanation": "Hành động đọc báo được thực hiện kèm điều kiện 'không tra từ điển' -> Dùng ないで.",
        "context": "Phương thức thực hiện hành động"
      },
      {
        "id": "ex-nn-2",
        "japanese": "バスが来なくて、30分も待ちました。",
        "reading": "バスがこなくて、さんじゅっぷんもまちました。",
        "romaji": "Basu ga konakute, sanjuppun mo machimashita.",
        "vietnamese": "Vì xe buýt không tới nên tôi đã phải đợi tận 30 phút.",
        "explanation": "Xe buýt không tới là nguyên nhân dẫn đến việc phải đợi lâu -> Dùng なくて.",
        "context": "Nêu nguyên nhân lý do"
      }
    ],
    "comparisons": {
      "title": "Đối chiếu 〜ないで vs 〜なくて",
      "items": [
        {
          "subject": "V-ないで (Không làm... mà làm...)",
          "nuance": "Chỉ trạng thái hoặc hành vi đi kèm; đi được với câu xin đừng (〜ないでください)",
          "formula": "V-ない + で + [Hành động khác]",
          "example": "砂糖を入れないで飲みます。",
          "exampleTranslation": "Tôi uống mà không bỏ đường.",
          "caution": "Không dùng để nối tính từ."
        },
        {
          "subject": "V-なくて (Vì không... / Nối tính từ)",
          "nuance": "Chỉ nguyên nhân, lý do khách quan; nối 2 mệnh đề tương phản",
          "formula": "V-なく / A-くなく + て + [Kết quả]",
          "example": "会えなくて、寂しいです。",
          "exampleTranslation": "Vì không được gặp bạn nên tôi rất buồn.",
          "caution": "Không dùng trong câu cấm đoán yêu cầu (không có 〜なくてください)."
        }
      ],
      "summary": "Thần chú: 'Không làm A mà làm B' -> ないで; 'Vì không có A nên B' -> なくて."
    },
    "notes": [
      "Câu 'Cảm ơn vì đã...' khi dùng phủ định luôn đi với なくて: 来てくれなくて -> 来てくださってありがとうございます; nhưng 'Xin lỗi vì không đến được' -> 行けなくてすみません."
    ],
    "warnings": [
      "Không bao giờ tồn tại cấu trúc '〜なくてください'. Muốn xin đừng làm gì bắt buộc phải là '〜ないでください'."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-kara-va-node",
        "title": "Phân biệt から (kara) và ので (node) chỉ nguyên nhân, lý do",
        "reason": "So sánh các cách biểu đạt lý do trong tiếng Nhật"
      },
      {
        "category": "conversation",
        "slug": "xin-loi-va-dap-lai-loi-xin-loi",
        "title": "Văn hóa xin lỗi trong tiếng Nhật: Từ Sumimasen, Gomennasai đến Moushiwake arimasen",
        "reason": "Cấu trúc xin lỗi vì không làm được điều gì (〜なくてすみません)"
      }
    ]
  },
  {
    "id": "g-ta-koto-ga-aru",
    "slug": "cau-truc-ta-koto-ga-aru",
    "categoryId": "grammar",
    "title": "Cấu trúc 〜たことがある: Kể về trải nghiệm trong quá khứ & những bẫy thường gặp",
    "japaneseTitle": "経験表現「〜たことがある」の正しい使い方",
    "summary": "Phân biệt giữa 'kể trải nghiệm trong đời' (〜たことがある) với 'hành động vừa làm trong quá khứ đơn thuần' (V-ました) và cách trả lời câu hỏi kinh nghiệm.",
    "level": "N5",
    "tags": [
      "Ngữ pháp",
      "Trải nghiệm",
      "Thể Ta",
      "たことがある",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-tk-1",
        "title": "1. Bản chất: Trải nghiệm tích lũy trong quá khứ",
        "content": "Cấu trúc V-たことがある diễn tả một sự việc người nói đã từng trải qua ít nhất một lần từ trước đến nay trong cuộc đời (như một tài sản kinh nghiệm cá nhân).",
        "type": "rule"
      },
      {
        "id": "sec-tk-2",
        "title": "2. Bẫy nhầm lẫn giữa V-たことがある và V-ました",
        "content": "- 'Hôm qua tôi đã ăn sushi' -> Kinou sushi o tabemashita (V-ました: Sự kiện đơn lẻ đã hoàn tất trong quá khứ gần có mốc thời gian rõ ràng).\n- 'Tôi đã từng ăn sushi' -> Sushi o tabeta koto ga arimasu (V-たことがある: Trải nghiệm trong đời, không đi kèm mốc thời gian cụ thể như 'hôm qua, sáng nay').",
        "type": "pattern"
      },
      {
        "id": "sec-tk-3",
        "title": "3. Cách trả lời câu hỏi phủ định 'Chưa từng làm bao giờ'",
        "content": "Khi được hỏi '〜たことがありますか', nếu chưa từng làm bao giờ, người Nhật thường trả lời:\n- いいえ、一度もありません (Không, chưa một lần nào cả).\n- いいえ、まだありません (Không, tôi vẫn chưa có dịp làm).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-tk-1",
        "japanese": "日本へ行ったことがありますか。",
        "reading": "にほんへいったことがありますか。",
        "romaji": "Nihon e itta koto ga arimasu ka.",
        "vietnamese": "Bạn đã từng đi Nhật Bản bao giờ chưa?",
        "explanation": "Hỏi về kinh nghiệm đã từng đặt chân đến nước Nhật trong đời hay chưa.",
        "context": "Hỏi thăm trải nghiệm"
      },
      {
        "id": "ex-tk-2",
        "japanese": "富士山に登ったことは一度もありません。",
        "reading": "ふじさんにのぼったことはいちどもありません。",
        "romaji": "Fujisan ni nobotta koto wa ichido mo arimasen.",
        "vietnamese": "Tôi chưa từng leo núi Phú Sĩ một lần nào cả.",
        "explanation": "Phủ định hoàn toàn kinh nghiệm bằng 一度もありません.",
        "context": "Kể về việc chưa từng trải qua"
      }
    ],
    "comparisons": {
      "title": "V-たことがある vs V-ました",
      "items": [
        {
          "subject": "V-たことがある (Đã từng trải qua)",
          "nuance": "Nhấn mạnh vào kinh nghiệm sống tích lũy trong cuộc đời",
          "formula": "V(thể Ta) + ことがある",
          "example": "納豆を食べたことがあります。",
          "exampleTranslation": "Tôi đã từng ăn Natto rồi.",
          "caution": "Không dùng với các từ chỉ thời gian gần như 'hôm qua', 'vừa nãy'."
        },
        {
          "subject": "V-ました (Đã làm việc gì)",
          "nuance": "Chỉ một hành động cụ thể đã kết thúc trong quá khứ",
          "formula": "V-ました",
          "example": "昨日の夜、納豆を食べました。",
          "exampleTranslation": "Tối hôm qua tôi đã ăn Natto.",
          "caution": "Gắn liền với mốc thời gian cụ thể của sự việc."
        }
      ],
      "summary": "Nếu có từ 'hôm qua, tuần trước' -> dùng V-ました; nếu nói về vốn sống 'đã từng' -> dùng たことがある."
    },
    "notes": [
      "Có thể thêm phó từ 一度 (ichido - một lần) hoặc 何度も (nandomo - nhiều lần) để làm rõ mức độ: 何度もあります (Đã từng làm nhiều lần rồi)."
    ],
    "warnings": [
      "Sai ngữ pháp: '昨日の朝、パンを食べたことがあります' (Sai vì 'sáng hôm qua' là sự kiện cụ thể, không thể coi là trải nghiệm cuộc đời)."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "ban-chat-cau-truc-te-iru",
        "title": "Bản chất cấu trúc 〜ている: Hành động tiếp diễn, trạng thái kết quả & thói quen",
        "reason": "Phân biệt các dạng biểu đạt thời gian và trạng thái động từ"
      },
      {
        "category": "conversation",
        "slug": "chao-hoi-va-mo-dau-cuoc-tro-chuyen",
        "title": "Chào hỏi và mở đầu cuộc trò chuyện tự nhiên chuẩn người bản xứ",
        "reason": "Mẫu câu hỏi kinh nghiệm để bắt chuyện với người mới quen"
      }
    ]
  },
  {
    "id": "g-to-ba-tara-nara",
    "slug": "so-sanh-to-ba-tara-nara",
    "categoryId": "grammar",
    "title": "So sánh 4 mẫu câu điều kiện と, ば, たら, なら ở mức độ nhập môn",
    "japaneseTitle": "初級条件表現「と・ば・たら・なら」の使い分け",
    "summary": "Bản đồ phân biệt 4 từ chỉ điều kiện giả định 'Nếu / Hễ mà': Tự nhiên hiển nhiên (と), Giả định chung (ば), Sau khi xong / Thực tế đời sống (たら), Tiếp nhận chủ đề đối phương (なら).",
    "level": "N4",
    "tags": [
      "Ngữ pháp",
      "Câu điều kiện",
      "と",
      "ば",
      "たら",
      "なら",
      "N4"
    ],
    "readTimeMinutes": 8,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-tb-1",
        "title": "1. Điều kiện hiển nhiên: と (Hễ mà... là...)",
        "content": "Dùng cho các quy luật tự nhiên, sự thật hiển nhiên hoặc chỉ dẫn đường đi máy móc:\n- Mùa xuân đến thì hoa nở: 春になると、花が咲きます.\n- Rẽ phải ở góc kia là thấy ngân hàng: あの角を右へ曲がると、銀行があります.\nĐặc điểm: Vế sau KHÔNG ĐƯỢC LÀ ý chí, mệnh lệnh, rủ rê của con người.",
        "type": "rule"
      },
      {
        "id": "sec-tb-2",
        "title": "2. Điều kiện thực dụng nhất: たら (Nếu... / Sau khi...)",
        "content": "Là mẫu câu điều kiện linh hoạt và phổ biến nhất trong khẩu ngữ đời sống:\n- Vế sau có thể thoải mái đi cùng mệnh lệnh, rủ rê, ý chí.\n- Mang nghĩa 'sau khi việc A xong thì làm việc B': 家に帰ったら、すぐシャワーを浴びます (Về đến nhà là tôi đi tắm ngay).",
        "type": "rule"
      },
      {
        "id": "sec-tb-3",
        "title": "3. Điều kiện giả định: ば & Tiếp nhận chủ đề: なら",
        "content": "- ば: Điều kiện giả định logic mang tính lý thuyết ('Nếu có tiền thì tốt nhỉ' - 安ければ買います).\n- なら: Tiếp nhận chủ đề mà đối phương vừa nhắc tới để đưa ra lời khuyên hoặc gợi ý ('Nếu là đi du lịch thì tôi khuyên nên đi Kyoto' - 旅行なら、京都がいいですよ).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-tb-1",
        "japanese": "ボタンを押すと、お釣りが出ます。",
        "reading": "ボタンをおすと、おつりがでます。",
        "romaji": "Botan o osu to, otsuri ga demasu.",
        "vietnamese": "Hễ bấm nút này là tiền thừa sẽ tự động nhả ra.",
        "explanation": "Quy luật vận hành máy móc tự động -> Bắt buộc dùng と.",
        "context": "Máy bán hàng tự động"
      },
      {
        "id": "ex-tb-2",
        "japanese": "明日雨が降ったら、出かけません。",
        "reading": "あしたあめがふったら、でかけません。",
        "romaji": "Ashita ame ga futtara, dekakemasen.",
        "vietnamese": "Ngày mai nếu trời mưa thì tôi sẽ không đi ra ngoài.",
        "explanation": "Giả định thực tế đời sống thường ngày -> Dùng たら.",
        "context": "Kế hoạch ngày mai"
      },
      {
        "id": "ex-tb-3",
        "japanese": "日本へ行くなら、秋が一番おすすめですよ。",
        "reading": "にほんへいくなら、あきがいちばんおすすめですよ。",
        "romaji": "Nihon e iku nara, aki ga ichiban osusume desu yo.",
        "vietnamese": "Nếu bạn định đi Nhật thì mùa thu là thời điểm đáng đi nhất đấy.",
        "explanation": "Đón lấy chủ đề 'đi Nhật' của bạn để đưa ra lời khuyên -> Dùng なら.",
        "context": "Đưa ra lời khuyên"
      }
    ],
    "comparisons": {
      "title": "Bảng tóm tắt nhanh 4 mẫu câu điều kiện",
      "items": [
        {
          "subject": "と (Tự nhiên / Máy móc)",
          "nuance": "Hễ A là tất yếu xảy ra B",
          "formula": "V-từ điển + と",
          "example": "冬になると寒くなります。",
          "exampleTranslation": "Hễ mùa đông tới là trời trở lạnh.",
          "caution": "Vế sau cấm tuyệt đối mệnh lệnh, rủ rê."
        },
        {
          "subject": "たら (Linh hoạt nhất)",
          "nuance": "Nếu A / Sau khi A xong thì làm B",
          "formula": "V-thể Ta + ら",
          "example": "着いたら電話してください。",
          "exampleTranslation": "Đến nơi thì hãy gọi điện cho tôi nhé.",
          "caution": "Hay dùng nhất trong giao tiếp hàng ngày."
        }
      ],
      "summary": "Quy tắc an toàn cho người mới: Trong giao tiếp nói thông thường, nếu phân vân thì dùng たら an toàn tới 80%."
    },
    "notes": [
      "Không nên cố gắng học thuộc lòng mọi sắc thái phức tạp của câu điều kiện ở trình độ sơ cấp; hãy nắm chắc ranh giới: 'Tự nhiên/máy móc' = と, 'Đưa lời khuyên theo chủ đề' = なら, còn lại = たら."
    ],
    "warnings": [
      "Tuyệt đối không dùng と trong câu 'Nếu rảnh thì cùng đi ăn nhé' (sai vì có rủ rê ở vế sau). Phải dùng たら: 暇だったら、ご飯に行きましょう."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-kara-va-node",
        "title": "Phân biệt から (kara) và ので (node) chỉ nguyên nhân, lý do",
        "reason": "Phân biệt nguyên nhân thực tế với điều kiện giả định"
      },
      {
        "category": "notes",
        "slug": "khi-nao-khong-nen-dich-word-by-word",
        "title": "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        "reason": "Cẩn trọng khi dịch từ 'nếu' từ tiếng Việt sang tiếng Nhật"
      },
      {
        "category": "grammar",
        "slug": "phan-biet-sou-you-rashii-phong-doan",
        "title": "Phân biệt 3 mẫu câu phỏng đoán: そう (trực quan), よう (suy đoán), らしい (nghe nói)",
        "reason": "Đối chiếu giữa phán đoán giả định và các sắc thái phỏng đoán thực tế"
      }
    ]
  },
  {
    "id": "g-tro-tu-o",
    "slug": "tro-tu-o-dich-tac-dong-va-khong-gian",
    "categoryId": "grammar",
    "title": "Trợ từ を (o): Đích tác động của hành động và bẫy không gian chuyển động rời khỏi",
    "japaneseTitle": "助詞「を」の役割と移動動詞の落とし穴",
    "summary": "Nắm vững 2 chức năng căn bản của trợ từ を: Đánh dấu tân ngữ chịu tác động trực tiếp và đánh dấu không gian di chuyển xuyên qua hoặc rời khỏi điểm xuất phát.",
    "level": "ALL",
    "tags": [
      "Trợ từ",
      "Ngữ pháp cốt lõi",
      "particle",
      "Động từ chuyển động",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-o-1",
        "title": "1. Chức năng 1: Tân ngữ trực tiếp của tha động từ (Direct Object)",
        "content": "Trợ từ を (phát âm là 'o') đứng ngay sau danh từ để đánh dấu đối tượng chịu tác động trực tiếp của hành động do tha động từ (他動詞) tạo ra. Cấu trúc kinh điển: [Danh từ + を + Tha động từ].\n\nVí dụ: ご飯を食べる (ăn cơm), 本を読む (đọc sách), 水を飲む (uống nước).",
        "type": "rule"
      },
      {
        "id": "sec-o-2",
        "title": "2. Chức năng 2: Không gian chuyển động xuyên qua hoặc điểm xuất phát rời đi",
        "content": "Đây là bẫy lớn nhất với người học: Khi đi kèm các động từ chuyển động (移動動詞) như 渡る (băng qua), 走る (chạy qua), 飛ぶ (bay qua), 歩く (đi bộ qua), を biểu thị khoảng không gian bị xuyên qua.\n\nNgoài ra, với các động từ mang nghĩa rời đi như 出る (rời khỏi), 降りる (xuống xe), 卒業する (tốt nghiệp), を đánh dấu nơi chốn xuất phát điểm mà chủ thể rời bỏ.",
        "type": "pattern"
      },
      {
        "id": "sec-o-3",
        "title": "3. Lỗi người Việt thường gặp: Nhầm を với で và から",
        "content": "Người Việt hay dịch 'băng qua đường' hoặc 'đi bộ trong công viên' rồi chọn trợ từ で (chỉ địa điểm xảy ra hành động). Nhưng nếu hành động là di chuyển liên tục cắt ngang không gian đó, người Nhật bắt buộc dùng を: 公園を散歩する (đi dạo xuyên qua công viên).\n\nĐồng thời, khi xuống xe buýt, nhiều bạn dịch 'xuống từ xe buýt' rồi dùng から (バスから降りる), trong khi cách diễn đạt tự nhiên chuẩn xác của người Nhật là バスを降りる.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-o-1",
        "japanese": "毎朝、公園を走っています。",
        "reading": "まいあさ、こうえんをはしっています。",
        "romaji": "Maiasa, kouen o hashitte imasu.",
        "vietnamese": "Mỗi sáng tôi đều chạy bộ xuyên qua công viên.",
        "explanation": "Công viên là không gian di chuyển liên tục, dùng trợ từ を thay vì で.",
        "context": "Kể về thói quen thể dục buổi sáng"
      },
      {
        "id": "ex-o-2",
        "japanese": "次の駅で電車を降ります。",
        "reading": "つぎのえきででんしゃをおります。",
        "romaji": "Tsugi no eki de densha o orimasu.",
        "vietnamese": "Tôi sẽ xuống tàu điện ở ga kế tiếp.",
        "explanation": "Đánh dấu phương tiện/không gian mà người nói rời khỏi (電車を降りる).",
        "context": "Nói với bạn đồng hành trên tàu"
      },
      {
        "id": "ex-o-3",
        "japanese": "横断歩道を渡るときは、左右をよく見てください。",
        "reading": "おうだんほどうをわたるときは、さゆうをよくみてください。",
        "romaji": "Oudan hodou o wataru toki wa, sayuu o yoku mite kudasai.",
        "vietnamese": "Khi băng qua vạch sang đường, hãy quan sát kỹ hai bên trái phải.",
        "explanation": "Không gian băng cắt ngang là vạch sang đường (横断歩道を渡る).",
        "context": "Lời nhắc an toàn giao thông"
      }
    ],
    "notes": [
      "Trợ từ を viết bằng chữ hiragana を nhưng luôn luôn phát âm là 'o' trong tiếng Nhật hiện đại."
    ],
    "warnings": [
      "Không dùng を với các tự động từ chỉ trạng thái như ある, いる, 分かる, 好きだ. Với các từ này, đối tượng luôn đi với が."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-ni-va-de",
        "title": "Phân biệt trợ từ に (ni) và で (de) chỉ nơi chốn & thời gian",
        "reason": "Đối chiếu を chỉ không gian xuyên qua với に và で chỉ địa điểm"
      },
      {
        "category": "vocabulary",
        "slug": "cum-tu-collocation-sinh-hoat-doi-song",
        "title": "Collocation thiết yếu trong sinh hoạt: 電話をかける, 写真を撮る, 約束をする",
        "reason": "Các cụm động từ tự nhiên đi kèm trợ từ を"
      },
      {
        "category": "conversation",
        "slug": "di-xe-buyt-tai-nhat-ban",
        "title": "Đi xe buýt tại Nhật: Cách lên cửa trước/sau, bấm chuông dừng và thanh toán",
        "reason": "Ứng dụng を khi xuống xe buýt (バスを降りる)"
      }
    ]
  },
  {
    "id": "g-tro-tu-he",
    "slug": "tro-tu-he-phuong-huong-chuyen-dong",
    "categoryId": "grammar",
    "title": "Trợ từ へ (e): Phương hướng chuyển động và sự khác biệt tinh tế với に",
    "japaneseTitle": "助詞「へ」の方向性と「に」との使い分け",
    "summary": "Khám phá sắc thái định hướng của trợ từ へ (phát âm là e) so với đích đến cụ thể của に, cùng các ngữ cảnh viết thư và diễn đạt trang trọng.",
    "level": "N5",
    "tags": [
      "Trợ từ",
      "Ngữ pháp cốt lõi",
      "particle",
      "Phương hướng",
      "N5"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-he-1",
        "title": "1. Bản chất phương hướng của trợ từ へ",
        "content": "Trợ từ へ (viết là へ nhưng phát âm là 'e') dùng để chỉ 'phương hướng hướng tới' của chuyển động. Nếu に tập trung vào 'điểm tiếp đất / đích đến cuối cùng' (Destination Point), thì へ tập trung vào 'vectơ phương hướng' (Direction Heading).\n\nVí dụ: 東京へ行く nhấn mạnh việc người nói cất bước hướng về phía Tokyo, hành trình trải dài về phía đó.",
        "type": "rule"
      },
      {
        "id": "sec-he-2",
        "title": "2. Cặp so sánh kinh điển: へ vs に",
        "content": "Trong câu di chuyển thông thường [Địa điểm + に/へ + 行く/来る/帰る], cả hai đều đúng và có thể thay thế nhau tới 90%. Tuy nhiên:\n- に: Đích đến chính xác. Bắt buộc dùng に khi có hành động ở lại tại đích (友達の家に泊まる) hoặc mục đích di chuyển (買いに行く).\n- へ: Phương hướng mơ hồ hoặc biểu cảm văn học, chào đón (未来への道 - con đường hướng tới tương lai, 日本へようこそ - chào mừng tới Nhật Bản).",
        "type": "pattern"
      },
      {
        "id": "sec-he-3",
        "title": "3. Ứng dụng trong thư từ và đề từ",
        "content": "Trong thư từ hoặc tin nhắn trang trọng, người Nhật dùng [Người nhận + へ] ở đầu thư với ý nghĩa 'Gửi tới...'. Ngược lại, phía dưới thư người gửi ký tên [Người gửi + より].\n\nVí dụ: 田中先生へ (Kính gửi thầy Tanakaへ).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-he-1",
        "japanese": "明日、大阪へ出張します。",
        "reading": "あした、おおさかへしゅっちょうします。",
        "romaji": "Ashita, Oosaka e shucchou shimasu.",
        "vietnamese": "Ngày mai tôi sẽ đi công tác hướng về Osaka.",
        "explanation": "Dùng へ nhấn mạnh phương hướng chuyến đi công tác.",
        "context": "Thông báo lịch trình công tác"
      },
      {
        "id": "ex-he-2",
        "japanese": "日本へようこそ！",
        "reading": "にほんへようこそ！",
        "romaji": "Nihon e youkoso!",
        "vietnamese": "Chào mừng bạn đến với đất nước Nhật Bản!",
        "explanation": "Thành ngữ chào đón luôn dùng へ chứ không dùng に.",
        "context": "Biển hiệu chào mừng tại sân bay"
      },
      {
        "id": "ex-he-3",
        "japanese": "母へ感謝の手紙を書きました。",
        "reading": "はへかんしゃのてがみをかきました。",
        "romaji": "Haha e kansha no tegami o kakimashita.",
        "vietnamese": "Tôi đã viết một lá thư cảm ơn gửi tới mẹ.",
        "explanation": "へ dùng chỉ đối tượng tiếp nhận trong thư từ tình cảm.",
        "context": "Nhân ngày của Mẹ"
      }
    ],
    "notes": [
      "Chữ hiragana へ khi làm trợ từ bắt buộc phát âm là 'e', không đọc là 'he'."
    ],
    "warnings": [
      "Không thể dùng へ thay に khi nói về mục đích di chuyển: 買いに行きます (ĐÚNG) vs 買いへ行きます (SAI)."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-ni-va-de",
        "title": "Phân biệt trợ từ に (ni) và で (de) chỉ nơi chốn & thời gian",
        "reason": "Đối chiếu với に chỉ đích đến xác định"
      },
      {
        "category": "conversation",
        "slug": "hoi-va-chi-duong-trong-thuc-te",
        "title": "Hỏi và chỉ đường thực tế tại Nhật: Cấu trúc câu và từ vựng định hướng",
        "reason": "Ứng dụng trợ từ chỉ phương hướng khi hỏi và chỉ đường"
      },
      {
        "category": "vocabulary",
        "slug": "tu-vung-trai-nghia-khong-gian-vi-tri",
        "title": "Cặp từ trái nghĩa vị trí không gian: 上/下, 前/後, 入る/出る",
        "reason": "Từ vựng phương hướng bổ trợ"
      }
    ]
  },
  {
    "id": "g-to-mo-no",
    "slug": "bo-ba-tro-tu-to-mo-no",
    "categoryId": "grammar",
    "title": "Bộ ba trợ từ kết nối danh từ と, も, の: Bản chất ngữ nghĩa và cách phối hợp",
    "japaneseTitle": "名詞をつなぐ助詞「と」「も」「の」の完全整理",
    "summary": "Làm chủ 3 trợ từ nền tảng liên kết danh từ: と (liệt kê toàn bộ hoặc cùng làm), も (đồng nhất 'cũng') và の (sở hữu, quan hệ thuộc tính phong phú).",
    "level": "N5",
    "tags": [
      "Trợ từ",
      "Ngữ pháp cốt lõi",
      "particle",
      "Danh từ",
      "N5"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-tmn-1",
        "title": "1. Trợ từ と: Liệt kê trọn vẹn và Bạn đồng hành",
        "content": "Trợ từ と có hai công dụng chủ chốt:\n- Liệt kê toàn bộ (Exhaustive listing): [A と B] nghĩa là chỉ có A và B, không còn cái nào khác (khác với や là liệt kê tiêu biểu còn sót).\n- Cùng với ai đó (Accompaniment): [Người + と + Động từ] nghĩa là cùng thực hiện hành động (友達と勉強する - học cùng bạn).",
        "type": "rule"
      },
      {
        "id": "sec-tmn-2",
        "title": "2. Trợ từ も: Đồng nhất tính chất ('Cũng')",
        "content": "Trợ từ も thay thế hoàn toàn cho は, が, を khi biểu thị việc có chung tính chất với sự vật vừa được nhắc đến.\n- Thay thế: 私もベトナム人です (Tôi cũng là người Việt Nam - thay cho は).\n- Đi đôi: [A も B も] nghĩa là 'cả A lẫn B đều...'.\n- Chú ý: も có thể đứng sau に, で, から để nhấn mạnh (東京にも行きました).",
        "type": "rule"
      },
      {
        "id": "sec-tmn-3",
        "title": "3. Trợ từ の: Không chỉ là 'Của'",
        "content": "Người Việt hay dịch の là 'của', dẫn đến bế tắc khi gặp cụm từ tiếng Nhật tự nhiên. Thực chất の nối hai danh từ biểu thị quan hệ thuộc tính:\n- Sở hữu: 私の本 (Sách của tôi).\n- Xuất xứ / Nghề nghiệp: 日本の車 (Xe của Nhật sản xuất), 英語の先生 (Thầy giáo dạy môn tiếng Anh).\n- Vị trí: 机の上 (Phía trên bàn).\n- Đại từ thay thế: 赤いのが好きです (Tôi thích cái màu đỏ - の thay cho danh từ).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-tmn-1",
        "japanese": "りんごとみかんを買いました。",
        "reading": "りんごとみかんをかいました。",
        "romaji": "Ringo to mikan o kaimashita.",
        "vietnamese": "Tôi đã mua táo và quýt (chỉ mua đúng 2 thứ này).",
        "explanation": "Liệt kê đầy đủ danh sách đồ đã mua bằng と.",
        "context": "Báo cáo việc mua sắm"
      },
      {
        "id": "ex-tmn-2",
        "japanese": "肉も魚も好きです。",
        "reading": "にくもさかなもすきです。",
        "romaji": "Niku mo sakana mo suki desu.",
        "vietnamese": "Cả thịt lẫn cá tôi đều thích.",
        "explanation": "Cấu trúc [A も B も] biểu thị cả hai đều như nhau.",
        "context": "Chia sẻ sở thích ăn uống"
      },
      {
        "id": "ex-tmn-3",
        "japanese": "これは日本語の辞書です。",
        "reading": "これはにほんごのじしょです。",
        "romaji": "Kore wa nihongo no jisho desu.",
        "vietnamese": "Đây là từ điển tiếng Nhật.",
        "explanation": "Trợ từ の bổ nghĩa chủng loại nội dung, không phải sở hữu người.",
        "context": "Giới thiệu đồ dùng học tập"
      }
    ],
    "notes": [
      "Khi nối nhiều danh từ liên tiếp, tiếng Nhật có thể lặp lại の: 私の大学の図書館 (Thư viện trường đại học của tôi)."
    ],
    "warnings": [
      "Không dùng と để kết nối hai mệnh đề hoàn chỉnh (câu + câu); để nối hai câu phải dùng そして hoặc けど/から."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-tro-tu-wa-va-ga",
        "title": "Phân biệt trợ từ は (wa) và が (ga) - Bản chất và ngữ cảnh sử dụng",
        "reason": "Cách も thay thế hoặc chồng lên trợ từ は và が"
      },
      {
        "category": "kanji",
        "slug": "chu-han-nhom-con-nguoi-gia-dinh",
        "title": "Chữ Hán nhóm Con người & Gia đình: 父, 母, 兄, 弟, 姉, 妹, 男, 女, 子",
        "reason": "Sử dụng と và の khi miêu tả các thành viên trong gia đình"
      },
      {
        "category": "conversation",
        "slug": "tu-gioi-thieu-ban-than-jikoshoukai",
        "title": "Nghệ thuật tự giới thiệu bản thân (Jikoshoukai) ấn tượng và đúng mực",
        "reason": "Ứng dụng の và も khi nói về xuất thân và chuyên ngành"
      }
    ]
  },
  {
    "id": "g-made-made-ni",
    "slug": "phan-biet-made-va-made-ni",
    "categoryId": "grammar",
    "title": "Phân biệt まで (cho tới khi) và までに (hạn chót hoàn thành): Bản chất hành động",
    "japaneseTitle": "「まで」と「までに」の違い：継続か期限か",
    "summary": "Ranh giới cốt tử giữa hành động duy trì liên tục suốt một khoảng thời gian (まで) và mốc thời gian hạn chót cần hoàn tất hành động dứt điểm (までに).",
    "level": "N5",
    "tags": [
      "Trợ từ",
      "Cặp trợ từ dễ nhầm",
      "comparison",
      "Thời gian",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-mm-1",
        "title": "1. Bản chất của まで (Until / Till): Hành động duy trì liên tục",
        "content": "Trợ từ まで đánh dấu điểm kết thúc của một hành vi mang tính DUY TRÌ LIÊN TỤC (継続動詞).\nTrong suốt quãng thời gian từ lúc bắt đầu cho tới thời điểm đó, hành động không hề ngắt quãng.\n\nĐộng từ thường đi với まで: 待つ (chờ), 働く (làm việc), 勉強する (học), 降る (mưa rơi).\nVí dụ: 5時まで待ちます (Tôi sẽ đợi liên tục cho tới tận 5 giờ).",
        "type": "rule"
      },
      {
        "id": "sec-mm-2",
        "title": "2. Bản chất của までに (By): Hạn chót hoàn thành một lần",
        "content": "Trợ từ までに đánh dấu HẠN CHÓT (Deadline) của một hành động mang tính KẾT THÚC DỨT ĐIỂM (瞬間動詞/完了動詞).\nHành động chỉ diễn ra một lần trước hoặc chậm nhất là ngay tại thời điểm đó.\n\nĐộng từ thường đi với までに: 出す (nộp), 帰る (về nhà), 終わらせる (kết thúc), 連絡する (liên lạc).\nVí dụ: 5時までにレポートを出してください (Hãy nộp báo cáo chậm nhất trước 5 giờ).",
        "type": "rule"
      },
      {
        "id": "sec-mm-3",
        "title": "3. Mẹo kiểm tra 5 giây không bao giờ nhầm",
        "content": "Hãy tự hỏi: 'Hành động này có làm suốt từ bây giờ đến lúc đó không?'\n- Nếu CÓ làm liên tục suốt -> Dùng まで (Đợi, ngủ, làm việc, học tập).\n- Nếu KHÔNG, chỉ cần xong trước mốc đó là được -> Dùng までに (Nộp bài, trả tiền, có mặt, gọi điện).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-mm-1",
        "japanese": "雨がやむまで、ここで雨宿りしましょう。",
        "reading": "あめがやむまで、ここであまやどりしましょう。",
        "romaji": "Ame ga yamu made, koko de amayadori shimashou.",
        "vietnamese": "Chúng ta hãy trú mưa ở đây cho tới khi mưa tạnh hẳn nhé.",
        "explanation": "Hành động trú mưa kéo dài liên tục suốt cho tới lúc tạnh -> Dùng まで.",
        "context": "Gặp cơn mưa bất chợt trên đường"
      },
      {
        "id": "ex-mm-2",
        "japanese": "金曜日までにこの書類を提出してください。",
        "reading": "きんようびまでにこのしょるいをていしゅつしてください。",
        "romaji": "Kinyoubi made ni kono shorui o teishutsu shite kudasai.",
        "vietnamese": "Hãy nộp tập tài liệu này trước thứ Sáu nhé.",
        "explanation": "Nộp bài là hành động dứt điểm, thứ Sáu là hạn chót -> Dùng までに.",
        "context": "Sếp giao deadline cho nhân viên"
      },
      {
        "id": "ex-mm-3",
        "japanese": "図書館は午後8時まで開いています。",
        "reading": "としょかんはごごはちじまであいています。",
        "romaji": "Toshokan wa gogo hachiji made aite imasu.",
        "vietnamese": "Thư viện mở cửa liên tục cho tới 8 giờ tối.",
        "explanation": "Trạng thái mở cửa duy trì liên tục tới 8h tối -> Dùng まで.",
        "context": "Xem giờ hoạt động cơ sở công cộng"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "5時まで待ちます (まで)",
          "nuance": "A có nghĩa là ngồi đợi liên tục từ bây giờ tới 5h. B có nghĩa là đối phương chỉ cần xuất hiện vào bất kỳ lúc nào trước 5h (4h30 đến cũng được).",
          "example": "5時まで待ちます (まで)",
          "exampleTranslation": "5時までに来てください (までに)",
          "caution": "A có nghĩa là ngồi đợi liên tục từ bây giờ tới 5h. B có nghĩa là đối phương chỉ cần xuất hiện vào bất kỳ lúc nào trước 5h (4h30 đến cũng được)."
        }
      ],
      "summary": "A có nghĩa là ngồi đợi liên tục từ bây giờ tới 5h. B có nghĩa là đối phương chỉ cần xuất hiện vào bất kỳ lúc nào trước 5h (4h30 đến cũng được)."
    },
    "notes": [
      "Sau まで có thể là động từ thể từ điển: 日本へ行くまで日本語を勉強する (Học tiếng Nhật liên tục cho tới khi đi Nhật)."
    ],
    "warnings": [
      "Viết sai trong email công việc: '明日まで送ってください' là sai nghĩa, sếp sẽ hiểu là bạn phải gửi liên tục tới ngày mai. Phải viết: 明日までに送ってください."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "tu-vung-ngu-canh-truong-hoc-va-cong-ty",
        "title": "Phân biệt từ vựng môi trường Trường học vs Công ty: 授業/会議, 宿題/書類",
        "reason": "Từ vựng về bài tập, báo cáo và kỳ hạn công sở"
      },
      {
        "category": "conversation",
        "slug": "giao-tiep-noi-lam-viec-aisatsu",
        "title": "Giao tiếp nơi làm việc: Chào buổi sáng, chào ra về, báo cáo Horenso",
        "reason": "Xác nhận kỳ hạn hoàn thành công việc với cấp trên"
      },
      {
        "category": "notes",
        "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        "reason": "Lỗi dịch chữ 'đến' từ tiếng Việt sang まで thay vì までに"
      }
    ]
  },
  {
    "id": "g-shika-dake",
    "slug": "phan-biet-shika-va-dake",
    "categoryId": "grammar",
    "title": "Phân biệt だけ (chỉ - trung tính) và しか〜ない (chỉ - sắc thái thiếu thốn/tiếc nuối)",
    "japaneseTitle": "「だけ」と「しか〜ない」のニュアンスの違い",
    "summary": "So sánh toàn diện giữa だけ mang sắc thái khách quan, tích cực và cặp bài trùng しか〜ない mang tâm lý tiếc nuối, xem số lượng đó là quá ít ỏi.",
    "level": "N4",
    "tags": [
      "Ngữ pháp cốt lõi",
      "Cặp trợ từ dễ nhầm",
      "comparison",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-sd-1",
        "title": "1. Bản chất của だけ (Dake): Giới hạn khách quan / Đủ dùng",
        "content": "Trợ từ だけ giới hạn phạm vi hoặc số lượng một cách KHÁCH QUAN, TRUNG TÍNH.\nĐi với câu KHẲNG ĐỊNH hoặc PHỦ ĐỊNH thông thường. Người nói chỉ đơn thuần thông báo số lượng, không hàm chứa sự phàn nàn hay thiếu thốn.\n\nVí dụ: 100円だけあります (Tôi có 100 yên - người nói thấy 100 yên là đủ để mua viên kẹo).",
        "type": "rule"
      },
      {
        "id": "sec-sd-2",
        "title": "2. Bản chất của しか〜ない (Shika... nai): Tiếc nuối / Quá ít ỏi",
        "content": "Cấu trúc しか... ない BẮT BUỘC ĐI VỚI ĐỘNG TỪ THỂ PHỦ ĐỊNH (ない).\nÝ nghĩa chủ quan: Người nói cảm thấy số lượng hoặc phạm vi đó là QUÁ ÍT, KHÔNG ĐỦ, mang nặng tâm lý TIẾC NUỐI hoặc THẤT VỌNG.\n\nVí dụ: 100円しかありません (Tôi chỉ còn có mỗi 100 yên thôi - cảm thấy không đủ để mua bát mì).",
        "type": "pattern"
      },
      {
        "id": "sec-sd-3",
        "title": "3. Khác biệt cấu trúc ngữ pháp",
        "content": "- だけ có thể đi với câu khẳng định: 水だけ飲みます (Tôi chỉ uống nước thôi).\n- しか bắt buộc đi với thể phủ định: 水しか飲みません (Tôi chẳng uống gì ngoài nước).\n- だけ có thể kết hợp với câu mệnh lệnh: これだけ見てください (Chỉ xem cái này thôi nhé). しか TUYỆT ĐỐI KHÔNG dùng trong câu mệnh lệnh/yêu cầu.",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-sd-1",
        "japanese": "財布には千円だけ入っています。",
        "reading": "さいふにはせんえんだけはいっています。",
        "romaji": "Saifu ni wa sen'en dake haitte imasu.",
        "vietnamese": "Trong ví chỉ có 1.000 yên (nêu sự thật khách quan).",
        "explanation": "Dùng だけ với động từ khẳng định 入っています.",
        "context": "Kiểm tra ví tiền thông thường"
      },
      {
        "id": "ex-sd-2",
        "japanese": "財布には千円しか入っていません。",
        "reading": "さいふにはせんえんしかはいっていません。",
        "romaji": "Saifu ni wa sen'en shika haitte imasen.",
        "vietnamese": "Trong ví chỉ còn vỏn vẹn có 1.000 yên thôi (than vãn, không đủ tiền ăn tối).",
        "explanation": "Dùng しか đi đôi với phủ định 入っていません mang sắc thái thiếu thốn.",
        "context": "Khi bạn bè rủ đi ăn nhà hàng sang trọng"
      },
      {
        "id": "ex-sd-3",
        "japanese": "ひらがなしか書けません。",
        "reading": "ひらがなしかかけません。",
        "romaji": "Hiragana shika kakemasen.",
        "vietnamese": "Tôi chỉ mới viết được mỗi Hiragana thôi (tiếc vì chưa viết được Kanji).",
        "explanation": "Biểu lộ sự tự ti, khiêm tốn về năng lực ngôn ngữ.",
        "context": "Tự nhận xét trình độ tiếng Nhật"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "10分だけ休みましょう (だけ)",
          "nuance": "Câu A dùng だけ mang tính tích cực (Hãy nghỉ ngơi 10 phút nhé). Câu B dùng しか mang nghĩa bức xúc/tiếc nuối (Chỉ được nghỉ có mỗi 10 phút thôi).",
          "example": "10分だけ休みましょう (だけ)",
          "exampleTranslation": "10分しか休めませんでした (しか)",
          "caution": "Câu A dùng だけ mang tính tích cực (Hãy nghỉ ngơi 10 phút nhé). Câu B dùng しか mang nghĩa bức xúc/tiếc nuối (Chỉ được nghỉ có mỗi 10 phút thôi)."
        }
      ],
      "summary": "Câu A dùng だけ mang tính tích cực (Hãy nghỉ ngơi 10 phút nhé). Câu B dùng しか mang nghĩa bức xúc/tiếc nuối (Chỉ được nghỉ có mỗi 10 phút thôi)."
    },
    "notes": [
      "Khi しか đi sau trợ từ を hoặc が, trợ từ を và が thường bị nuốt chìm hoàn toàn: 映画を見る -> 映画しか見ない."
    ],
    "warnings": [
      "Không bao giờ dùng しか với động từ khẳng định (ví dụ: '100円しかあります' là sai ngữ pháp hoàn toàn)."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "pho-tu-chi-muc-do-thuong-gap",
        "title": "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
        "reason": "Các phó từ chỉ mức độ và giới hạn số lượng"
      },
      {
        "category": "conversation",
        "slug": "mua-hang-hoi-gia-va-thanh-toan",
        "title": "Mẫu câu mua sắm, hỏi giá, thử đồ và thanh toán tại cửa hàng & konbini",
        "reason": "Ứng dụng だけ khi chọn đúng một món đồ duy nhất"
      },
      {
        "category": "notes",
        "slug": "khi-nao-khong-nen-dich-word-by-word",
        "title": "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        "reason": "Bẫy dịch chữ 'chỉ' trong tiếng Việt sang tiếng Nhật"
      }
    ]
  },
  {
    "id": "g-kurai-hodo-yori",
    "slug": "so-sanh-kurai-hodo-yori",
    "categoryId": "grammar",
    "title": "So sánh mức độ và ước lượng: くらい / ぐらい, ほど và より",
    "japaneseTitle": "程度と概数を表す「くらい」「ほど」「より」の比較",
    "summary": "Nắm trọn các mẫu câu so sánh hơn (より), so sánh bằng (ほど... ない) và ước lượng chừng mực số lượng (くらい / ぐらい) trong tiếng Nhật N5-N4.",
    "level": "N4",
    "tags": [
      "So sánh",
      "Ước lượng",
      "comparison",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-khy-1",
        "title": "1. くらい / ぐらい: Ước lượng khoảng chừng và Mức độ nhẹ",
        "content": "Đứng sau số từ để chỉ số lượng áng chừng (khoảng, tầm):\n- 1時間くらい (khoảng 1 tiếng), 1000円ぐらい (tầm 1000 yên).\nNgoài ra, くらい dùng để nêu ví dụ mức độ đơn giản, bình thường:\n- 簡単な料理くらい作れます (Cỡ như mấy món ăn đơn giản thì tôi nấu được).",
        "type": "rule"
      },
      {
        "id": "sec-khy-2",
        "title": "2. ほど: Mức độ cao, so sánh bằng phủ định và Ước lượng trang trọng",
        "content": "ほど có các cách dùng quan trọng:\n- So sánh bằng ở dạng phủ định [A は B ほど... ない]: A không bằng B (Hà Nội không lạnh bằng Tokyo: ハノイは東京ほど寒くない).\n- Ước lượng mang văn phong lịch sự, trang trọng hơn くらい.\n- Mức độ cao đến ngạc nhiên: 死ぬほど疲れた (Mệt đến mức gần như muốn chết).",
        "type": "pattern"
      },
      {
        "id": "sec-khy-3",
        "title": "3. より: Mốc chuẩn của so sánh hơn (Than)",
        "content": "Trong câu so sánh hơn [A は B より...]: A thì hơn B.\nTừ đứng trước より chính là 'vật làm mốc chuẩn' để so sánh.\nVí dụ: 新幹線は飛行機より安いです (Tàu Shinkansen thì rẻ hơn so với máy bay).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-khy-1",
        "japanese": "駅から家まで歩いて15分くらいかかります。",
        "reading": "えきからいえまであるいてじゅうごふんくらいかかります。",
        "romaji": "Eki kara ie made aruite juugofun kurai kakarimasu.",
        "vietnamese": "Từ nhà ga về nhà tôi đi bộ mất tầm khoảng 15 phút.",
        "explanation": "くらい dùng ước lượng thời gian đi bộ.",
        "context": "Chỉ đường về nhà mình"
      },
      {
        "id": "ex-khy-2",
        "japanese": "今年の夏は去年ほど暑くありません。",
        "reading": "ことしのなつはきょねんほどあつくありません。",
        "romaji": "Kotoshi no natsu wa kyonen hodo atsuku arimasen.",
        "vietnamese": "Mùa hè năm nay không nóng bằng mùa hè năm ngoái.",
        "explanation": "Cấu trúc [A は B ほど + Phủ định] mang nghĩa A không bằng B.",
        "context": "Bình luận thời tiết hai mùa hè"
      },
      {
        "id": "ex-khy-3",
        "japanese": "日本語は英語より文法が難しいです。",
        "reading": "にほんごはえいごよりぶんぽうがむずかしいです。",
        "romaji": "Nihongo wa eigo yori bunpou ga muzukashii desu.",
        "vietnamese": "Tiếng Nhật thì ngữ pháp khó hơn so với tiếng Anh.",
        "explanation": "英語より làm cột mốc để so sánh tính chất khó hơn của tiếng Nhật.",
        "context": "So sánh trải nghiệm học ngoại ngữ"
      }
    ],
    "notes": [
      "くらい và ぐらい hoàn toàn đồng nghĩa, trong văn nói người Nhật có xu hướng dùng ぐらい nhiều hơn vì phát âm đầm giọng."
    ],
    "warnings": [
      "Trong cấu trúc [A は B ほど... ない], vế đuôi bắt buộc phải là tính từ/động từ PHỦ ĐỊNH."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-shika-va-dake",
        "title": "Phân biệt だけ (chỉ - trung tính) và しか〜ない (chỉ - sắc thái thiếu thốn/tiếc nuối)",
        "reason": "Đối chiếu với だけ và しか〜ない biểu đạt giới hạn số lượng"
      },
      {
        "category": "vocabulary",
        "slug": "phan-biet-takusan-va-ooi",
        "title": "Phân biệt たくさん (phó từ/danh từ) và 多い (tính từ vị ngữ)",
        "reason": "Từ vựng diễn đạt mức độ số lượng nhiều ít"
      },
      {
        "category": "conversation",
        "slug": "mua-hang-hoi-gia-va-thanh-toan",
        "title": "Mẫu câu mua sắm, hỏi giá, thử đồ và thanh toán tại cửa hàng & konbini",
        "reason": "Nói về khoảng giá và số tiền dự trù khi mua sắm"
      }
    ]
  },
  {
    "id": "g-jishokei-usage",
    "slug": "the-tu-dien-jishokei-va-mau-cau-di-kem",
    "categoryId": "grammar",
    "title": "Thể từ điển (Jishokei): Bản chất nguyên mẫu và các mẫu câu N5-N4 cốt lõi",
    "japaneseTitle": "辞書形（基本形）の本質と重要文型",
    "summary": "Hiểu rõ thể từ điển (nguyên mẫu kết thúc bằng cột u), cách quy đổi từ nhóm 1, 2, 3 và 4 mẫu câu nền tảng đi liền với thể này trong JLPT N5-N4.",
    "level": "N5",
    "tags": [
      "Thể động từ",
      "Ngữ pháp cốt lõi",
      "verb",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-jsh-1",
        "title": "1. Thể từ điển (辞書形) là gì?",
        "content": "Thể từ điển là dạng thức gốc nguyên bản của động từ, xuất hiện trong từ điển tiếng Nhật. Tất cả các động từ ở thể từ điển đều kết thúc bằng âm thuộc hàng U (う, く, す, つ, ぬ, ふ, む, る).\n\nQuy tắc chuyển từ thể ます sang thể từ điển:\n- Nhóm 1: Đổi âm [i] trước ます thành âm [u] tương ứng (行きます -> 行く, 読みます -> 読む).\n- Nhóm 2: Bỏ ます thêm る (食べます -> 食べる, 見ます -> 見る).\n- Nhóm 3: します -> する, きます -> くる.",
        "type": "rule"
      },
      {
        "id": "sec-jsh-2",
        "title": "2. Các mẫu câu bắt buộc dùng Thể từ điển",
        "content": "Thể từ điển không chỉ dùng trong giao tiếp suồng sã giữa bạn bè thân thiết, mà còn là mắt xích cấu trúc ngữ pháp quan trọng:\n1. Diễn đạt khả năng: [V-ru + ことができる] (Có thể làm gì).\n2. Diễn đạt sở thích: [V-ru + ことです] (Sở thích là việc làm gì).\n3. Mốc trước khi làm gì: [V-ru + 前に] (Trước khi làm V).\n4. Mẫu câu dự định: [V-ru + つもりです] (Dự định sẽ làm V).",
        "type": "pattern"
      },
      {
        "id": "sec-jsh-3",
        "title": "3. Bẫy ngữ pháp: Mẫu câu [V-ru + 前に]",
        "content": "Trong tiếng Việt ta hay nói: 'Sau khi đã ăn cơm thì mới đi' hoặc 'Trước khi đi ăn cơm'. Trong tiếng Nhật, dù hành động diễn ra ở quá khứ hay tương lai, động từ đứng ngay trước 前に BẮT BUỘC LUÔN Ở THỂ TỪ ĐIỂN, không bao giờ chia thì quá khứ た.\n\nVí dụ: 寝る前に歯を磨きました (Trước khi đi ngủ tôi đã đánh răng - 寝る luôn ở thể từ điển).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-jsh-1",
        "japanese": "私はピアノを弾くことができます。",
        "reading": "わたしはピアノをひくことができます。",
        "romaji": "Watashi wa piano o hiku koto ga dekimasu.",
        "vietnamese": "Tôi có thể chơi đàn piano.",
        "explanation": "弾く là thể từ điển đi với ことができる biểu thị năng lực cá nhân.",
        "context": "Giới thiệu tài lẻ của bản thân"
      },
      {
        "id": "ex-jsh-2",
        "japanese": "ご飯を食べる前に、手を洗います。",
        "reading": "ごはんをたべるまえに、てをあらいます。",
        "romaji": "Gohan o taberu mae ni, te o araimasu.",
        "vietnamese": "Trước khi ăn cơm, tôi rửa tay.",
        "explanation": "Trước 前に luôn là thể từ điển 食べる.",
        "context": "Thói quen vệ sinh hàng ngày"
      },
      {
        "id": "ex-jsh-3",
        "japanese": "来年、日本へ留学するつもりです。",
        "reading": "らいねん、にほんへりゅうがくするつもりです。",
        "romaji": "Rainen, Nihon e ryuugaku suru tsumori desu.",
        "vietnamese": "Sang năm, tôi dự định sẽ đi du học Nhật Bản.",
        "explanation": "留学する (thể từ điển) kết hợp với つもりです thể hiện ý chí ấp ủ.",
        "context": "Chia sẻ kế hoạch tương lai"
      }
    ],
    "notes": [
      "Trong giao tiếp thân mật (Casual), thể từ điển chính là câu khẳng định ở hiện tại/tương lai: 明日行く？ (Mai đi không?)."
    ],
    "warnings": [
      "Động từ nhóm 3 来ます (kimasu) khi chuyển sang thể từ điển đổi cả chữ Kanji/cách đọc thành 来る (kuru), không đọc là kiru."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "ban-chat-cau-truc-te-iru",
        "title": "Bản chất cấu trúc 〜ている: Hành động tiếp diễn, trạng thái kết quả & thói quen",
        "reason": "Sự chuyển biến từ thể từ điển sang thể tiếp diễn ている"
      },
      {
        "category": "grammar",
        "slug": "phan-biet-danh-tu-hoa-koto-va-no",
        "title": "Danh từ hóa động từ bằng こと và の: Bản chất trừu tượng vs Cụ thể cảm giác",
        "reason": "Mẫu câu danh từ hóa [V-thể từ điển + こと/の]"
      },
      {
        "category": "vocabulary",
        "slug": "cum-tu-collocation-sinh-hoat-doi-song",
        "title": "Collocation thiết yếu trong sinh hoạt: 電話をかける, 写真を撮る, 約束をする",
        "reason": "Ghi nhớ các cụm động từ tự nhiên ở thể nguyên bản"
      },
      {
        "category": "grammar",
        "slug": "the-kha-nang-kanoukei-ban-chat-va-tro-tu",
        "title": "Thể khả năng (Kanoukei): Cách chia, chuyển đổi trợ từ を thành が và bẫy dùng từ",
        "reason": "Biến đổi từ thể nguyên mẫu sang thể khả năng và quy tắc trợ từ が"
      }
    ]
  },
  {
    "id": "g-nai-form-patterns",
    "slug": "the-phu-dinh-naikei-va-mau-cau-bat-buoc",
    "categoryId": "grammar",
    "title": "Thể phủ định ngắn (Naikei) và mẫu câu: 〜なければならない, 〜なくてもいい",
    "japaneseTitle": "ない形から広がる文型：義務（〜なければならない）と許可（〜なくてもいい）",
    "summary": "Nắm trọn cách chia thể ない và hai mẫu câu đối nghịch kinh điển: Bắt buộc phải làm (Nghĩa vụ) đối chiếu với Không cần phải làm cũng được (Miễn trừ nghĩa vụ).",
    "level": "N5",
    "tags": [
      "Thể động từ",
      "Ngữ pháp cốt lõi",
      "verb",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-nai-1",
        "title": "1. Cách chia thể ない (Naikei)",
        "content": "- Nhóm 1: Đổi âm hàng [i] trước ます thành hàng [a] rồi thêm ない. Ngoại lệ: âm [i] đứng đơn lẻ đổi thành わ (買い・ます -> 買わない, 読み・ます -> 読まない).\n- Nhóm 2: Bỏ ます thêm ない (食べます -> 食べない).\n- Nhóm 3: します -> しない, きます -> こない (đổi phát âm thành konai).\n- Động từ đặc biệt: あります -> ない (không có dạng arinai).",
        "type": "rule"
      },
      {
        "id": "sec-nai-2",
        "title": "2. Cấu trúc Nghĩa vụ: 〜なければならない (Phải làm gì)",
        "content": "Công thức: [V-nai (bỏ い) + ければならない / ければいけません].\nÝ nghĩa: Nếu không làm thì không được -> Bắt buộc phải làm (do luật pháp, quy định xã hội hoặc bổn phận cá nhân).\n\nTrong văn nói thân mật hàng ngày, người Nhật thường rút gọn thành: 〜なきゃ / 〜なくちゃ.",
        "type": "pattern"
      },
      {
        "id": "sec-nai-3",
        "title": "3. Cấu trúc Miễn trừ: 〜なくてもいい (Không cần làm cũng được)",
        "content": "Công thức: [V-nai (bỏ い) + くてもいい / くてもかまいません].\nÝ nghĩa: Cho phép không thực hiện hành động; đối phương không bị bắt buộc.\n\nVí dụ: 明日は来なくてもいいです (Ngày mai bạn không cần đến cũng được).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-nai-1",
        "japanese": "熱があるので、病院へ行かなければなりません。",
        "reading": "ねつがあるので、びょういんへいかなければなりません。",
        "romaji": "Netsu ga aru node, byouin e ikanakereba narimasen.",
        "vietnamese": "Vì bị sốt nên tôi phải đi đến bệnh viện.",
        "explanation": "行かない bỏ い thành 行かなければなりません chỉ sự cần thiết bắt buộc.",
        "context": "Trình bày lý do phải nghỉ phép"
      },
      {
        "id": "ex-nai-2",
        "japanese": "日曜日ですから、早く起きなくてもいいです。",
        "reading": "にちようびですから、はやくおきなくてもいいです。",
        "romaji": "Nichiyoubi desu kara, hayaku okinakute mo ii desu.",
        "vietnamese": "Vì là Chủ nhật nên tôi không cần phải dậy sớm cũng được.",
        "explanation": "起きない bỏ い thành 起きなくてもいい thể hiện sự thoải mái không ràng buộc.",
        "context": "Tận hưởng ngày nghỉ cuối tuần"
      },
      {
        "id": "ex-nai-3",
        "japanese": "ここで写真を撮らないでください。",
        "reading": "ここでしゃしんをとらないでください。",
        "romaji": "Koko de shashin o toranaide kudasai.",
        "vietnamese": "Xin vui lòng không chụp ảnh ở đây.",
        "explanation": "Mẫu câu cấm đoán lịch sự: [V-nai + でください].",
        "context": "Biển nhắc nhở tại bảo tàng"
      }
    ],
    "notes": [
      "Trong giao tiếp đời thường, câu hỏi 'Tôi không cần làm có được không?' sẽ là [V-なくてもいいですか]."
    ],
    "warnings": [
      "Không nhầm なければならない (bắt buộc) với てはいけない (cấm đoán tuyệt đối)."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-naide-va-nakute",
        "title": "Phân biệt 〜ないで và 〜なくて: Hành động đi kèm, lý do hay nhượng bộ?",
        "reason": "Phân biệt cụ thể hai dạng biến thể của thể ない"
      },
      {
        "category": "conversation",
        "slug": "di-kham-tai-benh-vien-phong-kham",
        "title": "Đi khám tại phòng khám/bệnh viện: Khai phiếu hỏi bệnh, mô tả triệu chứng và lấy đơn thuốc",
        "reason": "Mẫu câu dặn dò uống thuốc và kiêng cữ của bác sĩ"
      },
      {
        "category": "conversation",
        "slug": "xin-phep-lich-su-trong-doi-song",
        "title": "Cách xin phép lịch sự: Từ 〜てもいいですか đến 〜てよろしいでしょうか",
        "reason": "Đối chiếu giữa xin phép được làm và miễn trừ nghĩa vụ không cần làm"
      }
    ]
  },
  {
    "id": "g-ta-form-patterns",
    "slug": "the-qua-khu-takei-va-mau-cau-quan-trong",
    "categoryId": "grammar",
    "title": "Thể quá khứ ngắn (Ta-kei) và các mẫu câu: 〜たり〜たり, 〜後で, 〜たほうがいい",
    "japaneseTitle": "た形の重要文型：〜たり〜たり、〜たあとで、〜たほうがいい",
    "summary": "Quy tắc chuyển thể た (giống hệt thể て) và cách ứng dụng vào 3 mẫu câu N5-N4: Liệt kê hành động tiêu biểu, trình tự thời gian và đưa ra lời khuyên chân thành.",
    "level": "N5",
    "tags": [
      "Thể động từ",
      "Ngữ pháp cốt lõi",
      "verb",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-ta-1",
        "title": "1. Bản chất và cách chuyển thể た",
        "content": "Quy tắc chuyển từ thể ます sang thể た giống hệt cách chia thể て, chỉ việc thay [て -> た] và [で -> だ].\n- Nhóm 1: 買います -> 買った, 読みます -> 読んだ, 行きます -> 行った.\n- Nhóm 2: 食べます -> 食べた, 見ます -> 見た.\n- Nhóm 3: します -> した, きます -> きた.",
        "type": "rule"
      },
      {
        "id": "sec-ta-2",
        "title": "2. Cấu trúc liệt kê hành động: 〜たり〜たりする",
        "content": "Công thức: [V1-ta + り, V2-ta + り + します].\nÝ nghĩa: Liệt kê một vài hành động tiêu biểu trong số nhiều việc đã làm hoặc sẽ làm, không hàm ý thứ tự trước sau.\n\nChú ý: Đuôi câu luôn kết thúc bằng động từ する (chia thì quá khứ した hoặc tương lai します).",
        "type": "pattern"
      },
      {
        "id": "sec-ta-3",
        "title": "3. Cấu trúc trình tự (〜後で) và Đưa lời khuyên (〜たほうがいい)",
        "content": "- [V-ta + 後で]: Sau khi đã làm V xong thì làm việc tiếp theo (ご飯を食べた後で、薬を飲みます).\n- [V-ta + ほうがいいです]: Nên làm việc này (đưa ra lời khuyên chân thành, khuyên nhủ tốt cho đối phương). Ngược lại: Khuyên không nên làm là [V-nai + ほうがいいです].",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-ta-1",
        "japanese": "休みの日は、本を読んだり散歩したりしています。",
        "reading": "やすみのひは、ほんをよんだりさんぽしたりしています。",
        "romaji": "Yasumi no hi wa, hon o yondari sanpo shitari shite imasu.",
        "vietnamese": "Vào ngày nghỉ, tôi thường lúc thì đọc sách, lúc thì đi dạo.",
        "explanation": "Liệt kê vài việc tiêu biểu làm trong ngày nghỉ bằng たり... たりする.",
        "context": "Trả lời câu hỏi về thời gian rảnh"
      },
      {
        "id": "ex-ta-2",
        "japanese": "風邪のときは、温かいお風呂に入って早く寝たほうがいいですよ。",
        "reading": "かぜのときは、あたたかいおふろにはいってはやくねたほうがいいですよ。",
        "romaji": "Kaze no toki wa, atatakai ofuro ni haitte hayaku neta hou ga ii desu yo.",
        "vietnamese": "Khi bị cảm, bạn nên tắm nước ấm rồi đi ngủ sớm nhé.",
        "explanation": "Dùng 寝たほうがいい đưa ra lời khuyên chăm sóc sức khỏe.",
        "context": "Khuyên đồng nghiệp đang ốm"
      },
      {
        "id": "ex-ta-3",
        "japanese": "仕事が終わった後で、飲みに行きませんか。",
        "reading": "しごとがおわったあとで、のみにいきませんか。",
        "romaji": "Shigoto ga owatta ato de, nomi ni ikimasen ka.",
        "vietnamese": "Sau khi công việc kết thúc, chúng ta đi uống nước nhé?",
        "explanation": "終わった後で nhấn mạnh hành vi uống nước diễn ra sau khi tan sở.",
        "context": "Rủ đồng nghiệp đi nhậu"
      }
    ],
    "notes": [
      "Khác với thể て nối hành động theo trình tự thời gian liên tiếp (ăn cơm rồi đi học), たり...たり không ép buộc thứ tự."
    ],
    "warnings": [
      "Không quên động từ する ở cuối cấu trúc たり... たり (ví dụ:の本を読んだり散歩したり [thiếu する là sai câu])."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "cau-truc-ta-koto-ga-aru",
        "title": "Cấu trúc 〜たことがある: Kể về trải nghiệm trong quá khứ & những bẫy thường gặp",
        "reason": "Mẫu câu trải nghiệm trong quá khứ đi với thể た"
      },
      {
        "category": "vocabulary",
        "slug": "tu-vung-trai-nghia-khong-gian-vi-tri",
        "title": "Cặp từ trái nghĩa vị trí không gian: 上/下, 前/後, 入る/出る",
        "reason": "Trước sau: 前に vs 後で đi với động từ"
      },
      {
        "category": "conversation",
        "slug": "ky-nang-tan-gau-small-talk",
        "title": "Kỹ năng tán gẫu (Aizuchi & Small Talk): Mở lời về thời tiết, đồ ăn và giữ nhịp trò chuyện",
        "reason": "Kể lại các hoạt động cuối tuần bằng cấu trúc たりたり"
      }
    ]
  },
  {
    "id": "g-kanoukei",
    "slug": "the-kha-nang-kanoukei-ban-chat-va-tro-tu",
    "categoryId": "grammar",
    "title": "Thể khả năng (Kanoukei): Cách chia, chuyển đổi trợ từ を thành が và bẫy dùng từ",
    "japaneseTitle": "可能形の本質と助詞「が」への変化",
    "summary": "Tường tận cách chia thể khả năng, quy tắc đổi trợ từ を thành が và phân biệt rõ năng lực cá nhân với khả năng do hoàn cảnh ngoại cảnh mang lại.",
    "level": "N4",
    "tags": [
      "Thể động từ",
      "Ngữ pháp cốt lõi",
      "verb",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-kan-1",
        "title": "1. Cách chia động từ sang Thể khả năng",
        "content": "- Nhóm 1: Đổi âm hàng [i] trước ます thành hàng [e] rồi thêm ます / る.\n  Ví dụ: 書きます -> 書ける (kakeru), 泳ぎます -> 泳げる (oyogeru), 話します -> 話せる (hanaseru).\n- Nhóm 2: Bỏ ます thêm られます (hoặc văn nói suồng sã bỏ ら thành れ: ら抜き言葉).\n  Ví dụ: 食べます -> 食べられる (taberareru), 見ます -> 見られる (mirareru).\n- Nhóm 3: します -> できる (dekiru), 来ます -> 来られる (korareru).",
        "type": "rule"
      },
      {
        "id": "sec-kan-2",
        "title": "2. Quy tắc vàng: Trợ từ を chuyển thành が",
        "content": "Khi động từ chuyển từ dạng chủ động sang thể khả năng, nó không còn miêu tả hành vi tác động trực tiếp nữa mà miêu tả 'trạng thái năng lực'.\nVì vậy, tân ngữ trực tiếp vốn đi với trợ từ を hầu như luôn đổi thành trợ từ が.\n\n- Chủ động: 日本語を話します (Tôi nói tiếng Nhật).\n- Khả năng: 日本語が話せます (Tôi có thể nói được tiếng Nhật).",
        "type": "rule"
      },
      {
        "id": "sec-kan-3",
        "title": "3. Bẫy phân biệt: Thể khả năng vs Động từ tự phát (見える/聞こえる)",
        "content": "Nhiều người nhầm 見られる (có thể nhìn - do năng lực hoặc có điều kiện xem) với 見える (tự nhiên đập vào mắt mà không cần cố gắng).\n- 見られる: Có vé xem phim, mắt sáng nên xem được.\n- 見える: Đứng trên tầng thượng nhìn ra thấy núi Phú Sĩ (tự nhiên hiện ra trong tầm nhìn).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-kan-1",
        "japanese": "私は漢字が少し読めます。",
        "reading": "わたしはかんじがすこしよめます。",
        "romaji": "Watashi wa kanji ga sukoshi yomemasu.",
        "vietnamese": "Tôi có thể đọc được một chút chữ Hán.",
        "explanation": "Đổi 漢字を読みます thành 漢字が読めます để chỉ năng lực.",
        "context": "Nói về trình độ đọc tiếng Nhật"
      },
      {
        "id": "ex-kan-2",
        "japanese": "この店ではクレジットカードが使えますか。",
        "reading": "このみせではクレジットカードがつかえますか。",
        "romaji": "Kono mise de wa kurejitto kaado ga tsukaemasu ka.",
        "vietnamese": "Ở cửa hàng này có thể dùng được thẻ tín dụng không?",
        "explanation": "使えます biểu thị khả năng điều kiện ngoại cảnh cho phép.",
        "context": "Hỏi phương thức thanh toán tại quầy"
      },
      {
        "id": "ex-kan-3",
        "japanese": "忙しくて、昨日は全然寝られませんでした。",
        "reading": "いそがしくて、きのうはぜんぜんねられませんでした。",
        "romaji": "Isogashikute, kinou wa zenzen neraremasen deshita.",
        "vietnamese": "Vì quá bận rộn nên hôm qua tôi chẳng thể nào chợp mắt được.",
        "explanation": "寝られます thể khả năng của động từ nhóm 2 寝る.",
        "context": "Than thở sau đợt tăng ca"
      }
    ],
    "notes": [
      "Với động từ わかる (hiểu) và 知る (biết), bản thân わかる đã mang ý nghĩa khả năng nhận thức nên KHÔNG chia sang thể khả năng."
    ],
    "warnings": [
      "Không dùng thể khả năng để mời mọc hoặc nhờ vả (ví dụ: '手伝えますか' không dùng để nhờ giúp đỡ, phải dùng てくれませんか)."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "phan-biet-miru-kan-mieru-miseru",
        "title": "Phân biệt nhóm động từ thị giác: 見る vs 観る vs 見える vs 見せる",
        "reason": "Phân biệt 見られる (thể khả năng) với 見える (tự nhiên nhìn thấy)"
      },
      {
        "category": "vocabulary",
        "slug": "phan-biet-shiru-va-wakaru",
        "title": "Phân biệt 知る (shiru) và 分かる (wakaru) - Biết thông tin vs Thấu hiểu bản chất",
        "reason": "Vì sao わかる không chia sang thể khả năng"
      },
      {
        "category": "conversation",
        "slug": "giao-tiep-tai-quan-cafe",
        "title": "Giao tiếp tại quán Cafe: Chọn kích cỡ ly, mang đi hay dùng tại quán",
        "reason": "Hỏi nhân viên xem quán có dùng được thẻ hay Wi-Fi không"
      }
    ]
  },
  {
    "id": "g-ikoukei",
    "slug": "the-y-chi-ikoukei-va-cau-truc-du-dinh",
    "categoryId": "grammar",
    "title": "Thể ý chí (Ikoukei): Cách chia, rủ rê suồng sã và cấu trúc 〜ようと思う",
    "japaneseTitle": "意向形の使い方と「〜ようと思う」（意思・予定）",
    "summary": "Bản chất thể ý chí (dạng thân mật của 〜ましょう), cách rủ rê bạn bè thân thiết và mẫu câu biểu thị ý định nhen nhóm trong suy nghĩ [〜ようと思う].",
    "level": "N4",
    "tags": [
      "Thể động từ",
      "Ngữ pháp cốt lõi",
      "verb",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-iko-1",
        "title": "1. Cách chia thể Ý chí (意向形)",
        "content": "- Nhóm 1: Đổi âm hàng [i] trước ます thành hàng [o] rồi kéo dài thêm う.\n  Ví dụ: 行きます -> 行こう (ikou), 飲みます -> 飲もう (nomou), 話します -> 話そう (hanasou).\n- Nhóm 2: Bỏ ます thêm よう.\n  Ví dụ: 食べます -> 食べよう (tabeyou), 見ます -> 見よう (miyou).\n- Nhóm 3: します -> しよう (shiyou), きます -> こよう (koyou - phát âm là koyou).",
        "type": "rule"
      },
      {
        "id": "sec-iko-2",
        "title": "2. Chức năng 1: Rủ rê thân mật (Tương đương 〜ましょう)",
        "content": "Trong giao tiếp suồng sã (Casual) giữa bạn bè, người trong gia đình hoặc người dưới, thể ý chí dùng để rủ cùng làm việc gì hoặc tự cổ vũ bản thân.\n\n- Rủ bạn: ご飯を食べに行こう！ (Đi ăn cơm thôi nào!).\n- Tự nhủ với mình: さあ、頑張ろう！ (Nào, cố lên nào!).",
        "type": "pattern"
      },
      {
        "id": "sec-iko-3",
        "title": "3. Chức năng 2: Cấu trúc biểu đạt ý định [〜ようと思う / 思っている]",
        "content": "Khi muốn nói 'Tôi định làm gì đó':\n- [V-ý chí + と思う]: Quyết định vừa nảy ra ngay lúc nói (今日早く寝ようと思う - Tối nay tôi định đi ngủ sớm).\n- [V-ý chí + と思っている]: Ý định đã được ấp ủ, nung nấu từ trước đó một khoảng thời gian (将来、日本で働こうと思っています - Tôi đang có ý định sau này sẽ làm việc tại Nhật).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-iko-1",
        "japanese": "ちょっと疲れたから、あそこで休もう。",
        "reading": "ちょっとつかれたから、あそこでやすもう。",
        "romaji": "Chotto tsukareta kara, asoko de yasumou.",
        "vietnamese": "Hơi mệt rồi đấy, mình nghỉ đằng kia chút đi.",
        "explanation": "休もう là thể ý chí rủ rê bạn bè nghỉ ngơi.",
        "context": "Nói với bạn thân khi đi bộ đường dài"
      },
      {
        "id": "ex-iko-2",
        "japanese": "週末は家でゆっくり映画を見ようと思っています。",
        "reading": "しゅうまつはいえでゆっくりえいがをみようとおもっています。",
        "romaji": "Shuumatsu wa ie de yukkuri eiga o miyou to omotte imasu.",
        "vietnamese": "Cuối tuần này tôi đang tính ở nhà thong thả xem phim.",
        "explanation": "見ようと思っています biểu thị ý định đã lên kế hoạch từ trước.",
        "context": "Kể với đồng nghiệp về dự định cuối tuần"
      },
      {
        "id": "ex-iko-3",
        "japanese": "今年中にJLPT N3に合格しようと思います。",
        "reading": "ことしじゅうにジェイエルピーティーエヌさんにぎょうかくしようとおもいます。",
        "romaji": "Kotoshijuu ni JLPT N3 ni goukaku shiyou to omoimasu.",
        "vietnamese": "Tôi hạ quyết tâm trong năm nay sẽ đỗ kỳ thi JLPT N3.",
        "explanation": "Thể hiện quyết tâm cá nhân rõ ràng.",
        "context": "Mục tiêu học tập đầu năm mới"
      }
    ],
    "notes": [
      "Khi nói về ý định của người thứ ba, bắt buộc phải dùng [〜ようと思っています], không được dùng と思う vì không ai biết người khác đang nghĩ gì lúc này."
    ],
    "warnings": [
      "Không dùng thể ý chí đứng một mình với người trên hoặc khách hàng vì tính chất suồng sã của nó."
    ],
    "relatedArticles": [
      {
        "category": "conversation",
        "slug": "nghe-thuat-moi-moc-ru-re",
        "title": "Nghệ thuật rủ rê và mời mọc: Từ thân mật 〜ない？ đến lịch sự 〜ませんか",
        "reason": "Ứng dụng thể ý chí khi rủ rê bạn bè thân mật"
      },
      {
        "category": "vocabulary",
        "slug": "phan-biet-omou-va-kangaeru",
        "title": "Phân biệt 思う (omou - cảm nhận chủ quan) và 考える (kangaeru - tư duy logic)",
        "reason": "Đối chiếu sắc thái tâm lý trong cụm cấu trúc と思う"
      },
      {
        "category": "notes",
        "slug": "desu-masu-va-ranh-gioi-lich-su",
        "title": "Desu / Masu không phải lúc nào cũng là 'lịch sự tuyệt đối': Sắc thái khoảng cách",
        "reason": "Khoảng cách tâm lý giữa 〜ましょう và thể ý chí"
      }
    ]
  },
  {
    "id": "g-ukemi",
    "slug": "the-bi-dong-ukemikei-truc-tiep-va-gian-tiep",
    "categoryId": "grammar",
    "title": "Thể bị động (Ukemikei): Nhận diện bị động trực tiếp và bị động gián tiếp (phiền toái)",
    "japaneseTitle": "受身形（直接受身・迷惑の受身）の仕組み",
    "summary": "Khám phá thế giới câu bị động tiếng Nhật: Không chỉ dùng như tiếng Việt/tiếng Anh mà còn có dạng 'Bị động gián tiếp' thể hiện sự phiền toái, tổn thất đầy tinh tế.",
    "level": "N4",
    "tags": [
      "Thể động từ",
      "Ngữ pháp cốt lõi",
      "verb",
      "N4"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-uke-1",
        "title": "1. Cách chia động từ sang Thể bị động (受身形)",
        "content": "- Nhóm 1: Đổi âm hàng [i] trước ます thành hàng [a] rồi thêm れます (reru).\n  Ví dụ: 褒めます (homemasu - khen) -> 褒められる (được khen), 叱ります (shikarimasu - mắng) -> 叱られる (bị mắng).\n- Nhóm 2: Bỏ ます thêm られます (rareru) - giống chia thể khả năng.\n  Ví dụ: 食べます -> 食べられる (bị ăn mất).\n- Nhóm 3: します -> される (sareru), きます -> こられる (korareru).",
        "type": "rule"
      },
      {
        "id": "sec-uk-2",
        "title": "2. Bị động trực tiếp (Direct Passive)",
        "content": "Công thức: [Người A は Người B に + Động từ bị động].\nNgười A chịu hành vi do Người B tác động tới.\n\nVí dụ: 私は先生に褒められました (Tôi đã được thầy giáo khen ngợi).\nỞ đây, trợ từ に dùng để đánh dấu 'Tác nhân gây ra hành động'.",
        "type": "rule"
      },
      {
        "id": "sec-uk-3",
        "title": "3. Điểm độc đáo: Bị động gián tiếp / Bị động phiền toái (迷惑の受身)",
        "content": "Tiếng Nhật có thể biến cả TỰ ĐỘNG TỪ thành câu bị động để diễn tả việc người nói gánh chịu hậu quả phiền toái từ hành vi của người khác hoặc tự nhiên.\n\nVí dụ điển hình:\n- 雨に降られました: Tôi bị dính cơn mưa làm ướt sũng (hành động mưa của trời làm tôi khốn đốn).\n- 電車の中で足を踏まれました: Tôi bị ai đó giẫm vào chân trên tàu điện.",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-uke-1",
        "japanese": "昨日、部長に叱られました。",
        "reading": "きのう、ぶちょうにしかられました。",
        "romaji": "Kinou, buchou ni shikararemashita.",
        "vietnamese": "Hôm qua tôi đã bị trưởng phòng mắng.",
        "explanation": "Trưởng phòng (部長) là tác nhân đi với に, động từ 叱る chia thành 叱られました.",
        "context": "Tâm sự chuyện buồn công việc"
      },
      {
        "id": "ex-uke-2",
        "japanese": "帰る途中で雨に降られて、服が濡れてしまいました。",
        "reading": "かえるとちゅうであめにふられて、ふくがぬれてしまいました。",
        "romaji": "Kaeru tochuu de ame ni furarete, fuku ga nurete shimaimashita.",
        "vietnamese": "Trên đường về tôi bị dính mưa, quần áo ướt nhẹp hết cả.",
        "explanation": "雨に降られる là câu bị động phiền toái kinh điển của người Nhật.",
        "context": "Giải thích lý do người ướt sũng khi về tới nhà"
      },
      {
        "id": "ex-uke-3",
        "japanese": "このお寺は600年前に建てられました。",
        "reading": "このおてらはろっぴゃくねんまえにたてられました.",
        "romaji": "Kono otera wa roppyakunen mae ni tateraremashita.",
        "vietnamese": "Ngôi chùa này được xây dựng từ cách đây 600 năm.",
        "explanation": "Bị động đồ vật không cần nhắc tới người xây dựng.",
        "context": "Giới thiệu di tích lịch sử"
      }
    ],
    "notes": [
      "Khi chủ thể là đồ vật được phát minh/xây dựng, tác nhân con người thường đi với trợ từ によって thay vì に: 電話はベルによって発明された."
    ],
    "warnings": [
      "Khi được ai đó giúp đỡ mang lại lợi ích cho mình, người Nhật KHÔNG dùng bị động mà dùng thể cho nhận てもらう."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "phan-biet-tu-dong-tu-va-tha-dong-tu",
        "title": "Bản chất Tự động từ (Jidoushi) & Tha động từ (Tadoushi) kèm cặp từ thông dụng",
        "reason": "Mối liên hệ giữa tha động từ và câu bị động"
      },
      {
        "category": "grammar",
        "slug": "the-sai-khien-shiekikei-va-xin-phep",
        "title": "Thể sai khiến (Shiekikei): Cho phép, bắt buộc và cấu trúc xin phép 〜させてください",
        "reason": "Đối chiếu giữa bị động và sai khiến, tạo tiền đề hiểu thể sai khiến bị động"
      },
      {
        "category": "notes",
        "slug": "bay-dich-thuat-tieng-nhat-nguoi-viet-hay-mac",
        "title": "Những bẫy dịch thuật & lỗi dùng từ người Việt hay mắc phải nhất",
        "reason": "Người Việt hay nhầm khi dịch câu bị động mang sắc thái phiền toái"
      }
    ]
  },
  {
    "id": "g-shieki",
    "slug": "the-sai-khien-shiekikei-va-xin-phep",
    "categoryId": "grammar",
    "title": "Thể sai khiến (Shiekikei): Cho phép, bắt buộc và cấu trúc xin phép 〜させてください",
    "japaneseTitle": "使役形と使役受身、依頼「〜させてください」",
    "summary": "Hiểu rõ bản chất thể sai khiến (bắt buộc hoặc cho phép ai làm gì) và mẫu câu nhờ vả, xin phép lịch sự bậc nhất trong công việc: 〜させていただけませんか.",
    "level": "N4",
    "tags": [
      "Thể động từ",
      "Ngữ pháp cốt lõi",
      "verb",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-shk-1",
        "title": "1. Cách chia Thể sai khiến (使役形)",
        "content": "- Nhóm 1: Đổi âm hàng [i] trước ます thành hàng [a] rồi thêm せます (seru).\n  Ví dụ: 行きます -> 行かせる (ikaseru), 読ませる (yomaseru), 待たせる (mataseru).\n- Nhóm 2: Bỏ ます thêm させます (saseru).\n  Ví dụ: 食べます -> 食べさせる (tabesaseru), 見させる (misaseru).\n- Nhóm 3: します -> させる (saseru), きます -> こさせる (kosaseru).",
        "type": "rule"
      },
      {
        "id": "sec-shk-2",
        "title": "2. Hai sắc thái: Bắt buộc (Force) vs Cho phép (Permit)",
        "content": "Thể sai khiến tùy ngữ cảnh có thể mang 2 sắc thái đối lập:\n- Bắt buộc ai làm gì: 先生は生徒に宿題をたくさんさせました (Thầy giáo bắt học sinh làm rất nhiều bài tập).\n- Cho phép ai làm gì: 母は子供に好きなゲームをやらせました (Mẹ cho phép con được chơi trò chơi con thích).",
        "type": "rule"
      },
      {
        "id": "sec-shk-3",
        "title": "3. Ứng dụng đỉnh cao: Xin phép khiêm nhường [〜させてください]",
        "content": "Khi xin phép ai đó cho chính mình được làm việc gì, người Nhật kết hợp [Thể sai khiến + てください / ていただけませんか].\nÝ nghĩa đen: 'Xin hãy cho phép tôi được làm việc này'. Đây là cách nói cực kỳ nhã nhặn và chuẩn mực trong công sở Nhật Bản.\n\nVí dụ: 体調が悪いので、早退させていただけませんか (Vì sức khỏe không tốt, xin phép sếp cho em được về sớm hôm nay có được không ạ?).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-shk-1",
        "japanese": "遅くなってすみません。待たせてしまいました。",
        "reading": "おそくなってすみません。またせてしまいました。",
        "romaji": "Osoku natte sumimasen. Matasete shimaimashita.",
        "vietnamese": "Xin lỗi vì tôi đến muộn. Tôi đã bắt bạn phải chờ đợi lâu.",
        "explanation": "待たせる là thể sai khiến của 待つ (bắt ai đó chờ đợi).",
        "context": "Lời xin lỗi khi đến điểm hẹn muộn"
      },
      {
        "id": "ex-shk-2",
        "japanese": "明日のプレゼンは私にやらせてください。",
        "reading": "あすのプレゼンはわたしにやらせてください。",
        "romaji": "Ashita no purezen wa watashi ni yarasete kudasai.",
        "vietnamese": "Buổi thuyết trình ngày mai xin hãy để cho tôi được làm.",
        "explanation": "Xin phép được nhận trọng trách trong công việc.",
        "context": "Xung phong nhận nhiệm vụ trong cuộc họp"
      },
      {
        "id": "ex-shk-3",
        "japanese": "子供に野菜を食べさせるのは大変です。",
        "reading": "こどもにやさいをたべさせるのはたいへんです。",
        "romaji": "Kodomo ni yasai o tabesaseru no wa taihen desu.",
        "vietnamese": "Việc bắt con trẻ ăn rau củ thật là vất vả.",
        "explanation": "食べさせる biểu thị hành vi ép/tập cho trẻ con ăn.",
        "context": "Cha mẹ tâm sự chuyện nuôi dạy con"
      }
    ],
    "notes": [
      "Trợ từ đánh dấu người bị sai khiến: Nếu động từ là tự động từ thì người đi với を (子供を走らせる). Nếu là tha động từ có sẵn tân ngữ を thì người chuyển sang đi với に (子供に野菜を食べさせる)."
    ],
    "warnings": [
      "Không dùng thể sai khiến trực tiếp với cấp trên hoặc người lớn tuổi hơn mình (không được bảo sếp '行かせる')."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "the-bi-dong-ukemikei-truc-tiep-va-gian-tiep",
        "title": "Thể bị động (Ukemikei): Nhận diện bị động trực tiếp và bị động gián tiếp",
        "reason": "Đối chiếu giữa thể sai khiến và thể bị động"
      },
      {
        "category": "conversation",
        "slug": "xin-phep-lich-su-trong-doi-song",
        "title": "Cách xin phép lịch sự: Từ 〜てもいいですか đến 〜てよろしいでしょうか",
        "reason": "Cấu trúc xin phép kinh điển 〜させていただけませんか"
      },
      {
        "category": "notes",
        "slug": "bon-nac-thang-van-phong-tieng-nhat",
        "title": "Bốn nấc thang văn phong: Suồng sã, Lịch sự, Khiêm nhường và Tôn kính",
        "reason": "Vị trí của cấu trúc sai khiến khiêm nhường trong 4 nấc văn phong"
      }
    ]
  },
  {
    "id": "g-sou-you-rashii",
    "slug": "phan-biet-sou-you-rashii-phong-doan",
    "categoryId": "grammar",
    "title": "Phân biệt 3 mẫu câu phỏng đoán: そう (trực quan), よう (suy đoán giác quan), らしい (nghe nói/bản chất)",
    "japaneseTitle": "推量・伝聞の表現「〜そう」「〜よう」「〜らしい」の使い分け",
    "summary": "Bóc tách bản chất 3 cấp độ phỏng đoán dễ nhầm lẫn nhất: そう (nhìn thấy trước mắt), よう (suy đoán tổng hợp từ giác quan/trực giác) và らしい (dựa vào tin đồn, thông tin bên ngoài).",
    "level": "N4",
    "tags": [
      "Phỏng đoán",
      "Ngữ pháp cốt lõi",
      "comparison",
      "N4"
    ],
    "readTimeMinutes": 7,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-syr-1",
        "title": "1. 〜そう (Trực quan trước mắt: Có vẻ như sắp...)",
        "content": "Công thức: [V-masu bỏ ます + そう] hoặc [Tính từ bỏ い/な + そう].\nBản chất: Đánh giá bằng TRỰC QUAN MẮT THẤY TẠI CHỖ ngay lúc đó mà không cần suy nghĩ phức tạp.\n\nVí dụ: 雨が降りそうだ (Trời sắp mưa đến nơi rồi - nhìn thấy mây đen nghịt trước mắt). 美味しそうだ (Món ăn trông có vẻ ngon - nhìn thấy màu sắc hấp dẫn).",
        "type": "rule"
      },
      {
        "id": "sec-syr-2",
        "title": "2. 〜よう (Suy đoán theo giác quan & trực giác cá nhân)",
        "content": "Công thức: [Thể thông thường + ようだ].\nBản chất: Dựa vào các giác quan (nghe thấy âm thanh, ngửi thấy mùi, cảm nhận không khí) rồi SUY LUẬN LÔ-GÍC của bản thân.\n\nVí dụ: 外で誰かが話しているようだ (Dường như có ai đó đang nói chuyện ngoài kia - vì tai nghe thấy tiếng rì rầm).",
        "type": "pattern"
      },
      {
        "id": "sec-syr-3",
        "title": "3. 〜らしい (Dựa vào nguồn tin gián tiếp hoặc đúng bản chất)",
        "content": "Công thức: [Thể thông thường / Danh từ + らしい].\nBản chất: Suy đoán dựa trên THÔNG TIN TỪ BÊN NGOÀI (nghe người khác kể lại, đọc báo, xem dự báo thời tiết).\n\nVí dụ: 明日は雨らしい (Nghe bảo ngày mai trời mưa đấy - vì vừa xem dự báo thời tiết).",
        "type": "pattern"
      }
    ],
    "examples": [
      {
        "id": "ex-syr-1",
        "japanese": "今にも雨が降り出しそうな空ですね。",
        "reading": "いまにもあめがふりだしそうなそらですね。",
        "romaji": "Ima ni mo ame ga furidashisou na sora desu ne.",
        "vietnamese": "Bầu trời trông có vẻ như sắp đổ mưa bất kỳ lúc nào ấy nhỉ.",
        "explanation": "Dùng そう vì nhìn thấy bầu trời đen kịt trước mắt.",
        "context": "Bình luận về thời tiết trước khi ra ngoài"
      },
      {
        "id": "ex-syr-2",
        "japanese": "隣の部屋から物音がします。誰かいるようです。",
        "reading": "となりのへやからものおとがします。だれかいるようです。",
        "romaji": "Tonari no heya kara monooto ga shimasu. Dareka iru you desu.",
        "vietnamese": "Có tiếng động phát ra từ phòng bên cạnh. Có vẻ như có ai đó ở trong.",
        "explanation": "Dựa vào thính giác nghe thấy tiếng động rồi suy đoán bằng ようだ.",
        "context": "Quan sát hiện tượng xung quanh"
      },
      {
        "id": "ex-syr-3",
        "japanese": "田中さんは来月結婚するらしいですよ。",
        "reading": "たなかさんはらいげつけっこんするらしいですよ。",
        "romaji": "Tanaka-san wa raigetsu kekkon suru rashii desu yo.",
        "vietnamese": "Nghe đồn anh Tanaka tháng sau sẽ kết hôn đấy.",
        "explanation": "Thông tin gián tiếp do người khác kể lại dùng らしい.",
        "context": "Chuyện phiếm giữa các đồng nghiệp"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "雨が降りそうだ (そう)",
          "nuance": "Câu A là tự mình nhìn lên trời thấy mây đen sắp sập xuống. Câu B là nghe đài báo hoặc ai đó nói lại chứ không phải nhìn trời lúc này.",
          "example": "雨が降りそうだ (そう)",
          "exampleTranslation": "雨が降るらしい (らしい)",
          "caution": "Câu A là tự mình nhìn lên trời thấy mây đen sắp sập xuống. Câu B là nghe đài báo hoặc ai đó nói lại chứ không phải nhìn trời lúc này."
        }
      ],
      "summary": "Câu A là tự mình nhìn lên trời thấy mây đen sắp sập xuống. Câu B là nghe đài báo hoặc ai đó nói lại chứ không phải nhìn trời lúc này."
    },
    "notes": [
      "Khác với そうだ suy đoán (bỏ ます), mẫu câu そうだ truyền văn (nghe nói là...) thì động từ giữ nguyên thể thông thường: 雨が降るそうだ (nghe nói trời sẽ mưa)."
    ],
    "warnings": [
      "Với tính từ いい (tốt) và ない (không), dạng phỏng đoán biến đổi đặc biệt thành: よさそう (có vẻ tốt) và なさそう (có vẻ không có)."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "pho-tu-chi-muc-do-thuong-gap",
        "title": "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
        "reason": "Phó từ thường đi kèm câu phỏng đoán: どうやら, まるで"
      },
      {
        "category": "conversation",
        "slug": "ky-nang-tan-gau-small-talk",
        "title": "Kỹ năng tán gẫu (Aizuchi & Small Talk): Mở lời về thời tiết, đồ ăn và giữ nhịp trò chuyện",
        "reason": "Bình luận thời tiết và tin tức hàng ngày"
      },
      {
        "category": "notes",
        "slug": "khi-nao-khong-nen-dich-word-by-word",
        "title": "Khi nào TUYỆT ĐỐI không nên dịch từng chữ từ tiếng Việt sang tiếng Nhật?",
        "reason": "Dịch chữ 'dường như/có vẻ' theo đúng nguồn thông tin gốc"
      }
    ]
  },
  {
    "id": "g-sugiru-nagara",
    "slug": "cau-truc-sugiru-va-nagara",
    "categoryId": "grammar",
    "title": "Cấu trúc 〜すぎる (vượt quá mức độ) và 〜ながら (hành động diễn ra đồng thời)",
    "japaneseTitle": "複合表現「〜すぎる」（過度）と「〜ながら」（同時進行）",
    "summary": "Làm chủ 2 mẫu ghép động từ cực kỳ thông dụng: 〜すぎる biểu thị làm gì đó quá mức gây tiêu cực và 〜ながら diễn đạt việc làm hành động phụ trong khi thực hiện hành động chính.",
    "level": "N5",
    "tags": [
      "Ngữ pháp cốt lõi",
      "Cấu trúc ghép",
      "verb",
      "N5",
      "N4"
    ],
    "readTimeMinutes": 5,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-sgn-1",
        "title": "1. Cấu trúc 〜すぎる (Quá mức / Quá đà)",
        "content": "Công thức:\n- Động từ: [V-masu bỏ ます + すぎる] (食べすぎる - ăn quá nhiều, 飲みすぎる - uống quá chén).\n- Tính từ -i: [Bỏ い + すぎる] (高すぎる - đắt quá mức, 辛すぎる - cay quá).\n- Tính từ -na: [Bỏ な + すぎる] (暇すぎる - quá rảnh rỗi).\n\nSắc thái: Hầu như luôn mang hàm ý TIÊU CỰC, vượt quá giới hạn an toàn hoặc mong đợi dẫn đến hậu quả không tốt.",
        "type": "rule"
      },
      {
        "id": "sec-sgn-2",
        "title": "2. Cấu trúc 〜ながら (Vừa làm A vừa làm B)",
        "content": "Công thức: [V1-masu bỏ ます + ながら, V2].\nQuy tắc quan trọng bậc nhất: HÀNH ĐỘNG V2 Ở VẾ SAU MỚI LÀ HÀNH ĐỘNG CHÍNH (Main Action), còn V1 ở vế trước chỉ là hành động phụ đi kèm (Background Action).\nCả hai hành động phải do CÙNG MỘT CHỦ NGỮ thực hiện đồng thời.",
        "type": "rule"
      },
      {
        "id": "sec-sgn-3",
        "title": "3. Lỗi thường gặp của người học",
        "content": "- Nhầm hành động chính phụ: Nếu nói 'Vừa học bài vừa nghe nhạc' và mục tiêu chính là học bài, câu đúng phải là: 音楽を聴きながら、勉強します (聴く là phụ, 勉強する là chính).\n- Lạm dụng すぎる để khen ngợi: Vì すぎる mang sắc thái tiêu cực nên câu 'Bạn tốt bụng quá' nếu dịch thành 親切すぎる có thể bị hiểu là 'tốt quá hóa thừa thãi/lo bò trắng răng'. Nên dùng とても親切 thay thế.",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-sgn-1",
        "japanese": "昨日、お酒を飲みすぎて頭が痛いです。",
        "reading": "きのう、おさけをのみすぎてあたまがいたいです。",
        "romaji": "Kinou, osake o nomisugite atama ga itai desu.",
        "vietnamese": "Hôm qua tôi uống rượu quá chén nên hôm nay đau đầu.",
        "explanation": "飲みすぎる mang hậu quả tiêu cực làm đau đầu.",
        "context": "Giải thích lý do mệt mỏi vào sáng hôm sau"
      },
      {
        "id": "ex-sgn-2",
        "japanese": "歩きながらスマホを見てはいけません。",
        "reading": "あるきながらスマホをみてはいけません。",
        "romaji": "Arukinagara sumaho o mite wa ikemasen.",
        "vietnamese": "Không được vừa đi bộ vừa bấm điện thoại thông minh.",
        "explanation": "歩きながら kết hợp cấm đoán hành vi đi kèm gây nguy hiểm.",
        "context": "Khuyến cáo an toàn nơi công cộng"
      },
      {
        "id": "ex-sgn-3",
        "japanese": "この問題は複雑すぎて、よく分かりません。",
        "reading": "このもんだいはふくざつすぎて、よくわかりません。",
        "romaji": "Kono mondai wa fukuzatsusugite, yoku wakarimasen.",
        "vietnamese": "Vấn đề này quá đỗi phức tạp nên tôi không hiểu rõ.",
        "explanation": "Tính từ 複雑 ghép với すぎる chỉ mức độ vượt quá khả năng nhận thức.",
        "context": "Thảo luận bài tập hoặc sự cố kỹ thuật"
      }
    ],
    "notes": [
      "Động từ chia với すぎる sẽ biến đổi thành một động từ Nhóm 2 hoàn chỉnh (chuyển thì: すぎた, すぎない, すぎて)."
    ],
    "warnings": [
      "Không dùng ながら khi hai hành động do hai người khác nhau thực hiện (chủ ngữ bắt buộc phải là một người)."
    ],
    "relatedArticles": [
      {
        "category": "vocabulary",
        "slug": "pho-tu-chi-muc-do-thuong-gap",
        "title": "Bảng tra cứu phó từ chỉ mức độ: とても, ぜんぜん, なかなか, けっこう...",
        "reason": "Các phó từ chỉ mức độ quá đà bổ trợ cho 〜すぎる"
      },
      {
        "category": "vocabulary",
        "slug": "cum-tu-collocation-suc-khoe-y-te",
        "title": "Collocation sức khỏe & y tế: 風邪を引く, 薬を飲む, 熱がある, 痛みが治まる",
        "reason": "Ăn uống quá đà, làm việc quá sức ảnh hưởng sức khỏe"
      },
      {
        "category": "notes",
        "slug": "doc-cau-theo-nhip-mora-thay-vi-tung-chu",
        "title": "Cách đọc câu tiếng Nhật theo nhịp phách (Mora) thay vì từng chữ cái riêng rẽ",
        "reason": "Giữ nhịp điệu khi nói câu phức đi kèm 〜ながら"
      }
    ]
  },
  {
    "id": "g-koto-vs-no",
    "slug": "phan-biet-danh-tu-hoa-koto-va-no",
    "categoryId": "grammar",
    "title": "Danh từ hóa động từ bằng こと và の: Bản chất trừu tượng vs Cụ thể cảm giác",
    "japaneseTitle": "動詞の名詞化「こと」と「の」の使い分け",
    "summary": "Bí quyết lựa chọn giữa こと và の khi danh từ hóa mệnh đề động từ: Khi nào dùng こと (khái niệm trừu tượng, tri thức, ngôn ngữ), khi nào dùng の (giác quan trực tiếp, hành động cụ thể tại chỗ)?",
    "level": "N4",
    "tags": [
      "Danh từ hóa",
      "Ngữ pháp cốt lõi",
      "comparison",
      "N4"
    ],
    "readTimeMinutes": 6,
    "updatedAt": "2026-10-06",
    "sections": [
      {
        "id": "sec-kvn-1",
        "title": "1. Danh từ hóa động từ là gì?",
        "content": "Trong tiếng Nhật, một động từ không thể đứng trực tiếp trước các trợ từ như は, が, を được. Muốn biến cụm hành động thành một danh từ hoàn chỉnh, người ta thêm こと (koto) hoặc の (no) ngay sau động từ thể từ điển.\n\nVí dụ: 泳ぐ (bơi) -> 泳ぐこと / 泳ぐの (việc bơi lội).",
        "type": "rule"
      },
      {
        "id": "sec-kvn-2",
        "title": "2. Khi nào BẮT BUỘC dùng の?",
        "content": "Bắt buộc dùng の khi đi kèm các nhóm động từ sau:\n- Động từ giác quan trực tiếp: 見る (nhìn), 聞く (nghe), 感じる (cảm nhận).\n  Ví dụ: 彼が走っているのを見ました (Tôi đã thấy anh ấy chạy - thấy bằng mắt sống động tại chỗ, KHÔNG dùng こと).\n- Động từ chỉ hành vi trực tiếp dừng/chờ/giúp: 待つ, 手伝う, 止める.\n  Ví dụ: 母が料理するのを手伝いました (Tôi phụ giúp mẹ nấu ăn - cùng làm việc cụ thể tại chỗ).",
        "type": "pattern"
      },
      {
        "id": "sec-kvn-3",
        "title": "3. Khi nào BẮT BUỘC dùng こと?",
        "content": "Bắt buộc dùng こと khi:\n- Đi trong các cấu trúc ngữ pháp cố định: [V-ru + ことができる] (có thể), [V-ta + ことがある] (từng trải nghiệm), [V-ru + ことにする] (quyết định làm gì).\n- Đi với động từ truyền đạt ngôn ngữ và tư duy trừu tượng: 話す, 伝える, 約束する, 祈る.\n  Ví dụ: 明日会うことを約束しました (Chúng tôi đã hứa sẽ gặp nhau vào ngày mai).",
        "type": "rule"
      }
    ],
    "examples": [
      {
        "id": "ex-kvn-1",
        "japanese": "赤ちゃんが泣いているのが聞こえます。",
        "reading": "あかちゃんがないているのがきこえます。",
        "romaji": "Akachan ga naite iru no ga kikoemasu.",
        "vietnamese": "Tôi nghe thấy tiếng em bé đang khóc.",
        "explanation": "Động từ giác quan 聞こえる bắt buộc đi với の, không dùng こと.",
        "context": "Lắng nghe âm thanh quanh nhà"
      },
      {
        "id": "ex-kvn-2",
        "japanese": "私の趣味は切手を集めることです。",
        "reading": "わたしのしゅみはきってをあつめることです。",
        "romaji": "Watashi no shumi wa kitte o atsumeru koto desu.",
        "vietnamese": "Sở thích của tôi là sưu tập tem.",
        "explanation": "Mẫu câu sở thích định nghĩa trừu tượng: [趣味は V-ru + ことです].",
        "context": "Tự giới thiệu sở thích bản thân"
      },
      {
        "id": "ex-kvn-3",
        "japanese": "日本へ行ったことがありますか。",
        "reading": "にほんへいったことがありますか。",
        "romaji": "Nihon e itta koto ga arimasu ka.",
        "vietnamese": "Bạn đã từng đi Nhật Bản lần nào chưa?",
        "explanation": "Cấu trúc trải nghiệm cố định luôn dùng こと (ことがある).",
        "context": "Hỏi về trải nghiệm quá khứ"
      }
    ],
    "comparisons": {
      "title": "Bảng đối chiếu và phân biệt cốt lõi",
      "items": [
        {
          "subject": "鳥が飛んでいるのを見た (の)",
          "nuance": "Dùng の với hình ảnh mắt thấy trực tiếp cụ thể tại chỗ (chim bay). Dùng こと với những khái niệm suy nghĩ trừu tượng, vô hình (tương lai).",
          "example": "鳥が飛んでいるのを見た (の)",
          "exampleTranslation": "将来のことを考える (こと)",
          "caution": "Dùng の với hình ảnh mắt thấy trực tiếp cụ thể tại chỗ (chim bay). Dùng こと với những khái niệm suy nghĩ trừu tượng, vô hình (tương lai)."
        }
      ],
      "summary": "Dùng の với hình ảnh mắt thấy trực tiếp cụ thể tại chỗ (chim bay). Dùng こと với những khái niệm suy nghĩ trừu tượng, vô hình (tương lai)."
    },
    "notes": [
      "Với những câu thể hiện sở thích hay khả năng thông thường như [テニスをするのが好きです], có thể dùng cả の và こと, nhưng の tự nhiên và phổ biến hơn nhiều trong văn nói."
    ],
    "warnings": [
      "Tuyệt đối không dùng こと trong câu: 彼が来るのを待つ (Đợi anh ấy đến - động từ 待つ bắt buộc đi với の)."
    ],
    "relatedArticles": [
      {
        "category": "grammar",
        "slug": "the-tu-dien-jishokei-va-mau-cau-di-kem",
        "title": "Thể từ điển (Jishokei): Bản chất nguyên mẫu và các mẫu câu N5-N4 cốt lõi",
        "reason": "Động từ thể nguyên mẫu đi với こと và の"
      },
      {
        "category": "vocabulary",
        "slug": "phan-biet-miru-kan-mieru-miseru",
        "title": "Phân biệt nhóm động từ thị giác: 見る vs 観る vs 見える vs 見せる",
        "reason": "Động từ giác quan (nhìn, nghe) bắt buộc đi với の"
      },
      {
        "category": "grammar",
        "slug": "cau-truc-ta-koto-ga-aru",
        "title": "Cấu trúc 〜たことがある: Kể về trải nghiệm trong quá khứ & những bẫy thường gặp",
        "reason": "Cụm danh từ hóa cố định trong [V-ta + ことがある]"
      }
    ]
  }
];
