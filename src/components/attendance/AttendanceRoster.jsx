import React, { useMemo, useState } from "react";

import {
  Search,
  CheckCheck,
  UserCheck,
  AlertTriangle,
} from "lucide-react";

import AttendanceStatusButton from "./AttendanceStatusButton";

const STATUSES = [
  "present",
  "absent",
  "late",
  "excused",
  "on-duty",
];

export default function AttendanceRoster({
  students = [],
  attendanceMap,
  setAttendanceMap,
  minimumAttendance = 75,
}) {
  const [search, setSearch] =
    useState("");

  const filteredStudents = useMemo(() => {
    const query =
      search.toLowerCase().trim();

    if (!query) {
      return students;
    }

    return students.filter((student) =>
      [
        student.name,
        student.rollNumber,
        student.email,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [students, search]);

  const setStatus = (
    studentId,
    status
  ) => {
    setAttendanceMap((previous) => ({
      ...previous,
      [studentId]: status,
    }));
  };

  const markAll = (status) => {
    setAttendanceMap((previous) => {
      const next = {
        ...previous,
      };

      students.forEach((student) => {
        next[student.id] = status;
      });

      return next;
    });
  };

  const markedCount = students.filter(
    (student) =>
      attendanceMap[student.id]
  ).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800 lg:flex-row lg:items-center">
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">
            Student Attendance
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Mark attendance for each student
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              markAll("present")
            }
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
          >
            <CheckCheck size={15} />
            All Present
          </button>

          <button
            onClick={() =>
              markAll("absent")
            }
            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
          >
            All Absent
          </button>
        </div>
      </div>

      <div className="border-b border-slate-200 p-4 dark:border-slate-800">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search students..."
              className="form-input pl-10"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <UserCheck
              size={16}
              className="text-indigo-500"
            />

            <span>
              {markedCount} /{" "}
              {students.length} marked
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-slate-50 dark:bg-slate-800/60">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                #
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                Student
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                Roll Number
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                Current Attendance
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                Mark Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredStudents.map(
              (student, index) => {
                const currentStatus =
                  attendanceMap[
                    student.id
                  ];

                const attendance =
                  Number(
                    student.attendancePercentage ||
                      0
                  );

                const shortage =
                  attendance <
                  minimumAttendance;

                return (
                  <tr
                    key={student.id}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/30"
                  >
                    <td className="px-5 py-4 text-sm text-slate-400">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                          {student.name
                            .split(" ")
                            .map(
                              (item) =>
                                item[0]
                            )
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">
                            {student.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-mono text-sm text-slate-600 dark:text-slate-300">
                      {student.rollNumber}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className={`h-full rounded-full ${
                              shortage
                                ? "bg-red-500"
                                : "bg-emerald-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                attendance,
                                100
                              )}%`,
                            }}
                          />
                        </div>

                        <span
                          className={`text-sm font-bold ${
                            shortage
                              ? "text-red-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {attendance}%
                        </span>

                        {shortage && (
                          <AlertTriangle
                            size={15}
                            className="text-red-500"
                          />
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {STATUSES.map(
                          (status) => (
                            <AttendanceStatusButton
                              key={status}
                              status={status}
                              active={
                                currentStatus ===
                                status
                              }
                              onClick={() =>
                                setStatus(
                                  student.id,
                                  status
                                )
                              }
                            />
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      {filteredStudents.length === 0 && (
        <div className="p-12 text-center text-sm text-slate-400">
          No students found.
        </div>
      )}
    </div>
  );
}
