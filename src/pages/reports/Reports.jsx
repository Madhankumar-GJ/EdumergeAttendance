import React, { useMemo, useState } from "react";

const reportTypes = [
  {
    id: "attendance",
    title: "Attendance Report",
    description:
      "View attendance performance by student, class, subject and date range.",
    icon: "📊",
    color: "blue",
  },
  {
    id: "shortage",
    title: "Attendance Shortage",
    description:
      "Identify students whose attendance is below the required threshold.",
    icon: "⚠",
    color: "amber",
  },
  {
    id: "student",
    title: "Student Attendance",
    description:
      "Generate detailed attendance history for individual students.",
    icon: "👨‍🎓",
    color: "purple",
  },
  {
    id: "teacher",
    title: "Teacher Report",
    description:
      "Review teacher workload, classes, subjects and attendance activity.",
    icon: "👨‍🏫",
    color: "cyan",
  },
  {
    id: "class",
    title: "Class Performance",
    description:
      "Compare attendance percentages across classes and departments.",
    icon: "🏫",
    color: "emerald",
  },
  {
    id: "leave",
    title: "Leave Report",
    description:
      "View approved, pending and rejected leave requests.",
    icon: "📄",
    color: "rose",
  },
];

const sampleRows = [
  {
    name: "Aarav Sharma",
    roll: "CS001",
    className: "BCA - III A",
    present: 46,
    absent: 4,
    leave: 2,
    percentage: 88,
  },
  {
    name: "Ananya Patel",
    roll: "CS002",
    className: "BCA - III A",
    present: 48,
    absent: 2,
    leave: 1,
    percentage: 94,
  },
  {
    name: "Rahul Kumar",
    roll: "CS003",
    className: "BCA - III A",
    present: 38,
    absent: 10,
    leave: 3,
    percentage: 74,
  },
  {
    name: "Priya Nair",
    roll: "CS004",
    className: "BCA - III A",
    present: 47,
    absent: 3,
    leave: 1,
    percentage: 92,
  },
  {
    name: "Vivek Reddy",
    roll: "CS005",
    className: "BCA - III A",
    present: 43,
    absent: 6,
    leave: 2,
    percentage: 84,
  },
  {
    name: "Sneha Gupta",
    roll: "CS006",
    className: "BCA - III A",
    present: 49,
    absent: 1,
    leave: 0,
    percentage: 98,
  },
  {
    name: "Karan Singh",
    roll: "CS007",
    className: "BCA - III A",
    present: 41,
    absent: 8,
    leave: 2,
    percentage: 80,
  },
  {
    name: "Ishita Rao",
    roll: "CS008",
    className: "BCA - III A",
    present: 45,
    absent: 4,
    leave: 2,
    percentage: 87,
  },
];

function Reports() {
  const [reportType, setReportType] =
    useState("attendance");

  const [fromDate, setFromDate] =
    useState(getFirstDayOfMonth());

  const [toDate, setToDate] =
    useState(getToday());

  const [department, setDepartment] =
    useState("Computer Science");

  const [className, setClassName] =
    useState("All Classes");

  const [subject, setSubject] =
    useState("All Subjects");

  const [search, setSearch] =
    useState("");

  const [generated, setGenerated] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const selectedReport = reportTypes.find(
    (report) =>
      report.id === reportType
  );

  const filteredRows = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) return sampleRows;

    return sampleRows.filter(
      (row) =>
        row.name
          .toLowerCase()
          .includes(query) ||
        row.roll
          .toLowerCase()
          .includes(query) ||
        row.className
          .toLowerCase()
          .includes(query)
    );
  }, [search]);

  const totals = useMemo(() => {
    const totalPresent =
      filteredRows.reduce(
        (sum, row) =>
          sum + row.present,
        0
      );

    const totalAbsent =
      filteredRows.reduce(
        (sum, row) =>
          sum + row.absent,
        0
      );

    const totalLeave =
      filteredRows.reduce(
        (sum, row) =>
          sum + row.leave,
        0
      );

    const average =
      filteredRows.length === 0
        ? 0
        : Math.round(
            filteredRows.reduce(
              (sum, row) =>
                sum + row.percentage,
              0
            ) / filteredRows.length
          );

    const shortage =
      filteredRows.filter(
        (row) => row.percentage < 75
      ).length;

    return {
      totalPresent,
      totalAbsent,
      totalLeave,
      average,
      shortage,
    };
  }, [filteredRows]);

  const generateReport = () => {
    setGenerated(true);

    showToast(
      `${selectedReport?.title || "Report"} generated successfully.`
    );
  };

  const exportCSV = () => {
    const headers = [
      "Student",
      "Roll No",
      "Class",
      "Present",
      "Absent",
      "Leave",
      "Attendance %",
    ];

    const rows = filteredRows.map(
      (row) => [
        row.name,
        row.roll,
        row.className,
        row.present,
        row.absent,
        row.leave,
        `${row.percentage}%`,
      ]
    );

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(
              /"/g,
              '""'
            )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = `attendance-report-${fromDate}-${toDate}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showToast(
      "CSV report exported successfully."
    );
  };

  const printReport = () => {
    window.print();
  };

  const resetFilters = () => {
    setReportType("attendance");
    setFromDate(getFirstDayOfMonth());
    setToDate(getToday());
    setDepartment(
      "Computer Science"
    );
    setClassName("All Classes");
    setSubject("All Subjects");
    setSearch("");
    setGenerated(false);

    showToast("Filters reset.");
  };

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* TOAST */}
      {toast && (
        <div className="fixed right-6 top-6 z-[100] rounded-xl border border-emerald-500/20 bg-slate-900 px-5 py-4 text-sm font-medium text-emerald-400 shadow-2xl">
          ✓ {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Analytics / Reports
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Reports
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Generate, analyze and export
            attendance and academic
            management reports.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={printReport}
            className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
          >
            🖨 Print
          </button>

          <button
            type="button"
            onClick={exportCSV}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"
          >
            ↓ Export CSV
          </button>
        </div>
      </div>

      {/* REPORT TYPE */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold text-white">
            Report Type
          </h2>

          <p className="mt-1 text-xs text-slate-600">
            Select the report you want to
            generate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reportTypes.map((report) => (
            <ReportTypeCard
              key={report.id}
              report={report}
              selected={
                report.id === reportType
              }
              onClick={() => {
                setReportType(
                  report.id
                );
                setGenerated(false);
              }}
            />
          ))}
        </div>
      </section>

      {/* FILTERS */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-white">
              Report Filters
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Configure the data range and
              academic scope.
            </p>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="self-start rounded-lg px-3 py-2 text-xs text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            Reset filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Field label="From Date">
            <input
              type="date"
              value={fromDate}
              onChange={(event) => {
                setFromDate(
                  event.target.value
                );
                setGenerated(false);
              }}
              className="report-field"
            />
          </Field>

          <Field label="To Date">
            <input
              type="date"
              value={toDate}
              onChange={(event) => {
                setToDate(
                  event.target.value
                );
                setGenerated(false);
              }}
              className="report-field"
            />
          </Field>

          <Field label="Department">
            <select
              value={department}
              onChange={(event) => {
                setDepartment(
                  event.target.value
                );
                setGenerated(false);
              }}
              className="report-field"
            >
              <option>
                Computer Science
              </option>
              <option>
                Information Technology
              </option>
              <option>
                Electronics
              </option>
              <option>
                Commerce
              </option>
              <option>
                Management
              </option>
            </select>
          </Field>

          <Field label="Class">
            <select
              value={className}
              onChange={(event) => {
                setClassName(
                  event.target.value
                );
                setGenerated(false);
              }}
              className="report-field"
            >
              <option>
                All Classes
              </option>
              <option>
                BCA - III A
              </option>
              <option>
                BCA - III B
              </option>
              <option>
                BCA - II A
              </option>
              <option>
                BCA - II B
              </option>
              <option>
                BSc CS - III A
              </option>
            </select>
          </Field>

          <Field label="Subject">
            <select
              value={subject}
              onChange={(event) => {
                setSubject(
                  event.target.value
                );
                setGenerated(false);
              }}
              className="report-field"
            >
              <option>
                All Subjects
              </option>
              <option>
                Data Structures
              </option>
              <option>
                Database Management Systems
              </option>
              <option>
                Operating Systems
              </option>
              <option>
                Computer Networks
              </option>
              <option>
                Web Development
              </option>
            </select>
          </Field>

          <Field label="Search Student">
            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Name or roll number..."
              className="report-field"
            />
          </Field>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={generateReport}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
          >
            Generate Report
          </button>
        </div>
      </section>

      {/* REPORT RESULT */}
      <section
        className="print-area space-y-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl border ${getReportColor(
                  selectedReport?.color
                )}`}
              >
                {selectedReport?.icon}
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  {selectedReport?.title}
                </h2>

                <p className="mt-1 text-xs text-slate-600">
                  {generated
                    ? "Generated report"
                    : "Preview"}
                </p>
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs text-slate-600">
              Reporting Period
            </p>

            <p className="mt-1 text-sm font-medium text-slate-400">
              {formatDate(fromDate)} —{" "}
              {formatDate(toDate)}
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <ReportStat
            label="Students"
            value={filteredRows.length}
            icon="👥"
            color="blue"
          />

          <ReportStat
            label="Present"
            value={totals.totalPresent}
            icon="✓"
            color="emerald"
          />

          <ReportStat
            label="Absent"
            value={totals.totalAbsent}
            icon="✕"
            color="red"
          />

          <ReportStat
            label="Leave"
            value={totals.totalLeave}
            icon="📄"
            color="amber"
          />

          <ReportStat
            label="Average"
            value={`${totals.average}%`}
            icon="◉"
            color="purple"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="flex flex-col gap-3 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-white">
                Attendance Details
              </h3>

              <p className="mt-1 text-xs text-slate-600">
                {filteredRows.length} records
                available
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-800/50 px-3 py-2 text-xs text-slate-500">
              Threshold:{" "}
              <span className="font-semibold text-amber-400">
                75%
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/30 text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Student
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Roll No.
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Class
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Present
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Absent
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Leave
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Attendance
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRows.length ===
                0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-16 text-center"
                    >
                      <div className="text-4xl">
                        🔎
                      </div>

                      <p className="mt-3 font-medium text-white">
                        No records found
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Try changing your
                        search or filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredRows.map(
                    (row) => (
                      <tr
                        key={row.roll}
                        className="border-b border-slate-800 transition hover:bg-slate-800/20"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-400">
                              {getInitials(
                                row.name
                              )}
                            </div>

                            <span className="text-sm font-medium text-slate-300">
                              {row.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {row.roll}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {row.className}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-emerald-400">
                          {row.present}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-red-400">
                          {row.absent}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-amber-400">
                          {row.leave}
                        </td>

                        <td className="px-5 py-4">
                          <AttendanceBadge
                            percentage={
                              row.percentage
                            }
                          />
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SHORTAGE ALERT */}
        {totals.shortage > 0 && (
          <div className="flex flex-col gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-lg text-amber-400">
              ⚠
            </div>

            <div>
              <p className="font-semibold text-amber-300">
                Attendance shortage detected
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {totals.shortage} student
                {totals.shortage !== 1
                  ? "s"
                  : ""}{" "}
                currently have attendance
                below the 75% threshold.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

/* =========================================
   REPORT TYPE CARD
========================================= */

function ReportTypeCard({
  report,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-2xl border p-5 text-left transition ${
        selected
          ? "border-blue-500/40 bg-blue-500/5 shadow-lg shadow-blue-500/5"
          : "border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800/50"
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${getReportColor(
            report.color
          )}`}
        >
          {report.icon}
        </div>

        {selected && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            ✓
          </span>
        )}
      </div>

      <h3 className="mt-4 font-semibold text-white">
        {report.title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-600">
        {report.description}
      </p>
    </button>
  );
}

/* =========================================
   REPORT STAT
========================================= */

function ReportStat({
  label,
  value,
  icon,
  color,
}) {
  const colors = {
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    red: "border-red-500/20 bg-red-500/10 text-red-400",
    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
    purple:
      "border-purple-500/20 bg-purple-500/10 text-purple-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${colors[color]}`}
        >
          {icon}
        </div>

        <span className="text-2xl font-bold text-white">
          {value}
        </span>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}

/* =========================================
   ATTENDANCE BADGE
========================================= */

function AttendanceBadge({
  percentage,
}) {
  let classes =
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";

  if (percentage < 75) {
    classes =
      "border-red-500/20 bg-red-500/10 text-red-400";
  } else if (percentage < 85) {
    classes =
      "border-amber-500/20 bg-amber-500/10 text-amber-400";
  }

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${classes}`}
    >
      {percentage}%
    </span>
  );
}

/* =========================================
   FIELD
========================================= */

function Field({
  label,
  children,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-500">
        {label}
      </label>

      {children}
    </div>
  );
}

/* =========================================
   HELPERS
========================================= */

function getReportColor(color) {
  const colors = {
    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",

    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",

    purple:
      "border-purple-500/20 bg-purple-500/10 text-purple-400",

    cyan:
      "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",

    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    rose:
      "border-rose-500/20 bg-rose-500/10 text-rose-400",
  };

  return (
    colors[color] || colors.blue
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getToday() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

function getFirstDayOfMonth() {
  const date = new Date();

  date.setDate(1);

  return date
    .toISOString()
    .split("T")[0];
}

function formatDate(date) {
  if (!date) return "—";

  const parsed =
    new Date(`${date}T00:00:00`);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return date;
  }

  return parsed.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default Reports;
