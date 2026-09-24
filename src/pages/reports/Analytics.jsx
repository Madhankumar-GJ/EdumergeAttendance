import React, { useMemo, useState } from "react";

const attendanceData = [
  { month: "Jan", attendance: 87 },
  { month: "Feb", attendance: 89 },
  { month: "Mar", attendance: 86 },
  { month: "Apr", attendance: 91 },
  { month: "May", attendance: 88 },
  { month: "Jun", attendance: 93 },
];

const departmentData = [
  {
    name: "Computer Science",
    students: 420,
    attendance: 91,
    present: 382,
    absent: 38,
  },
  {
    name: "Information Technology",
    students: 360,
    attendance: 88,
    present: 317,
    absent: 43,
  },
  {
    name: "Electronics",
    students: 310,
    attendance: 86,
    present: 267,
    absent: 43,
  },
  {
    name: "Mechanical",
    students: 280,
    attendance: 84,
    present: 235,
    absent: 45,
  },
  {
    name: "Civil",
    students: 240,
    attendance: 89,
    present: 214,
    absent: 26,
  },
];

const subjectData = [
  {
    subject: "Data Structures",
    code: "CS401",
    attendance: 94,
  },
  {
    subject: "Database Management",
    code: "CS402",
    attendance: 91,
  },
  {
    subject: "Operating Systems",
    code: "CS403",
    attendance: 87,
  },
  {
    subject: "Computer Networks",
    code: "CS404",
    attendance: 83,
  },
  {
    subject: "Software Engineering",
    code: "CS405",
    attendance: 89,
  },
];

function getAttendanceColor(value) {
  if (value >= 90) return "text-emerald-400";
  if (value >= 75) return "text-amber-400";
  return "text-red-400";
}

function getAttendanceBar(value) {
  if (value >= 90) return "bg-emerald-500";
  if (value >= 75) return "bg-amber-500";
  return "bg-red-500";
}

function Analytics() {
  const [period, setPeriod] = useState("6months");
  const [department, setDepartment] = useState("all");

  const filteredDepartments = useMemo(() => {
    if (department === "all") {
      return departmentData;
    }

    return departmentData.filter(
      (item) => item.name === department
    );
  }, [department]);

  const averageAttendance = useMemo(() => {
    if (!filteredDepartments.length) return 0;

    const total = filteredDepartments.reduce(
      (sum, item) => sum + item.attendance,
      0
    );

    return Math.round(total / filteredDepartments.length);
  }, [filteredDepartments]);

  const totalStudents = filteredDepartments.reduce(
    (sum, item) => sum + item.students,
    0
  );

  const totalPresent = filteredDepartments.reduce(
    (sum, item) => sum + item.present,
    0
  );

  const totalAbsent = filteredDepartments.reduce(
    (sum, item) => sum + item.absent,
    0
  );

  const maxAttendance = Math.max(
    ...attendanceData.map((item) => item.attendance)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Analyze attendance trends, departments, subjects and
            student participation.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500"
          >
            <option value="month">This Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="year">This Academic Year</option>
          </select>

          <button
            type="button"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            onClick={() => window.print()}
          >
            Export Report
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Average Attendance
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {averageAttendance}%
              </p>
            </div>

            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
              ↗
            </div>
          </div>

          <p className="mt-3 text-xs text-emerald-400">
            +2.4% compared with previous period
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Students
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {totalStudents.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              🎓
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Across selected departments
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Present Records
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {totalPresent.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
              ✓
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Attendance marked present
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Absent Records
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {totalAbsent.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
              !
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Attendance marked absent
          </p>
        </div>
      </div>

      {/* Main analytics grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Attendance trend */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">
                Attendance Trend
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Monthly average attendance percentage
              </p>
            </div>

            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              {period === "year"
                ? "Academic Year"
                : period === "6months"
                  ? "6 Months"
                  : period === "3months"
                    ? "3 Months"
                    : "Current Month"}
            </span>
          </div>

          <div className="mt-8">
            <div className="flex h-64 items-end gap-3 sm:gap-6">
              {attendanceData.map((item) => {
                const height =
                  (item.attendance / maxAttendance) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <span className="text-xs font-medium text-slate-400">
                      {item.attendance}%
                    </span>

                    <div className="flex h-full w-full items-end">
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-500 hover:from-blue-500 hover:to-cyan-300"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    </div>

                    <span className="text-xs text-slate-500">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Attendance distribution */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="font-semibold text-white">
            Attendance Distribution
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Student attendance categories
          </p>

          <div className="mx-auto mt-8 flex h-48 w-48 items-center justify-center rounded-full bg-[conic-gradient(#10b981_0_62%,#f59e0b_62%_84%,#ef4444_84%_100%)]">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-900">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  1,610
                </p>

                <p className="text-xs text-slate-500">
                  Students
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-slate-400">
                  Above 90%
                </span>
              </div>

              <span className="text-sm font-semibold text-white">
                62%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-400">
                  75% - 90%
                </span>
              </div>

              <span className="text-sm font-semibold text-white">
                22%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-sm text-slate-400">
                  Below 75%
                </span>
              </div>

              <span className="text-sm font-semibold text-white">
                16%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Department analytics */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-white">
              Department Performance
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Compare attendance across departments.
            </p>
          </div>

          <select
            value={department}
            onChange={(event) =>
              setDepartment(event.target.value)
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500"
          >
            <option value="all">All Departments</option>

            {departmentData.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/30">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Students
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Attendance
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Present
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Absent
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredDepartments.map((item) => (
                <tr
                  key={item.name}
                  className="transition hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-white">
                      {item.name}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-300">
                    {item.students}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${getAttendanceBar(
                            item.attendance
                          )}`}
                          style={{
                            width: `${item.attendance}%`,
                          }}
                        />
                      </div>

                      <span
                        className={`text-sm font-semibold ${getAttendanceColor(
                          item.attendance
                        )}`}
                      >
                        {item.attendance}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-emerald-400">
                    {item.present}
                  </td>

                  <td className="px-6 py-4 text-sm text-red-400">
                    {item.absent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subject analytics */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-5">
          <h2 className="font-semibold text-white">
            Subject Attendance
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Attendance performance by subject.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-5">
          {subjectData.map((subject) => (
            <div
              key={subject.code}
              className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-slate-700"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-lg bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-400">
                  {subject.code}
                </span>

                <span
                  className={`text-sm font-bold ${getAttendanceColor(
                    subject.attendance
                  )}`}
                >
                  {subject.attendance}%
                </span>
              </div>

              <h3 className="mt-4 text-sm font-semibold text-white">
                {subject.subject}
              </h3>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${getAttendanceBar(
                    subject.attendance
                  )}`}
                  style={{
                    width: `${subject.attendance}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-[11px] text-slate-600">
                Attendance rate
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            ✦
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Attendance Insights
            </h2>

            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                • Overall attendance is currently{" "}
                <span className="font-semibold text-emerald-400">
                  {averageAttendance}%
                </span>
                .
              </li>

              <li>
                • Computer Science currently has the highest
                attendance among the displayed departments.
              </li>

              <li>
                • Subjects below the configured attendance
                threshold should be reviewed for shortage alerts.
              </li>

              <li>
                • Use the Attendance Reports module to drill down
                to individual students and classes.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
