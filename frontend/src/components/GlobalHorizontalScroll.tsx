import { useEffect } from "react";

/**
 * GlobalHorizontalScroll:
 * Tự động hỗ trợ người dùng chuột máy tính (Desktop Mouse) cuộn ngang trên TẤT CẢ các container
 * có thuộc tính overflow-x-auto (như thanh Tab, Bảng Kanji, Breadcrumb, Thanh lọc bài học,...)
 * chỉ bằng thao tác lăn chuột tự nhiên (Mouse Wheel).
 * 
 * Cơ chế an toàn: Tự động nhả cuộn trang dọc khi container đã cuộn hết sang mép trái hoặc mép phải,
 * không bao giờ làm kẹt trải nghiệm cuộn toàn trang của người dùng.
 */
export default function GlobalHorizontalScroll() {
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      // Bỏ qua nếu người dùng đang giữ Shift (trình duyệt tự xử lý) hoặc không có chuyển động dọc
      if (e.shiftKey || e.deltaY === 0) return;

      // Tìm kiếm container cuộn ngang gần nhất từ vị trí con trỏ chuột
      let currentEl = e.target as HTMLElement | null;
      while (
        currentEl &&
        currentEl !== document.body &&
        currentEl !== document.documentElement
      ) {
        const hasHorizontalOverflow = currentEl.scrollWidth > currentEl.clientWidth + 1;
        if (hasHorizontalOverflow) {
          const style = window.getComputedStyle(currentEl);
          const isScrollable =
            style.overflowX === "auto" ||
            style.overflowX === "scroll" ||
            currentEl.classList.contains("overflow-x-auto");

          if (isScrollable) {
            const isAtStart = currentEl.scrollLeft <= 0 && e.deltaY < 0;
            const isAtEnd =
              Math.ceil(currentEl.scrollLeft + currentEl.clientWidth) >=
                currentEl.scrollWidth && e.deltaY > 0;

            // Nếu chưa chạm mép thì cuộn ngang container và ngăn chặn trang cuộn dọc
            if (!isAtStart && !isAtEnd) {
              e.preventDefault();
              currentEl.scrollLeft += e.deltaY;
              return;
            }
          }
        }
        currentEl = currentEl.parentElement;
      }
    };

    window.addEventListener("wheel", handleGlobalWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleGlobalWheel);
    };
  }, []);

  return null;
}
