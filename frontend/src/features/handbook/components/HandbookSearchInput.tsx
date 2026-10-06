import React, { useRef, useEffect } from "react";

interface HandbookSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const HandbookSearchInput: React.FC<HandbookSearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = "Tìm kiếm theo tiêu đề, cấu trúc, chữ Hán, trợ từ, từ khóa...",
  className = "",
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Press "/" to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="search"
        role="searchbox"
        aria-label="Tìm kiếm sổ tay học tập"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-20 py-3 text-sm sm:text-base bg-white border border-[#CBD5E1] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all shadow-xs"
      />

      <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
        {value ? (
          <button
            type="button"
            onClick={() => {
              onChange("");
              onClear?.();
              inputRef.current?.focus();
            }}
            aria-label="Xóa nội dung tìm kiếm"
            className="p-1 text-[#94A3B8] hover:text-[#475569] rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <kbd
            aria-hidden="true"
            className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-semibold text-[#64748B] bg-[#F1F5F9] border border-[#E2E8F0] rounded"
          >
            /
          </kbd>
        )}
      </div>
    </div>
  );
};
