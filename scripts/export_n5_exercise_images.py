import os
import pymupdf

pdf_path = r"d:\tổng hợp tài liệu N5\Sách Bài tập ngữ pháp - Tập 1.pdf"
doc = pymupdf.open(pdf_path)

output_dirs = [
    r"d:\japanese-learning-platform\backend\src\main\resources\static\media\exercise",
    r"d:\japanese-learning-platform\frontend\public\media\exercise"
]

for d in output_dirs:
    os.makedirs(d, exist_ok=True)

# 14 images with tested coordinates
crop_specs = [
    {
        "filename": "exercise_n5_l01_q01.png",
        "page": 2,
        "rect": (80, 78, 470, 205),
        "desc": "Bài 1-2 Câu 1: Đồ vật tranh 1..10"
    },
    {
        "filename": "exercise_n5_l01_q03.png",
        "page": 2,
        "rect": (89, 385, 435, 510),
        "desc": "Bài 1-2 Câu 3: Người chỉ túi これ, それ, あれ"
    },
    {
        "filename": "exercise_n5_l03_q01.png",
        "page": 4,
        "rect": (89, 75, 470, 195),
        "desc": "Bài 3 Câu 1: Đồ vật kèm giá tiền Yên"
    },
    {
        "filename": "exercise_n5_l04_q02.png",
        "page": 6,
        "rect": (92, 190, 235, 335),
        "desc": "Bài 4 Câu 2: Lịch tháng 3"
    },
    {
        "filename": "exercise_n5_l04_q04.png",
        "page": 7,
        "rect": (65, 45, 325, 145),
        "desc": "Bài 4 Câu 4: Bảng thời gian làm việc"
    },
    {
        "filename": "exercise_n5_l06_q04.png",
        "page": 11,
        "rect": (65, 44, 455, 130),
        "desc": "Bài 6 Câu 4: 6 panel hành động"
    },
    {
        "filename": "exercise_n5_l10_q03.png",
        "page": 22,
        "rect": (89, 440, 330, 570),
        "desc": "Bài 10 Câu 3: Tranh phòng ngủ và mèo"
    },
    {
        "filename": "exercise_n5_l13_q02.png",
        "page": 28,
        "rect": (89, 265, 475, 360),
        "desc": "Bài 13 Câu 2: Đồ vật muốn có"
    },
    {
        "filename": "exercise_n5_l13_q03.png",
        "page": 28,
        "rect": (89, 480, 475, 565),
        "desc": "Bài 13 Câu 3: Hành động muốn làm"
    },
    {
        "filename": "exercise_n5_l14_q04.png",
        "page": 31,
        "rect": (70, 40, 455, 135),
        "desc": "Bài 14 Câu 4: 5 tranh hành động đang tiếp diễn"
    },
    {
        "filename": "exercise_n5_l22_q01.png",
        "page": 50,
        "rect": (80, 75, 465, 150),
        "desc": "Bài 22 Câu 1: Đồ vật định ngữ"
    },
    {
        "filename": "exercise_n5_l22_q04.png",
        "page": 51,
        "rect": (70, 40, 430, 245),
        "desc": "Bài 22 Câu 4: Tranh toàn cảnh công viên"
    },
    {
        "filename": "exercise_n5_l23_q05.png",
        "page": 53,
        "rect": (65, 40, 390, 275),
        "desc": "Bài 23 Câu 5: Bản đồ chỉ đường"
    },
    {
        "filename": "exercise_n5_l24_q02.png",
        "page": 54,
        "rect": (85, 365, 400, 455),
        "desc": "Bài 24 Câu 2: Hành động cho nhận"
    }
]

print(f"Starting extraction of {len(crop_specs)} N5 exercise images...")

for spec in crop_specs:
    page = doc[spec["page"]]
    x0, y0, x1, y1 = spec["rect"]
    crop_rect = pymupdf.Rect(x0, y0, x1, y1)
    # Render at 3x resolution for high crispness
    mat = pymupdf.Matrix(3.0, 3.0)
    pix = page.get_pixmap(matrix=mat, clip=crop_rect)
    
    for d in output_dirs:
        dest_path = os.path.join(d, spec["filename"])
        pix.save(dest_path)
    print(f"[OK] Saved: {spec['filename']}")

print("Successfully exported all 14 N5 exercise illustrations!")
