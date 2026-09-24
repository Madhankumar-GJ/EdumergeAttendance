import React from "react";

import {
  Users,
  CheckCircle2,
  XCircle,
  Clock3,
  ShieldCheck,
} from "lucide-react";

function SummaryCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

export default function AttendanceSummary({
  records = [],
}) {
  const total = records.length;

  const present = records.filter(
    (record) =>
      record.status === "present"
  ).length;

  const absent = records.filter(
    (record) =>
      record.status === "absent"
  ).length;

  const late = records.filter(
    (record) =>
      record.status === "late"
  ).length;

  const excused = records.filter(
    (record) =>
      record.status === "excused" ||
      record.status === "on-duty"
  ).length;

  const marked = records.filter(
    (record) => record.status
  ).length;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      <SummaryCard
        title="Students"
        value={total}
        icon={Users}
        color="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10"
      />

      <SummaryCard
        title="Present"
        value={present}
        icon={CheckCircle2}
        color="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10"
      />

      <SummaryCard
        title="Absent"
        value={absent}
        icon={XCircle}
        color="bg-red-100 text-red-600 dark:bg-red-500/10"
      />

      <SummaryCard
        title="Late"
        value={late}
        icon={Clock3}
        color="bg-amber-100 text-amber-600 dark:bg-amber-500/10"
      />

      <SummaryCard
        title="Marked"
        value={`${marked}/${total}`}
        icon={ShieldCheck}
        color="bg-violet-100 text-violet-600 dark:bg-violet-500/10"
      />
    </div>
  );
}
