import React from "react";
import {
  Edit3,
  Trash2,
  Eye,
  MoreHorizontal,
  Mail,
  Phone,
} from "lucide-react";

function AttendanceBadge({ percentage }) {
  const value = Number(percentage || 0);

  let classes = "bg-red-100 text-red-700";

  if (value >= 85) {
    classes = "bg-emerald-100 text-emerald-700";
  } else if (value >= 75) {
    classes = "bg-blue-100 text-blue-700";
  } else if (value >= 65) {
    classes = "bg-amber-100 text-amber-700";
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-bold ${classes}`}
    >
      {value}%
    </span>
  );
}

export default function StudentTable({
  students,
  departments,
  courses,
  selectedIds,
  setSelectedIds,
  onView,
  onEdit,
  onDelete,
}) {
  const allSelected =
    students.length > 0 &&
    students.every((student) =>
      selectedIds.includes(student.id)
    );

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        students.map((student) => student.id)
      );
    }
  };

  const toggleStudent = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const getDepartment = (id) =>
    departments.find(
      (department) => department.id === id
    );

  const getCourse = (id) =>
    courses.find((course) => course.id === id);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px]">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60">
            <tr>
              <th className="w-12 px-4 py-4 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                />
              </th>

              <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Student
              </th>

              <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Roll Number
              </th>

              <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Department
              </th>

              <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Course / Year
              </th>

              <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Attendance
              </th>

              <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.map((student) => {
              const department = getDepartment(
                student.departmentId
              );

              const course = getCourse(
                student.courseId
              );

              const selected = selectedIds.includes(
                student.id
              );

              return (
                <tr
                  key={student.id}
                  className={`transition hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                    selected
                      ? "bg-indigo-50/60 dark:bg-indigo-500/5"
                      : ""
                  }`}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() =>
                        toggleStudent(student.id)
                      }
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                    />
                  </td>

                  <td className="px-4 py-4">
                    <button
                      onClick={() => onView(student)}
                      className="flex items-center gap-3 text-left"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                        {student.avatar ||
                          student.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900 hover:text-indigo-600 dark:text-white">
                          {student.name}
                        </p>

                        <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                          <Mail size={12} />
                          {student.email}
                        </div>
                      </div>
                    </button>
                  </td>

                  <td className="px-4 py-4">
                    <span className="font-mono text-sm font-medium text-slate-700 dark:text-slate-300">
                      {student.rollNumber}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {department?.code || "—"}
                      </p>

                      <p className="max-w-[170px] truncate text-xs text-slate-400">
                        {department?.name || "Unknown"}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div>
                      <p className="max-w-[180px] truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                        {course?.code || "—"}
                      </p>

                      <p className="text-xs text-slate-400">
                        Year {student.year} · Sec{" "}
                        {student.section}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <AttendanceBadge
                      percentage={
                        student.attendancePercentage
                      }
                    />
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        student.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        title="View"
                        onClick={() => onView(student)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        title="Edit"
                        onClick={() => onEdit(student)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
                      >
                        <Edit3 size={17} />
                      </button>

                      <button
                        title="Delete"
                        onClick={() => onDelete(student)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {students.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-16 text-center"
                >
                  <div className="mx-auto max-w-sm">
                    <MoreHorizontal
                      size={40}
                      className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-3 font-semibold text-slate-700 dark:text-slate-300">
                      No students found
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Try changing your search or
                      filters.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedIds.length > 0 && (
        <div className="border-t border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700 dark:border-indigo-500/10 dark:bg-indigo-500/5 dark:text-indigo-300">
          {selectedIds.length} student
          {selectedIds.length !== 1 ? "s" : ""} selected
        </div>
      )}
    </div>
  );
}
