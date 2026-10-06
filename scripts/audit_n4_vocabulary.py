import os
import sys
import json
import re
import unicodedata
import pdfplumber

sys.stdout.reconfigure(encoding='utf-8')
sys.path.append(os.path.dirname(__file__))
from extract_n4_vocabulary import extract_vocab_from_row, PDF_PATH

lessons = {}
current_lesson = None

with pdfplumber.open(PDF_PATH) as pdf:
    for page_idx, page in enumerate(pdf.pages):
        page_num = page_idx + 1
        text = page.extract_text() or ""
        matches = re.findall(r'第\s*(\d+)\s*課', text)
        if matches:
            current_lesson = int(matches[0])
            if current_lesson not in lessons:
                lessons[current_lesson] = []
        
        tables = page.extract_tables()
        if not tables:
            continue
            
        for table in tables:
            for row in table:
                vocab = extract_vocab_from_row(row)
                if vocab:
                    vocab['page'] = page_num
                    lessons[current_lesson].append(vocab)

total_vocab = sum(len(v) for v in lessons.values())
missing_kanji = 0
missing_han_viet = 0
missing_hiragana = 0
missing_meaning = 0

all_items = []
exact_duplicates = []
seen_exact = set()
key_to_items = {}

for l_num, items in lessons.items():
    for idx, item in enumerate(items):
        item['lesson'] = l_num
        item['order_in_lesson'] = idx + 1
        all_items.append(item)
        
        if not item['kanji']:
            missing_kanji += 1
        if not item['hanViet']:
            missing_han_viet += 1
        if not item['hiragana']:
            missing_hiragana += 1
        if not item['meaning']:
            missing_meaning += 1
            
        exact_key = (l_num, item['hiragana'], item['kanji'], item['hanViet'], item['meaning'])
        if exact_key in seen_exact:
            exact_duplicates.append(item)
        else:
            seen_exact.add(exact_key)
            
        cross_key = (item['hiragana'], item['kanji'])
        if cross_key not in key_to_items:
            key_to_items[cross_key] = []
        key_to_items[cross_key].append(item)

potential_dupes = {k: v for k, v in key_to_items.items() if len(v) > 1}

print("=== N4 VOCABULARY AUDIT ===")
print(f"Total Lessons: {len(lessons)}")
print(f"Total Vocabularies: {total_vocab}")
print(f"Missing Hiragana: {missing_hiragana}")
print(f"Missing Meaning: {missing_meaning}")
print(f"Missing Kanji: {missing_kanji}")
print(f"Missing Hán Việt: {missing_han_viet}")
print(f"Exact Duplicates (same lesson, identical all fields): {len(exact_duplicates)}")
print(f"Potential cross-lesson or same-word duplicates (same hiragana + kanji): {len(potential_dupes)}")
