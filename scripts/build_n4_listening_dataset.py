import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Definition of the complete N4 Listening dataset for Lessons 26-50 (104 tracks)
# Sourced directly from:
# 1. Nghe N4.pdf (Tasks p.2 - p.51)
# 2. ĐÁP ÁN CHOUKAI TASUKU N4.pdf (Pages 78-82, Answers for Lessons 26-50)
# 3. Choukai N4 CD A (Tracks A-1 to A-37), CD B (Tracks B-1 to B-32), CD C (Tracks C-1 to C-35)

def build_dataset():
    data = []

    # =========================================================================
    # BÀI 26 (CD A-1 to A-4)
    # =========================================================================
    data.append({
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
                            {"content": "a. 忙しい - コピー・資料の準備 (a ④)", "correct": False, "sortOrder": 1},
                            {"content": "b. 元気 - 子どもが生まれた (b ⑤)", "correct": False, "sortOrder": 2},
                            {"content": "c. 怒っている - 予定が狂った (c ②)", "correct": False, "sortOrder": 3},
                            {"content": "d. 調子が悪い - うちでアメリカ出張の準備をしていた (d ③)", "correct": True, "sortOrder": 4},
                            {"content": "e. 眠い - 朝までお酒を飲んだ (e ①)", "correct": False, "sortOrder": 5}
                        ]
                    },
                    {
                        "question": "2) 小森さんはどうですか。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-1 (Đáp án: e ① 眠い / 朝3時まで友達とお酒を飲んだ)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. 忙しい - コピー・資料の準備 (a ④)", "correct": False, "sortOrder": 1},
                            {"content": "b. 元気 - 子どもが生まれた (b ⑤)", "correct": False, "sortOrder": 2},
                            {"content": "c. 怒っている - 予定が狂った (c ②)", "correct": False, "sortOrder": 3},
                            {"content": "d. 調子が悪い - 出張の準備 (d ③)", "correct": False, "sortOrder": 4},
                            {"content": "e. 眠い - 朝3時まで高校の友達とお酒を飲んだ (e ①)", "correct": True, "sortOrder": 5}
                        ]
                    },
                    {
                        "question": "3) 小森さんはどうですか。どうしてですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-1 (Đáp án: b ⑤ 元気 - きのうの晩、女の子が生まれた)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. 忙しい - コピー・資料の準備 (a ④)", "correct": False, "sortOrder": 1},
                            {"content": "b. 元気 - きのうの晩、女の子が生まれた (b ⑤)", "correct": True, "sortOrder": 2},
                            {"content": "c. 怒っている - 予定が狂った (c ②)", "correct": False, "sortOrder": 3},
                            {"content": "d. 調子が悪い - 出張の準備 (d ③)", "correct": False, "sortOrder": 4},
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
                            {"content": "c. ④ 漢字が難しい - a. 鈴木さんと探す", "correct": False, "sortOrder": 3},
                            {"content": "d. ② ごみの分別 - b. カレンダーを見る", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) チンさんはどんな問題があり、どうしますか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-3 (Đáp án: ④ a - 漢字が読めない / 鈴木さんと探す)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. ④ 漢字が読めない・説明書 - a. 鈴木さんと探す", "correct": True, "sortOrder": 1},
                            {"content": "b. ④ 漢字が読めない・説明書 - b. 自分で探す", "correct": False, "sortOrder": 2},
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
                            {"content": "d. ④ 漢字が読めない - a. 鈴木さんと探す", "correct": False, "sortOrder": 4}
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
                            {"content": "c. f (花屋・生け花) - ① 電話でお願いする", "correct": False, "sortOrder": 3},
                            {"content": "d. g (歌舞伎・劇場) - ③ 貸してもらう", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "2) 生け花について知りたい時、カリナさんはどこへ行き、どうしたらいいですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-4 (Đáp án: f ① - 生け花 / 電話でお願いする)",
                        "sortOrder": 2,
                        "options": [
                            {"content": "a. f (生け花・教室) - ① 電話でお願いする", "correct": True, "sortOrder": 1},
                            {"content": "b. f (生け花・教室) - ④ 紹介してもらう", "correct": False, "sortOrder": 2},
                            {"content": "c. h (お寺) - ④ 紹介してもらう", "correct": False, "sortOrder": 3},
                            {"content": "d. g (歌舞伎・劇場) - ③ 貸してもらう", "correct": False, "sortOrder": 4}
                        ]
                    },
                    {
                        "question": "3) 歌舞伎について知りたい時、カリナさんはどこへ行き、どうしたらいいですか。",
                        "questionType": "MULTIPLE_CHOICE",
                        "explanation": "Kịch bản nghe Bài 26 Track A-4 (Đáp án: g ③ - 交流センター・ビデオ / 貸してもらう)",
                        "sortOrder": 3,
                        "options": [
                            {"content": "a. g (交流センター) - ③ ビデオを貸してもらう", "correct": True, "sortOrder": 1},
                            {"content": "b. g (交流センター) - ⑤ 買う", "correct": False, "sortOrder": 2},
                            {"content": "c. f (教室) - ① 電話でお願いする", "correct": False, "sortOrder": 3},
                            {"content": "d. h (お寺) - ④ 紹介してもらう", "correct": False, "sortOrder": 4}
                        ]
                    }
                ]
            }
        ]
    })

    # =========================================================================
    # BÀI 27 (CD A-5 to A-8)
    # =========================================================================
    data.append({
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
                        "explanation": "Kịch bản nghe Bài 27 Track A-6 (Đáp án: × → (食堂の隣の) 小さいキッチンでする)",
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

    return data

print("Script template ready.")
