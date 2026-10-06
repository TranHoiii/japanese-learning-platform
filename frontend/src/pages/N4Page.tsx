import React from "react";
import { Link } from "react-router-dom";
import LearningLayout from "../components/learning/LearningLayout";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";

export default function N4Page() {
  return (
    <LearningLayout
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Cấp độ N4", isCurrent: true },
      ]}
      title="Khóa học JLPT N4 (📗 N4)"
      subtitle="Trình độ sơ trung cấp"
      description="Chương trình học tiếng Nhật N4 bao gồm từ vựng, ngữ pháp, kanji và bài tập luyện tập tiếp nối trình độ N5."
    >
      <EmptyState
        icon={
          <svg className="w-10 h-10 text-[#2684D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        }
        title="Chương trình N4 đang được chuẩn bị"
        description="Toàn bộ hệ thống Design System và App Shell của Phase 1 đã hoàn tất. Nội dung bài học N4 sẽ được bổ sung trong các phase kế tiếp."
        action={
          <Link to="/n5/lessons">
            <Button variant="primary" size="default">
              Xem danh sách bài học N5
            </Button>
          </Link>
        }
      />
    </LearningLayout>
  );
}
