import json
import os
import sys

# Add scripts directory to path to import part scripts
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from data_exercise_part1 import get_part1_data
from data_exercise_part2 import get_part2_data
from data_exercise_part3 import get_part3_data
from data_exercise_part4 import get_part4_data
from data_exercise_part5 import get_part5_data
from data_exercise_part6 import get_part6_data

def assemble():
    all_exercises = []
    all_exercises.extend(get_part1_data())
    all_exercises.extend(get_part2_data())
    all_exercises.extend(get_part3_data())
    all_exercises.extend(get_part4_data())
    all_exercises.extend(get_part5_data())
    all_exercises.extend(get_part6_data())

    print(f"Total exercises assembled: {len(all_exercises)}")
    total_questions = sum(len(ex["questions"]) for ex in all_exercises)
    print(f"Total questions: {total_questions}")

    # Integrity verification
    sort_orders = [ex["sortOrder"] for ex in all_exercises]
    assert len(sort_orders) == len(set(sort_orders)), f"Duplicate sort orders found: {sort_orders}"
    expected_sort_orders = list(range(28, 28 + len(all_exercises)))
    assert sort_orders == expected_sort_orders, f"Sort order mismatch. Expected {expected_sort_orders}, got {sort_orders}"

    for ex in all_exercises:
        assert 26 <= ex["lessonNumber"] <= 50, f"Invalid lesson number {ex['lessonNumber']} in {ex['title']}"
        assert ex["title"], f"Missing title in exercise sortOrder {ex['sortOrder']}"
        assert len(ex["questions"]) > 0, f"Exercise {ex['title']} has no questions"
        for q in ex["questions"]:
            assert q["questionText"], f"Empty question text in {ex['title']}"
            assert q["explanation"], f"Empty explanation in {ex['title']} question {q['sortOrder']}"
            assert q["questionType"] in ["FILL_BLANK", "MULTIPLE_CHOICE"], f"Unexpected question type {q['questionType']}"

    output_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        "..",
        "backend",
        "src",
        "main",
        "resources",
        "data",
        "n4-exercise.json"
    )
    output_path = os.path.abspath(output_path)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(all_exercises, f, ensure_ascii=False, indent=2)

    print(f"Successfully saved to {output_path}")

if __name__ == "__main__":
    assemble()
