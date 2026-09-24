import React, { useMemo, useState } from "react";

const INITIAL_STUDENTS = [
  {
    id: 1,
    rollNo: "CS2024001",
    name: "Aarav Sharma",
    department: "Computer Science",
    semester: "Semester 4",
    className: "CSE-A",
    totalClasses: 48,
    attended: 32,
    approvedLeave: 2,
  },
  {
    id: 2,
    rollNo: "CS2024007",
    name: "Ananya Reddy",
    department: "Computer Science",
    semester: "Semester 4",
    className: "CSE-A",
    totalClasses: 52,
    attended: 36,
    approvedLeave: 1,
  },
  {
    id: 3,
    rollNo: "EC2024014",
    name: "Rohan Kumar",
    department: "Electronics",
    semester: "Semester 4",
    className: "ECE-A",
    totalClasses: 55,
    attended: 37,
    approvedLeave: 0,
  },
  {
    id: 4,
    rollNo: "ME2024021",
    name: "Ishita Singh",
    department: "Mechanical",
    semester: "Semester 4",
    className: "ME-A",
    totalClasses: 46,
    attended: 29,
    approvedLeave: 3,
  },
  {
    id: 5,
    rollNo: "CS2024032",
    name: "Vikram Patel",
    department: "Computer Science",
    semester: "Semester 6",
    className: "CSE-B",
    totalClasses: 60,
    attended: 41,
    approvedLeave: 0,
  },
  {
    id: 6,
    rollNo: "IT2024045",
    name: "Meera Nair",
    department: "Information Technology",
    semester: "Semester 6",
    className: "IT-A",
    totalClasses: 58,
    attended: 39,
    approvedLeave: 1,
  },
  {
    id: 7,
    rollNo: "CS2024056",
    name: "Aditya Verma",
    department: "Computer Science",
    semester: "Semester 2",
    className: "CSE-B",
    totalClasses: 44,
    attended: 27,
    approvedLeave: 0,
  },
  {
    id: 8,
    rollNo: "EE2024062",
    name: "Priya Menon",
    department: "Electrical",
    semester: "Semester 6",
    className: "EEE-A",
    totalClasses: 50,
    attended: 34,
    approvedLeave: 2,
  },
];

const DEPARTMENTS = [
  "All Departments",
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Electrical",
];

const SEMESTERS = [
  "All Semesters",
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
];

function calculatePercentage(
  attended,
  total
) {
  if (!total) return 0;

  return Math.round(
    (attended / total) * 100
  );
}

function getRequiredClasses(
  attended,
  total,
  target = 75
) {
  const percentage =
    calculatePercentage(
      attended,
      total
    );

  if (percentage >= target) {
    return 0;
  }

  let additionalClasses = 0;

  while (
    ((attended + additionalClasses) /
      (total + additionalClasses)) *
      100 <
      target &&
    additionalClasses < 1000
  ) {
    additionalClasses += 1;
  }

  return additionalClasses;
}

function getStatus(percentage) {
  if (percentage < 65) {
    return "Critical";
  }

  if (percentage < 75) {
    return "Shortage";
  }

  if (percentage < 85) {
    return "Warning";
  }

  return "Good";
}

function Shortage() {
  const [students, setStudents] =
    useState(INITIAL_STUDENTS);

  const [search, setSearch] =
    useState("");

  const [department, setDepartment] =
    useState("All Departments");

  const [semester, setSemester] =
    useState("All Semesters");

  const [status, setStatus] =
    useState("All");

  const [threshold, setThreshold] =
    useState(75);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [showNotifyModal, setShowNotifyModal] =
    useState(false);

  const [notifyStudent, setNotifyStudent] =
    useState(null);

  const [toast, setToast] =
    useState("");

  const [notificationMessage, setNotificationMessage] =
    useState("");

  const processedStudents = useMemo(() => {
    return students.map((student) => {
      const percentage =
        calculatePercentage(
          student.attended,
          student.totalClasses
        );

      const studentStatus =
        percentage < threshold
          ? percentage < 65
            ? "Critical"
            : "Shortage"
          : percentage < 85
          ? "Warning"
          : "Good";

      return {
        ...student,
        percentage,
        status: studentStatus,
        requiredClasses:
          getRequiredClasses(
            student.attended,
            student.totalClasses,
            threshold
          ),
      };
    });
  }, [students, threshold]);

  const filteredStudents = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return processedStudents.filter(
      (student) => {
        const matchesSearch =
          !query ||
          student.name
            .toLowerCase()
            .includes(query) ||
          student.rollNo
            .toLowerCase()
            .includes(query) ||
          student.className
            .toLowerCase()
            .includes(query);

        const matchesDepartment =
          department ===
            "All Departments" ||
          student.department ===
            department;

        const matchesSemester =
          semester ===
            "All Semesters" ||
          student.semester ===
            semester;

        const matchesStatus =
          status === "All" ||
          student.status === status;

        return (
          matchesSearch &&
          matchesDepartment &&
          matchesSemester &&
          matchesStatus
        );
      }
    );
  }, [
    processedStudents,
    search,
    department,
    semester,
    status,
  ]);

  const statistics = useMemo(() => {
    const shortage = processedStudents.filter(
      (student) =>
        student.percentage < threshold
    );

    const critical = processedStudents.filter(
      (student) =>
        student.percentage < 65
    );

    const average =
      processedStudents.length
        ? Math.round(
            processedStudents.reduce(
              (sum, student) =>
                sum +
                student.percentage,
              0
            ) /
              processedStudents.length
          )
        : 0;

    const totalRequired =
      shortage.reduce(
        (sum, student) =>
          sum +
          student.requiredClasses,
        0
      );

    return {
      total: processedStudents.length,
      shortage: shortage.length,
      critical: critical.length,
      average,
      totalRequired,
    };
  }, [
    processedStudents,
    threshold,
  ]);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const clearFilters = () => {
    setSearch("");
    setDepartment(
      "All Departments"
    );
    setSemester("All Semesters");
    setStatus("All");
  };

  const sendNotification = () => {
    if (!notifyStudent) {
      return;
    }

    const message =
      notificationMessage.trim() ||
      `Your attendance is currently ${notifyStudent.percentage}%. Please improve your attendance.`;

    const notifications =
      JSON.parse(
        localStorage.getItem(
          "ams_notifications"
        ) || "[]"
      );

    notifications.unshift({
      id: Date.now(),
      type: "attendance",
      title:
        "Attendance Shortage Alert",
      message,
      studentId:
        notifyStudent.id,
      studentName:
        notifyStudent.name,
      createdAt:
        new Date().toISOString(),
      read: false,
    });

    localStorage.setItem(
      "ams_notifications",
      JSON.stringify(
        notifications
      )
    );

    window.dispatchEvent(
      new Event(
        "ams-notifications-updated"
      )
    );

    setShowNotifyModal(false);
    setNotifyStudent(null);
    setNotificationMessage("");

    showToast(
      `Attendance alert sent to ${notifyStudent.name}.`
    );
  };

  const markFollowUp = (
    studentId
  ) => {
    const followUps =
      JSON.parse(
        localStorage.getItem(
          "ams_attendance_followups"
        ) || "[]"
      );

    if (
      !followUps.includes(studentId)
    ) {
      followUps.push(studentId);

      localStorage.setItem(
        "ams_attendance_followups",
        JSON.stringify(
          followUps
        )
      );

      showToast(
        "Student added to follow-up list."
      );
    } else {
      showToast(
        "Student is already on the follow-up list."
      );
    }
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
            Attendance / Shortage
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Attendance Shortage
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Identify students below the
            minimum attendance requirement
            and manage follow-up actions.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
          <span className="text-xs text-slate-500">
            Minimum Required
          </span>

          <input
            type="number"
            min="1"
            max="100"
            value={threshold}
            onChange={(event) =>
              setThreshold(
                Number(
                  event.target.value
                )
              )
            }
            className="w-16 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-center text-sm font-semibold text-blue-400 outline-none focus:border-blue-500"
          />

          <span className="text-xs text-slate-500">
            %
          </span>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard
          label="Students Checked"
          value={statistics.total}
          icon="👥"
          color="blue"
        />

        <StatCard
          label="Shortage"
          value={statistics.shortage}
          icon="⚠"
          color="amber"
        />

        <StatCard
          label="Critical"
          value={statistics.critical}
          icon="!"
          color="red"
        />

        <StatCard
          label="Average Attendance"
          value={`${statistics.average}%`}
          icon="◔"
          color="purple"
        />

        <StatCard
          label="Classes Needed"
          value={
            statistics.totalRequired
          }
          icon="📚"
          color="emerald"
        />
      </div>

      {/* FILTERS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_210px_180px_160px_auto]">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
              🔍
            </span>

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search student, roll number or class..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          <select
            value={department}
            onChange={(event) =>
              setDepartment(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-400 outline-none focus:border-blue-500"
          >
            {DEPARTMENTS.map(
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
            value={semester}
            onChange={(event) =>
              setSemester(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-400 outline-none focus:border-blue-500"
          >
            {SEMESTERS.map(
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
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-400 outline-none focus:border-blue-500"
          >
            <option value="All">
              All Status
            </option>

            <option value="Critical">
              Critical
            </option>

            <option value="Shortage">
              Shortage
            </option>

            <option value="Warning">
              Warning
            </option>

            <option value="Good">
              Good
            </option>
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-slate-700 px-4 py-3 text-xs font-medium text-slate-500 transition hover:bg-slate-800 hover:text-white"
          >
            Reset
          </button>
        </div>
      </div>

      {/* SHORTAGE TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex flex-col gap-3 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-white">
              Attendance Shortage List
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Students are calculated against
              the {threshold}% requirement.
            </p>
          </div>

          <span className="rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-500">
            {filteredStudents.length}{" "}
            records
          </span>
        </div>

        {filteredStudents.length ===
        0 ? (
          <EmptyState
            onReset={clearFilters}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/30">
                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Student
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Class
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Attendance
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Required
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Status
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map(
                  (student) => (
                    <ShortageRow
                      key={student.id}
                      student={student}
                      onView={() =>
                        setSelectedStudent(
                          student
                        )
                      }
                      onNotify={() => {
                        setNotifyStudent(
                          student
                        );

                        setNotificationMessage(
                          `Your current attendance is ${student.percentage}%, which is below the required ${threshold}%. Please attend upcoming classes regularly.`
                        );

                        setShowNotifyModal(
                          true
                        );
                      }}
                      onFollowUp={() =>
                        markFollowUp(
                          student.id
                        )
                      }
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* INFORMATION */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <InfoCard
          icon="📊"
          title="How shortage is calculated"
          text="Attendance percentage is calculated from attended classes divided by total scheduled classes."
        />

        <InfoCard
          icon="🎯"
          title="Classes required"
          text="The system calculates how many consecutive classes a student needs to attend to reach the configured threshold."
        />

        <InfoCard
          icon="🔔"
          title="Follow-up"
          text="Administrators can send an attendance alert and add students to the follow-up workflow."
        />
      </div>

      {/* STUDENT DETAILS */}
      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          threshold={threshold}
          onClose={() =>
            setSelectedStudent(null)
          }
          onNotify={() => {
            setNotifyStudent(
              selectedStudent
            );

            setNotificationMessage(
              `Your current attendance is ${selectedStudent.percentage}%, which is below the required ${threshold}%. Please attend upcoming classes regularly.`
            );

            setSelectedStudent(
              null
            );

            setShowNotifyModal(
              true
            );
          }}
          onFollowUp={() =>
            markFollowUp(
              selectedStudent.id
            )
          }
        />
      )}

      {/* NOTIFICATION MODAL */}
      {showNotifyModal &&
        notifyStudent && (
          <NotificationModal
            student={notifyStudent}
            message={
              notificationMessage
            }
            setMessage={
              setNotificationMessage
            }
            onClose={() => {
              setShowNotifyModal(
                false
              );

              setNotifyStudent(
                null
              );
            }}
            onSend={
              sendNotification
            }
          />
        )}
    </div>
  );
}

/* =========================================
   TABLE ROW
========================================= */

function ShortageRow({
  student,
  onView,
  onNotify,
  onFollowUp,
}) {
  const progressColor =
    student.percentage < 65
      ? "bg-red-500"
      : student.percentage < 75
      ? "bg-amber-500"
      : "bg-blue-500";

  return (
    <tr className="border-b border-slate-800/70 transition hover:bg-slate-800/20">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-xs font-bold text-blue-400">
            {student.name
              .split(" ")
              .map(
                (part) =>
                  part[0]
              )
              .join("")
              .slice(0, 2)}
          </div>

          <div>
            <button
              type="button"
              onClick={onView}
              className="text-sm font-semibold text-white hover:text-blue-400"
            >
              {student.name}
            </button>

            <p className="mt-1 text-[11px] text-slate-600">
              {student.rollNo}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <p className="text-xs text-slate-400">
          {student.className}
        </p>

        <p className="mt-1 text-[10px] text-slate-700">
          {student.department}
        </p>
      </td>

      <td className="px-5 py-4">
        <div className="w-36">
          <div className="mb-2 flex items-center justify-between">
            <span
              className={`text-sm font-bold ${
                student.percentage <
                65
                  ? "text-red-400"
                  : student.percentage <
                    75
                  ? "text-amber-400"
                  : "text-blue-400"
              }`}
            >
              {student.percentage}%
            </span>

            <span className="text-[10px] text-slate-700">
              {student.attended}/
              {student.totalClasses}
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full ${progressColor}`}
              style={{
                width: `${Math.min(
                  student.percentage,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        {student.requiredClasses ===
        0 ? (
          <span className="text-xs text-emerald-400">
            Requirement met
          </span>
        ) : (
          <div>
            <p className="text-sm font-semibold text-white">
              {student.requiredClasses}
            </p>

            <p className="text-[10px] text-slate-600">
              consecutive classes
            </p>
          </div>
        )}
      </td>

      <td className="px-5 py-4">
        <StatusBadge
          status={student.status}
        />
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onView}
            title="View details"
            className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            View
          </button>

          <button
            type="button"
            onClick={onNotify}
            title="Send notification"
            className="rounded-lg border border-blue-500/20 px-3 py-2 text-xs text-blue-400 transition hover:bg-blue-500/10"
          >
            Notify
          </button>

          <button
            type="button"
            onClick={onFollowUp}
            title="Add to follow-up"
            className="rounded-lg border border-purple-500/20 px-3 py-2 text-xs text-purple-400 transition hover:bg-purple-500/10"
          >
            Follow-up
          </button>
        </div>
      </td>
    </tr>
  );
}

/* =========================================
   STUDENT DETAILS MODAL
========================================= */

function StudentDetailsModal({
  student,
  threshold,
  onClose,
  onNotify,
  onFollowUp,
}) {
  const projectedPercentage =
    calculatePercentage(
      student.attended +
        student.requiredClasses,
      student.totalClasses +
        student.requiredClasses
    );

  return (
    <ModalOverlay onClose={onClose}>
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="border-b border-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-sm font-bold text-blue-400">
                {student.name
                  .split(" ")
                  .map(
                    (part) =>
                      part[0]
                  )
                  .join("")
                  .slice(0, 2)}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  {student.name}
                </h2>

                <p className="mt-1 text-xs text-slate-600">
                  {student.rollNo} ·{" "}
                  {student.className}
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
        </div>

        <div className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Metric
              label="Attendance"
              value={`${student.percentage}%`}
            />

            <Metric
              label="Attended"
              value={
                student.attended
              }
            />

            <Metric
              label="Total"
              value={
                student.totalClasses
              }
            />

            <Metric
              label="Required"
              value={
                student.requiredClasses
              }
            />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600">
                  Current attendance
                </p>

                <p className="mt-1 text-2xl font-bold text-white">
                  {student.percentage}%
                </p>
              </div>

              <StatusBadge
                status={
                  student.status
                }
              />
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${
                  student.percentage <
                  65
                    ? "bg-red-500"
                    : student.percentage <
                      75
                    ? "bg-amber-500"
                    : "bg-blue-500"
                }`}
                style={{
                  width: `${Math.min(
                    student.percentage,
                    100
                  )}%`,
                }}
              />
            </div>

            <div className="mt-3 flex justify-between text-[10px] text-slate-700">
              <span>
                0%
              </span>

              <span>
                Required{" "}
                {threshold}%
              </span>

              <span>
                100%
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-4">
            <p className="text-xs font-semibold text-amber-400">
              Recovery calculation
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              If {student.name.split(" ")[0]} attends
              the next{" "}
              <span className="font-semibold text-slate-300">
                {
                  student.requiredClasses
                }{" "}
                classes
              </span>
              , attendance will reach
              approximately{" "}
              <span className="font-semibold text-emerald-400">
                {projectedPercentage}%
              </span>
              .
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Detail
              label="Department"
              value={
                student.department
              }
            />

            <Detail
              label="Semester"
              value={
                student.semester
              }
            />

            <Detail
              label="Approved Leave"
              value={`${student.approvedLeave} days`}
            />

            <Detail
              label="Threshold"
              value={`${threshold}%`}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-slate-800 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onFollowUp}
            className="rounded-xl border border-purple-500/20 px-4 py-2.5 text-xs font-semibold text-purple-400 hover:bg-purple-500/10"
          >
            Add Follow-up
          </button>

          <button
            type="button"
            onClick={onNotify}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Send Alert
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* =========================================
   NOTIFICATION MODAL
========================================= */

function NotificationModal({
  student,
  message,
  setMessage,
  onClose,
  onSend,
}) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="border-b border-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-blue-400">
                Attendance Alert
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                Notify Student
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
        </div>

        <div className="space-y-5 p-6">
          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <p className="text-sm font-semibold text-white">
              {student.name}
            </p>

            <p className="mt-1 text-xs text-slate-600">
              {student.rollNo}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-slate-500">
                Attendance:
              </span>

              <span className="font-bold text-red-400">
                {student.percentage}%
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Notification Message
            </label>

            <textarea
              rows="6"
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm leading-6 text-slate-300 outline-none placeholder:text-slate-700 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-800 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSend}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Send Notification
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* =========================================
   COMMON COMPONENTS
========================================= */

function StatCard({
  label,
  value,
  icon,
  color,
}) {
  const colors = {
    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",

    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",

    red:
      "border-red-500/20 bg-red-500/10 text-red-400",

    purple:
      "border-purple-500/20 bg-purple-500/10 text-purple-400",

    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
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

function StatusBadge({
  status,
}) {
  const config = {
    Critical:
      "border-red-500/20 bg-red-500/10 text-red-400",
    Shortage:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
    Warning:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
    Good:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold ${
        config[status] ||
        config.Shortage
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />

      {status}
    </span>
  );
}

function Metric({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 text-center">
      <p className="text-[10px] uppercase tracking-wide text-slate-700">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function Detail({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-slate-700">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-slate-400">
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-800/50">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-600">
        {text}
      </p>
    </div>
  );
}

function EmptyState({
  onReset,
}) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="text-5xl">
        🎉
      </div>

      <h3 className="mt-4 text-sm font-semibold text-white">
        No shortage records found
      </h3>

      <p className="mt-2 text-xs text-slate-600">
        Try changing your filters or
        threshold.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
      >
        Reset Filters
      </button>
    </div>
  );
}

function ModalOverlay({
  children,
  onClose,
}) {
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
      {children}
    </div>
  );
}

export default Shortage;
