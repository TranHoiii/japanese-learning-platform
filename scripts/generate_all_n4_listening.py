import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Import or construct all 25 lessons
from generate_n4_listening_data import get_all_n4_lessons

def main():
    lessons = get_all_n4_lessons()
    print(f"Generated {len(lessons)} lessons.")
    total_items = sum(len(l["items"]) for l in lessons)
    total_questions = sum(sum(len(it["questions"]) for it in l["items"]) for l in lessons)
    total_options = sum(sum(sum(len(q["options"]) for q in it["questions"]) for it in l["items"]) for l in lessons)
    print(f"Total items (tracks): {total_items}")
    print(f"Total questions: {total_questions}")
    print(f"Total options: {total_options}")

    out_path = os.path.join("backend", "src", "main", "resources", "data", "n4-listening.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(lessons, f, ensure_ascii=False, indent=2)
    print(f"Successfully saved to {out_path}")

if __name__ == "__main__":
    main()
