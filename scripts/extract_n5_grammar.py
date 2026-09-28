import sys
import os
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

try:
    import pypdf
except ImportError:
    os.system("pip install pypdf")
    import pypdf

PDF_PATH = r'D:\tổng hợp tài liệu N5\ngữ pháp N5 theo bài.pdf'
OUTPUT_JSON_BACKEND = os.path.join(os.path.dirname(__file__), '..', 'backend', 'src', 'main', 'resources', 'data', 'n5-grammar.json')

def clean(s):
    if not s: return ""
    return re.sub(r'\s+', ' ', str(s)).strip()

def is_furigana_line(s):
    words = s.split()
    if not words: return False
    return all(all(0x3040 <= ord(c) <= 0x309F for c in w) for w in words) and len(words) >= 1

def is_japanese(s):
    if not any(ord(c) > 0x3000 for c in s):
        return False
    if is_furigana_line(s):
        return False
    return True

def is_vietnamese(s):
    if not s: return False
    if any(ord(c) > 0x3000 for c in s): return False
    v_chars = 'àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ'
    s_lower = s.lower()
    return any(c in v_chars for c in s_lower)

def parse_pdf():
    reader = pypdf.PdfReader(PDF_PATH)
    lessons = []
    current_lesson_num = None
    current_grammars = []

    for page_idx in range(len(reader.pages)):
        if page_idx == 140: # skip last closing page
            continue

        page = reader.pages[page_idx]
        text = page.extract_text() or ''
        lines = [clean(l) for l in text.split('\n') if clean(l)]
        filtered = [l for l in lines if 'TRUNG TÂM TIẾNG NHẬT' not in l and 'koseionline' not in l and '096 602' not in l]

        # Check for Lesson Header Page
        lesson_match = re.search(r'第\s*([０１２３４５６７８９0-9]+)\s*課', text)
        if lesson_match:
            raw_num = lesson_match.group(1)
            num = int(raw_num.translate(str.maketrans('０１２３４５６７８９', '0123456789')))
            if current_lesson_num is not None and current_grammars:
                lessons.append({
                    'lessonNumber': current_lesson_num,
                    'title': f'Bài {current_lesson_num:02d}',
                    'grammars': current_grammars
                })
                current_grammars = []
            current_lesson_num = num
            continue

        if current_lesson_num is None or not filtered:
            continue

        header_pattern = filtered[0]

        meaning = None
        usage_lines = []
        explanation_lines = []
        
        examples_raw = []
        furigana_stack = []

        for line in filtered[1:]:
            # Check for furigana line
            if is_furigana_line(line):
                furigana_stack.append(line)
                continue

            # Check for explanation notes
            if line.startswith('「') or line.startswith('・') or line.startswith('•') or 'Trợ từ' in line or 'Là thể' in line or 'Đuôi câu' in line or 'Dùng để' in line or 'Có thể' in line or 'Cách' in line or 'Trong văn' in line or 'Mẫu câu' in line or 'Từ để hỏi' in line or 'Lưu ý' in line:
                explanation_lines.append(line)
                continue

            # Check for usage / formula line
            if ('N1' in line or 'N2' in line or 'N ' in line or 'V' in line or 'A' in line or '＋' in line or '〜' in line or '～' in line) and is_japanese(line) and not line.startswith('A：') and not line.startswith('B：') and not line.startswith('A:') and not line.startswith('B:'):
                usage_lines.append(line)
                continue

            # Check for formula meaning summary line (e.g. N1 là N2..., ... là A hay là B?)
            if is_vietnamese(line) and meaning is None and ('N1' in line or 'N2' in line or 'N ' in line or 'câu' in line or 'thì' in line or 'khẳng định' in line or 'phủ định' in line or 'phải không' in line or 'làm V' in line or 'trực thuộc' in line or 'tương đồng' in line):
                meaning = line
                continue

            # Check for example Japanese sentence
            if is_japanese(line):
                f_str = " ".join(furigana_stack) if furigana_stack else None
                furigana_stack = []
                examples_raw.append({
                    'japanese': line,
                    'furigana': f_str,
                    'translation': None
                })
                continue

            # Check for example Vietnamese translation
            if is_vietnamese(line):
                if examples_raw and examples_raw[-1]['translation'] is None:
                    examples_raw[-1]['translation'] = line
                elif meaning is None:
                    meaning = line

        usage_str = "\n".join(usage_lines) if usage_lines else None
        explanation_str = "\n".join(explanation_lines) if explanation_lines else None

        final_examples = []
        for idx, ex in enumerate(examples_raw):
            if ex['japanese']:
                final_examples.append({
                    'japanese': ex['japanese'],
                    'furigana': ex['furigana'],
                    'translation': ex['translation'] if ex['translation'] else "Ví dụ trong tài liệu",
                    'explanation': None,
                    'sortOrder': idx + 1
                })

        current_grammars.append({
            'pattern': header_pattern,
            'meaning': meaning if meaning else header_pattern,
            'usage': usage_str,
            'explanation': explanation_str,
            'notes': None,
            'sortOrder': len(current_grammars) + 1,
            'examples': final_examples
        })

    if current_lesson_num is not None and current_grammars:
        lessons.append({
            'lessonNumber': current_lesson_num,
            'title': f'Bài {current_lesson_num:02d}',
            'grammars': current_grammars
        })

    return lessons

def run():
    print("Parsing N5 Grammar PDF...")
    lessons = parse_pdf()
    
    total_grammars = sum(len(l['grammars']) for l in lessons)
    total_examples = sum(sum(len(g['examples']) for g in l['grammars']) for l in lessons)

    payload = {
        'levelCode': 'N5',
        'levelName': 'N5',
        'levelDescription': 'Trình độ N5 - Nhập môn tiếng Nhật',
        'lessons': lessons
    }

    os.makedirs(os.path.dirname(OUTPUT_JSON_BACKEND), exist_ok=True)
    with open(OUTPUT_JSON_BACKEND, 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print("Success!")
    print(f"Total Lessons: {len(lessons)}")
    print(f"Total Grammar Patterns: {total_grammars}")
    print(f"Total Grammar Examples: {total_examples}")
    print(f"Saved to: {OUTPUT_JSON_BACKEND}")

if __name__ == '__main__':
    run()
