import sys
import os
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

try:
    import pdfplumber
except ImportError:
    print("pdfplumber is required. Installing...")
    os.system("pip install pdfplumber")
    import pdfplumber

PDF_PATH = os.path.join(os.path.dirname(__file__), '..', 'từ vựng N5 theo bài.pdf')
OUTPUT_JSON_BACKEND = os.path.join(os.path.dirname(__file__), '..', 'backend', 'src', 'main', 'resources', 'data', 'n5-vocabulary.json')

def extract_vocab_from_row(row):
    cleaned = []
    for c in row:
        if c is None:
            cleaned.append('')
        else:
            c_str = re.sub(r'\s+', ' ', str(c)).strip()
            cleaned.append(c_str)
            
    non_empty = [c for c in cleaned if c != '']
    if not non_empty:
        return None
        
    combined = ' '.join(non_empty)
    if any(h in combined for h in ['HIRAGANA', 'HÁN VIỆT', 'Ý NGHĨA', 'TRUNG TÂM TIẾNG NHẬT', 'HỆ THỐNG ĐÀO TẠO']):
        return None
    if combined.startswith('〈〈') or combined in ['〈練習Ｃ〉', '〈会話〉', '〈〈練練習習ＣＣ〉〉', '〈〈会会話話〉〉']:
        return None
        
    length = len(cleaned)
    if length == 4:
        hiragana, kanji, han_viet, meaning = cleaned[0], cleaned[1], cleaned[2], cleaned[3]
    elif length == 6:
        hiragana = cleaned[0]
        kanji = cleaned[2] if cleaned[2] else (cleaned[1] if cleaned[1] else None)
        han_viet = cleaned[3]
        meaning = cleaned[4]
    elif length == 8:
        hiragana = cleaned[0]
        kanji = cleaned[3]
        han_viet = cleaned[4]
        meaning = cleaned[5]
    else:
        hiragana = non_empty[0]
        meaning = non_empty[-1]
        kanji = None
        han_viet = None
        if len(non_empty) == 3:
            if non_empty[1].isupper():
                han_viet = non_empty[1]
            else:
                kanji = non_empty[1]
        elif len(non_empty) >= 4:
            kanji = non_empty[1]
            han_viet = non_empty[2]
            meaning = non_empty[3]

    hiragana = hiragana if hiragana else None
    kanji = kanji if kanji else None
    han_viet = han_viet if han_viet else None
    meaning = meaning if meaning else None

    if hiragana == '': hiragana = None
    if kanji == '': kanji = None
    if han_viet == '': han_viet = None
    if meaning == '': meaning = None

    if not hiragana or not meaning:
        return None

    return {
        'hiragana': hiragana,
        'kanji': kanji,
        'hanViet': han_viet,
        'meaning': meaning
    }

def run_extraction():
    if not os.path.exists(PDF_PATH):
        print(f"Error: File not found at {PDF_PATH}")
        sys.exit(1)

    print(f"Opening PDF: {PDF_PATH}")
    lessons_data = []
    current_lesson_num = None
    current_vocab_list = []

    with pdfplumber.open(PDF_PATH) as pdf:
        for page_idx, page in enumerate(pdf.pages):
            text = page.extract_text() or ''
            lesson_match = re.search(r'第\s*(\d+)\s*課', text)
            
            if lesson_match:
                new_num = int(lesson_match.group(1))
                if current_lesson_num is not None and new_num != current_lesson_num:
                    if current_vocab_list:
                        lessons_data.append({
                            'lessonNumber': current_lesson_num,
                            'title': f"Bài {current_lesson_num:02d}",
                            'vocabularies': current_vocab_list
                        })
                        current_vocab_list = []
                current_lesson_num = new_num

            tables = page.extract_tables()
            if not tables or current_lesson_num is None:
                continue

            for t in tables:
                for row in t:
                    res = extract_vocab_from_row(row)
                    if res:
                        current_vocab_list.append(res)

        if current_lesson_num is not None and current_vocab_list:
            lessons_data.append({
                'lessonNumber': current_lesson_num,
                'title': f"Bài {current_lesson_num:02d}",
                'vocabularies': current_vocab_list
            })

    os.makedirs(os.path.dirname(OUTPUT_JSON_BACKEND), exist_ok=True)
    with open(OUTPUT_JSON_BACKEND, 'w', encoding='utf-8') as f:
        json.dump({
            'levelCode': 'N5',
            'levelName': 'N5',
            'levelDescription': 'Trình độ N5 - Nhập môn tiếng Nhật',
            'lessons': lessons_data
        }, f, ensure_ascii=False, indent=2)

    total_vocab = sum(len(l['vocabularies']) for l in lessons_data)
    print(f"Successfully extracted {len(lessons_data)} lessons and {total_vocab} vocabularies.")
    print(f"Saved to: {OUTPUT_JSON_BACKEND}")

if __name__ == '__main__':
    run_extraction()
