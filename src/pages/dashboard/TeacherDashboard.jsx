import React, { useMemo, useState } from "react";

const INITIAL_CLASSES = [
  {
    id: 1,
    subject: "Data Structures",
    code: "CS301",
    className: "CSE - 6A",
    room: "Room 301",
    time: "09:00 - 10:00",
    students: 52,
    attendance: 91,
    status: "Completed",
  },
  {
    id: 2,
    subject: "Algorithms",
    code: "CS302",
    className: "CSE - 6B",
    room: "Room 205",
    time: "11:00 - 12:00",
    students: 48,
    attendance: 87,
    status: "Upcoming",
  },
  {
    id: 3,
    subject: "Database Systems",
    code: "CS303",
    className: "CSE - 6A",
    room: "Lab 02",
    time: "14:00 - 15:00",
    students: 52,
    attendance: 94,
    status: "Upcoming",
  },
  {
    id: 4,
    subject: "Web Technologies",
    code: "CS306",
    className: "CSE - 4A",
    room: "Room 104",
    time: "15:00 - 16:00",
    students: 45,
    attendance: 89,
    status: "Upcoming",
  },
];

const INITIAL_STUDENTS = [
  {
    id: "STU001",
    name: "Aarav Sharma",
    roll: "CSE001",
    attendance: 96,
  },
  {
    id: "STU002",
    name: "Ananya Patel",
    roll: "CSE002",
    attendance: 92,
  },
  {
    id: "STU003",
    name: "Rahul Kumar",
    roll: "CSE003",
    attendance: 78,
  },
  {
    id: "STU004",
    name: "Priya Singh",
    roll: "CSE004",
    attendance: 88,
  },
  {
    id: "STU005",
    name: "Rohan Mehta",
    roll: "CSE005",
    attendance: 65,
  },
];

function TeacherDashboard() {
  const [classes, setClasses] =
    useState(INITIAL_CLASSES);

  const [students] =
    useState(INITIAL_STUDENTS);

  const [selectedClass, setSelectedClass] =
    useState(null);

  const [showAttendance, setShowAttendance] =
    useState(false);

  const [attendance, setAttendance] =
    useState({});

  const [toast, setToast] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("overview");

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const stats = useMemo(() => {
    const totalStudents = classes.reduce(
      (sum, item) => sum + item.students,
      0
    );

    const averageAttendance =
      classes.length > 0
        ? Math.round(
            classes.reduce(
              (sum, item) =>
                sum + item.attendance,
              0
            ) / classes.length
          )
        : 0;

    return {
      classes: classes.length,
      students: totalStudents,
      attendance: averageAttendance,
      pending: classes.filter(
        (item) =>
          item.status === "Upcoming"
      ).length,
    };
  }, [classes]);

  const lowAttendanceStudents =
    students.filter(
      (student) => student.attendance < 75
    );

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const openAttendance = (classItem) => {
    setSelectedClass(classItem);

    const initialAttendance = {};

    students.forEach((student) => {
      initialAttendance[student.id] =
        student.attendance >= 75
          ? "Present"
          : "Absent";
    });

    setAttendance(initialAttendance);
    setShowAttendance(true);
  };

  const markStudent = (
    studentId,
    status
  ) => {
    setAttendance((previous) => ({
      ...previous,
      [studentId]: status,
    }));
  };

  const saveAttendance = () => {
    if (!selectedClass) return;

    const presentCount = Object.values(
      attendance
    ).filter(
      (status) => status === "Present"
    ).length;

    const percentage =
      students.length > 0
        ? Math.round(
            (presentCount /
              students.length) *
              100
          )
        : 0;

    setClasses((previous) =>
      previous.map((item) =>
        item.id === selectedClass.id
          ? {
              ...item,
              attendance: percentage,
              status: "Completed",
            }
          : item
      )
    );

    setShowAttendance(false);

    showToast(
      "Attendance saved successfully."
    );
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed right-6 top-6 z-[100] rounded-xl border border-emerald-500/20 bg-slate-900 px-5 py-4 text-sm font-medium text-emerald-400 shadow-2xl">
          ✓ {toast}
        </div>
      )}

      {/* HEADER */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs text-slate-600">
            Faculty Portal / Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold text-white">
            Teacher Dashboard
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            {today}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-semibold text-slate-300">
              Dr. Priya Sharma
            </p>

            <p className="mt-0.5 text-[10px] text-slate-600">
              Computer Science & Engineering
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-bold text-blue-400">
            PS
          </div>
        </div>
      </div>

      {/* TABS */}

      <div className="flex gap-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-1">
        {[
          ["overview", "Overview"],
          ["classes", "My Classes"],
          ["students", "Students"],
          ["alerts", "Alerts"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === key
                ? "bg-blue-600 text-white"
                : "text-slate-500 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}

      {activeTab === "overview" && (
        <>
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            <StatCard
              label="Today's Classes"
              value={stats.classes}
              icon="▦"
              color="blue"
            />

            <StatCard
              label="Students"
              value={stats.students}
              icon="♙"
              color="purple"
            />

            <StatCard
              label="Avg. Attendance"
              value={`${stats.attendance}%`}
              icon="✓"
              color="emerald"
            />

            <StatCard
              label="Upcoming"
              value={stats.pending}
              icon="◷"
              color="amber"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 xl:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-800 p-5">
                <div>
                  <h2 className="font-semibold text-white">
                    Today's Schedule
                  </h2>

                  <p className="mt-1 text-[10px] text-slate-600">
                    Your teaching schedule for today
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab("classes")
                  }
                  className="text-[10px] font-semibold text-blue-400 hover:text-blue-300"
                >
                  View all →
                </button>
              </div>

              <div className="divide-y divide-slate-800">
                {classes.map((classItem) => (
                  <ClassRow
                    key={classItem.id}
                    item={classItem}
                    onAttendance={() =>
                      openAttendance(
                        classItem
                      )
                    }
                  />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900">
              <div className="border-b border-slate-800 p-5">
                <h2 className="font-semibold text-white">
                  Attendance Alerts
                </h2>

                <p className="mt-1 text-[10px] text-slate-600">
                  Students requiring attention
                </p>
              </div>

              <div className="p-4">
                {lowAttendanceStudents.length ===
                0 ? (
                  <div className="rounded-xl bg-emerald-500/5 p-5 text-center">
                    <div className="text-2xl text-emerald-400">
                      ✓
                    </div>

                    <p className="mt-2 text-xs font-semibold text-emerald-400">
                      No attendance alerts
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lowAttendanceStudents.map(
                      (student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between rounded-xl border border-red-500/10 bg-red-500/5 p-3"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-[9px] font-bold text-red-400">
                              {student.name
                                .split(" ")
                                .map(
                                  (part) =>
                                    part[0]
                                )
                                .join("")}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-slate-300">
                                {student.name}
                              </p>

                              <p className="text-[9px] text-slate-600">
                                {student.roll}
                              </p>
                            </div>
                          </div>

                          <span className="text-xs font-bold text-red-400">
                            {student.attendance}%
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>

          <section className="rounded-2xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 p-5">
              <h2 className="font-semibold text-white">
                Quick Actions
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
              <QuickAction
                icon="✓"
                title="Mark Attendance"
                description="Record today's attendance"
                onClick={() =>
                  openAttendance(classes[0])
                }
              />

              <QuickAction
                icon="▣"
                title="View Students"
                description="Open student roster"
                onClick={() =>
                  setActiveTab("students")
                }
              />

              <QuickAction
                icon="◷"
                title="My Schedule"
                description="View teaching timetable"
                onClick={() =>
                  setActiveTab("classes")
                }
              />

              <QuickAction
                icon="!"
                title="Attendance Alerts"
                description="Review shortages"
                onClick={() =>
                  setActiveTab("alerts")
                }
              />
            </div>
          </section>
        </>
      )}

      {/* CLASSES */}

      {activeTab === "classes" && (
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 p-5">
            <h2 className="font-semibold text-white">
              My Classes
            </h2>

            <p className="mt-1 text-[10px] text-slate-600">
              Classes assigned to you
            </p>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">
            {classes.map((item) => (
              <ClassCard
                key={item.id}
                item={item}
                onAttendance={() =>
                  openAttendance(item)
                }
              />
            ))}
          </div>
        </section>
      )}

      {/* STUDENTS */}

      {activeTab === "students" && (
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 p-5">
            <h2 className="font-semibold text-white">
              Student Attendance
            </h2>

            <p className="mt-1 text-[10px] text-slate-600">
              Monitor attendance of students assigned
              to your classes
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-5 py-4 text-[9px] uppercase tracking-wider text-slate-600">
                    Student
                  </th>

                  <th className="px-5 py-4 text-[9px] uppercase tracking-wider text-slate-600">
                    Roll Number
                  </th>

                  <th className="px-5 py-4 text-[9px] uppercase tracking-wider text-slate-600">
                    Attendance
                  </th>

                  <th className="px-5 py-4 text-[9px] uppercase tracking-wider text-slate-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-800/20"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-[9px] font-bold text-blue-400">
                          {student.name
                            .split(" ")
                            .map(
                              (part) =>
                                part[0]
                            )
                            .join("")}
                        </div>

                        <span className="text-xs font-semibold text-slate-300">
                          {student.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-500">
                      {student.roll}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className={`h-full rounded-full ${
                              student.attendance >=
                              75
                                ? "bg-emerald-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${student.attendance}%`,
                            }}
                          />
                        </div>

                        <span className="text-xs font-bold text-white">
                          {student.attendance}%
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                          student.attendance >=
                          75
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {student.attendance >=
                        75
                          ? "Good"
                          : "Shortage"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ALERTS */}

      {activeTab === "alerts" && (
        <section className="rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 p-5">
            <h2 className="font-semibold text-white">
              Attendance Alerts
            </h2>

            <p className="mt-1 text-[10px] text-slate-600">
              Students below the minimum attendance
              threshold
            </p>
          </div>

          <div className="p-5">
            {lowAttendanceStudents.length ===
            0 ? (
              <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-10 text-center">
                <div className="text-3xl text-emerald-400">
                  ✓
                </div>

                <h3 className="mt-3 text-sm font-semibold text-white">
                  Everything looks good
                </h3>

                <p className="mt-1 text-xs text-slate-600">
                  No students currently have attendance
                  below 75%.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowAttendanceStudents.map(
                  (student) => (
                    <div
                      key={student.id}
                      className="flex flex-col gap-4 rounded-xl border border-red-500/10 bg-red-500/5 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {student.name}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-600">
                          {student.roll}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-lg font-bold text-red-400">
                          {student.attendance}%
                        </p>

                        <p className="text-[9px] text-slate-600">
                          Attendance
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ATTENDANCE MODAL */}

      {showAttendance &&
        selectedClass && (
          <AttendanceModal
            classItem={selectedClass}
            students={students}
            attendance={attendance}
            onMark={markStudent}
            onSave={saveAttendance}
            onClose={() =>
              setShowAttendance(false)
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
  const colors = {
    blue: {
      border: "border-blue-500/20",
      bg: "bg-blue-500/5",
      icon: "bg-blue-500/10 text-blue-400",
      value: "text-blue-400",
    },
    purple: {
      border: "border-purple-500/20",
      bg: "bg-purple-500/5",
      icon: "bg-purple-500/10 text-purple-400",
      value: "text-purple-400",
    },
    emerald: {
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/5",
      icon: "bg-emerald-500/10 text-emerald-400",
      value: "text-emerald-400",
    },
    amber: {
      border: "border-amber-500/20",
      bg: "bg-amber-500/5",
      icon: "bg-amber-500/10 text-amber-400",
      value: "text-amber-400",
    },
  };

  const style = colors[color];

  return (
    <div
      className={`rounded-2xl border ${style.border} ${style.bg} p-5`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-600">
          {label}
        </p>

        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${style.icon}`}
        >
          {icon}
        </span>
      </div>

      <p
        className={`mt-4 text-2xl font-bold ${style.value}`}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================
   CLASS ROW
========================================= */

function ClassRow({
  item,
  onAttendance,
}) {
  return (
    <div className="flex flex-col gap-4 p-5 transition hover:bg-slate-800/20 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          ◷
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xs font-semibold text-slate-300">
              {item.subject}
            </h3>

            <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[8px] text-slate-500">
              {item.code}
            </span>
          </div>

          <p className="mt-1 text-[10px] text-slate-600">
            {item.className} · {item.room} ·{" "}
            {item.time}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs font-bold text-white">
            {item.attendance}%
          </p>

          <p className="text-[8px] text-slate-700">
            attendance
          </p>
        </div>

        <button
          type="button"
          onClick={onAttendance}
          className={`rounded-lg px-3 py-2 text-[9px] font-semibold transition ${
            item.status === "Completed"
              ? "border border-emerald-500/10 bg-emerald-500/5 text-emerald-400"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          {item.status === "Completed"
            ? "Edit Attendance"
            : "Mark Attendance"}
        </button>
      </div>
    </div>
  );
}

/* =========================================
   CLASS CARD
========================================= */

function ClassCard({
  item,
  onAttendance,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-blue-500/20">
      <div className="flex items-start justify-between">
        <div>
          <span className="rounded-md bg-blue-500/10 px-2 py-1 text-[9px] font-bold text-blue-400">
            {item.code}
          </span>

          <h3 className="mt-3 text-sm font-semibold text-white">
            {item.subject}
          </h3>

          <p className="mt-1 text-[10px] text-slate-600">
            {item.className}
          </p>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${
            item.status === "Completed"
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-blue-500/10 text-blue-400"
          }`}
        >
          {item.status}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Info
          label="Time"
          value={item.time}
        />

        <Info
          label="Room"
          value={item.room}
        />

        <Info
          label="Students"
          value={item.students}
        />

        <Info
          label="Attendance"
          value={`${item.attendance}%`}
        />
      </div>

      <button
        type="button"
        onClick={onAttendance}
        className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"
      >
        {item.status === "Completed"
          ? "Manage Attendance"
          : "Mark Attendance"}
      </button>
    </div>
  );
}

/* =========================================
   INFO
========================================= */

function Info({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-900 p-3">
      <p className="text-[8px] uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p className="mt-1 text-[10px] font-semibold text-slate-400">
        {value}
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
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-left transition hover:border-blue-500/20 hover:bg-blue-500/5"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
        {icon}
      </div>

      <p className="mt-3 text-xs font-semibold text-slate-300">
        {title}
      </p>

      <p className="mt-1 text-[9px] text-slate-600">
        {description}
      </p>
    </button>
  );
}

/* =========================================
   ATTENDANCE MODAL
========================================= */

function AttendanceModal({
  classItem,
  students,
  attendance,
  onMark,
  onSave,
  onClose,
}) {
  const presentCount =
    Object.values(attendance).filter(
      (status) => status === "Present"
    ).length;

  const attendancePercentage =
    students.length > 0
      ? Math.round(
          (presentCount /
            students.length) *
            100
        )
      : 0;

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
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* MODAL HEADER */}

        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-blue-400">
              Attendance
            </p>

            <h2 className="mt-1 text-lg font-bold text-white">
              {classItem.subject}
            </h2>

            <p className="mt-1 text-[10px] text-slate-600">
              {classItem.className} ·{" "}
              {classItem.time} ·{" "}
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

        {/* SUMMARY */}

        <div className="grid grid-cols-3 gap-3 border-b border-slate-800 p-5">
          <Summary
            label="Students"
            value={students.length}
          />

          <Summary
            label="Present"
            value={presentCount}
          />

          <Summary
            label="Percentage"
            value={`${attendancePercentage}%`}
          />
        </div>

        {/* STUDENTS */}

        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-slate-800">
            {students.map((student) => {
              const status =
                attendance[student.id] ||
                "Present";

              return (
                <div
                  key={student.id}
                  className="flex flex-col gap-3 p-4 transition hover:bg-slate-800/20 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-[9px] font-bold text-slate-400">
                      {student.name
                        .split(" ")
                        .map(
                          (part) =>
                            part[0]
                        )
                        .join("")}
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-300">
                        {student.name}
                      </p>

                      <p className="mt-0.5 text-[9px] text-slate-600">
                        {student.roll}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onMark(
                          student.id,
                          "Present"
                        )
                      }
                      className={`rounded-lg px-4 py-2 text-[9px] font-semibold transition ${
                        status ===
                        "Present"
                          ? "bg-emerald-500 text-white"
                          : "border border-slate-800 text-slate-500 hover:bg-slate-800"
                      }`}
                    >
                      ✓ Present
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onMark(
                          student.id,
                          "Absent"
                        )
                      }
                      className={`rounded-lg px-4 py-2 text-[9px] font-semibold transition ${
                        status ===
                        "Absent"
                          ? "bg-red-500 text-white"
                          : "border border-slate-800 text-slate-500 hover:bg-slate-800"
                      }`}
                    >
                      ✕ Absent
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onMark(
                          student.id,
                          "Late"
                        )
                      }
                      className={`rounded-lg px-4 py-2 text-[9px] font-semibold transition ${
                        status === "Late"
                          ? "bg-amber-500 text-white"
                          : "border border-slate-800 text-slate-500 hover:bg-slate-800"
                      }`}
                    >
                      ◷ Late
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}

        <div className="flex justify-end gap-2 border-t border-slate-800 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2.5 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white"
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
   SUMMARY
========================================= */

function Summary({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
      <p className="text-[8px] uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-white">
        {value}
      </p>
    </div>
  );
}

export default TeacherDashboard;
