import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Build N4 Reading dataset: Part 3 (Lessons 36-40)
def get_part3_data():
    dataset = []

    # =========================================================================
    # LESSON 36 (Book p.36-37, PDF p.54-55)
    # =========================================================================
    dataset.append({
        "lessonNumber": 36,
        "items": [
            {
                "title": "動物の目",
                "content": "皆さんは動物園へ行ったことがあるでしょう？ 短い足や大きい耳、長い鼻など、動物の体の形は面白いですね。目の形や位置もいろいろです。どうしてシマウマの目は顔の横にあるのですか。ライオンの目は前にならんでいるのですか。皆さんは考えたことがありますか。\n\nライオンはほかの動物の肉を食べます。その目は、遠くに動物がいても、すぐ走って行って捕まえられるように顔の前に2つ並んでいます。2つ並んでいなければ、正しい距離がわかりません。サルの目も顔の前に並んでいます。サルは木から木へ跳ぶとき、失敗しないように、よく前を見なければなりません。ヒトの目も同じです。ヒトは2本の足で歩けるようになって、手が使えるようになりました。それで、手で難しい仕事ができます。\n\n草や木の葉を食べる動物の目はどうですか。シマウマはライオンなどにいつも気をつけていなければなりません。ですから、草を食べていても、うしろの方まで見えるように、目が顔の横に付いています。カバは水の中にいますが、頭の上に目がありますから、目だけ水から出して周りを見ることができます。\n\n動物の目は食べる物や住んでいる所によって違うのです。今度動物園へ行ったら、動物の目をよく見てください。面白いことが見つかるかもしれませんよ。",
                "translation": "Chắc hẳn mọi người từng đi vườn thú rồi nhỉ? Chân ngắn, tai to, mũi dài... hình dáng cơ thể các loài động vật thật thú vị. Hình dáng và vị trí của đôi mắt cũng rất đa dạng. Tại sao mắt ngựa vằn lại nằm ở hai bên mặt? Tại sao mắt sư tử lại cùng nằm ở phía trước? Mọi người đã từng nghĩ về điều đó chưa?\n\nSư tử ăn thịt các loài động vật khác. Mắt của chúng nằm song song phía trước khuôn mặt để dù con mồi ở xa cũng có thể lao tới vồ bắt chính xác khoảng cách. Nếu hai mắt không cùng hướng về phía trước thì không thể xác định chính xác cự ly. Mắt khỉ cũng nằm ở phía trước mặt. Khi khỉ chuyền từ cành cây này sang cành cây khác, để không bị ngã trượt, chúng phải nhìn rõ phía trước. Mắt con người cũng vậy. Con người đi bằng hai chân nên đôi tay được giải phóng và có thể làm những công việc khéo léo, phức tạp.\n\nCòn mắt của loài ăn cỏ lá cây thì sao? Ngựa vằn luôn phải cảnh giác trước sư tử. Vì vậy, ngay cả khi đang cúi đầu gặm cỏ, để có thể nhìn thấy cả phía sau, mắt của chúng nằm ở hai bên mặt. Hà mã sống dưới nước, nhưng mắt nằm trên đỉnh đầu nên chúng có thể chỉ nhô mắt lên khỏi mặt nước để quan sát xung quanh.\n\nMắt của động vật khác nhau tùy thuộc vào thức ăn và nơi sinh sống của chúng. Lần tới đi sở thú, các bạn hãy quan sát thật kỹ đôi mắt của các con vật nhé. Có thể bạn sẽ phát hiện ra nhiều điều thú vị đấy.",
                "imageUrl": "/media/reading/reading_n4_l36_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) ライオンの目はうしろの方まで見えます。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "ライオンの目は獲物を捕まえるために顔の前に並んでおり、うしろの方まで見えるのはシマウマなど草食動物です。(✕)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) サルは目が顔の前に2つ並んでいますから、正しい距離がわかります。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "サルは木から木へ跳ぶときに失敗しないよう、前にある2つの目で正しい距離をつかみます。(〇)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) シマウマはうしろからライオンが来ても見えますから、逃げることができます。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "シマウマの目は顔の横にあるため、草を食べていてもうしろの方まで見えて危険から逃げられます。(〇)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "4) カバの目は、水から目だけ出して周りが見られるように、頭の上にあります。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "カバは頭の上に目があるため、水の中から目だけ出して周りを見ることができます。(〇)",
                        "imageUrl": None,
                        "sortOrder": 4,
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
    # LESSON 37 (Book p.38-41, PDF p.56-59)
    # =========================================================================
    dataset.append({
        "lessonNumber": 37,
        "items": [
            {
                "title": "55年かかってゴールインした日本人選手",
                "content": "日本は1912年の第5回ストックホルム大会からオリンピックに参加した。日本ではまだオリンピックはほとんど知られていなかった。選手を決めるマラソン大会が開かれて、20歳の学生が2時間32分45秒の記録で勝った。これはそのときの世界記録より27分速かった。学生の名前は金栗四三。金栗はオリンピック選手に選ばれた。ストックホルムへ行くお金がなかったが、兄や友達がお金を集めてくれた。それで、やっとオリンピックに参加することができた。\n\n金栗は一番になるかもしれないと思われていた。しかし、マラソンが行われた7月14日はとても暑い日だった。金栗は走っていてだんだん気分が悪くなった。水を飲んだり、頭から水を浴びたりしたが、32kmの所で倒れてしまった。近くに住んでいた親切な人に助けられて、その人のうちに泊まった。そして、次の日、元気になって、日本の選手がいるホテルへ帰った。「消えた日本人」はスウェーデンのニュースになっていた。一生懸命捜していた人はみんな金栗を見たとき、とても喜んでくれた。しかし、金栗は恥ずかしかった。\n\n1967年、75歳の金栗は招待されてストックホルムへ行った。競技場でたくさんの人に迎えられた金栗はみんなの前をゆっくり走って、ゴールインした。競技場にアナウンスがあった。「ミスター・カナグリ、ニッポン。ゴールイン。時間は54年と8か月6日5時間32分20秒3。これでストックホルム大会は全部の競技を終わりました。」金栗は言った。「長い試合でした。スタートからゴールインまでに孫が5人できましたよ。」",
                "translation": "Nhật Bản bắt đầu tham gia Thế vận hội Olympic từ kỳ đại hội lần thứ 5 năm 1912 tại Stockholm. Lúc bấy giờ ở Nhật hầu như chưa ai biết đến Olympic. Một giải chạy marathon tuyển chọn tuyển thủ được tổ chức, và chàng sinh viên 20 tuổi đã chiến thắng với thành tích 2 giờ 32 phút 45 giây. Thành tích này nhanh hơn kỷ lục thế giới lúc đó tới 27 phút. Tên của chàng sinh viên đó là Kanakuri Shizo. Kanakuri được chọn làm vận động viên Olympic. Dù không có đủ kinh phí sang Stockholm, người anh trai và bạn bè đã gom góp tiền ủng hộ giúp anh. Nhờ thế anh cuối cùng đã có thể tham dự Olympic.\n\nKanakuri được kỳ vọng có thể sẽ về nhất. Tuy nhiên, ngày 14 tháng 7 diễn ra cuộc thi chạy marathon là một ngày vô cùng oi bức. Đang chạy thì Kanakuri dần dần cảm thấy kiệt sức. Dù đã uống nước và dội nước lên đầu, anh vẫn ngã quỵ ở mốc 32 km. Được một người dân tốt bụng gần đó giúp đỡ, anh đã ngủ nhờ lại nhà họ. Ngày hôm sau khi khỏe lại, anh trở về khách sạn nơi đoàn Nhật Bản lưu trú. Vụ việc 'Vận động viên Nhật Bản biến mất' đã lên trang nhất các báo Thụy Điển. Mọi người sau bao công tìm kiếm khi thấy Kanakuri đều vỡ òa vui mừng. Tuy nhiên, Kanakuri cảm thấy vô cùng hổ thẹn.\n\nNăm 1967, ở tuổi 75, Kanakuri được mời quay lại Stockholm. Được chào đón nồng nhiệt tại sân vận động, Kanakuri chầm chậm chạy trước mọi người và cán đích. Loa phát thanh sân vận động vang lên: 'Ông Kanakuri, đoàn Nhật Bản, đã cán đích! Thời gian hoàn thành là 54 năm 8 tháng 6 ngày 5 giờ 32 phút 20 giây 3. Như vậy kỳ Olympic Stockholm chính thức kết thúc toàn bộ các nội dung thi đấu!'. Kanakuri tươi cười phát biểu: 'Đó thực sự là một chặng đua dài. Từ khi xuất phát tới lúc về đích tôi đã có thêm tới 5 đứa cháu ngoại đấy.'",
                "imageUrl": "/media/reading/reading_n4_l37_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 1912年ごろ日本ではオリンピックはとても人気があった。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "本文に「日本ではまだオリンピックはほとんど知られていなかった」とあります。(✕)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 第5回大会のまえの選考会で金栗の記録は当時の世界記録より速かった。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "「これはそのときの世界記録より27分速かった」と書かれています。(〇)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 金栗は自分のお金でオリンピックに参加した。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "ストックホルムへ行くお金がなかったが、兄や友達がお金を集めてくれました。(✕)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "4) 金栗選手が途中で走れなくなった理由は何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "とても暑い日で体調が悪くなり、倒れてしまったからです。",
                        "imageUrl": None,
                        "sortOrder": 4,
                        "options": [
                            {"content": "とても暑い日で気分が悪くなって倒れてしまったから", "correct": True, "sortOrder": 1},
                            {"content": "道に迷ってストックホルムの街から出られなくなったから", "correct": False, "sortOrder": 2},
                            {"content": "走るまえに冷たい水を飲みすぎたから", "correct": False, "sortOrder": 3},
                            {"content": "ほかの選手と衝突して足にけがをしたから", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 38 (Book p.42-45, PDF p.60-63)
    # =========================================================================
    dataset.append({
        "lessonNumber": 38,
        "items": [
            {
                "title": "消したいもの",
                "content": "「あなたが一番消したいものは何ですか。」\nある会社が1000人にアンケートをしました。\n\n大人の男性と女性が消したいもの：\n・1番：体の脂肪\n・2番：借りたお金\n・3番：恥ずかしいこと\n男の人は「借りたお金」と答えた人が多くて、女の人は「体の脂肪」と答えた人が多かったです。\n\n子どもの消したいもの：\n・1番：悪い成績\n・2番：宿題\n・3番：けんかしたこと\n\nアンケートをした会社は、消しゴムを作っている会社です。「何でも消せる消しゴムがあればいいですね」と社長は言いました。",
                "translation": "'Điều bạn muốn xóa đi nhất là gì?'\nMột công ty đã làm cuộc khảo sát với 1.000 người.\n\nĐiều người lớn (nam và nữ) muốn xóa đi nhất:\n- Số 1: Lượng mỡ thừa trên cơ thể\n- Số 2: Tiền vay nợ\n- Số 3: Những chuyện đáng xấu hổ trong quá khứ\nỞ nam giới người trả lời là 'tiền vay nợ' chiếm nhiều nhất, còn ở nữ giới người trả lời là 'mỡ thừa' chiếm nhiều nhất.\n\nĐiều trẻ em muốn xóa đi nhất:\n- Số 1: Điểm số kém\n- Số 2: Bài tập về nhà\n- Số 3: Những lần cãi vã đánh nhau với bạn bè\n\nCông ty làm cuộc khảo sát này chính là một công ty chuyên sản xuất tẩy (gôm). Vị giám đốc nói: 'Giá như có một cục tẩy xóa được mọi thứ trên đời thì hay biết mấy'.",
                "imageUrl": "/media/reading/reading_n4_l38_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) アンケートで大人の女性が一番消したいと答えたものは何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "女性の1位は「体の脂肪」でした。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "体の脂肪", "correct": True, "sortOrder": 1},
                            {"content": "借りたお金", "correct": False, "sortOrder": 2},
                            {"content": "宿題", "correct": False, "sortOrder": 3},
                            {"content": "恥ずかしいこと", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) 子どもが一番消したいと答えたものは何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "子どもの1位は「悪い成績」でした。",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "宿題", "correct": False, "sortOrder": 1},
                            {"content": "悪い成績", "correct": True, "sortOrder": 2},
                            {"content": "けんかしたこと", "correct": False, "sortOrder": 3},
                            {"content": "体の脂肪", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "迷惑なことは？",
                "content": "駅や電車の中で迷惑なことは何ですか。鉄道会社が調べました。\n\n迷惑行為ランキング：\n1位：大きい声で話したり、騒いだりする（33.2%）\n2位：座り方が悪い（31.7%）\n3位：乗るとき、降りるときのマナーが悪い（27.9%）\n4位：ケータイの音や話す声がうるさい（24.7%）\n5位：ヘッドホンから音漏れが聞こえる（24.5%）\n6位：荷物の持ち方や置き方が悪い（22.3%）\n7位：混んでいる電車にベビーカーを押して乗る（19.5%）\n8位：ごみや空き缶を置いておく（16.9%）\n9位：電車の中で化粧する（16.5%）\n10位：酔っぱらって電車に乗る（14.6%）\n\n（日本民営鉄道協会調べ）",
                "translation": "Hành vi gây phiền toái ở nhà ga và trên tàu điện là gì? Các công ty đường sắt đã tiến hành khảo sát.\n\nBảng xếp hạng các hành vi gây khó chịu nhất:\n1. Nói to, làm ồn (33,2%)\n2. Tư thế ngồi thiếu ý thức (31,7%)\n3. Thiếu văn hóa khi lên xuống tàu (27,9%)\n4. Tiếng chuông điện thoại hoặc nói chuyện điện thoại ồn ào (24,7%)\n5. Tai nghe để lọt âm thanh ra ngoài (24,5%)\n6. Cách đeo hoặc để hành lý vướng víu (22,3%)\n7. Đẩy xe nôi chen chúc lên tàu đông (19,5%)\n8. Vứt lại rác, vỏ lon trên tàu (16,9%)\n9. Trang điểm trên tàu (16,5%)\n10. Say xỉn lên tàu (14,6%).",
                "imageUrl": "/media/reading/reading_n4_l38_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 駅や電車の中で最も迷惑だと感じられている行為は何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "調査で1位（33.2%）は「大きい声で話したり、騒いだりすること」です。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "大きい声で話したり、騒いだりすること", "correct": True, "sortOrder": 1},
                            {"content": "電車の中で化粧すること", "correct": False, "sortOrder": 2},
                            {"content": "ごみを置いていくこと", "correct": False, "sortOrder": 3},
                            {"content": "酔っぱらって乗ること", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "なぞなぞ",
                "content": "日本の面白いなぞなぞ：\n\n1. 切っても、切っても、切れないものは何？\n→ こたえ：水（みず）\n\n2. 生まれると、みんながもらうもの。自分のものだけど、ほかの人がよく使うものは何？\n→ こたえ：名前（なまえ）\n\n3. 作った人は言わない、持っている人はわからない、知っている人は欲しくないものは何？\n→ こたえ：にせ金（にせがね）\n\n4. 長生きすると多くなるけど、欲しくないものは何？\n→ こたえ：年（とし）／しわ\n\n5. 眠くなると会いに来て、起きるといない。見たくてもなかなか見られないものは何？\n→ こたえ：夢（ゆめ）",
                "translation": "Những câu đố mẹo dân gian thú vị của Nhật Bản:\n\n1. Càng cắt càng không đứt là gì?\n-> Đáp án: Nước.\n\n2. Sinh ra ai cũng được nhận. Là của mình nhưng người khác lại dùng nhiều nhất?\n-> Đáp án: Tên gọi.\n\n3. Người làm ra không nói, người cầm không hay, người biết rõ thì chẳng ai muốn nhận?\n-> Đáp án: Tiền giả.\n\n4. Càng sống lâu thì càng nhiều thêm, nhưng chẳng ai muốn nhận thêm là gì?\n-> Đáp án: Tuổi tác / nếp nhăn.\n\n5. Khi buồn ngủ thì tìm đến, khi tỉnh giấc thì biến mất, muốn nhìn thấy cũng khó là gì?\n-> Đáp án: Giấc mơ.",
                "imageUrl": None,
                "sortOrder": 3,
                "questions": [
                    {
                        "question": "1) 「自分のものだけど、ほかの人がよく使うもの」のこたえは何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "「名前」は自分のものですが、呼ぶときに他人が一番使います。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "名前", "correct": True, "sortOrder": 1},
                            {"content": "お金", "correct": False, "sortOrder": 2},
                            {"content": "夢", "correct": False, "sortOrder": 3},
                            {"content": "水", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 39 (Book p.46-49, PDF p.64-67)
    # =========================================================================
    dataset.append({
        "lessonNumber": 39,
        "items": [
            {
                "title": "万次郎",
                "content": "1827年、高知の小さな村に元気な男の子が生まれました。名前は万次郎。家族は魚をとって暮らしていました。9歳のときにお父さんが亡くなったので、万次郎は家族のために、働かなければなりませんでした。\n\n1841年、14歳の万次郎は4人の仲間と船で漁に出ましたが、嵐に遭って太平洋の無人島に流されました。水も食べ物もほとんどない島で143日間生き延びた後、アメリカの捕鯨船「ジョン・ハウランド号」に助けられました。船長のホイットフィールドは万次郎の頭の良さと人柄を気に入り、アメリカへ連れて行きました。万次郎は「ジョン・マン」と呼ばれ、アメリカの学校で英語、数学、測量、航海術などを熱心に勉強しました。\n\nその後、万次郎は故郷の日本へ帰ることを決意し、1851年に日本へ戻りました。当時、日本は鎖国をしていましたが、ペリーの黒船が来航すると、幕府は英語と航海術に通じた万次郎を必要とし、武士の身分を与えて「中浜万次郎」と名乗らせました。万次郎は通訳や翻訳、航海術の教授として、日本の近代化に大きく貢献しました。",
                "translation": "Năm 1827, tại một ngôi làng nhỏ ở Kochi, một bé trai khôi ngô ra đời. Tên cậu là Manjiro. Gia đình sống bằng nghề đánh cá. Năm 9 tuổi cha mất, Manjiro phải bươn chải làm việc để phụ giúp gia đình.\n\nNăm 1841, Manjiro 14 tuổi cùng 4 người bạn đi thuyền đánh cá thì gặp bão lớn dạt vào một hoang đảo ở Thái Bình Dương. Sau 143 ngày sinh tồn khắc nghiệt trên hòn đảo thiếu nước và đồ ăn, họ được tàu săn cá voi Mỹ mang tên 'John Howland' cứu sống. Thuyền trưởng Whitfield rất quý mến sự thông minh và hoạt bát của Manjiro nên đã đưa cậu về Mỹ. Manjiro được gọi thân mật là 'John Mung', cậu chăm chỉ học tiếng Anh, toán học, trắc địa và kỹ thuật hàng hải tại trường học ở Mỹ.\n\nSau đó, Manjiro quyết tâm trở về quê hương Nhật Bản và đã trở về vào năm 1851. Thời điểm đó Nhật Bản đang bế quan tỏa cảng, nhưng khi tàu đen của Đề đốc Perry cập bến, chính quyền Mạc phủ rất cần người thông thạo tiếng Anh và hàng hải nên đã phong cho Manjiro thân phận võ sĩ Samurai với họ tên Nakahama Manjiro. Manjiro đã đảm nhận phiên dịch, dịch thuật, giảng dạy kỹ thuật đi biển và đóng góp to lớn cho công cuộc hiện đại hóa của Nhật Bản.",
                "imageUrl": "/media/reading/reading_n4_l39_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 万次郎が無人島に流されたあと、だれに助けられましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "アメリカの捕鯨船（ジョン・ハウランド号）に助けられました。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "アメリカの捕鯨船", "correct": True, "sortOrder": 1},
                            {"content": "日本の幕府の船", "correct": False, "sortOrder": 2},
                            {"content": "高知の漁師の船", "correct": False, "sortOrder": 3},
                            {"content": "イギリスの貿易船", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) 万次郎が日本に帰ったあと、幕府でどんな仕事をしましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "英語の通訳や翻訳、造船や航海術を教える仕事などをしました。",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "英語の通訳や航海術を教える仕事", "correct": True, "sortOrder": 1},
                            {"content": "高知で魚をとる仕事だけをした", "correct": False, "sortOrder": 2},
                            {"content": "アメリカの大統領になった", "correct": False, "sortOrder": 3},
                            {"content": "お寺の住職になった", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "読みましたか・見ましたか・聞きましたか",
                "content": "心に残る名作や文化の紹介：\n\n1. 本文の「万次郎」を読みましたか。すごい運命の人がいたんですね。\n2. 「鉄腕アトム」を知っていますか。マンガも面白いけど、アニメもいいですね。テーマ曲を聞くと元気が湧いてきます。\n3. バレエを見たことがありますか。「白鳥の湖」で白鳥を踊った人はとてもきれいで感動しました。\n4. 映画や演劇の「シラノ・ド・ベルジュラック」を見て感動しました。本当の愛を伝える名作です。",
                "translation": "Giới thiệu những tác phẩm văn hóa nghệ thuật lay động lòng người:\n\n1. Bạn đã đọc câu chuyện về 'Manjiro' chưa? Đúng là một con người với số phận kỳ diệu nhỉ.\n2. Bạn có biết 'Astro Boy' (Atom tay sắt) không? Truyện tranh hay mà hoạt hình cũng tuyệt. Cứ nghe nhạc mở đầu là thấy tràn đầy năng lượng.\n3. Bạn từng xem múa ba lê chưa? Xem 'Hồ thiên nga', vũ công múa vai thiên nga đẹp tuyệt trần khiến người xem xúc động.\n4. Xem vở kịch 'Cyrano de Bergerac' thật xúc động. Một kiệt tác về tình yêu chân thành.",
                "imageUrl": "/media/reading/reading_n4_l39_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 「鉄腕アトム」のテーマ曲を聞くとどんな気持ちになると紹介されていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "アトムの歌を聞くと元気が出ると書かれています。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "元気が出る", "correct": True, "sortOrder": 1},
                            {"content": "悲しくなる", "correct": False, "sortOrder": 2},
                            {"content": "眠くなる", "correct": False, "sortOrder": 3},
                            {"content": "お腹がすく", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 40 (Book p.50-53, PDF p.68-71)
    # =========================================================================
    dataset.append({
        "lessonNumber": 40,
        "items": [
            {
                "title": "常識",
                "content": "わたしのうちに今、ブラジルのアナさんがホームステイしています。アナさんがかぜをひいたとき、母は「シャワーを浴びたり、おふろに入ったりしたらだめよ」と言いました。アナさんは「どうしていけないか、わかりません。病気のときは清潔が大切だし、わたしのうちでは熱が下がるようにシャワーを浴びたり、ぬるいお湯に入ったりします」と言いました。\n\nそれを聞いて、わたしたちはびっくりしました。熱があったり、かぜをひいたりしているときは、おふろに入らないほうがいいと信じていたからです。学校で友達に聞いてみましたが、みんな「おふろは入らないほうがいいと思う」と言いました。どうしてでしょうか。昔の日本のおふろは外にあったり、脱衣所が寒かったりして湯冷めしやすかったからです。でも今の日本の家は暖房があって暖かいので、さっとシャワーを浴びるくらいなら問題ありません。\n\n生活が変わっても、昔の常識をそのまま信じているのは不思議です。ときどきその常識が正しいかどうか、どうしてその常識ができたのか、考えてみたほうがいいでしょう。",
                "translation": "Nhà tôi hiện có bạn Ana đến từ Brazil đang ở homestay. Khi Ana bị cảm cúm, mẹ tôi dặn: 'Đừng tắm vòi sen hay ngâm bồn tắm con nhé'. Ana ngạc nhiên bảo: 'Cháu không hiểu tại sao lại không được ạ. Khi ốm thì giữ vệ sinh sạch sẽ rất quan trọng, ở nhà cháu khi bị sốt mọi người thường tắm vòi sen hoặc ngâm nước ấm vừa phải để hạ sốt ạ'.\n\nNghe vậy chúng tôi rất ngạc nhiên. Bởi vì người Nhật từ xưa luôn tin rằng khi sốt hay cảm cúm thì không nên tắm. Tôi hỏi bạn bè ở trường, ai cũng nói 'Tớ nghĩ không nên tắm'. Tại sao lại như vậy? Vì ngày xưa phòng tắm ở Nhật thường nằm ngoài trời hoặc phòng thay đồ rất lạnh nên rất dễ bị nhiễm lạnh sau khi tắm. Nhưng nhà cửa ngày nay có hệ thống sưởi ấm áp, nên tắm nhanh dưới vòi sen thì không có vấn đề gì.\n\nDù đời sống đã thay đổi nhưng vẫn mù quáng tin vào những 'thường thức' ngày xưa thì thật kỳ lạ. Thỉnh thoảng chúng ta nên suy ngẫm xem thường thức đó có còn đúng hay không, và vì sao lại có định kiến thường thức ấy.",
                "imageUrl": "/media/reading/reading_n4_l40_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) かぜのときや熱が高いとき、おふろに入らないのは世界中の常識だ。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "ブラジルなど外国では清潔を保ち熱を下げるためにシャワーを浴びる習慣もあり、世界共通の常識ではありません。(✕)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 熱があるとき、ぬるいおふろに入って、体の熱を下げようと思う人がいる。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "アナさんの国では熱を下げるためにぬるいお湯に入ったりします。(〇)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 昔の日本人がかぜのときにおふろに入らなかった主な理由は何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "昔のおふろ場や脱衣所が寒く、湯冷めしてかぜが悪化しやすかったからです。",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "昔の家やお風呂場が寒くて湯冷めしやすかったから", "correct": True, "sortOrder": 1},
                            {"content": "昔はお風呂の水がとても汚かったから", "correct": False, "sortOrder": 2},
                            {"content": "お風呂に入ると薬の効果が消えると信じられていたから", "correct": False, "sortOrder": 3},
                            {"content": "水が貴重でお風呂を沸かせなかったから", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "だれでもできて健康にいい習慣、教えます",
                "content": "毎日のちょっとした習慣で健康になれる方法：\n\n1. 朝起きたら、すぐ冷たい水をコップ一杯飲む\n→ 冷たい水を飲むと、休んでいた胃と腸が動き始め、お通じが良くなります。\n\n2. 音楽を聞きながら食事する\n→ 楽しい音楽を聞いてリラックスすると、胃液がたくさん出て消化を助けます。\n\n3. 毎日鏡を見て笑う\n→ わたしたちの体には病気と闘う力があります。笑うとその免疫力が強くなり、気分も明るくなります。\n\n4. 大股で歩く\n→ 大股で歩くと、自然と運動量が増え、足の筋肉をしっかり鍛えられます。\n\n5. 寝る前に足の裏を5分マッサージする\n→ 足の裏を刺激することで全身の血行が良くなり、ぐっすり眠れます。",
                "translation": "Những thói quen đơn giản ai cũng có thể làm để có một sức khỏe tốt:\n\n1. Vừa thức dậy uống ngay một ly nước mát: Kích thích dạ dày và ruột khởi động, hỗ trợ tiêu hóa.\n2. Vừa nghe nhạc vừa dùng bữa: Nghe nhạc vui tươi thư giãn giúp tiết dịch vị tiêu hóa thức ăn tốt hơn.\n3. Mỗi ngày nhìn vào gương và mỉm cười: Nụ cười giúp tăng cường hệ miễn dịch chống lại bệnh tật và mang lại tinh thần lạc quan.\n4. Đi sải bước dài: Tăng cường vận động và rèn luyện cơ bắp chân chắc khỏe.\n5. Xoa bóp lòng bàn chân 5 phút trước khi đi ngủ: Kích thích lưu thông máu toàn thân giúp ngủ ngon và sâu giấc.",
                "imageUrl": "/media/reading/reading_n4_l40_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 朝起きてすぐ冷たい水を飲むと、どんな良い効果がありますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "胃と腸が動き始めて消化や排便が良くなります。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "胃と腸が動き始める", "correct": True, "sortOrder": 1},
                            {"content": "すぐに眠くなる", "correct": False, "sortOrder": 2},
                            {"content": "足の筋肉が強くなる", "correct": False, "sortOrder": 3},
                            {"content": "喉が渇かなくなる", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "健康チェック",
                "content": "あなたの心臓と血管が疲れていないかチェックしてみましょう。\n\n当てはまる項目をチェック：\n・油が多い料理がとても好きだ\n・コーヒーに必ずミルクと砂糖を入れる\n・座っているときも脈拍が1分間に90回以上ある\n・スポーツをほとんどしない\n・塩辛い食べ物が好きだ\n・冬、重い布団をかけて寝ている\n・たばこが絶対にやめられない\n・枕が高くなければ寝られない\n・魚より肉をよく食べる\n・よく心臓がドキドキする\n\n診断：\n・チェックが10個以上：要注意！心臓と血管が疲れています。すぐに生活習慣を見直しましょう。\n・チェックが5～9個：油断禁物。適度な運動とバランスの取れた食事を心がけましょう。\n・チェックが4個以下：良好です。今の良い生活習慣を続けましょう。",
                "translation": "Hãy kiểm tra xem tim và mạch máu của bạn có đang mệt mỏi hay không nhé.\n\nCác dấu hiệu cần lưu ý:\n- Rất thích các món nhiều dầu mỡ\n- Luôn cho đường và sữa vào cà phê\n- Ngay cả khi ngồi yên tim vẫn đập trên 90 nhịp/phút\n- Hầu như không bao giờ tập thể dục\n- Thích ăn đồ đậm vị, mặn\n- Mùa đông đắp chăn quá dày và nặng\n- Không thể bỏ được thuốc lá\n- Gối phải cao mới ngủ được\n- Ăn thịt nhiều hơn ăn cá\n- Hay bị hồi hộp, tim đập thình thịch\n\nĐánh giá kết quả:\n- Từ 10 điểm: Báo động! Cần thăm khám bác sĩ và điều chỉnh lối sống ngay.\n- 5 đến 9 điểm: Không được chủ quan, cần tập thể dục và ăn uống cân bằng.\n- Dưới 4 điểm: Tình trạng rất tốt, hãy duy trì lối sống lành mạnh này nhé.",
                "imageUrl": None,
                "sortOrder": 3,
                "questions": [
                    {
                        "question": "1) 心臓や血管の健康のために避けたほうがよい習慣はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "油が多い料理や塩辛いものを多く食べ、運動をしない生活は心臓や血管に負担をかけます。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "油や塩分の多い料理ばかり食べること", "correct": True, "sortOrder": 1},
                            {"content": "適度な運動を続けること", "correct": False, "sortOrder": 2},
                            {"content": "魚や野菜をバランスよく食べること", "correct": False, "sortOrder": 3},
                            {"content": "毎日鏡を見て笑うこと", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    return dataset

if __name__ == "__main__":
    data = get_part3_data()
    print(f"Loaded Part 3: {len(data)} lessons, {sum(len(d['items']) for d in data)} reading items.")
