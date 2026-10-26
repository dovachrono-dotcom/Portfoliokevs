"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => {
    window.clearTimeout(timer.current);
    delete document.documentElement.dataset.themeChanging;
  }, []);

  function toggleTheme() {
    window.clearTimeout(timer.current);
    document.documentElement.dataset.themeChanging = "true";
    timer.current = window.setTimeout(() => {
      delete document.documentElement.dataset.themeChanging;
      timer.current = undefined;
    }, 450);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <button type="button" role="switch" data-glow="toggle" aria-label="Dark mode" aria-checked={hydrated && resolvedTheme === "dark"} title="Switch light and dark theme" onClick={toggleTheme}
      className="relative grid h-11 w-[78px] shrink-0 grid-cols-2 place-items-center rounded-full border border-border bg-card p-1">
      <span data-theme-motion aria-hidden="true" className="absolute left-1 top-1 size-[34px] rounded-full bg-[hsl(var(--nav-active))] transition-[transform,background-color] duration-400 ease-in-out dark:translate-x-[34px]" />
      <Sun size={16} aria-hidden="true" className="relative text-background dark:text-muted-foreground" />
      <Moon size={16} aria-hidden="true" className="relative text-muted-foreground dark:text-background" />
    </button>
  );
}
