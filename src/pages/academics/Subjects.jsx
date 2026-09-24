import React, { useMemo, useState } from "react";

const INITIAL_SUBJECTS = [
  {
    id: "SUB001",
    code: "CS301",
    name: "Data Structures",
    department: "Computer Science & Engineering",
    semester: "6",
    credits: 4,
    type: "Core",
    teacher: "Dr. Priya Sharma",
    hours: 4,
    status: "Active",
  },
  {
    id: "SUB002",
    code: "CS302",
    name: "Algorithms",
    department: "Computer Science & Engineering",
    semester: "6",
    credits: 4,
    type: "Core",
    teacher: "Prof. Raj Kumar",
    hours: 4,
    status: "Active",
  },
  {
    id: "SUB003",
    code: "CS303",
    name: "Database Systems",
    department: "Computer Science & Engineering",
    semester: "6",
    credits: 4,
    type: "Core",
    teacher: "Dr. Anil Verma",
    hours: 4,
    status: "Active",
  },
  {
    id: "SUB004",
    code: "CS304",
    name: "Operating Systems",
    department: "Computer Science & Engineering",
    semester: "6",
    credits: 4,
    type: "Core",
    teacher: "Prof. Sneha Rao",
    hours: 4,
    status: "Active",
  },
  {
    id: "SUB005",
    code: "CS305",
    name: "Computer Networks",
    department: "Computer Science & Engineering",
    semester: "6",
    credits: 3,
    type: "Core",
    teacher: "Dr. Vikram Singh",
    hours: 3,
    status: "Active",
  },
  {
    id: "SUB006",
    code: "CS306",
    name: "Web Technologies",
    department: "Computer Science & Engineering",
    semester: "6",
    credits: 3,
    type: "Elective",
    teacher: "Prof. Neha Kapoor",
    hours: 3,
    status: "Active",
  },
  {
    id: "SUB007",
    code: "ME201",
    name: "Engineering Mechanics",
    department: "Mechanical Engineering",
    semester: "4",
    credits: 4,
    type: "Core",
    teacher: "Dr. Arun Rao",
    hours: 4,
    status: "Active",
  },
  {
    id: "SUB008",
    code: "EC201",
    name: "Digital Electronics",
    department: "Electronics & Communication",
    semester: "4",
    credits: 4,
    type: "Core",
    teacher: "Dr. Kavita Nair",
    hours: 4,
    status: "Active",
  },
];

const EMPTY_FORM = {
  code: "",
  name: "",
  department: "Computer Science & Engineering",
  semester: "6",
  credits: 4,
  type: "Core",
  teacher: "",
  hours: 4,
  status: "Active",
};

function Subjects() {
  const [subjects, setSubjects] =
    useState(INITIAL_SUBJECTS);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");
  const [semesterFilter, setSemesterFilter] =
    useState("All");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showModal, setShowModal] =
    useState(false);

  const [editingSubject, setEditingSubject] =
    useState(null);

  const [selectedSubject, setSelectedSubject] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [form, setForm] =
    useState(EMPTY_FORM);

  const [toast, setToast] =
    useState("");

  const filteredSubjects = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return subjects.filter((subject) => {
      const matchesSearch =
        !query ||
        subject.code
          .toLowerCase()
          .includes(query) ||
        subject.name
          .toLowerCase()
          .includes(query) ||
        subject.teacher
          .toLowerCase()
          .includes(query);

      const matchesDepartment =
        departmentFilter === "All" ||
        subject.department ===
          departmentFilter;

      const matchesSemester =
        semesterFilter === "All" ||
        subject.semester ===
          semesterFilter;

      const matchesStatus =
        statusFilter === "All" ||
        subject.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesSemester &&
        matchesStatus
      );
    });
  }, [
    subjects,
    search,
    departmentFilter,
    semesterFilter,
    statusFilter,
  ]);

  const stats = useMemo(() => {
    const active = subjects.filter(
      (subject) =>
        subject.status === "Active"
    ).length;

    const core = subjects.filter(
      (subject) =>
        subject.type === "Core"
    ).length;

    const electives = subjects.filter(
      (subject) =>
        subject.type === "Elective"
    ).length;

    const credits = subjects.reduce(
      (sum, subject) =>
        sum + Number(subject.credits),
      0
    );

    return {
      total: subjects.length,
      active,
      core,
      electives,
      credits,
    };
  }, [subjects]);

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const openAddModal = () => {
    setEditingSubject(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);

    setForm({
      code: subject.code,
      name: subject.name,
      department: subject.department,
      semester: subject.semester,
      credits: subject.credits,
      type: subject.type,
      teacher: subject.teacher,
      hours: subject.hours,
      status: subject.status,
    });

    setShowModal(true);
  };

  const handleFormChange = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (
      !form.code.trim() ||
      !form.name.trim() ||
      !form.teacher.trim()
    ) {
      showToast(
        "Please fill all required fields."
      );
      return;
    }

    if (editingSubject) {
      setSubjects((previous) =>
        previous.map((subject) =>
          subject.id ===
          editingSubject.id
            ? {
                ...subject,
                ...form,
                credits: Number(
                  form.credits
                ),
                hours: Number(
                  form.hours
                ),
              }
            : subject
        )
      );

      showToast(
        "Subject updated successfully."
      );
    } else {
      const newSubject = {
        id: `SUB${String(
          subjects.length + 1
        ).padStart(3, "0")}`,
        ...form,
        credits: Number(
          form.credits
        ),
        hours: Number(form.hours),
      };

      setSubjects((previous) => [
        ...previous,
        newSubject,
      ]);

      showToast(
        "Subject added successfully."
      );
    }

    setShowModal(false);
  };

  const handleDelete = (subject) => {
    const confirmed =
      window.confirm(
        `Delete ${subject.name} (${subject.code})?`
      );

    if (!confirmed) return;

    setSubjects((previous) =>
      previous.filter(
        (item) =>
          item.id !== subject.id
      )
    );

    showToast(
      "Subject deleted successfully."
    );
  };

  const toggleStatus = (subject) => {
    const nextStatus =
      subject.status === "Active"
        ? "Inactive"
        : "Active";

    setSubjects((previous) =>
      previous.map((item) =>
        item.id === subject.id
          ? {
              ...item,
              status: nextStatus,
            }
          : item
      )
    );

    showToast(
      `${subject.name} is now ${nextStatus.toLowerCase()}.`
    );
  };

  const resetFilters = () => {
    setSearch("");
    setDepartmentFilter("All");
    setSemesterFilter("All");
    setStatusFilter("All");
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
            Academics / Subjects
          </p>

          <h1 className="mt-1 text-2xl font-bold text-white">
            Subjects
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Manage subjects, credits, teachers and
            timetable requirements.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              showToast(
                "Subject data refreshed."
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ↻ Refresh
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"
          >
            + Add Subject
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
        <StatCard
          label="Total Subjects"
          value={stats.total}
          icon="▦"
          color="blue"
        />

        <StatCard
          label="Active"
          value={stats.active}
          icon="✓"
          color="emerald"
        />

        <StatCard
          label="Core"
          value={stats.core}
          icon="◆"
          color="purple"
        />

        <StatCard
          label="Electives"
          value={stats.electives}
          icon="◇"
          color="amber"
        />

        <StatCard
          label="Total Credits"
          value={stats.credits}
          icon="★"
          color="pink"
        />
      </div>

      {/* FILTERS */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex flex-col gap-4 p-5 xl:flex-row xl:items-end">
          <div className="min-w-0 flex-1">
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              Search
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                ⌕
              </span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search code, subject or teacher..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 text-xs text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-blue-500"
              />
            </div>
          </div>

          <FilterSelect
            label="Department"
            value={departmentFilter}
            onChange={
              setDepartmentFilter
            }
            options={[
              "All",
              "Computer Science & Engineering",
              "Mechanical Engineering",
              "Electronics & Communication",
            ]}
          />

          <FilterSelect
            label="Semester"
            value={semesterFilter}
            onChange={setSemesterFilter}
            options={[
              "All",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
            ]}
          />

          <FilterSelect
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              "All",
              "Active",
              "Inactive",
            ]}
          />

          <button
            type="button"
            onClick={resetFilters}
            className="rounded-xl border border-slate-800 px-4 py-3 text-xs font-medium text-slate-500 transition hover:bg-slate-800 hover:text-white"
          >
            Clear
          </button>
        </div>
      </section>

      {/* TABLE */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex flex-col gap-2 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-white">
              Subject Directory
            </h2>

            <p className="mt-1 text-[10px] text-slate-600">
              Showing{" "}
              {filteredSubjects.length}{" "}
              of {subjects.length} subjects
            </p>
          </div>

          <div className="rounded-lg bg-slate-950 px-3 py-2 text-[10px] text-slate-600">
            {filteredSubjects.length} results
          </div>
        </div>

        {filteredSubjects.length === 0 ? (
          <EmptyState
            onReset={resetFilters}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-5 py-4 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Subject
                  </th>

                  <th className="px-5 py-4 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Department
                  </th>

                  <th className="px-5 py-4 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Semester
                  </th>

                  <th className="px-5 py-4 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Teacher
                  </th>

                  <th className="px-5 py-4 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Credits
                  </th>

                  <th className="px-5 py-4 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                    Type
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
                {filteredSubjects.map(
                  (subject) => (
                    <tr
                      key={subject.id}
                      className="transition hover:bg-slate-800/20"
                    >
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSubject(
                              subject
                            );
                            setShowDetails(
                              true
                            );
                          }}
                          className="text-left"
                        >
                          <p className="text-xs font-semibold text-slate-300 hover:text-blue-400">
                            {subject.name}
                          </p>

                          <p className="mt-1 text-[9px] font-medium text-blue-400">
                            {subject.code}
                          </p>
                        </button>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-[10px] text-slate-500">
                          {shortDepartment(
                            subject.department
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-[9px] font-semibold text-slate-400">
                          Sem{" "}
                          {subject.semester}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-xs text-slate-400">
                          {subject.teacher}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-xs font-semibold text-white">
                          {subject.credits}
                        </span>

                        <span className="ml-1 text-[9px] text-slate-700">
                          credits
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <TypeBadge
                          type={
                            subject.type
                          }
                        />
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            toggleStatus(
                              subject
                            )
                          }
                          className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                            subject.status ===
                            "Active"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-slate-800 text-slate-500"
                          }`}
                        >
                          {subject.status}
                        </button>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1">
                          <ActionButton
                            label="View"
                            onClick={() => {
                              setSelectedSubject(
                                subject
                              );
                              setShowDetails(
                                true
                              );
                            }}
                          />

                          <ActionButton
                            label="Edit"
                            onClick={() =>
                              openEditModal(
                                subject
                              )
                            }
                          />

                          <ActionButton
                            label="Delete"
                            danger
                            onClick={() =>
                              handleDelete(
                                subject
                              )
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <SubjectModal
          form={form}
          editingSubject={
            editingSubject
          }
          onChange={handleFormChange}
          onClose={() =>
            setShowModal(false)
          }
          onSave={handleSave}
        />
      )}

      {/* DETAILS MODAL */}
      {showDetails &&
        selectedSubject && (
          <SubjectDetailsModal
            subject={selectedSubject}
            onClose={() =>
              setShowDetails(false)
            }
            onEdit={() => {
              setShowDetails(false);
              openEditModal(
                selectedSubject
              );
            }}
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
      border:
        "border-blue-500/20",
      bg: "bg-blue-500/5",
      icon: "bg-blue-500/10 text-blue-400",
      value: "text-blue-400",
    },
    emerald: {
      border:
        "border-emerald-500/20",
      bg: "bg-emerald-500/5",
      icon: "bg-emerald-500/10 text-emerald-400",
      value: "text-emerald-400",
    },
    purple: {
      border:
        "border-purple-500/20",
      bg: "bg-purple-500/5",
      icon: "bg-purple-500/10 text-purple-400",
      value: "text-purple-400",
    },
    amber: {
      border:
        "border-amber-500/20",
      bg: "bg-amber-500/5",
      icon: "bg-amber-500/10 text-amber-400",
      value: "text-amber-400",
    },
    pink: {
      border:
        "border-pink-500/20",
      bg: "bg-pink-500/5",
      icon: "bg-pink-500/10 text-pink-400",
      value: "text-pink-400",
    },
  };

  const style = styles[color];

  return (
    <div
      className={`rounded-2xl border ${style.border} ${style.bg} p-4`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-600">
          {label}
        </p>

        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${style.icon}`}
        >
          {icon}
        </span>
      </div>

      <p
        className={`mt-3 text-2xl font-bold ${style.value}`}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================
   FILTER
========================================= */

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div className="w-full xl:w-52">
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-slate-400 outline-none transition focus:border-blue-500"
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
    </div>
  );
}

/* =========================================
   TYPE BADGE
========================================= */

function TypeBadge({ type }) {
  const isCore = type === "Core";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
        isCore
          ? "bg-blue-500/10 text-blue-400"
          : "bg-purple-500/10 text-purple-400"
      }`}
    >
      {type}
    </span>
  );
}

/* =========================================
   ACTION BUTTON
========================================= */

function ActionButton({
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1.5 text-[9px] font-semibold transition ${
        danger
          ? "border-red-500/10 text-red-400 hover:bg-red-500/10"
          : "border-slate-800 text-slate-500 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

/* =========================================
   EMPTY STATE
========================================= */

function EmptyState({
  onReset,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-xl text-slate-600">
        ⌕
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-300">
        No subjects found
      </h3>

      <p className="mt-1 max-w-sm text-xs text-slate-600">
        Try changing your search or filters.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
      >
        Clear Filters
      </button>
    </div>
  );
}

/* =========================================
   SUBJECT MODAL
========================================= */

function SubjectModal({
  form,
  editingSubject,
  onChange,
  onClose,
  onSave,
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
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 p-6">
          <div>
            <p className="text-xs text-blue-400">
              Academic Management
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              {editingSubject
                ? "Edit Subject"
                : "Add Subject"}
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

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
          <FormInput
            label="Subject Code"
            required
            value={form.code}
            placeholder="e.g. CS301"
            onChange={(value) =>
              onChange(
                "code",
                value.toUpperCase()
              )
            }
          />

          <FormInput
            label="Subject Name"
            required
            value={form.name}
            placeholder="e.g. Data Structures"
            onChange={(value) =>
              onChange("name", value)
            }
          />

          <FormSelect
            label="Department"
            value={form.department}
            onChange={(value) =>
              onChange(
                "department",
                value
              )
            }
            options={[
              "Computer Science & Engineering",
              "Mechanical Engineering",
              "Electronics & Communication",
            ]}
          />

          <FormSelect
            label="Semester"
            value={form.semester}
            onChange={(value) =>
              onChange(
                "semester",
                value
              )
            }
            options={[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
            ]}
          />

          <FormInput
            label="Credits"
            type="number"
            value={form.credits}
            onChange={(value) =>
              onChange(
                "credits",
                value
              )
            }
          />

          <FormInput
            label="Weekly Hours"
            type="number"
            value={form.hours}
            onChange={(value) =>
              onChange(
                "hours",
                value
              )
            }
          />

          <FormSelect
            label="Subject Type"
            value={form.type}
            onChange={(value) =>
              onChange(
                "type",
                value
              )
            }
            options={[
              "Core",
              "Elective",
              "Lab",
              "Practical",
              "Project",
            ]}
          />

          <FormSelect
            label="Status"
            value={form.status}
            onChange={(value) =>
              onChange(
                "status",
                value
              )
            }
            options={[
              "Active",
              "Inactive",
            ]}
          />

          <div className="md:col-span-2">
            <FormInput
              label="Assigned Teacher"
              required
              value={form.teacher}
              placeholder="e.g. Dr. Priya Sharma"
              onChange={(value) =>
                onChange(
                  "teacher",
                  value
                )
              }
            />
          </div>

          {/* TIMETABLE CONFIGURATION */}
          <div className="rounded-xl border border-blue-500/10 bg-blue-500/5 p-4 md:col-span-2">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                ⏱
              </div>

              <div>
                <h3 className="text-xs font-semibold text-blue-300">
                  Timetable Integration
                </h3>

                <p className="mt-1 text-[10px] leading-5 text-slate-600">
                  Weekly hours will be used by the
                  timetable generator when creating
                  conflict-free schedules.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-800 bg-slate-900 p-5">
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
            {editingSubject
              ? "Save Changes"
              : "Create Subject"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   FORM INPUT
========================================= */

function FormInput({
  label,
  required = false,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-slate-600">
        {label}{" "}
        {required && (
          <span className="text-red-400">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        min={
          type === "number"
            ? 1
            : undefined
        }
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-blue-500"
      />
    </div>
  );
}

/* =========================================
   FORM SELECT
========================================= */

function FormSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-slate-300 outline-none transition focus:border-blue-500"
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
    </div>
  );
}

/* =========================================
   DETAILS MODAL
========================================= */

function SubjectDetailsModal({
  subject,
  onClose,
  onEdit,
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
        <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-transparent p-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="rounded-lg bg-blue-500/10 px-2.5 py-1 text-[9px] font-bold text-blue-400">
                {subject.code}
              </span>

              <h2 className="mt-3 text-2xl font-bold text-white">
                {subject.name}
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                {subject.department}
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

        <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-4">
          <DetailBox
            label="Semester"
            value={subject.semester}
          />

          <DetailBox
            label="Credits"
            value={subject.credits}
          />

          <DetailBox
            label="Weekly Hours"
            value={subject.hours}
          />

          <DetailBox
            label="Type"
            value={subject.type}
          />
        </div>

        <div className="space-y-3 px-6 pb-6">
          <InfoLine
            label="Assigned Teacher"
            value={subject.teacher}
          />

          <InfoLine
            label="Subject ID"
            value={subject.id}
          />

          <InfoLine
            label="Status"
            value={subject.status}
          />
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
            onClick={onEdit}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Edit Subject
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   DETAIL HELPERS
========================================= */

function DetailBox({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
      <p className="text-[9px] uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function InfoLine({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3">
      <span className="text-[10px] uppercase tracking-wider text-slate-700">
        {label}
      </span>

      <span className="text-xs font-medium text-slate-300">
        {value}
      </span>
    </div>
  );
}

function shortDepartment(
  department
) {
  const replacements = {
    "Computer Science & Engineering":
      "Computer Science",
    "Mechanical Engineering":
      "Mechanical",
    "Electronics & Communication":
      "Electronics & Communication",
  };

  return (
    replacements[department] ||
    department
  );
}

export default Subjects;
