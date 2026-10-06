import React from "react";
import { cn } from "../../utils/cn";
import Button from "./Button";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  statusCode?: 401 | 403 | 404 | 500 | "network";
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  onRetry?: () => void;
  retryText?: string;
  action?: React.ReactNode;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  statusCode,
  title,
  message,
  icon,
  onRetry,
  retryText = "Thử lại",
  action,
  className,
  ...props
}) => {
  // Preset defaults based on standard status codes
  const presets: Record<
    string,
    { title: string; message: string; icon: React.ReactNode }
  > = {
    401: {
      title: "Cần đăng nhập",
      message: "Bạn cần đăng nhập để truy cập vào nội dung này.",
      icon: (
        <svg className="w-10 h-10 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    403: {
      title: "Không có quyền truy cập",
      message: "Bạn không có quyền xem hoặc thực hiện thao tác trên trang này.",
      icon: (
        <svg className="w-10 h-10 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
    },
    404: {
      title: "Không tìm thấy nội dung",
      message: "Trang hoặc bài học bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.",
      icon: (
        <svg className="w-10 h-10 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    500: {
      title: "Lỗi hệ thống máy chủ",
      message: "Đã xảy ra sự cố từ phía máy chủ. Đội ngũ kỹ thuật đang kiểm tra và khắc phục.",
      icon: (
        <svg className="w-10 h-10 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    network: {
      title: "Lỗi kết nối mạng",
      message: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra đường truyền Internet của bạn.",
      icon: (
        <svg className="w-10 h-10 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 4.243a9 9 0 01-2.829-2.829m0 0L3 21m2.828-8.464a5 5 0 010-7.072m0 0l2.829 2.829" />
        </svg>
      ),
    },
  };

  const preset = statusCode ? presets[statusCode] : null;

  const displayTitle = title || preset?.title || "Không thể tải dữ liệu";
  const displayMessage = message || preset?.message || "Đã có sự cố xảy ra. Vui lòng thử lại.";
  const displayIcon =
    icon ||
    preset?.icon || (
      <svg
        className="w-10 h-10 text-[#EF4444]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    );

  return (
    <div
      role="alert"
      className={cn(
        "rounded-[12px] border border-[#CBD5E1] bg-white p-6 sm:p-8 text-center max-w-md mx-auto my-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)] flex flex-col items-center justify-center space-y-3",
        className,
      )}
      {...props}
    >
      <div className="w-14 h-14 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0 mb-1">
        {displayIcon}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
        {displayTitle}
      </h3>

      <p className="text-sm text-[#64748B] max-w-sm leading-relaxed">
        {displayMessage}
      </p>

      {(onRetry || action) && (
        <div className="pt-2 flex items-center gap-3">
          {onRetry && (
            <Button variant="primary" size="default" onClick={onRetry}>
              {retryText}
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  );
};

export default ErrorState;
