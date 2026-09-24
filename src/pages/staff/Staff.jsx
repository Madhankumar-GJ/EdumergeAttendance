import React, { useMemo, useState } from "react";

const INITIAL_STAFF = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Dr. Rajesh Kumar",
    department: "Computer Science",
    designation: "Professor",
    email: "rajesh.kumar@college.edu",
    phone: "+91 98765 43210",
    status: "Active",
    attendance: 94,
    subjects: ["Data Structures", "Algorithms"],
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Dr. Priya Sharma",
    department: "Electronics",
    designation: "Associate Professor",
    email: "priya.sharma@college.edu",
    phone: "+91 98765 43211",
    status: "Active",
    attendance: 91,
    subjects: ["Digital Electronics", "Microprocessors"],
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Prof. Amit Verma",
    department: "Mechanical",
    designation: "Assistant Professor",
    email: "amit.verma@college.edu",
    phone: "+91 98765 43212",
    status: "Active",
    attendance: 88,
    subjects: ["Thermodynamics", "Machine Design"],
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Dr. Sneha Reddy",
    department: "Information Technology",
    designation: "Professor",
    email: "sneha.reddy@college.edu",
    phone: "+91 98765 43213",
    status: "On Leave",
    attendance: 79,
    subjects: ["Database Systems", "Web Technologies"],
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "Prof. Vikram Singh",
    department: "Electrical",
    designation: "Assistant Professor",
    email: "vikram.singh@college.edu",
    phone: "+91 98765 43214",
    status: "Active",
    attendance: 96,
    subjects: ["Power Systems", "Electrical Machines"],
  },
  {
    id: 6,
    employeeId: "EMP006",
    name: "Dr. Ananya Menon",
    department: "Computer Science",
    designation: "Associate Professor",
    email: "ananya.menon@college.edu",
    phone: "+91 98765 43215",
    status: "Active",
    attendance: 93,
    subjects: ["Operating Systems", "Computer Networks"],
  },
  {
    id: 7,
    employeeId: "EMP007",
    name: "Prof. Karan Patel",
    department: "Civil",
    designation: "Assistant Professor",
    email: "karan.patel@college.edu",
    phone: "+91 98765 43216",
    status: "Inactive",
    attendance: 72,
    subjects: ["Structural Engineering"],
  },
];

const DEPARTMENTS = [
  "All Departments",
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Electrical",
  "Civil",
];

const DESIGNATIONS = [
  "All Designations",
  "Professor",
  "Associate Professor",
  "Assistant Professor",
];

function Staff() {
  const [staff, setStaff] = useState(INITIAL_STAFF);

  const [search, setSearch] = useState("");

  const [department, setDepartment] =
    useState("All Departments");

  const [designation, setDesignation] =
    useState("All Designations");

  const [status, setStatus] =
    useState("All");

  const [showModal, setShowModal] =
    useState(false);

  const [selectedStaff, setSelectedStaff] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    department: "Computer Science",
    designation: "Assistant Professor",
    email: "",
    phone: "",
    status: "Active",
    subjects: "",
  });

  const filteredStaff = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return staff.filter((member) => {
      const matchesSearch =
        !query ||
        member.name
          .toLowerCase()
          .includes(query) ||
        member.employeeId
          .toLowerCase()
          .includes(query) ||
        member.email
          .toLowerCase()
          .includes(query);

      const matchesDepartment =
        department ===
          "All Departments" ||
        member.department === department;

      const matchesDesignation =
        designation ===
          "All Designations" ||
        member.designation === designation;

      const matchesStatus =
        status === "All" ||
        member.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesDesignation &&
        matchesStatus
      );
    });
  }, [
    staff,
    search,
    department,
    designation,
    status,
  ]);

  const statistics = useMemo(() => {
    const active = staff.filter(
      (member) =>
        member.status === "Active"
    ).length;

    const onLeave = staff.filter(
      (member) =>
        member.status === "On Leave"
    ).length;

    const inactive = staff.filter(
      (member) =>
        member.status === "Inactive"
    ).length;

    const averageAttendance =
      staff.length
        ? Math.round(
            staff.reduce(
              (sum, member) =>
                sum + member.attendance,
              0
            ) / staff.length
          )
        : 0;

    return {
      total: staff.length,
      active,
      onLeave,
      inactive,
      averageAttendance,
    };
  }, [staff]);

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
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

  const openAddModal = () => {
    setSelectedStaff(null);

    setForm({
      name: "",
      employeeId: "",
      department: "Computer Science",
      designation:
        "Assistant Professor",
      email: "",
      phone: "",
      status: "Active",
      subjects: "",
    });

    setShowModal(true);
  };

  const openEditModal = (member) => {
    setSelectedStaff(member);

    setForm({
      name: member.name,
      employeeId: member.employeeId,
      department: member.department,
      designation: member.designation,
      email: member.email,
      phone: member.phone,
      status: member.status,
      subjects:
        member.subjects.join(", "),
    });

    setShowModal(true);
  };

  const saveStaff = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.employeeId.trim() ||
      !form.email.trim()
    ) {
      showToast(
        "Please fill all required fields."
      );
      return;
    }

    const subjects = form.subjects
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (selectedStaff) {
      setStaff((previous) =>
        previous.map((member) =>
          member.id === selectedStaff.id
            ? {
                ...member,
                ...form,
                subjects,
              }
            : member
        )
      );

      showToast(
        "Staff member updated successfully."
      );
    } else {
      const newMember = {
        id: Date.now(),
        ...form,
        subjects,
        attendance: 0,
      };

      setStaff((previous) => [
        newMember,
        ...previous,
      ]);

      showToast(
        "Staff member added successfully."
      );
    }

    setShowModal(false);
    setSelectedStaff(null);
  };

  const deleteStaff = (member) => {
    const confirmed =
      window.confirm(
        `Delete ${member.name}?`
      );

    if (!confirmed) {
      return;
    }

    setStaff((previous) =>
      previous.filter(
        (item) =>
          item.id !== member.id
      )
    );

    showToast(
      "Staff member removed."
    );
  };

  const clearFilters = () => {
    setSearch("");
    setDepartment(
      "All Departments"
    );
    setDesignation(
      "All Designations"
    );
    setStatus("All");
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
          <p className="text-sm text-slate-500">
            Administration / Staff
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Staff Management
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage teaching and academic
            staff, assignments, attendance
            and employment status.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
        >
          + Add Staff
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard
          label="Total Staff"
          value={statistics.total}
          icon="👥"
          color="blue"
        />

        <StatCard
          label="Active"
          value={statistics.active}
          icon="✓"
          color="emerald"
        />

        <StatCard
          label="On Leave"
          value={statistics.onLeave}
          icon="◷"
          color="amber"
        />

        <StatCard
          label="Inactive"
          value={statistics.inactive}
          icon="!"
          color="red"
        />

        <StatCard
          label="Avg. Attendance"
          value={`${statistics.averageAttendance}%`}
          icon="◔"
          color="purple"
        />
      </div>

      {/* FILTERS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_210px_210px_160px_auto]">
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
              placeholder="Search name, employee ID or email..."
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
            value={designation}
            onChange={(event) =>
              setDesignation(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-400 outline-none focus:border-blue-500"
          >
            {DESIGNATIONS.map(
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

            <option value="Active">
              Active
            </option>

            <option value="On Leave">
              On Leave
            </option>

            <option value="Inactive">
              Inactive
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

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div>
            <h2 className="font-semibold text-white">
              Staff Directory
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              {filteredStaff.length} staff
              member
              {filteredStaff.length !==
              1
                ? "s"
                : ""}{" "}
              displayed
            </p>
          </div>
        </div>

        {filteredStaff.length ===
        0 ? (
          <div className="px-6 py-16 text-center">
            <div className="text-5xl">
              👥
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              No staff found
            </h3>

            <p className="mt-2 text-xs text-slate-600">
              Try changing your filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/30">
                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Staff
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Department
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Designation
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Subjects
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Attendance
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
                {filteredStaff.map(
                  (member) => (
                    <StaffRow
                      key={member.id}
                      member={member}
                      onView={() => {
                        setSelectedStaff(
                          member
                        );
                        setShowDetails(
                          true
                        );
                      }}
                      onEdit={() =>
                        openEditModal(
                          member
                        )
                      }
                      onDelete={() =>
                        deleteStaff(
                          member
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

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <StaffFormModal
          editing={Boolean(
            selectedStaff
          )}
          form={form}
          updateForm={updateForm}
          onClose={() => {
            setShowModal(false);
            setSelectedStaff(null);
          }}
          onSubmit={saveStaff}
        />
      )}

      {/* DETAILS MODAL */}
      {showDetails &&
        selectedStaff && (
          <StaffDetailsModal
            member={selectedStaff}
            onClose={() => {
              setShowDetails(false);
              setSelectedStaff(null);
            }}
            onEdit={() => {
              setShowDetails(false);
              openEditModal(
                selectedStaff
              );
            }}
          />
        )}
    </div>
  );
}

/* =========================================
   STAFF TABLE ROW
========================================= */

function StaffRow({
  member,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b border-slate-800/70 transition hover:bg-slate-800/20">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-xs font-bold text-blue-400">
            {getInitials(
              member.name
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={onView}
              className="text-sm font-semibold text-white transition hover:text-blue-400"
            >
              {member.name}
            </button>

            <p className="mt-1 text-[11px] text-slate-600">
              {member.employeeId}
            </p>

            <p className="mt-1 text-[10px] text-slate-700">
              {member.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="text-xs text-slate-400">
          {member.department}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className="text-xs text-slate-400">
          {member.designation}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex max-w-[220px] flex-wrap gap-1.5">
          {member.subjects
            .slice(0, 2)
            .map((subject) => (
              <span
                key={subject}
                className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] text-slate-500"
              >
                {subject}
              </span>
            ))}

          {member.subjects.length >
            2 && (
            <span className="rounded-md bg-slate-800 px-2 py-1 text-[10px] text-slate-600">
              +
              {member.subjects.length -
                2}
            </span>
          )}
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full ${
                member.attendance >=
                85
                  ? "bg-emerald-500"
                  : member.attendance >=
                    75
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${member.attendance}%`,
              }}
            />
          </div>

          <span className="text-xs font-semibold text-slate-400">
            {member.attendance}%
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <StatusBadge
          status={member.status}
        />
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onView}
            className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            View
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg border border-blue-500/20 px-3 py-2 text-xs text-blue-400 hover:bg-blue-500/10"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

/* =========================================
   ADD / EDIT MODAL
========================================= */

function StaffFormModal({
  editing,
  form,
  updateForm,
  onClose,
  onSubmit,
}) {
  return (
    <ModalOverlay onClose={onClose}>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div>
            <p className="text-xs text-blue-400">
              Staff Management
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              {editing
                ? "Edit Staff Member"
                : "Add Staff Member"}
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
          <FormField
            label="Full Name"
            required
          >
            <input
              value={form.name}
              onChange={(event) =>
                updateForm(
                  "name",
                  event.target.value
                )
              }
              placeholder="Enter full name"
              className={inputClass}
            />
          </FormField>

          <FormField
            label="Employee ID"
            required
          >
            <input
              value={form.employeeId}
              onChange={(event) =>
                updateForm(
                  "employeeId",
                  event.target.value
                )
              }
              placeholder="EMP001"
              className={inputClass}
            />
          </FormField>

          <FormField label="Department">
            <select
              value={form.department}
              onChange={(event) =>
                updateForm(
                  "department",
                  event.target.value
                )
              }
              className={inputClass}
            >
              {DEPARTMENTS.filter(
                (item) =>
                  item !==
                  "All Departments"
              ).map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Designation">
            <select
              value={
                form.designation
              }
              onChange={(event) =>
                updateForm(
                  "designation",
                  event.target.value
                )
              }
              className={inputClass}
            >
              {DESIGNATIONS.filter(
                (item) =>
                  item !==
                  "All Designations"
              ).map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            label="Email"
            required
          >
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                updateForm(
                  "email",
                  event.target.value
                )
              }
              placeholder="staff@college.edu"
              className={inputClass}
            />
          </FormField>

          <FormField label="Phone">
            <input
              value={form.phone}
              onChange={(event) =>
                updateForm(
                  "phone",
                  event.target.value
                )
              }
              placeholder="+91 XXXXX XXXXX"
              className={inputClass}
            />
          </FormField>

          <FormField label="Employment Status">
            <select
              value={form.status}
              onChange={(event) =>
                updateForm(
                  "status",
                  event.target.value
                )
              }
              className={inputClass}
            >
              <option value="Active">
                Active
              </option>

              <option value="On Leave">
                On Leave
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </FormField>

          <FormField
            label="Subjects"
            hint="Separate multiple subjects with commas"
          >
            <input
              value={form.subjects}
              onChange={(event) =>
                updateForm(
                  "subjects",
                  event.target.value
                )
              }
              placeholder="Data Structures, Algorithms"
              className={inputClass}
            />
          </FormField>
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
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            {editing
              ? "Save Changes"
              : "Add Staff"}
          </button>
        </div>
      </form>
    </ModalOverlay>
  );
}

/* =========================================
   DETAILS MODAL
========================================= */

function StaffDetailsModal({
  member,
  onClose,
  onEdit,
}) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="border-b border-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-sm font-bold text-blue-400">
                {getInitials(
                  member.name
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  {member.name}
                </h2>

                <p className="mt-1 text-xs text-slate-600">
                  {member.employeeId}
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
          <div className="grid grid-cols-2 gap-3">
            <Detail
              label="Department"
              value={
                member.department
              }
            />

            <Detail
              label="Designation"
              value={
                member.designation
              }
            />

            <Detail
              label="Employee ID"
              value={
                member.employeeId
              }
            />

            <Detail
              label="Status"
              value={
                member.status
              }
            />

            <Detail
              label="Email"
              value={member.email}
            />

            <Detail
              label="Phone"
              value={member.phone}
            />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600">
                  Attendance
                </p>

                <p className="mt-1 text-2xl font-bold text-white">
                  {member.attendance}%
                </p>
              </div>

              <div
                className={`text-2xl ${
                  member.attendance >=
                  85
                    ? "text-emerald-400"
                    : member.attendance >=
                      75
                    ? "text-amber-400"
                    : "text-red-400"
                }`}
              >
                ◔
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${
                  member.attendance >=
                  85
                    ? "bg-emerald-500"
                    : member.attendance >=
                      75
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${member.attendance}%`,
                }}
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500">
              Assigned Subjects
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {member.subjects.map(
                (subject) => (
                  <span
                    key={subject}
                    className="rounded-lg border border-blue-500/10 bg-blue-500/5 px-3 py-2 text-xs text-blue-400"
                  >
                    {subject}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-800 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2.5 text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Edit Staff
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* =========================================
   HELPERS / COMMON COMPONENTS
========================================= */

const inputClass =
  "w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function FormField({
  label,
  required = false,
  hint,
  children,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-500">
        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}
      </label>

      {children}

      {hint && (
        <p className="mt-1.5 text-[10px] text-slate-700">
          {hint}
        </p>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800/20 p-4">
      <p className="text-[10px] uppercase tracking-wide text-slate-700">
        {label}
      </p>

      <p className="mt-1 break-words text-xs font-medium text-slate-400">
        {value || "—"}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}) {
  const styles = {
    Active:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    "On Leave":
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
    Inactive:
      "border-red-500/20 bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold ${
        styles[status] ||
        styles.Active
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}) {
  const colors = {
    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
    red:
      "border-red-500/20 bg-red-500/10 text-red-400",
    purple:
      "border-purple-500/20 bg-purple-500/10 text-purple-400",
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

export default Staff;
