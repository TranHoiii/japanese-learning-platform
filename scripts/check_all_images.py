import fitz
import json

doc = fitz.open(r'd:\tổng hợp tài liệu N5\Sách Bài tập ngữ pháp - Tập 1.pdf')

# Let's inspect pages where images might exist:
# Every lesson in Minna no Nihongo I:
# Lesson 1-2: p.2 (Q1 items grid, Q3 person pointing)
# Lesson 3: p.4 (Q1 price items)
# Lesson 4: p.6 (Q2 calendar table), p.7 (Q4 schedule table)
# Lesson 5: p.8, 9
# Lesson 6: p.10, 11
# Lesson 7: p.12, 13
# Lesson 8: p.14, 15
# Review 1-8: p.16, 17, 18
# Lesson 9: p.19, 20
# Lesson 10: p.21, 22 (Q3 room illustration)
# Lesson 11: p.23, 24
# Lesson 12: p.25, 26
# Lesson 13: p.27, 28 (Q2 items, Q3 actions)
# Lesson 14: p.29, 30, 31 (Q4 actions -teimasu)
# Lesson 15: p.32, 33
# Lesson 16: p.34, 35
# Lesson 17: p.36, 37
# Review 9-17: p.38, 39, 40
# Lesson 18: p.41, 42
# Lesson 19: p.43, 44
# Lesson 20: p.45, 46
# Lesson 21: p.47, 48
# Lesson 22: p.49, 50 (Q1 items), 51 (Q4 park scene)
# Lesson 23: p.52, 53 (Q5 street map)
# Lesson 24: p.54, 55
# Lesson 25: p.56, 57
# Review 18-25: p.58, 59, 60, 61
# Review 1-25: p.62, 63, 64, 65

print("Inspecting potential image pages...")
