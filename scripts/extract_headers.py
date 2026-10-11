import fitz
import re
import cv2
import numpy as np

doc = fitz.open(r'd:\tổng hợp tài liệu N5\Sách Bài tập ngữ pháp - Tập 1.pdf')
print(f"Total pages: {len(doc)}")

# Let's inspect the top header of each page
# We can save small header crops or look at them
for page_num in range(len(doc)):
    page = doc[page_num]
    pix = page.get_pixmap(dpi=150)
    img = np.frombuffer(pix.samples, dtype=np.uint8).reshape((pix.h, pix.w, pix.n))
    # Header is typically top 15%
    h_top = int(pix.h * 0.15)
    header_crop = img[0:h_top, :]
    cv2.imwrite(f'scripts/header_{page_num+1:02d}.png', header_crop)

print("Saved headers for all pages")
