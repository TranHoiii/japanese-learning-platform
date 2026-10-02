import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('backend/src/main/resources/data/n5-listening.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

l1 = data[0]
print(f"Lesson {l1['lessonNumber']}: {len(l1['items'])} items")
for item in l1['items']:
    print(f"\nTitle: {item['title']}")
    print(f"Audio: {item['audioUrl']}")
    print(f"Script: {item['transcript']}")
    for q in item['questions']:
        print(f"  Q: {q['question']}")
        for opt in q['options']:
            print(f"     Opt: {opt['content']} (correct: {opt['correct']})")
