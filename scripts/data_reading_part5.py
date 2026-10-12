import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Build N4 Reading dataset: Part 5 (Lessons 46-50)
def get_part5_data():
    dataset = []

    # =========================================================================
    # LESSON 46 (Book p.72-75, PDF p.90-93)
    # =========================================================================
    dataset.append({
        "lessonNumber": 46,
        "items": [
            {
                "title": "いとこの長靴",
                "content": "僕は3歳のとき、パトカーに乗ったことがある。雨の降る日、僕は年上のいとこの大きな赤い長靴をはいて、散歩に出かけた。ぶかぶかの長靴は歩きにくかったが、水たまりを踏むのが楽しくて、夢中で歩いているうちに迷子になってしまったのだ。\n\n気がついたときは知らない大通りで、泣きべそをかいていた僕を、通りかかったパトカーのお巡りさんが助けてくれた。交番へ連れて行かれ、優しいお巡りさんがクリームパンとジュースを買ってくれた。僕は泣くのをやめて、美味しそうにパンを食べていた。\n\nそこへ血相を変えた両親が駆け込んできた。警察官にお礼を言いながら、母は僕を強く抱きしめて泣いた。僕は口の周りにクリームをつけたまま、何が起こったのかよくわからずにいたが、あの赤い長靴とパトカーのサイレンの音は、今でも鮮明に覚えている。",
                "translation": "Năm lên 3 tuổi, tôi từng được ngồi trên xe cảnh sát một lần. Vào một ngày mưa, tôi xỏ đôi ủng đỏ to đùng của người anh họ rồi ra ngoài dạo chơi. Đôi ủng rộng thùng thình bước đi thật khó, nhưng nhảy vào các vũng nước mưa thích quá nên mải mê đi một hồi tôi bị lạc lúc nào không hay.\n\nĐến khi nhận ra mình đang ở trên đại lộ xa lạ, tôi bắt đầu mếu máo khóc thì được các chú cảnh sát trên xe tuần tra đi ngang qua cứu giúp. Được đưa về bốt cảnh sát (Koban), các chú cảnh sát tốt bụng mua cho tôi một chiếc bánh mì nhân kem và hộp nước hoa quả. Tôi nín khóc và ngon lành gặm chiếc bánh mì.\n\nĐúng lúc đó, bố mẹ tôi mặt mày tái mét hớt hải chạy vào. Vừa rối rít cảm ơn các anh cảnh sát, mẹ vừa ôm chầm lấy tôi bật khóc nức nở. Tôi với miệng còn dính đầy kem trắng xóa, ngơ ngác chẳng hiểu chuyện gì lớn, nhưng đôi ủng đỏ và âm thanh còi xe tuần tra ngày ấy đến giờ tôi vẫn nhớ như in.",
                "imageUrl": "/media/reading/reading_n4_l46_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) ぼくは3歳のとき、パトカーに乗ったことがある。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "迷子になったときパトカーに乗せてもらいました。(〇)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) ぼくが迷子になった原因は何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "いとこの大きな長靴をはいて水たまりで遊んでいるうちに夢中になって道に迷いました。",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "長靴をはいて夢中で歩いているうちに迷子になった", "correct": True, "sortOrder": 1},
                            {"content": "両親に買い物を頼まれて出かけたから", "correct": False, "sortOrder": 2},
                            {"content": "パトカーを追いかけて走ったから", "correct": False, "sortOrder": 3},
                            {"content": "友達とけんかして家出をしたから", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "俳句",
                "content": "俳句は日本で生まれた世界でいちばん短い、17音の詩です。\n\n俳句を作るときの基本的な規則：\n1. 17音を「五・七・五」のリズムにして作る。\n2. 季節を表すことば「季語（きご）」を入れる。\n3. 気持ちを強調したりリズムを整えたりするために「や」「かな」「けり」などの切れ字を使う。\n\n【有名な日本の俳句】\n・春：菜の花や 月は東に 日は西に（与謝蕪村）\n菜の花が一面に咲く夕暮れ時、東の空に月が昇り、西の空に太陽が沈んでいく壮大な春の風景です。\n\n・夏：閑さや 岩にしみ入る 蝉の声（松尾芭蕉）\n山寺の静けさの中、蝉の鳴き声だけが岩にしみ通るように響く、深閑とした夏の情景です。\n\n・秋：名月を 取ってくれろと 泣く子かな（小林一茶）\n秋の美しい満月を見て、「あのお月様を取って！」と無心にねだる幼い子どもの愛らしい姿を詠んでいます。",
                "translation": "Haiku là thể thơ ngắn nhất thế giới gồm 17 âm tiết, ra đời tại Nhật Bản.\n\nQuy tắc cơ bản khi làm thơ Haiku:\n1. 17 âm tiết được ngắt theo nhịp 5 - 7 - 5.\n2. Bắt buộc có 'Kigo' (từ chỉ mùa).\n3. Sử dụng từ ngắt câu như 'ya', 'kana' để nhấn mạnh cảm xúc và tạo nhịp điệu.\n\n[Những bài thơ Haiku nổi tiếng]:\n- Mùa xuân: 'Cánh đồng hoa cải vàng / Trăng lên đầu non đông / Vầng dương lặn hướng tây' (Yosa Buson).\n- Mùa hạ: 'Vắng lặng biết bao lăm / Tiếng ve ngâm rả rích / Thấm sâu vào lòng đá' (Matsuo Basho).\n- Mùa thu: 'Vằng vặc ánh trăng rằm / Đứa bé nheo nhẻo khóc / Đòi hái vầng trăng chơi' (Kobayashi Issa).",
                "imageUrl": "/media/reading/reading_n4_l46_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 俳句の音の数とリズムとして正しいものはどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "俳句は「五・七・五」の17音で作られます。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "五・七・五の17音", "correct": True, "sortOrder": 1},
                            {"content": "七・七の14音", "correct": False, "sortOrder": 2},
                            {"content": "五・七・五・七・七の31音", "correct": False, "sortOrder": 3},
                            {"content": "十・十の20音", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) 俳句を作るときに必ず入れなければならない季節を表すことばを何と呼びますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "季節を表すことばは「季語（きご）」と呼ばれます。",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "季語（きご）", "correct": True, "sortOrder": 1},
                            {"content": "和歌（わか）", "correct": False, "sortOrder": 2},
                            {"content": "枕詞（まくらことば）", "correct": False, "sortOrder": 3},
                            {"content": "標語（ひょうご）", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 47 (Book p.76-79, PDF p.94-97)
    # =========================================================================
    dataset.append({
        "lessonNumber": 47,
        "items": [
            {
                "title": "空を飛ぶ自動車",
                "content": "空を飛ぶ自動車が欲しいと思ったことはありませんか。SFマンガや映画の中で見たことがある人も多いでしょう。実は、本当に空を飛べる自動車「スカイカー」の開発が世界中で進んでいます。\n\nアメリカのあるベンチャー企業が2012年に発表したスカイカーは、翼を広げると飛行機になり、翼を畳むと普通の道路を走ることができます。ただし、離陸するためには約760メートルの滑走路が必要でした。価格は約2300万円でしたが、100人以上が予約したそうです。\n\nさらに最近では、滑走路が不要でヘリコプターのように垂直に離着陸できるハイブリッド型スカイカー（eVTOL）も開発されています。これが実用化されれば、交通渋滞を避けて都市間を高速で移動できるようになり、離島や山間部への移動も格段に便利になると期待されています。",
                "translation": "Bạn đã bao giờ ao ước có một chiếc ô tô bay trên bầu trời chưa? Chắc hẳn nhiều người từng thấy phương tiện này trong truyện tranh hay phim viễn tưởng. Thực ra, dự án phát triển ô tô bay 'Sky car' đang được tiến hành rầm rộ khắp nơi trên thế giới.\n\nMột công ty khởi nghiệp ở Mỹ vào năm 2012 đã giới thiệu mẫu Sky car khi giương cánh thì biến thành máy bay, còn khi gập cánh lại có thể chạy trên làn đường ô tô bình thường. Tuy nhiên khi cất cánh cần đường băng dài khoảng 760 mét. Mức giá khoảng 23 triệu Yên nhưng đã có hơn 100 người đặt trước.\n\nGần đây hơn, các mẫu ô tô bay cất hạ cánh thẳng đứng (eVTOL) không cần đường băng như trực thăng đang được hoàn thiện. Khi được đưa vào thương mại hóa, con người có thể tránh được nạn tắc đường, di chuyển giữa các thành phố với tốc độ cao, đồng thời việc đi lại tới các hải đảo và vùng núi hẻo lánh sẽ thuận tiện vượt bậc.",
                "imageUrl": "/media/reading/reading_n4_l47_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 2012年に発表されたスカイカーは、渋滞した道路からその場ですぐ垂直に空へ飛び立つことができた。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "2012年のスカイカーは離陸に約760mの滑走路が必要でした。(✕)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) スカイカーが実用化されると、交通渋滞を避けて素早く移動できるようになる。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "空を飛ぶことで地上の渋滞に関係なく移動できます。(〇)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "ほんとうにあるのは？",
                "content": "未来の便利グッズあれこれ：\n\n1. 《元気になるズボン（歩行アシストスーツ）》\n高齢者や足の不自由な人が履くと、モーターの力で足が軽くなり、楽に歩けるようになるスーツ。→【実在する】\n\n2. 《目薬コンタクトレンズ》\n朝、目薬を1滴さすだけで一日中視力が回復し、夜目を洗えば元に戻る薬。→【実在しない・研究中】\n\n3. 《クレジットカードになる腕時計（スマートウォッチ）》\n時計を改札やレジの機械にかざすだけで支払いができる。→【実在する】\n\n4. 《折り畳み式の橋（緊急架橋車）》\n地震や台風で橋が流されたとき、わずか10分で伸びて川に架けられる頑丈な橋。→【実在する】",
                "translation": "Những phát minh tiện ích thú vị:\n\n1. 'Quần tiếp thêm sinh lực' (Bộ đồ hỗ trợ vận động): Người già hoặc người khó khăn đi lại khi mặc vào, động cơ hỗ trợ nâng đỡ chân bước đi nhẹ nhàng thoăn thoắt. -> [Có thật]\n2. 'Thuốc nhỏ mắt kính áp tròng': Sáng nhỏ 1 giọt là mắt sáng cả ngày, tối rửa mắt là hết. -> [Chưa có thật / Đang nghiên cứu]\n3. 'Đồng hồ thanh toán thông minh': Chỉ cần đưa cổ tay chạm vào máy là thanh toán xong vé tàu hay hóa đơn mua sắm. -> [Có thật]\n4. 'Cầu gấp thông minh': Khi cầu bị sập do bão lũ động đất, xe chuyên dụng chỉ mất 10 phút là có thể bắc xong cây cầu kiên cố vượt sông. -> [Có thật]",
                "imageUrl": "/media/reading/reading_n4_l47_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 紹介されている発明の中で、災害時に川に架けて使える折り畳み式の橋は実在しますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "地震や水害時の緊急救援用として折り畳み式の橋は実在します。(〇)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "実在する", "correct": True, "sortOrder": 1},
                            {"content": "実在しない（架空のもの）", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 48 (Book p.80-83, PDF p.98-101)
    # =========================================================================
    dataset.append({
        "lessonNumber": 48,
        "items": [
            {
                "title": "竹取物語",
                "content": "昔、ある所におじいさんとおばあさんが住んでいました。おじいさんは山から竹を取ってきて、いろいろな物を作って売っていました。\n\nある日、おじいさんは根元が光り輝く不思議な竹を見つけました。切ってみると、中に三寸（約9センチ）ほどの小さな可愛い女の子がいました。子どものいない二人は大喜びで、その子に「かぐや姫」と名付けて大切に育てました。かぐや姫はわずか3か月で美しい娘に成長しました。\n\nかぐや姫の美しさは国中に知れ渡り、5人の貴公子が結婚を申し込みました。しかし、かぐや姫は「インドにある仏の石の鉢」「蓬莱の玉の枝」「火鼠の皮衣」「竜の首の珠」「燕の子安貝」という手に入らない宝物を持ってくるように頼みました。5人は誰も本物を持ってくることができませんでした。\n\nやがて帝（天皇）もかぐや姫に心を寄せましたが、かぐや姫は求婚を断りました。そして8月十五夜の満月の夜、月の使者が雲に乗って迎えに来ました。かぐや姫は帝に不死の薬と手紙を残し、羽衣を着て月の世界へ帰っていきました。",
                "translation": "Ngày xửa ngày xưa, ở một ngôi làng nọ có hai ông bà lão nghèo sống nương tựa vào nhau. Hàng ngày ông lão lên núi đốn tre đem về đan lát bán kiếm sống.\n\nMột ngày nọ, ông lão bắt gặp một thân tre phát ra ánh sáng lung linh kỳ ảo. Khi chặt tre ra, ông kinh ngạc thấy một bé gái tí hon xinh xắn chỉ cao khoảng 9 cm nằm bên trong. Hai ông bà lão hiếm muộn vô cùng sung sướng nhận nuôi bé, đặt tên là 'Kaguya-hime' (Nàng tiên tre). Chỉ sau 3 tháng, bé gái đã lớn bổng thành một thiếu nữ tuyệt sắc giai nhân.\n\nSắc đẹp của nàng vang danh khắp cả nước. 5 vị công tử quý tộc danh giá đến cầu hôn. Nàng đưa ra thử thách yêu cầu họ tìm những bảo vật hiếm có không thể tìm thấy trên trần gian như 'Bát đá của Đức Phật ở Ấn Độ', 'Cành cây ngọc trên núi Bồng Lai', 'Áo lông chuột lửa', 'Ngọc trên cổ rồng', 'Vỏ sò sinh nở của chim nhạn'. Kết quả không ai đem về được bảo vật thật.\n\nNgay cả Nhật hoàng sau đó đem lòng si mê cầu hôn nhưng nàng cũng từ chối. Vào đêm rằm tháng 8 trăng sáng vằng vặc, những sứ giả cung trăng cưỡi mây hạ phàm đón nàng. Nàng để lại cho Nhật hoàng viên thuốc trường sinh bất tử và phong thư từ biệt, rồi khoác áo lông vũ bay về cung trăng.",
                "imageUrl": "/media/reading/reading_n4_l48_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) おじいさんは光る竹の中からかぐや姫を見つけた。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "光る竹を切ったところ、中に小さな女の子（かぐや姫）がいました。(〇)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) かぐや姫に結婚を申し込んだ5人の貴公子は、みんな本物の宝物を持ってくることができた。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "5人は偽物を作ったり途中で諦めたりして、誰も本物を持ってこられませんでした。(✕)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) かぐや姫は満月の晩にどこへ帰っていきましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "かぐや姫は月の世界から来た者であり、月の世界へ帰っていきました。",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "月の世界", "correct": True, "sortOrder": 1},
                            {"content": "海の底の竜宮城", "correct": False, "sortOrder": 2},
                            {"content": "遠い外国", "correct": False, "sortOrder": 3},
                            {"content": "高い山の頂上", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 49 (Book p.84-87, PDF p.102-105)
    # =========================================================================
    dataset.append({
        "lessonNumber": 49,
        "items": [
            {
                "title": "人生",
                "content": "【披露宴でのスピーチ（1993年）】\n「新郎の宝田太郎君と新婦の花子さんのご結婚を祝福いたします。太郎君は京都大学を卒業後、アップル銀行に入行され、アメリカ留学も経験された優秀な青年です。花子さんはニューヨーク生まれで、パリやロンドンでデザインを学ばれました。お二人の輝かしい門出をお祝い申し上げます。」\n\n【金婚式でのスピーチ（2043年）】\n「結婚50周年、おめでとうございます！ 50年という長い歳月、山あり谷あり、様々なことがあったことでしょう。喧嘩をすることもあったでしょうが、いつも手を携えて仲睦まじく歩んでこられました。これからもお二人でお元気で、ダイヤモンド婚式を目指してください。」\n\n【お別れ会でのスピーチ（2060年）】\n「宝田太郎さん、90歳で天寿を全うされました。愛する花子さんと共に歩まれた人生は、本当に豊かで実り多きものでした。去年先に旅立たれた奥様と、今頃天国で再会されていることでしょう。どうぞ安らかにお眠りください。」",
                "translation": "[Lời chúc mừng tại tiệc cưới (Năm 1993)]\n'Chúc mừng đám cưới chú rể Tairada Taro và cô dâu Hanako. Anh Taro tốt nghiệp Đại học Kyoto, công tác tại Ngân hàng Apple và từng du học tại Mỹ. Chị Hanako sinh ra tại New York, từng theo học thiết kế tại Paris và London. Xin chúc cho chặng đường mới của hai bạn tràn ngập hạnh phúc.'\n\n[Lời chúc mừng đám cưới vàng (Năm 2043)]\n'Chúc mừng kỷ niệm 50 năm ngày cưới của anh chị! Tròn nửa thế kỷ cùng đi bên nhau, chắc hẳn đã trải qua bao thăng trầm và kỷ niệm sâu sắc. Dù đôi khi có bất đồng, anh chị vẫn luôn nắm chặt tay nhau vượt qua. Chúc hai bác sống vui khỏe hướng tới kỷ niệm đám cưới kim cương.'\n\n[Lời tưởng niệm tại tang lễ (Năm 2060)]\n'Ông Tairada Taro đã hưởng thọ 90 tuổi viên mãn. Cuộc đời gắn bó cùng người vợ dấu yêu Hanako thực sự tràn ngập niềm vui và ý nghĩa. Giờ này chắc ông đã được gặp lại người bạn đời đã khuất bóng vào năm ngoái ở chốn thiên đường. Cầu mong linh hồn ông yên nghỉ thanh thản.'",
                "imageUrl": "/media/reading/reading_n4_l49_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 太郎と花子は結婚して50周年（金婚式）を迎えることができた。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "結婚50周年のスピーチが行われています。(〇)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 太郎さんは90歳で亡くなったとき、妻の花子さんはまだ生きていた。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "「去年先に旅立たれた奥様」とあり、花子さんのほうが先に亡くなっています。(✕)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "あいさつ状",
                "content": "日本の手紙やはがきでよく使われる季節のあいさつ状：\n\n1. 《年賀状（お正月）》\n「明けましておめでとうございます。今年もよろしくお願いいたします。」\n\n2. 《結婚祝い・招待状の返信》\n「ご結婚おめでとうございます。喜んで出席させていただきます。」\n\n3. 《暑中見舞い（夏）》\n「暑中お見舞い申し上げます。暑さ厳しき折、皆様いかがお過ごしでしょうか。どうぞお体に気をつけてお過ごしください。」\n\n4. 《秋のあいさつ》\n「紅葉が美しい季節になりました。皆様いかがお過ごしでしょうか。」",
                "translation": "Các mẫu thiệp chào hỏi theo mùa phổ biến ở Nhật Bản:\n\n1. Thiệp chúc mừng năm mới (Nengajo): 'Chúc mừng năm mới. Năm nay cũng xin được giúp đỡ.'\n2. Hồi âm thiệp mời cưới: 'Chúc mừng hạnh phúc hai bạn. Tôi rất vui lòng và vinh dự được tham dự.'\n3. Thăm hỏi mùa hè oi bức (Shochu-mimai): 'Kính chúc quý bạn an lành giữa mùa hè oi ả. Xin hãy giữ gìn sức khỏe.'\n4. Lời chúc mùa thu lá đỏ: 'Mùa lá đỏ Momiji đã về tuyệt đẹp. Chúc quý bạn vạn sự như ý.'",
                "imageUrl": "/media/reading/reading_n4_l49_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 夏の暑い時期に相手の健康を気遣って送るあいさつ状はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "夏のあいさつ状は「暑中見舞い（しょちゅうみまい）」です。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "暑中お見舞い", "correct": True, "sortOrder": 1},
                            {"content": "年賀状", "correct": False, "sortOrder": 2},
                            {"content": "結婚招待状", "correct": False, "sortOrder": 3},
                            {"content": "寒中見舞い", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 50 (Book p.88-91, PDF p.106-109)
    # =========================================================================
    dataset.append({
        "lessonNumber": 50,
        "items": [
            {
                "title": "紫式部に聞く",
                "content": "「タイム・マシン」のインタビュー番組。きょうのゲストは世界最古の長編小説『源氏物語』の作者、紫式部さんです。\n\n――紫式部さん、1000年以上経った今も『源氏物語』が世界中で読まれていることをご存じでしたか。\n紫式部：「いいえ、夢にも思いませんでした。今の人気に本当にびっくりしております。マンガや映画、ミュージカルにもなっているそうですね。」\n\n――ええ、英語やフランス語、チェコ語、タイ語など世界中の言語に翻訳されていますよ。\n紫式部：「それはとても光栄で嬉しいですね。でも、現代の日本人はマンガは読むけれど、本そのものをあまり読まなくなっていると聞いて、少し残念です。」\n\n――紫式部さんのプライベートについても教えていただけますか。\n紫式部：「20代の終わりに藤原宣孝と結婚し、娘が一人生まれました。しかし夫は数年で病気で亡くなってしまいました。悲しみを紛らわせるために物語を書き始めたのが『源氏物語』の始まりです。その後、一条天皇の中宮彰子様にお仕えする宮中の女房として仕えました。」",
                "translation": "Chương trình phỏng vấn 'Cỗ máy thời gian'. Vị khách mời đặc biệt hôm nay là tác giả cuốn tiểu thuyết trường thiên lâu đời nhất thế giới 'Truyện Genji' - Nữ sĩ Murasaki Shikibu.\n\n- Thưa nữ sĩ, bà có biết rằng sau hơn 1000 năm cuốn 'Truyện Genji' vẫn được độc giả khắp thế giới say mê đọc không ạ?\nMurasaki Shikibu: 'Không, trong mơ tôi cũng chưa từng nghĩ tới. Tôi thực sự ngỡ ngàng trước sự yêu mến của thời hiện đại. Nghe nói tác phẩm còn được chuyển thể thành truyện tranh manga, phim ảnh và nhạc kịch nữa nhỉ.'\n\n- Vâng, tác phẩm đã được dịch ra tiếng Anh, Pháp, Séc, Thái Lan và rất nhiều thứ tiếng trên thế giới đấy ạ.\nMurasaki Shikibu: 'Đó thực sự là niềm vinh dự lớn. Nhưng tôi nghe nói người Nhật thời nay chăm đọc manga nhưng lại lười đọc sách văn học hơn, điều đó khiến tôi có phần hơi tiếc nuối.'\n\n- Bà có thể chia sẻ đôi nét về đời sống riêng tư được không ạ?\nMurasaki Shikibu: 'Vào cuối độ tuổi đôi mươi tôi kết hôn với ngài Fujiwara Nobutaka và sinh một con gái. Nhưng chỉ vài năm sau phu quân tôi chẳng may qua đời vì bạo bệnh. Để vơi đi nỗi cô đơn tang tóc, tôi bắt đầu cầm bút viết truyện, đó chính là khởi nguồn của Truyện Genji. Về sau tôi vào cung hầu cận Hoàng hậu Shoshi.'",
                "imageUrl": "/media/reading/reading_n4_l50_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 紫式部は『源氏物語』を書いたとき、1000年後も世界中で読まれると思っていた。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "「いいえ、夢にも思いませんでした。びっくりしております」と答えています。(✕)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 『源氏物語』を書き始めたきっかけは何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "夫を亡くした悲しみを紛らわせるために書き始めました。",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "夫を亡くした悲しみを紛らわせるため", "correct": True, "sortOrder": 1},
                            {"content": "天皇から命令されたから", "correct": False, "sortOrder": 2},
                            {"content": "お金持ちになりたかったから", "correct": False, "sortOrder": 3},
                            {"content": "海外へ旅行に行きたかったから", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) 『源氏物語』は現代では世界各国の言語に翻訳されている。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "英語、フランス語、タイ語など多くの言語に翻訳されています。(〇)",
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
                "title": "お会いできて、うれしいです",
                "content": "20世紀から現代にかけて人類に大きな影響を与えた偉人たち：\n\n1. 《アルフレッド・ノーベル（スウェーデン）》\nダイナマイトを発明したが、戦争で多くの人が命を落としたことに心を痛め、遺産を平和や科学の発展に尽くした人々に贈る「ノーベル賞」を創設した。\n\n2. 《パブロ・ピカソ（スペイン）》\n20世紀を代表する画家。スペイン内戦の悲劇と平和への祈りを込めて大作『ゲルニカ』を描いた。\n\n3. 《オードリー・ヘプバーン（ベルギー／イギリス）》\n『ローマの休日』などで世界中を魅了した女優。晩年はユニセフ親善大使として世界中の恵まれない子どもたちの支援に生涯を捧げた。\n\n4. 《マザー・テレサ（北マケドニア／インド）》\nインドのコルカタで貧しい人や病気の人々の救済に生涯を捧げ、ノーベル平和賞を受賞した修道女。",
                "translation": "Những vĩ nhân thế kỷ 20 để lại dấu ấn sâu sắc cho nhân loại:\n\n1. Alfred Nobel (Thụy Điển): Người phát minh ra thuốc nổ Dynamite, nhưng xót xa trước việc nó bị dùng trong chiến tranh, ông đã để lại toàn bộ tài sản thành lập giải thưởng Nobel vinh danh các cống hiến cho hòa bình và khoa học.\n2. Pablo Picasso (Tây Ban Nha): Danh họa thế kỷ 20, đã vẽ kiệt tác 'Guernica' phản đối chiến tranh và nguyện cầu cho hòa bình thế giới.\n3. Audrey Hepburn: Huyền thoại điện ảnh với tác phẩm 'Kỳ nghỉ ở La Mã', những năm tháng cuối đời đã cống hiến hết mình cho sứ mệnh Đại sứ Thiện chí UNICEF giúp đỡ trẻ em nghèo toàn cầu.\n4. Mẹ Teresa: Nữ tu sĩ cống hiến trọn cuộc đời cứu giúp những người nghèo khổ, bệnh tật cùng cực tại Kolkata (Ấn Độ), được trao giải Nobel Hòa bình.",
                "imageUrl": "/media/reading/reading_n4_l50_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) ダイナマイトを発明し、遺産でノーベル賞を創設したのはだれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "アルフレッド・ノーベルです。",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "アルフレッド・ノーベル", "correct": True, "sortOrder": 1},
                            {"content": "パブロ・ピカソ", "correct": False, "sortOrder": 2},
                            {"content": "オードリー・ヘプバーン", "correct": False, "sortOrder": 3},
                            {"content": "マザー・テレサ", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    return dataset

if __name__ == "__main__":
    data = get_part5_data()
    print(f"Loaded Part 5: {len(data)} lessons, {sum(len(d['items']) for d in data)} reading items.")
