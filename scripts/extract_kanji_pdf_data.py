import sys
import json
import re
import pdfplumber

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r'D:\tổng hợp tài liệu N5\kanji N5 theo bài + bài tập.pdf'

def inspect_all_pages():
    with pdfplumber.open(pdf_path) as pdf:
        print(f"Total pages: {len(pdf.pages)}")
        
        # Let's inspect TOC pages (pages 9 & 10)
        print("=== PAGE 9 (TOC Part 1) ===")
        print(pdf.pages[8].extract_text())
        print("=== PAGE 10 (TOC Part 2) ===")
        print(pdf.pages[9].extract_text())

if __name__ == "__main__":
    inspect_all_pages()
