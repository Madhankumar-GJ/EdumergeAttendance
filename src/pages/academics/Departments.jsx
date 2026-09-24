import React, { useMemo, useState } from "react";

const initialDepartments = [
  {
    id: 1,
    code: "CSE",
    name: "Computer Science & Engineering",
    shortName: "Computer Science",
    hod: "Dr. Ananya Sharma",
    email: "cse@college.edu",
    phone: "+91 98765 43210",
    faculty: 24,
    students: 480,
    courses: 18,
    status: "Active",
  },
  {
    id: 2,
    code: "IT",
    name: "Information Technology",
    shortName: "Information Technology",
    hod: "Dr. Priya Nair",
    email: "it@college.edu",
    phone: "+91 98765 43211",
    faculty: 18,
    students: 360,
    courses: 14,
    status: "Active",
  },
  {
    id: 3,
    code: "ECE",
    name: "Electronics & Communication Engineering",
    shortName: "Electronics",
    hod: "Prof. Vikram Singh",
    email: "ece@college.edu",
    phone: "+91 98765 43212",
    faculty: 20,
    students: 400,
    courses: 16,
    status: "Active",
  },
  {
    id: 4,
    code: "ME",
    name: "Mechanical Engineering",
    shortName: "Mechanical",
    hod: "Prof. Arjun Rao",
    email: "me@college.edu",
    phone: "+91 98765 43213",
    faculty: 16,
    students: 320,
    courses: 15,
    status: "Active",
  },
  {
    id: 5,
    code: "CE",
    name: "Civil Engineering",
    shortName: "Civil",
    hod: "Dr. Neha Kapoor",
    email: "ce@college.edu",
    phone: "+91 98765 43214",
    faculty: 15,
    students: 300,
    courses: 13,
    status: "Active",
  },
  {
    id: 6,
    code: "MBA",
    name: "Master of Business Administration",
    shortName: "Management",
    hod: "Dr. Meera Joshi",
    email: "mba@college.edu",
    phone: "+91 98765 43215",
    faculty: 12,
    students: 240,
    courses: 12,
    status: "Inactive",
  },
];

const emptyForm = {
  code: "",
  name: "",
  shortName: "",
  hod: "",
  email: "",
  phone: "",
  faculty: "",
  students: "",
  courses: "",
  status: "Active",
};

function Departments() {
  const [departments, setDepartments] = useState(
    initialDepartments
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState(null);

  const [selectedDepartment, setSelectedDepartment] =
    useState(null);

  const [form, setForm] = useState(emptyForm);
  const [notification, setNotification] = useState("");

  const filteredDepartments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return departments.filter((department) => {
      const matchesSearch =
        !query ||
        department.code
          .toLowerCase()
          .includes(query) ||
        department.name
          .toLowerCase()
          .includes(query) ||
        department.shortName
          .toLowerCase()
          .includes(query) ||
        department.hod
          .toLowerCase()
          .includes(query) ||
        department.email
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        department.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [departments, search, statusFilter]);

  const statistics = useMemo(() => {
    const totalFaculty = departments.reduce(
      (sum, department) =>
        sum + Number(department.faculty || 0),
      0
    );

    const totalStudents = departments.reduce(
      (sum, department) =>
        sum + Number(department.students || 0),
      0
    );

    const totalCourses = departments.reduce(
      (sum, department) =>
        sum + Number(department.courses || 0),
      0
    );

    const active = departments.filter(
      (department) => department.status === "Active"
    ).length;

    return {
      total: departments.length,
      active,
      faculty: totalFaculty,
      students: totalStudents,
      courses: totalCourses,
    };
  }, [departments]);

  const showNotification = (message) => {
    setNotification(message);

    window.setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const openAddModal = () => {
    setEditingDepartment(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (department) => {
    setEditingDepartment(department);

    setForm({
      code: department.code,
      name: department.name,
      shortName: department.shortName,
      hod: department.hod,
      email: department.email,
      phone: department.phone,
      faculty: String(department.faculty),
      students: String(department.students),
      courses: String(department.courses),
      status: department.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDepartment(null);
    setForm(emptyForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.code.trim() ||
      !form.name.trim() ||
      !form.hod.trim() ||
      !form.email.trim()
    ) {
      showNotification(
        "Please fill in all required fields."
      );
      return;
    }

    const departmentData = {
      ...form,
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      shortName: form.shortName.trim(),
      hod: form.hod.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      faculty: Number(form.faculty || 0),
      students: Number(form.students || 0),
      courses: Number(form.courses || 0),
    };

    if (editingDepartment) {
      setDepartments((current) =>
        current.map((department) =>
          department.id === editingDepartment.id
            ? {
                ...department,
                ...departmentData,
              }
            : department
        )
      );

      showNotification(
        "Department updated successfully."
      );
    } else {
      setDepartments((current) => [
        {
          id: Date.now(),
          ...departmentData,
        },
        ...current,
      ]);

      showNotification(
        "Department created successfully."
      );
    }

    closeModal();
  };

  const deleteDepartment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) return;

    setDepartments((current) =>
      current.filter((department) => department.id !== id)
    );

    if (selectedDepartment?.id === id) {
      setSelectedDepartment(null);
    }

    showNotification(
      "Department deleted successfully."
    );
  };

  const toggleStatus = (id) => {
    setDepartments((current) =>
      current.map((department) =>
        department.id === id
          ? {
              ...department,
              status:
                department.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : department
      )
    );

    showNotification("Department status updated.");
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  const resetData = () => {
    setDepartments(initialDepartments);
    clearFilters();
    setSelectedDepartment(null);
    showNotification("Department data restored.");
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Departments
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage academic departments, heads of
            department, faculty and student capacity.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={resetData}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Reset Data
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            + Add Department
          </button>
        </div>
      </div>

      {/* NOTIFICATION */}
      {notification && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
            ✓
          </span>

          {notification}
        </div>
      )}

      {/* STATISTICS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Departments"
          value={statistics.total}
          color="text-white"
        />

        <StatCard
          label="Active"
          value={statistics.active}
          color="text-emerald-400"
        />

        <StatCard
          label="Faculty"
          value={statistics.faculty}
          color="text-blue-400"
        />

        <StatCard
          label="Students"
          value={statistics.students}
          color="text-purple-400"
        />

        <StatCard
          label="Courses"
          value={statistics.courses}
          color="text-amber-400"
        />
      </div>

      {/* FILTERS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5">
          <h2 className="font-semibold text-white">
            Search & Filters
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Search departments by code, name, HOD or
            contact information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search department, code, HOD..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* DEPARTMENT TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-5">
          <h2 className="font-semibold text-white">
            Department Directory
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {filteredDepartments.length} department
            {filteredDepartments.length !== 1
              ? "s"
              : ""}{" "}
            found
          </p>
        </div>

        {filteredDepartments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-slate-800/40">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Department
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    HOD
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Contact
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Faculty
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Students
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Courses
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {filteredDepartments.map((department) => (
                  <tr
                    key={department.id}
                    className="transition hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xs font-bold text-blue-400">
                          {department.code}
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {department.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {department.shortName}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-300">
                        {department.hod}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-400">
                        {department.email}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {department.phone}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-white">
                        {department.faculty}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-white">
                        {department.students}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-white">
                        {department.courses}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(department.id)
                        }
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          department.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {department.status}
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedDepartment(
                              department
                            )
                          }
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(department)
                          }
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-amber-500 hover:text-amber-400"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteDepartment(
                              department.id
                            )
                          }
                          className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-2xl text-slate-500">
              ◌
            </div>

            <h3 className="mt-4 font-semibold text-white">
              No departments found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {editingDepartment
                    ? "Edit Department"
                    : "Add New Department"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Configure department and academic
                  information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                  label="Department Code *"
                  value={form.code}
                  placeholder="e.g. CSE"
                  onChange={(value) =>
                    updateForm("code", value)
                  }
                />

                <FormInput
                  label="Department Name *"
                  value={form.name}
                  placeholder="e.g. Computer Science & Engineering"
                  onChange={(value) =>
                    updateForm("name", value)
                  }
                />

                <FormInput
                  label="Short Name"
                  value={form.shortName}
                  placeholder="e.g. Computer Science"
                  onChange={(value) =>
                    updateForm("shortName", value)
                  }
                />

                <FormInput
                  label="Head of Department *"
                  value={form.hod}
                  placeholder="HOD name"
                  onChange={(value) =>
                    updateForm("hod", value)
                  }
                />

                <FormInput
                  label="Department Email *"
                  type="email"
                  value={form.email}
                  placeholder="department@college.edu"
                  onChange={(value) =>
                    updateForm("email", value)
                  }
                />

                <FormInput
                  label="Phone"
                  type="tel"
                  value={form.phone}
                  placeholder="+91 XXXXX XXXXX"
                  onChange={(value) =>
                    updateForm("phone", value)
                  }
                />

                <FormInput
                  label="Faculty Count"
                  type="number"
                  min="0"
                  value={form.faculty}
                  placeholder="0"
                  onChange={(value) =>
                    updateForm("faculty", value)
                  }
                />

                <FormInput
                  label="Student Count"
                  type="number"
                  min="0"
                  value={form.students}
                  placeholder="0"
                  onChange={(value) =>
                    updateForm("students", value)
                  }
                />

                <FormInput
                  label="Course Count"
                  type="number"
                  min="0"
                  value={form.courses}
                  placeholder="0"
                  onChange={(value) =>
                    updateForm("courses", value)
                  }
                />

                <FormSelect
                  label="Status"
                  value={form.status}
                  onChange={(value) =>
                    updateForm("status", value)
                  }
                  options={["Active", "Inactive"]}
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  {editingDepartment
                    ? "Save Changes"
                    : "Create Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedDepartment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Department Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedDepartment.code}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedDepartment(null)
                }
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <p className="text-xs text-slate-500">
                  Department
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                  {selectedDepartment.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedDepartment.shortName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Detail
                  label="Department Code"
                  value={selectedDepartment.code}
                />

                <Detail
                  label="Status"
                  value={selectedDepartment.status}
                />

                <Detail
                  label="Faculty"
                  value={selectedDepartment.faculty}
                />

                <Detail
                  label="Students"
                  value={selectedDepartment.students}
                />

                <Detail
                  label="Courses"
                  value={selectedDepartment.courses}
                />

                <Detail
                  label="Phone"
                  value={selectedDepartment.phone}
                />
              </div>

              <div className="rounded-xl bg-slate-800/70 p-4">
                <p className="text-xs text-slate-500">
                  Head of Department
                </p>

                <p className="mt-1 font-medium text-white">
                  {selectedDepartment.hod}
                </p>
              </div>

              <div className="rounded-xl bg-slate-800/70 p-4">
                <p className="text-xs text-slate-500">
                  Email
                </p>

                <p className="mt-1 break-all text-sm font-medium text-blue-400">
                  {selectedDepartment.email}
                </p>
              </div>

              <div className="flex justify-end border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedDepartment(null)
                  }
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-500">{label}</p>

      <p
        className={`mt-2 text-3xl font-bold ${color}`}
      >
        {value}
      </p>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type={type}
        min={min}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
      />
    </div>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-800/70 p-4">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="mt-1 text-sm font-medium text-white">
        {value}
      </p>
    </div>
  );
}

export default Departments;
