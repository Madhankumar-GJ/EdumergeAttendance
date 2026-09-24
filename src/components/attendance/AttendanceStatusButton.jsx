import React from "react";

import {
  Check,
  X,
  Clock3,
  ShieldCheck,
  BriefcaseBusiness,
} from "lucide-react";

const STATUS_CONFIG = {
  present: {
    label: "Present",
    icon: Check,
    active:
      "border-emerald-500 bg-emerald-500 text-white shadow-emerald-500/20",
    inactive:
      "border-emerald-200 text-emerald-600 hover:bg-emerald-50",
  },

  absent: {
    label: "Absent",
    icon: X,
    active:
      "border-red-500 bg-red-500 text-white shadow-red-500/20",
    inactive:
      "border-red-200 text-red-600 hover:bg-red-50",
  },

  late: {
    label: "Late",
    icon: Clock3,
    active:
      "border-amber-500 bg-amber-500 text-white shadow-amber-500/20",
    inactive:
      "border-amber-200 text-amber-600 hover:bg-amber-50",
  },

  excused: {
    label: "Excused",
    icon: ShieldCheck,
    active:
      "border-blue-500 bg-blue-500 text-white shadow-blue-500/20",
    inactive:
      "border-blue-200 text-blue-600 hover:bg-blue-50",
  },

  "on-duty": {
    label: "On Duty",
    icon: BriefcaseBusiness,
    active:
      "border-violet-500 bg-violet-500 text-white shadow-violet-500/20",
    inactive:
      "border-violet-200 text-violet-600 hover:bg-violet-50",
  },
};

export default function AttendanceStatusButton({
  status,
  active,
  onClick,
}) {
  const config = STATUS_CONFIG[status];

  if (!config) {
    return null;
  }

  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={config.label}
      className={`flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold shadow-sm transition-all duration-200 ${
        active
          ? `${config.active} shadow-md`
          : `bg-white ${config.inactive}`
      }`}
    >
      <Icon size={14} />

      <span className="hidden xl:inline">
        {config.label}
      </span>
    </button>
  );
}
