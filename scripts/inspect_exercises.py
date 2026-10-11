import sys
import json
import pypdf

sys.stdout.reconfigure(encoding='utf-8')

with open('backend/src/main/resources/data/n5-exercise.json', encoding='utf-8') as f:
    n5 = json.load(f)
with open('backend/src/main/resources/data/n4-exercise.json', encoding='utf-8') as f:
    n4 = json.load(f)

print('N5 total exercises:', len(n5))
for ex in n5:
    print(f"N5 - sortOrder: {ex.get('sortOrder')}, lesson: {ex.get('lessonNumber')}, title: {ex.get('title')}, type: {ex.get('exerciseType')}, q_count: {len(ex.get('questions', []))}")

print('\nN4 total exercises:', len(n4))
for ex in n4:
    print(f"N4 - sortOrder: {ex.get('sortOrder')}, lesson: {ex.get('lessonNumber')}, title: {ex.get('title')}, type: {ex.get('exerciseType')}, q_count: {len(ex.get('questions', []))}")

pdf_path = r'd:\tổng hợp tài liệu N5\Sách Bài tập ngữ pháp - Tập 1.pdf'
reader = pypdf.PdfReader(pdf_path)
print(f'\nPDF Total pages: {len(reader.pages)}')
for i in range(min(10, len(reader.pages))):
    text = reader.pages[i].extract_text() or ''
    first_lines = text.split('\n')[:5]
    print(f"Page {i+1}: {first_lines}")
