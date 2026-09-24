import {
  Activity,
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  ClipboardCheck,
  FileBarChart,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Settings,
  UserCheck,
  Users,
  UserCog,
} from "lucide-react";

import { ROLES } from "./roles";

export const navigation = {
  [ROLES.ADMIN]: [
    {
      title: "Overview",
      items: [
        {
          label: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Analytics",
          path: "/analytics",
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
          icon: UserCheck,
        },
        {
          label: "Staff",
          path: "/staff",
          icon: UserCog,
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
          icon: Users,
        },
        {
          label: "Subjects",
          path: "/academics/subjects",
          icon: BookOpen,
        },
        {
          label: "Rooms & Labs",
          path: "/academics/rooms",
          icon: Building2,
        },
      ],
    },

    {
      title: "Attendance",
      items: [
        {
          label: "Attendance",
          path: "/attendance",
          icon: ClipboardCheck,
        },
        {
          label: "Mark Attendance",
          path: "/attendance/mark",
          icon: UserCheck,
        },
        {
          label: "Attendance History",
          path: "/attendance/history",
          icon: Activity,
        },
        {
          label: "Shortage",
          path: "/attendance/shortage",
          icon: Megaphone,
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
          icon: CalendarDays,
        },
        {
          label: "Conflicts",
          path: "/timetable/conflicts",
          icon: Activity,
        },
      ],
    },

    {
      title: "Management",
      items: [
        {
          label: "Leave Management",
          path: "/leave",
          icon: ClipboardCheck,
        },
        {
          label: "Reports",
          path: "/reports",
          icon: FileBarChart,
        },
        {
          label: "Notifications",
          path: "/notifications",
          icon: Megaphone,
        },
        {
          label: "Activity Log",
          path: "/activity",
          icon: Activity,
        },
      ],
    },

    {
      title: "System",
      items: [
        {
          label: "Settings",
          path: "/settings",
          icon: Settings,
        },
      ],
    },
  ],

  [ROLES.TEACHER]: [
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
      title: "Teaching",
      items: [
        {
          label: "My Classes",
          path: "/classes",
          icon: Users,
        },
        {
          label: "Mark Attendance",
          path: "/attendance/mark",
          icon: ClipboardCheck,
        },
        {
          label: "Attendance History",
          path: "/attendance/history",
          icon: Activity,
        },
        {
          label: "Students",
          path: "/students",
          icon: GraduationCap,
        },
      ],
    },

    {
      title: "Schedule",
      items: [
        {
          label: "My Timetable",
          path: "/timetable",
          icon: CalendarDays,
        },
        {
          label: "Workload",
          path: "/reports",
          icon: BarChart3,
        },
      ],
    },

    {
      title: "Other",
      items: [
        {
          label: "Leave Requests",
          path: "/leave",
          icon: ClipboardCheck,
        },
        {
          label: "Notifications",
          path: "/notifications",
          icon: Megaphone,
        },
        {
          label: "Settings",
          path: "/settings",
          icon: Settings,
        },
      ],
    },
  ],

  [ROLES.STUDENT]: [
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
      title: "Academics",
      items: [
        {
          label: "My Attendance",
          path: "/attendance",
          icon: ClipboardCheck,
        },
        {
          label: "Attendance History",
          path: "/attendance/history",
          icon: Activity,
        },
        {
          label: "My Timetable",
          path: "/timetable",
          icon: CalendarDays,
        },
        {
          label: "My Subjects",
          path: "/subjects",
          icon: BookOpen,
        },
      ],
    },

    {
      title: "Services",
      items: [
        {
          label: "Leave Requests",
          path: "/leave",
          icon: ClipboardCheck,
        },
        {
          label: "Notifications",
          path: "/notifications",
          icon: Megaphone,
        },
      ],
    },

    {
      title: "Account",
      items: [
        {
          label: "Settings",
          path: "/settings",
          icon: Settings,
        },
      ],
    },
  ],

  [ROLES.STAFF]: [
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
      title: "Operations",
      items: [
        {
          label: "Attendance",
          path: "/attendance",
          icon: ClipboardCheck,
        },
        {
          label: "Timetable",
          path: "/timetable",
          icon: CalendarDays,
        },
        {
          label: "Students",
          path: "/students",
          icon: GraduationCap,
        },
      ],
    },

    {
      title: "Reports",
      items: [
        {
          label: "Reports",
          path: "/reports",
          icon: FileBarChart,
        },
        {
          label: "Activity Log",
          path: "/activity",
          icon: Activity,
        },
      ],
    },

    {
      title: "Account",
      items: [
        {
          label: "Notifications",
          path: "/notifications",
          icon: Megaphone,
        },
        {
          label: "Settings",
          path: "/settings",
          icon: Settings,
        },
      ],
    },
  ],
};
