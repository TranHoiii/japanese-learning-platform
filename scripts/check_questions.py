import json

with open('backend/src/main/resources/data/n5-exercise.json', 'r', encoding='utf-8') as f:
    exercises = json.load(f)

results = []
for ex in exercises:
    so = ex['sortOrder']
    title = ex['title']
    l_num = ex.get('lessonNumber')
    for q in ex.get('questions', []):
        q_so = q['sortOrder']
        if l_num in [4, 6, 7, 10, 13, 22, 24]:
            results.append({
                "ex_sortOrder": so,
                "lessonNumber": l_num,
                "q_sortOrder": q_so,
                "has_img_tag": "[IMAGE_REQUIRED]" in q['questionText'],
                "first_line": q['questionText'].split('\n')[0]
            })

with open('scripts/q_summary.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Exported {len(results)} questions summary")
