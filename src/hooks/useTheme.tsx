import { useEffect, useState, useCallback } from "react";

const themes = ["light", "dark", "impactfulDark", "system"] as const;
export type Theme = (typeof themes)[number];

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    return savedTheme || "light";
  });

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const appliedTheme = theme === "system" ? systemTheme : theme;

    // Remove all theme classes
    themes.forEach((t) => {
      root.classList.remove(t);
    });

    // Add the new theme class
    root.classList.add(appliedTheme);

    console.log("✓ Theme applied:", appliedTheme);
  }, [theme]);

  return { theme, setTheme };
}
