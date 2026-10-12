import sys
import json
import fitz

sys.stdout.reconfigure(encoding='utf-8')

with open('backend/src/main/resources/data/n5-exercise.json', encoding='utf-8') as f:
    n5 = json.load(f)

doc = fitz.open(r'd:\tổng hợp tài liệu N5\Sách Bài tập ngữ pháp - Tập 1.pdf')

print(f"Total exercises in n5-exercise.json: {len(n5)}")
for ex in n5:
    q_types = [q['questionType'] for q in ex['questions']]
    print(f"SortOrder {ex['sortOrder']:2d} | Lesson {ex['lessonNumber']:2d} | {ex['title']:20s} | Questions: {len(ex['questions']):2d} | Types: {set(q_types)}")
