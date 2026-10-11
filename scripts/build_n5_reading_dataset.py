import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Translations dictionary keyed by (lessonNumber, sortOrder)
translations = {
    (1, 1): (
        "Bạn đến từ đâu?\n\n"
        "【Ví dụ】\n"
        "- Xin lỗi, bạn tên là gì vậy?\n"
        "- ...Tôi là Maugham.\n"
        "- Quê hương bạn ở đâu?\n"
        "- ...Là nước Anh. Tôi đến từ London.\n\n"
        "1. Rất vui được gặp bạn. Tôi là Washington. Tôi đến từ nước Mỹ. Nhà tôi ở New York. Rất mong được giúp đỡ.\n"
        "2. Mọi người ơi, đây là anh Nasser.\n"
        "- ...Tôi là Nasser. Tôi đến từ Cairo, Ai Cập. Xin nhờ mọi người giúp đỡ.\n"
        "3. Anh Ho có phải người Trung Quốc không?\n"
        "- ...Không, tôi đến từ Hà Nội, Việt Nam."
    ),
    (2, 1): (
        "Cho tôi một phần nước ép nhé.\n\n"
        "【Tại quầy bán hàng tự động & Cửa hàng tiện lợi】\n"
        "A: Cho tôi hỏi, nước ép táo này giá bao nhiêu tiền vậy?\n"
        "B: Một lon giá 120 yên ạ.\n"
        "A: Vậy cho tôi 2 lon nước ép táo và 1 lon cà phê nhé.\n"
        "B: Vâng, 2 lon nước ép là 240 yên, 1 lon cà phê 130 yên, tổng cộng hết 370 yên ạ.\n"
        "A: Gửi bạn 500 yên.\n"
        "B: Xin nhận 500 yên, gửi lại bạn 130 yên tiền thừa. Xin cảm ơn quý khách!"
    ),
    (3, 1): (
        "Đến Kobe hết bao nhiêu tiền?\n\n"
        "【Tại nhà ga xe điện】\n"
        "Hành khách: Xin lỗi cho tôi hỏi, đi đến Kobe thì hết bao nhiêu tiền vé vậy?\n"
        "Nhân viên nhà ga: Đến Kobe là 560 yên nhé.\n"
        "Hành khách: Đi chuyến tàu nào thì được ạ?\n"
        "Nhân viên nhà ga: Xin hãy đi chuyến tàu hỏa nhanh số 5 ở sân ga số 3 nhé.\n"
        "Hành khách: Mất bao lâu thời gian vậy?\n"
        "Nhân viên nhà ga: Mất khoảng tầm 40 phút là tới nơi."
    ),
    (4, 1): (
        "Khi nào bạn sẽ đi?\n\n"
        "【Lịch trình tuần này】\n"
        "- Thứ Hai và thứ Ba: Đi học ở trường từ 9 giờ sáng đến 3 giờ chiều.\n"
        "- Thứ Tư: Buổi sáng nghỉ ngơi ở nhà, buổi chiều đi thư viện cùng bạn bè.\n"
        "- Thứ Năm: Có bài kiểm tra tiếng Nhật buổi sáng, buổi chiều đi làm thêm tại nhà hàng.\n"
        "- Thứ Sáu: Đi bảo tàng mỹ thuật cùng gia đình vào lúc 10 giờ sáng.\n"
        "- Thứ Bảy và Chủ Nhật: Đi du lịch dã ngoại và nghỉ ngơi."
    ),
    (5, 1): (
        "Đi bằng chuyến máy bay mấy giờ vậy?\n\n"
        "A: Ngày mai anh Tanaka đi công tác ở Fukuoka đúng không?\n"
        "B: Vâng, đúng vậy. Tôi đi bằng máy bay.\n"
        "A: Anh đi chuyến bay lúc mấy giờ thế?\n"
        "B: Tôi đi chuyến 10 giờ 15 phút sáng từ sân bay Haneda.\n"
        "A: Vậy mấy giờ anh phải ra sân bay?\n"
        "B: Khoảng 8 giờ 30 phút tôi sẽ đi tàu điện từ ga Tokyo ra sân bay."
    ),
    (6, 1): (
        "Cùng đi ngắm hoa anh đào nhé!\n\n"
        "Bạn có muốn cùng đi ngắm hoa anh đào ở núi Yoshino tỉnh Nara không?\n"
        "Chúng ta sẽ đi ngắm hoa anh đào ở núi Yoshino.\n"
        "Chúng ta sẽ đi bằng tàu điện và cáp treo.\n"
        "Chúng ta sẽ cùng ăn bữa trưa trên núi Yoshino.\n"
        "Cùng chụp thật nhiều ảnh hoa anh đào nhé!\n"
        "Mọi người hãy cùng đi nào!\n\n"
        "- Thời gian: Ngày 18 tháng 4 (Thứ Bảy)\n"
        "- Địa điểm tập trung: Gặp nhau tại ga Abenobashi lúc 7 giờ 30 phút sáng\n"
        "- Chi phí: 2.550 yên (tiền tàu điện, cáp treo)\n"
        "- Đồ cần mang theo: Cơm hộp (bento), đồ uống\n"
        "- Đăng ký: Liên hệ anh Tanaka (Điện thoại: 194-0873)\n"
        "* Trời mưa: Sẽ hủy không đi."
    ),
    (7, 1): (
        "Nhận được quà & Tặng quà\n\n"
        "Ngày sinh nhật và các ngày kỷ niệm là dịp đặc biệt để mọi người tặng quà cho nhau.\n"
        "Vào Ngày của Mẹ, tôi đã tặng hoa cẩm chướng đỏ và một tấm thiệp cảm ơn cho mẹ. Mẹ tôi rất vui và xúc động.\n"
        "Vào ngày sinh nhật của bố, em trai tôi đã tặng bố một chiếc cà vạt màu xanh thẫm rất đẹp.\n"
        "Còn vào ngày sinh nhật của tôi tuần trước, bạn bè đã cùng tổ chức tiệc bất ngờ và tặng tôi một cuốn từ điển tiếng Nhật hữu ích."
    ),
    (8, 1): (
        "Cuộc sống ở Thành phố & Cuộc sống ở Nông thôn\n\n"
        "[Thư gửi ngày 3 tháng 12 - Từ Machida Taro]\n"
        "Anh Yamakawa dạo này có khỏe không?\n"
        "Đã là tháng 12 rồi. Trời lạnh nhỉ. Thành phố bây giờ đang rất náo nhiệt và lộng lẫy ánh đèn.\n"
        "Công việc của tôi khá bận rộn nhưng rất thú vị.\n"
        "Dịp Tết này anh có muốn đến chơi nhà tôi không? Chúng ta hãy cùng nhau tổ chức một bữa tiệc đón năm mới thật vui vẻ nhé!\n\n"
        "[Thư gửi ngày 7 tháng 1 - Từ Yamakawa Ken]\n"
        "Anh Machida thân mến, tuần trước cảm ơn anh rất nhiều.\n"
        "Cuộc sống ở thành phố thật thú vị và tiện lợi. Thế nhưng rất bận rộn, đồ ăn thức uống cũng đắt đỏ. Sống ở thành phố cũng vất vả nhỉ.\n"
        "Cuộc sống ở nông thôn tuy không tiện nghi bằng nhưng rất yên bình, tĩnh lặng. Cảnh núi non ở đây vô cùng tươi đẹp.\n"
        "Lần tới anh hãy ghé về nhà tôi chơi nhé. Rau củ quả ở đây rất tươi ngon đấy. Chúng ta hãy cùng nhau dùng bữa nhé!"
    ),
    (9, 1): (
        "Tôi yêu thích nước Nhật\n\n"
        "Chúng tôi đã thực hiện một cuộc phỏng vấn với các bạn nước ngoài đang sống và làm việc tại Nhật Bản.\n"
        "- Chị Maria (người Brazil): 'Tôi rất thích các món ăn Nhật Bản, đặc biệt là Sushi và Tempura. Người Nhật rất thân thiện và tốt bụng.'\n"
        "- Anh Santos (người Mexico): 'Giao thông ở Nhật vô cùng tiện lợi. Tàu điện luôn đúng giờ từng phút. Tuy nhiên giá nhà ở Tokyo hơi đắt.'\n"
        "- Chị Karina (người Indonesia): 'Bốn mùa ở Nhật Bản rất rõ rệt và tuyệt đẹp. Tôi thích nhất là mùa thu khi lá cây chuyển sang màu đỏ rực rỡ.'"
    ),
    (10, 1): (
        "Bảo tàng mỹ thuật\n\n"
        "Chào mừng quý khách đến với Bảo tàng Mỹ thuật thành phố.\n"
        "- Tầng 1: Quầy bán vé và gửi đồ ở ngay gần lối vào. Quán cà phê và cửa hàng lưu niệm nằm ở phía bên phải.\n"
        "- Tầng 2: Khu trưng bày tranh truyền thống Nhật Bản (Nihonga) và tranh khắc gỗ Ukiyo-e.\n"
        "- Tầng 3: Khu trưng bày nghệ thuật điêu khắc hiện đại và các tác phẩm hội họa phương Tây.\n"
        "- Nhà vệ sinh được bố trí ở góc hành lang mỗi tầng cạnh cầu thang bộ.\n"
        "* Xin lưu ý: Quý khách không được chụp ảnh có đèn flash và không được mang đồ ăn uống vào phòng trưng bày."
    ),
    (11, 1): (
        "Lễ hội Nhật Bản\n\n"
        "Nhật Bản có rất nhiều lễ hội truyền thống đặc sắc diễn ra suốt bốn mùa.\n"
        "- Lễ hội Nebuta ở Aomori diễn ra vào đầu tháng 8 với những cỗ xe đèn lồng khổng lồ rực rỡ hình các võ sĩ dũng mãnh.\n"
        "- Lễ hội Gion ở Kyoto là một trong những lễ hội lâu đời nhất Nhật Bản, kéo dài suốt tháng 7 với các cuộc diễu hành xe rước Yamahoko cổ kính.\n"
        "- Lễ hội múa Awa Odori ở Tokushima nổi tiếng với điệu múa vui nhộn và câu ca: 'Kẻ múa là kẻ dại, người xem cũng là kẻ dại, cùng là dại thì cùng múa thôi!'"
    ),
    (11, 2): (
        "Cùng đi lễ hội nào!\n\n"
        "Thông báo về Lễ hội Mùa hè khu phố:\n"
        "- Thời gian: Ngày 25 tháng 7 (Chủ Nhật), từ 16:00 đến 21:00\n"
        "- Địa điểm: Quảng trường công viên Trung Tâm\n"
        "- Các hoạt động thú vị: Múa Bon Odori, gian hàng vớt cá vàng, bắn súng nhận quà, thưởng thức bánh Takoyaki và Yakisoba nóng hổi.\n"
        "- Màn bắn pháo hoa bắt đầu lúc 20:00.\n"
        "- Vào cửa miễn phí. Mọi người hãy mặc áo Yukata và cùng gia đình, bạn bè tham gia nhé!"
    ),
    (12, 1): (
        "Chuyến du lịch Okinawa\n\n"
        "Kỳ nghỉ hè vừa rồi, tôi đã có chuyến du lịch 4 ngày 3 đêm tới hòn đảo Okinawa xinh đẹp.\n"
        "Thời tiết ở Okinawa ngập tràn ánh nắng ấm áp. Biển xanh trong vắt nhìn thấy cả những rặng san hô và đàn cá bơi lội.\n"
        "Tôi đã được thử lặn biển, tham quan Thủy cung Churaumi nổi tiếng và ăn món mì Okinawa Soba đậm đà.\n"
        "Người dân nơi đây rất cởi mở, thân thiện và nhiệt tình chỉ đường. Đó là một chuyến đi vô cùng đáng nhớ đối với tôi."
    ),
    (12, 2): (
        "Câu đố: Thế giới và Nhật Bản\n\n"
        "Cùng thử tài hiểu biết với các câu hỏi về địa lý thế giới và Nhật Bản nhé!\n"
        "1. Ngọn núi cao nhất Nhật Bản là núi nào? (Núi Phú Sĩ - 3.776 mét)\n"
        "2. Hồ nước ngọt lớn nhất Nhật Bản là hồ nào? (Hồ Biwa ở tỉnh Shiga)\n"
        "3. Con sông dài nhất Nhật Bản là sông nào? (Sông Shinano dài 367 km)\n"
        "4. Dân số Nhật Bản hiện nay khoảng bao nhiêu người? (Khoảng 125 triệu người)"
    ),
    (13, 1): (
        "Trúng vé số\n\n"
        "Hôm qua, tôi đã mua một tờ vé số Giáng Sinh (Nenmatsu Jumbo).\n"
        "Nếu trúng giải độc đắc 300 triệu yên thì tôi sẽ làm gì nhỉ?\n"
        "Đầu tiên, tôi sẽ mua cho bố mẹ một căn nhà khang trang có sân vườn rộng ở ngoại ô.\n"
        "Sau đó, tôi sẽ mua một chiếc ô tô thật xịn và đi du lịch vòng quanh thế giới cùng bạn bè.\n"
        "Tôi cũng sẽ dành một phần tiền để quyên góp giúp đỡ những người có hoàn cảnh khó khăn.\n"
        "Nghĩ đến thôi đã thấy hào hứng rồi, nhưng trước hết phải đợi đến ngày quay thưởng đã!"
    ),
    (14, 1): (
        "Thư Video\n\n"
        "Gửi mẹ thân yêu,\n"
        "Đã 3 tháng trôi qua kể từ khi con sang Nhật Bản du học.\n"
        "Con gửi đoạn video này để mẹ yên tâm về cuộc sống thường ngày của con nhé.\n"
        "Đây là căn phòng trọ nhỏ nhưng rất ấm cúng của con. Con đã tự nấu cơm và nấu súp Miso mỗi ngày.\n"
        "Thầy cô ở trường tiếng Nhật dạy rất nhiệt tình, các bạn cùng lớp đến từ nhiều quốc gia khác nhau đều rất thân thiện.\n"
        "Thời tiết dạo này bắt đầu trở lạnh rồi, mẹ ở quê nhớ giữ ấm và giữ gìn sức khỏe nhé!"
    ),
    (14, 2): (
        "Bảng tin nhắn của mọi người\n\n"
        "1. [Tìm bạn cùng học]: Tôi là sinh viên năm thứ 2, muốn tìm bạn học cùng giao tiếp tiếng Nhật và trao đổi ngôn ngữ vào chiều thứ Bảy hàng tuần.\n"
        "2. [Tặng đồ cũ]: Tôi sắp chuyển nhà nên muốn tặng lại một chiếc tủ lạnh mini và bàn học còn dùng rất tốt. Ai có nhu cầu xin liên hệ số 090-1234-5678.\n"
        "3. [Rủ chơi thể thao]: Câu lạc bộ cầu lông tuyển thành viên mới, sinh hoạt lúc 18:00 thứ Tư tại nhà thi đấu quận."
    ),
    (15, 1): (
        "Trường trung học phổ thông ở Nhật Bản\n\n"
        "Tại Nhật Bản, sau khi tốt nghiệp trung học cơ sở (cấp 2), hầu hết các học sinh đều thi vào trung học phổ thông (cấp 3).\n"
        "Các trường cấp 3 thường có đồng phục riêng rất đẹp mắt.\n"
        "Giờ học bắt đầu từ khoảng 8:30 sáng và kết thúc lúc 15:30 chiều.\n"
        "Sau giờ học chính khóa, hầu hết học sinh đều tham gia các câu lạc bộ (Bukatsu) như bóng đá, bóng chày, kendo, hoặc câu lạc bộ văn hóa như thư pháp, trà đạo, nhạc cụ.\n"
        "Hoạt động câu lạc bộ giúp rèn luyện thể chất, tinh thần kỷ luật và gắn kết tình bạn sâu sắc."
    ),
    (15, 2): (
        "Khảo sát học sinh cấp 3 Nhật Bản\n\n"
        "Kết quả khảo sát 1.000 học sinh cấp 3 trên toàn quốc:\n"
        "1. Số tiền tiêu vặt mỗi tháng trung bình: Khoảng 5.000 đến 6.000 yên.\n"
        "2. Thời gian sử dụng điện thoại thông minh mỗi ngày: Trung bình từ 3 đến 4 tiếng (dùng mạng xã hội, xem video, nhắn tin).\n"
        "3. Dự định sau khi tốt nghiệp: 55% muốn học tiếp lên Đại học, 25% học trường chuyên môn, 15% đi làm ngay, 5% dự định khác."
    ),
    (16, 1): (
        "Những loài động vật trong truyền thuyết\n\n"
        "Văn hóa dân gian Nhật Bản có nhiều loài sinh vật kỳ bí trong truyền thuyết:\n"
        "- Kappa (Hà bá): Sinh vật sống dưới nước, trên đỉnh đầu có một cái đĩa chứa nước. Nếu nước trên đĩa bị đổ hết, Kappa sẽ mất đi sức mạnh. Món ăn ưa thích của nó là dưa chuột.\n"
        "- Tengu (Thiên cẩu): Sinh vật sống trên núi sâu, có đôi cánh lớn và chiếc mũi rất dài màu đỏ, tay cầm chiếc quạt lông vũ có thể tạo ra cuồng phong.\n"
        "- Tanuki (Chồn gốm/Tanuki biến hình): Loài vật tinh nghịch có khả năng biến hình thành đồ vật hoặc con người để trêu chọc mọi người, thường mang bầu rượu và bình yên."
    ),
    (17, 1): (
        "Thời kỳ Edo\n\n"
        "Thời kỳ Edo (từ năm 1603 đến năm 1867) do Mạc phủ Tokugawa cai trị kéo dài hơn 260 năm trong hòa bình.\n"
        "Thủ phủ Edo ngày xưa chính là thủ đô Tokyo ngày nay.\n"
        "Vào thời kỳ này, kinh tế và văn hóa dân gian phát triển rực rỡ: nghệ thuật kịch Kabuki, tranh khắc gỗ Ukiyo-e, các quán trọ và tiệm mì Soba ven đường trở nên phổ biến.\n"
        "Người dân thời Edo rất có ý thức giữ gìn vệ sinh và tái chế đồ dùng cũ, biến Edo thành một trong những đô thị sạch sẽ và đông dân nhất thế giới thời bấy giờ."
    ),
    (18, 1): (
        "Du lịch tự túc hay Du lịch theo đoàn?\n\n"
        "Mỗi hình thức du lịch đều có những ưu điểm và nhược điểm riêng:\n"
        "- Du lịch theo đoàn (Tour): An toàn, có hướng dẫn viên lo liệu từ xe cộ, khách sạn đến ăn uống, không phải tự tìm đường. Tuy nhiên lịch trình cố định gò bó, không có nhiều thời gian tự do.\n"
        "- Du lịch tự túc (Cá nhân): Tự do quyết định nơi muốn đến, thời gian ở lại bao lâu tùy thích, trải nghiệm cuộc sống địa phương chân thực. Ngược lại, bạn phải tự lên kế hoạch chi tiết, đặt vé và xử lý các sự cố phát sinh."
    ),
    (18, 2): (
        "Đây là nơi nào?\n\n"
        "Hãy nhìn các biển chỉ dẫn và hình vẽ để đoán các địa điểm công cộng quen thuộc:\n"
        "A: Nhà ga xe điện (có biển thông báo giờ tàu chạy và cổng soát vé tự động)\n"
        "B: Bưu điện (có biểu tượng dấu bưu điện 〒 màu đỏ và hòm thư)\n"
        "C: Ngân hàng hoặc cây rút tiền ATM (có biểu tượng máy rút tiền và tiền mặt)\n"
        "D: Bệnh viện / Phòng khám (có chữ thập và biểu tượng cấp cứu)"
    ),
    (19, 1): (
        "Đấu vật Sumo\n\n"
        "Sumo là môn quốc võ truyền thống của Nhật Bản với lịch sử hơn 1.300 năm.\n"
        "Ban đầu, Sumo là một nghi lễ tôn giáo Thần đạo (Shinto) nhằm cầu chúc mùa màng bội thu.\n"
        "Đến thời kỳ Edo, Sumo đã phát triển thành một môn thể thao chuyên nghiệp được đông đảo dân chúng yêu thích.\n"
        "Các võ sĩ Sumo (Rikishi) sống tập trung trong các lò võ (Beya), thức dậy tập luyện từ sáng sớm và ăn món lẩu Chankonabe giàu dinh dưỡng để bồi bổ thể lực và vóc dáng."
    ),
    (20, 1): (
        "Cuộc đời của Ino Tadataka\n\n"
        "Ino Tadataka là người đầu tiên đoạt lập bản đồ Nhật Bản chính xác bằng phương pháp đo đạc thực địa.\n"
        "- Năm 1745: Ông sinh ra tại tỉnh Chiba. Từ nhỏ ông đã thông minh và rất ham học hỏi.\n"
        "- Năm 1762: Ông kết hôn và theo họ vợ (Ino), làm ăn buôn bán rượu và gạo rất phát đạt.\n"
        "- Năm 1782: Trong nạn đói Tenmei, ông đã xuất tiền gạo cứu giúp dân làng qua cơn hoạn nạn.\n"
        "- Năm 1795: Ở tuổi 50, ông bàn giao công việc cho con trai rồi lên Edo học thiên văn học và trắc địa.\n"
        "- Từ năm 1800 đến 1816 (từ 55 đến 71 tuổi): Ông đã đi bộ bằng chính đôi chân của mình khắp nước Nhật để đo đạc và vẽ bản đồ.\n"
        "- Năm 1818: Ông qua đời.\n"
        "- Năm 1821: Bộ bản đồ 'Đại Nhật Bản Duyên hải Dư địa Toàn đồ' hoàn thành, chuẩn xác đến kinh ngạc.\n"
        "- Năm 1995: Hình ảnh của ông được in lên tem bưu chính Nhật Bản để vinh danh."
    ),
    (20, 2): (
        "Câu đố: Ký hiệu bản đồ Nhật Bản\n\n"
        "Cùng kiểm tra kiến thức về các ký hiệu quy ước trên bản đồ địa lý Nhật Bản:\n"
        "1. Ký hiệu chữ '文' biểu thị trường học (trường tiểu học, trung học cơ sở).\n"
        "2. Ký hiệu chữ thập trong vòng tròn biểu thị trạm y tế hoặc bệnh viện.\n"
        "3. Ký hiệu chữ '〒' biểu thị bưu điện.\n"
        "4. Ký hiệu hai vòng tròn đồng tâm biểu thị tòa thị chính / ủy ban nhân dân quận, thành phố.\n"
        "5. Ký hiệu hình chiếc đền cổng Torii biểu thị đền Thần đạo (Jinja)."
    ),
    (20, 3): (
        "Câu đố: Địa lý Nhật Bản\n\n"
        "1. Thủ đô của Nhật Bản hiện nay là thành phố nào? (Tokyo)\n"
        "2. Tỉnh hoặc vùng có diện tích lớn nhất Nhật Bản là đâu? (Hokkaido)\n"
        "3. Nhật Bản gồm có 4 hòn đảo chính là: Honshu, Hokkaido, Kyushu và Shikoku.\n"
        "4. Tỉnh nổi tiếng với núi Phú Sĩ và suối nước nóng là tỉnh Shizuoka và Yamanashi."
    ),
    (21, 1): (
        "Mưa rơi đất lại càng rắn chắc\n\n"
        "Người Nhật có câu tục ngữ: 'Mưa xong thì đất cứng lại' (Ame futte ji katamaru), mang ý nghĩa sau những bất đồng, cãi vã hay khó khăn, mối quan hệ giữa người với người lại càng thêm khăng khít, thấu hiểu nhau hơn.\n\n"
        "[Tâm sự của người chồng 28 tuổi]:\n"
        "'Chúng tôi mới kết hôn năm ngoái. Vợ tôi cũng đi làm nên việc nhà cả hai cùng chia sẻ. Thứ Hai và thứ Năm là ngày vứt rác, bình thường tôi là người đi vứt. Nhưng tối thứ Hai tuần trước, nhìn túi rác vợ bảo: 'Hôm nay là ngày rác đấy nhé'. Tôi bảo: 'Sáng nay anh vội, em vứt hộ anh một hôm có sao đâu'. Vợ đáp: 'Anh chẳng bảo gì cả, em có biết đâu'. Cả hai đều cho là mình đúng rồi giận nhau, không ai nói với ai câu nào. Tôi rất muốn làm hòa, xin bác sĩ/chuyên gia cho tôi lời khuyên.'\n\n"
        "[Lời khuyên của chuyên gia Nakagawa Hanako]:\n"
        "'Trước tiên, bạn hãy mua hoa mang về nhà và chủ động nói: 'Anh xin lỗi nhé'. Chắc chắn người vợ cũng đang muốn làm hòa với bạn đấy. Cuộc sống hôn nhân không phải lúc nào cũng êm ả, thỉnh thoảng cãi cọ là điều bình thường. Hai vợ chồng qua cãi vã, hiểu nhau rồi làm hòa, tình cảm sẽ ngày càng bền chặt như câu 'mưa rơi đất lại càng rắn chắc' vậy.'"
    ),
    (21, 2): (
        "Kết hôn!!??\n\n"
        "Khảo sát ý kiến của thanh niên thế hệ trẻ về hôn nhân và gia đình:\n"
        "- Điều quan trọng nhất khi lựa chọn bạn đời: 82% người trả lời chọn 'sự thấu hiểu và hòa hợp về tính cách, quan điểm sống'.\n"
        "- Về việc chia sẻ việc nhà và chăm sóc con cái: 90% cho rằng vợ chồng phải bình đẳng cùng làm việc nhà.\n"
        "- Về độ tuổi kết hôn lý tưởng: Trung bình nam giới là khoảng 28-30 tuổi, nữ giới khoảng 26-29 tuổi."
    ),
    (22, 1): (
        "Lịch sử Phát sóng Truyền hình Nhật Bản\n\n"
        "Chương trình truyền hình đầu tiên tại Nhật Bản được phát sóng vào ngày 1 tháng 2 năm 1953.\n"
        "Vào thời điểm đó, trên toàn nước Nhật chỉ có vỏn vẹn 866 người sở hữu máy thu hình, nguyên nhân là do giá một chiếc TV lúc ấy vô cùng đắt đỏ.\n"
        "Cột mốc bùng nổ số lượng TV tại Nhật Bản chính là Lễ thành hôn của Hoàng thái tử vào năm 1959. Mọi người đều mong muốn được tận mắt chứng kiến lễ diễu hành đám cưới hoàng gia qua màn ảnh nhỏ, khiến số lượng TV bán ra nhanh chóng vượt mốc 2 triệu chiếc."
    ),
    (22, 2): (
        "Chương trình truyền hình\n\n"
        "Hãy cùng theo dõi lịch phát sóng truyền hình buổi tối trên các kênh:\n"
        "- Kênh 1: 19:00 Thời sự 7 giờ; 19:30 Khám phá thiên nhiên kỳ thú\n"
        "- Kênh 3: 20:00 Phim truyền hình dài tập (Drama gia đình ấm áp)\n"
        "- Kênh 6: 18:30 Trực tiếp trận đấu bóng chày đỉnh cao\n"
        "- Kênh 9: 22:00 Bản tin thời sự chuyên sâu News Night"
    ),
    (22, 3): (
        "Tháp Tokyo Skytree và Chùa Horyuji\n\n"
        "Tháp truyền hình Tokyo Skytree có chiều cao 634 mét, là tháp truyền hình tự đứng cao nhất thế giới.\n"
        "Điều đặc biệt là công nghệ chống chịu động đất của Skytree được kế thừa từ kỹ thuật kiến trúc cổ của tháp năm tầng chùa Horyuji ở Nara xây dựng từ thế kỷ thứ 7.\n"
        "Ở giữa tháp có một cây cột trụ khổng lồ bằng bê tông cốt thép gọi là 'Shinbashira' (trụ tâm). Khi có rung chấn động đất, trụ tâm dao động ngược pha với cấu trúc bên ngoài, giúp triệt tiêu lực rung và ngăn tháp sụp đổ qua hàng ngàn năm lịch sử."
    ),
    (23, 1): (
        "Uống cà phê có tác dụng gì?\n\n"
        "Cà phê lần đầu tiên được các thương nhân Hà Lan mang đến Nhật Bản khoảng 200 năm trước.\n"
        "Ban đầu, người Nhật cảm thấy cà phê rất đắng và khó uống. Nhưng ngày nay, cà phê đã trở thành thức uống phổ biến khắp nước Nhật.\n"
        "Khi uống cà phê, chất caffeine giúp não bộ tỉnh táo, tăng cường sự tập trung khi học tập và làm việc.\n"
        "Ngoài ra, các nghiên cứu khoa học gần đây còn chỉ ra rằng hương thơm của cà phê giúp thư giãn tinh thần, và uống với lượng vừa phải rất có lợi cho tim mạch và sức khỏe."
    ),
    (24, 1): (
        "Xin hãy nói bằng tiếng Nhật!\n\n"
        "Tôi tên là Alain, hiện đang sinh sống và làm việc tại thành phố Osaka.\n"
        "Khi mới sang Nhật Bản, tôi chưa nói được nhiều tiếng Nhật. Nhưng mỗi khi tôi mở lời hỏi đường hay mua hàng ở siêu thị, mọi người xung quanh đều niềm nở trả lời lại bằng tiếng Anh.\n"
        "Dù mọi người rất tốt bụng và chu đáo, nhưng vì muốn nhanh chóng nâng cao vốn tiếng Nhật, tôi đã chủ động nói: 'Tôi đang học tiếng Nhật, xin hãy nói chuyện với tôi bằng tiếng Nhật nhé!'.\n"
        "Từ đó, các bác hàng xóm và thu ngân siêu thị đã nhiệt tình chỉ cho tôi thêm nhiều từ vựng và cách nói chuyện đậm chất Kansai rất thú vị."
    ),
    (24, 2): (
        "Từ đó có phải là tiếng Anh không?\n\n"
        "Trong tiếng Nhật có rất nhiều từ mượn Katakana, nhưng có những từ do người Nhật tự sáng tạo (Wasei Eigo) mà người bản xứ tiếng Anh nghe sẽ không hiểu:\n"
        "- 'Mansion' (マンション): Ở Nhật dùng để chỉ căn hộ chung cư cao cấp, trong khi tiếng Anh nghĩa là biệt thự xa hoa.\n"
        "- 'Salaryman' (サラリーマン): Nhân viên công sở làm công ăn lương.\n"
        "- 'Skinship' (スキンシップ): Sự gần gũi, tiếp xúc thân mật về mặt thể xác giữa cha mẹ và con cái hoặc bạn bè.\n"
        "- 'Claim' (クレーム): Lời phàn nàn, khiếu nại của khách hàng (tiếng Anh là Complaint)."
    ),
    (25, 1): (
        "Tương lai của chúng mình...\n\n"
        "Ba bạn học sinh lớp 12 chia sẻ về định hướng tương lai sau khi tốt nghiệp cấp 3:\n"
        "- Bạn Demoto: 'Sau khi tốt nghiệp, mình sẽ không thi đại học mà theo học trường trung cấp dạy nấu ăn. Ước mơ lớn nhất của mình là tương lai mở được một nhà hàng của riêng mình.'\n"
        "- Bạn Kawada: 'Mình sẽ thi vào trường đại học kinh tế giống như kỳ vọng của bố mẹ. Sau này ra trường mình muốn làm việc tại một tập đoàn thương mại quốc tế.'\n"
        "- Bạn Hayashi: 'Mình đam mê vẽ tranh truyện Manga. Mình sẽ vừa đi làm thêm tích lũy kinh nghiệm vừa sáng tác và gửi bài dự thi cho các nhà xuất bản.'"
    ),
    (25, 2): (
        "Quan điểm sống của giới trẻ\n\n"
        "Kết quả khảo sát về quan niệm sống và giá trị nghề nghiệp của thanh niên các nước (theo Báo cáo Điều tra Thanh niên Thế giới của Nội các Nhật Bản):\n"
        "1. Về câu hỏi: 'Ưu tiên cuộc sống cá nhân hơn công việc': Nước có tỷ lệ đồng tình cao nhất là Pháp (trên 60%), trong khi Nhật Bản có xu hướng cân bằng giữa hai yếu tố.\n"
        "2. Về tiêu chí quan trọng nhất khi lựa chọn công việc của thanh niên Nhật Bản: 'Thu nhập ổn định' và 'Môi trường làm việc thân thiện' là hai yếu tố được ưu tiên hàng đầu."
    )
}

# Load current n5-reading.json
src_path = 'backend/src/main/resources/data/n5-reading.json'
with open(src_path, 'r', encoding='utf-8') as f:
    lessons = json.load(f)

updated_count = 0
for l in lessons:
    l_num = l['lessonNumber']
    for idx, it in enumerate(l['items']):
        sort_order = it.get('sortOrder', idx + 1)
        it['sortOrder'] = sort_order
        
        # 1. Update image URL
        standard_img = f"/media/reading/reading_n5_l{l_num:02d}_r{sort_order:02d}.png"
        it['imageUrl'] = standard_img

        # 2. Update translation
        key = (l_num, sort_order)
        if key in translations:
            it['translation'] = translations[key]
            updated_count += 1
        else:
            print(f"Warning: No translation for {key}")

print(f"Updated {updated_count} items with translations and standard images.")

# Save updated JSON
with open(src_path, 'w', encoding='utf-8') as f:
    json.dump(lessons, f, ensure_ascii=False, indent=2)

print("Saved updated backend/src/main/resources/data/n5-reading.json successfully.")
