import React from "react";
import { cn } from "../../../utils/cn";
import { PhoneticStepGuideItem } from "../types/pronunciation";

export interface PhoneticStepGuideProps {
  guide: {
    titleVi: string;
    descriptionVi?: string;
    steps: PhoneticStepGuideItem[];
  };
  className?: string;
}

export const PhoneticStepGuide: React.FC<PhoneticStepGuideProps> = ({
  guide,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-[14px] bg-[#F8FAFC] border border-[#CBD5E1] p-4 sm:p-5 space-y-4 shadow-xs",
        className,
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            🗣️
          </span>
          <h4 className="text-base font-bold text-[#0F172A]">{guide.titleVi}</h4>
        </div>
        {guide.descriptionVi && (
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            {guide.descriptionVi}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {guide.steps.map((step) => (
          <div
            key={step.stepNumber}
            className="rounded-[12px] bg-white border border-[#E2E8F0] p-4 flex flex-col justify-between space-y-3 shadow-xs hover:border-[#94A3B8] transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2684D9] text-white text-xs font-bold shrink-0">
                  {step.stepNumber}
                </span>
                <h5 className="text-sm font-bold text-[#0F172A]">
                  {step.titleVi}
                </h5>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                {step.descriptionVi}
              </p>
            </div>

            {step.tipVi && (
              <div className="pt-2 border-t border-[#F1F5F9]">
                <p className="text-[11px] text-[#0369A1] bg-[#F0F9FF] px-2 py-1 rounded border border-[#BAE6FD]">
                  💡 {step.tipVi}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhoneticStepGuide;
