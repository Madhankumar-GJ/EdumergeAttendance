export const APP_NAME = "CampusPulse";

export const ATTENDANCE_STATUS = {
  PRESENT: "present",
  ABSENT: "absent",
  LATE: "late",
  EXCUSED: "excused",
  ON_DUTY: "on-duty",
  MEDICAL: "medical",
  CANCELLED: "cancelled",
};

export const ATTENDANCE_STATUS_LABELS = {
  [ATTENDANCE_STATUS.PRESENT]: "Present",
  [ATTENDANCE_STATUS.ABSENT]: "Absent",
  [ATTENDANCE_STATUS.LATE]: "Late",
  [ATTENDANCE_STATUS.EXCUSED]: "Excused",
  [ATTENDANCE_STATUS.ON_DUTY]: "On Duty",
  [ATTENDANCE_STATUS.MEDICAL]: "Medical",
  [ATTENDANCE_STATUS.CANCELLED]: "Cancelled",
};

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const PERIODS = [
  {
    id: 1,
    label: "Period 1",
    start: "08:30",
    end: "09:30",
  },
  {
    id: 2,
    label: "Period 2",
    start: "09:30",
    end: "10:30",
  },
  {
    id: 3,
    label: "Period 3",
    start: "10:45",
    end: "11:45",
  },
  {
    id: 4,
    label: "Period 4",
    start: "11:45",
    end: "12:45",
  },
  {
    id: 5,
    label: "Period 5",
    start: "14:00",
    end: "15:00",
  },
  {
    id: 6,
    label: "Period 6",
    start: "15:00",
    end: "16:00",
  },
  {
    id: 7,
    label: "Period 7",
    start: "16:00",
    end: "17:00",
  },
];

export const ATTENDANCE_RULES = {
  minimumPercentage: 75,
  warningPercentage: 80,
  criticalPercentage: 65,
};

export const LEAVE_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const STORAGE_KEYS = {
  AUTH: "campuspulse-auth",
  THEME: "campuspulse-theme",
  SETTINGS: "campuspulse-settings",
  DATA: "campuspulse-data",
};
