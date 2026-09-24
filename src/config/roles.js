export const ROLES = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
  STAFF: "staff",
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: "Administrator",
  [ROLES.TEACHER]: "Teacher",
  [ROLES.STUDENT]: "Student",
  [ROLES.STAFF]: "Staff",
};

export const ROLE_DESCRIPTIONS = {
  [ROLES.ADMIN]: "Manage the entire college attendance and academic system.",
  [ROLES.TEACHER]: "Manage classes, attendance, timetable and students.",
  [ROLES.STUDENT]: "View attendance, timetable, leaves and academic information.",
  [ROLES.STAFF]: "Manage assigned academic and administrative operations.",
};

export const ROLE_COLORS = {
  [ROLES.ADMIN]: "indigo",
  [ROLES.TEACHER]: "emerald",
  [ROLES.STUDENT]: "blue",
  [ROLES.STAFF]: "amber",
};

export const DEFAULT_ROLE = ROLES.ADMIN;
