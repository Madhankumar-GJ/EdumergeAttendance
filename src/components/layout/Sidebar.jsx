import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardCheck,
  CalendarDays,
  FileText,
  BarChart3,
  GraduationCap,
  UserRound,
  Users,
  Building2,
  BookOpen,
  DoorOpen,
  CalendarRange,
  Bell,
  Settings,
  School,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Attendance",
    items: [
      {
        label: "Mark Attendance",
        path: "/attendance/mark",
        icon: ClipboardCheck,
      },
      {
        label: "Attendance History",
        path: "/attendance/history",
        icon: CalendarDays,
      },
      {
        label: "Attendance Reports",
        path: "/attendance/reports",
        icon: FileText,
      },
      {
        label: "Shortage",
        path: "/attendance/shortage",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "People",
    items: [
      {
        label: "Students",
        path: "/students",
        icon: GraduationCap,
      },
      {
        label: "Teachers",
        path: "/teachers",
        icon: UserRound,
      },
      {
        label: "Staff",
        path: "/staff",
        icon: Users,
      },
    ],
  },
  {
    title: "Academics",
    items: [
      {
        label: "Departments",
        path: "/academics/departments",
        icon: Building2,
      },
      {
        label: "Courses",
        path: "/academics/courses",
        icon: BookOpen,
      },
      {
        label: "Classes",
        path: "/academics/classes",
        icon: School,
      },
      {
        label: "Subjects",
        path: "/academics/subjects",
        icon: BookOpen,
      },
      {
        label: "Rooms",
        path: "/academics/rooms",
        icon: DoorOpen,
      },
      {
        label: "Academic Years",
        path: "/academics/years",
        icon: CalendarRange,
      },
    ],
  },
  {
    title: "Timetable",
    items: [
      {
        label: "Timetable",
        path: "/timetable",
        icon: CalendarDays,
      },
      {
        label: "Generate Timetable",
        path: "/timetable/generate",
        icon: CalendarRange,
      },
      {
        label: "Conflicts",
        path: "/timetable/conflicts",
        icon: Bell,
      },
    ],
  },
  {
    title: "Reports",
    items: [
      {
        label: "Reports",
        path: "/reports",
        icon: FileText,
      },
      {
        label: "Analytics",
        path: "/reports/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Notifications",
        path: "/notifications",
        icon: Bell,
      },
      {
        label: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar({ mobileOpen = false, onClose }) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="mobile-sidebar-backdrop lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`app-sidebar ${
          mobileOpen ? "open" : ""
        }`}
      >
        {/* Brand */}
        <div className="sidebar-logo">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <School size={18} />
            </div>

            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-slate-900 dark:text-white">
                CampusFlow
              </div>

              <div className="truncate text-[10px] text-slate-400">
                Attendance Management
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="sidebar-nav">
          {navigation.map((section) => (
            <div
              key={section.title}
              className="mb-4"
            >
              <div className="sidebar-section-title">
                {section.title}
              </div>

              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `nav-item ${
                          isActive ? "active" : ""
                        }`
                      }
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.8}
                      />

                      <span className="truncate">
                        {item.label}
                      </span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* User */}
        <div className="mt-auto border-t border-slate-200 p-3 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
              AD
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                Administrator
              </div>

              <div className="truncate text-[10px] text-slate-400">
                System Admin
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <LogOut size={15} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
