import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

from data_reading_part1 import get_n4_reading_data as get_part1_data
from data_reading_part2 import get_part2_data
from data_reading_part3 import get_part3_data
from data_reading_part4 import get_part4_data
from data_reading_part5 import get_part5_data

def assemble():
    all_lessons = []
    p1 = get_part1_data()
    p2 = get_part2_data()
    p3 = get_part3_data()
    p4 = get_part4_data()
    p5 = get_part5_data()

    all_lessons.extend(p1)
    all_lessons.extend(p2)
    all_lessons.extend(p3)
    all_lessons.extend(p4)
    all_lessons.extend(p5)

    print(f"Total lessons: {len(all_lessons)}")
    total_items = sum(len(l["items"]) for l in all_lessons)
    total_questions = sum(len(it.get("questions", [])) for l in all_lessons for it in l["items"])
    total_options = sum(len(q.get("options", [])) for l in all_lessons for it in l["items"] for q in it.get("questions", []))

    print(f"Total Reading Items: {total_items}")
    print(f"Total Questions: {total_questions}")
    print(f"Total Options: {total_options}")

    target_json_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "backend",
        "src",
        "main",
        "resources",
        "data",
        "n4-reading.json"
    )

    with open(target_json_path, "w", encoding="utf-8") as f:
        json.dump(all_lessons, f, ensure_ascii=False, indent=2)

    print(f"Wrote {target_json_path} successfully!")

if __name__ == "__main__":
    assemble()
