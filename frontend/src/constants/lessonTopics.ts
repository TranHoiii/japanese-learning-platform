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
