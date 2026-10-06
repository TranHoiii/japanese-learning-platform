import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

JSON_PATH = r"d:\japanese-learning-platform\backend\src\main\resources\data\n4-grammar.json"

def audit():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    lessons = data["lessons"]
    total_lessons = len(lessons)
    total_grammars = 0
    total_examples = 0
    grammar_without_examples = 0
    missing_meaning = 0
    missing_explanation = 0
    broken_lesson_refs = 0
    orphan_grammar = 0
    orphan_examples = 0

    per_lesson_counts = []
    pattern_seen = {}
    exact_duplicates = 0
    potential_duplicates = []

    for l in lessons:
        l_num = l["lessonNumber"]
        g_list = l.get("grammars", [])
        l_grammars = len(g_list)
        l_examples = 0

        for g in g_list:
            total_grammars += 1
            pattern = g.get("pattern", "")
            if not g.get("meaning"):
                missing_meaning += 1
            if not g.get("explanation"):
                missing_explanation += 1

            exs = g.get("examples", [])
            l_examples += len(exs)
            if not exs:
                grammar_without_examples += 1

            # Check duplicates
            clean_pat = pattern.strip()
            if clean_pat in pattern_seen:
                prev_l, prev_meaning = pattern_seen[clean_pat]
                potential_duplicates.append(
                    f"- '{clean_pat}' in Lesson {l_num} (meaning: '{g.get('meaning')}') and Lesson {prev_l} (meaning: '{prev_meaning}')"
                )
                if g.get("meaning") == prev_meaning:
                    exact_duplicates += 1
            else:
                pattern_seen[clean_pat] = (l_num, g.get("meaning"))

        total_examples += l_examples
        per_lesson_counts.append((l_num, l_grammars, l_examples))

    print("==================================================")
    print("N4 GRAMMAR AUDIT")
    print("==================================================")
    print("\nSource:\n    Ngữ Pháp N4.pdf")
    print("\nLevel:\n    N4")
    print(f"\nLessons:\n    {total_lessons}")
    print(f"\nGrammar patterns:\n    {total_grammars}")
    print(f"\nGrammar examples:\n    {total_examples}")
    print("\nPer lesson:\n")
    for ln, gc, ec in per_lesson_counts:
        print(f"    Lesson {ln:02d}:")
        print(f"        Grammar: {gc:2d}")
        print(f"        Examples: {ec:2d}\n")

    print(f"Duplicates:\n    {exact_duplicates}")
    print(f"\nPotential duplicates:")
    if potential_duplicates:
        for pd in potential_duplicates:
            print(f"    {pd}")
    else:
        print("    None")

    print(f"\nGrammar without examples:\n    {grammar_without_examples}")
    print(f"\nExamples without grammar:\n    {orphan_examples}")
    print(f"\nBroken lesson references:\n    {broken_lesson_refs}")
    print(f"\nOrphan grammar:\n    {orphan_grammar}")
    print(f"\nOrphan examples:\n    {orphan_examples}")
    print(f"\nMissing meaning:\n    {missing_meaning}")
    print(f"\nMissing explanation:\n    {missing_explanation}")

if __name__ == "__main__":
    audit()
