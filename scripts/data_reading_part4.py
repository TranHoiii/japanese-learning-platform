import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Build N4 Reading dataset: Part 4 (Lessons 41-45)
def get_part4_data():
    dataset = []

    # =========================================================================
    # LESSON 41 (Book p.54-55, PDF p.72-73)
    # =========================================================================
    dataset.append({
        "lessonNumber": 41,
        "items": [
            {
                "title": "ロボットといっしょ",
                "content": "日本は「ロボット大国」と言われています。工場で自動車や精密機械を作る産業用ロボットだけでなく、最近では病院や介護施設、そして家庭でも様々なロボットが活躍しています。\n\nお年寄りの介護の現場では、ベッドから車いすへ人を持ち上げる介護ロボットや、いっしょに体操をしてくれる体操ロボットが導入されています。また、本物のアザラシの赤ちゃんそっくりの「癒やしロボット（パロ）」は、名前を呼ぶと甘えた声を出し、触ると気持ちよさそうに目を閉じます。認知症のお年寄りがパロと触れ合うことで、笑顔が増え、心が落ち着く効果が認められています。\n\nさらに、掃除ロボットや案内ロボット、会話ができるコミュニケーションロボットなど、私たちの暮らしの身近なパートナーとしてロボットは日々進化しています。少子高齢化が進む日本において、ロボットはなくてはならない存在になりつつあります。",
                "translation": "Nhật Bản được mệnh danh là 'Cường quốc robot'. Không chỉ những robot công nghiệp chế tạo ô tô hay máy móc chính xác trong nhà máy, mà gần đây trong bệnh viện, viện dưỡng lão và ngay cả các hộ gia đình, nhiều loại robot đa dạng cũng đang phát huy vai trò lớn.\n\nTại các cơ sở chăm sóc người cao tuổi, robot nâng đỡ người từ giường sang xe lăn hay robot tập thể dục cùng các cụ đã được đưa vào sử dụng. Đặc biệt, chú robot hải cẩu con 'Paro' giống hệt thật, khi được gọi tên sẽ phát ra tiếng kêu nũng nịu, khi được vuốt ve sẽ lim dim mắt khoan khoái. Người già suy giảm trí nhớ khi tiếp xúc với Paro đã cười nhiều hơn và tinh thần trở nên bình an hơn.\n\nNgoài ra, robot hút bụi, robot lễ tân hướng dẫn, robot giao tiếp... đang không ngừng phát triển như những người bạn đồng hành thân thiết. Trong một xã hội già hóa và sinh ít như Nhật Bản, robot đang dần trở thành sự tồn tại không thể thiếu.",
                "imageUrl": "/media/reading/reading_n4_l41_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 日本ではいろいろな所でロボットを使っている。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "工場だけでなく、病院、介護施設、家庭など多様な場所でロボットが使われています。(〇)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) アザラシのロボット（パロ）はおしゃべりができる。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "パロは鳴き声を出したり目を閉じたりして癒やすロボットであり、人間の言葉でおしゃべりをするわけではありません。(✕)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 体操ロボットに習ったとおりに体を動かすと、体の調子がよくなる。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "ロボットと一緒に無理なく体操をすることで健康維持に役立ちます。(〇)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 42 (Book p.56-59, PDF p.74-77)
    # =========================================================================
    dataset.append({
        "lessonNumber": 42,
        "items": [
            {
                "title": "肉を食べると",
                "content": "世界中の人が食べる肉の量は毎年増えている。その大きな原因は人々の食生活が変わったからだ。日本でも魚や野菜より肉が好きな子どもが多い。\n\n今、世界では牛や羊、豚、鶏など、たくさんの家畜が飼われている。家畜の数は世界の人口の3倍以上で、今も増えている。増えた牛や羊を飼うのに、新しい草地が必要になる。それで、草地を作るために、世界中の森の木が切られている。森が少なくなると、二酸化炭素が増えて地球は暖かくなる。そして、草地はだんだん砂漠化する。\n\nまた、家畜のえさに麦やとうもろこしなどたくさんの穀物が使われる。牛の肉1キロを作るのに、約11キロもの穀物と大量の水やエネルギーが必要になる。私たちが肉をたくさん食べることは、地球の環境や食料問題と深くつながっているのだ。",
                "translation": "Lượng thịt con người tiêu thụ trên thế giới đang tăng lên mỗi năm. Nguyên nhân chính là do thói quen ăn uống của mọi người đã thay đổi. Ngay cả ở Nhật Bản, trẻ em thích ăn thịt hơn cá và rau củ cũng ngày một nhiều.\n\nHiện nay, trên thế giới có rất nhiều gia súc gia cầm như bò, cừu, lợn, gà được chăn nuôi. Số lượng gia súc gấp hơn 3 lần dân số toàn cầu và vẫn tiếp tục tăng. Để chăn thả lượng bò và cừu tăng lên đó, cần thêm nhiều đồng cỏ mới. Vì thế, để lấy đất làm đồng cỏ, rừng trên khắp thế giới đang bị chặt phá. Rừng suy giảm khiến khí CO2 tăng cao và Trái Đất nóng lên. Những bãi chăn thả dần dần bị sa mạc hóa.\n\nNgoài ra, một lượng khổng lồ ngũ cốc như lúa mì, ngô được dùng làm thức ăn gia súc. Để sản xuất được 1 kg thịt bò cần tới khoảng 11 kg ngũ cốc cùng một lượng nước và năng lượng khổng lồ. Việc chúng ta ăn nhiều thịt có mối liên hệ mật thiết đến môi trường và an ninh lương thực của Trái Đất.",
                "imageUrl": "/media/reading/reading_n4_l42_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) どうして人が食べる肉の量が増えているのですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "人々の食生活が変わり、肉を好んで食べるようになったからです。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "人々の食生活が変わったから", "correct": True, "sortOrder": 1},
                            {"content": "野菜や魚が世界からなくなったから", "correct": False, "sortOrder": 2},
                            {"content": "医者が肉だけを食べるように勧めているから", "correct": False, "sortOrder": 3},
                            {"content": "肉の値段が野菜よりずっと安くなったから", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) 今、世界で飼っている家畜の数はどのくらいですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "家畜の数は世界の人口の3倍以上です。",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "世界の人口の3倍以上", "correct": True, "sortOrder": 1},
                            {"content": "世界の人口と同じくらい", "correct": False, "sortOrder": 2},
                            {"content": "世界の人口の半分くらい", "correct": False, "sortOrder": 3},
                            {"content": "100万頭くらい", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) 牛の肉1キロを作るのに、穀物は約何キロ必要ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "牛肉1キロを作るのに約11キロの穀物が必要です。",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "約1キロ", "correct": False, "sortOrder": 1},
                            {"content": "約5キロ", "correct": False, "sortOrder": 2},
                            {"content": "約11キロ", "correct": True, "sortOrder": 3},
                            {"content": "約50キロ", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "地球はどうなる？",
                "content": "環境問題の原因と結果：\n\n・ごみを分別せず何でも燃やす\n→ ダイオキシンが出る → 体が弱くなる、環境ホルモンの影響\n\n・エネルギーを大量に使い、物を使い捨てる\n→ 二酸化炭素（CO2）が増える → 地球温暖化が進む → 気候変動、食料不足、難民の発生\n\n・古い電化製品を適切に処理せず壊す\n→ フロンガスが出る → オゾン層が破壊される → 紫外線が増加する → 皮膚ガンや病気が増える",
                "translation": "Nguyên nhân và hậu quả của các vấn đề môi trường:\n\n- Không phân loại rác, đốt rác bừa bãi:\n-> Sản sinh khí Dioxin độc hại -> Sức khỏe suy giảm, ảnh hưởng hormone môi trường.\n\n- Sử dụng lãng phí năng lượng, xả rác dùng một lần:\n-> Khí CO2 tăng -> Trái Đất ấm lên -> Biến đổi khí hậu, khủng hoảng lương thực.\n\n- Thải bỏ sai quy cách các thiết bị điện tử cũ:\n-> Rò rỉ khí Freon -> Phá hủy tầng Ozon -> Tia cực tím gia tăng -> Nguy cơ ung thư da và bệnh tật.",
                "imageUrl": "/media/reading/reading_n4_l42_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 地球温暖化（地球が暖かくなること）の直接の原因となる気体は何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "二酸化炭素（CO2）が増えることが地球温暖化の大きな原因です。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "二酸化炭素（CO2）", "correct": True, "sortOrder": 1},
                            {"content": "酸素", "correct": False, "sortOrder": 2},
                            {"content": "水素", "correct": False, "sortOrder": 3},
                            {"content": "水蒸気のみ", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "あなたのエコロジー度は？",
                "content": "毎日の生活で地球環境を守る行動をチェック：\n\n1. できるだけ車に乗らないで、電車やバスを使う\n2. エアコンはできるだけ使わない\n3. 電気製品は省エネの製品を使う\n4. 洗濯のときは、おふろの残り水を利用する\n5. 合成洗剤やせっけんを使いすぎない\n6. 油で汚れたお皿は、汚れをふき取ってから洗う\n7. 新聞・雑誌、瓶・缶などをリサイクルに出す\n8. 買い物にはマイバッグを持参する\n9. 夜は早く寝て、朝早く起きる\n\n小さなエコの積み重ねが地球の未来を守ります。",
                "translation": "Kiểm tra mức độ sống xanh bảo vệ môi trường hàng ngày:\n\n1. Hạn chế đi xe ô tô cá nhân, ưu tiên tàu điện và xe buýt\n2. Hạn chế sử dụng điều hòa\n3. Dùng thiết bị điện tiết kiệm năng lượng\n4. Tái sử dụng nước tắm để giặt giũ\n5. Không dùng quá nhiều chất tẩy rửa tổng hợp\n6. Lau sạch dầu mỡ trên đĩa trước khi rửa\n7. Thu gom báo cũ, chai lọ, lon tái chế\n8. Mang theo túi đi chợ cá nhân\n9. Ngủ sớm và dậy sớm\n\nMỗi hành động nhỏ sẽ chung tay bảo vệ tương lai Trái Đất.",
                "imageUrl": None,
                "sortOrder": 3,
                "questions": [
                    {
                        "question": "1) 油で汚れたお皿を洗うとき、環境にやさしい方法はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "まず紙などで汚れをふき取ってから洗うと、水や洗剤の無駄遣いを防げます。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "汚れを紙などでふき取ってから洗う", "correct": True, "sortOrder": 1},
                            {"content": "洗剤をいつもの3倍使って一気に流す", "correct": False, "sortOrder": 2},
                            {"content": "熱湯を何時間も出しっぱなしにして流す", "correct": False, "sortOrder": 3},
                            {"content": "汚れた皿を川に捨ててしまう", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 43 (Book p.60-63, PDF p.78-81)
    # =========================================================================
    dataset.append({
        "lessonNumber": 43,
        "items": [
            {
                "title": "お元気ですか",
                "content": "【メール1】\n宛先：佐藤朝子\n件名：お元気ですか\n\nおばさん、お元気ですか。\nわたしは大学の冬休みを利用して、南米のエクアドルとガラパゴス諸島へ行ってきました。ガラパゴスでは珍しいイグアナや巨大なリクガメをたくさん見ました。自然の豊かさに本当に感動しました。\n\nところで、最近ニュースで見ましたが、東京の多摩川に巨大なワニや外来魚がたくさん捨てられているそうですね。ペットショップで買った珍しい動物を、大きくなって飼えなくなったからと川に捨てるなんて、本当に無責任で勝手な人たちだと思います。動物を飼うことについて、もっと厳しい法律や規制が必要だと思います。\n\nこちらは今晩から雪が降りそうです。おばさんもかぜをひかないように気をつけてください。\n田中博\n追伸：旅行のとき撮った写真を添付します。\n\n【メール2（返信）】\n宛先：田中博\n件名：Re: お元気ですか\n\n博君、メールと写真をありがとう。ガラパゴスのカメ、立派ね。\n実はこの間、隣の家の庭に大きなカメが入ってきて、うちの子どもたち（健太とみき）が大騒ぎしたのよ。飼い主が探していたからすぐ戻ったけれど、珍しいペットを飼うなら最後まで責任を持って世話してほしいわね。\n博君、卒業試験が終わったら、ぜひうちに遊びに来てね。大好物の肉じゃがを作って待っていますよ。\n佐藤朝子\n追伸：お正月に撮った家族の写真を送ります。",
                "translation": "[Email 1]\nNgười nhận: Sato Asako\nTiêu đề: Cô có khỏe không ạ?\n\nCô ơi, cô và gia đình dạo này khỏe không ạ?\nCháu vừa tận dụng kỳ nghỉ đông đại học để đi du lịch Ecuador và quần đảo Galapagos ở Nam Mỹ về. Ở Galapagos cháu đã tận mắt thấy những con cự đà quý hiếm và những chú rùa cạn khổng lồ. Thiên nhiên hoang dã nơi đó thực sự tuyệt vời.\n\nNhân tiện, gần đây cháu xem tin tức thấy bảo ở sông Tamagawa ở Tokyo có người vứt cả cá sấu khổng lồ và nhiều loài cá ngoại lai xuống sông. Mua thú cưng độc lạ ở tiệm về nuôi, đến khi chúng lớn lên không nuôi nổi nữa lại đem vứt ra sông tự nhiên, đúng là những kẻ vô trách nhiệm và ích kỷ. Cháu nghĩ cần có quy định và luật pháp nghiêm ngặt hơn về việc nuôi động vật.\n\nChỗ cháu tối nay trời sắp đổ tuyết rồi. Cô giữ ấm đừng để bị cảm nhé ạ.\nTanaka Hiroshi\nTái bút: Cháu gửi kèm ảnh chụp trong chuyến đi ạ.\n\n[Email 2 - Hồi âm]\nNgười nhận: Tanaka Hiroshi\nTiêu đề: Re: Cô có khỏe không ạ?\n\nHiroshi à, cảm ơn cháu vì email và những bức ảnh nhé. Chú rùa Galapagos trông oai vệ thật đấy.\nThực ra mấy hôm trước có chú rùa to bò vào sân nhà bên cạnh, hai đứa Kenta và Miki nhà cô nháo nhào cả lên. May mà chủ của nó đi tìm nên đã trả về rồi, nhưng nuôi thú cưng lạ thì phải có trách nhiệm chăm sóc đến cùng chứ nhỉ.\nHiroshi thi tốt nghiệp xong nhớ ghé nhà cô chơi nhé. Cô sẽ nấu món thịt bò hầm khoai tây Nikujaga mà cháu thích nhất để thết đãi cháu.\nSato Asako\nTái bút: Cô gửi ảnh cả nhà chụp hôm Tết nhé.",
                "imageUrl": "/media/reading/reading_n4_l43_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 田中博さんは何月ごろこのメールを送りましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "「大学の冬休み」「今晩から雪が降りそう」という記述から、12月（冬）です。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "1月", "correct": False, "sortOrder": 1},
                            {"content": "6月", "correct": False, "sortOrder": 2},
                            {"content": "12月", "correct": True, "sortOrder": 3},
                            {"content": "8月", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) 田中博さんと佐藤朝子さんはどんな関係ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "博さんが「おばさん」と呼び、親戚の関係です。",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "友達", "correct": False, "sortOrder": 1},
                            {"content": "恋人", "correct": False, "sortOrder": 2},
                            {"content": "親戚（おばと甥）", "correct": True, "sortOrder": 3},
                            {"content": "会社の同僚", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) 田中博さんは、ペットを飼う人には厳しい規制が必要だと考えている。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "「動物を飼うことについてもっと厳しい法律や規制が必要だと思います」と述べています。(〇)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 44 (Book p.64-67, PDF p.82-85)
    # =========================================================================
    dataset.append({
        "lessonNumber": 44,
        "items": [
            {
                "title": "カレー",
                "content": "カレーライスを食べたことがありますか。カレーはもともとインドの料理ですが、日本には明治時代にイギリスから伝わりました。\n\n日本人はインドのカレーの作り方をイギリス人から学び、自分たちの好みに合うように工夫しました。小麦粉を入れてとろみをつけ、ご飯の上にかけて食べる「カレーライス」が誕生したのです。明治時代の終わりにはカレールウが国産化され、安くて栄養がある料理として全国の家庭や軍隊、学校給食に広まりました。\n\n昭和30年代（1950年代）に固形の「即席カレールウ」が発売されると、家庭で手軽にカレーが作れるようになり、生産量は飛躍的に増えました。今ではカレーうどん、カレー南蛮、カレーパンなど、カレーを使った日本独自の料理がたくさんあります。あるインド人は日本でカレールウを買って「日本のカレーは辛すぎずとても美味しい」と喜んで国へ持ち帰ったそうです。今や日本のカレーは独自の日本料理と言ってもいいでしょう。",
                "translation": "Bạn đã từng ăn cơm cà ri (Curry rice) chưa? Cà ri vốn có nguồn gốc từ Ấn Độ, nhưng du nhập vào Nhật Bản từ nước Anh vào thời kỳ Minh Trị.\n\nNgười Nhật đã học cách nấu cà ri của người Ấn thông qua người Anh, rồi biến tấu sao cho phù hợp với khẩu vị của mình. Họ thêm bột mì để tạo độ sánh sệt, rồi rưới lên cơm nóng ăn kèm - món cơm cà ri đặc trưng ra đời từ đó. Cuối thời Minh Trị, viên gia vị cà ri roux được tự sản xuất trong nước, trở thành món ăn vừa ngon, bổ dưỡng lại rẻ tiền nên đã phổ biến khắp các gia đình, quân đội và bữa ăn bán trú học đường.\n\nVào những năm 1950 (thập niên Chiêu Hòa 30), khi viên cà ri cô đặc ăn liền ra đời, các gia đình có thể nấu cà ri dễ dàng, sản lượng tiêu thụ tăng vọt gấp nhiều lần. Ngày nay có rất nhiều món ăn độc đáo của Nhật sử dụng cà ri như mì udon cà ri, bánh mì nhân cà ri... Có một người Ấn Độ sau khi mua cà ri Nhật đã khen rằng 'Cà ri Nhật không quá cay nồng mà vị rất thanh ngon' và mang về nước làm quà. Giờ đây cà ri Nhật hoàn toàn có thể được xem là một nét ẩm thực mang bản sắc riêng của Nhật Bản.",
                "imageUrl": "/media/reading/reading_n4_l44_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 日本人はインドのカレーの作り方をイギリス人から習った。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "カレーは明治時代にイギリスから日本に伝わりました。(〇)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 明治時代の終わりにカレールウが国産化され、値段が安くなった。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "安くて栄養のある料理として家庭や学校に広がりました。(〇)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 日本ではカレーライスのほかに、カレーうどんやカレーパンなどもある。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "カレーうどんやカレーパンなど、カレーを使った日本独自の料理がたくさんあります。(〇)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "料理教室",
                "content": "きょうは「お好み焼き」を作ってみましょう！\n\n【材料（4人分）】\n小麦粉 2カップ、水 1カップ、卵 2個、キャベツ 1/2個、豚肉やエビなど 100g、お好み焼きソース、かつおぶし、青のり、塩 少々\n\n【作り方】\n1. 小麦粉に、水と卵と塩を入れて混ぜる。よく混ざったら、小さく刻んだキャベツを入れてもう一度さっくり混ぜる。\n2. フライパンを熱して油を薄くひき、生地を入れて丸く広げる。厚さは2センチくらいにする。厚すぎると中まで火が通らない。\n3. 豚肉やエビなど好みの具を上にきれいに載せる。\n4. 下側と周りが焼けたら、裏返す。火が強すぎると焦げやすいので注意する。\n5. 両面がしっかり焼けたら、ソースを塗り、かつおぶしと青のりをふりかけて完成！",
                "translation": "Hôm nay chúng ta cùng vào bếp làm món bánh xèo Nhật Bản 'Okonomiyaki' nhé!\n\n[Nguyên liệu (khẩu phần 4 người)]\nBột mì 2 cốc, nước 1 cốc, trứng gà 2 quả, bắp cải 1/2 cái, thịt lợn hoặc tôm 100g, xốt okonomiyaki, cá bào katsuobushi, rong biển sợi aonori, một chút muối.\n\n[Cách làm]\n1. Cho bột mì, nước, trứng và chút muối vào âu trộn đều. Khi bột đã đều, cho bắp cải thái nhỏ vào trộn đều nhẹ tay.\n2. Làm nóng chảo, thoa một lớp dầu mỏng, trút bột vào dàn đều thành hình tròn dày khoảng 2 cm. Nếu quá dày bánh sẽ khó chín bên trong.\n3. Xếp thịt lợn hoặc tôm lên mặt trên của bánh.\n4. Khi mặt dưới và viền bánh đã chín vàng giòn thì lật mặt bánh. Chú ý lửa vừa để không bị cháy.\n5. Khi hai mặt đều chín vàng thơm, quét đều xốt okonomiyaki, rắc cá bào và rong biển lên trên rồi thưởng thức!",
                "imageUrl": "/media/reading/reading_n4_l44_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) お好み焼きを焼くとき、生地の厚さはどのくらいが適していますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "厚すぎると中まで火が通らないため、約2センチが適しています。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "約2センチ", "correct": True, "sortOrder": 1},
                            {"content": "約10センチ", "correct": False, "sortOrder": 2},
                            {"content": "紙のように薄くする", "correct": False, "sortOrder": 3},
                            {"content": "5ミリ以下", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 45 (Book p.68-71, PDF p.86-89)
    # =========================================================================
    dataset.append({
        "lessonNumber": 45,
        "items": [
            {
                "title": "119番に電話をかける",
                "content": "急に病気になったり、大きなけがをしたりした場合は、すぐに119番に電話をかけて救急車を呼ばなければなりません。火事のときも119番です。しかし、気が動転してうまく話せず、貴重な時間を無駄にしてしまうことがあります。\n\n消防署の方のアドバイス：\n1. 「火事ですか、救急ですか」と聞かれたら、はっきり「救急です」（または「火事です」）と答える。\n2. 住所と目標になる建物を正確に伝える。\n3. 「だれが、どうしたのか」状況を落ち着いて話す。\n4. 救急車がサイレンを鳴らして近づいてきたら、可能ならだれかが道案内に出る。\n\n万が一のときに慌てないよう、自宅の電話のそばに住所や家族のかかりつけ医のメモを貼っておくと安心です。",
                "translation": "Khi đột ngột ngã bệnh nặng hoặc bị thương tích nghiêm trọng, cần phải gọi ngay số 119 để gọi xe cứu thương. Khi xảy ra hỏa hoạn cũng gọi số 119. Tuy nhiên nhiều người do quá hoảng loạn không nói rõ ràng được nên đã lãng phí thời gian cấp cứu quý báu.\n\nLời khuyên từ Sở Cứu Hỏa:\n1. Khi tổng đài hỏi 'Cháy hay cấp cứu?', hãy trả lời dứt khoát 'Cấp cứu' (hoặc 'Cháy').\n2. Nêu chính xác địa chỉ và các tòa nhà mốc xung quanh.\n3. Bình tĩnh thuật lại ai đang bị làm sao.\n4. Khi nghe tiếng còi hú xe cứu thương đến gần, nếu có thể hãy cử người ra đầu đường chỉ dẫn xe vào.\n\nĐể không bị lúng túng khi hữu sự, dán sẵn một mẩu giấy ghi rõ địa chỉ nhà và số điện thoại khẩn cấp gần máy điện thoại sẽ rất hữu ích.",
                "imageUrl": "/media/reading/reading_n4_l45_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 日本で火事のときも急な病気のときも、電話番号は119番である。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "火事も救急も119番に通報します。(〇)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 119番に電話をかけたときは、まず慌てずに住所や状況を落ち着いて伝える。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "落ち着いて正確に伝えることが迅速な救助につながります。(〇)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 非常時に備えて電話のそばに住所などのメモを貼っておくと役に立つ。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "慌てていてもメモを見ながら正確に伝えられるため有効です。(〇)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "危ない！",
                "content": "ある日、ミラーさんは道を渡っていました。そのとき、向こう側にいた日本人の友達が「危ない！」と叫びました。ミラーさんは何が危ないのかよくわかりませんでしたが、立ち止まりました。すると車が目の前を猛スピードで通り過ぎていきました。\n\n次の日、車をバックさせて駐車場に入れようとしたとき、隣の友達が「ぶつかる！」と叫びました。ミラーさんは急ブレーキをかけ、壁に衝突せずにすみました。\n\n日本語では、緊急の危険が迫ったときに様々な言葉で警告します：\n・「危ない！」（全般的な危険）\n・「ぶつかる！」（衝突しそうなとき）\n・「落ちる！」（物が落下しそうなとき、人が転落しそうなとき）\n・「邪魔！」（通行の妨げになっているとき）\n状況に応じた咄嗟の言葉を知っておくと安全です。",
                "translation": "Một hôm, anh Miller đang băng qua đường. Đúng lúc đó người bạn Nhật ở phía đối diện hét lên: 'Nguy hiểm quá! / Coi chừng!'. Dù chưa hiểu chuyện gì nhưng anh Miller vội dừng bước lại. Ngay sau đó một chiếc ô tô phóng vụt qua ngay trước mũi giày với tốc độ chóng mặt.\n\nHôm sau khi anh lùi xe vào bãi đỗ xe, người bạn ngồi bên cạnh bỗng hét lên: 'Đâm bây giờ!'. Anh Miller đạp phanh gấp và may mắn không bị va quệt vào bức tường phía sau.\n\nTrong tiếng Nhật, tùy vào tình huống nguy cấp mà người ta dùng các từ cảnh báo tức thì khác nhau:\n- 'Abunai!' (Coi chừng / Nguy hiểm!)\n- 'Butsukaru!' (Sắp đâm va rồi!)\n- 'Ochiru!' (Sắp rơi / ngã rồi!)\n- 'Jama!' (Vướng quá / Tránh ra nào!).\nNắm được những khẩu lệnh này sẽ giúp chúng ta phản xạ nhanh chóng và an toàn.",
                "imageUrl": "/media/reading/reading_n4_l45_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 車がバックしていて後ろの壁に衝突しそうなとき、咄嗟にかける言葉はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "何かに衝突しそうなときは「ぶつかる！」と叫びます。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "ぶつかる！", "correct": True, "sortOrder": 1},
                            {"content": "落ちる！", "correct": False, "sortOrder": 2},
                            {"content": "折れる！", "correct": False, "sortOrder": 3},
                            {"content": "こぼれる！", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    return dataset

if __name__ == "__main__":
    data = get_part4_data()
    print(f"Loaded Part 4: {len(data)} lessons, {sum(len(d['items']) for d in data)} reading items.")
