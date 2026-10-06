import sys
import re
import json
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
    '台': 5, '风': 9, '風': 9, '病': 10, '院': 10, '医': 7, '者': 8, '药': 16, '薬': 16, '計': 9, '全': 6, '説': 14, '光': 6,
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

vn_upper_re = re.compile(r'^[A-ZÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ\s/]+$')

def extract_all():
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

        # Filter out lines that are unit header lines with multiple expected kanji
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
            print(f'ERROR: Unit {u_num} mismatch! Expected {len(expected_ks)}, got {len(hv_indices)}')
            return None

        last_comp_end = 0
        for k_idx, kanji_char in enumerate(expected_ks):
            start_i, meaning_end = hv_indices[k_idx]
            next_start = hv_indices[k_idx + 1][0] if k_idx + 1 < len(hv_indices) else len(cleaned_lines)

            # Mnemonic: lines between last_comp_end and start_i
            mnemonic_lines = []
            for m_i in range(last_comp_end, start_i):
                l = cleaned_lines[m_i]
                if len(l) == 1 and l in expected_ks:
                    continue
                mnemonic_lines.append(l)

            hv = cleaned_lines[start_i]
            meaning_str = ' '.join(cleaned_lines[start_i + 1:meaning_end])
            meaning = meaning_str.strip('() ')

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

            # Deduplicate compounds preserving order
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
                'lessons': [l_num],
                'compounds': unique_compounds
            }
            all_kanji_data.append(item)

    print(f'Successfully extracted all {len(all_kanji_data)} Kanji!')
    return all_kanji_data

if __name__ == '__main__':
    data = extract_all()
    if data:
        with open('scripts/extracted_n4_kanji.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print('Saved to scripts/extracted_n4_kanji.json')
