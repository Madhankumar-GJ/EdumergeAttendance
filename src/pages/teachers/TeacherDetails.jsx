import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TEACHERS = [
  {
    id: "T001",
    name: "Dr. Priya Sharma",
    employeeId: "FAC001",
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
    email: "priya.sharma@college.edu",
    phone: "+91 98765 43210",
    qualification: "Ph.D. in Computer Science",
    experience: "12 Years",
    joiningDate: "15 June 2014",
    status: "Active",
    attendance: 96,
    classes: 4,
    subjects: ["Data Structures", "Algorithms", "Database Systems"],
  },
  {
    id: "T002",
    name: "Dr. Rajesh Kumar",
    employeeId: "FAC002",
    department: "Computer Science & Engineering",
    designation: "Professor",
    email: "rajesh.kumar@college.edu",
    phone: "+91 98765 43211",
    qualification: "Ph.D. in Information Technology",
    experience: "18 Years",
    joiningDate: "10 July 2008",
    status: "Active",
    attendance: 94,
    classes: 3,
    subjects: ["Operating Systems", "Computer Networks"],
  },
  {
    id: "T003",
    name: "Prof. Ananya Patel",
    employeeId: "FAC003",
    department: "Electronics & Communication",
    designation: "Assistant Professor",
    email: "ananya.patel@college.edu",
    phone: "+91 98765 43212",
    qualification: "M.Tech in Electronics",
    experience: "7 Years",
    joiningDate: "22 August 2019",
    status: "Active",
    attendance: 91,
    classes: 3,
    subjects: ["Digital Electronics", "Microprocessors"],
  },
];

const SCHEDULE = [
  {
    day: "Monday",
    time: "09:00 - 10:00",
    subject: "Data Structures",
    className: "CSE - 6A",
    room: "Room 301",
  },
  {
    day: "Monday",
    time: "11:00 - 12:00",
    subject: "Algorithms",
    className: "CSE - 6B",
    room: "Room 205",
  },
  {
    day: "Tuesday",
    time: "14:00 - 15:00",
    subject: "Database Systems",
    className: "CSE - 6A",
    room: "Lab 02",
  },
  {
    day: "Wednesday",
    time: "10:00 - 11:00",
    subject: "Data Structures",
    className: "CSE - 6A",
    room: "Room 301",
  },
  {
    day: "Thursday",
    time: "11:00 - 12:00",
    subject: "Algorithms",
    className: "CSE - 6B",
    room: "Room 205",
  },
  {
    day: "Friday",
    time: "14:00 - 15:00",
    subject: "Database Systems",
    className: "CSE - 6A",
    room: "Lab 02",
  },
];

function TeacherDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState(
    "overview"
  );

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showMessage, setShowMessage] =
    useState(false);

  const teacher =
    TEACHERS.find(
      (item) =>
        item.id === id ||
        item.employeeId === id
    ) || TEACHERS[0];

  const initials = teacher.name
    .replace("Dr. ", "")
    .replace("Prof. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  const weeklyClasses = useMemo(
    () => SCHEDULE.length,
    []
  );

  const todaySchedule = useMemo(() => {
    const today = new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );

    return SCHEDULE.filter(
      (item) => item.day === today
    );
  }, []);

  const handleSave = () => {
    setShowEditModal(false);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {showMessage && (
        <div className="fixed right-6 top-6 z-[100] rounded-xl border border-emerald-500/20 bg-slate-900 px-5 py-4 text-sm font-medium text-emerald-400 shadow-2xl">
          ✓ Teacher details updated successfully
        </div>
      )}

      {/* Breadcrumb / Back */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-9 items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          ← Back
        </button>

        <span className="text-xs text-slate-700">
          Teachers / Details
        </span>
      </div>

      {/* PROFILE HEADER */}

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="h-28 bg-gradient-to-r from-blue-950 via-slate-900 to-purple-950" />

        <div className="px-5 pb-5">
          <div className="-mt-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white shadow-xl">
                {initials}
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold text-white">
                    {teacher.name}
                  </h1>

                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-400">
                    {teacher.status}
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {teacher.designation} ·{" "}
                  {teacher.department}
                </p>

                <p className="mt-1 text-[10px] text-slate-700">
                  Employee ID:{" "}
                  {teacher.employeeId}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowMessage(true)}
                className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                ✉ Message
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowEditModal(true)
                }
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"
              >
                Edit Teacher
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}

      <div className="flex gap-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-1">
        {[
          ["overview", "Overview"],
          ["subjects", "Subjects"],
          ["schedule", "Schedule"],
          ["attendance", "Attendance"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-xs font-semibold transition ${
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
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            {/* Stats */}

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <StatCard
                label="Attendance"
                value={`${teacher.attendance}%`}
                icon="✓"
                color="emerald"
              />

              <StatCard
                label="Classes"
                value={teacher.classes}
                icon="▦"
                color="blue"
              />

              <StatCard
                label="Subjects"
                value={teacher.subjects.length}
                icon="◈"
                color="purple"
              />

              <StatCard
                label="Weekly Slots"
                value={weeklyClasses}
                icon="◷"
                color="amber"
              />
            </div>

            {/* Personal Information */}

            <section className="rounded-2xl border border-slate-800 bg-slate-900">
              <div className="border-b border-slate-800 p-5">
                <h2 className="font-semibold text-white">
                  Personal & Employment Information
                </h2>

                <p className="mt-1 text-[10px] text-slate-600">
                  Faculty profile information
                </p>
              </div>

              <div className="grid grid-cols-1 gap-px bg-slate-800 sm:grid-cols-2">
                <Detail
                  label="Full Name"
                  value={teacher.name}
                />

                <Detail
                  label="Employee ID"
                  value={teacher.employeeId}
                />

                <Detail
                  label="Email"
                  value={teacher.email}
                />

                <Detail
                  label="Phone"
                  value={teacher.phone}
                />

                <Detail
                  label="Department"
                  value={teacher.department}
                />

                <Detail
                  label="Designation"
                  value={teacher.designation}
                />

                <Detail
                  label="Qualification"
                  value={teacher.qualification}
                />

                <Detail
                  label="Experience"
                  value={teacher.experience}
                />

                <Detail
                  label="Joining Date"
                  value={teacher.joiningDate}
                />

                <Detail
                  label="Employment Status"
                  value={teacher.status}
                />
              </div>
            </section>
          </div>

          {/* SIDE PANEL */}

          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800 bg-slate-900">
              <div className="border-b border-slate-800 p-5">
                <h2 className="font-semibold text-white">
                  Today's Schedule
                </h2>
              </div>

              <div className="p-4">
                {todaySchedule.length > 0 ? (
                  <div className="space-y-3">
                    {todaySchedule.map(
                      (item, index) => (
                        <ScheduleItem
                          key={index}
                          item={item}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl bg-slate-950/50 p-6 text-center">
                    <div className="text-2xl">
                      ◷
                    </div>

                    <p className="mt-2 text-xs font-semibold text-slate-400">
                      No classes today
                    </p>

                    <p className="mt-1 text-[9px] text-slate-700">
                      Enjoy your free day.
                    </p>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900">
              <div className="border-b border-slate-800 p-5">
                <h2 className="font-semibold text-white">
                  Subjects
                </h2>
              </div>

              <div className="space-y-2 p-4">
                {teacher.subjects.map(
                  (subject, index) => (
                    <div
                      key={subject}
                      className="flex items-center gap-3 rounded-xl bg-slate-950/50 p-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-xs text-blue-400">
                        {index + 1}
                      </div>

                      <span className="text-xs font-medium text-slate-400">
                        {subject}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* SUBJECTS */}

      {activeTab === "subjects" && (
        <section className="rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 p-5">
            <h2 className="font-semibold text-white">
              Assigned Subjects
            </h2>

            <p className="mt-1 text-[10px] text-slate-600">
              Subjects currently assigned to this
              teacher
            </p>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-3">
            {teacher.subjects.map(
              (subject, index) => (
                <div
                  key={subject}
                  className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-blue-500/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      ◈
                    </div>

                    <span className="text-[9px] font-semibold text-slate-700">
                      SUB-{String(
                        index + 1
                      ).padStart(3, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-white">
                    {subject}
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-600">
                    Department:{" "}
                    {teacher.department}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
                    <span className="text-[9px] text-slate-600">
                      Weekly Classes
                    </span>

                    <span className="text-xs font-bold text-blue-400">
                      {index === 0
                        ? 2
                        : 1}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* SCHEDULE */}

      {activeTab === "schedule" && (
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 p-5">
            <h2 className="font-semibold text-white">
              Weekly Teaching Schedule
            </h2>

            <p className="mt-1 text-[10px] text-slate-600">
              Timetable generated for this faculty
              member
            </p>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
            {SCHEDULE.map((item, index) => (
              <ScheduleCard
                key={index}
                item={item}
              />
            ))}
          </div>
        </section>
      )}

      {/* ATTENDANCE */}

      {activeTab === "attendance" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
            <h2 className="font-semibold text-white">
              Faculty Attendance
            </h2>

            <p className="mt-1 text-[10px] text-slate-600">
              Attendance summary for the current
              academic period
            </p>

            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[16px] border-emerald-500/10">
                <div
                  className="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-t-emerald-500 border-r-emerald-500"
                  style={{
                    transform: `rotate(${teacher.attendance * 1.8 - 90}deg)`,
                  }}
                />

                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-400">
                    {teacher.attendance}%
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-600">
                    Attendance
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <AttendanceMetric
                label="Present"
                value="92"
                color="emerald"
              />

              <AttendanceMetric
                label="Absent"
                value="3"
                color="red"
              />

              <AttendanceMetric
                label="Leave"
                value="1"
                color="amber"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 p-5">
              <h2 className="font-semibold text-white">
                Monthly Summary
              </h2>
            </div>

            <div className="space-y-4 p-5">
              {[
                ["January", 98],
                ["February", 96],
                ["March", 94],
                ["April", 97],
                ["May", 95],
                ["June", 96],
              ].map(([month, percentage]) => (
                <div key={month}>
                  <div className="mb-2 flex justify-between">
                    <span className="text-[10px] text-slate-500">
                      {month}
                    </span>

                    <span className="text-[10px] font-bold text-slate-300">
                      {percentage}%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* EDIT MODAL */}

      {showEditModal && (
        <EditTeacherModal
          teacher={teacher}
          onClose={() =>
            setShowEditModal(false)
          }
          onSave={handleSave}
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

  const style = styles[color];

  return (
    <div
      className={`rounded-2xl border ${style.border} ${style.bg} p-5`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-600">
          {label}
        </span>

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
   DETAIL
========================================= */

function Detail({
  label,
  value,
}) {
  return (
    <div className="bg-slate-900 p-5">
      <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p className="mt-2 break-words text-xs font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}

/* =========================================
   SCHEDULE ITEM
========================================= */

function ScheduleItem({ item }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-white">
            {item.subject}
          </p>

          <p className="mt-1 text-[9px] text-slate-600">
            {item.className}
          </p>
        </div>

        <span className="text-[9px] font-semibold text-blue-400">
          {item.time}
        </span>
      </div>

      <p className="mt-3 text-[9px] text-slate-700">
        📍 {item.room}
      </p>
    </div>
  );
}

/* =========================================
   SCHEDULE CARD
========================================= */

function ScheduleCard({ item }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-blue-500/20">
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-blue-500/10 px-2 py-1 text-[9px] font-bold text-blue-400">
          {item.day}
        </span>

        <span className="text-[9px] font-semibold text-slate-600">
          {item.time}
        </span>
      </div>

      <h3 className="mt-5 text-sm font-semibold text-white">
        {item.subject}
      </h3>

      <p className="mt-1 text-[10px] text-slate-600">
        {item.className}
      </p>

      <div className="mt-5 border-t border-slate-800 pt-4">
        <span className="text-[9px] text-slate-600">
          Classroom
        </span>

        <p className="mt-1 text-xs font-semibold text-slate-400">
          {item.room}
        </p>
      </div>
    </div>
  );
}

/* =========================================
   ATTENDANCE METRIC
========================================= */

function AttendanceMetric({
  label,
  value,
  color,
}) {
  const styles = {
    emerald:
      "bg-emerald-500/5 text-emerald-400",
    red: "bg-red-500/5 text-red-400",
    amber:
      "bg-amber-500/5 text-amber-400",
  };

  return (
    <div
      className={`rounded-xl p-4 ${styles[color]}`}
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

/* =========================================
   EDIT TEACHER MODAL
========================================= */

function EditTeacherModal({
  teacher,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    name: teacher.name,
    employeeId: teacher.employeeId,
    email: teacher.email,
    phone: teacher.phone,
    designation: teacher.designation,
    department: teacher.department,
    qualification: teacher.qualification,
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
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div>
            <h2 className="text-lg font-bold text-white">
              Edit Teacher
            </h2>

            <p className="mt-1 text-[10px] text-slate-600">
              Update faculty information
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

        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <FormField
            label="Full Name"
            value={form.name}
            onChange={(value) =>
              updateField("name", value)
            }
          />

          <FormField
            label="Employee ID"
            value={form.employeeId}
            onChange={(value) =>
              updateField(
                "employeeId",
                value
              )
            }
          />

          <FormField
            label="Email"
            type="email"
            value={form.email}
            onChange={(value) =>
              updateField("email", value)
            }
          />

          <FormField
            label="Phone"
            value={form.phone}
            onChange={(value) =>
              updateField("phone", value)
            }
          />

          <FormField
            label="Designation"
            value={form.designation}
            onChange={(value) =>
              updateField(
                "designation",
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

          <div className="sm:col-span-2">
            <FormField
              label="Qualification"
              value={form.qualification}
              onChange={(value) =>
                updateField(
                  "qualification",
                  value
                )
              }
            />
          </div>
        </div>

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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   FORM FIELD
========================================= */

function FormField({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-blue-500/50"
      />
    </label>
  );
}

export default TeacherDetails;
