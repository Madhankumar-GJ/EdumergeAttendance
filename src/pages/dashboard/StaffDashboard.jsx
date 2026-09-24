import React, { useMemo, useState } from "react";

const INITIAL_SCHEDULE = [
  {
    id: 1,
    time: "09:00 - 10:00",
    subject: "Data Structures",
    className: "CSE - III A",
    room: "Room 301",
    type: "Lecture",
  },
  {
    id: 2,
    time: "10:00 - 11:00",
    subject: "Algorithms",
    className: "CSE - III B",
    room: "Room 204",
    type: "Lecture",
  },
  {
    id: 3,
    time: "11:30 - 12:30",
    subject: "Database Systems",
    className: "CSE - II A",
    room: "Lab 2",
    type: "Practical",
  },
  {
    id: 4,
    time: "14:00 - 15:00",
    subject: "Operating Systems",
    className: "CSE - III A",
    room: "Room 301",
    type: "Lecture",
  },
];

const INITIAL_ACTIVITY = [
  {
    id: 1,
    title: "Attendance marked",
    description: "CSE - III A • Data Structures",
    time: "10 minutes ago",
    icon: "✓",
    color: "emerald",
  },
  {
    id: 2,
    title: "Timetable updated",
    description: "Algorithms • CSE - III B",
    time: "1 hour ago",
    icon: "↻",
    color: "blue",
  },
  {
    id: 3,
    title: "Leave request submitted",
    description: "Personal leave request",
    time: "Yesterday",
    icon: "◷",
    color: "amber",
  },
];

function StaffDashboard() {
  const [schedule, setSchedule] =
    useState(INITIAL_SCHEDULE);

  const [activity, setActivity] =
    useState(INITIAL_ACTIVITY);

  const [selectedDate, setSelectedDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [showAttendanceModal, setShowAttendanceModal] =
    useState(false);

  const [selectedClass, setSelectedClass] =
    useState(null);

  const [attendance, setAttendance] =
    useState({});

  const [toast, setToast] =
    useState("");

  const todayStats = useMemo(() => {
    const students = 124;
    const present = 113;
    const absent = 7;
    const late = 4;

    return {
      students,
      present,
      absent,
      late,
      percentage: Math.round(
        (present / students) * 100
      ),
    };
  }, []);

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const openAttendance = (classItem) => {
    setSelectedClass(classItem);

    const initial = {};

    for (let i = 1; i <= 12; i += 1) {
      initial[i] = "Present";
    }

    setAttendance(initial);
    setShowAttendanceModal(true);
  };

  const toggleAttendance = (studentId) => {
    setAttendance((previous) => ({
      ...previous,
      [studentId]:
        previous[studentId] ===
        "Present"
          ? "Absent"
          : "Present",
    }));
  };

  const saveAttendance = () => {
    const presentCount =
      Object.values(attendance).filter(
        (value) => value === "Present"
      ).length;

    setActivity((previous) => [
      {
        id: Date.now(),
        title: "Attendance marked",
        description: `${selectedClass?.className} • ${selectedClass?.subject}`,
        time: "Just now",
        icon: "✓",
        color: "emerald",
      },
      ...previous,
    ]);

    setShowAttendanceModal(false);

    showToast(
      `Attendance saved — ${presentCount} students present.`
    );
  };

  const refreshDashboard = () => {
    setSchedule([
      ...INITIAL_SCHEDULE,
    ]);

    showToast(
      "Dashboard data refreshed."
    );
  };

  const quickAction = (action) => {
    showToast(`${action} opened.`);
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
            Staff Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Good morning, Staff 👋
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Here's what's happening with
            your classes today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(event) =>
              setSelectedDate(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-slate-300 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={refreshDashboard}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ↻
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Today's Attendance"
          value={`${todayStats.percentage}%`}
          change="+3.2%"
          icon="◔"
          color="blue"
        />

        <StatCard
          label="Students Present"
          value={todayStats.present}
          change={`${todayStats.students} total`}
          icon="✓"
          color="emerald"
        />

        <StatCard
          label="Students Absent"
          value={todayStats.absent}
          change={`${todayStats.late} late`}
          icon="!"
          color="red"
        />

        <StatCard
          label="Classes Today"
          value={schedule.length}
          change="2 practicals"
          icon="▦"
          color="purple"
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* TODAY'S SCHEDULE */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-800 p-5">
            <div>
              <h2 className="font-semibold text-white">
                Today's Schedule
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                {formatDate(selectedDate)}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                quickAction(
                  "Full timetable"
                )
              }
              className="text-xs font-medium text-blue-400 hover:text-blue-300"
            >
              View timetable →
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {schedule.map((item) => (
              <ScheduleItem
                key={item.id}
                item={item}
                onAttendance={() =>
                  openAttendance(item)
                }
              />
            ))}
          </div>
        </section>

        {/* ATTENDANCE OVERVIEW */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">
                Attendance Overview
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                Today's classes
              </p>
            </div>

            <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-400">
              {todayStats.percentage}%
            </span>
          </div>

          <div className="mt-7 flex items-center justify-center">
            <CircularProgress
              percentage={
                todayStats.percentage
              }
            />
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3">
            <MiniStat
              label="Present"
              value={
                todayStats.present
              }
              color="emerald"
            />

            <MiniStat
              label="Absent"
              value={
                todayStats.absent
              }
              color="red"
            />

            <MiniStat
              label="Late"
              value={
                todayStats.late
              }
              color="amber"
            />
          </div>
        </section>
      </div>

      {/* QUICK ACTIONS */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-slate-600">
            Common staff operations
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <QuickAction
            icon="✓"
            title="Mark Attendance"
            description="Record class attendance"
            color="blue"
            onClick={() =>
              openAttendance(
                schedule[0]
              )
            }
          />

          <QuickAction
            icon="▦"
            title="My Timetable"
            description="View your schedule"
            color="purple"
            onClick={() =>
              quickAction(
                "My timetable"
              )
            }
          />

          <QuickAction
            icon="◷"
            title="Apply Leave"
            description="Submit a leave request"
            color="amber"
            onClick={() =>
              quickAction(
                "Leave management"
              )
            }
          />

          <QuickAction
            icon="▤"
            title="Reports"
            description="View attendance reports"
            color="emerald"
            onClick={() =>
              quickAction(
                "Reports"
              )
            }
          />
        </div>
      </section>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* RECENT ACTIVITY */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-800 p-5">
            <div>
              <h2 className="font-semibold text-white">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                Your latest actions
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                quickAction(
                  "Activity log"
                )
              }
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              View all
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {activity.map(
              (item) => (
                <ActivityItem
                  key={item.id}
                  item={item}
                />
              )
            )}
          </div>
        </section>

        {/* ATTENTION NEEDED */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 p-5">
            <h2 className="font-semibold text-white">
              Attention Needed
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Items that may require your
              attention
            </p>
          </div>

          <div className="space-y-3 p-5">
            <AttentionItem
              type="warning"
              title="Attendance shortage"
              description="7 students are below the 75% attendance threshold."
              action="Review"
              onClick={() =>
                quickAction(
                  "Shortage report"
                )
              }
            />

            <AttentionItem
              type="info"
              title="Pending leave request"
              description="You have 1 leave request waiting for action."
              action="Open"
              onClick={() =>
                quickAction(
                  "Leave requests"
                )
              }
            />

            <AttentionItem
              type="danger"
              title="Classroom conflict"
              description="A timetable conflict has been detected for tomorrow."
              action="Resolve"
              onClick={() =>
                quickAction(
                  "Timetable conflicts"
                )
              }
            />
          </div>
        </section>
      </div>

      {/* ATTENDANCE MODAL */}
      {showAttendanceModal &&
        selectedClass && (
          <AttendanceModal
            classItem={selectedClass}
            attendance={attendance}
            onToggle={
              toggleAttendance
            }
            onSave={saveAttendance}
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
   STAT CARD
========================================= */

function StatCard({
  label,
  value,
  change,
  icon,
  color,
}) {
  const styles = {
    blue: {
      box: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    },
    emerald: {
      box: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    },
    red: {
      box: "border-red-500/20 bg-red-500/10 text-red-400",
    },
    purple: {
      box: "border-purple-500/20 bg-purple-500/10 text-purple-400",
    },
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${styles[color].box}`}
        >
          {icon}
        </div>

        <span className="text-2xl font-bold text-white">
          {value}
        </span>
      </div>

      <p className="mt-5 text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-[10px] text-slate-600">
        {change}
      </p>
    </div>
  );
}

/* =========================================
   SCHEDULE ITEM
========================================= */

function ScheduleItem({
  item,
  onAttendance,
}) {
  const practical =
    item.type === "Practical";

  return (
    <div className="flex flex-col gap-4 p-5 transition hover:bg-slate-800/20 sm:flex-row sm:items-center">
      <div className="w-28 shrink-0">
        <p className="text-xs font-semibold text-white">
          {item.time}
        </p>

        <span
          className={`mt-1.5 inline-block rounded-md px-2 py-1 text-[9px] font-semibold ${
            practical
              ? "bg-purple-500/10 text-purple-400"
              : "bg-blue-500/10 text-blue-400"
          }`}
        >
          {item.type}
        </span>
      </div>

      <div className="h-10 w-px bg-slate-800" />

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-white">
          {item.subject}
        </h3>

        <div className="mt-1 flex flex-wrap gap-3 text-[10px] text-slate-600">
          <span>▣ {item.className}</span>
          <span>⌂ {item.room}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onAttendance}
        className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"
      >
        Mark Attendance
      </button>
    </div>
  );
}

/* =========================================
   CIRCULAR PROGRESS
========================================= */

function CircularProgress({
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
          strokeWidth="12"
        />

        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#10b981"
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
        <span className="text-3xl font-bold text-white">
          {percentage}%
        </span>

        <span className="text-[10px] text-slate-600">
          Attendance
        </span>
      </div>
    </div>
  );
}

/* =========================================
   MINI STAT
========================================= */

function MiniStat({
  label,
  value,
  color,
}) {
  const textColors = {
    emerald: "text-emerald-400",
    red: "text-red-400",
    amber: "text-amber-400",
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800/20 p-3 text-center">
      <p
        className={`text-lg font-bold ${textColors[color]}`}
      >
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-600">
        {label}
      </p>
    </div>
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
  const styles = {
    blue:
      "border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/5",
    purple:
      "border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5",
    amber:
      "border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/5",
    emerald:
      "border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/5",
  };

  const iconColors = {
    blue: "text-blue-400 bg-blue-500/10",
    purple:
      "text-purple-400 bg-purple-500/10",
    amber:
      "text-amber-400 bg-amber-500/10",
    emerald:
      "text-emerald-400 bg-emerald-500/10",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border bg-slate-900 p-5 text-left transition ${styles[color]}`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${iconColors[color]}`}
      >
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-white">
        {title}
      </h3>

      <p className="mt-1 text-[10px] leading-5 text-slate-600">
        {description}
      </p>
    </button>
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
   ATTENTION ITEM
========================================= */

function AttentionItem({
  type,
  title,
  description,
  action,
  onClick,
}) {
  const styles = {
    warning: {
      border:
        "border-amber-500/20",
      icon:
        "bg-amber-500/10 text-amber-400",
    },
    info: {
      border:
        "border-blue-500/20",
      icon:
        "bg-blue-500/10 text-blue-400",
    },
    danger: {
      border:
        "border-red-500/20",
      icon:
        "bg-red-500/10 text-red-400",
    },
  };

  const icons = {
    warning: "!",
    info: "i",
    danger: "!",
  };

  return (
    <div
      className={`rounded-xl border p-4 ${styles[type].border}`}
    >
      <div className="flex gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${styles[type].icon}`}
        >
          {icons[type]}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-xs font-semibold text-slate-300">
            {title}
          </h3>

          <p className="mt-1 text-[10px] leading-5 text-slate-600">
            {description}
          </p>

          <button
            type="button"
            onClick={onClick}
            className="mt-2 text-[10px] font-semibold text-blue-400 hover:text-blue-300"
          >
            {action} →
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   ATTENDANCE MODAL
========================================= */

function AttendanceModal({
  classItem,
  attendance,
  onToggle,
  onSave,
  onClose,
}) {
  const students = Array.from(
    { length: 12 },
    (_, index) => ({
      id: index + 1,
      rollNo: `23CSE${String(
        index + 1
      ).padStart(2, "0")}`,
      name: [
        "Aarav Sharma",
        "Ananya Singh",
        "Arjun Kumar",
        "Diya Patel",
        "Ishaan Reddy",
        "Kavya Menon",
        "Manish Verma",
        "Neha Gupta",
        "Rahul Nair",
        "Riya Shah",
        "Sahil Joshi",
        "Tanvi Rao",
      ][index],
    })
  );

  const presentCount =
    Object.values(attendance).filter(
      (value) => value === "Present"
    ).length;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div>
            <p className="text-xs text-blue-400">
              Mark Attendance
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              {classItem.subject}
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              {classItem.className} •{" "}
              {classItem.time} •{" "}
              {classItem.room}
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

        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div>
            <span className="text-xs text-slate-500">
              Present
            </span>

            <span className="ml-2 text-sm font-bold text-emerald-400">
              {presentCount}/
              {students.length}
            </span>
          </div>

          <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-400">
            {Math.round(
              (presentCount /
                students.length) *
                100
            )}
            %
          </span>
        </div>

        <div className="max-h-[55vh] overflow-y-auto">
          {students.map(
            (student) => {
              const isPresent =
                attendance[
                  student.id
                ] === "Present";

              return (
                <div
                  key={student.id}
                  className="flex items-center gap-4 border-b border-slate-800/70 px-6 py-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-slate-500">
                    {student.rollNo.slice(
                      -2
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-300">
                      {student.name}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-700">
                      {student.rollNo}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onToggle(
                        student.id
                      )
                    }
                    className={`rounded-xl px-4 py-2 text-[10px] font-semibold transition ${
                      isPresent
                        ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    }`}
                  >
                    {isPresent
                      ? "Present"
                      : "Absent"}
                  </button>
                </div>
              );
            }
          )}
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
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   HELPERS
========================================= */

function formatDate(value) {
  const date = new Date(
    `${value}T00:00:00`
  );

  if (
    Number.isNaN(date.getTime())
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

export default StaffDashboard;
