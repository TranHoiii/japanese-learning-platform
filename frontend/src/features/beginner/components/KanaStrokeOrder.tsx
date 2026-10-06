import React from "react";
import { cn } from "../../../utils/cn";

export interface KanaStrokeOrderProps {
  character: string;
  strokeCount?: number;
  strokeAssetUrl?: string | null;
  altText?: string;
  className?: string;
}

export const KanaStrokeOrder: React.FC<KanaStrokeOrderProps> = ({
  character,
  strokeCount,
  strokeAssetUrl,
  altText,
  className,
}) => {
  const hasRealAsset = Boolean(
    strokeAssetUrl && strokeAssetUrl.trim().length > 0 && !strokeAssetUrl.includes("placeholder"),
  );

  return (
    <div
      className={cn(
        "rounded-[14px] bg-[#F8FAFC] border border-[#E2E8F0] p-4 flex flex-col items-center justify-center text-center space-y-3",
        className,
      )}
    >
      <div className="flex items-center justify-between w-full text-xs text-[#64748B] pb-2 border-b border-[#E2E8F0]">
        <span className="font-semibold text-[#12558F]">Hướng dẫn nét viết</span>
        {strokeCount && (
          <span className="px-2 py-0.5 rounded bg-white border border-[#CBD5E1] font-medium text-[#0F172A]">
            {strokeCount} nét chuẩn
          </span>
        )}
      </div>

      {hasRealAsset ? (
        <div className="relative w-32 h-32 flex items-center justify-center bg-white rounded-[10px] border border-[#CBD5E1] p-2">
          <img
            src={strokeAssetUrl!}
            alt={altText || `Thứ tự nét viết chữ ${character}`}
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        /* Calligraphy Grid Box with Fallback Status */
        <div className="space-y-3 w-full flex flex-col items-center">
          {/* Traditional 4-quadrant Calligraphy Grid (Genkouyoushi) */}
          <div
            className="relative w-28 h-28 bg-white rounded-[12px] border-2 border-[#CBD5E1] flex items-center justify-center select-none shadow-2xs overflow-hidden"
            title={`Ô tập viết chữ ${character}`}
          >
            {/* Quadrant grid guidelines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-1/2 border-b border-dashed border-[#E2E8F0]" />
              <div className="absolute inset-0 flex justify-center">
                <div className="h-full w-0 border-r border-dashed border-[#E2E8F0]" />
              </div>
            </div>

            {/* Kana Character */}
            <span
              className="text-5xl font-japanese font-bold text-[#0F172A] relative z-10"
              lang="ja"
            >
              {character}
            </span>
          </div>

          <div className="text-center space-y-1">
            <p className="text-xs font-medium text-[#475569]">
              Thứ tự nét viết sẽ được cập nhật.
            </p>
            <p className="text-[11px] text-[#94A3B8] max-w-xs leading-relaxed">
              Nguyên tắc bút thuận: Từ trên xuống dưới, từ trái sang phải, nét ngang trước nét sổ sau.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanaStrokeOrder;
