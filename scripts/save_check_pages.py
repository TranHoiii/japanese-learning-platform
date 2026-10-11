import fitz
import json

doc = fitz.open(r'd:\tổng hợp tài liệu N5\Sách Bài tập ngữ pháp - Tập 1.pdf')
with open('backend/src/main/resources/data/n5-exercise.json', encoding='utf-8') as f:
    n5 = json.load(f)

# Let's save higher resolution images for inspection
check_p = [3, 8, 11, 18, 24, 26, 36, 44, 46, 54]
for cp in check_p:
    page = doc[cp - 1]
    pix = page.get_pixmap(dpi=150)
    pix.save(f'scripts/image_inspection/inspect_p{cp:02d}.png')

print("Saved inspection pages")
