import docx
import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

doc_path = r'c:\Users\Hi\Downloads\Giao_Trinh_Nghe_N5_Bai_1_den_25.docx'
doc = docx.Document(doc_path)

paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

lessons = {}
current_lesson = None
current_sec = None

for p in paragraphs:
    mL = re.match(r'^BÀI\s+(\d+)', p, re.IGNORECASE)
    if mL:
        current_lesson = int(mL.group(1))
        lessons[current_lesson] = {'sec1': [], 'sec2': [], 'sec3': []}
        current_sec = None
        continue
    
    if current_lesson:
        if 'I. NỘI DUNG BÀI TẬP' in p:
            current_sec = 'sec1'
        elif 'II. THIẾT KẾ ẢNH MÀU MỚI THAY THẾ' in p:
            current_sec = 'sec2'
        elif 'III. KỊCH BẢN NGHE' in p:
            current_sec = 'sec3'
        elif current_sec:
            lessons[current_lesson][current_sec].append(p)

print(f"Total parsed lessons: {len(lessons)}")

for l_num in range(1, 26):
    data = lessons[l_num]
    print(f"\n=================== LESSON {l_num:02d} ===================")
    print("--- SEC 1 (Exercises) ---")
    for line in data['sec1'][:8]:
        print("  ", line)
    print("--- SEC 2 (Image Descriptions) ---")
    for line in data['sec2']:
        print("  ", line)
    print("--- SEC 3 (Scripts) ---")
    for line in data['sec3'][:4]:
        print("  ", line)
