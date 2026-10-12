import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

def audit():
    path = os.path.join(os.path.dirname(__file__), "..", "backend", "src", "main", "resources", "data", "n4-exercise.json")
    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    print(f"Total exercises: {len(data)}")
    total_q = 0
    lesson_dist = {}
    for ex in data:
        q_count = len(ex["questions"])
        total_q += q_count
        l = ex["lessonNumber"]
        lesson_dist[l] = lesson_dist.get(l, 0) + 1
        print(f"Order {ex['sortOrder']:2d} | Lesson {ex['lessonNumber']:2d} | {ex['title']} | Questions: {q_count}")
        for q in ex["questions"]:
            if not q["explanation"]:
                print(f"  WARNING: Question {q['sortOrder']} in {ex['title']} has empty explanation!")
            if not q["questionText"]:
                print(f"  WARNING: Question {q['sortOrder']} in {ex['title']} has empty questionText!")

    print(f"\nTotal questions: {total_q}")
    print(f"Lessons covered: {sorted(lesson_dist.keys())}")
    print(f"Min lesson: {min(lesson_dist.keys())}, Max lesson: {max(lesson_dist.keys())}")

if __name__ == "__main__":
    audit()
