import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component:
 * Tự động reset trạng thái cuộn về đầu trang (scrollTop = 0) mỗi khi chuyển route trong ứng dụng SPA.
 * Hỗ trợ cuộn đến đúng phần tử nếu URL có chứa hash anchor (ví dụ: #faq, #overview).
 * Đồng thời reset cả các container cuộn nội bộ (nested containers với overflow-y-auto).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Nếu có hash trên URL, cuộn đến phần tử tương ứng (tự động offset tránh sticky header)
    if (hash) {
      const targetId = decodeURIComponent(hash.replace("#", ""));
      const scrollToElement = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      // Thực thi ngay hoặc sau một tick nhỏ để DOM component kịp render
      const timeoutId = setTimeout(scrollToElement, 50);
      return () => clearTimeout(timeoutId);
    }

    // Reset cuộn của window về đầu trang
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Reset các container cuộn nội bộ (như layout Admin có main.overflow-y-auto)
    const innerContainers = document.querySelectorAll<HTMLElement>(
      "main.overflow-y-auto, [data-scroll-container]"
    );
    innerContainers.forEach((container) => {
      container.scrollTop = 0;
    });
  }, [pathname, hash]);

  return null;
}
