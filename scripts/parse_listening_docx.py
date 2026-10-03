import docx
import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

doc_path = r'c:\Users\Hi\Downloads\Giao_Trinh_Nghe_N5_Bai_1_den_25.docx'
doc = docx.Document(doc_path)

paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

print(f"Total non-empty paragraphs: {len(paragraphs)}")

# Let's group by Lesson
lessons_raw = {}
current_lesson = None
current_section = None

for p in paragraphs:
    m_lesson = re.match(r'^BÀI\s+(\d+)', p, re.IGNORECASE)
    if m_lesson:
        current_lesson = int(m_lesson.group(1))
        lessons_raw[current_lesson] = {'sec1': [], 'sec2': [], 'sec3': []}
        current_section = None
        continue
    
    if current_lesson:
        if 'I. NỘI DUNG BÀI TẬP' in p:
            current_section = 'sec1'
        elif 'II. THIẾT KẾ ẢNH MÀU MỚI THAY THẾ' in p:
            current_section = 'sec2'
        elif 'III. KỊCH BẢN NGHE' in p:
            current_section = 'sec3'
        elif current_section:
            lessons_raw[current_lesson][current_section].append(p)

print(f"Found {len(lessons_raw)} lessons.")
for l_num in sorted(lessons_raw.keys()):
    sec1_cnt = len(lessons_raw[l_num]['sec1'])
    sec2_cnt = len(lessons_raw[l_num]['sec2'])
    sec3_cnt = len(lessons_raw[l_num]['sec3'])
    print(f"Lesson {l_num:02d}: sec1={sec1_cnt} lines, sec2={sec2_cnt} lines, sec3={sec3_cnt} lines")
