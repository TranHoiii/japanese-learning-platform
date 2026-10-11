import { useEffect, useRef } from "react";

interface HorizontalScrollOptions {
  /** Hệ số nhân tốc độ cuộn con lăn chuột (mặc định: 1) */
  wheelSpeed?: number;
  /** Cho phép kéo rê chuột trái như màn cảm ứng (Drag to scroll) (mặc định: true) */
  enableDrag?: boolean;
}

/**
 * Hook cho phép container cuộn ngang hoạt động hoàn hảo với chuột trên máy tính:
 * 1. Chuyển đổi con lăn chuột dọc (mouse wheel deltaY) thành cuộn ngang (scrollLeft).
 * 2. Hỗ trợ bấm chuột trái và kéo (Drag to scroll) giống như vuốt trên màn hình cảm ứng.
 * 3. Tự động nhả cuộn dọc trang khi container đã chạm mép trái hoặc mép phải.
 */
export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>(
  options: HorizontalScrollOptions = {}
) {
  const { wheelSpeed = 1, enableDrag = true } = options;
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // --- 1. XỬ LÝ LĂN CON CHUỘT (MOUSE WHEEL) ---
    const handleWheel = (e: WheelEvent) => {
      // Chỉ can thiệp nếu con lăn có chuyển động dọc và container thực sự có thể cuộn ngang
      if (e.deltaY !== 0 && el.scrollWidth > el.clientWidth) {
        const isAtStart = el.scrollLeft <= 0 && e.deltaY < 0;
        const isAtEnd =
          Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth && e.deltaY > 0;

        // Nếu chưa chạm mép thì ưu tiên cuộn ngang container và ngăn trang cuộn dọc
        if (!isAtStart && !isAtEnd) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * wheelSpeed;
        }
      }
    };

    // --- 2. XỬ LÝ KÉO CHUỘT NHƯ MÀN CẢM ỨNG (DRAG TO SCROLL) ---
    let isMouseDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasDragged = false;

    const handleMouseDown = (e: MouseEvent) => {
      // Chỉ kích hoạt với chuột trái (button = 0)
      if (!enableDrag || e.button !== 0) return;
      isMouseDown = true;
      hasDragged = false;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.2;
      if (Math.abs(walk) > 4) {
        hasDragged = true;
      }
      el.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      el.style.cursor = "";
      el.style.removeProperty("user-select");

      // Nếu người dùng vừa kéo rê thì chặn kích hoạt click ngoài ý muốn vào link/button con
      if (hasDragged) {
        const captureClick = (clickEvent: MouseEvent) => {
          clickEvent.stopPropagation();
          clickEvent.preventDefault();
        };
        el.addEventListener("click", captureClick, { capture: true, once: true });
      }
    };

    const handleMouseLeave = () => {
      if (isMouseDown) {
        isMouseDown = false;
        el.style.cursor = "";
        el.style.removeProperty("user-select");
      }
    };

    // Đăng ký sự kiện
    el.addEventListener("wheel", handleWheel, { passive: false });
    if (enableDrag) {
      el.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      el.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      el.removeEventListener("wheel", handleWheel);
      if (enableDrag) {
        el.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [wheelSpeed, enableDrag]);

  return elementRef;
}

export default useHorizontalScroll;
