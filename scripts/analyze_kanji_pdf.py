import pdfplumber
import json

pdf_path = r'D:\tổng hợp tài liệu N5\kanji N5 theo bài + bài tập.pdf'

def analyze_pdf():
    with pdfplumber.open(pdf_path) as pdf:
        print(f"Total pages: {len(pdf.pages)}")
        
        pages_content = []
        for idx, page in enumerate(pdf.pages):
            text = page.extract_text()
            pages_content.append({
                "page": idx + 1,
                "text": text or ""
            })
            
    with open("scripts/pdf_raw_text.json", "w", encoding="utf-8") as f:
        json.dump(pages_content, f, ensure_ascii=False, indent=2)

    print("Extracted raw text to scripts/pdf_raw_text.json")

if __name__ == "__main__":
    analyze_pdf()
