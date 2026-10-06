import React from "react";
import { cn } from "../../../utils/cn";
import { SoundChangeSummaryRow } from "../types/numbers";

export interface SoundChangeTableProps {
  rows: SoundChangeSummaryRow[];
  className?: string;
}

export const SoundChangeTable: React.FC<SoundChangeTableProps> = ({
  rows,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-[16px] bg-white border border-[#CBD5E1] p-5 sm:p-6 space-y-4 shadow-xs",
        className,
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            ⚡
          </span>
          <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
            Bảng Tổng Hợp Biến Âm Lượng Từ Kinh Điển (1, 3, 6, 8, 10)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
          Số 1, 6, 8, 10 rất hay biến thành <strong>âm ngắt っ</strong> kết hợp âm bán đục (p); Số 3 hay kéo theo <strong>âm đục (b, g, z)</strong>. Đây là bảng tra cứu phản xạ nhanh giúp bạn không bao giờ phát âm nhầm.
        </p>
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-[#E2E8F0] shadow-2xs">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#334155]">
              <th className="p-3 font-semibold text-center w-16">Số</th>
              <th className="p-3 font-semibold text-[#104673]">〜本 (hon)</th>
              <th className="p-3 font-semibold text-[#104673]">〜匹 (hiki)</th>
              <th className="p-3 font-semibold text-[#104673]">〜分 (fun)</th>
              <th className="p-3 font-semibold text-[#104673]">〜個 (ko)</th>
              <th className="p-3 font-semibold text-[#104673]">〜冊 (satsu)</th>
              <th className="p-3 font-semibold text-[#104673]">〜階 (kai)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] text-[#334155]">
            {rows.map((row) => (
              <tr
                key={row.number}
                className="hover:bg-[#F8FAFC]/80 transition-colors font-japanese"
              >
                <td className="p-3 font-bold text-[#0F172A] text-center font-mono bg-[#F8FAFC]/40">
                  {row.label}
                </td>
                <td className="p-3 font-medium">
                  {row.hon.includes("ぽ") || row.hon.includes("ぼ") ? (
                    <span className="font-bold text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.5 rounded">
                      {row.hon}
                    </span>
                  ) : (
                    <span>{row.hon}</span>
                  )}
                </td>
                <td className="p-3 font-medium">
                  {row.hiki.includes("ぴ") || row.hiki.includes("び") ? (
                    <span className="font-bold text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.5 rounded">
                      {row.hiki}
                    </span>
                  ) : (
                    <span>{row.hiki}</span>
                  )}
                </td>
                <td className="p-3 font-medium">
                  {row.fun.includes("ぷ") ? (
                    <span className="font-bold text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.5 rounded">
                      {row.fun}
                    </span>
                  ) : (
                    <span>{row.fun}</span>
                  )}
                </td>
                <td className="p-3 font-medium">
                  {row.ko.includes("っ") ? (
                    <span className="font-bold text-[#2563EB] bg-[#EFF6FF] px-1.5 py-0.5 rounded">
                      {row.ko}
                    </span>
                  ) : (
                    <span>{row.ko}</span>
                  )}
                </td>
                <td className="p-3 font-medium">
                  {row.satsu.includes("っ") ? (
                    <span className="font-bold text-[#2563EB] bg-[#EFF6FF] px-1.5 py-0.5 rounded">
                      {row.satsu}
                    </span>
                  ) : (
                    <span>{row.satsu}</span>
                  )}
                </td>
                <td className="p-3 font-medium">
                  {row.kai.includes("っ") || row.kai.includes("がい") ? (
                    <span className="font-bold text-[#059669] bg-[#ECFDF5] px-1.5 py-0.5 rounded">
                      {row.kai}
                    </span>
                  ) : (
                    <span>{row.kai}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
        <div className="p-2.5 rounded-[8px] bg-[#FEF3C7]/60 border border-[#FDE68A] text-[#92400E]">
          <span className="font-bold block">🔥 Nhóm P / B:</span>
          Hàng H (ほん, ひき, ふん) khi gặp 1, 6, 8, 10 biến thành <strong>pon/piki/pun</strong>; gặp số 3 biến thành <strong>bon/biki/pun</strong>.
        </div>
        <div className="p-2.5 rounded-[8px] bg-[#EFF6FF]/60 border border-[#BFDBFE] text-[#1E40AF]">
          <span className="font-bold block">⚡ Nhóm âm ngắt Sokuon:</span>
          Hàng K và S (こ, さつ, かい) biến thành <strong>っ (sokuon)</strong> ở số 1, 8, 10 (ikko, issatsu, ikkai...).
        </div>
        <div className="p-2.5 rounded-[8px] bg-[#ECFDF5]/60 border border-[#A7F3D0] text-[#065F46]">
          <span className="font-bold block">🏢 Ngoại lệ tầng nhà (階):</span>
          Tầng 3 đọc là <strong>さんがい (sangai)</strong> đục hóa; các tầng còn lại giữ âm kai.
        </div>
      </div>
    </div>
  );
};

export default SoundChangeTable;
