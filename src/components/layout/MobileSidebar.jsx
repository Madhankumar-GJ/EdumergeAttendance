import {
  X,
  GraduationCap,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { navigation } from "../../config/navigation";
import { ROLE_LABELS } from "../../config/roles";
import { useAuthStore } from "../../store/authStore";

function MobileSidebar({ open, onClose }) {
  const { currentUser, logout } = useAuthStore();

  const sections = navigation[currentUser?.role] || [];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside className="absolute left-0 top-0 flex h-full w-[290px] flex-col bg-white shadow-2xl dark:bg-slate-900">
        <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <GraduationCap size={22} />
            </div>

            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                CampusPulse
              </p>

              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                College Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                            : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                        }`
                      }
                    >
                      <Icon size={19} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 p-4 dark:border-slate-800">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
              {currentUser?.avatar}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold dark:text-white">
                {currentUser?.name}
              </p>

              <p className="text-xs text-slate-400">
                {ROLE_LABELS[currentUser?.role]}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
}

export default MobileSidebar;
