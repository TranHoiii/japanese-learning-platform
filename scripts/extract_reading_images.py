import fitz
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r'd:\tổng hợp tài liệu N4\Đọc hiểu N4.pdf'
doc = fitz.open(pdf_path)

backend_dir = r'd:\japanese-learning-platform\backend\src\main\resources\static\media\reading'
frontend_dir = r'd:\japanese-learning-platform\frontend\public\media\reading'

os.makedirs(backend_dir, exist_ok=True)
os.makedirs(frontend_dir, exist_ok=True)

# Image specs: (filename, pdf_page_1based, crop_rect_relative: (x0, y0, x1, y1) as fraction of page)
image_specs = [
    # Lesson 26
    ("reading_n4_l26_r01.png", 22, (0.05, 0.15, 0.95, 0.95)),
    ("reading_n4_l26_r02.png", 24, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 27
    ("reading_n4_l27_r01.png", 26, (0.05, 0.12, 0.95, 0.70)),
    # Lesson 28
    ("reading_n4_l28_r01.png", 28, (0.05, 0.12, 0.95, 0.95)),
    # Lesson 29
    ("reading_n4_l29_r01.png", 30, (0.05, 0.12, 0.95, 0.95)),
    # Lesson 30
    ("reading_n4_l30_r01.png", 32, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l30_r02.png", 34, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 31
    ("reading_n4_l31_r01.png", 36, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l31_r02.png", 38, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 32
    ("reading_n4_l32_r01.png", 40, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l32_r02.png", 42, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 33
    ("reading_n4_l33_r01.png", 44, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l33_r02.png", 46, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 34
    ("reading_n4_l34_r01.png", 48, (0.05, 0.12, 0.95, 0.95)),
    # Lesson 35
    ("reading_n4_l35_r01.png", 50, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l35_r02.png", 52, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 36
    ("reading_n4_l36_r01.png", 54, (0.05, 0.12, 0.95, 0.95)),
    # Lesson 37
    ("reading_n4_l37_r01.png", 56, (0.05, 0.12, 0.95, 0.95)),
    # Lesson 38
    ("reading_n4_l38_r01.png", 60, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l38_r02.png", 62, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 39
    ("reading_n4_l39_r01.png", 64, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l39_r02.png", 67, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 40
    ("reading_n4_l40_r01.png", 68, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l40_r02.png", 70, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 41
    ("reading_n4_l41_r01.png", 72, (0.05, 0.12, 0.95, 0.95)),
    # Lesson 42
    ("reading_n4_l42_r01.png", 74, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l42_r02.png", 76, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 43
    ("reading_n4_l43_r01.png", 78, (0.05, 0.12, 0.95, 0.95)),
    # Lesson 44
    ("reading_n4_l44_r01.png", 82, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l44_r02.png", 85, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 45
    ("reading_n4_l45_r01.png", 86, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l45_r02.png", 88, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 46
    ("reading_n4_l46_r01.png", 90, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l46_r02.png", 92, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 47
    ("reading_n4_l47_r01.png", 94, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l47_r02.png", 96, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 48
    ("reading_n4_l48_r01.png", 98, (0.05, 0.12, 0.95, 0.95)),
    # Lesson 49
    ("reading_n4_l49_r01.png", 102, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l49_r02.png", 105, (0.05, 0.10, 0.95, 0.95)),
    # Lesson 50
    ("reading_n4_l50_r01.png", 106, (0.05, 0.12, 0.95, 0.95)),
    ("reading_n4_l50_r02.png", 109, (0.05, 0.10, 0.95, 0.95))
]

matrix = fitz.Matrix(2.0, 2.0)
for fname, pno, crop_frac in image_specs:
    page = doc[pno - 1]
    pw, ph = page.rect.width, page.rect.height
    rect = fitz.Rect(pw * crop_frac[0], ph * crop_frac[1], pw * crop_frac[2], ph * crop_frac[3])
    pix = page.get_pixmap(matrix=matrix, clip=rect)
    
    b_path = os.path.join(backend_dir, fname)
    f_path = os.path.join(frontend_dir, fname)
    pix.save(b_path)
    pix.save(f_path)
    print(f"Extracted {fname} from PDF page {pno}")

print("All reading images extracted successfully!")
