import sys
import json
import re
import pdfplumber

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r'D:\tổng hợp tài liệu N5\kanji N5 theo bài + bài tập.pdf'

# Standard N5 Kanji list with Hán Việt & details to supplement PDF layout OCR/text extraction
# Kanji Master N5 chapters mapping to Minna no Nihongo Lessons (1-25)

def main():
    with pdfplumber.open(pdf_path) as pdf:
        print(f"Total pages: {len(pdf.pages)}")
        
        # Let's inspect page titles and main headers for chapters 1 to 15
        chapter_pages = [
            (1, 11, 20),
            (2, 23, 30),
            (3, 31, 38),
            (4, 39, 46),
            (5, 47, 54),
            (6, 57, 64),
            (7, 65, 72),
            (8, 73, 80),
            (9, 81, 88),
            (10, 89, 96),
            (11, 97, 104),
            (12, 107, 114),
            (13, 115, 122),
            (14, 123, 130),
            (15, 131, 138),
        ]
        
        all_text_by_chap = {}
        for chap_num, start_p, end_p in chapter_pages:
            chap_text = []
            for p in range(start_p, end_p + 1):
                t = pdf.pages[p-1].extract_text()
                if t:
                    chap_text.append(f"--- Page {p} ---\n" + t)
            all_text_by_chap[f"Chapter_{chap_num}"] = "\n".join(chap_text)
            
        with open("scripts/kanji_chapters_extracted.json", "w", encoding="utf-8") as f:
            json.dump(all_text_by_chap, f, ensure_ascii=False, indent=2)

    print("Extracted chapter texts to scripts/kanji_chapters_extracted.json")

if __name__ == "__main__":
    main()
