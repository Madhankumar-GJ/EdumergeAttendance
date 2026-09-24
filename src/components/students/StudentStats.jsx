import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  GraduationCap,
} from "lucide-react";

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color,
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div
        className={`absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 ${color}`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${color} text-white shadow-md`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default function StudentStats({ students }) {
  const active = students.filter(
    (student) => student.status === "active"
  ).length;

  const inactive = students.filter(
    (student) => student.status !== "active"
  ).length;

  const averageAttendance =
    students.length === 0
      ? 0
      : Math.round(
          students.reduce(
            (sum, student) =>
              sum + Number(student.attendancePercentage || 0),
            0
          ) / students.length
        );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Students"
        value={students.length}
        description="All registered students"
        icon={Users}
        color="bg-indigo-600"
      />

      <StatCard
        title="Active Students"
        value={active}
        description="Currently enrolled"
        icon={UserCheck}
        color="bg-emerald-600"
      />

      <StatCard
        title="Inactive"
        value={inactive}
        description="Inactive or archived"
        icon={UserX}
        color="bg-rose-600"
      />

      <StatCard
        title="Avg. Attendance"
        value={`${averageAttendance}%`}
        description="Across student records"
        icon={GraduationCap}
        color="bg-violet-600"
      />
    </div>
  );
}
