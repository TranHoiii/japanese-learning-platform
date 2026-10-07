import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Build N4 Reading dataset: Part 2 (Lessons 31-35)
def get_part2_data():
    dataset = []

    # =========================================================================
    # LESSON 31 (Book p.18-21, PDF p.36-39)
    # =========================================================================
    dataset.append({
        "lessonNumber": 31,
        "items": [
            {
                "title": "1月1日",
                "content": "きょうは1月1日です。わたしの家族はみんな毎年1月1日に新年の決意を発表します。\n\n父・虎男（49歳）\n去年はジョギングを始めましたが、続けられませんでした。今年は50歳になるし、会社で課長になったし、体に気をつけようと思っています。お酒もできるだけ飲まないつもりです。太ると、困るから、食事に気をつけて、運動します。\n\n母・敏子（48歳）\n今年は介護のボランティアを始めようと思っています。若いときから介護の仕事をやりたかったんです。ボランティアをしながら、勉強をして資格も取るつもりです。皆さん、応援よろしくお願いします。\n\n姉・恵（22歳）\nインドネシアのバリの踊りが好きだから、将来はバリで踊りを研究したいと思っています。それで、今年からインドネシア語の勉強を始めようと思っています。\n\n弟・龍男（10歳）\n今年5年生になるから、学校のスポーツクラブに入れます。僕は野球のクラブに入ろうと思っています。僕は足も速いし、上手に打てるから、すぐ試合に出られると思います。みんな見に来てください。それから去年は宿題をよく忘れたけど、今年は忘れないつもりです。",
                "translation": "Hôm nay là ngày 1 tháng 1. Cả gia đình tôi hàng năm vào ngày 1 tháng 1 đều công bố quyết tâm năm mới.\n\nBố - Torao (49 tuổi):\nNăm ngoái bố bắt đầu chạy bộ nhưng không duy trì được. Năm nay bố tròn 50 tuổi, lại lên chức trưởng phòng ở công ty nên định sẽ chú ý giữ gìn sức khỏe. Bố dự định hạn chế uống rượu hết mức có thể. Vì béo phì rất phiền toái nên bố sẽ chú ý ăn uống và tập thể dục.\n\nMẹ - Toshiko (48 tuổi):\nNăm nay mẹ định bắt đầu làm tình nguyện viên chăm sóc người già. Từ khi còn trẻ mẹ đã muốn làm công việc chăm sóc. Mẹ dự định vừa làm tình nguyện viên vừa học để lấy chứng chỉ. Rất mong mọi người ủng hộ.\n\nChị gái - Megumi (22 tuổi):\nVì thích điệu múa Bali của Indonesia nên tương lai em muốn nghiên cứu về điệu múa ở Bali. Vì vậy từ năm nay em định bắt đầu học tiếng Indonesia.\n\nEm trai - Tatsuo (10 tuổi):\nNăm nay em lên lớp 5 nên được vào câu lạc bộ thể thao của trường. Em định vào câu lạc bộ bóng chày. Em chạy nhanh và đánh bóng giỏi nên em nghĩ sẽ sớm được thi đấu. Mọi người hãy đến xem nhé. Thêm nữa năm ngoái em hay quên bài tập về nhà nhưng năm nay em nhất định sẽ không quên.",
                "imageUrl": "/media/reading/reading_n4_l31_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) お父さんは今年ジョギングを続けます。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "お父さんは「去年はジョギングを始めましたが、続けられませんでした。今年は体に気をつけようと思っています。お酒もできるだけ飲まないつもりです」と言っており、ジョギングを続けるとは言っていません。(✕)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) お母さんは介護の資格を取ってから、ボランティアをしようと思っています。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "お母さんは「ボランティアをしながら、勉強をして資格も取るつもりです」と言っています。(✕)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 恵さんは今年踊りの研究にバリへ行く予定です。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "恵さんは「将来はバリで踊りを研究したい。今年からインドネシア語の勉強を始めようと思っています」と言っており、今年バリへ行く予定ではありません。(✕)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "4) 龍男君は今年宿題を必ずやろうと思っています。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "龍男君は「去年は宿題をよく忘れたけど、今年は忘れないつもりです」と言っています。(〇)",
                        "imageUrl": None,
                        "sortOrder": 4,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "あなたは何年生まれ？",
                "content": "昔、神様が動物たちに言った。\n「1月1日の朝、わたしのうちへ早く来た順に、1番目から12番目のものに大切な仕事をあげよう。」\nネコは神様の話がよく聞こえなかったから、ネズミに「いつ？」と聞いた。ネズミは「2日だ」とうそを言った。\nウシが最初に神様のうちに着いたが、ウシの背中にはネズミがこっそり乗っていた。ドアが開いたときに、ネズミが飛び降りて、1番になった。そして2番から12番までの動物が決まった。\n神様が言った。\n「今年はネズミの年だ。ネズミの仕事は今年生まれる人たちを守ることだ。来年はウシ年で、ウシの仕事は来年生まれる人たちを守ることだ。毎年順番に仕事をして、12番まで仕事をしたら、またネズミの年になる。」\nこのときから毎年ネズミ年、ウシ年などと言う。ネコは遅れたから、仕事ももらえなかったし、ネコ年もない。それで、ネコはネズミを見ると、追いかける。今も怒っているのだ。",
                "translation": "Ngày xửa ngày xưa, Thần linh nói với các loài động vật:\n'Sáng ngày 1 tháng 1, theo thứ tự những ai đến nhà ta sớm nhất, ta sẽ giao công việc quan trọng cho 12 con đầu tiên.'\nMèo không nghe rõ lời Thần dặn nên hỏi Chuột: 'Khi nào thế?'. Chuột nói dối: 'Ngày mùng 2 đấy'.\nBò là con đầu tiên đến nhà Thần linh, nhưng trên lưng Bò có Chuột đã lén trèo lên. Khi cánh cửa mở ra, Chuột nhảy bổ xuống và về nhất. Thế là các con vật từ số 2 đến số 12 đã được quyết định.\nThần linh phán:\n'Năm nay là năm Chuột. Việc của Chuột là bảo vệ những người sinh ra trong năm nay. Năm sau là năm Bò, việc của Bò là bảo vệ những người sinh ra năm sau. Mỗi năm lần lượt làm nhiệm vụ, khi hết 12 con thì lại đến năm Chuột.'\nTừ dạo đó mới có năm Tý, năm Sửu v.v. Mèo vì đến muộn nên không nhận được nhiệm vụ, cũng chẳng có năm Mão (theo 12 con giáp Nhật Bản, năm Mão là Thỏ). Vì thế hễ nhìn thấy Chuột là Mèo đuổi bắt. Đến tận bây giờ Mèo vẫn còn tức giận.",
                "imageUrl": "/media/reading/reading_n4_l31_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) どうしてネコはネズミを追いかけるのですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "ネズミに「2日だ」とうそを教えられて遅れ、仕事ももらえずネコ年もなくなったため、今でも怒っているからです。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "ネズミにうそをつかれて遅れ、十二支に入れなかったから", "correct": True, "sortOrder": 1},
                            {"content": "神様のうちにネズミより先に着いたから", "correct": False, "sortOrder": 2},
                            {"content": "ウシの背中に乗っていたネズミが嫌いだから", "correct": False, "sortOrder": 3},
                            {"content": "ネズミが神様の話を全部聞いていなかったから", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) ネズミはどうやって1番になりましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "ウシの背中にこっそり乗り、ドアが開いたときに飛び降りて1番になりました。",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "足がとても速くて最初に走って着いた", "correct": False, "sortOrder": 1},
                            {"content": "ウシの背中にこっそり乗って、ドアが開いたときに飛び降りた", "correct": True, "sortOrder": 2},
                            {"content": "神様に頼んで1番にしてもらった", "correct": False, "sortOrder": 3},
                            {"content": "ネコといっしょに朝早く起きて出かけた", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 32 (Book p.22-25, PDF p.40-43)
    # =========================================================================
    dataset.append({
        "lessonNumber": 32,
        "items": [
            {
                "title": "桜とお花見",
                "content": "日本人に「いちばん好きな花は何ですか」と聞いたら、多くの人が「桜」と答えるでしょう。春になって桜が咲くと、周りの景色がみんなピンク色になります。本当にきれいです。そして、満開の桜は風が吹くと一斉に散ります。桜は散るときも、とてもきれいです。\n\n春には、たくさんの人が桜を見に行きます。お花見は1200年ぐらいまえから続いている日本の春の大きいイベントです。桜が咲く時期は南から北へだんだん移ります。沖縄の桜がいちばん早くて、1月ごろ咲きます。北海道の桜は5月ごろ咲きます。ですから、お花見のシーズンになると、天気予報の中で、「上野公園の桜は来週金曜日ごろ満開になるでしょう。」とか、「弘前城の桜はもうすぐ咲くでしょう。」とか、桜の花が咲く日の予想を発表します。桜は1～2週間で散ってしまいますから、予想を聞いて、お花見の日を決めます。\n\nお花見では、家族や友達と、桜を見ながら食べたり飲んだり、歌ったり踊ったりします。絵をかいたり、写真を撮ったりする人もいます。バーベキューなどができる公園もあります。昼の桜もいいですが、夜の桜もとてもきれいです。でも、お花見のころの夜はちょっと寒いかもしれませんから、セーターなど暖かい服を持って行ったほうがいいでしょう。\n\n日本には、桜の名所がたくさんあります。春になると、桜の名所も、町の公園も、朝から夜まで人でいっぱいです。お花見は、日本人が短い桜の季節を楽しむ大切なイベントなのです。",
                "translation": "Nếu hỏi người Nhật 'Bạn thích loài hoa nào nhất?', có lẽ rất nhiều người sẽ trả lời là 'Hoa anh đào' (Sakura). Khi mùa xuân đến và hoa anh đào nở, cảnh sắc xung quanh đều nhuộm một màu hồng. Thực sự rất đẹp. Và khi hoa nở rộ, chỉ một cơn gió thoảng qua là cánh hoa đồng loạt rơi rụng. Hoa anh đào ngay cả khi rụng cũng tuyệt đẹp.\n\nVào mùa xuân, rất nhiều người đi ngắm hoa. Ngắm hoa anh đào (Hanami) là một sự kiện lớn vào mùa xuân của Nhật Bản đã kéo dài khoảng 1200 năm nay. Thời điểm hoa anh đào nở dần dần dịch chuyển từ nam lên bắc. Hoa anh đào ở Okinawa nở sớm nhất vào khoảng tháng 1. Hoa anh đào ở Hokkaido nở vào khoảng tháng 5. Do đó khi bước vào mùa ngắm hoa, trong các bản tin dự báo thời tiết, người ta sẽ công bố dự báo ngày nở hoa như: 'Hoa anh đào ở công viên Ueno sẽ nở rộ vào khoảng thứ Sáu tuần sau' hay 'Hoa anh đào ở thành Hirosaki sắp nở'. Vì hoa anh đào tàn rụng chỉ trong 1-2 tuần nên mọi người nghe dự báo để chọn ngày đi ngắm hoa.\n\nKhi ngắm hoa, mọi người cùng gia đình, bạn bè vừa ngắm hoa vừa ăn uống, ca hát, nhảy múa. Có người vẽ tranh, chụp ảnh. Có những công viên cho phép nướng thịt BBQ. Hoa anh đào ban ngày đẹp nhưng hoa anh đào ban đêm cũng rất lung linh. Tuy nhiên ban đêm vào mùa ngắm hoa có thể hơi lạnh, nên mang theo áo ấm như áo len thì tốt hơn.\n\nỞ Nhật Bản có rất nhiều danh lam thắng cảnh ngắm hoa anh đào nổi tiếng. Mùa xuân đến, từ các địa điểm nổi tiếng đến công viên trong phố đều chật kín người từ sáng đến tối. Ngắm hoa là một sự kiện quan trọng để người Nhật tận hưởng mùa hoa anh đào ngắn ngủi.",
                "imageUrl": "/media/reading/reading_n4_l32_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 桜は、咲いているときより、散るときのほうがきれいです。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "本文では「満開の桜もきれいで、散るときもとてもきれい」と述べており、どちらのほうがきれいか比べてはいません。(✕)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 沖縄で桜の花が見られなかった人は、北海道へ行ったら見られます。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "桜前線は南から北へ進み、沖縄は1月、北海道は5月ごろ咲くため、北海道に行けば見られます。(〇)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 天気予報を聞いてから、お花見の日を決めたほうがいいです。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "桜は1～2週間ですぐ散ってしまうため、天気予報の開花予想を聞いて日を決めるのが適切です。(〇)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "4) 上野公園で一か月ぐらいお花見を楽しむことができます。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "桜の花は1～2週間で散ってしまうため、同じ公園で1か月間楽しむことはできません。(✕)",
                        "imageUrl": None,
                        "sortOrder": 4,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "5) 夜のお花見をするときは、着る物に気をつけたほうがいいです。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "「お花見のころの夜はちょっと寒いかもしれませんから、セーターなど暖かい服を持って行ったほうがいいでしょう」と書かれています。(〇)",
                        "imageUrl": None,
                        "sortOrder": 5,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "お花見",
                "content": "日本人3万人に桜とお花見について聞きました。\n\n「桜が好きですか」という質問に対して：\n・とても好き：75%\n・まあまあ好き：22%\n・どちらでもない：3%\n\n好きなスタイル（スタイル別）：\n① 昼、散歩しながら見る\n② 夜桜を見る\n③ 桜の木の下でパーティーをする\n④ ドライブしながら見る\n⑤ 会社や学校へ行くとき見る\n\nまた、桜の花や葉の塩漬けをお湯に入れて「桜茶」として飲んだり、桜の葉で包んだ「桜餅」や「鯛の桜蒸し」など、桜を料理や和菓子にして味わう文化もあります。",
                "translation": "Khảo sát 30.000 người Nhật về hoa anh đào và việc ngắm hoa:\n\nĐối với câu hỏi 'Bạn có thích hoa anh đào không?':\n- Rất thích: 75%\n- Khá thích: 22%\n- Bình thường/không ý kiến: 3%\n\nPhong cách ngắm hoa được yêu thích:\n① Ban ngày vừa đi dạo vừa ngắm\n② Ngắm hoa anh đào ban đêm (Yozakura)\n③ Mở tiệc liên hoan dưới gốc hoa anh đào\n④ Vừa lái xe vừa ngắm\n⑤ Ngắm trên đường đi làm hoặc đến trường\n\nNgoài ra còn có nét văn hóa thưởng thức ẩm thực từ hoa anh đào như 'Trà hoa anh đào' (Sakura-cha), bánh 'Sakura-mochi' hay món 'Cá tráp hấp hoa anh đào'.",
                "imageUrl": "/media/reading/reading_n4_l32_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 日本人で桜が「とても好き」と答えた人は何％ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "調査によると、「とても好き」と答えた人は75%です。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "22%", "correct": False, "sortOrder": 1},
                            {"content": "40%", "correct": False, "sortOrder": 2},
                            {"content": "75%", "correct": True, "sortOrder": 3},
                            {"content": "90%", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 33 (Book p.26-29, PDF p.44-47)
    # =========================================================================
    dataset.append({
        "lessonNumber": 33,
        "items": [
            {
                "title": "大声大会",
                "content": "わたしの町では毎年5月に大声大会があります。大きい声で何か叫んで、一年の嫌なことを忘れるのです。\n\n去年のテーマは「あの人に言いたい」でした。ほとんどの人は「税金を下げろ！」とか「首相はやめろ！」とか叫びましたが、外国から参加した女の人は「トーホク！ ガ・ン・バ・ロー！」と叫びました。この声が大会でいちばん大きい声でした。大きい地震があった東北の人に「元気を出して。いっしょに頑張りましょう」と言いたかったのです。\n\nほかに、「山本！貸した金返せ！」「給料を上げろ！」「良子、結婚してくれ！」「社長、下手な英語を使うなー！」「幸子、かんにーん！」などがありました。「かんにん」は大阪弁で「すみません」という意味です。この人は何か幸子さんに謝りたいことがあるのでしょう。\n\n毎日の生活では大声で叫ぶチャンスがありません。一年に一度、大声で叫んで、一年のストレスを全部出してしまいましょう。",
                "translation": "Ở thị trấn của tôi, hàng năm vào tháng 5 đều tổ chức cuộc thi hét to. Mọi người hét to một điều gì đó để quên đi những chuyện không vui trong một năm.\n\nChủ đề năm ngoái là 'Điều muốn nói với người ấy'. Hầu hết mọi người đều hét lên: 'Hãy giảm thuế đi!' hay 'Thủ tướng hãy từ chức đi!'. Nhưng một người phụ nữ nước ngoài tham gia đã hét: 'Tohoku! Cố lên nhé!'. Tiếng hét này là tiếng to nhất cuộc thi. Chị ấy muốn gửi lời đến người dân vùng Tohoku nơi vừa trải qua trận động đất lớn: 'Hãy lên tinh thần nhé. Cùng nhau cố gắng nào!'.\n\nNgoài ra còn có: 'Yamamoto! Trả tiền vay đây!', 'Tăng lương đi!', 'Yoshiko, lấy anh nhé!', 'Giám đốc, đừng có nói tiếng Anh dở tệ nữa!', 'Sachiko, tha lỗi cho anh!'. 'Kannin' trong tiếng địa phương Osaka có nghĩa là 'Xin lỗi'. Chắc là anh này có điều gì muốn xin lỗi cô Sachiko.\n\nTrong cuộc sống thường ngày chúng ta không có dịp hét to. Mỗi năm một lần, hãy hét thật to để giải tỏa hết căng thẳng trong một năm nhé.",
                "imageUrl": "/media/reading/reading_n4_l33_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 去年の大会で一番大きい声になった人のことばはどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "外国から参加した女の人が叫んだ「トーホク！ ガ・ン・バ・ロー！」がいちばん大きい声でした。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "税金を下げろ", "correct": False, "sortOrder": 1},
                            {"content": "首相はやめろ", "correct": False, "sortOrder": 2},
                            {"content": "トーホク！ ガ・ン・バ・ロー！", "correct": True, "sortOrder": 3},
                            {"content": "山本！貸した金返せ！", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) 「山本！貸した金返せ！」はだれがだれに言ったことばですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "友達が山本君にお金を返してほしいと言ったことばです。",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "友達 → 山本君", "correct": True, "sortOrder": 1},
                            {"content": "山本君 → 友達", "correct": False, "sortOrder": 2},
                            {"content": "銀行 → 山本君", "correct": False, "sortOrder": 3},
                            {"content": "社長 → 山本君", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) 大声大会に参加したら、嫌なことが忘れられ、ストレスを出すことができる。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "本文の最後に「一年に一度、大声で叫んで、一年のストレスを全部出してしまいましょう」とあります。(〇)",
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
                "title": "こんな人にこのことば",
                "content": "日常生活の中で気をつけたいことと、ぴったりのことば：\n\n・石川さん（25歳）：「禁煙？考えたことない。寝る前はベッドで吸うんだ。一度布団が少し燃えたことがあるけど。」\n→「小さい火 初めはみんな 気をつけろ」\n\n・上田さん（27歳）：「あ、あそこの信号、もうすぐ赤になる！早く渡ってしまおう。」\n→「注意一秒、けが一生」\n\n・南山さん（36歳）：「シーツを買いました。袋を開けてから自分のベッドで使えないとわかりました。店に返しに行ったけど換えてもらえませんでした。」\n→「よく見て！聞いて！確かめて！」\n\n・田村さん（53歳）：「ごみは多いですよ。エアコンは一年中使っています。車が好きだからどこでも車で行きます。」\n→「守れ、緑の地球」\n\n・高橋さん（42歳）：「おじいちゃんは最近何でも忘れるし、何回も聞くし疲れます。子どもはいくら言っても部屋を片づけないし。」\n→「年寄り、笑うな、来た道だから。子ども、しかるな、行く道だから。」",
                "translation": "Những thói quen cần lưu ý trong cuộc sống thường nhật và các câu nhắc nhở phù hợp:\n\n- Anh Ishikawa (25 tuổi): 'Bỏ thuốc? Chưa từng nghĩ tới. Trước khi ngủ tôi hút trên giường. Đã có lần chăn bị cháy xém một chút rồi đấy.' -> 'Lửa nhỏ lúc đầu, ai ai cũng phải cẩn thận.'\n\n- Anh Ueda (27 tuổi): 'A, đèn giao thông sắp đỏ rồi! Mau sang đường thôi.' -> 'Bất cẩn một giây, tàn tật một đời.'\n\n- Chị Minamiyama (36 tuổi): 'Tôi mua ga trải giường. Mở túi ra mới biết không vừa giường nhà mình. Mang ra tiệm đổi thì không được đổi nữa.' -> 'Hãy nhìn kỹ! Lắng nghe! Xác nhận kỹ!'\n\n- Ông Tamura (53 tuổi): 'Rác nhiều lắm. Điều hòa bật quanh năm. Tôi thích xe nên đi đâu cũng lái ô tô.' -> 'Hãy bảo vệ Trái Đất xanh.'\n\n- Chị Takahashi (42 tuổi): 'Ông dạo này cái gì cũng quên, hỏi đi hỏi lại mệt ghê. Con cái thì bảo bao lần cũng không chịu dọn phòng.' -> 'Người già chớ cười, vì đó là con đường ta từng đi qua. Trẻ nhỏ chớ mắng, vì đó là con đường ta sẽ đi tới.'",
                "imageUrl": "/media/reading/reading_n4_l33_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 「ベッドでたばこを吸う人」に教えることばとして最も適切なものはどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "火災の危険があるため、「小さい火 初めはみんな 気をつけろ」が適切です。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "注意一秒、けが一生", "correct": False, "sortOrder": 1},
                            {"content": "小さい火 初めはみんな 気をつけろ", "correct": True, "sortOrder": 2},
                            {"content": "守れ、緑の地球", "correct": False, "sortOrder": 3},
                            {"content": "よく見て！聞いて！確かめて！", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 34 (Book p.30-31, PDF p.48-49)
    # =========================================================================
    dataset.append({
        "lessonNumber": 34,
        "items": [
            {
                "title": "あなたの国では？",
                "content": "日本ではあいさつするとき、頭を下げます。握手をしたり体に触ったりするあいさつはあまりありません。また、日本人は「わたし」というとき、人差し指で自分の鼻を指します。\n\n手を使うジェスチャーはいろいろあります。人の前や間を歩くとき、手を立てて上げたり下げたりします。これは「ちょっとすみません」という意味です。また、手を顔の前で横に何回も振ります。これは「さようなら」のジェスチャーではありません。「わかりません」「できません」「いいえ、違います」などの意味です。\n\n人や犬などを呼ぶとき、日本人は手のひらを下に向けて振ります。また、日本人は口の前に人差し指を立てて「シーッ」と言います。これは「話すな！」という意味です。みんなの前で話すときは、ポケットに手を入れて話してはいけません。また、日本人は相手の目をあまり見ないで話します。じっと見ると失礼なのです。\n\nこのほかに笑うとき、手で口を隠す女の人がいます。昔、女の人はほかの人に歯を見せてはいけませんでした。それで今もその習慣のとおりにしているのです。\n\n日本では小さい子どもに「いい子だね」と言うとき、頭に触ります。しかし、タイなどの東南アジアの国では頭に触ってはいけません。旅行のガイドブックにはタイへ行ったら、人の頭に触るなと書いてあります。世界にはいろいろなジェスチャーがあります。",
                "translation": "Ở Nhật Bản khi chào hỏi, người ta cúi đầu. Rất ít khi bắt tay hay chạm vào cơ thể khi chào. Ngoài ra khi nói 'tôi', người Nhật lấy ngón trỏ chỉ vào mũi mình.\n\nCó rất nhiều cử chỉ điệu bộ (gesture) dùng tay. Khi đi cắt ngang mặt người khác hoặc đi giữa dòng người, họ giơ bàn tay khép thẳng lên xuống. Điệu bộ này có nghĩa là 'Xin lỗi một chút'. Khi xua tay ngang trước mặt nhiều lần, đây không phải cử chỉ tạm biệt, mà có nghĩa là 'Tôi không biết', 'Tôi không làm được' hoặc 'Không phải đâu'.\n\nKhi gọi người hoặc gọi chó, người Nhật úp lòng bàn tay xuống dưới rồi vẫy. Ngoài ra người Nhật đặt ngón trỏ lên trước miệng và nói 'Suỵt', có nghĩa là 'Đừng nói nữa!'. Khi nói chuyện trước đám đông, không được đút tay vào túi quần. Người Nhật cũng ít khi nhìn chằm chằm vào mắt đối phương khi nói chuyện vì nhìn chằm chằm là bất lịch sự.\n\nBên cạnh đó, khi cười có những phụ nữ lấy tay che miệng. Ngày xưa, phụ nữ không được để lộ răng cho người khác thấy. Vì thế cho đến nay họ vẫn duy trì tập quán đó.\n\nỞ Nhật khi khen trẻ nhỏ 'Bé ngoan quá', người ta xoa đầu bé. Tuy nhiên ở các nước Đông Nam Á như Thái Lan, tuyệt đối không được sờ vào đầu người khác. Sách hướng dẫn du lịch có viết nếu đến Thái Lan thì đừng chạm vào đầu người khác. Trên thế giới có muôn vàn cử chỉ điệu bộ khác nhau.",
                "imageUrl": "/media/reading/reading_n4_l34_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 人がたくさんいる所で松本さんを呼びました。松本さんは「えっ、わたし？」と言いながら、どんなジェスチャーをしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "日本人は「わたし」と言うとき、人差し指で自分の鼻を指します。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "人差し指で自分の鼻を指す", "correct": True, "sortOrder": 1},
                            {"content": "手を顔の前で横に振る", "correct": False, "sortOrder": 2},
                            {"content": "手のひらを下に向けて振る", "correct": False, "sortOrder": 3},
                            {"content": "口の前に人差し指を立てる", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) 公園で男の子が友達に「こっちへ来て」と呼ぶとき、どんなジェスチャーをしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "人や動物を呼ぶとき、日本人は手のひらを下に向けて振ります。",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "手のひらを上に向けて振る", "correct": False, "sortOrder": 1},
                            {"content": "手のひらを下に向けて振る", "correct": True, "sortOrder": 2},
                            {"content": "手を立てて上げたり下げたりする", "correct": False, "sortOrder": 3},
                            {"content": "相手の頭に触る", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) 道を聞かれた日本人が「英語、わからない」と答えるとき、どんなジェスチャーをしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "「わかりません」「できません」という意味のとき、日本人は手を顔の前で横に何回も振ります。",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "手を顔の前で横に何回も振る", "correct": True, "sortOrder": 1},
                            {"content": "ポケットに手を入れる", "correct": False, "sortOrder": 2},
                            {"content": "相手の目をじっと見る", "correct": False, "sortOrder": 3},
                            {"content": "頭を激しく下げる", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 35 (Book p.32-35, PDF p.50-53)
    # =========================================================================
    dataset.append({
        "lessonNumber": 35,
        "items": [
            {
                "title": "自動販売機",
                "content": "日本は自動販売機が多い国だ。ボタンを押せば、簡単に飲み物やお菓子などいろいろな物が買える。今、日本では飲み物の販売機がいちばん多くて、257万台ある。2番目はプリペイドカードや靴下など生活用品を売る販売機で、86万台ある。3番目はたばこの販売機で、23万台ある。食べ物の販売機が7万台ぐらい、切符などの販売機が4万台ある。全部で377万台だ。\n\nいつでも使うことができるから、便利だが、問題もある。日本では20歳以上にならなければ、お酒を飲んだり、たばこを吸ったりすることはできない。しかし、夜はだれも見ていないから、子どもでも、販売機でたばこやお酒が買える。また、24時間動かすと、電気もむだになる。\n\nそれで、お酒の販売機は夜11時から朝5時まで止めてある。たばこは「タスポ」というカードを機械にタッチしなければ、買えない。このカードは大人しか持てない。また、最近では、販売機のほとんどが節電タイプになっている。1991年から2013年までに、飲み物の販売機が使う電力は75％減った。\n\nしかし、販売機は町の美しさを壊すし、ごみが増えると言う人もいる。古くて静かな京都のお寺でも、門の前に販売機が置いてある。そばのごみ箱はいつでも空き缶でいっぱいだ。また、夜中に販売機の前に若い人が集まって、騒いだりする。便利な販売機だが、問題はまだある。\n\n《世界最初の自動販売機》\n紀元前3世紀にエジプトのお寺にありました。お金を入れると、その重さで水の出口が開いて、水が出てきました。\n\n《日本最初の自動販売機》\n明治21年にできた、たばこの販売機でした。今あるいちばん古い販売機は切手とはがきの販売機です。木の箱で、ポストもいっしょですから、切手とはがきを買って、手紙も出せる便利なものでした。",
                "translation": "Nhật Bản là quốc gia có rất nhiều máy bán hàng tự động. Chỉ cần bấm nút là có thể mua đủ loại đồ uống, bánh kẹo một cách dễ dàng. Hiện nay ở Nhật Bản, máy bán đồ uống nhiều nhất với 2,57 triệu máy. Thứ hai là máy bán nhu yếu phẩm như tất, thẻ trả trước với 860.000 máy. Thứ ba là máy bán thuốc lá với 230.000 máy. Máy bán đồ ăn có khoảng 70.000 máy, máy bán vé khoảng 40.000 máy. Tổng cộng lên tới 3,77 triệu máy.\n\nVì có thể sử dụng bất cứ lúc nào nên rất tiện lợi, nhưng cũng phát sinh vấn đề. Ở Nhật Bản phải từ 20 tuổi trở lên mới được uống rượu và hút thuốc. Nhưng vào ban đêm không có ai giám sát, nên trẻ em cũng có thể mua thuốc lá hay rượu ở máy tự động. Thêm nữa nếu hoạt động 24/24 thì gây lãng phí điện năng.\n\nVì vậy, máy bán rượu bị khóa từ 11 giờ đêm đến 5 giờ sáng. Máy bán thuốc lá nếu không chạm thẻ 'taspo' vào máy thì không thể mua được. Thẻ này chỉ người lớn mới có. Ngoài ra gần đây hầu hết các máy bán hàng đều là loại tiết kiệm điện. Từ năm 1991 đến năm 2013, lượng điện năng máy bán nước giải khát sử dụng đã giảm tới 75%.\n\nTuy nhiên, có người phàn nàn máy bán hàng tự động làm mất mỹ quan đường phố và gia tăng rác thải. Ngay cả những ngôi chùa cổ kính yên tĩnh ở Kyoto, trước cổng cũng đặt máy bán hàng. Thùng rác bên cạnh lúc nào cũng tràn ngập vỏ lon rỗng. Ngoài ra đêm muộn nhiều thanh niên tụ tập trước máy gây ồn ào. Dù tiện lợi nhưng máy bán tự động vẫn còn nhiều vấn đề tồn tại.\n\n- Máy bán hàng tự động đầu tiên trên thế giới: Ra đời vào thế kỷ 3 trước Công nguyên ở ngôi đền Ai Cập. Khi thả đồng xu vào, sức nặng của đồng xu mở nắp vòi và nước chảy ra.\n- Máy bán hàng tự động đầu tiên của Nhật Bản: Năm Minh Trị 21 (1888), là máy bán thuốc lá. Máy cổ nhất còn tồn tại đến nay là máy bán tem và bưu thiếp bằng gỗ, kết hợp luôn hòm thư.",
                "imageUrl": "/media/reading/reading_n4_l35_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 大人は夜11時まで、販売機でお酒が買える。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "「お酒の販売機は夜11時から朝5時まで止めてある」ので、夜11時までは買えます。(〇)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 販売機でたばこを買うときは、カードを販売機に入れる。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "たばこは「タスポ」というカードを機械に「タッチ」しなければ買えないので、入れるのではありません。(✕)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 全部の販売機が使う電力は2013年までに75%減った。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "本文では「飲み物の販売機が使う電力は75%減った」とあり、全部の販売機ではありません。(✕)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "ほんとうに自動販売機で売っているの？",
                "content": "日本にはいろいろ珍しい自動販売機もあります。\n\n街で見かけるユニークな自動販売機の例：\n・温かいおでんの缶詰\n・きれいな生花\n・突然の雨のための傘\n・焼きたてのクレープやパン\n・採れたての新鮮な卵や野菜\n\n「こんな物まで売っているの？」と驚くような自動販売機がたくさん開発されています。",
                "translation": "Ở Nhật Bản có rất nhiều loại máy bán hàng tự động độc đáo, lạ mắt.\n\nVí dụ những máy bán hàng kỳ lạ trên đường phố:\n- Đồ hộp Oden nóng hổi\n- Hoa tươi thơm ngát\n- Ô dù đi mưa khi gặp mưa bất chợt\n- Bánh crepe hoặc bánh mì nướng\n- Trứng tươi và rau củ mới thu hoạch\n\nNhiều loại máy khiến người ta phải ngạc nhiên thốt lên: 'Đến món này mà cũng bán tự động ư?'.",
                "imageUrl": "/media/reading/reading_n4_l35_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 日本の自動販売機で売られている珍しいものとして紹介されているものはどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "おでんの缶詰、生花、傘、クレープ、野菜などが珍しい自動販売機として知られています。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "おでんの缶詰や生花、傘など", "correct": True, "sortOrder": 1},
                            {"content": "本物の自動車", "correct": False, "sortOrder": 2},
                            {"content": "生きたペットの犬や猫", "correct": False, "sortOrder": 3},
                            {"content": "海外旅行の飛行機チケット", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    return dataset

if __name__ == "__main__":
    data = get_part2_data()
    print(f"Loaded Part 2: {len(data)} lessons, {sum(len(d['items']) for d in data)} reading items.")
