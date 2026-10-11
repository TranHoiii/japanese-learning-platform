import sys
import json
import os

sys.stdout.reconfigure(encoding='utf-8')

# Import parts
from kanji_data_builder import part1
from data_units_6_to_10 import part2
from data_units_11_to_15 import part3
from data_units_16_to_20 import part4

all_raw = part1 + part2 + part3 + part4
print(f"Total raw items: {len(all_raw)}")

assert len(all_raw) == 220, f"Expected 220 items, got {len(all_raw)}"
chars = [item["k"] for item in all_raw]
assert len(set(chars)) == 220, f"Duplicate characters found! Unique: {len(set(chars))}"

# Assemble full payload
assembled = []
for idx, item in enumerate(all_raw, start=1):
    char = item["k"]
    code = f"{ord(char):05x}"
    svg_url = f"https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/{code}.svg"
    
    compounds = []
    for c in item["comp"]:
        compounds.append({
            "word": c[0],
            "reading": c[1],
            "meaning": c[2],
            "exampleSentence": c[3]
        })
        
    obj = {
        "kanji": char,
        "hanViet": item["hv"],
        "onyomi": item["on"],
        "kunyomi": item["kun"],
        "meaning": item["m"],
        "strokeCount": item["sc"],
        "strokeOrderUrl": svg_url,
        "mnemonic": item["mn"],
        "kanjiNumber": idx,
        "lessons": item["ls"],
        "compounds": compounds
    }
    assembled.append(obj)

target_path_src = r"backend/src/main/resources/data/n5-kanji.json"
target_path_target = r"backend/target/classes/data/n5-kanji.json"

os.makedirs(os.path.dirname(target_path_src), exist_ok=True)
with open(target_path_src, "w", encoding="utf-8") as f:
    json.dump(assembled, f, ensure_ascii=False, indent=2)
print(f"Saved {len(assembled)} kanjis to {target_path_src}")

if os.path.exists(os.path.dirname(target_path_target)):
    with open(target_path_target, "w", encoding="utf-8") as f:
        json.dump(assembled, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(assembled)} kanjis to {target_path_target}")

print("Validation sample:")
print("Kanji #1:", assembled[0]["kanji"], assembled[0]["hanViet"], assembled[0]["kanjiNumber"])
print("Kanji #11:", assembled[10]["kanji"], assembled[10]["hanViet"], assembled[10]["kanjiNumber"])
print("Kanji #21:", assembled[20]["kanji"], assembled[20]["hanViet"], assembled[20]["kanjiNumber"])
print("Kanji #220:", assembled[219]["kanji"], assembled[219]["hanViet"], assembled[219]["kanjiNumber"])
