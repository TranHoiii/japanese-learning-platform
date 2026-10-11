import sys
import json
import os

sys.stdout.reconfigure(encoding='utf-8')

# 220 Kanji for N5 across 20 Units based on Kanji Masuta N5 (Minna no Nihongo I)
# Every kanji has:
# - kanji
# - hanViet
# - onyomi
# - kunyomi
# - meaning
# - strokeCount
# - strokeOrderUrl
# - mnemonic
# - kanjiNumber (1 to 220)
# - lessons (list of Minna no Nihongo lesson numbers)
# - compounds (list of compound objects)

kanji_defs = [
    # ==========================================
    # UNIT 1 (Kanji #1 - #10) | Minna L1 (đến bài 5)
    # ==========================================
    {
        "kanji": "日",
        "hanViet": "NHẬT",
        "onyomi": "ニチ, ジツ",
        "kunyomi": "ひ, -び, -か",
        "meaning": "Ngày / Mặt trời",
        "strokeCount": 4,
        "mnemonic": "Hình tượng mặt trời tròn có vệt sáng ở giữa.",
        "kanjiNumber": 1,
        "lessons": [1],
        "compounds": [
            {"word": "日本", "reading": "にほん", "meaning": "Nhật Bản", "exampleSentence": "日本が好きです。"},
            {"word": "日曜日", "reading": "にちようび", "meaning": "Chủ nhật", "exampleSentence": "日曜日は休みです。"},
            {"word": "毎日", "reading": "まいにち", "meaning": "Hàng ngày", "exampleSentence": "毎日日本語を勉強します。"}
        ]
    },
    {
        "kanji": "月",
        "hanViet": "NGUYỆT",
        "onyomi": "ゲツ, ガツ",
        "kunyomi": "つき",
        "meaning": "Tháng / Mặt trăng",
        "strokeCount": 4,
        "mnemonic": "Hình tượng vầng trăng khuyết lơ lửng trên bầu trời.",
        "kanjiNumber": 2,
        "lessons": [1],
        "compounds": [
            {"word": "月曜日", "reading": "げつようび", "meaning": "Thứ hai", "exampleSentence": "月曜日に会いましょう。"},
            {"word": "今月", "reading": "こんげつ", "meaning": "Tháng này", "exampleSentence": "今月は忙しいです。"},
            {"word": "一月", "reading": "いちがつ", "meaning": "Tháng một", "exampleSentence": "一月は寒いです。"}
        ]
    },
    {
        "kanji": "火",
        "hanViet": "HỎA",
        "onyomi": "カ",
        "kunyomi": "ひ, -び",
        "meaning": "Lửa",
        "strokeCount": 4,
        "mnemonic": "Hình ảnh ngọn lửa bùng cháy dữ dội với tàn lửa bay xung quanh.",
        "kanjiNumber": 3,
        "lessons": [1],
        "compounds": [
            {"word": "火曜日", "reading": "かようび", "meaning": "Thứ ba", "exampleSentence": "火曜日にテストがあります。"},
            {"word": "火事", "reading": "かじ", "meaning": "Hỏa hoạn", "exampleSentence": "火事に気をつけてください。"},
            {"word": "花火", "reading": "はなび", "meaning": "Pháo hoa", "exampleSentence": "夏に花火を見ます。"}
        ]
    },
    {
        "kanji": "水",
        "hanViet": "THỦY",
        "onyomi": "スイ",
        "kunyomi": "みず",
        "meaning": "Nước",
        "strokeCount": 4,
        "mnemonic": "Hình dòng nước chảy cuộn sóng tung bọt trắng.",
        "kanjiNumber": 4,
        "lessons": [1],
        "compounds": [
            {"word": "水曜日", "reading": "すいようび", "meaning": "Thứ tư", "exampleSentence": "水曜日は泳ぎに行きます。"},
            {"word": "水", "reading": "みず", "meaning": "Nước", "exampleSentence": "冷たい水を飲みます。"},
            {"word": "水泳", "reading": "すいえい", "meaning": "Bơi lội", "exampleSentence": "水泳が得意です。"}
        ]
    },
    {
        "kanji": "木",
        "hanViet": "MỘC",
        "onyomi": "モク, ボク",
        "kunyomi": "き, こ-",
        "meaning": "Cây / Gỗ",
        "strokeCount": 4,
        "mnemonic": "Hình thân cây vươn cành lá và rễ cắm sâu vào đất.",
        "kanjiNumber": 5,
        "lessons": [1],
        "compounds": [
            {"word": "木曜日", "reading": "もくようび", "meaning": "Thứ năm", "exampleSentence": "木曜日に映画を見ます。"},
            {"word": "木", "reading": "き", "meaning": "Cây", "exampleSentence": "庭に大きな木があります。"},
            {"word": "木材", "reading": "もくざい", "meaning": "Gỗ / Vật liệu gỗ", "exampleSentence": "木材で机を作ります。"}
        ]
    },
    {
        "kanji": "金",
        "hanViet": "KIM",
        "onyomi": "キン, コン",
        "kunyomi": "かね, かな-",
        "meaning": "Vàng / Tiền",
        "strokeCount": 8,
        "mnemonic": "Quặng vàng quý giá tích tụ dưới mái nhà đúc tiền.",
        "kanjiNumber": 6,
        "lessons": [1],
        "compounds": [
            {"word": "金曜日", "reading": "きんようび", "meaning": "Thứ sáu", "exampleSentence": "金曜日の夜に食事します。"},
            {"word": "お金", "reading": "おかね", "meaning": "Tiền", "exampleSentence": "お金を払います。"},
            {"word": "金色", "reading": "きんいろ", "meaning": "Màu vàng kim", "exampleSentence": "金色のかばんです。"}
        ]
    },
    {
        "kanji": "土",
        "hanViet": "THỔ",
        "onyomi": "ド, ト",
        "kunyomi": "つち",
        "meaning": "Đất",
        "strokeCount": 3,
        "mnemonic": "Mầm cây đang nhú lên từ mặt đất màu mỡ.",
        "kanjiNumber": 7,
        "lessons": [1],
        "compounds": [
            {"word": "土曜日", "reading": "どようび", "meaning": "Thứ bảy", "exampleSentence": "土曜日に買い物します。"},
            {"word": "土", "reading": "つち", "meaning": "Đất", "exampleSentence": "土をいじります。"},
            {"word": "土地", "reading": "とち", "meaning": "Đất đai", "exampleSentence": "土地を買いました。"}
        ]
    },
    {
        "kanji": "山",
        "hanViet": "SƠN",
        "onyomi": "サン, セン",
        "kunyomi": "やま",
        "meaning": "Núi",
        "strokeCount": 3,
        "mnemonic": "Hình tượng ba ngọn núi nhấp nhô đứng cạnh nhau.",
        "kanjiNumber": 8,
        "lessons": [1],
        "compounds": [
            {"word": "山", "reading": "やま", "meaning": "Núi", "exampleSentence": "山に登ります。"},
            {"word": "富士山", "reading": "ふじさん", "meaning": "Núi Phú Sĩ", "exampleSentence": "富士山は高いです。"},
            {"word": "火山", "reading": "かざん", "meaning": "Núi lửa", "exampleSentence": "活火山があります。"}
        ]
    },
    {
        "kanji": "川",
        "hanViet": "XUYÊN",
        "onyomi": "セン",
        "kunyomi": "かわ",
        "meaning": "Sông",
        "strokeCount": 3,
        "mnemonic": "Ba nét dọc uốn lượn tượng trưng cho ba dòng nước sông xuôi dòng.",
        "kanjiNumber": 9,
        "lessons": [1],
        "compounds": [
            {"word": "川", "reading": "かわ", "meaning": "Con sông", "exampleSentence": "川で魚を釣ります。"},
            {"word": "小川", "reading": "おがわ", "meaning": "Con suối nhỏ", "exampleSentence": "小川が流れています。"},
            {"word": "河川", "reading": "かせん", "meaning": "Sông ngòi", "exampleSentence": "河川敷を走ります。"}
        ]
    },
    {
        "kanji": "田",
        "hanViet": "ĐIỀN",
        "onyomi": "デン",
        "kunyomi": "た",
        "meaning": "Ruộng",
        "strokeCount": 5,
        "mnemonic": "Thửa ruộng vuông vức chia làm bốn ô trồng trọt.",
        "kanjiNumber": 10,
        "lessons": [1],
        "compounds": [
            {"word": "田んぼ", "reading": "たんぼ", "meaning": "Ruộng lúa", "exampleSentence": "田んぼが広がっています。"},
            {"word": "田舎", "reading": "いなか", "meaning": "Quê hương / Nông thôn", "exampleSentence": "田舎に帰ります。"},
            {"word": "水田", "reading": "すいでん", "meaning": "Ruộng nước", "exampleSentence": "水田が緑色です。"}
        ]
    }
]

print(f"Loaded initial {len(kanji_defs)} kanjis.")
