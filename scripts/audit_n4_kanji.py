import sys
import json
import os

sys.stdout.reconfigure(encoding='utf-8')

def audit_n4_kanji():
    json_path = 'backend/src/main/resources/data/n4-kanji.json'
    if not os.path.exists(json_path):
        print(f"Error: {json_path} does not exist!")
        return False

    with open(json_path, encoding='utf-8') as f:
        data = json.load(f)

    print(f"=== N4 KANJI DATA AUDIT ===")
    print(f"Total Kanji in JSON: {len(data)}")

    # A. JSON count
    if len(data) != 192:
        print(f"[FAIL] Expected 192 Kanji, got {len(data)}")
        return False
    else:
        print(f"[PASS] Exact 192 Kanji found.")

    # B. Unique Kanji in N4
    kanjis = [item['kanji'] for item in data]
    unique_kanjis = set(kanjis)
    if len(unique_kanjis) != 192:
        print(f"[FAIL] Duplicates within N4 dataset: {len(kanjis) - len(unique_kanjis)}")
        return False
    else:
        print(f"[PASS] All 192 Kanji are unique within N4.")

    # C. Lesson range (26 to 50, PDF maps 26 to 46)
    invalid_lessons = []
    lessons_count = {}
    for item in data:
        les = item['lessons']
        if not les or any(l < 26 or l > 50 for l in les):
            invalid_lessons.append((item['kanji'], les))
        for l in les:
            lessons_count[l] = lessons_count.get(l, 0) + 1

    if invalid_lessons:
        print(f"[FAIL] Invalid lessons outside 26-50: {invalid_lessons}")
        return False
    else:
        print(f"[PASS] All lessons within valid range 26-50.")

    print("Lesson Distribution:")
    for l in sorted(lessons_count.keys()):
        print(f"  Lesson {l}: {lessons_count[l]} Kanji")

    # D. Required fields not null
    missing_fields = []
    total_compounds = 0
    for idx, item in enumerate(data):
        k = item.get('kanji')
        hv = item.get('hanViet')
        meaning = item.get('meaning')
        sc = item.get('strokeCount')
        url = item.get('strokeOrderUrl')
        on = item.get('onyomi')
        kun = item.get('kunyomi')
        
        if not k: missing_fields.append((idx, 'kanji'))
        if not hv: missing_fields.append((idx, 'hanViet'))
        if not meaning: missing_fields.append((idx, 'meaning'))
        if sc is None or sc <= 0: missing_fields.append((idx, 'strokeCount'))
        if not url: missing_fields.append((idx, 'strokeOrderUrl'))
        if not on and not kun: missing_fields.append((idx, 'readings'))
        
        compounds = item.get('compounds', [])
        total_compounds += len(compounds)
        for c in compounds:
            if not c.get('word') or not c.get('reading'):
                missing_fields.append((idx, 'compound_format', c))

    if missing_fields:
        print(f"[FAIL] Missing required fields: {len(missing_fields)}")
        for mf in missing_fields[:10]:
            print("  ", mf)
        return False
    else:
        print(f"[PASS] All required fields are present and non-null.")
        print(f"Total Compounds extracted: {total_compounds}")

    # E. Overlapping kanji with N5
    n5_json_path = 'backend/src/main/resources/data/n5-kanji.json'
    if os.path.exists(n5_json_path):
        with open(n5_json_path, encoding='utf-8') as f:
            n5_data = json.load(f)
        n5_set = set(k['kanji'] for k in n5_data)
        overlap = [k for k in kanjis if k in n5_set]
        print(f"[INFO] N4/N5 overlap: {len(overlap)} kanji: {overlap}")
        print("These overlapping kanji will be properly linked in lesson_kanjis without duplicating in kanjis table.")

    # F. SQL migration file audit
    sql_path = 'backend/src/main/resources/db/migration/V7__add_n4_kanji.sql'
    if not os.path.exists(sql_path):
        print(f"[FAIL] Migration {sql_path} does not exist!")
        return False
    else:
        sql_size = os.path.getsize(sql_path)
        print(f"[PASS] Migration V7__add_n4_kanji.sql exists ({sql_size} bytes).")

    print(f"=== ALL AUDIT CHECKS PASSED ===")
    return True

if __name__ == '__main__':
    success = audit_n4_kanji()
    sys.exit(0 if success else 1)
