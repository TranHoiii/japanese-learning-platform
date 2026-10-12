import os
import cv2

backend_media = r'd:\japanese-learning-platform\backend\src\main\resources\static\media\exercise'
frontend_media = r'd:\japanese-learning-platform\frontend\public\media\exercise'

os.makedirs(backend_media, exist_ok=True)
os.makedirs(frontend_media, exist_ok=True)

# Page 11 box: [(176, 558, 774, 479)]
page11_path = r'd:\japanese-learning-platform\scripts\scratch_inspect\exercise_pages\page_11.png'
img = cv2.imread(page11_path)

# Crop the room illustration
# Box with slight margin
y0, y1 = 550, 1045
x0, x1 = 170, 955
crop = img[y0:y1, x0:x1]

cv2.imwrite(os.path.join(backend_media, "exercise_n4_l30_q02.png"), crop)
cv2.imwrite(os.path.join(frontend_media, "exercise_n4_l30_q02.png"), crop)

print("Saved exercise_n4_l30_q02.png to backend and frontend media folders!")
