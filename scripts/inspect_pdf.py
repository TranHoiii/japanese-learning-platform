import sys
import pymupdf

sys.stdout.reconfigure(encoding='utf-8')

doc = pymupdf.open(r'd:\tổng hợp tài liệu N5\Sách Bài tập ngữ pháp - Tập 1.pdf')
print('Page count:', len(doc))

for i in range(len(doc)):
    page = doc[i]
    text = page.get_text().strip()
    images = page.get_images()
    first_line = text.split('\n')[0] if text else '(NO TEXT)'
    print(f"Page {i+1:02d}: text len={len(text):4d}, images={len(images):2d} | Line 1: {first_line[:60]}")
