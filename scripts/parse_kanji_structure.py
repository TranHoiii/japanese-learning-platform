import json
import re

with open("scripts/pdf_raw_text.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

print(f"Total pages in JSON: {len(pages)}")

# Search for chapter headers or lesson headers
for p in pages:
    page_num = p["page"]
    text = p["text"]
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    
    # Check for chapter patterns like '1. すうじ', '2. じかん', '3. ...'
    for line in lines:
        if re.search(r'^\d+\.\s*', line) or 'Chương' in line or '章' in line or '課' in line or 'Bài' in line:
            print(f"Page {page_num}: {line}")
