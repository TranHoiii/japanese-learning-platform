import { useSyncExternalStore } from "react";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "jlp.theme";
const listeners = new Set<() => void>();

const readStored = (): ThemeMode | null => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "dark" || v === "light" ? v : null;
  } catch {
    return null;
  }
};

const systemPrefersDark = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;

let current: ThemeMode = readStored() ?? (systemPrefersDark() ? "dark" : "light");

function apply(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.style.colorScheme = mode;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", mode === "dark" ? "#14120F" : "#FAF7F1");
}

if (typeof document !== "undefined") apply(current);

export const theme = {
  get(): ThemeMode {
    return current;
  },
  set(mode: ThemeMode) {
    current = mode;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* storage unavailable — keep in-memory only */
    }
    apply(mode);
    listeners.forEach((l) => l());
  },
  toggle() {
    theme.set(current === "dark" ? "light" : "dark");
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

// Follow the OS setting until the learner picks a theme explicitly.
if (typeof window !== "undefined" && window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (readStored() === null) {
      current = e.matches ? "dark" : "light";
      apply(current);
      listeners.forEach((l) => l());
    }
  });
}

export function useTheme(): ThemeMode {
  return useSyncExternalStore(theme.subscribe, theme.get, () => "light" as ThemeMode);
}
