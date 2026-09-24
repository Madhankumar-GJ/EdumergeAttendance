import React, { useMemo, useState } from "react";

const initialReports = [
  {
    id: 1,
    date: "2026-09-24",
    department: "Computer Science",
    className: "CSE - A",
    subject: "Data Structures",
    totalStudents: 48,
    present: 42,
    absent: 4,
    late: 2,
  },
  {
    id: 2,
    date: "2026-09-24",
    department: "Computer Science",
    className: "CSE - B",
    subject: "Database Management",
    totalStudents: 45,
    present: 39,
    absent: 5,
    late: 1,
  },
  {
    id: 3,
    date: "2026-09-23",
    department: "Information Technology",
    className: "IT - A",
    subject: "Operating Systems",
    totalStudents: 42,
    present: 36,
    absent: 5,
    late: 1,
  },
  {
    id: 4,
    date: "2026-09-23",
    department: "Electronics",
    className: "ECE - A",
    subject: "Digital Electronics",
    totalStudents: 44,
    present: 40,
    absent: 3,
    late: 1,
  },
  {
    id: 5,
    date: "2026-09-22",
    department: "Computer Science",
    className: "CSE - A",
    subject: "Computer Networks",
    totalStudents: 48,
    present: 44,
    absent: 3,
    late: 1,
  },
  {
    id: 6,
    date: "2026-09-22",
    department: "Mechanical",
    className: "ME - A",
    subject: "Thermodynamics",
    totalStudents: 39,
    present: 31,
    absent: 6,
    late: 2,
  },
  {
    id: 7,
    date: "2026-09-21",
    department: "Civil",
    className: "CE - A",
    subject: "Structural Analysis",
    totalStudents: 40,
    present: 36,
    absent: 3,
    late: 1,
  },
];

const getPercentage = (present, total) => {
  if (!total) return 0;

  return Math.round((present / total) * 100);
};

const getColor = (percentage) => {
  if (percentage >= 90) return "text-emerald-400";
  if (percentage >= 75) return "text-amber-400";

  return "text-red-400";
};

const getBarColor = (percentage) => {
  if (percentage >= 90) return "bg-emerald-500";
  if (percentage >= 75) return "bg-amber-500";

  return "bg-red-500";
};

function AttendanceReports() {
  const [reports, setReports] = useState(initialReports);

  const [department, setDepartment] = useState("all");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  const [reportType, setReportType] = useState("daily");
  const [showGeneratePanel, setShowGeneratePanel] =
    useState(false);

  const [generatedMessage, setGeneratedMessage] =
    useState("");

  const departments = useMemo(() => {
    return [...new Set(reports.map((item) => item.department))];
  }, [reports]);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesDepartment =
        department === "all" ||
        report.department === department;

      const matchesDate =
        !date || report.date === date;

      const matchesSearch =
        !query ||
        report.className.toLowerCase().includes(query) ||
        report.subject.toLowerCase().includes(query) ||
        report.department.toLowerCase().includes(query);

      return (
        matchesDepartment &&
        matchesDate &&
        matchesSearch
      );
    });
  }, [reports, department, date, search]);

  const statistics = useMemo(() => {
    const totalStudents = filteredReports.reduce(
      (sum, item) => sum + item.totalStudents,
      0
    );

    const present = filteredReports.reduce(
      (sum, item) => sum + item.present,
      0
    );

    const absent = filteredReports.reduce(
      (sum, item) => sum + item.absent,
      0
    );

    const late = filteredReports.reduce(
      (sum, item) => sum + item.late,
      0
    );

    const attendance = getPercentage(
      present,
      totalStudents
    );

    return {
      totalStudents,
      present,
      absent,
      late,
      attendance,
    };
  }, [filteredReports]);

  const clearFilters = () => {
    setDepartment("all");
    setDate("");
    setSearch("");
    setGeneratedMessage("");
  };

  const generateReport = () => {
    setGeneratedMessage(
      `${
        reportType.charAt(0).toUpperCase() +
        reportType.slice(1)
      } attendance report generated successfully.`
    );

    setTimeout(() => {
      setGeneratedMessage("");
    }, 3500);
  };

  const exportReport = () => {
    const header =
      "Date,Department,Class,Subject,Total Students,Present,Absent,Late,Attendance %";

    const rows = filteredReports.map((report) => {
      const percentage = getPercentage(
        report.present,
        report.totalStudents
      );

      return [
        report.date,
        report.department,
        report.className,
        report.subject,
        report.totalStudents,
        report.present,
        report.absent,
        report.late,
        `${percentage}%`,
      ].join(",");
    });

    const csv = [header, ...rows].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "attendance-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const resetDemoData = () => {
    setReports(initialReports);
    clearFilters();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Attendance Reports
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Generate, analyze and export attendance reports
            across classes and departments.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={resetDemoData}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Reset Data
          </button>

          <button
            type="button"
            onClick={exportReport}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Export CSV
          </button>

          <button
            type="button"
            onClick={() => setShowGeneratePanel(true)}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            + Generate Report
          </button>
        </div>
      </div>

      {/* Success message */}
      {generatedMessage && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
            ✓
          </span>

          {generatedMessage}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Sessions
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {filteredReports.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Student Records
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {statistics.totalStudents}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Present
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {statistics.present}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Absent
          </p>

          <p className="mt-2 text-3xl font-bold text-red-400">
            {statistics.absent}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Overall Attendance
          </p>

          <p
            className={`mt-2 text-3xl font-bold ${getColor(
              statistics.attendance
            )}`}
          >
            {statistics.attendance}%
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5">
          <h2 className="font-semibold text-white">
            Report Filters
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Narrow down the attendance records you want to
            analyze.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Class, subject or department..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Department
            </label>

            <select
              value={department}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
            >
              <option value="all">
                All Departments
              </option>

              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={clearFilters}
              className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Report summary */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">
                Attendance Overview
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Current filtered attendance distribution.
              </p>
            </div>

            <span
              className={`text-2xl font-bold ${getColor(
                statistics.attendance
              )}`}
            >
              {statistics.attendance}%
            </span>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex justify-between text-xs text-slate-500">
              <span>Attendance rate</span>

              <span>
                {statistics.present} /{" "}
                {statistics.totalStudents}
              </span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getBarColor(
                  statistics.attendance
                )}`}
                style={{
                  width: `${statistics.attendance}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-emerald-500/5 p-4">
              <p className="text-xs text-slate-500">
                Present
              </p>

              <p className="mt-1 text-xl font-bold text-emerald-400">
                {statistics.present}
              </p>
            </div>

            <div className="rounded-xl bg-red-500/5 p-4">
              <p className="text-xs text-slate-500">
                Absent
              </p>

              <p className="mt-1 text-xl font-bold text-red-400">
                {statistics.absent}
              </p>
            </div>

            <div className="rounded-xl bg-amber-500/5 p-4">
              <p className="text-xs text-slate-500">
                Late
              </p>

              <p className="mt-1 text-xl font-bold text-amber-400">
                {statistics.late}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="font-semibold text-white">
            Report Types
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Available report formats.
          </p>

          <div className="mt-5 space-y-3">
            {[
              [
                "daily",
                "Daily Report",
                "Today's attendance sessions",
              ],
              [
                "weekly",
                "Weekly Report",
                "Seven-day attendance summary",
              ],
              [
                "monthly",
                "Monthly Report",
                "Monthly attendance analysis",
              ],
              [
                "shortage",
                "Shortage Report",
                "Students below threshold",
              ],
            ].map(([value, title, description]) => (
              <button
                key={value}
                type="button"
                onClick={() => setReportType(value)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  reportType === value
                    ? "border-blue-500/40 bg-blue-500/10"
                    : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-semibold ${
                      reportType === value
                        ? "text-blue-400"
                        : "text-white"
                    }`}
                  >
                    {title}
                  </span>

                  {reportType === value && (
                    <span className="text-blue-400">
                      ✓
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed report */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-800 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-white">
              Detailed Attendance Report
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Session-level attendance information.
            </p>
          </div>

          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            {filteredReports.length} Records
          </span>
        </div>

        {filteredReports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-slate-800/40">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Department
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Class
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Present
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Absent
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Late
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Rate
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {filteredReports.map((report) => {
                  const percentage = getPercentage(
                    report.present,
                    report.totalStudents
                  );

                  return (
                    <tr
                      key={report.id}
                      className="transition hover:bg-slate-800/30"
                    >
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {report.date}
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-300">
                          {report.department}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-lg bg-blue-500/10 px-2.5 py-1.5 text-xs font-semibold text-blue-400">
                          {report.className}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-white">
                          {report.subject}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center text-sm text-slate-400">
                        {report.totalStudents}
                      </td>

                      <td className="px-6 py-4 text-center text-sm font-semibold text-emerald-400">
                        {report.present}
                      </td>

                      <td className="px-6 py-4 text-center text-sm font-semibold text-red-400">
                        {report.absent}
                      </td>

                      <td className="px-6 py-4 text-center text-sm font-semibold text-amber-400">
                        {report.late}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`font-bold ${getColor(
                            percentage
                          )}`}
                        >
                          {percentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-2xl text-slate-500">
              ◌
            </div>

            <h3 className="mt-4 font-semibold text-white">
              No records found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Change your filters and try again.
            </p>
          </div>
        )}
      </div>

      {/* Generate report modal */}
      {showGeneratePanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Generate Attendance Report
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Configure the report before generating it.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowGeneratePanel(false)
                }
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Report Type
                </label>

                <select
                  value={reportType}
                  onChange={(event) =>
                    setReportType(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                >
                  <option value="daily">
                    Daily Attendance
                  </option>

                  <option value="weekly">
                    Weekly Attendance
                  </option>

                  <option value="monthly">
                    Monthly Attendance
                  </option>

                  <option value="shortage">
                    Shortage Report
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Department
                </label>

                <select
                  value={department}
                  onChange={(event) =>
                    setDepartment(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                >
                  <option value="all">
                    All Departments
                  </option>

                  {departments.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <p className="text-xs text-blue-400">
                  Report Preview
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  The generated report will contain{" "}
                  <span className="font-semibold text-white">
                    {filteredReports.length}
                  </span>{" "}
                  attendance sessions and{" "}
                  <span className="font-semibold text-white">
                    {statistics.totalStudents}
                  </span>{" "}
                  student records.
                </p>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setShowGeneratePanel(false)
                  }
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    generateReport();
                    setShowGeneratePanel(false);
                  }}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendanceReports;
