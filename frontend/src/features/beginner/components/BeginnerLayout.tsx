import React from "react";
import LearningLayout from "../../../components/learning/LearningLayout";
import { BreadcrumbItem } from "../../../components/learning/Breadcrumb";
import Badge from "../../../components/ui/Badge";

export interface BeginnerLayoutProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  narrow?: boolean;
}

export const BeginnerLayout: React.FC<BeginnerLayoutProps> = ({
  breadcrumbs,
  title,
  subtitle = "Tủ sách Sơ cấp • Tra cứu & Luyện tập",
  description,
  actions,
  children,
  narrow = false,
}) => {
  // Ensure default base breadcrumbs if not fully provided
  const resolvedBreadcrumbs: BreadcrumbItem[] = breadcrumbs || [
    { label: "Trang chủ", href: "/" },
    { label: "Sơ cấp", href: "/beginner", isCurrent: true },
  ];

  return (
    <LearningLayout
      breadcrumbs={resolvedBreadcrumbs}
      title={title}
      subtitle={subtitle}
      description={description}
      narrow={narrow}
      actions={
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm" icon={<span aria-hidden="true">🌱</span>}>
            Tài nguyên mở
          </Badge>
          {actions}
        </div>
      }
    >
      <div className="space-y-8 animate-in fade-in duration-300">
        {children}
      </div>
    </LearningLayout>
  );
};

export default BeginnerLayout;
