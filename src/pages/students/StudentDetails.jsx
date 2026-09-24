import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const STUDENT_DATA = {
  1: {
    id: "STU001",
    name: "Aarav Sharma",
    rollNumber: "CSE2023001",
    email: "aarav.sharma@college.edu",
    phone: "+91 98765 43210",
    department: "Computer Science & Engineering",
    className: "CSE - III A",
    semester: "Semester 6",
    year: "2025-26",
    admissionYear: "2023",
    status: "Active",
    gender: "Male",
    dob: "14 June 2005",
    bloodGroup: "O+",
    guardian: "Rajesh Sharma",
    guardianPhone: "+91 98765 12345",
    address: "Bengaluru, Karnataka",
    attendance: 88,
    avatar: "AS",
  },
  2: {
    id: "STU002",
    name: "Diya Patel",
    rollNumber: "CSE2023002",
    email: "diya.patel@college.edu",
    phone: "+91 98765 43211",
    department: "Computer Science & Engineering",
    className: "CSE - III A",
    semester: "Semester 6",
    year: "2025-26",
    admissionYear: "2023",
    status: "Active",
    gender: "Female",
    dob: "22 September 2005",
    bloodGroup: "B+",
    guardian: "Amit Patel",
    guardianPhone: "+91 98765 12346",
    address: "Mysuru, Karnataka",
    attendance: 94,
    avatar: "DP",
  },
};

const DEFAULT_STUDENT = {
  id: "STU003",
  name: "Student Profile",
  rollNumber: "CSE2023003",
  email: "student@college.edu",
  phone: "+91 90000 00000",
  department: "Computer Science & Engineering",
  className: "CSE - III A",
  semester: "Semester 6",
  year: "2025-26",
  admissionYear: "2023",
  status: "Active",
  gender: "Not specified",
  dob: "Not available",
  bloodGroup: "Not available",
  guardian: "Not available",
  guardianPhone: "Not available",
  address: "Not available",
  attendance: 86,
  avatar: "SP",
};

const SUBJECTS = [
  {
    code: "CS301",
    name: "Data Structures",
    teacher: "Dr. Priya Sharma",
    attended: 22,
    total: 25,
    color: "blue",
  },
  {
    code: "CS302",
    name: "Algorithms",
    teacher: "Prof. Raj Kumar",
    attended: 18,
    total: 22,
    color: "purple",
  },
  {
    code: "CS303",
    name: "Database Systems",
    teacher: "Dr. Anil Verma",
    attended: 16,
    total: 21,
    color: "emerald",
  },
  {
    code: "CS304",
    name: "Operating Systems",
    teacher: "Prof. Sneha Rao",
    attended: 20,
    total: 22,
    color: "amber",
  },
  {
    code: "CS305",
    name: "Computer Networks",
    teacher: "Dr. Vikram Singh",
    attended: 21,
    total: 25,
    color: "pink",
  },
];

const ATTENDANCE_HISTORY = [
  {
    date: "24 Sep 2026",
    subject: "Data Structures",
    code: "CS301",
    period: "09:00 - 10:00",
    status: "Present",
  },
  {
    date: "24 Sep 2026",
    subject: "Algorithms",
    code: "CS302",
    period: "10:00 - 11:00",
    status: "Present",
  },
  {
    date: "23 Sep 2026",
    subject: "Database Systems",
    code: "CS303",
    period: "11:30 - 12:30",
    status: "Absent",
  },
  {
    date: "23 Sep 2026",
    subject: "Operating Systems",
    code: "CS304",
    period: "14:00 - 15:00",
    status: "Present",
  },
  {
    date: "22 Sep 2026",
    subject: "Computer Networks",
    code: "CS305",
    period: "10:00 - 11:00",
    status: "Present",
  },
  {
    date: "22 Sep 2026",
    subject: "Data Structures",
    code: "CS301",
    period: "09:00 - 10:00",
    status: "Present",
  },
];

const RESULTS = [
  {
    code: "CS301",
    subject: "Data Structures",
    internal: 24,
    external: 62,
    total: 86,
    grade: "A",
  },
  {
    code: "CS302",
    subject: "Algorithms",
    internal: 22,
    external: 58,
    total: 80,
    grade: "A",
  },
  {
    code: "CS303",
    subject: "Database Systems",
    internal: 21,
    external: 54,
    total: 75,
    grade: "B+",
  },
  {
    code: "CS304",
    subject: "Operating Systems",
    internal: 25,
    external: 64,
    total: 89,
    grade: "A+",
  },
  {
    code: "CS305",
    subject: "Computer Networks",
    internal: 23,
    external: 60,
    total: 83,
    grade: "A",
  },
];

function StudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] =
    useState("overview");

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showAttendanceModal, setShowAttendanceModal] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const student =
    STUDENT_DATA[id] || DEFAULT_STUDENT;

  const overallAttendance = useMemo(() => {
    const attended = SUBJECTS.reduce(
      (sum, subject) =>
        sum + subject.attended,
      0
    );

    const total = SUBJECTS.reduce(
      (sum, subject) =>
        sum + subject.total,
      0
    );

    return total
      ? Math.round((attended / total) * 100)
      : 0;
  }, []);

  const presentCount =
    ATTENDANCE_HISTORY.filter(
      (item) => item.status === "Present"
    ).length;

  const absentCount =
    ATTENDANCE_HISTORY.filter(
      (item) => item.status === "Absent"
    ).length;

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed right-6 top-6 z-[100] rounded-xl border border-emerald-500/20 bg-slate-900 px-5 py-4 text-sm font-medium text-emerald-400 shadow-2xl">
          ✓ {toast}
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
          >
            ←
          </button>

          <div>
            <p className="text-xs text-slate-600">
              Students / Details
            </p>

            <h1 className="mt-1 text-2xl font-bold text-white">
              Student Details
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              setShowAttendanceModal(true)
            }
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            View Attendance
          </button>

          <button
            type="button"
            onClick={() =>
              setShowEditModal(true)
            }
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"
          >
            Edit Student
          </button>
        </div>
      </div>

      {/* PROFILE HERO */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="h-24 bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-transparent" />

        <div className="-mt-10 flex flex-col gap-5 px-6 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white shadow-xl">
              {student.avatar}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-white">
                  {student.name}
                </h2>

                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-400">
                  {student.status}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                {student.rollNumber} •{" "}
                {student.className} •{" "}
                {student.department}
              </p>

              <p className="mt-1 text-[10px] text-slate-700">
                {student.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <MiniStat
              label="Attendance"
              value={`${overallAttendance}%`}
              color={
                overallAttendance >= 75
                  ? "emerald"
                  : "red"
              }
            />

            <MiniStat
              label="Semester"
              value="6"
              color="blue"
            />

            <MiniStat
              label="Status"
              value="Active"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="flex gap-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-1">
        {[
          ["overview", "Overview"],
          ["attendance", "Attendance"],
          ["academic", "Academic"],
          ["personal", "Personal"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setActiveTab(value)}
            className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-xs font-semibold transition ${
              activeTab === value
                ? "bg-blue-600 text-white"
                : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900">
            <SectionHeader
              title="Student Information"
              description="Basic academic information"
            />

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <InfoItem
                label="Student ID"
                value={student.id}
              />

              <InfoItem
                label="Roll Number"
                value={student.rollNumber}
              />

              <InfoItem
                label="Department"
                value={student.department}
              />

              <InfoItem
                label="Class"
                value={student.className}
              />

              <InfoItem
                label="Semester"
                value={student.semester}
              />

              <InfoItem
                label="Academic Year"
                value={student.year}
              />

              <InfoItem
                label="Admission Year"
                value={student.admissionYear}
              />

              <InfoItem
                label="Email"
                value={student.email}
              />

              <InfoItem
                label="Phone"
                value={student.phone}
              />

              <InfoItem
                label="Address"
                value={student.address}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900">
            <SectionHeader
              title="Attendance Summary"
              description="Current semester attendance"
            />

            <div className="p-5">
              <div className="flex items-center justify-center">
                <AttendanceRing
                  percentage={
                    overallAttendance
                  }
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <SummaryBox
                  label="Present"
                  value={presentCount}
                  color="emerald"
                />

                <SummaryBox
                  label="Absent"
                  value={absentCount}
                  color="red"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    "attendance"
                  )
                }
                className="mt-4 w-full rounded-xl border border-slate-700 py-3 text-xs font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                View Detailed Attendance →
              </button>
            </div>
          </section>

          <section className="xl:col-span-2 rounded-2xl border border-slate-800 bg-slate-900">
            <SectionHeader
              title="Subject Performance"
              description="Attendance by subject"
            />

            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
              {SUBJECTS.map(
                (subject) => (
                  <SubjectRow
                    key={subject.code}
                    subject={subject}
                  />
                )
              )}
            </div>
          </section>
        </div>
      )}

      {/* ATTENDANCE */}
      {activeTab === "attendance" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <SummaryBox
              label="Overall"
              value={`${overallAttendance}%`}
              color="blue"
            />

            <SummaryBox
              label="Present"
              value={presentCount}
              color="emerald"
            />

            <SummaryBox
              label="Absent"
              value={absentCount}
              color="red"
            />

            <SummaryBox
              label="Required"
              value="75%"
              color="amber"
            />
          </div>

          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <SectionHeader
              title="Attendance History"
              description="Recent attendance records"
            />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-800 text-left">
                    <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                      Date
                    </th>

                    <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                      Subject
                    </th>

                    <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                      Period
                    </th>

                    <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {ATTENDANCE_HISTORY.map(
                    (item, index) => (
                      <tr
                        key={`${item.date}-${item.code}-${index}`}
                        className="transition hover:bg-slate-800/20"
                      >
                        <td className="px-5 py-4 text-xs text-slate-400">
                          {item.date}
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-xs font-semibold text-slate-300">
                            {item.subject}
                          </p>

                          <p className="mt-1 text-[9px] text-slate-700">
                            {item.code}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-xs text-slate-500">
                          {item.period}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                              item.status ===
                              "Present"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* ACADEMIC */}
      {activeTab === "academic" && (
        <div className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <SectionHeader
              title="Academic Results"
              description="Current semester examination performance"
            />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">
                <thead>
                  <tr className="border-b border-slate-800 text-left">
                    <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-slate-600">
                      Subject
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-slate-600">
                      Internal
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-slate-600">
                      External
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-slate-600">
                      Total
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-slate-600">
                      Grade
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {RESULTS.map(
                    (result) => (
                      <tr
                        key={result.code}
                        className="hover:bg-slate-800/20"
                      >
                        <td className="px-5 py-4">
                          <p className="text-xs font-semibold text-slate-300">
                            {result.subject}
                          </p>

                          <p className="mt-1 text-[9px] text-slate-700">
                            {result.code}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-xs text-slate-400">
                          {result.internal}
                        </td>

                        <td className="px-5 py-4 text-xs text-slate-400">
                          {result.external}
                        </td>

                        <td className="px-5 py-4 text-xs font-semibold text-white">
                          {result.total}
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400">
                            {result.grade}
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <SummaryBox
              label="Current CGPA"
              value="8.42"
              color="blue"
            />

            <SummaryBox
              label="Credits Earned"
              value="102"
              color="emerald"
            />

            <SummaryBox
              label="Subjects"
              value="5"
              color="purple"
            />
          </div>
        </div>
      )}

      {/* PERSONAL */}
      {activeTab === "personal" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900">
            <SectionHeader
              title="Personal Information"
              description="Student personal details"
            />

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <InfoItem
                label="Full Name"
                value={student.name}
              />

              <InfoItem
                label="Gender"
                value={student.gender}
              />

              <InfoItem
                label="Date of Birth"
                value={student.dob}
              />

              <InfoItem
                label="Blood Group"
                value={
                  student.bloodGroup
                }
              />

              <InfoItem
                label="Phone"
                value={student.phone}
              />

              <InfoItem
                label="Email"
                value={student.email}
              />

              <div className="sm:col-span-2">
                <InfoItem
                  label="Address"
                  value={student.address}
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900">
            <SectionHeader
              title="Parent / Guardian"
              description="Emergency contact information"
            />

            <div className="grid grid-cols-1 gap-4 p-5">
              <InfoItem
                label="Guardian Name"
                value={
                  student.guardian
                }
              />

              <InfoItem
                label="Guardian Phone"
                value={
                  student.guardianPhone
                }
              />

              <InfoItem
                label="Relationship"
                value="Parent / Guardian"
              />
            </div>
          </section>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditStudentModal
          student={student}
          onClose={() =>
            setShowEditModal(false)
          }
          onSave={() => {
            setShowEditModal(false);
            showToast(
              "Student information updated successfully."
            );
          }}
        />
      )}

      {/* ATTENDANCE MODAL */}
      {showAttendanceModal && (
        <AttendanceModal
          student={student}
          onClose={() =>
            setShowAttendanceModal(
              false
            )
          }
        />
      )}
    </div>
  );
}

/* =========================================
   COMPONENTS
========================================= */

function SectionHeader({
  title,
  description,
}) {
  return (
    <div className="border-b border-slate-800 p-5">
      <h2 className="font-semibold text-white">
        {title}
      </h2>

      <p className="mt-1 text-xs text-slate-600">
        {description}
      </p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  color,
}) {
  const colors = {
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    purple: "text-purple-400",
    red: "text-red-400",
  };

  return (
    <div className="min-w-[100px] rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
      <p className="text-[9px] uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p
        className={`mt-1 text-xs font-bold ${colors[color]}`}
      >
        {value}
      </p>
    </div>
  );
}

function InfoItem({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
      <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p className="mt-1.5 break-words text-xs font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}

function SummaryBox({
  label,
  value,
  color,
}) {
  const colors = {
    blue:
      "border-blue-500/20 bg-blue-500/5 text-blue-400",
    emerald:
      "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
    red:
      "border-red-500/20 bg-red-500/5 text-red-400",
    amber:
      "border-amber-500/20 bg-amber-500/5 text-amber-400",
    purple:
      "border-purple-500/20 bg-purple-500/5 text-purple-400",
  };

  return (
    <div
      className={`rounded-xl border p-4 ${colors[color]}`}
    >
      <p className="text-[9px] uppercase tracking-wider opacity-60">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">
        {value}
      </p>
    </div>
  );
}

function AttendanceRing({
  percentage,
}) {
  const radius = 58;
  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (percentage / 100) *
      circumference;

  return (
    <div className="relative h-40 w-40">
      <svg
        className="-rotate-90"
        width="160"
        height="160"
        viewBox="0 0 160 160"
      >
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="11"
        />

        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={
            percentage >= 75
              ? "#10b981"
              : "#ef4444"
          }
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={
            circumference
          }
          strokeDashoffset={
            offset
          }
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">
          {percentage}%
        </span>

        <span className="text-[9px] text-slate-600">
          Attendance
        </span>
      </div>
    </div>
  );
}

function SubjectRow({
  subject,
}) {
  const percentage = Math.round(
    (subject.attended /
      subject.total) *
      100
  );

  const color =
    percentage >= 85
      ? "emerald"
      : percentage >= 75
        ? "blue"
        : "red";

  const colors = {
    emerald: {
      bar: "bg-emerald-500",
      text: "text-emerald-400",
    },
    blue: {
      bar: "bg-blue-500",
      text: "text-blue-400",
    },
    red: {
      bar: "bg-red-500",
      text: "text-red-400",
    },
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[9px] text-slate-700">
            {subject.code}
          </p>

          <h3 className="mt-1 text-xs font-semibold text-slate-300">
            {subject.name}
          </h3>

          <p className="mt-1 text-[9px] text-slate-700">
            {subject.teacher}
          </p>
        </div>

        <span
          className={`text-sm font-bold ${colors[color].text}`}
        >
          {percentage}%
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${colors[color].bar}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-2 text-[9px] text-slate-700">
        {subject.attended} of{" "}
        {subject.total} classes attended
      </p>
    </div>
  );
}

/* =========================================
   EDIT MODAL
========================================= */

function EditStudentModal({
  student,
  onClose,
  onSave,
}) {
  const [form, setForm] =
    useState({
      name: student.name,
      email: student.email,
      phone: student.phone,
      department:
        student.department,
      className:
        student.className,
      status: student.status,
    });

  const updateField = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

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
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div>
            <p className="text-xs text-blue-400">
              Student Management
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              Edit Student
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          <FormField
            label="Full Name"
            value={form.name}
            onChange={(value) =>
              updateField(
                "name",
                value
              )
            }
          />

          <FormField
            label="Email"
            value={form.email}
            onChange={(value) =>
              updateField(
                "email",
                value
              )
            }
          />

          <FormField
            label="Phone"
            value={form.phone}
            onChange={(value) =>
              updateField(
                "phone",
                value
              )
            }
          />

          <FormField
            label="Department"
            value={form.department}
            onChange={(value) =>
              updateField(
                "department",
                value
              )
            }
          />

          <FormField
            label="Class"
            value={form.className}
            onChange={(value) =>
              updateField(
                "className",
                value
              )
            }
          />

          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              Status
            </label>

            <select
              value={form.status}
              onChange={(event) =>
                updateField(
                  "status",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-slate-300 outline-none focus:border-blue-500"
            >
              <option>
                Active
              </option>

              <option>
                Inactive
              </option>

              <option>
                Graduated
              </option>

              <option>
                Suspended
              </option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-800 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2.5 text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </label>

      <input
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-slate-300 outline-none transition focus:border-blue-500"
      />
    </div>
  );
}

/* =========================================
   ATTENDANCE MODAL
========================================= */

function AttendanceModal({
  student,
  onClose,
}) {
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
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div>
            <p className="text-xs text-emerald-400">
              Attendance
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              {student.name}
            </h2>

            <p className="mt-1 text-[10px] text-slate-600">
              {student.rollNumber}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">
          <div className="space-y-3">
            {SUBJECTS.map(
              (subject) => {
                const percentage =
                  Math.round(
                    (subject.attended /
                      subject.total) *
                      100
                  );

                return (
                  <div
                    key={subject.code}
                    className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-300">
                        {subject.name}
                      </p>

                      <p className="mt-1 text-[9px] text-slate-700">
                        {subject.code} •{" "}
                        {subject.teacher}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-28">
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className={`h-full rounded-full ${
                              percentage >=
                              75
                                ? "bg-emerald-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>

                      <span
                        className={`w-12 text-right text-xs font-bold ${
                          percentage >=
                          75
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

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

export default StudentDetails;
