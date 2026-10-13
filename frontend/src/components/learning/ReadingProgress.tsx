import { useEffect, useState } from "react";

/** Thin bar fixed to the top of the viewport showing how far down the page the learner has read. */
export function ReadingProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setPercent(scrollable > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / scrollable) * 100)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none"
      role="progressbar"
      aria-label="Tiến độ đọc"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
    >
      <div
        className="h-full bg-gradient-to-r from-amber-300 to-rose-400 transition-[width] duration-150"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default ReadingProgress;
