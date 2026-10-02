import os
import sys
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

fe_base = 'frontend/public/listening'
be_base = 'backend/src/main/resources/static/listening'

# Comprehensive list of image specifications per lesson & exercise
image_specs = [
    # Lesson 01
    (1, 3, "a", "例a", "🎓", "Nữ giảng viên đứng trước bục giảng có biển tên Đại học Fuji", {"bg":(239,246,255), "accent":(37,99,235)}),
    (1, 3, "b", "例b", "🏫", "Nữ giảng viên đứng trước bục giảng có biển tên Đại học Sakura", {"bg":(253,242,248), "accent":(219,39,119)}),
    (1, 3, "1a", "1a", "👩‍⚕️", "Nữ bác sĩ mặc áo blouse trắng đeo ống nghe đang ngồi khám bệnh", {"bg":(240,253,250), "accent":(13,148,136)}),
    (1, 3, "1b", "1b", "👩‍🏫", "Cô giáo đang cầm sách giảng bài trên lớp học", {"bg":(254,243,199), "accent":(217,119,6)}),
    (1, 3, "2a", "2a", "👩‍💼", "Giáo sư nữ đang giảng dạy tại hội trường đại học", {"bg":(245,243,255), "accent":(124,58,237)}),
    (1, 3, "2b", "2b", "🏦", "Nữ nhân viên ngân hàng đeo kính đang đếm tiền tại quầy giao dịch", {"bg":(236,253,245), "accent":(5,150,105)}),
    (1, 3, "3a", "3a", "💻", "Nữ nhân viên văn phòng đeo thẻ nhân viên trước logo công ty IMC", {"bg":(239,246,255), "accent":(29,78,216)}),
    (1, 3, "3b", "3b", "⚡", "Nữ nhân viên văn phòng trước logo công ty Điện lực Power", {"bg":(254,242,242), "accent":(220,38,38)}),

    # Lesson 02
    (2, 1, "例a", "例a", "🔑", "Chìa khóa phòng 510", {"bg":(239,246,255), "accent":(37,99,235)}),
    (2, 1, "例b", "例b", "💳", "Thẻ từ phòng 510", {"bg":(240,253,250), "accent":(13,148,136)}),
    (2, 1, "1a", "1a", "📻", "Băng đĩa / Máy phát tiếng Hàn Quốc", {"bg":(245,243,255), "accent":(124,58,237)}),
    (2, 1, "1b", "1b", "🎙️", "Máy phát tiếng Nhật", {"bg":(254,243,199), "accent":(217,119,6)}),
    (2, 1, "2a", "2a", "📷", "Máy ảnh chụp hình", {"bg":(236,253,245), "accent":(5,150,105)}),
    (2, 1, "2b", "2b", "📻", "Máy radio phát nhạc", {"bg":(253,242,248), "accent":(219,39,119)}),
    (2, 1, "3a", "3a", "🍫", "Đĩa bánh kẹo sô cô la", {"bg":(254,242,242), "accent":(220,38,38)}),
    (2, 1, "3b", "3b", "🎁", "Hộp bánh sô cô la", {"bg":(239,246,255), "accent":(29,78,216)}),

    # Lesson 03
    (3, 1, "例a", "例a", "🏢", "Quầy thông tin phòng họp 501", {"bg":(239,246,255), "accent":(37,99,235)}),
    (3, 1, "例b", "例b", "🚪", "Cửa phòng họp 502", {"bg":(240,253,250), "accent":(13,148,136)}),
    (3, 1, "1a", "1a", "🚻", "Nhà vệ sinh tầng 1", {"bg":(245,243,255), "accent":(124,58,237)}),
    (3, 1, "1b", "1b", "🛗", "Thang máy tầng 2", {"bg":(254,243,199), "accent":(217,119,6)}),
    (3, 1, "2a", "2a", "📶", "Văn phòng công ty IMC tầng 3", {"bg":(236,253,245), "accent":(5,150,105)}),
    (3, 1, "2b", "2b", "🏬", "Văn phòng công ty Power tầng 5", {"bg":(253,242,248), "accent":(219,39,119)}),

    # Lesson 04
    (4, 1, "例a", "例a", "⏰", "Đồng hồ chỉ 7:00 sáng", {"bg":(239,246,255), "accent":(37,99,235)}),
    (4, 1, "例b", "例b", "🕰️", "Đồng hồ chỉ 7:30 sáng", {"bg":(240,253,250), "accent":(13,148,136)}),
    (4, 1, "1a", "1a", "🕒", "Đồng hồ chỉ 9:15", {"bg":(245,243,255), "accent":(124,58,237)}),
    (4, 1, "1b", "1b", "🕓", "Đồng hồ chỉ 9:45", {"bg":(254,243,199), "accent":(217,119,6)}),

    # Lesson 05
    (5, 1, "例a", "例a", "🚅", "Tàu điện Shinkansen đi Kyoto", {"bg":(239,246,255), "accent":(37,99,235)}),
    (5, 1, "例b", "例b", "🚌", "Xe bus cao tốc đi Kyoto", {"bg":(240,253,250), "accent":(13,148,136)}),
    (5, 1, "1a", "1a", "🚶‍♂️", "Đi bộ cùng bạn bè đến công viên", {"bg":(245,243,255), "accent":(124,58,237)}),
    (5, 1, "1b", "1b", "🚲", "Đi xe đạp đến công viên", {"bg":(254,243,199), "accent":(217,119,6)}),

    # Lesson 06
    (6, 1, "例a", "例a", "🍱", "Hộp cơm Bento mì Ramen", {"bg":(239,246,255), "accent":(37,99,235)}),
    (6, 1, "例b", "例b", "🥪", "Bánh mì Sandwich nước trái cây", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 07
    (7, 1, "例a", "例a", "✂️", "Cắt giấy bằng kéo", {"bg":(239,246,255), "accent":(37,99,235)}),
    (7, 1, "例b", "例b", "🖋️", "Viết thư bằng bút máy", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 08
    (8, 1, "例a", "例a", "🏙️", "Thành phố Osaka sầm uất hiện đại", {"bg":(239,246,255), "accent":(37,99,235)}),
    (8, 1, "例b", "例b", "🏞️", "Thành phố yên bình yên tĩnh", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 09
    (9, 1, "例a", "例a", "⚾", "Bóng chày thể thao", {"bg":(239,246,255), "accent":(37,99,235)}),
    (9, 1, "例b", "例b", "⚽", "Bóng đá sôi động", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 10
    (10, 1, "例a", "例a", "🐶", "Chú chó nhỏ dưới gầm bàn", {"bg":(239,246,255), "accent":(37,99,235)}),
    (10, 1, "例b", "例b", "🐱", "Chú mèo nhỏ trên ghế sofa", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 11
    (11, 1, "例a", "例a", "🍎", "5 quả táo trên đĩa", {"bg":(239,246,255), "accent":(37,99,235)}),
    (11, 1, "例b", "例b", "🍊", "3 quả cam tươi", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 12
    (12, 1, "例a", "例a", "☀️", "Thời tiết nắng ấm rực rỡ", {"bg":(239,246,255), "accent":(37,99,235)}),
    (12, 1, "例b", "例b", "🌧️", "Thời tiết mưa mát mẻ", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 13
    (13, 1, "例a", "例a", "🚗", "Xe ô tô thể thao màu đỏ", {"bg":(239,246,255), "accent":(37,99,235)}),
    (13, 1, "例b", "例b", "🏍️", "Xe máy phân khối lớn", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 14
    (14, 1, "例a", "例a", "🧳", "Bác tài xế bê vali vào cốp sau xe taxi", {"bg":(239,246,255), "accent":(37,99,235)}),
    (14, 1, "例b", "例b", "🪟", "Bác tài xế mở cửa sổ xe taxi", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 15
    (15, 1, "例a", "例a", "📸", "Anh Miller chụp ảnh bông hoa rực rỡ", {"bg":(239,246,255), "accent":(37,99,235)}),
    (15, 1, "例b", "例b", "🏛️", "Anh Miller ngắm cửa hàng đồ cổ", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 16
    (16, 1, "例a", "例a", "🗾", "Sơ đồ tuyến đường sắt JR Kyoto - Osaka", {"bg":(239,246,255), "accent":(37,99,235)}),
    (16, 1, "例b", "例b", "🎟️", "Máy bán vé tự động Nhật Bản", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 17
    (17, 1, "例a", "例a", "✈️", "Biển báo không dùng thiết bị trên máy bay", {"bg":(239,246,255), "accent":(37,99,235)}),
    (17, 1, "例b", "例b", "📸", "Biển báo cấm dùng đèn flash chụp ảnh", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 18
    (18, 1, "例a", "例a", "🐕", "Chú cún nghe hiệu lệnh Sit & Come", {"bg":(239,246,255), "accent":(37,99,235)}),
    (18, 1, "例b", "例b", "🏊‍♂️", "Chú cún bơi rẽ sóng biển xanh", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 19
    (19, 1, "例a", "例a", "🍵", "Nữ sinh mặc Kimono pha trà đạo Tatami", {"bg":(239,246,255), "accent":(37,99,235)}),
    (19, 1, "例b", "例b", "🤼", "Sới vật Sumo hai võ sĩ thi đấu", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 20
    (20, 1, "例a", "例a", "🌸", "Trang nhật ký 1: Chị dắt em bé đi dạo con đường hoa", {"bg":(239,246,255), "accent":(37,99,235)}),
    (20, 1, "例b", "例b", "🍛", "Trang nhật ký 2: Đĩa cơm cà ri cay phồng má", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 21
    (21, 1, "例a", "例a", "🍵", "CLB Trà đạo: Nữ sinh mặc kimono quỳ pha trà", {"bg":(239,246,255), "accent":(37,99,235)}),
    (21, 1, "例b", "例b", "🖌️", "CLB Thư pháp: Bút lông viết chữ Hán 夢", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 22
    (22, 1, "例a", "例a", "🍛", "Nồi cơm cà ri bốc khói do Miller nấu", {"bg":(239,246,255), "accent":(37,99,235)}),
    (22, 1, "例b", "例b", "🗼", "Màn hình điện thoại chụp kỷ niệm Tháp Tokyo", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 23
    (23, 1, "例a", "例a", "💡", "Cảm biến ánh sáng: Cửa mở đèn tự sáng", {"bg":(239,246,255), "accent":(37,99,235)}),
    (23, 1, "例b", "例b", "☕", "Máy pha cà phê tự động nhét đồng xu 100 yen", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 24
    (24, 1, "例a", "例a", "🏫", "Tình nguyện viên dạy Hiragana trên bảng trắng", {"bg":(239,246,255), "accent":(37,99,235)}),
    (24, 1, "例b", "例b", "🏥", "Tình nguyện viên dìu cô gái đến bệnh viện khám", {"bg":(240,253,250), "accent":(13,148,136)}),

    # Lesson 25
    (25, 1, "例a", "例a", "💻", "Chàng trai trí thức đeo kính chăm chú bên laptop", {"bg":(239,246,255), "accent":(37,99,235)}),
    (25, 1, "例b", "例b", "🤵", "Chàng trai nụ cười ấm áp hài hước", {"bg":(240,253,250), "accent":(13,148,136)}),
]

def render_card(out_fe_path, out_be_path, lesson_no, title, label_code, icon_symbol, subtext, color_theme):
    width, height = 600, 400
    img = Image.new('RGB', (width, height), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)

    bg_color = color_theme.get('bg', (248, 250, 252))
    accent_color = color_theme.get('accent', (16, 185, 129))

    # Background
    draw.rectangle([0, 0, width, height], fill=bg_color)
    draw.rectangle([12, 12, width-12, height-12], fill=(255, 255, 255), outline=(226, 232, 240), width=3)

    # Top Bar
    draw.rectangle([12, 12, width-12, 54], fill=accent_color)

    # Badge
    draw.ellipse([25, 18, 65, 58], fill=(255, 255, 255))
    draw.text((38, 24), label_code.upper()[:2], fill=accent_color, font_size=20)

    # Header Title Text
    draw.text((80, 24), f"Minna no Nihongo N5 - Lesson {lesson_no:02d}", fill=(255, 255, 255), font_size=18)

    # Central Inner Frame
    draw.rounded_rectangle([30, 75, width-30, height-60], radius=16, fill=(248, 250, 252), outline=(203, 213, 225), width=2)

    # Main Visual Icon
    draw.text((width // 2 - 35, height // 2 - 45), icon_symbol, fill=(30, 41, 59), font_size=72)

    # Subtext Description
    if subtext:
        # Wrap text
        words = subtext.split()
        lines = []
        curr = ""
        for w in words:
            if len(curr + " " + w) > 42:
                lines.append(curr)
                curr = w
            else:
                curr = (curr + " " + w).strip()
        if curr: lines.append(curr)

        y_pos = height - 115
        for l in lines[:2]:
            draw.text((width // 2 - (len(l)*4), y_pos), l, fill=(51, 65, 85), font_size=15)
            y_pos += 22

    # Footer
    draw.rectangle([12, height-40, width-12, height-12], fill=(241, 245, 249))
    draw.text((25, height-32), f"Lesson {lesson_no:02d} Listening Exercise Visual Card", fill=(100, 116, 139), font_size=13)

    # Save to both frontend and backend
    os.makedirs(os.path.dirname(out_fe_path), exist_ok=True)
    os.makedirs(os.path.dirname(out_be_path), exist_ok=True)
    img.save(out_fe_path, format='PNG')
    img.save(out_be_path, format='PNG')

print("Generating images across all 25 lessons...")
count = 0
for spec in image_specs:
    l_no, ex_no, label_code, title, icon, subtext, theme = spec
    file_name = f"lesson-{l_no:02d}-listening-{ex_no:02d}-option-{label_code}.png"
    
    fe_path = os.path.join(fe_base, f"lesson-{l_no:02d}", file_name)
    be_path = os.path.join(be_base, f"lesson-{l_no:02d}", file_name)

    render_card(fe_path, be_path, l_no, title, label_code, icon, subtext, theme)
    count += 1

print(f"Successfully generated {count} image cards across all 25 lessons!")
