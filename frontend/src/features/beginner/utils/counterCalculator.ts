/**
 * Japanese Counter Calculator Utility
 * Deterministic calculation and lookup for common counters and sound changes.
 */

export interface CounterOptionDef {
  id: string;
  kanji: string;
  nameVi: string;
  targetObjectsVi: string;
  questionWord: string;
}

export interface CalculatedCounterResult {
  count: number;
  counterId: string;
  kanji: string;
  hiragana: string;
  romaji: string;
  meaningVi: string;
  isIrregular: boolean;
  irregularReasonVi?: string;
  noteVi?: string;
}

export const SUPPORTED_COUNTERS: CounterOptionDef[] = [
  {
    id: "tsu",
    kanji: "つ",
    nameVi: "〜つ (Đồ vật chung 1-10)",
    targetObjectsVi: "Bánh, hoa quả, đồ đạc, câu hỏi, ý kiến khi chưa rõ lượng từ riêng",
    questionWord: "いくつ (Mấy cái?)",
  },
  {
    id: "nin",
    kanji: "人",
    nameVi: "〜人 (Đếm số người)",
    targetObjectsVi: "Con người, bạn bè, thành viên, khách hàng",
    questionWord: "なんにん (Mấy người?)",
  },
  {
    id: "hon",
    kanji: "本",
    nameVi: "〜本 (Vật thon dài / hình trụ)",
    targetObjectsVi: "Bút, chai nước, cây xanh, ô dù, chuối, video/phim",
    questionWord: "なんぼん (Mấy chai/cây?)",
  },
  {
    id: "mai",
    kanji: "枚",
    nameVi: "〜枚 (Vật mỏng / phẳng)",
    targetObjectsVi: "Tờ giấy, vé tàu, áo sơ mi, đĩa CD, tranh ảnh",
    questionWord: "なんまい (Mấy tờ/chiếc?)",
  },
  {
    id: "hiki",
    kanji: "匹",
    nameVi: "〜匹 (Động vật nhỏ, cá, côn trùng)",
    targetObjectsVi: "Chó, mèo, cá vàng, chuột, ếch, côn trùng",
    questionWord: "なんびき (Mấy con?)",
  },
  {
    id: "dai",
    kanji: "台",
    nameVi: "〜台 (Máy móc, xe cộ, đồ điện tử)",
    targetObjectsVi: "Xe ô tô, xe máy, máy vi tính, tivi, máy giặt",
    questionWord: "なんだい (Mấy chiếc/cái?)",
  },
  {
    id: "satsu",
    kanji: "冊",
    nameVi: "〜冊 (Sách, vở, tạp chí)",
    targetObjectsVi: "Sách giáo khoa, tiểu thuyết, tập vở, tạp chí đóng cuốn",
    questionWord: "なんさつ (Mấy cuốn/quyển?)",
  },
  {
    id: "ko",
    kanji: "個",
    nameVi: "〜個 (Vật nhỏ, hình khối, hộp)",
    targetObjectsVi: "Quả trứng, quả táo, cục tẩy, hộp quà, viên kẹo",
    questionWord: "なんこ (Mấy cái/hột/viên?)",
  },
  {
    id: "kai",
    kanji: "回",
    nameVi: "〜回 (Số lần lặp lại)",
    targetObjectsVi: "Lần đi Nhật, lần tập thể dục, lượt chơi game",
    questionWord: "なんかい (Mấy lần?)",
  },
  {
    id: "floor",
    kanji: "階",
    nameVi: "〜階 (Tầng lầu, tầng nhà)",
    targetObjectsVi: "Tầng 1, tầng 2, tầng hầm của tòa nhà",
    questionWord: "なんがい (Tầng mấy?)",
  },
  {
    id: "sai",
    kanji: "歳",
    nameVi: "〜歳 (Đếm số tuổi)",
    targetObjectsVi: "Tuổi tác con người",
    questionWord: "なんさい / おいくつ (Bao nhiêu tuổi?)",
  },
  {
    id: "fun",
    kanji: "分",
    nameVi: "〜分 (Số phút thời gian)",
    targetObjectsVi: "Phút đồng hồ, khoảng thời gian phút",
    questionWord: "なんぷん (Mấy phút?)",
  },
];

// Explicit lookup dictionaries for 1-10
const TSU_MAP: Record<number, { kanji: string; hira: string; romaji: string; note?: string }> = {
  1: { kanji: "一つ", hira: "ひとつ", romaji: "hitotsu", note: "Âm thuần Nhật" },
  2: { kanji: "二つ", hira: "ふたつ", romaji: "futatsu", note: "Âm thuần Nhật" },
  3: { kanji: "三つ", hira: "みっつ", romaji: "mittsu", note: "Âm thuần Nhật (có sokuon)" },
  4: { kanji: "四つ", hira: "よっつ", romaji: "yottsu", note: "Âm thuần Nhật (có sokuon)" },
  5: { kanji: "五つ", hira: "いつつ", romaji: "itsutsu", note: "Âm thuần Nhật" },
  6: { kanji: "六つ", hira: "むっつ", romaji: "muttsu", note: "Âm thuần Nhật (có sokuon)" },
  7: { kanji: "七つ", hira: "ななつ", romaji: "nanatsu", note: "Âm thuần Nhật" },
  8: { kanji: "八つ", hira: "やっつ", romaji: "yattsu", note: "Âm thuần Nhật (có sokuon)" },
  9: { kanji: "九つ", hira: "ここのつ", romaji: "kokonotsu", note: "Âm thuần Nhật" },
  10: { kanji: "十", hira: "とお", romaji: "too", note: "Đặc biệt: không có đuôi つ!" },
};

const NIN_MAP: Record<number, { kanji: string; hira: string; romaji: string; note?: string; irregular: boolean }> = {
  1: { kanji: "一人", hira: "ひとり", romaji: "hitori", note: "Bất quy tắc thuần Nhật", irregular: true },
  2: { kanji: "二人", hira: "ふたり", romaji: "futari", note: "Bất quy tắc thuần Nhật", irregular: true },
  3: { kanji: "三人", hira: "さんにん", romaji: "sannin", irregular: false },
  4: { kanji: "四人", hira: "よにん", romaji: "yonin", note: "Tuyệt đối không đọc shinin (tránh chữ tử)", irregular: true },
  5: { kanji: "五人", hira: "ごにん", romaji: "gonin", irregular: false },
  6: { kanji: "六人", hira: "ろくにん", romaji: "rokunin", irregular: false },
  7: { kanji: "七人", hira: "ななにん / しちにん", romaji: "nananin / shichinin", irregular: false },
  8: { kanji: "八人", hira: "はちにん", romaji: "hachinin", irregular: false },
  9: { kanji: "九人", hira: "きゅうにん / くにん", romaji: "kyuunin / kunin", irregular: false },
  10: { kanji: "十人", hira: "じゅうにん", romaji: "juunin", irregular: false },
  14: { kanji: "十四人", hira: "じゅうよにん", romaji: "juuyonin", note: "Đuôi 4 vẫn là yonin", irregular: true },
};

const HON_MAP: Record<number, { hira: string; romaji: string; soundChange: boolean }> = {
  1: { hira: "いっぽん", romaji: "ippon", soundChange: true },
  2: { hira: "にほん", romaji: "nihon", soundChange: false },
  3: { hira: "さんぼん", romaji: "sanbon", soundChange: true },
  4: { hira: "よんほん", romaji: "yonhon", soundChange: false },
  5: { hira: "ごほん", romaji: "gohon", soundChange: false },
  6: { hira: "ろっぽん", romaji: "roppon", soundChange: true },
  7: { hira: "ななほん", romaji: "nanahon", soundChange: false },
  8: { hira: "はっぽん", romaji: "happon", soundChange: true },
  9: { hira: "きゅうほん", romaji: "kyuuhon", soundChange: false },
  10: { hira: "じゅっぽん", romaji: "juppon", soundChange: true },
};

const HIKI_MAP: Record<number, { hira: string; romaji: string; soundChange: boolean }> = {
  1: { hira: "いっぴき", romaji: "ippiki", soundChange: true },
  2: { hira: "にひき", romaji: "nihiki", soundChange: false },
  3: { hira: "さんびき", romaji: "sanbiki", soundChange: true },
  4: { hira: "よんひき", romaji: "yonhiki", soundChange: false },
  5: { hira: "ごひき", romaji: "gohiki", soundChange: false },
  6: { hira: "ろっぴき", romaji: "roppiki", soundChange: true },
  7: { hira: "ななひき", romaji: "nanahiki", soundChange: false },
  8: { hira: "はっぴき", romaji: "happiki", soundChange: true },
  9: { hira: "きゅうひき", romaji: "kyuuhiki", soundChange: false },
  10: { hira: "じゅっぴき", romaji: "juppiki", soundChange: true },
};

const KO_MAP: Record<number, { hira: string; romaji: string; soundChange: boolean }> = {
  1: { hira: "いっこ", romaji: "ikko", soundChange: true },
  2: { hira: "にこ", romaji: "niko", soundChange: false },
  3: { hira: "さんこ", romaji: "sanko", soundChange: false },
  4: { hira: "よんこ", romaji: "yonko", soundChange: false },
  5: { hira: "ごこ", romaji: "goko", soundChange: false },
  6: { hira: "ろっこ", romaji: "rokko", soundChange: true },
  7: { hira: "ななこ", romaji: "nanako", soundChange: false },
  8: { hira: "はっこ", romaji: "hakko", soundChange: true },
  9: { hira: "きゅうこ", romaji: "kyuuko", soundChange: false },
  10: { hira: "じゅっこ", romaji: "jukko", soundChange: true },
};

const SATSU_MAP: Record<number, { hira: string; romaji: string; soundChange: boolean }> = {
  1: { hira: "いっさつ", romaji: "issatsu", soundChange: true },
  2: { hira: "にさつ", romaji: "nisatsu", soundChange: false },
  3: { hira: "さんさつ", romaji: "sansatsu", soundChange: false },
  4: { hira: "よんさつ", romaji: "yonsatsu", soundChange: false },
  5: { hira: "ごさつ", romaji: "gosatsu", soundChange: false },
  6: { hira: "ろくさつ", romaji: "rokusatsu", soundChange: false },
  7: { hira: "ななさつ", romaji: "nanasatsu", soundChange: false },
  8: { hira: "はっさつ", romaji: "hassatsu", soundChange: true },
  9: { hira: "きゅうさつ", romaji: "kyuusatsu", soundChange: false },
  10: { hira: "じゅっさつ", romaji: "jussatsu", soundChange: true },
};

const KAI_MAP: Record<number, { hira: string; romaji: string; soundChange: boolean }> = {
  1: { hira: "いっかい", romaji: "ikkai", soundChange: true },
  2: { hira: "にかい", romaji: "nikai", soundChange: false },
  3: { hira: "さんかい", romaji: "sankai", soundChange: false },
  4: { hira: "よんかい", romaji: "yonkai", soundChange: false },
  5: { hira: "ごかい", romaji: "gokai", soundChange: false },
  6: { hira: "ろっかい", romaji: "rokkai", soundChange: true },
  7: { hira: "ななかい", romaji: "nanakai", soundChange: false },
  8: { hira: "はっかい", romaji: "hakkai", soundChange: true },
  9: { hira: "きゅうかい", romaji: "kyuukai", soundChange: false },
  10: { hira: "じゅっかい", romaji: "jukkai", soundChange: true },
};

const FLOOR_MAP: Record<number, { hira: string; romaji: string; soundChange: boolean; note?: string }> = {
  1: { hira: "いっかい", romaji: "ikkai", soundChange: true },
  2: { hira: "にかい", romaji: "nikai", soundChange: false },
  3: { hira: "さんがい", romaji: "sangai", soundChange: true, note: "Biến âm đục gai!" },
  4: { hira: "よんかい", romaji: "yonkai", soundChange: false },
  5: { hira: "ごかい", romaji: "gokai", soundChange: false },
  6: { hira: "ろっかい", romaji: "rokkai", soundChange: true },
  7: { hira: "ななかい", romaji: "nanakai", soundChange: false },
  8: { hira: "はっかい", romaji: "hakkai", soundChange: true },
  9: { hira: "きゅうかい", romaji: "kyuukai", soundChange: false },
  10: { hira: "じゅっかい", romaji: "jukkai", soundChange: true },
};

const SAI_MAP: Record<number, { hira: string; romaji: string; soundChange: boolean; note?: string }> = {
  1: { hira: "いっさい", romaji: "issai", soundChange: true },
  2: { hira: "にさい", romaji: "nisai", soundChange: false },
  3: { hira: "さんさい", romaji: "sansai", soundChange: false },
  4: { hira: "よんさい", romaji: "yonsai", soundChange: false },
  5: { hira: "ごさい", romaji: "gosai", soundChange: false },
  6: { hira: "ろくさい", romaji: "rokusai", soundChange: false },
  7: { hira: "ななさい", romaji: "nanasai", soundChange: false },
  8: { hira: "はっさい", romaji: "hassai", soundChange: true },
  9: { hira: "きゅうさい", romaji: "kyuusai", soundChange: false },
  10: { hira: "じゅっさい / じっさい", romaji: "jussai / jissai", soundChange: true },
  20: { hira: "はたち", romaji: "hatachi", soundChange: true, note: "Cách đọc thuần Nhật đặc biệt (20 tuổi trưởng thành)" },
};

const FUN_MAP: Record<number, { hira: string; romaji: string; soundChange: boolean }> = {
  1: { hira: "いっぷん", romaji: "ippun", soundChange: true },
  2: { hira: "にふん", romaji: "nifun", soundChange: false },
  3: { hira: "さんぷん", romaji: "sanpun", soundChange: true },
  4: { hira: "よんぷん", romaji: "yonpun", soundChange: true },
  5: { hira: "ごふん", romaji: "gofun", soundChange: false },
  6: { hira: "ろっぷん", romaji: "roppun", soundChange: true },
  7: { hira: "ななふん", romaji: "nanafun", soundChange: false },
  8: { hira: "はっぷん / はちふん", romaji: "happun / hachifun", soundChange: true },
  9: { hira: "きゅうふん", romaji: "kyuufun", soundChange: false },
  10: { hira: "じゅっぷん / じっぷん", romaji: "juppun / jippun", soundChange: true },
};

/**
 * Calculates a counter expression for a given number and counterId.
 * Supports numbers 1 - 99 for standard counters, and 1-10 for 'tsu'.
 */
export function calculateCounter(count: number, counterId: string): CalculatedCounterResult | null {
  if (isNaN(count) || count < 1 || count > 99) {
    return null;
  }

  // 1. Counter 〜つ
  if (counterId === "tsu") {
    if (count > 10) {
      return {
        count,
        counterId,
        kanji: `${count}`,
        hiragana: `Chỉ dùng cho 1 - 10 cái`,
        romaji: "Not applicable (>10)",
        meaningVi: `Từ 11 cái trở lên, người Nhật dùng số đếm thường (ví dụ: 11 = じゅういち) thay vì dùng đuôi 〜つ.`,
        isIrregular: true,
        irregularReasonVi: "Bộ số 〜つ chỉ tồn tại cho 1 đến 10",
      };
    }
    const item = TSU_MAP[count];
    return {
      count,
      counterId,
      kanji: item.kanji,
      hiragana: item.hira,
      romaji: item.romaji,
      meaningVi: `${count} cái (đồ vật chung)`,
      isIrregular: true,
      irregularReasonVi: "Bộ từ thuần Nhật",
      noteVi: item.note,
    };
  }

  // 2. Counter 〜人
  if (counterId === "nin") {
    if (count <= 10 || count === 14) {
      const item = NIN_MAP[count];
      if (item) {
        return {
          count,
          counterId,
          kanji: item.kanji,
          hiragana: item.hira,
          romaji: item.romaji,
          meaningVi: `${count} người`,
          isIrregular: item.irregular,
          irregularReasonVi: item.note,
          noteVi: item.note,
        };
      }
    }
    // Beyond 10
    const tens = Math.floor(count / 10);
    const ones = count % 10;
    const tenHira = tens === 1 ? "じゅう" : `${DIGIT_HIRA_MAP[tens]}じゅう`;
    const tenKanji = tens === 1 ? "十" : `${DIGIT_KANJI_MAP[tens]}十`;

    if (ones === 0) {
      return {
        count,
        counterId,
        kanji: `${tenKanji}人`,
        hiragana: `${tenHira}にん`,
        romaji: "juunin",
        meaningVi: `${count} người`,
        isIrregular: false,
      };
    }
    if (ones === 4) {
      return {
        count,
        counterId,
        kanji: `${tenKanji}四人`,
        hiragana: `${tenHira}よにん`,
        romaji: `${tens === 1 ? "juu" : "nijuu"}yonin`,
        meaningVi: `${count} người (đuôi 4 luôn là yonin)`,
        isIrregular: true,
        irregularReasonVi: "Đuôi 4 đọc là yonin để tránh chữ tử",
      };
    }
    // Standard ones
    const onesHira = DIGIT_HIRA_MAP[ones];
    const onesKanji = DIGIT_KANJI_MAP[ones];
    return {
      count,
      counterId,
      kanji: `${tenKanji}${onesKanji}人`,
      hiragana: `${tenHira}${onesHira}にん`,
      romaji: `${tenHira}${onesHira}nin`,
      meaningVi: `${count} người`,
      isIrregular: false,
    };
  }

  // 3. Counter 〜本
  if (counterId === "hon") {
    if (count <= 10) {
      const item = HON_MAP[count];
      return {
        count,
        counterId,
        kanji: `${DIGIT_KANJI_MAP[count]}本`,
        hiragana: item.hira,
        romaji: item.romaji,
        meaningVi: `${count} cây / chai / thanh (vật thon dài)`,
        isIrregular: item.soundChange,
        irregularReasonVi: item.soundChange ? "Biến âm đặc trưng (hon / bon / pon)" : undefined,
      };
    }
  }

  // 4. Counter 〜枚
  if (counterId === "mai") {
    const HIRA_MAI: Record<number, string> = {
      1: "いちまい", 2: "にまい", 3: "さんまい", 4: "よんまい", 5: "ごまい",
      6: "ろくまい", 7: "ななまい", 8: "はちまい", 9: "きゅうまい", 10: "じゅうまい",
    };
    if (count <= 10) {
      return {
        count,
        counterId,
        kanji: `${DIGIT_KANJI_MAP[count]}枚`,
        hiragana: HIRA_MAI[count],
        romaji: `${HIRA_MAI[count].replace("まい", "mai")}`,
        meaningVi: `${count} tờ / tấm / chiếc (vật mỏng phẳng)`,
        isIrregular: false,
      };
    }
  }

  // 5. Counter 〜匹
  if (counterId === "hiki") {
    if (count <= 10) {
      const item = HIKI_MAP[count];
      return {
        count,
        counterId,
        kanji: `${DIGIT_KANJI_MAP[count]}匹`,
        hiragana: item.hira,
        romaji: item.romaji,
        meaningVi: `${count} con (động vật nhỏ)`,
        isIrregular: item.soundChange,
        irregularReasonVi: item.soundChange ? "Biến âm đặc trưng (hiki / biki / piki)" : undefined,
      };
    }
  }

  // 6. Counter 〜台
  if (counterId === "dai") {
    const HIRA_DAI: Record<number, string> = {
      1: "いちだい", 2: "にだい", 3: "さんだい", 4: "よんだい", 5: "ごだい",
      6: "ろくだい", 7: "ななだい", 8: "はちだい", 9: "きゅうだい", 10: "じゅうだい",
    };
    if (count <= 10) {
      return {
        count,
        counterId,
        kanji: `${DIGIT_KANJI_MAP[count]}台`,
        hiragana: HIRA_DAI[count],
        romaji: `${HIRA_DAI[count].replace("だい", "dai")}`,
        meaningVi: `${count} chiếc / cái (máy móc, xe cộ)`,
        isIrregular: false,
      };
    }
  }

  // 7. Counter 〜冊
  if (counterId === "satsu") {
    if (count <= 10) {
      const item = SATSU_MAP[count];
      return {
        count,
        counterId,
        kanji: `${DIGIT_KANJI_MAP[count]}冊`,
        hiragana: item.hira,
        romaji: item.romaji,
        meaningVi: `${count} quyển / cuốn (sách, vở)`,
        isIrregular: item.soundChange,
        irregularReasonVi: item.soundChange ? "Biến âm sokuon (issatsu, hassatsu, jussatsu)" : undefined,
      };
    }
  }

  // 8. Counter 〜個
  if (counterId === "ko") {
    if (count <= 10) {
      const item = KO_MAP[count];
      return {
        count,
        counterId,
        kanji: `${DIGIT_KANJI_MAP[count]}個`,
        hiragana: item.hira,
        romaji: item.romaji,
        meaningVi: `${count} cái / quả / cục (đồ vật nhỏ)`,
        isIrregular: item.soundChange,
        irregularReasonVi: item.soundChange ? "Biến âm sokuon (ikko, rokko, hakko, jukko)" : undefined,
      };
    }
  }

  // 9. Counter 〜回
  if (counterId === "kai") {
    if (count <= 10) {
      const item = KAI_MAP[count];
      return {
        count,
        counterId,
        kanji: `${DIGIT_KANJI_MAP[count]}回`,
        hiragana: item.hira,
        romaji: item.romaji,
        meaningVi: `${count} lần (số lần)`,
        isIrregular: item.soundChange,
        irregularReasonVi: item.soundChange ? "Biến âm sokuon (ikkai, rokkai, hakkai, jukkai)" : undefined,
      };
    }
  }

  // 10. Counter 〜階
  if (counterId === "floor") {
    if (count <= 10) {
      const item = FLOOR_MAP[count];
      return {
        count,
        counterId,
        kanji: `${DIGIT_KANJI_MAP[count]}階`,
        hiragana: item.hira,
        romaji: item.romaji,
        meaningVi: `Tầng ${count} (tầng nhà)`,
        isIrregular: item.soundChange,
        irregularReasonVi: item.soundChange ? "Biến âm (ikkai, sangai, rokkai...)" : undefined,
        noteVi: item.note,
      };
    }
  }

  // 11. Counter 〜歳
  if (counterId === "sai") {
    if (count <= 10 || count === 20) {
      const item = SAI_MAP[count];
      if (item) {
        return {
          count,
          counterId,
          kanji: count === 20 ? "二十歳" : `${DIGIT_KANJI_MAP[count]}歳`,
          hiragana: item.hira,
          romaji: item.romaji,
          meaningVi: `${count} tuổi`,
          isIrregular: item.soundChange,
          irregularReasonVi: item.soundChange ? "Biến âm sokuon (issai, hassai...) hoặc Hatachi" : undefined,
          noteVi: item.note,
        };
      }
    }
  }

  // 12. Counter 〜分
  if (counterId === "fun") {
    if (count <= 10) {
      const item = FUN_MAP[count];
      return {
        count,
        counterId,
        kanji: `${DIGIT_KANJI_MAP[count]}分`,
        hiragana: item.hira,
        romaji: item.romaji,
        meaningVi: `${count} phút`,
        isIrregular: item.soundChange,
        irregularReasonVi: item.soundChange ? "Biến âm (fun / pun)" : undefined,
      };
    }
  }

  // For numbers > 10 without explicit map, provide structured generic message
  return {
    count,
    counterId,
    kanji: `${count}`,
    hiragana: `Được ghép từ hàng chục + hàng đơn vị`,
    romaji: `${count}`,
    meaningVi: `Với số ${count}, người Nhật kết hợp hàng chục và số đơn vị theo quy tắc ghép chuẩn. Hãy tra cứu số đơn vị tương ứng (1-10) ở bảng bên dưới.`,
    isIrregular: false,
  };
}

const DIGIT_KANJI_MAP: Record<number, string> = {
  1: "一", 2: "二", 3: "三", 4: "四", 5: "五",
  6: "六", 7: "七", 8: "八", 9: "九", 10: "十",
};

const DIGIT_HIRA_MAP: Record<number, string> = {
  1: "いち", 2: "に", 3: "さん", 4: "よん", 5: "ご",
  6: "ろく", 7: "なな", 8: "はち", 9: "きゅう",
};
