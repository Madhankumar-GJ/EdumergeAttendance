import React, { useMemo, useState } from "react";

const INITIAL_SUBJECTS = [
  {
    id: 1,
    code: "CS301",
    name: "Data Structures",
    teacher: "Dr. Priya Sharma",
    attendance: 88,
    attended: 22,
    total: 25,
    color: "blue",
  },
  {
    id: 2,
    code: "CS302",
    name: "Algorithms",
    teacher: "Prof. Raj Kumar",
    attendance: 82,
    attended: 18,
    total: 22,
    color: "purple",
  },
  {
    id: 3,
    code: "CS303",
    name: "Database Systems",
    teacher: "Dr. Anil Verma",
    attendance: 76,
    attended: 16,
    total: 21,
    color: "emerald",
  },
  {
    id: 4,
    code: "CS304",
    name: "Operating Systems",
    teacher: "Prof. Sneha Rao",
    attendance: 91,
    attended: 20,
    total: 22,
    color: "amber",
  },
  {
    id: 5,
    code: "CS305",
    name: "Computer Networks",
    teacher: "Dr. Vikram Singh",
    attendance: 84,
    attended: 21,
    total: 25,
    color: "pink",
  },
];

const INITIAL_SCHEDULE = [
  {
    id: 1,
    time: "09:00 - 10:00",
    subject: "Data Structures",
    code: "CS301",
    teacher: "Dr. Priya Sharma",
    room: "Room 301",
    type: "Lecture",
  },
  {
    id: 2,
    time: "10:00 - 11:00",
    subject: "Algorithms",
    code: "CS302",
    teacher: "Prof. Raj Kumar",
    room: "Room 204",
    type: "Lecture",
  },
  {
    id: 3,
    time: "11:30 - 12:30",
    subject: "Database Systems",
    code: "CS303",
    teacher: "Dr. Anil Verma",
    room: "Lab 2",
    type: "Practical",
  },
  {
    id: 4,
    time: "14:00 - 15:00",
    subject: "Operating Systems",
    code: "CS304",
    teacher: "Prof. Sneha Rao",
    room: "Room 301",
    type: "Lecture",
  },
];

const INITIAL_ACTIVITY = [
  {
    id: 1,
    title: "Attendance recorded",
    description: "Data Structures • Present",
    time: "Today, 10:02 AM",
    icon: "✓",
    color: "emerald",
  },
  {
    id: 2,
    title: "Assignment submitted",
    description: "Algorithms — Assignment 3",
    time: "Yesterday",
    icon: "↑",
    color: "blue",
  },
  {
    id: 3,
    title: "Timetable updated",
    description: "Friday schedule has been updated",
    time: "2 days ago",
    icon: "↻",
    color: "purple",
  },
];

function StudentDashboard() {
  const [subjects] =
    useState(INITIAL_SUBJECTS);

  const [schedule] =
    useState(INITIAL_SCHEDULE);

  const [activity, setActivity] =
    useState(INITIAL_ACTIVITY);

  const [showAttendanceModal, setShowAttendanceModal] =
    useState(false);

  const [showLeaveModal, setShowLeaveModal] =
    useState(false);

  const [showScheduleModal, setShowScheduleModal] =
    useState(false);

  const [selectedClass, setSelectedClass] =
    useState(null);

  const [leaveReason, setLeaveReason] =
    useState("");

  const [toast, setToast] =
    useState("");

  const overallAttendance = useMemo(() => {
    const attended = subjects.reduce(
      (sum, subject) =>
        sum + subject.attended,
      0
    );

    const total = subjects.reduce(
      (sum, subject) =>
        sum + subject.total,
      0
    );

    return total
      ? Math.round(
          (attended / total) * 100
        )
      : 0;
  }, [subjects]);

  const attendanceStatus = useMemo(() => {
    if (overallAttendance >= 85) {
      return {
        label: "Excellent",
        color: "emerald",
      };
    }

    if (overallAttendance >= 75) {
      return {
        label: "Good",
        color: "blue",
      };
    }

    return {
      label: "Shortage",
      color: "red",
    };
  }, [overallAttendance]);

  const classesAttended = subjects.reduce(
    (sum, subject) =>
      sum + subject.attended,
    0
  );

  const totalClasses = subjects.reduce(
    (sum, subject) =>
      sum + subject.total,
    0
  );

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const openAttendance = (classItem) => {
    setSelectedClass(classItem);
    setShowAttendanceModal(true);
  };

  const markPresent = () => {
    if (!selectedClass) {
      return;
    }

    setActivity((previous) => [
      {
        id: Date.now(),
        title: "Attendance recorded",
        description: `${selectedClass.subject} • Present`,
        time: "Just now",
        icon: "✓",
        color: "emerald",
      },
      ...previous,
    ]);

    setShowAttendanceModal(false);

    showToast(
      `Attendance marked present for ${selectedClass.subject}.`
    );
  };

  const submitLeave = () => {
    if (!leaveReason.trim()) {
      showToast(
        "Please enter a reason for leave."
      );
      return;
    }

    setActivity((previous) => [
      {
        id: Date.now(),
        title: "Leave request submitted",
        description: leaveReason,
        time: "Just now",
        icon: "◷",
        color: "amber",
      },
      ...previous,
    ]);

    setLeaveReason("");
    setShowLeaveModal(false);

    showToast(
      "Leave request submitted successfully."
    );
  };

  const calculateRequiredAttendance = (
    subject
  ) => {
    if (subject.attendance >= 75) {
      return 0;
    }

    let attended =
      subject.attended;

    let total =
      subject.total;

    let required = 0;

    while (
      (attended / total) * 100 <
      75
    ) {
      attended += 1;
      total += 1;
      required += 1;

      if (required > 100) {
        break;
      }
    }

    return required;
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
            Student Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Welcome back, Student 👋
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Here's your academic overview
            for today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
            <p className="text-[9px] uppercase tracking-wider text-slate-600">
              Class
            </p>

            <p className="mt-1 text-xs font-semibold text-slate-300">
              CSE - III A
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
            <p className="text-[9px] uppercase tracking-wider text-slate-600">
              Semester
            </p>

            <p className="mt-1 text-xs font-semibold text-slate-300">
              Semester 6
            </p>
          </div>
        </div>
      </div>

      {/* MAIN ATTENDANCE CARD */}
      <section className="overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-slate-900 to-slate-900">
        <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-[1fr_auto] lg:p-8">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Overall Attendance
            </p>

            <div className="mt-3 flex items-end gap-3">
              <span className="text-5xl font-bold text-white">
                {overallAttendance}%
              </span>

              <span
                className={`mb-2 rounded-full px-3 py-1 text-[10px] font-semibold ${
                  attendanceStatus.color ===
                  "emerald"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : attendanceStatus.color ===
                        "blue"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-red-500/10 text-red-400"
                }`}
              >
                {attendanceStatus.label}
              </span>
            </div>

            <p className="mt-3 max-w-xl text-xs leading-5 text-slate-500">
              You have attended{" "}
              <span className="font-semibold text-slate-300">
                {classesAttended}
              </span>{" "}
              out of{" "}
              <span className="font-semibold text-slate-300">
                {totalClasses}
              </span>{" "}
              classes this semester.
            </p>

            <div className="mt-6 max-w-xl">
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${
                    overallAttendance >=
                    75
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${overallAttendance}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[9px] text-slate-600">
                <span>0%</span>
                <span>Minimum required: 75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <CircularProgress
            percentage={
              overallAttendance
            }
          />
        </div>
      </section>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Classes Attended"
          value={classesAttended}
          icon="✓"
          color="emerald"
        />

        <StatCard
          label="Total Classes"
          value={totalClasses}
          icon="▦"
          color="blue"
        />

        <StatCard
          label="Subjects"
          value={subjects.length}
          icon="▤"
          color="purple"
        />

        <StatCard
          label="Attendance Target"
          value="75%"
          icon="◎"
          color="amber"
        />
      </div>

      {/* TWO COLUMN */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* TODAY'S SCHEDULE */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-800 p-5">
            <div>
              <h2 className="font-semibold text-white">
                Today's Schedule
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                Your classes for today
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowScheduleModal(
                  true
                )
              }
              className="text-xs font-semibold text-blue-400 hover:text-blue-300"
            >
              View all →
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {schedule.map(
              (item) => (
                <ScheduleItem
                  key={item.id}
                  item={item}
                  onClick={() =>
                    openAttendance(
                      item
                    )
                  }
                />
              )
            )}
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section>
          <div className="mb-4">
            <h2 className="font-semibold text-white">
              Quick Actions
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Common student operations
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <QuickAction
              icon="◔"
              title="My Attendance"
              description="View detailed attendance"
              color="blue"
              onClick={() =>
                showToast(
                  "Attendance details opened."
                )
              }
            />

            <QuickAction
              icon="◷"
              title="Apply Leave"
              description="Submit a leave request"
              color="amber"
              onClick={() =>
                setShowLeaveModal(
                  true
                )
              }
            />

            <QuickAction
              icon="▦"
              title="Timetable"
              description="View weekly timetable"
              color="purple"
              onClick={() =>
                setShowScheduleModal(
                  true
                )
              }
            />

            <QuickAction
              icon="▤"
              title="Results"
              description="View academic results"
              color="emerald"
              onClick={() =>
                showToast(
                  "Results module opened."
                )
              }
            />
          </div>
        </section>
      </div>

      {/* SUBJECT ATTENDANCE */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex flex-col gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-white">
              Subject-wise Attendance
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Detailed attendance for each
              subject
            </p>
          </div>

          <span className="rounded-lg bg-slate-800 px-3 py-2 text-[10px] text-slate-500">
            Minimum required: 75%
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
          {subjects.map(
            (subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                requiredClasses={calculateRequiredAttendance(
                  subject
                )}
              />
            )
          )}
        </div>
      </section>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ACTIVITY */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-800 p-5">
            <div>
              <h2 className="font-semibold text-white">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                Your latest updates
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                showToast(
                  "Showing complete activity history."
                )
              }
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              View all
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {activity
              .slice(0, 5)
              .map((item) => (
                <ActivityItem
                  key={item.id}
                  item={item}
                />
              ))}
          </div>
        </section>

        {/* ALERT */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 p-5">
            <h2 className="font-semibold text-white">
              Attendance Alerts
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Subjects requiring attention
            </p>
          </div>

          <div className="space-y-3 p-5">
            {subjects
              .filter(
                (subject) =>
                  subject.attendance <
                  80
              )
              .map((subject) => (
                <AttendanceAlert
                  key={subject.id}
                  subject={subject}
                />
              ))}

            {subjects.every(
              (subject) =>
                subject.attendance >=
                80
            ) && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <p className="text-xs font-semibold text-emerald-400">
                  ✓ No attendance alerts
                </p>

                <p className="mt-1 text-[10px] text-slate-600">
                  Your attendance is
                  currently healthy across
                  all subjects.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ATTENDANCE MODAL */}
      {showAttendanceModal &&
        selectedClass && (
          <AttendanceModal
            classItem={
              selectedClass
            }
            onPresent={markPresent}
            onClose={() =>
              setShowAttendanceModal(
                false
              )
            }
          />
        )}

      {/* LEAVE MODAL */}
      {showLeaveModal && (
        <LeaveModal
          reason={leaveReason}
          setReason={setLeaveReason}
          onSubmit={submitLeave}
          onClose={() =>
            setShowLeaveModal(
              false
            )
          }
        />
      )}

      {/* SCHEDULE MODAL */}
      {showScheduleModal && (
        <ScheduleModal
          schedule={schedule}
          onSelect={openAttendance}
          onClose={() =>
            setShowScheduleModal(
              false
            )
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
    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
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
   CIRCULAR PROGRESS
========================================= */

function CircularProgress({
  percentage,
}) {
  const radius = 60;
  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (percentage / 100) *
      circumference;

  return (
    <div className="relative mx-auto h-44 w-44">
      <svg
        className="-rotate-90"
        width="176"
        height="176"
        viewBox="0 0 176 176"
      >
        <circle
          cx="88"
          cy="88"
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="12"
        />

        <circle
          cx="88"
          cy="88"
          r={radius}
          fill="none"
          stroke={
            percentage >= 75
              ? "#10b981"
              : "#ef4444"
          }
          strokeWidth="12"
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
        <span className="text-4xl font-bold text-white">
          {percentage}%
        </span>

        <span className="mt-1 text-[10px] text-slate-600">
          Overall
        </span>
      </div>
    </div>
  );
}

/* =========================================
   SCHEDULE ITEM
========================================= */

function ScheduleItem({
  item,
  onClick,
}) {
  const isPractical =
    item.type === "Practical";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col gap-4 p-5 text-left transition hover:bg-slate-800/30 sm:flex-row sm:items-center"
    >
      <div className="w-28 shrink-0">
        <p className="text-xs font-semibold text-white">
          {item.time}
        </p>

        <span
          className={`mt-1.5 inline-block rounded-md px-2 py-1 text-[9px] font-semibold ${
            isPractical
              ? "bg-purple-500/10 text-purple-400"
              : "bg-blue-500/10 text-blue-400"
          }`}
        >
          {item.type}
        </span>
      </div>

      <div className="hidden h-10 w-px bg-slate-800 sm:block" />

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-white">
          {item.subject}
        </h3>

        <p className="mt-1 text-[10px] text-slate-600">
          {item.code} • {item.teacher}
        </p>

        <p className="mt-1 text-[10px] text-slate-700">
          ⌂ {item.room}
        </p>
      </div>

      <span className="rounded-lg border border-slate-700 px-3 py-2 text-[10px] text-slate-500">
        Details →
      </span>
    </button>
  );
}

/* =========================================
   QUICK ACTION
========================================= */

function QuickAction({
  icon,
  title,
  description,
  color,
  onClick,
}) {
  const borders = {
    blue:
      "border-blue-500/20 hover:border-blue-500/40",
    purple:
      "border-purple-500/20 hover:border-purple-500/40",
    amber:
      "border-amber-500/20 hover:border-amber-500/40",
    emerald:
      "border-emerald-500/20 hover:border-emerald-500/40",
  };

  const iconColors = {
    blue:
      "bg-blue-500/10 text-blue-400",
    purple:
      "bg-purple-500/10 text-purple-400",
    amber:
      "bg-amber-500/10 text-amber-400",
    emerald:
      "bg-emerald-500/10 text-emerald-400",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border bg-slate-900 p-5 text-left transition hover:bg-slate-800/30 ${borders[color]}`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm ${iconColors[color]}`}
      >
        {icon}
      </div>

      <h3 className="mt-4 text-xs font-semibold text-white">
        {title}
      </h3>

      <p className="mt-1 text-[10px] leading-5 text-slate-600">
        {description}
      </p>
    </button>
  );
}

/* =========================================
   SUBJECT CARD
========================================= */

function SubjectCard({
  subject,
  requiredClasses,
}) {
  const percentage =
    subject.attendance;

  const color =
    percentage >= 85
      ? "emerald"
      : percentage >= 75
        ? "blue"
        : percentage >= 65
          ? "amber"
          : "red";

  const colorMap = {
    emerald: {
      bar: "bg-emerald-500",
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    blue: {
      bar: "bg-blue-500",
      text: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    amber: {
      bar: "bg-amber-500",
      text: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    red: {
      bar: "bg-red-500",
      text: "text-red-400",
      bg: "bg-red-500/10",
    },
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-slate-700">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold text-slate-600">
            {subject.code}
          </p>

          <h3 className="mt-1 truncate text-sm font-semibold text-white">
            {subject.name}
          </h3>

          <p className="mt-1 truncate text-[10px] text-slate-700">
            {subject.teacher}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-bold ${colorMap[color].bg} ${colorMap[color].text}`}
        >
          {percentage}%
        </span>
      </div>

      <div className="mt-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full ${colorMap[color].bar}`}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[10px]">
        <span className="text-slate-600">
          {subject.attended} /{" "}
          {subject.total} classes
        </span>

        {requiredClasses > 0 ? (
          <span className="text-amber-400">
            Attend next{" "}
            {requiredClasses}
          </span>
        ) : (
          <span className="text-emerald-400">
            On track
          </span>
        )}
      </div>
    </div>
  );
}

/* =========================================
   ACTIVITY ITEM
========================================= */

function ActivityItem({
  item,
}) {
  const colors = {
    emerald:
      "bg-emerald-500/10 text-emerald-400",
    blue:
      "bg-blue-500/10 text-blue-400",
    purple:
      "bg-purple-500/10 text-purple-400",
    amber:
      "bg-amber-500/10 text-amber-400",
  };

  return (
    <div className="flex gap-4 p-5">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colors[item.color]}`}
      >
        {item.icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-300">
          {item.title}
        </p>

        <p className="mt-1 text-[10px] text-slate-600">
          {item.description}
        </p>
      </div>

      <span className="shrink-0 text-[9px] text-slate-700">
        {item.time}
      </span>
    </div>
  );
}

/* =========================================
   ATTENDANCE ALERT
========================================= */

function AttendanceAlert({
  subject,
}) {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-400">
          !
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-300">
            {subject.name}
          </p>

          <p className="mt-1 text-[10px] text-slate-600">
            Current attendance:{" "}
            <span className="font-semibold text-amber-400">
              {subject.attendance}%
            </span>
          </p>
        </div>

        <span className="text-[9px] text-slate-600">
          Monitor
        </span>
      </div>
    </div>
  );
}

/* =========================================
   ATTENDANCE MODAL
========================================= */

function AttendanceModal({
  classItem,
  onPresent,
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
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="border-b border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-400">
                Today's Class
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                {classItem.subject}
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                {classItem.code} •{" "}
                {classItem.time}
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
        </div>

        <div className="p-6">
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <p className="text-sm font-semibold text-blue-300">
              Attendance confirmation
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Confirm that you attended this
              class. Your attendance record
              will be updated after
              confirmation.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
            <InfoBox
              label="Teacher"
              value={
                classItem.teacher
              }
            />

            <InfoBox
              label="Room"
              value={
                classItem.room
              }
            />
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
            onClick={onPresent}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500"
          >
            ✓ Confirm Present
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   LEAVE MODAL
========================================= */

function LeaveModal({
  reason,
  setReason,
  onSubmit,
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
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div>
            <p className="text-xs text-amber-400">
              Leave Management
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              Apply for Leave
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

        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Leave Type
            </label>

            <select className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-slate-300 outline-none focus:border-blue-500">
              <option>
                Personal Leave
              </option>
              <option>
                Medical Leave
              </option>
              <option>
                Academic Leave
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Reason
            </label>

            <textarea
              value={reason}
              onChange={(event) =>
                setReason(
                  event.target.value
                )
              }
              rows={5}
              placeholder="Enter the reason for your leave..."
              className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-white outline-none placeholder:text-slate-700 focus:border-blue-500"
            />
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
            onClick={onSubmit}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   SCHEDULE MODAL
========================================= */

function ScheduleModal({
  schedule,
  onSelect,
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
            <p className="text-xs text-purple-400">
              Academic Schedule
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              Today's Timetable
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

        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-800">
          {schedule.map(
            (item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  onClose();
                  onSelect(item);
                }}
                className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-slate-800/30"
              >
                <div className="w-28 shrink-0">
                  <p className="text-xs font-semibold text-white">
                    {item.time}
                  </p>
                </div>

                <div className="h-10 w-px bg-slate-800" />

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white">
                    {item.subject}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-600">
                    {item.code} •{" "}
                    {item.teacher}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-700">
                    {item.room}
                  </p>
                </div>

                <span className="text-[10px] text-blue-400">
                  Open →
                </span>
              </button>
            )
          )}
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

/* =========================================
   INFO BOX
========================================= */

function InfoBox({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <p className="text-[9px] uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}

export default StudentDashboard;
