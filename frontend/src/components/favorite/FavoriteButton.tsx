import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { favoriteApi } from "../../services/favoriteApi";
import { FavoriteContentType } from "../../types/favorite";
import { cn } from "../../utils/cn";

export interface FavoriteButtonProps {
  contentType: FavoriteContentType;
  contentId: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  contentType,
  contentId,
  size = "md",
  showLabel = false,
  className,
}) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const queryKey = ["favorite-check", contentType, contentId];

  // 1. Check favorite status
  const { data: checkData, isLoading } = useQuery({
    queryKey,
    queryFn: () => favoriteApi.checkFavorite(contentType, contentId),
    enabled: !!currentUser && contentId > 0,
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  const isFavorited = !!checkData?.favorited;

  // 2. Add / Delete Mutations
  const toggleMutation = useMutation({
    mutationFn: async () => {
      if (!currentUser) return;
      if (isFavorited && checkData?.favoriteId) {
        await favoriteApi.deleteFavorite(checkData.favoriteId);
      } else {
        await favoriteApi.addFavorite(contentType, contentId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) {
      alert("Vui lòng đăng nhập để lưu nội dung yêu thích!");
      return;
    }
    toggleMutation.mutate();
  };

  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
  };

  const heartIconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4.5 h-4.5",
    lg: "w-5.5 h-5.5",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={toggleMutation.isPending || isLoading}
      title={isFavorited ? "Bỏ khỏi yêu thích" : "Lưu vào yêu thích"}
      className={cn(
        "rounded-full transition-all flex items-center justify-center cursor-pointer select-none",
        isFavorited
          ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 shadow-2xs"
          : "bg-white/80 text-slate-400 border border-slate-200/80 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50/50 shadow-2xs",
        showLabel ? "px-3 w-auto gap-1.5" : sizeClasses[size],
        toggleMutation.isPending && "opacity-60 scale-95",
        className
      )}
      aria-label={isFavorited ? "Đã yêu thích" : "Yêu thích"}
    >
      <svg
        className={cn(heartIconSizes[size], "transition-transform active:scale-125")}
        viewBox="0 0 24 24"
        fill={isFavorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={isFavorited ? "0" : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {showLabel && (
        <span className="text-xs font-semibold">
          {isFavorited ? "Đã lưu" : "Yêu thích"}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;
