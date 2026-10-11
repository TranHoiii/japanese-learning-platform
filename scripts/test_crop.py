import fitz
import cv2
import os

pdf_path = r'd:\tổng hợp tài liệu N5\Sách Bài tập ngữ pháp - Tập 1.pdf'
doc = fitz.open(pdf_path)

backend_dir = r'd:\japanese-learning-platform\backend\src\main\resources\static\media\exercise'
frontend_dir = r'd:\japanese-learning-platform\frontend\public\media\exercise'
os.makedirs(backend_dir, exist_ok=True)
os.makedirs(frontend_dir, exist_ok=True)

# Helper to render a page at 300 dpi for ultra crisp images
def get_page_image(page_idx):
    page = doc[page_idx]
    pix = page.get_pixmap(dpi=200)
    img_path = f'scripts/image_inspection/dpi200_p{page_idx+1}.png'
    pix.save(img_path)
    return cv2.imread(img_path), pix.w, pix.h

print("Testing DPI 200 rendering...")
img, w, h = get_page_image(1) # page 2 of PDF
print(f"Page 2 dimensions at 200dpi: {w}x{h}")
