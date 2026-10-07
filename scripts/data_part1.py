# Definitions for Lessons 26 - 34 (CD A)
import sys

def get_lessons_26_to_34():
    lessons = []

    # -------------------------------------------------------------
    # Lesson 26 (CD A-1 to A-4)
    # -------------------------------------------------------------
    lessons.append({
        "lessonNumber": 26,
        "items": [
            {
                "title": "Bài 26 - Track A-1: ～んですか／[疑問詞] ～んですか (CD A-1)",
                "audioUrl": "/audio/n4/lesson-26/listening-01.mp3",
                "transcript": "Kịch bản nghe Bài 26 Track A-1",
                "description": "Bài tập 1: 小森さんはどうですか。どうしてですか。(Track A-1)",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 小森さんはどうですか。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-1 (Đáp án: d ③ 調子が悪い / うちでアメリカ出張の準備をしていた)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. 忙しい - 会議資料のコピー (a ④)", "correct": False, "sortOrder": 1},
                            {"content": "b. 元気 - 女の子が生まれた (b ⑤)", "correct": False, "sortOrder": 2},
                            {"content": "c. 怒っている - 予定の変更 (c ②)", "correct": False, "sortOrder": 3},
                            {"content": "d. 調子が悪い - うちで出張の準備 (d ③)", "correct": True, "sortOrder": 4},
                            {"content": "e. 眠い - 朝までお酒を飲んだ (e ①)", "correct": False, "sortOrder": 5}
                        ]
                    },
                    {
                        "question": "2) 小森さんはどうですか。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-1 (Đáp án: e ① 眠い / 朝3時まで友達とお酒を飲んだ)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. 忙しい - 会議資料のコピー (a ④)", "correct": False, "sortOrder": 1},
                            {"content": "b. 元気 - 女の子が生まれた (b ⑤)", "correct": False, "sortOrder": 2},
                            {"content": "c. 怒っている - 予定の変更 (c ②)", "correct": False, "sortOrder": 3},
                            {"content": "d. 調子が悪い - うちで出張の準備 (d ③)", "correct": False, "sortOrder": 4},
                            {"content": "e. 眠い - 朝3時まで高校の友達とお酒を飲んだ (e ①)", "correct": True, "sortOrder": 5}
                        ]
                    },
                    {
                        "question": "3) 小森さんはどうですか。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-1 (Đáp án: b ⑤ 元気 - きのうの晩、女の子が生まれた)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. 忙しい - 会議資料のコピー (a ④)", "correct": False, "sortOrder": 1},
                            {"content": "b. 元気 - きのうの晩、女の子が生まれた (b ⑤)", "correct": True, "sortOrder": 2},
                            {"content": "c. 怒っている - 予定の変更 (c ②)", "correct": False, "sortOrder": 3},
                            {"content": "d. 調子が悪い - うちで出張の準備 (d ③)", "correct": False, "sortOrder": 4},
                            {"content": "e. 眠い - 朝までお酒を飲んだ (e ①)", "correct": False, "sortOrder": 5}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 26 - Track A-2: どうしたんですか／どうして～んですか (CD A-2)",
                "audioUrl": "/audio/n4/lesson-26/listening-02.mp3",
                "transcript": "Kịch bản nghe Bài 26 Track A-2",
                "description": "Bài tập 2: 学生はいろいろなことをします。どうしてですか。(Track A-2)",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) ジャンさんは早くうちへ帰ります。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-2 (Đáp án: b. 調子が悪いです)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. 都合が悪いですから。", "correct": False, "sortOrder": 1},
                            {"content": "b. 調子が悪いですから。", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) ミゲルさんは急いでいます。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-2 (Đáp án: b. サッカーを練習します)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. 友達と遊びに行きますから。", "correct": False, "sortOrder": 1},
                            {"content": "b. サッカーを練習しますから。", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) エドさんは月曜日休みます。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-2 (Đáp án: a. 両親と旅行します)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. 両親と旅行しますから。", "correct": True, "sortOrder": 1},
                            {"content": "b. 漢字の試験がありますから。", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 26 - Track A-3: ～んですが、～ていただけませんか (CD A-3)",
                "audioUrl": "/audio/n4/lesson-26/listening-03.mp3",
                "transcript": "Kịch bản nghe Bài 26 Track A-3",
                "description": "Bài tập 3: チンさんはどんな問題がありますか。その問題をどうしますか。(Track A-3)",
                "sortOrder": 3,
                "questions": [
                    {
                        "question": "1) チンさんはどんな問題があり、どうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-3 (Đáp án: ⑤ a - 市役所へ行く / 鈴木さんと行く)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. ⑤ 市役所へ行く - a. 鈴木さんと行く", "correct": True, "sortOrder": 1},
                            {"content": "b. ⑤ 市役所へ行く - b. 一人で行く", "correct": False, "sortOrder": 2},
                            {"content": "c. ④ 漢字が読めない - a. 鈴木さんと探す", "correct": False, "sortOrder": 3},
                            {"content": "d. ② ごみの分別 - b. カレンダーを見る", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) チンさんはどんな問題があり、どうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-3 (Đáp án: ④ a - 漢字が読めない / 鈴木さんと探す)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. ④ 漢字が読めない - a. 鈴木さんと探す", "correct": True, "sortOrder": 1},
                            {"content": "b. ④ 漢字が読めない - b. 自分で探す", "correct": False, "sortOrder": 2},
                            {"content": "c. ⑤ 市役所へ行く - a. 鈴木さんと行く", "correct": False, "sortOrder": 3},
                            {"content": "d. ② ごみの分別 - a. 掃除の人に聞く", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) チンさんはどんな問題があり、どうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-3 (Đáp án: ② b - 燃えないごみの出し方 / カレンダーを見る)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. ② 燃えないごみの出し方 - a. 掃除の人に聞く", "correct": False, "sortOrder": 1},
                            {"content": "b. ② 燃えないごみの出し方 - b. カレンダーを見る", "correct": True, "sortOrder": 2},
                            {"content": "c. ① コピー機の故障 - a. 自分で直す", "correct": False, "sortOrder": 3},
                            {"content": "d. ④ 漢字が読めない - b. 自分で探す", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 26 - Track A-4: ～んですが、[疑問詞] ～たらいいですか (CD A-4)",
                "audioUrl": "/audio/n4/lesson-26/listening-04.mp3",
                "transcript": "Kịch bản nghe Bài 26 Track A-4",
                "description": "Bài tập 4: カリナさんは日本についていろいろ知りたいことがあります。(Track A-4)",
                "sortOrder": 4,
                "questions": [
                    {
                        "question": "1) 茶道について知りたい時、カリナさんはどこへ行き、どうしたらいいですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-4 (Đáp án: h ④ - お寺 / 紹介してもらう)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. h (お寺) - ④ 紹介してもらう", "correct": True, "sortOrder": 1},
                            {"content": "b. h (お寺) - ① 電話でお願いする", "correct": False, "sortOrder": 2},
                            {"content": "c. f (生け花) - ① 電話でお願いする", "correct": False, "sortOrder": 3},
                            {"content": "d. g (交流センター) - ③ ビデオを貸してもらう", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) 生け花について知りたい時、カリナさんはどこへ行き、どうしたらいいですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-4 (Đáp án: f ① - 生け花 / 電話でお願いする)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. f (生け花) - ① 電話でお願いする", "correct": True, "sortOrder": 1},
                            {"content": "b. f (生け花) - ④ 紹介してもらう", "correct": False, "sortOrder": 2},
                            {"content": "c. h (お寺) - ④ 紹介してもらう", "correct": False, "sortOrder": 3},
                            {"content": "d. g (交流センター) - ③ ビデオを貸してもらう", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) 歌舞伎について知りたい時、カリナさんはどこへ行き、どうしたらいいですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-4 (Đáp án: g ③ - 交流センター / ビデオを貸してもらう)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. g (交流センター) - ③ ビデオを貸してもらう", "correct": True, "sortOrder": 1},
                            {"content": "b. g (交流センター) - ⑤ 買う", "correct": False, "sortOrder": 2},
                            {"content": "c. f (生け花) - ① 電話でお願いする", "correct": False, "sortOrder": 3},
                            {"content": "d. h (お寺) - ④ 紹介してもらう", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # -------------------------------------------------------------
    # Lesson 27 (CD A-5 to A-8)
    # -------------------------------------------------------------
    lessons.append({
        "lessonNumber": 27,
        "items": [
            {
                "title": "Bài 27 - Track A-5: 可能動詞 (CD A-5)",
                "audioUrl": "/audio/n4/lesson-27/listening-01.mp3",
                "transcript": "Kịch bản nghe Bài 27 Track A-5",
                "description": "Bài tập 1: 留学生が映画を作ります。どの仕事をだれがしますか。(Track A-5)",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) (1) カメラの仕事はだれがしますか。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-5 (Đáp án: ① b - タワポン / ビデオが撮れる)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. ① タワポン - b. ビデオが撮れる", "correct": True, "sortOrder": 1},
                            {"content": "b. ② キム - d. 速く走れる", "correct": False, "sortOrder": 2},
                            {"content": "c. ⑥ エド - f. 剣道ができる", "correct": False, "sortOrder": 3},
                            {"content": "d. ④ カリナ - e. 絵がかける", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) (2) 侍(さむらい)の役はだれがしますか。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-5 (Đáp án: ⑥ f - エド / 剣道ができる)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. ⑥ エド - f. 剣道ができる", "correct": True, "sortOrder": 1},
                            {"content": "b. ⑤ ジャン - c. 高い声で話せる", "correct": False, "sortOrder": 2},
                            {"content": "c. ② キム - d. 速く走れる", "correct": False, "sortOrder": 3},
                            {"content": "d. ① タワポン - b. ビデオが撮れる", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) (3) お姫様(おひめさま)の役はだれがしますか。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-5 (Đáp án: ⑤ c - ジャン / 高い声で話せる)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. ⑤ ジャン - c. 高い声で話せる", "correct": True, "sortOrder": 1},
                            {"content": "b. ④ カリナ - e. 絵がかける", "correct": False, "sortOrder": 2},
                            {"content": "c. ⑥ エド - f. 剣道ができる", "correct": False, "sortOrder": 3},
                            {"content": "d. ② キム - d. 速く走れる", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "4) (4) 忍者(にんじゃ)の役はだれがしますか。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-5 (Đáp án: ② d - キム / 速く走れる)",
                        "sortOrder": 4,
                        "options": [
                            {"content": "a. ② キム - d. 速く走れる", "correct": True, "sortOrder": 1},
                            {"content": "b. ① タワポン - b. ビデオが撮れる", "correct": False, "sortOrder": 2},
                            {"content": "c. ④ カリナ - e. 絵がかける", "correct": False, "sortOrder": 3},
                            {"content": "d. ⑤ ジャン - c. 高い声で話せる", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "5) (5) メイク(化粧)の仕事はだれがしますか。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-5 (Đáp án: ④ e - カリナ / 絵がかける)",
                        "sortOrder": 5,
                        "options": [
                            {"content": "a. ④ カリナ - e. 絵がかける", "correct": True, "sortOrder": 1},
                            {"content": "b. ⑤ ジャン - c. 高い声で話せる", "correct": False, "sortOrder": 2},
                            {"content": "c. ② キム - d. 速く走れる", "correct": False, "sortOrder": 3},
                            {"content": "d. ⑥ エド - f. 剣道ができる", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 27 - Track A-6: (場所)で／に [可能動詞] (CD A-6)",
                "audioUrl": "/audio/n4/lesson-27/listening-02.mp3",
                "transcript": "Kịch bản nghe Bài 27 Track A-6",
                "description": "Bài tập 2: 会社の寮でできることは何ですか。できないとき、どうしますか。(Track A-6)",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 部屋で料理をすることができますか。できないときどうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-6 (Đáp án: × → 食堂の隣の小さいキッチンでする)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. できます (〇)", "correct": False, "sortOrder": 1},
                            {"content": "b. できません (×) → 食堂の隣の小さいキッチンでします", "correct": True, "sortOrder": 2},
                            {"content": "c. できません (×) → 外食します", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 部屋でパーティーをすることができますか。できないときどうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-6 (Đáp án: × → 食堂でする)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. できます (〇)", "correct": False, "sortOrder": 1},
                            {"content": "b. できません (×) → 食堂でします", "correct": True, "sortOrder": 2},
                            {"content": "c. できません (×) → 部屋の外で静かにします", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "3) 友達が寮に泊まることができますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-6 (Đáp án: 〇 できます)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. できます (〇)", "correct": True, "sortOrder": 1},
                            {"content": "b. できません (×)", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 27 - Track A-7: 見えます、聞こえます (CD A-7)",
                "audioUrl": "/audio/n4/lesson-27/listening-03.mp3",
                "transcript": "Kịch bản nghe Bài 27 Track A-7",
                "description": "Bài tập 3: 昔、初めてオーストラリアへ行った人は何を見ましたか。何を聞きましたか。(Track A-7)",
                "sortOrder": 3,
                "questions": [
                    {
                        "question": "1) 初めて行った人は何を見ましたか／聞きましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-7 (Đáp án: ④ a. カンガルーを見た)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. ④ カンガルー - a. 見た", "correct": True, "sortOrder": 1},
                            {"content": "b. ④ カンガルー - b. 聞いた", "correct": False, "sortOrder": 2},
                            {"content": "c. ① 鳥 - a. 見た", "correct": False, "sortOrder": 3},
                            {"content": "d. ② 川 - a. 見た", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) 初めて行った人は何を見ましたか／聞きましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-7 (Đáp án: ① b. 鳥の声を「聞いて、見た」)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. ① 鳥 - a. 見て、聞いた", "correct": False, "sortOrder": 1},
                            {"content": "b. ① 鳥 - b. 聞いて、見た", "correct": True, "sortOrder": 2},
                            {"content": "c. ② 川 - a. 見て、聞いた", "correct": False, "sortOrder": 3},
                            {"content": "d. ④ カンガルー - b. 聞いて、見た", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) 初めて行った人は何を見ましたか／聞きましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-7 (Đáp án: ② a. 川を見た)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. ② 川 - a. 見た", "correct": True, "sortOrder": 1},
                            {"content": "b. ② 川 - b. 聞いた", "correct": False, "sortOrder": 2},
                            {"content": "c. ⑤ 家 - a. 見た", "correct": False, "sortOrder": 3},
                            {"content": "d. ① 鳥 - b. 聞いた", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 27 - Track A-8: 総合問題 (CD A-8)",
                "audioUrl": "/audio/n4/lesson-27/listening-04.mp3",
                "transcript": "Kịch bản nghe Bài 27 Track A-8",
                "description": "Bài tập 4: ミラーさんは旅行に行きました。ミラーさんのメールを書いてください。(Track A-8)",
                "sortOrder": 4,
                "questions": [
                    {
                        "question": "1) メール本文 (1)〜(2): 「新しい建物にはエレベーターが (①) が、古い建物には階段しか (②)。」に入る言葉は？",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-8 (Đáp án: ①あります / ②ありません)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. ① あります / ② ありません", "correct": True, "sortOrder": 1},
                            {"content": "b. ① ありません / ② あります", "correct": False, "sortOrder": 2},
                            {"content": "c. ① できます / ② できません", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) メール本文 (3)〜(5): 「温泉からは富士山が (③) が、(④) の窓からは富士山が見えます。鳥の声も (⑤)。」に入る言葉は？",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-8 (Đáp án: ③見えません / ④部屋 / ⑤聞こえます)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. ③ 見えません / ④ 部屋 / ⑤ 聞こえます", "correct": True, "sortOrder": 1},
                            {"content": "b. ③ 見えます / ④ ロビー / ⑤ 聞こえません", "correct": False, "sortOrder": 2},
                            {"content": "c. ③ ありません / ④ 部屋 / ⑤ あります", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "3) メール本文 (6)〜(8): 「でも、ちょっとサービスが (⑥) んです。クリーニングはなかなか (⑦) でした。ルームサービスはサンドイッチしか (⑧) でした。」に入る言葉は？",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 27 Track A-8 (Đáp án: ⑥悪い・よくない / ⑦できません / ⑧できません)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. ⑥ 悪い(よくない) / ⑦ できません / ⑧ できません", "correct": True, "sortOrder": 1},
                            {"content": "b. ⑥ いい / ⑦ できます / ⑧ できます", "correct": False, "sortOrder": 2},
                            {"content": "c. ⑥ 悪い / ⑦ ありません / ⑧ ありません", "correct": False, "sortOrder": 3}
                        ]
                    }
                ]
            }
        ]
    })

    # -------------------------------------------------------------
    # Lesson 28 (CD A-9 to A-12)
    # -------------------------------------------------------------
    lessons.append({
        "lessonNumber": 28,
        "items": [
            {
                "title": "Bài 28 - Track A-9: ～ながら～ (CD A-9)",
                "audioUrl": "/audio/n4/lesson-28/listening-01.mp3",
                "transcript": "Kịch bản nghe Bài 28 Track A-9",
                "description": "Bài tập 1: 先生が学生に注意します。学生はどうしますか。(Track A-9)",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 先生が注意した後、学生はどうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 28 Track A-9 (Đáp án: a)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. 携帯電話を見ながら書くのをやめて、前を見て書く (a)", "correct": True, "sortOrder": 1},
                            {"content": "b. 机に伏せて寝る (b)", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 先生が注意した後、学生はどうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 28 Track A-9 (Đáp án: b)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. 音楽を聴きながら勉強を続ける (a)", "correct": False, "sortOrder": 1},
                            {"content": "b. イヤホンを外して勉強する (b)", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 先生が注意した後、学生はどうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 28 Track A-9 (Đáp án: a)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. 原稿を見ないで、前を見てスピーチの練習をする (a)", "correct": True, "sortOrder": 1},
                            {"content": "b. 下を向いて原稿を読みながら練習する (b)", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 28 - Track A-10: ～ながら～ (CD A-10)",
                "audioUrl": "/audio/n4/lesson-28/listening-02.mp3",
                "transcript": "Kịch bản nghe Bài 28 Track A-10",
                "description": "Bài tập 2: おじいさんはどんな生活をしましたか。どちらですか。(Track A-10)",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) (1) おじいさんは学生の時どんな生活をしましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 28 Track A-10 (Đáp án: a. 昼働きながら夜勉強した)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. 昼働きながら、夜勉強した (a)", "correct": True, "sortOrder": 1},
                            {"content": "b. 昼勉強しながら、夜遊んだ (b)", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) (2) 船の上でどんな生活をしましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 28 Track A-10 (Đáp án: a. 船の掃除をしながら外国語を勉強した)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. 船の掃除をしながら外国語を勉強した (a)", "correct": True, "sortOrder": 1},
                            {"content": "b. 船の上で寝てばかりいた (b)", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) (3) 外国へ行ってからどんな生活をしましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 28 Track A-10 (Đáp án: b. フランスで柔道を教えながら生活した)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. フランス語を学校で習いながら暮らした (a)", "correct": False, "sortOrder": 1},
                            {"content": "b. 柔道を教えながら暮らした (b)", "correct": True, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 28 - Track A-11: ～ています(習慣) (CD A-11)",
                "audioUrl": "/audio/n4/lesson-28/listening-03.mp3",
                "transcript": "Kịch bản nghe Bài 28 Track A-11",
                "description": "Bài tập 3: 学生の食事についてアンケートをします。学生の答えを書いてください。(Track A-11)",
                "sortOrder": 3,
                "questions": [
                    {
                        "question": "1) 昼ごはんについて、学生はどう答えていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 28 Track A-11 (Đáp án: a. 毎日 / 大学の食堂 / カレー)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. a. 毎日、大学の食堂でラーメンやカレーを食べる", "correct": True, "sortOrder": 1},
                            {"content": "b. b. 時々、うちでパンを食べる", "correct": False, "sortOrder": 2},
                            {"content": "c. c. 全然食べない", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 晩ごはんについて、学生はどう答えていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 28 Track A-11 (Đáp án: a. 毎日 / うち / b. 時々料理する)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. a. 毎日、うちで食べる。時々自分で料理する (b. 時々)", "correct": True, "sortOrder": 1},
                            {"content": "b. b. 時々、外食する。毎日自分で料理する", "correct": False, "sortOrder": 2},
                            {"content": "c. a. 毎日、コンビニで買って食堂で食べる", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "3) 普段の買い物はどこでしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 28 Track A-11 (Đáp án: b. コンビニ)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. スーパー", "correct": False, "sortOrder": 1},
                            {"content": "b. コンビニ", "correct": True, "sortOrder": 2},
                            {"content": "c. その他", "correct": False, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 28 - Track A-12: ～し、～し、～ (CD A-12)",
                "audioUrl": "/audio/n4/lesson-28/listening-04.mp3",
                "transcript": "Kịch bản nghe Bài 28 Track A-12",
                "description": "Bài tập 4: 会社の人はどちらを選びましたか。どうしてですか。(Track A-12)",
                "sortOrder": 4,
                "questions": [
                    {
                        "question": "1) 社員旅行の行き先はどちらに決まりましたか。選んだ理由は何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 28 Track A-12 (Đáp án: a. 北海道 / ① a. 紅葉がきれい / ② b. 魚がおいしい)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. a. 北海道 (紅葉がきれいだし、魚もおいしいから)", "correct": True, "sortOrder": 1},
                            {"content": "b. b. 沖縄 (海がきれいだし、肉がおいしいから)", "correct": False, "sortOrder": 2},
                            {"content": "c. a. 北海道 (温泉があるし、物価が安いから)", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 製品のコマーシャルに出る人はどちらを選びましたか。選んだ理由は何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 28 Track A-12 (Đáp án: a. ヤッホー / ① b. ダンスと歌が上手 / ② b. 将来がある)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. a. ヤッホー (ダンスと歌が上手だし、将来性があるから)", "correct": True, "sortOrder": 1},
                            {"content": "b. b. スキップ (経験があるし、今とても人気があるから)", "correct": False, "sortOrder": 2},
                            {"content": "c. a. ヤッホー (人気があるし、ギャラが安いから)", "correct": False, "sortOrder": 3}
                        ]
                    }
                ]
            }
        ]
    })

    # -------------------------------------------------------------
    # Lesson 29 (CD A-13 to A-17)
    # -------------------------------------------------------------
    lessons.append({
        "lessonNumber": 29,
        "items": [
            {
                "title": "Bài 29 - Track A-13: ～が～ています (CD A-13)",
                "audioUrl": "/audio/n4/lesson-29/listening-01.mp3",
                "transcript": "Kịch bản nghe Bài 29 Track A-13",
                "description": "Bài tập 1: 友達がいずみさんに注意しました。いずみさんはどうしますか。(Track A-13)",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) リュックについて注意された後、いずみさんはどうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-13 (Đáp án: b. ポケットが開いているので閉める)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. そのままにしておく (a)", "correct": False, "sortOrder": 1},
                            {"content": "b. ファスナーを閉める (b)", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) シャツについて注意された後、いずみさんはどうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-13 (Đáp án: b. ボタンが外れているので留める)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. ボタンを外す (a)", "correct": False, "sortOrder": 1},
                            {"content": "b. ボタンを留める (b)", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 口元について注意された後、いずみさんはどうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-13 (Đáp án: a. 口の周りをハンカチで拭く)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. 口の周りをハンカチで拭く (a)", "correct": True, "sortOrder": 1},
                            {"content": "b. 水を飲む (b)", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 29 - Track A-14: ～は～ています (CD A-14)",
                "audioUrl": "/audio/n4/lesson-29/listening-02.mp3",
                "transcript": "Kịch bản nghe Bài 29 Track A-14",
                "description": "Bài tập 2: 店の人はどうして「こちらのをどうぞ」と言いましたか。(Track A-14)",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 紙袋について、店の人はどうして交換してくれましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-14 (Đáp án: a. 袋の下が破れているから)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. 底が破れているから (a)", "correct": True, "sortOrder": 1},
                            {"content": "b. 持ち手が切れているから (b)", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 箸について、店の人はどうして交換してくれましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-14 (Đáp án: b. 箸が折れているから)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. 箸が曲がっているから (a)", "correct": False, "sortOrder": 1},
                            {"content": "b. 箸が折れているから (b)", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) セーターについて、店の人はどうして交換してくれましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-14 (Đáp án: b. 汚れているから)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. 糸がほつれているから (a)", "correct": False, "sortOrder": 1},
                            {"content": "b. 汚れているから (b)", "correct": True, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 29 - Track A-15: ～てしまいました (CD A-15)",
                "audioUrl": "/audio/n4/lesson-29/listening-03.mp3",
                "transcript": "Kịch bản nghe Bài 29 Track A-15",
                "description": "Bài tập 3: タワポンさんはすごい人です。どうしてすごい人ですか。(Track A-15)",
                "sortOrder": 3,
                "questions": [
                    {
                        "question": "1) タワポンさんはスピーチについて何をしてしまいましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-15 (Đáp án: 1時間でスピーチを覚えた)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. 1時間でスピーチを全部覚えてしまった", "correct": True, "sortOrder": 1},
                            {"content": "b. 3時間でスピーチの原稿を書いた", "correct": False, "sortOrder": 2},
                            {"content": "c. 10分でスピーチを忘れてしまった", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) タワポンさんはレポートについて何をしてしまいましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-15 (Đáp án: 2日でレポート/宿題を書いた/やった)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. 2日で大変なレポート(宿題)を全部書いてしまった", "correct": True, "sortOrder": 1},
                            {"content": "b. 5日かかってレポートをあきらめた", "correct": False, "sortOrder": 2},
                            {"content": "c. 2週間レポートを出さなかった", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "3) タワポンさんは本について何をしてしまいましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-15 (Đáp án: 1週間で本を全部読んだ)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. 1週間で難しい本を全部読んでしまった", "correct": True, "sortOrder": 1},
                            {"content": "b. 1か月で本を1冊買った", "correct": False, "sortOrder": 2},
                            {"content": "c. 3日で本をなくしてしまった", "correct": False, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 29 - Track A-16: ～てしまいます (CD A-16)",
                "audioUrl": "/audio/n4/lesson-29/listening-04.mp3",
                "transcript": "Kịch bản nghe Bài 29 Track A-16",
                "description": "Bài tập 4: ミラーさんはこれからどうしますか。(Track A-16)",
                "sortOrder": 4,
                "questions": [
                    {
                        "question": "1) ミラーさんはこの後どうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-16 (Đáp án: b)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. 会社に戻って仕事をする (a)", "correct": False, "sortOrder": 1},
                            {"content": "b. カフェでコーヒーを飲んで一息つく (b)", "correct": True, "sortOrder": 2},
                            {"content": "c. 友達と食事に行く (c)", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 出張前のミラーさんはどうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-16 (Đáp án: c)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. すぐに空港へ向かう (a)", "correct": False, "sortOrder": 1},
                            {"content": "b. 同僚と出かける (b)", "correct": False, "sortOrder": 2},
                            {"content": "c. 会社で残った資料の確認・片づけをしてしまう (c)", "correct": True, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 29 - Track A-17: ～てしまいました(残念なこと) (CD A-17)",
                "audioUrl": "/audio/n4/lesson-29/listening-05.mp3",
                "transcript": "Kịch bản nghe Bài 29 Track A-17",
                "description": "Bài tập 5: エドさんはよく小さい失敗をします。何をしましたか。どうしますか。(Track A-17)",
                "sortOrder": 5,
                "questions": [
                    {
                        "question": "1) エドさんは何をどうしてしまいましたか。その後どうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-17 (Đáp án: e まちがえた ① すぐ電話をかける)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. e (かばん) をまちがえてしまった → ① すぐ電話をかける", "correct": True, "sortOrder": 1},
                            {"content": "b. e (かばん) を忘れてしまった → ③ すぐ寮へ帰る", "correct": False, "sortOrder": 2},
                            {"content": "c. c (携帯) をなくしてしまった → ② すぐ新しいのを買う", "correct": False, "sortOrder": 3},
                            {"content": "d. b (レポート) を忘れてしまった → ④ すぐ図書館へ行く", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) エドさんは何をどうしてしまいましたか。その後どうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 29 Track A-17 (Đáp án: c 落とした ② すぐ新しいのを買う)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. c (携帯) を落として壊してしまった → ② すぐ新しいのを買う", "correct": True, "sortOrder": 1},
                            {"content": "b. c (携帯) をなくしてしまった → ① すぐ電話をかける", "correct": False, "sortOrder": 2},
                            {"content": "c. d (カード) を落とした → ③ すぐ寮へ帰る", "correct": False, "sortOrder": 3},
                            {"content": "d. a (本) をなくしてしまった → ④ すぐ図書館へ行く", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # -------------------------------------------------------------
    # Lesson 30 (CD A-18 to A-21)
    # -------------------------------------------------------------
    lessons.append({
        "lessonNumber": 30,
        "items": [
            {
                "title": "Bài 30 - Track A-18: ～が～てあります (CD A-18)",
                "audioUrl": "/audio/n4/lesson-30/listening-01.mp3",
                "transcript": "Kịch bản nghe Bài 30 Track A-18",
                "description": "Bài tập 1: 学生寮はどんな問題がありますか。その問題をどうしますか。(Track A-18)",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 学生寮のどんな問題に対してどうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 30 Track A-18 (Đáp án: d ⑥ カーテンが汚れている / 洗う)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. d (カーテンが汚れている) → ⑥ 洗う", "correct": True, "sortOrder": 1},
                            {"content": "b. e (掲示が古い) → ② 捨てる", "correct": False, "sortOrder": 2},
                            {"content": "c. c (雑誌が散らかっている) → ③ 片づけてもらう", "correct": False, "sortOrder": 3},
                            {"content": "d. a (自転車の放置) → ④ 名前をロビーにはる", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) 学生寮のどんな問題に対してどうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 30 Track A-18 (Đáp án: e ② 古い案内・紙が貼ってある / 捨てる)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. e (壁の古い掲示) → ② 捨てる・剥がす", "correct": True, "sortOrder": 1},
                            {"content": "b. d (カーテン) → ⑥ 洗う", "correct": False, "sortOrder": 2},
                            {"content": "c. c (本・荷物) → ③ 片づけてもらう", "correct": False, "sortOrder": 3},
                            {"content": "d. b (机の上) → ⑤ 並べる", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) 学生寮のどんな問題に対してどうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 30 Track A-18 (Đáp án: c ③ 廊下に本が積んである / 片づけてもらう)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. c (廊下に本が積んである) → ③ 片づけてもらう", "correct": True, "sortOrder": 1},
                            {"content": "b. d (カーテン) → ⑥ 洗う", "correct": False, "sortOrder": 2},
                            {"content": "c. e (古い掲示) → ② 捨てる", "correct": False, "sortOrder": 3},
                            {"content": "d. a (自転車) → ① 取る", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 30 - Track A-19: ～が～てあります (CD A-19)",
                "audioUrl": "/audio/n4/lesson-30/listening-02.mp3",
                "transcript": "Kịch bản nghe Bài 30 Track A-19",
                "description": "Bài tập 2: 今、クララさんがいる茶室はどれですか。(Track A-19)",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) クララさんが案内された茶室はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 30 Track A-19 (Đáp án: b)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. aの茶室", "correct": False, "sortOrder": 1},
                            {"content": "b. bの茶室 (掛け軸に「はる」と書いてあり、花が生けてある)", "correct": True, "sortOrder": 2},
                            {"content": "c. cの茶室", "correct": False, "sortOrder": 3},
                            {"content": "d. dの茶室", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 30 - Track A-20: ～は～てあります (CD A-20)",
                "audioUrl": "/audio/n4/lesson-30/listening-03.mp3",
                "transcript": "Kịch bản nghe Bài 30 Track A-20",
                "description": "Bài tập 3: スピーチコンテストの準備をしています。何がどこにありますか。(Track A-20)",
                "sortOrder": 3,
                "questions": [
                    {
                        "question": "1) マイクとスピーチをする人の名前はどこにどうしてありますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 30 Track A-20 (Đáp án: a 置いて / b はって)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. マイクは (a) に置いてあり、名前は (b) にはってある", "correct": True, "sortOrder": 1},
                            {"content": "b. マイクは (d) に置いてあり、名前は (e) に掛けてある", "correct": False, "sortOrder": 2},
                            {"content": "c. マイクは (c) にしまってあり、名前は (a) に置いてある", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) プログラムと意見を書く紙と鉛筆はどこにどうしてありますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 30 Track A-20 (Đáp án: g 置いて)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. (g 受付) に置いてある", "correct": True, "sortOrder": 1},
                            {"content": "b. (e 棚) に飾ってある", "correct": False, "sortOrder": 2},
                            {"content": "c. (f 廊下) に並べてある", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "3) 電子辞書と本のカードはどこにどうしてありますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 30 Track A-20 (Đáp án: e しまって)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. (e 棚の中) にしまってある", "correct": True, "sortOrder": 1},
                            {"content": "b. (a 演台) に出してある", "correct": False, "sortOrder": 2},
                            {"content": "c. (b 壁) に掛けてある", "correct": False, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 30 - Track A-21: ～ておきます (CD A-21)",
                "audioUrl": "/audio/n4/lesson-30/listening-04.mp3",
                "transcript": "Kịch bản nghe Bài 30 Track A-21",
                "description": "Bài tập 4: ロボットと旅行に行きます。アイモは次のことをしますか。(Track A-21)",
                "sortOrder": 4,
                "questions": [
                    {
                        "question": "1) パスポートについて、アイモはどうしておきますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 30 Track A-21 (Đáp án: a. × / b. 〇)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. a. ポケットに入れておく", "correct": False, "sortOrder": 1},
                            {"content": "b. b. かばんに入れて準備しておく (〇)", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 部屋の窓とカーテンについて、アイモはどうしておきますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 30 Track A-21 (Đáp án: a. × / b. 〇)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. a. カーテンを開けておく", "correct": False, "sortOrder": 1},
                            {"content": "b. b. カーテンと窓を閉めておく (〇)", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 皿洗いとガイドブックについて、アイモはどうしておきますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 30 Track A-21 (Đáp án: a. 〇 / b. ×)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. a. お皿を洗っておく (〇)", "correct": True, "sortOrder": 1},
                            {"content": "b. b. ガイドブックをしまう", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "4) 充電とお風呂について、アイモはどうしておきますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 30 Track A-21 (Đáp án: a. 〇 / b. ×)",
                        "sortOrder": 4,
                        "options": [
                            {"content": "a. a. 携帯を充電しておく (〇)", "correct": True, "sortOrder": 1},
                            {"content": "b. b. お風呂に入っておく", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "5) レストランの予約について、アイモはどうしておきますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 30 Track A-21 (Đáp án: a. × / b. 〇)",
                        "sortOrder": 5,
                        "options": [
                            {"content": "a. a. そのまま出かける", "correct": False, "sortOrder": 1},
                            {"content": "b. b. 店を予約しておく (〇)", "correct": True, "sortOrder": 2}
                        ]
                    }
                ]
            }
        ]
    })

    # -------------------------------------------------------------
    # Lesson 31 (CD A-22 to A-25)
    # -------------------------------------------------------------
    lessons.append({
        "lessonNumber": 31,
        "items": [
            {
                "title": "Bài 31 - Track A-22: ～(よ)う (意向形) (CD A-22)",
                "audioUrl": "/audio/n4/lesson-31/listening-01.mp3",
                "transcript": "Kịch bản nghe Bài 31 Track A-22",
                "description": "Bài tập 1: 意向形の聞き取り練習 (Track A-22)",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 会話の内容に合っている行動はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 31 Track A-22 (Đáp án: a, b)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. a と b の両方をする", "correct": True, "sortOrder": 1},
                            {"content": "b. a だけをする", "correct": False, "sortOrder": 2},
                            {"content": "c. b だけをする", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 会話の内容に合っている行動はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 31 Track A-22 (Đáp án: b)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. a の行動", "correct": False, "sortOrder": 1},
                            {"content": "b. b の行動", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 会話の内容に合っている行動はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 31 Track A-22 (Đáp án: a)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. a の行動", "correct": True, "sortOrder": 1},
                            {"content": "b. b の行動", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 31 - Track A-23: ～(よ)うと思っています (CD A-23)",
                "audioUrl": "/audio/n4/lesson-31/listening-02.mp3",
                "transcript": "Kịch bản nghe Bài 31 Track A-23",
                "description": "Bài tập 2: 話す人は何をしようと思っていますか。(Track A-23)",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 話す人は何をしようと思っていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 31 Track A-23 (Đáp án: b)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. aの選択肢", "correct": False, "sortOrder": 1},
                            {"content": "b. bの選択肢", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) 話す人は何をしようと思っていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 31 Track A-23 (Đáp án: a)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. aの選択肢", "correct": True, "sortOrder": 1},
                            {"content": "b. bの選択肢", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) 話す人は何をしようと思っていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 31 Track A-23 (Đáp án: b)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. aの選択肢", "correct": False, "sortOrder": 1},
                            {"content": "b. bの選択肢", "correct": True, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 31 - Track A-24: ～つもりです (CD A-24)",
                "audioUrl": "/audio/n4/lesson-31/listening-03.mp3",
                "transcript": "Kịch bản nghe Bài 31 Track A-24",
                "description": "Bài tập 3: 将来何をするつもりですか。(Track A-24)",
                "sortOrder": 3,
                "questions": [
                    {
                        "question": "1) 1人目の人の将来の計画について正しい組み合わせはどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 31 Track A-24 (Đáp án: ①料理 ②レストラン ③自分の店 ④おいしい料理)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. ①料理学校で習う ②レストランで働く ③自分の店を持つ ④おいしい料理を作る", "correct": True, "sortOrder": 1},
                            {"content": "b. ①ホテルで働く ②外国へ行く ③会社を作る ④本を書く", "correct": False, "sortOrder": 2},
                            {"content": "c. ①大学へ進学する ②研究室で働く ③先生になる ④論文を書く", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 2人目の人の将来の計画について正しい組み合わせはどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 31 Track A-24 (Đáp án: ①はい ②動物 ③動物の病院 ④ことば)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. ①はい(留学する) ②動物を助ける ③動物病院を作る ④動物の言葉を研究する", "correct": True, "sortOrder": 1},
                            {"content": "b. ①いいえ(国へ帰る) ②植物を育てる ③研究所に入る ④薬を開発する", "correct": False, "sortOrder": 2},
                            {"content": "c. ①まだ決まっていない ②会社に入る ③営業をする ④外国語を使う", "correct": False, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 31 - Track A-25: ～予定です (CD A-25)",
                "audioUrl": "/audio/n4/lesson-31/listening-04.mp3",
                "transcript": "Kịch bản nghe Bài 31 Track A-25",
                "description": "Bài tập 4: パーティーは何日の何曜日の予定ですか。(Track A-25)",
                "sortOrder": 4,
                "questions": [
                    {
                        "question": "1) スケジュールを聞いて、パーティーは何日何曜日に決まりましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 31 Track A-25 (Đáp án: 19日 土曜日)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. 12日 土曜日", "correct": False, "sortOrder": 1},
                            {"content": "b. 13日 日曜日", "correct": False, "sortOrder": 2},
                            {"content": "c. 19日 土曜日", "correct": True, "sortOrder": 3},
                            {"content": "d. 20日 日曜日", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # -------------------------------------------------------------
    # Lesson 32 (CD A-26 to A-29)
    # -------------------------------------------------------------
    lessons.append({
        "lessonNumber": 32,
        "items": [
            {
                "title": "Bài 32 - Track A-26: ～たほうがいいです (CD A-26)",
                "audioUrl": "/audio/n4/lesson-32/listening-01.mp3",
                "transcript": "Kịch bản nghe Bài 32 Track A-26",
                "description": "Bài tập 1: アドバイスを聞いて選びます。(Track A-26)",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) どんなアドバイスをしましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 32 Track A-26 (Đáp án: b)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. aの行動", "correct": False, "sortOrder": 1},
                            {"content": "b. bの行動", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) どんなアドバイスをしましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 32 Track A-26 (Đáp án: a)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. aの行動", "correct": True, "sortOrder": 1},
                            {"content": "b. bの行動", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) どんなアドバイスをしましたか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 32 Track A-26 (Đáp án: a)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. aの行動", "correct": True, "sortOrder": 1},
                            {"content": "b. bの行動", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 32 - Track A-27: ～た／～ないほうがいいです (CD A-27)",
                "audioUrl": "/audio/n4/lesson-32/listening-02.mp3",
                "transcript": "Kịch bản nghe Bài 32 Track A-27",
                "description": "Bài tập 2: 地震の準備と対策 (Track A-27)",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 普段の準備として何をしておいたほうがいいですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 32 Track A-27 (Đáp án: a, b)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. aとb (水や非常持ち出し袋の準備)", "correct": True, "sortOrder": 1},
                            {"content": "b. aだけ", "correct": False, "sortOrder": 2},
                            {"content": "c. cだけ", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) もし地震があったら、どうしたほうがいいですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 32 Track A-27 (Đáp án: a, c)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. aとc (頭を守る・火を消す)", "correct": True, "sortOrder": 1},
                            {"content": "b. bとc (外へ飛び出す)", "correct": False, "sortOrder": 2},
                            {"content": "c. aだけ", "correct": False, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 32 - Track A-28: ～でしょう (CD A-28)",
                "audioUrl": "/audio/n4/lesson-32/listening-03.mp3",
                "transcript": "Kịch bản nghe Bài 32 Track A-28",
                "description": "Bài tập 3: 天気予報と予定 (Track A-28)",
                "sortOrder": 3,
                "questions": [
                    {
                        "question": "1) 明日の天気と予定はどうなるでしょう。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 32 Track A-28 (Đáp án: a ②)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. a ② (晴れるでしょう / 予定通り行う)", "correct": True, "sortOrder": 1},
                            {"content": "b. b ① (雨が降るでしょう / 中止する)", "correct": False, "sortOrder": 2},
                            {"content": "c. c ③ (曇るでしょう / 延期する)", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 週末の天気と予定はどうなるでしょう。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 32 Track A-28 (Đáp án: b ①)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. a ② (出かける)", "correct": False, "sortOrder": 1},
                            {"content": "b. b ① (雨になるでしょう / うちにいる)", "correct": True, "sortOrder": 2},
                            {"content": "c. c ③ (雪になるでしょう)", "correct": False, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 32 - Track A-29: ～かもしれません (CD A-29)",
                "audioUrl": "/audio/n4/lesson-32/listening-04.mp3",
                "transcript": "Kịch bản nghe Bài 32 Track A-29",
                "description": "Bài tập 4: どんな可能性があるか予測します。(Track A-29)",
                "sortOrder": 4,
                "questions": [
                    {
                        "question": "1) どんな可能性があると言っていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 32 Track A-29 (Đáp án: 雨が降る b)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. 雨が降るかもしれないので、傘を持っていく (b)", "correct": True, "sortOrder": 1},
                            {"content": "b. 晴れるかもしれないので、帽子をかぶる (a)", "correct": False, "sortOrder": 2},
                            {"content": "c. 風が強いかもしれない (c)", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) どんな可能性があると言っていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 32 Track A-29 (Đáp án: (何か)悪いことがある c)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. いいことがあるかもしれない (a)", "correct": False, "sortOrder": 1},
                            {"content": "b. 間に合わないかもしれない (b)", "correct": False, "sortOrder": 2},
                            {"content": "c. 何か悪いことがあるかもしれない (c)", "correct": True, "sortOrder": 3}
                        ]
                    }
                ]
            }
        ]
    })

    # -------------------------------------------------------------
    # Lesson 33 (CD A-30 to A-33)
    # -------------------------------------------------------------
    lessons.append({
        "lessonNumber": 33,
        "items": [
            {
                "title": "Bài 33 - Track A-30: 命令形 (CD A-30)",
                "audioUrl": "/audio/n4/lesson-33/listening-01.mp3",
                "transcript": "Kịch bản nghe Bài 33 Track A-30",
                "description": "Bài tập 1: 命令形と禁止形の聞き取り (Track A-30)",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) どんな命令・指示を出していますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 33 Track A-30 (Đáp án: a)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. aの指示", "correct": True, "sortOrder": 1},
                            {"content": "b. bの指示", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) どんな命令・指示を出していますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 33 Track A-30 (Đáp án: b)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. aの指示", "correct": False, "sortOrder": 1},
                            {"content": "b. bの指示", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) どんな命令・指示を出していますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 33 Track A-30 (Đáp án: a)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. aの指示", "correct": True, "sortOrder": 1},
                            {"content": "b. bの指示", "correct": False, "sortOrder": 2}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 33 - Track A-31: ～と読みます／～と書いてあります／～という意味です (CD A-31)",
                "audioUrl": "/audio/n4/lesson-33/listening-02.mp3",
                "transcript": "Kịch bản nghe Bài 33 Track A-31",
                "description": "Bài tập 2: マークや漢字の意味 (Track A-31)",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 標識やマークの意味は何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 33 Track A-31 (Đáp án: ⑤ a)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. ⑤ aのマークの意味", "correct": True, "sortOrder": 1},
                            {"content": "b. ④ bのマークの意味", "correct": False, "sortOrder": 2},
                            {"content": "c. ② bのマークの意味", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 標識やマークの意味は何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 33 Track A-31 (Đáp án: ④ b)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. ⑤ aのマークの意味", "correct": False, "sortOrder": 1},
                            {"content": "b. ④ bのマークの意味", "correct": True, "sortOrder": 2},
                            {"content": "c. ② bのマークの意味", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "3) 標識やマークの意味は何ですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 33 Track A-31 (Đáp án: ② b)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. ⑤ aのマークの意味", "correct": False, "sortOrder": 1},
                            {"content": "b. ② bのマークの意味", "correct": True, "sortOrder": 2},
                            {"content": "c. ① aのマークの意味", "correct": False, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 33 - Track A-32: ～という意味です (CD A-32)",
                "audioUrl": "/audio/n4/lesson-33/listening-03.mp3",
                "transcript": "Kịch bản nghe Bài 33 Track A-32",
                "description": "Bài tập 3: 言葉の意味の説明を聞き取ります。(Track A-32)",
                "sortOrder": 3,
                "questions": [
                    {
                        "question": "1) 説明されている言葉の意味はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 33 Track A-32 (Đáp án: e)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. aの意味", "correct": False, "sortOrder": 1},
                            {"content": "b. cの意味", "correct": False, "sortOrder": 2},
                            {"content": "c. eの意味", "correct": True, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 説明されている言葉の意味はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 33 Track A-32 (Đáp án: a)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. aの意味", "correct": True, "sortOrder": 1},
                            {"content": "b. bの意味", "correct": False, "sortOrder": 2},
                            {"content": "c. dの意味", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "3) 説明されている言葉の意味はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 33 Track A-32 (Đáp án: c)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. aの意味", "correct": False, "sortOrder": 1},
                            {"content": "b. bの意味", "correct": False, "sortOrder": 2},
                            {"content": "c. cの意味", "correct": True, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 33 - Track A-33: ～と伝えていただけませんか (CD A-33)",
                "audioUrl": "/audio/n4/lesson-33/listening-04.mp3",
                "transcript": "Kịch bản nghe Bài 33 Track A-33",
                "description": "Bài tập 4: 伝言の聞き取り (Track A-33)",
                "sortOrder": 4,
                "questions": [
                    {
                        "question": "1) 何と伝えてほしいと言っていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 33 Track A-33 (Đáp án: b)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. aの伝言", "correct": False, "sortOrder": 1},
                            {"content": "b. bの伝言", "correct": True, "sortOrder": 2},
                            {"content": "c. cの伝言", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 何と伝えてほしいと言っていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 33 Track A-33 (Đáp án: c)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. aの伝言", "correct": False, "sortOrder": 1},
                            {"content": "b. bの伝言", "correct": False, "sortOrder": 2},
                            {"content": "c. cの伝言", "correct": True, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "3) 何と伝えてほしいと言っていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 33 Track A-33 (Đáp án: c)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. aの伝言", "correct": False, "sortOrder": 1},
                            {"content": "b. bの伝言", "correct": False, "sortOrder": 2},
                            {"content": "c. cの伝言", "correct": True, "sortOrder": 3}
                        ]
                    }
                ]
            }
        ]
    })

    # -------------------------------------------------------------
    # Lesson 34 (CD A-34 to A-37)
    # -------------------------------------------------------------
    lessons.append({
        "lessonNumber": 34,
        "items": [
            {
                "title": "Bài 34 - Track A-34: ～とおりに (CD A-34)",
                "audioUrl": "/audio/n4/lesson-34/listening-01.mp3",
                "transcript": "Kịch bản nghe Bài 34 Track A-34",
                "description": "Bài tập 1: 説明のとおりに動きます。(Track A-34)",
                "sortOrder": 1,
                "questions": [
                    {
                        "question": "1) 説明のとおりの動作・結果はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-34 (Đáp án: b)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. aの図", "correct": False, "sortOrder": 1},
                            {"content": "b. bの図", "correct": True, "sortOrder": 2},
                            {"content": "c. cの図", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 説明のとおりの動作・結果はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-34 (Đáp án: a)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. aの図", "correct": True, "sortOrder": 1},
                            {"content": "b. bの図", "correct": False, "sortOrder": 2},
                            {"content": "c. cの図", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "3) 説明のとおりの動作・結果はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-34 (Đáp án: c)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. aの図", "correct": False, "sortOrder": 1},
                            {"content": "b. bの図", "correct": False, "sortOrder": 2},
                            {"content": "c. cの図", "correct": True, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 34 - Track A-35: ～あとで、～ (CD A-35)",
                "audioUrl": "/audio/n4/lesson-34/listening-02.mp3",
                "transcript": "Kịch bản nghe Bài 34 Track A-35",
                "description": "Bài tập 2: 料理の手順の順番 (Track A-35)",
                "sortOrder": 2,
                "questions": [
                    {
                        "question": "1) 手順 3〜6 の正しい順番はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-35 (Đáp án: 3.c, 4.f, 5.e, 6.g)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. 3.c → 4.f → 5.e → 6.g", "correct": True, "sortOrder": 1},
                            {"content": "b. 3.f → 4.c → 5.g → 6.e", "correct": False, "sortOrder": 2},
                            {"content": "c. 3.e → 4.g → 5.c → 6.f", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) 手順 8〜9 の正しい順番はどれですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-35 (Đáp án: 8.d, 9.h)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. 8.d → 9.h", "correct": True, "sortOrder": 1},
                            {"content": "b. 8.h → 9.d", "correct": False, "sortOrder": 2},
                            {"content": "c. 8.a → 9.b", "correct": False, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 34 - Track A-36: ～て／～ないで～ (CD A-36)",
                "audioUrl": "/audio/n4/lesson-34/listening-03.mp3",
                "transcript": "Kịch bản nghe Bài 34 Track A-36",
                "description": "Bài tập 3: どのようにするか選びます。(Track A-36)",
                "sortOrder": 3,
                "questions": [
                    {
                        "question": "1) どのようにしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-36 (Đáp án: c)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. aのやり方", "correct": False, "sortOrder": 1},
                            {"content": "b. bのやり方", "correct": False, "sortOrder": 2},
                            {"content": "c. cのやり方", "correct": True, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "2) どのようにしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-36 (Đáp án: b)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. aのやり方", "correct": False, "sortOrder": 1},
                            {"content": "b. bのやり方", "correct": True, "sortOrder": 2},
                            {"content": "c. cのやり方", "correct": False, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "3) どのようにしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-36 (Đáp án: c)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. aのやり方", "correct": False, "sortOrder": 1},
                            {"content": "b. bのやり方", "correct": False, "sortOrder": 2},
                            {"content": "c. cのやり方", "correct": True, "sortOrder": 3}
                        ]
                    },
                    {
                        "question": "4) どのようにしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-36 (Đáp án: a)",
                        "sortOrder": 4,
                        "options": [
                            {"content": "a. aのやり方", "correct": True, "sortOrder": 1},
                            {"content": "b. bのやり方", "correct": False, "sortOrder": 2},
                            {"content": "c. cのやり方", "correct": False, "sortOrder": 3}
                        ]
                    }
                ]
            },
            {
                "title": "Bài 34 - Track A-37: ～ないで、～ (CD A-37)",
                "audioUrl": "/audio/n4/lesson-34/listening-04.mp3",
                "transcript": "Kịch bản nghe Bài 34 Track A-37",
                "description": "Bài tập 4: 会話の内容と合っているか判断します。(Track A-37)",
                "sortOrder": 4,
                "questions": [
                    {
                        "question": "1) (1) の内容は合っていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-37 (Đáp án: ×)",
                        "sortOrder": 1,
                        "options": [
                            {"content": "a. 正しい (〇)", "correct": False, "sortOrder": 1},
                            {"content": "b. 間違い (×)", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "2) (2) の内容は合っていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-37 (Đáp án: 〇)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. 正しい (〇)", "correct": True, "sortOrder": 1},
                            {"content": "b. 間違い (×)", "correct": False, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "3) (3) の内容は合っていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-37 (Đáp án: ×)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. 正しい (〇)", "correct": False, "sortOrder": 1},
                            {"content": "b. 間違い (×)", "correct": True, "sortOrder": 2}
                        ]
                    },
                    {
                        "question": "4) (4) の内容は合っていますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 34 Track A-37 (Đáp án: ×)",
                        "sortOrder": 4,
                        "options": [
                            {"content": "a. 正しい (〇)", "correct": False, "sortOrder": 1},
                            {"content": "b. 間違い (×)", "correct": True, "sortOrder": 2}
                        ]
                    }
                ]
            }
        ]
    })

    return lessons
