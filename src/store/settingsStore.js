import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSettingsStore = create(
  persist(
    (set) => ({
      theme: "light",

      sidebarCollapsed: false,

      compactMode: false,

      setTheme: (theme) => {
        set({ theme });
      },

      toggleSidebar: () => {
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        }));
      },

      setSidebarCollapsed: (value) => {
        set({
          sidebarCollapsed: value,
        });
      },

      toggleCompactMode: () => {
        set((state) => ({
          compactMode: !state.compactMode,
        }));
      },
    }),
    {
      name: "campuspulse-settings",
    }
  )
);
