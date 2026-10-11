export interface LessonTopicInfo {
  title: string;
  desc: string;
}

export const MINNA_LESSON_TOPICS: Record<number, LessonTopicInfo> = {
  1: {
    title: "Giới thiệu bản thân & Chào hỏi",
    desc: "Đại từ nhân xưng, quốc tịch, nghề nghiệp cơ bản (わたし、あなた、～さん、～じん).",
  },
  2: {
    title: "Đồ vật & Sở hữu xung quanh",
    desc: "Chỉ từ これ, それ, あれ và mẫu câu sở hữu, hỏi đồ vật của ai (だれの).",
  },
  3: {
    title: "Địa điểm & Vị trí nơi chốn",
    desc: "Chỉ từ ここ, そこ, あそこ, hỏi giá tiền (いくら) và các phòng ban trường học.",
  },
  4: {
    title: "Thời gian & Hoạt động hàng ngày",
    desc: "Hỏi giờ giấc (なんじ), ngày trong tuần, động từ thì hiện tại và quá khứ ます/ました.",
  },
  5: {
    title: "Đi lại & Phương tiện di chuyển",
    desc: "Đi đến đâu bằng phương tiện gì (へ, で), đi cùng ai (と), ngày tháng năm.",
  },
  6: {
    title: "Ăn uống & Hành động đối tượng",
    desc: "Trợ từ を chỉ tân ngữ, で chỉ địa điểm hành động, rủ rê ませんか/ましょう.",
  },
  7: {
    title: "Công cụ & Cho nhận quà tặng",
    desc: "Dùng công cụ phương tiện (で), cho tặng và nhận (あげます, もらいます).",
  },
  8: {
    title: "Tính từ miêu tả tính chất",
    desc: "Tính từ đuôi い và đuôi な, miêu tả con người, thời tiết, sự vật hiện tượng.",
  },
  9: {
    title: "Sở thích & Năng lực bản thân",
    desc: "Trợ từ が chỉ sở thích, năng khiếu và sở hữu (すき, じょうず, わかります, あります).",
  },
  10: {
    title: "Sự tồn tại của người & vật",
    desc: "Động từ います (người, động vật) và あります (đồ vật, cây cối), vị trí trên dưới trong ngoài.",
  },
  11: {
    title: "Lượng từ & Số đếm thời gian",
    desc: "Số đếm người, vật thể mỏng, máy móc, khoảng thời gian và tần suất làm việc.",
  },
  12: {
    title: "So sánh hơn & So sánh nhất",
    desc: "So sánh 2 đối tượng (より...のほうが), so sánh trong tập hợp (で...がいちばん).",
  },
  13: {
    title: "Mong muốn & Mục đích di chuyển",
    desc: "Mẫu câu ほしい (muốn có), Vたい (muốn làm) và Vにいきます (đi đâu để làm gì).",
  },
  14: {
    title: "Thể Te: Sai khiến & Yêu cầu",
    desc: "Quy tắc chia động từ thể て, nhờ vả lịch sự (てください), hành động đang diễn ra (ています).",
  },
  15: {
    title: "Thể Te: Cho phép & Cấm đoán",
    desc: "Được phép làm gì (てもいいですか), không được phép làm gì (てはいけません).",
  },
  16: {
    title: "Trình tự hành động & Nối câu",
    desc: "Nối hành động liên tiếp (て, てから), miêu tả nhiều đặc điểm tính từ liên kết.",
  },
  17: {
    title: "Thể Nai & Khuyên nhủ cấm chỉ",
    desc: "Chia động từ thể ない, xin đừng làm (ないでください), bắt buộc phải làm (なければなりません).",
  },
  18: {
    title: "Thể Từ điển & Khả năng",
    desc: "Chia thể từ điển (Jishokei), nói về khả năng (ことができます), sở thích (ことです).",
  },
  19: {
    title: "Thể Ta & Kinh nghiệm từng trải",
    desc: "Chia động từ thể た, kinh nghiệm đã từng làm (たことがあります), liệt kê hành động (たり...たり).",
  },
  20: {
    title: "Thể thông thường (Futsuukei)",
    desc: "Giao tiếp thân mật thông thường, chuyển đổi các dạng lịch sự sang thể ngắn thường ngày.",
  },
  21: {
    title: "Ý kiến & Suy nghĩ cá nhân",
    desc: "Bày tỏ quan điểm (とおもいます), trích dẫn lời nói gián tiếp (といいました).",
  },
  22: {
    title: "Mệnh đề bổ ngữ cho danh từ",
    desc: "Định từ hoá mệnh đề, dùng câu ngắn để miêu tả giải thích rõ nghĩa cho danh từ đứng sau.",
  },
  23: {
    title: "Thời điểm & Khi nào (Toki)",
    desc: "Khi làm điều gì đó (とき), hễ mà hành động diễn ra thì kết quả kéo theo tất yếu (と).",
  },
  24: {
    title: "Cho nhận hành động & Giúp đỡ",
    desc: "Làm gì giúp ai hoặc nhờ ai làm giúp (てくれます, てあげます, てもらいます).",
  },
  25: {
    title: "Điều kiện & Giả định (Tara)",
    desc: "Nếu... thì (たら), dù có... đi nữa (ても), hoàn tất trọn vẹn 25 bài sơ cấp N5.",
  },
  26: {
    title: "Giải thích lý do & Thể thông thường",
    desc: "Mẫu câu ～んです biểu đạt thắc mắc, trình bày lý do, hoàn cảnh và yêu cầu giúp đỡ (～んですが).",
  },
  27: {
    title: "Thể khả năng & Năng lực",
    desc: "Động từ thể khả năng (可能形), diễn tả khả năng, điều kiện và sự nhận biết qua thị giác/thính giác (みえます, きこえます).",
  },
  28: {
    title: "Hành động đồng thời & Thói quen",
    desc: "Vừa làm việc này vừa làm việc kia (～ながら), thói quen duy trì (～ています) và liệt kê lý do (～し、～し).",
  },
  29: {
    title: "Trạng thái sự vật & Tự tha động từ",
    desc: "Cặp tự động từ & tha động từ, miêu tả trạng thái kết quả của sự vật hiện tượng (～ています).",
  },
  30: {
    title: "Trạng thái có chủ ý & Chuẩn bị trước",
    desc: "Mẫu câu ～てあります (kết quả do ai đó cố ý làm) và ～ておきます (chuẩn bị sẵn cho tương lai).",
  },
  31: {
    title: "Thể ý chí & Dự định tương lai",
    desc: "Động từ thể ý chí (意向形), diễn đạt dự định cá nhân (～とおもっています, ～つもりです, ～よていです).",
  },
  32: {
    title: "Lời khuyên & Phỏng đoán dự đoán",
    desc: "Khuyên nên/không nên làm gì (～ほうがいい), dự đoán thời tiết/tình huống (～でしょう, ～かもしれません).",
  },
  33: {
    title: "Thể mệnh lệnh & Biển báo ký hiệu",
    desc: "Động từ thể mệnh lệnh & cấm đoán (命令形・禁止形), đọc hiểu biển báo công cộng và trích dẫn thông điệp.",
  },
  34: {
    title: "Làm theo chỉ dẫn & Thứ tự hành động",
    desc: "Làm theo như đã thấy/nghe (～とおりに), sau khi làm gì (～あとで) và làm việc mà không làm gì khác (～ないで).",
  },
  35: {
    title: "Thể điều kiện & Lời khuyên",
    desc: "Động từ & tính từ thể điều kiện (～ば / ～なら), đưa ra lời khuyên và giả định tình huống.",
  },
  36: {
    title: "Mục tiêu & Thay đổi thói quen",
    desc: "Để có thể đạt mục tiêu (～ように), trở nên có thể làm gì (～ようになる), cố gắng duy trì thói quen (～ようにする).",
  },
  37: {
    title: "Thể bị động & Hoàn cảnh tác động",
    desc: "Động từ thể bị động (受身形), diễn tả sự phiền toái hoặc được/bị người khác tác động vào.",
  },
  38: {
    title: "Danh từ hóa mệnh đề (No)",
    desc: "Biến mệnh đề thành danh từ bằng の (～のは, ～のを, ～のが), diễn tả sở thích, việc quên và phát hiện.",
  },
  39: {
    title: "Nguyên nhân & Lý do tự nhiên",
    desc: "Thể て và nguyên nhân bất khả kháng, liên từ chỉ lý do khách quan (～ので, ～て／～で).",
  },
  40: {
    title: "Câu hỏi lồng ghép & Thử nghiệm",
    desc: "Nghi vấn từ lồng ghép trong câu (～か, ～かどうか) và hành động thử nghiệm làm gì đó (～てみます).",
  },
  41: {
    title: "Cho nhận nâng cao & Kính ngữ",
    desc: "Hành động cho nhận với người trên, bề dưới và vật nuôi (～いただきます, ～くださいます, ～やります).",
  },
  42: {
    title: "Mục đích phục vụ & Đánh giá công dụng",
    desc: "Mẫu câu chỉ mục đích cho bản thân/tổ chức (～ために) và công dụng, mức độ cần thiết (～のに).",
  },
  43: {
    title: "Trông có vẻ & Sắp sửa diễn ra",
    desc: "Phán đoán qua vẻ bề ngoài (～そうです [trông có vẻ]) và hành động đi đâu làm gì rồi quay lại (～てきます).",
  },
  44: {
    title: "Quá mức & Mức độ dễ / khó",
    desc: "Làm gì quá mức (～すぎます), sự việc dễ làm (～やすい) hoặc khó làm (～にくい).",
  },
  45: {
    title: "Trường hợp giả định & Bất mãn (Noni)",
    desc: "Trong trường hợp (～ばあいは) và nghịch lý bất ngờ / phàn nàn ngoài mong đợi (～のに [thế mà]).",
  },
  46: {
    title: "Thời điểm hành động & Vừa mới làm",
    desc: "Hành động sắp sửa / đang / vừa mới xong (～ところです) và việc vừa mới xảy ra theo cảm nhận (～ばかりです).",
  },
  47: {
    title: "Nghe nói truyền đạt & Dường như",
    desc: "Truyền đạt lại tin tức nghe được (～そうです [nghe nói]) và phán đoán theo cảm quan suy luận (～ようです).",
  },
  48: {
    title: "Thể sai khiến & Cho phép bắt buộc",
    desc: "Động từ thể sai khiến (使役形 - ～させます), yêu cầu hoặc xin phép người khác cho mình làm gì (～させてください).",
  },
  49: {
    title: "Tôn kính ngữ (Sonkeigo)",
    desc: "Kính ngữ nâng cao vị thế của người đối thoại và khách hàng, các động từ đặc biệt và dạng お～になります.",
  },
  50: {
    title: "Khiêm nhường ngữ (Kenjougo)",
    desc: "Kính ngữ hạ mình khi nói về hành động của bản thân, thể お／ご～します và hoàn tất trọn vẹn 50 bài Minnano.",
  },
};

export function getLessonDisplayInfo(
  lessonNumber: number,
  apiTitle?: string | null,
  apiDesc?: string | null
) {
  const topic = MINNA_LESSON_TOPICS[lessonNumber];
  const isGenericTitle =
    !apiTitle ||
    apiTitle.trim() === `Bài ${lessonNumber}` ||
    apiTitle.trim() === `Bài 0${lessonNumber}` ||
    apiTitle.trim() === `Bài ${lessonNumber < 10 ? `0${lessonNumber}` : lessonNumber}`;

  return {
    title: isGenericTitle && topic ? topic.title : apiTitle || `Bài học ${lessonNumber}`,
    desc: apiDesc || topic?.desc || `Hệ thống từ vựng, ngữ pháp và bài tập củng cố Bài ${lessonNumber}.`,
  };
}
