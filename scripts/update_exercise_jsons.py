import json
import re

# 1. Update n4-exercise.json
n4_path = 'backend/src/main/resources/data/n4-exercise.json'
with open(n4_path, 'r', encoding='utf-8') as f:
    n4_data = json.load(f)

# Shift sortOrder from 28..56 to 29..57 if needed
first_so = n4_data[0]['sortOrder']
if first_so == 28:
    print(f"Shifting N4 sortOrder by +1 (current start: {first_so})...")
    for ex in n4_data:
        ex['sortOrder'] = ex['sortOrder'] + 1
    with open(n4_path, 'w', encoding='utf-8') as f:
        json.dump(n4_data, f, ensure_ascii=False, indent=2)
    print("N4 data sortOrder shifted: 29..57")
else:
    print(f"N4 data already shifted (current start: {first_so})")

# 2. Update n5-exercise.json
n5_path = 'backend/src/main/resources/data/n5-exercise.json'
with open(n5_path, 'r', encoding='utf-8') as f:
    n5_data = json.load(f)

print(f"Current N5 exercise count: {len(n5_data)}")

# Clean [IMAGE_REQUIRED] tags from questions
for ex in n5_data:
    for q in ex.get('questions', []):
        if '[IMAGE_REQUIRED]' in q['questionText']:
            q['questionText'] = q['questionText'].replace('[IMAGE_REQUIRED] ', '').replace('[IMAGE_REQUIRED]', '').strip()

# Check if review exercise 28 already exists
has_ex28 = any(ex['sortOrder'] == 28 for ex in n5_data)

if not has_ex28:
    ex28 = {
        "sortOrder": 28,
        "title": "総復習 (1課〜25課)",
        "exerciseType": "REVIEW",
        "contentType": "GRAMMAR",
        "lessonNumber": 25,
        "description": "Bài ôn tập tổng hợp toàn bộ kiến thức ngữ pháp, từ vựng, chia thể và mẫu câu trọng tâm từ Bài 1 đến Bài 25 giáo trình Minna no Nihongo Tập 1.",
        "questions": [
            {
                "sortOrder": 1,
                "questionType": "FILL_BLANK",
                "questionText": "1. Viết cách đọc các số đếm, ngày tháng và thời gian sau bằng hiragana:\n例: 1,752 (せんななひゃくごじゅうに)\n1) 93,648 (                                        )\n2) 10月10日 (                                        )\n3) 4月20日 (                                        )\n4) 9 : 50 (                                        )\n5) 4 : 45 (                                        )",
                "explanation": "Đáp án chuẩn Minna no Nihongo (Trang 61):\n1) 93,648: きゅうまんさんぜんろっぴゃくよんじゅうはち\n2) 10月10日: じゅうがつとおか\n3) 4月20日: しがつはつか (ngày 20 đọc đặc biệt là はつか)\n4) 9:50: くじごじゅっぷん (9 giờ đọc là くじ)\n5) 4:45: よじよんじゅうごふん (4 giờ đọc là よじ)",
                "options": [
                    {
                        "optionText": "1) きゅうまんさんぜんろっぴゃくよんじゅうはち / 2) じゅうがつとおか / 3) しがつはつか / 4) くじごじゅっぷん / 5) よじよんじゅうごふん",
                        "isCorrect": True,
                        "sortOrder": 1
                    },
                    {
                        "optionText": "1) きゅうまんさんぜんろっぴゃくよんじゅうはち / 2) じゅうがつじゅうにち / 3) しがつにじゅうにち / 4) きゅうじごじゅっぷん / 5) しじよんじゅうごふん",
                        "isCorrect": False,
                        "sortOrder": 2
                    },
                    {
                        "optionText": "1) きゅうまんさんぜんろくひゃくよんじゅうはち / 2) じゅうがつとおか / 3) しがつにじゅうにち / 4) くじごじゅっぷん / 5) よんじよんじゅうごふん",
                        "isCorrect": False,
                        "sortOrder": 3
                    }
                ]
            },
            {
                "sortOrder": 2,
                "questionType": "FILL_BLANK",
                "questionText": "2. Điền từ để hỏi thích hợp vào trong ngoặc [  ]:\n例: 駅まで [どのくらい] かかりますか。…歩いて15分ぐらいです。\n1) 趣味は [      ] ですか。…釣りです。\n2) 佐藤さんは [      ] 人ですか。…あの赤いセーターを着ている人です。\n3) [      ] ぐらい漢字を覚えましたか。…50ぐらい覚えました。\n4) コーヒーと紅茶と [      ] が好きですか。…コーヒーのほうが好きです。\n5) 課長は [      ] と言いましたか。…あさって名古屋へ出張すると言いました。\n6) タワポンさんの傘は [      ] ですか。…あの青い傘です。\n7) [      ] きのう休みましたか。…熱がありましたから。\n8) このコピー、[      ] 紙のサイズを変えますか。…ここを押してください。\n9) [      ] 転勤しますか。…3月の終わりに転勤します。\n10) 最近の子どもについて [      ] 思いますか。…そうですね。あまり外で遊ばないと思います。",
                "explanation": "Đáp án chuẩn Minna no Nihongo (Trang 61):\n1) 何 (なん) - hỏi sở thích là gì.\n2) どの - hỏi xác định đối tượng trong nhóm người (どの人).\n3) いくつ - hỏi số lượng chữ Hán đã nhớ.\n4) どちら - so sánh giữa 2 đối tượng cà phê và hồng trà.\n5) 何 (なん) - hỏi nội dung lời trích dẫn (〜と言いましたか).\n6) どれ - hỏi chọn vật cụ thể trong nhiều cái ô.\n7) どうして - hỏi nguyên nhân, lý do (vì bị sốt).\n8) どうやって - hỏi cách thức thao tác máy photocopy.\n9) いつ - hỏi thời điểm chuyển công tác.\n10) どう - hỏi quan điểm, suy nghĩ (〜についてどう思いますか).",
                "options": [
                    {
                        "optionText": "1) 何 / 2) どの / 3) いくつ / 4) どちら / 5) 何 / 6) どれ / 7) どうして / 8) どうやって / 9) いつ / 10) どう",
                        "isCorrect": True,
                        "sortOrder": 1
                    },
                    {
                        "optionText": "1) どこ / 2) だれ / 3) いくら / 4) どれ / 5) だれ / 6) どこ / 7) なんで / 8) どうして / 9) なんじ / 10) なに",
                        "isCorrect": False,
                        "sortOrder": 2
                    },
                    {
                        "optionText": "1) なん / 2) どんな / 3) なんまい / 4) なに / 5) どう / 6) どちら / 7) なぜ / 8) なにで / 9) いつ / 10) どんな",
                        "isCorrect": False,
                        "sortOrder": 3
                    }
                ]
            },
            {
                "sortOrder": 3,
                "questionType": "FILL_BLANK",
                "questionText": "3. Điền trợ từ thích hợp vào chỗ trống hoặc điền × nếu không cần trợ từ:\n例: 去年 ( × ) 日本 ( へ ) 来ました。\n1) 会議 (      ) まえに、資料を準備しなければなりません。\n2) 1週間 (      ) 2回プール (      ) 泳ぎ (      ) 行きます。\n3) 先月1週間 (      ) 学校 (      ) 休みました。\n4) バスで東京駅まで行って、東京駅 (      ) 地下鉄 (      ) 乗り換えます。\n5) だれ (      ) 市役所の電話番号を調べてくれましたか。\n6) おなかが痛かったですから、何 (      ) 食べませんでした。\n7) 3年 (      ) まえに、この会社 (      ) 入りました。\n8) ワットさんは大学 (      ) 近く (      ) 住んでいます。\n9) 何メートルぐらい (      ) 泳ぐこと (      ) できますか。\n10) わたしは佐藤さん (      ) すき焼き (      ) 作り方を教えてもらいました。\n11) 富士大学はあの角 (      ) 左 (      ) 曲がると、右 (      ) あります。\n12) 夫はわたし (      ) 料理 (      ) 上手です。\n13) ここ (      ) お金を入れて、金額ボタンを押すと、切符 (      ) 出ます。\n14) 北海道 (      ) 沖縄まで自転車 (      ) 旅行したこと (      ) あります。",
                "explanation": "Đáp án chuẩn Minna no Nihongo (Trang 62):\n1) の (Danh từ + の + まえに)\n2) に, へ (hoặc に), に (tần suất: に; hướng: へ; mục đích: に行きます)\n3) ×, を (khoảng thời gian không cần trợ từ; nghỉ học: 学校を休む)\n4) で, に (nơi đổi tàu: で; phương tiện đổi lên: に)\n5) が (nghi vấn từ làm chủ ngữ đi với が)\n6) も (phủ định hoàn toàn: 何も + V phủ định)\n7) ×, に (khoảng thời gian không trợ từ; vào công ty: 会社に入る)\n8) の, に (cấu trúc vị trí: の 近く に)\n9) ×, が (khoảng cách không trợ từ; khả năng: Vること + ができます)\n10) に, の (nhận từ ai: に; danh từ hóa: の作り方)\n11) を, へ (hoặc に), に (rẽ ở góc: 角を; hướng rẽ: 左へ; vị trí: 右に)\n12) より, が (so sánh hơn: より; năng khiếu: が上手)\n13) に, が (cho tiền vào: ここに; vé xuất ra: 切符が出る)\n14) から, で, が (từ: から; phương tiện: で; kinh nghiệm: Vたこと + があります)",
                "options": [
                    {
                        "optionText": "1) の / 2) に, へ, に / 3) ×, を / 4) で, に / 5) が / 6) も / 7) ×, に / 8) の, に / 9) ×, が / 10) に, の / 11) を, へ, に / 12) より, が / 13) に, が / 14) から, で, が",
                        "isCorrect": True,
                        "sortOrder": 1
                    },
                    {
                        "optionText": "1) に / 2) で, に, を / 3) に, を / 4) に, で / 5) は / 6) を / 7) に, で / 8) で, に / 9) を, は / 10) から, を / 11) で, を, で / 12) ほど, は / 13) で, を / 14) まで, に, は",
                        "isCorrect": False,
                        "sortOrder": 2
                    }
                ]
            },
            {
                "sortOrder": 4,
                "questionType": "FILL_BLANK",
                "questionText": "4. Chia dạng thích hợp của từ trong ngoặc theo ngữ cảnh câu:\n例: ここでたばこを (吸います…吸わ) ないでください。\n1) 時間が (ありません…              ) ら、タクシーで (行きます…              ) ましょう。\n2) ミラーさんはマリアさんに (会います…              ) ことが (ありません…              ) と言いました。\n3) 友達が駅まで迎えに (来ます…              ) くれました。\n4) バスを (降ります…              ) から、20分ぐらい (歩きます…              ) なければなりません。\n5) ミラーさんが (作りました…              ) ケーキは (おいしいです…              ) と思います。\n6) (暇です…              ) とき、本を (読みます…              ) り、絵を (かきます…              ) りします。\n7) すみません、ちょっとそのホッチキスを (借ります…              ) もいいですか。…ええ、どうぞ (使います…              ) ください。\n8) (疲れました…              ) とき、子どもの顔を (見ます…              ) と、(元気です…              ) なります。\n9) 車が (故障します…              ) も、簡単な (故障です…              ) ら、自分で (直します…              ) ことができます。\n10) 両親は年を取って、足が弱く (なります…              ) まえに、いろいろな国を (旅行します…              ) たいと言います。",
                "explanation": "Đáp án chuẩn Minna no Nihongo (Trang 62-63):\n1) なかった, 行き (なかったら / 行きましょう)\n2) 会った, ない (会ったことがない / ないと言いました)\n3) 来て (来てくれました)\n4) 降りて, 歩か (降りてから / 歩かなければなりません)\n5) 作った, おいしい (作ったケーキ / おいしいと思います)\n6) 暇な, 読んだ, かいた (暇なとき / 読んだり、かいたりします)\n7) 借りて, 使って (借りてもいいですか / 使ってください)\n8) 疲れた, 見る, 元気に (疲れたとき / 見ると / 元気になります)\n9) 故障して (hoặc 故障だった), 直す (故障しても / 故障だったら / 直すことができます)\n10) なる, 旅行し (弱くなるまえに / 旅行したいと言います)",
                "options": [
                    {
                        "optionText": "1) なかった, 行き / 2) 会った, ない / 3) 来て / 4) 降りて, 歩か / 5) 作った, おいしい / 6) 暇な, 読んだ, かいた / 7) 借りて, 使って / 8) 疲れた, 見る, 元気に / 9) 故障して, 直す / 10) なる, 旅行し",
                        "isCorrect": True,
                        "sortOrder": 1
                    },
                    {
                        "optionText": "1) ない, 行き / 2) 会う, ありません / 3) 来 / 4) 降りる, 歩く / 5) 作る, おいしい / 6) 暇で, 読む, かく / 7) 借りる, 使う / 8) 疲れて, 見て, 元気で / 9) 故障する, 直した / 10) なって, 旅行する",
                        "isCorrect": False,
                        "sortOrder": 2
                    }
                ]
            },
            {
                "sortOrder": 5,
                "questionType": "MULTIPLE_CHOICE",
                "questionText": "5. Chọn câu đối đáp chào hỏi và giao tiếp tự nhiên, chính xác nhất trong hội thoại:\n例: ありがとうございます。\n… [ どうぞ / どうもすみません / ○どういたしまして ]。\n1) ジュース、もう一杯いかがですか。\n… [ いいえ、まだまだです / けっこうです / どういたしまして ]。\n2) お茶をどうぞ。\n… [ いただきます / ありがとうございました / どういたしまして ]。\n3) ただいま。\n… [ 行っていらっしゃい / 行ってきます / お帰りなさい ]。\n4) どうぞお上がりください。\n… [ いらっしゃい / 失礼します / お帰りなさい ]。\n5) 熱がありますから、これから病院へ行って、帰ります。\n… [ そうですね、お大事に / そうですよ、お元気で / そうですか、お大事に ]。\n6) てんぷら定食1つと刺身定食を2つお願いします。\n… [ かしこまりました / ごちそうさまでした / いただきます ]。\n7) 木村です。どうぞよろしくお願いします。\n… [ どうも、これでお願いします / こちらこそよろしくお願いします / どうぞお元気で ]。\n8) 来月国へ帰ります。いろいろお世話になりました。\n… [ そろそろ失礼します、お大事に / これからお世話になります、久しぶりですね / どうぞお元気で ]。",
                "explanation": "Đáp án chuẩn Minna no Nihongo (Trang 63):\n1) けっこうです (từ chối lịch sự khi được mời thêm đồ uống)\n2) いただきます (nói trước khi nhận và thưởng thức đồ ăn, thức uống được mời)\n3) お帰りなさい (đáp lại lời chào ただいま của người vừa về nhà)\n4) 失礼します (lời chào phép lịch sự của khách khi bước vào nhà người khác)\n5) そうですか、お大事に (thể hiện sự đồng cảm và dặn dò người bệnh giữ gìn sức khỏe)\n6) かしこまりました (lời nhân viên nhà hàng tiếp nhận yêu cầu gọi món của khách)\n7) こちらこそよろしくお願いします (đáp lại lời chào chào hỏi làm quen lần đầu gặp)\n8) どうぞお元気で (lời chúc sức khỏe chia tay khi người khác về nước/rời đi xa)",
                "options": [
                    {
                        "optionText": "1) けっこうです / 2) いただきます / 3) お帰りなさい / 4) 失礼します / 5) そうですか、お大事に / 6) かしこまりました / 7) こちらこそよろしくお願いします / 8) どうぞお元気で",
                        "isCorrect": True,
                        "sortOrder": 1
                    },
                    {
                        "optionText": "1) いいえ、まだまだです / 2) ありがとうございました / 3) 行っていらっしゃい / 4) いらっしゃい / 5) そうですね、お大事に / 6) ごちそうさまでした / 7) どうも、これでお願いします / 8) そろそろ失礼します",
                        "isCorrect": False,
                        "sortOrder": 2
                    },
                    {
                        "optionText": "1) どういたしまして / 2) どういたしまして / 3) 行ってきます / 4) お帰りなさい / 5) そうですよ、お元気で / 6) いただきます / 7) どうぞお元気で / 8) これからお世話になります",
                        "isCorrect": False,
                        "sortOrder": 3
                    }
                ]
            },
            {
                "sortOrder": 6,
                "questionType": "MULTIPLE_CHOICE",
                "questionText": "6. Chọn từ ngữ thích hợp nhất trong ngoặc để hoàn thành câu:\n例: [ 耳 / 鼻 / ○歯 ] が痛いですから、食事ができません。\n1) [ 妻 / 家内 / 奥さん ] はお元気ですか。\n2) 本は棚のいちばん [ 下 / 外 / 中 ] に置いてください。\n3) ここは [ 金額 / 現金 / 物価 ] が安いと思います。\n4) 暑いですから、[ 寒い / 涼しい / 冷たい ] 物を飲みたいです。\n5) 会議で [ 何を / 何か / 何も ] [ 意味 / 意見 / 用事 ] を言いましたか。\n6) 靴を [ 着ます / はきます / かぶります ]。\n7) [ チャンス / サービス / サイズ ] があったら、留学したいです。\n8) 先生は学生の [ 物 / 人 / こと ] を考えていると思います。\n9) [ 地図 / 時刻表 / 保険証 ] で新幹線の時間を調べてください。",
                "explanation": "Đáp án chuẩn Minna no Nihongo (Trang 64):\n1) 奥さん (hỏi thăm vợ của đối phương)\n2) 下 (dưới cùng của kệ sách)\n3) 物価 (vật giá, mức sống)\n4) 冷たい (đồ uống mát lạnh)\n5) 何か, 意見 (đã nêu ý kiến gì chưa)\n6) はきます (xỏ giày, dép, quần)\n7) チャンス (nếu có cơ hội)\n8) こと (nghĩ về học sinh / việc của học sinh)\n9) 時刻表 (bảng giờ tàu chạy)",
                "options": [
                    {
                        "optionText": "1) 奥さん / 2) 下 / 3) 物価 / 4) 冷たい / 5) 何か, 意見 / 6) はきます / 7) チャンス / 8) こと / 9) 時刻表",
                        "isCorrect": True,
                        "sortOrder": 1
                    },
                    {
                        "optionText": "1) 妻 / 2) 外 / 3) 金額 / 4) 涼しい / 5) 何を, 意味 / 6) 着ます / 7) サービス / 8) 物 / 9) 地図",
                        "isCorrect": False,
                        "sortOrder": 2
                    },
                    {
                        "optionText": "1) 家内 / 2) 中 / 3) 現金 / 4) 寒い / 5) 何も, 用事 / 6) かぶります / 7) サイズ / 8) 人 / 9) 保険証",
                        "isCorrect": False,
                        "sortOrder": 3
                    }
                ]
            },
            {
                "sortOrder": 7,
                "questionType": "MULTIPLE_CHOICE",
                "questionText": "7. Chọn phó từ hoặc liên từ thích hợp nhất trong ngoặc để hoàn thành câu:\n例: 日本の夏は [ あまり / ○とても / たくさん ] 暑いです。\n1) 先週 [ 一度も / 初めて / 一度 ] スキーをしました。\n2) 日本語は [ 全部で / 特に / ほかに ] 漢字が難しいと思います。\n3) このケーキは [ とても / そんなに / なかなか ] 甘くないです。\n4) バスが [ ほかに / もうすぐ / なかなか ] 来ませんでした。[ そして / ですから / でも ] タクシーで来ました。\n5) 旅行はとても楽しかったです。[ そして / ですから / でも ] ちょっと疲れました。\n6) コーヒーを2つと紅茶を1つお願いします。[ それから / これから / ですから ] ケーキも2つお願いします。\n7) 本を借りるとき、このカードを持って来てください。… [ ほかに / いろいろ / なかなか ] 何か要りますか。\n8) [ また / まだ / もう ] 昼ごはんを食べましたか。…いいえ、[ また / まだ / もう ] です。[ それから / これから / ですから ] 食べに行きます。\n9) よく、あまり、なかなか テレビを見ますか。…いいえ、[ よく / あまり / なかなか ] 見ません。\n10) [ まだ / もう / まず ] ここにお金を入れて、[ ほかに / 次に / 別々に ] 金額を押してください。",
                "explanation": "Đáp án chuẩn Minna no Nihongo (Trang 64):\n1) 初めて (lần đầu tiên trượt tuyết)\n2) 特に (đặc biệt là chữ Hán khó)\n3) そんなに (không ngọt đến mức như thế - đi với phủ định)\n4) なかなか, ですから (mãi không đến, do đó đi taxi)\n5) でも (nhưng mà - thể hiện sự tương phản nhẹ)\n6) それから (và thêm nữa là gọi thêm bánh)\n7) ほかに (ngoài ra có cần gì nữa không)\n8) もう, まだ, これから (đã ăn cơm chưa / chưa / sắp sửa đi ăn)\n9) よく, あまり (hỏi: có hay xem không / đáp: không hay xem)\n10) まず, 次に (trước hết cho tiền vào, tiếp theo nhấn nút tiền)",
                "options": [
                    {
                        "optionText": "1) 初めて / 2) 特に / 3) そんなに / 4) なかなか, ですから / 5) でも / 6) それから / 7) ほかに / 8) もう, まだ, これから / 9) よく, あまり / 10) まず, 次に",
                        "isCorrect": True,
                        "sortOrder": 1
                    },
                    {
                        "optionText": "1) 一度も / 2) 全部で / 3) とても / 4) もうすぐ, そして / 5) ですから / 6) これから / 7) いろいろ / 8) まだ, もう, それから / 9) なかなか, よく / 10) もう, ほかに",
                        "isCorrect": False,
                        "sortOrder": 2
                    },
                    {
                        "optionText": "1) 一度 / 2) ほかに / 3) なかなか / 4) ほかに, でも / 5) そして / 6) ですから / 7) なかなか / 8) また, また, ですから / 9) あまり, なかなか / 10) まだ, 別々に",
                        "isCorrect": False,
                        "sortOrder": 3
                    }
                ]
            }
        ]
    }
    n5_data.append(ex28)
    print("Added Exercise 28 to n5-exercise.json!")

with open(n5_path, 'w', encoding='utf-8') as f:
    json.dump(n5_data, f, ensure_ascii=False, indent=2)

print(f"Total N5 exercises now: {len(n5_data)}")
