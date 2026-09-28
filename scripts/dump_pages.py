import sys
import json
import pdfplumber

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r'D:\tổng hợp tài liệu N5\kanji N5 theo bài + bài tập.pdf'

def dump_chapter_pages():
    with pdfplumber.open(pdf_path) as pdf:
        for p in range(11, 22): # Chapter 1 & 2 area
            print(f"=== PAGE {p} ===")
            print(pdf.pages[p-1].extract_text())

if __name__ == "__main__":
    dump_chapter_pages()
