import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_TEACHERS = [
  {
    id: "T001",
    employeeId: "FAC001",
    name: "Dr. Priya Sharma",
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
    email: "priya.sharma@college.edu",
    phone: "+91 98765 43210",
    subjects: [
      "Data Structures",
      "Algorithms",
      "Database Systems",
    ],
    classes: 4,
    attendance: 96,
    status: "Active",
  },
  {
    id: "T002",
    employeeId: "FAC002",
    name: "Dr. Rajesh Kumar",
    department: "Computer Science & Engineering",
    designation: "Professor",
    email: "rajesh.kumar@college.edu",
    phone: "+91 98765 43211",
    subjects: [
      "Operating Systems",
      "Computer Networks",
    ],
    classes: 3,
    attendance: 94,
    status: "Active",
  },
  {
    id: "T003",
    employeeId: "FAC003",
    name: "Prof. Ananya Patel",
    department: "Electronics & Communication",
    designation: "Assistant Professor",
    email: "ananya.patel@college.edu",
    phone: "+91 98765 43212",
    subjects: [
      "Digital Electronics",
      "Microprocessors",
    ],
    classes: 3,
    attendance: 91,
    status: "Active",
  },
  {
    id: "T004",
    employeeId: "FAC004",
    name: "Dr. Vikram Singh",
    department: "Mechanical Engineering",
    designation: "Professor",
    email: "vikram.singh@college.edu",
    phone: "+91 98765 43213",
    subjects: [
      "Thermodynamics",
      "Fluid Mechanics",
    ],
    classes: 2,
    attendance: 89,
    status: "Active",
  },
  {
    id: "T005",
    employeeId: "FAC005",
    name: "Prof. Neha Verma",
    department: "Information Technology",
    designation: "Assistant Professor",
    email: "neha.verma@college.edu",
    phone: "+91 98765 43214",
    subjects: [
      "Web Technologies",
      "Software Engineering",
    ],
    classes: 4,
    attendance: 97,
    status: "Active",
  },
  {
    id: "T006",
    employeeId: "FAC006",
    name: "Dr. Amit Joshi",
    department: "Civil Engineering",
    designation: "Associate Professor",
    email: "amit.joshi@college.edu",
    phone: "+91 98765 43215",
    subjects: [
      "Structural Engineering",
      "Construction Management",
    ],
    classes: 2,
    attendance: 86,
    status: "On Leave",
  },
];

function Teachers() {
  const navigate = useNavigate();

  const [teachers, setTeachers] =
    useState(INITIAL_TEACHERS);

  const [search, setSearch] =
    useState("");

  const [department, setDepartment] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [selectedTeacher, setSelectedTeacher] =
    useState(null);

  const [toast, setToast] =
    useState("");

  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    department:
      "Computer Science & Engineering",
    designation: "Assistant Professor",
    email: "",
    phone: "",
  });

  const departments = useMemo(
    () => [
      "All",
      ...new Set(
        teachers.map(
          (teacher) => teacher.department
        )
      ),
    ],
    [teachers]
  );

  const filteredTeachers = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return teachers.filter((teacher) => {
      const matchesSearch =
        !query ||
        teacher.name
          .toLowerCase()
          .includes(query) ||
        teacher.employeeId
          .toLowerCase()
          .includes(query) ||
        teacher.email
          .toLowerCase()
          .includes(query) ||
        teacher.department
          .toLowerCase()
          .includes(query) ||
        teacher.subjects.some((subject) =>
          subject
            .toLowerCase()
            .includes(query)
        );

      const matchesDepartment =
        department === "All" ||
        teacher.department === department;

      const matchesStatus =
        status === "All" ||
        teacher.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    teachers,
    search,
    department,
    status,
  ]);

  const totalTeachers = teachers.length;

  const activeTeachers = teachers.filter(
    (teacher) =>
      teacher.status === "Active"
  ).length;

  const averageAttendance =
    teachers.length > 0
      ? Math.round(
          teachers.reduce(
            (sum, teacher) =>
              sum + teacher.attendance,
            0
          ) / teachers.length
        )
      : 0;

  const totalClasses = teachers.reduce(
    (sum, teacher) =>
      sum + teacher.classes,
    0
  );

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const updateForm = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      employeeId: "",
      department:
        "Computer Science & Engineering",
      designation:
        "Assistant Professor",
      email: "",
      phone: "",
    });
  };

  const addTeacher = () => {
    if (
      !form.name.trim() ||
      !form.employeeId.trim() ||
      !form.email.trim()
    ) {
      showToast(
        "Please fill in the required fields."
      );
      return;
    }

    const newTeacher = {
      id: `T${String(
        teachers.length + 1
      ).padStart(3, "0")}`,
      employeeId:
        form.employeeId.trim(),
      name: form.name.trim(),
      department: form.department,
      designation: form.designation,
      email: form.email.trim(),
      phone: form.phone.trim(),
      subjects: [],
      classes: 0,
      attendance: 100,
      status: "Active",
    };

    setTeachers((previous) => [
      newTeacher,
      ...previous,
    ]);

    setShowAddModal(false);
    resetForm();
    showToast(
      "Teacher added successfully."
    );
  };

  const deleteTeacher = (teacher) => {
    const confirmed = window.confirm(
      `Delete ${teacher.name}?`
    );

    if (!confirmed) return;

    setTeachers((previous) =>
      previous.filter(
        (item) => item.id !== teacher.id
      )
    );

    showToast(
      "Teacher removed successfully."
    );
  };

  const toggleStatus = (teacher) => {
    setTeachers((previous) =>
      previous.map((item) =>
        item.id === teacher.id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "On Leave"
                  : "Active",
            }
          : item
      )
    );

    showToast(
      teacher.status === "Active"
        ? "Teacher marked as on leave."
        : "Teacher marked as active."
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast */}

      {toast && (
        <div className="fixed right-6 top-6 z-[100] rounded-xl border border-emerald-500/20 bg-slate-900 px-5 py-4 text-sm font-medium text-emerald-400 shadow-2xl">
          ✓ {toast}
        </div>
      )}

      {/* PAGE HEADER */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[10px] text-slate-600">
            Faculty Management / Teachers
          </p>

          <h1 className="mt-1 text-2xl font-bold text-white">
            Teachers
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Manage faculty profiles, teaching
            assignments and attendance.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowAddModal(true)
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-semibold text-white transition hover:bg-blue-500"
        >
          <span className="text-base">
            +
          </span>
          Add Teacher
        </button>
      </div>

      {/* STAT CARDS */}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Total Teachers"
          value={totalTeachers}
          icon="♙"
          color="blue"
        />

        <StatCard
          label="Active Faculty"
          value={activeTeachers}
          icon="✓"
          color="emerald"
        />

        <StatCard
          label="Avg. Attendance"
          value={`${averageAttendance}%`}
          icon="◔"
          color="purple"
        />

        <StatCard
          label="Teaching Classes"
          value={totalClasses}
          icon="▦"
          color="amber"
        />
      </div>

      {/* FILTER BAR */}

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px_160px_auto]">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-600">
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
              placeholder="Search teacher, ID, department or subject..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-9 pr-3 text-xs text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-blue-500/50"
            />
          </div>

          <select
            value={department}
            onChange={(event) =>
              setDepartment(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-xs text-slate-400 outline-none focus:border-blue-500/50"
          >
            {departments.map(
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
            className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-xs text-slate-400 outline-none focus:border-blue-500/50"
          >
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="On Leave">
              On Leave
            </option>
          </select>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setDepartment("All");
              setStatus("All");
            }}
            className="rounded-xl border border-slate-800 px-4 py-3 text-xs font-semibold text-slate-500 transition hover:bg-slate-800 hover:text-white"
          >
            Reset
          </button>
        </div>
      </section>

      {/* RESULTS */}

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-300">
            {filteredTeachers.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-300">
            {teachers.length}
          </span>{" "}
          teachers
        </p>

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-[10px] font-semibold text-blue-400 hover:text-blue-300"
          >
            Clear search
          </button>
        )}
      </div>

      {/* TEACHER TABLE */}

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        {filteredTeachers.length ===
        0 ? (
          <EmptyState
            onReset={() => {
              setSearch("");
              setDepartment("All");
              setStatus("All");
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-left">
                  <th className="px-5 py-4 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Teacher
                  </th>

                  <th className="px-5 py-4 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Department
                  </th>

                  <th className="px-5 py-4 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Subjects
                  </th>

                  <th className="px-5 py-4 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Classes
                  </th>

                  <th className="px-5 py-4 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Attendance
                  </th>

                  <th className="px-5 py-4 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {filteredTeachers.map(
                  (teacher) => (
                    <TeacherRow
                      key={teacher.id}
                      teacher={teacher}
                      onView={() =>
                        navigate(
                          `/teachers/${teacher.id}`
                        )
                      }
                      onStatus={() =>
                        toggleStatus(
                          teacher
                        )
                      }
                      onDelete={() =>
                        deleteTeacher(
                          teacher
                        )
                      }
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ADD TEACHER MODAL */}

      {showAddModal && (
        <Modal
          title="Add Teacher"
          subtitle="Create a new faculty profile"
          onClose={() =>
            setShowAddModal(false)
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Full Name *"
              value={form.name}
              placeholder="e.g. Dr. John Smith"
              onChange={(value) =>
                updateForm(
                  "name",
                  value
                )
              }
            />

            <FormField
              label="Employee ID *"
              value={form.employeeId}
              placeholder="e.g. FAC007"
              onChange={(value) =>
                updateForm(
                  "employeeId",
                  value
                )
              }
            />

            <FormField
              label="Email *"
              type="email"
              value={form.email}
              placeholder="teacher@college.edu"
              onChange={(value) =>
                updateForm(
                  "email",
                  value
                )
              }
            />

            <FormField
              label="Phone"
              value={form.phone}
              placeholder="+91 XXXXX XXXXX"
              onChange={(value) =>
                updateForm(
                  "phone",
                  value
                )
              }
            />

            <SelectField
              label="Department"
              value={form.department}
              options={departments.filter(
                (item) => item !== "All"
              )}
              onChange={(value) =>
                updateForm(
                  "department",
                  value
                )
              }
            />

            <SelectField
              label="Designation"
              value={form.designation}
              options={[
                "Professor",
                "Associate Professor",
                "Assistant Professor",
                "Lecturer",
                "Visiting Faculty",
              ]}
              onChange={(value) =>
                updateForm(
                  "designation",
                  value
                )
              }
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() =>
                setShowAddModal(false)
              }
              className="rounded-xl border border-slate-700 px-5 py-2.5 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={addTeacher}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Add Teacher
            </button>
          </div>
        </Modal>
      )}

      {/* QUICK VIEW MODAL */}

      {selectedTeacher && (
        <TeacherQuickView
          teacher={selectedTeacher}
          onClose={() =>
            setSelectedTeacher(null)
          }
          onView={() =>
            navigate(
              `/teachers/${selectedTeacher.id}`
            )
          }
        />
      )}
    </div>
  );
}

/* =========================================
   TEACHER ROW
========================================= */

function TeacherRow({
  teacher,
  onView,
  onStatus,
  onDelete,
}) {
  const initials = teacher.name
    .replace("Dr. ", "")
    .replace("Prof. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <tr className="group transition hover:bg-slate-800/20">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-[10px] font-bold text-blue-400">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-300">
              {teacher.name}
            </p>

            <p className="mt-1 text-[9px] text-slate-600">
              {teacher.employeeId}
            </p>

            <p className="mt-0.5 truncate text-[9px] text-slate-700">
              {teacher.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <p className="max-w-[180px] text-[10px] font-medium text-slate-400">
          {teacher.department}
        </p>

        <p className="mt-1 text-[9px] text-slate-700">
          {teacher.designation}
        </p>
      </td>

      <td className="px-5 py-4">
        <div className="flex max-w-[190px] flex-wrap gap-1.5">
          {teacher.subjects.length >
          0 ? (
            teacher.subjects
              .slice(0, 2)
              .map((subject) => (
                <span
                  key={subject}
                  className="rounded-md bg-slate-800 px-2 py-1 text-[8px] text-slate-500"
                >
                  {subject}
                </span>
              ))
          ) : (
            <span className="text-[9px] text-slate-700">
              No subjects
            </span>
          )}

          {teacher.subjects.length >
            2 && (
            <span className="rounded-md bg-blue-500/10 px-2 py-1 text-[8px] text-blue-400">
              +
              {teacher.subjects
                .length - 2}
            </span>
          )}
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="text-xs font-bold text-slate-300">
          {teacher.classes}
        </span>

        <p className="text-[8px] text-slate-700">
          weekly
        </p>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full ${
                teacher.attendance >=
                90
                  ? "bg-emerald-500"
                  : teacher.attendance >=
                    75
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${teacher.attendance}%`,
              }}
            />
          </div>

          <span className="text-[10px] font-bold text-slate-300">
            {teacher.attendance}%
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <button
          type="button"
          onClick={onStatus}
          className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${
            teacher.status ===
            "Active"
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-amber-500/10 text-amber-400"
          }`}
        >
          {teacher.status}
        </button>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-1.5">
          <button
            type="button"
            onClick={onView}
            title="View teacher"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-[11px] text-slate-500 transition hover:border-blue-500/30 hover:bg-blue-500/5 hover:text-blue-400"
          >
            ↗
          </button>

          <button
            type="button"
            onClick={onStatus}
            title="Change status"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-[11px] text-slate-500 transition hover:border-amber-500/30 hover:bg-amber-500/5 hover:text-amber-400"
          >
            ◷
          </button>

          <button
            type="button"
            onClick={onDelete}
            title="Delete teacher"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-[11px] text-slate-500 transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
          >
            ×
          </button>
        </div>
      </td>
    </tr>
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
    emerald: {
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/5",
      icon: "bg-emerald-500/10 text-emerald-400",
      value: "text-emerald-400",
    },
    purple: {
      border: "border-purple-500/20",
      bg: "bg-purple-500/5",
      icon: "bg-purple-500/10 text-purple-400",
      value: "text-purple-400",
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
   FORM FIELD
========================================= */

function FormField({
  label,
  value,
  onChange,
  placeholder,
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
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-xs text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-blue-500/50"
      />
    </label>
  );
}

/* =========================================
   SELECT FIELD
========================================= */

function SelectField({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-xs text-slate-400 outline-none focus:border-blue-500/50"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* =========================================
   MODAL
========================================= */

function Modal({
  title,
  subtitle,
  onClose,
  children,
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
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div>
            <h2 className="text-lg font-bold text-white">
              {title}
            </h2>

            <p className="mt-1 text-[10px] text-slate-600">
              {subtitle}
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

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================================
   TEACHER QUICK VIEW
========================================= */

function TeacherQuickView({
  teacher,
  onClose,
  onView,
}) {
  const initials = teacher.name
    .replace("Dr. ", "")
    .replace("Prof. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <h2 className="font-semibold text-white">
            Teacher Profile
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
              {initials}
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                {teacher.name}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {teacher.designation}
              </p>

              <span className="mt-2 inline-block rounded-full bg-emerald-500/10 px-2.5 py-1 text-[8px] font-semibold text-emerald-400">
                {teacher.status}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Detail
              label="Employee ID"
              value={teacher.employeeId}
            />

            <Detail
              label="Attendance"
              value={`${teacher.attendance}%`}
            />

            <Detail
              label="Classes"
              value={teacher.classes}
            />

            <Detail
              label="Department"
              value={teacher.department}
            />
          </div>

          <div className="mt-4">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-700">
              Subjects
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {teacher.subjects.length >
              0 ? (
                teacher.subjects.map(
                  (subject) => (
                    <span
                      key={subject}
                      className="rounded-lg bg-blue-500/10 px-3 py-2 text-[9px] text-blue-400"
                    >
                      {subject}
                    </span>
                  )
                )
              ) : (
                <span className="text-[10px] text-slate-700">
                  No subjects assigned.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-800 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2.5 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onView}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Full Details
          </button>
        </div>
      </div>
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
    <div className="rounded-xl bg-slate-950/50 p-3">
      <p className="text-[8px] uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p className="mt-1 break-words text-[10px] font-semibold text-slate-400">
        {value}
      </p>
    </div>
  );
}

/* =========================================
   EMPTY STATE
========================================= */

function EmptyState({
  onReset,
}) {
  return (
    <div className="p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-xl text-slate-600">
        ⌕
      </div>

      <h3 className="mt-4 text-sm font-semibold text-white">
        No teachers found
      </h3>

      <p className="mt-1 text-xs text-slate-600">
        Try changing your search or filters.
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

export default Teachers;
