import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { gamification } from "../lib/gamification";
import CelebrationHost from "../components/feedback/CelebrationHost";

/** Binds the gamification store to the logged-in user and mounts the celebration overlay. */
export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id ?? null;

  useEffect(() => {
    gamification.setUser(userId);
  }, [userId]);

  return (
    <>
      {children}
      <CelebrationHost />
    </>
  );
};

export default GamificationProvider;
