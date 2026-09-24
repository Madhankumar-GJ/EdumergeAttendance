import React, { useMemo, useState } from "react";

const students = [
  {
    id: "STU-001",
    name: "Aarav Sharma",
    rollNo: "CS001",
    className: "BCA - III A",
    status: "Present",
  },
  {
    id: "STU-002",
    name: "Ananya Patel",
    rollNo: "CS002",
    className: "BCA - III A",
    status: "Present",
  },
  {
    id: "STU-003",
    name: "Rahul Kumar",
    rollNo: "CS003",
    className: "BCA - III A",
    status: "Absent",
  },
  {
    id: "STU-004",
    name: "Priya Nair",
    rollNo: "CS004",
    className: "BCA - III A",
    status: "Present",
  },
  {
    id: "STU-005",
    name: "Vivek Reddy",
    rollNo: "CS005",
    className: "BCA - III A",
    status: "Late",
  },
  {
    id: "STU-006",
    name: "Sneha Gupta",
    rollNo: "CS006",
    className: "BCA - III A",
    status: "Present",
  },
  {
    id: "STU-007",
    name: "Karan Singh",
    rollNo: "CS007",
    className: "BCA - III A",
    status: "Leave",
  },
  {
    id: "STU-008",
    name: "Ishita Rao",
    rollNo: "CS008",
    className: "BCA - III A",
    status: "Present",
  },
  {
    id: "STU-009",
    name: "Aditya Mehta",
    rollNo: "CS009",
    className: "BCA - III A",
    status: "Absent",
  },
  {
    id: "STU-010",
    name: "Neha Joshi",
    rollNo: "CS010",
    className: "BCA - III A",
    status: "Present",
  },
  {
    id: "STU-011",
    name: "Rohan Das",
    rollNo: "CS011",
    className: "BCA - III A",
    status: "Present",
  },
  {
    id: "STU-012",
    name: "Meera Shah",
    rollNo: "CS012",
    className: "BCA - III A",
    status: "Late",
  },
];

const subjects = [
  "Data Structures",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "Web Development",
];

const classes = [
  "BCA - III A",
  "BCA - III B",
  "BCA - II A",
  "BCA - II B",
  "BSc CS - III A",
];

const statusOptions = [
  "Present",
  "Absent",
  "Late",
  "Leave",
];

function MarkAttendance() {
  const [selectedDate, setSelectedDate] =
    useState(getToday());

  const [selectedClass, setSelectedClass] =
    useState("BCA - III A");

  const [selectedSubject, setSelectedSubject] =
    useState("Data Structures");

  const [period, setPeriod] =
    useState("1");

  const [search, setSearch] =
    useState("");

  const [attendance, setAttendance] =
    useState(() =>
      Object.fromEntries(
        students.map((student) => [
          student.id,
          student.status,
        ])
      )
    );

  const [saved, setSaved] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const filteredStudents = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return students;
    }

    return students.filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(query) ||
        student.rollNo
          .toLowerCase()
          .includes(query)
    );
  }, [search]);

  const stats = useMemo(() => {
    const values = Object.values(
      attendance
    );

    const present = values.filter(
      (value) => value === "Present"
    ).length;

    const absent = values.filter(
      (value) => value === "Absent"
    ).length;

    const late = values.filter(
      (value) => value === "Late"
    ).length;

    const leave = values.filter(
      (value) => value === "Leave"
    ).length;

    const total = values.length;

    const percentage =
      total === 0
        ? 0
        : Math.round(
            (present / total) * 100
          );

    return {
      present,
      absent,
      late,
      leave,
      total,
      percentage,
    };
  }, [attendance]);

  const updateStudentStatus = (
    studentId,
    status
  ) => {
    setAttendance((current) => ({
      ...current,
      [studentId]: status,
    }));

    setSaved(false);
  };

  const markAll = (status) => {
    setAttendance(
      Object.fromEntries(
        students.map((student) => [
          student.id,
          status,
        ])
      )
    );

    setSaved(false);

    showToast(
      `All students marked ${status.toLowerCase()}.`
    );
  };

  const saveAttendance = () => {
    /*
      This is currently frontend/local state.
      Later we can connect this directly to
      attendanceStore / API / database.
    */

    setSaved(true);

    showToast(
      "Attendance saved successfully."
    );
  };

  const resetAttendance = () => {
    setAttendance(
      Object.fromEntries(
        students.map((student) => [
          student.id,
          "Present",
        ])
      )
    );

    setSaved(false);

    showToast(
      "Attendance reset."
    );
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
            Attendance / Mark Attendance
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Mark Attendance
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Record student attendance for
            the selected class, subject and
            period.
          </p>
        </div>

        <div
          className={`rounded-xl border px-4 py-3 ${
            saved
              ? "border-emerald-500/20 bg-emerald-500/10"
              : "border-amber-500/20 bg-amber-500/10"
          }`}
        >
          <p className="text-xs text-slate-500">
            Attendance status
          </p>

          <p
            className={`mt-1 text-sm font-semibold ${
              saved
                ? "text-emerald-400"
                : "text-amber-400"
            }`}
          >
            {saved
              ? "Saved"
              : "Unsaved changes"}
          </p>
        </div>
      </div>

      {/* CLASS / SESSION CONFIGURATION */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5">
          <h2 className="font-semibold text-white">
            Attendance Session
          </h2>

          <p className="mt-1 text-xs text-slate-600">
            Select the class, subject and
            period before marking attendance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* DATE */}
          <Field label="Date">
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => {
                setSelectedDate(
                  event.target.value
                );
                setSaved(false);
              }}
              className="field"
            />
          </Field>

          {/* CLASS */}
          <Field label="Class">
            <select
              value={selectedClass}
              onChange={(event) => {
                setSelectedClass(
                  event.target.value
                );
                setSaved(false);
              }}
              className="field"
            >
              {classes.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </Field>

          {/* SUBJECT */}
          <Field label="Subject">
            <select
              value={selectedSubject}
              onChange={(event) => {
                setSelectedSubject(
                  event.target.value
                );
                setSaved(false);
              }}
              className="field"
            >
              {subjects.map((subject) => (
                <option
                  key={subject}
                  value={subject}
                >
                  {subject}
                </option>
              ))}
            </select>
          </Field>

          {/* PERIOD */}
          <Field label="Period">
            <select
              value={period}
              onChange={(event) => {
                setPeriod(
                  event.target.value
                );
                setSaved(false);
              }}
              className="field"
            >
              {[
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
              ].map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  Period {item}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <AttendanceStat
          label="Total"
          value={stats.total}
          icon="👥"
          color="blue"
        />

        <AttendanceStat
          label="Present"
          value={stats.present}
          icon="✓"
          color="emerald"
        />

        <AttendanceStat
          label="Absent"
          value={stats.absent}
          icon="✕"
          color="red"
        />

        <AttendanceStat
          label="Late"
          value={stats.late}
          icon="⏱"
          color="amber"
        />

        <AttendanceStat
          label="Attendance"
          value={`${stats.percentage}%`}
          icon="◉"
          color="purple"
        />
      </div>

      {/* CONTROLS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search student name or roll number..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                markAll("Present")
              }
              className="rounded-xl bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
            >
              ✓ Mark All Present
            </button>

            <button
              type="button"
              onClick={() =>
                markAll("Absent")
              }
              className="rounded-xl bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
            >
              ✕ Mark All Absent
            </button>

            <button
              type="button"
              onClick={resetAttendance}
              className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* ATTENDANCE TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div>
            <h2 className="font-semibold text-white">
              Student Roster
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              {filteredStudents.length}{" "}
              students displayed
            </p>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-xs text-slate-600">
              {selectedDate}
            </p>

            <p className="mt-1 text-xs font-medium text-slate-500">
              {selectedSubject} •
              Period {period}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/30 text-left">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  #
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Student
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Roll No.
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Attendance
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Current Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length ===
              0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-16 text-center"
                  >
                    <div className="text-4xl">
                      🔎
                    </div>

                    <p className="mt-3 font-medium text-white">
                      No students found
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      Try a different
                      search.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map(
                  (student, index) => {
                    const status =
                      attendance[
                        student.id
                      ] ||
                      "Present";

                    return (
                      <tr
                        key={student.id}
                        className="border-b border-slate-800 transition hover:bg-slate-800/20"
                      >
                        {/* INDEX */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </td>

                        {/* STUDENT */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-400">
                              {getInitials(
                                student.name
                              )}
                            </div>

                            <div>
                              <p className="font-medium text-white">
                                {
                                  student.name
                                }
                              </p>

                              <p className="mt-1 text-xs text-slate-600">
                                {
                                  student.className
                                }
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* ROLL */}
                        <td className="px-5 py-4 text-sm font-medium text-slate-400">
                          {
                            student.rollNo
                          }
                        </td>

                        {/* BUTTONS */}
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            {statusOptions.map(
                              (
                                option
                              ) => (
                                <button
                                  key={
                                    option
                                  }
                                  type="button"
                                  onClick={() =>
                                    updateStudentStatus(
                                      student.id,
                                      option
                                    )
                                  }
                                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                                    status ===
                                    option
                                      ? getActiveStatusClass(
                                          option
                                        )
                                      : "border-slate-700 bg-slate-800/50 text-slate-600 hover:border-slate-600 hover:text-slate-300"
                                  }`}
                                >
                                  {getStatusIcon(
                                    option
                                  )}{" "}
                                  {
                                    option
                                  }
                                </button>
                              )
                            )}
                          </div>
                        </td>

                        {/* STATUS */}
                        <td className="px-5 py-4">
                          <StatusBadge
                            status={
                              status
                            }
                          />
                        </td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-3 border-t border-slate-800 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-slate-600">
              {stats.present} present •{" "}
              {stats.absent} absent •{" "}
              {stats.late} late •{" "}
              {stats.leave} on leave
            </p>
          </div>

          <button
            type="button"
            onClick={saveAttendance}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
          >
            Save Attendance
          </button>
        </div>
      </div>

      {/* SESSION INFORMATION */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <InfoCard
          icon="📅"
          title="Session Date"
          value={formatDate(
            selectedDate
          )}
        />

        <InfoCard
          icon="📚"
          title="Subject"
          value={selectedSubject}
        />

        <InfoCard
          icon="🏫"
          title="Class"
          value={`${selectedClass} • Period ${period}`}
        />
      </div>
    </div>
  );
}

/* =========================================
   COMPONENTS
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

function AttendanceStat({
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

        <p className="text-2xl font-bold text-white">
          {value}
        </p>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}) {
  const classes = {
    Present:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    Absent:
      "border-red-500/20 bg-red-500/10 text-red-400",

    Late:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",

    Leave:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${classes[status]}`}
    >
      {getStatusIcon(status)}{" "}
      {status}
    </span>
  );
}

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-lg">
          {icon}
        </div>

        <div>
          <p className="text-xs text-slate-600">
            {title}
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-300">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   HELPERS
========================================= */

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getStatusIcon(status) {
  const icons = {
    Present: "✓",
    Absent: "✕",
    Late: "⏱",
    Leave: "↗",
  };

  return icons[status] || "•";
}

function getActiveStatusClass(
  status
) {
  const classes = {
    Present:
      "border-emerald-500/40 bg-emerald-500/15 text-emerald-400",

    Absent:
      "border-red-500/40 bg-red-500/15 text-red-400",

    Late:
      "border-amber-500/40 bg-amber-500/15 text-amber-400",

    Leave:
      "border-blue-500/40 bg-blue-500/15 text-blue-400",
  };

  return classes[status];
}

function getToday() {
  return new Date()
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

export default MarkAttendance;
