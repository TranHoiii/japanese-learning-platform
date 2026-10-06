import { ConfusedKanaPair } from "../types/kana";

export const CONFUSED_HIRAGANA_PAIRS: ConfusedKanaPair[] = [
  {
    id: "h-sa-ki",
    system: "hiragana",
    charA: "さ",
    romajiA: "sa",
    charB: "き",
    romajiB: "ki",
    titleVi: "Cặp chữ さ (sa) vs き (ki)",
    distinctionVi:
      "Số lượng nét gạch ngang: さ chỉ có 1 nét gạch ngang ở trên, trong khi き có 2 nét gạch ngang song song.",
    strokeDirectionVi:
      "さ viết 3 nét (1 ngang, 1 xiên cắt, 1 nét cong đáy). き viết 4 nét (2 ngang song song, 1 xiên cắt, 1 nét cong đáy).",
    memoryTipVi:
      "Chữ 'Ki' có 2 thanh ngang như hai chiếc răng chìa khóa (Key). Chữ 'Sa' chỉ có 1 thanh ngang như 1 chiếc ống hút ly nước.",
    exampleA: { word: "さくら", reading: "さくら", romaji: "sakura", meaningVi: "Hoa anh đào" },
    exampleB: { word: "きっぷ", reading: "きっぷ", romaji: "kippu", meaningVi: "Vé tàu xe" },
  },
  {
    id: "h-ha-ho",
    system: "hiragana",
    charA: "は",
    romajiA: "ha",
    charB: "ほ",
    romajiB: "ho",
    titleVi: "Cặp chữ は (ha) vs ほ (ho)",
    distinctionVi:
      "Nét trên cùng bên phải: は không có nét gạch ngang che trên đỉnh. ほ có thêm nét gạch ngang trên cùng (nét sổ dọc không chọc thủng nét ngang này).",
    strokeDirectionVi:
      "は viết 3 nét (sổ trái có móc, ngang phải, sổ dọc thắt nút). ほ viết 4 nét (sổ trái, ngang trên, ngang dưới, sổ dọc thắt nút).",
    memoryTipVi:
      "'Ho' đội thêm chiếc nón bảo hiểm che nắng trên đầu, 'Ha' để đầu trần cười ha ha thoải mái.",
    exampleA: { word: "はな", reading: "はな", romaji: "hana", meaningVi: "Bông hoa" },
    exampleB: { word: "ほし", reading: "ほし", romaji: "hoshi", meaningVi: "Ngôi sao" },
  },
  {
    id: "h-me-nu",
    system: "hiragana",
    charA: "め",
    romajiA: "me",
    charB: "ぬ",
    romajiB: "nu",
    titleVi: "Cặp chữ め (me) vs ぬ (nu)",
    distinctionVi:
      "Phần đuôi nét thứ hai: め buông lỏng tự nhiên sắc sảo, không có vòng xoắn; ぬ có vòng tròn thắt nút cuộn ở cuối đuôi.",
    strokeDirectionVi:
      "Cả hai đều có 2 nét: Nét 1 xiên chéo, nét 2 lượn vòng cung lớn từ trái sang phải. ぬ kết thúc bằng vòng xoắn nhỏ.",
    memoryTipVi:
      "'Me' là đôi mắt (trong tiếng Nhật め nghĩa là mắt) đuôi mi thanh mảnh; 'Nu' là sợi mì (Noodle) cuộn tròn thắt nút ở đuôi.",
    exampleA: { word: "めがね", reading: "めがね", romaji: "megane", meaningVi: "Kính mắt" },
    exampleB: { word: "いぬ", reading: "いぬ", romaji: "inu", meaningVi: "Con chó" },
  },
  {
    id: "h-a-o",
    system: "hiragana",
    charA: "あ",
    romajiA: "a",
    charB: "お",
    romajiB: "o",
    titleVi: "Cặp chữ あ (a) vs お (o)",
    distinctionVi:
      "Cấu trúc nét thứ 3: あ có nét sổ dọc chéo ở giữa rồi nét 3 vòng ôm lấy giao điểm. お nét thứ 2 ngoặc sang trái rồi xoay vòng tròn dưới đáy, và nét thứ 3 là dấu phẩy riêng biệt ở góc trên bên phải.",
    strokeDirectionVi:
      "あ: 1 ngang, 2 sổ dọc chéo, 3 vòng tròn quanh tâm. お: 1 ngang, 2 sổ gập vòng đáy, 3 dấu phẩy góc trên bên phải.",
    memoryTipVi:
      "あ vòng tròn ôm trọn tâm như quả táo; お có dấu phẩy bay lượn ở góc như quả bóng bay vọt ra ngoài.",
    exampleA: { word: "あさ", reading: "あさ", romaji: "asa", meaningVi: "Buổi sáng" },
    exampleB: { word: "おかね", reading: "おかね", romaji: "okane", meaningVi: "Tiền bạc" },
  },
  {
    id: "h-i-ri",
    system: "hiragana",
    charA: "い",
    romajiA: "i",
    charB: "り",
    romajiB: "ri",
    titleVi: "Cặp chữ い (i) vs り (ri)",
    distinctionVi:
      "Độ dài tương đối của hai nét: い nét bên trái dài và hơi cong móc lên, nét bên phải ngắn hơn. り nét bên trái ngắn, nét bên phải dài sâu xuống dưới.",
    strokeDirectionVi:
      "い: nét trái dài có móc nhẹ, nét phải ngắn buông lơi. り: nét trái ngắn dứt khoát, nét phải kéo dài uốn lượn sâu hơn.",
    memoryTipVi:
      "い như hai chú cá bơi chụm đầu; り như hai bờ sông uốn khúc bên ngắn bên dài (River).",
    exampleA: { word: "いえ", reading: "いえ", romaji: "ie", meaningVi: "Ngôi nhà" },
    exampleB: { word: "りんご", reading: "りんご", romaji: "ringo", meaningVi: "Quả táo" },
  },
  {
    id: "h-ru-ro",
    system: "hiragana",
    charA: "る",
    romajiA: "ru",
    charB: "ろ",
    romajiB: "ro",
    titleVi: "Cặp chữ る (ru) vs ろ (ro)",
    distinctionVi:
      "Vòng xoắn ở đáy: る kết thúc bằng một vòng tròn xoắn nhỏ khép kín; ろ đuôi mở buông tự nhiên, không có vòng xoắn.",
    strokeDirectionVi:
      "Cả hai chữ đều được viết bằng đúng 1 nét duy nhất (ngang, chéo xuống, uốn vòng cung sang phải).",
    memoryTipVi:
      "る giấu hạt ngọc tròn trong bụng; ろ mở toang cửa sổ ra ngoài.",
    exampleA: { word: "くるま", reading: "くるま", romaji: "kuruma", meaningVi: "Xe hơi" },
    exampleB: { word: "ろく", reading: "ろく", romaji: "roku", meaningVi: "Số 6" },
  },
];

export const CONFUSED_KATAKANA_PAIRS: ConfusedKanaPair[] = [
  {
    id: "k-shi-tsu",
    system: "katakana",
    charA: "シ",
    romajiA: "shi",
    charB: "ツ",
    romajiB: "tsu",
    titleVi: "Cặp chữ kinh điển シ (shi) vs ツ (tsu)",
    distinctionVi:
      "Chiều vuốt của nét dài nhất: シ nét thứ ba vuốt từ DƯỚI HẤT LÊN trên chếch phải. ツ nét thứ ba vuốt từ TRÊN DỐC XUỐNG dưới.",
    strokeDirectionVi:
      "シ: Nét 1 và 2 nằm ngang hơn (trên xuống dưới), nét 3 đặt bút từ góc dưới cùng bên trái vuốt hất lên góc trên bên phải. ツ: Nét 1 và 2 chúc đầu dọc xuống, nét 3 đặt bút từ góc trên cùng bên phải vuốt dốc xuống góc dưới bên trái.",
    memoryTipVi:
      "Bí quyết liên tưởng Hiragana: Chữ し nét cong hất từ dưới lên ➔ Chữ シ vuốt từ DƯỚI lên. Chữ つ cong chúc từ trên xuống ➔ Chữ ツ vuốt từ TRÊN xuống. Cả hai chữ cùng xuất hiện trong từ 'Áo sơ mi' (シャツ shatsu)!",
    exampleA: { word: "シャツ", reading: "シャツ", romaji: "shatsu", meaningVi: "Áo sơ mi (chứa cả シ và ツ)" },
    exampleB: { word: "ツアー", reading: "ツアー", romaji: "tsuā", meaningVi: "Chuyến du lịch (Tour)" },
  },
  {
    id: "k-so-n",
    system: "katakana",
    charA: "ソ",
    romajiA: "so",
    charB: "ン",
    romajiB: "n",
    titleVi: "Cặp chữ kinh điển ソ (so) vs ン (n)",
    distinctionVi:
      "Chiều vuốt của nét thứ hai: ソ nét dài vuốt từ TRÊN DỐC XUỐNG dưới (cùng hướng với ツ). ン nét dài vuốt từ DƯỚI HẤT LÊN trên (cùng hướng với シ).",
    strokeDirectionVi:
      "ソ: Nét 1 phẩy ngắn thẳng đứng dốc, nét 2 đặt bút từ trên cao vuốt dốc xuống trái. ン: Nét 1 phẩy ngắn gần như nằm ngang, nét 2 đặt bút từ góc dưới bên trái vuốt hất chéo lên trên.",
    memoryTipVi:
      "'So' dốc xuống vực, 'N' hất lên mây. Nhìn góc độ nét phẩy: Chữ ソ dốc đứng như chữ V, chữ ン thoải ngang ở đáy.",
    exampleA: { word: "ソファ", reading: "ソファ", romaji: "sofa", meaningVi: "Ghế sofa" },
    exampleB: { word: "パン", reading: "パン", romaji: "pan", meaningVi: "Bánh mì" },
  },
  {
    id: "k-ku-wa-ta",
    system: "katakana",
    charA: "ク",
    romajiA: "ku",
    charB: "ワ",
    romajiB: "wa",
    titleVi: "Cặp chữ ク (ku) vs ワ (wa) [và タ (ta)]",
    distinctionVi:
      "Nét khởi đầu: ク bắt đầu bằng nét phẩy ngắn nghiêng từ trên xuống. ワ bắt đầu bằng nét sổ thẳng đứng từ góc trái. Chữ タ có thêm nét phẩy ngắn ở giữa lòng.",
    strokeDirectionVi:
      "ク: 1 phẩy chéo trái, 2 gập ngang vuốt cong. ワ: 1 sổ đứng thẳng bên trái, 2 gập ngang vuốt cong xuống.",
    memoryTipVi:
      "ク có nét phẩy nghiêng nhọn mỏ; ワ có cạnh trái thẳng đứng như thân ly rượu vang (Wine).",
    exampleA: { word: "クラス", reading: "クラス", romaji: "kurasu", meaningVi: "Lớp học (Class)" },
    exampleB: { word: "ワイン", reading: "ワイン", romaji: "wain", meaningVi: "Rượu vang (Wine)" },
  },
  {
    id: "k-u-wa-fu",
    system: "katakana",
    charA: "ウ",
    romajiA: "u",
    charB: "ワ",
    romajiB: "wa",
    titleVi: "Cặp chữ ウ (u) vs ワ (wa) [và フ (fu)]",
    distinctionVi:
      "Nét chấm trên nóc: ウ có nét chấm trên đỉnh nóc nhà (3 nét). ワ không có chấm trên đỉnh (2 nét). フ chỉ có 1 nét gập cong duy nhất.",
    strokeDirectionVi:
      "ウ: 1 chấm đỉnh, 2 sổ trái, 3 gập ngang vuốt xuống. ワ: 1 sổ trái, 2 gập ngang vuốt xuống.",
    memoryTipVi:
      "ウ là ngôi nhà có gắn ăng-ten, ワ là ngôi nhà mất ăng-ten, フ là chiếc cờ bay phấp phới.",
    exampleA: { word: "ウェブ", reading: "ウェブ", romaji: "webu", meaningVi: "Trang web (Web)" },
    exampleB: { word: "ワイン", reading: "ワイン", romaji: "wain", meaningVi: "Rượu vang" },
  },
];
