import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_ROLE, ROLES } from "../config/roles";

const demoUsers = {
  [ROLES.ADMIN]: {
    id: "USR-ADMIN-001",
    name: "Administrator",
    email: "admin@college.edu",
    role: ROLES.ADMIN,
    department: "Administration",
    avatar: "AD",
  },

  [ROLES.TEACHER]: {
    id: "USR-TEACHER-001",
    name: "Dr. Ananya Sharma",
    email: "ananya.sharma@college.edu",
    role: ROLES.TEACHER,
    department: "Computer Science",
    avatar: "AS",
  },

  [ROLES.STUDENT]: {
    id: "USR-STUDENT-001",
    name: "Arjun Kumar",
    email: "arjun.kumar@college.edu",
    role: ROLES.STUDENT,
    department: "Computer Science",
    avatar: "AK",
  },

  [ROLES.STAFF]: {
    id: "USR-STAFF-001",
    name: "Priya Nair",
    email: "priya.nair@college.edu",
    role: ROLES.STAFF,
    department: "Academic Administration",
    avatar: "PN",
  },
};

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: true,

      currentUser: demoUsers[DEFAULT_ROLE],

      users: demoUsers,

      login: (role = DEFAULT_ROLE) => {
        const user = demoUsers[role];

        set({
          isAuthenticated: true,
          currentUser: user,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          currentUser: null,
        });
      },

      switchRole: (role) => {
        const user = demoUsers[role];

        if (!user) return;

        set({
          isAuthenticated: true,
          currentUser: user,
        });
      },

      updateProfile: (updates) => {
        set((state) => ({
          currentUser: {
            ...state.currentUser,
            ...updates,
          },
        }));
      },
    }),
    {
      name: "campuspulse-auth",
    }
  )
);
