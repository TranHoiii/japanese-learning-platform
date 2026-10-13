import React from "react";
import { cn } from "../../../utils/cn";
import StrokeOrderAnimator from "../../../components/kanji/StrokeOrderAnimator";

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
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-[14px] bg-[#FAF7F1] border border-[#E7E0D2] p-4 flex flex-col items-center justify-center text-center space-y-3",
        className,
      )}
    >
      <div className="flex items-center justify-between w-full text-xs text-[#766D5E] pb-2 border-b border-[#E7E0D2]">
        <span className="font-semibold text-[#213960] flex items-center gap-1.5">
          <span>✍️</span>
          <span>Thứ tự nét viết chuẩn</span>
        </span>
        {strokeCount && (
          <span className="px-2 py-0.5 rounded bg-white border border-[#D3CABA] font-bold text-[#1F1C18]">
            {strokeCount} nét
          </span>
        )}
      </div>

      <div className="py-1">
        <StrokeOrderAnimator
          character={character}
          strokeOrderUrl={strokeAssetUrl}
          theme="light"
          size={135}
          showControls={true}
        />
      </div>

      <p className="text-[11px] text-[#766D5E] max-w-xs leading-relaxed">
        Nguyên tắc bút thuận: Từ trên xuống dưới, từ trái sang phải, nét ngang trước nét sổ sau.
      </p>
    </div>
  );
};

export default KanaStrokeOrder;
