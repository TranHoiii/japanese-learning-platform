import os
import sys
import json
import re
import unicodedata
import pdfplumber

sys.stdout.reconfigure(encoding='utf-8')

files = os.listdir(r'd:\tổng hợp tài liệu N4')
target = [f for f in files if 'vu' in unicodedata.normalize('NFD', f).lower()][0]
pdf_path = os.path.join(r'd:\tổng hợp tài liệu N4', target)

print("PDF Path:", pdf_path)

def clean_cell(c):
    if c is None:
        return ""
    return re.sub(r'[ \t]+', ' ', str(c)).strip()

with pdfplumber.open(pdf_path) as pdf:
    total_pages = len(pdf.pages)
    print(f"Total pages: {total_pages}")
    
    lesson_pages = {}
    table_stats = []
    
    for idx, page in enumerate(pdf.pages):
        text = page.extract_text() or ""
        tables = page.extract_tables()
        
        # Look for lesson header
        matches = re.findall(r'第\s*(\d+)\s*課', text)
        if matches:
            for m in matches:
                lesson_pages[int(m)] = idx + 1
        
        table_stats.append({
            'page': idx + 1,
            'tables_count': len(tables),
            'rows_count': sum(len(t) for t in tables) if tables else 0,
            'lesson_headers': matches
        })

print("\n--- Lesson Headers Detected ---")
for l_num in sorted(lesson_pages.keys()):
    print(f"Lesson {l_num}: First seen on Page {lesson_pages[l_num]}")

print(f"\nTotal lessons detected: {len(lesson_pages)}")
