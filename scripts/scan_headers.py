import sys
import easyocr
import glob

sys.stdout.reconfigure(encoding='utf-8')

reader = easyocr.Reader(['ja', 'en'], gpu=False)
files = sorted(glob.glob('scripts/header_*.png'))
for f in files:
    res = reader.readtext(f, detail=0)
    print(f, "-->", " | ".join(res))
