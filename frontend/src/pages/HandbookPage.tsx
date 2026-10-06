import React from "react";
import { Link } from "react-router-dom";
import LearningLayout from "../components/learning/LearningLayout";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";

export default function HandbookPage() {
  return (
    <LearningLayout
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Sổ tay", isCurrent: true },
      ]}
      title="Sổ tay Nhật ngữ (📝 Sổ tay)"
      subtitle="Tra cứu nhanh"
      description="Tổng hợp bảng chia động từ, mẫu câu thông dụng và trợ từ tiếng Nhật trọng tâm."
    >
      <EmptyState
        icon={
          <svg className="w-10 h-10 text-[#2684D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        }
        title="Sổ tay học tập đang được hoàn thiện"
        description="Tính năng sổ tay tra cứu sẽ sẵn sàng trong các phase tiếp theo. Bạn có thể sử dụng tính năng tra cứu từ vựng tại trang Tìm kiếm."
        action={
          <Link to="/search">
            <Button variant="primary" size="default">
              Tra cứu từ vựng ngay
            </Button>
          </Link>
        }
      />
    </LearningLayout>
  );
}
