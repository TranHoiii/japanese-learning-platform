import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Complete N4 Grammar Dataset Generator
OUTPUT_JSON = r"d:\japanese-learning-platform\backend\src\main\resources\data\n4-grammar.json"
OUTPUT_SQL = r"d:\japanese-learning-platform\backend\src\main\resources\db\migration\V6__add_n4_grammar.sql"

# Let's define the lessons array
lessons_data = [
    # Lesson 26 (p.2 TOC, p.3-5)
    {
        "lessonNumber": 26,
        "title": "Bài 26",
        "grammars": [
            {
                "pattern": "～んですか",
                "meaning": "Hỏi xác nhận thông tin / Hỏi lý do, nguyên nhân",
                "usage": "Thể thường ～んですか。 (Aな/N だ→な)",
                "explanation": "- Xác nhận lại thông tin với những điều nhìn thấy, nghe thấy…\n- Muốn được cung cấp thêm thông tin (ở đâu, bao giờ, bao nhiêu…)\n- Muốn hỏi lý do hoặc giải thích về việc gì đó.",
                "notes": "Đuôi câu: だ → な",
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "雨が降っているんですか。",
                        "furigana": "あめがふっているんですか。",
                        "translation": "Trời đang mưa à?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "[これは]どこで買ったんですか。",
                        "furigana": "[これは]どこでかったんですか。",
                        "translation": "(Cái này) mua ở đâu vậy?",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "A：「どうして掃除しないんですか。」",
                        "furigana": "A：「どうしてそうじしないんですか。」",
                        "translation": "Tại sao lại không dọn dẹp vậy?",
                        "sortOrder": 3
                    },
                    {
                        "japanese": "B：「時間がないんです。」(không kèm theo から)",
                        "furigana": "B：「じかんがないんです。」",
                        "translation": "Vì không có thời gian.",
                        "sortOrder": 4
                    }
                ]
            },
            {
                "pattern": "～んですが、～Vていただけませんか",
                "meaning": "Đưa ra vấn đề rồi nhờ vả đối phương một cách lịch sự",
                "usage": "Thể thường ～んですが、～Vていただけませんか。 (Aな/N だ→な)",
                "explanation": "Đưa ra vấn đề rồi nhờ vả đối phương. Lịch sự hơn so với Vてください。",
                "notes": "Lịch sự hơn Vてください",
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "わからないんですが、ゆっくり話していただけませんか。",
                        "furigana": "わからないんですが、ゆっくりはなしていただけませんか。",
                        "translation": "Tôi không hiểu nên làm ơn hãy nói chậm lại.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "生け花を習いたいんですが、いい先生を紹介していただけませんか。",
                        "furigana": "いけばなをならいたいんですが、いいせんせいをしょうかいしていただけませんか。",
                        "translation": "Tôi muốn học cắm hoa, làm ơn hãy giới thiệu giáo viên tốt giúp tôi.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～んですが、～Vたらいいですか",
                "meaning": "Đưa ra vấn đề rồi sau đó xin lời khuyên từ đối phương",
                "usage": "Thể thường ＋んですが、Từ nghi vấn + Vたらいいですか。 (Aな/N だ→な)",
                "explanation": "Đưa ra vấn đề rồi sau đó xin lời khuyên từ đối phương.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "コピー機がこしょうなんですが、どこに連絡したらいいですか。",
                        "furigana": "コピーきがこしょうなんですが、どこにれんらくしたらいいですか。",
                        "translation": "Máy photo bị hỏng, tôi nên liên lạc tới đâu thì tốt nhỉ?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "日本人のうちへ行くんですが、どんなお土産を持って行ったらいいですか。",
                        "furigana": "にほんじんのうちへいくんですが、どんなおみやげをもっていったらいいですか。",
                        "translation": "Tôi sẽ đi đến nhà của người Nhật, vậy nên mang theo quà gì thì tốt nhỉ?",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 27 (p.6 TOC, p.7-12)
    {
        "lessonNumber": 27,
        "title": "Bài 27",
        "grammars": [
            {
                "pattern": "～可能形（かのうけい）",
                "meaning": "Thể khả năng (có thể làm ~)",
                "usage": "Nhóm 1: ～iます → ～eます\nNhóm 2: ～ます → ～られます\nNhóm 3: ～します → ～できます, 来ます → 来られます",
                "explanation": "- Cách chia thể khả năng:\n+ Nhóm 1:まちます→まてます, よびます→よべます, かきます→かけます, およぎます→およげます, はなします→はなせます\n+ Nhóm 2: たべます→たべられます, かります→かりられます\n+ Nhóm 3: べんきょうします→べんきょうできます, 来ます(きます)→来られます(こられます)\n- Diễn tả năng lực của chủ thể (có thể làm ~) hoặc khả năng thực hiện hành động trong hoàn cảnh nào đó.\n- Chú ý:\n+ Động từ khả năng biến đổi như động từ nhóm II.\n+ Các động từ không mang tính hành động (あります、います、…) hoặc tự thân đã mang nghĩa khả năng (わかります、できます、…) thì không chia sang thể khả năng.\n+ Trợ từ を → が, còn các trợ từ khác thì giữ nguyên.",
                "notes": "Động từ khả năng đóng vai trò như động từ nhóm II. Trợ từ を đổi thành が.",
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "さくらちゃんはピアノが弾けます。",
                        "furigana": "さくらちゃんはピアノがひけます。",
                        "translation": "Bé Sakura có thể chơi được Piano.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "この銀行でドルが換えられます。",
                        "furigana": "このぎんこうでドルがかえられます。",
                        "translation": "Có thể đổi đô-la ở ngân hàng này.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "見えます・聞こえます",
                "meaning": "Nhìn thấy / Nghe thấy (tự nhiên lọt vào tầm mắt, tai)",
                "usage": "～が見えます。／～が聞こえます。",
                "explanation": "Diễn tả việc có thể nhìn thấy, nghe thấy vì đối tượng lọt vào tầm mắt, vào tai một cách tự nhiên mà không phụ thuộc vào chủ ý của người nói.",
                "notes": "Khác với 見られます (có điều kiện để xem) và 聞けます (có điều kiện để nghe).",
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "ここから富士山が見えます。",
                        "furigana": "ここからふじさんがみえます。",
                        "translation": "Từ đây có thể thấy được núi Phú Sĩ.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "私の声が聞こえますか？",
                        "furigana": "わたしのこえがきこえますか？",
                        "translation": "Có nghe thấy tiếng tôi không thế?",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Nができます",
                "meaning": "~ được hoàn thiện / hoàn thành / xây xong",
                "usage": "Nができます。",
                "explanation": "~ được hoàn thiện/ hoàn thành, được xây dựng xong hoặc làm xong.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "駅の前にコンビニができました。",
                        "furigana": "えきのまえにコンビニができました。",
                        "translation": "Trước nhà ga có cửa hàng tiện lợi được hoàn thành.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "時計の修理はいつできますか。",
                        "furigana": "とけいのしゅうりはいつできますか。",
                        "translation": "Việc sửa đồng hồ khi nào sẽ xong?",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～しか～",
                "meaning": "Chỉ có mỗi… (vế sau đi với phủ định)",
                "usage": "N ＋ しか [～ない]。",
                "explanation": "Chỉ có mỗi… Đứng sau danh từ, lượng từ… Vế sau luôn đi với dạng phủ định mang sắc thái tiếc nuối, không đủ.",
                "notes": "Luôn đi kèm với động từ dạng phủ định",
                "sortOrder": 4,
                "examples": [
                    {
                        "japanese": "水しか飲みません。",
                        "furigana": "みずしかのみません。",
                        "translation": "Tôi chỉ uống nước lọc.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "ひらがなしか読めません。",
                        "furigana": "ひらがなしかよめません。",
                        "translation": "Tôi chỉ có thể đọc được chữ Hiragana.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "N1は～が、N2は～",
                "meaning": "N1 thì… còn N2 thì… (đối sánh)",
                "usage": "N1は～が、N2は～。",
                "explanation": "N1 thì… còn N2 thì… Biểu thị sự đối sánh giữa N1 và N2.",
                "notes": None,
                "sortOrder": 5,
                "examples": [
                    {
                        "japanese": "サッカーはしますが、やきゅうはしません。",
                        "furigana": "サッカーはしますが、やきゅうはしません。",
                        "translation": "Bóng đá thì chơi còn bóng chày thì không chơi.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "ラーメンは好きですが、うどんは好きじゃありません。",
                        "furigana": "ラーメンはすきですが、うどんはすきじゃありません。",
                        "translation": "Ramen thì thích còn udon thì không thích.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 28 (p.13 TOC, p.14-16)
    {
        "lessonNumber": 28,
        "title": "Bài 28",
        "grammars": [
            {
                "pattern": "V１ながら、V2ます",
                "meaning": "Vừa làm V1 vừa làm V2",
                "usage": "V１(bỏ ます) ＋ ながら、V2ます。",
                "explanation": "Hai hành động (thực hiện bởi cùng một chủ thể) diễn ra song song trong thời gian ngắn hoặc dài. V2 là hành động chính.",
                "notes": "Cùng một chủ thể thực hiện cả hai hành động. V2 là hành động chính.",
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "本を読みながら、おふろに入ります。",
                        "furigana": "ほんをよみながら、おふろにはいります。",
                        "translation": "Vừa đọc sách vừa tắm bồn.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "運転しながら、電話をしないでください。",
                        "furigana": "うんてんしながら、でんわをしないでください。",
                        "translation": "Đừng vừa lái xe vừa gọi điện thoại.",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "アルバイトをしながら、大学で勉強します。",
                        "furigana": "アルバイトをしながら、だいがくでべんきょうします。",
                        "translation": "Vừa học đại học vừa làm thêm.",
                        "sortOrder": 3
                    }
                ]
            },
            {
                "pattern": "Vています",
                "meaning": "Thường làm… (thói quen, hành động lặp đi lặp lại)",
                "usage": "Vています。 (Thói quen trong quá khứ: Vていました。)",
                "explanation": "Thường làm… Diễn tả hành động lặp đi lặp lại theo thói quen. Thói quen trong quá khứ dùng Vていました。",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "いつも遅くまで勉強しています。",
                        "furigana": "いつもおそくまでべんきょうしています。",
                        "translation": "Tôi thường học tới muộn.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "毎日、食べてから、新聞を読んでいます。",
                        "furigana": "まいにち、たべてから、しんぶんをよんでいます。",
                        "translation": "Hàng ngày sau khi ăn, tôi thường đọc báo.",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "子どもの時、友達とつりをしていました。",
                        "furigana": "こどものとき、ともだちとつりをしていました。",
                        "translation": "Hồi nhỏ, tôi thường câu cá với bạn bè.",
                        "sortOrder": 3
                    }
                ]
            },
            {
                "pattern": "～し、～し",
                "meaning": "Vừa… lại vừa… / Vì… và vì… nên… (liệt kê lý do)",
                "usage": "Thể thường ＋し、Thể thường ＋し、～。 (Aな/N だ→だし)",
                "explanation": "Liệt kê các nguyên nhân, lý do (từ 2 lý do trở lên) dẫn tới kết quả ở vế sau.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "雨も降っているし、お金もないし、どこへも行きません。",
                        "furigana": "あめもふっているし、おかねもないし、どこへもいきません。",
                        "translation": "Trời vừa mưa lại vừa không có tiền nên chẳng đi đâu cả.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "彼は親切だし、頭もいいし、それにハンサムです。",
                        "furigana": "かれはしんせつだし、あたまもいいし、それにハンサムです。",
                        "translation": "Anh ấy vừa tốt bụng, vừa thông minh, hơn nữa lại còn đẹp trai.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 29 (p.17 TOC, p.18-21)
    {
        "lessonNumber": 29,
        "title": "Bài 29",
        "grammars": [
            {
                "pattern": "自動詞・他動詞",
                "meaning": "Tự động từ và Tha động từ",
                "usage": "Tự động từ: N が V(tự động từ)\nTha động từ: N を V(tha động từ)",
                "explanation": "Tự động từ: Diễn tả chuyển động, trạng thái tự thân của sự vật mà không cần tác nhân trực tiếp, đi với trợ từ が.\nTha động từ: Diễn tả hành động có chủ ý của người/tác nhân tác động lên đối tượng, đi với trợ từ を.\nCác cặp động từ tiêu biểu:\n- ドアが開きます (Cửa mở) / ドアを開けます (Mở cửa)\n- ドアが閉まります (Cửa đóng) / ドアを閉めます (Đóng cửa)\n- 電気がつきます (Đèn sáng) / 電気をつけます (Bật đèn)\n- 電気が消えます (Đèn tắt) / 電気を消します (Tắt đèn)\n- 車が止まります (Xe dừng) / 車を止めます (Dừng xe)",
                "notes": None,
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "ドアが開きます。",
                        "furigana": "ドアがあきます。",
                        "translation": "Cửa mở.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "ドアを開けます。",
                        "furigana": "ドアをあけます。",
                        "translation": "Mở cửa.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "NがVています",
                "meaning": "N đang trong trạng thái V (kết quả của tự động từ)",
                "usage": "N が V(tự động từ)ています。",
                "explanation": "Diễn tả trạng thái của sự vật hiện hữu trước mắt người nói, là kết quả của một hành động đã xảy ra.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "窓が割れています。",
                        "furigana": "まどがわれています。",
                        "translation": "Cửa sổ bị vỡ.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "電気が消えています。",
                        "furigana": "でんきがきえています。",
                        "translation": "Đèn tắt.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "NはVています",
                "meaning": "N thì đang trong trạng thái V (đưa N làm chủ đề)",
                "usage": "N は V(tự động từ)ています。",
                "explanation": "Đưa N lên làm chủ đề của câu để miêu tả trạng thái của N.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "このいすは壊れています。",
                        "furigana": "このいすはこわれています。",
                        "translation": "Cái ghế này bị hỏng rồi.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "袋は破れています。",
                        "furigana": "ふくろはやぶれています。",
                        "translation": "Cái túi bị rách rồi.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Vてしまいます",
                "meaning": "Đã làm xong hết / Lỡ làm mất rồi (tiếc nuối, hối hận)",
                "usage": "Vてしまいます / Vてしまいました",
                "explanation": "(1) Hoàn thành toàn bộ hành động.\n(2) Thể hiện sự tiếc nuối, hối hận về một việc đã lỡ xảy ra ngoài ý muốn.",
                "notes": None,
                "sortOrder": 4,
                "examples": [
                    {
                        "japanese": "この本を全部読んでしまいました。",
                        "furigana": "このほんをぜんぶよんでしまいました。",
                        "translation": "Tôi đã đọc xong hết cuốn sách này rồi.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "パスポートをなくしてしまいました。",
                        "furigana": "パスポートをなくしてしまいました。",
                        "translation": "Tôi lỡ làm mất hộ chiếu rồi.",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "電車にかさを忘れてしまいました。",
                        "furigana": "でんしゃにかさをわすれてしまいました。",
                        "translation": "Tôi lỡ để quên ô trên tàu điện rồi.",
                        "sortOrder": 3
                    }
                ]
            }
        ]
    },

    # Lesson 30 (p.22 TOC, p.23-26)
    {
        "lessonNumber": 30,
        "title": "Bài 30",
        "grammars": [
            {
                "pattern": "N(địa điểm)に～がVてあります",
                "meaning": "Ở địa điểm N có vật ~ đang (được làm sẵn)",
                "usage": "N(địa điểm) に ～ が V(tha động từ)てあります。",
                "explanation": "Diễn tả trạng thái hiện tại của một vật, là kết quả đã phát sinh do một hành động có chủ ý của ai đó. Mẫu câu này sử dụng tha động từ.",
                "notes": "Ở địa điểm N có vật ~ đang ~",
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "壁に絵がかけてあります。",
                        "furigana": "かべにえがかけてあります。",
                        "translation": "Bức tranh được treo trên tường.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "たなの上に人形がかざってあります。",
                        "furigana": "たなのうえににんぎょうがかざってあります。",
                        "translation": "Trên giá có trang trí búp bê.",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "けしゴムに名前が書いてあります。",
                        "furigana": "けしゴムになまえがかいてあります。",
                        "translation": "Trên cục tẩy có ghi tên.",
                        "sortOrder": 3
                    }
                ]
            },
            {
                "pattern": "～はN(địa điểm)にVてあります",
                "meaning": "Vật ~ đang có trạng thái ~ ở địa điểm N",
                "usage": "～ は N(địa điểm) に V(tha động từ)てあります。",
                "explanation": "Mẫu câu này dùng để nhấn mạnh, đưa N lên làm chủ ngữ trong câu.",
                "notes": "Vật ~ đang có trạng thái ~ ở địa điểm N",
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "飲み物は冷蔵庫においてあります。",
                        "furigana": "のみものはれいぞうこにおいてあります。",
                        "translation": "Đồ uống được để trong tủ lạnh.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "予定表は壁にかけてあります。",
                        "furigana": "よていひょうはかべにかけてあります。",
                        "translation": "Thời khoá biểu được treo trên tường.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Vておきます",
                "meaning": "Làm sẵn, làm trước / Giữ nguyên trạng thái",
                "usage": "Vておきます。",
                "explanation": "(1) Làm sẵn, làm trước việc gì đó (để chuẩn bị).\n(2) Làm một hành động cần thiết để chuẩn bị cho lần sử dụng sau.\n(3) Giữ nguyên hoặc duy trì một trạng thái nào đó.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "会議の前に、資料をコピーしておきます。",
                        "furigana": "かいぎのまえに、しりょうをコピーしておきます。",
                        "translation": "Tôi sẽ photo sẵn tài liệu trước cuộc họp.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "食べてから、つくえをきれいにしておいてください。",
                        "furigana": "たべてから、つくえをきれいにしておいてください。",
                        "translation": "Hãy làm sạch bàn sau khi ăn xong.",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "そこに置いておいてください。",
                        "furigana": "そこにおいでおいてください。",
                        "translation": "Hãy để nguyên ở đó.",
                        "sortOrder": 3
                    }
                ]
            },
            {
                "pattern": "まだ～",
                "meaning": "Vẫn đang ~ / Vẫn chưa ~",
                "usage": "まだ Vています／Vていません。",
                "explanation": "まだVています：Vẫn đang làm V.\nまだVていません：Vẫn chưa làm V.",
                "notes": None,
                "sortOrder": 4,
                "examples": [
                    {
                        "japanese": "まだレポートを書いています。",
                        "furigana": "まだレポートをかいています。",
                        "translation": "Tôi vẫn đang viết báo cáo.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "まだ結婚していません。",
                        "furigana": "まだけっこんしていません。",
                        "translation": "Tôi chưa kết hôn.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 31 (p.27 TOC, p.28-32)
    {
        "lessonNumber": 31,
        "title": "Bài 31",
        "grammars": [
            {
                "pattern": "意向形（いこうけい）",
                "meaning": "Thể ý chí (rủ rê, dự định suồng sã)",
                "usage": "Nhóm 1: ～iます → ～ou\nNhóm 2: ～ます → ～よう\nNhóm 3: します → しよう, 来ます(きます) → 来よう(こよう)",
                "explanation": "- Cách chia thể ý định:\n+ Nhóm 1: いきます→いこう, まちます→まとう, よみます→よもう, とります→とろう\n+ Nhóm 2: ねます→ねよう, たべます→たべよう, みます→みよう\n+ Nhóm 3: べんきょうします→べんきょうしよう, もってきます→もってこよう\n- Thể ý định là thể thông thường của thể rủ rê ～ましょう trong văn thân mật.",
                "notes": "Là thể thông thường của ～ましょう",
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "ちょっと休もう。",
                        "furigana": "ちょっとやすもう。",
                        "translation": "Nghỉ một chút nào.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "手伝おうか。",
                        "furigana": "てつだおうか。",
                        "translation": "Tao giúp một tay nhé?",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Vようと思っています",
                "meaning": "Dự định làm V (ý định đã có từ trước)",
                "usage": "V(thể ý chí)と思っています。",
                "explanation": "Bày tỏ ý định làm một việc gì đó của người nói. Ý định này đã được hình thành từ trước và vẫn đang tiếp diễn.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "週末は海に行こうと思っています。",
                        "furigana": "しゅうまつはうみにいこうとおもっています。",
                        "translation": "Cuối tuần tôi định đi biển.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "国へ帰ったら、日本語を教えようと思っています。",
                        "furigana": "くにへかえったら、にほんごをおしえようとおもっています。",
                        "translation": "Sau khi về nước, tôi dự định dạy tiếng Nhật.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Vる／Ｖない＋つもりです",
                "meaning": "Dự định làm V / Dự định không làm V (chắc chắn)",
                "usage": "Vる／Vない ＋ つもりです。",
                "explanation": "Thể hiện ý chí, quyết định chắc chắn làm hoặc không làm việc gì đó.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "来年結婚するつもりです。",
                        "furigana": "らいねんけっこんするつもりです。",
                        "translation": "Sang năm tôi dự định sẽ kết hôn.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "たばこはもう吸わないつもりです。",
                        "furigana": "たばこはもうすわないつもりです。",
                        "translation": "Tôi dự định sẽ không hút thuốc nữa.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Ｖる／Ｎの＋予定です。",
                "meaning": "Theo kế hoạch, dự định là ~",
                "usage": "Vる／Nの ＋ 予定です。",
                "explanation": "Diễn tả kế hoạch, lịch trình đã được định sẵn (do tổ chức, công ty hoặc người khác quyết định, ít phụ thuộc vào ý chí cá nhân).",
                "notes": None,
                "sortOrder": 4,
                "examples": [
                    {
                        "japanese": "出張は1週間の予定です。",
                        "furigana": "しゅっちょうは1しゅうかんのよていです。",
                        "translation": "Chuyến công tác theo dự kiến là 1 tuần.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "明日は会議がある予定です。",
                        "furigana": "あしたはかいぎがあるよていです。",
                        "translation": "Ngày mai theo lịch là có cuộc họp.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 32 (p.33 TOC, p.34-36)
    {
        "lessonNumber": 32,
        "title": "Bài 32",
        "grammars": [
            {
                "pattern": "～ほうがいいです",
                "meaning": "Nên / Không nên làm gì (lời khuyên)",
                "usage": "Vた／Vない ＋ ほうがいいです。",
                "explanation": "Dùng để đưa ra lời khuyên hoặc gợi ý cho đối phương.",
                "notes": None,
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "病気なら、病院へ行ったほうがいいです。",
                        "furigana": "びょうきなら、びょういんへいったほうがいいです。",
                        "translation": "Nếu bị bệnh thì nên tới bệnh viện.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "夜遅く、一人で歩かないほうがいいです。",
                        "furigana": "よるおそく、ひとりであるかないほうがいいです。",
                        "translation": "Đêm muộn thì không nên đi bộ một mình.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～でしょう",
                "meaning": "Có lẽ là ~ / Chắc là ~ (phỏng đoán)",
                "usage": "Thể thường ＋でしょう。 (Aな/N bỏ だ)",
                "explanation": "Dùng để phỏng đoán một sự việc nào đó dựa trên suy nghĩ, quan sát của người nói.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "彼は試合に参加するでしょうか。",
                        "furigana": "かれはしあいにさんかするでしょうか。",
                        "translation": "Anh ấy liệu có tham gia trận đấu không nhỉ?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "明日は雨が降るでしょう。",
                        "furigana": "あしたはあめがふるでしょう。",
                        "translation": "Ngày mai có lẽ trời sẽ mưa.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～かもしれません",
                "meaning": "Có thể là / Có lẽ là ~ (xác suất khoảng 50%)",
                "usage": "Thể thường ＋かもしれません。 (Aな/N bỏ だ)",
                "explanation": "Diễn tả khả năng sự việc có thể xảy ra nhưng không chắc chắn (độ tin cậy thấp hơn でしょう).",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "あの店の料理はあまりおいしくないかもしれません。",
                        "furigana": "あのみせのりょうりはあまりおいしくないかもしれません。",
                        "translation": "Món ăn của quán đó có lẽ không ngon lắm.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "約束の時間に間に合わないかもしれません。",
                        "furigana": "やくそくのじかんにまにあわないかもしれません。",
                        "translation": "Có thể tôi sẽ không kịp giờ hẹn.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 33 (p.37 TOC, p.38-45)
    {
        "lessonNumber": 33,
        "title": "Bài 33",
        "grammars": [
            {
                "pattern": "禁止形・命令形",
                "meaning": "Thể mệnh lệnh (Hãy làm V) / Thể cấm chỉ (Cấm làm V)",
                "usage": "Mệnh lệnh: Nhóm 1: ～iます→～e, Nhóm 2: ～ます→～ろ, Nhóm 3: します→しろ, きます→こい\nCấm chỉ: Động từ thể từ điển (Vる) ＋ な",
                "explanation": "命令形(Thể mệnh lệnh): Hãy làm V.\n禁止形(Thể cấm chỉ): Cấm làm V.\nCả hai thể đều mang sắc thái mạnh, áp đặt, thường sẽ là nam giới (người trên) nói với người dưới, bố nói với con, bạn bè nam giới thân thiết nói với nhau, tình huống khẩn cấp, hiệu lệnh.\nTrong cổ vũ thể thao thì nữ cũng có thể dùng.",
                "notes": None,
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "早く寝ろ。",
                        "furigana": "はやくねろ。",
                        "translation": "Đi ngủ sớm đi!",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "こんばんうちへ来いよ。",
                        "furigana": "こんばんうちへこいよ。",
                        "translation": "Tối nay đến nhà tao đi!",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "負けるな。",
                        "furigana": "まけるな。",
                        "translation": "Không được thua.",
                        "sortOrder": 3
                    }
                ]
            },
            {
                "pattern": "Vますなさい",
                "meaning": "Hãy làm V (mệnh lệnh nhẹ nhàng)",
                "usage": "Vます(bỏ ます) ＋ なさい。",
                "explanation": "Hãy làm V. Đây là mẫu câu mệnh lệnh nhưng có sắc thái nhẹ nhàng hơn so với thể mệnh lệnh, thường dùng khi bố mẹ nói với con cái, giáo viên nói với học sinh.",
                "notes": "Thường dùng bởi bố mẹ nói với con cái, giáo viên nói với học sinh",
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "正しい答えを選びなさい。",
                        "furigana": "ただしいこたえをえらびなさい。",
                        "translation": "Hãy chọn đáp án đúng.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "勉強しなさい。",
                        "furigana": "べんきょうしなさい。",
                        "translation": "Hãy học đi.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～と書いてあります/～と読みます",
                "meaning": "Được viết là ~ / Được đọc là ~",
                "usage": "～と書いてあります / ～と読みます。",
                "explanation": "Dùng khi miêu tả nội dung được viết ở đâu đó hay cách đọc của một từ, ký hiệu, chữ Hán… Dạng câu hỏi: 何と書いてありますか。／何と読みますか。",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "すみません。これは何と読みますか。",
                        "furigana": "すみません。これはなんとよみますか。",
                        "translation": "Xin lỗi, cái này đọc như thế nào vậy?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "「いりぐち」と読みます。",
                        "furigana": "「いりぐち」とよみます。",
                        "translation": "Đọc là 「いりぐち」.",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "あそこに「きんえん」と書いてあります。",
                        "furigana": "あそこに「きんえん」とかいてあります。",
                        "translation": "Đằng kia có viết là “Cấm hút thuốc”.",
                        "sortOrder": 3
                    }
                ]
            },
            {
                "pattern": "AはBという意味です",
                "meaning": "A có nghĩa là B",
                "usage": "AはBという意味です。",
                "explanation": "Dùng để giải thích ý nghĩa của từ/câu/biển báo... Dạng câu hỏi: Aはどういう意味ですか。",
                "notes": None,
                "sortOrder": 4,
                "examples": [
                    {
                        "japanese": "あれはどういう意味ですか。",
                        "furigana": "あれはどういういみですか。",
                        "translation": "Cái kia có nghĩa là gì vậy?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "左へ曲がるなという意味です。",
                        "furigana": "ひだりへまがるなといういみです。",
                        "translation": "Có nghĩa là cấm rẽ trái.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～と言っていました",
                "meaning": "Ai đó nói ~/ nhắn là ~ (truyền đạt lại lời nhắn)",
                "usage": "「Câu」/ Thể thông thườngと言っていました。",
                "explanation": "Dùng khi truyền đạt lại lời nhắn của ai đó (ngôi thứ ba). Dạng câu hỏi: 何と言っていましたか。",
                "notes": None,
                "sortOrder": 5,
                "examples": [
                    {
                        "japanese": "ミラーさんは何と言っていましたか。",
                        "furigana": "ミラーさんはなんといっていましたか。",
                        "translation": "Anh Mira đã nói gì vậy?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "2時に会議室にいると言っていました。",
                        "furigana": "2じにかいぎしつにいるといっていました。",
                        "translation": "(Anh ấy) đã nói là có ở phòng họp lúc 2 giờ.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～と伝えていただけませんか",
                "meaning": "Nhắn lại (cho ai đó) giúp tôi rằng… được không?",
                "usage": "「Câu」/ Thể thông thườngと伝えていただけませんか。",
                "explanation": "Nhờ người khác truyền đạt lại thông tin một cách lịch sự.",
                "notes": None,
                "sortOrder": 6,
                "examples": [
                    {
                        "japanese": "ワンさんにもうすぐ来ると伝えていただけませんか。",
                        "furigana": "ワンさんにもうすぐくるとつたえていただけませんか。",
                        "translation": "Hãy nhắn với anh Wang rằng tôi sắp sửa tới rồi được không?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "リンさんに「レポートを送ってください」と伝えていただけませんか。",
                        "furigana": "リンさんに「レポートをおくってください」とつたえていただけませんか。",
                        "translation": "Làm ơn nhắn với chị Linh là hãy gửi báo cáo giúp tôi có được không?",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 34 (p.46 TOC, p.47-50)
    {
        "lessonNumber": 34,
        "title": "Bài 34",
        "grammars": [
            {
                "pattern": "～とおりに、～",
                "meaning": "Làm theo như ~",
                "usage": "V１た/Nの＋とおりに、V2。",
                "explanation": "Làm V2 theo như động tác V1 hoặc hướng dẫn N. Khi V1 là hành động mang tính dự định, hoặc chưa xảy ra, V1 nói “hãy làm theo đúng như (sẽ) làm”.",
                "notes": None,
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "私が言ったとおりに、やってください。",
                        "furigana": "わたしがいったとおりに、やってください。",
                        "translation": "Hãy làm theo những gì tôi đã nói.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "地図のとおりに、行ってください。",
                        "furigana": "ちずのとおりに、いってください。",
                        "translation": "Hãy đi theo bản đồ.",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "このとおりに、書いてください。",
                        "furigana": "このとおりに、かいてください。",
                        "translation": "Hãy viết đúng thế này.",
                        "sortOrder": 3
                    }
                ]
            },
            {
                "pattern": "～あとで、～",
                "meaning": "Sau khi ~",
                "usage": "V１た/Nの＋あとで、V2。",
                "explanation": "Hành động V2 diễn ra sau hành động V1 hoặc sau sự việc N.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "仕事のあとで、飲みに行きます。",
                        "furigana": "しごとのあとで、のみにいきます。",
                        "translation": "Sau khi làm việc xong, tôi sẽ đi uống nước.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "新しいのを買ったあとで、なくした時計が見つかりました。",
                        "furigana": "あたらしいのをかったあとで、なくしたとけいがみつかりました。",
                        "translation": "Sau khi mua cái mới thì tôi tìm thấy chiếc đồng hồ bị mất.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～て/ないで",
                "meaning": "Làm V2 trong trạng thái V1",
                "usage": "V１て/V１ないで、V2。",
                "explanation": "Làm V2 (hành động chính) trong trạng thái đi kèm V1.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "しょうゆをつけて、食べます。",
                        "furigana": "しょうゆをつけて、たべます。",
                        "translation": "Chấm xì dầu rồi ăn.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "砂糖を入れないで、コーヒーを飲みます。",
                        "furigana": "さとうをいれないで、コーヒーをのみます。",
                        "translation": "Uống cà phê mà không cho đường.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～ないで、～",
                "meaning": "Không làm V1 mà làm V2 (thay thế)",
                "usage": "V１ないで、V2。",
                "explanation": "Không làm hành động V1 mà lại làm hành động V2 (thay thế).",
                "notes": None,
                "sortOrder": 4,
                "examples": [
                    {
                        "japanese": "テレビを見ないで、音楽を聞きました。",
                        "furigana": "テレビをみないで、おんがくをききました。",
                        "translation": "Tôi đã nghe nhạc thay vì xem tivi.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "学校へ行かないで、家で休みました。",
                        "furigana": "がっこうへいかないで、いえでやすみました。",
                        "translation": "Tôi đã nghỉ ở nhà mà không đến trường.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 35 (p.51 TOC, p.52-57)
    {
        "lessonNumber": 35,
        "title": "Bài 35",
        "grammars": [
            {
                "pattern": "条件形 (じょうけんけい)",
                "meaning": "Thể điều kiện (Cách chia)",
                "usage": "Động từ:\n- Nhóm 1: ～iます → ～eば\n- Nhóm 2: ～ます → ～れば\n- Nhóm 3: きます → くれば, します → すれば\nTính từ và Danh từ:\n- Aい ＋ ければ (＊いい → よければ)\n- Aな ＋ なら\n- N ＋ なら\nDạng phủ định:\n- V: Vない ＋ ければ\n- Aい: Aくない ＋ ければ\n- Aな・N: Aな・N ＋ じゃなければ",
                "explanation": "- Động từ: いきます→いけば, まちます→まてば, やすみます→やすめば, よみます→よめば, とります→とれば; ねます→ねれば, たべます→たべれば, かります→かりれば, みます→みれば; もってきます→もってくれば, べんきょうします→べんきょうすれば\n- Tính từ đuôi i: たのしい→たのしければ, おいしい→おいしければ, やすい→やすければ, たかい→たかければ (＊いい→よければ)\n- Tính từ đuôi na & Danh từ: ひま→ひまなら, しずか→しずかなら, げんき→げんきなら; せんせい→せんせいなら, りょこう→りょこうなら\n- Dạng phủ định: いかない→いかなければ, もたない→もたなければ; たのしくない→たのしくなければ; げんきじゃなければ, せんせいじゃなければ",
                "notes": "Bảng tổng hợp quy tắc chia thể điều kiện",
                "sortOrder": 1,
                "examples": []
            },
            {
                "pattern": "条件形（～ば／なら）、～",
                "meaning": "Nếu… thì… (nêu điều kiện)",
                "usage": "Điều kiện (～ば／なら）、Mệnh đề kết quả。",
                "explanation": "Nêu điều kiện cần thiết để sự việc nào đó xảy ra. Vế 1: Chia về thể điều kiện. Vế 2: Sự việc, mệnh đề.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "暑ければ、泳ぎに行きます。",
                        "furigana": "あつければ、およぎにいきます。",
                        "translation": "Nếu trời nóng, tôi sẽ đi bơi.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "薬を飲めば、風邪が治りますよ。",
                        "furigana": "くすりをのめば、かぜがなおりますよ。",
                        "translation": "Nếu uống thuốc thì sẽ khỏi cảm cúm đấy.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～ばいいですか",
                "meaning": "Nên làm thế nào thì được? (xin lời khuyên)",
                "usage": "Từ để hỏi + Vばいいですか。",
                "explanation": "Mong muốn đối phương hướng dẫn, đưa ra lời khuyên để làm việc gì đó. Dùng tương tự mẫu câu 「～たらいいですか。」",
                "notes": "Tương tự ～たらいいですか",
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "道が分からないんですが、どう行けばいいですか。",
                        "furigana": "みちがわからないんですが、どういけばいいですか。",
                        "translation": "Tôi không biết đường thì nên đi thế nào đây?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "父の誕生日に何を買えばいい？",
                        "furigana": "ちちのたんじょうびになにをかえばいい？",
                        "translation": "Tôi nên mua gì vào ngày sinh nhật bố nhỉ?",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Nなら、～",
                "meaning": "Nếu là N thì ~ (đưa ra lời khuyên/thông tin về chủ đề)",
                "usage": "Nなら、～",
                "explanation": "Cung cấp thông tin nào đó liên quan đến N (chủ đề) mà đối phương vừa đề cập đến.",
                "notes": None,
                "sortOrder": 4,
                "examples": [
                    {
                        "japanese": "A: 旅行したいんです、どごへ行けばいいでしょうか。",
                        "furigana": "A: りょこうしたいんです、どこへいけばいいでしょうか。",
                        "translation": "Tôi muốn đi du lịch thì nên đi đâu được nhỉ?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "B: 旅行なら、ハワイがいいですよ。",
                        "furigana": "B: りょこうなら、ハワイがいいですよ。",
                        "translation": "Nếu mà du lịch thì Hawaii được đấy.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 36 (p.58 TOC, p.59-61)
    {
        "lessonNumber": 36,
        "title": "Bài 36",
        "grammars": [
            {
                "pattern": "Vる／Vないように、～",
                "meaning": "Để (có thể/không) ~, thì ~ (chỉ mục đích)",
                "usage": "Vる／Vない ＋ ように、～",
                "explanation": "Chỉ mục đích của hành động ở vế sau. Vế 1 thường là động từ khả năng, tự động từ hoặc thể phủ định.",
                "notes": "Vế 1 là động từ không có ý chí (khả năng, tự động từ, phủ định)",
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "日本語が話せるように、毎日練習します。",
                        "furigana": "にほんごがはなせるように、まいにちれんしゅうします。",
                        "translation": "Để có thể nói tiếng Nhật, tôi luyện tập mỗi ngày.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "風邪を引かないように、気をつけてください。",
                        "furigana": "かぜをひかないように、きをつけてください。",
                        "translation": "Hãy cẩn thận để không bị cảm.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Vるように＋なります",
                "meaning": "Trở nên có thể làm / Đã biết làm ~ (biến đổi trạng thái)",
                "usage": "V(khả năng)るように＋なります / V(khả năng)なくなります",
                "explanation": "Biểu thị sự biến đổi trạng thái từ không thể sang có thể (hoặc ngược lại).",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "日本語の新聞が読めるようになりました。",
                        "furigana": "にほんごのしんぶんがよめるようになりました。",
                        "translation": "Tôi đã có thể đọc được báo tiếng Nhật.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "刺身が食べられるようになりました。",
                        "furigana": "さしみがたべられるようになりました。",
                        "translation": "Tôi đã có thể ăn được món Sashimi.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Vる・Vないように します",
                "meaning": "Cố gắng làm / Cố gắng không làm ~ (thói quen, nỗ lực)",
                "usage": "Vる／Vない ＋ ように します (nhắc nhở: ように してください)",
                "explanation": "Thể hiện sự nỗ lực, cố gắng duy trì một thói quen hoặc hành vi có ý thức.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "毎日野菜を食べるようにしています。",
                        "furigana": "まいにちやさいをたべるようにしています。",
                        "translation": "Hàng ngày tôi cố gắng ăn rau.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "甘いものを食べないようにしています。",
                        "furigana": "あまいものをたべないようにしています。",
                        "translation": "Tôi cố gắng không ăn đồ ngọt.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 37 (p.62 TOC, p.63-67)
    {
        "lessonNumber": 37,
        "title": "Bài 37",
        "grammars": [
            {
                "pattern": "受身形 (うけみけい)",
                "meaning": "Thể bị động (Cách chia)",
                "usage": "Nhóm 1: ～iます → ～aれます (＊～います → ～われます)\nNhóm 2: ～ます → ～られます\nNhóm 3: きます → こられます, します → されます",
                "explanation": "- Nhóm 1: いきます→いかれます, まちます→またれます, よみます→よまれます, とります→とられます\n- Nhóm 2: ねます→ねられます, たべます→たべられます, かります→かりられます, みます→みられます\n- Nhóm 3: 来ます(きます)→来られます(こられます), します→されます, もってきます→もってこられます, べんきょうします→べんきょうされます",
                "notes": "Bảng tổng hợp quy tắc chia thể bị động",
                "sortOrder": 1,
                "examples": []
            },
            {
                "pattern": "N1は N2に V受身形",
                "meaning": "N1 bị/được N2 làm gì (bị động trực tiếp)",
                "usage": "N1(người nhận) は N2(người làm) に V(bị động)。",
                "explanation": "Câu bị động trực tiếp: Người nhận hành động đóng vai trò chủ ngữ.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "私は先生に褒められました。",
                        "furigana": "わたしはせんせいにほめられました。",
                        "translation": "Tôi được thầy giáo khen.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "私は犬にかまれました。",
                        "furigana": "わたしはいぬにかまれました。",
                        "translation": "Tôi bị chó cắn.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "N1はN2にN3をV受身形",
                "meaning": "N1 bị N2 làm gì đối với N3 (bị động gián tiếp / quấy rầy)",
                "usage": "N1 は N2 に N3 を V(bị động)。",
                "explanation": "Bị động gián tiếp: Thường diễn tả việc người nói bị phiền toái, thiệt hại khi ai đó làm gì với đồ vật/thân thể của mình.",
                "notes": "Thể hiện cảm giác bị làm phiền, thiệt hại",
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "弟にパソコンを壊されました。",
                        "furigana": "おとうとにパソコンをこわされました。",
                        "translation": "Tôi bị em trai làm hỏng máy tính.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "泥棒にお金を盗まれました。",
                        "furigana": "どろぼうにおかねをぬすまれました。",
                        "translation": "Tôi bị trộm lấy mất tiền.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Nは／が V受身形",
                "meaning": "Vật N được làm / xây dựng / phát minh (không nêu tác nhân)",
                "usage": "N は／が V(bị động)。",
                "explanation": "Dùng khi miêu tả sự việc, công trình kiến trúc, phát minh mà không cần nhấn mạnh người thực hiện.",
                "notes": None,
                "sortOrder": 4,
                "examples": [
                    {
                        "japanese": "このビルは2000年に建てられました。",
                        "furigana": "このビルは2000ねんにたてられました。",
                        "translation": "Tòa nhà này được xây vào năm 2000.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "電話はベルによって発明されました。",
                        "furigana": "でんわはベルによってはつめいされました。",
                        "translation": "Điện thoại được phát minh bởi Bell.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～から／～でつくられます",
                "meaning": "Được làm từ ~ (vật liệu: で / nguyên liệu: から)",
                "usage": "N で／から つくられます。",
                "explanation": "Dùng で khi vật liệu không bị biến đổi về chất (vẫn nhận ra bằng mắt thường). Dùng から khi nguyên liệu bị biến đổi về chất.",
                "notes": "で: vật liệu (gỗ, sắt...) / から: nguyên liệu (lúa mạch, nho...)",
                "sortOrder": 5,
                "examples": [
                    {
                        "japanese": "この机は木で作られています。",
                        "furigana": "このつくえはきでつくられています。",
                        "translation": "Cái bàn này được làm từ gỗ.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "ビールは麦から作られます。",
                        "furigana": "ビールはむぎからつくられます。",
                        "translation": "Bia được làm từ lúa mạch.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 38 (p.68 TOC, p.69-73)
    {
        "lessonNumber": 38,
        "title": "Bài 38",
        "grammars": [
            {
                "pattern": "VるのはA です",
                "meaning": "Việc làm V thì mang tính chất A",
                "usage": "Vる ＋ のは A です。",
                "explanation": "Danh từ hóa động từ bằng 「の」 để làm chủ ngữ trong câu tính từ miêu tả tính chất (thú vị, vất vả, vui...).",
                "notes": None,
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "テニスをするのは面白いです。",
                        "furigana": "テニスをするのはおもしろいです。",
                        "translation": "Chơi tennis rất thú vị.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "一人で外国へ旅行するのは大変です。",
                        "furigana": "ひとりでがいこくへりょこうするのはたいへんです。",
                        "translation": "Đi du lịch nước ngoài một mình rất vất vả.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "VるのがAです",
                "meaning": "Thích / Ghét / Giỏi / Kém việc làm V",
                "usage": "Vる ＋ のが A(好き/嫌い/上手/下手/速い/遅い) です。",
                "explanation": "Dùng 「のが」 với các tính từ chỉ sở thích, sở ghét, năng lực hoặc tốc độ.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "私は絵を描くのが好きです。",
                        "furigana": "わたしはえをかくのがすきです。",
                        "translation": "Tôi thích vẽ tranh.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "彼は走るのが速いです。",
                        "furigana": "かれははしるのがはやいです。",
                        "translation": "Anh ấy chạy rất nhanh.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Vるのをわすれます",
                "meaning": "Quên làm việc V",
                "usage": "Vる ＋ のを 忘れました。",
                "explanation": "Diễn tả việc quên thực hiện một hành động nào đó.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "薬を飲むのを忘れました。",
                        "furigana": "くすりをのむのをわすれました。",
                        "translation": "Tôi quên uống thuốc rồi.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "かぎをかけるのを忘れました。",
                        "furigana": "かぎをかけるのをわすれました。",
                        "translation": "Tôi quên khóa cửa rồi.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "V(thể thường)のをしっていますか",
                "meaning": "Bạn có biết việc ~ không?",
                "usage": "Thể thường ＋ のを知っていますか。 (Aな/N だ→な)",
                "explanation": "Hỏi xem đối phương có biết thông tin, sự việc nào đó không.",
                "notes": None,
                "sortOrder": 4,
                "examples": [
                    {
                        "japanese": "ミラーさんが結婚したのを知っていますか。",
                        "furigana": "ミラーさんがけっこんしたのをしっていますか。",
                        "translation": "Bạn có biết anh Miller đã kết hôn không?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "明日テストがあるのを知っていますか。",
                        "furigana": "あしたテストがあるのをしっていますか。",
                        "translation": "Bạn có biết ngày mai có bài kiểm tra không?",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Thể thườngのはNです",
                "meaning": "Cái / Nơi / Người mà ~ chính là N",
                "usage": "Thể thường ＋ のは N です。 (Aな/N だ→な)",
                "explanation": "Nhấn mạnh đối tượng N (thời gian, địa điểm, con người, sự vật) ở vị ngữ.",
                "notes": None,
                "sortOrder": 5,
                "examples": [
                    {
                        "japanese": "私が生まれたのは北海道です。",
                        "furigana": "わたしがうまれたのはほっかいどうです。",
                        "translation": "Nơi tôi sinh ra là Hokkaido.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "彼が好きなのは音楽です。",
                        "furigana": "かれがすきなのはおんがくです。",
                        "translation": "Thứ anh ấy thích là âm nhạc.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 39 (p.74 TOC, p.75-77)
    {
        "lessonNumber": 39,
        "title": "Bài 39",
        "grammars": [
            {
                "pattern": "～て、～",
                "meaning": "Vì… nên… (chỉ nguyên nhân tự nhiên, cảm xúc, không ý chí)",
                "usage": "Vて／Vなくて／Aくて／Aで、～",
                "explanation": "Vế 1 là nguyên nhân dẫn đến kết quả ở vế 2. Vế 2 thường là cảm xúc, khả năng hoặc sự việc tự nhiên, không dùng câu mệnh lệnh, ý chí, rủ rê.",
                "notes": "Vế sau không dùng câu nhờ vả, mệnh lệnh, rủ rê",
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "ニュースを聞いて、びっくりしました。",
                        "furigana": "ニュースをきいて、びっくりしました。",
                        "translation": "Nghe tin tức xong tôi giật mình.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "家族に会えなくて、寂しいです。",
                        "furigana": "かぞくにあえなくて、さびしいです。",
                        "translation": "Không gặp được gia đình nên thấy buồn.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Nで～",
                "meaning": "Do / Vì N (thiên tai, tai nạn, sự cố...)",
                "usage": "N(thiên tai, tai nạn, dịch bệnh) で、～",
                "explanation": "Danh từ chỉ nguyên nhân khách quan như bão, động đất, hỏa hoạn, tai nạn giao thông dẫn đến kết quả ở vế sau.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "地震でビルが倒れました。",
                        "furigana": "じしんでビルがたおれました。",
                        "translation": "Do động đất nên tòa nhà bị sập.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "事故で電車が止まりました。",
                        "furigana": "じこででんしゃがとまりました。",
                        "translation": "Do tai nạn nên tàu điện bị dừng.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～ので、～",
                "meaning": "Vì… nên… (lý do khách quan, lịch sự)",
                "usage": "Thể thường ＋ ので、～。 (Aな/N だ→な)",
                "explanation": "Nêu lý do khách quan, nhẹ nhàng và lịch sự hơn から. Thường dùng khi xin phép, nhờ vả, giải thích lý do giao tiếp lịch sự.",
                "notes": "Lịch sự và khách quan hơn から",
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "用事があるので、お先に失礼します。",
                        "furigana": "ようじがあるので、おさきにしつれいします。",
                        "translation": "Vì có việc bận nên tôi xin phép về trước.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "気分が悪いので、少し休んでもいいですか。",
                        "furigana": "きぶんがわるいので、すこしやすんでもいいですか。",
                        "translation": "Vì thấy không khỏe nên tôi nghỉ một chút được không?",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 40 (p.78 TOC, p.79-81)
    {
        "lessonNumber": 40,
        "title": "Bài 40",
        "grammars": [
            {
                "pattern": "～か、～",
                "meaning": "Lồng câu nghi vấn có từ để hỏi vào câu khác",
                "usage": "Thể thường ＋ か、～。 (Aな/N だ bỏ だ)",
                "explanation": "Lồng câu nghi vấn chứa từ để hỏi vào trong câu văn khác.",
                "notes": None,
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "ビールは何本あるか、数えてください。",
                        "furigana": "ビールはなんぼんあるか、かぞえてください。",
                        "translation": "Hãy đếm xem có bao nhiêu chai bia.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "A：二次会はどこへ行きましたか？ B：酔っていたので、どこへ行ったか、全然覚えていないんです。",
                        "furigana": "A：にじかいはどこへいきましたか？ B：よっていたので、どこへいったか、ぜんぜんおぼえていないんです。",
                        "translation": "Tăng hai đã đi đâu vậy? - Vì say nên tôi chẳng nhớ là đã đi đâu cả.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～かどうか～",
                "meaning": "Có ~ hay không (lồng câu nghi vấn không có từ để hỏi)",
                "usage": "Thể thường ＋ かどうか、～。 (Aな/N だ bỏ だ)",
                "explanation": "Lồng câu nghi vấn không chứa từ để hỏi vào trong câu văn khác.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "ボランティアに参加するかどうか、まだ決めていません。",
                        "furigana": "ボランティアにさんかするかどうか、まだきめていません。",
                        "translation": "Tôi vẫn chưa quyết định có tham gia tình nguyện hay không.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "その話は本当かどうか、わかりません。",
                        "furigana": "そのはなしはほんとうかどうか、わかりません。",
                        "translation": "Tôi không biết chuyện đó có thật hay không.",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "まちがいがないかどうか、調べてください。",
                        "furigana": "まちがいがないかどうか、しらべてください。",
                        "translation": "Hãy tìm hiểu xem có sai sót gì không.",
                        "sortOrder": 3
                    }
                ]
            },
            {
                "pattern": "～てみます",
                "meaning": "Thử làm V",
                "usage": "Vてみます。",
                "explanation": "Thử làm một hành động nào đó xem kết quả thế nào.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "このくつは合うかどうか、はいてみてもいいですか？",
                        "furigana": "このくつはあうかどうか、はいてみてもいいですか？",
                        "translation": "Đôi giày này tôi đi thử xem có vừa không được không ạ?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "京都へ行ってみたいです。",
                        "furigana": "きょうとへいってみたいです。",
                        "translation": "Tôi muốn thử đi Kyoto.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 41 (p.82 TOC, p.83-89)
    {
        "lessonNumber": 41,
        "title": "Bài 41",
        "grammars": [
            {
                "pattern": "Nをいただきます",
                "meaning": "Tôi nhận được vật N từ người trên",
                "usage": "～に Nをいただきます。",
                "explanation": "Tôi (người thân) nhận được vật N từ người trên. いただきます là khiêm nhường ngữ của もらいます. Thể hiện sự biết ơn đến người trên.",
                "notes": "Khiêm nhường ngữ của もらいます",
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "私は社長にお土産をいただきました。",
                        "furigana": "わたしはしゃちょうにおみやげをいただきました。",
                        "translation": "Tôi nhận được quà đặc sản từ giám đốc.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "先生に本をいただきました。",
                        "furigana": "せんせいにほんをいただきました。",
                        "translation": "Tôi nhận sách từ giáo viên.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Nをくださいます",
                "meaning": "Người trên cho tôi vật N",
                "usage": "～は／が［私に］Nをくださいます。",
                "explanation": "Người trên cho tôi (người thân) vật N. くださいます là tôn kính ngữ của くれます. Thể hiện sự biết ơn đến người trên.",
                "notes": "Tôn kính ngữ của くれます",
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "社長は（私に）お土産をくださいました。",
                        "furigana": "しゃちょうは（わたしに）おみやげをくださいました。",
                        "translation": "Giám đốc đã tặng quà cho tôi.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "先生は（私に）本をくださいました。",
                        "furigana": "せんせいは（わたしに）ほんをくださいました。",
                        "translation": "Thầy giáo tặng cho tôi cuốn sách.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～をやります",
                "meaning": "Tôi cho người dưới, động thực vật cái gì đó",
                "usage": "～に Nをやります。",
                "explanation": "Tôi cho người dưới / động thực vật vật N. Khi người nói cho người dưới/ động thực vật cái gì đó. あげます thay cho やります khi muốn thể hiện sự lịch sự.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "（私は）花に水をやります。",
                        "furigana": "（わたしは）はなにみずをやります。",
                        "translation": "Tôi tưới nước cho hoa.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "（私は）子どもにおもちゃをやりました（あげました）。",
                        "furigana": "（わたしは）こどもにおもちゃをやりました（あげました）。",
                        "translation": "Tôi cho con đồ chơi.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～ていただきます",
                "meaning": "Được ai đó (người trên) làm ~ cho",
                "usage": "～に Vていただきます。",
                "explanation": "Được ai đó làm ～ cho. いただきます là khiêm nhường ngữ của もらいます. Thể hiện sự biết ơn khi được người trên làm cho điều gì đó.",
                "notes": None,
                "sortOrder": 4,
                "examples": [
                    {
                        "japanese": "私は先生に漢字の間違いを直していただきました。",
                        "furigana": "わたしはせんせいにかんじのまちがいをなおしていただきました。",
                        "translation": "Tôi đã được thầy giáo sửa cho lỗi sai của chữ Kanji.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "先輩に仕事について説明していただきました。",
                        "furigana": "せんぱいにしごとについてせつめいしていただきました。",
                        "translation": "Tôi được tiền bối giải thích cho về công việc.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "〜てくださいます",
                "meaning": "Người trên làm gì đó cho tôi",
                "usage": "～が [私に] Vてくださいます。",
                "explanation": "Ai đó làm ~ cho tôi. くださいます là tôn kính ngữ của くれます. Thể hiện sự biết ơn khi người trên làm gì đó cho.",
                "notes": None,
                "sortOrder": 5,
                "examples": [
                    {
                        "japanese": "先生が私に英語を教えてくださいました。",
                        "furigana": "せんせいがわたしにえいごをおしえてくださいました。",
                        "translation": "Thầy giáo đã dạy tiếng Anh cho tôi.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "部長が私のレポートを直してくださいました。",
                        "furigana": "ぶちょうがわたしのレポートをなおしてくださいました。",
                        "translation": "Trưởng phòng đã sửa báo cáo giúp tôi.",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "先輩が私を空港まで送ってくださいました。",
                        "furigana": "せんぱいがわたしをくうこうまでおくってくださいました。",
                        "translation": "Tiền bối đã tiễn tôi tới sân bay.",
                        "sortOrder": 3
                    }
                ]
            },
            {
                "pattern": "～てやります",
                "meaning": "Tôi làm ~ cho người dưới, động thực vật",
                "usage": "～に Vてやります。",
                "explanation": "Tôi làm ~ cho người dưới, động thực vật.",
                "notes": None,
                "sortOrder": 6,
                "examples": [
                    {
                        "japanese": "私は孫に英語を教えてやりました（あげました）。",
                        "furigana": "わたしはまごにえいごをおしえてやりました（あげました）。",
                        "translation": "Tôi dạy tiếng Anh cho cháu.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "私は子どもを公園へ連れて行ってやりました。",
                        "furigana": "わたしはこどもをこうえんへつれていってやりました。",
                        "translation": "Tôi dắt con ra công viên.",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "私は息子の宿題を見てやりました（あげました）。",
                        "furigana": "わたしはむすこのしゅくだいをみてやりました（あげました）。",
                        "translation": "Tôi xem bài tập về nhà cho con trai.",
                        "sortOrder": 3
                    }
                ]
            },
            {
                "pattern": "～てくださいませんか",
                "meaning": "Làm ơn hãy làm ~ cho tôi (nhờ vả lịch sự)",
                "usage": "Vてくださいませんか。",
                "explanation": "Làm ơn hãy làm ~ cho tôi. Đây là cách yêu cầu, nhờ vả lịch sự hơn so với ～てください nhưng không lịch sự bằng ～ていただけませんか.",
                "notes": None,
                "sortOrder": 7,
                "examples": [
                    {
                        "japanese": "もう少しゆっくり話してくださいませんか。",
                        "furigana": "もうすこしゆっくりはなしてくださいませんか。",
                        "translation": "Làm ơn hãy nói chậm lại một chút.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "この漢字の読み方を教えてくださいませんか。",
                        "furigana": "このかんじのよみかたをおしえてくださいませんか。",
                        "translation": "Làm ơn chỉ giúp tôi cách đọc chữ Hán này được không ạ?",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 42 (p.90 TOC, p.91-92)
    {
        "lessonNumber": 42,
        "title": "Bài 42",
        "grammars": [
            {
                "pattern": "Vる／Nの＋ために、～",
                "meaning": "Để / Vì (nhằm mục đích gì), thì làm ~",
                "usage": "Vる／Nの＋ために、～",
                "explanation": "Mẫu câu diễn tả việc làm gì đó để nhằm mục đích gì. Nのために: làm gì đó vì lợi ích của đối tượng N.",
                "notes": None,
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "車を買うために、貯金します。",
                        "furigana": "くるまをかうために、ちょきんします。",
                        "translation": "Tôi sẽ tiết kiệm để mua xe ô tô.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "家族のために、一生懸命働いています。",
                        "furigana": "かぞくのために、いっしょうけんめいはたらいています。",
                        "translation": "Tôi nỗ lực làm việc vì gia đình.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Vるのに/ Nに～",
                "meaning": "Dùng cho việc gì / Để làm gì thì mất...",
                "usage": "Vるのに／Nに ＋ 使う/便利だ/役に立つ/かかる...",
                "explanation": "Biểu thị mục đích sử dụng hoặc đánh giá. Vế sau hay dùng: 使います、いいです、便利です、役に立ちます、～かかります,... để biểu thị mục đích sử dụng hoặc đánh giá.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "ミキサーは材料を混ぜるのに使います。",
                        "furigana": "ミキサーはざいりょうをまぜるのにつかいます。",
                        "translation": "Cái máy xay dùng để trộn nguyên liệu.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "このレポートを書くのに1時間かかりました。",
                        "furigana": "このレポートをかくのに1じかんかかりました。",
                        "translation": "Tôi đã mất 1 tiếng cho việc viết báo cáo.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 43 (p.93 TOC, p.94-95)
    {
        "lessonNumber": 43,
        "title": "Bài 43",
        "grammars": [
            {
                "pattern": "～そうです",
                "meaning": "Trông có vẻ ~ (phán đoán qua thị giác)",
                "usage": "Vます(bỏ ます)／Aい(bỏ い)／Aな(bỏ な) ＋ そうです。",
                "explanation": "Diễn tả phán đoán, cảm giác qua vẻ bề ngoài trực tiếp rằng một trạng thái hoặc hành động sắp xảy ra.",
                "notes": None,
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "曇りですね。もうすぐ雨が降りそうですね。",
                        "furigana": "くもりですね。もうすぐあめがふりそうですね。",
                        "translation": "Nhiều mây nhỉ. Trời có vẻ như sắp mưa rồi.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "このカレーはおいしそうですね。",
                        "furigana": "このカレーはおいしそうですね。",
                        "translation": "Món cà ri này có vẻ ngon nhỉ.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Vてきます",
                "meaning": "Đi đâu đó làm gì rồi quay lại",
                "usage": "Vてきます。",
                "explanation": "Diễn tả hành động đi làm việc gì đó rồi quay lại vị trí ban đầu.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "スーパーでジュースを買ってきます。",
                        "furigana": "スーパーでジュースをかってきます。",
                        "translation": "Tôi đi mua nước hoa quả ở siêu thị rồi quay lại.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "台所からはさみを取ってきます。",
                        "furigana": "だいどころからはさみをとってきます。",
                        "translation": "Tôi lấy kéo ở nhà bếp rồi sẽ quay lại.",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "ちょっと銀行へ行って来ます。",
                        "furigana": "ちょっとぎんこうへいってきます。",
                        "translation": "Tôi đi ngân hàng một chút rồi quay lại.",
                        "sortOrder": 3
                    }
                ]
            }
        ]
    },

    # Lesson 44 (p.96 TOC, p.97-100)
    {
        "lessonNumber": 44,
        "title": "Bài 44",
        "grammars": [
            {
                "pattern": "～すぎます",
                "meaning": "Quá ~ (vượt quá mức độ cần thiết)",
                "usage": "Vます(bỏ ます)／Aい(bỏ い)／Aな(bỏ な) ＋ すぎます。",
                "explanation": "Biểu thị sự vượt quá mức độ cần thiết của một hành vi hoặc trạng thái. Thường dùng trong trường hợp không muốn những điều đó xảy ra. すぎます là động từ nhóm II.",
                "notes": "Quá ~. すぎます là động từ nhóm II.",
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "お酒を飲みすぎて、頭がいたくなりました。",
                        "furigana": "おさけをのみすぎて、あたまがいたくなりました。",
                        "translation": "Vì tôi uống rượu quá nhiều nên tôi bị đau đầu.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "このくつは小さすぎて、はけないよ。",
                        "furigana": "このくつはちいさすぎて、はけないよ。",
                        "translation": "Đôi giày này quá nhỏ, tôi không xỏ vào được.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Vます＋にくい／やすい",
                "meaning": "Khó / Dễ thực hiện hành động V",
                "usage": "Vます(bỏ ます) ＋ にくいです／やすいです。",
                "explanation": "Khó/ dễ ~. V có ý chí: dễ/ khó thực hiện hành động V. V không ý chí: dễ/ khó xảy ra việc V.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "第8課の漢字は簡単で、覚えやすいです。",
                        "furigana": "だい8かのかんじはかんたんで、おぼえやすいです。",
                        "translation": "Hán tự bài 8 đơn giản nên dễ nhớ.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "このくつは小さすぎて、歩きにくいです。",
                        "furigana": "このくつはちいさすぎて、あるきにくいです。",
                        "translation": "Đôi giày này quá nhỏ nên khó đi bộ.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "N/ Aなに/ Aいく＋します",
                "meaning": "Làm cho ~ trở nên ~ (tác động làm biến đổi trạng thái)",
                "usage": "Nに / Aなに / Aいく ＋ します。",
                "explanation": "Làm cho ~ trở nên ~. Diễn tả hành động làm biến đổi một sự vật, sự việc sang một trạng thái nào đó.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "自分の部屋をきれいにします。",
                        "furigana": "じぶんのへやをきれいにします。",
                        "translation": "Tôi sẽ làm sạch căn phòng của mình.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "テレビの音を小さくしてください。",
                        "furigana": "テレビのおとをちいさくしてください。",
                        "translation": "Hãy giảm nhỏ tiếng ti vi.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Nにします",
                "meaning": "Chọn N / Quyết định chọn N",
                "usage": "Nにします。",
                "explanation": "Chọn N. Đưa ra lựa chọn, quyết định thứ gì đó. Thường dùng khi đi du lịch, gọi đồ ở nhà hàng,…",
                "notes": None,
                "sortOrder": 4,
                "examples": [
                    {
                        "japanese": "このカレーにします。",
                        "furigana": "このカレーにします。",
                        "translation": "Tôi chọn món cà ri này.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "旅行の出発は明日にしましょう。",
                        "furigana": "りょこうのしゅっぱつはあしたにしましょう。",
                        "translation": "Chúng ta quyết định chuyến du lịch sẽ xuất phát vào ngày mai nhé.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 45 (p.101 TOC, p.102-103)
    {
        "lessonNumber": 45,
        "title": "Bài 45",
        "grammars": [
            {
                "pattern": "～場合、～",
                "meaning": "Trong trường hợp (vế 1), thì (vế 2)",
                "usage": "V thể thường / Aい / Aな / Nの ＋ 場合(は)、～",
                "explanation": "Trong trường hợp (vế 1), thì (vế 2). Nêu lên một tình huống giả định hoặc có thể xảy ra và cách xử lý tương ứng.",
                "notes": None,
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "せきが出る場合は、この薬を飲んでください。",
                        "furigana": "せきがでるばあいは、このくすりをのんでください。",
                        "translation": "Trường hợp bị ho thì hãy uống thuốc này nhé.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "時間に遅れる場合は、先生に連絡してください。",
                        "furigana": "じかんにおくれるばあいは、せんせいにれんらくしてください。",
                        "translation": "Trường hợp muộn giờ thì hãy liên hệ với giáo viên.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～のに、～",
                "meaning": "Mặc dù (vế 1), nhưng mà (vế 2)",
                "usage": "Thể thường ＋ のに、～。 (Aな/N だ→な)",
                "explanation": "Mặc dù (vế 1), nhưng mà (vế 2). Diễn tả sự bất ngờ, thất vọng hoặc trách móc khi kết quả trái ngược với dự đoán thông thường.",
                "notes": "Đuôi câu thể hiện sự bất ngờ, thất vọng",
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "ご飯を食べたのに、もうおなかがすいた。",
                        "furigana": "ごはんをたべたのに、もうおなかがすいた。",
                        "translation": "Tôi đã ăn cơm rồi thế mà đã lại đói bụng rồi.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "よく勉強したのに、結果がよくなかった。",
                        "furigana": "よくべんきょうしたのに、けっかがよくなかった。",
                        "translation": "Tôi đã học rất chăm chỉ ấy vậy mà kết quả lại không tốt.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 46 (p.104 TOC, p.105-107)
    {
        "lessonNumber": 46,
        "title": "Bài 46",
        "grammars": [
            {
                "pattern": "～ところです",
                "meaning": "Đang chuẩn bị làm / Đang làm / Vừa mới làm xong",
                "usage": "Vる／Vている／Vた ＋ ところです。",
                "explanation": "- Vる＋ところです: Sắp sửa, chuẩn bị làm việc gì đó.\n- Vている＋ところです: Đang trong quá trình thực hiện hành động.\n- Vた＋ところです: Vừa mới hoàn thành hành động tức thì.",
                "notes": None,
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "これからシャワーをあびるところです。",
                        "furigana": "これからシャワーをあびるところです。",
                        "translation": "Tôi chuẩn bị đi tắm.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "たったいまバスが出たところです。",
                        "furigana": "たったいまバスがでたところです。",
                        "translation": "Xe buýt vừa khởi hành xong.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～ばかりです",
                "meaning": "Vừa mới làm gì (theo cảm nhận chủ quan)",
                "usage": "Vた ＋ ばかりです。",
                "explanation": "Diễn tả hành động vừa mới xảy ra chưa lâu theo cảm nhận tâm lý của người nói (thời gian thực tế có thể đã trôi qua một lúc hoặc nhiều ngày).",
                "notes": "Mang tính chủ quan của người nói, khác với ところです chỉ khoảnh khắc vừa xong tức thì",
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "１か月前にかれに会ったばかりです。",
                        "furigana": "１かげつまえにかれにあったばかりです。",
                        "translation": "Tôi mới gặp anh ấy một tháng trước.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "日本に来たばかりなので、わからないことがたくさんある。",
                        "furigana": "にほんにきたばかりなので、わからないことがたくさんある。",
                        "translation": "Vì mới đến Nhật nên có nhiều thứ tôi chưa biết.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～はずです",
                "meaning": "Chắc chắn là ~ (phán đoán có căn cứ)",
                "usage": "Thể thường ＋ はずです。 (Aな だ→な, N だ→の)",
                "explanation": "Biểu thị sự phán đoán có cơ sở và độ chắc chắn cao của người nói.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "リンさんはどくしんのはずです。",
                        "furigana": "リンさんはどくしんのはずです。",
                        "translation": "Chắc chắn là cô Linh độc thân.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "飛行機は３時に着くはずです。",
                        "furigana": "ひこうきは３じにつくはずです。",
                        "translation": "Chắc chắn là máy bay sẽ đến nơi lúc 3 giờ.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 47 (p.108 TOC, p.109-110)
    {
        "lessonNumber": 47,
        "title": "Bài 47",
        "grammars": [
            {
                "pattern": "～そうです",
                "meaning": "Nghe nói là ~ (truyền đạt thông tin)",
                "usage": "Thể thường ＋ そうです。",
                "explanation": "Dùng để truyền đạt lại thông tin nghe được từ nguồn khác mà không thêm ý kiến cá nhân. Thường đi kèm với ～によると (theo như...). Khác với そうです phán đoán ở Bài 43 (Vます/A bỏ い,な).",
                "notes": "Đi với thể thông thường. Thường đi kèm ～によると.",
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "天気予報によると、あした雨が降るそうです。",
                        "furigana": "てんきよほうによると、あしたあめがふるそうです。",
                        "translation": "Theo dự báo thời tiết, nghe nói ngày mai trời có mưa.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "ニュースによると、昨日事故があったそうです。",
                        "furigana": "ニュースによると、きのうじこがあったそうです。",
                        "translation": "Theo như bản tin, nghe nói hôm qua đã có tai nạn.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "～ようです",
                "meaning": "Hình như là ~ (phán đoán qua giác quan, dấu hiệu)",
                "usage": "Thể thường ＋ ようです。 (Aな だ→な, N だ→の)",
                "explanation": "Phán đoán dựa trên cảm giác hoặc chứng cứ gián tiếp (âm thanh, mùi vị, dấu hiệu quan sát được).",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "うるさいですね。けんかしているようです。",
                        "furigana": "うるさいですね。けんかしているようです。",
                        "translation": "Ồn ào nhỉ. Hình như là đang có cãi nhau.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "電気がついていないので、留守のようですね。",
                        "furigana": "でんきがついていないので、るすのようですね。",
                        "translation": "Vì đèn không sáng nên hình như là người ta đi vắng rồi.",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 48 (p.111 TOC, p.112-114)
    {
        "lessonNumber": 48,
        "title": "Bài 48",
        "grammars": [
            {
                "pattern": "使役 (しえき)",
                "meaning": "Thể sai khiến (Cách chia)",
                "usage": "Nhóm 1: ～iます → ～aせます (＊～います → ～わせます)\nNhóm 2: ～ます → ～させます\nNhóm 3: きます → こさせます, します → させます",
                "explanation": "- Nhóm 1: いきます→いかせます, まちます→またせます, やすみます→やませます, よみます→よませます, とります→とらせます\n- Nhóm 2: ねます→ねさせます, たべます→たべさせます, かります→かりさせます, みます→みさせます\n- Nhóm 3: 来ます(きます)→こさせます, します→させます, もってきます→もってこさせます, べんきょうします→べんきょうさせます",
                "notes": "Bảng tổng hợp quy tắc chia thể sai khiến",
                "sortOrder": 1,
                "examples": []
            },
            {
                "pattern": "SはNをVさせる・SはNにVさせる",
                "meaning": "Bắt / cho phép ai đó làm việc ~",
                "usage": "Sは Nを V(nội động từ)させる\nSは Nに N(vật)を V(ngoại động từ)させる",
                "explanation": "- Sは Nを Vさせる: sử dụng với V (nội động từ).\n- Sは Nに Vさせる: sử dụng với V (ngoại động từ).\nBắt/ cho phép ai đó làm việc ~.",
                "notes": None,
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "部長はナムさんを日本へ出張させました。",
                        "furigana": "ぶちょうはナムさんをにほんへしゅっちょうさせました。",
                        "translation": "Trưởng phòng cho anh Nam sang Nhật Bản công tác.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "母は子どもに野菜をたくさん食べさせます。",
                        "furigana": "はははこどもにやさいをたくさんたべさせます。",
                        "translation": "Mẹ bắt con ăn nhiều rau.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "Ｖさせていただけませんか",
                "meaning": "Làm ơn cho phép tôi làm ~ (xin phép lịch sự)",
                "usage": "V(sai khiến thể て) ＋ いただけませんか。",
                "explanation": "Làm ơn cho phép tôi làm ~. Mẫu câu xin phép người trên để cho mình làm gì đó một cách lịch sự, khiêm nhường.",
                "notes": None,
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "病気なので、休ませていただけませんか。",
                        "furigana": "びょうきなので、やすませていただけませんか。",
                        "translation": "Vì tôi bị ốm nên anh có thể cho phép tôi nghỉ có được không?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "すみません、この本を使わせていただけませんか。",
                        "furigana": "すみません、このほんをつかわせていただけませんか。",
                        "translation": "Xin lỗi, bạn có thể cho phép tôi sử dụng cuốn sách này được không?",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 49 (p.115 TOC, p.116-121)
    {
        "lessonNumber": 49,
        "title": "Bài 49",
        "grammars": [
            {
                "pattern": "Ｖられます",
                "meaning": "(Người trên) làm việc ~ (tôn kính ngữ chia dạng bị động)",
                "usage": "Sは Vられます。",
                "explanation": "(Người trên) làm việc ~. Đây là động từ thể tôn kính, cách chia giống động từ thể bị động. Không sử dụng để nói về hành động của người trong gia đình.",
                "notes": "Chia giống thể bị động. Không dùng cho hành động của người trong gia đình.",
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "社長はあした出張されます。",
                        "furigana": "しゃちょうはあしたしゅっちょうされます。",
                        "translation": "Giám đốc sẽ đi công tác vào ngày mai.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "先生は本を読まれています。",
                        "furigana": "せんせいはほんをよまれています。",
                        "translation": "Thầy giáo đang đọc sách.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "おVになります",
                "meaning": "(Người trên) làm ~ (tôn kính mức độ cao hơn)",
                "usage": "SはおV(bỏ ます)になります。",
                "explanation": "(Người trên) làm ~. Mức độ tôn kính cao hơn mẫu chia giống thể bị động. Không dùng cho những động từ trước ます chỉ có 1 âm tiết hoặc động từ nhóm III. Không sử dụng để nói về hành động của người trong gia đình.",
                "notes": "Mức độ tôn kính cao hơn Vられます",
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "社長は 音楽をお聞きになっています。",
                        "furigana": "しゃちょうはおんがくをおききになっています。",
                        "translation": "Giám đốc đang nghe nhạc.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "先生は本をお読みになっています。",
                        "furigana": "せんせいはほんをおよみになっています。",
                        "translation": "Thầy giáo đang đọc sách.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "とくべつな尊敬語（そんけいご）",
                "meaning": "Tôn kính ngữ đặc biệt (các động từ bất quy tắc)",
                "usage": "- いきます、きます、います → いらっしゃいます (いらっしゃる)\n- たべます、のみます → めしあがります (めしあがる)\n- いいます → おっしゃいます (おっしゃる)\n- みます → ごらんになります (ごらんになる)\n- します → なさいます (なさる)\n- くれます → くださいます (くださる)\n- しっています → ごぞんじです (ごぞんじだ)",
                "explanation": "Bảng các động từ có dạng tôn kính ngữ đặc biệt không theo quy tắc chia thông thường:\n- いきます、きます、います → いらっしゃいます (いらっしゃる)\n- たべます、のみます → めしあがります (めしあがる)\n- いいます → おっしゃいます (おっしゃる)\n- みます → ごらんになります (ごらんになる)\n- します → なさいます (なさる)\n- くれます → くださいます (くださる)\n- しっています → ごぞんじです (ごぞんじだ)",
                "notes": "Bảng tổng hợp các động từ tôn kính ngữ đặc biệt",
                "sortOrder": 3,
                "examples": [
                    {
                        "japanese": "先生は教室にいらっしゃいます。",
                        "furigana": "せんせいはきょうしつにいらっしゃいます。",
                        "translation": "Thầy giáo ở lớp học.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "部長は何とおっしゃいましたか。",
                        "furigana": "ぶちょうはなんとおっしゃいましたか。",
                        "translation": "Trưởng phòng đã nói gì vậy ạ?",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "どうぞ、召し上がってください。",
                        "furigana": "どうぞ、めしあがってください。",
                        "translation": "Mời anh/chị dùng (ăn/uống ạ).",
                        "sortOrder": 3
                    }
                ]
            },
            {
                "pattern": "お／ご～ください",
                "meaning": "Xin hãy làm ~ (yêu cầu tôn kính)",
                "usage": "お／ご～ください。\n- V nhóm I, II: おV(bỏ ます)ください。\n- V nhóm III: ごN ください。",
                "explanation": "Xin hãy làm ~. Đây là cách nói tôn kính của: Vてください. V nhóm I, II (trừ động từ có một âm tiết trước ます): おVますください. V nhóm III: ごN ください.",
                "notes": "Cách nói tôn kính của Vてください",
                "sortOrder": 4,
                "examples": [
                    {
                        "japanese": "少々お待ちください。",
                        "furigana": "しょうしょうおまちください。",
                        "translation": "Anh/ chị  chờ một chút.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "ご利用ください。",
                        "furigana": "ごりようください。",
                        "translation": "Anh/ chị hãy sử dụng.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "お/ご+ N/A",
                "meaning": "Tiền tố kính ngữ お／ご gắn trước Danh từ hoặc Tính từ",
                "usage": "お/ご + N/A",
                "explanation": "Thêm 「お」 hoặc 「ご」 trước danh từ, tính từ, hay phó từ để thể hiện sự tôn kính đến chủ sở hữu danh từ đó hay người trong trạng thái đó.\n※ Thông thường:\n「お」 thường dùng với từ thuần Nhật.\n「ご」 thường dùng với từ có gốc Hán.",
                "notes": "お + từ thuần Nhật / ご + từ gốc Hán",
                "sortOrder": 5,
                "examples": [
                    {
                        "japanese": "お国、お暇、お忙しい、お名前、…",
                        "furigana": "おくに、おひま、おいそがしい、おなまえ、…",
                        "translation": "Đất nước, thời gian rảnh, bận rộn, tên (của quý vị)...",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "ご家族、ご両親、ご熱心、…",
                        "furigana": "ごかぞく、ごりょうしん、ごねっしん、…",
                        "translation": "Gia đình, bố mẹ, sự nhiệt tình (của quý vị)...",
                        "sortOrder": 2
                    }
                ]
            }
        ]
    },

    # Lesson 50 (p.122 TOC, p.123-126)
    {
        "lessonNumber": 50,
        "title": "Bài 50",
        "grammars": [
            {
                "pattern": "お／ご～します",
                "meaning": "(Tôi xin phép) làm ~ giúp người trên (khiêm nhường ngữ)",
                "usage": "お／ご～します。\n- V nhóm I, II: おV(bỏ ます)します。\n- V nhóm III: ごN します。",
                "explanation": "Thể hiện sự tôn kính với người trên bằng cách khiêm nhường hành động của mình hoặc người ở phía mình. Không sử dụng với các động từ có 1 âm tiết trước ます.",
                "notes": "Không sử dụng với các động từ có 1 âm tiết trước ます",
                "sortOrder": 1,
                "examples": [
                    {
                        "japanese": "重そうですね。お持ちしましょうか。",
                        "furigana": "おもそうですね。おもちしましょうか。",
                        "translation": "Trông có vẻ nặng nhỉ. Tôi tôi mang giúp anh/ chị nhé?",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "もう一度ご説明します。",
                        "furigana": "もういちどごせつめいします。",
                        "translation": "Tôi xin phép giải thích thêm một lần nữa.",
                        "sortOrder": 2
                    }
                ]
            },
            {
                "pattern": "とくべつな謙譲語（けんじょうご）",
                "meaning": "Khiêm nhường ngữ đặc biệt (các động từ bất quy tắc)",
                "usage": "- いきます、きます → まいります (まいる)\n- います → おります (おる)\n- たべます、のみます、もらいます → いただきます (いただく)\n- いいます → もうします (もうす)\n- します → いたします (いたす)\n- しっています → ぞんじております\n- しりません → ぞんじません\n- みます → はいけんします (はいけんする)\n- ききます、（うちへ）いきます → うかがいます (うかがう)\n- あいます → おめにかかります (おめにかかる)",
                "explanation": "Bảng các động từ có dạng khiêm nhường ngữ đặc biệt không theo quy tắc chia thông thường:\n- いきます、きます → まいります (まいる)\n- います → おります (おる)\n- たべます、のみます、もらいます → いただきます (いただく)\n- いいます → もうします (もうす)\n- します → いたします (いたす)\n- しっています → ぞんじております / しりません → ぞんじません\n- みます → はいけんします (はいけんする)\n- ききます、（うちへ）いきます → うかがいます (うかがう)\n- あいます → おめにかかります (おめにかかる)",
                "notes": "Bảng tổng hợp các động từ khiêm nhường ngữ đặc biệt",
                "sortOrder": 2,
                "examples": [
                    {
                        "japanese": "はじめまして。田中と申します。",
                        "furigana": "はじめまして。たなかともうします。",
                        "translation": "Rất hân hạnh được gặp. Tôi tên là Tanaka.",
                        "sortOrder": 1
                    },
                    {
                        "japanese": "社長にお菓子をいただきました。",
                        "furigana": "しゃちょうにおかしをいただきました。",
                        "translation": "Tôi đã nhận được bánh kẹo từ giám đốc.",
                        "sortOrder": 2
                    },
                    {
                        "japanese": "この書類を拝見してもよろしいですか。",
                        "furigana": "このしょるいをはいけんしてもよろしいですか。",
                        "translation": "Tôi có thể xem qua tài liệu này được không ạ?",
                        "sortOrder": 3
                    }
                ]
            }
        ]
    }
]

# Generate JSON payload
payload = {
    "levelCode": "N4",
    "levelName": "N4",
    "levelDescription": "Trình độ N4 - Sơ trung cấp",
    "lessons": lessons_data
}

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(payload, f, ensure_ascii=False, indent=2)

print(f"JSON saved to {OUTPUT_JSON}")

# Generate Flyway SQL migration
sql_lines = [
    "-- V6__add_n4_grammar.sql",
    "-- Thêm 89 mẫu ngữ pháp N4 và 192 câu ví dụ từ nguồn Ngữ Pháp N4.pdf",
    "",
    "-- 1. Đảm bảo Level N4 tồn tại",
    "INSERT INTO levels (code, name, description, sort_order, is_active)",
    "SELECT 'N4', 'N4', 'Trình độ N4 - Sơ trung cấp', 2, TRUE",
    "WHERE NOT EXISTS (SELECT 1 FROM levels WHERE code = 'N4');",
    "",
    "-- 2. Đảm bảo 25 bài học N4 (Bài 26 đến Bài 50) tồn tại"
]

for l_num in range(26, 51):
    sql_lines.append(
        f"INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) "
        f"SELECT l.id, {l_num}, 'Bài {l_num}', {l_num}, TRUE FROM levels l "
        f"WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = {l_num});"
    )

sql_lines.append("")
sql_lines.append("-- 3. Chèn ngữ pháp N4 và ví dụ theo từng bài")

def esc(s):
    if s is None:
        return "NULL"
    return "'" + str(s).replace("'", "''") + "'"

for lesson in lessons_data:
    l_num = lesson["lessonNumber"]
    g_count = len(lesson["grammars"])
    sql_lines.append(f"-- ==========================================")
    sql_lines.append(f"-- Bài {l_num}: {g_count} mẫu ngữ pháp")
    sql_lines.append(f"-- ==========================================")
    
    for g in lesson["grammars"]:
        pattern = g["pattern"]
        meaning = g["meaning"]
        usage = g["usage"]
        explanation = g["explanation"]
        notes = g["notes"]
        sort_order = g["sortOrder"]
        
        # Insert Grammar if not exists
        sql_lines.append(
            f"INSERT INTO grammars (lesson_id, pattern, meaning, usage_text, explanation, notes, sort_order) "
            f"SELECT ls.id, {esc(pattern)}, {esc(meaning)}, {esc(usage)}, {esc(explanation)}, {esc(notes)}, {sort_order} "
            f"FROM lessons ls JOIN levels lv ON ls.level_id = lv.id "
            f"WHERE lv.code = 'N4' AND ls.lesson_number = {l_num} "
            f"AND NOT EXISTS (SELECT 1 FROM grammars g2 WHERE g2.lesson_id = ls.id AND g2.pattern = {esc(pattern)});"
        )
        
        # Insert Examples if any
        if g["examples"]:
            for ex in g["examples"]:
                jp = ex["japanese"]
                furi = ex.get("furigana")
                trans = ex["translation"]
                ex_sort = ex["sortOrder"]
                
                sql_lines.append(
                    f"INSERT INTO grammar_examples (grammar_id, japanese, furigana, translation, explanation, sort_order) "
                    f"SELECT g.id, {esc(jp)}, {esc(furi)}, {esc(trans)}, NULL, {ex_sort} "
                    f"FROM grammars g JOIN lessons ls ON g.lesson_id = ls.id JOIN levels lv ON ls.level_id = lv.id "
                    f"WHERE lv.code = 'N4' AND ls.lesson_number = {l_num} AND g.pattern = {esc(pattern)} "
                    f"AND NOT EXISTS (SELECT 1 FROM grammar_examples ge2 WHERE ge2.grammar_id = g.id AND ge2.japanese = {esc(jp)} AND ge2.sort_order = {ex_sort});"
                )

with open(OUTPUT_SQL, "w", encoding="utf-8") as f:
    f.write("\n".join(sql_lines) + "\n")

print(f"SQL migration saved to {OUTPUT_SQL}")

# Summary statistics
total_lessons = len(lessons_data)
total_grammars = sum(len(l["grammars"]) for l in lessons_data)
total_examples = sum(sum(len(g["examples"]) for g in l["grammars"]) for l in lessons_data)

print(f"\n==========================================")
print(f"STATISTICS:")
print(f"Total Lessons: {total_lessons}")
print(f"Total Grammar patterns: {total_grammars}")
print(f"Total Grammar examples: {total_examples}")
print(f"==========================================")
for l in lessons_data:
    ln = l["lessonNumber"]
    gc = len(l["grammars"])
    ec = sum(len(g["examples"]) for g in l["grammars"])
    print(f"Lesson {ln:02d}: Grammar={gc:2d}, Examples={ec:2d}")
