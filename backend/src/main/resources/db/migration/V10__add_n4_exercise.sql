-- V10__add_n4_exercise.sql
-- Thêm Bài tập N4 (29 bài tập thực hành tổng cộng 168 câu hỏi từ Bài 26 đến Bài 50 và các bài Ôn tập)

-- 1. Đảm bảo Level N4 tồn tại
INSERT INTO levels (code, name, description, sort_order, is_active)
SELECT 'N4', 'N4', 'Trình độ N4 - Sơ trung cấp', 2, TRUE
WHERE NOT EXISTS (SELECT 1 FROM levels WHERE code = 'N4');

-- 2. Đảm bảo 25 bài học N4 (Bài 26 đến Bài 50) tồn tại
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 26, 'Bài 26', 26, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 26);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 27, 'Bài 27', 27, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 27);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 28, 'Bài 28', 28, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 28);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 29, 'Bài 29', 29, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 29);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 30, 'Bài 30', 30, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 30);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 31, 'Bài 31', 31, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 31);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 32, 'Bài 32', 32, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 32);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 33, 'Bài 33', 33, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 33);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 34, 'Bài 34', 34, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 34);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 35, 'Bài 35', 35, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 35);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 36, 'Bài 36', 36, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 36);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 37, 'Bài 37', 37, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 37);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 38, 'Bài 38', 38, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 38);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 39, 'Bài 39', 39, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 39);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 40, 'Bài 40', 40, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 40);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 41, 'Bài 41', 41, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 41);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 42, 'Bài 42', 42, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 42);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 43, 'Bài 43', 43, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 43);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 44, 'Bài 44', 44, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 44);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 45, 'Bài 45', 45, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 45);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 46, 'Bài 46', 46, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 46);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 47, 'Bài 47', 47, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 47);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 48, 'Bài 48', 48, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 48);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 49, 'Bài 49', 49, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 49);
INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) SELECT l.id, 50, 'Bài 50', 50, TRUE FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = 50);

-- 3. Chèn dữ liệu Exercises, Questions, và QuestionOptions
-- =========================================================
-- Exercise: Bài 26 (SortOrder 28, Lesson 26)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 26', 'Bài tập Minna no Nihongo N4 - Bài 26: Thể thông thường + んです, ～んですが, giải thích lý do, yêu cầu giúp đỡ, khuyên bảo', 'LESSON', 'EXERCISE', 28 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 26 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 28);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: シャワー ( の ) お湯 ( が ) 出ません。
1) 9時半 ( 　 ) 新幹線 ( 　 ) 間に合いませんでした。
2) 学校 ( 　 ) 遅れたことがありますか。
3) 気分 ( 　 ) 悪いんですが、帰ってもいいですか。
4) エアコンの調子が悪いんですが、どこ ( 　 ) 連絡したらいいですか。
5) ごみは駐車場 ( 　 ) 横 ( 　 ) ごみ置き場 ( 　 ) 出してください。', 'FILL_BLANK', '1) の, に
2) に
3) が
4) に
5) の, の, に', 1 FROM exercises ex WHERE ex.sort_order = 28 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Chọn từ thích hợp trong khung và đổi dạng sang thể thích hợp (～んです):
[ いいです, 悪かったです, 下手です, 病気です, 遅れました, 故障しました, 書きます, 来ませんでした, 休みじゃありません, 食べません, 捜しています, ありません, しています ]

例: 何を捜しているんですか。…ここに置いた手帳がないんです。
1) どうしてケーキを＿＿＿＿んですか。…今ダイエットを＿＿＿＿んです。
2) どうして会議の時間に＿＿＿＿んですか。…車が＿＿＿＿んです。
3) 先週のお花見、どうして＿＿＿＿んですか。…ちょっと都合が＿＿＿＿んです。
4) 土曜日遊びに来ませんか。…すみません。今度の土曜日は＿＿＿＿んです。
5) 今晩飲みに行きませんか。…すみません。妻が＿＿＿＿んです。
6) いつもパソコンで手紙を＿＿＿＿んですか。…ええ、わたしは字が＿＿＿＿んです。', 'FILL_BLANK', '1) 食べない, している
2) 遅れた, 故障した
3) 来なかった, 悪かった
4) 休みじゃない
5) 病気な
6) 書く, 下手な', 2 FROM exercises ex WHERE ex.sort_order = 28 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Chọn từ đúng trong ngoặc { }:
例: けさは { 何か, (何も), 何でも } 食べませんでした。
1) 朝はいつも5時ごろ起きます。…{ 特に, ずいぶん, たくさん } 早いんですね。
2) { 今度, 最近, もうすぐ } の日曜日に { どこでも, どこか, どこへ } 遊びに行きませんか。…ええ、いいですね。
3) 高橋さん、その手帳、いいですね。わたしも { こんな, そんな, あんな } 手帳が欲しいんですが、どこで買ったんですか。…エドヤストアです。手帳の { 乗り場, 置き場, 売り場 } は1階の奥にあります。', 'FILL_BLANK', '1) ずいぶん
2) 今度, どこか
3) そんな, 売り場', 3 FROM exercises ex WHERE ex.sort_order = 28 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu trả lời với ～んです:
例: たばこを吸ってもいいですか。…すみません。ここは禁煙なんです。
1) 食事に行きませんか。…すみません。今ちょっとおなかが＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) よくテレビを見ますか。…いいえ、あまり見ません。時間が＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) きれいな桜の写真ですね。…ええ。奈良のお寺で＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) ずいぶんにぎやかですね。…ええ。隣の部屋でパーティーを＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
5) 自分で食事を作りますか。…いいえ。料理があまり＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) 痛いんです。
2) ないんです。
3) 撮ったんです。
4) やっているんです。／しているんです。
5) 上手じゃないんです。／好きじゃないんです。／できないんです。', 4 FROM exercises ex WHERE ex.sort_order = 28 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chọn cụm từ trong khung và hoàn thành câu với ～んですが、～たらいいですか hoặc ～ていただけませんか:
[ 行きたいです, 見たいです, ありません, 遅れました, できません, 故障です, 痛いです, しなければなりません, 書きました, 習いたいです, 結婚します ]

例1: 相撲を見たいんですが、どこでチケットを (買います…買ったらいいですか)。
例2: 細かいお金がないんですが、200円 (貸します…貸していただけませんか)。
1) 日本人の友達が＿＿＿＿が、どんなプレゼントを (あげます…＿＿＿＿)。
2) 頭が＿＿＿＿が、どの薬を (飲みます…＿＿＿＿)。
3) 国会議事堂へ＿＿＿＿が、地図を (かきます…＿＿＿＿)。
4) 10時までに会議の準備を＿＿＿＿が、(手伝います…＿＿＿＿)。
5) お茶を＿＿＿＿が、いい先生を (紹介します…＿＿＿＿)。
6) 日本語でレポートを＿＿＿＿が、ちょっと (見ます…＿＿＿＿)。
7) 2階の事務所のパソコンが＿＿＿＿が、どう (します…＿＿＿＿)。
8) きょうは修理が＿＿＿＿が、あしたまで (待ちます…＿＿＿＿)。', 'FILL_BLANK', '1) 結婚するんです, あげたらいいですか
2) 痛いんです, 飲んだらいいですか
3) 行きたいんです, かいていただけませんか
4) しなければならないんです, 手伝っていただけませんか
5) 習いたいんです, 紹介していただけませんか
6) 書いたんです, 見ていただけませんか
7) 故障なんです, したらいいですか
8) できないんです, 待っていただけませんか', 5 FROM exercises ex WHERE ex.sort_order = 28 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
-- =========================================================
-- Exercise: Bài 27 (SortOrder 29, Lesson 27)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 27', 'Bài tập Minna no Nihongo N4 - Bài 27: Thể khả năng (可能形), 見える/聞こえる, できる, しか～ない, trợ từ が với thể khả năng', 'LESSON', 'EXERCISE', 29 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 27 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 29);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Hoàn thành bảng chia động từ thể khả năng:
例: 飲みます → 飲めます → 飲める
1) ＿＿＿＿ → 見られます → ＿＿＿＿
2) 建てます → ＿＿＿＿ → ＿＿＿＿
3) ＿＿＿＿ → 立てます → ＿＿＿＿
4) ＿＿＿＿ → ＿＿＿＿ → 走れる
5) 借ります → ＿＿＿＿ → ＿＿＿＿
6) ＿＿＿＿ → 捜せます → ＿＿＿＿
7) 連絡します → ＿＿＿＿ → ＿＿＿＿
8) 起きます → ＿＿＿＿ → ＿＿＿＿
9) ＿＿＿＿ → 置けます → ＿＿＿＿
10) ＿＿＿＿ → ＿＿＿＿ → 開ける
11) 来ます → ＿＿＿＿ → ＿＿＿＿
12) ＿＿＿＿ → 着られます → ＿＿＿＿
13) ＿＿＿＿ → ＿＿＿＿ → 飼える
14) 換えます → ＿＿＿＿ → ＿＿＿＿
15) ＿＿＿＿ → 呼べます → ＿＿＿＿', 'FILL_BLANK', '1) 見ます, 見られる
2) 建てられます, 建てられる
3) 立ちます, 立てる
4) 走ります, 走れます
5) 借りられます, 借りられる
6) 捜します, 捜せる
7) 連絡できます, 連絡できる
8) 起きられます, 起きられる
9) 置きます, 置ける
10) 開きます, 開けます
11) 来られます, 来られる
12) 着ます, 着られる
13) 飼います, 飼える
14) 換えられます, 換えられる
15) 呼びます, 呼べる', 1 FROM exercises ex WHERE ex.sort_order = 29 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Hoàn thành câu bằng cách chuyển sang thể khả năng:
例: きょうは車で来ましたから、お酒が飲めません。
1) 簡単な料理だったら、自分で＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) 早く漢字を覚えないですが、なかなか＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) また会いたいですね。今度いつ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) 去年は忙しかったですから、長い旅行に＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) 作れます。／できます。
2) 覚えられません。
3) 会えますか。
4) 行けませんでした。', 2 FROM exercises ex WHERE ex.sort_order = 29 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Đổi câu dùng ～ことができます sang thể khả năng:
例: 日本語で電話をかけることができますか。…日本語で電話がかけられますか。
1) 自分で自転車を修理することができますか。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) あの人の名前を思い出すことができません。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) あした10時ごろ来ることができると思います。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) 一人で病院へ行くことができなかったんです。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
5) 10時までに帰ることができたら、電話をください。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
6) タワポンさんは泳ぐことができないと言いました。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) 自分で自転車が修理できますか。
2) あの人の名前が思い出せません。
3) あした10時ごろ来られると思います。
4) 一人で病院へ行けなかったんです。
5) 10時までに帰れたら、電話をください。
6) タワポンさんは泳げないと言いました。', 3 FROM exercises ex WHERE ex.sort_order = 29 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Điền trợ từ thích hợp vào ngoặc ( ):
例: 空港 ( まで ) 電車 ( で ) 行けます。
1) 駅の近く ( 　 ) 大きいマンション ( 　 ) できました。
2) 2階の窓 ( 　 ) お祭りの花火 ( 　 ) 見えます。
3) ここは波の音 ( 　 ) よく聞こえます。
4) すみませんが、もう少し大きい声 ( 　 ) 話していただけませんか。
5) 時計の修理 ( 　 ) いつできますか。…3日後 ( 　 ) できます。', 'FILL_BLANK', '1) に, が
2) から, が
3) が
4) で
5) は, に', 4 FROM exercises ex WHERE ex.sort_order = 29 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Hoàn thành câu trả lời với しか～ません:
例: 夜どのくらい勉強しますか。…30分ぐらいしか勉強しません。
1) 冷蔵庫に卵がいくつありますか。…2つ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) どんな料理が作れますか。…カレー＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) きのうの晩はよく寝られましたか。…いいえ、2時間ぐらい＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) きのうの晩はたくさん飲みましたか。…いいえ、少し＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) しかありません。
2) しか作れません。
3) しか寝られませんでした。
4) しか飲みませんでした。', 5 FROM exercises ex WHERE ex.sort_order = 29 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Hoàn thành câu tương phản dùng は...が、...は...ません:
例: このマンションで鳥や犬が飼えますか。(小さい鳥…○, 犬…×)
…(小さい鳥は飼えますが、犬は飼えません)。
1) 木村さんの住所と電話番号がわかりますか。(住所…○, 電話番号…×)
…( ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿ )。
2) スポーツが好きですか。(ゴルフ…○, ほかのスポーツ…×)
…( ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿ )。
3) コーヒーに砂糖とミルクを入れますか。(ミルク…○, 砂糖…×)
…( ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿ )。
4) よく肉を食べますか。(とり肉…○, 牛肉や豚肉…×)
…( ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿ )。
5) 図書館で雑誌が借りられますか。(古いもの…○, 新しいもの…×)
…( ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿ )。', 'FILL_BLANK', '1) 住所はわかりますが、電話番号はわかりません
2) ゴルフは好きですが、ほかのスポーツは好きじゃありません
3) ミルクは入れますが、砂糖は入れません
4) とり肉は食べますが、牛肉や豚肉は食べません
5) 古いのは借りられますが、新しいのは借りられません', 6 FROM exercises ex WHERE ex.sort_order = 29 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: Bài 28 (SortOrder 30, Lesson 28)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 28', 'Bài tập Minna no Nihongo N4 - Bài 28: Động từ ます + ながら (vừa... vừa...), Động từ ています (thói quen), Liệt kê lý do ～し、～し、～', 'LESSON', 'EXERCISE', 30 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 28 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 30);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền thể thích hợp của động từ trước ながら:
例: 道を歩きながらたばこを吸わないでください。
1) 本を＿＿＿＿ながらバスを待っていました。
2) ガムを＿＿＿＿ながら運転すると、あまり眠くなりません。
3) 彼女は銀行で＿＿＿＿ながら小説を書きました。
4) 彼はアルバイトを＿＿＿＿ながら大学に通っています。
5) いつも友達と昼ごはんを＿＿＿＿ながらいろいろな話をしています。', 'FILL_BLANK', '1) 読み
2) かみ
3) 働き
4) し
5) 食べ', 1 FROM exercises ex WHERE ex.sort_order = 30 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Điền dạng thích hợp của động từ (thói quen ～ています / ～ていました):
例: 水曜日の夜はいつもダンスを習いに (行っています) が、きょうは行けません。
1) 毎朝8時15分の電車に (乗ります…＿＿＿＿) が、けさは8時の電車に乗りました。
2) パンはいつも駅の前のパン屋で (買います…＿＿＿＿) が、きのうはスーパーで買いました。
3) 国ではよくドラマを (見ます…＿＿＿＿) が、日本へ来てから、ニュースしか見ません。
4) 学生のとき、よく小説を (読みます…＿＿＿＿) が、会社に入ってから、あまり読みません。
5) 休みの日はたいていプールで泳いだり、テニスを (します…＿＿＿＿) が、きのうは何もしませんでした。', 'FILL_BLANK', '1) 乗っています
2) 買っています
3) 見ていました
4) 読んでいました
5) したりしています', 2 FROM exercises ex WHERE ex.sort_order = 30 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Chọn từ trong khung và hoàn thành câu với ～し、～し:
[ まじめです, 偉いです, 熱心です, あります, 近いです, できます, 話せません, きれいです, ありません ]

例: 車の運転もできるし、力もあるし、弟に引っ越しを手伝ってもらいます。
1) わたしは経験も＿＿＿＿し、日本語もあまり＿＿＿＿し、この仕事は無理です。
2) 彼女は＿＿＿＿し、＿＿＿＿し、早く日本語が上手になると思います。
3) 引っ越ししたマンションはどうですか。…駅から＿＿＿＿し、新しくて、＿＿＿＿し、ペットも飼えるんです。', 'FILL_BLANK', '1) ない, 話せない
2) まじめだ, 熱心だ
3) 近い, きれいだ', 3 FROM exercises ex WHERE ex.sort_order = 30 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu và chọn それに hoặc それで trong ngoặc { }:
例: A: どうしてこのマンションを選んだんですか。(広いです・車が置けます)
    B: 広し、車も置けるし、{ (それに), それで } ペットも飼えるんです。
1) A: よくこの料理を作るんですか。(おいしいです・簡単です)
   B: ええ。＿＿＿＿し、＿＿＿＿し、{ それに, それで } 子どもも好きなんです。
2) A: このコート、いかがですか。(形がいいです・色がきれいです)
   B: そうですね。＿＿＿＿し、＿＿＿＿し、{ それに, それで } サイズもちょうどいいですね。
3) A: どうしてこの店はよく売れるんですか。(値段が安いです・店の人がとても親切です)
   B: ＿＿＿＿し、＿＿＿＿から。{ それに, それで } いつも人が多いんですね。
4) A: ワットさんはいい先生ですね。(教え方が上手です・ユーモアがあります)
   B: ええ。＿＿＿＿し、＿＿＿＿し、{ それに, それで } とても熱心なんです。
   C: { それに, それで } 学生に人気があるんですね。', 'FILL_BLANK', '1) おいしい, 簡単だ, それに
2) 形もいい, 色もきれいだ, それに
3) 値段も安い, 店の人もとても親切です, それで
4) 教え方も上手だ, ユーモアもある, それに, それで', 4 FROM exercises ex WHERE ex.sort_order = 30 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Nối câu dùng trợ từ も và ～し:
例: 仕事もおもしろいし、給料も高いし、将来もこの会社で働きたいです。
1) 頭＿＿＿＿し、熱＿＿＿＿し、たぶんかぜだと思います。
2) おなか＿＿＿＿し、のど＿＿＿＿し、あのレストランに入りませんか。
3) ここは駅から＿＿＿＿し、店＿＿＿＿し、とても不便です。
4) 体の調子＿＿＿＿し、お金＿＿＿＿し、旅行に行けません。
5) 声＿＿＿＿し、ダンス＿＿＿＿し、あの歌手はとても人気があります。', 'FILL_BLANK', '1) も痛い, もある
2) もすいた, もかわいた
3) [も] 遠い, も少ない／もない
4) も悪い／もよくない, もない
5) もいい／もきれいだ, も上手だ／もできる', 5 FROM exercises ex WHERE ex.sort_order = 30 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Chia động từ trong đoạn văn sau:
きのう近くの公園へ花見に行きました。日曜日で、天気がよかったですから、公園はすごい人でした。みんな花を (例: 見ます…見) ながら (a. 食べます…＿＿＿＿) り、(b. 飲みます…＿＿＿＿) り (c. します…＿＿＿＿) いました。カラオケで歌っている人も (d. いました…＿＿＿＿) し、(e. 歌います…＿＿＿＿) ながら踊っている人もいました。', 'FILL_BLANK', 'a. 食べた
b. 飲んだ
c. して
d. いた
e. 歌い', 6 FROM exercises ex WHERE ex.sort_order = 30 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: Bài 29 (SortOrder 31, Lesson 29)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 29', 'Bài tập Minna no Nihongo N4 - Bài 29: Tự động từ (自動詞) + ています (trạng thái kết quả), Động từ てしまいました (hoàn thành/tiếc nuối)', 'LESSON', 'EXERCISE', 31 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 29 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 31);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: この店 ( で ) はカード ( で ) 買い物できません。
1) このスーパー ( 　 ) 夜9時 ( 　 ) 開いています。
2) 電車の網棚 ( 　 ) 忘れ物 ( 　 ) してしまいました。
3) このかばん ( 　 ) はポケット ( 　 ) たくさん付いています。
4) 切符をなくしたら、駅員 ( 　 ) 言ってください。
5) どこか ( 　 ) ちょっと休みませんか。
6) パンチはどこですか。…えーと、どこか ( 　 ) あると思いますよ。', 'FILL_BLANK', '1) は, まで
2) に, を
3) に, が
4) に
5) で
6) に', 1 FROM exercises ex WHERE ex.sort_order = 31 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Chọn từ thích hợp trong ngoặc { }:
例: { ガラス, (コップ), お皿 } でビールを飲みます。
1) { ちゃわん, 袋, 木の枝 } が折れています。
2) { ガラス, ちゃわん, シャツ } が破れてしまいました。
3) { ボタン, ポケット, 財布 } が外れていますよ。
4) コップが { 割れました, 折れました, 破れました }。
5) 傘が { 割れて, 壊れて, 故障して } しまいました。', 'FILL_BLANK', '1) 木の枝
2) シャツ
3) ボタン
4) 割れました
5) 壊れて', 2 FROM exercises ex WHERE ex.sort_order = 31 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu diễn tả trạng thái kết quả (～ています):
例: 時計が (止まっています) から、時間がわかりません。
1) エアコンが (つきます…＿＿＿＿) から、窓を開けないでください。
2) コップが (汚れます…＿＿＿＿) から、洗ってください。
3) 隣のうちは電気が (消えます…＿＿＿＿) から、だれもいないと思います。
4) コピー機が (故障します…＿＿＿＿) から、修理してもらわなければなりません。
5) 寒いですね。…あ、窓が (開きます…＿＿＿＿) から、閉めましょう。
6) 会議室はかぎが (掛かります…＿＿＿＿) から、入れませんでした。
7) あそこに大きい車が (止まります…＿＿＿＿) んですが、だれが止めたんですか。
8) このかばん、ずいぶん重いですね。何が (入ります…＿＿＿＿) んですか。', 'FILL_BLANK', '1) ついています
2) 汚れています
3) 消えています／ついていません
4) 故障しています／壊れています
5) 開いています
6) 掛かっていました
7) 止まっている
8) 入っている', 3 FROM exercises ex WHERE ex.sort_order = 31 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu với thể ～てしまいました:
例: ちょっとお茶でも飲みませんか。…この資料をメールで送ってしまいますから、ちょっと待っていただけませんか。
1) ミラーさんにもらったケーキは？…もう全部＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) その本、おもしろいですか。…ええ。わたしはもう＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿から、貸しましょうか。
3) いっしょに帰りませんか。…すみません。あしたの会議の準備を＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿から、お先にどうぞ。
4) レポートはもう書きましたか。…いいえ、まだです。あしたから忙しくなりますから、今晩＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
5) 部長は何時に出かけるんですか。…もう＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿よ。', 'FILL_BLANK', '1) 食べてしまいました。
2) 読んでしまいました
3) してしまいます／やってしまいます
4) 書いてしまいます。
5) 出かけてしまいました', 4 FROM exercises ex WHERE ex.sort_order = 31 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chọn từ trong khung và hoàn thành câu thể hiện sự tiếc nuối (～てしまいました / ～てしまった):
[ 落とします, 捨てます, 結婚します, まちがえます, 破れます, 忘れます, 折れます, 売れます ]

例: あの人の名前、きのう聞いたんですが、忘れてしまいました。
1) わたしが結婚したかった人は、ほかの人と＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) ここに置いた雑誌がないんですが……。…あ、すみません。ごみの日に＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) 袋が＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿んですが、取り替えていただけませんか。
4) すみませんが、細かいお金を200円貸していただけませんか。どこかで財布を＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿んです。
5) この靴、デザインはいいんですが、色がちょっと……。黒いのはありませんか。…すみません。あったんですが、＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
6) 遅かったですね。どうしたんですか。…すみません。道を＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿んです。', 'FILL_BLANK', '1) 結婚してしまいました。
2) 捨ててしまいました。
3) 破れてしまった
4) 落としてしまった
5) 売れてしまいました。
6) まちがえてしまった', 5 FROM exercises ex WHERE ex.sort_order = 31 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
-- =========================================================
-- Exercise: Bài 30 (SortOrder 32, Lesson 30)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 30', 'Bài tập Minna no Nihongo N4 - Bài 30: Tha động từ + てあります (trạng thái có chủ ý), Động từ ておきます (làm sẵn / để nguyên)', 'LESSON', 'EXERCISE', 32 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 30 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 32);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: キャッシュカード ( は ) 財布 ( に ) 入っています。
1) 授業 ( 　 ) まえに、予習しておきます。
2) 授業 ( 　 ) 終わったら、復習しておいてください。
3) 予定表 ( 　 ) 来月の予定 ( 　 ) 書いておきます。
4) 池 ( 　 ) 周り ( 　 ) 桜の木 ( 　 ) 植えてあります。
5) 廊下 ( 　 ) 壁 ( 　 ) お知らせ ( 　 ) はっておきました。
6) 子どもは甘い物が好きですね。ケーキ ( 　 ) チョコレート ( 　 )……。', 'FILL_BLANK', '1) の
2) が
3) に, を
4) の, に, が
5) の, に, を
6) とか, とか', 1 FROM exercises ex WHERE ex.sort_order = 32 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. [IMAGE_REQUIRED] Nhìn hình vẽ căn phòng và hoàn thành câu với ～てあります:
例: 本棚に本が並べてあります。
1) 部屋の真ん中に＿＿＿＿あります。
2) 本棚の上に＿＿＿＿あります。
3) 壁にわたしが好きな歌手の＿＿＿＿あります。
4) ポスターの横に＿＿＿＿あります。
5) エアコンが＿＿＿＿あります。
6) 窓が＿＿＿＿あります。', 'FILL_BLANK', '1) テーブルが置いて
2) 人形が飾って／人形が置いて
3) ポスターがはって
4) カレンダーが掛けて
5) つけて
6) 閉めて', 2 FROM exercises ex WHERE ex.sort_order = 32 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu trả lời với ～てあります:
例: スキー旅行のお知らせはどこですか。(あそこ・はります) …あそこにはってあります。
1) 会議の資料はどこですか。(あの箱・入れます)
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) 非常袋はどこですか。(玄関・置きます)
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) 松本さんの車はどこですか。(地下の駐車場・止めます)
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) カレンダーはどこですか。(ドアの左・掛けます)
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) あの箱に入れてあります。
2) 玄関に置いてあります。
3) 地下の駐車場に止めてあります。
4) ドアの左に掛けてあります。', 3 FROM exercises ex WHERE ex.sort_order = 32 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu với thể ～ておきます (chuẩn bị trước):
例: 友達が来るまえに、部屋を掃除しておきます。
1) あした登る山は初めてですから、地図をよく (見ます…＿＿＿＿) おきます。
2) あさっての夜IMCの部長と食事しますから、レストランを (予約します…＿＿＿＿) おきます。
3) 飲み物はパーティーの時間まで冷蔵庫に (入れます…＿＿＿＿) おきます。
4) コップが汚れていますから、(洗います…＿＿＿＿) おきます。', 'FILL_BLANK', '1) 見て
2) 予約して
3) 入れて
4) 洗って', 4 FROM exercises ex WHERE ex.sort_order = 32 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Hoàn thành câu với thể ～ておきます (xử lý sau / giữ nguyên trạng thái):
例: 部屋はあとでわたしが片づけますから、そのままにしておいてください。
1) はさみやセロテープを使ったら、元の所に (戻します…＿＿＿＿) おいてください。
2) 使わない部屋の電気は (消します…＿＿＿＿) おいてください。
3) エアコンがついていますから、窓は (閉めます…＿＿＿＿) おきましょう。
4) アメリカへ出張するまえに、どんな準備を (します…＿＿＿＿) おいたらいいですか。', 'FILL_BLANK', '1) 戻して／置いて／しまって
2) 消して
3) 閉めて
4) して／やって', 5 FROM exercises ex WHERE ex.sort_order = 32 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Chọn từ thích hợp [ います, あります, おきます ] và chia dạng đúng:
例: テーブルの上にケーキの箱が置いてありますから、冷蔵庫に入れておいてください。
1) ごみの日はあしたなんですが、今晩出して ( ＿＿＿＿ ) もいいですか。
2) この手紙、切手がはって ( ＿＿＿＿ ) から、はってから、出して ( ＿＿＿＿ ) ください。
3) あそこに来週の予定が書いて ( ＿＿＿＿ ) から、見て ( ＿＿＿＿ ) ください。
4) 試験までにこの本を読んで ( ＿＿＿＿ ) なければなりません。
5) 新幹線の時間を調べて ( ＿＿＿＿ ) ましょうか。…ええ、お願いします。
6) あそこに止まって ( ＿＿＿＿ ) 車、だれか乗って ( ＿＿＿＿ ) か。…いいえ、だれも乗って ( ＿＿＿＿ )。', 'FILL_BLANK', '1) おいて
2) ありません, おいて
3) あります, おいて
4) おか
5) おき
6) いる, います, いません', 6 FROM exercises ex WHERE ex.sort_order = 32 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: Bài 31 (SortOrder 33, Lesson 31)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 31', 'Bài tập Minna no Nihongo N4 - Bài 31: Thể ý chí (意向形), ～ようと思っています, ～つもりです, ～予定です, まだ～ていません', 'LESSON', 'EXERCISE', 33 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 31 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 33);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Hoàn thành bảng chia động từ sang thể ý chí (意向形):
例: 休みます → 休もう
1) 続けます → ＿＿＿＿
2) ＿＿＿＿ → 探そう
3) 案内します → ＿＿＿＿
4) ＿＿＿＿ → 起きよう
5) ＿＿＿＿ → 置こう
6) ＿＿＿＿ → 持って来よう
7) 残ります → ＿＿＿＿
8) ＿＿＿＿ → 降りよう
9) ＿＿＿＿ → 使おう
10) 見つけます → ＿＿＿＿
11) ＿＿＿＿ → 調べよう
12) 選びます → ＿＿＿＿
13) 持ちます → ＿＿＿＿', 'FILL_BLANK', '1) 続けよう
2) 探します
3) 案内しよう
4) 起きます
5) 置きます
6) 持って来ます
7) 残ろう
8) 降ります
9) 使います
10) 見つけよう
11) 調べます
12) 選ぼう
13) 持とう', 1 FROM exercises ex WHERE ex.sort_order = 33 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Đổi câu mời mọc/rủ rê sang thể ý chí (thể thông thường):
例: 疲れましたから、ちょっと休みましょう。→ 疲れたから、ちょっと休もう。
1) 時間がありませんから、急ぎましょう。
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) おいしいワインをもらいましたから、いっしょに飲みましょう。
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) カリナさんがまだ来ていませんから、もう少し待ちましょう。
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) 暑いですから、エアコンをつけておきましょう。
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
5) あしたは休みですから、東京スカイツリーに行きませんか。…ええ、行きましょう。
→ あしたは休みだから、東京スカイツリーに＿＿＿＿？ …うん、＿＿＿＿。
6) あの喫茶店に入りませんか。…ええ、そうしましょう。
→ あの喫茶店に＿＿＿＿？ …うん、＿＿＿＿。', 'FILL_BLANK', '1) 時間がないから、急ごう。
2) おいしいワインをもらったから、いっしょに飲もう。
3) カリナさんがまだ来ていないから、もう少し待とう。
4) 暑いから、エアコンをつけておこう。
5) 行かない, 行こう
6) 入らない, そうしよう', 2 FROM exercises ex WHERE ex.sort_order = 33 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu diễn đạt ý định với ～ようと思っています:
例: 連休は近くの温泉に行こうと思っています。
1) 会社をやめて、もう一度大学で (勉強します…＿＿＿＿) と思っています。
2) 今度の休みは子どもを動物園へ (連れて行きます…＿＿＿＿) と思っています。
3) 庭があるうちに引っ越ししましたから、犬を (飼います…＿＿＿＿) と思っています。
4) ミラーさんにおいしいケーキの作り方を教えてもらいましたから、自分で (作ります…＿＿＿＿) と思っています。
5) 先週見に行ったマンションを (借ります…＿＿＿＿) と思っています。駅から近いし、家賃も安いですから。', 'FILL_BLANK', '1) 勉強しよう
2) 連れて行こう
3) 飼おう
4) 作ろう
5) 借りよう', 3 FROM exercises ex WHERE ex.sort_order = 33 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu trả lời với ～つもりです:
例: 結婚したら、両親といっしょに住みますか。…いいえ、別々に住むつもりです。
1) これからも今の研究を続けますか。…ええ、将来もずっと (続けます…＿＿＿＿) つもりです。
2) 来年大学院の試験を受けますか。…いいえ、(受けません…＿＿＿＿) つもりです。
3) 大阪まで新幹線で行きますか。…いいえ、車で (行きます…＿＿＿＿) つもりです。
4) 夏休みにアルバイトをしますか。…いいえ、アルバイトは (しません…＿＿＿＿) つもりです。試験の勉強をしなければならないんです。', 'FILL_BLANK', '1) 続ける
2) 受けない
3) 行く
4) しない', 4 FROM exercises ex WHERE ex.sort_order = 33 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Hoàn thành câu diễn đạt dự định với ～予定です:
例1: 転勤はいつですか。(来年の3月です) … (来年の3月の) 予定です。
例2: 飛行機は何時に着きますか。(4時20分に着きます) … (4時20分に着く) 予定です。
1) 会議は何時に終わりますか。(4時に終わります) … ( ＿＿＿＿ ) 予定です。
2) 経済の講義は何時までですか。(2時までです) … ( ＿＿＿＿ ) 予定です。
3) 課長の午後の予定がわかりますか。(支社へ行きます) … ( ＿＿＿＿ ) 予定です。
4) 夏休みは何をしますか。(1週間北海道を旅行します) … ( ＿＿＿＿ ) 予定です。
5) スキー旅行に行く人は何人ぐらいですか。(50人ぐらいです) … ( ＿＿＿＿ ) 予定です。', 'FILL_BLANK', '1) 4時に終わる
2) 2時までの
3) 支社へ行く
4) 1週間北海道を旅行する
5) 50人ぐらいの', 5 FROM exercises ex WHERE ex.sort_order = 33 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Hoàn thành hội thoại với まだ～ていません và ý định/kế hoạch:
例: レポートの資料はもう集めましたか。…いいえ、まだ集めていません。これから集めるつもりです。
1) IMCの松本さんはもう来ましたか。
…いいえ、まだ (来ます…＿＿＿＿)。3時ごろ (来ます…＿＿＿＿) 予定です。
2) 結婚についてもう両親に話しましたか。
…いいえ、まだ (話します…＿＿＿＿)。今度国へ帰ったとき、(話します…＿＿＿＿) つもりです。
3) 林さんにあげるプレゼントはもう決めましたか。
…いいえ、まだ (決めます…＿＿＿＿)。渡辺さんに欲しい物を聞いてから、(決めます…＿＿＿＿) と思っています。', 'FILL_BLANK', '1) 来ていません, 来る
2) 話していません, 話す
3) 決めていません, 決めよう', 6 FROM exercises ex WHERE ex.sort_order = 33 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: Bài 32 (SortOrder 34, Lesson 32)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 32', 'Bài tập Minna no Nihongo N4 - Bài 32: ～ほうがいいです (lời khuyên), ～でしょう (phỏng đoán), ～かもしれません (có lẽ)', 'LESSON', 'EXERCISE', 34 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 32 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 34);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: 駅まで歩いて5分 ( で ) 行けます。
1) 弟はさくら大学 ( 　 ) 合格しました。
2) ここは車の音 ( 　 ) うるさいです。
3) スキーに行って、足 ( 　 ) けが ( 　 ) してしまいました。
4) 外国旅行のとき、お金は現金 ( 　 ) 持って行かないほうがいいですよ。
5) やけど ( 　 ) したら、すぐ水道の水 ( 　 ) 冷やしてください。
6) かぜ ( 　 ) ひいたんですか。…ええ、せき ( 　 ) 出て、熱もあるんです。', 'FILL_BLANK', '1) に
2) が
3) に, を
4) で
5) を, で
6) を, が', 1 FROM exercises ex WHERE ex.sort_order = 34 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Chọn từ trong khung và hoàn thành câu với ～た/ない ほうがいいです:
[ 行きます, 飲みます, 持って行きます, します, 聞きます ]

例1: 連休は込みますから、早くホテルを (予約した) ほうがいいです。
例2: かぜの薬を飲んだら、車を (運転しない) ほうがいいですよ。
1) やまと美術館には駐車場がありませんから、電車で＿＿＿＿ほうがいいですね。
2) その牛乳はちょっと古いですから、＿＿＿＿ほうがいいですよ。
3) 夕方は雨だと思いますから、傘を＿＿＿＿ほうがいいですよ。
4) 熱があるときは、無理を＿＿＿＿ほうがいいですよ。
5) 地図を見ても、よくわかりませんね。…そうですね。あそこの交番で＿＿＿＿ほうがいいですね。', 'FILL_BLANK', '1) 行った
2) 飲まない
3) 持って行った
4) しない
5) 聞いた', 2 FROM exercises ex WHERE ex.sort_order = 34 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu phỏng đoán với ～でしょう:
例: よく晴れていますから、今夜はきっと星がきれいでしょう。
1) イーさんは医者ですか。…ええ、たぶん＿＿＿＿でしょう。
2) 今度のパーティー、お客さんのお皿は何枚ぐらいあったら、足りますか。…そうですね。30枚ぐらいあったら、＿＿＿＿でしょう。
3) 今週の土曜日は休めますか。…忙しいですから、たぶん＿＿＿＿でしょう。
4) 山田さんはまだ来ていないんですか。…もう9時ですから、もうすぐ＿＿＿＿でしょう。
5) 6月に北海道へ行くくんですが、寒いでしょうか。…そうですね。6月はそんなに＿＿＿＿でしょう。
6) 国際結婚は大変だと思いますか。…ええ、ことばの問題もあるし、食べ物も違うし、きっと＿＿＿＿でしょう。', 'FILL_BLANK', '1) 医者
2) 足りる
3) 休めない
4) 来る
5) 寒くない
6) 大変', 3 FROM exercises ex WHERE ex.sort_order = 34 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu phỏng đoán với ～かもしれません:
例: コートを持って行くんですか。…ええ、夜は寒くなるかもしれませんから。
1) 約束の時間に間に合うでしょうか。…こんなに道が込んでいますから、＿＿＿＿かもしれません。
2) 寒いですね。…ええ、今夜は雪が＿＿＿＿かもしれませんね。
3) この傘、だれかの忘れ物ですか。…そうですね、きのう来たミラーさんの＿＿＿＿かもしれませんね。
4) 4万円ぐらいでマンションを借りたいんですが、無理でしょうか。…うーん、ちょっと＿＿＿＿かもしれませんよ。
5) 来月会社を＿＿＿＿かもしれません。…やめて、何をするんですか。
6) 友だちの結婚式のとき、この服を着ようと思っているんですが、おかしいでしょうか。…そうですね、白ではちょっと＿＿＿＿かもしれませんよ。
7) ずっと暑い日が続いていますね。…そうですね、しばらく暑い日が＿＿＿＿かもしれませんよ。', 'FILL_BLANK', '1) 間に合わない
2) 降る
3) 忘れ物
4) 無理
5) やめる
6) おかしい
7) 続く', 4 FROM exercises ex WHERE ex.sort_order = 34 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chọn tình huống trong khung và hoàn thành câu với ～かもしれません + ～ほうがいいです:
[ 帰れません, インフルエンザです, 仕事のストレスです, 来週は忙しいです, 安くなります ]

例: インフルエンザかもしれませんから、早く病院へ (行きます…行った) ほうがいいですよ。
1) 5時までに会社に＿＿＿＿かもしれませんから、電話で (連絡します…＿＿＿＿) ほうがいいですね。
2) 来週は＿＿＿＿かもしれませんから、これは今週 (やってしまいます…＿＿＿＿) ほうがいいですね。
3) このパソコンはもっと＿＿＿＿かもしれませんから、まだ (買いません…＿＿＿＿) ほうがいいでしょう。
4) 最近体の調子がよくないんです。…＿＿＿＿かもしれませんよ。あまり (無理をしません…＿＿＿＿) ほうがいいですよ。', 'FILL_BLANK', '1) 帰れない, 連絡した
2) 忙しい, やってしまった
3) 安くなる, 買わない
4) 仕事のストレス, 無理をしない', 5 FROM exercises ex WHERE ex.sort_order = 34 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
-- =========================================================
-- Exercise: Bài 33 (SortOrder 35, Lesson 33)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 33', 'Bài tập Minna no Nihongo N4 - Bài 33: Thể mệnh lệnh (命令形), Thể cấm chỉ (禁止形), ～という意味です, ～と言っていました, ～と伝えていただけませんか', 'LESSON', 'EXERCISE', 35 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 33 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 35);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Hoàn thành bảng chia động từ thể mệnh lệnh và cấm chỉ:
例: 投げます → 投げろ → 投げるな
1) ＿＿＿＿ → ＿＿＿＿ → 乗るな
2) ＿＿＿＿ → 見ろ → ＿＿＿＿
3) 飲みます → ＿＿＿＿ → ＿＿＿＿
4) 出ます → ＿＿＿＿ → ＿＿＿＿
5) 出します → 出せ → ＿＿＿＿
6) ＿＿＿＿ → ＿＿＿＿ → 運転するな
7) 呼びます → ＿＿＿＿ → ＿＿＿＿
8) ＿＿＿＿ → 行け → ＿＿＿＿
9) 連れて来ます → ＿＿＿＿ → ＿＿＿＿
10) ＿＿＿＿ → ＿＿＿＿ → 待つな', 'FILL_BLANK', '1) 乗ります, 乗れ
2) 見ます, 見るな
3) 飲め, 飲むな
4) 出ろ, 出るな
5) 出すな
6) 運転します, 運転しろ
7) 呼べ, 呼ぶな
8) 行きます, 行くな
9) 連れて来い, 連れて来るな
10) 待ちます, 待て', 1 FROM exercises ex WHERE ex.sort_order = 35 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Điền trợ từ thích hợp vào ngoặc ( ):
例: 手 ( に ) やけど ( を ) してしまいました。
1) この漢字 ( 　 ) 何 ( 　 ) 読みますか。
2) あそこ ( 　 ) 「止まれ」 ( 　 ) 書いてあります。
3) スキー ( 　 ) 行ったら、けが ( 　 ) 注意してください。
4) 山田さん ( 　 ) 今席 ( 　 ) 外しています。
5) 今度のミーティング ( 　 ) 出席できますか。', 'FILL_BLANK', '1) は, と
2) に, と
3) に, に
4) は, を
5) に', 2 FROM exercises ex WHERE ex.sort_order = 35 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu với thể mệnh lệnh hoặc cấm chỉ:
わたしが子どものとき、父はよく……
例1: 朝ご飯を (食べます…食べろ)。
例2: 電車の中で (騒ぎません…騒ぐな)。
1) 自分のことは自分で (します…＿＿＿＿) と言いました。
2) 失敗しても、(あきらめません…＿＿＿＿) と言いました。
3) たくさん本を (読みます…＿＿＿＿) と言いました。
4) 約束の時間に (遅れません…＿＿＿＿) と言いました。', 'FILL_BLANK', '1) しろ
2) あきらめるな
3) 読め
4) 遅れるな', 3 FROM exercises ex WHERE ex.sort_order = 35 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành giải thích ý nghĩa biển báo / từ ngữ (～という意味です):
例: 「学生割引」は学生は安くなるという意味です。
1) 「無料」は＿＿＿＿という意味です。
2) 「禁煙」は＿＿＿＿という意味です。
3) 「使用中」は＿＿＿＿という意味です。
4) 「立入禁止」は＿＿＿＿という意味です。', 'FILL_BLANK', '1) お金を払わなくてもいい
2) たばこを吸うな／たばこを吸ってはいけない
3) 今使っている
4) 入るな／入ってはいけない', 4 FROM exercises ex WHERE ex.sort_order = 35 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Truyền đạt lại lời nhắn với thể thông thường + と言っていました:
例: 森さんはどこへ行ったんですか。(食事に行きます) …食事に行くと言っていました。
1) 渡辺さんはまだコピーしているんですか。(もうすぐ終わります) …＿＿＿＿と言っていました。
2) ミラーさんは渡辺さんの結婚式に出席するんですか。(出席できません) …＿＿＿＿と言っていました。
3) 松本さんは体の調子が悪いんですか。(あまりよくないです) …＿＿＿＿と言っていました。
4) 電気屋の人はいつエアコンの修理ができると言いましたか。(修理は無理です) …＿＿＿＿と言っていましたよ。
5) ワットさんは何か言っていましたか。(駐車違反の料金を15000円払いました) …＿＿＿＿と言っていました。', 'FILL_BLANK', '1) もうすぐ終わる
2) 出席できない
3) あまりよくない
4) 修理は無理だ
5) 駐車違反の料金を15000円払った', 5 FROM exercises ex WHERE ex.sort_order = 35 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Nhờ truyền đạt lại lời nhắn với ～と伝えていただけませんか:
例: (出張の準備はもうできました…課長) → 課長に出張の準備はもうできたと伝えていただけませんか。
1) (15分ぐらい遅れます…林さん) → ＿＿＿＿と伝えていただけませんか。
2) (5時までに会社に戻れません…ミラーさん) → ＿＿＿＿と伝えていただけませんか。
3) (次のミーティングは来週の金曜日です…山田さん) → ＿＿＿＿と伝えていただけませんか。
4) (みんな元気です…サントスさん) → ＿＿＿＿と伝えていただけませんか。
5) (インドネシアのお菓子はとてもおいしかったです…カリナさん) → ＿＿＿＿と伝えていただけませんか。', 'FILL_BLANK', '1) 林さんに15分ぐらい遅れる
2) ミラーさんに5時までに会社に戻れない
3) 山田さんに次のミーティングは来週の金曜日だ
4) サントスさんにみんな元気だ
5) カリナさんにインドネシアのお菓子はとてもおいしかった', 6 FROM exercises ex WHERE ex.sort_order = 35 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: 復習 (26課~33課) (SortOrder 36, Lesson 33)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, '復習 (26課~33課)', 'Bài tập ôn tập tổng hợp Minna no Nihongo N4 (Bài 26 đến Bài 33): Thể khả năng, ý chí, mệnh lệnh, cấm chỉ, trợ từ, phó từ, ngữ pháp tổng hợp', 'REVIEW', 'EXERCISE', 36 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 33 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 36);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Hoàn thành bảng chia các thể (可能形, 意向形, 命令形, 禁止形):
例: 走ります → 走れる → 走ろう → 走れ → 走るな
1) 借ります → ＿＿＿＿ → ＿＿＿＿ → 借りろ → ＿＿＿＿
2) あきらめます → あきらめられる → ＿＿＿＿ → ＿＿＿＿ → あきらめるな
3) 落とします → ＿＿＿＿ → 落とそう → ＿＿＿＿ → ＿＿＿＿
4) 運転します → ＿＿＿＿ → ＿＿＿＿ → 運転しろ → 運転するな
5) 来ます → ＿＿＿＿ → ＿＿＿＿ → ＿＿＿＿ → 来るな
6) 置きます → ＿＿＿＿ → 置こう → ＿＿＿＿ → ＿＿＿＿
7) 起きます → 起きられる → ＿＿＿＿ → 起きろ → ＿＿＿＿
8) 立ちます → 立てる → 立とう → ＿＿＿＿ → ＿＿＿＿', 'FILL_BLANK', '1) 借りられる, 借りよう, 借りるな
2) あきらめよう, あきらめろ
3) 落とせる, 落とせ, 落とすな
4) 運転できる, 運転しよう
5) 来られる, 来よう, 来い
6) 置ける, 置け, 置くな
7) 起きよう, 起きるな
8) 立て, 立つな', 1 FROM exercises ex WHERE ex.sort_order = 36 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Điền trợ từ thích hợp vào ngoặc ( ):
例: きのうは授業 ( に ) 遅れてしまいました。
1) ごみは駐車場の横 ( 　 ) 出してください。
2) 海の上 ( 　 ) 空港 ( 　 ) できました。
3) 子どもが大きい声 ( 　 ) 歌を歌っています。
4) 先生の声 ( 　 ) よく聞こえません。
5) 今度のスキー旅行 ( 　 ) 行きたいんですが、だれ ( 　 ) 申し込んだらいいですか。
6) 簡単な漢字 ( 　 ) 書けますが、複雑な漢字 ( 　 ) 書けません。
7) 部屋 ( 　 ) きれいだし、家賃 ( 　 ) 安いし、このマンションを借りようと思います。
8) 道 ( 　 ) 込んでいましたから、約束の時間 ( 　 ) 間に合いませんでした。
9) テーブル ( 　 ) 上 ( 　 ) 花 ( 　 ) 飾ってあります。
10) 入学試験は12時まで ( 　 ) 予定です。
11) この修理は簡単ですから、1日 ( 　 ) できます。
12) あそこ ( 　 ) 書いてある漢字は何 ( 　 ) 読みますか。
13) すみませんが、山田さん ( 　 ) 会議はあした ( 　 ) なった ( 　 ) 伝えていただけませんか。', 'FILL_BLANK', '1) に
2) に, が
3) で
4) が
5) に, に
6) は, は
7) も, も
8) が, に
9) の, に, が
10) の
11) で
12) に, と
13) に, に, と', 2 FROM exercises ex WHERE ex.sort_order = 36 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Đổi các từ trong ngoặc ( ) sang dạng thích hợp:
例: 今度の土曜日は都合が (悪いです…悪い) んですが、日を (変えます…変えて) いただけませんか。
1) ガスが (つきません…＿＿＿＿) んですが、どこに (連絡します…＿＿＿＿) らいいですか。
2) ここは (静かです…＿＿＿＿) し、緑も (多いです…＿＿＿＿) し、それに物価も (安いです…＿＿＿＿) んです。
3) 飲み物は冷蔵庫に (入れます…＿＿＿＿) ありますから、出してテーブルに (並べます…＿＿＿＿) おいてください。
4) 勉強が忙しいですから、夏休みはどこへも (行きません…＿＿＿＿) つもりです。
5) どこかで手帳を (なくします…＿＿＿＿) しまいました。
6) (働きます…＿＿＿＿) ながら大学で (勉強します…＿＿＿＿) と思っています。
7) 暇になったら、ピアノを (習います…＿＿＿＿) と思っています。
8) 自転車で学校に (通います…＿＿＿＿) つもりですが、雨の日は (大変です…＿＿＿＿) かもしれません。
9) 道が (すきます…＿＿＿＿) いますから、早く (着きます…＿＿＿＿) かもしれません。
10) 熱があったら、早く帰って (休みます…＿＿＿＿) ほうがいいですよ。
11) 体の調子が悪いときは、無理を (しません…＿＿＿＿) ほうがいいですよ。
12) 部長はまだ (来ます…＿＿＿＿) いません。10時に (来ます…＿＿＿＿) 予定です。
13) 高橋さんは渡辺さんの結婚式に (出席できません…＿＿＿＿) と言っていました。
14) 「使用禁止」は (使ってはいけません…＿＿＿＿) という意味です。
15) ミラーさんは一人でここまで (来られます…＿＿＿＿) でしょうか。', 'FILL_BLANK', '1) つかない, 連絡した
2) 静かだ, 多い, 安い
3) 入れて, 並べて
4) 行かない
5) なくして
6) 働き, 勉強しよう
7) 習おう
8) 通う, 大変
9) すいて, 着く
10) 休んだ
11) しない
12) 来て, 来る
13) 出席できない
14) 使ってはいけない
15) 来られる', 3 FROM exercises ex WHERE ex.sort_order = 36 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành cặp tự động từ / tha động từ tương ứng:
例: ドアを開けます → ドアが開きます
1) 授業を始めます → 授業が＿＿＿＿
2) 会議を続けます → 会議が＿＿＿＿
3) ドアを閉めます → ドアが＿＿＿＿
4) 部屋を＿＿＿＿ → 部屋が片づきます
5) 車を＿＿＿＿ → 車が止まります', 'FILL_BLANK', '1) 始まります
2) 続きます
3) 閉まります
4) 片づけます
5) 止めます', 4 FROM exercises ex WHERE ex.sort_order = 36 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chọn từ KHÔNG THỂ DÙNG ĐƯỢC trong nhóm { }:
例: { コップ, 花瓶, お皿, (靴) } が割れました。
1) { けが, かぜ, やけど, 忘れ物 } をしました。
2) { やる気, 熱, 眠気, 経験 } があります。
3) { 傘, いす, 切手, カメラ } が壊れてしまいました。
4) { ちゃわん, シャツ, 紙, 袋 } が破れています。
5) { 車, 眼鏡, 洗濯機, カメラ } が故障してしまいました。', 'FILL_BLANK', '1) かぜ
2) 眠気
3) 切手
4) ちゃわん
5) 眼鏡', 5 FROM exercises ex WHERE ex.sort_order = 36 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Chọn câu đối đáp phù hợp trong ngoặc { }:
例: A: ただいま。 B: { 行ってらっしゃい, 行ってきます, (お帰りなさい) }
1) A: 財布が見つかりましたよ。
   B: { それはいけませんね, それはおもしろいですね, ああ、よかった }
2) A: いっしょに帰りませんか。
   B: すみません。このコピーをやってしまいますから、{ そろそろ失礼します, また今度お願いします, お先にどうぞ }。
3) A: お子さんのけがはどうですか。
   B: なかなかよくならないんです。
   A: { おかげさまで, それはいけませんね, どうぞお元気で }。
4) A: 課長、{ ちょっとお願いがあるんですが, よろしくお願いします, また今度お願いします }。
   B: 何ですか。', 'FILL_BLANK', '1) ああ、よかった
2) お先にどうぞ
3) それはいけませんね
4) ちょっとお願いがあるんですが', 6 FROM exercises ex WHERE ex.sort_order = 36 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '7. Chọn từ thích hợp trong ngoặc { }:
例: 来週の予定は { たぶん, (はっきり), きっと } わかりません。
1) 木村さんに会って、{ もう, 特に, ぜひ } 話したいです。
2) { もう, 今度, いつでも } いっしょにカラオケに行きませんか。
3) { いつも, いつか, いつでも } 宇宙に行けるかもしれません。
4) この橋は { はっきり, ずっと, ずいぶん } 長いですね。
5) 日曜日は { 確かに, たいてい, ずいぶん } うちにいます。
6) おとといから { ずっと, きっと, はっきり } 雨が降っています。
7) この店の果物は { 何も, 何か, 何でも } 100円です。
8) 来週は暇ですから、ミーティングは { いつも, いつか, いつでも } 大丈夫です。
9) 高橋さんの電話番号は { はっきり, だいたい, 確か } 1234の5678だと思います。
10) { はっきり, しばらく, たいてい } 今の仕事を続けるつもりです。
11) 旅行の準備は { もう, まだ, あと } できていません。
12) 疲れましたから、{ もう, まだ, あと } 歩けません。
13) { もう, まだ, あと } 雨が降っていますか。
14) すみませんが、{ ほかに, まだ, あと } 10分 { しか, ほど, まで } 待っていただけませんか。
15) 駅までどのくらいかかりますか。…タクシーだったら、5分ぐらい { ほど, だけ, しか } かからないと思います。
16) 朝はいつも4時半ごろ起きています。…どうして { こんなに, そんなに, あんなに } 早く起きるんですか。
17) きのうは頭も痛かったし、{ それに, それで, そして } 熱もあったんです。…{ それに, それで, そして } 休んだんですね。
18) 林さんに聞いたんですが、ほんとうに会社をやめるんですか。…ええ、{ きっと, 確か, 実は } 妻とレストランを始めるんです。', 'FILL_BLANK', '1) ぜひ
2) 今度
3) いつか
4) ずいぶん
5) たいてい
6) ずっと
7) 何でも
8) いつでも
9) 確か
10) しばらく
11) まだ
12) もう
13) まだ
14) あと, ほど
15) しか
16) そんなに
17) それに, それで
18) 実は', 7 FROM exercises ex WHERE ex.sort_order = 36 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 7);
-- =========================================================
-- Exercise: Bài 34 (SortOrder 37, Lesson 34)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 34', 'Bài tập Minna no Nihongo N4 - Bài 34: ～とおりに (theo như / đúng như), ～あとで (sau khi), ～て / ～ないで (hành động đi kèm)', 'LESSON', 'EXERCISE', 37 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 34 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 37);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: スポーツクラブ ( に ) 通っています。
1) この箱 ( 　 ) 重い物を載せないでください。
2) これはちょっと塩 ( 　 ) つけて食べてください。
3) 1番線はこの黄色い線 ( 　 ) とおり ( 　 ) 行ってください。
4) 黒 ( 　 ) 紺 ( 　 ) スーツ ( 　 ) 着て結婚式 ( 　 ) 出席します。', 'FILL_BLANK', '1) に
2) を
3) の, に
4) か, の, を, に', 1 FROM exercises ex WHERE ex.sort_order = 37 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Nối 2 vế câu với ～とおりに:
例1: 番号・ボタンを押してください → 番号のとおりに、ボタンを押してください。
例2: さっき松本さんに聞きました・みんなに話しました → さっき松本さんに聞いたとおりに、みんなに話しました。
1) 先生が言いました・書きました
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) この図・いすと机を並べてください
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) 黒い線・紙を折ってください
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) 佐藤さんが説明しました・やってください
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
5) ミラーさんに教えてもらいました・ケーキを作りました
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) 先生が言ったとおりに、書きました。
2) この図のとおりに、いすと机を並べてください。
3) 黒い線のとおりに、紙を折ってください。
4) 佐藤さんが説明したとおりに、やってください。
5) ミラーさんに教えてもらったとおりに、ケーキを作りました。', 2 FROM exercises ex WHERE ex.sort_order = 37 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Chọn từ trong khung và hoàn thành câu với ～あとで:
[ 食事, 面接, 講義, します, 出します, 帰ります ]

例1: 仕事のあとで、泳ぎに行きます。
例2: 甘いお菓子を食べたあとで、苦いお茶を飲みます。
1) ＿＿＿＿あとで、歯を磨いてください。
2) 答案を＿＿＿＿あとで、答えを思い出しました。
3) ＿＿＿＿あとで、先生に質問しました。
4) サッカーの練習を＿＿＿＿あとで、シャワーを浴びます。
5) お客さんが＿＿＿＿あとで、忘れ物に気がつきました。
6) ＿＿＿＿あとで、すぐ旅行に行きます。', 'FILL_BLANK', '1) 食事の
2) 出した
3) 講義の
4) した
5) 帰った
6) 面接の', 3 FROM exercises ex WHERE ex.sort_order = 37 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Điền dạng thích hợp của động từ (hành động đi kèm ～て):
[ はります, かぶります, 入れます, 書きます, 着ます, します ]

例: 銀行からお金を借りてうちを買いました。
1) この手紙は90円の切手を＿＿＿＿出してください。
2) 天気がいい日には帽子を＿＿＿＿出かけます。
3) ケーキは箱に＿＿＿＿持って行きます。
4) レポートには名前を＿＿＿＿出してください。
5) 彼は白いシャツを＿＿＿＿、青いネクタイを＿＿＿＿来ました。', 'FILL_BLANK', '1) はって
2) かぶって
3) 入れて
4) 書いて
5) 着て, して', 4 FROM exercises ex WHERE ex.sort_order = 37 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Hoàn thành câu trả lời với dạng phủ định đi kèm ～ないで:
例: 朝ごはんを食べて学校へ行きますか。…いいえ、食べないで行きます。
1) コーヒーは砂糖を (入れます…＿＿＿＿) 飲みますか。…いいえ、入れないで飲みます。
2) 渡辺さんは傘を持って出かけましたか。…いいえ、(持ちます…＿＿＿＿) 出かけました。
3) エアコンを消して寝ましたか。…いいえ、(消します…＿＿＿＿) 寝てしまいました。
4) 旅行はホテルを (予約します…＿＿＿＿) 行きましたか。…いいえ、予約しないで行きましたが、泊まれました。', 'FILL_BLANK', '1) 入れて
2) 持たないで
3) 消さないで
4) 予約して', 5 FROM exercises ex WHERE ex.sort_order = 37 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Chọn từ trong khung và điền dạng phủ định ～ないで:
[ 行きません, 乗ります, 買いません, 帰りません, 休みません, 決めません ]

例: 要らない物はここに置かないで、捨ててください。
1) 連休はどこへも＿＿＿＿、うちでゆっくり休みたいです。
2) 最近バスやタクシーに＿＿＿＿、よく歩いています。
3) 電気製品が故障しても、新しいのを＿＿＿＿、修理して使っています。
4) きのうはうちへ＿＿＿＿、友達のマンションに泊まりました。
5) 日曜日も＿＿＿＿働くんですか。
6) 一人で＿＿＿＿、みんなの意見を聞いて決めたほうがいいですよ。', 'FILL_BLANK', '1) 行かないで
2) 乗らないで
3) 買わないで
4) 帰らないで
5) 休まないで
6) 決めないで', 6 FROM exercises ex WHERE ex.sort_order = 37 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '7. Chọn từ thích hợp trong ngoặc { }:
例: 妻と { (相談しながら), 相談して, 相談すると } 歩きました。
1) あそこに { 座りながら, (座って), 座ると } お弁当を食べましょう。
2) 電話を { (かけながら), かけて, かけたら } 車を運転しないでください。
3) いつも眼鏡を { かけながら, (かけて), かけたら } 新聞を読みます。
4) これを { (押しながら), 押しても, 押すと } 右へ回すと、ガスがつきます。
5) もしわたしが遅れたら、{ (待たないで), 待って, 待つと } 先に行ってください。
6) そんなに { 急ぎながら, (急いで), 急がないで } 行かなくても、間に合いますよ。
7) きのうはおふろに { 入っても, 入ると, (入らないで) } 寝てしまいました。
8) やまと美術館は6番のバスに { 乗りながら, (乗って), 乗ると }、3つ目で { 降りて, 降りながら, (降りると) }、すぐ前に見えます。', 'FILL_BLANK', '1) 座って
2) かけながら
3) かけて
4) 押しながら
5) 待たないで
6) 急いで
7) 入らないで
8) 乗って, 降りると', 7 FROM exercises ex WHERE ex.sort_order = 37 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 7);
-- =========================================================
-- Exercise: Bài 35 (SortOrder 38, Lesson 35)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 35', 'Bài tập Minna no Nihongo N4 - Bài 35: Thể điều kiện (条件形 ～ば / なら), ～ばいいですか, ～なら (đưa ra chủ đề)', 'LESSON', 'EXERCISE', 38 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 35 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 38);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: 車 ( で ) 川 ( を ) 渡りました。
1) 予定 ( 　 ) 変わったら、連絡してください。
2) 正しい答え ( 　 ) ○ ( 　 ) 付けてください。
3) 屋上 ( 　 ) 富士山 ( 　 ) 見えます。
4) 向こう ( 　 ) 見える建物 ( 　 ) 何ですか。
5) 庭 ( 　 ) きれいな花 ( 　 ) 咲いていますね。', 'FILL_BLANK', '1) が
2) に, を
3) から, が
4) に, は
5) に, が', 1 FROM exercises ex WHERE ex.sort_order = 38 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Chọn từ trong khung và chia sang thể điều kiện (～ば / なら):
[ 平日です, 無理です, 遠いです, 簡単な料理です, 困ります, 辞書を引きます, 話せます, もらいません, 要りません ]

例1: きょう出せば、あした着くと思います。
例2: 簡単な料理なら、作れます。
1) いろいろな外国語が＿＿＿＿、海外旅行は楽しいでしょう。
2) 許可を＿＿＿＿、ここには入れません。
3) いい品物で、＿＿＿＿、たくさん売れると思います。
4) ＿＿＿＿、デパートはそんなに込んでいないと思いますよ。
5) このパソコン、修理が＿＿＿＿、新しいのを買わなければなりません。
6) この雑誌、＿＿＿＿、捨てますよ。
7) このカーテンはどうやって閉めるんですか。…そのひもを＿＿＿＿、閉まりますよ。', 'FILL_BLANK', '1) 話せれば
2) もらわなければ
3) 安ければ
4) 平日なら
5) 無理なら
6) 要らなければ
7) 引けば', 2 FROM exercises ex WHERE ex.sort_order = 38 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu hỏi lời khuyên với ～んですが、～ばいいですか:
例: パスポートをなくしました・どうしますか → パスポートをなくしたんですが、どうすればいいですか。
1) 新しいコピー機の使い方がわかりません・だれに聞きますか
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) 大学院の試験を受けたいです・いつまでに申し込みますか
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) お葬式に行きます・どんな服を着て行きますか
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) 新しいコピー機の使い方がわからないんですが、だれに聞けばいいですか。
2) 大学院の試験を受けたいんですが、いつまでに申し込めばいいですか。
3) お葬式に行くんですが、どんな服を着て行けばいいですか。', 3 FROM exercises ex WHERE ex.sort_order = 38 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành hội thoại với thể điều kiện ～ば / なら:
例1: A: 体の調子がよくないですから、たばこをやめます。 B: たばこをやめれば、よくなるかもしれませんよ。
例2: A: ワインを買いたいんですが、どこで買ったらいいですか。 B: ワインなら、エドヤストアがいいと思いますよ。
1) A: 間に合わないかもしれませんから、タクシーで行きます。
   B: タクシーで＿＿＿＿、間に合うでしょう。
2) A: こんなに雨が降っていますから、あしたの山登りは無理ですよ。
   B: 山登りが＿＿＿＿、ゆっくり温泉に入りましょう。
3) A: 料理を習いたいんですが、いい料理教室を知っていますか。
   B: そうですね、「花クッキング」がいいと思いますよ。駅から近いし、設備もいいですから。
   A: 料理教室なら、駅から近くて設備が＿＿＿＿、高いでしょう？', 'FILL_BLANK', '1) 行けば
2) 無理なら
3) 料理教室なら, よければ', 4 FROM exercises ex WHERE ex.sort_order = 38 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Hoàn thành câu với thể điều kiện (～ば / なければ):
例1: 地図があれば、初めての町でも一人で行けます。
例2: 漢字で書けなければ、ひらがなで書いてもいいです。
1) ことばの意味が (わかります…＿＿＿＿)、辞書で調べます。
2) 次のバスに (乗ります…＿＿＿＿)、間に合いません。
3) 年を (取ります…＿＿＿＿)、だれでも歯や目が悪くなります。
4) 桜が (咲きます…＿＿＿＿)、ここでお花見ができます。
5) 時間が (あります…＿＿＿＿)、タクシーで行きましょう。
6) 早く (寝ます…＿＿＿＿)、朝早く起きられるでしょう。', 'FILL_BLANK', '1) わからなければ
2) 乗らなければ／乗れなければ
3) 取れば
4) 咲けば
5) なければ
6) 寝れば', 5 FROM exercises ex WHERE ex.sort_order = 38 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Đánh dấu ○ nếu dùng đúng ngữ pháp điều kiện, × nếu không dùng được:
例1: 資料は3部 { あれば (○), あったら (○) }、足りるでしょう。
例2: 道具を { 使えば (×), 使ったら (○) }、元の所に戻しておいてください。
1) ミラーさんが { 来たら ( 　 ), 来れば ( 　 ) }、ミーティングを始めましょう。
2) 来週広島へ出張しますから、広島へ { 行けば ( 　 ), 行ったら ( 　 ) }、友達に会いたいです。
3) 計画について質問が { なければ ( 　 ), ないと ( 　 ) }、これで終わりましょう。
4) { 寒ければ ( 　 ), 寒かったら ( 　 ) }、エアコンを消してください。
5) あした { 晴れると ( 　 ), 晴れれば ( 　 ) }、海へ行きます。
6) タクシーに忘れ物をしたんですが、どう { すれば ( 　 ), したら ( 　 ) } いいですか。', 'FILL_BLANK', '1) ○, ×
2) ×, ○
3) ○, ×
4) ○, ○
5) ×, ○
6) ○, ○', 6 FROM exercises ex WHERE ex.sort_order = 38 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: Bài 36 (SortOrder 39, Lesson 36)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 36', 'Bài tập Minna no Nihongo N4 - Bài 36: ～ように (để mà / mục đích), ～ようになりました (thay đổi trạng thái/khả năng), ～ようにしています (cố gắng làm gì)', 'LESSON', 'EXERCISE', 39 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 36 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 39);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ) hoặc đánh × nếu không cần trợ từ:
例: きのう ( × ) ミラーさん ( に ) 会いました。
1) ラッシュ ( 　 ) あわないように、いつも ( 　 ) 7時ごろうち ( 　 ) 出ます。
2) 夜10時 ( 　 ) 過ぎたら、できるだけ ( 　 ) 電話をかけないほうがいいです。
3) 新しい仕事 ( 　 ) やっと ( 　 ) 少し慣れました。
4) 毎朝 ( 　 ) 必ず毎 ( 　 ) 1万歩歩くようにしています。', 'FILL_BLANK', '1) に, ×, を
2) を, ×
3) に, ×
4) ×, 日', 1 FROM exercises ex WHERE ex.sort_order = 39 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Hoàn thành câu chỉ mục đích với thể khả năng/thể ない + ように:
例1: よく見えるように、大きい字で書いてください。
例2: 道をまちがえないように、地図を持って行きます。
1) あした早く (起きます…＿＿＿＿) ように、今晩早く寝ます。
2) 大切な約束を (忘れます…＿＿＿＿) ように、メモしておきます。
3) お茶を飲みたいとき、いつでも (飲みます…＿＿＿＿) ように、お湯が置いてあります。
4) いいレポートが (書きます…＿＿＿＿) ように、資料を集めています。
5) 寒いですから、かぜを (ひきません…＿＿＿＿) ように、気をつけてください。', 'FILL_BLANK', '1) 起きられる
2) 忘れない
3) 飲める
4) 書ける
5) ひかない', 2 FROM exercises ex WHERE ex.sort_order = 39 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Chọn động từ trong khung và chia sang ～ようになりました:
[ 着られます, 泳げます, 住めます, 使えます, 置けます, 散歩します, かけられます ]

例: 漢字が少し読めるようになりました。
1) やっと上手にはしが＿＿＿＿ようになりました。
2) 広い部屋に引っ越ししましたから、大きい家具が＿＿＿＿ようになりました。
3) ダイエットをすれば、小さいサイズの服が＿＿＿＿ようになるでしょう。
4) 早く日本語で電話が＿＿＿＿ようになりたいです。
5) いつかわたしたちは月に＿＿＿＿ようになるでしょうか。', 'FILL_BLANK', '1) 使える
2) 置ける
3) 着られる
4) かけられる
5) 住める', 3 FROM exercises ex WHERE ex.sort_order = 39 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu hỏi và câu trả lời với thể khả năng + ようになりましたか:
例: 自転車に乗れるようになりましたか。…いいえ、まだ乗れません。
1) お子さんは (歩きます…＿＿＿＿) ようになりましたか。…いいえ、まだほとんど歩けません。
2) 漢字が書けるようになりましたか。…いいえ、まだあまり (書きます…＿＿＿＿)。
3) 日本語で意見が (言います…＿＿＿＿) ようになりましたか。…いいえ、まだほとんど言えません。
4) どんな料理が作れるようになりましたか。…まだ簡単な料理しか (作ります…＿＿＿＿)。
5) 何メートルぐらい (泳ぎます…＿＿＿＿) ようになりましたか。…まだ5メートルぐらいしか泳げません。', 'FILL_BLANK', '1) 歩ける
2) 書けません
3) 言える
4) 作れません
5) 泳げる', 4 FROM exercises ex WHERE ex.sort_order = 39 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chọn phó từ thích hợp trong ngoặc { } và chia động từ với ～ようにしています / ～ようにしてください:
例1: わからないことばがあったら、{ (すぐに), やっと, かなり } 辞書で調べるようにしています。
例2: 体の調子が悪いときは、{ (あまり), 必ず, なかなか } 無理をしないようにしてください。
1) ニュースの日本語が { きっと, 必ず, やっと } 少し (わかります…＿＿＿＿) ようになりました。
2) ここでは { 絶対に, 必ず, なかなか } たばこを (吸います…＿＿＿＿) ようにしてください。
3) 夜は { できるだけ, かなり, やっと } 早く寝て、朝は早く (起きます…＿＿＿＿) ようにしています。
4) 毎晩寝るまえに、{ かなり, 必ず, やっと } 歯を (磨きます…＿＿＿＿) ようにしています。
5) { できるだけ, なかなか, きっと } 夜遅く電話を (かけます…＿＿＿＿) ようにしてください。', 'FILL_BLANK', '1) やっと, わかる
2) 絶対に, 吸わない
3) できるだけ, 起きる
4) 必ず, 磨く
5) できるだけ, かけない', 5 FROM exercises ex WHERE ex.sort_order = 39 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Phân biệt ～てください và ～ようにしてください (đánh ○ hoặc ×):
例1: 使った道具は元の所に戻して (○)、戻すようにして (○) ください。
例2: ちょっとこのホッチキスを貸して (○)、貸すようにして (×) ください。
1) すみませんが、もう少し待って ( 　 )、待つようにして ( 　 ) ください。
2) 規則は必ず守って ( 　 )、守るようにして ( 　 ) ください。
3) 道にごみを捨てないで ( 　 )、捨てないようにして ( 　 ) ください。
4) このケーキ、おいしいですね。…そうですか。どうぞたくさん食べて ( 　 )、食べるようにして ( 　 ) ください。
5) すみませんが、ちょっと手伝って ( 　 )、手伝うようにして ( 　 ) ください。', 'FILL_BLANK', '1) ○, ×
2) ○, ○
3) ○, ○
4) ○, ×
5) ○, ×', 6 FROM exercises ex WHERE ex.sort_order = 39 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: Bài 37 (SortOrder 40, Lesson 37)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 37', 'Bài tập Minna no Nihongo N4 - Bài 37: Thể bị động (受身形), Bị động trực tiếp, Bị động gián tiếp / phiền toái, Bị động vô tri (sự vật)', 'LESSON', 'EXERCISE', 40 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 37 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 40);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Hoàn thành bảng chia động từ thể bị động (受身形):
例: 捨てます → 捨てられます → 捨てられる
1) ほめます → ＿＿＿＿ → ＿＿＿＿
2) ＿＿＿＿ → 注意されます → ＿＿＿＿
3) ＿＿＿＿ → 頼まれます → 頼まれる
4) 呼びます → ＿＿＿＿ → ＿＿＿＿
5) ＿＿＿＿ → 決められます → ＿＿＿＿
6) ＿＿＿＿ → 連れて来られます → 連れて来られる
7) 読みます → ＿＿＿＿ → ＿＿＿＿
8) ＿＿＿＿ → 見られます → ＿＿＿＿', 'FILL_BLANK', '1) ほめられます, ほめられる
2) 注意します, 注意される
3) 頼みます, 頼まれる
4) 呼ばれます, 呼ばれる
5) 決めます, 決められる
6) 連れて来ます, 連れて来られます
7) 読まれます, 読まれる
8) 見ます, 見られる', 1 FROM exercises ex WHERE ex.sort_order = 40 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Điền trợ từ thích hợp vào ngoặc ( ):
例: 2階の窓 ( から ) 海 ( が ) 見えます。
1) 冬 ( 　 ) スキー ( 　 ) したいです。
2) 日本語を英語 ( 　 ) 翻訳します。
3) 石油はサウジアラビア ( 　 ) 輸入しています。
4) わたしは弟 ( 　 ) 結婚式 ( 　 ) 申し込もうと思っています。
5) わたしはタワポンさん ( 　 ) 結婚式 ( 　 ) 招待するつもりです。
6) わたしは弟 ( 　 ) 傘 ( 　 ) なくされました。
7) 日本では建物や橋を木 ( 　 ) 造っていました。
8) ワインは何 ( 　 ) 造られるんですか。', 'FILL_BLANK', '1) を, に
2) に
3) から
4) に, を
5) を, に
6) に, を
7) で
8) から', 2 FROM exercises ex WHERE ex.sort_order = 40 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Chọn động từ trong khung và chia sang thể bị động (受身形):
[ 開きます, 運びます, 発明します, 発見します, 建てます, かきます, 壊します ]

例: この絵は200年ぐらいまえに (かかれました)。
1) インスタントラーメンは日本で＿＿＿＿。
2) 4年に1度オリンピックが＿＿＿＿。
3) 去年この町に大きい美術館が＿＿＿＿。
4) あの古いビルはもうすぐ＿＿＿＿予定です。
5) これからまた新しい星が＿＿＿＿でしょう。', 'FILL_BLANK', '1) 発明されました
2) 開かれます
3) 建てられました
4) 壊される
5) 発見される', 3 FROM exercises ex WHERE ex.sort_order = 40 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Chuyển các câu chủ động sau sang câu bị động (受身文):
例1: 先生がテレーザちゃんをほめました。…テレーザちゃんは先生にほめられました。
例2: 子どもがわたしのパソコンを壊しました。…わたしは子どもにパソコンを壊されました。
1) 渡辺さんがわたしをデートに誘いました。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) 警官が泥棒を連れて行きました。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) カリナさんがわたしに大学院の試験について聞きました。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) 課長が山田さんに資料のコピーを頼みました。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
5) 子どもがわたしの新しいスーツを汚しました。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
6) 犬がわたしの足をかみました。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
7) だれかがわたしの傘をまちがえました。
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) わたしは渡辺さんにデートに誘われました。
2) 泥棒は警官に連れて行かれました。
3) わたしはカリナさんに大学院の試験について聞かれました。
4) 山田さんは課長に資料のコピーを頼まれました。
5) わたしは子どもに新しいスーツを汚されました。
6) わたしは犬に足をかまれました。
7) わたしはだれかに傘をまちがえられました。', 4 FROM exercises ex WHERE ex.sort_order = 40 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chọn động từ trong khung và chia sang thể bị động (được làm gì trên thế giới):
[ 輸入しています, 待っています, 食べています, 読んでいます, 言っています, 飼っています, 輸出しています ]

例: コンピューターはいろいろな所で使われています。
1) 日本では犬や猫などがよく＿＿＿＿。
2) この製品はいろいろな国へ＿＿＿＿。
3) このマンガは世界中の子どもに＿＿＿＿。
4) インスタントラーメンは外国でもよく＿＿＿＿。
5) 動物も人の気持ちがわかると＿＿＿＿。', 'FILL_BLANK', '1) 飼われています
2) 輸出されています
3) 読まれています
4) 食べられています
5) 言われています', 5 FROM exercises ex WHERE ex.sort_order = 40 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Chọn cách diễn đạt đúng trong ngoặc { } (bị hại vs nhờ vả/được giúp):
例: 子どものとき、父によく { (しかられました), しかってもらいました }。
1) 電車の中で足を { 踏まれました, 踏んでもらいました }。
2) 山田さんに車で駅まで { 送られました, 送ってもらいました }。
3) 鈴木さんにカメラを { 貸されました, 貸してもらいました }。
4) 泥棒にお金を { とられました, とってもらいました }。
5) 早く医者に { 診られた, 診てもらった } ほうがいいですよ。', 'FILL_BLANK', '1) 踏まれました
2) 送ってもらいました
3) 貸してもらいました
4) とられました
5) 診てもらった', 6 FROM exercises ex WHERE ex.sort_order = 40 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: Bài 38 (SortOrder 41, Lesson 38)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 38', 'Bài tập Minna no Nihongo N4 - Bài 38: Danh từ hóa động từ với の (～のは～です, ～のが～です, ～のを忘れました, ～のを知っていますか)', 'LESSON', 'EXERCISE', 41 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 38 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 41);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: やっと日本の生活 ( に ) 慣れました。
1) ボランティア ( 　 ) 参加したことがありますか。
2) パソコン ( 　 ) 箱 ( 　 ) 入れてください。
3) うそ ( 　 ) つくのはよくないです。
4) 先週姉 ( 　 ) 男の子 ( 　 ) 生まれました。
5) 書類の名前の横 ( 　 ) はんこ ( 　 ) 押してください。', 'FILL_BLANK', '1) に
2) の, を
3) を
4) に, が
5) に, を', 1 FROM exercises ex WHERE ex.sort_order = 41 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Chọn từ trong khung và hoàn thành câu với dạng danh từ hóa ～のは:
[ あります, 伝えます, 運びます, 翻訳します, 聞きます, 勉強します, 着て行きます ]

例: 走って行くのは危ないです。
1) 働きながら大学で＿＿＿＿大変です。
2) 結婚式にこの服を＿＿＿＿おかしいですか。
3) 近くに大きいスーパーが＿＿＿＿便利ですね。
4) 自分の気持ちを＿＿＿＿とても難しいと思います。
5) 引っ越しの荷物をこの車で＿＿＿＿ちょっと無理です。', 'FILL_BLANK', '1) 勉強するのは
2) 着て行くのは
3) あるのは
4) 伝えるのは
5) 運ぶのは', 2 FROM exercises ex WHERE ex.sort_order = 41 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu theo ý của bạn với ～のは (tham khảo đáp án mẫu):
例: 働きながら子どもを育てるのは大変です。
1) ＿＿＿＿楽しいです。
2) ＿＿＿＿体によくないです。
3) ＿＿＿＿気持ちがいいです。
4) 外国語でスピーチをするのは＿＿＿＿。
5) ケータイを見ながら歩くのは＿＿＿＿。', 'FILL_BLANK', '1) 家族と旅行するのは
2) たばこをたくさん吸うのは
3) 朝早く海岸を散歩するのは
4) 難しいです
5) 危ないです', 3 FROM exercises ex WHERE ex.sort_order = 41 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Nối 2 vế câu với tính từ và ～のが:
例: 息子は好きです・動物を飼います → 息子は動物を飼うのが好きです。
1) ことしは遅いです・桜が咲きます
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) わたしは下手です・整理します
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) 子どもは早いです・けがが治ります
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) マリアさんは上手です・プレゼントを選びます
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
5) わたしは嫌いです・込んでいる電車に乗ります
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) ことしは桜が咲くのが遅いです。
2) わたしは整理するのが下手です。
3) 子どもはけがが治るのが早いです。
4) マリアさんはプレゼントを選ぶのが上手です。
5) わたしは込んでいる電車に乗るのが嫌いです。', 4 FROM exercises ex WHERE ex.sort_order = 41 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Hoàn thành câu với thể từ điển + のを忘れました:
例: ミーティングの時間を決めましたが、渡辺さんに (連絡するのを) 忘れました。
1) 木村さんに手紙を出しましたが、切手を (はります…＿＿＿＿) 忘れました。
2) 帰るときは、コピー機の電源を (切ります…＿＿＿＿) 忘れないでください。
3) 書類を入れた引き出しのかぎを (掛けます…＿＿＿＿) 忘れないようにしてください。
4) きのう出したレポートに名前を (書きます…＿＿＿＿) 忘れてしまいました。', 'FILL_BLANK', '1) はるのを
2) 切るのを
3) 掛けるのを
4) 書くのを', 5 FROM exercises ex WHERE ex.sort_order = 41 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Chọn từ trong khung và hoàn thành câu với ～のを知っていますか / 知りませんでした:
[ 買いました, 飼えません, 退院します, 書いています, 着ています, できました, 合格しました, 入院しました ]

例: うちの前に大きなレストランができたのを知っていますか。
1) 林さんの息子さんが大学に＿＿＿＿知りませんでした。
2) 高橋さんがドイツ製の車を＿＿＿＿知っていますか。
3) このマンションではペットが＿＿＿＿知りませんでした。
4) あさって林さんが＿＿＿＿知っていますか。
5) きのう山田さんの奥さんが＿＿＿＿知っていますか。
6) ミラーさんが「20分でできるおいしい料理」という本を＿＿＿＿知っていますか。', 'FILL_BLANK', '1) 合格したのを
2) 買ったのを
3) 飼えないのを
4) 退院するのを
5) 入院したのを
6) 書いているのを', 6 FROM exercises ex WHERE ex.sort_order = 41 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '7. Hoàn thành câu nhấn mạnh với thể thông thường + のは～です:
例: 金沢へ行ったことがありますか。…ええ、何度もあります。初めて (行きました…行ったのは) おととしです。
1) ご主人はよく料理を作りますか。…ええ。たいてい料理を (作ります…＿＿＿＿) 夫ですが、食事のあとで片づけるのはわたしです。
2) 旅行中パスポートとカメラをとられました。…(とられました…＿＿＿＿) パスポートとカメラだけですか。
3) 甘い物が好きですか。…ええ。甘い物なら何でも好きですが、特に (好きです…＿＿＿＿) チョコレートです。
4) 日本語の勉強で何がいちばん難しいですか。…そうですね。いちばん (難しいです…＿＿＿＿) 漢字だと思います。
5) ヨーロッパ旅行でどこがよかったですか。…全部よかったですが、いちばん (よかったです…＿＿＿＿) イタリアです。', 'FILL_BLANK', '1) 作るのは
2) とられたのは
3) 好きなのは
4) 難しいのは
5) よかったのは', 7 FROM exercises ex WHERE ex.sort_order = 41 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 7);
-- =========================================================
-- Exercise: Bài 39 (SortOrder 42, Lesson 39)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 39', 'Bài tập Minna no Nihongo N4 - Bài 39: Nguyên nhân hệ quả với ～て / で (chỉ cảm xúc, trạng thái bất khả kháng, hiện tượng tự nhiên), ～ので (bởi vì / lịch sự)', 'LESSON', 'EXERCISE', 42 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 39 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 42);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: 交差点 ( で ) バスとタクシー ( が ) ぶつかりました。
1) 津波 ( 　 ) 木 ( 　 ) 大勢倒れました。
2) 授業 ( 　 ) 遅れて、先生 ( 　 ) しかられました。
3) 質問 ( 　 ) 答えられなくて、恥ずかしかったです。
4) バスはこの道 ( 　 ) 通って、駅まで行きます。', 'FILL_BLANK', '1) で, が
2) に, に
3) に
4) を', 1 FROM exercises ex WHERE ex.sort_order = 42 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Hoàn thành câu chỉ lý do với thể ～て / で:
例1: (地震です…地震で) 橋が壊れました。
例2: 電話で母の元気な声を (聞きました…聞いて) 安心しました。
1) (台風です…＿＿＿＿)、木が倒れました。
2) 日本語が (わかりません…＿＿＿＿)、困っています。
3) バスが (遅れました…＿＿＿＿)、約束の時間に間に合いませんでした。
4) 友達に (会えませんでした…＿＿＿＿)、がっかりしました。
5) 友達が (いません…＿＿＿＿)、寂しいです。
6) きのうの夜は (暑かったです…＿＿＿＿)、寝られませんでした。
7) マンガミュージアムで先生に (会いました…＿＿＿＿)、びっくりしました。
8) (火事です…＿＿＿＿)、京都の古いお寺が焼けてしまいました。
9) あのビルが (邪魔です…＿＿＿＿)、富士山が見えません。
10) 今度のミーティングに (出席できません…＿＿＿＿)、すみません。', 'FILL_BLANK', '1) 台風で
2) わからなくて
3) 遅れて
4) 会えなくて
5) いなくて
6) 暑くて
7) 会って
8) 火事で
9) 邪魔で
10) 出席できなくて', 2 FROM exercises ex WHERE ex.sort_order = 42 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu trả lời chỉ lý do với thể ～て / で:
例: その窓から海が見えますか。…いいえ、もう外は (暗いです…暗くて)、何も見えません。
1) 授業の時間に間に合いましたか。…いいえ、道で事故が (ありました…＿＿＿＿)、間に合いませんでした。
2) ゆうべよく寝られましたか。…いいえ、隣のテレビの音が (うるさかったです…＿＿＿＿)、寝られませんでした。
3) 漢字はすぐ覚えられますか。…いいえ、字が (複雑です…＿＿＿＿)、なかなか覚えられません。
4) 講義はわかりますか。…いいえ、話し方が (速いです…＿＿＿＿)、よくわかりません。', 'FILL_BLANK', '1) あって, 間に合いませんでした
2) うるさくて, 寝られませんでした
3) 複雑で, 覚えられません
4) 速くて, わかりません', 3 FROM exercises ex WHERE ex.sort_order = 42 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu chỉ lý do với thể thông thường + ので:
例: 毎日 (練習しました…練習した) ので、日本語が話せるようになりました。
1) ちょっと用事が (あります…＿＿＿＿) ので、きょうは残業しないで帰ります。
2) 漢字が (わかりません…＿＿＿＿) ので、ひらがなで書いてもいいですか。
3) 現金が (足りませんでした…＿＿＿＿) ので、カードで払いました。
4) あしたお見合いを (します…＿＿＿＿) ので、着物を着ようと思っています。
5) ちょっと (邪魔です…＿＿＿＿) ので、この箱を片づけてもいいですか。
6) 東京は家賃が (高いです…＿＿＿＿) ので、広い部屋は借りられません。
7) この電車は (特別です…＿＿＿＿) ので、1時間ぐらいで着くと思います。
8) 今はラッシュの (時間じゃありません…＿＿＿＿) ので、そんなに込んでいないと思います。
9) 来週 (出張しなければなりません…＿＿＿＿) ので、今準備をしています。
10) コーヒーはあまり (好きじゃありません…＿＿＿＿) ので、紅茶を飲みます。', 'FILL_BLANK', '1) ある
2) わからない
3) 足りなかった
4) する
5) 邪魔な
6) 高い
7) 特別な
8) 時間じゃない
9) 出張しなければならない
10) 好きじゃない', 4 FROM exercises ex WHERE ex.sort_order = 42 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Nối câu diễn tả nguyên nhân kết quả dùng ので:
例: かぜでした／頭が痛かったです／会社を休みました → かぜで頭が痛かったので、会社を休みました。
1) 地震でした／電車が止まってしまいました／うちへ帰れませんでした
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) テニスをしました／疲れました／きょうは早く寝ます
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) この荷物は重いです／一人で持てません／手伝ってください
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) 足が痛かったです／歩けませんでした／タクシーで帰りました
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) 地震で電車が止まってしまったので、うちへ帰れませんでした。
2) テニスをして疲れたので、きょうは早く寝ます。
3) この荷物は重くて一人で持てないので、手伝ってください。
4) 足が痛くて歩けなかったので、タクシーで帰りました。', 5 FROM exercises ex WHERE ex.sort_order = 42 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Chọn vế câu phù hợp với thể て/で trong ngoặc { }:
例: うるさくて { 勉強しません, (勉強できません) }。
1) 富士山が見えて { うれしかったです, 写真を撮りました }。
2) 物価が高くて { 困ります, 買い物をしません }。
3) わたしは字が下手で { 手紙を書きません, 恥ずかしいです }。
4) 遅くなって { すみません, タクシーに乗ろうと思います }。
5) 台風で { 仕事をしませんでした, 寝られませんでした }。', 'FILL_BLANK', '1) うれしかったです
2) 困ります
3) 恥ずかしいです
4) すみません
5) 寝られませんでした', 6 FROM exercises ex WHERE ex.sort_order = 42 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: Bài 40 (SortOrder 43, Lesson 40)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 40', 'Bài tập Minna no Nihongo N4 - Bài 40: Câu lồng nghi vấn từ ～か, Câu lồng Có/Không ～かどうか, Động từ ～てみます (thử làm gì)', 'LESSON', 'EXERCISE', 43 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 40 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 43);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Lồng câu hỏi có nghi vấn từ (～か) hoặc câu hỏi Có/Không (～かどうか):
例1: あしたどの映画を見ますか・決めましたか → あしたどの映画を見るか、決めましたか。
例2: カリナさんは今うちにいますか・わかりません → カリナさんは今うちにいるかどうか、わかりません。
1) ケーキが何個ありますか・数えてください
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) シュミットさんはどんな料理が好きですか・知りたいです
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) ワットさんはどうして来ませんでしたか・わかりますか
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) このカメラはいくらでしたか・覚えていません
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
5) この手紙は重さが25グラム以下ですか・量ってください
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
6) この答えは正しいですか・もう一度考えてください
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) ケーキが何個あるか、数えてください。
2) シュミットさんはどんな料理が好きか、知りたいです。
3) ワットさんはどうして来なかったか、わかりますか。
4) このカメラはいくらだったか、覚えていません。
5) この手紙は重さが25グラム以下かどうか、量ってください。
6) この答えは正しいかどうか、もう一度考えてください。', 1 FROM exercises ex WHERE ex.sort_order = 43 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Hoàn thành câu trả lời với ～か / ～かどうか:
例1: 会議は何時からですか。…何時からか、佐藤さんに聞きましょう。
例2: あした来られますか。…来られるかどうか、わかりません。
1) この書類、はんこが必要ですか。…さあ、＿＿＿＿、わかりません。
2) この料理は辛いですか。…＿＿＿＿、食べてみてください。
3) 忘年会に出席しますか。…＿＿＿＿、まだ決めていません。
4) スピーチコンテストの申し込みは何日までですか。…＿＿＿＿、覚えていません。
5) 電話番号はまちがいがありませんか。…＿＿＿＿、確かめます。
6) ミラーさんの誕生日のプレゼント、何をあげますか。…＿＿＿＿、今考えています。
7) この料理はどうやって作りましたか。…母が作ったので、わたしも＿＿＿＿、わからないんです。', 'FILL_BLANK', '1) 必要かどうか
2) 辛いかどうか
3) 出席するかどうか
4) 何日までか
5) まちがいがないかどうか
6) 何をあげるか
7) どうやって作ったか', 2 FROM exercises ex WHERE ex.sort_order = 43 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Nối 2 vế câu với ～かどうか / ～か + ～てみます:
例: うちを出ましたか・電話をかけます → イーさんはもううちを出たかどうか、電話をかけてみます。
1) ちょうどいいですか・はきます → ズボンを買うとき、長さが＿＿＿＿
2) サイズが合いますか・かぶります → 帽子を買うとき、＿＿＿＿
3) 足が痛くないですか・はいて歩きます → 靴を買うとき、＿＿＿＿
4) 来ますか・聞いてください → イーさんはパーティーに＿＿＿＿
5) どんな店ですか・入りました → 新しいレストランができたので、＿＿＿＿', 'FILL_BLANK', '1) ちょうどいいかどうか、はいてみます。
2) サイズが合うかどうか、かぶってみます。
3) 足が痛くないかどうか、はいて歩いてみます。
4) 来るかどうか、聞いてみてください。
5) どんな店か、入ってみました。', 3 FROM exercises ex WHERE ex.sort_order = 43 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu với thể ～てみます:
例: 盆踊りにいっしょに (行きます…行ってみ) ませんか。
1) 鈴木さんは出かけているかもしれませんから、行くまえに電話を (かけます…＿＿＿＿) ほうがいいですよ。
2) わたしが初めて作った日本料理です。おいしいかどうか、(食べます…＿＿＿＿) ください。
3) 富士山に (登ります…＿＿＿＿) たいんですが、頂上まで登るのは大変でしょうか。
4) このコート、ちょっと (着ます…＿＿＿＿) もいいですか。
5) 部長はあした都合がいいかどうか、(聞きます…＿＿＿＿) ましょう。
6) 先生、わたしが (読みます…＿＿＿＿) ますから、まちがいを直してください。
7) 初めて日本のお酒を (飲みます…＿＿＿＿) ました。', 'FILL_BLANK', '1) かけてみた
2) 食べてみて
3) 登ってみ
4) 着てみて
5) 聞いてみ
6) 読んでみ
7) 飲んでみ', 4 FROM exercises ex WHERE ex.sort_order = 43 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chọn từ thích hợp trong ngoặc { }:
例: 冷蔵庫に卵が1 { 個, (本), 枚 } しかありません。
1) 封筒の { 表, 隣, 裏 } に自分の住所と名前を書きます。
2) マラソン大会の { 連絡, 申し込み, 出席 } はあさってまでですよ。
3) 星の { 大きさ, 重さ, 速さ } はどのくらいかわかりますか。
4) 台風6 { 号, 階, 便 } はたぶん日本へ来ないと思います。
5) 試験の { 返事, 成績, 連絡 } が悪かったので、3月に卒業できないかもしれません。', 'FILL_BLANK', '1) 裏
2) 申し込み
3) 大きさ
4) 号
5) 成績', 5 FROM exercises ex WHERE ex.sort_order = 43 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
-- =========================================================
-- Exercise: Bài 41 (SortOrder 44, Lesson 41)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 41', 'Bài tập Minna no Nihongo N4 - Bài 41: Kính ngữ cho - nhận đồ vật (いただきます, くださいます, やります), Cho - nhận hành động (～ていただきます, ～てくださいます, ～てやります), Yêu cầu lịch sự ～てくださいませんか', 'LESSON', 'EXERCISE', 44 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 41 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 44);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: わたしは中村課長 ( に ) 京都 ( を ) 案内していただきました。
1) わたしは日本の友達 ( 　 ) 傘 ( 　 ) あげました。
2) 入院したとき、お見舞い ( 　 ) 部長が花や果物 ( 　 ) 持って来てくださいます。
3) わたしは甥 ( 　 ) 絵本 ( 　 ) 読んでやりました。
4) 田中さんがわたし ( 　 ) かばん ( 　 ) 持ってくださいました。
5) わたしは犬 ( 　 ) 散歩 ( 　 ) 連れて行ってやります。', 'FILL_BLANK', '1) に, を
2) に, を
3) に, を
4) の, を
5) を, に', 1 FROM exercises ex WHERE ex.sort_order = 44 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Chọn từ trong khung và điền vào chỗ trống:
[ あげます, もらいます, くれます, やります, いただきます, くださいます ]

例: かわいい犬でしょう？でも、毎日水とえさを (やる) のは大変なんです。
1) わたしの誕生日に妹は自分で作った人形を＿＿＿＿。
2) ワット先生が来月イギリスへ帰るんですが、お土産に何を＿＿＿＿らいいでしょうか。
3) これは高校の先生が＿＿＿＿日本語の辞書で、とても便利です。
4) このお皿、すてきでしょう？結婚のお祝いに中村課長に＿＿＿＿んです。
5) きれいな手袋ですね。外国のですか。…ええ、祖父に＿＿＿＿お金で買ったんです。', 'FILL_BLANK', '1) くれました
2) あげた
3) くださった
4) いただいた
5) もらった', 2 FROM exercises ex WHERE ex.sort_order = 44 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Chọn động từ cho nhận phù hợp:
[ くださいます, いただきます, やります, あげます, もらいます, くれます ]

例: 中村課長が相撲を見に連れて行ってくださいました。
1) 英語クラスの皆さんにわたしの国のことばを少し教えて＿＿＿＿。
2) きのう課長に車で送って＿＿＿＿。
3) きのう妻がタイ料理を作って＿＿＿＿。
4) 部長に食事に招待して＿＿＿＿、うれしかったです。
5) 今晩妹の宿題を見て＿＿＿＿なければなりません。
6) 引っ越ししたとき、友達に手伝って＿＿＿＿。
7) ホームステイの家族の皆さんが町のいろいろな情報を教えて＿＿＿＿。', 'FILL_BLANK', '1) あげました
2) いただきました
3) くれました
4) いただいて
5) やり
6) もらいました
7) くださいました', 3 FROM exercises ex WHERE ex.sort_order = 44 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu diễn đạt cho - nhận hành động:
例: だれがこの資料を貸してくれたんですか。…松本部長が貸してくださったんです。
1) だれに日本語の文法を教えてもらいましたか。…大学の先生に＿＿＿＿。
2) クリスマスにお子さんに何か買ってあげましたか。…おもちゃを＿＿＿＿。
3) 道がわからなければ、地図をかきましょうか。…もう松本部長が＿＿＿＿から、大丈夫です。
4) 弟さんが日本へ来たら、どこを案内してあげますか。…京都を＿＿＿＿つもりです。
5) きのうだれが駅まで送ってくれましたか。…妻が＿＿＿＿。
6) その自転車、自分で修理したんですか。…いいえ、兄に＿＿＿＿んです。
7) いい辞書ですね。自分で選んだんですか。…いいえ、日本語の先生に＿＿＿＿んです。', 'FILL_BLANK', '1) 教えていただきました
2) 買ってやりました
3) かいてくださいました
4) 案内してやる
5) 送ってくれました
6) 修理してもらった
7) 選んでいただいた', 4 FROM exercises ex WHERE ex.sort_order = 44 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chọn động từ trong khung và hoàn thành lời yêu cầu lịch sự với ～てくださいませんか:
[ 翻訳します, 見ます, 吸います, 教えます, 押します, 取り替えます ]

例: すみません。外国語の手紙が読めないんですが、翻訳してくださいませんか。
1) ここは禁煙なので、たばこはあちらで＿＿＿＿。
2) ミラーさん、回覧です。見たらここにはんこを＿＿＿＿。
3) エアコンの調子がおかしいんですが、ちょっと＿＿＿＿。
4) すみませんが、渡辺さんに会議は3時からだと＿＿＿＿。', 'FILL_BLANK', '1) 吸ってくださいませんか
2) 押してくださいませんか
3) 見てくださいませんか
4) 教えてくださいませんか', 5 FROM exercises ex WHERE ex.sort_order = 44 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Chọn từ thích hợp trong ngoặc { }:
例: そのお皿、どこで買ったんですか。…木村さんの奥さんが作って { (くださった), いただいた } んです。
1) この間課長に貸して { くださった, いただいた } 本はとても役に立ちました。
2) おもちゃと絵本を買ったんですね。…ええ、国の弟に送って { くれよう, やろう } と思っているんです。
3) 空港まで部長が迎えに来て { やりました, くださいました }。
4) この写真はだれが撮ったんですか。…イーさんが撮って { あげた, くれた } んです。', 'FILL_BLANK', '1) いただいた
2) やろう
3) くださいました
4) くれた', 6 FROM exercises ex WHERE ex.sort_order = 44 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: Bài 42 (SortOrder 45, Lesson 42)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 42', 'Bài tập Minna no Nihongo N4 - Bài 42: ～ために (mục đích), ～のに使います / ～のに便利です (mục đích sử dụng / đánh giá), Phân biệt ～ように và ～ために', 'LESSON', 'EXERCISE', 45 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 42 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 45);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: これはプレゼント ( に ) ちょうどいいですね。
1) 車 ( 　 ) 来た人のために、このお茶 ( 　 ) 作りました。
2) ボランティアの会議 ( 　 ) 出席するために、休み ( 　 ) 取りました。
3) このかばんはポケット ( 　 ) たくさんあって、仕事 ( 　 ) 便利です。
4) ボーナスは子ども ( 　 ) 教育 ( 　 ) ために、貯金します。', 'FILL_BLANK', '1) で, を
2) に, を
3) が, に
4) の, の', 1 FROM exercises ex WHERE ex.sort_order = 45 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Nối dụng cụ với mục đích sử dụng và hoàn thành câu với ～のに使います:
例: やかんはお湯を沸かすのに使います。
1) 栓抜きは＿＿＿＿。
2) ミキサーは＿＿＿＿。
3) 体温計は＿＿＿＿。
4) のし袋は＿＿＿＿。
5) 時刻表は＿＿＿＿。', 'FILL_BLANK', '1) 瓶のふたを開けるのに使います
2) 材料を混ぜるのに使います
3) 熱を測るのに使います
4) お祝いのお金を入れるのに使います
5) 電車の時間を調べるのに使います', 2 FROM exercises ex WHERE ex.sort_order = 45 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu đánh giá mục đích với Danh từ + に / Động từ thể từ điển + のに:
例1: 新しいマンションはどうですか。(買い物・不便です) …とても静かでいいんですが、ちょっと買い物に不便です。
例2: これは何ですか。(計算します・使います) …そろばんです。計算するのに使います。
1) この公園は広くて、木が多いですね。(散歩・いいです) …ええ、＿＿＿＿。
2) 電子辞書はどうですか。(漢字の読み方を調べます・役に立ちます) …便利ですよ。特に＿＿＿＿。
3) 弟さんのけがはどうですか。(治ります・2か月かかりました) …おかげさまでやっとよくなりました。＿＿＿＿。
4) この傘はずいぶん軽いですね。(旅行・便利です) …ええ、小さくて軽いですから、＿＿＿＿。', 'FILL_BLANK', '1) 散歩にいいです
2) 漢字の読み方を調べるのに役に立ちます
3) 治るのに2か月かかりました
4) 旅行に便利です', 3 FROM exercises ex WHERE ex.sort_order = 45 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu chỉ mục đích với ～ために:
例1: 古いお寺の写真を (撮ります…撮る) ために、京都へ行きました。
例2: (子ども…子どもの) ために、犬を飼いました。
1) ボランティアに (参加します…＿＿＿＿) ために、休みを取りました。
2) 日本語を (勉強している人…＿＿＿＿) ために、優しい日本語で話そうと思っています。
3) 12時の飛行機に (乗ります…＿＿＿＿) ために、8時にうちを出なければなりません。
4) 世界の (平和…＿＿＿＿) ために、何ができるか考えています。
5) (困っている人…＿＿＿＿) ために、法律を勉強して、弁護士になろうと思っています。
6) (何…＿＿＿＿) ために、歴史を勉強するんですか。
7) 静かな所で子どもを (育てます…＿＿＿＿) ために、引っ越ししました。', 'FILL_BLANK', '1) 参加する
2) 勉強している人の
3) 乗る
4) 平和の
5) 困っている人の
6) 何の
7) 育てる', 4 FROM exercises ex WHERE ex.sort_order = 45 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Trả lời câu hỏi với ～ために (theo ý bạn / tham khảo câu mẫu):
例: どうして人が大勢並んでいるんですか。…あの美術館に入るために、並んでいるんです。
1) 日本へ来た目的は何ですか。…＿＿＿＿ために来ました。
2) どうして日本語を勉強しているんですか。…＿＿＿＿ために、一生懸命勉強しています。
3) なぜ貯金しているんですか。…＿＿＿＿ために、貯金しなければなりません。
4) どうしてスポーツ教室に通っているんですか。…＿＿＿＿ために、運動が必要だと思いますから。', 'FILL_BLANK', '1) 日本の経済について勉強する
2) 日本の会社で働く
3) 子どもの教育の
4) 健康の', 5 FROM exercises ex WHERE ex.sort_order = 45 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Phân biệt ～ように và ～ために trong ngoặc { }:
例: 夏休みに旅行する { ように, (ために) } アルバイトをしています。
1) 論文を書く { ように, ために } 資料を集めています。
2) 電車に傘を忘れない { ように, ために } 気をつけてください。
3) 絵を勉強する { ように, ために } フランスへ行こうと思っています。
4) マラソン大会に出る { ように, ために } 毎朝走っています。
5) 約束の時間に遅れない { ように, ために } 急いで行きました。
6) 試験に合格できる { ように, ために } 一生懸命勉強しています。', 'FILL_BLANK', '1) ために
2) ように
3) ために
4) ために
5) ように
6) ように', 6 FROM exercises ex WHERE ex.sort_order = 45 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: 復習 (34課~42課) (SortOrder 46, Lesson 42)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, '復習 (34課~42課)', 'Bài tập ôn tập tổng hợp Minna no Nihongo N4 (Bài 34 đến Bài 42): Điều kiện, mục đích, bị động, danh từ hóa, cho nhận, phó từ, ngữ pháp tổng hợp', 'REVIEW', 'EXERCISE', 46 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 42 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 46);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: 今度のテニスの試合 ( に ) 出ますか。
1) 出口はこの矢印 ( 　 ) とおり ( 　 ) 行ってください。
2) 忘年会 ( 　 ) あとで、二次会に行きました。
3) 試験を出したあとで、まちがい ( 　 ) 気がつきました。
4) 青 ( 　 ) 黒のボールペンで書いてください。
5) 課長、会議の資料を作りました。これ ( 　 ) いいですか。
6) これをフランス語 ( 　 ) 翻訳してください。
7) ここは夜10時 ( 　 ) 過ぎると、ほんとうに静かになります。
8) この方法 ( 　 ) やれば、もっと簡単だと思いますよ。
9) 渡辺さんが結婚式 ( 　 ) 招待してくれました。
10) わたしは弟 ( 　 ) パソコン ( 　 ) 壊されました。
11) わたしは日本のアニメ ( 　 ) 興味があります。
12) 電車を降りたあとで、忘れ物 ( 　 ) 気がつきました。
13) 先生の質問 ( 　 ) 答えられませんでした。
14) 電車の事故 ( 　 ) 学校 ( 　 ) 遅れてしまいました。
15) 自分 ( 　 ) ために使える時間がもっと欲しいです。
16) 12月はお酒を飲む機会が多いですね。クリスマス ( 　 )、忘年会 ( 　 )……。
17) これは何 ( 　 ) 使うんですか。…手紙の重さを量るのに使います。
18) おもしろいデザインの時計ですね。…ええ、結婚のお祝い ( 　 ) 山田さん ( 　 ) くださったんです。
19) やっと日本の生活 ( 　 ) 慣れました。', 'FILL_BLANK', '1) の, に
2) の
3) に
4) か
5) で
6) に
7) を
8) で
9) に
10) に, を
11) に
12) に
13) に
14) で, に
15) の
16) とか, とか
17) に
18) に, が
19) に', 1 FROM exercises ex WHERE ex.sort_order = 46 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Viết từ trái nghĩa tương ứng:
例: うそ ↔ ほんとう
1) 表 ↔ ＿＿＿＿
2) 以下 ↔ ＿＿＿＿
3) 北 ↔ ＿＿＿＿
4) 複雑 ↔ ＿＿＿＿
5) 汚い ↔ ＿＿＿＿
6) 悲しい ↔ ＿＿＿＿
7) 入院します ↔ ＿＿＿＿
8) ほめます ↔ ＿＿＿＿
9) [雨が] 降ります ↔ [雨が] ＿＿＿＿
10) [電源を] 入れます ↔ [電源を] ＿＿＿＿', 'FILL_BLANK', '1) 裏
2) 以上
3) 南
4) 簡単
5) きれい
6) うれしい
7) 退院します
8) しかります
9) やみます
10) 切ります', 2 FROM exercises ex WHERE ex.sort_order = 46 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Đổi dạng đúng của động từ / tính từ trong ngoặc ( ):
例: けさは時間が (ありません…なくて)、朝ごはんが (食べられませんでした…食べられなかった) ので、コーヒーだけ (飲みます…飲んで) 来ました。
1) 電話をかけるときは、必ず番号を (確認します…＿＿＿＿) ようにしています。
2) (まちがえられません…＿＿＿＿) ように、傘に名前を書いておきます。
3) スポーツを (します…＿＿＿＿) あとで飲むビールは特においしいです。
4) 今 (説明しました…＿＿＿＿) とおりにやれば、だれでも (失敗します…＿＿＿＿) ないでできますよ。
5) 答えが (正しいです…＿＿＿＿) かどうか、(確かめます…＿＿＿＿) のを忘れないでください。
6) 用事が (できました…＿＿＿＿)、忘年会に出られませんでした。
7) (暑いです…＿＿＿＿) ば、エアコンをつけてください。
8) この箱は荷物を (送ります…＿＿＿＿) のに (使います…＿＿＿＿) ので、捨てないでください。
9) この小説を (書きました…＿＿＿＿) のはドイツの有名な小説家です。
10) サイズが (合います…＿＿＿＿) かどうか、(着ます…＿＿＿＿) みてもいいですか。
11) ここは学校に (通います…＿＿＿＿) のにとても便利です。
12) 楽しい生活を (します…＿＿＿＿) ために、いちばん (大切です…＿＿＿＿) のは (何です…＿＿＿＿) か、(考えます…＿＿＿＿) みたことがありますか。
13) 昔はいろいろな情報を (集めます…＿＿＿＿) のはとても大変で、時間とお金がかかりました。でも、今はインターネットを (使います…＿＿＿＿) ば、だれでも世界中の情報が (集められます…＿＿＿＿) ようになりました。', 'FILL_BLANK', '1) 確認する
2) まちがえられない
3) した
4) 説明した, 失敗し
5) 正しい, 確かめる
6) できて
7) 暑けれ
8) 送る, 使う
9) 書いた
10) 合う, 着て
11) 通う
12) する, 大切な, 何か, 考えて
13) 集める, 使え, 集められる', 3 FROM exercises ex WHERE ex.sort_order = 46 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Chọn phó từ thích hợp trong ngoặc { }:
例: カラオケで { (上手に), やっと, なかなか } 歌えるようになりたいです。
1) わたしはちょっと遅れるかもしれませんから、遅れたら { さっき, 先に, 初めに } 行ってください。
2) 松本さんは { さっき, もうすぐ, このごろ } 帰りました。
3) { やっと, もっと, とても } 練習しなければ、試合に出られないでしょう。
4) あしたは { 絶対に, 必ず, やっと } 遅れないようにしてください。
5) 山田さん、{ このごろ, この間, たいてい } 元気がありませんね。
6) 休むときは { やっと, たいてい, 必ず } 連絡するようにしてください。
7) このカメラ、修理代が { かなり, なかなか, そんなに } かかりますよ。
8) { 初めに, 初めて, さっき } 電源を入れて、それからこのボタンを押してください。
9) { この間, このごろ, 複数 } いただいたお菓子、とてもおいしかったです。
10) 駅まで { 必ず, 先に, 一生懸命 } 走って、{ 必ず, きっと, やっと } 8時半の電車に間に合いました。
11) 朝ごはんは { はっきり, きちんと, ほとんど } 食べたほうがいいですよ。
12) 駅へ行く { 初めに, 真ん中で, 途中で } 山田さんに会いました。
13) { できるだけ, たくさん, とても } 早くコピー機の修理をお願いしたいんですが。
14) 最近体の調子はどうですか。…おかげさまでとてもいいです。{ 実は, ところで, それなら } 高橋さんが入院したのを知っていますか。
15) セーターやコートはもうちょっと待てば、ずっと安くなりますよ。…{ それで, それなら, それに } 今買わないほうがいいですね。', 'FILL_BLANK', '1) 先に
2) さっき
3) もっと
4) 必ず
5) このごろ
6) 必ず
7) かなり
8) 初めに
9) この間
10) 一生懸命, やっと
11) きちんと
12) 途中で
13) できるだけ
14) ところで
15) それなら', 4 FROM exercises ex WHERE ex.sort_order = 46 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chọn lời đối đáp phù hợp trong giao tiếp hằng ngày:
例: A: コーヒー、もう一杯いかがですか。 B: いいえ、{ まだまだです, (けっこうです), どういたしまして }。
1) ご結婚おめでとうございます。どうぞ { 元気で, よろしく, お幸せに }。
2) ほかに質問がなければ、{ これでいいですか, これで終わりましょう, これでお願します }。
3) A: 林さんはどこへ行ったかわかりますか。
   B: { ああ, さあ, あのう }、わたしもわかりません。
4) A: なくした財布がやっと見つかりました。
   B: それは { いけませんね, いいですね, よかったですね }。
5) A: これからちょっとお茶でも飲んで帰りませんか。
   B: すみません。きょうは用事があるので、わたしは { 先にどうぞ, お先に失礼します, 行ってきます }。
   A: そうですか。{ お疲れさまでした, お世話になりました, かしこまりました }。', 'FILL_BLANK', '1) お幸せに
2) これで終わりましょう
3) さあ
4) よかったですね
5) お先に失礼します, お疲れさまでした', 5 FROM exercises ex WHERE ex.sort_order = 46 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Chọn từ vựng / đơn vị đếm phù hợp trong ngoặc { }:
例: 最近体の { 都合, (調子), 機会 } が悪いです。
1) わたしは日本の歴史に { やる気, 興味, 経験 } があります。
2) 林さんは最近ちょっと { 返事, 様子, リズム } が変ですね。
3) 子どもの { 成績, 文化, 教育 } にとてもお金がかかります。
4) 日本へ来た { 目的, 予定, 興味 } は何ですか。
5) 富士山の { 高さ, 重さ, 大きさ } は3,776メートルです。
6) 皆さん、ここにある資料を1枚 { ほど, ずつ, しか } 取ってください。
7) タイの家族や友達によく電話するので、国際電話 { 代, 料金, 割引 } が高いです。
8) この図書館の本は15 { 冊, 本, 階 } まで借りられます。
9) ケーキが10 { 杯, 個, 匹 } ありますから、みんなで食べましょう。
10) 毎朝大きなコップで2 { 杯, 個, 枚 } 牛乳を飲みます。', 'FILL_BLANK', '1) 興味
2) 様子
3) 教育
4) 目的
5) 高さ
6) ずつ
7) 代
8) 冊
9) 個
10) 杯', 6 FROM exercises ex WHERE ex.sort_order = 46 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '7. Chọn dạng ngữ pháp chính xác trong ngoặc { }:
例: 大学に { (入れる), 入れる, 入られる } ように、一生懸命勉強しています。
1) 車を { 買う, 買える, 買われる } ために、貯金しています。
2) 旅行中にカメラを { とって, とれて, とられて } しまいました。
3) よく見える { ために, ように, のに } 前の席に座りましょう。
4) いろいろな人の考え方を知る { のは, のに, のを } おもしろいです。
5) やまと美術館でゴッホの展覧会が開かれている { のが, のに, のを } 知っていますか。
6) わたしは整理する { のが, のに, のを } 下手な { のが, のは, ので }、部屋を片づける { のが, のに, のを } とても時間がかかります。
7) わたしは高橋さんに車で送って { やりました, くださいました, いただきました }。
8) わたしは息子を動物園へ連れて行って { やりました, くださいました, いただきました }。
9) 部長がわたしたちを食事に招待して { やりました, くださいました, いただきました }。
10) すみませんが、ちょっとコピーを手伝って { やりませんか, くださいませんか, いただきませんか }。
11) わたしは弟にカメラを { なくしてやりました, なくしてもらいました, なくされました }。', 'FILL_BLANK', '1) 買う
2) とられて
3) ように
4) のは
5) のを
6) のが, ので, のに
7) いただきました
8) やりました
9) くださいました
10) くださいませんか
11) なくされました', 7 FROM exercises ex WHERE ex.sort_order = 46 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 7);
-- =========================================================
-- Exercise: Bài 43 (SortOrder 47, Lesson 43)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 43', 'Bài tập Minna no Nihongo N4 - Bài 43: Tính từ/Động từ + そうです (có vẻ / sắp sửa xảy ra), Động từ ～て来ます (đi làm gì rồi quay lại)', 'LESSON', 'EXERCISE', 47 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 43 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 47);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Chọn tính từ trong khung và hoàn thành câu với ～そうです:
[ 辛いです, 幸せです, 重いです, 暇です, 高いです, 痛いです, 便利です, おもしろいです, 悪いです, 難しいです, まじめです, いいです ]

例: 駅の前にできたスーパーは大きくて、買い物に (便利そう) ですね。
1) あの女の子は足を踏まれて、＿＿＿＿ですね。
2) 渡辺さんは＿＿＿＿です。コーヒーを飲みながら新聞を読んでいます。
3) この人形はお土産に＿＿＿＿です。
4) あしたの試験は＿＿＿＿ですから、今晩勉強しなければなりません。
5) そのゲーム、＿＿＿＿ですね。…ええ、やってみますか。
6) このカレーは＿＿＿＿ですが、実はそんなに辛くないんです。
7) この着物はとてもきれいですが、＿＿＿＿ですね。値段を聞いてみましょうか。
8) あの二人は先月結婚したんです。とても＿＿＿＿ですね。
9) 鈴木さん、気分が＿＿＿＿ですね。疲れたんですか。
10) その荷物、＿＿＿＿ですね。手伝いましょうか。', 'FILL_BLANK', '1) 痛そう
2) 暇そう
3) よさそう
4) 難しそう
5) おもしろそう
6) 辛そう
7) 高そう
8) 幸せそう
9) 悪そう
10) 重そう', 1 FROM exercises ex WHERE ex.sort_order = 47 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Chọn động từ trong khung và hoàn thành câu với dấu hiệu sắp xảy ra ～そうです:
[ 減ります, 壊れます, とれます, 切れます, なくなります, 上がります, 終わります, 落ちます, 遅れます, 降ります, 破れます, 売れます ]

例: しょうゆが (なくなりそう) ですから、買っておきましょう。
1) 網棚の荷物が＿＿＿＿ですね。危ないですね。
2) 約束の時間に＿＿＿＿ですから、急ぎましょう。
3) ことしは海外旅行をする人が＿＿＿＿です。
4) 靴のひもが＿＿＿＿ですから、新しいのを買わなければなりません。
5) このいすは＿＿＿＿ですから、座らないでください。
6) この仕事は簡単ですから、すぐ＿＿＿＿です。
7) 今にも雨が＿＿＿＿ですから、テニスはできませんね。
8) あ、ボタンが＿＿＿＿ですよ。
9) 雨の日が続いているので、野菜の値段が＿＿＿＿です。
10) この紙袋は古くて、＿＿＿＿です。
11) 新しい製品ができましたね。…＿＿＿＿ですか。', 'FILL_BLANK', '1) 落ちそう
2) 遅れそう
3) 減りそう
4) 切れそう
5) 壊れそう
6) 終わりそう
7) 降りそう
8) とれそう
9) 上がりそう
10) 破れそう
11) 売れそう', 2 FROM exercises ex WHERE ex.sort_order = 47 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu phán đoán nhìn có vẻ ～そうです:
例1: そのりんご、赤くて大きくて、おいしそうですね。…ええ、とてもおいしいですよ。田舎の母が送ってくれたんです。
例2: ことしは留学生が増えそうですか。…そうですね、去年より増えると思いますよ。
1) あ、ミラーさん、久しぶりですね。＿＿＿＿ですね。…ええ、おかげさまで元気です。
2) 駅までどのくらいかかりますか。…道が込んでいますから、30分ぐらい＿＿＿＿ですね。
3) もうすぐ桜が＿＿＿＿ですね。…ええ、来週の初めには咲くでしょう。ことしは暖かいですから。
4) そのマンガ、＿＿＿＿ですね。…ええ、とてもおもしろいですよ。貸しましょうか。
5) 雨は＿＿＿＿ですね。…そうですね、もうすぐやむでしょう。空が明るくなりましたから。', 'FILL_BLANK', '1) 元気そう
2) かかりそう
3) 咲きそう
4) おもしろそう
5) やみそう', 3 FROM exercises ex WHERE ex.sort_order = 47 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu diễn đạt hành động đi rồi quay lại với ～て来ます:
例: 教室にケータイを忘れたので、取って来ます。
1) おなかがすいたので、コンビニでお弁当を＿＿＿＿。
2) 会議室のエアコンを消すのを忘れたので、＿＿＿＿。
3) かぎを掛けたかどうか、＿＿＿＿。
4) 旅行に行ったら、お土産を＿＿＿＿くださいね。
5) 道がわからないので、あそこにいる人に＿＿＿＿。', 'FILL_BLANK', '1) 買って来ます
2) 消して来ます
3) 見て来ます／確かめて来ます
4) 買って来て
5) 聞いて来ます', 4 FROM exercises ex WHERE ex.sort_order = 47 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chọn trợ động từ thích hợp trong khung đi kèm với thể ～て:
[ います, あります, おきます, みます, 来ます, しまいます ]

例: 空港へ友達を迎えに行って来ます。
1) カレンダーに約束の時間が書いて＿＿＿＿。
2) きのうは日曜日でしたから、東京ディズニーランドはとても込んで＿＿＿＿。
3) 電車に忘れ物をして＿＿＿＿。
4) 会議のまえに、資料を見て＿＿＿＿ください。
5) すみません。この靴をはいて＿＿＿＿もいいですか。
6) いい天気なので、ちょっと公園を散歩して＿＿＿＿。', 'FILL_BLANK', '1) あります
2) いました
3) しまいました
4) おいて
5) みて
6) 来ます', 5 FROM exercises ex WHERE ex.sort_order = 47 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
-- =========================================================
-- Exercise: Bài 44 (SortOrder 48, Lesson 44)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 44', 'Bài tập Minna no Nihongo N4 - Bài 44: ～すぎます (quá mức), ～やすい / ～にくい (dễ / khó làm gì), Đổi tính từ thành phó từ + します (làm cho...), Danh từ + にします (chọn / quyết định)', 'LESSON', 'EXERCISE', 48 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 44 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 48);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Hoàn thành câu với thể ～すぎます:
例: (笑います…笑いすぎて) 涙が出てしまいました。
1) 昼ごはんを (食べます…＿＿＿＿)、晩ごはんが食べられませんでした。
2) お酒を (飲みます…＿＿＿＿) ないようにしてください。
3) きのうテニスを (します…＿＿＿＿) ので、きょうは体が痛いです。
4) 料理を (作ります…＿＿＿＿)、たくさん残ってしまいました。
5) 木村さんは最近お金を (使います…＿＿＿＿) と言っていました。
6) このコピーは字が (小さいです…＿＿＿＿) し、薄いし、読めません。
7) ここは (静かです…＿＿＿＿)、ちょっと寂しいです。
8) このやり方は (複雑です…＿＿＿＿) ので、ほかの方法を考えましょう。
9) このカレーは (辛いです…＿＿＿＿)、食べられません。', 'FILL_BLANK', '1) 食べすぎて
2) 飲みすぎ
3) しすぎた
4) 作りすぎて
5) 使いすぎた
6) 小さすぎる
7) 静かすぎて
8) 複雑すぎる
9) 辛すぎて', 1 FROM exercises ex WHERE ex.sort_order = 48 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Chọn động từ trong khung và chia sang ～やすい / ～にくい:
[ 飲みます, 住みます, わかります, 変わります, 歩きます, 破れます, 座ります, まちがえます ]

例1: ワット先生の講義はわかりやすいです。
例2: 東京は物価が高くて、住みにくいです。
1) この靴は重くて、＿＿＿＿。
2) この薬は小さくて、＿＿＿＿。
3) 「ツ」と「シ」は＿＿＿＿から、気をつけてください。
4) 薄い紙は＿＿＿＿。
5) このいすは硬くて、＿＿＿＿。', 'FILL_BLANK', '1) 歩きにくいです
2) 飲みやすいです
3) まちがえやすいです
4) 破れやすいです
5) 座りにくいです', 2 FROM exercises ex WHERE ex.sort_order = 48 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu biến đổi trạng thái với Tính từ + します:
例: コピーの色が薄すぎますから、もう少し (濃いです…濃くして) ください。
1) ズボンが長すぎますから、もう少し (短いです…＿＿＿＿) ほうがいいですね。
2) こんなにたくさん食べられませんから、(半分です…＿＿＿＿) ください。
3) 体を (丈夫です…＿＿＿＿) ために、毎日1時間ぐらい歩いています。
4) 赤ちゃんが寝ていますから、テレビの音を (小さいです…＿＿＿＿) ください。
5) 土曜日は都合が悪いので、(日曜日です…＿＿＿＿) いただけませんか。
6) このお菓子は冷蔵庫に入れて、(冷たいです…＿＿＿＿) と、おいしいですよ。
7) CDを聞いて、発音を (いいです…＿＿＿＿) たいと思います。
8) ちょっと高いですね。少し (安いです…＿＿＿＿) いただけませんか。', 'FILL_BLANK', '1) 短くした
2) 半分にして
3) 丈夫にする
4) 小さくして
5) 日曜日にして
6) 冷たくする
7) よくし
8) 安くして', 3 FROM exercises ex WHERE ex.sort_order = 48 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Chọn từ trong khung và hoàn thành câu lựa chọn với ～にします:
[ ツイン, 和食, 5時ごろ, コーヒー, 来週の火曜日, きれい, 短い, 安い, 大きい, 静か, 2倍, 何, どこ, いつ ]

例1: 髪をもう少し短くしたいです。
例2: お土産は何にしますか。…お菓子にしようと思っています。
1) ホテルの食事は＿＿＿＿たいです。
2) テーブルの上を＿＿＿＿ください。
3) 飲み物は＿＿＿＿ください。
4) ホテルの部屋は＿＿＿＿つもりです。
5) 子どもが寝ているので、＿＿＿＿いただけませんか。
6) この図はもう少し＿＿＿＿ほうがいいと思います。
7) 値段を＿＿＿＿ば、もっと売れるかもしれません。
8) 出発の時間は＿＿＿＿か。…＿＿＿＿ましょう。
9) 会議は＿＿＿＿か。…＿＿＿＿ください。', 'FILL_BLANK', '1) 和食にし
2) きれいにして
3) コーヒーにして
4) ツインにする
5) 静かにして
6) 大きくした
7) 安くすれ
8) 何時にします, 5時ごろにし
9) いつにします, 来週の火曜日にして', 4 FROM exercises ex WHERE ex.sort_order = 48 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Điền dạng thích hợp của từ trong ngoặc ( ) vào đoạn văn sau:
わたしは今日本の会社で働いています。国の会社とどちらが (例: 働きます…働き) やすいか聞かれますが、ちょっと (a. 答えます…＿＿＿＿) にくいです。
国の会社は日本の会社より夕方早く終わりますが、仕事は (b. 簡単です…＿＿＿＿) すぎて、おもしろくないです。わたしは今日本のニュースを翻訳して、国に送っています。複雑で (c. わかります…＿＿＿＿) にくいニュースを (d. 広くです…＿＿＿＿) するのは大変ですが、仕事は楽しいです。仕事をするのにパソコンが必要ですが、今使っているパソコンは古くて (e. 使います…＿＿＿＿) にくいので、新しいのを (f. 買います…＿＿＿＿) と思っています。わたしは今の仕事が好きですが、(g. 働きます…＿＿＿＿) すぎると (h. 病気です…＿＿＿＿) なるので、日曜日はゆっくり休みます。', 'FILL_BLANK', 'a. 答え
b. 簡単
c. わかり
d. 広く
e. 使い
f. 買おう
g. 働き
h. 病気に', 5 FROM exercises ex WHERE ex.sort_order = 48 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
-- =========================================================
-- Exercise: Bài 45 (SortOrder 49, Lesson 45)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 45', 'Bài tập Minna no Nihongo N4 - Bài 45: Thể thông thường + 場合(は) (trong trường hợp / khi), ～のに (thế mà / vậy mà - biểu thị bất mãn, ngạc nhiên), Phân biệt ので và のに', 'LESSON', 'EXERCISE', 49 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 45 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 49);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Hoàn thành câu giả định tình huống với thể thông thường + 場合(は):
例: コピー機が (故障しました…故障した) 場合は、この番号に電話してください。
1) (雨です…＿＿＿＿) 場合は、野球の練習はありません。
2) なかなか熱が (下がりません…＿＿＿＿) 場合は、この薬を飲んでください。
3) 体の調子が (悪いです…＿＿＿＿) 場合は、キャンプに参加しないでください。
4) あしたの花火大会が (中止になりました…＿＿＿＿) 場合は、来週行います。
5) この旅行は参加する人が (30人以上です…＿＿＿＿) 場合は、安くなります。
6) 予約を (キャンセルしたいです…＿＿＿＿) 場合は、できるだけ早く連絡してください。
7) 資料が (必要です…＿＿＿＿) 場合は、自分でコピーしてください。
8) 保証書が (ありません…＿＿＿＿) 場合は、修理代がかかります。', 'FILL_BLANK', '1) 雨の
2) 下がらない
3) 悪い
4) 中止になった
5) 30人以上の
6) キャンセルしたい
7) 必要な
8) ない', 1 FROM exercises ex WHERE ex.sort_order = 49 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Chọn từ trong khung và hoàn thành câu với ～場合(は):
[ 忘れました, まちがえました, やめたいです, 間に合いません, 無理です, 海外旅行です, 悪いです, 調べます ]

例: 地震の場合は、エレベーターを使わないでください。
1) 電車にかばんを＿＿＿＿場合は、どうしたらいいですか。
2) 書き方を＿＿＿＿場合は、新しい紙に書いてください。
3) 途中でコピーを＿＿＿＿場合は、ここを押します。
4) レポートの締め切りに＿＿＿＿場合は、どうしたらいいですか。
5) 今晩部長の都合が＿＿＿＿場合は、会議は来週にしましょう。
6) 修理が＿＿＿＿場合は、新しいのを買いましょう。
7) 何かを＿＿＿＿場合は、まずインターネットを使います。
8) ＿＿＿＿場合は、現金で持って行かないほうがいいです。', 'FILL_BLANK', '1) 忘れた
2) まちがえた
3) やめたい
4) 間に合わない
5) 悪い
6) 無理な
7) 調べる
8) 海外旅行の', 2 FROM exercises ex WHERE ex.sort_order = 49 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Nối 2 vế câu diễn tả sự bất ngờ / trái ngược với ～のに:
例: もう会議が始まる時間です・森さんはまだ来ていません → もう会議が始まる時間なのに、森さんはまだ来ていません。
1) キャンプの準備をしていました・雨で急に中止になりました
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) もう12月です・暖かい日が続いています
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) 彼は歌が下手です・よくカラオケに行きます
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) 4月になりました・まだ桜が咲いていません
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
5) 雨が降っています・彼は釣りに行きました
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
6) きのうは日曜日でした・会社へ行かなければなりませんでした
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
7) このマンションは新しいです・よくエレベーターが故障します
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
8) 楽しみにしていました・病気で旅行に行けませんでした
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
9) きょうはそんなに寒くないです・あの人は厚いコートを着ています
→ ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) キャンプの準備をしていたのに、雨で急に中止になりました。
2) もう12月なのに、暖かい日が続いています。
3) 彼は歌が下手なのに、よくカラオケに行きます。
4) 4月になったのに、まだ桜が咲いていません。
5) 雨が降っているのに、彼は釣りに行きました。
6) きのうは日曜日だったのに、会社へ行かなければなりませんでした。
7) このマンションは新しいのに、よくエレベーターが故障します。
8) 楽しみにしていたのに、病気で旅行に行けませんでした。
9) きょうはそんなに寒くないのに、あの人は厚いコートを着ています。', 3 FROM exercises ex WHERE ex.sort_order = 49 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Điền ので hoặc のに vào ngoặc ( ):
例1: かぜをひいた ( ので )、テニスの試合に出られませんでした。
例2: 一生懸命練習した ( のに )、テニスの試合に出られませんでした。
1) バスがなかなか来なかった ( 　 )、遅くなってしまいました。
2) 書類にはんこが必要だった ( 　 )、押さないで出してしまいました。
3) もう11時を過ぎた ( 　 )、電話をかけないほうがいいです。
4) 財布をなくしてしまった ( 　 )、友達にお金を借りました。
5) 1時間も待った ( 　 )、友達が来なかった ( 　 )、帰って来ました。', 'FILL_BLANK', '1) ので
2) のに
3) ので
4) ので
5) のに, ので', 4 FROM exercises ex WHERE ex.sort_order = 49 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
-- =========================================================
-- Exercise: Bài 46 (SortOrder 50, Lesson 46)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 46', 'Bài tập Minna no Nihongo N4 - Bài 46: ～ところです (đúng vào lúc: sắp, đang, vừa mới xong), ～ばかりです (vừa mới làm gì), ～はずです (chắc chắn là), Phân biệt ところ, ばかり, はず', 'LESSON', 'EXERCISE', 50 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 46 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 50);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Chọn dạng động từ thích hợp với ～ところです:
例: 課長はもう帰りましたか。…たった今 { 帰る, 帰っている, (帰った) } ところです。
1) ニュースはもう始まっていますか。…いいえ、ちょうど今から { 始まる, 始まっている, 始まった } ところです。
2) もうごはんを食べましたか。…いいえ、これから { 食べる, 食べている, 食べた } ところです。よかったら、いっしょに食べませんか。
3) もう論文を書きましたか。…いいえ、今資料を { 集める, 集めている, 集めた } ところなんです。
4) もしもし、今どこにいるんですか。…空港です。たった今日本に { 着く, 着いている, 着いた } ところです。', 'FILL_BLANK', '1) 始まる
2) 食べる
3) 集めている
4) 着いた', 1 FROM exercises ex WHERE ex.sort_order = 50 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Hoàn thành câu với thể ～たばかりです:
例: 日本へ来たばかりですから、まだ日本語が下手です。
1) さっき食事を (します…＿＿＿＿) ばかりなので、今おなかがいっぱいです。
2) 先月日本語の勉強を (始めます…＿＿＿＿) ばかりですから、まだあまり話せません。
3) 先週給料を (もらいます…＿＿＿＿) ばかりなのに、もうなくなってしまいました。
4) たった今うちへ (帰ります…＿＿＿＿) ばかりなのに、また出かけなければなりません。
5) さっき部屋を (掃除します…＿＿＿＿) ばかりなのに、もう子どもが汚してしまいました。
6) 今メールを (送ります…＿＿＿＿) ばかりですから、まだ彼は見ていないかもしれません。', 'FILL_BLANK', '1) した
2) 始めた
3) もらった
4) 帰った／帰って来た
5) 掃除した
6) 送った', 2 FROM exercises ex WHERE ex.sort_order = 50 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu phán đoán chắc chắn với ～はずです:
例: 3時にうちを出れば、4時半には (着きます…着く) はずです。
1) 彼は子どものときからフランスに住んでいましたから、フランス語が (上手です…＿＿＿＿) はずです。
2) 彼はきのう旅行に行きましたから、今うちに (いません…＿＿＿＿) はずです。
3) 高橋さんにはけさ連絡しましたから、会議の時間を (知っています…＿＿＿＿) はずです。
4) シュミットさんの息子さんはことし (12歳です…＿＿＿＿) はずです。
5) 彼は来週 (退院します…＿＿＿＿) はずです。
6) この説明書を読めば、(わかります…＿＿＿＿) はずなんですけど。
7) レストランの仕事は夕方は (忙しいです…＿＿＿＿) はずです。', 'FILL_BLANK', '1) 上手な
2) いない
3) 知っている
4) 12歳の
5) 退院する
6) わかる
7) 忙しい', 3 FROM exercises ex WHERE ex.sort_order = 50 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu kết hợp ところ, ばかり, はず:
例: 彼は会社員ですか。…いいえ、学生のはずですよ。
1) 課長の所へもう書類を持って行きましたか。…いいえ、これから (持って行きます…＿＿＿＿) ところです。
2) お客様のお皿はきれいですか。…ええ、さっき (洗いました…＿＿＿＿) ばかりですから、(きれいです…＿＿＿＿) はずです。
3) カリナさんは今部屋にいますか。…いいえ、(いません…＿＿＿＿) はずですよ。出かけると言っていましたから。
4) もう朝ごはんを食べましたか。…いいえ、まだです。実はさっき (起きました…＿＿＿＿) ばかりなんです。これから顔を (洗います…＿＿＿＿) ところです。
5) お待たせしました。遅れてすみません。…いいえ、わたしもたった今 (来ました…＿＿＿＿) ところなんです。
6) 松本部長はカラオケが好きですか。…ええ、(好きです…＿＿＿＿) はずですよ。よくカラオケに行っていますから。
7) この部屋は暑いですね。…ええ、今エアコンを (つけました…＿＿＿＿) ばかりなんです。すぐ涼しくなりますよ。
8) この荷物、船便でいつごろ着きますか。…そうですね、来週の月曜日には (着きます…＿＿＿＿) はずです。', 'FILL_BLANK', '1) 持って行く
2) 洗った, きれいな
3) いない
4) 起きた, 洗う
5) 来た
6) 好きな
7) つけた
8) 着く', 4 FROM exercises ex WHERE ex.sort_order = 50 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Điền ばかり, ところ, hoặc はず vào chỗ trống:
例: さっき聞いたばかりなのに、もう忘れてしまいました。
1) 鈴木さんはタイに5年も住んでいましたから、タイ語が上手な＿＿＿＿です。
2) この赤ちゃんは先月生まれた＿＿＿＿ですから、まだミルクしか飲めません。
3) 今部屋の掃除をしている＿＿＿＿ですから、ちょっと待ってください。
4) グプタさんは肉は食べない＿＿＿＿です。
5) この時計は1週間まえに買った＿＿＿＿なのに、もう壊れてしまいました。
6) 今うちを出る＿＿＿＿ですから、1時間後にはそちらに着くと思います。', 'FILL_BLANK', '1) はず
2) ばかり
3) ところ
4) はず
5) ばかり
6) ところ', 5 FROM exercises ex WHERE ex.sort_order = 50 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
-- =========================================================
-- Exercise: Bài 47 (SortOrder 51, Lesson 47)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 47', 'Bài tập Minna no Nihongo N4 - Bài 47: Thể thông thường + そうです (nghe nói là / truyền ngôn), ～によると ～そうです, Thể thông thường + ようです (dường như / có vẻ như - suy đoán dựa trên giác quan)', 'LESSON', 'EXERCISE', 51 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 47 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 51);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: きのう神戸 ( で ) 地震があったそうです。
1) 部屋 ( 　 ) 人 ( 　 ) 集まっていますね。会議 ( 　 ) ようです。
2) 変な音 ( 　 ) しますね。だれか ( 　 ) 部屋をまちがえたようです。
3) 雨が降っているようです。外を歩いている人は傘 ( 　 ) さしています。
4) わたしは彼の意見 ( 　 ) 賛成です。
5) 鈴木さんは支社 ( 　 ) 転勤するそうです。
6) 最近新しい医学の論文をアメリカの雑誌 ( 　 ) 読みました。
7) 電気が消えていますから、だれ ( 　 ) いないようですね。', 'FILL_BLANK', '1) に, が, の
2) が, と
3) を
4) に
5) に
6) で
7) も', 1 FROM exercises ex WHERE ex.sort_order = 51 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Hoàn thành câu truyền ngôn với thể thông thường + そうです:
例: あしたは雨が (降ります…降る) そうです。
1) きのう近くのホテルで火事が (ありました…＿＿＿＿) そうです。
2) イーさんは夏休みに国へ (帰りません…＿＿＿＿) そうです。
3) ミラーさんは会議のことを (知りませんでした…＿＿＿＿) そうです。
4) ワット先生はきのうは (忙しかったです…＿＿＿＿) そうです。
5) インドネシアのバリ島はとても (きれいです…＿＿＿＿) そうです。
6) 火事の原因は子どもの (花火でした…＿＿＿＿) そうです。
7) グプタさんの息子さんは日本へ (留学したいです…＿＿＿＿) そうです。
8) 東京の人口は (増えています…＿＿＿＿) そうです。', 'FILL_BLANK', '1) あった
2) 帰らない
3) 知らなかった
4) 忙しかった
5) きれいだ
6) 花火だった
7) 留学したい
8) 増えている', 2 FROM exercises ex WHERE ex.sort_order = 51 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu truyền dẫn nguồn tin với ～によると、～そうです:
例: あしたの天気はどうですか。(天気予報・曇りです) …天気予報によると、曇りだそうです。
1) 交通事故は増えているんですか。(警察の発表・減っています)
…いいえ、＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
2) 社長はいつアメリカへ行くんですか。(部長の話・来月の5日に行きます)
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
3) きれいな花の写真ですね。(この写真の説明・世界でいちばん大きい花です)
…＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
4) ワンさんはもう論文をまとめたんですか。(ワンさんの話・とても大変です)
…いいえ、まだだと思います。＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿', 'FILL_BLANK', '1) 警察の発表によると、減っているそうです。
2) 部長の話によると、来月の5日に行くそうです。
3) この写真の説明によると、世界でいちばん大きい花だそうです。
4) ワンさんの話によると、とても大変だそうです。', 3 FROM exercises ex WHERE ex.sort_order = 51 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu suy đoán với thể thông thường + ようです:
例: 道が込んでいますね。(交通事故です…交通事故の) ようですね。
1) パトカーが止まっていますね。あのうちに泥棒が (入りました…＿＿＿＿) ようです。
2) この牛乳、変なにおいがしますね。ちょっと (古いです…＿＿＿＿) ようです。
3) 頭も痛いし、熱もあるし、どうも (かぜです…＿＿＿＿) ようです。
4) 彼はいつも一人で座っています。友達が (いません…＿＿＿＿) ようです。
5) クララさんはすしを食べませんね。(嫌いです…＿＿＿＿) ようです。
6) ハンス君はずっと勉強していますね。宿題がたくさん (あります…＿＿＿＿) ようです。
7) きのうの飛行機事故では死んだ人は (いませんでした…＿＿＿＿) ようです。', 'FILL_BLANK', '1) 入った
2) 古い
3) かぜの
4) いない
5) 嫌いな
6) ある
7) いなかった', 4 FROM exercises ex WHERE ex.sort_order = 51 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Phân biệt そうです (nhìn có vẻ) và そうです (nghe nói):
例: あの犬は大きくて (怖いです…怖) そうですね。…ええ、友達に聞いたんですが、ほんとうに (怖いです…怖い) そうですよ。子どもをかんだそうです。
1) このケータイ、(使いやすいです…＿＿＿＿) そうですが、使っている人の話によると、使い方が (複雑です…＿＿＿＿) そうですよ。
2) 星がたくさん見えますから、あしたは天気が (いいです…＿＿＿＿) そうですね。…ええ、天気予報によると、(いいです…＿＿＿＿) そうですよ。
3) (遅れます…＿＿＿＿) そうですよ。タクシーで行きましょう。', 'FILL_BLANK', '1) 使いやす, 複雑だ
2) よさ, いい
3) 遅れ', 5 FROM exercises ex WHERE ex.sort_order = 51 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Chọn dạng phán đoán / truyền ngôn đúng trong ngoặc { }:
例: あ、袋が { (破れそうです), 破れるそうです, 破れるようです } から、新しいのをもらいましょう。
1) 外で大きい音がしますね。だれか { けんかしているようです, けんかしているそうです, けんかしそうです }。
2) グプタさんに聞いたんですが、クララさんは来月国へ { 帰るそうです, 帰りそうです, 帰ったようです }。
3) 網棚の荷物が { 落ちるそうです, 落ちそうです, 落ちるようです } から、きちんと載せてください。
4) 道がぬれています。ゆうべ雨が { 降りそうです, 降ったようです, 降るそうです }。
5) 新聞によると、世界の人口は70億人 { 以上だそうです, 以上のようです }。', 'FILL_BLANK', '1) けんかしているようです
2) 帰るそうです
3) 落ちそうです
4) 降ったようです
5) 以上だそうです', 6 FROM exercises ex WHERE ex.sort_order = 51 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: Bài 48 (SortOrder 52, Lesson 48)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 48', 'Bài tập Minna no Nihongo N4 - Bài 48: Thể sai khiến (使役形 ～せます / ～させます), Cho phép / bắt buộc làm gì, Xin phép lịch sự ～させていただけませんか', 'LESSON', 'EXERCISE', 52 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 48 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 52);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Hoàn thành bảng chia động từ thể sai khiến (使役形):
例: 書きます → 書かせます
1) 会います → ＿＿＿＿
2) ＿＿＿＿ → 働かせます
3) かけます → ＿＿＿＿
4) コピーします → ＿＿＿＿
5) ＿＿＿＿ → 磨かせます
6) 来ます → ＿＿＿＿
7) ＿＿＿＿ → 待たせます
8) 捨てます → ＿＿＿＿
9) 飲みます → ＿＿＿＿
10) ＿＿＿＿ → 確かめさせます
11) やめます → ＿＿＿＿', 'FILL_BLANK', '1) 会わせます
2) 働きます
3) かけさせます
4) コピーさせます
5) 磨きます
6) 来させます
7) 待ちます
8) 捨てさせます
9) 飲ませます
10) 確かめます
11) やめさせます', 1 FROM exercises ex WHERE ex.sort_order = 52 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Điền trợ từ thích hợp vào ngoặc ( ) và chia thể sai khiến:
例1: わたしはいつも娘 ( を ) 買い物 ( に ) (行きます…行かせます)。
例2: 先生は学生 ( に ) 日本語のCD ( を ) (聞きます…聞かせます)。
1) 部長は鈴木さん ( 　 ) アメリカ ( 　 ) (出張しました…＿＿＿＿)。
2) わたしは毎朝息子 ( 　 ) ごみ ( 　 ) (捨てます…＿＿＿＿)。
3) 子どものとき、父はわたし ( 　 ) ピアノ ( 　 ) (習いました…＿＿＿＿)。
4) わたしは電車の席では子ども ( 　 ) (立ちます…＿＿＿＿) います。
5) わたしは子ども ( 　 ) 食事のあとで歯 ( 　 ) (磨きます…＿＿＿＿) ようにしています。
6) わたしは子ども ( 　 ) 犬 ( 　 ) 世話を (します…＿＿＿＿) います。
7) 子ども ( 　 ) お酒 ( 　 ) (飲みます…＿＿＿＿) はいけません。', 'FILL_BLANK', '1) を, へ, 出張させました
2) に, を, 捨てさせます
3) に, を, 習わせました
4) を, 立たせて
5) に, を, 磨かせる
6) に, の, させて
7) に, を, 飲ませて', 2 FROM exercises ex WHERE ex.sort_order = 52 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Chuyển các câu sau sang thể sai khiến:
例: 娘は塾に通っています。…わたしは娘を塾に通わせています。
1) わたしは日本へ留学しました。…父は＿＿＿＿。
2) 子どもは好きな仕事をやります。…わたしは＿＿＿＿たいです。
3) 生徒は毎日日記を書いています。…先生は＿＿＿＿。
4) 息子は毎朝自分の部屋を掃除します。…わたしは＿＿＿＿。
5) 鈴木さんは新しい計画について説明しました。…部長は＿＿＿＿。
6) 授業のとき、学生は絶対に英語を使いません。…先生は＿＿＿＿。
7) 息子は1時間以上ゲームをしません。…わたしは＿＿＿＿。
8) 子どもは自由に水で遊びます。…わたしは＿＿＿＿たいです。
9) ハンス君は毎晩家で日本語の本を読んでいます。…ハンス君のお母さんは＿＿＿＿。', 'FILL_BLANK', '1) わたしを日本へ留学させました
2) 子どもに好きな仕事をやらせ
3) 生徒に毎日日記を書かせています
4) 息子に毎朝自分の部屋を掃除させます
5) 鈴木さんに新しい計画について説明させました
6) 授業のとき、学生に絶対に英語を使わせません
7) 息子に1時間以上ゲームをさせません
8) 子どもを自由に遊ばせ
9) ハンス君に毎晩日本語の本を読ませています', 3 FROM exercises ex WHERE ex.sort_order = 52 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Điền trợ từ thích hợp vào ngoặc ( ) và chia thể sai khiến với ～ましょうか:
例: その荷物、重そうですね。あとでだれか ( に ) (運びます…運ばせ) ましょうか。…ええ、お願いします。
1) そろそろ失礼します。…そうですか。もう遅いですから、息子 ( 　 ) 車で (送ります…＿＿＿＿) ましょうか。
2) もしもし、太郎君いますか。…いいえ、今出かけていますよ。あとで太郎 ( 　 ) 電話を (します…＿＿＿＿) ましょうか。
3) もしもし、さっき駅に着いたんですが、タクシーが来ないんです。…すぐだれか ( 　 ) 車で (行きます…＿＿＿＿) ますから、待っていてください。', 'FILL_BLANK', '1) に, 送らせ
2) に, させ
3) を, 行かせ', 4 FROM exercises ex WHERE ex.sort_order = 52 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Hoàn thành lời xin phép lịch sự với ～させていただけませんか:
例: きょうの午後会議室を (使います…使わせて) いただけませんか。
1) すぐ答えられないので、少し (考えます…＿＿＿＿) いただけませんか。
2) 申し込んでいなかったんですが、わたしもパーティーに (参加します…＿＿＿＿) いただけませんか。
3) 熱があるので、早く (帰ります…＿＿＿＿) いただけませんか。
4) 兄の結婚式で国へ帰りたいので、1週間ほど (休みます…＿＿＿＿) いただけませんか。
5) 経済の資料を探しているんですが、課長のデータを (コピーします…＿＿＿＿) いただけませんか。', 'FILL_BLANK', '1) 考えさせて
2) 参加させて
3) 帰らせて
4) 休ませて
5) コピーさせて', 5 FROM exercises ex WHERE ex.sort_order = 52 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Chọn cách diễn đạt đúng trong ngoặc { }:
例: 日本語が上手になりましたね。…ありがとうございます。とてもいい先生に { 教えさせました, (教えていただきました) } から。
1) もう新幹線の切符を買いましたか。…ええ、息子に { 買って来させました, 買って来ていただきました } よ。
2) この本はとてもいい本ですね。…そうですね、ぜひ子どもに { 読んでもらいましょう, 読ませましょう }。
3) 初めて京都へ行ったんですか。…ええ、友達に { 案内させました, 案内してもらいました }。
4) 日本語の先生は厳しいですか。…ええ、先生は授業中は日本語しか { 使わせません, 使ってもらいません }。', 'FILL_BLANK', '1) 買って来させました
2) 読ませましょう
3) 案内してもらいました
4) 使わせません', 6 FROM exercises ex WHERE ex.sort_order = 52 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: Bài 49 (SortOrder 53, Lesson 49)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 49', 'Bài tập Minna no Nihongo N4 - Bài 49: Kính ngữ (尊敬語 - Tôn kính ngữ), Động từ dạng bị động mang nghĩa tôn kính, Tôn kính ngữ dạng お～になります, Động từ tôn kính đặc biệt, お/ご～ください', 'LESSON', 'EXERCISE', 53 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 49 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 53);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Hoàn thành câu với thể bị động mang nghĩa tôn kính:
例: お客様はもう (帰りました…帰られました) か。
1) 先生はどちらで電車を (降ります…＿＿＿＿) か。
2) いつかぎを (なくしました…＿＿＿＿) んですか。
3) 課長は今本を (読みます…＿＿＿＿) います。
4) 部長はたった今 (出かけました…＿＿＿＿) ところです。
5) さっき先生が (説明しました…＿＿＿＿) とおりに、やってみてください。
6) パワー電気のシュミットさんはあした10時に (来ます…＿＿＿＿) そうです。', 'FILL_BLANK', '1) 降りられます
2) なくされた
3) 読まれて
4) 出かけられた
5) 説明された
6) 来られる', 1 FROM exercises ex WHERE ex.sort_order = 53 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Hoàn thành câu với cấu trúc tôn kính お～になります:
例: クララさんは日本の新聞をお読みになりますか。…ええ、読みます。
1) 先生、(疲れます…＿＿＿＿) でしょう。…ええ、少し疲れましたね。
2) 部長はこの会社に何年ぐらい (勤めます…＿＿＿＿) か。…そうですね、30年ぐらい勤めました。
3) 課長、会社に (戻ります…＿＿＿＿) か。…ええ、戻ろうと思っています。
4) その手帳、どちらで (買います…＿＿＿＿) んですか。…エドヤストアで買いました。
5) どのくらい (待ちます…＿＿＿＿) か。…30分ぐらい待ちました。
6) 京都ではどちらに (泊まります…＿＿＿＿) か。…駅の近くのホテルに泊まりました。
7) 部長はたばこを (吸います…＿＿＿＿) か。…いいえ、わたしは吸いません。
8) 課長、IMCの中村さんに電話を (かけます…＿＿＿＿) か。…あ、いけない。まだかけていません。
9) パワー電気ではどなたと (話します…＿＿＿＿) んですか。…シュミットさんと話しました。', 'FILL_BLANK', '1) お疲れになった
2) お勤めになりました
3) お戻りになります
4) お買いになった
5) お待ちになりました
6) お泊まりになりました
7) お吸いになります
8) おかけになりました
9) お話しになった', 2 FROM exercises ex WHERE ex.sort_order = 53 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Hoàn thành câu với động từ tôn kính đặc biệt:
例: あの部屋にだれかいますか。…はい、部長がいらっしゃいます。
1) 昼ごはんは (食べました…＿＿＿＿) か。…ええ、もう食べました。
2) だれがカタログを届けろと言ったんですか。…部長が (言いました…＿＿＿＿) んです。
3) あの留学生の名前を (知っています…＿＿＿＿) か。…いいえ、知りません。
4) だれがこのチョコレートをくれたんですか。…ハンス君のお母様が (くれました…＿＿＿＿) んです。
5) 何かスポーツを (します…＿＿＿＿) か。…ええ、時々テニスをします。
6) この間のピカソの展覧会を (見ました…＿＿＿＿) か。…ええ、見ましたよ。
7) 何時までに会社へ来ればいいんですか。…9時までです。でも、社長は8時半に (来ます…＿＿＿＿) よ。', 'FILL_BLANK', '1) 召し上がりました
2) おっしゃった
3) ご存じです
4) くださった
5) なさいます
6) ご覧になりました
7) いらっしゃいます', 3 FROM exercises ex WHERE ex.sort_order = 53 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Chọn động từ trong khung và hoàn thành câu với お／ご～ください:
[ 掛けます, 集まります, 過ごします, 確認します, 答えます, 利用します, 参加します, 楽しみます, 入ります, 待ちます, 注意します ]

例1: どうぞそのいすにお掛けください。
例2: 来月のスキー旅行、どうぞ奮ってご参加ください。
1) 40階まで行く方はあちらのエレベーターを＿＿＿＿ください。
2) では、楽しい週末を＿＿＿＿ください。
3) お客様、忘れ物に＿＿＿＿ください。
4) あしたは8時までにロビーに＿＿＿＿ください。
5) 書類を出すまえに、お名前とご住所を＿＿＿＿ください。
6) ここは出口ですから、あちらから＿＿＿＿ください。
7) これから始まるコンサートをどうぞ＿＿＿＿ください。
8) 申し訳ありませんが、あと10分ほど＿＿＿＿ください。', 'FILL_BLANK', '1) ご利用
2) お過ごし
3) ご注意
4) お集まり
5) ご確認
6) お入り
7) お楽しみ
8) お待ち', 4 FROM exercises ex WHERE ex.sort_order = 53 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
-- =========================================================
-- Exercise: Bài 50 (SortOrder 54, Lesson 50)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, 'Bài 50', 'Bài tập Minna no Nihongo N4 - Bài 50: Khiêm nhường ngữ (謙譲語), Cấu trúc お／ご～します, Động từ khiêm nhường đặc biệt, ございます / ～でございます, Hội thoại qua điện thoại', 'LESSON', 'EXERCISE', 54 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 50 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 54);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: わたしはパワー電気 ( に ) 勤めております。
1) 初めまして。林 ( 　 ) 申します。
2) ミラーさんがスピーチコンテスト ( 　 ) 優勝したの ( 　 ) ご存じですか。
3) 部長の奥様 ( 　 ) すき焼きの作り方 ( 　 ) 教えていただきました。
4) この資金は何 ( 　 ) お使いになりますか。
5) お名前は何 ( 　 ) おっしゃいますか。
6) 先生 ( 　 ) パーティー ( 　 ) ご招待したいと思います。', 'FILL_BLANK', '1) と
2) で, を
3) に, を
4) に
5) と
6) を, に', 1 FROM exercises ex WHERE ex.sort_order = 54 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Hoàn thành câu với thể khiêm nhường お／ご～します:
例1: タクシーを (呼びます…お呼びし) ましょうか。
例2: 私が (案内します…ご案内し) ます。
1) 雨が降っていますね。傘を (貸します…＿＿＿＿) ましょうか。
2) さっき木村さんに (連絡します…＿＿＿＿) ました。
3) 先生、お茶を (いれます…＿＿＿＿) ましたので、どうぞ。
4) これから新しい製品について (説明します…＿＿＿＿) ます。
5) 予定が変わったので、課長に (伝えます…＿＿＿＿) おきました。
6) いつでも (手伝います…＿＿＿＿) ますから、おっしゃってください。
7) この本を (借ります…＿＿＿＿) もいいですか。
8) サイズが合わなければ、(取り替えます…＿＿＿＿) ますよ。', 'FILL_BLANK', '1) お貸しし
2) ご連絡し
3) おいれし
4) ご説明し
5) お伝えして
6) お手伝いし
7) お借りして
8) お取り替えし', 2 FROM exercises ex WHERE ex.sort_order = 54 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Đổi câu trả lời sang dạng khiêm nhường お～しました / お～します:
例: 部長に借りた本はもうお返しになりましたか。…はい、もうお返ししました。
1) 中村課長にお会いになりましたか。…はい、＿＿＿＿。
2) 先生のご都合をお聞きになりましたか。…はい、＿＿＿＿。
3) 先生にお手紙をお出しになりましたか。…はい、＿＿＿＿。
4) 皆さんにお知らせになりましたか。…いいえ、まだです。あした＿＿＿＿つもりです。
5) 木村さんにお電話をおかけになりましたか。…いいえ、これから＿＿＿＿ところです。
6) 社長は今本を読んでいらっしゃいますが、お待ちになりますか。…はい、＿＿＿＿。', 'FILL_BLANK', '1) お会いしました
2) お聞きしました
3) お出ししました
4) お知らせする
5) おかけする
6) お待ちします', 3 FROM exercises ex WHERE ex.sort_order = 54 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Hoàn thành câu trả lời với động từ khiêm nhường đặc biệt:
例: いつ京都へいらっしゃいますか。…あした参ります。
1) どなたがあいさつをなさいましたか。…私が＿＿＿＿。
2) お父さんは何とおっしゃいましたか。…父は何でも好きな仕事をしてもいいと＿＿＿＿。
3) どうぞこちらの料理も召し上がってください。…ありがとうございます。もうたくさん＿＿＿＿。
4) これ、京都で撮ったお寺の写真ですが、ご覧になりますか。…ええ、ぜひ＿＿＿＿たいです。
5) あそこに立っている方をご存じですか。…いいえ、＿＿＿＿。
6) 弟さんはどちらにいらっしゃいますか。…北京に＿＿＿＿。', 'FILL_BLANK', '1) いたしました
2) 申しました
3) いただきました
4) 拝見し
5) 存じません
6) おります', 4 FROM exercises ex WHERE ex.sort_order = 54 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chọn dạng kính ngữ phù hợp giữa Tôn kính ngữ và Khiêm nhường ngữ trong ngoặc { }:
例: 父はさ来週日本へ { いらっしゃいます, 来られます, (参ります) }。
1) 先生はパーティーの時間を { 存じています, ご存じです, 存じません } か。
2) また先生に { お目にかかりたい, 拝見したい, ご覧になりたい } と思います。
3) 先生の予定は受付で { お聞きになって, お聞きして, 聞いて } ください。
4) わたしたちは来週先生のお宅へ { 伺います, いらっしゃいます, 来られます }。
5) 先生は何と { お話ししました, 申しました, おっしゃいました } か。
6) 私が旅行について { ご説明します, 説明されます, 説明なさいます }。
7) グプタさんは刺身を { いただきません, 召し上がりません, お食べしません }。', 'FILL_BLANK', '1) ご存じです
2) お目にかかりたい
3) お聞きになって
4) 伺います
5) おっしゃいました
6) ご説明します
7) 召し上がりません', 5 FROM exercises ex WHERE ex.sort_order = 54 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Điền từ thích hợp vào đoạn hội thoại qua điện thoại:
ミラー: もしもし、松本さんの (例: うち…お宅) ですか。
松本: はい、松本でございます。
ミラー: 私はIMCのミラーと (言います…a. ＿＿＿＿) が、部長は (います…b. ＿＿＿＿) か。
松本: 父は今 (出かけています…c. ＿＿＿＿) が……。
ミラー: 何時ごろ (帰ります…d. ＿＿＿＿) か。
松本: 夕方には戻る予定です。
ミラー: では、7時ごろまた (電話します…e. ＿＿＿＿)。(失礼します…f. ＿＿＿＿)。', 'FILL_BLANK', 'a. 申します
b. いらっしゃいます
c. 出かけております
d. お帰りになります／帰られます
e. お電話します／お電話いたします
f. 失礼いたします', 6 FROM exercises ex WHERE ex.sort_order = 54 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: 復習 (43課~50課) (SortOrder 55, Lesson 50)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, '復習 (43課~50課)', 'Bài tập ôn tập tổng hợp Minna no Nihongo N4 (Bài 43 đến Bài 50): Dấu hiệu / truyền ngôn, quá mức, dễ/khó, trường hợp/ngược lại, đúng lúc/vừa mới, sai khiến, tôn kính ngữ, khiêm nhường ngữ', 'REVIEW', 'EXERCISE', 55 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 50 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 55);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: ことしは去年 ( より ) 早く桜が咲きそうです。
1) 大学 ( 　 ) 卒業してから、ずっとこの会社 ( 　 ) 勤めております。
2) 子どもの声 ( 　 ) しますね。女の子 ( 　 ) ようです。
3) 昼食はそば ( 　 ) うどん ( 　 )、どちら ( 　 ) しますか。
4) あと15分ぐらい ( 　 ) 終わりそうですから、待ってください。
5) 妻は子ども ( 　 ) 買い物 ( 　 ) 行かせました。
6) 晩ごはんはすき焼き ( 　 ) しようと思っています。
7) シャツ ( 　 ) ボタン ( 　 ) とれそうですよ。
8) この字の大きさ ( 　 ) 2倍 ( 　 ) したいんですが……。
9) 娘 ( 　 ) 塾 ( 　 ) 通わせます。
10) 交通事故 ( 　 ) あって、足 ( 　 ) けがをしました。
11) 先生は絶対に学生 ( 　 ) 英語 ( 　 ) 使わせません。
12) 部長の息子さんは医者 ( 　 ) はずです。
13) いろいろ教えてくださった皆様 ( 　 ) 心から感謝いたします。
14) どうぞこのいす ( 　 ) お掛けください。
15) このコップは丈夫で、子どもが使うの ( 　 ) 安全でいいです。', 'FILL_BLANK', '1) を, に
2) が, の
3) と, と, に
4) で
5) を, に
6) に
7) の, が
8) を, に
9) を, に
10) に, に
11) に, を
12) の
13) に
14) に
15) に', 1 FROM exercises ex WHERE ex.sort_order = 55 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Chọn từ thích hợp trong ngoặc { }:
例: 先週修理したエアコンの { (調子), 都合, 機会 } はいかがですか。
1) 電気製品には { 保険証, 保証書, 領収書 } が付いています。
2) 新聞の { データ, ファイル, ガイド } によると、日本の輸出は減っているそうです。
3) この { 封筒, かばん, ふろしき } はポケットがたくさんあって、使いやすいです。
4) パソコンの故障の { 原因, 意味, 様子 } を調べています。
5) わたしは { 濃い, 厚い, 太い } コーヒーが好きです。
6) { あまり, どうも, もっと } エンジンの調子が悪いようです。
7) 肉や魚が食べられない人のために、{ 特別な, 下手な, 丈夫な } 料理を作りました。
8) ここにある辞書はだれでも { 急に, 上手に, 自由に } 使えます。
9) マラソン大会で { 1号, 1位, 1便 } になれなくて、残念でした。
10) 昼ごはんはいつも会社の食堂で食べていますが、{ 急に, 急に, たまに } レストランへ食べに行きます。', 'FILL_BLANK', '1) 保証書
2) データ
3) かばん
4) 原因
5) 濃い
6) どうも
7) 特別な
8) 自由に
9) 1位
10) たまに', 2 FROM exercises ex WHERE ex.sort_order = 55 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Đổi dạng đúng của động từ / tính từ trong ngoặc ( ):
例: 網棚の荷物が (落ちます…落ち) そうです。
1) ニュースによると、北海道で大きな地震が (ありました…＿＿＿＿) そうです。
2) きのう (歩きました…＿＿＿＿) すぎて、きょうは足が痛いです。
3) 白い服は (汚れます…＿＿＿＿) やすいです。
4) あの二人、(楽しいです…＿＿＿＿) そうですね。…ええ、この間 (結婚しました…＿＿＿＿) ばかりなんです。
5) この書類、字が小さくて (読みます…＿＿＿＿) にくいですね。
6) この料理は (冷たいです…＿＿＿＿) して召し上がってください。
7) ちょっと飲み物を買いに (行きます…＿＿＿＿) 来ます。
8) 会社を (休みます…＿＿＿＿) 場合は、必ず電話をかけてください。
9) 先月日本語の勉強を (始めます…＿＿＿＿) ばかりなのに、ずいぶん上手ですね。
10) ちょうど今から (食事します…＿＿＿＿) ところです。いっしょにいかがですか。
11) グプタさんは先週国へ帰りましたから、今日本に (いません…＿＿＿＿) はずです。
12) あそこの交差点、人が大勢集まっていますね。事故が (ありました…＿＿＿＿) ようです。
13) わたしにこの仕事を (やります…＿＿＿＿) いただけませんか。…じゃ、お願いします。
14) 先生は来週月曜日に学生にスピーチのことを (話します…＿＿＿＿) ので、学生は準備しておかなければなりません。', 'FILL_BLANK', '1) あった
2) 歩き
3) 汚れ
4) 楽し, 結婚した
5) 読み
6) 冷たく
7) 行って
8) 休む
9) 始めた
10) 食事する
11) いない
12) あった
13) やらせて
14) 話させる', 3 FROM exercises ex WHERE ex.sort_order = 55 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Điền cặp Tôn kính ngữ (Kính ngữ) và Khiêm nhường ngữ phù hợp:
[ いらっしゃいます, 召し上がります, おっしゃいます, お目にかかります, 申します, なさいます, いたします, 拝見します, ご覧になります, くださいます, おります, 参ります, 伺います, ご存じです, いただきます, 存じません, お会いになります ]

例: 休日どこへいらっしゃいましたか。…京都や奈良へ参りました。
1) 先月生まれた赤ちゃんのお名前は何と＿＿＿＿んですか。…太郎と＿＿＿＿。
2) 伊藤先生がおかきになった絵をもう＿＿＿＿か。…はい、きのう＿＿＿＿。
3) 奥様、ワインを＿＿＿＿か。…ええ、少し＿＿＿＿。
4) あしたの卒業式でどなたがあいさつを＿＿＿＿か。…私が＿＿＿＿。
5) 日曜日お宅へ＿＿＿＿もいいですか。…ええ、どうぞ。日曜日はたいていうちに＿＿＿＿から。
6) 部長のお宅の電話番号を＿＿＿＿か。…いいえ、＿＿＿＿。
7) きのうお国からあなたの先生が＿＿＿＿そうですね。…ええ、先生がお土産に国のお菓子を＿＿＿＿ので、いっしょにいかがですか。
8) 先週のパーティーで部長の奥様にお会いしましたが、あなたも＿＿＿＿か。…はい、私も＿＿＿＿。', 'FILL_BLANK', '1) おっしゃる, 申します
2) ご覧になりました, 拝見しました
3) 召し上がります, いただきます
4) なさいます, いたします
5) 伺って, おります
6) ご存じです, 存じません
7) いらっしゃった, くださった
8) お会いになりました, お目にかかりました', 4 FROM exercises ex WHERE ex.sort_order = 55 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chuyển đổi giữa 2 cách nói tôn kính (thể bị động mang nghĩa tôn kính ↔ お～になります):
例: 課長はもう帰られましたか。…いいえ、まだお帰りになりません。
1) ワット先生は日本語を上手に＿＿＿＿そうですね。…ええ、それに韓国語も少しお話しになります。
2) 先生はどちらへ＿＿＿＿んですか。…国際会議のためにニューヨークへお出かけになったんです。
3) きのう部長はかぜで休まれました。…そうですか。かぜで＿＿＿＿んですか。
4) 松本部長は何時ごろ戻られますか。…4時ごろ＿＿＿＿予定です。
5) 山田さんはほんとうに会社をやめられたんですか。…ええ、結婚なさるので、先月＿＿＿＿。
6) 松本部長はうちを建てられたそうですね。…ええ、すばらしいうちを＿＿＿＿んですよ。
7) ミラーさんはたばこを＿＿＿＿か。…いいえ、お吸いにならないと思います。', 'FILL_BLANK', '1) 話される
2) 出かけられた
3) お休みになった
4) お戻りになる
5) おやめになりました
6) お建てになった
7) 吸われます', 5 FROM exercises ex WHERE ex.sort_order = 55 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Điền từ thích hợp [ よう, そう, はず, ところ ]:
例: ミラーさん、駅までどのくらいかかりそうですか。…そうですね、道が込んでいますから、2時間ぐらいかかると思いますよ。
1) 引っ越しの準備は終わりましたか。…いいえ、今やっている＿＿＿＿です。
2) その電子辞書は便利＿＿＿＿ですね。…ええ、とても便利ですよ。
3) グプタさんの弟さんは日本語が上手なんですか。…ええ、上手な＿＿＿＿ですよ。10年以上日本語を勉強したと言っていましたから。
4) カリナさんの誕生日はいつですか。…4月だ＿＿＿＿ですよ。
5) 電気も消えているし、かぎも掛かっているし、グプタさんはいない＿＿＿＿です。…残念ですね。また来ましょう。
6) 今ケーキを焼いた＿＿＿＿です。いっしょに食べませんか。…わあ、おいし＿＿＿＿ですね。
7) 駅前のスーパー、きょうは休みですか。…ええ、水曜日ですから、休みの＿＿＿＿ですよ。
8) さっき山田さんに聞いたんですが、あしたの会議はない＿＿＿＿ですよ。
9) タワポンさんが泣いていますね。どうしたんですか。…よくわかりませんが、試験に失敗した＿＿＿＿です。
10) 遅くなってすみません。パーティーはもう始まりましたか。…いいえ、これから始まる＿＿＿＿です。', 'FILL_BLANK', '1) ところ
2) そう
3) はず
4) そう
5) よう
6) ところ, そう
7) はず
8) そう
9) よう
10) ところ', 6 FROM exercises ex WHERE ex.sort_order = 55 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
-- =========================================================
-- Exercise: 総復習 (26課~50課) (SortOrder 56, Lesson 50)
-- =========================================================
INSERT INTO exercises (lesson_id, title, description, exercise_type, content_type, sort_order) SELECT ls.id, '総復習 (26課~50課)', 'Bài tập tổng ôn tập toàn bộ Minna no Nihongo N4 (Bài 26 đến Bài 50): Trợ từ, từ vựng, từ trái nghĩa, các thể động từ, phó từ, ngữ pháp tổng hợp, hội thoại và phân biệt cấu trúc', 'REVIEW', 'EXERCISE', 56 FROM lessons ls JOIN levels lv ON ls.level_id = lv.id WHERE lv.code = 'N4' AND ls.lesson_number = 50 AND NOT EXISTS (SELECT 1 FROM exercises WHERE sort_order = 56);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '1. Điền trợ từ thích hợp vào ngoặc ( ):
例: 電車の事故 ( で ) 試験 ( に ) 遅れてしまいました。
1) 変なにおい ( 　 ) しますね。ちょっと見て来ます。
2) 部長は鈴木さん ( 　 ) 3日間休ませました。
3) この歌手は若い人 ( 　 ) 人気があります。
4) 車 ( 　 ) 興味があるんですが、いい雑誌を教えていただけませんか。
5) 祖父はフランス旅行のお土産 ( 　 ) チョコレートをくれました。
6) 世界の平和 ( 　 ) ために働きたいと思います。
7) 木村さんは80歳 ( 　 ) 過ぎても、毎朝散歩しています。
8) エアコンが故障した ( 　 ) 場合は、この番号に連絡してください。
9) 忘年会はいつ ( 　 ) しますか。
10) この漢字は何 ( 　 ) 読みますか。
11) すみませんが、ミラーさん ( 　 ) あしたの会議は中止になった ( 　 ) 伝えていただけませんか。
12) ビールは麦 ( 　 ) 造られます。
13) もう少し大きい声 ( 　 ) 言っていただけませんか。
14) イーさんは留守 ( 　 ) ようですね。', 'FILL_BLANK', '1) が
2) を
3) に
4) に
5) に
6) の
7) を
8) の
9) に
10) と
11) に, と
12) から
13) で
14) の', 1 FROM exercises ex WHERE ex.sort_order = 56 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 1);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '2. Viết từ trái nghĩa tương ứng:
例: 日本語が (上手 ↔ 下手) です。
1) このズボンは (細い ↔ ＿＿＿＿) です。
2) この川の水は (きれい ↔ ＿＿＿＿) です。
3) ここは (安全 ↔ ＿＿＿＿) だと思います。
4) (西 ↔ ＿＿＿＿) の空が青いです。
5) ここは (入口 ↔ ＿＿＿＿) です。
6) わたしはその意見に (反対 ↔ ＿＿＿＿) です。
7) ことしは石油の (輸入 ↔ ＿＿＿＿) が増えました。
8) 実験に (失敗しました ↔ ＿＿＿＿)。
9) 車のドアが (開いて ↔ ＿＿＿＿) います。
10) コピー機の電源を (入れて ↔ ＿＿＿＿) おいてください。', 'FILL_BLANK', '1) 太い
2) 汚い
3) 危険
4) 東
5) 出口
6) 賛成
7) 輸出
8) 成功しました
9) 閉まって
10) 切って', 2 FROM exercises ex WHERE ex.sort_order = 56 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 2);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '3. Chọn phương án đúng trong ngoặc { }:
例: 天気予報によると、あした雨が { (降るそうです), 降りそうです, 降るようです }。
1) この花は今にも { 咲くそうです, 咲きそうです, 咲いたばかりです }。
2) この新しい家具は祖父に買って { もらった, くださった, いただいた } んです。
3) ちょっと早すぎたので、ここで { 待たれてくださいませんか, 待たせていただけませんか, お待ちしてくださいませんか }。
4) 国へ { 帰ると, 帰ったら, 帰れば }、必ず手紙を書きます。
5) 日本からタイまで6時間ですから、3時の飛行機に乗れば、9時には { 着くはずです, 着くようです, 着くそうです }。
6) この靴、ちょっとはいて { おいて, みて, しまって } もいいですか。
7) わたしは新しいカメラを弟に { なくされてしまいました, なくさせてしまいました, なくしてしまいました }。
8) 来年も日本語の勉強を { 続けそう, 続けよう, 続けるよう } と思っています。
9) このいすは壊れて { あります, います, おきます }。
10) 先生は今晩お宅に { おりますか, なさいますか, いらっしゃいますか }。
11) 少々 { お待ちください, お待ちしてください, お待たれください }。
12) きのうのパーティーで食べすぎて { おきました, みました, しまいました }。
13) 田中先生に { お会いしたいんですが, お会いになりたいんですが, 会われたいんですが }……。
14) わたしは娘に英語を { 習われて, 習わせて, お習いして } います。
15) 来年大学院の試験を受けますか。…今 { 考える, 考えている, 考えた } ところです。', 'FILL_BLANK', '1) 咲きそうです
2) もらった
3) 待たせていただけませんか
4) 帰ったら
5) 着くはずです
6) みて
7) なくされてしまいました
8) 続けよう
9) います
10) いらっしゃいますか
11) お待ちください
12) しまいました
13) お会いしたいんですが
14) 習わせて
15) 考えている', 3 FROM exercises ex WHERE ex.sort_order = 56 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 3);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '4. Đổi dạng đúng của động từ / tính từ trong ngoặc ( ):
例: タクシーに (乗ります…乗ら) ないで、駅まで歩きました。
1) わたしは一人で着物が (着ます…＿＿＿＿) ません。
2) たばこを吸わないでください。ここは (禁煙です…＿＿＿＿) んです。
3) お茶でも (飲みます…＿＿＿＿) ながら、話しませんか。
4) この店は味も (いいです…＿＿＿＿) し、店の人の態度も (親切です…＿＿＿＿) し、それに安いんです。
5) わたしは留学を (あきらめます…＿＿＿＿) と思っています。
6) 健康のために、できるだけ (運動します…＿＿＿＿) ほうがいいです。
7) ちょっと (遅れます…＿＿＿＿) かもしれませんから、先にミーティングを始めてください。
8) 家族に (会えません…＿＿＿＿)、寂しいです。
9) (食事します…＿＿＿＿) あとで、歯を磨いてください。
10) 天気が (いいです…＿＿＿＿) ば、屋上から富士山が見えます。
11) あそこで寝ている猫、気持ちが (いいです…＿＿＿＿) そうですね。
12) コンビニで24時間買い物が (できます…＿＿＿＿) ようになりました。
13) 泥棒にカメラを (とりました…＿＿＿＿)。
14) (邪魔です…＿＿＿＿) ので、この荷物を片づけてください。
15) あしたは何時に (来られます…＿＿＿＿) か、わかりません。
16) 切符を (なくします…＿＿＿＿) ないようにしてください。
17) そのかばん、(重いです…＿＿＿＿) そうですね。お持ちしましょうか。
18) コピーが薄いので、もう少し (濃いです…＿＿＿＿) してください。
19) カリナさんは (独身です…＿＿＿＿) のに、子どもの世話をするのが上手です。', 'FILL_BLANK', '1) 着られ
2) 禁煙な
3) 飲み
4) いい, 親切だ
5) あきらめよう
6) 運動した
7) 遅れる
8) 会えなくて
9) 食事した
10) よけれ
11) よさ
12) できる
13) とられました
14) 邪魔な
15) 来られる
16) なくさ
17) 重
18) 濃く
19) 独身な', 4 FROM exercises ex WHERE ex.sort_order = 56 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 4);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '5. Chọn từ thích hợp trong ngoặc { }:
例: 最近体の { 都合, (調子), 機会 } が悪いので、あした病院へ行きます。
1) この仕事は { 危険, 試合, 経験 } がなくてもできます。
2) ミラーさん、政治に { 趣味, 興味, 意味 } がありますか。
3) この花はいい { 声, 音, におい } がしますね。
4) 部長に来週の { スケジュール, ミーティング, クリーニング } を聞いてみます。
5) 試験の { 目的, 成績, 習慣 } が悪かったので、もっと勉強しなければなりません。
6) { 急に, 自由に, 上手に } 来週の予定が変わりました。
7) { ちょっと, ずっと, ちょうど } 今から講義が始まるところです。
8) { やっと, きっと, ずっと } 日本語で電話がかけられるようになりました。
9) あの人がかぶっている帽子、すてきですね。…わたしも { こんな, そんな, あんな } 帽子が欲しいと思っていたんです。
10) このエアコン、修理に3万円ぐらいかかりますよ。…{ それで, それなら, それに } 新しいのを買ったほうがいいかもしれませんね。', 'FILL_BLANK', '1) 経験
2) 興味
3) におい
4) スケジュール
5) 成績
6) 急に
7) ちょうど
8) やっと
9) あんな
10) それなら', 5 FROM exercises ex WHERE ex.sort_order = 56 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 5);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '6. Ghép câu hội thoại tương ứng (từ 1..10 với a..k):
例: 優勝おめでとうございます。…( b. ありがとうございます )
1) お先に失礼します。…( ＿＿＿＿ )
2) あ、いけない。…( ＿＿＿＿ )
3) なくした財布がやっと見つかりました。…( ＿＿＿＿ )
4) あのう、お願いがあるんですが。…( ＿＿＿＿ )
5) いすを並べましょうか。…( ＿＿＿＿ )
6) そろそろ帰りませんか。…( ＿＿＿＿ )
7) 傘、お貸ししましょうか。…( ＿＿＿＿ )
8) きのう弟が入院したんです。…( ＿＿＿＿ )
9) 大学に合格しました。…( ＿＿＿＿ )
10) あさって休ませていただけませんか。…( ＿＿＿＿ )

[ Lựa chọn đáp lại: a. いいえ、そのままにしておいてください, c. ええ、かまいませんよ, d. はい、何ですか, e. それはいけませんね, f. どうしたんですか, g. これをやってしまいますから、お先にどうぞ, h. それはおめでとうございます, i. お疲れさまでした, j. すみません。お願いします, k. よかったですね ]', 'FILL_BLANK', '1) i
2) f
3) k
4) d
5) a
6) g
7) j
8) e
9) h
10) c', 6 FROM exercises ex WHERE ex.sort_order = 56 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 6);
INSERT INTO questions (exercise_id, question_text, question_type, explanation, sort_order) SELECT ex.id, '7. Phân biệt cấu trúc ngữ pháp phù hợp (đánh dấu ○ nếu đúng ngữ pháp, × nếu sai):
例: 暑ければ (○), 暑かったら (○), 暑いと (×)、窓を開けてください。
1) 北海道へ { 行けば ( 　 ), 行ったら ( 　 ), 行くと ( 　 ) }、写真を撮って来ます。
2) { 暇だったら ( 　 ), 暇で ( 　 ), 暇なら ( 　 ) }、遊びに来てください。
3) けさ学校へ { 来たとき ( 　 ), 来るとき ( 　 ), 来る場合は ( 　 ) }、駅で先生に会いました。
4) 電話番号を { まちがえると ( 　 ), まちがえたら ( 　 ), まちがえれば ( 　 ) }、どうすればいいですか。
5) { 寒くて ( 　 ), 寒くても ( 　 ), 寒いので ( 　 ) }、窓を閉めていただけませんか。
6) 日本の経済について論文を { 書くために ( 　 ), 書くのに ( 　 ), 書くように ( 　 ) }、日本へ来ました。
7) すみませんが、これを林さんに届けて { もらいませんか ( 　 ), いただけませんか ( 　 ), あげませんか ( 　 ) }。
8) 先生、お荷物を { 持たれましょうか ( 　 ), お持ちになりましょうか ( 　 ), お持ちしましょうか ( 　 ) }。
9) ちょっとうちに電話を { かけたい ( 　 ), おかけしたい ( 　 ), おかけになりたい ( 　 ) } んですが……。
10) あそこに { お立ちしている ( 　 ), 立っている ( 　 ), 立っていらっしゃる ( 　 ) } のは妻です。', 'FILL_BLANK', '1) ×, ○, ×
2) ○, ×, ○
3) ×, ○, ×
4) ×, ○, ×
5) ×, ×, ○
6) ○, ×, ×
7) ×, ○, ×
8) ×, ×, ○
9) ○, ×, ×
10) ×, ○, ×', 7 FROM exercises ex WHERE ex.sort_order = 56 AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.exercise_id = ex.id AND q.sort_order = 7);
