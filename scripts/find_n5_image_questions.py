import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('backend/src/main/resources/data/n5-exercise.json', encoding='utf-8') as f:
    n5 = json.load(f)

print(f"Total exercises in N5: {len(n5)}")
image_questions = []

for ex in n5:
    for q in ex.get('questions', []):
        qt = q.get('questionText', '')
        if 'IMAGE' in qt or 'hình' in qt.lower() or 'ảnh' in qt.lower() or 'tranh' in qt.lower():
            image_questions.append((ex['sortOrder'], ex['title'], ex['lessonNumber'], q['sortOrder'], qt))

print(f"Total image questions found: {len(image_questions)}")
for so, title, les, qso, qt in image_questions:
    first_line = qt.split('\n')[0]
    print(f"Exercise sortOrder {so:2d} ({title}, Lesson {les}), Q{qso}: {first_line}")
