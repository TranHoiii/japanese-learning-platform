import sys
import re
import json
import os
import fitz

sys.stdout.reconfigure(encoding='utf-8')
pdf_path = r'd:\tổng hợp tài liệu N4\Kanji N4.pdf'

unit_configs = [
    (1, 26, '家 族 奥 育 部 屋 室 宅 親 切'.split(), [6, 7, 8]),
    (2, 27, '近 遠 速 早 遅 重 軽 静 緑'.split(), [11, 12, 13]),
    (3, 28, '借 貸 送 客 工 場 自 海 虫'.split(), [15, 16, 17]),
    (4, 29, '当 品 便 利 作 使 起 寝 紙 度'.split(), [19, 20, 21]),
    (5, 30, '住 所 様 主 番 号 交 通 建'.split(), [24, 25, 26]),
    (6, 31, '京 都 県 市 区 村 仕 事 員'.split(), [28, 29, 30]),
    (7, 32, '映 画 図 館 公 園 去 地 池'.split(), [32, 33, 34]),
    (8, 33, '夫 妻 特 思 考 科 料 理 有'.split(), [37, 38, 39]),
    (9, 34, '和 洋 服 衣 毛 糸 注 意 味'.split(), [41, 42, 43]),
    (10, 35, '鉄 乗 降 始 終 開 閉 着 合 止'.split(), [45, 46, 47]),
    (11, 36, '台 風 病 院 医 者 薬 計 全 説 光'.split(), [50, 51, 52, 53]),
    (12, 37, '研 究 発 取 知 歌 飯 麦'.split(), [55, 56, 57]),
    (13, 38, '声 文 化 数 心 旅 世 界'.split(), [59, 60, 61]),
    (14, 39, '集 別 油 皿 若 銀 押 引 代'.split(), [63, 64, 65]),
    (15, 40, '春 夏 秋 冬 空 星 雪 雲'.split(), [67, 68, 69]),
    (16, 41, '動 働 運 練 習 走 歩 泳 急 鳴'.split(), [71, 72, 73, 74]),
    (17, 42, '晴 強 弱 暑 寒 冷 良 悪 太 細'.split(), [76, 77, 78]),
    (18, 43, '写 真 船 堂 頭 顔 首'.split(), [81, 82]),
    (19, 44, '勉 漢 宿 題 質 問 答 洗 濯'.split(), [85, 86, 87]),
    (20, 45, '式 試 験 正 丸 不 同 野 菜'.split(), [89, 90, 91]),
    (21, 46, '政 治 経 済 歴 史 転 回 業 用'.split(), [93, 94, 95])
]

stroke_counts = {
    '家': 10, '族': 11, '奥': 12, '育': 8, '部': 11, '屋': 9, '室': 9, '宅': 6, '親': 16, '切': 4,
    '近': 7, '遠': 13, '速': 10, '早': 6, '遅': 12, '重': 9, '軽': 12, '静': 14, '緑': 14,
    '借': 10, '貸': 12, '送': 9, '客': 9, '工': 3, '場': 12, '自': 6, '海': 9, '虫': 6,
    '当': 6, '品': 9, '便': 9, '利': 7, '作': 7, '使': 8, '起': 10, '寝': 13, '紙': 10, '度': 9,
    '住': 7, '所': 8, '様': 14, '主': 5, '番': 12, '号': 5, '交': 6, '通': 10, '建': 9,
    '京': 8, '都': 11, '県': 9, '市': 5, '区': 4, '村': 7, '仕': 5, '事': 8, '員': 10,
    '映': 9, '画': 8, '図': 7, '館': 16, '公': 4, '園': 13, '去': 5, '地': 6, '池': 6,
    '夫': 4, '妻': 8, '特': 10, '思': 9, '考': 6, '科': 9, '料': 10, '理': 11, '有': 6,
    '和': 8, '洋': 9, '服': 8, '衣': 6, '毛': 4, '糸': 6, '注': 8, '意': 13, '味': 8,
    '鉄': 13, '乗': 9, '降': 10, '始': 8, '終': 11, '開': 12, '閉': 12, '着': 12, '合': 6, '止': 4,
    '台': 5, '風': 9, '病': 10, '院': 10, '医': 7, '者': 8, '薬': 16, '計': 9, '全': 6, '説': 14, '光': 6,
    '研': 9, '究': 7, '発': 9, '取': 8, '知': 8, '歌': 14, '飯': 12, '麦': 7,
    '声': 7, '文': 4, '化': 4, '数': 13, '心': 4, '旅': 10, '世': 5, '界': 9,
    '集': 12, '別': 7, '油': 8, '皿': 5, '若': 8, '銀': 14, '押': 8, '引': 4, '代': 5,
    '春': 9, '夏': 10, '秋': 9, '冬': 5, '空': 8, '星': 9, '雪': 11, '雲': 12,
    '動': 11, '働': 13, '運': 12, '練': 14, '習': 11, '走': 7, '歩': 8, '泳': 8, '急': 9, '鳴': 14,
    '晴': 12, '強': 11, '弱': 10, '暑': 12, '寒': 12, '冷': 7, '良': 7, '悪': 11, '太': 4, '細': 11,
    '写': 5, '真': 10, '船': 11, '堂': 11, '頭': 16, '顔': 18, '首': 9,
    '勉': 10, '漢': 13, '宿': 11, '題': 18, '質': 15, '問': 11, '答': 12, '洗': 9, '濯': 17,
    '式': 6, '試': 13, '験': 18, '正': 5, '丸': 3, '不': 4, '同': 6, '野': 11, '菜': 11,
    '政': 9, '治': 8, '経': 11, '済': 11, '歴': 14, '史': 5, '転': 11, '回': 6, '業': 13, '用': 5
}

def is_exercise_heading(lines, i):
    l = lines[i].strip()
    if l == '練習':
        for j in range(i + 1, min(i + 5, len(lines))):
            if any(k in lines[j] for k in ['もんだい', '問題', '1.', '1．']):
                return True
    return False

def clean_meaning(s):
    s = s.strip()
    if s.startswith('('):
        s = s[1:]
    if s.endswith(')'):
        s = s[:-1]
    return s.strip()

vn_upper_re = re.compile(r'^[A-ZÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ\s/]+$')

def extract_kanjis():
    doc = fitz.open(pdf_path)
    all_kanji_data = []

    for u_num, l_num, expected_ks, pages in unit_configs:
        all_lines = []
        for p in pages:
            lines = [l.strip() for l in doc[p - 1].get_text('text').splitlines() if l.strip()]
            cut_idx = len(lines)
            for i in range(len(lines)):
                if is_exercise_heading(lines, i):
                    cut_idx = i
                    break
            lines = lines[:cut_idx]
            for l in lines:
                if l in ['TRUNG TÂM TIẾNG NHẬT KOSEI', 'HỆ THỐNG ĐÀO TẠO NHẬT NGỮ TOÀN DIỆN HÀNG ĐẦU VIỆT NAM']:
                    continue
                if l.isdigit() and int(l) < 150:
                    continue
                if l.startswith('ユニット'):
                    continue
                all_lines.append(l)

        # Filter out unit header lines
        cleaned_lines = []
        for l in all_lines:
            tokens = l.split()
            if len(tokens) > 1 and set(tokens).issubset(set(expected_ks)):
                continue
            cleaned_lines.append(l)

        # Identify HV lines followed by (meaning)
        hv_indices = []
        i = 0
        while i < len(cleaned_lines):
            line = cleaned_lines[i]
            if vn_upper_re.match(line) and not any(ord(c) > 0x2e80 for c in line) and len(line) <= 25:
                if i + 1 < len(cleaned_lines) and cleaned_lines[i + 1].startswith('('):
                    meaning_parts = [cleaned_lines[i + 1]]
                    j = i + 2
                    while j < len(cleaned_lines) and not meaning_parts[-1].endswith(')'):
                        meaning_parts.append(cleaned_lines[j])
                        j += 1
                    hv_indices.append((i, j))
                    i = j
                    continue
            i += 1

        if len(hv_indices) != len(expected_ks):
            raise ValueError(f'Unit {u_num} mismatch! Expected {len(expected_ks)}, got {len(hv_indices)}')

        last_comp_end = 0
        for k_idx, kanji_char in enumerate(expected_ks):
            start_i, meaning_end = hv_indices[k_idx]
            next_start = hv_indices[k_idx + 1][0] if k_idx + 1 < len(hv_indices) else len(cleaned_lines)

            # Mnemonic lines
            mnemonic_lines = []
            for m_i in range(last_comp_end, start_i):
                l = cleaned_lines[m_i]
                if len(l) == 1 and l in expected_ks:
                    continue
                mnemonic_lines.append(l)

            hv = cleaned_lines[start_i]
            raw_meaning = ' '.join(cleaned_lines[start_i + 1:meaning_end])
            meaning = clean_meaning(raw_meaning)

            # Body lines: readings and compounds
            body_lines = cleaned_lines[meaning_end:next_start]
            kunyomi = []
            onyomi = []
            compounds = []
            mode = None

            this_last_comp_idx = meaning_end
            for b_idx, bl in enumerate(body_lines):
                abs_idx = meaning_end + b_idx
                if len(bl) == 1 and bl in expected_ks:
                    continue
                
                # Check if both ▶ and ▷ on same line
                if '▶' in bl and '▷' in bl:
                    parts = bl.split('▷', 1)
                    kun_part = parts[0].replace('▶', '').strip()
                    on_part = parts[1].strip()
                    if kun_part: kunyomi.append(kun_part)
                    if on_part: onyomi.append(on_part)
                    mode = 'on'
                    continue

                if bl.startswith('▶'):
                    mode = 'kun'
                    rem = bl[1:].strip()
                    if rem:
                        kunyomi.append(rem)
                elif bl.startswith('▷'):
                    mode = 'on'
                    rem = bl[1:].strip()
                    if rem:
                        onyomi.append(rem)
                elif '（' in bl and '）' in bl:
                    mode = 'comp'
                    this_last_comp_idx = abs_idx + 1
                    comps = re.findall(r'(\*?[^\s（）]+)（([^\s（）]+)）', bl)
                    for w, r in comps:
                        w_clean = w.lstrip('*').strip()
                        r_clean = r.strip()
                        compounds.append({
                            'word': w_clean,
                            'reading': r_clean,
                            'meaning': None,
                            'exampleSentence': None
                        })
                elif mode == 'kun':
                    if any(ord(c) >= 0x3040 and ord(c) <= 0x30ff for c in bl):
                        kunyomi.append(bl.strip())
                elif mode == 'on':
                    if any(ord(c) >= 0x3040 and ord(c) <= 0x30ff for c in bl):
                        onyomi.append(bl.strip())

            last_comp_end = this_last_comp_idx

            kun_str = ', '.join([k for k in re.split(r'[\s,]+', ' '.join(kunyomi)) if k]) if kunyomi else None
            on_str = ', '.join([o for o in re.split(r'[\s,]+', ' '.join(onyomi)) if o]) if onyomi else None
            mnem_str = ' '.join(mnemonic_lines).strip() if mnemonic_lines else None

            seen_words = set()
            unique_compounds = []
            for c in compounds:
                key = (c['word'], c['reading'])
                if key not in seen_words:
                    seen_words.add(key)
                    unique_compounds.append(c)

            kanji_code = f'{ord(kanji_char):05x}'
            stroke_url = f'https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/{kanji_code}.svg'
            stroke_cnt = stroke_counts.get(kanji_char)

            item = {
                'kanji': kanji_char,
                'hanViet': hv,
                'onyomi': on_str,
                'kunyomi': kun_str,
                'meaning': meaning,
                'strokeCount': stroke_cnt,
                'strokeOrderUrl': stroke_url,
                'mnemonic': mnem_str,
                'mnemonicImageUrl': None,
                'lessons': [l_num],
                'sortOrder': k_idx + 1,
                'compounds': unique_compounds
            }
            all_kanji_data.append(item)

    return all_kanji_data

def escape_sql(val):
    if val is None:
        return 'NULL'
    escaped = val.replace("'", "''")
    return f"'{escaped}'"

def generate_sql(kanjis):
    sql_lines = [
        "-- V7__add_n4_kanji.sql",
        "-- Thêm 192 chữ Hán tự Kanji N4 từ nguồn Kanji N4.pdf",
        "",
        "-- 1. Đảm bảo Level N4 tồn tại",
        "INSERT INTO levels (code, name, description, sort_order, is_active)",
        "SELECT 'N4', 'N4', 'Trình độ N4 - Sơ trung cấp', 2, TRUE",
        "WHERE NOT EXISTS (SELECT 1 FROM levels WHERE code = 'N4');",
        "",
        "-- 2. Đảm bảo 25 bài học N4 (Bài 26 đến Bài 50) tồn tại"
    ]

    for les in range(26, 51):
        sql_lines.append(
            f"INSERT INTO lessons (level_id, lesson_number, title, sort_order, is_active) "
            f"SELECT l.id, {les}, 'Bài {les}', {les}, TRUE FROM levels l "
            f"WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.id AND lesson_number = {les});"
        )

    sql_lines.append("")
    sql_lines.append("-- 3. Chèn Kanji, Lesson-Kanji mapping và Compounds")

    # Group by lesson
    by_lesson = {}
    for k in kanjis:
        les = k['lessons'][0]
        by_lesson.setdefault(les, []).append(k)

    for les in sorted(by_lesson.keys()):
        items = by_lesson[les]
        sql_lines.append(f"-- ==========================================")
        sql_lines.append(f"-- Bài {les}: {len(items)} chữ Kanji")
        sql_lines.append(f"-- ==========================================")

        for idx, k in enumerate(items, start=1):
            char = k['kanji']
            hv = escape_sql(k['hanViet'])
            on = escape_sql(k['onyomi'])
            kun = escape_sql(k['kunyomi'])
            meaning = escape_sql(k['meaning'])
            stroke_cnt = k['strokeCount'] if k['strokeCount'] is not None else 'NULL'
            stroke_url = escape_sql(k['strokeOrderUrl'])
            mnem = escape_sql(k['mnemonic'])

            # A. Insert kanji (idempotent)
            sql_lines.append(
                f"INSERT INTO kanjis (kanji, han_viet, onyomi, kunyomi, meaning, stroke_count, stroke_order_url, mnemonic) "
                f"SELECT '{char}', {hv}, {on}, {kun}, {meaning}, {stroke_cnt}, {stroke_url}, {mnem} "
                f"WHERE NOT EXISTS (SELECT 1 FROM kanjis WHERE kanji = '{char}');"
            )

            # B. Insert lesson_kanjis mapping
            sql_lines.append(
                f"INSERT INTO lesson_kanjis (lesson_id, kanji_id, sort_order) "
                f"SELECT ls.id, k.id, {idx} "
                f"FROM lessons ls JOIN levels lv ON ls.level_id = lv.id JOIN kanjis k ON k.kanji = '{char}' "
                f"WHERE lv.code = 'N4' AND ls.lesson_number = {les} "
                f"AND NOT EXISTS (SELECT 1 FROM lesson_kanjis lk WHERE lk.lesson_id = ls.id AND lk.kanji_id = k.id);"
            )

            # C. Insert compounds
            for c in k.get('compounds', []):
                word_esc = escape_sql(c['word'])
                read_esc = escape_sql(c['reading'])
                sql_lines.append(
                    f"INSERT INTO kanji_compounds (kanji_id, word, reading, meaning, example_sentence) "
                    f"SELECT k.id, {word_esc}, {read_esc}, NULL, NULL "
                    f"FROM kanjis k WHERE k.kanji = '{char}' "
                    f"AND NOT EXISTS (SELECT 1 FROM kanji_compounds kc WHERE kc.kanji_id = k.id AND kc.word = {word_esc} AND kc.reading = {read_esc});"
                )

        sql_lines.append("")

    return "\n".join(sql_lines)

def main():
    kanjis = extract_kanjis()
    print(f"Extracted {len(kanjis)} kanjis.")

    # Save to backend/src/main/resources/data/n4-kanji.json
    json_path = 'backend/src/main/resources/data/n4-kanji.json'
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(kanjis, f, ensure_ascii=False, indent=2)
    print(f"Saved {json_path}")

    # Generate Flyway migration
    sql_content = generate_sql(kanjis)
    sql_path = 'backend/src/main/resources/db/migration/V7__add_n4_kanji.sql'
    with open(sql_path, 'w', encoding='utf-8') as f:
        f.write(sql_content)
    print(f"Saved {sql_path}")

if __name__ == '__main__':
    main()
