import fitz
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r'd:\tổng hợp tài liệu N5\25 Bài đọc hiểu sơ cấp - Tập 1.pdf'
doc = fitz.open(pdf_path)

backend_dir = r'd:\japanese-learning-platform\backend\src\main\resources\static\media\reading'
frontend_dir = r'd:\japanese-learning-platform\frontend\public\media\reading'

os.makedirs(backend_dir, exist_ok=True)
os.makedirs(frontend_dir, exist_ok=True)

# 37 items: (filename, pdf_page_1based, crop_rect_relative: (x0, y0, x1, y1))
specs = [
    # Warmups (Lessons 1-5)
    ("reading_n5_l01_r01.png", 21, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l02_r01.png", 22, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l03_r01.png", 23, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l04_r01.png", 24, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l05_r01.png", 25, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 6
    ("reading_n5_l06_r01.png", 26, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 7
    ("reading_n5_l07_r01.png", 28, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 8
    ("reading_n5_l08_r01.png", 30, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 9
    ("reading_n5_l09_r01.png", 32, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 10
    ("reading_n5_l10_r01.png", 34, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 11
    ("reading_n5_l11_r01.png", 36, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l11_r02.png", 38, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 12
    ("reading_n5_l12_r01.png", 40, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l12_r02.png", 42, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 13
    ("reading_n5_l13_r01.png", 44, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 14
    ("reading_n5_l14_r01.png", 46, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l14_r02.png", 48, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 15
    ("reading_n5_l15_r01.png", 50, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l15_r02.png", 52, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 16
    ("reading_n5_l16_r01.png", 54, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 17
    ("reading_n5_l17_r01.png", 56, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 18
    ("reading_n5_l18_r01.png", 58, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l18_r02.png", 60, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 19
    ("reading_n5_l19_r01.png", 62, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 20
    ("reading_n5_l20_r01.png", 64, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l20_r02.png", 66, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l20_r03.png", 67, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 21
    ("reading_n5_l21_r01.png", 68, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l21_r02.png", 70, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 22
    ("reading_n5_l22_r01.png", 72, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l22_r02.png", 74, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l22_r03.png", 75, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 23
    ("reading_n5_l23_r01.png", 76, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 24
    ("reading_n5_l24_r01.png", 78, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l24_r02.png", 80, (0.08, 0.10, 0.92, 0.94)),

    # Lesson 25
    ("reading_n5_l25_r01.png", 82, (0.08, 0.10, 0.92, 0.94)),
    ("reading_n5_l25_r02.png", 84, (0.08, 0.10, 0.92, 0.94)),
]

matrix = fitz.Matrix(2.0, 2.0)
for fname, pno, crop_frac in specs:
    page = doc[pno - 1]
    pw, ph = page.rect.width, page.rect.height
    rect = fitz.Rect(pw * crop_frac[0], ph * crop_frac[1], pw * crop_frac[2], ph * crop_frac[3])
    pix = page.get_pixmap(matrix=matrix, clip=rect)
    
    b_path = os.path.join(backend_dir, fname)
    f_path = os.path.join(frontend_dir, fname)
    pix.save(b_path)
    pix.save(f_path)
    print(f"Extracted {fname} from PDF page {pno}")

# Also ensure legacy names exist if needed
legacy_copies = [
    ("reading_n5_l11_r02.png", "reading_n5_l11_r02_img01.png"),
    ("reading_n5_l14_r02.png", "reading_n5_l14_r02_img01.png"),
]
for src, dst in legacy_copies:
    for d in [backend_dir, frontend_dir]:
        src_path = os.path.join(d, src)
        dst_path = os.path.join(d, dst)
        if os.path.exists(src_path):
            with open(src_path, 'rb') as f_in, open(dst_path, 'wb') as f_out:
                f_out.write(f_in.read())
            print(f"Created legacy alias {dst} -> {src}")

print("All 37 N5 reading images extracted successfully!")
