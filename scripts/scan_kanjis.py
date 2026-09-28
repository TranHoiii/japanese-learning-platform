import sys
import json
import re
import pdfplumber

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r'D:\tổng hợp tài liệu N5\kanji N5 theo bài + bài tập.pdf'

def scan_all_kanjis():
    with pdfplumber.open(pdf_path) as pdf:
        print(f"Total pages: {len(pdf.pages)}")
        
        # Search for kanji patterns across all pages
        # Kanji cards in Kanji Master N5 usually have number of strokes, readings, etc.
        kanji_data = []
        
        for p_idx, page in enumerate(pdf.pages):
            text = page.extract_text()
            if not text:
                continue
            
            # Print page number and first 2 lines if it looks like a lesson or kanji page
            lines = [l.strip() for l in text.split('\n') if l.strip()]
            if any(k in text for k in ['画', ' Onyomi', ' Kunyomi', 'み', 'め']) or len(lines) > 0:
                pass

if __name__ == "__main__":
    scan_all_kanjis()
