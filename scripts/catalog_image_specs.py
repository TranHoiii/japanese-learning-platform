import docx
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

doc_path = r'c:\Users\Hi\Downloads\Giao_Trinh_Nghe_N5_Bai_1_den_25.docx'
doc = docx.Document(doc_path)

current_lesson = 0
in_sec2 = False
sec2_data = {}

for p in doc.paragraphs:
    txt = p.text.strip()
    if not txt: continue
    mL = re.match(r'^BÀI\s+(\d+)', txt, re.IGNORECASE)
    if mL:
        current_lesson = int(mL.group(1))
        in_sec2 = False
        continue
    if 'II. THIẾT KẾ ẢNH MÀU MỚI THAY THẾ' in txt:
        in_sec2 = True
        sec2_data[current_lesson] = []
        continue
    if 'III. KỊCH BẢN NGHE' in txt or 'I. NỘI DUNG BÀI TẬP' in txt:
        in_sec2 = False
        continue
    if in_sec2:
        sec2_data[current_lesson].append(txt)

print("IMAGE DESIGN SPECIFICATIONS PER LESSON:")
print("="*80)
total_image_items = 0
for l_num in sorted(sec2_data.keys()):
    lines = sec2_data[l_num]
    print(f"\n--- Lesson {l_num:02d} ({len(lines)} lines) ---")
    for line in lines:
        print("  *", line)
        total_image_items += 1

print(f"\nTotal image description entries: {total_image_items}")
