/**
 * Japanese Number Converter Utility
 * Pure TypeScript utility to convert Arabic numbers (0 - 999,999,999)
 * into Japanese Kanji, Hiragana, Romaji, and structural breakdown.
 */

export interface NumberBreakdownPart {
  unitLabel: string;
  arabicPart: string;
  kanji: string;
  hiragana: string;
  romaji: string;
}

export interface ConvertedNumberResult {
  arabic: number;
  westernFormatted: string;
  japaneseFormatted: string;
  kanji: string;
  hiragana: string;
  romaji: string;
  breakdown: NumberBreakdownPart[];
}

const DIGIT_KANJI = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const DIGIT_HIRA = ["", "いち", "に", "さん", "よん", "ご", "ろく", "なな", "はち", "きゅう"];
const DIGIT_ROMAJI = ["", "ichi", "ni", "san", "yon", "go", "roku", "nana", "hachi", "kyuu"];

// Hundreds: 100 to 900
const HUNDREDS: { kanji: string; hira: string; romaji: string }[] = [
  { kanji: "", hira: "", romaji: "" },
  { kanji: "百", hira: "ひゃく", romaji: "hyaku" },
  { kanji: "二百", hira: "にひゃく", romaji: "nihyaku" },
  { kanji: "三百", hira: "さんびゃく", romaji: "sanbyaku" }, // Sound change: byaku
  { kanji: "四百", hira: "よんひゃく", romaji: "yonhyaku" },
  { kanji: "五百", hira: "ごひゃく", romaji: "gohyaku" },
  { kanji: "六百", hira: "ろっぴゃく", romaji: "roppyaku" }, // Sound change: roppyaku
  { kanji: "七百", hira: "ななひゃく", romaji: "nanahyaku" },
  { kanji: "八百", hira: "はっぴゃく", romaji: "happyaku" }, // Sound change: happyaku
  { kanji: "九百", hira: "きゅうひゃく", romaji: "kyuuhyaku" },
];

// Thousands: 1000 to 9000
const THOUSANDS: { kanji: string; hira: string; romaji: string }[] = [
  { kanji: "", hira: "", romaji: "" },
  { kanji: "千", hira: "せん", romaji: "sen" },
  { kanji: "二千", hira: "にせん", romaji: "nisen" },
  { kanji: "三千", hira: "さんぜん", romaji: "sanzen" }, // Sound change: zen
  { kanji: "四千", hira: "よんせん", romaji: "yonsen" },
  { kanji: "五千", hira: "ごせん", romaji: "gosen" },
  { kanji: "六千", hira: "ろくせん", romaji: "rokusen" },
  { kanji: "七千", hira: "ななせん", romaji: "nanasen" },
  { kanji: "八千", hira: "はっせん", romaji: "hassen" }, // Sound change: hassen
  { kanji: "九千", hira: "きゅうせん", romaji: "kyuusen" },
];

/**
 * Converts a 1-4 digit number (0 - 9999) into Japanese components
 */
function convertSub10000(num: number): {
  kanji: string;
  hira: string;
  romaji: string;
  parts: NumberBreakdownPart[];
} {
  if (num === 0) {
    return { kanji: "", hira: "", romaji: "", parts: [] };
  }

  const th = Math.floor(num / 1000);
  const hu = Math.floor((num % 1000) / 100);
  const te = Math.floor((num % 100) / 10);
  const un = num % 10;

  let kanji = "";
  const hiraArr: string[] = [];
  const romajiArr: string[] = [];
  const parts: NumberBreakdownPart[] = [];

  // Thousands
  if (th > 0) {
    kanji += THOUSANDS[th].kanji;
    hiraArr.push(THOUSANDS[th].hira);
    romajiArr.push(THOUSANDS[th].romaji);
    parts.push({
      unitLabel: "Hàng nghìn (千)",
      arabicPart: (th * 1000).toLocaleString("vi-VN"),
      kanji: THOUSANDS[th].kanji,
      hiragana: THOUSANDS[th].hira,
      romaji: THOUSANDS[th].romaji,
    });
  }

  // Hundreds
  if (hu > 0) {
    kanji += HUNDREDS[hu].kanji;
    hiraArr.push(HUNDREDS[hu].hira);
    romajiArr.push(HUNDREDS[hu].romaji);
    parts.push({
      unitLabel: "Hàng trăm (百)",
      arabicPart: (hu * 100).toLocaleString("vi-VN"),
      kanji: HUNDREDS[hu].kanji,
      hiragana: HUNDREDS[hu].hira,
      romaji: HUNDREDS[hu].romaji,
    });
  }

  // Tens
  if (te > 0) {
    const tKanji = te === 1 ? "十" : `${DIGIT_KANJI[te]}十`;
    const tHira = te === 1 ? "じゅう" : `${DIGIT_HIRA[te]}じゅう`;
    const tRomaji = te === 1 ? "juu" : `${DIGIT_ROMAJI[te]}juu`;

    kanji += tKanji;
    hiraArr.push(tHira);
    romajiArr.push(tRomaji);
    parts.push({
      unitLabel: "Hàng chục (十)",
      arabicPart: (te * 10).toLocaleString("vi-VN"),
      kanji: tKanji,
      hiragana: tHira,
      romaji: tRomaji,
    });
  }

  // Units
  if (un > 0) {
    kanji += DIGIT_KANJI[un];
    hiraArr.push(DIGIT_HIRA[un]);
    romajiArr.push(DIGIT_ROMAJI[un]);
    parts.push({
      unitLabel: "Hàng đơn vị",
      arabicPart: un.toString(),
      kanji: DIGIT_KANJI[un],
      hiragana: DIGIT_HIRA[un],
      romaji: DIGIT_ROMAJI[un],
    });
  }

  return {
    kanji,
    hira: hiraArr.join(" "),
    romaji: romajiArr.join(" "),
    parts,
  };
}

/**
 * Main converter: Converts Arabic number (0 - 999,999,999) to full Japanese details.
 */
export function convertArabicToJapanese(num: number): ConvertedNumberResult | null {
  if (isNaN(num) || num < 0 || num > 999999999) {
    return null;
  }

  // Case 0
  if (num === 0) {
    return {
      arabic: 0,
      westernFormatted: "0",
      japaneseFormatted: "0",
      kanji: "零",
      hiragana: "ぜろ (れい)",
      romaji: "zero (rei)",
      breakdown: [
        {
          unitLabel: "Số 0",
          arabicPart: "0",
          kanji: "零",
          hiragana: "ぜろ / れい",
          romaji: "zero / rei",
        },
      ],
    };
  }

  const oku = Math.floor(num / 100000000); // 10^8
  const man = Math.floor((num % 100000000) / 10000); // 10^4
  const rem = num % 10000;

  let fullKanji = "";
  const fullHira: string[] = [];
  const fullRomaji: string[] = [];
  const breakdown: NumberBreakdownPart[] = [];

  // Oku block (億)
  if (oku > 0) {
    const okuSub = convertSub10000(oku);
    const okuPrefixKanji = okuSub.kanji;
    const okuPrefixHira = okuSub.hira;
    const okuPrefixRomaji = okuSub.romaji;

    fullKanji += `${okuPrefixKanji}億`;
    fullHira.push(`${okuPrefixHira}おく`);
    fullRomaji.push(`${okuPrefixRomaji} oku`);
    breakdown.push({
      unitLabel: "Hàng Ức (億: 100.000.000)",
      arabicPart: (oku * 100000000).toLocaleString("vi-VN"),
      kanji: `${okuPrefixKanji}億`,
      hiragana: `${okuPrefixHira}おく`,
      romaji: `${okuPrefixRomaji} oku`,
    });
  }

  // Man block (万)
  if (man > 0) {
    const manSub = convertSub10000(man);
    const manPrefixKanji = manSub.kanji;
    const manPrefixHira = manSub.hira;
    const manPrefixRomaji = manSub.romaji;

    fullKanji += `${manPrefixKanji}万`;
    fullHira.push(`${manPrefixHira}まん`);
    fullRomaji.push(`${manPrefixRomaji} man`);
    breakdown.push({
      unitLabel: "Hàng Vạn (万: 10.000)",
      arabicPart: (man * 10000).toLocaleString("vi-VN"),
      kanji: `${manPrefixKanji}万`,
      hiragana: `${manPrefixHira}まん`,
      romaji: `${manPrefixRomaji} man`,
    });
  }

  // Remainder sub-10000 block
  if (rem > 0) {
    const remSub = convertSub10000(rem);
    fullKanji += remSub.kanji;
    fullHira.push(remSub.hira);
    fullRomaji.push(remSub.romaji);
    breakdown.push(...remSub.parts);
  }

  // Japanese grouping string (e.g. 1億2345万6789)
  let japaneseFormatted = "";
  if (oku > 0) japaneseFormatted += `${oku}億`;
  if (man > 0) japaneseFormatted += `${man}万`;
  if (rem > 0 || (oku === 0 && man === 0)) japaneseFormatted += `${rem}`;

  return {
    arabic: num,
    westernFormatted: num.toLocaleString("vi-VN"),
    japaneseFormatted,
    kanji: fullKanji,
    hiragana: fullHira.join(" "),
    romaji: fullRomaji.join(" "),
    breakdown,
  };
}
