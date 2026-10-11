import fitz
import cv2
import os

pdf_path = r'd:\tổng hợp tài liệu N5\Sách Bài tập ngữ pháp - Tập 1.pdf'
doc = fitz.open(pdf_path)

os.makedirs('scripts/image_inspection', exist_ok=True)

# Render pages of interest:
# PDF p.2 (Lesson 1-2 p.1) -> Q1, Q3
# PDF p.4 (Lesson 3 p.3) -> Q1
# PDF p.6, 7 (Lesson 4 p.5, 6) -> Q1, Q4
# PDF p.12 (Lesson 7) -> Q2
# PDF p.21, 22 (Lesson 10) -> Q3
# PDF p.27, 28 (Lesson 13) -> Q2
# PDF p.29, 30 (Lesson 14) -> Q4
# PDF p.48, 49 (Lesson 22) -> Q4
# PDF p.50, 51 (Lesson 23) -> Q5

target_pages = [2, 4, 6, 7, 12, 13, 21, 22, 27, 28, 29, 30, 48, 49, 50, 51]
for p in target_pages:
    page = doc[p - 1]
    pix = page.get_pixmap(dpi=150)
    pix.save(f'scripts/image_inspection/pdf_page_{p:02d}.png')

print("Rendered target pages for image cropping inspection")
