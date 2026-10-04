import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { favoriteApi } from "../../services/favoriteApi";
import { FavoriteContentType } from "../../types/favorite";

interface FavoriteButtonProps {
  contentType: FavoriteContentType;
  contentId: number;
  className?: string;
  showText?: boolean;
}

export default function FavoriteButton({
  contentType,
  contentId,
  className = "",
  showText = false,
}: FavoriteButtonProps) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queryKey = ["favorite-check", contentType, contentId];

  const { data: checkData, isLoading } = useQuery({
    queryKey,
    queryFn: () => favoriteApi.checkFavorite(contentType, contentId),
    enabled: !!currentUser && !!contentId,
  });

  const isFavorited = !!checkData?.favorited;
  const favoriteId = checkData?.favoriteId;

  const toggleMutation = useMutation({
    mutationFn: async () => {
      if (isFavorited && favoriteId) {
        await favoriteApi.deleteFavorite(favoriteId);
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
      navigate("/login");
      return;
    }

    toggleMutation.mutate();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading || toggleMutation.isPending}
      id={`favorite-toggle-btn-${contentType}-${contentId}`}
      title={isFavorited ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 border ${
        isFavorited
          ? "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-rose-500"
      } ${className}`}
    >
      <svg
        className={`w-4 h-4 transition-transform ${
          isFavorited ? "fill-rose-500 text-rose-500 scale-110" : "fill-none text-current"
        }`}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {showText && (
        <span>
          {toggleMutation.isPending
            ? "Đang lưu..."
            : isFavorited
            ? "Đã thích"
            : "Yêu thích"}
        </span>
      )}
    </button>
  );
}
