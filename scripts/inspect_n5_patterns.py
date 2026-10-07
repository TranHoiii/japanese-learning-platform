import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('backend/src/main/resources/data/n5-listening.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for g in data[:3]:
    print(f"=== Lesson {g['lessonNumber']} ===")
    for it in g['items']:
        print(f"  Item {it['sortOrder']}: {it['title']}")
        print(f"    Audio: {it['audioUrl']}")
        print(f"    Questions ({len(it['questions'])}):")
        for q in it['questions']:
            opt_str = ", ".join([f"{opt['content']} ({'TRUE' if opt['correct'] else 'FALSE'})" for opt in q['options']])
            print(f"      Q{q['sortOrder']}: {q['question']} | type={q['questionType']} | explanation={q.get('explanation')}")
            print(f"         Options: {opt_str}")
