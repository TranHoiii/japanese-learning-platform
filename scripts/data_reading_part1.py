import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Build the complete N4 Reading dataset for Lessons 26-50 (44 reading contents)
# Strictly following existing N5 Reading schema:
# [
#   {
#     "lessonNumber": 26,
#     "items": [
#       {
#         "title": "...",
#         "content": "...",
#         "translation": null,
#         "imageUrl": "/media/reading/reading_n4_l26_r01.png",
#         "sortOrder": 1,
#         "questions": [
#           {
#             "question": "...",
#             "questionType": "MULTIPLE_CHOICE",
#             "explanation": "...",
#             "imageUrl": null,
#             "sortOrder": 1,
#             "options": [
#               {"content": "...", "correct": true, "sortOrder": 1}
#             ]
#           }
#         ]
#       }
#     ]
#   }
# ]

def get_n4_reading_data():
    dataset = []

    # =========================================================================
    # LESSON 26 (p.22-25, Book p.4-7)
    # =========================================================================
    dataset.append({
        "lessonNumber": 26,
        "items": [
            {
                "title": "宇宙ステーションの生活はどうですか",
                "content": "――宇宙ステーションはどこにあるんですか。\n地球から400キロ上を飛んでいます。\n――えっ？ ステーションが飛んでいるんですか。\nはい。90分で1回地球を回っています。1日に16回朝と夜が来るんですよ。\n――じゃ、寝る時間や起きる時間はどうやってわかるんですか。\nグリニッジ標準時を使っています。\n――どうして宇宙ステーションの中ではいつも「泳いで」いるんですか。\n宇宙は重力がありませんから、歩くことができないんです。\n――いつも宇宙服を着ているんですか。\nいいえ。宇宙服はステーションの外に出て仕事をするとき、着ます。ステーションの中は普通の服を着ています。\n――服は洗濯するんですか。\nいいえ。宇宙では水が大切ですから、洗濯しません。4、5日着て、捨てます。\n――水も地球から運んでいるんですか。\nはい。でも、水は重いですから、たくさん運ぶことができません。ですから、わたしたちのおしっこから水を作っています。飲むこともできるんですよ。\n――リサイクルですね。じゃ、おふろは？\nありません。もちろんシャワーもありません。代わりに体をふきます。\n――雑誌で読んだんですが、宇宙で生活すると、背が高くなるんですか。\nええ、宇宙では、1～7センチ高くなります。しかし、地球へ帰ったら、まえと同じになります。\n――10年宇宙にいたら、どうなるんですか。\nまだ、わかりません。今、研究しています。\n（参考：JAXA 宇宙航空研究開発機構HP）",
                "translation": "Cuộc sống ở trạm vũ trụ như thế nào?\n- Trạm vũ trụ ở đâu vậy?\nNó đang bay ở độ cao 400 km trên Trái Đất.\n- Hả? Trạm vũ trụ đang bay sao?\nVâng. Cứ 90 phút lại quay quanh Trái Đất 1 vòng. Một ngày có tới 16 lần buổi sáng và buổi tối đấy.\n- Vậy làm sao biết được giờ ngủ hay giờ thức?\nChúng tôi sử dụng giờ chuẩn Greenwich.\n- Tại sao trong trạm vũ trụ mọi người lúc nào cũng 'bơi' vậy?\nVì ngoài vũ trụ không có trọng lực, nên không thể đi bộ được.\n- Mọi người lúc nào cũng mặc bộ đồ du hành vũ trụ à?\nKhông. Bộ đồ vũ trụ chỉ mặc khi ra ngoài trạm làm việc. Ở trong trạm thì mặc quần áo bình thường.\n- Quần áo có giặt không?\nKhông. Ngoài vũ trụ nước rất quý nên không giặt. Mặc 4-5 ngày rồi vứt đi.\n- Nước cũng được chở từ Trái Đất lên à?\nVâng. Nhưng nước nặng nên không thể chở nhiều được. Vì vậy chúng tôi tái chế nước từ nước tiểu. Nước đó uống được đấy.\n- Tái chế nhỉ! Vậy còn tắm rửa thì sao?\nKhông có bồn tắm. Đương nhiên vòi hoa sen cũng không có. Thay vào đó, chúng tôi lau người.\n- Tôi đọc tạp chí thấy bảo sống ngoài vũ trụ thì chiều cao tăng lên đúng không?\nVâng, ngoài vũ trụ sẽ cao thêm 1-7 cm. Nhưng khi về Trái Đất thì sẽ trở lại như cũ.\n- Nếu ở ngoài vũ trụ 10 năm thì sẽ thế nào?\nVẫn chưa biết được. Hiện tại các nhà khoa học đang nghiên cứu.",
                "imageUrl": "/media/reading/reading_n4_l26_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 宇宙では暗くなったら寝て、明るくなったら起きる。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "90分で1回地球を回り、1日に16回朝と夜が来るため、グリニッジ標準時を使って時間を決めています。(✕)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) ステーションではおふろに入ったり、洗濯したりすることができない。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "おふろもシャワーもなく代わりに体をふき、水が大切なので洗濯もしません。(〇)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) ステーションで使う水は全部地球から運んでいる。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "水は重くてたくさん運べないため、おしっこから水を作ってリサイクルしています。(✕)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "4) 宇宙から帰ると、背が高くなる。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "宇宙では1～7センチ高くなりますが、地球へ帰ったらまえと同じになります。(✕)",
                        "imageUrl": None,
                        "sortOrder": 4,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "クイズ 宇宙",
                "content": "宇宙についてのクイズです。宇宙での生活や宇宙の知識について考えてみましょう。\n\n1. 地球から宇宙ステーションまでどのくらいかかりますか。\n2. 地球を90分で回る宇宙ステーションは時速何キロで飛んでいますか。\n3. 宇宙ステーションの大きさ（広さ）はどのくらいですか。\n4. コップ1杯の水を宇宙に運びます。いくらかかりますか。\n5. 宇宙服は何キロありますか。\n6. 宇宙ステーションに何人住むことができますか。\n7. 宇宙には空気がありません。空気がなかったら、どうなりますか。\n8. 次の人で、宇宙飛行士はどの人ですか。\n9. 世界で初めて月へ行った人はどこの国の人ですか。",
                "translation": "Câu đố về vũ trụ: Hãy cùng kiểm tra các kiến thức thú vị về cuộc sống và môi trường trong không gian.",
                "imageUrl": "/media/reading/reading_n4_l26_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1. 地球から宇宙ステーションまでどのくらいかかりますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "ロケットに乗って約6時間で国際宇宙ステーションに到着します。(③)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "① 6か月", "correct": False, "sortOrder": 1},
                            {"content": "② 6日", "correct": False, "sortOrder": 2},
                            {"content": "③ 6時間", "correct": True, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2. 地球を90分で回る宇宙ステーションは時速何キロで飛んでいますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "秒速約8km、時速約28,000kmのスピードで地球の周りを回っています。(①)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "① 28,000 km/h", "correct": True, "sortOrder": 1},
                            {"content": "② 2,800 km/h", "correct": False, "sortOrder": 2},
                            {"content": "③ 280 km/h", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "3. 宇宙ステーションの大きさ（広さ）はどのくらいですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "長さ約108m、幅約73mで、ちょうどサッカー場と同じくらいの大きさです。(①)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "① サッカー場ぐらい", "correct": True, "sortOrder": 1},
                            {"content": "② 東京ディズニーランドぐらい", "correct": False, "sortOrder": 2},
                            {"content": "③ ジャンボジェット機ぐらい", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "4. コップ1杯の水を宇宙に運びます。いくらかかりますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "宇宙への輸送費は1kgあたり約100万〜200万円のため、コップ1杯（200ml）で約30〜40万円かかります。(②)",
                        "imageUrl": None,
                        "sortOrder": 4,
                        "options": [
                            {"content": "① 3～4万円", "correct": False, "sortOrder": 1},
                            {"content": "② 30～40万円", "correct": True, "sortOrder": 2},
                            {"content": "③ 300～400万円", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "5. 宇宙服は何キロありますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "宇宙飛行士が船外活動で着る宇宙服は、生命維持装置を含めると約120kgあります。(①)",
                        "imageUrl": None,
                        "sortOrder": 5,
                        "options": [
                            {"content": "① 120 kg", "correct": True, "sortOrder": 1},
                            {"content": "② 12 kg", "correct": False, "sortOrder": 2},
                            {"content": "③ 1,200 kg", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "6. 宇宙ステーションに何人住むことができますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "通常は6人の宇宙飛行士が長期滞在して研究や作業を行っています。(③)",
                        "imageUrl": None,
                        "sortOrder": 6,
                        "options": [
                            {"content": "① 100人", "correct": False, "sortOrder": 1},
                            {"content": "② 20人", "correct": False, "sortOrder": 2},
                            {"content": "③ 6人", "correct": True, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "7. 宇宙には空気がありません。空気がなかったら、どうなりますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "空気がないと音の振動が空気を通して伝わらないため、音が聞こえません。(③)",
                        "imageUrl": None,
                        "sortOrder": 7,
                        "options": [
                            {"content": "① 人や物が空中に浮く", "correct": False, "sortOrder": 1},
                            {"content": "② 人の顔が丸くなる", "correct": False, "sortOrder": 2},
                            {"content": "③ 音が聞こえない", "correct": True, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "8. 次の人で、宇宙飛行士はどの人ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "ユーリ・ガガーリンは1961年に世界で初めて宇宙飛行に成功した宇宙飛行士です。(②)",
                        "imageUrl": None,
                        "sortOrder": 8,
                        "options": [
                            {"content": "① ガリレオ", "correct": False, "sortOrder": 1},
                            {"content": "② ガガーリン", "correct": True, "sortOrder": 2},
                            {"content": "③ アインシュタイン", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "9. 世界で初めて月へ行った人はどこの国の人ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "1969年にアポロ11号で月面に降り立ったニール・アームストロング船長（アメリカ）です。(③)",
                        "imageUrl": None,
                        "sortOrder": 9,
                        "options": [
                            {"content": "① ロシア", "correct": False, "sortOrder": 1},
                            {"content": "② ドイツ", "correct": False, "sortOrder": 2},
                            {"content": "③ アメリカ", "correct": True, "sortOrder": 3}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 27 (p.26-27, Book p.8-9)
    # =========================================================================
    dataset.append({
        "lessonNumber": 27,
        "items": [
            {
                "title": "忍者",
                "content": "忍者は昔のスパイだ。忍者は厳しい訓練をしたから、いろいろなことができた。スポーツの選手と同じだ。とても速く歩いたり、走ったりすることができた。高い壁を登ることや長い時間水の中にいることもできた。目や耳がよかったから、遠い所がよく見えた。小さい音でもよく聞こえた。\n映画やマンガでは時々おもしろいまちがいがある。映画やマンガの忍者は水の上を歩いたり、空を飛んだりしている。でも、実際は無理だ。忍者はとても速く動いたり、いろいろな道具を使ったりした。それで、普通の人ができないことができたのだ。\n滋賀県や三重県には昔、忍者が住んでいたうちがある。うちの中にはいろいろおもしろい物がある。部屋の壁の前に立つと、壁が回転して、人が消える。小さい秘密の部屋から隣や下の部屋の中が見られる。忍者が使ったいろいろな道具もある。でも、今、忍者には会えない。残念だ。",
                "translation": "Ninja là điệp viên ngày xưa. Ninja trải qua quá trình huấn luyện vô cùng nghiêm ngặt nên có thể làm được nhiều việc khác nhau, tương tự như các vận động viên thể thao. Họ có thể đi bộ hoặc chạy rất nhanh, có thể leo tường cao và ở dưới nước trong thời gian dài. Mắt và tai rất thính nên nhìn được nơi xa và nghe thấy cả những âm thanh rất nhỏ.\nTrong phim ảnh và truyện tranh thỉnh thoảng có những sự nhầm lẫn thú vị. Ninja trong phim đi trên mặt nước hay bay trên trời. Nhưng thực tế thì không thể làm vậy. Ninja di chuyển cực kỳ nhanh và sử dụng nhiều loại công cụ đặc biệt. Nhờ đó họ làm được những việc mà người bình thường không thể làm được.\nỞ tỉnh Shiga và Mie ngày xưa có những ngôi nhà nơi ninja từng sinh sống. Trong nhà có rất nhiều điều kỳ thú. Đứng trước tường phòng, bức tường xoay tròn và người biến mất. Từ căn phòng bí mật nhỏ có thể nhìn thấy phòng bên cạnh hoặc phòng bên dưới. Ngoài ra còn có nhiều dụng cụ ninja từng sử dụng. Tuy nhiên, ngày nay ta không thể gặp lại ninja được nữa. Thật đáng tiếc.",
                "imageUrl": "/media/reading/reading_n4_l27_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 忍者は昔のスパイだ。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "「忍者は昔のスパイだ」と本文にあります。(〇)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 忍者は水の上を歩いたり、空を飛んだりした。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "映画やマンガの間違いで、実際は無理だと書かれています。(✕)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 忍者は普通の人ができない仕事をした。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "道具や速い動きで、普通の人ができないことができました。(〇)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "4) 忍者は目や耳をよくする訓練をした。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "厳しい訓練をしたため、遠い所が見えたり小さい音が聞こえたりしました。(〇)",
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
    # LESSON 28 (p.28-29, Book p.10-11)
    # =========================================================================
    dataset.append({
        "lessonNumber": 28,
        "items": [
            {
                "title": "昼ごはんはどこで？何を？",
                "content": "昼ごはんについていろいろな人に聞きました。\n\n《中村正さん 会社員》\nたいてい社員食堂で食べています。安いし、それにメニューを見ると、料理のカロリーがわかるんです。実は去年こちらに転勤して、今、一人で住んでいますから、晩ごはんはほとんど外食なんです。ですから、昼ごはんは社員食堂で、栄養やカロリーを考えて、体にいい物を選んで食べています。（焼肉定食 450円 778 kcal）\n\n《岡本洋子さん 主婦》\n昼ごはんはたいてい一人でテレビを見ながら食べています。きょうはきのうの晩ごはんのすき焼きがありましたから、それを食べました。\n今、一週間に一回、ダンス教室に通っています。その日は友達と教室の近くのレストランで食べます。わたしはいつも1,500円の日替わりランチです。ちょっと高いけど、おいしいし、静かだし、サービスもいいし…みんなでおしゃべりしながら食べます。\n\n《チャンさん 日本語学校の学生》\nいつも学校の近くの弁当屋で弁当を買っています。メニューも多いし、あまり高くないし、それにおかずもごはんも温かいですから。味もまあまあです。日本の食べ物はちょっと甘いですが、もう慣れました。教室で友達と食べます。\n\n《山本元太君 小学一年生》\n教室で給食を食べます。みんなでいっしょに大きい声で「いただきます」と言ってから、食べます。先生はいつも「よくかみましょう。嫌いな物も食べましょう」と言います。でも、僕は嫌いなおかずは友達にあげます。給食で、カレーがいちばん好きです。",
                "translation": "Chúng tôi đã hỏi nhiều người về bữa trưa của họ.\n- Anh Nakamura Tadashi (Nhân viên công ty): Thường ăn ở căng tin công ty. Vừa rẻ lại vừa biết được lượng calo. Năm ngoái tôi chuyển công tác tới đây, sống một mình nên bữa tối hầu hết ăn ngoài. Vì vậy bữa trưa tôi ăn ở căng tin để chọn món tốt cho sức khỏe.\n- Chị Okamoto Yoko (Nội trợ): Thường ăn một mình xem tivi, ăn đồ ăn thừa từ tối hôm trước. Mỗi tuần một lần đi học nhảy, hôm đó chị cùng bạn ăn set ăn trưa 1,500 yên ở nhà hàng gần lớp học.\n- Bạn Chan (Học sinh trường tiếng Nhật): Thường mua hộp cơm bento ở cửa hàng gần trường, vừa nhiều món, không quá đắt lại nóng sốt.\n- Bé Yamamoto Genta (Học sinh lớp 1): Ăn bữa trưa học đường (kyushoku) ở lớp cùng các bạn, thích nhất là món cà ri.",
                "imageUrl": "/media/reading/reading_n4_l28_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 中村正さんはどこで、何を食べますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "社員食堂でカロリーを考えて焼肉定食などを食べます。(①)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "① 社員食堂で焼肉定食", "correct": True, "sortOrder": 1},
                            {"content": "② レストランで日替わりランチ", "correct": False, "sortOrder": 2},
                            {"content": "③ 教室で弁当", "correct": False, "sortOrder": 3},
                            {"content": "④ うちですき焼き", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) 岡本洋子さんはダンス教室の日、どこで食べますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "ダンス教室の日は友達と教室の近くのレストランで1,500円の日替わりランチを食べます。(②)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "① 一人でうちで食べる", "correct": False, "sortOrder": 1},
                            {"content": "② 友達とレストランで日替わりランチを食べる", "correct": True, "sortOrder": 2},
                            {"content": "③ 弁当屋で弁当を買って食べる", "correct": False, "sortOrder": 3},
                            {"content": "④ 社員食堂で食べる", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) チャンさんはどこで昼ごはんを食べますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "学校の近くの弁当屋で買って、教室で友達と食べます。(③)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "① 社員食堂", "correct": False, "sortOrder": 1},
                            {"content": "② レストラン", "correct": False, "sortOrder": 2},
                            {"content": "③ 教室で弁当", "correct": True, "sortOrder": 3},
                            {"content": "④ うちでテレビを見ながら", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "4) 山本元太君は給食で何がいちばん好きですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "「給食で、カレーがいちばん好きです」と書かれています。(③)",
                        "imageUrl": None,
                        "sortOrder": 4,
                        "options": [
                            {"content": "① 焼肉定食", "correct": False, "sortOrder": 1},
                            {"content": "② すき焼き", "correct": False, "sortOrder": 2},
                            {"content": "③ カレー", "correct": True, "sortOrder": 3},
                            {"content": "④ 魚", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # LESSON 29 (p.30-31, Book p.12-13)
    # =========================================================================
    dataset.append({
        "lessonNumber": 29,
        "items": [
            {
                "title": "わたしの失敗",
                "content": "《ライトさん》\nわたしは先週友達のうちへ遊びに行きました。大阪駅で来た電車にすぐ乗りました。友達はうちの近くの駅で待っていると言いました。でも、わたしが乗った電車はその駅を通り過ぎてしまいました。それは特急電車でした。京都までどこにも止まりませんでした。わたしはもう一度大阪へ行く電車に乗りました。友達は駅で2時間待っていてくれました。うれしかったです。\n\n《ジョンさん》\n先週日本人のうちにホームステイしました。晩ごはんのあとで、お母さんが「おふろ、どうぞ」と言ってくれました。日本のおふろは初めてでした。バスタブは大きくて、お湯がたくさん入っていました。お湯は少し熱かったです。お湯の中でゆっくり体を洗いました。そして汚れたお湯を全部捨てました。次にお父さんがおふろへ行きました。「あれ？ お湯が入っていない。」お父さんはびっくりしました。日本のおふろは、バスタブの外で体を洗ってから、中に入るんですね。知りませんでした。\n\n《ミゲルさん》\nわたしは水曜日の夜、日本人の友達のうちで、スペイン語を教えています。先週友達が「来月スペインへ旅行に行きますから、もっと勉強したいです」と言いました。わたしは「じゃ、土曜日も来ましょうか」と聞きました。彼は「土曜日はいいです」と言いました。土曜日に友達のうちへ行きました。家の電気は消えていました。ベルを押しましたが、返事がありませんでした。日曜日、彼に電話しました。「きのう、あなたのうちへ行きましたよ。」「『土曜日はいいです』と言ったでしょう？」",
                "translation": "Những thất bại / sự cố đáng nhớ:\n- Anh Wright: Lên nhầm tàu tốc hành Tokkyu đi thẳng tới Kyoto không dừng lại ở ga của bạn mình, khiến bạn phải đợi 2 tiếng.\n- Anh John: Đi homestay tại nhà người Nhật, tắm trong bồn tắm rồi xả hết nước bẩn đi, khiến bố của gia đình chủ ngạc nhiên vì ở Nhật phải tắm rửa sạch sẽ bên ngoài bồn rồi mới vào ngâm nước.\n- Anh Miguel: Dạy tiếng Tây Ban Nha cho bạn người Nhật, nghe bạn bảo 'Thứ Bảy thì được rồi (không cần đâu)' nhưng lại tưởng là đồng ý, nên đến nhà không có ai.",
                "imageUrl": "/media/reading/reading_n4_l29_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) ライトさんは特急電車に乗ってしまった。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "乗った電車が特急で京都まで止まりませんでした。(〇)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "〇", "correct": True, "sortOrder": 1},
                            {"content": "✕", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) ライトさんの友達のうちから近い駅は特急が止まる。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "特急電車はその駅を通り過ぎてしまいました。(✕)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 日本のおふろは、バスタブの中で体をきれいに洗ってお湯を捨てる。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "バスタブの外で体を洗ってから中に入ります。お湯は捨てません。(✕)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "〇", "correct": False, "sortOrder": 1},
                            {"content": "✕", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "4) ミゲルさんは「いいです」の意味をまちがえた。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "友達の「いいです（結構です・要りません）」を「来てもいいです」と勘違いしました。(〇)",
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
    # LESSON 30 (p.32-35, Book p.14-17)
    # =========================================================================
    dataset.append({
        "lessonNumber": 30,
        "items": [
            {
                "title": "日本でいちばん",
                "content": "時計がなかったら、不便ですが、たくさんあっても、大変です。\n広島県福山市の赤繁さんのうちには時を音で知らせる時計が560あります。壁に掛ける時計が310、置き時計が210、そのほかの時計が40です。日本でいちばん時計の音がうるさいうちです。\n560の時計が決まった時間になると、鳴るのです。ほとんど古い時計で、そのままにしておくと、止まってしまいます。毎日ねじを巻かなければなりません。赤繁さんは一日中時計のねじを巻いていますから、右手がいつも痛いと言っています。もし一度に560の時計が全部鳴ったら、耳も痛くなってしまいますね。でも、みんな古い時計ですから、少しずつ違う時間に鳴ります。ですから、赤繁さんの耳は痛くならないのです。\n赤繁さんにちょっと聞きました。\n――どうしてそんなにたくさん時計を集めているんですか。\n30年まえに骨董屋で見つけた時計を修理してから、時計が好きになりました。壊れた時計を直すと、動きますね。それが楽しいんです。今も古い時計を見ると、買ってしまいます。もう離れの4つの部屋がいっぱいで、押し入れにも積んであります。\n――夜はよく寝られますか。時計の音がうるさくないですか。\n好きな時計の音ですから、すぐ慣れましたよ。音楽と同じです。\n――将来、時計の博物館を作りたいと思っていますか。\nええ。でも、今はお金がありませんから、しばらくこのままにしておきます。",
                "translation": "Căn nhà số 1 Nhật Bản:\nỞ thành phố Fukuyama, tỉnh Hiroshima, nhà ông Akashige có 560 chiếc đồng hồ có chuông báo giờ: 310 đồng hồ treo tường, 210 đồng hồ để bàn và 40 loại khác. Đây là ngôi nhà ồn ào tiếng đồng hồ nhất Nhật Bản!\nCứ đến giờ nhất định là đồng hồ lại reo. Đều là đồng hồ cơ cũ nên mỗi ngày ông phải lên dây cót suốt ngày, đến mức tay phải luôn bị đau. Rất may là các đồng hồ reo ở các thời điểm lệch nhau một chút nên tai không bị đau. Ông bắt đầu sưu tầm từ 30 năm trước khi tự tay sửa một chiếc đồng hồ cũ ở tiệm đồ cổ. Ông coi tiếng tích tắc như âm nhạc và mơ ước mở một bảo tàng đồng hồ.",
                "imageUrl": "/media/reading/reading_n4_l30_r01.png",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 赤繁さんはどうして時計を集めているのですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "壊れた時計を修理して動くのが楽しいからです。(②)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "① 時計があると、便利だから。", "correct": False, "sortOrder": 1},
                            {"content": "② 時計の修理が好きだから。", "correct": True, "sortOrder": 2},
                            {"content": "③ 時計の音を聞きながら寝たいから。", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 赤繁さんはどうして手が痛いのですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "一日中560個の時計のねじを巻いているからです。(②)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "① 時計を直すから。", "correct": False, "sortOrder": 1},
                            {"content": "② 時計のねじを巻いているから。", "correct": True, "sortOrder": 2},
                            {"content": "③ 骨董屋からうちまで時計を運ぶから。", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "3) 時計が鳴っても、どうして耳が痛くならないのですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "みんな古い時計で、少しずつ違う時間に鳴るからです。(③)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "① 押し入れに入れてあるから。", "correct": False, "sortOrder": 1},
                            {"content": "② 時計の音は音楽だから。", "correct": False, "sortOrder": 2},
                            {"content": "③ 鳴る時間が同じではないから。", "correct": True, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "伝言メモ",
                "content": "日常でよく使われる伝言メモを読んでみましょう。\n\n1) お帰りなさい。冷蔵庫にケーキとジュースが入れてあります。食べたら、お皿とコップは洗っておいてね。5時ごろ帰ります。\n2) 大阪支店の佐藤さんから電話がありました。出張の予定を知らせておきました。会議の資料はメールで送っておきました。では、お先に失礼します。\n3) きのうは本当にゴメン。僕が悪かった。今晩は早く帰る。\n4) 掃除しました。机の上はそのままにしてあります。今晩の食事はカレーです。サラダは冷蔵庫に入れてあります。それから3時ごろ荷物が届きました。台所に置いてあります。あさっての午後また伺います。\n5) 今晩8時からサッカーの試合が予約してあるから、晩ごはんは要らないよ。それから今晩は彼女と食事するから、絶対にビデオに触らないで。",
                "translation": "Các mẩu giấy ghi nhắn (Memo):\n1) Mẹ nhắn con: có bánh và nước trong tủ lạnh, ăn xong nhớ rửa.\n2) Nhân viên nhắn Trưởng phòng: có điện thoại từ anh Sato chi nhánh Osaka, đã gửi tài liệu qua mail.\n3) Chồng nhắn vợ: xin lỗi vì chuyện hôm qua, tối nay sẽ về sớm.\n4) Người giúp việc nhắn chủ nhà: đã dọn dẹp, nấu cà ri, hàng gửi đến để ở bếp.\n5) Con trai nhắn mẹ: tối nay hẹn hò và xem bóng đá, đừng động vào máy ghi hình.",
                "imageUrl": "/media/reading/reading_n4_l30_r02.png",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) メモ1「お帰りなさい。冷蔵庫にケーキとジュースが...」はだれからだれへ？",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "お母さんから子どもへのメモです。(①)",
                        "imageUrl": None,
                        "sortOrder": 1,
                        "options": [
                            {"content": "① お母さん → 子ども", "correct": True, "sortOrder": 1},
                            {"content": "② 妻 → 夫", "correct": False, "sortOrder": 2},
                            {"content": "③ 社員 → 課長", "correct": False, "sortOrder": 3},
                            {"content": "④ 家政婦 → 家の人", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) メモ2「大阪支店の佐藤さんから電話がありました...」はだれからだれへ？",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "部下（社員）から上司（課長）への業務連絡メモです。(①)",
                        "imageUrl": None,
                        "sortOrder": 2,
                        "options": [
                            {"content": "① 社員 → 課長", "correct": True, "sortOrder": 1},
                            {"content": "② 夫 → 妻", "correct": False, "sortOrder": 2},
                            {"content": "③ 息子 → お母さん", "correct": False, "sortOrder": 3},
                            {"content": "④ 課長 → 社員", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) メモ3「きのうは本当にゴメン。僕が悪かった...」はだれからだれへ？",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "けんかした夫から妻への謝罪メモです。(①)",
                        "imageUrl": None,
                        "sortOrder": 3,
                        "options": [
                            {"content": "① 夫 → 妻", "correct": True, "sortOrder": 1},
                            {"content": "② 子ども → お母さん", "correct": False, "sortOrder": 2},
                            {"content": "③ 社員 → 課長", "correct": False, "sortOrder": 3},
                            {"content": "④ 友達 → 友達", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "4) メモ4「掃除しました。机の上はそのままにしてあります...」はだれからだれへ？",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "家政婦さんから家の人への報告メモです。(①)",
                        "imageUrl": None,
                        "sortOrder": 4,
                        "options": [
                            {"content": "① 家政婦 → 家の人", "correct": True, "sortOrder": 1},
                            {"content": "② お母さん → 子ども", "correct": False, "sortOrder": 2},
                            {"content": "③ 妻 → 夫", "correct": False, "sortOrder": 3},
                            {"content": "④ 娘 → 両親", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "5) メモ5「今晩8時からサッカーの試合が予約してあるから...」はだれからだれへ？",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "息子からお母さんへ宛てたメモです。(①)",
                        "imageUrl": None,
                        "sortOrder": 5,
                        "options": [
                            {"content": "① 息子 → お母さん", "correct": True, "sortOrder": 1},
                            {"content": "② 夫 → 妻", "correct": False, "sortOrder": 2},
                            {"content": "③ 課長 → 社員", "correct": False, "sortOrder": 3},
                            {"content": "④ 兄 → 妹", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    return dataset

print("Loaded module part 1 (Lessons 26-30)")
