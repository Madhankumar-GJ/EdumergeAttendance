import React, { useMemo, useState } from "react";

const INITIAL_STUDENTS = [
  {
    id: 1,
    rollNo: "23CSE001",
    name: "Aarav Sharma",
    subjectAttendance: {
      "Data Structures": 88,
      Algorithms: 82,
      "Database Systems": 76,
      "Operating Systems": 91,
      "Computer Networks": 84,
    },
  },
  {
    id: 2,
    rollNo: "23CSE002",
    name: "Ananya Singh",
    subjectAttendance: {
      "Data Structures": 94,
      Algorithms: 89,
      "Database Systems": 91,
      "Operating Systems": 87,
      "Computer Networks": 93,
    },
  },
  {
    id: 3,
    rollNo: "23CSE003",
    name: "Arjun Kumar",
    subjectAttendance: {
      "Data Structures": 68,
      Algorithms: 73,
      "Database Systems": 71,
      "Operating Systems": 65,
      "Computer Networks": 78,
    },
  },
  {
    id: 4,
    rollNo: "23CSE004",
    name: "Diya Patel",
    subjectAttendance: {
      "Data Structures": 97,
      Algorithms: 92,
      "Database Systems": 95,
      "Operating Systems": 94,
      "Computer Networks": 90,
    },
  },
  {
    id: 5,
    rollNo: "23CSE005",
    name: "Ishaan Reddy",
    subjectAttendance: {
      "Data Structures": 79,
      Algorithms: 81,
      "Database Systems": 74,
      "Operating Systems": 83,
      "Computer Networks": 77,
    },
  },
  {
    id: 6,
    rollNo: "23CSE006",
    name: "Kavya Menon",
    subjectAttendance: {
      "Data Structures": 86,
      Algorithms: 91,
      "Database Systems": 88,
      "Operating Systems": 90,
      "Computer Networks": 85,
    },
  },
];

const SUBJECTS = [
  "All Subjects",
  "Data Structures",
  "Algorithms",
  "Database Systems",
  "Operating Systems",
  "Computer Networks",
];

function StudentAttendance() {
  const [students] =
    useState(INITIAL_STUDENTS);

  const [search, setSearch] =
    useState("");

  const [subject, setSubject] =
    useState("All Subjects");

  const [status, setStatus] =
    useState("All");

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const filteredStudents = useMemo(() => {
    return students.filter(
      (student) => {
        const matchesSearch =
          student.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          student.rollNo
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const average =
          getAverageAttendance(
            student
          );

        const matchesStatus =
          status === "All" ||
          (status === "Good" &&
            average >= 75) ||
          (status === "Shortage" &&
            average < 75);

        const matchesSubject =
          subject ===
            "All Subjects" ||
          student.subjectAttendance[
            subject
          ] !== undefined;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesSubject
        );
      }
    );
  }, [
    students,
    search,
    subject,
    status,
  ]);

  const statistics = useMemo(() => {
    const averages =
      students.map(
        getAverageAttendance
      );

    const overall =
      averages.length
        ? Math.round(
            averages.reduce(
              (sum, value) =>
                sum + value,
              0
            ) /
              averages.length
          )
        : 0;

    const good =
      averages.filter(
        (value) => value >= 75
      ).length;

    const shortage =
      averages.filter(
        (value) => value < 75
      ).length;

    return {
      overall,
      total: students.length,
      good,
      shortage,
    };
  }, [students]);

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(
      () => setToast(""),
      2500
    );
  };

  const openDetails = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  const exportAttendance = () => {
    const header =
      "Roll No,Student Name,Average Attendance,Status";

    const rows =
      filteredStudents.map(
        (student) => {
          const average =
            getAverageAttendance(
              student
            );

          return [
            student.rollNo,
            student.name,
            `${average}%`,
            average >= 75
              ? "Good"
              : "Shortage",
          ].join(",");
        }
      );

    const csv = [
      header,
      ...rows,
    ].join("\n");

    const blob =
      new Blob([csv], {
        type: "text/csv",
      });

    const url =
      URL.createObjectURL(blob);

    const anchor =
      document.createElement(
        "a"
      );

    anchor.href = url;
    anchor.download =
      "student-attendance.csv";

    document.body.appendChild(
      anchor
    );

    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);

    showToast(
      "Attendance report exported."
    );
  };

  return (
    <div className="space-y-6">
      {/* TOAST */}
      {toast && (
        <div className="fixed right-6 top-6 z-[100] rounded-xl border border-emerald-500/20 bg-slate-900 px-5 py-4 text-sm font-medium text-emerald-400 shadow-2xl">
          ✓ {toast}
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Student Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Student Attendance
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Monitor attendance,
            identify shortages and
            review student records.
          </p>
        </div>

        <button
          type="button"
          onClick={exportAttendance}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          ↓ Export CSV
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Overall Attendance"
          value={`${statistics.overall}%`}
          icon="◔"
          color="blue"
        />

        <StatCard
          label="Total Students"
          value={statistics.total}
          icon="♙"
          color="purple"
        />

        <StatCard
          label="Above 75%"
          value={statistics.good}
          icon="✓"
          color="emerald"
        />

        <StatCard
          label="Attendance Shortage"
          value={statistics.shortage}
          icon="!"
          color="red"
        />
      </div>

      {/* FILTERS */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search student or roll number..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 text-xs text-white outline-none placeholder:text-slate-700 focus:border-blue-500"
            />
          </div>

          <select
            value={subject}
            onChange={(event) =>
              setSubject(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-slate-300 outline-none focus:border-blue-500"
          >
            {SUBJECTS.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-slate-300 outline-none focus:border-blue-500"
          >
            <option value="All">
              All Attendance
            </option>

            <option value="Good">
              Above 75%
            </option>

            <option value="Shortage">
              Below 75%
            </option>
          </select>
        </div>
      </section>

      {/* TABLE */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div>
            <h2 className="font-semibold text-white">
              Attendance Records
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Showing{" "}
              {filteredStudents.length}{" "}
              of {students.length}{" "}
              students
            </p>
          </div>

          <span className="rounded-lg bg-slate-800 px-3 py-2 text-[10px] text-slate-500">
            Minimum: 75%
          </span>
        </div>

        {filteredStudents.length ===
        0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Student
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Average
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Data Structures
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Algorithms
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Database
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Status
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {filteredStudents.map(
                  (student) => {
                    const average =
                      getAverageAttendance(
                        student
                      );

                    return (
                      <tr
                        key={student.id}
                        className="transition hover:bg-slate-800/30"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-[10px] font-bold text-blue-400">
                              {getInitials(
                                student.name
                              )}
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-300">
                                {
                                  student.name
                                }
                              </p>

                              <p className="mt-1 text-[10px] text-slate-700">
                                {
                                  student.rollNo
                                }
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-800">
                              <div
                                className={`h-full rounded-full ${
                                  getAttendanceColor(
                                    average
                                  )
                                }`}
                                style={{
                                  width: `${average}%`,
                                }}
                              />
                            </div>

                            <span className="text-xs font-semibold text-white">
                              {average}%
                            </span>
                          </div>
                        </td>

                        <AttendanceCell
                          value={
                            student
                              .subjectAttendance[
                              "Data Structures"
                            ]
                          }
                        />

                        <AttendanceCell
                          value={
                            student
                              .subjectAttendance[
                              "Algorithms"
                            ]
                          }
                        />

                        <AttendanceCell
                          value={
                            student
                              .subjectAttendance[
                              "Database Systems"
                            ]
                          }
                        />

                        <td className="px-5 py-4">
                          <StatusBadge
                            value={
                              average >=
                              75
                                ? "Good"
                                : "Shortage"
                            }
                          />
                        </td>

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              openDetails(
                                student
                              )
                            }
                            className="rounded-lg border border-slate-700 px-3 py-2 text-[10px] font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* SHORTAGE INFORMATION */}
      <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            !
          </div>

          <div>
            <h3 className="text-sm font-semibold text-amber-300">
              Attendance Policy
            </h3>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-500">
              Students with attendance
              below 75% are flagged for
              shortage. The system can
              automatically identify these
              students for follow-up,
              notifications and shortage
              reports.
            </p>
          </div>
        </div>
      </section>

      {/* DETAILS MODAL */}
      {showDetails &&
        selectedStudent && (
          <StudentDetailsModal
            student={
              selectedStudent
            }
            onClose={() =>
              setShowDetails(false)
            }
          />
        )}
    </div>
  );
}

/* =========================================
   STAT CARD
========================================= */

function StatCard({
  label,
  value,
  icon,
  color,
}) {
  const styles = {
    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
    purple:
      "border-purple-500/20 bg-purple-500/10 text-purple-400",
    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    red:
      "border-red-500/20 bg-red-500/10 text-red-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${styles[color]}`}
      >
        {icon}
      </div>

      <p className="mt-5 text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

/* =========================================
   ATTENDANCE CELL
========================================= */

function AttendanceCell({
  value,
}) {
  return (
    <td className="px-5 py-4">
      <span
        className={`text-xs font-semibold ${
          value >= 75
            ? "text-emerald-400"
            : "text-red-400"
        }`}
      >
        {value}%
      </span>
    </td>
  );
}

/* =========================================
   STATUS BADGE
========================================= */

function StatusBadge({
  value,
}) {
  const good = value === "Good";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
        good
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-red-500/10 text-red-400"
      }`}
    >
      {good
        ? "Good"
        : "Shortage"}
    </span>
  );
}

/* =========================================
   EMPTY STATE
========================================= */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-xl text-slate-600">
        ⌕
      </div>

      <h3 className="mt-4 text-sm font-semibold text-white">
        No students found
      </h3>

      <p className="mt-1 text-xs text-slate-600">
        Try changing your search or
        filters.
      </p>
    </div>
  );
}

/* =========================================
   DETAILS MODAL
========================================= */

function StudentDetailsModal({
  student,
  onClose,
}) {
  const average =
    getAverageAttendance(student);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 font-bold text-blue-400">
              {getInitials(
                student.name
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                {student.name}
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                {student.rollNo}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* OVERALL */}
        <div className="border-b border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">
                Overall Attendance
              </p>

              <p
                className={`mt-1 text-3xl font-bold ${
                  average >= 75
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {average}%
              </p>
            </div>

            <StatusBadge
              value={
                average >= 75
                  ? "Good"
                  : "Shortage"
              }
            />
          </div>
        </div>

        {/* SUBJECTS */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-white">
            Subject-wise Attendance
          </h3>

          <div className="mt-4 space-y-4">
            {Object.entries(
              student.subjectAttendance
            ).map(
              ([
                subjectName,
                percentage,
              ]) => (
                <div
                  key={subjectName}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {subjectName}
                    </span>

                    <span
                      className={`text-xs font-semibold ${
                        percentage >=
                        75
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {percentage}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${
                        getAttendanceColor(
                          percentage
                        )
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end border-t border-slate-800 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   HELPERS
========================================= */

function getAverageAttendance(
  student
) {
  const values = Object.values(
    student.subjectAttendance
  );

  if (!values.length) {
    return 0;
  }

  return Math.round(
    values.reduce(
      (sum, value) =>
        sum + value,
      0
    ) / values.length
  );
}

function getAttendanceColor(
  percentage
) {
  if (percentage >= 85) {
    return "bg-emerald-500";
  }

  if (percentage >= 75) {
    return "bg-blue-500";
  }

  if (percentage >= 65) {
    return "bg-amber-500";
  }

  return "bg-red-500";
}

function getInitials(name) {
  return name
    .split(" ")
    .map((part) =>
      part.charAt(0)
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default StudentAttendance;
