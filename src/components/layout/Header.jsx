import React, { useEffect, useState } from "react";
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
} from "lucide-react";

const THEME_KEY = "campusflow-theme";

export default function Header({ onMenuClick }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);

    if (saved === "dark" || saved === "light") {
      return saved;
    }

    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
  });

  /* Apply theme to <html> */
  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove("dark", "light");
    html.classList.add(theme);

    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "light" : "dark"
    );
  };

  return (
    <header className="app-header">
      <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label="Open navigation"
        >
          <Menu size={19} />
        </button>

        {/* Search */}
        <div className="hidden max-w-md flex-1 md:block">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              placeholder="Search students, staff, classes..."
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:bg-slate-950"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1">
          {/* Notification */}
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={17} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
          </button>

          {/* Theme */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun size={17} />
            ) : (
              <Moon size={17} />
            )}
          </button>

          {/* User */}
          <div className="ml-1 hidden items-center gap-2 border-l border-slate-200 pl-3 sm:flex dark:border-slate-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
              AD
            </div>

            <div className="hidden lg:block">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Administrator
              </div>

              <div className="text-[10px] text-slate-400">
                System Admin
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
