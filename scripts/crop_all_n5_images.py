import fitz
import cv2
import os

pdf_path = r'd:\tổng hợp tài liệu N5\Sách Bài tập ngữ pháp - Tập 1.pdf'
doc = fitz.open(pdf_path)

crops_dir = 'scripts/crops_test'
os.makedirs(crops_dir, exist_ok=True)

# Helper to get normalized crop from a page
# rect in PDF coordinates: (x0, y0, x1, y1)
def crop_box(page_idx, rect, out_name):
    page = doc[page_idx]
    clip = fitz.Rect(rect)
    pix = page.get_pixmap(clip=clip, dpi=200)
    out_path = os.path.join(crops_dir, out_name)
    pix.save(out_path)
    print(f"Saved {out_name}: {pix.w}x{pix.h}")

# Page 2 (0-indexed: 1)
# PDF rect: width=524.16, height=722.52
# Q1: top ~80 to ~220, x ~80 to ~480
crop_box(1, (75, 75, 470, 220), "exercise_n5_l01_q01.png")
# Q3: y ~385 to ~515, x ~80 to ~430
crop_box(1, (80, 385, 435, 510), "exercise_n5_l01_q03.png")

# Page 4 (0-indexed: 3)
# Lesson 3 Q1: y ~75 to ~195, x ~80 to ~470
crop_box(3, (80, 75, 470, 195), "exercise_n5_l03_q01.png")

# Page 6 (0-indexed: 5)
# Lesson 4 Q2 (calendar): y ~190 to ~335, x ~85 to ~230
crop_box(5, (85, 190, 235, 335), "exercise_n5_l04_q02.png")

# Page 7 (0-indexed: 6)
# Lesson 4 Q4 (schedule table): y ~45 to ~145, x ~80 to ~325
crop_box(6, (80, 45, 325, 145), "exercise_n5_l04_q04.png")

# Page 11 (0-indexed: 10)
# Lesson 6 Q4 (6 panels): y ~40 to ~135, x ~60 to ~455
crop_box(10, (60, 40, 455, 135), "exercise_n5_l06_q04.png")

# Page 22 (0-indexed: 21)
# Lesson 10 Q3 (room): y ~440 to ~570, x ~85 to ~330
crop_box(21, (85, 440, 330, 570), "exercise_n5_l10_q03.png")

# Page 28 (0-indexed: 27)
# Lesson 13 Q2 (items): y ~265 to ~360, x ~85 to ~475
crop_box(27, (85, 265, 475, 360), "exercise_n5_l13_q02.png")
# Lesson 13 Q3 (actions): y ~480 to ~565, x ~85 to ~475
crop_box(27, (85, 480, 475, 565), "exercise_n5_l13_q03.png")

# Page 31 (0-indexed: 30)
# Lesson 14 Q4 (-teimasu): y ~40 to ~135, x ~65 to ~455
crop_box(30, (65, 40, 455, 135), "exercise_n5_l14_q04.png")

# Page 50 (0-indexed: 49)
# Lesson 22 Q1 (items): y ~75 to ~150, x ~75 to ~465
crop_box(49, (75, 75, 465, 150), "exercise_n5_l22_q01.png")

# Page 51 (0-indexed: 50)
# Lesson 22 Q4 (park scene): y ~40 to ~245, x ~70 to ~430
crop_box(50, (70, 40, 430, 245), "exercise_n5_l22_q04.png")

# Page 53 (0-indexed: 52)
# Lesson 23 Q5 (street map): y ~40 to ~275, x ~65 to ~390
crop_box(52, (65, 40, 390, 275), "exercise_n5_l23_q05.png")

# Page 54 (0-indexed: 53)
# Lesson 24 Q2 (giving/receiving): y ~365 to ~455, x ~85 to ~400
crop_box(53, (85, 365, 400, 455), "exercise_n5_l24_q02.png")

print("All 14 crops created for inspection")
