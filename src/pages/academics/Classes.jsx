import React, { useMemo, useState } from "react";

const initialClasses = [
  {
    id: 1,
    code: "CSE-A",
    name: "Computer Science - A",
    department: "Computer Science",
    year: "3rd Year",
    semester: "6",
    section: "A",
    students: 48,
    classTeacher: "Dr. Ananya Sharma",
    room: "LH-301",
    status: "Active",
  },
  {
    id: 2,
    code: "CSE-B",
    name: "Computer Science - B",
    department: "Computer Science",
    year: "3rd Year",
    semester: "6",
    section: "B",
    students: 45,
    classTeacher: "Prof. Rahul Mehta",
    room: "LH-302",
    status: "Active",
  },
  {
    id: 3,
    code: "IT-A",
    name: "Information Technology - A",
    department: "Information Technology",
    year: "3rd Year",
    semester: "6",
    section: "A",
    students: 42,
    classTeacher: "Dr. Priya Nair",
    room: "LH-201",
    status: "Active",
  },
  {
    id: 4,
    code: "ECE-A",
    name: "Electronics - A",
    department: "Electronics",
    year: "3rd Year",
    semester: "6",
    section: "A",
    students: 44,
    classTeacher: "Prof. Vikram Singh",
    room: "EH-101",
    status: "Active",
  },
  {
    id: 5,
    code: "ME-A",
    name: "Mechanical - A",
    department: "Mechanical",
    year: "2nd Year",
    semester: "4",
    section: "A",
    students: 39,
    classTeacher: "Prof. Arjun Rao",
    room: "MH-201",
    status: "Active",
  },
  {
    id: 6,
    code: "CE-A",
    name: "Civil - A",
    department: "Civil",
    year: "2nd Year",
    semester: "4",
    section: "A",
    students: 40,
    classTeacher: "Dr. Neha Kapoor",
    room: "CH-101",
    status: "Active",
  },
];

const emptyForm = {
  code: "",
  name: "",
  department: "Computer Science",
  year: "1st Year",
  semester: "1",
  section: "A",
  students: "",
  classTeacher: "",
  room: "",
  status: "Active",
};

function Classes() {
  const [classes, setClasses] = useState(initialClasses);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("all");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [notification, setNotification] = useState("");

  const departments = useMemo(() => {
    return [
      ...new Set(classes.map((item) => item.department)),
    ];
  }, [classes]);

  const filteredClasses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return classes.filter((item) => {
      const matchesSearch =
        !query ||
        item.code.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query) ||
        item.classTeacher.toLowerCase().includes(query) ||
        item.room.toLowerCase().includes(query);

      const matchesDepartment =
        departmentFilter === "all" ||
        item.department === departmentFilter;

      const matchesStatus =
        statusFilter === "all" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    classes,
    search,
    departmentFilter,
    statusFilter,
  ]);

  const statistics = useMemo(() => {
    const totalStudents = classes.reduce(
      (sum, item) => sum + Number(item.students || 0),
      0
    );

    const active = classes.filter(
      (item) => item.status === "Active"
    ).length;

    const inactive = classes.filter(
      (item) => item.status === "Inactive"
    ).length;

    return {
      totalClasses: classes.length,
      totalStudents,
      active,
      inactive,
    };
  }, [classes]);

  const showNotification = (message) => {
    setNotification(message);

    window.setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const openAddModal = () => {
    setEditingClass(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (classItem) => {
    setEditingClass(classItem);

    setForm({
      code: classItem.code,
      name: classItem.name,
      department: classItem.department,
      year: classItem.year,
      semester: classItem.semester,
      section: classItem.section,
      students: String(classItem.students),
      classTeacher: classItem.classTeacher,
      room: classItem.room,
      status: classItem.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingClass(null);
    setForm(emptyForm);
  };

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.code.trim() ||
      !form.name.trim() ||
      !form.classTeacher.trim() ||
      !form.room.trim()
    ) {
      showNotification(
        "Please fill in all required fields."
      );
      return;
    }

    if (editingClass) {
      setClasses((current) =>
        current.map((item) =>
          item.id === editingClass.id
            ? {
                ...item,
                ...form,
                students: Number(form.students || 0),
              }
            : item
        )
      );

      showNotification("Class updated successfully.");
    } else {
      const newClass = {
        id: Date.now(),
        ...form,
        students: Number(form.students || 0),
      };

      setClasses((current) => [newClass, ...current]);

      showNotification("Class added successfully.");
    }

    closeModal();
  };

  const deleteClass = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmed) return;

    setClasses((current) =>
      current.filter((item) => item.id !== id)
    );

    if (selectedClass?.id === id) {
      setSelectedClass(null);
    }

    showNotification("Class deleted successfully.");
  };

  const toggleStatus = (id) => {
    setClasses((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : item
      )
    );

    showNotification("Class status updated.");
  };

  const clearFilters = () => {
    setSearch("");
    setDepartmentFilter("all");
    setStatusFilter("all");
  };

  const resetDemoData = () => {
    setClasses(initialClasses);
    clearFilters();
    setSelectedClass(null);
    showNotification("Demo class data restored.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Classes
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage academic classes, sections, rooms and
            class teachers.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={resetDemoData}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Reset Data
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            + Add Class
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
            ✓
          </span>

          {notification}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Total Classes
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {statistics.totalClasses}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Total Students
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-400">
            {statistics.totalStudents}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Active Classes
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {statistics.active}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Inactive Classes
          </p>

          <p className="mt-2 text-3xl font-bold text-amber-400">
            {statistics.inactive}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5">
          <h2 className="font-semibold text-white">
            Search & Filters
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Find classes by name, department, teacher or
            room.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search classes..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Department
            </label>

            <select
              value={departmentFilter}
              onChange={(event) =>
                setDepartmentFilter(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
            >
              <option value="all">
                All Departments
              </option>

              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
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

          <div className="flex items-end">
            <button
              type="button"
              onClick={clearFilters}
              className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="font-semibold text-white">
              Class Directory
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredClasses.length} class
              {filteredClasses.length !== 1 ? "es" : ""} found
            </p>
          </div>
        </div>

        {filteredClasses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px]">
              <thead className="bg-slate-800/40">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Class
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Department
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Year / Sem
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Students
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Class Teacher
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Room
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
                {filteredClasses.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-xs font-bold text-blue-400">
                          {item.section}
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {item.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {item.department}
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-300">
                        {item.year}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Semester {item.semester}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-white">
                        {item.students}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {item.classTeacher}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-300">
                        {item.room}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(item.id)
                        }
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedClass(item)
                          }
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(item)
                          }
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-amber-500 hover:text-amber-400"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteClass(item.id)
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
              No classes found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {editingClass
                    ? "Edit Class"
                    : "Add New Class"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Configure class and academic details.
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
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Class Code *
                  </label>

                  <input
                    type="text"
                    value={form.code}
                    onChange={(event) =>
                      updateForm(
                        "code",
                        event.target.value
                      )
                    }
                    placeholder="e.g. CSE-A"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Class Name *
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateForm(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Computer Science - A"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Department
                  </label>

                  <select
                    value={form.department}
                    onChange={(event) =>
                      updateForm(
                        "department",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                  >
                    <option>
                      Computer Science
                    </option>
                    <option>
                      Information Technology
                    </option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Year
                  </label>

                  <select
                    value={form.year}
                    onChange={(event) =>
                      updateForm(
                        "year",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Semester
                  </label>

                  <select
                    value={form.semester}
                    onChange={(event) =>
                      updateForm(
                        "semester",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                  >
                    {Array.from(
                      { length: 8 },
                      (_, index) => index + 1
                    ).map((semester) => (
                      <option
                        key={semester}
                        value={semester}
                      >
                        Semester {semester}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Section
                  </label>

                  <select
                    value={form.section}
                    onChange={(event) =>
                      updateForm(
                        "section",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Student Count
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={form.students}
                    onChange={(event) =>
                      updateForm(
                        "students",
                        event.target.value
                      )
                    }
                    placeholder="e.g. 48"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Class Teacher *
                  </label>

                  <input
                    type="text"
                    value={form.classTeacher}
                    onChange={(event) =>
                      updateForm(
                        "classTeacher",
                        event.target.value
                      )
                    }
                    placeholder="Teacher name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Classroom *
                  </label>

                  <input
                    type="text"
                    value={form.room}
                    onChange={(event) =>
                      updateForm(
                        "room",
                        event.target.value
                      )
                    }
                    placeholder="e.g. LH-301"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateForm(
                        "status",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
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
                  {editingClass
                    ? "Save Changes"
                    : "Create Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Class Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedClass.code}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedClass(null)}
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <p className="text-xs text-slate-500">
                  Class
                </p>

                <p className="mt-1 text-lg font-semibold text-white">
                  {selectedClass.name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-800/70 p-4">
                  <p className="text-xs text-slate-500">
                    Department
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedClass.department}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-800/70 p-4">
                  <p className="text-xs text-slate-500">
                    Section
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedClass.section}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-800/70 p-4">
                  <p className="text-xs text-slate-500">
                    Academic Year
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedClass.year}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-800/70 p-4">
                  <p className="text-xs text-slate-500">
                    Semester
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedClass.semester}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-800/70 p-4">
                  <p className="text-xs text-slate-500">
                    Students
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedClass.students}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-800/70 p-4">
                  <p className="text-xs text-slate-500">
                    Room
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedClass.room}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-800/70 p-4">
                <p className="text-xs text-slate-500">
                  Class Teacher
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {selectedClass.classTeacher}
                </p>
              </div>

              <div className="flex justify-end border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={() => setSelectedClass(null)}
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

export default Classes;
