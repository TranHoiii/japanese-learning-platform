import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('backend/src/main/resources/data/n5-listening.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

all_items = []
for lesson in data:
    l_no = lesson['lessonNumber']
    for item in lesson['items']:
        all_items.append((l_no, item))

print(f"Total items in JSON: {len(all_items)}")
for idx, (l_no, item) in enumerate(all_items, 1):
    title = item.get('title', '')
    q_len = len(item.get('questions', []))
    print(f"#{idx:02d} | In Lesson {l_no:02d} | Title: '{title}' | Questions: {q_len}")
