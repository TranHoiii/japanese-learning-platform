import React from "react";
import { Link } from "react-router-dom";
import LearningLayout from "../components/learning/LearningLayout";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

export default function BeginnerPage() {
  const beginnerModules = [
    {
      title: "Bảng chữ cái Hiragana",
      description: "46 ký tự Hiragana căn bản, biến âm, âm ghép và trường âm.",
      icon: "あ",
      status: "Sắp ra mắt",
    },
    {
      title: "Bảng chữ cái Katakana",
      description: "46 ký tự Katakana dùng cho từ mượn, tên riêng và từ ngoại lai.",
      icon: "ア",
      status: "Sắp ra mắt",
    },
    {
      title: "Số đếm & Thời gian",
      description: "Quy tắc đếm số tiếng Nhật, đếm đồ vật, ngày tháng và giờ giấc.",
      icon: "①",
      status: "Sắp ra mắt",
    },
    {
      title: "Quy tắc phát âm",
      description: "Trọng âm, ngắt âm, biến âm và ngữ điệu tự nhiên chuẩn người bản xứ.",
      icon: "🗣️",
      status: "Sắp ra mắt",
    },
  ];

  return (
    <LearningLayout
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Sơ cấp", isCurrent: true },
      ]}
      title="Tiếng Nhật Sơ Cấp (🌱 Sơ cấp)"
      subtitle="Khu vực học tập hạng nhất"
      description="Nền tảng căn bản vững chắc dành riêng cho người Việt bắt đầu học tiếng Nhật. Học phát âm, chữ cái và quy tắc đếm cơ bản."
    >
      <div className="space-y-6">
        <div className="bg-[#F0F7FF] border border-[#BBDDFF] rounded-[12px] p-4 sm:p-5 flex items-start space-x-3.5">
          <div className="text-xl shrink-0 mt-0.5" aria-hidden="true">🌱</div>
          <div className="text-sm text-[#12558F] space-y-1">
            <p className="font-bold">Khu vực học tập Sơ cấp là First-class Area</p>
            <p className="text-[#104673] leading-relaxed">
              Khung giao diện App Shell đã sẵn sàng. Nội dung chi tiết từng phân hệ (Hiragana, Katakana, Số đếm, Phát âm) sẽ được triển khai đầy đủ trong Phase tiếp theo theo đúng lộ trình.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {beginnerModules.map((module, idx) => (
            <Card key={idx} className="flex flex-col justify-between hover:border-[#BBDDFF] transition-all">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-10 h-10 rounded-[8px] bg-[#F0F7FF] text-[#12558F] font-bold text-lg flex items-center justify-center font-japanese">
                    {module.icon}
                  </span>
                  <Badge variant="neutral" size="sm">
                    {module.status}
                  </Badge>
                </div>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" fullWidth disabled>
                  Chưa mở trong Phase 1
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Link to="/n5/lessons">
            <Button variant="secondary" size="default">
              Khám phá bài học N5 có sẵn &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </LearningLayout>
  );
}
