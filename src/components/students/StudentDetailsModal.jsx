import React, { useMemo } from "react";
import {
  X,
  Mail,
  Phone,
  GraduationCap,
  CalendarDays,
  Building2,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

import { calculateStudentAttendance } from "../../utils/attendanceCalculator";

export default function StudentDetailsModal({
  student,
  attendance,
  departments,
  courses,
  subjects,
  onClose,
}) {
  const summary = useMemo(() => {
    if (!student) return null;

    return calculateStudentAttendance(
      student.id,
      attendance
    );
  }, [student, attendance]);

  if (!student) return null;

  const department = departments.find(
    (item) =>
      item.id === student.departmentId
  );

  const course = courses.find(
    (item) => item.id === student.courseId
  );

  const studentAttendance = attendance.filter(
    (record) =>
      record.studentId === student.id
  );

  const subjectAttendance = subjects
    .map((subject) => {
      const records = studentAttendance.filter(
        (record) =>
          record.subjectId === subject.id
      );

      if (!records.length) return null;

      const present = records.filter(
        (record) =>
          record.status === "present" ||
          record.status === "late" ||
          record.status === "on-duty"
      ).length;

      return {
        subject,
        percentage: Math.round(
          (present / records.length) * 100
        ),
      };
    })
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-6 py-8 text-white">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-2xl font-bold backdrop-blur">
              {student.avatar ||
                student.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {student.name}
              </h2>

              <p className="mt-1 text-sm text-indigo-100">
                {student.rollNumber}
              </p>

              <span className="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                {student.status}
              </span>
            </div>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <InfoCard
              icon={Building2}
              label="Department"
              value={department?.code || "—"}
            />

            <InfoCard
              icon={BookOpen}
              label="Course"
              value={course?.code || "—"}
            />

            <InfoCard
              icon={GraduationCap}
              label="Year / Section"
              value={`Year ${student.year} / ${student.section}`}
            />

            <InfoCard
              icon={CalendarDays}
              label="Semester"
              value={`Semester ${student.semester}`}
            />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Contact
              </h3>

              <div className="mt-4 space-y-3">
                <ContactRow
                  icon={Mail}
                  text={student.email}
                />

                <ContactRow
                  icon={Phone}
                  text={student.phone || "Not provided"}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Attendance
              </h3>

              <div className="mt-4 flex items-center gap-4">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-500/10">
                  <span className="text-xl font-bold text-indigo-600">
                    {summary?.percentage || 0}%
                  </span>
                </div>

                <div className="space-y-1 text-sm">
                  <p className="text-emerald-600">
                    Present: {summary?.present || 0}
                  </p>

                  <p className="text-red-600">
                    Absent: {summary?.absent || 0}
                  </p>

                  <p className="text-amber-600">
                    Late: {summary?.late || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Academic Status
              </h3>

              <div className="mt-4 space-y-3">
                <StatusRow
                  label="Admission Year"
                  value={student.admissionYear}
                />

                <StatusRow
                  label="Gender"
                  value={student.gender}
                />

                <StatusRow
                  label="Enrollment"
                  value={student.status}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
              Subject-wise Attendance
            </h3>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
              {subjectAttendance.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-400">
                  No subject attendance records available.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {subjectAttendance.map(
                    ({ subject, percentage }) => (
                      <div
                        key={subject.id}
                        className="flex items-center justify-between p-4"
                      >
                        <div>
                          <p className="font-medium text-slate-800 dark:text-slate-200">
                            {subject.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {subject.code}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="hidden h-2 w-28 overflow-hidden rounded-full bg-slate-100 sm:block dark:bg-slate-800">
                            <div
                              className={`h-full rounded-full ${
                                percentage >= 75
                                  ? "bg-emerald-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${Math.min(
                                  percentage,
                                  100
                                )}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-bold">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
      <Icon
        size={18}
        className="text-indigo-500"
      />

      <p className="mt-2 text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}

function ContactRow({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
      <Icon
        size={16}
        className="text-indigo-500"
      />
      <span className="truncate">{text}</span>
    </div>
  );
}

function StatusRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-400">
        {label}
      </span>

      <span className="font-medium text-slate-700 dark:text-slate-300">
        {value}
      </span>
    </div>
  );
}
