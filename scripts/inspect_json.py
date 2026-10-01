import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('backend/src/main/resources/data/n5-listening.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for lesson in data:
    l_no = lesson['lessonNumber']
    items = lesson['items']
    print(f"Lesson {l_no:02d} (total {len(items)} items):")
    for idx, item in enumerate(items, 1):
        title = item.get('title', '')
        audio = item.get('audioUrl', '')
        print(f"   [{idx}] title='{title}', audio='{audio}'")
