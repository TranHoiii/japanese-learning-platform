import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../utils/cn";
import Badge, { BadgeVariant } from "../../../components/ui/Badge";

export interface TopicCardProps {
  to: string;
  icon: string | React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
  metaTags?: string[];
  actionText?: string;
  className?: string;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  to,
  icon,
  title,
  subtitle,
  description,
  badge,
  badgeVariant = "neutral",
  metaTags,
  actionText = "Xem chi tiết",
  className,
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "group relative flex flex-col justify-between rounded-[14px] bg-white border border-[#E7E0D2] p-5 transition-all hover:border-[#2F5496] hover:shadow-[0_4px_16px_rgba(38,132,217,0.12)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#2F5496]",
        className,
      )}
    >
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-[10px] bg-[#EEF3FA] text-[#213960] border border-[#BDD0EC]/60 flex items-center justify-center font-japanese font-bold text-lg transition-transform group-hover:scale-105 select-none">
            {icon}
          </div>
          {badge && (
            <Badge variant={badgeVariant} size="sm">
              {badge}
            </Badge>
          )}
        </div>

        <div className="space-y-1">
          {subtitle && (
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#213960]">
              {subtitle}
            </span>
          )}
          <h3 className="text-base font-bold text-[#1F1C18] group-hover:text-[#2F5496] transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#766D5E] line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {metaTags && metaTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {metaTags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-0.5 rounded-[6px] bg-[#F3EEE5] text-[#5A5246] text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#F3EEE5] flex items-center justify-between text-xs font-semibold text-[#213960] group-hover:text-[#2F5496]">
        <span>{actionText}</span>
        <span
          className="transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </div>
    </Link>
  );
};

export default TopicCard;
